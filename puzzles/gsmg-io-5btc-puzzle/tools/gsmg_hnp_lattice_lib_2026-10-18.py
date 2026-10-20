# -*- coding: utf-8 -*-
"""GSMG 2-й проход: решёточная HNP-атака на призовой ключ по 6 подписям.

Пред-регистрация: puzzles/gsmg-io-5btc-puzzle/LOG.md (H2).
Метод: k_i = s_i^{-1}(z_i + r_i d) mod n, 0 <= k_i < X = 2^B.
Решётка (целые, веса D=X/n, K=X, домноженные на n):
  R_i   = (n^2 e_i, 0, 0)         i=1..m
  R_m+1 = (n u_i,   X, 0)
  R_m+2 = (n t_i,   0, X)
  v = d R_m+1 + R_m+2 - sum l_i R_i = (n k_1,...,n k_m, X d, X)
LLL -> строка с (m+1)-й координатой +-X*d и первыми m координатами, кратными n.

Реализация LLL — СОБСТВЕННАЯ, точная (Fraction), т.к. sympy.lll падает на assert.
Область применимости (target короче GH): B < 256 - 256*2/(m+2):
  m=6 -> B <= 170;  m=3 -> B <= 85.  Санити-контроль на искусственном экземпляре обязателен.
Только чтение.
"""
import hashlib
import json
import os
import random
import sys
import time
from fractions import Fraction

sys.stdout.reconfigure(encoding="utf-8")
TMP = r"C:\Users\Admin\AppData\Local\Temp\opencode\gsmg-enrich"
N = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141
P_ = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F
Gx = 0x79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798
Gy = 0x483ADA7726A3C4655DA4FBFC0E1108A8FD17B448A68554199C47D08FFB10D4B8
H160 = "a9553269572a317e39f0f518cb87c1a0ee1dbae4"
FR1_2 = Fraction(1, 2)
DELTA = Fraction(3, 4)


# ---------------- точный LLL ----------------
def _dot(u, v):
    return sum(a * b for a, b in zip(u, v))


def lll_exact(B, delta=DELTA):
    n = len(B)
    B = [r[:] for r in B]
    bstar = [None] * n
    mu = [[Fraction(0)] * n for _ in range(n)]

    def gs():
        for i in range(n):
            v = [Fraction(x) for x in B[i]]
            for j in range(i):
                dj = _dot(bstar[j], bstar[j])
                mu[i][j] = _dot([Fraction(x) for x in B[i]], bstar[j]) / dj if dj != 0 else Fraction(0)
                v = [a - mu[i][j] * b for a, b in zip(v, bstar[j])]
            bstar[i] = v
    gs()
    k = 1
    guard = 0
    while k < n:
        guard += 1
        if guard > 100000:
            raise RuntimeError("LLL не сошёлся")
        for j in range(k - 1, -1, -1):
            if abs(mu[k][j]) > FR1_2:
                q = int(round(mu[k][j]))
                if q:
                    B[k] = [a - q * b for a, b in zip(B[k], B[j])]
                    for jj in range(j):
                        mu[k][jj] -= q * mu[j][jj]
                    mu[k][j] -= q
        if _dot(bstar[k], bstar[k]) >= (delta - mu[k][k - 1] ** 2) * _dot(bstar[k - 1], bstar[k - 1]):
            k += 1
        else:
            B[k], B[k - 1] = B[k - 1], B[k]
            gs()
            k = max(k - 1, 1)
    return B


# ---------------- решётка HNP ----------------
def attack(ut, X):
    """ut = список (u_i, t_i). X = граница nonce. Возвращает список (d, [k_i])."""
    m = len(ut)
    M = [[0] * (m + 2) for _ in range(m + 2)]
    for i in range(m):
        M[i][i] = N * N
    for i, (u, t) in enumerate(ut):
        M[m][i] = u * N
        M[m + 1][i] = t * N
    M[m][m] = X
    M[m + 1][m + 1] = X
    out = []
    for row in lll_exact(M):
        den = row[m]
        if den == 0:
            continue
        for sg in (1, -1):
            num = sg * den
            if num % X:
                continue
            d = num // X
            if not (0 < d < N):
                continue
            ks = []
            ok = True
            for i in range(m):
                if row[i] % N:
                    ok = False
                    break
                ki = abs((sg * row[i]) // N)
                if ki >= X:
                    ok = False
                    break
                ks.append(ki)
            if ok:
                out.append((d, ks))
    return out


# ---------------- secp256k1 ----------------
def _inv(a, m):
    return pow(a, m - 2, m)


def _add(p1, p2):
    if p1 is None:
        return p2
    if p2 is None:
        return p1
    x1, y1 = p1
    x2, y2 = p2
    if x1 == x2 and (y1 + y2) % P_ == 0:
        return None
    lam = ((3 * x1 * x1) * _inv(2 * y1, P_) if p1 == p2 else (y2 - y1) * _inv(x2 - x1, P_)) % P_
    x3 = (lam * lam - x1 - x2) % P_
    return (x3, (lam * (x1 - x3) - y1) % P_)


def _mul(k, pt=(Gx, Gy)):
    r = None
    while k:
        if k & 1:
            r = _add(r, pt)
        pt = _add(pt, pt)
        k >>= 1
    return r


def is_candidate(d):
    if not (0 < d < N):
        return None
    pt = _mul(d)
    if pt is None:
        return None
    un = b"\x04" + pt[0].to_bytes(32, "big") + pt[1].to_bytes(32, "big")
    if hashlib.new("ripemd160", hashlib.sha256(un).digest()).hexdigest() == H160:
        return "UNCOMPRESSED"
    cm = bytes([2 + (pt[1] & 1)]) + pt[0].to_bytes(32, "big")
    if hashlib.new("ripemd160", hashlib.sha256(cm).digest()).hexdigest() == H160:
        return "COMPRESSED"
    return None


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


def main():
    t0 = time.time()
    data = json.load(open(os.path.join(TMP, "ecdsa_sigs.json"), encoding="utf-8"))
    sigs = [{"r": int(g["r"], 16) % N, "s": int(g["s"], 16) % N, "z": int(g["z"], 16) % N}
            for g in data["sigs"]]
    print("подписей:", len(sigs), " уникальных r:", len({g["r"] for g in sigs}))

    rnd = random.Random(20261018)

    def sanity(m, B):
        d0 = rnd.randrange(1, N)
        fake = []
        for _ in range(m):
            k = rnd.randrange(1, 1 << B)
            r = rnd.randrange(1, N)
            s = rnd.randrange(1, N)
            fake.append({"r": r, "s": s, "z": (s * k - r * d0) % N})
        got = attack(coeffs(fake), 1 << B)
        return any(g[0] == d0 for g in got)

    print("\n--- санити-контроль собственного LLL ---")
    for m in (2, 3, 4, 6):
        for B in (10, 40, 80, 116, 140):
            ok = sanity(m, B)
            print(f"  m={m} B={B:3d}: {'OK' if ok else 'ПРОВАЛ'}", end="")
        print()
    if not all(sanity(6, B) for B in (40, 116, 140)):
        print("!! метод не подтверждён — реальные прогоны недействительны")
        return

    subsets = {"ALL6": sigs, "2020(3)": sigs[3:6], "2024(3)": sigs[0:3], "2020v0+2024v0": [sigs[3], sigs[0]]}
    bounds = {"ALL6": 170, "2020(3)": 85, "2024(3)": 85, "2020v0+2024v0": 0}
    found = []
    print("\n--- MSB: старшие биты k = 0 (диапазон B, где target короче GH) ---")
    for name, ss in subsets.items():
        top = bounds[name]
        if top == 0:
            print(f"  {name}: m=2, HNP этой формы неприменим — пропуск")
            continue
        t1 = time.time()
        ut = coeffs(ss)
        for B in range(8, top + 1):
            for d, ks in attack(ut, 1 << B):
                v = is_candidate(d)
                if v:
                    found.append((name, B, "MSB", d, v))
                    print(f"  !!! {name} B={B} {v} d={hex(d)}")
        print(f"  {name}: B=8..{top} просканировано за {time.time()-t1:.1f}s, находок нет")

    print("\n--- LSB: младшие L бит k = 0 ---")
    for name, ss in subsets.items():
        top = bounds[name]
        if top == 0:
            print(f"  {name}: m=2 — пропуск")
            continue
        t1 = time.time()
        for L in range(1, 80):
            B = 256 - L
            if B > top:
                continue
            ut = coeffs(ss, lsb=L)
            for d, ks in attack(ut, 1 << B):
                v = is_candidate(d)
                if v:
                    found.append((name, L, "LSB", d, v))
                    print(f"  !!! {name} LSB L={L} {v} d={hex(d)}")
        print(f"  {name}: LSB просканировано за {time.time()-t1:.1f}s")

    print("\nНАХОДОК:", len(found))
    for f in found:
        print("   ", f[0], f[1], f[2], hex(f[3]), f[4])
    with open(os.path.join(TMP, "hnp_result.json"), "w", encoding="utf-8") as fh:
        json.dump({"found": [{"subset": a, "bits": b, "side": c, "d": hex(d), "kind": k} for a, b, c, d, k in found],
                   "bounds": bounds}, fh, indent=1)
    print("elapsed %.1fs" % (time.time() - t0))


if __name__ == "__main__":
    main()
