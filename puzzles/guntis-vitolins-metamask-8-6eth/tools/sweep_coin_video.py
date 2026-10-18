#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Bounded, witnessed sweep of a NEW hypothesis for the guntis seed.

Hypothesis (not covered by any prior sweep in analysis/tested.md):
    the 6 words "hidden in the video" are exactly
        fog, parrot                 (written in the video DESCRIPTION), plus
        four coin names WRITTEN ON SCREEN in the portfolio table
                                    (issue #18: atom, link, basic, token, dash)
    and the 6 words "hidden in the post" are
        dutch, fiber, fork          (confirmed members) plus 3 drawn from the
                                    post's planted sentences.

Fixed anchors (all stated by the author's hints):
    position 1  = dutch
    position 4  = fiber     (hint 4: "the key word number four ... fiber")
    position 5  = fog       (hint 3)
    position 12 = parrot    (hint 1)
The 8 remaining positions (2,3,6,7,8,9,10,11) take the 8 remaining words in any
order -> 8! arrangements per word-set pair.

Why this is not already covered:
  * sweep_coins.py (issue #18) used the RO1 *reading-order* model plus ONE free
    video-side slot from {atom, link, basic, token, dash}; it never allowed
    several on-screen coin words at once.
  * B-FRAMES (issue #38) tested free order but its video pool only added
    {build, share, atom, link} -- not `basic`, not `token`.
So the exact video set {atom, link, basic, token} is untested.

Derivation uses tools/fast_eth.py (coincurve + pbkdf2 + pycryptodome keccak),
verified 40/40 against bip_utils and exact on the canonical vector.
~557 derivations/s/core -> ~8.9k/s on 16 cores.

Usage:
    python tools/sweep_coin_video.py --selftest
    python tools/sweep_coin_video.py                 # all sets (single run)
    python tools/sweep_coin_video.py --shard 0 --of 4
    python tools/sweep_coin_video.py --budget 800    # stop after 800 s
Exit code 0 always; prints a coverage line and any hit.
"""
import hashlib
import itertools
import os
import sys
import time
from multiprocessing import Pool

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from fast_eth import address_from_mnemonic as _derive  # noqa: E402

BIP39 = r"C:\Users\Admin\miniconda3\Lib\site-packages\mnemonic\wordlist\english.txt"
TARGET = "0x9c2f44efad0c1e852a09df9939e6daf061140caf"

WL = open(BIP39, encoding="utf-8").read().split()
IDX = {w: i for i, w in enumerate(WL)}

VIDEO_FIXED = ("fog", "parrot")
COINS = ("atom", "link", "basic", "token", "dash")
POST_FIXED = ("dutch", "fiber", "fork")
POST_POOL = ("round", "cattle", "forest", "wood", "only", "because", "there",
             "like", "rib", "roast", "dinner", "fresh", "season", "market",
             "top", "update", "winter", "you", "will", "also")

ANCHORS = {0: "dutch", 3: "fiber", 4: "fog", 11: "parrot"}   # 0-based
FREE_SLOTS = [1, 2, 5, 6, 7, 8, 9, 10]


def checksum_ok(words):
    """BIP39 validity from hashlib only (fast, no mnemonic/bip_utils import)."""
    acc = 0
    for w in words:
        i = IDX.get(w)
        if i is None:
            return False
        acc = (acc << 11) | i
    entropy = (acc >> 4).to_bytes(16, "big")
    return (acc & 0xF) == (hashlib.sha256(entropy).digest()[0] >> 4)


def gen_sets():
    """(video6, post6) word-set pairs -- both sides exactly 6 words."""
    sets = []
    for coins in itertools.combinations(COINS, 4):
        video = list(VIDEO_FIXED) + list(coins)
        for post3 in itertools.combinations(POST_POOL, 3):
            post = list(POST_FIXED) + list(post3)
            if len(set(video) | set(post)) == 12:
                sets.append((video, post))
    return sets


def _fill(words, perm):
    for p, w in ANCHORS_ITEMS:
        words[p] = w
    for p, w in zip(FREE_SLOTS, perm):
        words[p] = w
    return words


ANCHORS_ITEMS = sorted(ANCHORS.items())


def worker(pair):
    video, post = pair
    n = valid = 0
    for perm in itertools.permutations([w for w in list(video) + list(post)
                                        if w not in ANCHORS.values()]):
        words = _fill([None] * 12, perm)
        n += 1
        if not checksum_ok(words):
            continue
        valid += 1
        if _derive(" ".join(words)).lower() == TARGET:
            return n, valid, " ".join(words)
    return n, valid, None


def selftest():
    assert checksum_ok(["abandon"] * 11 + ["about"]), "canonical rejected"
    assert not checksum_ok(["abandon"] * 12), "abandon x12 accepted"
    addr = _derive(" ".join(["abandon"] * 11 + ["about"])).lower()
    assert addr == "0x9858effd232b4033e47d90003d41ec34ecaeda94", addr
    n = 5000
    t0 = time.time()
    for _ in range(n):
        checksum_ok(["abandon"] * 11 + ["about"])
    cs = n / (time.time() - t0)
    print(f"selftest OK: checksum {cs:,.0f}/s ; canonical={addr}")
    return 0


def main():
    if "--selftest" in sys.argv:
        return selftest()

    shard = int(sys.argv[sys.argv.index("--shard") + 1]) if "--shard" in sys.argv else 0
    of = int(sys.argv[sys.argv.index("--of") + 1]) if "--of" in sys.argv else 1
    budget = float(sys.argv[sys.argv.index("--budget") + 1]) if "--budget" in sys.argv else 0.0

    sets = gen_sets()
    sets = [s for i, s in enumerate(sets) if i % of == shard]
    print(f"shard {shard}/{of}: sets={len(sets)} arrangements={len(sets) * 40320:,}",
          flush=True)
    n = valid = 0
    hits = []
    t0 = time.time()
    with Pool(16) as pool:
        for i, (a, v, h) in enumerate(pool.imap_unordered(worker, sets), 1):
            n += a
            valid += v
            if h:
                hits.append(h)
                print("!!! HIT", h, flush=True)
            if i % 50 == 0 or i == len(sets):
                el = time.time() - t0
                print(f"  sets {i}/{len(sets)} arranged={n:,} valid={valid:,} {el:.0f}s",
                      flush=True)
            if budget and time.time() - t0 >= budget:
                print(f"BUDGET reached after {i}/{len(sets)} sets", flush=True)
                break
    print(f"RESULT shard {shard}/{of}: arranged={n:,} checksum_valid={valid} hits={len(hits)}")
    for h in hits:
        print("HIT:", h)
    return 0


if __name__ == "__main__":
    main()
