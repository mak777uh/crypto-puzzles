# -*- coding: utf-8 -*-
"""9vw04: точный поячеечный OCR через reader.recognize с явными bbox (без детектора)."""
import json, os
import numpy as np
from PIL import Image

BASE = r"C:\Users\Admin\OneDrive\Desktop\master\puzzles\9vw04-gem-finder"
P = os.path.join(BASE, "data", "puzzle_wayback.jpg")
g = json.load(open(os.path.join(BASE, "data", "grid_colors.json"), encoding="utf-8"))
rows, cols = g["rows"], g["cols"]
arr = np.asarray(Image.open(P).convert("RGB"))

import easyocr
reader = easyocr.Reader(["en"], gpu=False, verbose=False)

hlist = []
idx = []
for ri, (y0, y1) in enumerate(rows):
    for ci, (x0, x1) in enumerate(cols):
        hlist.append([x0 - 2, x1 + 2, y0 - 2, y1 + 2])
        idx.append((ri, ci))

res = reader.recognize(arr, horizontal_list=hlist, free_list=[],
                       allowlist="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", detail=1,
                       paragraph=False, batch_size=64)

out = [["?" for _ in cols] for _ in rows]
confs = [[0.0 for _ in cols] for _ in rows]
n = 0
for item in res:
    box, text, conf = item
    if n < len(idx):
        ri, ci = idx[n]
        t = (text or "").strip()
        if t:
            out[ri][ci] = t[0]
            confs[ri][ci] = conf
    n += 1

for ri in range(len(rows)):
    print(f"{ri:2d} " + "".join(out[ri]))

json.dump({"grid": out, "conf": confs, "rows": rows, "cols": cols},
          open(os.path.join(BASE, "data", "grid_ocr3.json"), "w", encoding="utf-8"))
print("saved grid_ocr3.json")
