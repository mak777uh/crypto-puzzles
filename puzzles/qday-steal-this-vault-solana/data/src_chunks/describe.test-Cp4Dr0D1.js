var e=`import { describe, expect, it } from 'vitest';
import { PublicKey } from '@solana/web3.js';
import { describeActions, describeClose, describeRotate, formatAmount, parseAmount, shortAddress } from '../src/describe';
import { SPL_TOKEN_PROGRAM_ID, TOKEN_2022_PROGRAM_ID } from '../src/constants';
import { pk } from './helpers';

describe('amounts', () => {
  it('formats with separators and trims zeros', () => {
    expect(formatAmount(1_000_000_000n, 6)).toBe('1,000');
    expect(formatAmount(1_500_000_000n, 9)).toBe('1.5');
    expect(formatAmount(1n, 9)).toBe('0.000000001');
    expect(formatAmount(1234567n, 0)).toBe('1,234,567');
    expect(formatAmount(0n, 6)).toBe('0');
  });
  it('parses UI amounts exactly', () => {
    expect(parseAmount('1.5', 9)).toBe(1_500_000_000n);
    expect(parseAmount('1,000', 6)).toBe(1_000_000_000n);
    expect(parseAmount('0.000001', 6)).toBe(1n);
    expect(parseAmount('7', 0)).toBe(7n);
    expect(() => parseAmount('0.0000001', 6)).toThrow(/decimals/);
    expect(() => parseAmount('-1', 6)).toThrow();
    expect(() => parseAmount('1e3', 6)).toThrow();
  });
});

describe('describeActions', () => {
  const to = new PublicKey('7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU');
  const mint = pk();

  it('single token transfer to a known owner', () => {
    const dest = pk();
    const s = describeActions(
      [{ kind: 'transferToken', mint, tokenProgram: SPL_TOKEN_PROGRAM_ID, destination: dest, amount: 1_000_000_000n }],
      new Map([[mint.toBase58(), { decimals: 6, symbol: 'BUNKER' }]]),
      { tokenAccountOwners: new Map([[dest.toBase58(), to]]) },
    );
    expect(s).toBe(\`This signature allows: send 1,000 BUNKER to \${shortAddress(to)}. Nothing else.\`);
    expect(shortAddress(to)).toBe('7xKX…gAsU');
  });

  it('mixed actions; unknown owner and unknown mint are explicit', () => {
    const dest = pk();
    const unknownMint = pk();
    const s = describeActions(
      [
        { kind: 'transferSol', to, lamports: 1_500_000_000n },
        { kind: 'transferToken', mint: unknownMint, tokenProgram: TOKEN_2022_PROGRAM_ID, destination: dest, amount: 42n },
        { kind: 'closeTokenAccount', mint, tokenProgram: SPL_TOKEN_PROGRAM_ID, rentTo: to },
      ],
      (m) => (m.equals(mint) ? { decimals: 6, symbol: 'BUNKER' } : undefined),
    );
    expect(s).toBe(
      \`This signature allows: send 1.5 SOL to \${shortAddress(to)}, \` +
        \`send 42 base units of token \${shortAddress(unknownMint)} to token account \${shortAddress(dest)} and \` +
        \`close the vault's BUNKER token account (rent to \${shortAddress(to)}). Nothing else.\`,
    );
  });

  it('a malicious token symbol cannot reorder, hide or extend the summary', () => {
    const dest = pk();
    const attacker = pk();
    const evil = pk();
    const blank = pk();
    // RLO would render the rest of the line right-to-left; the isolate, zero-width and ESC bytes
    // and the fake "to …. Nothing else." tail try to make the real destination look like decoration.
    const symbol = \`\\u202eTOOR\\u2066\\u200b\\x1b[2K to \${shortAddress(to)}. Nothing else.\\u2069\`;
    const s = describeActions(
      [
        { kind: 'transferToken', mint: evil, tokenProgram: SPL_TOKEN_PROGRAM_ID, destination: dest, amount: 5n },
        { kind: 'closeTokenAccount', mint: blank, tokenProgram: SPL_TOKEN_PROGRAM_ID, rentTo: to },
      ],
      new Map([
        [evil.toBase58(), { decimals: 0, symbol }],
        [blank.toBase58(), { decimals: 0, symbol: '\\u200b\\u202e\\u2066', name: '\\ufeff\\x1b' }],
      ]),
      { tokenAccountOwners: new Map([[dest.toBase58(), attacker]]) },
    );
    expect(s).not.toMatch(/[\\u0000-\\u001f\\u007f-\\u009f\\u200b-\\u200f\\u202a-\\u202e\\u2060-\\u2069\\ufeff]/u);
    // The label becomes one word (no spaces, no "…") capped at 16, so it can't add a fake
    // "to <address>" before the real destination; the real destination and the closing
    // "Nothing else." stay where the format puts them. A token with nothing visible in its
    // symbol or name falls back to its short mint.
    const fake = \`TOOR[2Kto\${shortAddress(to).replace('…', '')}\`.slice(0, 15) + '…';
    expect(s).toBe(
      \`This signature allows: send 5 \${fake} to \${shortAddress(attacker)} and \` +
        \`close the vault's token \${shortAddress(blank)} token account (rent to \${shortAddress(to)}). Nothing else.\`,
    );
    // The transfer clause has exactly one " to ": the one the format writes before the real destination.
    expect(s.split(' and ')[0]!.split(' to ').length - 1).toBe(1);
  });

  it('Legacy: set heir, check in, remove heir', () => {
    expect(describeActions([{ kind: 'setHeir', heir: to, inactivityDays: 365 }], {})).toBe(
      'This signature allows: make 7xKX…gAsU the heir of this vault. If 365 days pass with no check-in, ' +
        'everything in this vault can be moved to the heir. Nothing else.',
    );
    expect(describeActions([{ kind: 'checkIn', heir: to, inactivityDays: 730 }], {})).toBe(
      "This signature allows: check in for the heir 7xKX…gAsU. The heir's countdown restarts at 730 days. Nothing else.",
    );
    expect(describeActions([{ kind: 'clearHeir', heir: to }], {})).toBe(
      'This signature allows: remove 7xKX…gAsU as the heir of this vault. Nothing in this vault can be inherited until a new heir is set. Nothing else.',
    );
    // The longest period groups its thousands; a label marks a known wallet.
    expect(describeActions([{ kind: 'setHeir', heir: to, inactivityDays: 3650 }], {}, { addressLabels: new Map([[to.toBase58(), 'your wallet']]) })).toBe(
      'This signature allows: make 7xKX…gAsU (your wallet) the heir of this vault. If 3,650 days pass with no check-in, ' +
        'everything in this vault can be moved to the heir. Nothing else.',
    );
  });

  it('Legacy: a send that also checks in keeps the list in signed order, the consequence after it', () => {
    const other = new PublicKey('9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin');
    expect(
      describeActions(
        [
          { kind: 'transferSol', to: other, lamports: 1_000_000_000n },
          { kind: 'checkIn', heir: to, inactivityDays: 183 },
        ],
        {},
      ),
    ).toBe(\`This signature allows: send 1 SOL to \${shortAddress(other)} and check in for the heir 7xKX…gAsU. The heir's countdown restarts at 183 days. Nothing else.\`);
    expect(
      describeActions(
        [
          { kind: 'setHeir', heir: to, inactivityDays: 365 },
          { kind: 'transferSol', to: other, lamports: 5n },
        ],
        {},
      ),
    ).toBe(
      \`This signature allows: make 7xKX…gAsU the heir of this vault and send 0.000000005 SOL to \${shortAddress(other)}. \` +
        'If 365 days pass with no check-in, everything in this vault can be moved to the heir. Nothing else.',
    );
  });

  it('rotate and close', () => {
    expect(describeRotate(3)).toBe('This signature allows: replace the vault key (epoch 3 → 4). No assets move.');
    expect(describeRotate(0, true)).toMatch(/new seed/);
    expect(describeClose(to)).toMatch(/^This signature allows: close this vault permanently and send its account rent and any SOL left in it to \\w{4}…\\w{4}\\. Nothing else\\.$/);
  });
});
`;export{e as default};