var e=`/**
 * Patient retries for RPC reads on the signing path. A public RPC answers bursts with HTTP 429, and
 * the history scan that must finish before anything is signed (pending.ts) cannot simply give up:
 * a busy vault would never be able to sign. Only rate-limit errors are retried; anything else is
 * thrown at once.
 */

/** Pauses before each retry (plus up to 50% jitter): about half a minute in total. */
export const RATE_LIMIT_DELAYS_MS = [1_000, 2_000, 4_000, 8_000, 15_000] as const;

/** The RPC kept refusing with 429 after every retry. */
export class RateLimitedError extends Error {
  constructor(what: string) {
    super(
      \`The RPC is rate-limiting requests (HTTP 429) and still refused \${what} after several retries. \` +
        'Nothing was signed. Wait a minute and try again, or use a private RPC endpoint.',
    );
    this.name = 'RateLimitedError';
  }
}

export function isRateLimitError(e: unknown): boolean {
  const msg = e instanceof Error ? e.message : String(e);
  return /\\b429\\b|too many requests|rate.?limit/i.test(msg);
}

export async function withRateLimitRetry<T>(
  what: string,
  fn: () => Promise<T>,
  opts: { delaysMs?: readonly number[]; sleep?: (ms: number) => Promise<void>; random?: () => number } = {},
): Promise<T> {
  const delays = opts.delaysMs ?? RATE_LIMIT_DELAYS_MS;
  const sleep = opts.sleep ?? ((ms: number) => new Promise<void>((r) => setTimeout(r, ms)));
  const random = opts.random ?? Math.random;
  for (let attempt = 0; ; attempt++) {
    try {
      return await fn();
    } catch (e) {
      if (!isRateLimitError(e)) throw e;
      if (attempt >= delays.length) throw new RateLimitedError(what);
      const base = delays[attempt]!;
      await sleep(base + Math.floor(random() * base * 0.5));
    }
  }
}
`;export{e as default};