#!/usr/bin/env python3
"""Съёмка двух НЕ измеренных ранее каналов cryptoHALV.png (2026-10-19).

Канал 1 — асимметрия зеркала. Автор рисует осциллограмму симметричной относительно
y=475. Если верхняя и нижняя половины побитово совпадают — нижняя не несёт данных
(и «двойная ёмкость» исключена). Если нет — точки расхождения и есть носитель.

Канал 2 — форма вершины (apex cap width) по первоисточнику OCP:
`data/ocp/data/lobe-shape-sequence.csv` утверждает 59 лопастей, D = шапка 1 px,
O = шапка 4 px, «стабильно на трёх независимых проходах». У нас по модели 18.10
63 импульса. Считаем свою последовательность и сравниваем: расхождение 59/63
нужно объяснить, иначе все чтения «по лопастям» строятся на разном носители.

Никакого перебора и обращений к оракулу здесь нет — только измерение + свидетели.
Запуск: python tools/zden_halv_mirror_2026-10-19.py
"""
from __future__ import annotations

import csv
import hashlib
import json
import os

import numpy as np
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PNG = os.path.join(ROOT, "data", "cryptoHALV.png")
CSVP = os.path.join(ROOT, "data", "ocp", "data", "lobe-shape-sequence.csv")
OUTJ = os.path.join(ROOT, "data", "halv_mirror_2026-10-19.json")
OUTM = os.path.join(ROOT, "data", "halv_mirror_2026-10-19.md")
AX = 475
X0, X1 = 112, 858


def atomic(path: str, text: str) -> None:
    tmp = path + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        f.write(text)
    os.replace(tmp, path)


def symmetry(g: np.ndarray) -> dict:
    """Сравнение строки y с зеркальной 2*AX-y (г = бинарная маска чернил)."""
    h = g.shape[0]
    per_row = []
    total_diff = 0
    for y in range(0, AX):
        y2 = 2 * AX - y
        if y2 >= h:
            break
        d = int(np.count_nonzero(g[y] != g[y2]))
        if d:
            per_row.append({"y": y, "mirror_y": y2, "diff_px": d})
            total_diff += d
    return {"pairs_checked": AX, "rows_with_diff": len(per_row),
            "total_diff_px": total_diff, "rows": per_row[:60]}


def envelope_lines(rgb: np.ndarray) -> dict:
    """Есть ли отдельные каналы R/G/B (цвет = носитель) и сколько значений."""
    flat = rgb.reshape(-1, rgb.shape[-1]) if rgb.ndim == 3 else rgb.reshape(-1, 1)
    uniq = {}
    for ch in range(flat.shape[1]):
        vals, cnt = np.unique(flat[:, ch], return_counts=True)
        uniq["c%d" % ch] = [(int(v), int(c)) for v, c in zip(vals, cnt)][:8]
    return {"shape": list(rgb.shape), "channels": flat.shape[1], "top_values": uniq}


def amp_profile(b: np.ndarray) -> np.ndarray:
    w = b.shape[1]
    amp = np.zeros(w, dtype=int)
    for x in range(w):
        c = np.where(b[:, x])[0]
        amp[x] = AX - c[0] if len(c) else 0
    return amp


def axis_runs(b: np.ndarray) -> list[tuple[int, int]]:
    row = b[AX]
    runs, seg = [], []
    for x in range(X0, X1 + 1):
        if row[x]:
            seg.append(x)
        elif seg:
            runs.append((seg[0], seg[-1]))
            seg = []
    if seg:
        runs.append((seg[0], seg[-1]))
    return runs


def lobes(b: np.ndarray, amp: np.ndarray) -> list[dict]:
    """Лопасти = импульсы между нулевыми прогонами на оси; шапка = plateau пика."""
    runs = axis_runs(b)
    out = []
    for k in range(len(runs) - 1):
        x0, x1 = runs[k][1] + 1, runs[k + 1][0] - 1
        if x1 < x0:
            continue
        seg = amp[x0:x1 + 1]
        peak = int(seg.max())
        cap = int(np.count_nonzero(seg == peak))
        # ширина plateau по обе стороны от вершины (пиксель-точно)
        out.append({"x0": x0, "x1": x1, "w_px": x1 - x0 + 1, "peak": peak,
                    "cap": cap, "x_peak": int(x0 + int(seg.argmax()))})
    return out


def main() -> None:
    raw = open(PNG, "rb").read()
    im = Image.open(PNG)
    rgb = np.array(im.convert("RGB"))
    g = np.array(im.convert("L")) > 100

    res = {"sha256": hashlib.sha256(raw).hexdigest(), "size_px": list(g.shape),
           "mode": im.mode, "channels": envelope_lines(rgb),
           "symmetry_ink": symmetry(g)}
    gray = np.array(Image.open(PNG).convert("L"))
    res["symmetry_gray"] = symmetry(gray)

    b = g
    amp = np.zeros(b.shape[1], dtype=int)
    for x in range(b.shape[1]):
        c = np.where(b[:, x])[0]
        amp[x] = AX - c[0] if len(c) else 0
    lb = lobes(b, amp)
    caps = [l["cap"] for l in lb]
    res["lobes_measured"] = {"count": len(lb), "cap_hist": {str(v): caps.count(v) for v in sorted(set(caps))},
                             "items": lb}

    ref = []
    if os.path.exists(CSVP):
        with open(CSVP, encoding="utf-8") as f:
            for row in csv.reader(f):
                if not row or row[0].startswith("#"):
                    continue
                if row[0] == "index":
                    continue
                ref.append(row[1].strip().upper())
    res["ocp_csv"] = {"count": len(ref), "seq": "".join(ref),
                      "hist": {v: ref.count(v) for v in sorted(set(ref))}}

    own = "".join("O" if c >= 3 else "D" for c in caps)
    res["compare"] = {"own_by_cap3plus_is_O": own, "own_len": len(own), "ref_len": len(ref),
                      "equal_len": len(own) == len(ref),
                      "first_mismatch": next((i for i in range(min(len(own), len(ref)))
                                              if own[i] != ref[i]), None),
                      "matching_positions": sum(1 for i in range(min(len(own), len(ref)))
                                                if own[i] == ref[i])}
    atomic(OUTJ, json.dumps(res, ensure_ascii=False, indent=1))

    L = []
    L.append("# HALV: зеркало и форма вершин — замер 2026-10-19\n")
    L.append("sha256 png: `%s`  размер %s  режим %s" % (res["sha256"], res["size_px"], res["mode"]))
    s = res["symmetry_ink"]
    L.append("\n## 1. Асимметрия зеркала (чернила, маска >100)")
    L.append("Проверено пар y<->%d-y: %d; строк с расхождением: %d; всего различающихся пикселей: %d"
             % (2 * AX, s["pairs_checked"], s["rows_with_diff"], s["total_diff_px"]))
    for r in s["rows"][:20]:
        L.append("  y=%d <-> y=%d : %d px" % (r["y"], r["mirror_y"], r["diff_px"]))
    sg = res["symmetry_gray"]
    L.append("По серому: строк с расхождением %d, пикселей %d" % (sg["rows_with_diff"], sg["total_diff_px"]))
    L.append("\n## 2. Каналы цвета")
    L.append(json.dumps(res["channels"], ensure_ascii=False))
    L.append("\n## 3. Лопасти по нашему измерению")
    lm = res["lobes_measured"]
    L.append("лопастей: %d; гистограмма ширины шапки (px): %s" % (lm["count"], lm["cap_hist"]))
    L.append("\n## 4. Сравнение с OCP lobe-shape-sequence.csv")
    L.append("OCP: %d символов, D=%s O=%s" % (res["ocp_csv"]["count"],
             res["ocp_csv"]["hist"].get("D"), res["ocp_csv"]["hist"].get("O")))
    L.append("наше чтение (cap>=3 -> O): %s" % res["compare"]["own_by_cap3plus_is_O"])
    L.append("OCP:              %s" % res["ocp_csv"]["seq"])
    L.append("Совпало позиций: %d из %d; первая нестыковка: %s"
             % (res["compare"]["matching_positions"],
                min(res["compare"]["own_len"], res["compare"]["ref_len"]),
                res["compare"]["first_mismatch"]))
    atomic(OUTM, "\n".join(L) + "\n")
    print("\n".join(L))


if __name__ == "__main__":
    main()
