# -*- coding: utf-8 -*-
"""H2g — закрытие 429-дыр Glimmer (2026-10-18, Qoder Desktop).

Предрегистрировано в LOG.md 16:50Z. Не перебор: только строки, которые по
документированным причинам (threaded 429) ни разу не получили ответа оракула.

(а) zhgsm x 29 BIP39-слов из HANDOFF §0.4 (lower + Title Case);
(б) пароли-повторы Hunt #1 / сайта x zhgsm, jcl9c, y6cd1 (без уже
    сертифицированных в H2a ffffffffff/01271967).

Контроль: e3zre + albatross -> HIT, иначе прогон не имеет силы.
Строго последовательно, 0.6 с, ретраи 429/5xx, NO и ERR различаются.
"""
from __future__ import annotations

import json
import time
import urllib.error
import urllib.request
from pathlib import Path

D = Path(__file__).resolve().parents[1]
OUT = D / "data" / "h2g_gap_probe.log"
URL = "https://site-pages.wix.com/_api/wix-public-html-info-webapp/resolve_protected_page_urls"
META = "13cab6fc-e004-4514-aab0-a7cf702047f9"
SITE = "b8aa9fe0-61db-4696-8909-9dd877606aa4"
UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/124.0 Safari/537.36")

ZHGSM_WORDS = [
    "love", "lumber", "luxury", "lyrics", "machine", "magnet", "mammal",
    "man", "mandate", "mansion", "maple", "margin", "marine", "market",
    "marriage", "mask", "match", "measure", "message", "monitor", "monkey",
    "museum", "north", "nose", "ocean", "opera", "oven", "six", "sniff",
]
REUSE = ["777", "666", "FFFFFFFFFFF", "north64", "wavebreaker7109",
         "witchoftheeast", "east64", "escape"]
LOCKS = ["zhgsm", "jcl9c", "y6cd1"]


def ask(pid: str, pw: str, tries: int = 5):
    body = json.dumps({"metaSiteId": META, "siteId": SITE,
                       "pageId": pid, "password": pw}).encode()
    last = ""
    for a in range(tries):
        req = urllib.request.Request(URL, data=body, headers={
            "Content-Type": "application/json",
            "Origin": "https://www.smithlylemoore.com",
            "Referer": "https://www.smithlylemoore.com/",
            "User-Agent": UA})
        try:
            with urllib.request.urlopen(req, timeout=20) as r:
                d = json.loads(r.read())
            st = "HIT" if d.get("success") else "NO"
            return st, r.status, (d.get("payload") or d.get("errorCode") or "")
        except urllib.error.HTTPError as e:
            if e.code == 403:
                return "NO", 403, "403"
            last = "HTTP %d" % e.code
            if e.code in (429, 500, 502, 503, 504):
                time.sleep(3 + 3 * a)
                continue
            return "ERR", e.code, last
        except Exception as e:  # noqa: BLE001
            last = repr(e)[:120]
            time.sleep(2 + 2 * a)
    return "ERR", 0, last


def main():
    lines = ["h2g gap probe %s" % time.strftime("%Y-%m-%d %H:%M:%S")]
    st, code, info = ask("e3zre", "albatross")
    lines.append("CONTROL e3zre | 'albatross' -> %s (HTTP %s) %s" % (st, code, str(info)[:120]))
    if st != "HIT":
        lines.append("САМОТЕСТ НЕ ПРОЙДЕН — стоп, негативы не имеют силы")
        OUT.write_text("\n".join(lines) + "\n", encoding="utf-8")
        print(lines[-1])
        return
    time.sleep(0.6)

    probes = []
    for w in ZHGSM_WORDS:
        probes.append(("zhgsm", w, "bip39-lower"))
        probes.append(("zhgsm", w.capitalize(), "bip39-title"))
    for pw in REUSE:
        for pid in LOCKS:
            probes.append((pid, pw, "reuse"))

    hits = []
    n_no = n_err = 0
    for pid, pw, kind in probes:
        st, code, info = ask(pid, pw)
        if st == "HIT":
            hits.append((pid, pw, kind, info))
            print("HIT %s %r %s" % (pid, pw, info), flush=True)
        elif st == "NO":
            n_no += 1
        else:
            n_err += 1
            print("ERR %s %r -> HTTP %s %s" % (pid, pw, code, info), flush=True)
        lines.append("PROBE %s | %r | %s -> %s (HTTP %s) %s"
                     % (pid, pw, kind, st, code, str(info)[:200]))
        time.sleep(0.6)

    lines.append("итог: %d probes, %d HIT, %d NO, %d ERR"
                 % (len(probes), len(hits), n_no, n_err))
    if hits:
        (D / "data" / "h2g_hits.json").write_text(
            json.dumps(hits, ensure_ascii=False, indent=1), encoding="utf-8")
    OUT.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(lines[-1])


if __name__ == "__main__":
    main()
