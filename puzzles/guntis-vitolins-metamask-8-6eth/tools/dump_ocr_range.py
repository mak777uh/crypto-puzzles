#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Quick dump of the on-screen tokens recorded so far for a given second range.

Usage: python tools/dump_ocr_range.py [LO] [HI]
Reads data/ocr_frames.jsonl plus data/ocr_part{A..D}.jsonl, keeps the union of
tokens per frame, and prints only frames whose second lies in [LO, HI].  Also
prints the union of BIP39 tokens in the range.
"""
import json
import os
import re
import sys
from collections import defaultdict

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
DATA = os.path.join(ROOT, "data")

BIP39 = r"C:\Users\Admin\miniconda3\Lib\site-packages\mnemonic\wordlist\english.txt"

FILES = [os.path.join(DATA, "ocr_frames.jsonl")] + [
    os.path.join(DATA, f"ocr_part{c}.jsonl") for c in "ABCD"
]


def sec_of(name):
    m = re.search(r"_(\d+(?:\.\d+)?)s\.", name)
    return float(m.group(1)) if m else None


def main():
    lo = float(sys.argv[1]) if len(sys.argv) > 1 else 0.0
    hi = float(sys.argv[2]) if len(sys.argv) > 2 else 1e9
    wl = set(open(BIP39, encoding="utf-8").read().split())

    per_frame = defaultdict(set)
    for path in FILES:
        if not os.path.exists(path):
            continue
        for line in open(path, encoding="utf-8"):
            line = line.strip()
            if not line:
                continue
            try:
                rec = json.loads(line)
            except Exception:
                continue
            name = rec.get("frame", "")
            for raw in rec.get("tokens", []):
                for t in re.split(r"[^a-zA-Z]+", raw):
                    if t:
                        per_frame[name].add(t.lower())

    bip_union = set()
    frames_in_range = 0
    for name in sorted(per_frame, key=lambda n: (sec_of(n) or 0)):
        s = sec_of(name)
        if s is None or not (lo <= s <= hi):
            continue
        frames_in_range += 1
        toks = sorted(per_frame[name])
        bip = [t for t in toks if t in wl]
        bip_union.update(bip)
        print(f"{s:6.0f}s {name}  n={len(toks):2d}  bip={bip}")
    print(f"\nframes in [{lo:g},{hi:g}] = {frames_in_range}")
    print(f"BIP39 union = {sorted(bip_union)}  ({len(bip_union)})")


if __name__ == "__main__":
    main()
