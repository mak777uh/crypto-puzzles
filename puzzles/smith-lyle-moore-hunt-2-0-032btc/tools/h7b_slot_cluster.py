# -*- coding: utf-8 -*-
"""H7b: разложить «быстрый монтаж» на слоты и кластеры, воспроизвести калибровку сообщества.

Метод из Reddit (id pejgs65): слот каждые 10 кадров; каждый 9-й слот — ОДИНАКОВЫЙ береговой
разделитель; их 14; после удаления остаётся 120 слотов = 15 байт ASCII = `discoverglimmer`.
Значит в монтаже ровно 3 разных кадра: разделитель + «0» + «1». Ищем именно такую структуру
в окне видео, а не по всей длине, и декодируем.
"""
from __future__ import annotations

import os
import subprocess
import sys
from pathlib import Path

import numpy as np

D = Path(__file__).resolve().parent.parent
STEP = 10
SEP_PERIOD = 9


def src_fps(path: Path) -> float:
    out = subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v:0",
                          "-show_entries", "stream=r_frame_rate", "-of", "csv=p=0", str(path)],
                         capture_output=True, text=True, check=True).stdout.strip()
    num, _, den = out.partition("/")
    return float(num) / float(den or 1)


def frames(path: Path) -> np.ndarray:
    rate = src_fps(path) / STEP
    p = subprocess.run(["ffmpeg", "-hide_banner", "-v", "error", "-i", str(path), "-an", "-vf",
                        "fps=%.6f,scale=48:48,format=gray" % rate,
                        "-f", "rawvideo", "-pix_fmt", "gray", "-"],
                       capture_output=True, check=True).stdout
    return np.frombuffer(p, dtype=np.uint8).reshape(-1, 48, 48).astype(np.int16)


def cluster(a: np.ndarray, thr: float = 9.0):
    reps, labels = [], []
    for f in a:
        d = [float(np.abs(f - r).mean()) for r in reps]
        if d and min(d) <= thr:
            labels.append(int(np.argmin(d)))
        else:
            labels.append(len(reps))
            reps.append(f)
    return labels


def decode(bits, sep_positions_removed=None):
    outs = []
    for msb in (True, False):
        for pol in (1, 0):
            b = list(bits) if pol == 1 else [1 - x for x in bits]
            s = ""
            for i in range(0, len(b) // 8 * 8, 8):
                v = int("".join(str(x) for x in (b[i:i + 8] if msb else b[i:i + 8][::-1])), 2)
                s += chr(v) if 32 <= v < 127 else "\x00"
            cur, runs = "", []
            for ch in s:
                if ch != "\x00":
                    cur += ch
                else:
                    if len(cur) >= 4:
                        runs.append(cur)
                    cur = ""
            if len(cur) >= 4:
                runs.append(cur)
            for r in runs:
                outs.append(("msb" if msb else "lsb", "pos" if pol else "neg", r))
    return outs


def main() -> int:
    for v in sys.argv[1:]:
        path = Path(v) if os.path.isabs(v) else D / v
        a = frames(path)
        lab = cluster(a)
        n = len(lab)
        counts = {c: lab.count(c) for c in set(lab)}
        print("\n== %s: слотов %d, кластеров %d, sizes=%s" % (path.name, n, len(counts),
              sorted(counts.items(), key=lambda kv: -kv[1])[:8]))
        seq = "".join("abcdefgh"[min(l, 7)] for l in lab)
        print("   последовательность: %s" % seq)
        # кандидат-разделитель: кластер, у которого шаги между появлениями кратны SEP_PERIOD
        best = None
        for c, cnt in counts.items():
            if cnt < 5:
                continue
            pos = [i for i, l in enumerate(lab) if l == c]
            gaps = np.diff(pos)
            frac = float(np.mean(gaps == SEP_PERIOD))
            if best is None or frac > best[1]:
                best = (c, frac, pos)
        if not best:
            print("   разделитель не найден")
            continue
        c, frac, pos = best
        print("   разделитель: кластер %d, доля шагов =%d: %.2f, позиции %s" % (c, SEP_PERIOD, frac, pos[:20]))
        # окна без разделителя: между последовательными появлениями
        others = sorted({l for l in lab if l != c})
        if len(others) < 2:
            print("   двух состояний кроме разделителя нет (кластеров: %d)" % len(others))
            continue
        x, y = others[0], others[1]
        bits, skipped = [], 0
        for i, l in enumerate(lab):
            if l == c:
                skipped += 1
                continue
            if l == x:
                bits.append(1)
            elif l == y:
                bits.append(0)
            else:
                bits.append(1 if skipped % 2 else 0)
        print("   бит: %d (разделителей убрано %d)" % (len(bits), skipped))
        r = decode(bits)
        gl = [t for t in r if "discoverglimmer" in t[2].lower()]
        print("   discoverglimmer: %s" % (gl[:2] if gl else "НЕТ"))
        for t in sorted(r, key=lambda z: -len(z[2]))[:8]:
            print("     %s" % (t,))
    return 0


if __name__ == "__main__":
    sys.exit(main())
