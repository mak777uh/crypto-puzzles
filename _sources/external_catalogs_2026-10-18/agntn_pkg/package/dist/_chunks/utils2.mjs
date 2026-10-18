import { InvalidArgumentError } from "./errors.mjs";
import { secretOf } from "./parts.mjs";
import { chainSymbol, chains, parseChain, sameAddress } from "./chains2.mjs";
import { Status } from "./status.mjs";
import "./puzzle.mjs";
import { techniques } from "./technique.mjs";
function toJson(value, compact = false) {
	return JSON.stringify(value, (_key, item) => typeof item === "bigint" ? item.toString() : item, compact ? void 0 : 2);
}
let amounts;
function decimal(amount) {
	amounts ??= new Intl.NumberFormat("en-US", {
		maximumFractionDigits: 20,
		useGrouping: false
	});
	return amounts.format(amount);
}
function formatPrize(prize, currency) {
	return prize === void 0 ? "-" : `${decimal(prize)} ${currency}`;
}
function formatBalance(balance) {
	return `${balance.totalAmount()} ${chainSymbol(balance.chain)}`;
}
function addExact(sum, amount) {
	const [whole = "0", fraction = ""] = decimal(amount).split(".");
	const places = Math.max(sum.places, fraction.length);
	return {
		units: sum.units * 10n ** BigInt(places - sum.places) + BigInt(whole + fraction.padEnd(places, "0")),
		places
	};
}
function exactNumber(sum) {
	return Number(`${sum.units}e-${sum.places}`);
}
function prizeTotals(puzzles) {
	const sums = {};
	for (const puzzle of puzzles) {
		const prize = puzzle.prize();
		if (prize === void 0) continue;
		const currency = puzzle.prizeCurrency();
		sums[currency] = addExact(sums[currency] ?? {
			units: 0n,
			places: 0
		}, prize);
	}
	return Object.fromEntries(Object.entries(sums).map(([currency, sum]) => [currency, exactNumber(sum)]));
}
function statusCounts(puzzles) {
	const counts = {
		claimed: 0,
		expired: 0,
		solved: 0,
		swept: 0,
		unsolved: 0
	};
	for (const puzzle of puzzles) counts[puzzle.status()] += 1;
	return counts;
}
function formatPrizeTotals(totals) {
	const entries = Object.entries(totals);
	return entries.length === 0 ? "-" : entries.map(([currency, amount]) => `${decimal(amount)} ${currency}`).join(", ");
}
function formatPuzzle(puzzle) {
	return `${puzzle.id()}\t${puzzle.status()}\t${formatPrize(puzzle.prize(), puzzle.prizeCurrency())}\t${puzzle.address().value}`;
}
function field(label, value, format = String) {
	return value === void 0 ? [] : [`${label}: ${format(value)}`];
}
function formatSecret(secret, derived) {
	if (secret === void 0) return "unknown";
	const [value, kind] = secretParts(secret);
	return `${value} (${kind}${derived ? ", derived from the published recipe" : ""})`;
}
function secretParts(secret) {
	switch (secret.kind) {
		case "hex": return [secret.hex, "hex"];
		case "wif": return [secret.wif, "wif"];
		case "encrypted": return [secret.encrypted, "bip38"];
		case "seed": return [secret.phrase, "seed phrase"];
		case "mini": return [secret.mini, "mini"];
	}
}
function wifLines(key, secret) {
	const wif = key.wif ?? {};
	return [
		...field("wif", secret === "wif" ? void 0 : wif.decrypted),
		...field("encrypted wif", secret === "encrypted" ? void 0 : wif.encrypted, bip38),
		...field("passphrase", wif.passphrase),
		...field("salt", wif.salt),
		...field("mini key", secret === "mini" ? void 0 : key.mini)
	];
}
function bip38(payload) {
	return `${payload} (bip38)`;
}
function withNote(value, note) {
	return note === void 0 ? value : `${value} (${note})`;
}
function formatEntropy(entropy) {
	const source = entropy.source ?? {};
	const from = source.url === void 0 ? "" : ` from ${source.url}`;
	return withNote(`${entropy.hash}${from}`, source.description);
}
function formatPassphrase(passphrase) {
	return passphrase === "Required" ? "required" : passphrase.Known;
}
function formatShares(shares) {
	const published = shares.shares.map((share) => `${share.index} "${share.data}"`);
	return `${published.length} of ${shares.total} published, ${shares.threshold} needed: ${published.join("; ")}`;
}
function seedLines(key, secret) {
	const seed = key.seed ?? {};
	const entropy = seed.entropy;
	return [
		...field("seed phrase", secret === "seed" ? void 0 : seed.phrase),
		...field("seed scheme", seed.scheme),
		...field("seed word list", seed.language),
		...field("derivation path", seed.path),
		...field("xpub", seed.xpub),
		...field("entropy", entropy, formatEntropy),
		...field("seed passphrase", seed.passphrase),
		...field("seed passphrase", entropy?.passphrase, formatPassphrase),
		...field("shares", key.shares, formatShares)
	];
}
function keyLines(key) {
	const secret = secretOf(key);
	const lines = [`private key: ${formatSecret(secret, key?.derived === true)}`];
	const kind = secret?.kind;
	return key === void 0 ? lines : [
		...lines,
		...wifLines(key, kind),
		...seedLines(key, kind)
	];
}
function formatPubkey(pubkey) {
	return pubkey === void 0 ? "unknown" : `${pubkey.value} (${pubkey.format})`;
}
function formatRedeemScript(script) {
	return `${script.script} (hash ${script.hash})`;
}
function formatParty(party) {
	const profiles = (party.profiles ?? []).map((item) => `${item.name} ${item.url}`);
	return [
		party.key === void 0 ? party.name : `${party.name ?? party.key} (${party.key})`,
		...profiles,
		...party.addresses ?? []
	].filter((item) => item !== void 0).join(", ");
}
function formatSolved(date, duration) {
	return withNote(date, duration);
}
function countOf(count, noun) {
	return `${count} ${noun}${count === 1 ? "" : "s"}`;
}
function formatRange(range, bits) {
	const width = bits === void 0 ? "" : `, ${countOf(bits, "bit")}`;
	return `${range[0].toString(16)}..${range[1].toString(16)} (hex${width})`;
}
const LISTED_INCREASES = 3;
const SMALL_SHARE = .01;
function foldIncreases(transactions) {
	const small = SMALL_SHARE * transactions.reduce((top, item) => Math.max(top, item.amount), 0);
	const lines = [];
	let run = [];
	const flush = () => {
		const [head, ...tail] = run;
		if (head !== void 0 && run.length > LISTED_INCREASES) lines.push([head, ...tail]);
		else lines.push(...run);
		run = [];
	};
	for (const item of transactions) {
		if (item.tx_type === "increase" && item.amount < small) {
			run.push(item);
			continue;
		}
		flush();
		lines.push(item);
	}
	flush();
	return lines;
}
function formatTransactionLine(line, currency) {
	if ("txid" in line) return `\t${line.tx_type}\t${line.date}\t${decimal(line.amount)} ${currency}\t${line.txid}`;
	const total = line.reduce((sum, item) => addExact(sum, item.amount), {
		units: 0n,
		places: 0
	});
	const dates = `${line[0].date} to ${(line.at(-1) ?? line[0]).date}`;
	return `\t${line.length} small increases\t${dates}\t${decimal(exactNumber(total))} ${currency}`;
}
function formatTransactions(puzzle, every) {
	const currency = puzzle.prizeCurrency();
	const transactions = puzzle.transactions();
	const lines = every ? transactions : foldIncreases(transactions);
	const folded = lines.reduce((count, line) => "txid" in line ? count : count + line.length, 0);
	return [`transactions: ${transactions.length}${folded === 0 ? "" : `, ${folded} small increases folded`}`, ...lines.map((line) => formatTransactionLine(line, currency))];
}
function fileOf(link, files) {
	return files === "path" ? link.path : link.url;
}
function formatAssets(puzzle, files) {
	const assets = puzzle.assets();
	if (assets === void 0) return [];
	const links = puzzle.assetLinks();
	const image = links.find((link) => link.kind === "puzzle");
	const solution = links.find((link) => link.kind === "solution");
	return [
		...field("asset", image, (link) => fileOf(link, files)),
		...formatHintAssets(hintAssets(puzzle), files),
		...field("solution asset", solution, (link) => fileOf(link, files)),
		...field("asset source", assets.source_url)
	];
}
function formatStages(puzzle, files) {
	const stages = puzzle.stages();
	if (stages.length === 0) return [];
	const links = puzzle.assetLinks();
	const directory = `assets/${puzzle.collection()}`;
	return [`stages: ${stages.length}`, ...stages.flatMap((stage) => [
		`\t${stage.name}\t${stage.about}`,
		...stage.artifacts.map((item) => {
			const path = item.file === void 0 ? void 0 : `${directory}/${item.file}`;
			const link = links.find((candidate) => candidate.path === path);
			const copy = link === void 0 ? void 0 : fileOf(link, files);
			return `\t\t${[
				item.name,
				item.url,
				...copy === void 0 ? [] : [copy]
			].join("	")}`;
		}),
		...stage.answer === void 0 ? [] : [`\t\t${formatAnswer(stage.answer)}`],
		...(stage.techniques ?? []).map((tag) => `\t\ttechnique: ${formatTechnique(tag)}`)
	])];
}
function formatTechnique(tag) {
	return `${tag.name}\tsource: ${tag.source}`;
}
function formatTechniqueBlocks(inherited, own) {
	return [...inherited.length === 0 ? [] : recordBlock("collection techniques", inherited, formatTechnique), ...own.length === 0 ? [] : recordBlock("techniques", own, formatTechnique)];
}
function hintAssets(puzzle) {
	return puzzle.assetLinks().filter((link) => link.kind === "hint");
}
function formatHintAssets(links, files) {
	return field("hint assets", links.length === 0 ? void 0 : links, (list) => list.map((link) => fileOf(link, files)).join(", "));
}
function formatConfirmation(confirmation) {
	return confirmation === void 0 ? "" : `\tconfirmation: ${withNote(confirmation.url, confirmation.description)}`;
}
function formatAnswer(published) {
	const date = published.date === void 0 ? "" : `\tanswer date: ${published.date}`;
	return `answer: ${published.text}\tanswer source: ${published.source}${date}`;
}
function formatHint(hint) {
	const answer = hint.answer === void 0 ? "" : `\t${formatAnswer(hint.answer)}`;
	return `\t${hint.kind}\t${hint.date ?? "-"}\t${hint.text}\tsource: ${hint.source}${formatConfirmation(hint.confirmation)}${answer}`;
}
const SHOWN_HINTS = 3;
function formatHints(label, hints, lister) {
	if (hints.length === 0) return [];
	if (lister !== void 0 && hints.length > SHOWN_HINTS) return [`${label}: ${hints.length}, folded, ${lister} lists them`];
	return [`${label}: ${hints.length}`, ...hints.map(formatHint)];
}
function formatHintBlocks(inherited, own, lister) {
	return [...formatHints("collection hints", inherited, lister), ...formatHints("hints", own, lister)];
}
function hintLister(puzzle, files) {
	return files === "path" ? "puzzles_hints" : `puzzles hints ${puzzle.id()}`;
}
function formatHintReport(puzzle, inherited, files = "url") {
	const own = puzzle.hints();
	const assets = hintAssets(puzzle);
	const header = [[inherited.length + own.length, "hint"], [assets.length, "hint asset"]].filter(([count]) => count > 0).map(([count, noun]) => countOf(count, noun)).join(", ");
	return [
		`${puzzle.id()}: ${header.length === 0 ? "no hints recorded" : header}`,
		...formatHintBlocks(inherited, own),
		...formatHintAssets(assets, files)
	];
}
function formatStageReport(puzzle, files = "url") {
	const count = puzzle.stages().length;
	const header = count === 0 ? "no stages recorded" : countOf(count, "stage");
	return [`${puzzle.id()}: ${header}`, ...formatStages(puzzle, files)];
}
function formatPuzzleRecord(puzzle, inherited = [], inheritedTechniques = [], allTransactions = false, files = "url") {
	const address = puzzle.address();
	const key = puzzle.keyData();
	const bits = key?.bits;
	return [
		formatPuzzle(puzzle),
		`chain: ${puzzle.chain()}  address kind: ${address.kind}`,
		...field("escrow", puzzle.escrow()?.value),
		...field("hash160", address.hash160),
		...field("redeem script", address.redeem_script, formatRedeemScript),
		`public key: ${formatPubkey(puzzle.pubkey())}`,
		...keyLines(key),
		`started: ${puzzle.startedAt()}`,
		...field("solved", puzzle.solvedAt(), (date) => formatSolved(date, puzzle.formattedSolveTime())),
		...field("solver", puzzle.solver(), formatParty),
		...puzzle.preGenesis() ? ["pre-genesis: yes"] : [],
		...formatTransactions(puzzle, allTransactions),
		...field("claim", puzzle.claimExplorerUrl()),
		...formatAssets(puzzle, files),
		...formatStages(puzzle, files),
		...formatTechniqueBlocks(inheritedTechniques, puzzle.techniques()),
		...formatHintBlocks(inherited, puzzle.hints(), hintLister(puzzle, files)),
		`explorer: ${puzzle.explorerUrl()}`,
		`source: ${puzzle.sourceUrl()}`,
		...field("key range", puzzle.keyRange(), (range) => formatRange(range, bits))
	].join("\n");
}
function statusCountLabels(summary) {
	return [
		`${summary.solved} solved`,
		`${summary.unsolved} unsolved`,
		...[
			Status.Claimed,
			Status.Swept,
			Status.Expired
		].filter((status) => summary[status] > 0).map((status) => `${summary[status]} ${status}`)
	];
}
function formatAuthor(entry) {
	const { author } = entry;
	const kind = author.kind === void 0 ? "" : ` (${author.kind})`;
	const collections = countOf(entry.collections.length, "collection");
	return `${entry.key}: ${author.name ?? "unknown"}${kind}, ${collections}: ${entry.collections.join(", ")}, ${countOf(entry.puzzles, "puzzle")}`;
}
function recordBlock(label, items, line) {
	return [`${label}: ${items?.length ?? 0}`, ...(items ?? []).map((item) => `\t${line(item)}`)];
}
function formatAuthorRecord(entry) {
	const { author } = entry;
	return [
		`${entry.key}\t${author.name ?? "unknown"}\t${author.kind ?? "kind unknown"}`,
		`collections: ${entry.collections.join(", ")} (${countOf(entry.puzzles, "puzzle")})`,
		...field("aliases", author.aliases, (aliases) => aliases.join(", ")),
		...field("about", author.about),
		...recordBlock("profiles", author.profiles, (link) => `${link.name}\t${link.url}`),
		...recordBlock("addresses", author.addresses, (address) => address),
		...recordBlock("facts", author.facts, (item) => `${item.date ?? "-"}\t${item.text}\tsource: ${item.source}`),
		...recordBlock("techniques", techniqueRows(entry.techniques), ([name, count]) => `${name}\t${countOf(count, "puzzle")}`)
	].join("\n");
}
function techniqueRows(counts) {
	return techniques.flatMap((name) => {
		const count = counts[name];
		return count === void 0 ? [] : [[name, count]];
	});
}
function formatSolver(entry) {
	const { solver } = entry;
	const kind = solver.kind === void 0 ? "" : ` (${solver.kind})`;
	const solves = countOf(entry.solves.length, "solve");
	const authored = entry.authored.length === 0 ? "" : `, author of ${entry.authored.join(", ")}`;
	return `${entry.key}: ${solver.name ?? "unknown"}${kind}, ${solves}: ${entry.solves.map((solve) => solve.id).join(", ")}${authored}`;
}
function formatSolverRecord(entry) {
	const { solver } = entry;
	return [
		`${entry.key}\t${solver.name ?? "unknown"}\t${solver.kind ?? "kind unknown"}`,
		...recordBlock("solves", entry.solves, (solve) => `${solve.id}\t${solve.status}\t${solve.solvedAt ?? "-"}\t${formatPrize(solve.prize, solve.currency)}`),
		...entry.authored.length === 0 ? [] : [`authored: ${entry.authored.join(", ")}`],
		...field("aliases", solver.aliases, (aliases) => aliases.join(", ")),
		...field("about", solver.about),
		...recordBlock("profiles", solver.profiles, (link) => `${link.name}\t${link.url}`),
		...recordBlock("addresses", solver.addresses, (address) => address),
		...recordBlock("facts", solver.facts, (item) => `${item.date ?? "-"}\t${item.text}\tsource: ${item.source}`)
	].join("\n");
}
function formatCollection(summary) {
	return `${summary.key}: ${countOf(summary.total, "puzzle")}, ${statusCountLabels(summary).join(", ")}, by ${summary.author ?? "unknown"}`;
}
function formatStats(result) {
	return [
		`Total: ${result.total}`,
		`Solved: ${result.solved}`,
		`Unsolved: ${result.unsolved}`,
		`Claimed: ${result.claimed}`,
		`Swept: ${result.swept}`,
		`Expired: ${result.expired}`,
		`With pubkey: ${result.with_pubkey}`,
		`Techniques: ${formatTechniqueCounts(result.techniques)}`
	];
}
function formatTechniqueCounts(counts) {
	const rows = techniqueRows(counts).map(([name, count]) => `${name} ${count}`);
	return rows.length === 0 ? "none" : rows.join(", ");
}
function parseTechnique(value) {
	if (value === void 0) return;
	const name = techniques.find((item) => item === value);
	if (name === void 0) throw new InvalidArgumentError("technique", `expected one of ${techniques.join(", ")}`);
	return name;
}
function parseStatus(value) {
	if (value === void 0) return;
	const status = Object.values(Status).find((item) => item === value);
	if (status === void 0) throw new InvalidArgumentError("status", `expected one of ${Object.values(Status).join(", ")}`);
	return status;
}
function requireChain(value) {
	if (value === void 0) return;
	const chain = typeof value === "string" ? parseChain(value) : void 0;
	if (chain === void 0) throw new InvalidArgumentError("chain", `expected one of ${chains.join(", ")}`);
	return chain;
}
function addressMatches(puzzle, address) {
	return typeof address === "string" && sameAddress(puzzle.chain(), puzzle.address().value, address);
}
function filterPuzzles(puzzles, options) {
	return puzzles.filter((puzzle) => (options.address === void 0 || addressMatches(puzzle, options.address)) && (options.chain === void 0 || puzzle.chain() === options.chain) && (options.status === void 0 || puzzle.status() === options.status) && (options.withPubkey !== true || puzzle.hasPubkey()));
}
export { countOf, decimal, filterPuzzles, formatAuthor, formatAuthorRecord, formatBalance, formatCollection, formatHintReport, formatPrize, formatPrizeTotals, formatPuzzle, formatPuzzleRecord, formatSolver, formatSolverRecord, formatStageReport, formatStats, formatTechniqueCounts, hintAssets, parseStatus, parseTechnique, prizeTotals, requireChain, statusCountLabels, statusCounts, toJson };
