# -*- coding: utf-8 -*-
"""Zden HALV H10 v3: суб-пиксельная верхняя кромка (50% пересечение) -> амплитуда s(x),
калибровка по 64 апексам, квантование q на решётке 93+3i, альтернативы в сомнительных
позициях, упаковки, оракул. AutoClaw, 20.10.2026."""
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

def selftest():
    one = (1).to_bytes(32, "big")
    assert addr(one, False) == "1EHNa6Q4Jz2uvNExL497mE43ikXhwF6kZm"
    assert addr(one, True) == "1BgGZ9tcN4rm9KBzDn7KprQz87SZ26SAMH"
    print("SELFTEST OK")

def sb_at(x):
    return SB[min(7, max(0, int((x - 91) // 96)))]

def main():
    selftest()
    im = Image.open(os.path.join(BASE, "data", "cryptoHALV.png")).convert("L")
    px = im.load()
    # суб-пиксельная верхняя кромка: 50%-пересечение между y_top-1 и y_top
    edge = {}
    for x in range(90, 860):
        yt = None
        for y in range(0, 475):
            if px[x, y] > T:
                yt = y; break
        if yt is None:
            edge[x] = 475.0; continue
        i1 = px[x, yt]; i0 = px[x, yt - 1] if yt > 0 else 0
        if i1 > i0:
            frac = (T - i0) / (i1 - i0)
            frac = min(1.0, max(0.0, frac))
            edge[x] = (yt - 1) + frac
        else:
            edge[x] = float(yt)
    # апексы для калибровки
    apex = []
    with open(os.path.join(G, "CANON64.tsv"), encoding="utf-8") as f:
        for r in csv.DictReader(f, delimiter="\t"):
            xc = (int(r["x1"]) + int(r["x2"])) / 2.0
            A = int(r["A"]); sb = sb_at(xc)
            q = (A - 1) / sb
            if abs(q - round(q)) < 0.2:
                apex.append((xc, int(round(q)) * sb))
    offs = {}
    for xc, lvl in apex:
        o = (475.0 - edge[int(round(xc))]) - lvl
        offs[round(o, 1)] = offs.get(round(o, 1), 0) + 1
    top_off = sorted(offs.items(), key=lambda kv: -kv[1])[:5]
    print("offset histogram (top5):", top_off)
    c = top_off[0][0]
    # фаза
    best = None
    for phase in (91, 92, 93, 94):
        res = 0.0; n = 0
        for xc, lvl in apex:
            i = int(round((xc - phase) / 3.0))
            if 0 <= i <= 255:
                x = phase + 3 * i
                q = lvl / sb_at(x)
                res += abs((475.0 - edge[x] - c) - q * sb_at(x)) / sb_at(x); n += 1
        if n and (best is None or res / n < best[0]): best = (res / n, phase, n)
    phase = best[1]
    print("lattice:", best)
    # сэмплы
    svals = [475.0 - edge[phase + 3 * i] - c for i in range(256)]
    base = []; conf = []
    for i, x in enumerate(range(phase, phase + 3 * 256, 3)):
        sb = sb_at(x)
        q = svals[i] / sb
        qr = max(0, min(3, int(round(q))))
        base.append(qr)
        conf.append(abs(q - qr) < 0.25)
    nconf = sum(conf)
    print("уверенных (|res|<0.25): %d/256" % nconf)
    print("seq:", "".join(str(q) for q in base))
    # альтернативы в неуверенных
    unc = [i for i in range(256) if not conf[i]]
    print("неуверенных:", len(unc), unc[:20])
    seqs = [base[:]]
    # ограниченно: по каждой неуверенной позиции добавим ±1 варианты, максимум 8 позиций (256 комб.)
    alt = unc[:8]
    for deltas in itertools.product([(-1,), (0,), (1,)], repeat=len(alt)):
        s = base[:]
        ok = True
        for pos, (d,) in zip(alt, deltas):
            s[pos] = base[pos] + d
            if not (0 <= s[pos] <= 3): ok = False; break
        if ok and s != base: seqs.append(s)
        if len(seqs) >= 3000: break
    print("секвенций (вкл. базу):", len(seqs))
    # упаковки: окна x 24 биекции x msb/lsb x fwd/rev + пороговые
    cands = {}
    def add(b, tag):
        if len(b) == 32:
            hx = bytes(b).hex()
            cands.setdefault(hx, tag)
    for si, seq in enumerate(seqs):
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
                        add(out, "S:%d|w%d|msb%d|r%d" % (si, win, msb, rev))
        for win in (0, 128):
            sub = seq[win:win + 128]
            for name, fn in (("q>=1", lambda q: 1 if q >= 1 else 0),
                             ("q>=2", lambda q: 1 if q >= 2 else 0),
                             ("q>=3", lambda q: 1 if q >= 3 else 0)):
                bits = [fn(q) for q in sub]
                for msb in (True, False):
                    out = bytearray()
                    for k in range(0, 128, 8):
                        v = 0
                        for bit in bits[k:k + 8]: v = (v << 1) | bit
                        out.append(v)
                    add(out, "T:%s|w%d|msb%d" % (name, win, msb))
    print("кандидатов:", len(cands))
    hits = [m for hx, m in cands.items()
            if addr(bytes.fromhex(hx), False) == TARGET or addr(bytes.fromhex(hx), True) == TARGET]
    print("совпадений:", len(hits))
    for h in hits[:5]: print("MATCH", h)
    if not hits: print("NO MATCH (суб-пиксельная кромка)")
    json.dump({"phase": phase, "offset": c, "seq": base, "confident": nconf,
               "uncertain": unc, "seqs": len(seqs), "cands": len(cands)},
              open(os.path.join(BASE, "data", "halv_h10_subpix_2026-10-20.json"), "w", encoding="utf-8"),
              ensure_ascii=False, indent=1)
    print("saved data/halv_h10_subpix_2026-10-20.json")
    # сравнение с интерполяционной секвенцией
    try:
        d2 = json.load(open(os.path.join(BASE, "data", "halv_h10_interp_2026-10-19.json"), encoding="utf-8"))
        agree = sum(1 for a, b in zip(base, d2["seq"]) if a == b)
        print("совпадение с interp-версией: %d/256" % agree)
    except Exception as e:
        print("cmp skip", e)

if __name__ == "__main__":
    main()
