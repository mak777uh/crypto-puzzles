# -*- coding: utf-8 -*-
"""9vw04: широкий поиск WIF по всем порядкам/N/смещениям (окно K/L любой позиции) + проверка закона диагоналей."""
import json, os, hashlib
import base58
from coincurve import PublicKey

BASE = r"C:\Users\Admin\OneDrive\Desktop\master\puzzles\9vw04-gem-finder"
grid = json.load(open(os.path.join(BASE, "data", "grid_ocr3.json"), encoding="utf-8"))["grid"]
R = len(grid); C = len(grid[0])
TARGET = "039d7ce87733444acfde33960964344d8201d2d92ccdad0f5045e40fdcf963475b"

# --- 1. Проверка закона L[r][c] == L[r-1][c-1] ---
match = tot = 0
for r in range(1, R):
    for c in range(1, C):
        if grid[r][c] != "?" and grid[r - 1][c - 1] != "?":
            tot += 1
            if grid[r][c] == grid[r - 1][c - 1]:
                match += 1
print("diagonal letter law L[r][c]==L[r-1][c-1]:", match, "/", tot, round(match / tot, 3))

def check(w):
    try:
        raw = base58.b58decode(w)
    except Exception:
        return None
    if len(raw) != 34 or raw[0] != 0x80 or raw[33] != 0x01:
        return None
    if hashlib.sha256(hashlib.sha256(raw[:-4]).digest()).digest()[:4] != raw[-4:]:
        return None
    try:
        return PublicKey.from_valid_secret(raw[1:33]).format(compressed=True).hex()
    except Exception:
        return None

def build_orders():
    o = {}
    o["rowmajor"] = [grid[r][c] for r in range(R) for c in range(C)]
    o["colmajor"] = [grid[r][c] for c in range(C) for r in range(R)]
    snake = []
    for r in range(R):
        row = [grid[r][c] for c in range(C)]
        snake += row if r % 2 == 0 else row[::-1]
    o["snake"] = snake
    d1 = []
    for d in range(-(R - 1), C):
        for r in range(R):
            c = r - d
            if 0 <= c < C:
                d1.append(grid[r][c])
    o["diag_rc"] = d1
    d2 = []
    for s in range(R + C - 1):
        for r in range(R):
            c = s - r
            if 0 <= c < C:
                d2.append(grid[r][c])
    o["diag_rplusc"] = d2
    for k in list(o):
        o[k + "_rev"] = o[k][::-1]
    return o

tested = 0
hits = []
for name, seq in build_orders().items():
    L = len(seq)
    for N in range(2, L):
        for off in range(min(N, L)):
            s = "".join(seq[off::N])
            if len(s) < 52:
                break
            pos = 0
            for i, ch in enumerate(s):
                if ch in "KL":
                    w = s[i:i + 52]
                    if len(w) == 52:
                        tested += 1
                        pk = check(w)
                        if pk == TARGET:
                            hits.append((name, N, off, i, w))
                        elif pk:
                            hits.append((name, N, off, i, w, "PUBKEY_NO_MATCH"))

print("tested windows:", tested, "hits:", len(hits))
for h in hits:
    print("HIT", h)
