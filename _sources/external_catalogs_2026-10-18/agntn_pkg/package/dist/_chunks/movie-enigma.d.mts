import { Party, Puzzle, SingletonCollection } from "./collection.mjs";
/**
 * Bitcoin Movie Enigma: 34 film stills, each title turned into a BIP39 word, ten intruders to
 * drop. The 24 words that remain fail the BIP39 checksum and still derive the funded address.
 */
export declare const movieEnigmaPuzzle: Puzzle;
/** Bitcoin Movie Enigma, one puzzle by klems. */
export declare class MovieEnigmaCollection extends SingletonCollection {
  /** Stable collection key used in puzzle identifiers. */
  static readonly key = "movie-enigma";
  /** Who published the puzzles. */
  static readonly author: Party;
  /** Every puzzle in this collection. */
  static readonly puzzles: Puzzle[];
  /** Builds the canonical collection. */
  constructor();
}
/** Canonical collection instance. */
export declare const movieEnigma: MovieEnigmaCollection;