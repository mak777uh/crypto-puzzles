import { Party, Puzzle, SingletonCollection } from "./collection.mjs";
/** A seed phrase hidden in a thriller, twelve photo clues on X, one Electrum wallet. */
export declare const huntingTime: Puzzle;
/** VeteranHODL's novel Hunting Time, one puzzle for 420,000 sats. */
export declare class HuntingTimeCollection extends SingletonCollection {
  /** Stable collection key used in puzzle identifiers. */
  static readonly key = "hunting-time";
  /** Who wrote the novel and hid the phrase. */
  static readonly author: Party;
  /** Every puzzle in this collection. */
  static readonly puzzles: Puzzle[];
  /** Builds the canonical collection. */
  constructor();
}
/** Canonical collection instance. */
export declare const huntingTimeCollection: HuntingTimeCollection;