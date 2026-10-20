#!/usr/bin/env python3
"""WIFA-свип с восстановленной формой пробел-глифа (AutoClaw, 19.10.2026).

Новое против wifa_crib_robustness.py:
  1. SP-глифы больше не выбрасываются: всем 13 присвоена форма I .+./o.o
     (визуальная сверка всех 13 позиций по нативным кропам).
     Их значки (+, o, o) теперь участвуют в частотном ранжировании.
  2. Главный криб: пробел декодирован автором => SP-глиф обязан давать символ
     пробела алфавита. Это ЖЁСТКО фиксирует сдвиг Цезаря, после чего «ME на L5»
     становится проверкой, а не подгонкой.
  3. Модели ранжирования: marks_slot, marks_spine, glyph_rank.
"""
import json, os, sys, itertools
from collections import Counter, defaultdict

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(os.path.dirname(HERE), "data")

SLOTS = ["Lt", "Lm", "Lb", "Rt", "Rm", "Rb"]
LETTERS_DIGITS = (list("ABCDEFGHIJKLMNOPQRSTUVWXYZ")
                  + list("abcdefghijklmnopqrstuvwxyz")
                  + list("0123456789"))
PUNCT = list(" .,!?'\"()")

def make_alpha(space_at):
    a = LETTERS_DIGITS + PUNCT
    assert len(a) == 71
    sp = a.index(" ")
    a[sp], a[space_at] = a[space_at], a[sp]
    return a

COMMON = set("the and that have for not with you this but his from they say her she will one all would there their what out about who get which when make can like time just him know take people into year your good some could them see other than then now look only come its over also back after use two how our work first well way even new want because any these give day most is it was are on in at be of to as he me we my no so do if by or an up".split())

def load(with_space_geom=True):
    d = json.load(open(os.path.join(DATA, "rcodes_glyphs.json"), encoding="utf-8"))
    out = []
    for ln in sorted(d["lines"], key=int):
        pos = 0
        for g in d["lines"][ln]:
            pos += 1
            if g.get("space"):
                if not with_space_geom:
                    continue
                out.append({"line": int(ln), "pos": pos, "spine": "I",
                            "geom": ".+." + "o.o", "space": True, "raw": "I .+./o.o"})
            else:
                out.append({"line": int(ln), "pos": pos, "spine": g["spine"],
                            "geom": g["L"] + g["R"], "space": False,
                            "raw": g.get("raw", "")})
    return out

def build_counts(glyphs, model, scope, tiebreak):
    counts = defaultdict(Counter)
    glob = Counter()
    for g in glyphs:
        if model == "glyph_rank":
            counts["*"][g["raw"]] += 1
            glob[g["raw"]] += 1
            continue
        for s, ch in zip(SLOTS, g["geom"]):
            if ch == ".":
                continue
            if model == "marks_slot":
                key = (g["spine"] if scope == "spine" else "*", s)
            else:
                key = (g["spine"] if scope == "spine" else "*", "*")
            counts[key][ch] += 1
            glob[ch] += 1
    ranks = {}
    for key, ctr in counts.items():
        if tiebreak == "global":
            items = sorted(ctr.items(), key=lambda kv: (-kv[1], -glob[kv[0]], kv[0]))
        else:
            items = sorted(ctr.items(), key=lambda kv: (-kv[1], kv[0]))
        ranks[key] = [a for a, _ in items]
    return ranks

def F_of(g, ranks, model, scope, slot_base, rank_base, asc):
    if model == "glyph_rank":
        r = ranks["*"].index(g["raw"]) + rank_base
        return -r if asc else r
    tot = 0
    for i, (s, ch) in enumerate(zip(SLOTS, g["geom"])):
        if ch == ".":
            continue
        if model == "marks_slot":
            key = (g["spine"] if scope == "spine" else "*", s)
        else:
            key = (g["spine"] if scope == "spine" else "*", "*")
        r = ranks[key].index(ch) + rank_base
        tot += (i + slot_base if model == "marks_slot" else 0) + ((-r) if asc else r)
    return tot

def words_score(stream, sp_char):
    words = [w for w in stream.split(sp_char) if w]
    hits = sum(1 for w in words if w.lower() in COMMON)
    letters = sum(1 for c in stream if c.isalpha())
    nonspace = sum(1 for c in stream if c != sp_char)
    return hits, len(words), letters / max(1, nonspace)

def main():
    glyphs = load(with_space_geom=True)
    n_sp = sum(1 for g in glyphs if g["space"])
    assert n_sp == 13, n_sp
    sp_glyph = next(g for g in glyphs if g["space"])
    l5 = sorted([g for g in glyphs if g["line"] == 5 and not g["space"]], key=lambda g: g["pos"])
    cribs = {"a": (l5[0], l5[1]), "b": (l5[2], l5[3])}

    models = ["marks_slot", "marks_spine", "glyph_rank"]
    total = 0
    me_hits = []
    for model, scope, tiebreak, slot_base, rank_base, asc, space_at in itertools.product(
            models, ["spine", "global"], ["global", "lex"], [0, 1], [0, 1], [False, True],
            [62, 0, 70]):
        total += 1
        ALPHA = make_alpha(space_at)
        ranks = build_counts(glyphs, model, scope, tiebreak)
        F_sp = F_of(sp_glyph, ranks, model, scope, slot_base, rank_base, asc)
        target = ALPHA.index(" ")
        c = (target - F_sp) % 71
        chars = {}
        def dec(g):
            key = (g["line"], g["pos"])
            if key not in chars:
                chars[key] = ALPHA[(F_of(g, ranks, model, scope, slot_base,
                                         rank_base, asc) + c) % 71]
            return chars[key]
        if dec(sp_glyph) != " ":
            continue
        for crib, (g1, g2) in cribs.items():
            if (dec(g1), dec(g2)) == ("M", "E"):
                stream = "".join(dec(g) for g in glyphs)
                hc, wn, lr = words_score(stream, " ")
                me_hits.append((model, scope, tiebreak, slot_base, rank_base,
                                asc, space_at, crib, c, stream, hc, wn, lr))

    print("Конфигураций всего: %d" % total)
    print("Дают 'ME' на L5 после фиксации сдвига крибом SP=пробел: %d" % len(me_hits))
    me_hits.sort(key=lambda h: (-h[10], -h[12]))
    for h in me_hits[:10]:
        model, scope, tb, sb, rb, asc, sa, crib, c, stream, hc, wn, lr = h
        print("  model=%s scope=%s tie=%s sb=%s rb=%s asc=%s space_at=%s crib=%s const=%s words=%d/%d letters=%.2f" % (
            model, scope, tb, sb, rb, asc, sa, crib, c, hc, wn, lr))
        print("    " + stream[:100])
    if not me_hits:
        print("  (SP=пробел и ME одновременно не выполняются ни в одной конфигурации)")
        print()
        print("Диагностика marks_slot/global (space_at=62, base 0, desc):")
        ALPHA = make_alpha(62)
        ranks = build_counts(glyphs, "marks_slot", "global", "global")
        F = lambda g: F_of(g, ranks, "marks_slot", "global", 0, 0, False)
        c = (ALPHA.index(" ") - F(sp_glyph)) % 71
        stream = "".join(ALPHA[(F(g) + c) % 71] for g in glyphs)
        print("  const=%d" % c)
        print("  " + stream)
        g1, g2 = cribs["a"]
        print("  L5#1 F=%d -> %r; L5#2 F=%d -> %r" % (F(g1), ALPHA[(F(g1)+c)%71], F(g2), ALPHA[(F(g2)+c)%71]))
        Fs = [F(g) for g in glyphs]
        print("  диапазон F: %d..%d, разных F: %d" % (min(Fs), max(Fs), len(set(Fs))))
    return 0

if __name__ == "__main__":
    sys.exit(main())
