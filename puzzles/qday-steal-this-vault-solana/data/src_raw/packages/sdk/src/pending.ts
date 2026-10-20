import { PublicKey } from '@solana/web3.js';
import type { Connection } from '@solana/web3.js';
import { base58, base64 } from '@scure/base';
import { decodeActionsTs, messagePrefixTs, parseMessage } from './actions';
import { BorshReader, bytesEqual, concatBytes } from './bytes';
import { CLUSTER_ID, IX_TAG, PROGRAM_ID } from './constants';
import type { ClusterName } from './constants';
import { describeActions, describeClose, describeRotate } from './describe';
import { IX_DISCRIMINATORS } from './instructions';
import type { LeafLedger } from './ledger';
import { withRateLimitRetry } from './rpcRetry';
import { SIG_BUFFER_DISCRIMINATOR, decodeSigBuffer } from './state';
import type { VaultInfo } from './state';
import { getWasm, initWasm } from './wasm';

/**
 * A signature of the vault's CURRENT key whose leaf the chain has not passed yet (leaf ≥ next_leaf).
 *
 * Signed messages carry no expiry and no fee-payer binding, so such a signature stays executable by
 * anyone who has it (message + signature) until a later leaf of this key lands or the vault rotates.
 * Signing something else in the meantime is how one approval turns into two: the old signature can
 * still land first. So prepare* refuses while one exists (PendingSignatureError) unless the caller
 * passes `abandonPending: true` after telling the user.
 */
export interface PendingSignature {
  state: PublicKey;
  rootEpoch: number;
  leafIndex: number;
  /** The plain-English statement it signs, when this device recorded the message. */
  summary?: string;
  kind?: 'execute' | 'rotate' | 'close';
  /** 'ledger': recorded and signed on this device; 'chain': seen on chain (signature buffer or a failed transaction). */
  source: 'ledger' | 'chain';
  /** This device holds the message and signature, so rebuildPrepared can finish sending it. */
  canFinish: boolean;
}

export class PendingSignatureError extends Error {
  readonly pending: PendingSignature[];
  constructor(pending: PendingSignature[]) {
    const first = pending[0]!;
    const what = first.summary ? `“${first.summary}”` : `an earlier signature (leaf ${first.leafIndex})`;
    const rotate = pending.some((p) => p.kind === 'rotate')
      ? ' If a pending rotation lands, the vault moves to the key it names: keep the seed you rotated to.'
      : '';
    super(
      `${what} has not landed yet and anyone holding it can still submit it until a later signature lands. ` +
        `Finish sending it, or confirm that you want to sign something else anyway.${rotate}`,
    );
    this.name = 'PendingSignatureError';
    this.pending = pending;
  }
}

/** History pages (getSignaturesForAddress, newest first) scanned back to the start of the epoch. */
const HISTORY_PAGE = 1000;
const HISTORY_MAX_PAGES = 20;
/** getTransactions batch size: small enough that a public RPC doesn't answer the burst with 429. */
const TX_BATCH = 25;

/**
 * The vault's history at its current key epoch is longer than the scan reads, and this device has
 * no record of signing at this epoch: a leaf revealed further back cannot be ruled out, so nothing
 * is signed (re-signing a revealed leaf with another message would allow a forgery).
 */
export class IncompleteHistoryError extends Error {
  constructor() {
    super(
      `This vault's history at its current key epoch is longer than ${HISTORY_PAGE * HISTORY_MAX_PAGES} transactions, and this device ` +
        'has no record of signing at this epoch, so it cannot rule out reusing a one-time key. Sign from the device that holds ' +
        "this vault's leaf ledger (the browser or CLI ledger file used before), or rotate from it first.",
    );
    this.name = 'IncompleteHistoryError';
  }
}

/** Borsh `Option<Vec<u8>>` / `Vec<u8>` readers over instruction data. */
function readVec(r: BorshReader): Uint8Array {
  return r.fixed(r.u32());
}
function readOptVec(r: BorshReader): Uint8Array | null {
  return r.u8() === 1 ? readVec(r) : null;
}

/**
 * Leaves of the vault's current epoch at or above next_leaf that the CHAIN shows as revealed (fully
 * or partly), so a device whose local ledger was lost (private window, cleared storage, another
 * origin) never signs one of them again with a different message. Fails closed: an RPC error throws.
 *
 * Only evidence nobody else can fabricate counts. Anyone can create a signature buffer for any vault
 * or submit a failing instruction naming any leaf, so counting those would let a stranger block a
 * vault or burn its leaves:
 *  - signature buffers, and init_sig_buffer instructions in the vault's history, paid by `feePayer`
 *    (only that key can sign them; buffers carry the epoch and leaf);
 *  - failed execute / rotate / close_vault instructions whose inline signature verifies under the
 *    vault's current root for the message they name (a real signature of this key, whoever sent it).
 */
export async function fetchRevealedLeaves(conn: Connection, p: { cluster: ClusterName; vault: VaultInfo; feePayer?: PublicKey }): Promise<number[]> {
  return (await scanRevealedLeaves(conn, p)).leaves;
}

/**
 * fetchRevealedLeaves plus whether the scan reached the start of the current key epoch (the rotate
 * that installed the current root, or open_vault at epoch 0). Evidence from any older transaction
 * belongs to a retired key and cannot matter; anything newer is read, up to HISTORY_MAX_PAGES pages.
 */
export async function scanRevealedLeaves(
  conn: Connection,
  p: { cluster: ClusterName; vault: VaultInfo; feePayer?: PublicKey },
): Promise<{ leaves: number[]; complete: boolean }> {
  await initWasm();
  const { vault, feePayer } = p;
  const leaves = new Set<number>();
  const epochBytes = new Uint8Array(4);
  new DataView(epochBytes.buffer).setUint32(0, vault.rootEpoch, true);

  // 1. Live signature buffers of this vault, epoch and fee payer (header: disc 8 ‖ state 32 ‖ payer 32 ‖ epoch u32 ‖ leaf u32).
  const buffers = !feePayer ? [] : await withRateLimitRetry('the signature-buffer lookup', () => conn.getProgramAccounts(PROGRAM_ID, {
    commitment: 'confirmed',
    filters: [
      { memcmp: { offset: 0, bytes: base58.encode(SIG_BUFFER_DISCRIMINATOR) } },
      { memcmp: { offset: 8, bytes: vault.state.toBase58() } },
      { memcmp: { offset: 40, bytes: feePayer.toBase58() } },
      { memcmp: { offset: 72, bytes: base58.encode(epochBytes) } },
    ],
  }));
  for (const { pubkey, account } of buffers) {
    const b = decodeSigBuffer(pubkey, account.data);
    if (feePayer && b.state.equals(vault.state) && b.payer.equals(feePayer) && b.rootEpoch === vault.rootEpoch && b.leafIndex >= vault.nextLeaf) leaves.add(b.leafIndex);
  }

  // 2. The state account's history, newest first, back to the start of the current epoch.
  const w = getWasm();
  /** Records evidence in one transaction; true when it is the transaction that started this epoch. */
  const scanTx = (tx: Awaited<ReturnType<Connection['getTransactions']>>[number]): boolean => {
    if (!tx) return false;
    const failed = tx.meta?.err != null;
    const msg = tx.transaction.message;
    const keys = msg.staticAccountKeys;
    const paidByUs = !!feePayer && !!keys[0]?.equals(feePayer);
    let epochStart = false;
    for (const ix of msg.compiledInstructions) {
      if (!keys[ix.programIdIndex]?.equals(PROGRAM_ID)) continue;
      const data = ix.data;
      if (data.length < 8) continue;
      const disc = data.subarray(0, 8);
      if (!failed && bytesEqual(disc, IX_DISCRIMINATORS.openVault)) epochStart ||= vault.rootEpoch === 0;
      if (data.length < 12) continue;
      try {
        const r = new BorshReader(data);
        r.fixed(8);
        if (bytesEqual(disc, IX_DISCRIMINATORS.initSigBuffer)) {
          const epoch = r.u32();
          const leaf = r.u32();
          if (paidByUs && epoch === vault.rootEpoch && leaf >= vault.nextLeaf) leaves.add(leaf);
          continue;
        }
        let tag: number;
        let payload: Uint8Array;
        const leaf = r.u32();
        if (bytesEqual(disc, IX_DISCRIMINATORS.execute)) {
          tag = IX_TAG.execute;
          payload = readVec(r);
        } else if (bytesEqual(disc, IX_DISCRIMINATORS.rotate)) {
          tag = IX_TAG.rotate;
          payload = r.fixed(48);
          // The successful rotate that installed the current root opened this epoch.
          if (!failed && bytesEqual(payload, vault.currentRoot)) epochStart = true;
        } else if (bytesEqual(disc, IX_DISCRIMINATORS.closeVault)) {
          tag = IX_TAG.close;
          payload = r.fixed(32);
        } else continue;
        if (!failed) continue;
        const sig = readOptVec(r);
        if (!sig || leaf < vault.nextLeaf) continue;
        const message = concatBytes(messagePrefixTs(CLUSTER_ID[p.cluster], tag, vault.state, vault.rootEpoch, leaf), payload);
        if (w.verify(vault.currentRoot, message, sig)) leaves.add(leaf);
      } catch {
        /* malformed instruction data: not evidence */
      }
    }
    return epochStart;
  };

  let complete = false;
  let before: string | undefined;
  pages: for (let page = 0; page < HISTORY_MAX_PAGES; page++) {
    const sigs = await withRateLimitRetry('the vault history', () => conn.getSignaturesForAddress(vault.state, { limit: HISTORY_PAGE, before }, 'confirmed'));
    for (let i = 0; i < sigs.length; i += TX_BATCH) {
      const txs = await withRateLimitRetry('the vault history', () =>
        conn.getTransactions(
          sigs.slice(i, i + TX_BATCH).map((x) => x.signature),
          { commitment: 'confirmed', maxSupportedTransactionVersion: 1 },
        ),
      );
      for (const tx of txs) {
        if (scanTx(tx)) {
          complete = true;
          break pages;
        }
      }
    }
    if (sigs.length < HISTORY_PAGE) {
      complete = true;
      break;
    }
    before = sigs[sigs.length - 1]!.signature;
  }
  return { leaves: [...leaves].sort((a, b) => a - b), complete };
}

function summarize(message: Uint8Array): { summary?: string; kind?: PendingSignature['kind'] } {
  try {
    const m = parseMessage(message);
    if (m.tag === IX_TAG.execute) return { kind: 'execute', summary: describeActions(decodeActionsTs(m.payload), {}) };
    if (m.tag === IX_TAG.rotate) return { kind: 'rotate', summary: describeRotate(m.rootEpoch) };
    if (m.tag === IX_TAG.close) return { kind: 'close', summary: describeClose(new PublicKey(m.payload)) };
  } catch {
    /* fall through: shown without a summary */
  }
  return {};
}

/**
 * Pending signatures of the vault's current key (see PendingSignature) and the lowest leaf that is
 * safe to sign next: above next_leaf, every leaf this device recorded and every leaf the chain shows
 * as revealed.
 */
export async function findPendingSignatures(p: {
  conn: Connection;
  cluster: ClusterName;
  vault: VaultInfo;
  ledger: LeafLedger;
  /** The fee payer that will sign: buffers and buffer inits it paid for count as revealed. */
  feePayer?: PublicKey;
}): Promise<{ pending: PendingSignature[]; floor: number }> {
  const { vault, ledger } = p;
  const byLeaf = new Map<number, PendingSignature>();
  for (const e of ledger.list(vault.state)) {
    if (e.epoch !== vault.rootEpoch || e.leaf < vault.nextLeaf || !e.signature) continue;
    byLeaf.set(e.leaf, {
      state: vault.state,
      rootEpoch: e.epoch,
      leafIndex: e.leaf,
      source: 'ledger',
      canFinish: true,
      ...summarize(base64.decode(e.message)),
    });
  }
  const scan = await scanRevealedLeaves(p.conn, { cluster: p.cluster, vault, feePayer: p.feePayer });
  // Without the whole epoch's history, only a device that has signed at this epoch (its ledger
  // carries the floor) may continue; a device with no record could re-sign a revealed leaf.
  if (!scan.complete && !ledger.list(vault.state).some((e) => e.epoch === vault.rootEpoch)) throw new IncompleteHistoryError();
  const revealed = scan.leaves;
  for (const leaf of revealed) {
    if (!byLeaf.has(leaf)) byLeaf.set(leaf, { state: vault.state, rootEpoch: vault.rootEpoch, leafIndex: leaf, source: 'chain', canFinish: false });
  }
  const pending = [...byLeaf.values()].sort((a, b) => a.leafIndex - b.leafIndex);
  const floor = Math.max(
    ledger.nextFree(vault.state, vault.rootEpoch, vault.nextLeaf, vault.currentRoot),
    revealed.length ? revealed[revealed.length - 1]! + 1 : 0,
  );
  return { pending, floor };
}
