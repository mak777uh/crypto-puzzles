"""Calibrate glyph-component counting on P1S1: key-line band vs background."""
import cv2
import numpy as np

ROOT = r"C:\Users\Admin\OneDrive\Desktop\master\puzzles\crypto-puzzles-2018-puzzle-2-0-05eth"


def masks(fr, zthr=3.0):
    g = cv2.cvtColor(fr, cv2.COLOR_BGR2GRAY).astype(np.float32) / 255.0
    k = cv2.getStructuringElement(cv2.MORPH_RECT, (13, 13))
    th = cv2.morphologyEx(g, cv2.MORPH_TOPHAT, k)
    mu = cv2.GaussianBlur(g, (0, 0), 7)
    sd = np.sqrt(np.maximum(cv2.GaussianBlur(g * g, (0, 0), 7) - mu * mu, 1e-6)) + 1e-6
    z = (g - mu) / sd
    return z, th


def comps(mask, minh=18, maxh=95, minw=3, maxw=70):
    n, lab, stats, cent = cv2.connectedComponentsWithStats(mask.astype(np.uint8), 8)
    out = []
    for i in range(1, n):
        x, y, w, h, a = stats[i]
        if minh <= h <= maxh and minw <= w <= maxw and a >= 8:
            out.append((x, y, w, h, a))
    return out


cap = cv2.VideoCapture(ROOT + r"\data\3l1jFa3Mw0s_720p60.mp4")
for f in (100, 300, 500, 650, 720, 900, 1100):
    cap.set(cv2.CAP_PROP_POS_FRAMES, f)
    ok, fr = cap.read()
    if not ok:
        continue
    z, th = masks(fr, 3.0)
    for band, (y0, y1) in {"key330": (315, 415), "top": (60, 160), "bottom": (500, 600)}.items():
        m = (z[y0:y1] > 3.0).astype(np.uint8)
        cs = comps(m)
        print(f"f={f} band={band} n={len(cs)} sizes={sorted([c[3] for c in cs], reverse=True)[:8]}")
cap.release()
