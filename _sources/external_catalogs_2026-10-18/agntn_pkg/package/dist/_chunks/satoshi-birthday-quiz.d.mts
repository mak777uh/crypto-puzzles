import { Party, Puzzle, SingletonCollection } from "./collection.mjs";
/**
 * Satoshi birthday 7 million quiz: seven multiple-choice questions about Bitcoin history, the
 * correct answer sentences joined by single spaces, and the SHA-256 of that text used as BIP39
 * entropy. The first address of the resulting wallet held the prize for five hours.
 */
export declare const satoshiBirthdayQuizPuzzle: Puzzle;
/** Satoshi birthday 7 million quiz, one puzzle by AoiNakamoto. */
export declare class SatoshiBirthdayQuizCollection extends SingletonCollection {
  /** Stable collection key used in puzzle identifiers. */
  static readonly key = "satoshi-birthday-quiz";
  /** Who published the puzzle. */
  static readonly author: Party;
  /** Every puzzle in this collection. */
  static readonly puzzles: Puzzle[];
  /** Builds the canonical collection. */
  constructor();
}
/** Canonical collection instance. */
export declare const satoshiBirthdayQuiz: SatoshiBirthdayQuizCollection;