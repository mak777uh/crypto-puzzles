# -*- coding: utf-8 -*-
"""BigPickle 2026-10-18. Bounded probe (<<15 min) on the newly recovered 4th blob.

Hypothesis (insight axis): urlblob (salt 74c974e3f92e64b5, 96-byte ct) is the
creator's "another door"; its password is an object we ALREADY hold, so the
candidate pool = decoded walkthrough answers + the SalPhaseIon decoded objects
+ the S570 Bifid streams + the two Mystery strings, in raw and sha256-hex forms,
under EVP {sha256, md5}. Any PKCS7-valid plaintext is printed for reading.

Certified oracle: EVP_BytesToKey + AES-256-CBC + PKCS7 (matches floflo oracle.py).
This is a bounded probe, not a sweep: ~a few thousand tests.
"""
import sys, base64, hashlib, itertools, time, re
sys.stdout.reconfigure(encoding="utf-8")
T0 = time.time()
try:
    from Crypto.Cipher import AES
except Exception:
    AES = None

DATA = r"C:\Users\Admin\OneDrive\Desktop\master\puzzles\gsmg-io-5btc-puzzle\data"
def evp(pw, salt, md, kl=32, il=16):
    d, prev = b"", b""
    while len(d) < kl + il:
        prev = hashlib.new(md, prev + pw + salt).digest(); d += prev
    return d[:kl], d[kl:kl+il]
def strip(b):
    if not b: return None
    n = b[-1]
    return b[:-n] if 1 <= n <= 16 and b[-n:] == bytes([n])*n else None

URLBLOB = bytes.fromhex(("53616c7465645f5f74c974e3f92e64b59f7ea22a50dcb0d4289d176d4ce9dba7f"
                         "99a695b8d0797b5c7791e65a8d2b68a5879f5d31ae5e8a2635205de31b851cf4"
                         "3b2534f58765696d3c2a01f7f3a41f7284fbbcc836517cbf7ba613c43a919d9d"
                         "c669e4824baba6a5caeb77dfc3e0607"))
salt, ct = URLBLOB[8:16], URLBLOB[16:]

# ---- objects we hold ----
S570_BIFID = open(DATA + r"\s570_bifid_2026-10-17.txt", encoding="utf-8").read()
def field(name, s=S570_BIFID):
    m = re.search(name + r".*?\n([A-Z]+)", s)
    return m.group(1) if m else ""
ODDTSED = field("ODD285")     # the full-alphabet stream with I/O
KEPT256 = field("KEPT256")
DROPPED = "OOIIOOOIIOOIOIIOIOOOOIOIIOIOI"
EVEN_BCDE = open(DATA + r"\s570_even285_2026-10-18.txt", encoding="utf-8").read().split("\n",1)[1].strip()

ANS = [
 # stage answers / decoded tokens (raw strings)
 "theflowerblossomsandpushesthroughconcretesurface","causality","giveitjustonesecond",
 "matrixsumlist","enter","lastwordsbeforearchichoice","thispassword","shabef","anstoo",
 "ourfirsthintisyourlastcommand","jacquefresco","yellowblueprimes","yinyang","ying yang",
 "theseedisplanted","gsmg.io/theseedisplanted","GSMG1JC9wtdSwfwApgj2xcmJPAwx7prBe",
 "1GSMG1JC9wtdSwfwApgj2xcmJPAwx7prBe","89727c598b9cd1cf8873f27cb7057f050645ddb6a7a157a110239ac0152f6a32",
 "GSMGIO5BTCPUZZLECHALLENGE1GSMG1JC9wtdSwfwApgj2xcmJPAwx7prBe",
 "shabefourfirsthintisyourlastcommand","iXJ8WYuc0c+Ic/J8twV/BQZF3banoVehECOawBUvajI=",
 "53616c7465645f5f74c974e3f92e64b5","74c974e3f92e64b5","74c974e3",
 "2d3f6fe06dc950e6","3ab585348552415d","b45a5e3d827593ca","eefc4c5befc1656a","9fbc451d13d071f4",
]
OBJ = [ODDTSED, KEPT256, DROPPED, EVEN_BCDE]
cands = set()
for t in ANS + OBJ:
    if not t: continue
    cands.add(t); cands.add(t.upper()); cands.add(t.lower())
    cands.add(hashlib.sha256(t.encode()).hexdigest())
    cands.add(hashlib.sha256(t.encode()).digest().hex())
    cands.add(hashlib.sha256(t.encode()).digest().decode("latin-1"))
# salt permutations (all 4 salts, 24 orders, joined) — cheap, matches Hosterjack's family
SALTS = ["2d3f6fe06dc950e6","3ab585348552415d","b45a5e3d827593ca","74c974e3f92e64b5"]
for perm in itertools.permutations(SALTS):
    cands.add("".join(perm)); cands.add(hashlib.sha256("".join(perm).encode()).hexdigest())
print("candidates:", len(cands))

hits = []
if AES:
    cnt = 0; padok = 0
    for c in cands:
        for md in ("sha256","md5"):
            key, iv = evp(c.encode("latin-1"), salt, md); cnt += 1
            pt = AES.new(key, AES.MODE_CBC, iv).decrypt(ct)
            pl = strip(pt)
            if pl is not None:
                padok += 1
                pr = sum(1 for b in pl if 32 <= b < 127)/max(1,len(pl))
                print("PAD-OK %-5s cand=%.36r plain=%.64r printable=%.2f" % (md, c, pl, pr))
                if pr > 0.90:
                    hits.append((md, c, pl))
    print("urlblob tests:", cnt, "valid-padding:", padok, "printable>0.9:", len(hits))
else:
    print("no AES")
print("elapsed %.1fs" % (time.time()-T0))
