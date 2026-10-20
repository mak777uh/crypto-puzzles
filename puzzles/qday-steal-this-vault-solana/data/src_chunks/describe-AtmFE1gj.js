var e=`import type { PublicKey } from '@solana/web3.js';
import type { VaultAction } from './actions';
import { tokenSummaryLabel } from './text';

export interface TokenMeta {
  decimals: number;
  symbol?: string;
  name?: string;
}

/** Mint → metadata, as a function, a Map keyed by base58 mint, or a plain record. */
export type TokenMetaLookup =
  | ((mint: PublicKey) => TokenMeta | undefined)
  | Map<string, TokenMeta>
  | Record<string, TokenMeta>;

export interface DescribeOptions {
  /** Destination token account (base58) → owner wallet, to say "to <owner>" instead of "to token account …". */
  tokenAccountOwners?: Map<string, PublicKey>;
  /**
   * Wallet (base58) → label shown after its short address: "to 7xKX…f9aB (your wallet)". Opt-in;
   * only for facts the client knows, e.g. the fee payer is the connected wallet.
   */
  addressLabels?: Map<string, string>;
}

function labelled(pk: PublicKey, opts?: DescribeOptions): string {
  const label = opts?.addressLabels?.get(pk.toBase58());
  return label ? \`\${shortAddress(pk)} (\${label})\` : shortAddress(pk);
}

export function lookupMeta(meta: TokenMetaLookup | undefined, mint: PublicKey): TokenMeta | undefined {
  if (!meta) return undefined;
  if (typeof meta === 'function') return meta(mint);
  if (meta instanceof Map) return meta.get(mint.toBase58());
  return meta[mint.toBase58()];
}

/** "7xKX…f9aB" — 4 + 4 characters (more than 3 + 3 to make vanity look-alikes costlier). */
export function shortAddress(pk: PublicKey | string): string {
  const s = typeof pk === 'string' ? pk : pk.toBase58();
  return s.length <= 10 ? s : \`\${s.slice(0, 4)}…\${s.slice(-4)}\`;
}

function groupThousands(int: string): string {
  return int.replace(/\\B(?=(\\d{3})+(?!\\d))/g, ',');
}

/** Format a raw integer amount with \`decimals\`, thousands separators, trailing zeros trimmed. */
export function formatAmount(raw: bigint, decimals: number): string {
  const neg = raw < 0n;
  const abs = neg ? -raw : raw;
  if (decimals <= 0) return (neg ? '-' : '') + groupThousands(abs.toString());
  const base = 10n ** BigInt(decimals);
  const int = abs / base;
  const frac = (abs % base).toString().padStart(decimals, '0').replace(/0+$/, '');
  return (neg ? '-' : '') + groupThousands(int.toString()) + (frac ? \`.\${frac}\` : '');
}

/** Parse a decimal UI amount ("1.5", "1,000") into raw units. Throws on too many decimals. */
export function parseAmount(ui: string, decimals: number): bigint {
  const s = ui.trim().replace(/,/g, '').replace(/_/g, '');
  if (!/^\\d+(\\.\\d+)?$/.test(s)) throw new Error(\`invalid amount "\${ui}"\`);
  const [int, frac = ''] = s.split('.') as [string, string?];
  if (frac.length > decimals) throw new Error(\`amount "\${ui}" has more than \${decimals} decimals\`);
  return BigInt(int) * 10n ** BigInt(decimals) + BigInt((frac + '0'.repeat(decimals)).slice(0, decimals) || '0');
}

/**
 * Symbol, else name, else \`token <short mint>\`. Sanitised again here (text.ts) because \`meta\` can
 * come from any caller; the app's describe.ts uses the same tokenSummaryLabel so both summaries
 * stay byte-identical.
 */
function tokenLabel(meta: TokenMeta | undefined, mint: PublicKey): string {
  return tokenSummaryLabel(meta) || \`token \${shortAddress(mint)}\`;
}

function joinList(items: string[]): string {
  if (items.length <= 1) return items.join('');
  return \`\${items.slice(0, -1).join(', ')} and \${items[items.length - 1]}\`;
}

/** "365 days", "3,650 days" (a heir action's period, in the signed unit). */
export function formatDays(days: number): string {
  return \`\${groupThousands(String(days))} \${days === 1 ? 'day' : 'days'}\`;
}

/**
 * What a heir action means beyond its clause, as one sentence after the list. A payload carries at
 * most one heir action, so "the heir" is never ambiguous; null for every other action.
 */
export function describeHeirConsequence(a: VaultAction): string | null {
  switch (a.kind) {
    case 'setHeir':
      return \`If \${formatDays(a.inactivityDays)} pass with no check-in, everything in this vault can be moved to the heir.\`;
    case 'checkIn':
      return \`The heir's countdown restarts at \${formatDays(a.inactivityDays)}.\`;
    case 'clearHeir':
      return 'Nothing in this vault can be inherited until a new heir is set.';
    default:
      return null;
  }
}

export function describeAction(a: VaultAction, meta?: TokenMetaLookup, opts?: DescribeOptions): string {
  switch (a.kind) {
    case 'transferSol':
      return \`send \${formatAmount(a.lamports, 9)} SOL to \${labelled(a.to, opts)}\`;
    case 'transferToken': {
      const m = lookupMeta(meta, a.mint);
      const owner = opts?.tokenAccountOwners?.get(a.destination.toBase58());
      const to = owner ? labelled(owner, opts) : \`token account \${shortAddress(a.destination)}\`;
      const amount = m ? \`\${formatAmount(a.amount, m.decimals)} \${tokenLabel(m, a.mint)}\` : \`\${formatAmount(a.amount, 0)} base units of \${tokenLabel(m, a.mint)}\`;
      return \`send \${amount} to \${to}\`;
    }
    case 'closeTokenAccount': {
      const m = lookupMeta(meta, a.mint);
      return \`close the vault's \${tokenLabel(m, a.mint)} token account (rent to \${shortAddress(a.rentTo)})\`;
    }
    case 'setHeir':
      return \`make \${labelled(a.heir, opts)} the heir of this vault\`;
    case 'checkIn':
      return \`check in for the heir \${labelled(a.heir, opts)}\`;
    case 'clearHeir':
      return \`remove \${labelled(a.heir, opts)} as the heir of this vault\`;
  }
}

/**
 * Human summary of exactly what a signature authorises. Callers must pass the actions decoded from
 * the signed payload, not the ones they intended to sign (prepare* does this).
 * → "This signature allows: send 1,000 BUNKER to 7xKX…f9aB. Nothing else."
 * → "This signature allows: make 7xKX…f9aB the heir of this vault. If 365 days pass with no
 *    check-in, everything in this vault can be moved to the heir. Nothing else."
 */
export function describeActions(a: VaultAction[], meta: TokenMetaLookup, opts?: DescribeOptions): string {
  const consequences = a.map(describeHeirConsequence).filter((s): s is string => s !== null);
  const tail = consequences.length ? \` \${consequences.join(' ')}\` : '';
  return \`This signature allows: \${joinList(a.map((x) => describeAction(x, meta, opts)))}.\${tail} Nothing else.\`;
}

export function describeRotate(fromEpoch: number, toNewSeed = false): string {
  const seed = toNewSeed ? ' with a key from a new seed' : '';
  return \`This signature allows: replace the vault key\${seed} (epoch \${fromEpoch} → \${fromEpoch + 1}). No assets move.\`;
}

export function describeClose(rentTo: PublicKey): string {
  return \`This signature allows: close this vault permanently and send its account rent and any SOL left in it to \${shortAddress(rentTo)}. Nothing else.\`;
}
`;export{e as default};