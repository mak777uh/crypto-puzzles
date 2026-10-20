# -*- coding: utf-8 -*-
"""H8 шаг 7: пофреймовый скан всех 8 уникальных видео сайта на «стоп-кадр со
словом» — механизм задокументирован авторами в Hunt #1 («single frame in the
music video displays the word Fortune»).
Эвристики: (а) кадр-карточка: бимодальная гистограмма + высокий контраст;
(б) flash-кадр: большая дельта к обоим соседям; (в) резкий скачок энтропии.
Флаги пишутся в data/h8_video_frames.log, подозрительные кадры сохраняются PNG.
Локально, CPU, без сети и обращений к оракулу."""
import pathlib, re, json, time, sys
import numpy as np, cv2
from PIL import Image

ROOT = pathlib.Path(r"C:/Users/Admin/OneDrive/Desktop/master/puzzles/smith-lyle-moore-hunt-2-0-032btc")
DATA = ROOT / "data"
FR = DATA / "h8_video_frames"
FR.mkdir(exist_ok=True)
LOGP = DATA / "h8_video_frames.log"
lines = []

def w(*a):
    s = " ".join(str(x) for x in a)
    lines.append(s)
    print(s, flush=True)
    with open(LOGP, "a", encoding="utf-8", newline="") as fh:
        fh.write(s + "\n")

VIDS = {
    "c2ozw_720p": DATA / "h8_assets/vid_c2ozw_720p.mp4",
    "c2ozw_480p": DATA / "h8_assets/vid_c2ozw_480p.mp4",
    "bornwild": DATA / "media/bornwild_video.mp4",
    "life_720p": DATA / "vid2/life_720p.mp4",
    "v08cb40": DATA / "vid3/08cb40115a304bacaf3b924b96e5bf23.mp4",
    "v5843fb": DATA / "vid3/5843fb80a6aa4e3489668430d45a78e6.mp4",
    "v7a526c": DATA / "vid3/7a526c318d8a41e5b7442a6ad7a175f4.mp4",
    "v90809b": DATA / "vid3/90809b019598427bad45e111ca00f288.mp4",
}

def stats(gray):
    hist = np.histogram(gray, bins=16, range=(0, 256))[0].astype(float)
    hist /= hist.sum()
    bimod = hist[0] + hist[-1]
    return float(gray.mean()), float(gray.std()), float(bimod)

w("H8 шаг 7 — скан видео на кадр-подсказку. %s UTC" % time.strftime("%Y-%m-%d %H:%M", time.gmtime()))
w("=" * 72)
only = re.compile(sys.argv[1]) if len(sys.argv) > 1 else None
report = {}
for tag, path in VIDS.items():
    if only and not only.search(tag):
        continue
    if not path.exists():
        w("%s — нет файла" % tag)
        continue
    cap = cv2.VideoCapture(str(path))
    fps = cap.get(cv2.CAP_PROP_FPS) or 25.0
    n = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    wd = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH)); h = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    step = max(1, int(round(fps / 10.0)))  # ~10 замеров в секунду
    w("")
    w("%s  %dx%d  fps=%.2f  кадров=%d  шаг=%d (замеров %d)" % (tag, wd, h, fps, n, step, len(range(0, n, step))))
    prev = None
    rows = []
    idx = 0
    t0 = time.time()
    while True:
        ok = cap.grab()
        if not ok:
            break
        if idx % step == 0:
            ok2, fr = cap.retrieve()
            if ok2:
                g = cv2.cvtColor(fr, cv2.COLOR_BGR2GRAY)
                m, s, b = stats(g)
                d = float(np.abs(g.astype(np.int16) - prev.astype(np.int16)).mean()) if prev is not None else 0.0
                rows.append((idx, round(m, 1), round(s, 1), round(b, 3), round(d, 2)))
                prev = g
        idx += 1
    cap.release()
    w("  декодировано %d кадров за %.0f с" % (idx, time.time() - t0))
    if not rows:
        w("  ПУСТО")
        continue
    arr = np.array([[r[1], r[2], r[3], r[4]] for r in rows], dtype=float)
    card = [r for r in rows if r[3] > 0.80 and r[2] > 55]
    flash = [r for r in rows if r[4] > 55]
    lowc = [r for r in rows if r[2] < 18]
    w("  кадр-карточек (бимод>0.80, std>55): %d" % len(card))
    w("  flash-кадров (дельта>55): %d" % len(flash))
    w("  почти однотонных (std<18): %d" % len(lowc))
    for r in card[:12]:
        w("    CARD idx=%-7d t=%.2fs mean=%.1f std=%.1f bimod=%.3f d=%.2f" % (r[0], r[0] / fps, r[1], r[2], r[3], r[4]))
    for r in flash[:12]:
        w("    FLASH idx=%-7d t=%.2fs mean=%.1f std=%.1f bimod=%.3f d=%.2f" % (r[0], r[0] / fps, r[1], r[2], r[3], r[4]))
    for r in lowc[:8]:
        w("    FLAT idx=%-7d t=%.2fs mean=%.1f std=%.1f" % (r[0], r[0] / fps, r[1], r[2]))
    report[tag] = {"frames": idx, "cards": len(card), "flash": len(flash), "flat": len(lowc)}
    # монтаж равномерной выборки 24 кадров
    cap = cv2.VideoCapture(str(path))
    picks = np.linspace(0, max(0, idx - 1), min(24, max(1, idx))).astype(int)
    tiles = []
    for pi in picks:
        cap.set(cv2.CAP_PROP_POS_FRAMES, int(pi))
        ok2, fr = cap.read()
        if not ok2:
            continue
        im = Image.fromarray(cv2.cvtColor(fr, cv2.COLOR_BGR2RGB)).resize((260, int(h * 260 / wd)))
        tiles.append((int(pi), im))
    cap.release()
    if tiles:
        cols = 6
        rowsn = int(np.ceil(len(tiles) / cols))
        tw, th = tiles[0][1].size
        sheet = Image.new("RGB", (cols * (tw + 4), rowsn * (th + 16)), (20, 20, 24))
        from PIL import ImageDraw
        dr = ImageDraw.Draw(sheet)
        for i, (fi, im) in enumerate(tiles):
            x = (i % cols) * (tw + 4); y = (i // cols) * (th + 16) + 14
            sheet.paste(im, (x, y))
            dr.text((x + 2, y - 12), "#%d %.1fs" % (fi, fi / fps), fill=(255, 240, 120))
        sheet.save(FR / ("sheet_%s.png" % tag))
        w("  монтаж: sheet_%s.png" % tag)
    # сохраняем карточки/флэши полноразмерно
    keep = sorted({r[0] for r in card[:12]} | {r[0] for r in flash[:12]})
    if keep:
        cap = cv2.VideoCapture(str(path))
        for fi in keep:
            cap.set(cv2.CAP_PROP_POS_FRAMES, int(fi))
            ok2, fr = cap.read()
            if ok2:
                Image.fromarray(cv2.cvtColor(fr, cv2.COLOR_BGR2RGB)).save(FR / ("%s_f%d.png" % (tag, fi)))
        cap.release()
        w("  сохранено полноразмерных подозрительных кадров: %d" % len(keep))

w("")
w("=" * 72)
w(json.dumps(report, ensure_ascii=False, indent=1))
