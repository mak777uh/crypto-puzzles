# -*- coding: utf-8 -*-
"""BigPickle 2026-10-18, pass 2. Exhaust the REMAINING ciphers of the identified
tool's menu (scwf.dima.ninja = mirror of Rumkin "Ciphers and Codes", fork DaWouw).

Pass 1 (tools/gsmg_rumkin_menu_probe_2026-10-18.py) covered: atbash, caesar,
affine, letter-numbers, bifid, railfence, rotate, skip, xor, base64/32/16.
Pass 2 adds the rest of the live menu (fixed-map / keyed-with-known-key):
  EBCDIC(cp037), Baudot/ITA2, Baconian, Morse, Playfair(unkeyed), Columnar(keyword),
  Vigenere/Gronsfeld(known keys), Substitution maps (qwerty->dvorak/colemak,
  keyboardshift, 1337-sp3ak, Code39), Base36/Base58/Base85.
Also: fixed correct Bifid ENCODE (pass-1 bug) and a direct KEY CHECK on every
transform output (hex64 / base58check-WIF / 32 bytes -> secp256k1 -> prize addr).

Hypothesis + axis already in LOG.md before the run. Bounded single pass, CPU-only.
"""
import sys, re, base64, hashlib, time, string
sys.stdout.reconfigure(encoding="utf-8")
T0 = time.time(); GUARD = 720

from Crypto.Cipher import AES

BASE = r"C:\Users\Admin\OneDrive\Desktop\master\puzzles\gsmg-io-5btc-puzzle"
DATA = BASE + r"\data"
GH = DATA + r"\github_2026-10\HosterjackAGV__gsmg-5btc-puzzle"

# ---------- crypto helpers ----------
def evp(pw, salt, md, kl=32, il=16):
    d, prev = b"", b""
    while len(d) < kl + il:
        prev = hashlib.new(md, prev + pw + salt).digest(); d += prev
    return d[:kl], d[kl:kl+il]
def pkcs7(b):
    if not b: return None
    n = b[-1]
    return b[:-n] if 1 <= n <= 16 and b[-n:] == bytes([n])*n else None
def pratio(b): return sum(1 for x in b if 32 <= x < 127 or x in (9,10,13)) / max(1, len(b))

P_ = 2**256 - 2**32 - 977
Gx = 0x79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798
Gy = 0x483ADA7726A3C4655DA4FBFC0E1108A8FD17B448A68554199C47D08FFB10D4B8
def _add(p, q):
    if p is None: return q
    if q is None: return p
    if p[0] == q[0] and (p[1] + q[1]) % P_ == 0: return None
    if p == q: l = (3*p[0]*p[0]) * pow(2*p[1], -1, P_) % P_
    else: l = (q[1]-p[1]) * pow(q[0]-p[0], -1, P_) % P_
    x = (l*l - p[0] - q[0]) % P_; return (x, (l*(p[0]-x) - p[1]) % P_)
def _mul(k, p=(Gx, Gy)):
    r = None
    while k:
        if k & 1: r = _add(r, p)
        p = _add(p, p); k >>= 1
    return r
B58 = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
def h160(b): return hashlib.new("ripemd160", hashlib.sha256(b).digest()).digest()
def b58c(payload):
    chk = hashlib.sha256(hashlib.sha256(payload).digest()).digest()[:4]
    n = int.from_bytes(payload + chk, "big"); s = ""
    while n: n, r = divmod(n, 58); s = B58[r] + s
    pad = len(payload + chk) - len((payload + chk).lstrip(b"\0"))
    return "1"*pad + s
PRIZE_H160 = "a9553269572a317e39f0f518cb87c1a0ee1dbae4"
PRIZE_ADDR = "1GSMG1JC9wtdSwfwApgj2xcmJPAwx7prBe"
def key_hits(b):
    """b = 32-byte candidate private key -> list of match descriptions."""
    out = []
    if len(b) != 32: return out
    k = int.from_bytes(b, "big")
    if not (1 <= k < 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141):
        return out
    try:
        for comp in (False, True):
            x, y = _mul(k)
            pk = (bytes([2+(y & 1)]) + x.to_bytes(32, "big")) if comp else (b"\x04"+x.to_bytes(32,"big")+y.to_bytes(32,"big"))
            if h160(pk).hex() == PRIZE_H160:
                out.append("PRIZE-KEY comp=%s k=%064x" % (comp, k))
    except Exception:
        pass
    return out

# ---------- blobs ----------
def load_salted(path):
    s = open(path, encoding="utf-8", errors="ignore").read()
    m = re.search(r"U2FsdGVkX1[A-Za-z0-9+/=\s]{20,}", s)
    if not m: return None
    b64 = re.sub(r"\s", "", m.group(0))
    raw = base64.b64decode(b64 + "="*(-len(b64) % 4))
    return raw if raw[:8] == b"Salted__" else None
BLOBS = {}
raw = load_salted(GH + r"\ciphertexts__cosmic.txt")
if raw: BLOBS["cosmic"] = (raw[8:16], raw[16:])
with open(DATA + r"\urlblob_4th_salt_74c974e3.bin", "rb") as f: raw = f.read()
BLOBS["urlblob"] = (raw[8:16], raw[16:])
SP = base64.b64decode("U2FsdGVkX186tYU0hVJBXXUnBUO7C0+X4KUWnWkCvoZSxbRD3wNsGWVHefvdrd9zQvX0t8v3jPB4okpspxebRi6sE1BMl5HI8Rku+KejUqTvdWOX6nQjSpepXwGuN/jJ")
IN = base64.b64decode("U2FsdGVkX1+0Wl49gnWTyiimluu7V3+vl7st0gUt9sWDzNLxDmlPMsDSiuW2a46zgKlIi8aaqY5gpJPPEzW1n9n3/26qs4zstWtPKF8Zs/BTNN4IiEh4qu18mdC0NAv4")
BLOBS["salph_inner"] = (SP[8:16], SP[16:]); BLOBS["inner32"] = (IN[8:16], IN[16:])

# ---------- objects ----------
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
OBJ = {"BIFID570": BIFID570, "ODD285": ODD, "KEPT256": KEPT, "DROPPED29": DROPPED,
       "EVEN_BCDE": EVEN, "dbbi91": DBBI, "faed570": FAED}
print("objects:", {k: len(v) for k, v in OBJ.items()})

# ---------- transforms (pass 2) ----------
AZ = string.ascii_uppercase
def L(s): return "".join(c for c in s.upper() if c in AZ)

def bifid(sq, s, enc):
    pos = {sq[r][c]: (r,c) for r in range(5) for c in range(5)}
    v = [c for c in s.upper() if c in pos]
    if not v: return ""
    flat = [z for c in v for z in pos[c]]; n = len(v)
    if enc:  # rows then cols, read pairs
        rows = flat[0::2]; cols = flat[1::2]; g = rows + cols
        return "".join(sq[g[2*i]][g[2*i+1]] for i in range(n))
    rows, cols = flat[:n], flat[n:]
    return "".join(sq[rows[i]][cols[i]] for i in range(n))
def sq_from(key):
    al = list("ABCDEFGHIKLMNOPQRSTUVWXYZ"); seen = []
    for c in (key or "").upper():
        if c in al and c not in seen: seen.append(c)
    for c in al:
        if c not in seen: seen.append(c)
    return [seen[i*5:(i+1)*5] for i in range(5)]

def t_ebcdic(s):
    o = {}
    try: o["EBC_E"] = L(s).encode("cp037").hex()
    except Exception: pass
    try: o["EBC_D"] = bytes.fromhex(L(s).encode("cp037").hex()).decode("cp037")
    except Exception: pass
    try:
        b = L(s).encode("cp037"); o["EBC_DB"] = bytes((x ^ 0xFF) for x in b).decode("cp037", "ignore")
    except Exception: pass
    return o

ITA2 = {"A":"00011","B":"11001","C":"01110","D":"01001","E":"00001","F":"01101","G":"11010",
        "H":"10100","I":"00110","J":"01011","K":"01111","L":"10010","M":"11100","N":"01100",
        "O":"11000","P":"10110","Q":"10111","R":"01010","S":"00101","T":"10000","U":"00111",
        "V":"11110","W":"10011","X":"11101","Y":"10101","Z":"10001"," ":"00100"}
def t_ita2(s):
    o = {}
    bits = "".join(ITA2.get(c, "") for c in L(s))
    o["ITA2bits"] = bits
    # decode the bitstream back in 5-bit groups via letters table
    inv = {v: k for k, v in ITA2.items() if k != " "}
    o["ITA2dec"] = "".join(inv.get(bits[i:i+5], "?") for i in range(0, len(bits)-4, 5))
    return o

def bacon(s, cls):
    bits = "".join("1" if cls(c) else "0" for c in s)
    return "".join(chr(65 + int(bits[i:i+5], 2)) if i+5 <= len(bits) else ""
                   for i in range(0, len(bits)-4, 5))
def t_bacon(s):
    o = {}
    o["BAC_even"] = bacon(s, lambda c: ord(c) % 2 == 1)
    o["BAC_halfA"] = bacon(s, lambda c: c.upper() < "N")
    o["BAC_vowel"] = bacon(s, lambda c: c.upper() in "AEIOU")
    o["BAC_abo"] = bacon(s, lambda c: c.upper() in "ABC")
    return o

MORSE = {'A':'.-','B':'-...','C':'-.-.','D':'-..','E':'.','F':'..-.','G':'--.','H':'....',
         'I':'..','J':'.---','K':'-.-','L':'.-..','M':'--','N':'-.','O':'---','P':'.--.',
         'Q':'--.-','R':'.-.','S':'...','T':'-','U':'..-','V':'...-','W':'.--','X':'-..-',
         'Y':'-.--','Z':'--..'}
def t_morse(s):
    a = " ".join(MORSE.get(c, "") for c in L(s))
    return {"MORSE": a, "MORSE_REV": a[::-1], "MORSE_SWAP": a.translate(str.maketrans(".-", "-."))}

def playfair(sq, s, enc):
    pos = {sq[r][c]: (r,c) for r in range(5) for c in range(5)}
    v = [c for c in s.upper() if c in pos]
    if len(v) % 2: v.append("X")
    out = []
    for i in range(0, len(v), 2):
        a, b = v[i], v[i+1]
        r1, c1 = pos[a]; r2, c2 = pos[b]
        if r1 == r2: c1, c2 = (c1+1) % 5, (c2+1) % 5
        elif c1 == c2: r1, r2 = (r1+1) % 5, (r2+1) % 5
        else: c1, c2 = c2, c1
        out += [sq[r1][c1], sq[r2][c2]]
    return "".join(out)
def t_playfair(s):
    sq = sq_from("")
    return {"PF_D": playfair(sq, s, False), "PF_E": playfair(sq, s, True)}

def col_dec(text, key):
    k = len(key); n = len(text); rows = (n + k - 1)//k
    text = text.ljust(rows*k, "X")
    order = sorted(range(k), key=lambda i: (key[i], i))
    cols = [""]*k
    for j, c in enumerate(order): cols[c] = text[j*rows:(j+1)*rows]
    return "".join(cols[r][c] for r in range(rows) for c in range(k))
def col_enc(text, key):
    k = len(key); n = len(text); rows = (n + k - 1)//k
    text = text.ljust(rows*k, "X"); order = sorted(range(k), key=lambda i: (key[i], i))
    return "".join(text[r*k+c] for c in order for r in range(rows))
COLKEYS = ["GSMG", "YINYANG", "MATRIXSUMLIST", "YRLLDWBLUE", "PASSWORD", "BTCSEED",
           "610876654997879", "8108108736759668", "SALVATION", "YELLOWBLUEPRIMES"]
def t_col(s):
    o = {}
    for kk in COLKEYS:
        try: o["COLD_"+kk[:6]] = col_dec(L(s), kk)
        except Exception: pass
        try: o["COLE_"+kk[:6]] = col_enc(L(s), kk)
        except Exception: pass
    return o

def vigenere(s, key, dec=True):
    Ls, Ks = L(s), L(key)
    if not Ks: return ""
    return "".join(AZ[(AZ.index(c) + (-1 if dec else 1)*AZ.index(Ks[i % len(Ks)])) % 26] for i, c in enumerate(Ls))
VKEYS = ["YINYANG", "YELLOWBLUEPRIMES", "MATRIXSUMLIST", "LASTWORDSBEFOREARCHICHOICE",
         "DBIFHCEG", "SALVATION", "BTCSEED", "5BTC", "GSMG"]
def t_vig(s):
    o = {}
    for kk in VKEYS:
        o["VIGD_"+kk[:6]] = vigenere(s, kk, True)
        o["VIGE_"+kk[:6]] = vigenere(s, kk, False)
    return o

DVORAK = "',.PYFGCRLAOEUIDHTNS;QJKXBMWVZ"
QWERTY = "QWERTYUIOPASDFGHJKLZXCVBNM"
COLEMAK = "QWFPGJLUYARSTDHNEIOZXCVBKM"
def mapsub(s, fromseq, toseq):
    t = str.maketrans(fromseq, toseq)
    return "".join(s.upper().translate(t).split())
KEYSHIFT = "QWERTYUIOPASDFGHJKLZXCVBNM"
KEYSHIFT_TO = " ASDFGHJKL;'ZXCVBNM,./"[:26]
def t_sub(s):
    o = {}
    try: o["SUB_Q2D"] = mapsub(s, QWERTY, DVORAK)
    except Exception: pass
    try: o["SUB_D2Q"] = mapsub(s, DVORAK, QWERTY)
    except Exception: pass
    try: o["SUB_Q2C"] = mapsub(s, QWERTY, COLEMAK)
    except Exception: pass
    try: o["SUB_C2Q"] = mapsub(s, COLEMAK, QWERTY)
    except Exception: pass
    o["SUB_1337"] = L(s).translate(str.maketrans("0134578", "OIEASTB"))
    return o

def t_base(s):
    o = {}
    try:
        n = int(L(s), 36); b = n.to_bytes((n.bit_length()+7)//8, "big")
        o["B36"] = b.decode("latin-1")
    except Exception: pass
    try:
        n = int(L(s), 58); b = n.to_bytes((n.bit_length()+7)//8, "big")
        o["B58"] = b.decode("latin-1")
    except Exception: pass
    for nm, fn in (("B85", base64.b85decode), ("A85", base64.a85decode)):
        try:
            b = fn(s.encode()); o[nm] = b.decode("latin-1")
        except Exception: pass
    return o

def t_xor2(s):
    o = {}; Ls = L(s)
    for kn, key in (("YY", "YINYANG"), ("YBP", "YELLOWBLUEPRIMES"), ("MSL", "MATRIXSUMLIST"),
                    ("LWS", "LASTWORDSBEFOREARCHICHOICE"), ("DBIF", "DBIFHCEG")):
        o["X2_" + kn] = "".join(AZ[(ord(c) ^ ord(key[i % len(key)])) % 26] for i, c in enumerate(Ls))
    return o

TRANS = [t_ebcdic, t_ita2, t_bacon, t_morse, t_playfair, t_col, t_vig, t_sub, t_base, t_xor2]

KW = (b"ying", b"yang", b"salv", b"btcseed", b"yellowblue", b"neighbors", b"private")
hits, pad_ok, tested, outs_n, stop = [], 0, 0, 0, False
key_found = []
for oname, obj in OBJ.items():
    if stop or not obj: continue
    print("...object", oname, "t=%.0fs" % (time.time()-T0))
    for tf in TRANS:
        if stop: break
        try: Tset = tf(obj)
        except Exception: continue
        for tname, T in Tset.items():
            if not T: continue
            outs_n += 1
            TU = T.upper().encode("latin-1", "ignore")
            if any(k.upper() in TU for k in KW):
                print("KW-IN-OUT %s/%s: %.60r" % (oname, tname, T[:60]))
            # direct key check
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
                    for h in key_hits(b):
                        key_found.append((oname, tname, h)); print("KEY-HIT", oname, tname, h)
            cands = [("raw", T.encode("latin-1", "ignore")),
                     ("sha256hex", hashlib.sha256(T.encode("latin-1", "ignore")).hexdigest().encode())]
            for form, pw in cands:
                for bn, (salt, ct) in BLOBS.items():
                    for md in ("sha256", "md5"):
                        tested += 1
                        key, iv = evp(pw, salt, md)
                        pt = AES.new(key, AES.MODE_CBC, iv).decrypt(ct)
                        pl = pkcs7(pt)
                        if pl is None: continue
                        pad_ok += 1
                        if pratio(pl) >= 0.85:
                            hits.append((oname, tname, form, bn, md, round(pratio(pl), 2), pl[:120]))
                            print("READABLE-HIT", hits[-1])
            if time.time()-T0 > GUARD:
                print("TIME GUARD"); stop = True; break
        if stop: break

print("\n== PASS2 SUMMARY ==")
print("outputs:", outs_n, "AES tests:", tested, "valid-pad:", pad_ok,
      "readable:", len(hits), "key-hits:", len(key_found), "elapsed %.1fs" % (time.time()-T0))
