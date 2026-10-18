import { version } from "./version.mjs";
import { collectionKeys, collections, getCollection, knownCollections, requireCollection } from "./registry.mjs";
import { PuzzleNotFoundError, UnknownAuthorError, UnknownSolverError } from "./errors.mjs";
import { defined, frozen } from "./parts.mjs";
import { Status } from "./status.mjs";
import "./puzzle.mjs";
import { closestKey, closestPuzzle, missDetail } from "./collection.mjs";
import { techniques } from "./technique.mjs";
import { countOf, filterPuzzles, prizeTotals, statusCounts } from "./utils2.mjs";
const derived = /* @__PURE__ */ new WeakMap();
async function views() {
	const snapshot = await collections();
	let record = derived.get(snapshot);
	if (record === void 0) {
		record = {};
		derived.set(snapshot, record);
	}
	return [snapshot, record];
}
async function all() {
	const [snapshot, record] = await views();
	record.puzzles ??= Object.freeze(snapshot.flatMap((collection) => collection.all()));
	return record.puzzles;
}
async function collectionSummaries() {
	const [snapshot, record] = await views();
	record.summaries ??= frozen(snapshot.map((collection) => ({
		key: collection.key,
		author: collection.author.name,
		total: collection.count(),
		...statusCounts(collection.all())
	})));
	return record.summaries;
}
async function authors() {
	const [snapshot, record] = await views();
	if (record.authors === void 0) {
		const entries = /* @__PURE__ */ new Map();
		for (const collection of snapshot) {
			const key = collection.author.key ?? collection.key;
			const entry = entries.get(key) ?? {
				author: collection.author,
				collections: [],
				puzzles: 0
			};
			entry.collections.push(collection);
			entry.puzzles += collection.count();
			entries.set(key, entry);
		}
		record.authors = frozen([...entries].map(([key, entry]) => ({
			key,
			author: entry.author,
			collections: entry.collections.map((collection) => collection.key),
			puzzles: entry.puzzles,
			techniques: techniqueCounts(entry.collections)
		})));
	}
	return record.authors;
}
function techniqueNames(collection, puzzle) {
	return new Set(collection.techniquesById(puzzle.id()).map((tag) => tag.name));
}
function techniqueCounts(scope) {
	const counts = /* @__PURE__ */ new Map();
	for (const collection of scope) for (const puzzle of collection.all()) for (const name of techniqueNames(collection, puzzle)) counts.set(name, (counts.get(name) ?? 0) + 1);
	return Object.fromEntries(techniques.flatMap((name) => {
		const count = counts.get(name);
		return count === void 0 ? [] : [[name, count]];
	}));
}
async function getAuthor(key) {
	if (typeof key !== "string") return;
	return (await authors()).find((entry) => entry.key === key);
}
async function requireAuthor(key) {
	const entry = await getAuthor(key);
	if (entry !== void 0) return entry;
	const keys = (await authors()).map((row) => row.key);
	const guess = typeof key === "string" ? closestKey(key, keys) : void 0;
	throw new UnknownAuthorError(String(key), missDetail(guess, "authors", keys));
}
function union(a, b, id) {
	const seen = /* @__PURE__ */ new Map();
	for (const item of [...a ?? [], ...b ?? []]) if (!seen.has(id(item))) seen.set(id(item), item);
	return seen.size === 0 ? void 0 : [...seen.values()];
}
function joinParties(first, next) {
	return defined({
		key: first.key ?? next.key,
		kind: first.kind ?? next.kind,
		name: first.name ?? next.name,
		aliases: union(first.aliases, next.aliases, (alias) => alias),
		about: first.about ?? next.about,
		addresses: union(first.addresses, next.addresses, (address) => address),
		profiles: union(first.profiles, next.profiles, (link) => link.url),
		facts: union(first.facts, next.facts, (item) => `${item.source}\n${item.text}`)
	});
}
async function solvers() {
	const [snapshot, record] = await views();
	if (record.solvers === void 0) {
		const entries = /* @__PURE__ */ new Map();
		for (const collection of snapshot) for (const puzzle of collection.all()) {
			const solver = puzzle.solver();
			if (solver?.key === void 0) continue;
			const entry = entries.get(solver.key);
			const solve = defined({
				id: puzzle.id(),
				chain: puzzle.chain(),
				status: puzzle.status(),
				solvedAt: puzzle.solvedAt(),
				prize: puzzle.prize(),
				currency: puzzle.prizeCurrency()
			});
			if (entry === void 0) {
				entries.set(solver.key, {
					solver,
					solves: [solve],
					collections: [collection.key]
				});
				continue;
			}
			entry.solver = joinParties(entry.solver, solver);
			entry.solves.push(solve);
			if (!entry.collections.includes(collection.key)) entry.collections.push(collection.key);
		}
		record.solvers = frozen([...entries].map(([key, entry]) => ({
			key,
			...entry,
			authored: snapshot.filter((collection) => collection.author.key === key).map((collection) => collection.key)
		})));
	}
	return record.solvers;
}
async function getSolver(key) {
	if (typeof key !== "string") return;
	return (await solvers()).find((entry) => entry.key === key);
}
async function resolveSolverKey(query) {
	if (await getSolver(query) !== void 0) return query;
	return (await get(query))?.solver()?.key ?? query;
}
async function requireSolver(key) {
	const entry = await getSolver(key);
	if (entry !== void 0) return entry;
	const keys = (await solvers()).map((row) => row.key);
	const puzzle = await get(key);
	if (puzzle !== void 0) {
		const what = puzzle.solver() === void 0 ? "records no solver" : "knows its solver by address only";
		throw new UnknownSolverError(key, `${puzzle.id()} ${what}. ${missDetail(void 0, "solvers", keys)}`);
	}
	const guess = typeof key === "string" ? closestKey(key, keys) : void 0;
	throw new UnknownSolverError(String(key), missDetail(guess, "solvers", keys));
}
async function selectPuzzles(query = {}) {
	const { technique } = query;
	if (technique !== void 0) {
		const source = (query.collection === void 0 ? await collections() : [await requireCollection(query.collection)]).flatMap((collection) => collection.all().filter((puzzle) => techniqueNames(collection, puzzle).has(technique)));
		return filterPuzzles(source, query);
	}
	const source = query.collection === void 0 ? await all() : (await requireCollection(query.collection)).all();
	return filterPuzzles(source, query);
}
async function get(id) {
	if (typeof id !== "string") return;
	const [prefix, ...rest] = id.split("/");
	const collection = await getCollection(prefix ?? id);
	if (collection === void 0) return;
	const canonical = rest.length === 0 ? collection.key : `${collection.key}/${rest.join("/")}`;
	const puzzle = collection.get(canonical);
	return puzzle?.id() === canonical ? puzzle : void 0;
}
function wholeCollection(key, puzzles) {
	const first = puzzles.at(0)?.id();
	const last = puzzles.at(-1)?.id();
	const joint = puzzles.length === 2 ? "or" : "to";
	return `${key} is a collection of ${countOf(puzzles.length, "puzzle")}, so ask for one of them, ${first} ${joint} ${last}`;
}
async function requirePuzzle(id) {
	const puzzle = await get(id);
	if (puzzle !== void 0) return puzzle;
	if (typeof id !== "string") throw new PuzzleNotFoundError(id, knownCollections());
	const [prefix = id, ...rest] = id.split("/");
	const collection = await getCollection(prefix);
	if (collection !== void 0) {
		if (rest.length === 0 && collection.all().length > 1) throw new PuzzleNotFoundError(id, wholeCollection(collection.key, collection.all()));
		return collection.requireId(id);
	}
	const key = closestKey(prefix, collectionKeys());
	const guess = await guessPuzzle(key, prefix, rest.join("/")) ?? (key === void 0 ? void 0 : `collection ${key}`);
	throw new PuzzleNotFoundError(id, missDetail(guess, "collections", collectionKeys()));
}
async function guessPuzzle(key, prefix, name) {
	const collection = key === void 0 ? void 0 : await getCollection(key);
	if (collection === void 0) return name === "" ? closestPuzzle(prefix, await all()) : void 0;
	return guessInCollection(collection, name);
}
function guessInCollection(collection, name) {
	const puzzles = collection.all();
	if (name === "") return puzzles.length === 1 && puzzles[0]?.id() === collection.key ? collection.key : void 0;
	const id = `${collection.key}/${name}`;
	return collection.get(id)?.id() === id ? id : closestPuzzle(name, puzzles);
}
async function stats() {
	const [snapshot, record] = await views();
	if (record.stats !== void 0) return record.stats;
	record.puzzles ??= Object.freeze(snapshot.flatMap((collection) => collection.all()));
	const puzzles = record.puzzles;
	record.stats = frozen({
		total: puzzles.length,
		...statusCounts(puzzles),
		with_pubkey: puzzles.filter((puzzle) => puzzle.hasPubkey()).length,
		total_prize: prizeTotals(puzzles),
		unsolved_prize: prizeTotals(filterPuzzles(puzzles, { status: Status.Unsolved })),
		techniques: techniqueCounts(snapshot)
	});
	return record.stats;
}
async function datasetCollections() {
	const [snapshot, record] = await views();
	record.serialized ??= serializeSnapshot(snapshot);
	return record.serialized;
}
function serializeSnapshot(snapshot) {
	return frozen(snapshot.map((collection) => defined({
		name: collection.key,
		author: collection.author,
		hints: collection.hints.length === 0 ? void 0 : collection.hints,
		techniques: collection.techniques.length === 0 ? void 0 : collection.techniques,
		puzzles: collection.all().map((puzzle) => puzzle.toJSON())
	})));
}
async function dataVersion() {
	const [snapshot, record] = await views();
	record.serialized ??= serializeSnapshot(snapshot);
	record.dataVersion ??= await serializedVersion(record.serialized);
	return record.dataVersion;
}
async function serializedVersion(serialized) {
	const bytes = new TextEncoder().encode(JSON.stringify(serialized));
	const digest = new Uint8Array(await crypto.subtle.digest("SHA-256", bytes));
	return Array.from(digest.subarray(0, 6), (byte) => byte.toString(16).padStart(2, "0")).join("");
}
async function dataset() {
	const [snapshot, record] = await views();
	record.serialized ??= serializeSnapshot(snapshot);
	record.dataVersion ??= await serializedVersion(record.serialized);
	return Object.freeze({
		version,
		data_version: record.dataVersion,
		collections: record.serialized
	});
}
export { all, authors, collectionSummaries, dataVersion, dataset, datasetCollections, get, getAuthor, getSolver, requireAuthor, requirePuzzle, requireSolver, resolveSolverKey, selectPuzzles, solvers, stats };
