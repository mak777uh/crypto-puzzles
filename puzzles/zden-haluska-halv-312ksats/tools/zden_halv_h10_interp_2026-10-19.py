# -*- coding: utf-8 -*-
"""Zden HALV H10 v2: кусочно-линейная интерполяция амплитуды по 157 вершинам benjacasas,
якоря апексов CANON64, квантование в q на решётке x=93+3i, перечисление альтернатив в
неуверенных позициях, упаковки A3-стиля, оракул. AutoClaw, 19.10.2026."""
import json, os, csv, itertools, hashlib
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

def selftest():
    one = (1).to_bytes(32, "big")
    assert addr(one, False) == "1EHNa6Q4Jz2uvNExL497mE43ikXhwF6kZm"
    assert addr(one, True) == "1BgGZ9tcN4rm9KBzDn7KprQz87SZ26SAMH"
    print("SELFTEST OK")

def sb_at(x):
    return SB[min(7, max(0, int((x - 91) // 96)))]

def main():
    selftest()
    vs = json.load(open(os.path.join(G, "vertices.json"), encoding="utf-8"))
    verts = sorted([(v[0], v[1]) for v in vs])  # (x, amplitude_px)
    # якоря апексов: позиция и точный q
    apex = []
    with open(os.path.join(G, "CANON64.tsv"), encoding="utf-8") as f:
        for r in csv.DictReader(f, delimiter="\t"):
            xc = (int(r["x1"]) + int(r["x2"])) / 2.0
            A = int(r["A"]); sb = sb_at(xc)
            q = (A - 1) / sb
            apex.append((xc, A - 1, q if abs(q - round(q)) < 0.2 else None))
    # амплитудная функция: кусочно-линейная по вершинам, на краях — константа
    def amp(x):
        if x <= verts[0][0]: return verts[0][1]
        if x >= verts[-1][0]: return verts[-1][1]
        for t in range(len(verts) - 1):
            x0, a0 = verts[t]; x1, a1 = verts[t + 1]
            if x0 <= x <= x1:
                if x1 == x0: return a1
                return a0 + (a1 - a0) * (x - x0) / (x1 - x0)
        return verts[-1][1]

    PHASE = 93
    xs = [PHASE + 3 * i for i in range(256)]
    base = []
    resid = []
    for x in xs:
        a = amp(x); b = min(7, max(0, int((x - 91) // 96)))
        q = a / SB[b]
        if q > 3.4 and b > 0:
            q2 = a / SB[b - 1]
            if abs(q2 - round(q2)) < abs(q - round(q)):
                b -= 1; q = q2
        qr = int(round(q))
        qr = 0 if qr < 0 else (3 if qr > 3 else qr)
        base.append(qr)
        sb_est = (a / qr) if qr > 0 else SB[b]
        resid.append(abs(a - qr * sb_est) / max(1.0, sb_est))
    # якорные переопределения
    anchor = {}
    for xc, Alvl, q in apex:
        if q is None: continue
        i = int(round((xc - PHASE) / 3.0))
        if 0 <= i <= 255: anchor[i] = int(round(q))
    for x, a, m, sb, q in vs:
        rq = round(q)
        if abs(q - rq) < 0.2 and 0 <= rq <= 3:
            i = int(round((x - PHASE) / 3.0))
            if 0 <= i <= 255: anchor[i] = int(rq)
    n_anchor = len(anchor)
    for i, q in anchor.items():
        base[i] = q
    hi = [i for i in range(256) if resid[i] > 0.3 and i not in anchor]
    print("якорей: %d; неуверенных (residual>0.3): %d" % (n_anchor, len(hi)))
    print("base seq:", "".join(str(q) for q in base))
    # перечисление альтернатив: в неуверенных позициях q±1; произведение капим 20000
    alt_positions = hi[:12]
    combos = []
    for deltas in itertools.product([(-1,), (0,), (1,)], repeat=len(alt_positions)):
        s = base[:]
        ok = True
        for pos, (d,) in zip(alt_positions, deltas):
            s[pos] = base[pos] + d
            if not (0 <= s[pos] <= 3): ok = False; break
        if ok: combos.append(s)
        if len(combos) >= 20000: break
    print("комбинаций базовых секвенций:", len(combos))
    if not combos: combos = [base]
    # упаковки
    cands = {}
    for si, seq in enumerate(combos):
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
                            it = s2[k:k+4] if msb else s2[k:k+4][::-1]
                            for q in it: v = (v << 2) | mp(q)
                            out.append(v)
                        hx = bytes(out).hex()
                        if hx not in cands:
                            cands[hx] = (si, win, msb, rev, perm)
        if len(cands) > 900000: break
    print("кандидатов:", len(cands))
    hits = []
    for hx, meta in cands.items():
        priv = bytes.fromhex(hx)
        if addr(priv, False) == TARGET or addr(priv, True) == TARGET:
            hits.append((meta, hx))
    print("совпадений:", len(hits))
    for h in hits[:5]: print("MATCH", h)
    if not hits: print("NO MATCH (интерполяция по вершинам + альтернативы)")
    json.dump({"phase": PHASE, "seq": base, "resid_gt03": hi, "anchors": n_anchor,
               "combos": len(combos), "cands": len(cands)},
              open(os.path.join(BASE, "data", "halv_h10_interp_2026-10-19.json"), "w", encoding="utf-8"),
              ensure_ascii=False, indent=1)
    print("saved data/halv_h10_interp_2026-10-19.json")

if __name__ == "__main__":
    main()
