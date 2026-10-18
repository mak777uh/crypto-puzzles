#!/usr/bin/env python3
"""Насколько криб «ME» различает гипотезы?

Идея. Отчёт второй модели объявляет WIFA-формулу подтверждённой, потому что она
даёт M и E на L5#1/L5#2. Но у формулы много свободных соглашений:
  * база слота (0/1)
  * база ранга (0/1)
  * контейнер ранжирования (класс spine / глобально)
  * тай-брейк равных частот (лексикографически / по глобальной частоте / обратный)
  * из констант 47 и 10 (сумма 57, разность 37, произведение mod 71 = 44, 47, 10)
Если ME получается у многих вариантов — криб не различает.
Если ME получается, но текст не английский — формула не работает.
"""
import json
import os
import sys
import itertools
from collections import Counter, defaultdict

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(os.path.dirname(HERE), "data")

SLOTS = ["Lt", "Lm", "Lb", "Rt", "Rm", "Rb"]
ALPHA = (list("ABCDEFGHIJKLMNOPQRSTUVWXYZ")
         + list("abcdefghijklmnopqrstuvwxyz")
         + list("0123456789")
         + list(" .,!?'\"()"))
assert len(ALPHA) == 71

CONSTS = {"47+10": 57, "47-10": 37, "47*10%71": (47 * 10) % 71, "47": 47, "10": 10}


def load():
    d = json.load(open(os.path.join(DATA, "rcodes_glyphs.json"), encoding="utf-8"))
    out = []
    for ln in sorted(d["lines"], key=int):
        pos = 0
        for g in d["lines"][ln]:
            if g["space"]:
                continue
            pos += 1
            out.append({"line": int(ln), "pos": pos, "spine": g["spine"],
                        "geom": g["L"] + g["R"]})
    return out


def build(glyphs, scope, tiebreak):
    counts = defaultdict(Counter)
    glob = Counter()
    for g in glyphs:
        for s, ch in zip(SLOTS, g["geom"]):
            if ch == ".":
                continue
            counts[(g["spine"] if scope == "spine" else "*", s)][ch] += 1
            glob[ch] += 1
    ranks = {}
    for key, ctr in counts.items():
        if tiebreak == "global":
            items = sorted(ctr.items(), key=lambda kv: (-kv[1], -glob[kv[0]], kv[0]))
        elif tiebreak == "lex":
            items = sorted(ctr.items(), key=lambda kv: (-kv[1], kv[0]))
        else:  # lex_rev
            items = sorted(ctr.items(), key=lambda kv: (-kv[1], kv[0]), reverse=False)
            items = sorted(items, key=lambda kv: (-kv[1], [-ord(c) for c in kv[0]]))
        ranks[key] = [a for a, _ in items]
    return ranks


def F_of(g, ranks, scope, slot_base, rank_base):
    tot, k = 0, 0
    for i, (s, ch) in enumerate(zip(SLOTS, g["geom"])):
        if ch == ".":
            continue
        key = (g["spine"] if scope == "spine" else "*", s)
        r = ranks[key].index(ch) + rank_base
        tot += (i + slot_base) + r
        k += 1
    return tot


def english_score(stream):
    """Доля букв среди не-пробельных символов + грубая оценка на 'читаемость'."""
    letters = sum(1 for c in stream if c.isalpha())
    non_space = sum(1 for c in stream if c != " ")
    return letters / max(1, non_space)


def main():
    glyphs = load()
    a1 = next(g for g in glyphs if g["line"] == 5 and g["pos"] == 1)
    a2 = next(g for g in glyphs if g["line"] == 5 and g["pos"] == 2)

    hits = []
    total = 0
    for scope, tiebreak, slot_base, rank_base, (cname, cval) in itertools.product(
            ["spine", "global"], ["global", "lex", "lex_rev"],
            [0, 1], [0, 1], CONSTS.items()):
        ranks = build(glyphs, scope, tiebreak)
        total += 1
        for sign in (+1, -1):
            F1 = F_of(a1, ranks, scope, slot_base, rank_base)
            F2 = F_of(a2, ranks, scope, slot_base, rank_base)
            c1 = ALPHA[(F1 + sign * cval) % 71]
            c2 = ALPHA[(F2 + sign * cval) % 71]
            if c1 == "M" and c2 == "E":
                stream = []
                for g in glyphs:
                    F = F_of(g, ranks, scope, slot_base, rank_base)
                    stream.append(ALPHA[(F + sign * cval) % 71])
                hits.append((scope, tiebreak, slot_base, rank_base, cname,
                             "+" if sign > 0 else "-", F1, F2, "".join(stream)))

    print(f"Проверено конфигураций: {total * 2}")
    print(f"Из них дают 'M','E' на L5#1/L5#2: {len(hits)}")
    print()
    # группируем по качеству выхода
    hits.sort(key=lambda h: -english_score(h[8]))
    for h in hits[:8]:
        scope, tb, sb, rb, cn, sg, F1, F2, stream = h
        print(f"  scope={scope:<6} tie={tb:<7} slot_base={sb} rank_base={rb} "
              f"const={cn}{sg} F1={F1} F2={F2}")
        print(f"     доля букв={english_score(stream):.2f}")
        print(f"     {stream[:90]}")
    if not hits:
        print("  (ни одна конфигурация не даёт ME)")
    print()
    print("Автор: 71 символ; алфавит 0-индексный (A=0); пробел ВХОДИТ в ранжирование;")
    print("первое слово != hello; буквы H и T декодированы.")
    print("Проверка на всём наборе соглашений выше:")
    # сколько вариантов дают существование H и T и первую букву != A
    stat = Counter()
    n = 0
    for scope, tiebreak, slot_base, rank_base, (cname, cval) in itertools.product(
            ["spine", "global"], ["global", "lex", "lex_rev"],
            [0, 1], [0, 1], CONSTS.items()):
        ranks = build(glyphs, scope, tiebreak)
        for sign in (+1, -1):
            n += 1
            chars = [ALPHA[(F_of(g, ranks, scope, slot_base, rank_base)
                            + sign * cval) % 71] for g in glyphs]
            if "H" in chars:
                stat["есть H"] += 1
            if "T" in chars:
                stat["есть T"] += 1
            if "M" in chars and "E" in chars:
                stat["есть M и E"] += 1
            if chars[0] != "A":
                stat["первая буква != A"] += 1
    for k, v in stat.items():
        print(f"    {k}: {v}/{n}  ({100*v/n:.0f}%)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
