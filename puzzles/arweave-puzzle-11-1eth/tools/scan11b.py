#!/usr/bin/env python3
"""Arweave #11 — fresh second pass: channel-difference & positional encodings.

Qoder's scan11.py covered LSB/bit planes of L and A separately, chunk/tEXt,
direct ASCII/hex, zlib.  This pass tests encodings it did not:
  * L^A, (A-L), (L+A) byte streams and all their bit planes
  * the 434 pixels with A<255 as a bit stream: alpha parity, alpha LSB,
    position parity (x^y), row-major / column-major / sorted-by-alpha orders
  * pixels of a single L value as a mask -> position bits
No brute force; runtime < 1 min.  Prints any 64-hex/ASCII/zlib hit.
"""
import re
import sys
import zlib

import numpy as np
from PIL import Image

PATH = sys.argv[1] if len(sys.argv) > 1 else "data/puzzle11.png"
HEXRE = re.compile(rb"[0-9a-fA-F]{64}")
ASC = re.compile(rb"[\x20-\x7e]{10,}")


def bits_to_bytes(bits):
    bits = np.asarray(bits, dtype=np.uint8)
    n = (len(bits) // 8) * 8
    return np.packbits(bits[:n]).tobytes()


def report(tag, data):
    hits = []
    for m in HEXRE.finditer(data):
        hits.append(("HEX", m.group().decode()))
    for m in ASC.finditer(data):
        hits.append(("ASCII", m.group()[:120].decode("latin1")))
    for wbits in (15, -15):
        try:
            d = zlib.decompress(data, wbits)
            if len(d) > 16:
                hits.append(("zlib", d[:120]))
        except Exception:
            pass
    if hits:
        print("HIT", tag, hits[:4])
    return hits


im = Image.open(PATH)
a = np.array(im)
if a.ndim != 3 or a.shape[2] != 2:
    print("unexpected shape", a.shape)
    raise SystemExit(1)
L = a[:, :, 0].astype(np.uint16)
A = a[:, :, 1].astype(np.uint16)
print("mode", im.mode, "size", im.size)

# ---- channel combinations ----
for tag, comb in (("L^A", L ^ A), ("A-L", (A - L) % 256), ("L+A", (L + A) % 256),
                  ("255-A", 255 - A), ("L*3+A", (L * 3 + A) % 256)):
    cb = comb.astype(np.uint8)
    for bit in range(8):
        bits = (cb >> bit) & 1
        report(f"{tag}:b{bit}:C", bits_to_bytes(bits.flatten()))
        report(f"{tag}:b{bit}:F", bits_to_bytes(bits.flatten(order="F")))

# ---- the non-255 alpha mask ----
ys, xs = np.where(a[:, :, 1] != 255)
print("non-255 alpha pixels:", len(ys))
order_rm = np.argsort(ys * 100000 + xs)
order_cm = np.argsort(xs * 100000 + ys)
alpha_vals = a[ys, xs, 1]
order_av = np.argsort(alpha_vals, kind="stable")

for tag, idx in (("rowmajor", order_rm), ("colmajor", order_cm), ("byalpha", order_av)):
    yy, xx = ys[idx], xs[idx]
    av = alpha_vals[idx]
    for name, bits in (
        ("aparity", av & 1),
        ("aLsb", (av >> 0) & 1),
        ("aBit6", (av >> 6) & 1),
        ("pospar", (xx ^ yy) & 1),
        ("xpar", xx & 1),
        ("ypar", yy & 1),
        ("dpar", ((255 - av)) & 1),
    ):
        report(f"mask:{tag}:{name}", bits_to_bytes(bits))

# ---- pixels of one L value as mask ----
for val in (0, 255, 128):
    ys2, xs2 = np.where(L.astype(np.uint8) == val)
    if 0 < len(ys2) < 100000:
        report(f"Lmask{val}:pospar", bits_to_bytes(((xs2 ^ ys2) & 1)))
print("done")
