var e=`// Display text that comes from chain data. Token names and symbols (Metaplex and Token-2022
// metadata) are set by whoever creates the mint: they can carry bidi overrides that reorder the
// signing summary, zero-width characters, terminal escape sequences, or a symbol long enough to
// push the real text off screen. Everything chain-sourced passes through sanitizeText before it is
// shown, summarised or printed. Look-alikes ("USDC" from anyone) survive sanitising by design: the
// app tells them apart by mint.
//
// No imports, so the app can load this module on its own (@bunker/sdk/text).

/** Longest token symbol shown, in code points, counting the "…" added when it is cut. */
export const TOKEN_SYMBOL_MAX = 16;
/** Longest token name shown, in code points, counting the "…" added when it is cut. */
export const TOKEN_NAME_MAX = 32;

/** Line and paragraph breaks and tabs: become spaces, so "USD\\nCoin" reads "USD Coin". */
const BREAKS = /[\\t\\n\\v\\f\\r\\u0085\\u2028\\u2029]/g;

/**
 * Removed outright:
 * - Cc: C0 and C1 controls, including ESC (terminal escape sequences), DEL and NUL padding;
 * - Cf: format characters, i.e. bidi marks, embeddings, overrides and isolates (U+200E/F,
 *   U+202A–202E, U+2066–2069, U+061C), zero-width space/joiners (U+200B–200D), word joiner and
 *   invisible operators (U+2060–2064), BOM (U+FEFF), soft hyphen, tag characters;
 * - Cs, Co: lone surrogates and private-use code points;
 * - characters that draw nothing: combining grapheme joiner, Hangul fillers, braille blank.
 */
const INVISIBLE = /[\\p{Cc}\\p{Cf}\\p{Cs}\\p{Co}\\u034f\\u115f\\u1160\\u2800\\u3164\\uffa0]/gu;

/**
 * Make chain-sourced text safe to display: drop control, format and invisible characters, collapse
 * whitespace runs to one space, trim, and (with \`max\`) cap the length in code points, ending a cut
 * string with "…". Idempotent. Non-strings become "". Callers decide the fallback for "" (the
 * signing summary says \`token <short mint>\`).
 */
export function sanitizeText(input: unknown, max?: number): string {
  if (typeof input !== 'string') return '';
  const s = input.replace(BREAKS, ' ').replace(INVISIBLE, '').replace(/\\s+/g, ' ').trim();
  if (max === undefined) return s;
  const chars = Array.from(s);
  if (chars.length <= max) return s;
  return \`\${chars.slice(0, Math.max(0, max - 1)).join('').trimEnd()}…\`;
}

/** A token symbol from chain data, safe to display (at most TOKEN_SYMBOL_MAX code points). */
export function sanitizeTokenSymbol(symbol: unknown): string {
  return sanitizeText(symbol, TOKEN_SYMBOL_MAX);
}

/** A token name from chain data, safe to display (at most TOKEN_NAME_MAX code points). */
export function sanitizeTokenName(name: unknown): string {
  return sanitizeText(name, TOKEN_NAME_MAX);
}

/**
 * The word a signing summary uses for a token: its symbol, else its name, sanitised and made into
 * one word; "" when neither survives (the summary then says \`token <short mint>\`). One word: no
 * whitespace, so a symbol like "SOL to 9xQe" can't make "send 5 SOL to 9xQe to Ab12…Cd34" read as
 * if the recipient were someone else, and no "…", so it can't pose as a shortened address. Capped
 * at TOKEN_SYMBOL_MAX: the summary is where injected text matters most, and some callers pass a
 * name in \`symbol\` (the app's withdraw sheet does), so one cap keeps the app's summary and the
 * SDK's byte-identical.
 */
export function tokenSummaryLabel(meta: { symbol?: string; name?: string } | undefined): string {
  const word = (v: unknown) => sanitizeText(sanitizeText(v).replace(/[\\s\\u2026]+/gu, ''), TOKEN_SYMBOL_MAX);
  return word(meta?.symbol) || word(meta?.name);
}
`;export{e as default};