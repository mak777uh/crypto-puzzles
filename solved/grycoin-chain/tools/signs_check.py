#!/usr/bin/env python3
"""Независимая проверка «правила знаков» AoiNakamoto против исходного
текста поста Hal Finney (bitcointalk 155054), без обращения к её пересказу.

Гипотеза (Wattpad «Second», разд. 2.d «Outing himself as Satoshi on Bitcointalk»):
  * «знаки» = буквы анаграммы THOMAS/Satoshi = {I, T, A, S, M};
  * первые буквы абзацев поста дают эти знаки везде, кроме четырёх абзацев,
    начинающихся на F, F, W, W;
  * их и нужно разглядеть; последние буквы этих четырёх абзацев дают STNM,
    плюс абзац, начинающийся на I, даёт I STNM.

Запуск: python tools/signs_check.py
"""
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(os.path.dirname(HERE), "data", "btt_155054.md")
SIGNS = set("ITASM")


def main():
    text = open(SRC, encoding="utf-8").read()
    # берём только первое сообщение (сам пост Hal Finney)
    m = re.search(r"(?s)## Сообщение 1[^\n]*\n\n(.*?)(?=\n## Сообщение 2)", text)
    body = m.group(1) if m else text
    paras = [p.strip() for p in body.split("\n\n") if p.strip()]
    # первый абзац в выгрузке — цитата, её же считаем: первая строка
    print(f"абзацев: {len(paras)}")
    firsts, rows = [], []
    for i, p in enumerate(paras, 1):
        fl = p[0]
        firsts.append(fl)
        mark = "SIGN" if fl.upper() in SIGNS else "**OUT**"
        last = re.sub(r"[^A-Za-z]+$", "", p)
        rows.append((i, fl, mark, last[-1] if last else "?", p[:60].replace("\n", " ")))
    print("\n# | 1я | статус | последняя | начало")
    for r in rows:
        print(f"{r[0]:>2} | {r[1]} | {r[2]:<7} | {r[3]} | {r[4]}")
    out = [i for i, f in enumerate(firsts, 1) if f.upper() not in SIGNS]
    print("\nабзацы вне набора знаков:", out, "->", "".join(firsts[i - 1] for i in out))
    print("их последние буквы:", "".join(
        re.sub(r"[^A-Za-z]+$", "", paras[i - 1])[-1] for i in out))
    # абзац, начинающийся на I, рядом с этим блоком (п.5 поста)
    i_blocks = [i for i, f in enumerate(firsts, 1) if f.upper() == "I"]
    print("абзацы на I:", i_blocks)
    print("\nСовпадение с пересказом автора (STNM + I):",
          "".join(re.sub(r"[^A-Za-z]+$", "", paras[i - 1])[-1] for i in out) == "stnm")
    return 0


if __name__ == "__main__":
    sys.exit(main())
