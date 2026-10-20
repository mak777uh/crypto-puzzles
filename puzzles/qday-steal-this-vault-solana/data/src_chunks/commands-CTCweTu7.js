var e=`import { chmodSync, writeFileSync } from 'node:fs';
import type { Keypair, PublicKey, Transaction } from '@solana/web3.js';
import pc from 'picocolors';
import {
  BETA_CAP_LAMPORTS,
  LOW_LEAVES_WARNING,
  PrepareCancelledError,
  SendPreparedError,
  buildDepositTxs,
  buildInheritTxs,
  buildOpenVaultTx,
  checkRecipients,
  fetchAssets,
  fetchClusterTime,
  fetchHeir,
  fetchMintClassifications,
  fetchTokenMetas,
  findPendingSignatures,
  formatAmount,
  formatDays,
  generateMnemonic,
  heirStatus,
  summarizeInheritPlan,
  initWasm,
  parseAmount,
  prepareClose,
  prepareExecute,
  prepareRotate,
  rebuildPrepared,
  sanitizeTokenName,
  sanitizeTokenSymbol,
  sendPrepared,
  shortAddress,
  txSize,
  vaultFromSeed,
} from '@bunker/sdk';
import type { PreparedSignature, RecipientCheck, SignaturePreview, VaultInfo } from '@bunker/sdk';
import {
  connectCluster,
  expandHome,
  explorerUrl,
  loadKeypair,
  openLedger,
  parsePubkey,
  readSeedFile,
  resolveVault,
  seedFilePath,
} from './config';
import type { ClusterCtx, GlobalOpts } from './config';
import { resolveActions } from './actions-file';
import type { ActionSpec } from './actions-file';
import { box, confirm, err, kv, out, warn } from './ui';
import { sendInlineV1 } from './v1';

// ---------- shared ----------

const transportOf = (g: GlobalOpts): 'buffer' | 'inline' => (g.v1 ? 'inline' : 'buffer');

async function sendAndReport(ctx: ClusterCtx, txs: Transaction[], signers: Keypair[], label: string): Promise<string[]> {
  for (const tx of txs) tx.partialSign(...signers);
  const sigs = await sendPrepared(ctx.conn, txs, (i, n, sig) => {
    out(\`  \${pc.green('✓')} \${label} \${i + 1}/\${n} \${pc.dim(\`(\${txSize(txs[i]!)} B)\`)} \${sig}\`);
  });
  const last = sigs[sigs.length - 1];
  if (last) {
    const info = await ctx.conn.getTransaction(last, { commitment: 'confirmed', maxSupportedTransactionVersion: 0 }).catch(() => null);
    const cu = info?.meta?.computeUnitsConsumed;
    if (cu !== undefined) out(\`  \${pc.dim(\`final transaction: \${cu} compute units\`)}\`);
    out(\`  \${pc.dim(explorerUrl(last, ctx))}\`);
  }
  return sigs;
}

/** What the chain says about a recipient, for the confirmation screen. */
function recipientNote(c: RecipientCheck): string {
  if (c.refuse) return pc.red('refused');
  if (c.vault) return \`Bunker vault \${pc.dim(\`(state \${c.vault.toBase58()})\`)}\`;
  if (c.unused) return pc.yellow('never used on Solana');
  if (c.warn) return pc.yellow('no private key');
  return pc.dim('wallet');
}

function previewPrinter(vault: VaultInfo, yes: boolean | undefined, v1 = false, recipients: RecipientCheck[] = []) {
  return async (p: SignaturePreview): Promise<boolean> => {
    out();
    out(pc.bold(\`Vault \${vault.wallet.toBase58()}\`));
    kv('key epoch', String(p.rootEpoch));
    kv('one-time leaf', \`\${p.leafIndex} (\${p.leavesLeft} left after this)\`);
    kv('transactions', p.transactionCount === 1 && v1 ? '1 (v1, signature inline)' : \`\${p.transactionCount} (signature-buffer path)\`);
    for (const r of recipients) kv('to', \`\${r.address.toBase58()}  \${recipientNote(r)}\`);
    out();
    out(pc.bold(pc.cyan(p.summary)));
    for (const w of p.warnings) warn(w);
    out();
    return confirm(\`Sign with one-time leaf \${p.leafIndex} and broadcast?\`, yes);
  };
}

async function runPrepared(ctx: ClusterCtx, g: GlobalOpts, p: PreparedSignature, payer: Keypair): Promise<string[]> {
  const signers = [payer];
  if (p.extraSigners.length > 0) {
    if (!g.cosignerKeypair) throw new Error(\`this vault needs its cosigner \${p.extraSigners[0]!.toBase58()} to sign: pass --cosigner-keypair <file>\`);
    const cos = loadKeypair(g.cosignerKeypair);
    if (!p.extraSigners.some((s) => s.equals(cos.publicKey))) throw new Error('--cosigner-keypair is not this vault\\'s cosigner');
    signers.push(cos);
  }
  try {
    if (p.inline) {
      const r = await sendInlineV1(ctx, p.inline, signers);
      out(\`  \${pc.green('✓')} \${p.kind} (v1, signature inline) \${pc.dim(\`(\${r.size} B)\`)} \${r.signature}\`);
      if (r.computeUnits !== null) out(\`  \${pc.dim(\`\${r.computeUnits} compute units\`)}\`);
      out(\`  \${pc.dim(explorerUrl(r.signature, ctx))}\`);
      return [r.signature];
    }
    return await sendAndReport(ctx, p.transactions, signers, p.kind);
  } catch (e) {
    if (e instanceof SendPreparedError || p.inline) {
      const logs = (e as { logs?: string[]; context?: { logs?: string[] } }).logs ?? (e as { context?: { logs?: string[] } }).context?.logs;
      if (logs?.length) err(pc.dim(logs.join('\\n')));
      err(
        pc.yellow(
          \`Leaf \${p.leafIndex} is spent and its signature may already be public. Until a later leaf executes or the key is\\n\` +
            'rotated, anyone can still submit it, so it may yet execute. Signing again does NOT cancel it: a new signature\\n' +
            'uses a later leaf, and both execute if this one lands first. To finish this one, run:\\n' +
            \`  bunker rebroadcast --leaf \${p.leafIndex}\${g.vault ? \` --vault \${g.vault}\` : ''}\${g.v1 ? ' --v1' : ''}\`,
        ),
      );
    }
    throw e;
  }
}

function lowLeavesNote(p: PreparedSignature): void {
  if (p.lowLeaves) warn(\`only \${p.leavesLeft} one-time signatures left at this epoch (< \${LOW_LEAVES_WARNING}): run \\\`bunker rotate\\\`\`);
}

async function loadSeed(g: GlobalOpts): Promise<string> {
  return readSeedFile(seedFilePath(g), warn);
}

// ---------- keygen ----------

export async function cmdKeygen(o: { out?: string; print: boolean; force?: boolean }): Promise<number> {
  await initWasm();
  if (!o.print && !o.out) throw new Error('--no-print needs --out <file> (otherwise the seed would be lost)');
  const mnemonic = generateMnemonic();
  if (o.out) {
    const path = expandHome(o.out);
    writeFileSync(path, \`\${mnemonic}\\n\`, { mode: 0o600, flag: o.force ? 'w' : 'wx' });
    chmodSync(path, 0o600);
    out(\`Vault seed written to \${path} (mode 0600).\`);
  }
  if (o.print) {
    out(
      box([
        'VAULT SEED - shown once. Write these 24 words on paper.',
        'Anyone with these words controls every vault opened with them.',
        'Never type them into a website, chat, cloud note or photo.',
        'Bunker cannot recover them for you.',
      ]),
    );
    const words = mnemonic.split(' ');
    for (let r = 0; r < 6; r++) {
      out(
        '  ' +
          [0, 6, 12, 18]
            .map((c) => {
              const i = r + c;
              return \`\${String(i + 1).padStart(2)}. \${(words[i] ?? '').padEnd(10)}\`;
            })
            .join('  '),
      );
    }
    out();
  }
  out(pc.dim('Use it with --seed-file <path> or BUNKER_SEED_FILE. Keep the file offline (chmod 600).'));
  return 0;
}

// ---------- open ----------

export async function cmdOpen(g: GlobalOpts): Promise<number> {
  const ctx = await connectCluster(g.cluster);
  const payer = loadKeypair(g.keypair);
  const mnemonic = await loadSeed(g);
  const cosigner = g.cosigner ? parsePubkey(g.cosigner, '--cosigner') : null;
  const { root, state, wallet } = await vaultFromSeed(mnemonic, { cluster: ctx.cluster, cosigner });
  const existing = await ctx.conn.getAccountInfo(state);
  if (existing) {
    out(\`Vault already open.\`);
    kv('state', state.toBase58());
    kv('wallet (deposit)', wallet.toBase58());
    return 0;
  }
  const built = await buildOpenVaultTx({ conn: ctx.conn, payer: payer.publicKey, root, cosigner, cluster: ctx.cluster });
  out(pc.bold('Open a vault'));
  kv('cluster', \`\${ctx.cluster} (\${ctx.url})\`);
  kv('fee payer', payer.publicKey.toBase58());
  kv('state', built.state.toBase58());
  kv('wallet (deposit)', built.wallet.toBase58());
  if (cosigner) kv('cosigner', cosigner.toBase58());
  if (!(await confirm('Open this vault?', g.yes))) return 1;
  await sendAndReport(ctx, [built.tx], [payer], 'open_vault');
  out();
  out(pc.green('Vault opened.'));
  out(\`  state:  \${built.state.toBase58()}\`);
  out(\`  wallet: \${built.wallet.toBase58()}   \${pc.dim('← the vault address; deposits go here')}\`);
  return 0;
}

// ---------- deposit ----------

export async function cmdDeposit(g: GlobalOpts, asset: { kind: 'sol' } | { kind: 'token'; mint: string }, amount: string, o: { raw?: boolean }): Promise<number> {
  const ctx = await connectCluster(g.cluster);
  const payer = loadKeypair(g.keypair);
  const vault = await resolveVault(ctx, g, g.vault ? undefined : await loadSeed(g));
  // A pending close can still be landed by anyone: a deposit made before it lands is locked forever.
  const { pending } = await findPendingSignatures({ conn: ctx.conn, cluster: ctx.cluster, vault, ledger: openLedger(g), feePayer: payer.publicKey }).catch(
    (e: unknown) => {
      warn(\`could not check for pending signatures (\${e instanceof Error ? e.message : String(e)}); deposits are only safe if no close of this vault is pending\`);
      return { pending: [] as Awaited<ReturnType<typeof findPendingSignatures>>['pending'] };
    },
  );
  if (pending.some((p) => p.kind === 'close')) {
    throw new Error('a close of this vault is pending and anyone can still land it: finish it (bunker rebroadcast) or land a newer signature before depositing');
  }
  let raw: bigint;
  let label: string;
  let txs: Transaction[];
  if (asset.kind === 'sol') {
    raw = o.raw ? BigInt(amount) : parseAmount(amount, 9);
    label = \`\${formatAmount(raw, 9)} SOL\`;
    txs = await buildDepositTxs({ conn: ctx.conn, from: payer.publicKey, wallet: vault.wallet, state: vault.state, asset: { kind: 'sol' }, amount: raw, cluster: ctx.cluster });
  } else {
    const mint = parsePubkey(asset.mint, 'mint');
    const c = (await fetchMintClassifications(ctx.conn, [mint])).get(mint.toBase58());
    if (!c) throw new Error(\`mint \${mint.toBase58()} not found\`);
    raw = o.raw ? BigInt(amount) : parseAmount(amount, c.decimals);
    // Token metadata is chain data anyone can set: never print it raw (escape sequences, bidi).
    label = \`\${formatAmount(raw, c.decimals)} \${sanitizeTokenSymbol(c.symbol) || shortAddress(mint)}\`;
    for (const r of c.risks) warn(\`\${r.label}: \${r.detail}\`);
    txs = await buildDepositTxs({ conn: ctx.conn, from: payer.publicKey, wallet: vault.wallet, state: vault.state, asset: { kind: 'token', mint }, amount: raw, cluster: ctx.cluster });
  }
  out(\`Deposit \${pc.bold(label)} into vault \${vault.wallet.toBase58()}\`);
  if (asset.kind === 'sol') out(pc.dim(\`  deposit cap: at most \${formatAmount(BETA_CAP_LAMPORTS, 9)} SOL per vault\`));
  if (!(await confirm('Send deposit?', g.yes))) return 1;
  await sendAndReport(ctx, txs, [payer], 'deposit');
  return 0;
}

// ---------- execute / rotate / close ----------

export async function cmdExecute(g: GlobalOpts, specs: ActionSpec[], o: { createAta: boolean }): Promise<number> {
  const ctx = await connectCluster(g.cluster);
  const payer = loadKeypair(g.keypair);
  const mnemonic = await loadSeed(g);
  const vault = await resolveVault(ctx, g, mnemonic);
  const actions = await resolveActions(ctx.conn, specs, payer.publicKey, { vaultState: vault.state });
  const ledger = openLedger(g);
  // Shown on the confirmation screen (another Bunker vault, a never-used address...). prepareExecute
  // runs the same checks again and refuses what must be refused; a failed lookup here only hides the notes.
  const to = actions.flatMap((a) =>
    a.kind === 'transferSol' ? [a.to] : a.kind === 'transferToken' ? [a.destinationOwner ?? a.destination] : a.kind === 'setHeir' ? [a.heir] : [],
  );
  const recipients = await checkRecipients(ctx.conn, to).catch(() => [] as RecipientCheck[]);
  let p: PreparedSignature;
  try {
    p = await prepareExecute({
      conn: ctx.conn,
      cluster: ctx.cluster,
      vault,
      actions,
      mnemonic,
      feePayer: payer.publicKey,
      ledger,
      createDestinationAtas: o.createAta,
      transport: transportOf(g),
      abandonPending: !!g.abandonPending,
      confirm: previewPrinter(vault, g.yes, g.v1, recipients),
    });
  } catch (e) {
    if (e instanceof PrepareCancelledError) {
      out('Cancelled. Nothing was signed.');
      return 1;
    }
    throw e;
  }
  await runPrepared(ctx, g, p, payer);
  out(pc.green(\`Sent with leaf \${p.leafIndex} (epoch \${p.rootEpoch}).\`));
  lowLeavesNote(p);
  return 0;
}

export async function cmdRotate(g: GlobalOpts, o: { newSeedFile?: string }): Promise<number> {
  const ctx = await connectCluster(g.cluster);
  const payer = loadKeypair(g.keypair);
  const mnemonic = await loadSeed(g);
  const vault = await resolveVault(ctx, g, mnemonic);
  const newMnemonic = o.newSeedFile ? await readSeedFile(expandHome(o.newSeedFile), warn) : undefined;
  if (newMnemonic && newMnemonic === mnemonic) throw new Error('--new-seed-file holds the current seed; omit it to rotate within the same seed');
  let p: PreparedSignature;
  try {
    p = await prepareRotate({ conn: ctx.conn, cluster: ctx.cluster, vault, mnemonic, ...(newMnemonic ? { newMnemonic } : {}), feePayer: payer.publicKey, ledger: openLedger(g), transport: transportOf(g), abandonPending: !!g.abandonPending, confirm: previewPrinter(vault, g.yes, g.v1) });
  } catch (e) {
    if (e instanceof PrepareCancelledError) {
      out('Cancelled. Nothing was signed.');
      return 1;
    }
    throw e;
  }
  await runPrepared(ctx, g, p, payer);
  out(pc.green(\`Rotated: vault is now at key epoch \${vault.rootEpoch + 1} with \${vault.treeSize} fresh one-time signatures.\`));
  if (newMnemonic) {
    out(
      box(
        [
          'The vault is now controlled by the NEW seed.',
          \`From now on use: --seed-file \${o.newSeedFile} --vault \${vault.state.toBase58()}\`,
          'The old seed no longer controls anything; destroy it.',
        ],
        pc.yellow,
      ),
    );
  }
  return 0;
}

export async function cmdClose(g: GlobalOpts, o: { rentTo?: string; abandonTokenAccount?: string[] }): Promise<number> {
  const ctx = await connectCluster(g.cluster);
  const payer = loadKeypair(g.keypair);
  const mnemonic = await loadSeed(g);
  const vault = await resolveVault(ctx, g, mnemonic);
  const rentTo = o.rentTo ? parsePubkey(o.rentTo, '--rent-to') : payer.publicKey;
  warn('closing is permanent: this vault address can never be used again');
  let p: PreparedSignature;
  try {
    const abandonTokenAccounts = (o.abandonTokenAccount ?? []).map((a) => parsePubkey(a, '--abandon-token-account'));
    p = await prepareClose({ conn: ctx.conn, cluster: ctx.cluster, vault, mnemonic, feePayer: payer.publicKey, ledger: openLedger(g), rentTo, abandonTokenAccounts, transport: transportOf(g), abandonPending: !!g.abandonPending, confirm: previewPrinter(vault, g.yes, g.v1) });
  } catch (e) {
    if (e instanceof PrepareCancelledError) {
      out('Cancelled. Nothing was signed.');
      return 1;
    }
    throw e;
  }
  await runPrepared(ctx, g, p, payer);
  out(pc.green('Vault closed.'));
  return 0;
}

export async function cmdRebroadcast(g: GlobalOpts, o: { leaf: string; epoch?: string; createAta: boolean }): Promise<number> {
  const ctx = await connectCluster(g.cluster);
  const payer = loadKeypair(g.keypair);
  const vault = await resolveVault(ctx, g, g.vault ? undefined : await loadSeed(g));
  const p = await rebuildPrepared({
    conn: ctx.conn,
    cluster: ctx.cluster,
    vault,
    ledger: openLedger(g),
    leafIndex: Number(o.leaf),
    ...(o.epoch !== undefined ? { rootEpoch: Number(o.epoch) } : {}),
    feePayer: payer.publicKey,
    createDestinationAtas: o.createAta,
    transport: transportOf(g),
  });
  out(\`Rebroadcasting the recorded signature for leaf \${p.leafIndex} (epoch \${p.rootEpoch}); nothing is re-signed.\`);
  out(pc.bold(pc.cyan(p.summary)));
  if (!(await confirm(\`Send \${p.inline ? 1 : p.transactions.length} transaction(s)?\`, g.yes))) return 1;
  await runPrepared(ctx, g, p, payer);
  return 0;
}

// ---------- Legacy: heir and inherit ----------

function when(unix: number): string {
  return new Date(unix * 1000).toISOString().replace('T', ' ').replace(/\\.\\d+Z$/, ' UTC');
}

function span(seconds: number): string {
  const d = Math.floor(seconds / 86_400);
  const h = Math.floor((seconds % 86_400) / 3600);
  return d > 0 ? \`\${d} day\${d === 1 ? '' : 's'}\${h ? \` \${h} h\` : ''}\` : \`\${h} h \${Math.floor((seconds % 3600) / 60)} min\`;
}

export async function cmdHeirShow(g: GlobalOpts): Promise<number> {
  const ctx = await connectCluster(g.cluster);
  const vault = await resolveVault(ctx, g, g.vault ? undefined : await loadSeed(g));
  const [heir, now] = await Promise.all([fetchHeir(ctx.conn, vault.state), fetchClusterTime(ctx.conn)]);
  out(pc.bold(\`Vault \${vault.wallet.toBase58()}\`));
  if (!heir) {
    out('No heir. Name one with \`bunker heir set <address> --days <30..3650>\`.');
    return 0;
  }
  const s = heirStatus(heir, now);
  kv('heir', heir.heir.toBase58());
  kv('countdown', \`\${formatDays(heir.inactivityDays)} without a check-in\`);
  kv('last check-in', when(heir.lastCheckIn));
  kv('deadline', when(heir.deadline));
  if (s.inherited) {
    kv('status', pc.yellow(\`inherited \${when(heir.inheritedAt!)}: the vault's key can never sign again\`));
    out(pc.dim(\`Anything that still arrives can be moved to the heir: bunker inherit --vault \${vault.state.toBase58()}\`));
  } else if (s.due) {
    kv('status', pc.yellow('due: anyone can move everything in this vault to the heir now'));
    out(pc.dim(\`Still yours until someone does: \\\`bunker heir check-in\\\` restarts the countdown. To inherit: bunker inherit --vault \${vault.state.toBase58()}\`));
  } else {
    kv('status', \`\${span(s.secondsLeft)} left\`);
  }
  return 0;
}

export async function cmdInherit(g: GlobalOpts): Promise<number> {
  const ctx = await connectCluster(g.cluster);
  const payer = loadKeypair(g.keypair);
  if (!g.vault) throw new Error('pass --vault <address>: the vault to inherit from (its address or state account)');
  const vault = await resolveVault(ctx, g);
  const plan = await buildInheritTxs({ conn: ctx.conn, state: vault.state, caller: payer.publicKey, cluster: ctx.cluster });
  const metas = await fetchTokenMetas(ctx.conn, plan.tokens.map((t) => t.mint));
  const label = (m: PublicKey) => sanitizeTokenSymbol(metas.get(m.toBase58())?.symbol) || \`token \${shortAddress(m)}\`;
  out(pc.bold(\`Inherit vault \${vault.wallet.toBase58()}\`));
  kv('heir', plan.heir.heir.toBase58());
  kv('moves', summarizeInheritPlan(plan, label));
  for (const t of plan.tokens) {
    if (t.amount === 0n) {
      kv('token', \`\${label(t.mint)}: empty, the account is closed and its rent goes to the heir\`);
      continue;
    }
    kv('token', \`\${formatAmount(t.amount, t.decimals)} \${label(t.mint)}\${t.createsHeirAccount ? pc.dim(" (creates the heir's account: you pay its rent)") : ''}\`);
  }
  for (const s of plan.skipped) warn(\`stays in the vault: \${shortAddress(s.account)} (\${shortAddress(s.mint)}): \${s.reason}\`);
  if (plan.heir.inheritedAt === null) warn('the first inherit seals the vault: its hash key can never sign again');
  out(pc.dim('No signature is needed: this wallet only pays the fees, and everything can only go to the heir.'));
  if (!(await confirm(\`Send \${plan.transactions.length} transaction(s)?\`, g.yes))) return 1;
  await sendAndReport(ctx, plan.transactions, [payer], 'inherit');
  return 0;
}

// ---------- status ----------

export async function cmdStatus(g: GlobalOpts): Promise<number> {
  const ctx = await connectCluster(g.cluster);
  const vault = await resolveVault(ctx, g, g.vault ? undefined : await loadSeed(g));
  out(pc.bold('Vault'));
  kv('cluster', \`\${ctx.cluster} (\${ctx.url})\`);
  kv('wallet (address)', vault.wallet.toBase58());
  kv('state', vault.state.toBase58());
  kv('key epoch', String(vault.rootEpoch));
  kv('next leaf', String(vault.nextLeaf));
  kv('leaves left', \`\${vault.leavesLeft} / \${vault.treeSize}\`);
  kv('executed', vault.executedCount.toString());
  kv('cosigner', vault.cosigner ? vault.cosigner.toBase58() : 'none');
  kv('created slot', vault.createdSlot.toString());
  if (vault.leavesLeft < LOW_LEAVES_WARNING) warn('few one-time signatures left: run \`bunker rotate\`');

  const assets = await fetchAssets(ctx.conn, vault.wallet);
  out();
  out(pc.bold('Assets'));
  for (const a of assets) {
    const name = a.kind === 'sol' ? 'SOL' : sanitizeTokenSymbol(a.symbol) || sanitizeTokenName(a.name) || shortAddress(a.mint as PublicKey);
    const flags = a.risks.map((r) => (r.severity === 'danger' ? pc.red(r.label) : r.severity === 'warn' ? pc.yellow(r.label) : pc.dim(r.label)));
    const extra = [a.kind === 'nft' ? 'NFT' : '', a.mint ? pc.dim(a.mint.toBase58()) : '', ...flags].filter(Boolean).join('  ');
    out(\`  \${formatAmount(a.amount, a.decimals).padStart(22)} \${name.padEnd(10)} \${extra}\`);
    if (!a.supported && a.unsupportedReason) out(\`  \${''.padStart(22)} \${pc.yellow(a.unsupportedReason)}\`);
  }

  const ledger = openLedger(g);
  const mine = ledger.list(vault.state).filter((e) => e.epoch === vault.rootEpoch);
  const pending = mine.filter((e) => e.leaf >= vault.nextLeaf);
  out();
  out(pc.bold('Local leaf ledger'));
  kv('ledger file', ledger.path);
  kv('used this epoch', String(mine.length));
  if (pending.length > 0) {
    for (const e of pending) {
      warn(
        \`leaf \${e.leaf} was signed but has not landed. Anyone holding its signature can still execute it until a later leaf \` +
          'executes or the key rotates; signing again does NOT cancel it (both can execute). Finish it with ' +
          \`\\\`bunker rebroadcast --leaf \${e.leaf}\${g.vault ? \` --vault \${g.vault}\` : ''}\\\`\`,
      );
    }
  }
  return 0;
}
`;export{e as default};