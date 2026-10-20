#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""HARVEST: собрать ВСЕ опубликованные в сети «готовые решения» (ключи/сиды) и
проверить, контролируют ли они ЖИВЫЕ деньги.

Источники (только публичные, только чтение):
  1. реестр agntn/puzzles — 51 коллекция .md (там лежат published keys/seeds);
  2. OCP puzzles.json — ключи решённых лотов;
  3. локальное дерево master/ (уже просканировано key_scan.py — берём как базу).

Для каждого кандидата: derive P2PKH(unc/cmp), P2WPKH, P2SH-P2WPKH (+ первые адреса
BIP44/49/84/Electrum для сидов) -> blockstream balance -> печатаем ТОЛЬКО ненулевые.

Вывод: reports/data_harvest_keys_2026-10-19.json  (адреса+баланс, БЕЗ приватных ключей)
"""
from __future__ import annotations

import glob
import hashlib
import hmac
import io
import json
import os
import re
import ssl
import sys
import urllib.request
from concurrent.futures import ThreadPoolExecutor

MASTER = r"C:\Users\Admin\OneDrive\Desktop\master"
TMP = r"C:\Users\Admin\AppData\Local\Temp\opencode"
OUT = os.path.join(MASTER, "reports", "data_harvest_keys_2026-10-19.json")
CTX = ssl.create_default_context()
UA = {"User-Agent": "Mozilla/5.0 (key harvest)"}
A = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"

import coincurve  # noqa: E402
from mnemonic import Mnemonic  # noqa: E402

WIF = re.compile(r"\b(?:5[1-9A-HJ-NP-Za-km-z]{50}|[KL][1-9A-HJ-NP-Za-km-z]{51})\b")
HEX64 = re.compile(r"\b(?:0x)?([0-9a-fA-F]{64})\b")
XPRV = re.compile(r"\b([xt]prv[1-9A-HJ-NP-Za-km-z]{100,110})\b")
SEEDLINE = re.compile(
    r"(?:(?:seed|mnemonic|phrase|entropy)\W{0,12})?((?:[a-z]{3,8}[ ]){11,23}[a-z]{3,8})", re.I)


def b58d(s: str):
    n = 0
    for ch in s:
        n = n * 58 + A.index(ch)
    pad = len(s) - len(s.lstrip("1"))
    raw = n.to_bytes((n.bit_length() + 7) // 8, "big")
    out = b"\x00" * pad + raw
    body, chk = out[:-4], out[-4:]
    if hashlib.sha256(hashlib.sha256(body).digest()).digest()[:4] != chk:
        return None
    return body


def b58e(b: bytes) -> str:
    n = int.from_bytes(b, "big")
    s = ""
    while n:
        n, r = divmod(n, 58)
        s = A[r] + s
    return "1" * (len(b) - len(b.lstrip(b"\x00"))) + s


def h160(b: bytes) -> bytes:
    return hashlib.new("ripemd160", hashlib.sha256(b).digest()).digest()


CHARSET = "qpzry9x8gf2tvdw0s3jn54khce6mua7l"


def _bech32_polymod(values):
    gen = [0x3B6A57B2, 0x26508E6D, 0x1EA119FA, 0x3D4233DD, 0x2A1462B3]
    chk = 1
    for v in values:
        b = chk >> 25
        chk = (chk & 0x1FFFFFF) << 5 ^ v
        for i in range(5):
            chk ^= gen[i] if ((b >> i) & 1) else 0
    return chk


def _hrp_expand(hrp):
    return [ord(x) >> 5 for x in hrp] + [0] + [ord(x) & 31 for x in hrp]


def _convertbits(data, frombits, tobits, pad=True):
    acc = bits = 0
    ret = []
    maxv = (1 << tobits) - 1
    for value in data:
        acc = (acc << frombits) | value
        bits += frombits
        while bits >= tobits:
            bits -= tobits
            ret.append((acc >> bits) & maxv)
    if pad and bits:
        ret.append((acc << (tobits - bits)) & maxv)
    return ret


def segwit_v0(hrp: str, witprog: bytes) -> str:
    data = [0] + _convertbits(witprog, 8, 5)
    polymod = _bech32_polymod(_hrp_expand(hrp) + data + [0] * 6) ^ 1
    chk = [(polymod >> 5 * (5 - i)) & 31 for i in range(6)]
    return hrp + "1" + "".join(CHARSET[d] for d in data + chk)


def compress(pub: bytes) -> bytes:
    if len(pub) == 33:
        return pub
    return (b"\x02" if pub[64] % 2 == 0 else b"\x03") + pub[1:33]


def addrs(pub: bytes):
    out = {}
    c = compress(pub)
    for tag, p in (("p2pkh_unc", pub if len(pub) == 65 else None), ("p2pkh_cmp", c)):
        if p is None:
            continue
        v = b"\x00" + h160(p)
        out[tag] = b58e(v + hashlib.sha256(hashlib.sha256(v).digest()).digest()[:4])
    spk = b"\x00\x14" + h160(c)
    v = b"\x05" + h160(spk)
    out["p2sh_p2wpkh"] = b58e(v + hashlib.sha256(hashlib.sha256(v).digest()).digest()[:4])
    out["p2wpkh"] = segwit_v0("bc", h160(c))
    return out


def priv_addrs(priv_hex: str):
    try:
        pk = coincurve.PrivateKey(bytes.fromhex(priv_hex))
    except Exception:  # noqa: BLE001
        return {}
    return addrs(pk.public_key.format(False))


HARD = 0x80000000
CURVE_N = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141


def _ckd_priv(k: bytes, c: bytes, i: int):
    if i >= HARD:
        data = b"\x00" + k + i.to_bytes(4, "big")
    else:
        data = coincurve.PrivateKey(k).public_key.format(True) + i.to_bytes(4, "big")
    I = hmac.new(c, data, hashlib.sha512).digest()
    il = int.from_bytes(I[:32], "big")
    if il >= CURVE_N:
        return None
    ki = (il + int.from_bytes(k, "big")) % CURVE_N
    if ki == 0:
        return None
    return ki.to_bytes(32, "big"), I[32:]


def derive_path(seed: bytes, path: str):
    I = hmac.new(b"Bitcoin seed", seed, hashlib.sha512).digest()
    k, c = I[:32], I[32:]
    for part in path.replace("m/", "").split("/"):
        if not part:
            continue
        idx = int(part[:-1]) + HARD if part.endswith("'") else int(part)
        r = _ckd_priv(k, c, idx)
        if not r:
            return None
        k, c = r
    return k


def seed_addrs(phrase: str):
    """BIP39 (+passphrase "") и Electrum-вариант; стандартные пути, первые 3 адреса."""
    out = {}
    norm = " ".join(phrase.lower().split())
    variants = [("bip39", Mnemonic.to_seed(norm, ""))]
    try:
        variants.append(("electrum", hashlib.pbkdf2_hmac("sha512", norm.encode(), b"electrum", 2048, 64)))
    except Exception:  # noqa: BLE001
        pass
    for vtag, seed in variants:
        for path, ptag in (("m/44'/0'/0'/0", "bip44"), ("m/49'/0'/0'/0", "bip49"),
                           ("m/84'/0'/0'/0", "bip84"), ("m/0'/0", "electrum")):
            for i in range(3):
                k = derive_path(seed, f"{path}/{i}")
                if not k:
                    continue
                pk = coincurve.PrivateKey(k)
                for t, a in addrs(pk.public_key.format(False)).items():
                    if a:
                        out[f"{vtag}/{ptag}/{i}/{t}"] = a
    return out


def get(url: str, timeout: int = 30) -> bytes:
    return urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=timeout, context=CTX).read()


def bal(addr: str):
    try:
        j = json.loads(get("https://blockstream.info/api/address/" + addr))
        cs = j["chain_stats"]
        return cs["funded_txo_sum"] - cs["spent_txo_sum"]
    except Exception:  # noqa: BLE001
        return None


def harvest_text(text: str, src: str, cand: dict) -> None:
    for w in set(WIF.findall(text)):
        body = b58d(w)
        if body and len(body) == 33:
            for tag, a in priv_addrs(body[1:33].hex()).items():
                if a:
                    cand.setdefault(a, set()).add(f"{src}|wif|{tag}")
    for h in set(HEX64.findall(text)):
        low = h.lower()
        for tag, a in priv_addrs(low).items():
            if a:
                cand.setdefault(a, set()).add(f"{src}|hex64|{tag}")
    for s in set(SEEDLINE.findall(text)):
        words = s.lower().split()
        if len(words) in (12, 15, 18, 21, 24):
            for tag, a in seed_addrs(" ".join(words)).items():
                cand.setdefault(a, set()).add(f"{src}|seed|{tag}")


def main() -> None:
    cand: dict[str, set[str]] = {}

    # 1. локальное дерево (README/LOG, без data/)
    files = [f for f in glob.glob(os.path.join(MASTER, "**", "*.md"), recursive=True)
             if "\\data\\" not in f and "_archive" not in f]
    for f in files:
        try:
            harvest_text(io.open(f, encoding="utf-8", errors="replace").read(),
                         os.path.relpath(f, MASTER), cand)
        except OSError:
            continue
    print(f"[1] локальное дерево: {len(files)} файлов -> {len(cand)} адресов-кандидатов")

    # 2. реестр agntn
    try:
        idx = get("https://puzzles.agntn.dev/collections").decode("utf-8", "replace")
        slugs = sorted(set(re.findall(r'href="/collections/([a-z0-9\-]+)"', idx)))
        print(f"[2] agntn: коллекций {len(slugs)}")
        for s in slugs:
            try:
                md = get(f"https://puzzles.agntn.dev/collections/{s}.md").decode("utf-8", "replace")
                harvest_text(md, f"agntn:{s}", cand)
            except Exception as e:  # noqa: BLE001
                print(f"    ! {s}: {e}")
        print(f"    -> {len(cand)} адресов-кандидатов")
    except Exception as e:  # noqa: BLE001
        print("[2] agntn недоступен:", e)

    # 3. OCP puzzles.json
    try:
        d = json.load(io.open(os.path.join(TMP, "ocp_puzzles.json"), encoding="utf-8-sig"))
        harvest_text(json.dumps(d, ensure_ascii=False), "ocp:puzzles.json", cand)
        print(f"[3] OCP -> {len(cand)} адресов-кандидатов")
    except Exception as e:  # noqa: BLE001
        print("[3] OCP:", e)

    print(f"\nвсего уникальных адресов к проверке: {len(cand)}")
    hits = []
    with ThreadPoolExecutor(max_workers=6) as ex:
        futs = {ex.submit(bal, a): a for a in cand}
        for f in futs:
            a = futs[f]
            b = f.result()
            if isinstance(b, int) and b > 0:
                hits.append((b, a, sorted(cand[a])))

    hits.sort(reverse=True)
    print(f"\n=== ЖИВЫЕ ДЕНЬГИ НА ОПУБЛИКОВАННЫХ КЛЮЧАХ: {len(hits)} ===")
    for b, a, srcs in hits:
        print(f"{b:>12} сат  {a}")
        for s in srcs[:4]:
            print(f"              {s}")
    json.dump([{"satoshi": b, "address": a, "sources": s} for b, a, s in hits],
              io.open(OUT, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print("\njson ->", OUT)


if __name__ == "__main__":
    sys.exit(main())
