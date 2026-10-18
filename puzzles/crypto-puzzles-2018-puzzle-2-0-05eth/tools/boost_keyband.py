"""Boost faint thin-serif text in P1 statement videos to test for >36 / >12 glyphs."""
import cv2
import numpy as np

ROOT = r"C:\Users\Admin\OneDrive\Desktop\master\puzzles\crypto-puzzles-2018-puzzle-2-0-05eth"


def boost(gray, k=21):
    """Top-hat + local normalization: isolate thin bright strokes."""
    gray = gray.astype(np.float32) / 255.0
    kk = cv2.getStructuringElement(cv2.MORPH_RECT, (k, k))
    th = cv2.morphologyEx(gray, cv2.MORPH_TOPHAT, kk)
    # local mean/std
    mu = cv2.GaussianBlur(gray, (0, 0), 9)
    sd = np.sqrt(np.maximum(cv2.GaussianBlur(gray * gray, (0, 0), 9) - mu * mu, 1e-6))
    z = (gray - mu) / sd
    return th, z


def save(name, img):
    cv2.imwrite(ROOT + r"\data\f720\\" + name, img)
    print(name, img.shape, float(img.min()), float(img.max()))


def stretch(img, lo=0.0, hi=99.9):
    a, b = np.percentile(img, [lo, hi])
    return np.clip((img - a) / max(b - a, 1e-6), 0, 1)


# --- P1S1: t = 12.0 s, key line y ~ 330..390
cap = cv2.VideoCapture(ROOT + r"\data\3l1jFa3Mw0s_720p60.mp4")
cap.set(cv2.CAP_PROP_POS_FRAMES, 720)
ok, fr = cap.read()
cap.release()
print("p1s1 frame", ok, None if fr is None else fr.shape)
g = cv2.cvtColor(fr, cv2.COLOR_BGR2GRAY)
crop = g[315:410, :]
th, z = boost(crop, 21)
save("p1s1_boost_th.png", (stretch(th) * 255).astype(np.uint8))
save("p1s1_boost_z.png", (stretch(z) * 255).astype(np.uint8))
# right end only, x >= 900, stronger percentile bounds
right = crop[:, 900:]
th2, z2 = boost(right, 15)
save("p1s1_boost_right_th.png", (stretch(th2, 0.5, 99.98) * 255).astype(np.uint8))
save("p1s1_boost_right_z.png", (stretch(z2, 0.5, 99.98) * 255).astype(np.uint8))

# temporal max over the static window (frames 360..1150 = 6..19.2 s)
cap = cv2.VideoCapture(ROOT + r"\data\3l1jFa3Mw0s_720p60.mp4")
acc = None
i = 0
while True:
    ok, fr = cap.read()
    if not ok:
        break
    if 360 <= i <= 1150:
        g = cv2.cvtColor(fr, cv2.COLOR_BGR2GRAY).astype(np.float32)
        acc = g if acc is None else np.maximum(acc, g)
    i += 1
cap.release()
print("frames", i, "acc", None if acc is None else acc.shape)
mx = acc.astype(np.uint8)
save("p1s1_win_max.png", mx)
crop = mx[315:410, :]
th, z = boost(crop, 21)
save("p1s1_winmax_boost_th.png", (stretch(th) * 255).astype(np.uint8))
save("p1s1_winmax_boost_z.png", (stretch(z) * 255).astype(np.uint8))
right = crop[:, 900:]
th2, z2 = boost(right, 15)
save("p1s1_winmax_right_th.png", (stretch(th2, 0.5, 99.98) * 255).astype(np.uint8))
save("p1s1_winmax_right_z.png", (stretch(z2, 0.5, 99.98) * 255).astype(np.uint8))

# --- P1S2: bottom band y 430..700, frames 8..19 s
cap = cv2.VideoCapture(ROOT + r"\data\hX-pOBj8VsI_720p60.mp4")
cap.set(cv2.CAP_PROP_POS_FRAMES, 720)
ok, fr = cap.read()
cap.release()
print("p1s2 frame", ok, None if fr is None else fr.shape)
g = cv2.cvtColor(fr, cv2.COLOR_BGR2GRAY)
crop = g[430:700, :]
th, z = boost(crop, 21)
save("p1s2_boost_th.png", (stretch(th) * 255).astype(np.uint8))
save("p1s2_boost_z.png", (stretch(z) * 255).astype(np.uint8))
# rotated 180 for readability
for nm, im in [("p1s2_boost_th_rot180.png", th), ("p1s2_boost_z_rot180.png", z)]:
    save(nm, (stretch(cv2.rotate(im, cv2.ROTATE_180)) * 255).astype(np.uint8))
