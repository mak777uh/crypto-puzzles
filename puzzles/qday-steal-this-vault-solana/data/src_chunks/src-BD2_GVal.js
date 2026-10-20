var e=`// bunker: command-line client for Bunker (beta).
import { Command, Option } from 'commander';
import pc from 'picocolors';
import { MainnetDisabledError, PendingSignatureError } from '@bunker/sdk';
import type { GlobalOpts } from './config';
import { expandHome } from './config';
import { readActionsFile } from './actions-file';
import type { ActionSpec } from './actions-file';
import { cmdClose, cmdDeposit, cmdExecute, cmdHeirShow, cmdInherit, cmdKeygen, cmdOpen, cmdRebroadcast, cmdRotate, cmdStatus } from './commands';
import { err } from './ui';

export function buildProgram(run: (p: Promise<number>) => Promise<void>): Command {
  const program = new Command()
    .name('bunker')
    .description('Bunker: bunker mode for Solana, a post-AI DeFi platform. Post-AI, post-quantum vaults whose signatures (LMS) rest on SHA-256 alone. Beta: SOL deposits capped at 10 SOL per vault.')
    .option('--cluster <cluster>', 'mainnet | devnet | localnet | <rpc url> (env BUNKER_CLUSTER; default devnet). For mainnet prefer your own RPC URL: the public one rate-limits')
    .option('--keypair <file>', 'fee-payer keypair JSON (env BUNKER_KEYPAIR; default ~/.config/solana/id.json). It pays fees and never controls the vault')
    .option('--seed-file <file>', 'file holding the 24-word vault seed (env BUNKER_SEED_FILE). Never passed as an argument')
    .option('--vault <address>', 'vault state (or wallet) address; default: the vault opened from --seed-file')
    .option('--cosigner <pubkey>', 'hybrid-mode cosigner used when the vault was opened (for address derivation)')
    .option('--cosigner-keypair <file>', 'cosigner keypair, for hybrid-mode vaults')
    .option('--ledger <file>', 'leaf ledger (env BUNKER_LEDGER; default ~/.bunker/ledger.json)')
    .option('-y, --yes', 'do not ask for confirmation')
    .option('--abandon-pending', 'sign even though an earlier signature of this key has not landed (it can still go through; prefer \`rebroadcast\`)')
    .option('--v1', 'send/rotate/close/rebroadcast: put the signature inline in ONE v1 (4,096-byte) transaction instead of the signature-buffer path')
    .showHelpAfterError();

  const g = (cmd: Command): GlobalOpts => cmd.optsWithGlobals() as GlobalOpts;

  program
    .command('keygen')
    .description('generate a fresh 24-word vault seed (printed once)')
    .option('--out <file>', 'also write it to <file> with mode 0600 (refuses to overwrite)')
    .option('--force', 'overwrite --out if it exists')
    .option('--no-print', 'do not print the words (requires --out)')
    .action((o: { out?: string; force?: boolean; print: boolean }) => run(cmdKeygen(o)));

  program
    .command('open')
    .description('open a vault for the seed (epoch-0 key) and print its address')
    .action((_o, cmd: Command) => run(cmdOpen(g(cmd))));

  const deposit = program.command('deposit').description('deposit SOL or a token into the vault (fee payer = depositor)');
  deposit
    .command('sol <amount>')
    .description('deposit SOL (amount in SOL)')
    .option('--raw', 'amount is in lamports')
    .action((amount: string, o: { raw?: boolean }, cmd: Command) => run(cmdDeposit(g(cmd), { kind: 'sol' }, amount, o)));
  deposit
    .command('token <mint> <amount>')
    .description("deposit an SPL / Token-2022 token from the fee payer's ATA (amount in UI units)")
    .option('--raw', 'amount is in base units')
    .action((mint: string, amount: string, o: { raw?: boolean }, cmd: Command) => run(cmdDeposit(g(cmd), { kind: 'token', mint }, amount, o)));

  // \`send\` was \`execute\` (and the app's Withdraw): the old name keeps working as an alias.
  const execute = program
    .command('send')
    .alias('execute')
    .summary('send SOL, tokens or NFTs to one or several addresses with one one-time signature')
    .description(
      'send SOL, tokens or NFTs from the vault to any address, another Bunker vault included, with one one-time signature (one leaf).\\n' +
        'Use a subcommand for one recipient, or --actions-file for several under the same signature (up to 8 actions; fewer for tokens)',
    )
    .option(
      '--actions-file <file>',
      'JSON array: {kind:"sol",to,amount} | {kind:"token",mint,to,amount} | {kind:"close-account",mint,rentTo?} | {kind:"set-heir",heir,days} | {kind:"check-in"} | {kind:"clear-heir"} (UI amounts; lamports/rawAmount for base units; at most one heir action)',
    )
    .option('--no-create-ata', "do not create missing destination token accounts")
    .action((o: { actionsFile?: string; createAta: boolean }, cmd: Command) => {
      if (!o.actionsFile) {
        cmd.help({ error: true });
        return;
      }
      return run(cmdExecute(g(cmd), readActionsFile(expandHome(o.actionsFile)), { createAta: o.createAta }));
    });
  execute
    .command('sol <to> <amount>')
    .description('send SOL from the vault (amount in SOL)')
    .option('--raw', 'amount is in lamports')
    .action((to: string, amount: string, o: { raw?: boolean }, cmd: Command) => {
      const spec: ActionSpec = o.raw ? { kind: 'sol', to, lamports: amount } : { kind: 'sol', to, amount };
      return run(cmdExecute(g(cmd), [spec], { createAta: true }));
    });
  execute
    .command('token <mint> <to> <amount>')
    .description("send tokens from the vault to <to>'s associated token account (created if missing; <to> may be another vault)")
    .option('--raw', 'amount is in base units')
    .option('--to-token-account', '<to> is a token account, not a wallet')
    .option('--no-create-ata', 'fail instead of creating the destination ATA')
    .action((mint: string, to: string, amount: string, o: { raw?: boolean; toTokenAccount?: boolean; createAta: boolean }, cmd: Command) => {
      const spec: ActionSpec = {
        kind: 'token',
        mint,
        ...(o.toTokenAccount ? { toTokenAccount: to } : { to }),
        ...(o.raw ? { rawAmount: amount } : { amount }),
      };
      return run(cmdExecute(g(cmd), [spec], { createAta: o.createAta }));
    });
  execute
    .command('close-account <mint>')
    .description("close the vault's (empty) token account for <mint> and reclaim its rent")
    .option('--rent-to <pubkey>', 'rent recipient (default: fee payer)')
    .action((mint: string, o: { rentTo?: string }, cmd: Command) => {
      return run(cmdExecute(g(cmd), [{ kind: 'close-account', mint, ...(o.rentTo ? { rentTo: o.rentTo } : {}) }], { createAta: false }));
    });

  program
    .command('rotate')
    .description('move the vault to its next key epoch (same seed, or a new one)')
    .option('--new-seed-file <file>', 'rotate to a key from a different (fresh) seed')
    .action((o: { newSeedFile?: string }, cmd: Command) => run(cmdRotate(g(cmd), o)));

  program
    .command('close')
    .description('close an empty vault forever (state becomes a tombstone)')
    .option('--rent-to <pubkey>', 'rent recipient (default: fee payer)')
    .option(
      '--abandon-token-account <pubkey>',
      'an issuer-frozen token account to abandon (repeat for each); closing refuses until every frozen one is listed',
      (v: string, acc: string[] = []) => [...acc, v],
    )
    .action((o: { rentTo?: string; abandonTokenAccount?: string[] }, cmd: Command) => run(cmdClose(g(cmd), o)));

  // Legacy: an heir who can inherit everything if the owner stops checking in.
  const heir = program
    .command('heir')
    .summary('Legacy: name an heir who inherits the vault if you stop checking in')
    .description(
      'Legacy: name an heir. If the vault goes the chosen number of days without a check-in, anyone can move everything in it\\n' +
        'to the heir (\`bunker inherit\`), and the vault\\'s key can never sign again. Naming, checking in and removing take one\\n' +
        'hash-key signature each (and the cosigner in hybrid mode).',
    );
  heir
    .command('show')
    .description("the vault's heir, countdown and deadline")
    .action((_o, cmd: Command) => run(cmdHeirShow(g(cmd))));
  heir
    .command('set <address>')
    .description('make <address> the heir (a wallet, or better the heir\\'s own Bunker vault address); restarts the countdown')
    .option('--days <n>', 'days without a check-in before the heir can inherit (30 to 3650)', '365')
    .action((address: string, o: { days: string }, cmd: Command) => run(cmdExecute(g(cmd), [{ kind: 'set-heir', heir: address, days: o.days }], { createAta: false })));
  heir
    .command('check-in')
    .description("restart the heir's countdown")
    .action((_o, cmd: Command) => run(cmdExecute(g(cmd), [{ kind: 'check-in' }], { createAta: false })));
  heir
    .command('clear')
    .description("remove the heir (the record's rent goes back to the vault)")
    .action((_o, cmd: Command) => run(cmdExecute(g(cmd), [{ kind: 'clear-heir' }], { createAta: false })));

  program
    .command('inherit')
    .description(
      "after the heir's deadline, move everything in --vault to its heir. No vault seed and no signature: this wallet only pays\\n" +
        "the fees and the rent of the heir's new token accounts, and nothing can go anywhere but to the heir",
    )
    .action((_o, cmd: Command) => run(cmdInherit(g(cmd))));

  program
    .command('status')
    .description('vault state, assets, key epoch, leaves left and pending ledger entries')
    .action((_o, cmd: Command) => run(cmdStatus(g(cmd))));

  program
    .command('rebroadcast')
    .description('resend the recorded signature of a spent leaf (never re-signs)')
    .addOption(new Option('--leaf <n>', 'leaf index').makeOptionMandatory())
    .option('--epoch <n>', 'key epoch (default: current)')
    .option('--no-create-ata', 'do not create missing destination token accounts')
    .action((o: { leaf: string; epoch?: string; createAta: boolean }, cmd: Command) => run(cmdRebroadcast(g(cmd), o)));

  return program;
}

/** Run the CLI; resolves to the process exit code. */
export async function main(argv: string[]): Promise<number> {
  let exitCode = 0;
  const program = buildProgram(async (p) => {
    exitCode = await p;
  });
  // Every command, not just the root: commander copies exitOverride only into commands created after
  // it is set, so \`bunker send --help\` would otherwise exit the process instead of returning 0.
  const overrideExit = (c: Command): void => {
    c.exitOverride();
    c.commands.forEach(overrideExit);
  };
  overrideExit(program);
  try {
    await program.parseAsync(argv);
    return exitCode;
  } catch (e) {
    const code = (e as { code?: string; exitCode?: number }).code;
    if (typeof code === 'string' && code.startsWith('commander.')) return (e as { exitCode?: number }).exitCode ?? 1;
    if (e instanceof MainnetDisabledError) {
      err(pc.red(\`error: \${e.message}\`));
      return 2;
    }
    if (e instanceof PendingSignatureError) {
      err(pc.red(\`error: \${e.message}\`));
      for (const p of e.pending) {
        err(\`  leaf \${p.leafIndex} (epoch \${p.rootEpoch})\${p.summary ? \`: \${p.summary}\` : ' (seen on chain; no local record)'}\`);
      }
      const finishable = e.pending.find((p) => p.canFinish);
      if (finishable) err(\`  finish it:   bunker rebroadcast --leaf \${finishable.leafIndex}\`);
      err('  or sign anyway with --abandon-pending (the earlier signature can still go through)');
      return 3;
    }
    err(pc.red(\`error: \${(e as Error).message}\`));
    if (process.env.BUNKER_DEBUG) err(String((e as Error).stack));
    return 1;
  }
}
`;export{e as default};