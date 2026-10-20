var e=`// Re-records the Jupiter /swap/v2/build fixtures used by swap.test.ts (read-only GET requests).
//
//   npx tsx packages/sdk/test/fixtures/record-jupiter.ts [takerPubkey] [fixtureName]
//
// The vault is the SDK test vault: the golden test mnemonic (crates/bunker-core/vectors), epoch 0,
// localnet, no cosigner. The taker is any public key (no secret is needed to build a route).
import { readFileSync, writeFileSync } from 'node:fs';
import { PublicKey } from '@solana/web3.js';
import { initWasm } from '../../src/wasm';
import { deriveRoot } from '../../src/keys';
import { vaultAddressesFromRoot } from '../../src/addresses';
import { JupiterClient, vaultSwapBuildParams } from '../../src/swap';
import type { SwapAsset } from '../../src/swap';

const DEFAULT_TAKER = 'BWYxXwxZYWtWPL27nKL4jGiuM6aBuR3Ng98z7AjGJBPm';
const USDC = new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v');
const SPL = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');

const keys = JSON.parse(readFileSync(new URL('../../../../crates/bunker-core/vectors/keys.json', import.meta.url), 'utf8')) as { mnemonic: string };
const taker = new PublicKey(process.argv[2] ?? DEFAULT_TAKER);

await initWasm();
const root0 = await deriveRoot(keys.mnemonic, 0, { cluster: 'localnet', cosigner: null });
const { state, wallet } = vaultAddressesFromRoot(root0, null);
const jupiter = new JupiterClient({ apiKey: process.env.JUP_API_KEY ?? null, timeoutMs: 20_000 });

const only = process.argv[3];
const cases: Array<{ name: string; input: SwapAsset; output: SwapAsset; amount: bigint; maxAccounts: number }> = [
  { name: 'jupiter-build-sol-usdc', input: { kind: 'sol' }, output: { kind: 'token', mint: USDC, tokenProgram: SPL }, amount: 100_000_000n, maxAccounts: 64 },
  { name: 'jupiter-build-usdc-sol', input: { kind: 'token', mint: USDC, tokenProgram: SPL }, output: { kind: 'sol' }, amount: 10_000_000n, maxAccounts: 64 },
];
for (const c of cases.filter((x) => !only || x.name === only)) {
  const params = vaultSwapBuildParams({ vaultWallet: wallet, taker, input: c.input, output: c.output, amount: c.amount, slippageBps: 50, maxAccounts: c.maxAccounts });
  const url = jupiter.buildUrl(params);
  const res = await jupiter.build(params);
  const recorded = { _recorded: { at: new Date().toISOString(), url, vaultState: state.toBase58(), vaultWallet: wallet.toBase58(), taker: taker.toBase58() }, ...res };
  writeFileSync(new URL(\`./\${c.name}.json\`, import.meta.url), JSON.stringify(recorded, null, 2) + '\\n');
  console.log(\`\${c.name}: out \${res.outAmount}, route \${res.routePlan.map((r) => r.swapInfo.label).join(' > ')}\`);
  await new Promise((r) => setTimeout(r, 1500));
}
`;export{e as default};