import { Technique } from "./_chunks/technique.mjs";
/** A block of text, what every tool answers with. */
export interface TextBlock {
  type: "text";
  text: string;
}
/** An image as base64 with its MIME type, what `puzzles_assets` answers with for an image file. */
export interface ImageBlock {
  type: "image";
  data: string;
  mimeType: string;
}
/** Result shape shared by the MCP server and the Pi/OMP extensions; `Block` widens for an image. */
export interface ToolResult<Block extends TextBlock | ImageBlock = TextBlock> {
  content: Block[];
  details: Record<string, unknown>;
}
/** Maximum number of puzzles a single list call may return. */
export declare const MAX_LIST_LIMIT = 500;
/** Default number of puzzles returned by the list tool. */
export declare const DEFAULT_LIST_LIMIT = 50;
/** What every tool surface registers about one tool; the schema is built per harness. */
export interface ToolFacts {
  readonly description: string;
  readonly name: string;
  /** Whether the tool reaches beyond the bundled dataset, for example a block explorer. */
  readonly openWorld: boolean;
  readonly promptGuidelines: readonly string[];
  readonly promptSnippet: string;
  readonly title: string;
}
/** Names, prose, parameter constraints, and status values shared by MCP, Pi, and OMP. */
export declare const facts: {
  readonly tools: {
    readonly stats: {
      readonly name: "puzzles_stats";
      readonly title: "Puzzle Statistics";
      readonly description: "Report totals, status counts, prize sums, and how many puzzles use each technique across every puzzle collection.";
      readonly promptSnippet: "Use puzzles_stats for dataset-wide crypto puzzle and bounty totals.";
      readonly promptGuidelines: readonly ["Call it before listing puzzles to know how large the dataset is."];
      readonly openWorld: false;
    };
    readonly collections: {
      readonly name: "puzzles_collections";
      readonly title: "Puzzle Collections";
      readonly description: "List every puzzle collection with its author and its puzzle count per status.";
      readonly promptSnippet: "Use puzzles_collections to learn which collections exist before listing puzzles.";
      readonly promptGuidelines: readonly ["A collection key is the first segment of a puzzle identifier, for example bits in bits/90."];
      readonly openWorld: false;
    };
    readonly authors: {
      readonly name: "puzzles_authors";
      readonly title: "Puzzle Authors";
      readonly description: "List every puzzle author with its kind, the collections it published and its puzzle count.";
      readonly promptSnippet: "Use puzzles_authors to learn who published which collections.";
      readonly promptGuidelines: readonly ["An author key is kebab-case, for example peter-todd; a collection key also resolves to its author."];
      readonly openWorld: false;
    };
    readonly author: {
      readonly name: "puzzles_author";
      readonly title: "Show Author";
      readonly description: "Show one author's record: name, kind, aliases, collections, profiles, addresses, the sourced facts public pages state about them, and how many of their puzzles use each technique.";
      readonly promptSnippet: "Use puzzles_author for who is behind a collection and what public sources say about them, with the page that says it.";
      readonly promptGuidelines: readonly ["A fact is one sentence a public page states, with that page as its source; it is not a verified biography.", "A pseudonymous author is recorded under the handle; the record does not name the person behind it.", "The technique counts say what the author tends to reuse; pass one to puzzles_list as technique for the puzzles behind a count."];
      readonly openWorld: false;
    };
    readonly solvers: {
      readonly name: "puzzles_solvers";
      readonly title: "Puzzle Solvers";
      readonly description: "List every named puzzle solver with its kind, the puzzles credited to it and the collections it also published.";
      readonly promptSnippet: "Use puzzles_solvers to learn who solved which puzzles.";
      readonly promptGuidelines: readonly ["A solver key is kebab-case, for example retired-coder; a puzzle identifier also resolves to its solver.", "A solver known only by the address the prize went to has no key and is not listed."];
      readonly openWorld: false;
    };
    readonly solver: {
      readonly name: "puzzles_solver";
      readonly title: "Show Solver";
      readonly description: "Show one solver's record: name, kind, every solve with its date and prize, profiles, addresses and the sourced facts public pages state about them.";
      readonly promptSnippet: "Use puzzles_solver for who solved a puzzle, what else they solved, and what public sources say about them, with the page that says it.";
      readonly promptGuidelines: readonly ["A fact is one sentence a public page states, with that page as its source; it is not a verified biography.", "A pseudonymous solver is recorded under the handle; the record does not name the person behind it."];
      readonly openWorld: false;
    };
    readonly show: {
      readonly name: "puzzles_show";
      readonly title: "Show Puzzle";
      readonly description: "Show one puzzle's address, status, key material, transactions, techniques, up to three hints per block, explorer links, and the repository paths of its files.";
      readonly promptSnippet: "Use puzzles_show to inspect a single puzzle by identifier, then puzzles_assets to read its files by path instead of downloading them.";
      readonly promptGuidelines: readonly ["Identifiers are collection/name, for example bits/90, or gsmg.", "More than three increases in a row, each under 1% of the largest transaction, print as one line with their count, dates and total; pass allTransactions for each one with its txid.", "A block of more than three hints prints as its count; puzzles_hints lists every hint with its source.", "A technique says how the key or a stage was built, with the page that says so; an unsolved puzzle has one only where its author stated it."];
      readonly openWorld: false;
    };
    readonly hints: {
      readonly name: "puzzles_hints";
      readonly title: "Puzzle Hints";
      readonly description: "List a puzzle's own and inherited hints with sources, optional confirmations, separately labeled published answers, and the paths of its hint files.";
      readonly promptSnippet: "Use puzzles_hints for what the author or the community said about a puzzle before searching for its key.";
      readonly promptGuidelines: readonly ["An official hint comes from the puzzle's author; a community hint comes from anyone else and may be wrong.", "The source is the published hint. An optional confirmation links to an archive or another publication of that same hint, not general information about the puzzle.", "An answer records a published response to one hint, not a verified puzzle solution or key."];
      readonly openWorld: false;
    };
    readonly stages: {
      readonly name: "puzzles_stages";
      readonly title: "Puzzle Stages";
      readonly description: "List the stages of a puzzle that runs in several, in the author's order: what each one shows, the pages and files the author published for it, the paths of the repository copies, and the published answer when somebody solved it.";
      readonly promptSnippet: "Use puzzles_stages to walk a multi-stage puzzle step by step and see which steps already have a public answer.";
      readonly promptGuidelines: readonly ["A stage's about line describes it and never gives its answer; the answer, when there is one, carries its own source and date.", "A stage without an answer is not proven unsolvable, only unsolved in public as far as the record knows."];
      readonly openWorld: false;
    };
    readonly assets: {
      readonly name: "puzzles_assets";
      readonly title: "Puzzle Files";
      readonly description: "List the files a puzzle ships, its image, hint files, solution and stage artifacts, with the size and SHA-256 its record pins, and the repository's reading copies of the pages it cites, or read one of them by path: text comes back as text, an image as an image, and a pinned file only with the bytes the record pins.";
      readonly promptSnippet: "Use puzzles_assets to read a puzzle's own files and the archived posts behind its hints and answers, instead of fetching pages that may have changed or vanished.";
      readonly promptGuidelines: readonly ["A read tries the repository copy its link names, this release's tag or the commit a checkout or puzzles.agntn.dev runs, then on main for a file merged since, then for a pinned file the author's URL and the archive capture, and returns the first copy whose bytes match the record.", "An archived source is a reading copy of a page the record cites, with its transcript and every comment that survived. The `screenshot .png` on its row is the same path ending in .png: a recent render, not the original image, so analyze the puzzle's own files instead.", "A file over 3.75 MiB, or neither an image nor UTF-8 text, can't come back inline. The error names the URL to download it from."];
      readonly openWorld: true;
    };
    readonly list: {
      readonly name: "puzzles_list";
      readonly title: "List Puzzles";
      readonly description: "List puzzles filtered by target address, collection, chain, status, technique, and public key availability, in dataset order. When a next offset is returned, pass it as offset with the same filters to continue.";
      readonly promptSnippet: "Use puzzles_list to browse puzzles by collection, chain or status, or to find the puzzle an address belongs to.";
      readonly promptGuidelines: readonly ["Prefer a collection, chain or status filter over listing everything.", "Almost every puzzle is on Bitcoin, so a chain filter is the way to find the few that are not.", "Given an address, pass it as address instead of listing the dataset and reading every row. An empty result means no puzzle pays to it, unless the answer names a puzzle the other filters left out or says no chain accepts the address.", "Follow the next offset with the same filters instead of raising limit and repeating earlier rows.", "A technique filter finds the puzzles built the same way, across collections; puzzles_stats counts each technique."];
      readonly openWorld: false;
    };
    readonly verify: {
      readonly name: "puzzles_verify";
      readonly title: "Verify Puzzle Key";
      readonly openWorld: false;
      readonly description: "Check that a puzzle's recorded key material derives its stored address, and rerun the recipe it holds: BIP39 entropy or a SHA-256 brainwallet. Takes one id, or the puzzles_list filters to check every puzzle they match in one call.";
      readonly promptSnippet: "Use puzzles_verify to confirm recorded key material before trusting it, or to replay a whole technique or collection at once.";
      readonly promptGuidelines: readonly ["An expected failure is a result, not an error.", "The recipe gets its own verdict: one that misses is a data bug, even when the key verifies.", "Pass id or filters, not both. A filtered answer prints every miss in full and folds the rest into ids per reason, so one call replays a technique such as md5-to-bip39-entropy."];
    };
    readonly balance: {
      readonly name: "puzzles_balance";
      readonly title: "Puzzle Balance";
      readonly description: "Fetch the current on-chain balance of a puzzle address.";
      readonly promptSnippet: "Use puzzles_balance for the live balance of a puzzle address.";
      readonly promptGuidelines: readonly ["This call reaches a public block explorer.", "Ethereum reads Blockscout, or Etherscan once apiKey or ETHERSCAN_API_KEY holds its key.", "It counts the chain's own coin, so a prize paid in a token such as DAI is not in it."];
      readonly openWorld: true;
    };
    readonly watch: {
      readonly name: "puzzles_watch";
      readonly title: "Watch Puzzle";
      readonly description: "Compare one puzzle with its chain, and with its source page when since is given, and list what the record misses: deposits and spends it doesn't record, an unsolved prize the address no longer holds, a public key a spend showed that the record lacks or spells otherwise, a source page that changed after since.";
      readonly promptSnippet: "Use puzzles_watch to check whether a puzzle's record is still current before relying on its prize or transactions.";
      readonly promptGuidelines: readonly ["This call reaches a block explorer, and the Wayback Machine when since is given, which can take a minute.", "A finding is a difference from the record for a person to review, not an edit: the tool never changes a record.", "It reads up to 1000 transactions per address, page by page, and leaves out incoming calls that move no coin. A PARTIAL row names an address with more, whose older transactions went unchecked.", "A FAIL row is a check that could not run, so the record is unconfirmed there, not confirmed."];
      readonly openWorld: true;
    };
    readonly eligibility: {
      readonly name: "puzzles_eligibility";
      readonly title: "Puzzle Eligibility";
      readonly description: "Gather what to check before working on a puzzle in one record: identity and source, chain, address and script type, a live read of every prize address with what it received and spent, the status with its evidence, the carriers with the repository paths of its files, what counts as a solution, and every field nobody can fill. Takes an identifier, or an address no record holds.";
      readonly promptSnippet: "Use puzzles_eligibility before working on a prize puzzle, instead of assembling the checklist from puzzles_show, puzzles_balance and an explorer.";
      readonly promptGuidelines: readonly ["This call reaches a block explorer.", "A missing row is a field neither the record nor the explorer fills. It's never guessed, so treat it as unknown.", "A conflict row means the record and the chain disagree, such as a prize the addresses no longer hold. puzzles_watch lists the transactions behind it.", "An address that fits more than one chain, such as an Ethereum one that also reads on Base, needs chain."];
      readonly openWorld: true;
    };
  };
  readonly parameters: {
    readonly id: {
      readonly minLength: 1;
      readonly maxLength: 100;
      readonly description: "Puzzle identifier, collection/name such as bits/90; only a one-puzzle collection goes by its bare key, such as gsmg";
    };
    readonly file: {
      readonly minLength: 1;
      readonly maxLength: 200;
      readonly description: "Path of one file to read, as the listing prints it, for example assets/gsmg/phase3.txt. Leave it out to list them";
    };
    readonly address: {
      readonly minLength: 1;
      readonly maxLength: 128;
      readonly description: "The puzzle paying to this address. Case only matters where the chain says it does, so an EIP-55 Ethereum address and an uppercased bech32 one both resolve";
    };
    readonly chain: {
      readonly description: "Only puzzles on one blockchain";
    };
    readonly addressChain: {
      readonly description: "Chain of an address whose format fits more than one, for example base";
    };
    readonly query: {
      readonly minLength: 1;
      readonly maxLength: 128;
      readonly description: "Puzzle identifier, for example bits/71, or an address, whether a record holds it or not";
    };
    readonly collection: {
      readonly minLength: 1;
      readonly maxLength: 50;
      readonly description: "Collection key, for example bits";
    };
    readonly author: {
      readonly minLength: 1;
      readonly maxLength: 50;
      readonly description: "Author key, for example peter-todd, or a collection key such as hash-collision";
    };
    readonly solver: {
      readonly minLength: 1;
      readonly maxLength: 100;
      readonly description: "Solver key, for example retired-coder, or a puzzle identifier such as bits/135";
    };
    readonly status: {
      readonly description: "Lifecycle status: unsolved, solved, claimed (prize taken, key unpublished), swept (taken after the public key leaked), or expired (the author took it back)";
    };
    readonly technique: {
      readonly description: "Only puzzles built with this technique, by their collection, their record or one of their stages, for example md5-to-bip39-entropy";
    };
    readonly withPubkey: {
      readonly description: "Only puzzles with a known public key";
    };
    readonly allTransactions: {
      readonly description: "List every transaction with its txid, instead of folding runs of small increases into one line";
    };
    readonly limit: {
      readonly minimum: 1;
      readonly maximum: 500;
      readonly description: "Maximum puzzles to return (default 50)";
    };
    readonly offset: {
      readonly minimum: 0;
      readonly maximum: number;
      readonly description: "Number of matching puzzles to skip (default 0). Use the returned next offset.";
    };
    readonly since: {
      readonly minLength: 10;
      readonly maxLength: 40;
      readonly description: "Also compare the source page's newest Wayback capture with the last one up to this moment, YYYY-MM-DD or ISO 8601, usually the date of the previous check";
    };
    readonly apiKey: {
      readonly maxLength: 200;
      readonly description: "Provider API key; Ethereum falls back to ETHERSCAN_API_KEY, Bitcoin Cash, Dogecoin, eCash and the Litecoin fallback to BLOCKCHAIR_API_KEY";
    };
  };
  /**
   * Spelled out rather than imported, because `core/chains.ts` pulls in `@agntn/chains` and tool
   * discovery loads this table. `test/unit/tool-schemas.test.ts` pins the list to the library's.
   */
  readonly chains: readonly ["arweave", "base", "bitcoin", "bitcoincash", "decred", "dogecoin", "ecash", "ethereum", "litecoin", "monero"];
  readonly statuses: ("claimed" | "expired" | "solved" | "swept" | "unsolved")[];
  readonly techniques: readonly Technique[];
  /** The tools the public server at puzzles.agntn.dev narrows, under the name they keep. */
  readonly publicTools: {
    readonly verify: {
      readonly name: "puzzles_verify";
      readonly title: "Verify Puzzle Key";
      readonly description: "Check that a puzzle's recorded key material derives its stored address, and rerun the recipe it holds: BIP39 entropy or a SHA-256 brainwallet.";
      readonly promptSnippet: "Use puzzles_verify to confirm recorded key material before trusting it.";
      readonly promptGuidelines: readonly ["An expected failure is a result, not an error.", "The recipe gets its own verdict: one that misses is a data bug, even when the key verifies."];
      readonly openWorld: false;
    };
  };
};
/** Parameters accepted by the list tool. */
export interface ListParams {
  readonly address?: string;
  readonly chain?: string;
  readonly collection?: string;
  readonly limit?: number;
  readonly offset?: number;
  readonly status?: string;
  readonly technique?: string;
  readonly withPubkey?: boolean;
}
/** Parameters accepted by the verify tool: one id, or the list filters without paging. */
export interface VerifyParams extends Omit<ListParams, "limit" | "offset"> {
  readonly id?: string;
}
/**
 * The arguments each tool takes, in the order an error names them. The tools without arguments
 * take any object, like their open schemas. `test/unit/tool-schemas.test.ts` pins the table to
 * the schemas.
 */
export declare const toolArguments: {
  readonly stats: readonly [];
  readonly collections: readonly [];
  readonly authors: readonly [];
  readonly author: readonly ["key"];
  readonly solvers: readonly [];
  readonly solver: readonly ["key"];
  readonly show: readonly ["id", "allTransactions"];
  readonly hints: readonly ["id"];
  readonly stages: readonly ["id"];
  readonly assets: readonly ["id", "file"];
  readonly list: ("address" | "chain" | "collection" | "limit" | "offset" | "status" | "technique" | "withPubkey")[];
  readonly verify: ("address" | "chain" | "collection" | "id" | "status" | "technique" | "withPubkey")[];
  readonly balance: readonly ["id", "apiKey"];
  readonly watch: readonly ["id", "since", "apiKey"];
  readonly eligibility: readonly ["query", "chain", "apiKey"];
};
/**
 * Rejects an argument the tool does not declare, so a host that skips schema validation still
 * refuses `with_pubkey` instead of listing every puzzle as if the filter held. The Pi and OMP
 * wrappers call it before they pick their arguments out of the object.
 *
 * @param {keyof typeof toolArguments} tool - The tool's short name, such as `show`.
 * @param {unknown} params - The arguments the caller passed.
 */
export declare function assertArguments(tool: keyof typeof toolArguments, params: unknown): void;
/**
 * Dataset-wide puzzle statistics for a model.
 *
 * @returns {Promise<ToolResult>} The totals as text, with the stats and the data version in `details`.
 */
export declare function statsTool(): Promise<ToolResult>;
/**
 * Lists every collection with its author and status counts, the same rows the CLI prints.
 *
 * @returns {Promise<ToolResult>} One line per collection with its counts and author.
 */
export declare function collectionsTool(): Promise<ToolResult>;
/**
 * Lists every author with its collections, the same rows the CLI prints.
 *
 * @returns {Promise<ToolResult>} One line per author, with the entries in `details`.
 */
export declare function authorsTool(): Promise<ToolResult>;
/**
 * One author's complete record for a model.
 *
 * @param {string} key - Author key, or a collection key.
 * @returns {Promise<ToolResult>} The record as text, with the author entry in `details`.
 */
export declare function authorTool(key: string): Promise<ToolResult>;
/**
 * Lists every named solver with its solves, the same rows the CLI prints.
 *
 * @returns {Promise<ToolResult>} One line per solver, with the entries in `details`.
 */
export declare function solversTool(): Promise<ToolResult>;
/**
 * One solver's complete record for a model.
 *
 * @param {string} key - Solver key, or a puzzle identifier.
 * @returns {Promise<ToolResult>} The record as text, with the solver entry in `details`.
 */
export declare function solverTool(key: string): Promise<ToolResult>;
/**
 * One puzzle's complete record for a model.
 *
 * @param {string} id - Universal puzzle identifier.
 * @param {boolean} [allTransactions] - List every transaction instead of folding the dust.
 * @returns {Promise<ToolResult>} The record as text; the puzzle, its hints and techniques in `details`.
 */
export declare function showTool(id: string, allTransactions?: boolean): Promise<ToolResult>;
/**
 * The stages of one puzzle in the author's order, as `puzzles_show` prints them.
 *
 * @param {string} id - Universal puzzle identifier.
 * @returns {Promise<ToolResult>} The stages as text, with the stage list in `details`.
 */
export declare function stagesTool(id: string): Promise<ToolResult>;
/**
 * The files of one puzzle and the reading copies of the pages it cites, or one of them read.
 *
 * @param {string} id - Universal puzzle identifier.
 * @param {string} [file] - The path of the file to read; without it, the listing.
 * @returns {Promise<ToolResult>} The listing as text, or the read line and the file's own block.
 * @throws {InvalidArgumentError} When the path is not one the listing prints.
 */
export declare function assetsTool(id: string, file?: string): Promise<ToolResult<TextBlock | ImageBlock>>;
/**
 * Every hint that holds for one puzzle, the collection's and its own, in the blocks `puzzles_show`
 * prints them in, then the hint files the record ships.
 *
 * @param {string} id - Universal puzzle identifier.
 * @returns {Promise<ToolResult>} The hints as text, with the joined list and the hint links in `details`.
 */
export declare function hintsTool(id: string): Promise<ToolResult>;
/**
 * Lists puzzles filtered by collection, status, and public key availability. An address the
 * other filters ruled out names the puzzle it belongs to, so an empty page never reads as an
 * address the dataset does not know.
 *
 * @param {ListParams} params - Validated tool parameters.
 * @returns {Promise<ToolResult>} One page, with a next offset only when more matches remain.
 */
export declare function listTool(params: ListParams): Promise<ToolResult>;
/**
 * Derives the stored address of one puzzle, or of every puzzle the list filters match, loading
 * crypto only after the puzzles are found.
 *
 * @param {string | VerifyParams} query - A puzzle identifier, or `{ id }`, or the list filters.
 * @returns {Promise<ToolResult>} One outcome, or a summary that prints every miss in full.
 * @throws {InvalidArgumentError} On an id with filters, on neither, or on filters nothing matches.
 */
export declare function verifyTool(query: string | VerifyParams): Promise<ToolResult>;
/**
 * Fetches a puzzle address balance from its chain.
 *
 * @param {string} id - Universal puzzle identifier.
 * @param {string} [apiKey] - Provider API key, when the chain needs one.
 * @returns {Promise<ToolResult>} The puzzle address balance.
 */
export declare function balanceTool(id: string, apiKey?: string): Promise<ToolResult>;
/**
 * Compares one puzzle with its chain, and its source page when `since` is given. A failed lookup
 * is a `FAIL` row beside the rest, so a partial answer never reads as clean.
 *
 * @param {string} id - Universal puzzle identifier.
 * @param {string} [since] - Cutoff for the source page check.
 * @param {string} [apiKey] - Provider API key, when the chain needs one.
 * @returns {Promise<ToolResult>} A summary line and the report rows, with the report in `details`.
 */
export declare function watchTool(id: string, since?: string, apiKey?: string): Promise<ToolResult>;
/**
 * Builds the eligibility record of a puzzle or an address, with a `missing` row per unknown field.
 *
 * @param {string} query - Puzzle identifier or address.
 * @param {string} [chain] - Chain of an address whose format fits more than one.
 * @param {string} [apiKey] - Provider API key, when the chain needs one.
 * @returns {Promise<ToolResult>} A summary line and the record rows, with the record in `details`.
 */
export declare function eligibilityTool(query: string, chain?: string, apiKey?: string): Promise<ToolResult>;