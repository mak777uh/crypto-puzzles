import { answer, compressed, confirmation, decrease, funding, official, seed, source, technique } from "../_chunks/parts.mjs";
import { Status } from "../_chunks/status.mjs";
import { puzzle } from "../_chunks/puzzle.mjs";
import { SingletonCollection } from "../_chunks/collection.mjs";
import { SatoshiBirthdayQuizCollection } from "../_chunks/satoshi-birthday-quiz.mjs";
const THREAD = "https://www.reddit.com/r/YangForPresidentHQ/comments/b9zg9p/7_million_book_quiz_challenge_to_this_subreddit/";
const bookQuizPuzzle = puzzle({
	id: "book-quiz",
	chain: "bitcoin",
	address: "1PLa3c2xjtoP6YE1FvaLhsf4akSxvdv3Ta",
	sourceUrl: THREAD,
	startedAt: "2019-04-06 02:58:10",
	status: Status.Expired,
	pubkey: compressed("02c879abfb2a6b24940ded09bbf421ace2f328a012244960a9d8ef407d73f3d7b4"),
	key: seed("have piano caution aim endless action evolve already park fetch business wrestle aim copper screen buzz around explain kick gift erupt unhappy brother job", "m/44'/0'/0'/0/0").entropy("69b4809282a49a05138839a04aa87c7f20545ff060fc0c2a11e8b0e4cfda873b", source(THREAD, "SHA-256 of the seven answer sentences, joined by single spaces")),
	techniques: [technique("sha256-to-bip39-entropy", THREAD)],
	prize: .07,
	hints: [
		official("To claim the funds, paste together all correct answers (omitting the leading a) b) etc) with exactly one space between characters. Take a SHA 256 hash of that, then feed it as entropy in a brain wallet generating tool. This will show you the address I sent 7 million satoshis to as well as the private key needed to sweep it.", THREAD, confirmation("https://web.archive.org/web/20230611183532/https://old.reddit.com/r/YangForPresidentHQ/comments/b9zg9p/7_million_book_quiz_challenge_to_this_subreddit/", "Wayback capture of the thread, post and comments"), { answer: answer("He is unable to predict what happens after the superintelligence explosion. American policy needs to think of all of humanity first, not only American citizens. What discussion? The book ignores the Green New Deal. The Democrats in the Senate blocked the legislation. Introducing a value added tax, shifting taxation from income to spending. Buy the book in bulk and distribute to friends, to help with the bestseller ranking and with spreading the message. Challenge Fucking Accepted.", THREAD) }),
		official("I give 7 multiple choice questions, some of which are factual questions about the book and some of which will require voicing an opinion. The latter category will have no objective correct answer; the correct answer will just be whatever I personally feel is the best.", THREAD),
		official("If someone finds the private key and sweeps the address in less than 60 minutes after I post the questions, we have a winner. Else I take back the funds. Either way I explain what I designated as the correct answers.", THREAD),
		official("I will not explain more about the format and how to sweep the funds after you found the correct answer beyond what I said above in this original post. Navigating this is part of the challenge.", THREAD),
		official("I have claimed the funds back just now. Failed to get a winner this time, sorry.", THREAD),
		official("Questions 1 and 2 were without objective answer. Questions 3 to 5 were easy for anyone who read the book. Question 6 was without objective answer. As was question 7, but that one was easier.", THREAD)
	],
	transactions: [funding("9777359a8bdeb17691a35e80dc6ed549c736bbe82a236f7ceaeb2567f3737fb2", "2019-04-06 02:58:10", .07), decrease("48d8205e4a86bcf0d5299b3114ef881ad4f245436b08e6edb8c9f00d72bf4874", "2019-04-06 04:53:28", .06978813)]
});
var BookQuizCollection = class BookQuizCollection extends SingletonCollection {
	static key = "book-quiz";
	static author = SatoshiBirthdayQuizCollection.author;
	static puzzles = [bookQuizPuzzle];
	constructor() {
		super(BookQuizCollection.key, BookQuizCollection.author, BookQuizCollection.puzzles);
	}
};
const bookQuiz = new BookQuizCollection();
export { BookQuizCollection, bookQuiz, bookQuizPuzzle };
