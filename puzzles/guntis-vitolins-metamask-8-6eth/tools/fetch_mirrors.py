#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Пробует зеркала (Piped/Invidious) и Wayback, чтобы получить метаданные видео
w4mpiuBP_aY (описание/теги/дата) и список роликов канала @GuntisVitolins.
Сохраняет ответы в data/mirror/. Ничего не перезаписывает в папке пазла вне data/mirror.
"""
import os
import json
import time
import requests

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(os.path.dirname(HERE), "data", "mirror")
os.makedirs(DATA, exist_ok=True)
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36"

TRIES = [
    ("piped_streams.json", "https://pipedapi.kavin.rocks/streams/w4mpiuBP_aY"),
    ("piped_video_info.json", "https://pipedapi.kavin.rocks/videos/w4mpiuBP_aY"),
    ("invidious_video.json", "https://yewtu.be/api/v1/videos/w4mpiuBP_aY"),
    ("wayback_video_2020.html",
     "https://web.archive.org/web/20200626184951id_/https://www.youtube.com/watch?v=w4mpiuBP_aY"),
]


def get(name, url, timeout=45):
    dest = os.path.join(DATA, name)
    try:
        r = requests.get(url, headers={"User-Agent": UA}, timeout=timeout)
        if r.status_code == 200 and r.content:
            with open(dest, "wb") as f:
                f.write(r.content)
            return "%s | %s | 200 | %d" % (name, url, len(r.content))
        return "%s | %s | %s | %d" % (name, url, r.status_code, len(r.content or b""))
    except Exception as e:  # noqa: BLE001
        return "%s | %s | ERR | %s" % (name, url, repr(e)[:150])


def main():
    out = []
    for name, url in TRIES:
        line = get(name, url)
        print(line, flush=True)
        out.append(line)
        time.sleep(1)
    with open(os.path.join(DATA, "fetch_log.txt"), "a", encoding="utf-8") as f:
        f.write("\n## %s\n" % time.strftime("%Y-%m-%d %H:%M"))
        for l in out:
            f.write(l + "\n")


if __name__ == "__main__":
    main()
