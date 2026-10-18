# -*- coding: utf-8 -*-
"""phy: смонтировать крупные кропы эмодзи, чтобы разглядеть канал данных глазами."""
import os
import numpy as np
from PIL import Image
from scipy import ndimage

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
arr = np.asarray(Image.open(os.path.join(BASE, "data", "01_UrS0Mq.png")))
rgb = arr[:, :, :3].astype(np.int32)
alpha = arr[:, :, 3]
g = rgb[:, :, 0]
mask = ((g != 0) | np.any(rgb != g[:, :, None], axis=2)) & (alpha > 0)
lab, n = ndimage.label(mask, structure=np.ones((3, 3)))
sizes = ndimage.sum(mask, lab, index=np.arange(1, n + 1))
order = np.argsort(-sizes)
cids = [int(i) + 1 for i in order if sizes[i] >= 500]
print("objects:", len(cids))

S = 6
cell = 100
sheet = Image.new("RGB", (cell * S, cell * S), (40, 40, 40))
meta = []
for k, cid in enumerate(cids[:S * S]):
    ys, xs = np.where(lab == cid)
    x0, x1, y0, y1 = xs.min(), xs.max(), ys.min(), ys.max()
    crop = arr[y0:y1 + 1, x0:x1 + 1]
    im = Image.fromarray(crop, "RGBA")
    im.alpha_composite(Image.new("RGBA", im.size, (0, 0, 0, 255)))
    im = im.convert("RGB").resize((cell - 12, cell - 12), Image.NEAREST)
    gx, gy = k % S, k // S
    sheet.paste(im, (gx * cell + 6, gy * cell + 6))
    vals, cnts = np.unique(g[ys, xs][alpha[ys, xs] == 255], return_counts=True)
    meta.append((cid, int(sizes[cid - 1]), int(xs.mean()), int(ys.mean()),
                 [(int(v), int(c)) for v, c in sorted(zip(vals, cnts), key=lambda z: -z[1])[:4]]))
sheet.save(os.path.join(BASE, "data", "sheet_first36.png"))
for m in meta[:20]:
    print(m)
print("saved data/sheet_first36.png")
