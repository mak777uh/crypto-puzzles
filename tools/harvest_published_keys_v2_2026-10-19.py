#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""HARVEST v2 (2026-10-19): поиск опубликованных ключей/сид-фраз и проверка, контролируют ли
они ДЕНЬГИ.

Отличия от v1 (tools/harvest_published_keys_2026-10-19.py):
  * ИСПРАВЛЕН баг WIF: v1 принимал только body длиной 33 (несжатый WIF) и МОЛЧА
    пропускал сжатые WIF (K.../L..., body 34 байта). Теперь оба варианта.
  * ЛОКАЛЬНОЕ ПЕРЕСЕЧЕНИЕ (бесплатно, точно): все адреса-кандидаты из найденных ключей
    пересекаются с "вселенной" адресов, реально упомянутых в дереве master/ (+OCP).
    Если ключ из папки деривит адрес, который и есть призовой адрес пазла — это
    готовое решение (можно забирать), без сети.
  * Плавная удалённая проверка остальных кандидатов (сеть сейчас жёстко
    троттлится blockstream.info) с докачкой/резюмом в JSONL.

Артефакты:
  reports/data_harvest_candidates_2026-10-19.jsonl   -- адрес -> провенанс ключа
  reports/data_harvest_intersection_2026-10-19.json  -- СОВПАДЕНИЯ с адресами дерева
  <MASTER>/.secret/harvest_hits_2026-10-19.json       -- ТОЛЬКО найденные приватники (не в отчёты!)
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
import time
import urllib.error
import urllib.request
from concurrent.futures import ThreadPoolExecutor

MASTER = r"C:\Users\Admin\OneDrive\Desktop\master"
TMP = r"C:\Users\Admin\AppData\Local\Temp\opencode"
SECRET_DIR = os.path.join(MASTER, ".secret")
CANDS = os.path.join(MASTER, "reports", "data_harvest_candidates_2026-10-19.jsonl")
INTERSECT = os.path.join(MASTER, "reports", "data_harvest_intersection_2026-10-19.json")
HITS = os.path.join(SECRET_DIR, "harvest_hits_2026-10-19.json")
CTX = ssl.create_default_context()
UA = {"User-Agent": "Mozilla/5.0 (key harvest v2)"}
A = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"

import coincurve  # noqa: E402
from mnemonic import Mnemonic  # noqa: E402

WIF = re.compile(r"\b(?:5[1-9A-HJ-NP-Za-km-z]{50}|[KL][1-9A-HJ-NP-Za-km-z]{51})\b")
HEX64 = re.compile(r"\b(?:0x)?([0-9a-fA-F]{64})\b")
XPRV = re.compile(r"\b([xt]prv[1-9A-HJ-NP-Za-km-z]{100,110})\b")
SEEDLINE = re.compile(
    r"(?:(?:seed|mnemonic|phrase|entropy)\W{0,12})?((?:[a-z]{3,8}[ ]){11,23}[a-z]{3,8})", re.I)
BTC = re.compile(r"\b(?:bc1[023456789acdefghjklmnpqrstuvwxyz]{11,71}|[13][a-km-zA-HJ-NP-Z1-9]{25,34})\b")

CHARSET = "qpzry9x8gf2tvdw0s3jn54khce6mua7l"


def b58d(s: str):
    n = 0
    try:
        for ch in s:
            n = n * 58 + A.index(ch)
    except ValueError:
        return None
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


def seed_privs(phrase: str):
    """(path, privkey_hex) для BIP39 и Electrum-варианта; первые 3 адреса стандартных путей."""
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
                if k:
                    yield f"{vtag}/{ptag}/{i}", k.hex()


def harvest_text(text: str, src: str, cand: dict) -> None:
    """cand: addr -> set(prov) ; prov: 'src|kind|detail|PRIV:<hex>' (приватник отдельным полем)"""

    def put(a, kind, detail, priv):
        cand.setdefault(a, set()).add(f"{src}|{kind}|{detail}|{priv}")

    for w in set(WIF.findall(text)):
        body = b58d(w)
        if not body or len(body) not in (33, 34):  # 33=несжатый, 34=сжатый WIF
            continue
        if body[0] != 0x80:
            continue
        if len(body) == 34 and body[33] != 0x01:
            continue
        ph = body[1:33].hex()
        for tag, a in priv_addrs(ph).items():
            put(a, "wif", tag, ph)
    for h in set(HEX64.findall(text)):
        ph = h.lower()
        for tag, a in priv_addrs(ph).items():
            put(a, "hex64", tag, ph)
    for s in set(SEEDLINE.findall(text)):
        words = s.lower().split()
        if len(words) in (12, 15, 18, 21, 24):
            for path, ph in seed_privs(" ".join(words)):
                for tag, a in priv_addrs(ph).items():
                    put(a, "seed", f"{path}/{tag}", ph)


def get(url: str, timeout: int = 30) -> bytes:
    return urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=timeout, context=CTX).read()


def bal(addr: str, tries: int = 4):
    """None = неизвестно (сеть), int = сатоши. Экспоненциальный бэкофф на 429/сеть."""
    delay = 1.0
    for _ in range(tries):
        try:
            j = json.loads(get("https://blockstream.info/api/address/" + addr, timeout=15))
            cs = j["chain_stats"]
            return cs["funded_txo_sum"] - cs["spent_txo_sum"]
        except urllib.error.HTTPError as e:
            if e.code == 429:
                time.sleep(delay)
                delay = min(delay * 2, 30)
                continue
            return None
        except Exception:  # noqa: BLE001
            time.sleep(delay)
            delay = min(delay * 2, 30)
    return None


def main() -> None:
    do_remote = "--remote" in sys.argv
    cand: dict[str, set[str]] = {}

    # ---------- вселенная: адреса, реально упомянутые в дереве + OCP ----------
    universe: dict[str, set[str]] = {}
    all_files = [f for f in glob.glob(os.path.join(MASTER, "**", "*.*"), recursive=True)
                 if os.path.splitext(f)[1].lower() in (".md", ".json", ".txt", ".html")]
    for f in all_files:
        rel = os.path.relpath(f, MASTER)
        if not rel.startswith(("puzzles", "solved")):
            continue
        try:
            t = io.open(f, encoding="utf-8", errors="replace").read()
        except OSError:
            continue
        for a in set(BTC.findall(t)):
            universe.setdefault(a, set()).add(rel)
    print(f"[universe] файлов в puzzles/+solved/: {len(all_files)}; адресов-вселенной: {len(universe)}")

    # ---------- сбор опубликованных ключей ----------
    files = [f for f in glob.glob(os.path.join(MASTER, "**", "*.md"), recursive=True)
             if "_archive" not in f]
    for f in files:
        try:
            harvest_text(io.open(f, encoding="utf-8", errors="replace").read(),
                         os.path.relpath(f, MASTER), cand)
        except OSError:
            continue
    print(f"[1] локальное дерево: {len(files)} файлов -> {len(cand)} адресов-кандидатов")

    try:
        d = json.load(io.open(os.path.join(TMP, "ocp_puzzles.json"), encoding="utf-8-sig"))
        harvest_text(json.dumps(d, ensure_ascii=False), "ocp:puzzles.json", cand)
        print(f"[2] OCP -> {len(cand)} адресов-кандидатов")
    except Exception as e:  # noqa: BLE001
        print("[2] OCP:", e)

    if "--agntn" in sys.argv:
        try:
            idx = get("https://puzzles.agntn.dev/collections").decode("utf-8", "replace")
            slugs = sorted(set(re.findall(r'href="/collections/([a-z0-9\-]+)"', idx)))
            print(f"[3] agntn: коллекций {len(slugs)}")
            for s in slugs:
                try:
                    md = get(f"https://puzzles.agntn.dev/collections/{s}.md").decode("utf-8", "replace")
                    harvest_text(md, f"agntn:{s}", cand)
                except Exception as e:  # noqa: BLE001
                    print(f"    ! {s}: {e}")
            print(f"    -> {len(cand)} адресов-кандидатов")
        except Exception as e:  # noqa: BLE001
            print("[3] agntn недоступен:", e)

    # ---------- дамп кандидатов (для резюма и удалённой проверки) ----------
    with io.open(CANDS, "w", encoding="utf-8") as fh:
        for a, provs in sorted(cand.items()):
            fh.write(json.dumps({"address": a, "provenance": sorted(provs)}, ensure_ascii=False) + "\n")
    print(f"[dump] {CANDS}")

    # ---------- ЛОКАЛЬНОЕ ПЕРЕСЕЧЕНИЕ (бесплатно, точно) ----------
    inter = [(a, sorted(cand[a]), sorted(universe[a])) for a in cand if a in universe]
    inter.sort()
    print(f"\n=== СОВПАДЕНИЯ: ключ из дерева -> адрес, упомянутый в дереве: {len(inter)} ===")
    os.makedirs(SECRET_DIR, exist_ok=True)
    hits_out = []
    for a, provs, where in inter:
        print(f"  {a}")
        for p in provs[:4]:
            print(f"      key: {p}")
        for w in where[:4]:
            print(f"      addr: {w}")
        for p in provs:
            priv = p.rsplit("|", 1)[-1]
            hits_out.append({"address": a, "provenance": p, "mentioned_in": where, "privkey": priv})
    json.dump(inter and [{"address": a, "provenance": p, "mentioned_in": w}
                         for a, p, w in inter] or [],
              io.open(INTERSECT, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    if hits_out:
        json.dump(hits_out, io.open(HITS, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
        print(f"\n!!! найдены приватники к адресам из дерева -> {HITS}")
    print(f"[intersection] {INTERSECT}")

    # ---------- удалённая проверка остальных (по флагу, долго) ----------
    if do_remote:
        rest = [a for a in cand if a not in universe]
        print(f"\n[remote] к удалённой проверке: {len(rest)} адресов")
        live = []
        with ThreadPoolExecutor(max_workers=2) as ex:
            futs = {ex.submit(bal, a): a for a in rest}
            for i, f in enumerate(futs, 1):
                a = futs[f]
                b = f.result()
                if isinstance(b, int) and b > 0:
                    live.append((b, a, sorted(cand[a])))
                    print(f"  ЖИВЫЕ {b} сат {a}")
                if i % 100 == 0:
                    print(f"  ... {i}/{len(rest)}")
        live.sort(reverse=True)
        print(f"\n=== ЖИВЫЕ на опубликованных ключах (вне дерева): {len(live)} ===")
        for b, a, provs in live:
            print(f"{b:>12} сат  {a}")
            for p in provs[:4]:
                print(f"              {p}")
        json.dump([{"satoshi": b, "address": a, "provenance": p} for b, a, p in live],
                  io.open(os.path.join(MASTER, "reports", "data_harvest_live_2026-10-19.json"),
                          "w", encoding="utf-8"), ensure_ascii=False, indent=1)


if __name__ == "__main__":
    sys.exit(main())
