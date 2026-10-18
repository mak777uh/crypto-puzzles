#!/usr/bin/env python3
"""GSMG chain4 (1151 B) — bounded interpretation scan (Qoder, 2026-10-17).

Tests deterministic readings of the decrypted chain4 output against the prize
address and the unclaimed 'third door' address. No brute force, ~10^4 checks.
"""
import hashlib, itertools, sys
from coincurve import PrivateKey

PRIZE = "1GSMG1JC9wtdSwfwApgj2xcmJPAwx7prBe"
THIRD = "1NULY7DhzuNvSDtPkFzNo6oRTZQWBqXNE9"

# known chain material (from README)
K_B1 = bytes.fromhex("44d19415009a2929a83b2f4e0da7b180d12f8b341cb879dd769ade1f8d399d40")
K_B2 = bytes.fromhex("ae27695b880aa5701df9abd8c96387cd9205a339dbf3fc5a1c6d0a8e6793438a")
K_H1 = bytes.fromhex("db9ccfe92a60ad7cc63d43391570c49585a01ade76ca09e03ad533f498831f19")
K_H2 = bytes.fromhex("16f7f9c3927894563cd14f09dc69a203d31006a6726a7b3ec42fe065b6812210")
E_C = bytes.fromhex("38d4f4c90cb45fdfc8cff50d0ed1c5")
E_S = bytes.fromhex("740a25de4b8e946d0a5ae2667a23a2")
E_B = bytes.fromhex("59cc52261c54b68193aea541ca0526")
MASK8 = bytes.fromhex("b657264f2f6e6921")

def b58check(addr):
    import base58
    return base58.b58decode_check(addr)[1:]  # h160

try:
    import base58
except Exception:
    base58 = None

def h160_from_priv(k32, compressed):
    k = int.from_bytes(k32, "big")
    if k == 0 or k >= 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141:
        return None
    pub = PrivateKey(k32).public_key.format(compressed=compressed)
    return hashlib.new("ripemd160", hashlib.sha256(pub).digest()).digest()

targets = {}
if base58:
    targets[b58check(PRIZE)] = "prize"
    targets[b58check(THIRD)] = "third"
else:
    # fallback: compute addresses ourselves
    pass

def addr_p2pkh(h):
    import base58
    return base58.b58encode_check(b"\x00" + h).decode()

hits = []
checked = 0
seen = set()

def check(k32, tag, compressed=True):
    global checked
    if not isinstance(k32, (bytes, bytearray)) or len(k32) != 32:
        return
    k32 = bytes(k32)
    if k32 in seen:
        return
    seen.add(k32)
    for comp in ((True, False) if compressed else (compressed,)):
        h = h160_from_priv(k32, comp)
        checked += 1
        if h is not None and h in targets:
            hits.append((tag, comp, k32.hex(), targets[h]))

def xorb(a, b):
    if len(a) != len(b):
        return None
    return bytes(x ^ y for x, y in zip(a, b))

data = open(sys.argv[1] if len(sys.argv) > 1 else "chain4_1151.bin", "rb").read()
n = len(data)
print("len", n, "sha256", hashlib.sha256(data).hexdigest())

# 1. every offset, both endiannesses, direct key
for off in range(n - 31):
    w = data[off:off+32]
    check(w, f"direct[{off}]")
    check(w[::-1], f"rev[{off}]")

# 2. byte transforms of whole data, hashed to 32 bytes
def transforms(b):
    yield "sha256", hashlib.sha256(b).digest()
    yield "sha256d", hashlib.sha256(hashlib.sha256(b).digest()).digest()
    yield "sha512[:32]", hashlib.sha512(b).digest()[:32]
    yield "sha512[-32:]", hashlib.sha512(b).digest()[-32:]
    yield "sha3_256", hashlib.sha3_256(b).digest()
    yield "keccak", hashlib.sha3_256(b).digest()  # placeholder
    yield "blake2b", hashlib.blake2b(b, digest_size=32).digest()
    yield "blake2s", hashlib.blake2s(b).digest()
    yield "ripemd160x2", hashlib.new("ripemd160", hashlib.sha256(b).digest()).digest() + b"\x00"*12
    for name, m in (("rev", b[::-1]), ("bitrev", bytes(int(f"{x:08b}"[::-1], 2) for x in b)),
                    ("nibble", bytes((x >> 4) | ((x & 15) << 4) for x in b)),
                    ("not", bytes(x ^ 0xff for x in b))):
        yield f"sha256_{name}", hashlib.sha256(m).digest()
        yield f"sha256d_{name}", hashlib.sha256(hashlib.sha256(m).digest()).digest()

for tag, k in transforms(data):
    check(k, tag)

# 3. XOR whole-data windows / blocks with known keys, then hash or direct
for name, key in (("K_B1", K_B1), ("K_B2", K_B2), ("K_H1", K_H1), ("K_H2", K_H2)):
    x = bytes(c ^ key[i % 32] for i, c in enumerate(data))
    check(x[:32], f"xor_{name}_head")
    check(hashlib.sha256(x).digest(), f"sha256_xor_{name}")
    for off in (0, 32, 64, 96, 128, n-32):
        if 0 <= off <= n-32:
            check(x[off:off+32], f"xor_{name}[{off}]")

# 4. block structure: 32-byte blocks, 16-byte pairs, 64-byte blocks
for bs in (16, 32, 64):
    for off in range(0, n - bs + 1, bs):
        blk = data[off:off+bs]
        check(hashlib.sha256(blk).digest(), f"sha256_blk{bs}[{off}]")
        if bs >= 32:
            check(blk[:32], f"blk{bs}[{off}]")

# 5. interleave / deinterleave even-odd bytes
ev = data[0::2]; od = data[1::2]
for tag, b in (("even", ev), ("odd", od), ("evod", ev+od), ("odev", od+ev)):
    check(hashlib.sha256(b).digest(), f"{tag}_sha256")
    if len(b) >= 32:
        check(b[:32], f"{tag}_head")

# 6. ascii/base64 hypotheses
import re
for enc in ("ascii",):
    pass
# try base64 / base85 decode of data if it were text (it's not), skip.

print("checked derivations:", checked, "unique keys:", len(seen))
print("HITS:", hits)
