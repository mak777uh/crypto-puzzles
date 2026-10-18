import { Party, Puzzle, SingletonCollection } from "./collection.mjs";
/** The Genesis block puzzle announced through Bitcoin OP_RETURN messages. */
export declare const genesisBlock: Puzzle;
/** An anonymous author's puzzle based on data in Bitcoin's Genesis block. */
export declare class GenesisCollection extends SingletonCollection {
  /** Stable collection key used in puzzle identifiers. */
  static readonly key = "genesis";
  /** No public identity is established for the announcer. */
  static readonly author: Party;
  /** The address receiving the announcement and subsequent hint messages. */
  static readonly puzzles: Puzzle[];
  /** Builds the canonical collection. */
  constructor();
}
/** Canonical collection instance. */
export declare const genesis: GenesisCollection;