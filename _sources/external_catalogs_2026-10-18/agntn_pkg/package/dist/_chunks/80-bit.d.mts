import { Party, Puzzle, SingletonCollection } from "./collection.mjs";
/** 80 unknown bits in a 511-bit key, public key only in a pending spend. Taken 39 minutes in. */
export declare const kTimesG80Bit: Puzzle;
/** kTimesG's 80-bit key cracking challenge from Bitcointalk. */
export declare class EightyBitCollection extends SingletonCollection {
  /** Stable collection key used in puzzle identifiers. */
  static readonly key = "80-bit";
  /** Who published the puzzles. */
  static readonly author: Party;
  /** Every puzzle in this collection. */
  static readonly puzzles: Puzzle[];
  /** Builds the canonical collection. */
  constructor();
}
/** Canonical collection instance. */
export declare const eightyBit: EightyBitCollection;