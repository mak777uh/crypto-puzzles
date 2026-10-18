import { answer, claim, compressed, funding, increase, official, source, technique, wif } from "../_chunks/parts.mjs";
import { Status } from "../_chunks/status.mjs";
import { puzzle } from "../_chunks/puzzle.mjs";
import { NumericCollection } from "../_chunks/collection.mjs";
import { QuizchainCollection } from "../_chunks/quizchain.mjs";
const THREAD$76 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bn5ucg/77_mbtc_quizchain2_block_1/";
const quizchain2Block1 = puzzle({
	id: "quizchain2/1",
	chain: "bitcoin",
	address: "15BbSHKqRsaH9oGk8zfTD5NZfRdXyySvMS",
	sourceUrl: THREAD$76,
	startedAt: "2019-05-11 00:21:12",
	status: Status.Solved,
	pubkey: compressed("03bb9076fd7548a8bb6e28887eddbecba9c70fca75ebe4a926bbee1ca3384a0834"),
	key: wif("L39LYDM5ehxxN9H6MLwQ2duJbsVucNuoHwZJAaYfLhL9RtHVHZAt").entropy("33c6780dcbd5927d8510d924278a0e4e", source(THREAD$76, "MD5 of the band, TOMI, two words and the whole block 76 key of the first run")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$76)],
	prize: .077,
	hints: [
		official("Question: A rather famous naMe.", THREAD$76, void 0, { answer: answer("As the winner has explained in comments, solution was U2 (a rather famous band name). And it was derived from the hint by reading M upside down and then W as UU, which is one step away from the solution. TOMI field was just \"upside down\".", THREAD$76) }),
		official("Format: [solution] TOMI [TOMI] [link]", THREAD$76, void 0, { answer: answer("U2 TOMI upside down L2e6gPSXnq7KJBfkoD7cHGVZuhRUDARJz2Cc9JcSNLsKRZhH552F", "https://www.reddit.com/r/bitcoinpuzzles/comments/bn5ucg/comment/endzxka/") }),
		official("Use L2e6gPSXnq7KJBfkoD7cHGVZuhRUDARJz2Cc9JcSNLsKRZhH552F (private key of block 76) as a link for this block.", THREAD$76),
		official("FIrst three digits of MD5 hash are 33c.", THREAD$76),
		official("First digit of MD5 hash of solution only is 4.", THREAD$76),
		official("First digit of MD5 hash of TOMI field only is e.", THREAD$76),
		official("Hint: Uses method of a recent previous block.", "https://www.reddit.com/r/bitcoinpuzzles/comments/bn5ucg/comment/en7okiq/"),
		official("One in the ten between 67 and 76.", "https://www.reddit.com/r/bitcoinpuzzles/comments/bn5ucg/comment/ena1bdm/"),
		official("Hint number 2: block 69", "https://www.reddit.com/r/bitcoinpuzzles/comments/bn5ucg/comment/endvvgh/")
	],
	solvedAt: "2019-05-13 23:25:35",
	solveTime: 255863,
	transactions: [funding("d79b97700a9a55b346c38820c1194cda0fe73ca1b831ae63cfb2e16e446eb90b", "2019-05-11 00:21:12", .077), claim("c7dc06980a2986191465cc1c47612bec051693d6f8d4118ecc5f9131a84af8ca", "2019-05-13 23:25:35", .07669453)]
});
const THREAD$75 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bqerv5/7_mbtc_quizchain2_block_10/";
const quizchain2Block10 = puzzle({
	id: "quizchain2/10",
	chain: "bitcoin",
	address: "1BaxjCt2ejWghHGf41yic1mLmbFSnikAjP",
	sourceUrl: THREAD$75,
	startedAt: "2019-05-18 04:25:51",
	status: Status.Solved,
	pubkey: compressed("02a67ab5cf0ac124576263b769b90461b6c9692f3e5427cab59a72032254932ef6"),
	key: wif("L4AuzcFxev8S7quRsoHfhB8dXXtgfuWR6Y7EcxtfE3RCFF9rVWWY").entropy("a5b7b7b212835bbeb75e9d14c5355e07", source(THREAD$75, "MD5 of the word, TOMI and three words")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$75)],
	prize: .007,
	hints: [
		official("Question: There are three common words in the English language ending in \"gry\". Angry, hungry, and one other word. What is the third word?", THREAD$75, void 0, { answer: answer("Solution was ghost, method was to look in the mnemonic of the previous block, which was also used in block 6 of this second run. TOMI field was previous block mnemonic.", THREAD$75) }),
		official("Format: [solution] TOMI [TOMI]", THREAD$75, void 0, { answer: answer("ghost TOMI previous block mnemonic", "https://www.reddit.com/r/bitcoinpuzzles/comments/bqerv5/comment/eobvhi6/") }),
		official("Format for TOMI field is [word1 word2 word3], all in lower case letters.", THREAD$75),
		official("Would be solved at sight except for the slight extra twist that I included.", THREAD$75, void 0, { answer: answer("The twist was not taking the obvious choice (third word from the beginning), but the third word from the end of the list.", THREAD$75) }),
		official("First three digits of MD5 hash are a5b.", THREAD$75),
		official("Hint 1 (after 24 hours): Method for this block was used in previous blocks (once already also in second run), look at \"Complete Quizchain\" chapter in Wattpad story for inspiration.", THREAD$75),
		official("Hint 2 (after 48 hours): Method for this block was the same as in block 6, go back to previous block to look up solution.", THREAD$75)
	],
	solvedAt: "2019-05-21 14:22:26",
	solveTime: 294995,
	transactions: [funding("c1f1d772594ee1aaca6cf17ee48beb5b2ada35c3c1601482a69f46e94c4dd1ac", "2019-05-18 04:25:51", .007), claim("fb0eaa30edb6cd98913ef823aeaf911a7f266b21d8fd261ae418afdaeff8f7b4", "2019-05-21 14:22:26", .00687654)]
});
const THREAD$74 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bqqiot/7_mbtc_quizchain2_block_11/";
const quizchain2Block11 = puzzle({
	id: "quizchain2/11",
	chain: "bitcoin",
	address: "14wH4M6Ej19LM5h6BxAQMVdD1ba86SPSsv",
	sourceUrl: THREAD$74,
	startedAt: "2019-05-19 12:52:01",
	status: Status.Solved,
	pubkey: compressed("02455a7f030dfb2770ffdda9db09d2a0a0041594bd418d8f0b164e97fb24d02cdc"),
	key: wif("KyjAP9JR7pn5Bz98cqyp3PZNpdnw2nGzotA2enpTrT5trNQ5GoEF").entropy("057e2b3773eafe634f5b769161e920cb", source(THREAD$74, "MD5 of one space, TOMI and two words")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$74)],
	prize: .007,
	hints: [
		official("This will be a simple block similar to block 11 of the first round with a very simple solution. It will be so simple and obvious that I don't even need a question for the block.", THREAD$74, void 0, { answer: answer("Starting from nothing, the two alternatives are one space and one line break. For this block I chose the first alternative, with \"one space\" as the TOMI field.", THREAD$74) }),
		official("Format: [solution] TOMI [TOMI]", THREAD$74, void 0, { answer: answer("Got it. There is one space for solution and one space before TOMI.", "https://www.reddit.com/r/bitcoinpuzzles/comments/bqqiot/comment/eobz5fy/") }),
		official("FIrst three digits of MD5 hash are 057.", THREAD$74),
		official("MD5 hash of solution only is 7.", THREAD$74),
		official("MD 5 hash of TOMI field only is 1.", THREAD$74)
	],
	solvedAt: "2019-05-21 11:21:51",
	solveTime: 167390,
	transactions: [funding("95f7f474d73310fc53748a17c20abc03e592ac557dc96f438c550a37fc0be23e", "2019-05-19 12:52:01", .007), claim("a06ea1010916a65effb31875a50405be93a567021cda21059af3d41cfcae9734", "2019-05-21 11:21:51", .00668294)]
});
const THREAD$73 = "https://www.reddit.com/r/bitcoinpuzzles/comments/br2rys/7_mbtc_quizchain2_block_12/";
const quizchain2Block12 = puzzle({
	id: "quizchain2/12",
	chain: "bitcoin",
	address: "187Q5XNNezeyBYgwY8gL2swXUWtWvwyqZ6",
	sourceUrl: THREAD$73,
	startedAt: "2019-05-20 12:28:07",
	status: Status.Solved,
	pubkey: compressed("0342c1f5fffae5de54bd0e823cff65f7b193851f4428e685e43355d5f9c57ef559"),
	key: wif("KzWPBGPJsFFDXGRawczb5XqsMauPTXzpJ5YrXkTRNfwchSpkmrXT").entropy("b08d3726d3fdd5804cd40ea395be2658", source(THREAD$73, "MD5 of the corrected word, TOMI and three words")),
	techniques: [technique("md5-to-bip39-entropy", THREAD$73)],
	prize: .007,
	hints: [
		official("The question uses four words, with three of them in brackets. That means those three are supposed to be replaced by one word and then the resulting two words are supposed to be transformed into a one word solution.", THREAD$73),
		official("Question: (intentionally keeping secret) ring", THREAD$73, void 0, { answer: answer("Solution: The three words in brackets are one of the meanings for the word \"coy\" I found online. I thought that was a nice match for a puzzle. The words \"coy ring\" resolve as an anagram to Grycoin. So solution was Grycoin, TOMI field was coy ring anagram.", THREAD$73) }),
		official("Format: [solution] TOMI [TOMI]", THREAD$73, void 0, { answer: answer("grycoin TOMI coy ring anagram", "https://www.reddit.com/r/bitcoinpuzzles/comments/br2rys/comment/eoasr0u/") }),
		official("TOMI field is three words, the last one of them is anagram.", THREAD$73),
		official("First three digits of MD5 hash are b08.", THREAD$73),
		official("First digit of solution only MD5 hash is 0.", THREAD$73),
		official("First digit of TOMI field only MD5 hash is 3.", THREAD$73),
		official("All three words in TOMI field are all lower case, no upper case letter in TOMI field. One word solution has first letter only in upper case, like this example: Upper.", "https://www.reddit.com/r/bitcoinpuzzles/comments/br2rys/comment/eo9mu37/", void 0, { answer: answer("As noted in comments, solution was grycoin, not Grycoin. First mistake of this round.", THREAD$73) }),
		official("It is one of the meanings of the word.", "https://www.reddit.com/r/bitcoinpuzzles/comments/br2rys/comment/eo9mw5p/"),
		official("Neither very common nor very unusual.", "https://www.reddit.com/r/bitcoinpuzzles/comments/br2rys/comment/eo9wogo/"),
		official("The last TOMI word is not \"an anagram\" it is \"anagram\".", "https://www.reddit.com/r/bitcoinpuzzles/comments/br2rys/comment/eo9wl5a/"),
		official("Solution word is anagram of the other two TOMI words combined...", "https://www.reddit.com/r/bitcoinpuzzles/comments/br2rys/comment/eoaab0d/"),
		official("It is the second of three words in the TOMI field.", "https://www.reddit.com/r/bitcoinpuzzles/comments/br2rys/comment/eoafnl3/")
	],
	solvedAt: "2019-05-21 06:46:58",
	solveTime: 65931,
	transactions: [funding("b7939af53e5a465d8e12efef65ba13f9d96bbab87045c83fa11fda34b16545e4", "2019-05-20 12:28:07", .007), claim("15ec49c6b949804e0bd8f3f738a438627c74e978ee88a4cf81a3e1aa7420160a", "2019-05-21 06:46:58", .00655072)]
});
const THREAD$72 = "https://www.reddit.com/r/Grycoin/comments/brogvu/7_mbtc_quizchain2_block_13/";
const quizchain2Block13 = puzzle({
	id: "quizchain2/13",
	chain: "bitcoin",
	address: "1KZ2riUcEkAebmPrGYhSJwC4f9EZohZWkW",
	sourceUrl: THREAD$72,
	startedAt: "2019-05-21 07:11:03",
	status: Status.Solved,
	pubkey: compressed("0344193ee4b704045e85c197bab2862e12db7fe792a7a9f2dcf594de7df4325b78"),
	key: wif("L2AH6wtNHQjdRftfuHd5VKXiGh3RB4HNm2tiBF8i9MKKzxLuYJTU").entropy("b5e4cbfe80a8b7a927101b882ed00c91", source(THREAD$72, "MD5 of the word, TOMI and a name")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$72), technique("atbash", THREAD$72)],
	prize: .007,
	hints: [
		official("Question: Kraaz", THREAD$72, void 0, { answer: answer("Method was using Atbash on the solution Pizza (for Bitcoin Pizza day today). The most difficult part was getting the spelling of the name Laszlo Hanyecz right, which went into the TOMI field.", THREAD$72) }),
		official("Format: [Solution] TOMI [TOMI]", THREAD$72, void 0, { answer: answer("Solution as mentioned in other comments is \"Pizza TOMI Laszlo Hanyecz\".", "https://www.reddit.com/r/Grycoin/comments/brogvu/comment/eofcjjh/") }),
		official("Tomi field is the relevant name for the solution.", THREAD$72),
		official("First three digits of MD5 hash are b5e.", THREAD$72),
		official("First digit of solution only is c.", THREAD$72),
		official("First digit of TOMI field only is f.", THREAD$72)
	],
	solvedAt: "2019-05-22 13:06:33",
	solveTime: 107730,
	transactions: [funding("7984db3918bf18688403e3b7f5d2bd133023a2ba38ea5442e310df80a0a708e5", "2019-05-21 07:11:03", .007), claim("eea395e5b3f3e48e836dc7cf19c1c91341a51f0ce5d8c0b433256c6991d75f73", "2019-05-22 13:06:33", .0063616)]
});
const THREAD$71 = "https://www.reddit.com/r/Grycoin/comments/bs06rg/77_mbtc_quizchain2_block_14/";
const quizchain2Block14 = puzzle({
	id: "quizchain2/14",
	chain: "bitcoin",
	address: "1JkKLAKSQ6BmC26DZbTgcpqBNUf91aeojd",
	sourceUrl: THREAD$71,
	startedAt: "2019-05-21 23:54:35",
	status: Status.Solved,
	pubkey: compressed("02a4780dd6045c8e96211360c19fb5d95810480638fbee20975b972a915dd0b54d"),
	key: wif("L4QU6j4wVq6pgpnYiUboCCETaGGJVdjp1JYRJtDAqg42FVoV5WG8").entropy("5f844f86af9217915e3764d92974b696", source(THREAD$71, "MD5 of the fourteen characters")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$71)],
	prize: .077,
	hints: [
		official("Question: 14 from 7.", THREAD$71, void 0, { answer: answer("As indicated by the winner, who is totally not me, solution was the first and the last seven digits of the genesis block address, not counting the prefix 1. A1zP1eP7DivfNa.", THREAD$71) }),
		official("Format: [solution]", THREAD$71, void 0, { answer: answer("Solution was A1zP1eP7DivfNa.", "https://www.reddit.com/r/Grycoin/comments/bs06rg/comment/eoprx9p/") }),
		official("Hint: The solution is not something as simple as \"2\", which is already apparent from the lack of TOMI field.", THREAD$71),
		official("First three digits of MP5 hash are 5f8.", THREAD$71),
		official("Update: Correct is \"MD5\" hash.", THREAD$71),
		official("Hint for this was already available at the time of posting at the Wattpad story.", THREAD$71),
		official("Red seven.", THREAD$71)
	],
	solvedAt: "2019-05-25 08:40:22",
	solveTime: 290747,
	transactions: [funding("377e5148989442048659eaa3dd6bcd7423e7f8ba3cd41433bc66f108e50f1e01", "2019-05-21 23:54:35", .077), claim("25ca033024725ef7742c99565a0f58484f213564ae16ae3c8dc8aa2990a8c603", "2019-05-25 08:40:22", .07656992)]
});
const THREAD$70 = "https://www.reddit.com/r/Grycoin/comments/bscc8b/7_mbtc_quizchain2_block_15/";
const quizchain2Block15 = puzzle({
	id: "quizchain2/15",
	chain: "bitcoin",
	address: "1BQkqXXsrDrjbDk8KXkXoxzj8jjfUzvXD6",
	sourceUrl: THREAD$70,
	startedAt: "2019-05-22 04:19:33",
	status: Status.Solved,
	pubkey: compressed("0206ca3e9669dec22a101dbf7909ef8d1327dfe3893db43db1b75d37a7ce40b704"),
	key: wif("KxKmRVBkqQESJrVAxLmHuQPtFJA2dbfwxM3pUs27W5C238Mri75N").entropy("ae36a5a194f8daca9f3034d8ca6a3947", source(THREAD$70, "MD5 of the one word")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$70)],
	prize: .007,
	hints: [official("Question: Thinking only method.", THREAD$70, void 0, { answer: answer("Solution was TOMI. And that was all.", THREAD$70) }), official("Format: [solution]", THREAD$70)],
	solvedAt: "2019-05-24 04:07:01",
	solveTime: 172048,
	transactions: [funding("6b42515fd718adb197f25592b2f087eab7516b13479f09164a33ddfa544b0fd4", "2019-05-22 04:19:33", .007), claim("70efea2e43b3281138e6ae2ecfb2ae7acdcea3119cfb3482bee5c6cb4847f155", "2019-05-24 04:07:01", .0048)]
});
const THREAD$69 = "https://www.reddit.com/r/Grycoin/comments/bsccmw/7_mbtc_quizchain_2_block_16/";
const PLAYER_COMMENT$46 = "https://www.reddit.com/r/Grycoin/comments/bsccmw/comment/eopmxex/";
const quizchain2Block16 = puzzle({
	id: "quizchain2/16",
	chain: "bitcoin",
	address: "1JVXDyfoZMYaKPu2XYZpWVk9K8bGbFQLTU",
	sourceUrl: THREAD$69,
	startedAt: "2019-05-24 01:49:56",
	status: Status.Solved,
	pubkey: compressed("02a1fe675edae6db2bebfefdc8998877a33ff7f3d7cd413b96cfee166d89b929d3"),
	key: wif("L5FzJxW7EFxBvxa3gZa2AtVwdPriP3UYcCH7WRuzVWdjdUbA5AMF").entropy("bbc3a6f7d13ab0fc07863e6ba04f6636", source(THREAD$69, "MD5 of the name, TOMI and nine characters")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$69)],
	prize: .007,
	hints: [
		official("Question: Difficult name found in 2012.", THREAD$69, void 0, { answer: answer("Solution was: ELiZABETH TOMI dzGTuQeg2 from a vanity address 1ELiZABETHdzGTuQeg2RnCcWBMVo3ySfTz that was a record 9 characters long found in 2012.", PLAYER_COMMENT$46) }),
		official("Format: [solution] TOMI [TOMI]", THREAD$69),
		official("Capitalization of solution will be obvious if you find the correct method. TOMI will be a string of 9 random characters, also obvious from the method.", THREAD$69, void 0, { answer: answer("(the 9 characters for the TOMI are the random characters after ELiZABETH)", PLAYER_COMMENT$46) }),
		official("First three characters of MD5 hash are bbc.", THREAD$69),
		official("Update: By popular demand, first digit of MD5 hash of solution only is 3.", THREAD$69),
		official("9 random characters TOMI field and 9 characters name.", THREAD$69)
	],
	solvedAt: "2019-05-25 07:23:02",
	solveTime: 106386,
	transactions: [funding("66fbf3b11305dcfe2deababb186422ae6ec5624454ce7c15b8220a50a61477ba", "2019-05-24 01:49:56", .007), claim("c003b65e1744ae13fd44026c15f3a26c2912a5ccb59931571acdb69d1ed5f668", "2019-05-25 07:23:02", .00656992)]
});
const THREAD$68 = "https://www.reddit.com/r/Grycoin/comments/bsnke3/7_mbtc_quizchain2_block_17/";
const quizchain2Block17 = puzzle({
	id: "quizchain2/17",
	chain: "bitcoin",
	address: "19XZ9YAN4GHdktoWU6W6mZKLQZUoUFeFfb",
	sourceUrl: THREAD$68,
	startedAt: "2019-05-24 12:23:12",
	status: Status.Solved,
	pubkey: compressed("0314c0b41514a2c034c719c45eb0adde55ea1e72d3859868ddb5b9a8ccb5b3099e"),
	key: wif("KzY3p5xmbMZ1KCoPV2EHXGfrTQuBoxbomPSrk7znSFHr2abY4b8n").entropy("885f0a95963d544208ebb0ac6f2a8b7a", source(THREAD$68, "MD5 of the letters, TOMI and two words")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$68)],
	prize: .008,
	hints: [
		official("Question: 500 years in the right eye", THREAD$68, void 0, { answer: answer("Solved at sight, solution was LV, TOMI field Mona Lisa. It took about 500 years for someone to notice that Leonardo signed his work there...", THREAD$68) }),
		official("Format: [solution] TOMI [TOMI]", THREAD$68, void 0, { answer: answer("Solved! \"LV TOMI Mona Lisa\"", "https://www.reddit.com/r/Grycoin/comments/bsnke3/comment/eooiqyb/") }),
		official("FIrst three digits of MD5 hash are 885.", THREAD$68),
		official("First digit of solution only MD5 hash is a.", THREAD$68),
		official("First digit of TOMI only MD5 hash is f.", THREAD$68)
	],
	solvedAt: "2019-05-24 23:05:03",
	solveTime: 38511,
	transactions: [funding("64eb4eae0b4d74875a580f3b7f192ef4cecb1ef2c1e679721589c5cee2b85bd8", "2019-05-24 12:23:12", .008), claim("d903c67367df9e9741f701907143bfce92dd46a7b10eca889879baf35d68639f", "2019-05-24 23:05:03", .00753203)]
});
const THREAD$67 = "https://www.reddit.com/r/Grycoin/comments/bt7mfm/7_mbtc_quizchain2_block_18/";
const quizchain2Block18 = puzzle({
	id: "quizchain2/18",
	chain: "bitcoin",
	address: "1CoKBUPvFLYqveXHdDH9myVfy1JJUzhUKU",
	sourceUrl: THREAD$67,
	startedAt: "2019-05-25 12:15:21",
	status: Status.Solved,
	pubkey: compressed("0392c3fa070d340d728d05709f9d4ab3044460e3d3df7c46a173b9172314c37705"),
	key: wif("L5UUv9E62y1T4hEwwN5qFQEsieTLAyeCukPiRcwDtUyzMcBzKL6g").entropy("8e9fa5f8ab8ee60b581353cb199f332b", source(THREAD$67, "MD5 of the number, TOMI and one word")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$67)],
	prize: .007,
	hints: [
		official("Question: Third.", THREAD$67, void 0, { answer: answer("TOMI field was Halvening, the number 6.25.", THREAD$67) }),
		official("Format: [solution] TOMI [TOMI]", THREAD$67),
		official("Solution is a number. TOMI field is one word, first letter only in Capital.", THREAD$67),
		official("First three digits of MD5 hash are 8e9.", THREAD$67),
		official("First digit of solution only MD5 hash is d.", THREAD$67),
		official("FIrst digit of TOMI field only MD5 hash is 0.", THREAD$67)
	],
	solvedAt: "2019-05-26 16:52:37",
	solveTime: 103036,
	transactions: [funding("469418b9fa29d9e6c20b42ebbe39ff8bbe092d43e03a98560b81f791aa351c42", "2019-05-25 12:15:21", .007), claim("36a6a0b1e39b4f2004d89be3aa813f1b23e33bceb99c650bd1109d53a802c81d", "2019-05-26 16:52:37", .0069)]
});
const THREAD$66 = "https://www.reddit.com/r/Grycoin/comments/btjb8j/7_mbtc_quizchain2_block_19/";
const quizchain2Block19 = puzzle({
	id: "quizchain2/19",
	chain: "bitcoin",
	address: "19HcFFX5iyW5y7FW8qQvsbsJjh6EnyFH7s",
	sourceUrl: THREAD$66,
	startedAt: "2019-05-27 03:54:16",
	status: Status.Solved,
	pubkey: compressed("02558d14916fcc01aec0f71509dac8f5876152c870f7fdf6d67c4977320e621217"),
	key: wif("Kz96DNRR6XXACtfnDCoj8trAt69HcK9NGJy8F4pFeq6BVrPsP79P").entropy("1470f0bd9262f71b15261cebc7d97aad", source(THREAD$66, "MD5 of the one word")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$66)],
	prize: .007,
	hints: [
		official("Question: Before Bitcoin", THREAD$66, void 0, { answer: answer("Solution was Cypherpunks, since that is the mindset where Bitcoin comes from.", THREAD$66) }),
		official("Format: [solution]", THREAD$66, void 0, { answer: answer("The solution is \"Cypherpunks\"! :3", "https://www.reddit.com/r/Grycoin/comments/btjb8j/comment/eoyvf87/") }),
		official("FIrst three digits of MD5 hash are 147.", THREAD$66)
	],
	solvedAt: "2019-05-27 08:53:31",
	solveTime: 17955,
	transactions: [funding("dd61d9a8d06c4303008372726bf61fdc624a759e3b3f8e6bd2b167e82594e14e", "2019-05-27 03:54:16", .007), claim("82677fa3fb0f78cac1d92ff2824cfc372a6b2dc189841735ef508df2fe27dc5b", "2019-05-27 08:53:31", .00659473)]
});
const THREAD$65 = "https://www.reddit.com/r/Grycoin/comments/btveri/7_mbtc_quizchain2_block_20/";
const quizchain2Block20 = puzzle({
	id: "quizchain2/20",
	chain: "bitcoin",
	address: "1FKbrfG7xgfYKVx9U9o3H9CViXsWrbZsFt",
	sourceUrl: THREAD$65,
	startedAt: "2019-05-28 01:17:18",
	status: Status.Solved,
	pubkey: compressed("0347a62e632fc1a03af4e11506def7b3ab5ee70ba41c36f2863c1ba9d2fc8cf392"),
	key: wif("Kz3J4BtaGup2TZTxH9h8y5wWCUmxL5KGsx6R9P8DY3z1NSuhWaWe").entropy("497f112e67d5e049ee7f9a6d2fe6acf8", source(THREAD$65, "MD5 of the two words")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$65)],
	prize: .007,
	hints: [
		official("Question : 1AndrewYangForPresident2o2o6zmPzd", THREAD$65, void 0, { answer: answer("Solution was just \"burn address\".", THREAD$65) }),
		official("Format: [solution]", THREAD$65, void 0, { answer: answer("The solution is simply \"burn address\".", "https://www.reddit.com/r/Grycoin/comments/btveri/comment/ep33zng/") }),
		official("First three digits of MD5 hash are 497.", THREAD$65)
	],
	solvedAt: "2019-05-28 04:10:09",
	solveTime: 10371,
	transactions: [funding("4e96917f57f6d2736054dfe7db0d082ee13cbe6164f3279b74286765a6ec2809", "2019-05-28 01:17:18", .007), claim("20379ff2571b0741b0a81a78de1454ae8f4e203191b409b4f559a22f4acbd7ad", "2019-05-28 04:10:09", .00659066)]
});
const THREAD$64 = "https://www.reddit.com/r/Grycoin/comments/bu6umc/7_mbtc_quizchain2_block_21/";
const quizchain2Block21 = puzzle({
	id: "quizchain2/21",
	chain: "bitcoin",
	address: "145XVhfc2hbPxtkQbB9VKyjigA5EZ9gTKq",
	sourceUrl: THREAD$64,
	startedAt: "2019-05-28 11:32:43",
	status: Status.Solved,
	pubkey: compressed("03029fb4e3bc3bbaffa36e95b7441c9f24051cae196b7d37c70d1cf4d89b7d67c0"),
	key: wif("L3Pg58Hf7C15Bmy8ejYsKk2AyfmJQeR5826bc3piGRVj4h4GAVXM").entropy("72e49243678e88024aa76afeeadfed34", source(THREAD$64, "MD5 of the number, TOMI and three words")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$64)],
	prize: .007,
	hints: [
		official("Question: Can you solve this block without any question?", THREAD$64, void 0, { answer: answer("The solution was obviously 21 million (the limit on the number of bitcoins), which reduced the task to finding the TOMI field. I chose \"fixed money supply\" for that.", THREAD$64) }),
		official("Format: [solution] TOMI [TOMI]", THREAD$64, void 0, { answer: answer("solved: 21 million TOMI fixed money supply", "https://www.reddit.com/r/Grycoin/comments/bu6umc/comment/epdq8m4/") }),
		official("FIrst three digits of hash are 72e.", THREAD$64),
		official("Update: First digit of solution only MD5 hash is 9.", THREAD$64),
		official("First digit of TOMI field only MD5 hash is f.", THREAD$64),
		official("You know only the block number.", THREAD$64),
		official("Might the number 21 be significant in the Bitcoin space somehow? Oh, and TOMI field is three words in lower case.", THREAD$64)
	],
	solvedAt: "2019-05-29 23:06:39",
	solveTime: 128036,
	transactions: [funding("e7c7fa6c814f13602458d22ed9dec0c77a15296be304aab53aa6df3dcbfe6bee", "2019-05-28 11:32:43", .007), claim("7935256020dbe82e906fd3a04c8db33cc27bc2604308b8deb88d090a713db9ec", "2019-05-29 23:06:39", .00653449)]
});
const THREAD$63 = "https://www.reddit.com/r/Grycoin/comments/busqnm/prize_claimed_before_posting_quizchain2_block_22/";
const quizchain2Block22 = puzzle({
	id: "quizchain2/22",
	chain: "bitcoin",
	address: "1CU5ZeSC65qXpEztyHAFagz7PfHaio7a59",
	sourceUrl: THREAD$63,
	startedAt: "2019-05-30 03:16:17",
	status: Status.Solved,
	pubkey: compressed("03a38ae1ebff619d8232915bc1d86c3c826452de548e6d0a6836a50c4450c51fbb"),
	key: wif("KzjcAZSJijpZCKt51Hs8ah3Jowubx47LDrExCgr93mZNctWNAs88").entropy("aa0e948775fa99561a0efd2f66b5500b", source(THREAD$63, "MD5 of the three words")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$63)],
	prize: .007,
	hints: [
		official("Question: https://en.m.wikipedia.org/wiki/Ninety-five_Theses", THREAD$63, void 0, { answer: answer("The solution for this was \"Bitcoin white paper\". I used the fact that Luther posted the 95 theses on October 31, which is the same date as the white paper.", THREAD$63) }),
		official("Format: [solution]", THREAD$63),
		official("In an interesting coincidence, the first three digits of the MD5 hash for this block are aa0.", THREAD$63)
	],
	solvedAt: "2019-05-30 08:35:57",
	solveTime: 19180,
	transactions: [funding("21257d3d61b08473ebb6f3faedc9a9dd8d52a34403ba417da0c3093bdf4f4aa4", "2019-05-30 03:16:17", .007), claim("89d5cd5a6677b1252cdc7635c81ca9f5b2d8ff210da4f38eec96ae4114905d8b", "2019-05-30 08:35:57", .00668474)]
});
const THREAD$62 = "https://www.reddit.com/r/Grycoin/comments/bustcu/7_mbtc_quizchain2_block_23/";
const quizchain2Block23 = puzzle({
	id: "quizchain2/23",
	chain: "bitcoin",
	address: "14bavWYFj3GDbXG3KJihTUuWaZu6oce4zT",
	sourceUrl: THREAD$62,
	startedAt: "2019-05-30 12:43:29",
	status: Status.Solved,
	pubkey: compressed("03ed49b3afa2b4bd7762ee3855d0cb25d8a9ac086ca86353e984ab164dc68cfa19"),
	key: wif("L1VFUsRTgdYZnFGdX14RNb9e8AoWHgmRTsn51b3DYhMjLvpvhn4X").entropy("5933d9f1db6fbd064cf19004cc8e62b3", source(THREAD$62, "MD5 of the letter, TOMI and three words")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$62)],
	prize: .007,
	hints: [
		official("Question: PG", THREAD$62, void 0, { answer: answer("Solution was \"P\" and TOMI field was \"Pretty Good Privacy\". I wanted to use this idea because the link to Bitcoin's cypherpunk roots.", THREAD$62) }),
		official("Format: [solution] TOMI [TOMI]", THREAD$62),
		official("First 3 digits of MD5 hash are 593.", THREAD$62),
		official("First digit of solution only MD5 hash is 4.", THREAD$62),
		official("First digit of TOMI field only MD5 hash is 5.", THREAD$62)
	],
	solvedAt: "2019-05-30 15:55:40",
	solveTime: 11531,
	transactions: [funding("f3f49ed66c0041cad2cde7cab0132094811b6c1d1c8e3dd189b59fc110dd98c0", "2019-05-30 12:43:29", .007), claim("9bd5338638e98e9f25acf41f1eb36e8ffc0b1512927bbfe6da8cfb6f013fa8d4", "2019-05-30 15:55:40", .00665811)]
});
const THREAD$61 = "https://www.reddit.com/r/Grycoin/comments/bv4rd2/7_mbtc_quizchain2_block_24/";
const quizchain2Block24 = puzzle({
	id: "quizchain2/24",
	chain: "bitcoin",
	address: "1NfLgLWFiAiaHYCAAwPS3SFoXzgj4gSHdk",
	sourceUrl: THREAD$61,
	startedAt: "2019-05-31 08:06:13",
	status: Status.Solved,
	pubkey: compressed("02706ffd95ff84057a17e9238268bcd66cc025bce322dea403a785c8cf2ce3c04a"),
	key: wif("L5kQ9FUD14sYY3yevLHvEzME2wGbrMUvgDBvMHQotLg2cayRswM1").entropy("537fbb6227b801381fc2a2120a5d81f2", source(THREAD$61, "MD5 of the acronym, TOMI and three words")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$61)],
	prize: .007,
	hints: [
		official("Question: Reusable", THREAD$61, void 0, { answer: answer("Solution was \"RPOW\", which is \"Reusable proof of work\", a previous attempt to build private Internet cash. TOMI was just \"proof of work\".", THREAD$61) }),
		official("Format: [solution] TOMI [TOMI]", THREAD$61, void 0, { answer: answer("I solved this one. Solution is RPOW, and TOMI is proof of work.", "https://www.reddit.com/r/Grycoin/comments/bv4rd2/comment/epl9678/") }),
		official("First three digits of MD5 hash are 537.", THREAD$61),
		official("First digit of solution only MD5 hash is 9.", THREAD$61),
		official("First digit of TOMI field only MD5 hash is a.", THREAD$61)
	],
	solvedAt: "2019-05-31 08:06:13",
	solveTime: 0,
	transactions: [funding("0cd1e2725bb02d1aee1d19134d41352ded5f8b9492b7223af5b273982d5a8047", "2019-05-31 08:06:13", .007), claim("1b18856ca5b7eea502d715b58290d635007015c203b93c2fff78a8a9465fefd9", "2019-05-31 08:06:13", .00651087)]
});
const THREAD$60 = "https://www.reddit.com/r/Grycoin/comments/bvgsn7/7_mbtc_quizchain2_block_25/";
const quizchain2Block25 = puzzle({
	id: "quizchain2/25",
	chain: "bitcoin",
	address: "12pGDovmd3dC58NYvuF7bd3huMJbutEZ1J",
	sourceUrl: THREAD$60,
	startedAt: "2019-06-01 02:23:30",
	status: Status.Solved,
	pubkey: compressed("020547a8fce00bdea1f7a61f174bff002b60d490bc33e482197aa2f2fb95aaf962"),
	key: wif("L5FJ3bs7o7MktG9BazTiaJ87vvKoDXuTyesH4PeEHfF4Eie2Ur8E").entropy("45763700ded083bf9d46f148dcd6d178", source(THREAD$60, "MD5 of the sum, TOMI and four words")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$60)],
	prize: .007,
	hints: [
		official("Question: We use three Fibonacci numbers. One, zero, and two. What does this mean?", THREAD$60, void 0, { answer: answer("The Fibonacci stuff was a hoax, if you avoided falling for that, it was just a matter of noting that this block 25 is actually already block 102 and finding the TOMI field.", THREAD$60) }),
		official("Format: [solution] TOMI [TOMI]", THREAD$60, void 0, { answer: answer("77 + 25 TOMI total number of blocks", "https://www.reddit.com/r/Grycoin/comments/bvgsn7/comment/epsh5d9/") }),
		official("First three digits of MD5 hash are 457.", THREAD$60),
		official("First digit of solution only MD5 hash is a.", THREAD$60),
		official("FIrst digit of TOMI field only MD5 hash is 4.", THREAD$60),
		official("Not about Fibonacci. First word of TOMI field is total.", THREAD$60)
	],
	solvedAt: "2019-06-02 04:30:15",
	solveTime: 94005,
	transactions: [funding("af41bfa7ffa60febb31ccaef88e0953fed581cbf42b8bc1219cf882908ec1efd", "2019-06-01 02:23:30", .007), claim("0479188cce386d7830e68c60f330fd92c07e5747a3cc3284ff76571b6e1072a7", "2019-06-02 04:30:15", .0064505)]
});
const THREAD$59 = "https://www.reddit.com/r/Grycoin/comments/bvqrlr/7_mbtc_quizchain2_block_26/";
const quizchain2Block26 = puzzle({
	id: "quizchain2/26",
	chain: "bitcoin",
	address: "1MZkYJGdwQyBxVjeP6yFEfeofniPe3DuZA",
	sourceUrl: THREAD$59,
	startedAt: "2019-06-01 13:46:42",
	status: Status.Solved,
	pubkey: compressed("02eba353713570f31b7077c98aa0053c480c20e282e5dde07765e5d3909568a214"),
	key: wif("L1f62oEUFZwThriUzuAFQL8kVaY9wm85zrun6Y185qpUfCiB5DVk").entropy("7b80eaaa48d1aec2289c956ae3978deb", source(THREAD$59, "MD5 of the four words, TOMI and the given field")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$59)],
	prize: .007,
	hints: [
		official("Question: Magical Crypto Friends", THREAD$59, void 0, { answer: answer("As noted by several players in comments, this was about the famous Samson riddle in the Bible. The answer to that in the BIble was \"What is sweeter than honey? What is stronger than a lion?\". I simplified this a bit to \"sweet honey strong lion\".", THREAD$59) }),
		official("Format: [solution] TOMI Extremely unfair riddle", THREAD$59),
		official("First three digits of MD5 hash are 7b8.", THREAD$59),
		official("Not Pan or Pon", THREAD$59),
		official("Not the Panda", THREAD$59),
		official("Not the Pony", THREAD$59),
		official("Not the Chikun either.", THREAD$59),
		official("Looking for an extremely unfair riddle.", THREAD$59)
	],
	solvedAt: "2019-06-03 11:36:20",
	solveTime: 164978,
	transactions: [funding("05ed3d948218538a9f4d55a79c12b22900912862dd83d428d4268a6392eb8f24", "2019-06-01 13:46:42", .007), claim("e31653ee198402c2983abcae23b4c559e3449a44cbb1a865c821ecb912242830", "2019-06-03 11:36:20", .006618)]
});
const THREAD$58 = "https://www.reddit.com/r/Grycoin/comments/bwaepa/9_mbtc_quizchain2_block_27/";
const quizchain2Block27 = puzzle({
	id: "quizchain2/27",
	chain: "bitcoin",
	address: "1Gc176jA3F7pxiDNtxmRRFSPAsYkud9TMD",
	sourceUrl: THREAD$58,
	startedAt: "2019-06-03 10:31:46",
	status: Status.Solved,
	pubkey: compressed("02b97742a7a347de722b898b5f47b89c4a8451b6fa4d8bf707d3aaf07df51a9e2d"),
	key: wif("L3peUVwFP586E5eEjWmPdW988CrB3iQBmwCnnijhWxN8TMhUPqah").entropy("c3d0d5687b469a0e449f396f0ca975d7", source(THREAD$58, "MD5 of the acronym, TOMI and three words")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$58), technique("atbash", THREAD$58)],
	prize: .009,
	hints: [
		official("FOG COOL", THREAD$58, void 0, { answer: answer("Atbash on the question results in ULT XLLO. From there on it is only a question of noting that the letters at the edges form UTXO, which is the solution. TOMI field was just \"unspent transaction output\", which follows clearly and uniquely from the solution.", THREAD$58) }),
		official("Format: [solution] TOMI [TOMI]", THREAD$58, void 0, { answer: answer("UTXO TOMI unspent transaction output", "https://www.reddit.com/r/Grycoin/comments/bwaepa/comment/epz3gy9/") }),
		official("First 3 digits of MD5 hash is c3d. I do not indicate first digit of solution only and TOMI field only MD5 hash, since the TOMI field follows clearly and uniquely from the solution.", THREAD$58),
		official("Update: First digit of solution only MD5 hash is a.", THREAD$58),
		official("Update two (hint one): Atbash.", THREAD$58)
	],
	solvedAt: "2019-06-04 13:59:06",
	solveTime: 98840,
	transactions: [funding("00c41fb1d17837ff51e0def00f115c18da709db3034453542618ef0adbc65a2f", "2019-06-03 10:31:46", .009), claim("8d543b4b443dd2ce7f557905f6320d517818395c572b3deaf01f69c3c85b1350", "2019-06-04 13:59:06", .00844992)]
});
const THREAD$57 = "https://www.reddit.com/r/Grycoin/comments/bwm5hb/7_mbtc_quizchain2_block_28/";
const quizchain2Block28 = puzzle({
	id: "quizchain2/28",
	chain: "bitcoin",
	address: "18Z3A91W5TDT7cEBDkPWaVEy4tWPzuLVh3",
	sourceUrl: THREAD$57,
	startedAt: "2019-06-04 06:37:03",
	status: Status.Solved,
	pubkey: compressed("031db9d4dc1d1fba1966093c948e5987814464aa79e2cf3ff1957b3b224637d83f"),
	key: wif("KzGzhzaRpAfb2AzrtKtTkeTnAiLEkWj5dUbfY4krJkYZnJqRVnz4").entropy("31606856fd4a33fc03b9216fefc2f221", source(THREAD$57, "MD5 of the two words, TOMI and the given field")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$57)],
	prize: .007,
	hints: [
		official("Question: Verb Noun", THREAD$57, void 0, { answer: answer("Solution was \"Running bitcoin\", the famous tweet by Hal Finney.", THREAD$57) }),
		official("Format: [solution] TOMI obvious at first sight", THREAD$57),
		official("First three digits of MD5 hash are 316.", THREAD$57)
	],
	solvedAt: "2019-06-04 08:10:16",
	solveTime: 5593,
	transactions: [funding("35dc236f4c9668100f17aa952b4af42053637b1807a2dec7deb2b0617a41dbc1", "2019-06-04 06:37:03", .007), claim("f3f3f0698f68109f87d80352a95568d4553b2d96284584648e9b6b1feb777d3c", "2019-06-04 08:10:16", .00659776)]
});
const THREAD$56 = "https://www.reddit.com/r/Grycoin/comments/bwya8s/7_mbtc_quizchain2_block_29/";
const quizchain2Block29 = puzzle({
	id: "quizchain2/29",
	chain: "bitcoin",
	address: "19UP4Fb7zcZ5JXnrGwPkuTGr6msZEJfbRa",
	sourceUrl: THREAD$56,
	startedAt: "2019-06-04 23:38:19",
	status: Status.Solved,
	pubkey: compressed("03a30a845216745ca831d8381a71b9f71214d2aeb3813d2ced593a93dd93d2c47c"),
	key: wif("L3HmHhyYCaxULQipVqy631Mw1h1xCUzJJ6CKhGYAeZhzbkQe2dAV").entropy("72f81ac9956b8d2a8874f0b06a4dc9ff", source(THREAD$56, "MD5 of the word, TOMI, a name and a number")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$56)],
	prize: .007,
	hints: [
		official("Question: Great deeds", THREAD$56, void 0, { answer: answer("Solution for this classic riddle and for this block is \"Key\".", THREAD$56) }),
		official("Format: [solution] TOMI [TOMI]. Solution is one word, with first letter only capital, like \"Solution\".", THREAD$56, void 0, { answer: answer("Update: As noted in comments, correct name is Symphosius.", THREAD$56) }),
		official("First three digits of MD5 hash are 72f", THREAD$56),
		official("First digit of solution only MD5 hash is 8.", THREAD$56),
		official("First digit of TOMI only MD5 hash is c.", THREAD$56),
		official("Hint: with little", THREAD$56, void 0, { answer: answer("This was a classic, number 4 in a collection of 100 riddles by Symphonius.", THREAD$56) }),
		official("TOMI field format is [name] [number]", THREAD$56, void 0, { answer: answer("The TOMI field was the name of the author (Symphonius) and the number 4 since this is the number of this riddle in his collection.", THREAD$56) })
	],
	solvedAt: "2019-06-05 04:50:56",
	solveTime: 18757,
	transactions: [funding("2fe442ae6de1aa8b349f3bcc5fc2c7433a9e16fb0551430c078f84536c3a6f21", "2019-06-04 23:38:19", .007), claim("eb82d524bae0bf914ee66b8b8fb09a226b02b66e1d378bec9fbf3e9e87f88b4f", "2019-06-05 04:50:56", .00699427)]
});
const THREAD$55 = "https://www.reddit.com/r/Grycoin/comments/bx97d0/7_mbtc_quizchain2_block_30/";
const quizchain2Block30 = puzzle({
	id: "quizchain2/30",
	chain: "bitcoin",
	address: "123eggbD9tm39Qv1YXLcBt4vCtNcHFHDRm",
	sourceUrl: THREAD$55,
	startedAt: "2019-06-05 22:49:59",
	status: Status.Solved,
	pubkey: compressed("028a2733a6e0dacff467144a11403ff5e9a936af840761d41dedfa75794e8ae836"),
	key: wif("Kwk33rsM9GnzoNePzxX1M4EstCVPgvZ229j5HBbLtjUoULdqjCZ5").entropy("086f597ff6158313c5a0b7fa4cddc0c1", source(THREAD$55, "MD5 of the three pairs, TOMI and two words")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$55), technique("atbash", THREAD$55)],
	prize: .007,
	hints: [
		official("Question: AY", THREAD$55, void 0, { answer: answer("Solution was \"EU IQ KO\" and TOMI field was \"Atbash foldover\".", THREAD$55) }),
		official("Format: [solution] TOMI [TOMI]", THREAD$55, void 0, { answer: answer("Solution: EU IQ KO TOMI Atbash foldover", "https://www.reddit.com/r/Grycoin/comments/bx97d0/comment/eqg0k0b/") }),
		official("Solution format is three sets of two capital letters.", THREAD$55),
		official("FIrst three digits of MD5 hash are 086.", THREAD$55),
		official("FIrst digit of solution only MD5 hash is b.", THREAD$55),
		official("FIrst digit of TOMI field only MD5 hash is 4.", THREAD$55),
		official("The format for the TOMI field is [Word1] [word2]. Word1 starts with a capital letter, word2 is all lower case. There is one space between the two words.", THREAD$55),
		official("First word of TOMI field is Atbash.", THREAD$55)
	],
	solvedAt: "2019-06-08 20:37:36",
	solveTime: 251257,
	transactions: [funding("ea8cc06a7b115c1e5ec85d1cbfb4ff0a39d3cfa23e50526f4fb7c0155247ac47", "2019-06-05 22:49:59", .007), claim("5309e0cdab0e5ef997b86a78836e83a194d4d0822a0f5f7b175032b48945e27e", "2019-06-08 20:37:36", .00683219)]
});
const THREAD$54 = "https://www.reddit.com/r/Grycoin/comments/bxuciq/7_mbtc_quizchain2_block_31/";
const quizchain2Block31 = puzzle({
	id: "quizchain2/31",
	chain: "bitcoin",
	address: "1JNhEMuFua8KRE5UJL7dYfhkxA1fEV1zFn",
	sourceUrl: THREAD$54,
	startedAt: "2019-06-07 11:27:39",
	status: Status.Solved,
	pubkey: compressed("0302ec5a26f056318011b58ba8c537b2585e47b88a13f4e1c21acc459e0f554562"),
	key: wif("KzyvYuQadrXDubP5td6ez6MkjsrCam7g6mKqyhUi2jRMwYyrTYZb").entropy("ac74af06aee6e66bef1ff271ed9c289a", source(THREAD$54, "MD5 of the three words, TOMI and two words")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$54)],
	prize: .007,
	hints: [
		official("Question: oxen", THREAD$54, void 0, { answer: answer("Solution was \"black ink marks\" and TOMI field was \"Veronese riddle\".", THREAD$54) }),
		official("Format: [solution] TOMI [TOMI]", THREAD$54, void 0, { answer: answer("So complete solution is \"black ink marks TOMI Veronese riddle\"", "https://www.reddit.com/r/Grycoin/comments/bxuciq/comment/eqe7bby/") }),
		official("First three digits of MD5 hash are ac7.", THREAD$54),
		official("First digit of solution only MD5 hash is e.", THREAD$54),
		official("FIrst digit of TOMI field only MD5 hash is b.", THREAD$54),
		official("This is another famous classic riddle, not quite as old as the sphinx riddle or the lion story, but known for about 1000 years.", THREAD$54)
	],
	solvedAt: "2019-06-08 13:15:12",
	solveTime: 92853,
	transactions: [funding("032ce0af6c0b689f448c232af18f002d205e78e2b1e764f3950bee84a55fa304", "2019-06-07 11:27:39", .007), claim("383920dd2c93034b34d3db4c6151977b53ae494fa3c0d8a71566b4302a6015f0", "2019-06-08 13:15:12", .00683219)]
});
const THREAD$53 = "https://www.reddit.com/r/Grycoin/comments/by5p2x/7_mbtc_quizchain2_block_32/";
const quizchain2Block32 = puzzle({
	id: "quizchain2/32",
	chain: "bitcoin",
	address: "1HxabEFLMtAsg81dPhwfLxhqn3TZwJnka1",
	sourceUrl: THREAD$53,
	startedAt: "2019-06-08 04:23:49",
	status: Status.Solved,
	pubkey: compressed("03c5ea852aaa9fc70a11fef06da05c3b6be9485181f1e2b92a985fffa48e38ef85"),
	key: wif("L38e5RZ8EmQLonFbTiDf8y5kWhCxbR2PKYx76N3vbzjS5jaexBgn").entropy("fcd938a80d54ddf2b14dc58754677757", source(THREAD$53, "MD5 of the word, TOMI, a word and a number")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$53)],
	prize: .007,
	hints: [
		official("The Yang campaign lists 104 specific policy proposals as of today. Number 103 (if my count is correct) is titled \"Regulate AI and Other Emerging Technologies\". It says there should be a new \"Department of Technology\" based in Silicon Valley, initially focused on Artificial Intelligence.", THREAD$53),
		official("Question: What word comes to mind when discussing Artificial Intelligence?", THREAD$53, void 0, { answer: answer("As noted in comments by the winner, the solution to this was \"Omnipotent\" and the TOMI field was \"block 22\".", THREAD$53) }),
		official("Format: [solution] TOMI [TOMI]", THREAD$53, void 0, { answer: answer("Solution: Omnipotent TOMI block 22", "https://www.reddit.com/r/Grycoin/comments/by5p2x/comment/eqczsmi/") }),
		official("The solution word starts with a capital letter, like \"Solution\".", THREAD$53),
		official("First three digits of MD5 hash are fcd.", THREAD$53),
		official("FIrst digit of solution only MD5 hash is b.", THREAD$53),
		official("FIrst digit of TOMI field only MD5 hash is 5.", THREAD$53)
	],
	solvedAt: "2019-06-08 08:12:11",
	solveTime: 13702,
	transactions: [funding("03438972a966a2e89cf8f8a9e3ad5188ce0376d51e068289993939fbca3bda96", "2019-06-08 04:23:49", .007), claim("73cbd330d3c29b78befe2b267da74f70b0668baaccd63327b4b73d7eea17635b", "2019-06-08 08:12:11", .00698656)]
});
const THREAD$52 = "https://www.reddit.com/r/Grycoin/comments/bygeur/7_mbtc_quizchain2_block_33/";
const quizchain2Block33 = puzzle({
	id: "quizchain2/33",
	chain: "bitcoin",
	address: "1JcvYSVA8AzyYRT7Y6u1iepdKTagsQEk26",
	sourceUrl: THREAD$52,
	startedAt: "2019-06-09 04:20:20",
	status: Status.Solved,
	pubkey: compressed("028b9359244ef4511c1a271cf15192b321a3fb6f9deb24245834402edc7d7798fd"),
	key: wif("KyRE11sbA7SyDEuxWHwbhoNHYxmLY1DXsxiK177QNb3pYPPfSPTQ").entropy("b60c14d39a7984882f495cb7058474db", source(THREAD$52, "MD5 of the number, TOMI and four items")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$52)],
	prize: .007,
	hints: [
		official("Question: Can you find the answer?", THREAD$52, void 0, { answer: answer("Solution was 0078 which is the four digit number for the word \"answer\" in the \"BIP 39 word list\", which in turn was the TOMI field.", THREAD$52) }),
		official("Format: [solution] TOMI [TOMI]", THREAD$52, void 0, { answer: answer("The answer was 0078 TOMI BIP 39 word list - \"answer\" being the 78th word in the BIP-39 wordlist.", "https://www.reddit.com/r/Grycoin/comments/bygeur/comment/eqqswj7/") }),
		official("FIrst three digits of MD5 hash are b60.", THREAD$52),
		official("FIrst digit of solution only MD5 hash is f.", THREAD$52),
		official("FIrst digit of TOMI field only MD5 hash is 7.", THREAD$52),
		official("First item of TOMI field is three capital letters, format XXX. There are four items in the TOMI field.", THREAD$52),
		official("Hint 2: I did not come up with the method for this block by myself, but found it in a comment by one of the players.", THREAD$52),
		official("Last item of the TOMI field is the word \"list\".", THREAD$52),
		official("Format for solution is four digit number, like \"0007\".", THREAD$52)
	],
	solvedAt: "2019-06-11 05:23:23",
	solveTime: 176583,
	transactions: [funding("c97d65c858d5009cdb3e2fdd95f3519f28c9c106af0f7205c7e770402047ac24", "2019-06-09 04:20:20", .007), claim("8f6b9c3c1e9446b0e72dcd2ee1798759631a8bf0a083bcc6e729a60af641035e", "2019-06-11 05:23:23", .00681472)]
});
const THREAD$51 = "https://www.reddit.com/r/Grycoin/comments/byqc7s/7_mbtc_quizchain2_block_34/";
const quizchain2Block34 = puzzle({
	id: "quizchain2/34",
	chain: "bitcoin",
	address: "1KKwHrjhNgsdqgDx913TYsgjRR5i8YhQoH",
	sourceUrl: THREAD$51,
	startedAt: "2019-06-09 09:16:31",
	status: Status.Solved,
	pubkey: compressed("02a09f97e9a421f08ceaa3439ad0175c3acb42c4933d4cc9fe5bd62e968f3f376d"),
	key: wif("L2t4m7TU8PA3FzkzRJNf4ohjyjGSkWKrNFUxwgysdm5ZpfGDEqY8").entropy("83652f90088e310fb0c70da77d47e691", source(THREAD$51, "MD5 of the two pairs, TOMI and six words")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$51), technique("atbash", THREAD$51)],
	prize: .007,
	hints: [
		official("Question: HI there", THREAD$51, void 0, { answer: answer("Solution was \"HQ IP\" and the whole TOMI field was \"Atbash foldover two to the right\".", THREAD$51) }),
		official("Format: [solution] TOMI [TOMI]", THREAD$51),
		official("Solution format is two sets of two capital letters XX XX. FIrst two words of TOMI field are \"Atbash foldover\", followed by four other words.", THREAD$51),
		official("FIrst three digits of MD5 hash are 836.", THREAD$51),
		official("First digit of solution only MD5 hash is 1.", THREAD$51),
		official("FIrst two digits of TOMI field only MD5 hash are 42.", THREAD$51)
	],
	solvedAt: "2019-06-10 21:58:04",
	solveTime: 132093,
	transactions: [funding("026c52e2ae9290b79836eb7010aa0587a043fa1754f043b98cd08f5c3a74c1df", "2019-06-09 09:16:31", .007), claim("b56642d7db17df6f635b4bbe07f1aea129881a3a20c9820098cd50a98dfb9dc4", "2019-06-10 21:58:04", .0068)]
});
const THREAD$50 = "https://www.reddit.com/r/Grycoin/comments/bzc5ed/7_mbtc_quizchain2_block_35/";
const quizchain2Block35 = puzzle({
	id: "quizchain2/35",
	chain: "bitcoin",
	address: "18xoCmXbQ5wgdCvqzmovFv82JjjtPJ66tz",
	sourceUrl: THREAD$50,
	startedAt: "2019-06-11 07:11:10",
	status: Status.Solved,
	pubkey: compressed("037d56b403a109dec7480e01f3d98a5b61c19ac2d19afc2beebe016e73bbaf2410"),
	key: wif("L2npvCw6FgofpHc6H5ZybPdTfWQNYkR5rRuNunrrLji9jR8PuXXo").entropy("56c65bfa1daa8d8b6c381e8a3a7df642", source(THREAD$50, "MD5 of the month and year, TOMI, a word and a number")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$50)],
	prize: .007,
	hints: [
		official("Question: In what month will the first Grycoin be mined?", THREAD$50, void 0, { answer: answer("Solution was May 2020 and TOMI field was Halvening 630000.", THREAD$50) }),
		official("Format: [solution] TOMI [TOMI]", THREAD$50, void 0, { answer: answer("Answer is \"May 2020 TOMI Halvening 630000\"", "https://www.reddit.com/r/Grycoin/comments/bzc5ed/comment/eqrhaem/") }),
		official("The format for the solution is [month] [year], like \"June 2019\".", THREAD$50),
		official("TOMI is one word and one number. The first letter of the word is capital, like \"Solution\".", THREAD$50),
		official("First three digits of MD5 hash are 56c.", THREAD$50),
		official("First digit of solution only MD5 hash is 0.", THREAD$50),
		official("First two digits of TOMI field only MD5 hash are 3c.", THREAD$50),
		official("Hint 1: The number has six digits and is a multiple of 21. No leading zero for this number.", THREAD$50),
		official("MIning will be outsourced to Bitcoin.", THREAD$50)
	],
	solvedAt: "2019-06-11 13:42:36",
	solveTime: 23486,
	transactions: [funding("e767fa093304f2c416fe6d725305deab4c2605a7550743758369bf3acea7acb9", "2019-06-11 07:11:10", .007), claim("f432886b9c35f9a375c7f2c1ba9a0e3d95cc210cfd8b295631c9d666bbe0c168", "2019-06-11 13:42:36", .0068489)]
});
const THREAD$49 = "https://www.reddit.com/r/Grycoin/comments/bzodlf/7_mbtc_quizchain2_block_36/";
const quizchain2Block36 = puzzle({
	id: "quizchain2/36",
	chain: "bitcoin",
	address: "1Je4ZP3CGjtbwFJ5jwtkooG8JDYtzGwSMM",
	sourceUrl: THREAD$49,
	startedAt: "2019-06-12 00:22:24",
	status: Status.Solved,
	pubkey: compressed("0245b7dbabde52914ea813c8a43f1ce0e23c90f4c96c9ad49a6213584b0b6a9534"),
	key: wif("L2xsEcGgBu6qm27iiHahU3iST4YxgnCepknU8UDvtGVXmgwrUuv2").entropy("1dbf8dd28fd462b1aa1b867d83c3b696", source(THREAD$49, "MD5 of the word, TOMI and three words")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$49)],
	prize: .007,
	hints: [
		official("Question: de or ha?", THREAD$49, void 0, { answer: answer("Solution was \"bit\" and TOMI field was \"debit orbit habit\".", THREAD$49) }),
		official("Format: [solution] TOMI [TOMI].", THREAD$49, void 0, { answer: answer("bit TOMI debit orbit habit", "https://www.reddit.com/r/Grycoin/comments/bzodlf/comment/eqv47re/") }),
		official("First three digits of MD5 hash are 1db.", THREAD$49),
		official("First digit of solution only MD5 hash is f.", THREAD$49),
		official("First two digits of TOMI field only MD5 hash are f9.", THREAD$49)
	],
	solvedAt: "2019-06-12 11:47:57",
	solveTime: 41133,
	transactions: [funding("b36c5e5c202988acf471111a9f85c66dae766f41edde126974458e5cfa70d76a", "2019-06-12 00:22:24", .007), claim("e01719c30fcb413031f02a85d586b91bd72b45c909a57405eb3f11c554c98e8f", "2019-06-12 11:47:57", .00678799)]
});
const THREAD$48 = "https://www.reddit.com/r/Grycoin/comments/c012gd/10_mbtc_quizchain2_block_37/";
const quizchain2Block37 = puzzle({
	id: "quizchain2/37",
	chain: "bitcoin",
	address: "131KikgawApZakrm5e8RPobDjKBoMvMFei",
	sourceUrl: THREAD$48,
	startedAt: "2019-06-12 23:48:42",
	status: Status.Solved,
	pubkey: compressed("038bdc1d347f7bcb1ba23ebe488b5874274c8ca2f783504dd5dfa40a5683d4ea22"),
	key: wif("Kx5xWpgz2G6gVjuwLJrqxajRRkj6TqfMyCPDEn9FoRa7o5LdkmyM").entropy("394596b95fd8e24ea742969f138c665e", source(THREAD$48, "MD5 of the two words, TOMI and four words")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$48)],
	prize: .01,
	hints: [
		official("Question: I created a new word. Minmin. What does it mean?", THREAD$48, void 0, { answer: answer("Solution was \"Quizchain player\" and TOMI field was \"Mine with your mind\".", THREAD$48) }),
		official("Format: [solution] TOMI [TOMI]", THREAD$48, void 0, { answer: answer("Quizchain player TOMI Mine with your mind", "https://www.reddit.com/r/Grycoin/comments/c012gd/comment/eqzljo9/") }),
		official("Solution format is two words, with the first one starting with a capital letter, like this: \"Word1 word2\".", THREAD$48),
		official("TOMI format is four words. Each has four letters. The first and last word differ by only one letter. Only the first word starts with a capital letter, like this: \"Word1 word2 word3 word4\". No words of dubious moral standing in this TOMI field.", THREAD$48),
		official("First three digits of MD5 hash are 394.", THREAD$48),
		official("First digit of solution only MD5 hash is d.", THREAD$48),
		official("First two digits of TOMI field only MD5 hash are 49.", THREAD$48),
		official("First word in TOMI field is a homonym related to Bitcoin.", THREAD$48),
		official("Hint 2: How do you mine the quizchain?", THREAD$48),
		official("Hint 3: The first word of the TOMI field is \"Mine\". It is a homonym, since it has the meaning to mine a chain or gold as well as \"this is mine\".", THREAD$48),
		official("Hint 4: You all", THREAD$48),
		official("Hint 5: Tomi field may be used as a slogan for the quizchain, just as \"Satoshi without the consonants\" is a catchphrase for my handle name.", THREAD$48),
		official("Hint 6 (last one, after that you are on your own until further notice): First word of solution is \"Quizchain\"", THREAD$48)
	],
	solvedAt: "2019-06-13 04:57:56",
	solveTime: 18554,
	transactions: [funding("4e63d912321e10883730adcb1af660bca1a1dd0efe77bfedc2f0e6830ab82702", "2019-06-12 23:48:42", .01), claim("a0f67c8e7c6c889f4278cb4e0e68173321ff16ec90f0801c40e2b2d870f710b8", "2019-06-13 04:57:56", .00974867)]
});
const THREAD$47 = "https://www.reddit.com/r/Grycoin/comments/c0cq0b/7_mbtc_quizchain2_block_38/";
const PLAYER_COMMENT$31 = "https://www.reddit.com/r/Grycoin/comments/c0cq0b/comment/er6u1h4/";
const quizchain2Block38 = puzzle({
	id: "quizchain2/38",
	chain: "bitcoin",
	address: "1HsXSQHfNeNVrGqaRBgB7p354pbK8ffYXS",
	sourceUrl: THREAD$47,
	startedAt: "2019-06-13 13:09:02",
	status: Status.Solved,
	pubkey: compressed("035eda54af194001681f0de125f6855ff5fc413dbefc70531e21d9058eb874e030"),
	key: wif("L567ZDaTVYojFcuxjbHAXrfzjGhDHXgWnSom2V8ZHr3dJj5AB1A2").entropy("4f0d5c65e568de8d2de1baae150e40f9", source(PLAYER_COMMENT$31, "MD5 of the word, TOMI and four words")).derived(),
	techniques: [technique("md5-to-bip39-entropy", PLAYER_COMMENT$31)],
	prize: .007,
	hints: [
		official("Question: odd", THREAD$47, void 0, { answer: answer("Solution was ACE and TOMI field was \"odd numbered alphabet numbers\".", THREAD$47) }),
		official("Format: [solution] TOMI [TOMI]", THREAD$47, void 0, { answer: answer("ACE TOMI odd numbered alphabet letters", PLAYER_COMMENT$31) }),
		official("Solution is a word in all capitals like [WORD]. TOMI field are four words, all in lower case like [word1] [word2] [word3] [word4].", THREAD$47),
		official("FIrst three digits of MD5 hash are 4f0.", THREAD$47),
		official("First digit of solution only MD5 hash is 7.", THREAD$47),
		official("First two digits of TOMI field only MD5 hash are 89.", THREAD$47),
		official("Third word of TOMI field is alphabet.", THREAD$47),
		official("Second digit of solution only MD5 hash is not 3.", THREAD$47)
	],
	solvedAt: "2019-06-15 00:05:14",
	solveTime: 125772,
	transactions: [funding("e58e2ef6ddff44268d82c089b991ea0a0ec0fefaf17adf5fa09e4e1714f658db", "2019-06-13 13:09:02", .007), claim("c34825e67c83a1454443028bfc86695a17d7b7fa29b6f7620da33fcdb2a62722", "2019-06-15 00:05:14", .0067719)]
});
const THREAD$46 = "https://www.reddit.com/r/Grycoin/comments/c0x0r5/7_mbtc_quizchain2_block_39/";
const PLAYER_COMMENT$30 = "https://www.reddit.com/r/Grycoin/comments/c0x0r5/comment/erc4b0f/";
const quizchain2Block39 = puzzle({
	id: "quizchain2/39",
	chain: "bitcoin",
	address: "1DnWLtG4pWafyAAkoqgqRYheWZ6B5vs7V9",
	sourceUrl: THREAD$46,
	startedAt: "2019-06-15 01:25:24",
	status: Status.Solved,
	pubkey: compressed("02a160b7e110f696270f7c072fd8c3a7a25eae78edfb36d87de10aa90e8f127274"),
	key: wif("L2vedu3Yh8sX99aZ9ErUHVPKPyAycsJyy245AEF7J9zKQ4kM2S9b").entropy("4018450f7a8e2353908fe3cc25a7d070", source(PLAYER_COMMENT$30, "MD5 of the three words, TOMI and five items")).derived(),
	techniques: [technique("md5-to-bip39-entropy", PLAYER_COMMENT$30)],
	prize: .007,
	hints: [
		official("Question: Ten words there are. Missing of them there are three.", THREAD$46, void 0, { answer: answer("You can find the numbers one, two, three, six, seven, eight, and ten as words in the BIP 39 list but four, five, and nine are missing.", PLAYER_COMMENT$30) }),
		official("Format: [solution] TOMI [TOMI]", THREAD$46, void 0, { answer: answer("four five nine TOMI BIP 39 word list numbers", PLAYER_COMMENT$30) }),
		official("Format for solution is [word1] [word2] [word3] with all three words all lower case.", THREAD$46),
		official("Format for TOMI field is five items.", THREAD$46),
		official("FIrst three digits of MD5 hash are 401.", THREAD$46),
		official("First two digits of solution only MD hash are 8d.", THREAD$46),
		official("FIrst two digits of TOMI field only MD hash are 4c.", THREAD$46),
		official("Used before this method I have, but a better match it is to this block number.", THREAD$46)
	],
	solvedAt: "2019-06-16 16:22:31",
	solveTime: 140227,
	transactions: [funding("1a2661ab6d6fab5c33bb8bb4669f8d2b8ccb067737a5adcfcfeccac6847f01ad", "2019-06-15 01:25:24", .007), claim("5660df99757997eec89836e2acec8d54c78ade5b6928376e593633e4be5ac483", "2019-06-16 16:22:31", .00686906)]
});
const THREAD$45 = "https://www.reddit.com/r/Grycoin/comments/c19m8f/7_mbtc_quizchain2_block_40/";
const quizchain2Block40 = puzzle({
	id: "quizchain2/40",
	chain: "bitcoin",
	address: "1NDV1sWQaE6NzpvejaGHjoyg1ntNLtxzXP",
	sourceUrl: THREAD$45,
	startedAt: "2019-06-16 08:13:56",
	status: Status.Solved,
	pubkey: compressed("03926cfee34d42cbf1ef2105e8b1af002476781ee60259648595c183c8fc4ba323"),
	key: wif("L41cFG1neExHf3EP74PttuQ3yeQEwtCfxUoqjYkcFXVxSKooWWYK").entropy("5a95ded197b67a6a169fbbb326932480", source(THREAD$45, "MD5 of the word, TOMI and a word")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$45)],
	prize: .007,
	hints: [
		official("Question: Famous mistake.", THREAD$45, void 0, { answer: answer("Solultion was hodl, TOMI field was hold.", THREAD$45) }),
		official("Format: [solution] TOMI [TOMI]", THREAD$45),
		official("Solution format is one word, all in lower case like \"word\".", THREAD$45),
		official("TOMI field is the same as solution format, one word all in lower case, like \"word\".", THREAD$45),
		official("FIrst three digits of MD5 hash are 5a9.", THREAD$45)
	],
	solvedAt: "2019-06-16 13:52:40",
	solveTime: 20324,
	transactions: [funding("28619e939eb640e2c350bc8acf4fdfc9c2fb58991f5a2f33d7aadbcbda6dcdb2", "2019-06-16 08:13:56", .007), claim("0ef17caeb3457577936f0ea34fa1fc0a048df26b1fba3a55d38506be7a8934fe", "2019-06-16 13:52:40", .006)]
});
const THREAD$44 = "https://www.reddit.com/r/Grycoin/comments/c1kuxd/7_mbtc_quizchain2_block_41/";
const quizchain2Block41 = puzzle({
	id: "quizchain2/41",
	chain: "bitcoin",
	address: "16ViXuAGqBRacWLh33KPty2B4ofYRGa6b6",
	sourceUrl: THREAD$44,
	startedAt: "2019-06-17 07:40:58",
	status: Status.Solved,
	pubkey: compressed("0375aa8acbb1b1ea7680afc2791a0096f91e900870a7aba624415e5d186b5cd153"),
	key: wif("L4kB6omodTb59i3L5ki462EgrbsRRDK6trg1A6VVP9hHLmG1egzD").entropy("8e81dee03e6b815485a3644cc90893fd", source(THREAD$44, "MD5 of the two words, TOMI and the address")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$44)],
	prize: .007,
	hints: [
		official("Question: Beauty", THREAD$44, void 0, { answer: answer("Solution was truth rarity and TOMI field was the Bitcoin address 1FLAMEN6rq2BqMnkUmsJBqCGWdwgVKcegd.", THREAD$44) }),
		official("Format: [solution] TOMI [TOMI]", THREAD$44, void 0, { answer: answer("truth rarity TOMI 1FLAMEN6rq2BqMnkUmsJBqCGWdwgVKcegd", "https://www.reddit.com/r/Grycoin/comments/c1kuxd/comment/erdvubd/") }),
		official("Solution format is two words both in lower case like \"word1 word2\"", THREAD$44),
		official("TOMI field format is one item.", THREAD$44),
		official("First three digits of MD5 hash are 8e8.", THREAD$44),
		official("First digit of solution only MD5 hash is a.", THREAD$44),
		official("First two digits of TOMI field only MD5 hash are 07.", THREAD$44)
	],
	solvedAt: "2019-06-17 08:33:06",
	solveTime: 3128,
	transactions: [funding("e2bd60fbe3e91e849fc0e9360aa92991218f17bd7ac3871522815476b505fe5e", "2019-06-17 07:40:58", .007), claim("818f3bfcfd3bf550db20bb619c2dcc68a7b4c4b0f0658316803716e1856c9a9d", "2019-06-17 08:33:06", .00684832)]
});
const THREAD$43 = "https://www.reddit.com/r/Grycoin/comments/c1xhjo/7_mbtc_quizchain2_block_42/";
const PLAYER_COMMENT$28 = "https://www.reddit.com/r/Grycoin/comments/c1xhjo/comment/ergbrxb/";
const quizchain2Block42 = puzzle({
	id: "quizchain2/42",
	chain: "bitcoin",
	address: "13orvovfAkY4vmWLQv1RaJfAXiPM1cW1Ke",
	sourceUrl: THREAD$43,
	startedAt: "2019-06-17 23:55:00",
	status: Status.Solved,
	pubkey: compressed("028fd1c75ae7daeb21fc0d1f1ab575f022f2aee3cee40077a2300375b6ebd4766e"),
	key: wif("L1BTKtsa43ELpcFudMX5hbFvSAFSFR9dAaTHYkEnnhrHftewyv5w").entropy("becddc56d92e2dd650403dc0eaa3b24e", source(PLAYER_COMMENT$28, "MD5 of the nine words, TOMI and two items")).derived(),
	techniques: [technique("md5-to-bip39-entropy", PLAYER_COMMENT$28)],
	prize: .007,
	hints: [
		official("Hint 1: \"42\"", THREAD$43, void 0, { answer: answer("The idea was simply to have once more the solution posted before the block and this solution string was from block 41 of the first run, like the first time I tried this.", THREAD$43) }),
		official("Format: [solution] TOMI [TOMI]", THREAD$43, void 0, { answer: answer("the solution to which will of course be \"42\" TOMI block 41", PLAYER_COMMENT$28) }),
		official("First three digits of MD5 hash are bec.", THREAD$43),
		official("Hint 2: TOMI field is two items", THREAD$43),
		official("Hint 3: solution is part of solution", THREAD$43),
		official("Hint 4: I can't get away with posting the literal exact solution before the block twice", THREAD$43),
		official("Hint 5: Or can I?", THREAD$43),
		official("Hint 6: Nine items in solution.", THREAD$43),
		official("Hint 7 (last one): TOMI field is block 41.", THREAD$43)
	],
	solvedAt: "2019-06-18 04:36:11",
	solveTime: 16871,
	transactions: [funding("ab5e3574025debb7bec7701aadeb487697f19e647976f62e38d4373819522057", "2019-06-17 23:55:00", .007), claim("bda242d4f6b539ac8c2a69c3358997ba88c6c01108283d137ec2789bd0a25d77", "2019-06-18 04:36:11", .00677174)]
});
const THREAD$42 = "https://www.reddit.com/r/Grycoin/comments/c297as/7_mbtc_quizchain2_block_43/";
const quizchain2Block43 = puzzle({
	id: "quizchain2/43",
	chain: "bitcoin",
	address: "169KvQtcBKheFbTooCqo1tHBGr23ZZvyZ5",
	sourceUrl: THREAD$42,
	startedAt: "2019-06-18 22:37:21",
	status: Status.Solved,
	pubkey: compressed("02757deb5f3a1a128e42696b030a0a660d394b009f6327fd1f23b4bc8e8f33a8fc"),
	key: wif("Kxzj9HFrK6jb9e4wLGBUMiSxwG5WB82QiKqygA8rxusE2sj7VGnC").entropy("e465846b8dc5e4789b972356fe8ef7e1", source(THREAD$42, "MD5 of the two words, TOMI and three words")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$42)],
	prize: .007,
	hints: [
		official("Question: Two words.", THREAD$42, void 0, { answer: answer("That results in \"rather between\" as the solution and \"block 42 mnemonic\" as the TOMI field.", THREAD$42) }),
		official("Format: [solution] TOMI [TOMI]", THREAD$42, void 0, { answer: answer("Solution : rather between TOMI block 42 mnemonic", "https://www.reddit.com/r/Grycoin/comments/c297as/comment/erikvui/") }),
		official("Solution format is [word1] [word2] with both in all lower case.", THREAD$42),
		official("TOMI field is three items.", THREAD$42),
		official("First three digits of MD5 hash are e46.", THREAD$42),
		official("First digit of solution only MD5 hash is a.", THREAD$42),
		official("First two digits of TOMI field only MD5 hash are 0c.", THREAD$42),
		official("Hint 1: My first idea was to use block 43 of the first run, but I rejected that one.", THREAD$42)
	],
	solvedAt: "2019-06-18 23:21:34",
	solveTime: 2653,
	transactions: [funding("6a79d13f7bc76af157493217f7e516ed5bb95bf4020df05bc92852a67d1325b7", "2019-06-18 22:37:21", .007), claim("5e1f08c971fbcd22932e31741db2f59929ca85e96cb732481981d99b5f0cc903", "2019-06-18 23:21:34", .0069322)]
});
const THREAD$41 = "https://www.reddit.com/r/Grycoin/comments/c2volp/7_mbtc_quizchain2_block_44/";
const quizchain2Block44 = puzzle({
	id: "quizchain2/44",
	chain: "bitcoin",
	address: "14Pm4c2h4vxf4gV1MP3rYGY293km6dpiP8",
	sourceUrl: THREAD$41,
	startedAt: "2019-06-20 07:21:19",
	status: Status.Solved,
	pubkey: compressed("031877dfc75d197dc557916d0b646c5182da9dd27140f97db329485f1fbf1dc270"),
	key: wif("KzGXbUuHWqjgz2fo22ti5dy35Lz126UdXeurijEf7WDWGLqXAeif").entropy("fd85fcee491c68b8dd9a0ce9ae791b8a", source(THREAD$41, "MD5 of the two words")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$41)],
	prize: .007,
	hints: [
		official("Question: https://youtu.be/nrIPxlFzDi0", THREAD$41, void 0, { answer: answer("Solution was to find something to substitute for \"satisfaction\". I thought \"good solution\" was a nice fit.", THREAD$41) }),
		official("Format: [solution].", THREAD$41),
		official("No TOMI field needed for this one.", THREAD$41),
		official("First three digits of MD5 hash are fd8.", THREAD$41)
	],
	solvedAt: "2019-06-20 16:06:55",
	solveTime: 31536,
	transactions: [funding("0f5625ab5a298733d4ac73dc0c77f3753e34dd08cdd56d4b1837f1c27fb86897", "2019-06-20 07:21:19", .007), claim("6ad4ed03389fc2991aa79a7835d188f886bf20288c2d60a1c30805b704ab05df", "2019-06-20 16:06:55", .00681626)]
});
const THREAD$40 = "https://www.reddit.com/r/Grycoin/comments/c37u67/7_mbtc_quizchain2_block_45/";
const quizchain2Block45 = puzzle({
	id: "quizchain2/45",
	chain: "bitcoin",
	address: "1NbNe8TPBewoG31Rf5bCof9Wj1QY7LBeGX",
	sourceUrl: THREAD$40,
	startedAt: "2019-06-21 05:12:12",
	status: Status.Solved,
	pubkey: compressed("037ec64356e589c888bcd47a338b0e3a7e9cd4d5e0116c80a812c06a90683585d7"),
	key: wif("Kwdh6YGsDBk4A3CKyb9KVftYxR4usAv2YTUDtN3jzE7aSMx8xVJg").entropy("df1ae0a564ffed778bee08eb43a699b3", source(THREAD$40, "MD5 of the letter, TOMI and three words")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$40)],
	prize: .007,
	hints: [
		official("Question: Satoshi's real identity is:", THREAD$40, void 0, { answer: answer("Solved half a day after first hint, solution was of course a) and TOMI field was \"timing of dropout\".", THREAD$40) }),
		official("a) Hal Finney", THREAD$40),
		official("b) Nick Szabo", THREAD$40),
		official("c) Dorian Nakamoto", THREAD$40),
		official("d) Craig Wright", THREAD$40),
		official("Format: [solution] TOMI [TOMI]", THREAD$40),
		official("First three digits of MD5 hash are df1.", THREAD$40),
		official("Solution format is only the letter, like this: a). TOMI field text is all lower case.", THREAD$40),
		official("I already published the necessary background yesterday at the Wattpad story.", THREAD$40),
		official("Hint 1: TOMI field format is three words, all in lower case.", THREAD$40)
	],
	solvedAt: "2019-06-22 20:34:30",
	solveTime: 141738,
	transactions: [funding("93be460b4a7332eb20783e42159fc2e6edf2585a13f7db31e89f1b9232c679f6", "2019-06-21 05:12:12", .007), claim("31d3f9aebee99880c2f15e1ec83df4c24f1569418fbfc7ef79776a53c146ddb9", "2019-06-22 20:34:30", .006808)]
});
const THREAD$39 = "https://www.reddit.com/r/Grycoin/comments/c3kyoe/7_mbtc_quizchain2_block_46/";
const quizchain2Block46 = puzzle({
	id: "quizchain2/46",
	chain: "bitcoin",
	address: "18kKYiuT1AbAhmzgUQ2czuAv654EvhfzeJ",
	sourceUrl: THREAD$39,
	startedAt: "2019-06-22 01:28:44",
	status: Status.Solved,
	pubkey: compressed("02f64fe34e296f74f8506392eab4ad9ff595d1e578b16a9d0ab8cef6d19b6d0d99"),
	key: wif("L5UuTbqw3NpNs8GadheiAKokWX1HdgaWLr4vz5E3kuuEPB4vJANR").entropy("7c4031b60d8dc8dfa8ab8a21f4db865d", source(THREAD$39, "MD5 of the two words, TOMI and six words")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$39)],
	prize: .007,
	hints: [
		official("Format: [solution] TOMI [TOMI]", THREAD$39, void 0, { answer: answer("Solution was \"Andrew Yang\" and TOMI was \"46th President of the United States\".", THREAD$39) }),
		official("TOMI field has six elements.", THREAD$39),
		official("First three digits of MD5 hash are 7c4.", THREAD$39),
		official("First digit of solution only MD5 hash is f.", THREAD$39),
		official("First two digits of TOMI field only MD5 hash are d3.", THREAD$39),
		official("This is about the number 46, but not about the Bitcoin space...", "https://www.reddit.com/r/Grycoin/comments/c3kyoe/comment/errzuqj/"),
		official("f6", "https://www.reddit.com/r/Grycoin/comments/c3kyoe/comment/ers3zsh/")
	],
	solvedAt: "2019-06-22 13:44:38",
	solveTime: 44154,
	transactions: [funding("2ca0f9512cba008c785c0f1a28a8f739d20965ac12d467c329eef34e47e8766c", "2019-06-22 01:28:44", .007), claim("6a43b61f5aee666d905bca82e1f7a952e204dfa86aca269a02d686c17988c370", "2019-06-22 13:44:38", .00683001)]
});
const THREAD$38 = "https://www.reddit.com/r/Grycoin/comments/c3vye3/11_mbtc_quizchain2_block_47/";
const quizchain2Block47 = puzzle({
	id: "quizchain2/47",
	chain: "bitcoin",
	address: "1N2niQ6254HESHab6YTSgUL1suyTLWjMeA",
	sourceUrl: THREAD$38,
	startedAt: "2019-06-22 12:40:59",
	status: Status.Solved,
	pubkey: compressed("024e03c3f7011b1637187744150c73e7332a07bd1d4f60dd6285751b781bf69184"),
	key: wif("L3siinurst6gR8nJQmjqm4UXEQxZjQ5aosXBVBqxTnfzDoL38nNY").entropy("f259fd354a72768507eb9d8d180c367a", source(THREAD$38, "MD5 of the number, TOMI and two words")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$38)],
	prize: .011,
	hints: [
		official("Question: 115257", THREAD$38, void 0, { answer: answer("Solution was \"21\" and TOMI field was \"cross sum\".", THREAD$38) }),
		official("Format: [solution] TOMI [TOMI]", THREAD$38, void 0, { answer: answer("21 TOMI cross sum", "https://www.reddit.com/r/Grycoin/comments/c3vye3/comment/ertjwdh/") }),
		official("First three digits of MD5 hash are f25.", THREAD$38)
	],
	solvedAt: "2019-06-22 23:32:32",
	solveTime: 39093,
	transactions: [funding("2965f73dd4f6acf94a19767fc53378d46855f985addcca6967d54b536cbb50ce", "2019-06-22 12:40:59", .011), claim("d32b5115bb55ef17a45822df3cbf11bb4ab2839e71bd86e9556a99b8a2d8ad1f", "2019-06-22 23:32:32", .01095968)]
});
const THREAD$37 = "https://www.reddit.com/r/Grycoin/comments/c4ndaa/7_mbtc_quizchain2_block_48/";
const PLAYER_COMMENT$25 = "https://www.reddit.com/r/Grycoin/comments/c4ndaa/comment/erxhy2q/";
const quizchain2Block48 = puzzle({
	id: "quizchain2/48",
	chain: "bitcoin",
	address: "19NR1m283F8npNdauDjQgbnEiR5cA2mdcp",
	sourceUrl: THREAD$37,
	startedAt: "2019-06-24 06:05:23",
	status: Status.Solved,
	pubkey: compressed("02c31a294202345afd89eef5b756f4c8c9e4ed5dd4dc6a88c1c389ed0aa66b910e"),
	key: wif("L3kWnd9712hqj9QZVRA9oLAXZ3x2ddK3nRMEPN3Q5iV8D3PuZoP4").entropy("2c142b58c037bc30c44da6277c2cff91", source(PLAYER_COMMENT$25, "MD5 of the two words, TOMI and two words")).derived(),
	techniques: [technique("md5-to-bip39-entropy", PLAYER_COMMENT$25)],
	prize: .007,
	hints: [
		official("Question: Think", THREAD$37, void 0, { answer: answer("This was not that hard given the word \"Think\" and the topic \"advertising campaign\" as there is a particular fruity company that has used this.", PLAYER_COMMENT$25) }),
		official("Format: [solution] TOMI [TOMI]", THREAD$37, void 0, { answer: answer("Think different TOMI Apple slogan", PLAYER_COMMENT$25) }),
		official("Solution format is two words, the first one with first letter in capitals, like Word1 word2.", THREAD$37),
		official("TOMI field format is also Word1 word2.", THREAD$37),
		official("First three digits of MD5 hash are 2c1.", THREAD$37),
		official("First digit of solution only MD5 hash is e.", THREAD$37),
		official("First two digits of TOMI field only MD5 hash are f3.", THREAD$37),
		official("This block will be similar in purpose.", THREAD$37)
	],
	solvedAt: "2019-06-24 14:00:37",
	solveTime: 28514,
	transactions: [funding("0601c2d6b06a9dee4491eeb2123a72bfc132dab3e1bda04fdb79e6fd914b6ccb", "2019-06-24 06:05:23", .007), claim("930486a0af9addbe3ba73cf337aa3d1c77ffdfada166d0125643c8db231facc6", "2019-06-24 14:00:37", .00673658)]
});
const THREAD$36 = "https://www.reddit.com/r/Grycoin/comments/c54umz/7_mbtc_quizchain2_block_49/";
const quizchain2Block49 = puzzle({
	id: "quizchain2/49",
	chain: "bitcoin",
	address: "1JNoG4tCkwqH49FWa2vGRzMyd9MMDBoeUd",
	sourceUrl: THREAD$36,
	startedAt: "2019-06-25 05:16:55",
	status: Status.Solved,
	pubkey: compressed("03b8fbb362216c3a76899f28ce5af7f7d9e7f30afdbe61d9f2e925ff4768bd7675"),
	key: wif("L1w1EzaQwHoE3rR9xhVQ3Wutamraai25D7U82Z4LH8c6cRWXUFqT").entropy("4f1cfb8b91afad29e9b5490c6318e14b", source(THREAD$36, "MD5 of the three words, TOMI and two words")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$36)],
	prize: .007,
	hints: [
		official("Question: Don't", THREAD$36, void 0, { answer: answer("Solution was \"Don't be evil\".", THREAD$36) }),
		official("Format: [solution] TOMI Google slogan", THREAD$36, void 0, { answer: answer("answer was of course: Don't be evil TOMI Google slogan", "https://www.reddit.com/r/Grycoin/comments/c54umz/comment/erztw4n/") }),
		official("First three digits of MD5 hash are 4f1.", THREAD$36),
		official("This block uses a method similar to the previous one.", THREAD$36)
	],
	solvedAt: "2019-06-25 08:17:27",
	solveTime: 10832,
	transactions: [funding("bc25a89a0575d9f19f6953b5db3eafd7758111a03bcbbe108ba8c7668e824ba3", "2019-06-25 05:16:55", .007), claim("a924d7721cc4f56d2ddcf0c177d16853a63069ac213b78ffec0ca8ae0e6287bf", "2019-06-25 08:17:27", .00681491)]
});
const THREAD$35 = "https://www.reddit.com/r/Grycoin/comments/c5kst3/7_mbtc_quizchain_2_block_50/";
const quizchain2Block50 = puzzle({
	id: "quizchain2/50",
	chain: "bitcoin",
	address: "1FGJhLU2gR2ucNbWsayA5pV15WbFJsvqGS",
	sourceUrl: THREAD$35,
	startedAt: "2019-06-25 23:44:43",
	status: Status.Solved,
	pubkey: compressed("030ce01cec5d184e734c75768e3f25d6eb68f44ed09f567172047a9528445effc0"),
	key: wif("L56xZ3ZN8Js4i3rzpY2d5W6KtRBTcgesPPvhnkqrGLoCC95VBzUg").entropy("c3260755c216f2e1b081b2fac119814b", source(THREAD$35, "MD5 of the checksum, TOMI and two words")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$35)],
	prize: .007,
	hints: [
		official("Question: 111111111111111111111", THREAD$35, void 0, { answer: answer("As explained by the winner in a comment below, solution was \"4oLvT2\" and TOMI field was \"address checksum\".", THREAD$35) }),
		official("Format: [solution] TOMI [TOMI]", THREAD$35, void 0, { answer: answer("4oLvT2 TOMI address checksum", "https://www.reddit.com/r/Grycoin/comments/c5kst3/comment/es2q2li/") }),
		official("First three digits of MD5 hash are c32.", THREAD$35),
		official("First digit of solution only Md5 hash is 8.", THREAD$35),
		official("First two digits of TOMI field only MD5 hash are 64.", THREAD$35)
	],
	solvedAt: "2019-06-26 06:51:06",
	solveTime: 25583,
	transactions: [funding("7c3aa2558e55003dc96dec0ffaea8d90dbc02e63acdec4c3665014471e3266f9", "2019-06-25 23:44:43", .007), claim("1f69eaad1365d96783f39e8d8024187a993c8c7710e32f9b2c2c28f71925be76", "2019-06-26 06:51:06", .006736)]
});
const THREAD$34 = "https://www.reddit.com/r/Grycoin/comments/c5xj38/7_mbtc_quizchain2_block_51/";
const quizchain2Block51 = puzzle({
	id: "quizchain2/51",
	chain: "bitcoin",
	address: "17EPFGMydd2suYjbNShHrFYzj41JGUHTVa",
	sourceUrl: THREAD$34,
	startedAt: "2019-06-26 23:04:41",
	status: Status.Solved,
	pubkey: compressed("023b2309ea51d72b7147959bd21f5b90f185570e2dc4427420bd34f3e932f6cf5f"),
	key: wif("Kx5RaMi7KbKxouzMdEoszZDuGfLnn8aNEAx1xE8CJrsxBZGkStyY").entropy("4c4cdbf69c62f3bf2dc68ab5400f8669", source(THREAD$34, "MD5 of the number and two words")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$34)],
	prize: .007,
	hints: [official("Format: [solution]", THREAD$34, void 0, { answer: answer("Solution was simply \"51 percent attack\" and winner explained in comments that he already anticipated that, so the only time he needed was to run the Coleman tool.", THREAD$34) }), official("First three digits of MD5 hash are 4c4.", THREAD$34)],
	solvedAt: "2019-06-26 23:04:41",
	solveTime: 0,
	transactions: [funding("424a3f6ba6573baba805b363819975993adf6f6cb1c20949baf8efbe510d2eab", "2019-06-26 23:04:41", .007), claim("7eb91088189d1a511408f316bb6e3bf06e773b27dbcd6c152370c457b95f0f5c", "2019-06-26 23:04:41", .00664634)]
});
const THREAD$33 = "https://www.reddit.com/r/Grycoin/comments/c6jvz5/7_mbtc_quizchain2_block_52/";
const quizchain2Block52 = puzzle({
	id: "quizchain2/52",
	chain: "bitcoin",
	address: "16NN7TqmCqQU5u6SmxMfaw26776mGoVxSC",
	sourceUrl: THREAD$33,
	startedAt: "2019-06-28 14:42:25",
	status: Status.Solved,
	pubkey: compressed("038cb56380787c44d53ffd057ee300dc8c449e562fe13020c61b63f03899e3df49"),
	key: wif("KxwMgyXqiaWDsiJwxcTeHNCuFjGs2DyyujqCmXLqvcM8XFwXo5Bu").entropy("21bfa780bcb57ccdab161cc156650fc2", source(THREAD$33, "MD5 of the six words")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$33)],
	prize: .007,
	hints: [
		official("Question: Six words.", THREAD$33, void 0, { answer: answer("As winner explained in comments, solution was bat bat bot bit bet but.", THREAD$33) }),
		official("Format: [solution]", THREAD$33, void 0, { answer: answer("Solution: bat bat bot bit bet but", "https://www.reddit.com/r/Grycoin/comments/c6jvz5/comment/es9dmdh/") }),
		official("FIrst three digits of MP5 hash are 21b.", THREAD$33)
	],
	solvedAt: "2019-06-28 14:42:25",
	solveTime: 0,
	transactions: [funding("649f2566b32f1db7783f8434c8a73c1e1f34a660c5b434f7b9419d6cf173c7e2", "2019-06-28 14:42:25", .007), claim("fd5872115e89537dcfaab7d84e0a790da3ffcafcb46839c446b65d8dc9798595", "2019-06-28 14:42:25", .00665421)]
});
const THREAD$32 = "https://www.reddit.com/r/Grycoin/comments/c6w965/7_mbtc_quizchain2_block_53/";
const quizchain2Block53 = puzzle({
	id: "quizchain2/53",
	chain: "bitcoin",
	address: "14v36xE3KFyP35S2BfoK7XUYMbg3j2NXRy",
	sourceUrl: THREAD$32,
	startedAt: "2019-06-29 03:10:25",
	status: Status.Solved,
	pubkey: compressed("0252c71dff54db39a7552aec853bbde052fd4dcde19cd6f48caca5e4dafdf4a306"),
	key: wif("Kwp34pYdLg522kp89Vnd1b2x6H56B8vrNpqG1WhtbRZ8FSG8DC51").entropy("4c17b6bd386f7b6a7807e783de250af1", source(THREAD$32, "MD5 of the URL")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$32)],
	prize: .007,
	hints: [
		official("Question: Superman", THREAD$32, void 0, { answer: answer("which is a Tweet by Jameson Lopp showing a picture of Hal Finney in a Superman t-shirt.", THREAD$32) }),
		official("Format: [solution], solution format is relevant URL unchanged.", THREAD$32, void 0, { answer: answer("https://mobile.twitter.com/lopp/status/1143879778170232833", THREAD$32) }),
		official("FIrst three digits of MD5 hash (not MP5, spelled correctly this time) are 4c1.", THREAD$32),
		official("Just copypaste as is from browser, so include http or www or whatever there is. Change nothing.", "https://www.reddit.com/r/Grycoin/comments/c6w965/comment/esboql9/"),
		official("Update: As noted in block 54 (already solved) there is a connection from Superman to Satoshi (Hal FInney). That is a hint for this block.", THREAD$32),
		official("Another is the fact that the URL will change depending on what kind of hardware you use. I used a mobile device.", THREAD$32),
		official("And the maybe decisive hint is \"warm miners\", though that one also does not lead to the solution with a simple Google search.", THREAD$32)
	],
	solvedAt: "2019-06-30 08:21:06",
	solveTime: 105041,
	transactions: [funding("68c6f4f253c4501ea1ab3b53420cb73ed0253a24cfc30a9c244bca5dd2f3f561", "2019-06-29 03:10:25", .007), claim("429e4f59abc0c62679d067c387482392d11f67e003c272d96c880d03e1cbe890", "2019-06-30 08:21:06", .00690208)]
});
const THREAD$31 = "https://www.reddit.com/r/Grycoin/comments/c78se0/7_mbtc_quizchain2_block_54/";
const quizchain2Block54 = puzzle({
	id: "quizchain2/54",
	chain: "bitcoin",
	address: "1HK86jWSJoWYwDaMSw5PL5oVfqjoiSbaQ1",
	sourceUrl: THREAD$31,
	startedAt: "2019-06-29 23:30:20",
	status: Status.Solved,
	pubkey: compressed("02037f873b81bbe8886d8ec9d3d3565de1df9631df6f7cf58406f37ae446b5853b"),
	key: wif("KzbLxqZdBuNJWkCouW1v47Vwbp9oBAN2WNb3nyM64mFhckqfg9tt").entropy("2d73ff7b955ab880925c0eddcef8af0b", source(THREAD$31, "MD5 of the three letters, TOMI and three words")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$31), technique("caesar", THREAD$31)],
	prize: .007,
	hints: [
		official("Question: What's the S stand for?", THREAD$31, void 0, { answer: answer("As winner posted in comments, solution was \"HAS\" and TOMI field was HAL BIT Caesar.", THREAD$31) }),
		official("Format: [solution] TOMI [TOMI].", THREAD$31, void 0, { answer: answer("HAS TOMI HAL BIT Caesar", "https://www.reddit.com/r/Grycoin/comments/c78se0/comment/ese1sru/") }),
		official("Format of solution is three capital letters, including S.", THREAD$31),
		official("First three digits of MD5 hash are 2d7.", THREAD$31),
		official("First two digits of TOMI field only are ee.", THREAD$31),
		official("Hint 1: TOMI format [XXX XXX Word] with XXX three capital letters and word first letter only in capital.", THREAD$31),
		official("Hint 2: Hal's posts on bitcointalk https://bitcointalk.org/index.php?action=profile;u=2436;sa=showPosts", THREAD$31),
		official("Hint 3: Number 4 on that list.", THREAD$31),
		official("Hint 4: IBM and BITcoin", THREAD$31),
		official("Hint 5: Imperfect anagram HAL", THREAD$31)
	],
	solvedAt: "2019-06-30 06:48:05",
	solveTime: 26265,
	transactions: [funding("5fcff3e4e25d10da663514c559ef573314895c7827c800caa72e3ac25c81e48b", "2019-06-29 23:30:20", .007), claim("63cf498f2bfbe2c86c19a346f19ef8da7c8ceb587d9efffe8e2e02cbf80ec6c5", "2019-06-30 06:48:05", .00661024)]
});
const THREAD$30 = "https://www.reddit.com/r/Grycoin/comments/c7kv4m/77_mbtc_quizchain2_block_55/";
const quizchain2Block55 = puzzle({
	id: "quizchain2/55",
	chain: "bitcoin",
	address: "1oK2Tkiikgjj4D5wXebc7rZXtGaMVti4X",
	sourceUrl: THREAD$30,
	startedAt: "2019-06-30 09:31:18",
	status: Status.Solved,
	pubkey: compressed("03d3ecd156761abcbe8abcc52701afe2d25e3ad9ef4f78d7b260b69e18898165e3"),
	key: wif("KwYmWqLJtcbRT2dMtoU3VQvAzAqiAsi2D3tzydfjVvYYDy3tDUrr").entropy("48aa19ec8d0a8f6472c66693c4a7ef5f", source(THREAD$30, "MD5 of the acronym, TOMI and four words")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$30)],
	prize: .077,
	hints: [
		official("Question: Be afraid. Be very afraid.", THREAD$30, void 0, { answer: answer("Solved at sight, solution was FOMO, TOMI was fear of missing out.", THREAD$30) }),
		official("Format: [solution] TOMI [TOMI]", THREAD$30, void 0, { answer: answer("FOMO TOMI fear of missing out", "https://www.reddit.com/r/Grycoin/comments/c7kv4m/comment/esfv105/") }),
		official("FIrst three digits of MD5 hash are 48a.", THREAD$30)
	],
	solvedAt: "2019-06-30 23:03:40",
	solveTime: 48742,
	transactions: [funding("de3a5bc5bed98735094515dbeb2174c55bddbc928b2d4eff277ebcb9d714955a", "2019-06-30 09:31:18", .077), claim("ba0af11feae12f711949cc760160c4c2ad233b89913156ea2d8905b3e7458b50", "2019-06-30 23:03:40", .07664518)]
});
const THREAD$29 = "https://www.reddit.com/r/Grycoin/comments/c88x4w/7_mbtc_quizchain2_block_56/";
const quizchain2Block56 = puzzle({
	id: "quizchain2/56",
	chain: "bitcoin",
	address: "14tuS6dG5BXd1usDTUJduEDafFAuET74P5",
	sourceUrl: THREAD$29,
	startedAt: "2019-07-02 11:17:56",
	status: Status.Solved,
	pubkey: compressed("03a1ea1a601498f87a2e4623356412690bc589622568a011838ddab4750ecc23d4"),
	key: wif("L17Yo2Tz1HVJwrHeQj9tvruYffvna3pEZEGfJ6ToGEZpKbn66cAB").entropy("b9f039524fd1a9043817541f429c573e", source(THREAD$29, "MD5 of the sentence")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$29)],
	prize: .007,
	hints: [
		official("Question: unlucky", THREAD$29, void 0, { answer: answer("Method was using the post number 56 (number of this block) Hal as Satoshi on Bitcointalk and using the whole sentence the word \"unlucky\" appeared in as a solution, which works out to \"Maybe you were just unlucky to have an exit node without reverse lookup.\"", THREAD$29) }),
		official("Format: [solution]", THREAD$29, void 0, { answer: answer("\"Maybe you were just unlucky to have an exit node without reverse lookup.\" exactly as Satoshi said in Bitcointalk forum in his own post number of 56, only first statement of it also. (I copy pasted it)", "https://www.reddit.com/r/Grycoin/comments/c88x4w/comment/esp6ny4/") }),
		official("First three digits of MD5 hash are b9f.", THREAD$29),
		official("Hint 1: Something Hal Finney said.", THREAD$29)
	],
	solvedAt: "2019-07-03 18:58:23",
	solveTime: 114027,
	transactions: [funding("f4bcd3b94827d049362e075d1122a9aeae4983a66debe92957b2c5069a2c4d68", "2019-07-02 11:17:56", .007), claim("c200e52970f155806c4ea432c9ea264428da25b10d2f639fb4a7bda5b08dcbcd", "2019-07-03 18:58:23", .00674829)]
});
const THREAD$28 = "https://www.reddit.com/r/Grycoin/comments/c8lcsr/77_mbtc_quizchain2_block_57/";
const quizchain2Block57 = puzzle({
	id: "quizchain2/57",
	chain: "bitcoin",
	address: "128cmgWEf3Cbor5ftazjtisNAfaiRhDgyk",
	sourceUrl: THREAD$28,
	startedAt: "2019-07-03 04:38:32",
	status: Status.Solved,
	pubkey: compressed("03893c868728802733060ed67e18b584887cf89c4b59bdd3d1012fa6410461a839"),
	key: wif("L5fbSSbofJhFg5XzETrszGheM53RyQaM2am8ckJMxAuWzSHNqQN7").entropy("d265daa81817aeae347023e625875961", source(THREAD$28, "MD5 of the URL")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$28)],
	prize: .077,
	hints: [
		official("Question: Thinking", THREAD$28, void 0, { answer: answer("The solution was the URL to Satoshi's third tweet on Bitcoin (the first one was the more famous \"running Bitcoin\" one).", THREAD$28) }),
		official("Format: [solution]", THREAD$28, void 0, { answer: answer("https://mobile.twitter.com/halfin/status/1153096538", THREAD$28) }),
		official("First three digits of MD5 hash are d26.", THREAD$28)
	],
	solvedAt: "2019-07-03 14:42:19",
	solveTime: 36227,
	transactions: [funding("5d2ba35d75f5f87276141aa73eb71b5790e33d0d602d2e03fd166ee3e64f958a", "2019-07-03 04:38:32", .077), claim("3454a6a4c4ce98d33b6abc781639b9a1b6a3d00c96624f92143f42c5786b35b1", "2019-07-03 14:42:19", .07674848)]
});
const THREAD$27 = "https://www.reddit.com/r/Grycoin/comments/c8xwgt/7_mbtc_quizchain2_block_58/";
const quizchain2Block58 = puzzle({
	id: "quizchain2/58",
	chain: "bitcoin",
	address: "1ExTyMrA43mFJukabSCicdjdgG5ZJ2y2R9",
	sourceUrl: THREAD$27,
	startedAt: "2019-07-03 23:36:04",
	status: Status.Solved,
	pubkey: compressed("035b0265f559a57e5c5ef37d385fc9f8d4537ee35183d568b244e0d048d7c4f7a7"),
	key: wif("KxQHHCrCXDXEDCFvEop32srqFzmKseK8ofaf5uxdddPGZuYYnEgY").entropy("a2ad440e71697e83075c4f1fcc2dd4b2", source(THREAD$27, "MD5 of the sentence")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$27)],
	prize: .007,
	hints: [
		official("Question: coming from you", THREAD$27, void 0, { answer: answer("Solution was \"That means a lot coming from you, Hal.\", which I found remarkable (and amusing in the irony involved) as one instance of Hal talking to himself.", THREAD$27) }),
		official("Format: [solution]", THREAD$27, void 0, { answer: answer("As someone else already noted the answer was \"That means a lot coming from you, Hal.\" as posted by Satoshi.", "https://www.reddit.com/r/Grycoin/comments/c8xwgt/comment/esr21ua/") }),
		official("First three digits of MD5 hash are a2a.", THREAD$27)
	],
	solvedAt: "2019-07-04 04:07:03",
	solveTime: 16259,
	transactions: [funding("a926226f9861bc18c0e9361f194f0b0d7345591f7cbe015c5eb0f57316f39766", "2019-07-03 23:36:04", .007), claim("223cc1c6cb05ba08cfdce7629dbcd945e5834db091f5305d4f010d0ff5940984", "2019-07-04 04:07:03", .00682048)]
});
const THREAD$26 = "https://www.reddit.com/r/Grycoin/comments/c98uls/7_mbtc_quizchain2_block_59/";
const quizchain2Block59 = puzzle({
	id: "quizchain2/59",
	chain: "bitcoin",
	address: "1JtmV83kdAXhBAqEWCRQAsJ7gU9jzPfYnV",
	sourceUrl: THREAD$26,
	startedAt: "2019-07-04 12:35:54",
	status: Status.Solved,
	pubkey: compressed("0360420865b60d7120887dee106e204b3f7a5cc12ef5e6e0451e466abd7d7126ee"),
	key: wif("Kxwr6iJGfiBvm11qLdqKUv9wz1BRJ2MZJRsjJH4HahURfvxF6A4d").entropy("9be70160646f1c10dbec577ebf20f715", source("https://www.reddit.com/r/Grycoin/comments/c98uls/comment/et4qkxz/", "MD5 of the two letters, TOMI and six words")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$26), technique("atbash", THREAD$26)],
	prize: .007,
	hints: [
		official("Question: Famous film.", THREAD$26, void 0, { answer: answer("Solution was ET and TOMI field was Atbash foldover two to the right, exactly the same TOMI field as the last time I used this method.", THREAD$26) }),
		official("Format: [solution] TOMI [TOMI]", THREAD$26),
		official("FIrst three digits of MD5 hash are 9b3.", THREAD$26),
		official("Would be really difficult without context, but it uses a method used previously.", THREAD$26),
		official("Hint 1: I use it quite a lot here.", THREAD$26),
		official("Hint 2: FIrst two words of TOMI field are Atbash foldover.", THREAD$26)
	],
	solvedAt: "2019-07-06 23:18:08",
	solveTime: 211334,
	transactions: [funding("1d398d21b1a599f728ad5c7652194b3de794c545401b11ac32be22987afd3a88", "2019-07-04 12:35:54", .007), claim("02a841504bfae131472f79a0c7662f44ec329402de07585e14f3c24fa823867d", "2019-07-06 23:18:08", .00682048)]
});
const THREAD$25 = "https://www.reddit.com/r/Grycoin/comments/c9tbo0/7_mbtc_quizchain2_block_60/";
const quizchain2Block60 = puzzle({
	id: "quizchain2/60",
	chain: "bitcoin",
	address: "1Gz9gHf4VyPorCDkpXtPg1xakQwGsJ7TP3",
	sourceUrl: THREAD$25,
	startedAt: "2019-07-06 02:14:11",
	status: Status.Solved,
	pubkey: compressed("03d1f28ea540fdf4aa0069d37bdc97d61922c71efaa5bd031fdc3fe4e3b1e6a1bd"),
	key: wif("L256zRAFxCi98t3NE17vHvAs8rUgWV73fm58a5Bi4bUyJ2NfEZqF").entropy("e8328012af0071c31ceb0c6113c8b25c", source(THREAD$25, "MD5 of the two words")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$25), technique("atbash", THREAD$25)],
	prize: .007,
	hints: [
		official("Question: Price 2N", THREAD$25, void 0, { answer: answer("Solution was \"Mayer Multiple\".", THREAD$25) }),
		official("Format: [solution]", THREAD$25, void 0, { answer: answer("Got a confirmation; the solution was \"Mayer Multiple\".", "https://www.reddit.com/r/Grycoin/comments/c9tbo0/comment/etbfmtr/") }),
		official("First three digits of MD5 hash are e83.", THREAD$25),
		official("I use it quite a bit here.", THREAD$25),
		official("Atbash makes this", THREAD$25),
		official("price MM", THREAD$25)
	],
	solvedAt: "2019-07-09 04:08:18",
	solveTime: 266047,
	transactions: [funding("c21bd6238a66318a27b5bf54d7e3bdbd16f41c707336c8189f983199f0069bb9", "2019-07-06 02:14:11", .007), claim("786909499a0f53356062ae87fb83e64ce3006d24e90edc653dac85d054b27282", "2019-07-09 04:08:18", .00698)]
});
const THREAD$24 = "https://www.reddit.com/r/Grycoin/comments/ca58xg/77_mbtc_quizchain2_block_61/";
const quizchain2Block61 = puzzle({
	id: "quizchain2/61",
	chain: "bitcoin",
	address: "1CKDiWxbYF8v5KShLTJkuMqDkxeNaqj4yU",
	sourceUrl: THREAD$24,
	startedAt: "2019-07-07 02:49:59",
	status: Status.Solved,
	pubkey: compressed("02c6c0b2c8bc4fa7faab53a50c0c24756798a2503d955f608ae2ec6c7e55f72e6a"),
	key: wif("KyfhrSRoruWDzWinJdZCaQv1va2XCiraxJfYzDwtJ3R7tzFyJrRn").entropy("06da9c6f65b60920eefcdf2443a6e24e", source(THREAD$24, "MD5 of the number, TOMI and .org")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$24)],
	prize: .077,
	hints: [
		official("Question: A number.", THREAD$24, void 0, { answer: answer("As winner reports in comments, solution was 350 and TOMI was .org.", THREAD$24) }),
		official("Format: [solution] TOMI [TOMI]", THREAD$24, void 0, { answer: answer("350 TOMI .org", "https://www.reddit.com/r/Grycoin/comments/ca58xg/comment/etghruh/") }),
		official("First three digits of MD5 hash are 06d (not copypasted but triple checked).", THREAD$24),
		official("First two digits of TOMI field only are 4b (not copypasted but double checked).", THREAD$24),
		official("Hint: Not just any number, but the most important number in the history of humanity.", THREAD$24),
		official("Hint 2: Smallest hint ever. If you look really hard, maybe you can see it below:", THREAD$24),
		official(".", THREAD$24),
		official("So here goes a more decisive hint on what this is about. \"Most important number\" does not mean much if you do not know what is important in my world. A clue to that is found in the last big block before this one (block 57), where I say that a certain problem seems to be important. Important enough to make it the topic of the 7 pm big block on Tanabata day.", THREAD$24),
		official("Yes, only number, no other element. And actually no decimal point, I just said in the hint that the dot is in the TOMI field.", "https://www.reddit.com/r/Grycoin/comments/ca58xg/comment/etf3gfj/")
	],
	solvedAt: "2019-07-10 20:28:04",
	solveTime: 322685,
	transactions: [funding("4cd366e045832f56ac5cfa354edd3b7505ff4caee32e4c0b48f192faed652d26", "2019-07-07 02:49:59", .077), claim("afe8352f96f16dda3abab49bfdb93fd09b475af0bf0b1361b7c4a365dc7e8eaa", "2019-07-10 20:28:04", .07651357)]
});
const THREAD$23 = "https://www.reddit.com/r/Grycoin/comments/cag7u1/7_mbtc_quizchain2_block_62/";
const quizchain2Block62 = puzzle({
	id: "quizchain2/62",
	chain: "bitcoin",
	address: "1FPi8gMKZLD61dU3Zeb9vrwDc6yXpg4Ff7",
	sourceUrl: THREAD$23,
	startedAt: "2019-07-07 23:36:04",
	status: Status.Solved,
	pubkey: compressed("0213ff8008f9ee03bd71ee0c7e6b0fe9729cbfc9543f3f238f092783ecb6d874ff"),
	key: wif("KwvhXWUQG4Gg3S3TomjZh68Qq48AEAj6huCWWqMwC17ztmAPgJse").entropy("bf472225686e7f9edca7e4c79fcc3cbb", source(THREAD$23, "MD5 of the one word")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$23)],
	prize: .007,
	hints: [
		official("Question: 77", THREAD$23, void 0, { answer: answer("Solution was Tanabata, which is the name of the festival held on July 7 in Japan.", THREAD$23) }),
		official("Format: (solution)", THREAD$23),
		official("First three digits of MD5 hash are bf4.", THREAD$23)
	],
	solvedAt: "2019-07-08 04:44:50",
	solveTime: 18526,
	transactions: [funding("1789a6b33846d93c8d0859377cd659d8196e2a6c10b4db816c83fe76e516557f", "2019-07-07 23:36:04", .007), claim("d79d063f2c653692f3299250fa61dadf985e375a6c24762b9770328fc4f403db", "2019-07-08 04:44:50", .00621357)]
});
const THREAD$22 = "https://www.reddit.com/r/Grycoin/comments/casci2/7_mbtc_quizchain2_block_63/";
const quizchain2Block63 = puzzle({
	id: "quizchain2/63",
	chain: "bitcoin",
	address: "1MnL2VeHEX3wE2dvUWfJ3H3tb1AqRhxSWK",
	sourceUrl: THREAD$22,
	startedAt: "2019-07-08 11:29:09",
	status: Status.Solved,
	pubkey: compressed("0265a6820f6b279b01478163f8d8189c8a6da988faba2d42bdbce75ea5eed6fd5f"),
	key: wif("Kwia5vhHRge5oND9mVU6UsoJhtVVdEnYfNHnPnfLWHHauUopjhic").entropy("5615487295f19de75e253099838737d9", source(THREAD$22, "MD5 of the four words")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$22)],
	prize: .007,
	hints: [
		official("Question: IAOAOI", THREAD$22, void 0, { answer: answer("solution was \"I am omnipotent Aoi\", which would be a good message for Cariga Bright to sign in 2029", THREAD$22) }),
		official("Format: (solution).", THREAD$22, void 0, { answer: answer("Solved! solution was \"I am omnipotent Aoi\".", "https://www.reddit.com/r/Grycoin/comments/casci2/comment/etgx7js/") }),
		official("FIrst three digits of MD5 hash are 561 (copypasted).", THREAD$22),
		official("It is a special block dedicated to someone absolutely not existing whatsoever called Cariga Bright (which is a clue for the solution).", THREAD$22),
		official("Not commenting much at this stage, but I can confirm that there is some kind of hint in the new Wattpad story.", "https://www.reddit.com/r/Grycoin/comments/casci2/comment/etbj6gc/"),
		official("\"I am a young woman of Japanese ancestry, who is very smart and sincere, Aoi Nakamoto.\"", THREAD$22),
		official("\"**I a**m a young woman of Japanese ancestry, who is very smart and sincere, **Aoi** Nakamoto.\"", THREAD$22)
	],
	solvedAt: "2019-07-10 23:17:02",
	solveTime: 215273,
	transactions: [funding("7de43ce4ae06ac4c2c7de9b8f9466af1a2f8fd6c3595310516b23a0584f5c983", "2019-07-08 11:29:09", .007), claim("ac17f5ed98ed1ea7b406d0b832c4c252c6bbd19d12cea5d4619f8f9c6e0e578d", "2019-07-10 23:17:02", .00679398)]
});
const THREAD$21 = "https://www.reddit.com/r/Grycoin/comments/cbgf21/7_mbtc_quizchain2_block_64/";
const quizchain2Block64 = puzzle({
	id: "quizchain2/64",
	chain: "bitcoin",
	address: "1HhtnrYdbu6n6BYMuLu4FK1CvCMWeZoFQA",
	sourceUrl: THREAD$21,
	startedAt: "2019-07-10 11:04:59",
	status: Status.Solved,
	pubkey: compressed("036e1a9394cc9f0ffe31f8048d4bd1d6f5cf53d2c1ee38fe3b878a4dca3879130c"),
	key: wif("L3Hj2G6FMatruJkncaNyaXGRhec61jFcXhS753nwUQPyhHZfptmU").entropy("2154d8826f5789ddf09aa1e226d89bfa", source(THREAD$21, "MD5 of the word, TOMI and a word")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$21), technique("atbash", THREAD$21)],
	prize: .007,
	hints: [
		official("Question: JD6", THREAD$21, void 0, { answer: answer("The solution required to use Atbash on the JD part, which results in QW, then note that the popular QWERTY format has six letters. QWERTY was the solution.", THREAD$21) }),
		official("Format: [solution] TOMI [TOMI]", THREAD$21, void 0, { answer: answer("TOMI was \"keyboard\", but I have no idea how much resistance that provided to robots.", THREAD$21) }),
		official("TOMI field is one word in lower case.", THREAD$21),
		official("First three digits of MD5 hash are 215 (copypasted).", THREAD$21)
	],
	solvedAt: "2019-07-10 23:17:02",
	solveTime: 43923,
	transactions: [funding("650dfa0f8a43f4e315a3fc8bbfa5b501fde0314618049bec859b820d94be27a4", "2019-07-10 11:04:59", .007), claim("19da61a320921e5c05ef3d7af119c7aec9cc56517d2c2103c99288e233cb0c0d", "2019-07-10 23:17:02", .00679398)]
});
const THREAD$20 = "https://www.reddit.com/r/Grycoin/comments/cbt0ej/7_mbtc_quizchain2_block_65/";
const quizchain2Block65 = puzzle({
	id: "quizchain2/65",
	chain: "bitcoin",
	address: "1JcB65PrSGheTzrQLXPH3vTBRDGPtnqgBR",
	sourceUrl: THREAD$20,
	startedAt: "2019-07-11 04:46:31",
	status: Status.Solved,
	pubkey: compressed("027da4330d91a3076ea9df3b9e809e92fdd1c93cbc74264279a98a1087d5c0c65b"),
	key: wif("Kyciwwnxcpi5onoSC5aMtfSMLqg686EFfgfokxTHxReFmi8QWDuZ").entropy("921010c69200b35e14be1829bb9cbd98", source(THREAD$20, "MD5 of the word, TOMI and a word")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$20)],
	prize: .007,
	hints: [
		official("Question: Second", THREAD$20, void 0, { answer: answer("Solution was \"layer\" and TOMI was \"Grycoin\".", THREAD$20) }),
		official("Format: [solution] TOMI [TOMI]", THREAD$20, void 0, { answer: answer("full solution is: \"layer TOMI Grycoin\"", "https://www.reddit.com/r/Grycoin/comments/cbt0ej/comment/ethzmx4/") }),
		official("Solution is one word in lower case and TOMI field is one word starting with a capital letter, like \"Bitcoin\".", THREAD$20),
		official("First three digits of MD5 hash are 921.", THREAD$20)
	],
	solvedAt: "2019-07-11 08:10:01",
	solveTime: 12210,
	transactions: [funding("8e03f34b3a966abf163d11c7da11987e1d5037c8fe4d252d4d096e5400657b0e", "2019-07-11 04:46:31", .007), claim("3cc22c53135939d694eee1124e469dcabf81d0949a51c6a678504531eb909a7b", "2019-07-11 08:10:01", .00681261)]
});
const THREAD$19 = "https://www.reddit.com/r/Grycoin/comments/cc5uka/7_mbtc_quizchain2_block_66/";
const quizchain2Block66 = puzzle({
	id: "quizchain2/66",
	chain: "bitcoin",
	address: "1Lrh5pgaaKXdWC9u5bzp9ogsNktjPWJMij",
	sourceUrl: THREAD$19,
	startedAt: "2019-07-11 23:14:21",
	status: Status.Solved,
	pubkey: compressed("028b06cd25a5f2a17be760c8dd54a6e8d8e6bb2b2c2ede633d60b479872fd98dea"),
	key: wif("KyR2KVqfhwQ7gSdx1ZVNouVHzePw7BeqPewQ5TWti9d2dxDEDwxm").entropy("dc59555d015d2793e7750188cad161ba", source(THREAD$19, "MD5 of the sentence")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$19)],
	prize: .007,
	hints: [
		official("Question: Aoi", THREAD$19, void 0, { answer: answer("solution was from the hint in block 63 \"A young woman of Japanese ancestry who is very smart and sincere.\"", THREAD$19) }),
		official("Format: [solution]. No comma in solution, but one period after it.", THREAD$19, void 0, { answer: answer("It was taken from the hint from block 63: \"A young woman of Japanese ancestry who is very smart and sincere.\"", "https://www.reddit.com/r/Grycoin/comments/cc5uka/comment/etnllvl/") }),
		official("First three digits of MD5 hash are dc5.", THREAD$19),
		official("Solution is one sentence without comma and a period at the end to describe me.", THREAD$19)
	],
	solvedAt: "2019-07-13 04:07:02",
	solveTime: 103961,
	transactions: [funding("58b9cb448f10f76d49f1db501ebb0ef49df2cbab3df402a20416eb524116ea70", "2019-07-11 23:14:21", .007), claim("375a563c2a2783d310945277b1070c02441d794e1b5ef5429ff3cd40b968daf3", "2019-07-13 04:07:02", .00683795)]
});
const THREAD$18 = "https://www.reddit.com/r/Grycoin/comments/cchy6l/77_mbtc_quizchain2_block_67/";
const quizchain2Block67 = puzzle({
	id: "quizchain2/67",
	chain: "bitcoin",
	address: "18o7TyCU1zkXCiC5sZSyxBFAn3Nntb4MAw",
	sourceUrl: THREAD$18,
	startedAt: "2019-07-12 12:23:19",
	status: Status.Solved,
	pubkey: compressed("02a3de51a75abc63e3c08038ea718b6c11d5cd19c2025a774bf1889b4fdc24946e"),
	key: wif("KzQPaLLjDdbLViJsFm4f7Z84cK8rSbod4qMncgUDey7MiNk6MHUD").entropy("f4738a19b8ad4b882331cc1ba74e9826", source(THREAD$18, "MD5 of the name, TOMI and the full name")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$18)],
	prize: .077,
	hints: [
		official("Question: Satoshi is an almost perfect anagram of which name?", THREAD$18, void 0, { answer: answer("Solution was Thomas and TOMI field was the complete name of Hal FInney as given at WIkipedia, which is Harold Thomas Finney II.", THREAD$18) }),
		official("Format: [solution] TOMI [TOMI]", THREAD$18, void 0, { answer: answer("Solution was \"Thomas TOMI Harold Thomas Finney II\"", "https://www.reddit.com/r/Grycoin/comments/cchy6l/comment/etn39ar/") }),
		official("FIrst three digits of MD5 hash are f47.", THREAD$18)
	],
	solvedAt: "2019-07-12 23:46:22",
	solveTime: 40983,
	transactions: [funding("4385d66a41d92939005b5767fb0c77b44f89e30a7d379f4d61d3e0fc9ac6b6f2", "2019-07-12 12:23:19", .077), claim("6993b18a7fb7270694fb427faf838140d94a0cb7b212882bd053a0a7229b3e96", "2019-07-12 23:46:22", .07683027)]
});
const THREAD$17 = "https://www.reddit.com/r/Grycoin/comments/cd2qqx/7_mbtc_quizchain2_block_68/";
const quizchain2Block68 = puzzle({
	id: "quizchain2/68",
	chain: "bitcoin",
	address: "1LQsUnUBDwEqAUwsPdA5LVyGNignRpSVBm",
	sourceUrl: THREAD$17,
	startedAt: "2019-07-14 09:57:41",
	status: Status.Solved,
	pubkey: compressed("021575dc1bfdaae34188dcc36f5a3755059f622e430f74c94621a210ab136c0155"),
	key: wif("KzSsEA9wB3fP2dEFVDv8F4UWEDGC1dcKuMYc4m22L5ibDkEBuKB4").entropy("14ad1f06f0103e94a035e265de04f150", source(THREAD$17, "MD5 of the title, TOMI and a word")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$17)],
	prize: .007,
	hints: [
		official("Question: Book title from a number. No, \"Second\" is not the answer.", THREAD$17, void 0, { answer: answer("Solution was \"Seveneves\", TOMI field was \"palindrome\".", THREAD$17) }),
		official("Format: [solution] TOMI [TOMI]", THREAD$17, void 0, { answer: answer("Seveneves TOMI palindrome", "https://www.reddit.com/r/Grycoin/comments/cd2qqx/comment/etsk4r0/") }),
		official("TOMI format is one word in all lowercase.", THREAD$17),
		official("FIrst three digits of MD5 hash are 14a.", THREAD$17),
		official("Solution only 03, TOMI field only 07.", "https://www.reddit.com/r/Grycoin/comments/cd2qqx/comment/ets7qbx/")
	],
	solvedAt: "2019-07-14 23:38:33",
	solveTime: 49252,
	transactions: [funding("de95c5adbacd2c67a4ce1006ea1656239542a2abe6820e7a9fbcb7bb40e9d726", "2019-07-14 09:57:41", .007), claim("20411c1386fd6297ef5421f9a0222c61b00ac8b88861a17df92ea7636acba875", "2019-07-14 23:38:33", .0069065)]
});
const THREAD$16 = "https://www.reddit.com/r/Grycoin/comments/cdentq/7_mbtc_quizchain2_block_69/";
const quizchain2Block69 = puzzle({
	id: "quizchain2/69",
	chain: "bitcoin",
	address: "17rkDa7xXHuK1TyzHExcj9e229ooKef8yU",
	sourceUrl: THREAD$16,
	startedAt: "2019-07-15 04:30:01",
	status: Status.Solved,
	pubkey: compressed("03eb2885cba1c58a2ba61f895b552ad1058b2246909ef98e744e27342eaf823da3"),
	key: wif("L326eHtxFCNJ3B1s152SfuhpGxzwBbsEGpfyGmt5CnX7YjbMGUxg").entropy("a8f7e33a0aaeb16f61a5b09cff038846", source(THREAD$16, "MD5 of the word, TOMI and a word")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$16)],
	prize: .007,
	hints: [
		official("Question: \"Waste of time, sir.\"", THREAD$16, void 0, { answer: answer("Solution was \"madam\" and TOMI field was again \"palindrome\".", THREAD$16) }),
		official("Anyway, format for this block is: [solution] TOMI [TOMI]", THREAD$16, void 0, { answer: answer("full solution is: \"madam TOMI palindrome\"", "https://www.reddit.com/r/Grycoin/comments/cdentq/comment/ettxmsb/") }),
		official("First three digits of MD5 hash are a8f.", THREAD$16),
		official("Update: Block has survived for 5 hours now, so here are partial hashes. For solution only first two digits are be, for TOMI field only they are 07.", THREAD$16)
	],
	solvedAt: "2019-07-15 13:51:25",
	solveTime: 33684,
	transactions: [funding("2411287307338fd0882d3827319af6574725e5c637396669eeb18242a163add7", "2019-07-15 04:30:01", .007), claim("6e56bb4c0df5d645030c67f52fce239e9f0eb2b27f868b344618ee85ffa9031b", "2019-07-15 13:51:25", .00685965)]
});
const THREAD$15 = "https://www.reddit.com/r/Grycoin/comments/cds16v/7_mbtc_quizchain2_block_70/";
const quizchain2Block70 = puzzle({
	id: "quizchain2/70",
	chain: "bitcoin",
	address: "19PShGAWvbs3LCvhhBUZFt2czPzEdQ17iX",
	sourceUrl: THREAD$15,
	startedAt: "2019-07-15 23:25:30",
	status: Status.Solved,
	pubkey: compressed("03b0b2f18d77e10a327b3613c9f144b5e53ef309cfee124e9e0e36466a68645147"),
	key: wif("Kwc5gTsJczZZY8m9r7Myp9hhV4KF9gEgesbq2wZyjJDShae8ubck").entropy("71af184458431f453c6b660c79b6afe7", source(THREAD$15, "MD5 of the film title")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$15)],
	prize: .007,
	hints: [
		official("Question: ia", THREAD$15, void 0, { answer: answer("Solution was \"Victor/Victoria\", a film about a female pretending to be a male pretending to be a female, with lots of comedy effects from that setup.", THREAD$15) }),
		official("Format: [solution]", THREAD$15, void 0, { answer: answer("The answer was: Victor/Victoria", "https://www.reddit.com/r/Grycoin/comments/cds16v/comment/etw0pbd/") }),
		official("FIrst three digits of MD5 hash are 71a.", THREAD$15)
	],
	solvedAt: "2019-07-16 04:00:45",
	solveTime: 16515,
	transactions: [funding("a87465e396ac4502402d063269c2c518ab094bea07d26a8fe74c15b349fd4ad6", "2019-07-15 23:25:30", .007), claim("ab3e99f45499786c2910a78ee42dd6824fada16f19e38005e613800eceedb9ed", "2019-07-16 04:00:45", .0068537)]
});
const THREAD$14 = "https://www.reddit.com/r/Grycoin/comments/ce4ixs/8_mbtc_quizchain2_block_71/";
const quizchain2Block71 = puzzle({
	id: "quizchain2/71",
	chain: "bitcoin",
	address: "16GdFrajmBkFjn3UqGckTaC3S32AGLdXw3",
	sourceUrl: THREAD$14,
	startedAt: "2019-07-16 13:06:24",
	status: Status.Solved,
	pubkey: compressed("021b061146636df729e9bf7089dea6febd1f4b176d5071dc8cc5371f52c2b4c835"),
	key: wif("KypgDQAuQT1qmf8aWpboJRhCHeXyCbeotEGWmcPH687mpTcBBeAL").entropy("4bcacee7f46c6dcb96531b8137d4688f", source(THREAD$14, "MD5 of two words, TOMI and two words")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$14)],
	prize: .008,
	hints: [
		official("Question: not zero", THREAD$14, void 0, { answer: answer("Solution was \"net zero\" which was almost exactly the same as the question and is a goal of climate policy. TOMI field was \"carbon neutral\", which is another way of saying this.", THREAD$14) }),
		official("Format: [solution] TOMI [TOMI]", THREAD$14, void 0, { answer: answer("Got it: net zero TOMI carbon neutral", "https://www.reddit.com/r/Grycoin/comments/ce4ixs/comment/eu1xazh/") }),
		official("FIrst three digits of MD5 hash are 4bc.", THREAD$14),
		official("Solution only hash: 48", THREAD$14),
		official("TOMI field only hash: bc3", THREAD$14)
	],
	solvedAt: "2019-07-17 15:30:17",
	solveTime: 95033,
	transactions: [
		funding("db55d2c3e55539d77b6db69fe2f7c54c70c7ffc7b0d7c2fb11da0bc16fc23b4e", "2019-07-16 13:06:24", .001),
		increase("1b552b9773797f3f4b4dfedb332ac100764056c44ce567d2b8bf05af85e92549", "2019-07-16 13:07:04", .007),
		claim("b74ff907f043a2b01bcbe8f5f31137d3a5fc475d85d3bdc7d0e48420b502709d", "2019-07-17 15:30:17", .00783476)
	]
});
const THREAD$13 = "https://www.reddit.com/r/Grycoin/comments/ces4vi/9_mbtc_quizchain2_block_72/";
const quizchain2Block72 = puzzle({
	id: "quizchain2/72",
	chain: "bitcoin",
	address: "147dHipPd9eF7UTWrsxQhGDDySAmDUhXeG",
	sourceUrl: THREAD$13,
	startedAt: "2019-07-18 06:29:28",
	status: Status.Solved,
	pubkey: compressed("02e39dd6a15bc7188123dc05db88bb3ff9ee3f5d4aa5a47424867c07d72073fc05"),
	key: wif("L1jF6nZiFYSCfXeRKVufyqzFku6xuAy5fasYowvPV7LuXqDww6uV").entropy("916133ad362df0d10f9f3a3e625d9b67", source(THREAD$13, "MD5 of the acronym, TOMI and three words")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$13)],
	prize: .009,
	hints: [
		official("Question: NGD", THREAD$13, void 0, { answer: answer("Solution was GND and TOMI field was Green New Deal.", THREAD$13) }),
		official("Format: [solution] TOMI [TOMI]", THREAD$13, void 0, { answer: answer("GND TOMI Green New Deal", "https://www.reddit.com/r/Grycoin/comments/ces4vi/comment/eu4ifd8/") }),
		official("First three digits of MD5 hash are 916 (copypasted).", THREAD$13)
	],
	solvedAt: "2019-07-18 08:59:59",
	solveTime: 9031,
	transactions: [funding("8eca76a4b7793b6f8a0aed3b4f79d66d63846abde4c6590b8d0861694a572c3d", "2019-07-18 06:29:28", .009), claim("3a79fcbbe58ba33cdf6caf4273342ca40de9b8bde6b7564e22c5fec6527f125b", "2019-07-18 08:59:59", .0089065)]
});
const THREAD$12 = "https://www.reddit.com/r/Grycoin/comments/cf4rnd/10_mbtc_quizchain2_block_73/";
const PLAYER_COMMENT$6 = "https://www.reddit.com/r/Grycoin/comments/cf4rnd/comment/euacll6/";
const quizchain2Block73 = puzzle({
	id: "quizchain2/73",
	chain: "bitcoin",
	address: "1dG3cAWeKx67hnTVvpDCpUFwPiuqCn68X",
	sourceUrl: THREAD$12,
	startedAt: "2019-07-18 23:08:01",
	status: Status.Solved,
	pubkey: compressed("020bbe6e7ac96d508da94f72125ec26d64508410b111ed4c829be19b8f12ed3346"),
	key: wif("L1BPBMCAZxDVnHS2VqaTheGWtFXzA7pegWnA33k695Zy885dQmLe").entropy("f13802b5a4dcc607f7dd33d333af51e4", source(PLAYER_COMMENT$6, "MD5 of two words, TOMI and two words")).derived(),
	techniques: [technique("md5-to-bip39-entropy", PLAYER_COMMENT$6)],
	prize: .01,
	hints: [
		official("Question: This is the problem Grycoin is supposed to solve.", THREAD$12, void 0, { answer: answer("It was obvious this was something about climate change I just did not expect the TOMI to be so obvious too", PLAYER_COMMENT$6) }),
		official("Format: [solution] TOMI [TOMI]", THREAD$12, void 0, { answer: answer("Solution: carbon budget TOMI Grycoin solution", PLAYER_COMMENT$6) }),
		official("First three digits of MD5 hash are f13 (copypasted).", THREAD$12),
		official("So here goes partial hash for solution only, 2 digits copypasted, 0c.", THREAD$12),
		official("Update (hint): TOMI field is two words, with (checking very careful now) Grycoin not grycoin the correct way to write it as one of them.", THREAD$12)
	],
	solvedAt: "2019-07-20 08:19:28",
	solveTime: 119487,
	transactions: [funding("e7f8fef0258cd5e76bec5846257cd9129d39cd5324765099c392a93950b8666e", "2019-07-18 23:08:01", .01), claim("3b38dcbcf82c81759e6b7762012c43b6126a1e1e34e007d333692235b4d94df5", "2019-07-20 08:19:28", .00983027)]
});
const THREAD$11 = "https://www.reddit.com/r/Grycoin/comments/cfhi1e/11_mbtc_quizchain2_block_74/";
const PLAYER_COMMENT$5 = "https://www.reddit.com/r/Grycoin/comments/cfhi1e/comment/euj5k1u/";
const quizchain2Block74 = puzzle({
	id: "quizchain2/74",
	chain: "bitcoin",
	address: "1P1BFMU7vnpzsaUtQCAvArVKQyeMgYtmPY",
	sourceUrl: THREAD$11,
	startedAt: "2019-07-20 03:43:27",
	status: Status.Solved,
	pubkey: compressed("03fe4d3f4476813e446c6f2043ef98eb28f5d1fcfadaa2c73dffc5d8b0736f2dc8"),
	key: wif("L5FNDLpbFyJkKY3JgHaFHKhRpXkiNkhCVDd9fRUiJZBZreCxZDRz").entropy("c65cb6a1680a40c8990882efd74ad7e9", source(PLAYER_COMMENT$5, "MD5 of the acronym, TOMI and three words")).derived(),
	techniques: [technique("md5-to-bip39-entropy", PLAYER_COMMENT$5)],
	prize: .011,
	hints: [
		official("Question: A long time ago on a planet near to us", THREAD$11, void 0, { answer: answer("PETM being https://en.wikipedia.org/wiki/Paleocene%E2%80%93Eocene_Thermal_Maximum never heard of it until it was mentioned in the last chapter on Wattpad", PLAYER_COMMENT$5) }),
		official("Format: [solution] TOMI [TOMI]", THREAD$11, void 0, { answer: answer("Solved! solution was \"PETM TOMI second time now\".", PLAYER_COMMENT$5) }),
		official("First three digits of MD5 hash are c65 (copypasted).", THREAD$11),
		official("I posted a hint for this block yesterday as an update to the Wattpad story, may be difficult to solve without that context.", THREAD$11),
		official("Update: First two digits of solution only hash are 04.", THREAD$11)
	],
	solvedAt: "2019-07-23 05:30:04",
	solveTime: 265597,
	transactions: [funding("f2623d2b4679277ed587c6031ebd3662bc4b72387828b62c8975d14860cf1854", "2019-07-20 03:43:27", .011), claim("31df04e8bc1516d2a06b5a1aed1c4ca1bd1b4e72df504adbd0230bc2051551bc", "2019-07-23 05:30:04", .01085984)]
});
const THREAD$10 = "https://www.reddit.com/r/Grycoin/comments/cfs3ld/12_mbtc_quizchain2_block_75/";
const quizchain2Block75 = puzzle({
	id: "quizchain2/75",
	chain: "bitcoin",
	address: "15pmBkzmSyXg2KhYHMmauF3EjYNEvyiABS",
	sourceUrl: THREAD$10,
	startedAt: "2019-07-20 22:46:49",
	status: Status.Solved,
	pubkey: compressed("03b5bc1ca09a5cef50f2daf610b559096f4650e912211da6eb8217e76c9b5186d6"),
	key: wif("KyjdU7g9VHRwvZWe6337DPCeHZFpVojPEgHsTebH2GuZLnKvGqYf").entropy("5090a11660cbe404ecda4b8f0b05ad2d", source(THREAD$10, "MD5 of three words")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$10)],
	prize: .012,
	hints: [
		official("Question: The purpose of the real big block.", THREAD$10, void 0, { answer: answer("Solved at sight, solution was \"reverse Turing test\".", THREAD$10) }),
		official("Format: [solution]", THREAD$10, void 0, { answer: answer("reverse Turing test", "https://www.reddit.com/r/Grycoin/comments/cfs3ld/comment/euc45fy/") }),
		official("First three digits of MD5 hash are 509 (copypasted).", THREAD$10)
	],
	solvedAt: "2019-07-20 23:08:07",
	solveTime: 1278,
	transactions: [funding("c52c46d2831e8372393af09f66541647b6d1bda80694d87886ed7bd6cc5298be", "2019-07-20 22:46:49", .012), claim("118d23d318477b06d546dfe620bef5e880bf797257f1316c19bd8961a2264fee", "2019-07-20 23:08:07", .01183795)]
});
const THREAD$9 = "https://www.reddit.com/r/Grycoin/comments/cgcv9i/77_mbtc_quizchain2_block_76/";
const quizchain2Block76 = puzzle({
	id: "quizchain2/76",
	chain: "bitcoin",
	address: "13Cv6SXUnzGDT8JHqzzJ8xMPtsSdhJA4wd",
	sourceUrl: THREAD$9,
	startedAt: "2019-07-22 03:12:48",
	status: Status.Claimed,
	pubkey: compressed("02291e71f75948c21e03c9a2faba367129f1a4e75086a780440e0d9b2a6213e0e9"),
	prize: .077,
	hints: [
		official("Question: change to", THREAD$9),
		official("Format: [solution] TOMI [TOMI]", THREAD$9),
		official("First three digits of MD5 hash are f8e (copypasted).", THREAD$9),
		official("Update, posted after starting up new: First two digits of solution only are 1d.", THREAD$9),
		official("Hint 1. Change question from \"change to\" to \"from change to\".", THREAD$9),
		official("to", "https://www.reddit.com/r/Grycoin/comments/cgcv9i/comment/evwxwvw/")
	],
	solvedAt: "2026-08-17 09:31:23",
	solveTime: 223193915,
	transactions: [funding("979670f3d1d4134e7989ed6f4a4370362e15c101711c93675790cf0751c8dbd4", "2019-07-22 03:12:48", .077), claim("2e271ac2f63f488cd14112bceeed56f159ecd98cb3ce753f08e2d94bb62714a3", "2026-08-17 09:31:23", .0769981)]
});
const THREAD$8 = "https://www.reddit.com/r/Grycoin/comments/ca6jxv/77_mbtc_quizchain2_block_77_stage_one/";
const HASH_DIGITS = "https://www.reddit.com/r/Grycoin/comments/ca6jxv/comment/etto4a5/";
const REPRODUCTION = "https://github.com/floflo777/open-crypto-puzzles/issues/1";
const quizchain2Block77 = puzzle({
	id: "quizchain2/77",
	chain: "bitcoin",
	address: "19TbyN5KCg1Lg7qHwezifsLVcdSa2Rj5KN",
	sourceUrl: THREAD$8,
	startedAt: "2019-07-07 09:16:50",
	status: Status.Solved,
	pubkey: compressed("02e77b75850c735f8efb1afe8677f007e6d7e82b07bacbd37a0b37712316cd06e2"),
	key: wif("KwwZ4HGvrpDR6mzXP1m5yK18vWsA7MqWDNoSM9ZgKkeWa62tGor2").entropy("9dd2efb9bc976c2095bd534d7b8d431c", source(REPRODUCTION, "MD5 of the case-flipped post, reproduced by a third party in 2026")).derived(),
	techniques: [technique("md5-to-bip39-entropy", REPRODUCTION)],
	prize: .077,
	hints: [
		official("Question: https://bitcointalk.org/index.php?topic=155054.0", THREAD$8),
		official("Format: [solution]", THREAD$8),
		official("I do disclose that this one has no TOMI field, but that is all.", THREAD$8),
		official("Hint 1: I already knew that \"Satoshi\" was chosen as an anagram of \"Thomas\" when I solved this. That helps with the solution, though not very much.", THREAD$8),
		official("Hint two: Satoshi writes \"Today, Satoshi's true identity has become a mystery. But at the time, I thought I was dealing with a young man of Japanese ancestry who was very smart and sincere. I've had the good fortune to know many brilliant people over the course of my life, so I recognize the signs.\" This is Satoshi's hint right in the post on how to decode it.", THREAD$8),
		official("Hint 3 (last hint): When solving the genesis block puzzle, I had the advantage of having solved this one already, so I knew what to look for. Was much easier to recognize the signs in the genesis block that way.", THREAD$8),
		official("Okay. I think solving 77 deserves a celebration of sorts. Here you are: 9dd (copypasted).", HASH_DIGITS),
		official("Update: Now the solution to Satoshi's puzzle is published the remaining resistance to solving the block comes from having to find the format of the solution. The format was used in one previous block. The block I will publish tomorrow will give a further clue on what previous block that was.", THREAD$8)
	],
	solvedAt: "2019-08-03 14:09:57",
	solveTime: 2350387,
	transactions: [funding("ccf5ad645f069dfe263e3df63c906ed6ce449813b968c12c0f862b475014b4bb", "2019-07-07 09:16:50", .077), claim("f9344de3198c70caa8f55a7121c345554c8811f4fae868259503a1655fb355f8", "2019-08-03 14:09:57", .07689594)]
});
const THREAD$7 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bnj24w/77_mbtc_quizchain2_block_2/";
const AUTHOR_COMMENT$1 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bnj24w/comment/en66xg8/";
const WALKTHROUGH = "https://www.reddit.com/r/bitcoinpuzzles/comments/bnj24w/comment/en6e73r/";
const quizchain2Block2 = puzzle({
	id: "quizchain2/2",
	chain: "bitcoin",
	address: "13qUHVzMYAneyyBGYvEey4SHy2iMSz3Jzh",
	sourceUrl: THREAD$7,
	startedAt: "2019-05-12 00:29:20",
	status: Status.Solved,
	pubkey: compressed("03f2632ecf5c36d83e97c02db9b2140336580bc43a6478c1625b9522fce483faf1"),
	key: wif("KzFB7hBGmLBqm8nqVCVLBmgyd1NxnoJXZUhE377QL4T2iy5rw4Wz").entropy("7b44cc11c866ab85b7078c43ad6795e1", source(WALKTHROUGH, "MD5 of the second key the Wattpad master string derives")),
	techniques: [technique("md5-to-bip39-entropy", WALKTHROUGH)],
	prize: .077,
	hints: [
		official("It has no question right now, which is why it is difficult.", AUTHOR_COMMENT$1, void 0, { answer: answer("This was just using the puzzle string in the latest Wattpad chapter on quizchain as a password manager in exactly the way it was described there and then pick the second private key under that puzzle string.", THREAD$7) }),
		official("Format: [solution]", THREAD$7, void 0, { answer: answer("L5Z66qPmUkTAsWQywjRNHDxHrX6J1X1SQedp6V8QsbaXR7rGd6ex", WALKTHROUGH) }),
		official("This solution does not need a TOMI field. And it also does not need a link, since it is sufficiently strong as a password to make brute forcing it impossible on its own.", THREAD$7),
		official("Update: First three digits of MD5 hash are 7b4.", THREAD$7)
	],
	solvedAt: "2019-05-12 02:22:37",
	solveTime: 6797,
	transactions: [funding("c5e59f1e8b7218c76a9029bb16c0085028095ac3527ebc3e1f964b1d12d87f24", "2019-05-12 00:29:20", .077), claim("c1e362deff1954846810ffa15044f49ee94a382e6a2075721cec198a6260d6f9", "2019-05-12 02:22:37", .0769)]
});
const THREAD$6 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bnj8ew/7_mbtc_quizchain2_block_3/";
const quizchain2Block3 = puzzle({
	id: "quizchain2/3",
	chain: "bitcoin",
	address: "1FsYtK22FBG7Ps3K7KZUYDQRs6gDxXjwQX",
	sourceUrl: THREAD$6,
	startedAt: "2019-05-12 00:45:26",
	status: Status.Solved,
	pubkey: compressed("02f4db70c3801528c31a79093e72b1bf9e9fe0c1e94e3539e0632eb338166a8701"),
	key: wif("L488KiS3jUut79rDM6gwxUdg7Qm1SXwQnMasKLpzFzb6KrNLsFpT").entropy("5f6870da0f9c9553647e89c89d79f9a6", source(THREAD$6, "MD5 of the word, TOMI, two words and the whole block 76 key of the first run")),
	techniques: [technique("md5-to-bip39-entropy", THREAD$6), technique("atbash", THREAD$6)],
	prize: .007,
	hints: [
		official("Question: dirty word with XA", THREAD$6, void 0, { answer: answer("Solution was \"reorg\" and TOMI field was \"CZ Binance\". This used the recent news on the Binance hack and the discussion on doing a BItcoin chain reorg. CZ apologized for using this \"dirty word\". I have not much to add, except that the \"XA\" in the question was \"CZ\" in Atbash code.", THREAD$6) }),
		official("Format: [solution] TOMI [TOMI] [link]", THREAD$6, void 0, { answer: answer("reorg TOMI CZ Binance L2e6gPSXnq7KJBfkoD7cHGVZuhRUDARJz2Cc9JcSNLsKRZhH552F", "https://www.reddit.com/r/bitcoinpuzzles/comments/bnj8ew/comment/en6delr/") }),
		official("Use the private key from block 76 for this again as a link. That private key is L2e6gPSXnq7KJBfkoD7cHGVZuhRUDARJz2Cc9JcSNLsKRZhH552F.", THREAD$6),
		official("First three digits of MD5 hash are 5f6.", THREAD$6),
		official("First digit of solution only MD5 hash is 1.", THREAD$6),
		official("FIrst digit of TOMI only MD5 hash is 0.", THREAD$6)
	],
	solvedAt: "2019-05-12 02:12:14",
	solveTime: 5208,
	transactions: [funding("5d3b46fa708c477806305e9c9a1dde18d1ed7720177312bc2d2f7b0743a5a089", "2019-05-12 00:45:26", .007), claim("581b85ceac835ff89c568fc0981b233864308a9cb3423ad79bb97d719cfbe718", "2019-05-12 02:12:14", .0069809)]
});
const THREAD$5 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bo356q/7_mbtc_quizchain2_block_4/";
const quizchain2Block4 = puzzle({
	id: "quizchain2/4",
	chain: "bitcoin",
	address: "1C1e2wvP5p6JRyV4BtRHjprCuBcUXLudNQ",
	sourceUrl: THREAD$5,
	startedAt: "2019-05-13 12:33:25",
	status: Status.Solved,
	pubkey: compressed("0385f0b820b4a7de14503b97a86b61904f1ffde8beae67a7b131f8265dd37a0828"),
	key: wif("L3PyFkCsVdej9qktSKZvfYqzmxes6SWRvGeAqoS4jxirrSi69hfz").entropy("9acb509e171c3baaf8ad1fa982648bdc", source(THREAD$5, "MD5 of the word, TOMI and four words")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$5)],
	prize: .007,
	hints: [
		official("Question: Looking for a four letter word. Yes, quite safe for work.", THREAD$5, void 0, { answer: answer("Once you see the word in the previous block private key, it becomes easy. That is the reason I did not include a link, since it would become too obvious.", THREAD$5) }),
		official("Format: [solution] TOMI [TOMI]", THREAD$5, void 0, { answer: answer("MasK TOMI previous block private key", "https://www.reddit.com/r/bitcoinpuzzles/comments/bo356q/comment/enbxj6y/") }),
		official("First three digits of MD5 hash: 9ac", THREAD$5),
		official("First digit of solution only MD5 hash: 2", THREAD$5),
		official("First digit of TOMI field only MD5 hash: 9", THREAD$5)
	],
	solvedAt: "2019-05-13 13:57:44",
	solveTime: 5059,
	transactions: [funding("7446567ec9b8247cc77a34441c24c0eec15922b2b5e524725ec0977f63bb82b9", "2019-05-13 12:33:25", .007), claim("12f20e5e032070cb3a6b9ad105cb4caca0c5123234cf328e0ec83fba6096a25e", "2019-05-13 13:57:44", .00679648)]
});
const THREAD$4 = "https://www.reddit.com/r/bitcoinpuzzles/comments/boil0p/7_mbtc_quizchain2_block_5/";
const quizchain2Block5 = puzzle({
	id: "quizchain2/5",
	chain: "bitcoin",
	address: "18ufPz33qyBDAHxhxtAMrze5yq3abJh39b",
	sourceUrl: THREAD$4,
	startedAt: "2019-05-14 21:58:48",
	status: Status.Solved,
	pubkey: compressed("031b83ff60f6c90c2de6cb4c974d21d9fa45ede95d3109337a12f5e9d7693ec548"),
	key: wif("L1FbCRrq4fcMc7Lrk5avV3uGWUhtAZGyaTkqzWVdAc5NbYiyvrWJ").entropy("e7a18731a7a9520baec7a428adbd50af", source(THREAD$4, "MD5 of the five words")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$4)],
	prize: .007,
	hints: [
		official("Question: Five words.", THREAD$4, void 0, { answer: answer("Solution was \"bat bot bit bet but\".", THREAD$4) }),
		official("Format: [word1 word2 word3 word4 word5]", THREAD$4),
		official("One space between words and no period at the end.", THREAD$4),
		official("First three digits of MD5 hash: e7a", THREAD$4)
	],
	solvedAt: "2019-05-14 21:58:48",
	solveTime: 0,
	transactions: [funding("0dcc393425a6cd5b5266a7275e08c98fbd6c14b9b9518eb8020c34c39a655e18", "2019-05-14 21:58:48", .007), claim("360d1f004018776a111c17a182cbf5323c79a5abe8d829f20ddbb97825ba0da2", "2019-05-14 21:58:48", .00695949)]
});
const THREAD$3 = "https://www.reddit.com/r/bitcoinpuzzles/comments/boviny/7_mbtc_quizchain2_block_6/";
const quizchain2Block6 = puzzle({
	id: "quizchain2/6",
	chain: "bitcoin",
	address: "1741oPqNwSvJuGw5Zv4CrTCSov5LtqdrNq",
	sourceUrl: THREAD$3,
	startedAt: "2019-05-15 00:00:56",
	status: Status.Solved,
	pubkey: compressed("037c3fd6f4c0ff4278e448dc1eb3051eed8ca6771b21d8aed4d29f80dba80f76c9"),
	key: wif("L2gi9LjJwv6oRBdBAJMo3QTNmfdqLRYxbW7o1MhC5K7NNh2JqPSZ").entropy("fb80ca6ac6ec967eeaece1e30d4a7654", source(THREAD$3, "MD5 of the first six words of the block 5 mnemonic")),
	techniques: [technique("md5-to-bip39-entropy", THREAD$3)],
	prize: .007,
	hints: [
		official("Question: Six words.", THREAD$3, void 0, { answer: answer("Solution method was to look in the coleman tool wordlist of the previous block solution, then use the first six words from that word list. The hoax was having a five word bat bot bit bet but puzzle in the block before, getting people to search in that wrong direction.", THREAD$3) }),
		official("Format: [word1 word2 word3 word4 word5 word6]", THREAD$3),
		official("One space between each word and no period at the end.", THREAD$3),
		official("First three digits of MD5 hash are fb8.", THREAD$3)
	],
	solvedAt: "2019-05-15 22:11:41",
	solveTime: 79845,
	transactions: [funding("834218257ca87ad263c4ce6a64f32ab34424bd20c03c225cf5c25d28eb9e1dae", "2019-05-15 00:00:56", .007), claim("e0c856eaa9d14d2b7de9d1ba1fbfa77c08113a5247f3790243f335bc40877e86", "2019-05-15 22:11:41", .00654976)]
});
const THREAD$2 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bp8jlh/77_mbtc_quizchain2_block_7/";
const HINT = "https://www.reddit.com/r/bitcoinpuzzles/comments/bp8jlh/comment/enwjga0/";
const PLAYER_COMMENT$1 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bp8jlh/comment/enwmri7/";
const quizchain2Block7 = puzzle({
	id: "quizchain2/7",
	chain: "bitcoin",
	address: "1MgqS8ng87o9JVNkaKhtBFXigYG9KvJ1Ff",
	sourceUrl: THREAD$2,
	startedAt: "2019-05-15 23:24:23",
	status: Status.Solved,
	pubkey: compressed("03c9586e34cdc2fd0b8c2652a8296022996d462eef025ecb4e55c3cad282a8feaf"),
	key: wif("L5MJPrKiqPreFJJPFzASnb9Ru1QfqeVRwnHbLo18yPZpQNJm6KD2").entropy("df14b6d31d10082629fefa7f25c4601a", source(THREAD$2, "MD5 of the coin name, TOMI and three words")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$2), technique("atbash", PLAYER_COMMENT$1)],
	prize: .077,
	hints: [
		official("The question is to find the name for that altcoin, starting out from the name \"Bitcoin\".", THREAD$2, void 0, { answer: answer("Atbash of BIT is YRG. YRG can be rearranged to GRY.", PLAYER_COMMENT$1) }),
		official("Format: [solution] TOMI [TOMI]", THREAD$2, void 0, { answer: answer("Grycoin TOMI angry Atbash hungry", PLAYER_COMMENT$1) }),
		official("[solution] is capitalized like \"Bitcoin\", which means only first letter in capitals.", THREAD$2),
		official("[Tomi] are three words in alphabetical order [word1 word2 word3], with one of them starting with a capital letter like the solution and the other two in all lower case.", THREAD$2, void 0, { answer: answer("For the TOMI, the two words that end in -gry are angry and hungry. Since I got to Gry using Atbash, I tried the word Atbash as well, and I organized these words in alphabetical order.", PLAYER_COMMENT$1) }),
		official("First three digits of MD5 hash are df1.", THREAD$2),
		official("First digit of solution only MD5 hash is 5.", THREAD$2),
		official("First digit of TOMI field only MD5 hash is e.", THREAD$2),
		official("When I first thought about an altcoin project, I wanted to call it Hascoin. That was derived from moving the letters in the \"Bit\" part of Bitcoin one place to the left in the alphabet, then changing the order to make it easier to pronounce.", HINT),
		official("The format of the solution is also Xxxcoin, with three different letters replacing the BIt part, and these letters being derived directly from \"Bit\".", HINT),
		official("Once you find the method for deriving it, you will be left with several choices. And the one I chose will have a clear relation to puzzles. There will be a famous puzzle associated with this choice, which is why I went with it.", HINT)
	],
	solvedAt: "2019-05-17 13:22:07",
	solveTime: 136664,
	transactions: [funding("fe9bec614bc203f37ed5fd15236c75581bf012e83fc3f3ffdfaeac7858a2e8f9", "2019-05-15 23:24:23", .077), claim("4958e070784095909f228467637883845e4a2ba26ae5298ffb688ac26a21ac30", "2019-05-17 13:22:07", .07650961)]
});
const THREAD$1 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bpjipk/7_mbtc_quizchain2_block_8/";
const quizchain2Block8 = puzzle({
	id: "quizchain2/8",
	chain: "bitcoin",
	address: "18AoFSmoTH34cbRy9QW4X4ZxCTdS1iwswD",
	sourceUrl: THREAD$1,
	startedAt: "2019-05-16 11:57:33",
	status: Status.Solved,
	pubkey: compressed("02b302546efc47a42ccfe849e7797dfefb6639755424e74db4328cce95fc717906"),
	key: wif("L45dLEP5xr2aZLaGuMagF8bcr9PNurGgigqAQa2vFkLSZSgAyXUh").entropy("b322677e2c01cc97c918f241b824174d", source(THREAD$1, "MD5 of the eight words and the whole block 6 key")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$1)],
	prize: .007,
	hints: [
		official("Question: Eight words.", THREAD$1, void 0, { answer: answer("I used the famous passphrase \"correct horse battery staple\" for this one as a challenge to the players that rely on scripts to get their solution.", THREAD$1) }),
		official("Format: [word1 word2 word3 word4 word5 word6 word7 word8] [link]", THREAD$1, void 0, { answer: answer("correct horse battery staple correct horse battery staple", "https://www.reddit.com/r/bitcoinpuzzles/comments/bpjipk/comment/enuhtjg/") }),
		official("All words in all letters lower case and one space between words, no period at the end.", THREAD$1),
		official("Use L2gi9LjJwv6oRBdBAJMo3QTNmfdqLRYxbW7o1MhC5K7NNh2JqPSZ as a link.", THREAD$1),
		official("First three digits of MD5 hash are b32.", THREAD$1),
		official("I know that. Which is in turn a hint for the solution...", "https://www.reddit.com/r/bitcoinpuzzles/comments/bpjipk/comment/enugazk/")
	],
	solvedAt: "2019-05-17 01:47:58",
	solveTime: 49825,
	transactions: [funding("3a9f2bd0ff07c8bfc4201cc6498eec0cd9bd476c88a07ae59d710d895219ea50", "2019-05-16 11:57:33", .007), claim("5d20412ed6c1bd03dfde7995741b484cfaaf8dd044b0e2b709c2d250bc94c37e", "2019-05-17 01:47:58", .00648415)]
});
const THREAD = "https://www.reddit.com/r/bitcoinpuzzles/comments/bq3ptu/14_mbtc_quizchain2_block_9/";
const quizchain2Block9 = puzzle({
	id: "quizchain2/9",
	chain: "bitcoin",
	address: "1E3aJRAUQcW26ZYSRjR41PWTkkzgbifRAf",
	sourceUrl: THREAD,
	startedAt: "2019-05-16 22:51:06",
	status: Status.Solved,
	pubkey: compressed("036952b20f35554e0ef24c157fae47e8a77624de86e33b7d2d6f4baf9bdc1c37c1"),
	key: wif("KyVcQKeGXypdEADis9xxTBE3Hc51YKt53kHu565JFGEn8ePmqgsf").entropy("92370551d3c9b67de4885578ac3291ba", source(THREAD, "MD5 of the code, TOMI and two words")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD)],
	prize: .014,
	hints: [
		official("Question: 11-9", THREAD, void 0, { answer: answer("Solution was K-9, TOMI field was police dog. Method was replacing the \"K\" by the number 11 because that is the place of K in the alphabet. K-9 is pronounced like \"canine\", which is why this code is used in many police forces.", THREAD) }),
		official("Format: [solution] TOMI [TOMI]", THREAD),
		official("First three digits of MD5 hash are 923.", THREAD),
		official("First digit of solution only MD5 hash is 0.", THREAD),
		official("First digit of TOMI field only MD5 hash is 6.", THREAD),
		official("Hint 1 (after 24 hours): Found the idea for this block in a related Wikipedia article.", THREAD),
		official("Hint 2 (after 48 hours): Relevant article is on number 9.", THREAD)
	],
	solvedAt: "2019-05-20 14:01:29",
	solveTime: 313823,
	transactions: [
		funding("b876a070c9dc65105b08bf11c179e9083656670852e4a5a8ca9c787aaf90ceca", "2019-05-16 22:51:06", .007),
		increase("6f3e16265734581839c82d1660505f0dcd42f04a62c10f2c8bb7d754f966ec0f", "2019-05-18 04:15:44", .007),
		claim("551bb1bde6aa455f3457e8bf86e904b67af428adad36eea92c87232f423412eb", "2019-05-20 14:01:29", .005),
		claim("c09ac20686c7c43282676a91543576260c2f27cfb1992ff4ebcdf537c23024c0", "2019-05-20 14:14:29", .00655264)
	]
});
var Quizchain2Collection = class Quizchain2Collection extends NumericCollection {
	static key = "quizchain2";
	static author = QuizchainCollection.author;
	static puzzles = [
		quizchain2Block1,
		quizchain2Block2,
		quizchain2Block3,
		quizchain2Block4,
		quizchain2Block5,
		quizchain2Block6,
		quizchain2Block7,
		quizchain2Block8,
		quizchain2Block9,
		quizchain2Block10,
		quizchain2Block11,
		quizchain2Block12,
		quizchain2Block13,
		quizchain2Block14,
		quizchain2Block15,
		quizchain2Block16,
		quizchain2Block17,
		quizchain2Block18,
		quizchain2Block19,
		quizchain2Block20,
		quizchain2Block21,
		quizchain2Block22,
		quizchain2Block23,
		quizchain2Block24,
		quizchain2Block25,
		quizchain2Block26,
		quizchain2Block27,
		quizchain2Block28,
		quizchain2Block29,
		quizchain2Block30,
		quizchain2Block31,
		quizchain2Block32,
		quizchain2Block33,
		quizchain2Block34,
		quizchain2Block35,
		quizchain2Block36,
		quizchain2Block37,
		quizchain2Block38,
		quizchain2Block39,
		quizchain2Block40,
		quizchain2Block41,
		quizchain2Block42,
		quizchain2Block43,
		quizchain2Block44,
		quizchain2Block45,
		quizchain2Block46,
		quizchain2Block47,
		quizchain2Block48,
		quizchain2Block49,
		quizchain2Block50,
		quizchain2Block51,
		quizchain2Block52,
		quizchain2Block53,
		quizchain2Block54,
		quizchain2Block55,
		quizchain2Block56,
		quizchain2Block57,
		quizchain2Block58,
		quizchain2Block59,
		quizchain2Block60,
		quizchain2Block61,
		quizchain2Block62,
		quizchain2Block63,
		quizchain2Block64,
		quizchain2Block65,
		quizchain2Block66,
		quizchain2Block67,
		quizchain2Block68,
		quizchain2Block69,
		quizchain2Block70,
		quizchain2Block71,
		quizchain2Block72,
		quizchain2Block73,
		quizchain2Block74,
		quizchain2Block75,
		quizchain2Block76,
		quizchain2Block77
	];
	constructor() {
		super(Quizchain2Collection.key, Quizchain2Collection.author, Quizchain2Collection.puzzles);
	}
};
const quizchain2 = new Quizchain2Collection();
export { Quizchain2Collection, quizchain2 };
