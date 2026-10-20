# -*- coding: utf-8 -*-
"""CATS-puzzle oracle (HomelessPhD/CorePhylips_CATS pipeline).

Reproduces bip39/bip32/buidl pipeline used by Corey Phillips' bitimage:
  entropy = sha256(base64(image_bytes))
  mnemonic = BIP39(entropy)                 # 24 words
  seed = PBKDF2-HMAC-SHA512(mnemonic, "mnemonic"+passphrase, 2048)
  key = BIP32(seed) m/84'/0'/0'/0/0; address = bech32 P2WPKH

Witness (passphrase ""): bc1q57euh23y3qs2f9d5mtwpax5lqecfvrdkqce82a
Target (unknown passphrase): bc1qcyrndzgy036f6ax370g8zyvlw86ulawgt0246r
"""
import base64, hashlib, hmac, sys
from pathlib import Path
import coincurve

D = Path(__file__).resolve().parents[2]
IMG = D / "data" / "homelessphd" / "cats_2.jpeg"
WORDS = [w.strip() for w in (D / "data" / "bip39-english.txt").read_text("utf-8").splitlines() if w.strip()]
assert len(WORDS) == 2048
N = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141
H = 0x80000000
CHARSET = "qpzry9x8gf2tvdw0s3jn54khce6mua7l"
WITNESS = "bc1q57euh23y3qs2f9d5mtwpax5lqecfvrdkqce82a"
TARGET = "bc1qcyrndzgy036f6ax370g8zyvlw86ulawgt0246r"


def _hmac(key, msg):
    I = hmac.new(key, msg, hashlib.sha512).digest()
    return int.from_bytes(I[:32], "big"), I[32:]


def entropy_to_mnemonic(ent: bytes) -> str:
    h = hashlib.sha256(ent).digest()
    bits = "".join(format(b, "08b") for b in ent) + format(h[0], "08b")[:8]
    inds = [int(bits[i:i+11], 2) for i in range(0, len(bits), 11)]
    return " ".join(WORDS[i] for i in inds)


def seed_from_mnemonic(mnemonic: str, passphrase: str = "") -> bytes:
    return hashlib.pbkdf2_hmac("sha512", mnemonic.encode("utf-8"),
                               b"mnemonic" + passphrase.encode("utf-8"), 2048)


def derive_pub(seed: bytes, path="m/84'/0'/0'/0/0"):
    k, c = _hmac(b"Bitcoin seed", seed)
    for seg in path.split("/")[1:]:
        hard = seg.endswith("'")
        i = int(seg.rstrip("'")) + (H if hard else 0)
        if hard:
            I = hmac.new(c, b"\0" + k.to_bytes(32, "big") + i.to_bytes(4, "big"), hashlib.sha512).digest()
        else:
            P = coincurve.PublicKey.from_valid_secret(k.to_bytes(32, "big")).format(True)
            I = hmac.new(c, P + i.to_bytes(4, "big"), hashlib.sha512).digest()
        k = (int.from_bytes(I[:32], "big") + k) % N
        c = I[32:]
    return k, coincurve.PublicKey.from_valid_secret(k.to_bytes(32, "big")).format(True)


def _bech32_polymod(values):
    gen = [0x3b6a57b2, 0x26508e6d, 0x1ea119fa, 0x3d4233dd, 0x2a1462b3]
    chk = 1
    for v in values:
        b = chk >> 25
        chk = (chk & 0x1ffffff) << 5 ^ v
        for i in range(5):
            chk ^= gen[i] if ((b >> i) & 1) else 0
    return chk


def _hrp_expand(hrp):
    return [ord(x) >> 5 for x in hrp] + [0] + [ord(x) & 31 for x in hrp]


def _create_checksum(hrp, data):
    values = _hrp_expand(hrp) + data
    polymod = _bech32_polymod(values + [0] * 6) ^ 1
    return [(polymod >> 5 * (5 - i)) & 31 for i in range(6)]


def _convertbits(data, frombits, tobits):
    acc = bits = 0
    ret = []
    maxv = (1 << tobits) - 1
    for value in data:
        acc = (acc << frombits) | value
        bits += frombits
        while bits >= tobits:
            bits -= tobits
            ret.append((acc >> bits) & maxv)
    if bits:
        ret.append((acc << (tobits - bits)) & maxv)
    return ret


def p2wpkh_address(pub: bytes, hrp="bc") -> str:
    h = hashlib.new("ripemd160", hashlib.sha256(pub).digest()).digest()
    data = [0] + _convertbits(h, 8, 5)
    combined = data + _create_checksum(hrp, data)
    return hrp + "1" + "".join(CHARSET[d] for d in combined)


def make_checker(image_path: Path = IMG):
    entropy = hashlib.sha256(base64.b64encode(image_path.read_bytes())).digest()
    mnemonic = entropy_to_mnemonic(entropy)

    def check(passphrase: str):
        seed = seed_from_mnemonic(mnemonic, passphrase)
        k, pub = derive_pub(seed)
        return p2wpkh_address(pub), k.to_bytes(32, "big").hex()
    return check


def selftest():
    a, _ = make_checker()("")
    print("witness address:", a)
    print("WITNESS", "OK" if a == WITNESS else "FAIL")
    return a == WITNESS


if __name__ == "__main__":
    ok = selftest()
    if len(sys.argv) > 1:
        a2, k2 = make_checker()(sys.argv[1])
        print("pass=", sys.argv[1], "addr=", a2, "key=", k2)
    sys.exit(0 if ok else 1)
