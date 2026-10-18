var PuzzlesError = class extends Error {
	name = "PuzzlesError";
};
function withDetail(message, detail) {
	return detail === void 0 ? message : `${message}. ${detail}`;
}
function echo(key) {
	return key === "" || key.trim() !== key ? JSON.stringify(key) : key;
}
var PuzzleNotFoundError = class extends PuzzlesError {
	name = "PuzzleNotFoundError";
	puzzleId;
	constructor(puzzleId, detail) {
		super(withDetail(`Puzzle not found: ${echo(puzzleId)}`, detail));
		this.puzzleId = puzzleId;
	}
};
var InvalidArgumentError = class extends PuzzlesError {
	name = "InvalidArgumentError";
	argument;
	constructor(argument, reason) {
		super(`Invalid ${argument}: ${reason}`);
		this.argument = argument;
	}
};
var UnknownAuthorError = class extends PuzzlesError {
	name = "UnknownAuthorError";
	author;
	constructor(author, detail) {
		super(withDetail(`Unknown author: ${echo(author)}`, detail));
		this.author = author;
	}
};
var UnknownSolverError = class extends PuzzlesError {
	name = "UnknownSolverError";
	solver;
	constructor(solver, detail) {
		super(withDetail(`Unknown solver: ${echo(solver)}`, detail));
		this.solver = solver;
	}
};
var UnknownCollectionError = class extends PuzzlesError {
	name = "UnknownCollectionError";
	collection;
	constructor(collection, detail) {
		super(withDetail(`Unknown collection: ${echo(collection)}`, detail));
		this.collection = collection;
	}
};
var SourceLookupError = class extends PuzzlesError {
	name = "SourceLookupError";
};
var FileUnavailableError = class extends PuzzlesError {
	name = "FileUnavailableError";
	path;
	constructor(path, reasons) {
		super(`Could not read ${path}: ${reasons.join("; ")}`);
		this.path = path;
	}
};
export { FileUnavailableError, InvalidArgumentError, PuzzleNotFoundError, PuzzlesError, SourceLookupError, UnknownAuthorError, UnknownCollectionError, UnknownSolverError };
