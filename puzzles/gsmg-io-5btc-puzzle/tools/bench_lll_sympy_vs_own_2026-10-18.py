# -*- coding: utf-8 -*-
"""Бенчмарк: sympy.lll против собственного Fraction-LLL на РЕАЛЬНЫХ матрицах HNP (m=6)."""
import json
import os
import sys
import time

import sympy

sys.path.insert(0, r"C:\Users\Admin\AppData\Local\Temp\opencode\gsmg-enrich")
from gsmg_hnp_attack2 import N, _inv, coeffs, lll_exact  # noqa
from gsmg_hnp_final import build_M  # noqa

TMP = r"C:\Users\Admin\AppData\Local\Temp\opencode\gsmg-enrich"
data = json.load(open(os.path.join(TMP, "ecdsa_sigs.json"), encoding="utf-8"))
sigs = [{"r": int(g["r"], 16) % N, "s": int(g["s"], 16) % N, "z": int(g["z"], 16) % N} for g in data["sigs"]]
ut = coeffs(sigs)

for B in (40, 100, 140):
    M = build_M(ut, 1 << B)
    t0 = time.time()
    try:
        R = sympy.Matrix(M).lll()
        t_sym = time.time() - t0
        nrm = sorted(sum(int(x) * int(x) for x in row) for row in R.tolist())[:3]
        ok = "OK"
    except Exception as e:
        t_sym = time.time() - t0
        ok = f"{type(e).__name__}"
        nrm = None
    t0 = time.time()
    try:
        mine = lll_exact(M)
        t_mine = time.time() - t0
        nrm2 = sorted(sum(x * x for x in row) for row in mine)[:3]
        ok2 = "OK"
    except Exception as e:
        t_mine = time.time() - t0
        ok2 = f"{type(e).__name__}"
        nrm2 = None
    print(f"B={B:4d}: sympy {t_sym:7.2f}s [{ok}]  |  свой Fraction-LLL {t_mine:7.2f}s [{ok2}]")
    if nrm and nrm2:
        print(f"        нормы (3 кратчайших): sympy {[n.bit_length() for n in nrm]} vs свой {[n.bit_length() for n in nrm2]}")
