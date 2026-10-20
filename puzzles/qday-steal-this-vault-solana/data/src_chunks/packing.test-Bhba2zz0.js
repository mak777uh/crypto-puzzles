var e=`import { describe, expect, it } from 'vitest';
import { ComputeBudgetProgram, PublicKey } from '@solana/web3.js';
import type { Transaction, TransactionInstruction } from '@solana/web3.js';
import { createAssociatedTokenAccountIdempotentInstruction } from '@solana/spl-token';
import { buildBufferPathTxs, diffRanges, measureTx, TransactionTooLargeError } from '../src/transport';
import { closeVaultIx, executeIx, IX_DISCRIMINATORS, rotateIx } from '../src/instructions';
import { encodeActionsTs } from '../src/actions';
import type { VaultAction } from '../src/actions';
import { findSigBufferPda, findWalletPda } from '../src/addresses';
import { COMPUTE_UNITS, LEGACY_TX_LIMIT, PROGRAM_ID, SIG_LEN, SPL_TOKEN_PROGRAM_ID, TOKEN_2022_PROGRAM_ID } from '../src/constants';
import { executeComputeUnits } from '../src/prepare';
import { ASSOCIATED_TOKEN_PROGRAM_ID } from '../src/constants';
import { bytesEqual } from '../src/bytes';
import { pk } from './helpers';

const feePayer = pk();
const state = pk();
const [wallet] = findWalletPda(state);
const epoch = 2;
const leaf = 17;
const [sigBuffer] = findSigBufferPda(state, feePayer, epoch, leaf);
const bh = { blockhash: '9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin', lastValidBlockHeight: 100 };
const sig = new Uint8Array(SIG_LEN).map((_, i) => (i * 31 + 7) & 0xff);

function isProgramIx(ix: TransactionInstruction, disc: Uint8Array): boolean {
  return ix.programId.equals(PROGRAM_ID) && bytesEqual(ix.data.subarray(0, 8), disc);
}

/** Apply every write_sig_buffer in order to a zeroed buffer (what the chain would hold). */
function replayWrites(txs: Transaction[], initial?: Uint8Array): Uint8Array {
  const buf = initial ? initial.slice() : new Uint8Array(SIG_LEN);
  for (const tx of txs) {
    for (const ix of tx.instructions) {
      if (!isProgramIx(ix, IX_DISCRIMINATORS.writeSigBuffer)) continue;
      const dv = new DataView(ix.data.buffer, ix.data.byteOffset, ix.data.byteLength);
      const offset = dv.getUint32(8, true);
      const len = dv.getUint32(12, true);
      expect(ix.data.length).toBe(16 + len);
      expect(offset + len).toBeLessThanOrEqual(SIG_LEN);
      buf.set(ix.data.subarray(16, 16 + len), offset);
    }
  }
  return buf;
}

function execIx(actions: VaultAction[]): TransactionInstruction {
  return executeIx({ feePayer, state, wallet, leafIndex: leaf, payload: encodeActionsTs(actions), actions, sig: null, sigBuffer });
}

function pack(finalInstructions: TransactionInstruction[]) {
  return buildBufferPathTxs({
    feePayer,
    state,
    sigBuffer,
    rootEpoch: epoch,
    leafIndex: leaf,
    signature: sig,
    finalInstructions,
    finalComputeUnits: 300_000,
    blockhash: bh,
  });
}

function check(txs: Transaction[], finalDisc: Uint8Array) {
  for (const tx of txs) {
    expect(measureTx(tx.instructions, feePayer)).toBeLessThanOrEqual(LEGACY_TX_LIMIT);
    expect(tx.feePayer?.equals(feePayer)).toBe(true);
    expect(tx.recentBlockhash).toBe(bh.blockhash);
    // explicit CU limit first in every transaction
    expect(tx.instructions[0]?.programId.equals(ComputeBudgetProgram.programId)).toBe(true);
    // serializes for real (web3.js enforces the packet limit)
    expect(() => tx.serialize({ requireAllSignatures: false, verifySignatures: false })).not.toThrow();
  }
  expect(isProgramIx(txs[0]!.instructions[1]!, IX_DISCRIMINATORS.initSigBuffer)).toBe(true);
  const last = txs[txs.length - 1]!;
  expect(isProgramIx(last.instructions[last.instructions.length - 1]!, finalDisc)).toBe(true);
  expect(replayWrites(txs)).toEqual(sig);
  const finals = txs.flatMap((t) => t.instructions.filter((i) => isProgramIx(i, finalDisc)));
  expect(finals.length).toBe(1);
}

const sol = (): VaultAction => ({ kind: 'transferSol', to: pk(), lamports: 1_000_000n });
const tok = (program = SPL_TOKEN_PROGRAM_ID): VaultAction => ({ kind: 'transferToken', mint: pk(), tokenProgram: program, destination: pk(), amount: 5n });

describe('signature-buffer packing', () => {
  it('single SOL transfer → 3 legacy transactions, all ≤ 1,232 bytes', () => {
    const txs = pack([execIx([sol()])]);
    check(txs, IX_DISCRIMINATORS.execute);
    expect(txs.length).toBe(3);
  });

  it('SOL + 2 token transfers + close with ATA creation still packs', () => {
    const t = tok(TOKEN_2022_PROGRAM_ID);
    const actions: VaultAction[] = [sol(), tok(), t, { kind: 'closeTokenAccount', mint: pk(), tokenProgram: SPL_TOKEN_PROGRAM_ID, rentTo: feePayer }];
    const owner = pk();
    const create = createAssociatedTokenAccountIdempotentInstruction(feePayer, pk(), owner, pk(), SPL_TOKEN_PROGRAM_ID);
    const txs = pack([create, execIx(actions)]);
    check(txs, IX_DISCRIMINATORS.execute);
    expect(txs.length).toBeLessThanOrEqual(4);
  });

  it('rotate and close pack into 3 transactions', () => {
    const r = pack([rotateIx({ feePayer, state, leafIndex: leaf, newRoot: new Uint8Array(48).fill(1), sig: null, sigBuffer })]);
    check(r, IX_DISCRIMINATORS.rotate);
    expect(r.length).toBe(3);
    const c = pack([closeVaultIx({ feePayer, state, wallet, rentTo: pk(), leafIndex: leaf, sig: null, sigBuffer })]);
    check(c, IX_DISCRIMINATORS.closeVault);
    expect(c.length).toBe(3);
  });

  it('a final instruction that cannot fit is rejected before signing', () => {
    const actions = Array.from({ length: 8 }, () => tok());
    expect(() => pack([execIx(actions)])).toThrow(TransactionTooLargeError);
  });

  it('cosigner slot is a signer; none uses the program id placeholder', () => {
    const cos = pk();
    const withCos = executeIx({ feePayer, state, wallet, cosigner: cos, leafIndex: 1, payload: encodeActionsTs([sol()]), actions: [sol()], sig: null, sigBuffer });
    expect(withCos.keys[3]).toMatchObject({ isSigner: true, isWritable: false });
    expect(withCos.keys[3]!.pubkey.equals(cos)).toBe(true);
    const none = execIx([sol()]);
    expect(none.keys[3]!.pubkey.equals(PROGRAM_ID)).toBe(true);
    expect(none.keys[4]!.pubkey.equals(sigBuffer)).toBe(true);
    expect(none.keys[4]!.isWritable).toBe(true);
    // inline signature: buffer slot becomes the placeholder and the sig is Some(vec)
    const inline = executeIx({ feePayer, state, wallet, leafIndex: 1, payload: encodeActionsTs([sol()]), actions: [sol()], sig, sigBuffer: null });
    expect(inline.keys[4]!.pubkey.equals(PROGRAM_ID)).toBe(true);
    expect(inline.data.length).toBe(8 + 4 + 4 + 42 + 1 + 4 + SIG_LEN);
  });

  it('resume: only the differing ranges are written, no init', () => {
    const have = sig.slice();
    have.fill(0, 100, 300);
    have.fill(0, 2000, 2508);
    const ranges = diffRanges(have, sig);
    expect(ranges.length).toBeGreaterThan(0);
    const txs = buildBufferPathTxs({
      feePayer,
      state,
      sigBuffer,
      rootEpoch: epoch,
      leafIndex: leaf,
      signature: sig,
      finalInstructions: [execIx([sol()])],
      finalComputeUnits: 300_000,
      blockhash: bh,
      skipInit: true,
      ranges,
    });
    expect(txs.some((t) => t.instructions.some((i) => isProgramIx(i, IX_DISCRIMINATORS.initSigBuffer)))).toBe(false);
    expect(replayWrites(txs, have)).toEqual(sig);
    expect(txs.length).toBeLessThanOrEqual(2);
    // nothing to write: just the final transaction
    const only = buildBufferPathTxs({
      feePayer,
      state,
      sigBuffer,
      rootEpoch: epoch,
      leafIndex: leaf,
      signature: sig,
      finalInstructions: [execIx([sol()])],
      finalComputeUnits: 300_000,
      blockhash: bh,
      skipInit: true,
      ranges: [],
    });
    expect(only.length).toBe(1);
  });

  it('diffRanges finds and merges differing spans', () => {
    const a = new Uint8Array(1000);
    const b = a.slice();
    b[5] = 1;
    b[10] = 1;
    b[900] = 1;
    expect(diffRanges(a, b)).toEqual([
      [5, 11],
      [900, 901],
    ]);
    expect(diffRanges(b, b)).toEqual([]);
  });

  it('compute units follow the MEASUREMENTS.md formula', () => {
    // 1× TransferSol: 1.10 × (208,587 + 2,653) = 232,364 → 235,000
    expect(executeComputeUnits([sol()], wallet, 0)).toBe(235_000);
    // 2×: 1.10 × (208,587 + 2 × 2,653) = 235,282 → 240,000; 3×: 238,201 → 240,000
    expect(executeComputeUnits([sol(), sol()], wallet, 0)).toBe(240_000);
    expect(executeComputeUnits([sol(), sol(), sol()], wallet, 0)).toBe(240_000);
    // token actions add the vault ATA's bump-search iterations
    const t = tok() as Extract<VaultAction, { kind: 'transferToken' }>;
    const [, bump] = PublicKey.findProgramAddressSync([wallet.toBytes(), t.tokenProgram.toBytes(), t.mint.toBytes()], ASSOCIATED_TOKEN_PROGRAM_ID);
    const raw = COMPUTE_UNITS.executeBase + COMPUTE_UNITS.transferToken + COMPUTE_UNITS.pdaBumpIteration * (255 - bump);
    expect(executeComputeUnits([t], wallet, 1)).toBe(Math.ceil((raw * 1.1) / 5000) * 5000 + COMPUTE_UNITS.createAtaIdempotent);
    // never above the constant the program publishes for any ≤ 8-action payload (+ ATA creates)
    expect(executeComputeUnits(Array.from({ length: 8 }, () => sol()), wallet, 0)).toBeLessThanOrEqual(380_000);
  });

  it('program id placeholder is the real program id', () => {
    expect(PROGRAM_ID.equals(new PublicKey('22AEUZtxpbi1ReJGrG9SyFob3uHGzZERERyVNp6uV8Y6'))).toBe(true);
  });
});
`;export{e as default};