var e=`import { sha256 } from '@noble/hashes/sha2.js';

export { sha256 };

export function concatBytes(...parts: Uint8Array[]): Uint8Array {
  let len = 0;
  for (const p of parts) len += p.length;
  const out = new Uint8Array(len);
  let o = 0;
  for (const p of parts) {
    out.set(p, o);
    o += p.length;
  }
  return out;
}

export function bytesEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let d = 0;
  for (let i = 0; i < a.length; i++) d |= (a[i] as number) ^ (b[i] as number);
  return d === 0;
}

export function toHex(b: Uint8Array): string {
  let s = '';
  for (const x of b) s += x.toString(16).padStart(2, '0');
  return s;
}

export function fromHex(h: string): Uint8Array {
  const clean = h.startsWith('0x') ? h.slice(2) : h;
  if (clean.length % 2 !== 0 || /[^0-9a-fA-F]/.test(clean)) throw new Error('invalid hex');
  const out = new Uint8Array(clean.length / 2);
  for (let i = 0; i < out.length; i++) out[i] = parseInt(clean.slice(i * 2, i * 2 + 2), 16);
  return out;
}

export function u32le(n: number): Uint8Array {
  if (!Number.isInteger(n) || n < 0 || n > 0xffff_ffff) throw new RangeError(\`u32 out of range: \${n}\`);
  const b = new Uint8Array(4);
  new DataView(b.buffer).setUint32(0, n, true);
  return b;
}

export function u64le(n: bigint): Uint8Array {
  if (n < 0n || n > 0xffff_ffff_ffff_ffffn) throw new RangeError(\`u64 out of range: \${n}\`);
  const b = new Uint8Array(8);
  new DataView(b.buffer).setBigUint64(0, n, true);
  return b;
}

const enc = new TextEncoder();
export const utf8 = (s: string): Uint8Array => enc.encode(s);

/** Anchor instruction discriminator: sha256("global:<snake_name>")[..8]. */
export function ixDiscriminator(snakeName: string): Uint8Array {
  return sha256(utf8(\`global:\${snakeName}\`)).slice(0, 8);
}

/** Anchor account discriminator: sha256("account:<TypeName>")[..8]. */
export function accountDiscriminator(typeName: string): Uint8Array {
  return sha256(utf8(\`account:\${typeName}\`)).slice(0, 8);
}

/** Minimal Borsh writer for Anchor instruction args. */
export class BorshWriter {
  private parts: Uint8Array[] = [];
  raw(b: Uint8Array): this {
    this.parts.push(b);
    return this;
  }
  u8(n: number): this {
    return this.raw(Uint8Array.of(n & 0xff));
  }
  u32(n: number): this {
    return this.raw(u32le(n));
  }
  u64(n: bigint): this {
    return this.raw(u64le(n));
  }
  /** Vec<u8>: u32 LE length + bytes. */
  vec(b: Uint8Array): this {
    return this.u32(b.length).raw(b);
  }
  /** Option<T>: 0 tag, or 1 tag + value. */
  option<T>(v: T | null | undefined, write: (w: this, v: T) => void): this {
    if (v === null || v === undefined) return this.u8(0);
    this.u8(1);
    write(this, v);
    return this;
  }
  bytes(): Uint8Array {
    return concatBytes(...this.parts);
  }
}

/** Minimal Borsh reader for account decoding. Throws on out-of-bounds reads. */
export class BorshReader {
  offset = 0;
  private readonly data: Uint8Array;
  private readonly view: DataView;
  constructor(data: Uint8Array) {
    this.data = data;
    this.view = new DataView(data.buffer, data.byteOffset, data.byteLength);
  }
  private need(n: number): void {
    if (this.offset + n > this.data.length) throw new RangeError('account data too short');
  }
  u8(): number {
    this.need(1);
    return this.view.getUint8(this.offset++);
  }
  bool(): boolean {
    const v = this.u8();
    if (v > 1) throw new RangeError('invalid bool');
    return v === 1;
  }
  u16(): number {
    this.need(2);
    const v = this.view.getUint16(this.offset, true);
    this.offset += 2;
    return v;
  }
  u32(): number {
    this.need(4);
    const v = this.view.getUint32(this.offset, true);
    this.offset += 4;
    return v;
  }
  u64(): bigint {
    this.need(8);
    const v = this.view.getBigUint64(this.offset, true);
    this.offset += 8;
    return v;
  }
  fixed(n: number): Uint8Array {
    this.need(n);
    const v = this.data.slice(this.offset, this.offset + n);
    this.offset += n;
    return v;
  }
  string(): string {
    const len = this.u32();
    return new TextDecoder().decode(this.fixed(len));
  }
  remaining(): number {
    return this.data.length - this.offset;
  }
}
`;export{e as default};