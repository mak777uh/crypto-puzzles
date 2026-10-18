#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Извлекает полный текст описания и все URL из Wayback-HTML challenge-видео (2020).
Печатает в stdout (ASCII-safe вывод в файл data/2020_description_dump.txt).
"""
import html
import json
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(os.path.dirname(HERE), "data")
SRC = os.path.join(DATA, "mirror", "wayback_video_2020.html")
OUT = os.path.join(DATA, "2020_description_dump.txt")

h = open(SRC, encoding="utf-8", errors="replace").read()

lines = []
metas = re.findall(r"<meta\b[^>]*>", h)
lines.append("META COUNT %d" % len(metas))
for m in metas:
    if re.search(r'(description|og:description|og:title|keywords)', m, re.I):
        lines.append("META: " + m)

# YouTube often embeds the description in a JSON blob
for pat in [r'"shortDescription":"(.*?)","isCrawlable"',
            r'"attributedDescription":\{"content":"(.*?)"',
            r'"description":\{"simpleText":"(.*?)"\}']:
    for mm in re.finditer(pat, h, re.S):
        txt = mm.group(1)
        try:
            txt = json.loads('"' + txt + '"')
        except Exception:
            pass
        lines.append("=" * 60)
        lines.append("DESCRIPTION BLOB len=%d" % len(txt))
        lines.append(txt)

urls = sorted(set(re.findall(r"https?://[^\s\"'<>\\]+", h)))
lines.append("=" * 60)
lines.append("URLS %d" % len(urls))
for u in urls:
    if "web.archive.org" in u and "mineshop" not in u and "youtube" not in u:
        continue
    lines.append(u)

with open(OUT, "w", encoding="utf-8") as f:
    f.write("\n".join(lines) + "\n")

# ASCII-safe console echo
print("wrote", OUT, "bytes", os.path.getsize(OUT))
print("metas", len(metas), "urls", len(urls))
