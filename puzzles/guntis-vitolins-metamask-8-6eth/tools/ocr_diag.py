#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Diagnostic: compare EasyOCR readtext(path) vs readtext(cv2.imread(path)).

Mimics tools/ocr_frames.py exactly (detail=0, paragraph=False) for the given
seconds and prints box counts both ways.
"""
import os
import sys

import easyocr
import cv2

HERE = os.path.dirname(os.path.abspath(__file__))
FRAMES = os.path.join(os.path.dirname(HERE), "data", "frames_1fps")


def frame_for_second(sec):
    target = f"_{int(sec):04d}.0s."
    for name in os.listdir(FRAMES):
        if target in name:
            return os.path.join(FRAMES, name)
    return None


def main():
    reader = easyocr.Reader(["en"], gpu=False, verbose=False)
    for arg in sys.argv[1:]:
        sec = int(arg)
        path = frame_for_second(sec)
        if not path:
            print(f"{sec}s not found")
            continue
        import numpy as np
        img = cv2.imread(path)
        print(f"{sec}s path={os.path.basename(path)} cv2shape={None if img is None else img.shape}")
        try:
            r_path = reader.readtext(path, detail=0, paragraph=False)
        except Exception as e:
            r_path = ["ERR " + repr(e)]
        print(f"   readtext(path, detail=0): {len(r_path)} -> {r_path[:6]}")
        try:
            r_arr = reader.readtext(img, detail=0, paragraph=False)
        except Exception as e:
            r_arr = ["ERR " + repr(e)]
        print(f"   readtext(ndarray, detail=0): {len(r_arr)} -> {r_arr[:6]}")


if __name__ == "__main__":
    main()
