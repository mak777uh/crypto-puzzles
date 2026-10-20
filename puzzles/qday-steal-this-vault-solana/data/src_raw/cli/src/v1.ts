// Inline-signature transport for the CLI: ONE v1 (4,096-byte) transaction built with @solana/kit
// (web3.js v1 cannot build v1). Rules (docs/research/PLATFORM_CHECK_2026-10.md §1):
//   * computeUnitLimit AND loadedAccountsDataSizeLimit go in the v1 header config (both default to 0);
//     no ComputeBudget instructions (ignored in v1);
//   * no address lookup tables, ≤ 64 accounts, no duplicates; send base64;
//   * reads need maxSupportedTransactionVersion: 1.

import {
  AccountRole,
  address,
  appendTransactionMessageInstructions,
  createKeyPairSignerFromBytes,
  createSolanaRpc,
  createTransactionMessage,
  getBase64EncodedWireTransaction,
  getSignatureFromTransaction,
  getTransactionEncoder,
  pipe,
  setTransactionMessageConfig,
  setTransactionMessageFeePayerSigner,
  setTransactionMessageLifetimeUsingBlockhash,
  signTransactionMessageWithSigners,
} from '@solana/kit';
import type { Instruction, KeyPairSigner, AccountMeta as KitAccountMeta, AccountSignerMeta } from '@solana/kit';
import type { Keypair, TransactionInstruction } from '@solana/web3.js';
import type { InlineBundle } from '@bunker/sdk';
import type { ClusterCtx } from './config';

function role(isSigner: boolean, isWritable: boolean): AccountRole {
  if (isSigner) return isWritable ? AccountRole.WRITABLE_SIGNER : AccountRole.READONLY_SIGNER;
  return isWritable ? AccountRole.WRITABLE : AccountRole.READONLY;
}

/** web3.js v1 instruction → Kit instruction; signer accounts carry their Kit signer. */
export function toKitInstruction(ix: TransactionInstruction, signers: KeyPairSigner[]): Instruction {
  const accounts = ix.keys.map((k): KitAccountMeta | AccountSignerMeta => {
    const addr = address(k.pubkey.toBase58());
    const meta = { address: addr, role: role(k.isSigner, k.isWritable) };
    const signer = k.isSigner ? signers.find((s) => s.address === addr) : undefined;
    return signer ? ({ ...meta, signer } as AccountSignerMeta) : meta;
  });
  return { programAddress: address(ix.programId.toBase58()), accounts, data: new Uint8Array(ix.data) };
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Public RPCs rate-limit (HTTP 429) and drop connections; retry those with backoff. */
function isTransient(e: unknown): boolean {
  const msg = String((e as { message?: unknown })?.message ?? e);
  return /\b429\b|Too Many Requests|fetch failed|ECONNRESET|ETIMEDOUT|socket hang up|50[234]\b/i.test(msg);
}

async function withRetry<T>(fn: () => Promise<T>, attempts = 8): Promise<T> {
  for (let i = 0; ; i++) {
    try {
      return await fn();
    } catch (e) {
      if (i + 1 >= attempts || !isTransient(e)) throw e;
      await sleep(Math.min(8000, 500 * 2 ** i));
    }
  }
}

/** Build, sign, send and confirm the v1 transaction. Returns its signature, size and CU consumed. */
export async function sendInlineV1(
  ctx: ClusterCtx,
  bundle: InlineBundle,
  keypairs: Keypair[],
): Promise<{ signature: string; size: number; computeUnits: number | null }> {
  const rpc = createSolanaRpc(ctx.url);
  const signers = await Promise.all(keypairs.map((k) => createKeyPairSignerFromBytes(k.secretKey)));
  const feePayer = signers[0];
  if (!feePayer) throw new Error('no fee payer');
  const { value: blockhash } = await withRetry(() => rpc.getLatestBlockhash({ commitment: 'confirmed' }).send());
  const message = pipe(
    createTransactionMessage({ version: 1 }),
    (m) => setTransactionMessageFeePayerSigner(feePayer, m),
    (m) => setTransactionMessageLifetimeUsingBlockhash(blockhash, m),
    (m) =>
      setTransactionMessageConfig(
        { computeUnitLimit: bundle.computeUnitLimit, loadedAccountsDataSizeLimit: bundle.loadedAccountsDataSizeLimit },
        m,
      ),
    (m) => appendTransactionMessageInstructions(bundle.instructions.map((ix) => toKitInstruction(ix, signers)), m),
  );
  const signed = await signTransactionMessageWithSigners(message);
  const signature = getSignatureFromTransaction(signed);
  const size = getTransactionEncoder().encode(signed).length;
  const wire = getBase64EncodedWireTransaction(signed);
  // Re-sending the identical signed transaction is idempotent, so retrying a rate-limited send is safe.
  await withRetry(() => rpc.sendTransaction(wire, { encoding: 'base64', preflightCommitment: 'confirmed' }).send());

  let lastSend = Date.now();
  for (let poll = 0; ; poll++) {
    await sleep(1000);
    const st = (await withRetry(() => rpc.getSignatureStatuses([signature]).send())).value[0];
    if (st?.err) throw new Error(`v1 transaction ${signature} failed: ${JSON.stringify(st.err, (_k, v) => (typeof v === 'bigint' ? v.toString() : v))}`);
    if (st && (st.confirmationStatus === 'confirmed' || st.confirmationStatus === 'finalized')) break;
    if (poll % 4 === 3) {
      const height = await withRetry(() => rpc.getBlockHeight({ commitment: 'confirmed' }).send());
      if (height > blockhash.lastValidBlockHeight) throw new Error(`v1 transaction ${signature} expired before confirmation`);
    }
    if (Date.now() - lastSend > 3000) {
      lastSend = Date.now();
      await rpc.sendTransaction(wire, { encoding: 'base64', skipPreflight: true, maxRetries: 0n }).send().catch(() => undefined);
    }
  }
  const tx = await withRetry(() =>
    rpc.getTransaction(signature, { commitment: 'confirmed', maxSupportedTransactionVersion: 1, encoding: 'json' }).send(),
  ).catch(() => null);
  const cu = tx?.meta?.computeUnitsConsumed;
  return { signature, size, computeUnits: cu === undefined || cu === null ? null : Number(cu) };
}
