# -*- coding: utf-8 -*-
"""GSMG: комплексное закрытие оси «ЛИТЕРАЛЫ создателя как пароль» по ТРЁМ запертым контейнерам.

Прер-регистрация: puzzles/gsmg-io-5btc-puzzle/LOG.md (запись ДО прогона).
Ось: все конкатенации 13 литералов создателя (страница SalPhaseIon + road-map msg 8446),
длины 1..4, повторы, разделитель ""/" ", кодировки пароля {raw, sha256hex}, KDF {md5, sha256},
блобы salph_inner / p32_trailing / cosmic. Калибровка шума встроена.
Контроль: опубликованный литерал-цепочка-1 -> sha256(unpad) == 1449a217...26bf (md5, SP).
Только чтение. Ничего в пазле не меняется.
"""
import base64
import hashlib
import itertools
import os
import sys
import time

sys.stdout.reconfigure(encoding="utf-8")
T0 = time.time()

DUMP = r"C:\Users\Admin\AppData\Local\Temp\opencode\gsmg-enrich\tn_dump\reference\artifacts\envelopes"


def load(fn, want):
    with open(os.path.join(DUMP, fn), "r", encoding="utf-8") as f:
        b64 = "".join(f.read().split())
    raw = base64.b64decode(b64)
    assert raw[:8] == b"Salted__", fn
    salt, ct = raw[8:16], raw[16:]
    assert salt.hex() == want, (fn, salt.hex())
    return salt, ct


BLOBS = {
    "SP": load("salph_inner.b64.txt", "3ab585348552415d"),
    "P32": load("p32_trailing.b64.txt", "b45a5e3d827593ca"),
    "COSMIC": load("cosmic.b64.txt", "2d3f6fe06dc950e6"),
}
for k, (s, c) in BLOBS.items():
    print("%-6s salt=%s ct=%d B (blocks=%d)" % (k, s.hex(), len(c), len(c) // 16))

from Crypto.Cipher import AES

N = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141
H160 = "a9553269572a317e39f0f518cb87c1a0ee1dbae4"
P_ = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F
Gx = 0x79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798
Gy = 0x483ADA7726A3C4655DA4FBFC0E1108A8FD17B448A68554199C47D08FFB10D4B8


def _inv(a, n):
    return pow(a, n - 2, n)


def _add(p1, p2):
    if p1 is None:
        return p2
    if p2 is None:
        return p1
    x1, y1 = p1
    x2, y2 = p2
    if x1 == x2 and (y1 + y2) % P_ == 0:
        return None
    lam = ((3 * x1 * x1) * _inv(2 * y1, P_) if p1 == p2 else (y2 - y1) * _inv(x2 - x1, P_)) % P_
    x3 = (lam * lam - x1 - x2) % P_
    return (x3, (lam * (x1 - x3) - y1) % P_)


def _mul(k, pt=(Gx, Gy)):
    r = None
    while k:
        if k & 1:
            r = _add(r, pt)
        pt = _add(pt, pt)
        k >>= 1
    return r


def hash160_pub(k):
    pt = _mul(k % N)
    if pt is None:
        return None
    pubu = b"\x04" + pt[0].to_bytes(32, "big") + pt[1].to_bytes(32, "big")
    return hashlib.new("ripemd160", hashlib.sha256(pubu).digest()).hexdigest()


def evp(pw, salt, md):
    d, prev = b"", b""
    while len(d) < 48:
        prev = hashlib.new(md, prev + pw + salt).digest()
        d += prev
    return d[:32], d[32:48]


def padlen(b):
    n = b[-1]
    return n if 1 <= n <= 16 and b[-n:] == bytes([n]) * n else 0


def dec(blob, pw, md):
    salt, ct = blob
    key, iv = evp(pw, salt, md)
    pt = AES.new(key, AES.MODE_CBC, iv).decrypt(ct)
    return pt, padlen(pt)


# ---------- контроль ----------
KNOWN = b"matrixsumlistenterlastwordsbeforearchichoicethispasswordmatrixsumlist"
_kp, _kpad = dec(BLOBS["SP"], KNOWN, "md5")
_ksha = hashlib.sha256(_kp[:len(_kp) - _kpad]).hexdigest()
print("CTRL chain-1 (md5, SP): pad=%d sha256=%s -> %s" % (
    _kpad, _ksha, "OK" if _ksha.startswith("1449a217") else "!!! FAIL !!!"))

TOKS = [b"matrixsumlist", b"enter", b"lastwordsbeforearchichoice", b"thispassword",
        b"ourfirsthintisyourlastcommand", b"yellowblueprimes", b"yinyang", b"shabef",
        b"causality", b"theone", b"secondanswer", b"yourlastcommand", b"btcseed"]
seqs = []
for k in range(1, 5):
    for combo in itertools.product(TOKS, repeat=k):
        seqs.append(b"".join(combo))
        seqs.append(b" ".join(combo))
seqs = list(dict.fromkeys(seqs))
print("последовательностей:", len(seqs))

pads = []
prize = []
tests = 0
for bn, blob in BLOBS.items():
    for cand in seqs:
        for enc, pwb in (("raw", cand), ("sha256hex", hashlib.sha256(cand).hexdigest().encode())):
            for md in ("md5", "sha256"):
                tests += 1
                pt, n = dec(blob, pwb, md)
                if n:
                    pr = sum(1 for b in pt if 32 <= b < 127) / len(pt)
                    body = pt[:len(pt) - n]
                    pads.append((bn, enc, md, cand, n, len(body), hashlib.sha256(pt).hexdigest(),
                                 pr, hashlib.sha256(body).hexdigest()))
                    if len(body) == 32 or len(pt) == 32:
                        k = int.from_bytes(body if len(body) == 32 else pt, "big")
                        if 0 < k < N and hash160_pub(k) == H160:
                            prize.append((bn, enc, md, k.to_bytes(32, "big").hex()))

print("тестов: %d  valid-padding: %d  elapsed %.1fs" % (tests, len(pads), time.time() - T0))
exp = (len(seqs) * 2 * 2)  # тестов на (блоб,kdf)-пару
print("ожидаемый шум: SP/P32 ~%.0f каждый, COSMIC ~%.0f  (1/243 и 1/256)" % (
    exp / 243.0, exp / 256.0))

strong = [p for p in pads if p[4] > 1]
print("\nпаддингов >1 байта: %d" % len(strong))
for p in sorted(strong, key=lambda x: (-x[4], -x[7]))[:12]:
    print("   %-6s %-9s %-6s pad=%-2d len=%-3d pr=%.2f sha=%s cand=%.46r" % (
        p[0], p[1], p[2], p[4], p[5], p[7], p[8][:12], p[3]))

print("\nтоп-10 по печатаемости:")
for p in sorted(pads, key=lambda x: -x[7])[:10]:
    print("   %-6s %-9s %-6s pad=%-2d len=%-3d pr=%.2f sha=%s cand=%.46r" % (
        p[0], p[1], p[2], p[4], p[5], p[7], p[8][:12], p[3]))
print("валидных паддингов с printable>=0.85:", len([p for p in pads if p[7] >= 0.85]))
print("призовых ключей:", len(prize))

# ============ этап 2: семейство XOR дайджестов (конструкция сообщества для cosmic) ============
distinct = list(dict.fromkeys(TOKS))
SETB = [b"matrixsumlist", b"enter", b"lastwordsbeforearchichoice", b"thispassword",
        b"matrixsumlist", b"yourlastcommand", b"secondanswer"]
_x = b"\x00" * 32
for t in SETB:
    _x = bytes(a ^ b for a, b in zip(_x, hashlib.sha256(t).digest()))
print("\nCTRL cosmic SetB XOR key = %s -> %s" % (
    _x.hex()[:16], "OK" if _x.hex().startswith("a795de117e472590") else "FAIL"))
_pt, _n = dec(BLOBS["COSMIC"], _x, "md5")
_body = _pt[:len(_pt) - _n]
_ph = hashlib.sha256(_body).hexdigest()
_pr = sum(1 for b in _body if 32 <= b < 127) / len(_body)
print("CTRL cosmic SetB raw+md5: pad=%d len=%d pr=%.3f sha256(body)=%s -> %s" % (
    _n, len(_body), _pr, _ph[:16], "OK" if _ph.startswith("4f7a1e4e") else "FAIL"))

xt, xpads, xprize = 0, [], []
for r in range(1, len(distinct) + 1):
    for combo in itertools.combinations(distinct, r):
        k = b"\x00" * 32
        for t in combo:
            k = bytes(a ^ b for a, b in zip(k, hashlib.sha256(t).digest()))
        for enc, pwb in (("xor32", k), ("xorhex", k.hex().encode())):
            for md in ("md5", "sha256"):
                for bn in ("COSMIC", "SP", "P32"):
                    xt += 1
                    pt, n = dec(BLOBS[bn], pwb, md)
                    if n:
                        pr = sum(1 for b in pt if 32 <= b < 127) / len(pt)
                        body = pt[:len(pt) - n]
                        xpads.append((bn, enc, md, "+".join(t.decode() for t in combo), n,
                                      len(body), pr, hashlib.sha256(body).hexdigest()))
                        if len(body) == 32:
                            kk = int.from_bytes(body, "big")
                            if 0 < kk < N and hash160_pub(kk) == H160:
                                xprize.append((bn, enc, md, body.hex()))
print("XOR-семейство: тестов %d, valid-padding %d (шум ~%.0f)" % (xt, len(xpads), xt / 256.0))
cos_all = [p for p in xpads if p[0] == "COSMIC"]
cos_pub = [p for p in cos_all if p[1] == "xor32" and p[2] == "md5"]
print("из них COSMIC: %d (шум ~%.0f); подсемейство опубликованной конструкции (xor32+md5): %d (шум ~%.0f)" % (
    len(cos_all), xt / 3.0 / 256.0, len(cos_pub), 8191 / 256.0))
print("топ-6 по печатаемости в XOR-семействе:")
for p in sorted(xpads, key=lambda z: -z[6])[:6]:
    print("   %-6s %-7s %-6s pad=%-2d len=%-4d pr=%.2f sha=%s combo=%.44s" % (
        p[0], p[1], p[2], p[4], p[5], p[6], p[7][:12], p[3]))
print("printable>=0.85 в XOR-семействе:", len([p for p in xpads if p[6] >= 0.85]))
print("призовых ключей в XOR-семействе:", len(xprize))
print("elapsed total %.1fs" % (time.time() - T0))
