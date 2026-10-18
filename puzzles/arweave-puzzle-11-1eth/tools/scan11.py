#!/usr/bin/env python3
"""Arweave Puzzle #11 — bounded stego scan (Qoder, 2026-10-17).

Goal: cheap, deterministic scan of the PNG before any deeper hypothesis.
Checks: chunk layout/tEXt, raw trailing bytes, direct ASCII/hex, LSB planes
(row/column order, all bit planes, all channels), zlib-inflate of LSB streams,
alpha anomalies, pixel geometry anomalies. No brute force, runtime < 2 min.
"""
import io, re, sys, zlib, struct, json, hashlib
import numpy as np
from PIL import Image

PATH = sys.argv[1] if len(sys.argv) > 1 else "data/puzzle11.png"
raw = open(PATH, "rb").read()
print("file bytes:", len(raw), "sha256:", hashlib.sha256(raw).hexdigest())

# ---------- PNG chunks ----------
pos = 8
chunks = []
while pos + 8 <= len(raw):
    ln, typ = struct.unpack(">I4s", raw[pos:pos+8])
    typ = typ.decode("latin1")
    data = raw[pos+8:pos+8+ln]
    chunks.append((typ, ln, pos, data))
    pos += 12 + ln
    if typ == "IEND":
        break
print("chunks:", [(t, l) for t, l, p, d in chunks])
print("bytes after IEND:", len(raw) - pos)
for t, l, p, d in chunks:
    if t in ("tEXt", "zTXt", "iTXt"):
        print(f"{t}: {d[:400]!r}")

# ---------- image ----------
im = Image.open(io.BytesIO(raw))
print("mode:", im.mode, "size:", im.size, "info keys:", list(im.info.keys()))
a = np.array(im)
print("array shape/dtype:", a.shape, a.dtype)
print("extrema:", {c: (int(a[..., i].min()), int(a[..., i].max())) for i, c in enumerate(im.mode)} if a.ndim == 3 else (int(a.min()), int(a.max())))

# ---------- direct byte strings ----------
hexre = re.compile(rb"[0-9a-fA-F]{64}")
asc = re.compile(rb"[\x20-\x7e]{8,}")
print("direct 64-hex in file:", [m.group().decode() for m in hexre.finditer(raw)][:10])
strings = [m.group().decode("latin1") for m in asc.finditer(raw)]
print("ascii strings (first 30):", strings[:30])

# ---------- alpha / channel anomalies ----------
if a.ndim == 3:
    ch = a.shape[2]
    for i in range(ch):
        u, c = np.unique(a[..., i], return_counts=True)
        print(f"channel {i}: unique={len(u)} top={[(int(x),int(y)) for x,y in sorted(zip(u,c), key=lambda t:-t[1])[:6]]}")

# ---------- LSB / bit-plane scans ----------
channels = a.shape[2] if a.ndim == 3 else 1
arr = a if a.ndim == 3 else a[..., None]

def bits_to_bytes(bits):
    n = (len(bits)//8)*8
    return np.packbits(bits[:n].astype(np.uint8)).tobytes()

def try_stream(b, tag):
    hits = []
    for m in hexre.finditer(b):
        hits.append(("hex", m.group().decode()))
    for m in asc.finditer(b):
        s = m.group()
        if len(s) >= 12:
            hits.append(("ascii", s[:120].decode("latin1")))
    # try zlib/gzip
    for wbits in (15, -15):
        try:
            d = zlib.decompress(b, wbits)
            if len(d) > 16:
                hits.append(("zlib", d[:120]))
        except Exception:
            pass
    return hits

found = []
for c in range(channels):
    plane = arr[..., c]
    for bit in range(8):
        bits = ((plane >> bit) & 1)
        for order, b in (("C", bits.flatten()), ("F", bits.flatten(order="F"))):
            data = bits_to_bytes(b)
            h = try_stream(data, f"ch{c}b{bit}{order}")
            if h:
                found.append((f"ch{c}b{bit}{order}", h[:5]))
print("LSB/bitplane hits:", found)

# ---------- LSB of RGB combined as one stream ----------
if channels >= 3:
    bits = ((arr[..., :3] >> 0) & 1).flatten()
    d = bits_to_bytes(bits)
    print("RGB-LSB combined hits:", try_stream(d, "rgb0")[:5])

# ---------- row/column length checks ----------
w, h = im.size
print("w*h:", w*h, "channels:", channels, "total bytes:", w*h*channels)
# check whether alpha holds a binary mask
if channels == 4:
    alpha = arr[..., 3]
    vals, cnt = np.unique(alpha, return_counts=True)
    print("alpha values:", [(int(v), int(c)) for v, c in zip(vals, cnt)][:20])
