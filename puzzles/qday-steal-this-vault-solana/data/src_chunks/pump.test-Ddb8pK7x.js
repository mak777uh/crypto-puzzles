var e=`// pump.fun instruction builders and account decoders, checked against the official IDL (trimmed copy
// in fixtures/pump-idl.json): discriminators, account order, writable/signer flags, fixed addresses,
// PDA seeds and argument encoding. Plus the dev-buy quote, the launch builders and creator-fee
// collection against a mocked Connection.
import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { Buffer } from 'buffer';
import { Keypair, PublicKey, SystemProgram } from '@solana/web3.js';
import type { AccountInfo, Connection, TransactionInstruction } from '@solana/web3.js';
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_2022_PROGRAM_ID } from '../src/constants';
import { ixDiscriminator } from '../src/bytes';
import { ataOf } from '../src/addresses';
import { BetaCapError } from '../src/deposit';
import { TransactionTooLargeError } from '../src/transport';
import {
  PUMP_AMM_IX,
  PUMP_AMM_PROGRAM_ID,
  PUMP_IX,
  PUMP_PROGRAM_ID,
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
  freshCurveBuyCost,
  freshCurveFeeBps,
  holderRewardsPda,
  pumpGlobalPda,
  quoteFreshCurveBuy,
  sweepCreatorFeeIx,
} from '../src/pump';
import type { PumpFeeConfig, PumpGlobal } from '../src/pump';
import {
  DEV_BUY_MAX_SUPPLY_BPS,
  NothingToCollectError,
  buildCollectCreatorFeesTx,
  buildPumpLaunchTx,
  buildTokenLaunchTx,
  fetchCreatorFees,
  quoteDevBuy,
  tokenMetadataInitializeIx,
  tokenMetadataLen,
  tokenMetadataUpdateAuthorityIx,
} from '../src/launch';
import type { PumpLaunchConfig } from '../src/launch';

// ---- the IDL ---------------------------------------------------------------------------------------

type IdlType = string | { defined: { name: string } } | { array: [IdlType, number] } | { vec: IdlType } | { option: IdlType };
interface IdlSeed {
  kind: 'const' | 'account' | 'arg';
  value?: number[];
  path?: string;
}
interface IdlAccountItem {
  name: string;
  writable?: boolean;
  signer?: boolean;
  optional?: boolean;
  address?: string;
  pda?: { seeds: IdlSeed[]; program?: IdlSeed };
}
interface IdlInstruction {
  name: string;
  discriminator: number[];
  accounts: IdlAccountItem[];
  args: Array<{ name: string; type: IdlType }>;
}
interface IdlTypeDef {
  name: string;
  type: { kind: 'struct'; fields: Array<{ name: string; type: IdlType } | IdlType> };
}
interface Idl {
  address: string;
  instructions: IdlInstruction[];
  accounts: Array<{ name: string; discriminator: number[] }>;
  types: IdlTypeDef[];
}

const fixture = JSON.parse(readFileSync(new URL('./fixtures/pump-idl.json', import.meta.url), 'utf8')) as { pump: Idl; pump_amm: Idl };
const PUMP = fixture.pump;
const AMM = fixture.pump_amm;
const ixDef = (idl: Idl, name: string) => idl.instructions.find((i) => i.name === name)!;

// ---- a small IDL-driven Borsh codec ----------------------------------------------------------------

class Reader {
  o = 0;
  readonly b: Uint8Array;
  constructor(b: Uint8Array) {
    this.b = b;
  }
  take(n: number): Uint8Array {
    if (this.o + n > this.b.length) throw new RangeError('short');
    const v = this.b.slice(this.o, this.o + n);
    this.o += n;
    return v;
  }
  le(n: number): bigint {
    let v = 0n;
    const bytes = this.take(n);
    for (let i = n - 1; i >= 0; i--) v = (v << 8n) | BigInt(bytes[i]!);
    return v;
  }
}

function decodeType(t: IdlType, r: Reader, types: IdlTypeDef[]): unknown {
  if (typeof t === 'string') {
    switch (t) {
      case 'bool':
        return r.take(1)[0] === 1;
      case 'u8':
        return Number(r.le(1));
      case 'u16':
        return Number(r.le(2));
      case 'u32':
        return Number(r.le(4));
      case 'u64':
      case 'i64':
        return r.le(8);
      case 'u128':
      case 'i128':
        return r.le(16);
      case 'pubkey':
        return new PublicKey(r.take(32)).toBase58();
      case 'string':
        return new TextDecoder().decode(r.take(Number(r.le(4))));
      default:
        throw new Error(\`type \${t}\`);
    }
  }
  if ('defined' in t) {
    const def = types.find((d) => d.name === t.defined.name)!;
    const fields = def.type.fields;
    if (fields.every((f) => typeof f !== 'object' || !('name' in f))) return fields.map((f) => decodeType(f as IdlType, r, types));
    return Object.fromEntries((fields as Array<{ name: string; type: IdlType }>).map((f) => [f.name, decodeType(f.type, r, types)]));
  }
  if ('array' in t) return Array.from({ length: t.array[1] }, () => decodeType(t.array[0], r, types));
  if ('vec' in t) return Array.from({ length: Number(r.le(4)) }, () => decodeType(t.vec, r, types));
  throw new Error('unsupported');
}

function le(v: bigint, n: number): number[] {
  const out: number[] = [];
  for (let i = 0; i < n; i++) out.push(Number((v >> BigInt(8 * i)) & 0xffn));
  return out;
}

function encodeType(t: IdlType, v: unknown, types: IdlTypeDef[]): number[] {
  if (typeof t === 'string') {
    switch (t) {
      case 'bool':
        return [v ? 1 : 0];
      case 'u8':
        return [Number(v)];
      case 'u16':
        return le(BigInt(v as number), 2);
      case 'u32':
        return le(BigInt(v as number), 4);
      case 'u64':
      case 'i64':
        return le(BigInt(v as bigint), 8);
      case 'u128':
      case 'i128':
        return le(BigInt(v as bigint), 16);
      case 'pubkey':
        return [...new PublicKey(v as string).toBytes()];
      case 'string': {
        const b = [...new TextEncoder().encode(v as string)];
        return [...le(BigInt(b.length), 4), ...b];
      }
      default:
        throw new Error(\`type \${t}\`);
    }
  }
  if ('defined' in t) {
    const def = types.find((d) => d.name === t.defined.name)!;
    const fields = def.type.fields;
    if (fields.every((f) => typeof f !== 'object' || !('name' in f))) return fields.flatMap((f, i) => encodeType(f as IdlType, (v as unknown[])[i], types));
    return (fields as Array<{ name: string; type: IdlType }>).flatMap((f) => encodeType(f.type, (v as Record<string, unknown>)[f.name], types));
  }
  if ('array' in t) return (v as unknown[]).flatMap((x) => encodeType(t.array[0], x, types));
  if ('vec' in t) return [...le(BigInt((v as unknown[]).length), 4), ...(v as unknown[]).flatMap((x) => encodeType(t.vec, x, types))];
  throw new Error('unsupported');
}

/** Account bytes: discriminator ‖ fields, encoded from the IDL type. */
function encodeAccount(idl: Idl, name: string, value: Record<string, unknown>): Buffer {
  const disc = idl.accounts.find((a) => a.name === name)!.discriminator;
  return Buffer.from([...disc, ...encodeType({ defined: { name } }, value, idl.types)]);
}

/** Every field of a type set to a zero-ish default, for building account fixtures. */
function zeroOf(t: IdlType, types: IdlTypeDef[]): unknown {
  if (typeof t === 'string') return t === 'bool' ? false : t === 'pubkey' ? PublicKey.default.toBase58() : t === 'string' ? '' : ['u8', 'u16', 'u32'].includes(t) ? 0 : 0n;
  if ('defined' in t) {
    const def = types.find((d) => d.name === t.defined.name)!;
    const fields = def.type.fields;
    if (fields.every((f) => typeof f !== 'object' || !('name' in f))) return fields.map((f) => zeroOf(f as IdlType, types));
    return Object.fromEntries((fields as Array<{ name: string; type: IdlType }>).map((f) => [f.name, zeroOf(f.type, types)]));
  }
  if ('array' in t) return Array.from({ length: t.array[1] }, () => zeroOf(t.array[0], types));
  if ('vec' in t) return [];
  return null;
}

// ---- checking a built instruction against the IDL ---------------------------------------------

function seedBytes(seed: IdlSeed, keys: Map<string, PublicKey>): Uint8Array {
  if (seed.kind === 'const') return Uint8Array.from(seed.value!);
  if (seed.kind === 'account') {
    const k = keys.get(seed.path!);
    if (!k) throw new Error(\`seed account \${seed.path} not in the instruction\`);
    return k.toBytes();
  }
  throw new Error(\`seed kind \${seed.kind}\`);
}

/** Asserts \`ix\` matches the IDL instruction exactly; returns the decoded args. */
function checkAgainstIdl(idl: Idl, name: string, ix: TransactionInstruction): Record<string, unknown> {
  const def = ixDef(idl, name);
  expect(ix.programId.toBase58()).toBe(idl.address);
  expect([...ix.data.subarray(0, 8)]).toEqual(def.discriminator);
  expect([...ix.data.subarray(0, 8)]).toEqual([...ixDiscriminator(name)]);
  expect(ix.keys).toHaveLength(def.accounts.length);
  const byName = new Map(def.accounts.map((a, i) => [a.name, ix.keys[i]!.pubkey]));
  def.accounts.forEach((a, i) => {
    const k = ix.keys[i]!;
    expect({ account: a.name, writable: k.isWritable, signer: k.isSigner }).toEqual({ account: a.name, writable: !!a.writable, signer: !!a.signer });
    if (a.address) expect({ account: a.name, key: k.pubkey.toBase58() }).toEqual({ account: a.name, key: a.address });
    if (a.pda) {
      const program = a.pda.program ? new PublicKey(seedBytes(a.pda.program, byName)) : new PublicKey(idl.address);
      const [want] = PublicKey.findProgramAddressSync(
        a.pda.seeds.map((s) => seedBytes(s, byName)),
        program,
      );
      expect({ account: a.name, key: k.pubkey.toBase58() }).toEqual({ account: a.name, key: want.toBase58() });
    }
  });
  const r = new Reader(ix.data.subarray(8));
  const args = Object.fromEntries(def.args.map((a) => [a.name, decodeType(a.type, r, idl.types)]));
  expect(r.o).toBe(ix.data.length - 8); // no trailing bytes
  return args;
}

// ---- fixtures --------------------------------------------------------------------------------------

const pk = () => Keypair.generate().publicKey;
/** A vault wallet: an off-curve PDA of some program, like every vault. */
const vaultPda = () => PublicKey.findProgramAddressSync([Buffer.from('wallet'), pk().toBytes()], new PublicKey('22AEUZtxpbi1ReJGrG9SyFob3uHGzZERERyVNp6uV8Y6'))[0];

/** Devnet's live Global and FeeConfig values (read 2026-10-08). */
const DEVNET_GLOBAL: PumpGlobal = {
  initialVirtualTokenReserves: 1_073_000_000_000_000n,
  initialVirtualSolReserves: 1_000_000_000n,
  initialRealTokenReserves: 793_100_000_000_000n,
  tokenTotalSupply: 1_000_000_000_000_000n,
  feeBasisPoints: 95n,
  creatorFeeBasisPoints: 5n,
  adminSetCreatorAuthority: pk(),
  createV2Enabled: true,
  mayhemModeEnabled: true,
  buybackFeeRecipients: [new PublicKey('5YxQFdt3Tr9zJLvkFccqXVUwhdTWJQc1fFg2YPbxvxeD')],
  isHolderRewardEnabled: false,
};
const DEVNET_FEES: PumpFeeConfig = { feeTiers: [{ marketCapLamportsThreshold: 0n, fees: { lpFeeBps: 0n, protocolFeeBps: 95n, creatorFeeBps: 30n } }] };
const DEVNET: PumpLaunchConfig = { global: DEVNET_GLOBAL, feeConfig: DEVNET_FEES };

interface MockState {
  accounts: Map<string, AccountInfo<Buffer>>;
  balances?: Map<string, number>;
}
function mockConn(s: MockState): Connection {
  const get = (k: PublicKey) => s.accounts.get(k.toBase58()) ?? null;
  return {
    getAccountInfo: async (k: PublicKey) => get(k),
    getMultipleAccountsInfo: async (ks: PublicKey[]) => ks.map(get),
    getMinimumBalanceForRentExemption: async (len: number) => (128 + len) * 6960,
    getLatestBlockhash: async () => ({ blockhash: '11111111111111111111111111111111', lastValidBlockHeight: 100 }),
    getBalance: async (k: PublicKey) => s.balances?.get(k.toBase58()) ?? get(k)?.lamports ?? 0,
  } as unknown as Connection;
}
const account = (data: Uint8Array, owner: PublicKey, lamports = 1_000_000): AccountInfo<Buffer> => ({ data: Buffer.from(data), owner, lamports, executable: false, rentEpoch: 0 });

// ---- tests -----------------------------------------------------------------------------------------

describe('pump.fun instruction builders match the IDL', () => {
  it('discriminators', () => {
    expect([...PUMP_IX.createV2]).toEqual(ixDef(PUMP, 'create_v2').discriminator);
    expect([...PUMP_IX.buyV3]).toEqual(ixDef(PUMP, 'buy_v3').discriminator);
    expect([...PUMP_IX.sweepCreatorFee]).toEqual(ixDef(PUMP, 'sweep_creator_fee').discriminator);
    expect([...PUMP_IX.collectCreatorFeeV2]).toEqual(ixDef(PUMP, 'collect_creator_fee_v2').discriminator);
    expect([...PUMP_AMM_IX.sweepCreatorFee]).toEqual(ixDef(AMM, 'sweep_creator_fee').discriminator);
    expect([...PUMP_AMM_IX.collectCoinCreatorFee]).toEqual(ixDef(AMM, 'collect_coin_creator_fee').discriminator);
    expect(PUMP.address).toBe(PUMP_PROGRAM_ID.toBase58());
    expect(AMM.address).toBe(PUMP_AMM_PROGRAM_ID.toBase58());
  });

  it('create_v2: accounts, PDAs and every argument, with the vault (a PDA) as creator', () => {
    const mint = pk();
    const user = pk();
    const vault = vaultPda();
    expect(PublicKey.isOnCurve(vault.toBytes())).toBe(false);
    for (const isHolderReward of [false, true]) {
      const ix = createV2Ix({ mint, user, creator: vault, name: 'Bunker', symbol: 'BUNKER', uri: 'ipfs://bafkreid', isMayhemMode: false, isHolderReward });
      const args = checkAgainstIdl(PUMP, 'create_v2', ix);
      expect(args).toEqual({
        name: 'Bunker',
        symbol: 'BUNKER',
        uri: 'ipfs://bafkreid',
        creator: vault.toBase58(),
        is_mayhem_mode: false,
        is_cashback_enabled: [false],
        creator_fee_bps: [0n],
        is_holder_reward: [isHolderReward],
      });
      expect(ix.keys.find((k) => k.pubkey.equals(vault))).toBeUndefined(); // the vault is an argument, never an account or a signer
      expect(ix.keys.filter((k) => k.isSigner).map((k) => k.pubkey.toBase58()).sort()).toEqual([mint.toBase58(), user.toBase58()].sort());
    }
  });

  it('create_v2 refuses bad text and a default creator', () => {
    const base = { mint: pk(), user: pk(), creator: vaultPda(), name: 'A', symbol: 'A', uri: 'https://x.y/a.json', isMayhemMode: false, isHolderReward: false };
    expect(() => createV2Ix({ ...base, name: 'x'.repeat(33) })).toThrow(PumpInputError);
    expect(() => createV2Ix({ ...base, symbol: 'Y'.repeat(14) })).toThrow(/limit is 13/);
    expect(() => createV2Ix({ ...base, uri: 'h'.repeat(201) })).toThrow(/limit is 200/);
    expect(() => createV2Ix({ ...base, name: 'é'.repeat(17) })).toThrow(/34 bytes/); // UTF-8 bytes, not characters
    expect(() => createV2Ix({ ...base, name: 'Bun‮ker' })).toThrow(/invisible/);
    expect(() => createV2Ix({ ...base, symbol: ' BNK' })).toThrow(/spaces/);
    expect(() => createV2Ix({ ...base, uri: '' })).toThrow(/empty/);
    expect(() => createV2Ix({ ...base, creator: PublicKey.default })).toThrow(/default/);
    expect(() => assertPumpText({ name: 'A', symbol: 'A', uri: '' }, { allowEmptyUri: true })).not.toThrow();
  });

  it('buy_v3: accounts, PDAs and arguments; the tokens can go to the vault token account', () => {
    const mint = pk();
    const user = pk();
    const vaultAta = ataOf(vaultPda(), mint, TOKEN_2022_PROGRAM_ID);
    const recipient = DEVNET_GLOBAL.buybackFeeRecipients[0]!;
    const ix = buyV3Ix({ mint, user, associatedBaseUser: vaultAta, amount: 123n, maxSolCost: 456n, buybackFeeRecipient: recipient });
    const args = checkAgainstIdl(PUMP, 'buy_v3', ix);
    expect(args).toEqual({ amount: 123n, max_sol_cost: 456n, partial_fill: [false] });
    const names = ixDef(PUMP, 'buy_v3').accounts.map((a) => a.name);
    expect(ix.keys[names.indexOf('base_mint')]!.pubkey.equals(mint)).toBe(true);
    expect(ix.keys[names.indexOf('quote_mint')]!.pubkey.equals(WSOL_MINT)).toBe(true);
    expect(ix.keys[names.indexOf('base_token_program')]!.pubkey.equals(TOKEN_2022_PROGRAM_ID)).toBe(true);
    expect(ix.keys[names.indexOf('associated_base_user')]!.pubkey.equals(vaultAta)).toBe(true);
    expect(ix.keys[names.indexOf('buyback_fee_recipient')]!.pubkey.equals(recipient)).toBe(true);
    expect(() => buyV3Ix({ mint, user, associatedBaseUser: vaultAta, amount: 0n, maxSolCost: 1n, buybackFeeRecipient: recipient })).toThrow(PumpInputError);
  });

  it('sweep_creator_fee and collect_creator_fee_v2: permissionless (only the payer signs; the creator never does)', () => {
    const mint = pk();
    const payer = pk();
    const vault = vaultPda();
    const sweep = sweepCreatorFeeIx({ payer, mint, curveCreator: vault });
    checkAgainstIdl(PUMP, 'sweep_creator_fee', sweep);
    const names = ixDef(PUMP, 'sweep_creator_fee').accounts.map((a) => a.name);
    expect(sweep.keys[names.indexOf('recipient')]!.pubkey.equals(creatorVaultPda(vault))).toBe(true);
    expect(sweep.keys.filter((k) => k.isSigner).map((k) => k.pubkey.toBase58())).toEqual([payer.toBase58()]);

    const collect = collectCreatorFeeV2Ix({ creator: vault });
    checkAgainstIdl(PUMP, 'collect_creator_fee_v2', collect);
    expect(collect.keys.some((k) => k.isSigner)).toBe(false); // the IDL has no signer at all
    expect(ixDef(PUMP, 'collect_creator_fee_v2').accounts.some((a) => a.signer)).toBe(false);
    expect(collect.keys[0]!.pubkey.equals(vault)).toBe(true);
  });

  it('PumpSwap sweep_creator_fee and collect_coin_creator_fee: permissionless too', () => {
    const payer = pk();
    const vault = vaultPda();
    const pool = pk();
    const sweep = ammSweepCreatorFeeIx({ payer, pool, poolQuoteTokenAccount: pk(), coinCreator: vault });
    checkAgainstIdl(AMM, 'sweep_creator_fee', sweep);
    const names = ixDef(AMM, 'sweep_creator_fee').accounts.map((a) => a.name);
    expect(sweep.keys[names.indexOf('recipient')]!.pubkey.equals(ammCreatorVaultAuthorityPda(vault))).toBe(true);
    expect(sweep.keys[names.indexOf('global_config')]!.pubkey.toBase58()).toBe('ADyA8hdefvWN2dbGGWFotbzWxrAvLW83WG6QCVXvJKqw');

    const destination = ataOf(vault, WSOL_MINT, new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'));
    const collect = collectCoinCreatorFeeIx({ coinCreator: vault, destination });
    checkAgainstIdl(AMM, 'collect_coin_creator_fee', collect);
    expect(collect.keys.some((k) => k.isSigner)).toBe(false);
    expect(ixDef(AMM, 'collect_coin_creator_fee').accounts.some((a) => a.signer)).toBe(false);
  });

  it('well-known PDAs', () => {
    expect(pumpGlobalPda().toBase58()).toBe('4wTV1YmiEkRvAtNtsSGPtUrqRYQMe5SKy2uB4Jjaxnjf');
    const mint = pk();
    expect(holderRewardsPda(mint).equals(PublicKey.findProgramAddressSync([Buffer.from('holder-rewards'), mint.toBytes()], PUMP_PROGRAM_ID)[0])).toBe(true);
    expect(bondingCurvePda(mint).equals(PublicKey.findProgramAddressSync([Buffer.from('bonding-curve'), mint.toBytes()], PUMP_PROGRAM_ID)[0])).toBe(true);
    const poolAuthority = PublicKey.findProgramAddressSync([Buffer.from('pool-authority'), mint.toBytes()], PUMP_PROGRAM_ID)[0];
    const [pool] = PublicKey.findProgramAddressSync([Buffer.from('pool'), Uint8Array.of(0, 0), poolAuthority.toBytes(), mint.toBytes(), WSOL_MINT.toBytes()], PUMP_AMM_PROGRAM_ID);
    expect(canonicalPoolPda(mint).equals(pool)).toBe(true);
  });
});

describe('pump.fun account decoders read the IDL layouts', () => {
  it('Global, including the holder-rewards switch, and older shorter layouts', () => {
    const v = zeroOf({ defined: { name: 'Global' } }, PUMP.types) as Record<string, unknown>;
    const buyback = [pk(), pk()].map((k) => k.toBase58());
    Object.assign(v, {
      initialized: true,
      initial_virtual_token_reserves: 1_073_000_000_000_000n,
      initial_virtual_sol_reserves: 30_000_000_000n,
      initial_real_token_reserves: 793_100_000_000_000n,
      token_total_supply: 1_000_000_000_000_000n,
      fee_basis_points: 95n,
      creator_fee_basis_points: 30n,
      create_v2_enabled: true,
      mayhem_mode_enabled: true,
      buyback_fee_recipients: [...buyback, ...Array(6).fill(PublicKey.default.toBase58())],
      is_holder_reward_enabled: true,
      max_curve_depth: 1,
    });
    const data = encodeAccount(PUMP, 'Global', v);
    const g = decodePumpGlobal(data);
    expect(g).toMatchObject({ initialVirtualSolReserves: 30_000_000_000n, feeBasisPoints: 95n, creatorFeeBasisPoints: 30n, createV2Enabled: true, isHolderRewardEnabled: true });
    expect(g.buybackFeeRecipients.map((k) => k.toBase58())).toEqual(buyback); // unset slots dropped
    // An account written before the trailing fields existed reads the switch as off.
    expect(decodePumpGlobal(data.subarray(0, data.length - 2 - 32 - 8 - 1)).isHolderRewardEnabled).toBe(false);
    expect(() => decodePumpGlobal(Buffer.alloc(200))).toThrow(/not a pump.fun Global/);
  });

  it('BondingCurve: creator, flags and the unswept creator fee', () => {
    const v = zeroOf({ defined: { name: 'BondingCurve' } }, PUMP.types) as Record<string, unknown>;
    const creator = vaultPda().toBase58();
    Object.assign(v, { virtual_token_reserves: 5n, complete: true, creator, is_holder_reward: true, creator_fee: 29_630n });
    const data = encodeAccount(PUMP, 'BondingCurve', v);
    const c = decodeBondingCurve(data);
    expect(c).toMatchObject({ virtualTokenReserves: 5n, complete: true, isHolderReward: true, creatorFee: 29_630n, isMayhemMode: false });
    expect(c.creator.toBase58()).toBe(creator);
    expect(c.quoteMint.equals(PublicKey.default)).toBe(true);
    // The 2025 layout (no fee buckets yet): creator fee reads as 0.
    expect(decodeBondingCurve(data.subarray(0, 8 + 8 * 5 + 1 + 32 + 2 + 32)).creatorFee).toBe(0n);
  });

  it('FeeConfig tiers and the fresh-curve rate', () => {
    const v = zeroOf({ defined: { name: 'FeeConfig' } }, PUMP.types) as Record<string, unknown>;
    v.fee_tiers = [
      { market_cap_lamports_threshold: 0n, fees: { lp_fee_bps: 0n, protocol_fee_bps: 95n, creator_fee_bps: 30n } },
      { market_cap_lamports_threshold: 420_000_000_000n, fees: { lp_fee_bps: 0n, protocol_fee_bps: 93n, creator_fee_bps: 30n } },
    ];
    const fc = decodePumpFeeConfig(encodeAccount(PUMP, 'FeeConfig', v));
    expect(fc.feeTiers).toHaveLength(2);
    expect(fc.feeTiers[1]!.marketCapLamportsThreshold).toBe(420_000_000_000n);
    // Fresh devnet curve: 1 SOL × 1B / 1.073B ≈ 0.93 SOL market cap → first tier.
    expect(freshCurveFeeBps(DEVNET_GLOBAL, fc)).toEqual({ protocolFeeBps: 95n, creatorFeeBps: 30n });
    // Without a FeeConfig, Global's own rates.
    expect(freshCurveFeeBps(DEVNET_GLOBAL, null)).toEqual({ protocolFeeBps: 95n, creatorFeeBps: 5n });
  });

  it('PumpSwap Pool: coin creator and unswept creator fees', () => {
    const v = zeroOf({ defined: { name: 'Pool' } }, AMM.types) as Record<string, unknown>;
    const coinCreator = vaultPda().toBase58();
    const quote = pk().toBase58();
    Object.assign(v, { quote_mint: WSOL_MINT.toBase58(), pool_quote_token_account: quote, coin_creator: coinCreator, creator_fees: 77n });
    const p = decodePumpPool(encodeAccount(AMM, 'Pool', v));
    expect(p.coinCreator.toBase58()).toBe(coinCreator);
    expect(p.poolQuoteTokenAccount.toBase58()).toBe(quote);
    expect(p.creatorFees).toBe(77n);
  });
});

describe('dev buy quote', () => {
  it('matches the buy the devnet program accepted (0.01 SOL → 10,493,886.257633 tokens, 8 Oct 2026)', () => {
    expect(quoteFreshCurveBuy(DEVNET_GLOBAL, DEVNET_FEES, 10_000_000n)).toEqual({ tokens: 10_493_886_257_633n, cost: 10_000_000n });
  });

  it('never costs more than the budget, and is close to the most the budget buys', () => {
    const fees = freshCurveFeeBps(DEVNET_GLOBAL, DEVNET_FEES);
    for (const budget of [2n, 1_000n, 999_999n, 10_000_000n, 123_456_789n, 2_000_000_000n]) {
      const q = quoteFreshCurveBuy(DEVNET_GLOBAL, DEVNET_FEES, budget);
      expect(q.cost).toBeLessThanOrEqual(budget);
      if (q.tokens > 0n) {
        expect(freshCurveBuyCost(DEVNET_GLOBAL, fees, q.tokens)).toBe(q.cost);
        // A thousandth of a percent (or two lamports' worth) more would not fit.
        const lamportOfTokens = DEVNET_GLOBAL.initialVirtualTokenReserves / DEVNET_GLOBAL.initialVirtualSolReserves;
        expect(freshCurveBuyCost(DEVNET_GLOBAL, fees, q.tokens + q.tokens / 100_000n + 2n * lamportOfTokens + 2n)).toBeGreaterThan(budget);
      }
    }
  });

  it('is capped at 10% of the supply', () => {
    const q = quoteDevBuy(DEVNET, 50_000_000_000n); // 50 SOL on a 1-SOL devnet curve
    expect(q.capped).toBe(true);
    expect(q.tokens).toBe((DEVNET_GLOBAL.tokenTotalSupply * DEV_BUY_MAX_SUPPLY_BPS) / 10_000n);
    expect(q.supplyBps).toBe(1_000n);
    expect(q.cost).toBeLessThan(50_000_000_000n);
  });
});

describe('buildPumpLaunchTx', () => {
  const base = () => {
    const user = pk();
    const vault = vaultPda();
    const mint = pk();
    return { conn: mockConn({ accounts: new Map() }), user, vaultWallet: vault, mint, name: 'Bunker', symbol: 'BUNKER', uri: 'https://ipfs.io/ipfs/QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG', fees: 'creator' as const, config: DEVNET };
  };

  it('create_v2 (creator = vault) + the vault token account + one buy_v3 into it, in one legacy transaction', async () => {
    const p = base();
    const plan = await buildPumpLaunchTx({ ...p, devBuyLamports: 10_000_000n, buybackFeeRecipient: DEVNET_GLOBAL.buybackFeeRecipients[0] });
    const ixs = plan.transaction.instructions;
    expect(ixs.map((i) => i.programId.toBase58())).toEqual([PUMP_PROGRAM_ID.toBase58(), ASSOCIATED_TOKEN_PROGRAM_ID.toBase58(), PUMP_PROGRAM_ID.toBase58()]);
    const create = checkAgainstIdl(PUMP, 'create_v2', ixs[0]!);
    expect(create.creator).toBe(p.vaultWallet.toBase58());
    expect(create.is_mayhem_mode).toBe(false);
    expect(plan.curveCreator.equals(p.vaultWallet)).toBe(true);
    const vaultAta = ataOf(p.vaultWallet, p.mint, TOKEN_2022_PROGRAM_ID);
    expect(plan.vaultTokenAccount.equals(vaultAta)).toBe(true);
    expect(ixs[1]!.keys.map((k) => k.pubkey.toBase58())).toEqual([p.user, vaultAta, p.vaultWallet, p.mint, SystemProgram.programId, TOKEN_2022_PROGRAM_ID].map((k) => k.toBase58()));
    const buy = checkAgainstIdl(PUMP, 'buy_v3', ixs[2]!);
    expect(buy).toEqual({ amount: 10_493_886_257_633n, max_sol_cost: 10_000_000n, partial_fill: [false] });
    expect(ixs[2]!.keys[9]!.pubkey.equals(vaultAta)).toBe(true); // associated_base_user = the vault's account
    expect(plan.size).toBeLessThanOrEqual(1232);
    // The vault never signs anything in a launch.
    expect(ixs.flatMap((i) => i.keys).some((k) => k.isSigner && k.pubkey.equals(p.vaultWallet))).toBe(false);
  });

  it('without a dev buy: create_v2 + the vault token account only', async () => {
    const plan = await buildPumpLaunchTx({ ...base(), devBuyLamports: 0n });
    expect(plan.transaction.instructions).toHaveLength(2);
    expect(plan.devBuy).toBeNull();
  });

  it('holder rewards: the creator pump.fun records is the holder-rewards PDA, and only while pump.fun allows it', async () => {
    const p = base();
    await expect(buildPumpLaunchTx({ ...p, fees: 'holders' })).rejects.toThrow(/holder-rewards coins switched off/);
    const on = { ...DEVNET, global: { ...DEVNET_GLOBAL, isHolderRewardEnabled: true } };
    const plan = await buildPumpLaunchTx({ ...p, fees: 'holders', config: on });
    expect(plan.curveCreator.equals(holderRewardsPda(p.mint))).toBe(true);
    expect(checkAgainstIdl(PUMP, 'create_v2', plan.transaction.instructions[0]!).is_holder_reward).toEqual([true]);
  });

  it('refuses when create_v2 is off, when the mint exists, or when the transaction would not fit', async () => {
    const p = base();
    await expect(buildPumpLaunchTx({ ...p, config: { ...DEVNET, global: { ...DEVNET_GLOBAL, createV2Enabled: false } } })).rejects.toThrow(/switched off/);
    const taken = { ...p, conn: mockConn({ accounts: new Map([[p.mint.toBase58(), account(new Uint8Array(82), TOKEN_2022_PROGRAM_ID)]]) }) };
    await expect(buildPumpLaunchTx(taken)).rejects.toThrow(/already in use/);
    const longUri = \`https://example.com/\${'a'.repeat(150)}\`;
    await expect(buildPumpLaunchTx({ ...p, name: 'x'.repeat(32), symbol: 'Y'.repeat(13), uri: longUri, devBuyLamports: 10_000_000n })).rejects.toThrow(TransactionTooLargeError);
    await expect(buildPumpLaunchTx({ ...p, name: 'x'.repeat(32), symbol: 'Y'.repeat(13), uri: longUri, devBuyLamports: 10_000_000n })).rejects.toThrow(/bytes too long/);
    // The same URI fits without a dev buy.
    await expect(buildPumpLaunchTx({ ...p, name: 'x'.repeat(32), symbol: 'Y'.repeat(13), uri: longUri })).resolves.toBeTruthy();
  });
});

describe('buildTokenLaunchTx', () => {
  it('mint with metadata, whole supply into the vault, then every authority removed: one transaction', async () => {
    const user = pk();
    const vault = vaultPda();
    const mint = pk();
    const plan = await buildTokenLaunchTx({ conn: mockConn({ accounts: new Map() }), user, vaultWallet: vault, mint, name: 'Bunker', symbol: 'BUNKER', uri: 'ar://abc' });
    const ixs = plan.transaction.instructions;
    expect(ixs).toHaveLength(8);
    expect(plan.supply).toBe(1_000_000_000_000_000n);
    expect(plan.decimals).toBe(6);
    // createAccount sized for the mint + metadata pointer, funded for the metadata too.
    expect(ixs[0]!.programId.equals(SystemProgram.programId)).toBe(true);
    expect(plan.mintRentLamports).toBe(BigInt((128 + 234 + tokenMetadataLen({ name: 'Bunker', symbol: 'BUNKER', uri: 'ar://abc' })) * 6960));
    // InitializeMetadataPointer (39) with no authority, pointing at the mint.
    expect(ixs[1]!.data[0]).toBe(39);
    expect(ixs[1]!.data[1]).toBe(0);
    expect(Buffer.from(ixs[1]!.data.subarray(2, 34)).equals(Buffer.alloc(32))).toBe(true);
    expect(new PublicKey(ixs[1]!.data.subarray(34, 66)).equals(mint)).toBe(true);
    // InitializeMint2 (20): 6 decimals, mint authority = user, no freeze authority.
    expect([...ixs[2]!.data.subarray(0, 2)]).toEqual([20, 6]);
    expect(new PublicKey(ixs[2]!.data.subarray(2, 34)).equals(user)).toBe(true);
    expect(ixs[2]!.data[34]).toBe(0);
    // TokenMetadata Initialize, then the vault account, MintToChecked of the whole supply into it.
    expect([...ixs[3]!.data.subarray(0, 8)]).toEqual([210, 225, 30, 162, 88, 184, 77, 141]);
    const vaultAta = ataOf(vault, mint, TOKEN_2022_PROGRAM_ID);
    expect(ixs[4]!.programId.equals(ASSOCIATED_TOKEN_PROGRAM_ID)).toBe(true);
    expect(ixs[5]!.data[0]).toBe(14); // MintToChecked
    expect(ixs[5]!.keys[1]!.pubkey.equals(vaultAta)).toBe(true);
    // TokenMetadata UpdateAuthority → none, then SetAuthority(MintTokens → none).
    expect([...ixs[6]!.data]).toEqual([215, 228, 166, 228, 84, 100, 86, 123, ...new Uint8Array(32)]);
    expect([...ixs[7]!.data]).toEqual([6, 0, 0]);
    expect(plan.size).toBeLessThanOrEqual(1232);
    expect(ixs.flatMap((i) => i.keys).some((k) => k.isSigner && k.pubkey.equals(vault))).toBe(false);
    expect([...new Set(ixs.flatMap((i) => i.keys).filter((k) => k.isSigner).map((k) => k.pubkey.toBase58()))].sort()).toEqual([mint.toBase58(), user.toBase58()].sort());
  });

  it('TokenMetadata instruction encodings', () => {
    const mint = pk();
    const a = pk();
    const init = tokenMetadataInitializeIx({ mint, updateAuthority: a, mintAuthority: a, name: 'N', symbol: 'S', uri: 'U' });
    expect([...init.data]).toEqual([210, 225, 30, 162, 88, 184, 77, 141, 1, 0, 0, 0, 78, 1, 0, 0, 0, 83, 1, 0, 0, 0, 85]);
    expect(init.keys.map((k) => [k.isSigner, k.isWritable])).toEqual([[false, true], [false, false], [false, false], [true, false]]);
    const upd = tokenMetadataUpdateAuthorityIx({ mint, currentAuthority: a, newAuthority: null });
    expect(upd.keys.map((k) => [k.isSigner, k.isWritable])).toEqual([[false, true], [true, false]]);
  });

  it('allows an empty URI but checks names, supply and decimals', async () => {
    const p = { conn: mockConn({ accounts: new Map() }), user: pk(), vaultWallet: vaultPda(), mint: pk(), name: 'T', symbol: 'T', uri: '' };
    await expect(buildTokenLaunchTx(p)).resolves.toBeTruthy();
    await expect(buildTokenLaunchTx({ ...p, name: '' })).rejects.toThrow(PumpInputError);
    await expect(buildTokenLaunchTx({ ...p, supply: 0n })).rejects.toThrow(/supply/);
    await expect(buildTokenLaunchTx({ ...p, supply: 1n << 64n })).rejects.toThrow(/supply/);
    await expect(buildTokenLaunchTx({ ...p, decimals: 10 })).rejects.toThrow(/decimals/);
  });
});

describe('creator fees', () => {
  const vault = vaultPda();
  const mint = pk();
  function state(o: { vaultFee?: number; unswept?: bigint; creator?: PublicKey; vaultBalance?: number }) {
    const accounts = new Map<string, AccountInfo<Buffer>>();
    if (o.vaultFee !== undefined) accounts.set(creatorVaultPda(vault).toBase58(), account(new Uint8Array(0), SystemProgram.programId, 128 * 6960 + o.vaultFee));
    const v = zeroOf({ defined: { name: 'BondingCurve' } }, PUMP.types) as Record<string, unknown>;
    Object.assign(v, { virtual_token_reserves: 1n, creator: (o.creator ?? vault).toBase58(), creator_fee: o.unswept ?? 0n });
    accounts.set(bondingCurvePda(mint).toBase58(), account(encodeAccount(PUMP, 'BondingCurve', v), PUMP_PROGRAM_ID));
    return mockConn({ accounts, balances: new Map([[vault.toBase58(), o.vaultBalance ?? 5_000_000]]) });
  }

  it('reads the creator vault above rent plus each coin\\'s unswept bucket', async () => {
    const f = await fetchCreatorFees(state({ vaultFee: 1_000, unswept: 29_630n }), vault, [mint, mint]);
    expect(f.vaultLamports).toBe(1_000n);
    expect(f.coins.map((c) => [c.mint.toBase58(), c.unswept])).toEqual([[mint.toBase58(), 29_630n]]);
    expect(f.total).toBe(30_630n);
    // A coin whose creator is someone else is ignored.
    expect((await fetchCreatorFees(state({ unswept: 5n, creator: pk() }), vault, [mint])).coins).toEqual([]);
  });

  it('collects with sweep + collect_creator_fee_v2, paid and signed by any wallet, never the vault', async () => {
    const conn = state({ vaultFee: 1_000, unswept: 29_630n });
    const payer = pk();
    const fees = await fetchCreatorFees(conn, vault, [mint]);
    const [tx, ...rest] = await buildCollectCreatorFeesTx({ conn, payer, creator: vault, fees });
    expect(rest).toHaveLength(0);
    expect(tx!.instructions.map((i) => [...i.data.subarray(0, 8)])).toEqual([[...PUMP_IX.sweepCreatorFee], [...PUMP_IX.collectCreatorFeeV2]]);
    checkAgainstIdl(PUMP, 'sweep_creator_fee', tx!.instructions[0]!);
    checkAgainstIdl(PUMP, 'collect_creator_fee_v2', tx!.instructions[1]!);
    const signers = new Set(tx!.instructions.flatMap((i) => i.keys).filter((k) => k.isSigner).map((k) => k.pubkey.toBase58()));
    expect([...signers]).toEqual([payer.toBase58()]);
    expect(tx!.feePayer?.equals(payer)).toBe(true);
  });

  it('refuses nothing-to-collect, the deposit cap and a vault left below rent', async () => {
    const empty = state({ vaultFee: 0 });
    await expect(buildCollectCreatorFeesTx({ conn: empty, payer: pk(), creator: vault, fees: await fetchCreatorFees(empty, vault, []) })).rejects.toThrow(NothingToCollectError);
    const rich = state({ vaultFee: 2_000_000_000, vaultBalance: 9_000_000_000 });
    await expect(buildCollectCreatorFeesTx({ conn: rich, payer: pk(), creator: vault, fees: await fetchCreatorFees(rich, vault, []) })).rejects.toThrow(BetaCapError);
    const poor = state({ vaultFee: 10_000, vaultBalance: 0 });
    await expect(buildCollectCreatorFeesTx({ conn: poor, payer: pk(), creator: vault, fees: await fetchCreatorFees(poor, vault, []) })).rejects.toThrow(/rent-exempt/);
  });
});
`;export{e as default};