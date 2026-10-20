import { describe, expect, it } from 'vitest';
import { base64 } from '@scure/base';
import { LeafReuseError, LedgerUnreadableError, LocalStorageLedger, MemoryLedger, ledgerKey, lmsKeyId } from '../src/ledger';
import type { KeyValueStorage, LeafLedger } from '../src/ledger';
import { sha256, toHex } from '../src/bytes';
import { pk } from './helpers';

const msg = (s: string) => new TextEncoder().encode(s);
/** A 48-byte LMS root I ‖ T1 whose identifier I is 16 × `i` (and T1 32 × `t`). */
const rootOf = (i: number, t = 0x5a): Uint8Array => Uint8Array.from({ length: 48 }, (_, k) => (k < 16 ? i : t));

class FakeStorage implements KeyValueStorage {
  m = new Map<string, string>();
  getItem(k: string) {
    return this.m.get(k) ?? null;
  }
  setItem(k: string, v: string) {
    this.m.set(k, v);
  }
}

function suite(name: string, make: () => LeafLedger) {
  describe(name, () => {
    it('nextFree is max(chain next_leaf, highest recorded + 1), per (state, epoch)', () => {
      const l = make();
      const s = pk();
      expect(l.nextFree(s, 0, 0)).toBe(0);
      expect(l.nextFree(s, 0, 7)).toBe(7);
      l.markSpent(s, 0, 7, sha256(msg('a')), msg('a'));
      expect(l.nextFree(s, 0, 7)).toBe(8);
      expect(l.nextFree(s, 0, 3)).toBe(8); // never goes below a recorded leaf
      expect(l.nextFree(s, 0, 20)).toBe(20);
      expect(l.nextFree(s, 1, 0)).toBe(0); // other epoch
      expect(l.nextFree(pk(), 0, 0)).toBe(0); // other vault
    });

    it('never binds a leaf to two different messages', () => {
      const l = make();
      const s = pk();
      l.markSpent(s, 2, 5, sha256(msg('send 1 SOL')), msg('send 1 SOL'));
      expect(() => l.markSpent(s, 2, 5, sha256(msg('send 9 SOL')), msg('send 9 SOL'))).toThrow(LeafReuseError);
      // same message is idempotent and can attach the signature
      l.markSpent(s, 2, 5, sha256(msg('send 1 SOL')), msg('send 1 SOL'), { signature: Uint8Array.of(1, 2, 3) });
      const e = l.get(s, 2, 5);
      expect(e?.signature).toBeDefined();
      expect(() =>
        l.markSpent(s, 2, 5, sha256(msg('send 1 SOL')), msg('send 1 SOL'), { signature: Uint8Array.of(9) }),
      ).toThrow(/different signature/);
      // the same leaf number in another epoch is a different key
      l.markSpent(s, 3, 5, sha256(msg('x')), msg('x'));
      expect(l.list(s).map((x) => `${x.epoch}:${x.leaf}`)).toEqual(['2:5', '3:5']);
    });

    it('refuses a second message under the same LMS key identity (I) and leaf, across vaults and epochs', () => {
      const l = make();
      const root = rootOf(0xaa);
      const [a, b, c] = [pk(), pk(), pk()];
      l.markSpent(a, 0, 5, sha256(msg('vault a: send 1 SOL')), msg('vault a: send 1 SOL'), { root });
      expect(l.get(a, 0, 5)?.keyId).toBe(toHex(root.subarray(0, 16)));
      expect(lmsKeyId(root)).toBe('aa'.repeat(16));

      // Misuse: the same one-time key in a second vault (e.g. one seed opened twice under the
      // unbound key derivation) must not sign leaf 5 again, under any state or epoch.
      const other = msg('vault b: send 9 SOL');
      expect(() => l.markSpent(b, 0, 5, sha256(other), other, { root })).toThrow(LeafReuseError);
      expect(() => l.markSpent(b, 0, 5, sha256(other), other, { root })).toThrow(new RegExp(`for vault ${a.toBase58()} \\(epoch 0\\)`));
      expect(() => l.markSpent(b, 4, 5, sha256(other), other, { root })).toThrow(LeafReuseError);
      expect(() => l.markSpent(a, 1, 5, sha256(other), other, { root })).toThrow(LeafReuseError);
      // The identity is I = root[0..16]: the same I with another T1 is still that key.
      expect(() => l.markSpent(c, 0, 5, sha256(other), other, { root: rootOf(0xaa, 0x01) })).toThrow(LeafReuseError);
      expect(() => l.markSpent(c, 0, 5, sha256(other), other, { root: root.subarray(0, 16) })).toThrow(LeafReuseError);
      // Nothing was recorded by the refused calls.
      expect(l.list().map((e) => `${e.state}:${e.epoch}:${e.leaf}`)).toEqual([`${a.toBase58()}:0:5`]);

      // nextFree with the key skips every leaf that key already used, in any vault.
      expect(l.nextFree(b, 0, 0, root)).toBe(6);
      expect(l.nextFree(b, 0, 9, root)).toBe(9);
      expect(l.nextFree(b, 0, 0)).toBe(0); // without the key: per (state, epoch) only
      l.markSpent(b, 0, 6, sha256(other), other, { root }); // the next leaf is fine
      expect(l.nextFree(a, 0, 0, root)).toBe(7);

      // Another key may use leaf 5; re-marking the same message is idempotent (and can add the signature).
      l.markSpent(c, 0, 5, sha256(msg('vault c')), msg('vault c'), { root: rootOf(0xbb) });
      l.markSpent(a, 0, 5, sha256(msg('vault a: send 1 SOL')), msg('vault a: send 1 SOL'), { root, signature: Uint8Array.of(1) });
      expect(l.get(a, 0, 5)?.signature).toBeDefined();
      // A recorded leaf cannot be re-attributed to another key.
      expect(() => l.markSpent(a, 0, 5, sha256(msg('vault a: send 1 SOL')), msg('vault a: send 1 SOL'), { root: rootOf(0xcc) })).toThrow(
        /different one-time key/,
      );
      expect(l.list().length).toBe(3);
    });

    it('rejects a malformed key root', () => {
      const l = make();
      expect(() => l.markSpent(pk(), 0, 0, sha256(msg('m')), msg('m'), { root: new Uint8Array(32) })).toThrow(/48-byte root/);
      expect(() => l.nextFree(pk(), 0, 0, new Uint8Array(47))).toThrow(/48-byte root/);
      expect(l.list()).toEqual([]);
    });
  });
}

suite('MemoryLedger', () => new MemoryLedger());
suite('LocalStorageLedger', () => new LocalStorageLedger(new FakeStorage()));

describe('LocalStorageLedger persistence', () => {
  it('survives a new instance over the same storage', () => {
    const st = new FakeStorage();
    const s = pk();
    new LocalStorageLedger(st).markSpent(s, 0, 0, sha256(msg('m')), msg('m'), { root: rootOf(1) });
    const again = new LocalStorageLedger(st);
    expect(again.nextFree(s, 0, 0)).toBe(1);
    expect(again.nextFree(pk(), 3, 0, rootOf(1))).toBe(1);
    expect(() => again.markSpent(s, 0, 0, sha256(msg('other')), msg('other'))).toThrow(LeafReuseError);
    expect(() => again.markSpent(pk(), 0, 0, sha256(msg('other')), msg('other'), { root: rootOf(1) })).toThrow(LeafReuseError);
  });

  it('reads entries recorded before key identities were tracked, and keeps guarding them', () => {
    const st = new FakeStorage();
    const s = pk();
    const old = msg('old message');
    const legacy = {
      state: s.toBase58(),
      epoch: 0,
      leaf: 3,
      messageHash: toHex(sha256(old)),
      message: base64.encode(old),
      signature: base64.encode(Uint8Array.of(7)),
      createdAt: 1,
    };
    st.setItem('bunker:ledger:v1', JSON.stringify({ version: 1, entries: { [ledgerKey(s.toBase58(), 0, 3)]: legacy } }));
    const l = new LocalStorageLedger(st);
    expect(l.get(s, 0, 3)).toEqual(legacy);
    expect(l.list(s)).toEqual([legacy]);
    expect(l.nextFree(s, 0, 0)).toBe(4);
    expect(l.nextFree(s, 0, 0, rootOf(2))).toBe(4);
    expect(() => l.markSpent(s, 0, 3, sha256(msg('new')), msg('new'), { root: rootOf(2) })).toThrow(LeafReuseError);
    // re-recording the same message attaches the key identity
    l.markSpent(s, 0, 3, sha256(old), old, { root: rootOf(2) });
    expect(l.get(s, 0, 3)).toEqual({ ...legacy, keyId: lmsKeyId(rootOf(2)) });
    // the stored format is unchanged (version 1), so older clients still read it
    expect((JSON.parse(st.getItem('bunker:ledger:v1')!) as { version: number }).version).toBe(1);
  });

  it('refuses to continue when the write does not persist', () => {
    const broken: KeyValueStorage = { getItem: () => null, setItem: () => undefined };
    expect(() => new LocalStorageLedger(broken).markSpent(pk(), 0, 0, sha256(msg('m')), msg('m'))).toThrow(/persist/);
  });
});

describe('LocalStorageLedger fails closed', () => {
  const store = () => {
    const m = new Map<string, string>();
    return { getItem: (k: string) => m.get(k) ?? null, setItem: (k: string, v: string) => void m.set(k, v), removeItem: (k: string) => void m.delete(k), m };
  };

  it('never mistakes corrupt or unknown-version data for an empty ledger, and quarantine keeps the raw data', () => {
    for (const raw of ['{not json', JSON.stringify({ version: 2, entries: {} }), JSON.stringify({ version: 1 }), JSON.stringify([1])]) {
      const s = store();
      s.setItem('bunker:ledger:v1', raw);
      const l = new LocalStorageLedger(s);
      expect(() => l.nextFree(pk(), 0, 0)).toThrow(LedgerUnreadableError);
      expect(() => l.markSpent(pk(), 0, 0, sha256(msg('x')), msg('x'))).toThrow(LedgerUnreadableError);
      const aside = l.quarantine()!;
      expect(s.m.get(aside)).toBe(raw);
      expect(l.nextFree(pk(), 0, 3)).toBe(3);
    }
  });
});
