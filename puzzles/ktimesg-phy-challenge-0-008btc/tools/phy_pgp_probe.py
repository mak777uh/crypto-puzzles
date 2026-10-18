"""Разбор PGP-блока из поста-приза (msg66860784) + тайминг S2K + Цезарь для мета-хинта.

Только анализ структуры и замер стоимости; никакого подбора пароля.
"""
import base64
import hashlib
import time

BLOB = ("jA0ECQMKVwglgSLxlRn/0jcBn0f9h3kbilK/NDDWZCkuONpev7JZbbw+l6uVZC0N"
        "aJFXTLG6sbLXr6t0z3scptSM3vWBCmOU=D+ub")
raw = base64.b64decode(BLOB.replace("\n", ""))
print("длина байтов:", len(raw), "=", raw.hex())

i = 0
ALGOS = {1: "IDEA", 2: "3DES", 3: "Twofish", 4: "Blowfish", 7: "AES128", 8: "AES192",
         9: "AES256", 10: "nonexistent-10", 11: "SHA256", 13: "SHA512"}
while i < len(raw):
    pt = raw[i]
    if not (pt & 0x80):
        print("!? не packet header в", i); break
    if pt & 0x40:  # новый формат
        tag = pt & 0x3F
        l1 = raw[i + 1]
        if l1 < 192:
            ln, hs = l1, 2
        elif l1 < 255:
            ln = ((l1 - 192) << 8) + raw[i + 2] + 192; hs = 3
        else:
            ln = int.from_bytes(raw[i + 2:i + 6], "big"); hs = 6
        body = raw[i + hs:i + hs + ln]
        print(f"[новый] tag={tag} len={ln} @ {i}")
    else:         # старый формат
        tag = (pt >> 2) & 0x0F
        lt = pt & 0x03
        if lt == 0:
            ln, hs = raw[i + 1], 2
        elif lt == 1:
            ln, hs = int.from_bytes(raw[i + 1:i + 3], "big"), 3
        elif lt == 2:
            ln, hs = int.from_bytes(raw[i + 1:i + 5], "big"), 5
        else:
            body = raw[i + 1:]; ln = len(body); hs = 1
            print(f"[старый] tag={tag} len=до конца ({ln}) @ {i}")
            i += 1
            continue
        body = raw[i + hs:i + hs + ln]
        print(f"[старый] tag={tag} len={ln} @ {i}")
    if tag == 3:
        v = body[0]; alg = body[1]; s2kt = body[2]
        print("   skey v%s sym=%s(%s) s2k=%s" % (v, alg, ALGOS.get(alg, "?"), s2kt))
        if s2kt == 3:
            h = body[3]
            salt = body[4:12]
            cnt = int.from_bytes(body[12:13], "big")
            o = (cnt & 0x07) + 8
            count = (16 + o) << ((cnt >> 4) + 6)
            print("   salted+iterated: hash=%s(%s) salt=%s c-byte=0x%02X -> count=%d"
                  % (h, ALGOS.get(h, "?"), salt.hex(), cnt, count))
        i += hs + ln
        continue
    if tag == 18:
        print("   SEIPD v%s" % body[0])
        i += hs + ln
        continue
    i += hs + ln

# --- тайминг одного S2K-прогона (без подбора) --------------------------------
def s2k(passphrase: bytes, salt: bytes, count: int, hashname="sha512", keylen=32):
    h = hashlib.new(hashname)
    pre = salt + passphrase
    h.update(pre)
    pos = len(pre)
    if pos < count:
        while pos + len(pre) < count:
            h.update(pre); pos += len(pre)
        h.update(pre[:count - pos])
    return h.digest()[:keylen]

salt = bytes.fromhex("5708258122F19519")
t0 = time.time()
for _ in range(5):
    s2k(b"sample", salt, 65011712 // 16)
dt = (time.time() - t0) / 5
print("\nS2K (полный count=65011712) один проход: %.3f с -> ~%.1f прогонов/мин" % (dt * 16, 60 / (dt * 16)))

# --- Цезарь для мета-хинта --------------------------------------------------
mc = "gvonys fhelucrM kbZ"
for s in range(1, 26):
    d = "".join(chr(0x41 + (ord(c) - 0x41 + s) % 26) if c.isupper()
                else chr(0x61 + (ord(c) - 0x61 + s) % 26) if c.islower() else c for c in mc)
    r = "".join(reversed(d))
    print(f"shift {s:2d}: {d:22s} | слово-наоборот: {' '.join(w[::-1] for w in d.split())}")
