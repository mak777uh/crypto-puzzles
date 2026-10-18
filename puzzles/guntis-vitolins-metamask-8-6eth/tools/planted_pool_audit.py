#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Enumerate the exact BIP39 word candidates in the recovered 2020 surfaces of
the guntis challenge (the 5 planted sentences + video title + tags), and diff
against the community "pool of 29" used by the free-order sweeps in issue #38.

Cheap, no-compute sanity check on the community pool (OCP issue #10 already
found `top` mis-sourced and `cloud` absent); this lists every BIP39 word with
its source and order so the next solver starts from a checked list.
"""
import re

BIP39 = r"C:\Users\Admin\miniconda3\Lib\site-packages\mnemonic\wordlist\english.txt"
wl = set(open(BIP39, encoding="utf-8").read().split())

SURFACES = {
    "V1": "Don't expect anything easy there will be dark fog on the lake.",
    "V0": "Also It is not impossible.",
    "V2": "Do you think its more likely for parrot can sing a song then for a goat to whistle ?",
    "P1": "Round dutch cattle is living in the forest and eating wood.",
    "P2": "Only because there is a lot of healthy fiber.",
    "P3": "Hunter like the rib roast dinner fresh.",
    "TAGS": "mining rig, mining hardware, guntis vitolins, bitcoin, ethereum, "
            "top altcoins, altseason, portfolio, altcoins for 2020, bitcoin generator",
    "TITLE": "10 ETH challenge | Ethereum Parabolic | Bitcoin generator "
             "portfolio update !? Is Crypto Winter finished?",
}

allw = []
for k in ["V1", "V0", "V2", "P1", "P2", "P3", "TAGS", "TITLE"]:
    toks = re.findall(r"[a-zA-Z]+", SURFACES[k].lower())
    b = [t for t in toks if t in wl]
    allw += b
    print(k.ljust(6), len(b), b)

u = sorted(set(allw))
print("unique BIP39 in planted surfaces =", len(u))
print(u)
print()
pool29 = "because can cattle dinner easy expect finish forest fresh goat lake like market more only rib roast round season sing song then there top update will winter wood you".split()
print("in OCP pool-of-29 but NOT in planted surfaces:", sorted(set(pool29) - set(u)))
print("in planted surfaces but NOT in OCP pool-of-29:", sorted(set(u) - set(pool29)))