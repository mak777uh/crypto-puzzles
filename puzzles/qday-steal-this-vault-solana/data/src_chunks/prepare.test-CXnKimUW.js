var e=`// prepare* against a mocked Connection (no validator): leaf rules, ledger ordering, summaries.
import { beforeAll, describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { Keypair, PublicKey } from '@solana/web3.js';
import type { AccountInfo, Connection } from '@solana/web3.js';
import { Buffer } from 'buffer';
import { initWasm, getWasm } from '../src/wasm';
import { deriveRoot } from '../src/keys';
import { computeVaultId, encodeOptions, findHeirPda, findStatePda, findWalletPda } from '../src/addresses';
import { HEIR_DISCRIMINATOR, SIG_BUFFER_DISCRIMINATOR, VAULT_STATE_DISCRIMINATOR } from '../src/state';
import { LeafReuseError, MemoryLedger, lmsKeyId } from '../src/ledger';
import { FrozenTokenAccountsError, PrepareCancelledError, VaultInheritedError, prepareClose, prepareExecute, prepareRotate, rebuildPrepared } from '../src/prepare';
import { ACCOUNT_SIZE, AccountLayout } from '@solana/spl-token';
import { MainnetDisabledError, assertClusterAllowed } from '../src/cluster';
import { BetaCapError, buildDepositTxs } from '../src/deposit';
import { IncompleteHistoryError, PendingSignatureError, findPendingSignatures } from '../src/pending';
import { IX_DISCRIMINATORS } from '../src/instructions';
import { encodeActions, messagePrefixTs } from '../src/actions';
import type { VaultAction } from '../src/actions';
import { shortAddress } from '../src/describe';
import { BETA_CAP_LAMPORTS, CLUSTER_ID, MAINNET_ENABLED, PROGRAM_ID, SIG_LEN, SPL_TOKEN_PROGRAM_ID } from '../src/constants';
import type { ClusterName } from '../src/constants';
import { bytesEqual, concatBytes, fromHex, sha256, toHex, u32le } from '../src/bytes';
import { measureTx } from '../src/transport';
import { fetchVault } from '../src/state';
import type { VaultInfo } from '../src/state';

const keys = JSON.parse(readFileSync(new URL('../../../crates/bunker-core/vectors/keys.json', import.meta.url), 'utf8')) as {
  mnemonic: string;
  epochs: { name: string; root: string }[];
  generate_mnemonic: { mnemonic: string }[];
};
const MNEMONIC = keys.mnemonic;
/** Another valid public test seed (BIP-39 vector), used as the "new seed" of a rotation. */
const OTHER_MNEMONIC = keys.generate_mnemonic.map((g) => g.mnemonic).find((m) => m !== MNEMONIC)!;
const goldenRoot = (name: string): string => keys.epochs.find((e) => e.name.startsWith(name))!.root;

function vaultStateData(root: Uint8Array, vaultId: Uint8Array, epoch: number, nextLeaf: number, cosigner: PublicKey | null = null): Buffer {
  const b = Buffer.alloc(280);
  let o = 0;
  b.set(VAULT_STATE_DISCRIMINATOR, o);
  o += 8;
  b[o++] = 1; // version
  b[o++] = 255; // bump
  b[o++] = 255; // wallet bump
  b.set(vaultId, o);
  o += 32;
  b.set(root, o);
  o += 48;
  b.writeUInt32LE(epoch, o);
  o += 4;
  b.writeUInt32LE(nextLeaf, o);
  o += 4;
  b.writeUInt32LE(1024, o);
  o += 4;
  if (cosigner) {
    b[o++] = 1; // cosigner: Some
    b.set(cosigner.toBytes(), o);
    o += 32;
  } else {
    b[o++] = 0; // cosigner: None
  }
  b.writeBigUInt64LE(123n, o);
  o += 8;
  b.writeBigUInt64LE(0n, o);
  return b;
}

interface Chain {
  conn: Connection;
  /** Signature buffers that exist on chain for this vault: [epoch, leaf] (default none). */
  buffers: Array<[number, number]>;
  /** Transactions in the vault's history (default none). */
  history: Array<{ failed: boolean; feePayer: PublicKey; data: Uint8Array }>;
  state: PublicKey;
  wallet: PublicKey;
  vaultId: Uint8Array;
  /** The vault's current root (its key at \`epoch\`). */
  root: Uint8Array;
  setNextLeaf(n: number): void;
  walletLamports: number;
  /** Any other accounts on chain, by address (default none). */
  accounts: Map<string, AccountInfo<Buffer>>;
}

interface ChainOpts {
  /** The vault's cosigner (hybrid mode); its epoch-0 key is bound to it. */
  cosigner?: PublicKey;
  /** Current key epoch; epoch e ≥ 1 holds the key MNEMONIC derives for this vault at e. */
  epoch?: number;
  /** Open the vault with a root derived for other options (cosigner) than it is opened with. */
  rootCosigner?: PublicKey | null;
  /** Cluster the vault's keys are derived for (default localnet). */
  cluster?: ClusterName;
}

/** A localnet vault opened from MNEMONIC (keys bound to localnet, the program and the vault). */
async function mockChain(nextLeaf = 0, walletLamports = 5_000_000_000, o: ChainOpts = {}): Promise<Chain> {
  const cosigner = o.cosigner ?? null;
  const cluster = o.cluster ?? 'localnet';
  const root0 = await deriveRoot(MNEMONIC, 0, { cluster, cosigner: o.rootCosigner !== undefined ? o.rootCosigner : cosigner });
  const vaultId = computeVaultId(root0, cosigner);
  const epoch = o.epoch ?? 0;
  const root = epoch === 0 ? root0 : await deriveRoot(MNEMONIC, epoch, { cluster, vaultId });
  const [state] = findStatePda(vaultId);
  const [wallet] = findWalletPda(state);
  const chain: Chain = {
    state,
    wallet,
    vaultId,
    root,
    walletLamports,
    buffers: [],
    history: [],
    accounts: new Map(),
    setNextLeaf(n) {
      data = vaultStateData(root, vaultId, epoch, n, cosigner);
    },
    conn: undefined as unknown as Connection,
  };
  let data = vaultStateData(root, vaultId, epoch, nextLeaf, cosigner);
  const info = (d: Buffer, owner: PublicKey, lamports = 1_000_000): AccountInfo<Buffer> => ({ data: d, owner, lamports, executable: false, rentEpoch: 0 });
  const get = (k: PublicKey): AccountInfo<Buffer> | null => {
    if (k.equals(state)) return info(data, PROGRAM_ID, 3_000_000);
    if (k.equals(wallet)) return chain.walletLamports ? info(Buffer.alloc(0), PublicKey.default, chain.walletLamports) : null;
    return chain.accounts.get(k.toBase58()) ?? null;
  };
  chain.conn = {
    getAccountInfo: async (k: PublicKey) => get(k),
    getMultipleAccountsInfo: async (ks: PublicKey[]) => ks.map(get),
    getMinimumBalanceForRentExemption: async () => 890_880,
    getLatestBlockhash: async () => ({ blockhash: '9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin', lastValidBlockHeight: 1000 }),
    getBalance: async (k: PublicKey) => (k.equals(wallet) ? chain.walletLamports : 0),
    getTokenAccountsByOwner: async () => ({ context: { slot: 1 }, value: [] }),
    getProgramAccounts: async () =>
      chain.buffers.map(([epoch, leaf]) => {
        const d = Buffer.alloc(8 + 81 + SIG_LEN);
        d.set(SIG_BUFFER_DISCRIMINATOR, 0);
        d.set(state.toBytes(), 8);
        d.set(feePayer.toBytes(), 40);
        d.writeUInt32LE(epoch, 72);
        d.writeUInt32LE(leaf, 76);
        return { pubkey: Keypair.generate().publicKey, account: info(d, PROGRAM_ID) };
      }),
    getSignaturesForAddress: async () => chain.history.map((_, i) => ({ signature: \`sig\${i}\` })),
    getTransactions: async () =>
      chain.history.map((h) => ({
        meta: { err: h.failed ? { InstructionError: [0, { Custom: 1 }] } : null },
        transaction: { message: { staticAccountKeys: [h.feePayer, PROGRAM_ID], compiledInstructions: [{ programIdIndex: 1, data: h.data }] } },
      })),
  } as unknown as Connection;
  return chain;
}

const feePayer = Keypair.generate().publicKey;
const recipient = Keypair.generate().publicKey;

beforeAll(async () => {
  await initWasm();
});

describe('prepareExecute', () => {
  it('records the leaf (message + signature) before returning, and summarises the signed payload', async () => {
    const chain = await mockChain(3);
    const vault = (await fetchVault(chain.conn, chain.state))!;
    const ledger = new MemoryLedger();
    const p = await prepareExecute({
      conn: chain.conn,
      cluster: 'localnet',
      vault,
      mnemonic: MNEMONIC,
      feePayer,
      ledger,
      actions: [{ kind: 'transferSol', to: recipient, lamports: 1_000_000_000n }],
    });
    expect(p.leafIndex).toBe(3);
    expect(p.rootEpoch).toBe(0);
    expect(p.summary).toMatch(/^This signature allows: send 1 SOL to \\w{4}…\\w{4}\\. Nothing else\\.$/);
    expect(p.transactions.length).toBe(3);
    for (const tx of p.transactions) expect(measureTx(tx.instructions, feePayer)).toBeLessThanOrEqual(1232);
    expect(p.lowLeaves).toBe(false);
    const e = ledger.get(chain.state, 0, 3)!;
    expect(e.messageHash).toBe(toHex(sha256(p.message)));
    expect(e.signature).toBeDefined();
    expect(p.signature.length).toBe(SIG_LEN);
    expect(getWasm().verify(vault.currentRoot, p.message, p.signature)).toBe(true);
    // the final instruction is execute with sig = None (buffer path)
    const last = p.transactions[2]!.instructions.at(-1)!;
    expect(bytesEqual(last.data.subarray(0, 8), IX_DISCRIMINATORS.execute)).toBe(true);
    expect(last.data.at(-1)).toBe(0);

    // leaf 3 is signed but has not landed: a second signature is refused while it can still land…
    const again = {
      conn: chain.conn,
      cluster: 'localnet' as const,
      vault,
      mnemonic: MNEMONIC,
      feePayer,
      ledger,
      actions: [{ kind: 'transferSol' as const, to: recipient, lamports: 2_000_000_000n }],
    };
    const err = await prepareExecute(again).catch((e: unknown) => e);
    expect(err).toBeInstanceOf(PendingSignatureError);
    expect((err as PendingSignatureError).pending).toMatchObject([{ leafIndex: 3, source: 'ledger', canFinish: true, kind: 'execute' }]);
    expect((err as PendingSignatureError).pending[0]!.summary).toMatch(/^This signature allows: send 1 SOL/);
    // …and, if the user insists, never reuses the leaf even though the chain has not moved.
    const p2 = await prepareExecute({ ...again, abandonPending: true });
    expect(p2.leafIndex).toBe(4);
  });

  it('rebuildPrepared returns the identical signature for a spent leaf (never re-signs)', async () => {
    const chain = await mockChain(0);
    const vault = (await fetchVault(chain.conn, chain.state))!;
    const ledger = new MemoryLedger();
    const p = await prepareExecute({
      conn: chain.conn,
      cluster: 'localnet',
      vault,
      mnemonic: MNEMONIC,
      feePayer,
      ledger,
      actions: [{ kind: 'transferSol', to: recipient, lamports: 5n * 10n ** 8n }],
    });
    const r = await rebuildPrepared({ conn: chain.conn, cluster: 'localnet', vault: chain.state, ledger, leafIndex: p.leafIndex, feePayer });
    expect(toHex(r.message)).toBe(toHex(p.message));
    expect(toHex(r.signature)).toBe(toHex(p.signature));
    expect(r.summary).toBe(p.summary);
    expect(r.transactions.map((t) => t.serializeMessage().toString('hex'))).toEqual(p.transactions.map((t) => t.serializeMessage().toString('hex')));
    // once the chain moved past the leaf, rebuilding is refused
    chain.setNextLeaf(p.leafIndex + 1);
    await expect(rebuildPrepared({ conn: chain.conn, cluster: 'localnet', vault: chain.state, ledger, leafIndex: p.leafIndex, feePayer })).rejects.toThrow(/already consumed/);
  });

  it("transport 'inline' returns one v1-sized bundle with the signature inside the instruction", async () => {
    const chain = await mockChain(9);
    const vault = (await fetchVault(chain.conn, chain.state))!;
    const ledger = new MemoryLedger();
    const p = await prepareExecute({
      conn: chain.conn,
      cluster: 'localnet',
      vault,
      mnemonic: MNEMONIC,
      feePayer,
      ledger,
      transport: 'inline',
      actions: [{ kind: 'transferSol', to: recipient, lamports: 10n ** 9n }],
    });
    expect(p.transport).toBe('inline');
    expect(p.transactions).toEqual([]);
    expect(p.sigBuffer).toBeNull();
    const b = p.inline!;
    expect(b.instructions.length).toBe(1);
    expect(b.estimatedSize).toBeGreaterThan(2508);
    expect(b.estimatedSize).toBeLessThanOrEqual(4096);
    expect(b.computeUnitLimit).toBeGreaterThan(0);
    expect(b.loadedAccountsDataSizeLimit).toBeGreaterThan(0);
    const data = b.instructions[0]!.data;
    expect(bytesEqual(data.subarray(0, 8), IX_DISCRIMINATORS.execute)).toBe(true);
    // ... ‖ Some(1) ‖ u32 len ‖ sig
    expect(toHex(data.subarray(data.length - SIG_LEN))).toBe(toHex(p.signature));
    expect(data[data.length - SIG_LEN - 5]).toBe(1);
    expect(b.instructions[0]!.keys[4]!.pubkey.equals(PROGRAM_ID)).toBe(true); // no buffer account
    expect(ledger.get(chain.state, 0, 9)?.signature).toBeDefined();
  });

  it('refuses a seed that does not control the vault', async () => {
    const chain = await mockChain(0);
    const vault = (await fetchVault(chain.conn, chain.state))!;
    const other = getWasm().generate_mnemonic(Uint8Array.from({ length: 32 }, (_, i) => i + 1));
    await expect(
      prepareExecute({
        conn: chain.conn,
        cluster: 'localnet',
        vault,
        mnemonic: other,
        feePayer,
        ledger: new MemoryLedger(),
        actions: [{ kind: 'transferSol', to: recipient, lamports: 1n }],
      }),
    ).rejects.toThrow('This seed does not control this vault at epoch 0');
  });

  it('cancel in confirm() leaves the ledger untouched; preflight failures too', async () => {
    const chain = await mockChain(0, 1_000_000_000);
    const vault = (await fetchVault(chain.conn, chain.state))!;
    const ledger = new MemoryLedger();
    let seen = '';
    await expect(
      prepareExecute({
        conn: chain.conn,
        cluster: 'localnet',
        vault,
        mnemonic: MNEMONIC,
        feePayer,
        ledger,
        actions: [{ kind: 'transferSol', to: recipient, lamports: 1_000_000n }],
        confirm: (pv) => {
          seen = pv.summary;
          return false;
        },
      }),
    ).rejects.toThrow(PrepareCancelledError);
    expect(seen).toMatch(/send 0.001 SOL/);
    expect(ledger.list()).toEqual([]);
    // more SOL than the vault holds
    await expect(
      prepareExecute({ conn: chain.conn, cluster: 'localnet', vault, mnemonic: MNEMONIC, feePayer, ledger, actions: [{ kind: 'transferSol', to: recipient, lamports: 2_000_000_000n }] }),
    ).rejects.toThrow(/does not hold enough SOL/);
    // leaving dust below rent-exemption
    await expect(
      prepareExecute({ conn: chain.conn, cluster: 'localnet', vault, mnemonic: MNEMONIC, feePayer, ledger, actions: [{ kind: 'transferSol', to: recipient, lamports: 999_999_000n }] }),
    ).rejects.toThrow(/exactly 0/);
    expect(ledger.list()).toEqual([]);
  });

  it('warns when < 16 leaves remain and keeps the last leaf for rotate', async () => {
    const chain = await mockChain(1015);
    const vault = (await fetchVault(chain.conn, chain.state))!;
    const ledger = new MemoryLedger();
    const p = await prepareExecute({ conn: chain.conn, cluster: 'localnet', vault, mnemonic: MNEMONIC, feePayer, ledger, actions: [{ kind: 'transferSol', to: recipient, lamports: 10n ** 9n }] });
    expect(p.leavesLeft).toBe(8);
    expect(p.lowLeaves).toBe(true);
    expect(p.warnings.join(' ')).toMatch(/rotate/);

    chain.setNextLeaf(1023);
    const v2 = (await fetchVault(chain.conn, chain.state))!;
    await expect(
      prepareExecute({ conn: chain.conn, cluster: 'localnet', vault: v2, mnemonic: MNEMONIC, feePayer, ledger: new MemoryLedger(), actions: [{ kind: 'transferSol', to: recipient, lamports: 10n ** 9n }] }),
    ).rejects.toThrow(/Rotate the key first/);
    const r = await prepareRotate({ conn: chain.conn, cluster: 'localnet', vault: v2, mnemonic: MNEMONIC, feePayer, ledger: new MemoryLedger() });
    expect(r.leafIndex).toBe(1023);
    expect(r.summary).toBe('This signature allows: replace the vault key (epoch 0 → 1). No assets move.');
    // the next key is this vault's epoch-1 key: bound to its vault id (golden vector)
    expect(toHex(r.newRoot!)).toBe(toHex(await deriveRoot(MNEMONIC, 1, { cluster: 'localnet', vaultId: chain.vaultId })));
    expect(toHex(r.newRoot!)).toBe(goldenRoot('localnet, no cosigner, epoch 1'));
    expect(r.message.subarray(83)).toEqual(r.newRoot);
  });

  it('close is never signed on the last leaf, which the program keeps for rotate', async () => {
    // Regression: close used the whole tree, so at next_leaf 1023 the client signed (and revealed)
    // a close the program refuses (6039), leaving rotate as the only way out on that same leaf.
    const chain = await mockChain(1023);
    const vault = (await fetchVault(chain.conn, chain.state))!;
    const ledger = new MemoryLedger();
    await expect(
      prepareClose({ conn: chain.conn, cluster: 'localnet', vault, mnemonic: MNEMONIC, feePayer, ledger, rentTo: feePayer }),
    ).rejects.toThrow(/last leaf is kept for rotate\\)\\. Rotate the key first/);
    expect(ledger.list()).toEqual([]);
    const r = await prepareRotate({ conn: chain.conn, cluster: 'localnet', vault, mnemonic: MNEMONIC, feePayer, ledger });
    expect(r.leafIndex).toBe(1023);
  });

  it('close refuses a recipient that would swallow the swept SOL', async () => {
    const chain = await mockChain(0);
    const vault = (await fetchVault(chain.conn, chain.state))!;
    const tokenAccount = Keypair.generate().publicKey;
    chain.accounts.set(tokenAccount.toBase58(), { data: Buffer.alloc(165), owner: SPL_TOKEN_PROGRAM_ID, lamports: 2_039_280, executable: false, rentEpoch: 0 });
    const ledger = new MemoryLedger();
    await expect(
      prepareClose({ conn: chain.conn, cluster: 'localnet', vault, mnemonic: MNEMONIC, feePayer, ledger, rentTo: tokenAccount }),
    ).rejects.toThrow(/Refusing to close: .* token account or mint/);
    expect(ledger.list()).toEqual([]);
  });

  it('close sweeps leftover SOL', async () => {
    const chain = await mockChain(0, 1_000_000_000);
    const vault = (await fetchVault(chain.conn, chain.state))!;
    // SOL still in the wallet is fine: close_vault sweeps it to rentTo, and the statement says so.
    const c = await prepareClose({ conn: chain.conn, cluster: 'localnet', vault, mnemonic: MNEMONIC, feePayer, ledger: new MemoryLedger(), rentTo: feePayer });
    expect(c.summary).toMatch(/close this vault permanently and send its account rent and any SOL left in it to/);
    expect(c.message.subarray(83)).toEqual(feePayer.toBytes());
    // Mainnet is enabled (capped beta) ...
    expect(() => assertClusterAllowed('mainnet-beta')).not.toThrow(MainnetDisabledError);
    // ... and keys are bound to their cluster: this localnet vault's key does not sign for mainnet.
    await expect(
      prepareExecute({ conn: chain.conn, cluster: 'mainnet-beta', vault, mnemonic: MNEMONIC, feePayer, ledger: new MemoryLedger(), actions: [{ kind: 'transferSol', to: recipient, lamports: 1n }] }),
    ).rejects.toThrow(/does not control this vault/);
    expect(fromHex('00').length).toBe(1);
  });
});

describe('mainnet', () => {
  it('is switched on: a mainnet vault signs messages for cluster 4', async () => {
    expect(MAINNET_ENABLED).toBe(true);
    expect(() => assertClusterAllowed('mainnet-beta')).not.toThrow();
    const chain = await mockChain(0, 5_000_000_000, { cluster: 'mainnet-beta' });
    const vault = (await fetchVault(chain.conn, chain.state))!;
    const r = await prepareExecute({ conn: chain.conn, cluster: 'mainnet-beta', vault, mnemonic: MNEMONIC, feePayer, ledger: new MemoryLedger(), actions: [{ kind: 'transferSol', to: recipient, lamports: 1_000_000_000n }] });
    expect(r.message[9]).toBe(CLUSTER_ID['mainnet-beta']);
    expect(r.message[9]).toBe(4);
  });

  it('a key derived for another cluster never signs for a mainnet vault', async () => {
    const chain = await mockChain(0, 5_000_000_000);
    const vault = (await fetchVault(chain.conn, chain.state))!;
    const ledger = new MemoryLedger();
    await expect(
      prepareExecute({ conn: chain.conn, cluster: 'mainnet-beta', vault, mnemonic: MNEMONIC, feePayer, ledger, actions: [{ kind: 'transferSol', to: recipient, lamports: 1_000_000_000n }] }),
    ).rejects.toThrow(/This seed does not control this vault/);
    expect(ledger.list()).toEqual([]);
  });

  it('the 10 SOL deposit cap still applies to SOL deposits on mainnet', async () => {
    const chain = await mockChain(0, 9_500_000_000, { cluster: 'mainnet-beta' });
    const deposit = (amount: bigint) => buildDepositTxs({ conn: chain.conn, from: feePayer, wallet: chain.wallet, state: chain.state, asset: { kind: 'sol' }, amount, cluster: 'mainnet-beta' });
    await expect(deposit(BETA_CAP_LAMPORTS - 9_500_000_000n + 1n)).rejects.toThrow(BetaCapError);
    await expect(deposit(BETA_CAP_LAMPORTS - 9_500_000_000n)).resolves.toHaveLength(1);
  });
});

describe('keys are bound to their vault (MESSAGE_FORMAT §2)', () => {
  const sendOne = (chain: Chain, vault: VaultInfo, ledger: MemoryLedger) =>
    prepareExecute({ conn: chain.conn, cluster: 'localnet', vault, mnemonic: MNEMONIC, feePayer, ledger, actions: [{ kind: 'transferSol', to: recipient, lamports: 1_000_000_000n }] });

  it('one seed backs a plain and a hybrid vault without the two sharing a one-time key', async () => {
    const cosigner = Keypair.generate().publicKey;
    const plain = await mockChain(0);
    const hybrid = await mockChain(0, 5_000_000_000, { cosigner });
    expect(plain.state.equals(hybrid.state)).toBe(false);
    expect(lmsKeyId(plain.root)).not.toBe(lmsKeyId(hybrid.root));

    // One ledger, leaf 0 in both vaults: a different key each, so the ledger's cross-vault guard
    // (same key identity + leaf) has nothing to refuse.
    const ledger = new MemoryLedger();
    const a = await sendOne(plain, (await fetchVault(plain.conn, plain.state))!, ledger);
    const b = await sendOne(hybrid, (await fetchVault(hybrid.conn, hybrid.state))!, ledger);
    expect([a.leafIndex, b.leafIndex]).toEqual([0, 0]);
    expect(getWasm().verify(hybrid.root, b.message, b.signature)).toBe(true);
    expect(getWasm().verify(plain.root, b.message, b.signature)).toBe(false);
    expect(b.warnings.join(' ')).toMatch(/hybrid mode/);
    // Under one shared key (the unbound key derivation) the second vault's leaf 0 would be refused.
    const shared = new MemoryLedger();
    shared.markSpent(plain.state, 0, 0, sha256(a.message), a.message, { root: plain.root });
    expect(() => shared.markSpent(hybrid.state, 0, 0, sha256(b.message), b.message, { root: plain.root })).toThrow(LeafReuseError);
  });

  it('refuses a vault whose epoch-0 root was derived for other options', async () => {
    // Someone opens a vault with this seed's no-cosigner root but their own cosigner: same root,
    // different vault id. The seed's key for those options is a different key, so it never signs.
    const chain = await mockChain(0, 5_000_000_000, { cosigner: Keypair.generate().publicKey, rootCosigner: null });
    const vault = (await fetchVault(chain.conn, chain.state))!;
    await expect(sendOne(chain, vault, new MemoryLedger())).rejects.toThrow('This seed does not control this vault at epoch 0');
  });

  it('signs at epoch ≥ 1 with the key bound to the vault id', async () => {
    const chain = await mockChain(7, 5_000_000_000, { epoch: 2 });
    const vault = (await fetchVault(chain.conn, chain.state))!;
    const p = await sendOne(chain, vault, new MemoryLedger());
    expect([p.rootEpoch, p.leafIndex]).toEqual([2, 7]);
    expect(getWasm().verify(chain.root, p.message, p.signature)).toBe(true);
  });

  it('rotate to a new seed publishes that seed’s key for this vault at epoch + 1', async () => {
    const chain = await mockChain(0);
    const vault = (await fetchVault(chain.conn, chain.state))!;
    const r = await prepareRotate({ conn: chain.conn, cluster: 'localnet', vault, mnemonic: MNEMONIC, newMnemonic: OTHER_MNEMONIC, feePayer, ledger: new MemoryLedger() });
    const expected = await deriveRoot(OTHER_MNEMONIC, 1, { cluster: 'localnet', vaultId: chain.vaultId });
    expect(toHex(r.newRoot!)).toBe(toHex(expected));
    expect(toHex(r.newRoot!)).not.toBe(toHex(await deriveRoot(MNEMONIC, 1, { cluster: 'localnet', vaultId: chain.vaultId })));
    expect(r.message.subarray(83)).toEqual(r.newRoot);
  });
});

describe('pending signatures and a lost ledger', () => {
  const withdraw = (chain: Chain, vault: VaultInfo, ledger: MemoryLedger, abandonPending = false) =>
    prepareExecute({ conn: chain.conn, cluster: 'localnet', vault, mnemonic: MNEMONIC, feePayer, ledger, abandonPending, actions: [{ kind: 'transferSol', to: recipient, lamports: 10n ** 8n }] });

  it('a device with an empty ledger never re-signs a leaf the chain shows as revealed', async () => {
    const chain = await mockChain(5);
    chain.buffers = [[0, 5], [1, 9]]; // leaf 5 at this epoch was revealed; the epoch-1 buffer is irrelevant
    const vault = (await fetchVault(chain.conn, chain.state))!;
    const err = await withdraw(chain, vault, new MemoryLedger()).catch((e: unknown) => e);
    expect(err).toBeInstanceOf(PendingSignatureError);
    expect((err as PendingSignatureError).pending).toMatchObject([{ leafIndex: 5, source: 'chain', canFinish: false }]);
    const p = await withdraw(chain, vault, new MemoryLedger(), true);
    expect(p.leafIndex).toBe(6);
  });

  it('a failed execute whose inline signature verifies counts as revealed; forged ones and strangers’ buffers do not', async () => {
    const chain = await mockChain(5);
    const vault = (await fetchVault(chain.conn, chain.state))!;
    const payload = encodeActions([{ kind: 'transferSol', to: recipient, lamports: 1n }]);
    const executeIx = (leaf: number, sig: Uint8Array | null) =>
      concatBytes(IX_DISCRIMINATORS.execute, u32le(leaf), u32le(payload.length), payload, sig ? concatBytes(Uint8Array.of(1), u32le(sig.length), sig) : Uint8Array.of(0));
    const binding = encodeOptions(null);
    const msgAt = (leaf: number) => concatBytes(messagePrefixTs(1, 1, chain.state, 0, leaf), payload);
    const real = getWasm().sign(MNEMONIC, 0, 7, msgAt(7), binding, chain.root);
    const stranger = Keypair.generate().publicKey;
    const forged = real.slice();
    forged[100] = (forged[100] as number) ^ 1;
    const initIx = (epoch: number, leaf: number) => concatBytes(IX_DISCRIMINATORS.initSigBuffer, u32le(epoch), u32le(leaf));
    chain.history = [
      { failed: true, feePayer: stranger, data: executeIx(7, real) }, // the vault's real signature, relayed by anyone
      { failed: true, feePayer: stranger, data: executeIx(900, forged) }, // a stranger's garbage naming leaf 900
      { failed: true, feePayer: stranger, data: executeIx(2, real) }, // below next_leaf: already dead
      { failed: false, feePayer: stranger, data: initIx(0, 1000) }, // a stranger's buffer init: not evidence
      { failed: false, feePayer, data: initIx(1, 6) }, // our buffer, but another epoch
    ];
    chain.buffers = [];
    const err = await withdraw(chain, vault, new MemoryLedger()).catch((e: unknown) => e);
    expect((err as PendingSignatureError).pending.map((x) => x.leafIndex)).toEqual([7]);
    expect((await withdraw(chain, vault, new MemoryLedger(), true)).leafIndex).toBe(8);
    // our own buffer init at this epoch counts (only our fee payer can sign it)
    chain.history = [{ failed: false, feePayer, data: initIx(0, 6) }];
    const err2 = await withdraw(chain, vault, new MemoryLedger()).catch((e: unknown) => e);
    expect((err2 as PendingSignatureError).pending.map((x) => x.leafIndex)).toEqual([6]);
  });

  it('nothing pending once the chain passes the leaf', async () => {
    const chain = await mockChain(0);
    const ledger = new MemoryLedger();
    const vault = (await fetchVault(chain.conn, chain.state))!;
    const first = await withdraw(chain, vault, ledger);
    chain.setNextLeaf(first.leafIndex + 1);
    const moved = (await fetchVault(chain.conn, chain.state))!;
    expect((await withdraw(chain, moved, ledger)).leafIndex).toBe(first.leafIndex + 1);
  });
});

describe('chain evidence covers the whole key epoch', () => {
  const rotateData = (leaf: number, root: Uint8Array) => {
    const d = Buffer.alloc(8 + 4 + 48 + 1);
    d.set(IX_DISCRIMINATORS.rotate, 0);
    d.writeUInt32LE(leaf, 8);
    d.set(root, 12);
    return d;
  };
  /** A history of \`pages\` full pages; \`at(page, i)\` returns the transaction for that slot (or null). */
  const longHistory = (chain: Chain, at: (page: number, i: number) => unknown) => {
    let pages = 0;
    const conn = chain.conn as unknown as Record<string, unknown>;
    conn.getSignaturesForAddress = async () => {
      pages++;
      return Array.from({ length: 1000 }, (_, i) => ({ signature: \`p\${pages}-\${i}\` }));
    };
    conn.getTransactions = async (sigs: string[]) => sigs.map((s) => at(pages, Number(s.split('-')[1])));
    return () => pages;
  };

  it('stops at the rotate that installed the current key', async () => {
    const chain = await mockChain(0, 5_000_000_000, { epoch: 1 });
    const vault = (await fetchVault(chain.conn, chain.state))!;
    const pages = longHistory(chain, (page, i) =>
      page === 1 && i === 3
        ? { meta: { err: null }, transaction: { message: { staticAccountKeys: [feePayer, PROGRAM_ID], compiledInstructions: [{ programIdIndex: 1, data: rotateData(1023, chain.root) }] } } }
        : null,
    );
    const r = await findPendingSignatures({ conn: chain.conn, cluster: 'localnet', vault, ledger: new MemoryLedger(), feePayer });
    expect(pages()).toBe(1);
    expect(r.floor).toBe(0);
  });

  it('fails closed when the epoch is longer than the scan and this device has no record of it', async () => {
    const chain = await mockChain(0, 5_000_000_000, { epoch: 1 });
    const vault = (await fetchVault(chain.conn, chain.state))!;
    const pages = longHistory(chain, () => null);
    await expect(findPendingSignatures({ conn: chain.conn, cluster: 'localnet', vault, ledger: new MemoryLedger(), feePayer })).rejects.toThrow(IncompleteHistoryError);
    expect(pages()).toBe(20);
    // A device that has signed at this epoch carries the floor in its ledger, so spam can't block it.
    const ledger = new MemoryLedger();
    const m = new TextEncoder().encode('earlier signature at this epoch');
    ledger.markSpent(vault.state, vault.rootEpoch, 0, sha256(m), m, { root: chain.root });
    const r = await findPendingSignatures({ conn: chain.conn, cluster: 'localnet', vault, ledger, feePayer });
    expect(r.floor).toBe(1);
  });
});

describe('closing with token accounts left', () => {
  const tokenAccount = (owner: PublicKey, amount: bigint, frozen: boolean) => {
    const data = Buffer.alloc(ACCOUNT_SIZE);
    AccountLayout.encode(
      {
        mint: Keypair.generate().publicKey,
        owner,
        amount,
        delegateOption: 0,
        delegate: PublicKey.default,
        state: frozen ? 2 : 1,
        isNativeOption: 0,
        isNative: 0n,
        delegatedAmount: 0n,
        closeAuthorityOption: 0,
        closeAuthority: PublicKey.default,
      },
      data,
    );
    return { pubkey: Keypair.generate().publicKey, account: { data, owner: SPL_TOKEN_PROGRAM_ID, lamports: 2_039_280, executable: false, rentEpoch: 0 } };
  };
  const withTokenAccounts = (chain: Chain, accounts: ReturnType<typeof tokenAccount>[]) => {
    (chain.conn as unknown as Record<string, unknown>).getTokenAccountsByOwner = async (_o: PublicKey, f: { programId: PublicKey }) => ({
      context: { slot: 1 },
      value: f.programId.equals(SPL_TOKEN_PROGRAM_ID) ? accounts : [],
    });
  };

  it('a griefer’s frozen junk token blocks close only until it is explicitly abandoned', async () => {
    const chain = await mockChain(0);
    const vault = (await fetchVault(chain.conn, chain.state))!;
    const junk = tokenAccount(chain.wallet, 1n, true);
    withTokenAccounts(chain, [junk]);
    const base = { conn: chain.conn, cluster: 'localnet' as const, vault, mnemonic: MNEMONIC, feePayer, rentTo: feePayer };
    const err = await prepareClose({ ...base, ledger: new MemoryLedger() }).catch((e: unknown) => e);
    expect(err).toBeInstanceOf(FrozenTokenAccountsError);
    expect((err as FrozenTokenAccountsError).accounts.map((a) => a.toBase58())).toEqual([junk.pubkey.toBase58()]);
    const c = await prepareClose({ ...base, ledger: new MemoryLedger(), abandonTokenAccounts: [junk.pubkey] });
    expect(c.warnings.join(' ')).toMatch(/Abandons 1 issuer-frozen token account/);
  });

  it('a token account the vault can still empty must be withdrawn and closed first', async () => {
    const chain = await mockChain(0);
    const vault = (await fetchVault(chain.conn, chain.state))!;
    const live = tokenAccount(chain.wallet, 5n, false);
    withTokenAccounts(chain, [live]);
    await expect(
      prepareClose({ conn: chain.conn, cluster: 'localnet', vault, mnemonic: MNEMONIC, feePayer, ledger: new MemoryLedger(), rentTo: feePayer, abandonTokenAccounts: [live.pubkey] }),
    ).rejects.toThrow(/Close the vault's 1 token account\\(s\\) first/);
  });
});

describe('Legacy heir actions', () => {
  const heir = Keypair.generate().publicKey;
  /** The vault's heir record on the mock chain. */
  const withRecord = (chain: Chain, o: { days?: number; heir?: PublicKey; inheritedAt?: number } = {}) => {
    const [address, bump] = findHeirPda(chain.state);
    const d = Buffer.alloc(100);
    d.set(HEIR_DISCRIMINATOR, 0);
    d[8] = 1;
    d[9] = bump;
    d.writeUInt16LE(o.days ?? 365, 10);
    d.set(chain.state.toBytes(), 12);
    d.set((o.heir ?? heir).toBytes(), 44);
    d.writeBigInt64LE(1_791_547_200n, 76);
    d.writeBigInt64LE(1_791_547_200n + 365n * 86_400n, 84);
    d.writeBigInt64LE(BigInt(o.inheritedAt ?? 0), 92);
    chain.accounts.set(address.toBase58(), { data: d, owner: PROGRAM_ID, lamports: 1_586_880, executable: false, rentEpoch: 0 });
  };
  const funded = (chain: Chain, lamports: number) => {
    (chain.conn as unknown as Record<string, unknown>).getBalance = async (k: PublicKey) => (k.equals(chain.wallet) ? chain.walletLamports : lamports);
  };
  const base = async (chain: Chain, ledger = new MemoryLedger()) => ({
    conn: chain.conn,
    cluster: 'localnet' as const,
    vault: (await fetchVault(chain.conn, chain.state))!,
    mnemonic: MNEMONIC,
    feePayer,
    ledger,
  });

  it('signs a SetHeir with its sentence and the heir record accounts, and notes a plain-wallet heir', async () => {
    const chain = await mockChain(2);
    funded(chain, 1_000_000_000);
    const p = await prepareExecute({ ...(await base(chain)), actions: [{ kind: 'setHeir', heir, inactivityDays: 365 }] });
    expect(p.summary).toBe(
      \`This signature allows: make \${shortAddress(heir)} the heir of this vault. If 365 days pass with no check-in, everything in this vault can be moved to the heir. Nothing else.\`,
    );
    expect(p.actions).toEqual([{ kind: 'setHeir', heir, inactivityDays: 365 }]);
    expect(p.warnings.join(' ')).toMatch(/regular wallet: once inherited, everything is protected only by that wallet's Ed25519 key/);
    const last = p.transactions.at(-1)!.instructions.at(-1)!;
    const [record] = findHeirPda(chain.state);
    expect(last.keys.slice(-2).map((k) => [k.pubkey.toBase58(), k.isWritable])).toEqual([
      [record.toBase58(), true],
      [heir.toBase58(), false],
    ]);
    expect(p.transactions.length).toBe(3);
  });

  it('refuses, before any leaf is used, heir actions the program would refuse', async () => {
    const chain = await mockChain(0);
    funded(chain, 1_000_000_000);
    const ledger = new MemoryLedger();
    const b = await base(chain, ledger);
    const refused = async (actions: VaultAction[], re: RegExp) => {
      await expect(prepareExecute({ ...b, actions })).rejects.toThrow(re);
      expect(ledger.get(chain.state, 0, 0)).toBeUndefined();
    };
    // No record yet: nothing to check in or clear.
    await refused([{ kind: 'checkIn', heir, inactivityDays: 365 }], /no heir/);
    await refused([{ kind: 'clearHeir', heir }], /no heir/);
    // The vault as its own heir.
    await refused([{ kind: 'setHeir', heir: chain.wallet, inactivityDays: 365 }], /own heir/);
    // A fee payer that cannot pay the record's rent.
    funded(chain, 500_000);
    await refused([{ kind: 'setHeir', heir, inactivityDays: 365 }], /heir record's rent/);
    // With a record: the signed heir and period must be the recorded ones.
    withRecord(chain, { days: 365 });
    await refused([{ kind: 'checkIn', heir, inactivityDays: 730 }], /countdown is 365 days, not 730 days/);
    await refused([{ kind: 'checkIn', heir: recipient, inactivityDays: 365 }], /The vault's heir is/);
    await refused([{ kind: 'clearHeir', heir: recipient }], /The vault's heir is/);
    // An inherited record never changes.
    withRecord(chain, { inheritedAt: 1_800_000_000 });
    await refused([{ kind: 'checkIn', heir, inactivityDays: 365 }], /inherited/);
  });

  it('an inherited vault says so instead of "no leaves left"; close refuses while an heir is set', async () => {
    const sealed = await mockChain(1024);
    withRecord(sealed, { inheritedAt: 1_800_000_000 });
    const err = await prepareExecute({ ...(await base(sealed)), actions: [{ kind: 'transferSol', to: recipient, lamports: 1n }] }).catch((e: unknown) => e);
    expect(err).toBeInstanceOf(VaultInheritedError);
    expect((err as VaultInheritedError).heir.heir.equals(heir)).toBe(true);

    const chain = await mockChain(0);
    withRecord(chain);
    await expect(prepareClose({ ...(await base(chain)), rentTo: feePayer })).rejects.toThrow(/has an heir .*remove the heir first/);
  });
});

describe('cross-tab ledger lock', () => {
  it('takes the Web Lock around both ledger writes when the browser offers one', async () => {
    const calls: string[] = [];
    const desc = Object.getOwnPropertyDescriptor(globalThis, 'navigator');
    Object.defineProperty(globalThis, 'navigator', {
      configurable: true,
      value: { locks: { request: async (name: string, cb: () => Promise<unknown>) => (calls.push(name), cb()) } },
    });
    try {
      const chain = await mockChain(0);
      const vault = (await fetchVault(chain.conn, chain.state))!;
      await prepareExecute({ conn: chain.conn, cluster: 'localnet', vault, mnemonic: MNEMONIC, feePayer, ledger: new MemoryLedger(), actions: [{ kind: 'transferSol', to: recipient, lamports: 1_000_000_000n }] });
      expect(calls).toEqual(['bunker:leaf-ledger', 'bunker:leaf-ledger']);
    } finally {
      if (desc) Object.defineProperty(globalThis, 'navigator', desc);
      else delete (globalThis as { navigator?: unknown }).navigator;
    }
  });
});
`;export{e as default};