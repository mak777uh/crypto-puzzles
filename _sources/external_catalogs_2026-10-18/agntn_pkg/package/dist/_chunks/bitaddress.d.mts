import { Party, Puzzle, SingletonCollection } from "./collection.mjs";
/**
 * A bitaddress.org paper wallet whose BIP38 passphrase its owner forgot. q posted the encrypted
 * key and the address and gave the coins to whoever brute forces the passphrase. The payload is
 * the EC multiply kind, for an uncompressed key, and its address hash matches the address below.
 */
export declare const bruteForce: Puzzle;
/** Brute force and the coins are yours, one bitaddress.org paper wallet by q. */
export declare class BitaddressCollection extends SingletonCollection {
  /** Stable collection key used in puzzle identifiers. */
  static readonly key = "bitaddress";
  /** Who published the puzzle. */
  static readonly author: Party;
  /** Every puzzle in this collection. */
  static readonly puzzles: Puzzle[];
  /** Builds the canonical collection. */
  constructor();
}
/** Canonical collection instance. */
export declare const bitaddress: BitaddressCollection;