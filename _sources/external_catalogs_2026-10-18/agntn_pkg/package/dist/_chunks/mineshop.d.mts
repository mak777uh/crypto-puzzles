import { Party, Puzzle, SingletonCollection } from "./collection.mjs";
/**
 * The 10 ETH challenge: a twelve-word seed phrase split in half between a YouTube video and the
 * blog post it links to. The author still holds the key and spends from the wallet himself, so a
 * falling balance is not a solve.
 */
export declare const mineshopPuzzle: Puzzle;
/** The 10 ETH challenge, one puzzle by Guntis Vitolins. */
export declare class MineshopCollection extends SingletonCollection {
  /** Stable collection key used in puzzle identifiers. */
  static readonly key = "mineshop";
  /** Who published the puzzles. */
  static readonly author: Party;
  /** Every puzzle in this collection. */
  static readonly puzzles: Puzzle[];
  /** Builds the canonical collection. */
  constructor();
}
/** Canonical collection instance. */
export declare const mineshop: MineshopCollection;