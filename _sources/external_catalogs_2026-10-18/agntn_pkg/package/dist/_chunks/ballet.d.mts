import { Chain, Collection, Hint, NamedCollection, NumericCollection, Party, Puzzle, PuzzleData, Status, TechniqueTag } from "./collection.mjs";
import { Technique } from "./technique.mjs";
import { EightyBitCollection } from "./80-bit.mjs";
import { BitaddressCollection } from "./bitaddress.mjs";
import { BitapsCollection } from "./bitaps.mjs";
import { BookQuizCollection } from "./book-quiz.mjs";
import { BraveNewWorldCollection } from "./brave-new-world.mjs";
import { GenesisCollection } from "./genesis.mjs";
import { GreatRiddleCollection } from "./great-riddle.mjs";
import { GsmgCollection } from "./gsmg.mjs";
import { HuntingTimeCollection } from "./hunting-time.mjs";
import { LiberteGuidantLePeupleCollection } from "./liberte-guidant-le-peuple.mjs";
import { MineshopCollection } from "./mineshop.mjs";
import { MovieEnigmaCollection } from "./movie-enigma.mjs";
import { NatashaOtomoskiCollection } from "./natasha-otomoski.mjs";
import { PathToGreatnessCollection } from "./path-to-greatness.mjs";
import { PhyCollection } from "./phy.mjs";
import { PicturePuzzleCollection } from "./picture-puzzle.mjs";
import { PowerfulMossCollection } from "./powerful-moss.mjs";
import { ProofOfWritingCollection } from "./proof-of-writing.mjs";
import { RealBigBlockCollection } from "./real-big-block.mjs";
import { SatoshiBirthdayQuizCollection } from "./satoshi-birthday-quiz.mjs";
import { SatoshiMazeCollection } from "./satoshi-maze.mjs";
import { SchoolOfBitcoinCollection } from "./school-of-bitcoin.mjs";
import { SeedPhraseCollection } from "./seed-phrase.mjs";
import { TriviaBrainwalletCollection } from "./trivia-brainwallet.mjs";
import { WealthInPoetryCollection } from "./wealth-in-poetry.mjs";
/** Package version. */
export declare const version: string;
/** Keys derived from image files as BIP39 entropy. */
export declare class BitimageCollection extends NamedCollection {
  /** Stable collection key used in puzzle identifiers. */
  static readonly key = "bitimage";
  /** Who published the puzzles. */
  static readonly author: Party;
  /** Every puzzle in this collection. */
  static readonly puzzles: Puzzle[];
  /** Builds the canonical collection. */
  constructor();
}
/** Canonical collection instance. */
export declare const bitimage: BitimageCollection;
/** Bitcoin Puzzle Transaction, addressed by puzzle number. */
export declare class BitsCollection extends NumericCollection {
  /** Stable collection key used in puzzle identifiers. */
  static readonly key = "bits";
  /** Who published the puzzles. */
  static readonly author: Party;
  /** What the author said about the keys, in the one post the account ever made. */
  static readonly hints: Hint[];
  /** Every puzzle in this collection. */
  static readonly puzzles: Puzzle[];
  /** Techniques every puzzle in this collection was built with. */
  static readonly techniques: TechniqueTag[];
  /** Builds the canonical collection. */
  constructor();
}
/** Canonical collection instance. */
export declare const bits: BitsCollection;
/** Public art puzzles by coin_artist. */
export declare class CoinArtistCollection extends NamedCollection {
  /** Stable collection key used in puzzle identifiers. */
  static readonly key = "coin-artist";
  /** The painter collaborated with Rhea Myers on the encoding. */
  static readonly author: Party;
  /** The final painting, not the earlier stages of the hunt. */
  static readonly puzzles: Puzzle[];
  /** Builds the canonical collection. */
  constructor();
}
/** Canonical collection instance. */
export declare const coinArtist: CoinArtistCollection;
/** The three funded weeks of Coin_Pro's 2017 banknote puzzles. */
export declare class CoinGamesCollection extends NamedCollection {
  /** Stable collection key used in puzzle identifiers. */
  static readonly key = "coin-games";
  /** Coin_Pro runs the Coin_Games site on Webnode. */
  static readonly author: Party;
  /** One record per funded week, numbered the way the site numbers them. */
  static readonly puzzles: Puzzle[];
  /** Builds the canonical collection. */
  constructor();
}
/** Canonical collection instance. */
export declare const coinGames: CoinGamesCollection;
/**
 * Doge's Gambit by Crypto Puzzlers: one chess board video with an Ether key and a Dogecoin key in
 * its frames, two puzzles and two records.
 */
export declare class DogesGambitCollection extends NamedCollection {
  /** Stable collection key used in puzzle identifiers. */
  static readonly key = "doges-gambit";
  /** One person behind a YouTube channel and a Reddit account of the same name. */
  static readonly author: Party;
  /** Every puzzle in this collection. */
  static readonly puzzles: Puzzle[];
  /** Builds the canonical collection. */
  constructor();
}
/** Canonical collection instance. */
export declare const dogesGambit: DogesGambitCollection;
/** The three funded targets in Dug's 2025 student treasure hunt. */
export declare class DugCollection extends NamedCollection {
  /** Stable collection key used in puzzle identifiers. */
  static readonly key = "dug";
  /** Dug publishes the lecture clues on Nostr. */
  static readonly author: Party;
  /** One record per funded BIP84 address. */
  static readonly puzzles: Puzzle[];
  /** All three targets use the same seed phrase. */
  static readonly hints: Hint[];
  /** Builds the canonical collection. */
  constructor();
}
/** Canonical collection instance. */
export declare const dug: DugCollection;
/** The Grycoin chain, AoiNakamoto's last blocks on r/Grycoin, addressed by block number. */
export declare class GrycoinCollection extends NumericCollection {
  /** Stable collection key used in puzzle identifiers. */
  static readonly key = "grycoin";
  /** Who published the blocks: the same account as both Quizchain runs. */
  static readonly author: Party;
  /** Every puzzle in this collection. */
  static readonly puzzles: Puzzle[];
  /** Builds the canonical collection. */
  constructor();
}
/** Canonical collection instance. */
export declare const grycoin: GrycoinCollection;
/** Peter Todd's P2SH hash-collision bounties. */
export declare class HashCollisionCollection extends NamedCollection {
  /** Stable collection key used in puzzle identifiers. */
  static readonly key = "hash-collision";
  /** Who published the puzzles. */
  static readonly author: Party;
  /** Every puzzle in this collection. */
  static readonly puzzles: Puzzle[];
  /** Builds the canonical collection. */
  constructor();
}
/** Canonical collection instance. */
export declare const hashCollision: HashCollisionCollection;
/** IAMABananaAMAA's puzzles from the opening days of r/bitcoinpuzzles. */
export declare class IAmABananaAmaaCollection extends NamedCollection {
  /** Stable collection key used in puzzle identifiers. */
  static readonly key = "iamabananaamaa";
  /** Who published the puzzles. */
  static readonly author: Party;
  /** Every puzzle in this collection. */
  static readonly puzzles: Puzzle[];
  /** Builds the canonical collection. */
  constructor();
}
/** Canonical collection instance. */
export declare const iAmABananaAmaa: IAmABananaAmaaCollection;
/** Ledger Donjon's Capture the Fortress CTF challenges with published wallet targets. */
export declare class LedgerDonjonCollection extends NamedCollection {
  /** Stable collection key used in puzzle identifiers. */
  static readonly key = "ledger-donjon";
  /** Who published the challenges. */
  static readonly author: Party;
  /** Every puzzle in this collection. */
  static readonly puzzles: Puzzle[];
  /** Builds the canonical collection. */
  constructor();
}
/** Canonical collection instance. */
export declare const ledgerDonjon: LedgerDonjonCollection;
/** Bitcoin seed riddles published by LuckyLurker. */
export declare class LuckyLurkerCollection extends NamedCollection {
  /** Stable collection key used in puzzle identifiers. */
  static readonly key = "luckylurker";
  /** Paul Jones publishes the Vaults as Paul_LuckyLurker on Bitcointalk. */
  static readonly author: Party;
  /** Every puzzle in this collection. */
  static readonly puzzles: Puzzle[];
  /** Builds the canonical collection. */
  constructor();
}
/** Canonical collection instance. */
export declare const luckyLurker: LuckyLurkerCollection;
/**
 * RetiredCoder's mini-puzzles, numbered as the author numbered them. Four are built on a solved
 * Bitcoin puzzle and pay out the Bitcoin Cash still on that puzzle's address; #4 to #6 put 0.01 BTC
 * on a fresh key.
 */
export declare class MiniCollection extends NumericCollection {
  /** Stable collection key used in puzzle identifiers. */
  static readonly key = "mini";
  /** Who posted the mini-puzzles: the solver of bits/120, 125, 130 and 135. */
  static readonly author: Party;
  /** Every puzzle in this collection, oldest first. */
  static readonly puzzles: Puzzle[];
  /** Builds the canonical collection. */
  constructor();
}
/** Canonical collection instance. */
export declare const mini: MiniCollection;
/** Keir Finlow-Bates's book hunt: eight keys in English, four in Italian, 0.002 BTC each. */
export declare class MoveOverBrokersCollection extends NamedCollection {
  /** Stable collection key used in puzzle identifiers. */
  static readonly key = "move-over-brokers";
  /** Who wrote the book and funded the lots. */
  static readonly author: Party;
  /** Every lot, the English ones first, each edition from easy to very hard. */
  static readonly puzzles: Puzzle[];
  /** Builds the canonical collection. */
  constructor();
}
/** Canonical collection instance. */
export declare const moveOverBrokers: MoveOverBrokersCollection;
/** Quizchain, AoiNakamoto's numbered blocks on r/bitcoinpuzzles, addressed by block number. */
export declare class QuizchainCollection extends NumericCollection {
  /** Stable collection key used in puzzle identifiers. */
  static readonly key = "quizchain";
  /** Who published the blocks: the account behind the birthday and book quizzes. */
  static readonly author: Party;
  /** Every puzzle in this collection. */
  static readonly puzzles: Puzzle[];
  /** Builds the canonical collection. */
  constructor();
}
/** Canonical collection instance. */
export declare const quizchain: QuizchainCollection;
/** Quizchain2, AoiNakamoto's second run of numbered blocks on r/bitcoinpuzzles, addressed by block number. */
export declare class Quizchain2Collection extends NumericCollection {
  /** Stable collection key used in puzzle identifiers. */
  static readonly key = "quizchain2";
  /** Who published the blocks: the same account as the first run. */
  static readonly author: Party;
  /** Every puzzle in this collection. */
  static readonly puzzles: Puzzle[];
  /** Builds the canonical collection. */
  constructor();
}
/** Canonical collection instance. */
export declare const quizchain2: Quizchain2Collection;
/** KryptoKit RushWallet brainwallet contest, 2014. */
export declare class RushwalletCollection extends NamedCollection {
  /** Stable collection key used in puzzle identifiers. */
  static readonly key = "rushwallet";
  /** Who published the puzzles. */
  static readonly author: Party;
  /** Every puzzle in this collection. */
  static readonly puzzles: Puzzle[];
  /** The contest's shared starting clue. */
  static readonly hints: Hint[];
  /** Techniques every puzzle in this collection was built with. */
  static readonly techniques: TechniqueTag[];
  /** Builds the canonical collection. */
  constructor();
}
/** Canonical collection instance. */
export declare const rushwallet: RushwalletCollection;
/** Smith, Lyle & Moore's treasure hunts, one per single. */
export declare class SmithLyleMooreCollection extends NamedCollection {
  /** Stable collection key used in puzzle identifiers. */
  static readonly key = "smith-lyle-moore";
  /** The band that funded both hunts. */
  static readonly author: Party;
  /** Both hunts, in funding order. */
  static readonly puzzles: Puzzle[];
  /** Builds the canonical collection. */
  constructor();
}
/** Canonical collection instance. */
export declare const smithLyleMoore: SmithLyleMooreCollection;
/**
 * Johan Nygren's TeikhosBounty contracts: each pays whoever submits the public key its stored
 * proof was masked with. Numbered in deployment order from 0, the first one, which cannot pay.
 */
export declare class TeikhosCollection extends NumericCollection {
  /** Stable collection key used in puzzle identifiers. */
  static readonly key = "teikhos";
  /** Deployed and funded every contract from one address in 2018. */
  static readonly author: Party;
  /** Every contract, in deployment order. */
  static readonly puzzles: Puzzle[];
  /** Builds the canonical collection. */
  constructor();
}
/** Canonical collection instance. */
export declare const teikhos: TeikhosCollection;
/** AH White's Walking Banks: a 24-word seed hidden in a thriller, two funded addresses. */
export declare class WalkingBanksCollection extends NamedCollection {
  /** Stable collection key used in puzzle identifiers. */
  static readonly key = "walking-banks";
  /** Who wrote the book and funded the wallet. */
  static readonly author: Party;
  /** One record per funded address of the seed, numbered from 1 in funding order. */
  static readonly puzzles: Puzzle[];
  /** Both addresses open with the same 24 words, so every hint is shared. */
  static readonly hints: Hint[];
  /** The author's own word for it: the seed's words sit in the book, in order. */
  static readonly techniques: TechniqueTag[];
  /** Builds the canonical collection. */
  constructor();
}
/** Canonical collection instance. */
export declare const walkingBanks: WalkingBanksCollection;
/** Keybase WarpWallet challenges. */
export declare class WarpCollection extends NamedCollection {
  /** Stable collection key used in puzzle identifiers. */
  static readonly key = "warp";
  /** Who published the puzzles. */
  static readonly author: Party;
  /** Every puzzle in this collection. */
  static readonly puzzles: Puzzle[];
  /** Techniques every puzzle in this collection was built with. */
  static readonly techniques: TechniqueTag[];
  /** Builds the canonical collection. */
  constructor();
}
/** Canonical collection instance. */
export declare const warp: WarpCollection;
/** Tiamat's Puzzle Weave series, keyed by the number in each page's title. */
export declare class WeaveCollection extends NumericCollection {
  /** Stable collection key used in puzzle identifiers. */
  static readonly key = "weave";
  /** Who published the puzzles. */
  static readonly author: Party;
  /** Every puzzle in this collection. */
  static readonly puzzles: Puzzle[];
  /** Builds the canonical collection. */
  constructor();
}
/** Canonical collection instance. */
export declare const weave: WeaveCollection;
/** Wickex's puzzle from the opening night of r/bitcoinpuzzles. */
export declare class WickexCollection extends NamedCollection {
  /** Stable collection key used in puzzle identifiers. */
  static readonly key = "wickex";
  /** Who published the puzzle. */
  static readonly author: Party;
  /** Every puzzle in this collection. */
  static readonly puzzles: Puzzle[];
  /** Builds the canonical collection. */
  constructor();
}
/** Canonical collection instance. */
export declare const wickex: WickexCollection;
/** Visual crypto puzzles by Zden. */
export declare class ZdenCollection extends NamedCollection {
  /** Stable collection key used in puzzle identifiers. */
  static readonly key = "zden";
  /** Who published the puzzles. */
  static readonly author: Party;
  /** Every puzzle in this collection. */
  static readonly puzzles: Puzzle[];
  /** Techniques every puzzle in this collection was built with. */
  static readonly techniques: TechniqueTag[];
  /** Builds the canonical collection. */
  constructor();
}
/** Canonical collection instance. */
export declare const zden: ZdenCollection;
/**
 * Every collection shipped with the package, in manifest order. Only the key lives here. A module
 * is imported on the first lookup for its key, so importing the package evaluates no records and a
 * bundler splits each collection into its own chunk. The list keeps its literal type, so
 * `getCollection("bits")` knows the query type of the collection it loads.
 */
export declare const builtins: readonly [{
  readonly key: "80-bit";
  readonly load: () => Promise<EightyBitCollection>;
}, {
  readonly key: "ballet";
  readonly load: () => Promise<BalletCollection>;
}, {
  readonly key: "bitaddress";
  readonly load: () => Promise<BitaddressCollection>;
}, {
  readonly key: "bitaps";
  readonly load: () => Promise<BitapsCollection>;
}, {
  readonly key: "bitimage";
  readonly load: () => Promise<BitimageCollection>;
}, {
  readonly key: "bits";
  readonly load: () => Promise<BitsCollection>;
}, {
  readonly key: "book-quiz";
  readonly load: () => Promise<BookQuizCollection>;
}, {
  readonly key: "brave-new-world";
  readonly load: () => Promise<BraveNewWorldCollection>;
}, {
  readonly key: "coin-artist";
  readonly load: () => Promise<CoinArtistCollection>;
}, {
  readonly key: "coin-games";
  readonly load: () => Promise<CoinGamesCollection>;
}, {
  readonly key: "doges-gambit";
  readonly load: () => Promise<DogesGambitCollection>;
}, {
  readonly key: "dug";
  readonly load: () => Promise<DugCollection>;
}, {
  readonly key: "genesis";
  readonly load: () => Promise<GenesisCollection>;
}, {
  readonly key: "great-riddle";
  readonly load: () => Promise<GreatRiddleCollection>;
}, {
  readonly key: "grycoin";
  readonly load: () => Promise<GrycoinCollection>;
}, {
  readonly key: "gsmg";
  readonly load: () => Promise<GsmgCollection>;
}, {
  readonly key: "hash-collision";
  readonly load: () => Promise<HashCollisionCollection>;
}, {
  readonly key: "hunting-time";
  readonly load: () => Promise<HuntingTimeCollection>;
}, {
  readonly key: "iamabananaamaa";
  readonly load: () => Promise<IAmABananaAmaaCollection>;
}, {
  readonly key: "ledger-donjon";
  readonly load: () => Promise<LedgerDonjonCollection>;
}, {
  readonly key: "liberte-guidant-le-peuple";
  readonly load: () => Promise<LiberteGuidantLePeupleCollection>;
}, {
  readonly key: "luckylurker";
  readonly load: () => Promise<LuckyLurkerCollection>;
}, {
  readonly key: "mineshop";
  readonly load: () => Promise<MineshopCollection>;
}, {
  readonly key: "mini";
  readonly load: () => Promise<MiniCollection>;
}, {
  readonly key: "move-over-brokers";
  readonly load: () => Promise<MoveOverBrokersCollection>;
}, {
  readonly key: "movie-enigma";
  readonly load: () => Promise<MovieEnigmaCollection>;
}, {
  readonly key: "natasha-otomoski";
  readonly load: () => Promise<NatashaOtomoskiCollection>;
}, {
  readonly key: "path-to-greatness";
  readonly load: () => Promise<PathToGreatnessCollection>;
}, {
  readonly key: "phy";
  readonly load: () => Promise<PhyCollection>;
}, {
  readonly key: "picture-puzzle";
  readonly load: () => Promise<PicturePuzzleCollection>;
}, {
  readonly key: "powerful-moss";
  readonly load: () => Promise<PowerfulMossCollection>;
}, {
  readonly key: "proof-of-writing";
  readonly load: () => Promise<ProofOfWritingCollection>;
}, {
  readonly key: "quizchain";
  readonly load: () => Promise<QuizchainCollection>;
}, {
  readonly key: "quizchain2";
  readonly load: () => Promise<Quizchain2Collection>;
}, {
  readonly key: "real-big-block";
  readonly load: () => Promise<RealBigBlockCollection>;
}, {
  readonly key: "rushwallet";
  readonly load: () => Promise<RushwalletCollection>;
}, {
  readonly key: "satoshi-birthday-quiz";
  readonly load: () => Promise<SatoshiBirthdayQuizCollection>;
}, {
  readonly key: "satoshi-maze";
  readonly load: () => Promise<SatoshiMazeCollection>;
}, {
  readonly key: "school-of-bitcoin";
  readonly load: () => Promise<SchoolOfBitcoinCollection>;
}, {
  readonly key: "seed-phrase";
  readonly load: () => Promise<SeedPhraseCollection>;
}, {
  readonly key: "smith-lyle-moore";
  readonly load: () => Promise<SmithLyleMooreCollection>;
}, {
  readonly key: "teikhos";
  readonly load: () => Promise<TeikhosCollection>;
}, {
  readonly key: "trivia-brainwallet";
  readonly load: () => Promise<TriviaBrainwalletCollection>;
}, {
  readonly key: "walking-banks";
  readonly load: () => Promise<WalkingBanksCollection>;
}, {
  readonly key: "warp";
  readonly load: () => Promise<WarpCollection>;
}, {
  readonly key: "wealth-in-poetry";
  readonly load: () => Promise<WealthInPoetryCollection>;
}, {
  readonly key: "weave";
  readonly load: () => Promise<WeaveCollection>;
}, {
  readonly key: "wickex";
  readonly load: () => Promise<WickexCollection>;
}, {
  readonly key: "zden";
  readonly load: () => Promise<ZdenCollection>;
}];
/** Any concrete collection, regardless of its query type. */
export type AnyCollection = Collection<number | string> | Collection<string> | Collection<string | void>;
/** One collection the registry knows: its key plus a loader for the canonical instance. */
export interface CollectionEntry {
  readonly key: string;
  /** Resolves the instance; for a built-in that's a literal `import()` of its module. */
  readonly load: () => Promise<AnyCollection>;
}
declare const aliasPairs: readonly [readonly ["peter_todd", "hash-collision"], readonly ["warpwallet", "warp"], readonly ["b1000", "bits"], readonly ["book_quiz", "book-quiz"], readonly ["brave_new_world", "brave-new-world"], readonly ["coin_artist", "coin-artist"], readonly ["hash_collision", "hash-collision"], readonly ["ledger_donjon", "ledger-donjon"], readonly ["movie_enigma", "movie-enigma"], readonly ["picture_puzzle", "picture-puzzle"], readonly ["satoshi_birthday_quiz", "satoshi-birthday-quiz"]];
type QueryOf<C> = C extends Collection<infer Query> ? Query : never;
type Builtin = (typeof builtins)[number];
type Alias = (typeof aliasPairs)[number];
/**
 * The collection type behind every built-in key and historical alias, by the query it takes: `bits`
 * is a `Collection<number | string>`, `gsmg` a `Collection<string | void>`. The type stays when a
 * registration replaces a built-in key, so a fork should take the same queries.
 */
export type BuiltinCollections = { readonly [E in Builtin as E["key"]]: Collection<QueryOf<Awaited<ReturnType<E["load"]>>>>; } & { readonly [A in Alias as A[0]]: Collection<QueryOf<Awaited<ReturnType<Extract<Builtin, {
  key: A[1];
}>["load"]>>>>; };
/** A built-in collection key or historical alias. */
export type BuiltinKey = keyof BuiltinCollections;
/**
 * Registers a collection under its stable key, or replaces what the key held. Built-ins are listed
 * already. This is the door for collections outside the package.
 *
 * @param {AnyCollection | CollectionEntry} collection - Collection instance or lazy entry.
 */
export declare function registerCollection(collection: AnyCollection | CollectionEntry): void;
/**
 * Every registered collection key in registration order, without loading anything.
 *
 * @returns {readonly string[]} The keys, nothing loaded.
 */
export declare function collectionKeys(): readonly string[];
/**
 * Whether a collection key or historical alias resolves, without loading anything.
 *
 * @param {string} name - Collection key or historical alias.
 * @returns {boolean} `true` for a known key or alias.
 */
export declare function hasCollection(name: string): boolean;
/**
 * Loads a collection by canonical key or historical alias. A built-in's module is imported on the
 * first call for its key, and parallel callers share that one import. A built-in key comes back typed
 * with its query, so `(await getCollection("bits")).get(71)` compiles.
 *
 * @param {string} name - Collection key or historical alias.
 * @returns {Promise<AnyCollection | undefined>} The collection, or `undefined` when no entry has that key.
 */
export declare function getCollection<K extends BuiltinKey>(name: K): Promise<BuiltinCollections[K]>;
export declare function getCollection(name: string): Promise<AnyCollection | undefined>;
/**
 * Loads a collection or throws a typed error. A built-in key comes back typed with its query, as in
 * `getCollection`.
 *
 * @param {string} name - Collection key or historical alias.
 * @returns {Promise<AnyCollection>} The collection.
 */
export declare function requireCollection<K extends BuiltinKey>(name: K): Promise<BuiltinCollections[K]>;
export declare function requireCollection(name: string): Promise<AnyCollection>;
/**
 * Loads every registered collection, in registration order, one module after another. The frozen
 * array is shared until the next registration, so callers can memoize on it.
 *
 * The loads are serial on purpose. Every collection module imports the same core modules, and a
 * host loader that re-evaluates a module per importer, such as the jiti loader Pi runs extensions
 * under, re-enters those shared modules when the imports overlap and hands the second importer a
 * half-initialized namespace. Twenty-four local modules cost nothing to load in order.
 *
 * @returns {Promise<readonly AnyCollection[]>} Every collection, loaded once and frozen.
 */
export declare function collections(): Promise<readonly AnyCollection[]>;
/** Aggregate puzzle statistics. */
export interface Stats {
  readonly claimed: number;
  readonly expired: number;
  readonly solved: number;
  readonly swept: number;
  /** How many puzzles use each technique, in vocabulary order, without the unused ones. */
  readonly techniques: TechniqueCounts;
  readonly total: number;
  readonly total_prize: Readonly<Record<string, number>>;
  readonly unsolved: number;
  readonly unsolved_prize: Readonly<Record<string, number>>;
  readonly with_pubkey: number;
}
/** How many puzzles use each technique. */
export type TechniqueCounts = Readonly<Partial<Record<Technique, number>>>;
/** One collection as it appears in a serialized dataset. Absent lists are omitted, never null. */
export interface DatasetCollection {
  readonly author: Party;
  readonly hints?: readonly Hint[];
  readonly name: string;
  readonly puzzles: readonly PuzzleData[];
  readonly techniques?: readonly TechniqueTag[];
}
/** Serializable snapshot of every registered collection. */
export interface Dataset {
  readonly collections: readonly DatasetCollection[];
  readonly data_version: string;
  readonly version: string;
}
/** One registered collection as every discovery surface lists it. */
export interface CollectionSummary {
  readonly author: string | undefined;
  readonly claimed: number;
  readonly expired: number;
  readonly key: string;
  readonly solved: number;
  readonly swept: number;
  readonly total: number;
  readonly unsolved: number;
}
/** One author: the record, its collections and how many of their puzzles use each technique. */
export interface AuthorEntry {
  readonly author: Party;
  readonly collections: readonly string[];
  readonly key: string;
  readonly puzzles: number;
  readonly techniques: TechniqueCounts;
}
/** One puzzle on a solver's record, with what the puzzle says about the solve. */
export interface SolveEntry {
  readonly chain: Chain;
  /** The prize's unit, the chain symbol unless the puzzle names another. */
  readonly currency: string;
  readonly id: string;
  readonly prize?: number;
  readonly solvedAt?: string;
  readonly status: Status;
}
/**
 * One solver as the registry sees it: the records of every puzzle credited to its key, joined into
 * one, and those puzzles in dataset order.
 */
export interface SolverEntry {
  /** Collections published by an author with the same key, the same party on the other side. */
  readonly authored: readonly string[];
  readonly collections: readonly string[];
  readonly key: string;
  readonly solver: Party;
  readonly solves: readonly SolveEntry[];
}
/** Optional constraints for selecting puzzles across the registry. */
export interface PuzzleQuery {
  readonly address?: string | undefined;
  readonly chain?: Chain | undefined;
  readonly collection?: string | undefined;
  readonly status?: Status | undefined;
  readonly technique?: Technique | undefined;
  readonly withPubkey?: boolean | undefined;
}
/**
 * Loads every collection and returns all puzzles in stable collection and class order.
 *
 * @returns {Promise<readonly Puzzle[]>} Every puzzle, in stable collection and class order.
 */
export declare function all(): Promise<readonly Puzzle[]>;
/**
 * Lists every registered collection with its author and status counts, in registration order.
 *
 * @returns {Promise<readonly CollectionSummary[]>} One summary per registered collection.
 */
export declare function collectionSummaries(): Promise<readonly CollectionSummary[]>;
/**
 * Every author in registration order, one entry per author key. A collection whose author has no
 * key of its own is listed under the collection's key, so every collection has an author page.
 *
 * @returns {Promise<readonly AuthorEntry[]>} One entry per author.
 */
export declare function authors(): Promise<readonly AuthorEntry[]>;
/**
 * Looks an author up by key, loading every collection.
 *
 * @param {string} key - The author key, or a collection key for an author without one.
 * @returns {Promise<AuthorEntry | undefined>} The author, or `undefined` when no collection names it.
 */
export declare function getAuthor(key: string): Promise<AuthorEntry | undefined>;
/**
 * Looks an author up or throws, naming the keys that do resolve.
 *
 * @param {string} key - The author key.
 * @returns {Promise<AuthorEntry>} The author.
 */
export declare function requireAuthor(key: string): Promise<AuthorEntry>;
/**
 * Every named solver in dataset order of its first solve, one entry per solver key. A solver
 * record without a key, which is every solver known only by the address it swept to, has no entry.
 *
 * @returns {Promise<readonly SolverEntry[]>} One entry per solver key.
 */
export declare function solvers(): Promise<readonly SolverEntry[]>;
/**
 * Looks a solver up by key, loading every collection.
 *
 * @param {string} key - The solver key.
 * @returns {Promise<SolverEntry | undefined>} The solver, or `undefined` when no puzzle credits it.
 */
export declare function getSolver(key: string): Promise<SolverEntry | undefined>;
/**
 * Looks a solver up or throws, naming the keys that do resolve.
 *
 * @param {string} key - The solver key.
 * @returns {Promise<SolverEntry>} The solver.
 */
export declare function requireSolver(key: string): Promise<SolverEntry>;
/**
 * Selects puzzles, optionally narrowed to one collection, a target address, a chain, a status,
 * a technique or a known public key.
 *
 * @param {PuzzleQuery} [query] - Query in the collection's own terms.
 * @returns {Promise<readonly Puzzle[]>} The puzzles that satisfy the query.
 */
export declare function selectPuzzles(query?: PuzzleQuery): Promise<readonly Puzzle[]>;
/**
 * Looks up a puzzle by its universal identifier, loading only its collection. A historical
 * alias in the collection segment resolves too, so `peter_todd/sha1` finds `hash-collision/sha1`.
 *
 * @param {string} id - Universal puzzle identifier.
 * @returns {Promise<Puzzle | undefined>} The puzzle, or `undefined` when no collection claims the identifier.
 */
export declare function get(id: string): Promise<Puzzle | undefined>;
/**
 * Looks up a puzzle or throws a typed not found error. The error says what the identifier's
 * collection does hold, or which collections exist when the identifier named none, so a caller
 * that guessed wrong recovers without a second lookup. When one puzzle explains the miss, the
 * error names it first: `BITS/71` and `bit/71` mean `bits/71`, and a bare `135` means the one
 * puzzle of that name, `bits/135`. A bare key of a collection with more than one puzzle names its
 * first and last, because `quizchain` alone is a shelf, not a puzzle.
 *
 * @param {string} id - Universal puzzle identifier.
 * @returns {Promise<Puzzle>} The puzzle.
 */
export declare function requirePuzzle(id: string): Promise<Puzzle>;
/**
 * Frozen aggregate statistics, cached for each registry snapshot.
 *
 * @returns {Promise<Stats>} Counts per status, the pubkey count and prize totals.
 */
export declare function stats(): Promise<Stats>;
/**
 * Every collection as serializable data, in registration order.
 *
 * @returns {Promise<readonly DatasetCollection[]>} One serializable entry per collection.
 */
export declare function datasetCollections(): Promise<readonly DatasetCollection[]>;
/**
 * A deterministic 12-character hash of the serialized puzzle data. It changes with the records and
 * nowhere else, so a consumer can cache a snapshot and compare it later without a build step.
 * It serializes the whole dataset on first use. Nothing time or environment dependent goes in.
 *
 * @returns {Promise<string>} The first 12 hex characters of SHA-256 over the serialized collections.
 */
export declare function dataVersion(): Promise<string>;
/**
 * The complete serializable dataset envelope, frozen over the memoized collections.
 *
 * @returns {Promise<Dataset>} `{ version, data_version, collections }`.
 */
export declare function dataset(): Promise<Dataset>;
/** Bobby Lee's Ballet Crypto physical wallet puzzles. */
export declare class BalletCollection extends NamedCollection {
  /** Stable collection key used in puzzle identifiers. */
  static readonly key = "ballet";
  /** Who published the puzzles. */
  static readonly author: Party;
  /** Every puzzle in this collection. */
  static readonly puzzles: Puzzle[];
  /** Techniques every puzzle in this collection was built with. */
  static readonly techniques: TechniqueTag[];
  /** Builds the canonical collection. */
  constructor();
}
/** Canonical collection instance. */
export declare const ballet: BalletCollection;