import { UnknownCollectionError } from "./errors.mjs";
import { closestKey, missDetail } from "./collection.mjs";
const builtins = [
	{
		key: "80-bit",
		load: () => import("../collections/80-bit.mjs").then((m) => m.eightyBit)
	},
	{
		key: "ballet",
		load: () => import("../collections/ballet.mjs").then((m) => m.ballet)
	},
	{
		key: "bitaddress",
		load: () => import("../collections/bitaddress.mjs").then((m) => m.bitaddress)
	},
	{
		key: "bitaps",
		load: () => import("../collections/bitaps.mjs").then((m) => m.bitaps)
	},
	{
		key: "bitimage",
		load: () => import("../collections/bitimage.mjs").then((m) => m.bitimage)
	},
	{
		key: "bits",
		load: () => import("../collections/bits.mjs").then((m) => m.bits)
	},
	{
		key: "book-quiz",
		load: () => import("../collections/book-quiz.mjs").then((m) => m.bookQuiz)
	},
	{
		key: "brave-new-world",
		load: () => import("../collections/brave-new-world.mjs").then((m) => m.braveNewWorld)
	},
	{
		key: "coin-artist",
		load: () => import("../collections/coin-artist.mjs").then((m) => m.coinArtist)
	},
	{
		key: "coin-games",
		load: () => import("../collections/coin-games.mjs").then((m) => m.coinGames)
	},
	{
		key: "doges-gambit",
		load: () => import("../collections/doges-gambit.mjs").then((m) => m.dogesGambit)
	},
	{
		key: "dug",
		load: () => import("../collections/dug.mjs").then((m) => m.dug)
	},
	{
		key: "genesis",
		load: () => import("../collections/genesis.mjs").then((m) => m.genesis)
	},
	{
		key: "great-riddle",
		load: () => import("../collections/great-riddle.mjs").then((m) => m.greatRiddle)
	},
	{
		key: "grycoin",
		load: () => import("../collections/grycoin.mjs").then((m) => m.grycoin)
	},
	{
		key: "gsmg",
		load: () => import("../collections/gsmg.mjs").then((m) => m.gsmg)
	},
	{
		key: "hash-collision",
		load: () => import("../collections/hash-collision.mjs").then((m) => m.hashCollision)
	},
	{
		key: "hunting-time",
		load: () => import("../collections/hunting-time.mjs").then((m) => m.huntingTimeCollection)
	},
	{
		key: "iamabananaamaa",
		load: () => import("../collections/iamabananaamaa.mjs").then((m) => m.iAmABananaAmaa)
	},
	{
		key: "ledger-donjon",
		load: () => import("../collections/ledger-donjon.mjs").then((m) => m.ledgerDonjon)
	},
	{
		key: "liberte-guidant-le-peuple",
		load: () => import("../collections/liberte-guidant-le-peuple.mjs").then((m) => m.liberteGuidantLePeupleCollection)
	},
	{
		key: "luckylurker",
		load: () => import("../collections/luckylurker.mjs").then((m) => m.luckyLurker)
	},
	{
		key: "mineshop",
		load: () => import("../collections/mineshop.mjs").then((m) => m.mineshop)
	},
	{
		key: "mini",
		load: () => import("../collections/mini.mjs").then((m) => m.mini)
	},
	{
		key: "move-over-brokers",
		load: () => import("../collections/move-over-brokers.mjs").then((m) => m.moveOverBrokers)
	},
	{
		key: "movie-enigma",
		load: () => import("../collections/movie-enigma.mjs").then((m) => m.movieEnigma)
	},
	{
		key: "natasha-otomoski",
		load: () => import("../collections/natasha-otomoski.mjs").then((m) => m.natashaOtomoski)
	},
	{
		key: "path-to-greatness",
		load: () => import("../collections/path-to-greatness.mjs").then((m) => m.pathToGreatness)
	},
	{
		key: "phy",
		load: () => import("../collections/phy.mjs").then((m) => m.phy)
	},
	{
		key: "picture-puzzle",
		load: () => import("../collections/picture-puzzle.mjs").then((m) => m.picturePuzzle)
	},
	{
		key: "powerful-moss",
		load: () => import("../collections/powerful-moss.mjs").then((m) => m.powerfulMoss)
	},
	{
		key: "proof-of-writing",
		load: () => import("../collections/proof-of-writing.mjs").then((m) => m.proofOfWriting)
	},
	{
		key: "quizchain",
		load: () => import("../collections/quizchain.mjs").then((m) => m.quizchain)
	},
	{
		key: "quizchain2",
		load: () => import("../collections/quizchain2.mjs").then((m) => m.quizchain2)
	},
	{
		key: "real-big-block",
		load: () => import("../collections/real-big-block.mjs").then((m) => m.realBigBlock)
	},
	{
		key: "rushwallet",
		load: () => import("../collections/rushwallet.mjs").then((m) => m.rushwallet)
	},
	{
		key: "satoshi-birthday-quiz",
		load: () => import("../collections/satoshi-birthday-quiz.mjs").then((m) => m.satoshiBirthdayQuiz)
	},
	{
		key: "satoshi-maze",
		load: () => import("../collections/satoshi-maze.mjs").then((m) => m.satoshiMaze)
	},
	{
		key: "school-of-bitcoin",
		load: () => import("../collections/school-of-bitcoin.mjs").then((m) => m.schoolOfBitcoin)
	},
	{
		key: "seed-phrase",
		load: () => import("../collections/seed-phrase.mjs").then((m) => m.seedPhrase)
	},
	{
		key: "smith-lyle-moore",
		load: () => import("../collections/smith-lyle-moore.mjs").then((m) => m.smithLyleMoore)
	},
	{
		key: "teikhos",
		load: () => import("../collections/teikhos.mjs").then((m) => m.teikhos)
	},
	{
		key: "trivia-brainwallet",
		load: () => import("../collections/trivia-brainwallet.mjs").then((m) => m.triviaBrainwallet)
	},
	{
		key: "walking-banks",
		load: () => import("../collections/walking-banks.mjs").then((m) => m.walkingBanks)
	},
	{
		key: "warp",
		load: () => import("../collections/warp.mjs").then((m) => m.warp)
	},
	{
		key: "wealth-in-poetry",
		load: () => import("../collections/wealth-in-poetry.mjs").then((m) => m.wealthInPoetry)
	},
	{
		key: "weave",
		load: () => import("../collections/weave.mjs").then((m) => m.weave)
	},
	{
		key: "wickex",
		load: () => import("../collections/wickex.mjs").then((m) => m.wickex)
	},
	{
		key: "zden",
		load: () => import("../collections/zden.mjs").then((m) => m.zden)
	}
];
const aliases = /* @__PURE__ */ new Map([
	["peter_todd", "hash-collision"],
	["warpwallet", "warp"],
	["b1000", "bits"],
	["book_quiz", "book-quiz"],
	["brave_new_world", "brave-new-world"],
	["coin_artist", "coin-artist"],
	["hash_collision", "hash-collision"],
	["ledger_donjon", "ledger-donjon"],
	["movie_enigma", "movie-enigma"],
	["picture_puzzle", "picture-puzzle"],
	["satoshi_birthday_quiz", "satoshi-birthday-quiz"]
]);
let entries;
let snapshot;
const pending = /* @__PURE__ */ new Map();
let importing = Promise.resolve();
function table() {
	entries ??= new Map(builtins.map((entry) => [entry.key, entry]));
	return entries;
}
function canonical(name) {
	return aliases.get(name) ?? name;
}
function isEntry(value) {
	return "load" in value && typeof value.load === "function";
}
function load(entry) {
	if (entry.instance !== void 0) return Promise.resolve(entry.instance);
	const cached = pending.get(entry.key);
	if (cached !== void 0) return cached;
	const builtin = builtins.includes(entry);
	const promise = (builtin ? importing : Promise.resolve()).then(() => entry.load());
	if (builtin) importing = promise.catch(() => void 0);
	if (table().get(entry.key) === entry) {
		pending.set(entry.key, promise);
		promise.catch(() => {
			if (pending.get(entry.key) === promise) pending.delete(entry.key);
		});
	}
	return promise;
}
function registerCollection(collection) {
	const entry = isEntry(collection) ? collection : {
		key: collection.key,
		instance: collection,
		load: () => Promise.resolve(collection)
	};
	if (entry.instance !== void 0 && table().get(entry.key)?.instance === entry.instance) return;
	table().set(entry.key, entry);
	pending.delete(entry.key);
	snapshot = void 0;
}
function collectionKeys() {
	return [...table().keys()];
}
function hasCollection(name) {
	return table().has(canonical(name));
}
async function getCollection(name) {
	const entry = table().get(canonical(name));
	return entry === void 0 ? void 0 : load(entry);
}
async function requireCollection(name) {
	const collection = await getCollection(name);
	if (collection === void 0) throw new UnknownCollectionError(name, knownCollections(name));
	return collection;
}
function knownCollections(miss) {
	const keys = collectionKeys();
	return missDetail(typeof miss === "string" ? closestKey(miss, keys) : void 0, "collections", keys);
}
async function collections() {
	const pending = snapshot ??= (async () => {
		const queued = [...table().values()];
		const loaded = [];
		for (const entry of queued) loaded.push(await load(entry));
		return Object.freeze(loaded);
	})();
	try {
		return await pending;
	} catch (error) {
		if (snapshot === pending) snapshot = void 0;
		throw error;
	}
}
export { builtins, collectionKeys, collections, getCollection, hasCollection, knownCollections, registerCollection, requireCollection };
