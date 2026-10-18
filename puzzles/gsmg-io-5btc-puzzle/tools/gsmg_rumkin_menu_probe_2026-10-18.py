# -*- coding: utf-8 -*-
"""BigPickle 2026-10-18. Bounded probe: the Rumkin cipher menu vs the open objects.

Hypothesis + axis were written to LOG.md BEFORE this run (see LOG, "ГИПОТЕЗА И ОСЬ").

Idea: the author used one public cipher tool for every phase; the candidate is the
"Ciphers and Codes" suite by Tyler Akins (rumkin.com/tools/cipher/, self-hosted
mirror scwf.dima.ninja listed in gsmg-archive.org's tool list). Its Bifid has NO
period parameter (period = full length), matching the puzzle's own Bifid step.
Axis: apply that toolset's classical transforms, with default/neutral conventions,
to the objects we hold, and test every result (raw and sha256-hex) as the password
of the four AES blobs; accept only READABLE plaintext (printable >= 0.85 or keyword).

Bounded: single pass, CPU-only, hard 12-min time guard.
"""
import sys, re, base64, hashlib, itertools, time, string
sys.stdout.reconfigure(encoding="utf-8")
T0 = time.time()
GUARD = 720  # seconds

try:
    from Crypto.Cipher import AES
except Exception:
    print("pycryptodome missing"); sys.exit(1)

BASE = r"C:\Users\Admin\OneDrive\Desktop\master\puzzles\gsmg-io-5btc-puzzle"
DATA = BASE + r"\data"
GH = DATA + r"\github_2026-10\HosterjackAGV__gsmg-5btc-puzzle"

# ---------------- EVP + AES ----------------
def evp(pw, salt, md, kl=32, il=16):
    d, prev = b"", b""
    while len(d) < kl + il:
        prev = hashlib.new(md, prev + pw + salt).digest(); d += prev
    return d[:kl], d[kl:kl+il]

def pkcs7(b):
    if not b: return None
    n = b[-1]
    return b[:-n] if 1 <= n <= 16 and b[-n:] == bytes([n])*n else None

def printable_ratio(b):
    return sum(1 for x in b if 32 <= x < 127 or x in (9,10,13)) / max(1, len(b))

# ---------------- blobs ----------------
def load_salted(path):
    s = open(path, encoding="utf-8", errors="ignore").read()
    m = re.search(r"U2FsdGVkX1[A-Za-z0-9+/=\s]{20,}", s)
    if m:
        b64 = re.sub(r"\s", "", m.group(0))
        raw = base64.b64decode(b64 + "=" * (-len(b64) % 4))
        if raw[:8] == b"Salted__": return raw
    return None

BLOBS = {}
raw = load_salted(GH + r"\ciphertexts__cosmic.txt")
if raw: BLOBS["cosmic"] = (raw[8:16], raw[16:])
with open(DATA + r"\urlblob_4th_salt_74c974e3.bin", "rb") as f:
    raw = f.read()
BLOBS["urlblob"] = (raw[8:16], raw[16:])
SP = base64.b64decode("U2FsdGVkX186tYU0hVJBXXUnBUO7C0+X4KUWnWkCvoZSxbRD3wNsGWVHefvdrd9z"
                      "QvX0t8v3jPB4okpspxebRi6sE1BMl5HI8Rku+KejUqTvdWOX6nQjSpepXwGuN/jJ")
IN = base64.b64decode("U2FsdGVkX1+0Wl49gnWTyiimluu7V3+vl7st0gUt9sWDzNLxDmlPMsDSiuW2a46z"
                      "gKlIi8aaqY5gpJPPEzW1n9n3/26qs4zstWtPKF8Zs/BTNN4IiEh4qu18mdC0NAv4")
BLOBS["salph_inner"] = (SP[8:16], SP[16:])
BLOBS["inner32"] = (IN[8:16], IN[16:])
print("blobs:", {k: len(v[1]) for k, v in BLOBS.items()})

# ---------------- objects ----------------
s570 = open(DATA + r"\s570_bifid_2026-10-17.txt", encoding="utf-8").read()
def field(name):
    m = re.search(name + r".*?\n([A-Z]+)", s570)
    return m.group(1) if m else ""
BIFID570 = field("BIFID570")
ODD = field("ODD285")
KEPT = field("KEPT256")
DROPPED = "OOIIOOOIIOOIOIIOIOOOOIOIIOIOI"
EVEN = open(DATA + r"\s570_even285_2026-10-18.txt", encoding="utf-8").read().split("\n", 1)[1].strip()

# dbbi(91) + faed(570) from the archive's SalPhaseIon textarea
arch = open(DATA + r"\github_2026-10\_web\gsmg-archive.org_index.html", encoding="utf-8", errors="ignore").read()
m = re.search(r'id="section-salphaseion".*?<textarea[^>]*>(.*?)</textarea>', arch, re.S)
sp_text = re.sub(r"\s+", "", m.group(1)) if m else ""
DBBI = sp_text[:91]
FAED = sp_text[91:91+570]
print("objects: BIFID570=%d ODD=%d KEPT=%d DROP=%d EVEN=%d dbbi=%d faed=%d" %
      (len(BIFID570), len(ODD), len(KEPT), len(DROPPED), len(EVEN), len(DBBI), len(FAED)))

OBJ = {"BIFID570": BIFID570, "ODD285": ODD, "KEPT256": KEPT, "DROPPED29": DROPPED,
       "EVEN_BCDE": EVEN, "dbbi91": DBBI, "faed570": FAED}

# ---------------- transforms (Rumkin menu) ----------------
LETTERS = string.ascii_uppercase
def letters_only(s): return "".join(c for c in s.upper() if c in LETTERS)

def t_ident(s): return {"IDENT": s}
def t_rev(s): return {"REV": s[::-1]}
def t_case(s): return {"LOWER": s.lower(), "UPPER": s.upper()}
def t_atbash(s):
    return {"ATBASH": "".join(LETTERS[25-LETTERS.index(c)] if c in LETTERS else c for c in s.upper())}
def t_caesar(s):
    o = {}
    L = letters_only(s)
    for n in range(1, 26):
        o["CAESAR%d" % n] = "".join(LETTERS[(LETTERS.index(c)+n) % 26] for c in L)
        o["CAESARD%d" % n] = "".join(LETTERS[(LETTERS.index(c)-n) % 26] for c in L)
    return o
def t_affine(s):
    o = {}; L = letters_only(s)
    for a in (1,3,5,7,9,11,15,17,19,21,23,25):
        ainv = pow(a, -1, 26)
        for b in range(26):
            o["AFF%dx%d" % (a,b)] = "".join(LETTERS[(a*LETTERS.index(c)+b) % 26] for c in L)
            o["AFFD%dx%d" % (a,b)] = "".join(LETTERS[(ainv*(LETTERS.index(c)-b)) % 26] for c in L)
    return o
def t_letternum(s):
    o = {}; L = letters_only(s)
    o["LN2"] = "".join("%02d" % (LETTERS.index(c)+1) for c in L)
    o["LN1"] = "".join(str(LETTERS.index(c)+1) for c in L)
    return o
# Bifid (no period -> full length) with unkeyed + keyed squares
def sq_from(key):
    alpha = [c for c in "ABCDEFGHIKLMNOPQRSTUVWXYZ"]
    seen = []
    for c in (key or "").upper():
        if c in alpha and c not in seen: seen.append(c)
    for c in alpha:
        if c not in seen: seen.append(c)
    return [seen[i*5:(i+1)*5] for i in range(5)]
def bifid_dec(s, sq):
    pos = {sq[r][c]: (r,c) for r in range(5) for c in range(5)}
    L = [c for c in s.upper() if c in pos]
    if not L: return ""
    flat = [v for c in L for v in pos[c]]; n = len(L)
    rows, cols = flat[:n], flat[n:]
    return "".join(sq[rows[i]][cols[i]] for i in range(n))
def bifid_enc(s, sq):
    pos = {sq[r][c]: (r,c) for r in range(5) for c in range(5)}
    L = [c for c in s.upper() if c in pos]
    if not L: return ""
    flat = [v for c in L for v in pos[c]]; n = len(L)
    rows, cols = flat[:n], flat[n:]
    comb = []
    for i in range(n): comb += [rows[i], cols[i]]
    return "".join(sq[comb[2*j]][comb[2*j+1]] for j in range(n))
def t_bifid(s):
    o = {}
    for kname, key in (("UNK",""),("DBIF","DBIFHCEG"),("YBP","YELLOWBLUEPRIMES"),
                       ("MSL","MATRIXSUMLIST"),("LWS","LASTWORDSBEFOREARCHICHOICE"),
                       ("YY","YINYANG")):
        sq = sq_from(key)
        o["BIFD_"+kname] = bifid_dec(s, sq)
        o["BIFE_"+kname] = bifid_enc(s, sq)
    return o
def t_railfence(s):
    o = {}; L = letters_only(s)
    def dec(L, rails):
        n = len(L); pat = [0]*n; r=0; step=1; rows=[]
        for i in range(n):
            pat[i]=r
            if r==0: step=1
            elif r==rails-1: step=-1
            r+=step
        cnt=[pat.count(k) for k in range(rails)]
        pos=[0]*rails
        for k in range(1,rails): pos[k]=pos[k-1]+cnt[k-1]
        idx=[0]*n
        for i in range(n):
            idx[i]=pos[pat[i]]; pos[pat[i]]+=1
        out=[None]*n
        out_by=[L[i] for i in range(n)]
        res=[None]*n
        for i in range(n): res[idx[i]] = L[i]
        return "".join(res)
    for rails in range(2, 9):
        try: o["RAIL%d"%rails] = dec(L, rails)
        except Exception: pass
    return o
def t_rotate(s):
    o = {}; L = letters_only(s)
    for w in range(2, 33):
        rows = [L[i:i+w] for i in range(0, len(L), w)]
        rows = [r.ljust(w, "X") for r in rows]
        for times in (1,2,3):
            if w and rows:
                grid = rows
                for _ in range(times):
                    grid = ["".join(grid[r][c] for r in range(len(grid)-1, -1, -1)) for c in range(w)]
                o["ROT%d_%d" % (w, times)] = "".join(grid)
    return o
def t_skip(s):
    o = {}; L = letters_only(s); n = len(L)
    if n == 0: return o
    for k in range(2, 49):
        for off in range(k):
            out = []
            i = off
            for _ in range(n):
                out.append(L[i % n]); i += k
            o["SKIP%d_%d" % (k, off)] = "".join(out)
    return o
def t_xor(s):
    o = {}; L = letters_only(s)
    for kn, key in (("YY","YINYANG"),("YBP","YELLOWBLUEPRIMES"),("MSL","MATRIXSUMLIST"),
                    ("LWS","LASTWORDSBEFOREARCHICHOICE"),("S1","2D3F6FE06DC950E6"),
                    ("S2","3AB585348552415D")):
        out = "".join(chr((ord(c) ^ ord(key[i % len(key)])) % 26 + 65) for i, c in enumerate(L))
        o["XOR_"+kn] = out
    return o
def t_decode(s):
    o = {}
    for name, fn in (("B64", lambda x: base64.b64decode(x + "="*(-len(x)%4))),
                     ("B32", lambda x: base64.b32decode(x + "="*(-len(x)%8))),
                     ("B16", lambda x: bytes.fromhex(x))):
        try:
            b = fn(s)
            if b: o["DEC_"+name] = b.decode("latin-1")
        except Exception: pass
    return o

TRANSFORMS = [t_ident, t_rev, t_case, t_atbash, t_caesar, t_affine, t_letternum,
              t_bifid, t_railfence, t_rotate, t_skip, t_xor, t_decode]

# ---------------- engine ----------------
KEYWORDS = (b"ying", b"yang", b"salv", b"btcseed", b"the private", b"neighbors",
            b"half", b"WIF", b"5K", b"HASHTHETEXT", b"yellowblue")
readable_hits = []
pad_collisions = 0
tested = 0
out_total = 0
stop = False
for oname, obj in OBJ.items():
    if stop or not obj: continue
    print("...object", oname, "len", len(obj), "t=%.0fs" % (time.time()-T0))
    for tf in TRANSFORMS:
        if stop: break
        try:
            outs = tf(obj)
        except Exception as e:
            continue
        for tname, T in outs.items():
            if not T: continue
            out_total += 1
            # plaintext keyword scan of the transform output itself
            TU = T.upper().encode("latin-1", "ignore")
            if any(k.upper() in TU for k in KEYWORDS):
                print("KW-IN-OUT %s/%s: %.60r" % (oname, tname, T[:60]))
            cands = []
            try:
                cands.append((("raw"), T.encode("latin-1", "ignore")))
                cands.append((("sha256hex"), hashlib.sha256(T.encode("latin-1", "ignore")).hexdigest().encode()))
            except Exception:
                pass
            for form, pw in cands:
                for bname, (salt, ct) in BLOBS.items():
                    for md in ("sha256", "md5"):
                        tested += 1
                        key, iv = evp(pw, salt, md)
                        pt = AES.new(key, AES.MODE_CBC, iv).decrypt(ct)
                        pl = pkcs7(pt)
                        if pl is None: continue
                        pad_collisions += 1
                        pr = printable_ratio(pl)
                        if pr >= 0.85 or any(k.upper() in pl.upper() for k in KEYWORDS):
                            rec = (oname, tname, form, bname, md, round(pr,2), pl[:120])
                            readable_hits.append(rec)
                            print("READABLE-HIT", rec)
            if time.time()-T0 > GUARD:
                print("TIME GUARD hit"); stop = True; break

print("\n== SUMMARY ==")
print("transform outputs:", out_total, "AES tests:", tested,
      "valid-padding:", pad_collisions, "readable hits:", len(readable_hits),
      "elapsed %.1fs" % (time.time()-T0))
