#!/usr/bin/env python3
"""Точная сегментация потока глифов на слова + глобальные индексы.

Вызов: python tools/rcodes_words.py
"""
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(os.path.dirname(HERE), "data")


def key(g):
    return f"{g['spine']} {g['L']}/{g['R']}"


def main():
    d = json.load(open(os.path.join(DATA, "rcodes_glyphs.json"), encoding="utf-8"))
    lines = d["lines"]

    stream = []          # (line, pos_in_line, 'SP'|glyph, key)
    for ln in sorted(lines, key=int):
        pos = 0
        for g in lines[ln]:
            if g["space"]:
                stream.append((int(ln), pos, "SP", None))
            else:
                pos += 1
                stream.append((int(ln), pos, "G", key(g)))

    words, cur = [], []
    for item in stream:
        if item[2] == "SP":
            if cur:
                words.append(cur)
                cur = []
        else:
            cur.append(item)
    if cur:
        words.append(cur)

    print(f"слов: {len(words)}")
    print("длины:", [len(w) for w in words])
    print()
    print("idx | len | line:pos      | первый глиф                      | последний")
    for i, w in enumerate(words, 1):
        a, b = w[0], w[-1]
        span = f"L{a[0]}:{a[1]}-L{b[0]}:{b[1]}" if a[0] == b[0] else f"L{a[0]}:{a[1]}~L{b[0]}:{b[1]}"
        print(f"{i:>3} | {len(w):>3} | {span:<14} | {a[3]:<32} | {b[3]}")

    # двухглифовые слова — кандидаты на 'ME'
    print("\nдвухглифовые слова:")
    for i, w in enumerate(words, 1):
        if len(w) == 2:
            print(f"  #{i} L{w[0][0]}:{w[0][1]}-{w[1][1]}  {w[0][3]} | {w[1][3]}")

    json.dump(
        [{"line": w[0][0], "len": len(w),
          "glyphs": [g[3] for g in w],
          "span": [f"L{w[0][0]}:{w[0][1]}", f"L{w[-1][0]}:{w[-1][1]}"]}
         for w in words],
        open(os.path.join(DATA, "rcodes_words.json"), "w", encoding="utf-8"),
        ensure_ascii=False, indent=1)
    return 0


if __name__ == "__main__":
    sys.exit(main())
