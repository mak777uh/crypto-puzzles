var e=`// prepareExecute / prepareRotate / prepareClose / rebuildPrepared.
//
// Order of operations (MESSAGE_FORMAT §5): fresh vault state → seed check (the vault's key at its
// epoch, bound to this cluster, program and vault: §2) → preflight checks that would otherwise burn a
// leaf → leaf = ledger.nextFree (per vault/epoch and per LMS key identity) → message (WASM,
// cross-checked) → transaction packing measured with a placeholder signature →
// ledger.markSpent(message) → sign (WASM, same key binding) → local verify →
// ledger.markSpent(signature) → transactions.

import { PublicKey } from '@solana/web3.js';
import type { Connection, Transaction, TransactionInstruction } from '@solana/web3.js';
import { createAssociatedTokenAccountIdempotentInstruction, getTransferFeeAmount, unpackAccount } from '@solana/spl-token';
import { base64 } from '@scure/base';
import { bytesEqual, concatBytes, sha256, toHex } from './bytes';
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  CLUSTER_ID,
  COMPUTE_UNITS,
  HEIR_RECORD_SIZE,
  IX_TAG,
  LOW_LEAVES_WARNING,
  PROGRAM_ID,
  RESERVED_LEAVES,
  ROOT_LEN,
  SIG_LEN,
  V1_LOADED_ACCOUNTS_DATA_SIZE_LIMIT,
  V1_TX_LIMIT,
  SPL_TOKEN_PROGRAM_ID,
  TOKEN_2022_PROGRAM_ID,
} from './constants';
import type { ClusterName, IxTagName } from './constants';
import { assertClusterAllowed } from './cluster';
import { ataOf, findHeirPda, findSigBufferPda } from './addresses';
import { decodeActions, encodeActions, isHeirAction, messagePrefixTs, parseMessage, validateActions } from './actions';
import type { VaultAction } from './actions';
import { describeActions, describeClose, describeRotate, formatAmount, formatDays, shortAddress } from './describe';
import type { TokenMeta } from './describe';
import { closeVaultIx, executeIx, rotateIx } from './instructions';
import type { SigSource } from './instructions';
import type { LeafLedger } from './ledger';
import { deriveRoot, keyBinding, plainMnemonic, vaultKeyContext } from './keys';
import { PendingSignatureError, findPendingSignatures } from './pending';
import { checkRecipients } from './recipients';
import type { RecipientCheck } from './recipients';
import { programSupportsLegacy } from './legacy';
import { decodeSigBuffer, fetchHeir, fetchVault, findHeirRecordsNaming } from './state';
import type { HeirInfo, VaultInfo } from './state';
import { fetchMintClassifications, getMultipleAccountsBatched, mintClassificationToMeta } from './assets';
import type { MintClassification } from './assets';
import { buildBufferPathTxs, diffRanges, estimateV1TxSize, TransactionTooLargeError } from './transport';
import type { Transport } from './transport';
import { getWasm, initWasm } from './wasm';

export interface PreparedSignature {
  leafIndex: number;
  rootEpoch: number;
  /** The exact signed bytes M. */
  message: Uint8Array;
  /** What the signature allows, generated from the decoded signed payload. */
  summary: string;
  /**
   * Buffer transport: sign all with the fee payer (signAllTransactions), then sendPrepared() in
   * order. Empty for the inline transport (see \`inline\`).
   */
  transactions: Transaction[];
  // ---- extensions (not in SPEC §3) ----
  kind: IxTagName;
  state: PublicKey;
  messageHash: Uint8Array;
  signature: Uint8Array;
  /** Signature buffer PDA (buffer transport), null for inline. */
  sigBuffer: PublicKey | null;
  transport: Transport;
  /**
   * Inline transport only: the final instruction(s) with the signature inline, for a v1
   * (4,096-byte) transaction built by the caller. Set the v1 header's computeUnitLimit and
   * loadedAccountsDataSizeLimit (no ComputeBudget instructions; they are ignored in v1).
   */
  inline?: InlineBundle;
  /** Leaves left on this key once this signature lands. */
  leavesLeft: number;
  /** True when leavesLeft < LOW_LEAVES_WARNING (execute/close): offer rotate. */
  lowLeaves: boolean;
  warnings: string[];
  /** Compute-unit limit of the final transaction. */
  computeUnits: number;
  /** execute: actions decoded from the signed payload. */
  actions?: VaultAction[];
  /** rotate: the root the vault rotates to. */
  newRoot?: Uint8Array;
  /** Signers besides the fee payer needed on the final transaction (hybrid cosigner). */
  extraSigners: PublicKey[];
}

export interface InlineBundle {
  instructions: TransactionInstruction[];
  computeUnitLimit: number;
  loadedAccountsDataSizeLimit: number;
  /** Estimated serialized v1 size (≤ V1_TX_LIMIT, checked before signing). */
  estimatedSize: number;
}

interface BaseParams {
  conn: Connection;
  cluster: ClusterName;
  vault: VaultInfo;
  mnemonic: string;
  feePayer: PublicKey;
  ledger: LeafLedger;
  /**
   * 'buffer' (default; legacy transactions, every wallet). 'inline': the signature rides in the
   * final instruction of ONE v1 transaction that the caller builds from \`inline\` (web3.js v1 cannot
   * build v1 transactions; the CLI uses @solana/kit). Only for callers that hold the fee-payer key or
   * whose wallet advertises v1 support.
   */
  transport?: Transport;
  /**
   * Called after every check and before the leaf is recorded or anything is signed. Return false to
   * cancel (throws PrepareCancelledError; nothing is recorded, no leaf is used).
   */
  confirm?: (preview: SignaturePreview) => boolean | Promise<boolean>;
  /**
   * Sign even though an earlier signature of this vault's current key is still pending (see
   * findPendingSignatures). That signature stays executable by anyone who has it until a later leaf
   * lands or the vault rotates, so both could execute. Default false: prepare* throws
   * PendingSignatureError and the caller either finishes it (rebuildPrepared) or asks the user.
   */
  abandonPending?: boolean;
}

export interface SignaturePreview {
  kind: IxTagName;
  summary: string;
  leafIndex: number;
  rootEpoch: number;
  warnings: string[];
  transactionCount: number;
  leavesLeft: number;
}

export class PrepareCancelledError extends Error {
  constructor() {
    super('Cancelled before signing; no leaf was used');
    this.name = 'PrepareCancelledError';
  }
}

export interface PrepareExecuteParams extends BaseParams {
  actions: VaultAction[];
  /** Create missing destination ATAs (payer = fee payer) in the final transaction; needs destinationOwner. */
  createDestinationAtas?: boolean;
  /** Skip balance/account preflight checks (tests only: a failing transaction still burns the leaf). */
  skipPreflight?: boolean;
  /** Labels for known wallets in the summary, e.g. fee payer → "your wallet" (see DescribeOptions). */
  addressLabels?: Map<string, string>;
}

export interface PrepareRotateParams extends BaseParams {
  /**
   * Rotate to a different (fresh) seed's key for this vault at epoch + 1 (bound to the vault id, like
   * every key after epoch 0); default: the same seed's key at epoch + 1.
   */
  newMnemonic?: string;
}

export interface PrepareCloseParams extends BaseParams {
  rentTo: PublicKey;
  /**
   * Token accounts the issuer has frozen, which can never be moved or closed (a griefer can create
   * one by sending a frozen junk token). Closing the vault abandons them; list them here to close
   * anyway. Every other token account must be emptied and closed first.
   */
  abandonTokenAccounts?: PublicKey[];
}

/** Closing would abandon issuer-frozen token accounts the caller has not listed in abandonTokenAccounts. */
export class FrozenTokenAccountsError extends Error {
  readonly accounts: PublicKey[];
  constructor(accounts: PublicKey[]) {
    super(
      \`\${accounts.length} token account(s) in this vault are frozen by their issuer and can never be moved or closed: \` +
        \`\${accounts.map((a) => a.toBase58()).join(', ')}. Closing the vault abandons them. To close anyway, confirm abandoning \` +
        'exactly these accounts (SDK: abandonTokenAccounts; CLI: --abandon-token-account <address>).',
    );
    this.name = 'FrozenTokenAccountsError';
    this.accounts = accounts;
  }
}

/** Everything about the final instruction that is independent of the signature. */
interface Plan {
  kind: IxTagName;
  payload: Uint8Array;
  /** Final-transaction instructions for a leaf and signature source. */
  finalIxs: (leaf: number, s: SigSource) => TransactionInstruction[];
  computeUnits: number;
  summary: string;
  /** Leaves this kind may use: leaf < maxLeafExclusive. */
  maxLeafExclusive: number;
  warnings: string[];
  context?: Record<string, string>;
  actions?: VaultAction[];
  newRoot?: Uint8Array;
}

function assertTransport(t: Transport | undefined): Transport {
  const transport = t ?? 'buffer';
  if (transport !== 'buffer' && transport !== 'inline') throw new Error(\`unknown transport \${String(transport)}\`);
  return transport;
}

/** Legacy: closing a vault that other vaults name as their heir loses whatever they would leave it. */
export function heirOfWarning(records: HeirInfo[] | null): string[] {
  const live = (records ?? []).filter((r) => r.inheritedAt === null);
  if (!live.length) return [];
  const which = live.map((r) => shortAddress(r.state)).join(', ');
  return [
    \`This vault is the heir of \${live.length === 1 ? 'another vault' : \`\${live.length} other vaults\`} (\${which}). Once it is closed, \` +
      'whatever they leave it would be lost for good: ask their owners to name another address first.',
  ];
}

/** The vault was inherited (Legacy): its key can never sign again. */
export class VaultInheritedError extends Error {
  readonly heir: HeirInfo;
  constructor(heir: HeirInfo) {
    super(
      \`This vault was inherited by \${heir.heir.toBase58()}: its key can never sign again. \` +
        'Anything that still arrives in it can only be moved to that heir (inherit).',
    );
    this.name = 'VaultInheritedError';
    this.heir = heir;
  }
}

async function freshVault(conn: Connection, vault: VaultInfo | PublicKey): Promise<VaultInfo> {
  const state = 'state' in vault ? vault.state : vault;
  const v = await fetchVault(conn, state);
  if (!v) throw new Error(\`Vault \${state.toBase58()} does not exist\`);
  if (v.closed) throw new Error(\`Vault \${state.toBase58()} is closed\`);
  // An inherited vault has every leaf of its key marked used (the seal): say why, not "no leaves left".
  if (v.nextLeaf >= v.treeSize) {
    const heir = await fetchHeir(conn, state).catch(() => null);
    if (heir?.inheritedAt != null) throw new VaultInheritedError(heir);
  }
  return v;
}

/**
 * The seed's key for this vault at its current epoch (bound to the cluster, the program and the
 * vault: options at epoch 0, vault id afterwards) must be the on-chain current_root.
 */
async function checkSeed(mnemonic: string, vault: VaultInfo, cluster: ClusterName): Promise<void> {
  const root = await deriveRoot(mnemonic, vault.rootEpoch, vaultKeyContext(vault, vault.rootEpoch, cluster));
  if (!bytesEqual(root, vault.currentRoot)) {
    throw new Error(\`This seed does not control this vault at epoch \${vault.rootEpoch}\`);
  }
}

function cosignerWarning(vault: VaultInfo): string[] {
  return vault.cosigner
    ? [\`This vault is in hybrid mode: its cosigner \${vault.cosigner.toBase58()} must also sign the final transaction.\`]
    : [];
}

// ---- execute ----

interface ExecuteContext {
  metas: Map<string, TokenMeta>;
  owners: Map<string, PublicKey>;
  creates: Array<{ dest: PublicKey; owner: PublicKey; mint: PublicKey; tokenProgram: PublicKey }>;
  warnings: string[];
}

/** Checks that would otherwise make the final transaction fail (and burn a leaf). */
async function inspectExecute(
  conn: Connection,
  vault: VaultInfo,
  actions: VaultAction[],
  opts: { createDestinationAtas: boolean; strict: boolean; knownOwners?: Map<string, PublicKey>; feePayer?: PublicKey },
): Promise<ExecuteContext> {
  const fail = (msg: string): void => {
    if (opts.strict) throw new Error(msg);
  };
  const warnings: string[] = [];
  const recipientNotes = (checks: RecipientCheck[]): void => {
    for (const c of checks) {
      if (c.refuse) fail(c.refuse);
      else if (c.warn) warnings.push(c.warn);
    }
  };
  const tokenActions = actions.flatMap((a) => (a.kind === 'transferToken' || a.kind === 'closeTokenAccount' ? [a] : []));
  const mints = tokenActions.map((a) => a.mint);
  const sources = tokenActions.map((a) => ataOf(vault.wallet, a.mint, a.tokenProgram));
  const dests = actions.flatMap((a) => (a.kind === 'transferToken' ? [a.destination] : []));
  const solTos = actions.flatMap((a) => (a.kind === 'transferSol' ? [a.to] : []));
  const tokenOwners = actions.flatMap((a) => (a.kind === 'transferToken' && a.destinationOwner ? [a.destinationOwner] : []));
  const heirAction = actions.find(isHeirAction);
  const newHeir = heirAction?.kind === 'setHeir' ? [heirAction.heir] : [];

  const [classes, infos, rentMin, recipients, heirRecord, recordRent, feePayerLamports, legacy] = await Promise.all([
    fetchMintClassifications(conn, mints),
    getMultipleAccountsBatched(conn, [vault.wallet, ...sources, ...dests, ...solTos]),
    conn.getMinimumBalanceForRentExemption(0, 'confirmed'),
    checkRecipients(conn, [...solTos, ...tokenOwners, ...newHeir]),
    heirAction ? fetchHeir(conn, vault.state) : Promise.resolve(null),
    heirAction?.kind === 'setHeir' ? conn.getMinimumBalanceForRentExemption(HEIR_RECORD_SIZE, 'confirmed') : Promise.resolve(0),
    heirAction?.kind === 'setHeir' && opts.feePayer ? conn.getBalance(opts.feePayer, 'confirmed') : Promise.resolve(null),
    heirAction && opts.feePayer ? programSupportsLegacy(conn, vault, opts.feePayer) : Promise.resolve(null),
  ]);
  if (legacy === false) {
    fail('The Bunker program on this cluster predates Legacy: it would refuse this heir action, but only after the signature (and its leaf) were published');
  }
  recipientNotes(recipients);
  if (heirAction) inspectHeirAction(vault, heirAction, heirRecord, { recipients, recordRent, feePayerLamports, fail, warnings });
  const metas = new Map<string, TokenMeta>();
  for (const [k, c] of classes) metas.set(k, mintClassificationToMeta(c));

  const accountAt = new Map<string, ReturnType<typeof unpackAccount> | null>();
  [...sources, ...dests].forEach((addr, i) => {
    const info = infos[i + 1];
    if (!info) {
      accountAt.set(addr.toBase58(), null);
      return;
    }
    try {
      accountAt.set(addr.toBase58(), unpackAccount(addr, info, info.owner));
    } catch {
      accountAt.set(addr.toBase58(), null);
    }
  });

  const solBalance = new Map<string, bigint>();
  solTos.forEach((to, i) => {
    const info = infos[1 + sources.length + dests.length + i];
    solBalance.set(to.toBase58(), BigInt(info?.lamports ?? 0));
  });
  const owners = new Map<string, PublicKey>(opts.knownOwners ?? []);
  const creates: ExecuteContext['creates'] = [];
  let lamports = BigInt(infos[0]?.lamports ?? 0);
  const balances = new Map<string, bigint>();
  const balanceOf = (addr: PublicKey): bigint => {
    const k = addr.toBase58();
    if (!balances.has(k)) balances.set(k, accountAt.get(k)?.amount ?? 0n);
    return balances.get(k) as bigint;
  };
  const forbidden = (pk: PublicKey): boolean => pk.equals(vault.wallet) || pk.equals(vault.state);

  for (const [i, a] of actions.entries()) {
    const n = \`action \${i + 1}\`;
    if (isHeirAction(a)) continue; // inspectHeirAction
    if (a.kind === 'transferSol') {
      if (forbidden(a.to)) fail(\`\${n}: cannot send SOL to the vault itself\`);
      lamports -= a.lamports;
      if (lamports < 0n) fail(\`\${n}: the vault does not hold enough SOL (short by \${formatAmount(-lamports, 9)} SOL)\`);
      const before = solBalance.get(a.to.toBase58()) ?? 0n;
      if (before + a.lamports < BigInt(rentMin)) {
        fail(\`\${n}: \${shortAddress(a.to)} would hold less than the rent-exempt minimum (\${formatAmount(BigInt(rentMin), 9)} SOL); send more\`);
      }
      solBalance.set(a.to.toBase58(), before + a.lamports);
      continue;
    }
    const cls: MintClassification | undefined = classes.get(a.mint.toBase58());
    if (!cls) {
      fail(\`\${n}: mint \${a.mint.toBase58()} not found\`);
      continue;
    }
    if (!cls.tokenProgram.equals(a.tokenProgram)) fail(\`\${n}: mint is owned by \${cls.tokenProgram.toBase58()}, not the signed token program\`);
    if (cls.transferHookActive || cls.risks.some((r) => r.id === 'nonTransferable')) {
      fail(\`\${n}: \${cls.unsupportedReason ?? 'this token cannot be moved by the vault'}\`);
    } else if (!cls.supported) {
      warnings.push(\`\${n}: \${cls.unsupportedReason ?? 'unsupported token'}; the transfer may fail.\`);
    }
    const source = ataOf(vault.wallet, a.mint, a.tokenProgram);
    const src = accountAt.get(source.toBase58());
    if (!src) {
      fail(\`\${n}: the vault has no \${shortAddress(a.mint)} token account\`);
      continue;
    }
    if (src.isFrozen) fail(\`\${n}: the vault's token account is frozen by the issuer\`);
    const meta = metas.get(a.mint.toBase58());
    const fmt = (x: bigint) => formatAmount(x, meta?.decimals ?? 0);

    if (a.kind === 'transferToken') {
      const bal = balanceOf(source);
      if (bal < 0n) fail(\`\${n}: an earlier action in this signature closes that token account\`);
      else if (bal < a.amount) fail(\`\${n}: the vault holds \${fmt(bal)}, cannot send \${fmt(a.amount)}\`);
      balances.set(source.toBase58(), bal - a.amount);
      if (a.destination.equals(source)) fail(\`\${n}: destination is the vault's own token account\`);
      if (a.destinationOwner) {
        const expected = ataOf(a.destinationOwner, a.mint, a.tokenProgram);
        if (!expected.equals(a.destination)) throw new Error(\`\${n}: destination is not the ATA of \${a.destinationOwner.toBase58()}\`);
        owners.set(a.destination.toBase58(), a.destinationOwner);
      }
      const dst = accountAt.get(a.destination.toBase58());
      if (dst) {
        if (!dst.mint.equals(a.mint)) fail(\`\${n}: destination token account is for a different mint\`);
        if (dst.isFrozen) fail(\`\${n}: destination token account is frozen\`);
        if (dst.owner.equals(vault.wallet)) fail(\`\${n}: destination token account belongs to the vault itself\`);
        owners.set(a.destination.toBase58(), dst.owner);
      } else {
        const owner = owners.get(a.destination.toBase58());
        if (opts.createDestinationAtas && owner) {
          if (!creates.some((c) => c.dest.equals(a.destination))) {
            creates.push({ dest: a.destination, owner, mint: a.mint, tokenProgram: a.tokenProgram });
          }
        } else {
          fail(
            \`\${n}: destination token account \${a.destination.toBase58()} does not exist \` +
              '(set destinationOwner and createDestinationAtas to create it)',
          );
        }
      }
    } else {
      if (forbidden(a.rentTo)) fail(\`\${n}: rent cannot go to the vault itself\`);
      const bal = balanceOf(source);
      if (bal < 0n) fail(\`\${n}: an earlier action in this signature already closes that token account\`);
      else if (bal !== 0n) fail(\`\${n}: the token account still holds \${fmt(bal)}; withdraw it first (same execute is fine)\`);
      if (a.tokenProgram.equals(TOKEN_2022_PROGRAM_ID)) {
        const withheld = getTransferFeeAmount(src)?.withheldAmount ?? 0n;
        if (withheld > 0n) fail(\`\${n}: \${fmt(withheld)} of withheld transfer fees must be harvested before closing\`);
      }
      balances.set(source.toBase58(), -1n); // closed: later actions on it fail
    }
  }
  if (lamports > 0n && lamports < BigInt(rentMin)) {
    fail(
      \`SOL leaving the vault must leave it at exactly 0 or at least \${formatAmount(BigInt(rentMin), 9)} SOL \` +
        \`(it would hold \${formatAmount(lamports, 9)} SOL)\`,
    );
  }
  return { metas, owners, creates, warnings };
}

/**
 * Legacy preflight: what the program would refuse (the leaf would be revealed for nothing), and a
 * note when the heir is a plain wallet rather than a Bunker vault.
 */
function inspectHeirAction(
  vault: VaultInfo,
  a: Extract<VaultAction, { kind: 'setHeir' | 'checkIn' | 'clearHeir' }>,
  record: HeirInfo | null,
  o: { recipients: RecipientCheck[]; recordRent: number; feePayerLamports: number | null; fail: (m: string) => void; warnings: string[] },
): void {
  if (record?.inheritedAt != null) {
    o.fail('This vault was inherited: its heir can no longer change');
    return;
  }
  if (a.kind === 'setHeir') {
    const [recordAddress] = findHeirPda(vault.state);
    if (a.heir.equals(vault.wallet) || a.heir.equals(vault.state) || a.heir.equals(recordAddress)) {
      o.fail('A vault cannot be its own heir');
    }
    const check = o.recipients.find((c) => c.address.equals(a.heir));
    if (check && !check.refuse && !check.vault) {
      o.warnings.push(
        \`The heir \${shortAddress(a.heir)} is a regular wallet: once inherited, everything is protected only by that wallet's Ed25519 key. \` +
          "Naming the heir's own Bunker vault keeps it behind a hash key.",
      );
    }
    if (!record && o.feePayerLamports !== null && o.feePayerLamports < o.recordRent + 1_000_000) {
      o.fail(\`The fee payer needs about \${formatAmount(BigInt(o.recordRent), 9)} SOL for the heir record's rent, plus fees (the rent comes back to the vault if the heir is removed)\`);
    }
    return;
  }
  if (!record) {
    o.fail('This vault has no heir');
    return;
  }
  if (!record.heir.equals(a.heir)) {
    o.fail(\`The vault's heir is \${record.heir.toBase58()}, not \${a.heir.toBase58()}\`);
  } else if (a.kind === 'checkIn' && record.inactivityDays !== a.inactivityDays) {
    o.fail(\`The heir's countdown is \${formatDays(record.inactivityDays)}, not \${formatDays(a.inactivityDays)}\`);
  }
}

/**
 * MEASUREMENTS.md execute formula, exact for these actions (bumps computed locally): the vault ATA of
 * each token action and, for SetHeir, the heir record PDA (pass the vault's \`state\`).
 */
export function executeComputeUnits(actions: VaultAction[], wallet: PublicKey, createdAtas: number, state?: PublicKey): number {
  const C = COMPUTE_UNITS;
  let raw = C.executeBase;
  for (const a of actions) {
    raw += C[a.kind];
    if (a.kind === 'transferToken' || a.kind === 'closeTokenAccount') {
      const [, bump] = PublicKey.findProgramAddressSync(
        [wallet.toBytes(), a.tokenProgram.toBytes(), a.mint.toBytes()],
        ASSOCIATED_TOKEN_PROGRAM_ID,
      );
      raw += C.pdaBumpIteration * (255 - bump);
    } else if (a.kind === 'setHeir') {
      // Without the state, assume the worst bump the one-size constants allow (24 iterations).
      raw += C.pdaBumpIteration * (state ? 255 - findHeirPda(state)[1] : 24);
    }
  }
  const limit = Math.ceil((raw * C.executeFactorPercent) / 100 / C.roundTo) * C.roundTo;
  return Math.min(C.max, limit + createdAtas * C.createAtaIdempotent);
}

function planExecute(
  vault: VaultInfo,
  feePayer: PublicKey,
  actions: VaultAction[],
  payload: Uint8Array,
  ctx: ExecuteContext,
  addressLabels?: Map<string, string>,
): Plan {
  const decoded = decodeActions(payload); // what is signed, via the Rust decoder
  const createIxs = ctx.creates.map((c) =>
    createAssociatedTokenAccountIdempotentInstruction(feePayer, c.dest, c.owner, c.mint, c.tokenProgram),
  );
  const context: Record<string, string> = { kind: 'execute' };
  for (const [dest, owner] of ctx.owners) context[\`owner:\${dest}\`] = owner.toBase58();
  return {
    kind: 'execute',
    payload,
    finalIxs: (leaf, s) => [
      ...createIxs,
      executeIx({
        feePayer,
        state: vault.state,
        wallet: vault.wallet,
        cosigner: vault.cosigner,
        leafIndex: leaf,
        payload,
        actions: decoded,
        ...s,
      }),
    ],
    computeUnits: executeComputeUnits(decoded, vault.wallet, createIxs.length, vault.state),
    summary: describeActions(decoded, ctx.metas, { tokenAccountOwners: ctx.owners, ...(addressLabels ? { addressLabels } : {}) }),
    maxLeafExclusive: vault.treeSize - RESERVED_LEAVES,
    warnings: [...ctx.warnings, ...cosignerWarning(vault)],
    context,
    actions: decoded.map((d, i) => {
      const orig = actions[i];
      return d.kind === 'transferToken' && orig?.kind === 'transferToken' && orig.destinationOwner
        ? { ...d, destinationOwner: orig.destinationOwner }
        : d;
    }),
  };
}

// ---- transactions ----

interface Built {
  transactions: Transaction[];
  sigBuffer: PublicKey | null;
  inline?: InlineBundle;
}

function buildTransactions(
  plan: Plan,
  vault: VaultInfo,
  feePayer: PublicKey,
  leaf: number,
  signature: Uint8Array,
  blockhash: { blockhash: string; lastValidBlockHeight: number },
  transport: Transport,
  resume?: { skipInit: boolean; ranges: Array<[number, number]> },
): Built {
  if (transport === 'inline') {
    const instructions = plan.finalIxs(leaf, { sig: signature, sigBuffer: null });
    const estimatedSize = estimateV1TxSize(instructions, feePayer);
    if (estimatedSize > V1_TX_LIMIT) throw new TransactionTooLargeError('The inline-signature v1 transaction', estimatedSize, V1_TX_LIMIT);
    return {
      transactions: [],
      sigBuffer: null,
      inline: {
        instructions,
        computeUnitLimit: plan.computeUnits,
        loadedAccountsDataSizeLimit: V1_LOADED_ACCOUNTS_DATA_SIZE_LIMIT,
        estimatedSize,
      },
    };
  }
  const [sigBuffer] = findSigBufferPda(vault.state, feePayer, vault.rootEpoch, leaf);
  const transactions = buildBufferPathTxs({
    feePayer,
    state: vault.state,
    sigBuffer,
    rootEpoch: vault.rootEpoch,
    leafIndex: leaf,
    signature,
    finalInstructions: plan.finalIxs(leaf, { sig: null, sigBuffer }),
    finalComputeUnits: plan.computeUnits,
    blockhash,
    ...(resume ? { skipInit: resume.skipInit, ranges: resume.ranges } : {}),
  });
  return { transactions, sigBuffer };
}

function buildMessage(cluster: ClusterName, vault: VaultInfo, tag: number, leaf: number, payload: Uint8Array): Uint8Array {
  const m = getWasm().message(CLUSTER_ID[cluster], PROGRAM_ID.toBytes(), tag, vault.state.toBytes(), vault.rootEpoch, leaf, payload);
  const mirror = concatBytes(messagePrefixTs(CLUSTER_ID[cluster], tag, vault.state, vault.rootEpoch, leaf), payload);
  if (!bytesEqual(m, mirror)) throw new Error('message encoder mismatch between WASM and TypeScript (refusing to sign)');
  return m;
}

function finish(
  plan: Plan,
  vault: VaultInfo,
  leaf: number,
  message: Uint8Array,
  signature: Uint8Array,
  built: Built,
): PreparedSignature {
  const leavesLeft = plan.kind === 'rotate' ? vault.treeSize : vault.treeSize - (leaf + 1);
  const lowLeaves = plan.kind !== 'rotate' && leavesLeft < LOW_LEAVES_WARNING;
  const warnings = [...plan.warnings];
  if (lowLeaves) warnings.push(\`Only \${leavesLeft} one-time signatures left on this key: rotate soon.\`);
  const out: PreparedSignature = {
    kind: plan.kind,
    state: vault.state,
    leafIndex: leaf,
    rootEpoch: vault.rootEpoch,
    message,
    messageHash: sha256(message),
    signature,
    summary: plan.summary,
    transactions: built.transactions,
    sigBuffer: built.sigBuffer,
    transport: built.inline ? 'inline' : 'buffer',
    leavesLeft,
    lowLeaves,
    warnings,
    computeUnits: plan.computeUnits,
    extraSigners: vault.cosigner ? [vault.cosigner] : [],
  };
  if (built.inline) out.inline = built.inline;
  if (plan.actions) out.actions = plan.actions;
  if (plan.newRoot) out.newRoot = plan.newRoot;
  return out;
}

/**
 * Run a ledger write under a cross-tab lock (Web Locks API, where available). A browser ledger
 * rewrites its whole map on each save and localStorage is not atomic across tabs, so two tabs
 * signing at once could each claim the same leaf, or one could drop the other's record. Under the
 * lock every write re-reads the latest map before checking. (The CLI's file ledger locks itself.)
 */
async function underLedgerLock<T>(fn: () => T): Promise<T> {
  const locks = (globalThis as { navigator?: { locks?: { request(name: string, cb: () => Promise<T>): Promise<T> } } }).navigator?.locks;
  return locks ? locks.request('bunker:leaf-ledger', async () => fn()) : fn();
}

async function signPlan(p: BaseParams, vault: VaultInfo, plan: Plan): Promise<PreparedSignature> {
  const { conn, ledger, feePayer } = p;
  const transport = assertTransport(p.transport);
  // The key that signs: this vault's key at its current epoch (checkSeed matched it to currentRoot).
  // Computed before any leaf is touched; WASM sign() takes the cluster and program from the message.
  const binding = keyBinding(vault.rootEpoch, vaultKeyContext(vault, vault.rootEpoch, p.cluster));
  // Never sign past a signature that can still land, and never re-use a leaf the chain shows as
  // revealed even if this device's ledger was lost.
  const { pending, floor: leaf } = await findPendingSignatures({ conn, cluster: p.cluster, vault, ledger, feePayer });
  if (pending.length && !p.abandonPending) throw new PendingSignatureError(pending);
  if (leaf >= plan.maxLeafExclusive) {
    throw new Error(
      plan.kind === 'rotate'
        ? 'No one-time signatures left on this key.'
        : \`No one-time signatures left for \${plan.kind} at epoch \${vault.rootEpoch} (the last leaf is kept for rotate). Rotate the key first.\`,
    );
  }
  const message = buildMessage(p.cluster, vault, IX_TAG[plan.kind], leaf, plan.payload);
  const blockhash = await conn.getLatestBlockhash('confirmed');
  // Measure with a placeholder: a plan that does not fit must fail before the leaf is touched.
  const dry = buildTransactions(plan, vault, feePayer, leaf, new Uint8Array(SIG_LEN), blockhash, transport);
  if (p.confirm) {
    const preview = finish(plan, vault, leaf, message, new Uint8Array(SIG_LEN), dry);
    const ok = await p.confirm({
      kind: plan.kind,
      summary: preview.summary,
      leafIndex: leaf,
      rootEpoch: vault.rootEpoch,
      warnings: preview.warnings,
      transactionCount: dry.inline ? 1 : dry.transactions.length,
      leavesLeft: preview.leavesLeft,
    });
    if (!ok) throw new PrepareCancelledError();
  }

  const hash = sha256(message);
  // Keyed by (vault, epoch, leaf) and by the LMS key identity I = currentRoot[0..16] + leaf.
  const root = vault.currentRoot;
  await underLedgerLock(() => ledger.markSpent(vault.state, vault.rootEpoch, leaf, hash, message, plan.context ? { root, context: plan.context } : { root }));
  const w = getWasm();
  const signature = w.sign(plainMnemonic(p.mnemonic), vault.rootEpoch, leaf, message, binding, vault.currentRoot);
  if (signature.length !== SIG_LEN || !w.verify(vault.currentRoot, message, signature)) {
    throw new Error('Local verification of the new signature failed; nothing was broadcast');
  }
  await underLedgerLock(() => ledger.markSpent(vault.state, vault.rootEpoch, leaf, hash, message, { root, signature }));
  const built = buildTransactions(plan, vault, feePayer, leaf, signature, blockhash, transport);
  return finish(plan, vault, leaf, message, signature, built);
}

/** Sign an execute with the next free leaf. See PrepareExecuteParams. */
export async function prepareExecute(p: PrepareExecuteParams): Promise<PreparedSignature> {
  assertClusterAllowed(p.cluster);
  assertTransport(p.transport);
  await initWasm();
  validateActions(p.actions);
  const vault = await freshVault(p.conn, p.vault);
  await checkSeed(p.mnemonic, vault, p.cluster);
  const payload = encodeActions(p.actions);
  const ctx = await inspectExecute(p.conn, vault, p.actions, {
    createDestinationAtas: !!p.createDestinationAtas,
    strict: !p.skipPreflight,
    feePayer: p.feePayer,
  });
  return signPlan(p, vault, planExecute(vault, p.feePayer, p.actions, payload, ctx, p.addressLabels));
}

function planRotate(vault: VaultInfo, feePayer: PublicKey, newRoot: Uint8Array, newSeed: boolean): Plan {
  return {
    kind: 'rotate',
    payload: newRoot,
    finalIxs: (leaf, s) => [rotateIx({ feePayer, state: vault.state, cosigner: vault.cosigner, leafIndex: leaf, newRoot, ...s })],
    computeUnits: COMPUTE_UNITS.rotate,
    summary: describeRotate(vault.rootEpoch, newSeed),
    maxLeafExclusive: vault.treeSize,
    warnings: cosignerWarning(vault),
    context: { kind: 'rotate', newSeed: newSeed ? '1' : '0' },
    newRoot,
  };
}

/**
 * Rotate to the next epoch's key (same seed, or \`newMnemonic\`). Either way the new key is this
 * vault's key at rootEpoch + 1, bound to its vault id (MESSAGE_FORMAT §2), so it never equals a key
 * of another vault opened from, or rotated into, the same seed.
 */
export async function prepareRotate(p: PrepareRotateParams): Promise<PreparedSignature> {
  assertClusterAllowed(p.cluster);
  assertTransport(p.transport);
  await initWasm();
  const vault = await freshVault(p.conn, p.vault);
  await checkSeed(p.mnemonic, vault, p.cluster);
  const nextEpoch = vault.rootEpoch + 1;
  const newRoot = await deriveRoot(p.newMnemonic ?? p.mnemonic, nextEpoch, vaultKeyContext(vault, nextEpoch, p.cluster));
  if (bytesEqual(newRoot, vault.currentRoot)) throw new Error('new root equals the current root');
  return signPlan(p, vault, planRotate(vault, p.feePayer, newRoot, !!p.newMnemonic));
}

function planClose(vault: VaultInfo, feePayer: PublicKey, rentTo: PublicKey, extraWarnings: string[] = []): Plan {
  return {
    kind: 'close',
    payload: rentTo.toBytes(),
    finalIxs: (leaf, s) => [
      closeVaultIx({ feePayer, state: vault.state, wallet: vault.wallet, rentTo, cosigner: vault.cosigner, leafIndex: leaf, ...s }),
    ],
    computeUnits: COMPUTE_UNITS.closeVault,
    summary: describeClose(rentTo),
    // close_vault, like execute, may not use the last leaf: the program keeps it for rotate (6039).
    maxLeafExclusive: vault.treeSize - RESERVED_LEAVES,
    warnings: [...cosignerWarning(vault), ...extraWarnings],
    context: { kind: 'close' },
  };
}

/** Close the vault (wallet must hold 0 lamports and no token accounts). Tombstones the state. */
export async function prepareClose(p: PrepareCloseParams): Promise<PreparedSignature> {
  assertClusterAllowed(p.cluster);
  assertTransport(p.transport);
  await initWasm();
  const vault = await freshVault(p.conn, p.vault);
  await checkSeed(p.mnemonic, vault, p.cluster);
  if (p.rentTo.equals(vault.wallet) || p.rentTo.equals(vault.state)) throw new Error('rentTo cannot be the vault itself');
  // A heir record outlives a closed vault: its rent would be locked for good, and nothing can be
  // inherited from a tombstone. Remove the heir first (its rent comes back to the vault, and the
  // close sweeps it to rentTo).
  const heir = await fetchHeir(p.conn, vault.state);
  if (heir) throw new Error(\`This vault has an heir (\${heir.heir.toBase58()}): remove the heir first, then close the vault\`);
  // SOL left in the wallet is swept to rentTo by close_vault itself (a griefer's dust cannot block it),
  // so rentTo gets the same checks as any withdrawal recipient: a token account, mint, program or
  // closed vault would swallow that SOL for good.
  const [spl, t22, [recipient], heirOf] = await Promise.all([
    p.conn.getTokenAccountsByOwner(vault.wallet, { programId: SPL_TOKEN_PROGRAM_ID }, 'confirmed'),
    p.conn.getTokenAccountsByOwner(vault.wallet, { programId: TOKEN_2022_PROGRAM_ID }, 'confirmed'),
    checkRecipients(p.conn, [p.rentTo]),
    // Legacy: other vaults that name this one as their heir (best effort; null when the RPC can't say).
    findHeirRecordsNaming(p.conn, vault.wallet).catch(() => null),
  ]);
  if (recipient?.refuse) throw new Error(\`Refusing to close: \${recipient.refuse}\`);
  // Token accounts the vault can still empty and close must be dealt with first (closing the vault
  // would lock their tokens and rent forever). Accounts frozen by their issuer can never be moved or
  // closed (an empty frozen Token-2022 account still can), so a griefer's frozen junk token must not
  // block closing for good: those may be abandoned, but only when the caller lists exactly them.
  const frozen: PublicKey[] = [];
  let closable = 0;
  for (const [list, program] of [[spl.value, SPL_TOKEN_PROGRAM_ID], [t22.value, TOKEN_2022_PROGRAM_ID]] as const) {
    for (const { pubkey, account } of list) {
      let acc: ReturnType<typeof unpackAccount> | null = null;
      try {
        acc = unpackAccount(pubkey, account, program);
      } catch {
        /* unreadable: treat as one to close first */
      }
      if (acc?.isFrozen && (acc.amount > 0n || program.equals(SPL_TOKEN_PROGRAM_ID))) frozen.push(pubkey);
      else closable++;
    }
  }
  if (closable > 0) throw new Error(\`Close the vault's \${closable} token account(s) first (withdraw and close-account); they would be locked forever\`);
  const abandon = new Set((p.abandonTokenAccounts ?? []).map((a) => a.toBase58()));
  const unconfirmed = frozen.filter((a) => !abandon.has(a.toBase58()));
  if (unconfirmed.length) throw new FrozenTokenAccountsError(unconfirmed);
  const notes = [
    ...(recipient?.warn ? [recipient.warn] : []),
    ...(frozen.length ? [\`Abandons \${frozen.length} issuer-frozen token account(s): \${frozen.map((a) => shortAddress(a)).join(', ')}.\`] : []),
    ...heirOfWarning(heirOf),
  ];
  return signPlan(p, vault, planClose(vault, p.feePayer, p.rentTo, notes));
}

/**
 * Rebuild the identical signature's transactions for a leaf already in the ledger (rebroadcast after
 * a failure or expired blockhash). Never re-signs. Resumes a partially written signature buffer.
 */
export async function rebuildPrepared(p: {
  conn: Connection;
  cluster: ClusterName;
  vault: VaultInfo | PublicKey;
  ledger: LeafLedger;
  leafIndex: number;
  feePayer: PublicKey;
  /** Defaults to the vault's current epoch. */
  rootEpoch?: number;
  createDestinationAtas?: boolean;
  transport?: Transport;
}): Promise<PreparedSignature> {
  assertClusterAllowed(p.cluster);
  const transport = assertTransport(p.transport);
  await initWasm();
  const vault = await freshVault(p.conn, p.vault);
  const epoch = p.rootEpoch ?? vault.rootEpoch;
  const entry = p.ledger.get(vault.state, epoch, p.leafIndex);
  if (!entry) throw new Error(\`Leaf \${p.leafIndex} (epoch \${epoch}) is not in the ledger\`);
  if (!entry.signature) throw new Error(\`Leaf \${p.leafIndex} was marked spent but never signed; prepare again (a fresh leaf will be used)\`);
  if (epoch !== vault.rootEpoch) throw new Error(\`The vault rotated to epoch \${vault.rootEpoch}; this epoch-\${epoch} signature can no longer land\`);
  if (vault.nextLeaf > p.leafIndex) {
    throw new Error(\`Leaf \${p.leafIndex} is already consumed on chain (next_leaf = \${vault.nextLeaf}): either it landed or a later leaf did\`);
  }
  const message = base64.decode(entry.message);
  const signature = base64.decode(entry.signature);
  if (toHex(sha256(message)) !== entry.messageHash) throw new Error('ledger entry is corrupted (message hash mismatch)');
  const m = parseMessage(message);
  if (
    !m.programId.equals(PROGRAM_ID) ||
    !m.state.equals(vault.state) ||
    m.rootEpoch !== epoch ||
    m.leafIndex !== p.leafIndex ||
    m.clusterId !== CLUSTER_ID[p.cluster]
  ) {
    throw new Error('ledger entry does not match this vault/leaf/cluster');
  }
  const w = getWasm();
  if (!w.verify(vault.currentRoot, message, signature)) throw new Error('stored signature does not verify against the current root');

  let plan: Plan;
  if (m.tag === IX_TAG.execute) {
    const actions = decodeActions(m.payload);
    const knownOwners = new Map<string, PublicKey>();
    for (const [k, v] of Object.entries(entry.context ?? {})) {
      if (k.startsWith('owner:')) knownOwners.set(k.slice(6), new PublicKey(v));
    }
    const ctx = await inspectExecute(p.conn, vault, actions, {
      createDestinationAtas: !!p.createDestinationAtas,
      strict: false,
      knownOwners,
    });
    plan = planExecute(vault, p.feePayer, actions, m.payload, ctx);
  } else if (m.tag === IX_TAG.rotate) {
    if (m.payload.length !== ROOT_LEN) throw new Error('bad rotate payload');
    plan = planRotate(vault, p.feePayer, m.payload, entry.context?.newSeed === '1');
  } else if (m.tag === IX_TAG.close) {
    plan = planClose(vault, p.feePayer, new PublicKey(m.payload));
  } else {
    throw new Error(\`unknown instruction tag \${m.tag}\`);
  }

  const [sigBuffer] = findSigBufferPda(vault.state, p.feePayer, epoch, p.leafIndex);
  const bufInfo = transport === 'buffer' ? await p.conn.getAccountInfo(sigBuffer, 'confirmed') : null;
  let resume: { skipInit: boolean; ranges: Array<[number, number]> } | undefined;
  if (bufInfo) {
    const buf = decodeSigBuffer(sigBuffer, bufInfo.data);
    if (!buf.state.equals(vault.state) || !buf.payer.equals(p.feePayer) || buf.rootEpoch !== epoch || buf.leafIndex !== p.leafIndex) {
      throw new Error('existing signature buffer does not match this leaf');
    }
    resume = { skipInit: true, ranges: diffRanges(buf.data.subarray(0, SIG_LEN), signature) };
  }
  const blockhash = await p.conn.getLatestBlockhash('confirmed');
  const built = buildTransactions(plan, vault, p.feePayer, p.leafIndex, signature, blockhash, transport, resume);
  return finish(plan, vault, p.leafIndex, message, signature, built);
}
`;export{e as default};