import { Technique } from "./technique.mjs";
import { BIP39Language } from "@agntn/keys/bip39";
/** Supported blockchain identifiers, a subset of the `@agntn/chains` keys. */
export declare const Chain: {
  readonly Arweave: "arweave";
  readonly Base: "base";
  readonly Bitcoin: "bitcoin";
  readonly BitcoinCash: "bitcoincash";
  readonly Decred: "decred";
  readonly Dogecoin: "dogecoin";
  readonly ECash: "ecash";
  readonly Ethereum: "ethereum";
  readonly Litecoin: "litecoin";
  readonly Monero: "monero";
};
/** A blockchain supported by the puzzle data. */
export type Chain = (typeof Chain)[keyof typeof Chain];
/** Every supported blockchain identifier. */
export declare const chains: readonly ("arweave" | "base" | "bitcoin" | "bitcoincash" | "decred" | "dogecoin" | "ecash" | "ethereum" | "litecoin" | "monero")[];
/**
 * The native currency symbol for a chain.
 *
 * @param {Chain} chain - Chain the value belongs to.
 * @returns {string} `BTC`, `ETH` and so on.
 */
export declare function chainSymbol(chain: Chain): string;
/**
 * The number of base unit decimal places in a chain's native token.
 *
 * @param {Chain} chain - Chain the value belongs to.
 * @returns {number} 8 for Bitcoin, 18 for Ethereum.
 */
export declare function chainDecimals(chain: Chain): number;
/**
 * The display name for a chain.
 *
 * @param {Chain} chain - Chain the value belongs to.
 * @returns {string} `Bitcoin`, `Ethereum` and so on.
 */
export declare function chainName(chain: Chain): string;
/**
 * Parses a chain key, display name, symbol, or `@agntn/chains` alias into a supported chain.
 *
 * @param {string} value - Chain key, display name, symbol, or alias.
 * @returns {Chain | undefined} The supported chain, or `undefined` when the value names none.
 */
export declare function parseChain(value: string): Chain | undefined;
/**
 * Builds a transaction explorer URL on the chain's default explorer.
 *
 * @param {Chain} chain - Chain the value belongs to.
 * @param {string} txid - Transaction identifier.
 * @returns {string} The transaction explorer URL.
 */
export declare function transactionExplorerUrl(chain: Chain, txid: string): string;
/**
 * Builds an address explorer URL on the chain's default explorer.
 *
 * @param {Chain} chain - Chain the value belongs to.
 * @param {string} address - Address to describe.
 * @returns {string} The address explorer URL.
 */
export declare function addressExplorerUrl(chain: Chain, address: string): string;
/**
 * Whether an address matches its chain's format rules.
 *
 * @param {Chain} chain - Chain the value belongs to.
 * @param {string} address - Address to describe.
 * @returns {boolean} `true` when the chain's format check passes.
 */
export declare function isValidAddress(chain: Chain, address: string): boolean;
/**
 * Whether a transaction identifier matches its chain's encoding.
 *
 * @param {Chain} chain - Chain the value belongs to.
 * @param {string} txid - Transaction identifier.
 * @returns {boolean} `true` when the chain's format check passes.
 */
export declare function isValidTransactionId(chain: Chain, txid: string): boolean;
/**
 * Whether two strings name the same address on one chain. Use it instead of `===` whenever one
 * side came from a person or a model: an Ethereum address pasted from a block explorer carries an
 * EIP-55 checksum the records do not, and a bech32 address is just as valid shouted in capitals.
 *
 * @param {Chain} chain - Chain both addresses live on.
 * @param {string} left - One address.
 * @param {string} right - The other address.
 * @returns {boolean} `true` when both name the same address.
 */
export declare function sameAddress(chain: Chain, left: string, right: string): boolean;
/** Base error for puzzle data access. */
export declare class PuzzlesError extends Error {
  readonly name: string;
}
/** Raised when a puzzle identifier can't be resolved. */
export declare class PuzzleNotFoundError extends PuzzlesError {
  readonly name = "PuzzleNotFoundError";
  /** The unresolved puzzle identifier. */
  readonly puzzleId: string;
  /**
   * Constructs a not found error for a puzzle identifier. The optional detail says what the
   * caller could have asked for instead, so a miss does not cost a second lookup.
   */
  constructor(puzzleId: string, detail?: string);
}
/** Raised when a caller supplied argument breaks the contract every surface shares. */
export declare class InvalidArgumentError extends PuzzlesError {
  readonly name = "InvalidArgumentError";
  /** The argument that failed. */
  readonly argument: string;
  /** Constructs an invalid argument error. */
  constructor(argument: string, reason: string);
}
/** Raised when an author key can't be resolved. */
export declare class UnknownAuthorError extends PuzzlesError {
  readonly name = "UnknownAuthorError";
  /** The unresolved author key. */
  readonly author: string;
  /** Constructs an unknown author error, with the keys that do resolve when known. */
  constructor(author: string, detail?: string);
}
/** Raised when a solver key can't be resolved. */
export declare class UnknownSolverError extends PuzzlesError {
  readonly name = "UnknownSolverError";
  /** The unresolved solver key. */
  readonly solver: string;
  /** Constructs an unknown solver error, with the keys that do resolve when known. */
  constructor(solver: string, detail?: string);
}
/** Raised when a collection name can't be resolved. */
export declare class UnknownCollectionError extends PuzzlesError {
  readonly name = "UnknownCollectionError";
  /** The unresolved collection name. */
  readonly collection: string;
  /** Constructs an unknown collection error, with the keys that do resolve when known. */
  constructor(collection: string, detail?: string);
}
/** Options for an online balance lookup through `@agntn/explorers`. */
export interface BalanceOptions {
  /** API key for the chain's provider. On Ethereum it picks Etherscan over Blockscout. */
  readonly apiKey?: string | undefined;
  /** Overrides the provider's default base URL. */
  readonly baseUrl?: string | undefined;
  /** Request timeout in milliseconds; providers default to 15 seconds. */
  readonly timeout?: number | undefined;
}
/** Base error for balance lookups. */
export declare class BalanceError extends PuzzlesError {
  readonly name: string;
}
/** Address rejected by a balance provider. */
export declare class InvalidAddressError extends BalanceError {
  readonly name = "InvalidAddressError";
}
/** Chain without a balance provider. */
export declare class UnsupportedChainError extends BalanceError {
  readonly name = "UnsupportedChainError";
}
/** Provider failed or returned an unexpected response. */
export declare class BalanceProviderError extends BalanceError {
  readonly name = "BalanceProviderError";
}
/** Immutable native token balance in base units. */
export declare class Balance {
  /** Confirmed base unit balance. */
  readonly confirmed: bigint;
  /** Chain whose native token is represented. */
  readonly chain: Chain;
  /** Number of decimal places in the native token, taken from the chain. */
  readonly decimals: number;
  /** Unconfirmed signed base unit balance. */
  readonly unconfirmed: bigint;
  /** Constructs a native token balance. */
  constructor(chain: Chain, confirmed: bigint, unconfirmed: bigint);
  /**
   * Returns confirmed plus unconfirmed base units.
   *
   * @returns {bigint} Confirmed plus unconfirmed base units.
   */
  total(): bigint;
  /**
   * Returns the confirmed balance in whole native token units. The double rounds a chain
   * with many decimal places; `confirmedAmount()` keeps every digit.
   *
   * @returns {number} The confirmed balance in whole native token units.
   */
  confirmedUnits(): number;
  /**
   * Returns the confirmed balance in whole native token units, exactly.
   *
   * @returns {string} The confirmed balance as a decimal string.
   */
  confirmedAmount(): string;
  /**
   * Returns the total balance in whole native token units. The double rounds a chain with
   * many decimal places; `totalAmount()` keeps every digit.
   *
   * @returns {number} The total balance in whole native token units.
   */
  totalUnits(): number;
  /**
   * Returns the total balance in whole native token units, exactly.
   *
   * @returns {string} The total balance as a decimal string.
   */
  totalAmount(): string;
}
/** Address encodings used by puzzle targets. */
export declare const AddressKind: {
  readonly P2PKH: "p2pkh";
  readonly P2SH: "p2sh";
  readonly P2WPKH: "p2wpkh";
  readonly P2WSH: "p2wsh";
  readonly Standard: "standard";
};
/** An address encoding. */
export type AddressKind = (typeof AddressKind)[keyof typeof AddressKind];
/** A P2SH redeem script and its HASH160. */
export interface RedeemScript {
  readonly hash: string;
  readonly script: string;
}
/** A puzzle target address. */
export interface Address {
  readonly hash160?: string;
  readonly kind: AddressKind;
  readonly redeem_script?: RedeemScript;
  readonly value: string;
}
/** Public key serializations. */
export declare const PubkeyFormat: {
  readonly Compressed: "compressed";
  readonly Uncompressed: "uncompressed";
};
/** A public key serialization. */
export type PubkeyFormat = (typeof PubkeyFormat)[keyof typeof PubkeyFormat];
/** A public key exposed by a puzzle address. */
export interface Pubkey {
  readonly format: PubkeyFormat;
  readonly value: string;
}
/** Transaction roles recorded for a puzzle address. */
export declare const TransactionType: {
  readonly Claim: "claim";
  readonly Decrease: "decrease";
  readonly Funding: "funding";
  readonly Increase: "increase";
  readonly PubkeyReveal: "pubkey_reveal";
  readonly Sweep: "sweep";
  readonly Transfer: "transfer";
};
/** A transaction role. */
export type TransactionType = (typeof TransactionType)[keyof typeof TransactionType];
/** A recorded on-chain transaction. */
export interface Transaction {
  readonly amount: number;
  readonly date: string;
  readonly tx_type: TransactionType;
  readonly txid: string;
}
/** A public profile link. */
export interface Profile {
  readonly name: string;
  readonly url: string;
}
/** What a party is: one person, or a company or team publishing under its name. */
export declare const PartyKind: {
  readonly Organization: "organization";
  readonly Person: "person";
};
/** A party's kind. */
export type PartyKind = (typeof PartyKind)[keyof typeof PartyKind];
/** One thing a public source states about a party, with where it was published. */
export interface Fact {
  readonly date?: string;
  readonly source: string;
  readonly text: string;
}
/**
 * A puzzle author or solver. An author or a solver with a `key` has a page of its own, and a solver
 * credited on several puzzles carries the same key on each, so the registry joins the records.
 */
export interface Party {
  readonly about?: string;
  readonly addresses?: readonly string[];
  readonly aliases?: readonly string[];
  readonly facts?: readonly Fact[];
  readonly key?: string;
  readonly kind?: PartyKind;
  readonly name?: string;
  readonly profiles?: readonly Profile[];
}
/** Everything a party record takes beside its display name. */
export interface PartyOptions {
  readonly about?: string;
  readonly addresses?: readonly string[];
  readonly aliases?: readonly string[];
  readonly facts?: readonly Fact[];
  readonly key?: string;
  readonly kind?: PartyKind;
  readonly profiles?: readonly Profile[];
}
/** A shipped file's SHA-256 and size, and the author's URL and capture that served those bytes. */
export interface Digest {
  readonly archive?: string;
  readonly bytes: number;
  readonly file: string;
  readonly sha256: string;
  readonly url?: string;
}
/** Files shipped with a puzzle. */
export interface Assets {
  readonly digests?: readonly Digest[];
  readonly hints?: readonly string[];
  readonly puzzle?: string;
  readonly solution?: string;
  readonly source_url?: string;
}
/** One thing the author published for a stage: where it lives, and the repository's copy. */
export interface Artifact {
  readonly file?: string;
  readonly name: string;
  readonly url: string;
}
/** One stage of a puzzle that runs in several: what it is, and what its author published for it. */
export interface Stage {
  readonly about: string;
  readonly answer?: Answer;
  readonly artifacts: readonly Artifact[];
  readonly name: string;
  readonly techniques?: readonly TechniqueTag[];
}
/** A technique from the vocabulary and the page that says it was used. */
export interface TechniqueTag {
  readonly name: Technique;
  readonly source: string;
}
/** Who gave a hint: the puzzle's author, or someone else. */
export declare const HintKind: {
  readonly Community: "community";
  readonly Official: "official";
};
/** A hint's origin. */
export type HintKind = (typeof HintKind)[keyof typeof HintKind];
/** An archive capture or another publication of the same hint by its author. */
export interface Confirmation {
  readonly description?: string;
  readonly url: string;
}
/** A published answer to one hint, not a verified solution of the puzzle. */
export interface Answer {
  readonly text: string;
  readonly source: string;
  readonly date?: string;
}
/** Optional hint metadata; an answer has its own source and publication date. */
export interface HintOptions {
  readonly date?: string;
  readonly answer?: Answer;
}
/**
 * A hint with its publication source and optional corroborating link, not a verdict on its truth.
 */
export interface Hint {
  readonly answer?: Answer;
  readonly confirmation?: Confirmation;
  readonly date?: string;
  readonly kind: HintKind;
  readonly source: string;
  readonly text: string;
}
/** Where external entropy came from. */
export interface EntropySource {
  readonly description?: string;
  readonly url?: string;
}
/** A known or required-but-unknown BIP39 passphrase. */
export type Passphrase = "Required" | {
  readonly Known: string;
};
/** External entropy used to derive a seed. */
export interface Entropy {
  readonly hash: string;
  readonly passphrase?: Passphrase;
  readonly source?: EntropySource;
}
/** Seed material and its derivation path, BIP39 unless `scheme` names another. */
export interface Seed {
  readonly entropy?: Entropy;
  /** The BIP39 word list the phrase comes from, when it isn't English. */
  readonly language?: BIP39Language;
  /** The passphrase published with the phrase, BIP39's or Electrum's seed extension. */
  readonly passphrase?: string;
  readonly path?: string;
  readonly phrase?: string;
  /** An Electrum seed, whose words BIP39 would turn into a different wallet. */
  readonly scheme?: "electrum";
  readonly xpub?: string;
}
/** Wallet Import Format material. */
export interface Wif {
  readonly decrypted?: string;
  readonly encrypted?: string;
  readonly passphrase?: string;
  readonly salt?: string;
}
/** One published secret sharing share. */
export interface Share {
  readonly data: string;
  readonly index: number;
}
/** Secret-sharing scheme metadata. */
export interface Shares {
  readonly shares: readonly Share[];
  readonly threshold: number;
  readonly total: number;
}
/** Serialized private key material. */
export interface KeyData {
  readonly bits?: number;
  /** No source printed the secret; the record rebuilt it from a published recipe. */
  readonly derived?: true;
  readonly hex?: string;
  readonly mini?: string;
  readonly seed?: Seed;
  readonly shares?: Shares;
  readonly wif?: Wif;
}
/** The one private key representation a key record exposes, in precedence order. */
export type Secret = {
  readonly kind: "hex";
  readonly hex: string;
} | {
  readonly kind: "wif";
  readonly wif: string;
} | {
  readonly kind: "encrypted";
  readonly encrypted: string;
} | {
  readonly kind: "seed";
  readonly phrase: string;
  readonly path?: string | undefined;
  readonly passphrase?: Passphrase | undefined;
  readonly language?: BIP39Language | undefined;
  readonly scheme?: "electrum" | undefined;
} | {
  readonly kind: "mini";
  readonly mini: string;
};
/**
 * The private key representation a key record exposes. `hasPrivateKey()` and verification read the
 * same answer, so a path or an xpub alone counts as no key for both.
 *
 * @param {KeyData | undefined} key - Serialized key material.
 * @returns {Secret | undefined} The secret, or `undefined` when the record has none.
 */
export declare function secretOf(key: KeyData | undefined): Secret | undefined;
/**
 * Builds a legacy pay-to-public key-hash address.
 *
 * @param {string} value - Encoded address.
 * @param {string} [hash160] - HASH160 of the public key, in hex.
 * @returns {Address} The legacy pay-to-public key-hash address.
 */
export declare function p2pkh(value: string, hash160?: string): Address;
/**
 * Builds a pay-to-witness-public key-hash address.
 *
 * @param {string} value - Encoded address.
 * @param {string} [hash160] - HASH160 of the public key, in hex.
 * @returns {Address} The pay-to-witness-public key-hash address.
 */
export declare function p2wpkh(value: string, hash160?: string): Address;
/**
 * Records a P2WSH address without assuming a witness script.
 *
 * @param {string} value - Encoded address.
 * @returns {Address} The P2WSH address record.
 */
export declare function p2wsh(value: string): Address;
/**
 * Builds a pay-to-script-hash address with its redeem script.
 *
 * @param {string} value - Encoded address.
 * @param {string} hash160 - HASH160 of the redeem script, in hex.
 * @param {RedeemScript} [redeemScript] - Redeem script, when the puzzle publishes it.
 * @returns {Address} The pay-to-script-hash address.
 */
export declare function p2sh(value: string, hash160: string, redeemScript?: RedeemScript): Address;
/**
 * Builds an address for chains without Bitcoin script kinds.
 *
 * @param {string} value - Encoded address.
 * @param {string} [hash160] - HASH160 of the public key, in hex.
 * @returns {Address} The address record.
 */
export declare function standard(value: string, hash160?: string): Address;
/**
 * Builds a redeem script record.
 *
 * @param {string} hash - HASH160 of the script, in hex.
 * @param {string} script - Redeem script in hex.
 * @returns {RedeemScript} The redeem script record.
 */
export declare function redeemScript(hash: string, script: string): RedeemScript;
/**
 * Marks a public key as compressed.
 *
 * @param {string} value - Public key in hex.
 * @returns {Pubkey} The public key.
 */
export declare function compressed(value: string): Pubkey;
/**
 * Marks a public key as uncompressed.
 *
 * @param {string} value - Public key in hex.
 * @returns {Pubkey} The public key.
 */
export declare function uncompressed(value: string): Pubkey;
/**
 * Private key material assembled through chained calls. Each call returns a new builder and every
 * record is frozen, so what a puzzle hands back through `key()` and `keyData()` stays as written.
 */
export declare class Key {
  #private;
  /** Starts an empty key record, or freezes the one it is given. */
  constructor(data?: KeyData);
  /**
   * Records the raw private key in hex, with an optional bit length.
   *
   * @param {string} value - Private key in hex.
   * @param {number} [bits] - Search space width in bits.
   * @returns {Key} A new builder with the value recorded.
   */
  hex(value: string, bits?: number): Key;
  /**
   * Records the search space width in bits.
   *
   * @param {number} value - Search space width in bits.
   * @returns {Key} A new builder with the value recorded.
   */
  bits(value: number): Key;
  /**
   * Records a decrypted Wallet Import Format key.
   *
   * @param {string} decrypted - Decrypted Wallet Import Format key.
   * @returns {Key} A new builder with the value recorded.
   */
  wif(decrypted: string): Key;
  /**
   * Records an encrypted BIP38 payload and, when known, its passphrase.
   *
   * @param {string} payload - Encrypted BIP38 payload.
   * @param {Readonly<{ passphrase?: string; salt?: string }>} [options] - Passphrase and salt, when known.
   * @returns {Key} A new builder with the value recorded.
   */
  encrypted(payload: string, options?: Readonly<{
    passphrase?: string;
    salt?: string;
  }>): Key;
  /**
   * Records the passphrase that produced the key.
   *
   * @param {string} value - Passphrase in clear text.
   * @returns {Key} A new builder with the value recorded.
   */
  passphrase(value: string): Key;
  /**
   * Records the salt the key derivation used, for example a WarpWallet email.
   *
   * @param {string} value - Salt string.
   * @returns {Key} A new builder with the value recorded.
   */
  salt(value: string): Key;
  /**
   * Records a seed phrase, its path and its passphrase, BIP39 unless `.electrum()` follows.
   *
   * @param {string} phrase - Mnemonic phrase as published.
   * @param {string} [path] - BIP32 derivation path.
   * @param {string} [passphrase] - BIP39 passphrase or Electrum seed extension, when published.
   * @returns {Key} A new builder with the value recorded.
   */
  seed(phrase: string, path?: string, passphrase?: string): Key;
  /**
   * Records the BIP39 word list a phrase comes from, for a phrase that isn't English.
   *
   * @param {BIP39Language} value - Word list name, such as `french`.
   * @returns {Key} A new builder with the value recorded.
   */
  language(value: BIP39Language): Key;
  /**
   * Marks the phrase as an Electrum seed, so verification salts it the way Electrum does.
   *
   * @returns {Key} A new builder with the scheme recorded.
   */
  electrum(): Key;
  /**
   * Records a derivation path without a known phrase.
   *
   * @param {string} value - BIP32 derivation path.
   * @returns {Key} A new builder with the value recorded.
   */
  path(value: string): Key;
  /**
   * Records the extended public key of a seed.
   *
   * @param {string} value - Extended public key.
   * @returns {Key} A new builder with the value recorded.
   */
  xpub(value: string): Key;
  /**
   * Records external entropy that seeds the key.
   *
   * @param {string} hash - Hash of the entropy, in hex.
   * @param {EntropySource} [source] - Where the entropy came from.
   * @param {Passphrase} [passphrase] - BIP39 passphrase, known or marked required.
   * @returns {Key} A new builder with the value recorded.
   */
  entropy(hash: string, source?: EntropySource, passphrase?: Passphrase): Key;
  /**
   * Marks the secret as derived: no source printed it, and the record rebuilt it from a recipe
   * the author published or confirmed. The recipe itself stays in the entropy source or a hint.
   *
   * @returns {Key} A new builder with the mark recorded.
   */
  derived(): Key;
  /**
   * Records a mini private key.
   *
   * @param {string} value - Mini private key.
   * @returns {Key} A new builder with the value recorded.
   */
  mini(value: string): Key;
  /**
   * Records a secret sharing scheme and its published shares.
   *
   * @param {number} threshold - Shares needed to recover the key.
   * @param {number} total - Shares issued in total.
   * @param {readonly Share[]} published - Shares the author published.
   * @returns {Key} A new builder with the value recorded.
   */
  shares(threshold: number, total: number, published: readonly Share[]): Key;
  /**
   * Returns the serializable key record.
   *
   * @returns {KeyData} The serializable key record.
   */
  data(): KeyData;
}
/**
 * Starts key material from a raw hex private key.
 *
 * @param {string} value - Private key in hex.
 * @param {number} [bits] - Search space width in bits.
 * @returns {Key} The builder, for chaining.
 */
export declare function hex(value: string, bits?: number): Key;
/**
 * Starts key material from a search space width.
 *
 * @param {number} value - Search space width in bits.
 * @returns {Key} The builder, for chaining.
 */
export declare function bits(value: number): Key;
/**
 * Starts key material from a decrypted Wallet Import Format key.
 *
 * @param {string} decrypted - Decrypted Wallet Import Format key.
 * @returns {Key} The builder, for chaining.
 */
export declare function wif(decrypted: string): Key;
/**
 * Starts key material from an encrypted BIP38 payload.
 *
 * @param {string} payload - Encrypted BIP38 payload.
 * @param {Readonly<{ passphrase?: string; salt?: string }>} [options] - Passphrase and salt, when known.
 * @returns {Key} The builder, for chaining.
 */
export declare function encryptedWif(payload: string, options?: Readonly<{
  passphrase?: string;
  salt?: string;
}>): Key;
/**
 * Starts key material from a known passphrase, with the key itself still unpublished.
 *
 * @param {string} value - Passphrase in clear text.
 * @returns {Key} The builder, for chaining.
 */
export declare function passphrase(value: string): Key;
/**
 * Starts key material from a seed phrase, BIP39 unless `.electrum()` follows.
 *
 * @param {string} phrase - Mnemonic phrase as published.
 * @param {string} [path] - BIP32 derivation path.
 * @param {string} [passphrase] - BIP39 passphrase or Electrum seed extension, when published.
 * @returns {Key} The builder, for chaining.
 */
export declare function seed(phrase: string, path?: string, passphrase?: string): Key;
/**
 * Starts key material from a derivation path alone.
 *
 * @param {string} path - BIP32 derivation path.
 * @returns {Key} The builder, for chaining.
 */
export declare function derivation(path: string): Key;
/**
 * Starts key material from a mini private key.
 *
 * @param {string} value - Mini private key.
 * @returns {Key} The builder, for chaining.
 */
export declare function mini(value: string): Key;
/**
 * Starts key material from a secret sharing scheme.
 *
 * @param {number} threshold - Shares needed to recover the key.
 * @param {number} total - Shares issued in total.
 * @param {readonly Share[]} published - Shares the author published.
 * @returns {Key} The builder, for chaining.
 */
export declare function shares(threshold: number, total: number, published: readonly Share[]): Key;
/**
 * One published secret sharing share.
 *
 * @param {number} index - Share index.
 * @param {string} data - Share payload as published.
 * @returns {Share} The share.
 */
export declare function share(index: number, data: string): Share;
/**
 * Builds an external entropy source.
 *
 * @param {string} url - Link target.
 * @param {string} [description] - Human-readable description.
 * @returns {EntropySource} The external entropy source.
 */
export declare function source(url: string, description?: string): EntropySource;
/**
 * Records the transaction that funded the puzzle address.
 *
 * @param {string} txid - Transaction identifier.
 * @param {string} date - Transaction time as `YYYY-MM-DD HH:MM:SS`.
 * @param {number} amount - Amount moved, in whole native units.
 * @returns {Transaction} The funding transaction.
 */
export declare function funding(txid: string, date: string, amount: number): Transaction;
/**
 * Records a top-up of the prize.
 *
 * @param {string} txid - Transaction identifier.
 * @param {string} date - Transaction time as `YYYY-MM-DD HH:MM:SS`.
 * @param {number} amount - Amount moved, in whole native units.
 * @returns {Transaction} The top-up transaction.
 */
export declare function increase(txid: string, date: string, amount: number): Transaction;
/**
 * Records a partial withdrawal by the author.
 *
 * @param {string} txid - Transaction identifier.
 * @param {string} date - Transaction time as `YYYY-MM-DD HH:MM:SS`.
 * @param {number} amount - Amount moved, in whole native units.
 * @returns {Transaction} The withdrawal transaction.
 */
export declare function decrease(txid: string, date: string, amount: number): Transaction;
/**
 * Records the transaction that exposed the public key.
 *
 * @param {string} txid - Transaction identifier.
 * @param {string} date - Transaction time as `YYYY-MM-DD HH:MM:SS`.
 * @param {number} amount - Amount moved, in whole native units.
 * @returns {Transaction} The public key reveal transaction.
 */
export declare function pubkeyReveal(txid: string, date: string, amount: number): Transaction;
/**
 * Records the transaction that collected the prize.
 *
 * @param {string} txid - Transaction identifier.
 * @param {string} date - Transaction time as `YYYY-MM-DD HH:MM:SS`.
 * @param {number} amount - Amount moved, in whole native units.
 * @returns {Transaction} The claim transaction.
 */
export declare function claim(txid: string, date: string, amount: number): Transaction;
/**
 * Records a sweep of the address by a third party.
 *
 * @param {string} txid - Transaction identifier.
 * @param {string} date - Transaction time as `YYYY-MM-DD HH:MM:SS`.
 * @param {number} amount - Amount moved, in whole native units.
 * @returns {Transaction} The sweep transaction.
 */
export declare function sweep(txid: string, date: string, amount: number): Transaction;
/**
 * Records a move between two addresses of one prize, which leaves the prize as it was.
 *
 * @param {string} txid - Transaction identifier.
 * @param {string} date - Transaction time as `YYYY-MM-DD HH:MM:SS`.
 * @param {number} amount - Amount moved, in whole native units.
 * @returns {Transaction} The transfer transaction.
 */
export declare function transfer(txid: string, date: string, amount: number): Transaction;
/**
 * Builds a public profile link.
 *
 * @param {string} name - Profile label, such as `website` or `twitter`.
 * @param {string} url - Link target.
 * @returns {Profile} The public profile link.
 */
export declare function profile(name: string, url: string): Profile;
/**
 * Records one thing a public source states about a party. It is the source's claim, not a verdict.
 *
 * @param {string} text - The statement, on one line.
 * @param {string} source - Where it was published.
 * @param {Readonly<{ date?: string }>} [options] - The publication date, when known.
 * @returns {Fact} The fact with absent metadata omitted.
 */
export declare function fact(text: string, source: string, options?: Readonly<{
  date?: string;
}>): Fact;
/**
 * Builds an author or solver record. An author gets a `key` and a `kind`, and so does a named
 * solver; what research found goes in `facts`, each with the page that states it.
 *
 * @param {string} [name] - Display name, when known.
 * @param {PartyOptions} [options] - Key, kind, aliases, addresses, profile links and sourced facts.
 * @returns {Party} The author or solver record.
 */
export declare function party(name?: string, options?: PartyOptions): Party;
/**
 * The asset record of a puzzle.
 *
 * @param {Readonly<{ digests?: readonly Digest[]; hints?: readonly string[]; puzzle?: string; solution?: string; sourceUrl?: string }>} options - File names under the collection's asset directory, their digests and their source.
 * @returns {Assets} The asset record.
 */
export declare function assets(options: Readonly<{
  digests?: readonly Digest[];
  hints?: readonly string[];
  puzzle?: string;
  solution?: string;
  sourceUrl?: string;
}>): Assets;
/**
 * Pins the bytes of one file the record ships, a stage artifact's copy included.
 *
 * @param {string} file - The file name under the collection's asset directory.
 * @param {string} sha256 - Its SHA-256 in lowercase hex.
 * @param {number} bytes - Its size.
 * @param {Readonly<{ archive?: string; url?: string }>} [origin] - The author's URL that served these bytes, and an archive capture of them.
 * @returns {Digest} The digest.
 */
export declare function digest(file: string, sha256: string, bytes: number, origin?: Readonly<{
  archive?: string;
  url?: string;
}>): Digest;
/**
 * Records one thing the author published for a stage.
 *
 * @param {string} name - What it is, as the stage shows it.
 * @param {string} url - Where the author published it.
 * @param {string} [file] - Its copy under the collection's asset directory, if the repo keeps one.
 * @returns {Artifact} The artifact.
 */
export declare function artifact(name: string, url: string, file?: string): Artifact;
/**
 * Records one stage of a puzzle, in the order its author runs them.
 *
 * @param {string} name - The stage's name, in the author's words when the author gives one.
 * @param {string} about - What the stage puts in front of you, on one line, without its answer.
 * @param {readonly Artifact[]} artifacts - What the author published for it.
 * @param {Answer} [solution] - The published answer that gets you past it, with its own source.
 * @param {readonly TechniqueTag[]} [used] - The techniques the stage was built with.
 * @returns {Stage} The stage.
 */
export declare function stage(name: string, about: string, artifacts: readonly Artifact[], solution?: Answer, used?: readonly TechniqueTag[]): Stage;
/**
 * Records that a puzzle or a stage was built with a technique.
 *
 * @param {Technique} name - The technique, from the vocabulary.
 * @param {string} source - The author's recipe or a published solution that says so.
 * @returns {TechniqueTag} The tag.
 */
export declare function technique(name: Technique, source: string): TechniqueTag;
/**
 * What confirms where a hint came from.
 *
 * @param {string} url - An archive or another page where the author published the same hint.
 * @param {string} [description] - What the link shows.
 * @returns {Confirmation} The confirmation.
 */
export declare function confirmation(url: string, description?: string): Confirmation;
/**
 * Records a published answer without changing the original hint.
 *
 * @param {string} text - The published answer, on one line.
 * @param {string} source - Where the answer was published.
 * @param {Readonly<{ date?: string }>} [options] - Its publication date, when known.
 * @returns {Answer} The answer with absent metadata omitted.
 */
export declare function answer(text: string, source: string, options?: Readonly<{
  date?: string;
}>): Answer;
/**
 * Records a hint the puzzle's author published.
 *
 * @param {string} text - The hint as the source states it, on one line.
 * @param {string} source - Where the author published it.
 * @param {Confirmation} [confirmation] - An optional archive or republication of this hint.
 * @param {HintOptions} [options] - The hint's publication date and any separately published answer.
 * @returns {Hint} The hint.
 */
export declare function official(text: string, source: string, confirmation?: Confirmation, options?: HintOptions): Hint;
/**
 * Records a hint someone other than the author gave, right or not.
 *
 * @param {string} text - The hint as the source states it, on one line.
 * @param {string} source - Where it was published.
 * @param {Confirmation} [confirmation] - An optional archive or republication of this hint.
 * @param {HintOptions} [options] - The hint's publication date and any separately published answer.
 * @returns {Hint} The hint.
 */
export declare function community(text: string, source: string, confirmation?: Confirmation, options?: HintOptions): Hint;
/** Puzzle lifecycle states. */
export declare const Status: {
  readonly Claimed: "claimed";
  readonly Expired: "expired";
  readonly Solved: "solved";
  readonly Swept: "swept";
  readonly Unsolved: "unsolved";
};
/** A puzzle lifecycle state. */
export type Status = (typeof Status)[keyof typeof Status];
/** Serialized puzzle record. Absent fields are omitted, never null. */
export interface PuzzleData {
  readonly address: Address;
  readonly assets?: Assets;
  readonly chain: Chain;
  readonly currency?: string;
  readonly escrow?: Address;
  readonly hints?: readonly Hint[];
  readonly id: string;
  readonly key?: KeyData;
  readonly pre_genesis?: boolean;
  readonly prize?: number;
  readonly pubkey?: Pubkey;
  readonly solve_date?: string;
  readonly solve_time?: number;
  readonly solver?: Party;
  readonly source_url: string;
  readonly stages?: readonly Stage[];
  readonly start_date: string;
  readonly status: Status;
  readonly techniques?: readonly TechniqueTag[];
  readonly transactions?: readonly Transaction[];
}
/** One file a puzzle ships: its role, its name, where it lives and what the record pins. */
export interface AssetLink {
  readonly archive?: string;
  readonly bytes?: number;
  readonly file: string;
  readonly kind: "puzzle" | "hint" | "solution" | "artifact";
  readonly origin?: string;
  readonly path: string;
  readonly sha256?: string;
  readonly url: string;
}
/**
 * One crypto puzzle. Subclasses say what the target is, what's known about its key and what
 * happened on chain. Everything computable from those answers lives here, rebuilt on every call:
 * only the instances themselves are cached.
 */
export declare abstract class Puzzle {
  /** Universal identifier shaped as `collection/name`, or the bare collection key for singletons. */
  abstract id(): string;
  /** Chain the target address lives on. */
  abstract chain(): Chain;
  /** Target address record. */
  abstract address(): Address;
  /** Page that documents the puzzle. */
  abstract sourceUrl(): string;
  /**
   * Contract that holds the prize and pays it out only to the target address, for a puzzle whose
   * key opens a wallet that then has to claim the prize from somewhere else.
   *
   * @returns {Address | undefined} The escrow contract, when the prize doesn't sit at the target.
   */
  escrow(): Address | undefined;
  /** When the puzzle was funded or announced. */
  abstract startedAt(): string;
  /**
   * Lifecycle state. Override for anything that isn't still open. It is stated, never derived: a
   * claim transaction plus a published key still means `solved`.
   *
   * @returns {Status} Lifecycle state. Override for anything that isn't still open.
   */
  status(): Status;
  /**
   * Public key, once the address exposed one.
   *
   * @returns {Pubkey | undefined} Public key, once the address exposed one.
   */
  pubkey(): Pubkey | undefined;
  /**
   * Private key material, as far as it's public.
   *
   * @returns {Readonly<Key> | undefined} Private key material, as far as it's public.
   */
  key(): Readonly<Key> | undefined;
  /**
   * Prize in the chain's native token unless `currency()` says otherwise.
   *
   * @returns {number | undefined} Prize in the chain's native token unless `currency()` says otherwise.
   */
  prize(): number | undefined;
  /**
   * Prize currency when it isn't the native token.
   *
   * @returns {string | undefined} Prize currency when it isn't the native token.
   */
  currency(): string | undefined;
  /**
   * When the puzzle was solved.
   *
   * @returns {string | undefined} When the puzzle was solved.
   */
  solvedAt(): string | undefined;
  /**
   * How long the puzzle stood, in seconds.
   *
   * @returns {number | undefined} How long the puzzle stood, in seconds.
   */
  solveTime(): number | undefined;
  /**
   * Whether the address predates the Bitcoin genesis block conventions.
   *
   * @returns {boolean} Whether the address predates the Bitcoin genesis block conventions.
   */
  preGenesis(): boolean;
  /**
   * Transactions recorded for the address, in chronological order.
   *
   * @returns {readonly Transaction[]} Transactions recorded for the address, in chronological order.
   */
  transactions(): readonly Transaction[];
  /**
   * Who solved it, when that's known.
   *
   * @returns {Party | undefined} Who solved it, when that's known.
   */
  solver(): Party | undefined;
  /**
   * Images and hints shipped with the puzzle.
   *
   * @returns {Assets | undefined} Images and hints shipped with the puzzle.
   */
  assets(): Assets | undefined;
  /**
   * The stages of a puzzle that runs in several, in the author's order, each with what the author
   * published for it.
   *
   * @returns {readonly Stage[]} The stages, or an empty list for a puzzle that runs in one.
   */
  stages(): readonly Stage[];
  /**
   * Hints about this puzzle alone, in record order; the collection's sit on `Collection.hints`.
   *
   * @returns {readonly Hint[]} The hints, or an empty list when the record has none.
   */
  hints(): readonly Hint[];
  /**
   * Techniques of this record alone; its stages and `Collection.techniques` hold their own.
   *
   * @returns {readonly TechniqueTag[]} The techniques, or an empty list when the record has none.
   */
  techniques(): readonly TechniqueTag[];
  /**
   * Collection segment of the identifier.
   *
   * @returns {string} Collection segment of the identifier.
   */
  collection(): string;
  /**
   * Name segment of the identifier, empty for singletons.
   *
   * @returns {string} Name segment of the identifier, empty for singletons.
   */
  name(): string;
  /**
   * Serializable key material.
   *
   * @returns {KeyData | undefined} Serializable key material.
   */
  keyData(): KeyData | undefined;
  /**
   * Prize currency, falling back to the chain's native symbol.
   *
   * @returns {string} Prize currency, falling back to the chain's native symbol.
   */
  prizeCurrency(): string;
  /**
   * Whether the public key is known.
   *
   * @returns {boolean} Whether the public key is known.
   */
  hasPubkey(): boolean;
  /**
   * Whether any private key representation is known.
   *
   * @returns {boolean} Whether any private key representation is known.
   */
  hasPrivateKey(): boolean;
  /**
   * Whether the private key is known only because the record rebuilt it from a published recipe,
   * not because a source printed it.
   *
   * @returns {boolean} Whether the known private key is derived.
   */
  hasDerivedKey(): boolean;
  /**
   * Fetches the current native token balance of the target address, plus its escrow's when the
   * prize waits in one: that sum is what the key would bring its finder.
   *
   * The `@agntn/explorers` provider for the chain loads on first use, so the
   * package imports without any network code. Dogecoin and Monero have no
   * provider and reject with `UnsupportedChainError`.
   *
   * @param {BalanceOptions} [options] - Lookup options.
   * @returns {Promise<Balance>} The current native token balance of the target address.
   */
  balance(options?: BalanceOptions): Promise<Balance>;
  /**
   * Inclusive key range implied by the declared bit length.
   *
   * @returns {readonly [bigint, bigint] | undefined} Inclusive key range implied by the declared bit length.
   */
  keyRange(): readonly [bigint, bigint] | undefined;
  /**
   * First transaction of a given role.
   *
   * @param {TransactionType} type - Transaction role.
   * @returns {Transaction | undefined} First transaction of a given role.
   */
  transaction(type: TransactionType): Transaction | undefined;
  /**
   * First funding transaction.
   *
   * @returns {Transaction | undefined} First funding transaction.
   */
  fundingTransaction(): Transaction | undefined;
  /**
   * First claim transaction.
   *
   * @returns {Transaction | undefined} First claim transaction.
   */
  claimTransaction(): Transaction | undefined;
  /**
   * Solve duration rendered with stable calendar approximations.
   *
   * @returns {string | undefined} Solve duration rendered with stable calendar approximations.
   */
  formattedSolveTime(): string | undefined;
  /**
   * Path from the repository root of the primary asset.
   *
   * @returns {string | undefined} Path from the repository root of the primary asset.
   */
  assetPath(): string | undefined;
  /**
   * Canonical remote URL of the primary asset.
   *
   * @returns {string | undefined} Canonical remote URL of the primary asset.
   */
  assetUrl(): string | undefined;
  /**
   * Every file the record ships, once each: the puzzle image as `assetPath()` and `assetUrl()`
   * answer it, then the hints, the solution and the stage artifacts, each with its path from the
   * repository root and its canonical remote URL.
   *
   * @returns {readonly AssetLink[]} The files, or an empty list when the record ships none.
   */
  assetLinks(): readonly AssetLink[];
  /**
   * Address explorer URL.
   *
   * @returns {string} Address explorer URL.
   */
  explorerUrl(): string;
  /**
   * Claim transaction explorer URL.
   *
   * @returns {string | undefined} Claim transaction explorer URL.
   */
  claimExplorerUrl(): string | undefined;
  /**
   * Serializes the puzzle, omitting everything it doesn't have. The record comes back frozen
   * through, so the dataset views built from it stay as written whatever a subclass hands over.
   *
   * @returns {PuzzleData} The serialized record without absent fields.
   */
  toJSON(): PuzzleData;
}
/** A puzzle whose target address lives on Bitcoin. */
export declare abstract class BitcoinPuzzle extends Puzzle {
  chain(): Chain;
}
/** A puzzle whose target address lives on Bitcoin Cash. */
export declare abstract class BitcoinCashPuzzle extends Puzzle {
  chain(): Chain;
}
/** A puzzle whose target address lives on Dogecoin. */
export declare abstract class DogecoinPuzzle extends Puzzle {
  chain(): Chain;
}
/** A puzzle whose target address lives on eCash. */
export declare abstract class ECashPuzzle extends Puzzle {
  chain(): Chain;
}
/** A puzzle whose target address lives on Ethereum. */
export declare abstract class EthereumPuzzle extends Puzzle {
  chain(): Chain;
}
/** A puzzle whose target address lives on Base, the Ethereum layer 2. */
export declare abstract class BasePuzzle extends Puzzle {
  chain(): Chain;
}
/** A puzzle whose target address lives on Litecoin. */
export declare abstract class LitecoinPuzzle extends Puzzle {
  chain(): Chain;
}
/** A puzzle whose target address lives on Decred. */
export declare abstract class DecredPuzzle extends Puzzle {
  chain(): Chain;
}
/** A puzzle whose target address lives on Arweave. */
export declare abstract class ArweavePuzzle extends Puzzle {
  chain(): Chain;
}
/** A puzzle whose target address lives on Monero. */
export declare abstract class MoneroPuzzle extends Puzzle {
  chain(): Chain;
}
/**
 * Static data record behind a puzzle a factory builds. An absent field means the puzzle doesn't have
 * it, like a missing override on a handwritten subclass. The factory freezes the record through, so
 * every accessor hands back the data as written and no caller can rewrite it for everyone else.
 */
export interface PuzzleSpec {
  readonly address: string | Address;
  readonly assets?: Assets;
  readonly chain: Chain;
  readonly currency?: string;
  readonly escrow?: string | Address;
  readonly hints?: readonly Hint[];
  readonly id: string;
  readonly key?: Readonly<Key>;
  readonly preGenesis?: boolean;
  readonly prize?: number;
  readonly pubkey?: Pubkey;
  readonly solvedAt?: string;
  readonly solveTime?: number;
  readonly solver?: Party;
  readonly sourceUrl: string;
  readonly stages?: readonly Stage[];
  readonly startedAt: string;
  readonly status?: Status;
  readonly techniques?: readonly TechniqueTag[];
  readonly transactions?: readonly Transaction[];
}
/**
 * Builds a puzzle from its data record, reading a string address on the record's chain.
 *
 * @param {PuzzleSpec} spec - The puzzle's data record.
 * @returns {Puzzle} The puzzle.
 * @throws {TypeError} When an address is not one the chain encodes.
 */
export declare function puzzle(spec: PuzzleSpec): Puzzle;
/** The recipes `verify` reruns, each named after the technique that marks it on a record. */
export type RecipeName = "bip39-entropy" | "sha256-brainwallet" | "triple-sha256-brainwallet" | "warpwallet";
/** A record's recipe rerun from scratch, judged apart from the key the record publishes. */
export interface RecipeResult {
  readonly derivedAddress: string | null;
  readonly error: string | null;
  /** Path the entropy took: the record's own, or the chain's first receive address. */
  readonly path?: string;
  readonly privateKey: string | null;
  readonly recipe: RecipeName;
  /** True when the recipe can't run at all, false when it ran and missed. */
  readonly unavailable: boolean;
  readonly verified: boolean;
}
/** Successful puzzle key verification. */
export interface VerifySuccess {
  readonly derivedAddress: string;
  readonly error: null;
  readonly expectedAddress: string;
  readonly id: string;
  readonly privateKey: string;
  /** The record's recipe, rerun, when it holds one. */
  readonly recipe?: RecipeResult;
  readonly verified: true;
}
/** Failed or unavailable puzzle key verification. */
export interface VerifyFailure {
  readonly derivedAddress: string | null;
  readonly error: string;
  readonly expectedAddress: string;
  readonly id: string;
  readonly privateKey: null;
  /** The record's recipe, rerun, when it holds one. */
  readonly recipe?: RecipeResult;
  /** True when the key material can't be checked at all, false when checkable material failed to match. */
  readonly unavailable: boolean;
  readonly verified: false;
}
/** Result of verifying a puzzle's known key material. */
export type VerifyResult = VerifySuccess | VerifyFailure;
/**
 * Verifies that a puzzle's known key material derives its stored address, and reruns its recipe
 * as a separate check. The first call loads the keys wallets; later calls reuse them.
 *
 * @param {Puzzle} puzzle - The puzzle.
 * @returns {Promise<VerifyResult>} The outcome, with the derived address when a key was available.
 */
export declare function verify(puzzle: Puzzle): Promise<VerifyResult>;
/**
 * A named set of puzzles. The subclass supplies identity, author, the list and the hints and
 * techniques every puzzle in it inherits. Everything a caller does with them lives here, once.
 */
export declare abstract class Collection<Query> {
  #private;
  /** Collection author. */
  readonly author: Party;
  /** Hints that hold for every puzzle in the collection, ahead of a puzzle's own. */
  readonly hints: readonly Hint[];
  /** Stable collection key used in puzzle identifiers. */
  readonly key: string;
  /** Techniques every puzzle in the collection was built with, ahead of a puzzle's own. */
  readonly techniques: readonly TechniqueTag[];
  /** Freezes the author, the hints, the techniques and the puzzle list, then indexes the list. */
  constructor(key: string, author: Party, puzzles: readonly Puzzle[], hints?: readonly Hint[], techniques?: readonly TechniqueTag[]);
  /** Turns a collection-specific query into a universal puzzle identifier. */
  protected abstract idFor(query: Query): string | undefined;
  /**
   * Every puzzle, in list order.
   *
   * @returns {readonly Puzzle[]} Every puzzle, in list order.
   */
  all(): readonly Puzzle[];
  /**
   * Looks up a puzzle, returning `undefined` when a miss is expected.
   *
   * @param {Query} query - Query in the collection's own terms.
   * @returns {Puzzle | undefined} The puzzle, or `undefined` when the collection has no such query.
   */
  get(query: Query): Puzzle | undefined;
  /**
   * Looks up a puzzle or throws.
   *
   * @param {Query} query - Query in the collection's own terms.
   * @returns {Puzzle} The matching puzzle.
   */
  require(query: Query): Puzzle;
  /**
   * Looks up a puzzle by its universal identifier.
   *
   * @param {string} id - Universal puzzle identifier.
   * @returns {Puzzle} The matching puzzle.
   */
  requireId(id: string): Puzzle;
  /**
   * Fetches the selected puzzle's current native token balance.
   *
   * @param {Query} query - Query in the collection's own terms.
   * @param {BalanceOptions} [options] - Lookup options.
   * @returns {Promise<Balance>} The selected puzzle's current native token balance.
   */
  balance(query: Query, options?: BalanceOptions): Promise<Balance>;
  /**
   * Fetches a balance through the universal identifier.
   *
   * @param {string} id - Universal puzzle identifier.
   * @param {BalanceOptions} [options] - Lookup options.
   * @returns {Promise<Balance>} The on-chain balance of the puzzle address.
   */
  balanceById(id: string, options?: BalanceOptions): Promise<Balance>;
  /**
   * Checks the selected puzzle's known key material against its address.
   *
   * @param {Query} query - Query in the collection's own terms.
   * @returns {Promise<VerifyResult>} The verification outcome.
   */
  verify(query: Query): Promise<VerifyResult>;
  /**
   * Checks key material through the universal identifier.
   *
   * @param {string} id - Universal puzzle identifier.
   * @returns {Promise<VerifyResult>} The verification outcome.
   */
  verifyById(id: string): Promise<VerifyResult>;
  /**
   * Every hint that holds for the selected puzzle: the collection's, then the puzzle's own.
   *
   * @param {Query} query - Query in the collection's own terms.
   * @returns {readonly Hint[]} The hints, or an empty list when neither recorded any.
   */
  hintsFor(query: Query): readonly Hint[];
  /**
   * Every hint that holds for a puzzle, through the universal identifier.
   *
   * @param {string} id - Universal puzzle identifier.
   * @returns {readonly Hint[]} The collection's hints, then the puzzle's own.
   */
  hintsById(id: string): readonly Hint[];
  /**
   * Every technique the selected puzzle was built with: collection, record, then stages.
   *
   * @param {Query} query - Query in the collection's own terms.
   * @returns {readonly TechniqueTag[]} The techniques, or an empty list when none is recorded.
   */
  techniquesFor(query: Query): readonly TechniqueTag[];
  /**
   * Every technique a puzzle was built with, through the universal identifier.
   *
   * @param {string} id - Universal puzzle identifier.
   * @returns {readonly TechniqueTag[]} The collection's, the puzzle's own, then its stages'.
   */
  techniquesById(id: string): readonly TechniqueTag[];
  /**
   * Solved puzzles.
   *
   * @returns {readonly Puzzle[]} Solved puzzles.
   */
  solved(): readonly Puzzle[];
  /**
   * Puzzles still open.
   *
   * @returns {readonly Puzzle[]} Puzzles still open.
   */
  unsolved(): readonly Puzzle[];
  /**
   * Puzzles whose public key is known.
   *
   * @returns {readonly Puzzle[]} Puzzles whose public key is known.
   */
  withPubkey(): readonly Puzzle[];
  /**
   * How many puzzles the collection holds.
   *
   * @returns {number} How many puzzles the collection holds.
   */
  count(): number;
  /**
   * How many are solved.
   *
   * @returns {number} How many are solved.
   */
  solvedCount(): number;
  /**
   * How many are still open.
   *
   * @returns {number} How many are still open.
   */
  unsolvedCount(): number;
}
/**
 * A collection addressed by string names, `decred-janus` or `zden/decred-janus`. A query of
 * another type is a miss, not a `TypeError`.
 */
export declare class NamedCollection extends Collection<string> {
  protected idFor(query: string): string | undefined;
}
/**
 * A collection addressed by puzzle numbers, `71`, `"71"` or `"bits/71"`. Only that spelling
 * resolves: `Number()` would read `"0x47"`, `" 71 "` and `"71.0"` as 71 and `"7e1"` as 70.
 */
export declare class NumericCollection extends Collection<number | string> {
  #private;
  protected idFor(query: number | string): string | undefined;
}
/** A collection holding one puzzle whose ID equals the collection key. */
export declare class SingletonCollection extends Collection<void | string> {
  /** Builds a singleton collection and rejects anything that isn't one. */
  constructor(key: string, author: Party, puzzles: readonly Puzzle[], hints?: readonly Hint[], techniques?: readonly TechniqueTag[]);
  protected idFor(query: void | string): string | undefined;
}