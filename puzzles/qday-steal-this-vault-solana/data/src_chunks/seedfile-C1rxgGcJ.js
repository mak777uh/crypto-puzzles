var e=`/** Node-only helpers for reading seed files byte-for-byte. */
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseSeed, type SeedInfo } from './derive.ts';

/** Absolute path of the canary/ package root. */
export const CANARY_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
export const SEEDS_DIR = join(CANARY_ROOT, 'seeds');

export interface SeedFile {
  path: string;
  /** The exact file bytes (never trimmed or re-encoded). */
  bytes: Uint8Array;
  sha256: string;
  info: SeedInfo;
}

export function readSeedFile(path: string): SeedFile {
  const abs = resolve(path);
  const bytes = new Uint8Array(readFileSync(abs));
  const sha256 = createHash('sha256').update(bytes).digest('hex');
  return { path: abs, bytes, sha256, info: parseSeed(bytes) };
}

/** All seeds/*.txt files, sorted by name. */
export function listSeedFiles(dir: string = SEEDS_DIR): string[] {
  return readdirSync(dir)
    .filter((f) => f.endsWith('.txt'))
    .sort()
    .map((f) => join(dir, f));
}
`;export{e as default};