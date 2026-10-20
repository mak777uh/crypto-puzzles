import { describe, expect, it } from 'vitest';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { PublicKey } from '@solana/web3.js';
import { accountDiscriminator, ixDiscriminator } from '../src/bytes';
import {
  IX_DISCRIMINATORS,
  closeSigBufferIx,
  closeVaultIx,
  executeIx,
  inheritIx,
  initSigBufferIx,
  openVaultIx,
  rotateIx,
  writeSigBufferIx,
} from '../src/instructions';
import { HEIR_DISCRIMINATOR, SIG_BUFFER_DISCRIMINATOR, VAULT_STATE_DISCRIMINATOR, VAULT_TOMBSTONE_DISCRIMINATOR } from '../src/state';
import { computeVaultId, encodeOptions, findHeirPda, findSigBufferPda, findStatePda, findWalletPda } from '../src/addresses';
import { PROGRAM_ID } from '../src/constants';

const ref = (s: string) => new Uint8Array(createHash('sha256').update(s).digest().subarray(0, 8));

describe('Anchor discriminators', () => {
  it('instruction = sha256("global:<name>")[..8]', () => {
    const names = {
      openVault: 'open_vault',
      execute: 'execute',
      rotate: 'rotate',
      closeVault: 'close_vault',
      initSigBuffer: 'init_sig_buffer',
      writeSigBuffer: 'write_sig_buffer',
      closeSigBuffer: 'close_sig_buffer',
      inherit: 'inherit',
    } as const;
    for (const [k, n] of Object.entries(names)) {
      expect(IX_DISCRIMINATORS[k as keyof typeof names]).toEqual(ref(`global:${n}`));
      expect(ixDiscriminator(n)).toEqual(ref(`global:${n}`));
    }
  });
  it('account = sha256("account:<Type>")[..8]', () => {
    expect(VAULT_STATE_DISCRIMINATOR).toEqual(ref('account:VaultState'));
    expect(VAULT_TOMBSTONE_DISCRIMINATOR).toEqual(ref('account:VaultTombstone'));
    expect(SIG_BUFFER_DISCRIMINATOR).toEqual(ref('account:SigBuffer'));
    expect(HEIR_DISCRIMINATOR).toEqual(ref('account:Heir'));
    expect(accountDiscriminator('VaultState')).toEqual(ref('account:VaultState'));
  });

  const committed = new URL('../../../programs/bunker/idl/bunker.json', import.meta.url);
  const idlPath = existsSync(committed) ? committed : new URL('../../../target/idl/bunker.json', import.meta.url);
  it.skipIf(!existsSync(idlPath))('match the program IDL when it has been built', () => {
    const idl = JSON.parse(readFileSync(idlPath, 'utf8')) as {
      address: string;
      instructions: { name: string; discriminator: number[] }[];
      accounts?: { name: string; discriminator: number[] }[];
    };
    expect(idl.address).toBe(PROGRAM_ID.toBase58());
    for (const ix of idl.instructions) expect(Array.from(ixDiscriminator(ix.name))).toEqual(ix.discriminator);
    for (const acc of idl.accounts ?? []) expect(Array.from(accountDiscriminator(acc.name))).toEqual(acc.discriminator);
  });

  it.skipIf(!existsSync(idlPath))('instruction builders follow the IDL account order and flags', () => {
    const idl = JSON.parse(readFileSync(idlPath, 'utf8')) as {
      instructions: { name: string; accounts: { name: string; writable?: boolean; signer?: boolean; optional?: boolean }[] }[];
    };
    const k = () => PublicKey.unique();
    const sig = new Uint8Array(2508);
    const cos = k();
    const buf = k();
    const built: Record<string, ReturnType<typeof openVaultIx>> = {
      open_vault: openVaultIx({ payer: k(), state: k(), wallet: k(), vaultId: new Uint8Array(32), root: new Uint8Array(48) }),
      execute: executeIx({ feePayer: k(), state: k(), wallet: k(), cosigner: cos, leafIndex: 0, payload: new Uint8Array(1), actions: [], sig: null, sigBuffer: buf }),
      rotate: rotateIx({ feePayer: k(), state: k(), cosigner: cos, leafIndex: 0, newRoot: new Uint8Array(48), sig: null, sigBuffer: buf }),
      close_vault: closeVaultIx({ feePayer: k(), state: k(), wallet: k(), rentTo: k(), cosigner: cos, leafIndex: 0, sig: null, sigBuffer: buf }),
      init_sig_buffer: initSigBufferIx({ payer: k(), state: k(), sigBuffer: k(), rootEpoch: 0, leafIndex: 0 }),
      write_sig_buffer: writeSigBufferIx({ payer: k(), sigBuffer: k(), offset: 0, data: sig.subarray(0, 4) }),
      close_sig_buffer: closeSigBufferIx({ payer: k(), sigBuffer: k() }),
      inherit: inheritIx({ caller: k(), state: k(), wallet: k(), heir: k(), tokens: [] }),
    };
    for (const ix of idl.instructions) {
      const b = built[ix.name];
      expect(b, ix.name).toBeDefined();
      expect(b!.keys.length).toBe(ix.accounts.length);
      ix.accounts.forEach((a, i) => {
        expect(b!.keys[i]!.isWritable, `${ix.name}.${a.name} writable`).toBe(!!a.writable);
        expect(b!.keys[i]!.isSigner, `${ix.name}.${a.name} signer`).toBe(!!a.signer);
      });
    }
  });
});

describe('addresses', () => {
  it('options_v1 encoding', () => {
    expect(encodeOptions(null)).toEqual(Uint8Array.of(1, 0));
    const c = new PublicKey('7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU');
    const o = encodeOptions(c);
    expect(o.length).toBe(34);
    expect(Array.from(o.subarray(0, 2))).toEqual([1, 1]);
    expect(o.subarray(2)).toEqual(c.toBytes());
  });

  it('vault id = sha256(domain ‖ root ‖ options), cosigner changes it', () => {
    const root = new Uint8Array(48).map((_, i) => i);
    const expected = createHash('sha256')
      .update(Buffer.concat([Buffer.from('BUNKER/vault-id/v1'), Buffer.from(root), Buffer.from([1, 0])]))
      .digest();
    expect(Buffer.from(computeVaultId(root))).toEqual(expected);
    expect(computeVaultId(root, PROGRAM_ID)).not.toEqual(computeVaultId(root));
    expect(() => computeVaultId(new Uint8Array(47))).toThrow();
  });

  it('PDAs use the documented seeds', () => {
    const vaultId = new Uint8Array(32).fill(7);
    const [state, bump] = findStatePda(vaultId);
    expect(PublicKey.createProgramAddressSync([Buffer.from('vault'), Buffer.from(vaultId), Buffer.from([bump])], PROGRAM_ID).equals(state)).toBe(true);
    const [wallet, wb] = findWalletPda(state);
    expect(PublicKey.createProgramAddressSync([Buffer.from('wallet'), state.toBuffer(), Buffer.from([wb])], PROGRAM_ID).equals(wallet)).toBe(true);
    const payer = new PublicKey('7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU');
    const [buf, bb] = findSigBufferPda(state, payer, 3, 258);
    const le = (n: number) => {
      const b = Buffer.alloc(4);
      b.writeUInt32LE(n);
      return b;
    };
    expect(
      PublicKey.createProgramAddressSync([Buffer.from('sigbuf'), state.toBuffer(), payer.toBuffer(), le(3), le(258), Buffer.from([bb])], PROGRAM_ID).equals(buf),
    ).toBe(true);
    const [heir, hb] = findHeirPda(state);
    expect(PublicKey.createProgramAddressSync([Buffer.from('heir'), state.toBuffer(), Buffer.from([hb])], PROGRAM_ID).equals(heir)).toBe(true);
  });
});
