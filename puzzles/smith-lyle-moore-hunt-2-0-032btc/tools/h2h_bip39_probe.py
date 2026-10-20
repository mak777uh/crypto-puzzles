# -*- coding: utf-8 -*-
"""H2h — чанковый BIP39-свип замка Glimmer (2026-10-18, Qoder Desktop).

Предрегистрировано в LOG.md 16:52Z. Закрывает документированную дыру: свип
y6cd1 остановился на #0. Список — стандартный BIP39 (data/bip39.txt, 2048).
Строго последовательно, пауза 0.7 с, ретраи 429/5xx, контроль e3zre/albatross
перед каждым чанком. Состояние (next index) — data/h2h_state.json, лог —
data/h2h_<page>.log, HIT — data/h2h_hits.json (и серия останавливается).

Usage: python tools/h2h_bip39_probe.py --page y6cd1 --chunk 500
"""
from __future__ import annotations

import argparse
import json
import os
import time
import urllib.error
import urllib.request
from pathlib import Path

D = Path(__file__).resolve().parents[1]
URL = "https://site-pages.wix.com/_api/wix-public-html-info-webapp/resolve_protected_page_urls"
META = "13cab6fc-e004-4514-aab0-a7cf702047f9"
SITE = "b8aa9fe0-61db-4696-8909-9dd877606aa4"
UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/124.0 Safari/537.36")


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


def load_state():
    p = D / "data" / "h2h_state.json"
    if p.exists():
        return json.loads(p.read_text("utf-8"))
    return {}


def save_state(st):
    p = D / "data" / "h2h_state.json"
    tmp = p.with_suffix(".tmp")
    tmp.write_text(json.dumps(st, indent=1), "utf-8")
    os.replace(tmp, p)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--page", default="y6cd1")
    ap.add_argument("--chunk", type=int, default=500)
    ap.add_argument("--pause", type=float, default=0.7)
    a = ap.parse_args()

    words = [w.strip() for w in (D / "data" / "bip39.txt").read_text("utf-8").splitlines() if w.strip()]
    assert len(words) == 2048, len(words)
    st = load_state()
    page = st.setdefault(a.page, {"next": 0, "hits": []})
    logp = D / "data" / ("h2h_%s.log" % a.page)

    def log(line):
        with logp.open("a", encoding="utf-8") as fh:
            fh.write(line + "\n")
        print(line, flush=True)

    log("== chunk start %s page=%s next=%d chunk=%d" %
        (time.strftime("%Y-%m-%d %H:%M:%S"), a.page, page["next"], a.chunk))

    stt, code, info = ask("e3zre", "albatross")
    log("CONTROL e3zre | 'albatross' -> %s (HTTP %s) %s" % (stt, code, str(info)[:100]))
    if stt != "HIT":
        log("САМОТЕСТ НЕ ПРОЙДЕН — стоп, чанк не засчитан")
        return 2
    time.sleep(a.pause)

    end = min(page["next"] + a.chunk, 2048)
    n_hit = n_no = n_err = 0
    for i in range(page["next"], end):
        w = words[i]
        s, code, info = ask(a.page, w)
        if s == "HIT":
            n_hit += 1
            page["hits"].append({"index": i, "word": w, "payload": str(info)[:2000]})
            hits = D / "data" / "h2h_hits.json"
            hits.write_text(json.dumps(st, ensure_ascii=False, indent=1), "utf-8")
            log("HIT #%d %r %s" % (i, w, info))
        elif s == "NO":
            n_no += 1
        else:
            n_err += 1
            log("ERR #%d %r -> HTTP %s %s" % (i, w, code, info))
        page["next"] = i + 1
        if (i + 1 - (end - a.chunk)) % 20 == 0:
            save_state(st)
        time.sleep(a.pause)
    save_state(st)
    log("== chunk done: %d probes, %d HIT, %d NO, %d ERR; next=%d/2048" %
        (n_no + n_hit + n_err, n_hit, n_no, n_err, page["next"]))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
