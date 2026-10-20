#!/usr/bin/env python3
"""Read-only scan: are any addresses mentioned in solved/ dossiers still funded?
Writes puzzles/_tmp_solved_balances.json. No transactions."""
import re, glob, os, json, time, urllib.request

pat = re.compile(r"\b(?:bc1q[0-9a-z]{25,50}|bc1p[0-9a-z]{25,60}|[13][1-9A-HJ-NP-Za-km-z]{25,34})\b")
addrs = {}
for f in glob.glob("solved/**/*", recursive=True):
    if not os.path.isfile(f):
        continue
    norm = f.replace(os.sep, "/")
    if "/data/" in norm:
        continue
    if not f.lower().endswith((".md", ".txt")):
        continue
    try:
        s = open(f, encoding="utf-8", errors="ignore").read()
    except Exception:
        continue
    for a in pat.findall(s):
        addrs.setdefault(a, set()).add(f)
print("filtered", len(addrs))

out = "puzzles/_tmp_solved_balances.json"
res = {}

def get(a):
    err = None
    for base in ("https://mempool.space/api/address/", "https://blockstream.info/api/address/"):
        try:
            with urllib.request.urlopen(base + a, timeout=15) as r:
                d = json.load(r)
                c = d["chain_stats"]
                return c["funded_txo_sum"] - c["spent_txo_sum"], c["tx_count"]
        except Exception as e:
            err = str(e)
            time.sleep(0.5)
    return None, err

n = 0
for a, fs in addrs.items():
    bal, tx = get(a)
    res[a] = {"bal": bal, "tx": tx, "files": [p.replace(os.sep, "/") for p in list(fs)[:3]]}
    n += 1
    if bal and bal > 0:
        print("FUNDED", a, bal, "sats", list(fs)[:2])
    time.sleep(0.25)
json.dump(res, open(out, "w"), ensure_ascii=False, indent=1)
print("checked", n)
