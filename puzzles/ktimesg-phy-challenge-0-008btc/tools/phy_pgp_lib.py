"""OpenPGP-библиотека для подпазла «PGP MESSAGE» (msg66860784, хинт 21.06.2026).

Только то, что нужно: iterated+salted S2K (AES-256, SHA-512), SEIPD v1, проверка MDC.
Оракул точный: совпадение 20-байтного SHA-1 MDC (ложноположительный ~2^-160).
"""
from __future__ import annotations

import base64
import hashlib

from Crypto.Cipher import AES

BLOB_B64 = ("jA0ECQMKVwglgSLxlRn/0jcBn0f9h3kbilK/NDDWZCkuONpev7JZbbw+l6uVZC0N"
            "aJFXTLG6sbLXr6t0z3scptSM3vWBCmOU")   # без CRC
CRC_B64 = "D+ub"

HASHES = {1: "md5", 2: "sha1", 3: "ripemd160", 8: "sha256", 9: "sha384", 10: "sha512"}
SYM = {1: ("IDEA", 16), 2: ("3DES", 24), 3: ("Twofish", 16), 4: ("Blowfish", 16),
       7: ("AES-128", 16), 8: ("AES-192", 24), 9: ("AES-256", 32)}


def crc24(data: bytes) -> int:
    crc = 0xB704CE
    for b in data:
        crc ^= b << 16
        for _ in range(8):
            crc <<= 1
            if crc & 0x1000000:
                crc ^= 0x864CFB
        crc &= 0xFFFFFF
    return crc


def parse_packets(raw: bytes):
    """[(tag, body)] для старого и нового формата без вложенного разбора."""
    out, i = [], 0
    while i < len(raw):
        pt = raw[i]
        if not (pt & 0x80):
            break
        if pt & 0x40:
            l1 = raw[i + 1]
            if l1 < 192:
                ln, hs = l1, 2
            elif l1 < 255:
                ln, hs = ((l1 - 192) << 8) + raw[i + 2] + 192, 3
            else:
                ln, hs = int.from_bytes(raw[i + 2:i + 6], "big"), 6
            out.append((pt & 0x3F, raw[i + hs:i + hs + ln])); i += hs + ln
        else:
            tag, lt = (pt >> 2) & 0x0F, pt & 0x03
            ln = {0: (raw[i + 1], 2), 1: (int.from_bytes(raw[i + 1:i + 3], "big"), 3),
                  2: (int.from_bytes(raw[i + 1:i + 5], "big"), 5)}.get(lt, (len(raw) - i - 1, 1))
            ln, hs = ln
            out.append((tag, raw[i + hs:i + hs + ln])); i += hs + ln
    return out


def blob() -> bytes:
    return base64.b64decode(BLOB_B64 + "=" * ((4 - len(BLOB_B64) % 4) % 4))


def s2k_iterated(passphrase: bytes, salt: bytes, count: int, hashname: str, keylen: int) -> bytes:
    """GnuPG «iterated+salted»: байтовый поток salt||pass, повторяемый до count байт.

    Дополнительная тонкость GnuPG: после первого полного прохода salt||pass в поток
    вставляется промежуточное значение хеша (prehash) — проверяется сертификацией о gpg.
    """
    prehash = salt + passphrase
    h = hashlib.new(hashname)
    if count <= len(prehash):
        h.update(prehash[:count])
        return h.digest()[:keylen]
    h.update(prehash)
    pos = len(prehash)
    # GnuPG: h1 = H(prehash); дальше в поток идут повторения prehash, а ровно ОДИН раз
    # после первого блока подставляется h1 (см. build_s2k_conk / openpgp_s2k_...).
    residual = h.digest()
    h = hashlib.new(hashname)
    h.update(prehash)
    h.update(residual)
    pos += len(residual)
    while pos + len(prehash) <= count:
        h.update(prehash)
        pos += len(prehash)
    if pos < count:
        h.update(prehash[:count - pos])
    return h.digest()[:keylen]


def parse_skesk(body: bytes):
    v, sym, s2kt = body[0], body[1], body[2]
    assert v == 4 and s2kt == 3, "неожиданный SKESK: v=%s s2k=%s" % (v, s2kt)
    halg, salt, cbyte = body[3], body[4:12], body[12]
    o = (cbyte & 0x07) + 8
    count = (16 + o) << ((cbyte >> 4) + 6)
    return sym, HASHES[halg], salt, count


def crack_candidate(pgp: bytes, passphrase: bytes):
    """Возвращает (True, plaintext) при валидном MDC, иначе (False, None)."""
    pk = parse_packets(pgp)
    skesk = next(b for t, b in pk if t == 3)
    seipd = next(b for t, b in pk if t == 18)
    sym, hashname, salt, count = parse_skesk(skesk)
    keylen = SYM[sym][1]
    key = s2k_iterated(passphrase, salt, count, hashname, keylen)
    body = seipd[1:]
    pt = AES.new(key, AES.MODE_CFB, iv=b"\x00" * 16, segment_size=128).decrypt(body)
    prefix, data = pt[:8], pt[8:]
    if len(data) < 22 or data[-22] != 0xFE or data[-21] != 0x19:
        return False, None
    plain = data[:-22]
    mdc = data[-20:]
    if hashlib.sha1(bytes([0xFE, 0x19]) + plain).digest() != mdc:
        return False, None
    return True, plain


if __name__ == "__main__":
    raw = blob()
    print("blob len:", len(raw))
    full = raw + base64.b64decode(CRC_B64 + "==")
    print("CRC24 в blob:", "%06X" % crc24(full[:-3]), "заявлено:", full[-3:].hex().upper())
    pk = parse_packets(raw)
    for t, b in pk:
        print("tag", t, "len", len(b))
    ok, pt = crack_candidate(raw, b"definitely-not-the-password")
    print("sanity (завомо верный пароль?):", ok)
