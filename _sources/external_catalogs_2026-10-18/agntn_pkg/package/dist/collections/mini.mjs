import { PartyKind, answer, claim, compressed, fact, funding, hex, increase, official, p2pkh, party, profile, technique } from "../_chunks/parts.mjs";
import { Status } from "../_chunks/status.mjs";
import { puzzle } from "../_chunks/puzzle.mjs";
import { NumericCollection } from "../_chunks/collection.mjs";
const THREAD$6 = "https://bitcointalk.org/index.php?topic=5513047";
const mini1 = puzzle({
	id: "mini/1",
	chain: "bitcoincash",
	address: p2pkh("bitcoincash:qp95dcg22sdwa34787k8p8p9d7ma56fs3c39x022wu", "4b46e10a541aeec6be3fac709c256fb7da69308e"),
	sourceUrl: THREAD$6,
	startedAt: "2024-10-14 13:48:32",
	status: Status.Solved,
	pubkey: compressed("02ceb6cbbcdbdf5ef7150682150f4ce2c6f4807b349827dcdbdd1f2efa885a2630"),
	key: hex("0000000000000000000000000000000000b10f22572c497a836ea187f2e1fc23", 120),
	techniques: [technique("partial-key", THREAD$6)],
	prize: 1.2,
	hints: [official("Here is a priv key for puzzle #120, but I changed three characters randomly. It's easy to find correct key even if you have minimal skills. 0xB50F22572A497A836EA18AF2E1FC23", `${THREAD$6}.msg64633165#msg64633165`, void 0, {
		date: "2024-10-14",
		answer: answer("0000000000000000000000000000000000b10f22572c497a836ea187f2e1fc23 puzzle 120 key", `${THREAD$6}.msg64634120#msg64634120`, { date: "2024-10-14" })
	}), official("It's a strange question, all addresses in original puzzles are from compressed pubkeys. BCH is the same, of course.", `${THREAD$6}.msg64633797#msg64633797`, void 0, { date: "2024-10-14" })],
	solvedAt: "2024-10-14 18:33:09",
	solveTime: 17077,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .12),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", 1.08),
		claim("69ba6240389136ac29d8be6513e2e1e915b2c97dd456c98a0d2f56a4d4b3254b", "2024-10-14 18:33:09", 1.2)
	],
	solver: party(void 0, { addresses: ["bitcoincash:qrdkjxkvqyyvdc5e909z6algczxv0gptvs2mm9ednu"] })
});
const THREAD$5 = "https://bitcointalk.org/index.php?topic=5518896";
const mini2 = puzzle({
	id: "mini/2",
	chain: "bitcoincash",
	address: p2pkh("bitcoincash:qrms0yjk4gp8m3phew6nn724gujpvujleq9gkhh8fz", "f7079256aa027dc437cbb539f955472416725fc8"),
	sourceUrl: THREAD$5,
	startedAt: "2024-11-14 13:45:25",
	status: Status.Solved,
	pubkey: compressed("0233709eb11e0d4439a729f21c2c443dedb727528229713f0065721ba8fa46f00e"),
	key: hex("000000000000000000000000000000001c533b6bb7f0804e09960225e44877ac", 125).wif("KwDiBf89QgGbjEhKnhXJuH7Nbdz1FhKePEPcr4to6PqoSc6KxQy6"),
	techniques: [technique("partial-key", THREAD$5)],
	prize: 1.25,
	hints: [official("The key fell and shattered into 12 pieces: 804 E09 77 1C5 225 AC 960 33B 7F0 E4 6BB 48. The order of the pieces is unknown, assemble the key back together!", `${THREAD$5}.msg64739119#msg64739119`, void 0, {
		date: "2024-11-14",
		answer: answer("0x1c533b6bb7f0804e09960225e44877ac KwDiBf89QgGbjEhKnhXJuH7Nbdz1FhKePEPcr4to6PqoSc6KxQy6", `${THREAD$5}.msg64741259#msg64741259`, { date: "2024-11-14" })
	})],
	solvedAt: "2024-11-14 15:42:33",
	solveTime: 7028,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .125),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", 1.125),
		claim("a8f6cf8dead86c89bbc13e00caa402e9929a9356b498d45039b5c02c5844823f", "2024-11-14 15:42:33", 1.25)
	],
	solver: party(void 0, { addresses: ["bitcoincash:qpfumxdtepezyg85tax52uq39ugzqan03glqrdjalm"] })
});
const THREAD$4 = "https://bitcointalk.org/index.php?topic=5522785";
const mini3 = puzzle({
	id: "mini/3",
	chain: "bitcoincash",
	address: p2pkh("bitcoincash:qz3yjg59ypg6jqpwhaxgvjj44jm4hdx0w5wsxw2qez", "a24922852051a9002ebf4c864a55acb75bb4cf75"),
	sourceUrl: THREAD$4,
	startedAt: "2024-12-14 16:22:32",
	status: Status.Solved,
	pubkey: compressed("03633cbe3ec02b9401c5effa144c5b4d22f87940259634858fc7e59b1c09937852"),
	key: hex("000000000000000000000000000000033e7665705359f04f28b88cf897c603c9", 130),
	prize: 1.3,
	hints: [
		official("Message: Anything one man can imagine, other men can make real. Signature: IIONt3uYHbMh+vUnqDBGHP2gGu1Q2Fw0WnsKj05eT9P8KI2kGgPniiPirCd5IeLRnRdxeiehDxxsyn/VujUaX8o=", `${THREAD$4}.msg64847018#msg64847018`, void 0, {
			date: "2024-12-14",
			answer: answer("Since it seems that the winner is not here, I will explain this riddle. 1. So we have a signature, we should check for weak K1, use kangaroos of course What's the range for search? Use a hint from the message, 80bit. Fails, it seems K1 is strong. 2. Remember that I posted another signature, take K2, may be K1==K2? No. So if we have both strong K1 and K2, what it can be? Remember that ECDSA Signature is vulnerable not only when K1==K2 but also if we know that K1 has some relation with K2, for example, K2=K1+1 (the simplest case). How to check it? Remember that R1=G*K1 and R2=G*K2 and we have these R1 and R2 points in signatures, so we can substract: PntDiff = R1 - R2 (and also try R2 - R1) and check if it's G. It's not G, ok, may be the difference is not 1 but more? We should try to solve PntDiff (both variants) with kangaroos. What's the range? Same, 80bits. And we can solve it, so now we have delta_K. 3. Now calculate, google or ask chatbot to get the formula: pk = ((delta_k * s1 * s2) + (z2 * s1) - (z1 * s2)) / (r1 * s2 - r2 * s1) [mod n] That's all!", `${THREAD$4}.msg64850761#msg64850761`, { date: "2024-12-15" })
		}),
		official("A hint is in the message", `${THREAD$4}.msg64847038#msg64847038`, void 0, { date: "2024-12-14" }),
		official("Yes, you should have some understanding of ECDSA signature vulnerabilities.", `${THREAD$4}.msg64847430#msg64847430`, void 0, { date: "2024-12-14" }),
		official("Same K or weak K would be too easy. This riddle is just one step more complex.", `${THREAD$4}.msg64849365#msg64849365`, void 0, { date: "2024-12-15" }),
		official("24 hours have passed, here is the first hint: don't take anything from the blockchain.", `${THREAD$4}.msg64850292#msg64850292`, void 0, { date: "2024-12-15" })
	],
	solvedAt: "2024-12-15 17:21:10",
	solveTime: 89918,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .13),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", 1.17),
		claim("c237333cdee09fe03b913d857f06ae6aec830f87c9a5f58a94c28bdbce558bf3", "2024-12-15 17:21:10", 1.3)
	],
	solver: party(void 0, { addresses: ["bitcoincash:qrda29v338en6lkt5s8mv3wls0l778qg0sdxk42358"] })
});
const THREAD$3 = "https://bitcointalk.org/index.php?topic=5526453";
const mini4 = puzzle({
	id: "mini/4",
	chain: "bitcoin",
	address: "1AH5pRZW4ZofEJhdb3muNZ1q88YNu3Rez7",
	sourceUrl: THREAD$3,
	startedAt: "2025-01-14 17:22:30",
	status: Status.Solved,
	pubkey: compressed("03c8f139dad58b4786d3649992849733c2a7626f011089e87508ccdf8b0758c493"),
	key: hex("c6768f199574104ae1b75eab82b0cc1d2d2e9ee7d50637a574e27131e9301552"),
	prize: .01,
	hints: [
		official("03C8F139DAD58B4786D3649992849733C2A7626F011089E87508CCDF8B0758C493 Hint: It's a strong point so you cannot solve it by kangaroos. But it's a special point, you can solve it easily if you use some feature of secp256k1.", `${THREAD$3}.msg64953111#msg64953111`, void 0, {
			date: "2025-01-14",
			answer: answer("Another explanation: It's a special point, if you apply endomorphism for it, you will get previous point (Point - G). It's funny to have two points next to each other with same Y, isn't it? And since you know the distance between these two points, you can calculate the private key easily.", `${THREAD$3}.msg64955287#msg64955287`, { date: "2025-01-15" })
		}),
		official("It's not difficult, really. And you don't even need GPUs or fast PC.", `${THREAD$3}.msg64953121#msg64953121`, void 0, { date: "2025-01-14" }),
		official("ECDSA already was in previous puzzle, so probably I won't use it again", `${THREAD$3}.msg64953401#msg64953401`, void 0, { date: "2025-01-14" })
	],
	solvedAt: "2025-01-15 08:41:05",
	solveTime: 55115,
	transactions: [funding("5353b25012c66b78034dc3690e444b3eac916e1f71eb8af1f2d27a156576ae8c", "2025-01-14 17:03:40", .01), claim("3df3a1c6233c1b01c449ef2febeab82bd628bad1bc07f4b4c84a2f9017563007", "2025-01-15 08:41:05", .01)],
	solver: party(void 0, { addresses: ["1J9qV9saEgM1UZo7XetLsChmKHPXtTE6uw"] })
});
const THREAD$2 = "https://bitcointalk.org/index.php?topic=5538285";
const mini5 = puzzle({
	id: "mini/5",
	chain: "bitcoin",
	address: "1PGRtg6XjiYSB1VJAhsqLQc6hQeBqFGVPD",
	sourceUrl: THREAD$2,
	startedAt: "2025-04-16 08:03:44",
	status: Status.Solved,
	pubkey: compressed("03150992937967192ebcd2539e5a949689ac69e6458f9178e7251356ffe079b7f0"),
	key: hex("ce00dd1c84203ffc9a80a5d563182ffd67006e8e42101ffe3380374721080fff"),
	prize: .01,
	hints: [official("03150992937967192EBCD2539E5A949689AC69E6458F9178E7251356FFE079B7F0 Hint: private key is ABCD where A (lowest bits of privkey) - some 64bit value B = 2*A C = 3*A D = 4*A", `${THREAD$2}.msg65283009#msg65283009`, void 0, {
		date: "2025-04-16",
		answer: answer("Correct! We just need to use Scale = 1 | (2 << 64) | (3 << 128) | (4 << 192). There are two ways: 1. Scale G: G' = G * Scale or 2. Scale PubKey: PubKey' = PubKey / Scale. And then use kangaroo or bsgs. Very easy!", `${THREAD$2}.msg65284065#msg65284065`, { date: "2025-04-16" })
	})],
	solvedAt: "2025-04-16 10:39:51",
	solveTime: 9367,
	transactions: [funding("6fc1d3c404526ab9a014c6aa56caf493f330be6b723c0a567a65251bd6421aa6", "2025-04-16 07:42:22", .01), claim("3906084eb1907bd31d7bd3a2f673c2f7eb2f3fd5e60f88c45375370cde486379", "2025-04-16 10:39:51", .01)],
	solver: party(void 0, { addresses: ["bc1q978hkuljzuyg9mtr7phcsehh80577z47xdx3qh"] })
});
const THREAD$1 = "https://bitcointalk.org/index.php?topic=5577390";
const mini6 = puzzle({
	id: "mini/6",
	chain: "bitcoin",
	address: "1LsusxaEiGpTvWcXJA9ACRDKva8REjMokr",
	sourceUrl: THREAD$1,
	startedAt: "2026-03-14 17:14:11",
	status: Status.Solved,
	pubkey: compressed("03bbf1aff1b753dfa4c58835c2c135d7d2c7cea8635d483d37a8997b666cc1fa61"),
	key: hex("1ba27fb025baf482573f6f34348ee6b14e9d8a3581c0b018dbecc642fa90d587"),
	techniques: [technique("partial-key", THREAD$1)],
	prize: .01,
	hints: [official("03BBF1AFF1B753DFA4C58835C2C135D7D2C7CEA8635D483D37A8997B666CC1FA61 Hint: private key is 1BA27FB025xxxxxxxxxx6F34348EE6B14E9D8A3581C0B01xxxxxxxxxxA90D587", `${THREAD$1}.msg66508848#msg66508848`, void 0, {
		date: "2026-03-14",
		answer: answer("PRIVATE KEY: 1BA27FB025BAF482573F6F34348EE6B14E9D8A3581C0B018DBECC642FA90D587", `${THREAD$1}.msg66509998#msg66509998`, { date: "2026-03-14" })
	})],
	solvedAt: "2026-03-14 20:47:10",
	solveTime: 12779,
	transactions: [funding("453899f8fba9b77f98909d20cbadd4c5bc5f9e43664838c38bae713a698f8eff", "2026-03-14 17:09:09", .01), claim("2a3784bd317f2c08195e3262a73993d75b42f062530989ef6329039e96d2d174", "2026-03-14 20:47:10", .01)],
	solver: party(void 0, { addresses: ["bc1qcm87z32n5adylf5egn23k3pqcwel6pc04eypge"] })
});
const THREAD = "https://bitcointalk.org/index.php?topic=5589799";
const mini7 = puzzle({
	id: "mini/7",
	chain: "bitcoincash",
	address: p2pkh("bitcoincash:qqak7k98tf2tlkzar0rv2yvqlhrn9xfryctu7nrhlw", "3b6f58a75a54bfd85d1bc6c51180fdc732992326"),
	sourceUrl: THREAD,
	startedAt: "2026-07-29 15:40:33",
	status: Status.Solved,
	pubkey: compressed("02145d2611c823a396ef6712ce0f712f09b9b4f3135e3e0aa3230fb9b6d08d1e16"),
	key: hex("0000000000000000000000000000006d9392a16883f90903d5f78da57af07eb2", 135),
	prize: 1.35,
	hints: [official("16RGFo6hjq9ym6Pj7N5H7L1NR1rVPJyw2v Message: Thank you Satoshi Nakamoto! Signature: ICVZGMwpPuca4krotcpwEzTyJXBUQF+w25M2TLnFHzIiAKYS+4c6taNLaMM7ZChJ2oMPQXiuzsYDCeF9xZFBMZg=", `${THREAD}.msg66991218#msg66991218`, void 0, {
		date: "2026-07-29",
		answer: answer("Ok, I will explain: to be able to calculate pk you just need to know the nonce from this signature, a hint is in the message: use bitcoin genesis block data (I used merkle root for nonce). So #135 pk is: 0000000000000000000000000000006D9392A16883F90903D5F78DA57AF07EB2", `${THREAD}.msg66992048#msg66992048`, { date: "2026-07-29" })
	})],
	solvedAt: "2026-07-29 16:57:15",
	solveTime: 4602,
	transactions: [
		funding("08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15", "2015-01-15 18:07:14", .135),
		increase("5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164", "2017-07-11 05:00:53", 1.215),
		claim("1115debca78431eca06608f2cc96c91f136d3f62684c19a391264e3e1b7334f7", "2026-07-29 16:57:15", 1.35)
	],
	solver: party(void 0, { addresses: ["bitcoincash:qqv7seys30a4mnaeffm0yxcnvjylpvfxxgxaus70sz"] })
});
var MiniCollection = class MiniCollection extends NumericCollection {
	static key = "mini";
	static author = party("RetiredCoder", {
		key: "retired-coder",
		kind: PartyKind.Person,
		about: "Bitcoin puzzle solver and author of RCKangaroo who posted seven mini-puzzles on Bitcointalk: the Bitcoin Cash left on four solved puzzle addresses, and 0.01 BTC three times.",
		profiles: [profile("github", "https://github.com/RetiredC"), profile("bitcointalk", "https://bitcointalk.org/index.php?action=profile;u=3657819")],
		facts: [
			fact("Registered the bitcointalk account on October 5, 2024.", "https://bitcointalk.org/index.php?action=profile;u=3657819", { date: "2024-10-05" }),
			fact("Wrote that the mini-puzzles are meant to be easy, so everyone with minimal skills can solve them, and that #67 and #135 are there for anyone who wants hard ones.", "https://bitcointalk.org/index.php?topic=5518896.msg64741927#msg64741927", { date: "2024-11-15" }),
			fact("Explained the #130 mini-puzzle in the thread after its winner never showed up there.", "https://bitcointalk.org/index.php?topic=5522785.msg64850761#msg64850761", { date: "2024-12-15" }),
			fact("Printed the key of puzzle #135 while explaining mini-puzzle #7, whose winner did not write the solution in the thread: It's not polite.", "https://bitcointalk.org/index.php?topic=5589799.msg66992048#msg66992048", { date: "2026-07-29" })
		]
	});
	static puzzles = [
		mini1,
		mini2,
		mini3,
		mini4,
		mini5,
		mini6,
		mini7
	];
	constructor() {
		super(MiniCollection.key, MiniCollection.author, MiniCollection.puzzles);
	}
};
const mini = new MiniCollection();
export { MiniCollection, mini };
