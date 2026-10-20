/**
 * Bunker Canary derivation (pure, browser-safe).
 *
 * This module has NO Node-only imports so the web app can import it directly
 * and let anyone re-derive the canary address in their browser.
 *
 * Derivation (see docs/CANARY.md for the byte-by-byte description):
 *
 *   seed bytes  = canonical seed file (printable ASCII + LF, 4 lines, no trailing newline)
 *   P           = RFC 9380 hash_to_curve, suite edwards25519_XMD:SHA-512_ELL2_RO_,
 *                 DST = ASCII "BUNKER-CANARY-V1", msg = seed bytes
 *   checks      = P != identity, [8]P != identity, [L]P == identity
 *   address     = base58( RFC 8032 32-byte compressed encoding of P )
 *
 * Dependencies: @noble/curves (hash-to-curve + edwards25519 arithmetic),
 * @noble/hashes (hex helpers), @scure/base (base58).
 */
import { ed25519, ed25519_hasher } from '@noble/curves/ed25519.js';
import { bytesToHex, hexToBytes } from '@noble/hashes/utils.js';
import { base58 } from '@scure/base';

/** Domain separation tag for the Bunker Canary (ASCII bytes of this string). */
export const CANARY_DST = 'BUNKER-CANARY-V1';
/** RFC 9380 suite used for the derivation. */
export const CANARY_SUITE = 'edwards25519_XMD:SHA-512_ELL2_RO_';
/** Order of the edwards25519 prime-order subgroup: 2^252 + 27742317777372353535851937790883648493. */
export const ED25519_L = 2n ** 252n + 27742317777372353535851937790883648493n;
/** Placeholder used in a seed's anchor line until the Bitcoin block is mined. */
export const PENDING = 'PENDING';
/**
 * Start of the statement of a seed that is a placeholder, not a commitment (the mainnet seed until the
 * owner publishes the real template on launch day). Every tool refuses to derive from it.
 */
export const PLACEHOLDER = 'PLACEHOLDER';

/** Thrown when bytes are not a canonical Bunker Canary v1 seed. */
export class SeedFormatError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SeedFormatError';
  }
}

/** Thrown when the seed's Bitcoin anchor is still PENDING: derivation is refused. */
export class PendingAnchorError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PendingAnchorError';
  }
}

/** Thrown when a derived point fails a safety check (should never happen). */
export class CanaryCheckError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CanaryCheckError';
  }
}

export interface CanaryChecks {
  /** P is not the identity element. */
  notIdentity: boolean;
  /** [8]P is not the identity, i.e. P is not one of the 8 small-order points. */
  notSmallOrder: boolean;
  /** [L]P is the identity, i.e. P lies in the prime-order subgroup. */
  primeOrder: boolean;
}

export interface CanaryResult {
  /** Base58 Solana address (the 32-byte compressed Edwards point). */
  address: string;
  /** Lowercase hex of the same 32 bytes. */
  pointHex: string;
  checks: CanaryChecks;
}

export interface SeedInfo {
  version: 'v1';
  network: string;
  anchorHeight: number;
  /** 64 lowercase hex chars, or null while PENDING. */
  anchorHash: string | null;
  pending: boolean;
  /** The statement starts with PLACEHOLDER: not a commitment, never derived. */
  placeholder: boolean;
  statement: string;
  /** The exact bytes that are hashed. */
  bytes: Uint8Array;
}

type EdPoint = ReturnType<typeof ed25519_hasher.hashToCurve>;

const LINE1 = 'Bunker Canary v1';
const RE_NETWORK = /^network: ([a-z0-9]+(?:-[a-z0-9]+)*)$/;
const RE_ANCHOR = /^anchor: bitcoin block ([1-9][0-9]{0,2}(?:,[0-9]{3})*) hash ([0-9a-f]{64}|PENDING)$/;
const RE_STATEMENT = /^statement: (\S(?:.*\S)?)$/;

function toSeedBytes(seed: string | Uint8Array): Uint8Array {
  if (typeof seed === 'string') return new TextEncoder().encode(seed);
  if (seed instanceof Uint8Array) return Uint8Array.from(seed);
  throw new TypeError('seed must be a string or Uint8Array');
}

/**
 * Validates a canonical v1 seed and returns its fields. Canonical form:
 * printable ASCII (0x20-0x7e) plus LF (0x0a) only, exactly four lines,
 * no CR, no BOM, no trailing newline.
 */
export function parseSeed(seed: string | Uint8Array): SeedInfo {
  const bytes = toSeedBytes(seed);
  if (bytes.length === 0) throw new SeedFormatError('seed is empty');
  for (let i = 0; i < bytes.length; i++) {
    const b = bytes[i]!;
    if (b === 0x0d) {
      throw new SeedFormatError(`seed contains a CR (0x0d) at byte ${i}; canonical seeds use LF line endings only`);
    }
    if (b !== 0x0a && (b < 0x20 || b > 0x7e)) {
      throw new SeedFormatError(
        `seed contains non-printable or non-ASCII byte 0x${b.toString(16).padStart(2, '0')} at offset ${i}`,
      );
    }
  }
  if (bytes[bytes.length - 1] === 0x0a) {
    throw new SeedFormatError('seed ends with a newline; the canonical seed has no trailing newline');
  }
  const lines = new TextDecoder('ascii').decode(bytes).split('\n');
  if (lines.length !== 4) throw new SeedFormatError(`seed must have exactly 4 lines, found ${lines.length}`);
  if (lines[0] !== LINE1) throw new SeedFormatError(`line 1 must be '${LINE1}'`);
  const net = RE_NETWORK.exec(lines[1]!);
  if (!net) throw new SeedFormatError("line 2 must be 'network: <name>' (lowercase letters, digits, hyphens)");
  const anchor = RE_ANCHOR.exec(lines[2]!);
  if (!anchor) {
    throw new SeedFormatError(
      "line 3 must be 'anchor: bitcoin block <height with comma separators> hash <64 lowercase hex | PENDING>'",
    );
  }
  const stmt = RE_STATEMENT.exec(lines[3]!);
  if (!stmt) throw new SeedFormatError("line 4 must be 'statement: <text>'");
  const pending = anchor[2] === PENDING;
  return {
    version: 'v1',
    network: net[1]!,
    anchorHeight: Number(anchor[1]!.replaceAll(',', '')),
    anchorHash: pending ? null : anchor[2]!,
    pending,
    placeholder: stmt[1]!.startsWith(PLACEHOLDER),
    statement: stmt[1]!,
    bytes,
  };
}

/** Formats a block height with comma thousands separators, as written in seed files (971000 -> "971,000"). */
export function formatHeight(height: number): string {
  return String(height).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/** RFC 9380 hash_to_curve (edwards25519_XMD:SHA-512_ELL2_RO_) of raw bytes. */
export function hashToEdwards(msg: Uint8Array, dst: string | Uint8Array = CANARY_DST): EdPoint {
  return ed25519_hasher.hashToCurve(msg, { DST: dst });
}

/** The three canary checks, computed explicitly (not trusting the hasher's cofactor clearing). */
export function checkPoint(point: EdPoint): CanaryChecks {
  if (!point.is0()) point.assertValidity(); // noble rejects ZERO in assertValidity; identity is handled by the checks below
  const eight = point.double().double().double();
  // [L]P computed as [L-1]P + P because noble rejects scalars >= L.
  const lTimes = point.multiplyUnsafe(ED25519_L - 1n).add(point);
  return {
    notIdentity: !point.is0(),
    notSmallOrder: !eight.is0(),
    primeOrder: lTimes.is0(),
  };
}

/** Decodes a 32-byte compressed Edwards point (bytes or hex) and runs {@link checkPoint}. */
export function checkEncodedPoint(encoded: Uint8Array | string): CanaryChecks {
  const bytes = typeof encoded === 'string' ? hexToBytes(encoded) : encoded;
  return checkPoint(ed25519.Point.fromBytes(bytes));
}

/** Throws CanaryCheckError unless all checks pass. */
export function assertCanaryPoint(point: EdPoint): CanaryChecks {
  const checks = checkPoint(point);
  const failed = Object.entries(checks)
    .filter(([, ok]) => !ok)
    .map(([name]) => name);
  if (failed.length) throw new CanaryCheckError(`derived point failed checks: ${failed.join(', ')}`);
  return checks;
}

/**
 * Derive the Bunker Canary from a canonical seed (the exact bytes of a seed file).
 * Refuses seeds whose anchor hash is still PENDING, and PLACEHOLDER seeds.
 */
export function deriveCanary(seed: string | Uint8Array): CanaryResult {
  const info = parseSeed(seed);
  if (info.placeholder) {
    throw new PendingAnchorError(
      `the ${info.network} seed is a PLACEHOLDER, not a commitment: the owner replaces it on launch day ` +
        `(docs/CANARY.md); its anchor hash is ${info.pending ? PENDING : 'filled in, but the statement is still the placeholder'}`,
    );
  }
  if (info.pending) {
    throw new PendingAnchorError(
      `anchor hash for bitcoin block ${formatHeight(info.anchorHeight)} is PENDING; ` +
        `the canary for ${info.network} cannot be derived until the block is mined and its hash is filled in`,
    );
  }
  const point = hashToEdwards(info.bytes, CANARY_DST);
  const checks = assertCanaryPoint(point);
  const enc = point.toBytes();
  return { address: base58.encode(enc), pointHex: bytesToHex(enc), checks };
}
