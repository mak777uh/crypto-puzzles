#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Скачивает ПОЗДНИЕ снапшоты Wayback (2024/2026) страницы видео и поста,
извлекает текст описания/тела и сравнивает BIP39-слова с пулом OCP.
Цель: найти письменные слова, появившиеся ПОСЛЕ 2020 снапшота (хинты и правки).
"""
import json
import os
import re
import ssl
import urllib.request

from mnemonic import Mnemonic

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(os.path.dirname(HERE), "data")
MIR = os.path.join(DATA, "mirror")
WL = set(Mnemonic("english").wordlist)
TOKEN = re.compile(r"[A-Za-z]+")

CTX = ssl.create_default_context()
CTX.check_hostname = False
CTX.verify_mode = ssl.CERT_NONE


def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=90, context=CTX) as r:
        return r.read().decode("utf-8", "replace")


def bip39(text):
    return {w.lower() for w in TOKEN.findall(text) if w.lower() in WL}


def known_pool():
    known = set()
    for name in ("ocp_reading_order_pool.json", "ocp_video_onscreen_words.json"):
        p = os.path.join(DATA, name)
        if os.path.exists(p):
            d = json.load(open(p, encoding="utf-8"))
            for k, v in d.items():
                if isinstance(v, list):
                    known.update(x.lower() for x in v)
    return known


TARGETS = [
    ("video_2026-09-22", "https://web.archive.org/web/20260922092543id_/https://www.youtube.com/watch?v=w4mpiuBP_aY"),
    ("video_2024-11-24", "https://web.archive.org/web/20241124035949id_/https://www.youtube.com/watch?v=w4mpiuBP_aY"),
    ("post_2024-10-13", "https://web.archive.org/web/20241013032635id_/https://mineshop.eu/2020/02/12/crypto-pumping-hardcore-research-portfolio-update-how-are-we-doing/"),
    ("post_2023-03-24", "https://web.archive.org/web/20230324181910id_/https://mineshop.eu/2020/02/12/crypto-pumping-hardcore-research-portfolio-update-how-are-we-doing/"),
]


def extract_desc(h):
    out = []
    # youtube watch-description (2020 layout)
    m = re.search(r'id="eow-description"[^>]*>(.*?)</div>', h, re.S)
    if m:
        out.append(re.sub(r"<[^>]+>", " ", m.group(1)))
    # modern layout: attributedDescription
    for m in re.finditer(r'"attributedDescription":\{"content":"(.*?)"', h, re.S):
        out.append(m.group(1).encode().decode("unicode_escape", "replace"))
    for m in re.finditer(r'"shortDescription":"(.*?)","isCrawlable"', h, re.S):
        out.append(m.group(1).encode().decode("unicode_escape", "replace"))
    # post: article body
    for m in re.finditer(r'<div[^>]+class="[^"]*entry-content[^"]*"[^>]*>(.*?)</div>\s*</div>', h, re.S):
        out.append(re.sub(r"<[^>]+>", " ", m.group(1)))
    return "\n----\n".join(out)


def main():
    known = known_pool()
    print("known pool words:", len(known))
    summary = []
    for label, url in TARGETS:
        try:
            h = fetch(url)
        except Exception as e:  # noqa: BLE001
            print(label, "FETCH-ERR", repr(e)[:160])
            summary.append((label, "ERR", str(e)[:80]))
            continue
        fn = os.path.join(MIR, "later_%s.html" % label)
        with open(fn, "w", encoding="utf-8") as f:
            f.write(h)
        body = extract_desc(h)
        words = sorted(bip39(body))
        new = sorted(set(words) - known)
        print("=" * 60)
        print(label, "bytes=%d" % len(h), "body_len=%d" % len(body), "bip39=%d" % len(words))
        print("  bip39:", " ".join(words))
        print("  NEW  :", " ".join(new) if new else "(none)")
        summary.append((label, "ok", ",".join(new)))
    with open(os.path.join(DATA, "later_snapshots_bip39.txt"), "w", encoding="utf-8") as f:
        for row in summary:
            f.write("\t".join(row) + "\n")


if __name__ == "__main__":
    main()
