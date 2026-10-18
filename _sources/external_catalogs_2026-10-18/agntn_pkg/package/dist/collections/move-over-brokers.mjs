import { PartyKind, answer, claim, community, compressed, fact, funding, hex, official, party, profile, technique, uncompressed } from "../_chunks/parts.mjs";
import { Status } from "../_chunks/status.mjs";
import { puzzle } from "../_chunks/puzzle.mjs";
import { NamedCollection } from "../_chunks/collection.mjs";
const ARTICLE$12 = "https://kf106.medium.com/everyone-loves-a-treasure-hunt-93885ae8d80a";
const SOLUTION$6 = "https://github.com/floflo777/open-crypto-puzzles/tree/main/2-mid-prizes/keir-finlow-bates-blockchain-book-600ksats";
const ANNOUNCEMENT$7 = "https://github.com/floflo777/open-crypto-puzzles/blob/main/2-mid-prizes/keir-finlow-bates-blockchain-book-600ksats/clues/author-posts.md";
const moveOverBrokersEnEasy1 = puzzle({
	id: "move-over-brokers/en-easy-1",
	chain: "bitcoin",
	address: "14aFhno96fkt7knLWMDQ4j8yh8v5hBF4n1",
	sourceUrl: ARTICLE$12,
	startedAt: "2020-11-28 16:24:07",
	status: Status.Solved,
	pubkey: uncompressed("0479b1b086e28ab7c7f98efb60103b5e0cc01cee15f037dcc616dd49ffc17f9f2516d784f8414813247abeaefe6cd6388df2463cf5df99618aacc9e9c6cb219f1b"),
	key: hex("72048596fda6013a976c22ac4d0b1dbc29a3ca624f4740a64b195ad10f4e1b89").wif("5JgW1WrxCgC4275UqHQfTVpdnyEPJDaaSf76VPCC7Q6KX14Cunc").passphrase("221B Baker Street").derived(),
	techniques: [technique("triple-sha256-brainwallet", SOLUTION$6)],
	prize: .002,
	hints: [
		official("You hold the source of each and every key in your hands... as long as you have a physical copy, that is. Note that there are plenty of red herrings too.", ANNOUNCEMENT$7),
		official("In many cases, you'll have to hash the answer three times.", ANNOUNCEMENT$7),
		community("The book plants the number 221 with a \"check it on your calculator\" nudge in one chapter and titles a section \"Elementary, my dear Watson\" in another.", SOLUTION$6, void 0, {
			date: "2026-08-16",
			answer: answer("221B Baker Street", SOLUTION$6, { date: "2026-08-16" })
		})
	],
	solvedAt: "2022-01-15 06:48:31",
	solveTime: 35648664,
	transactions: [funding("f26ecab737b701982a7a3d0f9b0ffb3c509225cbbefecc2a4fe2e73758ce8972", "2020-11-28 16:24:07", .002), claim("5a4eb010ab4aa23a3946d50a602276551e160042862e95c793e384c5d8cf8011", "2022-01-15 06:48:31", .0019888)],
	solver: party(void 0, { addresses: ["19HBFLhjcoi49jNVe3r7T555rfzPGpeXN3"] })
});
const ARTICLE$11 = "https://kf106.medium.com/everyone-loves-a-treasure-hunt-93885ae8d80a";
const SOLUTION$5 = "https://github.com/floflo777/open-crypto-puzzles/tree/main/2-mid-prizes/keir-finlow-bates-blockchain-book-600ksats";
const ANNOUNCEMENT$6 = "https://github.com/floflo777/open-crypto-puzzles/blob/main/2-mid-prizes/keir-finlow-bates-blockchain-book-600ksats/clues/author-posts.md";
const moveOverBrokersEnEasy2 = puzzle({
	id: "move-over-brokers/en-easy-2",
	chain: "bitcoin",
	address: "14utGQn5GdfPvUrHNLAwTmmP99QpXm9mg6",
	sourceUrl: ARTICLE$11,
	startedAt: "2020-11-28 16:24:07",
	status: Status.Solved,
	pubkey: uncompressed("040714c4e552c597bc72db8686acd2666b0928e179386254e81a3a64abc6016a2e91eb4b814485c9e9534d18b668f7a22f0628675354707dfde9afca96a7fe5a44"),
	key: hex("7c3130229397839e7cb6a1ecb3fc5036368ff85eb2a5ab9ea7bd01c126511ab4").wif("5JkyuL9emDc3QNyMG1MhfPy9r4G9QGnCsqNrCuQFQA1nxMsSafm").passphrase("9781688289970").derived(),
	techniques: [technique("triple-sha256-brainwallet", SOLUTION$5)],
	prize: .002,
	hints: [
		official("You hold the source of each and every key in your hands... as long as you have a physical copy, that is. Note that there are plenty of red herrings too.", ANNOUNCEMENT$6),
		official("In many cases, you'll have to hash the answer three times.", ANNOUNCEMENT$6),
		community("The book signposts it twice, in the Merkle-tree analogy (\"something similar to an ISBN number\") and in the \"familiar numbers\" figure that shows a supermarket barcode.", SOLUTION$5, void 0, {
			date: "2026-09-01",
			answer: answer("9781688289970", SOLUTION$5, { date: "2026-09-01" })
		})
	],
	solvedAt: "2021-01-04 21:33:35",
	solveTime: 3215368,
	transactions: [funding("f26ecab737b701982a7a3d0f9b0ffb3c509225cbbefecc2a4fe2e73758ce8972", "2020-11-28 16:24:07", .002), claim("99212513b13d58dfa745e93d82195d75b666cbc6ea2d84ed995599f2913d7506", "2021-01-04 21:33:35", .00184862)],
	solver: party(void 0, { addresses: ["bc1qgmgffahyllcnstppt4h645dj6kwkk8v9rsg7zg"] })
});
const ARTICLE$10 = "https://kf106.medium.com/everyone-loves-a-treasure-hunt-93885ae8d80a";
const SOLUTION$4 = "https://github.com/floflo777/open-crypto-puzzles/tree/main/2-mid-prizes/keir-finlow-bates-blockchain-book-600ksats";
const ANNOUNCEMENT$5 = "https://github.com/floflo777/open-crypto-puzzles/blob/main/2-mid-prizes/keir-finlow-bates-blockchain-book-600ksats/clues/author-posts.md";
const moveOverBrokersEnHard1 = puzzle({
	id: "move-over-brokers/en-hard-1",
	chain: "bitcoin",
	address: "181rPpfdUGFg4fVEdhDZEfDbBSqgigtoZR",
	sourceUrl: ARTICLE$10,
	startedAt: "2020-11-28 16:24:07",
	status: Status.Solved,
	pubkey: compressed("02b1208312e746964111987da259e19c1af25ebd417c6df0f0d35342043031f05b"),
	key: hex("bb7431f0773cdef6bce0483556b4ad90ec85e4ea4a7d2aad0529b0d571b8bffb").wif("L3W6ZhE2uqHg4e1yrj6vUZTvykYaiMSg1VNyD8CfVTy1zkfVKzcj").seed("carpet baby bicycle betray shift approve barrel phrase measure prevent image brain", "m/44'/0'/0'/0/0"),
	techniques: [technique("partial-key", SOLUTION$4)],
	prize: .002,
	hints: [
		official("You hold the source of each and every key in your hands... as long as you have a physical copy, that is. Note that there are plenty of red herrings too.", ANNOUNCEMENT$5),
		official("In many cases, you'll have to hash the answer three times.", ANNOUNCEMENT$5),
		community("The book prints a 12-word phrase whose twelfth word, \"brand\", fails the BIP39 checksum.", SOLUTION$4, void 0, {
			date: "2026-08-16",
			answer: answer("carpet baby bicycle betray shift approve barrel phrase measure prevent image brain", SOLUTION$4, { date: "2026-08-16" })
		})
	],
	solvedAt: "2026-06-17 22:51:34",
	solveTime: 175156047,
	transactions: [funding("f26ecab737b701982a7a3d0f9b0ffb3c509225cbbefecc2a4fe2e73758ce8972", "2020-11-28 16:24:07", .002), claim("b6e064aa8fde1153c342e2f7d98bce09e004bef5ac8db8f0138601289ceae69a", "2026-06-17 22:51:34", .00199622)],
	solver: party("floflo777", {
		key: "floflo777",
		kind: PartyKind.Person,
		addresses: ["bc1qax0hsnwnxl7393awtc3hsy0ftm6tg4tyk2nfja"],
		facts: [fact("Swapped the book's broken twelfth word for brain, the one word that fixes the checksum, and published the key with the payout.", SOLUTION$4, { date: "2026-08-16" })]
	})
});
const ARTICLE$9 = "https://kf106.medium.com/everyone-loves-a-treasure-hunt-93885ae8d80a";
const SOLUTION$3 = "https://github.com/floflo777/open-crypto-puzzles/tree/main/2-mid-prizes/keir-finlow-bates-blockchain-book-600ksats";
const ANNOUNCEMENT$4 = "https://github.com/floflo777/open-crypto-puzzles/blob/main/2-mid-prizes/keir-finlow-bates-blockchain-book-600ksats/clues/author-posts.md";
const moveOverBrokersEnHard2 = puzzle({
	id: "move-over-brokers/en-hard-2",
	chain: "bitcoin",
	address: "161YgNX2NrCzGunWvoV1hN3DuzWeuovBK3",
	sourceUrl: ARTICLE$9,
	startedAt: "2020-11-28 16:24:07",
	status: Status.Solved,
	pubkey: uncompressed("04563a1dcc9bd3f03c403bef3f80b6258838f2395c9838bfa38ce758b65f4559be2775fd89def3115f475fdd3469e4f0dbcc9635871fa4130337aa565b2b04aaa5"),
	key: hex("9dd0f77d3cc6746cdfe779de61499a88ba4a7fc6a53f90dc276a0c2826679be8").wif("5K1nnZxtT1kDxbzjkwK6GUYBWApcUMDpLVpKNgSvpGxLYhruRTB"),
	techniques: [technique("xor", SOLUTION$3)],
	prize: .002,
	hints: [
		official("You hold the source of each and every key in your hands... as long as you have a physical copy, that is. Note that there are plenty of red herrings too.", ANNOUNCEMENT$4),
		official("In many cases, you'll have to hash the answer three times.", ANNOUNCEMENT$4),
		community("Figure 10, \"A hash function-generated one-time password pad\", prints 7 SHA-256 values built from a deliberately altered pangram.", SOLUTION$3, void 0, {
			date: "2026-08-16",
			answer: answer("XOR the 7 printed 256-bit hex values together, use the 32-byte result directly as the private key, uncompressed public key.", SOLUTION$3, { date: "2026-08-16" })
		})
	],
	solvedAt: "2026-06-25 17:55:05",
	solveTime: 175829458,
	transactions: [funding("f26ecab737b701982a7a3d0f9b0ffb3c509225cbbefecc2a4fe2e73758ce8972", "2020-11-28 16:24:07", .002), claim("c46c70fb04a2faeebde24057b22a547da7b309fd33b74b3d77181943a02b45d0", "2026-06-25 17:55:05", .001996)],
	solver: party("floflo777", {
		key: "floflo777",
		kind: PartyKind.Person,
		addresses: ["bc1qax0hsnwnxl7393awtc3hsy0ftm6tg4tyk2nfja"],
		facts: [fact("Took the caption of Figure 10 literally, XORed its seven hashes into the key and published it with the payout.", SOLUTION$3, { date: "2026-08-16" })]
	})
});
const ARTICLE$8 = "https://kf106.medium.com/everyone-loves-a-treasure-hunt-93885ae8d80a";
const ANNOUNCEMENT$3 = "https://github.com/floflo777/open-crypto-puzzles/blob/main/2-mid-prizes/keir-finlow-bates-blockchain-book-600ksats/clues/author-posts.md";
const moveOverBrokersEnMedium1 = puzzle({
	id: "move-over-brokers/en-medium-1",
	chain: "bitcoin",
	address: "17Y9czcbcCz433QXsy1SGQjwLb27BBtLLZ",
	sourceUrl: ARTICLE$8,
	startedAt: "2020-11-28 16:24:07",
	prize: .002,
	hints: [official("You hold the source of each and every key in your hands... as long as you have a physical copy, that is. Note that there are plenty of red herrings too.", ANNOUNCEMENT$3), official("In many cases, you'll have to hash the answer three times.", ANNOUNCEMENT$3)],
	transactions: [funding("f26ecab737b701982a7a3d0f9b0ffb3c509225cbbefecc2a4fe2e73758ce8972", "2020-11-28 16:24:07", .002)]
});
const ARTICLE$7 = "https://kf106.medium.com/everyone-loves-a-treasure-hunt-93885ae8d80a";
const SOLUTION$2 = "https://github.com/floflo777/open-crypto-puzzles/tree/main/2-mid-prizes/keir-finlow-bates-blockchain-book-600ksats";
const ANNOUNCEMENT$2 = "https://github.com/floflo777/open-crypto-puzzles/blob/main/2-mid-prizes/keir-finlow-bates-blockchain-book-600ksats/clues/author-posts.md";
const moveOverBrokersEnMedium2 = puzzle({
	id: "move-over-brokers/en-medium-2",
	chain: "bitcoin",
	address: "1QFafw3weoWTRQhiLafRw2eyWbVmES6wfJ",
	sourceUrl: ARTICLE$7,
	startedAt: "2020-11-28 16:24:07",
	status: Status.Claimed,
	pubkey: uncompressed("045ec26fe27e6915e337cf99f60a1958483b8d449b80a695244d384a84946be68041cf5d406c07a4c289a5eba065da9c4ca37a62fa913762559e2d3a1d2052e8ac"),
	techniques: [technique("binary", SOLUTION$2), technique("partial-key", SOLUTION$2)],
	prize: .002,
	hints: [
		official("You hold the source of each and every key in your hands... as long as you have a physical copy, that is. Note that there are plenty of red herrings too.", ANNOUNCEMENT$2),
		official("In many cases, you'll have to hash the answer three times.", ANNOUNCEMENT$2),
		community("Figure 9 of the book prints a 16 by 16 black and white bitmap.", SOLUTION$2, void 0, {
			date: "2026-09-01",
			answer: answer("Figure 9's 16-row bitmap read row by row with white cells as 1 bits; the 16th column is not drawn, so its 16 bits are enumerated (65,536 keys) and the uncompressed address is compared. Missing bits 0xb968.", SOLUTION$2, { date: "2026-09-01" })
		})
	],
	solvedAt: "2021-01-10 19:48:24",
	solveTime: 3727457,
	transactions: [funding("f26ecab737b701982a7a3d0f9b0ffb3c509225cbbefecc2a4fe2e73758ce8972", "2020-11-28 16:24:07", .002), claim("1c6720389ded6f3d94d717a7630e6d518ee35840fefea135b48e60217605493c", "2021-01-10 19:48:24", .00180333)],
	solver: party(void 0, { addresses: ["1MpCsuvLTWA4Guo3ZjGG1HYNdvTqZP2eW"] })
});
const ARTICLE$6 = "https://kf106.medium.com/everyone-loves-a-treasure-hunt-93885ae8d80a";
const ANNOUNCEMENT$1 = "https://github.com/floflo777/open-crypto-puzzles/blob/main/2-mid-prizes/keir-finlow-bates-blockchain-book-600ksats/clues/author-posts.md";
const moveOverBrokersEnVeryHard1 = puzzle({
	id: "move-over-brokers/en-very-hard-1",
	chain: "bitcoin",
	address: "1KZei2D5yz3UJ59LvXsC1Y9y4ktSgcnVwz",
	sourceUrl: ARTICLE$6,
	startedAt: "2020-11-28 16:24:07",
	status: Status.Claimed,
	pubkey: uncompressed("04bab3bfe808849e76fc8ae6bebfe88398c3d6b50e26673fbccc3bc4f523dd241b7baef2c00de9b2c58dca0d38c7a0e429e3976c53ef0c6c95c65a86d3f4864fa5"),
	prize: .002,
	hints: [official("You hold the source of each and every key in your hands... as long as you have a physical copy, that is. Note that there are plenty of red herrings too.", ANNOUNCEMENT$1), official("In many cases, you'll have to hash the answer three times.", ANNOUNCEMENT$1)],
	solvedAt: "2021-02-05 08:08:47",
	solveTime: 5931880,
	transactions: [funding("f26ecab737b701982a7a3d0f9b0ffb3c509225cbbefecc2a4fe2e73758ce8972", "2020-11-28 16:24:07", .002), claim("cfe513ddbb400fa9a7477ef96891c14172b981b26e1b8114bc7012a3864a3c89", "2021-02-05 08:08:47", .0017)],
	solver: party(void 0, { addresses: ["1F37VZHQVzuwZu3nHGTTEZUYFojebd6wrA"] })
});
const ARTICLE$5 = "https://kf106.medium.com/everyone-loves-a-treasure-hunt-93885ae8d80a";
const ANNOUNCEMENT = "https://github.com/floflo777/open-crypto-puzzles/blob/main/2-mid-prizes/keir-finlow-bates-blockchain-book-600ksats/clues/author-posts.md";
const moveOverBrokersEnVeryHard2 = puzzle({
	id: "move-over-brokers/en-very-hard-2",
	chain: "bitcoin",
	address: "1DZ5NbUwDgxeJkKhQLgYcUUX36PtYso1pm",
	sourceUrl: ARTICLE$5,
	startedAt: "2020-11-28 16:24:07",
	prize: .002,
	hints: [official("You hold the source of each and every key in your hands... as long as you have a physical copy, that is. Note that there are plenty of red herrings too.", ANNOUNCEMENT), official("In many cases, you'll have to hash the answer three times.", ANNOUNCEMENT)],
	transactions: [funding("f26ecab737b701982a7a3d0f9b0ffb3c509225cbbefecc2a4fe2e73758ce8972", "2020-11-28 16:24:07", .002)]
});
const moveOverBrokersItEasy = puzzle({
	id: "move-over-brokers/it-easy",
	chain: "bitcoin",
	address: "1MEstvLAzc5DzJtvx7uyvKNNUCPN3ofWMK",
	sourceUrl: "https://kf106.medium.com/everyone-loves-a-treasure-hunt-93885ae8d80a",
	startedAt: "2021-09-11 09:28:09",
	status: Status.Claimed,
	pubkey: uncompressed("04f10c61ce57d846cabd47c06efa12ef908db8859ac4342da21d4de99cb5cb99c02205c0c179e5af18be35fb2b58b200c0051c2cc569b97f8fc6a623239bddd04d"),
	prize: .002,
	solvedAt: "2022-02-18 03:16:01",
	solveTime: 13801672,
	transactions: [funding("42919c00a64661e20b8af5719c64d58339e6e492ad21f07f4d38548768cbb23e", "2021-09-11 09:28:09", .002), claim("6112c03dda88afeab1ee32dfa9d5aa2f717edd18b959d7d378f4172d3b231efd", "2022-02-18 03:16:01", .0019888)],
	solver: party(void 0, { addresses: ["1GgupDpwzT3P8BxZ8g4feeapFin5Kx1T4a"] })
});
const ARTICLE$3 = "https://kf106.medium.com/everyone-loves-a-treasure-hunt-93885ae8d80a";
const SOLUTION$1 = "https://github.com/floflo777/open-crypto-puzzles/tree/main/2-mid-prizes/keir-finlow-bates-blockchain-book-600ksats";
const moveOverBrokersItHard = puzzle({
	id: "move-over-brokers/it-hard",
	chain: "bitcoin",
	address: "1QExGvuieS9MvuKC3R1qjp6jGTVcqisTDj",
	sourceUrl: ARTICLE$3,
	startedAt: "2021-09-11 09:28:09",
	status: Status.Solved,
	pubkey: uncompressed("0415baad0594ce555fc1f3a695cfcc34be55a4c83b312f48092addbdd17ead7602e53844e722f666be11757ba37f63c5734d276ec26e362e933e922646890654cf"),
	key: hex("b99d16572661d00fd7a18a6b4ed6e7311eb930798c790b573c8942ca4b12e37f").wif("5KE2qELS41zdVG1e6mu3wNE2hJCejty1f1GAvCCrgGyuX57ERQt").passphrase("Genova Firenze Bologna Brindisi"),
	techniques: [technique("triple-sha256-brainwallet", SOLUTION$1)],
	prize: .002,
	hints: [community("A paragraph found only in the Italian front matter thanks three people for a trip and closes \"Non sarei riuscito a farlo senza voi tre.\"", SOLUTION$1, void 0, {
		date: "2026-08-16",
		answer: answer("Genova Firenze Bologna Brindisi", SOLUTION$1, { date: "2026-08-16" })
	})],
	solvedAt: "2026-07-03 23:28:02",
	solveTime: 151768793,
	transactions: [funding("42919c00a64661e20b8af5719c64d58339e6e492ad21f07f4d38548768cbb23e", "2021-09-11 09:28:09", .002), claim("ad999c5837e67b4d566516a70344b352c4c688e1a0781eed739be3aad3afb20c", "2026-07-03 23:28:02", .001996)],
	solver: party("floflo777", {
		key: "floflo777",
		kind: PartyKind.Person,
		addresses: ["bc1qax0hsnwnxl7393awtc3hsy0ftm6tg4tyk2nfja"],
		facts: [fact("Read the three people thanked in the Italian acknowledgements as the three rounds of SHA-256, hashed the four cities of their trip and published the key with the payout.", SOLUTION$1, { date: "2026-08-16" })]
	})
});
const ARTICLE$2 = "https://kf106.medium.com/everyone-loves-a-treasure-hunt-93885ae8d80a";
const SOLUTION = "https://github.com/floflo777/open-crypto-puzzles/tree/main/2-mid-prizes/keir-finlow-bates-blockchain-book-600ksats";
const moveOverBrokersItMedium = puzzle({
	id: "move-over-brokers/it-medium",
	chain: "bitcoin",
	address: "1Q78hDeaHXQbuCSQxG1uPAc4V3jsuVUG9r",
	sourceUrl: ARTICLE$2,
	startedAt: "2021-09-11 09:28:09",
	status: Status.Solved,
	pubkey: compressed("029a2fb6e89407276d8fd5baf13ba81bfa51f59db78917693a6d7879f844fa5baf"),
	key: hex("578df2fef081d6c5430a5a815515412930ee5d6cf6b0f92aab04a4a121067ecd").wif("Kz9uTuc4bo9FczbmcuAeuXqeV9AHQnpV8U56dKeepoKxnqccDboF").seed("orologio snervato mugnaio enzima scienza glutine spargere valletta diametro pianta totano civetta", "m/44'/0'/0'/0/0"),
	prize: .002,
	hints: [community("The Italian edition prints 12 English words in its entropy passage, in the spot where the English edition prints a mnemonic.", SOLUTION, void 0, {
		date: "2026-08-16",
		answer: answer("orologio snervato mugnaio enzima scienza glutine spargere valletta diametro pianta totano civetta", SOLUTION, { date: "2026-08-16" })
	})],
	solvedAt: "2026-07-01 20:46:46",
	solveTime: 151586317,
	transactions: [funding("42919c00a64661e20b8af5719c64d58339e6e492ad21f07f4d38548768cbb23e", "2021-09-11 09:28:09", .002), claim("914a825138f943fc357b5a026b607b3c62bf67d5997043761711aaeabf5cab49", "2026-07-01 20:46:46", .001996)],
	solver: party("floflo777", {
		key: "floflo777",
		kind: PartyKind.Person,
		addresses: ["bc1qax0hsnwnxl7393awtc3hsy0ftm6tg4tyk2nfja"],
		facts: [fact("Translated the twelve words into the Italian BIP39 list, kept the one of 64 spellings that derives the address and published the key with the payout.", SOLUTION, { date: "2026-08-16" })]
	})
});
const moveOverBrokersItVeryHard = puzzle({
	id: "move-over-brokers/it-very-hard",
	chain: "bitcoin",
	address: "19kkawFcg2U2s6vq368MXD7FJU9JZvRrjA",
	sourceUrl: "https://kf106.medium.com/everyone-loves-a-treasure-hunt-93885ae8d80a",
	startedAt: "2021-09-11 09:28:09",
	prize: .002,
	transactions: [funding("42919c00a64661e20b8af5719c64d58339e6e492ad21f07f4d38548768cbb23e", "2021-09-11 09:28:09", .002)]
});
const ARTICLE = "https://kf106.medium.com/everyone-loves-a-treasure-hunt-93885ae8d80a";
var MoveOverBrokersCollection = class MoveOverBrokersCollection extends NamedCollection {
	static key = "move-over-brokers";
	static author = party("Keir Finlow-Bates", {
		key: "keir-finlow-bates",
		kind: PartyKind.Person,
		about: "Blockchain author and founder of Chainfrog who hid twelve Bitcoin keys in his own book and its Italian translation, then forgot them on purpose.",
		profiles: [profile("medium", "https://kf106.medium.com/"), profile("github", "https://github.com/kf106")],
		facts: [
			fact("Hid eight private keys in Move Over Brokers, Here Comes The Blockchain and sent 0.002 BTC to each address a few days before the book came out in late 2020.", ARTICLE, { date: "2025-09-11" }),
			fact("Designed four more puzzles for the Italian edition, Scansatevi Broker, after the Bitcoin price had more than doubled.", ARTICLE, { date: "2025-09-11" }),
			fact("Wrote that he keeps no record of the twelve private keys and no notes on how the puzzles were built.", ARTICLE, { date: "2025-09-11" }),
			fact("Runs Chainfrog Oy as its CEO and founder.", "https://github.com/kf106")
		]
	});
	static puzzles = [
		moveOverBrokersEnEasy1,
		moveOverBrokersEnEasy2,
		moveOverBrokersEnMedium1,
		moveOverBrokersEnMedium2,
		moveOverBrokersEnHard1,
		moveOverBrokersEnHard2,
		moveOverBrokersEnVeryHard1,
		moveOverBrokersEnVeryHard2,
		moveOverBrokersItEasy,
		moveOverBrokersItMedium,
		moveOverBrokersItHard,
		moveOverBrokersItVeryHard
	];
	constructor() {
		super(MoveOverBrokersCollection.key, MoveOverBrokersCollection.author, MoveOverBrokersCollection.puzzles);
	}
};
const moveOverBrokers = new MoveOverBrokersCollection();
export { MoveOverBrokersCollection, moveOverBrokers };
