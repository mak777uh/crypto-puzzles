# -*- coding: utf-8 -*-
"""Zden HALV: три схемы «измерение -> байт» (LVL5-грамматика, пороговые биты, ниббл на лопасть).
Данные: CANON64.tsv (64 лопасти, валидировано 59/59), areas64.json, наша 256-ячеечная модель.
Оракул: P2PKH compressed+uncompressed -> 1crypto24HCr178iMcKd5iUi5D4rsg1nK.
AutoClaw, 19.10.2026. Бюджет: <=1000 кандидатов, офлайн."""
import json, os, itertools, hashlib
import base58
from coincurve import PrivateKey

BASE = r"C:\Users\Admin\OneDrive\Desktop\master\puzzles\zden-haluska-halv-312ksats"
TARGET = "1crypto24HCr178iMcKd5iUi5D4rsg1nK"

def addr(priv32, compressed):
    pk = PrivateKey(priv32)
    pub = pk.public_key.format(compressed=compressed)
    h = hashlib.new("ripemd160", hashlib.sha256(pub).digest()).digest()
    return base58.b58encode_check(b"\x00" + h).decode()

def selftest():
    one = (1).to_bytes(32, "big")
    assert addr(one, False) == "1EHNa6Q4Jz2uvNExL497mE43ikXhwF6kZm", addr(one, False)
    assert addr(one, True) == "1BgGZ9tcN4rm9KBzDn7KprQz87SZ26SAMH", addr(one, True)
    print("SELFTEST OK (pipeline)")

def load():
    lob = []
    p = os.path.join(BASE, "data", "github", "benjacasas02__independent-cryptography-research",
                     "files", "research", "zden-halv", "artifacts", "data", "CANON64.tsv")
    with open(p, encoding="utf-8") as f:
        next(f)
        for line in f:
            parts = line.rstrip("\n").split("\t")
            if len(parts) < 9: continue
            i, x1, x2, w, A, u, k, j, forma = parts[:9]
            lob.append({"i": int(i), "w": int(w), "A": int(A), "u": int(u), "k": int(k),
                        "j": int(j), "O": forma.strip() == "O"})
    areas = {}
    pa = os.path.join(BASE, "data", "github", "benjacasas02__independent-cryptography-research",
                      "files", "research", "zden-halv", "artifacts", "data", "areas64.json")
    for rec in json.load(open(pa, encoding="utf-8")):
        areas[rec["i"]] = rec
    m = json.load(open(os.path.join(BASE, "data", "halv_wave_model_2026-10-18.json"), encoding="utf-8"))
    levels = [int(x) for x in m["cells_3px"]["levels"]]
    return lob, areas, levels

def bits_to_bytes(bits, msb_first=True):
    out = bytearray()
    for i in range(0, len(bits) - 7, 8):
        chunk = bits[i:i+8]
        if msb_first:
            v = 0
            for b in chunk: v = (v << 1) | b
        else:
            v = 0
            for b in reversed(chunk): v = (v << 1) | b
        out.append(v)
    return bytes(out)

def main():
    selftest()
    lob, areas, levels = load()
    assert len(lob) == 64 and len(levels) == 256, (len(lob), len(levels))

    cands = {}

    def add(name, seq):
        seq = bytes(seq)
        if len(seq) != 32: return
        hx = seq.hex()
        cands.setdefault(hx, name)

    # ---------- S1: LVL5-грамматика на измерениях лопастей ----------
    def meas(name, fn):
        vals = [fn(l) for l in lob]
        for pair_mode in ("consec", "halves"):
            if pair_mode == "consec":
                pairs = [(vals[2*i], vals[2*i+1]) for i in range(32)]
            else:
                pairs = [(vals[i], vals[i+32]) for i in range(32)]
            for op in ("sum", "xor"):
                b = [((a + c) % 256 if op == "sum" else (a ^ c)) for a, c in pairs]
                add("%s|%s|%s|fwd" % (name, pair_mode, op), b)
                add("%s|%s|%s|rev" % (name, pair_mode, op), list(reversed(b)))
                add("%s|%s|%s|revpairs" % (name, pair_mode, op),
                    [((vals[2*i+1] + vals[2*i]) % 256 if op == "sum" else (vals[2*i+1] ^ vals[2*i])) for i in range(32)])

    meas("A", lambda l: l["A"] & 0xFF)
    meas("w", lambda l: l["w"])
    meas("j", lambda l: l["j"])
    meas("formula", lambda l: ((10*l["w"] + l["A"] - 1) // 64) & 0xFF)
    meas("formulaR", lambda l: round((10*l["w"] + l["A"] - 1) / 64) & 0xFF)
    meas("ink", lambda l: areas[l["i"]]["ink"] & 0xFF)
    meas("outer", lambda l: areas[l["i"]]["outer"] & 0xFF)
    meas("shell", lambda l: areas[l["i"]]["shell"] & 0xFF)
    meas("wA", lambda l: (l["w"] * l["A"]) & 0xFF)

    # ---------- S2: пороговые биты уровней (256 ячеек -> 256 бит) ----------
    maps = []
    for t in (1, 2, 3):
        maps.append(("q>=%d" % t, lambda q, t=t: 1 if q >= t else 0))
        maps.append(("q<=%d" % (t-1), lambda q, t=t: 1 if q <= t-1 else 0))
    for t in (0, 1, 2, 3):
        maps.append(("q==%d" % t, lambda q, t=t: 1 if q == t else 0))
    maps.append(("q&1", lambda q: q & 1))
    for name, fn in maps:
        for inv in (False, True):
            bits = [1 - fn(q) if inv else fn(q) for q in levels]
            for msb in (True, False):
                b = bits_to_bytes(bits, msb)
                add("S2:%s%s|msb%d|fwd" % (name, "!" if inv else "", msb), b)
                add("S2:%s%s|msb%d|rev" % (name, "!" if inv else "", msb), b[::-1])

    # ---------- S3: ниббл на лопасть (64 ниббла = 32 байта) ----------
    nib_variants = {
        "j": [l["j"] for l in lob],
        "15-j": [15 - l["j"] for l in lob],
        "j+1": [(l["j"] + 1) & 15 for l in lob],
        "j|shape": [(l["j"] & 7) | (8 if l["O"] else 0) for l in lob],
        "shape|j": [(8 if l["O"] else 0) | (l["j"] & 7) for l in lob],
    }
    for name, nib in nib_variants.items():
        for order in ("hi-lo", "lo-hi"):
            b = []
            for k in range(32):
                a, c = nib[2*k], nib[2*k+1]
                b.append((a << 4 | c) if order == "hi-lo" else (c << 4 | a))
            add("S3:%s|%s|fwd" % (name, order), b)
            add("S3:%s|%s|rev" % (name, order), list(reversed(b)))

    # ---------- проверка ----------
    hits = []
    for hx, name in cands.items():
        priv = bytes.fromhex(hx)
        if addr(priv, False) == TARGET or addr(priv, True) == TARGET:
            hits.append((name, hx))
    print("уникальных кандидатов:", len(cands))
    print("совпадений:", len(hits))
    for name, hx in hits[:5]:
        print("MATCH", name, hx)
    if not hits:
        print("NO MATCH во всех трёх схемах")

if __name__ == "__main__":
    main()
