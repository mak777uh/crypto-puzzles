import { beforeAll, describe, expect, it } from 'vitest';
import { generateMnemonic, initWasm, validateMnemonic } from '../src';

describe('generateMnemonic', () => {
  beforeAll(() => initWasm());

  it('gives every call a fresh, valid 24-word seed', () => {
    const seen = new Set<string>();
    const firstWords = new Set<string>();
    for (let i = 0; i < 5000; i++) {
      const m = generateMnemonic();
      expect(m.split(' ')).toHaveLength(24);
      expect(validateMnemonic(m)).toBe(true);
      seen.add(m);
      firstWords.add(m.split(' ')[0]!);
    }
    // 256 bits of CSPRNG entropy each: any repeat would mean broken randomness.
    expect(seen.size).toBe(5000);
    // And the words themselves vary (not one fixed phrase with a changing checksum word).
    expect(firstWords.size).toBeGreaterThan(1000);
  });
});
