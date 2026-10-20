import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { Keypair } from '@solana/web3.js';
import type { Connection } from '@solana/web3.js';
import { initWasm } from '../src/wasm';
import { scanRevealedLeaves } from '../src/pending';
import { RATE_LIMIT_DELAYS_MS, RateLimitedError, isRateLimitError, withRateLimitRetry } from '../src/rpcRetry';
import type { VaultInfo } from '../src/state';

const rateLimited = () => new Error('failed to get transactions: 429 Too Many Requests: {"jsonrpc":"2.0","error":{"code":429,"message":"Too many requests for a specific RPC call"}}');
const noSleep = async () => {};

describe('withRateLimitRetry', () => {
  it('recognises the 429 errors web3.js throws, and nothing else', () => {
    expect(isRateLimitError(rateLimited())).toBe(true);
    expect(isRateLimitError(new Error('Server responded with 429 Too Many Requests.  Retrying after 500ms delay...'))).toBe(true);
    expect(isRateLimitError(new Error('failed to get info about account: Invalid param'))).toBe(false);
    expect(isRateLimitError(new Error('blockhash 4290000 not found'))).toBe(false);
  });

  it('retries a rate-limited read with growing pauses and returns its value', async () => {
    const pauses: number[] = [];
    let calls = 0;
    const v = await withRateLimitRetry(
      'the vault history',
      async () => {
        if (++calls <= 3) throw rateLimited();
        return 'ok';
      },
      { sleep: async (ms) => void pauses.push(ms), random: () => 0 },
    );
    expect(v).toBe('ok');
    expect(calls).toBe(4);
    expect(pauses).toEqual(RATE_LIMIT_DELAYS_MS.slice(0, 3));
  });

  it('throws any other error at once', async () => {
    let calls = 0;
    await expect(
      withRateLimitRetry(
        'x',
        async () => {
          calls++;
          throw new Error('Invalid param: WrongSize');
        },
        { sleep: noSleep },
      ),
    ).rejects.toThrow('Invalid param');
    expect(calls).toBe(1);
  });

  it('gives up with a clear error after the last pause', async () => {
    let calls = 0;
    const p = withRateLimitRetry(
      'the vault history',
      async () => {
        calls++;
        throw rateLimited();
      },
      { sleep: noSleep },
    );
    await expect(p).rejects.toThrow(RateLimitedError);
    await expect(p).rejects.toThrow(/Nothing was signed/);
    expect(calls).toBe(RATE_LIMIT_DELAYS_MS.length + 1);
  });
});

describe('the pre-signing history scan on a rate-limited RPC', () => {
  beforeAll(async () => {
    await initWasm();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('reads the history in small batches and rides out a 429 instead of blocking the signature', async () => {
    const sigs = Array.from({ length: 60 }, (_, i) => ({ signature: `s${i}` }));
    const batches: number[] = [];
    let refusals = 1;
    const conn = {
      getSignaturesForAddress: async () => sigs,
      getTransactions: async (list: string[]) => {
        if (refusals-- > 0) throw rateLimited();
        batches.push(list.length);
        return list.map(() => null);
      },
    } as unknown as Connection;
    const vault = { state: Keypair.generate().publicKey, rootEpoch: 0, nextLeaf: 0, currentRoot: new Uint8Array(48) } as unknown as VaultInfo;

    vi.useFakeTimers();
    const scan = scanRevealedLeaves(conn, { cluster: 'localnet', vault });
    await vi.runAllTimersAsync();
    const r = await scan;

    expect(batches).toEqual([25, 25, 10]);
    expect(r).toEqual({ leaves: [], complete: true });
  });
});
