import { FileUnavailableError, InvalidArgumentError } from "./errors.mjs";
import { assetUrlOf } from "./puzzle.mjs";
import { countOf } from "./utils2.mjs";
import { archivedSourceCapture, archivedSourceUrl } from "./archived-sources2.mjs";
import { base64, hex } from "@scure/base";
const MAX_FILE_BYTES = 3932160;
const FETCH_TIMEOUT_MS = 3e4;
const IMAGE_SIGNATURES = [
	["image/png", [
		137,
		80,
		78,
		71,
		13,
		10,
		26,
		10
	]],
	["image/jpeg", [
		255,
		216,
		255
	]],
	["image/gif", [
		71,
		73,
		70,
		56
	]]
];
function puzzleFiles(links, sources) {
	return [...links.map(({ file: _file, ...link }) => link), ...sources.flatMap(({ citedBy, source }) => {
		const base = `assets/sources/${source.file}`;
		const capture = archivedSourceCapture(source);
		return [{
			kind: "source",
			path: `${base}.md`,
			url: assetUrlOf(`${base}.md`),
			citedBy,
			date: source.date,
			origin: archivedSourceUrl(source),
			...capture === void 0 ? {} : { archive: capture }
		}, {
			kind: "screenshot",
			path: `${base}.png`,
			url: assetUrlOf(`${base}.png`),
			citedBy
		}];
	})];
}
function fetchFailure(error) {
	if (!(error instanceof Error)) return String(error);
	const code = error.cause?.code;
	return typeof code === "string" ? `${error.message} (${code})` : error.message;
}
async function readCapped(body, cap) {
	const chunks = [];
	let size = 0;
	for await (const chunk of body) {
		size += chunk.length;
		if (size > cap) return;
		chunks.push(chunk);
	}
	const data = new Uint8Array(size);
	let offset = 0;
	for (const chunk of chunks) {
		data.set(chunk, offset);
		offset += chunk.length;
	}
	return data;
}
async function fetchCopy(url, cap) {
	try {
		const response = await fetch(url, { signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) });
		if (!response.ok) return `HTTP ${response.status}`;
		return (response.body === null ? /* @__PURE__ */ new Uint8Array(0) : await readCapped(response.body, cap)) ?? `more than ${cap} bytes`;
	} catch (error) {
		return fetchFailure(error);
	}
}
async function readPuzzleFile(file, limit = MAX_FILE_BYTES) {
	if (file.bytes !== void 0 && file.bytes > limit) throw new FileUnavailableError(file.path, [`${file.bytes} bytes is more than the ${limit} a read returns, so download it from ${file.url}`]);
	const cap = Math.min(limit, file.bytes ?? limit);
	const linked = await readCopy(file, file.url, cap);
	if (typeof linked !== "string") return linked;
	const reasons = [linked];
	for (const url of laterCopies(file, linked === `${file.url} answered HTTP 404`)) {
		const content = await readCopy(file, url, cap);
		if (typeof content !== "string") return content;
		reasons.push(content);
	}
	throw new FileUnavailableError(file.path, reasons);
}
function holdsPin(file, bytes, digest) {
	return file.sha256 === void 0 || digest === file.sha256 && bytes === file.bytes;
}
async function readCopy(file, url, cap) {
	const data = await fetchCopy(url, cap);
	if (typeof data === "string") return `${url} answered ${data}`;
	const digest = hex.encode(new Uint8Array(await crypto.subtle.digest("SHA-256", data)));
	if (holdsPin(file, data.length, digest)) return {
		data,
		file,
		servedBy: url,
		sha256: digest
	};
	return `${url} holds other bytes, ${data.length} with SHA-256 ${digest}`;
}
function laterCopies(file, unreleased) {
	const main = unreleased ? [assetUrlOf(file.path, "main")] : [];
	const author = file.sha256 === void 0 ? [] : [file.origin, file.archive];
	return [...main, ...author].filter((url) => url !== void 0);
}
function imageType(data) {
	if (String.fromCodePoint(...data.subarray(0, 4), ...data.subarray(8, 12)) === "RIFFWEBP") return "image/webp";
	return IMAGE_SIGNATURES.find(([, signature]) => signature.every((byte, index) => data[index] === byte))?.[0];
}
function utf8Text(data) {
	try {
		return new TextDecoder("utf-8", { fatal: true }).decode(data);
	} catch {
		return;
	}
}
function pinColumns(file) {
	if (file.sha256 !== void 0) return [`${file.bytes ?? "-"} bytes`, `sha256 ${file.sha256}`];
	return file.kind === "source" || file.kind === "screenshot" ? [] : ["unpinned"];
}
function screenshotPath(source) {
	return source.path.replace(/\.md$/u, ".png");
}
function formatFileRow(file, screenshot) {
	return [
		file.citedBy === "author" ? `${file.kind} (author)` : file.kind,
		file.path,
		...file.date === void 0 ? [] : [`published ${file.date}`],
		...pinColumns(file),
		...file.origin === void 0 ? [] : [`${file.kind === "source" ? "cites" : "origin"} ${file.origin}`],
		...file.archive === void 0 ? [] : [`archive ${file.archive}`],
		...screenshot ? ["screenshot .png"] : []
	].join("	");
}
function formatFileReport(id, files) {
	const shipped = files.filter((file) => file.kind !== "source" && file.kind !== "screenshot");
	const copies = files.filter((file) => file.kind === "source");
	if (files.length === 0) return [`${id}: no files and no archived sources`];
	const screenshots = new Set(files.filter((file) => file.kind === "screenshot").map((file) => file.path));
	const folded = new Set(copies.map(screenshotPath).filter((path) => screenshots.has(path)));
	return [`${id}: ${countOf(shipped.length, "file")}, ${countOf(copies.length, "archived source")}`, ...files.filter((file) => file.kind !== "screenshot" || !folded.has(file.path)).map((file) => formatFileRow(file, file.kind === "source" && folded.has(screenshotPath(file))))];
}
function formatFileRead(content) {
	const { data, file, servedBy } = content;
	const check = file.sha256 === void 0 ? "unpinned" : "the bytes the record pins";
	return [
		file.path,
		`${data.length} bytes`,
		`sha256 ${content.sha256}`,
		check,
		`from ${servedBy}`
	].join("	");
}
function fileBlock(content) {
	const mimeType = imageType(content.data);
	if (mimeType !== void 0) return {
		type: "image",
		data: base64.encode(content.data),
		mimeType
	};
	const text = utf8Text(content.data);
	if (text === void 0) throw new InvalidArgumentError("file", `${content.file.path} is neither an image a model reads nor UTF-8 text, so download it from ${content.servedBy}`);
	return {
		type: "text",
		text
	};
}
export { fetchFailure, fileBlock, formatFileRead, formatFileReport, puzzleFiles, readPuzzleFile };
