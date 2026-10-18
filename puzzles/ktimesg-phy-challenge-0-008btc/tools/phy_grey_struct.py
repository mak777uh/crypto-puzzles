# -*- coding: utf-8 -*-
"""phy: структура серого канала каждого из 256 объектов.

Вопросы:
  A. Плоский ли глиф (один доминирующий серый) или многоуровневый?
  B. Является ли набор доминирующих значений перестановкой 0..255 (то есть байт-канал)?
  C. Как выглядит распределение по альфа-каналу (256 уникальных значений).
"""
import json
import os
import numpy as np
from PIL import Image
from scipy import ndimage

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
arr = np.asarray(Image.open(os.path.join(BASE, "data", "01_UrS0Mq.png")))
rgb = arr[:, :, :3].astype(np.int16)
alpha = arr[:, :, 3]
g = rgb[:, :, 0]

mask_fg = (g != 0) | np.any(rgb != g[:, :, None], axis=2)
mask_fg = mask_fg & (alpha > 0)
lab, n = ndimage.label(mask_fg, structure=np.ones((3, 3)))
sizes = ndimage.sum(mask_fg, lab, index=np.arange(1, n + 1))
big = [int(i) + 1 for i in np.argsort(-sizes) if sizes[i] >= 500]
print("components >=500px:", len(big))

rows = []
for cid in big:
    ys, xs = np.where(lab == cid)
    sub = g[ys, xs]
    aop = alpha[ys, xs] == 255
    vals, cnts = np.unique(sub[aop], return_counts=True) if aop.any() else (np.array([]), np.array([]))
    if len(vals) == 0:
        continue
    dom = int(vals[np.argmax(cnts)])
    frac = float(cnts.max() / max(1, aop.sum()))
    spread = int(vals.max() - vals.min()) if len(vals) else 0
    rows.append({"cid": cid, "px": int(len(xs)), "opaque": int(aop.sum()),
                 "dom_grey": dom, "dom_frac": round(frac, 3), "n_grey": int(len(vals)),
                 "cx": round(float(xs.mean()), 1), "cy": round(float(ys.mean()), 1),
                 "r": round(float(np.hypot(xs.mean() - 1023.5, ys.mean() - 1023.5)), 1)})

rows.sort(key=lambda r: -r["px"])
print("objects:", len(rows))
print("dom_frac: mean %.3f  >0.9: %d  >0.5: %d" %
      (np.mean([r["dom_frac"] for r in rows]),
       sum(1 for r in rows if r["dom_frac"] > 0.9),
       sum(1 for r in rows if r["dom_frac"] > 0.5)))
doms = sorted(r["dom_grey"] for r in rows)
print("distinct dom_grey:", len(set(doms)), "min", doms[0], "max", doms[-1])
print("dom_grey list (by size):", [r["dom_grey"] for r in rows][:60])
hist = {v: sum(1 for r in rows if r["dom_grey"] == v) for v in sorted(set(doms))}
print("hist:", hist)

json.dump(rows, open(os.path.join(BASE, "data", "image_objects_grey.json"), "w"), indent=1)
print("saved data/image_objects_grey.json")
