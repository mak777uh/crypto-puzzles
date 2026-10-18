import { requireCollection } from "./registry.mjs";
import { InvalidArgumentError } from "./errors.mjs";
import { addressOn, defined } from "./parts.mjs";
import { chainDecimals, chainSymbol, chains, isValidAddress, sameAddress } from "./chains2.mjs";
import { Status } from "./status.mjs";
import { Balance, formatUnits } from "./types.mjs";
import { decimal, requireChain } from "./utils2.mjs";
import { get, requirePuzzle, selectPuzzles } from "./dataset2.mjs";
import { BalanceError } from "./balance.mjs";
import { oneLine } from "./text.mjs";
import { expectedPrize, holdsPrize } from "./watch2.mjs";
async function puzzleAt(address, chain) {
	const found = (await selectPuzzles({ chain })).filter((puzzle) => [puzzle.address(), puzzle.escrow()].some((held) => held !== void 0 && sameAddress(puzzle.chain(), held.value, address)));
	if (found.length > 1) {
		const ids = found.map((puzzle) => puzzle.id()).join(", ");
		throw new InvalidArgumentError("query", `${address} pays ${ids}. Pass one identifier`);
	}
	return found[0];
}
async function bareChain(address, chain) {
	const fits = chains.filter((candidate) => (chain === void 0 || candidate === chain) && isValidAddress(candidate, address));
	const [only] = fits;
	if (fits.length === 1 && only !== void 0) return only;
	if (fits.length > 1) throw new InvalidArgumentError("chain", `${address} fits ${fits.join(", ")}. Pass one of them`);
	if (chain !== void 0) throw new InvalidArgumentError("query", `${JSON.stringify(address)} is not a ${chain} address`);
	if (addressShaped(address)) throw new InvalidArgumentError("query", `${oneLine(JSON.stringify(address))} is not an address on any supported chain`);
	return (await requirePuzzle(address)).chain();
}
const SHORTEST_ADDRESS = 25;
function addressShaped(query) {
	return query.length >= SHORTEST_ADDRESS && !/[/-]/u.test(query);
}
async function resolve(query, chain) {
	const puzzle = await get(query) ?? await puzzleAt(query, chain);
	if (puzzle === void 0) {
		const bare = await bareChain(query, chain);
		return {
			address: bareAddress(bare, query),
			chain: bare,
			puzzle,
			value: query
		};
	}
	if (chain !== void 0 && puzzle.chain() !== chain) throw new InvalidArgumentError("chain", `${puzzle.id()} is on ${puzzle.chain()}, not ${chain}`);
	const address = puzzle.address();
	return {
		address,
		chain: puzzle.chain(),
		puzzle,
		value: address.value
	};
}
async function readAddresses(chain, addresses, options) {
	const { lookupAddress } = await import("./providers.mjs");
	const reads = await Promise.all(addresses.map(async (address) => {
		try {
			return { state: await lookupAddress(chain, address, options) };
		} catch (error) {
			if (!(error instanceof BalanceError)) throw error;
			return { error: error.message };
		}
	}));
	return {
		states: reads.flatMap((read) => read.state === void 0 ? [] : [read.state]),
		errors: reads.flatMap((read) => read.error === void 0 ? [] : [read.error])
	};
}
function amount(units, chain) {
	return `${formatUnits(units, chainDecimals(chain))} ${chainSymbol(chain)}`;
}
function liveGaps(chain, reading) {
	const verbs = {
		funded: "received",
		spent: "spent"
	};
	const totals = reading.states.flatMap((state) => ["funded", "spent"].filter((total) => state[total] === void 0).map((total) => `${total}: ${state.provider} doesn't count the ${chainSymbol(chain)} ${state.address} ever ${verbs[total]}`));
	return [...reading.errors.map((error) => `live: ${error}`), ...totals];
}
function keyVerifier(chain, target, puzzle) {
	switch (target.kind) {
		case "p2pkh":
		case "p2wpkh": return hashVerifier(target, puzzle);
		case "p2sh":
		case "p2wsh": return target.redeem_script === void 0 ? void 0 : `a spend that satisfies redeem script ${target.redeem_script.script}`;
		default: return standardVerifier(chain, target.value, puzzle);
	}
}
function hashVerifier(target, puzzle) {
	const pubkey = puzzle?.pubkey();
	if (pubkey !== void 0) return `the private key of public key ${pubkey.value}, which hashes to ${target.value}`;
	return `a private key whose ${target.kind === "p2wpkh" ? "compressed" : "compressed or uncompressed"} public key hashes to ${target.value}`;
}
function standardVerifier(chain, address, puzzle) {
	if (chain === "arweave") return `the RSA keyfile whose modulus hashes to ${address}`;
	if (chain === "monero") return `the private spend key behind ${address}`;
	return puzzle?.hasPubkey() === true || puzzle?.hasPrivateKey() === true ? `the private key of ${address}` : void 0;
}
function verifierGap(chain, target) {
	return target.kind === "standard" ? `verifier: the record doesn't say whether ${target.value} is a contract or a key on ${chain}` : `verifier: the record has no script behind the ${target.kind} address ${target.value}`;
}
function solution({ address, chain, puzzle, value }) {
	if (address === void 0) return { missing: [`kind: ${value} has no kind a record holds on ${chain}`] };
	const verifier = keyVerifier(chain, address, puzzle);
	return verifier === void 0 ? { missing: [verifierGap(chain, address)] } : {
		verifier,
		missing: []
	};
}
function bareAddress(chain, address) {
	try {
		return addressOn(chain, address);
	} catch {
		return;
	}
}
function carriers(puzzle) {
	const urls = /* @__PURE__ */ new Set([...puzzle.assetLinks().filter((link) => link.kind !== "solution").map((link) => link.url), ...puzzle.stages().flatMap((stage) => stage.artifacts.map((artifact) => artifact.url))]);
	const range = puzzle.keyRange();
	return [...urls, ...range === void 0 ? [] : [`key range 0x${range[0].toString(16)} to 0x${range[1].toString(16)}`]];
}
function statusEvidence(puzzle, states) {
	const chain = puzzle.chain();
	const claim = puzzle.claimTransaction();
	const held = new Balance(chain, states.reduce((sum, state) => sum + state.confirmed, 0n), states.reduce((sum, state) => sum + state.unconfirmed, 0n));
	const prize = expectedPrize(puzzle);
	const read = states.length > 0;
	return {
		evidence: [
			`record says ${puzzle.status()}`,
			...claim === void 0 ? [] : [`claim ${claim.txid} on ${claim.date}`],
			...read ? [`addresses hold ${amount(held.total(), chain)} now`] : []
		],
		conflicts: read && prize !== void 0 && !holdsPrize(held, prize) ? [`addresses hold ${amount(held.total(), chain)}, the record says the prize is ${decimal(prize)} ${chainSymbol(chain)}`] : []
	};
}
async function recordFields(puzzle, reading) {
	const { author } = await requireCollection(puzzle.collection());
	const name = author.name ?? author.key;
	const found = carriers(puzzle);
	const status = puzzle.status();
	return {
		fields: {
			id: puzzle.id(),
			collection: puzzle.collection(),
			author: name,
			source: puzzle.sourceUrl(),
			escrow: puzzle.escrow()?.value,
			status,
			unclaimed: status === Status.Unsolved,
			carriers: found,
			...statusEvidence(puzzle, reading.errors.length === 0 ? reading.states : [])
		},
		missing: [...name === void 0 ? ["author: the collection names no author"] : [], ...found.length === 0 ? ["carriers: the record links no clue file, page or key range"] : []]
	};
}
function bareFields(address) {
	const absent = `${address} is in no record`;
	return {
		fields: {
			carriers: [],
			evidence: [],
			conflicts: []
		},
		missing: [
			"id",
			"collection",
			"author",
			"source",
			"status",
			"carriers"
		].map((field) => `${field}: ${absent}`)
	};
}
async function eligibility(query, options = {}) {
	const target = await resolve(query, requireChain(options.chain));
	const { chain, puzzle, value } = target;
	const { prizeAddresses } = await import("./providers.mjs");
	const reading = await readAddresses(chain, puzzle === void 0 ? [value] : prizeAddresses(puzzle), {
		...options,
		apiKey: options.apiKey ?? options.apiKeyFor?.(chain)
	});
	const record = puzzle === void 0 ? bareFields(value) : await recordFields(puzzle, reading);
	const solved = solution(target);
	return defined({
		query,
		...record.fields,
		chain,
		address: value,
		kind: target.address?.kind,
		live: reading.states,
		verifier: solved.verifier,
		missing: [
			...record.missing,
			...liveGaps(chain, reading),
			...solved.missing
		]
	});
}
function describeState(state, chain) {
	return [
		`${state.address} ${amount(state.confirmed, chain)} confirmed`,
		`${amount(state.unconfirmed, chain)} unconfirmed`,
		...state.funded === void 0 ? [] : [`received ${amount(state.funded, chain)}`],
		...state.spent === void 0 ? [] : [`spent ${amount(state.spent, chain)}`],
		`read from ${state.provider} at ${state.readAt}`
	].join(", ");
}
function formatEligibility(record) {
	const status = record.status === void 0 ? void 0 : `${record.status}, prize ${record.unclaimed === true ? "open" : "closed"}`;
	return [
		["id", record.id],
		["collection", record.collection],
		["author", record.author],
		["source", record.source],
		["chain", record.chain],
		["address", record.kind === void 0 ? record.address : `${record.address} ${record.kind}`],
		["escrow", record.escrow],
		...record.live.map((state) => ["live", describeState(state, record.chain)]),
		["status", status],
		...record.evidence.map((line) => ["evidence", line]),
		...record.conflicts.map((line) => ["conflict", line]),
		...record.carriers.map((line) => ["carrier", line]),
		["verifier", record.verifier],
		...record.missing.map((line) => ["missing", line])
	].flatMap(([label, value]) => value === void 0 ? [] : [`${label}\t${oneLine(value)}`]);
}
export { eligibility, formatEligibility };
