"""Parallel exact-address checker for Arweave Puzzle #3.

Uses the certified oracle.check() from oracle.py unchanged; only distributes
independent candidates over CPU cores. One candidate -> one oracle check, so a
MATCH here is exactly the oracle's MATCH.

Usage:
  python parallel_check.py --selftest
  python parallel_check.py FILE [--workers 12] [--progress]
  cat cands.txt | python parallel_check.py - 

Prints MATCH <address> <candidate> for every exact target hit; exits 0 if any
match, 1 otherwise.
"""
import os
import sys
import time
import multiprocessing as mp

HERE = os.path.dirname(os.path.abspath(__file__))
if HERE not in sys.path:
    sys.path.insert(0, HERE)
import oracle  # noqa: E402


def _check_one(cand):
    try:
        ok, addr = oracle.check(cand)
    except Exception as exc:  # keep the run going; report the anomaly
        return cand, "ERROR:%s" % exc
    if ok:
        return cand, "MATCH:%s" % addr
    return cand, None


def main(argv):
    if len(argv) < 2:
        print(__doc__, file=sys.stderr)
        return 2
    if argv[1] == "--selftest":
        return 0 if oracle.selftest() else 1

    src = argv[1]
    workers = 12
    progress = "--progress" in argv
    if "--workers" in argv:
        workers = int(argv[argv.index("--workers") + 1])

    if src == "-":
        cands = [line.rstrip("\n") for line in sys.stdin if line.strip()]
    else:
        with open(src, "r", encoding="utf-8") as fh:
            cands = [line.rstrip("\n") for line in fh if line.strip()]

    # stable de-duplication, preserve order
    seen = set()
    uniq = []
    for c in cands:
        if c not in seen:
            seen.add(c)
            uniq.append(c)

    t0 = time.time()
    found = False
    done = 0
    with mp.Pool(processes=workers) as pool:
        for cand, res in pool.imap_unordered(_check_one, uniq, chunksize=4):
            done += 1
            if res and res.startswith("MATCH:"):
                print("MATCH %s %s" % (res.split(":", 1)[1], cand), flush=True)
                found = True
            elif res and res.startswith("ERROR:"):
                print("ERROR %s %s" % (cand, res), file=sys.stderr, flush=True)
            if progress and done % 100 == 0:
                el = time.time() - t0
                print("# %d/%d  %.1fs  %.2f/s" % (done, len(uniq), el, done / el),
                      file=sys.stderr, flush=True)
    el = time.time() - t0
    print("# done %d unique in %.1fs (%.2f/s, %d workers)"
          % (len(uniq), el, len(uniq) / el, workers), file=sys.stderr, flush=True)
    return 0 if found else 1


if __name__ == "__main__":
    sys.exit(main(sys.argv))
