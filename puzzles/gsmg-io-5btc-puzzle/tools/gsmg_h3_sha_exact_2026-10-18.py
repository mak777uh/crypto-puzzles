# -*- coding: utf-8 -*-
"""GSMG H3: приватный ключ приза = sha256(текст)?  (инструкция «HASHTHETEXT»)

Тестируются ТОЧНЫЕ тексты пазла (монолог Архитектора, VIC-выход, Bifid-потоки, DBBI,
выходы цепочек 1/2, K/E-константы, все авторские литералы и пароли) и их нормализации:
как есть / без пробелов / UPPER / lower / без пунктуации / +пробел в конце;
sha256 и sha256(sha256(x)); результат -> d (big-endian, mod n) -> h160 несжатый И сжатый.
Только чтение. Всё локально.
"""
import base64
import hashlib
import json
import os
import re
import sys

from Crypto.Cipher import AES

sys.stdout.reconfigure(encoding="utf-8")
KB = r"C:\Users\Admin\OneDrive\Desktop\master\puzzles\gsmg-io-5btc-puzzle"
TMP = r"C:\Users\Admin\AppData\Local\Temp\opencode\gsmg-enrich"
N = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141
P_ = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F
Gx = 0x79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798
Gy = 0x483ADA7726A3C4655DA4FBFC0E1108A8FD17B448A68554199C47D08FFB10D4B8
H160 = "a9553269572a317e39f0f518cb87c1a0ee1dbae4"


def _inv(a, m):
    return pow(a, m - 2, m)


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


def test_d(d, label):
    if not (0 < d < N):
        return None
    pt = _mul(d)
    if pt is None:
        return None
    un = b"\x04" + pt[0].to_bytes(32, "big") + pt[1].to_bytes(32, "big")
    if hashlib.new("ripemd160", hashlib.sha256(un).digest()).hexdigest() == H160:
        return ("НЕСЖАТЫЙ", d, label)
    cm = bytes([2 + (pt[1] & 1)]) + pt[0].to_bytes(32, "big")
    if hashlib.new("ripemd160", hashlib.sha256(cm).digest()).hexdigest() == H160:
        return ("СЖАТЫЙ", d, label)
    return None


def variants(s, limit=4000):
    """Нормализации строки. s: str или bytes."""
    out = []
    if isinstance(s, bytes):
        out.append(s)
        try:
            out.append(s.decode("latin-1").encode("utf-8"))
        except Exception:
            pass
        return out
    base = s
    cands = {base, base.strip(), base.upper(), base.lower(),
             re.sub(r"\s+", "", base), re.sub(r"[^A-Za-z0-9]", "", base),
             re.sub(r"[^A-Za-z0-9]", "", base).upper(), re.sub(r"[^A-Za-z0-9]", "", base).lower(),
             base.replace(" ", ""), base.strip() + "\n", base + "\n"}
    res = []
    for c in cands:
        res.append(c.encode("utf-8"))
    return res[:20]


def main():
    hits = []
    tested = 0
    strings = {}   # label -> str|bytes

    def add(label, s):
        if s and len(s) > 0:
            strings[label] = s

    # ---------- 1. источники из базы ----------
    # монолог Архитектора
    for fn in ["data/bitcointalk/bitcointalk_posts_full.md",
               "data/puzzlehunt/GITHUB_DIGEST.md",
               "data/github_2026-10/HosterjackAGV__gsmg-5btc-puzzle/docs__VERIFIED-SOLUTIONS.md",
               "data/github_2026-10/applelamps__GSMG-CLEAN/files/01_PROVEN_CHAIN.md"]:
        p = os.path.join(KB, fn.replace("/", os.sep))
        if not os.path.exists(p):
            continue
        t = open(p, encoding="utf-8", errors="ignore").read()
        for i, m in enumerate(re.finditer(r"YOUR LIFE IS THE SUM OF A REMAINDER.{0,4000}?CIAO BELLA O", t, re.S)):
            add(f"monologue[{fn.split('/')[-1]}#{i}]", m.group(0))
    # VIC-выход (фраза про HALF AND BETTER HALF)
    for m in re.finditer(r"IN CASE YOU MANAGE TO CRACK THIS.{0,200}?FUNDS TO LIVE\.?", open(
            os.path.join(KB, "data/github_2026-10/HosterjackAGV__gsmg-5btc-puzzle/docs__VERIFIED-SOLUTIONS.md"),
            encoding="utf-8", errors="ignore").read(), re.S):
        add("vic_output", m.group(0))
    # VIC-числовая строка и алфавит
    vs = open(os.path.join(KB, "data/github_2026-10/HosterjackAGV__gsmg-5btc-puzzle/docs__VERIFIED-SOLUTIONS.md"),
              encoding="utf-8", errors="ignore").read()
    for m in re.finditer(r"`(\d{80,})`", vs):
        add("vic_numeric", m.group(1))
    add("vic_alphabet", "FUBCDORA.LETHINGKYMVPS.JQZXW")
    add("beaufort_key", "THEMATRIXHASYOU")
    # Bifid-потоки
    p = os.path.join(KB, "data/s570_bifid_2026-10-17.txt")
    if os.path.exists(p):
        t = open(p, encoding="utf-8", errors="ignore").read()
        m = re.search(r"BIFID570:\s*\n([A-Z]+)", t)
        if m:
            add("BIFID570", m.group(1))
            add("BIFID570_odd", m.group(1)[1::2])
            add("BIFID570_even", m.group(1)[0::2])
            odd = m.group(1)[1::2].replace("I", "").replace("O", "")
            add("BIFID570_odd_noIO", odd)
    p = os.path.join(KB, "data/s570_even285_2026-10-18.txt")
    if os.path.exists(p):
        t = open(p, encoding="utf-8", errors="ignore").read()
        m = re.search(r"^([A-Z]{100,})$", t, re.M)
        if m:
            add("EVEN285", m.group(1))
    # DBBI (91 буква) из gsmg_hint.txt
    p = os.path.join(KB, "gsmg_hint.txt")
    if os.path.exists(p):
        t = open(p, encoding="utf-8", errors="ignore").read()
        m = re.search(r"(?:\b[a-i]\s+){60,}\b[a-i]\s*$", t, re.M)
        if m:
            add("DBBI91", re.sub(r"\s+", "", m.group(0)))
        else:
            letters = re.findall(r"\b[a-i]\b", t)
            if letters:
                add("DBBI91", "".join(letters[:91]))
    # ---------- 2. цепочки 1/2 (пересчёт из блобов пазла) ----------
    def evp(pw, salt, md):
        d, prev = b"", b""
        while len(d) < 48:
            prev = hashlib.new(md, prev + pw + salt).digest()
            d += prev
        return d[:32], d[32:48]

    def unp(ct, pw, salt, md="md5"):
        k, iv = evp(pw, salt, md)
        pt = AES.new(k, AES.MODE_CBC, iv).decrypt(ct)
        n = pt[-1]
        return pt[:len(pt) - n] if 1 <= n <= 16 and pt[-n:] == bytes([n]) * n else None

    salph = None
    for cand in ["data/phase23_inner_blob.b64", "data/phase32_inner_blob.b64"]:
        p = os.path.join(KB, cand.replace("/", os.sep))
        if os.path.exists(p):
            raw = base64.b64decode("".join(open(p, encoding="utf-8").read().split()))
            if raw[:8] == b"Salted__":
                if raw[8:16].hex() == "3ab585348552415d":
                    salph = raw
    if salph:
        c1 = unp(salph[16:], b"matrixsumlistenterlastwordsbeforearchichoicethispasswordmatrixsumlist", salph[8:16])
        if c1:
            add("chain1_raw", c1)
            add("chain1_hex", c1.hex())
            add("chain1_hex_upper", c1.hex().upper())
            add("chain1_K_C1", c1[:32].hex())
            add("chain1_K_C1_upper", c1[:32].hex().upper())
            add("chain1_E_C", c1[64:79].hex())
            add("chain1_wif_src", base64.b64encode(c1[:32]))
            # WIF
            def b58c(b):
                AL = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
                chk = hashlib.sha256(hashlib.sha256(b).digest()).digest()[:4]
                bb = b + chk
                n = int.from_bytes(bb, "big")
                s = ""
                while n:
                    n, r = divmod(n, 58)
                    s = AL[r] + s
                return "1" * (len(bb) - len(bb.lstrip(b"\x00"))) + s
            wif = b58c(b"\x80" + c1[:32])
            add("chain1_wif", wif)
            add("chain1_wif_bytes", wif.encode())
    # ---------- 3. литералы создателя и пароли ----------
    lits = [
        "matrixsumlist", "enter", "lastwordsbeforearchichoice", "thispassword",
        "ourfirsthintisyourlastcommand", "yellowblueprimes", "yinyang", "shabef", "causality",
        "theone", "secondanswer", "yourlastcommand", "btcseed", "BTCSEED",
        "theflowerblossomsthroughwhatseemstobeaconcretesurface",
        "jacquefrescogiveitjustonesecondheisenbergsuncertaintyprinciple",
        "SafenetLunaHSM1111", "abba", "HASHTHETEXT", "hash the text",
        "halfandbetterhalf", "youareonehalfofthekey", "splitsecretbetweentwosouls",
        "theprivatekeysbelongtohalfandbetterhalf", "neighborshalfanddouble",
        "gsmg.io", "GSMG", "gsmgio5btcpuzzle", "theseedisplanted", "choiceisanillusion",
        "thematrixhasyou", "THEMATRIXHASYOU", "infliptheanswermazewithtwo",
        "youaretheeventualityofananomaly", "take the private key youve earned it",
        "youlifeisthesumofaremainder", "BYTENPHASE", "salphaseion", "SalPhaseIon",
        "cosmicduality", "osmosis", "theproblemis", "THEPROBLEMIS",
    ]
    for i, s in enumerate(lits):
        add(f"lit[{i}]:{s[:24]}", s)
    # ---------- 4. прогон ----------
    for label, s in strings.items():
        for vi, vb in enumerate(variants(s)):
            for depth in (1, 2):
                x = vb
                for _ in range(depth):
                    x = hashlib.sha256(x).digest()
                tested += 1
                r = test_d(int.from_bytes(x, "big") % N, f"{label}/v{vi}/sha{depth}")
                if r:
                    hits.append(r)
                # сырые 32 байта как d (если длина 32)
            if len(s) == 32 and isinstance(s, bytes):
                tested += 1
                r = test_d(int.from_bytes(s, "big") % N, f"{label}/raw32")
                if r:
                    hits.append(r)
    print("протестировано строк-нормализаций:", tested, "уникальных базовых строк:", len(strings))
    print("НАХОДОК:", len(hits))
    for h in hits:
        print("   ", h[0], hex(h[1]), h[2])
    json.dump({"tested": tested, "n_strings": len(strings),
               "hits": [{"kind": a, "d": hex(b), "label": c} for a, b, c in hits]},
              open(os.path.join(TMP, "h3_sha_hits.json"), "w", encoding="utf-8"), indent=1)
    # для контроля печатаем список базовых меток
    print("\nбазовые строки:", ", ".join(sorted(strings.keys()))[:1500])


if __name__ == "__main__":
    main()
