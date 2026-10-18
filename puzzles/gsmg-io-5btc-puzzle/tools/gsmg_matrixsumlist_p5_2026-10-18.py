# -*- coding: utf-8 -*-
"""BigPickle 2026-10-18, pass 5. Two directed follow-ups on `matrixsumlist`:
(A) FIXED-WIDTH renders of the sum-lists (2- and 3-digit zero-padded concat) -> bigint -> hex -> ASCII
    (pass 4 only tried VARIABLE-width concat).
(B) sums-as-POSITIONS: 'zero out' / insert '0' at the sum-indices in dbbi/faed (hint 2021-12-25
    'some characters need to be zeroed out' + Architect 'reinserting the prime basics';
    dbbi/faed contain no 'o'=0, which is exactly why the house field-decode cannot fire).
Then house field-decode + scoring + blob-password test. Bounded, CPU-only.
"""
import sys, re, base64, hashlib, string
sys.stdout.reconfigure(encoding="utf-8")
from Crypto.Cipher import AES
BASE = r"C:\Users\Admin\OneDrive\Desktop\master\puzzles\gsmg-io-5btc-puzzle"
DATA = BASE + r"\data"; GH = DATA + r"\github_2026-10\_web\gsmg-archive.org_index.html"

def evp(pw, salt, md, kl=32, il=16):
    d, prev = b"", b""
    while len(d) < kl+il:
        prev = hashlib.new(md, prev+pw+salt).digest(); d += prev
    return d[:kl], d[kl:kl+il]
def pkcs7(b):
    if not b: return None
    n = b[-1]; return b[:-n] if 1 <= n <= 16 and b[-n:] == bytes([n])*n else None
def pratio(b): return sum(1 for x in b if 32 <= x < 127 or x in (9,10,13))/max(1,len(b))
def load_salted(path):
    s = open(path, encoding="utf-8", errors="ignore").read()
    m = re.search(r"U2FsdGVkX1[A-Za-z0-9+/=\s]{20,}", s)
    if not m: return None
    b64 = re.sub(r"\s", "", m.group(0)); raw = base64.b64decode(b64+"="*(-len(b64) % 4))
    return raw if raw[:8] == b"Salted__" else None
BLOBS = {}
raw = load_salted(DATA + r"\github_2026-10\HosterjackAGV__gsmg-5btc-puzzle\ciphertexts__cosmic.txt")
if raw: BLOBS["cosmic"] = (raw[8:16], raw[16:])
with open(DATA + r"\urlblob_4th_salt_74c974e3.bin", "rb") as f: raw = f.read()
BLOBS["urlblob"] = (raw[8:16], raw[16:])
SP = base64.b64decode("U2FsdGVkX186tYU0hVJBXXUnBUO7C0+X4KUWnWkCvoZSxbRD3wNsGWVHefvdrd9zQvX0t8v3jPB4okpspxebRi6sE1BMl5HI8Rku+KejUqTvdWOX6nQjSpepXwGuN/jJ")
IN = base64.b64decode("U2FsdGVkX1+0Wl49gnWTyiimluu7V3+vl7st0gUt9sWDzNLxDmlPMsDSiuW2a46zgKlIi8aaqY5gpJPPEzW1n9n3/26qs4zstWtPKF8Zs/BTNN4IiEh4qu18mdC0NAv4")
BLOBS["salph_inner"] = (SP[8:16], SP[16:]); BLOBS["inner32"] = (IN[8:16], IN[16:])

arch = open(GH, encoding="utf-8", errors="ignore").read()
m = re.search(r'id="section-salphaseion".*?<textarea[^>]*>(.*?)</textarea>', arch, re.S)
sp = re.sub(r"\s+", "", m.group(1))
DBBI, FAED = sp[:91], sp[91:91+570]
def dig(s): return [ord(c)-96 for c in s if 'a' <= c.lower() <= 'i']

d, f = dig(DBBI), dig(FAED)
SUMLISTS = {
    "dbbi13x7.rows": [sum(d[i*7:(i+1)*7]) for i in range(13)],
    "dbbi13x7.cols": [sum(d[i*7+j] for i in range(13)) for j in range(7)],
    "dbbi7x13.rows": [sum(d[i*13:(i+1)*13]) for i in range(7)],
    "dbbi7x13.cols": [sum(d[i*13+j] for i in range(7)) for j in range(13)],
    "faed38x15.rows": [sum(f[i*15:(i+1)*15]) for i in range(38)],
    "faed38x15.cols": [sum(f[i*15+j] for i in range(38)) for j in range(15)],
    "faed15x38.rows": [sum(f[i*38:(i+1)*38]) for i in range(15)],
    "faed15x38.cols": [sum(f[i*38+j] for i in range(15)) for j in range(38)],
}

WORDS = set("""the and you that for with this have from they will your what when make like time just know take
send blue set hex net message secret key password private bitcoin btc seed planted half better door another
open matrix sum list yin yang ying choice architect source code one neo truth last word words before enter
inner outer start end begin finish line read verse number prime primes zero zeroed reinsert basics twenty
three sixteen seven cipher ciphers encrypt cause causal consequence salvation door""".split())
def score(s):
    if not s: return (0.0, 0)
    pr = pratio(s.encode("latin-1", "ignore")); up = s.upper()
    return (round(pr, 3), sum(1 for w in WORDS if len(w) >= 4 and w.upper() in up))
MARK = ("SENDTHE", "TOSETHEX", "BLUENET", "BTCSEED", "YINYANG", "YINGYANG", "THESEED", "HALF")

def bigint_to_ascii(dstr):
    try:
        n = int(dstr)
        if n == 0: return ""
        return n.to_bytes((n.bit_length()+7)//8, "big").decode("latin-1")
    except Exception:
        return ""

cands = {}

# ---------- (A) fixed-width renders ----------
for name, L in SUMLISTS.items():
    for w in (2, 3):
        ds = "".join(str(v).zfill(w) for v in L)
        cands["%s|fw%d" % (name, w)] = bigint_to_ascii(ds)
    # also the raw sums joined with separators
    cands["%s|dash" % name] = "-".join(str(v) for v in L)

# ---------- (B) sums as positions: zero-out / insert ----------
def positions(variant, L, n):
    if variant == "mod": pos = sorted({v % n for v in L})
    elif variant == "mod1": pos = sorted({(v-1) % n for v in L})
    elif variant == "raw": pos = sorted({v for v in L if 0 <= v < n})
    elif variant == "raw_r": pos = sorted({v for v in L if 0 <= v < n}, reverse=True)
    else: pos = sorted({v % n for v in L}, reverse=True)
    return pos
for tname, T in (("dbbi", DBBI), ("faed", FAED), ("DF", DBBI+FAED)):
    for lname, L in SUMLISTS.items():
        for variant in ("mod", "mod1", "raw", "raw_r"):
            pos = positions(variant, L, len(T))
            # set-to-zero (replace digit char with '0')
            ts = list(T)
            for p in pos:
                if 0 <= p < len(ts): ts[p] = "0"
            cands["%s|%s|%s|setZ" % (tname, lname, variant)] = bigint_to_ascii("".join(str(dig(ch)[0]) if dig(ch) else "0" for ch in "".join(ts)))
            # insert '0' at positions (descending so indices stay valid)
            ti = list(T)
            for p in sorted(pos, reverse=True):
                if 0 <= p <= len(ti): ti.insert(p, "o")
            cands["%s|%s|%s|ins0" % (tname, lname, variant)] = bigint_to_ascii("".join("0" if ch == "o" else str(dig(ch)[0]) for ch in "".join(ti)))

# ---------- score / markers ----------
scored = []
for name, s in cands.items():
    pr, hits = score(s); scored.append((hits, pr, name, s))
    mk = [x for x in MARK if x in s.upper()]
    if mk: print("MARKER", mk, name, repr(s[:70]))
scored.sort(key=lambda t: (-t[0], -t[1]))
print("candidates:", len(cands))
print("-- top 20 --")
for h, pr, nm, s in scored[:20]:
    print("hits=%2d pr=%.2f %-34s %.70r" % (h, pr, nm, s[:70]))

hits_read = []; tested = 0
for name, s in cands.items():
    if not s: continue
    for form, pw in (("raw", s.encode("latin-1", "ignore")),
                     ("sha256hex", hashlib.sha256(s.encode("latin-1", "ignore")).hexdigest().encode())):
        for bn, (salt, ct) in BLOBS.items():
            for md in ("sha256", "md5"):
                tested += 1
                key, iv = evp(pw, salt, md)
                pl = pkcs7(AES.new(key, AES.MODE_CBC, iv).decrypt(ct))
                if pl is None: continue
                if pratio(pl) >= 0.85:
                    hits_read.append((name, form, bn, md, round(pratio(pl), 2), pl[:120]))
                    print("READABLE-HIT", hits_read[-1])
print("\n== PASS5 SUMMARY == candidates:", len(cands), "AES:", tested, "readable:", len(hits_read))
