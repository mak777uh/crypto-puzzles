#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Полное извлечение shortDescription + keywords из Wayback-видео (двойное экранирование)."""
import os
import re
import json
from mnemonic import Mnemonic

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(os.path.dirname(HERE), "data")
h = open(os.path.join(DATA, "mirror", "wayback_video_2020.html"),
         encoding="utf-8", errors="replace").read()


def unesc(s):
    s = s.replace('\\\\"', '"')      # \\" -> "
    s = s.replace('\\\\n', '\n')     # \\n -> newline
    s = s.replace('\\\\/', '/')
    s = s.replace('\\"', '"')        # \" -> "
    s = s.replace('\\/', '/')
    s = s.replace('\\\\', '\\')
    return s


def grab(start_marker, end_marker):
    i = h.find(start_marker)
    if i < 0:
        return None
    i += len(start_marker)
    j = h.find(end_marker, i)
    return h[i:j] if j > 0 else h[i:i + 4000]


desc_raw = grab(r'shortDescription\":\"', r'\",\"isCrawlable\"')
kw_raw = grab(r'\"keywords\":[', r']')
title_m = re.search(r'<meta name="title" content="([^"]*)"', h)
title = title_m.group(1) if title_m else ""

desc = unesc(desc_raw) if desc_raw else ""
kws = re.findall(r'\\?"([^"\\]+)\\?"', kw_raw) if kw_raw else []

print("=== DESCRIPTION (%d chars) ===" % len(desc))
print(desc)
print("=== END ===")
print("\n=== TITLE ===", title)
print("\n=== VIDEO TAGS ===", kws)

pool = json.load(open(os.path.join(DATA, "ocp_reading_order_pool.json"), encoding="utf-8"))
pool_words = set()
for v in pool.values():
    if isinstance(v, list):
        pool_words.update(v)
wl = set(Mnemonic("english").wordlist)


def bip39(text):
    return [w for w in re.findall(r"[a-zA-Z']+", text.lower()) if w in wl]


print("\n=== BIP39 per surface vs OCP pool ===")
for name, txt in [("title", title), ("description", desc), ("tags", " ".join(kws))]:
    ws = bip39(txt)
    print("\n[%s] %d:" % (name, len(ws)), ws)
    print("    NOT in pool:", [w for w in ws if w not in pool_words])

print("\n=== POOL (OCP) ===")
for k, v in pool.items():
    if isinstance(v, list):
        print(" ", k, "->", v)
