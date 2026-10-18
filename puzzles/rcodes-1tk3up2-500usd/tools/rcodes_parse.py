#!/usr/bin/env python3
"""Парсер транскрипции рукописного шифра r/codes (пост 1tk3up2, $500).

Вход : data/rcodes_transcript.txt (прислана пользователем 17.10.2026)
Выход: data/rcodes_glyphs.json + статистика в stdout.

Формат транскрипции (шапка самого файла):
    spine Lt Lm Lb / Rt Rm Rb ; '.' = пусто
    spine: I = прямая, 7 = засечка сверху слева, L = засечка снизу справа,
           G = засечка сверху справа, ) = изогнутая
Глифы разделены ' | ', пробел-глиф записан как 'SP'.

Нормализация: пробелы внутри токена глифа убираются (в двух глифах их
вставила рука-транскрибирующего: 'o+./ ./-' -> 'o+././-'), затем разрез по
ПЕРВОМУ '/': слева 3 позиции, справа 3.
"""
import json
import os
import re
import sys
from collections import Counter, OrderedDict

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(os.path.dirname(HERE), "data")
SRC = os.path.join(DATA, "rcodes_transcript.txt")
OUT = os.path.join(DATA, "rcodes_glyphs.json")

SPINES = {"I", "7", "L", "G", ")"}


def parse():
    lines_out = OrderedDict()
    problems = []
    for raw in open(SRC, encoding="utf-8"):
        raw = raw.rstrip("\n")
        if not raw or raw.startswith("#"):
            continue
        m = re.match(r"^L(\d+):\s*(.*)$", raw)
        if not m:
            continue
        ln = int(m.group(1))
        glyphs = []
        # РАЗДЕЛИТЕЛЬ — ровно " | ". Символ '|' входит и в алфавит знаков
        # (вокруг spine), поэтому split('|') убивает глифы вида '7 .../o|o'.
        for tok in m.group(2).split(" | "):
            tok = tok.strip()
            if not tok:
                continue
            if tok == "SP":
                glyphs.append({"space": True})
                continue
            t = re.sub(r"\s+", "", tok)
            spine = t[0]
            rest = t[1:]
            if spine not in SPINES:
                problems.append(f"L{ln}: spine '{spine}' вне набора: {tok}")
            if "/" not in rest:
                problems.append(f"L{ln}: нет делителя '/': {tok}")
                continue
            left, right = rest.split("/", 1)
            g = {"space": False, "spine": spine,
                 "L": left, "R": right, "raw": tok}
            if len(left) != 3 or len(right) != 3:
                problems.append(
                    f"L{ln}: длина L={len(left)} R={len(right)} (ожидалось 3/3): {tok}")
            glyphs.append(g)
        lines_out[ln] = glyphs
    return lines_out, problems


def main():
    lines, problems = parse()

    seq = []           # плоский поток: ('SP',) или глиф
    for ln, gs in lines.items():
        for g in gs:
            seq.append(("SP", None) if g["space"] else ("GLYPH", g))

    glyphs = [g for k, g in seq if k == "GLYPH"]
    n_sp = sum(1 for k, _ in seq if k == "SP")

    print(f"строк: {len(lines)}   глифов (без пробелов): {len(glyphs)}   пробелов SP: {n_sp}")

    # --- длины слов между SP ---
    words, cur = [], 0
    for k, g in seq:
        if k == "SP":
            if cur:
                words.append(cur)
            cur = 0
        else:
            cur += 1
    if cur:
        words.append(cur)
    print("разбивка на слова (длины):", words)
    print("средняя длина слова: %.2f" % (sum(words) / len(words)))

    # --- частота глифов ---
    def key(g):
        return f"{g['spine']} {g['L']}/{g['R']}"

    cnt = Counter(key(g) for g in glyphs)
    print("\n--- ТОП-20 глифов ---")
    for k, c in cnt.most_common(20):
        print(f"  {c:>3}  {k}")
    print(f"уникальных глифов: {len(cnt)} из {len(glyphs)}")

    # --- свойство первых 5 глифов (наблюдение chronondecay) ---
    line1 = [g for g in lines[1] if not g["space"]]
    first5 = [key(g) for g in line1[:5]]
    rest = Counter(key(g) for g in glyphs[5:])
    print("\nпервые 5 глифов L1 и встречаются ли они дальше:")
    for k in first5:
        print(f"  {k} -> {rest.get(k, 0)} раз дальше")

    # --- шпильки ---
    print("\nспинки:", dict(Counter(g["spine"] for g in glyphs)))

    # --- символы по позициям ---
    slots = ["L0", "L1", "L2", "R0", "R1", "R2"]
    inv = {s: Counter() for s in slots}
    for g in glyphs:
        for i, ch in enumerate(g["L"]):
            inv[f"L{i}"][ch] += 1
        for i, ch in enumerate(g["R"]):
            inv[f"R{i}"][ch] += 1
    print("\n--- инвентарь знаков по позициям ---")
    for s in slots:
        print(f"  {s}: {dict(inv[s].most_common())}")

    allmarks = Counter()
    for s in slots:
        allmarks.update(inv[s])
    print("\nвсе знаки:", dict(allmarks.most_common()))

    # --- 2-глифовые слова в 5-й строке (кандидаты на "ME") ---
    print("\n--- слова по строкам ---")
    for ln, gs in lines.items():
        w, cur = [], []
        out = []
        for g in gs:
            if g["space"]:
                out.append(cur)
                cur = []
            else:
                cur.append(key(g))
        if cur:
            out.append(cur)
        print(f"L{ln}: " + "  ".join(
            f"[{' '.join(w)}]" if len(w) <= 3 else f"({len(w)})" for w in out))

    with open(OUT, "w", encoding="utf-8") as f:
        json.dump({"lines": {str(k): v for k, v in lines.items()},
                   "problems": problems}, f, ensure_ascii=False, indent=1)
    print(f"\nпроблемы парсинга: {len(problems)}")
    for p in problems:
        print("  !", p)
    print(f"-> {OUT}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
