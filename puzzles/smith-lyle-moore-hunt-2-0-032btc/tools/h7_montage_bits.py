# -*- coding: utf-8 -*-
"""H7: декодер «быстрого монтажа» по откалиброванному сообществом методу.

Калибровка (Reddit u/rational-Gain5010, id pejgs65, как получено `discoverglimmer`):
  1. один стабильный слот каждые 10 кадров (30 fps -> 3 слота в секунду);
  2. каждый 9-й слот — одинаковый разделитель (береговой кадр), всего 14 разделителей;
  3. после удаления разделителей остаётся 120 слотов = ровно 15 групп по 8 бит.
  15 байт ASCII = `discoverglimmer` (15 символов) — метод воспроизводит сам себя.

Задача скрипта: прогнать тот же метод по всем локальным видео и посмотреть, где метод
даёт осмысленную ASCII-строку (кандидат в пароли замков / в 13-й элемент фразы).
Офлайн, без сети; приватных ключей не касается.
"""
from __future__ import annotations

import os
import subprocess
import sys
from pathlib import Path

import numpy as np

D = Path(__file__).resolve().parent.parent
VIDEOS = ["data/media/bornwild_video.mp4", "data/vid2/bottle_720p.mp4", "data/vid2/life_720p.mp4"]
STEP = 10
SEP_EVERY = 9


def src_fps(path: Path) -> float:
    out = subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v:0",
                          "-show_entries", "stream=r_frame_rate", "-of", "csv=p=0", str(path)],
                         capture_output=True, text=True, check=True).stdout.strip()
    num, _, den = out.partition("/")
    return float(num) / float(den or 1)


def slots(path: Path) -> np.ndarray:
    """Средняя яркость и подпись кадра на каждый STEP-й кадр."""
    rate = src_fps(path) / STEP
    cmd = ["ffmpeg", "-hide_banner", "-v", "error", "-i", str(path), "-an", "-vf",
           "fps=%.6f,scale=48:48,format=gray" % rate,
           "-f", "rawvideo", "-pix_fmt", "gray", "-"]
    p = subprocess.run(cmd, capture_output=True, check=True).stdout
    a = np.frombuffer(p, dtype=np.uint8).reshape(-1, 48, 48)
    return a


def ascii_runs(bits):
    """MSB-first 8-битные группы; возврат печатных ASCII-пробегов >=6 символов."""
    out = []
    for pol in (1, 0):
        b = list(bits) if pol == 1 else [1 - x for x in bits]
        s = ""
        for i in range(0, len(b) // 8 * 8, 8):
            byte = int("".join(str(x) for x in b[i:i + 8]), 2)
            s += chr(byte) if 32 <= byte < 127 else "\x00"
        runs, cur = [], ""
        for ch in s:
            if ch != "\x00":
                cur += ch
            else:
                if len(cur) >= 6:
                    runs.append(cur)
                cur = ""
        if len(cur) >= 6:
            runs.append(cur)
        for r in runs:
            out.append((pol, r))
    return out


def main() -> int:
    for v in VIDEOS:
        path = Path(v) if os.path.isabs(v) else D / v
        if not path.exists():
            print("нет файла", v)
            continue
        arr = slots(path)
        bright = arr.reshape(arr.shape[0], -1).mean(axis=1)
        print("\n== %s: слотов %d (шаг %d кадров)" % (v, len(arr), STEP))
        thr = float(np.median(bright))
        bits_all = (bright > thr).astype(int).tolist()
        cands = {}
        for drop in (False, True):
            for off in range(SEP_EVERY):
                seq = bits_all[off:]
                if drop:
                    seq = [b for i, b in enumerate(seq) if i % SEP_EVERY != SEP_EVERY - 1]
                for pol, s in ascii_runs(seq):
                    key = (drop, off, pol)
                    cands.setdefault(key, []).append(s)
        # калибровка: ищем «discoverglimmer»
        hit = [(k, s) for k, v2 in cands.items() for s in v2 if "discoverglimmer" in s.lower()]
        print("   discoverglimmer воспроизведён: %s" % (hit[:3] if hit else "НЕТ"))
        best = sorted(((max(len(s) for s in v2), k, v2) for k, v2 in cands.items()), reverse=True)[:4]
        for n, k, v2 in best:
            print("   поляризация/окно %s: %s" % (k, [s[:40] for s in v2[:5]]))
    return 0


if __name__ == "__main__":
    if len(sys.argv) > 1:
        VIDEOS = sys.argv[1:]
    sys.exit(main())
