import { InvalidArgumentError } from "./errors.mjs";
import { Status } from "./status.mjs";
import { techniques } from "./technique.mjs";
import { apiKeyVariables } from "./balance.mjs";
import { oneLine } from "./text.mjs";
const MAX_LIST_LIMIT = 500;
const DEFAULT_LIST_LIMIT = 50;
const verifyById = {
	name: "puzzles_verify",
	title: "Verify Puzzle Key",
	description: "Check that a puzzle's recorded key material derives its stored address, and rerun the recipe it holds: BIP39 entropy or a SHA-256 brainwallet.",
	promptSnippet: "Use puzzles_verify to confirm recorded key material before trusting it.",
	promptGuidelines: ["An expected failure is a result, not an error.", "The recipe gets its own verdict: one that misses is a data bug, even when the key verifies."],
	openWorld: false
};
const facts = {
	tools: {
		stats: {
			name: "puzzles_stats",
			title: "Puzzle Statistics",
			description: "Report totals, status counts, prize sums, and how many puzzles use each technique across every puzzle collection.",
			promptSnippet: "Use puzzles_stats for dataset-wide crypto puzzle and bounty totals.",
			promptGuidelines: ["Call it before listing puzzles to know how large the dataset is."],
			openWorld: false
		},
		collections: {
			name: "puzzles_collections",
			title: "Puzzle Collections",
			description: "List every puzzle collection with its author and its puzzle count per status.",
			promptSnippet: "Use puzzles_collections to learn which collections exist before listing puzzles.",
			promptGuidelines: ["A collection key is the first segment of a puzzle identifier, for example bits in bits/90."],
			openWorld: false
		},
		authors: {
			name: "puzzles_authors",
			title: "Puzzle Authors",
			description: "List every puzzle author with its kind, the collections it published and its puzzle count.",
			promptSnippet: "Use puzzles_authors to learn who published which collections.",
			promptGuidelines: ["An author key is kebab-case, for example peter-todd; a collection key also resolves to its author."],
			openWorld: false
		},
		author: {
			name: "puzzles_author",
			title: "Show Author",
			description: "Show one author's record: name, kind, aliases, collections, profiles, addresses, the sourced facts public pages state about them, and how many of their puzzles use each technique.",
			promptSnippet: "Use puzzles_author for who is behind a collection and what public sources say about them, with the page that says it.",
			promptGuidelines: [
				"A fact is one sentence a public page states, with that page as its source; it is not a verified biography.",
				"A pseudonymous author is recorded under the handle; the record does not name the person behind it.",
				"The technique counts say what the author tends to reuse; pass one to puzzles_list as technique for the puzzles behind a count."
			],
			openWorld: false
		},
		solvers: {
			name: "puzzles_solvers",
			title: "Puzzle Solvers",
			description: "List every named puzzle solver with its kind, the puzzles credited to it and the collections it also published.",
			promptSnippet: "Use puzzles_solvers to learn who solved which puzzles.",
			promptGuidelines: ["A solver key is kebab-case, for example retired-coder; a puzzle identifier also resolves to its solver.", "A solver known only by the address the prize went to has no key and is not listed."],
			openWorld: false
		},
		solver: {
			name: "puzzles_solver",
			title: "Show Solver",
			description: "Show one solver's record: name, kind, every solve with its date and prize, profiles, addresses and the sourced facts public pages state about them.",
			promptSnippet: "Use puzzles_solver for who solved a puzzle, what else they solved, and what public sources say about them, with the page that says it.",
			promptGuidelines: ["A fact is one sentence a public page states, with that page as its source; it is not a verified biography.", "A pseudonymous solver is recorded under the handle; the record does not name the person behind it."],
			openWorld: false
		},
		show: {
			name: "puzzles_show",
			title: "Show Puzzle",
			description: "Show one puzzle's address, status, key material, transactions, techniques, up to three hints per block, explorer links, and the repository paths of its files.",
			promptSnippet: "Use puzzles_show to inspect a single puzzle by identifier, then puzzles_assets to read its files by path instead of downloading them.",
			promptGuidelines: [
				"Identifiers are collection/name, for example bits/90, or gsmg.",
				"More than three increases in a row, each under 1% of the largest transaction, print as one line with their count, dates and total; pass allTransactions for each one with its txid.",
				"A block of more than three hints prints as its count; puzzles_hints lists every hint with its source.",
				"A technique says how the key or a stage was built, with the page that says so; an unsolved puzzle has one only where its author stated it."
			],
			openWorld: false
		},
		hints: {
			name: "puzzles_hints",
			title: "Puzzle Hints",
			description: "List a puzzle's own and inherited hints with sources, optional confirmations, separately labeled published answers, and the paths of its hint files.",
			promptSnippet: "Use puzzles_hints for what the author or the community said about a puzzle before searching for its key.",
			promptGuidelines: [
				"An official hint comes from the puzzle's author; a community hint comes from anyone else and may be wrong.",
				"The source is the published hint. An optional confirmation links to an archive or another publication of that same hint, not general information about the puzzle.",
				"An answer records a published response to one hint, not a verified puzzle solution or key."
			],
			openWorld: false
		},
		stages: {
			name: "puzzles_stages",
			title: "Puzzle Stages",
			description: "List the stages of a puzzle that runs in several, in the author's order: what each one shows, the pages and files the author published for it, the paths of the repository copies, and the published answer when somebody solved it.",
			promptSnippet: "Use puzzles_stages to walk a multi-stage puzzle step by step and see which steps already have a public answer.",
			promptGuidelines: ["A stage's about line describes it and never gives its answer; the answer, when there is one, carries its own source and date.", "A stage without an answer is not proven unsolvable, only unsolved in public as far as the record knows."],
			openWorld: false
		},
		assets: {
			name: "puzzles_assets",
			title: "Puzzle Files",
			description: "List the files a puzzle ships, its image, hint files, solution and stage artifacts, with the size and SHA-256 its record pins, and the repository's reading copies of the pages it cites, or read one of them by path: text comes back as text, an image as an image, and a pinned file only with the bytes the record pins.",
			promptSnippet: "Use puzzles_assets to read a puzzle's own files and the archived posts behind its hints and answers, instead of fetching pages that may have changed or vanished.",
			promptGuidelines: [
				"A read tries the repository copy its link names, this release's tag or the commit a checkout or puzzles.agntn.dev runs, then on main for a file merged since, then for a pinned file the author's URL and the archive capture, and returns the first copy whose bytes match the record.",
				"An archived source is a reading copy of a page the record cites, with its transcript and every comment that survived. The `screenshot .png` on its row is the same path ending in .png: a recent render, not the original image, so analyze the puzzle's own files instead.",
				"A file over 3.75 MiB, or neither an image nor UTF-8 text, can't come back inline. The error names the URL to download it from."
			],
			openWorld: true
		},
		list: {
			name: "puzzles_list",
			title: "List Puzzles",
			description: "List puzzles filtered by target address, collection, chain, status, technique, and public key availability, in dataset order. When a next offset is returned, pass it as offset with the same filters to continue.",
			promptSnippet: "Use puzzles_list to browse puzzles by collection, chain or status, or to find the puzzle an address belongs to.",
			promptGuidelines: [
				"Prefer a collection, chain or status filter over listing everything.",
				"Almost every puzzle is on Bitcoin, so a chain filter is the way to find the few that are not.",
				"Given an address, pass it as address instead of listing the dataset and reading every row. An empty result means no puzzle pays to it, unless the answer names a puzzle the other filters left out or says no chain accepts the address.",
				"Follow the next offset with the same filters instead of raising limit and repeating earlier rows.",
				"A technique filter finds the puzzles built the same way, across collections; puzzles_stats counts each technique."
			],
			openWorld: false
		},
		verify: {
			...verifyById,
			description: `${verifyById.description} Takes one id, or the puzzles_list filters to check every puzzle they match in one call.`,
			promptSnippet: "Use puzzles_verify to confirm recorded key material before trusting it, or to replay a whole technique or collection at once.",
			promptGuidelines: [...verifyById.promptGuidelines, "Pass id or filters, not both. A filtered answer prints every miss in full and folds the rest into ids per reason, so one call replays a technique such as md5-to-bip39-entropy."]
		},
		balance: {
			name: "puzzles_balance",
			title: "Puzzle Balance",
			description: "Fetch the current on-chain balance of a puzzle address.",
			promptSnippet: "Use puzzles_balance for the live balance of a puzzle address.",
			promptGuidelines: [
				"This call reaches a public block explorer.",
				"Ethereum reads Blockscout, or Etherscan once apiKey or ETHERSCAN_API_KEY holds its key.",
				"It counts the chain's own coin, so a prize paid in a token such as DAI is not in it."
			],
			openWorld: true
		},
		watch: {
			name: "puzzles_watch",
			title: "Watch Puzzle",
			description: "Compare one puzzle with its chain, and with its source page when since is given, and list what the record misses: deposits and spends it doesn't record, an unsolved prize the address no longer holds, a public key a spend showed that the record lacks or spells otherwise, a source page that changed after since.",
			promptSnippet: "Use puzzles_watch to check whether a puzzle's record is still current before relying on its prize or transactions.",
			promptGuidelines: [
				"This call reaches a block explorer, and the Wayback Machine when since is given, which can take a minute.",
				"A finding is a difference from the record for a person to review, not an edit: the tool never changes a record.",
				"It reads up to 1000 transactions per address, page by page, and leaves out incoming calls that move no coin. A PARTIAL row names an address with more, whose older transactions went unchecked.",
				"A FAIL row is a check that could not run, so the record is unconfirmed there, not confirmed."
			],
			openWorld: true
		},
		eligibility: {
			name: "puzzles_eligibility",
			title: "Puzzle Eligibility",
			description: "Gather what to check before working on a puzzle in one record: identity and source, chain, address and script type, a live read of every prize address with what it received and spent, the status with its evidence, the carriers with the repository paths of its files, what counts as a solution, and every field nobody can fill. Takes an identifier, or an address no record holds.",
			promptSnippet: "Use puzzles_eligibility before working on a prize puzzle, instead of assembling the checklist from puzzles_show, puzzles_balance and an explorer.",
			promptGuidelines: [
				"This call reaches a block explorer.",
				"A missing row is a field neither the record nor the explorer fills. It's never guessed, so treat it as unknown.",
				"A conflict row means the record and the chain disagree, such as a prize the addresses no longer hold. puzzles_watch lists the transactions behind it.",
				"An address that fits more than one chain, such as an Ethereum one that also reads on Base, needs chain."
			],
			openWorld: true
		}
	},
	parameters: {
		id: {
			minLength: 1,
			maxLength: 100,
			description: "Puzzle identifier, collection/name such as bits/90; only a one-puzzle collection goes by its bare key, such as gsmg"
		},
		file: {
			minLength: 1,
			maxLength: 200,
			description: "Path of one file to read, as the listing prints it, for example assets/gsmg/phase3.txt. Leave it out to list them"
		},
		address: {
			minLength: 1,
			maxLength: 128,
			description: "The puzzle paying to this address. Case only matters where the chain says it does, so an EIP-55 Ethereum address and an uppercased bech32 one both resolve"
		},
		chain: { description: "Only puzzles on one blockchain" },
		addressChain: { description: "Chain of an address whose format fits more than one, for example base" },
		query: {
			minLength: 1,
			maxLength: 128,
			description: "Puzzle identifier, for example bits/71, or an address, whether a record holds it or not"
		},
		collection: {
			minLength: 1,
			maxLength: 50,
			description: "Collection key, for example bits"
		},
		author: {
			minLength: 1,
			maxLength: 50,
			description: "Author key, for example peter-todd, or a collection key such as hash-collision"
		},
		solver: {
			minLength: 1,
			maxLength: 100,
			description: "Solver key, for example retired-coder, or a puzzle identifier such as bits/135"
		},
		status: { description: "Lifecycle status: unsolved, solved, claimed (prize taken, key unpublished), swept (taken after the public key leaked), or expired (the author took it back)" },
		technique: { description: "Only puzzles built with this technique, by their collection, their record or one of their stages, for example md5-to-bip39-entropy" },
		withPubkey: { description: "Only puzzles with a known public key" },
		allTransactions: { description: "List every transaction with its txid, instead of folding runs of small increases into one line" },
		limit: {
			minimum: 1,
			maximum: 500,
			description: `Maximum puzzles to return (default 50)`
		},
		offset: {
			minimum: 0,
			maximum: Number.MAX_SAFE_INTEGER,
			description: "Number of matching puzzles to skip (default 0). Use the returned next offset."
		},
		since: {
			minLength: 10,
			maxLength: 40,
			description: "Also compare the source page's newest Wayback capture with the last one up to this moment, YYYY-MM-DD or ISO 8601, usually the date of the previous check"
		},
		apiKey: {
			maxLength: 200,
			description: "Provider API key; Ethereum falls back to ETHERSCAN_API_KEY, Bitcoin Cash, Dogecoin, eCash and the Litecoin fallback to BLOCKCHAIR_API_KEY"
		}
	},
	chains: [
		"arweave",
		"base",
		"bitcoin",
		"bitcoincash",
		"decred",
		"dogecoin",
		"ecash",
		"ethereum",
		"litecoin",
		"monero"
	],
	statuses: Object.values(Status),
	techniques,
	publicTools: { verify: verifyById }
};
const toolArguments = {
	stats: [],
	collections: [],
	authors: [],
	author: ["key"],
	solvers: [],
	solver: ["key"],
	show: ["id", "allTransactions"],
	hints: ["id"],
	stages: ["id"],
	assets: ["id", "file"],
	list: [
		"address",
		"chain",
		"collection",
		"limit",
		"offset",
		"status",
		"technique",
		"withPubkey"
	],
	verify: [
		"id",
		"address",
		"chain",
		"collection",
		"status",
		"technique",
		"withPubkey"
	],
	balance: ["id", "apiKey"],
	watch: [
		"id",
		"since",
		"apiKey"
	],
	eligibility: [
		"query",
		"chain",
		"apiKey"
	]
};
function text(value, details) {
	return {
		content: [{
			type: "text",
			text: value
		}],
		details
	};
}
function assertLength(argument, value, limits) {
	const minimum = limits.minLength ?? 0;
	if (typeof value !== "string" || value.length < minimum || limits.maxLength !== void 0 && value.length > limits.maxLength) throw new InvalidArgumentError(argument, `expected ${minimum} to ${limits.maxLength ?? "any"} characters`);
	return value;
}
function assertFlag(argument, value) {
	if (value === void 0) return false;
	if (typeof value !== "boolean") throw new InvalidArgumentError(argument, "expected true or false");
	return value;
}
function assertLimit(value) {
	if (value === void 0) return 50;
	const { minimum, maximum } = facts.parameters.limit;
	if (!Number.isSafeInteger(value) || value < minimum || value > maximum) throw new InvalidArgumentError("limit", `expected an integer from ${minimum} to ${maximum}`);
	return value;
}
function assertArguments(tool, params) {
	const known = toolArguments[tool];
	if (known.length === 0) return;
	if (typeof params !== "object" || params === null || Array.isArray(params)) throw new InvalidArgumentError("arguments", "expected an object");
	const unknown = Object.keys(params).find((key) => !known.includes(key));
	if (unknown !== void 0) throw new InvalidArgumentError("arguments", `unknown property ${JSON.stringify(unknown)}, expected one of ${known.join(", ")}`);
}
function assertOffset(value) {
	if (value === void 0) return 0;
	const { minimum, maximum } = facts.parameters.offset;
	if (!Number.isSafeInteger(value) || value < minimum || value > maximum) throw new InvalidArgumentError("offset", `expected an integer from ${minimum} to ${maximum}`);
	return value;
}
let core;
function loadCore() {
	return core ??= (async () => {
		return {
			dataset: await import("./dataset.mjs"),
			registry: await import("./registry2.mjs"),
			utils: await import("./utils.mjs")
		};
	})();
}
async function statsTool() {
	const { dataset: { stats, dataVersion }, registry: { collectionKeys }, utils: { countOf, formatPrizeTotals, formatTechniqueCounts } } = await loadCore();
	const [result, version] = await Promise.all([stats(), dataVersion()]);
	return text([
		`Total: ${countOf(result.total, "puzzle")} in ${countOf(collectionKeys().length, "collection")}`,
		`Solved: ${result.solved}  Unsolved: ${result.unsolved}  Claimed: ${result.claimed}  Swept: ${result.swept}  Expired: ${result.expired}`,
		`With public key: ${result.with_pubkey}`,
		`Total prize: ${formatPrizeTotals(result.total_prize)}`,
		`Unsolved prize: ${formatPrizeTotals(result.unsolved_prize)}`,
		`Techniques: ${formatTechniqueCounts(result.techniques)}`,
		`Data version: ${version}`
	].join("\n"), {
		...result,
		data_version: version
	});
}
async function collectionsTool() {
	const { dataset: { collectionSummaries }, utils: { formatCollection } } = await loadCore();
	const summaries = await collectionSummaries();
	return text(summaries.map(formatCollection).join("\n"), { collections: summaries });
}
async function authorsTool() {
	const { dataset: { authors }, utils: { formatAuthor } } = await loadCore();
	const entries = await authors();
	return text(entries.map(formatAuthor).join("\n"), { authors: entries });
}
async function authorTool(key) {
	const { dataset: { getAuthor, requireAuthor }, registry: { getCollection }, utils: { formatAuthorRecord } } = await loadCore();
	const wanted = assertLength("key", key, facts.parameters.author);
	const entry = await requireAuthor((await getAuthor(wanted) === void 0 ? await getCollection(wanted) : void 0)?.author.key ?? wanted);
	return text(formatAuthorRecord(entry), { author: entry });
}
async function solversTool() {
	const { dataset: { solvers }, utils: { formatSolver } } = await loadCore();
	const entries = await solvers();
	return text(entries.map(formatSolver).join("\n"), { solvers: entries });
}
async function solverTool(key) {
	const { dataset: { requireSolver, resolveSolverKey }, utils: { formatSolverRecord } } = await loadCore();
	const entry = await requireSolver(await resolveSolverKey(assertLength("key", key, facts.parameters.solver)));
	return text(formatSolverRecord(entry), { solver: entry });
}
async function filesLine(puzzle, collection) {
	const { utils: { countOf } } = await loadCore();
	const { citedArchivedSources } = await import("./archived-sources.mjs");
	const shipped = puzzle.assetLinks().length;
	const sources = citedArchivedSources(puzzle, collection).length;
	if (shipped + sources === 0) return [];
	return [`files: ${`${countOf(shipped, "file")}, ${countOf(sources, "archived source")}`}; ${facts.tools.assets.name} lists them and reads one by its path`];
}
async function withFilesLine(report, puzzle, collection) {
	return [...report, ...await filesLine(puzzle, collection)].join("\n");
}
async function showTool(id, allTransactions) {
	const { dataset: { requirePuzzle }, registry: { requireCollection }, utils: { formatPuzzleRecord } } = await loadCore();
	const every = assertFlag("allTransactions", allTransactions);
	const puzzle = await requirePuzzle(assertLength("id", id, facts.parameters.id));
	const collection = await requireCollection(puzzle.collection());
	return text(await withFilesLine([formatPuzzleRecord(puzzle, collection.hints, collection.techniques, every, "path")], puzzle, collection), {
		puzzle,
		hints: collection.hintsById(puzzle.id()),
		techniques: collection.techniquesById(puzzle.id())
	});
}
async function stagesTool(id) {
	const { dataset: { requirePuzzle }, registry: { requireCollection }, utils: { formatStageReport } } = await loadCore();
	const puzzle = await requirePuzzle(assertLength("id", id, facts.parameters.id));
	const collection = await requireCollection(puzzle.collection());
	return text(await withFilesLine(formatStageReport(puzzle, "path"), puzzle, collection), {
		id: puzzle.id(),
		stages: puzzle.stages()
	});
}
async function assetsTool(id, file) {
	const { dataset: { requirePuzzle }, registry: { requireCollection } } = await loadCore();
	const puzzle = await requirePuzzle(assertLength("id", id, facts.parameters.id));
	const wanted = file === void 0 ? void 0 : assertLength("file", file, facts.parameters.file);
	const { citedArchivedSources } = await import("./archived-sources.mjs");
	const { fileBlock, formatFileRead, formatFileReport, puzzleFiles, readPuzzleFile } = await import("./files.mjs");
	const collection = await requireCollection(puzzle.collection());
	const files = puzzleFiles(puzzle.assetLinks(), citedArchivedSources(puzzle, collection));
	if (wanted === void 0) return text(formatFileReport(puzzle.id(), files).join("\n"), {
		id: puzzle.id(),
		files
	});
	const target = files.find((candidate) => candidate.path === wanted);
	if (target === void 0) throw new InvalidArgumentError("file", `${oneLine(JSON.stringify(wanted))} is not a file of ${puzzle.id()}; call ${facts.tools.assets.name} without file for the list`);
	const content = await readPuzzleFile(target);
	return {
		content: [{
			type: "text",
			text: formatFileRead(content)
		}, fileBlock(content)],
		details: {
			id: puzzle.id(),
			file: target,
			bytes: content.data.length,
			sha256: content.sha256,
			servedBy: content.servedBy
		}
	};
}
async function hintsTool(id) {
	const { dataset: { requirePuzzle }, registry: { requireCollection }, utils: { formatHintReport, hintAssets } } = await loadCore();
	const puzzle = await requirePuzzle(assertLength("id", id, facts.parameters.id));
	const collection = await requireCollection(puzzle.collection());
	return text(await withFilesLine(formatHintReport(puzzle, collection.hints, "path"), puzzle, collection), {
		id: puzzle.id(),
		hints: collection.hintsById(puzzle.id()),
		hintAssets: hintAssets(puzzle)
	});
}
async function outsideFilters(query) {
	const { dataset: { selectPuzzles }, registry: { requireCollection } } = await loadCore();
	const expected = {
		collection: query.collection === void 0 ? void 0 : (await requireCollection(query.collection)).key,
		chain: query.chain,
		status: query.status
	};
	const lines = [];
	const outside = [];
	for (const puzzle of await selectPuzzles({ address: query.address })) {
		const actual = {
			collection: puzzle.collection(),
			chain: puzzle.chain(),
			status: puzzle.status()
		};
		const reasons = Object.entries(expected).filter(([filter, value]) => value !== void 0 && actual[filter] !== value).map(([filter, value]) => [filter, `its ${filter} is ${actual[filter]} (not ${value})`]);
		if (query.withPubkey === true && !puzzle.hasPubkey()) reasons.push(["withPubkey", "it has no public key recorded"]);
		const { technique } = query;
		const tags = (await requireCollection(puzzle.collection())).techniquesById(puzzle.id());
		if (technique !== void 0 && !tags.some((tag) => tag.name === technique)) reasons.push(["technique", `it records no ${technique} technique`]);
		lines.push(`${puzzle.id()} pays to this address, but ${reasons.map(([, reason]) => reason).join(" and ")}.`);
		outside.push({
			id: puzzle.id(),
			filters: reasons.map(([filter]) => filter)
		});
	}
	return {
		lines,
		outside
	};
}
async function addressNotes(query, address) {
	const { chains, isValidAddress } = await import("./chains.mjs");
	if (!chains.some((chain) => isValidAddress(chain, address))) return {
		lines: ["No supported chain accepts this address; its checksum or format is off."],
		details: { addressValid: false }
	};
	const { lines, outside } = await outsideFilters(query);
	return {
		lines,
		details: outside.length > 0 ? { outside } : {}
	};
}
async function listQuery(params) {
	const { utils: { parseStatus, parseTechnique, requireChain } } = await loadCore();
	return {
		address: params.address === void 0 ? void 0 : assertLength("address", params.address, facts.parameters.address),
		chain: requireChain(params.chain),
		collection: params.collection === void 0 ? void 0 : assertLength("collection", params.collection, facts.parameters.collection),
		status: parseStatus(params.status),
		technique: parseTechnique(params.technique),
		withPubkey: params.withPubkey
	};
}
async function listTool(params) {
	const { dataset: { selectPuzzles }, utils: { formatPuzzle } } = await loadCore();
	assertArguments("list", params);
	const limit = assertLimit(params.limit);
	const offset = assertOffset(params.offset);
	const query = await listQuery(params);
	const filtered = await selectPuzzles(query);
	const page = filtered.slice(offset, offset + limit);
	const end = offset + page.length;
	const count = filtered.length > page.length ? `${page.length} of ${filtered.length}` : `${filtered.length}`;
	const position = offset === 0 ? "" : ` (offset ${offset})`;
	const body = page.length === 0 ? "(none)" : page.map((puzzle) => formatPuzzle(puzzle)).join("\n");
	const lines = [`${count} matching puzzles${position}:`, body];
	const more = end < filtered.length;
	if (more) lines.push(`Next page: offset=${end}. Keep the same filters.`);
	const notes = filtered.length === 0 && query.address !== void 0 ? await addressNotes(query, query.address) : {
		lines: [],
		details: {}
	};
	return text([...lines, ...notes.lines].join("\n"), {
		matched: filtered.length,
		returned: page.length,
		offset,
		...more ? { nextOffset: end } : {},
		ids: page.map((puzzle) => puzzle.id()),
		...notes.details
	});
}
async function verifyTool(query) {
	const params = typeof query === "string" ? { id: query } : query;
	assertArguments("verify", params);
	const { id, withPubkey, ...rest } = params;
	const filtered = assertFlag("withPubkey", withPubkey) || Object.values(rest).some((value) => value !== void 0);
	if (id !== void 0 && filtered) throw new InvalidArgumentError("id", "pass a puzzle identifier or filters, not both");
	if (id !== void 0) return verifyOne(id);
	if (!filtered) throw new InvalidArgumentError("id", "pass a puzzle identifier, or a filter such as technique");
	return verifyMany(await listQuery(params));
}
async function verifyOne(id) {
	const { dataset: { requirePuzzle } } = await loadCore();
	const puzzle = await requirePuzzle(assertLength("id", id, facts.parameters.id));
	const { verify } = await import("./verify.mjs");
	const result = await verify(puzzle);
	return text(verdictOf(result), { ...result });
}
async function verifyMany(query) {
	const { dataset: { selectPuzzles }, utils: { countOf } } = await loadCore();
	const puzzles = await selectPuzzles(query);
	if (puzzles.length === 0) throw new InvalidArgumentError("filters", "no puzzle matches them, so nothing was verified");
	const { verify } = await import("./verify.mjs");
	const results = await Promise.all(puzzles.map((puzzle) => verify(puzzle)));
	const misses = results.filter(missed);
	const clean = results.filter((result) => !missed(result));
	const verified = clean.filter((result) => result.verified).map((result) => result.id);
	const unverifiable = Map.groupBy(clean.filter((result) => !result.verified), (result) => result.error ?? "");
	const idle = Map.groupBy(clean.filter((result) => result.recipe?.unavailable === true), (result) => result.recipe?.error ?? "");
	return text([
		`${countOf(results.length, "puzzle")}: ${tally(results)}`,
		...misses.map(verdictOf),
		...folded("Unverifiable", unverifiable),
		...folded("Recipe can't run", idle),
		...verified.length === 0 ? [] : [`Verified: ${verified.join(", ")}`]
	].join("\n"), {
		matched: results.length,
		misses: misses.length,
		results
	});
}
function missed(result) {
	const key = !result.verified && !result.unavailable;
	const { recipe } = result;
	return key || recipe !== void 0 && !recipe.verified && !recipe.unavailable;
}
function folded(label, groups) {
	return [...groups].map(([reason, group]) => `${label} (${reason}): ${group.map((result) => result.id).join(", ")}`);
}
function tally(results) {
	const count = (test) => results.filter(test).length;
	const keys = [
		`${count((r) => r.verified)} verified`,
		`${count((r) => !r.verified && !r.unavailable)} not verified`,
		`${count((r) => !r.verified && r.unavailable)} unverifiable`
	];
	const recipes = results.flatMap((r) => r.recipe === void 0 ? [] : [r.recipe]);
	if (recipes.length === 0) return keys.join(", ");
	const rerun = [
		`${recipes.filter((r) => r.verified).length} derive their address`,
		`${recipes.filter((r) => !r.verified && !r.unavailable).length} miss`,
		`${recipes.filter((r) => r.unavailable).length} can't run`
	];
	const noun = recipes.length === 1 ? "recipe" : "recipes";
	return `${keys.join(", ")}; ${recipes.length} ${noun}: ${rerun.join(", ")}`;
}
function verdictOf(result) {
	return (result.verified ? `${result.id}: verified, derives ${result.derivedAddress}` : result.unavailable ? `${result.id}: unverifiable (${result.error})` : `${result.id}: not verified (${result.error})`) + recipeSummary(result.recipe);
}
function recipeSummary(recipe) {
	if (recipe === void 0) return "";
	const path = recipe.path === void 0 ? "" : ` at ${recipe.path}`;
	const outcome = recipe.verified ? `derives ${recipe.derivedAddress}` : recipe.unavailable ? `can't run (${recipe.error})` : `misses, a data bug in the record (${recipe.error})`;
	return `\nRecipe ${recipe.recipe}${path}: ${outcome}`;
}
async function balanceTool(id, apiKey) {
	const { dataset: { requirePuzzle }, utils: { formatBalance } } = await loadCore();
	const puzzle = await requirePuzzle(assertLength("id", id, facts.parameters.id));
	const balance = await puzzle.balance({ apiKey: keyFor(puzzle.chain(), apiKey) });
	return text(`${puzzle.id()}: ${formatBalance(balance)}`, {
		id: puzzle.id(),
		chain: balance.chain,
		confirmed: balance.confirmed.toString(),
		unconfirmed: balance.unconfirmed.toString(),
		decimals: balance.decimals
	});
}
function keyFor(chain, apiKey) {
	const key = apiKey === void 0 ? void 0 : assertLength("apiKey", apiKey, facts.parameters.apiKey);
	const variable = apiKeyVariables[chain];
	return key ?? (variable === void 0 ? void 0 : globalThis.process?.env[variable]);
}
async function watchTool(id, since, apiKey) {
	const { dataset: { requirePuzzle } } = await loadCore();
	const puzzle = await requirePuzzle(assertLength("id", id, facts.parameters.id));
	const cutoff = since === void 0 ? void 0 : assertLength("since", since, facts.parameters.since);
	const { formatWatchReport, watcher } = await import("./watch.mjs");
	const report = await watcher({ since: cutoff })(puzzle, keyFor(puzzle.chain(), apiKey));
	const { findings, errors } = report;
	const counts = [`${findings.length} ${findings.length === 1 ? "difference" : "differences"} from the record`, ...errors.length === 0 ? [] : [`${errors.length} ${errors.length === 1 ? "check" : "checks"} failed`]];
	return text([
		`${puzzle.id()}: ${counts.join(", ")}`,
		...formatWatchReport(report),
		...cutoff === void 0 ? ["Source page not checked; pass since to compare its archive captures."] : []
	].join("\n"), {
		id: report.id,
		chain: report.chain,
		findings: findings.map((finding) => finding.kind === "balance" ? {
			...finding,
			balance: finding.balance.toString()
		} : finding.kind === "source" || finding.kind === "pubkey" ? finding : {
			...finding,
			amount: finding.amount.toString()
		}),
		errors,
		truncated: report.truncated
	});
}
async function eligibilityText(head, record) {
	const { formatEligibility } = await import("./eligibility.mjs");
	if (record.id === void 0) return [head, ...formatEligibility(record)].join("\n");
	const { dataset: { requirePuzzle }, registry: { requireCollection } } = await loadCore();
	const puzzle = await requirePuzzle(record.id);
	const paths = new Map(puzzle.assetLinks().map((link) => [link.url, link.path]));
	const carriers = record.carriers.map((line) => paths.get(line) ?? line);
	return withFilesLine([head, ...formatEligibility({
		...record,
		carriers
	})], puzzle, await requireCollection(puzzle.collection()));
}
async function eligibilityTool(query, chain, apiKey) {
	const checked = assertLength("query", query, facts.parameters.query);
	const key = apiKey === void 0 ? void 0 : assertLength("apiKey", apiKey, facts.parameters.apiKey);
	const { eligibility } = await import("./eligibility.mjs");
	const record = await eligibility(checked, {
		apiKey: key,
		apiKeyFor: (resolved) => keyFor(resolved, void 0),
		chain
	});
	const { missing } = record;
	const summary = missing.length === 0 ? "complete" : `${missing.length} ${missing.length === 1 ? "field" : "fields"} missing`;
	return text(await eligibilityText(`${record.id ?? record.address}: ${summary}`, record), {
		...record,
		live: record.live.map((state) => ({
			...state,
			confirmed: state.confirmed.toString(),
			unconfirmed: state.unconfirmed.toString(),
			...state.funded === void 0 ? {} : { funded: state.funded.toString() },
			...state.spent === void 0 ? {} : { spent: state.spent.toString() }
		}))
	});
}
export { DEFAULT_LIST_LIMIT, MAX_LIST_LIMIT, assertArguments, assetsTool, authorTool, authorsTool, balanceTool, collectionsTool, eligibilityTool, facts, hintsTool, listTool, showTool, solverTool, solversTool, stagesTool, statsTool, toolArguments, verifyTool, watchTool };
