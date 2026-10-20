#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""eth_live_map — первая полная сверка ЭФИРНЫХ призов базы по он-чейн.

До 2026-10-19 балансы ETH в каталоге брались из чужих досье (OCP/agntn) и последним считали
12–18.10 другие агенты; публичный JSON-RPC с этой машины раньше не проверялся. Теперь работает
(ethereum-rpc.publicnode.com и 1rpc.io/eth отдают eth_getBalance), поэтому можно независимо
посчитать, какие ETH-цели ещё живы.

Только чтение: сеть — eth_getBalance/eth_blockNumber и eth_getCode для контрактов, никаких
отправленных транзакций. Ключей в скрипте нет.

Использование:
  python tools/eth_live_map.py            # все папки puzzles/
  python tools/eth_live_map.py --only guntis-vitolins-metamask-8-6eth
"""
from __future__ import annotations

import argparse
import json
import pathlib
import re
import ssl
import sys
import time
import urllib.request

MASTER = pathlib.Path(r"C:\Users\Admin\OneDrive\Desktop\master")
RPCS = ["https://ethereum-rpc.publicnode.com", "https://1rpc.io/eth", "https://cloudflare-eth.com"]
CTX = ssl.create_default_context()

ADDR_RE = re.compile(r"(?<![0-9a-fA-F])(0x[0-9a-fA-F]{40})(?![0-9a-fA-F])")


def rpc(method, params, tries=3):
    last = None
    for i in range(tries):
        url = RPCS[i % len(RPCS)]
        body = json.dumps({"jsonrpc": "2.0", "id": 1, "method": method, "params": params}).encode()
        req = urllib.request.Request(url, data=body, headers={"Content-Type": "application/json",
                                                              "User-Agent": "catalog-audit/1.0"})
        try:
            with urllib.request.urlopen(req, timeout=20, context=CTX) as r:
                d = json.load(r)
            if "result" in d:
                return d["result"]
            last = d.get("error")
        except Exception as e:  # noqa: BLE001
            last = e
        time.sleep(1.0)
    raise RuntimeError("%s: %s" % (method, last))


def eth_price():
    try:
        req = urllib.request.Request(
            "https://api.coingecko.com/api/v3/simple/price?ids=ethereum,solana,cardano,arweave&vs_currencies=usd",
            headers={"User-Agent": "catalog-audit/1.0"})
        with urllib.request.urlopen(req, timeout=15, context=CTX) as r:
            d = json.load(r)
        return {k: v["usd"] for k, v in d.items()}
    except Exception:  # noqa: BLE001
        return {}


def collect(only=None):
    """slug -> {address: откуда взято}"""
    out = {}
    root = MASTER / "puzzles"
    for d in sorted(p for p in root.iterdir() if p.is_dir() and not p.name.startswith("_")):
        if only and d.name != only:
            continue
        srcs = {}
        for f in list(d.rglob("README.md"))[:6] + list(d.rglob("*.json"))[:40] + list(d.rglob("*.md"))[:40]:
            try:
                txt = f.read_text(encoding="utf-8", errors="replace")
            except Exception:  # noqa: BLE001
                continue
            if "0x" not in txt:
                continue
            for m in ADDR_RE.finditer(txt):
                a = m.group(1).lower()
                srcs.setdefault(a, str(f.relative_to(d)))
        if srcs:
            out[d.name] = srcs
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--only")
    ap.add_argument("--out", default=str(MASTER / "reports" / "data_eth_live_2026-10-19.json"))
    a = ap.parse_args()

    block = int(rpc("eth_blockNumber", []), 16)
    price = eth_price()
    print("ETH-блок:", block, "| курс:", price)

    found = collect(a.only)
    rows = []
    addrs = sorted({x.lower() for m in found.values() for x in m})
    print("уникальных ETH-адресов в puzzles/:", len(addrs))
    for i, ad in enumerate(addrs, 1):
        try:
            bal = int(rpc("eth_getBalance", [ad, "latest"]), 16)
        except Exception as e:  # noqa: BLE001
            bal = -1
            print("  err", ad, e)
        try:
            code = rpc("eth_getCode", [ad, "latest"])
        except Exception:  # noqa: BLE001
            code = "0x"
        who = [s for s, m in found.items() if ad in m]
        rows.append({"address": ad, "wei": bal, "eth": bal / 1e18,
                     "usd": (bal / 1e18 * price.get("ethereum", 0)) if bal > 0 else 0,
                     "contract": len(code) > 3, "puzzles": who,
                     "source": found[who[0]][ad] if who else ""})
        if bal > 0:
            print("  %2d/%d  %s  %.6f ETH  контракт=%s  <- %s" % (i, len(addrs), ad, bal / 1e18,
                                                                 len(code) > 3, ",".join(who)))
        if i % 25 == 0:
            time.sleep(1)
    rows.sort(key=lambda r: -r["wei"])
    json.dump({"block": block, "price_usd": price, "checked": len(addrs), "rows": rows},
              open(a.out, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print("\n=== живые (bal>0) ===")
    tot = 0.0
    for r in rows:
        if r["wei"] > 0:
            tot += r["eth"]
            print("%-52s %12.6f ETH  ~$%9.2f  k=%s  %s" % (",".join(r["puzzles"])[:50] or "-",
                                                            r["eth"], r["usd"], r["contract"], r["address"]))
    print("ИТОГО ETH на живых адресах: %.6f" % tot)
    print("пустых адресов:", sum(1 for r in rows if r["wei"] == 0), "| с ошибкой:", sum(1 for r in rows if r["wei"] < 0))
    print("отчёт:", a.out)
    return 0


if __name__ == "__main__":
    sys.exit(main())
