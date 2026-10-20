# -*- coding: utf-8 -*-
"""9vw04 H9: fixed-interval skip cipher over the exact announcement text (not the grid).

Pre-registered in LOG.md 2026-10-19 11:47 UTC. Oracle = WIF checksum + target pubkey.
"""
import json, os, hashlib, re, sys, time
import base58
from coincurve import PublicKey

BASE = r"C:\Users\Admin\OneDrive\Desktop\master\puzzles\9vw04-gem-finder"
TWEET = os.path.join(BASE, "data", "external2", "x2", "fx_1870319691295764655.json")
OUT = os.path.join(BASE, "data", "h9_text_skip_result.json")
TARGET = "039d7ce87733444acfde33960964344d8201d2d92ccdad0f5045e40fdcf963475b"
B58 = set("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz")

def check(w):
    try:
        raw = base58.b58decode(w)
    except Exception:
        return None
    if len(raw) != 38 or raw[0] != 0x80 or raw[33] != 0x01:
        return None
    if hashlib.sha256(hashlib.sha256(raw[:34]).digest()).digest()[:4] != raw[34:]:
        return None
    try:
        return PublicKey.from_valid_secret(raw[1:33]).format(compressed=True).hex()
    except Exception:
        return None

def wif_for(secret32):
    payload = b"\x80" + secret32 + b"\x01"
    return base58.b58encode(payload + hashlib.sha256(hashlib.sha256(payload).digest()).digest()[:4]).decode()

def selftest():
    sec = bytes.fromhex("11" * 32)
    w = wif_for(sec)
    pk = PublicKey.from_valid_secret(sec).format(compressed=True).hex()
    assert check(w) == pk, "selftest positive failed"
    bad = w[:-1] + ("2" if w[-1] != "2" else "3")
    assert check(bad) is None, "selftest negative failed"
    return w, pk

# --- sequences ---
t = json.load(open(TWEET, encoding="utf-8"))["tweet"]["raw_text"]["text"]
addr = re.search(r"bc1[a-z0-9]+", t).group(0)
head = t.split("Address")[0].strip()
pre_addr = t[:t.index(addr)].strip()
variants = {
    "raw": t,
    "ascii": t.replace("\u2019", "'").replace("\u2248", "~").replace("\u2b07", ""),
    "pre_address": pre_addr,
    "head_no_address": head,
    "address_only": addr,
    "letters_digits": re.sub(r"[^0-9A-Za-z]", "", t),
    "words": " ".join(re.findall(r"[A-Za-z0-9]+", t)),
    "lower": t.lower(),
    "upper": t.upper(),
    "alnum_lower": re.sub(r"[^0-9a-z]", "", t.lower()),
}
for k in list(variants):
    variants[k + "_rev"] = variants[k][::-1]

WORDS = set("""the and for you all key private bitcoin address funds proof message mirror look wif brian
brain shanks daniel baby step giant rainbow colour color rainbows little small thing found within this
that every nth character something say fixed interval cipher hidden sequence there could be today wanted
do special been many years now loved want chance win best luck everything can be showing incorrect spelling
purpose imagine nine vw four zero""".split())
BIGRAMS = ("th", "he", "in", "er", "an", "re", "on", "at", "en", "nd", "ti", "es", "or", "te", "of", "ed", "is", "it", "al", "ar", "st", "to", "nt", "ng", "se", "ha", "as", "ou", "io", "le", "ve", "co", "me", "de", "hi", "ri", "ro", "ic", "ne", "ea", "ra", "ce", "li", "ch", "ll", "be", "ma", "si", "om", "ur")

def readable_score(s):
    low = s.lower()
    if not re.fullmatch(r"[a-z ]+", low):
        return -1
    wscore = sum(1 for w in re.findall(r"[a-z]+", low) if w in WORDS)
    bscore = sum(low.count(b) for b in BIGRAMS)
    return wscore * 10 + bscore

def main():
    st_w, st_pk = selftest()
    print("selftest OK", st_w, st_pk[:16])
    t0 = time.time()
    tested = 0
    valid = []
    hits = []
    readable = []
    seen = set()

    def consider(w, meta):
        nonlocal tested
        if w in seen:
            return
        seen.add(w)
        tested += 1
        pk = check(w)
        if pk:
            valid.append({"meta": meta, "wif": w, "pub": pk})
            if pk == TARGET:
                hits.append({"meta": meta, "wif": w})

    for name, S in variants.items():
        L = len(S)
        for N in range(2, L):
            for off in range(N):
                sub = S[off::N]
                if len(sub) < 52:
                    break
                # windows of 52 starting at K/L, base58-only
                for i, ch in enumerate(sub[:-51]):
                    if ch not in "KL":
                        continue
                    w = sub[i:i + 52]
                    if all(c in B58 for c in w):
                        consider(w, (name, N, off, i))
                # readability (alphabetic-only subsequences)
                sc = readable_score(sub)
                if sc > 0:
                    readable.append((sc, name, N, off, sub[:160]))
    readable.sort(reverse=True)
    res = {
        "axis": "H9 text skip cipher",
        "source_chars": len(t),
        "selftest_wif": st_w,
        "selftest_pub": st_pk,
        "tested_windows": tested,
        "valid_wif": len(valid),
        "valid": valid[:20],
        "hits": hits,
        "readable_top": [{"score": s, "variant": n, "N": N, "off": o, "text": x} for s, n, N, o, x in readable[:20]],
        "wall_sec": round(time.time() - t0, 2),
    }
    json.dump(res, open(OUT, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print(json.dumps({k: res[k] for k in ("tested_windows", "valid_wif", "hits", "wall_sec")}, ensure_ascii=False))
    print("READABLE TOP:")
    for r in res["readable_top"][:5]:
        print(r["score"], r["variant"], r["N"], r["off"], repr(r["text"][:100]))

if __name__ == "__main__":
    main()
