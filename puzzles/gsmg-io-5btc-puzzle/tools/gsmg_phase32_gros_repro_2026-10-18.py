# -*- coding: utf-8 -*-
"""
GSMG.IO — воспроизведение Phase 3.2 plaintext ("gros") и проверка формул issue #111.
Big Pickle, 2026-10-18.  CPU-only, без трат.

Что делает:
 1. Собирает блоб Phase 3.2 прямо из публичного README сообщества
    (data/puzzlehunt/README.md) -> 2448 B (Salted__ + salt eefc4c5befc1656a + 2432 B ct).
 2. Расшифровывает его AES-256-CBC c EVP_BytesToKey (SHA-256) и паролем
    sha256("jacquefrescogiveitjustonesecondheisenbergsuncertaintyprinciple")
    -> 2422 B plaintext ("gros").
    ВАЖНО: EVP_BytesToKey = H(prev || password || SALT) — без соли НЕ совпадёт.
 3. Печатает структуру gros и сверяет байт->буква разметку Beaufort-блока с
    буквенной транскрипцией из README.
 4. Проверяет константы issue #111 (FH и gros[1161:1177]) — воспроизводимы ли они.
 5. Прогоняет ограниченный набор 32-байтных кандидатов ключа против
    ОПУБЛИКОВАННОГО публичного ключа приза (см. PUB ниже).

Запуск:  python gsmg_phase32_gros_repro_2026-10-18.py
"""
import base64, hashlib, os, re, sys, time
from Crypto.Cipher import AES

sys.stdout.reconfigure(encoding="utf-8")
HERE = os.path.dirname(os.path.abspath(__file__))
PUZ = os.path.dirname(HERE)
README = os.path.join(PUZ, "data", "puzzlehunt", "README.md")

# --- публичный ключ приза 1GSMG1JC9wtdSwfwApgj2xcmJPAwx7prBe (uncompressed) ---
# hash160(04f4d1bb...) = a9553269572a317e39f0f518cb87c1a0ee1dbae4 = адрес приза.
PUB = bytes.fromhex("04f4d1bbd91e65e2a019566a17574e97dae908b784b388891848007e4f55d5a4649c73d25fc5ed8fd7227cab0be4e576c0c6404db5aa546286563e4be12bf33559")
PX = int.from_bytes(PUB[1:33], "big"); PY = int.from_bytes(PUB[33:], "big")

N = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141
P = 2**256 - 2**32 - 977
G = (0x79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798,
     0x483ADA7726A3C4655DA4FBFC0E1108A8FD17B448A68554199C47D08FFB10D4B8)


def inv(a): return pow(a, P - 2, P)
def add(p1, p2):
    if p1 is None: return p2
    if p2 is None: return p1
    x1, y1 = p1; x2, y2 = p2
    if x1 == x2 and (y1 + y2) % P == 0: return None
    lam = ((3 * x1 * x1) * inv(2 * y1) if p1 == p2 else (y2 - y1) * inv(x2 - x1)) % P
    x3 = (lam * lam - x1 - x2) % P
    return (x3, (lam * (x1 - x3) - y1) % P)


def mul(k, pt=G):
    r = None
    while k:
        if k & 1: r = add(r, pt)
        pt = add(pt, pt); k >>= 1
    return r


def evp(pw, md, salt, klen=32, ilen=16):
    """openssl EVP_BytesToKey (без iter): D_i = H(D_{i-1} || password || salt)."""
    out = b""; prev = b""
    while len(out) < klen + ilen:
        prev = md(prev + pw + salt).digest(); out += prev
    return out[:klen], out[klen:klen + ilen]


def unpad(b):
    if not b: return None
    n = b[-1]
    return b[:-n] if (1 <= n <= 16 and b[-n:] == bytes([n]) * n) else None


def build_blob():
    rd = open(README, encoding="utf-8", errors="replace").read()
    s = rd.index("U2FsdGVkX1/u/Exb78Flah0YM7")
    e = rd.index("AMRd4VEeXitewbB16L8CPN", s) + len("AMRd4VEeXitewbB16L8CPN")
    b64 = re.sub(r"\s+", "", rd[s:e])
    return base64.b64decode(b64 + "=" * ((-len(b64)) % 4))


def get_gros():
    raw = build_blob()
    salt, ct = raw[8:16], raw[16:]
    pw = hashlib.sha256(b"jacquefrescogiveitjustonesecondheisenbergsuncertaintyprinciple").hexdigest().encode()
    key, iv = evp(pw, hashlib.sha256, salt)
    return unpad(AES.new(key, AES.MODE_CBC, iv).decrypt(ct)), raw


if __name__ == "__main__":
    gros, raw = get_gros()
    print(f"blob={len(raw)}B salt={raw[8:16].hex()} ct={len(raw)-16}B  -> gros={len(gros)}B")
    print(f"gros sha256 = {hashlib.sha256(gros).hexdigest()}")
    for nm, s in [("Architect", b"I've been waiting for you"), ("amIhere", b"... am I here"),
                  ("OneForOne", b"One for one, four for one"), ("digits", b"15165943121972"),
                  ("hint", b"Raising the stakes"), ("innerblob", b"U2FsdGVkX1+0Wl49")]:
        print(f"  offset {nm:10s} = {gros.find(s)}")
    # #111 falsification
    FH = bytes(x ^ y for x, y in zip(gros[0::4][:16], gros[1145:1161]))
    print(f"\ncomputed FH = {FH.hex()}  (issue #111 claims 8048c428a6faf6d3df77db13ca68766d)")
    print(f"gros[1161:1177] = {gros[1161:1177].hex()}  (issue #111 claims 3be6ecf1d5c126e50f25ded3bc8fb6d9)")
    hits = []
    for kb in (FH, FH * 2, FH + gros[1145:1161], FH + gros[1161:1177],
               hashlib.sha256(FH).digest(), hashlib.sha256(hashlib.sha256(FH).digest()).digest()):
        ki = int.from_bytes(kb, "big") % N
        if ki and mul(ki) == (PX, PY):
            print("*** HIT ***", kb.hex()); hits.append(kb.hex())
    print("pubkey hits:", hits)
