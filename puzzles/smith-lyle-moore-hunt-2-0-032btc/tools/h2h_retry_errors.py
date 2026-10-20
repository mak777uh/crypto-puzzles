# -*- coding: utf-8 -*-
"""H2h-retry — повторная проверка слов, по которым был ERR (сеть/таймаут).

Читает лог data/h2h_<page>.log, собирает уникальные индексы из строк 'ERR #N',
прогоняет их заново через тот же оракул (контроль e3zre/albatross обязателен).
Результаты пишет в data/h2h_retry_<page>.log (NO/HIT/ERR раздельно). HIT — в
data/h2h_hits.json. Usage: python tools/h2h_retry_errors.py --page y6cd1
"""
from __future__ import annotations
import argparse, json, re, time
from pathlib import Path
import sys
sys.path.insert(0, str(Path(__file__).resolve().parent))
from h2h_bip39_probe import ask, D


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--page", default="y6cd1")
    ap.add_argument("--pause", type=float, default=0.7)
    a = ap.parse_args()
    logp = D / "data" / ("h2h_%s.log" % a.page)
    words = [w.strip() for w in (D / "data" / "bip39.txt").read_text("utf-8").splitlines() if w.strip()]
    idx = sorted({int(m.group(1)) for m in re.finditer(r"^ERR #(\d+)", logp.read_text("utf-8"), re.M)})
    out = D / "data" / ("h2h_retry_%s.log" % a.page)
    def log(s):
        with out.open("a", encoding="utf-8") as fh:
            fh.write(s + "\n")
        print(s, flush=True)
    log("== retry start %s page=%s n=%d" % (time.strftime("%Y-%m-%d %H:%M:%S"), a.page, len(idx)))
    st, code, info = ask("e3zre", "albatross")
    log("CONTROL e3zre|albatross -> %s (HTTP %s)" % (st, code))
    if st != "HIT":
        log("САМОТЕСТ НЕ ПРОЙДЕН — стоп"); return 2
    time.sleep(a.pause)
    hit = no = err = 0
    for i in idx:
        w = words[i] if i < len(words) else "?"
        s, c, inf = ask(a.page, w)
        if s == "HIT":
            hit += 1; log("HIT #%d %r %s" % (i, w, inf))
            p = D / "data" / "h2h_hits.json"
            p.write_text(json.dumps({"page": a.page, "index": i, "word": w, "payload": str(inf)[:2000]},
                                    ensure_ascii=False, indent=1), "utf-8")
        elif s == "NO":
            no += 1; log("NO #%d %r" % (i, w))
        else:
            err += 1; log("ERR #%d %r -> HTTP %s %s" % (i, w, c, inf))
        time.sleep(a.pause)
    log("== retry done: %d probes, %d HIT, %d NO, %d ERR" % (len(idx), hit, no, err))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
