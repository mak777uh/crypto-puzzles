import { PartyKind, claim, confirmation, fact, funding, hex, official, party, profile, technique, uncompressed } from "../_chunks/parts.mjs";
import { Status } from "../_chunks/status.mjs";
import { puzzle } from "../_chunks/puzzle.mjs";
import { NamedCollection } from "../_chunks/collection.mjs";
const warpPuzzleChallenge1 = puzzle({
	id: "warp/challenge-1",
	chain: "bitcoin",
	address: "1JKb1617p68H5MPkoNaMtaJCqKDU3h8qSn",
	sourceUrl: "https://keybase.io/warp",
	startedAt: "2013-11-19 20:12:25",
	status: Status.Solved,
	pubkey: uncompressed("045f751d820a69524eb71d48ddc6a231ba019b1461f58b0266cbbec617f9e80c6e573582b37014ce7ba7eaf9031265c5f022d8cb286f2194344f207eaa44bb51af"),
	key: hex("20f5df9cba8251e90a66d3aa1ca2849b12eaca135abb837671ac4a2bc2014e2b").wif("5J4oWdwA5mSCP4GVWF237zgYK4h1csD2PfrmK3uh3YcRFSWZ2H1").passphrase("Je"),
	prize: .1,
	solvedAt: "2013-11-20 03:52:13",
	solveTime: 27588,
	transactions: [funding("66e4f6fdf399ce95804347fc4bdbd9e35de7d4044e2cfcb3b51d44db9522f00b", "2013-11-19 20:12:25", .1), claim("1384234046c03e8dfcb868aa68b82df29078dcdda01e243fe006e4e0793b8cd8", "2013-11-20 03:52:13", .1)],
	hints: [official("this passphrase is 2 random alphanumeric characters, such as 'X9'.", "https://keybase.io/warp", confirmation("https://web.archive.org/web/20131213023906/https://keybase.io/warp/warp_1.0.6_SHA256_e68d4587b0e2ec34a7b554fbd1ed2d0fedfaeacf3e47fbb6c5403e252348cbfc.html", "Wayback capture of the challenge page"))]
});
const warpPuzzleChallenge2 = puzzle({
	id: "warp/challenge-2",
	chain: "bitcoin",
	address: "1NMjXhB2DW8pbGvd64o9DiqwCF8BTAkJKu",
	sourceUrl: "https://keybase.io/warp",
	startedAt: "2013-11-19 20:12:25",
	status: Status.Solved,
	pubkey: uncompressed("040ccffff6759ce8bbf62061fa5f57758fc8cca98719de8dfc43da1103ee9b25632323b540ab4692d17db0839865b19ae194b2a553e28442035483925b8c710c1a"),
	key: hex("3a302179184a58ab6267a80fc9b30dba6ead1bf42ec84d8477f21f12f6640570").wif("5JFuv6B2NakNBAdH4aUAsbrNipwA4jZCHfZdXpHdjEpm5YPRNAT").passphrase("hvW"),
	prize: .25,
	solvedAt: "2013-11-20 04:40:30",
	solveTime: 30485,
	transactions: [funding("e2a23dc3a745a853caf6be317b75912b6f85a618a25602de67708e12894babdf", "2013-11-19 20:12:25", .25), claim("60c1b66664cb4ba5135acaa34e38bb1cff077355d9aefe2ab5e7e2af8b7df328", "2013-11-20 04:40:30", .25)],
	hints: [official("this passphrase is 3 random alphanumeric characters, such as 'Xa2'.", "https://keybase.io/warp", confirmation("https://web.archive.org/web/20131213023906/https://keybase.io/warp/warp_1.0.6_SHA256_e68d4587b0e2ec34a7b554fbd1ed2d0fedfaeacf3e47fbb6c5403e252348cbfc.html", "Wayback capture of the challenge page"))]
});
const warpPuzzleChallenge3 = puzzle({
	id: "warp/challenge-3",
	chain: "bitcoin",
	address: "1FpxSs3tsvV8knTgRv2885bE1GyPq1QrvH",
	sourceUrl: "https://keybase.io/warp",
	startedAt: "2013-11-19 20:12:25",
	status: Status.Solved,
	pubkey: uncompressed("04cdf27fe2598b7df25c002f268a7984642b206a54a077e04d8ff8032b0aa2e8b2a8dae0a9f2011f214d9eb57f0c7977fa378bd5ddcb21c90f5311549b5418b199"),
	key: hex("71a1cd20b19496fedbf6ea6184e604f25f4875c8107243793fc630dad177dcb5").wif("5JgLACMfjpYt7ccG5SqJ5DMtrR8Zibe82PqQtEKjHQFeMkapixe").passphrase("LsDmT CrashLogic"),
	prize: .5,
	solvedAt: "2013-11-27 15:04:25",
	solveTime: 672720,
	transactions: [funding("35f2a2e601277156a9cfc0e02f92d184918714b1bea3a75bcc82d9f6bea848ea", "2013-11-19 20:12:25", .5), claim("de0253a758588a5079516299b633d55372ed5ae171ca4688a2f6f0c471ff93ad", "2013-11-27 15:04:25", .5)],
	hints: [official("this passphrase is the usernames of two who've posted on the Bitcoin subreddit, separated by a space.", "https://keybase.io/warp", confirmation("https://web.archive.org/web/20131213023906/https://keybase.io/warp/warp_1.0.6_SHA256_e68d4587b0e2ec34a7b554fbd1ed2d0fedfaeacf3e47fbb6c5403e252348cbfc.html", "Wayback capture of the challenge page"))]
});
const warpPuzzleChallenge4 = puzzle({
	id: "warp/challenge-4",
	chain: "bitcoin",
	address: "1GXXH7FbY7nCJDRc72SMyYykgtEUi5GxfR",
	sourceUrl: "https://keybase.io/warp",
	startedAt: "2013-11-19 20:12:25",
	status: Status.Solved,
	pubkey: uncompressed("048bf325a507144fafb185fedaeb0e8440eb062e40fe30fad92d88fee42bc9ba199eab8ce1b044f55bd8fc9c71fcef4f291ef8e41add26d63de4be09238d6ef007"),
	key: hex("8c7a26059ad4db5c774e944a1a8438f60a6de7456ca3a868ab010efddae532e5").wif("5Jt9t5tBrh1Mi1LC3s6EXCCk8S81nNX7kga3xr1B2HECGioPy2r").passphrase("petecoper"),
	prize: 1,
	solvedAt: "2013-11-20 01:23:39",
	solveTime: 18674,
	transactions: [funding("f17e84dce6c193690b07e8ea220e90370246d8deb846707dc11d032c688b43fd", "2013-11-19 20:12:25", 1), claim("921bf858098acb6a8ad4d4184fc7654e68cc2e2f4f6ebe7c59cec4e8540e1b12", "2013-11-20 01:23:39", 1)],
	hints: [official("This passphrase is the username of someone in the Hacker News top 100 karma list as of November 19, 2013. However, we dropped 2 characters from his or her username.", "https://keybase.io/warp", confirmation("https://web.archive.org/web/20131213023906/https://keybase.io/warp/warp_1.0.6_SHA256_e68d4587b0e2ec34a7b554fbd1ed2d0fedfaeacf3e47fbb6c5403e252348cbfc.html", "Wayback capture of the challenge page"))]
});
const warpPuzzleWarpChallenge1 = puzzle({
	id: "warp/warp-challenge-1",
	chain: "bitcoin",
	address: "1AdU3EcimMFN7JLJtceSyrmFYE3gF5ZnGj",
	sourceUrl: "https://keybase.io/warp",
	startedAt: "2013-11-19 20:12:25",
	status: Status.Expired,
	pubkey: uncompressed("041c133e9f41e13c3c31b78fca62355cfcb9f38493d0d9b0449a93401e791de1e0a0e0dc4a37800b64005b4fa85c620e3207fda131f75ce7b7662f74be86a455b0"),
	key: hex("a5117f7ea870b4b606f4c1877829f00dc744000605aa6571ae1695f9a8f638ef").wif("5K4z2kZZxxMZ4Tp6F8gqRTdcTezKdZSxVmRWtPthtDCtNbo4qnB").passphrase("PuACRv0R"),
	prize: 20,
	solvedAt: "2016-01-31 01:19:41",
	transactions: [funding("d99ef316fb267491a5f34f8ce35c5083df1a643a850f6b23470263d6e07a2b6b", "2013-11-19 20:12:25", 10), claim("a96d09a4de56f144e95dd2184edd4e53a6beaec9887d14eb63a25aa8e1e456c9", "2016-01-31 01:19:41", 10.001116)],
	hints: [official("this passphrase is 8 characters long, only alphanumerics. For example, 'b234FEzz'.", "https://keybase.io/warp", confirmation("https://web.archive.org/web/20131213023906/https://keybase.io/warp/warp_1.0.6_SHA256_e68d4587b0e2ec34a7b554fbd1ed2d0fedfaeacf3e47fbb6c5403e252348cbfc.html", "Wayback capture of the challenge page"))]
});
const warpPuzzleWarpChallenge2 = puzzle({
	id: "warp/warp-challenge-2",
	chain: "bitcoin",
	address: "1MkupVKiCik9iyfnLrJoZLx9RH4rkF3hnA",
	sourceUrl: "https://keybase.io/warp",
	startedAt: "2016-02-01 15:19:33",
	status: Status.Expired,
	pubkey: uncompressed("0403a696da2c6243816c8a7c1d98756c8d56e74ac54a79d35ed7c3a9a9eb84d9be11ac016eb926fda6cb58322ac4b6a505fd52c258d70d5e49eac99b1e96a696c1"),
	key: hex("1d0482346095f6cb5791b0d8f2c8d0b6c10f8245d20ecd03933779344ced5025").wif("5J34oCttqfswmkGnX5NWrU19xkZPNu4a2bRJHW2UdiAU7QpTSsN").passphrase("HY4r0uWn").salt("a@b.c"),
	prize: 20,
	solvedAt: "2018-01-03 03:14:39",
	transactions: [funding("e12fee70d2b0b308129b9b12d6f95be25617fc4f98c56900034ce466b3113074", "2016-02-01 15:19:33", 10), claim("25d23cf88188258001830a7b7c45fd7c9f43be16ce8f75088810360c55ee9f17", "2018-01-03 03:14:39", 10.0005164)],
	hints: [official("this passphrase is 8 characters long, only alphanumerics. For example, 'b234FEzz'. the salt is a@b.c", "https://keybase.io/warp", confirmation("https://web.archive.org/web/20160305003531/https://keybase.io/warp/warp_1.0.8_SHA256_5111a723fe008dbf628237023e6f2de72c7953f8bb4265d5c16fc9fd79384b7a.html", "Wayback capture of the challenge page"))]
});
var WarpCollection = class WarpCollection extends NamedCollection {
	static key = "warp";
	static author = party("Keybase", {
		key: "keybase",
		kind: PartyKind.Organization,
		about: "The identity and encryption company that published WarpWallet in 2013 and paid to have its own brainwallets cracked. Part of Zoom since 2020.",
		profiles: [
			profile("website", "https://keybase.io/warp"),
			profile("github", "https://github.com/keybase/warpwallet"),
			profile("twitter", "https://twitter.com/maxtaco"),
			profile("twitter", "https://twitter.com/malgorithms")
		],
		facts: [
			fact("WarpWallet derives a key from scrypt and PBKDF2 over a passphrase and a salt, and the page lists the challenge wallets with their hints.", "https://keybase.io/warp", { date: "2013-11-19" }),
			fact("The code, the signed releases and the challenge history live in the keybase/warpwallet repository.", "https://github.com/keybase/warpwallet"),
			fact("Zoom acquired Keybase. The team said its first job was Zoom's security and that Keybase's future was in Zoom's hands.", "https://keybase.io/blog/keybase-joins-zoom", { date: "2020-05-07" })
		]
	});
	static puzzles = [
		warpPuzzleChallenge1,
		warpPuzzleChallenge2,
		warpPuzzleChallenge3,
		warpPuzzleChallenge4,
		warpPuzzleWarpChallenge1,
		warpPuzzleWarpChallenge2
	];
	static techniques = [technique("warpwallet", "https://keybase.io/warp")];
	constructor() {
		super(WarpCollection.key, WarpCollection.author, WarpCollection.puzzles, [], WarpCollection.techniques);
	}
};
const warp = new WarpCollection();
export { WarpCollection, warp };
