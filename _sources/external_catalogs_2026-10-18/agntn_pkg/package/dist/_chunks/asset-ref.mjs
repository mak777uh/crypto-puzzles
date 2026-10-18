import { version } from "./version.mjs";
const COMMIT_KEY = "__PUZZLES_COMMIT__";
const COMMIT = /^(?:[\da-f]{40}|[\da-f]{64})$/u;
function assetRef() {
	const commit = Reflect.get(globalThis, COMMIT_KEY);
	return typeof commit === "string" ? commit : `v${version}`;
}
function useCommitAssets(commit) {
	if (COMMIT.test(commit) && !Object.hasOwn(globalThis, COMMIT_KEY)) Reflect.set(globalThis, COMMIT_KEY, commit);
}
export { assetRef, useCommitAssets };
