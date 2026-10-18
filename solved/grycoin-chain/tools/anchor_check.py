# -*- coding: utf-8 -*-
"""Grycoin block 2 anchors: reconstruct exact bytes, verify MD5 prefixes 7759227 (baseline)
and 3c6 (solution with case flips). Read-only analysis, Big Pickle 2026-10-17."""
import hashlib
import itertools
import os
import re

SRC = r"C:\Users\Admin\AppData\Local\Temp\opencode\grycoin\aoinakamoto-2019-08-03-cleczc.md"

raw = open(SRC, encoding="utf-8").read()
lines = raw.split("\n")

# Extract blockquote paragraphs between "Question:" and "Format:"
# In the file: quoted lines start with "> ", paragraph separators are bare ">".
q_start = None
q_end = None
for i, ln in enumerate(lines):
    if ln.startswith("> Question:"):
        q_start = i + 1
    if ln.startswith("> Format:"):
        q_end = i
        break
assert q_start and q_end, (q_start, q_end)

# Collect quoted content up to (not including) "Format:" line
para_lines = []
for ln in lines[q_start:q_end]:
    if ln.startswith("> "):
        para_lines.append(ln[2:])
    elif ln == ">" or ln == "":
        para_lines.append("")  # paragraph separator
    else:
        raise SystemExit("unexpected: %r" % ln)

# Group into paragraphs
paras = []
cur = []
for pl in para_lines:
    if pl == "":
        if cur:
            paras.append("\n".join(cur))
            cur = []
        # consecutive separators -> keep single break
    else:
        cur.append(pl)
if cur:
    paras.append("\n".join(cur))

# Range: start with first "I", stop with period after "method"
assert paras[0].startswith("I thought I would write"), paras[0][:40]
assert paras[-1].endswith("thinking only method."), paras[-1][-40:]
print("paragraphs:", len(paras))
for i, p in enumerate(paras):
    print(f"  [{i}] {p[:70]!r}")

SEP_VARIANTS = {
    "\\r\\n\\r\\n": "\r\n\r\n",
    "\\n\\n": "\n\n",
    "\\r\\n": "\r\n",
    "\\n": "\n",
    "\\r\\r": "\r\r",
    "\\r\\n\\n": "\r\n\n",
    "\\n\\r\\n": "\n\r\n",
}


def build(sep, join_paras=paras, trail=""):
    return sep.join(join_paras) + trail


def md5hex(s):
    return hashlib.md5(s.encode("utf-8")).hexdigest()


TARGET_BASE = "7759227"  # unchanged text, first 7 digits
TARGET_SOL = "3c6"      # solution, first 3 digits

print("\n== baseline search: MD5 prefix 7759227 ==")
found_base = None
for name, sep in SEP_VARIANTS.items():
    for trail in ["", "\r\n", "\n", " "]:
        h = md5hex(build(sep, trail=trail))
        mark = " <== MATCH" if h.startswith(TARGET_BASE) else ""
        if mark or trail == "":
            print(f"  sep={name:12s} trail={trail!r:6s} md5={h}{mark}")
        if h.startswith(TARGET_BASE):
            found_base = (sep, trail, h)

# Also try range variants: drop last paragraph (in case "method." refers elsewhere)
print("\n== range variants (paras 0..8, stop at 'first stage...') ==")
paras8 = paras[:-1]
for name, sep in SEP_VARIANTS.items():
    h = md5hex(sep.join(paras8))
    if h.startswith(TARGET_BASE):
        print(f"  MATCH sep={name} md5={h}")
        found_base = found_base or (sep, "", h)

if not found_base:
    print("\n  baseline NOT matched yet -- trying paragraph-join \\n vs blank-line variants")
    # maybe paragraphs themselves internally joined with single \n but separators \r\n\r\n
    for name, sep in SEP_VARIANTS.items():
        txt = sep.join(p.replace("\n", sep) for p in paras)
        h = md5hex(txt)
        if h.startswith(TARGET_BASE):
            print(f"  MATCH (uniform sep) sep={name} md5={h}")
            found_base = (sep, "", h)

if found_base:
    sep, trail, h = found_base
    base = build(sep, trail=trail)
    print(f"\nBASELINE OK: sep={sep!r} trail={trail!r} md5={h}")

    # Now solution flips: explicit example flips
    # para 5 "I expected otherwise..." -> leading I -> i; "himself" -> "himselF"
    variants = {}
    variants["none"] = base
    variants["I5->i"] = base.replace("I expected otherwise", "i expected otherwise", 1)
    variants["himself->himselF"] = base.replace("himself", "himselF", 1)
    both = base.replace("I expected otherwise", "i expected otherwise", 1).replace(
        "himself", "himselF", 1)
    variants["both"] = both
    # case: all 'I' -> 'i'
    variants["all-I->i"] = base.replace("I", "i")
    # leading letter of every paragraph -> lowercase (sign = first letter?)
    lp = []
    for p in paras:
        if p[0].isupper():
            lp.append(p[0].lower() + p[1:])
        else:
            lp.append(p)
    variants["para-lead-lower"] = sep.join(lp) + trail

    print("\n== solution search: MD5 prefix 3c6 ==")
    for name, txt in variants.items():
        hh = md5hex(txt)
        mark = " <== MATCH" if hh.startswith(TARGET_SOL) else ""
        print(f"  {name:20s} md5={hh}{mark}")
else:
    print("\nbaseline not reproduced; no solution search")
