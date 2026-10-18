# -*- coding: utf-8 -*-
"""phy: кропы эмодзи на читаемом фоне (исправление композитинга)."""
import os
import sys
import numpy as np
from PIL import Image
from scipy import ndimage

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
p = os.path.join(BASE, "tools", "phy_sheet.py")
s = open(p, encoding="utf-8").read()
out = []
for ln in s.split("\n"):
    while ln.startswith("/t"):
        ln = ln[2:]
    out.append(ln)
open(p, "w", encoding="utf-8").write("\n".join(out))

arr = np.asarray(Image.open(os.path.join(BASE, "data", "01_UrS0Mq.png"))).astype(np.float64)
rgb, alpha = arr[:, :, :3], arr[:, :, 3] / 255.0
comp = (rgb * alpha[:, :, None] + 30.0 * (1 - alpha[:, :, None])).astype(np.uint8)
g = comp[:, :, 0].astype(np.int32)
src = np.asarray(Image.open(os.path.join(BASE, "data", "01_UrS0Mq.png")))
mask = ((src[:, :, 0].astype(np.int32) != 0) | np.any(src[:, :, :3] != src[:, :, 0:1], axis=2)) & (src[:, :, 3] > 0)
lab, n = ndimage.label(mask, structure=np.ones((3, 3)))
sizes = ndimage.sum(mask, lab, index=np.arange(1, n + 1))
cids = [int(i) + 1 for i in np.argsort(-sizes) if sizes[i] >= 500]

start = int(sys.argv[1]) if len(sys.argv) > 1 else 0
S = 5
cell = 150
sheet = Image.new("RGB", (cell * S, cell * S), (70, 70, 70))
for k, cid in enumerate(cids[start:start + S * S]):
    ys, xs = np.where(lab == cid)
    crop = comp[ys.min():ys.max() + 1, xs.min():xs.max() + 1]
    im = Image.fromarray(crop).resize((cell - 16, cell - 16), Image.LANCZOS)
    sheet.paste(im, ((k % S) * cell + 8, (k // S) * cell + 8))
fn = os.path.join(BASE, "data", "sheet_%03d.png" % start)
sheet.save(fn)
print("saved", fn, "objects", len(cids))
