# -*- coding: utf-8 -*-
"""phy: репликация ECDSA-восстановления из поста-оригинала.

Цель (правило точного оракула): из HTML- captura Wayback извлечь ДВА code-блока OP,
декодировать подпись, посчитать Bitcoin magic-hash(variants) и восстановить pubkey;
хит = ТОЧНОЕ совпадение с 02425afdd1716149faf414b6fdb96d5e7afc8ce42496042f4df559c80a7c6650eb
и адресом bc1qrpn28qa82uyjg37dvsz3w7wpm3kpdea957nm9p (проверен ончейн).

Никакого перебора: вариантов текста ~десятки.
"""
import re, html, hashlib, os, base64, itertools, json

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
WB = os.path.join(BASE, "data", "wayback")

TARGET_PK = "02425afdd1716149faf414b6fdb96d5e7afc8ce42496042f4df559c80a7c6650eb"
TARGET_ADDR = "bc1qrpn28qa82uyjg37dvsz3w7wpm3kpdea957nm9p"

P = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F
N = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141
Gx = 0x79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798
Gy = 0x483ADA7726A3C4655DA4FBFC0E1108A8FD17B448A68554199C47D08FFB10D4B8


def code_blocks(path):
    """Вернуть список текстовых содержимых div.code первого поста (msg66802369)."""
    s = open(path, encoding="utf-8", errors="replace").read()
    i = s.find('id="subject_66802369"')
    if i < 0:
        raise SystemExit("OP not found in " + path)
    j = s.find('<div class="post">', i)
    k = s.find('<a name="msg', j + 10)          # конец поста = начало следующего
    body = s[j:k]
    blocks = re.findall(r'<div class="code">(.*?)</div>', body, re.S)
    out = []
    for b in blocks:
        b = re.sub(r"<br\s*/?>", "\n", b)
        b = re.sub(r"<[^>]+>", "", b)
        b = html.unescape(b).replace("\r\n", "\n").replace("\r", "\n")
        out.append(b)
    # подпись (второй блок) не должна нести переводов
    return out


# ---------- secp256k1 ----------
def inv(a, m):
    return pow(a, m - 2, m)


def point_add(pt, q):
    if pt is None:
        return q
    if q is None:
        return pt
    if pt[0] == q[0] and (pt[1] + q[1]) % P == 0:
        return None
    if pt == q:
        lam = 3 * pt[0] * pt[0] * inv(2 * pt[1], P) % P
    else:
        lam = (q[1] - pt[1]) * inv(q[0] - pt[0], P) % P
    x = (lam * lam - pt[0] - q[0]) % P
    y = (lam * (pt[0] - x) - pt[1]) % P
    return (x, y)


def mul(k, p):
    r = None
    while k:
        if k & 1:
            r = point_add(r, p)
        p = point_add(p, p)
        k >>= 1
    return r


def b58_addr(pub_compressed):
    h = hashlib.new("ripemd160", hashlib.sha256(pub_compressed).digest()).digest()
    return "bc1q" + bech32m_segwit(h)


CHARSET = "qpzry9x8gf2tvdw0s3jn54khce6mua7l"


def bech32_convert(data, frombits, tobits, pad=True):
    acc, bits, ret = 0, 0, []
    maxv = (1 << tobits) - 1
    for v in data:
        acc = (acc << frombits) | v
        bits += frombits
        while bits >= tobits:
            bits -= tobits
            ret.append((acc >> bits) & maxv)
    if pad and bits:
        ret.append((acc << (tobits - bits)) & maxv)
    return ret


def bech32_polymod(values):
    GEN = [0x3B6A57B2, 0x26508E6D, 0x1EA119FA, 0x3D4233DD, 0x2A1462B3]
    chk = 1
    for v in values:
        b = chk >> 25
        chk = (chk & 0x1FFFFFF) << 5 ^ v
        for i in range(5):
            chk ^= GEN[i] if ((b >> i) & 1) else 0
    return chk


def bech32_create(hrp, witver, witprog):
    data = [witver] + bech32_convert(witprog, 8, 5)
    values = hrp_expand(hrp) + data
    polymod = bech32_polymod(values + [0, 0, 0, 0, 0, 0]) ^ 1
    return hrp + "1" + "".join(CHARSET[d] for d in data + [(polymod >> 5 * (5 - i)) & 31 for i in range(6)])


def hrp_expand(hrp):
    return [ord(c) >> 5 for c in hrp] + [0] + [ord(c) & 31 for c in hrp]


def segwit_addr(h160):
    return bech32_create("bc", 0, list(h160))


def magic_hash(msg: bytes) -> bytes:
    prefix = b"\x18Bitcoin Signed Message:\n"
    if len(msg) < 253:
        varint = bytes([len(msg)])
    else:
        varint = b"\xfd" + len(msg).to_bytes(2, "little")
    return hashlib.sha256(hashlib.sha256(prefix + varint + msg).digest()).digest()


def recover(r, s, z, recid):
    if recid & 2:
        return None
    x = r + (N if recid & 1 else 0)
    if x >= P:
        return None
    alpha = (pow(x, 3, P) + 7) % P
    beta = pow(alpha, (P + 1) // 4, P)
    if pow(beta, 2, P) != alpha:
        return None
    y = beta if (beta & 1) == (recid & 1) else P - beta
    R = (x, y)
    rinv = inv(r, N)
    u1 = -z * rinv % N
    u2 = s * rinv % N
    Q = point_add(mul(u1, (Gx, Gy)), mul(u2, R))
    if Q is None:
        return None
    parity = "02" if Q[1] % 2 == 0 else "03"
    return (parity + "%064x" % Q[0]).lower(), Q


def main():
    logs = []
    files = [f for f in os.listdir(WB) if f.endswith(".html")]
    print("captures:", files)
    parsed = {}
    for f in files:
        try:
            parsed[f] = code_blocks(os.path.join(WB, f))
        except SystemExit as e:
            print("skip", f, e)
    for f, bl in parsed.items():
        print("=" * 70)
        print(f, "code-блоков:", len(bl))
        for n, b in enumerate(bl):
            print("-" * 20, "block", n, "len", len(b))
            print(repr(b[:2000]))
    # ---- подпись: берём блоки из пост-фикс captures
    sig_b64 = None
    texts = []
    for f, bl in parsed.items():
        for b in bl:
            bb = b.strip()
            if re.fullmatch(r"[A-Za-z0-9+/=_\s]{60,200}", bb) and "J0d1" in bb.replace("\n", ""):
                sig_b64 = bb.replace("\n", "")
            if "modular values" in bb:
                texts.append((f, bb))
    print("=" * 70)
    print("sig_b64:", sig_b64, "len", len(sig_b64) if sig_b64 else None)
    if not sig_b64:
        raise SystemExit("signature not extracted")
    raw = base64.b64decode(sig_b64 + "=" * (-len(sig_b64) % 4))
    print("sig bytes:", len(raw), "header:", raw[0])
    r = int.from_bytes(raw[1:33], "big")
    s = int.from_bytes(raw[33:65], "big")
    print("r = 0x%x" % r)
    print("s = 0x%x" % s, "bits", s.bit_length())
    assert raw[0] == 39, raw[0]
    json.dump({"sig_b64": sig_b64, "r": "%x" % r, "s": "%x" % s,
               "blocks": {f: bl for f, bl in parsed.items()}},
              open(os.path.join(WB, "extracted.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)


if __name__ == "__main__":
    main()
