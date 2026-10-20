# -*- coding: utf-8 -*-
"""rcodes vision helper: нарезает фото рукописи на строки и апскейлит для визуального чтения.
Big Pickle, 2026-10-18. Только чтение исходника, ничего не перезаписывает.
"""
import os
import cv2
import numpy as np

SRC = r'C:\Users\Admin\OneDrive\Desktop\master\puzzles\rcodes-1tk3up2-500usd\data\rcodes_cipher.jpeg'
OUT = r'C:\Users\Admin\OneDrive\Desktop\master\puzzles\rcodes-1tk3up2-500usd\data\vision'

os.makedirs(OUT, exist_ok=True)
img = cv2.imread(SRC)
print('size', img.shape)

g = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
g = cv2.GaussianBlur(g, (3, 3), 0)
# тёмные чернила по светлой бумаге
th = cv2.adaptiveThreshold(g, 255, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY_INV, 51, 15)
th = cv2.morphologyEx(th, cv2.MORPH_CLOSE, np.ones((3, 25), np.uint8))

rows = (th > 0).sum(axis=1).astype(float)
rows = np.convolve(rows, np.ones(9) / 9, mode='same')
hi = rows.max()
bands = []
inb = False
for y, v in enumerate(rows):
    if v > hi * 0.06 and not inb:
        inb, y0 = True, y
    elif v <= hi * 0.06 and inb:
        inb = False
        if y - y0 > 12:
            bands.append((y0, y))
if inb:
    bands.append((y0, len(rows)))
# склейка близких полос
merged = []
for b in bands:
    if merged and b[0] - merged[-1][1] < 18:
        merged[-1] = (merged[-1][0], b[1])
    else:
        merged.append(list(b))
merged = [tuple(x) for x in merged]
print('полос найдено:', len(merged))
for i, (y0, y1) in enumerate(merged):
    pad = 12
    a, b_ = max(0, y0 - pad), min(img.shape[0], y1 + pad)
    crop = img[a:b_, :, :]
    z = cv2.resize(crop, None, fx=2.2, fy=2.2, interpolation=cv2.INTER_CUBIC)
    p = os.path.join(OUT, 'line_%02d.png' % i)
    cv2.imwrite(p, z)
    # усиление контраста
    gg = cv2.cvtColor(z, cv2.COLOR_BGR2GRAY)
    gg = cv2.normalize(gg, None, 0, 255, cv2.NORM_MINMAX)
    cv2.imwrite(os.path.join(OUT, 'line_%02d_hc.png' % i), gg)
    print('  line_%02d  y=%d..%d  h=%d  -> %s' % (i, a, b_, b_ - a, p))

# верхняя зона (заголовок WIFA↑/47) и нижняя (если что-то отдельно)
h = img.shape[0]
cv2.imwrite(os.path.join(OUT, 'top.png'),
            cv2.resize(img[0:int(h * 0.22)], None, fx=2.0, fy=2.0, interpolation=cv2.INTER_CUBIC))
cv2.imwrite(os.path.join(OUT, 'bottom.png'),
            cv2.resize(img[int(h * 0.75):], None, fx=2.0, fy=2.0, interpolation=cv2.INTER_CUBIC))
print('готово ->', OUT)
