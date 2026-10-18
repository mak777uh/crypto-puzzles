#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""OCR a handful of specific frames directly (diagnostic).

Usage: python tools/ocr_single.py 100 150 180
Prints the raw EasyOCR token text for each requested second.
"""
import os
import sys

import easyocr
import cv2

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
FRAMES = os.path.join(ROOT, "data", "frames_1fps")


def frame_for_second(sec):
    # names look like f_012345_0100.0s.jpg (frame index = 25*sec)
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
            print(f"{sec}s  (frame not found)")
            continue
        img = cv2.imread(path)
        res = reader.readtext(img, detail=1, paragraph=False)
        print(f"\n=== {sec}s  {os.path.basename(path)}  boxes={len(res)}")
        for _box, text, conf in res:
            if conf >= 0.2:
                print(f"   {conf:.2f}  {text}")


if __name__ == "__main__":
    main()
