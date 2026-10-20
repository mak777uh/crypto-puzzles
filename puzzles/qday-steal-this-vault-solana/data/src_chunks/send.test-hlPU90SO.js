var e=`// Sending from a vault: recipient checks, sends to another vault (an off-curve owner) and how much
// one signature (one leaf) can carry. Mocked Connection, real WASM signing.
import { beforeAll, describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { Keypair, PublicKey } from '@solana/web3.js';
import type { AccountInfo, Connection, GetProgramAccountsConfig } from '@solana/web3.js';
import { Buffer } from 'buffer';
import { base58 } from '@scure/base';
import { ACCOUNT_SIZE, AccountLayout } from '@solana/spl-token';
import { initWasm } from '../src/wasm';
import { deriveRoot } from '../src/keys';
import { ataOf, computeVaultId, findStatePda, findWalletPda } from '../src/addresses';
import { SIG_BUFFER_DISCRIMINATOR, VAULT_STATE_DISCRIMINATOR, VAULT_TOMBSTONE_DISCRIMINATOR, fetchVault } from '../src/state';
import { MemoryLedger } from '../src/ledger';
import { prepareExecute } from '../src/prepare';
import { checkRecipients } from '../src/recipients';
import { measureTx, TransactionTooLargeError } from '../src/transport';
import { shortAddress } from '../src/describe';
import { ASSOCIATED_TOKEN_PROGRAM_ID, LEGACY_TX_LIMIT, MAX_ACTIONS, PROGRAM_ID, SPL_TOKEN_PROGRAM_ID } from '../src/constants';
import type { VaultAction } from '../src/actions';
import { syntheticMint } from './helpers';

const keys = JSON.parse(readFileSync(new URL('../../../crates/bunker-core/vectors/keys.json', import.meta.url), 'utf8')) as { mnemonic: string };
const MNEMONIC = keys.mnemonic;
const RENT_EXEMPT_MIN = 890_880;
const feePayer = Keypair.generate().publicKey;
const fresh = () => Keypair.generate().publicKey;

function vaultStateData(root: Uint8Array, vaultId: Uint8Array, nextLeaf: number): Buffer {
  const b = Buffer.alloc(280);
  b.set(VAULT_STATE_DISCRIMINATOR, 0);
  b[8] = 1; // version
  b[9] = 255; // bump
  b[10] = 255; // wallet bump
  b.set(vaultId, 11);
  b.set(root, 43);
  b.writeUInt32LE(0, 91); // epoch
  b.writeUInt32LE(nextLeaf, 95);
  b.writeUInt32LE(1024, 99);
  b[103] = 0; // no cosigner
  b.writeBigUInt64LE(123n, 104);
  return b;
}

const info = (data: Buffer, owner: PublicKey, lamports = 1_000_000): AccountInfo<Buffer> => ({ data, owner, lamports, executable: false, rentEpoch: 0 });

interface Chain {
  conn: Connection;
  state: PublicKey;
  wallet: PublicKey;
  accounts: Map<string, AccountInfo<Buffer>>;
  /** Program-owned accounts getProgramAccounts can return (filters and dataSlice are honoured). */
  programAccounts: Array<{ pubkey: PublicKey; account: AccountInfo<Buffer> }>;
  /** Addresses with transaction history: address → number of signatures. */
  history: Map<string, number>;
}

/** A localnet vault opened from MNEMONIC holding \`walletLamports\`, with nothing else on chain. */
async function mockChain(walletLamports = 5_000_000_000, nextLeaf = 4): Promise<Chain> {
  const root = await deriveRoot(MNEMONIC, 0, { cluster: 'localnet', cosigner: null });
  const vaultId = computeVaultId(root, null);
  const [state] = findStatePda(vaultId);
  const [wallet] = findWalletPda(state);
  const accounts = new Map<string, AccountInfo<Buffer>>([
    [state.toBase58(), info(vaultStateData(root, vaultId, nextLeaf), PROGRAM_ID, 3_000_000)],
    [wallet.toBase58(), info(Buffer.alloc(0), PublicKey.default, walletLamports)],
  ]);
  const chain: Chain = {
    conn: undefined as unknown as Connection,
    state,
    wallet,
    accounts,
    programAccounts: [{ pubkey: state, account: accounts.get(state.toBase58())! }],
    history: new Map([[state.toBase58(), 0]]),
  };
  const get = (k: PublicKey) => accounts.get(k.toBase58()) ?? null;
  chain.conn = {
    getAccountInfo: async (k: PublicKey) => get(k),
    getMultipleAccountsInfo: async (ks: PublicKey[]) => ks.map(get),
    getMinimumBalanceForRentExemption: async () => RENT_EXEMPT_MIN,
    getLatestBlockhash: async () => ({ blockhash: '9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin', lastValidBlockHeight: 1000 }),
    getProgramAccounts: async (_program: PublicKey, cfg: GetProgramAccountsConfig) =>
      chain.programAccounts
        .filter(({ account }) =>
          (cfg.filters ?? []).every((f) =>
            'dataSize' in f ? account.data.length === f.dataSize : Buffer.from(base58.decode(f.memcmp.bytes)).equals(account.data.subarray(f.memcmp.offset, f.memcmp.offset + base58.decode(f.memcmp.bytes).length)),
          ),
        )
        .map(({ pubkey, account }) => ({
          pubkey,
          account: cfg.dataSlice ? { ...account, data: account.data.subarray(cfg.dataSlice.offset, cfg.dataSlice.offset + cfg.dataSlice.length) } : account,
        })),
    getSignaturesForAddress: async (a: PublicKey) => Array.from({ length: chain.history.get(a.toBase58()) ?? 0 }, (_, i) => ({ signature: \`sig-\${a.toBase58()}-\${i}\` })),
    getTransactions: async (sigs: string[]) => sigs.map(() => null),
  } as unknown as Connection;
  return chain;
}

/** Another vault on the same chain: its state account (open or tombstoned) and its address. */
function addVault(chain: Chain, closed = false): { state: PublicKey; wallet: PublicKey } {
  const state = Keypair.generate().publicKey;
  const data = closed ? Buffer.alloc(48) : Buffer.alloc(280);
  data.set(closed ? VAULT_TOMBSTONE_DISCRIMINATOR : VAULT_STATE_DISCRIMINATOR, 0);
  const account = info(data, PROGRAM_ID);
  chain.programAccounts.push({ pubkey: state, account });
  chain.accounts.set(state.toBase58(), account);
  const [wallet] = findWalletPda(state);
  chain.history.set(wallet.toBase58(), 1); // open_vault names the wallet
  return { state, wallet };
}

/** A mint (6 decimals) and the vault's token account holding \`amount\` of it. */
function addToken(chain: Chain, amount: bigint): PublicKey {
  const m = syntheticMint({ decimals: 6 });
  const mint = m.mint.address;
  chain.accounts.set(mint.toBase58(), m.info);
  const data = Buffer.alloc(ACCOUNT_SIZE);
  AccountLayout.encode(
    {
      mint,
      owner: chain.wallet,
      amount,
      delegateOption: 0,
      delegate: PublicKey.default,
      state: 1,
      isNativeOption: 0,
      isNative: 0n,
      delegatedAmount: 0n,
      closeAuthorityOption: 0,
      closeAuthority: PublicKey.default,
    },
    data,
  );
  chain.accounts.set(ataOf(chain.wallet, mint, SPL_TOKEN_PROGRAM_ID).toBase58(), info(data, SPL_TOKEN_PROGRAM_ID, 2_039_280));
  return mint;
}

const tokenTo = (mint: PublicKey, owner: PublicKey, amount: bigint): VaultAction => ({
  kind: 'transferToken',
  mint,
  tokenProgram: SPL_TOKEN_PROGRAM_ID,
  destination: ataOf(owner, mint, SPL_TOKEN_PROGRAM_ID),
  destinationOwner: owner,
  amount,
});

async function send(chain: Chain, actions: VaultAction[], ledger = new MemoryLedger()) {
  const vault = (await fetchVault(chain.conn, chain.state))!;
  return prepareExecute({ conn: chain.conn, cluster: 'localnet', vault, mnemonic: MNEMONIC, feePayer, ledger, actions, createDestinationAtas: true });
}

beforeAll(async () => {
  await initWasm();
});

describe('checkRecipients', () => {
  it('recognises open vaults, refuses closed ones and the vault internals, flags unused addresses', async () => {
    const chain = await mockChain();
    const open = addVault(chain);
    const closed = addVault(chain, true);
    const buffer = Keypair.generate().publicKey;
    const bufData = Buffer.alloc(8 + 81);
    bufData.set(SIG_BUFFER_DISCRIMINATOR, 0);
    chain.accounts.set(buffer.toBase58(), info(bufData, PROGRAM_ID));
    const funded = fresh();
    chain.accounts.set(funded.toBase58(), info(Buffer.alloc(0), PublicKey.default, 2_000_000_000));
    const emptied = fresh(); // no account any more, but it has been used
    chain.history.set(emptied.toBase58(), 3);
    const unused = fresh();
    const pda = findWalletPda(Keypair.generate().publicKey)[0]; // off-curve, not a vault

    const checks = await checkRecipients(chain.conn, [open.wallet, closed.wallet, open.state, buffer, funded, emptied, unused, pda, open.wallet]);
    const by = new Map(checks.map((c) => [c.address.toBase58(), c]));
    expect(checks).toHaveLength(8); // duplicates are checked once

    const vault = by.get(open.wallet.toBase58())!;
    expect(PublicKey.isOnCurve(open.wallet.toBytes())).toBe(false);
    expect(vault.vault?.equals(open.state)).toBe(true);
    expect(vault.warn).toBeUndefined();
    expect(vault.refuse).toBeUndefined();

    expect(by.get(closed.wallet.toBase58())!.refuse).toMatch(/closed vault: anything sent there is lost forever/);
    expect(by.get(open.state.toBase58())!.refuse).toMatch(/internal accounts, not a vault address/);
    expect(by.get(buffer.toBase58())!.refuse).toMatch(/internal accounts/);

    expect(by.get(funded.toBase58())).toEqual({ address: funded, lamports: 2_000_000_000n });
    expect(by.get(emptied.toBase58())).toEqual({ address: emptied, lamports: 0n });

    const u = by.get(unused.toBase58())!;
    expect(u.unused).toBe(true);
    expect(u.warn).toBe(\`\${shortAddress(unused)} has never been used on Solana. Check the whole address: a mistyped one is still valid, and nothing sent to it could be recovered.\`);
    expect(u.refuse).toBeUndefined();

    expect(by.get(pda.toBase58())!.warn).toMatch(/not a regular wallet address \\(no private key\\)/);
  });

  it('a history lookup the RPC refuses never blocks: the address is just not flagged', async () => {
    const chain = await mockChain();
    (chain.conn as unknown as Record<string, unknown>).getSignaturesForAddress = async () => {
      throw new Error('429 Too Many Requests');
    };
    const a = fresh();
    expect(await checkRecipients(chain.conn, [a])).toEqual([{ address: a, lamports: 0n }]);
  });
});

describe('sending to another vault', () => {
  it('tokens: the other vault (an off-curve owner) gets its token account created in the final transaction', async () => {
    const chain = await mockChain();
    const other = addVault(chain);
    const mint = addToken(chain, 5_000_000n);
    const destination = ataOf(other.wallet, mint, SPL_TOKEN_PROGRAM_ID);
    const p = await send(chain, [tokenTo(mint, other.wallet, 5_000_000n)]);

    expect(p.summary).toBe(\`This signature allows: send 5 token \${shortAddress(mint)} to \${shortAddress(other.wallet)}. Nothing else.\`);
    expect(p.warnings.join(' ')).not.toMatch(/regular wallet|never been used/);
    const final = p.transactions.at(-1)!;
    expect(measureTx(final.instructions, feePayer)).toBeLessThanOrEqual(LEGACY_TX_LIMIT);
    const creates = final.instructions.filter((ix) => ix.programId.equals(ASSOCIATED_TOKEN_PROGRAM_ID));
    expect(creates).toHaveLength(1);
    const [create] = creates;
    expect(create!.data).toEqual(Buffer.from([1])); // CreateIdempotent
    expect(create!.keys.map((k) => k.pubkey.toBase58())).toEqual(
      [feePayer, destination, other.wallet, mint, PublicKey.default, SPL_TOKEN_PROGRAM_ID].map((k) => k.toBase58()),
    );
    // The signed payload names that very account, and execute writes to it.
    const execute = final.instructions.at(-1)!;
    expect(execute.programId.equals(PROGRAM_ID)).toBe(true);
    expect(execute.keys.at(-1)!.pubkey.equals(destination)).toBe(true);
    expect(p.actions).toEqual([{ ...tokenTo(mint, other.wallet, 5_000_000n), destination }]);
  });

  it('SOL: a vault holding no SOL must receive at least the rent-exempt minimum', async () => {
    const chain = await mockChain();
    const other = addVault(chain); // its address has no account yet: it holds no SOL
    await expect(send(chain, [{ kind: 'transferSol', to: other.wallet, lamports: BigInt(RENT_EXEMPT_MIN - 1) }])).rejects.toThrow(/rent-exempt minimum/);
    const p = await send(chain, [{ kind: 'transferSol', to: other.wallet, lamports: BigInt(RENT_EXEMPT_MIN) }]);
    expect(p.summary).toBe(\`This signature allows: send 0.00089088 SOL to \${shortAddress(other.wallet)}. Nothing else.\`);
    expect(p.warnings).toEqual([]);
  });

  it('never to the sending vault itself, its state account or a closed vault', async () => {
    const chain = await mockChain();
    const closed = addVault(chain, true);
    await expect(send(chain, [{ kind: 'transferSol', to: chain.wallet, lamports: 10n ** 9n }])).rejects.toThrow(/cannot send SOL to the vault itself/);
    await expect(send(chain, [{ kind: 'transferSol', to: chain.state, lamports: 10n ** 9n }])).rejects.toThrow(/vault itself|internal accounts/);
    await expect(send(chain, [{ kind: 'transferSol', to: closed.wallet, lamports: 10n ** 9n }])).rejects.toThrow(/closed vault/);
    const mint = addToken(chain, 5n);
    await expect(send(chain, [tokenTo(mint, chain.wallet, 5n)])).rejects.toThrow(/vault's own token account/);
  });
});

describe('one signature, several recipients', () => {
  it(\`\${MAX_ACTIONS} SOL recipients go out under one leaf\`, async () => {
    const chain = await mockChain(5_000_000_000, 7);
    const ledger = new MemoryLedger();
    const recipients = Array.from({ length: MAX_ACTIONS }, fresh);
    const p = await send(chain, recipients.map((to) => ({ kind: 'transferSol', to, lamports: 100_000_000n })), ledger);
    expect(p.leafIndex).toBe(7);
    expect(ledger.list().map((e) => e.leaf)).toEqual([7]);
    expect(p.leavesLeft).toBe(1024 - 8);
    expect(p.summary).toBe(\`This signature allows: \${recipients.map((r) => \`send 0.1 SOL to \${shortAddress(r)}\`).join(', ').replace(/, (?=[^,]*$)/, ' and ')}. Nothing else.\`);
    for (const tx of p.transactions) expect(measureTx(tx.instructions, feePayer)).toBeLessThanOrEqual(LEGACY_TX_LIMIT);
    expect(p.transactions).toHaveLength(4);
    // Brand-new addresses are flagged (a typo looks the same), not refused.
    expect(p.warnings.filter((w) => /never been used/.test(w))).toHaveLength(MAX_ACTIONS);
  });

  it(\`more than \${MAX_ACTIONS} actions is refused before anything is signed\`, async () => {
    const chain = await mockChain();
    const ledger = new MemoryLedger();
    const actions: VaultAction[] = Array.from({ length: MAX_ACTIONS + 1 }, () => ({ kind: 'transferSol', to: fresh(), lamports: 10n ** 8n }));
    await expect(send(chain, actions, ledger)).rejects.toThrow(\`An execute needs 1..\${MAX_ACTIONS} actions, got \${MAX_ACTIONS + 1}\`);
    expect(ledger.list()).toEqual([]);
  });

  it('a batch too large for one transaction fails before the leaf is recorded or signed', async () => {
    const chain = await mockChain();
    const ledger = new MemoryLedger();
    // Three tokens to three new token accounts (an ATA create each) fit; one more SOL recipient does not.
    const tokens = [addToken(chain, 10n), addToken(chain, 10n), addToken(chain, 10n)].map((mint) => tokenTo(mint, fresh(), 10n));
    const fits = await send(chain, tokens, ledger);
    expect(fits.transactions.at(-1)!.instructions.filter((ix) => ix.programId.equals(ASSOCIATED_TOKEN_PROGRAM_ID))).toHaveLength(3);

    const chain2 = await mockChain();
    const ledger2 = new MemoryLedger();
    const tokens2 = [addToken(chain2, 10n), addToken(chain2, 10n), addToken(chain2, 10n)].map((mint) => tokenTo(mint, fresh(), 10n));
    const err = await send(chain2, [...tokens2, { kind: 'transferSol', to: fresh(), lamports: 10n ** 8n }], ledger2).catch((e: unknown) => e);
    expect(err).toBeInstanceOf(TransactionTooLargeError);
    expect((err as Error).message).toMatch(/Use fewer actions per signature/);
    expect(ledger2.list()).toEqual([]);
  });
});
`;export{e as default};