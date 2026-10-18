import { PartyKind, assets, claim, compressed, confirmation, digest, fact, funding, official, party, profile } from "../_chunks/parts.mjs";
import { Status } from "../_chunks/status.mjs";
import { puzzle } from "../_chunks/puzzle.mjs";
import { NamedCollection } from "../_chunks/collection.mjs";
const HOME$3 = "https://coingames6.webnode.page/";
const HOME_CAPTURE$2 = "https://web.archive.org/web/20220813091533/https://coingames6.webnode.page/";
const CDN$2 = "https://386758fd16.cbaul-cdnwnd.com/9c493a7ec34929c379f1104e3122787b";
const PAGE$2 = "https://coingames6.webnode.page/puzzle1/";
const coinGames1 = puzzle({
	id: "coin-games/1",
	chain: "bitcoin",
	address: "1M9Wim45mRH31YwQX2iAc7if2M6fjxK3vQ",
	sourceUrl: PAGE$2,
	startedAt: "2017-11-20 04:37:55",
	status: Status.Claimed,
	solvedAt: "2017-12-14 08:13:31",
	solveTime: 2086536,
	prize: 202e-7,
	pubkey: compressed("0331820835233189d48bbb323ec9f086c3d043d28f0258b452c94ad25bf444e152"),
	hints: [official("Difficulty: Easy 10 words", HOME$3, confirmation(HOME_CAPTURE$2, "The home page as it stood in August 2022.")), official("The Image has now been updated to help solvers out!", PAGE$2, void 0, { date: "2017-12-12" })],
	assets: assets({
		puzzle: "1/puzzle.png",
		hints: [
			"1/version-2.png",
			"1/version-3.png",
			"1/version-4.png",
			"1/version-5.png",
			"1/version-6.png"
		],
		sourceUrl: PAGE$2,
		digests: [
			digest("1/puzzle.png", "f02084fab4a7a321745154a65711a66e62b1e7002fbe8318e49dd07e898d0674", 943023, { url: `${CDN$2}/200000022-157d61677a/BitcoinPuzzlenumber1.png?ph=386758fd16` }),
			digest("1/version-2.png", "0797c6da69fd962abdc631cff38c04b5608a66e5dc827deb3adf7c7718b7852d", 980336, { url: `${CDN$2}/200000026-dd6b9de644/1UPDATE.png?ph=386758fd16` }),
			digest("1/version-3.png", "b0faf86ded13be9a595b4ca76a753b1635890dbf62f362068d4b7f9addf13076", 949713, { url: `${CDN$2}/200000027-d28a5d3829/2UPDATE.png?ph=386758fd16` }),
			digest("1/version-4.png", "64d74e85cb8bc5a3618155df26e1646059fae105fcc66751ba05907e765b2d9c", 958284, { url: `${CDN$2}/200000028-71cfc72c8e/3FINALCLUE.png?ph=386758fd16` }),
			digest("1/version-5.png", "03c8f8bd145cbfd402f570d844123268fb9e81477d7394eb94dbfb97eaf66a5e", 997751, { url: `${CDN$2}/200000029-a187fa2813/4EXTRA.png?ph=386758fd16` }),
			digest("1/version-6.png", "a9bb0cea52319ee301d0d7a7b0dbb7d4d4e75fed2cd892e01d2902e880670b64", 968628, { url: `${CDN$2}/200000030-97e3f98dcc/512-3.png?ph=386758fd16` })
		]
	}),
	transactions: [funding("2a6f631a0a9ee6b0eb82ab99243809c735c285a6c5ee42055db7aaa870b54349", "2017-11-20 04:37:55", 202e-7), claim("1e2e0f017c15946f44d7f6f19e359fd6aa6c655353c8e094cb431d28de2376c7", "2017-12-14 08:13:31", 202e-7)],
	solver: party(void 0, { addresses: ["1N8RZziRx4ahauqd3VcXMfYsCe4HTL2GfJ"] })
});
const HOME$2 = "https://coingames6.webnode.page/";
const HOME_CAPTURE$1 = "https://web.archive.org/web/20220813091533/https://coingames6.webnode.page/";
const CDN$1 = "https://386758fd16.cbaul-cdnwnd.com/9c493a7ec34929c379f1104e3122787b";
const PAGE$1 = "https://coingames6.webnode.page/a2/";
const coinGames2 = puzzle({
	id: "coin-games/2",
	chain: "bitcoin",
	address: "1PMvVyADCztUAWx55AoUiUo9jyB5UA19GL",
	sourceUrl: PAGE$1,
	startedAt: "2017-11-26 00:00:00",
	preGenesis: true,
	status: Status.Claimed,
	solvedAt: "2018-08-19 21:08:28",
	solveTime: 23058508,
	prize: 3301e-8,
	pubkey: compressed("03c0bd7c4b441e1abe699bb770fe9c47aa3bf20ad791dbf5deea5c210e2d4a6335"),
	hints: [official("Difficulty: Medium 16 Words", HOME$2, confirmation(HOME_CAPTURE$1, "The home page as it stood in August 2022."))],
	assets: assets({
		puzzle: "2/puzzle.png",
		sourceUrl: PAGE$1,
		digests: [digest("2/puzzle.png", "2b279cb7e617021cd0904349ba5cb15959e45ddf5fdce596f97e1b1a01d20d61", 3300973, { url: `${CDN$1}/200000023-5e90d5f8ca/eviltrumpdollar2.png?ph=386758fd16` })]
	}),
	transactions: [funding("15c705bb0d65e7cb800c236cc1f219e4b3db9d5772935d4aea6d3f550f60f54f", "2017-11-20 04:47:17", 3301e-8), claim("d5efdb6e62e85f3d603c37d4e3ded82cddbb7e71f8a7d36c9848caa7f9a99157", "2018-08-19 21:08:28", 309e-7)],
	solver: party(void 0, { addresses: ["1NXB3Mimrpij1HCz2wWJR3tpRcHexsuQM3"] })
});
const HOME$1 = "https://coingames6.webnode.page/";
const HOME_CAPTURE = "https://web.archive.org/web/20220813091533/https://coingames6.webnode.page/";
const CDN = "https://386758fd16.cbaul-cdnwnd.com/9c493a7ec34929c379f1104e3122787b";
const PAGE = "https://coingames6.webnode.page/a3/";
const coinGames3 = puzzle({
	id: "coin-games/3",
	chain: "bitcoin",
	address: "1DR2SGyJPFnA5nsCPJqtTUk269wtD3RSo4",
	sourceUrl: PAGE,
	startedAt: "2017-12-03 00:00:00",
	preGenesis: true,
	status: Status.Claimed,
	solvedAt: "2018-03-05 21:56:07",
	solveTime: 8027767,
	prize: 6661e-8,
	pubkey: compressed("0327f5f2a0bd3c21016a9c062d4f4236e6b9f3ab25972c3cd8794a620481547c01"),
	hints: [official("Difficulty: Medium 12 Words", HOME$1, confirmation(HOME_CAPTURE, "The home page as it stood in August 2022."))],
	assets: assets({
		puzzle: "3/puzzle.png",
		sourceUrl: PAGE,
		digests: [digest("3/puzzle.png", "d15622845e78829656350c90338914286d1a0fd27cf69c01171edfa06d270132", 2729841, { url: `${CDN}/200000024-efc9ff0c1e/1337330119992020.png?ph=386758fd16` })]
	}),
	transactions: [funding("05eaaeceda879b6703534a70d3a87576ae0766015be796ca929bc45417e826e0", "2017-11-20 04:37:55", 6661e-8), claim("b028604b1a8f159c95d9939853ff88073093b432700833004f720a505455379d", "2018-03-05 21:56:07", 5701e-8)],
	solver: party(void 0, { addresses: ["1MiiZiEFy5mNjjFpiKYVtUG6FyapsogGcN"] })
});
const HOME = "https://coingames6.webnode.page/";
const ANNOUNCEMENT = "https://www.reddit.com/r/bitcoinpuzzles/comments/7hfbar/new_weekly_bitcoin_puzzles_is_it_the_resurrection/";
var CoinGamesCollection = class CoinGamesCollection extends NamedCollection {
	static key = "coin-games";
	static author = party("Coin_Pro", {
		key: "coin-pro",
		kind: PartyKind.Person,
		aliases: ["CO||N_PRO"],
		about: "Drew Bitcoin puzzles as banknotes for Coin_Games in late 2017 and promised a bigger prize every week until the new year.",
		addresses: ["1LJquQsbjVomQR8gwv878LY6nV5ajVZxnc"],
		profiles: [profile("website", HOME)],
		facts: [
			fact("Signs the Coin_Games pages COIN_PRO / DJ, Producer, Programmer / 2017.", HOME),
			fact("The home page lists puzzles #4 to #6 with Bitcoin prizes of .00013371, .00007771 and .00017771 but no address, and #7 as Funding Unsuccessful.", HOME),
			fact("u/3301J announced the first three puzzles on r/bitcoinpuzzles and named Coin_Pro and Valhalla Games Unlimited as their makers.", ANNOUNCEMENT, { date: "2017-12-04" })
		]
	});
	static puzzles = [
		coinGames1,
		coinGames2,
		coinGames3
	];
	constructor() {
		super(CoinGamesCollection.key, CoinGamesCollection.author, CoinGamesCollection.puzzles);
	}
};
const coinGames = new CoinGamesCollection();
export { CoinGamesCollection, coinGames };
