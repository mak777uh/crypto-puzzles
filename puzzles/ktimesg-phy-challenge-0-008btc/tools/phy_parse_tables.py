"""Парсинг четырёх таблиц SecretAdmirere (msg67069308) из thread.txt.

Колонки: position,draw_order,side,glyph,name
glyph = uXXXX[.tone][-uYYYY...] — кодовая точка(и) эмодзи + индекс тона (0..5).
Сохраняет data/secretadm_tables.json и печатает сводку по тону/стороне.
"""
import json
import re
from pathlib import Path

D = Path(__file__).resolve().parents[1]
TH = (D / "data" / "wayback" / "thread.txt").read_text(encoding="utf-8", errors="replace").splitlines()

ROW = re.compile(r"^\s*(\d+)\s*,\s*(\d+)\s*,\s*([AB])\s*,\s*([A-Za-z0-9_.+\-]+)\s*,(.*)$")

tables = {}
cur_name = None
i = 0
while i < len(TH):
    line = TH[i].strip().strip('"')
    m = re.match(r"^(\d)\s*-\s*(.+)$", line)
    if m and i + 1 < len(TH) and TH[i + 1].startswith("position,draw_order"):
        cur_name = f"{m.group(1)} - {m.group(2)}"
        rows = []
        j = i + 2
        while j < len(TH):
            rm = ROW.match(TH[j])
            if not rm:
                if rows and TH[j].strip() in ("", "```", "Code:"):
                    break
                if not TH[j].strip():
                    break
                j += 1
                continue
            rows.append({"position": int(rm.group(1)), "draw_order": int(rm.group(2)),
                         "side": rm.group(3), "glyph": rm.group(4),
                         "name": rm.group(5).strip()})
            j += 1
        tables[cur_name] = rows
        i = j
        continue
    i += 1

print("таблиц:", len(tables))
for name, rows in tables.items():
    poss = [r["position"] for r in rows]
    dos = [r["draw_order"] for r in rows]
    print(f"\n=== {name}: строк={len(rows)} pos {min(poss)}..{max(poss)} uniq={len(set(poss))} "
          f"draw {min(dos)}..{max(dos)} uniq={len(set(dos))} "
          f"A={sum(1 for r in rows if r['side']=='A')} B={sum(1 for r in rows if r['side']=='B')}")
    tones = {}
    n_toned = 0
    for r in rows:
        ts = re.findall(r"\.(\d)", r["glyph"])
        if ts:
            n_toned += 1
        for t in ts:
            tones[t] = tones.get(t, 0) + 1
    print(f"    строк с тоном: {n_toned}, распределение тонов: {dict(sorted(tones.items()))}")

(D / "data" / "secretadm_tables.json").write_text(json.dumps(tables, ensure_ascii=False, indent=1), encoding="utf-8")
print("\nсохранено -> data/secretadm_tables.json")

# первая таблица: совпадает ли position == draw_order, чередуется ли side
rows = tables[list(tables)[0]]
same = sum(1 for r in rows if r["position"] == r["draw_order"])
alt = sum(1 for k in range(1, len(rows)) if rows[k]["side"] != rows[k-1]["side"])
print(f"\n[таблица 1] position==draw_order у {same}/{len(rows)}; side меняется {alt}/{len(rows)-1} раз")
for r in rows[:8]:
    print("   ", r)
