"""Pre-publish safety scan for the crypto-puzzle catalog (READ-ONLY, no broadcast).

Goal: before master/ becomes a PUBLIC GitHub repo, find any private key material
that is documented in the tree, derive its address(es), and check on-chain whether
live funds still sit there. Anything with a non-zero balance is a stop-condition
for publishing.

Reuses master/tools/balance_check_fast.py for the (already probed) explorer endpoints.
"""
from __future__ import annotations

import hashlib
import os
import re
import sys
import threading
from concurrent.futures import ThreadPoolExecutor

sys.path.insert(0, os.path.join(os.environ.get("PUZZLE_BASE", r"C:/Users/Admin/OneDrive/Desktop/master"), "tools"))
import balance_check_fast as bal  # noqa: E402
import coincurve  # noqa: E402

ROOT = os.environ.get("PUZZLE_BASE", r"C:/Users/Admin/OneDrive/Desktop/master")
A = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"

WIF_UNC = re.compile(r"\b5[1-9A-HJ-NP-Za-km-z]{50}\b")
WIF_CPR = re.compile(r"\b[KL][1-9A-HJ-NP-Za-km-z]{51}\b")
XPRV = re.compile(r"\b[xt]prv[1-9A-HJ-NP-Za-km-z]{100,110}\b")
KEYWORD = re.compile(r"(priv|wif|secret|приват|ключ|xprv|seed|mnemonic|сид)", re.I)
HEX64 = re.compile(r"\b(?:0x)?([0-9a-fA-F]{64})\b")

EXTS = {".md", ".txt", ".json", ".csv", ".py", ".html", ".log", ".yaml", ".yml"}
MAX_BYTES = 25 * 1024 * 1024


def b58decode(s: str):
    n = 0
    for ch in s:
        n = n * 58 + A.index(ch)
    pad = len(s) - len(s.lstrip("1"))
    try:
        raw = n.to_bytes((n.bit_length() + 7) // 8, "big")
    except ValueError:
        return None
    out = b"\x00" * pad + raw
    if len(out) < 5:
        return None
    body, chk = out[:-4], out[-4:]
    if hashlib.sha256(hashlib.sha256(body).digest()).digest()[:4] != chk:
        return None
    return body


def b58encode(b: bytes) -> str:
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


def p2pkh(priv: bytes, compressed: bool) -> str:
    pub = coincurve.PrivateKey(priv).public_key.format(compressed=compressed)
    h160 = hashlib.new("ripemd160", hashlib.sha256(pub).digest()).digest()
    payload = b"\x00" + h160
    return b58encode(payload + hashlib.sha256(hashlib.sha256(payload).digest()).digest()[:4])


def scan_files():
    """Return list of (path, line_no, kind, token)."""
    hits = []
    seen = set()
    for dirpath, dirnames, filenames in os.walk(ROOT):
        dirnames[:] = [d for d in dirnames if d not in {".git", "node_modules", "__pycache__"}]
        # GitHub-интейк (18.10.2026): сырые дампы чужих репозиториев НЕ коммитятся (.gitignore),
        # поэтому pre-publish скан их не касается — иначе дерево разрастается на десятки тысяч файлов.
        # Выжимки (GITHUB_INTAKE.md, REPO_META.json, media_index.md) по-прежнему сканируются.
        rel = os.path.relpath(dirpath, ROOT).replace("\\", "/") + "/"
        under_gh = "/data/github/" in ("/" + rel)
        prune = rel.startswith("_sources/github/") or (
            under_gh and (rel.endswith("/files/") or rel.endswith("/raw/") or rel.endswith("/wiki/")
                          or "/files__" in rel))
        if prune:
            dirnames[:] = []
            continue
        for fn in filenames:
            ext = os.path.splitext(fn)[1].lower()
            if ext not in EXTS:
                continue
            p = os.path.join(dirpath, fn)
            try:
                if os.path.getsize(p) > MAX_BYTES:
                    continue
            except OSError:
                continue
            try:
                with open(p, "r", encoding="utf-8", errors="ignore") as fh:
                    for i, line in enumerate(fh, 1):
                        for tok in set(WIF_UNC.findall(line)):
                            add(hits, seen, p, i, "WIF-uncompressed", tok)
                        for tok in set(WIF_CPR.findall(line)):
                            add(hits, seen, p, i, "WIF-compressed", tok)
                        for tok in set(XPRV.findall(line)):
                            add(hits, seen, p, i, "xprv/tprv", tok)
                        if KEYWORD.search(line):
                            for tok in set(HEX64.findall(line)):
                                add(hits, seen, p, i, "hex64-on-key-line", tok)
            except OSError as e:
                print(f"  ! unreadable {p}: {e}", file=sys.stderr)
    return hits, seen


def add(hits, seen, path, lineno, kind, token):
    rel = os.path.relpath(path, ROOT).replace("\\", "/")
    key = (kind, token)
    if key in seen:
        return
    seen.add(key)
    hits.append((rel, lineno, kind, token))


def check_btc(addr):
    res, src = bal.btc(addr)
    return res, src


def main():
    print("== 1. textual scan ==")
    hits, _ = scan_files()
    wifs = [h for h in hits if h[2].startswith("WIF")]
    others = [h for h in hits if not h[2].startswith("WIF")]
    print(f"WIF tokens: {len(wifs)}   xprv/hex64-on-key-line: {len(others)}")

    # dedupe WIFs (same key can appear in several files)
    uniq = {}
    for rel, ln, kind, tok in wifs:
        uniq.setdefault(tok, []).append(f"{rel}:{ln}")

    print("\n== 2. decode + derive (checksum-validated only) ==")
    to_check = []
    bad = 0
    for tok, where in uniq.items():
        body = b58decode(tok)
        if body is None or len(body) != 34 or body[0] != 0x80:
            bad += 1
            continue
        compressed = len(uniq) and tok[0] in "KL"
        priv = body[1:33]
        try:
            a_c = p2pkh(priv, True)
            a_u = p2pkh(priv, False)
        except Exception as e:  # noqa: BLE101
            print(f"  ! {tok[:8]}... derive failed: {e}")
            continue
        for label, addr in (("C", a_c), ("U", a_u)):
            to_check.append((tok, label, addr, where[0]))
    print(f"  decoded OK: {len(uniq) - bad}   failed checksum/format: {bad}   addresses to probe: {len(to_check)}")

    print("\n== 3. on-chain balances (blockstream, read-only) ==")
    live = []
    lock = threading.Lock()

    def worker(item):
        tok, label, addr, where = item
        res, src = check_btc(addr)
        if res is None:
            with lock:
                print(f"   ERR  {addr} ({src})")
            return
        if res["sats"] > 0:
            with lock:
                live.append((tok, label, addr, res["sats"], where))
                print(f"   LIVE {addr} {label} {res['sats']:,} sats  <- {tok[:10]}... in {where}")

    with ThreadPoolExecutor(max_workers=6) as ex:
        list(ex.map(worker, to_check))

    print(f"\n== RESULT: {len(live)} derived address(es) currently HOLD sats ==")
    for tok, label, addr, sats, where in live:
        print(f"  {addr} ({label}) {sats:,} sats   key {tok}   first seen {where}")
    if not live:
        print("  none — no live BTC balance on any key documented in the tree.")

    print(f"\n== non-WIF key-ish lines to eyeball manually: {len(others)} ==")
    for rel, ln, kind, tok in others[:40]:
        print(f"  {kind:22s} {rel}:{ln}  {tok[:24]}...")


if __name__ == "__main__":
    main()
