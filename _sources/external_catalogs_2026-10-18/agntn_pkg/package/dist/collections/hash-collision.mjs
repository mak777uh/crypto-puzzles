import { PartyKind, claim, fact, funding, increase, p2sh, party, profile, redeemScript, technique } from "../_chunks/parts.mjs";
import { Status } from "../_chunks/status.mjs";
import { puzzle } from "../_chunks/puzzle.mjs";
import { NamedCollection } from "../_chunks/collection.mjs";
const hashCollisionPuzzleSha1 = puzzle({
	id: "hash-collision/sha1",
	chain: "bitcoin",
	address: p2sh("37k7toV1Nv4DfmQbmZ8KuZDQCYK9x5KpzP", "4266fc6f2c2861d7fe229b279a79803afca7ba34", redeemScript("4266fc6f2c2861d7fe229b279a79803afca7ba34", "6e879169a77ca787")),
	sourceUrl: "https://bitcointalk.org/index.php?topic=293382.0",
	startedAt: "2013-09-13 04:48:29",
	status: Status.Claimed,
	techniques: [technique("hash-collision", "https://bitcointalk.org/index.php?topic=293382.0")],
	prize: 2.48,
	solvedAt: "2023-02-22 23:00:49",
	solveTime: 298059140,
	transactions: [funding("09de8e2de5f6261af40c522c8fcc008c6a8321368b4df707c0c2a8f431138a83", "2013-09-13 04:48:29", .01), claim("9ec2a0db0c4c3423a6b2c3cb2a26fc626b037121b4b5f3f57b08916196ff14e0", "2023-02-22 23:00:49", 96e-6)]
});
const hashCollisionPuzzleSha256 = puzzle({
	id: "hash-collision/sha256",
	chain: "bitcoin",
	address: p2sh("35Snmmy3uhaer2gTboc81ayCip4m9DT4ko", "292fb39df7cd619a396069383928e6bfb74ebec5", redeemScript("292fb39df7cd619a396069383928e6bfb74ebec5", "6e879169a87ca887")),
	sourceUrl: "https://bitcointalk.org/index.php?topic=293382.0",
	startedAt: "2013-09-13 05:59:09",
	techniques: [technique("hash-collision", "https://bitcointalk.org/index.php?topic=293382.0")],
	prize: .27734251,
	transactions: [
		funding("397f12ee15f8a3d2ab25c0f6bb7d3c64d2038ca056af10dd8251b98ae0f076b0", "2013-09-13 05:59:09", .1),
		increase("44fb218072a12aa7e6944f65048654b1696b9b3e051ffa50c68aefcca5359e75", "2013-09-13 11:40:40", .05),
		increase("23e0e4e243cc2717fa3be4bff8e5a747f0f1f1ffd1c97657945ee82bae33fc51", "2014-10-10 08:58:50", 26888e-8),
		increase("d488f73dc00846debe87c1044a4080b289c746048f8e3cec2e910e5357341612", "2017-02-23 18:27:00", .1),
		increase("7f80adf2bc2f6a1fad58ae8e4ebeaadcc04ab784f0c9ada63ba67425de6b0f57", "2017-02-23 19:42:19", .01),
		increase("c3c8a720363bc12ee0ca7526ad879f094d67a95e61200d2f3c62ab116bb5d31c", "2017-02-23 20:08:10", .01072363),
		increase("7539a66814805a280b3570ce3c2e51994d996798cb9ca6d88df04e75c6cddc23", "2017-02-23 20:49:30", .005),
		increase("6c806a3e4ef20f8c910d4d5eeda17b57d387757c6f597b36ad91da03c79fc670", "2019-04-12 09:19:16", 1e-4),
		increase("9c0b22f5cd4b1a23ba7faef01e9382adda160ed5e3162fde96299b3c181dc793", "2020-08-25 05:46:48", 25e-5),
		increase("0e39f09fe0b1dd4dbad9a442844a285396226a9288f1e0dcc3bb368f7b763043", "2025-01-06 11:52:55", .001)
	]
});
const hashCollisionPuzzleRipemd160 = puzzle({
	id: "hash-collision/ripemd160",
	chain: "bitcoin",
	address: p2sh("3KyiQEGqqdb4nqfhUzGKN6KPhXmQsLNpay", "c89ab551eab767697bc4d9caca650c41b39497c6", redeemScript("c89ab551eab767697bc4d9caca650c41b39497c6", "6e879169a67ca687")),
	sourceUrl: "https://bitcointalk.org/index.php?topic=293382.0",
	startedAt: "2013-09-13 05:59:09",
	techniques: [technique("hash-collision", "https://bitcointalk.org/index.php?topic=293382.0")],
	prize: .11576888,
	transactions: [
		funding("397f12ee15f8a3d2ab25c0f6bb7d3c64d2038ca056af10dd8251b98ae0f076b0", "2013-09-13 05:59:09", .1),
		increase("bff8ed5da3349d220210cd91b2c8cd192e326ca0f1c0570fe27b9793127431d6", "2013-09-14 05:55:50", .0095),
		increase("e107d9bc88c93d6409e8d0173b8b426ea701b12c529439f198ac0e39b6b7a1c0", "2014-10-10 08:58:50", 26888e-8),
		increase("f10275c6788eadc7334850093341b4d3ca8f25dcd82fdc577e03d6afccc93d75", "2017-02-26 06:58:47", .005),
		increase("2df75de1ba66c12ed8904f988bfc114d8cdb579af0816efa011b67fd6a2f83af", "2025-01-06 11:52:55", .001)
	]
});
const hashCollisionPuzzleHash160 = puzzle({
	id: "hash-collision/hash160",
	chain: "bitcoin",
	address: p2sh("39VXyuoc6SXYKp9TcAhoiN1mb4ns6z3Yu6", "55951b1e750beb68712edae7042ffeb7491c388d", redeemScript("55951b1e750beb68712edae7042ffeb7491c388d", "6e879169a97ca987")),
	sourceUrl: "https://bitcointalk.org/index.php?topic=293382.0",
	startedAt: "2013-09-13 05:59:09",
	techniques: [technique("hash-collision", "https://bitcointalk.org/index.php?topic=293382.0")],
	prize: .10026873,
	transactions: [funding("397f12ee15f8a3d2ab25c0f6bb7d3c64d2038ca056af10dd8251b98ae0f076b0", "2013-09-13 05:59:09", .1), increase("564f7eb6493e02c2542b0a5ccc6ac5043451ec8be35e590077ad667ade31aa01", "2014-10-10 08:58:50", 26873e-8)]
});
const hashCollisionPuzzleHash256 = puzzle({
	id: "hash-collision/hash256",
	chain: "bitcoin",
	address: p2sh("3DUQQvz4t57Jy7jxE86kyFcNpKtURNf1VW", "813ee00988dc0188450da05b77bd2d3e887f2ca4", redeemScript("813ee00988dc0188450da05b77bd2d3e887f2ca4", "6e879169aa7caa87")),
	sourceUrl: "https://bitcointalk.org/index.php?topic=293382.0",
	startedAt: "2013-09-13 05:59:09",
	techniques: [technique("hash-collision", "https://bitcointalk.org/index.php?topic=293382.0")],
	prize: .10026873,
	transactions: [funding("397f12ee15f8a3d2ab25c0f6bb7d3c64d2038ca056af10dd8251b98ae0f076b0", "2013-09-13 05:59:09", .1), increase("7fef1d6d1cce26d6a69c4dade4cd55ccc2734f202f07031af1cbc3dffddfd68f", "2014-10-10 08:58:50", 26873e-8)]
});
const hashCollisionPuzzleOpAbs = puzzle({
	id: "hash-collision/op-abs",
	chain: "bitcoin",
	address: p2sh("3QsT6Sast6ghfsjZ9VJj9u8jkM2qTfDgHV", "fe441065b6532231de2fac563152205ec4f59c74", redeemScript("fe441065b6532231de2fac563152205ec4f59c74", "6e879169907c9087")),
	sourceUrl: "https://bitcointalk.org/index.php?topic=293382.0",
	startedAt: "2013-09-13 04:58:06",
	status: Status.Claimed,
	prize: .001,
	solvedAt: "2018-05-15 00:40:36",
	solveTime: 147296550,
	transactions: [funding("aa7768318c367b8d9b59d1529da9f6aa5eac45255f4752e01a58bdb80b4751bf", "2013-09-13 04:58:06", .001), claim("d48e41c95bb491f3077e27b8f3a0ebb40722381e5f6ff1a26c7c03ebf946603b", "2018-05-15 00:40:36", 1e-4)]
});
var HashCollisionCollection = class HashCollisionCollection extends NamedCollection {
	static key = "hash-collision";
	static author = party("Peter Todd", {
		key: "peter-todd",
		kind: PartyKind.Person,
		about: "Bitcoin Core contributor and applied cryptography consultant, creator of OpenTimestamps, who paid for hash collisions with Bitcoin script in 2013.",
		addresses: ["1FCYd7j4CThTMzts78rh6iQJLBRGPW9fWv", "3MeoP8VzBURphKjrpkyY2GoW52z32ZmfK7"],
		profiles: [
			profile("website", "https://petertodd.org/"),
			profile("github", "https://github.com/petertodd"),
			profile("twitter", "https://x.com/peterktodd"),
			profile("keybase", "https://keybase.io/petertodd"),
			profile("bitcointalk", "https://bitcointalk.org/index.php?topic=293382.0")
		],
		facts: [
			fact("Posted the bounties on bitcointalk in September 2013: P2SH scripts that pay anyone who presents two different inputs with the same hash.", "https://bitcointalk.org/index.php?topic=293382.0", { date: "2013-09-13" }),
			fact("Created OpenTimestamps, a standard for timestamping data on Bitcoin with free calendar servers.", "https://opentimestamps.org/"),
			fact("Writes at petertodd.org since 2013: replace by fee, timestamping, consensus and code review of Segwit and V3 transactions.", "https://petertodd.org/"),
			fact("The Keybase account proves one key over petertodd.org, GitHub petertodd, Reddit petertodd and X peterktodd.", "https://keybase.io/petertodd")
		]
	});
	static puzzles = [
		hashCollisionPuzzleSha1,
		hashCollisionPuzzleSha256,
		hashCollisionPuzzleRipemd160,
		hashCollisionPuzzleHash160,
		hashCollisionPuzzleHash256,
		hashCollisionPuzzleOpAbs
	];
	constructor() {
		super(HashCollisionCollection.key, HashCollisionCollection.author, HashCollisionCollection.puzzles);
	}
};
const hashCollision = new HashCollisionCollection();
export { HashCollisionCollection, hashCollision };
