import { PublicKey } from '@solana/web3.js';
import { getAssociatedTokenAddressSync } from '@solana/spl-token';
import { concatBytes, sha256, u32le, utf8 } from './bytes';
import { PROGRAM_ID, ROOT_LEN } from './constants';

const VAULT_ID_DOMAIN = utf8('BUNKER/vault-id/v1');

/** options_v1 = u8(1) ‖ u8(has_cosigner) ‖ [cosigner (32)] (MESSAGE_FORMAT §3). */
export function encodeOptions(cosigner?: PublicKey | null): Uint8Array {
  if (!cosigner) return Uint8Array.of(1, 0);
  return concatBytes(Uint8Array.of(1, 1), cosigner.toBytes());
}

/** vault_id = SHA-256("BUNKER/vault-id/v1" ‖ root_0 (48) ‖ options_v1). */
export function computeVaultId(root: Uint8Array, cosigner?: PublicKey | null): Uint8Array {
  if (root.length !== ROOT_LEN) throw new Error(`root must be ${ROOT_LEN} bytes, got ${root.length}`);
  return sha256(concatBytes(VAULT_ID_DOMAIN, root, encodeOptions(cosigner)));
}

export function findStatePda(vaultId: Uint8Array, programId: PublicKey = PROGRAM_ID): [PublicKey, number] {
  if (vaultId.length !== 32) throw new Error('vault_id must be 32 bytes');
  return PublicKey.findProgramAddressSync([utf8('vault'), vaultId], programId);
}

/** The vault's address: the wallet PDA that holds SOL and owns the token accounts. */
export function findWalletPda(state: PublicKey, programId: PublicKey = PROGRAM_ID): [PublicKey, number] {
  return PublicKey.findProgramAddressSync([utf8('wallet'), state.toBytes()], programId);
}

export function findSigBufferPda(
  state: PublicKey,
  payer: PublicKey,
  rootEpoch: number,
  leafIndex: number,
  programId: PublicKey = PROGRAM_ID,
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [utf8('sigbuf'), state.toBytes(), payer.toBytes(), u32le(rootEpoch), u32le(leafIndex)],
    programId,
  );
}

/** The vault's heir record (Legacy): PDA ["heir", state]. */
export function findHeirPda(state: PublicKey, programId: PublicKey = PROGRAM_ID): [PublicKey, number] {
  return PublicKey.findProgramAddressSync([utf8('heir'), state.toBytes()], programId);
}

/** Associated token account of `owner` (PDA owners allowed). */
export function ataOf(owner: PublicKey, mint: PublicKey, tokenProgram: PublicKey): PublicKey {
  return getAssociatedTokenAddressSync(mint, owner, true, tokenProgram);
}

/** State + wallet addresses for a seed's epoch-0 root (what `open` creates). */
export function vaultAddressesFromRoot(
  root0: Uint8Array,
  cosigner?: PublicKey | null,
): { vaultId: Uint8Array; state: PublicKey; wallet: PublicKey } {
  const vaultId = computeVaultId(root0, cosigner);
  const [state] = findStatePda(vaultId);
  const [wallet] = findWalletPda(state);
  return { vaultId, state, wallet };
}
