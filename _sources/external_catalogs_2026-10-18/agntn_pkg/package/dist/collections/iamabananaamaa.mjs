import { PartyKind, answer, assets, claim, community, compressed, confirmation, digest, fact, funding, official, party, profile, technique, wif } from "../_chunks/parts.mjs";
import { Status } from "../_chunks/status.mjs";
import { puzzle } from "../_chunks/puzzle.mjs";
import { NamedCollection } from "../_chunks/collection.mjs";
const THREAD$1 = "https://www.reddit.com/r/bitcoinpuzzles/comments/1ticec/medium_1mbtc_riddle_me_this_for_a_private_key/";
const iAmABananaAmaaCaesar = puzzle({
	id: "iamabananaamaa/caesar",
	chain: "bitcoin",
	address: "1wkQxZaewFqYrDJeVnxqrfMKfJykdRfr5",
	sourceUrl: THREAD$1,
	startedAt: "2013-12-23 04:53:59",
	status: Status.Solved,
	pubkey: compressed("022550e961be572a4909f753ea9e98a2a70d77743f367979c5309c2215e852a9be"),
	key: wif("Ky1VCMxtg9xD13hFrEhWxN22QobNEfeTDX14sZdhGHC3nBRTEDQ8"),
	prize: .001,
	hints: [official("\"FOUR IS SIX / THREE IS SEVEN / TWO IS NINE / ONE IS FOUR\" - CAESAR'S LAST WORDS", THREAD$1, confirmation("https://web.archive.org/web/20230531170758/https://old.reddit.com/r/bitcoinpuzzles/comments/1ticec/medium_1mbtc_riddle_me_this_for_a_private_key/", "Wayback capture of the post and its comments"), {
		date: "2013-12-23",
		answer: answer("The info given to you was an encrypted key in four parts. According to CAESAR'S last words, you can decrypt each part. I don't remember it off the top of my head, but whatever the second number in each line is the Caesar Shift amount. So if \"one is four\", the first line can be decrypted using a Caesar shift of 4.", "https://www.reddit.com/r/bitcoinpuzzles/comments/1ticec/comment/ce8nwvi/", { date: "2013-12-23" })
	}), official("This one is easy/medium. It doesn't involve any images or videos.", THREAD$1, void 0, { date: "2013-12-23" })],
	solvedAt: "2013-12-23 15:18:26",
	solveTime: 37467,
	transactions: [funding("5c2b479557a3e09bc032faac765ad74ed35d309a325a18f2f83586c54d71e8ca", "2013-12-23 03:08:58", .001), claim("a5829ee22a26a167e9ec19808fb307a3dfccd6a9b63191859825561f1643ce9d", "2013-12-23 15:18:26", 9e-4)]
});
const THREAD = "https://www.reddit.com/r/bitcoinpuzzles/comments/1thjjq/easy_1mbtc_find_the_private_key_in_this_gif/";
const GIF = "http://i.imgur.com/7rXofNv.gif";
function comment(id) {
	return `https://www.reddit.com/r/bitcoinpuzzles/comments/1thjjq/comment/${id}/`;
}
const METHOD = comment("ce86ejm");
const iAmABananaAmaaGif = puzzle({
	id: "iamabananaamaa/gif",
	chain: "bitcoin",
	address: "1DprL7pbKGwjMKoJ4c6BEKrTmtbPB4AiNJ",
	sourceUrl: THREAD,
	startedAt: "2013-12-22 22:35:39",
	status: Status.Solved,
	pubkey: compressed("03987951b3fa4a6f68ba76bd509a8ac4945b3cb1e14be1eadd5d3210f590313024"),
	key: wif("L21s1A2LjTL5WLEfWPJtuKxHKF3PcfJnyiEtjNtPUxwnSdqWBD66").derived(),
	techniques: [technique("base64", THREAD), technique("steganography", THREAD)],
	prize: .001,
	hints: [
		official("You don't need specialized software, no. However, you will (I believe) most likely need a program that basically anybody on the planet has since it has so many wide uses and public options.", comment("ce81be8"), void 0, {
			date: "2013-12-22",
			answer: answer("images can be 'merged' with ZIP/RAR files, which you can open by renaming the extension of the .gif file to .zip. In there was a file called MEGAN.txt, with a string inside of it.", METHOD, { date: "2013-12-23" })
		}),
		official("Hint: Megan may not be a person, but if she was, she'd be 35 years old.", comment("ce8257x"), void 0, {
			date: "2013-12-22",
			answer: answer("referring to MEGAN-35, a kind of hash. By decrypting it (google MEGAN-35 decrypter or something similar) I got another string, which turned out to be an ATOM-128 hash. When decrypted, it gave you the private key!", METHOD, { date: "2013-12-23" })
		}),
		official("Just to save you time, the thing in the bottom right is an error on the gif's part. The creator messed something up when creating it.", comment("ce825x4"), void 0, { date: "2013-12-22" }),
		official("The zip file name was ATOM :).", comment("ce86n19"), void 0, { date: "2013-12-23" }),
		community("Oh right. It is just a compressed file. This is the output of MEGAN.txt = jZXbm2zukIKdShNxcJnrkuXPm2XRSZGY=M1Gku=9gKGJc/9uju1eoJ=ynhfSjuXPddfvc2n4cJyqlMf2dLD4k2Nvi2refuSI", comment("ce828ht"), void 0, { date: "2013-12-22" })
	],
	solvedAt: "2013-12-23 01:04:43",
	solveTime: 8944,
	transactions: [funding("17975f67f8be43470c3abaa6ba847444de9453dafc817396a2c5383be31a8669", "2013-12-22 22:27:31", .001), claim("594f82e1a11a7fbf212715075685d3b3201342d0b26075e0dbd8365fa1eaba50", "2013-12-23 01:04:43", 9e-4)],
	solver: party("Wickex", {
		key: "wickex",
		kind: PartyKind.Person,
		about: "Solved the first puzzle on r/bitcoinpuzzles and posted the second one the same night.",
		profiles: [profile("reddit", "https://www.reddit.com/user/Wickex/")],
		facts: [fact("Posted the prize address as the answer, about two and a half hours after the GIF went up.", comment("ce846u3"), { date: "2013-12-23" }), fact("Explained the method: a ZIP hidden in the GIF, then MEGAN-35 and ATOM-128 decoding down to the key.", METHOD, { date: "2013-12-23" })]
	}),
	assets: assets({
		puzzle: "gif/puzzle.gif",
		sourceUrl: GIF,
		digests: [digest("gif/puzzle.gif", "8e83a9822b24ee0965df5e3697e4f8c1974a6003283e22fa4b013bba462b62c1", 882285, {
			url: "http://i.imgur.com/7rXofNv.gif",
			archive: "https://web.archive.org/web/20201112034442id_/https://i.imgur.com/7rXofNv.gif"
		})]
	})
});
const WELCOME = "https://www.reddit.com/r/bitcoinpuzzles/comments/1thi7z/meta_welcome_to_rbitcoinpuzzles/";
const ANNOUNCEMENT = "https://www.reddit.com/r/Bitcoin/comments/1thjlz/";
var IAmABananaAmaaCollection = class IAmABananaAmaaCollection extends NamedCollection {
	static key = "iamabananaamaa";
	static author = party("IAMABananaAMAA", {
		key: "iamabananaamaa",
		kind: PartyKind.Person,
		about: "Started r/bitcoinpuzzles in December 2013 and put a puzzle up the same evening: a GIF with 1 mBTC inside. Marked it easy. Took that back within the hour.",
		profiles: [profile("reddit", "https://www.reddit.com/user/IAMABananaAMAA/")],
		facts: [fact("Opened r/bitcoinpuzzles with a welcome post: hide a private key in a video, image or text, and put at least 1 mBTC on it.", WELCOME, { date: "2013-12-22" }), fact("Announced the subreddit on r/Bitcoin a minute after posting the GIF puzzle.", ANNOUNCEMENT, { date: "2013-12-22" })]
	});
	static puzzles = [iAmABananaAmaaGif, iAmABananaAmaaCaesar];
	constructor() {
		super(IAmABananaAmaaCollection.key, IAmABananaAmaaCollection.author, IAmABananaAmaaCollection.puzzles);
	}
};
const iAmABananaAmaa = new IAmABananaAmaaCollection();
export { IAmABananaAmaaCollection, iAmABananaAmaa };
