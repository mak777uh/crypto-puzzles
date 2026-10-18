# -*- coding: utf-8 -*-
"""9vw04: поячеечный OCR. Собираем из каждой строки монтаж 50 ячеек с зазорами, OCR -> 1 символ/ячейка."""
import json, os
import numpy as np
from PIL import Image

BASE = r"C:\Users\Admin\OneDrive\Desktop\master\puzzles\9vw04-gem-finder"
P = os.path.join(BASE, "data", "puzzle_wayback.jpg")
g = json.load(open(os.path.join(BASE, "data", "grid_colors.json"), encoding="utf-8"))
rows, cols = g["rows"], g["cols"]
arr = np.asarray(Image.open(P).convert("RGB")).astype(np.uint8)
lum = arr.astype(int).sum(axis=2)
mask = lum > 110

CELL = 72      # размер ячейки монтажа
PAD = 26       # зазор
GL = 56        # размер глифа

def crop_glyph(y0, y1, x0, x1):
    sub = arr[y0:y1 + 1, x0:x1 + 1]
    m = mask[y0:y1 + 1, x0:x1 + 1]
    ys, xs = np.where(m)
    if len(ys) == 0:
        return None
    gy0, gy1, gx0, gx1 = ys.min(), ys.max(), xs.min(), xs.max()
    gl = sub[gy0:gy1 + 1, gx0:gx1 + 1]
    img = Image.fromarray(gl)
    w, h = img.size
    s = min(GL / w, GL / h)
    img = img.resize((max(1, int(w * s)), max(1, int(h * s))), Image.LANCZOS)
    canvas = Image.new("RGB", (CELL, CELL), (0, 0, 0))
    canvas.paste(img, ((CELL - img.size[0]) // 2, (CELL - img.size[1]) // 2))
    return canvas

import easyocr
reader = easyocr.Reader(["en"], gpu=False, verbose=False)

out = [["?" for _ in cols] for _ in rows]
confs = [[0.0 for _ in cols] for _ in rows]
for ri, (y0, y1) in enumerate(rows):
    montage = Image.new("RGB", (len(cols) * (CELL + PAD) + PAD, CELL + 2 * PAD), (0, 0, 0))
    for ci, (x0, x1) in enumerate(cols):
        gl = crop_glyph(y0, y1, x0, x1)
        if gl is not None:
            montage.paste(gl, (PAD + ci * (CELL + PAD), PAD))
    row = np.asarray(montage)
    res = reader.readtext(row, allowlist="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
                          detail=1, paragraph=False, width_ths=0.1, text_threshold=0.4)
    for box, text, conf in res:
        xs = [p[0] for p in box]; ys = [p[1] for p in box]
        cx = sum(xs) / 4
        ci = int((cx - PAD) // (CELL + PAD))
        if 0 <= ci < len(cols):
            # берём лучшую по conf
            t = text.strip()
            if t and conf > confs[ri][ci]:
                out[ri][ci] = t[0]
                confs[ri][ci] = conf
    print(f"{ri:2d} " + "".join(out[ri]), flush=True)

json.dump({"grid": out, "conf": confs, "rows": rows, "cols": cols},
          open(os.path.join(BASE, "data", "grid_ocr2.json"), "w", encoding="utf-8"))
print("saved grid_ocr2.json")
