# -*- coding: utf-8 -*-
"""phy: пообъектные скаляры картинки + проверка «перестановка 0..255».

Считаем для каждого из 256 объектов несколько независимых скаляров и смотрим,
даёт ли хоть один из них перестановку 0..255 (то есть байтовый поток из 256 значений).
Скаляры: mean/median/maxgrey по непрозрачным пикселям, площадь, сумма alpha, число
уникальных серых, «плоский» уровень (mode), взвешенный по альфе luma.
"""
import json
import os
import numpy as np
from PIL import Image
from scipy import ndimage

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
arr = np.asarray(Image.open(os.path.join(BASE, "data", "01_UrS0Mq.png")))
rgb = arr[:, :, :3].astype(np.int32)
alpha = arr[:, :, 3].astype(np.int32)
g = rgb[:, :, 0]

mask_fg = (g != 0) | np.any(rgb != g[:, :, None], axis=2)
mask_fg = mask_fg & (alpha > 0)
lab, n = ndimage.label(mask_fg, structure=np.ones((3, 3)))
sizes = ndimage.sum(mask_fg, lab, index=np.arange(1, n + 1))
big = [int(i) + 1 for i in np.argsort(-sizes) if sizes[i] >= 500]

cx0, cy0 = 1023.5, 1023.5
objs = []
for cid in big:
    ys, xs = np.where(lab == cid)
    gv = g[ys, xs]
    av = alpha[ys, xs]
    op = av == 255
    vals, cnts = np.unique(gv[op], return_counts=True) if op.any() else (np.array([0]), np.array([1]))
    r = np.hypot(xs.mean() - cx0, ys.mean() - cy0)
    ang = (np.arctan2(ys.mean() - cy0, xs.mean() - cx0) + 2 * np.pi) % (2 * np.pi)
    objs.append({
        "cid": cid, "px": int(len(xs)), "opaque_px": int(op.sum()),
        "cx": float(xs.mean()), "cy": float(ys.mean()), "r": float(r), "ang": float(ang),
        "mean": float(gv[op].mean()) if op.any() else 0.0,
        "median": float(np.median(gv[op])) if op.any() else 0.0,
        "mode": int(vals[np.argmax(cnts)]),
        "max": int(vals.max()), "min": int(vals.min()), "n_uniq": int(len(vals)),
        "alpha_sum": int(av.sum()),
        "wsum": int((gv * av).sum()),
    })

print("objects:", len(objs))
for key in ["mean", "median", "mode", "max", "min", "n_uniq", "px", "opaque_px", "alpha_sum", "wsum"]:
    v = [o[key] for o in objs]
    iv = [int(round(x)) for x in v]
    uniq = len(set(iv))
    print("%-10s uniq=%3d  min=%s max=%s" % (key, uniq, min(iv), max(iv)))

# «плоский уровень» внутри объекта: самый большой связный участок одного серого
best_flat = []
for o in objs[:3]:
    ys, xs = np.where(lab == o["cid"])
    sub_g = g[ys, xs]
    vals, cnts = np.unique(sub_g, return_counts=True)
    top = sorted(zip(cnts.tolist(), vals.tolist()), reverse=True)[:6]
    print("cid", o["cid"], "top grey levels (count,value):", top)

json.dump(objs, open(os.path.join(BASE, "data", "image_objects_stats.json"), "w"), indent=1)
print("saved data/image_objects_stats.json")
