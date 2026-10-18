import { Party, Puzzle, SingletonCollection } from "./collection.mjs";
/** A business card whose back hides every clue to 1,000,000 sats, shown at 2000 followers. */
export declare const businessCard: Puzzle;
/** School of Bitcoin's business card, one puzzle for 1,000,000 sats. */
export declare class SchoolOfBitcoinCollection extends SingletonCollection {
  /** Stable collection key used in puzzle identifiers. */
  static readonly key = "school-of-bitcoin";
  /** Who published the card. */
  static readonly author: Party;
  /** Every puzzle in this collection. */
  static readonly puzzles: Puzzle[];
  /** Builds the canonical collection. */
  constructor();
}
/** Canonical collection instance. */
export declare const schoolOfBitcoin: SchoolOfBitcoinCollection;