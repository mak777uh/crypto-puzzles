#!/usr/bin/env python3
"""Независимая проверка кандидатной WIFA-формулы из отчёта второй модели.

Формула (их):
  F = Σ(slot_index + rank_within_spine_class(slot, atom)),  slot: Lt=1..Rb=6
  1-based:  idx = (F - 14) mod 71      char = ALPHA1[idx-1]   (A=1)
  0-based:  idx = (F - 15) mod 71      char = ALPHA0[idx]     (A=0)

Авторские подтверждения (тред, ondttjc): «0 Indexed of course. And yes it does.»
  => алфавит 0-индексный (A=0), и ПРОБЕЛ входит в ранжирование.

Проверяем:
  1) воспроизводятся ли ME и H при их соглашениях;
  2) что будет при авторском 0-индексном алфавите;
  3) есть ли вообще глиф с F=34 (T);
  4) криб «первая буква не A» (L1#1);
  5) полный поток символов.
"""
import json
import os
import sys
from collections import Counter, defaultdict

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(os.path.dirname(HERE), "data")

SLOTS = ["Lt", "Lm", "Lb", "Rt", "Rm", "Rb"]
ALPHA = (list("ABCDEFGHIJKLMNOPQRSTUVWXYZ")
         + list("abcdefghijklmnopqrstuvwxyz")
         + list("0123456789")
         + list(" .,!?\'\"()"))
assert len(ALPHA) == 71, len(ALPHA)


def load():
    d = json.load(open(os.path.join(DATA, "rcodes_glyphs.json"), encoding="utf-8"))
    out = []
    for ln in sorted(d["lines"], key=int):
        pos = 0
        for g in d["lines"][ln]:
            if g["space"]:
                continue
            pos += 1
            out.append({"line": int(ln), "pos": pos,
                        "spine": g["spine"], "geom": g["L"] + g["R"],
                        "norm": f"{g['spine']} {g['L']}/{g['R']}"})
    return out


def build_ranks(glyphs, include_space=None, scope="spine"):
    """scope='spine' -> ранги внутри класса spine; scope='global' -> один общий."""
    counts = defaultdict(Counter)
    glob = Counter()
    for g in glyphs:
        for s, ch in zip(SLOTS, g["geom"]):
            if ch == ".":
                continue
            key = (g["spine"], s) if scope == "spine" else ("*", s)
            counts[key][ch] += 1
            glob[ch] += 1
    ranks, ranks0 = {}, {}
    for key, ctr in counts.items():
        items = sorted(ctr.items(),
                       key=lambda kv: (-kv[1], -glob.get(kv[0], 0), kv[0]))
        ranks[key] = {atom: i + 1 for i, (atom, _) in enumerate(items)}     # 1-based
        ranks0[key] = {atom: i for i, (atom, _) in enumerate(items)}        # 0-based
    return ranks, ranks0, counts


def F_of(g, ranks, ranks0, scope="spine"):
    key_prefix = (g["spine"],) if scope == "spine" else ("*",)
    tot1, tot0, det = 0, 0, []
    for i, (s, ch) in enumerate(zip(SLOTS, g["geom"]), start=1):
        if ch == ".":
            continue
        key = key_prefix + (s,)
        r1, r0 = ranks[key][ch], ranks0[key][ch]
        tot1 += i + r1                  # их формула: slot 1-based + ранг 1-based
        tot0 += i + r0                  # то же, но ранг 0-индексный
        det.append((s, i, ch, r1, i + r1, r0))
    return tot1, tot0, det


def main():
    glyphs = load()
    ranks, ranks0, counts = build_ranks(glyphs, scope="spine")

    print("=" * 72)
    print("ВОСПРОИЗВЕДЕНИЕ ИХ ФОРМУЛЫ (slot 1..6, ранг 1-based)")
    print("=" * 72)
    for g in glyphs:
        g["F"], g["F0"], g["det"] = F_of(g, ranks, ranks0)
    # их соглашение: char = ALPHA[(F - 15) % 71]
    ch_of = lambda F: ALPHA[(F - 15) % 71]

    for target in ("L5#1", "L5#2"):
        ln, p = target.split("#")
        g = next(x for x in glyphs if x["line"] == int(ln[1:]) and x["pos"] == int(p))
        print(f"  {g['norm']:<18} F={g['F']:>3}  -> {ch_of(g['F'])!r}")

    hits_h = [g for g in glyphs if ch_of(g["F"]) == "H"]
    print(f"  глифов -> 'H': {len(hits_h)}  (из них {hits_h[0]['norm'] if hits_h else '-'})")

    print()
    print("=" * 72)
    print("АВТОРСКОЕ СОГЛАШЕНИЕ: алфавит 0-индексный (A=0), сдвиг 47+10=57")
    print("=" * 72)
    # 0-based: char = ALPHA[(F + 57) % 71] == ALPHA[(F - 14) % 71]
    ch0 = lambda F: ALPHA[(F + 57) % 71]
    for target in ("L5#1", "L5#2"):
        ln, p = target.split("#")
        g = next(x for x in glyphs if x["line"] == int(ln[1:]) and x["pos"] == int(p))
        print(f"  {g['norm']:<18} F={g['F']:>3}  -> {ch0(g['F'])!r}")
    print(f"  глифов -> 'H': {len([g for g in glyphs if ch0(g['F'])=='H'])}")
    print(f"  глифов -> 'T': {len([g for g in glyphs if ch0(g['F'])=='T'])}")
    print(f"  глифов -> 'M': {len([g for g in glyphs if ch0(g['F'])=='M'])}")
    print(f"  глифов -> 'E': {len([g for g in glyphs if ch0(g['F'])=='E'])}")

    print()
    print("=" * 72)
    print("КРИБЫ ИХ ФОРМУЛЫ")
    print("=" * 72)
    # T: для их 1-based нужно idx=20 -> (F-15)%71 = 19 -> F=34
    have34 = [g for g in glyphs if g["F"] == 34]
    print(f"  глифов с F=34 (их 'T'): {len(have34)}")
    print(f"  распределение F: min={min(g['F'] for g in glyphs)} "
          f"max={max(g['F'] for g in glyphs)}")
    # первая буква не A
    first = next(g for g in glyphs if g["line"] == 1 and g["pos"] == 1)
    print(f"  L1#1 {first['norm']:<18} F={first['F']} -> их: {ch_of(first['F'])!r} "
          f"/ 0-based: {ch0(first['F'])!r}   (автор: первая буква НЕ A)")

    print()
    print("=" * 72)
    print("ПОЛНЫЙ ПОТОК (их соглашение)")
    print("=" * 72)
    for ln in range(1, 7):
        row = [g for g in glyphs if g["line"] == ln]
        print(f"  L{ln}: " + " ".join(ch_of(g["F"]) for g in row))

    print()
    print("=" * 72)
    print("ТАБЛИЦЫ РАНГОВ ДЛЯ SPINE 'I' (1-based) — проверка чисел из отчёта")
    print("=" * 72)
    for s in SLOTS:
        if ("I", s) in counts:
            ctr = counts[("I", s)]
            order = sorted(ctr.items(), key=lambda kv: (-kv[1], kv[0]))
            print(f"  {s}: " + ", ".join(f"{a}:{c}(n={ranks[('I', s)][a]})"
                                        for a, c in order))
    print()
    for target in ("L5#1", "L5#2"):
        ln, p = target.split("#")
        g = next(x for x in glyphs if x["line"] == int(ln[1:]) and x["pos"] == int(p))
        print(f"  {target} {g['norm']}  F1={g['F']} F0={g['F0']}")
        for s, i, ch, r1, c1, r0 in g["det"]:
            print(f"      {s} slot{i}: '{ch}' rank1={r1} contrib1={c1} rank0={r0}")
    print()
    print("=" * 72)
    print("УЧЁТ ПРОБЕЛА В РАНЖИРОВАНИИ (автор: 'yes it does')")
    print("=" * 72)
    print("  их build_ranks() обрабатывает ТОЛЬКО не-SP глифы -> пробел ИСКЛЮЧЁН.")
    print("  Это прямое нарушение подтверждённого ответа author/ondttjc.")

    # тай-брейк: сколько позиций вообще имеют >1 атома
    amb = sum(1 for k in counts if len(counts[k]) > 1)
    print(f"  позиций (spine,slot) с >1 атомом: {amb}")
    ties = sum(1 for k in counts if len(set(counts[k].values())) != len(counts[k]))
    print(f"  позиций с равными частотами (нужен тай-брейк): {ties} из {len(counts)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
