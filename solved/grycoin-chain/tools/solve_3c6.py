# -*- coding: utf-8 -*-
"""Grycoin-2 solution search (target MD5 prefix 3c6) over CHEAP families not listed
in the dossier's checked hypotheses H1-H22. Baseline bytes verified: MD5 7759227...
Big Pickle 2026-10-17. Read-only analysis."""
import hashlib
import itertools
import sys

SRC = r"C:\Users\Admin\AppData\Local\Temp\opencode\grycoin\aoinakamoto-2019-08-03-cleczc.md"
TARGET = "3c6"
BASE_MD5 = "7759227d7406d8230d7e3a8f7b9846d7"

raw = open(SRC, encoding="utf-8").read()
lines = raw.split("\n")
q_start = q_end = None
for i, ln in enumerate(lines):
    if ln.startswith("> Question:"):
        q_start = i + 1
    if ln.startswith("> Format:"):
        q_end = i
content = []
for ln in lines[q_start:q_end]:
    if ln.startswith("> "):
        content.append(ln[2:])
    else:
        content.append("")
paras = []
cur = []
for c in content:
    if c == "":
        if cur:
            paras.append("\n".join(cur))
            cur = []
    else:
        cur.append(c)
if cur:
    paras.append("\n".join(cur))

SEP = "\n\n"
BASE = SEP.join(paras)
assert hashlib.md5(BASE.encode()).hexdigest() == BASE_MD5

hits = []
tested = 0


def check(text, tag):
    global tested
    tested += 1
    h = hashlib.md5(text.encode("utf-8")).hexdigest()
    if h.startswith(TARGET):
        hits.append((tag, h))
        print(f"  3c6 HIT: {tag} md5={h}", flush=True)
    return h


def swap(ch):
    return ch.swapcase()


# ---- family A: letter-identity rules (toggle/capitalize/lowercase all occurrences of a letter)
print("[A] letter-identity (26 x 3)", flush=True)
letters = sorted({c for c in BASE if c.isalpha()})
for L in letters:
    cls = {L.lower(), L.upper()}
    check("".join(swap(c) if c in cls else c for c in BASE), f"A:swap-all-{L}")
    check("".join(L.upper() if c in cls else c for c in BASE), f"A:cap-all-{L}")
    check("".join(L.lower() if c in cls else c for c in BASE), f"A:low-all-{L}")

# ---- family B: Stage-One style deterministic rules on Grycoin-2
print("[B] Stage-One style deterministic rules", flush=True)
FIRST_SET = set("ITASM")


def flip_seg_first_last(seg, mode):
    """mode: 'lo_hi' first->lower last->upper; 'hi_lo' first->upper last->lower;
    'toggle_both' toggle case of first and last letters; 'invert_all' swap every letter."""
    i0 = next((i for i, c in enumerate(seg) if c.isalpha()), None)
    i1 = next((i for i in range(len(seg) - 1, -1, -1) if seg[i].isalpha()), None)
    if i0 is None or i1 is None:
        return seg
    out = list(seg)
    a, b = out[i0], out[i1]
    if mode == "lo_hi":
        out[i0], out[i1] = a.lower(), b.upper()
    elif mode == "hi_lo":
        out[i0], out[i1] = a.upper(), b.lower()
    elif mode == "toggle":
        out[i0], out[i1] = swap(a), swap(b)
    elif mode == "invert_all":
        out = [swap(c) if c.isalpha() else c for c in seg]
    return "".join(out)


# split into sentences (naive: '. ' boundaries keeping the period with the sentence)
def sentences_of(text):
    parts = []
    buf = ""
    for ch in text:
        buf += ch
        if ch in ".!?":
            # include trailing quotes/spaces
            pass
    # simple split: after '. ' or '.' at end
    import re
    parts = re.split(r"(?<=[.!?])\s+", text)
    return [p for p in parts if p]


for unit in ("para", "sent"):
    for cond in ("in", "notin"):
        for mode in ("lo_hi", "hi_lo", "toggle", "invert_all"):
            for sep in (SEP, "\r\n\r\n"):
                segs = paras if unit == "para" else sentences_of(BASE)
                out = []
                for s in segs:
                    first = next((c for c in s if c.isalpha()), "")
                    applies = (first.upper() in FIRST_SET) if cond == "in" else (
                        first.upper() not in FIRST_SET)
                    out.append(flip_seg_first_last(s, mode) if applies else s)
                check(sep.join(out), f"B:{unit}-{cond}-{mode}-sep{sep == SEP and 'LF' or 'CRLF'}")

# ---- family C: whole-paragraph case toggle subsets (2^10)
print("[C] whole-paragraph case toggle subsets", flush=True)
swapped = ["".join(swap(c) if c.isalpha() else c for c in p) for p in paras]
for mask in range(1 << len(paras)):
    txt = SEP.join(swapped[i] if mask >> i & 1 else paras[i] for i in range(len(paras)))
    check(txt, f"C:mask={mask:04b}")

# ---- family D: whole-sentence case toggle subsets (2^15)
print("[D] whole-sentence case toggle subsets", flush=True)
sents = sentences_of(BASE)
print(f"    sentences: {len(sents)}", flush=True)
sswapped = ["".join(swap(c) if c.isalpha() else c for c in s) for s in sents]
# rebuild base from sents with single spaces to stay consistent
rebuilt = " ".join(sents)
assert rebuilt == BASE or print("rebuild differs: %r vs %r" % (rebuilt[:60], BASE[:60])) is None
for mask in range(1 << len(sents)):
    txt = " ".join(sswapped[i] if mask >> i & 1 else sents[i] for i in range(len(sents)))
    check(txt, f"D:mask={mask:05b}")

# ---- family E: global sanity
print("[E] global", flush=True)
check("".join(swap(c) for c in BASE), "E:global-swap")
check(BASE.upper(), "E:upper")
check(BASE.lower(), "E:lower")

print(f"\ntested={tested} hits={len(hits)}")
for t, h in hits:
    print("  HIT:", t, h)
