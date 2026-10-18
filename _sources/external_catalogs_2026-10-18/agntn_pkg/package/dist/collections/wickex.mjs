import { PartyKind, answer, claim, community, fact, funding, increase, official, party, profile, sweep, technique, uncompressed } from "../_chunks/parts.mjs";
import { Status } from "../_chunks/status.mjs";
import { puzzle } from "../_chunks/puzzle.mjs";
import { NamedCollection } from "../_chunks/collection.mjs";
const THREAD$1 = "https://www.reddit.com/r/bitcoinpuzzles/comments/1ti0uw/medium_1mbtc_find_the_private_key/";
function comment(id) {
	return `https://www.reddit.com/r/bitcoinpuzzles/comments/1ti0uw/comment/${id}/`;
}
const METHOD = comment("ce87ss1");
const wickexYouTube = puzzle({
	id: "wickex/youtube",
	chain: "bitcoin",
	address: "1LhQZc57j9i3xofj5poayd6PnakN7xHwDA",
	sourceUrl: THREAD$1,
	startedAt: "2013-12-23 02:22:43",
	status: Status.Solved,
	pubkey: uncompressed("04f84646d641306db5209da72a4f7ce6386404fb4035a296b38467a39406a6bac7b85b541eab98b8b217245a7ba0f9dfca5549a659470d69abb3544d7772d5c684"),
	techniques: [
		technique("morse", THREAD$1),
		technique("sha256-brainwallet", THREAD$1),
		technique("steganography", THREAD$1)
	],
	prize: .001,
	hints: [
		official("I'll start you all off with the following code: 68 74 74 70 3a 2f 2f 77 77 77 2e 79 6f 75 74 75 62 65 2e 63 6f 6d 2f 77 61 74 63 68 3f 76 3d 71 59 78 38 46 76 58 39 69 62 30", THREAD$1, void 0, {
			date: "2013-12-23",
			answer: answer("Hex -> Text -> Youtube URL", METHOD, { date: "2013-12-23" })
		}),
		official("The morse-output should be all-caps by the way!", comment("ce86ukc"), void 0, {
			date: "2013-12-23",
			answer: answer("I personally loaded the Youtube video into Audacity to make it more clear, but it was morse code -> text.", METHOD, { date: "2013-12-23" })
		}),
		official("It's case-sensitive and all caps.", comment("ce86v8h"), void 0, {
			date: "2013-12-23",
			answer: answer("That was a bit.ly which went to the second video. That video was loaded into Sonic Visualiser and that had a string encoded into the sound.", METHOD, { date: "2013-12-23" })
		}),
		official("The image is meaningless. You're one step away, Brainwallet.org!", comment("ce86xa9"), void 0, {
			date: "2013-12-23",
			answer: answer("That string in Brainwallet.org was the private key.", METHOD, { date: "2013-12-23" })
		}),
		community("Any hint on the image? I have the text (I dont want to spoil it here, but \"STI...I5Z\") but I don't know about that.", comment("ce86vnj"), void 0, { date: "2013-12-23" })
	],
	solvedAt: "2013-12-23 03:08:58",
	solveTime: 2775,
	transactions: [
		funding("57252340e3fa7f4480c4e578fa81da48fd1f7a4dc0c640b43b651a2ebfbd9c8c", "2013-12-23 02:22:25", .001),
		claim("5575a2365c3473d1e2ecdc7735fe8550942640de62cafcfe406914a99e0fd28b", "2013-12-23 03:08:58", 9e-4),
		increase("8c0dad07879ca7e87d4e6c6b65a669394d79466c09ea31533d5bcee2e4a70072", "2013-12-23 03:08:58", .001),
		claim("d800bb1584c0258907c0790251ea1e8585ec3077e0ee3eb2d4b6642f0ef5e785", "2013-12-23 03:27:40", 9e-4),
		increase("53326fec15eead49002ddc811b3275e276dd3b488efb77a19196f06cda938a3d", "2014-02-01 04:53:39", 27486e-8),
		sweep("730ee0ff5dff3f8a296beabab0f06b02b76362f10cbce560f2e58d9522129d9d", "2014-02-01 04:53:39", 17486e-8)
	],
	solver: party("IAMABananaAMAA", {
		key: "iamabananaamaa",
		kind: PartyKind.Person,
		about: "Started r/bitcoinpuzzles, solved the second puzzle posted there the same night and sent the prize back.",
		profiles: [profile("reddit", "https://www.reddit.com/user/IAMABananaAMAA/")],
		facts: [fact("Wrote that the prize was taken and refunded, then listed the four steps: hex, Morse, a short link and a second video.", METHOD, { date: "2013-12-23" })]
	})
});
const THREAD = "https://www.reddit.com/r/bitcoinpuzzles/comments/1ti0uw/medium_1mbtc_find_the_private_key/";
const GIF_SOLVE = "https://www.reddit.com/r/bitcoinpuzzles/comments/1thjjq/easy_1mbtc_find_the_private_key_in_this_gif/ce846u3";
var WickexCollection = class WickexCollection extends NamedCollection {
	static key = "wickex";
	static author = party("Wickex", {
		key: "wickex",
		kind: PartyKind.Person,
		about: "Solved the first puzzle on r/bitcoinpuzzles in December 2013 and, to keep it fair, posted the second one the same night: hex, a YouTube video, Morse code and a brainwallet.",
		profiles: [profile("reddit", "https://www.reddit.com/user/Wickex/")],
		facts: [fact("Solved IAMABananaAMAA's GIF puzzle and posted the address two and a half hours after it went up.", GIF_SOLVE, { date: "2013-12-23" }), fact("Posted the subreddit's second puzzle because solving the first made it only fair to create the next one.", THREAD, { date: "2013-12-23" })]
	});
	static puzzles = [wickexYouTube];
	constructor() {
		super(WickexCollection.key, WickexCollection.author, WickexCollection.puzzles);
	}
};
const wickex = new WickexCollection();
export { WickexCollection, wickex };
