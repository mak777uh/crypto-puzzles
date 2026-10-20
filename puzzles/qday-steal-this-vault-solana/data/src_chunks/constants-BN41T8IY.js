var e=`import { PublicKey } from '@solana/web3.js';

/** The Bunker program (same address on localnet and devnet). */
export const PROGRAM_ID = new PublicKey('22AEUZtxpbi1ReJGrG9SyFob3uHGzZERERyVNp6uV8Y6');

export type ClusterName = 'localnet' | 'devnet' | 'mainnet-beta';

/** Cluster id byte inside every signed message (MESSAGE_FORMAT §4). */
export const CLUSTER_ID: Record<ClusterName, number> = {
  localnet: 1,
  devnet: 2,
  'mainnet-beta': 4,
};

/**
 * Mainnet is on (Bunker's program deployed 8 Oct 2026). Setting this to false makes the SDK (open,
 * deposit, prepare*) and the CLI refuse mainnet again: a one-line kill switch for the clients.
 */
export const MAINNET_ENABLED: boolean = true;
export const MAINNET_DISABLED_MESSAGE = 'mainnet is turned off in this build';

export const SPL_TOKEN_PROGRAM_ID = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');
export const TOKEN_2022_PROGRAM_ID = new PublicKey('TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb');
export const ASSOCIATED_TOKEN_PROGRAM_ID = new PublicKey('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL');
export const METAPLEX_TOKEN_METADATA_PROGRAM_ID = new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');

// ---- LMS / message format (MESSAGE_FORMAT §1, §4) ----
export const DOMAIN = new TextEncoder().encode('BUNKER-v1');
export const PREFIX_LEN = 83;
export const SIG_LEN = 2508;
export const ROOT_LEN = 48;
export const TREE_SIZE = 1024;
export const MAX_ACTIONS = 8;

export const IX_TAG = { execute: 1, rotate: 2, close: 3 } as const;
export type IxTagName = keyof typeof IX_TAG;

// ---- Legacy (inheritance): heir actions and inherit (MESSAGE_FORMAT §4, SPEC §2) ----
/** Shortest inactivity period a heir action may sign. */
export const HEIR_MIN_DAYS = 30;
/** Longest inactivity period a heir action may sign (10 years of 365 days). */
export const HEIR_MAX_DAYS = 3650;
/** One day of the cluster clock (Clock::unix_timestamp), in seconds. */
export const SECONDS_PER_DAY = 86_400;
/** The app's presets: 6 months, 1 year, 2 years, in days (the signed unit). */
export const HEIR_PERIOD_PRESETS = [183, 365, 730] as const;
/** Size of the heir record account (PDA ["heir", state]). */
export const HEIR_RECORD_SIZE = 100;
/** Token accounts one legacy inherit transaction carries (MEASUREMENTS.md, distinct mints). */
export const INHERIT_MAX_TOKENS_PER_TX = 7;

/** Clients warn (and offer rotate) when fewer than this many leaves remain. */
export const LOW_LEAVES_WARNING = 16;
/**
 * Leaves kept back from \`execute\` so the key can always be rotated: execute refuses to
 * use the last RESERVED_LEAVES leaves of a tree; rotate may use them.
 */
export const RESERVED_LEAVES = 1;

// ---- transactions ----
/** Legacy transaction size limit (PACKET_DATA_SIZE). */
export const LEGACY_TX_LIMIT = 1232;
/** v1 transaction size limit (inline-signature transport, SIMD-0296/0385). */
export const V1_TX_LIMIT = 4096;
/**
 * loadedAccountsDataSizeLimit for v1 transactions (it defaults to 0 in v1, so it must be set).
 * Covers the Bunker program (274 KiB), Token-2022 (602 KiB), SPL Token (99 KiB) and the accounts
 * an execute touches (MEASUREMENTS.md recommends 2 MiB).
 */
export const V1_LOADED_ACCOUNTS_DATA_SIZE_LIMIT = 2 * 1024 * 1024;

/**
 * Explicit compute-unit limits: the one place to tune them. Values follow
 * programs/bunker/MEASUREMENTS.md (worst case = maximum-steps LMS signature, every derived PDA
 * at its worst bump, + 10%, rounded up to 5,000). A transaction that runs out of compute does not
 * consume the leaf: rebuild it (rebuildPrepared) with the same signature, never re-sign.
 */
export const COMPUTE_UNITS = {
  openVault: 45_000,
  /** Any signature-upload transaction: init_sig_buffer (+ chunk), write chunk(s), close_sig_buffer. */
  sigBufferTx: 50_000,
  /**
   * execute = roundUp(1.10 × (executeBase + Σ per-action + pdaBumpIteration × Σ(255 − vault ATA bump)), 5,000)
   * (+ createAtaIdempotent per destination ATA created in the same transaction). Covers hybrid mode,
   * the buffer checks and the last signature chunk riding in the same transaction.
   */
  // Max of the 2026-10-01, 2026-10-08 and 2026-10-09 (Legacy build) measurements (the current build
  // verifies LMS at 163 CU per hash step against 136 before), so a limit fits every build.
  executeBase: 208_757,
  transferSol: 2_653,
  transferToken: 13_118,
  closeTokenAccount: 8_004,
  /** Heir actions (at most one per payload). SetHeir also searches for the heir record PDA. */
  setHeir: 10_218,
  checkIn: 5_435,
  clearHeir: 3_355,
  /**
   * inherit = roundUp(1.10 × (inheritBase + inheritPerCreated × created heir accounts
   * + inheritPerExisting × existing ones + pdaBumpIteration × Σ(255 − bump)), 5,000), plus
   * harvestWithheld per Token-2022 harvest instruction the same transaction carries.
   */
  inheritBase: 15_012,
  inheritPerCreated: 35_686,
  inheritPerExisting: 10_901,
  harvestWithheld: 10_000,
  pdaBumpIteration: 1_500,
  executeFactorPercent: 110,
  roundTo: 5_000,
  rotate: 225_000,
  closeVault: 230_000,
  /** ATA program create-idempotent (measured 15.3k SPL / 17.7k Token-2022), per ATA in the transaction. */
  createAtaIdempotent: 20_000,
  depositSol: 1_000,
  depositToken: 40_000,
  max: 1_400_000,
} as const;

/**
 * Deposit cap: the vault may hold at most this many lamports of SOL after a deposit.
 * Deposits that would exceed it are refused by buildDepositTxs.
 */
export const BETA_CAP_LAMPORTS = 10_000_000_000n; // 10 SOL

/** Known cluster genesis hashes (used to refuse mainnet for custom RPC URLs). */
export const GENESIS_HASH = {
  'mainnet-beta': '5eykt4UsFv8P8NJdTREpY1vzqKqZKvdpKuc147dw2N9d',
  devnet: 'EtWTRABZaYq6iMfeYKouRu166VU2xqa1wcaWoxPkrZBG',
  testnet: '4uhcVJyU9pJkvQyS88uRDiswHXSCkY3zQawwpjk2NsNY',
} as const;
`;export{e as default};