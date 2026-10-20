# -*- coding: utf-8 -*-
"""H4: офлайн-свип xpub-оракула по СДВИНУТОЙ модели seed-фразы.

Модель (подтверждена открытой в H3 страницей resurface / замок c2ozw):
  позиции 5-8   = discover music need love  (DOM-порядок чисел 5 6 7 8 на странице)
  позиции 9-12  = hunt gather whale blood   (бутылка mwfaz, неподтверждено)
  позиции 1-4   = любые 4 из {when, you, depart, find, mystery} в любом порядке -> P(5,4)=120

Отличие от модели досье TapInteresting/benjacasas02 (1-9 = when you depart find mystery
hunt gather whale blood, 11-12 = virtual moon, word10 free, миллиарды проверок, всё негативно):
корпус слов здесь сдвинут на одну позицию, поэтому прежние негативы C1..C6 на эту модель
НЕ распространяются.

Оракул: опубликованный автором account xpub (BIP84 m/84'/0'/0'), чей m/0/0 = адрес эскроу
bc1q0akdjvrc2csau2n3gyxa3xcq0fss852x997m9y (самотест tools/ocp/oracle.py --selftest = OK).

Секретов не печатается: при совпадении выводится только "MATCH idx=... pp=..." без seed-фразы
и без WIF (ключ передаётся лично Илье в чате, не в файлы).
"""
from __future__ import annotations

import hashlib
import itertools
import sys
import time
import unicodedata
from pathlib import Path

from bip_utils import Bip32Slip10Secp256k1, P2WPKHAddr

D = Path(__file__).resolve().parent.parent
XPUB = (
    "xpub6CpNc58zqQvNGPHDGGTr68wgrmtfFDBWRuSDAxoDdrCE1iRAaZtyAD5T9uCJ3ELUYKCkx8Jkind2"
    "kwoR3Uxmg1ycQ6DWyGxZBMFvQqhNqVC"
)
ESCROW = "bc1q0akdjvrc2csau2n3gyxa3xcq0fss852x997m9y"
HEAD = ["when", "you", "depart", "find", "mystery"]
MID = ["discover", "music", "need", "love"]
TAIL = ["hunt", "gather", "whale", "blood"]

PP = [
    "", "supernova", "glimmer", "Glimmer", "GLIMMER", "closerandcloser", "amphitrite",
    "Amphitrite", "discoverglimmer", "in the song", "inthesong", "resurface", "where",
    "her", "she", "virtual moon", "virtualmoon", "moon", "whale", "bottle", "raft",
    "smoke", "beach", "rocky", "east", "west", "home", "welcome home", "morocco",
    "sahara", "bermuda",
]


def seed(mnemonic: str, passphrase: str) -> bytes:
    m = unicodedata.normalize("NFKD", " ".join(mnemonic.split()))
    p = unicodedata.normalize("NFKD", passphrase or "")
    return hashlib.pbkdf2_hmac("sha512", m.encode("utf-8"), ("mnemonic" + p).encode("utf-8"), 2048)


_W16 = None


def words16() -> list[str]:
    global _W16
    if _W16 is None:
        _W16 = [w.strip() for w in (D / "data" / "bip39.txt").read_text("utf-8").split() if w.strip()]
    return _W16


def _checksum(mnemonic: str) -> bool:
    ws = words16()
    m = mnemonic.split()
    bits = "".join(format(ws.index(w), "011b") for w in m)
    ent = len(bits) * 32 // 33
    data, cs = bits[:ent], bits[ent:]
    h = hashlib.sha256(int(data, 2).to_bytes(ent // 8, "big")).hexdigest()
    return format(int(h, 16), "0256b")[:len(cs)] == cs


def main() -> int:
    t0 = time.time()
    # --- Сертификация ноги BIP39 -> seed -> адрес на решении Hunt #1 (ожидается
    #     bc1qgtymp8q7hw2k9tewhdq74vdlpkqhflgju69n95). Печатается только вердикт. ---
    wit = ("fortune all man kind one giant step into digital tomorrow virtual moon", "supernova")
    exp = "bc1qgtymp8q7hw2k9tewhdq74vdlpkqhflgju69n95"
    got = None
    for path in ("84'/0'/0'/0/0", "44'/0'/0'/0/0", "49'/0'/0'/0/0", "0'/0'/0'/0/0"):
        node = Bip32Slip10Secp256k1.FromSeed(seed(*wit)).DerivePath(path)
        if P2WPKHAddr.EncodeKey(node.PublicKey().KeyObject(), hrp="bc") == exp:
            got = path
    print("[witness] Hunt #1 -> %s: %s" % (exp, "OK @ %s" % got if got else
          "НЕ воспроизведён по этим путям (нога seed->адрес этим инструментом не сертифицирована)"))

    master_by_seed: dict[bytes, str] = {}
    orders = [list(p) + MID + TAIL for p in itertools.permutations(HEAD, 4)]
    n_seed = 0
    n_valid = 0
    n_cand = 0
    hits = []
    for mn in orders:
        phrase = " ".join(mn)
        ok = _checksum(phrase)
        n_seed += 1
        if ok:
            n_valid += 1
        for pp in PP:
            n_cand += 1
            s = seed(phrase, pp)
            xpub = master_by_seed.get(s)
            if xpub is None:
                master = Bip32Slip10Secp256k1.FromSeed(s)
                xpub = master.DerivePath("84'/0'/0'").PublicKey().ToExtended()
                master_by_seed[s] = xpub
            if xpub == XPUB:
                hits.append((n_cand, pp))
                print("MATCH idx=%d pp=%r (seed-фраза в stdout не печатается)" % (n_cand, pp))
    print("моделей слов (порядки 1-4): %d, из них BIP39-чексумма OK: %d" % (n_seed, n_valid))
    print("кандидатов seed+passphrase: %d, уникальных seed: %d" % (n_cand, len(master_by_seed)))
    print("MATCH: %d   (%.1f c)" % (len(hits), time.time() - t0))
    return 0 if not hits else 0


if __name__ == "__main__":
    sys.exit(main())
