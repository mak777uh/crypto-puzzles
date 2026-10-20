var e=`// Legacy (inheritance) in the SDK: heir actions (encoding, accounts, rules), the heir record, the
// cluster clock, and the permissionless inherit planner against a mocked chain.
import { beforeAll, describe, expect, it } from 'vitest';
import { Buffer } from 'buffer';
import { Keypair, PublicKey, SYSVAR_CLOCK_PUBKEY } from '@solana/web3.js';
import type { AccountInfo, Connection, VersionedTransaction } from '@solana/web3.js';
import { ACCOUNT_SIZE, AccountLayout, AccountState, createHarvestWithheldTokensToMintInstruction } from '@solana/spl-token';
import { initWasm, getWasm } from '../src/wasm';
import { actionsToJson, decodeActions, decodeActionsTs, encodeActions, encodeActionsTs, validateActions } from '../src/actions';
import type { VaultAction } from '../src/actions';
import { ataOf, findHeirPda, findStatePda, findWalletPda } from '../src/addresses';
import { ASSOCIATED_TOKEN_PROGRAM_ID, COMPUTE_UNITS, PROGRAM_ID, SPL_TOKEN_PROGRAM_ID, TOKEN_2022_PROGRAM_ID } from '../src/constants';
import { IX_DISCRIMINATORS, executeIx, executeRemainingAccounts } from '../src/instructions';
import { HEIR_DISCRIMINATOR, HEIR_FIELD_OFFSET, VAULT_STATE_DISCRIMINATOR, decodeHeir, fetchHeir, findHeirRecordsNaming } from '../src/state';
import { HeirCannotReceiveError, InheritanceNotDueError, NoHeirError, buildInheritTxs, fetchClusterTime, heirStatus, inheritComputeUnits, programSupportsLegacy, summarizeInheritPlan } from '../src/legacy';
import { executeComputeUnits, heirOfWarning } from '../src/prepare';
import { bytesEqual, toHex } from '../src/bytes';
import { measureTx } from '../src/transport';
import { ext, mintData, pk } from './helpers';

const DAY = 86_400;
const T0 = 1_791_547_200;

beforeAll(async () => {
  await initWasm();
});

// ---- account bytes -------------------------------------------------------------------------------

function vaultStateData(vaultId: Uint8Array, nextLeaf = 3): Buffer {
  const b = Buffer.alloc(280);
  b.set(VAULT_STATE_DISCRIMINATOR, 0);
  b[8] = 1;
  b[9] = 255;
  b[10] = 255;
  b.set(vaultId, 11);
  b.set(new Uint8Array(48).fill(7), 43);
  b.writeUInt32LE(0, 91); // epoch
  b.writeUInt32LE(nextLeaf, 95);
  b.writeUInt32LE(1024, 99);
  b[103] = 0; // no cosigner
  b.writeBigUInt64LE(123n, 104);
  return b;
}

function heirData(p: { state: PublicKey; heir: PublicKey; days: number; setAt: number; deadline: number; inheritedAt?: number; bump?: number; version?: number }): Buffer {
  const b = Buffer.alloc(100);
  b.set(HEIR_DISCRIMINATOR, 0);
  b[8] = p.version ?? 1;
  b[9] = p.bump ?? findHeirPda(p.state)[1];
  b.writeUInt16LE(p.days, 10);
  b.set(p.state.toBytes(), 12);
  b.set(p.heir.toBytes(), 44);
  b.writeBigInt64LE(BigInt(p.setAt), 76);
  b.writeBigInt64LE(BigInt(p.deadline), 84);
  b.writeBigInt64LE(BigInt(p.inheritedAt ?? 0), 92);
  return b;
}

function clockData(unix: number): Buffer {
  const b = Buffer.alloc(40);
  b.writeBigUInt64LE(424_242n, 0);
  b.writeBigInt64LE(BigInt(unix - 3600), 8);
  b.writeBigUInt64LE(900n, 16);
  b.writeBigUInt64LE(901n, 24);
  b.writeBigInt64LE(BigInt(unix), 32);
  return b;
}

/** A token account; Token-2022 ones get the account type byte and, with \`withheld\`, a TransferFeeAmount TLV. */
function tokenAccountData(o: { mint: PublicKey; owner: PublicKey; amount: bigint; frozen?: boolean; t22?: boolean; withheld?: bigint; memo?: boolean }): Buffer {
  const base = Buffer.alloc(ACCOUNT_SIZE);
  AccountLayout.encode(
    {
      mint: o.mint,
      owner: o.owner,
      amount: o.amount,
      delegateOption: 0,
      delegate: PublicKey.default,
      state: o.frozen ? AccountState.Frozen : AccountState.Initialized,
      isNativeOption: 0,
      isNative: 0n,
      delegatedAmount: 0n,
      closeAuthorityOption: 0,
      closeAuthority: PublicKey.default,
    },
    base,
  );
  if (!o.t22) return base;
  const tlv: Buffer[] = [];
  if (o.withheld !== undefined) {
    const v = Buffer.alloc(8);
    v.writeBigUInt64LE(o.withheld);
    tlv.push(Buffer.from([2, 0, 8, 0]), v); // ExtensionType.TransferFeeAmount = 2
  }
  if (o.memo) tlv.push(Buffer.from([8, 0, 1, 0, 1])); // ExtensionType.MemoTransfer = 8, incoming memos required
  tlv.push(Buffer.from([7, 0, 0, 0])); // ImmutableOwner
  return Buffer.concat([base, Buffer.from([2]), ...tlv]);
}

const info = (data: Buffer, owner: PublicKey, lamports = 2_039_280): AccountInfo<Buffer> => ({ data, owner, lamports, executable: false, rentEpoch: 0 });

// ---- a mocked chain ------------------------------------------------------------------------------

interface Chain {
  conn: Connection;
  state: PublicKey;
  wallet: PublicKey;
  heir: PublicKey;
  accounts: Map<string, AccountInfo<Buffer>>;
  /** Token accounts the wallet owns, per program. */
  held: { spl: PublicKey[]; t22: PublicKey[] };
  setHeir(p: { days: number; setAt: number; deadline: number; inheritedAt?: number } | null): void;
  addMint(o: { program: PublicKey; decimals?: number; extensions?: Array<{ type: number; data: Buffer }> }): PublicKey;
  /** A vault token account (canonical unless \`at\` is given). */
  addVaultToken(o: { mint: PublicKey; program: PublicKey; amount: bigint; frozen?: boolean; withheld?: bigint; at?: PublicKey }): PublicKey;
  addHeirToken(o: { mint: PublicKey; program: PublicKey; owner?: PublicKey; frozen?: boolean; memo?: boolean }): PublicKey;
}

function mockChain(o: { walletLamports?: number; now?: number } = {}): Chain {
  const vaultId = new Uint8Array(32).map((_, i) => (i * 13 + 5) & 0xff);
  const [state] = findStatePda(vaultId);
  const [wallet] = findWalletPda(state);
  const heir = pk();
  const accounts = new Map<string, AccountInfo<Buffer>>();
  accounts.set(state.toBase58(), info(vaultStateData(vaultId), PROGRAM_ID, 3_000_000));
  if (o.walletLamports) accounts.set(wallet.toBase58(), info(Buffer.alloc(0), PublicKey.default, o.walletLamports));
  accounts.set(SYSVAR_CLOCK_PUBKEY.toBase58(), info(clockData(o.now ?? T0), new PublicKey('Sysvar1111111111111111111111111111111111111'), 1));
  const chain: Chain = {
    state,
    wallet,
    heir,
    accounts,
    held: { spl: [], t22: [] },
    conn: undefined as unknown as Connection,
    setHeir(h) {
      const [address] = findHeirPda(state);
      if (!h) accounts.delete(address.toBase58());
      else accounts.set(address.toBase58(), info(heirData({ state, heir, ...h }), PROGRAM_ID, 1_586_880));
    },
    addMint(m) {
      const mint = pk();
      accounts.set(mint.toBase58(), info(mintData({ decimals: m.decimals ?? 6, extensions: m.extensions }), m.program, 1_461_600));
      return mint;
    },
    addVaultToken(t) {
      const t22 = t.program.equals(TOKEN_2022_PROGRAM_ID);
      const address = t.at ?? ataOf(wallet, t.mint, t.program);
      accounts.set(address.toBase58(), info(tokenAccountData({ mint: t.mint, owner: wallet, amount: t.amount, frozen: t.frozen, t22, withheld: t.withheld }), t.program));
      (t22 ? chain.held.t22 : chain.held.spl).push(address);
      return address;
    },
    addHeirToken(t) {
      const address = ataOf(heir, t.mint, t.program);
      const t22 = t.program.equals(TOKEN_2022_PROGRAM_ID);
      accounts.set(address.toBase58(), info(tokenAccountData({ mint: t.mint, owner: t.owner ?? heir, amount: 1n, frozen: t.frozen, t22, memo: t.memo }), t.program));
      return address;
    },
  };
  const get = (k: PublicKey) => accounts.get(k.toBase58()) ?? null;
  chain.conn = {
    getAccountInfo: async (k: PublicKey) => get(k),
    getMultipleAccountsInfo: async (ks: PublicKey[]) => ks.map(get),
    getTokenAccountsByOwner: async (owner: PublicKey, f: { programId: PublicKey }) => {
      expect(owner.equals(wallet)).toBe(true);
      const list = f.programId.equals(SPL_TOKEN_PROGRAM_ID) ? chain.held.spl : chain.held.t22;
      return { context: { slot: 1 }, value: list.map((pubkey) => ({ pubkey, account: get(pubkey)! })) };
    },
    getLatestBlockhash: async () => ({ blockhash: '9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin', lastValidBlockHeight: 1000 }),
  } as unknown as Connection;
  return chain;
}

// ---- heir actions --------------------------------------------------------------------------------

describe('heir actions', () => {
  const heir = new PublicKey('7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU');

  it('encode identically in WASM and the TypeScript mirror, and decode back', () => {
    const lists: VaultAction[][] = [
      [{ kind: 'setHeir', heir, inactivityDays: 365 }],
      [{ kind: 'checkIn', heir, inactivityDays: 30 }],
      [{ kind: 'clearHeir', heir }],
      [
        { kind: 'transferSol', to: heir, lamports: 1n },
        { kind: 'checkIn', heir, inactivityDays: 3650 },
      ],
    ];
    for (const list of lists) {
      const wasm = encodeActions(list);
      expect(toHex(encodeActionsTs(list))).toBe(toHex(wasm));
      expect(decodeActions(wasm)).toEqual(list);
      expect(decodeActionsTs(wasm)).toEqual(list);
    }
    const p = encodeActions([{ kind: 'setHeir', heir, inactivityDays: 365 }]);
    expect(Array.from(p.subarray(0, 2))).toEqual([1, 0x10]);
    expect(Array.from(p.subarray(34))).toEqual([0x6d, 0x01]);
  });

  it('are refused when the period, the heir or their number is wrong (both encoders)', () => {
    const bad: VaultAction[][] = [
      [{ kind: 'setHeir', heir, inactivityDays: 29 }],
      [{ kind: 'setHeir', heir, inactivityDays: 3651 }],
      [{ kind: 'checkIn', heir, inactivityDays: 365.5 }],
      [{ kind: 'setHeir', heir: PublicKey.default, inactivityDays: 365 }],
      [{ kind: 'clearHeir', heir: PublicKey.default }],
      [
        { kind: 'setHeir', heir, inactivityDays: 365 },
        { kind: 'clearHeir', heir },
      ],
    ];
    for (const list of bad) {
      expect(() => validateActions(list)).toThrow();
      expect(() => encodeActions(list)).toThrow();
      expect(() => encodeActionsTs(list)).toThrow();
    }
    // The Rust encoder refuses them on its own too (not only the TypeScript checks in front of it).
    expect(() => getWasm().encode_actions(actionsToJson([{ kind: 'setHeir', heir, inactivityDays: 29 }]))).toThrow(/outside 30..=3650/);
    expect(() =>
      getWasm().encode_actions(
        actionsToJson([
          { kind: 'checkIn', heir, inactivityDays: 30 },
          { kind: 'clearHeir', heir },
        ]),
      ),
    ).toThrow(/at most one heir action/);
  });

  it('carry the heir record (and the heir for SetHeir) in the remaining accounts', () => {
    const state = pk();
    const wallet = pk();
    const [record] = findHeirPda(state);
    const set = executeRemainingAccounts([{ kind: 'setHeir', heir, inactivityDays: 365 }], wallet, state);
    expect(set.map((m) => [m.pubkey.toBase58(), m.isWritable, m.isSigner])).toEqual([
      [record.toBase58(), true, false],
      [heir.toBase58(), false, false],
    ]);
    for (const a of [{ kind: 'checkIn', heir, inactivityDays: 365 } as const, { kind: 'clearHeir', heir } as const]) {
      expect(executeRemainingAccounts([a], wallet, state).map((m) => [m.pubkey.toBase58(), m.isWritable])).toEqual([[record.toBase58(), true]]);
    }
    expect(() => executeRemainingAccounts([{ kind: 'clearHeir', heir }], wallet)).toThrow(/state/);
    // executeIx passes the state through.
    const ix = executeIx({ feePayer: pk(), state, wallet, leafIndex: 0, payload: new Uint8Array(1), actions: [{ kind: 'clearHeir', heir }], sig: null, sigBuffer: pk() });
    expect(ix.keys.at(-1)!.pubkey.equals(record)).toBe(true);
  });

  it('cost compute units: the measured term per action and SetHeir’s PDA search', () => {
    const wallet = pk();
    const state = pk();
    const [, bump] = findHeirPda(state);
    const limit = (a: VaultAction) => executeComputeUnits([a], wallet, 0, state);
    const raw = (extra: number) => Math.ceil(((COMPUTE_UNITS.executeBase + extra) * 1.1) / 5000) * 5000;
    expect(limit({ kind: 'setHeir', heir, inactivityDays: 365 })).toBe(raw(COMPUTE_UNITS.setHeir + COMPUTE_UNITS.pdaBumpIteration * (255 - bump)));
    expect(limit({ kind: 'checkIn', heir, inactivityDays: 365 })).toBe(raw(COMPUTE_UNITS.checkIn));
    expect(limit({ kind: 'clearHeir', heir })).toBe(raw(COMPUTE_UNITS.clearHeir));
  });
});

// ---- the heir record and the clock --------------------------------------------------------------

describe('heir record', () => {
  it('decodes the program layout and refuses anything else', async () => {
    const chain = mockChain();
    expect(await fetchHeir(chain.conn, chain.state)).toBeNull();
    chain.setHeir({ days: 365, setAt: T0, deadline: T0 + 365 * DAY });
    const h = (await fetchHeir(chain.conn, chain.state))!;
    expect(h.address.equals(findHeirPda(chain.state)[0])).toBe(true);
    expect([h.heir.toBase58(), h.inactivityDays, h.setAt, h.deadline, h.inheritedAt, h.lastCheckIn, h.version]).toEqual([
      chain.heir.toBase58(),
      365,
      T0,
      T0 + 365 * DAY,
      null,
      T0,
      1,
    ]);
    // Lamports someone sent to the address before any record: still no heir.
    const [address] = findHeirPda(chain.state);
    chain.accounts.set(address.toBase58(), info(Buffer.alloc(0), PublicKey.default, 890_880));
    expect(await fetchHeir(chain.conn, chain.state)).toBeNull();
    // Another vault's record, another owner, another version, another size.
    const other = pk();
    chain.accounts.set(address.toBase58(), info(heirData({ state: other, heir: chain.heir, days: 30, setAt: 0, deadline: 0 }), PROGRAM_ID));
    await expect(fetchHeir(chain.conn, chain.state)).rejects.toThrow(/another vault/);
    chain.accounts.set(address.toBase58(), info(heirData({ state: chain.state, heir: chain.heir, days: 30, setAt: 0, deadline: 0 }), pk()));
    await expect(fetchHeir(chain.conn, chain.state)).rejects.toThrow(/not owned/);
    expect(() => decodeHeir(address, heirData({ state: chain.state, heir: chain.heir, days: 30, setAt: 0, deadline: 0, version: 2 }))).toThrow(/version/);
    expect(() => decodeHeir(address, Buffer.alloc(101))).toThrow(/not a Bunker heir record/);
  });

  it('reads the cluster clock and says when the heir can inherit', async () => {
    const chain = mockChain({ now: T0 + 12_345 });
    expect(await fetchClusterTime(chain.conn)).toBe(T0 + 12_345);
    chain.setHeir({ days: 30, setAt: T0, deadline: T0 + 30 * DAY });
    const h = (await fetchHeir(chain.conn, chain.state))!;
    expect(heirStatus(h, T0 + 30 * DAY - 1)).toEqual({ due: false, inherited: false, secondsLeft: 1 });
    expect(heirStatus(h, T0 + 30 * DAY)).toEqual({ due: true, inherited: false, secondsLeft: 0 });
    expect(heirStatus({ ...h, inheritedAt: T0 + 31 * DAY }, T0)).toEqual({ due: true, inherited: true, secondsLeft: 0 });
  });
});

// ---- inherit --------------------------------------------------------------------------------------

describe('buildInheritTxs', () => {
  const caller = Keypair.generate().publicKey;

  it('moves the SOL and every token account that can move, harvests withheld fees, and lists what stays', async () => {
    const chain = mockChain({ walletLamports: 3_000_000_000 });
    chain.setHeir({ days: 365, setAt: T0, deadline: T0 + 365 * DAY });
    const a = chain.addMint({ program: SPL_TOKEN_PROGRAM_ID, decimals: 6 });
    const b = chain.addMint({ program: TOKEN_2022_PROGRAM_ID, decimals: 9, extensions: [ext.transferFee(100, 10n ** 12n)] });
    const hook = chain.addMint({ program: TOKEN_2022_PROGRAM_ID, extensions: [ext.transferHook(pk(), pk())] });
    const frozen = chain.addMint({ program: SPL_TOKEN_PROGRAM_ID });
    const vaultA = chain.addVaultToken({ mint: a, program: SPL_TOKEN_PROGRAM_ID, amount: 500n });
    const side = chain.addVaultToken({ mint: a, program: SPL_TOKEN_PROGRAM_ID, amount: 9n, at: pk() });
    const vaultB = chain.addVaultToken({ mint: b, program: TOKEN_2022_PROGRAM_ID, amount: 1_000n, withheld: 7n });
    chain.addVaultToken({ mint: hook, program: TOKEN_2022_PROGRAM_ID, amount: 3n });
    chain.addVaultToken({ mint: frozen, program: SPL_TOKEN_PROGRAM_ID, amount: 4n, frozen: true });
    const heirB = chain.addHeirToken({ mint: b, program: TOKEN_2022_PROGRAM_ID });

    const plan = await buildInheritTxs({ conn: chain.conn, state: chain.state, caller, now: T0 + 365 * DAY });
    expect(plan.lamports).toBe(3_000_000_000n);
    expect(plan.tokens.map((t) => [t.mint.toBase58(), t.vaultAccount.toBase58(), t.amount, t.createsHeirAccount, t.harvest])).toEqual([
      [a.toBase58(), vaultA.toBase58(), 500n, true, false],
      [b.toBase58(), vaultB.toBase58(), 1_000n, false, true],
    ]);
    expect(plan.tokens[1]!.heirAccount.equals(heirB)).toBe(true);
    expect(plan.skipped.map((s) => [s.account.equals(side) ? 'side' : s.mint.equals(hook) ? 'hook' : s.mint.equals(frozen) ? 'frozen' : '?', s.reason])).toEqual([
      ['side', expect.stringMatching(/not the vault's associated token account/)],
      ['frozen', expect.stringMatching(/froze the vault's account/)],
      ['hook', expect.stringMatching(/transfer hook/)],
    ]);
    expect(summarizeInheritPlan(plan, (m) => (m.equals(a) ? 'AAA' : 'BBB'))).toBe('3 SOL, 0.0005 AAA and 0.000001 BBB');

    // One transaction: compute limit, harvest the withheld fee, inherit with both token accounts.
    expect(plan.transactions.length).toBe(1);
    const tx = plan.transactions[0]!;
    expect(tx.feePayer!.equals(caller)).toBe(true);
    expect(measureTx(tx.instructions, caller)).toBeLessThanOrEqual(1232);
    const [cu, harvest, inherit] = tx.instructions;
    expect(cu!.programId.toBase58()).toBe('ComputeBudget111111111111111111111111111111');
    expect(cu!.data.readUInt32LE(1)).toBe(inheritComputeUnits(chain.wallet, chain.heir, plan.tokens));
    expect(toHex(harvest!.data)).toBe(toHex(createHarvestWithheldTokensToMintInstruction(b, [vaultB], TOKEN_2022_PROGRAM_ID).data));
    expect(inherit!.programId.equals(PROGRAM_ID)).toBe(true);
    expect(bytesEqual(inherit!.data, IX_DISCRIMINATORS.inherit)).toBe(true);
    const keys = inherit!.keys.map((k) => [k.pubkey.toBase58(), k.isWritable, k.isSigner]);
    expect(keys.slice(0, 7)).toEqual([
      [caller.toBase58(), true, true],
      [chain.state.toBase58(), true, false],
      [chain.wallet.toBase58(), true, false],
      [findHeirPda(chain.state)[0].toBase58(), true, false],
      [chain.heir.toBase58(), true, false],
      ['11111111111111111111111111111111', false, false],
      [ASSOCIATED_TOKEN_PROGRAM_ID.toBase58(), false, false],
    ]);
    expect(keys.slice(7)).toEqual([
      [SPL_TOKEN_PROGRAM_ID.toBase58(), false, false],
      [a.toBase58(), false, false],
      [vaultA.toBase58(), true, false],
      [ataOf(chain.heir, a, SPL_TOKEN_PROGRAM_ID).toBase58(), true, false],
      [TOKEN_2022_PROGRAM_ID.toBase58(), false, false],
      [b.toBase58(), false, false],
      [vaultB.toBase58(), true, false],
      [heirB.toBase58(), true, false],
    ]);
  });

  it('splits a large estate over several transactions; an empty vault still gets one (it seals)', async () => {
    const chain = mockChain({ walletLamports: 1_000_000_000, now: T0 + 40 * DAY });
    chain.setHeir({ days: 30, setAt: T0, deadline: T0 + 30 * DAY });
    for (let i = 0; i < 9; i++) {
      const m = chain.addMint({ program: SPL_TOKEN_PROGRAM_ID });
      chain.addVaultToken({ mint: m, program: SPL_TOKEN_PROGRAM_ID, amount: BigInt(i + 1) });
    }
    const plan = await buildInheritTxs({ conn: chain.conn, state: chain.state, caller });
    expect(plan.transactions.map((t) => (t.instructions.at(-1)!.keys.length - 7) / 4)).toEqual([7, 2]);
    expect(plan.batches.map((b) => b.length)).toEqual([7, 2]);
    expect(plan.batches.flat().map((t) => t.amount)).toEqual(plan.tokens.map((t) => t.amount));
    for (const t of plan.transactions) expect(measureTx(t.instructions, caller)).toBeLessThanOrEqual(1232);
    const small = await buildInheritTxs({ conn: chain.conn, state: chain.state, caller, maxTokensPerTx: 3 });
    expect(small.transactions.length).toBe(3);

    const empty = mockChain({ now: T0 + 40 * DAY });
    empty.setHeir({ days: 30, setAt: T0, deadline: T0 + 30 * DAY });
    const e = await buildInheritTxs({ conn: empty.conn, state: empty.state, caller });
    expect(e.transactions.length).toBe(1);
    expect(e.batches).toEqual([[]]);
    expect(e.transactions[0]!.instructions.at(-1)!.keys.length).toBe(7);
    expect(summarizeInheritPlan(e)).toMatch(/nothing yet/);
  });

  it('refuses before the deadline and without an heir; an inherited vault keeps forwarding', async () => {
    const chain = mockChain({ walletLamports: 5_000_000, now: T0 + 30 * DAY - 1 });
    await expect(buildInheritTxs({ conn: chain.conn, state: chain.state, caller })).rejects.toBeInstanceOf(NoHeirError);
    chain.setHeir({ days: 30, setAt: T0, deadline: T0 + 30 * DAY });
    const early = await buildInheritTxs({ conn: chain.conn, state: chain.state, caller }).catch((e: unknown) => e);
    expect(early).toBeInstanceOf(InheritanceNotDueError);
    expect((early as InheritanceNotDueError).deadline).toBe(T0 + 30 * DAY);
    // Once inherited, whatever arrives later can be forwarded at any time.
    chain.setHeir({ days: 30, setAt: T0, deadline: T0 + 90 * DAY, inheritedAt: T0 + 31 * DAY });
    const later = await buildInheritTxs({ conn: chain.conn, state: chain.state, caller });
    expect(later.transactions.length).toBe(1);
  });

  it('empty vault accounts are only closed to the heir: no heir account, even for a hook mint; frozen ones stay', async () => {
    const chain = mockChain({ now: T0 + 40 * DAY });
    chain.setHeir({ days: 30, setAt: T0, deadline: T0 + 30 * DAY });
    const hook = chain.addMint({ program: TOKEN_2022_PROGRAM_ID, extensions: [ext.transferHook(pk(), pk())] });
    const plain = chain.addMint({ program: SPL_TOKEN_PROGRAM_ID });
    const iced = chain.addMint({ program: SPL_TOKEN_PROGRAM_ID });
    chain.addVaultToken({ mint: hook, program: TOKEN_2022_PROGRAM_ID, amount: 0n });
    chain.addVaultToken({ mint: plain, program: SPL_TOKEN_PROGRAM_ID, amount: 0n });
    chain.addVaultToken({ mint: iced, program: SPL_TOKEN_PROGRAM_ID, amount: 0n, frozen: true });
    const plan = await buildInheritTxs({ conn: chain.conn, state: chain.state, caller });
    const byMint = new Map(plan.tokens.map((t) => [t.mint.toBase58(), t]));
    expect(byMint.get(hook.toBase58())).toMatchObject({ amount: 0n, createsHeirAccount: false });
    expect(byMint.get(plain.toBase58())).toMatchObject({ amount: 0n, createsHeirAccount: false });
    expect(plan.skipped.map((s) => [s.mint.toBase58(), s.reason])).toEqual([[iced.toBase58(), "the issuer froze the vault's account"]]);
    expect(summarizeInheritPlan(plan)).toMatch(/nothing yet/);
  });

  it('skips a token whose heir account belongs to someone else, is frozen or needs memos, and default-frozen new accounts', async () => {
    const chain = mockChain({ now: T0 + 40 * DAY });
    chain.setHeir({ days: 30, setAt: T0, deadline: T0 + 30 * DAY });
    const reassigned = chain.addMint({ program: SPL_TOKEN_PROGRAM_ID });
    const iced = chain.addMint({ program: SPL_TOKEN_PROGRAM_ID });
    const defaultFrozen = chain.addMint({ program: TOKEN_2022_PROGRAM_ID, extensions: [ext.defaultAccountState(2)] });
    const memo = chain.addMint({ program: TOKEN_2022_PROGRAM_ID });
    for (const [m, prog] of [
      [reassigned, SPL_TOKEN_PROGRAM_ID],
      [iced, SPL_TOKEN_PROGRAM_ID],
      [defaultFrozen, TOKEN_2022_PROGRAM_ID],
      [memo, TOKEN_2022_PROGRAM_ID],
    ] as const) {
      chain.addVaultToken({ mint: m, program: prog, amount: 10n });
    }
    chain.addHeirToken({ mint: reassigned, program: SPL_TOKEN_PROGRAM_ID, owner: pk() });
    chain.addHeirToken({ mint: iced, program: SPL_TOKEN_PROGRAM_ID, frozen: true });
    chain.addHeirToken({ mint: memo, program: TOKEN_2022_PROGRAM_ID, memo: true });
    const plan = await buildInheritTxs({ conn: chain.conn, state: chain.state, caller });
    expect(plan.tokens).toEqual([]);
    const why = new Map(plan.skipped.map((s) => [s.mint.toBase58(), s.reason]));
    expect(why.get(reassigned.toBase58())).toMatch(/belongs to someone else/);
    expect(why.get(iced.toBase58())).toMatch(/froze the heir's account/);
    expect(why.get(defaultFrozen.toBase58())).toMatch(/start frozen/);
    expect(why.get(memo.toBase58())).toMatch(/only accepts transfers with a memo/);
  });
});

describe('programSupportsLegacy', () => {
  const vault = { state: pk(), wallet: pk() };
  const payer = pk();
  const conn = (sim: () => Promise<unknown>) =>
    ({
      getLatestBlockhash: async () => ({ blockhash: '9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin', lastValidBlockHeight: 1 }),
      simulateTransaction: sim,
    }) as unknown as Connection;

  it('a program built before Legacy answers "unknown instruction"', async () => {
    const c = conn(async () => ({ value: { err: { InstructionError: [0, { Custom: 101 }] }, logs: [] } }));
    expect(await programSupportsLegacy(c, vault, payer)).toBe(false);
  });

  it('one with Legacy answers with its own error (the stand-in heir never matches)', async () => {
    for (const code of [6040, 6045, 6047]) {
      const c = conn(async () => ({ value: { err: { InstructionError: [0, { Custom: code }] }, logs: [] } }));
      expect(await programSupportsLegacy(c, vault, payer)).toBe(true);
    }
  });

  it("can't tell when the simulation fails for another reason", async () => {
    expect(await programSupportsLegacy(conn(async () => ({ value: { err: 'AccountNotFound', logs: [] } })), vault, payer)).toBeNull();
    expect(
      await programSupportsLegacy(
        conn(async () => {
          throw new Error('rpc down');
        }),
        vault,
        payer,
      ),
    ).toBeNull();
  });

  it('simulates an inherit of this vault with the fee payer as caller and stand-in heir, signatures unchecked', async () => {
    let seen: { tx: VersionedTransaction; opts: { sigVerify?: boolean } } | null = null;
    const c = conn(async (...args: unknown[]) => {
      seen = { tx: args[0] as VersionedTransaction, opts: args[1] as { sigVerify?: boolean } };
      return { value: { err: { InstructionError: [0, { Custom: 6040 }] }, logs: [] } };
    });
    await programSupportsLegacy(c, vault, payer);
    const msg = seen!.tx.message;
    const keys = msg.staticAccountKeys.map((k) => k.toBase58());
    expect(keys[0]).toBe(payer.toBase58());
    expect(keys).toContain(vault.state.toBase58());
    expect(keys).toContain(vault.wallet.toBase58());
    expect(keys).toContain(findHeirPda(vault.state)[0].toBase58());
    expect(seen!.opts.sigVerify).toBe(false);
  });
});

describe('an heir that can no longer receive, and vaults that are someone\\'s heir', () => {
  it('buildInheritTxs refuses an heir that became a token account (the program would too)', async () => {
    const chain = mockChain({ walletLamports: 1_000_000_000, now: T0 + 40 * DAY });
    chain.setHeir({ days: 30, setAt: T0, deadline: T0 + 30 * DAY });
    chain.accounts.set(chain.heir.toBase58(), info(Buffer.alloc(165), SPL_TOKEN_PROGRAM_ID));
    const caller = Keypair.generate().publicKey;
    await expect(buildInheritTxs({ conn: chain.conn, state: chain.state, caller })).rejects.toBeInstanceOf(HeirCannotReceiveError);
  });

  it('finds the heir records that name an address, checking each one again', async () => {
    const heir = pk();
    const stateA = pk();
    const good = { pubkey: findHeirPda(stateA)[0], account: info(heirData({ state: stateA, heir, days: 30, setAt: T0, deadline: T0 + 30 * DAY }), PROGRAM_ID) };
    // A record for another heir (a lying RPC) and one at the wrong address are dropped.
    const stateB = pk();
    const otherHeir = { pubkey: findHeirPda(stateB)[0], account: info(heirData({ state: stateB, heir: pk(), days: 30, setAt: T0, deadline: T0 + 30 * DAY }), PROGRAM_ID) };
    const misplaced = { pubkey: pk(), account: info(heirData({ state: pk(), heir, days: 30, setAt: T0, deadline: T0 + 30 * DAY }), PROGRAM_ID) };
    let filters: unknown = null;
    const conn = {
      getProgramAccounts: async (_id: PublicKey, cfg: { filters: unknown }) => {
        filters = cfg.filters;
        return [good, otherHeir, misplaced];
      },
    } as unknown as Connection;
    const found = await findHeirRecordsNaming(conn, heir);
    expect(found.map((h) => h.state.toBase58())).toEqual([stateA.toBase58()]);
    expect(filters).toEqual([
      { dataSize: 100 },
      { memcmp: { offset: 0, bytes: expect.any(String) } },
      { memcmp: { offset: HEIR_FIELD_OFFSET, bytes: heir.toBase58() } },
    ]);
  });

  it('warns before closing a vault that other vaults would leave things to', () => {
    const rec = (inheritedAt: number | null) => ({ ...decodeHeir(findHeirPda(pk())[0], heirData({ state: pk(), heir: pk(), days: 30, setAt: T0, deadline: T0 + 30 * DAY })), inheritedAt });
    expect(heirOfWarning(null)).toEqual([]);
    expect(heirOfWarning([rec(T0)])).toEqual([]);
    expect(heirOfWarning([rec(null)])[0]).toMatch(/heir of another vault .*lost for good/);
    expect(heirOfWarning([rec(null), rec(null)])[0]).toMatch(/heir of 2 other vaults/);
  });
});
`;export{e as default};