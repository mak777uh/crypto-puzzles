#!/usr/bin/env python3
"""H13: ignore the rainbow - WIF candidates from white-only (and colored-only) cells."""
import json, hashlib
from coincurve import PublicKey

TARGET = "039d7ce87733444acfde33960964344d8201d2d92ccdad0f5045e40fdcf963475b"
ALPH = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
IDX = {c: i for i, c in enumerate(ALPH)}
SUB = str.maketrans({"O": "o", "I": "i", "0": "o"})

def b58decode(s):
    n = 0
    for c in s:
        if c not in IDX: return None
        n = n * 58 + IDX[c]
    raw = n.to_bytes((n.bit_length() + 7) // 8, "big")
    return b"\x00" * (len(s) - len(s.lstrip("1"))) + raw

def wif_key(s):
    raw = b58decode(s)
    if raw is None or len(raw) != 38 or raw[0] != 0x80 or raw[33] != 0x01: return None
    if hashlib.sha256(hashlib.sha256(raw[:34]).digest()).digest()[:4] != raw[34:]: return None
    return int.from_bytes(raw[1:33], "big")

def pubhex(d):
    return PublicKey.from_secret(d.to_bytes(32, "big")).format(compressed=True).hex()

def test_stream(tag, s):
    hits, tested = [], 0
    for vn, tr in (("raw", None), ("fix", SUB)):
        t = s.translate(tr) if tr else s
        for i in range(max(0, len(t) - 51)):
            if t[i] not in "KL": continue
            tested += 1
            d = wif_key(t[i:i+52])
            if d and pubhex(d) == TARGET:
                hits.append((tag, vn, i, t[i:i+52]))
    return tested, hits

def main():
    assert wif_key("KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjgd9M7rFU73sVHnoWn") == 1
    g = json.load(open("data/grid_ocr5.json", encoding="utf-8"))["grid"]
    m = json.load(open("data/grid_colors.json", encoding="utf-8"))
    m = m["mat"] if isinstance(m, dict) else m
    print("matrix", len(m), "x", len(m[0]), "vals", sorted({c for row in m for c in row}))
    white = [[g[r][c] for c in range(50) if m[r][c] == "W"] for r in range(21)]
    col = [[g[r][c] for r in range(21) if m[r][c] != "W"] for c in range(50)]
    colored = [[g[r][c] for c in range(50) if m[r][c] != "W"] for r in range(21)]
    streams = {
        "white_rm": "".join("".join(row) for row in white),
        "white_cm": "".join("".join(row) for row in white)[::-1] if False else None,
    }
    # column-major white: traverse columns, keep white cells
    wcm = "".join(g[r][c] for c in range(50) for r in range(21) if m[r][c] == "W")
    streams["white_cm"] = wcm
    streams["white_rm_rev"] = streams["white_rm"][::-1]
    streams["white_cm_rev"] = wcm[::-1]
    streams["colored_rm"] = "".join("".join(row) for row in colored)
    streams["colored_rm_rev"] = streams["colored_rm"][::-1]
    total = 0; allhits = []
    for tag, s in streams.items():
        if s is None: continue
        t, h = test_stream(tag, s); total += t; allhits += h
        print(tag, "len", len(s), "tested", t, "hits", len(h))
    print("TOTAL tested", total, "hits", len(allhits))
    for h in allhits: print("HIT", h)

if __name__ == "__main__":
    main()
