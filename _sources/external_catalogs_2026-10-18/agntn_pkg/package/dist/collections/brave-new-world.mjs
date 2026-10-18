import { PartyKind, assets, digest, fact, funding, increase, party, profile, technique } from "../_chunks/parts.mjs";
import { puzzle } from "../_chunks/puzzle.mjs";
import { SingletonCollection } from "../_chunks/collection.mjs";
const THREAD = "https://www.reddit.com/user/stsh_n/comments/j79zvj/bitcoin_puzzle_2000/";
const PICTURE = "https://i.redd.it/n1x7g8ceaur51.png";
const braveNewWorldPuzzle = puzzle({
	id: "brave-new-world",
	chain: "bitcoin",
	address: "1KfZGvwZxsvSmemoCmEV75uqcNzYBHjkHZ",
	sourceUrl: THREAD,
	startedAt: "2020-10-08 09:25:30",
	techniques: [technique("hidden-seed-words", THREAD)],
	prize: .20107284,
	transactions: [
		funding("fcee21d44ee94c09869947c74b61669bf928358e9c2d1699fb075bb6ebf5d043", "2020-05-10 08:01:46", .2),
		increase("a490266f12466f91c00546a4b744b5faea70835794b5b182d84e47e4294a33ee", "2023-10-25 01:55:34", 1e-5),
		increase("6ca136b078c61f530e3c7eb46eed0a23785840294fc59ef006df26e26f88fb53", "2024-12-13 08:42:55", .001),
		increase("51b778b00ca5dc676e99da96545e5c1ae6cf68c4ca79d59879e77facac64a251", "2025-05-09 23:02:54", 557e-8),
		increase("6d1f46d1913c45de1cd515a9cdc4de64ff2abfc19102e2cf23840bb5e944f8f4", "2025-06-02 05:48:21", 5727e-8)
	],
	assets: assets({
		puzzle: "puzzle.png",
		sourceUrl: PICTURE,
		digests: [digest("puzzle.png", "d0b04378f75d63997b8034ec2ef1bdd108178e4546de78237bd35abf4189a782", 2383395, {
			url: "https://i.redd.it/n1x7g8ceaur51.png",
			archive: "https://web.archive.org/web/20230620034345id_/https://i.redd.it/n1x7g8ceaur51.png"
		})]
	})
});
var BraveNewWorldCollection = class BraveNewWorldCollection extends SingletonCollection {
	static key = "brave-new-world";
	static author = party("stsh_n", {
		key: "stsh-n",
		kind: PartyKind.Person,
		about: "Reddit account that posted one picture puzzle to its own profile in October 2020, with 0.2 BTC on the address it shows.",
		profiles: [profile("reddit", "https://www.reddit.com/user/stsh_n/")],
		facts: [fact("Posted Bitcoin puzzle (2000$) on their own Reddit profile, a title and a picture with no text.", THREAD, { date: "2020-10-08" }), fact("Wrote the prize address up the left edge of the picture, beside the Statue of Liberty.", PICTURE, { date: "2020-10-08" })]
	});
	static puzzles = [braveNewWorldPuzzle];
	constructor() {
		super(BraveNewWorldCollection.key, BraveNewWorldCollection.author, BraveNewWorldCollection.puzzles);
	}
};
const braveNewWorld = new BraveNewWorldCollection();
export { BraveNewWorldCollection, braveNewWorld, braveNewWorldPuzzle };
