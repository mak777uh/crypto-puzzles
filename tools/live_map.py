# -*- coding: utf-8 -*-
# Сплошная карта живых призов: адреса из README/LOG каждой папки -> проверка баланса.
# Только чтение. Пишет LIVE_MAP_2026-10-17.md в корень master.
import os, re, json, ssl, time, urllib.request, urllib.error
from concurrent.futures import ThreadPoolExecutor

BASE = r"C:\Users\Admin\OneDrive\Desktop\master\puzzles"
OUT = r"C:\Users\Admin\OneDrive\Desktop\master\LIVE_MAP_2026-10-17.md"
UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}
CTX = ssl.create_default_context()

BTC = re.compile(r"\b(?:bc1[023456789acdefghjklmnpqrstuvwxyz]{11,71}|[13][a-km-zA-HJ-NP-Z1-9]{25,34})\b")
LTC = re.compile(r"\b(?:ltc1[023456789acdefghjklmnpqrstuvwxyz]{11,71}|[LM][a-km-zA-HJ-NP-Z1-9]{26,33})\b")
ETH = re.compile(r"\b0x[a-fA-F0-9]{40}\b")
AR  = re.compile(r"\b[A-Za-z0-9_-]{43}\b")


def get(u, t=20):
    return urllib.request.urlopen(urllib.request.Request(u, headers=UA), timeout=t, context=CTX).read().decode("utf-8", "replace")


def bal_btc(a):
    try:
        j = json.loads(get("https://mempool.space/api/address/" + a))
        cs = j["chain_stats"]
        return cs["funded_txo_sum"] - cs["spent_txo_sum"]
    except Exception:
        return None


def bal_ltc(a):
    try:
        j = json.loads(get("https://litecoinspace.org/api/address/" + a))
        cs = j["chain_stats"]
        return cs["funded_txo_sum"] - cs["spent_txo_sum"]
    except Exception:
        return None


def bal_eth(a):
    try:
        j = json.loads(get("https://eth.blockscout.com/api/v2/addresses/" + a))
        return int(j.get("coin_balance", 0))
    except Exception:
        return None


def first_addr_line(text, a):
    for ln in text.splitlines():
        if a in ln:
            return ln.strip()[:150]
    return ""


def main():
    folders = sorted(d for d in os.listdir(BASE) if os.path.isdir(os.path.join(BASE, d)))
    per_folder = {}
    for d in folders:
        f = os.path.join(BASE, d)
        txt = ""
        for name in ("README.md", "LOG.md"):
            p = os.path.join(f, name)
            if os.path.isfile(p) and os.path.getsize(p) < 800000:
                txt += open(p, encoding="utf-8", errors="replace").read() + "\n"
        addrs = {"btc": set(BTC.findall(txt)), "ltc": set(LTC.findall(txt)), "eth": set(ETH.findall(txt))}
        # мусор: LTC-паттерн ловит BTC-подобные строки -> оставляем только реальные ltc1/L/M
        per_folder[d] = (addrs, txt)
    # глобальный дедуп
    jobs = []
    for d, (a, txt) in per_folder.items():
        for chain in ("btc", "ltc", "eth"):
            for x in a[chain]:
                jobs.append((d, chain, x))
    seen = set()
    uniq = []
    for d, chain, x in jobs:
        k = (chain, x)
        if k in seen:
            continue
        seen.add(k)
        uniq.append((d, chain, x))
    print("unique addresses:", len(uniq), flush=True)

    def work(item):
        d, chain, x = item
        if chain == "btc":
            b = bal_btc(x)
        elif chain == "ltc":
            b = bal_ltc(x)
        else:
            b = bal_eth(x)
        return item, b

    res = []
    with ThreadPoolExecutor(max_workers=4) as ex:
        for item, b in ex.map(work, uniq):
            res.append((item, b))
    # value в сатоши/веях
    def val_sats(chain, b):
        if b is None:
            return 0
        return b

    rows = []
    for (d, chain, x), b in res:
        if b and b > 0:
            rows.append((d, chain, x, b, first_addr_line(per_folder[d][1], x)))
    rows.sort(key=lambda r: -r[3])
    lines = ["# Карта живых адресов (балансы > 0) — 2026-10-17", "",
             "Проверено: mempool.space (BTC), litecoinspace.org (LTC), eth.blockscout.com (ETH). Только чтение.", "",
             "| # | Папка | Цепь | Адрес | Баланс | Строка-источник |", "|---|---|---|---|---|---|"]
    for i, (d, chain, x, b, src) in enumerate(rows, 1):
        if chain == "btc":
            human = f"{b} сат ({b/1e8:.8f} BTC)"
        elif chain == "ltc":
            human = f"{b} литоши ({b/1e8:.8f} LTC)"
        else:
            human = f"{b/1e18:.6f} ETH"
        lines.append(f"| {i} | {d} | {chain} | {x} | {human} | {src.replace('|','/')} |")
    open(OUT, "w", encoding="utf-8").write("\n".join(lines) + "\n")
    print("live rows:", len(rows), "->", OUT)
    for r in rows[:25]:
        print(f"  {r[3]:>14} {r[1]:4} {r[0]} {r[2]}")


if __name__ == "__main__":
    main()
