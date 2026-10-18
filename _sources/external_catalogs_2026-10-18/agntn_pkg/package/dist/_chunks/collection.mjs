import { PuzzleNotFoundError } from "./errors.mjs";
import { frozen } from "./parts.mjs";
import { Status } from "./status.mjs";
import "./puzzle.mjs";
import "./types.mjs";
import { countOf, filterPuzzles } from "./utils2.mjs";
import { verify } from "./verify2.mjs";
function fold(text) {
	return text.toLowerCase().replaceAll(/[\s_-]+/gu, "");
}
function oneEditApart(a, b) {
	if (Math.abs(a.length - b.length) > 1) return false;
	let i = 0;
	while (i < a.length && a[i] === b[i]) i += 1;
	return a.slice(i + 1) === b.slice(i + 1) || a.slice(i) === b.slice(i + 1) || a.slice(i + 1) === b.slice(i);
}
function only(matches) {
	return matches.length === 1 ? matches[0] : void 0;
}
function closestKey(query, keys) {
	const wanted = fold(query);
	if (wanted === "") return;
	return only(keys.filter((key) => fold(key) === wanted)) ?? only(keys.filter((key) => oneEditApart(fold(key), wanted)));
}
function choice(matches) {
	const last = matches.at(-1);
	return matches.length < 2 ? last : `${matches.slice(0, -1).join(", ")} or ${last}`;
}
function closestPuzzle(name, puzzles) {
	const wanted = fold(name);
	if (wanted === "") return;
	return choice(puzzles.map((puzzle) => puzzle.id()).filter((id) => {
		const slash = id.indexOf("/");
		return slash !== -1 && fold(id.slice(slash + 1)) === wanted;
	}));
}
function missDetail(guess, kind, keys) {
	return guess === void 0 ? `Known ${kind}: ${keys.join(", ")}` : `Did you mean ${guess}?`;
}
var Collection = class {
	author;
	hints;
	key;
	techniques;
	#byId;
	#puzzles;
	constructor(key, author, puzzles, hints = [], techniques = []) {
		this.key = key;
		this.author = frozen(author);
		this.hints = frozen(hints);
		this.techniques = frozen(techniques);
		this.#puzzles = Object.freeze([...puzzles]);
		this.#byId = new Map(this.#puzzles.map((puzzle) => [puzzle.id(), puzzle]));
	}
	#resolveId(query) {
		return this.idFor(query) ?? String(query);
	}
	all() {
		return this.#puzzles;
	}
	get(query) {
		const id = this.idFor(query);
		return id === void 0 ? void 0 : this.#byId.get(id);
	}
	require(query) {
		return this.requireId(this.#resolveId(query));
	}
	requireId(id) {
		const puzzle = this.#byId.get(id);
		if (puzzle === void 0) throw new PuzzleNotFoundError(id, this.#shape(id));
		return puzzle;
	}
	#shape(id) {
		const example = this.#puzzles[0];
		if (example === void 0) return `Collection ${this.key} holds no puzzles`;
		const shape = `Collection ${this.key} holds ${countOf(this.#puzzles.length, "puzzle")}, for example ${example.id()}`;
		const slash = id.indexOf("/");
		const guess = closestPuzzle(slash === -1 ? id : id.slice(slash + 1), this.#puzzles);
		return guess === void 0 ? shape : `Did you mean ${guess}? ${shape}`;
	}
	async balance(query, options = {}) {
		return this.require(query).balance(options);
	}
	async balanceById(id, options = {}) {
		return this.requireId(id).balance(options);
	}
	async verify(query) {
		return this.verifyById(this.#resolveId(query));
	}
	async verifyById(id) {
		return verify(this.requireId(id));
	}
	hintsFor(query) {
		return this.hintsById(this.#resolveId(query));
	}
	hintsById(id) {
		return frozen([...this.hints, ...this.requireId(id).hints()]);
	}
	techniquesFor(query) {
		return this.techniquesById(this.#resolveId(query));
	}
	techniquesById(id) {
		const puzzle = this.requireId(id);
		return frozen([
			...this.techniques,
			...puzzle.techniques(),
			...puzzle.stages().flatMap((item) => item.techniques ?? [])
		]);
	}
	solved() {
		return filterPuzzles(this.#puzzles, { status: Status.Solved });
	}
	unsolved() {
		return filterPuzzles(this.#puzzles, { status: Status.Unsolved });
	}
	withPubkey() {
		return filterPuzzles(this.#puzzles, { withPubkey: true });
	}
	count() {
		return this.#puzzles.length;
	}
	solvedCount() {
		return this.solved().length;
	}
	unsolvedCount() {
		return this.unsolved().length;
	}
};
const PUZZLE_NUMBER = /^(?:0|[1-9]\d*)$/;
var NamedCollection = class extends Collection {
	idFor(query) {
		if (typeof query !== "string") return;
		return query.includes("/") ? query : `${this.key}/${query}`;
	}
};
var NumericCollection = class extends Collection {
	idFor(query) {
		const number = typeof query === "string" ? this.#numberOf(query) : query;
		return typeof number === "number" && Number.isSafeInteger(number) && number >= 0 ? `${this.key}/${number}` : void 0;
	}
	#numberOf(query) {
		const prefix = `${this.key}/`;
		const digits = query.startsWith(prefix) ? query.slice(prefix.length) : query;
		return PUZZLE_NUMBER.test(digits) ? Number(digits) : void 0;
	}
};
var SingletonCollection = class extends Collection {
	constructor(key, author, puzzles, hints, techniques) {
		super(key, author, puzzles, hints, techniques);
		const only = this.all()[0];
		if (this.count() !== 1 || only?.id() !== key) throw new TypeError(`Singleton collection ${key} must contain exactly its canonical puzzle`);
	}
	idFor(query) {
		return query === void 0 || query === "" || query === this.key ? this.key : void 0;
	}
};
export { Collection, NamedCollection, NumericCollection, SingletonCollection, closestKey, closestPuzzle, missDetail };
