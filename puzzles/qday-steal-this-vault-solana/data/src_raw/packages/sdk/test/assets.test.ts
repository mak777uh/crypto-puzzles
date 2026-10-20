import { describe, expect, it } from 'vitest';
import { PublicKey } from '@solana/web3.js';
import type { AccountInfo, Connection } from '@solana/web3.js';
import { Buffer } from 'buffer';
import { ACCOUNT_SIZE, AccountLayout, AccountState } from '@solana/spl-token';
import {
  classifyMint,
  decodeMetaplexMetadata,
  fetchAssets,
  findMetaplexMetadataPda,
  mintClassificationToMeta,
  TOKEN_STANDARD,
} from '../src/assets';
import { METAPLEX_TOKEN_METADATA_PROGRAM_ID, SPL_TOKEN_PROGRAM_ID, TOKEN_2022_PROGRAM_ID } from '../src/constants';
import { ext, metaplexData, pk, syntheticMint } from './helpers';

const ids = (risks: { id: string; severity: string }[]) => risks.map((r) => `${r.id}:${r.severity}`).sort();

describe('classifyMint', () => {
  it('plain SPL token with authorities: supported, freeze warn + mint info', () => {
    const { mint, program } = syntheticMint({ mintAuthority: pk(), freezeAuthority: pk() });
    const c = classifyMint({ mint, tokenProgram: program });
    expect(c.supported).toBe(true);
    expect(c.kind).toBe('token');
    expect(ids(c.risks)).toEqual(['freezeAuthority:warn', 'mintAuthority:info']);
  });

  it('no authorities: no risks', () => {
    const { mint, program } = syntheticMint();
    const c = classifyMint({ mint, tokenProgram: program });
    expect(c.supported).toBe(true);
    expect(c.risks).toEqual([]);
  });

  it('transfer hook (program set) → blocked, danger', () => {
    const { mint, program } = syntheticMint({ extensions: [ext.transferHook(pk(), pk())] });
    const c = classifyMint({ mint, tokenProgram: program });
    expect(c.supported).toBe(false);
    expect(c.transferHookActive).toBe(true);
    expect(c.unsupportedReason).toMatch(/transfer-hook/i);
    expect(c.risks.find((r) => r.id === 'transferHook')?.severity).toBe('danger');
  });

  it('transfer hook with only an authority → blocked for deposit, not active', () => {
    const { mint, program } = syntheticMint({ extensions: [ext.transferHook(pk(), PublicKey.default)] });
    const c = classifyMint({ mint, tokenProgram: program });
    expect(c.supported).toBe(false);
    expect(c.transferHookActive).toBe(false);
  });

  it('transfer hook extension with no authority and no program → supported', () => {
    const { mint, program } = syntheticMint({ extensions: [ext.transferHook(PublicKey.default, PublicKey.default)] });
    const c = classifyMint({ mint, tokenProgram: program });
    expect(c.supported).toBe(true);
    expect(c.risks.some((r) => r.id === 'transferHook')).toBe(false);
  });

  it('permanent delegate → allowed but danger with the spec wording', () => {
    const { mint, program } = syntheticMint({ extensions: [ext.permanentDelegate(pk())] });
    const c = classifyMint({ mint, tokenProgram: program });
    expect(c.supported).toBe(true);
    const r = c.risks.find((x) => x.id === 'permanentDelegate');
    expect(r?.severity).toBe('danger');
    expect(r?.detail).toMatch(/the issuer can move these out of your vault/i);
  });

  it('pump.fun-like mint (Token-2022, 6 dp, MetadataPointer→self + TokenMetadata, no authorities) → supported, zero risk flags', () => {
    const address = pk();
    const { mint, program } = syntheticMint({
      address,
      decimals: 6,
      supply: 1_000_000_000_000_000n,
      mintAuthority: null,
      freezeAuthority: null,
      extensions: [ext.metadataPointer(PublicKey.default, address), ext.tokenMetadata(address, 'Pump Coin', 'PUMP', 'https://ipfs.io/x')],
    });
    expect(program.equals(TOKEN_2022_PROGRAM_ID)).toBe(true);
    const c = classifyMint({ mint, tokenProgram: program });
    expect(c.supported).toBe(true);
    expect(c.unsupportedReason).toBeUndefined();
    expect(c.risks).toEqual([]);
    expect(c.kind).toBe('token');
    expect(c.symbol).toBe('PUMP');
    expect(c.name).toBe('Pump Coin');
  });

  it('default-frozen → blocked; default-initialized → fine', () => {
    const frozen = syntheticMint({ extensions: [ext.defaultAccountState(AccountState.Frozen)] });
    const c1 = classifyMint({ mint: frozen.mint, tokenProgram: frozen.program });
    expect(c1.supported).toBe(false);
    expect(c1.risks.find((r) => r.id === 'defaultFrozen')?.severity).toBe('danger');
    const init = syntheticMint({ extensions: [ext.defaultAccountState(AccountState.Initialized)] });
    expect(classifyMint({ mint: init.mint, tokenProgram: init.program }).supported).toBe(true);
  });

  it('non-transferable → blocked', () => {
    const { mint, program } = syntheticMint({ extensions: [ext.nonTransferable()] });
    const c = classifyMint({ mint, tokenProgram: program });
    expect(c.supported).toBe(false);
    expect(c.risks.map((r) => r.id)).toContain('nonTransferable');
  });

  it('pausable → blocked', () => {
    const { mint, program } = syntheticMint({ extensions: [ext.pausable(pk())] });
    const c = classifyMint({ mint, tokenProgram: program });
    expect(c.supported).toBe(false);
    expect(c.risks.map((r) => r.id)).toContain('pausable');
  });

  it('transfer fee → supported with a warning', () => {
    const { mint, program } = syntheticMint({ extensions: [ext.transferFee(150, 5000n, pk())] });
    const c = classifyMint({ mint, tokenProgram: program });
    expect(c.supported).toBe(true);
    const r = c.risks.find((x) => x.id === 'transferFee');
    expect(r?.severity).toBe('warn');
    expect(r?.detail).toContain('1.50%');
  });

  it('unknown Token-2022 extension → blocked', () => {
    const { mint, program } = syntheticMint({ extensions: [ext.unknown(200)] });
    const c = classifyMint({ mint, tokenProgram: program });
    expect(c.supported).toBe(false);
    expect(c.unsupportedReason).toMatch(/extension/);
  });

  it('Token-2022 metadata extension → name/symbol/uri', () => {
    const address = pk();
    const { mint, program } = syntheticMint({
      address,
      extensions: [ext.metadataPointer(pk(), address), ext.tokenMetadata(address, 'Bunker Token', 'BUNKER', 'https://x/y.json')],
    });
    const c = classifyMint({ mint, tokenProgram: program });
    expect(c.supported).toBe(true);
    expect(c.name).toBe('Bunker Token');
    expect(c.symbol).toBe('BUNKER');
    expect(c.uri).toBe('https://x/y.json');
  });

  it('0-decimal supply-1 mint is an NFT; Metaplex pNFT → blocked with pnftRules', () => {
    const nft = syntheticMint({ decimals: 0, supply: 1n });
    const md = decodeMetaplexMetadata(metaplexData({ mint: nft.mint.address, name: 'Gem', symbol: 'GEM', uri: 'u', tokenStandard: TOKEN_STANDARD.NonFungible }));
    const c = classifyMint({ mint: nft.mint, tokenProgram: nft.program, metaplex: md });
    expect(c.kind).toBe('nft');
    expect(c.supported).toBe(true);
    expect(c.name).toBe('Gem');
    expect(c.symbol).toBe('GEM');

    for (const ts of [TOKEN_STANDARD.ProgrammableNonFungible, TOKEN_STANDARD.ProgrammableNonFungibleEdition]) {
      const p = decodeMetaplexMetadata(metaplexData({ mint: nft.mint.address, name: 'P', symbol: 'P', uri: '', tokenStandard: ts }));
      expect(p?.tokenStandard).toBe(ts);
      const cp = classifyMint({ mint: nft.mint, tokenProgram: nft.program, metaplex: p });
      expect(cp.supported).toBe(false);
      expect(cp.risks.find((r) => r.id === 'pnftRules')?.severity).toBe('danger');
    }
  });

  it('chain metadata is sanitised where it enters the SDK (both decoders, classifyMint, TokenMeta)', () => {
    const address = pk();
    const t22 = syntheticMint({
      address,
      extensions: [
        ext.metadataPointer(pk(), address),
        ext.tokenMetadata(address, 'Totally\u200b Real\n\u202eDollar', '\x1b[31mUSDC\u2066 to 7xKX…gAsU. Nothing else.', 'https://x\u0000'),
      ],
    });
    const c = classifyMint({ mint: t22.mint, tokenProgram: t22.program });
    expect(c.name).toBe('Totally Real Dollar');
    expect(c.symbol).toBe('[31mUSDC to 7xK…');
    expect(c.uri).toBe('https://x');
    expect(mintClassificationToMeta(c)).toEqual({ decimals: c.decimals, symbol: '[31mUSDC to 7xK…', name: 'Totally Real Dollar' });

    const md = decodeMetaplexMetadata(metaplexData({ mint: address, name: '\u202eGEM\u202c', symbol: '\u200b\u2060', uri: 'u' }));
    expect(md).toMatchObject({ name: 'GEM', symbol: '' });
    // A caller-built MetaplexMetadata is cleaned too.
    const raw = classifyMint({ mint: syntheticMint().mint, tokenProgram: SPL_TOKEN_PROGRAM_ID, metaplex: { ...md!, symbol: 'A\x1bB'.repeat(10) } });
    expect(raw.symbol).toBe('ABABABABABABABA…');
    // Nothing visible left: no symbol in the TokenMeta, so summaries fall back to name / short mint.
    expect(mintClassificationToMeta({ ...raw, symbol: '\u202e', name: '' })).toEqual({ decimals: raw.decimals });
  });

  it('Metaplex decoder strips padding and tolerates a missing token_standard', () => {
    const mint = pk();
    const md = decodeMetaplexMetadata(metaplexData({ mint, name: 'Name', symbol: 'SYM', uri: 'https://a', tokenStandard: null }));
    expect(md).toMatchObject({ name: 'Name', symbol: 'SYM', uri: 'https://a', tokenStandard: null });
    expect(md?.mint.equals(mint)).toBe(true);
    expect(decodeMetaplexMetadata(Buffer.from([9, 9, 9]))).toBeNull();
  });
});

function tokenAccountData(mint: PublicKey, owner: PublicKey, amount: bigint, state = AccountState.Initialized): Buffer {
  const b = Buffer.alloc(ACCOUNT_SIZE);
  AccountLayout.encode(
    {
      mint,
      owner,
      amount,
      delegateOption: 0,
      delegate: PublicKey.default,
      state,
      isNativeOption: 0,
      isNative: 0n,
      delegatedAmount: 0n,
      closeAuthorityOption: 0,
      closeAuthority: PublicKey.default,
    },
    b,
  );
  return b;
}

describe('fetchAssets (mock connection)', () => {
  it('batches mint + Metaplex lookups and flags frozen accounts', async () => {
    const owner = pk();
    const good = syntheticMint({ decimals: 6, freezeAuthority: pk() });
    const hooked = syntheticMint({ extensions: [ext.transferHook(pk(), pk())] });
    const nft = syntheticMint({ decimals: 0, supply: 1n });
    const accounts = new Map<string, AccountInfo<Buffer>>([
      [good.mint.address.toBase58(), good.info],
      [hooked.mint.address.toBase58(), hooked.info],
      [nft.mint.address.toBase58(), nft.info],
      [
        findMetaplexMetadataPda(nft.mint.address).toBase58(),
        {
          data: metaplexData({ mint: nft.mint.address, name: 'Gem', symbol: 'GEM', uri: 'u', tokenStandard: 0 }),
          executable: false,
          lamports: 1,
          owner: METAPLEX_TOKEN_METADATA_PROGRAM_ID,
          rentEpoch: 0,
        },
      ],
    ]);
    const ta = (mint: PublicKey, program: PublicKey, amount: bigint, state?: AccountState) => ({
      pubkey: pk(),
      account: { data: tokenAccountData(mint, owner, amount, state), executable: false, lamports: 2_039_280, owner: program, rentEpoch: 0 },
    });
    let multiCalls = 0;
    const conn = {
      getBalance: async () => 5_000_000_000,
      getTokenAccountsByOwner: async (_o: PublicKey, f: { programId: PublicKey }) => ({
        context: { slot: 1 },
        value: f.programId.equals(SPL_TOKEN_PROGRAM_ID)
          ? [ta(good.mint.address, SPL_TOKEN_PROGRAM_ID, 1_500_000n), ta(nft.mint.address, SPL_TOKEN_PROGRAM_ID, 1n, AccountState.Frozen)]
          : [ta(hooked.mint.address, TOKEN_2022_PROGRAM_ID, 10n)],
      }),
      getMultipleAccountsInfo: async (keys: PublicKey[]) => {
        multiCalls++;
        return keys.map((k) => accounts.get(k.toBase58()) ?? null);
      },
    } as unknown as Connection;

    const assets = await fetchAssets(conn, owner);
    expect(multiCalls).toBe(1);
    expect(assets[0]).toMatchObject({ kind: 'sol', amount: 5_000_000_000n, supported: true });
    const g = assets.find((a) => a.mint?.equals(good.mint.address));
    expect(g).toMatchObject({ kind: 'token', amount: 1_500_000n, decimals: 6, supported: true });
    const h = assets.find((a) => a.mint?.equals(hooked.mint.address));
    expect(h?.supported).toBe(false);
    expect(h?.tokenProgram?.equals(TOKEN_2022_PROGRAM_ID)).toBe(true);
    const n = assets.find((a) => a.mint?.equals(nft.mint.address));
    expect(n).toMatchObject({ kind: 'nft', name: 'Gem', frozen: true, supported: false });
    expect(n?.unsupportedReason).toMatch(/frozen/);
  });
});
