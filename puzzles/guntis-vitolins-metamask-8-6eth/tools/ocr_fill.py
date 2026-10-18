#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Single-process, sparse, resumable OCR fill for the guntis frame strip.

The 4-way parallel EasyOCR run was killed under memory pressure on this host, so
this fills the gaps with ONE easyocr process, sampling a step of seconds rather
than every frame (the portfolio table is static; only the coin NAMES matter for
the BIP39 word channel, not the changing numbers).

Appends to data/ocr_frames.jsonl (union-resumable: frames already present in
ocr_frames.jsonl or any data/ocr_part*.jsonl are skipped).

Usage: python tools/ocr_fill.py
"""
import glob
import json
import os
import re
import sys
import time

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(os.path.dirname(HERE), "data")
FRAMES = os.path.join(DATA, "frames_1fps")
OUT = os.path.join(DATA, "ocr_frames.jsonl")

# seconds to (potentially) OCR, step chosen per stretch
PLAN = []
for s in range(88, 206, 4):      # portfolio table segment (lead 1 hotspot)
    PLAN.append(s)
for s in range(206, 330, 10):    # remainder, coarse
    PLAN.append(s)
for s in range(330, 431, 10):
    PLAN.append(s)
for s in range(19, 88, 10):      # early talking-head / slides, coarse
    PLAN.append(s)


def load_done():
    done = set()
    paths = [OUT] + sorted(glob.glob(os.path.join(DATA, "ocr_part*.jsonl")))
    for p in paths:
        if not os.path.exists(p):
            continue
        for line in open(p, encoding="utf-8"):
            line = line.strip()
            if not line:
                continue
            try:
                done.add(json.loads(line)["frame"])
            except Exception:
                pass
    return done


def frame_for_second(sec):
    target = f"_{int(sec):04d}.0s."
    for name in os.listdir(FRAMES):
        if target in name:
            return os.path.join(FRAMES, name)
    return None


def main():
    files = sorted(glob.glob(os.path.join(FRAMES, "*.jpg")))
    bysec = {}
    for f in files:
        m = re.search(r"_(\d+(?:\.\d+)?)s\.", os.path.basename(f))
        if m:
            bysec[int(float(m.group(1)))] = f

    done = load_done()
    todo = []
    for s in PLAN:
        f = bysec.get(s)
        if f and os.path.basename(f) not in done:
            todo.append((s, f))
    print(f"plan={len(PLAN)} done_now={len(done)} todo={len(todo)}", flush=True)

    if not todo:
        print("nothing to do", flush=True)
        return 0

    import easyocr
    reader = easyocr.Reader(["en"], gpu=False, verbose=False)

    t0 = time.time()
    with open(OUT, "a", encoding="utf-8") as fo:
        for i, (s, f) in enumerate(todo):
            name = os.path.basename(f)
            try:
                res = reader.readtext(f, detail=0, paragraph=False)
            except Exception as e:  # noqa: BLE001
                res = []
                print("ERR", name, repr(e)[:120], flush=True)
            fo.write(json.dumps({"frame": name, "tokens": res},
                                ensure_ascii=False) + "\n")
            fo.flush()
            print(f"  {i+1}/{len(todo)}  {s}s  n={len(res)}  "
                  f"{(time.time()-t0)/(i+1):.1f}s/frame", flush=True)
    print("done", flush=True)
    return 0


def _readtext(reader, path):
    return reader.readtext(path, detail=0, paragraph=False)


if __name__ == "__main__":
    # easyocr import happens after we know there is work
    globals()["easyocr_reader"] = None
    raise SystemExit(main())
