import { Party, Puzzle, SingletonCollection } from "./collection.mjs";
/**
 * Powerful Moss: a twelve-track album with a twelve-word seed hidden in it. The seed opens the
 * winner wallet, and only that wallet can take the prize out of the contract that holds it. The
 * contract went up on January 10, 2025, a week before the album. The two withdrawals that day
 * returned two test mints before the 0.25 ETH the page says the prize starts at.
 */
export declare const powerfulMossAlbum: Puzzle;
/** Powerful Moss by LogicBeach, a Base prize hidden in an album. */
export declare class PowerfulMossCollection extends SingletonCollection {
  /** Stable collection key used in puzzle identifiers. */
  static readonly key = "powerful-moss";
  /** Who published the puzzle. */
  static readonly author: Party;
  /** Every puzzle in this collection. */
  static readonly puzzles: Puzzle[];
  /** Builds the canonical collection. */
  constructor();
}
/** Canonical collection instance. */
export declare const powerfulMoss: PowerfulMossCollection;