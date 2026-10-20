#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""OCP snapshot (puzzles.json) vs live on-chain balances, 2026-10-19.

Purpose: determine which "solved"/"dead-end" lots still hold money, i.e. which
folders deserve to go back to puzzles/. Read-only, blockstream.info only.
"""
from __future__ import annotations

import json
import ssl
import urllib.request
from concurrent.futures import ThreadPoolExecutor

SRC = r"C:\Users\Admin\AppData\Local\Temp\opencode\ocp_puzzles.json"
OUT = r"C:\Users\Admin\OneDrive\Desktop\master\reports\data_ocp_live_2026-10-19.json"
CTX = ssl.create_default_context()
UA = {"User-Agent": "Mozilla/5.0 (puzzle balance audit)"}


def bal(addr: str):
    try:
        req = urllib.request.Request("https://blockstream.info/api/address/" + addr, headers=UA)
        j = json.loads(urllib.request.urlopen(req, timeout=25, context=CTX).read())
        cs = j["chain_stats"]
        return cs["funded_txo_sum"] - cs["spent_txo_sum"], cs["tx_count"], cs["spent_txo_sum"]
    except Exception:  # noqa: BLE001
        return None, None, None


def main() -> None:
    d = json.load(open(SRC, encoding="utf-8-sig"))
    tasks = []
    for p in d["puzzles"]:
        for ad in p.get("addresses") or []:
            if ad.get("chain") == "bitcoin":
                tasks.append((p["slug"], p["status"], ad.get("role"), ad["address"]))

    res = {}
    with ThreadPoolExecutor(max_workers=6) as ex:
        futs = {ex.submit(bal, t[3]): t for t in tasks}
        for f in futs:
            slug, status, role, addr = futs[f]
            res[(slug, addr)] = (status, role) + f.result()

    rows = sorted(res.items(), key=lambda kv: -(kv[1][3] or 0))
    lines = []
    for (slug, addr), (status, role, b, tx, spent) in rows:
        if b:
            lines.append(f"{status:<9} {b:>13}  tx={tx:<4} spent={spent:<12} {role:<12} {addr}  <- {slug}")

    print(f"puzzles={len(d['puzzles'])} addr={len(tasks)} nonzero={len(lines)}\n")
    print("\n".join(lines))

    json.dump([{"slug": k[0], "address": k[1], "status": v[0], "role": v[1],
                "satoshi": v[2], "tx": v[3], "spent_sum": v[4]} for k, v in res.items()],
              open(OUT, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print("\njson ->", OUT)


if __name__ == "__main__":
    main()
