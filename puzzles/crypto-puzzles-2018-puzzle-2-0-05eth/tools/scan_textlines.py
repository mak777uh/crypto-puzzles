"""Scan videos for thin-serif text lines: per-frame top-hat stroke energy by row band.
Validated on P1S1 (known 36-char line at y~330-390)."""
import cv2
import numpy as np
import sys
import json

ROOT = r"C:\Users\Admin\OneDrive\Desktop\master\puzzles\crypto-puzzles-2018-puzzle-2-0-05eth"


def scan(path, tag, step=1, zthr=3.5, band_h=40, stride=10):
    cap = cv2.VideoCapture(path)
    n = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    fps = cap.get(cv2.CAP_PROP_FPS)
    rows = []
    idx = 0
    while True:
        ok = cap.grab()
        if not ok:
            break
        if idx % step == 0:
            ok, fr = cap.retrieve()
            if not ok:
                break
            g = cv2.cvtColor(fr, cv2.COLOR_BGR2GRAY).astype(np.float32) / 255.0
            k = cv2.getStructuringElement(cv2.MORPH_RECT, (13, 13))
            th = cv2.morphologyEx(g, cv2.MORPH_TOPHAT, k)
            mu = cv2.GaussianBlur(g, (0, 0), 7)
            sd = np.sqrt(np.maximum(cv2.GaussianBlur(g * g, (0, 0), 7) - mu * mu, 1e-6)) + 1e-6
            z = (g - mu) / sd
            mask = (z > zthr).astype(np.float32)
            # row profile
            prof = mask.sum(axis=1)
            best = []
            for y0 in range(0, 720 - band_h, stride):
                e = float(prof[y0:y0 + band_h].sum())
                best.append((e, y0))
            best.sort(reverse=True)
            e1, y1 = best[0]
            e2, y2 = best[1]
            rows.append({"f": idx, "t": round(idx / fps, 3), "e": e1, "y": y1, "e2": e2, "y2": y2})
        idx += 1
    cap.release()
    rows.sort(key=lambda r: -r["e"])
    print(f"== {tag}: {n} frames, fps={fps}; top bands:")
    for r in rows[:25]:
        print(f"  t={r['t']:6.2f} f={r['f']:5d} e={r['e']:7.0f} y={r['y']:3d} | second e2={r['e2']:7.0f} y2={r['y2']}")
    with open(ROOT + r"\data\scan_" + tag + ".json", "w") as fh:
        json.dump(rows[:200], fh)


if __name__ == "__main__":
    vids = sys.argv[1:]
    if not vids:
        vids = ["p1s1", "p1s2", "p2p1", "p2p2"]
    mp = {
        "p1s1": r"\data\3l1jFa3Mw0s_720p60.mp4",
        "p1s2": r"\data\hX-pOBj8VsI_720p60.mp4",
        "p2p1": r"\data\TRUUTryah70_720p60.mp4",
        "p2p2": r"\data\U_0DtYHDPy0_720p60.mp4",
    }
    for v in vids:
        scan(ROOT + mp[v], v)
