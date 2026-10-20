import { Buffer } from 'buffer';
import { PublicKey, SystemProgram, TransactionInstruction } from '@solana/web3.js';
import type { AccountMeta } from '@solana/web3.js';
import { BorshWriter, ixDiscriminator } from './bytes';
import { ASSOCIATED_TOKEN_PROGRAM_ID, PROGRAM_ID, ROOT_LEN } from './constants';
import type { VaultAction } from './actions';
import { ataOf, findHeirPda } from './addresses';

export const IX_DISCRIMINATORS = {
  openVault: ixDiscriminator('open_vault'),
  execute: ixDiscriminator('execute'),
  rotate: ixDiscriminator('rotate'),
  closeVault: ixDiscriminator('close_vault'),
  initSigBuffer: ixDiscriminator('init_sig_buffer'),
  writeSigBuffer: ixDiscriminator('write_sig_buffer'),
  closeSigBuffer: ixDiscriminator('close_sig_buffer'),
  inherit: ixDiscriminator('inherit'),
} as const;

const w = (pubkey: PublicKey, isSigner = false): AccountMeta => ({ pubkey, isSigner, isWritable: true });
const r = (pubkey: PublicKey, isSigner = false): AccountMeta => ({ pubkey, isSigner, isWritable: false });

/** Anchor optional account: the program id in the slot means "none". */
function optional(pk: PublicKey | null | undefined, meta: (p: PublicKey) => AccountMeta): AccountMeta {
  return pk ? meta(pk) : r(PROGRAM_ID);
}

function ix(keys: AccountMeta[], data: Uint8Array): TransactionInstruction {
  return new TransactionInstruction({ programId: PROGRAM_ID, keys, data: Buffer.from(data) });
}

function optionalSig(wr: BorshWriter, sig: Uint8Array | null | undefined): BorshWriter {
  return wr.option(sig ?? null, (x, v) => x.vec(v));
}

export function openVaultIx(p: {
  payer: PublicKey;
  state: PublicKey;
  wallet: PublicKey;
  vaultId: Uint8Array;
  root: Uint8Array;
  cosigner?: PublicKey | null;
}): TransactionInstruction {
  if (p.vaultId.length !== 32) throw new Error('vault_id must be 32 bytes');
  if (p.root.length !== ROOT_LEN) throw new Error('root must be 48 bytes');
  const data = new BorshWriter()
    .raw(IX_DISCRIMINATORS.openVault)
    .raw(p.vaultId)
    .raw(p.root)
    .option(p.cosigner ?? null, (x, v) => x.raw(v.toBytes()))
    .bytes();
  return ix([w(p.payer, true), w(p.state), r(p.wallet), r(SystemProgram.programId)], data);
}

/**
 * Remaining accounts for execute, in action order (SPEC §2). Heir actions need the vault's `state`
 * (their record is the PDA ["heir", state]).
 */
export function executeRemainingAccounts(actions: VaultAction[], wallet: PublicKey, state?: PublicKey): AccountMeta[] {
  const out: AccountMeta[] = [];
  const heirRecord = (): PublicKey => {
    if (!state) throw new Error('heir actions need the vault state account');
    return findHeirPda(state)[0];
  };
  for (const a of actions) {
    switch (a.kind) {
      case 'transferSol':
        out.push(w(a.to));
        break;
      case 'transferToken':
        out.push(r(a.tokenProgram), r(a.mint), w(ataOf(wallet, a.mint, a.tokenProgram)), w(a.destination));
        break;
      case 'closeTokenAccount':
        out.push(r(a.tokenProgram), w(ataOf(wallet, a.mint, a.tokenProgram)), w(a.rentTo));
        break;
      case 'setHeir':
        out.push(w(heirRecord()), r(a.heir));
        break;
      case 'checkIn':
      case 'clearHeir':
        out.push(w(heirRecord()));
        break;
    }
  }
  return out;
}

export interface SigSource {
  /** Inline signature (v1 transactions only), or null to read the signature buffer. */
  sig: Uint8Array | null;
  /** Signature buffer PDA (required when sig is null). */
  sigBuffer: PublicKey | null;
}

function checkSigSource(s: SigSource): void {
  if (!s.sig && !s.sigBuffer) throw new Error('either an inline signature or a signature buffer is required');
}

export function executeIx(
  p: {
    feePayer: PublicKey;
    state: PublicKey;
    wallet: PublicKey;
    cosigner?: PublicKey | null;
    leafIndex: number;
    payload: Uint8Array;
    actions: VaultAction[];
  } & SigSource,
): TransactionInstruction {
  checkSigSource(p);
  const data = optionalSig(new BorshWriter().raw(IX_DISCRIMINATORS.execute).u32(p.leafIndex).vec(p.payload), p.sig).bytes();
  return ix(
    [
      w(p.feePayer, true),
      w(p.state),
      w(p.wallet),
      optional(p.cosigner, (k) => r(k, true)),
      optional(p.sig ? null : p.sigBuffer, (k) => w(k)),
      r(SystemProgram.programId),
      ...executeRemainingAccounts(p.actions, p.wallet, p.state),
    ],
    data,
  );
}

/** One vault token account for inherit to empty into the heir's. */
export interface InheritTokenAccount {
  mint: PublicKey;
  tokenProgram: PublicKey;
}

/**
 * Legacy `inherit` (no signature; anyone sends it): after the heir's deadline, moves the vault's SOL
 * and each listed token account (the wallet's canonical ATA, emptied into the heir's canonical ATA,
 * which the caller pays for when it is missing) to the recorded heir. The first one seals the vault.
 */
export function inheritIx(p: {
  caller: PublicKey;
  state: PublicKey;
  wallet: PublicKey;
  heir: PublicKey;
  tokens: InheritTokenAccount[];
}): TransactionInstruction {
  const [record] = findHeirPda(p.state);
  return ix(
    [
      w(p.caller, true),
      w(p.state),
      w(p.wallet),
      w(record),
      w(p.heir),
      r(SystemProgram.programId),
      r(ASSOCIATED_TOKEN_PROGRAM_ID),
      ...p.tokens.flatMap((t) => [r(t.tokenProgram), r(t.mint), w(ataOf(p.wallet, t.mint, t.tokenProgram)), w(ataOf(p.heir, t.mint, t.tokenProgram))]),
    ],
    IX_DISCRIMINATORS.inherit,
  );
}

export function rotateIx(
  p: { feePayer: PublicKey; state: PublicKey; cosigner?: PublicKey | null; leafIndex: number; newRoot: Uint8Array } & SigSource,
): TransactionInstruction {
  checkSigSource(p);
  if (p.newRoot.length !== ROOT_LEN) throw new Error('new_root must be 48 bytes');
  const data = optionalSig(new BorshWriter().raw(IX_DISCRIMINATORS.rotate).u32(p.leafIndex).raw(p.newRoot), p.sig).bytes();
  return ix(
    [
      w(p.feePayer, true),
      w(p.state),
      optional(p.cosigner, (k) => r(k, true)),
      optional(p.sig ? null : p.sigBuffer, (k) => w(k)),
      r(SystemProgram.programId),
    ],
    data,
  );
}

export function closeVaultIx(
  p: {
    feePayer: PublicKey;
    state: PublicKey;
    wallet: PublicKey;
    rentTo: PublicKey;
    cosigner?: PublicKey | null;
    leafIndex: number;
  } & SigSource,
): TransactionInstruction {
  checkSigSource(p);
  const data = optionalSig(
    new BorshWriter().raw(IX_DISCRIMINATORS.closeVault).u32(p.leafIndex).raw(p.rentTo.toBytes()),
    p.sig,
  ).bytes();
  return ix(
    [
      w(p.feePayer, true),
      w(p.state),
      w(p.wallet), // writable: close_vault sweeps any SOL left in the wallet to rent_to
      w(p.rentTo),
      optional(p.cosigner, (k) => r(k, true)),
      optional(p.sig ? null : p.sigBuffer, (k) => w(k)),
      r(SystemProgram.programId),
    ],
    data,
  );
}

export function initSigBufferIx(p: {
  payer: PublicKey;
  state: PublicKey;
  sigBuffer: PublicKey;
  rootEpoch: number;
  leafIndex: number;
}): TransactionInstruction {
  const data = new BorshWriter().raw(IX_DISCRIMINATORS.initSigBuffer).u32(p.rootEpoch).u32(p.leafIndex).bytes();
  return ix([w(p.payer, true), r(p.state), w(p.sigBuffer), r(SystemProgram.programId)], data);
}

export function writeSigBufferIx(p: {
  payer: PublicKey;
  sigBuffer: PublicKey;
  offset: number;
  data: Uint8Array;
}): TransactionInstruction {
  const data = new BorshWriter().raw(IX_DISCRIMINATORS.writeSigBuffer).u32(p.offset).vec(p.data).bytes();
  return ix([r(p.payer, true), w(p.sigBuffer)], data);
}

export function closeSigBufferIx(p: { payer: PublicKey; sigBuffer: PublicKey }): TransactionInstruction {
  return ix([w(p.payer, true), w(p.sigBuffer)], IX_DISCRIMINATORS.closeSigBuffer);
}
