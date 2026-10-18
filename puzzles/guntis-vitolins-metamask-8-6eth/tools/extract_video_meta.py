#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Извлекает описание/теги/заголовок из сохранённой Wayback-страницы видео 2020."""
import os
import re
import json
import html as htmlmod

HERE = os.path.dirname(os.path.abspath(__file__))
P = os.path.join(os.path.dirname(HERE), "data", "mirror", "wayback_video_2020.html")
h = open(P, encoding="utf-8", errors="replace").read()
print("LEN", len(h))

for pat in ["og:description", 'name="description"', "keywords", "ytInitialPlayerResponse",
            "dark fog", "parrot", "shortDescription", "itemprop", "attribution"]:
    i = h.find(pat)
    print("---", pat, "at", i)
    if i >= 0:
        print(h[max(0, i - 150):i + 700].replace("\n", " ")[:850])

# Попытка вытащить ytInitialPlayerResponse JSON
m = re.search(r"ytInitialPlayerResponse\s*=\s*(\{.+?\})\s*;\s*(?:var|</script>)", h, re.S)
if m:
    try:
        data = json.loads(m.group(1))
        vd = data.get("videoDetails", {})
        print("\n=== videoDetails keys:", list(vd.keys()))
        print("title:", vd.get("title"))
        print("shortDescription:\n", vd.get("shortDescription"))
        print("keywords:", vd.get("keywords"))
        mf = data.get("microformat", {}).get("playerMicroformatRenderer", {})
        print("publishDate:", mf.get("publishDate"), "uploadDate:", mf.get("uploadDate"))
        print("category:", mf.get("category"))
    except Exception as e:  # noqa: BLE001
        print("json parse fail:", e)
else:
    print("\nno ytInitialPlayerResponse match")
