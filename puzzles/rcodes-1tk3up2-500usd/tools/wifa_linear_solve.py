# -*- coding: utf-8 -*-
"""Линейное семейство WIFA: V(g) = sum_i w_i * rank_i(mark) + c по крибам.
Крибы: SP -> пробел (фиксирует сдвиг), L5 -> "ME" (гипотезы a: позиции 1-2, b: 3-4).
Валидация: H и T присутствуют, первая буква != A, первое слово != HELLO.
Модели: A = веса по сторонам (wL,wR,c); B = веса по высотам слотов (wt,wm,wb,c), wt сканируется.
AutoClaw, 19.10.2026. Данные: rcodes_glyphs_sp_2026-10-19.json (SP с формой I .+./o.o)."""
import json, os, itertools
from collections import Counter, defaultdict

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(os.path.dirname(HERE), "data")
SLOTS = ["Lt", "Lm", "Lb", "Rt", "Rm", "Rb"]
P = 71

def make_alpha(space_at):
    base = list("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 .,!?'\"()")
    assert len(base) == 71
    i = base.index(" ")
    base[i], base[space_at] = base[space_at], base[i]
    return base

def load():
    d = json.load(open(os.path.join(DATA, "rcodes_glyphs_sp_2026-10-19.json"), encoding="utf-8"))
    out = []
    for ln in sorted(d["lines"], key=int):
        pos = 0
        for g in d["lines"][ln]:
            pos += 1
            out.append({"line": int(ln), "pos": pos, "spine": g.get("spine", "I"),
                        "L": g.get("L", "..."), "R": g.get("R", "..."),
                        "space": bool(g.get("space")),
                        "raw": g.get("raw", "")})
    return out

def build_ranks(glyphs, scope, tiebreak, direction):
    counts = defaultdict(Counter); glob = Counter()
    for g in glyphs:
        for s, side, ch in zip(SLOTS, "LLLRRR", g["L"] + g["R"]):
            if ch == ".": continue
            key = (g["spine"] if scope == "spine" else "*", s)
            counts[key][ch] += 1; glob[ch] += 1
    ranks = {}
    for key, ctr in counts.items():
        if tiebreak == "global":
            items = sorted(ctr.items(), key=lambda kv: (-kv[1], -glob[kv[0]], kv[0]))
        else:
            items = sorted(ctr.items(), key=lambda kv: (-kv[1], kv[0]))
        order = [a for a, _ in items]
        ranks[key] = order if direction == "desc" else order[::-1]
    return ranks

def ranks_of(g, ranks, scope):
    rs = {}
    for s, ch in zip(SLOTS, g["L"] + g["R"]):
        if ch == ".": continue
        key = (g["spine"] if scope == "spine" else "*", s)
        rs[s] = ranks[key].index(ch)
    return rs

def solve_mod(A, b):
    """решает A x = b mod 71 (Гаусс), A: список строк; возврат x или None если вырождено"""
    n = len(A); m = [row[:] + [bv] for row, bv in zip(A, b)]
    piv_cols = []
    r = 0
    for c in range(len(A[0])):
        piv = None
        for rr in range(r, n):
            if m[rr][c] % P: piv = rr; break
        if piv is None: continue
        m[r], m[piv] = m[piv], m[r]
        inv = pow(m[r][c], P-2, P)
        m[r] = [(x*inv) % P for x in m[r]]
        for rr in range(n):
            if rr != r and m[rr][c] % P:
                f = m[rr][c]
                m[rr] = [(x - f*y) % P for x, y in zip(m[rr], m[r])]
        piv_cols.append(c); r += 1
    for rr in range(r, n):
        if all(x % P == 0 for x in m[rr][:len(A[0])]) and m[rr][-1] % P: return None
    if len(piv_cols) < len(A[0]): return None  # требует параметризации
    x = [0]*len(A[0])
    for i, c in enumerate(piv_cols): x[c] = m[i][-1]
    return x

def main():
    glyphs = load()
    n_sp = sum(1 for g in glyphs if g["space"]); assert n_sp == 13
    sp = next(g for g in glyphs if g["space"])
    l5 = sorted([g for g in glyphs if g["line"] == 5 and not g["space"]], key=lambda g: g["pos"])
    hyps = {"a": (l5[0], l5[1]), "b": (l5[2], l5[3])}
    COMMON = set("the and that have for not with you this but his from they say her she will one all would there their what out about who get which when make can like time just him know take people into year your good some could them see other than then now look only come its over also back after use two how our work first well way even new want because any these give day most is it was are on in at be of to as he me we my no so do if by or an up".split())

    total = solved = survivors = 0
    results = []
    for scope, tiebreak, direction, space_at, hyp in itertools.product(
            ["global", "spine"], ["global", "lex"], ["desc", "asc"], [62, 0], ["a", "b"]):
        ALPHA = make_alpha(space_at)
        sp_idx, M_idx, E_idx = ALPHA.index(" "), ALPHA.index("M"), ALPHA.index("E")
        ranks = build_ranks(glyphs, scope, tiebreak, direction)
        rs_sp = ranks_of(sp, ranks, scope); g1, g2 = hyps[hyp]
        rs1, rs2 = ranks_of(g1, ranks, scope), ranks_of(g2, ranks, scope)
        for model in ["A", "B"]:
            total += 1
            if model == "A":
                def feats(rs):
                    return [sum(rs.get(s, 0) for s in "LmLbLt"), sum(rs.get(s, 0) for s in "RmRbRt")]
                rows = [feats(rs_sp)+[1], feats(rs1)+[1], feats(rs2)+[1]]
                rhs = [sp_idx, M_idx, E_idx]
                x = solve_mod(rows, rhs)
                if x is None: continue
                wL, wR, c = x
                def V(g):
                    rs = ranks_of(g, ranks, scope)
                    return (wL*sum(rs.get(s,0) for s in "LmLbLt") + wR*sum(rs.get(s,0) for s in "RmRbRt") + c) % P
            else:
                # B: (wt, wm, wb, c); wt = t сканируем
                def feats(rs): return [rs.get("Lt",0)+rs.get("Rt",0), rs.get("Lm",0)+rs.get("Rm",0), rs.get("Lb",0)+rs.get("Rb",0)]
                f_sp, f1, f2 = feats(rs_sp), feats(rs1), feats(rs2)
                for t in range(P):
                    rows = [[f_sp[1], f_sp[2], 1], [f1[1], f1[2], 1], [f2[1], f2[2], 1]]
                    rhs = [(sp_idx - t*f_sp[0]) % P, (M_idx - t*f1[0]) % P, (E_idx - t*f2[0]) % P]
                    x = solve_mod(rows, rhs)
                    if x is None: continue
                    wm, wb, c = x
                    w = (t, wm, wb, t, wm, wb)
                    solved += 1
                    stream = ""
                    ok = True
                    for g in glyphs:
                        rs = ranks_of(g, ranks, scope)
                        v = sum(wi*rs.get(s,0) for wi, s in zip(w, SLOTS)) + c
                        ch = ALPHA[v % P]
                        if g["space"] and ch != " ": ok = False; break
                        stream += ch
                    if not ok: continue
                    letters = sum(1 for ch in stream if ch.isalpha())
                    words = [w_ for w_ in stream.split(" ") if w_]
                    hits = sum(1 for w_ in words if w_.lower() in COMMON)
                    if ("H" in stream and "T" in stream and stream[0] != "A"
                            and stream[:9] != "HELLO" and letters/290 >= 0.8):
                        survivors += 1
                        results.append((hits, len(words), letters/290, scope, tiebreak, direction, space_at, hyp, t, wm, wb, c, stream))
                    continue
                continue
            # model A validation
            solved += 1
            stream = ""
            ok = True
            for g in glyphs:
                ch = ALPHA[V(g)]
                if g["space"] and ch != " ": ok = False; break
                stream += ch
            if not ok: continue
            letters = sum(1 for ch in stream if ch.isalpha())
            words = [w_ for w_ in stream.split(" ") if w_]
            hits = sum(1 for w_ in words if w_.lower() in COMMON)
            if ("H" in stream and "T" in stream and stream[0] != "A"
                    and stream[:9] != "HELLO" and letters/290 >= 0.8):
                survivors += 1
                results.append((hits, len(words), letters/290, scope, tiebreak, direction, space_at, hyp, "A", wL, wR, c, stream))

    print("конфигураций: %d, решено систем: %d, выживших после всех крибов: %d" % (total, solved, survivors))
    results.sort(key=lambda r: (-r[0], -r[2]))
    for r in results[:10]:
        print("hits=%d words=%d letters=%.2f scope=%s tie=%s dir=%s sp@%d hyp=%s w=%s" % (r[0], r[1], r[2], r[3], r[4], r[5], r[6], r[7], r[8:12]))
        print("   ", r[12][:110])
    if not results:
        print("(ни одна линейная конфигурация не проходит крибы SP->пробел + ME + H/T + первая!=A)")

if __name__ == "__main__":
    main()
