# -*- coding: utf-8 -*-
"""H7c: декод 120 данных слотов монтажа (калибровка: 14 разделителей с шагом ровно 9).

Подтверждено по файлу data/vid3/08cb40115a304bacaf3b924b96e5bf23.mp4: кластер-«берег»
 стоит на позициях 8,17,26,...,125 = 14 разделителей, шаг ровно 9 — в точности как в
 методе сообщества (id pejgs65), из которого получено `discoverglimmer`.
 Значит данные слоты = 134 - 14 = 120 = 15 байт ASCII.

Здесь: взять слоты монтажа (0..133), убрать разделители, по каждому слоту вычислить
бинарный признак несколькими способами и искать ASCII (в т.ч. `discoverglimmer`).
"""
from __future__ import annotations

import os
import subprocess
import sys
from pathlib import Path

import numpy as np

STEP = 10
SEP_PERIOD = 9


def src_fps(path: Path) -> float:
    out = subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries",
                          "stream=r_frame_rate", "-of", "csv=p=0", str(path)],
                         capture_output=True, text=True, check=True).stdout.strip()
    num, _, den = out.partition("/")
    return float(num) / float(den or 1)


def frames(path: Path) -> np.ndarray:
    rate = src_fps(path) / STEP
    p = subprocess.run(["ffmpeg", "-hide_banner", "-v", "error", "-i", str(path), "-an", "-vf",
                        "fps=%.6f,scale=64:64,format=gray" % rate, "-f", "rawvideo",
                        "-pix_fmt", "gray", "-"], capture_output=True, check=True).stdout
    return np.frombuffer(p, dtype=np.uint8).reshape(-1, 64, 64).astype(np.float32)


def find_sep(a):
    """Ищем кадр, повторяющийся с шагом SEP_PERIOD: возвращаем его индекс и позиции."""
    n = len(a)
    best = None
    for i in range(n - SEP_PERIOD * 3):
        hits = 0
        tot = 0
        for k in range(1, 20):
            j = i + SEP_PERIOD * k
            if j >= n:
                break
            tot += 1
            if np.abs(a[i] - a[j]).mean() < 6.0:
                hits += 1
        if tot >= 8 and (best is None or hits / tot > best[0]):
            best = (hits / tot, i, tot, hits)
    if not best:
        return None
    _, i, tot, hits = best
    pos = [i + SEP_PERIOD * k for k in range(tot + 1)
           if i + SEP_PERIOD * k < n and np.abs(a[i] - a[i + SEP_PERIOD * k]).mean() < 6.0]
    return i, pos


def ascii_of(bits):
    outs = []
    for msb in (True, False):
        for pol in (1, 0):
            b = list(bits) if pol else [1 - x for x in bits]
            s = ""
            for i in range(0, len(b) // 8 * 8, 8):
                grp = b[i:i + 8] if msb else b[i:i + 8][::-1]
                v = int("".join(map(str, grp)), 2)
                s += chr(v) if 32 <= v < 127 else "\x00"
            outs.append(("msb" if msb else "lsb", "pos" if pol else "neg", s.replace("\x00", "?")))
    return outs


def main() -> int:
    for v in sys.argv[1:]:
        path = Path(v) if os.path.isabs(v) else Path.cwd() / v
        a = frames(path)
        r = find_sep(a)
        print("\n== %s: слотов %d" % (path.name, len(a)))
        if not r:
            print("   разделитель с шагом 9 не найден")
            continue
        i0, pos = r
        print("   разделитель: базовый слот %d, позиции %s (%d шт.)" % (i0, pos, len(pos)))
        end = pos[-1] + SEP_PERIOD
        data = [i for i in range(0, min(end + 1, len(a))) if i not in set(pos)]
        print("   окно монтажа 0..%d, данных слотов: %d (ожидаем 120)" % (end, len(data)))
        sub = a[data]
        feats = {
            "яркость": sub.reshape(len(sub), -1).mean(axis=1),
            "левая половина": sub[:, :, :32].reshape(len(sub), -1).mean(axis=1),
            "правая половина": sub[:, :, 32:].reshape(len(sub), -1).mean(axis=1),
            "контраст(std)": sub.reshape(len(sub), -1).std(axis=1),
        }
        for name, f in feats.items():
            med = float(np.median(f))
            bits = [1 if x > med else 0 for x in f]
            outs = ascii_of(bits)
            gl = [o for o in outs if "discoverglimmer" in o[2].lower()]
            print("   [%s] разброс %.1f..%.1f, discoverglimmer: %s" % (name, f.min(), f.max(), gl[:1] if gl else "НЕТ"))
            for o in outs:
                printable = sum(ch.isalnum() or ch in " -_" for ch in o[2])
                if printable >= 8:
                    print("      %s %s: %s" % (o[0], o[1], o[2][:60]))
        # бимодальность яркости
        f = feats["яркость"]
        print("   яркость первых 24: %s" % " ".join("%.0f" % x for x in f[:24]))
    return 0


if __name__ == "__main__":
    sys.exit(main())
