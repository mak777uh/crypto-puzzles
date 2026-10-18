# -*- coding: utf-8 -*-
"""9vw04: перебор skip-шифров по сетке; каждый кандидат-WIF проверяем по pubkey."""
import json, os, itertools, sys
import base58
from coincurve import PrivateKey, PublicKey

BASE = r"C:\Users\Admin\OneDrive\Desktop\master\puzzles\9vw04-gem-finder"
g = json.load(open(os.path.join(BASE, "data", "grid_ocr3.json"), encoding="utf-8"))
grid = g["grid"]
R = len(grid); C = len(grid[0])
TARGET = "039d7ce87733444acfde33960964344d8201d2d92ccdad0f5045e40fdcf963475b"

def check(wif):
    if not (wif[:1] in "KL5" or wif[:1] == "5"):
        pass
    try:
        raw = base58.b58decode(wif)
    except Exception:
        return None
    if len(raw) not in (33, 34):
        return None
    if raw[0] != 0x80:
        return None
    if len(raw) == 34 and raw[33] != 0x01:
        return None
    # проверка контрольной суммы
    import hashlib
    body = raw[:-4]
    chk = hashlib.sha256(hashlib.sha256(body).digest()).digest()[:4]
    if chk != raw[-4:]:
        return None
    priv = raw[1:33]
    try:
        pk = PublicKey.from_valid_secret(priv).format(compressed=True)
    except Exception:
        return None
    return pk.hex()

def orders():
    seqs = {}
    seqs["rowmajor"] = [grid[r][c] for r in range(R) for c in range(C)]
    seqs["colmajor"] = [grid[r][c] for c in range(C) for r in range(R)]
    snake = []
    for r in range(R):
        row = [grid[r][c] for c in range(C)]
        snake += row if r % 2 == 0 else row[::-1]
    seqs["snake"] = snake
    d1 = []
    for d in range(-(R - 1), C):
        for r in range(R):
            c = r - d
            if 0 <= c < C:
                d1.append(grid[r][c])
    seqs["diag_rc"] = d1
    d2 = []
    for s in range(R + C - 1):
        for r in range(R):
            c = s - r
            if 0 <= c < C:
                d2.append(grid[r][c])
    seqs["diag_rplusc"] = d2
    # зеркала
    for k in list(seqs):
        seqs[k + "_rev"] = seqs[k][::-1]
    return seqs

tested = 0
hits = []
for name, seq in orders().items():
    L = len(seq)
    for N in range(2, 401):
        for off in range(min(N, L)):
            s = "".join(seq[off::N])
            if len(s) < 50:
                break
            for start in range(0, min(len(s) - 50, 6) + 1):
                w = s[start:start + 52]
                if len(w) != 52:
                    continue
                if w[0] not in "KL":
                    continue
                tested += 1
                pk = check(w)
                if pk:
                    hits.append((name, N, off, start, w, pk))

print("tested:", tested, "hits:", len(hits))
for h in hits:
    print("HIT", h)
