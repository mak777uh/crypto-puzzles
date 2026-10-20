# -*- coding: utf-8 -*-
"""GSMG: закрытие лабораторного пространства «cosmic-recipe» (HosterjackAGV) — исчерпывающе.

Лаб `assets/js/labs/cosmic-recipe.js` строит «космический» ключ из 4 ингредиентов:
порядок {master, reversed, soup} × операция {concat, interleave (чересстрочный),
sha256-каждого-затем-join, xor четырёх sha256} × разделитель {'', '·', ' ', '\\n'},
плюс каждый ингредиент можно «править» (значения: цифры yellowblueprimes, цифры
matrixsumlist, слова lastwordsbeforearchichoice / yinyang и их регистровые варианты).

Проверяем ВСЁ это конечное пространство сразу на двух целях:
  (1) расшифровка «космического» блоба (EVP_BytesToKey MD5, Salted__, salt eefc4c5befc1656a):
      валидный паддинг + печатаемость + WIF;
  (2) H3-цель: d = sha256(assembled) mod n (и сам ключ как скаляр) -> h160 == приз.

СКВОЗНОЙ КОНТРОЛЬ: берём заведомо присутствующий в пространстве assembled-строку,
шифруем ПОД ЕГО ЖЕ ключом синтетический блоб с известным текстом и обязаны найти текст
при прогоне того же перечислителя (иначе инструмент недействителен).
Только чтение; ничего не тратится.
"""
import base64
import hashlib
import json
import os
import re
import sys

import coincurve
from Crypto.Cipher import AES

sys.stdout.reconfigure(encoding="utf-8")
KB = r"C:\Users\Admin\OneDrive\Desktop\master\puzzles\gsmg-io-5btc-puzzle"
TMP = r"C:\Users\Admin\AppData\Local\Temp\opencode\gsmg-enrich"
N = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141
H160 = bytes.fromhex("a9553269572a317e39f0f518cb87c1a0ee1dbae4")
WIF_RE = re.compile(rb"(5[HJK][1-9A-HJ-NP-Za-km-z]{49}|[KL][1-9A-HJ-NP-Za-km-z]{51})")

ING = {
    "ybp": ["7233147103127", "yellowblueprimes", "YELLOWBLUEPRIMES"],
    "msl": ["6108766549978798108108736759668", "matrixsumlist"],
    "lw": ["lastwordsbeforearchichoice", "LastWordsBeforeArchiChoice"],
    "yin": ["yinyang", "YINYANG"],
}
ORDERS = {"master": [0, 1, 2, 3], "reversed": [3, 2, 1, 0], "soup": [0, 1, 3, 2]}
SEPS = ["", "\u00b7", " ", "\n"]


def evp(pw, salt, md):
    d, prev = b"", b""
    while len(d) < 48:
        prev = hashlib.new(md, prev + pw + salt).digest()
        d += prev
    return d[:32], d[32:48]


def aes_dec(blob, key_hex, kdf):
    raw = blob
    assert raw[:8] == b"Salted__"
    salt = raw[8:16]
    k, iv = evp(key_hex.encode(), salt, kdf)
    try:
        pt = AES.new(k, AES.MODE_CBC, iv).decrypt(raw[16:])
    except Exception:
        return None
    if not pt:
        return None
    n = pt[-1]
    if not (1 <= n <= 16 and pt[-n:] == bytes([n]) * n):
        return None
    return pt[:len(pt) - n]


def printable_ratio(b):
    if not b:
        return 0.0
    ok = sum(1 for c in b if 32 <= c < 127 or c in (9, 10, 13))
    return ok / len(b)


def h160_of(d):
    if not (0 < d < N):
        return None
    db = d.to_bytes(32, "big")
    try:
        p1 = coincurve.PublicKey.from_valid_secret(db).format(compressed=False)
        if hashlib.new("ripemd160", hashlib.sha256(p1).digest()).digest() == H160:
            return "НЕСЖАТЫЙ"
        p2 = coincurve.PublicKey.from_valid_secret(db).format(compressed=True)
        if hashlib.new("ripemd160", hashlib.sha256(p2).digest()).digest() == H160:
            return "СЖАТЫЙ"
    except Exception:
        return None
    return None


def interleave(parts):
    out, i, go = "", 0, True
    while go:
        go = False
        for s in parts:
            if i < len(s):
                out += s[i]
                go = True
        i += 1
    return out


def build_keys():
    """-> список (tag, assembled, key_hex)."""
    out = []
    for oname, order in ORDERS.items():
        for yi in range(len(ING["ybp"])):
            for mi in range(len(ING["msl"])):
                for li in range(len(ING["lw"])):
                    for ni in range(len(ING["yin"])):
                        parts = [ING["ybp"][yi], ING["msl"][mi], ING["lw"][li], ING["yin"][ni]]
                        parts = [parts[i] for i in order]
                        for op in ("concat", "interleave", "shaeach", "xor"):
                            if op == "concat":
                                for sep in SEPS:
                                    asm = sep.join(parts)
                                    out.append((f"{oname}/c/{yi}{mi}{li}{ni}/{repr(sep)}", asm,
                                                hashlib.sha256(asm.encode()).hexdigest()))
                            elif op == "interleave":
                                asm = interleave(parts)
                                out.append((f"{oname}/i/{yi}{mi}{li}{ni}", asm,
                                            hashlib.sha256(asm.encode()).hexdigest()))
                            elif op == "shaeach":
                                for sep in SEPS:
                                    hs = [hashlib.sha256(p.encode()).hexdigest() for p in parts]
                                    asm = sep.join(hs)
                                    out.append((f"{oname}/s/{yi}{mi}{li}{ni}/{repr(sep)}", asm,
                                                hashlib.sha256(asm.encode()).hexdigest()))
                            else:
                                x = bytearray(32)
                                for p in parts:
                                    h = hashlib.sha256(p.encode()).digest()
                                    for i in range(32):
                                        x[i] ^= h[i]
                                out.append((f"{oname}/x/{yi}{mi}{li}{ni}",
                                            "(xor of 4 sha256)", x.hex()))
    # сами ингредиенты (одиночные) тоже как кандидаты ключа
    for k, vals in ING.items():
        for i, v in enumerate(vals):
            out.append((f"single/{k}{i}", v, hashlib.sha256(v.encode()).hexdigest()))
    return out


def main():
    keys = build_keys()
    print("пространство лаба (assembled+key):", len(keys))

    blob = open(os.path.join(KB, "data/dualite_blob_2448B_salt_eefc4c5b_b64.txt"),
                encoding="utf-8").read()
    blob = base64.b64decode("".join(blob.split()))
    assert blob[:8] == b"Salted__" and blob[8:16].hex() == "eefc4c5befc1656a", "не тот блоб"
    print("космический блоб:", len(blob), "B, salt", blob[8:16].hex())

    # ---------- СКВОЗНОЙ КОНТРОЛЬ ----------
    ctrl_tag, ctrl_asm, ctrl_key = keys[len(keys) // 2]
    plain = b"CONTROL: cosmic-recipe lab pipeline WIF 5Kdummy5555555555555555555555555555555555555555 end"
    k, iv = evp(ctrl_key.encode(), b"\x01\x02\x03\x04\x05\x06\x07\x08", "md5")
    ct = AES.new(k, AES.MODE_CBC, iv).encrypt(
        plain + bytes([16 - (len(plain) % 16)]) * (16 - (len(plain) % 16)))
    ctrl_blob = b"Salted__" + b"\x01\x02\x03\x04\x05\x06\x07\x08" + ct
    found = False
    for tag, asm, kh in keys:
        pt = aes_dec(ctrl_blob, kh, "md5")
        if pt == plain:
            found = True
            print(f"  контроль сработал на {tag} (assembled={asm[:28]!r})")
            break
    print("СКВОЗНОЙ КОНТРОЛЬ:", "OK" if found else "ПРОВАЛ — прогон недействителен")
    if not found:
        return

    # ---------- реальный прогон ----------
    best = []
    hits = []
    seen = set()
    for tag, asm, kh in keys:
        for kdf in ("md5", "sha256"):
            pt = aes_dec(blob, kh, kdf)
            if pt is None:
                continue
            r = printable_ratio(pt)
            wif = WIF_RE.search(pt)
            best.append((r, tag, kdf, len(pt)))
            if wif:
                hits.append(("WIF", tag, kdf, wif.group(0).decode()))
                print("  !!! WIF:", tag, kdf, wif.group(0).decode())
            if r >= 0.85:
                hits.append(("печатаемость", tag, kdf, r))
                print(f"  !!! читаемый текст: {tag} {kdf} ratio={r:.3f} {pt[:80]!r}")
        # H3-цель: assembled как текст и как скаляр ключа
        for cand, lbl in ((int(hashlib.sha256(asm.encode()).hexdigest(), 16) % N, "sha256(assembled)"),
                          (int(kh, 16) % N, "key")):
            v = h160_of(cand)
            if v:
                hits.append((v, tag, lbl, hex(cand)))
                print(f"  !!! ПРИЗОВЫЙ КЛЮЧ: {v} {tag} {lbl} {hex(cand)}")
    best.sort(reverse=True)
    print(f"\nрасшифровок с валидным паддингом: {len(best)} (ожидаемый шум ~{len(keys)*2/255:.0f})")
    print("топ-5 по печатаемости:")
    for r, tag, kdf, ln in best[:5]:
        print(f"   {r:.3f}  {tag}  {kdf}  ({ln} B)")
    print("\nНАХОДОК (WIF/читаемый/ключ приза):", len(hits))
    json.dump({"space": len(keys), "valid_pad": len(best), "noise_expected": round(len(keys) * 2 / 255, 1),
               "hits": hits, "top": best[:10]},
              open(os.path.join(TMP, "cosmic_lab_closure.json"), "w", encoding="utf-8"), indent=1, ensure_ascii=False)


if __name__ == "__main__":
    main()
