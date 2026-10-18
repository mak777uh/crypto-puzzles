import { Party, Puzzle, SingletonCollection } from "./collection.mjs";
/**
 * Twelve trivia riddles: answers 1 to 10 form the passphrase and 11 and 12 the salt of the
 * brainwallet.io generic tab, which runs scrypt and hashes the hex result into an uncompressed key.
 * The winner swept the address six hours after the post and published every answer.
 */
export declare const triviaBrainwalletRiddles: Puzzle;
/** The 2017 trivia brainwallet on r/bitcoinpuzzles, one puzzle by Kierkegaard_Soren. */
export declare class TriviaBrainwalletCollection extends SingletonCollection {
  /** Stable collection key used in puzzle identifiers. */
  static readonly key = "trivia-brainwallet";
  /** Who published the puzzle. */
  static readonly author: Party;
  /** Every puzzle in this collection. */
  static readonly puzzles: Puzzle[];
  /** Builds the canonical collection. */
  constructor();
}
/** Canonical collection instance. */
export declare const triviaBrainwallet: TriviaBrainwalletCollection;