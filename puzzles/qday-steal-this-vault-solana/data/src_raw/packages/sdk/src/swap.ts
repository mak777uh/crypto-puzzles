// Swap from a vault through Jupiter, in ONE atomic v0 transaction (no program changes).
//
// The hash key signs one ordinary action: "send <amount> to <your wallet>" (TransferSol or
// TransferToken to the connected wallet, the Jupiter "taker"). The signature is uploaded to a
// signature buffer first (legacy transactions, every wallet). Then ONE v0 transaction (address
// lookup tables, ≤ 1,232 bytes, signed by the wallet) runs, in order:
//
//   1. ComputeBudget: unit limit (simulated, ×1.2) and unit price (Jupiter's, clamped)
//   2. create the wallet's input token account          (token input; idempotent)
//   3. create the vault's output token account           (token output; idempotent, owner = vault PDA)
//   4. execute (sig = None, reads the buffer)            the vault sends the input amount to the wallet
//   5. Jupiter setup / swap / cleanup / other           the wallet swaps exactly that amount and the
//                                                        output is paid straight into the vault
//                                                        (destinationTokenAccount / nativeDestinationAccount)
//
// Atomicity is the safety property. If the swap fails (slippage, expired blockhash, out of
// compute) nothing happens: the leaf is not consumed and the uploaded signature stays valid, so
// the client re-quotes and retries WITHOUT signing again. What the signature allows on its own is
// exactly its sentence: the amount moves to the wallet and nowhere else. For that one transaction
// the swapped amount passes through the wallet, an Ed25519 key.
//
// Jupiter API: GET https://api.jup.ag/swap/v2/build (developers.jup.ag/docs/swap/build, checked
// 2026-10-08). The x-api-key header is sent when a key is configured; the endpoint also answered
// without one when this was written.

import { Buffer } from 'buffer';
import {
  AddressLookupTableAccount,
  ComputeBudgetProgram,
  PublicKey,
  SystemProgram,
  TransactionInstruction,
  TransactionMessage,
  VersionedTransaction,
} from '@solana/web3.js';
import type { Connection, MessageV0, Transaction } from '@solana/web3.js';
import { createAssociatedTokenAccountIdempotentInstruction, NATIVE_MINT } from '@solana/spl-token';
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  COMPUTE_UNITS,
  IX_TAG,
  LEGACY_TX_LIMIT,
  SIG_LEN,
  SPL_TOKEN_PROGRAM_ID,
  TOKEN_2022_PROGRAM_ID,
} from './constants';
import { ataOf, findSigBufferPda } from './addresses';
import { decodeActionsTs, encodeActionsTs, parseMessage } from './actions';
import type { VaultAction } from './actions';
import { executeIx } from './instructions';
import { executeComputeUnits, prepareExecute } from './prepare';
import type { PrepareExecuteParams, PreparedSignature } from './prepare';
import { decodeSigBuffer, fetchVault } from './state';
import type { VaultInfo } from './state';
import { buildBufferPathTxs, diffRanges } from './transport';
import type { BlockhashInfo } from './transport';
import { fetchMintClassifications } from './assets';
import type { MintClassification } from './assets';
import { findPendingSignatures } from './pending';
import type { LeafLedger } from './ledger';
import type { ClusterName } from './constants';
import { base64 } from '@scure/base';

// ---- constants -------------------------------------------------------------------------------

export const JUPITER_API_BASE = 'https://api.jup.ag';
/** Jupiter Aggregator v6: the only program allowed to carry the swap instruction. */
export const JUPITER_PROGRAM_ID = new PublicKey('JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4');
/** Wrapped SOL mint; Jupiter's name for native SOL (wrapAndUnwrapSol = true). */
export const NATIVE_SOL_MINT = NATIVE_MINT;
/** maxAccounts values tried in order until the transaction fits (Jupiter accepts 1..64). */
export const SWAP_MAX_ACCOUNTS_LADDER: readonly number[] = [64, 48, 40, 32, 24];
/** Conservative account-lock budget for one transaction. */
export const SWAP_MAX_TX_ACCOUNTS = 64;
/** Default ceiling on the priority fee of the swap transaction (Jupiter's CU price is clamped to it). */
export const SWAP_MAX_PRIORITY_FEE_LAMPORTS = 1_000_000n; // 0.001 SOL
const BASE_FEE_LAMPORTS = 5_000n;
const MEASURE_BLOCKHASH = '11111111111111111111111111111111';
const COMPUTE_BUDGET_ID = ComputeBudgetProgram.programId;
/** Programs Jupiter's non-swap instructions may use. Anything else is refused (fail closed). */
const ALLOWED_JUPITER_PROGRAMS = new Set(
  [SystemProgram.programId, SPL_TOKEN_PROGRAM_ID, TOKEN_2022_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID, JUPITER_PROGRAM_ID, COMPUTE_BUDGET_ID].map((k) =>
    k.toBase58(),
  ),
);

// ---- Jupiter API types -----------------------------------------------------------------------

export interface JupiterAccountMeta {
  pubkey: string;
  isSigner: boolean;
  isWritable: boolean;
}

export interface JupiterInstruction {
  programId: string;
  accounts: JupiterAccountMeta[];
  /** base64 */
  data: string;
}

export interface JupiterRouteStep {
  percent: number;
  bps?: number;
  swapInfo: { ammKey: string; label: string; inputMint: string; outputMint: string; inAmount: string; outAmount: string };
}

/** Response of GET /swap/v2/build (transactionVersion "0"). */
export interface JupiterBuildResponse {
  inputMint: string;
  outputMint: string;
  inAmount: string;
  outAmount: string;
  /** Minimum output after slippage. */
  otherAmountThreshold: string;
  swapMode: string;
  slippageBps: number;
  /** Decimal ratio, e.g. "0.001" = 0.1 %. */
  priceImpactPct?: string;
  routePlan: JupiterRouteStep[];
  /** Compute-unit PRICE only (no limit). */
  computeBudgetInstructions: JupiterInstruction[];
  setupInstructions: JupiterInstruction[];
  swapInstruction: JupiterInstruction;
  cleanupInstruction: JupiterInstruction | null;
  otherInstructions: JupiterInstruction[];
  tipInstruction?: JupiterInstruction | null;
  addressesByLookupTableAddress: Record<string, string[]> | null;
  blockhashWithMetadata?: { blockhash: number[]; lastValidBlockHeight: number };
  transactionVersion?: number | string;
}

export interface JupiterBuildParams {
  inputMint: PublicKey | string;
  outputMint: PublicKey | string;
  /** Raw input amount (smallest unit). ExactIn. */
  amount: bigint;
  taker: PublicKey | string;
  payer?: PublicKey | string;
  slippageBps: number;
  maxAccounts?: number;
  wrapAndUnwrapSol?: boolean;
  destinationTokenAccount?: PublicKey | string;
  nativeDestinationAccount?: PublicKey | string;
  dexes?: string[];
  excludeDexes?: string[];
}

export type JupiterErrorKind = 'noRoute' | 'badRequest' | 'unauthorized' | 'rateLimited' | 'server' | 'timeout' | 'network' | 'badResponse';

export class JupiterApiError extends Error {
  readonly kind: JupiterErrorKind;
  readonly status: number | null;
  constructor(kind: JupiterErrorKind, message: string, status: number | null = null) {
    super(message);
    this.name = 'JupiterApiError';
    this.kind = kind;
    this.status = status;
  }
}

export interface JupiterClientOptions {
  /** Default https://api.jup.ag */
  baseUrl?: string;
  /** Sent as x-api-key when set (portal: developers.jup.ag/portal). */
  apiKey?: string | null;
  /** Per-request timeout. Default 10 s. */
  timeoutMs?: number;
  /** Retries after HTTP 429 / 5xx, with backoff (Retry-After when given). Default 2. */
  retries?: number;
  fetch?: typeof fetch;
}

const sleep = (ms: number, signal?: AbortSignal) =>
  new Promise<void>((resolve, reject) => {
    const t = setTimeout(resolve, ms);
    signal?.addEventListener(
      'abort',
      () => {
        clearTimeout(t);
        reject(signal.reason ?? new Error('aborted'));
      },
      { once: true },
    );
  });

const str = (v: PublicKey | string): string => (typeof v === 'string' ? v : v.toBase58());

/** Small typed client for Jupiter's /swap/v2/build. Errors are JupiterApiError with a `kind`. */
export class JupiterClient {
  readonly baseUrl: string;
  readonly hasApiKey: boolean;
  private readonly apiKey: string | null;
  private readonly timeoutMs: number;
  private readonly retries: number;
  private readonly fetchImpl: typeof fetch;

  constructor(o: JupiterClientOptions = {}) {
    this.baseUrl = (o.baseUrl ?? JUPITER_API_BASE).replace(/\/+$/, '');
    this.apiKey = o.apiKey?.trim() || null;
    this.hasApiKey = this.apiKey !== null;
    this.timeoutMs = o.timeoutMs ?? 10_000;
    this.retries = Math.max(0, o.retries ?? 2);
    const f = o.fetch ?? globalThis.fetch;
    if (!f) throw new Error('JupiterClient needs fetch (Node 18+ or a browser)');
    this.fetchImpl = f.bind(globalThis);
  }

  buildUrl(p: JupiterBuildParams): string {
    if (p.amount <= 0n) throw new Error('amount must be > 0');
    if (!Number.isInteger(p.slippageBps) || p.slippageBps < 0 || p.slippageBps > 10_000) throw new Error('slippageBps must be an integer in 0..10000');
    if (p.destinationTokenAccount && p.nativeDestinationAccount) throw new Error('destinationTokenAccount and nativeDestinationAccount are mutually exclusive');
    const q = new URLSearchParams({
      inputMint: str(p.inputMint),
      outputMint: str(p.outputMint),
      amount: p.amount.toString(),
      taker: str(p.taker),
      slippageBps: String(p.slippageBps),
      transactionVersion: '0',
    });
    if (p.payer) q.set('payer', str(p.payer));
    if (p.maxAccounts !== undefined) {
      if (!Number.isInteger(p.maxAccounts) || p.maxAccounts < 1 || p.maxAccounts > 64) throw new Error('maxAccounts must be an integer in 1..64');
      q.set('maxAccounts', String(p.maxAccounts));
    }
    if (p.wrapAndUnwrapSol !== undefined) q.set('wrapAndUnwrapSol', String(p.wrapAndUnwrapSol));
    if (p.destinationTokenAccount) q.set('destinationTokenAccount', str(p.destinationTokenAccount));
    if (p.nativeDestinationAccount) q.set('nativeDestinationAccount', str(p.nativeDestinationAccount));
    if (p.dexes?.length) q.set('dexes', p.dexes.join(','));
    if (p.excludeDexes?.length) q.set('excludeDexes', p.excludeDexes.join(','));
    return `${this.baseUrl}/swap/v2/build?${q.toString()}`;
  }

  /** GET /swap/v2/build. Throws JupiterApiError. Retries HTTP 429 / 5xx a few times with backoff. */
  async build(p: JupiterBuildParams, signal?: AbortSignal): Promise<JupiterBuildResponse> {
    const url = this.buildUrl(p);
    for (let attempt = 0; ; attempt++) {
      try {
        return await this.request(url, signal);
      } catch (e) {
        const retryable = e instanceof JupiterApiError && (e.kind === 'rateLimited' || e.kind === 'server');
        if (!retryable || attempt >= this.retries || signal?.aborted) throw e;
        await sleep((e as JupiterApiError & { retryAfterMs?: number }).retryAfterMs ?? 600 * 2 ** attempt, signal);
      }
    }
  }

  private async request(url: string, signal?: AbortSignal): Promise<JupiterBuildResponse> {
    const ctrl = new AbortController();
    let timedOut = false;
    const timer = setTimeout(() => {
      timedOut = true;
      ctrl.abort();
    }, this.timeoutMs);
    const onAbort = () => ctrl.abort();
    signal?.addEventListener('abort', onAbort, { once: true });
    let res: Response;
    try {
      const headers: Record<string, string> = { accept: 'application/json' };
      if (this.apiKey) headers['x-api-key'] = this.apiKey;
      res = await this.fetchImpl(url, { headers, signal: ctrl.signal });
    } catch (e) {
      if (timedOut) throw new JupiterApiError('timeout', `Jupiter did not answer within ${Math.round(this.timeoutMs / 1000)} s`);
      if (signal?.aborted) throw e;
      throw new JupiterApiError('network', `Could not reach Jupiter: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      clearTimeout(timer);
      signal?.removeEventListener('abort', onAbort);
    }
    let body: unknown = null;
    const text = await res.text().catch(() => '');
    try {
      body = text ? JSON.parse(text) : null;
    } catch {
      body = null;
    }
    if (!res.ok) {
      const msg = typeof (body as { error?: unknown } | null)?.error === 'string' ? (body as { error: string }).error : text.slice(0, 200) || res.statusText;
      if (res.status === 400 && /no route/i.test(msg)) throw new JupiterApiError('noRoute', 'Jupiter found no route for this pair and amount', 400);
      if (res.status === 401 || res.status === 403) {
        throw new JupiterApiError('unauthorized', `Jupiter refused the request (HTTP ${res.status})${this.hasApiKey ? '' : ': it may need an API key'}`, res.status);
      }
      if (res.status === 429) {
        const err = new JupiterApiError('rateLimited', 'Jupiter is rate-limiting requests; try again in a few seconds', 429);
        const after = Number(res.headers.get('retry-after'));
        if (Number.isFinite(after) && after > 0) Object.assign(err, { retryAfterMs: Math.min(10_000, after * 1000) });
        throw err;
      }
      if (res.status >= 500) throw new JupiterApiError('server', `Jupiter had an error (HTTP ${res.status})`, res.status);
      throw new JupiterApiError('badRequest', `Jupiter rejected the request: ${msg}`, res.status);
    }
    return parseJupiterBuild(body);
  }
}

function isMeta(x: unknown): x is JupiterAccountMeta {
  const m = x as JupiterAccountMeta;
  return !!m && typeof m.pubkey === 'string' && typeof m.isSigner === 'boolean' && typeof m.isWritable === 'boolean';
}
function isIx(x: unknown): x is JupiterInstruction {
  const i = x as JupiterInstruction;
  return !!i && typeof i.programId === 'string' && typeof i.data === 'string' && Array.isArray(i.accounts) && i.accounts.every(isMeta);
}
const isAmount = (v: unknown): v is string => typeof v === 'string' && /^\d+$/.test(v);

/** Validate the shape of a /swap/v2/build response. Throws JupiterApiError('badResponse'). */
export function parseJupiterBuild(body: unknown): JupiterBuildResponse {
  const bad = (what: string) => new JupiterApiError('badResponse', `Unexpected response from Jupiter (${what})`);
  const b = body as Partial<JupiterBuildResponse> | null;
  if (!b || typeof b !== 'object') throw bad('not an object');
  for (const k of ['inAmount', 'outAmount', 'otherAmountThreshold'] as const) if (!isAmount(b[k])) throw bad(k);
  if (typeof b.inputMint !== 'string' || typeof b.outputMint !== 'string') throw bad('mints');
  if (!isIx(b.swapInstruction)) throw bad('swapInstruction');
  for (const k of ['computeBudgetInstructions', 'setupInstructions', 'otherInstructions'] as const) {
    const v = b[k] ?? [];
    if (!Array.isArray(v) || !v.every(isIx)) throw bad(k);
  }
  if (b.cleanupInstruction != null && !isIx(b.cleanupInstruction)) throw bad('cleanupInstruction');
  if (!Array.isArray(b.routePlan)) throw bad('routePlan');
  const alts = b.addressesByLookupTableAddress ?? {};
  if (typeof alts !== 'object' || Object.values(alts).some((v) => !Array.isArray(v) || v.some((a) => typeof a !== 'string'))) throw bad('lookup tables');
  return {
    ...(b as JupiterBuildResponse),
    computeBudgetInstructions: b.computeBudgetInstructions ?? [],
    setupInstructions: b.setupInstructions ?? [],
    otherInstructions: b.otherInstructions ?? [],
    cleanupInstruction: b.cleanupInstruction ?? null,
    addressesByLookupTableAddress: alts,
    slippageBps: typeof b.slippageBps === 'number' ? b.slippageBps : Number(b.slippageBps ?? 0),
    swapMode: b.swapMode ?? 'ExactIn',
  };
}

export function toTransactionInstruction(ix: JupiterInstruction): TransactionInstruction {
  return new TransactionInstruction({
    programId: new PublicKey(ix.programId),
    keys: ix.accounts.map((a) => ({ pubkey: new PublicKey(a.pubkey), isSigner: a.isSigner, isWritable: a.isWritable })),
    data: Buffer.from(ix.data, 'base64'),
  });
}

// ---- what is swapped ---------------------------------------------------------------------------

/** One side of a swap. SOL is native SOL (the vault's lamports), never wrapped SOL held as a token. */
export type SwapAsset = { kind: 'sol' } | { kind: 'token'; mint: PublicKey; tokenProgram: PublicKey };

export function swapAssetMint(a: SwapAsset): PublicKey {
  return a.kind === 'sol' ? NATIVE_SOL_MINT : a.mint;
}

function assertSwapPair(input: SwapAsset, output: SwapAsset): void {
  if (input.kind === 'token' && input.mint.equals(NATIVE_SOL_MINT)) throw new SwapRouteError('Wrapped SOL held as a token cannot be swapped from the vault; send it out first.');
  if (output.kind === 'token' && output.mint.equals(NATIVE_SOL_MINT)) throw new SwapRouteError('Use { kind: "sol" } for SOL output (it is paid into the vault as native SOL).');
  if (swapAssetMint(input).equals(swapAssetMint(output))) throw new SwapRouteError('Input and output are the same asset.');
}

/** The single vault action a swap signs: the input amount, from the vault to the wallet (taker). */
export function swapInputAction(taker: PublicKey, input: SwapAsset, amount: bigint): VaultAction {
  if (amount <= 0n) throw new Error('Swap amount must be greater than zero');
  if (input.kind === 'sol') return { kind: 'transferSol', to: taker, lamports: amount };
  return {
    kind: 'transferToken',
    mint: input.mint,
    tokenProgram: input.tokenProgram,
    destination: ataOf(taker, input.mint, input.tokenProgram),
    destinationOwner: taker,
    amount,
  };
}

/** Where Jupiter must pay the output: the vault's token account, or the vault wallet for SOL. */
export function swapDestination(vaultWallet: PublicKey, output: SwapAsset): PublicKey {
  return output.kind === 'sol' ? vaultWallet : ataOf(vaultWallet, output.mint, output.tokenProgram);
}

/** /swap/v2/build parameters for a vault swap: taker = payer = wallet, output straight into the vault. */
export function vaultSwapBuildParams(p: {
  vaultWallet: PublicKey;
  taker: PublicKey;
  input: SwapAsset;
  output: SwapAsset;
  amount: bigint;
  slippageBps: number;
  maxAccounts?: number;
  /** Jupiter DEX labels (case-sensitive) to route through only / to avoid. */
  dexes?: string[];
  excludeDexes?: string[];
}): JupiterBuildParams {
  assertSwapPair(p.input, p.output);
  const dest = swapDestination(p.vaultWallet, p.output);
  return {
    inputMint: swapAssetMint(p.input),
    outputMint: swapAssetMint(p.output),
    amount: p.amount,
    taker: p.taker,
    payer: p.taker,
    slippageBps: p.slippageBps,
    wrapAndUnwrapSol: true,
    ...(p.maxAccounts !== undefined ? { maxAccounts: p.maxAccounts } : {}),
    ...(p.dexes?.length ? { dexes: p.dexes } : {}),
    ...(p.excludeDexes?.length ? { excludeDexes: p.excludeDexes } : {}),
    ...(p.output.kind === 'sol' ? { nativeDestinationAccount: dest } : { destinationTokenAccount: dest }),
  };
}

// ---- errors ------------------------------------------------------------------------------------

/** Jupiter returned something this client refuses to put in front of the wallet. */
export class SwapRouteError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SwapRouteError';
  }
}

export class SwapTooLargeError extends Error {
  readonly attempts: Array<{ maxAccounts: number; size: number; accounts: number }>;
  constructor(attempts: Array<{ maxAccounts: number; size: number; accounts: number }>) {
    const best = [...attempts].sort((a, b) => a.size - b.size)[0];
    super(
      best
        ? `No route fits in one transaction: the smallest was ${best.size} bytes and ${best.accounts} accounts (limits ${LEGACY_TX_LIMIT} bytes, ${SWAP_MAX_TX_ACCOUNTS} accounts) at maxAccounts ${best.maxAccounts}.`
        : 'No route fits in one transaction.',
    );
    this.name = 'SwapTooLargeError';
    this.attempts = attempts;
  }
}

/**
 * The fresh route can't guarantee the minimum the user reviewed: the price fell below it. Nothing
 * was sent; show `quote` and ask before building again with that quote's minimum as the floor.
 */
export class SwapPriceMovedError extends Error {
  readonly quote: VaultSwapQuote;
  constructor(quote: VaultSwapQuote, floor: bigint) {
    super(`The price moved: the swap would now guarantee ${quote.quote.minOutAmount} instead of ${floor} (raw units).`);
    this.name = 'SwapPriceMovedError';
    this.quote = quote;
  }
}

/** The signed leaf can no longer be used for this swap (it landed, a later leaf landed, or the key rotated). */
export class SwapSignatureUsedError extends Error {
  readonly reason: 'consumed' | 'rotated' | 'closed';
  constructor(reason: 'consumed' | 'rotated' | 'closed', message: string) {
    super(message);
    this.name = 'SwapSignatureUsedError';
    this.reason = reason;
  }
}

export type SwapFailureReason = 'slippage' | 'blockhashExpired' | 'insufficientFunds' | 'computeExceeded' | 'leafUsed' | 'vault' | 'unknown';

export class SwapSimulationError extends Error {
  readonly reason: SwapFailureReason;
  readonly logs: string[];
  constructor(reason: SwapFailureReason, message: string, logs: string[] = []) {
    super(message);
    this.name = 'SwapSimulationError';
    this.reason = reason;
    this.logs = logs;
  }
}

/** Anchor error 6008 of the vault program: LeafAlreadyUsed. Jupiter 6001: SlippageToleranceExceeded. */
const VAULT_LEAF_ALREADY_USED = 6008;
const JUPITER_SLIPPAGE = 6001;

/**
 * Why a swap transaction failed, from the runtime error and/or the logs. `composed` tells which
 * instruction is the vault's execute and which is Jupiter's swap (both programs number their
 * Anchor errors from 6000, so the instruction index decides).
 */
export function classifySwapFailure(err: unknown, logs?: string[] | null, composed?: Pick<ComposedSwap, 'executeIndex' | 'swapIndex'>): SwapFailureReason {
  const text = `${typeof err === 'string' ? err : JSON.stringify(err ?? '', (_k, v) => (typeof v === 'bigint' ? v.toString() : v))}\n${(logs ?? []).join('\n')}`;
  const ixErr = (err as { InstructionError?: [number, unknown] } | null)?.InstructionError;
  if (ixErr && composed) {
    const [index, inner] = ixErr;
    const custom = (inner as { Custom?: number } | null)?.Custom;
    if (index === composed.swapIndex && custom === JUPITER_SLIPPAGE) return 'slippage';
    if (index === composed.executeIndex) return custom === VAULT_LEAF_ALREADY_USED ? 'leafUsed' : 'vault';
  }
  if (/SlippageToleranceExceeded|slippage tolerance exceeded/i.test(text)) return 'slippage';
  if (new RegExp(`Program ${JUPITER_PROGRAM_ID.toBase58()} failed: custom program error: 0x1771`).test(text)) return 'slippage';
  if (/LeafAlreadyUsed|leaf_index is below next_leaf/i.test(text)) return 'leafUsed';
  if (/BlockhashNotFound|block height exceeded|blockhash.*(expired|not found)|expired before it was confirmed/i.test(text)) return 'blockhashExpired';
  if (/exceeded CUs meter|ComputationalBudgetExceeded|exceeded maximum compute|consumed \d+ of \d+ compute units.*exceed/i.test(text)) return 'computeExceeded';
  if (/InsufficientFundsForFee|insufficient lamports|insufficient funds|InsufficientFundsForRent/i.test(text)) return 'insufficientFunds';
  return 'unknown';
}

// ---- composition ------------------------------------------------------------------------------

export interface SwapQuoteSummary {
  inputMint: PublicKey;
  outputMint: PublicKey;
  inAmount: bigint;
  /** Expected output. */
  outAmount: bigint;
  /** Minimum output after slippage (the swap reverts below this). */
  minOutAmount: bigint;
  slippageBps: number;
  /** Percent, e.g. 0.12 = 0.12 %. */
  priceImpactPct: number;
  route: Array<{ label: string; percent: number; inputMint: string; outputMint: string }>;
}

export interface ComposedSwap {
  /** Unsigned (signatures zero-filled). The wallet signs it as-is. */
  transaction: VersionedTransaction;
  message: MessageV0;
  /** Serialized size in bytes (must be ≤ 1,232). */
  size: number;
  /** Distinct accounts the transaction locks (static + looked up). */
  accountCount: number;
  fits: boolean;
  instructions: TransactionInstruction[];
  executeIndex: number;
  swapIndex: number;
  computeUnitLimit: number;
  /** micro-lamports per compute unit, after the clamp. */
  computeUnitPrice: bigint;
  priorityFeeLamports: bigint;
  /** Base fee for every required signature + priority fee. */
  networkFeeLamports: bigint;
  /** Token accounts this transaction creates if missing (idempotent creates added here, plus Jupiter's). */
  createsAccounts: PublicKey[];
  quote: SwapQuoteSummary;
}

export interface ComposeSwapParams {
  /** The connected wallet: Jupiter taker and payer, fee payer, signature-buffer payer. */
  taker: PublicKey;
  vault: Pick<VaultInfo, 'state' | 'wallet' | 'cosigner' | 'rootEpoch'>;
  leafIndex: number;
  /** The execute payload exactly as signed: ONE TransferSol / TransferToken to `taker`. */
  payload: Uint8Array;
  output: SwapAsset;
  build: JupiterBuildResponse;
  lookupTables: AddressLookupTableAccount[];
  recentBlockhash?: string;
  /** Default: execute + ATA creates + COMPUTE_UNITS.max for Jupiter, capped at 1.4M (simulate to tighten). */
  computeUnitLimit?: number;
  maxPriorityFeeLamports?: bigint;
}

function swapInputFromAction(a: VaultAction): SwapAsset {
  if (a.kind === 'transferSol') return { kind: 'sol' };
  if (a.kind === 'transferToken') return { kind: 'token', mint: a.mint, tokenProgram: a.tokenProgram };
  throw new SwapRouteError('A swap signs exactly one TransferSol or TransferToken');
}

function actionAmount(a: VaultAction): bigint {
  return a.kind === 'transferSol' ? a.lamports : a.kind === 'transferToken' ? a.amount : 0n;
}

/** The one action of a swap payload, checked to pay `taker`. */
export function decodeSwapPayload(payload: Uint8Array, taker: PublicKey): { action: VaultAction; input: SwapAsset; amount: bigint } {
  const actions = decodeActionsTs(payload);
  if (actions.length !== 1) throw new SwapRouteError('A swap signature carries exactly one action');
  const action = actions[0] as VaultAction;
  const input = swapInputFromAction(action);
  if (action.kind === 'transferSol' && !action.to.equals(taker)) throw new SwapRouteError('The signed transfer does not pay the connected wallet');
  if (action.kind === 'transferToken' && !action.destination.equals(ataOf(taker, action.mint, action.tokenProgram))) {
    throw new SwapRouteError('The signed transfer does not pay the connected wallet’s token account');
  }
  return { action, input, amount: actionAmount(action) };
}

/** Jupiter's compute-unit price (micro-lamports) and any budget instructions to keep (heap, data size). */
function readComputeBudget(ixs: JupiterInstruction[]): { price: bigint; keep: TransactionInstruction[] } {
  let price = 0n;
  const keep: TransactionInstruction[] = [];
  for (const j of ixs) {
    if (j.programId !== COMPUTE_BUDGET_ID.toBase58()) throw new SwapRouteError(`Unexpected program ${j.programId} among Jupiter's compute-budget instructions`);
    const data = Buffer.from(j.data, 'base64');
    const tag = data[0];
    if (tag === 3 && data.length >= 9) price = data.readBigUInt64LE(1);
    else if (tag === 2) continue; // unit limit: ours replaces it
    else if (tag === 1 || tag === 4) keep.push(toTransactionInstruction(j));
    else throw new SwapRouteError('Unexpected compute-budget instruction from Jupiter');
  }
  return { price, keep };
}

function shortvecLen(n: number): number {
  return n < 0x80 ? 1 : n < 0x4000 ? 2 : 3;
}

/** Exact wire size of a v0 transaction for `message` (signatures included). */
export function v0TransactionSize(message: MessageV0): number {
  const nSig = message.header.numRequiredSignatures;
  let size = shortvecLen(nSig) + 64 * nSig + 1 + 3;
  size += shortvecLen(message.staticAccountKeys.length) + 32 * message.staticAccountKeys.length + 32;
  size += shortvecLen(message.compiledInstructions.length);
  for (const ix of message.compiledInstructions) {
    size += 1 + shortvecLen(ix.accountKeyIndexes.length) + ix.accountKeyIndexes.length + shortvecLen(ix.data.length) + ix.data.length;
  }
  size += shortvecLen(message.addressTableLookups.length);
  for (const l of message.addressTableLookups) {
    size += 32 + shortvecLen(l.writableIndexes.length) + l.writableIndexes.length + shortvecLen(l.readonlyIndexes.length) + l.readonlyIndexes.length;
  }
  return size;
}

function v0AccountCount(message: MessageV0): number {
  return message.staticAccountKeys.length + message.addressTableLookups.reduce((n, l) => n + l.writableIndexes.length + l.readonlyIndexes.length, 0);
}

function quoteSummary(b: JupiterBuildResponse): SwapQuoteSummary {
  const impact = Number(b.priceImpactPct ?? '0');
  return {
    inputMint: new PublicKey(b.inputMint),
    outputMint: new PublicKey(b.outputMint),
    inAmount: BigInt(b.inAmount),
    outAmount: BigInt(b.outAmount),
    minOutAmount: BigInt(b.otherAmountThreshold),
    slippageBps: b.slippageBps,
    priceImpactPct: Number.isFinite(impact) ? impact * 100 : 0,
    route: b.routePlan.map((s) => ({ label: s.swapInfo.label, percent: s.percent, inputMint: s.swapInfo.inputMint, outputMint: s.swapInfo.outputMint })),
  };
}

/** Address lookup tables exactly as Jupiter lists them (quotes and tests; check on-chain before signing). */
export function lookupTablesFromJupiter(b: JupiterBuildResponse): AddressLookupTableAccount[] {
  return Object.entries(b.addressesByLookupTableAddress ?? {}).map(
    ([key, addresses]) =>
      new AddressLookupTableAccount({
        key: new PublicKey(key),
        state: {
          deactivationSlot: BigInt('18446744073709551615'),
          lastExtendedSlot: 0,
          lastExtendedSlotStartIndex: 0,
          addresses: addresses.map((a) => new PublicKey(a)),
        },
      }),
  );
}

/**
 * The lookup tables read from the chain, checked against Jupiter's listing: every address Jupiter
 * relies on must sit at the same index on-chain, and the table must be active.
 */
export async function fetchLookupTables(conn: Connection, b: JupiterBuildResponse): Promise<AddressLookupTableAccount[]> {
  const entries = Object.entries(b.addressesByLookupTableAddress ?? {});
  const out: AddressLookupTableAccount[] = [];
  for (const [key, addresses] of entries) {
    const res = await conn.getAddressLookupTable(new PublicKey(key), { commitment: 'confirmed' });
    const table = res.value;
    if (!table) throw new SwapRouteError(`Lookup table ${key} from Jupiter does not exist on this network`);
    if (!table.isActive()) throw new SwapRouteError(`Lookup table ${key} is deactivated`);
    addresses.forEach((a, i) => {
      if (!table.state.addresses[i]?.equals(new PublicKey(a))) throw new SwapRouteError(`Lookup table ${key} differs from Jupiter’s copy at index ${i}`);
    });
    out.push(table);
  }
  return out;
}

/**
 * Compose the atomic swap transaction (pure, no network). Validates that Jupiter's instructions
 * match the signed action (same input, same amount, ExactIn), use only expected programs and pay
 * the output into the vault. Never throws for size: check `fits`.
 */
export function composeSwapTransaction(p: ComposeSwapParams): ComposedSwap {
  const b = p.build;
  const { action, input, amount } = decodeSwapPayload(p.payload, p.taker);
  assertSwapPair(input, p.output);
  if (b.swapMode !== 'ExactIn') throw new SwapRouteError(`Jupiter returned a ${b.swapMode} route; a vault swap is ExactIn`);
  if (BigInt(b.inAmount) !== amount) throw new SwapRouteError(`Jupiter quoted ${b.inAmount} in, but the signature moves ${amount}`);
  if (b.inputMint !== swapAssetMint(input).toBase58()) throw new SwapRouteError('Jupiter’s input mint differs from the signed asset');
  if (b.outputMint !== swapAssetMint(p.output).toBase58()) throw new SwapRouteError('Jupiter’s output mint differs from the requested one');
  if (b.tipInstruction) throw new SwapRouteError('Unexpected tip instruction from Jupiter');

  const jupIxs = [...b.setupInstructions, b.swapInstruction, ...(b.cleanupInstruction ? [b.cleanupInstruction] : []), ...b.otherInstructions];
  for (const j of jupIxs) {
    if (!ALLOWED_JUPITER_PROGRAMS.has(j.programId)) throw new SwapRouteError(`Jupiter’s route uses an unexpected program (${j.programId})`);
  }
  if (b.swapInstruction.programId !== JUPITER_PROGRAM_ID.toBase58()) throw new SwapRouteError('The swap instruction is not Jupiter’s program');
  const vaultKeys = new Set([p.vault.state.toBase58(), p.vault.wallet.toBase58()]);
  for (const j of jupIxs) {
    if (j.accounts.some((a) => a.isSigner && vaultKeys.has(a.pubkey))) throw new SwapRouteError('Jupiter’s route asks the vault to sign');
  }
  const dest = swapDestination(p.vault.wallet, p.output);
  if (!b.swapInstruction.accounts.some((a) => a.pubkey === dest.toBase58() && a.isWritable)) {
    throw new SwapRouteError('Jupiter’s route does not pay the output into the vault');
  }

  const budget = readComputeBudget(b.computeBudgetInstructions);
  const creates: TransactionInstruction[] = [];
  const createsAccounts: PublicKey[] = [];
  if (action.kind === 'transferToken') {
    creates.push(createAssociatedTokenAccountIdempotentInstruction(p.taker, action.destination, p.taker, action.mint, action.tokenProgram));
    createsAccounts.push(action.destination);
  }
  if (p.output.kind === 'token') {
    creates.push(createAssociatedTokenAccountIdempotentInstruction(p.taker, dest, p.vault.wallet, p.output.mint, p.output.tokenProgram));
    createsAccounts.push(dest);
  }
  // Jupiter's own idempotent ATA creates (e.g. the wallet's output account) cost rent too, except
  // accounts its cleanup closes again in the same transaction (the wSOL account).
  const closed = new Set(
    [...(b.cleanupInstruction ? [b.cleanupInstruction] : []), ...b.otherInstructions]
      .filter((j) => (j.programId === SPL_TOKEN_PROGRAM_ID.toBase58() || j.programId === TOKEN_2022_PROGRAM_ID.toBase58()) && Buffer.from(j.data, 'base64')[0] === 9)
      .map((j) => j.accounts[0]?.pubkey),
  );
  for (const j of b.setupInstructions) {
    const created = j.programId === ASSOCIATED_TOKEN_PROGRAM_ID.toBase58() ? j.accounts[1]?.pubkey : undefined;
    if (created && !closed.has(created)) createsAccounts.push(new PublicKey(created));
  }

  const [sigBuffer] = findSigBufferPda(p.vault.state, p.taker, p.vault.rootEpoch, p.leafIndex);
  const execute = executeIx({
    feePayer: p.taker,
    state: p.vault.state,
    wallet: p.vault.wallet,
    cosigner: p.vault.cosigner,
    leafIndex: p.leafIndex,
    payload: p.payload,
    actions: [action],
    sig: null,
    sigBuffer,
  });

  // Without a simulation the limit is the maximum: the execute alone needs up to
  // executeComputeUnits() and Jupiter's share depends on the route.
  const limit = Math.max(
    Math.min(COMPUTE_UNITS.max, Math.ceil(p.computeUnitLimit ?? COMPUTE_UNITS.max)),
    p.computeUnitLimit === undefined ? executeComputeUnits([action], p.vault.wallet, creates.length) : 1,
  );
  const maxFee = p.maxPriorityFeeLamports ?? SWAP_MAX_PRIORITY_FEE_LAMPORTS;
  const maxPrice = (maxFee * 1_000_000n) / BigInt(limit);
  const price = budget.price > maxPrice ? maxPrice : budget.price;

  const budgetIxs = [ComputeBudgetProgram.setComputeUnitLimit({ units: limit })];
  if (price > 0n) budgetIxs.push(ComputeBudgetProgram.setComputeUnitPrice({ microLamports: price }));
  budgetIxs.push(...budget.keep);

  const swapIxs = jupIxs.map(toTransactionInstruction);
  const instructions = [...budgetIxs, ...creates, execute, ...swapIxs];
  const executeIndex = budgetIxs.length + creates.length;
  const swapIndex = executeIndex + 1 + b.setupInstructions.length;

  const message = new TransactionMessage({
    payerKey: p.taker,
    recentBlockhash: p.recentBlockhash ?? MEASURE_BLOCKHASH,
    instructions,
  }).compileToV0Message(p.lookupTables);
  const size = v0TransactionSize(message);
  const accountCount = v0AccountCount(message);
  const priorityFeeLamports = (price * BigInt(limit) + 999_999n) / 1_000_000n;
  return {
    transaction: new VersionedTransaction(message),
    message,
    size,
    accountCount,
    fits: size <= LEGACY_TX_LIMIT && accountCount <= SWAP_MAX_TX_ACCOUNTS,
    instructions,
    executeIndex,
    swapIndex,
    computeUnitLimit: limit,
    computeUnitPrice: price,
    priorityFeeLamports,
    networkFeeLamports: BASE_FEE_LAMPORTS * BigInt(message.header.numRequiredSignatures) + priorityFeeLamports,
    createsAccounts: [...new Map(createsAccounts.map((k) => [k.toBase58(), k])).values()],
    quote: quoteSummary(b),
  };
}

// ---- quote (before signing) and build (after signing) -------------------------------------------

export interface VaultSwapQuote extends ComposedSwap {
  build: JupiterBuildResponse;
  lookupTables: AddressLookupTableAccount[];
  /** The maxAccounts value whose route fits. */
  maxAccounts: number;
  /** Every route tried, largest first. */
  attempts: Array<{ maxAccounts: number; size: number; accounts: number }>;
  fetchedAt: number;
}

export interface QuoteVaultSwapParams {
  jupiter: JupiterClient;
  /** Read the lookup tables on-chain and check them against Jupiter's (always pass it before signing). */
  conn?: Connection;
  vault: Pick<VaultInfo, 'state' | 'wallet' | 'cosigner' | 'rootEpoch' | 'nextLeaf'>;
  taker: PublicKey;
  input: SwapAsset;
  output: SwapAsset;
  amount: bigint;
  slippageBps: number;
  maxAccountsLadder?: readonly number[];
  /** Jupiter DEX labels to route through only / to avoid. */
  dexes?: string[];
  excludeDexes?: string[];
  /** The signed leaf and payload. Without it a dry-run payload at vault.nextLeaf is used (same size). */
  signed?: { leafIndex: number; payload: Uint8Array };
  recentBlockhash?: string;
  computeUnitLimit?: number;
  maxPriorityFeeLamports?: bigint;
  signal?: AbortSignal;
}

/**
 * Fresh Jupiter route + the composed transaction. Tries maxAccounts from the ladder, largest
 * first, until the transaction fits in 1,232 bytes; throws SwapTooLargeError when none does.
 * Use it before signing (dry run) to show a quote that is known to fit.
 */
export async function quoteVaultSwap(p: QuoteVaultSwapParams): Promise<VaultSwapQuote> {
  assertSwapPair(p.input, p.output);
  const payload = p.signed?.payload ?? encodeActionsTs([swapInputAction(p.taker, p.input, p.amount)]);
  const leafIndex = p.signed?.leafIndex ?? p.vault.nextLeaf;
  const ladder = p.maxAccountsLadder ?? SWAP_MAX_ACCOUNTS_LADDER;
  const attempts: VaultSwapQuote['attempts'] = [];
  for (const maxAccounts of ladder) {
    const build = await p.jupiter.build(
      vaultSwapBuildParams({
        vaultWallet: p.vault.wallet,
        taker: p.taker,
        input: p.input,
        output: p.output,
        amount: p.amount,
        slippageBps: p.slippageBps,
        maxAccounts,
        ...(p.dexes ? { dexes: p.dexes } : {}),
        ...(p.excludeDexes ? { excludeDexes: p.excludeDexes } : {}),
      }),
      p.signal,
    );
    const lookupTables = p.conn ? await fetchLookupTables(p.conn, build) : lookupTablesFromJupiter(build);
    const composed = composeSwapTransaction({
      taker: p.taker,
      vault: p.vault,
      leafIndex,
      payload,
      output: p.output,
      build,
      lookupTables,
      ...(p.recentBlockhash ? { recentBlockhash: p.recentBlockhash } : {}),
      ...(p.computeUnitLimit !== undefined ? { computeUnitLimit: p.computeUnitLimit } : {}),
      ...(p.maxPriorityFeeLamports !== undefined ? { maxPriorityFeeLamports: p.maxPriorityFeeLamports } : {}),
    });
    attempts.push({ maxAccounts, size: composed.size, accounts: composed.accountCount });
    if (composed.fits) return { ...composed, build, lookupTables, maxAccounts, attempts, fetchedAt: Date.now() };
  }
  throw new SwapTooLargeError(attempts);
}

/** Recompose a quote with a new compute-unit limit or blockhash (no new Jupiter request). */
export function recomposeSwap(
  q: VaultSwapQuote,
  p: Pick<ComposeSwapParams, 'taker' | 'vault' | 'leafIndex' | 'payload' | 'output'> & { recentBlockhash?: string; computeUnitLimit?: number; maxPriorityFeeLamports?: bigint },
): VaultSwapQuote {
  const composed = composeSwapTransaction({ ...p, build: q.build, lookupTables: q.lookupTables });
  return { ...q, ...composed };
}

export interface SwapSimulation {
  err: unknown;
  logs: string[] | null;
  unitsConsumed?: number;
}
export type SwapSimulator = (tx: VersionedTransaction) => Promise<SwapSimulation>;

/**
 * RPC simulation without signatures (Jupiter's recommendation for sizing the compute-unit limit).
 * `minContextSlot`: the slot the signature upload confirmed at, so the node simulates against it.
 */
export function rpcSwapSimulator(conn: Connection, minContextSlot?: number): SwapSimulator {
  return async (tx) => {
    for (let attempt = 0; ; attempt++) {
      try {
        const res = await conn.simulateTransaction(tx, { sigVerify: false, replaceRecentBlockhash: true, commitment: 'confirmed', ...(minContextSlot !== undefined ? { minContextSlot } : {}) });
        return { err: res.value.err, logs: res.value.logs ?? null, ...(res.value.unitsConsumed !== undefined ? { unitsConsumed: res.value.unitsConsumed } : {}) };
      } catch (e) {
        // The node has not reached the upload's slot yet.
        if (attempt < 15 && /minimum context slot/i.test(e instanceof Error ? e.message : String(e))) {
          await sleep(400);
          continue;
        }
        throw e;
      }
    }
  };
}

export interface BuildSwapTransactionParams {
  conn: Connection;
  jupiter: JupiterClient;
  prepared: Pick<PreparedSignature, 'state' | 'leafIndex' | 'rootEpoch' | 'message'>;
  taker: PublicKey;
  output: SwapAsset;
  slippageBps: number;
  /** Start from the maxAccounts that fit at quote time (default: the full ladder). */
  maxAccountsLadder?: readonly number[];
  dexes?: string[];
  excludeDexes?: string[];
  /** Default: simulate over RPC and set the limit to 1.2 × the units used. false: COMPUTE_UNITS.max. */
  simulate?: boolean | SwapSimulator;
  /** The slot the signature upload confirmed at (blockhash and simulation read from at least it). */
  minContextSlot?: number;
  /**
   * The minimum output the user reviewed. The swap never guarantees less: when the fresh route's
   * minimum falls short but its expected output is still above the floor, the slippage is tightened
   * so the on-chain minimum is the floor again; otherwise SwapPriceMovedError (nothing sent).
   */
  minOutFloor?: bigint;
  maxPriorityFeeLamports?: bigint;
  signal?: AbortSignal;
}

export interface BuiltSwap extends VaultSwapQuote {
  blockhash: BlockhashInfo;
  /** Units the simulation consumed (when simulated). */
  simulatedUnits?: number;
}

/**
 * The swap transaction for a prepared (signed, uploaded) swap signature: a FRESH Jupiter route
 * for the exact signed amount, composed around the signed execute. Call it again to retry after
 * a failure: it never re-signs (the leaf and the buffer stay the same).
 *
 * Throws SwapSignatureUsedError when the leaf is gone (consumed or rotated), SwapSimulationError
 * when the simulation fails (e.g. reason 'slippage': nothing moved, re-quote and retry).
 */
export async function buildSwapTransaction(p: BuildSwapTransactionParams): Promise<BuiltSwap> {
  const m = parseMessage(p.prepared.message);
  if (m.tag !== IX_TAG.execute) throw new Error('Not an execute signature');
  if (!m.state.equals(p.prepared.state) || m.leafIndex !== p.prepared.leafIndex || m.rootEpoch !== p.prepared.rootEpoch) throw new Error('Prepared signature is inconsistent');
  const { input, amount } = decodeSwapPayload(m.payload, p.taker);

  const vault = await fetchVault(p.conn, p.prepared.state);
  if (!vault || vault.closed) throw new SwapSignatureUsedError('closed', 'The vault is closed');
  if (vault.rootEpoch !== p.prepared.rootEpoch) throw new SwapSignatureUsedError('rotated', `The vault key rotated to epoch ${vault.rootEpoch}; this signature can no longer land`);
  if (vault.nextLeaf > p.prepared.leafIndex) {
    throw new SwapSignatureUsedError('consumed', `Leaf ${p.prepared.leafIndex} is already used on-chain (next leaf ${vault.nextLeaf})`);
  }

  const blockhash = await p.conn.getLatestBlockhash(
    p.minContextSlot !== undefined ? { commitment: 'confirmed', minContextSlot: p.minContextSlot } : 'confirmed',
  );
  const signed = { leafIndex: p.prepared.leafIndex, payload: m.payload };
  const quoteAt = (slippageBps: number, ladder?: readonly number[]) =>
    quoteVaultSwap({
      jupiter: p.jupiter,
      conn: p.conn,
      vault,
      taker: p.taker,
      input,
      output: p.output,
      amount,
      slippageBps,
      signed,
      recentBlockhash: blockhash.blockhash,
      computeUnitLimit: COMPUTE_UNITS.max,
      ...(ladder ? { maxAccountsLadder: ladder } : {}),
      ...(p.dexes ? { dexes: p.dexes } : {}),
      ...(p.excludeDexes ? { excludeDexes: p.excludeDexes } : {}),
      ...(p.maxPriorityFeeLamports !== undefined ? { maxPriorityFeeLamports: p.maxPriorityFeeLamports } : {}),
      ...(p.signal ? { signal: p.signal } : {}),
    });
  let q = await quoteAt(p.slippageBps, p.maxAccountsLadder);
  const floor = p.minOutFloor;
  if (floor !== undefined && q.quote.minOutAmount < floor) {
    if (q.quote.outAmount <= floor) throw new SwapPriceMovedError(q, floor);
    // Expected output still clears the floor: tighten the slippage so the minimum is the floor.
    const bps = Number(((q.quote.outAmount - floor) * 10_000n) / q.quote.outAmount);
    q = await quoteAt(Math.max(0, Math.min(p.slippageBps, bps)), [q.maxAccounts]);
    if (q.quote.minOutAmount < floor) throw new SwapPriceMovedError(q, floor);
  }
  const simulate = p.simulate === undefined || p.simulate === true ? rpcSwapSimulator(p.conn, p.minContextSlot) : p.simulate || null;
  if (!simulate) return { ...q, blockhash };
  const sim = await simulate(q.transaction);
  if (sim.err) {
    const reason = classifySwapFailure(sim.err, sim.logs, q);
    throw new SwapSimulationError(reason, simulationMessage(reason), sim.logs ?? []);
  }
  const units = sim.unitsConsumed ?? COMPUTE_UNITS.max;
  const limit = Math.min(COMPUTE_UNITS.max, Math.ceil(units * 1.2));
  const tightened = recomposeSwap(q, {
    taker: p.taker,
    vault,
    leafIndex: p.prepared.leafIndex,
    payload: m.payload,
    output: p.output,
    recentBlockhash: blockhash.blockhash,
    computeUnitLimit: limit,
    ...(p.maxPriorityFeeLamports !== undefined ? { maxPriorityFeeLamports: p.maxPriorityFeeLamports } : {}),
  });
  return { ...tightened, blockhash, simulatedUnits: units };
}

function simulationMessage(reason: SwapFailureReason): string {
  switch (reason) {
    case 'slippage':
      return 'The price moved past your slippage limit. Nothing moved; get a new quote and retry.';
    case 'blockhashExpired':
      return 'The transaction expired before it could run. Nothing moved; retry.';
    case 'insufficientFunds':
      return 'The connected wallet needs a little SOL for network fees and token-account rent.';
    case 'computeExceeded':
      return 'This route ran out of compute. Nothing moved; retry or pick another amount.';
    case 'leafUsed':
      return 'This one-time signature was already used.';
    case 'vault':
      return 'The vault program refused the transaction. Nothing moved.';
    default:
      return 'The swap would fail. Nothing moved.';
  }
}

// ---- signing and the signature buffer ----------------------------------------------------------

export interface PrepareSwapParams extends Omit<PrepareExecuteParams, 'actions' | 'createDestinationAtas' | 'transport' | 'addressLabels'> {
  input: SwapAsset;
  amount: bigint;
  output: SwapAsset;
}

export interface PreparedSwap extends PreparedSignature {
  swapInput: SwapAsset;
  swapOutput: SwapAsset;
  swapAmount: bigint;
}

/** Why a token cannot be swapped out of / into a vault, or null. */
export function swapAssetProblem(side: 'input' | 'output', c: MintClassification | undefined): string | null {
  if (!c) return side === 'input' ? 'This token mint was not found.' : 'This token mint was not found on this network.';
  if (c.kind === 'nft') return 'NFTs are not swapped here.';
  if (side === 'output' && !c.supported) return `The vault could not hold this token: ${c.unsupportedReason ?? 'unsupported'}`;
  if (side === 'input' && c.transferHookActive) return c.unsupportedReason ?? 'Transfer-hook tokens cannot leave the vault yet.';
  if (side === 'input' && c.risks.some((r) => r.id === 'transferFee')) return 'Tokens with a transfer fee cannot be swapped from the vault yet (the wallet would receive less than the signed amount).';
  return null;
}

/** Mint checks for both sides (RPC). Throws SwapRouteError with the first problem. */
export async function checkSwapAssets(conn: Connection, input: SwapAsset, output: SwapAsset): Promise<Map<string, MintClassification>> {
  assertSwapPair(input, output);
  const mints = [input, output].flatMap((a) => (a.kind === 'token' ? [a.mint] : []));
  const cls = mints.length ? await fetchMintClassifications(conn, mints) : new Map<string, MintClassification>();
  for (const [side, a] of [['input', input], ['output', output]] as const) {
    if (a.kind !== 'token') continue;
    const c = cls.get(a.mint.toBase58());
    const problem = swapAssetProblem(side, c);
    if (problem) throw new SwapRouteError(problem);
    if (c && !c.tokenProgram.equals(a.tokenProgram)) throw new SwapRouteError('The token program does not match the mint');
  }
  return cls;
}

/**
 * Sign the swap's one action with the hash key (next free leaf, recorded before signing) and return
 * the signature-buffer UPLOAD transactions in `transactions` (no execute: that runs inside the swap
 * transaction from buildSwapTransaction). The summary names the wallet: "… to 7xKX…f9aB (your wallet)."
 */
export async function prepareSwap(p: PrepareSwapParams): Promise<PreparedSwap> {
  await checkSwapAssets(p.conn, p.input, p.output);
  const { input, output, amount, ...base } = p;
  const prepared = await prepareExecute({
    ...base,
    actions: [swapInputAction(p.feePayer, input, amount)],
    createDestinationAtas: true,
    transport: 'buffer',
    addressLabels: new Map([[p.feePayer.toBase58(), 'your wallet']]),
  });
  const uploads = await swapSignatureUploads({ conn: p.conn, prepared, feePayer: p.feePayer });
  return { ...prepared, transactions: uploads, swapInput: input, swapOutput: output, swapAmount: amount };
}

/** A swap-shaped signature (one transfer to the wallet) that has not landed: it can be swapped without signing again. */
export interface PendingSwap {
  state: PublicKey;
  rootEpoch: number;
  leafIndex: number;
  message: Uint8Array;
  signature: Uint8Array;
  input: SwapAsset;
  amount: bigint;
}

/**
 * The earliest pending signature of this vault (see findPendingSignatures) that this device can
 * resend and that is exactly what a swap signs: one transfer of an amount to `feePayer`. A swap
 * that failed and was left (slippage, closed tab) shows up here; swapping it now uses the SAME
 * signature, while signing anything else first would be refused (PendingSignatureError).
 */
export async function findPendingSwap(p: { conn: Connection; cluster: ClusterName; vault: VaultInfo; ledger: LeafLedger; feePayer: PublicKey }): Promise<PendingSwap | null> {
  const { pending } = await findPendingSignatures(p);
  for (const s of pending) {
    if (!s.canFinish || s.kind !== 'execute') continue;
    const e = p.ledger.get(s.state, s.rootEpoch, s.leafIndex);
    if (!e?.signature) continue;
    const message = base64.decode(e.message);
    try {
      const m = parseMessage(message);
      if (m.tag !== IX_TAG.execute) continue;
      const { input, amount } = decodeSwapPayload(m.payload, p.feePayer);
      return { state: s.state, rootEpoch: s.rootEpoch, leafIndex: s.leafIndex, message, signature: base64.decode(e.signature), input, amount };
    } catch {
      continue; // not swap-shaped (several actions, another recipient, …)
    }
  }
  return null;
}

export type SwapSignatureState =
  /** The buffer is missing or incomplete: send the upload transactions. */
  | 'needsUpload'
  /** Uploaded and unused: build and send the swap transaction. */
  | 'ready'
  /** The leaf is used on-chain (the swap landed, the signature ran on its own, or a later leaf did). */
  | 'consumed'
  /** The key rotated or the vault closed: this signature can never land. */
  | 'expired';

/** Where a prepared swap signature stands on-chain. */
export async function swapSignatureState(
  conn: Connection,
  prepared: Pick<PreparedSignature, 'state' | 'rootEpoch' | 'leafIndex' | 'signature'>,
  feePayer: PublicKey,
): Promise<{ state: SwapSignatureState; missing: Array<[number, number]>; bufferExists: boolean }> {
  const vault = await fetchVault(conn, prepared.state);
  if (!vault || vault.closed || vault.rootEpoch !== prepared.rootEpoch) return { state: 'expired', missing: [], bufferExists: false };
  if (vault.nextLeaf > prepared.leafIndex) return { state: 'consumed', missing: [], bufferExists: false };
  const [sigBuffer] = findSigBufferPda(prepared.state, feePayer, prepared.rootEpoch, prepared.leafIndex);
  const info = await conn.getAccountInfo(sigBuffer, 'confirmed');
  if (!info) return { state: 'needsUpload', missing: [[0, SIG_LEN]], bufferExists: false };
  const buf = decodeSigBuffer(sigBuffer, info.data);
  if (!buf.state.equals(prepared.state) || !buf.payer.equals(feePayer) || buf.rootEpoch !== prepared.rootEpoch || buf.leafIndex !== prepared.leafIndex) {
    throw new Error('The existing signature buffer does not match this leaf');
  }
  const missing = diffRanges(buf.data.subarray(0, SIG_LEN), prepared.signature);
  return { state: missing.length ? 'needsUpload' : 'ready', missing, bufferExists: true };
}

/**
 * Upload transactions for a swap signature (init_sig_buffer + write chunks, legacy, ≤ 1,232 bytes
 * each), WITHOUT the execute. Resumes a partially written buffer; [] when the buffer is complete.
 */
export async function swapSignatureUploads(p: {
  conn: Connection;
  prepared: Pick<PreparedSignature, 'state' | 'rootEpoch' | 'leafIndex' | 'signature'>;
  feePayer: PublicKey;
}): Promise<Transaction[]> {
  const st = await swapSignatureState(p.conn, p.prepared, p.feePayer);
  if (st.state === 'consumed') throw new SwapSignatureUsedError('consumed', `Leaf ${p.prepared.leafIndex} is already used on-chain`);
  if (st.state === 'expired') throw new SwapSignatureUsedError('rotated', 'This signature can no longer land (the vault rotated or closed)');
  if (st.state === 'ready') return [];
  const [sigBuffer] = findSigBufferPda(p.prepared.state, p.feePayer, p.prepared.rootEpoch, p.prepared.leafIndex);
  const blockhash = await p.conn.getLatestBlockhash('confirmed');
  return buildBufferPathTxs({
    feePayer: p.feePayer,
    state: p.prepared.state,
    sigBuffer,
    rootEpoch: p.prepared.rootEpoch,
    leafIndex: p.prepared.leafIndex,
    signature: p.prepared.signature,
    finalInstructions: [],
    finalComputeUnits: COMPUTE_UNITS.sigBufferTx,
    blockhash,
    ...(st.bufferExists ? { skipInit: true, ranges: st.missing } : {}),
  });
}
