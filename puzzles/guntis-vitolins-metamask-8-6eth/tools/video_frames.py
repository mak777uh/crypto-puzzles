#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Разведка локального видео guntis: метаданные + извлечение кадров (без ffmpeg, через cv2).
Вход: C:/Users/Admin/Downloads/10_ETH_challenge___Ethereum_Parabolic___Bitcoin_generator_portfolio.mp4
Кадры -> data/frames/ (q85 jpg). Печатает fps/кадры/длительность/размер.
"""
import os
import sys
import cv2

SRC = r"C:\Users\Admin\Downloads\10_ETH_challenge___Ethereum_Parabolic___Bitcoin_generator_portfolio.mp4"
HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(os.path.dirname(HERE), "data")


def main():
    if not os.path.exists(SRC):
        print("MISSING:", SRC)
        return 1
    print("size bytes:", os.path.getsize(SRC))
    cap = cv2.VideoCapture(SRC)
    if not cap.isOpened():
        print("cannot open")
        return 2
    fps = cap.get(cv2.CAP_PROP_FPS)
    n = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    w = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    h = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    dur = n / fps if fps else 0
    print("fps=%.3f frames=%d %dx%d duration=%.1fs" % (fps, n, w, h, dur))

    outdir = os.path.join(DATA, "frames_1fps")
    os.makedirs(outdir, exist_ok=True)
    step = max(1, int(round(fps)))  # ~1 fps
    idx = 0
    saved = 0
    while True:
        ok, frame = cap.read()
        if not ok:
            break
        if idx % step == 0:
            sec = idx / fps if fps else 0
            name = "f_%05d_%06.1fs.jpg" % (idx, sec)
            cv2.imwrite(os.path.join(outdir, name), frame, [cv2.IMWRITE_JPEG_QUALITY, 85])
            saved += 1
        idx += 1
    cap.release()
    print("saved frames:", saved, "->", outdir)
    return 0


if __name__ == "__main__":
    sys.exit(main())
