"""Rigorous check: 64-hex private-key candidates in human-written notes (md/txt/log/csv/py)
-> derive BTC (C/U) and ETH addresses -> report only addresses that currently HOLD funds.
Read-only; no broadcast, no spending. Uses master/tools/balance_check_fast.py endpoints.
"""
import hashlib
import os
import re
import sys
import threading
from concurrent.futures import ThreadPoolExecutor

sys.path.insert(0, os.path.join(os.environ.get("PUZZLE_BASE", r"C:/Users/Admin/OneDrive/Desktop/master"), "tools"))
import balance_check_fast as bal  # noqa: E402
import coincurve  # noqa: E402
from Crypto.Hash import keccak  # noqa: E402

ROOT = os.environ.get("PUZZLE_BASE", r"C:/Users/Admin/OneDrive/Desktop/master")
A = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
HEX64 = re.compile(r"\b(?:0x)?([0-9a-fA-F]{64})\b")
KEYWORD = re.compile(r"(private key|priv[- ]?key|приватн\w* ключ|secret key|ключ\s*\(?\s*priv|wif)", re.I)
EXCLUDE = re.compile(r"^(0{64}|f{64})$", re.I)
EXTS = {".md", ".txt", ".log", ".csv", ".py"}

cands = {}


def b58encode(b):
    n = int.from_bytes(b, "big")
    s = ""
    while n:
        n, r = divmod(n, 58)
        s = A[r] + s
    for c in b:
        if c == 0:
            s = "1" + s
        else:
            break
    return s


def btc_addr(priv, compressed):
    pub = coincurve.PrivateKey(priv).public_key.format(compressed=compressed)
    h = hashlib.new("ripemd160", hashlib.sha256(pub).digest()).digest()
    p = b"\x00" + h
    return b58encode(p + hashlib.sha256(hashlib.sha256(p).digest()).digest()[:4])


def eth_addr(priv):
    pub = coincurve.PrivateKey(priv).public_key.format(compressed=False)[1:]
    k = keccak.new(digest_bits=256)
    k.update(pub)
    return "0x" + k.hexdigest()[-40:]


for dp, dn, fns in os.walk(ROOT):
    dn[:] = [d for d in dn if d not in {".git", "__pycache__", "node_modules"}]
    for fn in fns:
        if os.path.splitext(fn)[1].lower() not in EXTS:
            continue
        p = os.path.join(dp, fn)
        try:
            if os.path.getsize(p) > 25 * 1024 * 1024:
                continue
            with open(p, "r", encoding="utf-8", errors="ignore") as fh:
                for i, line in enumerate(fh, 1):
                    if len(line) > 4000:   # minified / dump line -> not human notes
                        continue
                    if not KEYWORD.search(line):
                        continue
                    for h in HEX64.findall(line):
                        if EXCLUDE.match(h):
                            continue
                        rel = os.path.relpath(p, ROOT).replace("\\", "/")
                        cands.setdefault(h.lower(), []).append(f"{rel}:{i}")
        except OSError:
            pass

print(f"hex64 private-key candidates in human notes: {len(cands)}")
probe = []      # (addr, chain, key, where)
for h, where in cands.items():
    priv = bytes.fromhex(h)
    probe.append((btc_addr(priv, True), "BTC-C", h, where[0]))
    probe.append((btc_addr(priv, False), "BTC-U", h, where[0]))
    probe.append((eth_addr(priv), "ETH", h, where[0]))

live = []
lock = threading.Lock()


def worker(item):
    addr, chain, key, where = item
    if chain.startswith("BTC"):
        res, src = bal.btc(addr)
        if res is None:
            return
        sats = res["sats"]
        if sats > 0:
            with lock:
                live.append((chain, addr, sats, "sats", key, where))
                print(f"  LIVE {chain} {addr} {sats:,} sats  key {key[:12]}...  {where}")
    else:
        res, src = bal.evm(addr)
        if res is None:
            return
        if res["wei"] > 0:
            with lock:
                live.append(("ETH", addr, res["wei"] / 1e18, "ETH", key, where))
                print(f"  LIVE ETH {addr} {res['wei']/1e18:.6f} ETH  key {key[:12]}...  {where}")


with ThreadPoolExecutor(max_workers=6) as ex:
    list(ex.map(worker, probe))

print(f"\nprobes: {len(probe)}   LIVE funded addresses from documented key material: {len(live)}")
if not live:
    print("CLEAN: publishing the tree does not expose a key controlling live funds.")
for row in live:
    print("  ", row)
