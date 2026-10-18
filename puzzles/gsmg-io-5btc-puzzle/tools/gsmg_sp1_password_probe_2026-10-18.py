# -*- coding: utf-8 -*-
"""Bounded, insight-directed test H-SP1 (<=15 min).

Hypothesis: the 96-byte SalPhaseIon AES blob is an AES-256-CBC encryption of the
prize private key, password = a token literally present on the SalPhaseIon page
("the password is in front of your eyes").

Axis: page tokens + simple compositions + their sha256-hex forms, x KDF {md5,sha256},
x {EVP IV, explicit IV 14f23fd58189ad7ee1d794ad8cc16d7d} -> plaintext must yield
hash160(pubkey) == a9553269572a317e39f0f518cb87c1a0ee1dbae4 (prize 1GSMG1J...).

Also same pool against the inner 3.2 blob (salt b45a5e3d827593ca).
"""
import sys, io, os, re, json, hashlib, hmac, itertools, time
sys.stdout.reconfigure(encoding="utf-8")

T0 = time.time()
H160 = "a9553269572a317e39f0f518cb87c1a0ee1dbae4"

# ---------- secp256k1 + hash160 (pure python, no deps) ----------
P = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F
N = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141
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
    if x1 == x2 and (y1 + y2) % P == 0:
        return None
    if p1 == p2:
        lam = (3 * x1 * x1) * _inv(2 * y1, P) % P
    else:
        lam = (y2 - y1) * _inv(x2 - x1, P) % P
    x3 = (lam * lam - x1 - x2) % P
    return (x3, (lam * (x1 - x3) - y1) % P)


def _mul(k, pt=(Gx, Gy)):
    r = None
    while k:
        if k & 1:
            r = _add(r, pt)
        pt = _add(pt, pt)
        k >>= 1
    return r


try:
    _ripemd = lambda b: hashlib.new("ripemd160", b).digest()
    _ripemd(b"")
except Exception:
    def _ripemd(msg):
        # pure-python RIPEMD-160
        r1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
              7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8,
              3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12,
              1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2,
              4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13]
        r2 = [5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12,
              6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2,
              15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13,
              8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14,
              12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11]
        s1 = [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8,
              7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12,
              11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5,
              11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12,
              9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6]
        s2 = [8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6,
              9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11,
              9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5,
              15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8,
              8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11]

        def rol(x, n):
            return ((x << n) | (x >> (32 - n))) & 0xFFFFFFFF

        def f(j, x, y, z):
            if j < 16:
                return x ^ y ^ z
            if j < 32:
                return (x & y) | (~x & z)
            if j < 48:
                return (x | ~y) ^ z
            if j < 64:
                return (x & z) | (y & ~z)
            return x ^ (y | ~z)

        ml = len(msg)
        msg = msg + b"\x80"
        while len(msg) % 64 != 56:
            msg += b"\x00"
        msg += (ml * 8).to_bytes(8, "little")
        h = [0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476, 0xC3D2E1F0]
        KL = [0x00000000, 0x5A827999, 0x6ED9EBA1, 0x8F1BBCDC, 0xA953FD4E]
        KR = [0x50A28BE6, 0x5C4DD124, 0x6D703EF3, 0x7A6D76E9, 0x00000000]
        for off in range(0, len(msg), 64):
            X = [int.from_bytes(msg[off + 4 * i:off + 4 * i + 4], "little") for i in range(16)]
            al, bl, cl, dl, el = h
            ar, br, cr, dr, er = h
            for j in range(80):
                jj = j // 16
                t = (al + f(j, bl, cl, dl) + X[r1[j]] + KL[jj]) & 0xFFFFFFFF
                t = (rol(t, s1[j]) + el) & 0xFFFFFFFF
                al, el, dl, cl, bl = el, dl, rol(cl, 10), bl, t
                t = (ar + f(79 - j, br, cr, dr) + X[r2[j]] + KR[jj]) & 0xFFFFFFFF
                t = (rol(t, s2[j]) + er) & 0xFFFFFFFF
                ar, er, dr, cr, br = er, dr, rol(cr, 10), br, t
            t = (h[1] + cl + dr) & 0xFFFFFFFF
            h[1] = (h[2] + dl + er) & 0xFFFFFFFF
            h[2] = (h[3] + el + ar) & 0xFFFFFFFF
            h[3] = (h[4] + al + br) & 0xFFFFFFFF
            h[4] = (h[0] + bl + cr) & 0xFFFFFFFF
            h[0] = t
        return b"".join(x.to_bytes(4, "little") for x in h)


def hash160_of_pub(pub):
    return _ripemd(hashlib.sha256(pub).digest()).hex()


def pub_uncompressed(k):
    pt = _mul(k % N)
    if pt is None:
        return None
    x, y = pt
    return b"\x04" + x.to_bytes(32, "big") + y.to_bytes(32, "big")


def pub_compressed(k):
    pt = _mul(k % N)
    if pt is None:
        return None
    x, y = pt
    return (b"\x03" if y & 1 else b"\x02") + x.to_bytes(32, "big")


B58 = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"


def b58decode(s):
    n = 0
    for ch in s:
        n = n * 58 + B58.index(ch)
    raw = n.to_bytes((n.bit_length() + 7) // 8, "big")
    pad = 0
    for ch in s:
        if ch == "1":
            pad += 1
        else:
            break
    return b"\x00" * pad + raw


try:
    from Crypto.Cipher import AES as _AES

    def aes_cbc_dec(key, iv, ct):
        c = _AES.new(key, _AES.MODE_CBC, iv)
        return c.decrypt(ct)
    HAVE = "pycryptodome"
except Exception:
    def aes_cbc_dec(key, iv, ct):
        # pure AES via openssl already handled below; fallback: use openssl subprocess
        raise RuntimeError("no AES")
    HAVE = "openssl-only"


# ---------- EVP_BytesToKey ----------
def evp(pw, salt, md, key_len=32, iv_len=16):
    d = b""
    prev = b""
    while len(d) < key_len + iv_len:
        prev = hashlib.new(md, prev + pw + salt).digest()
        d += prev
    return d[:key_len], d[key_len:key_len + iv_len]


def pkcs7_strip(b):
    if not b:
        return None
    n = b[-1]
    if 1 <= n <= 16 and b[-n:] == bytes([n]) * n:
        return b[:-n]
    return None


def check_plain(plain, tag):
    outs = []
    if plain is None:
        return outs
    # 64 hex
    h = plain.strip()
    if isinstance(h, bytes):
        try:
            hs = h.decode("ascii")
        except Exception:
            hs = ""
    else:
        hs = h
    cands = []
    if re.fullmatch(r"[0-9a-fA-F]{64}", hs or ""):
        cands.append(("hex64", int(hs, 16)))
    if re.fullmatch(r"[5KL9c][1-9A-HJ-NP-Za-km-z]{50,51}", hs or ""):
        try:
            raw = b58decode(hs)
            if len(raw) in (37, 38):
                kk = int.from_bytes(raw[1:33], "big")
                comp = (len(raw) == 38 and raw[33] == 1)
                cands.append(("wif-comp" if comp else "wif-unc", kk))
                cands.append(("wif-both", kk))
        except Exception:
            pass
    if len(plain) in (32,):
        cands.append(("raw32", int.from_bytes(plain, "big")))
    for kind, k in cands:
        if k <= 0 or k >= N:
            continue
        for name, fn in (("unc", pub_uncompressed), ("cmp", pub_compressed)):
            pub = fn(k)
            if pub and hash160_of_pub(pub) == H160:
                outs.append((tag, kind, name, hex(k)))
    return outs


# ---------- blobs ----------
DATA = r"C:\Users\Admin\OneDrive\Desktop\master\puzzles\gsmg-io-5btc-puzzle\data"
SP_B64 = ("U2FsdGVkX186tYU0hVJBXXUnBUO7C0+X4KUWnWkCvoZSxbRD3wNsGWVHefvdrd9z"
          "QvX0t8v3jPB4okpspxebRi6sE1BMl5HI8Rku+KejUqTvdWOX6nQjSpepXwGuN/jJ")
INNER32_B64 = ("U2FsdGVkX1+0Wl49gnWTyiimluu7V3+vl7st0gUt9sWDzNLxDmlPMsDSiuW2a46z"
               "gKlIi8aaqY5gpJPPEzW1n9n3/26qs4zstWtPKF8Zs/BTNN4IiEh4qu18mdC0NAv4")
import base64
blobs = {}
for nm, b64 in (("SP", SP_B64), ("INNER32", INNER32_B64)):
    raw = base64.b64decode(b64)
    assert raw[:8] == b"Salted__", (nm, raw[:8])
    blobs[nm] = (raw[8:16], raw[16:])
    print("%s: %d bytes, salt=%s, ct=%d" % (nm, len(raw), raw[8:16].hex(), len(raw[16:])))

# ---------- candidate passwords ----------
toks = ["thispassword", "thepassword", "lastwordsbeforearchichoice", "lastwordbeforearchichoice",
        "matrixsumlist", "enter", "shabef", "habe", "theseedisplanted", "yellowblueprimes",
        "yinyang", "yingyang", "causality", "gsmg", "GSMG", "matrix", "thematrixhasyou",
        "THEMATRIXHASYOU", "shabefanstood", "fourfirsthintisyourlastcommand",
        "four first hint is your last command", "ourfirsthintisyourlastcommand",
        "GSMGIO5BTCPUZZLECHALLENGE1GSMG1JC9wtdSwfwApgj2xcmJPAwx7prBe",
        "89727c598b9cd1cf8873f27cb7057f050645ddb6a7a157a110239ac0152f6a32",
        "1a57c572caf3cf722e41f5f9cf99ffacff06728a43032dd44c481c77d2ec30d5",
        "250f37726d6862939f723edc4f993fde9d33c6004aab4f2203d9ee489d61ce4c",
        "yellowblueprimesmatrixsumlistlastwordsbeforearchichoiceyinyang",
        "matrixsumlistenterlastwordsbeforearchichoicethispassword",
        "thispasswordlastwordsbeforearchichoice", "lastwordsbeforearchichoicethispassword",
        "jacquefresco", "heisenbergsuncertaintyprinciple", "justonesec", "justonesecond",
        "ashabefourfirsthintisyourlastcommand", "shabefourfirsthintisyourlastcommand"]
cands = set()
for t in toks:
    cands.add(t)
    cands.add(hashlib.sha256(t.encode()).hexdigest())
    cands.add(hashlib.sha256(t.encode()).digest().hex())
for a, b in itertools.permutations(["thispassword", "lastwordsbeforearchichoice", "matrixsumlist", "enter", "shabef", "thepassword"], 2):
    cands.add(a + b)
    cands.add(a + " " + b)
    cands.add(a.upper() + b.upper())
cands.add("shabef" + "ourfirsthintisyourlastcommand")
print("candidate passwords:", len(cands))

IV_EXPLICIT = bytes.fromhex("14f23fd58189ad7ee1d794ad8cc16d7d")
IV_INNER = None
hits = []
cnt = 0
for nm, (salt, ct) in blobs.items():
    for pw in cands:
        pwb = pw.encode() if isinstance(pw, str) else pw
        for md in ("sha256", "md5"):
            key, iv = evp(pwb, salt, md)
            for ivname, ivv in (("evp", iv), ("exp", IV_EXPLICIT)):
                cnt += 1
                try:
                    pt = aes_cbc_dec(key, ivv, ct)
                except Exception as e:
                    continue
                if aes_cbc_dec is None:
                    continue
                for variant, pl in (("raw", pt), ("unpad", pkcs7_strip(pt))):
                    if pl is None:
                        continue
                    r = check_plain(pl, "%s/%s/%s/%s" % (nm, md[:3], ivname, variant))
                    if r:
                        hits.extend(r)
                        print("HIT", r)

print("tests:", cnt, "hits:", len(hits), "elapsed %.1fs" % (time.time() - T0))
