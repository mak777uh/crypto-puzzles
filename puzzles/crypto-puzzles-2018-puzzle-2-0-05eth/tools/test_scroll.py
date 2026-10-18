"""Test whether the P1S1 key line scrolls horizontally (would expose missing chars)."""
import cv2
import numpy as np

ROOT = r"C:\Users\Admin\OneDrive\Desktop\master\puzzles\crypto-puzzles-2018-puzzle-2-0-05eth"
cap = cv2.VideoCapture(ROOT + r"\data\3l1jFa3Mw0s_720p60.mp4")


def band(fr, y0=320, y1=400):
    g = cv2.cvtColor(fr, cv2.COLOR_BGR2GRAY).astype(np.float32) / 255.0
    k = cv2.getStructuringElement(cv2.MORPH_RECT, (13, 13))
    return cv2.morphologyEx(g, cv2.MORPH_TOPHAT, k)[y0:y1]


# reference at 12s
cap.set(cv2.CAP_PROP_POS_FRAMES, 720)
ok, fr = cap.read()
ref = band(fr)
ref = ref - ref.mean()
refn = np.linalg.norm(ref) + 1e-9

print("t, best_shift, score (search +-400 px)")
for f in list(range(270, 360, 6)) + list(range(720, 780, 30)) + list(range(1140, 1200, 6)):
    cap.set(cv2.CAP_PROP_POS_FRAMES, f)
    ok, fr = cap.read()
    if not ok:
        break
    b = band(fr)
    b0 = b - b.mean()
    best = (-1, None)
    # use FFT-free loop on downsampled-by-2 to save time? line strokes thin -> keep full res
    for s in range(-400, 401, 2):
        if s >= 0:
            a = b0[:, s:]; c = ref[:, :a.shape[1]]
        else:
            a = b0[:, :s]; c = ref[:, -s:]
        if a.shape != c.shape or a.shape[1] < 200:
            continue
        d = (a * c).sum() / (np.linalg.norm(a) * np.linalg.norm(c) + 1e-9)
        if d > best[0]:
            best = (d, s)
    print(f"f={f} t={f/60:.2f} shift={best[1]} score={best[0]:.4f}")
cap.release()
