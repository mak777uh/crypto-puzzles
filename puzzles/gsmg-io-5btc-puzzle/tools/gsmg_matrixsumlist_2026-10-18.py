# -*- coding: utf-8 -*-
"""BigPickle 2026-10-18, pass 4. Road-map step `matrixsumlist` (+ `yinyang` dual).
Hypothesis+axis written to LOG.md BEFORE the run.

Structural fit: dbbi=91=13x7 (=len('matrixsumlist') x len('yinyang')),
faed=570=38x15 (38=len('lastwordsbeforearchichoice')+len('thispassword')).
Interpret road-map names as OPERATIONS: `matrixsumlist` = list of matrix row sums;
`yinyang` = the dual (column sums).

Digitize dbbi/faed (a..i -> 1..9), lay as the named shapes, take row/col sums,
render canonically, score objectively (printable ratio + English dictionary hits +
community markers SENDTHE/TOSETHEX/BLUENET/BTCSEED/YINYANG), and test every
letter/digit output as a password of the 4 AES blobs (raw + sha256-hex).
Bounded, CPU-only, <=15 min. NO tuning toward 'SENDTHE'.
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

# ---- objects ----
arch = open(GH.replace("HosterjackAGV__gsmg-5btc-puzzle", r"_web\gsmg-archive.org_index.html"),
            encoding="utf-8", errors="ignore").read()
m = re.search(r'id="section-salphaseion".*?<textarea[^>]*>(.*?)</textarea>', arch, re.S)
sp_text = re.sub(r"\s+", "", m.group(1)) if m else ""
DBBI = sp_text[:91]
FAED = sp_text[91:91+570]
assert len(DBBI) == 91 and len(FAED) == 570, (len(DBBI), len(FAED))

AZ = string.ascii_uppercase
def digitize(s):           # a..i -> 1..9  (rest dropped)
    return [ord(c) - ord('a') + 1 for c in s.lower() if 'a' <= c <= 'i']
def mats(seq, r, c):
    assert r*c == len(seq)
    return [seq[i*c:(i+1)*c] for i in range(r)]
def rowsums(seq, r, c): return [sum(row) for row in mats(seq, r, c)]
def colsums(seq, r, c): return [sum(seq[i*c+c2] for i in range(r)) for c2 in range(c)]

# ---- rendering ----
def render(nums, tag):
    out = {}
    n = len(nums)
    out[tag + "|m26a"] = "".join(AZ[(v-1) % 26] for v in nums)
    out[tag + "|m26b"] = "".join(AZ[v % 26] for v in nums)
    out[tag + "|m9"] = "".join(str(v % 9) for v in nums)
    out[tag + "|m10"] = "".join(str(v % 10) for v in nums)
    ds = "".join(str(v) for v in nums)
    out[tag + "|catdec"] = ds
    try:
        b = int(ds).to_bytes((int(ds).bit_length()+7)//8, "big")
        out[tag + "|cathex_ascii"] = b.decode("latin-1")
    except Exception: pass
    for nm, d in (("m10", "".join(str(v % 10) for v in nums)), ("m9", "".join(str(v % 9) for v in nums))):
        try:
            b = int(d).to_bytes((int(d).bit_length()+7)//8, "big")
            out[tag + "|" + nm + "_hexascii"] = b.decode("latin-1")
        except Exception: pass
    try:
        out[tag + "|bytes"] = bytes(v % 256 for v in nums).decode("latin-1")
    except Exception: pass
    return out

WORDS = set("""the and you that for with this have from they will your what when make like time just know take
people into year good some could them see other than then now look only come its over think also back after use
two how our work first well way even new want because any these give day most us man find here thing many well
send blue set hex hexcode blue net sending message secret key keys password private bitcoin btc seed planted
half better door another open matrix sum list yin yang ying choice architect source code one neo soul truth
last word words before after enter inner outer top bottom left right start end begin finish line read reading
verse number numbers prime primes zero zeroed reinsert basics twenty three sixteen seven cipher ciphers encrypt
""".split())
def score(s):
    if not s: return (0.0, 0)
    pr = pratio(s.encode("latin-1", "ignore"))
    up = s.upper()
    hits = sum(1 for w in WORDS if len(w) >= 4 and w.upper() in up)
    return (round(pr, 3), hits)
MARKERS = ("SENDTHE", "TOSETHEX", "BLUENET", "BTCSEED", "YINYANG", "YINGYANG", "THESEED", "HALF", "BETTERHALF")

# ---- build candidate family ----
cands = {}   # name -> string
d_dig = digitize(DBBI); f_dig = digitize(FAED)
print("digits: dbbi=%d faed=%d" % (len(d_dig), len(f_dig)))
shapes = []
for (r, c, src, tag) in [(13, 7, d_dig, "dbbi13x7"), (7, 13, d_dig, "dbbi7x13"),
                         (38, 15, f_dig, "faed38x15"), (15, 38, f_dig, "faed15x38")]:
    try:
        rs = rowsums(src, r, c); cs = colsums(src, r, c)
        cands.update(render(rs, tag + ".rows"))
        cands.update(render(cs, tag + ".cols"))
        shapes.append((tag, len(rs), len(cs), rs, cs))
    except AssertionError:
        print("shape fail", tag)
# combinations of dbbi-list and faed-list (XOR / add / sub mod26)  -- bounded
dl = {tag: rs for (tag, nr, nc, rs, cs) in shapes if tag.startswith("dbbi")}
fl = {tag: rs for (tag, nr, nc, rs, cs) in shapes if tag.startswith("faed")}
for dn, dlist in dl.items():
    for fn, flist in fl.items():
        for opn, op in (("xor", lambda a, b: a ^ b), ("add", lambda a, b: (a+b) % 26), ("sub", lambda a, b: (a-b) % 26)):
            comb = [op(dlist[i % len(dlist)], flist[i]) for i in range(len(flist))]
            cands.update(render(comb, "%s+%s.%s" % (dn, fn, opn)))
# also dbbi 13x7 full digit string as 91 digit -> keep as candidate pw

print("candidate strings:", len(cands))

# ---- score + markers ----
scored = []
for name, s in cands.items():
    pr, hits = score(s)
    scored.append((hits, pr, name, s))
    mk = [m for m in MARKERS if m in s.upper()]
    if mk:
        print("MARKER %s -> %s : %.70r" % (mk, name, s[:70]))
scored.sort(key=lambda t: (-t[0], -t[1]))
print("\n-- top 15 by (dictionary hits, printable) --")
for hits, pr, name, s in scored[:15]:
    print("hits=%2d pr=%.2f %-28s %.80r" % (hits, pr, name, s[:80]))

# ---- blob password test on every candidate (raw + sha256hex) ----
hits_read = []
tested = 0
for name, s in cands.items():
    for form, pw in (("raw", s.encode("latin-1", "ignore")),
                     ("sha256hex", hashlib.sha256(s.encode("latin-1", "ignore")).hexdigest().encode())):
        if not pw: continue
        for bn, (salt, ct) in BLOBS.items():
            for md in ("sha256", "md5"):
                tested += 1
                key, iv = evp(pw, salt, md)
                pl = pkcs7(AES.new(key, AES.MODE_CBC, iv).decrypt(ct))
                if pl is None: continue
                if pratio(pl) >= 0.85:
                    hits_read.append((name, form, bn, md, round(pratio(pl), 2), pl[:120]))
                    print("READABLE-HIT", hits_read[-1])
print("\n== MATRIXSUMLIST SUMMARY ==")
print("candidates:", len(cands), "AES tests:", tested, "readable:", len(hits_read),
      "elapsed %.1fs" % (time.time()-T0))
