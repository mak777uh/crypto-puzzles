import { version } from "./version.mjs";
const serverInfo = {
	name: "puzzles",
	version,
	description: "Public crypto puzzles and bounties, from the 1000 BTC puzzle to GSMG, with their addresses, hints, stages and solvers. Check a key before you celebrate, and ask the chain if the prize is still there.",
	icons: [{
		src: "https://puzzles.agntn.dev/favicon.svg",
		mimeType: "image/svg+xml",
		sizes: ["any"]
	}, {
		src: "https://puzzles.agntn.dev/icon-512.png",
		mimeType: "image/png",
		sizes: ["512x512"]
	}]
};
export { serverInfo };
