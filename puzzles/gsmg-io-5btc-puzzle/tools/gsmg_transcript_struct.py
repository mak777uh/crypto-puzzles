#!/usr/bin/env python3
"""Print the SalPhaseIon ta0 stream as a structured transcript.

Hypothesis (Big Pickle, 2026-10-17): the page is a capture of an interactive session with a
custom tool written by the author.  Tokens like 'matrixsumlist', 'enter', 'shabef' (sha256!),
'lastwordsbeforearchichoice', 'thispassword', 'ourfirsthintisyourlastcommand', 'anstoo' look
like menu items / commands / outputs, not cipher letters.  If the tool is identified, the whole
puzzle unlocks.  This script just lays out the stream in order so the session structure is
visible: which runs are data (a..i), which are binary (a/b), which are separators ('z'),
which are ascii.
"""
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
DUMP = os.path.join(ROOT, "naddiseo-fork", "nadd_salphaseion.txt")

raw = open(DUMP, encoding="utf-8").read()
i0 = raw.index("CELL 0")
a = raw.index("```", i0)
b = raw.index("```", a + 3)
ta0 = "".join(raw[a + 3:b].split())
print("ta0 length =", len(ta0))
print()

DIG = set("abcdefghi")

# classify maximal runs
runs = []
cur = ta0[0]
start = 0
for i in range(1, len(ta0)):
    if ta0[i] == cur:
        continue
    runs.append((start, i, cur))
    start = i
    cur = ta0[i]
runs.append((start, len(ta0), cur))

# instead: walk and classify by "kind": data(a-i), binary(ab), ascii-other, sep z
def kind(ch):
    if ch == "z":
        return "SEP"
    if ch in DIG:
        return "data"
    return "other"

pos = 0
segments = []
while pos < len(ta0):
    k = kind(ta0[pos])
    j = pos
    while j < len(ta0) and kind(ta0[j]) == k:
        j += 1
    segments.append((pos, j, k, ta0[pos:j]))
    pos = j

for (s, e, k, text) in segments:
    show = text if len(text) <= 80 else text[:60] + f"...({len(text)})"
    print(f"{s:5d}-{e:5d} {k:6s} len={e-s:5d}  {show}")

print()
print("=== 'other' (ascii / base64 / punctuation) segments in full ===")
for (s, e, k, text) in segments:
    if k == "other":
        print(f"[{s}:{e}] {text!r}")
