var e=`import { PublicKey } from '@solana/web3.js';
import type { Connection } from '@solana/web3.js';
import { base58 } from '@scure/base';
import { findWalletPda } from './addresses';
import { getMultipleAccountsBatched } from './assets';
import { bytesEqual } from './bytes';
import { PROGRAM_ID, SPL_TOKEN_PROGRAM_ID, TOKEN_2022_PROGRAM_ID } from './constants';
import { shortAddress } from './describe';
import { VAULT_STATE_DISCRIMINATOR, VAULT_TOMBSTONE_DISCRIMINATOR } from './state';

/** Why a recipient was refused or flagged. */
export interface RecipientCheck {
  address: PublicKey;
  /** Funds sent there would be stuck or lost: prepare* refuses. */
  refuse?: string;
  /** Unusual but possibly intended: shown to the user. */
  warn?: string;
  /** The address is an open vault's address (its wallet): this is the vault's state account. */
  vault?: PublicKey;
  /**
   * No account and not a single transaction at this address on this cluster. A brand-new wallet
   * looks like this, and so does a mistyped address (any 32 bytes are a valid address).
   */
  unused?: boolean;
  /** Lamports the address holds now (0 when it has no account). */
  lamports: bigint;
}

/** VaultState accounts are always 280 bytes; tombstones 48 (programs/bunker). */
const VAULT_STATE_SIZE = 280;
const VAULT_TOMBSTONE_SIZE = 48;

/**
 * Every vault the program holds, by vault address (the wallet PDA): open ones mapped to their state
 * account, and the addresses of closed ones. Two filtered getProgramAccounts calls; each account's
 * discriminator is checked again here rather than trusting the RPC's filtering.
 */
async function vaultAddresses(conn: Connection): Promise<{ open: Map<string, PublicKey>; closed: Set<string> }> {
  const query = (dataSize: number, discriminator: Uint8Array) =>
    conn.getProgramAccounts(PROGRAM_ID, {
      commitment: 'confirmed',
      dataSlice: { offset: 0, length: 8 },
      filters: [{ dataSize }, { memcmp: { offset: 0, bytes: base58.encode(discriminator) } }],
    });
  const [states, tombstones] = await Promise.all([
    query(VAULT_STATE_SIZE, VAULT_STATE_DISCRIMINATOR),
    query(VAULT_TOMBSTONE_SIZE, VAULT_TOMBSTONE_DISCRIMINATOR),
  ]);
  const is = (data: Uint8Array, discriminator: Uint8Array) => bytesEqual(data.subarray(0, 8), discriminator);
  const open = new Map<string, PublicKey>();
  for (const { pubkey, account } of states) {
    if (is(account.data, VAULT_STATE_DISCRIMINATOR)) open.set(findWalletPda(pubkey)[0].toBase58(), pubkey);
  }
  const closed = new Set<string>();
  for (const { pubkey, account } of tombstones) {
    if (is(account.data, VAULT_TOMBSTONE_DISCRIMINATOR)) closed.add(findWalletPda(pubkey)[0].toBase58());
  }
  return { open, closed };
}

/** Whether the address appears in any transaction on this cluster; null when the RPC can't say. */
async function hasHistory(conn: Connection, address: PublicKey): Promise<boolean | null> {
  try {
    return (await conn.getSignaturesForAddress(address, { limit: 1 }, 'confirmed')).length > 0;
  } catch {
    return null;
  }
}

/**
 * Sanity checks on the wallet addresses a send pays (SOL recipients and token-recipient owners).
 * Refused: a token account or mint pasted as a wallet (an ATA "owned" by a token account can never
 * be spent), a program, a vault's own accounts (state, tombstone or signature buffer), and the
 * address of a CLOSED vault (its wallet can never sign again). Recognised: the address of an open
 * vault (\`vault\`), which has no private key by design. Flagged: other off-curve addresses (fine for
 * a multisig, wrong for a typo'd wallet) and addresses with no history at all (\`unused\`).
 */
export async function checkRecipients(conn: Connection, addresses: PublicKey[]): Promise<RecipientCheck[]> {
  const unique = [...new Map(addresses.map((a) => [a.toBase58(), a])).values()];
  if (!unique.length) return [];
  const infos = await getMultipleAccountsBatched(conn, unique);
  const offCurve = new Set(unique.filter((a) => !PublicKey.isOnCurve(a.toBytes())).map((a) => a.toBase58()));
  const [vaults, history] = await Promise.all([
    offCurve.size ? vaultAddresses(conn) : Promise.resolve({ open: new Map<string, PublicKey>(), closed: new Set<string>() }),
    // Only an address without an account can be unused; one with an account has been funded.
    Promise.all(unique.map((a, i) => (infos[i] ? Promise.resolve(true) : hasHistory(conn, a)))),
  ]);
  return unique.map((address, i): RecipientCheck => {
    const info = infos[i];
    const base = { address, lamports: BigInt(info?.lamports ?? 0) };
    const who = shortAddress(address);
    const key = address.toBase58();
    if (info?.executable) return { ...base, refuse: \`\${who} is a program, not a wallet; anything sent there is stuck\` };
    if (info && (info.owner.equals(SPL_TOKEN_PROGRAM_ID) || info.owner.equals(TOKEN_2022_PROGRAM_ID))) {
      return { ...base, refuse: \`\${who} is a token account or mint, not a wallet: paste the wallet address it belongs to\` };
    }
    if (info?.owner.equals(PROGRAM_ID)) return { ...base, refuse: \`\${who} is one of a vault's internal accounts, not a vault address: send to the vault's address instead\` };
    if (vaults.closed.has(key)) return { ...base, refuse: \`\${who} belongs to a closed vault: anything sent there is lost forever\` };
    const vault = vaults.open.get(key);
    if (vault) return { ...base, vault };
    const unused = history[i] === false ? { unused: true } : {};
    if (offCurve.has(key)) {
      return { ...base, ...unused, warn: \`\${who} is not a regular wallet address (no private key). Only continue if it is a vault or multisig you control.\` };
    }
    if (history[i] === false) {
      return { ...base, ...unused, warn: \`\${who} has never been used on Solana. Check the whole address: a mistyped one is still valid, and nothing sent to it could be recovered.\` };
    }
    return base;
  });
}
`;export{e as default};