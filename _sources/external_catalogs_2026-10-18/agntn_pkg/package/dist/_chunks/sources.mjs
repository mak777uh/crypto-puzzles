import { SourceLookupError } from "./errors.mjs";
import { WaybackProvider, diffArchivedContent } from "@agntn/archives";
async function capture(wayback, url, timeout, timestamp) {
	const response = await wayback.content(url, {
		...timestamp === void 0 ? {} : { timestamp },
		...timeout === void 0 ? {} : { timeout }
	});
	if (!response.success || response.content === void 0) throw new SourceLookupError(`Source lookup failed: ${response.error ?? "no capture"}`);
	return response.content;
}
async function sourceChange(url, since, timeout) {
	const wayback = new WaybackProvider();
	const after = await capture(wayback, url, timeout);
	if (Date.parse(after.timestamp) <= since.getTime()) return;
	const before = await capture(wayback, url, timeout, since.toISOString());
	if (Date.parse(before.timestamp) > since.getTime()) return;
	let diff;
	try {
		diff = diffArchivedContent(before, after);
	} catch (error) {
		throw new SourceLookupError(`Source comparison failed: ${error instanceof Error ? error.message : String(error)}`);
	}
	if (diff.identical) return;
	return {
		url,
		before: {
			timestamp: before.timestamp,
			snapshot: before.snapshot
		},
		after: {
			timestamp: after.timestamp,
			snapshot: after.snapshot
		},
		additions: diff.additions,
		deletions: diff.deletions,
		partial: diff.partial
	};
}
export { sourceChange };
