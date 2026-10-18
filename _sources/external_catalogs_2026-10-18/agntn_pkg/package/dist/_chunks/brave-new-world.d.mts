import { Party, Puzzle, SingletonCollection } from "./collection.mjs";
/**
 * A collage titled "Welcome to the Brave New World": the Statue of Liberty, George Floyd, Trump
 * against Biden, surveillance cameras, lines of runes and "Find the seed phrase" behind it all. The
 * address is written up the left edge. The post has a title and nothing else, so the picture is the
 * whole puzzle.
 */
export declare const braveNewWorldPuzzle: Puzzle;
/** Brave New World, one picture puzzle by stsh_n. */
export declare class BraveNewWorldCollection extends SingletonCollection {
  /** Stable collection key used in puzzle identifiers. */
  static readonly key = "brave-new-world";
  /** Who published the puzzle. */
  static readonly author: Party;
  /** Every puzzle in this collection. */
  static readonly puzzles: Puzzle[];
  /** Builds the canonical collection. */
  constructor();
}
/** Canonical collection instance. */
export declare const braveNewWorld: BraveNewWorldCollection;