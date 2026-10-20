#!/usr/bin/env python3
"""Сверка реестра open-crypto-puzzles (свежий puzzles.json) с нашим каталогом.

Зачем: Илья просит бегать по списку и собирать инфу там, где мы ничего не трогали.
Наш каталог строился из OCP-зеркала от 19644e58 (17.10 23:38Z). Если куратор добавил
новую запись с ЖИВЫМ балансом, у нас под неё может не быть папки вовсе = свободная
цель, по которой никто в базе ещё не работал.

Только GET. Ничего не пишет в puzzles/, кроме отчёта в reports/.
"""
from __future__ import annotations

import json
import os
import re
import urllib.request

M = r"C:\Users\Admin\OneDrive\Desktop\master"
RAW = "https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/puzzles.json"
CACHE = os.path.join(M, "_sources", "ocp_sync_2026-10-19", "puzzles.json")
CAT = os.path.join(M, "MASTER_CATALOG.md")
OUT = os.path.join(M, "reports", "data_ocp_vs_catalog_2026-10-19.json")
UA = {"User-Agent": "Mozilla/5.0 (catalog duty; read-only)"}


def get(url, timeout=40):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=timeout) as f:
        return f.read()


def live_btc(addr):
    """Баланс в сатах по bitcoin-адресу; для не-BTC возвращает None."""
    if not re.match(r"^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,90}$", addr or ""):
        return None
    try:
        j = json.loads(get("https://blockstream.info/api/address/" + addr))
        cs = j["chain_stats"]
        return int(cs["funded_txo_sum"]) - int(cs["spent_txo_sum"]), int(cs["tx_count"])
    except Exception as e:  # noqa: BLE001
        return ("err", type(e).__name__)


def main():
    if os.path.exists(CACHE) and os.path.getsize(CACHE) > 1000:
        raw = open(CACHE, "rb").read()
    else:
        raw = get(RAW)
        os.makedirs(os.path.dirname(CACHE), exist_ok=True)
        open(CACHE, "wb").write(raw)
    data = json.loads(raw.decode("utf-8"))
    items = data.get("puzzles", data if isinstance(data, list) else [])
    print("puzzles.json", len(raw), "байт, записей:", len(items))

    folders = set(os.listdir(os.path.join(M, "puzzles")))
    solved = set()
    sp = os.path.join(M, "puzzles", "..", "solved")
    if os.path.isdir(sp):
        solved = set(os.listdir(sp))
    cattxt = open(CAT, encoding="utf-8", errors="replace").read() if os.path.exists(CAT) else ""

    rows, missing = [], []
    for it in items:
        slug = it.get("slug") or it.get("id") or "?"
        st = (it.get("status") or "").lower()
        addrs = []
        for a in it.get("addresses", []) or []:
            ad = a.get("address") if isinstance(a, dict) else a
            if ad:
                addrs.append(ad)
        insolved = any(slug.split("-")[0] in s and slug[:12] in s for s in solved) or slug in solved
        infolder = slug in folders or os.path.isdir(os.path.join(M, "puzzles", slug))
        incat = slug in cattxt
        balances = []
        if st in ("open", "watch", "unclaimed"):
            for ad in addrs[:5]:
                balances.append((ad, live_btc(ad)))
        live = [b for b in balances if isinstance(b[1], tuple) and b[1][0] > 0]
        rows.append({"slug": slug, "status": st, "tier": it.get("tier"),
                     "folder": infolder, "in_master_catalog": incat,
                     "live": [(a, v[0]) for a, v in live],
                     "checked": len(balances)})
        if live and not infolder:
            missing.append((slug, it.get("tier"), live))

    print("\n=== записей в реестре:", len(rows))
    print("=== живые призы БЕЗ папки в нашем каталоге:")
    for m in missing:
        print("   ", m[0], "|", m[1], "|", m[2])
    if not missing:
        print("    (нет — все живые призы реестра уже покрыты папками)")
    print("\n=== статусы папок: нет в папках, но живые:", len(missing))
    n_open_live = sum(1 for r in rows if r["live"])
    print("записей реестра с живым BTC-балансом:", n_open_live)
    print("из них без нашей папки:", len(missing))
    print("из них с папкой-дублем вне каталога (в solved/):",
          sum(1 for r in rows if not r["in_master_catalog"] and r["live"]))
    out = {"fetched_utc": "2026-10-19T19:05Z", "records": len(rows),
           "live_records": n_open_live, "missing_folders": missing,
           "rows": [r for r in rows if r["live"]]}
    tmp = OUT + ".tmp"
    open(tmp, "w", encoding="utf-8").write(json.dumps(out, ensure_ascii=False, indent=1))
    os.replace(tmp, OUT)
    print("отчёт:", OUT, os.path.getsize(OUT), "байт")


if __name__ == "__main__":
    main()
