#!/usr/bin/env python3
"""Проверка крибов из треда r/codes (1tk3up2) против транскрипции.

Крибы из треда (автор u/GentlyAbusive + наблюдения chronondecay):
  C1  глиф `+|oo` = пробел, ровно 13 вхождений
  C2  ни один другой глиф не встречается чаще 5 раз
  C3  ни один из первых 5 глифов не повторяется в остальном тексте
  C4  слово «ME» есть в 5-й строке
  C5  «∆ во втором глифе 3-й строки» (вопрос dec0demaster)
  C6  «буквы H и T уже расшифрованы» (Update 4)
  C7  первое слово НЕ «hello»

Запуск: python tools/rcodes_cribs.py
"""
import json
import os
import sys
from collections import Counter

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(os.path.dirname(HERE), "data")


def key(g):
    return f"{g['spine']} {g['L']}/{g['R']}"


def main():
    d = json.load(open(os.path.join(DATA, "rcodes_glyphs.json"), encoding="utf-8"))
    lines = {int(k): v for k, v in d["lines"].items()}
    glyphs = [g for ln in sorted(lines) for g in lines[ln] if not g["space"]]
    sp = sum(1 for ln in sorted(lines) for g in lines[ln] if g["space"])

    ok = lambda b: "PASS" if b else "FAIL"
    cnt = Counter(key(g) for g in glyphs)
    line1 = [g for g in lines[1] if not g["space"]]

    words = json.load(open(os.path.join(DATA, "rcodes_words.json"), encoding="utf-8"))
    two = [w for w in words if w["len"] == 2]
    l5 = [w for w in words if w["line"] <= 5 <= w["line"]]

    print("C1 пробелов SP = 13          :", sp, ok(sp == 13))
    print("C2 макс. частота глифа <= 5  :", cnt.most_common(1)[0], ok(cnt.most_common(1)[0][1] <= 5))
    first5 = [key(g) for g in line1[:5]]
    later = Counter(key(g) for g in glyphs[5:])
    print("C3 первые 5 глифов не повторяются:", ok(all(later.get(k, 0) == 0 for k in first5)))
    print("C4 слов длиной 2             :", len(two), [w["span"] for w in two])
    print("     слова, пересекающие L5  :", [(w["span"], w["len"]) for w in l5])
    tri = [(i + 1, key(g)) for i, g in enumerate(glyphs) if "\u25b2" in g["L"] + g["R"]]
    print("C5 глифы с \u25b2 (глоб. номер):", tri)
    print("C6/C7 нужна расшифровка букв — см. LOG")
    print()
    print("структура строк (глифов/пробелов):")
    for ln in sorted(lines):
        gs = lines[ln]
        print(f"  L{ln}: {sum(1 for g in gs if not g['space'])} глифов, "
              f"{sum(1 for g in gs if g['space'])} пробелов")
    return 0


if __name__ == "__main__":
    sys.exit(main())
