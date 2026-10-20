// Launch into the vault: create a token whose supply (or pump.fun dev buy) lands straight in a vault,
// and collect pump.fun creator fees into it. Every transaction here is signed by the connected
// wallet (plus the new mint's one-time keypair); none needs the vault's hash key, exactly like a
// deposit (deposit.ts).
//
// pump.fun scope (owner-approved guardrail, 2026-10-08): `create_v2` with the vault as creator, plus at
// most one dev buy by the same wallet in the same transaction. Mayhem Mode is never turned on.

import { Buffer } from 'buffer';
import { PublicKey, SystemProgram, Transaction, TransactionInstruction } from '@solana/web3.js';
import type { Connection } from '@solana/web3.js';
import {
  AuthorityType,
  ExtensionType,
  createAssociatedTokenAccountIdempotentInstruction,
  createInitializeMetadataPointerInstruction,
  createInitializeMint2Instruction,
  createMintToCheckedInstruction,
  createSetAuthorityInstruction,
  getMintLen,
} from '@solana/spl-token';
import { BETA_CAP_LAMPORTS, LEGACY_TX_LIMIT, TOKEN_2022_PROGRAM_ID, SPL_TOKEN_PROGRAM_ID } from './constants';
import type { ClusterName } from './constants';
import { assertClusterAllowed } from './cluster';
import { ataOf } from './addresses';
import { BorshWriter, sha256, utf8 } from './bytes';
import { BetaCapError } from './deposit';
import { formatAmount } from './describe';
import { fetchVault } from './state';
import { TransactionTooLargeError, measureTx } from './transport';
import {
  PUMP_DECIMALS,
  PumpInputError,
  WSOL_MINT,
  ammCreatorVaultAuthorityPda,
  ammSweepCreatorFeeIx,
  assertPumpText,
  bondingCurvePda,
  buyV3Ix,
  canonicalPoolPda,
  collectCoinCreatorFeeIx,
  collectCreatorFeeV2Ix,
  createV2Ix,
  creatorVaultPda,
  decodeBondingCurve,
  decodePumpFeeConfig,
  decodePumpGlobal,
  decodePumpPool,
  holderRewardsPda,
  pumpFeeConfigPda,
  pumpGlobalPda,
  quoteFreshCurveBuy,
  sweepCreatorFeeIx,
} from './pump';
import type { PumpFeeConfig, PumpGlobal } from './pump';

/** A dev buy may take at most this share of the supply (basis points): 10%. */
export const DEV_BUY_MAX_SUPPLY_BPS = 1_000n;
/** Rent-exempt minimum of a 0-byte system account: a vault wallet must end a transaction at or above it. */
export const SYSTEM_ACCOUNT_RENT_LAMPORTS = 890_880n;

export type CreatorFeesMode = 'creator' | 'holders';

async function assertVaultOpen(conn: Connection, state: PublicKey, wallet: PublicKey): Promise<void> {
  const v = await fetchVault(conn, state);
  if (!v) throw new Error(`Vault ${state.toBase58()} does not exist`);
  if (v.closed) throw new Error('This vault is closed; anything sent to it would be lost');
  if (!v.wallet.equals(wallet)) throw new Error('wallet does not belong to this vault state');
}

function legacyTx(ixs: TransactionInstruction[], feePayer: PublicKey, blockhash: { blockhash: string; lastValidBlockHeight: number }): Transaction {
  const tx = new Transaction({ feePayer, blockhash: blockhash.blockhash, lastValidBlockHeight: blockhash.lastValidBlockHeight });
  tx.add(...ixs);
  return tx;
}

// ---- pump.fun ------------------------------------------------------------------------------------

export interface PumpLaunchConfig {
  global: PumpGlobal;
  feeConfig: PumpFeeConfig | null;
}

/** pump.fun's live configuration: whether create_v2 / holder-reward coins are on, the curve and the fee tiers. */
export async function fetchPumpLaunchConfig(conn: Connection): Promise<PumpLaunchConfig> {
  const [g, fc] = await conn.getMultipleAccountsInfo([pumpGlobalPda(), pumpFeeConfigPda()], 'confirmed');
  if (!g) throw new Error('pump.fun is not deployed on this network (no Global account)');
  return { global: decodePumpGlobal(g.data), feeConfig: fc ? decodePumpFeeConfig(fc.data) : null };
}

export interface DevBuyQuote {
  /** Base units the buy asks for (exact). */
  tokens: bigint;
  /** Lamports it costs on the fresh curve, fees included (≤ the budget). */
  cost: bigint;
  /** Share of the 1B supply, in basis points. */
  supplyBps: bigint;
  /** The quote hit the dev-buy cap (DEV_BUY_MAX_SUPPLY_BPS). */
  capped: boolean;
}

/** What `lamports` buys as the coin's first trade, capped at DEV_BUY_MAX_SUPPLY_BPS of the supply. */
export function quoteDevBuy(config: PumpLaunchConfig, lamports: bigint): DevBuyQuote {
  const supply = config.global.tokenTotalSupply;
  const cap = (supply * DEV_BUY_MAX_SUPPLY_BPS) / 10_000n;
  const uncapped = quoteFreshCurveBuy(config.global, config.feeConfig, lamports);
  const q = uncapped.tokens > cap ? quoteFreshCurveBuy(config.global, config.feeConfig, lamports, cap) : uncapped;
  return { tokens: q.tokens, cost: q.cost, supplyBps: supply > 0n ? (q.tokens * 10_000n) / supply : 0n, capped: uncapped.tokens > cap };
}

export interface PumpLaunchParams {
  conn: Connection;
  /** The connected wallet: pays, signs, and makes the dev buy. */
  user: PublicKey;
  /** The vault (its wallet PDA): the coin's creator, and where the dev buy lands. */
  vaultWallet: PublicKey;
  /** Pass it to check the vault exists and is open (like deposits). */
  vaultState?: PublicKey;
  /** A fresh keypair's public key; the keypair co-signs the transaction. */
  mint: PublicKey;
  name: string;
  symbol: string;
  uri: string;
  /** 'creator': creator fees accrue to the vault. 'holders': pump.fun pays them to holders (holder-rewards coin). */
  fees: CreatorFeesMode;
  /** SOL budget of the optional dev buy (0 = none), fees included. */
  devBuyLamports?: bigint;
  config?: PumpLaunchConfig;
  cluster?: ClusterName;
  /** Override the buyback fee recipient (default: a random one listed in Global). */
  buybackFeeRecipient?: PublicKey;
}

export interface PumpLaunchPlan {
  /** Legacy transaction; feePayer = user. Needs the user's and the mint's signatures. */
  transaction: Transaction;
  mint: PublicKey;
  bondingCurve: PublicKey;
  /** Who pump.fun records as the coin's creator (receives creator fees). */
  curveCreator: PublicKey;
  /** The vault's token account for the coin (opened in the same transaction). */
  vaultTokenAccount: PublicKey;
  devBuy: DevBuyQuote | null;
  /** Serialized size in bytes (≤ 1,232). */
  size: number;
}

/**
 * One legacy transaction: `create_v2` (creator = the vault, or the holder-rewards PDA), the vault's
 * token account (idempotent), then optionally one `buy_v3` whose tokens land straight in that vault
 * account. pump.fun's docs describe the buy's base account as "the user's token account"; the
 * program accepts any token account of the mint (checked on devnet, 2026-10-08), which is what lets
 * the dev buy reach the vault in the same transaction: a separate transfer out of the wallet does
 * not fit in 1,232 bytes. If pump.fun ever enforces the owner, the transaction fails in simulation,
 * before the wallet is asked, and nothing is spent.
 */
export async function buildPumpLaunchTx(p: PumpLaunchParams): Promise<PumpLaunchPlan> {
  if (p.cluster) assertClusterAllowed(p.cluster);
  assertPumpText(p);
  if (p.vaultState) await assertVaultOpen(p.conn, p.vaultState, p.vaultWallet);
  const config = p.config ?? (await fetchPumpLaunchConfig(p.conn));
  if (!config.global.createV2Enabled) throw new Error('pump.fun has coin creation (create_v2) switched off right now.');
  if (p.fees === 'holders' && !config.global.isHolderRewardEnabled) {
    throw new Error('pump.fun has holder-rewards coins switched off on this network right now. Choose creator fees, or try again later.');
  }
  const existing = await p.conn.getAccountInfo(p.mint, 'confirmed');
  if (existing) throw new Error('The mint address is already in use. Start the launch again for a fresh one.');

  const isHolderReward = p.fees === 'holders';
  const curveCreator = isHolderReward ? holderRewardsPda(p.mint) : p.vaultWallet;
  const vaultTokenAccount = ataOf(p.vaultWallet, p.mint, TOKEN_2022_PROGRAM_ID);
  const ixs: TransactionInstruction[] = [
    createV2Ix({ mint: p.mint, user: p.user, creator: p.vaultWallet, name: p.name, symbol: p.symbol, uri: p.uri, isMayhemMode: false, isHolderReward }),
    createAssociatedTokenAccountIdempotentInstruction(p.user, vaultTokenAccount, p.vaultWallet, p.mint, TOKEN_2022_PROGRAM_ID),
  ];

  let devBuy: DevBuyQuote | null = null;
  const budget = p.devBuyLamports ?? 0n;
  if (budget < 0n) throw new PumpInputError('dev buy must not be negative');
  if (budget > 0n) {
    devBuy = quoteDevBuy(config, budget);
    if (devBuy.tokens <= 0n) throw new PumpInputError('The dev buy is too small to buy any tokens.');
    const recipients = config.global.buybackFeeRecipients;
    const buyback = p.buybackFeeRecipient ?? recipients[Math.floor(Math.random() * recipients.length)];
    if (!buyback) throw new Error('pump.fun lists no buyback fee recipient; a dev buy is not possible right now.');
    ixs.push(buyV3Ix({ mint: p.mint, user: p.user, associatedBaseUser: vaultTokenAccount, amount: devBuy.tokens, maxSolCost: budget, buybackFeeRecipient: buyback }));
  }

  const size = measureTx(ixs, p.user);
  if (size > LEGACY_TX_LIMIT) {
    const over = Number.isFinite(size) ? size - LEGACY_TX_LIMIT : null;
    throw new TransactionTooLargeError(
      over != null ? `With a dev buy, the name, symbol and metadata URI are ${over} bytes too long for one transaction (shorten the URI: an ipfs:// URI is the shortest). The launch` : 'The launch',
      size,
    );
  }
  const bh = await p.conn.getLatestBlockhash('confirmed');
  return { transaction: legacyTx(ixs, p.user, bh), mint: p.mint, bondingCurve: bondingCurvePda(p.mint), curveCreator, vaultTokenAccount, devBuy, size };
}

// ---- plain Token-2022 ----------------------------------------------------------------------------

const TOKEN_METADATA_IX = {
  initialize: sha256(utf8('spl_token_metadata_interface:initialize_account')).slice(0, 8),
  updateAuthority: sha256(utf8('spl_token_metadata_interface:update_the_authority')).slice(0, 8),
} as const;

/** Token-2022 TokenMetadata `Initialize` (metadata stored in the mint itself). */
export function tokenMetadataInitializeIx(p: { mint: PublicKey; updateAuthority: PublicKey; mintAuthority: PublicKey; name: string; symbol: string; uri: string }): TransactionInstruction {
  const data = new BorshWriter().raw(TOKEN_METADATA_IX.initialize).vec(utf8(p.name)).vec(utf8(p.symbol)).vec(utf8(p.uri)).bytes();
  return new TransactionInstruction({
    programId: TOKEN_2022_PROGRAM_ID,
    keys: [
      { pubkey: p.mint, isSigner: false, isWritable: true },
      { pubkey: p.updateAuthority, isSigner: false, isWritable: false },
      { pubkey: p.mint, isSigner: false, isWritable: false },
      { pubkey: p.mintAuthority, isSigner: true, isWritable: false },
    ],
    data: Buffer.from(data),
  });
}

/** Token-2022 TokenMetadata `UpdateAuthority`; `newAuthority: null` removes it for good. */
export function tokenMetadataUpdateAuthorityIx(p: { mint: PublicKey; currentAuthority: PublicKey; newAuthority: PublicKey | null }): TransactionInstruction {
  const data = new BorshWriter()
    .raw(TOKEN_METADATA_IX.updateAuthority)
    .raw((p.newAuthority ?? PublicKey.default).toBytes()) // OptionalNonZeroPubkey: all zeros = none
    .bytes();
  return new TransactionInstruction({
    programId: TOKEN_2022_PROGRAM_ID,
    keys: [
      { pubkey: p.mint, isSigner: false, isWritable: true },
      { pubkey: p.currentAuthority, isSigner: true, isWritable: false },
    ],
    data: Buffer.from(data),
  });
}

/** Bytes the TokenMetadata TLV entry adds to the mint: header 4 + authority 32 + mint 32 + 3 strings + empty extra-fields vec. */
export function tokenMetadataLen(p: { name: string; symbol: string; uri: string }): number {
  return 4 + 32 + 32 + 4 + utf8(p.name).length + 4 + utf8(p.symbol).length + 4 + utf8(p.uri).length + 4;
}

/** 1,000,000,000 tokens at 6 decimals, like a pump.fun coin. */
export const DEFAULT_TOKEN_SUPPLY = 1_000_000_000n * 10n ** 6n;

export interface TokenLaunchParams {
  conn: Connection;
  user: PublicKey;
  vaultWallet: PublicKey;
  vaultState?: PublicKey;
  mint: PublicKey;
  name: string;
  symbol: string;
  uri: string;
  /** Whole supply in base units, all minted into the vault. Default 1B × 10^6. */
  supply?: bigint;
  decimals?: number;
  cluster?: ClusterName;
}

export interface TokenLaunchPlan {
  transaction: Transaction;
  mint: PublicKey;
  vaultTokenAccount: PublicKey;
  supply: bigint;
  decimals: number;
  /** Rent the mint account holds (paid by the user). */
  mintRentLamports: bigint;
  size: number;
}

/**
 * One legacy transaction, signed by the user and the new mint: a Token-2022 mint (metadata pointer
 * to itself, no freeze authority), its TokenMetadata (name, symbol, uri), the vault's token account,
 * the whole fixed supply minted into it, then the metadata update authority and the mint authority
 * removed. The result reads in the vault like a pump.fun coin: Token-2022, 6 decimals, zero risk flags.
 */
export async function buildTokenLaunchTx(p: TokenLaunchParams): Promise<TokenLaunchPlan> {
  if (p.cluster) assertClusterAllowed(p.cluster);
  assertPumpText(p, { allowEmptyUri: true });
  const decimals = p.decimals ?? PUMP_DECIMALS;
  if (!Number.isInteger(decimals) || decimals < 0 || decimals > 9) throw new PumpInputError('decimals must be 0–9');
  const supply = p.supply ?? DEFAULT_TOKEN_SUPPLY;
  if (supply <= 0n || supply > 0xffff_ffff_ffff_ffffn) throw new PumpInputError('supply must be between 1 and 2^64 − 1 base units');
  if (p.vaultState) await assertVaultOpen(p.conn, p.vaultState, p.vaultWallet);
  const existing = await p.conn.getAccountInfo(p.mint, 'confirmed');
  if (existing) throw new Error('The mint address is already in use. Start the launch again for a fresh one.');

  const mintLen = getMintLen([ExtensionType.MetadataPointer]);
  const mintRentLamports = BigInt(await p.conn.getMinimumBalanceForRentExemption(mintLen + tokenMetadataLen(p), 'confirmed'));
  const vaultTokenAccount = ataOf(p.vaultWallet, p.mint, TOKEN_2022_PROGRAM_ID);
  const ixs: TransactionInstruction[] = [
    SystemProgram.createAccount({ fromPubkey: p.user, newAccountPubkey: p.mint, space: mintLen, lamports: Number(mintRentLamports), programId: TOKEN_2022_PROGRAM_ID }),
    createInitializeMetadataPointerInstruction(p.mint, null, p.mint, TOKEN_2022_PROGRAM_ID),
    createInitializeMint2Instruction(p.mint, decimals, p.user, null, TOKEN_2022_PROGRAM_ID),
    tokenMetadataInitializeIx({ mint: p.mint, updateAuthority: p.user, mintAuthority: p.user, name: p.name, symbol: p.symbol, uri: p.uri }),
    createAssociatedTokenAccountIdempotentInstruction(p.user, vaultTokenAccount, p.vaultWallet, p.mint, TOKEN_2022_PROGRAM_ID),
    createMintToCheckedInstruction(p.mint, vaultTokenAccount, p.user, supply, decimals, [], TOKEN_2022_PROGRAM_ID),
    tokenMetadataUpdateAuthorityIx({ mint: p.mint, currentAuthority: p.user, newAuthority: null }),
    createSetAuthorityInstruction(p.mint, p.user, AuthorityType.MintTokens, null, [], TOKEN_2022_PROGRAM_ID),
  ];
  const size = measureTx(ixs, p.user);
  if (size > LEGACY_TX_LIMIT) throw new TransactionTooLargeError('The launch', size);
  const bh = await p.conn.getLatestBlockhash('confirmed');
  return { transaction: legacyTx(ixs, p.user, bh), mint: p.mint, vaultTokenAccount, supply, decimals, mintRentLamports, size };
}

// ---- creator fees ------------------------------------------------------------------------------

export interface CreatorFeeCoin {
  mint: PublicKey;
  bondingCurve: PublicKey;
  /** The curve sold out and the coin moved to PumpSwap. */
  complete: boolean;
  /** Creator fee v3 trades left on the curve (lamports), not yet swept into the creator vault. */
  unswept: bigint;
  /** The coin's canonical PumpSwap pool, once it exists. */
  pool: { address: PublicKey; quoteTokenAccount: PublicKey; unswept: bigint } | null;
}

export interface CreatorFees {
  creator: PublicKey;
  creatorVault: PublicKey;
  /** Lamports `collect_creator_fee_v2` pays out now (above the creator vault's rent-exempt minimum). */
  vaultLamports: bigint;
  /** Coins (among the candidates) whose pump.fun creator is `creator`. */
  coins: CreatorFeeCoin[];
  /** Wrapped SOL waiting in PumpSwap for this creator (after graduation). */
  ammLamports: bigint;
  ammTokenAccount: PublicKey;
  /** Everything that collecting would move into `creator`. */
  total: bigint;
}

const TOKEN_AMOUNT_OFFSET = 64;
function tokenAmount(data: Uint8Array | null | undefined): bigint {
  if (!data || data.length < TOKEN_AMOUNT_OFFSET + 8) return 0n;
  return new DataView(data.buffer, data.byteOffset + TOKEN_AMOUNT_OFFSET, 8).getBigUint64(0, true);
}

/**
 * Creator fees waiting for `creator` (a vault wallet). The creator vault is shared by every coin the
 * creator has; fees that v3 trades left on a curve (or in a PumpSwap pool) are per coin, so pass the
 * coins to look at (e.g. the Token-2022 mints the vault holds plus the ones it launched).
 */
export async function fetchCreatorFees(conn: Connection, creator: PublicKey, candidateMints: PublicKey[] = []): Promise<CreatorFees> {
  const mints = [...new Map(candidateMints.map((m) => [m.toBase58(), m])).values()];
  const creatorVault = creatorVaultPda(creator);
  const ammAuthority = ammCreatorVaultAuthorityPda(creator);
  const ammTokenAccount = ataOf(ammAuthority, WSOL_MINT, SPL_TOKEN_PROGRAM_ID);
  const curves = mints.map(bondingCurvePda);
  const [vaultInfo, ammInfo, ...curveInfos] = await conn.getMultipleAccountsInfo([creatorVault, ammTokenAccount, ...curves], 'confirmed');
  const rent = vaultInfo ? BigInt(await conn.getMinimumBalanceForRentExemption(vaultInfo.data.length, 'confirmed')) : 0n;
  const vaultLamports = vaultInfo && BigInt(vaultInfo.lamports) > rent ? BigInt(vaultInfo.lamports) - rent : 0n;

  const coins: CreatorFeeCoin[] = [];
  mints.forEach((mint, i) => {
    const info = curveInfos[i];
    if (!info) return;
    try {
      const c = decodeBondingCurve(info.data);
      if (!c.creator.equals(creator) || !c.quoteMint.equals(PublicKey.default)) return; // SOL-paired coins of this creator only
      coins.push({ mint, bondingCurve: curves[i]!, complete: c.complete, unswept: c.creatorFee, pool: null });
    } catch {
      /* not a pump.fun curve */
    }
  });
  const graduated = coins.filter((c) => c.complete);
  if (graduated.length) {
    const pools = graduated.map((c) => canonicalPoolPda(c.mint));
    const infos = await conn.getMultipleAccountsInfo(pools, 'confirmed');
    graduated.forEach((c, i) => {
      const info = infos[i];
      if (!info) return;
      try {
        const pool = decodePumpPool(info.data);
        if (pool.coinCreator.equals(creator)) c.pool = { address: pools[i]!, quoteTokenAccount: pool.poolQuoteTokenAccount, unswept: pool.creatorFees };
      } catch {
        /* not a PumpSwap pool */
      }
    });
  }
  const ammLamports = tokenAmount(ammInfo?.data);
  const total = vaultLamports + ammLamports + coins.reduce((a, c) => a + c.unswept + (c.pool?.unswept ?? 0n), 0n);
  return { creator, creatorVault, vaultLamports, coins, ammLamports, ammTokenAccount, total };
}

export class NothingToCollectError extends Error {
  constructor() {
    super('No creator fees are waiting for this vault.');
    this.name = 'NothingToCollectError';
  }
}

/**
 * Permissionless creator-fee collection into `creator` (a vault wallet): sweep each coin's waiting
 * bucket into the creator vault, then `collect_creator_fee_v2` (SOL into the vault); after
 * graduation, sweep the pool and `collect_coin_creator_fee` (wrapped SOL into the vault's wSOL token
 * account, opened if needed). No account of the vault signs: `payer` (any wallet) pays the fees.
 * Refuses when the SOL would take the vault past the deposit cap, or leave it below rent-exempt.
 */
export async function buildCollectCreatorFeesTx(p: {
  conn: Connection;
  payer: PublicKey;
  creator: PublicKey;
  fees: CreatorFees;
  /** The vault's current SOL balance (fetched when omitted). */
  creatorLamports?: bigint;
  cluster?: ClusterName;
}): Promise<Transaction[]> {
  if (p.cluster) assertClusterAllowed(p.cluster);
  const f = p.fees;
  if (!f.creator.equals(p.creator)) throw new Error('fees were fetched for another creator');
  const solIn = f.vaultLamports + f.coins.reduce((a, c) => a + c.unswept, 0n);
  const ammIn = f.ammLamports + f.coins.reduce((a, c) => a + (c.pool?.unswept ?? 0n), 0n);
  if (solIn <= 0n && ammIn <= 0n) throw new NothingToCollectError();

  const txs: TransactionInstruction[][] = [];
  if (solIn > 0n) {
    const current = p.creatorLamports ?? BigInt(await p.conn.getBalance(p.creator, 'confirmed'));
    if (current + solIn > BETA_CAP_LAMPORTS) throw new BetaCapError(current, solIn);
    if (current + solIn < SYSTEM_ACCOUNT_RENT_LAMPORTS) {
      throw new Error(
        `The vault must end up with at least ${formatAmount(SYSTEM_ACCOUNT_RENT_LAMPORTS, 9)} SOL (rent-exempt minimum) to receive ${formatAmount(solIn, 9)} SOL of fees. Deposit a little SOL first, or wait for more fees.`,
      );
    }
    txs.push([
      ...f.coins.filter((c) => c.unswept > 0n).map((c) => sweepCreatorFeeIx({ payer: p.payer, mint: c.mint, curveCreator: p.creator })),
      collectCreatorFeeV2Ix({ creator: p.creator }),
    ]);
  }
  if (ammIn > 0n) {
    const destination = ataOf(p.creator, WSOL_MINT, SPL_TOKEN_PROGRAM_ID);
    const ammAuthority = ammCreatorVaultAuthorityPda(p.creator);
    // collect_coin_creator_fee moves between two existing token accounts and creates neither.
    txs.push([
      createAssociatedTokenAccountIdempotentInstruction(p.payer, f.ammTokenAccount, ammAuthority, WSOL_MINT, SPL_TOKEN_PROGRAM_ID),
      createAssociatedTokenAccountIdempotentInstruction(p.payer, destination, p.creator, WSOL_MINT, SPL_TOKEN_PROGRAM_ID),
      ...f.coins.filter((c) => c.pool && c.pool.unswept > 0n).map((c) => ammSweepCreatorFeeIx({ payer: p.payer, pool: c.pool!.address, poolQuoteTokenAccount: c.pool!.quoteTokenAccount, coinCreator: p.creator })),
      collectCoinCreatorFeeIx({ coinCreator: p.creator, destination }),
    ]);
  }
  const bh = await p.conn.getLatestBlockhash('confirmed');
  return txs.map((ixs, i) => {
    const size = measureTx(ixs, p.payer);
    if (size > LEGACY_TX_LIMIT) throw new TransactionTooLargeError(`Creator-fee collection ${i + 1}/${txs.length}`, size);
    return legacyTx(ixs, p.payer, bh);
  });
}
