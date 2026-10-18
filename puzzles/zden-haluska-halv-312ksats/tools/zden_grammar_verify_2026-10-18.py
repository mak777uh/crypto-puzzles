#!/usr/bin/env python3
"""MANIFEST для data/solvers/ + сертификация измерительного плеча на LVL1.

Две задачи, обе — «измерить целые пиксели», никакого перебора:

1) `manifest` — sha256/размер/тип каждого файла в data/solvers/ в MANIFEST.md
   (протокол: каждый собранный файл должен иметь доказательство подлинности).

2) `lvl1` — проверяем, что наше измерение картинки воспроизводит опубликованный
   ключ решённого уровня АВТОРСКИМ методом, который сам же автор напечатал на
   crypto1solver.png:
       ch = key[a] - ('0' - 1)          # a = 0..50, шаг строки 12 px
       rect(0, a*12, ch*12, ch*12+12)   # правый край = ch*12
   ⇒ для строки a правый белый пиксель x_max даёт ord(c) = x_max/12 + 47.
   Если 51 символ совпадают с `5JMTiDVHj3pj8VfaTe6pDtD9byZr6too3PD3AGBjRxF1hVsHtc8`
   (ground truth в data/zden_levels_groundtruth.json), то измерительное плечо
   «целые пиксели -> символ» сертифицировано на реальных данных того же автора,
   и те же соглашения (шаг, начало отсчёта, маркеры) переносим на HALV.

Запуск:  python tools/zden_grammar_verify_2026-10-18.py manifest
         python tools/zden_grammar_verify_2026-10-18.py lvl1
"""
from __future__ import annotations

import glob
import hashlib
import json
import os
import sys

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SOLVERS = os.path.join(ROOT, "data", "solvers")
GT = json.load(open(os.path.join(ROOT, "data", "zden_levels_groundtruth.json"), encoding="utf-8"))
BY_ID = {r["id"]: r for r in GT}


def sha256(path: str) -> str:
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(1 << 20), b""):
            h.update(chunk)
    return h.hexdigest()


def manifest() -> int:
    rows = []
    for p in sorted(glob.glob(os.path.join(SOLVERS, "*"))):
        if os.path.isdir(p):
            continue
        with Image.open(p) if p.lower().endswith((".png", ".jpg", ".jpeg", ".gif")) else None as im:
            dims = f"{im.size[0]}x{im.size[1]}" if im else ""
        rows.append((os.path.basename(p), os.path.getsize(p), sha256(p), dims))
    out = os.path.join(SOLVERS, "MANIFEST.md")
    txt = ["# data/solvers — собранные материалы (Wayback id_, 2026-10-18)", "",
           "| файл | байт | sha256 | пиксели |", "|---|---|---|---|"]
    txt += [f"| `{n}` | {s} | {h} | {d} |" for n, s, h, d in rows]
    tmp = out + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        f.write("\n".join(txt) + "\n")
    os.replace(tmp, out)
    print(f"{len(rows)} файлов -> {out}")
    return 0


def rightmost_white(im: Image.Image, y: int, thresh: int = 128) -> int:
    px = im.load()
    w, h = im.size
    if y < 0 or y >= h:
        return -1
    for x in range(w - 1, -1, -1):
        p = px[x, y]
        v = sum(p[:3]) / 3 if isinstance(p, tuple) else p
        if v >= thresh:
            return x
    return -1


def lvl1() -> int:
    src = os.path.join(SOLVERS, "crypto1.png")
    im = Image.open(src).convert("L")
    w, h = im.size
    gt = BY_ID["level-1"]
    key = gt["wif"]
    print(f"crypto1.png {w}x{h}; ground truth WIF ({len(key)}): {key}")
    # строки решённых прямоугольников: y = a*12 (верхняя грань), a = 0..50
    got, bad = [], []
    for a in range(len(key)):
        y = a * 12
        best = max(rightmost_white(im, y), rightmost_white(im, y + 1), rightmost_white(im, y + 11))
        if best < 0:
            got.append("?")
            bad.append((a, y, "нет белых"))
            continue
        ch = round(best / 12)
        got.append(chr(ch + 47))
    s = "".join(got)
    print(f"измерено            : {s}")
    print(f"ожидание (автор)    : {key}")
    same = sum(1 for x, y in zip(s, key) if x == y)
    print(f"совпало {same}/{len(key)}")
    if same != len(key):
        for a, (x, y) in enumerate(zip(s, key)):
            if x != y:
                bad.append((a, a * 12, f"{x}!={y}"))
        print("расхождения (первые 10):", bad[:10])
    return 0 if same == len(key) else 1


if __name__ == "__main__":
    cmd = sys.argv[1] if len(sys.argv) > 1 else "manifest"
    sys.exit({"manifest": manifest, "lvl1": lvl1}[cmd]())
