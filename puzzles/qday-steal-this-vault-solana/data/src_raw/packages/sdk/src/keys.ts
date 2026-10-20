import type { PublicKey } from '@solana/web3.js';
import { getWasm, initWasm } from './wasm';
import { CLUSTER_ID, PROGRAM_ID, ROOT_LEN } from './constants';
import type { ClusterName } from './constants';
import { computeVaultId, encodeOptions, findStatePda, findWalletPda } from './addresses';
import type { VaultInfo } from './state';

/**
 * A fresh 24-word vault seed (BIP-39, 256 bits from the platform CSPRNG). Requires initWasm().
 * The caller owns the returned string: never log it, never send it anywhere.
 */
export function generateMnemonic(): string {
  const entropy = new Uint8Array(32);
  globalThis.crypto.getRandomValues(entropy);
  try {
    return getWasm().generate_mnemonic(entropy);
  } finally {
    entropy.fill(0);
  }
}

/** True if `m` is a valid 24-word English BIP-39 mnemonic. Requires initWasm(). */
export function validateMnemonic(m: string): boolean {
  const n = normalizeMnemonic(m);
  return isPlainMnemonic(n) && getWasm().validate_mnemonic(n);
}

/**
 * Collapse whitespace (including zero-width characters a paste can carry) and lowercase. English
 * BIP-39 words are plain a–z, so for a valid phrase this is the BIP-39 NFKD form.
 */
export function normalizeMnemonic(m: string): string {
  return m.replace(/[\u200B-\u200D\u2060\uFEFF]/g, ' ').trim().toLowerCase().split(/\s+/).join(' ');
}

/**
 * Only plain lowercase words reach the WASM: a non-ASCII string makes the bindings re-allocate its
 * buffer mid-copy and leave a partial copy of the words in linear memory, and it can never be a
 * valid English phrase anyway.
 */
function isPlainMnemonic(normalized: string): boolean {
  return /^[a-z]+(?: [a-z]+)*$/.test(normalized);
}

/** The normalized phrase, or a throw before any secret is handed to the WASM. */
export function plainMnemonic(m: string): string {
  const n = normalizeMnemonic(m);
  if (!isPlainMnemonic(n)) throw new Error('Invalid vault seed: expected 24 BIP-39 words (letters a–z and spaces only)');
  return n;
}

/**
 * What an LMS key is bound to (MESSAGE_FORMAT §2). Leaf state is per vault, so every key belongs to
 * exactly one deployment (cluster + program) and one vault: one seed can back several vaults (with
 * and without a cosigner, on several clusters) without any two of them sharing a one-time key.
 *
 * - Epoch 0 (the root `open` publishes): bound to the vault's options, i.e. its `cosigner`
 *   (omitted or null = no cosigner). The vault id does not exist before root_0, so `vaultId` must
 *   not be set.
 * - Epoch ≥ 1 (every rotation, to the same seed or a new one): bound to the vault's 32-byte
 *   `vaultId`. `cosigner` must not be set.
 *
 * For an existing vault, vaultKeyContext(vault, epoch, cluster) picks the right one.
 */
export interface KeyContext {
  /** The cluster the vault lives on (the cluster_id its messages carry). */
  cluster: ClusterName;
  /** The Bunker program the vault lives in (default PROGRAM_ID). */
  programId?: PublicKey;
  /** Epoch 0 only: the vault's cosigner. Omitted or null = no cosigner. */
  cosigner?: PublicKey | null;
  /** Epoch ≥ 1 only: the vault's vault_id (32 bytes). */
  vaultId?: Uint8Array;
}

const isBytes = (x: unknown): x is Uint8Array =>
  x instanceof Uint8Array || (ArrayBuffer.isView(x) && x.constructor?.name === 'Uint8Array');

const isPublicKey = (x: unknown): x is PublicKey =>
  typeof x === 'object' && x !== null && typeof (x as { toBytes?: unknown }).toBytes === 'function';

function assertEpoch(epoch: number): void {
  if (typeof epoch !== 'number' || !Number.isInteger(epoch) || epoch < 0 || epoch > 0xffff_ffff) {
    throw new RangeError(`key epoch must be an integer in 0..=4294967295 (got ${String(epoch)})`);
  }
}

function clusterIdOf(cluster: unknown): number {
  if (typeof cluster !== 'string' || !Object.prototype.hasOwnProperty.call(CLUSTER_ID, cluster)) {
    throw new Error(
      `Invalid key context: unknown cluster ${JSON.stringify(cluster)} (expected one of ${Object.keys(CLUSTER_ID).join(', ')})`,
    );
  }
  return CLUSTER_ID[cluster as ClusterName];
}

function programIdBytes(programId: unknown): Uint8Array {
  if (programId === undefined) return PROGRAM_ID.toBytes();
  const b = isPublicKey(programId) ? programId.toBytes() : null;
  if (!b || b.length !== 32) throw new Error('Invalid key context: programId must be a PublicKey');
  return b;
}

/**
 * `binding_e` of MESSAGE_FORMAT §2: the vault's options_v1 (2 or 34 bytes) at epoch 0, its vault_id
 * (32 bytes) at every later epoch. Throws if the context carries the binding of the other kind.
 */
export function keyBinding(epoch: number, ctx: KeyContext): Uint8Array {
  if (typeof ctx !== 'object' || ctx === null) {
    throw new Error(
      'Missing key context: keys are bound to their vault (MESSAGE_FORMAT §2). ' +
        'Pass { cluster, cosigner } at epoch 0 or { cluster, vaultId } at epoch ≥ 1 (see vaultKeyContext).',
    );
  }
  assertEpoch(epoch);
  if (epoch === 0) {
    if (ctx.vaultId !== undefined) {
      throw new Error(
        'Invalid key context: the epoch-0 key is bound to the vault options (its cosigner), not to a vault id ' +
          '(the vault id is computed from the epoch-0 root). Pass { cluster, cosigner } at epoch 0.',
      );
    }
    const cosigner = ctx.cosigner ?? null;
    if (cosigner !== null && !isPublicKey(cosigner)) {
      throw new Error('Invalid key context: cosigner must be a PublicKey or null');
    }
    return encodeOptions(cosigner);
  }
  if (ctx.cosigner !== undefined) {
    throw new Error(
      `Invalid key context: the epoch-${epoch} key is bound to the vault id; the cosigner only binds the ` +
        'epoch-0 key. Pass { cluster, vaultId } at epoch ≥ 1 (see vaultKeyContext).',
    );
  }
  if (!isBytes(ctx.vaultId) || ctx.vaultId.length !== 32) {
    const got = ctx.vaultId === undefined ? 'no vaultId' : isBytes(ctx.vaultId) ? `${ctx.vaultId.length} bytes` : typeof ctx.vaultId;
    throw new Error(
      `Invalid key context: the epoch-${epoch} key is bound to the vault's 32-byte vault id; ` +
        `pass { cluster, vaultId } (got ${got}).`,
    );
  }
  return Uint8Array.from(ctx.vaultId);
}

/**
 * The key context of an existing vault at `epoch`: its current `rootEpoch` (to sign, or to check a
 * seed against `currentRoot`) or `rootEpoch + 1` (the key `rotate` moves to, from the same seed or
 * a new one). Epoch 0 binds the vault's options (its cosigner), every later epoch its vault id.
 */
export function vaultKeyContext(
  vault: Pick<VaultInfo, 'vaultId' | 'cosigner'>,
  epoch: number,
  cluster: ClusterName,
  programId: PublicKey = PROGRAM_ID,
): KeyContext {
  assertEpoch(epoch);
  return epoch === 0 ? { cluster, programId, cosigner: vault.cosigner ?? null } : { cluster, programId, vaultId: vault.vaultId };
}

/** Checked WASM arguments for a key context (everything is validated before the slow derivation). */
export function resolveKeyContext(epoch: number, ctx: KeyContext): { clusterId: number; programId: Uint8Array; binding: Uint8Array } {
  const binding = keyBinding(epoch, ctx);
  return { clusterId: clusterIdOf(ctx.cluster), programId: programIdBytes(ctx.programId), binding };
}

/**
 * LMS root (I ‖ T1, 48 bytes) of the key `mnemonic` uses for one vault at key epoch `epoch`
 * (MESSAGE_FORMAT §2). Builds the full tree (~1M hashes, ~200 ms in WASM).
 *
 * - a new vault (the root `open` publishes): deriveRoot(seed, 0, { cluster, cosigner }), or
 *   vaultFromSeed(seed, { cluster, cosigner }) for the root and the addresses together;
 * - an existing vault at its current epoch, or at rootEpoch + 1 for rotate (same seed or a new one):
 *   deriveRoot(seed, epoch, vaultKeyContext(vault, epoch, cluster)).
 *
 * Throws (before any work) if `ctx` carries the wrong binding for the epoch.
 */
export async function deriveRoot(mnemonic: string, epoch: number, ctx: KeyContext): Promise<Uint8Array> {
  const { clusterId, programId, binding } = resolveKeyContext(epoch, ctx);
  await initWasm();
  const m = plainMnemonic(mnemonic);
  const w = getWasm();
  if (!w.validate_mnemonic(m)) throw new Error('Invalid vault seed: expected 24 BIP-39 words');
  const root = w.derive_root(m, epoch, clusterId, programId, binding);
  if (root.length !== ROOT_LEN) throw new Error(`derive_root returned ${root.length} bytes`);
  return root;
}

/**
 * The vault `mnemonic` opens on `cluster` with `cosigner` (MESSAGE_FORMAT §2–3): its epoch-0 root
 * (bound to exactly these options and this deployment), vault id, state and wallet. `open` must
 * publish exactly this root with exactly this cosigner.
 */
export async function vaultFromSeed(
  mnemonic: string,
  p: { cluster: ClusterName; cosigner?: PublicKey | null; programId?: PublicKey },
): Promise<{ root: Uint8Array; vaultId: Uint8Array; state: PublicKey; wallet: PublicKey }> {
  const programId = p.programId ?? PROGRAM_ID;
  const cosigner = p.cosigner ?? null;
  const root = await deriveRoot(mnemonic, 0, { cluster: p.cluster, programId, cosigner });
  const vaultId = computeVaultId(root, cosigner);
  const [state] = findStatePda(vaultId, programId);
  const [wallet] = findWalletPda(state, programId);
  return { root, vaultId, state, wallet };
}
