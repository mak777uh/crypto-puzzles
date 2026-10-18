# -*- coding: utf-8 -*-
"""BigPickle 2026-10-18. Two NEW leads from the floflo/HosterjackAGV 2026-10 corpus.

LEAD A (O10, "4th orphaned blob"): recover urlblob.bin from the hex 'Salted__'
gsmg.io URL path recorded in the Wayback CDX (capture 2026-01-05):
  gsmg.io/53616c7465645f5f74c974e3f92e64b5....0607
Expected: 112 bytes = 'Salted__' + salt 74c974e3f92e64b5 + 96-byte ct.
This artifact is NOT committed in HosterjackAGV's repo; we reproduce it from the
CDX string and store it. Then: shape check, block-overlap vs the other blobs,
and a small insight battery of candidate keys (soup tokens, the 2026 endgame
vocabulary, sha256 forms) under EVP {sha256,md5} watching for valid PKCS7.

LEAD B (yinyang as a DECODE OUTPUT): the Bifid decode of FAED570 yields a 570-char
plaintext starting BTCSEED. Its ODD positions -> 285 -> 256 object (the known
object-256). The EVEN positions -> the other 285 = the natural "yang" complement
of the "yin" odd stream. Hypothesis: that even stream is the still-unknown
'yinyang' output, or a key/ingredient. Test both streams (raw, sha256) as AES
passwords against all 4 blobs, and print the even stream for reading.
"""
import sys, base64, hashlib, itertools, time
sys.stdout.reconfigure(encoding="utf-8")
T0 = time.time()

DATA = r"C:\Users\Admin\OneDrive\Desktop\master\puzzles\gsmg-io-5btc-puzzle\data"

def evp(pw, salt, md, key_len=32, iv_len=16):
    d, prev = b"", b""
    while len(d) < key_len + iv_len:
        prev = hashlib.new(md, prev + pw + salt).digest()
        d += prev
    return d[:key_len], d[key_len:key_len+iv_len]

def strip(b):
    if not b:
        return None
    n = b[-1]
    if 1 <= n <= 16 and b[-n:] == bytes([n])*n:
        return b[:-n]
    return None

try:
    from Crypto.Cipher import AES
    HAVE_AES = True
except Exception:
    HAVE_AES = False

BLOBS = {}
def add_blob(name, raw):
    assert raw[:8] == b"Salted__", (name, raw[:20])
    BLOBS[name] = (raw[8:16], raw[16:])
    print("%-14s %4d bytes salt=%s ct=%d" % (name, len(raw), raw[8:16].hex(), len(raw[16:])))

# --- LEAD A: 4th blob from the CDX hex URL (captured 2026-01-05) ---
HEX = ("53616c7465645f5f74c974e3f92e64b59f7ea22a50dcb0d4289d176d4ce9dba7f"
       "99a695b8d0797b5c7791e65a8d2b68a5879f5d31ae5e8a2635205de31b851cf4"
       "3b2534f58765696d3c2a01f7f3a41f7284fbbcc836517cbf7ba613c43a919d9d"
       "c669e4824baba6a5caeb77dfc3e0607")
urlblob = bytes.fromhex(HEX)
print("urlblob hex len(bytes):", len(urlblob))
add_blob("urlblob", urlblob)
# store artifact (atomic-ish: write then nothing else)
with open(DATA + r"\urlblob_4th_salt_74c974e3.bin", "wb") as f:
    f.write(urlblob)
with open(DATA + r"\urlblob_4th_salt_74c974e3.b64.txt", "w", encoding="ascii") as f:
    f.write(base64.b64encode(urlblob).decode())

# other known blobs (SalPhaseIon small = SP, inner 3.2 = INNER32; cosmic/p32 from files)
SP_B64 = ("U2FsdGVkX186tYU0hVJBXXUnBUO7C0+X4KUWnWkCvoZSxbRD3wNsGWVHefvdrd9z"
          "QvX0t8v3jPB4okpspxebRi6sE1BMl5HI8Rku+KejUqTvdWOX6nQjSpepXwGuN/jJ")
INNER32_B64 = ("U2FsdGVkX1+0Wl49gnWTyiimluu7V3+vl7st0gUt9sWDzNLxDmlPMsDSiuW2a46z"
               "gKlIi8aaqY5gpJPPEzW1n9n3/26qs4zstWtPKF8Zs/BTNN4IiEh4qu18mdC0NAv4")
add_blob("SP_small", base64.b64decode(SP_B64))
add_blob("INNER32", base64.b64decode(INNER32_B64))

import os, re
GH = DATA + r"\github_2026-10\HosterjackAGV__gsmg-5btc-puzzle"
def load_ct(fn):
    p = os.path.join(GH, fn)
    if not os.path.exists(p):
        return None
    s = open(p, encoding="utf-8", errors="ignore").read()
    s = re.sub(r"[^A-Za-z0-9+/=]", "", s)
    # try base64
    for cut in (0,):
        try:
            raw = base64.b64decode(s + "=" * (-len(s) % 4))
            if raw[:8] == b"Salted__":
                return raw
        except Exception:
            pass
    # try hex
    h = re.sub(r"[^0-9a-fA-F]", "", open(p, encoding="utf-8", errors="ignore").read())
    if len(h) % 2 == 0 and h[:16].lower() == "53616c7465645f5f":
        return bytes.fromhex(h)
    return None
for fn, nm in (("ciphertexts__cosmic.txt", "cosmic"),
               ("ciphertexts__phase32.txt", "p32_page"),
               ("ciphertexts__salphaseion.txt", "sp_page"),
               ("ciphertexts__urlblob.txt", "urlblob_txt")):
    raw = load_ct(fn)
    if raw:
        try:
            add_blob(nm, raw)
        except AssertionError:
            print(nm, "load: not Salted__", raw[:12])

# block overlap vs the other known blobs
def blocks(b):
    ct = b[16:]
    return {ct[i:i+16] for i in range(0, len(ct), 16)}

url_blocks = blocks(urlblob)
for nm, (salt, ct) in BLOBS.items():
    if nm == "urlblob":
        continue
    inter = url_blocks & blocks(b"Salted__" + salt + ct)
    print("urlblob∩%-10s shared ct blocks: %d" % (nm, len(inter)))
print("urlblob distinct ct blocks:", len(url_blocks))

# --- search the two base64-looking CDX paths ---
B64PATHS = {
    "iXJ8WYuc0c+Ic/J8twV/BQZF3banoVehECOawBUvajI=":
        "iXJ8WYuc0c+Ic/J8twV/BQZF3banoVehECOawBUvajI=",
    "k27RwIKbkYlwcerFhyUy_SpThDLmjxDDiAOBzqhbtFEj...":
        ("k27RwIKbkYlwcerFhyUy_SpThDLmjxDDiAOBzqhbtFEj-0lg4HVQhrMqtPLWD0pE8_"
         "e7gplJIe87L7znhl6n-fW2RAMPY4jreE9rWxsp2AYJxBL6H9P9ARWZ9uUnXR9jVYOnV"
         "4L9MrUnhCGJ5D1GcpCh2V9b7UWfx1XDY2TZ0hs="),
}
for name, s in B64PATHS.items():
    try:
        raw = base64.urlsafe_b64decode(s + "=" * (-len(s) % 4))
        print("\n[%s] -> %d bytes" % (name[:24], len(raw)))
        print("  hex:", raw.hex()[:128], ("..." if len(raw) > 64 else ""))
        try:
            print("  ascii:", raw.decode("latin-1")[:120])
        except Exception:
            pass
    except Exception as e:
        print("[%s] b64 fail: %s" % (name[:24], e))

# --- LEAD B: even stream of BIFID570 ---
BIFID570 = ("BTCSEEDDEOEMCKEADHBSCHDKBDCSDKDVBXCPCOCHCRDICIBQEEBDDBCNDSBDCPDGCPDNCN"
            "CSESCGDDCLENBMCUDUCQCACDELDZELCMEFDFESDODWCKBYCUBWBAESBWBNEMEDEADOBRCPBGBQ"
            "COEGBSENESBLBTESDADPDUESCPCREACNCKCSCDCNBEDKCKCTCLBRENENCCEGELCNCUBSBGESEIE"
            "NDUEFDDBACKDNBSDSESCRBSEBBLBIERDVCOBDCCEGBSEOBVBVCDEMCPCSCGELDIEGDADWDYCACP"
            "EGENBYEBCGCLCRDBBRDGDBDMERCNCGDTCDBNCFCLCPDNBRBBEBCNEREREMELDSDADLENCQBOCHD"
            "QDGBXEGCFCUEEEIDACIEADOCTDNEIEGDEELDEELBMCKEDBBEACMCODREMCCCMCSCGDBCOCMDTDL"
            "BMCDBMBMDPBSDNBSDYEOEOCIENBSEOBICBBBCNCNECDUCIBECCCGDOCMEEDUBNDEELBLBACPCPC"
            "MDXDXDRDGCBCMDNDRDDECDWEADHBTDICQCPDOEFDHDGDXDPCIEL")
assert len(BIFID570) == 570, len(BIFID570)
odd  = BIFID570[0::2]   # positions 1,3,5,... (1-based odd)  -> BIFID570[0::2]
even = BIFID570[1::2]
print("\nBIFID570 odd=%d even=%d" % (len(odd), len(even)))
print("odd  alphabet:", "".join(sorted(set(odd))))
print("even alphabet:", "".join(sorted(set(even))))
print("EVEN285:", even)
print("even sha256hex:", hashlib.sha256(even.encode()).hexdigest())
open(DATA + r"\s570_even285_2026-10-18.txt", "w", encoding="utf-8").write(
    "EVEN285 (positions 2,4,6,... of BIFID570)\n" + even + "\n")

# --- candidate battery vs all blobs (small, insight-narrowed) ---
CANDS = set()
def add(x):
    if x:
        CANDS.add(x)

# endgame vocabulary + tokens + novel artifacts
for t in ["yinyang","ying yang","yin yang","yin","yang","yin-yang","YINYANG",
          "yellowblueprimes","matrixsumlist","lastwordsbeforearchichoice",
          "thispassword","enter","shabef","anstoo","thecosmicduality","cosmicduality",
          "Cosmic Duality","cosmic","duality","heisenberg","nebuchadnezzar",
          "theredpill","bluered","yellowblue","infrared","theoryofeverything",
          "BTCSEED","btcseed","theseedisplanted","gsmg","GSMG","104","140","101010",
          "ascii127","DEL","fefefe","#fefefe"]:
    add(t); add(t.lower()); add(t.upper())
    add(hashlib.sha256(t.encode()).hexdigest())
# the even stream and its forms
add(even); add(even[::-1]); add(hashlib.sha256(even.encode()).hexdigest())
add(odd); add(odd[::-1])
add("".join(ch for ch in even if ch not in "IO"))
# the urlblob hex / salt / the two base64 paths
add(HEX); add(HEX.upper()); add("74c974e3f92e64b5"); add("74c974e3")
for s in B64PATHS.values():
    add(s); add(hashlib.sha256(s.encode()).hexdigest())
# concatenations of the master-hint ingredients
ING = ["yellowblueprimes","matrixsumlist","lastwordsbeforearchichoice","yinyang"]
for perm in itertools.permutations(ING):
    for sep in ["", ".", " ", "-", "_", ","]:
        add(sep.join(perm))
print("\ncandidates:", len(CANDS))

if HAVE_AES:
    hits = []; cnt = 0
    for nm, (salt, ct) in BLOBS.items():
        for c in CANDS:
            for md in ("sha256","md5"):
                key, iv = evp(c.encode(), salt, md)
                cnt += 1
                pt = AES.new(key, AES.MODE_CBC, iv).decrypt(ct)
                pl = strip(pt)
                if pl is not None:
                    # report any valid-padding decryption (rare) for manual read
                    printable = sum(1 for b in pl if 32 <= b < 127)/max(1,len(pl))
                    print("PAD-OK %-8s %-5s cand=%.40r plain=%.80r printable=%.2f"
                          % (nm, md, c, pl, printable))
                    hits.append((nm, md, c, pl))
    print("AES tests:", cnt, "valid-padding:", len(hits), "elapsed %.1fs" % (time.time()-T0))
else:
    print("no pycryptodome")
