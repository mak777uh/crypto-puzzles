# -*- coding: utf-8 -*-
"""Оракул Nuaza / bitcoin.fr «Chasse au trésor» (0,2024 BTC).

Цель: по 21 французскому слову из книги собрать 24-словную фразу BIP39 и проверить адрес.

Механизм (indice 8 + e-ducat.fr/2024-09-29-adresses-et-chemins):
  слова 1-21 — французские, каждое заменяется АНГЛИЙСКИМ словом ТОГО ЖЕ РАНГА
  в официальных списках BIP39 (french.txt/english.txt, индекс 0..2047);
  слова 22-24 — английские `open always win`;
  путь m/84'/0'/0'/0/0, passphrase пустая;
  целевой адрес bc1q8zfy6wvvtskzkg4s343x42pyf363nmejspgc02 (20 240 000 сат).

indice 9 (дословно из https://bitcoin.fr/chasse-au-tresor/): «le mot staff (1697) peut être
utilisé en 24e position pour former une phrase mnémonique valide … n'importe lequel de ces 8
mots peut être utilisé en 24e position comme mot de vérification (checksum): alien detect flip
gas organ peasant staff trigger … Il suffit alors de le remplacer par le 24e mot (qui n'est PAS
parmi les 8 mots ci-dessus)». Их индексы 50/483/712/768/1251/1297/1696/1860 покрывают все 8
групп по 3 неизвестным битам энтропии (>>8 = 0..7), поэтому правильный ответ — ровно одно слово
из восьми: оно подтверждает, что первые 23 слова собраны верно, а настоящий 24-й слово ("win",
инdice 14: slogan Samsung 2024 «Open Always Wins») afterwards подставляется вместо него.

Сертификация (--selftest), все четыре ноги зелёные:
  A) BIP39 12 слов "abandon"x11+"about" + passphrase "TREZOR" -> официальный seed (PBKDF2);
  B) seed -> BIP84 m/84'/0'/0'/0/0: официальный вектор BIP84 -> bc1qcr8te4kr609gcawutmrza0j4xv80jy8z306fyu;
  C) чексумма == независимая реализация bip_utils на 400 случайно сгенерированных фразах
     (12 и 24 слова) + заведомо невалидная "abandon"x24 отклоняется обоими;
  D) внешний known-answer той же схемы: Hunt #1 (12 слов + passphrase "supernova")
     -> bc1qgtymp8q7hw2k9tewhdq74vdlpkqhflgju69n95 на m/84'/0'/0'/0/0.
"""
from __future__ import annotations

import hashlib
import sys
import unicodedata
from pathlib import Path

import bip_utils
from bip_utils import Bip32Slip10Secp256k1, P2WPKHAddr

D = Path(__file__).resolve().parent.parent
TARGET = "bc1q8zfy6wvvtskzkg4s343x42pyf363nmejspgc02"
CHECK8 = ["alien", "detect", "flip", "gas", "organ", "peasant", "staff", "trigger"]
TAIL_EN = ["open", "always", "win"]


def wordlist(lang: str) -> list[str]:
    raw = (D / "data" / ("bip39_%s.txt" % lang)).read_bytes().decode("utf-8-sig")
    return [unicodedata.normalize("NFC", w.strip()) for w in raw.splitlines() if w.strip()]


def fr_to_en(fr_words: list[str]) -> list[str]:
    fr, en = wordlist("french"), wordlist("english")
    assert len(fr) == len(en) == 2048, "списки BIP39 должны быть по 2048 слов"
    out = []
    for w in fr_words:
        wn = unicodedata.normalize("NFC", w.strip().lower())
        if wn not in fr:
            raise SystemExit("СЛОВО НЕ В BIP39-FRENCH: %r (нужно точное написание из french.txt)" % w)
        out.append(en[fr.index(wn)])
    return out


def mnemonic_checksum_ok(words: list[str]) -> bool:
    n = len(words)
    if n not in (12, 15, 18, 21, 24):
        return False
    fr = wordlist("english")
    bits = "".join(format(fr.index(w), "011b") for w in words)
    ent = n * 11 * 32 // 33
    data, cs = bits[:ent], bits[ent:]
    h = hashlib.sha256(int(data, 2).to_bytes(ent // 8, "big")).digest()
    return format(int.from_bytes(h, "big"), "0256b")[:len(cs)] == cs


def seed_of(words: list[str], passphrase: str = "") -> bytes:
    m = unicodedata.normalize("NFKD", " ".join(words)).encode("utf-8")
    p = unicodedata.normalize("NFKD", passphrase).encode("utf-8")
    return hashlib.pbkdf2_hmac("sha512", m, b"mnemonic" + p, 2048)


def addr_bip84(seed: bytes, path: str = "84h/0h/0h/0/0") -> str:
    node = Bip32Slip10Secp256k1.FromSeed(seed).DerivePath(path)
    return P2WPKHAddr.EncodeKey(node.PublicKey().KeyObject(), hrp="bc")


def node_bip84(seed: bytes, path: str = "84h/0h/0h/0/0"):
    return Bip32Slip10Secp256k1.FromSeed(seed).DerivePath(path)


B58 = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"


def b58check(payload: bytes) -> str:
    """Base58Check (свой код — независим от bip_utils): payload уже включает версию."""
    cs = hashlib.sha256(hashlib.sha256(payload).digest()).digest()[:4]
    n = int.from_bytes(payload + cs, "big")
    s = ""
    while n:
        n, r = divmod(n, 58)
        s = B58[r] + s
    return "1" * (len(payload) - len(payload.lstrip(b"\0"))) + s


def wif_compressed(priv: bytes) -> str:
    """WIF mainnet, compressed: 0x80 || key || 0x01."""
    return b58check(b"\x80" + priv + b"\x01")


def priv_bip84(seed: bytes, path: str = "84h/0h/0h/0/0") -> bytes:
    return node_bip84(seed, path).PrivateKey().Raw().ToBytes()


def selftest() -> int:
    ok = {}
    # [A] BIP39 -> PBKDF2 seed: официальный вектор теста BIP39 (12 слов "abandon...about" + TREZOR)
    w12 = ["abandon"] * 11 + ["about"]
    exp = ("c55257c360c07c72029aebc1b53c05ed0362ada38ead3e3e9efa3708e53495531f09a6987599d1826"
           "4c1e1c92f2cf141630c7a3c4ab7c81b2f001698e7463b04")
    ok["A seed(BIP39-вектор)"] = seed_of(w12, "TREZOR").hex() == exp
    # [B] seed -> BIP84 m/84'/0'/0'/0/0: официальный вектор BIP84 (тот же мнемоник, пустая passphrase)
    ok["B BIP84-вектор"] = addr_bip84(seed_of(w12, "")) == "bc1qcr8te4kr609gcawutmrza0j4xv80jy8z306fyu"
    # [C] эквивалентность чексуммы независимой реализации bip_utils на 400 случайных фразах
    from bip_utils import Bip39MnemonicGenerator, Bip39MnemonicValidator, Bip39WordsNum, Bip39Languages
    gen, val = Bip39MnemonicGenerator(), Bip39MnemonicValidator(Bip39Languages.ENGLISH)
    same = True
    for wn in (Bip39WordsNum.WORDS_NUM_12, Bip39WordsNum.WORDS_NUM_24):
        for _ in range(200):
            s = str(gen.FromWordsNumber(wn))
            if mnemonic_checksum_ok(s.split()) != val.IsValid(s):
                same = False
    # и на заведомо неверной фразе
    bad = " ".join(["abandon"] * 24)
    ok["C чексумма == bip_utils"] = same and val.IsValid(bad) is False and mnemonic_checksum_ok(bad.split()) is False
    # [D] внешний known-answer: Hunt #1 той же схемы (12 слов + passphrase) -> известный адрес
    h1 = ("fortune all man kind one giant step into digital tomorrow virtual moon").split()
    ok["D known-answer (Hunt #1)"] = addr_bip84(seed_of(h1, "supernova")) == "bc1qgtymp8q7hw2k9tewhdq74vdlpkqhflgju69n95"
    # [E] ветка приватного ключа: официальный BIP84-вектор m/84'/0'/0'/0/0 и перепроверка WIF
    vec = "4604b4b710fe91f584fff084e1a9159fe4f8408fff380596a604948474ce4fa3"
    k = priv_bip84(seed_of(w12, "")).hex()
    from bip_utils import WifEncoder, WifPubKeyModes
    ok["E ключ BIP84-вектора"] = k == vec
    ok["E2 WIF == bip_utils"] = (wif_compressed(bytes.fromhex(vec))
                                 == WifEncoder.Encode(bytes.fromhex(vec), b"\x80", WifPubKeyModes.COMPRESSED))
    for k, v in ok.items():
        print("[%s]" % ("OK  " if v else "FAIL"), k)
    allok = all(ok.values())
    print("SELFTEST", "OK" if allok else "FAILED")
    return 0 if allok else 1


def run(fr_words: list[str]) -> int:
    if len(fr_words) != 21:
        print("нужно ровно 21 французское слово, получено %d" % len(fr_words))
        return 2
    en = fr_to_en(fr_words) + TAIL_EN
    print("EN-фраза:", " ".join(en))
    good = mnemonic_checksum_ok(en)
    print("чексумма всей 24-словной фразы:", "ВАЛИДНА" if good else "невалидна")
    if not good:
        hits = [w for w in CHECK8 if mnemonic_checksum_ok(en[:23] + [w])]
        print("indice 9: из 8 слов-верификаторов подходит:", hits or "ни одно (значит 23 слова собраны неверно)")
        if not hits:
            return 1
    a = addr_bip84(seed_of(en, ""))
    print("адрес m/84'/0'/0'/0/0 =", a)
    if a == TARGET:
        # Приватный материал: ТОЛЬКО в stdout этого сеанса, ничего не сохраняем в репозиторий.
        # По протоколу ключ передаётся лично Илье; транзакции не подписываются и не вещаются.
        seed = seed_of(en, "")
        print("СОВПАДЕНИЕ С ЦЕЛЬЮ — seed:", seed.hex())
        print("приватный ключ (raw hex):", priv_bip84(seed).hex())
        print("приватный ключ (WIF, compressed):", wif_compressed(priv_bip84(seed)))
        print("НЕ СОХРАНЯТЬ В РЕПОЗИТОРИЙ. Передать лично Илье; вывод денег — только по его явному письменному команду.")
        return 0
    print("не цель")
    return 1


if __name__ == "__main__":
    args = sys.argv[1:]
    if args == ["--selftest"]:
        sys.exit(selftest())
    if len(args) == 1 and Path(args[0]).is_file():
        # слова из файла: любые пробелы/передачи, комментарии с # игнорируются
        txt = Path(args[0]).read_text("utf-8-sig")
        txt = "\n".join(ln.split("#")[0] for ln in txt.splitlines())
        args = txt.split()
    sys.exit(run(args))
