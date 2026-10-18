import { confirmation, funding, official } from "../_chunks/parts.mjs";
import { puzzle } from "../_chunks/puzzle.mjs";
import { SingletonCollection } from "../_chunks/collection.mjs";
import { QuizchainCollection } from "../_chunks/quizchain.mjs";
const THREAD = "https://www.reddit.com/r/Grycoin/comments/cgkpbb/777_mbtc_quizchain_last_block/";
const ANNOUNCEMENT = "https://www.reddit.com/r/bitcoinpuzzles/comments/chf8k2/very_hard_777_mbtc_quizchain_real_big_block/";
const ANNOUNCEMENT_CAPTURE = "https://web.archive.org/web/20230612075600/https://old.reddit.com/r/bitcoinpuzzles/comments/chf8k2/very_hard_777_mbtc_quizchain_real_big_block/";
const NOTES = "https://www.reddit.com/r/Grycoin/comments/chn8un/real_big_block_discussion/";
const note = (id) => `https://www.reddit.com/r/Grycoin/comments/chn8un/comment/${id}/`;
const realBigBlockChapter = puzzle({
	id: "real-big-block",
	chain: "bitcoin",
	address: "14zMkTgaVXJcxdh4JdWi29MLRR44iUSG9W",
	sourceUrl: THREAD,
	startedAt: "2019-07-22 23:10:09",
	prize: .777,
	hints: [
		official("Question: Final version of the second chapter of Wattpad story, which I will publish in a moment.", THREAD),
		official("https://www.wattpad.com/720888559-second", THREAD),
		official("It is unlikely that anyone would be able to solve the real big block without hints.", NOTES),
		official("When I posted the real big block at the Wattpad site, I added extra line breaks between paragraphs. This information is needed to solve the block.", note("euvdqxe")),
		official("I analyzed them with the tool at asciivalue.com and that shows one 13 and one 10 for each of the line breaks. The solution you need to hash with has only one line break between paragraphs, which is one 13 and one 10 in ASCII according to the asciivalue.com tool.", note("ev96vwg")),
		official("Once someone figures out the format for the first stage, they will also have a big hint for the format of this second stage.", note("eve843h")),
		official("Update: Took back the funds from the address above and sent them to a new address, funding transaction below, because I wanted to remove one of the twists I had. The block is now slightly easier. It is also hashed with two line breaks between paragraphs now.", THREAD),
		official("I took back the prize for a moment and sent it again to a new address, hashing with a slightly different solution, as explained in update above. That obviously means a hint for the solution: It has multiple paragraphs and two line breaks between each of them.", note("evj8ls1")),
		official("I mean the second one. Hit enter twice. This displays in Ascii as 13 10 13 10, according to asciivalue.com.", note("evn5g4u")),
		official("The main point of this block is to give a simple example for the format used in both phases of block 77, slightly developed from what I first used in block 2 and later in block 29 of the first run.", "https://www.reddit.com/r/Grycoin/comments/cleczc/grycoin_block_2/"),
		official("There are two expiry conditions. If no one solves this and claims the prize before either condition becomes true, I will send the prize to a climate emergency related charity and disclose the solution.", THREAD),
		official("The first condition: The 200 day moving average the Mayer Multiple is based on hits $100 per mbtc, which would mean a prize worth $77700. This will obviously happen at some time in the next years, but I am not sure if it takes longer than the second condition.", THREAD),
		official("The second condition: Tanabata 2022 comes.", THREAD),
		official("Prize will be sent to charity and solution disclosed if not solved before July 7th, 2022 or Mayer multiple goes to $100 per mbtc. Hints will be provided later.", ANNOUNCEMENT, confirmation(ANNOUNCEMENT_CAPTURE, "Wayback capture of the post with the author's comment"))
	],
	transactions: [funding("a1916e7ed9eac3fcc56a55056328cb09d06925e2694f2e6720de12b228514d1f", "2019-07-30 23:49:19", .777)]
});
var RealBigBlockCollection = class RealBigBlockCollection extends SingletonCollection {
	static key = "real-big-block";
	static author = QuizchainCollection.author;
	static puzzles = [realBigBlockChapter];
	constructor() {
		super(RealBigBlockCollection.key, RealBigBlockCollection.author, RealBigBlockCollection.puzzles);
	}
};
const realBigBlock = new RealBigBlockCollection();
export { RealBigBlockCollection, realBigBlock, realBigBlockChapter };
