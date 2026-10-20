import { Buffer } from 'buffer';
import { Keypair, PublicKey } from '@solana/web3.js';
import type { AccountInfo } from '@solana/web3.js';
import { ACCOUNT_SIZE, MINT_SIZE, MintLayout, unpackMint } from '@solana/spl-token';
import type { Mint } from '@solana/spl-token';
import { SPL_TOKEN_PROGRAM_ID, TOKEN_2022_PROGRAM_ID } from '../src/constants';

export const pk = (): PublicKey => Keypair.generate().publicKey;

function u16(n: number): Buffer {
  const b = Buffer.alloc(2);
  b.writeUInt16LE(n);
  return b;
}
function u32(n: number): Buffer {
  const b = Buffer.alloc(4);
  b.writeUInt32LE(n);
  return b;
}
function u64(n: bigint): Buffer {
  const b = Buffer.alloc(8);
  b.writeBigUInt64LE(n);
  return b;
}
function str(s: string): Buffer {
  const d = Buffer.from(s, 'utf8');
  return Buffer.concat([u32(d.length), d]);
}

export interface SyntheticMintOpts {
  decimals?: number;
  supply?: bigint;
  mintAuthority?: PublicKey | null;
  freezeAuthority?: PublicKey | null;
  extensions?: Array<{ type: number; data: Buffer }>;
}

/** Raw mint account bytes (Token-2022 layout with TLV when extensions are given). */
export function mintData(o: SyntheticMintOpts = {}): Buffer {
  const base = Buffer.alloc(MINT_SIZE);
  MintLayout.encode(
    {
      mintAuthorityOption: o.mintAuthority ? 1 : 0,
      mintAuthority: o.mintAuthority ?? PublicKey.default,
      supply: o.supply ?? 1_000_000n,
      decimals: o.decimals ?? 6,
      isInitialized: true,
      freezeAuthorityOption: o.freezeAuthority ? 1 : 0,
      freezeAuthority: o.freezeAuthority ?? PublicKey.default,
    },
    base,
  );
  if (!o.extensions) return base;
  const pad = Buffer.alloc(ACCOUNT_SIZE - MINT_SIZE);
  const tlv = o.extensions.map((e) => Buffer.concat([u16(e.type), u16(e.data.length), e.data]));
  return Buffer.concat([base, pad, Buffer.from([1]), ...tlv]);
}

export function syntheticMint(o: SyntheticMintOpts & { address?: PublicKey; program?: PublicKey } = {}): {
  mint: Mint;
  info: AccountInfo<Buffer>;
  program: PublicKey;
} {
  const program = o.program ?? (o.extensions ? TOKEN_2022_PROGRAM_ID : SPL_TOKEN_PROGRAM_ID);
  const info: AccountInfo<Buffer> = { data: mintData(o), executable: false, lamports: 1_000_000, owner: program, rentEpoch: 0 };
  const address = o.address ?? pk();
  return { mint: unpackMint(address, info, program), info, program };
}

export const ext = {
  transferHook: (authority: PublicKey, programId: PublicKey) => ({ type: 14, data: Buffer.concat([authority.toBuffer(), programId.toBuffer()]) }),
  permanentDelegate: (d: PublicKey) => ({ type: 12, data: d.toBuffer() }),
  defaultAccountState: (state: number) => ({ type: 6, data: Buffer.from([state]) }),
  nonTransferable: () => ({ type: 9, data: Buffer.alloc(0) }),
  pausable: (authority: PublicKey, paused = false) => ({ type: 26, data: Buffer.concat([authority.toBuffer(), Buffer.from([paused ? 1 : 0])]) }),
  transferFee: (bps: number, max: bigint, authority: PublicKey = PublicKey.default) => {
    const fee = Buffer.concat([u64(0n), u64(max), u16(bps)]);
    return { type: 1, data: Buffer.concat([authority.toBuffer(), PublicKey.default.toBuffer(), u64(0n), fee, fee]) };
  },
  metadataPointer: (authority: PublicKey, address: PublicKey) => ({ type: 18, data: Buffer.concat([authority.toBuffer(), address.toBuffer()]) }),
  tokenMetadata: (mint: PublicKey, name: string, symbol: string, uri: string) => ({
    type: 19,
    data: Buffer.concat([PublicKey.default.toBuffer(), mint.toBuffer(), str(name), str(symbol), str(uri), u32(0)]),
  }),
  unknown: (type: number) => ({ type, data: Buffer.alloc(4) }),
};

/** Metaplex MetadataV1 bytes (padded like the real program does). */
export function metaplexData(o: { mint: PublicKey; name: string; symbol: string; uri: string; tokenStandard?: number | null }): Buffer {
  const padded = (s: string, n: number) => str(s.padEnd(n, '\0'));
  const parts = [
    Buffer.from([4]),
    pk().toBuffer(),
    o.mint.toBuffer(),
    padded(o.name, 32),
    padded(o.symbol, 10),
    padded(o.uri, 200),
    u16(500),
    Buffer.from([0]), // creators: None
    Buffer.from([0]), // primary_sale_happened
    Buffer.from([1]), // is_mutable
    Buffer.from([1, 255]), // edition_nonce: Some(255)
  ];
  if (o.tokenStandard === undefined || o.tokenStandard === null) parts.push(Buffer.from([0]));
  else parts.push(Buffer.from([1, o.tokenStandard]));
  parts.push(Buffer.alloc(64)); // collection/uses/... tail
  return Buffer.concat(parts);
}
