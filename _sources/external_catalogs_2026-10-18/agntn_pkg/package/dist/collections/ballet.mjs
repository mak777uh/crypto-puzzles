import { PartyKind, assets, claim, compressed, digest, encryptedWif, fact, funding, hex, increase, party, passphrase, profile, technique } from "../_chunks/parts.mjs";
import { Status } from "../_chunks/status.mjs";
import { puzzle } from "../_chunks/puzzle.mjs";
import { NamedCollection } from "../_chunks/collection.mjs";
const balletPuzzleAA007448 = puzzle({
	id: "ballet/AA007448",
	chain: "bitcoin",
	address: "1LL6Xy92LwGDRfQP9fBU7f1477cEKctr7c",
	sourceUrl: "https://x.com/bobbyclee/status/1289004702122643456",
	startedAt: "2020-07-24 05:46:12",
	status: Status.Solved,
	pubkey: compressed("0351a7b8675ac06922080803608908267ec7f5bf93ecdd78969083647ac8a67d0d"),
	key: hex("a5b9247400b7e31e54481f14828ced3a538af280e9eeb1229196c3cb5e7ecdde").wif("L2mrYyo5a6rpyQdC88UitNeH5n1rAqPcq8Qv5gwtQE8KTvW3ZTeH").encrypted("6PnWfKaBfDW6mFFhhFsbNRHnVgojUhdf2b5NXP3FfwXiQ69MxEzVK2J4cH", { passphrase: "335Y-K745-C8WT-4D2W-80WP" }),
	prize: .0011,
	solvedAt: "2020-07-31 01:52:18",
	solveTime: 590766,
	transactions: [funding("3771eac625e0ac4eb60bab31ea73424634b068ac4e724af0cd87330311837933", "2020-07-24 05:46:12", .0011), claim("61eec2eddf3b3d9973561a3d3ebeecf82ba0700564f45e77ee33a8f8f9f9bd9e", "2020-07-31 01:52:18", .0011)],
	assets: assets({
		puzzle: "AA007448/puzzle.jpg",
		sourceUrl: "https://x.com/bobbyclee/status/1289004702122643456",
		digests: [digest("AA007448/puzzle.jpg", "a9c67224d255afd26494fae895d0cf7c501883d464beeeca3704b46d431f20c7", 726927, { url: "https://pbs.twimg.com/media/EeN9ZyNUMAAeVdC.jpg?name=orig" })]
	})
});
const balletPuzzleAA009926 = puzzle({
	id: "ballet/AA009926",
	chain: "bitcoin",
	address: "1JxWyNrkgYvgsHu8hVQZqTXEB9RftRGP5m",
	sourceUrl: "https://x.com/bobbyclee/status/1289004702122643456",
	startedAt: "2020-07-24 05:46:12",
	key: encryptedWif("6PnQmAyBky9ZXJyZBv9QSGRUXkKh9HfnVsZWPn4YtcwoKy5vufUgfA3Ld7"),
	prize: 1.00003481,
	transactions: [
		funding("3771eac625e0ac4eb60bab31ea73424634b068ac4e724af0cd87330311837933", "2020-07-24 05:46:12", 1),
		increase("5037ba0edc3ea80df73f38eb4d3ab4c0e395433807d58a4c8289bec11e677bd7", "2022-01-30 13:11:20", 1e-5),
		increase("ddd79c2a6f1772359e9b6c8ab2140275e9005d0dee8bce566e6b8d52a9a3921c", "2024-05-17 17:34:48", 2481e-8)
	],
	assets: assets({
		puzzle: "AA009926/puzzle.jpg",
		hints: ["AA009926/revealed.jpg"],
		sourceUrl: "https://x.com/bobbyclee/status/1289004702122643456",
		digests: [digest("AA009926/puzzle.jpg", "574c68aebff7673fa29024d0765056b8b204d27ff8d4bfc22aabd42bc7977560", 1566737, { url: "https://pbs.twimg.com/media/EeNwTlWU8AAYeMl.jpg?name=orig" }), digest("AA009926/revealed.jpg", "78d4c2b748d66e68c2d6226ecf8df338d6b15fb2141f4d57fe74424de44eb859", 217605, {
			url: "https://pbs.twimg.com/media/EeNyXh-UwAAToEr.jpg",
			archive: "https://web.archive.org/web/20210506201027id_/https://pbs.twimg.com/media/EeNyXh-UwAAToEr.jpg"
		})]
	})
});
const balletPuzzleAA012381 = puzzle({
	id: "ballet/AA012381",
	chain: "bitcoin",
	address: "1QGtbKxx6FKDD66LwnrzHCAHmyZ7mDHqC4",
	sourceUrl: "https://x.com/bobbyclee/status/1289004702122643456",
	startedAt: "2020-07-24 05:46:12",
	key: passphrase("594Y-L2RW-4ME7-2XVX-9B41"),
	prize: 1.00003877,
	transactions: [
		funding("3771eac625e0ac4eb60bab31ea73424634b068ac4e724af0cd87330311837933", "2020-07-24 05:46:12", 1),
		increase("9454b3f4ff4e6751763d9e99e710ddccef0cd916e51f661e1ffbc5fe17808df9", "2022-01-30 13:11:20", 1e-5),
		increase("864ce8c51ea055ad0cfbc93695efeacf136d31441199cdec5003ab3e33c3eb7c", "2024-05-17 04:06:41", 2877e-8)
	],
	assets: assets({
		puzzle: "AA012381/puzzle.jpg",
		sourceUrl: "https://x.com/bobbyclee/status/1289004702122643456",
		digests: [digest("AA012381/puzzle.jpg", "c625162197b5bc59a796949dba3816f0e532a97d0a199ca492b5f5445584d320", 1372247, { url: "https://pbs.twimg.com/media/EeNzYosU8AIj1h6.jpg?name=orig" })]
	})
});
var BalletCollection = class BalletCollection extends NamedCollection {
	static key = "ballet";
	static author = party("Bobby Lee", {
		key: "bobby-lee",
		kind: PartyKind.Person,
		about: "Founder and CEO of Ballet, the physical wallet company, and before that co-founder and CEO of BTCC, the first Bitcoin exchange in China.",
		addresses: ["bc1q8car4m7afzx46m2kuhe5xv2ztvc98mk3glyccx"],
		profiles: [profile("twitter", "https://x.com/bobbyclee"), profile("website", "https://www.ballet.com/about")],
		facts: [
			fact("Founded Ballet in early 2019 to sell cold storage wallets that need no setup. The company is headquartered in Las Vegas.", "https://www.ballet.com/about"),
			fact("Co-founded BTCC, formerly BTCChina, and ran it as CEO until its acquisition in January 2018.", "https://www.ballet.com/about"),
			fact("Ran the BTCC Mint line of physical bitcoins from 2016 to 2018 and supervised the private keys of the more than 8,600 BTC loaded into them.", "https://www.ballet.com/about"),
			fact("Posted the three Ballet puzzles on X in July 2020, each a BIP38 key printed on a physical wallet.", "https://x.com/bobbyclee/status/1289004702122643456", { date: "2020-07-31" })
		]
	});
	static puzzles = [
		balletPuzzleAA007448,
		balletPuzzleAA009926,
		balletPuzzleAA012381
	];
	static techniques = [technique("bip38", "https://x.com/bobbyclee/status/1289004702122643456")];
	constructor() {
		super(BalletCollection.key, BalletCollection.author, BalletCollection.puzzles, [], BalletCollection.techniques);
	}
};
const ballet = new BalletCollection();
export { BalletCollection, ballet };
