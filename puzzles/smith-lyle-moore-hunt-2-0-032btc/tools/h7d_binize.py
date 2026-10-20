# -*- coding: utf-8 -*-
"""H7d: бинаризация 120 монтажных слотов — k-means по пикселям и по признакам.

Структура уже подтверждена (h7c): в data/vid3/08cb40115a304bacaf3b924b96e5bf23.mp4 слоты 0..133,
разделитель на позициях 8,17,...,125 (14 шт., шаг ровно 9) => 120 данных слотов = 15 байт.
Неизвестно только, какой признак задаёт 0/1. Перебираем: k-means(k=2) по пикселям, по яркости,
по цветовым гистограммам, по hue, по каждой 16x16-четверти, плюс средняя/медианная граница.
Калибровка: должно читаться `discoverglimmer`.
"""
from __future__ import annotations

import subprocess
import sys
from pathlib import Path

import numpy as np

STEP = 10
SEP_PERIOD = 9
TARGET = "discoverglimmer"


def frames(path: Path) -> np.ndarray:
    out = subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries",
                          "stream=r_frame_rate", "-of", "csv=p=0", str(path)],
                         capture_output=True, text=True, check=True).stdout.strip()
    num, _, den = out.partition("/")
    fps = float(num) / float(den or 1)
    p = subprocess.run(["ffmpeg", "-hide_banner", "-v", "error", "-i", str(path), "-an", "-vf",
                        "fps=%.6f,scale=64:64" % (fps / STEP), "-f", "rawvideo",
                        "-pix_fmt", "rgb24", "-"], capture_output=True, check=True).stdout
    a = np.frombuffer(p, dtype=np.uint8).reshape(-1, 64, 64, 3).astype(np.float32)
    return a


def sep_positions(a, thr=6.0):
    n = len(a)
    best = None
    for i in range(n - SEP_PERIOD * 3):
        hits = tot = 0
        for k in range(1, 20):
            j = i + SEP_PERIOD * k
            if j >= n:
                break
            tot += 1
            if np.abs(a[i] - a[j]).mean() < thr:
                hits += 1
        if tot >= 8 and (best is None or hits / tot > best[0]):
            best = (hits / tot, i, tot)
    if not best:
        return []
    _, i, tot = best
    return [i + SEP_PERIOD * k for k in range(tot + 1)
            if i + SEP_PERIOD * k < n and np.abs(a[i] - a[i + SEP_PERIOD * k]).mean() < thr]


def kmeans2(x, iters=25):
    c0, c1 = np.median(x, axis=0), x[np.argmax(x[:, 0] if x.shape[1] else 0)]
    c0 = x[0].copy()
    c1 = x[np.argmax(np.abs(x - c0).mean(axis=1))].copy()
    lab = None
    for _ in range(iters):
        d0 = np.abs(x - c0).mean(axis=1)
        d1 = np.abs(x - c1).mean(axis=1)
        lab = (d1 < d0).astype(int)
        if lab.all() or (1 - lab).all():
            break
        c0 = x[lab == 0].mean(axis=0) if (lab == 0).any() else c0
        c1 = x[lab == 1].mean(axis=0) if (lab == 1).any() else c1
    return lab


def decode(bits):
    outs = []
    for msb in (True, False):
        for pol in (1, 0):
            b = list(bits) if pol else [1 - x for x in bits]
            s = ""
            for i in range(0, len(b) // 8 * 8, 8):
                g = b[i:i + 8] if msb else b[i:i + 8][::-1]
                v = int("".join(map(str, g)), 2)
                s += chr(v) if 32 <= v < 127 else "?"
            outs.append(("%s/%s" % ("msb" if msb else "lsb", "pos" if pol else "neg"), s))
    return outs


def main() -> int:
    path = Path(sys.argv[1])
    a = frames(path)
    pos = sep_positions(a)
    print("%s: слотов %d, разделители %s" % (path.name, len(a), pos))
    window = range(0, pos[-1] + SEP_PERIOD)
    data = [i for i in window if i not in set(pos)]
    print("данных слотов: %d (ожидаем 120)" % len(data))
    sub = a[data]
    gray = sub.mean(axis=2)
    feats = {
        "пиксели rgb": sub.reshape(len(sub), -1),
        "пиксели gray": gray.reshape(len(sub), -1),
        "левая половина": gray[:, :32].reshape(len(sub), -1),
        "правая половина": gray[:, 32:].reshape(len(sub), -1),
        "верхняя половина": gray[:32].reshape(len(sub), -1) if False else gray[:, :, :32].reshape(len(sub), -1),
        "яркость": gray.reshape(len(sub), -1).mean(axis=1, keepdims=True),
        "контраст": gray.reshape(len(sub), -1).std(axis=1, keepdims=True),
        "r-b": (sub[:, :, :, 0] - sub[:, :, :, 2]).reshape(len(sub), -1),
    }
    found = []
    for name, x in feats.items():
        lab = kmeans2(x)
        for bits, tag in ((lab.tolist(), "kmeans"),
                          ([1 if v > np.median(x[:, 0]) else 0 for v in x[:, 0]], "median") if x.shape[1] == 1 else ([], "-")):
            if not bits:
                continue
            for mode, s in decode(bits):
                if TARGET in s.lower():
                    found.append((name, tag, mode, s))
        # сдвиг фазы на 1..7 (выравнивание байтов)
        for off in range(1, 8):
            bits = lab.tolist()[off:]
            for mode, s in decode(bits):
                if TARGET in s.lower():
                    found.append((name, "kmeans+off%d" % off, mode, s))
    print("калибровка %r: %s" % (TARGET, found[:3] if found else "НЕ воспроизведена ни на одном признаке"))
    # что вообще читается — покажем 3 лучших по доле букв
    lab = kmeans2(feats["пиксели rgb"])
    for mode, s in decode(lab.tolist()):
        letters = sum(ch.isalpha() for ch in s)
        print("   %s (%d букв): %s" % (mode, letters, s[:60]))
    return 0


if __name__ == "__main__":
    sys.exit(main())
