#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""OCR кадров видео guntis (EasyOCR, english). Инкрементально пишет JSONL.
Резюмируемо: уже обработанные кадры пропускаются.

Аргументы:
  --limit N     сколько кадров максимум в этом прогоне (по списку todo)
  --start K     с какого по счёту (по списку todo)
  --out FILE    куда писать (по умолчанию data/ocr_frames.jsonl).
                Уже готовые кадры берутся из union(--out, ocr_frames.jsonl),
                поэтому одного кадра можно не бояться обработать дважды.
  --range LO HI абсолютный срез списка кадров [LO:HI) — для параллельных воркеров
                на непересекающихся диапазонах. Имеет приоритет над --start/--limit.
"""
import os
import sys
import json
import glob
import time
import argparse

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(os.path.dirname(HERE), "data")
FRAMES = os.path.join(DATA, "frames_1fps")
DEFAULT_OUT = os.path.join(DATA, "ocr_frames.jsonl")


def load_done(paths):
    done = set()
    for path in paths:
        if not path or not os.path.exists(path):
            continue
        for line in open(path, encoding="utf-8"):
            line = line.strip()
            if not line:
                continue
            try:
                done.add(json.loads(line)["frame"])
            except Exception:  # noqa: BLE001
                pass
    return done


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--limit", type=int, default=0)
    ap.add_argument("--start", type=int, default=0)
    ap.add_argument("--out", default=DEFAULT_OUT)
    ap.add_argument("--range", nargs=2, type=int, default=None,
                    metavar=("LO", "HI"))
    args = ap.parse_args()

    import easyocr
    reader = easyocr.Reader(["en"], gpu=False, verbose=False)

    files = sorted(glob.glob(os.path.join(FRAMES, "*.jpg")))
    if args.range:
        files = files[args.range[0]:args.range[1]]
    done = load_done([args.out, DEFAULT_OUT])
    todo = [f for f in files if os.path.basename(f) not in done]
    if not args.range:
        if args.start:
            todo = todo[args.start:]
        if args.limit:
            todo = todo[:args.limit]
    print("files=%d done=%d todo=%d out=%s" %
          (len(files), len(done), len(todo), os.path.basename(args.out)),
          flush=True)

    t0 = time.time()
    with open(args.out, "a", encoding="utf-8") as fo:
        for i, f in enumerate(todo):
            name = os.path.basename(f)
            try:
                res = reader.readtext(f, detail=0, paragraph=False)
            except Exception as e:  # noqa: BLE001
                res = []
                print("ERR", name, repr(e)[:120], flush=True)
            fo.write(json.dumps({"frame": name, "tokens": res},
                                ensure_ascii=False) + "\n")
            fo.flush()
            if (i + 1) % 10 == 0:
                el = time.time() - t0
                print("  %d/%d  %.1fs  (%.2fs/frame)" %
                      (i + 1, len(todo), el, el / (i + 1)), flush=True)
    print("done batch", flush=True)
    return 0


if __name__ == "__main__":
    sys.exit(main())
