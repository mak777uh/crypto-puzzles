/**
 * Pure transaction analysis for the watcher (no network access), split out so
 * it can be unit-tested with synthetic transactions. The web app imports it too,
 * so the site and the watcher apply the same rules: keep it free of Node imports.
 */
import type { ParsedTransactionWithMeta } from '@solana/web3.js';
import { formatUnits } from './units.ts';

/** Returns the reasons this transaction counts as OUTGOING activity (empty = inbound/neutral). */
export function outgoingReasons(tx: ParsedTransactionWithMeta, canary: string, tokenAccounts: Set<string>): string[] {
  const reasons: string[] = [];
  const keys = tx.transaction.message.accountKeys;
  const idx = keys.findIndex((k) => k.pubkey.toBase58() === canary);
  if (idx >= 0 && keys[idx]!.signer) {
    reasons.push('the canary key SIGNED this transaction');
  }
  const meta = tx.meta;
  if (!meta) return reasons;
  if (idx >= 0) {
    const pre = meta.preBalances[idx] ?? 0;
    const post = meta.postBalances[idx] ?? 0;
    if (post < pre) reasons.push(`canary SOL balance decreased by ${(pre - post) / 1e9} SOL`);
  }
  const keyAt = (i: number) => keys[i]?.pubkey.toBase58() ?? '';
  for (const pre of meta.preTokenBalances ?? []) {
    const account = keyAt(pre.accountIndex);
    const ownedByCanary = pre.owner === canary || tokenAccounts.has(account);
    if (!ownedByCanary) continue;
    const post = (meta.postTokenBalances ?? []).find((p) => p.accountIndex === pre.accountIndex);
    const preAmt = BigInt(pre.uiTokenAmount.amount);
    const postAmt = post ? BigInt(post.uiTokenAmount.amount) : 0n;
    const decimals = pre.uiTokenAmount.decimals;
    if (!post) reasons.push(`canary token account ${account} (mint ${pre.mint}) was closed`);
    if (postAmt < preAmt) {
      reasons.push(
        `token balance decreased by ${formatUnits(preAmt - postAmt, decimals)} (mint ${pre.mint}, account ${account})`,
      );
    }
    if (post && pre.owner === canary && post.owner && post.owner !== canary) {
      reasons.push(`token account ${account} changed owner from the canary to ${post.owner}`);
    }
  }
  return reasons;
}
