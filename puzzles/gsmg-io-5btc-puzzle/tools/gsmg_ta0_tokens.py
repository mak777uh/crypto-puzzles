#!/usr/bin/env python3
"""Print the raw whitespace of the SalPhaseIon block around every 'z' separator, to see exact
token boundaries (each token is one char) and the tail region verbatim."""
import os

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
DUMP = os.path.join(ROOT, "naddiseo-fork", "nadd_salphaseion.txt")

raw = open(DUMP, encoding="utf-8").read()
i0 = raw.index("CELL 0")
a = raw.index("```", i0)
b = raw.index("```", a + 3)
block = raw[a + 3:b].strip()
toks = block.split()
print(f"tokens = {len(toks)}")
joined = "".join(toks)
print(f"joined = {len(joined)}")

# split joined at 'z' and show each part's boundaries
pos = 0
part = 0
starts = []
for i, ch in enumerate(joined):
    if ch == "z":
        starts.append((part, pos, i))
        part += 1
        pos = i + 1
starts.append((part, pos, len(joined)))
for (p, s, e) in starts:
    print(f"part {p}: [{s}:{e}] len={e-s}")

print()
print("=== raw token text for parts 3..end (every 'z'-delimited part after the big data block) ===")
for (p, s, e) in starts:
    if p < 3:
        continue
    frag = joined[s:e]
    print(f"--- part {p} [{s}:{e}] ---")
    print(repr(frag))
    # show as space-joined tokens
    print(" ".join(frag))
    print()
