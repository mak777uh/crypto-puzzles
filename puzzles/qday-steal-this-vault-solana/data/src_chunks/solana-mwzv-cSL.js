var e=`/** Node-side Solana helpers shared by fund.ts and watch.ts (not used by derive.ts). */
import { readFileSync } from 'node:fs';
import { clusterApiUrl, Connection, Keypair, PublicKey } from '@solana/web3.js';
import { TOKEN_2022_PROGRAM_ID, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { deriveCanary, type CanaryResult, type SeedInfo } from './derive.ts';
import { readSeedFile } from './seedfile.ts';

export const GENESIS_HASHES: Record<string, 'mainnet-beta' | 'devnet' | 'testnet'> = {
  '5eykt4UsFv8P8NJdTREpY1vzqKqZKvdpKuc147dw2N9d': 'mainnet-beta',
  EtWTRABZaYq6iMfeYKouRu166VU2xqa1wcaWoxPkrZBG: 'devnet',
  '4uhcVJyU9pJkvQyS88uRDiswHXSCkY3zQawwpjk2NsNY': 'testnet',
};

export interface ClusterInfo {
  /** What the user passed (devnet, mainnet-beta, localnet or a URL). */
  label: string;
  url: string;
}

export function resolveCluster(arg: string): ClusterInfo {
  switch (arg) {
    case 'devnet':
    case 'testnet':
    case 'mainnet-beta':
      return { label: arg, url: clusterApiUrl(arg) };
    case 'mainnet':
      return { label: 'mainnet-beta', url: clusterApiUrl('mainnet-beta') };
    case 'localnet':
    case 'localhost':
      return { label: 'localnet', url: 'http://127.0.0.1:8899' };
    default:
      if (/^https?:\\/\\//.test(arg)) return { label: arg, url: arg };
      throw new Error(\`--cluster must be devnet, mainnet-beta, localnet or an http(s) RPC URL (got "\${arg}")\`);
  }
}

/**
 * Identify the network by genesis hash, so a custom RPC URL pointing at
 * mainnet is still treated as mainnet.
 */
export async function detectNetwork(conn: Connection): Promise<{ genesisHash: string; network: string }> {
  const genesisHash = await conn.getGenesisHash();
  return { genesisHash, network: GENESIS_HASHES[genesisHash] ?? 'unknown (local or private cluster)' };
}

export interface LoadedCanary extends CanaryResult {
  publicKey: PublicKey;
  seed: SeedInfo;
  seedFile: string;
  seedSha256: string;
}

/** Reads a seed file, derives the canary and double-checks it is on-curve. */
export function loadCanary(seedFile: string): LoadedCanary {
  const seed = readSeedFile(seedFile);
  const result = deriveCanary(seed.bytes);
  const publicKey = new PublicKey(result.address);
  if (!PublicKey.isOnCurve(publicKey.toBytes())) {
    throw new Error(\`derived canary \${result.address} is not on the Ed25519 curve; refusing to continue\`);
  }
  return { ...result, publicKey, seed: seed.info, seedFile: seed.path, seedSha256: seed.sha256 };
}

/** Loads a Solana CLI keypair file (JSON array of 64 numbers). Never logs its contents. */
export function loadKeypair(path: string): Keypair {
  let raw: unknown;
  try {
    raw = JSON.parse(readFileSync(path, 'utf8'));
  } catch (err) {
    throw new Error(\`could not read keypair file \${path}: \${(err as Error).message}\`);
  }
  if (!Array.isArray(raw) || raw.length !== 64 || !raw.every((n) => Number.isInteger(n) && n >= 0 && n <= 255)) {
    throw new Error(\`\${path} is not a Solana keypair file (expected a JSON array of 64 bytes)\`);
  }
  return Keypair.fromSecretKey(Uint8Array.from(raw as number[]));
}

export type TokenProgramName = 'spl-token' | 'token-2022';

export function tokenProgramName(programId: PublicKey): TokenProgramName {
  if (programId.equals(TOKEN_PROGRAM_ID)) return 'spl-token';
  if (programId.equals(TOKEN_2022_PROGRAM_ID)) return 'token-2022';
  throw new Error(\`not a token program: \${programId.toBase58()}\`);
}

/** Detects SPL Token vs Token-2022 from the mint account's owner. */
export async function tokenProgramForMint(conn: Connection, mint: PublicKey): Promise<PublicKey> {
  const info = await conn.getAccountInfo(mint);
  if (!info) throw new Error(\`mint \${mint.toBase58()} does not exist on this cluster\`);
  if (info.owner.equals(TOKEN_PROGRAM_ID)) return TOKEN_PROGRAM_ID;
  if (info.owner.equals(TOKEN_2022_PROGRAM_ID)) return TOKEN_2022_PROGRAM_ID;
  throw new Error(\`\${mint.toBase58()} is owned by \${info.owner.toBase58()}, which is not a token program\`);
}

/** Parses a UI amount ("1234.5") into base units without floating point. */
export function parseUiAmount(ui: string, decimals: number): bigint {
  const m = /^(\\d+)(?:\\.(\\d+))?$/.exec(ui.trim().replaceAll('_', ''));
  if (!m) throw new Error(\`invalid amount "\${ui}" (use a plain decimal number such as 1000 or 0.5)\`);
  const whole = m[1]!;
  const frac = m[2] ?? '';
  if (frac.length > decimals) throw new Error(\`amount "\${ui}" has more than \${decimals} decimal places\`);
  const units = BigInt(whole) * 10n ** BigInt(decimals) + BigInt(frac.padEnd(decimals, '0') || '0');
  if (units <= 0n) throw new Error('amount must be greater than zero');
  return units;
}

export { formatUnits } from './units.ts';

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
`;export{e as default};