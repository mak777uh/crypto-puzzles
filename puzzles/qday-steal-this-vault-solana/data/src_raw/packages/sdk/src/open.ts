import type { Connection, PublicKey, Transaction } from '@solana/web3.js';
import { COMPUTE_UNITS, PROGRAM_ID, ROOT_LEN } from './constants';
import type { ClusterName } from './constants';
import { assertClusterAllowed } from './cluster';
import { computeVaultId, findStatePda, findWalletPda } from './addresses';
import { openVaultIx } from './instructions';
import { cuLimitIx, makeTx } from './transport';
import { VAULT_TOMBSTONE_DISCRIMINATOR } from './state';
import { bytesEqual } from './bytes';
import { deriveRoot } from './keys';

/**
 * open_vault transaction for an epoch-0 root (fee payer = `payer`, who never controls the vault).
 *
 * `root` must be the seed's epoch-0 root for exactly this `cosigner` and cluster:
 * deriveRoot(seed, 0, { cluster, cosigner }), or vaultFromSeed(seed, { cluster, cosigner }).root.
 * The epoch-0 key is bound to the vault's options and deployment (MESSAGE_FORMAT §2), so a root
 * derived for another cosigner or cluster would open a vault this seed cannot sign for. Pass
 * `mnemonic` (with `cluster`) to have the root re-derived and checked before anything is built.
 */
export async function buildOpenVaultTx(p: {
  conn: Connection;
  payer: PublicKey;
  root: Uint8Array;
  cosigner?: PublicKey | null;
  cluster?: ClusterName;
  /** Optional check: refuse unless `root` is this seed's epoch-0 key for `cosigner` on `cluster`. */
  mnemonic?: string;
}): Promise<{ tx: Transaction; state: PublicKey; wallet: PublicKey; vaultId: Uint8Array }> {
  if (p.cluster) assertClusterAllowed(p.cluster);
  if (p.root.length !== ROOT_LEN) throw new Error('root must be 48 bytes');
  if (p.mnemonic !== undefined) {
    if (!p.cluster) throw new Error('buildOpenVaultTx: pass `cluster` with `mnemonic` (the epoch-0 key is bound to the cluster)');
    const expected = await deriveRoot(p.mnemonic, 0, { cluster: p.cluster, cosigner: p.cosigner ?? null });
    if (!bytesEqual(expected, p.root)) {
      throw new Error(
        `This root is not the seed's epoch-0 key for ${p.cosigner ? `cosigner ${p.cosigner.toBase58()}` : 'no cosigner'} on ${p.cluster}. ` +
          'Derive it again with the same options. Nothing was opened.',
      );
    }
  }
  const vaultId = computeVaultId(p.root, p.cosigner ?? null);
  const [state] = findStatePda(vaultId);
  const [wallet] = findWalletPda(state);
  const [program, existing] = await p.conn.getMultipleAccountsInfo([PROGRAM_ID, state], 'confirmed');
  if (!program?.executable) {
    throw new Error(`Bunker is not deployed on ${p.cluster ?? 'this network'} yet (program ${PROGRAM_ID.toBase58()}). Nothing was opened.`);
  }
  if (existing) {
    if (bytesEqual(existing.data.subarray(0, 8), VAULT_TOMBSTONE_DISCRIMINATOR)) {
      throw new Error('This vault was closed and can never be re-opened. Generate a new vault seed.');
    }
    throw new Error(`Vault already open at ${state.toBase58()} (wallet ${wallet.toBase58()})`);
  }
  const bh = await p.conn.getLatestBlockhash('confirmed');
  const tx = makeTx(
    [
      cuLimitIx(COMPUTE_UNITS.openVault),
      openVaultIx({ payer: p.payer, state, wallet, vaultId, root: p.root, cosigner: p.cosigner ?? null }),
    ],
    p.payer,
    bh,
  );
  return { tx, state, wallet, vaultId };
}
