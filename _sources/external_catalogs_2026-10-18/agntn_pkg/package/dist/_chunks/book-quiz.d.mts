import { Party, Puzzle, SingletonCollection } from "./collection.mjs";
/**
 * 7 million book quiz: seven multiple-choice questions about a campaign book, four of them
 * answered by whatever the author personally felt was best, with one hour to sweep the address.
 * Nobody made the deadline and the author took the 7,000,000 satoshis back.
 */
export declare const bookQuizPuzzle: Puzzle;
/** 7 million book quiz, one puzzle by AoiNakamoto. */
export declare class BookQuizCollection extends SingletonCollection {
  /** Stable collection key used in puzzle identifiers. */
  static readonly key = "book-quiz";
  /** Who published the puzzle: the same Reddit account as the birthday quiz, one day later. */
  static readonly author: Party;
  /** Every puzzle in this collection. */
  static readonly puzzles: Puzzle[];
  /** Builds the canonical collection. */
  constructor();
}
/** Canonical collection instance. */
export declare const bookQuiz: BookQuizCollection;