#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Consolidate the on-screen OCR of the guntis challenge video into a BIP39
candidate list, and diff it against issue #18's on-screen list.

Produces data/onscreen_bip39_words.json.

Rationale (OCP lead 1, ranked #1): the author says the words may be "written in
the video on the screen".  Every sweep so far draws its pool from description /
title / tags / post body.  issue #18 (cjmcdaniel, 2026-09-04) read 720p/1fps
frames with macOS Vision OCR and got 122 dictionary words (109 new).  This
script re-reads our own 432-frame 1 fps strip (EasyOCR, see tools/ocr_frames.py)
and reports which BIP39 words are legible, with first-appearance seconds and
frame counts, so lead 1's kill-criterion ("a complete frame read yielding
nothing new") can be checked on an independent OCR engine.
"""
import json
import os
import re
from collections import defaultdict

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
DATA = os.path.join(ROOT, "data")

OCR = os.path.join(DATA, "ocr_frames.jsonl")
OUT = os.path.join(DATA, "onscreen_bip39_words.json")
ISSUE18 = os.path.join(DATA, "ocp_video_onscreen_words.json")

COINS = "atom link dash cash icon wave gas ocean fetch ripple basic token".split()

BIP39_CANDIDATES = [
    os.path.join(HERE, "_bip39.txt"),
    r"C:\Users\Admin\miniconda3\Lib\site-packages\mnemonic\wordlist\english.txt",
    r"C:\Users\Admin\AppData\Local\hermes\cache\scratch\blm\english.txt",
]


def load_bip39():
    for p in BIP39_CANDIDATES:
        if os.path.exists(p):
            wl = set(open(p, encoding="utf-8").read().split())
            if len(wl) == 2048:
                return wl
    raise SystemExit("BIP39 wordlist not found (need 2048 words)")


def tokenize(s):
    return [t for t in re.split(r"[^a-z]+", s.lower()) if t]


def main():
    wl = load_bip39()

    frames = defaultdict(int)
    first = {}
    n = 0
    if os.path.exists(OCR):
        for line in open(OCR, encoding="utf-8"):
            line = line.strip()
            if not line:
                continue
            try:
                rec = json.loads(line)
            except Exception:  # noqa: BLE001
                continue
            n += 1
            name = rec.get("frame", "")
            m = re.search(r"_(\d+(?:\.\d+)?)s\.", name)
            sec = float(m.group(1)) if m else None
            toks = []
            for raw in rec.get("tokens", []):
                toks.extend(x for x in re.split(r"[^a-zA-Z]+", raw) if x)
            for t in set(t.lower() for t in toks):
                frames[t] += 1
                if t not in first or (sec is not None and sec < first[t]):
                    first[t] = sec

    bip = {w: {"frames": frames[w], "first_s": first.get(w)}
           for w in frames if w in wl}

    i18 = {}
    if os.path.exists(ISSUE18):
        d = json.load(open(ISSUE18, encoding="utf-8"))
        for w in d.get("onscreen_not_in_pool", []):
            i18[w] = "onscreen_not_in_pool"
        for w in d.get("coin_words_from_the_portfolio_table", []):
            i18[w] = "coin_word"

    coin_present = {c: (c in bip) for c in COINS}
    new_vs_i18 = sorted(w for w in bip if w not in i18)

    result = {
        "_note": "On-screen BIP39 words read from the 432-frame 1fps strip of "
                 "w4mpiuBP_aY with EasyOCR (CPU), 720p. Compare with issue #18 "
                 "(macOS Vision OCR, 431 frames, 2026-09-04).",
        "frames_read": n,
        "distinct_bip39_words": len(bip),
        "words": dict(sorted(bip.items(), key=lambda kv: -kv[1]["frames"])),
        "coin_words_present": coin_present,
        "new_vs_issue18": new_vs_i18,
    }
    json.dump(result, open(OUT, "w", encoding="utf-8"), indent=2,
              ensure_ascii=False)
    print("frames_read=%d distinct_bip39=%d" % (n, len(bip)))
    print("coin words present:", [k for k, v in coin_present.items() if v])
    print("coin words absent:", [k for k, v in coin_present.items() if not v])
    print("new vs issue18 (%d): %s" % (len(new_vs_i18), new_vs_i18))
    print("wrote", OUT)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
