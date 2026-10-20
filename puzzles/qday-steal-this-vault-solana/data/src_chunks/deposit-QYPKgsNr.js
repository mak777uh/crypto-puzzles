var e=`import { SystemProgram } from '@solana/web3.js';
import type { Connection, PublicKey, Transaction } from '@solana/web3.js';
import {
  createAssociatedTokenAccountIdempotentInstruction,
  createTransferCheckedInstruction,
  unpackAccount,
} from '@solana/spl-token';
import { BETA_CAP_LAMPORTS, COMPUTE_UNITS } from './constants';
import type { ClusterName } from './constants';
import { assertClusterAllowed } from './cluster';
import { ataOf } from './addresses';
import { fetchMintClassifications } from './assets';
import { formatAmount } from './describe';
import { fetchVault } from './state';
import { cuLimitIx, makeTx } from './transport';

export type DepositAsset =
  | { kind: 'sol' }
  | {
      kind: 'token';
      mint: PublicKey;
      /** Optional; must match the mint's owner program when given. */
      tokenProgram?: PublicKey;
      /** Source token account (default: the depositor's ATA). */
      source?: PublicKey;
    };

export class BetaCapError extends Error {
  constructor(current: bigint, amount: bigint) {
    super(
      \`Deposit cap: a vault may hold at most \${formatAmount(BETA_CAP_LAMPORTS, 9)} SOL for now. \` +
        \`It holds \${formatAmount(current, 9)} SOL; depositing \${formatAmount(amount, 9)} SOL would bring it to \${formatAmount(current + amount, 9)} SOL.\`,
    );
    this.name = 'BetaCapError';
  }
}

export class UnsupportedAssetError extends Error {
  constructor(reason: string) {
    super(\`Unsupported asset: \${reason}\`);
    this.name = 'UnsupportedAssetError';
  }
}

/**
 * Deposit transactions (one, in practice). SOL goes straight to the wallet PDA; tokens go to the
 * wallet's ATA, created idempotently (payer = \`from\`), via transfer_checked.
 * Pass \`state\` so the vault is checked to be open (deposits into a closed vault are unrecoverable).
 */
export async function buildDepositTxs(p: {
  conn: Connection;
  from: PublicKey;
  wallet: PublicKey;
  asset: DepositAsset;
  amount: bigint;
  state?: PublicKey;
  cluster?: ClusterName;
}): Promise<Transaction[]> {
  if (p.cluster) assertClusterAllowed(p.cluster);
  if (p.amount <= 0n) throw new Error('Deposit amount must be greater than zero');
  if (p.state) {
    const v = await fetchVault(p.conn, p.state);
    if (!v) throw new Error(\`Vault \${p.state.toBase58()} does not exist\`);
    if (v.closed) throw new Error('This vault is closed; deposits would be lost');
    if (!v.wallet.equals(p.wallet)) throw new Error('wallet does not belong to this vault state');
  }
  const bh = await p.conn.getLatestBlockhash('confirmed');

  if (p.asset.kind === 'sol') {
    const [balance, rentMin] = await Promise.all([
      p.conn.getBalance(p.wallet, 'confirmed'),
      p.conn.getMinimumBalanceForRentExemption(0, 'confirmed'),
    ]);
    const current = BigInt(balance);
    if (current + p.amount > BETA_CAP_LAMPORTS) throw new BetaCapError(current, p.amount);
    if (current + p.amount < BigInt(rentMin)) {
      throw new Error(\`A vault must hold at least \${formatAmount(BigInt(rentMin), 9)} SOL (rent-exempt minimum); deposit more.\`);
    }
    return [
      makeTx(
        [cuLimitIx(COMPUTE_UNITS.depositSol), SystemProgram.transfer({ fromPubkey: p.from, toPubkey: p.wallet, lamports: p.amount })],
        p.from,
        bh,
      ),
    ];
  }

  const { mint } = p.asset;
  const cls = (await fetchMintClassifications(p.conn, [mint])).get(mint.toBase58());
  if (!cls) throw new UnsupportedAssetError(\`\${mint.toBase58()} is not a token mint\`);
  if (p.asset.tokenProgram && !p.asset.tokenProgram.equals(cls.tokenProgram)) {
    throw new Error('tokenProgram does not match the mint owner');
  }
  if (!cls.supported) throw new UnsupportedAssetError(cls.unsupportedReason ?? 'not supported');
  const tokenProgram = cls.tokenProgram;
  const source = p.asset.source ?? ataOf(p.from, mint, tokenProgram);
  const srcInfo = await p.conn.getAccountInfo(source, 'confirmed');
  if (!srcInfo) throw new Error(\`Source token account \${source.toBase58()} does not exist\`);
  const src = unpackAccount(source, srcInfo, tokenProgram);
  if (!src.mint.equals(mint)) throw new Error('Source token account is for a different mint');
  if (src.isFrozen) throw new UnsupportedAssetError('your token account is frozen by the issuer');
  if (src.amount < p.amount) {
    throw new Error(\`Insufficient balance: have \${formatAmount(src.amount, cls.decimals)}, need \${formatAmount(p.amount, cls.decimals)}\`);
  }
  const dest = ataOf(p.wallet, mint, tokenProgram);
  return [
    makeTx(
      [
        cuLimitIx(COMPUTE_UNITS.depositToken),
        createAssociatedTokenAccountIdempotentInstruction(p.from, dest, p.wallet, mint, tokenProgram),
        createTransferCheckedInstruction(source, mint, dest, p.from, p.amount, cls.decimals, [], tokenProgram),
      ],
      p.from,
      bh,
    ),
  ];
}
`;export{e as default};