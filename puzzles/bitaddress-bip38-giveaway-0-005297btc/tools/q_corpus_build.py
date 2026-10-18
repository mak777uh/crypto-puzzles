#!/usr/bin/env python3
"""Разбор CSV, снятых со Stacker News (профиль владельца `q` + пост-задача).

Вход : C:\\Users\\Admin\\Downloads\\stacker.csv, stacker (1).csv
Выход: data/q_corpus.txt   — весь текст владельца (по абзацам)
       data/q_corpus.csv   — то же в виде строк «источник;текст»
       stdout              — статистика и черновик словаря кандидатов

Задача пазла: BIP38 EC-multiply, пароль забыт. Подсказки владельца:
  ≤30 символов, спецсимволы скорее нет, «склеивал 3 старых пароля»,
  менеджером паролей не пользовался.
Словарь строим из лексики самого `q` (его тексты), а не из перебора.
"""
import csv
import os
import re
import sys
from collections import Counter

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(os.path.dirname(HERE), "data")
DEST = os.path.dirname(DATA)
SRCS = [r"C:\Users\Admin\Downloads\stacker.csv",
        r"C:\Users\Admin\Downloads\stacker (1).csv"]

NOISE = re.compile(r"^(https?://|write$|compose$|reply$|\d+ sats$|\d+/\w+$|"
                   r".*href.*|pull|sign up$|blog$|items$|merch$|~|/"
                   r"|bitcoin$|econ$|AskSN$)$", re.I)
# сломанный скрейп тащит в ячейки имена CSS-классов — отсекаем их отдельно
CSSHINT = re.compile(r"(__|href|src|sn-[a-z]|item_[A-Za-z]|text-reset|btn-|fw-bold|"
                     r"editor_|pull-to-refresh|commentid|item_title|item_other|"
                     r"sn-paragraph|sn-text|sn-table|sn-list|sn-heading|sn-media|sn-link)")


def cell_text(s):
    s = (s or "").strip()
    if not s:
        return None
    # отбрасываем служебные ячейки сломанного скрейпа
    if NOISE.match(s) or CSSHINT.search(s):
        return None
    if s.startswith("© "):
        return None
    letters = sum(c.isalpha() for c in s)
    if len(s) < 12 or letters < len(s) * 0.5:
        return None
    if " " not in s:          # одиночный токен — почти всегда служебный
        return None
    return s


def main():
    rows, seen = [], set()
    for path in SRCS:
        if not os.path.exists(path):
            print("нет файла:", path, file=sys.stderr)
            continue
        with open(path, encoding="utf-8-sig", newline="") as f:
            for r in csv.reader(f):
                for c in r:
                    t = cell_text(c)
                    if t and t not in seen:
                        seen.add(t)
                        rows.append((os.path.basename(path), t))

    with open(os.path.join(DATA, "q_corpus.txt"), "w", encoding="utf-8") as f:
        for _, t in rows:
            f.write(t + "\n\n")
    with open(os.path.join(DATA, "q_corpus.csv"), "w", encoding="utf-8", newline="") as f:
        w = csv.writer(f, delimiter=";")
        w.writerow(["source", "text"])
        w.writerows(rows)

    chars = sum(len(t) for _, t in rows)
    print(f"абзацев/фрагментов: {len(rows)}   символов: {chars}")

    # --- черновик словаря: слова владельца ---
    words = Counter()
    for _, t in rows:
        for wd in re.findall(r"[A-Za-z][A-Za-z'\-]{2,}", t):
            words[wd.lower()] += 1
    print(f"уникальных словоформ: {len(words)}")
    print("\nтоп-40 слов:")
    print(", ".join(w for w, _ in words.most_common(40)))

    # --- годы и числа ---
    nums = Counter(re.findall(r"\b(?:19|20)\d{2}\b", " ".join(t for _, t in rows)))
    print("\nгоды в текстах:", dict(sorted(nums.items())))

    # --- длина абзацев ---
    lens = sorted(len(t) for _, t in rows)
    print(f"\nдлины фрагментов: min={lens[0]} med={lens[len(lens)//2]} max={lens[-1]}")
    print(f"-> {os.path.join(DATA, 'q_corpus.txt')}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
