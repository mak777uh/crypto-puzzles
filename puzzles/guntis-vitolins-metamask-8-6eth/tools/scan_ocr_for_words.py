#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Grep all OCR text (raw tokens, not just BIP39) for a set of probe words.

Usage: python tools/scan_ocr_for_words.py w1 w2 ...
Also flags every fuzzy hit (substring) so OCR typos of coin names surface, e.g.
"a[mt" for atom, "cha nlink" for chainlink.
"""
import json
import os
import re
import sys
from collections import defaultdict

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
DATA = os.path.join(ROOT, "data")

FILES = [os.path.join(DATA, "ocr_frames.jsonl")] + [
    os.path.join(DATA, f"ocr_part{c}.jsonl") for c in "ABCD"
]


def sec_of(name):
    m = re.search(r"_(\d+(?:\.\d+)?)s\.", name)
    return float(m.group(1)) if m else None


def main():
    needles = [w.lower() for w in sys.argv[1:]] or [
        "atom", "link", "dash", "cash", "icon", "wave", "gas", "ocean",
        "fetch", "ripple", "cloud", "mask", "reveal", "random",
    ]
    hits = {w: [] for w in needles}

    for path in FILES:
        if not path or not __import__("os").path.exists(path):
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
            sec = None
            m = __import__("re").search(r"_(\d+(?:\.\d+)?)s\.", name)
            if m:
                sec = float(m.group(1))
            blob = " ".join(rec.get("tokens", [])).lower()
            for w in hits:
                if w in blob:
                    hits[w].append(sec)

    for w in sorted(hits):
        secs = sorted({s for s in hits[w] if s is not None})
        flag = "YES" if secs else "no "
        print(f"{flag} {w:10s} frames={len(secs):3d} secs={secs[:12]}")


if __name__ == "__main__":
    main()
