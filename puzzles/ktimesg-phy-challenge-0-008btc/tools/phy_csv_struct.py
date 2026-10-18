# -*- coding: utf-8 -*-
"""phy: структура сторонней разметки (arturfromtheblock phy_emoji_data.csv).

Считаем без оракула: порядок id, спиральная посадка (r_i, theta_i), распределение
тониров (1F3FB..1F3FF), ZWJ/вариационных селекторов, и какие скалярные потоки
из 256 элементов вообще возможны (1 бит/эмодзи -> 256 бит = ровно один 32-байтный скаляр).
"""
import csv
import math
import os
from collections import Counter

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CSV = os.path.join(BASE, "data", "github", "arturfromtheblock__emoji-mapping-tool",
                   "files", "Phy Challenge Data", "phy_emoji_data.csv")
rows = list(csv.DictReader(open(CSV, encoding="utf-8-sig")))
print("rows:", len(rows))
for r in rows:
    r["id"] = int(r["id"])
    r["radius"] = float(r["radius"])
    r["angle"] = float(r["angle_deg"])
    r["cps"] = [int(c, 16) for c in r["cp_hex"].split("-") if c]

rows.sort(key=lambda r: r["id"])
print("id sequence contiguous:", [r["id"] for r in rows] == list(range(1, len(rows) + 1)))

# центровой объект
small = sorted(rows, key=lambda r: r["radius"])[:3]
print("innermost:", [(r["id"], round(r["radius"], 2), r["char"], r["name"]) for r in small])

# спираль: r по id
r_by_id = [r["radius"] for r in rows]
print("radius monotone decreasing by id?", all(r_by_id[i] >= r_by_id[i + 1] - 1e-9 for i in range(len(r_by_id) - 1)))
print("first 10 r:", [round(x, 1) for x in r_by_id[:10]], "last 10:", [round(x, 1) for x in r_by_id[-10:]])
# phyllotaxis-подгонка: r = c*sqrt(i)
c = [rows[i]["radius"] / math.sqrt(i + 1) for i in range(len(rows)) if i > 0]
print("c=r/sqrt(i): median %.2f  spread %.2f..%.2f" % (Counter(c).most_common(1)[0][0] if False else sorted(c)[len(c) // 2], min(c), max(c)))
d = sorted(c)
print("c quartiles:", [round(d[int(q * (len(d) - 1))], 2) for q in (0.0, 0.25, 0.5, 0.75, 1.0)])
# угловые шаги
ang = [r["angle"] for r in rows]
steps = []
for i in range(1, len(ang)):
    s = (ang[i] - ang[i - 1]) % 360
    steps.append(s)
print("angle step median %.2f  quartiles %s" % (sorted(steps)[len(steps) // 2],
      [round(sorted(steps)[int(q * (len(steps) - 1))], 2) for q in (0.05, 0.25, 0.5, 0.75, 0.95)]))
# золотой угол?
print("360/137.507 =", round(360 / 137.5077, 4), " 137.507*256 =", round(137.5077 * 256 % 360, 2))

# тоны и модификаторы
TONES = {0x1F3FB: "light", 0x1F3FC: "medium", 0x1F3FD: "medium-dark", 0x1F3FE: "dark", 0x1F3FF: "very-dark"}
tone_ct = Counter()
zwj = 0
sel = 0
cps = []
for r in rows:
    t = [TONES[c] for c in r["cps"] if c in TONES]
    tone_ct[t[0] if t else ("none" if len(r["cps"]) == 1 else "other")] += 1
    if 0x200D in r["cps"]:
        zwj += 1
    if 0xFE0F in r["cps"] or 0xFE0E in r["cps"]:
        sel += 1
    cps.append(r["cps"][0])
print("tone histogram:", dict(tone_ct))
print("with ZWJ:", zwj, " with VS15/16:", sel)
print("unique base codepoints:", len(set(cps)))
print("base cp range: %05X .. %05X" % (min(cps), max(cps)))
lo = Counter(c & 0xFF for c in cps)
print("low-byte distinct:", len(lo), " max dup:", lo.most_common(3))
h = Counter(cps[i] >> 8 for i in range(len(cps)))
print("high byte distinct:", len(h), dict(h))

# дубли разметки: один и тот же эмодзи несколько раз
name_ct = Counter(r["name"] for r in rows)
print("most common names:", name_ct.most_common(8))

# project_file.json: есть ли там дополнительные поля (цвет/тон)
import json
pj = json.load(open(os.path.join(os.path.dirname(CSV), "project_file.json"), encoding="utf-8"))
print("project_file keys:", list(pj.keys())[:12])
b = pj.get("boxes") or pj.get("markers") or []
if b:
    print("boxes:", len(b), "sample keys:", list(b[0].keys()))
    print("sample box:", {k: b[0][k] for k in list(b[0])[:12]})
