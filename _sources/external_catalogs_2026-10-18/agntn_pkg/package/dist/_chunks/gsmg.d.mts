import { Party, Puzzle, SingletonCollection } from "./collection.mjs";
/** GSMG.IO multi-phase cryptographic challenge. */
export declare const gsmgPuzzle: Puzzle;
/** GSMG.IO multi-phase cryptographic challenge. */
export declare class GsmgCollection extends SingletonCollection {
  /** Stable collection key used in puzzle identifiers. */
  static readonly key = "gsmg";
  /** Who published the puzzles. */
  static readonly author: Party;
  /** Every puzzle in this collection. */
  static readonly puzzles: Puzzle[];
  /** Builds the canonical collection. */
  constructor();
}
/** Canonical collection instance. */
export declare const gsmg: GsmgCollection;