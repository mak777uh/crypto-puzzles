var e=`// Swap through Jupiter: client, composition, size ladder, failure classification and the
// sign → upload → build flow, against recorded /swap/v2/build responses (test/fixtures, re-record
// with record-jupiter.ts) and a mocked Connection. No network.
import { beforeAll, describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { Buffer } from 'buffer';
import { AccountLayout, ACCOUNT_SIZE, getAssociatedTokenAddressSync } from '@solana/spl-token';
import { AddressLookupTableAccount, ComputeBudgetProgram, PublicKey } from '@solana/web3.js';
import type { AccountInfo, Connection, VersionedTransaction } from '@solana/web3.js';
import { initWasm } from '../src/wasm';
import { deriveRoot } from '../src/keys';
import { computeVaultId, findSigBufferPda, findStatePda, findWalletPda } from '../src/addresses';
import { findMetaplexMetadataPda } from '../src/assets';
import { SIG_BUFFER_DISCRIMINATOR, VAULT_STATE_DISCRIMINATOR, fetchVault } from '../src/state';
import { MemoryLedger } from '../src/ledger';
import { PendingSignatureError } from '../src/pending';
import { IX_DISCRIMINATORS } from '../src/instructions';
import { PROGRAM_ID, SIG_LEN, SPL_TOKEN_PROGRAM_ID, TOKEN_2022_PROGRAM_ID } from '../src/constants';
import { bytesEqual, toHex } from '../src/bytes';
import { encodeActionsTs } from '../src/actions';
import {
  JUPITER_PROGRAM_ID,
  JupiterApiError,
  JupiterClient,
  NATIVE_SOL_MINT,
  SwapPriceMovedError,
  SwapRouteError,
  SwapSignatureUsedError,
  SwapSimulationError,
  SwapTooLargeError,
  buildSwapTransaction,
  checkSwapAssets,
  findPendingSwap,
  classifySwapFailure,
  composeSwapTransaction,
  lookupTablesFromJupiter,
  parseJupiterBuild,
  prepareSwap,
  quoteVaultSwap,
  swapInputAction,
  swapSignatureState,
  swapSignatureUploads,
  v0TransactionSize,
} from '../src/swap';
import type { JupiterBuildParams, JupiterBuildResponse, SwapAsset } from '../src/swap';
import { ext, metaplexData, mintData } from './helpers';

type Recorded = JupiterBuildResponse & { _recorded: { vaultState: string; vaultWallet: string; taker: string; url: string } };
const fixture = (name: string): Recorded => JSON.parse(readFileSync(new URL(\`./fixtures/\${name}.json\`, import.meta.url), 'utf8')) as Recorded;
const SOL_USDC = fixture('jupiter-build-sol-usdc');
const USDC_SOL = fixture('jupiter-build-usdc-sol');
const clone = <T>(x: T): T => JSON.parse(JSON.stringify(x)) as T;
/**
 * A long multi-hop route, deterministically: the recorded route plus \`extra\` pool accounts that are
 * in no lookup table (32 bytes each), like a 4-hop split at maxAccounts 64 (live: 1,525 bytes).
 */
function oversized(r: Recorded, extra = 20): Recorded {
  const b = clone(r);
  for (let i = 0; i < extra; i++) {
    const seed = new Uint8Array(32).fill(i + 1);
    b.swapInstruction.accounts.push({ pubkey: new PublicKey(seed).toBase58(), isSigner: false, isWritable: i % 2 === 0 });
  }
  return b;
}
const USDC_SOL_LONG = oversized(USDC_SOL);

const keys = JSON.parse(readFileSync(new URL('../../../crates/bunker-core/vectors/keys.json', import.meta.url), 'utf8')) as { mnemonic: string };
const MNEMONIC = keys.mnemonic;
const TAKER = new PublicKey(SOL_USDC._recorded.taker);
const USDC = new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v');
const SOL: SwapAsset = { kind: 'sol' };
const USDC_ASSET: SwapAsset = { kind: 'token', mint: USDC, tokenProgram: SPL_TOKEN_PROGRAM_ID };

/** A JupiterClient whose fetch answers from a function of the request URL. */
function fakeJupiter(
  answer: (url: URL) => { status?: number; body: unknown; headers?: Record<string, string> } | Promise<never>,
  opts: { apiKey?: string; timeoutMs?: number; retries?: number } = {},
) {
  const seen: Array<{ url: URL; headers: Record<string, string> }> = [];
  const fetchImpl = (async (input: string, init?: RequestInit) => {
    const url = new URL(input);
    seen.push({ url, headers: (init?.headers ?? {}) as Record<string, string> });
    const a = await answer(url);
    return new Response(typeof a.body === 'string' ? a.body : JSON.stringify(a.body), { status: a.status ?? 200, headers: { 'content-type': 'application/json', ...(a.headers ?? {}) } });
  }) as unknown as typeof fetch;
  return { client: new JupiterClient({ fetch: fetchImpl, ...opts }), seen };
}

// ---- mocked chain: the SDK test vault (golden mnemonic, localnet, epoch 0) --------------------

interface Chain {
  conn: Connection;
  state: PublicKey;
  wallet: PublicKey;
  setNextLeaf(n: number): void;
  setAccount(k: PublicKey, info: AccountInfo<Buffer> | null): void;
  writeBuffer(signature: Uint8Array, leaf: number, upTo?: number): void;
}

function vaultStateData(root: Uint8Array, vaultId: Uint8Array, nextLeaf: number): Buffer {
  const b = Buffer.alloc(280);
  let o = 0;
  b.set(VAULT_STATE_DISCRIMINATOR, o);
  o += 8;
  b[o++] = 1;
  b[o++] = 255;
  b[o++] = 255;
  b.set(vaultId, o);
  o += 32;
  b.set(root, o);
  o += 48;
  b.writeUInt32LE(0, o);
  o += 4;
  b.writeUInt32LE(nextLeaf, o);
  o += 4;
  b.writeUInt32LE(1024, o);
  o += 4;
  b[o++] = 0;
  b.writeBigUInt64LE(1n, o);
  return b;
}

function tokenAccountData(mint: PublicKey, owner: PublicKey, amount: bigint): Buffer {
  const b = Buffer.alloc(ACCOUNT_SIZE);
  AccountLayout.encode(
    {
      mint,
      owner,
      amount,
      delegateOption: 0,
      delegate: PublicKey.default,
      state: 1,
      isNativeOption: 0,
      isNative: 0n,
      delegatedAmount: 0n,
      closeAuthorityOption: 0,
      closeAuthority: PublicKey.default,
    },
    b,
  );
  return b;
}

const acct = (data: Buffer, owner: PublicKey, lamports = 2_039_280): AccountInfo<Buffer> => ({ data, owner, lamports, executable: false, rentEpoch: 0 });

async function mockChain(o: { nextLeaf?: number; walletLamports?: number; usdcInVault?: bigint; usdcMintExtensions?: Array<{ type: number; data: Buffer }> } = {}): Promise<Chain> {
  const root = await deriveRoot(MNEMONIC, 0, { cluster: 'localnet', cosigner: null });
  const vaultId = computeVaultId(root, null);
  const [state] = findStatePda(vaultId);
  const [wallet] = findWalletPda(state);
  const accounts = new Map<string, AccountInfo<Buffer>>();
  const put = (k: PublicKey, info: AccountInfo<Buffer> | null) => (info ? accounts.set(k.toBase58(), info) : accounts.delete(k.toBase58()));
  const usdcProgram = o.usdcMintExtensions ? TOKEN_2022_PROGRAM_ID : SPL_TOKEN_PROGRAM_ID;
  put(state, acct(vaultStateData(root, vaultId, o.nextLeaf ?? 0), PROGRAM_ID, 3_000_000));
  put(wallet, acct(Buffer.alloc(0), PublicKey.default, o.walletLamports ?? 2_000_000_000));
  put(TAKER, acct(Buffer.alloc(0), PublicKey.default, 50_000_000));
  put(
    USDC,
    acct(
      mintData({ decimals: 6, mintAuthority: TAKER, freezeAuthority: TAKER, ...(o.usdcMintExtensions ? { extensions: o.usdcMintExtensions } : {}) }),
      usdcProgram,
      1_461_600,
    ),
  );
  put(findMetaplexMetadataPda(USDC), acct(metaplexData({ mint: USDC, name: 'USD Coin', symbol: 'USDC', uri: '' }), new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s')));
  if (o.usdcInVault !== undefined) put(getAssociatedTokenAddressSync(USDC, wallet, true, usdcProgram), acct(tokenAccountData(USDC, wallet, o.usdcInVault), usdcProgram));
  const tables = [...lookupTablesFromJupiter(SOL_USDC), ...lookupTablesFromJupiter(USDC_SOL)];
  const get = (k: PublicKey) => accounts.get(k.toBase58()) ?? null;
  const conn = {
    getAccountInfo: async (k: PublicKey) => get(k),
    getMultipleAccountsInfo: async (ks: PublicKey[]) => ks.map(get),
    getMinimumBalanceForRentExemption: async () => 890_880,
    getLatestBlockhash: async () => ({ blockhash: '9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin', lastValidBlockHeight: 1000 }),
    getBalance: async (k: PublicKey) => get(k)?.lamports ?? 0,
    getTokenAccountsByOwner: async () => ({ context: { slot: 1 }, value: [] }),
    getAddressLookupTable: async (k: PublicKey) => ({ context: { slot: 1 }, value: tables.find((t: AddressLookupTableAccount) => t.key.equals(k)) ?? null }),
    // The pending-signature scan (SDK pending.ts): live signature buffers, then the state's history.
    getProgramAccounts: async () =>
      [...accounts.entries()]
        .filter(([, a]) => a.owner.equals(PROGRAM_ID) && bytesEqual(a.data.subarray(0, 8), SIG_BUFFER_DISCRIMINATOR))
        .map(([k, account]) => ({ pubkey: new PublicKey(k), account })),
    getSignaturesForAddress: async () => [],
    getTransactions: async () => [],
  } as unknown as Connection;
  return {
    conn,
    state,
    wallet,
    setNextLeaf: (n) => put(state, acct(vaultStateData(root, vaultId, n), PROGRAM_ID, 3_000_000)),
    setAccount: put,
    writeBuffer(signature, leaf, upTo = SIG_LEN) {
      const [buf] = findSigBufferPda(state, TAKER, 0, leaf);
      const header = Buffer.alloc(8 + 32 + 32 + 4 + 4 + 1);
      header.set(SIG_BUFFER_DISCRIMINATOR, 0);
      header.set(state.toBytes(), 8);
      header.set(TAKER.toBytes(), 40);
      header.writeUInt32LE(0, 72);
      header.writeUInt32LE(leaf, 76);
      header[80] = 254;
      const body = Buffer.alloc(SIG_LEN + 8);
      body.set(signature.subarray(0, upTo), 0);
      put(buf, acct(Buffer.concat([header, body]), PROGRAM_ID, 18_000_000));
    },
  };
}

beforeAll(async () => {
  await initWasm();
});

// ---- Jupiter client ------------------------------------------------------------------------------

describe('JupiterClient', () => {
  const params: JupiterBuildParams = {
    inputMint: NATIVE_SOL_MINT,
    outputMint: USDC,
    amount: 100_000_000n,
    taker: TAKER,
    payer: TAKER,
    slippageBps: 50,
    maxAccounts: 64,
    wrapAndUnwrapSol: true,
    destinationTokenAccount: new PublicKey(SOL_USDC.swapInstruction.accounts[7]!.pubkey),
  };

  it('builds the /swap/v2/build URL with every parameter the vault swap needs', () => {
    const url = new URL(new JupiterClient({ fetch: (async () => new Response('{}')) as unknown as typeof fetch }).buildUrl(params));
    expect(url.origin + url.pathname).toBe('https://api.jup.ag/swap/v2/build');
    expect(Object.fromEntries(url.searchParams)).toEqual({
      inputMint: NATIVE_SOL_MINT.toBase58(),
      outputMint: USDC.toBase58(),
      amount: '100000000',
      taker: TAKER.toBase58(),
      payer: TAKER.toBase58(),
      slippageBps: '50',
      maxAccounts: '64',
      wrapAndUnwrapSol: 'true',
      transactionVersion: '0',
      destinationTokenAccount: params.destinationTokenAccount!.toString(),
    });
    expect(() => new JupiterClient({ fetch }).buildUrl({ ...params, nativeDestinationAccount: TAKER })).toThrow(/mutually exclusive/);
    expect(() => new JupiterClient({ fetch }).buildUrl({ ...params, maxAccounts: 65 })).toThrow(/maxAccounts/);
  });

  it('parses a recorded response and sends x-api-key only when configured', async () => {
    const noKey = fakeJupiter(() => ({ body: SOL_USDC }));
    const res = await noKey.client.build(params);
    expect(res.outAmount).toBe(SOL_USDC.outAmount);
    expect(res.swapInstruction.programId).toBe(JUPITER_PROGRAM_ID.toBase58());
    expect(noKey.seen[0]!.headers['x-api-key']).toBeUndefined();
    expect(noKey.client.hasApiKey).toBe(false);

    const withKey = fakeJupiter(() => ({ body: SOL_USDC }), { apiKey: 'test-key' });
    await withKey.client.build(params);
    expect(withKey.seen[0]!.headers['x-api-key']).toBe('test-key');
  });

  it.each([
    [400, { error: 'No routes found' }, 'noRoute'],
    [400, { error: 'Invalid inputMint' }, 'badRequest'],
    [401, { error: 'Unauthorized' }, 'unauthorized'],
    [429, { error: 'Too many requests' }, 'rateLimited'],
    [503, 'upstream down', 'server'],
    [200, { hello: 'world' }, 'badResponse'],
    [200, 'not json', 'badResponse'],
  ] as const)('HTTP %i %j → JupiterApiError(%s)', async (status, body, kind) => {
    const { client } = fakeJupiter(() => ({ status, body }), { retries: 0 });
    const err = await client.build(params).catch((e: unknown) => e);
    expect(err).toBeInstanceOf(JupiterApiError);
    expect((err as JupiterApiError).kind).toBe(kind);
  });

  it('retries a rate limit (honouring Retry-After) and a server error, then gives up', async () => {
    let calls = 0;
    const flaky = fakeJupiter(() => (++calls === 1 ? { status: 429, body: { error: 'slow down' }, headers: { 'retry-after': '0.01' } } : calls === 2 ? { status: 502, body: 'bad gateway' } : { body: SOL_USDC }));
    const res = await flaky.client.build(params);
    expect(res.outAmount).toBe(SOL_USDC.outAmount);
    expect(calls).toBe(3);
    const always = fakeJupiter(() => ({ status: 429, body: {}, headers: { 'retry-after': '0.01' } }), { retries: 1 });
    await expect(always.client.build(params)).rejects.toMatchObject({ kind: 'rateLimited' });
    expect(always.seen.length).toBe(2);
  });

  it('surfaces network errors and times out', async () => {
    const down = new JupiterClient({ fetch: (async () => Promise.reject(new TypeError('fetch failed'))) as unknown as typeof fetch });
    await expect(down.build(params)).rejects.toMatchObject({ kind: 'network' });
    const hang = new JupiterClient({
      timeoutMs: 30,
      fetch: ((_: string, init?: RequestInit) =>
        new Promise((_r, reject) => init?.signal?.addEventListener('abort', () => reject(new DOMException('aborted', 'AbortError'))))) as unknown as typeof fetch,
    });
    await expect(hang.build(params)).rejects.toMatchObject({ kind: 'timeout' });
  });
});

// ---- composition ------------------------------------------------------------------------------

function vaultOf(r: Recorded) {
  return { state: new PublicKey(r._recorded.vaultState), wallet: new PublicKey(r._recorded.vaultWallet), cosigner: null, rootEpoch: 0, nextLeaf: 0 };
}
function compose(r: Recorded, input: SwapAsset, output: SwapAsset, extra: Partial<Parameters<typeof composeSwapTransaction>[0]> = {}, signedAmount?: bigint) {
  const build = parseJupiterBuild(r);
  return composeSwapTransaction({
    taker: TAKER,
    vault: vaultOf(r),
    leafIndex: 7,
    payload: encodeActionsTs([swapInputAction(TAKER, input, signedAmount ?? BigInt(build.inAmount))]),
    output,
    build,
    lookupTables: lookupTablesFromJupiter(build),
    ...extra,
  });
}

describe('composeSwapTransaction', () => {
  it('SOL → USDC: budget, vault ATA, execute (buffer), then Jupiter; fits in one v0 transaction', () => {
    const c = compose(SOL_USDC, SOL, USDC_ASSET);
    const vault = vaultOf(SOL_USDC);
    const vaultUsdc = getAssociatedTokenAddressSync(USDC, vault.wallet, true);
    const programs = c.instructions.map((ix) => ix.programId.toBase58());
    expect(programs.slice(0, 2)).toEqual([ComputeBudgetProgram.programId.toBase58(), ComputeBudgetProgram.programId.toBase58()]);
    // 1. the vault's USDC account, created idempotently by the wallet, owned by the vault PDA
    const create = c.instructions[2]!;
    expect(create.keys[0]!.pubkey.equals(TAKER)).toBe(true);
    expect(create.keys[1]!.pubkey.equals(vaultUsdc)).toBe(true);
    expect(create.keys[2]!.pubkey.equals(vault.wallet)).toBe(true);
    expect(create.data[0]).toBe(1); // CreateIdempotent
    // 2. execute at executeIndex: buffer path (sig = None), the one transfer pays the wallet
    const exec = c.instructions[c.executeIndex]!;
    expect(exec.programId.equals(PROGRAM_ID)).toBe(true);
    expect(bytesEqual(exec.data.subarray(0, 8), IX_DISCRIMINATORS.execute)).toBe(true);
    expect(exec.data.at(-1)).toBe(0);
    expect(exec.keys[4]!.pubkey.equals(findSigBufferPda(vault.state, TAKER, 0, 7)[0])).toBe(true);
    expect(exec.keys.at(-1)!.pubkey.equals(TAKER)).toBe(true);
    // 3. Jupiter after the execute, swap at swapIndex
    expect(c.instructions[c.swapIndex]!.programId.equals(JUPITER_PROGRAM_ID)).toBe(true);
    expect(c.swapIndex).toBe(c.executeIndex + 1 + SOL_USDC.setupInstructions.length);
    expect(c.instructions.length).toBe(c.swapIndex + 1 + (SOL_USDC.cleanupInstruction ? 1 : 0) + SOL_USDC.otherInstructions.length);
    // size: exact, matches web3's serializer, within the packet limit
    expect(c.size).toBe(c.transaction.serialize().length);
    expect(c.size).toBe(v0TransactionSize(c.message));
    expect(c.size).toBeLessThanOrEqual(1232);
    expect(c.fits).toBe(true);
    expect(c.message.header.numRequiredSignatures).toBe(1);
    expect(c.message.staticAccountKeys[0]!.equals(TAKER)).toBe(true);
    // rent: the vault's USDC account and the wallet's USDC account; not the wSOL account (closed by cleanup)
    const created = c.createsAccounts.map((k) => k.toBase58());
    expect(created).toContain(vaultUsdc.toBase58());
    expect(created).toContain(getAssociatedTokenAddressSync(USDC, TAKER).toBase58());
    expect(created).not.toContain(getAssociatedTokenAddressSync(NATIVE_SOL_MINT, TAKER).toBase58());
    expect(c.quote.outAmount).toBe(BigInt(SOL_USDC.outAmount));
    expect(c.quote.minOutAmount).toBe(BigInt(SOL_USDC.otherAmountThreshold));
    expect(c.quote.route.length).toBeGreaterThan(0);
  });

  it('USDC → SOL: creates the wallet’s USDC account before the execute and pays the vault wallet; a long route does not fit', () => {
    const c = compose(USDC_SOL, USDC_ASSET, SOL);
    const takerUsdc = getAssociatedTokenAddressSync(USDC, TAKER);
    const create = c.instructions[c.executeIndex - 1]!;
    expect(create.keys[1]!.pubkey.equals(takerUsdc)).toBe(true);
    const exec = c.instructions[c.executeIndex]!;
    // TransferToken remaining accounts: token program, mint, vault ATA, destination (the wallet's ATA)
    expect(exec.keys.at(-1)!.pubkey.equals(takerUsdc)).toBe(true);
    expect(c.instructions[c.swapIndex]!.keys.some((k) => k.pubkey.equals(vaultOf(USDC_SOL).wallet) && k.isWritable)).toBe(true);
    expect(c.fits).toBe(true);
    const long = compose(USDC_SOL_LONG, USDC_ASSET, SOL);
    expect(long.size).toBe(c.size + 20 * 33); // 32-byte static key + 1 index byte each
    expect(long.size).toBeGreaterThan(1232);
    expect(long.fits).toBe(false);
  });

  it('clamps the priority fee', () => {
    const c = compose(SOL_USDC, SOL, USDC_ASSET, { computeUnitLimit: 400_000, maxPriorityFeeLamports: 100n });
    expect(c.computeUnitLimit).toBe(400_000);
    expect(c.priorityFeeLamports).toBeLessThanOrEqual(100n);
    expect(c.networkFeeLamports).toBe(5000n + c.priorityFeeLamports);
  });

  const tamper: Array<[string, (b: Recorded) => void, RegExp]> = [
    ['amount differs from the signature', (b) => void (b.inAmount = '100000001'), /signature moves/],
    ['ExactOut route', (b) => void (b.swapMode = 'ExactOut'), /ExactIn/],
    ['other output mint', (b) => void (b.outputMint = NATIVE_SOL_MINT.toBase58()), /output mint/],
    ['swap not by Jupiter', (b) => void (b.swapInstruction.programId = PROGRAM_ID.toBase58()), /unexpected program|not Jupiter/],
    ['unexpected program in setup', (b) => void (b.setupInstructions[0]!.programId = 'MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr'), /unexpected program/],
    ['output not paid into the vault', (b) => void (b.swapInstruction.accounts = b.swapInstruction.accounts.map((a) => (a.pubkey === b._recorded.vaultWallet || a.isWritable ? { ...a, isWritable: false } : a))), /does not pay the output into the vault/],
    ['vault asked to sign', (b) => void b.setupInstructions[0]!.accounts.push({ pubkey: b._recorded.vaultWallet, isSigner: true, isWritable: true }), /asks the vault to sign/],
    ['tip instruction', (b) => void (b.tipInstruction = clone(b.swapInstruction)), /tip/],
  ];
  it.each(tamper)('refuses Jupiter output: %s', (_name, mutate, msg) => {
    const b = clone(SOL_USDC);
    mutate(b);
    expect(() => compose(b, SOL, USDC_ASSET, {}, BigInt(SOL_USDC.inAmount))).toThrow(msg);
  });

  it('refuses a payload that pays anyone but the wallet', () => {
    const build = parseJupiterBuild(SOL_USDC);
    const other = new PublicKey(SOL_USDC._recorded.vaultState);
    expect(() =>
      composeSwapTransaction({
        taker: TAKER,
        vault: vaultOf(SOL_USDC),
        leafIndex: 0,
        payload: encodeActionsTs([{ kind: 'transferSol', to: other, lamports: BigInt(build.inAmount) }]),
        output: USDC_ASSET,
        build,
        lookupTables: lookupTablesFromJupiter(build),
      }),
    ).toThrow(SwapRouteError);
  });
});

// ---- quotes: the maxAccounts ladder ------------------------------------------------------------

describe('quoteVaultSwap', () => {
  it('lowers maxAccounts until the route fits, recording every attempt', async () => {
    const { client, seen } = fakeJupiter((url) => ({ body: Number(url.searchParams.get('maxAccounts')) <= 24 ? USDC_SOL : USDC_SOL_LONG }));
    const q = await quoteVaultSwap({ jupiter: client, vault: vaultOf(USDC_SOL), taker: TAKER, input: USDC_ASSET, output: SOL, amount: 10_000_000n, slippageBps: 50 });
    expect(q.maxAccounts).toBe(24);
    expect(q.fits).toBe(true);
    expect(q.attempts.map((a) => a.maxAccounts)).toEqual([64, 48, 40, 32, 24]);
    expect(q.attempts.slice(0, 4).every((a) => a.size > 1232)).toBe(true);
    expect(seen.map((s) => s.url.searchParams.get('nativeDestinationAccount'))).toEqual(Array(5).fill(USDC_SOL._recorded.vaultWallet));
  });

  it('throws SwapTooLargeError when no rung fits', async () => {
    const { client } = fakeJupiter(() => ({ body: USDC_SOL_LONG }));
    const err = await quoteVaultSwap({ jupiter: client, vault: vaultOf(USDC_SOL), taker: TAKER, input: USDC_ASSET, output: SOL, amount: 10_000_000n, slippageBps: 50, maxAccountsLadder: [64, 32] }).catch((e: unknown) => e);
    expect(err).toBeInstanceOf(SwapTooLargeError);
    expect((err as SwapTooLargeError).attempts.length).toBe(2);
    expect((err as Error).message).toMatch(/smallest was \\d+ bytes/);
  });

  it('checks lookup tables on-chain when a connection is given', async () => {
    const chain = await mockChain();
    const { client } = fakeJupiter(() => ({ body: SOL_USDC }));
    const q = await quoteVaultSwap({ jupiter: client, conn: chain.conn, vault: vaultOf(SOL_USDC), taker: TAKER, input: SOL, output: USDC_ASSET, amount: 100_000_000n, slippageBps: 50 });
    expect(q.fits).toBe(true);
    const lying = clone(SOL_USDC);
    const [k, addrs] = Object.entries(lying.addressesByLookupTableAddress!)[0]!;
    lying.addressesByLookupTableAddress![k] = [TAKER.toBase58(), ...addrs.slice(1)];
    const { client: bad } = fakeJupiter(() => ({ body: lying }));
    await expect(quoteVaultSwap({ jupiter: bad, conn: chain.conn, vault: vaultOf(SOL_USDC), taker: TAKER, input: SOL, output: USDC_ASSET, amount: 100_000_000n, slippageBps: 50 })).rejects.toThrow(/differs from Jupiter/);
  });
});

describe('classifySwapFailure', () => {
  const at = { executeIndex: 3, swapIndex: 7 };
  it.each([
    [{ InstructionError: [7, { Custom: 6001 }] }, [], 'slippage'],
    [{ InstructionError: [3, { Custom: 6008 }] }, [], 'leafUsed'],
    [{ InstructionError: [3, { Custom: 6015 }] }, [], 'vault'],
    [null, ['Program log: AnchorError occurred. Error Code: SlippageToleranceExceeded.'], 'slippage'],
    ['BlockhashNotFound', [], 'blockhashExpired'],
    [null, ['Program x consumed 200000 of 200000 compute units', 'Program x failed: exceeded CUs meter at BPF instruction'], 'computeExceeded'],
    ['InsufficientFundsForFee', [], 'insufficientFunds'],
    [{ InstructionError: [1, { Custom: 1 }] }, [], 'unknown'],
  ] as const)('%j → %s', (err, logs, reason) => {
    expect(classifySwapFailure(err, [...logs], at)).toBe(reason);
  });
});

// ---- sign → upload → build ---------------------------------------------------------------------

describe('prepareSwap → swapSignatureUploads → buildSwapTransaction', () => {
  it('SOL in: signs "(your wallet)", uploads without the execute, then composes a fresh route around the buffer', async () => {
    const chain = await mockChain({ nextLeaf: 7 });
    expect(chain.wallet.toBase58()).toBe(SOL_USDC._recorded.vaultWallet); // fixtures were recorded for this vault
    const vault = (await fetchVault(chain.conn, chain.state))!;
    const ledger = new MemoryLedger();
    const p = await prepareSwap({ conn: chain.conn, cluster: 'localnet', vault, mnemonic: MNEMONIC, feePayer: TAKER, ledger, input: SOL, output: USDC_ASSET, amount: 100_000_000n });
    expect(p.summary).toBe(\`This signature allows: send 0.1 SOL to \${TAKER.toBase58().slice(0, 4)}…\${TAKER.toBase58().slice(-4)} (your wallet). Nothing else.\`);
    expect(p.leafIndex).toBe(7);
    expect(ledger.get(chain.state, 0, 7)?.signature).toBeDefined();
    // upload-only: init + chunks, never the execute
    expect(p.transactions.length).toBe(3);
    for (const tx of p.transactions) {
      expect(tx.instructions.some((ix) => ix.programId.equals(PROGRAM_ID) && bytesEqual(ix.data.subarray(0, 8), IX_DISCRIMINATORS.execute))).toBe(false);
    }
    expect((await swapSignatureState(chain.conn, p, TAKER)).state).toBe('needsUpload');

    // half-written buffer → resume only the missing bytes
    chain.writeBuffer(p.signature, 7, 1200);
    const resume = await swapSignatureUploads({ conn: chain.conn, prepared: p, feePayer: TAKER });
    expect(resume.length).toBeGreaterThan(0);
    expect(resume[0]!.instructions.some((ix) => bytesEqual(ix.data.subarray(0, 8), IX_DISCRIMINATORS.initSigBuffer))).toBe(false);

    chain.writeBuffer(p.signature, 7);
    expect((await swapSignatureState(chain.conn, p, TAKER)).state).toBe('ready');
    expect(await swapSignatureUploads({ conn: chain.conn, prepared: p, feePayer: TAKER })).toEqual([]);

    // While it can still land, nothing else is signed (main's pending guard)…
    await expect(
      prepareSwap({ conn: chain.conn, cluster: 'localnet', vault, mnemonic: MNEMONIC, feePayer: TAKER, ledger, input: SOL, output: USDC_ASSET, amount: 5n }),
    ).rejects.toBeInstanceOf(PendingSignatureError);
    // …but the swap itself can be resumed from this device's ledger, without signing again.
    const resumable = await findPendingSwap({ conn: chain.conn, cluster: 'localnet', vault, ledger, feePayer: TAKER });
    expect(resumable).toMatchObject({ leafIndex: 7, amount: 100_000_000n, input: { kind: 'sol' } });
    expect(toHex(resumable!.message)).toBe(toHex(p.message));
    expect(toHex(resumable!.signature)).toBe(toHex(p.signature));
    expect(await findPendingSwap({ conn: chain.conn, cluster: 'localnet', vault, ledger, feePayer: new PublicKey(SOL_USDC._recorded.vaultState) })).toBeNull();

    const { client } = fakeJupiter(() => ({ body: SOL_USDC }));
    let simulated: VersionedTransaction | null = null;
    const built = await buildSwapTransaction({
      conn: chain.conn,
      jupiter: client,
      prepared: p,
      taker: TAKER,
      output: USDC_ASSET,
      slippageBps: 50,
      simulate: async (tx) => {
        simulated = tx;
        return { err: null, logs: [], unitsConsumed: 210_000 };
      },
    });
    expect(simulated).not.toBeNull();
    expect(built.simulatedUnits).toBe(210_000);
    expect(built.computeUnitLimit).toBe(252_000);
    expect(built.fits).toBe(true);
    expect(built.message.recentBlockhash).toBe('9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin');
    const exec = built.instructions[built.executeIndex]!;
    expect(exec.data.readUInt32LE(8)).toBe(7); // leaf
    expect(toHex(exec.data.subarray(16, exec.data.length - 1))).toBe(toHex(p.message.subarray(83))); // the signed payload, byte for byte

    // slippage in simulation: nothing sent, the leaf stays
    const slip = await buildSwapTransaction({
      conn: chain.conn,
      jupiter: client,
      prepared: p,
      taker: TAKER,
      output: USDC_ASSET,
      slippageBps: 50,
      simulate: async () => ({ err: { InstructionError: [built.swapIndex, { Custom: 6001 }] }, logs: [] }),
    }).catch((e: unknown) => e);
    expect(slip).toBeInstanceOf(SwapSimulationError);
    expect((slip as SwapSimulationError).reason).toBe('slippage');

    // once the leaf is used on-chain, no new swap transaction is built
    chain.setNextLeaf(8);
    await expect(buildSwapTransaction({ conn: chain.conn, jupiter: client, prepared: p, taker: TAKER, output: USDC_ASSET, slippageBps: 50, simulate: false })).rejects.toBeInstanceOf(SwapSignatureUsedError);
    expect((await swapSignatureState(chain.conn, p, TAKER)).state).toBe('consumed');
  });

  it('keeps the reviewed minimum as a floor: tightens slippage when it can, refuses when the price fell below it', async () => {
    const chain = await mockChain({ nextLeaf: 3 });
    const vault = (await fetchVault(chain.conn, chain.state))!;
    const p = await prepareSwap({ conn: chain.conn, cluster: 'localnet', vault, mnemonic: MNEMONIC, feePayer: TAKER, ledger: new MemoryLedger(), input: SOL, output: USDC_ASSET, amount: 100_000_000n });
    chain.writeBuffer(p.signature, 3);
    // Jupiter answers with the requested slippage applied to the recorded route.
    const asked: number[] = [];
    const { client } = fakeJupiter((url) => {
      const bps = Number(url.searchParams.get('slippageBps'));
      asked.push(bps);
      const b = clone(SOL_USDC);
      b.slippageBps = bps;
      b.otherAmountThreshold = ((BigInt(b.outAmount) * BigInt(10_000 - bps)) / 10_000n).toString();
      return { body: b };
    });
    const out = BigInt(SOL_USDC.outAmount);
    const build = (minOutFloor: bigint) =>
      buildSwapTransaction({ conn: chain.conn, jupiter: client, prepared: p, taker: TAKER, output: USDC_ASSET, slippageBps: 100, simulate: false, minOutFloor });

    // 1. The route already guarantees the floor: one request, slippage as asked.
    const a = await build((out * 9_800n) / 10_000n);
    expect(asked).toEqual([100]);
    expect(a.quote.slippageBps).toBe(100);
    // 2. Expected output clears the floor but 1% would dip below it: rebuilt at a tighter slippage.
    asked.length = 0;
    const floor = (out * 9_970n) / 10_000n;
    const b = await build(floor);
    expect(asked.length).toBe(2);
    expect(asked[1]).toBeLessThan(100);
    expect(b.quote.minOutAmount).toBeGreaterThanOrEqual(floor);
    // 3. The price fell below the floor: nothing is built, the fresh quote comes back for review.
    const err = await build(out + 1n).catch((e: unknown) => e);
    expect(err).toBeInstanceOf(SwapPriceMovedError);
    expect((err as SwapPriceMovedError).quote.quote.outAmount).toBe(out);
  });

  it('token in: TransferToken to the wallet’s token account, labelled "(your wallet)"', async () => {
    const chain = await mockChain({ usdcInVault: 25_000_000n });
    const vault = (await fetchVault(chain.conn, chain.state))!;
    const p = await prepareSwap({ conn: chain.conn, cluster: 'localnet', vault, mnemonic: MNEMONIC, feePayer: TAKER, ledger: new MemoryLedger(), input: USDC_ASSET, output: SOL, amount: 10_000_000n });
    expect(p.summary).toMatch(/^This signature allows: send 10 USDC to \\w{4}…\\w{4} \\(your wallet\\)\\. Nothing else\\.$/);
    expect(p.actions?.[0]).toMatchObject({ kind: 'transferToken', amount: 10_000_000n });
  });

  it('refuses tokens the vault could not hold, and transfer-fee inputs', async () => {
    const hook = await mockChain({ usdcMintExtensions: [ext.transferHook(TAKER, TAKER)] });
    const t22 = { kind: 'token' as const, mint: USDC, tokenProgram: TOKEN_2022_PROGRAM_ID };
    await expect(checkSwapAssets(hook.conn, SOL, t22)).rejects.toThrow(/could not hold/);
    const fee = await mockChain({ usdcMintExtensions: [ext.transferFee(100, 1_000_000n)] });
    await expect(checkSwapAssets(fee.conn, t22, SOL)).rejects.toThrow(/transfer fee/);
    await expect(checkSwapAssets(fee.conn, SOL, SOL)).rejects.toThrow(/same asset/);
  });
});
`;export{e as default};