var e=`// Signature transport (MESSAGE_FORMAT §6).
//
// Buffer path (default, works with every wallet): legacy transactions (1,232 bytes) carrying
// init_sig_buffer + write_sig_buffer chunks, then the final instruction with \`sig = None\` that reads
// the buffer. Chunks are packed greedily by measuring the serialized size of each transaction; the
// final transaction also carries the tail of the signature when it fits.
//
// Inline path: the signature travels inside the final instruction of ONE v1 (4,096-byte)
// transaction. @solana/web3.js v1 cannot build v1 transactions, so prepare* (transport 'inline')
// returns the instructions and the caller assembles the v1 transaction (the CLI uses @solana/kit;
// wallets: only if they advertise v1 in supportedTransactionVersions). estimateV1TxSize() checks the
// size before anything is signed.

import { ComputeBudgetProgram, Message, Transaction, VersionedTransaction } from '@solana/web3.js';
import type { Connection, PublicKey, TransactionInstruction } from '@solana/web3.js';
import { COMPUTE_UNITS, LEGACY_TX_LIMIT, SIG_LEN } from './constants';
import { initSigBufferIx, writeSigBufferIx } from './instructions';

export type Transport = 'buffer' | 'inline';

/** Placeholder blockhash used only to measure sizes. */
const MEASURE_BLOCKHASH = '11111111111111111111111111111111';
const MIN_CHUNK = 32;

export class TransactionTooLargeError extends Error {
  constructor(what: string, size: number, limit: number = LEGACY_TX_LIMIT) {
    const shown = Number.isFinite(size) ? \`\${size} > \${limit} bytes\` : \`more than \${limit} bytes\`;
    super(\`\${what} does not fit in a transaction (\${shown}). Use fewer actions per signature (or fewer new destination accounts).\`);
    this.name = 'TransactionTooLargeError';
  }
}

function shortvecLen(n: number): number {
  return n < 0x80 ? 1 : n < 0x4000 ? 2 : 3;
}

/** Serialized size of a legacy transaction with these instructions (signatures included). */
export function measureTx(ixs: TransactionInstruction[], feePayer: PublicKey): number {
  const tx = new Transaction({ feePayer, recentBlockhash: MEASURE_BLOCKHASH });
  tx.add(...ixs);
  const msg = tx.compileMessage();
  const n = msg.header.numRequiredSignatures;
  let body: number;
  try {
    body = msg.serialize().length;
  } catch (e) {
    // web3.js serializes into a PACKET_DATA_SIZE buffer and throws a RangeError when the message alone is larger.
    if (e instanceof RangeError) return Number.POSITIVE_INFINITY;
    throw e;
  }
  return shortvecLen(n) + 64 * n + body;
}

/** SetComputeUnitLimit with an explicit limit (values from COMPUTE_UNITS; capped at the 1.4M maximum). */
export function cuLimitIx(units: number): TransactionInstruction {
  return ComputeBudgetProgram.setComputeUnitLimit({ units: Math.min(COMPUTE_UNITS.max, Math.ceil(units)) });
}

export interface BlockhashInfo {
  blockhash: string;
  lastValidBlockHeight: number;
}

export function makeTx(ixs: TransactionInstruction[], feePayer: PublicKey, bh: BlockhashInfo): Transaction {
  const tx = new Transaction({ feePayer, blockhash: bh.blockhash, lastValidBlockHeight: bh.lastValidBlockHeight });
  tx.add(...ixs);
  return tx;
}

export interface BufferPathParams {
  feePayer: PublicKey;
  state: PublicKey;
  sigBuffer: PublicKey;
  rootEpoch: number;
  leafIndex: number;
  /** The LMS signature (SIG_LEN bytes). Sizes do not depend on its content. */
  signature: Uint8Array;
  /** Instructions of the final transaction, in order: e.g. ATA creates, then execute/rotate/close. */
  finalInstructions: TransactionInstruction[];
  /** Compute-unit limit of the final transaction (COMPUTE_UNITS already cover its signature chunk). */
  finalComputeUnits: number;
  blockhash: BlockhashInfo;
  /** The buffer account already exists (resume): no init_sig_buffer. */
  skipInit?: boolean;
  /** Byte ranges [start, end) still to write. Default: the whole signature. */
  ranges?: Array<[number, number]>;
  limit?: number;
}

interface Segment {
  start: number;
  end: number;
}

/** Largest n in [0, max] with fits(n) true (fits is monotone decreasing); -1 if fits(0) is false. */
function largestFitting(max: number, fits: (n: number) => boolean): number {
  if (!fits(0)) return -1;
  let lo = 0;
  let hi = max;
  while (lo < hi) {
    const mid = Math.ceil((lo + hi) / 2);
    if (fits(mid)) lo = mid;
    else hi = mid - 1;
  }
  return lo;
}

/** Build the transactions of the signature-buffer path. Every transaction is ≤ \`limit\` bytes. */
export function buildBufferPathTxs(p: BufferPathParams): Transaction[] {
  const limit = p.limit ?? LEGACY_TX_LIMIT;
  if (p.signature.length !== SIG_LEN) throw new Error(\`signature must be \${SIG_LEN} bytes\`);
  const segments: Segment[] = (p.ranges ?? [[0, SIG_LEN]])
    .map(([start, end]) => ({ start, end }))
    .filter((s) => s.end > s.start);
  for (const s of segments) if (s.start < 0 || s.end > SIG_LEN) throw new Error('invalid signature range');

  const write = (offset: number, len: number) =>
    writeSigBufferIx({ payer: p.feePayer, sigBuffer: p.sigBuffer, offset, data: p.signature.subarray(offset, offset + len) });
  const init = () =>
    initSigBufferIx({ payer: p.feePayer, state: p.state, sigBuffer: p.sigBuffer, rootEpoch: p.rootEpoch, leafIndex: p.leafIndex });

  // 1. Final transaction: CU + [tail write] + final instructions. Reserve as much tail as fits.
  const finalBase = measureTx([cuLimitIx(1), ...p.finalInstructions], p.feePayer);
  if (finalBase > limit) throw new TransactionTooLargeError('The final instruction', finalBase);

  const last = segments[segments.length - 1];
  let tail: Segment | null = null;
  if (last) {
    const lastLen = last.end - last.start;
    const n = largestFitting(lastLen, (k) => measureTx([cuLimitIx(1), write(last.end - k, k), ...p.finalInstructions], p.feePayer) <= limit);
    const take = n >= lastLen ? lastLen : n >= MIN_CHUNK ? n : 0;
    if (take > 0) {
      tail = { start: last.end - take, end: last.end };
      last.end -= take;
    }
  }
  const pending = segments.filter((s) => s.end > s.start);

  // 2. Greedy write transactions (the first one also creates the buffer).
  const txs: Transaction[] = [];
  let needInit = !p.skipInit;
  while (pending.length > 0 || needInit) {
    const ixs: TransactionInstruction[] = [];
    if (needInit) {
      ixs.push(init());
      needInit = false;
    }
    while (pending.length > 0) {
      const seg = pending[0] as Segment;
      const segLen = seg.end - seg.start;
      const n = largestFitting(segLen, (k) => measureTx([cuLimitIx(1), ...ixs, write(seg.start, k)], p.feePayer) <= limit);
      if (n < Math.min(MIN_CHUNK, segLen)) break; // transaction full
      ixs.push(write(seg.start, n));
      seg.start += n;
      if (seg.start >= seg.end) pending.shift();
      else break; // the segment continues in the next transaction
    }
    if (ixs.length === 0) throw new Error('signature-buffer packing made no progress');
    txs.push(makeTx([cuLimitIx(COMPUTE_UNITS.sigBufferTx), ...ixs], p.feePayer, p.blockhash));
  }

  // 3. Final transaction.
  const finalIxs: TransactionInstruction[] = [];
  if (tail) finalIxs.push(write(tail.start, tail.end - tail.start));
  finalIxs.push(...p.finalInstructions);
  txs.push(makeTx([cuLimitIx(p.finalComputeUnits), ...finalIxs], p.feePayer, p.blockhash));

  for (const [i, tx] of txs.entries()) {
    const size = measureTx(tx.instructions, p.feePayer);
    if (size > limit) throw new TransactionTooLargeError(\`Transaction \${i + 1}/\${txs.length}\`, size);
  }
  return txs;
}

/**
 * Serialized size of a v1 transaction (SIMD-0385 layout) carrying \`ixs\`, with the compute-unit and
 * loaded-accounts-data-size config values set: version (1) ‖ header (3) ‖ config mask (4) ‖
 * lifetime (32) ‖ #ix (1) ‖ #addr (1) ‖ addrs (32 each) ‖ config values (4 each) ‖ ix headers (4 each)
 * ‖ ix payloads (account indices + data) ‖ signatures (64 each).
 */
export function estimateV1TxSize(ixs: TransactionInstruction[], feePayer: PublicKey, configValues = 2): number {
  const signer = new Map<string, boolean>([[feePayer.toBase58(), true]]);
  for (const ix of ixs) {
    if (!signer.has(ix.programId.toBase58())) signer.set(ix.programId.toBase58(), false);
    for (const k of ix.keys) signer.set(k.pubkey.toBase58(), (signer.get(k.pubkey.toBase58()) ?? false) || k.isSigner);
  }
  const numSigs = [...signer.values()].filter(Boolean).length;
  let size = 1 + 3 + 4 + 32 + 1 + 1 + 32 * signer.size + 4 * configValues + 64 * numSigs;
  for (const ix of ixs) size += 4 + ix.keys.length + ix.data.length;
  return size;
}

/** Serialized size of a (possibly signed) transaction. */
export function txSize(tx: Transaction): number {
  return measureTx(tx.instructions, tx.feePayer as PublicKey);
}

export class SendPreparedError extends Error {
  readonly index: number;
  readonly signatures: string[];
  readonly logs?: string[];
  constructor(index: number, total: number, signatures: string[], cause: unknown, logs?: string[]) {
    const msg = cause instanceof Error ? cause.message : String(cause);
    super(\`Transaction \${index + 1}/\${total} failed: \${msg}\`);
    this.name = 'SendPreparedError';
    this.index = index;
    this.signatures = signatures;
    if (logs) this.logs = logs;
    (this as { cause?: unknown }).cause = cause;
  }
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export interface SendOptions {
  /** Called after each transaction is confirmed. */
  onProgress?: (i: number, n: number, sig: string) => void;
  /** Resend interval while waiting for confirmation (ms). Default 2000. */
  resendMs?: number;
  /** Give up after this long when a transaction has no lastValidBlockHeight (ms). Default 90000. */
  timeoutMs?: number;
}

async function failedTxLogs(conn: Connection, sig: string): Promise<string[] | undefined> {
  try {
    const tx = await conn.getTransaction(sig, { commitment: 'confirmed', maxSupportedTransactionVersion: 0 });
    return tx?.meta?.logMessages ?? undefined;
  } catch {
    return undefined;
  }
}

/**
 * Send one signed transaction and wait for 'confirmed' by polling signature status (no websocket),
 * resending the identical bytes periodically until it lands or its blockhash expires.
 */
export async function sendAndConfirmRaw(
  conn: Connection,
  raw: Uint8Array,
  lastValidBlockHeight: number | undefined,
  opts: SendOptions = {},
  recentBlockhash?: string,
): Promise<string> {
  const resendMs = opts.resendMs ?? 2000;
  const deadline = Date.now() + (opts.timeoutMs ?? 90_000);
  const sig = await conn.sendRawTransaction(raw, { preflightCommitment: 'confirmed', maxRetries: 0 });
  let lastSend = Date.now();
  for (;;) {
    const st = (await conn.getSignatureStatuses([sig])).value[0];
    if (st?.err) {
      const err = new Error(\`transaction \${sig} failed: \${JSON.stringify(st.err)}\`);
      const logs = await failedTxLogs(conn, sig);
      if (logs) (err as { logs?: string[] }).logs = logs;
      throw err;
    }
    if (st && (st.confirmationStatus === 'confirmed' || st.confirmationStatus === 'finalized')) return sig;
    // Wallets often return transactions without lastValidBlockHeight: fall back to isBlockhashValid.
    const expired =
      lastValidBlockHeight !== undefined
        ? (await conn.getBlockHeight('confirmed')) > lastValidBlockHeight
        : recentBlockhash
          ? !(await conn.isBlockhashValid(recentBlockhash, { commitment: 'confirmed' })).value
          : Date.now() > deadline;
    if (expired) {
      const last = (await conn.getSignatureStatuses([sig], { searchTransactionHistory: true })).value[0];
      if (last && !last.err && last.confirmationStatus !== 'processed') return sig;
      throw new Error(\`transaction \${sig} expired before it was confirmed (blockhash too old): rebuild and resend\`);
    }
    if (Date.now() - lastSend >= resendMs) {
      lastSend = Date.now();
      conn.sendRawTransaction(raw, { skipPreflight: true, maxRetries: 0 }).catch(() => undefined);
    }
    await sleep(400);
  }
}

/**
 * Send signed transactions in order, confirming each ('confirmed') before the next. Returns the
 * signatures. On failure throws SendPreparedError (the leaf stays spent: rebuild with
 * rebuildPrepared() to rebroadcast the identical signature, or prepare again on a fresh leaf).
 */
export async function sendPrepared(
  conn: Connection,
  signed: Transaction[],
  onProgress?: ((i: number, n: number, sig: string) => void) | SendOptions,
): Promise<string[]> {
  const opts: SendOptions = typeof onProgress === 'function' ? { onProgress } : (onProgress ?? {});
  const sigs: string[] = [];
  for (const [i, tx] of signed.entries()) {
    let sig: string;
    try {
      sig = await sendAndConfirmRaw(conn, tx.serialize(), tx.lastValidBlockHeight, opts, tx.recentBlockhash);
    } catch (e) {
      const logs = (e as { logs?: string[] }).logs;
      const failedSig = /transaction (\\w{80,90})/.exec((e as Error).message ?? '')?.[1];
      throw new SendPreparedError(i, signed.length, failedSig ? [...sigs, failedSig] : sigs, e, logs);
    }
    sigs.push(sig);
    opts.onProgress?.(i, signed.length, sig);
  }
  return sigs;
}

// ---------------------------------------------------------------------------------------------
// Wallet path: one approval per transaction
// ---------------------------------------------------------------------------------------------
//
// Wallets that preview transactions (Phantom, Solflare, Backpack) simulate each one against the
// chain as it is when the request arrives. The buffer path's transactions depend on each other
// (a write needs the buffer that the first transaction creates; the final instruction needs the
// whole signature), so a batch of them can only simulate cleanly one at a time. Phantom shows "This
// dApp could be malicious" for a transaction it cannot simulate, and asks dApps to split
// dependent or near-limit transactions into separate requests and to simulate them first.

/** A transaction would fail on-chain, so the wallet was not asked to approve it. */
export class SimulationFailedError extends Error {
  readonly index: number;
  readonly logs: string[];
  constructor(index: number, total: number, err: unknown, logs: string[]) {
    const detail = typeof err === 'string' ? err : JSON.stringify(err);
    super(\`Transaction \${index + 1}/\${total} would fail on-chain (\${detail}), so your wallet was not asked to approve it.\`);
    this.name = 'SimulationFailedError';
    this.index = index;
    this.logs = logs;
  }
}

/**
 * One wallet request: the wallet approves one transaction and broadcasts it (Wallet Standard
 * \`solana:signAndSendTransaction\`), resolving to its base58 signature. \`minContextSlot\` is the slot
 * at which the previous transaction confirmed; pass it on so the wallet's RPC sees that state.
 */
export type WalletSend = (tx: Transaction, ctx: { index: number; total: number; minContextSlot?: number }) => Promise<string>;

export type OneByOneStatus = 'simulating' | 'approving' | 'confirming' | 'confirmed';

export interface OneByOneOptions {
  onStatus?: (index: number, total: number, status: OneByOneStatus, signature?: string) => void;
  /** Status poll interval (ms). Default 400. */
  pollMs?: number;
}

const MIN_SLOT_RETRIES = 15;

async function simulateOrThrow(conn: Connection, tx: Transaction, index: number, total: number, minContextSlot: number | undefined, pollMs: number): Promise<void> {
  const vtx = new VersionedTransaction(tx.compileMessage());
  for (let attempt = 0; ; attempt++) {
    let res;
    try {
      res = await conn.simulateTransaction(vtx, { sigVerify: false, replaceRecentBlockhash: true, commitment: 'confirmed', minContextSlot });
    } catch (e) {
      // The RPC node has not reached the previous transaction's slot yet.
      if (attempt < MIN_SLOT_RETRIES && /minimum context slot/i.test(e instanceof Error ? e.message : String(e))) {
        await sleep(pollMs);
        continue;
      }
      throw e;
    }
    if (!res.value.err) return;
    throw new SimulationFailedError(index, total, res.value.err, res.value.logs ?? []);
  }
}

/** Poll a broadcast signature until 'confirmed' (returns its slot) or its blockhash expires. */
async function confirmSignature(conn: Connection, sig: string, lastValidBlockHeight: number, pollMs: number): Promise<number> {
  for (;;) {
    const st = (await conn.getSignatureStatuses([sig])).value[0];
    if (st?.err) {
      const err = new Error(\`transaction \${sig} failed: \${JSON.stringify(st.err)}\`);
      const logs = await failedTxLogs(conn, sig);
      if (logs) (err as { logs?: string[] }).logs = logs;
      throw err;
    }
    if (st && (st.confirmationStatus === 'confirmed' || st.confirmationStatus === 'finalized')) return st.slot;
    if ((await conn.getBlockHeight('confirmed')) > lastValidBlockHeight) {
      const last = (await conn.getSignatureStatuses([sig], { searchTransactionHistory: true })).value[0];
      if (last && !last.err && last.confirmationStatus !== 'processed') return last.slot;
      throw new Error(\`transaction \${sig} expired before it was confirmed: try again\`);
    }
    await sleep(pollMs);
  }
}

/**
 * Send transactions one wallet request at a time, in order. Before each request the transaction
 * gets a fresh blockhash and is simulated against the chain including every earlier transaction
 * (signature checks off), so the wallet only ever previews a transaction that will succeed, and
 * the user is never asked to approve one that would fail. Each confirms before the next is built.
 *
 * Throws SimulationFailedError (nothing sent for that transaction) or SendPreparedError (index =
 * the transaction that failed or was rejected; signatures = those that landed). The buffer path
 * resumes from what landed with rebuildPrepared(), on the same leaf.
 */
export async function sendOneByOne(conn: Connection, txs: Transaction[], send: WalletSend, opts: OneByOneOptions = {}): Promise<string[]> {
  const pollMs = opts.pollMs ?? 400;
  const n = txs.length;
  const sigs: string[] = [];
  let minContextSlot: number | undefined;
  for (const [i, built] of txs.entries()) {
    if (!built.feePayer) throw new Error(\`transaction \${i + 1}/\${n} has no fee payer\`);
    let tx: Transaction;
    try {
      opts.onStatus?.(i, n, 'simulating');
      const bh = await conn.getLatestBlockhash({ commitment: 'confirmed', minContextSlot });
      tx = makeTx(built.instructions, built.feePayer, bh);
      await simulateOrThrow(conn, tx, i, n, minContextSlot, pollMs);
    } catch (e) {
      if (e instanceof SimulationFailedError) throw e;
      throw new SendPreparedError(i, n, sigs, e);
    }
    let sig: string;
    try {
      opts.onStatus?.(i, n, 'approving');
      sig = await send(tx, { index: i, total: n, minContextSlot });
    } catch (e) {
      throw new SendPreparedError(i, n, sigs, e);
    }
    try {
      opts.onStatus?.(i, n, 'confirming', sig);
      minContextSlot = await confirmSignature(conn, sig, tx.lastValidBlockHeight as number, pollMs);
    } catch (e) {
      throw new SendPreparedError(i, n, [...sigs, sig], e, (e as { logs?: string[] }).logs);
    }
    sigs.push(sig);
    opts.onStatus?.(i, n, 'confirmed', sig);
  }
  return sigs;
}

/** Bytes of \`want\` that differ from \`have\` as [start, end) ranges (to resume a partially written buffer). */
/** The wallet changed a transaction it was asked to sign: nothing was sent. */
export class WalletModifiedTransactionError extends Error {
  readonly index: number;
  constructor(index: number, detail: string) {
    super(\`The wallet changed transaction \${index + 1} before signing it (\${detail}). Nothing was sent.\`);
    this.name = 'WalletModifiedTransactionError';
    this.index = index;
  }
}

const COMPUTE_BUDGET = ComputeBudgetProgram.programId;
const SET_COMPUTE_UNIT_PRICE = 3;

function sameIx(a: TransactionInstruction, b: TransactionInstruction): boolean {
  return (
    a.programId.equals(b.programId) &&
    a.data.equals(b.data) &&
    a.keys.length === b.keys.length &&
    a.keys.every((k, i) => k.pubkey.equals(b.keys[i]!.pubkey) && k.isSigner === b.keys[i]!.isSigner && k.isWritable === b.keys[i]!.isWritable)
  );
}

/**
 * Check that what a wallet returned from signAllTransactions is what was built: same count, fee
 * payer and instructions, in order, with a valid fee-payer signature. The only change a wallet may
 * make is adding a SetComputeUnitPrice (priority fee). Anything else, such as a lowered compute-unit
 * limit that makes the final transaction fail after the signature chunks are public, is refused
 * before sending.
 *
 * Returns the transactions to send: each is parsed from the exact wire bytes that were checked, so
 * what goes out is what was verified. (A web3.js Transaction serialises a cached message when one is
 * present, so a returned object's \`instructions\` list can disagree with the bytes it would send.)
 */
export function assertWalletSignedAsBuilt(built: Transaction[], signed: Transaction[]): Transaction[] {
  if (signed.length !== built.length) throw new WalletModifiedTransactionError(0, \`expected \${built.length} transactions, got \${signed.length}\`);
  return built.map((b, i) => {
    let have: Transaction;
    try {
      // Serialised once, with the wallet's signatures verified against these very bytes.
      have = Transaction.from(signed[i]!.serialize());
    } catch {
      throw new WalletModifiedTransactionError(i, 'signature');
    }
    const want = Transaction.populate(Message.from(b.serializeMessage()));
    if (!have.feePayer || !want.feePayer || !have.feePayer.equals(want.feePayer)) throw new WalletModifiedTransactionError(i, 'fee payer');
    const kept = have.instructions.filter((ix) => !(ix.programId.equals(COMPUTE_BUDGET) && ix.data[0] === SET_COMPUTE_UNIT_PRICE));
    if (kept.length !== want.instructions.length || !kept.every((ix, j) => sameIx(ix, want.instructions[j]!))) {
      throw new WalletModifiedTransactionError(i, 'instructions');
    }
    return have;
  });
}

export function diffRanges(have: Uint8Array, want: Uint8Array): Array<[number, number]> {
  const out: Array<[number, number]> = [];
  let start = -1;
  for (let i = 0; i < want.length; i++) {
    const differs = have[i] !== want[i];
    if (differs && start < 0) start = i;
    if (!differs && start >= 0) {
      out.push([start, i]);
      start = -1;
    }
  }
  if (start >= 0) out.push([start, want.length]);
  // Merge ranges separated by small equal gaps (fewer instructions beats fewer bytes).
  const merged: Array<[number, number]> = [];
  for (const r of out) {
    const prev = merged[merged.length - 1];
    if (prev && r[0] - prev[1] < 64) prev[1] = r[1];
    else merged.push([r[0], r[1]]);
  }
  return merged;
}
`;export{e as default};