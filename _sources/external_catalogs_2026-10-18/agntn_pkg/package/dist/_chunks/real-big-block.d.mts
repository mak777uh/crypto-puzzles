import { Party, Puzzle, SingletonCollection } from "./collection.mjs";
/** Quizchain2 block 77, Stage Two: a Wattpad chapter worth 777 mBTC, still waiting. */
export declare const realBigBlockChapter: Puzzle;
/** Quizchain Real Big Block, the second stage of Quizchain2 block 77 as a puzzle of its own. */
export declare class RealBigBlockCollection extends SingletonCollection {
  /** Stable collection key used in puzzle identifiers. */
  static readonly key = "real-big-block";
  /** Who published the block: the same account as both Quizchain runs. */
  static readonly author: Party;
  /** Every puzzle in this collection. */
  static readonly puzzles: Puzzle[];
  /** Builds the canonical collection. */
  constructor();
}
/** Canonical collection instance. */
export declare const realBigBlock: RealBigBlockCollection;