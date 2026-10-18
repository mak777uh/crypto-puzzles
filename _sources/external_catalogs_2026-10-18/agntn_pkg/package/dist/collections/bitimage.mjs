import { PartyKind, assets, claim, compressed, derivation, digest, fact, funding, increase, party, profile, source, technique } from "../_chunks/parts.mjs";
import { Status } from "../_chunks/status.mjs";
import { puzzle } from "../_chunks/puzzle.mjs";
import { NamedCollection } from "../_chunks/collection.mjs";
const bitimagePuzzleKitten = puzzle({
	id: "bitimage/kitten",
	chain: "bitcoin",
	address: "bc1q57euh23y3qs2f9d5mtwpax5lqecfvrdkqce82a",
	sourceUrl: "https://corey-lyle-phillips.medium.com/part-1-3-turn-your-photos-into-bitcoin-private-keys-addresses-57669771cf7a",
	startedAt: "2019-07-03 02:48:04",
	status: Status.Solved,
	pubkey: compressed("021209b131dfbd1efcfe15b1d1e92002653f5fc98e9ff6cb73a0d70153dbe58463"),
	key: derivation("m/84'/0'/0'/0/0").entropy("1808d35318ac7cb98b69ff9779b699d6a631f15e0b353ac89b7c4020774832ed", source("https://twitter.com/aantonop/status/603701870482300928", "Antonopoulos kitten tweet (May 2015)")),
	techniques: [technique("sha256-to-bip39-entropy", "https://corey-lyle-phillips.medium.com/part-1-3-turn-your-photos-into-bitcoin-private-keys-addresses-57669771cf7a")],
	prize: 95133e-8,
	solvedAt: "2019-07-09 21:26:12",
	solveTime: 585488,
	transactions: [funding("1482b329809e168c61a40966e9ffb029ad20a2c0022bd0e55efeea35b8a9409c", "2019-07-03 02:48:04", 95133e-8), claim("49638d16a21133febb093580527e50039eee630e2c4918a0654a71ef437ad093", "2019-07-09 21:26:12", 95133e-8)],
	assets: assets({
		puzzle: "kitten/puzzle.jpg",
		sourceUrl: "https://twitter.com/aantonop/status/603701870482300928",
		digests: [digest("kitten/puzzle.jpg", "b988e0881a0211222e83f3e2a4bfac695c951bf96aa33ec112fab6992f5e7343", 265456, {
			url: "https://pbs.twimg.com/media/CGDHoYiU0AEQXze.jpg",
			archive: "https://web.archive.org/web/20210520115853id_/https://pbs.twimg.com/media/CGDHoYiU0AEQXze.jpg"
		})]
	})
});
const bitimagePuzzleKittenPassphrase = puzzle({
	id: "bitimage/kitten-passphrase",
	chain: "bitcoin",
	address: "bc1qcyrndzgy036f6ax370g8zyvlw86ulawgt0246r",
	sourceUrl: "https://corey-lyle-phillips.medium.com/part-1-3-turn-your-photos-into-bitcoin-private-keys-addresses-57669771cf7a",
	startedAt: "2019-06-28 08:06:08",
	key: derivation("m/84'/0'/0'/0/0").entropy("1808d35318ac7cb98b69ff9779b699d6a631f15e0b353ac89b7c4020774832ed", source("https://twitter.com/aantonop/status/603701870482300928", "Antonopoulos kitten tweet (May 2015)"), "Required"),
	techniques: [technique("sha256-to-bip39-entropy", "https://corey-lyle-phillips.medium.com/part-1-3-turn-your-photos-into-bitcoin-private-keys-addresses-57669771cf7a")],
	prize: .010019,
	transactions: [funding("c3a8c1eedc3512cc92e8798eb240d81bcb2446dfe91339bbafd5e9687c3c663d", "2019-06-28 08:06:08", .01), increase("1e4c42f9aedfbdea00c2134af18de6d449a1a88565486a4de5b749634ecc07d8", "2025-04-11 14:43:52", 19e-6)],
	assets: assets({
		puzzle: "kitten-passphrase/puzzle.jpg",
		sourceUrl: "https://twitter.com/aantonop/status/603701870482300928",
		digests: [digest("kitten-passphrase/puzzle.jpg", "b988e0881a0211222e83f3e2a4bfac695c951bf96aa33ec112fab6992f5e7343", 265456, {
			url: "https://pbs.twimg.com/media/CGDHoYiU0AEQXze.jpg",
			archive: "https://web.archive.org/web/20210520115853id_/https://pbs.twimg.com/media/CGDHoYiU0AEQXze.jpg"
		})]
	})
});
var BitimageCollection = class BitimageCollection extends NamedCollection {
	static key = "bitimage";
	static author = party("Corey Phillips", {
		key: "corey-phillips",
		kind: PartyKind.Person,
		aliases: ["coreylphillips"],
		about: "Bitcoin mobile developer who turned photographs into BIP39 seeds with BitImage and funded two of them.",
		profiles: [
			profile("github", "https://github.com/coreyphillips"),
			profile("twitter", "https://x.com/coreylphillips"),
			profile("medium", "https://corey-lyle-phillips.medium.com/")
		],
		facts: [
			fact("The GitHub bio reads Software Developer at Synonym.to, with pinned work on the Bitkit wallet and its Lightning bindings.", "https://github.com/coreyphillips"),
			fact("Published BitImage in July 2019 as part one of a series on turning photos into private keys and addresses.", "https://corey-lyle-phillips.medium.com/part-1-3-turn-your-photos-into-bitcoin-private-keys-addresses-57669771cf7a", { date: "2019-07-09" }),
			fact("Ran a separate audio puzzle in January 2020. Its prize was swept four days later.", "https://corey-lyle-phillips.medium.com/a-bitcoin-audio-puzzle-61174b9849ce", { date: "2020-01-05" }),
			fact("Also wrote Moonshine, a React Native Bitcoin and Litecoin wallet first released as Bitbip.", "https://github.com/coreyphillips/moonshine")
		]
	});
	static puzzles = [bitimagePuzzleKitten, bitimagePuzzleKittenPassphrase];
	constructor() {
		super(BitimageCollection.key, BitimageCollection.author, BitimageCollection.puzzles);
	}
};
const bitimage = new BitimageCollection();
export { BitimageCollection, bitimage };
