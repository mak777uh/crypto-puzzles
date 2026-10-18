import { Party, Puzzle, SingletonCollection } from "./collection.mjs";
/**
 * Securing Wealth in Poetry: an essay on "trithemian seeds", seed phrases hidden in a story and
 * picked out by phone numbers or GPS digits. It closes by saying the reader has read every word
 * needed to open a wallet with .03 BTC, then prints that wallet's address.
 */
export declare const wealthInPoetryPuzzle: Puzzle;
/** Securing Wealth in Poetry, one Medium article by Trithemius. */
export declare class WealthInPoetryCollection extends SingletonCollection {
  /** Stable collection key used in puzzle identifiers. */
  static readonly key = "wealth-in-poetry";
  /** Who published the puzzle. */
  static readonly author: Party;
  /** Every puzzle in this collection. */
  static readonly puzzles: Puzzle[];
  /** Builds the canonical collection. */
  constructor();
}
/** Canonical collection instance. */
export declare const wealthInPoetry: WealthInPoetryCollection;