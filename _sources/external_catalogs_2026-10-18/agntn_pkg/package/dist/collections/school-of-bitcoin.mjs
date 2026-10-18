import { PartyKind, assets, community, digest, fact, funding, official, party, profile, technique } from "../_chunks/parts.mjs";
import { puzzle } from "../_chunks/puzzle.mjs";
import { SingletonCollection } from "../_chunks/collection.mjs";
const CARD = "https://x.com/schoolofbitcoin/status/1860193190491619457";
const REPOST = "https://x.com/schoolofbitcoin/status/1897907304072171821";
function comment(id) {
	return `https://stacker.news/items/${id}`;
}
const businessCard = puzzle({
	id: "school-of-bitcoin",
	chain: "bitcoin",
	address: "bc1qcsdfkaqgy9ux668vmzflzqsyg0qtspncymt5ed",
	sourceUrl: CARD,
	startedAt: "2024-11-23 05:22:14",
	prize: .01,
	techniques: [technique("morse", comment("908393")), technique("binary", comment("908556"))],
	hints: [
		official("Hidden on this card... is every clue needed to find a treasure of... 1 Million Sats", CARD, void 0, { date: "2024-11-23" }),
		official("at 2000 followers I said I would share the back of my business card... on which I have hidden all the clues you need to find and claim 1 MILLION sats", CARD, void 0, { date: "2024-11-23" }),
		official("Oh, and when I get to 10,000 followers if it hasn't been claimed I will reveal a big clue to the treasure!", CARD, void 0, { date: "2024-11-23" }),
		official("I've designed it to be a.i proof... prove me wrong", REPOST, void 0, { date: "2025-03-07" }),
		official("You need a touchscreen to zoom... either phone, tablet or laptop/desktop with touchscreen", comment("921244"), void 0, { date: "2025-03-22" }),
		community("The morse code translates to ZEROBONEZEROONEZERO FINGZ KNEE DID 4D A DRESS 2Z PRIES. 0b1010 is binary for decimal 10, so 10 things needed for the address to see prize", comment("908393"), void 0, { date: "2025-03-09" }),
		community("Wingdings, what a font! But it is the black characters you want :)", comment("908489"), void 0, { date: "2025-03-09" }),
		community("Decoding it to ASCII characters gives: \"You found a clue to the hidden treasure of 1 FULL BITCOIN! :) abstract\". First seed word is abstract.", comment("908556"), void 0, { date: "2025-03-09" })
	],
	transactions: [funding("bddcb314564eb66215c7aa27a1aad126d5f51240db073adf5eb72382b0044eda", "2024-10-12 07:23:20", .01)],
	assets: assets({
		puzzle: "puzzle.jpg",
		sourceUrl: CARD,
		digests: [digest("puzzle.jpg", "cc58d233151dfed747368a452c08651b5cd2e308a1180407c8c1c503bd22af21", 1081755, { url: "https://pbs.twimg.com/media/GdC6pxMagAAy0ri.jpg?name=orig" })]
	})
});
var SchoolOfBitcoinCollection = class SchoolOfBitcoinCollection extends SingletonCollection {
	static key = "school-of-bitcoin";
	static author = party("School of Bitcoin", {
		key: "school-of-bitcoin",
		kind: PartyKind.Organization,
		about: "Free Bitcoin course at schoolofbitcoin.com that hid 1,000,000 sats behind the back of its own business card.",
		profiles: [profile("website", "https://schoolofbitcoin.com/"), profile("twitter", "https://x.com/schoolofbitcoin")],
		facts: [
			fact("Promised the back of its business card at 2000 followers on X and shared it then, with every clue needed to find and claim 1 million sats.", CARD, { date: "2024-11-23" }),
			fact("Posted the card again in March 2025 and dared Grok to solve a hunt it called a.i proof.", REPOST, { date: "2025-03-07" }),
			fact("Answered the Stacker News thread about the card anonymously, signed M with the schoolofbitcoin.com link, and told the players they had got further than anyone so far.", comment("908965"), { date: "2025-03-10" })
		]
	});
	static puzzles = [businessCard];
	constructor() {
		super(SchoolOfBitcoinCollection.key, SchoolOfBitcoinCollection.author, SchoolOfBitcoinCollection.puzzles);
	}
};
const schoolOfBitcoin = new SchoolOfBitcoinCollection();
export { SchoolOfBitcoinCollection, businessCard, schoolOfBitcoin };
