#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Аудит письменных поверхностей guntis: все BIP39-слова из «посаженных» фраз,
тегов, заголовка и правил описания. Печатает, что уже в пуле OCP, а что НЕТ.

Идея (не перебор): проверить, полон ли пул подтверждённых письменных слов,
и не пропущено ли слово, которое автор написал (напр. dark/dutch).
"""
import json
import os
import re
import sys

try:
    from mnemonic import Mnemonic
    WL = set(Mnemonic("english").wordlist)
except Exception:  # noqa: BLE001
    from bip_utils import Bip39WordsNum  # type: ignore
    WL = set()

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(os.path.dirname(HERE), "data")

PLANTED = {
    "video_desc_1": "Don't expect anything easy there will be dark fog on the lake.",
    "video_desc_2": "Also It is not impossible.",
    "video_desc_3": "Do you think its more likely for parrot can sing a song then for a goat to whistle ?",
    "post_1": "Round dutch cattle is living in the forest and eating wood.",
    "post_2": "Only because there is a lot of healthy fiber.",
    "post_3": "Hunter like the rib roast dinner fresh.",
    "video_rules": ("12 wallet seed words- 6 are hidden in this video (description, tags, title, "
                    "video basically could be anywhere in this video) 6.words are hidden in original post. "
                    "This task will unlock wallet to claim 10 eth."),
    "video_title": "10 ETH challenge | Ethereum Parabolic | Bitcoin generator portfolio update !?",
    "post_tags_2020": "altcoin season, altcoins, bitcoin, bull market, crypto pumping, ethereum, ethereum fork, round",
    "video_tags_2020": ("mining rig, mining hardware, guntis vitolins, bitcoin, ethereum, top altcoins, "
                        "altseason, portfolio, altcoins for 2020, bitcoin generator"),
}

TOKEN = re.compile(r"[A-Za-z]+")


def bip39_words(text):
    return [w.lower() for w in TOKEN.findall(text) if w.lower() in WL]


def load_json(name):
    p = os.path.join(DATA, name)
    if os.path.exists(p):
        return json.load(open(p, encoding="utf-8"))
    return {}


def main():
    if not WL:
        print("NO WORDLIST AVAILABLE")
        return 2

    pool = load_json("ocp_reading_order_pool.json")
    onscreen = load_json("ocp_video_onscreen_words.json")

    known = set()
    for k, v in pool.items():
        if isinstance(v, list):
            known.update(x.lower() for x in v)
    for k, v in onscreen.items():
        if isinstance(v, list):
            known.update(x.lower() for x in v)
    anchors = set((pool.get("anchors") or {}).keys())

    print("wordlist size:", len(WL))
    print("known pool words:", len(known), "| anchors:", sorted(anchors))
    print()
    allfound = set()
    for name, text in PLANTED.items():
        ws = bip39_words(text)
        allfound.update(ws)
        print("%-16s %s" % (name, " ".join(ws)))
    print()
    print("UNION of planted BIP39 words (%d): %s" % (len(allfound), " ".join(sorted(allfound))))
    print()
    missing = sorted(allfound - known - anchors)
    print("NOT in OCP pool/onscreen/anchors (%d): %s" % (len(missing), " ".join(missing) if missing else "(none)"))
    # sanity: are the anchors actually BIP39?
    for a in ["dutch", "fog", "parrot", "fiber", "fork", "dark", "rib", "goat", "dose", "wood"]:
        print("  %-8s in BIP39: %s" % (a, a in WL))
    return 0


if __name__ == "__main__":
    sys.exit(main())
