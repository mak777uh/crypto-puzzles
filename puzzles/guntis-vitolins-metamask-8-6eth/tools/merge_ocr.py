#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Merge data/ocr_frames.jsonl with any data/ocr_part*.jsonl into one deduped
file (per frame keep the record with the most tokens), atomically.

Usage: python tools/merge_ocr.py
"""
import glob
import json
import os

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(os.path.dirname(HERE), "data")
OUT = os.path.join(DATA, "ocr_frames.jsonl")


def main():
    best = {}
    paths = [OUT] + sorted(glob.glob(os.path.join(DATA, "ocr_part*.jsonl")))
    for p in paths:
        if not os.path.exists(p):
            continue
        for line in open(p, encoding="utf-8"):
            line = line.strip()
            if not line:
                continue
            try:
                rec = json.loads(line)
            except Exception:  # noqa: BLE001
                continue
            fr = rec.get("frame")
            if not fr:
                continue
            toks = rec.get("tokens", []) or []
            if fr not in best or len(toks) > len(best[fr].get("tokens", []) or []):
                best[fr] = {"frame": fr, "tokens": toks}
    tmp = OUT + ".tmp"
    with open(tmp, "w", encoding="utf-8") as fo:
        for fr in sorted(best):
            fo.write(json.dumps(best[fr], ensure_ascii=False) + "\n")
    os.replace(tmp, OUT)
    used = [os.path.basename(p) for p in paths if os.path.exists(p)]
    print(f"merged {len(best)} frames from {used} -> {OUT}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
