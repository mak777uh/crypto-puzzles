import { Party, Puzzle, SingletonCollection } from "./collection.mjs";
/** 24 seed words hidden in the original drawings, plus a 25th the artist sends to the finder. */
export declare const greatRiddleArtworks: Puzzle;
/** The Great Riddle by The Great Print, a seed phrase hidden word by word in pen drawings. */
export declare class GreatRiddleCollection extends SingletonCollection {
  /** Stable collection key used in puzzle identifiers. */
  static readonly key = "great-riddle";
  /** Who published the puzzle. */
  static readonly author: Party;
  /** Every puzzle in this collection. */
  static readonly puzzles: Puzzle[];
  /** Builds the canonical collection. */
  constructor();
}
/** Canonical collection instance. */
export declare const greatRiddle: GreatRiddleCollection;