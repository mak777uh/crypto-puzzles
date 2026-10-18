# -*- coding: utf-8 -*-
"""phy: инвентаризация картинки-оригинала (2048x2048 RGBA).

Что проверяем (факты, не гипотезы):
  1. канал alpha: уникальные значения, где ненулевой;
  2. точные цвета-маркеры (128,0,0) и золотая монета: связные компоненты, центры, размеры;
  3. сегментация эмодзи по связным компонентам серого слоя -> число объектов, координаты;
  4. для каждого объекта: среднее/медианное серое значение, кол-во пикселей, маркерный канал.
Вывод: data/image_inventory.json (+ .txt сводка).
"""
import json
import os
import numpy as np
from PIL import Image
from scipy import ndimage

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(BASE, "data", "01_UrS0Mq.png")

im = Image.open(SRC)
print("mode", im.mode, "size", im.size)
arr = np.asarray(im)
print("shape", arr.shape, arr.dtype)
rgb = arr[:, :, :3].astype(np.int16)
alpha = arr[:, :, 3] if arr.shape[2] == 4 else None

if alpha is not None:
    ua, ca = np.unique(alpha, return_counts=True)
    print("ALPHA unique:", list(zip(ua.tolist(), ca.tolist()))[:20], "n_uniq", len(ua))

grey = np.all(rgb == rgb[:, :, 0:1], axis=2)
col = ~grey
print("coloured px:", int(col.sum()), "of", rgb.shape[0] * rgb.shape[1])
ucol, ccol = np.unique(rgb[col].reshape(-1, 3), axis=0, return_counts=True)
order = np.argsort(-ccol)
print("TOP coloured rgb:", [(tuple(int(x) for x in ucol[i]), int(ccol[i])) for i in order[:25]])

# фон: самый частый серый
ug, cg = np.unique(rgb[:, :, 0], return_counts=True)
bg = ug[np.argmax(cg)]
print("background grey value:", bg, "count", int(cg.max()))

mask_fg = (rgb[:, :, 0] != bg) | col
if alpha is not None:
    mask_fg = mask_fg & (alpha > 0)
print("foreground px:", int(mask_fg.sum()))

lab, n = ndimage.label(mask_fg, structure=np.ones((3, 3)))
sizes = ndimage.sum(mask_fg, lab, index=np.arange(1, n + 1))
print("components (8-conn):", n, "sizes>500:", int((sizes > 500).sum()),
      "sizes>2000:", int((sizes > 2000).sum()), "max", int(sizes.max()), "min", int(sizes.min()))
objs = []
for i in np.argsort(-sizes):
    cid = int(i) + 1
    if sizes[i] < 200:
        continue
    ys, xs = np.where(lab == cid)
    cx, cy = float(xs.mean()), float(ys.mean())
    sub = rgb[ys, xs]
    maroon = int(np.all(sub == np.array([128, 0, 0], dtype=np.int16), axis=1).sum())
    nonwhite = sub[sub[:, 0] != bg]
    gval = float(np.median(nonwhite[:, 0])) if len(nonwhite) else None
    spread = float(np.ptp(nonwhite[:, 0])) if len(nonwhite) else None
    a = alpha[ys, xs] if alpha is not None else None
    objs.append({"id": cid, "px": int(len(xs)), "cx": round(cx, 1), "cy": round(cy, 1),
                 "bbox": [int(xs.min()), int(ys.min()), int(xs.max()), int(ys.max())],
                 "maroon_px": maroon, "median_grey": gval, "grey_spread": spread,
                 "alpha_min": None if a is None else int(a.min()),
                 "alpha_max": None if a is None else int(a.max())})
print("objects kept (>=200px):", len(objs))
for o in objs[:12]:
    print(o)

json.dump({"mode": im.mode, "size": list(im.size), "background": int(bg),
           "n_components": int(n), "objects": objs},
          open(os.path.join(BASE, "data", "image_inventory.json"), "w"), indent=1)
print("saved data/image_inventory.json")
