import { PartyKind, answer, artifact, claim, fact, funding, increase, party, profile, stage, technique } from "../_chunks/parts.mjs";
import { Status } from "../_chunks/status.mjs";
import { puzzle } from "../_chunks/puzzle.mjs";
import { NumericCollection } from "../_chunks/collection.mjs";
const address$4 = "0xaec7e8c221c3fd24e75c996e32289235fd899ebf";
const source$4 = `https://etherscan.io/address/${address$4}#code`;
const teikhos0 = puzzle({
	id: "teikhos/0",
	chain: "ethereum",
	address: address$4,
	sourceUrl: source$4,
	startedAt: "2018-02-26 01:56:30",
	techniques: [technique("xor", source$4)],
	prize: 1.000012026,
	stages: [stage("authenticate", "The simple mask of teikhos/1, but on the right key authenticate() only returns true. Nothing in the code sends ETH anywhere, so the balance stays put whoever finds the key.", [artifact("verified contract source", source$4)])],
	transactions: [
		funding("0x9018ea28aa73fd35781d30a8b06b0a3efaf43e1837941cb6cfbcee1b4b896da1", "2018-02-26 01:56:30", .1),
		increase("0x5e3c25d7005d41f4d6d5e8e44d82d12d7ef7782391b4b5a911440240ae9bf956", "2018-02-26 01:57:42", .9),
		increase("0xf00a06ccf1a9dd0edb62dee7aa1acb05810eb1a741e5d1d66af72c9a2fa87ba2", "2026-06-21 19:52:23", 1e-5),
		increase("0xa494cec16dcfae46f68ee8d756fc8a8b0f1476eb79b20b172502c0049ea7156b", "2026-06-22 01:21:47", 2026e-9)
	]
});
const address$3 = "0x17e5e0910b9185b0ede564dcbf074ca910ad56a4";
const source$3 = `https://etherscan.io/address/${address$3}#code`;
const teikhos1 = puzzle({
	id: "teikhos/1",
	chain: "ethereum",
	address: address$3,
	sourceUrl: source$3,
	startedAt: "2018-02-26 02:44:42",
	techniques: [technique("xor", source$3)],
	prize: 1.000002026,
	stages: [stage("authenticate", "Two 32-byte words sit in storage. XOR them with the two halves of the right 64-byte public key and you get the r and s of a signature that key made over itself. authenticate() checks it with ecrecover and self-destructs to whoever sent it.", [artifact("verified contract source", source$3)])],
	transactions: [funding("0xa3af4cd51c4f499efa321cc192332533a402522e20be2f5ed000465dd3f5b55d", "2018-02-26 02:44:42", 1), increase("0x566d229f6890ddef16e04160b83318cf149af5f98a5ed3e8830af78283a9b241", "2026-06-22 00:19:47", 2026e-9)]
});
const address$2 = "0xd7c6d542f3dcdceda845112b8fd567b8f8655805";
const source$2 = `https://etherscan.io/address/${address$2}#code`;
const teikhos2 = puzzle({
	id: "teikhos/2",
	chain: "ethereum",
	address: address$2,
	sourceUrl: source$2,
	startedAt: "2018-02-27 15:57:38",
	techniques: [technique("xor", source$2)],
	prize: .500002026,
	stages: [stage("authenticate", "Same check as teikhos/1 with one more layer. The public key XORs a stored proof into a symmetric key, and that key XORs the other stored proof into the signature. Still one 64-byte input, still ecrecover, still self-destructs to the sender.", [artifact("verified contract source", source$2), artifact("ProofOfSymmetricKey.sol", "https://gist.github.com/resilience-me/be11a0ed3575dddca10df8263b53cc1d")])],
	transactions: [funding("0x9e1f030874e54abeb4b4a6e07891c7c93ae0736f6ce3363ff323b1a83c0ef498", "2018-02-27 15:57:38", .5), increase("0x20c6ed219f4706349595e8ab909e3710272994f10eea8ac5826d917c674cbc83", "2026-06-22 00:22:35", 2026e-9)]
});
const address$1 = "0x973c2178b09225d1de3ab037d40b3f24af696255";
const source$1 = `https://etherscan.io/address/${address$1}#code`;
const teikhos3 = puzzle({
	id: "teikhos/3",
	chain: "ethereum",
	address: address$1,
	sourceUrl: source$1,
	startedAt: "2018-03-14 01:26:29",
	techniques: [technique("xor", source$1)],
	prize: .500002026,
	stages: [
		stage("commit", "Store a signature before anything else. authenticate() refuses a sender without a commit, and the earliest valid commit wins.", [artifact("verified contract source", source$1)]),
		stage("authenticate", "Submit the public key whose Keccak-512, computed by a separate SHA3_512 contract, unmasks the stored proof into a signature by that key. The right key marks the bounty solved and opens a seven day window.", [artifact("verified contract source", source$1)]),
		stage("reveal", "Inside the window, reveal your commit. It counts when it is a signature by your own address over the message the key signed.", [artifact("verified contract source", source$1)]),
		stage("reward", "After the seven days anyone can call it. The contract self-destructs to the winner, or back to the author if nobody revealed a valid commit.", [artifact("verified contract source", source$1)])
	],
	transactions: [funding("0x92987048c9221675e133b7057a26c4420f5e77a59ff4e58b4df1ea535fa0c61b", "2018-03-14 01:26:29", .5), increase("0xc811a055a12c3121c221e3d21effc1b8f598081cb70ea6e173968ac4f5d48882", "2026-06-22 00:23:59", 2026e-9)]
});
const address = "0x735ba26f91e1275fa4b504649b19ef74739fe7e7";
const source = `https://etherscan.io/address/${address}#code`;
const writeup = "https://github.com/floflo777/open-crypto-puzzles/tree/main/2-mid-prizes/teikhos-bipedaljoe-solver-bounties-2eth";
const teikhos4 = puzzle({
	id: "teikhos/4",
	chain: "ethereum",
	address,
	sourceUrl: source,
	startedAt: "2018-03-14 03:11:51",
	status: Status.Solved,
	techniques: [technique("xor", source)],
	prize: .5,
	stages: [
		stage("commit", "Store a signature by your own address over the message the public key signed, before you submit the key. The earliest commit that holds wins.", [artifact("verified contract source", source)]),
		stage("authenticate", "Submit the public key whose Keccak-512 unmasks the stored proof into a signature by that key. Unlike teikhos/3, the same call reveals your commit and reverts unless it holds, then starts a seven day wait.", [artifact("verified contract source", source)], answer("ca6a98ceec61e213d9a0a8fdc0a6d5d9ed7566f5f4cfd24871fb9316feb6e1eb2367489f54a0cd4111f4c5356eb744d299a7521296786223c70947c8c36940c6", writeup, { date: "2026-08-16" })),
		stage("reward", "After the seven days anyone can call it, and the contract self-destructs to the winner. There is no way back to the author.", [artifact("verified contract source", source)])
	],
	solvedAt: "2026-06-21 09:51:23",
	solveTime: 261038372,
	transactions: [funding("0x9d2172e87c445fa160c46db96bd326b4bcecce2b1574659074e094811893b4d5", "2018-03-14 03:11:51", .5), claim("0x4d2bfceb311bda8d265debab1c8ad23cb860922b876eca523327d0405ab97bff", "2026-06-21 09:51:23", .5)],
	solver: party("floflo777", {
		key: "floflo777",
		kind: PartyKind.Person,
		addresses: ["0x83e4b2a5a464bdfcd83057ac08447f533a595156"],
		facts: [fact("Solved a TeikhosBounty contract deployed in 2018, which pays 0.5 ETH to whoever submits the right public key.", "https://x.com/0xFlorent_/status/2068735759889145906", { date: "2026-06-21" }), fact("Found the key in the calldata of a reverted authenticate() call another address sent on 2022-04-03, then committed and authenticated through Flashbots so nobody could copy the commit.", writeup, { date: "2026-08-16" })]
	})
});
var TeikhosCollection = class TeikhosCollection extends NumericCollection {
	static key = "teikhos";
	static author = party("Johan Nygren", {
		key: "johan-nygren",
		kind: PartyKind.Person,
		aliases: ["resilience-me", "bipedaljoe"],
		about: "Proof-of-personhood tinkerer who named a proof of public key scheme Teikhos and put ETH behind five contracts to show it holds.",
		addresses: ["0x4c5d24a7ca972aea90cc040da6770a13fc7d4d9a"],
		profiles: [profile("github", "https://github.com/resilience-me")],
		facts: [
			fact("Signs the Bitpeople whitepaper in the resilience-me panarchy repository as Johan Nygren.", "https://github.com/resilience-me/panarchy/blob/main/documentation/bitpeople.md"),
			fact("Published ProofOfSymmetricKey.sol as a gist with the same stored proofs as teikhos/2, deployed 48 minutes later.", "https://gist.github.com/resilience-me/be11a0ed3575dddca10df8263b53cc1d", { date: "2018-02-27" }),
			fact("Proposed proof_of_public_key = keccak256(nextPublicKey) on the EIPs tracker and named it Teikhos, from the Greek for \"wall\" or \"fortification\".", "https://github.com/ethereum/EIPs/issues/935", { date: "2018-03-19" })
		]
	});
	static puzzles = [
		teikhos0,
		teikhos1,
		teikhos2,
		teikhos3,
		teikhos4
	];
	constructor() {
		super(TeikhosCollection.key, TeikhosCollection.author, TeikhosCollection.puzzles);
	}
};
const teikhos = new TeikhosCollection();
export { TeikhosCollection, teikhos };
