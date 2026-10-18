import { Party, Puzzle, SingletonCollection } from "./collection.mjs";
/**
 * Four pictures: a phone directory, an eye, the letter O and a QR code. Sounded out, the first
 * three give directory.io, a site that listed every private key 128 to a page. The QR code holds
 * "36 down" in binary, and the same binary digits are the page number. The author's solution stops
 * at the page, so the key is the recipe run once. The digits only lead to the prize read as octal,
 * a page starts at key 128 * (page - 1), and its 36th row derives the uncompressed address below.
 */
export declare const picturePuzzleRecord: Puzzle;
/** The 1 mBTC picture puzzle, one puzzle by givesadvice4bitcoin. */
export declare class PicturePuzzleCollection extends SingletonCollection {
  /** Stable collection key used in puzzle identifiers. */
  static readonly key = "picture-puzzle";
  /** Who published the puzzle. */
  static readonly author: Party;
  /** Every puzzle in this collection. */
  static readonly puzzles: Puzzle[];
  /** Builds the canonical collection. */
  constructor();
}
/** Canonical collection instance. */
export declare const picturePuzzle: PicturePuzzleCollection;