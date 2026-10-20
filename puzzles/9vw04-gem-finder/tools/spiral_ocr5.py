# -*- coding: utf-8 -*-
"""9vw04 H10: spiral traversal orders of the 21x50 grid, then fixed-interval skip.

Pre-registered in LOG.md 2026-10-19 11:50 UTC. Oracle = WIF checksum + target pubkey.
"""
import json, os, hashlib, time
import base58
from coincurve import PublicKey

BASE = r"C:\Users\Admin\OneDrive\Desktop\master\puzzles\9vw04-gem-finder"
OUT = os.path.join(BASE, "data", "h10_spiral_result.json")
TARGET = "039d7ce87733444acfde33960964344d8201d2d92ccdad0f5045e40fdcf963475b"
B58 = set("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz")

def check(w):
    try:
        d = base58.b58decode(w)
    except Exception:
        return None
    if len(d) != 38 or d[0] != 0x80 or d[33] != 0x01:
        return None
    if hashlib.sha256(hashlib.sha256(d[:34]).digest()).digest()[:4] != d[34:]:
        return None
    try:
        return PublicKey.from_valid_secret(d[1:33]).format(compressed=True).hex()
    except Exception:
        return None

def selftest():
    pre = bytes([0x80]) + (1).to_bytes(32, "big") + b"\x01"
    tv = base58.b58encode(pre + hashlib.sha256(hashlib.sha256(pre).digest()).digest()[:4]).decode()
    assert tv == "KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjgd9M7rFU73sVHnoWn"
    assert check(tv) == "0279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798"
    bad = tv[:-1] + ("2" if tv[-1] != "2" else "3")
    assert check(bad) is None
    return tv

# direction vectors: 0=E,1=S,2=W,3=N (right turn = +1 mod 4)
DV = [(0, 1), (1, 0), (0, -1), (-1, 0)]

def spiral(R, C, corner, turn):
    starts = {(0, 0): 0, (0, C - 1): 1, (R - 1, C - 1): 2, (R - 1, 0): 3}
    r, c = corner
    d = starts[corner]
    seen = set()
    out = []
    for _ in range(R * C):
        out.append((r, c))
        seen.add((r, c))
        nr, nc = r + DV[d][0], c + DV[d][1]
        if not (0 <= nr < R and 0 <= nc < C) or (nr, nc) in seen:
            d = (d + turn) % 4
            nr, nc = r + DV[d][0], c + DV[d][1]
            if not (0 <= nr < R and 0 <= nc < C) or (nr, nc) in seen:
                # try the other way as a fallback (should not happen)
                d = (d - 2 * turn) % 4
                nr, nc = r + DV[d][0], c + DV[d][1]
        r, c = nr, nc
    assert len(out) == R * C and len(set(out)) == R * C
    return out

def main():
    tv = selftest()
    print("oracle OK", tv)
    g = json.load(open(os.path.join(BASE, "data", "grid_ocr5.json"), encoding="utf-8"))["grid"]
    R, C = len(g), len(g[0])
    assert (R, C) == (21, 50), (R, C)
    orders = {}
    for corner in [(0, 0), (0, C - 1), (R - 1, C - 1), (R - 1, 0)]:
        for turn in (1, -1):
            coords = spiral(R, C, corner, turn)
            seq = [g[r][c] for r, c in coords]
            tag = f"spiral_{corner[0]}_{corner[1]}_{'cw' if turn == 1 else 'ccw'}"
            orders[tag] = seq
            orders[tag + "_rev"] = seq[::-1]
    t0 = time.time()
    tested = 0
    valid = []
    hits = []
    for name, seq in orders.items():
        L = len(seq)
        for N in range(1, 61):
            for off in range(min(N, L)):
                sub = seq[off::N]
                if len(sub) < 52:
                    break
                for i, ch in enumerate(sub[:-51]):
                    if ch not in "KL":
                        continue
                    w = sub[i:i + 52]
                    if all(c in B58 for c in w):
                        tested += 1
                        pk = check(w)
                        if pk:
                            valid.append({"order": name, "N": N, "off": off, "i": i, "wif": w, "pub": pk})
                            if pk == TARGET:
                                hits.append({"order": name, "N": N, "off": off, "i": i, "wif": w})
    res = {"axis": "H10 spiral traversal", "grid": f"{R}x{C}", "orders": len(orders),
           "tested": tested, "valid": len(valid), "hits": hits, "wall_sec": round(time.time() - t0, 2)}
    json.dump(res, open(OUT, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print(json.dumps(res, ensure_ascii=False))

if __name__ == "__main__":
    main()
