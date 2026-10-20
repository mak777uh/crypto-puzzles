// FileLedger: the CLI's leaf ledger at ~/.bunker/ledger.json (0600, directory 0700).
// Writes are atomic and durable (temp file + fsync + rename + directory fsync) and serialised
// across processes with a lock file, so two concurrent `bunker` invocations can never hand out
// the same leaf.
//
// Lock policy (`<ledger>.lock`):
// - Taken with an exclusive create (O_EXCL), holding {pid, host, token, at}. Released only by its
//   owner (token checked), so a process never deletes a lock it does not hold.
// - Taken over only when its holder is provably gone: same host and that pid is not running, or the
//   file has no readable owner (mid-create, or left by an older CLI) and is older than 30 s. A live
//   pid (even a suspended one) or a lock from another host is never taken over: after waiting, the
//   command fails and says which file to delete once no other bunker command is running.
// - Takeovers go one at a time through `<ledger>.lock.break` (exclusive create), and re-check the
//   lock under it, so two processes that both saw a stale lock cannot remove each other's fresh one.

import { randomBytes } from 'node:crypto';
import {
  closeSync,
  existsSync,
  fstatSync,
  fsyncSync,
  mkdirSync,
  openSync,
  readFileSync,
  renameSync,
  unlinkSync,
  writeSync,
} from 'node:fs';
import { homedir, hostname } from 'node:os';
import { dirname, join } from 'node:path';
import { JsonLedger } from '@bunker/sdk';
import type { LedgerEntry, MarkSpentExtra } from '@bunker/sdk';
import type { PublicKey } from '@solana/web3.js';
import { parseJsonFile } from './json-file';

export const defaultLedgerPath = (): string => join(homedir(), '.bunker', 'ledger.json');

/** How long to wait for another process's lock before giving up. */
const LOCK_WAIT_MS = 10_000;
/** A lock file with no readable owner counts as abandoned after this long. */
const LOCK_UNREADABLE_STALE_MS = 30_000;
const LOCK_POLL_MS = 25;
const sleepSync = (ms: number) => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
const errCode = (e: unknown) => (e as NodeJS.ErrnoException).code;

interface LockOwner {
  pid: number;
  host: string;
  token: string;
  at: number;
}

/** A lock file as read: its owner (null if unreadable) and identity (inode + mtime). */
interface HeldLock {
  owner: LockOwner | null;
  ino: number;
  mtimeMs: number;
}

function readLock(path: string): HeldLock | null {
  let fd: number;
  try {
    fd = openSync(path, 'r');
  } catch (e) {
    if (errCode(e) === 'ENOENT') return null;
    throw e;
  }
  try {
    const st = fstatSync(fd);
    let owner: LockOwner | null = null;
    try {
      const v = JSON.parse(readFileSync(fd, 'utf8')) as Partial<LockOwner> | null;
      if (v && Number.isInteger(v.pid) && v.pid! > 0 && typeof v.host === 'string' && typeof v.token === 'string') {
        owner = { pid: v.pid!, host: v.host, token: v.token, at: typeof v.at === 'number' ? v.at : st.mtimeMs };
      }
    } catch {
      /* being written right now, or an older CLI's empty lock file */
    }
    return { owner, ino: st.ino, mtimeMs: st.mtimeMs };
  } finally {
    closeSync(fd);
  }
}

function pidRunning(pid: number): boolean {
  try {
    process.kill(pid, 0);
    return true;
  } catch (e) {
    return errCode(e) === 'EPERM'; // exists, owned by someone else
  }
}

/** True only when the lock's holder is provably gone (see the policy at the top). */
function isAbandoned(l: HeldLock): boolean {
  if (!l.owner) return Date.now() - l.mtimeMs > LOCK_UNREADABLE_STALE_MS;
  if (l.owner.host !== hostname()) return false; // cannot check a pid on another machine
  return !pidRunning(l.owner.pid);
}

const sameLock = (a: HeldLock, b: HeldLock) => a.ino === b.ino && a.mtimeMs === b.mtimeMs && a.owner?.token === b.owner?.token;

/** Exclusive create; false if the lock exists. */
function createLock(path: string, owner: LockOwner): boolean {
  let fd: number;
  try {
    fd = openSync(path, 'wx', 0o600);
  } catch (e) {
    if (errCode(e) === 'EEXIST') return false;
    throw e;
  }
  try {
    writeSync(fd, JSON.stringify(owner));
  } catch (e) {
    closeSync(fd);
    try {
      unlinkSync(path);
    } catch {
      /* nothing to clean up */
    }
    throw e;
  }
  closeSync(fd);
  return true;
}

/** fsync a directory so a rename in it survives power loss. Some platforms refuse; that is fine. */
function fsyncDir(dir: string): void {
  let fd: number | undefined;
  try {
    fd = openSync(dir, 'r');
    fsyncSync(fd);
  } catch (e) {
    if (!['EISDIR', 'EPERM', 'EINVAL', 'ENOTSUP'].includes(errCode(e) ?? '')) throw e;
  } finally {
    if (fd !== undefined) closeSync(fd);
  }
}

export interface FileLedgerOptions {
  /** How long to wait for a lock held by another process (default 10 s). */
  lockWaitMs?: number;
}

export class FileLedger extends JsonLedger {
  readonly path: string;
  private readonly lockWaitMs: number;

  constructor(path: string = defaultLedgerPath(), opts: FileLedgerOptions = {}) {
    super();
    this.path = path;
    this.lockWaitMs = opts.lockWaitMs ?? LOCK_WAIT_MS;
    mkdirSync(dirname(path), { recursive: true, mode: 0o700 });
  }

  protected load(): Record<string, LedgerEntry> {
    if (!existsSync(this.path)) return {};
    const raw = readFileSync(this.path, 'utf8');
    if (!raw.trim()) return {};
    // Fixed message: never quote the file (it may be a seed file passed as --ledger by mistake).
    const parsed = parseJsonFile(raw, `${this.path}: not a leaf ledger (not valid JSON; refusing to sign)`) as {
      version?: number;
      entries?: Record<string, LedgerEntry>;
    } | null;
    if (typeof parsed !== 'object' || parsed === null || parsed.version !== 1 || typeof parsed.entries !== 'object' || parsed.entries === null) {
      throw new Error(`${this.path}: unrecognised ledger format (refusing to sign)`);
    }
    return parsed.entries;
  }

  protected save(entries: Record<string, LedgerEntry>): void {
    const tmp = `${this.path}.${process.pid}.tmp`;
    const fd = openSync(tmp, 'w', 0o600);
    try {
      writeSync(fd, JSON.stringify({ version: 1, entries }, null, 1));
      fsyncSync(fd);
    } finally {
      closeSync(fd);
    }
    renameSync(tmp, this.path);
    // The rename lives in the directory: without this a power loss can bring back the old ledger,
    // which would hand out a leaf that already signed.
    fsyncDir(dirname(this.path));
  }

  private get lockPath(): string {
    return `${this.path}.lock`;
  }

  private withLock<T>(fn: () => T): T {
    const lock = this.lockPath;
    const me: LockOwner = { pid: process.pid, host: hostname(), token: randomBytes(16).toString('hex'), at: Date.now() };
    const deadline = Date.now() + this.lockWaitMs;
    for (;;) {
      if (createLock(lock, me)) break;
      const held = readLock(lock);
      if (held === null) continue; // released in between: try again now
      if (isAbandoned(held) && this.breakLock(held)) continue;
      if (Date.now() >= deadline) throw new Error(this.lockedMessage(held));
      sleepSync(LOCK_POLL_MS);
    }
    try {
      return fn();
    } finally {
      try {
        if (readLock(lock)?.owner?.token === me.token) unlinkSync(lock);
      } catch {
        /* already gone */
      }
    }
  }

  /** Remove an abandoned lock unless it changed since it was judged abandoned. One breaker at a time. */
  private breakLock(seen: HeldLock): boolean {
    const breaker = `${this.lockPath}.break`;
    try {
      closeSync(openSync(breaker, 'wx', 0o600));
    } catch (e) {
      if (errCode(e) === 'EEXIST') return false;
      throw e;
    }
    try {
      const now = readLock(this.lockPath);
      if (now === null) return true;
      if (!sameLock(now, seen) || !isAbandoned(now)) return false;
      unlinkSync(this.lockPath);
      return true;
    } finally {
      try {
        unlinkSync(breaker);
      } catch {
        /* already gone */
      }
    }
  }

  private lockedMessage(held: HeldLock): string {
    const o = held.owner;
    const who = o ? `pid ${o.pid}${o.host !== hostname() ? ` on ${o.host}` : ''} since ${new Date(o.at).toISOString()}` : 'owner unknown';
    const files = [this.lockPath, ...(existsSync(`${this.lockPath}.break`) ? [`${this.lockPath}.break`] : [])].join(' and ');
    return `ledger is locked by another process (${who}). If you are sure no other bunker command is running, delete ${files}`;
  }

  override markSpent(
    state: PublicKey,
    epoch: number,
    leaf: number,
    messageHash: Uint8Array,
    signedPayload: Uint8Array,
    extra?: MarkSpentExtra,
  ): void {
    this.withLock(() => super.markSpent(state, epoch, leaf, messageHash, signedPayload, extra));
  }

  /** `root` (the signing key's root) also floors the leaf at that key's highest leaf in any vault. */
  override nextFree(state: PublicKey, epoch: number, chainNextLeaf: number, root?: Uint8Array): number {
    return this.withLock(() => super.nextFree(state, epoch, chainNextLeaf, root));
  }
}
