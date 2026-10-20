import { PublicKey } from '@solana/web3.js';
import { BorshReader, bytesEqual, concatBytes, u32le, u64le } from './bytes';
import {
  DOMAIN,
  HEIR_MAX_DAYS,
  HEIR_MIN_DAYS,
  MAX_ACTIONS,
  PREFIX_LEN,
  PROGRAM_ID,
  SPL_TOKEN_PROGRAM_ID,
  TOKEN_2022_PROGRAM_ID,
} from './constants';
import { getWasm } from './wasm';

export type VaultAction =
  | { kind: 'transferSol'; to: PublicKey; lamports: bigint }
  | {
      kind: 'transferToken';
      mint: PublicKey;
      tokenProgram: PublicKey;
      /** Destination token account (this is what is signed). */
      destination: PublicKey;
      amount: bigint;
      /**
       * SDK extension, not signed: the wallet that owns `destination`. When set, the SDK checks that
       * `destination` is that owner's ATA and can create it idempotently (createDestinationAtas).
       */
      destinationOwner?: PublicKey;
    }
  | { kind: 'closeTokenAccount'; mint: PublicKey; tokenProgram: PublicKey; rentTo: PublicKey }
  /**
   * Legacy: make `heir` the vault's heir. If `inactivityDays` pass without a check-in, anyone can
   * move everything in the vault to `heir` (inherit). Creates or updates the heir record.
   */
  | { kind: 'setHeir'; heir: PublicKey; inactivityDays: number }
  /** Legacy: restart the countdown. `heir` and `inactivityDays` must be the recorded ones. */
  | { kind: 'checkIn'; heir: PublicKey; inactivityDays: number }
  /** Legacy: remove the heir (`heir` must be the recorded one); the record's rent goes back to the vault. */
  | { kind: 'clearHeir'; heir: PublicKey };

/** The Legacy actions; a payload carries at most one of them. */
export type HeirAction = Extract<VaultAction, { kind: 'setHeir' | 'checkIn' | 'clearHeir' }>;

const TAG = { transferSol: 1, transferToken: 2, closeTokenAccount: 3, setHeir: 0x10, checkIn: 0x11, clearHeir: 0x12 } as const;

export function isSupportedTokenProgram(p: PublicKey): boolean {
  return p.equals(SPL_TOKEN_PROGRAM_ID) || p.equals(TOKEN_2022_PROGRAM_ID);
}

export function isHeirAction(a: VaultAction): a is HeirAction {
  return a.kind === 'setHeir' || a.kind === 'checkIn' || a.kind === 'clearHeir';
}

/** An inactivity period a heir action may sign: a whole number of days in 30..=3650. */
export function isValidInactivityDays(days: number): boolean {
  return Number.isInteger(days) && days >= HEIR_MIN_DAYS && days <= HEIR_MAX_DAYS;
}

/** Structural checks shared by every encoder (the WASM encoder re-checks them). */
export function validateActions(actions: VaultAction[]): void {
  if (actions.length < 1 || actions.length > MAX_ACTIONS) {
    throw new Error(`An execute needs 1..${MAX_ACTIONS} actions, got ${actions.length}`);
  }
  for (const [i, a] of actions.entries()) {
    switch (a.kind) {
      case 'transferSol':
        if (a.lamports <= 0n) throw new Error(`action ${i}: lamports must be > 0`);
        break;
      case 'transferToken':
        if (a.amount <= 0n) throw new Error(`action ${i}: amount must be > 0`);
        if (!isSupportedTokenProgram(a.tokenProgram)) throw new Error(`action ${i}: unsupported token program`);
        break;
      case 'closeTokenAccount':
        if (!isSupportedTokenProgram(a.tokenProgram)) throw new Error(`action ${i}: unsupported token program`);
        break;
      case 'setHeir':
      case 'checkIn':
        if (!isValidInactivityDays(a.inactivityDays)) {
          throw new Error(`action ${i}: the inactivity period must be a whole number of days from ${HEIR_MIN_DAYS} to ${HEIR_MAX_DAYS}`);
        }
        if (a.heir.equals(PublicKey.default)) throw new Error(`action ${i}: the heir must not be the all-zero address`);
        break;
      case 'clearHeir':
        if (a.heir.equals(PublicKey.default)) throw new Error(`action ${i}: the heir must not be the all-zero address`);
        break;
      default:
        throw new Error(`action ${i}: unknown kind`);
    }
  }
  if (actions.filter(isHeirAction).length > 1) throw new Error('At most one heir action (set, check in or clear) per signature');
}

// ---- WASM (canonical) encoder ----

interface ActionJson {
  kind: VaultAction['kind'];
  to?: string;
  lamports?: string;
  mint?: string;
  tokenProgram?: string;
  destination?: string;
  amount?: string;
  rentTo?: string;
  heir?: string;
  inactivityDays?: number;
}

export function actionsToJson(actions: VaultAction[]): string {
  const arr: ActionJson[] = actions.map((a) => {
    switch (a.kind) {
      case 'transferSol':
        return { kind: a.kind, to: a.to.toBase58(), lamports: a.lamports.toString() };
      case 'transferToken':
        return {
          kind: a.kind,
          mint: a.mint.toBase58(),
          tokenProgram: a.tokenProgram.toBase58(),
          destination: a.destination.toBase58(),
          amount: a.amount.toString(),
        };
      case 'closeTokenAccount':
        return { kind: a.kind, mint: a.mint.toBase58(), tokenProgram: a.tokenProgram.toBase58(), rentTo: a.rentTo.toBase58() };
      case 'setHeir':
      case 'checkIn':
        return { kind: a.kind, heir: a.heir.toBase58(), inactivityDays: a.inactivityDays };
      case 'clearHeir':
        return { kind: a.kind, heir: a.heir.toBase58() };
    }
  });
  return JSON.stringify(arr);
}

function req(v: string | undefined, field: string): string {
  if (typeof v !== 'string') throw new Error(`decoded action is missing ${field}`);
  return v;
}

function reqDays(v: number | undefined): number {
  if (typeof v !== 'number' || !Number.isInteger(v)) throw new Error('decoded action is missing inactivityDays');
  return v;
}

export function actionsFromJson(json: string): VaultAction[] {
  const arr = JSON.parse(json) as ActionJson[];
  if (!Array.isArray(arr)) throw new Error('decode_actions did not return an array');
  return arr.map((a) => {
    switch (a.kind) {
      case 'transferSol':
        return { kind: a.kind, to: new PublicKey(req(a.to, 'to')), lamports: BigInt(req(a.lamports, 'lamports')) };
      case 'transferToken':
        return {
          kind: a.kind,
          mint: new PublicKey(req(a.mint, 'mint')),
          tokenProgram: new PublicKey(req(a.tokenProgram, 'tokenProgram')),
          destination: new PublicKey(req(a.destination, 'destination')),
          amount: BigInt(req(a.amount, 'amount')),
        };
      case 'closeTokenAccount':
        return {
          kind: a.kind,
          mint: new PublicKey(req(a.mint, 'mint')),
          tokenProgram: new PublicKey(req(a.tokenProgram, 'tokenProgram')),
          rentTo: new PublicKey(req(a.rentTo, 'rentTo')),
        };
      case 'setHeir':
      case 'checkIn':
        return { kind: a.kind, heir: new PublicKey(req(a.heir, 'heir')), inactivityDays: reqDays(a.inactivityDays) };
      case 'clearHeir':
        return { kind: a.kind, heir: new PublicKey(req(a.heir, 'heir')) };
      default:
        throw new Error(`unknown decoded action kind ${String((a as { kind: unknown }).kind)}`);
    }
  });
}

/**
 * Canonical execute payload, produced by the Rust encoder (WASM) and cross-checked against the
 * TypeScript mirror below. Requires initWasm().
 */
export function encodeActions(actions: VaultAction[]): Uint8Array {
  validateActions(actions);
  const payload = getWasm().encode_actions(actionsToJson(actions));
  const mirror = encodeActionsTs(actions);
  if (!bytesEqual(payload, mirror)) throw new Error('encoder mismatch between WASM and TypeScript (refusing to sign)');
  return payload;
}

/** Strict decode via the Rust decoder (WASM). Requires initWasm(). */
export function decodeActions(payload: Uint8Array): VaultAction[] {
  return actionsFromJson(getWasm().decode_actions(payload));
}

// ---- TypeScript mirror (cross-check + tests; the WASM encoder is the source of truth) ----

export function encodeActionsTs(actions: VaultAction[]): Uint8Array {
  validateActions(actions);
  const parts: Uint8Array[] = [Uint8Array.of(actions.length)];
  for (const a of actions) {
    switch (a.kind) {
      case 'transferSol':
        parts.push(Uint8Array.of(TAG.transferSol), a.to.toBytes(), u64le(a.lamports));
        break;
      case 'transferToken':
        parts.push(
          Uint8Array.of(TAG.transferToken),
          a.mint.toBytes(),
          a.tokenProgram.toBytes(),
          a.destination.toBytes(),
          u64le(a.amount),
        );
        break;
      case 'closeTokenAccount':
        parts.push(Uint8Array.of(TAG.closeTokenAccount), a.mint.toBytes(), a.tokenProgram.toBytes(), a.rentTo.toBytes());
        break;
      case 'setHeir':
      case 'checkIn':
        parts.push(Uint8Array.of(TAG[a.kind]), a.heir.toBytes(), u16le(a.inactivityDays));
        break;
      case 'clearHeir':
        parts.push(Uint8Array.of(TAG.clearHeir), a.heir.toBytes());
        break;
    }
  }
  return concatBytes(...parts);
}

function u16le(n: number): Uint8Array {
  if (!Number.isInteger(n) || n < 0 || n > 0xffff) throw new RangeError(`u16 out of range: ${n}`);
  return Uint8Array.of(n & 0xff, n >> 8);
}

export function decodeActionsTs(payload: Uint8Array): VaultAction[] {
  const r = new BorshReader(payload);
  const count = r.u8();
  if (count < 1 || count > MAX_ACTIONS) throw new Error('invalid action count');
  const out: VaultAction[] = [];
  for (let i = 0; i < count; i++) {
    const tag = r.u8();
    if (tag === TAG.transferSol) {
      const to = new PublicKey(r.fixed(32));
      const lamports = r.u64();
      if (lamports === 0n) throw new Error('zero lamports');
      out.push({ kind: 'transferSol', to, lamports });
    } else if (tag === TAG.transferToken) {
      const mint = new PublicKey(r.fixed(32));
      const tokenProgram = new PublicKey(r.fixed(32));
      const destination = new PublicKey(r.fixed(32));
      const amount = r.u64();
      if (amount === 0n) throw new Error('zero amount');
      if (!isSupportedTokenProgram(tokenProgram)) throw new Error('unsupported token program');
      out.push({ kind: 'transferToken', mint, tokenProgram, destination, amount });
    } else if (tag === TAG.closeTokenAccount) {
      const mint = new PublicKey(r.fixed(32));
      const tokenProgram = new PublicKey(r.fixed(32));
      const rentTo = new PublicKey(r.fixed(32));
      if (!isSupportedTokenProgram(tokenProgram)) throw new Error('unsupported token program');
      out.push({ kind: 'closeTokenAccount', mint, tokenProgram, rentTo });
    } else if (tag === TAG.setHeir || tag === TAG.checkIn) {
      const heir = new PublicKey(r.fixed(32));
      const inactivityDays = r.u16();
      if (heir.equals(PublicKey.default)) throw new Error('zero heir');
      if (!isValidInactivityDays(inactivityDays)) throw new Error('inactivity period out of range');
      out.push({ kind: tag === TAG.setHeir ? 'setHeir' : 'checkIn', heir, inactivityDays });
    } else if (tag === TAG.clearHeir) {
      const heir = new PublicKey(r.fixed(32));
      if (heir.equals(PublicKey.default)) throw new Error('zero heir');
      out.push({ kind: 'clearHeir', heir });
    } else {
      throw new Error(`unknown action tag ${tag}`);
    }
  }
  if (r.remaining() !== 0) throw new Error('trailing bytes after actions');
  if (out.filter(isHeirAction).length > 1) throw new Error('more than one heir action');
  return out;
}

/** 83-byte message prefix (MESSAGE_FORMAT §4), TypeScript mirror of message_prefix(). */
export function messagePrefixTs(
  clusterId: number,
  tag: number,
  state: PublicKey,
  rootEpoch: number,
  leafIndex: number,
  programId: PublicKey = PROGRAM_ID,
): Uint8Array {
  const p = concatBytes(
    DOMAIN,
    Uint8Array.of(clusterId),
    programId.toBytes(),
    Uint8Array.of(tag),
    state.toBytes(),
    u32le(rootEpoch),
    u32le(leafIndex),
  );
  if (p.length !== PREFIX_LEN) throw new Error('prefix length mismatch');
  return p;
}

/** Parsed view of a signed message (used to rebuild transactions for a spent leaf). */
export interface ParsedMessage {
  clusterId: number;
  programId: PublicKey;
  tag: number;
  state: PublicKey;
  rootEpoch: number;
  leafIndex: number;
  payload: Uint8Array;
}

export function parseMessage(m: Uint8Array): ParsedMessage {
  if (m.length < PREFIX_LEN || !bytesEqual(m.subarray(0, DOMAIN.length), DOMAIN)) throw new Error('not a Bunker vault v1 message');
  const r = new BorshReader(m);
  r.fixed(DOMAIN.length);
  const clusterId = r.u8();
  const programId = new PublicKey(r.fixed(32));
  const tag = r.u8();
  const state = new PublicKey(r.fixed(32));
  const rootEpoch = r.u32();
  const leafIndex = r.u32();
  return { clusterId, programId, tag, state, rootEpoch, leafIndex, payload: m.slice(PREFIX_LEN) };
}
