#!/usr/bin/env python3
"""Съёмка модели cryptoHALV.png целыми пикселями -> data/halv_wave_model_2026-10-18.json.

Что измеряем (всё детерминированно, без перебора):
  * огибающую amp(x) = 475 - верхний белый пиксель колонки x (порог 100);
  * зеркальность относительно y=475 (автор рисует симметричную форму);
  * «нулевые» прогоны на самой оси y=475 (там, где форма тонкая) = базовая линия;
  * импульсы между прогонами: ширина в 3-пиксельных ячейках и вершина;
  * единицу квантования по октавам (128,64,...,1) — мотив «HALV»;
  * служебные метки: вертикальная линейка x=91, ромб-«скобка» x=92..111, футер;
  * tEXt-чанк PNG и LSB-скан (исключаем стеганo).

Ключевой поправка к модели 17.10 (findings.md): решётка ячеек начинается НЕ с
x=92, а с x=112 (первый импульс 118, все стартовые координаты кратны 3 от 112);
область x=92..111 — линейка/маркер, а не данные. Снимок «256 узлов на x=92+3k»
был взят со сдвигом 20 px и потому попадал на косые участки — его результаты
(«ёмкость ~118 бит», 20 000 негативных кандидатов) считаются недействительными.

Запуск:  python tools/zden_halv_measure_2026-10-18.py
"""
from __future__ import annotations

import hashlib
import json
import os
import re
import struct

import numpy as np
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PNG = os.path.join(ROOT, "data", "cryptoHALV.png")
OUT = os.path.join(ROOT, "data", "halv_wave_model_2026-10-18.json")
AX = 475          # ось симметрии по y
X0 = 112          # начало решётки ячеек (3 px)
CELL = 3


def envelope() -> tuple[np.ndarray, np.ndarray, int, int]:
    a = np.array(Image.open(PNG).convert("L"))
    b = a > 100
    w = b.shape[1]
    amp = np.zeros(w, dtype=int)
    for x in range(w):
        c = np.where(b[:, x])[0]
        amp[x] = AX - c[0] if len(c) else 0
    return a, b, amp, w


def axis_runs(b: np.ndarray) -> list[tuple[int, int]]:
    """Горизонтальные прогоны белого на оси y=475 = базовая линия (уровень 0)."""
    row = b[AX]
    runs: list[tuple[int, int]] = []
    seg: list[int] = []
    for x in range(X0, 859):
        if row[x]:
            seg.append(x)
        elif seg:
            runs.append((seg[0], seg[-1]))
            seg = []
    if seg:
        runs.append((seg[0], seg[-1]))
    return runs


def unit_of(x: int, table: list[tuple[int, int]]) -> int:
    for lo, hi, u in table:
        if lo <= x <= hi:
            return u
    return 1


def band_table(amp: np.ndarray) -> list[tuple[int, int, int]]:
    """Границы октав (unit = 128 >> b) по правилу «вершина полосы = 3*unit».

    Граница b->b+1 = первая позиция, после которой НИ ОДИН пиксель не выше
    3*(unit//2)+2 (то есть остаток сигнала уже целиком влезает в следующую октаву).
    Это самое раннее допустимое разделение; более поздние варианты (например,
    граница 313 вместо 286) дают ту же форму, но сдвигают уровни пограничных
    импульсов на 1 — неоднозначность зафиксирована в LOG и не позволяет считать
    HALV «сертифицированным» чтением.
    """
    bounds = [X0]
    u = 128
    while u > 1:
        thr = 3 * (u // 2) + 2
        x = bounds[-1]
        while x <= 858 and amp[x:].max() > thr:
            x += 1
        if x >= 858:
            break
        bounds.append(x)
        u //= 2
    bounds.append(859)
    return [(bounds[i], bounds[i + 1] - 1, 128 >> i) for i in range(len(bounds) - 1)]


def main() -> None:
    a, b, amp, w = envelope()
    raw = open(PNG, "rb").read()

    # chunks
    chunks, i = [], 8
    text = ""
    while i < len(raw):
        ln = struct.unpack(">I", raw[i:i + 4])[0]
        typ = raw[i + 4:i + 8].decode("latin1")
        data = raw[i + 8:i + 8 + ln]
        chunks.append({"type": typ, "len": ln})
        if typ == "tEXt":
            text = data.split(b"\x00", 1)[1].decode("utf-8", "replace")
        i += 12 + ln

    # LSB-скан на ASCII
    bits = np.packbits((a & 1).flatten()[: (a.size // 8) * 8]).tobytes()
    lsb_ascii = len(re.findall(rb"[\x20-\x7e]{8,}", bits))

    runs = axis_runs(b)
    bands = band_table(amp)
    pulses = []
    for k in range(len(runs) - 1):
        x0, x1 = runs[k][1] + 1, runs[k + 1][0] - 1
        m = int(amp[x0:x1 + 1].max())
        u = unit_of(x0, bands)
        pulses.append({
            "i": len(pulses), "x0": x0, "x1": x1,
            "width_px": x1 - x0 + 1, "width_cells": round((x1 - x0 + 1) / CELL, 2),
            "unit": u, "peak": m, "level": round(m / u, 2),
        })
    gaps = [{"i": j, "x0": r[0], "x1": r[1], "width_px": r[1] - r[0] + 1,
             "width_cells": round((r[1] - r[0] + 1) / CELL, 2)} for j, r in enumerate(runs)]

    # бинарная последовательность ячеек на решётке 3 px от x=112
    # 256 ячеек: 112 + 3k, k = 0..255 (после x=858 чернил нет -> ячейки нулевые)
    cells = []
    for k in range(256):
        xs = X0 + k * CELL
        seg = b[AX, xs:xs + CELL] if xs + CELL <= w else np.zeros(CELL)
        cells.append(int(bool(seg.any())))
    on = sum(cells)

    # уровень (0..3) каждой ячейки: вершина формы в центре ячейка / unit октавы
    levels = []
    for k in range(256):
        xc = X0 + k * CELL + 1
        lv = int(round(amp[xc] / unit_of(xc, bands))) if xc < w else 0
        levels.append(max(0, min(3, lv)))

    model = {
        "source": {"file": "data/cryptoHALV.png", "bytes": len(raw),
                   "sha256": hashlib.sha256(raw).hexdigest(),
                   "png_chunks": chunks, "tEXt_comment": text.strip()},
        "geometry": {"px": [w, a.shape[0]], "axis_y": AX, "grid_x0": X0, "grid_cell_px": CELL,
                     "signal_x": [int(X0), 858], "grid_cells": 256,
                     "mirror_about_axis": bool(np.array_equal(
                         b[AX - 60:AX, 112:859], b[AX + 1:AX + 61, 112:859][::-1]))},
        "octave_bands": [{"x0": lo, "x1": hi, "unit": u, "width_px": hi - lo + 1}
                         for lo, hi, u in bands],
        "baseline_runs": {"count": len(runs), "detail": gaps},
        "pulses": {"count": len(pulses), "detail": pulses},
        "cells_3px": {"count": len(cells), "on": on, "off": len(cells) - on,
                      "sequence": "".join(map(str, cells)),
                      "levels": "".join(map(str, levels)),
                      "levels_hist": {str(k): levels.count(k) for k in sorted(set(levels))}},
        "stego_negative": {"lsb_ascii_runs": lsb_ascii,
                           "ink_outside_112_858_x_85_860_y": "только футер (подпись автора, адрес, дата 20042402) и логотип BTCRYPTO/ZDEN/LVL/HALV"},
        "correction_2026_10_18": "Решётка ячеек начинается с x=112, а не x=92 (модель 17.10 дала сдвиг 20 px).",
    }
    tmp = OUT + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        json.dump(model, f, ensure_ascii=False, indent=1)
    os.replace(tmp, OUT)

    print(f"огибающая: {len(cells)} ячеек по 3 px от x={X0}; белых на оси {on}, чёрных {len(cells)-on}")
    print(f"базовых прогонов {len(runs)}, импульсов {len(pulses)}")
    print("октавы:", [(d['x0'], d['x1'], d['unit']) for d in model["octave_bands"]])
    print("уровни импульсов:", "".join(str(int(round(p['level']))) for p in pulses))
    print("ширины импульсов (яч.):", [p["width_cells"] for p in pulses])
    print("ширины провалов (яч.):", [g["width_cells"] for g in gaps])
    print("tEXt:", text.strip().replace("\n", " | "))
    print(f"-> {OUT}")


if __name__ == "__main__":
    main()
