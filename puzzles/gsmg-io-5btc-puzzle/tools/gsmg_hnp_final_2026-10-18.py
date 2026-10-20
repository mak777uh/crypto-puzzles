# -*- coding: utf-8 -*-
"""GSMG финальный HNP-прогон (m = все 6 подписей).

MSB: k_i < 2^B, B = 8..170
LSB: k_i = 2^L m_i, L = 248..86  (эквивалентно X = 2^(256-L), B = 8..170)
Область применимости (target короче GH при m=6): B <= 170 — вне неё форма бессильна,
и это указано честно, а не замаскировано.

Извлечение d: строки LLL(pas) + короткие комбинации (C=1, kmax=6, 3^6=729).
Критерий: h160(d*G) == a9553269...bae4 (несжатый ИЛИ сжатый).
Санити-контроль метода — до реальных данных.
Прогресс пишется сразу в файл (flush), чтобы его можно было мониторить.
"""
import hashlib
import itertools
import json
import os
import random
import sys
import time

import sympy

sys.path.insert(0, r"C:\Users\Admin\AppData\Local\Temp\opencode\gsmg-enrich")
from gsmg_hnp_attack2 import lll_exact, N, H160, _inv, is_candidate  # noqa

TMP = r"C:\Users\Admin\AppData\Local\Temp\opencode\gsmg-enrich"
OUT = os.path.join(TMP, "hnp_final.txt")
C, KMAX = 1, 6
FALLBACKS = []


def reduce_rows(M):
    """LLL: sympy (быстрый, ~1 с) с откатом на собственный точный Fraction-LLL (~39 с).
    На реальных матрицах оба дают один и тот же базис (проверено bench_lll.py)."""
    try:
        R = sympy.Matrix(M).lll()
        return [[int(x) for x in row] for row in R.tolist()], "sympy"
    except Exception as e:  # sympy.lll ломается на части матриц (AssertionError)
        FALLBACKS.append(type(e).__name__)
        return lll_exact(M), "own"


def log(s):
    with open(OUT, "a", encoding="utf-8") as f:
        f.write(s + "\n")
    print(s, flush=True)


def build_M(ut, X):
    m = len(ut)
    M = [[0] * (m + 2) for _ in range(m + 2)]
    for i in range(m):
        M[i][i] = N * N
    for i, (u, t) in enumerate(ut):
        M[m][i] = u * N
        M[m + 1][i] = t * N
    M[m][m] = X
    M[m + 1][m + 1] = X
    return M


def coeffs(sigs, lsb=0):
    ut = []
    for g in sigs:
        si = _inv(g["s"] % N, N)
        u = (g["r"] % N) * si % N
        t = (g["z"] % N) * si % N
        if lsb:
            f = _inv(1 << lsb, N)
            u = u * f % N
            t = t * f % N
        ut.append((u, t))
    return ut


def extract(m, rows, X):
    m2 = m + 2
    out = set()
    cand_rows = rows[:KMAX] if KMAX else rows
    for coefs in itertools.product(range(-C, C + 1), repeat=len(cand_rows)):
        if not any(coefs):
            continue
        w = [0] * m2
        for c, row in zip(coefs, cand_rows):
            if c == 1:
                w = [a + b for a, b in zip(w, row)]
            elif c == -1:
                w = [a - b for a, b in zip(w, row)]
        den = w[m]
        if den == 0:
            continue
        for sg in (1, -1):
            num = sg * den
            if num % X:
                continue
            d = num // X
            if not (0 < d < N):
                continue
            ok = True
            for i in range(m):
                if w[i] % N or abs((sg * w[i]) // N) >= X:
                    ok = False
                    break
            if ok:
                out.add(d)
    return out


def solve(ut, X):
    rows, how = reduce_rows(build_M(ut, X))
    rows.sort(key=lambda v: sum(x * x for x in v))
    return extract(len(ut), rows, X)


def main():
    open(OUT, "w", encoding="utf-8").close()
    t0 = time.time()
    data = json.load(open(os.path.join(TMP, "ecdsa_sigs.json"), encoding="utf-8"))
    sigs = [{"r": int(g["r"], 16) % N, "s": int(g["s"], 16) % N, "z": int(g["z"], 16) % N}
            for g in data["sigs"]]
    m = len(sigs)
    log(f"начинаю: подписей {m}, уникальных r {len({g['r'] for g in sigs})}")

    # ---- санити-контроль ----
    rnd = random.Random(4242)
    for B in (24, 72, 116, 140, 168):
        d0 = rnd.randrange(1, N)
        fake = []
        for _ in range(m):
            k = rnd.randrange(1, 1 << B)
            r = rnd.randrange(1, N)
            s = rnd.randrange(1, N)
            fake.append({"r": r, "s": s, "z": (s * k - r * d0) % N})
        cands = solve(coeffs(fake), 1 << B)
        log(f"  санити B={B:3d}: {'OK' if d0 in cands else 'ПРОВАЛ'} (кандидатов {len(cands)})")
    # LSB санити
    for L in (100, 160, 240):
        B = 256 - L
        d0 = rnd.randrange(1, N)
        fake = []
        for _ in range(m):
            mk = rnd.randrange(1, 1 << B)
            k = (mk << L) % N
            r = rnd.randrange(1, N)
            s = rnd.randrange(1, N)
            fake.append({"r": r, "s": s, "z": (s * k - r * d0) % N})
        cands = solve(coeffs(fake, lsb=L), 1 << B)
        log(f"  санити LSB L={L:3d} (B={B}): {'OK' if d0 in cands else 'ПРОВАЛ'} (кандидатов {len(cands)})")

    found = []
    t1 = time.time()
    for B in range(8, 171):
        ut = coeffs(sigs)
        for d in solve(ut, 1 << B):
            v = is_candidate(d)
            if v:
                found.append(("MSB", B, d, v))
                log(f"  !!!! MSB B={B} {v} d={hex(d)}")
        if B % 10 == 0:
            log(f"  MSB B={B} ... {time.time()-t1:.0f}s")
    log(f"MSB готов: B=8..170 за {time.time()-t1:.0f}s")

    t2 = time.time()
    for L in range(248, 85, -1):
        B = 256 - L
        ut = coeffs(sigs, lsb=L)
        for d in solve(ut, 1 << B):
            v = is_candidate(d)
            if v:
                found.append(("LSB", L, d, v))
                log(f"  !!!! LSB L={L} (B={B}) {v} d={hex(d)}")
        if L % 10 == 0:
            log(f"  LSB L={L} ... {time.time()-t2:.0f}s")
    log(f"LSB готов: L=248..86 за {time.time()-t2:.0f}s")

    log(f"ИТОГ: находок {len(found)}; откатов LLL (sympy->свой): {len(FALLBACKS)} {sorted(set(FALLBACKS))}; elapsed {time.time()-t0:.0f}s")
    json.dump({"found": [{"side": a, "bits": b, "d": hex(d), "kind": k} for a, b, d, k in found]},
              open(os.path.join(TMP, "hnp_final_result.json"), "w", encoding="utf-8"), indent=1)


if __name__ == "__main__":
    main()
