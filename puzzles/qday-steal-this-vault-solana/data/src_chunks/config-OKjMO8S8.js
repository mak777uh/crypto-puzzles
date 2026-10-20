var e=`// Global option resolution: cluster/RPC, fee-payer keypair, vault seed file, ledger, vault.

import { readFileSync, statSync } from 'node:fs';
import { homedir } from 'node:os';
import { resolve } from 'node:path';
import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import pc from 'picocolors';
import {
  DEFAULT_RPC,
  MAINNET_ENABLED,
  MainnetDisabledError,
  detectCluster,
  fetchAllVaults,
  fetchVault,
  initWasm,
  normalizeMnemonic,
  validateMnemonic,
  vaultFromSeed,
} from '@bunker/sdk';
import type { ClusterName, VaultInfo } from '@bunker/sdk';
import { FileLedger, defaultLedgerPath } from './file-ledger';
import { parseJsonFile } from './json-file';

export interface GlobalOpts {
  cluster?: string;
  keypair?: string;
  seedFile?: string;
  vault?: string;
  cosigner?: string;
  cosignerKeypair?: string;
  ledger?: string;
  yes?: boolean;
  v1?: boolean;
  abandonPending?: boolean;
}

export const expandHome = (p: string): string => (p === '~' || p.startsWith('~/') ? resolve(homedir(), p.slice(2)) : resolve(p));

const MAINNET_ALIASES = new Set(['mainnet', 'mainnet-beta', 'm', 'main']);

/** Map --cluster to an RPC URL (no network). */
export function clusterUrl(input: string | undefined): { url: string; named?: ClusterName } {
  const v = (input ?? process.env.BUNKER_CLUSTER ?? 'devnet').trim();
  const lower = v.toLowerCase();
  if (MAINNET_ALIASES.has(lower)) {
    if (!MAINNET_ENABLED) throw new MainnetDisabledError();
    return { url: DEFAULT_RPC['mainnet-beta'], named: 'mainnet-beta' };
  }
  if (lower === 'localnet' || lower === 'localhost' || lower === 'l') return { url: DEFAULT_RPC.localnet, named: 'localnet' };
  if (lower === 'devnet' || lower === 'd') return { url: DEFAULT_RPC.devnet, named: 'devnet' };
  if (/^https?:\\/\\//i.test(v)) return { url: v };
  throw new Error(\`unknown cluster "\${v}" (use mainnet, devnet, localnet or an RPC URL)\`);
}

export interface ClusterCtx {
  conn: Connection;
  cluster: ClusterName;
  url: string;
}

/**
 * Connect and identify the cluster by genesis hash (a custom URL is whatever its genesis says).
 * Mainnet gets a one-line notice on stderr: every confirmation after it moves real funds.
 */
export async function connectCluster(input: string | undefined): Promise<ClusterCtx> {
  const { url, named } = clusterUrl(input);
  const conn = new Connection(url, 'confirmed');
  const detected = await detectCluster(conn);
  if (named && detected !== named) throw new Error(\`\${url} is not \${named === 'localnet' ? 'a local validator' : named}\`);
  if (detected === 'mainnet-beta') {
    if (!MAINNET_ENABLED) throw new MainnetDisabledError();
    process.stderr.write(\`\${pc.yellow('mainnet: real funds. Check every address before you confirm.')}\\n\`);
  }
  return { conn, cluster: detected, url };
}

export function loadKeypair(path: string | undefined): Keypair {
  const p = expandHome(path ?? process.env.BUNKER_KEYPAIR ?? '~/.config/solana/id.json');
  let raw: string;
  try {
    raw = readFileSync(p, 'utf8');
  } catch {
    throw new Error(\`cannot read fee-payer keypair \${p} (pass --keypair <file>)\`);
  }
  // Every failure below says the same fixed thing and never quotes the file.
  const notKeypair = \`\${p} is not a Solana keypair JSON (64-byte array)\`;
  const arr = parseJsonFile(raw, notKeypair);
  if (!Array.isArray(arr) || arr.length !== 64 || !arr.every((b) => Number.isInteger(b) && b >= 0 && b <= 255)) throw new Error(notKeypair);
  try {
    return Keypair.fromSecretKey(Uint8Array.from(arr as number[]));
  } catch {
    throw new Error(notKeypair);
  }
}

export function seedFilePath(opts: GlobalOpts): string {
  const p = opts.seedFile ?? process.env.BUNKER_SEED_FILE;
  if (!p) {
    throw new Error('no vault seed: pass --seed-file <path> or set BUNKER_SEED_FILE (the seed is never accepted on the command line)');
  }
  return expandHome(p);
}

/** Read + validate a seed file. Never echoes its content. Returns the normalised mnemonic. */
export async function readSeedFile(path: string, warn: (m: string) => void = () => undefined): Promise<string> {
  await initWasm();
  let raw: string;
  try {
    const st = statSync(path);
    if ((st.mode & 0o077) !== 0) warn(\`seed file \${path} is readable by other users (chmod 600 \${path})\`);
    raw = readFileSync(path, 'utf8');
  } catch (e) {
    throw new Error(\`cannot read seed file \${path}: \${(e as NodeJS.ErrnoException).code ?? 'error'}\`);
  }
  const m = normalizeMnemonic(raw);
  if (!validateMnemonic(m)) throw new Error(\`seed file \${path} does not contain a valid 24-word vault seed\`);
  return m;
}

export function openLedger(opts: GlobalOpts): FileLedger {
  return new FileLedger(expandHome(opts.ledger ?? process.env.BUNKER_LEDGER ?? defaultLedgerPath()));
}

export function parsePubkey(v: string, what: string): PublicKey {
  try {
    return new PublicKey(v);
  } catch {
    throw new Error(\`invalid \${what}: \${v}\`);
  }
}

/**
 * The vault to act on: --vault (state address, or its wallet address), else the vault opened from
 * the seed's epoch-0 key (+ --cosigner). Refuses closed vaults.
 */
export async function resolveVault(ctx: ClusterCtx, opts: GlobalOpts, mnemonic?: string): Promise<VaultInfo> {
  let state: PublicKey;
  if (opts.vault) {
    const addr = parsePubkey(opts.vault, '--vault');
    const v = await fetchVault(ctx.conn, addr).catch(() => null);
    if (v) return assertOpen(v);
    const byWallet = (await fetchAllVaults(ctx.conn)).find((x) => x.wallet.equals(addr));
    if (byWallet) return assertOpen(byWallet);
    throw new Error(\`\${addr.toBase58()} is not a Bunker vault (pass the state or wallet address printed by \\\`open\\\`)\`);
  }
  const m = mnemonic ?? (await readSeedFile(seedFilePath(opts)));
  const cosigner = opts.cosigner ? parsePubkey(opts.cosigner, '--cosigner') : null;
  state = (await vaultFromSeed(m, { cluster: ctx.cluster, cosigner })).state;
  const v = await fetchVault(ctx.conn, state);
  if (!v) {
    throw new Error(
      \`no vault opened from this seed at \${state.toBase58()} (run \\\`bunker open\\\`; after rotating to a new seed pass --vault)\`,
    );
  }
  return assertOpen(v);
}

function assertOpen(v: VaultInfo): VaultInfo {
  if (v.closed) throw new Error(\`vault \${v.state.toBase58()} is closed\`);
  return v;
}

export function explorerUrl(sig: string, ctx: ClusterCtx): string {
  if (ctx.cluster === 'devnet') return \`https://explorer.solana.com/tx/\${sig}?cluster=devnet\`;
  return \`https://explorer.solana.com/tx/\${sig}?cluster=custom&customUrl=\${encodeURIComponent(ctx.url)}\`;
}
`;export{e as default};