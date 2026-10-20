import { describe, expect, it } from 'vitest';
import { ComputeBudgetProgram, Keypair, Transaction, TransactionInstruction, VersionedTransaction } from '@solana/web3.js';
import { Buffer } from 'buffer';
import { PROGRAM_ID } from '../src/constants';
import { SendPreparedError, SimulationFailedError, WalletModifiedTransactionError, assertWalletSignedAsBuilt, cuLimitIx, makeTx, sendOneByOne } from '../src/transport';

describe('assertWalletSignedAsBuilt', () => {
  const wallet = Keypair.generate();
  const payer = wallet.publicKey;
  const bh = { blockhash: '9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin', lastValidBlockHeight: 1 };
  const ix = new TransactionInstruction({ programId: PROGRAM_ID, keys: [{ pubkey: payer, isSigner: true, isWritable: true }], data: Buffer.from([1, 2, 3]) });
  const built = () => [makeTx([cuLimitIx(200_000), ix], payer, bh)];
  /** What a wallet returns: the transactions, signed by the fee payer. */
  const signedBy = (txs: Transaction[], kp = wallet) => txs.map((t) => (t.sign(kp), t));

  it('accepts the same transactions, and an added priority fee; returns what it checked', () => {
    const out = assertWalletSignedAsBuilt(built(), signedBy(built()));
    expect(out).toHaveLength(1);
    expect(out[0]!.serialize().equals(signedBy(built())[0]!.serialize())).toBe(true);
    const withFee = built();
    withFee[0]!.instructions.unshift(ComputeBudgetProgram.setComputeUnitPrice({ microLamports: 1000 }));
    expect(() => assertWalletSignedAsBuilt(built(), signedBy(withFee))).not.toThrow();
  });

  it('refuses a lowered compute limit, changed data, extra instructions, another fee payer, a bad signature or count', () => {
    expect(() => assertWalletSignedAsBuilt(built(), signedBy([makeTx([cuLimitIx(10), ix], payer, bh)]))).toThrow(WalletModifiedTransactionError);
    const changed = [makeTx([cuLimitIx(200_000), new TransactionInstruction({ programId: ix.programId, keys: ix.keys, data: Buffer.from([1, 2, 4]) })], payer, bh)];
    expect(() => assertWalletSignedAsBuilt(built(), signedBy(changed))).toThrow(/instructions/);
    const extra = built();
    extra[0]!.instructions.push(ix);
    expect(() => assertWalletSignedAsBuilt(built(), signedBy(extra))).toThrow(/instructions/);
    const other = Keypair.generate();
    const otherIx = new TransactionInstruction({ programId: PROGRAM_ID, keys: [{ pubkey: other.publicKey, isSigner: true, isWritable: true }], data: Buffer.from([1, 2, 3]) });
    expect(() => assertWalletSignedAsBuilt(built(), signedBy([makeTx([cuLimitIx(200_000), otherIx], other.publicKey, bh)], other))).toThrow(/fee payer/);
    expect(() => assertWalletSignedAsBuilt(built(), built())).toThrow(/signature/);
    expect(() => assertWalletSignedAsBuilt(built(), [])).toThrow(/expected 1/);
  });

  it('checks the bytes that are actually sent, not the instructions list', () => {
    // web3.js serialises a cached message when its JSON still matches: a wallet can return a
    // Transaction whose `instructions` look untouched while the bytes it signs say something else.
    const forged = built()[0]!;
    const lowered = makeTx([cuLimitIx(10), ix], payer, bh);
    lowered.sign(wallet);
    // Graft the lowered, validly signed message onto an object whose instructions look untouched.
    const f = forged as unknown as { _message: unknown; _json: unknown; toJSON(): unknown };
    f._message = lowered.compileMessage();
    forged.signatures = lowered.signatures;
    f._json = f.toJSON();
    expect(forged.instructions[0]!.data.equals(cuLimitIx(200_000).data)).toBe(true);
    expect(Transaction.from(forged.serialize()).instructions[0]!.data.equals(cuLimitIx(10).data)).toBe(true);
    expect(() => assertWalletSignedAsBuilt(built(), [forged])).toThrow(/instructions/);
  });
});

describe('sendOneByOne', () => {
  const payer = Keypair.generate().publicKey;
  const ixFor = (n: number) => new TransactionInstruction({ programId: PROGRAM_ID, keys: [{ pubkey: payer, isSigner: true, isWritable: true }], data: Buffer.from([n]) });
  const stale = { blockhash: '9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin', lastValidBlockHeight: 1 };
  const txs = () => [0, 1, 2].map((n) => makeTx([cuLimitIx(200_000), ixFor(n)], payer, stale));
  const tag = (tx: { instructions: TransactionInstruction[] } | VersionedTransaction) =>
    tx instanceof VersionedTransaction ? tx.message.compiledInstructions[1]!.data[0]! : tx.instructions[1]!.data[0]!;

  /**
   * A chain where transaction k only succeeds once 0..k-1 have landed (like the buffer path), and
   * the node lags: it reports "minimum context slot not reached" once per new slot.
   */
  function fakeChain(opts: { failSim?: number; failOnChain?: number } = {}) {
    const landed: number[] = [];
    const log: string[] = [];
    let slot = 100;
    let lagged = new Set<number>();
    let bh = 0;
    const conn = {
      async getLatestBlockhash() {
        bh += 1;
        return { blockhash: Keypair.generate().publicKey.toBase58(), lastValidBlockHeight: 1000 + bh };
      },
      async simulateTransaction(vtx: VersionedTransaction, cfg: { sigVerify: boolean; minContextSlot?: number }) {
        if (cfg.minContextSlot !== undefined && !lagged.has(cfg.minContextSlot)) {
          lagged.add(cfg.minContextSlot);
          throw new Error('failed to simulate transaction: Minimum context slot has not been reached');
        }
        const k = tag(vtx);
        log.push(`sim ${k} sigVerify=${cfg.sigVerify} landed=${landed.join(',')}`);
        const ok = landed.length === k && k !== opts.failSim;
        return { context: { slot }, value: { err: ok ? null : { InstructionError: [1, 'Custom'] }, logs: ok ? [] : ['Program log: buffer missing'] } };
      },
      async getSignatureStatuses(sigs: string[]) {
        const k = Number(sigs[0]!.split('-')[1]);
        if (k === opts.failOnChain) return { value: [{ slot, err: { InstructionError: [1, 'Custom'] }, confirmationStatus: 'confirmed' }] };
        if (!landed.includes(k)) {
          landed.push(k);
          slot += 1;
        }
        return { value: [{ slot, err: null, confirmationStatus: 'confirmed' }] };
      },
      async getBlockHeight() {
        return 0;
      },
      async getTransaction() {
        return { meta: { logMessages: ['Program log: failed'] } };
      },
    };
    return { conn: conn as never, log, landed };
  }

  it('asks the wallet for one transaction at a time, each simulated after the previous one landed', async () => {
    const { conn, log } = fakeChain();
    const seen: Array<{ k: number; blockhash: string; minContextSlot?: number }> = [];
    const sigs = await sendOneByOne(
      conn,
      txs(),
      async (tx, ctx) => {
        const k = tag(tx);
        seen.push({ k, blockhash: tx.recentBlockhash!, minContextSlot: ctx.minContextSlot });
        log.push(`wallet ${k}`);
        return `sig-${k}`;
      },
      { pollMs: 0 },
    );
    expect(sigs).toEqual(['sig-0', 'sig-1', 'sig-2']);
    expect(log).toEqual([
      'sim 0 sigVerify=false landed=',
      'wallet 0',
      'sim 1 sigVerify=false landed=0',
      'wallet 1',
      'sim 2 sigVerify=false landed=0,1',
      'wallet 2',
    ]);
    // A fresh blockhash per request (never the stale one it was built with), and the slot of the
    // previous confirmation goes to the wallet.
    expect(new Set(seen.map((s) => s.blockhash)).size).toBe(3);
    expect(seen.some((s) => s.blockhash === stale.blockhash)).toBe(false);
    expect(seen.map((s) => s.minContextSlot)).toEqual([undefined, 101, 102]);
  });

  it('never shows the wallet a transaction that would fail', async () => {
    const { conn } = fakeChain({ failSim: 1 });
    const asked: number[] = [];
    const err = await sendOneByOne(conn, txs(), async (tx) => (asked.push(tag(tx)), `sig-${tag(tx)}`), { pollMs: 0 }).catch((e: unknown) => e);
    expect(err).toBeInstanceOf(SimulationFailedError);
    expect((err as SimulationFailedError).index).toBe(1);
    expect((err as SimulationFailedError).logs).toEqual(['Program log: buffer missing']);
    expect(asked).toEqual([0]);
  });

  it('reports a rejected request with its index and what already landed', async () => {
    const { conn } = fakeChain();
    const err = await sendOneByOne(
      conn,
      txs(),
      async (tx) => {
        if (tag(tx) === 2) throw new Error('User rejected the request.');
        return `sig-${tag(tx)}`;
      },
      { pollMs: 0 },
    ).catch((e: unknown) => e);
    expect(err).toBeInstanceOf(SendPreparedError);
    expect((err as SendPreparedError).index).toBe(2);
    expect((err as SendPreparedError).signatures).toEqual(['sig-0', 'sig-1']);
    expect((err as Error).message).toMatch(/User rejected/);
  });

  it('reports an on-chain failure with its signature and logs', async () => {
    const { conn } = fakeChain({ failOnChain: 0 });
    const err = await sendOneByOne(conn, txs(), async (tx) => `sig-${tag(tx)}`, { pollMs: 0 }).catch((e: unknown) => e);
    expect(err).toBeInstanceOf(SendPreparedError);
    expect((err as SendPreparedError).signatures).toEqual(['sig-0']);
    expect((err as SendPreparedError).logs).toEqual(['Program log: failed']);
  });
});
