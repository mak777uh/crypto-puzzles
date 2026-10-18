import { InvalidArgumentError, SourceLookupError } from "./errors.mjs";
import { AddressKind, defined } from "./parts.mjs";
import { chainDecimals, chainSymbol } from "./chains2.mjs";
import { Status } from "./status.mjs";
import { formatUnits } from "./types.mjs";
import { decimal } from "./utils2.mjs";
import { BalanceError, HISTORY_LIMIT } from "./balance.mjs";
import { oneLine } from "./text.mjs";
function parseSince(since) {
	const day = /^(\d{4}-\d{2}-\d{2})(?:T\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?(?:Z|[+-]\d{2}:\d{2}))?$/u.exec(since)?.[1];
	const midnight = day === void 0 ? NaN : Date.parse(`${day}T00:00:00Z`);
	const time = Date.parse(since);
	if (Number.isNaN(midnight) || Number.isNaN(time) || new Date(midnight).toISOString().slice(0, 10) !== day) throw new InvalidArgumentError("since", "expected YYYY-MM-DD or an ISO 8601 date and time");
	return new Date(time);
}
function recordedTxids(puzzle) {
	return new Set(puzzle.transactions().map((transaction) => transaction.txid.toLowerCase()));
}
function chronological(left, right) {
	return Number(left.pending) - Number(right.pending) || (left.date ?? "").localeCompare(right.date ?? "");
}
const nothingRead = {
	failures: [],
	findings: [],
	spent: false,
	truncated: []
};
async function unrecorded(puzzle, options) {
	const { lookupHistory } = await import("./providers.mjs");
	const recorded = recordedTxids(puzzle);
	const kinds = {
		in: "deposit",
		out: "spend"
	};
	const histories = await lookupHistory(puzzle, options);
	const target = puzzle.address().value;
	return {
		failures: histories.flatMap(({ failure }) => failure === void 0 ? [] : [failure]),
		findings: histories.flatMap((history) => history.transactions).filter((transaction) => !recorded.has(transaction.txid.toLowerCase()) && (transaction.direction === "out" || transaction.amount > 0n)).map((transaction) => ({
			...transaction,
			kind: transaction.direction === void 0 ? "transaction" : kinds[transaction.direction]
		})).toSorted(chronological),
		spent: histories.some((history) => history.address === target && history.transactions.some((transaction) => transaction.direction !== "in")),
		truncated: histories.filter((history) => !history.complete && history.failure === void 0).map(({ address }) => address)
	};
}
function expectedPrize(puzzle) {
	const prize = puzzle.prize();
	return puzzle.status() === Status.Unsolved && puzzle.currency() === void 0 ? prize : void 0;
}
function holdsPrize(balance, prize) {
	return Number(balance.totalAmount()) === prize;
}
async function balanceFindings(puzzle, prize, explorer) {
	const balance = await puzzle.balance(explorer);
	return holdsPrize(balance, prize) ? [] : [{
		kind: "balance",
		balance: balance.total(),
		prize: decimal(prize)
	}];
}
const keyedKinds = [
	AddressKind.P2PKH,
	AddressKind.P2WPKH,
	AddressKind.P2SH
];
function asksPubkey(puzzle, spent) {
	return spent && puzzle.status() === Status.Unsolved && keyedKinds.includes(puzzle.address().kind);
}
async function pubkeyFindings(puzzle, explorer) {
	const { lookupPubkey } = await import("./providers.mjs");
	const address = puzzle.address().value;
	const shown = await lookupPubkey(puzzle.chain(), address, explorer);
	const recorded = puzzle.pubkey()?.value.toLowerCase();
	return shown === void 0 || shown.pubkey.toLowerCase() === recorded ? [] : [defined({
		kind: "pubkey",
		address,
		...shown,
		recorded
	})];
}
async function attempt(check) {
	try {
		return { value: await check() };
	} catch (error) {
		if (!(error instanceof BalanceError || error instanceof SourceLookupError)) throw error;
		return { error: error.message };
	}
}
function watcher(options = {}) {
	const since = options.since === void 0 ? void 0 : parseSince(options.since);
	const sources = /* @__PURE__ */ new Map();
	const sourceFindings = async (url, cutoff) => {
		let read = sources.get(url);
		if (read === void 0) {
			read = import("./sources.mjs").then(({ sourceChange }) => sourceChange(url, cutoff, options.timeout));
			sources.set(url, read);
		}
		const change = await read;
		return change === void 0 ? [] : [{
			kind: "source",
			...change
		}];
	};
	return async (puzzle, apiKey = options.apiKey) => {
		const explorer = {
			apiKey,
			baseUrl: options.baseUrl,
			timeout: options.timeout
		};
		const prize = expectedPrize(puzzle);
		const history = await attempt(() => unrecorded(puzzle, explorer));
		const read = history.value ?? nothingRead;
		const attempts = [
			history.error === void 0 ? { value: read.findings } : { error: history.error },
			prize === void 0 ? void 0 : await attempt(() => balanceFindings(puzzle, prize, explorer)),
			asksPubkey(puzzle, read.spent) ? await attempt(() => pubkeyFindings(puzzle, explorer)) : void 0,
			since === void 0 ? void 0 : await attempt(() => sourceFindings(puzzle.sourceUrl(), since))
		].filter((done) => done !== void 0);
		return {
			id: puzzle.id(),
			chain: puzzle.chain(),
			findings: attempts.flatMap((done) => done.value ?? []),
			errors: [...attempts.flatMap((done) => done.error === void 0 ? [] : [done.error]), ...read.failures],
			truncated: read.truncated
		};
	};
}
function amount(units, chain) {
	return `${formatUnits(units, chainDecimals(chain))} ${chainSymbol(chain)}`;
}
function describe(finding, chain) {
	switch (finding.kind) {
		case "balance": return `${amount(finding.balance, chain)} held, ${finding.prize} ${chainSymbol(chain)} recorded as the prize`;
		case "pubkey": return `${finding.pubkey} shown by ${finding.txid} at ${finding.address}, ${finding.recorded === void 0 ? "none recorded" : `${finding.recorded} recorded`}`;
		case "source": return `${finding.url} changed, +${finding.additions} -${finding.deletions} lines from ${finding.before.snapshot} to ${finding.after.snapshot}${finding.partial ? ", bodies cut off" : ""}`;
		default: return `${finding.txid} ${amount(finding.amount, chain)} ${finding.pending ? "unconfirmed" : finding.date ?? "undated"} at ${finding.address}`;
	}
}
function formatWatchReport(report) {
	const rows = [
		...report.findings.map((finding) => `${finding.kind.toUpperCase()}\t${report.id}\t${oneLine(describe(finding, report.chain))}`),
		...report.truncated.map((address) => `PARTIAL\t${report.id}\tonly the newest ${HISTORY_LIMIT} transactions at ${address} read, older ones unchecked`),
		...report.errors.map((error) => `FAIL\t${report.id}\t${oneLine(error)}`)
	];
	return rows.length === 0 ? [`OK\t${report.id}`] : rows;
}
export { expectedPrize, formatWatchReport, holdsPrize, parseSince, watcher };
