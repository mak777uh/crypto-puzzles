import { Party, Puzzle, SingletonCollection } from "./collection.mjs";
/** Bitaps Shamir secret-sharing puzzle. */
export declare const bitapsPuzzle: Puzzle;
/** Bitaps Shamir secret-sharing puzzle. */
export declare class BitapsCollection extends SingletonCollection {
  /** Stable collection key used in puzzle identifiers. */
  static readonly key = "bitaps";
  /** Who published the puzzles. */
  static readonly author: Party;
  /** Every puzzle in this collection. */
  static readonly puzzles: Puzzle[];
  /** Builds the canonical collection. */
  constructor();
}
/** Canonical collection instance. */
export declare const bitaps: BitapsCollection;