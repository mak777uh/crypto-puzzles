# -*- coding: utf-8 -*-
"""H8 шаг 5: LSB-стеганализ всех скачанных ассетов + поиск изолированных
изменённых пикселей между кадрами GIF. Офлайн, CPU, без обращений к оракулу.
Ищем: (а) ASCII-потоки в LSB-плоскостях, (б) пиксели, изменённые в «статичных»
областях (небо/вода) — типичный носитель битмапа, (в) LSB-карту, дающую читаемый
паттерн (например, строку точек)."""
import json, pathlib, re
import numpy as np
from PIL import Image

ROOT = pathlib.Path(r"C:/Users/Admin/OneDrive/Desktop/master/puzzles/smith-lyle-moore-hunt-2-0-032btc")
DATA = ROOT / "data"
OUT = DATA / "h8_assets"
LOGP = DATA / "h8_lsb.log"
lines = []

def w(*a):
    s = " ".join(str(x) for x in a)
    lines.append(s)
    print(s, flush=True)
    with open(LOGP, "w", encoding="utf-8", newline="") as fh:
        fh.write("\n".join(lines) + "\n")

RUN = re.compile(rb"[\x20-\x7e]{8,}")

def lsb_bytes(arr, bit=0, ch=None):
    """упаковка LSB (bit-й плоскости) каналов в байты, MSB-first"""
    a = arr[:, :, ch] if ch is not None else arr
    if a.ndim == 3:
        flat = a.reshape(-1)
    else:
        flat = a.reshape(-1)
    bits = (flat >> bit) & 1
    n = (len(bits) // 8) * 8
    packed = np.packbits(bits[:n], bitorder="big")
    return packed.tobytes()

def scan(arr, name):
    hits = 0
    for bit in range(3):
        for ch, cn in ((None, "rgb"), (0, "r"), (1, "g"), (2, "b")):
            blob = lsb_bytes(arr, bit, ch)
            for m in RUN.finditer(blob):
                s = m.group()
                # отбрасываем типичный мусор: слишком «шумные» строки
                letters = sum(1 for c in s if 65 <= c <= 122 or c == 32)
                if letters / max(1, len(s)) > 0.85:
                    w("    [LSB b%d %s] %s" % (bit, cn, s.decode()[:160]))
                    hits += 1
                    if hits > 40:
                        return hits
    return hits

w("H8 шаг 5 — LSB/пиксельный анализ. Старт.")
w("=" * 72)
tot_hits = 0
for p in sorted(OUT.iterdir()):
    if p.suffix.lower() not in (".png", ".jpg", ".jpeg", ".gif"):
        continue
    try:
        im = Image.open(p)
    except Exception as e:
        w("%s — не открывается (%r)" % (p.name[:40], e))
        continue
    if p.suffix.lower() == ".gif":
        n = getattr(im, "n_frames", 1)
        frames = []
        comp = None
        for i in range(min(n, 80)):
            im.seek(i)
            cur = im.convert("RGBA")
            if comp is None:
                comp = Image.new("RGBA", im.size, (0, 0, 0, 255))
            comp.alpha_composite(cur)
            frames.append(np.array(comp.convert("RGB"), dtype=np.uint8))
        w("")
        w("%s  gif %dx%d  кадров=%d (разобрано %d)" % (p.name[:46], im.size[0], im.size[1], n, len(frames)))
        # (а) LSB по первому и последнему кадру
        for lbl, f in (("f0", frames[0]), ("f-1", frames[-1])):
            h = scan(f, p.name)
            tot_hits += h
            w("  LSB %s: осмысленных строк %d" % (lbl, h))
        # (б) стабильные пиксели, меняющиеся ровно в одном кадре
        stack = np.stack(frames).astype(np.int16)
        mn, mx = stack.min(axis=0), stack.max(axis=0)
        var = (mx - mn).max(axis=2)
        # области, где изменение мало, но nonzero в одном кадре на 1-2 уровня
        changed_per_frame = []
        for i in range(1, len(frames)):
            d = np.abs(stack[i] - stack[i - 1]).max(axis=2)
            changed_per_frame.append(int((d > 0).sum()))
        w("  изменённых пикселей по кадрам: %s" % str(changed_per_frame[:40]))
        # пиксели с малой дельтой (1..6) — кандидаты на LSB-носитель
        small = ((var > 0) & (var <= 6))
        w("  пикселей с дельтой 1..6 (LSB-диапазон): %d" % int(small.sum()))
        if 0 < int(small.sum()) < 20000:
            ys, xs = np.where(small)
            w("    bbox x[%d..%d] y[%d..%d]" % (xs.min(), xs.max(), ys.min(), ys.max()))
            # карта: рисуем mask в файл
            m = Image.fromarray((small.astype(np.uint8) * 255))
            m.save(DATA / "h8_frames" / ("lsbmask_%s.png" % p.name.split("_")[1][:12]))
    else:
        arr = np.array(im.convert("RGB"), dtype=np.uint8)
        w("")
        w("%s  %s %dx%d" % (p.name[:46], p.suffix, im.size[0], im.size[1]))
        h = scan(arr, p.name)
        tot_hits += h
        w("  LSB: осмысленных строк %d" % h)

w("")
w("=" * 72)
w("ВСЕГО осмысленных LSB-строк: %d" % tot_hits)
