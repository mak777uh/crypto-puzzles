var e=`import type { PublicKey } from '@solana/web3.js';
import { base64 } from '@scure/base';
import { toHex } from './bytes';
import { ROOT_LEN } from './constants';

/**
 * One spent (revealed or about-to-be-revealed) leaf. Everything here is public once broadcast;
 * the seed is never stored.
 */
export interface LedgerEntry {
  state: string;
  epoch: number;
  leaf: number;
  /**
   * Identity of the LMS key that signs this leaf: hex of I = root[0..16] (see lmsKeyId). Absent on
   * entries recorded before key identities were tracked; those still guard (state, epoch, leaf).
   */
  keyId?: string;
  /** hex sha256 of the signed message M. */
  messageHash: string;
  /** base64 of M (the exact signed bytes). */
  message: string;
  /** base64 LMS signature, recorded right after signing (used to rebroadcast without the seed). */
  signature?: string;
  /** Unsigned context needed to rebuild transactions (e.g. destination owners for ATA creation). */
  context?: Record<string, string>;
  createdAt: number;
}

export interface MarkSpentExtra {
  signature?: Uint8Array;
  context?: Record<string, string>;
  /**
   * The 48-byte root (I ‖ T1) of the LMS key that signs: the vault's \`currentRoot\`. With it the
   * ledger also refuses a second message for the same key identity I and leaf in ANY vault or epoch,
   * so a key that ended up in two vaults still never signs one leaf twice on this device.
   * prepare* always pass it.
   */
  root?: Uint8Array;
}

/**
 * Records a leaf as spent BEFORE broadcast; refuses to bind a leaf to two different messages.
 * A one-time key is identified both by (vault state, epoch) and by its LMS identifier I, and a
 * leaf is refused if either already signed a different message.
 */
export interface LeafLedger {
  /**
   * Leaf to use next: max(chainNextLeaf, highest leaf recorded for (state, epoch) + 1, and, when
   * \`root\` (the signing key's root) is given, highest leaf recorded under that key in any vault + 1).
   */
  nextFree(state: PublicKey, epoch: number, chainNextLeaf: number, root?: Uint8Array): number;
  /**
   * Throws LeafReuseError if the leaf is already recorded for a different message under
   * (state, epoch), or, when extra.root is given, under the same LMS key identity in any vault.
   * Idempotent otherwise.
   */
  markSpent(
    state: PublicKey,
    epoch: number,
    leaf: number,
    messageHash: Uint8Array,
    signedPayload: Uint8Array,
    extra?: MarkSpentExtra,
  ): void;
  get(state: PublicKey, epoch: number, leaf: number): LedgerEntry | undefined;
  /** All entries, optionally for one vault, ordered by (epoch, leaf). */
  list(state?: PublicKey): LedgerEntry[];
}

export class LeafReuseError extends Error {
  /**
   * \`previous\`: the conflicting entry when it belongs to another vault or epoch (same LMS key
   * identity and leaf).
   */
  constructor(state: string, epoch: number, leaf: number, previous?: Pick<LedgerEntry, 'state' | 'epoch'>) {
    super(
      previous && (previous.state !== state || previous.epoch !== epoch)
        ? \`Refusing to sign: leaf \${leaf} of this one-time key already signed a different message for vault \` +
            \`\${previous.state} (epoch \${previous.epoch}). An LMS key must never sign twice with one leaf, in any vault; \` +
            'use a fresh leaf.'
        : \`Refusing to sign: leaf \${leaf} (epoch \${epoch}) of vault \${state} already signed a different message. \` +
            'A one-time key must never sign twice; use a fresh leaf.',
    );
    this.name = 'LeafReuseError';
  }
}

/**
 * The stored ledger exists but cannot be read (corrupt JSON, or a format this version does not know).
 * Signing stops: an unreadable ledger must never be mistaken for an empty one. Recover with
 * LocalStorageLedger.quarantine(), which keeps the raw data; prepare* then rebuilds the leaf floor
 * from the chain (findPendingSignatures), so nothing revealed is signed again.
 */
export class LedgerUnreadableError extends Error {
  constructor(detail: string) {
    super(\`The leaf ledger on this device cannot be read (\${detail}). Nothing will be signed until it is recovered.\`);
    this.name = 'LedgerUnreadableError';
  }
}

export const ledgerKey = (state: string, epoch: number, leaf: number): string => \`\${state}:\${epoch}:\${leaf}\`;

/**
 * The ledger's identity of an LMS key: hex of its identifier I = root[0..16] (MESSAGE_FORMAT §2,
 * I_e = okm[32..48]). Takes the 48-byte root (I ‖ T1) or I itself (16 bytes).
 */
export function lmsKeyId(rootOrI: Uint8Array): string {
  if (rootOrI.length === ROOT_LEN) return toHex(rootOrI.subarray(0, 16));
  if (rootOrI.length === 16) return toHex(rootOrI);
  throw new Error(\`LMS key identity: expected a 48-byte root or its 16-byte I (got \${rootOrI.length} bytes)\`);
}

/**
 * Shared ledger logic over a JSON map keyed by ledgerKey(state, epoch, leaf). Entries also carry
 * the signing key's identity (keyId), which is checked across every vault and epoch; entries
 * without one (recorded by earlier versions) are read and guarded as before. Subclasses provide
 * load/save (memory, localStorage, file). save() must be durable before it returns: prepare*
 * relies on that ordering.
 */
export abstract class JsonLedger implements LeafLedger {
  protected abstract load(): Record<string, LedgerEntry>;
  protected abstract save(entries: Record<string, LedgerEntry>): void;

  nextFree(state: PublicKey, epoch: number, chainNextLeaf: number, root?: Uint8Array): number {
    const s = state.toBase58();
    const keyId = root ? lmsKeyId(root) : undefined;
    let next = chainNextLeaf;
    for (const e of Object.values(this.load())) {
      const sameVaultKey = e.state === s && e.epoch === epoch;
      const sameLmsKey = keyId !== undefined && e.keyId === keyId;
      if ((sameVaultKey || sameLmsKey) && e.leaf + 1 > next) next = e.leaf + 1;
    }
    return next;
  }

  markSpent(
    state: PublicKey,
    epoch: number,
    leaf: number,
    messageHash: Uint8Array,
    signedPayload: Uint8Array,
    extra?: MarkSpentExtra,
  ): void {
    const s = state.toBase58();
    const key = ledgerKey(s, epoch, leaf);
    const keyId = extra?.root ? lmsKeyId(extra.root) : undefined;
    const entries = this.load();
    const hash = toHex(messageHash);
    const existing = entries[key];
    if (existing && existing.messageHash !== hash) throw new LeafReuseError(s, epoch, leaf);
    if (keyId !== undefined) {
      if (existing?.keyId !== undefined && existing.keyId !== keyId) {
        throw new Error(
          \`ledger: leaf \${leaf} (epoch \${epoch}) of vault \${s} is recorded under a different one-time key \` +
            \`(\${existing.keyId}, not \${keyId}); refusing to sign\`,
        );
      }
      // The same LMS key and leaf must not sign a different message anywhere else (another vault or epoch).
      for (const [k, e] of Object.entries(entries)) {
        if (k !== key && e.keyId === keyId && e.leaf === leaf && e.messageHash !== hash) {
          throw new LeafReuseError(s, epoch, leaf, e);
        }
      }
    }
    const sig = extra?.signature ? base64.encode(extra.signature) : undefined;
    if (sig !== undefined && existing?.signature && existing.signature !== sig) {
      throw new Error(\`ledger: leaf \${leaf} already has a different signature recorded\`);
    }
    // Every check is done: only now touch the (possibly shared, in-memory) entry.
    const entry: LedgerEntry = existing ?? {
      state: s,
      epoch,
      leaf,
      messageHash: hash,
      message: base64.encode(signedPayload),
      createdAt: Date.now(),
    };
    if (keyId !== undefined) entry.keyId = keyId;
    if (sig !== undefined) entry.signature = sig;
    if (extra?.context) entry.context = { ...(entry.context ?? {}), ...extra.context };
    entries[key] = entry;
    this.save(entries);
  }

  get(state: PublicKey, epoch: number, leaf: number): LedgerEntry | undefined {
    return this.load()[ledgerKey(state.toBase58(), epoch, leaf)];
  }

  list(state?: PublicKey): LedgerEntry[] {
    const s = state?.toBase58();
    return Object.values(this.load())
      .filter((e) => !s || e.state === s)
      .sort((a, b) => a.state.localeCompare(b.state) || a.epoch - b.epoch || a.leaf - b.leaf);
  }
}

/** In-memory ledger (tests, scripts). Entries are lost when the process exits. */
export class MemoryLedger extends JsonLedger {
  private entries: Record<string, LedgerEntry> = {};
  protected load(): Record<string, LedgerEntry> {
    return this.entries;
  }
  protected save(entries: Record<string, LedgerEntry>): void {
    this.entries = entries;
  }
}

/** Minimal Storage subset (window.localStorage satisfies it). */
export interface KeyValueStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem?(key: string): void;
}

/**
 * Browser ledger in localStorage (per origin, per device). The stored format stays \`version: 1\`
 * (entries only gained the optional keyId), so older clients still read it.
 */
export class LocalStorageLedger extends JsonLedger {
  private readonly storage: KeyValueStorage;
  private readonly key: string;
  constructor(storage?: KeyValueStorage, key = 'bunker:ledger:v1') {
    super();
    const s = storage ?? (globalThis as { localStorage?: KeyValueStorage }).localStorage;
    if (!s) throw new Error('LocalStorageLedger: no localStorage available');
    this.storage = s;
    this.key = key;
  }
  protected load(): Record<string, LedgerEntry> {
    const raw = this.storage.getItem(this.key);
    if (!raw) return {};
    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch {
      throw new LedgerUnreadableError('corrupt data');
    }
    const p = parsed as { version?: unknown; entries?: unknown };
    if (typeof p !== 'object' || p === null || p.version !== 1) {
      throw new LedgerUnreadableError(\`unknown format version \${JSON.stringify((p as { version?: unknown } | null)?.version ?? null)}\`);
    }
    if (typeof p.entries !== 'object' || p.entries === null || Array.isArray(p.entries)) throw new LedgerUnreadableError('missing entries');
    return p.entries as Record<string, LedgerEntry>;
  }

  /**
   * Move an unreadable ledger aside (kept under \`<key>:unreadable:<time>\` for inspection) so signing
   * can resume. Safe because prepare* takes the leaf floor from the chain as well as the ledger.
   * Returns the key the raw data was saved under, or null if there was nothing to move.
   */
  quarantine(): string | null {
    const raw = this.storage.getItem(this.key);
    if (raw === null) return null;
    const aside = \`\${this.key}:unreadable:\${Date.now()}\`;
    this.storage.setItem(aside, raw);
    if (this.storage.getItem(aside) !== raw) throw new Error('LocalStorageLedger: could not keep a copy of the unreadable ledger');
    if (this.storage.removeItem) this.storage.removeItem(this.key);
    else this.storage.setItem(this.key, JSON.stringify({ version: 1, entries: {} }));
    return aside;
  }
  protected save(entries: Record<string, LedgerEntry>): void {
    this.storage.setItem(this.key, JSON.stringify({ version: 1, entries }));
    // Read back: a quota error or a disabled storage must stop signing.
    const check = this.storage.getItem(this.key);
    if (!check) throw new Error('LocalStorageLedger: write did not persist');
  }
}
`;export{e as default};