var e=`import { PublicKey } from '@solana/web3.js';
import type { Connection } from '@solana/web3.js';
import { base58 } from '@scure/base';
import { BorshReader, accountDiscriminator, bytesEqual } from './bytes';
import { HEIR_RECORD_SIZE, PROGRAM_ID, ROOT_LEN } from './constants';
import { findHeirPda, findStatePda, findWalletPda } from './addresses';

export const VAULT_STATE_DISCRIMINATOR = accountDiscriminator('VaultState');
export const VAULT_TOMBSTONE_DISCRIMINATOR = accountDiscriminator('VaultTombstone');
export const SIG_BUFFER_DISCRIMINATOR = accountDiscriminator('SigBuffer');
export const HEIR_DISCRIMINATOR = accountDiscriminator('Heir');

/** A vault's heir record (Legacy, PDA ["heir", state]; SPEC §2). Times are unix seconds of the cluster clock. */
export interface HeirInfo {
  address: PublicKey;
  state: PublicKey;
  /** Who inherits: SOL to this address, tokens to its associated token accounts. */
  heir: PublicKey;
  inactivityDays: number;
  /** When the SetHeir that named this heir and period landed. */
  setAt: number;
  /** From this time on, anyone can move everything in the vault to the heir (inherit). */
  deadline: number;
  /** When the vault was inherited (and sealed); null while it has not been. */
  inheritedAt: number | null;
  /** The last SetHeir or CheckIn: deadline − inactivityDays. */
  lastCheckIn: number;
  bump: number;
  version: number;
}

/** Decode a heir record. Throws on anything else (wrong size, discriminator or version). */
export function decodeHeir(address: PublicKey, data: Uint8Array): HeirInfo {
  if (data.length !== HEIR_RECORD_SIZE || !bytesEqual(data.subarray(0, 8), HEIR_DISCRIMINATOR)) {
    throw new Error(\`\${address.toBase58()} is not a Bunker heir record\`);
  }
  const r = new BorshReader(data);
  r.fixed(8);
  const version = r.u8();
  if (version !== 1) throw new Error(\`heir record version \${version} is not supported\`);
  const bump = r.u8();
  const inactivityDays = r.u16();
  const state = new PublicKey(r.fixed(32));
  const heir = new PublicKey(r.fixed(32));
  const i64 = () => Number(BigInt.asIntN(64, r.u64()));
  const setAt = i64();
  const deadline = i64();
  const inheritedAt = i64();
  return { address, state, heir, inactivityDays, setAt, deadline, inheritedAt: inheritedAt === 0 ? null : inheritedAt, lastCheckIn: deadline - inactivityDays * 86_400, bump, version };
}

/** Byte offset of \`heir\` in a heir record: discriminator 8 + version 1 + bump 1 + days 2 + state 32. */
export const HEIR_FIELD_OFFSET = 44;

/**
 * Every heir record that names \`heir\` (one getProgramAccounts call; each account is decoded and
 * checked again here). A vault that is someone's heir should not be closed: whatever it would
 * inherit would then be lost. Public RPC nodes may refuse the call: callers treat a failure as
 * "unknown".
 */
export async function findHeirRecordsNaming(conn: Connection, heir: PublicKey): Promise<HeirInfo[]> {
  const found = await conn.getProgramAccounts(PROGRAM_ID, {
    commitment: 'confirmed',
    filters: [
      { dataSize: HEIR_RECORD_SIZE },
      { memcmp: { offset: 0, bytes: base58.encode(HEIR_DISCRIMINATOR) } },
      { memcmp: { offset: HEIR_FIELD_OFFSET, bytes: heir.toBase58() } },
    ],
  });
  const out: HeirInfo[] = [];
  for (const { pubkey, account } of found) {
    try {
      const h = decodeHeir(pubkey, account.data);
      if (h.heir.equals(heir) && findHeirPda(h.state)[0].equals(pubkey)) out.push(h);
    } catch {
      /* not a heir record after all */
    }
  }
  return out;
}

/**
 * The vault's heir record, or null when it has none. Checks the owner, the layout and that the
 * record belongs to \`state\` at its canonical address.
 */
export async function fetchHeir(conn: Connection, state: PublicKey): Promise<HeirInfo | null> {
  const [address] = findHeirPda(state);
  const info = await conn.getAccountInfo(address, 'confirmed');
  if (!info) return null;
  if (!info.owner.equals(PROGRAM_ID)) {
    // Lamports someone sent to the address before a record exists: still no heir.
    if (info.data.length === 0) return null;
    throw new Error(\`\${address.toBase58()} is not owned by the Bunker program\`);
  }
  const h = decodeHeir(address, info.data);
  if (!h.state.equals(state)) throw new Error(\`\${address.toBase58()} is the heir record of another vault\`);
  return h;
}

export interface VaultInfo {
  state: PublicKey;
  wallet: PublicKey;
  vaultId: Uint8Array;
  currentRoot: Uint8Array;
  rootEpoch: number;
  nextLeaf: number;
  treeSize: number;
  leavesLeft: number;
  cosigner: PublicKey | null;
  createdSlot: bigint;
  executedCount: bigint;
  closed: boolean;
  /** Extensions (not in SPEC §3): account version byte and, for tombstones, the closing slot. */
  version: number;
  closedSlot?: bigint;
}

/** Decode a VaultState or VaultTombstone account. Throws on anything else. */
export function decodeVaultAccount(state: PublicKey, data: Uint8Array): VaultInfo {
  const disc = data.subarray(0, 8);
  const r = new BorshReader(data);
  r.fixed(8);
  if (bytesEqual(disc, VAULT_TOMBSTONE_DISCRIMINATOR)) {
    const vaultId = r.fixed(32);
    const closedSlot = r.remaining() >= 8 ? r.u64() : 0n;
    return {
      state,
      wallet: findWalletPda(state)[0],
      vaultId,
      currentRoot: new Uint8Array(ROOT_LEN),
      rootEpoch: 0,
      nextLeaf: 0,
      treeSize: 0,
      leavesLeft: 0,
      cosigner: null,
      createdSlot: 0n,
      executedCount: 0n,
      closed: true,
      version: 0,
      closedSlot,
    };
  }
  if (!bytesEqual(disc, VAULT_STATE_DISCRIMINATOR)) {
    throw new Error(\`\${state.toBase58()} is not a Bunker state account (unknown discriminator)\`);
  }
  const version = r.u8();
  r.u8(); // bump
  r.u8(); // wallet_bump
  const vaultId = r.fixed(32);
  const currentRoot = r.fixed(ROOT_LEN);
  const rootEpoch = r.u32();
  const nextLeaf = r.u32();
  const treeSize = r.u32();
  const tag = r.u8();
  let cosigner: PublicKey | null = null;
  if (tag === 1) cosigner = new PublicKey(r.fixed(32));
  else if (tag !== 0) throw new Error('VaultState: invalid cosigner option tag');
  const createdSlot = r.u64();
  const executedCount = r.u64();
  return {
    state,
    wallet: findWalletPda(state)[0],
    vaultId,
    currentRoot,
    rootEpoch,
    nextLeaf,
    treeSize,
    leavesLeft: Math.max(0, treeSize - nextLeaf),
    cosigner,
    createdSlot,
    executedCount,
    closed: false,
    version,
  };
}

/** Fetch and decode a vault. Returns null if the account does not exist. */
export async function fetchVault(conn: Connection, state: PublicKey): Promise<VaultInfo | null> {
  const info = await conn.getAccountInfo(state, 'confirmed');
  if (!info) return null;
  if (!info.owner.equals(PROGRAM_ID)) {
    throw new Error(\`\${state.toBase58()} is not owned by the Bunker program\`);
  }
  const v = decodeVaultAccount(state, info.data);
  // Defence in depth: the state must be the canonical PDA for its vault_id.
  const [expected] = findStatePda(v.vaultId);
  if (!expected.equals(state)) throw new Error(\`\${state.toBase58()} is not the canonical state PDA for its vault id\`);
  return v;
}

/** All open vaults (tombstones excluded), via getProgramAccounts filtered on the VaultState discriminator. */
export async function fetchAllVaults(conn: Connection): Promise<VaultInfo[]> {
  const accounts = await conn.getProgramAccounts(PROGRAM_ID, {
    commitment: 'confirmed',
    filters: [{ memcmp: { offset: 0, bytes: base58.encode(VAULT_STATE_DISCRIMINATOR) } }],
  });
  const out: VaultInfo[] = [];
  for (const { pubkey, account } of accounts) {
    try {
      out.push(decodeVaultAccount(pubkey, account.data));
    } catch {
      // skip malformed accounts
    }
  }
  return out;
}

/** Decoded SigBuffer header + data (used to resume a partially written buffer). */
export interface SigBufferInfo {
  address: PublicKey;
  state: PublicKey;
  payer: PublicKey;
  rootEpoch: number;
  leafIndex: number;
  data: Uint8Array;
}

export function decodeSigBuffer(address: PublicKey, data: Uint8Array): SigBufferInfo {
  if (!bytesEqual(data.subarray(0, 8), SIG_BUFFER_DISCRIMINATOR)) throw new Error('not a SigBuffer account');
  const r = new BorshReader(data);
  r.fixed(8);
  const state = new PublicKey(r.fixed(32));
  const payer = new PublicKey(r.fixed(32));
  const rootEpoch = r.u32();
  const leafIndex = r.u32();
  r.u8(); // bump
  return { address, state, payer, rootEpoch, leafIndex, data: data.slice(r.offset) };
}
`;export{e as default};