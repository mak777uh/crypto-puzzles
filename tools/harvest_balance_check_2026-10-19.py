#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Read-only: проверить живые балансы адресов, полученных из ОПУБЛИКОВАННЫХ в сети ключей.

Вход: reports/data_harvest_intersection_2026-10-19.json (адреса, выведенные из published
keys/seeds, которые одновременно упоминаются в досье) + опционально --jsonl со всем
дампом кандидатов.

Выход: reports/data_harvest_live_2026-10-19.json — только ненулевые балансы,
с funded/spent/tx_count. Никаких транзакций, никаких ключей в выводе.
"""
from __future__ import annotations
import argparse, json, os, subprocess, sys, time

MASTER = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# mempool.space после массовых прогонов агентов отдаёт 429/пустой ответ;
# blockstream.info держит ~1 с на запрос — основной транспорт. Fallback по memool
# убран: он превращал каждый сбой в 20-секундный таймаут и убивал темп прогона.
BASES = ("https://blockstream.info/api/address/",)


def probe(addr: str):
    err = None
    for attempt in range(2):
        for base in BASES:
            try:
                p = subprocess.run(
                    ["curl", "-s", "--max-time", "8", base + addr],
                    capture_output=True, text=True, timeout=12,
                )
                d = json.loads(p.stdout)
                c = d["chain_stats"]
                return {
                    "balance": c["funded_txo_sum"] - c["spent_txo_sum"],
                    "funded": c["funded_txo_sum"],
                    "spent": c["spent_txo_sum"],
                    "tx_count": c["tx_count"],
                    "utxo_in_mempool": d.get("mempool_stats", {}).get("funded_txo_sum", 0),
                    "source": base.split("/")[2],
                }
            except Exception as e:  # noqa: BLE001
                err = f"{base.split('/')[2]}: {type(e).__name__} {e}"
                time.sleep(1.5)
    return {"error": err}


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--sources", default=os.path.join(MASTER, "reports", "data_harvest_intersection_2026-10-19.json"))
    ap.add_argument("--limit", type=int, default=0)
    ap.add_argument("--workers", type=int, default=2)
    ap.add_argument("--out", default=os.path.join(MASTER, "reports", "data_harvest_live_2026-10-19.json"))
    args = ap.parse_args()

    with open(args.sources, encoding="utf-8") as fh:
        data = json.load(fh)
    if isinstance(data, dict):  # например _tmp_solved_balances.json: {addr: {...}}
        data = [{"address": k, **v} for k, v in data.items()]
    seen, order = set(), []
    for rec in data:
        a = rec.get("address") if isinstance(rec, dict) else rec
        if a and a not in seen:
            seen.add(a)
            order.append(a)
    if args.limit:
        order = order[: args.limit]

    live, errors, checked = [], [], 0
    from concurrent.futures import ThreadPoolExecutor
    by_addr = {x.get("address"): x for x in data}
    with ThreadPoolExecutor(max_workers=args.workers) as ex:
        results = []
        for i, pair in enumerate(ex.map(lambda a: (a, probe(a)), order), 1):
            results.append(pair)
            if i % 20 == 0:
                print(f"... {i}/{len(order)}", flush=True)
    for a, r in results:
        checked += 1
        if "error" in r:
            errors.append({"address": a, **r})
        elif r["balance"] and r["balance"] > 0:
            srcs = (by_addr.get(a) or {}).get("provenance", [])[:3]
            live.append({"address": a, **r, "provenance_sample": srcs})
            print(f"LIVE {a} {r['balance']} sat", flush=True)

    out = {
        "generated_utc": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "mode": "read-only balance probe, no transactions, no keys",
        "addresses_checked": checked,
        "live_nonzero": len(live),
        "errors": len(errors),
        "results": live,
        "error_list": errors,
    }
    with open(args.out, "w", encoding="utf-8") as fh:
        json.dump(out, fh, ensure_ascii=False, indent=1)
    print(f"\nchecked={checked} live={len(live)} errors={len(errors)} -> {args.out}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
