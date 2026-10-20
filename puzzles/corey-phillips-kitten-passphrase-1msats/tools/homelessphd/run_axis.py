# -*- coding: utf-8 -*-
"""Pre-registered passphrase axes H1/H2 from HomelessPhD/CorePhylips_CATS.

H1: each pass_list.txt line exactly as stored, only trailing '\n' removed.
H2: same lines with surrounding whitespace stripped (quote chars kept).
Dedup preserves first occurrence; empty lines are skipped.
On HIT: key/passphrase printed to stdout only (never written to repo);
repo gets only index + address + sha256(passphrase).
"""
import hashlib
import sys
import time
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from cats_oracle import make_checker, selftest, TARGET  # noqa: E402

D = Path(__file__).resolve().parents[2]
PL = D / "data" / "homelessphd" / "pass_list.txt"


def load(axis):
    raw = PL.read_text("utf-8").split("\n")
    out, seen = [], set()
    for line in raw:
        p = line if axis == "H1" else line.strip()
        if not p or p in seen:
            continue
        seen.add(p)
        out.append(p)
    return out


def run(axis):
    if not selftest():
        print("ABORT: witness failed")
        return 2
    cands = load(axis)
    check = make_checker()
    t0 = time.time()
    hits = []
    for i, p in enumerate(cands, 1):
        addr, key = check(p)
        if addr == TARGET:
            hits.append((i, p, addr, key))
            print("HIT idx=%d addr=%s key=%s pass=%r" % (i, addr, key, p), flush=True)
        if i % 100 == 0:
            print("... %d/%d" % (i, len(cands)), flush=True)
    dt = time.time() - t0
    print("axis=%s N=%d hits=%d sec=%.2f rate=%.1f/s" % (axis, len(cands), len(hits), dt, len(cands) / dt))
    out = D / "data" / "homelessphd" / ("run_%s_2026-10-19.txt" % axis)
    with out.open("w", encoding="utf-8", newline="\n") as f:
        f.write("# axis=%s candidates=%d hits=%d sec=%.2f witness=%s target=%s\n"
                % (axis, len(cands), len(hits), dt, "OK", TARGET))
        for i, p, addr, _ in hits:
            f.write("HIT index=%d address=%s pass_sha256=%s\n"
                    % (i, addr, hashlib.sha256(p.encode()).hexdigest()))
    return 0 if not hits else 1


if __name__ == "__main__":
    ax = sys.argv[1] if len(sys.argv) > 1 else "H1"
    sys.exit(run(ax))
