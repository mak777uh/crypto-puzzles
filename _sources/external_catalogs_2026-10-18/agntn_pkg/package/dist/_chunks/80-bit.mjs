import { PartyKind, answer, claim, compressed, fact, funding, hex, increase, official, party, profile, technique } from "./parts.mjs";
import { Status } from "./status.mjs";
import { puzzle } from "./puzzle.mjs";
import { SingletonCollection } from "./collection.mjs";
const ANNOUNCEMENT = "https://bitcointalk.org/index.php?topic=1306983.msg64639847#msg64639847";
const RANGE = "https://bitcointalk.org/index.php?topic=1306983.msg64691846#msg64691846";
const STEPS = "https://bitcointalk.org/index.php?topic=1306983.msg64695204#msg64695204";
const CAT = "https://bitcointalk.org/index.php?topic=5584952.msg66991304#msg66991304";
const kTimesG80Bit = puzzle({
	id: "80-bit",
	chain: "bitcoin",
	address: "1ECDLP8osCZHBB1LH5PVAUfFegeMgFb52q",
	sourceUrl: RANGE,
	startedAt: "2024-11-01 00:01:53",
	status: Status.Solved,
	pubkey: compressed("03a61fc84b6429f07fc0edf25265ef7a0ced3cd9a0edea85e9f58b50b5d73f66e7"),
	key: hex("b40e7d34265ab9533a64622bd1a188fb8abb8829af545169abad49b46be5fe56"),
	techniques: [technique("partial-key", RANGE)],
	prize: .005,
	hints: [
		official("The Hamming length of the range will therefore be 80 contiguous bits, but they may start anywhere.", ANNOUNCEMENT, void 0, { date: "2024-10-16" }),
		official("minKey = 0x659756abf6c17ca70e0000000000000000000140be6ddd93e441f8d4b4a85653b20b4cdcc5c748207a0daa16191d07a425d8080c276f9412472e0429e61bc355 maxKey = 0x659756abf6c17ca70fffffffffffffffffffff40be6ddd93e441f8d4b4a85653b20b4cdcc5c748207a0daa16191d07a425d8080c276f9412472e0429e61bc355", RANGE, void 0, {
			date: "2024-11-01",
			answer: answer("assert shift == 361; elem = shift_inv * (public_key - min_elem); assert idlp_key == 0x2d56cbf370cbeef9e80a; private_key = min_key | (idlp_key << shift); assert private_key % secp256k1.N == 0xb40e7d34265ab9533a64622bd1a188fb8abb8829af545169abad49b46be5fe56", STEPS, { date: "2024-11-02" })
		}),
		official("The challenge involves correctly extracting pubkey from the raw TX, otherwise it's a no brainer.", RANGE, void 0, { date: "2024-11-01" })
	],
	solvedAt: "2024-11-02 00:37:21",
	solveTime: 88528,
	transactions: [
		funding("e4a2751bf7b936bd7661028799f083376a423aa05582a7f24225763bac43568b", "2024-10-28 12:12:51", .0025),
		increase("a7d8b7f7a8ce7c2a79d9d166c2f96cbd5ff1d3223a707f9d29bf6d091fc5b2f9", "2024-10-28 12:58:01", .0025),
		claim("dc8309f8b588e70c4f91f766108a9bbccd03839e846997cb93fe7dd08d162f36", "2024-11-02 00:37:21", .00495)
	],
	solver: party(void 0, { addresses: ["14q4SoQwENXXzsVT3GMwDrDUGiW5QZeiDg"] })
});
var EightyBitCollection = class EightyBitCollection extends SingletonCollection {
	static key = "80-bit";
	static author = party("kTimesG", {
		key: "ktimesg",
		kind: PartyKind.Person,
		about: "Writes on Bitcointalk about cracking Bitcoin keys. In 2024 offered 0.005 BTC to whoever cracked a key with 80 unknown bits before its transaction confirmed. Someone did, 39 minutes in. In 2026 put 800,000 sat behind a signed post and a spiral of emojis, the Phy Challenge.",
		profiles: [profile("bitcointalk", "https://bitcointalk.org/index.php?action=profile;u=3610370")],
		facts: [
			fact("Announced the 80-bit challenge two weeks early. Only asked the winner to say how they broke the key.", ANNOUNCEMENT, { date: "2024-10-16" }),
			fact("Was disappointed it took 39 minutes to replace the spend. With a real 80-bit puzzle, nobody gets 40.", STEPS, { date: "2024-11-02" }),
			fact("Spent 3 days building and checking the Phy Challenge, then published its signature one character short. Blamed the cat.", CAT, { date: "2026-07-29" })
		]
	});
	static puzzles = [kTimesG80Bit];
	constructor() {
		super(EightyBitCollection.key, EightyBitCollection.author, EightyBitCollection.puzzles);
	}
};
const eightyBit = new EightyBitCollection();
export { EightyBitCollection, eightyBit, kTimesG80Bit };
