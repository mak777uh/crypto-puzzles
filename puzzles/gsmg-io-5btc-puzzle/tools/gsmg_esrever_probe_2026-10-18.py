# -*- coding: utf-8 -*-
"""BigPickle 2026-10-18, pass 3. floflo lead #5 ("esrever" = reverse).
Small, well-defined space on the current final-gate objects:
  string reverse, byte reverse, per-byte BIT reverse, grid transpose
  (read columns-then-rows, widths 5/14/19/26/29), reverse+atbash.
Each result (raw + sha256-hex) -> password of the 4 AES blobs (EVP sha256/md5);
plus direct key check (hex64 / base58check-WIF) against the prize address.
Bounded single pass, CPU-only, <=15 min.
"""
import sys, re, base64, hashlib, time, string
sys.stdout.reconfigure(encoding="utf-8")
T0 = time.time()
from Crypto.Cipher import AES
BASE = r"C:\Users\Admin\OneDrive\Desktop\master\puzzles\gsmg-io-5btc-puzzle"
DATA = BASE + r"\data"; GH = DATA + r"\github_2026-10\HosterjackAGV__gsmg-5btc-puzzle"

def evp(pw, salt, md, kl=32, il=16):
    d, prev = b"", b""
    while len(d) < kl + il:
        prev = hashlib.new(md, prev + pw + salt).digest(); d += prev
    return d[:kl], d[kl:kl+il]
def pkcs7(b):
    if not b: return None
    n = b[-1]; return b[:-n] if 1 <= n <= 16 and b[-n:] == bytes([n])*n else None
def pratio(b): return sum(1 for x in b if 32 <= x < 127 or x in (9,10,13)) / max(1, len(b))
P_ = 2**256 - 2**32 - 977
Gx = 0x79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798
Gy = 0x483ADA7726A3C4655DA4FBFC0E1108A8FD17B448A68554199C47D08FFB10D4B8
def _add(p, q):
    if p is None: return q
    if q is None: return p
    if p[0] == q[0] and (p[1]+q[1]) % P_ == 0: return None
    l = (3*p[0]*p[0])*pow(2*p[1], -1, P_) % P_ if p == q else (q[1]-p[1])*pow(q[0]-p[0], -1, P_) % P_
    x = (l*l - p[0] - q[0]) % P_; return (x, (l*(p[0]-x) - p[1]) % P_)
def _mul(k, p=(Gx, Gy)):
    r = None
    while k:
        if k & 1: r = _add(r, p)
        p = _add(p, p); k >>= 1
    return r
B58 = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
def h160(b): return hashlib.new("ripemd160", hashlib.sha256(b).digest()).digest()
PRIZE_H160 = "a9553269572a317e39f0f518cb87c1a0ee1dbae4"
def key_hits(b):
    if len(b) != 32: return []
    k = int.from_bytes(b, "big")
    if not (1 <= k < 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141): return []
    out = []
    for comp in (False, True):
        x, y = _mul(k)
        pk = (bytes([2+(y & 1)]) + x.to_bytes(32, "big")) if comp else (b"\x04"+x.to_bytes(32,"big")+y.to_bytes(32,"big"))
        if h160(pk).hex() == PRIZE_H160: out.append("PRIZE-KEY comp=%s k=%064x" % (comp, k))
    return out

def load_salted(path):
    s = open(path, encoding="utf-8", errors="ignore").read()
    m = re.search(r"U2FsdGVkX1[A-Za-z0-9+/=\s]{20,}", s)
    if not m: return None
    b64 = re.sub(r"\s", "", m.group(0)); raw = base64.b64decode(b64 + "="*(-len(b64) % 4))
    return raw if raw[:8] == b"Salted__" else None
BLOBS = {}
raw = load_salted(GH + r"\ciphertexts__cosmic.txt")
if raw: BLOBS["cosmic"] = (raw[8:16], raw[16:])
with open(DATA + r"\urlblob_4th_salt_74c974e3.bin", "rb") as f: raw = f.read()
BLOBS["urlblob"] = (raw[8:16], raw[16:])
SP = base64.b64decode("U2FsdGVkX186tYU0hVJBXXUnBUO7C0+X4KUWnWkCvoZSxbRD3wNsGWVHefvdrd9zQvX0t8v3jPB4okpspxebRi6sE1BMl5HI8Rku+KejUqTvdWOX6nQjSpepXwGuN/jJ")
IN = base64.b64decode("U2FsdGVkX1+0Wl49gnWTyiimluu7V3+vl7st0gUt9sWDzNLxDmlPMsDSiuW2a46zgKlIi8aaqY5gpJPPEzW1n9n3/26qs4zstWtPKF8Zs/BTNN4IiEh4qu18mdC0NAv4")
BLOBS["salph_inner"] = (SP[8:16], SP[16:]); BLOBS["inner32"] = (IN[8:16], IN[16:])

s570 = open(DATA + r"\s570_bifid_2026-10-17.txt", encoding="utf-8").read()
def field(n):
    m = re.search(n + r".*?\n([A-Z]+)", s570); return m.group(1) if m else ""
BIFID570, ODD, KEPT = field("BIFID570"), field("ODD285"), field("KEPT256")
DROPPED = "OOIIOOOIIOOIOIIOIOOOOIOIIOIOI"
EVEN = open(DATA + r"\s570_even285_2026-10-18.txt", encoding="utf-8").read().split("\n", 1)[1].strip()
arch = open(DATA + r"\github_2026-10\_web\gsmg-archive.org_index.html", encoding="utf-8", errors="ignore").read()
m = re.search(r'id="section-salphaseion".*?<textarea[^>]*>(.*?)</textarea>', arch, re.S)
sp_text = re.sub(r"\s+", "", m.group(1)) if m else ""
DBBI, FAED = sp_text[:91], sp_text[91:91+570]
AZ = string.ascii_uppercase
OBJ = {"BIFID570": BIFID570, "ODD285": ODD, "KEPT256": KEPT, "DROPPED29": DROPPED,
       "EVEN_BCDE": EVEN, "dbbi91": DBBI, "faed570": FAED}

def bitrev_byte(x): return int("{:08b}".format(x)[::-1], 2)
def transforms(s):
    o = {"REV": s[::-1]}
    b = s.encode("latin-1", "ignore")
    o["REVBYTES"] = b[::-1].decode("latin-1")
    o["BITREV"] = bytes(bitrev_byte(x) for x in b).decode("latin-1")
    o["REV_ATBASH"] = "".join(AZ[25-AZ.index(c)] if c in AZ else c for c in s.upper())[::-1]
    for w in (5, 14, 19, 26, 29, 32):
        rows = [s[i:i+w] for i in range(0, len(s), w)]
        o["TRANSP%d" % w] = "".join(rows[r][c] for c in range(w) for r in range(len(rows)) if c < len(rows[r]))
    return o

hits, pad_ok, tested, outs_n, key_found = [], 0, 0, 0, []
for oname, obj in OBJ.items():
    for tname, T in transforms(obj).items():
        if not T: continue
        outs_n += 1
        for cand in (T, T[::-1]):
            b = None
            if re.fullmatch(r"[0-9a-fA-F]{64}", cand): b = bytes.fromhex(cand)
            else:
                cc = cand.strip()
                if cc and all(ch in B58 for ch in cc):
                    try:
                        n = 0
                        for ch in cc: n = n*58 + B58.index(ch)
                        bb = n.to_bytes((n.bit_length()+7)//8, "big")
                        if len(bb) == 33 and bb[0] == 0x80: b = bb[1:]
                        elif len(bb) == 32: b = bb
                    except Exception: pass
            if b:
                for h in key_hits(b): key_found.append((oname, tname, h)); print("KEY-HIT", oname, tname, h)
        for form, pw in (("raw", T.encode("latin-1", "ignore")),
                         ("sha256hex", hashlib.sha256(T.encode("latin-1", "ignore")).hexdigest().encode())):
            for bn, (salt, ct) in BLOBS.items():
                for md in ("sha256", "md5"):
                    tested += 1
                    key, iv = evp(pw, salt, md)
                    pl = pkcs7(AES.new(key, AES.MODE_CBC, iv).decrypt(ct))
                    if pl is None: continue
                    pad_ok += 1
                    if pratio(pl) >= 0.85:
                        hits.append((oname, tname, form, bn, md, round(pratio(pl), 2), pl[:120]))
                        print("READABLE-HIT", hits[-1])
print("\n== ESREVER SUMMARY ==")
print("outputs:", outs_n, "AES tests:", tested, "valid-pad:", pad_ok,
      "readable:", len(hits), "key-hits:", len(key_found), "elapsed %.1fs" % (time.time()-T0))
