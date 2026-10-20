# -*- coding: utf-8 -*-
"""H6: проба слов/фраз, полученных из открытой в H3 страницы resurface, на 7 открытых замках.

Только чтение Wix-формы; транзакций, писем и публикаций нет. HIT = пароль замка (не приватный
ключ), сохраняется в data/h6_hits.json; статусы NO/ERR различаются, ERR негативом не считается.
"""
from __future__ import annotations

import json
import sys
import time
from pathlib import Path

D = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(D / "tools"))
from h2h_bip39_probe import ask  # noqa: E402

PAGES = ["ml7yd", "zhgsm", "jcl9c", "udr8x", "pxsqo", "sodpq", "y6cd1"]
CANDS = [
    "music", "need", "love", "her", "resurface", "freshair",
    "where will you find her", "wherewillyoufindher",
]


def main() -> int:
    st, code, _ = ask("e3zre", "albatross")
    print("CONTROL e3zre|albatross -> %s (%s)" % (st, code), flush=True)
    if st != "HIT":
        print("САМОТЕСТ НЕ ПРОЙДЕН — стоп")
        return 2
    logp = D / "data" / "h6_probe.log"
    hits = []
    n_no = n_err = 0
    with logp.open("a", encoding="utf-8") as fh:
        fh.write("\n== H6 start %s cands=%d pages=%d\n" % (time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()), len(CANDS), len(PAGES)))
        for pw in CANDS:
            for pg in PAGES:
                s = c = None
                for attempt in range(5):
                    s, c, _ = ask(pg, pw)
                    if s in ("HIT", "NO"):
                        break
                    time.sleep(1.5 + attempt)
                line = "%-4s %-26s -> %s (%s)" % (pg, pw, s, c)
                fh.write(line + "\n")
                fh.flush()
                print(line, flush=True)
                if s == "HIT":
                    hits.append({"page": pg, "password": pw, "code": c})
                elif s == "NO":
                    n_no += 1
                else:
                    n_err += 1
                time.sleep(0.7)
        fh.write("== H6 done: %d NO, %d ERR, %d HIT\n" % (n_no, n_err, len(hits)))
    if hits:
        (D / "data" / "h6_hits.json").write_text(json.dumps(hits, ensure_ascii=False, indent=1), "utf-8")
    print("итог: HIT=%d NO=%d ERR=%d" % (len(hits), n_no, n_err))
    return 0


if __name__ == "__main__":
    sys.exit(main())
