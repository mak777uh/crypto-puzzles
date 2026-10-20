# -*- coding: utf-8 -*-
"""H8 шаг 4: пофреймовый разбор GIF-ассетов сайта.
Механизм задокументирован авторами: в Hunt #1 «single frame ... displays the word
Fortune» — т.е. спрятанное слово может быть отдельным кадром GIF/видео.
Делает: полные композитные кадры, статистику различий, монтаж-лист (montage) по
каждому GIF + отдельные PNG спорных кадров. Локально, без сети, без обращений к
ораклу Wix, транзакций нет."""
import os, io, json, pathlib
import numpy as np
from PIL import Image

ROOT = pathlib.Path(r"C:/Users/Admin/OneDrive/Desktop/master/puzzles/smith-lyle-moore-hunt-2-0-032btc")
DATA = ROOT / "data"
OUT = DATA / "h8_assets"
FR = DATA / "h8_frames"
FR.mkdir(exist_ok=True)
LOGP = DATA / "h8_frames.log"
lines = []

def w(*a):
    s = " ".join(str(x) for x in a)
    lines.append(s)
    print(s, flush=True)
    with open(LOGP, "w", encoding="utf-8", newline="") as fh:
        fh.write("\n".join(lines) + "\n")

def frames_full(im):
    """полные композитные кадры (disp=None → накапливаем), список RGB ndarray"""
    n = getattr(im, "n_frames", 1)
    out = []
    comp = None
    for i in range(n):
        im.seek(i)
        rgba = im.convert("RGBA")
        if i == 0:
            comp = Image.new("RGBA", im.size, (0, 0, 0, 255))
        comp.alpha_composite(rgba)
        out.append(np.array(comp.convert("RGB")))
    return out

gifs = sorted([p for p in OUT.iterdir() if p.suffix.lower() == ".gif"])
w("H8 шаг 4 — пофреймовый разбор. GIF: %d" % len(gifs))
w("=" * 72)
summary = []
for p in gifs:
    im = Image.open(p)
    fs = frames_full(im)
    n = len(fs)
    h, wd = fs[0].shape[:2]
    diffs = []
    for i in range(1, n):
        d = np.abs(fs[i].astype(np.int16) - fs[i - 1].astype(np.int16)).mean()
        diffs.append(round(float(d), 2))
    uniq = [round(float(np.unique(f.reshape(-1, 3), axis=0).shape[0]), 0) for f in fs[:200]]
    bright = [round(float(f.mean()), 1) for f in fs]
    w("")
    w("%s  %dx%d  кадров=%d" % (p.name[:50], wd, h, n))
    w("  макс. дельта кадра %s (idx %s), медиана дельты %.2f" %
      (max(diffs) if diffs else 0, diffs.index(max(diffs)) + 1 if diffs else "-1",
       float(np.median(diffs)) if diffs else 0))
    # аномальные кадры: unusually похожи на текст (мало цветов / сильный контраст)
    cand = []
    for i, f in enumerate(fs):
        u = np.unique(f.reshape(-1, 3), axis=0).shape[0]
        gray = f.mean(axis=2)
        hist, _ = np.histogram(gray, bins=16, range=(0, 256))
        hist = hist / hist.sum()
        # бимодальность (много чисто чёрного и чисто белого) = вероятный текст
        bimod = hist[0] + hist[-1]
        if u < 90 or (bimod > 0.75 and gray.std() > 55):
            cand.append((i, int(u), round(float(bimod), 3), round(float(gray.std()), 1)))
    if cand:
        w("  кадры-кандидаты (мало цветов / бимодальный): %d" % len(cand))
        for c in cand[:15]:
            w("    idx=%-3d uniq=%-5d bimod=%.2f std=%.1f" % c)
    # montage
    cols = min(8, max(1, int(np.ceil(np.sqrt(n * 1.6)))) if n > 1 else 1)
    rows = int(np.ceil(n / cols))
    tw = 240
    th = max(1, int(h * tw / wd))
    sheet = Image.new("RGB", (cols * (tw + 6), rows * (th + 18)), (24, 24, 28))
    from PIL import ImageDraw
    dr = ImageDraw.Draw(sheet)
    for i, f in enumerate(fs):
        img = Image.fromarray(f).resize((tw, th))
        x = (i % cols) * (tw + 6)
        y = (i // cols) * (th + 18) + 16
        sheet.paste(img, (x, y))
        dr.text((x + 2, y - 14), "#%d" % i, fill=(255, 240, 120))
    mname = FR / ("mont_%s.png" % p.name.split("_")[1][:12])
    sheet.save(mname)
    # подписи-файлы самых «текстовых» кадров в полном размере
    for i, u, bm, sd in (cand[:6] if cand else []):
        Image.fromarray(fs[i]).save(FR / ("%s_f%03d.png" % (p.name.split("_")[1][:12], i)))
    summary.append({"asset": p.name, "frames": n, "size": [wd, h], "montage": mname.name,
                    "candidates": len(cand)})
    w("  монтаж: %s (%dx%d)" % (mname.name, sheet.size[0], sheet.size[1]))

w("")
w("=" * 72)
w(json.dumps(summary, ensure_ascii=False, indent=1))
w("фреймы и монтажи в data/h8_frames/")
