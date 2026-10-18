import { Party, Puzzle, SingletonCollection } from "./collection.mjs";
/** Eight camel case words as raw key bytes, posted by akkort the day after the prize moved. */
export declare const natashaOtomoskiQuestion: Puzzle;
/** The Natasha Otomoski puzzle, one 1 BTC question by blockladder. */
export declare class NatashaOtomoskiCollection extends SingletonCollection {
  /** Stable collection key used in puzzle identifiers. */
  static readonly key = "natasha-otomoski";
  /** Who published the puzzle. */
  static readonly author: Party;
  /** Every puzzle in this collection. */
  static readonly puzzles: Puzzle[];
  /** Builds the canonical collection. */
  constructor();
}
/** Canonical collection instance. */
export declare const natashaOtomoski: NatashaOtomoskiCollection;