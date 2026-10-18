import { PartyKind, assets, claim, compressed, confirmation, digest, fact, funding, official, party, profile, seed, technique } from "../_chunks/parts.mjs";
import { Status } from "../_chunks/status.mjs";
import { puzzle } from "../_chunks/puzzle.mjs";
import { NamedCollection } from "../_chunks/collection.mjs";
const source$2 = "https://github.com/floflo777/open-crypto-puzzles/tree/main/4-solved/dug-student-treasure-hunt-63ksats";
const dug2025Index0 = puzzle({
	id: "dug/2025-0",
	chain: "bitcoin",
	address: "bc1qych2me6h85j38s3xmfwdkcvpqakpld3yr2y5ss",
	sourceUrl: source$2,
	startedAt: "2025-06-26 07:10:21",
	status: Status.Solved,
	solvedAt: "2026-07-08 14:43:50",
	prize: 75082e-8,
	key: seed("profit general lava hover jar visa joy immense install first give kingdom", "m/84'/0'/0'/0/0"),
	techniques: [technique("hidden-seed-words", source$2)],
	pubkey: compressed("0306b973c11d5a15de593a8906a02f689e51e19148acc91b586e69383ca5f610f1"),
	assets: assets({
		solution: "2025-solution.md",
		sourceUrl: source$2,
		digests: [digest("2025-solution.md", "43a6eb1ba1b81db1898d80f7ed1efa008d8b738f9ff7866d8b2534ca051fd534", 3887)]
	}),
	transactions: [funding("58ae2f1560e9b72f4a35e892c50d9bedc7e6dec7b6474250d25440c8bc92feb5", "2025-06-26 07:10:21", 75082e-8), claim("bcc2154f4eb33c361973313b9fe81131568b2f4ee3ef5a2c3e98dc327afd8074", "2026-07-08 14:43:50", 75082e-8)]
});
const source$1 = "https://github.com/floflo777/open-crypto-puzzles/tree/main/4-solved/dug-student-treasure-hunt-63ksats";
const dug2025Index1 = puzzle({
	id: "dug/2025-1",
	chain: "bitcoin",
	address: "bc1qphfklk568cf93267yetpngqsz0mthw4z4x2q69",
	sourceUrl: source$1,
	startedAt: "2026-06-26 09:52:36",
	status: Status.Solved,
	solvedAt: "2026-08-02 12:12:29",
	prize: 63216e-8,
	key: seed("profit general lava hover jar visa joy immense install first give kingdom", "m/84'/0'/0'/0/1"),
	techniques: [technique("hidden-seed-words", source$1)],
	pubkey: compressed("030349e3498e3abcd935bacdc117533b9e3ce3ec05b2958b4ecadde7c68c9c8e45"),
	solver: party("floflo777", {
		key: "floflo777",
		kind: PartyKind.Person,
		aliases: ["0xFlorent_"],
		about: "Keeps a public catalogue of crypto bounties with an oracle per puzzle, and recovers ETH stuck in old contracts.",
		profiles: [profile("github", "https://github.com/floflo777"), profile("twitter", "https://twitter.com/0xFlorent_")],
		facts: [fact("Keeps open-crypto-puzzles, a catalogue of public bounties with an oracle per puzzle, whose README counts about 40 worked and a few solved.", "https://github.com/floflo777/open-crypto-puzzles"), fact("Posted on X about unlocking 1,003.62 ETH trapped in a 2016 ICO contract so its 48 investors could claim it.", "https://x.com/0xFlorent_/status/2061070356564091258", { date: "2026-05-31" })]
	}),
	assets: assets({
		solution: "2025-solution.md",
		sourceUrl: source$1,
		digests: [digest("2025-solution.md", "43a6eb1ba1b81db1898d80f7ed1efa008d8b738f9ff7866d8b2534ca051fd534", 3887)]
	}),
	transactions: [funding("35a1c6c2c7b01a1f9b83ce72f4bc6c748464e3b9f193375d3b80d2f350f48da6", "2026-06-26 09:52:36", 63216e-8), claim("ee70de514686588173b64fc31fc317ae15f1e903c742cc99140d2cf1bb2e8db1", "2026-08-02 12:12:29", 63216e-8)]
});
const source = "https://github.com/floflo777/open-crypto-puzzles/tree/main/4-solved/dug-student-treasure-hunt-63ksats";
const dug2025Index2 = puzzle({
	id: "dug/2025-2",
	chain: "bitcoin",
	address: "bc1qnclravnmv7vta9fhnp44hu3y85z3tfgz0n33wl",
	sourceUrl: source,
	startedAt: "2026-06-26 10:31:49",
	status: Status.Solved,
	solvedAt: "2026-07-08 14:43:50",
	prize: 20888e-8,
	key: seed("profit general lava hover jar visa joy immense install first give kingdom", "m/84'/0'/0'/0/2"),
	techniques: [technique("hidden-seed-words", source)],
	pubkey: compressed("03f505827081f5a8e74e554d1085c4e9b636aade0dc3a44e04a02e9d0a3d796afe"),
	assets: assets({
		solution: "2025-solution.md",
		sourceUrl: source,
		digests: [digest("2025-solution.md", "43a6eb1ba1b81db1898d80f7ed1efa008d8b738f9ff7866d8b2534ca051fd534", 3887)]
	}),
	transactions: [funding("8baaaebcd67605cb8f6621380095ca45585efa6a6f3b61948858f038321fdd35", "2026-06-26 10:31:49", 20888e-8), claim("bcc2154f4eb33c361973313b9fe81131568b2f4ee3ef5a2c3e98dc327afd8074", "2026-07-08 14:43:50", 20888e-8)]
});
var DugCollection = class DugCollection extends NamedCollection {
	static key = "dug";
	static author = party("Dug", {
		key: "dug",
		kind: PartyKind.Person,
		aliases: ["DugandRupe"],
		about: "Hides a BIP39 word in each lecture slide and funds a wallet for whoever collects them all. Publishes the public clues on Nostr.",
		profiles: [profile("nostr", "https://njump.me/npub1zrmu0amjmkynxlxgmdsyrjmp8vhxdz8ch5vja9vh9ym4natg8k5s8ge9wx")],
		facts: [
			fact("The Nostr profile is named DugandRupe with the display name Dug and the address Dug@primal.net.", "https://njump.me/npub1zrmu0amjmkynxlxgmdsyrjmp8vhxdz8ch5vja9vh9ym4natg8k5s8ge9wx", { date: "2025-07-16" }),
			fact("Posted the twelfth word, Kingdom, on 2025-10-07 with the lecture slide attached, signed by the same key.", "https://njump.me/note157473tjlhl8046c4uhxk6889nwgflwsjtlpwgzfuqp0lmq8vvzas0km4hc", { date: "2025-10-07" }),
			fact("The 2025 edition funded three BIP84 addresses of one seed, 159,186 sats in all. A public Seed Cipher sheet let people outside the class recover the phrase.", "https://github.com/floflo777/open-crypto-puzzles/tree/main/4-solved/dug-student-treasure-hunt-63ksats", { date: "2026-08-02" })
		]
	});
	static puzzles = [
		dug2025Index0,
		dug2025Index1,
		dug2025Index2
	];
	static hints = [official("Twelfth and Final Treasure Hunt Word: 12. Kingdom", "https://njump.me/note157473tjlhl8046c4uhxk6889nwgflwsjtlpwgzfuqp0lmq8vvzas0km4hc", confirmation("https://blossom.primal.net/394004c70b8907504a2424865e866b10fe5746c89122899a968f3dbcd18ad6b3.jpg", "The lecture slide attached to Dug's signed Nostr event."), { date: "2025-10-07" })];
	constructor() {
		super(DugCollection.key, DugCollection.author, DugCollection.puzzles, DugCollection.hints);
	}
};
const dug = new DugCollection();
export { DugCollection, dug };
