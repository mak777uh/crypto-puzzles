import { Party, Puzzle, SingletonCollection } from "./collection.mjs";
/**
 * Building an awesome eCash community and a chance to win 5M XEC: an essay on what a crypto
 * community needs, and the 12 words of a Cashtab wallet sit on its diagonal. Paragraph n gives
 * its n-th word, from "Matter" to "trip".
 */
export declare const ecashCommunity: Puzzle;
/** Building an awesome eCash community, one Proof Of Writing article by cain. */
export declare class ProofOfWritingCollection extends SingletonCollection {
  /** Stable collection key used in puzzle identifiers. */
  static readonly key = "proof-of-writing";
  /** Who published the puzzle. */
  static readonly author: Party;
  /** Every puzzle in this collection. */
  static readonly puzzles: Puzzle[];
  /** Builds the canonical collection. */
  constructor();
}
/** Canonical collection instance. */
export declare const proofOfWriting: ProofOfWritingCollection;