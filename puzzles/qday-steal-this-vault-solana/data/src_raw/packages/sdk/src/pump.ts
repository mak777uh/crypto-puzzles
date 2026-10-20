// pump.fun programs: addresses, PDAs, account decoders and the few instructions a vault launch uses.
//
// Layouts follow the official IDLs (pump-fun/pump-public-docs idl/pump.json and idl/pump_amm.json,
// refreshed 2026-10-07; identical to the IDLs inside @pump-fun/pump-sdk 4.0.0). A trimmed copy sits
// in test/fixtures/pump-idl.json and the tests check every builder against it: discriminator,
// account order, writable/signer flags, PDA seeds and argument encoding.
//
// Scope (owner-approved guardrail, 2026-10-08): create_v2 with the vault as creator, at most one
// dev buy by the same wallet in the same transaction, and the permissionless creator-fee sweeps and
// collects. No sell, no other trade instruction, nothing that trades on anyone's behalf.

import { Buffer } from 'buffer';
import { PublicKey, SystemProgram, TransactionInstruction } from '@solana/web3.js';
import type { AccountMeta } from '@solana/web3.js';
import { BorshReader, BorshWriter, ixDiscriminator, utf8 } from './bytes';
import { ASSOCIATED_TOKEN_PROGRAM_ID, SPL_TOKEN_PROGRAM_ID, TOKEN_2022_PROGRAM_ID } from './constants';
import { ataOf } from './addresses';

export const PUMP_PROGRAM_ID = new PublicKey('6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P');
export const PUMP_AMM_PROGRAM_ID = new PublicKey('pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA');
export const PUMP_FEES_PROGRAM_ID = new PublicKey('pfeeUxB6jkeY1Hxd7CsFCAjcbHA9rWtchMGdZ6VojVZ');
export const MAYHEM_PROGRAM_ID = new PublicKey('MAyhSmzXzV1pTf7LsNkrNwkWKTo4ougAJ1PPg47MD4e');
/** Wrapped SOL: the quote mint pump.fun's v2/v3 instructions take for SOL-paired coins. */
export const WSOL_MINT = new PublicKey('So11111111111111111111111111111111111111112');

/** create_v2 argument limits (docs/instructions/COIN_CREATION.md), in UTF-8 bytes. */
export const PUMP_NAME_MAX = 32;
export const PUMP_SYMBOL_MAX = 13;
export const PUMP_URI_MAX = 200;
/** Every pump.fun coin (mayhem off): 1,000,000,000 tokens at 6 decimals. */
export const PUMP_DECIMALS = 6;

export const PUMP_IX = {
  createV2: ixDiscriminator('create_v2'),
  buyV3: ixDiscriminator('buy_v3'),
  sweepCreatorFee: ixDiscriminator('sweep_creator_fee'),
  collectCreatorFeeV2: ixDiscriminator('collect_creator_fee_v2'),
} as const;

export const PUMP_AMM_IX = {
  sweepCreatorFee: ixDiscriminator('sweep_creator_fee'),
  collectCoinCreatorFee: ixDiscriminator('collect_coin_creator_fee'),
} as const;

const pda = (seeds: Uint8Array[], program: PublicKey): PublicKey => PublicKey.findProgramAddressSync(seeds, program)[0];

// ---- PDAs (seeds as in the IDL) ----------------------------------------------------------------

export const pumpGlobalPda = (): PublicKey => pda([utf8('global')], PUMP_PROGRAM_ID);
export const pumpMintAuthorityPda = (): PublicKey => pda([utf8('mint-authority')], PUMP_PROGRAM_ID);
export const pumpEventAuthorityPda = (): PublicKey => pda([utf8('__event_authority')], PUMP_PROGRAM_ID);
export const bondingCurvePda = (mint: PublicKey): PublicKey => pda([utf8('bonding-curve'), mint.toBytes()], PUMP_PROGRAM_ID);
/** Where a coin creator's bonding-curve fees wait: one per creator, shared by all its coins. */
export const creatorVaultPda = (creator: PublicKey): PublicKey => pda([utf8('creator-vault'), creator.toBytes()], PUMP_PROGRAM_ID);
/** The creator create_v2 records for a holder-rewards coin (instead of the `creator` argument). */
export const holderRewardsPda = (mint: PublicKey): PublicKey => pda([utf8('holder-rewards'), mint.toBytes()], PUMP_PROGRAM_ID);
export const userVolumeAccumulatorPda = (user: PublicKey): PublicKey => pda([utf8('user_volume_accumulator'), user.toBytes()], PUMP_PROGRAM_ID);
export const pumpFeeConfigPda = (): PublicKey => pda([utf8('fee_config'), PUMP_PROGRAM_ID.toBytes()], PUMP_FEES_PROGRAM_ID);
export const mayhemGlobalParamsPda = (): PublicKey => pda([utf8('global-params')], MAYHEM_PROGRAM_ID);
export const mayhemSolVaultPda = (): PublicKey => pda([utf8('sol-vault')], MAYHEM_PROGRAM_ID);
export const mayhemStatePda = (mint: PublicKey): PublicKey => pda([utf8('mayhem-state'), mint.toBytes()], MAYHEM_PROGRAM_ID);
export const mayhemTokenVault = (mint: PublicKey): PublicKey => ataOf(mayhemSolVaultPda(), mint, TOKEN_2022_PROGRAM_ID);

// PumpSwap (pump_amm), where coins trade after graduation.
export const ammGlobalConfigPda = (): PublicKey => pda([utf8('global_config')], PUMP_AMM_PROGRAM_ID);
export const ammEventAuthorityPda = (): PublicKey => pda([utf8('__event_authority')], PUMP_AMM_PROGRAM_ID);
/** pump's `pool-authority` PDA: the creator of a coin's canonical PumpSwap pool. */
export const pumpPoolAuthorityPda = (mint: PublicKey): PublicKey => pda([utf8('pool-authority'), mint.toBytes()], PUMP_PROGRAM_ID);
/** The canonical PumpSwap pool of a SOL-paired pump coin (index 0, created by `migrate`). */
export function canonicalPoolPda(mint: PublicKey, quoteMint: PublicKey = WSOL_MINT): PublicKey {
  const index = new Uint8Array(2); // u16 LE 0
  return pda([utf8('pool'), index, pumpPoolAuthorityPda(mint).toBytes(), mint.toBytes(), quoteMint.toBytes()], PUMP_AMM_PROGRAM_ID);
}
/** PumpSwap's authority over a coin creator's fee account (seed `creator_vault`, underscore). */
export const ammCreatorVaultAuthorityPda = (creator: PublicKey): PublicKey => pda([utf8('creator_vault'), creator.toBytes()], PUMP_AMM_PROGRAM_ID);

// ---- encoding helpers ----------------------------------------------------------------------------

const w = (pubkey: PublicKey, isSigner = false): AccountMeta => ({ pubkey, isSigner, isWritable: true });
const r = (pubkey: PublicKey): AccountMeta => ({ pubkey, isSigner: false, isWritable: false });

function borshString(wr: BorshWriter, s: string): BorshWriter {
  return wr.vec(utf8(s));
}

const pumpIx = (keys: AccountMeta[], data: Uint8Array) => new TransactionInstruction({ programId: PUMP_PROGRAM_ID, keys, data: Buffer.from(data) });
const ammIx = (keys: AccountMeta[], data: Uint8Array) => new TransactionInstruction({ programId: PUMP_AMM_PROGRAM_ID, keys, data: Buffer.from(data) });

export class PumpInputError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PumpInputError';
  }
}

/**
 * Checks name/symbol/uri against create_v2's limits (UTF-8 bytes) and refuses control characters.
 * `allowEmptyUri`: a plain Token-2022 mint may have no metadata URI (pump.fun coins always have one).
 */
export function assertPumpText(p: { name: string; symbol: string; uri: string }, opts: { allowEmptyUri?: boolean } = {}): void {
  const check = (what: string, v: string, max: number) => {
    if (!v.trim()) {
      if (what === 'Metadata URI' && opts.allowEmptyUri && v === '') return;
      throw new PumpInputError(`${what} is empty`);
    }
    if (v !== v.trim()) throw new PumpInputError(`${what} has leading or trailing spaces`);
    // C0/C1 controls, bidi overrides and zero-width characters: they make names read differently.
    if (/[\u0000-\u001f\u007f-\u009f​-‏‪-‮⁠-⁩﻿]/u.test(v)) throw new PumpInputError(`${what} contains control or invisible characters`);
    const n = utf8(v).length;
    if (n > max) throw new PumpInputError(`${what} is ${n} bytes; the limit is ${max}`);
  };
  check('Name', p.name, PUMP_NAME_MAX);
  check('Symbol', p.symbol, PUMP_SYMBOL_MAX);
  check('Metadata URI', p.uri, PUMP_URI_MAX);
}

// ---- instructions --------------------------------------------------------------------------------

/**
 * `create_v2`: a Token-2022 coin (6 decimals, metadata pointer to itself, mint and freeze authority
 * none) on a SOL-paired bonding curve. `creator` receives the creator fees (ignored by the program
 * when `isHolderReward`: it records `holderRewardsPda(mint)` instead). The deprecated cashback flag is
 * always sent as `[false]` and `creator_fee_bps` as `[0]` (the standard schedule), like pump.fun's SDK.
 */
export function createV2Ix(p: {
  mint: PublicKey;
  user: PublicKey;
  creator: PublicKey;
  name: string;
  symbol: string;
  uri: string;
  isMayhemMode: boolean;
  isHolderReward: boolean;
}): TransactionInstruction {
  assertPumpText(p);
  if (p.creator.equals(PublicKey.default)) throw new PumpInputError('creator must not be the default key');
  const bondingCurve = bondingCurvePda(p.mint);
  const wr = new BorshWriter().raw(PUMP_IX.createV2);
  borshString(wr, p.name);
  borshString(wr, p.symbol);
  borshString(wr, p.uri);
  const data = wr
    .raw(p.creator.toBytes())
    .u8(p.isMayhemMode ? 1 : 0)
    .u8(0) // is_cashback_enabled: OptionBool([false]) (deprecated; [true] is rejected)
    .u64(0n) // creator_fee_bps: OptionU64([0]) = the standard schedule
    .u8(p.isHolderReward ? 1 : 0) // is_holder_reward: OptionBool
    .bytes();
  return pumpIx(
    [
      w(p.mint, true),
      r(pumpMintAuthorityPda()),
      w(bondingCurve),
      w(ataOf(bondingCurve, p.mint, TOKEN_2022_PROGRAM_ID)),
      r(pumpGlobalPda()),
      w(p.user, true),
      r(SystemProgram.programId),
      r(TOKEN_2022_PROGRAM_ID),
      r(ASSOCIATED_TOKEN_PROGRAM_ID),
      w(MAYHEM_PROGRAM_ID), // writable in the IDL
      r(mayhemGlobalParamsPda()),
      w(mayhemSolVaultPda()),
      w(mayhemStatePda(p.mint)),
      w(mayhemTokenVault(p.mint)),
      r(pumpEventAuthorityPda()),
      r(PUMP_PROGRAM_ID),
    ],
    data,
  );
}

/**
 * `buy_v3`: buy exactly `amount` base units for at most `maxSolCost` lamports (fees included) on a
 * SOL-paired Token-2022 coin. The protocol and creator fees stay on the curve until swept; only
 * the buyback part is paid in the trade, to `buybackFeeRecipient` (one of Global's 8). The base
 * tokens land in `associatedBaseUser`, the user's existing token account for the mint.
 */
export function buyV3Ix(p: {
  mint: PublicKey;
  user: PublicKey;
  associatedBaseUser: PublicKey;
  amount: bigint;
  maxSolCost: bigint;
  buybackFeeRecipient: PublicKey;
}): TransactionInstruction {
  if (p.amount <= 0n) throw new PumpInputError('buy amount must be greater than zero');
  const bondingCurve = bondingCurvePda(p.mint);
  const data = new BorshWriter()
    .raw(PUMP_IX.buyV3)
    .u64(p.amount)
    .u64(p.maxSolCost)
    .u8(0) // partial_fill: OptionBool([false]) (mayhem coins only)
    .bytes();
  return pumpIx(
    [
      r(pumpGlobalPda()),
      r(p.mint),
      r(WSOL_MINT),
      r(TOKEN_2022_PROGRAM_ID),
      r(SPL_TOKEN_PROGRAM_ID),
      w(bondingCurve),
      w(ataOf(bondingCurve, p.mint, TOKEN_2022_PROGRAM_ID)),
      w(ataOf(bondingCurve, WSOL_MINT, SPL_TOKEN_PROGRAM_ID)), // derived; unused for SOL-paired coins
      w(p.user, true),
      w(p.associatedBaseUser),
      w(ataOf(p.user, WSOL_MINT, SPL_TOKEN_PROGRAM_ID)), // derived; unused for SOL-paired coins
      w(userVolumeAccumulatorPda(p.user)),
      r(pumpFeeConfigPda()),
      w(p.buybackFeeRecipient),
      r(SystemProgram.programId),
      r(pumpEventAuthorityPda()),
      r(PUMP_PROGRAM_ID),
    ],
    data,
  );
}

/**
 * Pump `sweep_creator_fee` (permissionless): moves the creator fee that v3 trades left on a SOL-paired
 * curve (`BondingCurve.creator_fee`) into the creator vault of `curveCreator`. `payer` signs only to
 * cover a possible rent top-up.
 */
export function sweepCreatorFeeIx(p: { payer: PublicKey; mint: PublicKey; curveCreator: PublicKey }): TransactionInstruction {
  const bondingCurve = bondingCurvePda(p.mint);
  const recipient = creatorVaultPda(p.curveCreator);
  return pumpIx(
    [
      w(p.payer, true),
      r(pumpGlobalPda()),
      r(p.mint),
      r(WSOL_MINT),
      r(SPL_TOKEN_PROGRAM_ID),
      r(ASSOCIATED_TOKEN_PROGRAM_ID),
      r(SystemProgram.programId),
      w(bondingCurve),
      w(ataOf(bondingCurve, WSOL_MINT, SPL_TOKEN_PROGRAM_ID)),
      w(recipient),
      w(ataOf(recipient, WSOL_MINT, SPL_TOKEN_PROGRAM_ID)),
      r(pumpEventAuthorityPda()),
      r(PUMP_PROGRAM_ID),
    ],
    PUMP_IX.sweepCreatorFee,
  );
}

/**
 * Pump `collect_creator_fee_v2` (permissionless: no account signs): pays the SOL in
 * `creatorVaultPda(creator)` out to `creator`, leaving the creator vault rent-exempt.
 */
export function collectCreatorFeeV2Ix(p: { creator: PublicKey }): TransactionInstruction {
  const vault = creatorVaultPda(p.creator);
  return pumpIx(
    [
      w(p.creator),
      w(ataOf(p.creator, WSOL_MINT, SPL_TOKEN_PROGRAM_ID)), // unused for SOL-paired coins
      w(vault),
      w(ataOf(vault, WSOL_MINT, SPL_TOKEN_PROGRAM_ID)), // unused for SOL-paired coins
      r(WSOL_MINT),
      r(SPL_TOKEN_PROGRAM_ID),
      r(ASSOCIATED_TOKEN_PROGRAM_ID),
      r(SystemProgram.programId),
      r(pumpEventAuthorityPda()),
      r(PUMP_PROGRAM_ID),
    ],
    PUMP_IX.collectCreatorFeeV2,
  );
}

/** PumpSwap `sweep_creator_fee` (permissionless): the pool's waiting creator fee into the creator's PumpSwap fee account. */
export function ammSweepCreatorFeeIx(p: { payer: PublicKey; pool: PublicKey; poolQuoteTokenAccount: PublicKey; coinCreator: PublicKey }): TransactionInstruction {
  const recipient = ammCreatorVaultAuthorityPda(p.coinCreator);
  return ammIx(
    [
      w(p.payer, true),
      r(ammGlobalConfigPda()),
      w(p.pool),
      r(WSOL_MINT),
      r(SPL_TOKEN_PROGRAM_ID),
      w(p.poolQuoteTokenAccount),
      r(recipient),
      w(ataOf(recipient, WSOL_MINT, SPL_TOKEN_PROGRAM_ID)),
      r(SystemProgram.programId),
      r(ASSOCIATED_TOKEN_PROGRAM_ID),
      r(ammEventAuthorityPda()),
      r(PUMP_AMM_PROGRAM_ID),
    ],
    PUMP_AMM_IX.sweepCreatorFee,
  );
}

/**
 * PumpSwap `collect_coin_creator_fee` (permissionless: no account signs): moves the creator's wrapped-SOL
 * fees out of PumpSwap into `destination`, a wrapped-SOL token account owned by `coinCreator`
 * (it must exist: create its ATA first).
 */
export function collectCoinCreatorFeeIx(p: { coinCreator: PublicKey; destination: PublicKey }): TransactionInstruction {
  const authority = ammCreatorVaultAuthorityPda(p.coinCreator);
  return ammIx(
    [
      r(WSOL_MINT),
      r(SPL_TOKEN_PROGRAM_ID),
      r(p.coinCreator),
      r(authority),
      w(ataOf(authority, WSOL_MINT, SPL_TOKEN_PROGRAM_ID)),
      w(p.destination),
      r(ammEventAuthorityPda()),
      r(PUMP_AMM_PROGRAM_ID),
    ],
    PUMP_AMM_IX.collectCoinCreatorFee,
  );
}

// ---- accounts ------------------------------------------------------------------------------------

export const PUMP_ACCOUNT_DISCRIMINATORS = {
  Global: Uint8Array.from([167, 232, 232, 177, 200, 108, 114, 127]),
  BondingCurve: Uint8Array.from([23, 183, 248, 55, 96, 216, 172, 96]),
  FeeConfig: Uint8Array.from([143, 52, 146, 187, 219, 123, 76, 155]),
  Pool: Uint8Array.from([241, 154, 109, 4, 17, 177, 109, 188]),
} as const;

function expectDiscriminator(data: Uint8Array, want: Uint8Array, what: string): BorshReader {
  if (data.length < 8 || !want.every((b, i) => data[i] === b)) throw new Error(`not a pump.fun ${what} account`);
  const rd = new BorshReader(data);
  rd.fixed(8);
  return rd;
}

const readKey = (rd: BorshReader) => new PublicKey(rd.fixed(32));

/** Fields older accounts may not have yet read as zero/false (pump.fun appends fields; see SWEEP_FEES.md). */
function tail<T>(read: () => T, fallback: T): T {
  try {
    return read();
  } catch {
    return fallback;
  }
}

export interface PumpGlobal {
  initialVirtualTokenReserves: bigint;
  initialVirtualSolReserves: bigint;
  initialRealTokenReserves: bigint;
  tokenTotalSupply: bigint;
  feeBasisPoints: bigint;
  creatorFeeBasisPoints: bigint;
  adminSetCreatorAuthority: PublicKey;
  createV2Enabled: boolean;
  mayhemModeEnabled: boolean;
  buybackFeeRecipients: PublicKey[];
  isHolderRewardEnabled: boolean;
}

export function decodePumpGlobal(data: Uint8Array): PumpGlobal {
  const rd = expectDiscriminator(data, PUMP_ACCOUNT_DISCRIMINATORS.Global, 'Global');
  rd.bool(); // initialized
  readKey(rd); // authority
  readKey(rd); // fee_recipient
  const initialVirtualTokenReserves = rd.u64();
  const initialVirtualSolReserves = rd.u64();
  const initialRealTokenReserves = rd.u64();
  const tokenTotalSupply = rd.u64();
  const feeBasisPoints = rd.u64();
  readKey(rd); // withdraw_authority
  rd.bool(); // enable_migrate
  rd.u64(); // pool_migration_fee
  const creatorFeeBasisPoints = rd.u64();
  for (let i = 0; i < 7; i++) readKey(rd); // fee_recipients
  readKey(rd); // set_creator_authority
  const adminSetCreatorAuthority = readKey(rd);
  const createV2Enabled = rd.bool();
  readKey(rd); // whitelist_pda
  readKey(rd); // reserved_fee_recipient
  const mayhemModeEnabled = rd.bool();
  for (let i = 0; i < 7; i++) readKey(rd); // reserved_fee_recipients
  rd.bool(); // is_cashback_enabled
  const buybackFeeRecipients = Array.from({ length: 8 }, () => readKey(rd));
  rd.u64(); // buyback_basis_points
  rd.u64(); // initial_virtual_quote_reserves
  readKey(rd); // whitelisted_quote_mints[0]
  tail(() => rd.bool(), false); // creator_fee_configurable
  tail(() => rd.u64(), 0n); // max_configurable_creator_fee_bps
  tail(() => readKey(rd), PublicKey.default); // holder_reward_claim_authority
  const isHolderRewardEnabled = tail(() => rd.bool(), false);
  return {
    initialVirtualTokenReserves,
    initialVirtualSolReserves,
    initialRealTokenReserves,
    tokenTotalSupply,
    feeBasisPoints,
    creatorFeeBasisPoints,
    adminSetCreatorAuthority,
    createV2Enabled,
    mayhemModeEnabled,
    buybackFeeRecipients: buybackFeeRecipients.filter((k) => !k.equals(PublicKey.default)),
    isHolderRewardEnabled,
  };
}

export interface PumpBondingCurve {
  virtualTokenReserves: bigint;
  virtualQuoteReserves: bigint;
  realTokenReserves: bigint;
  realQuoteReserves: bigint;
  tokenTotalSupply: bigint;
  complete: boolean;
  /** Where creator fees go: the creator argument, a holder-rewards PDA or a fee-sharing config. */
  creator: PublicKey;
  isMayhemMode: boolean;
  isCashbackCoin: boolean;
  /** The zero key for SOL-paired coins. */
  quoteMint: PublicKey;
  isHolderReward: boolean;
  /** Creator fee v3 trades left on the curve, not yet swept into the creator vault. */
  creatorFee: bigint;
}

export function decodeBondingCurve(data: Uint8Array): PumpBondingCurve {
  const rd = expectDiscriminator(data, PUMP_ACCOUNT_DISCRIMINATORS.BondingCurve, 'BondingCurve');
  const virtualTokenReserves = rd.u64();
  const virtualQuoteReserves = rd.u64();
  const realTokenReserves = rd.u64();
  const realQuoteReserves = rd.u64();
  const tokenTotalSupply = rd.u64();
  const complete = rd.bool();
  const creator = readKey(rd);
  const isMayhemMode = tail(() => rd.bool(), false);
  const isCashbackCoin = tail(() => rd.bool(), false);
  const quoteMint = tail(() => readKey(rd), PublicKey.default);
  tail(() => rd.u64(), 0n); // creator_fee_bps
  tail(() => rd.bool(), false); // can_edit_creator_fee
  const isHolderReward = tail(() => rd.bool(), false);
  const creatorFee = tail(() => rd.u64(), 0n);
  return { virtualTokenReserves, virtualQuoteReserves, realTokenReserves, realQuoteReserves, tokenTotalSupply, complete, creator, isMayhemMode, isCashbackCoin, quoteMint, isHolderReward, creatorFee };
}

export interface PumpFees {
  lpFeeBps: bigint;
  protocolFeeBps: bigint;
  creatorFeeBps: bigint;
}

export interface PumpFeeConfig {
  /** Market-cap tiers for SOL-paired coins, thresholds in lamports. */
  feeTiers: Array<{ marketCapLamportsThreshold: bigint; fees: PumpFees }>;
}

export function decodePumpFeeConfig(data: Uint8Array): PumpFeeConfig {
  const rd = expectDiscriminator(data, PUMP_ACCOUNT_DISCRIMINATORS.FeeConfig, 'FeeConfig');
  rd.u8(); // bump
  readKey(rd); // admin
  const fees = (): PumpFees => ({ lpFeeBps: rd.u64(), protocolFeeBps: rd.u64(), creatorFeeBps: rd.u64() });
  fees(); // flat_fees
  const n = rd.u32();
  if (n > 64) throw new Error('FeeConfig: implausible tier count');
  const feeTiers = Array.from({ length: n }, () => {
    const lo = rd.u64();
    const hi = rd.u64();
    return { marketCapLamportsThreshold: (hi << 64n) | lo, fees: fees() };
  });
  return { feeTiers };
}

export interface PumpPool {
  baseMint: PublicKey;
  quoteMint: PublicKey;
  poolQuoteTokenAccount: PublicKey;
  coinCreator: PublicKey;
  /** Creator fee v2 pool trades left in the pool, not yet swept. */
  creatorFees: bigint;
}

export function decodePumpPool(data: Uint8Array): PumpPool {
  const rd = expectDiscriminator(data, PUMP_ACCOUNT_DISCRIMINATORS.Pool, 'Pool');
  rd.u8(); // pool_bump
  rd.u16(); // index
  readKey(rd); // creator
  const baseMint = readKey(rd);
  const quoteMint = readKey(rd);
  readKey(rd); // lp_mint
  readKey(rd); // pool_base_token_account
  const poolQuoteTokenAccount = readKey(rd);
  rd.u64(); // lp_supply
  const coinCreator = tail(() => readKey(rd), PublicKey.default);
  tail(() => rd.bool(), false); // is_mayhem_mode
  tail(() => rd.bool(), false); // is_cashback_coin
  tail(() => rd.fixed(16), new Uint8Array(16)); // virtual_quote_reserves (i128)
  tail(() => rd.u64(), 0n); // creator_fee_bps
  tail(() => rd.bool(), false); // can_edit_creator_fee
  tail(() => rd.bool(), false); // is_holder_reward
  tail(() => rd.u64(), 0n); // protocol_fees
  const creatorFees = tail(() => rd.u64(), 0n);
  return { baseMint, quoteMint, poolQuoteTokenAccount, coinCreator, creatorFees };
}

// ---- dev buy quote -------------------------------------------------------------------------------

const BPS = 10_000n;
const ceilDiv = (a: bigint, b: bigint) => (a + b - 1n) / b;

/** The fee rates (protocol, creator) a fresh SOL-paired curve charges, as pump.fun's SDK selects them. */
export function freshCurveFeeBps(global: PumpGlobal, feeConfig: PumpFeeConfig | null): { protocolFeeBps: bigint; creatorFeeBps: bigint } {
  const tiers = feeConfig?.feeTiers ?? [];
  if (tiers.length === 0) return { protocolFeeBps: global.feeBasisPoints, creatorFeeBps: global.creatorFeeBasisPoints };
  // Market cap of a fresh, non-mayhem curve: virtual SOL × 1B supply / virtual tokens.
  const marketCap = (global.initialVirtualSolReserves * 1_000_000_000_000_000n) / global.initialVirtualTokenReserves;
  let tier = tiers[0]!;
  if (marketCap >= tier.marketCapLamportsThreshold) {
    for (const t of [...tiers].reverse()) {
      if (marketCap >= t.marketCapLamportsThreshold) {
        tier = t;
        break;
      }
    }
  }
  return { protocolFeeBps: tier.fees.protocolFeeBps, creatorFeeBps: tier.fees.creatorFeeBps };
}

/** Lamports a buy of `tokens` costs on a fresh curve, fees included (the program's rounding). */
export function freshCurveBuyCost(global: PumpGlobal, fees: { protocolFeeBps: bigint; creatorFeeBps: bigint }, tokens: bigint): bigint {
  if (tokens <= 0n) return 0n;
  if (tokens >= global.initialVirtualTokenReserves) throw new PumpInputError('more tokens than the curve holds');
  const sol = (tokens * global.initialVirtualSolReserves) / (global.initialVirtualTokenReserves - tokens) + 1n;
  return sol + ceilDiv(sol * fees.protocolFeeBps, BPS) + ceilDiv(sol * fees.creatorFeeBps, BPS);
}

/**
 * The most tokens `lamports` buys as the first trade on a fresh curve (fees included), capped at
 * `maxTokens`. Mirrors pump.fun's getBuyTokenAmountFromSolAmount, then steps down until the exact
 * cost fits, so `buy_v3(tokens, lamports)` never fails on its own slippage check.
 */
export function quoteFreshCurveBuy(global: PumpGlobal, feeConfig: PumpFeeConfig | null, lamports: bigint, maxTokens = global.initialRealTokenReserves): { tokens: bigint; cost: bigint } {
  if (lamports <= 1n) return { tokens: 0n, cost: 0n };
  const fees = freshCurveFeeBps(global, feeConfig);
  const input = ((lamports - 1n) * BPS) / (BPS + fees.protocolFeeBps + fees.creatorFeeBps);
  let tokens = (input * global.initialVirtualTokenReserves) / (global.initialVirtualSolReserves + input);
  if (tokens > maxTokens) tokens = maxTokens;
  if (tokens > global.initialRealTokenReserves) tokens = global.initialRealTokenReserves;
  let cost = freshCurveBuyCost(global, fees, tokens);
  for (let i = 0; i < 64 && tokens > 0n && cost > lamports; i++) {
    tokens -= 1n + (cost - lamports) * global.initialVirtualTokenReserves / (global.initialVirtualSolReserves * 2n);
    if (tokens < 0n) tokens = 0n;
    cost = freshCurveBuyCost(global, fees, tokens);
  }
  return cost > lamports ? { tokens: 0n, cost: 0n } : { tokens, cost };
}
