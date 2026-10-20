#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Скан балансов BTC-адресов ТОЛЬКО по активным пазлам (master/puzzles/*/README.md).

Цель: найти пазлы, которые (а) ещё в puzzles/ (не решены нами) и (б) имеют живой баланс.
Только чтение. explorer: blockstream.info (mempool.space с этой машины недоступен).
"""
from __future__ import annotations

import glob
import io
import json
import os
import re
import ssl
import urllib.request
from concurrent.futures import ThreadPoolExecutor

BASE = r"C:\Users\Admin\OneDrive\Desktop\master"
CTX = ssl.create_default_context()
UA = {"User-Agent": "Mozilla/5.0 (balance scan)"}

BTC = re.compile(r"\b(?:bc1[023456789acdefghjklmnpqrstuvwxyz]{11,71}|[13][a-km-zA-HJ-NP-Z1-9]{25,34})\b")
SKIP = re.compile(r"(data[\\/]|_archive|dead-ends-registry)")


def get(url: str, timeout: int = 25) -> str:
    req = urllib.request.Request(url, headers=UA)
    return urllib.request.urlopen(req, timeout=timeout, context=CTX).read().decode("utf-8", "replace")


def bal(addr: str):
    try:
        j = json.loads(get("https://blockstream.info/api/address/" + addr))
        cs, ms = j["chain_stats"], j["mempool_stats"]
        return (cs["funded_txo_sum"] - cs["spent_txo_sum"],
                cs["tx_count"], cs["spent_txo_sum"],
                ms["funded_txo_sum"] - ms["spent_txo_sum"])
    except Exception as e:  # noqa: BLE001
        return None, str(e), None, None


def main() -> None:
    rows = {}
    for readme in glob.glob(os.path.join(BASE, "puzzles", "*", "README.md")):
        rel = os.path.relpath(readme, BASE)
        if SKIP.search(rel):
            continue
        slug = rel.split(os.sep)[1]
        try:
            text = io.open(readme, encoding="utf-8", errors="replace").read()
        except OSError:
            continue
        for a in set(BTC.findall(text)):
            rows.setdefault(a, set()).add(slug)

    print(f"уникальных адресов: {len(rows)}")
    out = []
    with ThreadPoolExecutor(max_workers=6) as ex:
        futs = {ex.submit(bal, a): a for a in rows}
        for f in futs:
            a = futs[f]
            b, tx, spent, mb = f.result()
            if isinstance(b, int) and b > 0:
                out.append((b, a, sorted(rows[a]), tx, spent, mb))

    out.sort(reverse=True)
    print("\n=== НЕНУЛЕВЫЕ БАЛАНСЫ (активные пазлы) ===")
    for b, a, slugs, tx, spent, mb in out:
        print(f"{b:>12} сат  {a}  tx={tx} spent_sum={spent} mempool={mb}")
        for s in slugs:
            print(f"              <- puzzles/{s}")

    with io.open(os.path.join(BASE, "reports", "data_open_balances_2026-10-19.json"),
                 "w", encoding="utf-8") as fh:
        json.dump([{"satoshi": b, "address": a, "puzzles": s, "tx": tx,
                    "spent_sum": sp, "mempool": mb}
                   for b, a, s, tx, sp, mb in out], fh, ensure_ascii=False, indent=1)
    print(f"\nненелевых: {len(out)}; json -> reports/data_open_balances_2026-10-19.json")


if __name__ == "__main__":
    main()
