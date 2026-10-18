# -*- coding: utf-8 -*-
"""9vw04: OCR сетки через easyocr (по ячейкам)."""
import json, os
import numpy as np
from PIL import Image

BASE = r"C:\Users\Admin\OneDrive\Desktop\master\puzzles\9vw04-gem-finder"
P = os.path.join(BASE, "data", "puzzle_wayback.jpg")
g = json.load(open(os.path.join(BASE, "data", "grid_colors.json"), encoding="utf-8"))
rows, cols = g["rows"], g["cols"]

im = Image.open(P).convert("RGB")
arr = np.asarray(im)

import easyocr
reader = easyocr.Reader(["en"], gpu=False, verbose=False)

# Соберём картинку ячейки в увеличенном виде, OCR пачкой не выйдет -> по одной, но это 1050 ячеек.
# Быстрее: OCR всей картинки и сопоставить центры детекций с сеткой.
res = reader.readtext(np.asarray(im), allowlist="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
                      detail=1, paragraph=False)
print("detections:", len(res))
cells = {}
for box, text, conf in res:
    xs = [p[0] for p in box]; ys = [p[1] for p in box]
    cx = sum(xs) / 4; cy = sum(ys) / 4
    # найти ячейку
    ri = ci = None
    for i, (y0, y1) in enumerate(rows):
        if y0 - 6 <= cy <= y1 + 6:
            ri = i; break
    for j, (x0, x1) in enumerate(cols):
        if x0 - 6 <= cx <= x1 + 6:
            ci = j; break
    cells.setdefault((ri, ci), []).append((text, conf))

grid = [["" for _ in range(len(cols))] for _ in range(len(rows))]
for (ri, ci), v in cells.items():
    if ri is None or ci is None:
        continue
    grid[ri][ci] = v[0][0]

for i, l in enumerate(grid):
    print(f"{i:2d} " + "".join(c if c else "." for c in l))

out = {"grid": grid, "raw": {f"{k[0]},{k[1]}": v for k, v in cells.items()}}
json.dump(out, open(os.path.join(BASE, "data", "grid_ocr.json"), "w", encoding="utf-8"), ensure_ascii=False)
print("saved grid_ocr.json")
