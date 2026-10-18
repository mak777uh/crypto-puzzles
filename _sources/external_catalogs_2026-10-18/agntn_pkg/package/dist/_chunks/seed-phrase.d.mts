import { Party, Puzzle, SingletonCollection } from "./collection.mjs";
/**
 * A website that drops clues to a 24 word phrase or shorter, one day at a time, until the
 * summer of 2024 ran out. The derivation path is the one thing it gives away for free.
 */
export declare const seedPhrasePuzzle: Puzzle;
/** seed-phrase.com, one puzzle by MetaNeer Labs. */
export declare class SeedPhraseCollection extends SingletonCollection {
  /** Stable collection key used in puzzle identifiers. */
  static readonly key = "seed-phrase";
  /** Whose repository the site is published from. */
  static readonly author: Party;
  /** Every puzzle in this collection. */
  static readonly puzzles: Puzzle[];
  /** Builds the canonical collection. */
  constructor();
}
/** Canonical collection instance. */
export declare const seedPhrase: SeedPhraseCollection;