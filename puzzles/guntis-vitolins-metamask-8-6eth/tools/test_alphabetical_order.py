#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Cheap test of the "seed words are in alphabetical order" hypothesis.

Motivation
----------
The 5 planted sentences + title/tags + blog tag `fork` yield a candidate pool of
32 BIP39 words.  All four published position facts are simultaneously satisfied
if the 12 seed words are placed in ALPHABETICAL order and drawn from the window
of candidates that sort between `dutch` (pos 1) and `parrot` (pos 12):

    sorted window: 1 dutch 2 easy 3 expect 4 fiber 5 fog 6 forest 7 fork
                   8 fresh 9 goat 10 lake 11 like 12 more 13 only 14 parrot

    * pos 1 = dutch        (hint 2)
    * pos 4 = fiber        (hint 4)
    * pos 5 = fog          (hint 3)
    * pos 12 = parrot      (hint 1)

Positions 1/4/5 are pinned, so the only freedom is the 6 middle slots 6..11,
which are filled from {forest, fork, fresh, goat, lake, like, more, only} after
dropping 2 of them -> C(8,2) = 28 alphabetical candidates.

This script enumerates, in increasing order of how much it assumes:
  A) all 12-subsets of the 14-word window, sorted alphabetically   -> C(14,12)=91
  B) all 12-subsets keeping the 4 pinned words + fog, parrot fixed -> C(8,6)=28
and, for each, enforces the BIP39 checksum and compares the MetaMask default
address m/44'/60'/0'/0/0 with the escrow 0x9C2F44EFAd0c1E852a09dF9939e6DaF061140CaF.

Usage: python tools/test_alphabetical_order.py
Exit code 0 always; prints a summary and any hit.
"""
import sys
from itertools import combinations

TARGET = "0x9c2f44efad0c1e852a09df9939e6daf061140caf"

try:
    from bip_utils import (
        Bip39MnemonicValidator,
        Bip39SeedGenerator,
        Bip44,
        Bip44Coins,
        Bip44Changes,
    )
except Exception as exc:  # pragma: no cover
    print("FATAL: bip_utils not importable:", exc)
    sys.exit(2)

WINDOW = [
    "dutch", "easy", "expect", "fiber", "fog", "forest", "fork",
    "fresh", "goat", "lake", "like", "more", "only", "parrot",
]
PINNED = {"dutch", "easy", "expect", "fiber", "fog", "parrot"}  # + parrot at end
MIDDLE = {"forest", "fork", "fresh", "goat", "lake", "like", "more", "only"}

validator = Bip39MnemonicValidator()


def address_of(mnemonic: str) -> str:
    seed = Bip39SeedGenerator(mnemonic).Generate()
    acc = (
        Bip44.FromSeed(seed, Bip44Coins.ETHEREUM)
        .Purpose()
        .Coin()
        .Account(0)
        .Change(Bip44Changes.CHAIN_EXT)
        .AddressIndex(0)
    )
    return acc.PublicKey().ToAddress().lower()


def run(subset_label: str, word_sets):
    tested = 0
    valid = 0
    hits = []
    for ws in word_sets:
        ordered = sorted(ws)
        mnemonic = " ".join(ordered)
        tested += 1
        if not validator.IsValid(mnemonic):
            continue
        valid += 1
        try:
            addr = address_of(mnemonic)
        except Exception:
            continue
        if addr == TARGET:
            hits.append((ordered, mnemonic))
            print("!!! HIT", mnemonic)
    print(f"[{subset_label}] candidates={tested} checksum_valid={valid} hits={len(hits)}")
    return hits


def main() -> int:
    all_hits = []

    # A) every 12-subset of the 14-word window, alphabetically ordered
    sets_a = [c for c in combinations(WINDOW, 12)]
    all_hits += run("A: C(14,12)=91 over window", sets_a)

    # B) keep the 4 pinned carriers, drop exactly 2 of the middle 8
    sets_b = [tuple(PINNED) + tuple(c) for c in combinations(MIDDLE, 6)]
    all_hits += run("B: C(8,6)=28 pinned-anchor", sets_b)

    if all_hits:
        print("\nRESULT: MATCH FOUND")
        for ordered, mnemonic in all_hits:
            print("  ", mnemonic)
        return 0
    print("\nRESULT: 0 match (alphabetical hypothesis negative for this pool)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
