import { PartyKind, assets, claim, digest, fact, hex, party, profile, technique, uncompressed } from "../_chunks/parts.mjs";
import { Status } from "../_chunks/status.mjs";
import { puzzle } from "../_chunks/puzzle.mjs";
import { NamedCollection } from "../_chunks/collection.mjs";
const SOLUTION = "https://www.vice.com/en/article/heres-the-solution-to-the-3-year-old-dollar50000-bitcoin-puzzle/";
const torchedH34r7s = puzzle({
	id: "coin-artist/torched-h34r7s",
	chain: "bitcoin",
	address: "1FLAMEN6rq2BqMnkUmsJBqCGWdwgVKcegd",
	sourceUrl: "https://bitcointalk.org/index.php?topic=766000.msg8633825#msg8633825",
	startedAt: "2015-04-03",
	status: Status.Solved,
	pubkey: uncompressed("04af0f6203b43276804c2cbbda0d10c797e61805b56e7abb5dd0cd90f69113dc1bbbaa4bae9c7eee1fde4cab190d54a0da60bca489702a8f7daa895fcaebd2b136"),
	key: hex("ac928bf050d1292b8a3a1ef1139fd1e74cefc50005f29720d6bf309169537452"),
	techniques: [technique("steganography", SOLUTION), technique("xor", SOLUTION)],
	prize: 4.87,
	solvedAt: "2018-02-01 15:09:42",
	transactions: [claim("cb0156faa1716186b96f7e668a59204061a3419a746810ce151052d2860ac7cf", "2018-02-01 15:09:42", 5.001337)],
	assets: assets({
		puzzle: "torched-h34r7s/puzzle.jpg",
		solution: "torched-h34r7s/solution.md",
		sourceUrl: "https://raw.githubusercontent.com/ynohtna92/1FLAMEN6/64f6eff0cb6541f7a4209fc567a37dce33cb9039/The%20Legend%20of%20Satoshi%20Nakamoto.jpg",
		digests: [digest("torched-h34r7s/puzzle.jpg", "9653ff4d7131db16186d004e90e6f1f7231e4b33a408aa962e6803a5ab1f662f", 1040730, {
			url: "https://raw.githubusercontent.com/ynohtna92/1FLAMEN6/64f6eff0cb6541f7a4209fc567a37dce33cb9039/The%20Legend%20of%20Satoshi%20Nakamoto.jpg",
			archive: "https://web.archive.org/web/20260926203254id_/https://raw.githubusercontent.com/ynohtna92/1FLAMEN6/64f6eff0cb6541f7a4209fc567a37dce33cb9039/The%20Legend%20of%20Satoshi%20Nakamoto.jpg"
		}), digest("torched-h34r7s/solution.md", "b459f84e1e67a8abe97e358c3e94964d6ca8a039cc22655f3fc8126f86044846", 2878)]
	})
});
var CoinArtistCollection = class CoinArtistCollection extends NamedCollection {
	static key = "coin-artist";
	static author = party("coin_artist", {
		key: "coin-artist",
		kind: PartyKind.Person,
		aliases: ["Marguerite deCourcelle"],
		about: "Crypto artist and game designer who painted TORCHED H34R7S with a wallet key inside, and later founded Blockade Games.",
		profiles: [profile("twitter", "https://x.com/coin_artist")],
		facts: [
			fact("Made the painting at Easter 2015 with the artist Rob Myers, to close a series of Bitcoin puzzles called The Legend of Satoshi Nakamoto.", "https://www.cbc.ca/radio/asithappens/as-it-happens-friday-edition-1.4528357/this-painting-is-actually-a-bitcoin-puzzle-worth-more-than-40k-and-someone-finally-solved-it-1.4529176", { date: "2018-02-12" }),
			fact("Told Vice how the key went in: a 52 character WIF plus a marker phrase, XORed against a six bit ribbon cipher and painted as flame shapes and colours.", "https://www.vice.com/en/article/heres-the-solution-to-the-3-year-old-dollar50000-bitcoin-puzzle/"),
			fact("Sotheby's catalogued the physical painting under her name as the final piece of the puzzle chain revealing the code to the 1flamen6 wallet.", "https://www.sothebys.com/buy/d671da77-a5fe-4610-9477-082d4c86eb75/lots/0952dcd2-e85f-46d2-b83e-236a8e9129af"),
			fact("Introduced in a 2019 interview as founder and CEO of Blockade Games, a studio building puzzle games on blockchains.", "https://www.scarlettsieber.com/tech-tuesday/marguerite-decourcelle", { date: "2019-09-04" })
		]
	});
	static puzzles = [torchedH34r7s];
	constructor() {
		super(CoinArtistCollection.key, CoinArtistCollection.author, CoinArtistCollection.puzzles);
	}
};
const coinArtist = new CoinArtistCollection();
export { CoinArtistCollection, coinArtist };
