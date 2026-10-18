import { answer, claim, compressed, funding, official, source, technique, wif } from "../_chunks/parts.mjs";
import { Status } from "../_chunks/status.mjs";
import { puzzle } from "../_chunks/puzzle.mjs";
import { NumericCollection } from "../_chunks/collection.mjs";
import { QuizchainCollection } from "../_chunks/quizchain.mjs";
const THREAD$1 = "https://www.reddit.com/r/Grycoin/comments/civj2n/7_mbtc_grycoin_chain_block_1/";
const PLAYER_COMMENT = "https://www.reddit.com/r/Grycoin/comments/civj2n/comment/ev9nhlc/";
const AUTHOR_COMMENT = "https://www.reddit.com/r/Grycoin/comments/civj2n/comment/evaigpj/";
const grycoinBlock1 = puzzle({
	id: "grycoin/1",
	chain: "bitcoin",
	address: "18EpYz5qB3XoxZWouJF3KdEp3E2nfv9FgP",
	sourceUrl: THREAD$1,
	startedAt: "2019-07-28 00:35:31",
	status: Status.Solved,
	pubkey: compressed("0358a499b712f0e7739fc53e82c84b87cb946298c9fd1fb5649906fa90f27e2ba9"),
	key: wif("L1K8wVaq5WYH184dcCBeHZEe3cQYkWnJz778LW2NeYq3QCtGsRyt").entropy("4c414876be9043da4538386be9a03df6", source(THREAD$1, "MD5 of the solution")).derived(),
	techniques: [technique("md5-to-bip39-entropy", THREAD$1)],
	prize: .007,
	hints: [
		official("Question: When is this?", THREAD$1, void 0, { answer: answer("Update: As noted by winner below, solution to this block was \"Still 21st Century\".", THREAD$1, { date: "2019-07-28" }) }),
		official("Format: [solution]", THREAD$1, void 0, { answer: answer("Still 21st Century", PLAYER_COMMENT, { date: "2019-07-28" }) }),
		official("First three digits of MD5 hash are 4c4.", THREAD$1),
		official("But when I started up again, the first thing I wrote in my Twitter feed is the question for this block 1 of the Grycoin chain.", THREAD$1),
		official("There may be a hint in this block for some of the unsolved quizchain big blocks.", THREAD$1),
		official("It is for 77, but you will not see it if you let a script solve the block.", AUTHOR_COMMENT),
		official("And no, block 21 is not a hint for the format.", AUTHOR_COMMENT)
	],
	solvedAt: "2019-07-28 01:31:44",
	solveTime: 3373,
	transactions: [funding("75af636c49ba8127d02d79a36576e33bf248ceeb5bfd2bb04e2c0c6f4f4d493a", "2019-07-28 00:35:31", .007), claim("9509345e67024aff45b6e71988707fa86543e022a101bf46c2a61a680e2b315f", "2019-07-28 01:31:44", .00691955)]
});
const THREAD = "https://www.reddit.com/r/Grycoin/comments/cleczc/grycoin_block_2/";
const grycoinBlock2 = puzzle({
	id: "grycoin/2",
	chain: "bitcoin",
	address: "1tzieUfbeQghz2zjDeGHcAEfzCRgX6eLi",
	sourceUrl: THREAD,
	startedAt: "2019-08-01 05:04:38",
	status: Status.Claimed,
	pubkey: compressed("039ad91b631e5e2f0915b682c6ab8a29d81bb464a2ffc8ebf9702aad7b238192dc"),
	prize: .007,
	hints: [
		official("As is already clear from the reference to block 29, people are supposed to keep the whole long text and change only a couple of letters in their capitalization.", THREAD),
		official("When you do that, you would end up changing \"I\" to \"i\" and \"himself\" to \"himselF\".", THREAD),
		official("Which would be the solution, once you do that for all the paragraphs where you recognize the signs. And keep the rest completely unchanged.", THREAD),
		official("Format: [solution]", THREAD),
		official("Start with the first \"I\" and stop with the period after \"method\", with no spaces or line breaks before or after that included in the hash.", THREAD),
		official("And for the record, each of these resolves to the combination of the ASCII codes 13 and 10, for 13 10 13 10 meaning two line breaks, or \\r\\n \\r\\n as another way of saying the same thing.", THREAD),
		official("First three digits of MD5 hash are 3c6.", THREAD),
		official("I am saying copy paste and do not change anything with the line breaks, change only the capitalization of letters in solution.", "https://www.reddit.com/r/Grycoin/comments/cleczc/comment/evuthpw/"),
		official("Thank you for asking. I really like the answer, turns out that the first seven digits of that MD5 hash are 7759227, with three numbers 7 turning up there.", "https://www.reddit.com/r/Grycoin/comments/cleczc/comment/evv9k37/"),
		official("One, I actually don't know. The question of what letters to change in capitalization is obvious if you know the solution to Satoshi's bitcointalk puzzle, which I revealed already. The question of how to go from that to claiming the prize is not, not even to me.", "https://www.reddit.com/r/Grycoin/comments/cleczc/comment/evwv4rm/")
	],
	solvedAt: "2019-08-03 14:02:10",
	solveTime: 205052,
	transactions: [funding("f11eca9925c7809210796a3c8d95677dfaf0becb4f6df4c74e7261c3011a2e3c", "2019-08-01 05:04:38", .007), claim("351371588afddbaafe739237392e020e7d5db9f8aef44d655d31c313034e4cc7", "2019-08-03 14:02:10", .00689594)]
});
var GrycoinCollection = class GrycoinCollection extends NumericCollection {
	static key = "grycoin";
	static author = QuizchainCollection.author;
	static puzzles = [grycoinBlock1, grycoinBlock2];
	constructor() {
		super(GrycoinCollection.key, GrycoinCollection.author, GrycoinCollection.puzzles);
	}
};
const grycoin = new GrycoinCollection();
export { GrycoinCollection, grycoin };
