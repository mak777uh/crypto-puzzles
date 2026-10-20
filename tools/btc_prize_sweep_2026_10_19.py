"""Сплошная BTC он-чейн сверка всей папки puzzles/ (Qoder, 19.10.2026).

Урок ETH-карты: адреса брать только из курируемой секции «Адреса/эскроу» собственного
README (в data-зеркала попадают чужие кошельки). Для каждого адреса — net = funded − spent,
число транзакций и mempool. Транзакций нет: только GET-запросы к blockstream.info.

Выход: reports/data_btc_prize_verified_2026-10-19.json + консольный итог.
"""

import io
import json
import os
import re
import tempfile
import time
import urllib.request
from pathlib import Path

MASTER = Path(r"C:\Users\Admin\OneDrive\Desktop\master")
OUT = MASTER / "reports" / "data_btc_prize_verified_2026-10-19.json"
PZ = MASTER / "puzzles"

G = "https://blockstream.info/api/address/"
G2 = "https://mempool.space/api/address/"

BTC_RE = re.compile(r"(?<![0-9a-zA-Z$])[13][a-km-zA-HJ-NP-Z1-9]{25,34}(?![0-9a-zA-Z])")
BECH_RE = re.compile(r"(?<![0-9a-zA-Z])bc1[02-9a-z]{20,70}(?![0-9a-zA-Z])")
LTC_RE = re.compile(r"(?<![0-9a-zA-Z])[LM][a-km-zA-HJ-NP-Z1-9]{25,34}(?![0-9a-zA-Z])")
OTHER_RE = re.compile(r"(?<![0-9a-zA-Z])(?:ltc1|tb1)[02-9a-z]{20,70}(?![0-9a-zA-Z])")

SEC_HEAD = re.compile(r"^#+\s*(Адреса|Эскроу|Адреса/эскроу|Addresses|Escrow)", re.I | re.M)


def get(url, tries=3):
    last = None
    for i in range(tries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "curl/8", "Accept": "application/json"})
            with urllib.request.urlopen(req, timeout=25) as r:
                return json.loads(r.read().decode())
        except Exception as e:  # noqa: BLE001
            last = e
            time.sleep(1.2 + i)
    raise RuntimeError(str(last))


def stats(addr):
    for base in (G, G2):
        try:
            d = get(base + addr)
        except Exception:  # noqa: BLE001
            continue
        cs = d.get("chain_stats") or {}
        ms = d.get("mempool_stats") or {}
        f = int(cs.get("funded_txo_sum") or 0)
        s = int(cs.get("spent_txo_sum") or 0)
        return {"net": f - s, "funded": f, "spent": s, "tx": int(cs.get("tx_count") or 0),
                "mempool": int(ms.get("funded_txo_sum") or 0) - int(ms.get("spent_txo_sum") or 0)}
    return None


def addr_sections(text):
    """Возвращает (адреса из секции «Адреса/эскроу», адреса из остального текста README)."""
    heads = list(SEC_HEAD.finditer(text))
    curated, rest = [], []
    if heads:
        for m in heads:
            end = len(text)
            for h in heads:
                if h.start() > m.end():
                    end = min(end, h.start())
            nxt = re.search(r"^#{1,3}\s", text[m.end():], re.M)
            if nxt:
                end = min(end, m.end() + nxt.start())
            curated.append(text[m.end():end])
        joined = "\n".join(curated)
        for span in [(h.start(), h.end()) for h in heads]:
            pass
        rest_text = text
        for chunk in curated:
            rest_text = rest_text.replace(chunk, "", 1)
    else:
        rest_text = text
        joined = ""
    def collect(t):
        return set(BTC_RE.findall(t)) | {a.lower() for a in BECH_RE.findall(t)}
    return collect(joined), collect(rest_text)


def main():
    folders = sorted(p.name for p in PZ.iterdir() if p.is_dir() and not p.name.startswith("_"))
    rows, others = [], []
    per_addr = {}
    for slug in folders:
        rf = PZ / slug / "README.md"
        if not rf.exists():
            rows.append({"slug": slug, "note": "нет README.md"})
            continue
        try:
            text = io.open(rf, encoding="utf-8", errors="ignore").read()
        except OSError as e:
            rows.append({"slug": slug, "note": "README не читается: %s" % e})
            continue
        cur, rest = addr_sections(text)
        addrs = sorted(cur | (cur ^ rest if False else set()))
        if not cur:
            addrs = sorted(rest)
            src = "весь README (секции Адреса/эскроу нет)"
        else:
            src = "секция Адреса/эскроу"
        live, dead, err = [], [], []
        for a in addrs:
            if a in per_addr:
                st = per_addr[a]
            else:
                st = stats(a)
                if st is None:
                    err.append(a)
                    continue
                per_addr[a] = st
                time.sleep(0.12)
            rec = {"address": a, **st}
            if st["net"] + st["mempool"] > 0:
                live.append(rec)
            else:
                dead.append(rec)
        mx = max((x["net"] + x["mempool"] for x in live), default=0)
        for a in BTC_RE.findall(text):
            pass
        for a in LTC_RE.findall(text) + OTHER_RE.findall(text):
            others.append({"slug": slug, "address": a})
        rows.append({"slug": slug, "source": src, "checked": len(addrs),
                     "live_max_satoshi": mx,
                     "live_usd_approx": round(mx / 1e8 * 63000, 2) if mx else 0,
                     "live": live, "empty_or_spent": dead, "errors": err})
        print("%-52s адресов %3d  живых %2d  макс %12d сат" % (slug, len(addrs), len(live), mx), flush=True)

    live_total = sum(r.get("live_max_satoshi", 0) for r in rows)
    out = {
        "checked_utc": "2026-10-19T14:40Z",
        "btc_usd_used": 63000,
        "folders": len(folders),
        "addresses_queried": len(per_addr),
        "sum_of_max_live_per_puzzle_satoshi": live_total,
        "rows": rows,
        "non_btc_addresses_found": others[:200],
        "note": ("Адреса только из секции «Адреса/эскроу» собственного README; если секции нет — "
                 "весь README (флаг source). net = funded − spent; mempool показан отдельно."),
    }
    fd, tmp = tempfile.mkstemp(dir=str(OUT.parent), suffix=".tmp")
    with os.fdopen(fd, "w", encoding="utf-8", newline="") as fh:
        fh.write(json.dumps(out, ensure_ascii=False, indent=1))
        fh.flush()
        os.fsync(fh.fileno())
    os.replace(tmp, OUT)
    print("\n=== ИТОГО: папок %d, уникальных адресов %d, сумма максимумов %d сат (~$%.0f)"
          % (len(folders), len(per_addr), live_total, live_total / 1e8 * 63000))
    print("файл:", OUT.name)
    print("\n--- крупнейшие живые лоты по пазлам ---")
    for r in sorted((x for x in rows if x.get("live_max_satoshi")), key=lambda z: -z["live_max_satoshi"])[:25]:
        print("%12d сат  %s" % (r["live_max_satoshi"], r["slug"]))
    zero = [r["slug"] for r in rows if r.get("checked") and not r.get("live")]
    print("\n--- 0 на он-чейн при проверке адресов досье (%d) ---" % len(zero))
    for s in zero:
        print("   ", s)


if __name__ == "__main__":
    main()
