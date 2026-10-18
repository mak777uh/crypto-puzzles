import { Party, Puzzle, SingletonCollection } from "./collection.mjs";
/**
 * Path to Greatness: Treasure Hunt. Clues inside a gameplay demo, later nine images on the site,
 * lead to the private key of a Litecoin wallet. The prize is whatever that wallet holds, and
 * donations to it raise the stakes.
 */
export declare const treasureHunt: Puzzle;
/** Path to Greatness: Treasure Hunt, one Litecoin hunt by Justin Patterson. */
export declare class PathToGreatnessCollection extends SingletonCollection {
  /** Stable collection key used in puzzle identifiers. */
  static readonly key = "path-to-greatness";
  /** Who published the puzzle. */
  static readonly author: Party;
  /** Every puzzle in this collection. */
  static readonly puzzles: Puzzle[];
  /** Builds the canonical collection. */
  constructor();
}
/** Canonical collection instance. */
export declare const pathToGreatness: PathToGreatnessCollection;