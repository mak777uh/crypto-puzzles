#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Remote sweep of high-signal published-key candidates (wif/seed provenance) against
esplora mirrors. Writes hits to reports/data_harvest_live_2026-10-19.json (incremental)."""
from __future__ import annotations

import io
import json
import os
import ssl
import sys
import time
import urllib.error
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed

MASTER = r"C:\Users\Admin\OneDrive\Desktop\master"
HOSTS = ["https://mempool.emzy.de/api/address/", "https://blockstream.info/api/address/"]
CTX = ssl.create_default_context()
UA = {"User-Agent": "Mozilla/5.0 (sweep)"}
OUT = os.path.join(MASTER, "reports", "data_harvest_live_2026-10-19.json")
LOG = os.path.join(MASTER, "reports", "data_harvest_sweep.log")

# load candidate -> provenance map
cand = {}
with io.open(os.path.join(MASTER, "reports", "data_harvest_candidates_2026-10-19.jsonl"), encoding="utf-8") as f:
    for line in f:
        o = json.loads(line)
        cand[o["address"]] = o["provenance"]

high = [a for a in io.open(os.path.join(MASTER, "reports", "data_harvest_highsignal_2026-10-19.txt"), encoding="utf-8").read().splitlines() if a.strip()]
print("high-signal to sweep:", len(high), flush=True)

# resume: skip already-checked addresses
done = set()
if os.path.exists(OUT + ".done"):
    done = set(io.open(OUT + ".done", encoding="utf-8").read().splitlines())
rest = [a for a in high if a not in done]
print("remaining:", len(rest), flush=True)

hits = []
if os.path.exists(OUT):
    try:
        hits = json.load(io.open(OUT, encoding="utf-8"))
    except Exception:
        hits = []

host_idx = 0


def bal(addr):
    global host_idx
    for attempt in range(5):
        url = HOSTS[host_idx % len(HOSTS)] + addr
        host_idx += 1
        try:
            j = json.loads(urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=20, context=CTX).read())
            cs = j["chain_stats"]
            return cs["funded_txo_sum"] - cs["spent_txo_sum"]
        except urllib.error.HTTPError as e:
            if e.code == 429:
                time.sleep(2 ** attempt)
                continue
            return None
        except Exception:
            time.sleep(1)
    return None


checked = 0
with ThreadPoolExecutor(max_workers=3) as ex:
    futs = {ex.submit(bal, a): a for a in rest}
    for f in as_completed(futs):
        a = futs[f]
        b = f.result()
        checked += 1
        done.add(a)
        if isinstance(b, int) and b > 0:
            hits.append({"satoshi": b, "address": a, "provenance": cand.get(a)})
            print("  HIT %d sat %s" % (b, a), flush=True)
            json.dump(hits, io.open(OUT, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
        if checked % 200 == 0:
            io.open(OUT + ".done", "w", encoding="utf-8").write("\n".join(sorted(done)))
            print("  ... %d/%d (hits=%d)" % (checked, len(rest), len(hits)), flush=True)

io.open(OUT + ".done", "w", encoding="utf-8").write("\n".join(sorted(done)))
json.dump(hits, io.open(OUT, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print("DONE checked=%d hits=%d" % (checked, len(hits)), flush=True)
