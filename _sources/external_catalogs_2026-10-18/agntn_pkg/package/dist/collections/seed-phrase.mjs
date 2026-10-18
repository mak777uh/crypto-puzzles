import { PartyKind, assets, confirmation, derivation, digest, fact, funding, increase, official, party, profile, technique } from "../_chunks/parts.mjs";
import { puzzle } from "../_chunks/puzzle.mjs";
import { SingletonCollection } from "../_chunks/collection.mjs";
const SITE = "https://seed-phrase.com/";
const REPO = "https://github.com/metaneer/seed-phrase";
const INCREASE = `${REPO}/commit/0ffba8f3b145ec9be7fe931798def75adaca08cd`;
function commit(sha, clue) {
	return confirmation(`${REPO}/commit/${sha}`, `The commit that added clue ${clue} to the site`);
}
function served(path, sha256, bytes, captured) {
	const url = `${SITE}${path}`;
	return digest(path.replace("img/", ""), sha256, bytes, {
		url,
		archive: `https://web.archive.org/web/${captured}id_/${url}`
	});
}
const LAUNCH = commit("cc31e9fb06560146aa80c066c1b9467f1de53e10", "2024071201");
const seedPhrasePuzzle = puzzle({
	id: "seed-phrase",
	chain: "bitcoin",
	address: "bc1q7x3p3rkmkxgf20n3apkccqcmn5mdtsf8zx5227",
	sourceUrl: SITE,
	startedAt: "2024-07-12 20:06:29",
	key: derivation("m/84'/0'/0'/0/0"),
	techniques: [technique("hidden-seed-words", SITE), technique("aes", SITE)],
	prize: .01,
	hints: [
		official("Solve puzzles to uncover a secret recovery phrase that unlocks a Bitcoin wallet. The first person to decode the entire phrase will control its contents. Visit back here for additional clues and updates.", SITE, LAUNCH, { date: "2024-07-12" }),
		official("There will be red herrings.", SITE, LAUNCH, { date: "2024-07-12" }),
		official("Speed is critical. Be the first to discover the seed phrase and then control the 🏆 at the end of the 🌈.", SITE, LAUNCH, { date: "2024-07-12" }),
		official("These words will be useful:", SITE, commit("8f6324332fd7a5251de39ef23cb915a86d0c300d", "2024071202"), { date: "2024-07-12" }),
		official("Beneath the surface, truths do sleep, In the dark, their secrets keep. Lift the veil, and you will see, To reveal, expose, and set them free. What word embodies this quest?", SITE, commit("8e39e894d07fd7eec11215ea0c185ca2a5304dae", "2024071401"), { date: "2024-07-14" }),
		official("The link to this clue will only open one time ever.", SITE, commit("061b99f1ae8f9d9e3e5a06a111dd62c6c3dfd1fe", "2024071402"), { date: "2024-07-14" }),
		official("Picture whatafeeling.png. Alt: You gotta see it to believe it. Title: Don't be shocked, it's a fake.", SITE, commit("22f5c1d32de572197c088512f80fec156d13bbc6", "2024071601"), { date: "2024-07-16" }),
		official("The month in which the world celebrates the harvest and prepares for the coming winter also saw the release of a transformative paper announcing a peer-to-peer electronic cash system.", SITE, commit("472b950d06da06d71dfef5339542d6ee5beb88fa", "2024071901"), { date: "2024-07-19" }),
		official("web favorite icon", SITE, commit("601bcdece6d7d100b989df252172483516760361", "2024072001"), { date: "2024-07-20" }),
		official("🤢", SITE, commit("4a7f6003d9f4ee15775fcd93dcb6100c9d5830d3", "2024072401"), { date: "2024-07-24" }),
		official("Summation of x_i from i=1 to n equals 29,045, given that each x_i is between 1 and 2,048.", SITE, commit("15d33dff96bc4837d98ce77d36826cf2392facf1", "2024072801"), { date: "2024-07-28" }),
		official("m/84'/0'/0'/0/0", SITE, commit("b77ed999cf3596e9f621d41ee0da84294d2d9d5f", "2024073001"), { date: "2024-07-30" }),
		official("Picture illusionsmichael.png. Alt: Magician pulling back a large black cloth, mid-motion, revealing something hidden, while an astonished audience looks on in wonder. Title: Illusions Michael", SITE, commit("77ce96e587a35b3a1deed9e45f97805a5a859380", "2024080901"), { date: "2024-08-09" }),
		official("Encrypted Text: af12ff6a02e571eae376e579a00bfdd318afee92 IV: 4faf05ee74196a6062d383e6 Password: answer to 2024-07-19 clue (lc) Salt: salt", SITE, commit("372f4df65f850606c9ccaa59b93840ce60f24c04", "2024081401"), { date: "2024-08-14" })
	],
	transactions: [funding("6cb3e4bab33a9086fbca6250c783c532fed985abc67f52f7205782797b398bac", "2024-07-12 20:06:29", .005), increase("221f3d64a45a95d6cf05a3fe5a84fac292790d39b05929ed213a492e02177160", "2024-08-14 20:24:59", .005)],
	assets: assets({
		hints: [
			"bip-0039-wordlist-en-CN.pdf",
			"whatafeeling.png",
			"SPfavicon-256x256.png",
			"sumofwords.png",
			"illusionsmichael.png"
		],
		sourceUrl: SITE,
		digests: [
			served("bip-0039-wordlist-en-CN.pdf", "18336786ef2909490b5c4f6ccda7a9ba38a0c176a61aa2eaa4a526110e707700", 27529, "20260209175939"),
			served("img/whatafeeling.png", "b4f9ad85abbd6105aef8d79110b2be242c08294c13a1ad66d3a73883c96b7d78", 2244247, "20241220094525"),
			served("img/SPfavicon-256x256.png", "1cdf7207e6d70d8e15036733ec4644b1448768c98bb74d68d6ee27aa6623755d", 52892, "20241220094525"),
			served("img/sumofwords.png", "1cba74a2d97ab7641e64029aa0b171699838e41e0eac835ffd2cf82696c82cb1", 35150, "20241220094525"),
			served("img/illusionsmichael.png", "641be431035c90b55ac98165518c70b2b6d75864ae38a401df4d0fbdd1186aa2", 1214522, "20241220094525")
		]
	})
});
var SeedPhraseCollection = class SeedPhraseCollection extends SingletonCollection {
	static key = "seed-phrase";
	static author = party("MetaNeer Labs", {
		key: "metaneer",
		kind: PartyKind.Organization,
		aliases: ["seed-phrase.com"],
		about: "Software studio of one developer whose GitHub organization publishes seed-phrase.com. Put 0.005 BTC behind a recovery phrase in July 2024, doubled it in August and has added no clue since.",
		profiles: [profile("github", "https://github.com/metaneer"), profile("website", "https://metaneer.com")],
		facts: [
			fact("Publishes seed-phrase.com from the metaneer/seed-phrase repository, whose CNAME names the domain. Each clue after the launch went up as its own commit.", REPO, { date: "2024-07-12" }),
			fact("Raised the prize from 0.005 BTC to 0.010 BTC on 2024-08-14, with a second deposit to the same address.", INCREASE, { date: "2024-08-15" }),
			fact("The policies on the site warn that there will be red herrings and that the organizers may change the rules without notice.", SITE)
		]
	});
	static puzzles = [seedPhrasePuzzle];
	constructor() {
		super(SeedPhraseCollection.key, SeedPhraseCollection.author, SeedPhraseCollection.puzzles);
	}
};
const seedPhrase = new SeedPhraseCollection();
export { SeedPhraseCollection, seedPhrase, seedPhrasePuzzle };
