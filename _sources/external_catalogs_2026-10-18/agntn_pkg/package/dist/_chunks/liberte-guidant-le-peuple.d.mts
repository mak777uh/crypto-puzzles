import { Party, Puzzle, SingletonCollection } from "./collection.mjs";
/** Delacroix in yellow vests on a Paris wall: six seed words in coloured strokes, six in UV ink. */
export declare const liberteGuidantLePeuple: Puzzle;
/** Pascal Boyart's mural in Paris, one puzzle for about 0.29 BTC. */
export declare class LiberteGuidantLePeupleCollection extends SingletonCollection {
  /** Stable collection key used in puzzle identifiers. */
  static readonly key = "liberte-guidant-le-peuple";
  /** Who painted the mural. */
  static readonly author: Party;
  /** Every puzzle in this collection. */
  static readonly puzzles: Puzzle[];
  /** Builds the canonical collection. */
  constructor();
}
/** Canonical collection instance. */
export declare const liberteGuidantLePeupleCollection: LiberteGuidantLePeupleCollection;