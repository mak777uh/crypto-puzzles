# -*- coding: utf-8 -*-
"""H7e: гипотеза «стабильный слот» = признак бита.

Формулировка сообщества: «one STABLE slot every 10 frames». Слово stable может быть и
есть сам признак: слот, внутри которого 10 кадров одинаковы (стоячая картинка) = 1,
слот из движения = 0. Проверяем эту и соседние интерпретации на полном потоке кадров,
калибровка — `discoverglimmer` (120 данных слотов уже подтверждены в h7c).
"""
from __future__ import annotations

import subprocess
import sys
from pathlib import Path

import numpy as np

STEP = 10
SEP = [8, 17, 26, 35, 44, 53, 62, 71, 80, 89, 98, 107, 116, 125]
TARGET = "discoverglimmer"


def all_frames(path: Path, scale: int) -> np.ndarray:
    out = subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries",
                          "stream=nb_frames", "-of", "csv=p=0", str(path)],
                         capture_output=True, text=True, check=True).stdout.strip()
    n = int(out or 0)
    p = subprocess.run(["ffmpeg", "-hide_banner", "-v", "error", "-i", str(path), "-an", "-vf",
                        "scale=%d:%d,format=gray" % (scale, scale), "-f", "rawvideo",
                        "-pix_fmt", "gray", "-"], capture_output=True, check=True).stdout
    a = np.frombuffer(p, dtype=np.uint8).reshape(-1, scale, scale).astype(np.float32)
    return a


def decode(bits):
    res = []
    for msb in (True, False):
        for pol in (1, 0):
            b = list(bits) if pol else [1 - x for x in bits]
            s = ""
            for i in range(0, len(b) // 8 * 8, 8):
                g = b[i:i + 8] if msb else b[i:i + 8][::-1]
                v = int("".join(map(str, g)), 2)
                s += chr(v) if 32 <= v < 127 else "?"
            res.append(("%s/%s" % ("msb" if msb else "lsb", "pos" if pol else "neg"), s))
    return res


def report(name, bits, extra=""):
    hits = [(m, s) for m, s in decode(bits) if TARGET in s.lower()]
    print("  %-28s %s  best=%s" % (name, extra, hits[0] if hits else "нет калибровки"))
    return hits


def main() -> int:
    path = Path(sys.argv[1])
    a = all_frames(path, 64)
    print("%s: кадров %d" % (path.name, len(a)))
    # слот i = кадры [i*10, i*10+10)
    nslots = len(a) // STEP
    win = a[:nslots * STEP].reshape(nslots, STEP, 64, 64)
    intra = np.abs(win[:, 1:] - win[:, :-1]).mean(axis=(1, 2, 3))          # движение внутри слота
    lastdiff = np.abs(win[:, -1] - win[:, 0]).mean(axis=(1, 2))            # изменение слота
    print("intra первых 16: %s" % " ".join("%.2f" % x for x in intra[:16]))
    data_idx = [i for i in range(0, 134) if i not in set(SEP)][:120]
    print("данных слотов: %d" % len(data_idx))
    for name, vec in (("intra-движение", intra), ("lastdiff", lastdiff),
                      ("std внутри слота", win.std(axis=1).reshape(nslots, -1).mean(axis=1))):
        v = np.array([vec[i] for i in data_idx])
        med = float(np.median(v))
        report(name, [1 if x > med else 0 for x in v], "медиана %.3f" % med)
        # порог по квантилям 0.35/0.65 — на случай 70/30 распределения
        for q in (0.3, 0.4, 0.6, 0.7):
            t = float(np.quantile(v, q))
            report("%s q=%.1f" % (name, q), [1 if x > t else 0 for x in v], "порог %.3f" % t)
    return 0


if __name__ == "__main__":
    sys.exit(main())
