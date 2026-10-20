// Human action specs (CLI subcommands and --actions-file) → SDK VaultActions.
//
// --actions-file JSON: an array of
//   {"kind":"sol","to":"<wallet>","amount":"1.5"}                      (or "lamports":"1500000000")
//   {"kind":"token","mint":"<mint>","to":"<owner wallet>","amount":"10"} (destination = owner's ATA, created if missing)
//   {"kind":"token","mint":"<mint>","toTokenAccount":"<token account>","rawAmount":"10000000"}
//   {"kind":"close-account","mint":"<mint>","rentTo":"<wallet>"}       (rentTo defaults to the fee payer)
//   {"kind":"set-heir","heir":"<wallet or vault address>","days":365}  (Legacy: 30..3650 days)
//   {"kind":"check-in"}                                                 (heir and days default to the vault's record)
//   {"kind":"clear-heir"}                                               (heir defaults to the vault's record)
// Amounts are UI units (decimals from the mint); rawAmount / lamports are base units.
// At most one heir action (set-heir, check-in, clear-heir) per signature.

import { readFileSync } from 'node:fs';
import type { Connection, PublicKey } from '@solana/web3.js';
import { HEIR_MAX_DAYS, HEIR_MIN_DAYS, ataOf, fetchHeir, fetchMintClassifications, isValidInactivityDays, parseAmount } from '@bunker/sdk';
import type { MintClassification, VaultAction } from '@bunker/sdk';
import { parsePubkey } from './config';
import { parseJsonFile } from './json-file';

export type ActionSpec =
  | { kind: 'sol'; to: string; amount?: string; lamports?: string }
  | { kind: 'token'; mint: string; to?: string; toTokenAccount?: string; amount?: string; rawAmount?: string }
  | { kind: 'close-account'; mint: string; rentTo?: string }
  | { kind: 'set-heir'; heir: string; days: number | string }
  | { kind: 'check-in'; heir?: string; days?: number | string }
  | { kind: 'clear-heir'; heir?: string };

const KINDS = ['sol', 'token', 'close-account', 'set-heir', 'check-in', 'clear-heir'];

export function readActionsFile(path: string): ActionSpec[] {
  let raw: string;
  try {
    raw = readFileSync(path, 'utf8');
  } catch (e) {
    throw new Error(`cannot read actions file ${path}: ${(e as NodeJS.ErrnoException).code ?? 'error'}`);
  }
  // A fixed message: the parser's own would quote the file (think: the seed file passed by mistake).
  const parsed = parseJsonFile(raw, `${path} is not valid JSON`);
  if (!Array.isArray(parsed) || parsed.length === 0) throw new Error(`${path}: expected a non-empty JSON array of actions`);
  return parsed.map((a, i) => {
    if (typeof a !== 'object' || a === null || typeof (a as { kind?: unknown }).kind !== 'string') {
      throw new Error(`${path}[${i}]: each action needs a "kind"`);
    }
    const kind = (a as { kind: string }).kind;
    if (!KINDS.includes(kind)) throw new Error(`${path}[${i}]: unknown kind (use ${KINDS.map((k) => `"${k}"`).join(', ')})`);
    return a as ActionSpec;
  });
}

function rawOrUi(raw: string | undefined, ui: string | undefined, decimals: number, what: string): bigint {
  if (raw !== undefined) {
    if (!/^\d+$/.test(raw)) throw new Error(`${what}: base-unit amount must be an integer`);
    return BigInt(raw);
  }
  if (ui === undefined) throw new Error(`${what}: amount is required`);
  return parseAmount(ui, decimals);
}

function parseDays(v: number | string | undefined, what: string): number {
  const n = typeof v === 'string' && /^\d+$/.test(v) ? Number(v) : v;
  if (typeof n !== 'number' || !isValidInactivityDays(n)) throw new Error(`${what}: days must be a whole number from ${HEIR_MIN_DAYS} to ${HEIR_MAX_DAYS}`);
  return n;
}

/**
 * Resolve specs against the chain (token program + decimals of each mint; for check-in and
 * clear-heir without an explicit heir/days, the vault's heir record, so pass `vaultState`).
 */
export async function resolveActions(conn: Connection, specs: ActionSpec[], rentToDefault: PublicKey, opts: { vaultState?: PublicKey } = {}): Promise<VaultAction[]> {
  const mints = specs.flatMap((s) => (s.kind === 'token' || s.kind === 'close-account' ? [parsePubkey(s.mint, 'mint')] : []));
  const needsRecord = specs.some((s) => (s.kind === 'check-in' && (s.heir === undefined || s.days === undefined)) || (s.kind === 'clear-heir' && s.heir === undefined));
  const record = needsRecord ? (opts.vaultState ? await fetchHeir(conn, opts.vaultState) : null) : null;
  if (needsRecord && !record) throw new Error('this vault has no heir: name one first (set-heir), or give "heir" and "days" explicitly');
  const cls = await fetchMintClassifications(conn, mints);
  const mintOf = (m: string): MintClassification => {
    const c = cls.get(parsePubkey(m, 'mint').toBase58());
    if (!c) throw new Error(`mint ${m} not found`);
    return c;
  };
  return specs.map((s, i): VaultAction => {
    const what = `action ${i + 1}`;
    switch (s.kind) {
      case 'sol': {
        const lamports = rawOrUi(s.lamports, s.amount, 9, what);
        return { kind: 'transferSol', to: parsePubkey(s.to, `${what} to`), lamports };
      }
      case 'token': {
        const c = mintOf(s.mint);
        const amount = rawOrUi(s.rawAmount, s.amount, c.decimals, what);
        if (s.toTokenAccount) {
          return { kind: 'transferToken', mint: c.mint, tokenProgram: c.tokenProgram, destination: parsePubkey(s.toTokenAccount, `${what} toTokenAccount`), amount };
        }
        if (!s.to) throw new Error(`${what}: "to" (owner wallet) or "toTokenAccount" is required`);
        const owner = parsePubkey(s.to, `${what} to`);
        return { kind: 'transferToken', mint: c.mint, tokenProgram: c.tokenProgram, destination: ataOf(owner, c.mint, c.tokenProgram), amount, destinationOwner: owner };
      }
      case 'close-account': {
        const c = mintOf(s.mint);
        return { kind: 'closeTokenAccount', mint: c.mint, tokenProgram: c.tokenProgram, rentTo: s.rentTo ? parsePubkey(s.rentTo, `${what} rentTo`) : rentToDefault };
      }
      case 'set-heir':
        return { kind: 'setHeir', heir: parsePubkey(s.heir, `${what} heir`), inactivityDays: parseDays(s.days, what) };
      case 'check-in':
        return {
          kind: 'checkIn',
          heir: s.heir !== undefined ? parsePubkey(s.heir, `${what} heir`) : record!.heir,
          inactivityDays: s.days !== undefined ? parseDays(s.days, what) : record!.inactivityDays,
        };
      case 'clear-heir':
        return { kind: 'clearHeir', heir: s.heir !== undefined ? parsePubkey(s.heir, `${what} heir`) : record!.heir };
    }
  });
}
