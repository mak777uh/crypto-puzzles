/**
 * Bunker Canary watcher: alerts on ANY outgoing activity from the canary.
 *
 *   npm run watch -- --cluster devnet --seed-file seeds/devnet.txt --webhook <url>     # poll forever
 *   npm run watch -- --cluster devnet --seed-file seeds/devnet.txt --once              # status JSON, then exit
 *   npm run watch -- --cluster devnet --seed-file seeds/devnet.txt --test-webhook      # send a test message
 *
 * It polls getSignaturesForAddress for the canary address and for every token
 * account it owns (getTokenAccountsByOwner, SPL Token and Token-2022), parses
 * each new transaction and alerts if:
 *   - the canary appears as a SIGNER (its key was used), or
 *   - the canary's SOL balance decreased, or
 *   - any token balance owned by the canary decreased (or a canary token account
 *     was closed or changed owner).
 *
 * Alerts are POSTed as JSON {"content": "...", "text": "..."} (works for Discord
 * and Slack incoming webhooks) to --webhook or $CANARY_WEBHOOK_URL.
 * The last-seen signature per address is kept in a state file (default:
 * canary/.state/, gitignored). Undelivered alerts are retried on every poll.
 *
 * --once exit codes: 0 untouched, 3 outgoing activity detected (ever), 1 error.
 */
import { mkdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { parseArgs } from 'node:util';
import { Connection, PublicKey, type ConfirmedSignatureInfo } from '@solana/web3.js';
import { TOKEN_2022_PROGRAM_ID, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { outgoingReasons } from './activity.ts';
import { CANARY_ROOT } from './seedfile.ts';
import { detectNetwork, formatUnits, loadCanary, resolveCluster, sleep, tokenProgramName, type LoadedCanary } from './solana.ts';

const USAGE = `usage: npm run watch -- --cluster <devnet|mainnet-beta|localnet|URL> --seed-file <seeds/x.txt>
                      [--webhook <url>] [--once] [--interval <seconds>] [--state-file <path>]
                      [--max-history <n>] [--test-webhook]`;

const { values } = parseArgs({
  options: {
    cluster: { type: 'string' },
    'seed-file': { type: 'string' },
    webhook: { type: 'string' },
    once: { type: 'boolean', default: false },
    interval: { type: 'string', default: '60' },
    'state-file': { type: 'string' },
    'max-history': { type: 'string', default: '20000' },
    'test-webhook': { type: 'boolean', default: false },
    help: { type: 'boolean', short: 'h', default: false },
  },
});

interface Activity {
  signature: string;
  slot: number;
  blockTime: number | null;
}

interface Alert extends Activity {
  reasons: string[];
  detectedAt: string;
}

interface WatchState {
  version: 1;
  canary: string;
  genesisHash: string;
  /** Newest processed signature per watched address. */
  lastSeen: Record<string, string>;
  /** Token accounts ever seen for the canary (kept even if later closed). */
  knownTokenAccounts: string[];
  lastActivity: Activity | null;
  tripped: Alert | null;
  alerts: Alert[];
  /** Alerts not yet delivered to the webhook. */
  unsent: Alert[];
  updatedAt: string;
}

interface TokenBalance {
  tokenAccount: string;
  mint: string;
  program: string;
  amount: string;
  baseUnits: string;
  decimals: number;
  state: string;
}

const log = (msg: string) => console.error(`[${new Date().toISOString()}] ${msg}`);
const isoTime = (blockTime: number | null) => (blockTime ? new Date(blockTime * 1000).toISOString() : null);

function die(msg: string, code = 1): never {
  console.error(`error: ${msg}`);
  process.exit(code);
}

// ---------------------------------------------------------------------------
// state
// ---------------------------------------------------------------------------

function loadState(path: string, canary: string, genesisHash: string): WatchState {
  try {
    const s = JSON.parse(readFileSync(path, 'utf8')) as WatchState;
    if (s.canary !== canary || s.genesisHash !== genesisHash) {
      die(`state file ${path} belongs to ${s.canary} on genesis ${s.genesisHash}; use another --state-file`);
    }
    return s;
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code !== 'ENOENT') throw err;
    return {
      version: 1,
      canary,
      genesisHash,
      lastSeen: {},
      knownTokenAccounts: [],
      lastActivity: null,
      tripped: null,
      alerts: [],
      unsent: [],
      updatedAt: new Date().toISOString(),
    };
  }
}

function saveState(path: string, state: WatchState) {
  state.updatedAt = new Date().toISOString();
  mkdirSync(dirname(path), { recursive: true });
  const tmp = `${path}.tmp`;
  writeFileSync(tmp, `${JSON.stringify(state, null, 2)}\n`);
  renameSync(tmp, path);
}

// ---------------------------------------------------------------------------
// chain reads
// ---------------------------------------------------------------------------

async function tokenBalances(conn: Connection, owner: PublicKey): Promise<TokenBalance[]> {
  const out: TokenBalance[] = [];
  for (const programId of [TOKEN_PROGRAM_ID, TOKEN_2022_PROGRAM_ID]) {
    const res = await conn.getParsedTokenAccountsByOwner(owner, { programId }, 'confirmed');
    for (const { pubkey, account } of res.value) {
      const info = (account.data as { parsed: { info: Record<string, any> } }).parsed.info;
      out.push({
        tokenAccount: pubkey.toBase58(),
        mint: info.mint,
        program: tokenProgramName(programId),
        amount: info.tokenAmount.uiAmountString,
        baseUnits: info.tokenAmount.amount,
        decimals: info.tokenAmount.decimals,
        state: info.state,
      });
    }
  }
  return out;
}

/** All signatures for `address` newer than `until` (or full history, capped). Newest first. */
async function newSignatures(
  conn: Connection,
  address: PublicKey,
  until: string | undefined,
  cap: number,
): Promise<ConfirmedSignatureInfo[]> {
  const out: ConfirmedSignatureInfo[] = [];
  let before: string | undefined;
  for (;;) {
    const opts: { limit: number; until?: string; before?: string } = { limit: 1000 };
    if (until) opts.until = until;
    if (before) opts.before = before;
    const batch = await conn.getSignaturesForAddress(address, opts, 'confirmed');
    out.push(...batch);
    if (batch.length < 1000) break;
    if (out.length >= cap) {
      log(`WARNING: more than ${cap} signatures for ${address.toBase58()}; only the newest ${out.length} are checked`);
      break;
    }
    before = batch[batch.length - 1]!.signature;
  }
  return out;
}

// ---------------------------------------------------------------------------
// alerts
// ---------------------------------------------------------------------------

function explorerTx(signature: string, network: string, rpc: string) {
  if (network === 'mainnet-beta') return `https://explorer.solana.com/tx/${signature}`;
  if (network === 'devnet' || network === 'testnet') return `https://explorer.solana.com/tx/${signature}?cluster=${network}`;
  return `https://explorer.solana.com/tx/${signature}?cluster=custom&customUrl=${encodeURIComponent(rpc)}`;
}

function alertText(alert: Alert, canary: LoadedCanary, network: string, rpc: string): string {
  const text = [
    `Bunker Canary ALERT: outgoing activity detected on ${canary.address} (${network}).`,
    `Transaction: ${alert.signature} at slot ${alert.slot}${alert.blockTime ? ` (${isoTime(alert.blockTime)})` : ''}`,
    `Reasons: ${alert.reasons.join('; ')}`,
    explorerTx(alert.signature, network, rpc),
    'Verify before drawing conclusions. A canary signature means a key with no known owner was used; a balance ' +
      'change without one may come from a token-program authority rather than a key compromise.',
  ].join('\n');
  return text.length > 1900 ? `${text.slice(0, 1897)}...` : text;
}

async function postWebhook(url: string, message: string): Promise<void> {
  let lastErr = '';
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ content: message, text: message }),
      });
      if (res.ok) return;
      lastErr = `HTTP ${res.status} ${await res.text().catch(() => '')}`.trim();
      const retryAfter = Number(res.headers.get('retry-after'));
      await sleep(Number.isFinite(retryAfter) && retryAfter > 0 ? retryAfter * 1000 : attempt * 2000);
    } catch (err) {
      lastErr = (err as Error).message;
      await sleep(attempt * 2000);
    }
  }
  throw new Error(`webhook delivery failed: ${lastErr}`);
}

// ---------------------------------------------------------------------------
// one poll cycle
// ---------------------------------------------------------------------------

async function poll(
  conn: Connection,
  canary: LoadedCanary,
  state: WatchState,
  maxHistory: number,
): Promise<{ processed: number; newAlerts: Alert[]; balances: TokenBalance[] }> {
  const balances = await tokenBalances(conn, canary.publicKey);
  for (const b of balances) if (!state.knownTokenAccounts.includes(b.tokenAccount)) state.knownTokenAccounts.push(b.tokenAccount);
  const watched = [canary.address, ...state.knownTokenAccounts];
  const tokenAccounts = new Set(state.knownTokenAccounts);

  const bySig = new Map<string, ConfirmedSignatureInfo>();
  const newestPerAddress: Record<string, string> = {};
  for (const addr of watched) {
    const sigs = await newSignatures(conn, new PublicKey(addr), state.lastSeen[addr], maxHistory);
    if (sigs.length) newestPerAddress[addr] = sigs[0]!.signature;
    for (const s of sigs) bySig.set(s.signature, s);
  }

  const ordered = [...bySig.values()].sort((a, b) => a.slot - b.slot);
  const newAlerts: Alert[] = [];
  for (const sig of ordered) {
    // Version 1: a v1 (4,096-byte) transaction moving the canary must be read and alerted on, not make
    // the RPC refuse ("version not supported") and stall the watcher on retry forever.
    const tx = await conn.getParsedTransaction(sig.signature, { maxSupportedTransactionVersion: 1, commitment: 'confirmed' });
    if (!tx) throw new Error(`transaction ${sig.signature} not available yet; will retry`);
    const reasons = outgoingReasons(tx, canary.address, tokenAccounts);
    const activity: Activity = { signature: sig.signature, slot: tx.slot, blockTime: tx.blockTime ?? sig.blockTime ?? null };
    if (!state.lastActivity || activity.slot >= state.lastActivity.slot) state.lastActivity = activity;
    if (reasons.length) {
      const alert: Alert = { ...activity, reasons, detectedAt: new Date().toISOString() };
      newAlerts.push(alert);
      state.alerts.push(alert);
      state.unsent.push(alert);
      if (!state.tripped) state.tripped = alert;
      log(`ALERT ${sig.signature}: ${reasons.join('; ')}`);
    }
    if (ordered.length > 20) await sleep(100); // be gentle with public RPCs
  }
  state.alerts = state.alerts.slice(-200);
  Object.assign(state.lastSeen, newestPerAddress);
  return { processed: ordered.length, newAlerts, balances };
}

async function flushAlerts(state: WatchState, webhook: string | undefined, canary: LoadedCanary, network: string, rpc: string) {
  if (!state.unsent.length) return;
  if (!webhook) {
    log(`${state.unsent.length} alert(s) not delivered: no --webhook / CANARY_WEBHOOK_URL configured`);
    return;
  }
  while (state.unsent.length) {
    const alert = state.unsent[0]!;
    await postWebhook(webhook, alertText(alert, canary, network, rpc));
    state.unsent.shift();
    log(`alert for ${alert.signature} delivered`);
  }
}

// ---------------------------------------------------------------------------
// main
// ---------------------------------------------------------------------------

async function main() {
  if (values.help) {
    console.log(USAGE);
    return;
  }
  if (!values.cluster || !values['seed-file']) die(`missing --cluster or --seed-file\n${USAGE}`);
  const canary = loadCanary(values['seed-file']);
  const cluster = resolveCluster(values.cluster);
  const conn = new Connection(cluster.url, 'confirmed');
  const { network, genesisHash } = await detectNetwork(conn);
  const webhook = values.webhook ?? process.env.CANARY_WEBHOOK_URL ?? undefined;
  const interval = Math.max(5, Number(values.interval)) * 1000;
  const maxHistory = Math.max(1000, Number(values['max-history']));
  const statePath =
    values['state-file'] ?? join(CANARY_ROOT, '.state', `watch-${genesisHash.slice(0, 8)}-${canary.address}.json`);

  if (values['test-webhook']) {
    if (!webhook) die('--test-webhook needs --webhook or CANARY_WEBHOOK_URL');
    await postWebhook(
      webhook,
      `Bunker Canary watcher test message for ${canary.address} (${network}). If you can read this, alerts will reach you.`,
    );
    console.log('test message delivered');
    return;
  }

  const state = loadState(statePath, canary.address, genesisHash);

  if (values.once) {
    const { processed, balances } = await poll(conn, canary, state, maxHistory);
    let deliveryError: string | null = null;
    try {
      await flushAlerts(state, webhook, canary, network, cluster.url);
    } catch (err) {
      deliveryError = (err as Error).message;
    }
    saveState(statePath, state);
    const [lamports, slot] = await Promise.all([conn.getBalance(canary.publicKey, 'confirmed'), conn.getSlot('confirmed')]);
    const last = state.lastActivity;
    const summary = state.tripped
      ? `TRIPPED: outgoing activity at slot ${state.tripped.slot} (${state.tripped.signature})`
      : last
        ? `untouched since slot ${last.slot}${last.blockTime ? ` (${isoTime(last.blockTime)})` : ''}: no outgoing activity ever observed`
        : 'no on-chain activity yet (unfunded)';
    const status = {
      address: canary.address,
      seedFile: canary.seedFile,
      seedNetwork: canary.seed.network,
      cluster: cluster.label,
      network,
      genesisHash,
      checkedAt: new Date().toISOString(),
      currentSlot: slot,
      balances: { sol: formatUnits(BigInt(lamports), 9), lamports, tokens: balances },
      lastActivity: last ? { ...last, time: isoTime(last.blockTime) } : null,
      newTransactionsChecked: processed,
      tripped: !!state.tripped,
      trip: state.tripped,
      undeliveredAlerts: state.unsent.length,
      webhookConfigured: !!webhook,
      ...(deliveryError ? { deliveryError } : {}),
      summary,
      stateFile: statePath,
    };
    console.log(JSON.stringify(status, null, 2));
    process.exit(state.tripped ? 3 : 0);
  }

  log(`watching Bunker Canary ${canary.address} on ${network} (${cluster.url}) every ${interval / 1000}s`);
  log(`state: ${statePath}; webhook: ${webhook ? 'configured' : 'NOT configured (alerts only logged)'}`);
  let stopping = false;
  const stop = () => {
    stopping = true;
    log('stopping');
  };
  process.on('SIGINT', stop);
  process.on('SIGTERM', stop);
  while (!stopping) {
    try {
      const { processed, newAlerts } = await poll(conn, canary, state, maxHistory);
      saveState(statePath, state);
      if (processed) log(`checked ${processed} new transaction(s); ${newAlerts.length} alert(s)`);
      await flushAlerts(state, webhook, canary, network, cluster.url);
      saveState(statePath, state);
    } catch (err) {
      log(`poll error: ${(err as Error).message}`);
    }
    for (let waited = 0; waited < interval && !stopping; waited += 1000) await sleep(1000);
  }
  saveState(statePath, state);
}

main().catch((err) => die((err as Error).message ?? String(err)));
