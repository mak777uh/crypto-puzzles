import { answer, claim, compressed, confirmation, funding, official, source, technique, wif } from "./parts.mjs";
import { Status } from "./status.mjs";
import { puzzle } from "./puzzle.mjs";
import { NumericCollection } from "./collection.mjs";
import { SatoshiBirthdayQuizCollection } from "./satoshi-birthday-quiz.mjs";
const THREAD$76 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bacd6l/easy_7_mbtc_quizchain_experiment/";
const SOLUTION = "https://www.reddit.com/r/bitcoinpuzzles/comments/bacd6l/comment/ekaqb0l/";
const quizchainBlock1 = puzzle({
	id: "quizchain/1",
	chain: "bitcoin",
	address: "16NLaozWwi4JSTRMnMfi3oCkBjXBWVFgYR",
	sourceUrl: THREAD$76,
	startedAt: "2019-04-07 03:31:37",
	status: Status.Solved,
	pubkey: compressed("028a941c0effd36b57654b9bf871817384f5bd06286cebe73096191bc3584acef3"),
	key: wif("L58cp8Ex3RsTsiKaaeodmu7SetzDzqQkzfX3bAtjdtmu4KbTpUzp").entropy("50611e63a52089bc14e38becb1ad8880be6ba8f4aff0e64223f3dbd740adc1b7", source(SOLUTION, "SHA-256 of answer b) with the last three characters of the address appended")),
	techniques: [technique("sha256-to-bip39-entropy", SOLUTION)],
	prize: .007,
	hints: [
		official("Solve this multiple choice question: a) Satoshi is CEO of Bitcoin and holds the Bitcoin patent. b) Satoshi is an anonymous cypherpunk and the first one to succed building private Internet cash.", THREAD$76, confirmation("https://web.archive.org/web/20230611083439/https://old.reddit.com/r/bitcoinpuzzles/comments/bacd6l/easy_7_mbtc_quizchain_experiment/", "Wayback capture of the thread, post and comments")),
		official("Hint: The correct answer is b).", THREAD$76),
		official("Add the last 3 digits of my favorite Bitcoin address to the text of alternative b). For example, if that address ends in \"abc\" take the string \"Satoshi is an anonymous cypherpunk and the first one to succed building private Internet cash.abc\".", THREAD$76, void 0, { answer: answer("Satoshi is an anonymous cypherpunk and the first one to succed building private Internet cash.Pzd", SOLUTION) }),
		official("Take a SHA 256 hash of that and use it as entropy in the Ian Coleman BIP 39 tool. Find the private key in the first address of that wallet at the bottom.", THREAD$76),
		official("Good luck finding my favorite Bitcoin address.", THREAD$76, void 0, { answer: answer("1AndrewYangForPresident2o2o6zmPzd", SOLUTION) }),
		official("Edit: I messed up. This quiz as posted was not valid. Edited slightly to reflect correct wording of answer b).", THREAD$76)
	],
	solvedAt: "2019-04-07 05:39:30",
	solveTime: 7673,
	transactions: [funding("808aaa64d0028a6033b2c11a8ab59bc67df2758f4560f15158879a61270da7bb", "2019-04-07 03:31:37", .007), claim("5a99de28f54d3eee464878ddae0f12c865d4226a4572659cdba080fb568fa779", "2019-04-07 05:39:30", .00672314)]
});
const THREAD$75 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bb1ajr/easy_7_mbtc_quizchain_block_10/";
const quizchainBlock10 = puzzle({
	id: "quizchain/10",
	chain: "bitcoin",
	address: "14zuee5qyQwypAcAjyexpTNZqaxY8K9NWj",
	sourceUrl: THREAD$75,
	startedAt: "2019-04-09 00:18:53",
	status: Status.Solved,
	pubkey: compressed("022170ce8d3a1e8387ab5a362f7724ccf07c3b608d69dcf5561f172e07a7accdeb"),
	key: wif("L28sMk6rGrZeYMKeXKVnkLgAU4Zc9igbwKcPUo8N6NjnSgSx6peH").entropy("024220f061e3ae0e072687bb40999847d6910bd6bda8b157fe00f91a1c14880d", source(THREAD$75, "SHA-256 of the solution with the last three characters of the block 9 key appended and the line break the author says was copied with it")),
	techniques: [technique("sha256-to-bip39-entropy", THREAD$75)],
	prize: .007,
	hints: [
		official("Question: Four words within Einstein. Format: \"word1 word2 word3 word4.fnw\". The last three digits from the broken link in block 9 are set as fnw for this block. German words allowed.", THREAD$75, void 0, { answer: answer("Solution was \"Moonwalking with ein Stein.fnw\". Explanation: Four words within is two words with and two words in. The two words with are those from the famous book titile that shows up in a Google search, the two words in are just \"ein Stein\" (a stone in German). Final Update and apology: As several people noted, my mistake in hashing block 9 happened in this block too. Again a line break at the end from copypasting from a draft in a wordprocessor.", THREAD$75) }),
		official("Break up \"within\" into \"with\" and \"in\".", THREAD$75),
		official("Google \"with Einstein\".", THREAD$75)
	],
	solvedAt: "2019-04-10 01:42:12",
	solveTime: 91399,
	transactions: [funding("18c5191722eb13326322300205c24d229cfc45bfb0c29af30ee8c22c9c8fecb7", "2019-04-09 00:18:53", .007), claim("4fb23044d123eef5193e0157751dfbded8bd7354bfec2d9195e2ae2a0c786292", "2019-04-10 01:42:12", .00679456)]
});
const THREAD$74 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bb2vwf/expert_7_mbtc_quizchain_block_11/";
const quizchainBlock11 = puzzle({
	id: "quizchain/11",
	chain: "bitcoin",
	address: "1156YWRc9MYTEcZBkz91FyjNdN6QyRtmvJ",
	sourceUrl: THREAD$74,
	startedAt: "2019-04-09 03:04:33",
	status: Status.Solved,
	pubkey: compressed("029de3b565c4ebc174a83688208e8afede2ea5f40bd57896d727c9742147c0a19e"),
	key: wif("L3qP93VXiHtTzwpUCv6BNKApBnneg1LjajeenEND2Cx5BNALJgFm").entropy("4fd06cd3118515483504684b9fadbdb2aa65c79501dd8d6c396efe5961f5e6ac", source(THREAD$74, "SHA-256 of the question as posted with the last three characters of the block 10 key appended")),
	techniques: [technique("sha256-to-bip39-entropy", THREAD$74)],
	prize: .007,
	hints: [official("Can you find the solution with absolutely no hint whatsoever?", THREAD$74, void 0, { answer: answer("Just take the question as it was and add the previous block private key digits, which results in \"Can you find the solution with absolutely no hint whatsover?peH\" as the string to hash.", THREAD$74) }), official("And the last three digits of the private key for the previous block (not yet solved) are peH.", THREAD$74)],
	solvedAt: "2019-04-09 03:45:26",
	solveTime: 2453,
	transactions: [funding("71970cfaeb5a27cc1a6e5dd3f7a899582e064105863919f012eb7b431e48b9b4", "2019-04-09 03:04:33", .007), claim("7f94a37263db22674693db3c0a3eb2dea4dec4a07919b900b77ef1aab668eba5", "2019-04-09 03:45:26", .0069)]
});
const THREAD$73 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bb3n8i/easy_7_mbtc_quizchain_block_12/";
const quizchainBlock12 = puzzle({
	id: "quizchain/12",
	chain: "bitcoin",
	address: "1H2yMvGS9AJcKCfGEYs8my7Vos5AmFDU5M",
	sourceUrl: THREAD$73,
	startedAt: "2019-04-09 04:24:36",
	status: Status.Solved,
	pubkey: compressed("0320823f52f8a8aea28b13407a6a4b0bc0e3b087981439a30f33a3a5b376c69c18"),
	key: wif("KzQ9SyGqQxgPpffn2dkr9EehpWZh9KnzLTf6B2QLS3YueX2okxXJ").entropy("6ca6570eba5f03c77e887a3a30996ea1694c3cecf3bdf22c23fe5b2b008d6a53", source(THREAD$73, "SHA-256 of the two words and the last three characters of the block 11 key, separated by spaces")).derived(),
	techniques: [technique("sha256-to-bip39-entropy", THREAD$73)],
	prize: .007,
	hints: [official("Two words in harmony. Format: word1 word2 gFm (last block private key link).", THREAD$73, void 0, { answer: answer("The two words were \"rice\" and \"mouth\", which form the kanji 和.", THREAD$73) })],
	solvedAt: "2019-04-09 04:50:58",
	solveTime: 1582,
	transactions: [funding("0ee177786eb95f9c807fefd80939e38286050319b6b39f6bdcb53ce425f8ccfd", "2019-04-09 04:24:36", .007), claim("70f6a60db31fd9545d8f4da04ef9a84f6fe7b6f96f795f2eeb470ee3544ce234", "2019-04-09 04:50:58", .00675592)]
});
const THREAD$72 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bb4c7q/impossible_for_now_7mbtc_quizchain_unlucky_block/";
const quizchainBlock13 = puzzle({
	id: "quizchain/13",
	chain: "bitcoin",
	address: "1GJPyUZvBE8MewEZyRx999p5JbVy8wbmWE",
	sourceUrl: THREAD$72,
	startedAt: "2019-04-09 05:44:42",
	status: Status.Solved,
	pubkey: compressed("031345c828e3646d1a913b0ae44df951bb5549d4648bc516aee76483dc1dcb45ba"),
	key: wif("KznoygsYZth6yY6mmZxKcF3bgEi24kyTFSwMEw89Bm8DWdrqHxhm").entropy("2a799f952abe95d13bdeea53ba5a9e075178b751bf16ccd75ddbed0aea9afc14", source(THREAD$72, "SHA-256 of the first seven words of the final Wattpad chapter Second, headings included, with the last three characters of the block 12 key, as a player published it")).derived(),
	techniques: [technique("sha256-to-bip39-entropy", THREAD$72)],
	prize: .007,
	hints: [
		official("Question: What are the first seven words in the hint to block 77? Format: word1 word2 word3 word4 word5 word6 word7 xXJ.", THREAD$72, void 0, { answer: answer("Second Second Life Second Coming I thought xXJ", "https://www.reddit.com/r/bitcoinpuzzles/comments/bb4c7q/comment/eujdj25/") }),
		official("Update: It will be impossible until the whole experiment ends, which will be shortly after the second run to block 77 finishes.", THREAD$72),
		official("Impossible to solve without final version of Chapter 2 of this story.", "https://www.wattpad.com/720895205-second-complete-quizchain")
	],
	solvedAt: "2019-07-23 07:09:48",
	solveTime: 9077106,
	transactions: [funding("3ad89ff0f48bfba17b28dedd5972a69bd3ac8acc73816048ab3ee566b71c1849", "2019-04-09 05:44:42", .007), claim("7ec179b405afe98e97c7e6d0d393301bbfeed8d73d445d801c8f9b4af242750e", "2019-07-23 07:09:48", .00685984)]
});
const THREAD$71 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bb4ifd/easy_7_mbtc_quizchain_block_14/";
const quizchainBlock14 = puzzle({
	id: "quizchain/14",
	chain: "bitcoin",
	address: "172tqKBumVhmVs3RRkJJcrG5S3Euje3A1H",
	sourceUrl: THREAD$71,
	startedAt: "2019-04-09 06:30:15",
	status: Status.Solved,
	pubkey: compressed("02fbe7dabef7509abe65f38bf6e786c185322c7494b50adcc2bec6b241fe6382ce"),
	key: wif("L4biaV2XFb18KWPxyZ4BUr3XBUh3t9u5X9FneQVXBVn3sxtjJZNb").entropy("5d88d03fe3fc3372a25f4b660a3db98dad685eaf1665dc8f4eff21f672abba30", source(THREAD$71, "SHA-256 of the two words and the last three characters of the block 13 key, separated by spaces")).derived(),
	techniques: [technique("sha256-to-bip39-entropy", THREAD$71)],
	prize: .007,
	hints: [
		official("Question: Two words with harmony. Format: word 1 word 2 xhm.", THREAD$71, void 0, { answer: answer("The solution for this block was luminous command. The reason is that the Showa era used the kanji 昭 together with harmony and the Reiwa era is using 令 together with harmony.", THREAD$71) }),
		official("Hint: This has been big news in Japan about a week ago.", THREAD$71),
		official("It is correct to think of Reiwa, but that is only one word joining \"harmony\". I am looking for word1 harmony word2 harmony. Also, the meaning for Rei in the comments will not work.", THREAD$71),
		official("Both words lowercase.", "https://www.reddit.com/r/bitcoinpuzzles/comments/bb4ifd/comment/ekgsfs9/")
	],
	solvedAt: "2019-04-09 18:55:17",
	solveTime: 44702,
	transactions: [funding("ed6ec05ed93de0fd8a64cee879a87d8d5d24c50ceecea6e85f6266e423085625", "2019-04-09 06:30:15", .007), claim("bc026c9837ed487f68becc9cddfd259376a97fbf18d7fae4185b92115c1ac9ed", "2019-04-09 18:55:17", .006)]
});
const THREAD$70 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bb7q8r/easy_7_mbtc_quizchain_block_15/";
const quizchainBlock15 = puzzle({
	id: "quizchain/15",
	chain: "bitcoin",
	address: "112Gm9cAaaLSPLBcRDaCyoyrUwAGwiM3mZ",
	sourceUrl: THREAD$70,
	startedAt: "2019-04-09 13:03:51",
	status: Status.Solved,
	pubkey: compressed("02e75292ab0b96d719b0c6bbf13da054196d6fcdee64df0c075528a7292bfcfd6c"),
	key: wif("KwszAWYYFHvEsfayfwP2YvvSFJ9gd6UFKJ5FjritPRJkXRbNQzF3").entropy("d552ee8c492129a28e5d7d18831554fb", source(THREAD$70, "MD5 of the sentence without its a, o and i, a space and the last three characters of the block 14 key")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$70)],
	prize: .007,
	hints: [
		official("The longest chain not only serves as proof of the sequence of the events witnessed", THREAD$70, void 0, { answer: answer("The lngest chn nt nly serves s prf f the sequence f the events wtnessed ZNb", THREAD$70) }),
		official("Remove certain letters from that sentence for the solution, then append the last three digits of the private key of the previous block, with a space between the solution and the linking three digits.", THREAD$70),
		official("Emergency update: I found another way to screw this up. Delivery on this one works only if you do the hash with MD5 algorithm. I restarted the hashing app and did not notice that it reset to MD5...", THREAD$70)
	],
	solvedAt: "2019-04-10 01:34:41",
	solveTime: 45050,
	transactions: [funding("28c827328eda7da662349f363deb359c35425227c664d63fd39d90e447200342", "2019-04-09 13:03:51", .007), claim("98dec91af8291a0cea1515e5a4f40f9acdb592fb4aba4a7ec6aa57506c6fb25e", "2019-04-10 01:34:41", .00669472)]
});
const THREAD$69 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bbeuye/medium_7_mbtc_quizchain_block_16/";
const quizchainBlock16 = puzzle({
	id: "quizchain/16",
	chain: "bitcoin",
	address: "12jpR4kuvZwYqyEFAwEVPq3KKgekFYtent",
	sourceUrl: THREAD$69,
	startedAt: "2019-04-09 23:30:50",
	status: Status.Solved,
	pubkey: compressed("03b5242f46392c5161149181ff153be661d559487ce77422f9c5d89dccdd65a0a6"),
	key: wif("KzuMwz6AriziBq1R5HiYxPzk9f3WzEQ7QyWVhAr8pn8Dwu91FdfP").entropy("3b28447d7c7713c4f1477bca49a75c13", source(THREAD$69, "MD5 of the fixed handle, a space and the last three characters of the block 15 key")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$69)],
	prize: .007,
	hints: [official("The question for block 16: 40 is an illegal number. Fix it. Format for the answer: [solution] [linking three digits from block 15]. Exactly one space between solution and chain link.", THREAD$69, void 0, { answer: answer("Solution was derived from the handle name of my 16th follower at the Twitter feed, which is HE4OBEK. The \"4O\" in the middle is illegal in the Bitcoin address space, since people may be unable to distinguish \"0\" from \"O\". To fix it, replace it with lowercase o, for a solution string \"HE4oBEK\".", THREAD$69) }), official("Update: Double-checking revealed that this block also was hashed with MD5.", THREAD$69)],
	solvedAt: "2019-04-10 05:27:17",
	solveTime: 21387,
	transactions: [funding("602f53a24fecdb5face4b1ed7eecfa9e7ab78f995eb015f074aac89c7332968c", "2019-04-09 23:30:50", .007), claim("b909c46f87694505ca4531d34ef18cd017ae82c08d69b1e9e704f7fdd387825c", "2019-04-10 05:27:17", .00679629)]
});
const THREAD$68 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bbf7cl/expert_8_mbtc_quizchain_block_17/";
const quizchainBlock17 = puzzle({
	id: "quizchain/17",
	chain: "bitcoin",
	address: "1FpiJm3JKsgAae5KtJhPDytgmYXrR7sQpY",
	sourceUrl: THREAD$68,
	startedAt: "2019-04-09 23:42:18",
	status: Status.Solved,
	pubkey: compressed("0244d7cc972d9412cf4aedb15984cb418fd96365bf25751044030101560d7f7156"),
	key: wif("KxqEkwjTQLuYGDwWvMUqEfhhDFB11UXv9sDVZH7M7YcaC9eoVeQh").entropy("f561020d891bc5a248331d866b5ddde2", source(THREAD$68, "MD5 of the address, a space and the last three characters of the block 16 key")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$68)],
	prize: .008,
	hints: [
		official("No hint. And no, \"No hint\" is not the answer this time. Already used that idea in block 11. Format: [solution] [link], with exactly one space between them.", THREAD$68, void 0, { answer: answer("The correct solution was to go back in my posting history to the first post, which was a link to this Bitcoin address: 1AndrewYangForPresident2o2ozm6Pzd", THREAD$68) }),
		official("I also note that it is 7 days on Reddit for me, so this is another reason to celebrate with an extremely hard block.", THREAD$68),
		official("Once you have the solution, that solution in turn will be a hint for block 16...", THREAD$68)
	],
	solvedAt: "2019-04-10 05:48:52",
	solveTime: 21994,
	transactions: [funding("a7cedbfdf7f6a630f6e666b1a73e3df8ac12bb18a2042d567c35803923662c43", "2019-04-09 23:42:18", .008), claim("75e380a09f7f09eb32c51e90758ab3e346629c276ead4bec47bb8b72624b2f71", "2019-04-10 05:48:52", .00769453)]
});
const THREAD$67 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bbij0e/meidum_7_mbtc_quizchain_block_18/";
const quizchainBlock18 = puzzle({
	id: "quizchain/18",
	chain: "bitcoin",
	address: "16Cn1vy7wEGzy3TWgwCzrcLd91n856Myn5",
	sourceUrl: THREAD$67,
	startedAt: "2019-04-10 05:56:12",
	status: Status.Solved,
	pubkey: compressed("0226e59a96172e92b7d4a2010b32dd6589b13392dddeb8eb368487cac852db1afd"),
	key: wif("L2nS1Af6BM2C8PUe442nLWf7fBNK4q25k1thY4G9onLdgJVPqmEf").entropy("8c4705387f72118d9518c6f0ba7bfaa1", source(THREAD$67, "MD5 of the name, a space and the last three characters of the block 17 key")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$67)],
	prize: .007,
	hints: [official("Question: Start with \"offs\". Add the missing letters to get the solution string. Format: [solution] [link]. with exactly one space between them. Use MD5 as hash algorithm (changed from SHA 256 for all blocks after 15).", THREAD$67, void 0, { answer: answer("Kerckhoffs", THREAD$67) }), official("There are no letters in between, but these four may be at any position in the solution string. As I mentioned in my Twitter feed @NakamotoAoi, another letter is e, the only other vowel.", "https://www.reddit.com/r/bitcoinpuzzles/comments/bbij0e/comment/ekjcc1k/")],
	solvedAt: "2019-04-10 10:55:13",
	solveTime: 17941,
	transactions: [funding("f299d6796ce34829eeff0a48a45717ad9c7f432c6e2aae21e84a9cb1f8eecabf", "2019-04-10 05:56:12", .007), claim("8df3586b2b217ddd56a6d6eddaaf5de45f712d7ca025d18c399fc68c82b582b8", "2019-04-10 10:55:13", .00679777)]
});
const THREAD$66 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bbkh2q/exceedingly_easy_7_mbtc_quizchain_block_19/";
const quizchainBlock19 = puzzle({
	id: "quizchain/19",
	chain: "bitcoin",
	address: "1MTh3kQjS14L9kvEUrFkYGiNdcWGDim1La",
	sourceUrl: THREAD$66,
	startedAt: "2019-04-10 10:55:13",
	status: Status.Solved,
	pubkey: compressed("03b9f9f0b7b70e97aa41dec7623b78acfbe02e54cb12cc051e75d7387b30a43b65"),
	key: wif("L5JhgYPfwdjDBQNffXP7xTaSS1FxhXVrjZKQ9QGsXeZue5j6A6AX").entropy("db8042ccb8c1a645704170062daa0053", source(THREAD$66, "MD5 of the second alternative, a space and the last three characters of the block 18 key")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$66)],
	prize: .007,
	hints: [official("Question: Multiple choice, two alternatives. a) second b) Second", THREAD$66, void 0, { answer: answer("Second.", "https://www.wattpad.com/720895205-second-complete-quizchain") }), official("First alternative is second, and second alternative is Second. Hint: I don't think the first alternative is correct in this case, the second one looks much more promising. Format [solution] [link] with exactly one space between them. Hash with MD5 like with all blocks since 15.", THREAD$66)],
	solvedAt: "2019-04-10 10:55:13",
	solveTime: 0,
	transactions: [funding("f68bc202e525eb02ac60c0a4b497bfda26bdadb02ec91b7e8cf24f248195f674", "2019-04-10 10:55:13", .007), claim("dae4dd121c4d59fbde4d8d2ddee49179aded36a825584f8272fdcc563e795b2b", "2019-04-10 10:55:13", .00669472)]
});
const THREAD$65 = "https://www.reddit.com/r/bitcoinpuzzles/comments/badtpz/easy_7_mbtc_quizchain_block_2/";
const quizchainBlock2 = puzzle({
	id: "quizchain/2",
	chain: "bitcoin",
	address: "1JP2qF74zzgz6FMzsmk7nxUeYd7aYCAMHc",
	sourceUrl: THREAD$65,
	startedAt: "2019-04-07 06:57:24",
	status: Status.Solved,
	pubkey: compressed("031c4dc0e046216624b8b932ece5c6eadd13f746f0a549c48b329fb150a0e1269e"),
	key: wif("Kz6upYXvTYY7r8uYZsRuuyyhbcRvXe6tKDFusRKco31Vw2TLihBF").entropy("e743564b041b97e4d61897cb41f90b83b38105298ccbd36899786b0c742e600d", source(THREAD$65, "SHA-256 of the solution with the last three characters of the block 1 key appended")),
	techniques: [technique("sha256-to-bip39-entropy", THREAD$65)],
	prize: .007,
	hints: [
		official("Question: The following sentence is the first in the top post of a certain subreddit I am following. One of the letters in the family name of the author is changed from lower to upper case. Change the other letters in his name in the same way for the solution.", THREAD$65, confirmation("https://web.archive.org/web/20230611110305/https://www.reddit.com/r/bitcoinpuzzles/comments/badtpz/easy_7_mbtc_quizchain_block_2/", "Wayback capture of the post with the solution edit"), { answer: answer("I posted A similar messaGe to the Basecamp, but had to also come visit You all here oN Reddit.", THREAD$65) }),
		official("Then append the last three digits from the private key of the solution to block 1. Do a SHA 256 hash on that and use as entropy in the Ian Coleman brain wallet tool.", THREAD$65),
		official("Sentence: I posted A similar message to the Basecamp, but had to also come visit you all here on Reddit.", THREAD$65)
	],
	solvedAt: "2019-04-07 07:32:15",
	solveTime: 2091,
	transactions: [funding("dd09d3f542576c7db2414fdfec68cb48757fca3e9d1c59142eaedb50b752620a", "2019-04-07 06:57:24", .007), claim("ccc30669f3961defc8c14b2a877dc16cabddb7dfa7c56770ef05e3940fbb7ba5", "2019-04-07 07:32:15", .00682539)]
});
const THREAD$64 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bbl653/medium_7_mbtc_quizchain_block_20/";
const quizchainBlock20 = puzzle({
	id: "quizchain/20",
	chain: "bitcoin",
	address: "1B6HjduAWAyaUUDxaLrNP6YXzynmA3HAdW",
	sourceUrl: THREAD$64,
	startedAt: "2019-04-10 11:53:13",
	status: Status.Solved,
	pubkey: compressed("03ca7882a333a161545e4786bdceeab57709fea2fd474697f1d502bb9ac63a27fe"),
	key: wif("L3qgQ3FVMZeqhDvg1LrhYt1TQbQzjJRhk5ZEoGv1wPaXwytDUzcQ").entropy("0af1d6e26d67473366ac39ae94e72b93", source(THREAD$64, "MD5 of the name, a space and the last three characters of the block 19 key")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$64)],
	prize: .007,
	hints: [
		official("Question: 132", THREAD$64, void 0, { answer: answer("Solution was Metamon, which is the Japanese name of Ditto", THREAD$64) }),
		official("Format: [solution] [link] with exactly one space between them and no period anywhere. First letter of solution is capitalized.", THREAD$64),
		official("One hint now only: This is NOT kanji number 132 in some list or other. No kanji involved in this block.", THREAD$64)
	],
	solvedAt: "2019-04-11 04:27:14",
	solveTime: 59641,
	transactions: [funding("62644b298643648502f237472abb64f7eb6b204949d890e8c2ed430230b3c034", "2019-04-10 11:53:13", .007), claim("08e74cdd7f96578c21289da0e2041e8ea6d38036a36340f746b0b9eeaab96acb", "2019-04-11 04:27:14", .00669771)]
});
const THREAD$63 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bbsqhh/hard_7_mbtc_quizchain_block_21/";
const quizchainBlock21 = puzzle({
	id: "quizchain/21",
	chain: "bitcoin",
	address: "12HDDSxU6F9crKJycdjWxKG1VaRRZS1ntA",
	sourceUrl: THREAD$63,
	startedAt: "2019-04-10 23:00:17",
	status: Status.Solved,
	pubkey: compressed("03705edd25c815b6198081214ee51b9316b90336bb8d7370f90657e2c28f57041f"),
	key: wif("L2oifBMUMLorrW27SEt1bV8kx4Mvk6aP3AnfERe7jbPpNyVdk7ww").entropy("f04fdf06bbcabd95413cc5488aef0b0d", source(THREAD$63, "MD5 of the block 1 answer with its typo fixed, a space and the last three characters of the block 20 key")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$63)],
	prize: .007,
	hints: [
		official("Question: Can you find the solution with absolutely no hint whatsoever?", THREAD$63, void 0, { answer: answer("Satoshi is an anonymous cypherpunk and the first one to succeed building private Internet cash.", "https://www.reddit.com/r/bitcoinpuzzles/comments/bbsqhh/comment/eklsc8n/") }),
		official("Format: [solution] [link] with exactly one space between them.", THREAD$63),
		official("Please post your best solution to the comments. I will send the link code from the unsolved previous post privately to the commenter if and only if one of the solutions is correct.", THREAD$63)
	],
	solvedAt: "2019-04-11 04:13:45",
	solveTime: 18808,
	transactions: [funding("f2e3d1562bf103b90da495076dc32f7df04ed03791b73d9603f6000da819121c", "2019-04-10 23:00:17", .007), claim("7d4be0b2af774f166562ff68cb0c4c8c53ced4f65c75f8a4118ae46b270b7e9f", "2019-04-11 04:13:45", .00669771)]
});
const THREAD$62 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bbukyu/easy_7_mbtc_quizchain_block_22/";
const quizchainBlock22 = puzzle({
	id: "quizchain/22",
	chain: "bitcoin",
	address: "162P5AFJRMiYB68axzGM9BWQ3UHVxJJpax",
	sourceUrl: THREAD$62,
	startedAt: "2019-04-11 01:52:50",
	status: Status.Solved,
	pubkey: compressed("039ff824ea21bc861419c189f123c0517fa2e6f554440db6587a2afbcbcfdaf945"),
	key: wif("L2c8CZiQGXxpsb4G2HJ2EptQSCumogW7n88XjBnpwiRkLEhMcCGD").entropy("c286981eaf9c214bdc8ed460df3bd589", source(THREAD$62, "MD5 of the three words, a space and the last three characters of the block 21 key")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$62)],
	prize: .007,
	hints: [official("Question: You start out with A O I. Which three words do you expand that to (only English words allowed, all words starting with capital letter).", THREAD$62, void 0, { answer: answer("Update: This block has been solved, solution was Artificial Overlord Intelligence.", THREAD$62) }), official("Format: [word1 word2 word3] [link] with exactly one space between three words and link.", THREAD$62)],
	solvedAt: "2019-04-11 05:29:57",
	solveTime: 13027,
	transactions: [funding("2c2cd07ca9718f42f9b1f409125a48301ff50bb20d9350a6bfcbcf5e45659892", "2019-04-11 01:52:50", .007), claim("82160a0b3b869abd2a30bcc30b5834b95bf0b5e1b4912655a4940e28ce717fd1", "2019-04-11 05:29:57", .00679648)]
});
const THREAD$61 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bbv6er/impossible_now_easy_later_7_mbtc_quizchain_block/";
const quizchainBlock23 = puzzle({
	id: "quizchain/23",
	chain: "bitcoin",
	address: "1Ee9S6mv2XWhfzTmocc3twpo6kyuS3BsXz",
	sourceUrl: THREAD$61,
	startedAt: "2019-04-11 02:55:35",
	status: Status.Solved,
	pubkey: compressed("02d1501e28174fa0d7d6457b95876ae201c567877827094fb69b202ca69258615a"),
	key: wif("KyJLiBVQgY76wvHiSKv2hCRqA2W3bD29PUmHYXJj4KiBcbuammph").entropy("94e9e006cceb549d3ff0e6e70eec1bb9", source(THREAD$61, "MD5 of the sentence's end from the final Wattpad chapter Second, a space and the last three characters of the block 22 key, printed by a player with the key")),
	techniques: [technique("md5-to-bip39-entropy", THREAD$61)],
	prize: .007,
	hints: [
		official("Question: Complete the following sentence. We found out that this is the second [6 words and period missing].", THREAD$61, void 0, { answer: answer("Solution of this block was: **climate emergency episode on this planet. CGD**", "https://www.reddit.com/r/bitcoinpuzzles/comments/bbv6er/comment/eui879d/") }),
		official("Format: [word1 word2 word3 word4 word5 word6.] [link] with exactly one space between solution and link.", THREAD$61),
		official("Update after first run to block 77: This will be impossible to solve until the whole quizchain experiment finishes and I publish the final version of the hint to block 77 in the Wattpad story.", THREAD$61)
	],
	solvedAt: "2019-07-22 23:56:43",
	solveTime: 8888468,
	transactions: [funding("ed5b87f7037416f53c55871d3ee2303d48bb20184de7549b9c69f83068aa7b74", "2019-04-11 02:55:35", .007), claim("71d30fb4aceee87de70bb0627a5518a64ee94c42e9ecd490d66ddc022a26fc59", "2019-07-22 23:56:43", .0066)]
});
const THREAD$60 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bbw9s3/easy_7_mbtc_quizchain_block_24/";
const quizchainBlock24 = puzzle({
	id: "quizchain/24",
	chain: "bitcoin",
	address: "1KEAu58Aee4QWaEffRgQkri6vDnBTydepP",
	sourceUrl: THREAD$60,
	startedAt: "2019-04-11 05:07:01",
	status: Status.Solved,
	pubkey: compressed("036ea5d8332f73b71bb260d6aed42ff5dde1a94ede2f0a1cbfdb0fae6221af2811"),
	key: wif("KyvktRtTdifj19HmNAGPwRe6mvSxcWyE9jUwk9V8nqBXMxAqCtp5").entropy("4834584f9ca0687697726bbf655dd681", source(THREAD$60, "MD5 of the block number read backwards, a space and the last three characters of the block 23 key the block 23 post printed")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$60)],
	prize: .007,
	hints: [official("Question: Read backwards.", THREAD$60, void 0, { answer: answer("Update: Solved. The block number 24 backwards is 42, which in turn will be the answer to block 42 as well.", THREAD$60) }), official("Format: [solution] [link] with exactly one space between.", THREAD$60)],
	solvedAt: "2019-04-11 05:58:35",
	solveTime: 3094,
	transactions: [funding("6ecfa33a3fbb7644d64b3cd930c9e25f4d95709daf9a45df76ba626dc3771242", "2019-04-11 05:07:01", .007), claim("548e8e94797c3549ef05d4d872ed8b86986ca1aa4c1b1e25149525208258fcd0", "2019-04-11 05:58:35", .00669453)]
});
const THREAD$59 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bbwl11/easy_7_mbtc_quizchain_block_25/";
const quizchainBlock25 = puzzle({
	id: "quizchain/25",
	chain: "bitcoin",
	address: "13ZuQHSeeJFYyyLN9CcYm1Lg9QJ65odk33",
	sourceUrl: THREAD$59,
	startedAt: "2019-04-11 06:25:41",
	status: Status.Solved,
	pubkey: compressed("025a285721813297978fc6079d742a8cbcb9469c54e5a38e824f6001b6ed125885"),
	key: wif("KxmrVCvyFVgFCdjYJv8eFF3bqbsg2QE9rS31rSF3V4Lodnneh6aC").entropy("a6456eec4c9150a81227889b710a23be", source(THREAD$59, "MD5 of the letter, a space and the last three characters of the block 24 key")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$59)],
	prize: .007,
	hints: [official("Question: Wait, but why?", THREAD$59, void 0, { answer: answer("Solution was Y, as the 25th letter in the alphabet, chosen for block 25.", THREAD$59) }), official("Format:  [solution] [link] with exactly one space between them.", THREAD$59)],
	solvedAt: "2019-04-11 06:30:37",
	solveTime: 296,
	transactions: [funding("5a9ebb00e1256ffea8fae75cbe09492509071b01be586eb2a3628677ec7e46eb", "2019-04-11 06:25:41", .007), claim("57444c1698a7641d77579c2dfb531b76bec1c0b95eb928e71cfbbebc0c32a1f6", "2019-04-11 06:30:37", .00669453)]
});
const THREAD$58 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bbwswp/solved_before_posting_7_mbtc_quizchain_block_26/";
const quizchainBlock26 = puzzle({
	id: "quizchain/26",
	chain: "bitcoin",
	address: "1Kg9XZFE81j2SjXekrAVCpgAkzDjbTBXeD",
	sourceUrl: THREAD$58,
	startedAt: "2019-04-11 06:47:40",
	status: Status.Solved,
	pubkey: compressed("0348eddbfcc56b18ce908a27eb622562179b6a444420fe7dff7427031f633ff7b0"),
	key: wif("L2zPMoXCWNqoqRhYNnQCpqY7dKNtc7xMT69VCBisk4LJvfGEmYQa").entropy("ddbafd159c1271f782154eea18b0dee2", source(THREAD$58, "MD5 of the letter, a space and the last three characters of the block 25 key")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$58)],
	prize: .007,
	hints: [official("This block was a test case to see if someone was alert enough to see where the next block was going before I even posted it here.", THREAD$58, void 0, { answer: answer("Answer for this one was Z, as this is the last occasion to do a single letter answer.", THREAD$58) })],
	solvedAt: "2019-04-11 06:47:40",
	solveTime: 0,
	transactions: [funding("c782a9a2300df8886893bdfa957f095be2006859568b15b69aeebcb5fca76535", "2019-04-11 06:47:40", .007), claim("7235eb8019d89aa745bb35c9f8ec64b844a943558a0a71918537f4bfe44b2d4f", "2019-04-11 06:47:40", .00679648)]
});
const THREAD$57 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bbyxd4/medium_9_mbtc_quizchain_block_27/";
const quizchainBlock27 = puzzle({
	id: "quizchain/27",
	chain: "bitcoin",
	address: "1AmV6X4XUpekJPqp3smcCN9HAcdcLMsviw",
	sourceUrl: THREAD$57,
	startedAt: "2019-04-11 11:42:08",
	status: Status.Solved,
	pubkey: compressed("0245ce2a927a35a34b4fd506659d4a320657ad104860d87b0eb4cdda8957b620e5"),
	key: wif("L4HGPUrxBkveqcevHh54btCFqupm4XhnH1ZFiajTBfPv4kS8NMA2").entropy("60f7bf883202ac8998ab38b79e3edade", source(THREAD$57, "MD5 of the name, a space and the last three characters of the block 26 key")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$57)],
	prize: .009,
	hints: [
		official("Question: I am looking for the name of a gambler.", THREAD$57, void 0, { answer: answer("James Bond.", "https://www.wattpad.com/720895205-second-complete-quizchain") }),
		official("Format: [first name] [family name] [link] with one space between each.", THREAD$57),
		official("Only one thing now: Neither block 17 nor block 7 has anything to do with the solution.", THREAD$57)
	],
	solvedAt: "2019-04-11 12:06:01",
	solveTime: 1433,
	transactions: [funding("e938ba701144731be470e2060bba8219e9d2d2a9785e09d64092feb9e6ce563c", "2019-04-11 11:42:08", .009), claim("b70aa7492b70cf95a9997fce8bb765bff6a18f3cc0dda53d78c4c46a11d0d5e6", "2019-04-11 12:06:01", .00867917)]
});
const THREAD$56 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bc3l0m/hard_7mbtc_quizchain_block_28/";
const quizchainBlock28 = puzzle({
	id: "quizchain/28",
	chain: "bitcoin",
	address: "19PEtVBuiFeAAKU5uhGyZ5NwsK6xwRBFpH",
	sourceUrl: THREAD$56,
	startedAt: "2019-04-11 18:46:38",
	status: Status.Solved,
	pubkey: compressed("032db1e52b7290ddfa97d99b9a19e3ed843cffbbb44d95cee212aefc7bc98da2ad"),
	key: wif("KwmmWhLkyVqELbEUFx4EyReV2qz6kn7j82yUoLgTu9sUGtkJszff").entropy("535380e31644c8f30e484e9c974a5459", source(THREAD$56, "MD5 of the solution, a space and the last three characters of the block 27 key")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$56)],
	prize: .007,
	hints: [
		official("Question: What is BFU?", THREAD$56, void 0, { answer: answer("Solution was BruteFUFUFUFUFUFUFUFUFU", THREAD$56) }),
		official("Format: [solution] [link] with one space between.", THREAD$56),
		official("Emergency update: Another screw up. Link for this needs to be NM2, not MA2.", "https://www.reddit.com/r/bitcoinpuzzles/comments/bc3l0m/comment/ekovkao/")
	],
	solvedAt: "2019-04-12 10:29:44",
	solveTime: 56586,
	transactions: [funding("2b91c510c78de50e9ddeb094583ab9ee2a2d8e0f477328eac2a53087effa64b9", "2019-04-11 18:46:38", .007), claim("9aa47a9a1bbbc4fc0167a3f4418849797a7ae3f1512c60289c8986a7a7a92d11", "2019-04-12 10:29:44", .00679648)]
});
const THREAD$55 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bc6rkn/easy_7_mbtc_quizchain_block_29/";
const quizchainBlock29 = puzzle({
	id: "quizchain/29",
	chain: "bitcoin",
	address: "1BQiU45feRw5UKdCUbXuoNfuK5WRzTpa4P",
	sourceUrl: THREAD$55,
	startedAt: "2019-04-11 23:41:59",
	status: Status.Solved,
	pubkey: compressed("03183d03300c902724c89e15fd95055984aacc49e01a5285ca7f26bb4b90104289"),
	key: wif("Ky2NXmPfzm1tZRoRWyEcFoY5Q63NZNZNt9HQQF7pHQJyb6WZKJRu").entropy("982301b80b30af3a0abe110269b0dd43", source(THREAD$55, "MD5 of the draft the post printed with voice changed to vOIce, a space and the last three characters of the block 28 key")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$55)],
	prize: .0077,
	hints: [
		official("Question: Second version.", THREAD$55, void 0, { answer: answer("Solution: just change the o and i in \"voice\" in the second sentence to \"O\" and \"I\", same method as in Block 2.", THREAD$55) }),
		official("Format: [solution] [link] with exactly one space between them.", THREAD$55),
		official("Update: Copypaste from my draft, exactly same as used for hashing:", THREAD$55)
	],
	solvedAt: "2019-04-12 12:25:08",
	solveTime: 45789,
	transactions: [funding("b49ebc67d4fc54143b0a934441224f6abeb4749d24f7e14776294dfdfeaa7d77", "2019-04-11 23:41:59", .0077), claim("268840ab0b0a31d5cace7fcb69424087f5e2bbaaecaac58f9e4452ddd569d750", "2019-04-12 12:25:08", .00739491)]
});
const THREAD$54 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bae43s/easy_7_mbtc_quizchain_block_3/";
const quizchainBlock3 = puzzle({
	id: "quizchain/3",
	chain: "bitcoin",
	address: "1Nsi6LxpKqg5CDVrswn6YPNQaGBhdhUCMs",
	sourceUrl: THREAD$54,
	startedAt: "2019-04-07 07:51:08",
	status: Status.Solved,
	pubkey: compressed("028faeaeb616580d0b710d6ab4bb625fe157f3a2aaf393df3ac653df8f3a90e58f"),
	key: wif("KxN3DX8bKLTMNhppf6FqjvCKaLBCi5mN5vGyVNQRUxjdwt4o683S").entropy("4b1f87124aa427ca3f7e7dbf3d8ee8bf7e3985c488be5d7d53e65119b631d743", source(THREAD$54, "SHA-256 of the random number with the last three characters of the block 2 key appended")),
	techniques: [technique("sha256-to-bip39-entropy", THREAD$54)],
	prize: .007,
	hints: [
		official("First part: Pick a random 3 digit number.", THREAD$54, void 0, { answer: answer("777", THREAD$54) }),
		official("Second part: Last three digits of the private key of block 2.", THREAD$54, void 0, { answer: answer("hBF", THREAD$54) }),
		official("Combine both parts, take SHA 256 hash of that and input the result as entropy in the Ian Coleman brain wallet tool.", THREAD$54)
	],
	solvedAt: "2019-04-07 08:01:41",
	solveTime: 633,
	transactions: [funding("e6aa641de6fffe6b15d96492069bb6b1ee130a5b89e37e02a2919f10822fc93a", "2019-04-07 07:51:08", .007), claim("75e81859b409270a378eface94174c635b2575da7aa0a8def53e7228c33f641c", "2019-04-07 08:01:41", .00672314)]
});
const THREAD$53 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bcbxb2/hard_7_mbtc_quizchain_block_30/";
const AUTHOR_COMMENT$20 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bcbxb2/comment/ekuicyf/";
const quizchainBlock30 = puzzle({
	id: "quizchain/30",
	chain: "bitcoin",
	address: "1AuvqSGzUigkswAunNNiBFYVZh1L2Jv2ZB",
	sourceUrl: THREAD$53,
	startedAt: "2019-04-12 10:29:44",
	status: Status.Solved,
	pubkey: compressed("026e8c8947914334aa286be25354d34111b2ccd7d2581fa7ef812233e6f324cf40"),
	key: wif("L3eCrvouiccM1cvmb52sZV5VtY8P5kGUkxjARjJspX1exmA1DfTS").entropy("8056c0a3eb19a5ef52ed6280a494ab0d", source(AUTHOR_COMMENT$20, "MD5 of the answer string the author printed, the full hash of which a comment of the author gives")).derived(),
	techniques: [technique("md5-to-bip39-entropy", AUTHOR_COMMENT$20)],
	prize: .007,
	hints: [
		official("Question: 4231", THREAD$53, void 0, { answer: answer("BFUB is \"Sphinx Yang\", for a complete answer string of \"Humanity First BotFU Sphinx Yang JRu\"", THREAD$53) }),
		official("Format: [solution] BotFU [BotFU] [link], see example above. Hint: BotFU for this is two words, both starting with capital letters.", THREAD$53),
		official("4231 is to be divided in 423 for the first word (and BFUB hint) and 1 for the second word and BFUB hint.", THREAD$53),
		official("FIrst word of BFUB is Sphinx.", THREAD$53)
	],
	solvedAt: "2019-04-14 02:38:04",
	solveTime: 144500,
	transactions: [funding("cb3dd31d6d76ad379e04359a0be9003afcb663da12f69c85417700ad2823395f", "2019-04-12 10:29:44", .007), claim("28c6135326b87b411f4640c6a53974380633bd35cdccba1ab104cd79c93f682f", "2019-04-14 02:38:04", .00673638)]
});
const THREAD$52 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bckvv9/easy_7_mbtc_quizchain_block_31/";
const quizchainBlock31 = puzzle({
	id: "quizchain/31",
	chain: "bitcoin",
	address: "1UQPCtfgohV2trpRfcgcNgTxEyUsT7AQf",
	sourceUrl: THREAD$52,
	startedAt: "2019-04-13 00:12:25",
	status: Status.Solved,
	pubkey: compressed("02511924b3c1ba1e38dcc211d55cde81582e6df5a3a2cfe7824fbfc43a822c055f"),
	key: wif("L51KtCtDoT28gTj335pW6Z7zbDY5m2RbsZiCQhNfbMRNeGpaH3NJ").entropy("26c9d319d4423d2555501d9ca0843af5", source(THREAD$52, "MD5 of the letter, the BFUB field and the last three characters of the block 30 key, separated by spaces")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$52)],
	prize: .007,
	hints: [
		official("Question: BItcoin Second", THREAD$52, void 0, { answer: answer("Solution:  A.   (one capital letter).", THREAD$52) }),
		official("Format: [solution] BFUB [BFUB] [link] with exactly one space between them and all words in answer capitalized.", THREAD$52, void 0, { answer: answer("Finding BFUB:  working from solution, develop hint. In this case Before B.", THREAD$52) }),
		official("Previous block link digits: fTS", THREAD$52),
		official("First 2 digits of the hash are 26, so if you don't see those two digits, don't bother checking the BIP 39 tool.", THREAD$52)
	],
	solvedAt: "2019-04-13 03:54:55",
	solveTime: 13350,
	transactions: [funding("4431011443671bdc5cf43b83d408a205056904be5d8972173f4a0952186118c7", "2019-04-13 00:12:25", .007), claim("fdb692aeb01025cf4fcfbabcb2acc3f468da359d15d7b9e34e54c54ec00e6bb6", "2019-04-13 03:54:55", .00669491)]
});
const THREAD$51 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bclsnu/medium_7_mbtc_quizchain_block_32/";
const quizchainBlock32 = puzzle({
	id: "quizchain/32",
	chain: "bitcoin",
	address: "1CGSo2jKDAVArPHSgmruQ3AECHMZKTHaAo",
	sourceUrl: THREAD$51,
	startedAt: "2019-04-13 01:57:23",
	status: Status.Solved,
	pubkey: compressed("039a3c1ed7f49478714874db9329d2e80b067f01ba6dac38ba07da03ebc876f091"),
	key: wif("L1eQxerFy9h8WTKtj5pATnmwVLSMtnoBp4k2ZyuswQhHu5ZvALLD").entropy("8be89464d9dfd717cd5b527b691aed9e", source(THREAD$51, "MD5 of the answer, BFUB, the hint and the last three characters of the block 31 key, separated by spaces")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$51)],
	prize: .007,
	hints: [
		official("Question: Satoshi Nakamoto is a) human b) AI c) no way to know", THREAD$51, void 0, { answer: answer("Solution: human", THREAD$51) }),
		official("Format: [solution] BFUB [BFUB text] [link] BFUB text first word only capitalized.", THREAD$51, void 0, { answer: answer("BUFB Before artificial intelligence explosion", THREAD$51) }),
		official("It requires reading the Wattpad story to solve the BFUB.", THREAD$51),
		official("Link from previous block: 3NJ First two digits of hash:8b", THREAD$51)
	],
	solvedAt: "2019-04-13 09:04:46",
	solveTime: 25643,
	transactions: [funding("d62b83175b0959992d6890071ea741816b93d71627058443ce213eb39f8491dd", "2019-04-13 01:57:23", .007), claim("fde3075a8b15081c6f955d088d27960f38ab3dd15f750cc51a680b23340259c3", "2019-04-13 09:04:46", .00669472)]
});
const THREAD$50 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bcmgqi/medium_7_mbtc_quizchain_block_33/";
const quizchainBlock33 = puzzle({
	id: "quizchain/33",
	chain: "bitcoin",
	address: "137SFKp9MPjymMQVk85oarHoaxUd9QyeiA",
	sourceUrl: THREAD$50,
	startedAt: "2019-04-13 03:17:45",
	status: Status.Solved,
	pubkey: compressed("025ad61882fbd1a289b07a27324f16225e4694e29bac6bf488f9707fd57a4e97b2"),
	key: wif("KwPtjU4XKtQ2oqdiQc9vgrhefAqi9egXS2PXi7PiHDewrfxzuHDD").entropy("fa19d83c0fabbaee989eced063c65834", source(THREAD$50, "MD5 of the answer, BFUB, two words from the block 35 answer and the last three characters of the block 32 key, separated by spaces")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$50)],
	prize: .007,
	hints: [
		official("Question: An easy math problem. 4231 minus 132.", THREAD$50, void 0, { answer: answer("Solution was \"Think harder BFUB Yang hat\".", "https://www.wattpad.com/720895205-second-complete-quizchain") }),
		official("Format: [solution] BFUB [BFUB text] [link]. Two words in BFUB field, first of them capitalized.", THREAD$50),
		official("Solution of block 35 is massive hint for this one. Two BFUB words in this one are from the solution of block 35.", "https://www.reddit.com/r/bitcoinpuzzles/comments/bcmgqi/comment/ekuvi1b/"),
		official("Another hint. Solution is of the format [word1] [word2]", "https://www.reddit.com/r/bitcoinpuzzles/comments/bcmgqi/comment/ekux6t7/")
	],
	solvedAt: "2019-04-14 08:27:20",
	solveTime: 104975,
	transactions: [funding("f06027a116dcb6f163fc3115ca013f146333c732357c18c85f293278eb657a3d", "2019-04-13 03:17:45", .007), claim("786fc5ca05d68343e7365492caecb74243e456a7e32e0c469ce96a713267f122", "2019-04-14 08:27:20", .00688474)]
});
const THREAD$49 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bgttca/repost_of_quizchain_block_34/";
const quizchainBlock34 = puzzle({
	id: "quizchain/34",
	chain: "bitcoin",
	address: "1G6wfwVAuKP3PEm1d1uxCnp5qp5icXhb8V",
	sourceUrl: THREAD$49,
	startedAt: "2019-04-13 04:25:18",
	status: Status.Solved,
	pubkey: compressed("03832963f22902be98dd78db0c79ad0f0b3b6ad381e0c0c531ea179ad7852565cc"),
	key: wif("L4jBHrfHn3WwUuvavT7ZcsuKoYCTcgKag25UwUPtsWDGNquFS2PG").entropy("fbe465894214fb65fe758a811a45bf21", source(THREAD$49, "MD5 of the word, BFUB, the block 33 prize address and the last three characters of the block 33 key, separated by spaces")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$49)],
	prize: .007,
	hints: [
		official("Question: Zhang Yingyu 1617", THREAD$49, void 0, { answer: answer("Solution for this was the word Hoax, which was a lucky find in the funding address of the previous block. That funding address also went into the BFUB field for this block.", THREAD$49) }),
		official("Solution is one word, capitalization will be evident. BFUB text is my favorite Bitcoin address.", THREAD$49),
		official("Link from previous block: HDD", THREAD$49)
	],
	solvedAt: "2019-04-13 15:17:39",
	solveTime: 39141,
	transactions: [funding("8cd71559ef2ab01166ff087ad735370099021097f856a9a5fdc07868dfd67b2c", "2019-04-13 04:25:18", .007), claim("3262111816f75f0c4a672eea5fbc3cf6d161aa45b02b92ae7e1e1ed3b3562380", "2019-04-13 15:17:39", .00673619)]
});
const THREAD$48 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bcouou/easy_7_mbtc_quizchain_block_35/";
const quizchainBlock35 = puzzle({
	id: "quizchain/35",
	chain: "bitcoin",
	address: "1QG3XE2FRm6bp6hBrCnjchaaYVfDydCMH1",
	sourceUrl: THREAD$48,
	startedAt: "2019-04-13 09:37:50",
	status: Status.Solved,
	pubkey: compressed("031a1793b638dfc0b85c5d45533319a1389304484d8ca9674148bcdc55774b13a4"),
	key: wif("L31yQxfBdiKJXEMuQgkHCPvFQf5icVGfC5xve3BdrNYot1mGqebC").entropy("4710baf2e951169fc3ab381ab86f2fe5", source(THREAD$48, "MD5 of the three words and the last three characters of the block 34 key, separated by spaces")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$48)],
	prize: .007,
	hints: [
		official("Question:   Think", THREAD$48, void 0, { answer: answer("Solution:  MATH Yang hat    BFUB no BFUB for this block.", THREAD$48) }),
		official("Format:  [solution] [link] with exactly one space between them. Solution is a string of three words, second one of them Yang.", THREAD$48),
		official("Link from last block (still unsolved now) is 2PG.", THREAD$48)
	],
	solvedAt: "2019-04-13 14:45:06",
	solveTime: 18436,
	transactions: [funding("11020a80bf92c3f17e4f479efe4ea984a15a69f8e5c6435d3506e89700d5c4fd", "2019-04-13 09:37:50", .007), claim("19e945bd89ca3a0527abee210993711ff966667460091b48de0176c7191f972a", "2019-04-13 14:45:06", .00676948)]
});
const THREAD$47 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bcx8ju/easy_7_mbtc_quizchain_block_36/";
const quizchainBlock36 = puzzle({
	id: "quizchain/36",
	chain: "bitcoin",
	address: "17CaBqDJGm4pr8Bijb6PeGaaU9APAL5Jwk",
	sourceUrl: THREAD$47,
	startedAt: "2019-04-14 00:33:27",
	status: Status.Solved,
	pubkey: compressed("03a3a050d4f47e0ef6ce9fe221b29e3d5f275cc30547213056ada4a1e68d3005a0"),
	key: wif("Kz7Czh9CiNGjv6Ut3Zxd1ErWS8j8tEbF3kY9v8ha6j9BJ4qJxvXY").entropy("4fcb73c01427a6d689979ef5ad7cd722", source(THREAD$47, "MD5 of the phrase and the last three characters of the block 35 key, separated by a space")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$47)],
	prize: .007,
	hints: [
		official("How are you this morning, Ms. Nakamoto? Thank you, I am good.", THREAD$47, void 0, { answer: answer("Solution for this was \"Google only one way\", which is a new phrase I mentioned in my hint post.", THREAD$47) }),
		official("Format: [word1 word2 word3 word4] [link] with exactly one space between them.", THREAD$47),
		official("I already said where the hint for this is elsewhere.", THREAD$47)
	],
	solvedAt: "2019-04-14 00:33:27",
	solveTime: 0,
	transactions: [funding("5ffb530c3039f03c59943eccfe67f76708343aafdc0e5d2ab7b78340e9438e2c", "2019-04-14 00:33:27", .007), claim("80370bbffc9e28b4fd16a73f4c025c92611fa41885d90fec37aac10b18ac5814", "2019-04-14 00:33:27", .00674944)]
});
const THREAD$46 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bcykn2/easy_7_mbtc_quizchain_block_37/";
const quizchainBlock37 = puzzle({
	id: "quizchain/37",
	chain: "bitcoin",
	address: "18EmMJviXB6akqNftbufhxWcLbvgj2Mv7P",
	sourceUrl: THREAD$46,
	startedAt: "2019-04-14 03:07:20",
	status: Status.Solved,
	pubkey: compressed("021e57eeddbfc69764bc34baa33ac77b6b81cd368d835f2405b02d91fff76dc134"),
	key: wif("L33R24DaXvjjeuB145crhBsesGK435CJoTHHgCu5JvS7Z13QCnhd").entropy("3ccc475a0c33eeefc5d33e7a0584a5ce", source(THREAD$46, "MD5 of the answer, BFUB, the hint and the last three characters of the block 36 key, separated by spaces")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$46)],
	prize: .01,
	hints: [
		official("Question:  James Bond", THREAD$46, void 0, { answer: answer("The only point here to find the solution was to replace the 0 in 007 for o, since 0 is not allowed in Bitcoin addresses. From there on my BFUB hint was simply 0o, meaning replace 0 for o.", THREAD$46) }),
		official("Format: [solution] BFUB [BFUB string] [link] with exactly one space between them.", THREAD$46),
		official("Link from Block 36:vXY First two digits of hash: 3c", THREAD$46)
	],
	solvedAt: "2019-04-14 06:18:36",
	solveTime: 11476,
	transactions: [funding("5654065b34c1652c0dee19034a7de7bf3999b43c9c20a3834f5834bf14928bea", "2019-04-14 03:07:20", .01), claim("b7171416aa3d02fb0ad61fe43b7fb1324efc7e2e7c4ef6f9bea3950c0c398091", "2019-04-14 06:18:36", .00990554)]
});
const THREAD$45 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bd0hhv/easy_7_mbtc_quizchain_block_38/";
const quizchainBlock38 = puzzle({
	id: "quizchain/38",
	chain: "bitcoin",
	address: "17ZWMrmzqah2HNVk7MqgdavJTj3WJ7fLiv",
	sourceUrl: THREAD$45,
	startedAt: "2019-04-14 07:37:59",
	status: Status.Solved,
	pubkey: compressed("029423d7d6b13b1c23aa845c5b9391c5c207093cee373937c7d87b2ba7c4aa3833"),
	key: wif("L4Lx6oHzwhX2JsN83FVtQu8PzPMPz9WmzqHsaea9xHABUwax3B3j").entropy("ea8c10263db9ed4e3be0ac1aa0803dfb", source(THREAD$45, "MD5 of the villain, BFUB, the second letters of both words and the last three characters of the block 37 key, separated by spaces")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$45)],
	prize: .007,
	hints: [
		official("Question: Villain in the first James Bond novel", THREAD$45, void 0, { answer: answer("Le Chiffre BFUB eh.", "https://www.wattpad.com/720895205-second-complete-quizchain") }),
		official("BFUB for this are two letters, the second letter of each of the parts of the name.", THREAD$45),
		official("Link to previous block: nhd First two digits of MD5 hash: ea", THREAD$45)
	],
	solvedAt: "2019-04-14 07:49:32",
	solveTime: 693,
	transactions: [funding("797de4ee8d97c0e06f6eb1ff9239ffadfccfcc3f05ae26fe55b827ed68def2e1", "2019-04-14 07:37:59", .007), claim("d4e367a20f0886319b52be8b42d006e23445ecde8290e8183dc17ed13952805b", "2019-04-14 07:49:32", .00690554)]
});
const THREAD$44 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bd2p5c/7_mbtc_quizchain_block_39/";
const quizchainBlock39 = puzzle({
	id: "quizchain/39",
	chain: "bitcoin",
	address: "1D35Unrf2cpiTZRwAWBYeGcdJNXm72BRNT",
	sourceUrl: THREAD$44,
	startedAt: "2019-04-14 12:54:32",
	status: Status.Solved,
	pubkey: compressed("038cef626d8f337c273daca714cc0d962f5b4439a77805bcdd43f023efe09570e3"),
	key: wif("Kyafo1uBuP7pRMDDdjDMjVzThitBMXaiBcbWFUYQVDg1ZowukeP8").entropy("19bb929aed76a879df33689d51a76ece", source(THREAD$44, "MD5 of the villain, BFUB, the second letters of both words and the last three characters of the block 38 key, separated by spaces")),
	techniques: [technique("md5-to-bip39-entropy", THREAD$44)],
	prize: .007,
	hints: [
		official("Question: Second", THREAD$44, void 0, { answer: answer("Solution was the second James Bond villain, Mr Big. And the BFUB field was derived like in the previous block, making it ri.", THREAD$44) }),
		official("BFUB is like last block, second letter of the words in solution.", THREAD$44),
		official("Last block link: B3j Hash first two digits: 19", THREAD$44)
	],
	solvedAt: "2019-04-14 13:55:35",
	solveTime: 3663,
	transactions: [funding("f1771cfeda6a98140ca72915d89cd6301f0c992e9012d3f70aea022876a869ad", "2019-04-14 12:54:32", .007), claim("4a76ebcd287ae8a2a53356b085d9002d2b68e0e8245b0f5a81f4ccf26eaf1809", "2019-04-14 13:55:35", .00699155)]
});
const THREAD$43 = "https://www.reddit.com/r/bitcoinpuzzles/comments/baejeg/medium_7_mbtc_quizchain_block_4/";
const quizchainBlock4 = puzzle({
	id: "quizchain/4",
	chain: "bitcoin",
	address: "1JUZ8dxsH67yZd9KcuqpsSPA6fENtzM3NU",
	sourceUrl: THREAD$43,
	startedAt: "2019-04-07 09:15:55",
	status: Status.Solved,
	pubkey: compressed("034c27064d1789e275d76e898f5d5525bf6a5833ca959e02269db025b196cecdec"),
	key: wif("KwZXovJ7Fxu39q7TYmnwrjmBoYCcS86nga8snnsB6RDD5GXd86TX").entropy("0574a857c65a79835fa888c5321facc875073f553b94d1985041fd8f995ea4fa", source(THREAD$43, "SHA-256 of the two words with the last three characters of the block 3 key appended")),
	techniques: [technique("sha256-to-bip39-entropy", THREAD$43)],
	prize: .007,
	hints: [
		official("Do you know two words? They are in the word \"know\".", THREAD$43, confirmation("https://web.archive.org/web/20230611095720/https://www.reddit.com/r/bitcoinpuzzles/comments/baejeg/medium_7_mbtc_quizchain_block_4/", "Wayback capture of the post with the solution edit"), { answer: answer("The Chinese symbol (Kanji) for \"know\" is composed of the two elements \"arrow\" (to the left) and \"mouth\" (to the right).", THREAD$43) }),
		official("As always, take the solution string (no space between the two words), append the last three digits from the private key of the third block, run a SHA 256 hash on that and then use as entropy for brain wallet.", THREAD$43, void 0, { answer: answer("arrowmouth83S", THREAD$43) }),
		official("This one is difficult, so here is one extra hint. Look at my handle name.", THREAD$43, void 0, { answer: answer("The hint about my handlename was to point to the fact that it is a Japanese name.", THREAD$43) })
	],
	solvedAt: "2019-04-07 10:45:28",
	solveTime: 5373,
	transactions: [funding("29eb1d7fdae7d1bc7cea6824ff4d7e2acf3935ce830c434a40dfe13bdd8e01b5", "2019-04-07 09:15:55", .007), claim("4a571d060233ed298ee8227be1596f89523b556d8af4d9378483f62a4aa95f14", "2019-04-07 10:45:28", .00699322)]
});
const THREAD$42 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bd2ug5/7_mbtc_quizchain_block_40/";
const quizchainBlock40 = puzzle({
	id: "quizchain/40",
	chain: "bitcoin",
	address: "1CAYmTna2haJvGNE83pmRmwfAMGw8Mmeqk",
	sourceUrl: THREAD$42,
	startedAt: "2019-04-14 13:10:37",
	status: Status.Solved,
	pubkey: compressed("02ddfb547cfb77ec443637ed908bc8fb21d9779929c596083088244473cb7d85b6"),
	key: wif("L3juV44PrD3fyUTYy2Ax8Z3nURNV7gLRRcbVYkqGACkLof6mHALc").entropy("21f5fc1446eb53170e4331c46a4c7914", source(THREAD$42, "MD5 of the word, BFUB, the three characters after it in the block 39 key and the last three characters of that key, separated by spaces")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$42)],
	prize: .007,
	hints: [
		official("Question: three letter word starting with h and ending with t", THREAD$42, void 0, { answer: answer("The solution was the word \"hit\", since I noticed again that this word turned up in the private key of block 40.", THREAD$42) }),
		official("BFUB is three capital letters. If you found the solution the correct way, you will find those three letters easily.", THREAD$42, void 0, { answer: answer("Three digits of previous block private key following \"hit\" found there.", "https://www.reddit.com/r/bitcoinpuzzles/comments/bd2ug5/comment/ekxgugv/") }),
		official("Link from last block: Not provided this time, you need to solve last block to challenge this one.", THREAD$42)
	],
	solvedAt: "2019-04-14 14:21:11",
	solveTime: 4234,
	transactions: [funding("7b186c9a4df407e356b2231f41fddb305c585d316c88a75a2f034e9b7e5e086e", "2019-04-14 13:10:37", .007), claim("f63d705638aa14a1d58bcdcb920d4c788770c8445a27b9a1eb69d42dbc559a4b", "2019-04-14 14:21:11", .00666438)]
});
const THREAD$41 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bd31hw/7_mbtc_quizchain_block_41/";
const quizchainBlock41 = puzzle({
	id: "quizchain/41",
	chain: "bitcoin",
	address: "1MbB3CtYdhoix9j1SovN6jxzrpA9KKU8Qr",
	sourceUrl: THREAD$41,
	startedAt: "2019-04-14 13:50:10",
	status: Status.Solved,
	pubkey: compressed("03929448ca03bd7bd88d2221e6ea89ab78b1791c27996e5bad06d0fd8356c64dd4"),
	key: wif("KyQtSJhombsmQAaXsUFqFr6zg3uD6SHGP6oHZYzmnXELa7hWgemF").entropy("8dade6a1b051874eae09fcb5c431b5ed", source(THREAD$41, "MD5 of the letter, BFUB, the hint of three words and the last three characters of the block 40 key, which the author printed with the WIF")),
	techniques: [technique("md5-to-bip39-entropy", THREAD$41)],
	prize: .007,
	hints: [
		official("Question: Can you find the solution with absolutely no hint whatsoever?", THREAD$41, void 0, { answer: answer("Solution for this was P,  the method behind it was taking the obvious first step \"no\" and then noticing that the letters in \"no\" are following each other in the alphabet, which makes P the next one.", THREAD$41) }),
		official("Looking for one single capital letter in the solution. BFUB format is [word1] [word2] [word3].", THREAD$41, void 0, { answer: answer("BFUB was not \"next to no\" but \"next after no\".", THREAD$41) }),
		official("Link from last block: Not provided this time, you need to solve last block to challenge this one.", THREAD$41)
	],
	solvedAt: "2019-04-14 18:07:33",
	solveTime: 15443,
	transactions: [funding("2fcaeeaf487609373b3d8231e5f11d90a6ad013df823143f0b7081d63abbd2b9", "2019-04-14 13:50:10", .007), claim("08f0d5223a2338c96fe2edb76697eaa1bd96465d8d3c69bbca45ea839dc37bd5", "2019-04-14 18:07:33", .00687148)]
});
const THREAD$40 = "https://www.reddit.com/r/u_AoiNakamoto/comments/bddbd5/7_mbtc_quizchain_block_42/";
const quizchainBlock42 = puzzle({
	id: "quizchain/42",
	chain: "bitcoin",
	address: "18S29pV8hUTBJ8qeudtREvNqkFUNULSSj3",
	sourceUrl: THREAD$40,
	startedAt: "2019-04-15 06:33:03",
	status: Status.Solved,
	pubkey: compressed("025e44cd99b82b7bfcc1995c15fab7fa7a10a188df3e56a782be004d22b7a0ff50"),
	key: wif("L2htXn27ZGqymXMa6iz6x3y2CiYtFXooi1DQJidswTwhvWFdLUvY").entropy("c8f0c41c4595f41b80b58d8311492a02", source(THREAD$40, "MD5 of the quoted number, BFUB, the two words and the last three characters of the block 41 key, printed by a player with the key")),
	techniques: [technique("md5-to-bip39-entropy", THREAD$40)],
	prize: .007,
	hints: [
		official("Question: Of course you all knew the solution to this for a long time. But do you guess the slight twist on it?", THREAD$40, void 0, { answer: answer("\"42\" BFUB quotation marks", "https://www.wattpad.com/720895205-second-complete-quizchain") }),
		official("BFUB is in the format [word1] [word2] both in lowercase, with one space in between. If you guess the twist on the solution, BFUB should be easy.", THREAD$40),
		official("Link from previous block is emF. First two digits of hash is c8.", THREAD$40)
	],
	solvedAt: "2019-04-18 13:33:29",
	solveTime: 284426,
	transactions: [funding("2fbcb042b52bf00921020393788f02c026873160cd51e216fbd826cdeed12fae", "2019-04-15 06:33:03", .007), claim("6f0c1edcf603f6f498b2a1671fa7949662762f541a21692b2f1549aeeb7e0d3a", "2019-04-18 13:33:29", .00689248)]
});
const THREAD$39 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bddijl/7_mbtc_quizchain_block_43/";
const SOLUTIONS$9 = "https://www.wattpad.com/720895205-second-complete-quizchain";
const quizchainBlock43 = puzzle({
	id: "quizchain/43",
	chain: "bitcoin",
	address: "1MVWYyiyJVmNJRiEkyzcxp1gc5zmmftqrK",
	sourceUrl: THREAD$39,
	startedAt: "2019-04-15 07:01:42",
	status: Status.Solved,
	pubkey: compressed("030b1a0b217a760fb1af63e43ed50174fa7804df180213e96b5372481de5c3289e"),
	key: wif("KwoHhHcGp7YYqEWQUs3XUdyNyqtLfh4aAhCgU2UwQsqgx12GidA8").entropy("26ea250a918e2abb8ff02a149e1392a3", source(THREAD$39, "MD5 of the year, BFUB, the book and the last three characters of the block 42 key, separated by spaces")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$39)],
	prize: .007,
	hints: [
		official("Question: Year of first Internet scam", SOLUTIONS$9, void 0, { answer: answer("1604 BFUB Book of Swindles", SOLUTIONS$9) }),
		official("Format: [solution] BFUB [BFUB] [link]", SOLUTIONS$9),
		official("Resistance to immediate solving for this comes only from finding BFUB, so no hints for BFUB in this block. Should still be relatively easy.", SOLUTIONS$9)
	],
	solvedAt: "2019-04-15 11:37:13",
	solveTime: 16531,
	transactions: [funding("6b193b7857188262ee578c84944ad124c9dc8ee2a155f7cdf0306821bc399487", "2019-04-15 07:01:42", .007), claim("3f0f2264e7a85e988cdf2e8b014b584095bae1b442bc1ec64441f7d743686b41", "2019-04-15 11:37:13", .00690323)]
});
const THREAD$38 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bddkxb/7_mbtc_quizchain_block_44/";
const quizchainBlock44 = puzzle({
	id: "quizchain/44",
	chain: "bitcoin",
	address: "188g3aB5WFUEB7AppVRtP8Bs3rXHmABtze",
	sourceUrl: THREAD$38,
	startedAt: "2019-04-15 07:55:58",
	status: Status.Solved,
	pubkey: compressed("02195b57e21aa7f9379b6cb10459bd485439e3c5c2a01100eed0d57f0daca22694"),
	key: wif("L4VdZUDY2BXa7VVkjuYkmaLvi8P5qNZaARwwB9wjqkDa6Sn4JLV4").entropy("60c55bd7ee69ac70e263dde2e1a38c72", source(THREAD$38, "MD5 of BFUB and the song line, with the solution field left blank and no link")),
	techniques: [technique("md5-to-bip39-entropy", THREAD$38)],
	prize: .007,
	hints: [
		official("Question: Relax. Listen to some nice music. Wait for the idea to come. Have fun, even if the idea fails to show up.", THREAD$38, void 0, { answer: answer("As noted in the last hint, solution was to leave the solution field blank. Since there was no link for this, the only thing to find out was the BFUB field. I chose the line in the song lyrics that made me use this video in the first place: and I have said nothing", THREAD$38) }),
		official("Format: [solution]BFUB [BFUB] [link]", THREAD$38),
		official("Forgot including link in hash. Use only solution and BFUB. Sorry for another mistake.", "https://www.reddit.com/r/bitcoinpuzzles/comments/bddkxb/comment/ekxhgof/"),
		official("No space between [solution] and BFUB, but one space between BFUB and [BFUB], and no space after [BFUB], since there is no link in this one.", "https://www.reddit.com/r/bitcoinpuzzles/comments/bddkxb/comment/el8tmu9/"),
		official("and I have said leave solution field blank", "https://www.reddit.com/r/bitcoinpuzzles/comments/bddkxb/comment/emvhm0o/")
	],
	solvedAt: "2019-05-08 23:36:52",
	solveTime: 2043654,
	transactions: [funding("fd1eca202459cf477c56ec716bf2cd6264a24c79716f01a54843e069396c6e92", "2019-04-15 07:55:58", .007), claim("53239c9352fc97dbc2427e60b598f7571314f104a368962e9b0949d0357e7bee", "2019-05-08 23:36:52", .00676)]
});
const THREAD$37 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bdrcj7/7_mbtc_7_mbtc_11_mbtc_quizchain_blocks_45_to_47/";
const quizchainBlock45 = puzzle({
	id: "quizchain/45",
	chain: "bitcoin",
	address: "1KDnYd2LJwBfm74vv7VVP6kX3G74mUn2cP",
	sourceUrl: THREAD$37,
	startedAt: "2019-04-16 00:24:33",
	status: Status.Solved,
	pubkey: compressed("023164c0fb8c260c3010006309158b27ae6ae0f52ba1d398a9d15f336113f514b0"),
	key: wif("Kz8sAdfB3SfP51H8WCpRt1jXGn8GrhJMHuyPwpotaSfqdgAELXgr").entropy("66fd83ff6aacd8c9618c015ecb132701", source(THREAD$37, "MD5 of Bitcoin with every letter shifted one back, the fixed BFUB text and the link the post set")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$37)],
	prize: .007,
	hints: [
		official("Question: Bitcoin Second", THREAD$37, void 0, { answer: answer("That is because this time the solution is shifting ALL letters in \"Bitcoin\" to the letter before in the alphabet, as opposed to shifing only the first in the other block.", THREAD$37) }),
		official("Format: [solution] BFUB Have fun with this block Da6Sn4J", THREAD$37, void 0, { answer: answer("\"Ahsbnhm BFUB Have fun with this block Da6Sn4J\"", "https://www.reddit.com/r/bitcoinpuzzles/comments/bdrcj7/comment/elkiinm/") }),
		official("Link for this is set to Da6Sn4J.", THREAD$37)
	],
	solvedAt: "2019-04-16 19:14:41",
	solveTime: 67808,
	transactions: [funding("8514df7faec741d53faca908df5ccc855c760430759a2b5a12bf74ce00150f51", "2019-04-16 00:24:33", .007), claim("4a726f795ce239115e948e08cff868013c651ce68de1f3fcb54be8cca8fddf2e", "2019-04-16 19:14:41", .00690707)]
});
const THREAD$36 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bdrcj7/7_mbtc_7_mbtc_11_mbtc_quizchain_blocks_45_to_47/";
const quizchainBlock46 = puzzle({
	id: "quizchain/46",
	chain: "bitcoin",
	address: "1FAVdEyekXJu5o7Bx6QvVVnayYPq9fsPtv",
	sourceUrl: THREAD$36,
	startedAt: "2019-04-16 03:14:34",
	status: Status.Solved,
	pubkey: compressed("03abb6290e4fabfb1f72da1e3baac067d750d52afe78201e3251d30f6a0171ac98"),
	key: wif("KyUcwLpYRN72BjQbtT7job74DySaLS71PBfg71QMz4RKDadyH5bR").entropy("583d01edbdf81cc7494c85bcf506e991", source(THREAD$36, "MD5 of the genesis address, the fixed BFUB text and the last seven characters of the block 45 key")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$36)],
	prize: .007,
	hints: [
		official("Looking for another Bitcoin address, starting with 1A1. Not mentioned by me before here or elsewhere. I do NOT own this address.", THREAD$36, void 0, { answer: answer("1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa (Genesis block address, also puzzle for block 77).", "https://www.wattpad.com/720895205-second-complete-quizchain") }),
		official("Format: [solution] BFUB Think. Think harder. [link]", THREAD$36),
		official("Find solution, which is the Bitcoin address I am looking for, leave BFUB unchanged and use last 7 digits of previous private key for link.", THREAD$36)
	],
	solvedAt: "2019-04-16 19:15:35",
	solveTime: 57661,
	transactions: [funding("2900dfc636a5a9f8c3bbbc2f28dbd9c0fbc98b7d8c06c2e59de613c5f7dfa90a", "2019-04-16 03:14:34", .007), claim("526b428a52cbcc0a7c8426c3cdcf9727640d3344bd9885c549c3b77a4b458ed2", "2019-04-16 19:15:35", .00690707)]
});
const THREAD$35 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bdrcj7/7_mbtc_7_mbtc_11_mbtc_quizchain_blocks_45_to_47/";
const quizchainBlock47 = puzzle({
	id: "quizchain/47",
	chain: "bitcoin",
	address: "1J3sbaFiSpXgK49nBxonuLMqRw5H8K9wkk",
	sourceUrl: THREAD$35,
	startedAt: "2019-04-16 03:35:37",
	status: Status.Solved,
	pubkey: compressed("037690efde51280c48e3fa7aec3eff86887a10e1b3438b26b2fb8b5b1f1a1cd926"),
	key: wif("L54ym5FMKYsoLK48wMXoprMNV19kjTE8kDqUk5Hm5bih5P5fCnpv").entropy("b90d7abff767a00f34fdddd2f067f6d0", source(THREAD$35, "MD5 of the cross sum, BFUB, the two words and the last seven characters of the block 46 key, separated by spaces")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$35)],
	prize: .011,
	hints: [
		official("Question: Another difficult math problem. 1231", THREAD$35, void 0, { answer: answer("The solution was rather simple. Only one digit, the number 7, as the cross sum of the number posted in the question.", THREAD$35) }),
		official("BFUB will be four or less words, all of them lower case and seperated by one space, if there are two or more.", THREAD$35, void 0, { answer: answer("\"7 BFUB cross sum adyH5bR\"", "https://www.reddit.com/r/bitcoinpuzzles/comments/bdrcj7/comment/elemz19/") }),
		official("First two digits of hash: b9", THREAD$35)
	],
	solvedAt: "2019-04-21 05:56:37",
	solveTime: 440460,
	transactions: [funding("f0e7f3f0fa053d4c05354eab666e99a0e40a4475ed098b5473759ce93b41b92e", "2019-04-16 03:35:37", .011), claim("9ffd2697c07f5761775d18fe445647f4e6e8f92591d7b571c02c88652bc4fca1", "2019-04-21 05:56:37", .01082144)]
});
const THREAD$34 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bel75n/7_mbtc_7_mbtc_7_mbtc_quizchain_blocks_48_to_50/";
const quizchainBlock48 = puzzle({
	id: "quizchain/48",
	chain: "bitcoin",
	address: "1AutjmfZNmdep7jFfrSEgEe4bx3qZ54k1q",
	sourceUrl: THREAD$34,
	startedAt: "2019-04-18 06:13:32",
	status: Status.Solved,
	pubkey: compressed("02242d744b605f1be5ab3c81830b9c563d3d17b6e4cee91f747221608a02f33138"),
	key: wif("Kyzjj1utmtTwfPCkDSCf9TwgXWESgttQ4FxAtkhDCuuMyaGBvJCf").entropy("944b79dd94cc2e3db91d9348c98ebf06", source(THREAD$34, "MD5 of the amount and address, BFUB, the fixed text and the last seven characters of the block 47 key")),
	techniques: [technique("md5-to-bip39-entropy", THREAD$34)],
	prize: .007,
	hints: [
		official("Question: Like in that story, you want to send me a bribe. But you want to use Bitcoin. What amount in mbtc do you send to what address?", THREAD$34, void 0, { answer: answer("Solution was 0.777 mbtc 1AndrewYangforPresident2o2ozm6Pzd.", THREAD$34) }),
		official("Format: [solution] TOMI This one is really easy. No need to bribe anyone to get it. [link]", THREAD$34),
		official("UPDATE: change all TOMI below to BFUB (legacy format). I hashed with that and changed to TOMI in post at the last minute.", THREAD$34),
		official("Link from previous block (still unsolved): P5fCnpv", THREAD$34)
	],
	solvedAt: "2019-04-18 13:33:29",
	solveTime: 26397,
	transactions: [funding("574c8c91192669b4fc76f199ee813ee8e6883c84bfee1513062ae4a60c7647c4", "2019-04-18 06:13:32", .007), claim("be3486d02cb46905cd73bbcb36e17fd5793897247e18c9faf3b82165adfc33a1", "2019-04-18 13:33:29", .00683109)]
});
const THREAD$33 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bel75n/7_mbtc_7_mbtc_7_mbtc_quizchain_blocks_48_to_50/";
const quizchainBlock49 = puzzle({
	id: "quizchain/49",
	chain: "bitcoin",
	address: "1A2Z5k5DE1e8baSYLfkvXHbymLxCfvgUoq",
	sourceUrl: THREAD$33,
	startedAt: "2019-04-18 06:17:41",
	status: Status.Solved,
	pubkey: compressed("02dafcbc7148709c70022e632f5d03b2ad183780d16ac3f7ec8f466d79ffb53846"),
	key: wif("KzPd8rqVsewbA17eihdVX1v9qV2hcXjGDfYv2DWACqSZf6aeWgjN").entropy("3bc415094baf566889cc5bdafcaf5a41", source(THREAD$33, "MD5 of the three words, BFUB, the fixed text and the last seven characters of the block 48 key")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$33)],
	prize: .007,
	hints: [
		official("Question: You are looking for three words. Those three words are all lowercase. And they must be in the correct order.", THREAD$33, void 0, { answer: answer("Solution: hat hot hit", "https://www.wattpad.com/720895205-second-complete-quizchain") }),
		official("Format: [word1 word2 word3] TOMI Good luck with this block [link]", THREAD$33),
		official("Change TOMI to BFUB when hashing.", "https://www.reddit.com/r/bitcoinpuzzles/comments/bel75n/comment/el6orfx/"),
		official("[link] is last 7 digits from previous block private key, not 3, to make it harder to brute force a link.", THREAD$33)
	],
	solvedAt: "2019-04-18 20:04:04",
	solveTime: 49583,
	transactions: [funding("b911b08d4cfd3f682faa48ce4cc6e2e694fbf7e1e616972630372b4867d1024d", "2019-04-18 06:17:41", .007), claim("a66a762901f6065e1bedc225349efa19c6567631d3cd45ea6b647af723c446ac", "2019-04-18 20:04:04", .00688792)]
});
const THREAD$32 = "https://www.reddit.com/r/bitcoinpuzzles/comments/baf89m/easy_7_mbtc_quizchain_block_5/";
const quizchainBlock5 = puzzle({
	id: "quizchain/5",
	chain: "bitcoin",
	address: "1JR9yiCGuMrKQ19pbt2GJudpv1c5ZvXxK2",
	sourceUrl: THREAD$32,
	startedAt: "2019-04-07 11:08:39",
	status: Status.Solved,
	pubkey: compressed("020d091a1ea789d090a1b9f95a8bdf6b538f71749cc08eeb921cc84ba79a3eb3f9"),
	key: wif("KwK9P8R81i3JRFt5Ne7xT92hUxbAyKtkcxJcESd9x2rrXKSwQKPb").entropy("c534df8925c386ef2cad7502a427f478057357bc9210cb75e4845bd21762e1d5", source(THREAD$32, "SHA-256 of Satoshi's sentence with the last three characters of the block 4 key appended")),
	techniques: [technique("sha256-to-bip39-entropy", THREAD$32)],
	prize: .007,
	hints: [
		official("On this day ten years ago, how many bitcoins would you mine on average?", THREAD$32, confirmation("https://web.archive.org/web/20230611162510/https://www.reddit.com/r/bitcoinpuzzles/comments/baf89m/easy_7_mbtc_quizchain_block_5/", "Wayback capture of the post with its updates and solution"), { answer: answer("Satoshi answered this question on bitcointalk in 2009 like this: \"Typically a few hundred right now.\"", THREAD$32) }),
		official("I skip explaining the format this time, if you don't know it, look at one of the previous \"Quizchain\" posts.", THREAD$32, void 0, { answer: answer("Add last three digits of previous private key 6TX to claim the funds.", THREAD$32) }),
		official("Answer needs to be in exactly the same format as Satoshi's answer to this question in 2009.", THREAD$32)
	],
	solvedAt: "2019-04-07 12:49:32",
	solveTime: 6053,
	transactions: [funding("ff591de99487f386be72fe6e8a624a45b40b6c3f89344445d68036c04ff4eb35", "2019-04-07 11:08:39", .007), claim("b4d5865834c268b76a3b1ff4a311b6467af82b2be5e863e3696a03791f667491", "2019-04-07 12:49:32", .006435)]
});
const THREAD$31 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bel75n/7_mbtc_7_mbtc_7_mbtc_quizchain_blocks_48_to_50/";
const quizchainBlock50 = puzzle({
	id: "quizchain/50",
	chain: "bitcoin",
	address: "1F6HYzh2LvV2dtbWXTzMaYX3HBzBq4ZWQP",
	sourceUrl: THREAD$31,
	startedAt: "2019-04-18 06:35:53",
	status: Status.Solved,
	pubkey: compressed("0334a418802ec21adb9067931492d8c72f25e7f774649c5e662d0f25329d24b371"),
	key: wif("L1xqxAzUwxugRkyo8rn3qnccTKNsaQE5y22pLzSqaKhAJzGVQQgk").entropy("f7d43d07a160320fd9d9e098bacd9842", source(THREAD$31, "MD5 of the colour, BFUB, three words about the Wattpad cover and the last seven characters of the block 49 key")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$31)],
	prize: .007,
	hints: [
		official("Question: Multiple choice a) blue b) green c) red d) yellow", THREAD$31, void 0, { answer: answer("Solution: blue BFUB key on cover", "https://www.wattpad.com/720895205-second-complete-quizchain") }),
		official("Format: [solution] TOMI [TOMI] [link]", THREAD$31),
		official("Change TOMI to BFUB when hashing.", "https://www.reddit.com/r/bitcoinpuzzles/comments/bel75n/comment/el6osaa/"),
		official("TOMI format is [word1 word2 word3], with all words lower case.", THREAD$31)
	],
	solvedAt: "2019-04-18 20:47:20",
	solveTime: 51087,
	transactions: [funding("1873629ecccf23b2d2cdd30bc337c925f818e6bc0e5c8424f96d1216022c5102", "2019-04-18 06:35:53", .007), claim("2e926ae9a83c36473d448ea7792aedf6bd621a09e31673a997bce114da548b7f", "2019-04-18 20:47:20", .00690418)]
});
const THREAD$30 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bexc8c/7_mbtc_quizchain_block_51/";
const quizchainBlock51 = puzzle({
	id: "quizchain/51",
	chain: "bitcoin",
	address: "17mRF1q6ws8tZQj93KiKHjWRiXL5uSczbB",
	sourceUrl: THREAD$30,
	startedAt: "2019-04-19 10:07:24",
	status: Status.Solved,
	pubkey: compressed("02b0e6451e82fe2452929b574af6a5f3e94fb8128cfcc8e79e6c540aa762ddcf64"),
	key: wif("L1ozkMNDweE1F3wMMYm4qXrkgnpQDRX1RVx29RHmb5mFDHLKwhQ1").entropy("a5138d23c4ac92919ed8194a6f2c775e", source(THREAD$30, "MD5 of the favorite block's answer, TOMI, three words and the last seven characters of the block 50 key")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$30)],
	prize: .007,
	hints: [
		official("Question: What is my favorite block?", THREAD$30, void 0, { answer: answer("Solution was block 21 with \"Second\" as a solution, and the TOMI field was \"title on cover\".", THREAD$30) }),
		official("[solution] is not number of block, but [solution] of that block. TOMI field is necessary to stop people from just brute forcing with all 50 solutions, which I assume to be in a script cracking list somewhere. It has the format [word1 word2 word3], with all words in lower case.", THREAD$30),
		official("Link is zGVQQgk for this one.", THREAD$30)
	],
	solvedAt: "2019-04-19 11:57:47",
	solveTime: 6623,
	transactions: [funding("04b6f17719284532b10c0e02d4589bf1062bd6865aac06303bf61f4b22c1bd38", "2019-04-19 10:07:24", .007), claim("090d778d874b0eb1a0bc097ab196ffcfb7ba5de9fb0d11a3538530a4734e0370", "2019-04-19 11:57:47", .00688851)]
});
const THREAD$29 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bexpni/7_mbtc_quizchain_block_52/";
const quizchainBlock52 = puzzle({
	id: "quizchain/52",
	chain: "bitcoin",
	address: "16LnoqUzQKzirZZHpLYAYgXKc8oxt4QcDh",
	sourceUrl: THREAD$29,
	startedAt: "2019-04-19 11:45:37",
	status: Status.Solved,
	pubkey: compressed("03c0bbe3141e477a24cc18934b58e381c14c6b0db4f0685993bd9880b1db5bd032"),
	key: wif("KzhD1fznCzyo1Y3x59QRuQ1x98xPH24YCGCsA5wAVZu7tY1ui6qG").entropy("f842deb0f23a320db6b7012cb4794c0f", source(THREAD$29, "MD5 of the six words, TOMI, the fixed text and the last seven characters of the block 51 key")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$29)],
	prize: .007,
	hints: [official("Question: Six three letter words. They need to be in the right order.", THREAD$29, void 0, { answer: answer("Solution was hat hot hit bat bot bit.", THREAD$29) }), official("Format: [solution] TOMI means wealth. I hope you find it. [link]", THREAD$29)],
	solvedAt: "2019-04-19 15:20:49",
	solveTime: 12912,
	transactions: [funding("7968863320ed12402fa6846da5a245c13b4ec08d9b97c16b484d026f44364dd3", "2019-04-19 11:45:37", .007), claim("744df89e81b0f21ab46f2123033476bb971c5e7604a3733739e9278b2cc0021c", "2019-04-19 15:20:49", .00677171)]
});
const THREAD$28 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bf6fya/7_mbtc_quizchain_block_53/";
const PLAYER_COMMENT$4 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bf6fya/comment/elcgmts/";
const AUTHOR_COMMENT$14 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bf6fya/comment/elcgsif/";
const quizchainBlock53 = puzzle({
	id: "quizchain/53",
	chain: "bitcoin",
	address: "1MtpindsWeZF4PT8haVzYjA47c7ucX2tv7",
	sourceUrl: THREAD$28,
	startedAt: "2019-04-20 12:47:04",
	status: Status.Solved,
	pubkey: compressed("034973a15c080b07d999514b69b54d23018e1e550b0e185675723e0829b95881e4"),
	key: wif("L5TB9H3gYAaFVqHgeiTjtfjmWiq8Jocfc2e3pHnKEskL5NRqEsd7").entropy("937b0cee7290377abc12c3050511b247", source(AUTHOR_COMMENT$14, "MD5 of the name and word, TOMI, the fixed text and the last seven characters of the block 52 key, as the author confirmed in the comments")).derived(),
	techniques: [technique("md5-to-bip39-entropy", AUTHOR_COMMENT$14)],
	prize: .007,
	hints: [
		official("Question: You are looking for one word and one name. The word is contained in the name.", THREAD$28, void 0, { answer: answer("Satoshi's stash TOMI I hope you like this block. Y1ui6qG", PLAYER_COMMENT$4) }),
		official("Format:  [solution] TOMI I hope you like this block. [link] [solution] is [name word], with the word lower case and the name in normal capitalization.", THREAD$28),
		official("Update: Just sent another 7 mbtc, this time to correct hash, first three digits are 937 LInk from block 52 is Y1ui6qG.", THREAD$28)
	],
	solvedAt: "2019-04-20 12:54:15",
	solveTime: 431,
	transactions: [funding("ba01e9c0de866749c6c4b94599aab1c8e4ddeded257ac1262c218dadc08c5a20", "2019-04-20 12:47:04", .007), claim("092b097ef871842f17ace72e701296d50bb5f64636641a38f711f93d2179355c", "2019-04-20 12:54:15", .00682182)]
});
const THREAD$27 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bfckvs/7_mbtc_quizchain_block_54_1_of_3/";
const SOLUTIONS$5 = "https://www.wattpad.com/720895205-second-complete-quizchain";
const quizchainBlock54 = puzzle({
	id: "quizchain/54",
	chain: "bitcoin",
	address: "1BeowfUYwrwqopnKzK36u4Birp2RGbfVDq",
	sourceUrl: THREAD$27,
	startedAt: "2019-04-20 14:34:50",
	status: Status.Solved,
	pubkey: compressed("02489f31f09e6037ef6a0d99d8e19417244856d3115d69b5e707f77b4e2c23dd8c"),
	key: wif("KyiauuxwBKgg8HVk9HZj7tTMWvudJ2aBMTrRrTVY5MC1f9iSUoC9").entropy("917ab0a81f2d6d1ede67cd324e96ed9e", source(SOLUTIONS$5, "MD5 of the four words, TOMI, the fixed text and the link the post set")).derived(),
	techniques: [technique("md5-to-bip39-entropy", SOLUTIONS$5)],
	prize: .007,
	hints: [
		official("Question: I am looking for 4 four letter words. Most relevant first. No words of dubious moral value in this list.", THREAD$27, void 0, { answer: answer("hint hunt bent bunt", SOLUTIONS$5) }),
		official("Format: [word1 word2 word3 word 4] TOMI Thank you for playing. NRqEsd7", THREAD$27),
		official("Another hint, this is same principle as block 52, only with an extra n, like hint instead of hit.", "https://www.reddit.com/r/bitcoinpuzzles/comments/bfckvs/comment/elh9r18/")
	],
	solvedAt: "2019-04-20 23:28:20",
	solveTime: 32010,
	transactions: [funding("7f76d80dcd6a1c80a9d5599d5fdfaa3c44f1463e09f286a0f5cfedd9692e2f43", "2019-04-20 14:34:50", .007), claim("8308f4aab13c15f9416fd62d765eebfbf46cb7c76399c8a8eb6293602594f9f2", "2019-04-20 23:28:20", .00681357)]
});
const THREAD$26 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bfinky/7_mbtc_quizchain_block_55_2_of_3/";
const quizchainBlock55 = puzzle({
	id: "quizchain/55",
	chain: "bitcoin",
	address: "1FJxZ12FN54q8tKkSpBxtefbsmT3F5Zhi1",
	sourceUrl: THREAD$26,
	startedAt: "2019-04-20 23:36:31",
	status: Status.Solved,
	pubkey: compressed("02cd94d11582c86a752ed3fad0898308375448db3b39098bdaf60a91649015617a"),
	key: wif("KzpmhuRUrZ2taXERxT5gAvXWGGXuKLku7yEokjMEBLvDP64bSJfY").entropy("93d69616a17017df42c9f9683e4c0365", source(THREAD$26, "MD5 of the word, the fixed text and the last seven characters of the block 54 key, without the TOMI the format asked for")),
	techniques: [technique("md5-to-bip39-entropy", THREAD$26)],
	prize: .007,
	hints: [
		official("Question: Do you know another four letter word?", THREAD$26, void 0, { answer: answer("Hoax TOMI No, not that kind of four letter word", "https://www.wattpad.com/720895205-second-complete-quizchain") }),
		official("Format: [solution] TOMI No, not that kind of four letter word. [link]", THREAD$26, void 0, { answer: answer("I somehow managed to drop the \"TOMI\" part, hashed with the string \"Hoax No, not that kind of four letter word. 9iSUoC9\".", THREAD$26) }),
		official("Link not provided, you need to solve 54 to get it.", THREAD$26)
	],
	solvedAt: "2019-04-21 00:42:47",
	solveTime: 3976,
	transactions: [funding("8d317963ba469c5002ef313303ece06b94f2833e4b460b6dcb03856ff200be68", "2019-04-20 23:36:31", .007), claim("e258d5f866ce4bc26e58b0bb15b4e9ad475c148e46ab229cb080ee2e2f529eed", "2019-04-21 00:42:47", .00681357)]
});
const THREAD$25 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bfiy4t/7_mbtc_quizchain_block_56_3_of_3/";
const quizchainBlock56 = puzzle({
	id: "quizchain/56",
	chain: "bitcoin",
	address: "1BzcsBweoKC8ZB41eDiY2zDtvWNf3Q6xvJ",
	sourceUrl: THREAD$25,
	startedAt: "2019-04-21 00:21:04",
	status: Status.Solved,
	pubkey: compressed("02d9a0c7769732c020a5da98e448051d3a12c40c40bc08aa96365f8fad0761f04a"),
	key: wif("L3BkpFux81BLe6kVmEbN1yDXy9sgvhv5epRmWYCtQ5USBBJRNw7D").entropy("780d592202605d081a555fed50c1e97f", source(THREAD$25, "MD5 of the answer and TOMI field with the word link the author owned up to and the last seven characters of the block 55 key")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$25)],
	prize: .007,
	hints: [
		official("Question: AOI Second", THREAD$25, void 0, { answer: answer("Solution to this was AOH, with TOMI field I after H. So I should have hashed with \"AOH TOMI I after H 64bSJfY\" but actually hashed with \"AOH TOMI I after H *link* 64bSJfY\".", THREAD$25) }),
		official("Format: [Solution] TOMI [TOMI] [link]", THREAD$25),
		official("Use 64bSJfY as a link for this block.", "https://www.reddit.com/r/bitcoinpuzzles/comments/bfiy4t/comment/empn3qq/"),
		official("Three items in TOMI field are two capital letters and one word.", "https://www.reddit.com/r/bitcoinpuzzles/comments/bfiy4t/comment/emyrtue/")
	],
	solvedAt: "2019-05-10 09:31:17",
	solveTime: 1674613,
	transactions: [funding("90c21e7ee612a05ca5356c7bbc0152c9321c5236be69d2af8c278e2a328eeb08", "2019-04-21 00:21:04", .007), claim("faf8572c26895a65c1a2100ec9127ccabe5e7b82c615bb66ba09bfacddd3c509", "2019-05-10 09:31:17", .00682374)]
});
const THREAD$24 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bfkdut/extremely_hard_7mbtc_quizchain_block_57/";
const quizchainBlock57 = puzzle({
	id: "quizchain/57",
	chain: "bitcoin",
	address: "19Zrd7KSgGxcLuuQtSq3KLQbHSma6QH2F7",
	sourceUrl: THREAD$24,
	startedAt: "2019-04-21 02:48:31",
	status: Status.Solved,
	pubkey: compressed("03d96a433ffc78fb4f9bc0267046c5d13a0979237d72c48d9605439d78d82251ff"),
	key: wif("KzdsnGKmDEWDqLeG7SwYrS4cuJryU2fR2HRGjen4vozFMPojFPus").entropy("100d2c8de86057a051aef72bf5150452", source(THREAD$24, "MD5 of the two letters, TOMI, three words and the link the post set")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$24)],
	prize: .007,
	hints: [
		official("Question: I am looking for conclusive proof that someone named Craig (I am not telling you which one, don't want to be sued by the dude) is Satoshi.", THREAD$24, void 0, { answer: answer("Solution was \"AI\" and TOMI was \"in both names\".", THREAD$24) }),
		official("[solution] format is two capital letters. TOMI format is [word1 word2 word3], all words in lower case and no period at the end.", THREAD$24),
		official("Link from block 56 is BJRNw7D.", THREAD$24)
	],
	solvedAt: "2019-04-21 11:34:34",
	solveTime: 31563,
	transactions: [funding("e5281359285fe1d272fbd7c0b152ee086373e8860a5a94dd47e0fafd577e1652", "2019-04-21 02:48:31", .007), claim("76fe64af6d7820ba20e9547213d95d132c1b435f75082fdf630197a73373b9d0", "2019-04-21 11:34:34", .00688096)]
});
const THREAD$23 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bfz0oy/7_mbtc_quizchain_block_58/";
const quizchainBlock58 = puzzle({
	id: "quizchain/58",
	chain: "bitcoin",
	address: "1J6ymES7FTdNGpPbMEyTVYSA53Pz8poqRy",
	sourceUrl: THREAD$23,
	startedAt: "2019-04-22 07:03:25",
	status: Status.Solved,
	pubkey: compressed("03a33f720033bf71b94a65949935e2f3538e9b0ee193e79f70eaaca4ec40b63e29"),
	key: wif("KxgvXT1LidEhei6XizyCpR5zgPbALFYYxT6R1tANmSgPKZeuhs51").entropy("1ebac638d0c815fc68f605377cd87eac", source(THREAD$23, "MD5 of the word, TOMI, the cipher and the link the post set")),
	techniques: [technique("md5-to-bip39-entropy", THREAD$23), technique("atbash", THREAD$23)],
	prize: .007,
	hints: [
		official("Question: You all know this three letter word.", THREAD$23, void 0, { answer: answer("The three letter word in the question was \"all\", using the Atbash on that gives \"zoo\".", THREAD$23) }),
		official("[TOMI] is the name of the method used to get it, one word in upper case (only first letter capital).", THREAD$23, void 0, { answer: answer("And since TOMI is the method, the word \"Atbash\" goes there.", THREAD$23) }),
		official("Link is set to PojFPus for this block.", THREAD$23)
	],
	solvedAt: "2019-04-22 07:36:37",
	solveTime: 1992,
	transactions: [funding("211bdc4d57fc154d6623ba6d0a63cfd65bdc9aedcafd9d84c5e465879aac7d5e", "2019-04-22 07:03:25", .007), claim("f319cce9eb0914c32873b3cf7decf57bc1f21e23a191e77e5c73f14b09fe4127", "2019-04-22 07:36:37", .00682931)]
});
const THREAD$22 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bg96js/7_mbtc_quizchain_block_59/";
const quizchainBlock59 = puzzle({
	id: "quizchain/59",
	chain: "bitcoin",
	address: "1LFwAti63u7rxoEveRQnPkGtU8PHW6YxHY",
	sourceUrl: THREAD$22,
	startedAt: "2019-04-22 23:41:53",
	status: Status.Solved,
	pubkey: compressed("02a76d303c939f451d0734107e8241ff4d1a618b9cebe59c8c566201e004aba2b1"),
	key: wif("Kxh2nag7eeF57q7hcNqbJxFvreXbh3kfTid4jJCzbDsp7kS5ehsq").entropy("3a3973f56c25533ba50a18aec75142fc", source(THREAD$22, "MD5 of the god, TOMI, the last seven characters of the block 58 key and that whole key")),
	techniques: [technique("md5-to-bip39-entropy", THREAD$22)],
	prize: .007,
	hints: [
		official("Question: God", THREAD$22, void 0, { answer: answer("Note the last seven digits. They start almost with the name of Zeus, one of the Greek gods.", THREAD$22) }),
		official("Link is complete private key of last block for this one, not only last seven digits.", THREAD$22, void 0, { answer: answer("And TOMI for this was just these seven digits.", THREAD$22) }),
		official("One item, but not necessarily a word...", "https://www.reddit.com/r/bitcoinpuzzles/comments/bg96js/comment/eljqp8n/")
	],
	solvedAt: "2019-04-23 04:03:54",
	solveTime: 15721,
	transactions: [funding("cc03863deb7b84cb929a2ba596a58649fc81ae9ba7a67d135b209fca765f4581", "2019-04-22 23:41:53", .007), claim("cbd4afe89ed5da1c7d0f8a979892a814382f64d5ffdad5f0784dc36db5b43ae8", "2019-04-23 04:03:54", .0069)]
});
const THREAD$21 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bafyoo/hard_7_mbtc_quizchain_block_6/";
const quizchainBlock6 = puzzle({
	id: "quizchain/6",
	chain: "bitcoin",
	address: "1FNJM8cABfhCEgVGKneVT8dnhaFaNw85AB",
	sourceUrl: THREAD$21,
	startedAt: "2019-04-07 16:18:11",
	status: Status.Solved,
	pubkey: compressed("03df2f84cb1a3f49cfdab70808b73626e687802ce33f712e8d7781512e02c776fd"),
	key: wif("L2Z1rzCuFPhH9HBkKjHhBhQw3YULpnGTwWjvVJAf2m2AvhDciMQz").entropy("8d00e61b8c3ee3e8dbf990c104f1e719be79e76ec8466b8278828e0e42285a95", source(THREAD$21, "SHA-256 of the author's two words, a space and the last three characters of the block 5 key")).derived(),
	techniques: [technique("sha256-to-bip39-entropy", THREAD$21)],
	prize: .007,
	hints: [
		official("Do you know another two words?", THREAD$21, void 0, { answer: answer("The two words I was looking for were \"Thank you\". Please note that these two words are the first in all blocks from 7 on, so I actually got away with disclosing the answer right in the next block question.", THREAD$21) }),
		official("The two words need to be input in normal capitalization and a space between them. And there should be a space between the second word and the last three digits of the private key for block 5.", THREAD$21),
		official("Here are the last three digits of the private key, so I can move on to block 7. They are MQz.", THREAD$21)
	],
	solvedAt: "2019-04-08 11:26:31",
	solveTime: 68900,
	transactions: [funding("d3a9586c10e17a858e923e9249884f019de95a3130ce052f20d9622ef0eb6c5f", "2019-04-07 16:18:11", .007), claim("f7d3842301a540592b323983c4531666e4f0e3ba3e7ca810a2f2f2c16b83a545", "2019-04-08 11:26:31", .00666438)]
});
const THREAD$20 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bgboz8/7_mbtc_blockchain_block_60/";
const quizchainBlock60 = puzzle({
	id: "quizchain/60",
	chain: "bitcoin",
	address: "1LDUFfbWmgU2ht11mr8kpPDHiQ4JktqaeQ",
	sourceUrl: THREAD$20,
	startedAt: "2019-04-23 01:33:59",
	status: Status.Solved,
	pubkey: compressed("038a92cf0f4c4c1ceb88f27a931dc1ce520bdcdb862500aef85cf6ad23d7676eb1"),
	key: wif("KxWFLHnTW1KHkNhMLSdMHSANLEGvQXXrtYqESzcXjmLQg8x2NiaJ").entropy("afd904892b11ba42a5174297f1b617a4", source(THREAD$20, "MD5 of the name, TOMI, six words and the whole block 59 key")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$20)],
	prize: .007,
	hints: [
		official("Question: Satoshi's real identity (don't tell anyone if you found it).", THREAD$20, void 0, { answer: answer("Tom Marvolo Riddle TOMI He who must not be named. [link].", THREAD$20) }),
		official("Format for [TOMI] is six words, normal capitalization, no period at end.", THREAD$20),
		official("Format for [link] is complete private key from previous block (59), not only last seven digits.", THREAD$20)
	],
	solvedAt: "2019-04-23 13:44:55",
	solveTime: 43856,
	transactions: [funding("493102053f9ade8f282b15f5dfdc9cad99e3203e986dd96236dcd72e7b9ec5cb", "2019-04-23 01:33:59", .007), claim("b7d805e76459cf1ec3b937a7e5a55f13cbcf9343c7c95080143e37d37e44231d", "2019-04-23 13:44:55", .0065)]
});
const THREAD$19 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bgg9mx/7_mbtc_quizchain_block_61/";
const quizchainBlock61 = puzzle({
	id: "quizchain/61",
	chain: "bitcoin",
	address: "17uboXEVcgijMjNZ4ZjRnhwWLot1ic3xHj",
	sourceUrl: THREAD$19,
	startedAt: "2019-04-23 13:43:50",
	status: Status.Solved,
	pubkey: compressed("02ce632d4c86b18c58bc448a491b3432e616a415489b3ebe6494893181acf365f9"),
	key: wif("L5YFWxwM8knMBxcbAEH1yz5YYqNrRbr87syTDvNC1Zk41TcyacQf").entropy("13656367029a4fd1b32e12dfc657ec49", source(THREAD$19, "MD5 of the word, TOMI, the cipher and the seven characters the post gave, which end the block 59 key")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$19), technique("atbash", THREAD$19)],
	prize: .007,
	hints: [
		official("Question: Beautiful four letter word.", THREAD$19, void 0, { answer: answer("Solution was Love, since that word can be made from two Atbash pairs, LO and EV.", THREAD$19) }),
		official("Use kS5ehsq (last 7 digits of block 60 private key) for link. Use Atbash as TOMI string.", THREAD$19),
		official("Solution word is capital letter first letter only.", THREAD$19)
	],
	solvedAt: "2019-04-23 13:43:50",
	solveTime: 0,
	transactions: [funding("45e038c49566d07b0f730b1d1ca584a81db5006236e13bccb2b9354278c6e2c1", "2019-04-23 13:43:50", .007), claim("8be39de55bc56fa12a9fc626d48cb5a5e7ab5c57930c8e8eb4d1bcc49dde9d65", "2019-04-23 13:43:50", .00680544)]
});
const THREAD$18 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bgo23n/7_mbtc_quizchain_block_62/";
const quizchainBlock62 = puzzle({
	id: "quizchain/62",
	chain: "bitcoin",
	address: "1Apq1oxG8njoK2opp1PWBxWghc1TnQWnEq",
	sourceUrl: THREAD$18,
	startedAt: "2019-04-24 00:39:38",
	status: Status.Solved,
	pubkey: compressed("038ed73c809d225015190102a080affcbc917ecc325319dca16af8c7ca298f08ba"),
	key: wif("L4GWDy9Ld3ZydGCtFaHaaDEJe4YL5hAiSLsLgGzdEVQkNWgZUqu3").entropy("ddd06ba8a5eebb2988a97be8d0b5b7c6", source(THREAD$18, "MD5 of the word, TOMI, the cipher and the whole block 61 key")),
	techniques: [technique("md5-to-bip39-entropy", THREAD$18), technique("atbash", THREAD$18)],
	prize: .007,
	hints: [
		official("Question: Six letter word.", THREAD$18, void 0, { answer: answer("The hint to the Wattpad story was relevant because of the word I was looking for was wizard. But the TOMI field was exactly the same as in block 61.", THREAD$18) }),
		official("Word in solution is lower case. [link] is whole private key for block 61, not only last 7 digits.", THREAD$18),
		official("Hint for this is available in the update to the Wattpad story, chapter one.", THREAD$18)
	],
	solvedAt: "2019-04-24 02:58:53",
	solveTime: 8355,
	transactions: [funding("bec82669a5db4127581aee1639c0f0fbb0d37598b5d04207b4006c19f71490a2", "2019-04-24 00:39:38", .007), claim("970e5246c570aec25e153ccc3853478809c04f636bd6ed00706a7447a6e8d327", "2019-04-24 02:58:53", .00671424)]
});
const THREAD$17 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bgqkw5/7_mbtc_quizchain_block_63/";
const WELCOME = "https://www.wattpad.com/717956015-second-welcome-to-the-quizchain";
const quizchainBlock63 = puzzle({
	id: "quizchain/63",
	chain: "bitcoin",
	address: "1Q92bSL9p69qBf3QP4W9AgHgXGmB2AvTcP",
	sourceUrl: THREAD$17,
	startedAt: "2019-04-24 04:59:50",
	status: Status.Solved,
	pubkey: compressed("038f7ec4183ff0afcf5295b08399d51a4ce3c3bae89bfb58d62826aaff7a15356e"),
	key: wif("KwSUuGPC1wtLLDarpbeQaJhKnii848czbfbxXnGiwwND5ko6B5GS").entropy("888b04c435e075e5c6044a2bd97f46de", source(WELCOME, "MD5 of the full string the author's Wattpad chapter prints: the form of address, TOMI, the fixed text and the whole block 62 key")).derived(),
	techniques: [technique("md5-to-bip39-entropy", WELCOME)],
	prize: .007,
	hints: [
		official("How should I call you, darling?", THREAD$17, void 0, { answer: answer("The Rt Hon Alistair Darling MP TOMI If you don't get this, sorry, it is hard L4GWDy9Ld3ZydGCtFaHaaDEJe4YL5hAiSLsLgGzdEVQkNWgZUqu3", WELCOME) }),
		official("Format: [solution] TOMI If you don't get this, sorry, it is hard [link]", THREAD$17),
		official("Link is all digits of private key for block 62, which starts with L4G and ends in qe3.", THREAD$17),
		official("Update: Block 62 private key ends with qu3, not qe3.", THREAD$17)
	],
	solvedAt: "2019-04-24 13:34:26",
	solveTime: 30876,
	transactions: [funding("34df681625c66a690d44e527ec8d0f96ec700f98b3105caa516d29217cd56a0e", "2019-04-24 04:59:50", .007), claim("96d7e94ef2d02c9fbd6d2cc71da384a50dd046890f3aa2881362aed4a9bfbb4b", "2019-04-24 13:34:26", .00671272)]
});
const THREAD$16 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bh52id/7_mbtc_quizchain_block_64/";
const SOLUTIONS$3 = "https://www.wattpad.com/720895205-second-complete-quizchain";
const quizchainBlock64 = puzzle({
	id: "quizchain/64",
	chain: "bitcoin",
	address: "15odDESGAo53neU94hqYfxwTWTBLYmykz2",
	sourceUrl: THREAD$16,
	startedAt: "2019-04-25 05:39:37",
	status: Status.Solved,
	pubkey: compressed("03cf09c2de8371c27a9faec51634842212c9f0cf136d6a7612903de83c09cd6d22"),
	key: wif("L565NraUtwZkJfjMwv8Zi58fSfMe6J8jhUYbVvKY6FPKLjod36og").entropy("a1a274aed106c77c4105af798da54926", source(THREAD$16, "MD5 of the letter, TOMI, the cipher, the number and the whole block 63 key")),
	techniques: [technique("md5-to-bip39-entropy", THREAD$16), technique("atbash", SOLUTIONS$3)],
	prize: .007,
	hints: [
		official("Question: Looking for one capital letter out of two.", THREAD$16, void 0, { answer: answer("Y TOMI Atbash 2", SOLUTIONS$3) }),
		official("Link is all digits of private key for block 63 (Darling).", THREAD$16),
		official("As a general rule, looking at the methods used in recent blocks often leads to success...", "https://www.reddit.com/r/bitcoinpuzzles/comments/bh52id/comment/elthvrq/")
	],
	solvedAt: "2019-04-26 09:39:46",
	solveTime: 100809,
	transactions: [funding("1052a5cd45f54cdb6d3533650fbcaae1f259ee02101406fa3c617de440c784ac", "2019-04-25 05:39:37", .007), claim("0deb15a5856b8f6a66a515831f3f2dc91cc0237e403a0fc2f511aa3ae786f402", "2019-04-26 09:39:46", .00669587)]
});
const THREAD$15 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bhloyj/1_of_3_7_mbtc_quizchain_block_65/";
const quizchainBlock65 = puzzle({
	id: "quizchain/65",
	chain: "bitcoin",
	address: "1PGv1YpL4zJMZHoXSUcNurjen5uitW6oHd",
	sourceUrl: THREAD$15,
	startedAt: "2019-04-26 12:21:11",
	status: Status.Solved,
	pubkey: compressed("027375e70bb6b999527f211fb8d5ad69cc5e318eff703234bddc23210c2185461a"),
	key: wif("L1uF3U83zfBKJ6v3fV7fdFZCuhu39HcmncLJ7L2Ktokjjxdes9A7").entropy("be90557b2ec9548b1fa31a3611021f06", source(THREAD$15, "MD5 of the time, TOMI, the three words and the whole block 64 key")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$15)],
	prize: .007,
	hints: [
		official("Question: I am looking for the time of the day.", THREAD$15, void 0, { answer: answer("Solution was found in the timestamp of \"blockchain block 65\", which was 21:55:03, and the TOMI field was what I just put in quotation marks.", THREAD$15) }),
		official("Format: [solution] TOMI [word1 word2 number] [link]", THREAD$15),
		official("Format for solution is like this: For example for half past six pm time: 18:30:27, last two digits are seconds.", THREAD$15),
		official("Full private key of block 64, L565NraUtwZkJfjMwv8Zi58fSfMe6J8jhUYbVvKY6FPKLjod36og.", "https://www.reddit.com/r/bitcoinpuzzles/comments/bhloyj/comment/eltqjv0/")
	],
	solvedAt: "2019-04-26 13:42:26",
	solveTime: 4875,
	transactions: [funding("baead4a5bd4b19725c4f9795fc805d851e44a0dd914572f60d99d7d987171d6a", "2019-04-26 12:21:11", .007), claim("3164cad3e09c37fdcae76a946294da8e37b3c7860a3b36a0c500eb221ed66825", "2019-04-26 13:42:26", .00680646)]
});
const THREAD$14 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bhlpm2/2_of_3_7_mbtc_quizchain_block_66/";
const quizchainBlock66 = puzzle({
	id: "quizchain/66",
	chain: "bitcoin",
	address: "1NrRE3MtTWM91VsoRv8CKF7doSee35oMUE",
	sourceUrl: THREAD$14,
	startedAt: "2019-04-26 12:21:11",
	status: Status.Solved,
	pubkey: compressed("03569bfa4099a7d8faafbe140c1947741ef1bb1a4abb4b37d3b37b07dae48b4e37"),
	key: wif("L3Ame7sfViKWacDRNr3SeNcTaFFKfRtWGUD74NWMLSR6AobdHGYZ").entropy("e2f1619d48bc35d774b819d0b4985b3e", source(THREAD$14, "MD5 of the answer, TOMI, the text of the tweet and the whole block 65 key")),
	techniques: [technique("md5-to-bip39-entropy", THREAD$14)],
	prize: .007,
	hints: [official("Question: Multiple choice. a) Second b) SECOND", THREAD$14, void 0, { answer: answer("SECOND", "https://www.wattpad.com/720895205-second-complete-quizchain") }), official("TOMI is unknown until the Tweet tomorrow. It is the full text of that Tweet. And [link] is the full private key of the previous block 65.", THREAD$14, void 0, { answer: answer("Update: TOMI field for this is \"The race starts now\" (with no quotation marks).", THREAD$14) })],
	solvedAt: "2019-04-27 01:21:32",
	solveTime: 46821,
	transactions: [funding("f59be34b9e33f19fdbfaad2fbd9e10a7d89e873b641168fcc7fe8ef0b8da1e86", "2019-04-26 12:21:11", .007), claim("7767019760c68cbd667e3255586cb600f9abee6dfb32b049d28e7f45c003c987", "2019-04-27 01:21:32", .00673677)]
});
const THREAD$13 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bhlq2i/3_of_3_67_mbtc_quizchain_block_67/";
const SOLUTIONS$1 = "https://www.wattpad.com/720895205-second-complete-quizchain";
const quizchainBlock67 = puzzle({
	id: "quizchain/67",
	chain: "bitcoin",
	address: "1KPY8mFdyCyBVxmzpCgkgLJvtosJnDUQ2G",
	sourceUrl: THREAD$13,
	startedAt: "2019-04-26 12:21:11",
	status: Status.Solved,
	pubkey: compressed("03963a4a783e0fba5b6561c4d45fd54833f9ee4f5b56ac46af84db6d875695d9a4"),
	key: wif("L5KYypSnFznkzqotEVAWTaMvhDXjAqYYejKF8pDw8TgtGEx1mxfe").entropy("37a8385ca320b50afc0b35a731a973dc", source(THREAD$13, "MD5 of the three words, TOMI, the fixed text and the whole block 66 key")),
	techniques: [technique("md5-to-bip39-entropy", THREAD$13), technique("atbash", SOLUTIONS$1)],
	prize: .067,
	hints: [
		official("Question: Why Nakamoto?", THREAD$13, void 0, { answer: answer("The solution was \"Atbash Middle Origin\".", SOLUTIONS$1) }),
		official("Format: [solution] TOMI Try your best shot first [link]", THREAD$13),
		official("[solution] is three words, all upper case, in alphabetical order.", THREAD$13),
		official("In contrast, with Upper Case as in this question I want only the first letter as capital letter, so it would be Example, not EXAMPLE.", "https://www.reddit.com/r/bitcoinpuzzles/comments/bhlq2i/comment/elvz263/"),
		official("It is now and the private key (which goes into link for this block) is L3Ame7sfViKWacDRNr3SeNcTaFFKfRtWGUD74NWMLSR6AobdHGYZ.", "https://www.reddit.com/r/bitcoinpuzzles/comments/bhlq2i/comment/elvthea/")
	],
	solvedAt: "2019-04-27 03:22:19",
	solveTime: 54068,
	transactions: [funding("b44b67cb5fc4d61a9ba3c9be10313f48e1dafcbee24b2353564637829a908180", "2019-04-26 12:21:11", .067), claim("8eb19633fdc7f7bfbd634954a8dbd40af53d27925dcd50c45d94a8d96383edbe", "2019-04-27 03:22:19", .06673951)]
});
const THREAD$12 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bi593l/7_mbtc_quizchain_block_68/";
const quizchainBlock68 = puzzle({
	id: "quizchain/68",
	chain: "bitcoin",
	address: "1N4ELRkHz1VvPPvLTFCvrimB5Bpc5GeMgC",
	sourceUrl: THREAD$12,
	startedAt: "2019-04-28 00:19:15",
	status: Status.Solved,
	pubkey: compressed("0356cb142522e26c2d8f2c354ca731bc1b7a18682abf2f65e2983f8a5956c070da"),
	key: wif("L3sNURL6cGcUznFx8ZKtoJwpZWgpRmXP9PMmxTY3nktuUqbaVxgs").entropy("a1b5c2d55a62b2d46dc997fbeda97dd1", source(THREAD$12, "MD5 of the ten characters after the first p of the block 67 key, TOMI, the fixed text and that whole key")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$12)],
	prize: .007,
	hints: [
		official("Question: Looking for a 10 digit password.", THREAD$12, void 0, { answer: answer("For one, I did not take any 10 digits, but the 10 following the first \"p\" in the private key, with the \"p\" standing for \"password\" in my mind.", THREAD$12) }),
		official("Format: [solution] TOMI Will use puzzle by Satoshi for block 77 [link]", THREAD$12, void 0, { answer: answer("SnFznkzqot TOMI Will use puzzle by Satoshi for block 77 L5KYypSnFznkzqotEVAWTaMvhDXjAqYYejKF8pDw8TgtGEx1mxfe", "https://www.reddit.com/r/bitcoinpuzzles/comments/bi593l/comment/elyaozh/") }),
		official("Link is full private key from previous block 67 (Why Nakamoto?).", THREAD$12)
	],
	solvedAt: "2019-04-28 01:21:18",
	solveTime: 3723,
	transactions: [funding("46ea894ed585d5756c73c0b7b5ca144cc2c24c5aa876adc5a9ecea51a160bea8", "2019-04-28 00:19:15", .007), claim("fea9786b2da5f441bb7a005a99f6d045d87b08b7042d344ba2ddff042a418761", "2019-04-28 01:21:18", .00692818)]
});
const THREAD$11 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bi6n0l/7_mbtc_quizchain_block_69/";
const quizchainBlock69 = puzzle({
	id: "quizchain/69",
	chain: "bitcoin",
	address: "1FLmbVXZ7nZX9acH9dCt9XFgZprsPtJShn",
	sourceUrl: THREAD$11,
	startedAt: "2019-04-28 02:35:05",
	status: Status.Solved,
	pubkey: compressed("03ecc84ff6a3dfca65989abc5ab404508d6d43e349be1c2b118ad2adf5720fbfee"),
	key: wif("L38bpdbA3NMfgFJuewu3DjCc7kK8w4rpXDQ9hA53GhHyCKYvmtGA").entropy("fdc955d9312a542d589c644dfae9af0a", source(THREAD$11, "MD5 of the two letters, TOMI, two words and the whole block 68 key")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$11)],
	prize: .007,
	hints: [
		official("Question: Upside down.", THREAD$11, void 0, { answer: answer("Solution was WM and TOMI was \"When them\", which were the first and last words in the second sentence above.", THREAD$11) }),
		official("Format of TOMI is [word1 word2] with capitalization obvious from the solution method.", THREAD$11),
		official("What if solution is two capital letters? When will you find the TOMI for that?", "https://www.reddit.com/r/bitcoinpuzzles/comments/bi6n0l/comment/em1zwhr/")
	],
	solvedAt: "2019-04-29 15:24:23",
	solveTime: 132558,
	transactions: [funding("06410fde10b6d144b429f6b19c793db00e9a5c5cc4909c6f73e0009f860f5183", "2019-04-28 02:35:05", .007), claim("48d5358a5b529e9c5710d39282f69a4d2ed8188493a2d5d92d1b91c2492c4007", "2019-04-29 15:24:23", .00686022)]
});
const THREAD$10 = "https://www.reddit.com/r/bitcoinpuzzles/comments/baok2v/medium_77_mbtc_quizchain_block_lucky_7/";
const quizchainBlock7 = puzzle({
	id: "quizchain/7",
	chain: "bitcoin",
	address: "1J7t9vhfXchLM58Ms2U4WrfRHmLU75hYZV",
	sourceUrl: THREAD$10,
	startedAt: "2019-04-08 02:50:59",
	status: Status.Solved,
	pubkey: compressed("02f74aee052f5adb58c5715d033b9b4d69d95e21a067f4b0e8e34a1acb0dd5141a"),
	key: wif("L14NcSSbGBZBs5i1FrasxWWBgUWEx6SmBaujCYF4gMZfxCZP6LbF").entropy("2c42845a53de06199d986dc725c87877cfe210b75fce8aeabcdeea583bf2a435", source(THREAD$10, "SHA-256 of the author's solution with the last three characters of the block 6 key appended")).derived(),
	techniques: [technique("sha256-to-bip39-entropy", THREAD$10)],
	prize: .077,
	hints: [
		official("Of course as always append also the last three digits of the private key for block 6.", THREAD$10, void 0, { answer: answer("Here are the last three digits of the private key, so I can move on to block 7. They are MQz.", "https://www.reddit.com/r/bitcoinpuzzles/comments/bafyoo/hard_7_mbtc_quizchain_block_6/") }),
		official("Four words and a period at the end.", THREAD$10),
		official("Second clue. My handle name is Aoi Nakamoto.", THREAD$10),
		official("Third and last clue: Why did I choose that handle name?", THREAD$10, void 0, { answer: answer("Someone has claimed the prize. Solution was \"Satoshi without the consonants.\" Congrats to the winner of this special block.", THREAD$10) })
	],
	solvedAt: "2019-04-08 17:21:46",
	solveTime: 52247,
	transactions: [funding("a5b21d650ca89744226179c88f847373a51fdd121e7583ce81693799381d5502", "2019-04-08 02:50:59", .077), claim("0d51c720e76f4cdcd4f816317d7eec859891b6d419580c1c8009b310647bfc03", "2019-04-08 17:21:46", .07699)]
});
const THREAD$9 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bilvsq/7_mbtc_quizchain_block_70/";
const quizchainBlock70 = puzzle({
	id: "quizchain/70",
	chain: "bitcoin",
	address: "14q5gN69NHBKptffrrmxhST2qjGZCB3i8T",
	sourceUrl: THREAD$9,
	startedAt: "2019-04-29 05:33:32",
	status: Status.Solved,
	pubkey: compressed("03cf1f333e1e7df422613456c8f16f7861bb92222c11a0346241eb14743437cbf0"),
	key: wif("KzeCckbvmKAWs1JvDqX9VHKWETNyNwUZYCQY6Pvyv7BoUj8MCe6c").entropy("a945917b956796976029e198881b3d68", source(THREAD$9, "MD5 of the address, TOMI, the fixed text and the whole block 69 key")),
	techniques: [technique("md5-to-bip39-entropy", THREAD$9)],
	prize: .007,
	hints: [
		official("Question: Looking for yet another Bitcoin address.", THREAD$9, void 0, { answer: answer("As already explained in comments, solution was the coinbase funding address of the other chain block 70.", THREAD$9) }),
		official("Format: [solution] TOMI Anyone find Satoshi's puzzle yet? [link]", THREAD$9, void 0, { answer: answer("Solution is address 1NnYa2jL24hLgXBbk3TAXHANUQEzXNnSHg which is the address of Block #70 on the Bitcoin blockchain", "https://www.reddit.com/r/bitcoinpuzzles/comments/bilvsq/comment/em2p40p/") }),
		official("Link is the full private key from block 69.", THREAD$9)
	],
	solvedAt: "2019-04-29 17:15:52",
	solveTime: 42140,
	transactions: [funding("c33b1d66b1af5a7352408d67746d0f39e229bc87945d0794f2b4b2a6fe9cb6aa", "2019-04-29 05:33:32", .007), claim("f75c63691c6f44b4938f0bfc49f873eb83068d7f519d3ac70e3e5565e31158a7", "2019-04-29 17:15:52", .00690669)]
});
const THREAD$8 = "https://www.reddit.com/r/bitcoinpuzzles/comments/biww11/8mbtc_quizchain_block_71/";
const quizchainBlock71 = puzzle({
	id: "quizchain/71",
	chain: "bitcoin",
	address: "1C5P5dfq4nWqhcRDkSCWJKy3S1YzmdyK7U",
	sourceUrl: THREAD$8,
	startedAt: "2019-04-30 00:33:12",
	status: Status.Solved,
	pubkey: compressed("037a6dbafdd95c8761d0a73ed433048d9b0b63f9e4b095700445a909ebadecf15e"),
	key: wif("KxQGi7WXnWzG33SKK288AWmCc3LBC2V86ts2ZG4ESH8c6xPvBo8h").entropy("d6afff13ce667d4ad13d0c3899b8cbeb", source(THREAD$8, "MD5 of the password, TOMI, the wizard and the whole block 70 key")),
	techniques: [technique("md5-to-bip39-entropy", THREAD$8)],
	prize: .008,
	hints: [
		official("Question: merry idea", THREAD$8, void 0, { answer: answer("The solution was \"Mellon TOMI Gandalf\".", "https://www.wattpad.com/720895205-second-complete-quizchain") }),
		official("Format [solution] TOMI [TOMI] [link]", THREAD$8),
		official("Hint for TOMI field live now at Twitter feed. It is grey", "https://www.reddit.com/r/bitcoinpuzzles/comments/biww11/comment/em4v010/")
	],
	solvedAt: "2019-04-30 14:39:39",
	solveTime: 50787,
	transactions: [funding("4a75013a72e9dff0fa376abd16b818dd51a80a1e071914da9e7e1765feba862e", "2019-04-30 00:33:12", .008), claim("998f865c2e2dea414246fe1e6fa1cbf58099542fde565be44b835844cba7bc05", "2019-04-30 14:39:39", .00788115)]
});
const THREAD$7 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bj25fm/9_mbtc_quizchain_block_72/";
const quizchainBlock72 = puzzle({
	id: "quizchain/72",
	chain: "bitcoin",
	address: "1HYrKjBry5X252RWgeiijEg4hAsyn7Ya6a",
	sourceUrl: THREAD$7,
	startedAt: "2019-04-30 12:05:28",
	status: Status.Solved,
	pubkey: compressed("03ac1881927c1e795bd90bc0d2602404af39a771c9bef6ba786f22b37a442cdf25"),
	key: wif("L1NvACvyh4cNS5mTM4k8PnJphdBcdBWrU1EzcPZttaj9UHWD2xAT").entropy("a500b37a9661d9e7956773516edc22ba", source(THREAD$7, "MD5 of the word, TOMI, three words and the whole block 71 key")),
	techniques: [technique("md5-to-bip39-entropy", THREAD$7)],
	prize: .009,
	hints: [
		official("Question: After the block", THREAD$7, void 0, { answer: answer("Solution was \"clock\", TOMI was \"c after b\" to indicate that only one letter is replaced with the one after it in the alphabet.", THREAD$7) }),
		official("Hint live now at Twitter feed. It is 3145", "https://www.reddit.com/r/bitcoinpuzzles/comments/bj25fm/comment/em9o86o/"),
		official("This is hint at the solution method, which is similar to blocks 31 and 45. TOMI field has three elements, one of them also in the question.", "https://www.reddit.com/r/bitcoinpuzzles/comments/bj25fm/comment/emb6oc1/")
	],
	solvedAt: "2019-05-02 13:10:46",
	solveTime: 176718,
	transactions: [funding("eb82b68f72db273bc7cd5b814f706d6367b6f55342151b62c65a97819d41a029", "2019-04-30 12:05:28", .009), claim("09a9bbc65c488af07f68bebf6bd62c052b7e92b8a966dcc8efba0f76f45e9138", "2019-05-02 13:10:46", .00890796)]
});
const THREAD$6 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bjezpd/10_mbtc_quizchain_block_73/";
const quizchainBlock73 = puzzle({
	id: "quizchain/73",
	chain: "bitcoin",
	address: "1FcQC5gHcSwaEYTV1C8t73gpBhv31WYPpt",
	sourceUrl: THREAD$6,
	startedAt: "2019-05-01 09:20:30",
	status: Status.Solved,
	pubkey: compressed("0394cd7d8b27d84fd3e0a1a14cd6cf342d6eacbedecf9cfb421fe5204200c8dec1"),
	key: wif("L4WrP5D7aDHDqhbrGZBqiXpae5jcLQbsahrM9oWHndz7XYVTuax5").entropy("7debf7813cdfd613cdab9e619a8fe14a", source(THREAD$6, "MD5 of the number, TOMI, the name and the whole block 72 key")),
	techniques: [technique("md5-to-bip39-entropy", THREAD$6)],
	prize: .01,
	hints: [
		official("Question: Looking for a 10 digit number.", THREAD$6, void 0, { answer: answer("Solution was the Fibonacci sequence 1123581321.", THREAD$6) }),
		official("Format:[solution] TOMI [TOMI] [link]", THREAD$6, void 0, { answer: answer("Solution: 1123581321 TOMI Fibonacci L1NvACvyh4cNS5mTM4k8PnJphdBcdBWrU1EzcPZttaj9UHWD2xAT", "https://www.reddit.com/r/bitcoinpuzzles/comments/bjezpd/comment/emcwdmv/") }),
		official("Surviving longer than expected. Let's try a hint: Mona LIsa.", "https://www.reddit.com/r/bitcoinpuzzles/comments/bjezpd/comment/emb852k/")
	],
	solvedAt: "2019-05-02 13:33:18",
	solveTime: 101568,
	transactions: [funding("2d75d694fe065dfa02e57a2e95412efd2c11ed7f3f8fea09b45cef5deb377f6d", "2019-05-01 09:20:30", .01), claim("579a0b537f87a3e68dee38a23eaeec25053e384ef5c0aee377cb6a0d7809caf5", "2019-05-02 13:33:18", .00990796)]
});
const THREAD$5 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bjnzi8/11_mbtc_quizchain_block_74/";
const quizchainBlock74 = puzzle({
	id: "quizchain/74",
	chain: "bitcoin",
	address: "1HbUcHKfpkUSssNtcfS3vKzdTMue3EByMQ",
	sourceUrl: THREAD$5,
	startedAt: "2019-05-01 23:42:07",
	status: Status.Solved,
	pubkey: compressed("0312b422a56647895f549b81db0f36a964479696ec86b374be8b353167257825dd"),
	key: wif("L1myU8V1SzKbAvW51KcEaA6EvfpmffqNuTgMdmY45XpH99VyYMAm").entropy("0a7c902815f9dc9d26057280592b2553", source(THREAD$5, "MD5 of the victim, TOMI, the play and the whole block 73 key")),
	techniques: [technique("md5-to-bip39-entropy", THREAD$5)],
	prize: .011,
	hints: [
		official("Question: Victim of the perfect murder.", THREAD$5, void 0, { answer: answer("The victim in that novel is Norton (the solution for this block), and the TOMI field is one of the hints Poirot left, which was Othello.", THREAD$5) }),
		official("Again surviving longer than expected. Let's try a hint for this one too. Queen of crime.", "https://www.reddit.com/r/bitcoinpuzzles/comments/bjnzi8/comment/emb8d3y/"),
		official("Second hint live now: Who would be smart enough to pull off the perfect murder?", "https://www.reddit.com/r/bitcoinpuzzles/comments/bjnzi8/comment/emiutzl/")
	],
	solvedAt: "2019-05-03 21:45:09",
	solveTime: 165782,
	transactions: [funding("d3515e508f308639325ea8d76423ccc66d021fa6f13e8a2b09e1b0a7684cf952", "2019-05-01 23:42:07", .011), claim("cc9570322c10e9675d62425a2302dfa0bd020c596d40eb8b6f81a937c7cd014d", "2019-05-03 21:45:09", .01076038)]
});
const THREAD$4 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bk2207/12_mbtc_quizchain_block_75/";
const quizchainBlock75 = puzzle({
	id: "quizchain/75",
	chain: "bitcoin",
	address: "1FBj2afbHnqRwuZJNhaLfUtJBfoWvQSie",
	sourceUrl: THREAD$4,
	startedAt: "2019-05-03 00:15:47",
	status: Status.Solved,
	pubkey: compressed("03a9a4d538c706d79496d11176cb566b4ca0100955c350c7b53a8dd2953cd18809"),
	key: wif("L1nfJExgS7PHmRb9aZcZjCijL2EJQuMJUi5ax5XJdSorBw8VNph8").entropy("a30e2a19ba6c1775017a176598998521", source(THREAD$4, "MD5 of the four letters, TOMI, the Greek name and the whole block 74 key")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$4)],
	prize: .012,
	hints: [
		official("Question: No one knows how to pronounce this four letter word.", THREAD$4, void 0, { answer: answer("It was YHWH and the TOMI field was Tetragrammaton.", THREAD$4) }),
		official("Hint live at Twitter feed now. He who must not be named (NOT Voldemort)", "https://www.reddit.com/r/bitcoinpuzzles/comments/bk2207/comment/emk1zoq/"),
		official("Just posted the solution to block 74. The link for this block is L1myU8V1SzKbAvW51KcEaA6EvfpmffqNuTgMdmY45XpH99VyYMAm", "https://www.reddit.com/r/bitcoinpuzzles/comments/bk2207/comment/emjm7n3/")
	],
	solvedAt: "2019-05-05 12:44:54",
	solveTime: 217747,
	transactions: [funding("886a71eeeeddf8ac61ef48b0faedb5ae8e257674472aaf9259e3f444e5aca60a", "2019-05-03 00:15:47", .012), claim("851d12ab621d3e7dfd368ceb61a524964290af888920fcdd30a5d2ab48237f68", "2019-05-05 12:44:54", .0118)]
});
const THREAD$3 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bk27y7/76_mbtc_quizchain_block_76/";
const quizchainBlock76 = puzzle({
	id: "quizchain/76",
	chain: "bitcoin",
	address: "1LZZtbS91P4h5QYdTiTm8dChfLcb1gtwRe",
	sourceUrl: THREAD$3,
	startedAt: "2019-05-03 00:42:41",
	status: Status.Solved,
	pubkey: compressed("03ba25685ae0491a4999ef81d0d0ce33041dee41ace9e75a72d21677f7b5e2c1c6"),
	key: wif("L2e6gPSXnq7KJBfkoD7cHGVZuhRUDARJz2Cc9JcSNLsKRZhH552F").entropy("3d5823ea1088774b53558624060cf473", source(THREAD$3, "MD5 of the feast, TOMI, two words and the whole block 75 key")),
	techniques: [technique("md5-to-bip39-entropy", THREAD$3)],
	prize: .076,
	hints: [
		official("Question: Jesus", THREAD$3, void 0, { answer: answer("Solution was Easter, TOMI field was Second Life.", THREAD$3) }),
		official("Format: [solution] TOMI [TOMI] [link]", THREAD$3),
		official("Hint live now. It is: Hint already posted SOMEWHERE in Wattpad story can't remember where", "https://www.reddit.com/r/bitcoinpuzzles/comments/bk27y7/comment/emn4owv/")
	],
	solvedAt: "2019-05-06 13:06:24",
	solveTime: 303823,
	transactions: [funding("aa77bbcc7c12b67f56962676dac401caf29ff68791a4f1a669ba0b32bbb835ab", "2019-05-03 00:42:41", .076), claim("7bd3140da6bddaaed3c888f81b6a373a1e0bf6eac46a5d7763eceb28a6d4ef95", "2019-05-06 13:06:24", .0758556)]
});
const THREAD$2 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bkeggn/77_mbtc_quizchain_block_77/";
const PLAYER_COMMENT = "https://www.reddit.com/r/bitcoinpuzzles/comments/bkeggn/comment/ettcfmb/";
const AUTHOR_COMMENT = "https://www.reddit.com/r/bitcoinpuzzles/comments/bkeggn/comment/ettfzcx/";
const quizchainBlock77 = puzzle({
	id: "quizchain/77",
	chain: "bitcoin",
	address: "1FAAKpzFc2CGU6Yt51kAZv5f6dXZckRsMP",
	sourceUrl: THREAD$2,
	startedAt: "2019-04-29 05:24:39",
	status: Status.Solved,
	pubkey: compressed("022dc47f1d1d04a171fb4a6a9f2b43ebc13cf5a6b77b195153f8863d4657c580fd"),
	key: wif("KzWuYrzjrYJXdRMA6SukNnuRUkFRycUq8WdfUgfkQ5k1t5quvNGk").entropy("684b250ea52c1e33a6f6143ded0e62e6", source(AUTHOR_COMMENT, "MD5 of the eight items a player posted and the author confirmed, TOMI, Omit TOMI and the whole block 44 key")).derived(),
	techniques: [technique("md5-to-bip39-entropy", AUTHOR_COMMENT)],
	prize: .077,
	hints: [
		official("Question: The solution is the puzzle.", THREAD$2, void 0, { answer: answer("1A1 efi2DM Hal Finney TS mN ihsotaS otomakaN", PLAYER_COMMENT) }),
		official("Update: Use [solution] TOMI Omit TOMI [link], since that is what I hashed with in yet another mistake.", THREAD$2),
		official("Link is full private key from unsolved block 44 (Du Hast), with L4VdZUD as first seven digits.", THREAD$2),
		official("Solution format is eight items in two sets of four. Two items ciphertext and two items plaintext each, 44 read from left and 44 read from right.", THREAD$2),
		official("Update: The solution written by Satoshi was that of block 46, the Bitcoin address of the Genesis block, reproduced for convenience here: 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa", THREAD$2)
	],
	solvedAt: "2019-07-15 06:40:20",
	solveTime: 6657341,
	transactions: [funding("bf2213192ca6c8c782a9795c6d3fc9a38a20cafee6452a88cdcf2fecad17ca16", "2019-04-29 05:24:39", .077), claim("b0a24545350a0e0cbb049a6e3207e1431c17ec3f5cead19bd675841af4e71290", "2019-07-15 06:40:20", .07685965)]
});
const THREAD$1 = "https://www.reddit.com/r/bitcoinpuzzles/comments/bar0ty/very_easy_7_mbtc_quizchain_block_8/";
const quizchainBlock8 = puzzle({
	id: "quizchain/8",
	chain: "bitcoin",
	address: "1AKjCXbC3evWDioEQNKKtGWTbQokPZT7Jv",
	sourceUrl: THREAD$1,
	startedAt: "2019-04-08 07:41:07",
	status: Status.Solved,
	pubkey: compressed("03bb1014ab885aede78f390ad446993f0a6ec9c501c0e646db087b9ea94f41260b"),
	key: wif("KwwbEXjw3E9HfiCqk3RmfYNMG7KYkUmWDnxeyc1MTdmKGwcwTHwX").entropy("cc0444e284fef38d8d6907c93d49b162245b8fbc203bb3ffd35945d22dfd6677", source(THREAD$1, "SHA-256 of the author's answer with the six characters before the last three of the block 6 key appended")).derived(),
	techniques: [technique("sha256-to-bip39-entropy", THREAD$1)],
	prize: .007,
	hints: [official("How many mbtc do I plan to offer as the prize for block 77?", THREAD$1, void 0, { answer: answer("As will surprise exactly no one, the correct answer for this is 777. And the last three digits of the private key for block 8 are HwX.", THREAD$1) }), official("In this case you don't use the last three digits of the preceding block's private key. You need the 6 digits preceding the last three digits of the private key for block 6 (the other unsolved block right now).", THREAD$1)],
	solvedAt: "2019-04-08 11:26:31",
	solveTime: 13524,
	transactions: [funding("4af04e6b843f56fba6073024ed973a775944291e850fc051522b37cf2384b6e2", "2019-04-08 07:41:07", .007), claim("13e45d82aa69f814d6fb93da0c7c705c782ddd5dce31d7876f771071bd389bbf", "2019-04-08 11:26:31", .00666438)]
});
const THREAD = "https://www.reddit.com/r/bitcoinpuzzles/comments/baswxz/easy_7_mbtc_quizchain_block_9/";
const quizchainBlock9 = puzzle({
	id: "quizchain/9",
	chain: "bitcoin",
	address: "19N9hWUEFt5PKsKrciP88QXFaDNKXrMdZd",
	sourceUrl: THREAD,
	startedAt: "2019-04-08 12:01:33",
	status: Status.Solved,
	pubkey: compressed("039538dcf5d80dc3ca7685f0bffd982f2ed3856815b6ceccb72147943415c03475"),
	key: wif("L16fAy6yCKjR7wQCGkqD4Lb4iWuA3EXKjT7zhA6zsw6mUeXSPfnw").entropy("695491c85ba501f2773fbfddafab5085a609d8f832d991d125b8bbbdd745f497", source(THREAD, "SHA-256 of the author's answer with the last three characters of the block 8 key appended and the line break the author says was copied with it")).derived(),
	techniques: [technique("sha256-to-bip39-entropy", THREAD)],
	prize: .007,
	hints: [
		official("I am an evil AI robot ruling the world. I have captured a human (you) and give you a choice. You have to reply with one sentence of six words. If that sentence is a lie, I will torture you to death. If in contrast you say the truth, I will kill you in a swift and merciful way. As a robot, I am completely unable to break one of those promises. What is your answer?", THREAD, void 0, { answer: answer("The correct answer was \"You will torture me to death.HwX\". Unfortunately, I messed up this time. I drafted this puzzle in a word processor. When copypasting it to the hash app, I did not notice that I copypasted a line break with the right answer, leading to a completely different hash and a broken link in the chain.", THREAD) }),
		official("Answer in the format of a six word sentence like this one: This is a six word sentence.HwX", THREAD),
		official("HwX are the last three digits of the private key from block 8, which no one has solved yet.", THREAD)
	],
	solvedAt: "2019-04-08 23:19:31",
	solveTime: 40678,
	transactions: [funding("d192ffe7d819135b6b99e1d9099538465cac9b65aa2a93daf9f7eb78a98be5d6", "2019-04-08 12:01:33", .007), claim("860248486b67fb52dc34fab4b433ac73833fc5ce695435f2a36be4297d57729d", "2019-04-08 23:19:31", .00669472)]
});
var QuizchainCollection = class QuizchainCollection extends NumericCollection {
	static key = "quizchain";
	static author = SatoshiBirthdayQuizCollection.author;
	static puzzles = [
		quizchainBlock1,
		quizchainBlock2,
		quizchainBlock3,
		quizchainBlock4,
		quizchainBlock5,
		quizchainBlock6,
		quizchainBlock7,
		quizchainBlock8,
		quizchainBlock9,
		quizchainBlock10,
		quizchainBlock11,
		quizchainBlock12,
		quizchainBlock13,
		quizchainBlock14,
		quizchainBlock15,
		quizchainBlock16,
		quizchainBlock17,
		quizchainBlock18,
		quizchainBlock19,
		quizchainBlock20,
		quizchainBlock21,
		quizchainBlock22,
		quizchainBlock23,
		quizchainBlock24,
		quizchainBlock25,
		quizchainBlock26,
		quizchainBlock27,
		quizchainBlock28,
		quizchainBlock29,
		quizchainBlock30,
		quizchainBlock31,
		quizchainBlock32,
		quizchainBlock33,
		quizchainBlock34,
		quizchainBlock35,
		quizchainBlock36,
		quizchainBlock37,
		quizchainBlock38,
		quizchainBlock39,
		quizchainBlock40,
		quizchainBlock41,
		quizchainBlock42,
		quizchainBlock43,
		quizchainBlock44,
		quizchainBlock45,
		quizchainBlock46,
		quizchainBlock47,
		quizchainBlock48,
		quizchainBlock49,
		quizchainBlock50,
		quizchainBlock51,
		quizchainBlock52,
		quizchainBlock53,
		quizchainBlock54,
		quizchainBlock55,
		quizchainBlock56,
		quizchainBlock57,
		quizchainBlock58,
		quizchainBlock59,
		quizchainBlock60,
		quizchainBlock61,
		quizchainBlock62,
		quizchainBlock63,
		quizchainBlock64,
		quizchainBlock65,
		quizchainBlock66,
		quizchainBlock67,
		quizchainBlock68,
		quizchainBlock69,
		quizchainBlock70,
		quizchainBlock71,
		quizchainBlock72,
		quizchainBlock73,
		quizchainBlock74,
		quizchainBlock75,
		quizchainBlock76,
		quizchainBlock77
	];
	constructor() {
		super(QuizchainCollection.key, QuizchainCollection.author, QuizchainCollection.puzzles);
	}
};
const quizchain = new QuizchainCollection();
export { QuizchainCollection, quizchain };
