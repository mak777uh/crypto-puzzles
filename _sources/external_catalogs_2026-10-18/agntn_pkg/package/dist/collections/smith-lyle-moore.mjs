import { PartyKind, answer, artifact, assets, claim, compressed, confirmation, derivation, digest, fact, funding, official, party, profile, seed, stage, technique } from "../_chunks/parts.mjs";
import { Status } from "../_chunks/status.mjs";
import { puzzle } from "../_chunks/puzzle.mjs";
import { NamedCollection } from "../_chunks/collection.mjs";
const PAGE$1 = "https://www.smithlylemoore.com/treasure-hunt";
const FIRST_PAGE$1 = confirmation("https://web.archive.org/web/20210628003610/https://www.smithlylemoore.com/treasure-hunt", "Wayback capture of the treasure hunt page from June 2021");
const RELEASE_PAGE = confirmation("https://web.archive.org/web/20210805044449/https://www.smithlylemoore.com/treasure-hunt", "Wayback capture of the treasure hunt page from August 2021");
const WRITEUP = "https://www.reddit.com/r/smithlylemoore/comments/p6wzkk/bitcoin_treasure_hunt_solutionwriteup/";
const SOLVED = { date: "2021-08-18" };
const COVER = "https://static.wixstatic.com/media/144728_690b95a837b14706a3e8583e0c5b8056~mv2.png";
const SITE = "https://www.smithlylemoore.com";
const MUSIC = "https://music.wixstatic.com/mp3";
const smithLyleMooreBornToBeWild = puzzle({
	id: "smith-lyle-moore/born-to-be-wild",
	chain: "bitcoin",
	address: "bc1qgtymp8q7hw2k9tewhdq74vdlpkqhflgju69n95",
	sourceUrl: FIRST_PAGE$1.url,
	startedAt: "2021-06-25 00:57:33",
	status: Status.Solved,
	solvedAt: "2021-08-18 07:33:00",
	solveTime: 4689327,
	prize: .025,
	pubkey: compressed("032a0aed2948e5b4a5631f60a633b81f38674f16e3b1a8f11120bc1635dc1b4809"),
	key: seed("fortune all man kind one giant step into digital tomorrow virtual moon", "m/84'/0'/0'/0/0", "supernova").xpub("xpub6CdPGtTHU667LydEdcRDwf9UyKAN1n2VHxaFbprMHcbY6GLbSij2zJ5QZxR38nR71T7pvNLBof7Yg9GBqu7QyNNaFshSzNjFhpMTDQNvABg"),
	techniques: [technique("hidden-seed-words", WRITEUP)],
	stages: [
		stage("album cover", "The Born to Be Wild cover carries a message past the end of its image data, and the first key check wants the word it names.", [artifact("album cover", COVER, "born-to-be-wild/puzzle.png"), artifact("key check 1", `${SITE}/key-check-1`)], answer("Password: fortune", WRITEUP, SOLVED), [technique("steganography", WRITEUP)]),
		stage("secret museum", "The museum behind the hidden door wants an 8-digit pin.", [artifact("secret museum", `${SITE}/the-secret-museum7`)], answer("Password: 07201969", WRITEUP, SOLVED)),
		stage("key check 2", "The museum's gold frames point at the next words of the key.", [artifact("key check 2", `${SITE}/key-check-2`)], answer("Password: all man kind", WRITEUP, SOLVED)),
		stage("key check 3", "The clues on the museum page add up to the words after those.", [artifact("key check 3", `${SITE}/key-check-3`)], answer("Password: one giant step", WRITEUP, SOLVED)),
		stage("pyromaniac", "The museum burns down, and the first way on is a red herring the band later changed, ending at a dead end.", [
			artifact("there's been a fire", `${SITE}/there-s-been-a-fire`),
			artifact("i'm a pyromaniac", `${SITE}/im-a-pyromaniac`),
			artifact("the tragedy", `${SITE}/the-tragedy`)
		], answer("Password: 01271967", WRITEUP, SOLVED)),
		stage("museum fire", "Back from the tragedy, paying your respects asks for a password.", [artifact("we will rebuild", `${SITE}/we-will-rebuild-stronger-than-before`)], answer("Password: fffffffffff", WRITEUP, SOLVED)),
		stage("rebuild", "The same page asks for another password right after the first.", [artifact("we will rebuild", `${SITE}/we-will-rebuild-stronger-than-before`)], answer("Password: FFFFFFFFFFF", WRITEUP, SOLVED)),
		stage("vault", "The passage ends at a locked vault, with an alternative mix of the song and a computer inside.", [
			artifact("the passage", `${SITE}/the-passage`),
			artifact("the vault", `${SITE}/the-vault`),
			artifact("alternative song", `${MUSIC}/144728_5f57f68e07ba4319b9c189fbc61626b9-320.mp3`),
			artifact("the computer", `${SITE}/the-computer`)
		], answer("Password: 4samcodeartist", WRITEUP, SOLVED)),
		stage("vault password", "The inverted song cancels the YouTube mix, and the guitar left in the alternative one, 13 seconds after touchdown, is Morse.", [artifact("vault password page", `${SITE}/blank`), artifact("inverted song", "https://www.youtube.com/watch?v=3we3eotJZHU")], answer("Password: into digital", WRITEUP, SOLVED), [technique("morse", WRITEUP)]),
		stage("key check 4", "The vault asks which code deciphered the last clue, and hands over the number to append.", [artifact("key check 4", `${SITE}/key-check-4`)], answer("Password: morse00100001", WRITEUP, SOLVED)),
		stage("key check 5", "A riddle in ones and zeros, with the number to append after the answer.", [artifact("key check 5", `${SITE}/key-check-5`)], answer("Password: tomorrow0010000", WRITEUP, SOLVED), [technique("binary", WRITEUP)]),
		stage("gateway", "An email to codebreaker@smithlylemoore.com earns the address and password of the gateway.", [artifact("gateway", `${SITE}/gateway`)], answer("Password: codebreaker11", WRITEUP, SOLVED)),
		stage("final attraction", "The ticket to the final attraction is words 11 and 12, the last stop of your journey.", [artifact("final attraction", `${SITE}/illstillbelovinyou`)], answer("Password: virtual moon", WRITEUP, SOLVED)),
		stage("wallet password", "The final attraction plays an unreleased song, and the wallet's password is the end of it all.", [artifact("final attraction", `${SITE}/illstillbelovinyou`), artifact("future song", `${MUSIC}/144728_b22b111462424cf3824203ac3564c2ce-320.mp3`)], answer("Password: supernova", WRITEUP, SOLVED))
	],
	hints: [
		official("Hidden in the Born To Be Wild album cover is a clue. Hidden in the Born To Be Wild music video is a hint about how to access the clue. Follow the clues... they will lead you to .025 Bitcoin.", PAGE$1, FIRST_PAGE$1),
		official("This is a digital treasure hunt that will lead you to digital gold. The treasure is buried with riddles, cyphers, analogies and references to historical events.", PAGE$1, FIRST_PAGE$1),
		official("There is a treasure map that you can access on this site. The map is very helpful. X marks the spot. Find it.", PAGE$1, FIRST_PAGE$1),
		official("There is also a shortcut in this journey if you know where/how to look and are willing to take the baby steps that lead to one giant leap.", PAGE$1, FIRST_PAGE$1),
		official("Watching the Born to Be Wild music video is important to your success in this puzzle.", PAGE$1, RELEASE_PAGE),
		official("If you think you have discovered part of the key, use the key checker tool to see if you're correct.", PAGE$1, RELEASE_PAGE)
	],
	assets: assets({
		puzzle: "born-to-be-wild/puzzle.png",
		sourceUrl: WRITEUP,
		digests: [digest("born-to-be-wild/puzzle.png", "70bb22569074c2cbec25c0fd1761ee9df8e7a4bf652a1c43265819c3283adace", 13407180, {
			url: COVER,
			archive: `https://web.archive.org/web/20210714221455id_/${COVER}`
		})]
	}),
	transactions: [funding("b434744d2bc873a82d8965c6de60fc8f11bdb3e6d34f0e61482e95378f0e6507", "2021-06-25 00:57:33", .025), claim("9dc8110ee73cd415361c23ceeac2a5ea8b01736556bc5f5fcbe11afac7be93a3", "2021-08-18 07:33:00", .02499616)],
	solver: party("26-9-15-20", {
		key: "26-9-15-20",
		about: "Reddit user whose group of friends cracked the Born to Be Wild hunt and posted the whole route on r/smithlylemoore.",
		profiles: [profile("reddit", "https://www.reddit.com/user/26-9-15-20/")],
		facts: [fact("Posted a write-up of the Born to Be Wild hunt with every page password, the twelve words and the wallet password, saying the group had solved it the night before.", WRITEUP, SOLVED)]
	})
});
const PAGE = "https://www.smithlylemoore.com/treasure-hunt";
const FIRST_PAGE = confirmation("https://web.archive.org/web/20220811234612/https://www.smithlylemoore.com/treasure-hunt", "Wayback capture of the treasure hunt page from August 2022");
const MORE_INFO = "https://www.smithlylemoore.com/more-info";
const FIRST_MORE_INFO = confirmation("https://web.archive.org/web/20220812000418/https://www.smithlylemoore.com/more-info", "Wayback capture of the more info page from August 2022");
const KEY_CHECKER = "https://www.smithlylemoore.com/key-checker";
const FIRST_KEY_CHECKER = confirmation("https://web.archive.org/web/20221227033927/https://www.smithlylemoore.com/key-checker", "Wayback capture of the key checker from December 2022");
const smithLyleMooreGlimmer = puzzle({
	id: "smith-lyle-moore/glimmer",
	chain: "bitcoin",
	address: "bc1q0akdjvrc2csau2n3gyxa3xcq0fss852x997m9y",
	sourceUrl: PAGE,
	startedAt: "2022-07-29 16:22:03",
	prize: .031777,
	pubkey: compressed("037e3109f564912f1007912d90f76c7aae43b812d6286d609a86140b746fbc7943"),
	key: derivation("m/84'/0'/0'/0/0").xpub("xpub6CpNc58zqQvNGPHDGGTr68wgrmtfFDBWRuSDAxoDdrCE1iRAaZtyAD5T9uCJ3ELUYKCkx8Jkind2kwoR3Uxmg1ycQ6DWyGxZBMFvQqhNqVC"),
	hints: [
		official("Woven into our next single, Glimmer, is a story. Uncover the story... it will lead you to .031777 Bitcoin.", MORE_INFO, FIRST_MORE_INFO),
		official("This is a digital treasure hunt. The treasure is buried with riddles, cyphers, analogies and references to historical events or epic nautical stories.", MORE_INFO, FIRST_MORE_INFO),
		official("There are red herrings and incorrect paths. Some lead back to the main journey, some lead elsewhere.", MORE_INFO, FIRST_MORE_INFO),
		official("This is the second digital treasure hunt we've created, and it picks up where the last one left off. Watch the Born to Be Wild video to better understand where you are starting from.", MORE_INFO, FIRST_MORE_INFO),
		official("There is also a shortcut in this journey if you know where/how to look and are willing to take the baby steps that lead to one giant leap.", MORE_INFO, FIRST_MORE_INFO),
		official("P.S. X Marks the spot — find the X (not on the flag), and we'll help you solve the first clue.", PAGE, FIRST_PAGE),
		official("click below and enter first word of key... just like last time ;)", KEY_CHECKER, FIRST_KEY_CHECKER)
	],
	transactions: [funding("977a42e5c9e9ee5fbcde9264ac05b4dc192b8330fc6e0ce56e89cf99772eb2fe", "2022-07-29 16:22:03", .031777)]
});
var SmithLyleMooreCollection = class SmithLyleMooreCollection extends NamedCollection {
	static key = "smith-lyle-moore";
	static author = party("Smith, Lyle & Moore", {
		key: "smith-lyle-moore",
		kind: PartyKind.Organization,
		about: "Indie band that spent its advertising budget on bitcoin and buried it behind riddles on its own website, one treasure hunt per single.",
		profiles: [
			profile("website", "https://www.smithlylemoore.com/"),
			profile("reddit", "https://www.reddit.com/r/smithlylemoore/"),
			profile("instagram", "https://instagram.com/smithlylemoore")
		],
		facts: [
			fact("Diverted a large chunk of the band's advertising budget to a treasure hunt in the Born to Be Wild album cover and music video, leading to .025 Bitcoin, and showed the wallet as an xpub.", "https://web.archive.org/web/20210628003610/https://www.smithlylemoore.com/treasure-hunt"),
			fact("Congratulated the group that solved Born to Be Wild under its write-up, then explained the gold frames, the giant step and the clue that pointed the vault at Morse.", "https://www.reddit.com/r/smithlylemoore/comments/p6wzkk/bitcoin_treasure_hunt_solutionwriteup/", { date: "2021-08-18" }),
			fact("Wove a story into the single Glimmer that leads to .031777 Bitcoin, a second hunt that picks up where the first one left off.", "https://www.smithlylemoore.com/more-info")
		]
	});
	static puzzles = [smithLyleMooreBornToBeWild, smithLyleMooreGlimmer];
	constructor() {
		super(SmithLyleMooreCollection.key, SmithLyleMooreCollection.author, SmithLyleMooreCollection.puzzles);
	}
};
const smithLyleMoore = new SmithLyleMooreCollection();
export { SmithLyleMooreCollection, smithLyleMoore };
