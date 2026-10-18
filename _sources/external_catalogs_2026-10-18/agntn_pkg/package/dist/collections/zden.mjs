import { PartyKind, assets, claim, compressed, confirmation, decrease, digest, fact, funding, hex, increase, official, party, profile, technique, uncompressed } from "../_chunks/parts.mjs";
import { Status } from "../_chunks/status.mjs";
import { puzzle } from "../_chunks/puzzle.mjs";
import { NamedCollection } from "../_chunks/collection.mjs";
const zdenPuzzleLevel1 = puzzle({
	id: "zden/level-1",
	chain: "bitcoin",
	address: "1cryptommoqPHVNHuxVQG3bzujnRJYB1D",
	sourceUrl: "https://crypto.haluska.sk/",
	startedAt: "2016-06-07 21:05:42",
	status: Status.Solved,
	pubkey: uncompressed("0408fe136fc5f5ab550da96673c050c539ce9877ec69965dde958d080cc4a2b896d6db9afd83e05875a401edcbc0e870c23251cb12b55677dba04a495806fd9fb7"),
	key: hex("46c92e7276ae95778df0d7a248ab736cb6275190ded54438377a2e4b0d42a096").wif("5JMTiDVHj3pj8VfaTe6pDtD9byZr6too3PD3AGBJrXF1hVsitc8"),
	prize: .0260414,
	solvedAt: "2016-06-10 21:20:40",
	solveTime: 260098,
	transactions: [
		funding("9405a925ae4a1a64949ea60a72d1b74ad4e3fcb3c1378fc91c7991cc09a584e7", "2016-06-07 21:05:42", .0260414),
		increase("f3d1387c7fc6f20b197900bdbfdaf4f260b480500029ab9680695832111bc1b9", "2016-06-10 18:23:19", .00195488),
		claim("1d3f290a9f43721c2b235a4f72aeab35a78607abb440f02cce9c62a78f271e2d", "2016-06-10 21:20:40", .02799628)
	],
	assets: assets({
		puzzle: "level-1/puzzle.png",
		solution: "level-1/solver.png",
		sourceUrl: "https://crypto.haluska.sk/crypto1.png",
		digests: [digest("level-1/puzzle.png", "cb11dee33abf6ea84c760e9b2c42066afc30eca5c2031b3c49ab34028f37fec6", 10152, {
			url: "https://crypto.haluska.sk/crypto1.png",
			archive: "https://web.archive.org/web/20220420031347id_/http://crypto.haluska.sk/crypto1.png"
		}), digest("level-1/solver.png", "4390fc4163b5e39ce9207b4a8bddb2c094e425e70c2064c67742c0896ffe0ac5", 33913, {
			url: "https://crypto.haluska.sk/crypto1solver.png",
			archive: "https://web.archive.org/web/20250821093837id_/http://crypto.haluska.sk/crypto1solver.png"
		})]
	})
});
const zdenPuzzleLevel2 = puzzle({
	id: "zden/level-2",
	chain: "bitcoin",
	address: "1cryptoTuax4qeedzVC35eYf4c16v4reJ",
	sourceUrl: "https://crypto.haluska.sk/",
	startedAt: "2016-06-16 22:14:33",
	status: Status.Solved,
	pubkey: uncompressed("040616b3227a76ebd896a916be772a5174cfced52413e4180a7be1ab128fc1acb6f839c4e5c7e9c52815a9daa728ab7f14302e2acb51227dca6a654f18d51f78e8"),
	key: hex("febedbdd99c7a288eafb6ec1b0fdc3e10a09567ff8a3ab30b9fdf69eb492a6dc").wif("5KkUiPnCoG6JteP1fdZLYTGYu7RAPymsWB82hF1xkXRPNBD6FLd"),
	prize: .0260414,
	solvedAt: "2016-06-18 23:28:47",
	solveTime: 177254,
	transactions: [funding("8521d9eceed6657f121d439a4f4b8125850286b4d776eeee5bed10470f537e05", "2016-06-16 22:14:33", .0260414), claim("182975827270745a939511f2b0e30e55f50ce4797cd987d887beb88dea7c9772", "2016-06-18 23:28:47", .0260414)],
	assets: assets({
		puzzle: "level-2/puzzle.png",
		solution: "level-2/solver.png",
		sourceUrl: "https://crypto.haluska.sk/crypto2.png",
		digests: [digest("level-2/puzzle.png", "d43ae2e2c6e50ed9a7ad486ba74a7c9065f7fb22cc1fcec1fc9d65b2469714f5", 120038, {
			url: "https://crypto.haluska.sk/crypto2.png",
			archive: "https://web.archive.org/web/20250929202710id_/https://crypto.haluska.sk/crypto2.png"
		}), digest("level-2/solver.png", "389ee4e8668ca1e1f59333071b3216ddff53b8b1d77a7e3eeb43850a209ced27", 145160, {
			url: "https://crypto.haluska.sk/crypto2solver.png",
			archive: "https://web.archive.org/web/20240928143533id_/https://crypto.haluska.sk/crypto2solver.png"
		})]
	})
});
const zdenPuzzleLevel3 = puzzle({
	id: "zden/level-3",
	chain: "bitcoin",
	address: "1cryptoJzomVVJUSys8Qv1gKPCXFoZy1U",
	sourceUrl: "https://crypto.haluska.sk/",
	startedAt: "2016-06-23 17:10:53",
	status: Status.Solved,
	pubkey: uncompressed("043648d46ea6de8285c56df043a9f438693692c33da0bacb0f3383e65d9983a8bf12be321634a4fdbc5cb58bd76a2c62a7546e3f70d6b28c35d5843527583ad48f"),
	key: hex("6008c37d0aa226dbbe611be64106964bca6cbba7098fe4602a932c590e14b074").wif("5JYaeV69haogQrDcGuW2Pmux8Mm2qtGYr9T2psxiKYfmhDYErQ2"),
	prize: .0260414,
	solvedAt: "2016-06-26 02:02:09",
	solveTime: 204676,
	transactions: [funding("ee4c9fc25759c5fbb1550f46bdbd93116c877a5651a4c50486fbe4c4454e3c6d", "2016-06-23 17:10:53", .0260414), claim("7d3ea8963136ef9a97cf37d42f7eb95aab14d92b0d075369d0cd0329bb51afe4", "2016-06-26 02:02:09", .0260414)],
	assets: assets({
		puzzle: "level-3/puzzle.png",
		solution: "level-3/solver.png",
		sourceUrl: "https://crypto.haluska.sk/crypto3.png",
		digests: [digest("level-3/puzzle.png", "f3752aca93285c3c307e5f34108422f81eb9a8b03df1eeac74b6f9b58f40478d", 12141, {
			url: "https://crypto.haluska.sk/crypto3.png",
			archive: "https://web.archive.org/web/20240929171219id_/https://crypto.haluska.sk/crypto3.png"
		}), digest("level-3/solver.png", "9a5c1457f575c638cd07998ce582a026d8608cb19712983fb9965ea766ad767a", 24826, {
			url: "https://crypto.haluska.sk/crypto3solver.png",
			archive: "https://web.archive.org/web/20250816133449id_/http://crypto.haluska.sk/crypto3solver.png"
		})]
	})
});
const zdenPuzzleLevel4 = puzzle({
	id: "zden/level-4",
	chain: "bitcoin",
	address: "1cryptoRMRnj7Q9fgToxTRvejLnx3QRPq",
	sourceUrl: "https://crypto.haluska.sk/",
	startedAt: "2017-06-07 12:19:28",
	status: Status.Solved,
	pubkey: uncompressed("042348aa53c41b59a87be13846d37160538e6e6addb254116dc40223fcf2925e013d1cbfd764193f9268122c0444038a0c798f540874d6f0b9b182b8ced6dc98eb"),
	prize: .0260414,
	solvedAt: "2017-06-11 22:26:45",
	solveTime: 382037,
	solver: party("mmorsl", {
		key: "mmorsl",
		about: "Steemit user who won Zden's Level 4 and wrote the solution article Zden's catalogue links to.",
		profiles: [profile("steemit", "https://steemit.com/@mmorsl")],
		facts: [fact("Published the solution article on Steemit, which Zden's catalog links as the article by the winner.", "https://steemit.com/bitcoin/@mmorsl/solution-of-the-bitcoin-crypto-puzzle-level-4-by-zden", { date: "2017-06-12" })]
	}),
	transactions: [funding("5388f28ec0c07cdb8a670c45947f803f6484dd46d1060eb47bf9ff10fa06f04e", "2017-06-07 12:19:28", .0260414), claim("67c3341bad6f1087b248b361ba14336d2ffdbd7b2272e24ea9d684d131ec823a", "2017-06-11 22:26:45", .0260414)],
	assets: assets({
		puzzle: "level-4/puzzle.png",
		solution: "level-4/solution.md",
		sourceUrl: "https://crypto.haluska.sk/crypto4.png",
		digests: [digest("level-4/puzzle.png", "763c4ae057800bbab03130cd1a73e0b47cb4afe84bfa2cc57ef446fe339e82cf", 91923, {
			url: "https://crypto.haluska.sk/crypto4.png",
			archive: "https://web.archive.org/web/20181224203405id_/http://crypto.haluska.sk/crypto4.png"
		}), digest("level-4/solution.md", "5cdb68b30249f057ecc71a4858200a6f15580846407daa6422b089cd9676c447", 916)]
	})
});
const SOLUTION = "https://echo.ls/zden-level-5/";
const zdenPuzzleLevel5 = puzzle({
	id: "zden/level-5",
	chain: "bitcoin",
	address: "1cryptoGeCRiTzVgxBQcKFFjSVydN1GW7",
	sourceUrl: "https://crypto.haluska.sk/crypto5fix.png",
	startedAt: "2018-10-20 18:46:57",
	status: Status.Solved,
	pubkey: uncompressed("0488d3d2481ceee8be4372fc4d1ef8451e5b5e1c092728566f5b1bd1a5849ffa870681b60b5e97983e4d027156273b3f81da778005e1104cf3fbc9446e66ccbb9a"),
	key: hex("f4bfad68198549d3e5612fa3b1cabad14679c634359e2f5efdd804ddce8a9f51").wif("5Kg5Mosdn8dbSCsNBVtFHTVMjyfSE8UR2nfLLG8JcjWJNqtBBCG"),
	prize: .0055555,
	solvedAt: "2026-09-22 18:34:35",
	solveTime: 250040858,
	solver: party("echo.ls", {
		key: "echo-ls",
		kind: PartyKind.Person,
		about: "Author of the echo.ls blog, who solved Zden's corrected Level 5 and published the key with the method.",
		profiles: [profile("website", "https://echo.ls/")],
		facts: [
			fact("Published the private key and the method: each rectangle's area after the transform the corner diagram suggests, summed in pairs into the 32 key bytes.", SOLUTION, { date: "2026-09-27" }),
			fact("Wrote that they solved the corrected puzzle on September 22, 2026.", SOLUTION, { date: "2026-09-27" }),
			fact("Wrote that they used GPT-6 Astra for quick prototyping and experimentation.", SOLUTION, { date: "2026-09-27" }),
			fact("Zden's catalog links the write-up as the solution written by the winner.", "https://crypto.haluska.sk/")
		]
	}),
	transactions: [
		funding("3dde5372e50d314df6e0f46477b99e34a20fbe38721fa9519a2cdf6c51518c38", "2018-10-20 18:46:57", .00260414),
		increase("2a3e02a4a07e87f3e216a7d25d12f60222625a81c10882e27c9c3ea238a27df4", "2018-11-08 17:20:10", 88248e-8),
		increase("9b4c2a2aac20af67acf349d7b55ff94ccccdcbf9681f730da185fe1da564f884", "2021-02-14 04:14:05", 1338e-8),
		increase("33d0b16e4f4c9e9e0e0d6fe450d108a90629f199e14835bb94d4376388a944a1", "2021-12-03 08:55:29", .0020555),
		claim("e2544433184d0fe4157ca10a8e1ce753bb52a7b0bbcf833740d7448ed25e8e8e", "2026-09-22 18:34:35", .00551745)
	],
	assets: assets({
		puzzle: "level-5/puzzle.png",
		sourceUrl: "https://crypto.haluska.sk/crypto5fix.png",
		digests: [digest("level-5/puzzle.png", "5a62843597f0fd545e19a343b750c6cdfa8010ba2cb5b52d4ad29c7016e57cc6", 6798, {
			url: "https://crypto.haluska.sk/crypto5fix.png",
			archive: "https://web.archive.org/web/20240729023037id_/https://crypto.haluska.sk/crypto5fix.png"
		})]
	}),
	hints: [
		official("Sum of two consecutive following rectangles areas creates one byte of the private key. Apply more operations to obtain the results in byte range.", "https://twitter.com/Zd3N/status/1077146640090316800", confirmation("https://web.archive.org/web/20220129183939/https://twitter.com/Zd3N/status/1077146640090316800", "Wayback capture of the tweet, the BTCrypto L5 part of a hints bundle"), { date: "2018-12-24 10:19:06" }),
		official("The new corrected version including new hints! UNSOLVED for over 3 years because the original release was uncomplete! Relaunched on 12th of December 2021. My excuses to everyone!", "https://crypto.haluska.sk/", confirmation("https://web.archive.org/web/20220124172559/https://crypto.haluska.sk/", "Wayback capture of the puzzle page")),
		official("(clarity edit: sum of two ~~consecutive~~ following rectangles...)", "https://crypto.haluska.sk/", confirmation("https://web.archive.org/web/20220124172559/https://crypto.haluska.sk/", "Wayback capture of the puzzle page, which strikes consecutive out of the 2018 hint"))
	]
});
const zdenPuzzleLevelHalv = puzzle({
	id: "zden/level-halv",
	chain: "bitcoin",
	address: "1crypto24HCr178iMcKd5iUi5D4rsg1nK",
	sourceUrl: "https://crypto.haluska.sk/cryptoHALV.png",
	startedAt: "2024-04-18 10:59:41",
	prize: .003125,
	transactions: [funding("30946152b5f24ed975a26b28a46cb19d1ef2728159c5806544ffd0c2fb535205", "2024-04-18 10:59:41", .003125)],
	assets: assets({
		puzzle: "level-halv/puzzle.png",
		sourceUrl: "https://crypto.haluska.sk/cryptoHALV.png",
		digests: [digest("level-halv/puzzle.png", "3a487ebaeb4801137f09159a2d533046936cd395f4e2f7d115ac554607790e95", 61566, {
			url: "https://crypto.haluska.sk/cryptoHALV.png",
			archive: "https://web.archive.org/web/20250907231738id_/https://crypto.haluska.sk/cryptoHALV.png"
		})]
	}),
	hints: [official("Level HALV - my new crypto puzzle to celebrate the fourth Bitcoin Halving. This level is way easier than LVL 5. It shouldn't take long until it's solved.", "https://crypto.haluska.sk/", confirmation("https://web.archive.org/web/20240519071031/https://crypto.haluska.sk/", "Wayback capture of the puzzle page"))]
});
const zdenPuzzleLevelSfx = puzzle({
	id: "zden/level-sfx",
	chain: "bitcoin",
	address: "1crypto92aYKxdzD6VSAKwpEJnXcA2s9t",
	sourceUrl: "https://crypto.haluska.sk/cryptoSFX.png",
	startedAt: "2021-02-07 23:57:58",
	status: Status.Solved,
	pubkey: uncompressed("04f3522614fabf280019a1c7005523808d4f08afa8084c483fe4e02b92a7ae587c264138073c19f1106b7670a23c4f4bb7e08b3cc75254f45b7cdbb958cf97abc3"),
	prize: .00140426,
	solvedAt: "2021-02-21 22:49:26",
	solveTime: 1205488,
	transactions: [
		funding("570c201d362534d8a21908bee29cd385d618805819401b1084b76f37ce5ceb4e", "2021-02-07 23:57:58", .00140426),
		increase("9b4c2a2aac20af67acf349d7b55ff94ccccdcbf9681f730da185fe1da564f884", "2021-02-14 04:14:05", 4574e-8),
		increase("75abad484d2cb32ad37bdc321e100f8d21111cb1f6e11729279c3689e47ea274", "2021-02-15 08:47:12", .001337),
		claim("cf34cd09943b49bbcd2d5c58c09b43ed054c911f2d526db3a59c015d9f6d8360", "2021-02-21 22:49:26", .00274126)
	],
	assets: assets({
		puzzle: "level-sfx/puzzle.png",
		solution: "level-sfx/solver.png",
		sourceUrl: "https://crypto.haluska.sk/cryptoSFX.png",
		digests: [digest("level-sfx/puzzle.png", "a0494fc9794b6ad8e9d1f76c043f4b1f21720f8399704d8ac0dff1750a403595", 108822, { url: "https://crypto.haluska.sk/cryptoSFX.png" }), digest("level-sfx/solver.png", "fb4f9da4254f286250fc83feea84e79cae3f24ad98a710282c11b1006723da3a", 469281, {
			url: "https://crypto.haluska.sk/cryptoSFX_solver.png",
			archive: "https://web.archive.org/web/20250929202710id_/https://crypto.haluska.sk/cryptoSFX_solver.png"
		})]
	})
});
const zdenPuzzleLevelXm17 = puzzle({
	id: "zden/level-xm17",
	chain: "bitcoin",
	address: "1cryptozWJAE7UzDZF1eSgsT7mVjUsu7g",
	sourceUrl: "https://crypto.haluska.sk/cryptoxm17.gif",
	startedAt: "2017-12-24 18:10:13",
	status: Status.Solved,
	pubkey: uncompressed("04a7daaeb780428349a532386cbe4570c2765265099a5cabb6614abbbc16e0eed968f012d4e999a2726ec101402af57d4d99813d86ca6a1de7bf15ec6ff740ab6e"),
	key: hex("f85204261fa2cef0febb7eefc1bf64105e51351039ed4dd26ee6f427cc403e98").wif("5KhebJWTSHq8wpSKKMhxroKuwrCA8UMS4WKSLpTcH4gDGJz1jqo"),
	prize: .0260414,
	solvedAt: "2017-12-26 19:28:42",
	solveTime: 177509,
	transactions: [funding("b640f0671cb59f47a197584d7a9cf67bdd2f7e6227a74bd4bdae89067e1b34a2", "2017-12-24 18:10:13", .0260414), claim("2706880fbfe65638c1ce6229538a1c51f6d7c693d7405fd586d69752535b4302", "2017-12-26 19:28:42", .0260414)],
	assets: assets({
		puzzle: "level-xm17/puzzle.gif",
		solution: "level-xm17/solver.png",
		sourceUrl: "https://crypto.haluska.sk/cryptoxm17.gif",
		digests: [digest("level-xm17/puzzle.gif", "bd7804bf2b52ddd551a62f85ac9ac9a8de5153a67bb733d88526935c8cdd0bf6", 5977387, {
			url: "https://crypto.haluska.sk/cryptoxm17.gif",
			archive: "https://web.archive.org/web/20201109001744id_/http://crypto.haluska.sk/cryptoxm17.gif"
		}), digest("level-xm17/solver.png", "7532efab1506bd686135b96e0546cd3d1229702c55cc3b2e74c54773c24a9d0d", 72267, {
			url: "https://crypto.haluska.sk/cryptoxm17solver.png",
			archive: "https://web.archive.org/web/20250818085420id_/http://crypto.haluska.sk/cryptoxm17solver.png"
		})]
	})
});
const zdenPuzzle1bitcoinWhitePaper = puzzle({
	id: "zden/1bitcoin-white-paper",
	chain: "bitcoin",
	address: "1BiTCoiNsuFnkCFGkv6AGgwWxN31GUwY6W",
	sourceUrl: "https://ipfs.io/ipfs/Qmdm7SxhVGDVt9krbNpwAxkQGwH5a74FVW1sKNXxCjzmBq",
	startedAt: "2021-04-11 01:46:31",
	status: Status.Solved,
	pubkey: uncompressed("04bb16b0a88389b89e0b900f1509589fa7f03e18a4482967b87421c3ab5b6d44d2be549abdb95861b64430b3d6b4ee389d0bf7e5ad554442c5bd12ed1651cf4540"),
	key: hex("261f71e7602c5b7802b5ec9b28c1a0a96283a4d3d345d56a95861b469dfec298").wif("5J75Nt7nGQfMWBsoQF74hou2yFc7mK2tHrEA1q3wn3Ls82sHhzA"),
	prize: .00117578,
	solvedAt: "2021-05-19 18:42:33",
	solveTime: 3344162,
	transactions: [
		funding("063a1913256940e72237419cada939694f4f361d6a1bd2461c5b8387d1b77cb3", "2021-04-11 01:46:31", .00117578),
		decrease("252f49ac38fd858d74baea65e98e44b882d98e794e91426dcc91e62f80d33b56", "2021-05-15 05:35:18", 777e-8),
		increase("40138a9fbdbd160df3538efc6a574b7dfc1a98426c3e6046cda0a5892bf17cf6", "2021-05-15 23:54:05", .00661489),
		claim("40b500597aa1d6904db01d36945871a55c5b3a400c4218992d3fbe901cd414b3", "2021-05-19 18:42:33", .00732196)
	],
	assets: assets({
		puzzle: "1bitcoin-white-paper/puzzle.png",
		sourceUrl: "https://ipfs.io/ipfs/Qmdm7SxhVGDVt9krbNpwAxkQGwH5a74FVW1sKNXxCjzmBq",
		digests: [digest("1bitcoin-white-paper/puzzle.png", "5d3a6d707b653c0e95c9d192b6f5cf55ea54ae84ad6608fe0607a4e27896175e", 5994872, {
			url: "https://ipfs.io/ipfs/Qmdm7SxhVGDVt9krbNpwAxkQGwH5a74FVW1sKNXxCjzmBq",
			archive: "https://web.archive.org/web/20210520071838id_/https://ipfs.io/ipfs/Qmdm7SxhVGDVt9krbNpwAxkQGwH5a74FVW1sKNXxCjzmBq"
		})]
	}),
	hints: [official("Artwork is also notarized on the Bitcoin blockchain by a transaction of 777 Satoshis from the puzzle's address. The SHA-256 fingerprint from this image creates the private key of the notarization wallet.", "https://crypto.haluska.sk/", confirmation("https://web.archive.org/web/20210729030148/https://crypto.haluska.sk/", "Wayback capture of the puzzle page"))]
});
const zdenPuzzleDemobit2018 = puzzle({
	id: "zden/demobit-2018",
	chain: "bitcoin",
	address: "1cryptotnptVK1ZbpZFyEqcR5EVp5hjfk",
	sourceUrl: "https://crypto.haluska.sk/crypto_db18.png",
	startedAt: "2018-01-23 14:51:43",
	status: Status.Solved,
	pubkey: uncompressed("04fc4f71ab4554b2ea1203b1cf6d0cfaf179213d7fa028be7dda5c183807792b15c5c0146f10be96bebf2fc1fb41637bd0b16d2d534e14b649da6ab7420e143b74"),
	prize: .01500245,
	solvedAt: "2018-03-25 16:56:41",
	solveTime: 5277898,
	transactions: [
		funding("5ca022fa2425eeb32f0ea7eb78e20501ea7907dae62e8467cd9a24a41e45c6bc", "2018-01-23 14:51:43", .03499755),
		increase("66271b073584588d92cd12fdb2b86f52f603daf64670e1cd6aa94e91e32e467e", "2018-03-22 10:54:29", .01500245),
		claim("4f2c8aca892e54810a3febfb39d48ce610aca1bc23b6611e46292566b84b202a", "2018-03-25 16:56:41", .05)
	],
	assets: assets({
		puzzle: "demobit-2018/puzzle.png",
		sourceUrl: "https://crypto.haluska.sk/crypto_db18.png",
		digests: [digest("demobit-2018/puzzle.png", "354f91405317761ac185bb41d9e734e3de433986758c58fb45a4c4594596b0ae", 81511, {
			url: "https://crypto.haluska.sk/crypto_db18.png",
			archive: "https://web.archive.org/web/20201109013648id_/http://crypto.haluska.sk/crypto_db18.png"
		})]
	}),
	hints: [official("Hint #1 for the unsolved Demobit puzzle is the hash of inner data block with lines overlap. It is not the hash of the private key! SHA-256: 1c10494cf872ac2b896f52b2c93f58c23049f5be9455fef3ed4f9d9bf84fe600", "https://twitter.com/Zd3N/status/966275899757879298", confirmation("https://web.archive.org/web/20180316114954/http://crypto.haluska.sk/", "Wayback capture of the puzzle page, which links Hint #1 to this tweet"), { date: "2018-02-21 11:38:21" })]
});
const zdenPuzzleNethemba = puzzle({
	id: "zden/nethemba",
	chain: "bitcoin",
	address: "1cryptoP5yMdKcz1bjzUqnbs3LsasVRX6",
	sourceUrl: "https://crypto.haluska.sk/crypto_nethemba.png",
	startedAt: "2016-08-06 12:05:26",
	status: Status.Solved,
	pubkey: uncompressed("0448ececabf97b8b0b17c96d6908ee913192855f05040764776b2ba33de2c354d3149b187b8ff65f6b429ce363296766d61ef0c16261ad0bc1e40679c6b8571d2c"),
	prize: .192018,
	solvedAt: "2016-08-11 17:30:46",
	solveTime: 451520,
	transactions: [funding("72670ce7a71e6a0cf456dcdc7734df6064283ffdd548c574b2a80254c3c9406c", "2016-08-06 12:05:26", .192018), claim("be452ac0b3ed8b4e81bfad38831a89ccdb54a18f7d21b002e0d4c0537bc9541b", "2016-08-11 17:30:46", .192018)],
	assets: assets({
		puzzle: "nethemba/puzzle.png",
		solution: "nethemba/solver.png",
		sourceUrl: "https://crypto.haluska.sk/crypto_nethemba.png",
		digests: [digest("nethemba/puzzle.png", "0fd1519302bb2028d5f486ff027b1a5b2c58edc2cb75b1d39f131012df206c7c", 226786, {
			url: "https://crypto.haluska.sk/crypto_nethemba.png",
			archive: "https://web.archive.org/web/20250929202710id_/https://crypto.haluska.sk/crypto_nethemba.png"
		}), digest("nethemba/solver.png", "81d7977df3f4f3200b9bb970ed7c64f464f7c8b0a8f7baba105cc4aaa8155854", 502693, {
			url: "https://crypto.haluska.sk/crypto_nethemba_solver.png",
			archive: "https://web.archive.org/web/20250929202710id_/https://crypto.haluska.sk/crypto_nethemba_solver.png"
		})]
	})
});
const zdenPuzzleXixoio = puzzle({
	id: "zden/xixoio",
	chain: "ethereum",
	address: "0x5d663791e869ca70c71e0a5f4cfd707f596265aa",
	sourceUrl: "https://crypto.haluska.sk/xixoio_puzzle.png",
	startedAt: "2018-10-24 20:00:18",
	status: Status.Solved,
	pubkey: uncompressed("04da1a5098d80ce66b4c9fd974b9d9164d57caf1263d834c961c89b117a412ece1703a3bb1d606d03c1c4ff9225b556c291c2c6fbd67968f451f472a827dc9e781"),
	prize: 6,
	solvedAt: "2019-11-05 17:08:08",
	solveTime: 32562470,
	transactions: [funding("0xb9658922bcc5b3d35dc4b054c40607090c755dd86d8891e6351a25c43cc653ac", "2018-10-24 20:00:18", 6), claim("0xac638a7ac6388b7af2178a52f0463a6dda8761292d261fa415c6446c8d4539f0", "2019-11-05 17:08:08", 5.997858)],
	assets: assets({
		puzzle: "xixoio/puzzle.png",
		solution: "xixoio/solver.png",
		sourceUrl: "https://crypto.haluska.sk/xixoio_puzzle.png",
		digests: [digest("xixoio/puzzle.png", "2c06602dffe6398ea1fc46609c16c493e4f3b08f4f2a28a3f7fc620f4836bfc8", 40624, {
			url: "https://crypto.haluska.sk/xixoio_puzzle.png",
			archive: "https://web.archive.org/web/20250929202710id_/https://crypto.haluska.sk/xixoio_puzzle.png"
		}), digest("xixoio/solver.png", "8500c68bfec5fb9dd3078104405a30d645c46c90a71d09e0827fcca99af6b099", 241224, {
			url: "https://crypto.haluska.sk/xixoio_puzzle-solver.png",
			archive: "https://web.archive.org/web/20250929202710id_/https://crypto.haluska.sk/xixoio_puzzle-solver.png"
		})]
	}),
	hints: [official("Byte 0x77 is part of the private key.", "https://twitter.com/Zd3N/status/1077146640090316800", confirmation("https://web.archive.org/web/20220129183939/https://twitter.com/Zd3N/status/1077146640090316800", "Wayback capture of the tweet, the XIXOIO part of a hints bundle"), { date: "2018-12-24 10:19:06" })]
});
const zdenPuzzleCodexProtocol = puzzle({
	id: "zden/codex-protocol",
	chain: "ethereum",
	address: "0x6b2560b34c7469c561a8fce581c88bfb8cce73b2",
	sourceUrl: "https://crypto.haluska.sk/CodexPuzzle.png",
	startedAt: "2018-04-16 22:39:45",
	status: Status.Solved,
	pubkey: uncompressed("04b2bb29c9cf6a1c7a048e02cecdd7bec9f4fb3d19e0a9b5c7d7785fb6b17a4d8b11ec437d972a8922838b3af1854f375278ee94758e5c8a4d699072bdd7581301"),
	key: hex("5a9674dbee5a9674dbee5a9674dbee5a9674dbee5a9674dbee5a9674dbfcf3ec"),
	prize: 3.1337,
	solvedAt: "2018-06-13 13:02:18",
	solveTime: 4976553,
	transactions: [funding("0xe09300e94625ec03a8680d6270200196a12c63327fc7cad03508542090283374", "2018-04-16 22:39:45", 3.1337), claim("0xeb9f6a7d1cb226c84344b38f9eb5bd26586b58c0080262d80fdcb501c0b51a7b", "2018-06-13 13:02:18", 3.132839)],
	assets: assets({
		puzzle: "codex-protocol/puzzle.png",
		solution: "codex-protocol/solution.md",
		hints: ["codex-protocol/hint-1.png", "codex-protocol/hint-2.png"],
		sourceUrl: "https://crypto.haluska.sk/CodexPuzzle.png",
		digests: [
			digest("codex-protocol/puzzle.png", "a3edc48e1abbcef2158f2c4b94d8157f3df93886167994d60278660cd3543f64", 20434999, { url: "https://crypto.haluska.sk/CodexPuzzle.png" }),
			digest("codex-protocol/hint-1.png", "adae828a669377f415fe2b440047ef1bba81161d2ceec7431f0d6dda1707496c", 20491068, {
				url: "https://crypto.haluska.sk/CodexPuzzle-hint.png",
				archive: "https://web.archive.org/web/20250929202710id_/https://crypto.haluska.sk/CodexPuzzle-hint.png"
			}),
			digest("codex-protocol/hint-2.png", "b369586f13687dbc54e02c9da152df71fe22d8dcb25601947a7cb01dde1997be", 1053536, {
				url: "https://crypto.haluska.sk/CodexPuzzle-hint2.png",
				archive: "https://web.archive.org/web/20250929202710id_/https://crypto.haluska.sk/CodexPuzzle-hint2.png"
			}),
			digest("codex-protocol/solution.md", "f0a33c6e59006c6706b7133f507646b327fa7ee01f0acf3fc4ce478778dba08e", 722)
		]
	})
});
const zdenPuzzleLitecoinSegwit = puzzle({
	id: "zden/litecoin-segwit",
	chain: "litecoin",
	address: "LartGjF6UjmvmF1JXBhFf5wtM9uZX7LzeS",
	sourceUrl: "https://crypto.haluska.sk/LitecoinSegWit.png",
	startedAt: "2017-05-10 05:46:11",
	status: Status.Solved,
	pubkey: compressed("03bc34c725e24d6159f3e2d3c01d455cf5fd48b83a7ca5eb4c7155044ec728ff11"),
	prize: 230.8255,
	solvedAt: "2017-05-24 01:38:16",
	solveTime: 1194725,
	transactions: [
		funding("bc640bc1ab3756bf5163918e5ee4c7496fcdb2e17617515d17e1f134dabbd318", "2017-05-10 05:46:11", 100),
		funding("593b72fc6cbe178c239fc6ce4f156c3063eff00e02c023acba4c09ea6be59cc9", "2017-05-10 05:54:31", 10),
		funding("abb7074c2758e41e9a28ebdd096baae0c25c9453fbddb93d29edaf1ff2541c19", "2017-05-10 16:58:49", 100),
		funding("e260a3f11de536f9bb618e16b00f584e59b8695fa4bed4bdb6eded739375bcb5", "2017-05-10 17:36:16", 1.337),
		funding("9c9ee2b1ca0fb8517ab6328f2bd3016e717b36264afdc84f1cf22afecb270943", "2017-05-11 10:36:26", 18.4985),
		funding("17ee706bed97ffe9ac3762aa4d93b6d20bda3b04e334e6c1165a17bc2972a327", "2017-05-13 05:56:37", .99),
		claim("fb5260a9225cdbe0733874ac51e9391acbdec3a8e031fd9851e84d55ac57034c", "2017-05-24 01:38:16", 230.8255)
	],
	assets: assets({
		puzzle: "litecoin-segwit/puzzle.png",
		hints: [
			"litecoin-segwit/hint-1.svg",
			"litecoin-segwit/hint-2.svg",
			"litecoin-segwit/hint-3.svg"
		],
		sourceUrl: "https://crypto.haluska.sk/LitecoinSegWit.png",
		digests: [
			digest("litecoin-segwit/puzzle.png", "ecda441c0bd620949561e0059e258c3d0aec7a2bc6175cd7d3f44e17eb280328", 1921458, { url: "https://crypto.haluska.sk/LitecoinSegWit.png" }),
			digest("litecoin-segwit/hint-1.svg", "01c7dc6c2f6e8e579ba877f3824c2df93dcbc6eabdd8043267c005f925a01ae6", 44982, {
				url: "https://crypto.haluska.sk/LitecoinSegWit_hint1.svg",
				archive: "https://web.archive.org/web/20170517135445id_/http://crypto.haluska.sk:80/LitecoinSegWit_hint1.svg"
			}),
			digest("litecoin-segwit/hint-2.svg", "2a880103f5e600501a92b53b3b0f6c39ca9128239889283bf614c4127913f79c", 44982, {
				url: "https://crypto.haluska.sk/LitecoinSegWit_hint2.svg",
				archive: "https://web.archive.org/web/20170530045506id_/http://crypto.haluska.sk/LitecoinSegWit_hint2.svg"
			}),
			digest("litecoin-segwit/hint-3.svg", "0f2715576f1bd9b4f24679c6cf3807a99ddedfda43ec9d9228012103cf0539e9", 72803, {
				url: "https://crypto.haluska.sk/LitecoinSegWit_hint3.svg",
				archive: "https://web.archive.org/web/20170530045509id_/http://crypto.haluska.sk/LitecoinSegWit_hint3.svg"
			})
		]
	})
});
const zdenPuzzleDecredJanus = puzzle({
	id: "zden/decred-janus",
	chain: "decred",
	address: "DsRaAja82UvgnqYaBHYFuyCKURFX2rCyEJ8",
	sourceUrl: "https://crypto.haluska.sk/decred_tree.svg",
	startedAt: "2017-03-07 04:20:56",
	status: Status.Solved,
	pubkey: compressed("02278753666ec31c29b755a39421017bd80744d728204da0f7ff452846112b618b"),
	prize: 460,
	solvedAt: "2017-03-18 13:51:29",
	solveTime: 984633,
	transactions: [
		funding("900ed10e661c642f30ec39e09574fcccbb72f4b2ae0733994ffdc945ed4105f2", "2017-03-07 04:20:56", 100),
		increase("47c3529f1bf28c40e7eb01de47a42b398071a4299dffb5f658b3d5366cba60c2", "2017-03-07 04:31:20", 100),
		increase("f968a3d99702553bb5cd4243201359abf83e47a88bae318fce4fbd32ed986581", "2017-03-07 04:48:32", 100),
		increase("2a06e23488d2f62ad117956f9d380dea3ef1402d4708ab11391668d0d1efe90e", "2017-03-07 20:38:42", 150),
		increase("327a674df974e0a2cb0fc98489e513a34187f1bb1c35811cd5de7e89c58a4b13", "2017-03-07 20:55:54", 5),
		increase("77f5c42e7bc1627bcc22099dc4a0d7a11d3e97144a9f87f62c324d272a7b4719", "2017-03-07 21:00:08", 5),
		claim("2af40f17e32a42c18cdfa7ccb552da9201c50ef60db7c60e1ae87f19a74f5467", "2017-03-18 13:51:29", 460)
	],
	assets: assets({
		puzzle: "decred-janus/puzzle.svg",
		hints: ["decred-janus/hint.svg"],
		sourceUrl: "https://crypto.haluska.sk/decred_tree.svg",
		digests: [digest("decred-janus/puzzle.svg", "f0252c5c79ed108139244978ec1c91bb06dd7efa2e95fc8336990ec716dcfee9", 22817, {
			url: "https://crypto.haluska.sk/decred_tree.svg",
			archive: "https://web.archive.org/web/20170515091103id_/http://crypto.haluska.sk:80/decred_tree.svg"
		}), digest("decred-janus/hint.svg", "3f518b69e8c447565a8560edb87855d0a186ecc5f99b8c5811f366e51c81efc1", 22761, {
			url: "https://crypto.haluska.sk/decred_tree_hint.svg",
			archive: "https://web.archive.org/web/20181219152809id_/http://crypto.haluska.sk/decred_tree_hint.svg"
		})]
	}),
	hints: [official("33*bbb", "https://crypto.haluska.sk/decred_tree_hint.svg", confirmation("https://web.archive.org/web/20181219152809/http://crypto.haluska.sk/decred_tree_hint.svg", "Wayback capture of the hint SVG"))]
});
const zdenPuzzleDecredAutonomy = puzzle({
	id: "zden/decred-autonomy",
	chain: "decred",
	address: "DseEpHK49hHrTJhxwop3B86K1dryv4CYz8N",
	sourceUrl: "https://web.archive.org/web/20170430210807/https://decred.org/autonomy_puzzle/",
	startedAt: "2017-04-25",
	status: Status.Solved,
	pubkey: compressed("02daa17dcb78cd7befd6986e3af1cc49acdd924f557990680c0b7ffe05ae03e960"),
	prize: 355.85470498,
	solvedAt: "2017-04-29 23:08:26",
	transactions: [
		funding("9b23f474436acaa04c9564b52b5f25e9827ae0aebb3987940b7a3d09d256a530", "2017-04-06 04:35:18", 500),
		decrease("5120bdacb3bc40fdcb973e83f8f668cacbc023c98d2bb0d3488c37d7328972a7", "2017-04-11 18:06:54", 499.9978),
		increase("f47ed5fd145f13ab1c854ec1e40e562e2a1d84f8b8f7fc567bdd6460f08d192b", "2017-04-20 13:15:02", 502.86217698),
		decrease("4e09053c57c2ff223a32c0519a2d3eef09c453bb71de5b4208deed3c508a0456", "2017-04-25 15:04:44", 502.85997698),
		increase("e969b6cdeba0daae02b3c8a19e97fe5f3caf54c6ea32d6b1e1f9f57beb46b503", "2017-04-25 15:28:27", 502.85777698),
		increase("aeae3668012def4a28685a17f41994d6e2ed6ec945b212e7fed4f197e6db9846", "2017-04-25 17:15:57", 3),
		decrease("29ad35305d855ffbdf33db1289503f96ee13e77ff30cc1a081f8c368485b6420", "2017-04-26 17:00:53", 100),
		decrease("c36bff544080b6bb277cc7cf83ae52d01d354be08732c61170d5f8979518023d", "2017-04-27 17:01:06", 50),
		decrease("47ad4bdc2b1fd0c04b310458e16f421b138156604ba4e6270909b89afed30483", "2017-04-28 17:05:15", 25),
		increase("8e524803da794906fa597a1300c79dac2342ffddbbcd6a820d730bebb298e5af", "2017-04-29 17:14:03", 25),
		claim("26315309817926ba860b0b50bd334cadd314b0fd495862bafa85e7597a8d77e2", "2017-04-29 23:08:26", 355),
		claim("345c8e45365a358e74e743d446404164317ce0d236fdda98bf5c8fd8b4e50cab", "2017-04-29 23:08:26", .85389698)
	],
	solver: party("BlockCrushr Labs", {
		key: "blockcrushr-labs",
		kind: PartyKind.Organization,
		about: "Blockchain development lab whose Medium publication carries the Autonomy walk-through.",
		profiles: [profile("solution", "https://medium.com/blockcrushr-labs/solving-decreds-autonomy-puzzle-aedac18f18f3"), profile("medium", "https://medium.com/blockcrushr-labs")],
		facts: [fact("Scott Burke wrote the walk-through for the publication: gears measured in pixels, a Gandhi quote as the Vigenère key, a 33-word seed.", "https://medium.com/blockcrushr-labs/solving-decreds-autonomy-puzzle-aedac18f18f3", { date: "2017-05-08" })]
	}),
	assets: assets({
		puzzle: "decred-autonomy/puzzle.jpg",
		sourceUrl: "https://crypto.haluska.sk/gate_full.jpg",
		digests: [digest("decred-autonomy/puzzle.jpg", "71a594766a6dfd8f11159ccc1555bedc675632af22ec3d9878c85e4eca606dc8", 8489474, {
			url: "https://crypto.haluska.sk/gate_full.jpg",
			archive: "https://web.archive.org/web/20250929202710id_/https://crypto.haluska.sk/gate_full.jpg"
		})]
	})
});
var ZdenCollection = class ZdenCollection extends NamedCollection {
	static key = "zden";
	static author = party("Zden", {
		key: "zden",
		kind: PartyKind.Person,
		aliases: ["Zden Hlinka", "zd3n"],
		about: "Slovak digital artist and demoscener from the Satori group who hides private keys in generative images.",
		addresses: ["1ZDEN78bAWtHqeRBJX7CT4QFEBA37r2N7", "1BTC4ARTieV3qDbxZK51it8KJ5mGQBYpXD"],
		profiles: [
			profile("website", "https://crypto.haluska.sk/"),
			profile("website", "https://zd3n.com/"),
			profile("twitter", "https://twitter.com/zd3n"),
			profile("steemit", "https://steemit.com/@zden")
		],
		facts: [
			fact("zd3n.com introduces him as codært, visual engineering, digital alchemy, Satori / SK, experimental coder, live visuals performer, digital painter, demoscener.", "https://zd3n.com/"),
			fact("Signed the Codex Protocol puzzle write-up on Steemit as Zden Hlinka of Satori, s.r.o.", "https://steemit.com/cryptopuzzle/@zden/codex-puzzle-1-codexokryphodron", { date: "2018-06-20" }),
			fact("The catalog runs from Level 1 in June 2016 to Level HALV for the fourth halving in April 2024, with a support address for the free art.", "https://crypto.haluska.sk/"),
			fact("Made the Autonomy and Janus puzzles for decred.org and the XIXOIO puzzle for xixoio.com. Both sites are gone and the catalog keeps the carriers.", "https://crypto.haluska.sk/")
		]
	});
	static puzzles = [
		zdenPuzzleLevel1,
		zdenPuzzleLevel2,
		zdenPuzzleLevel3,
		zdenPuzzleLevel4,
		zdenPuzzleLevel5,
		zdenPuzzleLevelHalv,
		zdenPuzzleLevelSfx,
		zdenPuzzleLevelXm17,
		zdenPuzzle1bitcoinWhitePaper,
		zdenPuzzleDemobit2018,
		zdenPuzzleNethemba,
		zdenPuzzleXixoio,
		zdenPuzzleCodexProtocol,
		zdenPuzzleLitecoinSegwit,
		zdenPuzzleDecredJanus,
		zdenPuzzleDecredAutonomy
	];
	static techniques = [technique("steganography", "https://crypto.haluska.sk/")];
	constructor() {
		super(ZdenCollection.key, ZdenCollection.author, ZdenCollection.puzzles, [], ZdenCollection.techniques);
	}
};
const zden = new ZdenCollection();
export { ZdenCollection, zden };
