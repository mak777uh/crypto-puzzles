#!/usr/bin/env python3
"""fresh probe of seg0 (dbbib+faed, 661 digits, alphabet a..i, NO 'o').

Motivation (author hints, verbatim):
  2021-12-25: "We've seen prime numbers being mentioned; well, that is definitely an aspect
               which is required to proceed. Furthermore, along the way, some characters need
               to be 'zeroed out'."
  yourlife   : "reinserting the prime basics after which you will be required to select from
               over twenty three ciphers sixteen encryptions and or seven intertwined passwords"
  2023-02-23 : "yellow blue primes matrix sumlist last words before archichoice yinyang ..."

Already tested (do not repeat): decimal-bigint of D/F/D+F; base-9 bijective a..i=1..9 and
a=0..8; insert/replace '0' at prime POSITIONS; zero out all occurrences of a single digit;
matrix row/col sums for all factor pairs.  -> all noise (README parts 5 and "seg0" section).

NEW here (class-based, not positional):
  F1  primality map digits -> bits  (primes 2,3,5,7 = 1 ; others = 0) and complement, over D/F/D+F
  F2  replace non-prime digits by 'o'(0) and, separately, prime digits by 'o'(0), then dec-int -> bytes
  F3  esrever on D/F/D+F (plain and class-mapped)
Each produced blob is checked as:
  * printable-ASCII ratio,
  * sha256(blob) -> uncompressed key -> address == prize,
  * every 32-byte window (and its reverse) -> key -> address == prize.
"""
import os
import sys
import hashlib

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
DUMP = os.path.join(ROOT, "naddiseo-fork", "nadd_salphaseion.txt")

PRIZE = "1GSMG1JC9wtdSwfwApgj2xcmJPAwx7prBe"
THIRD = "1NULY7DhzuNvSDtPkFzNo6oRTZQWBqXNE9"

DIGITS = {c: i for i, c in enumerate("abcdefghi", start=1)}   # a=1..i=9
DIGITS["o"] = 0

B58 = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"


def b58check(payload: bytes) -> str:
    chk = hashlib.sha256(hashlib.sha256(payload).digest()).digest()[:4]
    n = int.from_bytes(payload + chk, "big")
    out = ""
    while n:
        n, r = divmod(n, 58)
        out = B58[r] + out
    for b in payload + chk:
        if b == 0:
            out = "1" + out
        else:
            break
    return out


def addr_of(priv: bytes) -> str:
    """priv -> uncompressed P2PKH address (author's convention)."""
    from coincurve import PrivateKey
    k = int.from_bytes(priv, "big")
    n = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141
    if not (1 <= k < n):
        return ""
    pk = PrivateKey(k.to_bytes(32, "big")).public_key.format(compressed=False)
    h = hashlib.new("ripemd160", hashlib.sha256(pk).digest()).digest()
    return b58check(b"\x00" + h)


def int_bytes(digits: str) -> bytes:
    n = int("".join(str(DIGITS[c]) for c in digits))
    return n.to_bytes((n.bit_length() + 7) // 8, "big")


def bits_to_bytes(bits: str) -> bytes:
    """pad to a byte multiple, big-endian bit order."""
    pad = (-len(bits)) % 8
    bits = bits + "0" * pad
    return int(bits, 2).to_bytes(len(bits) // 8, "big")


def printable_ratio(b: bytes) -> float:
    if not b:
        return 0.0
    ok = sum(1 for c in b if 32 <= c < 127 or c in (9, 10, 13))
    return ok / len(b)


def main():
    raw = open(DUMP, encoding="utf-8").read()
    i0 = raw.index("CELL 0")
    a = raw.index("```", i0)
    b = raw.index("```", a + 3)
    ta0 = "".join(raw[a + 3:b].split())
    print(f"ta0 length = {len(ta0)}  (expect 1075)")

    D = ta0[0:91]
    ab1 = ta0[91:195]
    F = ta0[195:765]
    print(f"D   = {D[:12]}...  len={len(D)}   alphabet={''.join(sorted(set(D)))}")
    print(f"ab1 = len {len(ab1)} alphabet={''.join(sorted(set(ab1)))}")
    print(f"F   = {F[:12]}...  len={len(F)}   alphabet={''.join(sorted(set(F)))}")

    # --- verification of known decodes (validates my extraction) ---
    bits1 = ab1.replace("a", "0").replace("b", "1")
    pads = [int(bits1[i:i + 8], 2) for i in range(0, len(bits1) - 7, 8)]
    print("ab1 decoded ->", bytes(pads))
    z = ta0.index("z", 765)
    segA = ta0[z + 1:z + 1 + 63]
    print("segA ->", int_bytes(segA))

    seg0 = D + F
    assert len(seg0) == 661, len(seg0)
    assert set(seg0) <= set("abcdefghi"), sorted(set(seg0))
    print(f"seg0 = D+F len={len(seg0)} (prime={all(len(seg0) % k for k in range(2, 26))})")

    # --- candidate blobs ---
    PRIMES = set("2357")
    NONPRIMES = set("14689")
    cands = {}

    def add(name, blob):
        if isinstance(blob, str):
            blob = blob.encode("latin-1")
        if blob:
            cands[name] = blob

    for tag, s in (("D", D), ("F", F), ("DF", seg0)):
        add(f"dec:{tag}", int_bytes(s))
        add(f"dec:{tag}:rev", int_bytes(s[::-1]))
        bits = "".join("1" if c in PRIMES else "0" for c in s)
        add(f"primebit:{tag}", bits_to_bytes(bits))
        add(f"primebit:{tag}:rev", bits_to_bytes(bits[::-1]))
        bitsc = "".join("0" if c in PRIMES else "1" for c in s)
        add(f"nprimebit:{tag}", bits_to_bytes(bitsc))
        z_non = "".join("o" if c in NONPRIMES else c for c in s)   # zero out non-primes
        add(f"zerononprime:{tag}", int_bytes(z_non))
        z_pri = "".join("o" if c in PRIMES else c for c in s)      # zero out primes
        add(f"zeroprime:{tag}", int_bytes(z_pri))

    print(f"\ncandidate blobs: {len(cands)}")

    # printable summary (top)
    ranked = sorted(cands.items(), key=lambda kv: -printable_ratio(kv[1]))
    print("\n--- top printable ratios (noise floor ~0.35..0.5 for random 32+ bytes) ---")
    for name, bl in ranked[:10]:
        print(f"  {printable_ratio(bl):.2f}  len={len(bl):4d}  {name}")

    # --- key/address search ---
    n = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141
    hits = []
    for name, blob in cands.items():
        # sha256 of blob
        keys = [(f"sha256({name})", hashlib.sha256(blob).digest())]
        # every 32-byte window, forward and reversed
        for off in range(0, max(0, len(blob) - 31)):
            w = blob[off:off + 32]
            keys.append((f"win:{name}@{off}", w))
            keys.append((f"win:{name}@{off}:rev", w[::-1]))
        for kn, kb in keys:
            k = int.from_bytes(kb, "big")
            if not (1 <= k < n):
                continue
            a_ = addr_of(kb)
            if a_ in (PRIZE, THIRD):
                hits.append((kn, a_))
    print(f"\nkeys tried: {sum(1 for _ in ())} (windows+sha)")
    print("HITS:", hits if hits else "none")


if __name__ == "__main__":
    sys.exit(main())
