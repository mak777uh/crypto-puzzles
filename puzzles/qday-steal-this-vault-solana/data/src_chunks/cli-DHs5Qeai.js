var e=`/**
 * Derive the Bunker Canary address from seed files.
 *
 *   npm run derive                       # every seeds/*.txt (PENDING seeds are reported, not derived)
 *   npm run derive -- seeds/devnet.txt   # one seed; exits 2 if its anchor is PENDING
 *   npm run derive -- --json seeds/devnet.txt
 */
import { relative } from 'node:path';
import { parseArgs } from 'node:util';
import { deriveCanary, formatHeight, PendingAnchorError } from './derive.ts';
import { CANARY_ROOT, listSeedFiles, readSeedFile } from './seedfile.ts';

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: { json: { type: 'boolean', default: false }, help: { type: 'boolean', short: 'h', default: false } },
});

if (values.help) {
  console.log('usage: npm run derive -- [--json] [SEED_FILE ...]');
  process.exit(0);
}

const explicit = positionals.length > 0;
const files = explicit ? positionals : listSeedFiles();
const results: Record<string, unknown>[] = [];
let anyError = false;
let anyPending = false;

for (const file of files) {
  const display = relative(CANARY_ROOT, file) || file;
  try {
    const seed = readSeedFile(file);
    const base = {
      seedFile: display,
      seedSha256: seed.sha256,
      network: seed.info.network,
      anchorHeight: seed.info.anchorHeight,
    };
    if (seed.info.pending) {
      anyPending = true;
      results.push({
        ...base,
        status: 'pending',
        message: \`anchor bitcoin block \${formatHeight(seed.info.anchorHeight)} hash is PENDING: derivation refused\`,
      });
      continue;
    }
    results.push({ ...base, status: 'ok', ...deriveCanary(seed.bytes) });
  } catch (err) {
    if (err instanceof PendingAnchorError) anyPending = true;
    else anyError = true;
    results.push({ seedFile: display, status: 'error', error: (err as Error).message });
  }
}

if (values.json) {
  console.log(JSON.stringify(results.length === 1 ? results[0] : results, null, 2));
} else {
  for (const r of results) {
    if (r.status === 'ok') console.log(\`\${r.network}: \${r.address}  (\${r.seedFile})\`);
    else if (r.status === 'pending') console.log(\`\${r.network}: PENDING  (\${r.seedFile}; \${r.message})\`);
    else console.error(\`\${r.seedFile}: ERROR \${r.error}\`);
  }
}

// Asking explicitly for a PENDING seed is a refusal (exit 2); listing all seeds is not.
process.exit(anyError ? 1 : explicit && anyPending ? 2 : 0);
`;export{e as default};