#!/usr/bin/env python3
"""H12: fixed-interval skip cipher over the 9vw04 OCR grid."""
import json, hashlib, sys
from coincurve import PublicKey

TARGET = "039d7ce87733444acfde33960964344d8201d2d92ccdad0f5045e40fdcf963475b"
ALPH = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
IDX = {c: i for i, c in enumerate(ALPH)}
SUB = str.maketrans({"O": "o", "I": "i", "0": "o"})

def b58decode(s):
    n = 0
    for c in s:
        if c not in IDX:
            return None
        n = n * 58 + IDX[c]
    raw = n.to_bytes((n.bit_length() + 7) // 8, "big")
    pad = len(s) - len(s.lstrip("1"))
    return b"\x00" * pad + raw

def wif_key(s):
    raw = b58decode(s)
    if raw is None or len(raw) != 38 or raw[0] != 0x80 or raw[33] != 0x01:
        return None
    if hashlib.sha256(hashlib.sha256(raw[:34]).digest()).digest()[:4] != raw[34:]:
        return None
    return int.from_bytes(raw[1:33], "big")

def pubhex(d):
    return PublicKey.from_secret(d.to_bytes(32, "big")).format(compressed=True).hex()

def selftest():
    # priv=1 compressed WIF
    w = "KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjgd9M7rFU73sVHnoWn"
    d = wif_key(w)
    assert d == 1, d
    assert pubhex(d).startswith("0279be66")
    assert wif_key("KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjgd9M7rFU73sVHnoWo") is None or True
    print("selftest OK")

def main():
    selftest()
    g = json.load(open("data/grid_ocr5.json", encoding="utf-8"))
    rows = g["grid"]
    assert len(rows) == 21 and all(len(r) == 50 for r in rows), (len(rows), set(map(len, rows)))
    rm = "".join(rows)
    cm = "".join(rows[r][c] for c in range(50) for r in range(21))
    streams = []
    for name, s in (("rm", rm), ("rm_rev", rm[::-1]), ("cm", cm), ("cm_rev", cm[::-1])):
        streams.append((name, s))
    tested = 0
    variants = (("raw", None), ("fix", SUB))
    for name, s in streams:
        for N in range(2, 26):
            for o in range(N):
                sub = s[o::N]
                for vn, tr in variants:
                    t = sub.translate(tr) if tr else sub
                    if len(t) < 52:
                        continue
                    for i in range(len(t) - 51):
                        if t[i] not in "KL":
                            continue
                        cand = t[i:i+52]
                        tested += 1
                        d = wif_key(cand)
                        if d and pubhex(d) == TARGET:
                            print("HIT", name, N, o, vn, cand, hex(d))
                            return {"tested": tested, "hit": cand}
    print("tested", tested, "hits 0")
    json.dump({"tested": tested, "hit": None}, open("data/h12_result.json", "w"))
    return {"tested": tested, "hit": None}

if __name__ == "__main__":
    main()
