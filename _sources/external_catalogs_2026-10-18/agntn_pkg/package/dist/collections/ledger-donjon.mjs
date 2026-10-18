import { PartyKind, compressed, fact, party, profile, seed, technique } from "../_chunks/parts.mjs";
import { Status } from "../_chunks/status.mjs";
import { puzzle } from "../_chunks/puzzle.mjs";
import { NamedCollection } from "../_chunks/collection.mjs";
const ledgerDonjonPuzzleScissorsSecretSharing = puzzle({
	id: "ledger-donjon/scissors-secret-sharing",
	chain: "bitcoin",
	address: "1EHiMwCPzcvMdeGowsowVF2X2PgLo67Qj7",
	sourceUrl: "https://blog.cryptohack.org/bruteforcing-bitcoin-bip39-seeds-donjon-ctf-writeup",
	startedAt: "2020-10-28",
	status: Status.Solved,
	pubkey: compressed("02291add091898d4b2fcddc8a10fbea1435027cb0f3dd291730b59a9c3c4f979e6"),
	key: seed("since desk thrive carbon zone prison leaf depart hobby practice ivory luggage", "m/44'/0'/0'/0/0"),
	techniques: [technique("hidden-seed-words", "https://blog.cryptohack.org/bruteforcing-bitcoin-bip39-seeds-donjon-ctf-writeup")],
	solver: party("joachim", {
		key: "joachim",
		kind: PartyKind.Person,
		about: "CryptoHack writer who solved the BIP39 task of the Ledger Donjon CTF 2020 by brute forcing the word order.",
		facts: [fact("Wrote the CryptoHack write-up of Scissors Secret Sharing: a brute force over the ordering of twelve BIP39 words.", "https://blog.cryptohack.org/bruteforcing-bitcoin-bip39-seeds-donjon-ctf-writeup", { date: "2020-11-24" }), fact("Co-wrote with esrever the CryptoHack write-up of Projective Signatures, the ECDSA side channel task worth 500 points in the same CTF.", "https://blog.cryptohack.org/ecdsa-side-channel-attack-projective-signatures-donjon-ctf-writeup", { date: "2020-11-24" })]
	})
});
var LedgerDonjonCollection = class LedgerDonjonCollection extends NamedCollection {
	static key = "ledger-donjon";
	static author = party("Ledger Donjon", {
		key: "ledger-donjon",
		kind: PartyKind.Organization,
		about: "Ledger's security research team, which ran the Capture the Fortress CTF in 2020.",
		profiles: [profile("website", "https://donjon.ledger.com/"), profile("website", "https://www.ledger.com/blog/Capture-the-Fortress")],
		facts: [
			fact("Introduced on 2018-12-11 by Ledger's CSO Charles Guillemet as an internal security evaluation lab of eight experts covering software, side channel and fault attacks.", "https://www.ledger.com/blog/introducing-ledger-donjon", { date: "2018-12-11" }),
			fact("Says it open sources its attack tools and methodology and drives Ledger's bug bounty program.", "https://www.ledger.com/blog/introducing-ledger-donjon", { date: "2018-12-11" }),
			fact("Capture the Fortress ran from 2020-10-28 to 2020-11-18 as a jeopardy CTF with more than 15 challenges. First prize was 400 dollars and a Ledger Backup Pack.", "https://www.ledger.com/blog/Capture-the-Fortress", { date: "2020-10-21" })
		]
	});
	static puzzles = [ledgerDonjonPuzzleScissorsSecretSharing];
	constructor() {
		super(LedgerDonjonCollection.key, LedgerDonjonCollection.author, LedgerDonjonCollection.puzzles);
	}
};
const ledgerDonjon = new LedgerDonjonCollection();
export { LedgerDonjonCollection, ledgerDonjon };
