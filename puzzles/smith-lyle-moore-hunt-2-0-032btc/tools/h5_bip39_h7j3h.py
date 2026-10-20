#!/usr/bin/env python3
"""H5: finish the BIP39 sweep on the open lock h7j3h (/a-rocky-beach).

State is kept in data/h5_state.json; NO/HIT/ERR are distinguished; ERR never counts as a negative.
Usage: python tools/h5_bip39_h7j3h.py --start 400 --end 1250
"""
from __future__ import annotations
import argparse, json, sys, time
from pathlib import Path
D = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(D / "tools"))
from h2h_bip39_probe import ask

PAGE = "h7j3h"

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--start", type=int, default=400)
    ap.add_argument("--end", type=int, default=1250)
    ap.add_argument("--pause", type=float, default=0.7)
    a = ap.parse_args()
    words = [w.strip() for w in (D / "data" / "bip39.txt").read_text("utf-8").splitlines() if w.strip()]
    logp = D / "data" / "h5_h7j3h.log"
    statep = D / "data" / "h5_state.json"
    def log(s):
        with logp.open("a", encoding="utf-8") as fh:
            fh.write(s + "\n")
        print(s, flush=True)
    st, code, _ = ask("e3zre", "albatross")
    log("== H5 start %s page=%s range=%d..%d CONTROL e3zre|albatross -> %s (%s)"
        % (time.strftime("%Y-%m-%d %H:%M:%S"), PAGE, a.start, a.end, st, code))
    if st != "HIT":
        log("САМОТЕСТ НЕ ПРОЙДЕН — стоп (сеть/оракул недоступны)")
        return 2
    time.sleep(a.pause)
    hit = no = err = 0
    for i in range(a.start, min(a.end, len(words))):
        w = words[i]
        for attempt in range(5):
            s, c, inf = ask(PAGE, w)
            if s in ("HIT", "NO"):
                break
            time.sleep(1.5 + attempt)
        if s == "HIT":
            hit += 1
            log("HIT #%d %r HTTP %s" % (i, w, c))
            (D / "data" / "h5_hits.json").write_text(json.dumps(
                {"page": PAGE, "index": i, "word": w, "ts": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())},
                ensure_ascii=False, indent=1), "utf-8")
            log("HIT записан, серия остановлена")
            break
        elif s == "NO":
            no += 1
            if i % 25 == 0:
                log("NO #%d %r" % (i, w))
        else:
            err += 1
            log("ERR #%d %r -> HTTP %s" % (i, w, c))
        time.sleep(a.pause)
    statep.write_text(json.dumps({"page": PAGE, "last_index": i, "next": i + 1, "hit": hit,
                                  "no": no, "err": err, "ts": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())},
                                 ensure_ascii=False, indent=1), "utf-8")
    log("== H5 done: %d probes, %d HIT, %d NO, %d ERR; next=%d" % (no + hit + err, hit, no, err, i + 1))
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
