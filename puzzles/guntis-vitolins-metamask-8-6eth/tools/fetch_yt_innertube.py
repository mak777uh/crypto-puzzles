#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Прямой запрос к Innertube API (youtubei.googleapis.com) за форматами видео.
Обходит DNS-блок www.youtube.com. Сохраняет metadata + ссылки в data/mirror/.
Ничего не качает, только разведка форматов.
"""
import os
import json
import requests

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(os.path.dirname(HERE), "data", "mirror")
os.makedirs(DATA, exist_ok=True)

VIDEO_ID = "w4mpiuBP_aY"
UA = "com.google.android.youtube/19.09.37 (Linux; U; Android 11) gzip"
URL = "https://youtubei.googleapis.com/youtubei/v1/player?key=AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8"

CLIENTS = {
    "ANDROID": {
        "context": {"client": {"clientName": "ANDROID", "clientVersion": "19.09.37",
                                "androidSdkVersion": 30, "hl": "en", "gl": "US"}},
    },
    "WEB": {
        "context": {"client": {"clientName": "WEB", "clientVersion": "2.20240401.00.00",
                               "hl": "en", "gl": "US"}},
    },
    "IOS": {
        "context": {"client": {"clientName": "IOS", "clientVersion": "19.09.3",
                               "deviceModel": "iPhone14,3", "hl": "en", "gl": "US"}},
    },
}


def post(body, timeout=40):
    r = requests.post(URL, json=body,
                      headers={"User-Agent": UA, "Content-Type": "application/json"},
                      timeout=timeout)
    return r


def main():
    for name, ctx in CLIENTS.items():
        body = {"videoId": VIDEO_ID, "context": ctx["context"]}
        try:
            r = post(body)
        except Exception as e:  # noqa: BLE001
            print(name, "ERR", repr(e)[:160])
            continue
        print("=== client", name, "HTTP", r.status_code, "len", len(r.content))
        if r.status_code != 200:
            print("   body:", r.text[:200])
            continue
        d = r.json()
        status = d.get("playabilityStatus", {})
        print("   playability:", status.get("status"), status.get("reason"))
        vd = d.get("videoDetails", {})
        print("   title:", vd.get("title"), "| len(s):", vd.get("lengthSeconds"))
        print("   keywords:", vd.get("keywords"))
        sd = d.get("streamingData", {})
        fmts = sd.get("formats", []) + sd.get("adaptiveFormats", [])
        print("   formats:", len(fmts))
        for f in fmts:
            mt = f.get("mimeType", "")
            note = []
            if f.get("height"):
                note.append("%sp" % f["height"])
            if f.get("fps"):
                note.append("%sfps" % f["fps"])
            if "audio" not in mt.split(";")[0].split("/")[1]:
                note.append("VIDEO-ONLY" if "video" in mt else "")
            print("     itag=%-4s %-24s %s %s" % (
                f.get("itag"), mt.split(";")[0], " ".join(note), f.get("url", "")[:60]))
        if fmts:
            json.dump(d, open(os.path.join(DATA, "innertube_%s.json" % name), "w", encoding="utf-8"),
                      ensure_ascii=False)
            print("   saved innertube_%s.json" % name)


if __name__ == "__main__":
    main()
