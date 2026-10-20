var e=`// deriveRoot binds every LMS key to its deployment and vault (MESSAGE_FORMAT §2): one seed never
// hands the same one-time key to two vaults.
import { beforeAll, describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { PublicKey } from '@solana/web3.js';
import { initWasm } from '../src/wasm';
import { deriveRoot, keyBinding, normalizeMnemonic, validateMnemonic, vaultFromSeed, vaultKeyContext } from '../src/keys';
import type { KeyContext } from '../src/keys';
import { computeVaultId, encodeOptions } from '../src/addresses';
import { lmsKeyId } from '../src/ledger';
import { toHex } from '../src/bytes';
import { PROGRAM_ID } from '../src/constants';
import type { ClusterName } from '../src/constants';

const keys = JSON.parse(readFileSync(new URL('../../../crates/bunker-core/vectors/keys.json', import.meta.url), 'utf8')) as {
  mnemonic: string;
  epochs: { name: string; root: string }[];
  generate_mnemonic: { mnemonic: string }[];
};
const M = keys.mnemonic;
const golden = (name: string): string => {
  const e = keys.epochs.find((x) => x.name.startsWith(name));
  if (!e) throw new Error(\`no golden key vector "\${name}"\`);
  return e.root;
};
const COSIGNER = new PublicKey('3d9VHaos5t6ozV113FpvVvL5pb9NYfTcdi2toLtwdmnk');

/** Root and LMS identity I must both differ: two vaults never share a one-time key. */
function expectDistinctKeys(a: Uint8Array, b: Uint8Array): void {
  expect(toHex(a)).not.toBe(toHex(b));
  expect(lmsKeyId(a)).not.toBe(lmsKeyId(b));
}

beforeAll(async () => {
  await initWasm();
});

describe('deriveRoot: the key is bound to the vault', () => {
  it('(a) epoch 0: a vault with a cosigner gets a different key than one without', async () => {
    const none = await deriveRoot(M, 0, { cluster: 'localnet' });
    const explicitNone = await deriveRoot(M, 0, { cluster: 'localnet', cosigner: null });
    const withCosigner = await deriveRoot(M, 0, { cluster: 'localnet', cosigner: COSIGNER });
    expect(toHex(explicitNone)).toBe(toHex(none));
    expectDistinctKeys(none, withCosigner);
    expect(toHex(none)).toBe(golden('localnet, no cosigner, epoch 0'));
    expect(toHex(withCosigner)).toBe(golden('localnet, with cosigner, epoch 0'));
    // ... so the two vaults the seed can open also have different vault ids
    expect(toHex(computeVaultId(none, null))).not.toBe(toHex(computeVaultId(withCosigner, COSIGNER)));
  });

  it('(b) the cluster is part of the key: devnet vs mainnet (and localnet)', async () => {
    const devnet = await deriveRoot(M, 0, { cluster: 'devnet' });
    const mainnet = await deriveRoot(M, 0, { cluster: 'mainnet-beta' });
    const localnet = await deriveRoot(M, 0, { cluster: 'localnet' });
    expectDistinctKeys(devnet, mainnet);
    expectDistinctKeys(devnet, localnet);
    expectDistinctKeys(mainnet, localnet);
    expect(toHex(devnet)).toBe(golden('devnet, no cosigner, epoch 0'));
    expect(toHex(mainnet)).toBe(golden('mainnet, no cosigner, epoch 0'));
  });

  it('(c) epoch ≥ 1: a different vault id gives a different key', async () => {
    const vaultA = computeVaultId(await deriveRoot(M, 0, { cluster: 'localnet' }), null);
    const vaultB = computeVaultId(await deriveRoot(M, 0, { cluster: 'localnet', cosigner: COSIGNER }), COSIGNER);
    const a1 = await deriveRoot(M, 1, { cluster: 'localnet', vaultId: vaultA });
    const b1 = await deriveRoot(M, 1, { cluster: 'localnet', vaultId: vaultB });
    expectDistinctKeys(a1, b1);
    expect(toHex(a1)).toBe(golden('localnet, no cosigner, epoch 1'));
    // a single flipped bit of the vault id is another key too
    const flipped = vaultA.slice();
    flipped[31] = (flipped[31] as number) ^ 1;
    expectDistinctKeys(a1, await deriveRoot(M, 1, { cluster: 'localnet', vaultId: flipped }));
    // and the epoch is part of the key
    expectDistinctKeys(a1, await deriveRoot(M, 2, { cluster: 'localnet', vaultId: vaultA }));
  });

  it('the program id is part of the key (default PROGRAM_ID)', async () => {
    const dflt = await deriveRoot(M, 0, { cluster: 'devnet' });
    expect(toHex(await deriveRoot(M, 0, { cluster: 'devnet', programId: PROGRAM_ID }))).toBe(toHex(dflt));
    expectDistinctKeys(dflt, await deriveRoot(M, 0, { cluster: 'devnet', programId: COSIGNER }));
  });

  it('rotating to a new seed derives that seed’s key for THIS vault (bound to its vault id)', async () => {
    const other = keys.generate_mnemonic.map((g) => g.mnemonic).find((m) => m !== M)!; // another valid (public test) seed
    const vault = await vaultFromSeed(M, { cluster: 'devnet' });
    const otherVault = await vaultFromSeed(other, { cluster: 'devnet' });
    const rotated = await deriveRoot(other, 1, vaultKeyContext({ vaultId: vault.vaultId, cosigner: null }, 1, 'devnet'));
    // never the key of the vault the new seed opens itself, nor of that vault's own next epoch
    expectDistinctKeys(rotated, otherVault.root);
    expectDistinctKeys(rotated, await deriveRoot(other, 1, { cluster: 'devnet', vaultId: otherVault.vaultId }));
  });
});

describe('deriveRoot: the wrong binding is a clear error (thrown before any derivation)', () => {
  const vid = new Uint8Array(32).fill(7);
  const cases: Array<[string, number, KeyContext, RegExp]> = [
    ['a vault id at epoch 0', 0, { cluster: 'devnet', vaultId: vid }, /epoch-0 key is bound to the vault options/],
    ['a vault id and a cosigner at epoch 0', 0, { cluster: 'devnet', cosigner: COSIGNER, vaultId: vid }, /epoch-0 key is bound to the vault options/],
    ['no vault id at epoch 1', 1, { cluster: 'devnet' }, /32-byte vault id; pass \\{ cluster, vaultId \\} \\(got no vaultId\\)/],
    ['a cosigner at epoch 1', 1, { cluster: 'devnet', cosigner: COSIGNER, vaultId: vid }, /cosigner only binds the epoch-0 key/],
    ['cosigner: null at epoch 3', 3, { cluster: 'devnet', cosigner: null, vaultId: vid }, /cosigner only binds the epoch-0 key/],
    ['a 31-byte vault id', 2, { cluster: 'devnet', vaultId: vid.subarray(1) }, /got 31 bytes/],
    ['options instead of a vault id', 1, { cluster: 'devnet', vaultId: encodeOptions(null) }, /got 2 bytes/],
  ];
  for (const [name, epoch, ctx, re] of cases) {
    it(name, async () => {
      expect(() => keyBinding(epoch, ctx)).toThrow(re);
      await expect(deriveRoot(M, epoch, ctx)).rejects.toThrow(re);
    });
  }

  it('an unknown cluster or program id', async () => {
    await expect(deriveRoot(M, 0, { cluster: 'testnet' as ClusterName })).rejects.toThrow(/unknown cluster "testnet"/);
    await expect(deriveRoot(M, 0, { cluster: 'devnet', programId: 'x' as unknown as PublicKey })).rejects.toThrow(/programId must be a PublicKey/);
    await expect(deriveRoot(M, 0, { cluster: 'devnet', cosigner: COSIGNER.toBase58() as unknown as PublicKey })).rejects.toThrow(/cosigner must be a PublicKey/);
  });

  it('a 2-argument call (no key context) fails loudly', async () => {
    const legacy = deriveRoot as unknown as (m: string, e: number) => Promise<Uint8Array>;
    await expect(legacy(M, 0)).rejects.toThrow(/Missing key context/);
  });

  it('epochs must be u32 integers', async () => {
    for (const bad of [-1, 0.5, Number.NaN, Number.POSITIVE_INFINITY, 2 ** 32]) {
      await expect(deriveRoot(M, bad, { cluster: 'devnet' })).rejects.toThrow(/key epoch must be an integer/);
    }
  });

  it('an invalid seed is refused', async () => {
    await expect(deriveRoot('not a seed', 0, { cluster: 'devnet' })).rejects.toThrow(/Invalid vault seed/);
  });
});

describe('vaultKeyContext / keyBinding', () => {
  const vaultId = new Uint8Array(32).fill(9);
  it('epoch 0 binds the options (cosigner), later epochs the vault id', () => {
    expect(vaultKeyContext({ vaultId, cosigner: COSIGNER }, 0, 'devnet')).toEqual({ cluster: 'devnet', programId: PROGRAM_ID, cosigner: COSIGNER });
    expect(vaultKeyContext({ vaultId, cosigner: COSIGNER }, 5, 'devnet')).toEqual({ cluster: 'devnet', programId: PROGRAM_ID, vaultId });
    expect(toHex(keyBinding(0, vaultKeyContext({ vaultId, cosigner: COSIGNER }, 0, 'devnet')))).toBe(toHex(encodeOptions(COSIGNER)));
    expect(toHex(keyBinding(0, vaultKeyContext({ vaultId, cosigner: null }, 0, 'devnet')))).toBe('0100');
    expect(toHex(keyBinding(1, vaultKeyContext({ vaultId, cosigner: COSIGNER }, 1, 'devnet')))).toBe(toHex(vaultId));
  });
  it('keyBinding returns a copy', () => {
    const b = keyBinding(1, { cluster: 'devnet', vaultId });
    b[0] = 0;
    expect(vaultId[0]).toBe(9);
  });
});

describe('mnemonic input hygiene', () => {
  it('treats zero-width characters as spaces and keeps non-ASCII away from the WASM', async () => {
    await initWasm();
    const words = keys.mnemonic.split(' ');
    const pasted = \`﻿\${words.slice(0, 12).join(' ')}​\${words.slice(12).join('\xA0')} \`;
    expect(normalizeMnemonic(pasted)).toBe(keys.mnemonic);
    expect(validateMnemonic(pasted)).toBe(true);
    // A smart quote, an accented letter or a Cyrillic look-alike is never a valid English phrase.
    for (const bad of [keys.mnemonic.replace('a', 'á'), keys.mnemonic + ' ’', keys.mnemonic.replace('a', 'а')]) {
      expect(validateMnemonic(bad)).toBe(false);
      await expect(deriveRoot(bad, 0, { cluster: 'localnet', cosigner: null })).rejects.toThrow(/letters a–z/);
    }
  });
});
`;export{e as default};