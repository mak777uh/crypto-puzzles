"""Timeline scan: count glyph-stroke components per horizontal band and detect text lines."""
import cv2
import numpy as np
import json
import sys

ROOT = r"C:\Users\Admin\OneDrive\Desktop\master\puzzles\crypto-puzzles-2018-puzzle-2-0-05eth"
MP = {
    "p1s1": r"\data\3l1jFa3Mw0s_720p60.mp4",
    "p1s2": r"\data\hX-pOBj8VsI_720p60.mp4",
    "p2p1": r"\data\TRUUTryah70_720p60.mp4",
    "p2p2": r"\data\U_0DtYHDPy0_720p60.mp4",
}


def frame_score(fr, band_h=60, stride=20, ththr=0.15):
    g = cv2.cvtColor(fr, cv2.COLOR_BGR2GRAY).astype(np.float32) / 255.0
    k = cv2.getStructuringElement(cv2.MORPH_RECT, (13, 13))
    th = cv2.morphologyEx(g, cv2.MORPH_TOPHAT, k)
    best = (-1, 0, 0, 0)
    for y0 in range(0, 720 - band_h + 1, stride):
        m = (th[y0:y0 + band_h] > ththr).astype(np.uint8)
        if m.sum() < 60:
            continue
        n, lab, stats, cent = cv2.connectedComponentsWithStats(m, 8)
        cs = []
        for i in range(1, n):
            x, y, w, h, a = stats[i]
            if 12 <= h <= 95 and 2 <= w <= 70 and a >= 6:
                cs.append((cent[i][0], h, w))
        if len(cs) < 6:
            continue
        xs = [c[0] for c in cs]
        span = max(xs) - min(xs)
        score = len(cs) + span / 100.0
        if score > best[0]:
            best = (score, len(cs), span, y0)
    return best


def scan(tag, step=2):
    cap = cv2.VideoCapture(ROOT + MP[tag])
    fps = cap.get(cv2.CAP_PROP_FPS)
    rows = []
    i = 0
    while True:
        ok = cap.grab()
        if not ok:
            break
        if i % step == 0:
            ok, fr = cap.retrieve()
            if not ok:
                break
            s, n, span, y = frame_score(fr)
            rows.append({"f": i, "t": round(i / fps, 2), "n": n, "span": int(span), "y": int(y), "s": float(s)})
        i += 1
    cap.release()
    with open(ROOT + r"\data\scan2_" + tag + ".json", "w") as fh:
        json.dump(rows, fh)
    # summarize by 0.5 s buckets
    print(f"== {tag} frames={i}")
    buckets = {}
    for r in rows:
        b = int(r["t"] * 2) / 2
        cur = buckets.get(b)
        if cur is None or r["n"] > cur["n"]:
            buckets[b] = r
    for b in sorted(buckets):
        r = buckets[b]
        print(f"  t={b:5.1f} n={r['n']:3d} span={r['span']:4d} y={r['y']:3d}")


if __name__ == "__main__":
    for tag in sys.argv[1:]:
        scan(tag)
