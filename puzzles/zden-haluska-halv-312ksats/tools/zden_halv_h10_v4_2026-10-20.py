# -*- coding: utf-8 -*-
"""Zden HALV H10 v4: дробная фаза решётки (скан 0.1), Витерби с ходом, упаковки, оракул."""
import json, os, csv, itertools, hashlib
from PIL import Image
import base58
from coincurve import PrivateKey

BASE = r"C:\Users\Admin\OneDrive\Desktop\master\puzzles\zden-haluska-halv-312ksats"
G = os.path.join(BASE, "data", "github", "benjacasas02__independent-cryptography-research", "files", "research", "zden-halv", "artifacts", "data")
TARGET = "1crypto24HCr178iMcKd5iUi5D4rsg1nK"
SB = [128, 64, 32, 16, 8, 4, 2, 1]
T = 127.0

def addr(priv32, compressed):
    pk = PrivateKey(priv32)
    pub = pk.public_key.format(compressed=compressed)
    h = hashlib.new("ripemd160", hashlib.sha256(pub).digest()).digest()
    return base58.b58encode_check(b"\x00" + h).decode()

def sb_at(x):
    return SB[min(7, max(0, int((x - 91) // 96)))]

def main():
    one = (1).to_bytes(32, "big")
    assert addr(one, False) == "1EHNa6Q4Jz2uvNExL497mE43ikXhwF6kZm"
    assert addr(one, True) == "1BgGZ9tcN4rm9KBzDn7KprQz87SZ26SAMH"
    print("SELFTEST OK")
    im = Image.open(os.path.join(BASE, "data", "cryptoHALV.png")).convert("L")
    px = im.load()
    edge = {}
    for x in range(90, 860):
        yt = None
        for y in range(0, 475):
            if px[x, y] > T: yt = y; break
        if yt is None: edge[x] = 475.0; continue
        i1 = px[x, yt]; i0 = px[x, yt - 1] if yt > 0 else 0
        frac = min(1.0, max(0.0, (T - i0) / (i1 - i0))) if i1 > i0 else 0.0
        edge[x] = (yt - 1) + frac
    def E(x):
        x0 = int(x); f = x - x0
        return edge[x0] * (1 - f) + edge[min(x0 + 1, 859)] * f
    def s_of(x):  # амплитуда с калиброванным офсетом
        return 475.0 - E(x) - C
    apex = []
    with open(os.path.join(G, "CANON64.tsv"), encoding="utf-8") as f:
        for r in csv.DictReader(f, delimiter="\t"):
            xc = (int(r["x1"]) + int(r["x2"])) / 2.0
            A = int(r["A"]); sb = sb_at(xc)
            q = (A - 1) / sb
            if abs(q - round(q)) < 0.2:
                apex.append((xc, int(round(q)), sb))
    # офсет по апексам при фазе 92.44 (их калибровка)
    global C
    def calib_off(phase):
        offs = {}
        for xc, q, sb in apex:
            i = round((xc - phase) / 3.0)
            x = phase + 3 * i
            o = s_raw(x) - q * sb
            offs[round(o, 1)] = offs.get(round(o, 1), 0) + 1
        return max(offs.items(), key=lambda kv: kv[1])[0]
    def s_raw(x): return 475.0 - E(x)
    # скан фазы
    best = None
    for ph100 in range(900, 941, 5):
        phase = ph100 / 10.0
        C = calib_off(phase)
        res = 0.0; n = 0
        for xc, q, sb in apex:
            i = round((xc - phase) / 3.0)
            if not (0 <= i <= 255): continue
            x = phase + 3 * i
            res += abs(s_of(x) - q * sb_at(x)) / sb_at(x); n += 1
        if n and (best is None or res / n < best[0]): best = (res / n, phase, n, C)
    print("фаза: mean_res=%.4f phase=%.1f n=%d C=%.1f" % best)
    _, phase, _, C = best
    # якоря
    anc = {}
    for xc, q, sb in apex:
        i = int(round((xc - phase) / 3.0))
        if 0 <= i <= 255: anc[i] = q
    nv = 0
    for x, y, m, sb, q in json.load(open(os.path.join(G, "vertices.json"), encoding="utf-8")):
        rq = round(q)
        if abs(q - rq) < 0.2 and 0 <= rq <= 3:
            i = int(round((x - phase) / 3.0))
            if 0 <= i <= 255: anc[i] = int(rq); nv += 1
    print("якорей:", len(anc))
    # наблюдения
    obs = [s_of(phase + 3 * i) for i in range(256)]
    # Витерби
    INF = 1e9
    cost = [[INF] * 4 for _ in range(256)]; back = [[0] * 4 for _ in range(256)]
    def em(i, q):
        x = phase + 3 * i
        r = abs(obs[i] - q * sb_at(x)) / sb_at(x)
        if i in anc: return 0.0 if anc[i] == q else 8.0
        return min(2.0, r)
    for q in range(4): cost[0][q] = em(0, q)
    for i in range(1, 256):
        xprev = phase + 3 * (i - 1); xcur = phase + 3 * i
        boundary = sb_at(xcur) != sb_at(xprev)
        for q in range(4):
            bc, bp = INF, 0
            for p in range(4):
                if boundary:
                    ok = (q == 2 * p) or (q == p) or (abs(q - p) <= 1) or (p == 2 * q)
                else:
                    ok = abs(q - p) <= 1
                if not ok: continue
                cc = cost[i - 1][p] + em(i, q)
                if cc < bc: bc, bp = cc, p
            cost[i][q] = bc; back[i][q] = bp
    qe = min(range(4), key=lambda q: cost[255][q])
    seq = [0] * 256; seq[255] = qe
    for i in range(255, 0, -1): seq[i - 1] = back[i][seq[i]]
    conf = sum(1 for i in range(256) if sorted(cost[i])[1] - sorted(cost[i])[0] >= 2.0)
    print("cost=%.1f confident=%d/256" % (cost[255][qe], conf))
    print("seq:", "".join(str(q) for q in seq))
    # упаковки
    cands = {}
    for perm in itertools.permutations(range(4)):
        def mp(q): return perm[q]
        for win in (0, 128):
            sub = seq[win:win + 128]
            for msb in (True, False):
                for rev in (False, True):
                    s2 = sub[::-1] if rev else sub
                    out = bytearray()
                    for k in range(0, 128, 4):
                        v = 0
                        it = s2[k:k + 4] if msb else s2[k:k + 4][::-1]
                        for q in it: v = (v << 2) | mp(q)
                        out.append(v)
                    hx = bytes(out).hex()
                    cands.setdefault(hx, "w%d|msb%d|r%d" % (win, msb, rev))
    print("кандидатов:", len(cands))
    hits = [m for hx, m in cands.items()
            if addr(bytes.fromhex(hx), False) == TARGET or addr(bytes.fromhex(hx), True) == TARGET]
    print("совпадений:", len(hits))
    for h in hits[:5]: print("MATCH", h)
    if not hits: print("NO MATCH (дробная фаза + Витерби)")
    # сравнение с суб-пиксельной v3 (фаза 92)
    try:
        d3 = json.load(open(os.path.join(BASE, "data", "halv_h10_subpix_2026-10-20.json"), encoding="utf-8"))
        print("загружена v3 для сравнения")
    except Exception: pass

if __name__ == "__main__":
    main()
