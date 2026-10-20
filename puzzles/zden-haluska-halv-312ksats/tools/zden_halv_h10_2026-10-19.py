# -*- coding: utf-8 -*-
"""Zden HALV H10: восстановление 256 кватернарных сэмплов (медиана/верхняя кромка + якоря +
Витерби), упаковка recovered-последовательности, оракул. AutoClaw, 19.10.2026."""
import json, os, csv
from PIL import Image
import base58
from coincurve import PrivateKey

BASE = r"C:\Users\Admin\OneDrive\Desktop\master\puzzles\zden-haluska-halv-312ksats"
G = os.path.join(BASE, "data", "github", "benjacasas02__independent-cryptography-research", "files", "research", "zden-halv", "artifacts", "data")
TARGET = "1crypto24HCr178iMcKd5iUi5D4rsg1nK"
SB = [128, 64, 32, 16, 8, 4, 2, 1]

def addr(priv32, compressed):
    pk = PrivateKey(priv32)
    pub = pk.public_key.format(compressed=compressed)
    h = hashlib.new("ripemd160", hashlib.sha256(pub).digest()).digest()
    return base58.b58encode_check(b"\x00" + h).decode()
import hashlib

def selftest():
    one = (1).to_bytes(32, "big")
    assert addr(one, False) == "1EHNa6Q4Jz2uvNExL497mE43ikXhwF6kZm"
    assert addr(one, True) == "1BgGZ9tcN4rm9KBzDn7KprQz87SZ26SAMH"
    print("SELFTEST OK")

def sb_at(x):
    b = min(7, max(0, int((x - 91) // 96)))
    return SB[b]

def load_anchors():
    anc = {}
    ap = json.load(open(os.path.join(G, "apex_raw.json"), encoding="utf-8"))
    for a in ap:
        xc = (a["x1"] + a["x2"]) / 2.0
        i = int(round((xc - 92) / 3.0))
        if 0 <= i <= 255:
            q = round((a["A"] - 1) / sb_at(92 + 3*i))
            anc.setdefault(i, set()).add(q)
    vs = json.load(open(os.path.join(G, "vertices.json"), encoding="utf-8"))
    nv = 0
    for x, y, m, sb, q in vs:
        rq = round(q)
        if abs(q - rq) < 0.35 and 0 <= rq <= 3:
            i = int(round((x - 92) / 3.0))
            if 0 <= i <= 255:
                anc.setdefault(i, set()).add(rq); nv += 1
    return anc, nv

def main():
    selftest()
    im = Image.open(os.path.join(BASE, "data", "cryptoHALV.png")).convert("L")
    W, H = im.size
    px = im.load()
    # верхняя кромка чернил по колонкам
    atop = {}
    for x in range(90, 860):
        yt = None
        for y in range(0, 475):
            if px[x, y] > 100:
                yt = y; break
        atop[x] = (475 - yt) if yt is not None else 0
    # калибровка смещения по апексам CANON64
    offs = {}
    with open(os.path.join(G, "CANON64.tsv"), encoding="utf-8") as f:
        rd = csv.DictReader(f, delimiter="\t")
        canon = [r for r in rd]
    for r in canon:
        xc = (int(r["x1"]) + int(r["x2"])) / 2.0
        A = int(r["A"]); sb = sb_at(xc)
        q = (A - 1) / sb
        if abs(q - round(q)) < 0.2:
            o = atop[int(round(xc))] - round(q) * sb
            offs[round(o)] = offs.get(round(o), 0) + 1
    c_mode = max(offs.items(), key=lambda kv: kv[1])
    print("offset calibration:", sorted(offs.items(), key=lambda kv: -kv[1])[:4])
    c = c_mode[0]
    anc, nv = load_anchors()
    print("anchors:", len(anc), "of 256 (vertices used:", nv, ")")
    # решётка: выбираем фазу с минимумом |residual| на якорях
    best = None
    for phase in (91, 92, 93, 112, 113):
        res = 0.0; n = 0
        for i, qs in anc.items():
            x = phase + 3*i
            if x not in atop: continue
            q = sorted(qs)[0]
            res += abs(atop[x] - c - q * sb_at(x)) / sb_at(x); n += 1
        if n and (best is None or res/n < best[0]):
            best = (res/n, phase, n)
    print("lattice:", best)
    phase = best[1]
    # наблюдаемые q
    obs = []
    for i in range(256):
        x = phase + 3*i
        a = atop.get(x, 0)
        sb = sb_at(x)
        obs.append((a - c) / sb)
    # Витерби: состояния 0..3, переходы: в блоке |dq|<=1, на границе x2 {dq, 2q, q/2}
    INF = 1e9
    cost = [[INF]*4 for _ in range(256)]; back = [[0]*4 for _ in range(256)]
    def anch_cost(i, q):
        if i in anc:
            return 0.0 if q in anc[i] else 8.0
        return min(2.0, abs(obs[i] - q))
    for q in range(4):
        cost[0][q] = anch_cost(0, q)
    for i in range(1, 256):
        boundary = (92 + 3*i) >= 187 and (92 + 3*i - 3) < 187 or any((92+3*i) - 91 == 96*t for t in range(1, 8))
        for q in range(4):
            bestc, bestp = INF, 0
            for p in range(4):
                if boundary:
                    ok = (q == 2*p) or (q == p) or (abs(q - p) <= 1) or (p == 2*q)
                else:
                    ok = abs(q - p) <= 1
                if not ok: continue
                cc = cost[i-1][p] + anch_cost(i, q)
                if cc < bestc: bestc, bestp = cc, p
            cost[i][q] = bestc; back[i][q] = bestp
    q_end = min(range(4), key=lambda q: cost[255][q])
    seq = [0]*256; seq[255] = q_end
    for i in range(255, 0, -1):
        seq[i-1] = back[i][seq[i]]
    margin = 0
    conf = 0
    for i in range(256):
        s = sorted(cost[i])
        if s[1] - s[0] >= 2.0: conf += 1
    print("Viterbi: cost=%.1f  confident(>=2): %d/256" % (cost[255][q_end], conf))
    print("recovered seq:", "".join(str(q) for q in seq))
    # упаковки: окна 0..127 / 128..255, 24 биекции, MSB/LSB, fwd/rev
    cands = {}
    import itertools
    for perm in itertools.permutations(range(4)):
        def mp(q): return perm[q]
        for win in (0, 128):
            sub = seq[win:win+128]
            for msb in (True, False):
                for rev in (False, True):
                    s2 = sub[::-1] if rev else sub
                    out = bytearray()
                    for k in range(0, 128, 4):
                        v = 0
                        chunk = s2[k:k+4]
                        it = chunk if msb else chunk[::-1]
                        for q in it: v = (v << 2) | mp(q)
                        out.append(v)
                    hx = bytes(out).hex()
                    cands.setdefault(hx, "perm%s|win%d|msb%d|rev%d" % (perm, win, msb, rev))
    print("кандидатов:", len(cands))
    hits = []
    for hx, name in cands.items():
        priv = bytes.fromhex(hx)
        if addr(priv, False) == TARGET or addr(priv, True) == TARGET:
            hits.append((name, hx))
    print("совпадений:", len(hits))
    for h in hits[:5]: print("MATCH", h)
    if not hits: print("NO MATCH (H10-упаковки на recovered-секвенции)")
    # сохранить восстановленную последовательность
    json.dump({"phase": phase, "offset": c, "seq": seq, "confident": conf,
               "viterbi_cost": cost[255][q_end]},
              open(os.path.join(BASE, "data", "halv_h10_recovered_2026-10-19.json"), "w", encoding="utf-8"),
              ensure_ascii=False, indent=1)
    print("saved data/halv_h10_recovered_2026-10-19.json")

if __name__ == "__main__":
    main()
