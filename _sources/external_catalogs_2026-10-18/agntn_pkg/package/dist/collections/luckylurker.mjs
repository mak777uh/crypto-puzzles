import { PartyKind, answer, claim, compressed, confirmation, fact, funding, official, party, profile, seed, technique } from "../_chunks/parts.mjs";
import { Status } from "../_chunks/status.mjs";
import { puzzle } from "../_chunks/puzzle.mjs";
import { NamedCollection } from "../_chunks/collection.mjs";
const luckyLurkerVault1 = puzzle({
	id: "luckylurker/vault-1",
	chain: "bitcoin",
	address: "bc1q32e3dxcd0n2tlzdmchraf2057d0ax4xdwrk3jq",
	sourceUrl: "https://luckylurker.com/bitcoin-vault/",
	startedAt: "2026-03-16 17:54:03",
	status: Status.Solved,
	solvedAt: "2026-08-17 18:08:09",
	key: seed("visit kingdom unveil kangaroo deposit found great grid remind science umbrella spot", "m/0'/0/1").electrum(),
	techniques: [technique("hidden-seed-words", "https://luckylurker.com/bitcoin-vault/")],
	pubkey: compressed("024ad3b398bc9a95b4b8d44310e15a5355402dba3c784e60bf3b14821ca1622adb"),
	prize: 8e-4,
	hints: [
		official("Word #1: Presence without permanence.", "https://luckylurker.com/bitcoin-vault/", confirmation("https://github.com/floflo777/open-crypto-puzzles/blob/main/4-solved/luckylurker-seed-riddles-80ksats/data/hints.csv", "Independent transcription of the riddle before the answers were published."), {
			date: "2026-03-17 17:30:00",
			answer: answer("visit", "https://luckylurker.com/bitcoin-vault/")
		}),
		official("Word #2: A realm where the crown is law.", "https://luckylurker.com/bitcoin-vault/", confirmation("https://github.com/floflo777/open-crypto-puzzles/blob/main/4-solved/luckylurker-seed-riddles-80ksats/data/hints.csv", "Independent transcription of the riddle before the answers were published."), {
			date: "2026-03-18 09:00:00",
			answer: answer("kingdom", "https://luckylurker.com/bitcoin-vault/")
		}),
		official("Word #3: The word is hidden inside this article (https://luckylurker.com/crypto-casinos-guide/). It’s marked visually, so you can't miss it if you look closely.", "https://luckylurker.com/bitcoin-vault/", confirmation("https://github.com/floflo777/open-crypto-puzzles/blob/main/4-solved/luckylurker-seed-riddles-80ksats/data/hints.csv", "Independent transcription of the riddle before the answers were published."), {
			date: "2026-03-18 17:30:00",
			answer: answer("unveil", "https://luckylurker.com/bitcoin-vault/")
		}),
		official("Word #4: Born twice, seen once.", "https://luckylurker.com/bitcoin-vault/", confirmation("https://github.com/floflo777/open-crypto-puzzles/blob/main/4-solved/luckylurker-seed-riddles-80ksats/data/hints.csv", "Independent transcription of the riddle before the answers were published."), {
			date: "2026-03-19 09:00:00",
			answer: answer("kangaroo", "https://luckylurker.com/bitcoin-vault/")
		}),
		official("Word #5: Find it inside the review of our #1 rated CS2 gambling site for 2026 (https://luckylurker.com/casino/gamdom/).", "https://luckylurker.com/bitcoin-vault/", confirmation("https://github.com/floflo777/open-crypto-puzzles/blob/main/4-solved/luckylurker-seed-riddles-80ksats/data/hints.csv", "Independent transcription of the riddle before the answers were published."), {
			date: "2026-03-19 17:30:00",
			answer: answer("deposit", "https://luckylurker.com/bitcoin-vault/")
		}),
		official("Word #6: Not created but uncovered.", "https://luckylurker.com/bitcoin-vault/", confirmation("https://github.com/floflo777/open-crypto-puzzles/blob/main/4-solved/luckylurker-seed-riddles-80ksats/data/hints.csv", "Independent transcription of the riddle before the answers were published."), {
			date: "2026-03-20 09:00:00",
			answer: answer("found", "https://luckylurker.com/bitcoin-vault/")
		}),
		official("Word #7: You’ll probably agree this hunt is…", "https://luckylurker.com/bitcoin-vault/", confirmation("https://github.com/floflo777/open-crypto-puzzles/blob/main/4-solved/luckylurker-seed-riddles-80ksats/data/hints.csv", "Independent transcription of the riddle before the answers were published."), {
			date: "2026-03-20 17:30:00",
			answer: answer("great", "https://luckylurker.com/bitcoin-vault/")
		}),
		official("Word #8: Just read N1 Casino review (https://luckylurker.com/casino/n1/). The word is already there.", "https://luckylurker.com/bitcoin-vault/", confirmation("https://github.com/floflo777/open-crypto-puzzles/blob/main/4-solved/luckylurker-seed-riddles-80ksats/data/hints.csv", "Independent transcription of the riddle before the answers were published."), {
			date: "2026-03-21 09:00:00",
			answer: answer("grid", "https://luckylurker.com/bitcoin-vault/")
		}),
		official("Word #9: The quickest path still needs a second thought. Find the article on the site (https://luckylurker.com/fastest-crypto-casino-withdrawals-2026/). The word is there.", "https://luckylurker.com/bitcoin-vault/", confirmation("https://github.com/floflo777/open-crypto-puzzles/blob/main/4-solved/luckylurker-seed-riddles-80ksats/data/hints.csv", "Independent transcription of the riddle before the answers were published."), {
			date: "2026-03-21 15:45:00",
			answer: answer("remind", "https://luckylurker.com/bitcoin-vault/")
		}),
		official("Word #10: The systematic pursuit of the unknown.", "https://luckylurker.com/bitcoin-vault/", confirmation("https://github.com/floflo777/open-crypto-puzzles/blob/main/4-solved/luckylurker-seed-riddles-80ksats/data/hints.csv", "Independent transcription of the riddle before the answers were published."), {
			date: "2026-03-22 09:00:00",
			answer: answer("science", "https://luckylurker.com/bitcoin-vault/")
		}),
		official("Word #11: It only works when it’s open, and it’s there to shield you.", "https://luckylurker.com/bitcoin-vault/", confirmation("https://github.com/floflo777/open-crypto-puzzles/blob/main/4-solved/luckylurker-seed-riddles-80ksats/data/hints.csv", "Independent transcription of the riddle before the answers were published."), {
			date: "2026-03-22 17:30:00",
			answer: answer("umbrella", "https://luckylurker.com/bitcoin-vault/")
		}),
		official("Word #12: A single mark on a map, or the act of finding it.", "https://luckylurker.com/bitcoin-vault/", confirmation("https://github.com/floflo777/open-crypto-puzzles/blob/main/4-solved/luckylurker-seed-riddles-80ksats/data/hints.csv", "Independent transcription of the riddle before the answers were published."), {
			date: "2026-03-22 18:30:00",
			answer: answer("spot", "https://luckylurker.com/bitcoin-vault/")
		})
	],
	transactions: [claim("75e570a5ea243c492e2804916482f046b2392b463c51be15624e6e25a84119f7", "2026-08-17 18:08:09", 79638e-8)]
});
const luckyLurkerVault2 = puzzle({
	id: "luckylurker/vault-2",
	chain: "bitcoin",
	address: "bc1qnepv9pcnqvndux9h9mcaxvk6u993rc0lew9fpp",
	sourceUrl: "https://luckylurker.com/bitcoin-vault-2/",
	startedAt: "2026-09-11 16:42:56",
	techniques: [technique("hidden-seed-words", "https://luckylurker.com/bitcoin-vault-2/")],
	prize: 1,
	hints: [official("Hints will be published gradually from 12 October 2026. They will not simply reveal the seed phrase one word at a time.", "https://luckylurker.com/bitcoin-vault-2/", confirmation("https://luckylurker.com/bitcoin-vault-2-is-live-1-btc-prize/", "The launch announcement confirms the schedule and warns that clues may need combining."))],
	transactions: [funding("2314d7f0b76c4f29ed1cfb949fd2882d648712f5c6cbaef9d7dff8ddee46f198", "2026-08-12 14:19:56", 1)]
});
var LuckyLurkerCollection = class LuckyLurkerCollection extends NamedCollection {
	static key = "luckylurker";
	static author = party("Paul Jones", {
		key: "paul-jones",
		kind: PartyKind.Person,
		about: "Byline on luckylurker.com, a casino review site, where the Bitcoin Vaults run as promotions between the reviews.",
		profiles: [profile("website", "https://luckylurker.com/author/paul-jones/"), profile("bitcointalk", "https://bitcointalk.org/index.php?action=profile;u=3750819")],
		facts: [fact("The author page says he started playing online slots in 2014 and has tested hundreds of casinos since, with no formal credentials.", "https://luckylurker.com/author/paul-jones/"), fact("The Vault posts sit next to casino reviews and bonus guides on the same site, and four of the twelve hints of the first Vault point at other articles there.", "https://luckylurker.com/bitcoin-vault/")]
	});
	static puzzles = [luckyLurkerVault1, luckyLurkerVault2];
	constructor() {
		super(LuckyLurkerCollection.key, LuckyLurkerCollection.author, LuckyLurkerCollection.puzzles);
	}
};
const luckyLurker = new LuckyLurkerCollection();
export { LuckyLurkerCollection, luckyLurker };
