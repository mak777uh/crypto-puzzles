# -*- coding: utf-8 -*-
"""9vw04: поиск skip-шифра 'каждый N-й символ' по разным порядкам обхода сетки."""
import json, os, re

BASE = r"C:\Users\Admin\OneDrive\Desktop\master\puzzles\9vw04-gem-finder"
g = json.load(open(os.path.join(BASE, "data", "grid_ocr3.json"), encoding="utf-8"))
grid = g["grid"]
R = len(grid); C = len(grid[0])
print("grid", R, "x", C)

B58 = set("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz")  # без 0 O I l

def b58_frac(s):
    if not s:
        return 0
    return sum(1 for c in s if c in B58) / len(s)

orders = {}
orders["rowmajor"] = [grid[r][c] for r in range(R) for c in range(C)]
orders["colmajor"] = [grid[r][c] for c in range(C) for r in range(R)]
orders["rowmajor_rev"] = orders["rowmajor"][::-1]
orders["colmajor_rev"] = orders["colmajor"][::-1]
# змейка
snake = []
for r in range(R):
    row = [grid[r][c] for c in range(C)]
    snake += row if r % 2 == 0 else row[::-1]
orders["snake"] = snake
# диагонали (r-c const), сверху-вниз
diag = []
for d in range(-(R - 1), C):
    for r in range(R):
        c = r - d
        if 0 <= c < C:
            diag.append(grid[r][c])
orders["diag_rc"] = diag
# антидиагонали (r+c const)
adiag = []
for s in range(R + C - 1):
    for r in range(R):
        c = s - r
        if 0 <= c < C:
            adiag.append(grid[r][c])
orders["diag_rplusc"] = adiag

cands = []
for name, seq in orders.items():
    L = len(seq)
    for N in range(2, 80):
        for off in range(N):
            s = "".join(seq[off::N])
            if 40 <= len(s) <= 70 and b58_frac(s) >= 0.9:
                score = b58_frac(s)
                # бонус за начало K/L (сжатый WIF)
                if s[:1] in "KL":
                    score += 0.3
                if "9" in s and "4" in s:
                    score += 0.1
                cands.append((round(score, 3), name, N, off, len(s), s))

cands.sort(reverse=True)
print("candidates:", len(cands))
for c in cands[:40]:
    print(c[0], c[1], "N=%d off=%d len=%d" % (c[2], c[3], c[4]), c[5])
