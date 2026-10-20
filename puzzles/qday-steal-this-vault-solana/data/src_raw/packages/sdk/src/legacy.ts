// Legacy (inheritance): read a vault's heir and the cluster clock, and build the permissionless
// `inherit` transactions (docs/guides/legacy.md, SPEC §2, MESSAGE_FORMAT §4).
//
// Naming the heir, checking in and removing the heir are ordinary signed actions (setHeir,
// checkIn, clearHeir in prepareExecute). Inheriting needs no signature at all: once the deadline has
// passed, any wallet can send `inherit`, pay its fees and the rent of the heir's new token accounts,
// and the program moves everything only to the recorded heir. The first one seals the vault.

import { PublicKey, SYSVAR_CLOCK_PUBKEY, TransactionMessage, VersionedTransaction } from '@solana/web3.js';
import type { Connection, Transaction, TransactionInstruction } from '@solana/web3.js';
import { createHarvestWithheldTokensToMintInstruction, getMemoTransfer, getTransferFeeAmount, unpackAccount } from '@solana/spl-token';
import type { Account as TokenAccount } from '@solana/spl-token';
import { ASSOCIATED_TOKEN_PROGRAM_ID, COMPUTE_UNITS, INHERIT_MAX_TOKENS_PER_TX, LEGACY_TX_LIMIT, SPL_TOKEN_PROGRAM_ID, TOKEN_2022_PROGRAM_ID } from './constants';
import type { ClusterName } from './constants';
import { assertClusterAllowed } from './cluster';
import { ataOf } from './addresses';
import { fetchMintClassifications, getMultipleAccountsBatched } from './assets';
import type { MintClassification } from './assets';
import { formatAmount, shortAddress } from './describe';
import { inheritIx } from './instructions';
import type { InheritTokenAccount } from './instructions';
import { checkRecipients } from './recipients';
import { fetchHeir, fetchVault } from './state';
import type { HeirInfo, VaultInfo } from './state';
import { cuLimitIx, makeTx, measureTx, TransactionTooLargeError } from './transport';

/** The heir's deadline has not passed yet: nothing can be inherited before it. */
export class InheritanceNotDueError extends Error {
  readonly deadline: number;
  readonly now: number;
  constructor(deadline: number, now: number) {
    super(`Nothing can be inherited yet: the heir's countdown ends ${new Date(deadline * 1000).toISOString()}.`);
    this.name = 'InheritanceNotDueError';
    this.deadline = deadline;
    this.now = now;
  }
}

/**
 * The recorded heir can't receive anything any more: it became a token account, a program's
 * account, or the address of a vault that was closed since (nothing could ever leave it). Nothing is
 * built; a living owner can name another heir.
 */
export class HeirCannotReceiveError extends Error {
  readonly heir: PublicKey;
  constructor(heir: PublicKey, reason: string) {
    super(`The heir ${heir.toBase58()} can't receive this inheritance: ${reason}. Nothing was sent; only a new heir named by the vault's owner can fix it.`);
    this.name = 'HeirCannotReceiveError';
    this.heir = heir;
  }
}

/** The vault has no heir record (none was set, or it was removed). */
export class NoHeirError extends Error {
  constructor(state: PublicKey) {
    super(`Vault ${shortAddress(state)} has no heir.`);
    this.name = 'NoHeirError';
  }
}

/**
 * Unix time of the cluster clock: the Clock sysvar the program compares the deadline with. Layout:
 * slot u64 ‖ epoch_start_timestamp i64 ‖ epoch u64 ‖ leader_schedule_epoch u64 ‖ unix_timestamp i64.
 */
export async function fetchClusterTime(conn: Connection): Promise<number> {
  const info = await conn.getAccountInfo(SYSVAR_CLOCK_PUBKEY, 'confirmed');
  if (!info || info.data.length < 40) throw new Error('Could not read the cluster clock');
  const view = new DataView(info.data.buffer, info.data.byteOffset, info.data.byteLength);
  return Number(view.getBigInt64(32, true));
}

/** Anchor's "unknown instruction" error: what a program built before Legacy answers to `inherit`. */
const INSTRUCTION_FALLBACK_NOT_FOUND = 101;

function customError(err: unknown): number | null {
  const ie = (err as { InstructionError?: [number, unknown] } | null)?.InstructionError;
  const inner = ie?.[1] as { Custom?: unknown } | undefined;
  return typeof inner?.Custom === 'number' ? inner.Custom : null;
}

/**
 * Whether the Bunker program on this cluster has Legacy. Simulates an `inherit` for `vault` with the
 * fee payer standing in for the heir (no signature checked, nothing lands, and it can never succeed:
 * the heir doesn't match): a program built before Legacy answers "unknown instruction" (Anchor 101),
 * one with it answers with its own error. `null` when the simulation can't tell (RPC error, a fee
 * payer the cluster doesn't know). Call it before signing a heir action: an older program refuses
 * the action only after the signature, and its leaf, are published.
 */
export async function programSupportsLegacy(conn: Connection, vault: Pick<VaultInfo, 'state' | 'wallet'>, feePayer: PublicKey): Promise<boolean | null> {
  try {
    const ix = inheritIx({ caller: feePayer, state: vault.state, wallet: vault.wallet, heir: feePayer, tokens: [] });
    const { blockhash } = await conn.getLatestBlockhash('confirmed');
    const message = new TransactionMessage({ payerKey: feePayer, recentBlockhash: blockhash, instructions: [ix] }).compileToLegacyMessage();
    const res = await conn.simulateTransaction(new VersionedTransaction(message), { sigVerify: false, replaceRecentBlockhash: true, commitment: 'confirmed' });
    if (!res.value.err) return true;
    const code = customError(res.value.err);
    if (code === INSTRUCTION_FALLBACK_NOT_FOUND) return false;
    return code !== null ? true : null;
  } catch {
    return null;
  }
}

export interface HeirStatus {
  /** Anyone can inherit now (the deadline has passed and nothing sealed the vault yet, or it is sealed already). */
  due: boolean;
  /** The vault was inherited: its key can never sign again; whatever arrives can be moved to the heir. */
  inherited: boolean;
  /** Seconds until the deadline (0 once due). */
  secondsLeft: number;
}

export function heirStatus(heir: HeirInfo, now: number): HeirStatus {
  const inherited = heir.inheritedAt !== null;
  const due = inherited || now >= heir.deadline;
  return { due, inherited, secondsLeft: due ? 0 : heir.deadline - now };
}

/** One vault token account an inherit transaction empties into the heir's (or, when empty, just closes to the heir). */
export interface InheritTokenPlan extends InheritTokenAccount {
  /** The vault's associated token account. */
  vaultAccount: PublicKey;
  /** The heir's associated token account (created by the caller when missing). */
  heirAccount: PublicKey;
  amount: bigint;
  decimals: number;
  /** The heir has no account for this token yet: the caller pays its rent. */
  createsHeirAccount: boolean;
  /** Token-2022 fees withheld in the vault's account are harvested first (permissionless), so it can close. */
  harvest: boolean;
}

/** A token account inherit leaves where it is, and why. */
export interface InheritSkip {
  mint: PublicKey;
  account: PublicKey;
  amount: bigint;
  reason: string;
}

export interface InheritPlan {
  vault: VaultInfo;
  heir: HeirInfo;
  /** The cluster clock when the plan was made. */
  now: number;
  /** SOL in the vault now: all of it goes to the heir (the last transaction sweeps what is left). */
  lamports: bigint;
  tokens: InheritTokenPlan[];
  skipped: InheritSkip[];
  /** Unsigned legacy transactions, fee payer = caller, in order. */
  transactions: Transaction[];
  /** The token accounts each transaction empties, index-aligned with `transactions` (the first one also moves the SOL). */
  batches: InheritTokenPlan[][];
}

function bumpIterations(owner: PublicKey, t: InheritTokenAccount): number {
  const [, bump] = PublicKey.findProgramAddressSync([owner.toBytes(), t.tokenProgram.toBytes(), t.mint.toBytes()], ASSOCIATED_TOKEN_PROGRAM_ID);
  return 255 - bump;
}

/** MEASUREMENTS.md inherit formula, exact for these token accounts (bumps computed locally). */
export function inheritComputeUnits(vaultWallet: PublicKey, heir: PublicKey, tokens: Array<Pick<InheritTokenPlan, 'mint' | 'tokenProgram' | 'createsHeirAccount' | 'harvest'>>): number {
  const C = COMPUTE_UNITS;
  let raw: number = C.inheritBase;
  let harvests = 0;
  for (const t of tokens) {
    raw += t.createsHeirAccount ? C.inheritPerCreated : C.inheritPerExisting;
    // Ours for the vault's and the heir's account, and the ATA program's own when it creates one.
    const heirIters = bumpIterations(heir, t);
    raw += C.pdaBumpIteration * (bumpIterations(vaultWallet, t) + heirIters + (t.createsHeirAccount ? heirIters : 0));
    if (t.harvest) harvests++;
  }
  const limit = Math.ceil((raw * C.executeFactorPercent) / 100 / C.roundTo) * C.roundTo;
  return Math.min(C.max, limit + harvests * C.harvestWithheld);
}

function skipReason(c: MintClassification | undefined, vaultAcc: TokenAccount, heirAcc: TokenAccount | null | 'foreign', heirExists: boolean): string | null {
  if (!c) return 'its mint could not be read';
  if (c.transferHookActive) return 'the token has a transfer hook, which Bunker never runs';
  if (c.risks.some((r) => r.id === 'nonTransferable')) return 'the token cannot be transferred at all';
  if (vaultAcc.isFrozen) return "the issuer froze the vault's account";
  if (heirAcc === 'foreign') return "the heir's account for this token now belongs to someone else";
  if (heirAcc?.isFrozen) return "the issuer froze the heir's account";
  // Token-2022 MemoTransfer: an incoming transfer needs a memo right before it, which inherit never sends.
  if (heirAcc && getMemoTransfer(heirAcc)?.requireIncomingTransferMemos) return "the heir's account for this token only accepts transfers with a memo (the heir can turn that off)";
  if (!heirExists && c.risks.some((r) => r.id === 'defaultFrozen')) return 'new accounts for this token start frozen, so the heir must open and thaw one first';
  return null;
}

/**
 * Plan and build the `inherit` transactions for a vault whose heir's deadline has passed. Every
 * canonical token account of the vault that can move is included (largest first is not attempted:
 * the order is stable by token program and mint), at most `maxTokensPerTx` per transaction and
 * within the legacy size limit; every transaction also sweeps the SOL left in the vault. Token
 * accounts that cannot move (transfer hook, frozen, non-transferable) are listed in `skipped`.
 *
 * Throws NoHeirError, InheritanceNotDueError, or when the vault is closed.
 */
export async function buildInheritTxs(p: {
  conn: Connection;
  state: PublicKey;
  /** The wallet that sends and pays (fees, and the rent of the heir's new token accounts). */
  caller: PublicKey;
  cluster?: ClusterName;
  maxTokensPerTx?: number;
  /** Unix time to compare the deadline with (defaults to the cluster clock). */
  now?: number;
}): Promise<InheritPlan> {
  if (p.cluster) assertClusterAllowed(p.cluster);
  const vault = await fetchVault(p.conn, p.state);
  if (!vault) throw new Error(`Vault ${p.state.toBase58()} does not exist`);
  if (vault.closed) throw new Error('This vault was closed: there is nothing left to inherit');
  const heir = await fetchHeir(p.conn, p.state);
  if (!heir) throw new NoHeirError(p.state);
  const now = p.now ?? (await fetchClusterTime(p.conn));
  if (heir.inheritedAt === null && now < heir.deadline) throw new InheritanceNotDueError(heir.deadline, now);
  // The program refuses an heir that is no longer a wallet; a closed vault's address still looks
  // like one but nothing could ever leave it, so honest clients refuse that too. Best effort: an RPC
  // that can't answer (no getProgramAccounts) doesn't block the inheritance.
  const [heirCheck] = await checkRecipients(p.conn, [heir.heir]).catch(() => [undefined]);
  if (heirCheck?.refuse) throw new HeirCannotReceiveError(heir.heir, heirCheck.refuse);

  const [spl, t22, walletInfo] = await Promise.all([
    p.conn.getTokenAccountsByOwner(vault.wallet, { programId: SPL_TOKEN_PROGRAM_ID }, 'confirmed'),
    p.conn.getTokenAccountsByOwner(vault.wallet, { programId: TOKEN_2022_PROGRAM_ID }, 'confirmed'),
    p.conn.getAccountInfo(vault.wallet, 'confirmed'),
  ]);
  const held: Array<{ address: PublicKey; program: PublicKey; acc: TokenAccount }> = [];
  const skipped: InheritSkip[] = [];
  for (const [list, program] of [[spl.value, SPL_TOKEN_PROGRAM_ID], [t22.value, TOKEN_2022_PROGRAM_ID]] as const) {
    for (const { pubkey, account } of list) {
      let acc: TokenAccount;
      try {
        acc = unpackAccount(pubkey, account, program);
      } catch {
        continue;
      }
      if (!ataOf(vault.wallet, acc.mint, program).equals(pubkey)) {
        skipped.push({ mint: acc.mint, account: pubkey, amount: acc.amount, reason: "it is not the vault's associated token account, which is the only kind Bunker ever moves" });
        continue;
      }
      held.push({ address: pubkey, program, acc });
    }
  }
  held.sort((a, b) => (a.program.equals(b.program) ? a.acc.mint.toBase58().localeCompare(b.acc.mint.toBase58()) : a.program.equals(SPL_TOKEN_PROGRAM_ID) ? -1 : 1));

  const heirAccounts = held.map((h) => ataOf(heir.heir, h.acc.mint, h.program));
  const [classes, heirInfos] = await Promise.all([
    fetchMintClassifications(p.conn, held.map((h) => h.acc.mint)),
    getMultipleAccountsBatched(p.conn, heirAccounts),
  ]);
  const tokens: InheritTokenPlan[] = [];
  held.forEach((h, i) => {
    const heirAccount = heirAccounts[i]!;
    const info = heirInfos[i];
    let heirAcc: TokenAccount | null | 'foreign' = null;
    if (info && info.data.length > 0) {
      try {
        const a = unpackAccount(heirAccount, info, h.program);
        heirAcc = a.owner.equals(heir.heir) && a.mint.equals(h.acc.mint) ? a : 'foreign';
      } catch {
        heirAcc = 'foreign';
      }
    }
    const c = classes.get(h.acc.mint.toBase58());
    const withheld = h.program.equals(TOKEN_2022_PROGRAM_ID) ? (getTransferFeeAmount(h.acc)?.withheldAmount ?? 0n) : 0n;
    // An empty account is only closed, its rent to the heir: no transfer, no hook, no heir account.
    const empty = h.acc.amount === 0n;
    const reason = empty
      ? h.acc.isFrozen
        ? "the issuer froze the vault's account"
        : withheld > 0n && !c
          ? 'it still holds withheld transfer fees and its mint could not be read'
          : null
      : skipReason(c, h.acc, heirAcc, heirAcc !== null);
    if (reason) {
      skipped.push({ mint: h.acc.mint, account: h.address, amount: h.acc.amount, reason });
      return;
    }
    tokens.push({
      mint: h.acc.mint,
      tokenProgram: h.program,
      vaultAccount: h.address,
      heirAccount,
      amount: h.acc.amount,
      decimals: c?.decimals ?? 0,
      createsHeirAccount: !empty && heirAcc === null,
      harvest: withheld > 0n,
    });
  });

  // Pack: as many token accounts per transaction as fit (by count and by serialized size).
  const max = Math.max(1, Math.min(p.maxTokensPerTx ?? INHERIT_MAX_TOKENS_PER_TX, INHERIT_MAX_TOKENS_PER_TX));
  const build = (batch: InheritTokenPlan[]): TransactionInstruction[] => [
    cuLimitIx(inheritComputeUnits(vault.wallet, heir.heir, batch)),
    ...batch.filter((t) => t.harvest).map((t) => createHarvestWithheldTokensToMintInstruction(t.mint, [t.vaultAccount], TOKEN_2022_PROGRAM_ID)),
    inheritIx({ caller: p.caller, state: vault.state, wallet: vault.wallet, heir: heir.heir, tokens: batch }),
  ];
  const batches: InheritTokenPlan[][] = [];
  let current: InheritTokenPlan[] = [];
  for (const t of tokens) {
    const next = [...current, t];
    if (next.length > max || measureTx(build(next), p.caller) > LEGACY_TX_LIMIT) {
      if (!current.length) throw new TransactionTooLargeError('An inherit transaction for one token account', measureTx(build(next), p.caller));
      batches.push(current);
      current = [t];
    } else {
      current = next;
    }
  }
  if (current.length || !batches.length) batches.push(current);
  const bh = await p.conn.getLatestBlockhash('confirmed');
  const transactions = batches.map((b) => makeTx(build(b), p.caller, bh));
  return { vault, heir, now, lamports: BigInt(walletInfo?.lamports ?? 0), tokens, skipped, transactions, batches };
}

/** "3 SOL, 1,000 USDC and 2 more tokens"-style line for UIs: what the plan moves, from the decoded amounts. */
export function summarizeInheritPlan(plan: InheritPlan, label: (mint: PublicKey) => string = (m) => `token ${shortAddress(m)}`): string {
  const parts: string[] = [];
  if (plan.lamports > 0n) parts.push(`${formatAmount(plan.lamports, 9)} SOL`);
  for (const t of plan.tokens) if (t.amount > 0n) parts.push(`${formatAmount(t.amount, t.decimals)} ${label(t.mint)}`);
  if (!parts.length) return 'nothing yet (the vault is empty)';
  return parts.length === 1 ? parts[0]! : `${parts.slice(0, -1).join(', ')} and ${parts[parts.length - 1]}`;
}
