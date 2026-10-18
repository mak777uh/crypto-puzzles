import { PartyKind, compressed, confirmation, derivation, fact, funding, official, party, profile, technique } from "../_chunks/parts.mjs";
import { puzzle } from "../_chunks/puzzle.mjs";
import { NamedCollection } from "../_chunks/collection.mjs";
const walkingBanks1 = puzzle({
	id: "walking-banks/1",
	chain: "bitcoin",
	address: "bc1qxy4tf0s4n7x9w24rawf9qsxh2hyljrmvyrhwzt",
	sourceUrl: "https://web.archive.org/web/20250716082759/https://www.walkingbanks.com/",
	startedAt: "2024-09-05 13:35:50",
	prize: .001,
	pubkey: compressed("027b26f0973f7656d7405ebdc2d7500d855aee346ff4518d61507050254703d8a3"),
	key: derivation("m/84'/0'/0'/0/0").xpub("xpub6DWcZA9sqNapeBk9oUtd6Vj1PPAMARX1c6qMeX7VpUWeLZQ93UGDi6G1aSCX5FKt92XrEB5CcUmDHJjUeTTT9cJxV88wZ2vdhNnuY3PSdsV"),
	transactions: [funding("70efe537a71ccbf9fabb603210d732bc3e8da3300976d7a130e7b1766d6e2830", "2024-09-05 13:35:50", .001)]
});
const walkingBanks2 = puzzle({
	id: "walking-banks/2",
	chain: "bitcoin",
	address: "bc1q4qc24xk5cehc4t7vr264zldsms2kmxf86jqjau",
	sourceUrl: "https://web.archive.org/web/20250716082759/https://www.walkingbanks.com/",
	startedAt: "2024-09-05 13:49:07",
	prize: .007,
	pubkey: compressed("0345a988db0b34ab48693b9d525ff227d98c67e8986c0664c1d9412f111e5afa3b"),
	key: derivation("m/84'/0'/0'/0/1").xpub("xpub6DWcZA9sqNapeBk9oUtd6Vj1PPAMARX1c6qMeX7VpUWeLZQ93UGDi6G1aSCX5FKt92XrEB5CcUmDHJjUeTTT9cJxV88wZ2vdhNnuY3PSdsV"),
	transactions: [funding("ad436eaaa66e31b59b763049dc6d59bb213cc3b9910b80b2e7424720e39b1533", "2024-09-05 13:49:07", .007)]
});
const SITE = "https://www.walkingbanks.com/";
const SITE_CAPTURE = "https://web.archive.org/web/20250716082759/https://www.walkingbanks.com/";
const BOOK = "https://d.nostr.build/UlE0X93faO1XxD9l.pdf";
const BOOK_POST = "https://njump.me/note1jvpc4m95fdr5hxqkhpyj5alcaeqj7hwtr6hdp4zk5n9uvewpzkyq2ldrlv";
const RIGHT_ORDER = "https://njump.me/note15ys0tl7dyjy3lgah9n4n8360lamefqe40w2d7d9asdgmk3km5ngsxpzqrp";
var WalkingBanksCollection = class WalkingBanksCollection extends NamedCollection {
	static key = "walking-banks";
	static author = party("AH White", {
		key: "ah-white",
		kind: PartyKind.Person,
		aliases: ["AHWhite"],
		about: "Neurobiologist and bitcoiner who wrote a Bitcoin murder mystery, gave the PDF away on Nostr and hid a real seed phrase in the story.",
		profiles: [profile("nostr", "https://njump.me/npub1c2rvx6ue9uewl452kczcfxz9w242sfzn64ul8dv2afd3t5dpktzs0kmmvf"), profile("twitter", "https://twitter.com/_AHWhite")],
		facts: [
			fact("Posted the free PDF of Walking Banks on Nostr, hosted on nostr.build, for anyone to download and share.", BOOK_POST, { date: "2024-09-06" }),
			fact("Announced with the audiobook that the story holds the information for a real Bitcoin seed phrase to a wallet with 0.008 BTC, first finder takes it.", "https://njump.me/note13jytkuegqd8tdlk0ewl9vyg4aeh6yxgcqe0zuatd379d8asnqd2sth0f3k", { date: "2025-05-15" }),
			fact("The Find the Treasure section of walkingbanks.com links the treasure wallet's xpub on blockchain.com rather than an address.", "https://web.archive.org/web/20250402113442/https://www.walkingbanks.com/"),
			fact("Answered a reader that no transaction showed up for the address, not even the deposits that loaded the wallet.", "https://njump.me/note1l9kql0d2urf8n26zgls65mssq4r5wmp27w77uzeu33jn5j3z0pvsuafh3a", { date: "2025-08-06" })
		]
	});
	static puzzles = [walkingBanks1, walkingBanks2];
	static hints = [
		official("Nestled within the chapters of \"Walking Banks\" lie hints to a genuine bitcoin treasure, just waiting for a reader to uncover it.", SITE, confirmation(SITE_CAPTURE)),
		official("The book holds information that, when pieced together, unveil a seed phrase to a wallet containing real bitcoin; 0.008 BTC, or 800,000 Satoshis to be precise.", SITE, confirmation(SITE_CAPTURE)),
		official("xiiithirdiiicrystaliiismalliiiadviceiiireflectxxxxxxcrystaliiismalliiiadviceiiireflectxxxxxxcrystaliiismalliiiadviceiiireflectiiithirdiiix", BOOK, void 0, { date: "2024-09-06" }),
		official("“‘Crystal, small, advice, and reflect’ are words belonging to a list that is used to make up a bitcoin seed phrase which normally consists of twenty four words,” she said, pointing to the words on the screen. “And considering the context, I’d say they are to be entered as the third list of words in a longer seed phrase that will give you access to Liang Wei’s fortune stored on a wallet on the bitcoin blockchain.”", BOOK, void 0, { date: "2024-09-06" }),
		official("If your up for a treasure hunt, the book contains a real Bitcoin seed phrase hidden within the story. So if you can piece the right string of words together, it leads to a wallet with 800000 sats in it.", "https://njump.me/note1vm2c020vsrkvg077m3tptta2n44j2qez20zk65j6eeh3ta652jysd69g2q", void 0, { date: "2025-05-19" }),
		official("It's 24 words...if the wallet is not emptied after some time, I'll start dropping some hints from time to time", "https://njump.me/note1rmyu92ufwfl2nukzn2njlfynegu6jqyxhejc3207lztm5v3pugrsty535z", void 0, { date: "2025-05-19" }),
		official("Did you know that word repetitions are actually allowed in a seed phrase?", "https://njump.me/note1s29pn8p95u334wqspvyj2lm8naelfcel02zqxqk9h5t9kxmsq43q39zh0k", void 0, { date: "2025-11-21" }),
		official("So here some straightforward clues: the book contains the words to a 24-word see phrase in the right order.", RIGHT_ORDER, void 0, { date: "2026-03-16" })
	];
	static techniques = [technique("hidden-seed-words", RIGHT_ORDER)];
	constructor() {
		super(WalkingBanksCollection.key, WalkingBanksCollection.author, WalkingBanksCollection.puzzles, WalkingBanksCollection.hints, WalkingBanksCollection.techniques);
	}
};
const walkingBanks = new WalkingBanksCollection();
export { WalkingBanksCollection, walkingBanks };
