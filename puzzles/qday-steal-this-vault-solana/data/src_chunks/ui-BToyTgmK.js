var e=`import { createInterface } from 'node:readline/promises';
import pc from 'picocolors';

export const out = (s = ''): void => {
  process.stdout.write(\`\${s}\\n\`);
};
export const err = (s = ''): void => {
  process.stderr.write(\`\${s}\\n\`);
};
export const warn = (s: string): void => err(pc.yellow(\`warning: \${s}\`));
export const kv = (k: string, v: string): void => out(\`  \${pc.dim(k.padEnd(18))} \${v}\`);

/** Ask for confirmation unless --yes. Refuses (false) on a non-interactive stdin without --yes. */
export async function confirm(question: string, yes: boolean | undefined): Promise<boolean> {
  if (yes) return true;
  if (!process.stdin.isTTY) {
    err(pc.red('refusing to continue without confirmation on a non-interactive terminal (pass --yes)'));
    return false;
  }
  const rl = createInterface({ input: process.stdin, output: process.stderr });
  try {
    const a = (await rl.question(\`\${question} \${pc.dim('[y/N]')} \`)).trim().toLowerCase();
    return a === 'y' || a === 'yes';
  } finally {
    rl.close();
  }
}

export function box(lines: string[], color: (s: string) => string = pc.red): string {
  const w = Math.max(...lines.map((l) => l.length));
  const bar = color(\`+\${'-'.repeat(w + 2)}+\`);
  return [bar, ...lines.map((l) => \`\${color('|')} \${l.padEnd(w)} \${color('|')}\`), bar].join('\\n');
}
`;export{e as default};