import { PartyKind, answer, assets, claim, digest, fact, funding, hex, official, party, profile, technique, uncompressed, wif } from "../_chunks/parts.mjs";
import { Status } from "../_chunks/status.mjs";
import { puzzle } from "../_chunks/puzzle.mjs";
import { NamedCollection } from "../_chunks/collection.mjs";
const VIDEO$1 = "https://www.youtube.com/watch?v=DieNZPwIUoQ";
const dogesGambitDoge = puzzle({
	id: "doges-gambit/doge",
	chain: "dogecoin",
	address: "DRMqy4bGAnWpaShBFtTUoHEiBWj4HoiSfq",
	sourceUrl: VIDEO$1,
	startedAt: "2020-12-11 22:11:10",
	status: Status.Solved,
	pubkey: uncompressed("0488e79ff1f6aa637457d531c6d40c056230b8106290651054f67eb12e96a7ba35573300a4c2af9ec7597fe0dbf75f5214e34e3ae071321562d04e4766ad695766"),
	key: wif("6Je1sv5tRwXLFKpnor4yef6i4k73eJu2Kw9DEnRLY3BL9jVtPq3"),
	techniques: [technique("steganography", VIDEO$1)],
	prize: 1e4,
	solvedAt: "2021-05-09 00:28:06",
	solveTime: 12795416,
	hints: [official("This is the first time I put two puzzles in one, any feedback is appreciated!", VIDEO$1, void 0, {
		date: "2020-12-11",
		answer: answer("The same board, read the other way: order the sixteen frames by their number of pink squares, keep the yellow, green, blue and red squares a piece can move to, drop those that touch no blue square, diagonals included, and read the rest by how many blue squares each one touches. Each frame gives a few characters of the Dogecoin WIF, not always the same number.", "https://www.youtube.com/watch?v=-7-m60jy1RU", { date: "2021-05-11" })
	})],
	transactions: [funding("f83597b8e239846eb61f42b0e8bcb932d2ccf206115c122e0c84bfb5d72f2503", "2020-12-11 21:53:40", 1e4), claim("ccc7f365a3b212a3d8320397cec9c3aa14684f4b54e0ee037fc0f76c1ee5d372", "2021-05-09 00:28:06", 9999)],
	assets: assets({
		puzzle: "puzzle.jpg",
		solution: "doge-key.png",
		sourceUrl: VIDEO$1,
		digests: [digest("puzzle.jpg", "cfb83b47d08d68c27d6526e1b0d4e4b5318eb684de68298ee9cf2e53d4b443c9", 90980), digest("doge-key.png", "30083983e7224836ef099a607f295994b2e5e2fcfdcc920de484f84ce01855b2", 77918)]
	})
});
const VIDEO = "https://www.youtube.com/watch?v=DieNZPwIUoQ";
const dogesGambitEth = puzzle({
	id: "doges-gambit/eth",
	chain: "ethereum",
	address: "0x7777F6974BA9Ba3Bcfe75D2Aa52db8cE633e592F",
	sourceUrl: VIDEO,
	startedAt: "2020-12-11 22:11:10",
	status: Status.Solved,
	pubkey: uncompressed("047646f5a4dbb6fa9cc47f1c446a63a95b9a7e8b7f14336ed3e573ee8277d54bb7b2d99d67a03a00f0d6543eac3faccd938e06b17aba5a139ec86cda70a0477bce"),
	key: hex("78502de89b8db1c4af2392e34b78d47865c93b923a6eaac3671bdeafa400c206"),
	techniques: [technique("steganography", VIDEO)],
	prize: .01,
	solvedAt: "2021-04-23 14:32:06",
	solveTime: 11463656,
	hints: [official("This is the first time I put two puzzles in one, any feedback is appreciated!", VIDEO, void 0, {
		date: "2020-12-11",
		answer: answer("The board is a chess board with coins for pieces: Doge knights, Ether rooks, Bomb Token bishops and spirograph queens. Order the sixteen frames by the sum of the digits on white squares, 1 to 16. In each frame keep the yellow, green, blue and red squares no piece can move to, two of each colour, add each pair modulo 16 and read the four sums in star order, yellow, green, blue, red. Four hex digits per frame give the Ether key.", "https://www.youtube.com/watch?v=d-29rBeQXV4", { date: "2021-05-11" })
	})],
	transactions: [
		funding("0xbdbaad334db80acb7d6ea47a266eb0e1b5c21faddda71e8d2875ea0478f1145c", "2020-12-11 21:43:59", .01),
		claim("0x773bee8947b9d981b678f07ba819fee41e0ef76b718804934f0ab9fe59b7d9dc", "2021-04-23 14:32:06", 0),
		claim("0xd4d0179ed4af5fe17953c44bc1b583d5b9f8ef7579e45ddddeee2f06de7bf731", "2021-04-23 14:42:14", .003308173)
	],
	assets: assets({
		puzzle: "puzzle.jpg",
		solution: "eth-key.png",
		sourceUrl: VIDEO,
		digests: [digest("puzzle.jpg", "cfb83b47d08d68c27d6526e1b0d4e4b5318eb684de68298ee9cf2e53d4b443c9", 90980), digest("eth-key.png", "06479cecbe1757b5cbf62309bc0d9e8c49002151eb300124c9fd978124ccbc7a", 78694)]
	})
});
const LAUNCH = "https://www.reddit.com/r/dogecoin/comments/kbcptp/10000_doge_reward_new_cryptocurrency_video_puzzle/";
const REPOST = "https://www.reddit.com/r/dogecoin/comments/l7foig/400_unsolved_dogecoin_video_puzzle_10000_doge/";
const DOGE_SOLUTION = "https://www.youtube.com/watch?v=-7-m60jy1RU";
var DogesGambitCollection = class DogesGambitCollection extends NamedCollection {
	static key = "doges-gambit";
	static author = party("Crypto Puzzlers", {
		key: "cryptopuzzlers",
		kind: PartyKind.Person,
		aliases: ["CryptoPuzzlers", "JT"],
		about: "YouTube channel and Reddit account that hid private keys in short video puzzles and paid the prizes in DOGE, ETH, BOMB and Banano.",
		profiles: [profile("youtube", "https://www.youtube.com/@cryptopuzzlers3890"), profile("reddit", "https://www.reddit.com/user/CryptoPuzzlers")],
		facts: [
			fact("Posted Doge's Gambit on r/dogecoin as two puzzles in one, made a little harder because the previous puzzle posted there was solved within a few hours.", LAUNCH, { date: "2020-12-11" }),
			fact("Put $30 to $40 worth of Dogecoin into Doge's Gambit and posted it again seven weeks later, when the price rise had made the unsolved prize worth around $400.", REPOST, { date: "2021-01-29" }),
			fact("Opens the solution videos as JT and says the Doge's Gambit solver wrote in after about a month of work on it.", DOGE_SOLUTION, { date: "2021-05-11" })
		]
	});
	static puzzles = [dogesGambitEth, dogesGambitDoge];
	constructor() {
		super(DogesGambitCollection.key, DogesGambitCollection.author, DogesGambitCollection.puzzles);
	}
};
const dogesGambit = new DogesGambitCollection();
export { DogesGambitCollection, dogesGambit };
