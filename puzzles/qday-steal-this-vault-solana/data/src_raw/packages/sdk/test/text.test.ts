import { describe, expect, it } from 'vitest';
import {
  TOKEN_NAME_MAX,
  TOKEN_SYMBOL_MAX,
  sanitizeText,
  sanitizeTokenName,
  sanitizeTokenSymbol,
  tokenSummaryLabel,
} from '../src/text';

/** Anything a terminal or the bidi algorithm would act on, and nothing visible. */
const UNSAFE = /[\u0000-\u001f\u007f-\u009f\u00ad\u061c\u200b-\u200f\u202a-\u202e\u2060-\u2064\u2066-\u2069\ufeff]/u;

describe('sanitizeText', () => {
  it('removes bidi embeddings, overrides, isolates and marks', () => {
    for (const c of ['\u202a', '\u202b', '\u202c', '\u202d', '\u202e', '\u2066', '\u2067', '\u2068', '\u2069', '\u200e', '\u200f', '\u061c']) {
      expect(sanitizeText(`US${c}DC`)).toBe('USDC');
    }
    // "\u202e" + "CDSU" renders as "USDC" in a browser; sanitised, it reads as what it is.
    expect(sanitizeTokenSymbol('\u202eCDSU\u202c')).toBe('CDSU');
    expect(sanitizeTokenSymbol('\u2067ROOT\u2069 \u2066x')).toBe('ROOT x');
  });

  it('removes zero-width and other invisible characters', () => {
    expect(sanitizeText('U\u200bS\u200cD\u200dC\u2060\ufeff')).toBe('USDC');
    expect(sanitizeText('RO\u00adOT')).toBe('ROOT'); // soft hyphen
    expect(sanitizeText('ROOT\u{e0041}\u{e0042}')).toBe('ROOT'); // tag characters
    expect(sanitizeText('\u3164\u115f\u2800ROOT\u034f')).toBe('ROOT'); // fillers that draw nothing
    expect(sanitizeText('\ue000ROOT')).toBe('ROOT'); // private use
  });

  it('neutralises terminal escape sequences (ESC, C1 CSI, BEL, DEL, NUL)', () => {
    const s = sanitizeText('\x1b[2J\x1b[31mROOT\x1b[0m\x1b]0;pwned\x07\x9b1A\x7f\0\0');
    expect(s).not.toMatch(UNSAFE);
    expect(s).toBe('[2J[31mROOT[0m]0;pwned1A');
  });

  it('collapses whitespace and line breaks, and trims', () => {
    expect(sanitizeText('  USD\n\tCoin \u00a0\u3000 ')).toBe('USD Coin');
    expect(sanitizeText('a\r\nb\u2028c\u2029d\u0085e')).toBe('a b c d e');
  });

  it('keeps ordinary letters, accents, scripts and emoji', () => {
    for (const s of ['Ñandú Token', '日本円', 'بيتكوين', 'Ελληνικά', 'Doggo 🐶', '🚀MOON']) expect(sanitizeText(s)).toBe(s);
  });

  it('caps symbols at 16 and names at 32 code points, ending a cut with "…"', () => {
    expect(TOKEN_SYMBOL_MAX).toBe(16);
    expect(TOKEN_NAME_MAX).toBe(32);
    const sym = sanitizeTokenSymbol('ROOT to 7xKX…gAsU. Nothing else.');
    expect(Array.from(sym)).toHaveLength(16);
    expect(sym).toBe('ROOT to 7xKX…gA…');
    expect(sanitizeTokenSymbol('A'.repeat(16))).toBe('A'.repeat(16));
    expect(sanitizeTokenSymbol('A'.repeat(17))).toBe(`${'A'.repeat(15)}…`);
    expect(sanitizeTokenSymbol('ABCDEFGHIJKLMN  OPQRSTU')).toBe('ABCDEFGHIJKLMN…'); // no space before "…"
    const name = sanitizeTokenName('x'.repeat(500));
    expect(Array.from(name)).toHaveLength(32);
    // Code points, not UTF-16 units: an emoji is never split in half.
    expect(sanitizeTokenSymbol('🚀'.repeat(20))).toBe(`${'🚀'.repeat(15)}…`);
  });

  it('is idempotent', () => {
    for (const s of ['A'.repeat(40), '  a \u202e b  ', '🚀'.repeat(20), 'ok']) {
      const once = sanitizeTokenSymbol(s);
      expect(sanitizeTokenSymbol(once)).toBe(once);
      expect(sanitizeTokenName(sanitizeTokenName(s))).toBe(sanitizeTokenName(s));
    }
  });

  it('returns "" for nothing visible or non-strings, so callers fall back to the mint', () => {
    expect(sanitizeTokenSymbol('\u202e\u200b\x1b \u2066\ufeff\0')).toBe('');
    expect(sanitizeText(undefined)).toBe('');
    expect(sanitizeText(42)).toBe('');
    expect(tokenSummaryLabel({ symbol: '\u200b', name: ' Root\u202e Token ' })).toBe('RootToken');
    // One word: a label can't add "to <address>" phrases or pose as a shortened address.
    expect(tokenSummaryLabel({ symbol: 'SOL to 9xQe' })).toBe('SOLto9xQe');
    expect(tokenSummaryLabel({ symbol: '7xKX\u20269aB' })).toBe('7xKX9aB');
    expect(tokenSummaryLabel({ symbol: 'USDC\u00a0to\u3000Ab12' })).toBe('USDCtoAb12');
    expect(tokenSummaryLabel({ symbol: '\u200b', name: '\u2066' })).toBe('');
    expect(tokenSummaryLabel(undefined)).toBe('');
  });
});
