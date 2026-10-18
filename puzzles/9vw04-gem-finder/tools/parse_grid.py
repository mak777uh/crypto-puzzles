# -*- coding: utf-8 -*-
"""9vw04: разбор сетки 21x50 -> матрица цветов ячеек."""
from PIL import Image
import numpy as np

P = r"C:\Users\Admin\OneDrive\Desktop\master\puzzles\9vw04-gem-finder\data\puzzle_wayback.jpg"
a = np.asarray(Image.open(P).convert("RGB")).astype(int)
H, W, _ = a.shape
lum = a.sum(axis=2)
mask = lum > 110

# --- колонки ---
cols = mask.sum(axis=0)
bands = []
s = None
for i in range(len(cols)):
    if cols[i] > 2 and s is None:
        s = i
    elif cols[i] <= 2 and s is not None:
        bands.append([s, i - 1])
        s = None
if s is not None:
    bands.append([s, len(cols) - 1])
fixed = []
for b in bands:
    if b[1] - b[0] + 1 > 32:
        mid = (b[0] + b[1]) // 2
        fixed.append([b[0], mid]); fixed.append([mid + 1, b[1]])
    else:
        fixed.append(b)

# --- строки ---
rr = mask.sum(axis=1)
rows = []
s = None
for i in range(len(rr)):
    if rr[i] > 3 and s is None:
        s = i
    elif rr[i] <= 3 and s is not None:
        rows.append([s, i - 1]); s = None
if s is not None:
    rows.append([s, len(rr) - 1])

print("grid", len(rows), "x", len(fixed))

def classify(rgb):
    r, g, b = rgb
    mx = max(rgb); mn = min(rgb)
    sat = mx - mn
    # белый: все высокие, низкая насыщенность
    if mn > 170 and sat < 60:
        return "W"
    # серый: средний уровень, низкая насыщенность
    if sat < 55:
        return "K"  # grey
    # розовый/маджента: R высокий, B средне-высокий, G низкий
    if r > 150 and b > 90 and g < r - 40 and g < b + 60 and b < r + 40:
        return "P"  # pink
    # синий: B доминирует заметно над R
    if b > r + 40 and b > g + 20:
        return "B"
    # лаванда/фиолетовый: R и B высокие, G ниже
    if r > 120 and b > 150 and g < r - 25 and g < b - 25:
        return "L"
    # голубой (cyan-ish)
    if b > 150 and g > 120 and r < g - 20 and r < b - 20:
        return "C"
    return "?"

mat = []
raw = []
for y0, y1 in rows:
    line = []
    rawline = []
    for x0, x1 in fixed:
        cell = a[y0:y1 + 1, x0:x1 + 1]
        m = mask[y0:y1 + 1, x0:x1 + 1]
        px = cell[m]
        if len(px) == 0:
            line.append("."); rawline.append(None); continue
        med = np.median(px, axis=0)
        line.append(classify(med))
        rawline.append(med.astype(int).tolist())
    mat.append(line); raw.append(rawline)

for i, l in enumerate(mat):
    print(f"{i:2d} " + "".join(l))

# Гистограмма палитры
from collections import Counter
c = Counter(ch for l in mat for ch in l)
print("chars:", dict(c))

# уникальные цвета (грубо)
allc = Counter()
for l in raw:
    for m in l:
        if m:
            allc[tuple(round(v / 20) * 20 for v in m)] += 1
print("top colors:")
for k, v in allc.most_common(15):
    print("   ", k, v)

import json
json.dump({"rows": rows, "cols": fixed, "mat": mat, "raw": raw},
          open(r"C:\Users\Admin\OneDrive\Desktop\master\puzzles\9vw04-gem-finder\data\grid_colors.json", "w", encoding="utf-8"))
print("saved grid_colors.json")
