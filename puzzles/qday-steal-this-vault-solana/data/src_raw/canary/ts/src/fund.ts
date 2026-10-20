/**
 * Fund the Bunker Canary: create the canary's associated token account for a
 * mint (idempotent) and transfer the disclosed amount into it, in one
 * transaction.
 *
 *   npm run fund -- --cluster devnet --mint <MINT> --amount 1000 \
 *     --keypair ~/.config/solana/id.json --seed-file seeds/devnet.txt          # dry run (default)
 *   npm run fund -- ... --yes                                                  # actually send
 *   npm run fund -- --cluster mainnet-beta ... --yes --i-understand-this-is-mainnet
 *
 * Dry run is the default: it builds, signs and SIMULATES the transaction and
 * prints what would happen, but sends nothing. The keypair is the fee payer
 * and the token source; it is read from the path you give and never written
 * or printed.
 */
import { parseArgs } from 'node:util';
import {
  Connection,
  PublicKey,
  TransactionMessage,
  VersionedTransaction,
  type TransactionInstruction,
} from '@solana/web3.js';
import {
  calculateEpochFee,
  createAssociatedTokenAccountIdempotentInstruction,
  createTransferCheckedInstruction,
  createTransferCheckedWithTransferHookInstruction,
  getAccount,
  getAssociatedTokenAddressSync,
  getMint,
  getNonTransferable,
  getPermanentDelegate,
  getTransferFeeConfig,
  getTransferHook,
} from '@solana/spl-token';
import {
  detectNetwork,
  formatUnits,
  loadCanary,
  loadKeypair,
  parseUiAmount,
  resolveCluster,
  tokenProgramForMint,
  tokenProgramName,
} from './solana.ts';

const USAGE = `usage: npm run fund -- --cluster <devnet|mainnet-beta|localnet|URL> --mint <MINT> --amount <UI amount>
                     --keypair <path> --seed-file <seeds/x.txt> [--yes] [--i-understand-this-is-mainnet]`;

const { values } = parseArgs({
  options: {
    cluster: { type: 'string' },
    mint: { type: 'string' },
    amount: { type: 'string' },
    keypair: { type: 'string' },
    'seed-file': { type: 'string' },
    yes: { type: 'boolean', default: false },
    'i-understand-this-is-mainnet': { type: 'boolean', default: false },
    'allow-permanent-delegate': { type: 'boolean', default: false },
    help: { type: 'boolean', short: 'h', default: false },
  },
});

function die(msg: string, code = 1): never {
  console.error(`error: ${msg}`);
  process.exit(code);
}

async function main() {
  if (values.help) {
    console.log(USAGE);
    return;
  }
  const missing = ['cluster', 'mint', 'amount', 'keypair', 'seed-file'].filter(
    (k) => !values[k as keyof typeof values],
  );
  if (missing.length) die(`missing --${missing.join(', --')}\n${USAGE}`);

  // 1. Canary (refuses PENDING seeds; double-checks the address is on-curve).
  const canary = loadCanary(values['seed-file']!);

  // 2. Cluster, identified by genesis hash (a custom mainnet RPC URL still counts as mainnet).
  const cluster = resolveCluster(values.cluster!);
  const conn = new Connection(cluster.url, 'confirmed');
  const { network, genesisHash } = await detectNetwork(conn);
  const isMainnet = network === 'mainnet-beta' || cluster.label === 'mainnet-beta';

  if (isMainnet && canary.seed.network !== 'solana-mainnet') {
    die(`seed ${canary.seedFile} is for ${canary.seed.network}; refusing to fund it on mainnet`);
  }
  const warnings: string[] = [];
  if (!isMainnet && canary.seed.network === 'solana-mainnet') {
    warnings.push(`this is the MAINNET seed but the cluster is ${network}`);
  }
  if (network === 'devnet' && canary.seed.network !== 'solana-devnet') {
    warnings.push(`cluster is devnet but the seed network is ${canary.seed.network}`);
  }

  // 3. Mint + token program (SPL Token or Token-2022, from the mint account owner).
  let mint: PublicKey;
  try {
    mint = new PublicKey(values.mint!);
  } catch {
    die(`--mint is not a valid public key: ${values.mint}`);
  }
  const programId = await tokenProgramForMint(conn, mint);
  const mintInfo = await getMint(conn, mint, 'confirmed', programId);
  const decimals = mintInfo.decimals;
  const amount = parseUiAmount(values.amount!, decimals);

  if (getNonTransferable(mintInfo)) die('mint is non-transferable (Token-2022 NonTransferable extension)');
  const permanentDelegate = getPermanentDelegate(mintInfo);
  if (permanentDelegate && !permanentDelegate.delegate.equals(PublicKey.default)) {
    const msg =
      `mint has a Token-2022 permanent delegate (${permanentDelegate.delegate.toBase58()}), which can move ` +
      'tokens out of ANY account, including the canary, without the canary key. A canary funded with this ' +
      'mint could be emptied without Ed25519 being broken.';
    if (!values['allow-permanent-delegate']) die(`${msg} Refusing (override with --allow-permanent-delegate).`);
    warnings.push(msg);
  }
  if (mintInfo.freezeAuthority) {
    warnings.push(
      `mint has a freeze authority (${mintInfo.freezeAuthority.toBase58()}); it can freeze the canary's token ` +
        'account (that does not move tokens, and the watcher only alerts on movement)',
    );
  }
  let expectedFee = 0n;
  const feeConfig = getTransferFeeConfig(mintInfo);
  if (feeConfig) {
    const { epoch } = await conn.getEpochInfo();
    expectedFee = calculateEpochFee(feeConfig, BigInt(epoch), amount);
    if (expectedFee > 0n) {
      warnings.push(
        `mint charges a transfer fee: the canary will receive ${formatUnits(amount - expectedFee, decimals)} ` +
          `(fee ${formatUnits(expectedFee, decimals)} withheld)`,
      );
    }
  }
  const hook = getTransferHook(mintInfo);
  const hasHook = !!hook && !hook.programId.equals(PublicKey.default);

  // 4. Source and destination token accounts.
  const payer = loadKeypair(values.keypair!);
  const sourceAta = getAssociatedTokenAddressSync(mint, payer.publicKey, false, programId);
  // allowOwnerOffCurve = false: the canary is a real on-curve address (this throws if it were a PDA).
  const canaryAta = getAssociatedTokenAddressSync(mint, canary.publicKey, false, programId);

  let sourceBalance: bigint;
  try {
    sourceBalance = (await getAccount(conn, sourceAta, 'confirmed', programId)).amount;
  } catch {
    die(`the keypair ${payer.publicKey.toBase58()} has no associated token account for this mint (${sourceAta.toBase58()})`);
  }
  if (sourceBalance < amount) {
    die(`insufficient balance: source has ${formatUnits(sourceBalance, decimals)}, need ${values.amount}`);
  }
  const canaryAtaInfo = await conn.getAccountInfo(canaryAta);
  let canaryBalanceBefore = 0n;
  if (canaryAtaInfo) canaryBalanceBefore = (await getAccount(conn, canaryAta, 'confirmed', programId)).amount;
  const solBalance = await conn.getBalance(payer.publicKey);

  // 5. One transaction: create ATA (idempotent) + transferChecked.
  const ixs: TransactionInstruction[] = [
    createAssociatedTokenAccountIdempotentInstruction(payer.publicKey, canaryAta, canary.publicKey, mint, programId),
    hasHook
      ? await createTransferCheckedWithTransferHookInstruction(
          conn,
          sourceAta,
          mint,
          canaryAta,
          payer.publicKey,
          amount,
          decimals,
          [],
          'confirmed',
          programId,
        )
      : createTransferCheckedInstruction(sourceAta, mint, canaryAta, payer.publicKey, amount, decimals, [], programId),
  ];
  const { blockhash, lastValidBlockHeight } = await conn.getLatestBlockhash('confirmed');
  const message = new TransactionMessage({ payerKey: payer.publicKey, recentBlockhash: blockhash, instructions: ixs });
  const tx = new VersionedTransaction(message.compileToV0Message());
  tx.sign([payer]);
  const sim = await conn.simulateTransaction(tx, { sigVerify: true, commitment: 'confirmed' });

  const plan = {
    mode: values.yes ? 'SEND' : 'DRY RUN',
    cluster: cluster.label,
    rpc: cluster.url,
    network,
    genesisHash,
    canary: {
      address: canary.address,
      seedFile: canary.seedFile,
      seedSha256: canary.seedSha256,
      seedNetwork: canary.seed.network,
      onCurve: PublicKey.isOnCurve(canary.publicKey.toBytes()),
    },
    mint: mint.toBase58(),
    tokenProgram: `${tokenProgramName(programId)} (${programId.toBase58()})`,
    decimals,
    amount: { ui: formatUnits(amount, decimals), baseUnits: amount.toString() },
    transferHook: hasHook ? hook!.programId.toBase58() : null,
    payerAndSource: {
      owner: payer.publicKey.toBase58(),
      tokenAccount: sourceAta.toBase58(),
      balance: formatUnits(sourceBalance, decimals),
      solBalance: solBalance / 1e9,
    },
    canaryTokenAccount: {
      address: canaryAta.toBase58(),
      exists: !!canaryAtaInfo,
      balanceBefore: formatUnits(canaryBalanceBefore, decimals),
      balanceAfterExpected: formatUnits(canaryBalanceBefore + amount - expectedFee, decimals),
    },
    instructions: [
      `createAssociatedTokenAccountIdempotent(payer=${payer.publicKey.toBase58()}, owner=${canary.address})`,
      `transferChecked(${formatUnits(amount, decimals)} -> ${canaryAta.toBase58()})`,
    ],
    simulation: sim.value.err ? { ok: false, err: sim.value.err, logs: sim.value.logs } : { ok: true, unitsConsumed: sim.value.unitsConsumed },
    warnings,
  };
  console.log(JSON.stringify(plan, null, 2));

  if (!values.yes) {
    console.log(
      `\nDRY RUN: nothing was sent. Re-run with --yes to send${isMainnet ? ' (mainnet also requires --i-understand-this-is-mainnet)' : ''}.`,
    );
    return;
  }
  if (isMainnet && !values['i-understand-this-is-mainnet']) {
    die('refusing to send on mainnet without --i-understand-this-is-mainnet');
  }
  if (sim.value.err) die('simulation failed; not sending (see "simulation" above)');

  const signature = await conn.sendTransaction(tx, { maxRetries: 5 });
  console.log(`\nsent: ${signature}`);
  const conf = await conn.confirmTransaction({ signature, blockhash, lastValidBlockHeight }, 'confirmed');
  if (conf.value.err) die(`transaction failed: ${JSON.stringify(conf.value.err)}`);
  const after = (await getAccount(conn, canaryAta, 'confirmed', programId)).amount;
  console.log(`confirmed. canary token account ${canaryAta.toBase58()} balance: ${formatUnits(after, decimals)}`);
  console.log(
    `\nDisclosure: funded Bunker Canary ${canary.address} (${canary.seed.network}) with ` +
      `${formatUnits(amount, decimals)} of mint ${mint.toBase58()} in transaction ${signature}.`,
  );
}

main().catch((err) => die((err as Error).message ?? String(err)));
