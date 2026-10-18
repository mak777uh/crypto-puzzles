#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Тянет внешние поверхности guntis-пазла (OCP-данные + канал автора), сохраняет в data/.
Пишет только в data/, ничего не перезаписывает без бэкапа. URL + дата в SOURCES.
"""
import os
import sys
import json
import time
import requests

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(os.path.dirname(HERE), "data")
os.makedirs(DATA, exist_ok=True)

UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36"

TARGETS = [
    # (local name, url)
    ("ocp_guntis_README.md",
     "https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/1-big-prizes/guntis-vitolins-metamask-8-6eth/README.md"),
    ("ocp_guntis_leads.md",
     "https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/1-big-prizes/guntis-vitolins-metamask-8-6eth/analysis/leads.md"),
    ("ocp_guntis_tested.md",
     "https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/1-big-prizes/guntis-vitolins-metamask-8-6eth/analysis/tested.md"),
    ("ocp_reading_order_pool.json",
     "https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/1-big-prizes/guntis-vitolins-metamask-8-6eth/data/reading-order-pool.json"),
    ("ocp_video_onscreen_words.json",
     "https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/1-big-prizes/guntis-vitolins-metamask-8-6eth/data/video-onscreen-words.json"),
    ("yt_videos_2026-10-17.html",
     "https://www.youtube.com/@GuntisVitolins/videos"),
]


def fetch(name, url, timeout=40):
    dest = os.path.join(DATA, name)
    try:
        r = requests.get(url, headers={"User-Agent": UA}, timeout=timeout)
        status = r.status_code
        if status == 200 and r.content:
            with open(dest, "wb") as f:
                f.write(r.content)
            return (name, url, status, len(r.content), "OK")
        return (name, url, status, len(r.content or b""), "EMPTY/NON-200")
    except Exception as e:  # noqa: BLE001
        return (name, url, "ERR", 0, repr(e)[:160])


def main():
    lines = []
    for name, url in TARGETS:
        res = fetch(name, url)
        line = "%s | %s | %s | %s | %s" % res
        print(line, flush=True)
        lines.append(line)
        time.sleep(1)
    stamp = time.strftime("%Y-%m-%d %H:%M")
    with open(os.path.join(DATA, "SOURCES_guntis_fetch.txt"), "a", encoding="utf-8") as f:
        f.write("\n## %s\n" % stamp)
        for l in lines:
            f.write(l + "\n")


if __name__ == "__main__":
    sys.exit(main())
