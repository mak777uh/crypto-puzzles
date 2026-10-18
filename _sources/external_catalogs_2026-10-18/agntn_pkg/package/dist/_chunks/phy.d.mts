import { Party, Puzzle, SingletonCollection } from "./collection.mjs";
/**
 * A signed post, its signature one character short and a spiral of grey emojis. The signature
 * gives up the address and its public key. The key behind them is the puzzle.
 */
export declare const phyChallenge: Puzzle;
/** kTimesG's Phy Challenge from Bitcointalk. */
export declare class PhyCollection extends SingletonCollection {
  /** Stable collection key used in puzzle identifiers. */
  static readonly key = "phy";
  /** Who published the puzzle, the same kTimesG as the 80-bit challenge. */
  static readonly author: Party;
  /** Every puzzle in this collection. */
  static readonly puzzles: Puzzle[];
  /** Builds the canonical collection. */
  constructor();
}
/** Canonical collection instance. */
export declare const phy: PhyCollection;