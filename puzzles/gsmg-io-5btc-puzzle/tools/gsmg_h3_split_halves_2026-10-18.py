# -*- coding: utf-8 -*-
"""GSMG H3b: гипотеза «половин» — d = sha256(A) op sha256(B) для пар объектов пазла.

Источник гипотезы: открытый текст VIC-цифр фазы 3.2 — «... the private keys belong to
HALF and BETTER HALF ...» (слова самого создателя), плюс отдельно наблюдаемые «половины»
(103x103 -> base38: 0423d911..., 48cc46e6...). Комьюнити проверяло только 2x, /2, xor, sum
на СВОИХ двух значениях; здесь проверяются ВСЕ упорядоченные пары объектов пазла
(монолог, VIC-выход, Bifid-потоки, DBBI, выходы цепочек, K/E-константы, авторские литералы
и их нормализации) и все операции {сложение, разность, xor, удвоение}, mod n.

Критерий: h160(d*G) == a9553269...bae4 (несжатый ИЛИ сжатый). Сквозной контроль:
синтетическая цель из двух заведомо присутствующих объектов обязана найтись.
Только чтение, всё локально.
"""
import hashlib
import json
import os
import re
import sys

from Crypto.Cipher import AES

import coincurve

sys.stdout.reconfigure(encoding="utf-8")
KB = r"C:\Users\Admin\OneDrive\Desktop\master\puzzles\gsmg-io-5btc-puzzle"
TMP = r"C:\Users\Admin\AppData\Local\Temp\opencode\gsmg-enrich"
N = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141
H160 = bytes.fromhex("a9553269572a317e39f0f518cb87c1a0ee1dbae4")


def h160_of(db, compressed=False):
    pub = coincurve.PublicKey.from_valid_secret(db).format(compressed=compressed)
    return hashlib.new("ripemd160", hashlib.sha256(pub).digest()).digest()


def test_d(d):
    """d -> h160 решает всё. coincurve: ~19 тыс. ключей/с на ядро (замер h3_sweep)."""
    if not (0 < d < N):
        return None
    db = d.to_bytes(32, "big")
    if h160_of(db, False) == H160:
        return "НЕСЖАТЫЙ"
    if h160_of(db, True) == H160:
        return "СЖАТЫЙ"
    return None


def variants(s):
    if isinstance(s, bytes):
        out = [s]
        try:
            out.append(s.decode("latin-1").encode("utf-8"))
        except Exception:
            pass
        return out
    base = s
    cands = [base, base.strip(), base.upper(), base.lower(),
             re.sub(r"\s+", "", base), re.sub(r"[^A-Za-z0-9]", "", base),
             re.sub(r"[^A-Za-z0-9]", "", base).upper(), base.replace(" ", ""),
             base.strip() + "\n", base + "\n"]
    seen, out = set(), []
    for c in cands:
        if c not in seen:
            seen.add(c)
            out.append(c.encode("utf-8"))
    return out


def corpus():
    strings = {}

    def add(label, s):
        if s:
            strings[label] = s

    for fn in ["data/bitcointalk/bitcointalk_posts_full.md",
               "data/puzzlehunt/GITHUB_DIGEST.md",
               "data/github_2026-10/HosterjackAGV__gsmg-5btc-puzzle/docs__VERIFIED-SOLUTIONS.md",
               "data/github_2026-10/applelamps__GSMG-CLEAN/files/01_PROVEN_CHAIN.md"]:
        p = os.path.join(KB, fn.replace("/", os.sep))
        if not os.path.exists(p):
            continue
        t = open(p, encoding="utf-8", errors="ignore").read()
        for i, m in enumerate(re.finditer(r"YOUR LIFE IS THE SUM OF A REMAINDER.{0,30000}?CIAO BELLA O", t, re.S)):
            add(f"monologue[{fn.split('/')[-1]}#{i}]", m.group(0))
        for i, m in enumerate(re.finditer(r"IN CASE YOU MANAGE TO CRACK THIS.{0,300}?FUNDS TO LIVE\.?", t, re.S)):
            add(f"vic_output[{fn.split('/')[-1]}#{i}]", m.group(0))
    vs = open(os.path.join(KB, "data/github_2026-10/HosterjackAGV__gsmg-5btc-puzzle/docs__VERIFIED-SOLUTIONS.md"),
              encoding="utf-8", errors="ignore").read()
    for m in re.finditer(r"`(\d{80,})`", vs):
        add("vic_numeric", m.group(1))
    for m in re.finditer(r"(\d{200,})", vs):
        add("vic_numeric_raw", m.group(1))
    add("vic_alphabet", "FUBCDORA.LETHINGKYMVPS.JQZXW")
    add("beaufort_key", "THEMATRIXHASYOU")
    p = os.path.join(KB, "data/s570_bifid_2026-10-17.txt")
    if os.path.exists(p):
        t = open(p, encoding="utf-8", errors="ignore").read()
        m = re.search(r"BIFID570:\s*\n([A-Z]+)", t)
        if m:
            add("BIFID570", m.group(1))
            add("BIFID570_odd", m.group(1)[1::2])
            add("BIFID570_even", m.group(1)[0::2])
            add("BIFID570_odd_noIO", m.group(1)[1::2].replace("I", "").replace("O", ""))
            add("BIFID570_even_noIO", m.group(1)[0::2].replace("I", "").replace("O", ""))
    p = os.path.join(KB, "data/s570_even285_2026-10-18.txt")
    if os.path.exists(p):
        t = open(p, encoding="utf-8", errors="ignore").read()
        m = re.search(r"^([A-Z]{100,})$", t, re.M)
        if m:
            add("EVEN285", m.group(1))
    p = os.path.join(KB, "gsmg_hint.txt")
    if os.path.exists(p):
        t = open(p, encoding="utf-8", errors="ignore").read()
        letters = re.findall(r"\b[a-i]\b", t)
        if letters:
            add("DBBI91", "".join(letters[:91]))
    # выходы цепочек 1/2
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

    for cand, salt_hex, pw in [
        ("data/phase23_inner_blob.b64", "3ab585348552415d",
         b"matrixsumlistenterlastwordsbeforearchichoicethispasswordmatrixsumlist"),
        ("data/phase32_inner_blob.b64", "eefc4c5befc1656a", None),
    ]:
        p = os.path.join(KB, cand.replace("/", os.sep))
        if not os.path.exists(p) or pw is None:
            continue
        raw = __import__("base64").b64decode("".join(open(p, encoding="utf-8").read().split()))
        if raw[:8] == b"Salted__" and raw[8:16].hex() == salt_hex:
            c1 = unp(raw[16:], pw, raw[8:16])
            if c1:
                add("chain1_raw", c1)
                add("chain1_hex", c1.hex())
                add("chain1_K_C1", c1[:32].hex())
                add("chain1_E_C", c1[64:79].hex())
                add("chain1_32B", c1[:32])
    lits = ["matrixsumlist", "enter", "lastwordsbeforearchichoice", "thispassword",
            "ourfirsthintisyourlastcommand", "yellowblueprimes", "yinyang", "shabef", "causality",
            "theone", "secondanswer", "yourlastcommand", "btcseed", "BTCSEED",
            "theflowerblossomsthroughwhatseemstobeaconcretesurface",
            "jacquefrescogiveitjustonesecondheisenbergsuncertaintyprinciple",
            "SafenetLunaHSM1111", "abba", "HASHTHETEXT", "hash the text", "halfandbetterhalf",
            "youareonehalfofthekey", "splitsecretbetweentwosouls",
            "theprivatekeysbelongtohalfandbetterhalf", "neighborshalfanddouble",
            "gsmg.io", "GSMG", "gsmgio5btcpuzzle", "theseedisplanted", "choiceisanillusion",
            "thematrixhasyou", "THEMATRIXHASYOU", "youaretheeventualityofananomaly",
            "youlifeisthesumofaremainder", "BYTENPHASE", "salphaseion", "SalPhaseIon",
            "cosmicduality", "osmosis", "theproblemis"]
    for i, s in enumerate(lits):
        add(f"lit{i}", s)
    return strings


def main():
    strings = corpus()
    scalars = {}   # label -> d
    for label, s in strings.items():
        for vi, vb in enumerate(variants(s)):
            h1 = hashlib.sha256(vb).digest()
            h2 = hashlib.sha256(h1).digest()
            scalars[f"{label}/v{vi}"] = int.from_bytes(h1, "big") % N
            scalars[f"{label}/v{vi}/d2"] = int.from_bytes(h2, "big") % N
    # «половины» из комьюнити (103x103 -> base38)
    for name, hexv in [("community_halfA", "0423d911"), ("community_halfB", "48cc46e6")]:
        pass
    print("объектов (текстов):", len(strings), "| скаляров:", len(scalars))

    keys = [(l, d) for l, d in scalars.items() if not l.endswith("/d2")]

    def run(pairs, tag):
        """pairs: итератор (d, label)."""
        hits, n_tested = [], 0
        for d, label in pairs:
            n_tested += 1
            v = test_d(d % N)
            if v:
                hits.append((v, hex(d % N), label))
                print("  !!!", v, hex(d % N), label)
        return n_tested, hits

    # --- СКВОЗНОЙ КОНТРОЛЬ: цель = знаем операцию и пару ---
    a = scalars["lit12/v0"]          # btcseed
    b = scalars["lit6/v0"]           # yinyang
    ctrl_d = (a + b) % N
    ctrl_h160 = h160_of(ctrl_d.to_bytes(32, "big"))
    global H160
    saved = H160
    H160 = ctrl_h160
    n_t, hits = run(((d, f"ctrl:{l}") for d, l in [(ctrl_d, "btcseed+yinyang")]), "ctrl")
    H160 = saved
    print(f"сквозной контроль (цель upd под пару btcseed+yinyang): найдено {len(hits)} "
          f"(ожидалось 1) -> {'OK' if hits else 'ПРОВАЛ'}")

    # --- одиночные ---
    n1, h1 = run(((d, l) for l, d in scalars.items()), "одиночные")
    print(f"одиночные: {n1}")
    # --- пары, операции ---
    ops = [("add", lambda x, y: (x + y) % N), ("sub", lambda x, y: (x - y) % N),
           ("xor", lambda x, y: (x ^ y) % N)]
    total = 0
    hits2 = []
    for i in range(len(keys)):
        li, di = keys[i]
        for opn, op in ops:
            def gen():
                for j in range(len(keys)):
                    lj, dj = keys[j]
                    yield op(di, dj), f"{li} {opn} {lj}"
            n, hh = run(gen(), opn)
            total += n
            hits2 += hh
    print(f"пар+операций: {total}, находок {len(hits2)}")
    json.dump({"objects": len(strings), "scalars": len(scalars), "pairs_tested": total,
               "hits": [{"kind": a, "d": b, "label": c} for a, b, c in h1 + hits2]},
              open(os.path.join(TMP, "h3_split_hits.json"), "w", encoding="utf-8"), indent=1)


if __name__ == "__main__":
    main()
