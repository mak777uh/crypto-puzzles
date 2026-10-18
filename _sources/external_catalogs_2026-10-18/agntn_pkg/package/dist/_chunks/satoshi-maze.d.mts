import { Party, Puzzle, SingletonCollection } from "./collection.mjs";
/**
 * Satoshi's portrait drawn as a maze, with 2.1 BTC promised for its key: 1.1 BTC on the address
 * and 1 BTC more on a Phemex account. Nobody found it before the deadline, so Max published the
 * solution: the first 21-digit prime in e, times SatoshiNakamoto and Phemex read as Base58 in
 * two alphabets and taken little endian. The key is that product.
 */
export declare const satoshiMazePuzzle: Puzzle;
/** Satoshi-Maze, one puzzle by the Phemex exchange. */
export declare class SatoshiMazeCollection extends SingletonCollection {
  /** Stable collection key used in puzzle identifiers. */
  static readonly key = "satoshi-maze";
  /** Who published the puzzle. */
  static readonly author: Party;
  /** Every puzzle in this collection. */
  static readonly puzzles: Puzzle[];
  /** Builds the canonical collection. */
  constructor();
}
/** Canonical collection instance. */
export declare const satoshiMaze: SatoshiMazeCollection;