#!/usr/bin/env python3
"""H14 stage 2: scalars from the restored 80 colored pairs (G/M blue, N lavender, O grey)."""
import json, hashlib, itertools
from coincurve import PublicKey

TARGET_PUB = "039d7ce87733444acfde33960964344d8201d2d92ccdad0f5045e40fdcf963475b"
N = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141
WIF1 = "KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjgd9M7rFU73sVHnoWn"

def pub(d):
    if not (1 <= d < N): return None
    return PublicKey.from_secret(d.to_bytes(32, "big")).format(compressed=True).hex()

def sha(x): return hashlib.sha256(x).digest()
def sha256d(x): return sha(sha(x))

def scalars():
    pairs = json.load(open("data/h14_pairs.json", encoding="utf-8"))["pairs"]
    grid = [[None]*25 for _ in range(21)]          # pair grid 21x25
    for r, c, L, D, lc, dc in pairs:
        grid[r][c//2] = (L, D, lc, dc)
    flat = [grid[r][i] for r in range(21) for i in range(25)]
    colmajor = [grid[r][i] for i in range(25) for r in range(21)]
    out = {}
    def add(tag, s):
        out[tag] = s
    for name, seq in (("rm", flat), ("cm", colmajor)):
        D80 = "".join(p[1] for p in seq if p[2] != "white")
        add(f"{name}_D80", D80)
        P80 = "".join(p[0]+p[1] for p in seq if p[2] != "white")
        add(f"{name}_P80", P80)
        add(f"{name}_L80", "".join(p[0] for p in seq if p[2] != "white"))
    D80 = out["rm_D80"]
    add("rm_D80_rev", D80[::-1])
    blocks = {L: "".join(p[1] for p in flat if p[0] == L) for L in "GMNO"}
    for perm in itertools.permutations("GMNO"):
        add("perm_" + "".join(perm), "".join(blocks[x] for x in perm))
    coords = "".join(f"{i:03d}" for i, p in enumerate(flat) if p[2] != "white")
    add("coords", coords)
    return out, D80

def main():
    base = int.from_bytes(sha(WIF1.encode()), "big")  # placeholder, replaced by wif check below
    # self-test
    import base58
    assert base58.b58decode_check(WIF1)[0] == 0x80
    assert pub(int.from_bytes(base58.b58decode_check(WIF1)[1:33], "big")) == pub(1)
    print("selftest OK")
    streams, D80 = scalars()
    tested = hits = 0
    def test(tag, d):
        nonlocal tested, hits
        if d is None: return
        tested += 1
        if 1 <= d < N and pub(d) == TARGET_PUB:
            hits += 1; print("HIT", tag)
    for tag, s in streams.items():
        if not s: continue
        if s.isdigit():
            v = int(s)
            test(tag + "_dec", v % N)
            test(tag + "_dec_lt", v if v < N else None)
            for ln in (77, 78, 51, 52):
                if len(s) >= ln:
                    test(f"{tag}_first{ln}", int(s[:ln]) % N)
                    test(f"{tag}_last{ln}", int(s[-ln:]) % N)
            b = bytes.fromhex(s[:64]) if len(s) >= 64 else None
            if b and len(b) == 32: test(tag + "_hex32a", int.from_bytes(b, "big") % N)
            if len(s) >= 64: test(tag + "_hex32b", int.from_bytes(bytes.fromhex(s[-64:]), "big") % N)
        for h, hn in ((sha, "sha256"), (sha256d, "sha256d")):
            test(f"{tag}_{hn}", int.from_bytes(h(s.encode()), "big") % N)
            test(f"{tag}_{hn}_sp", int.from_bytes(h(" ".join(s).encode()), "big") % N)
        test(tag + "_b58", int.from_bytes(hashlib.sha256(s.encode()).digest(), "big") % N if False else None)
    # WIF-window branches impossible by construction: colored letters are only G/M/N/O (no K/L prefix)
    print("tested", tested, "hits", hits)
    print("D80", D80)
    print("streams", len(streams))
    json.dump({"tested": tested, "hits": hits, "D80": D80}, open("data/h14_result.json", "w"))

if __name__ == "__main__":
    main()
