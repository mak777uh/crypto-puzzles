#!/usr/bin/env node
import { version } from "./_chunks/version.mjs";
import { InvalidArgumentError, PuzzlesError } from "./_chunks/errors.mjs";
import { useCommitAssets } from "./_chunks/asset-ref.mjs";
import { BalanceError, apiKeyVariables } from "./_chunks/balance.mjs";
import { oneLine } from "./_chunks/text.mjs";
import { authorTool, facts, solverTool } from "./_chunks/tool-operations.mjs";
import { serverInfo } from "./_chunks/server-info.mjs";
import { puzzlesTools } from "./_chunks/tools.mjs";
import { existsSync } from "node:fs";
import { join, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { runCli } from "@agntn/tools/cli";
import { execFileSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import { Type, defineTool, sanitizeText } from "@agntn/tools";
import { setTimeout } from "node:timers/promises";
function checkoutCommit(root) {
	if (!existsSync(join(root, ".git"))) return;
	try {
		return execFileSync("git", [
			"merge-base",
			"HEAD",
			"origin/main"
		], {
			cwd: root,
			encoding: "utf8",
			stdio: [
				"ignore",
				"pipe",
				"ignore"
			],
			timeout: 2e3
		}).trim() || void 0;
	} catch {
		return;
	}
}
function useCheckoutAssets(root) {
	const commit = checkoutCommit(root);
	if (commit !== void 0) useCommitAssets(commit);
}
const { chains, statuses, techniques } = facts;
function closed(properties) {
	return Type.Object(properties, { additionalProperties: false });
}
const filterArgs = {
	address: Type.Optional(Type.String({ description: "The puzzle paying to this address, in any case the chain accepts" })),
	chain: Type.Optional(Type.String({ description: `Filter by chain: ${chains.join(", ")}` })),
	status: Type.Optional(Type.String({ description: `Filter by status: ${statuses.join(", ")}` })),
	technique: Type.Optional(Type.String({ description: `Filter by technique: ${techniques.join(", ")}` })),
	withPubkey: Type.Optional(Type.Boolean({ description: "Only puzzles with a known public key" }))
};
const collectionArg = { collection: Type.Optional(Type.String({ description: "Filter by collection key, for example bits" })) };
const apiKeyArg = { apiKey: Type.Optional(Type.String({ description: "Provider API key; Ethereum falls back to ETHERSCAN_API_KEY, Bitcoin Cash, Dogecoin, eCash and the Litecoin fallback to BLOCKCHAIR_API_KEY" })) };
function hasFilter(args) {
	return args.address !== void 0 || args.chain !== void 0 || args.collection !== void 0 || args.status !== void 0 || args.technique !== void 0 || args.withPubkey === true;
}
async function filterQuery(args) {
	const { parseStatus, parseTechnique, requireChain } = await import("./_chunks/utils.mjs");
	return {
		address: args.address,
		chain: requireChain(args.chain),
		collection: args.collection,
		status: parseStatus(args.status),
		technique: parseTechnique(args.technique),
		withPubkey: args.withPubkey
	};
}
function printLine(value) {
	process.stdout.write(`${sanitizeText(value)}\n`);
}
function printError(value) {
	process.stderr.write(`${oneLine(value)}\n`);
}
function lines(rows, details) {
	return {
		content: rows.length === 0 ? [] : [{
			type: "text",
			text: rows.join("\n")
		}],
		details
	};
}
function streams(host) {
	const cli = host;
	return cli?.cli === true && !cli.json;
}
const LIVE_TIMEOUT_MS = 3e4;
const FAILED = /* @__PURE__ */ new Set(["MISMATCH", "MISSING"]);
async function compare(link, data) {
	const { sha256 } = await import("@agntn/hashes");
	const actual = {
		sha256: sha256(data).toHex(),
		bytes: data.length
	};
	if (link.sha256 === void 0) return {
		...link,
		actual,
		status: "UNPINNED"
	};
	return actual.sha256 === link.sha256 && actual.bytes === link.bytes ? {
		...link,
		status: "MATCH"
	} : {
		...link,
		actual,
		status: "MISMATCH"
	};
}
async function checkLocal(link, directory) {
	try {
		return await compare(link, new Uint8Array(await readFile(join(directory, link.file))));
	} catch (error) {
		const code = error.code;
		if (code === "ENOENT" || code === "ENOTDIR") return {
			...link,
			status: "MISSING"
		};
		throw error;
	}
}
async function checkLive(link) {
	if (link.origin === void 0) return {
		...link,
		status: "NO_ORIGIN"
	};
	try {
		const response = await fetch(link.origin, { signal: AbortSignal.timeout(LIVE_TIMEOUT_MS) });
		if (!response.ok) return {
			...link,
			status: "UNREACHABLE",
			error: `HTTP ${response.status}`
		};
		return await compare(link, new Uint8Array(await response.arrayBuffer()));
	} catch (error) {
		const { fetchFailure } = await import("./_chunks/files.mjs");
		return {
			...link,
			status: "UNREACHABLE",
			error: oneLine(fetchFailure(error))
		};
	}
}
function formatLink(link, live) {
	const url = live ? link.origin ?? "-" : link.url;
	const columns = [
		link.kind,
		link.file,
		link.bytes ?? "-",
		link.sha256 ?? "-",
		url
	];
	if (!("status" in link)) return columns.join("	");
	return [
		link.status,
		...columns,
		...link.error === void 0 ? [] : [link.error]
	].join("	");
}
async function checkAll(links, directory, live) {
	if (directory !== void 0) return Promise.all(links.map((link) => checkLocal(link, directory)));
	return live ? Promise.all(links.map((link) => checkLive(link))) : links;
}
async function read(puzzle, path, host) {
	if (!streams(host)) throw new InvalidArgumentError("read", "writes the file's bytes to stdout, so it takes no --json");
	const { requireCollection } = await import("./_chunks/registry2.mjs");
	const { citedArchivedSources } = await import("./_chunks/archived-sources.mjs");
	const { formatFileRead, puzzleFiles, readPuzzleFile } = await import("./_chunks/files.mjs");
	const collection = await requireCollection(puzzle.collection());
	const target = puzzleFiles(puzzle.assetLinks(), citedArchivedSources(puzzle, collection)).find((file) => file.path === path);
	if (target === void 0) throw new InvalidArgumentError("read", `${oneLine(JSON.stringify(path))} is not a file of ${puzzle.id()}; run puzzles assets ${puzzle.id()} for the list`);
	const content = await readPuzzleFile(target, Number.POSITIVE_INFINITY);
	printError(formatFileRead(content));
	process.stdout.write(content.data);
	return {
		content: [],
		details: null
	};
}
async function list(puzzle) {
	const { requireCollection } = await import("./_chunks/registry2.mjs");
	const { citedArchivedSources } = await import("./_chunks/archived-sources.mjs");
	const { formatFileReport, puzzleFiles } = await import("./_chunks/files.mjs");
	const collection = await requireCollection(puzzle.collection());
	const files = puzzleFiles(puzzle.assetLinks(), citedArchivedSources(puzzle, collection));
	const sources = files.filter((file) => file.kind === "source" || file.kind === "screenshot");
	return lines(formatFileReport(puzzle.id(), files), {
		id: puzzle.id(),
		assets: puzzle.assetLinks(),
		sources
	});
}
async function check(puzzle, directory, live) {
	const files = await checkAll(puzzle.assetLinks(), directory, live);
	if (files.some((file) => "status" in file && FAILED.has(file.status))) process.exitCode = 1;
	return lines(files.length === 0 ? [`${puzzle.id()}: no assets recorded`] : files.map((file) => formatLink(file, live)), {
		id: puzzle.id(),
		assets: files
	});
}
var assets_default = defineTool({
	name: "puzzles_assets",
	title: "Puzzle files",
	description: "List the files a puzzle ships and the archived copies of the pages it cites, read one, or check copies against the pinned SHA-256",
	effect: "read",
	openWorld: true,
	input: closed({
		id: Type.String({ description: "Puzzle identifier, for example gsmg" }),
		read: Type.Optional(Type.String({ description: "Write one file to stdout, by the path the listing prints, once its bytes match the record" })),
		check: Type.Optional(Type.String({ description: "Directory with local copies, named as the record names them, to hash and compare" })),
		live: Type.Optional(Type.Boolean({ description: "Fetch each file from the author's URL the record pins and compare it" }))
	}),
	cli: {
		command: "assets",
		positional: ["id"],
		plain: ["id"]
	},
	async execute(args, { host }) {
		if ([
			args.read !== void 0,
			args.check !== void 0,
			args.live === true
		].filter(Boolean).length > 1) throw new InvalidArgumentError("read", "pass one of --read, --check and --live");
		const { requirePuzzle } = await import("./_chunks/dataset.mjs");
		const puzzle = await requirePuzzle(args.id);
		if (args.read !== void 0) return read(puzzle, args.read, host);
		if (args.check === void 0 && args.live !== true) return list(puzzle);
		return check(puzzle, args.check, args.live === true);
	}
});
const author = defineTool({
	name: "puzzles_author",
	title: "Puzzle author",
	description: "Show one author by author or collection key",
	effect: "read",
	input: closed({ key: Type.String({ description: "Author key, or a collection key" }) }),
	cli: {
		command: "author",
		positional: ["key"],
		plain: ["key"]
	},
	execute: (args) => authorTool(args.key)
});
var authors_default = defineTool({
	name: "puzzles_authors",
	title: "Puzzle authors",
	description: "List every author, or show one by author or collection key",
	effect: "read",
	input: closed({ key: Type.Optional(Type.String({ description: "Author key, or a collection key" })) }),
	cli: {
		command: "authors",
		positional: ["key"],
		plain: ["key"]
	},
	async execute(args) {
		const { authors, getAuthor, requireAuthor } = await import("./_chunks/dataset.mjs");
		const { getCollection } = await import("./_chunks/registry2.mjs");
		const { formatAuthor, formatAuthorRecord } = await import("./_chunks/utils.mjs");
		if (args.key === void 0) {
			const entries = await authors();
			return lines(entries.map(formatAuthor), entries);
		}
		const entry = await requireAuthor((await getAuthor(args.key) === void 0 ? await getCollection(args.key) : void 0)?.author.key ?? args.key);
		return lines([formatAuthorRecord(entry)], entry);
	}
});
function formatRow(row, format) {
	return row.error === void 0 ? `OK\t${row.puzzle.id()}\t${format(row.balance)}` : `FAIL\t${row.puzzle.id()}\t${oneLine(row.error)}`;
}
function jsonRow(row) {
	return row.error === void 0 ? {
		id: row.puzzle.id(),
		chain: row.balance.chain,
		confirmed: row.balance.confirmed,
		unconfirmed: row.balance.unconfirmed,
		decimals: row.balance.decimals
	} : {
		id: row.puzzle.id(),
		chain: row.puzzle.chain(),
		error: row.error
	};
}
function optionsFor(puzzle, apiKey) {
	const variable = apiKeyVariables[puzzle.chain()];
	return { apiKey: apiKey ?? (variable === void 0 ? void 0 : process.env[variable]) };
}
async function lookUp(puzzles, apiKey, report) {
	const rows = [];
	for (const [index, puzzle] of puzzles.entries()) {
		if (index > 0) await setTimeout(250);
		let row;
		try {
			row = {
				puzzle,
				balance: await puzzle.balance(optionsFor(puzzle, apiKey))
			};
		} catch (error) {
			if (!(error instanceof BalanceError)) throw error;
			row = {
				puzzle,
				error: error.message
			};
		}
		rows.push(row);
		report(row);
	}
	return rows;
}
var balance_default = defineTool({
	name: "puzzles_balance",
	title: "Puzzle balances",
	description: "Fetch the balance of one puzzle, or of every puzzle the filters pick",
	effect: "read",
	openWorld: true,
	input: closed({
		id: Type.Optional(Type.String({ description: "Puzzle identifier" })),
		...collectionArg,
		...filterArgs,
		...apiKeyArg
	}),
	cli: {
		command: "balance",
		positional: ["id"],
		plain: ["id"]
	},
	async execute(args, { host }) {
		const { requirePuzzle, selectPuzzles } = await import("./_chunks/dataset.mjs");
		const { formatBalance } = await import("./_chunks/utils.mjs");
		const filtered = hasFilter(args);
		if (args.id !== void 0 && filtered) throw new InvalidArgumentError("id", "pass a puzzle identifier or filters, not both");
		if (args.id !== void 0) {
			const puzzle = await requirePuzzle(args.id);
			const balance = await puzzle.balance(optionsFor(puzzle, args.apiKey));
			return lines([`${puzzle.id()}: ${formatBalance(balance)}`], balance);
		}
		if (!filtered) throw new InvalidArgumentError("id", "pass a puzzle identifier or a filter such as --status");
		const live = streams(host);
		const rows = await lookUp(await selectPuzzles(await filterQuery(args)), args.apiKey, (row) => {
			if (live) printLine(formatRow(row, formatBalance));
		});
		if (rows.some((row) => row.error !== void 0)) process.exitCode = 1;
		return lines([], rows.map((row) => jsonRow(row)));
	}
});
function keyFor$1(chain) {
	const variable = apiKeyVariables[chain];
	return variable === void 0 ? void 0 : process.env[variable];
}
var eligibility_default = defineTool({
	name: "puzzles_eligibility",
	title: "Puzzle eligibility",
	description: "Gather what to check before working on a puzzle, from its record and a live read of its addresses, and name every field nobody can fill",
	effect: "read",
	openWorld: true,
	input: closed({
		query: Type.String({ description: "Puzzle identifier or address, for example bits/71 or one no record holds" }),
		chain: Type.Optional(Type.String({ description: "Chain of an address whose format fits more than one, for example base" })),
		...apiKeyArg
	}),
	cli: {
		command: "eligibility",
		positional: ["query"],
		plain: ["query"]
	},
	async execute(args) {
		const { eligibility, formatEligibility } = await import("./_chunks/eligibility.mjs");
		const record = await eligibility(args.query, {
			apiKey: args.apiKey,
			apiKeyFor: keyFor$1,
			chain: args.chain
		});
		process.exitCode = record.missing.length === 0 ? 0 : 1;
		return lines(formatEligibility(record), record);
	}
});
var export_default = defineTool({
	name: "puzzles_export",
	title: "Export the dataset",
	description: "Print the complete dataset built from the collection classes",
	effect: "read",
	input: closed({ compact: Type.Optional(Type.Boolean({ description: "Print without indentation" })) }),
	cli: {
		command: "export",
		json: false
	},
	async execute(args) {
		const { dataset } = await import("./_chunks/dataset.mjs");
		const { toJson } = await import("./_chunks/utils.mjs");
		process.stdout.write(`${toJson(await dataset(), args.compact)}\n`);
		return {
			content: [],
			details: null
		};
	}
});
var hints_default = defineTool({
	name: "puzzles_hints",
	title: "Puzzle hints",
	description: "List the hints that hold for one puzzle, its collection's and its own, and the hint files it ships",
	effect: "read",
	input: closed({ id: Type.String({ description: "Puzzle identifier, for example bits/90" }) }),
	cli: {
		command: "hints",
		positional: ["id"],
		plain: ["id"]
	},
	async execute(args) {
		const { requirePuzzle } = await import("./_chunks/dataset.mjs");
		const { requireCollection } = await import("./_chunks/registry2.mjs");
		const { formatHintReport, hintAssets } = await import("./_chunks/utils.mjs");
		const puzzle = await requirePuzzle(args.id);
		const collection = await requireCollection(puzzle.collection());
		return lines(formatHintReport(puzzle, collection.hints), {
			hints: collection.hintsById(puzzle.id()),
			hintAssets: hintAssets(puzzle)
		});
	}
});
var list_default = defineTool({
	name: "puzzles_list",
	title: "List puzzles",
	description: "List puzzles, optionally filtered by collection, address, chain, status and technique",
	effect: "read",
	input: closed({
		collection: Type.Optional(Type.String({ description: "Collection key, for example bits" })),
		...filterArgs,
		limit: Type.Optional(Type.Integer({
			minimum: 1,
			description: "Print at most this many puzzles (default: every match)"
		})),
		offset: Type.Optional(Type.Integer({
			minimum: 0,
			description: "Skip this many matching puzzles (default 0)"
		}))
	}),
	cli: {
		command: "list",
		positional: ["collection"],
		plain: ["collection"]
	},
	async execute(args) {
		const { selectPuzzles } = await import("./_chunks/dataset.mjs");
		const { formatPuzzle } = await import("./_chunks/utils.mjs");
		const offset = args.offset ?? 0;
		const puzzles = (await selectPuzzles(await filterQuery(args))).slice(offset, args.limit === void 0 ? void 0 : offset + args.limit);
		return lines(puzzles.map(formatPuzzle), puzzles);
	}
});
var show_default = defineTool({
	name: "puzzles_show",
	title: "Show a puzzle",
	description: "Show one puzzle by universal identifier",
	effect: "read",
	input: closed({
		id: Type.String({ description: "Puzzle identifier, for example bits/90" }),
		allTransactions: Type.Optional(Type.Boolean({ description: "List every transaction, not one line per run of small increases" }))
	}),
	cli: {
		command: "show",
		positional: ["id"],
		plain: ["id"]
	},
	async execute(args) {
		const { requirePuzzle } = await import("./_chunks/dataset.mjs");
		const { requireCollection } = await import("./_chunks/registry2.mjs");
		const { formatPuzzleRecord } = await import("./_chunks/utils.mjs");
		const puzzle = await requirePuzzle(args.id);
		const collection = await requireCollection(puzzle.collection());
		return lines([formatPuzzleRecord(puzzle, collection.hints, collection.techniques, args.allTransactions === true)], puzzle);
	}
});
const solver = defineTool({
	name: "puzzles_solver",
	title: "Puzzle solver",
	description: "Show one solver by solver key or puzzle identifier",
	effect: "read",
	input: closed({ key: Type.String({ description: "Solver key, or a puzzle identifier" }) }),
	cli: {
		command: "solver",
		positional: ["key"],
		plain: ["key"]
	},
	execute: (args) => solverTool(args.key)
});
var solvers_default = defineTool({
	name: "puzzles_solvers",
	title: "Puzzle solvers",
	description: "List every named solver, or show one by solver key or puzzle identifier",
	effect: "read",
	input: closed({ key: Type.Optional(Type.String({ description: "Solver key, or a puzzle identifier" })) }),
	cli: {
		command: "solvers",
		positional: ["key"],
		plain: ["key"]
	},
	async execute(args) {
		const { requireSolver, resolveSolverKey, solvers } = await import("./_chunks/dataset.mjs");
		const { formatSolver, formatSolverRecord } = await import("./_chunks/utils.mjs");
		if (args.key === void 0) {
			const entries = await solvers();
			return lines(entries.map(formatSolver), entries);
		}
		const entry = await requireSolver(await resolveSolverKey(args.key));
		return lines([formatSolverRecord(entry)], entry);
	}
});
var stages_default = defineTool({
	name: "puzzles_stages",
	title: "Puzzle stages",
	description: "List the stages of a puzzle that runs in several, with their pages, files and published answers",
	effect: "read",
	input: closed({ id: Type.String({ description: "Puzzle identifier, for example gsmg" }) }),
	cli: {
		command: "stages",
		positional: ["id"],
		plain: ["id"]
	},
	async execute(args) {
		const { requirePuzzle } = await import("./_chunks/dataset.mjs");
		const { formatStageReport } = await import("./_chunks/utils.mjs");
		const puzzle = await requirePuzzle(args.id);
		return lines(formatStageReport(puzzle), { stages: puzzle.stages() });
	}
});
async function selected$1(args) {
	const { all, requirePuzzle, selectPuzzles } = await import("./_chunks/dataset.mjs");
	const id = args.id !== void 0;
	const filtered = hasFilter(args);
	const everything = args.all === true;
	if ([
		id,
		filtered,
		everything
	].filter(Boolean).length > 1) throw new InvalidArgumentError("id", "pass one of a puzzle identifier, filters or --all");
	if (args.id !== void 0) return [await requirePuzzle(args.id)];
	if (filtered) {
		const puzzles = await selectPuzzles(await filterQuery(args));
		if (puzzles.length === 0) throw new InvalidArgumentError("filters", "no puzzle matches them, so nothing was verified");
		return puzzles;
	}
	if (everything) return all();
	throw new InvalidArgumentError("id", "pass a puzzle identifier, a filter such as --technique, or --all");
}
function labelOf(result) {
	return result.verified ? "OK" : result.unavailable ? "SKIP" : "FAIL";
}
function formatRecipe(recipe) {
	if (recipe === void 0) return "";
	const detail = recipe.error === null ? "" : ` (${recipe.error})`;
	return `\trecipe ${recipe.recipe} ${labelOf(recipe)}${detail}`;
}
function formatResult(result) {
	const detail = result.error === null ? "" : `\t${result.error}`;
	return `${labelOf(result)}\t${result.id}${detail}${formatRecipe(result.recipe)}`;
}
function failed(result) {
	return !result.verified && !result.unavailable;
}
var verify_default = defineTool({
	name: "puzzles_verify",
	title: "Verify puzzles",
	description: "Verify that known key material and its recipe derive the stored address",
	effect: "read",
	input: closed({
		id: Type.Optional(Type.String({ description: "Puzzle identifier" })),
		all: Type.Optional(Type.Boolean({ description: "Verify every puzzle" })),
		...collectionArg,
		...filterArgs,
		quiet: Type.Optional(Type.Boolean({ description: "Suppress per-puzzle output" }))
	}),
	cli: {
		command: "verify",
		positional: ["id"],
		plain: ["id"],
		short: { quiet: "q" }
	},
	async execute(args) {
		const { verify } = await import("./_chunks/verify.mjs");
		const puzzles = await selected$1(args);
		const results = await Promise.all(puzzles.map((puzzle) => verify(puzzle)));
		if (results.some((result) => failed(result) || result.recipe !== void 0 && failed(result.recipe))) process.exitCode = 1;
		return lines(args.quiet === true ? [] : results.map(formatResult), results);
	}
});
function keyFor(puzzle, apiKey) {
	const variable = apiKeyVariables[puzzle.chain()];
	return apiKey ?? (variable === void 0 ? void 0 : process.env[variable]);
}
async function selected(args) {
	const { requirePuzzle, selectPuzzles } = await import("./_chunks/dataset.mjs");
	const filtered = hasFilter(args);
	if (args.id !== void 0 && filtered) throw new InvalidArgumentError("id", "pass a puzzle identifier or filters, not both");
	if (args.id === void 0 && !filtered) throw new InvalidArgumentError("id", "pass a puzzle identifier or a filter such as --status");
	return args.id === void 0 ? selectPuzzles(await filterQuery(args)) : [await requirePuzzle(args.id)];
}
function exitCode(reports) {
	if (reports.some((report) => report.findings.length > 0)) return 1;
	return reports.some((report) => report.errors.length > 0) ? 2 : 0;
}
const cliCommands = [
	authors_default,
	author,
	solvers_default,
	solver,
	show_default,
	hints_default,
	stages_default,
	assets_default,
	list_default,
	verify_default,
	balance_default,
	defineTool({
		name: "puzzles_watch",
		title: "Watch puzzles",
		description: "Compare puzzles with the chain, and with their source pages when --since is given, and report what the record misses",
		effect: "read",
		openWorld: true,
		input: closed({
			id: Type.Optional(Type.String({ description: "Puzzle identifier" })),
			...collectionArg,
			...filterArgs,
			since: Type.Optional(Type.String({ description: "Also compare each source page's newest Wayback capture with the last one up to this date, YYYY-MM-DD or ISO 8601" })),
			...apiKeyArg
		}),
		cli: {
			command: "watch",
			positional: ["id"],
			plain: ["id"]
		},
		async execute(args, { host }) {
			const { formatWatchReport, watcher } = await import("./_chunks/watch.mjs");
			const live = streams(host);
			const puzzles = await selected(args);
			const check = watcher({ since: args.since });
			const reports = [];
			for (const [index, puzzle] of puzzles.entries()) {
				if (index > 0) await setTimeout(250);
				const report = await check(puzzle, keyFor(puzzle, args.apiKey));
				reports.push(report);
				if (live) for (const row of formatWatchReport(report)) printLine(row);
			}
			process.exitCode = exitCode(reports);
			return lines([], reports);
		}
	}),
	eligibility_default,
	export_default
];
useCheckoutAssets(fileURLToPath(new URL("..", import.meta.url)));
const sourceMcp = new URL("../src/mcp.ts", import.meta.url);
const sourceMcpPath = fileURLToPath(sourceMcp);
function isMcpModule(value) {
	return typeof value === "object" && value !== null && "createMcpServer" in value;
}
function servesSource() {
	return !import.meta.url.endsWith(".ts") && process.env["PUZZLES_DIST"] !== "1" && !sourceMcpPath.includes(`${sep}node_modules${sep}`) && existsSync(sourceMcpPath);
}
async function serveMcp() {
	const module = servesSource() ? await import(sourceMcp.href) : await import("./mcp.mjs");
	if (!isMcpModule(module)) throw new TypeError(`${sourceMcpPath} has no createMcpServer`);
	const { StdioServerTransport } = await import("@modelcontextprotocol/server/stdio");
	await module.createMcpServer().connect(new StdioServerTransport());
}
function isRefusal(error) {
	return error instanceof PuzzlesError;
}
const argv = process.argv.slice(2);
if (argv[0] === "mcp" && !argv.includes("--help") && !argv.includes("-h")) await serveMcp();
else await runCli({
	name: "puzzles",
	version,
	description: "Crypto bounties, puzzles and challenges as typed records",
	tools: puzzlesTools,
	commands: cliCommands,
	mcp: serverInfo,
	expected: isRefusal
}, argv);
export {};
