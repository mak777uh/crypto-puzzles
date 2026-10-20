#!/usr/bin/env python3
"""Axis A-AES (registered in LOG before the run): the 64-hex Morse payload of the
Groestlcoin puzzle is treated as AES ciphertext, with key material derived from the
separate stego hint "356ef". ECB and CBC(IV=0), both directions, AES-128/192/256.
Outputs (16/32-byte blocks, concatenations) plus SHA-256 / reversed variants are
checked as secp256k1 private keys against the prize hash160.

No brute force: a fixed, small candidate list.

Target: FindKEYLrVaahtkaVRk8KTspRMyWxfUi3i
hash160: 956453576444632092713b08f81892b4d24791e6
"""
import hashlib

from Crypto.Cipher import AES
from Crypto.Hash import keccak
from ecdsa import SigningKey, SECP256k1

HEX64 = "15D4B9DBC48302F65DC3E055557B5BBF7DB832F43097FC6E648F5E1BE66C63D3"
FRAG = "356ef"
TARGET_H160 = bytes.fromhex("956453576444632092713b08f81892b4d24791e6")
SECP256K1_ORDER = int(
    "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141", 16
)


def hash160(pub_bytes):
    return hashlib.new("ripemd160", hashlib.sha256(pub_bytes).digest()).digest()


def check(priv32: bytes, label: str, hits: list, seen: set):
    if len(priv32) != 32:
        return
    v = int.from_bytes(priv32, "big")
    if not (0 < v < SECP256K1_ORDER):
        return
    key = priv32
    if key in seen:
        return
    seen.add(key)
    sk = SigningKey.from_string(key, curve=SECP256k1)
    vk = sk.get_verifying_key()
    comp = b"\x02" + (b"\x03" if vk.pubkey.point.y() & 1 else b"\x02")
    comp = comp[:1] + vk.to_string()[:32]
    unc = b"\x04" + vk.to_string()
    for form, pk in (("comp", comp), ("unc", unc)):
        if hash160(pk) == TARGET_H160:
            hits.append((label, form, key.hex()))


def witness() -> bool:
    ok = True
    # NIST FIPS-197 known-answer vectors: AES-128 and AES-256.
    pt = bytes.fromhex("00112233445566778899aabbccddeeff")
    vectors = {
        "AES-128": (
            bytes.fromhex("000102030405060708090a0b0c0d0e0f"),
            bytes.fromhex("69c4e0d86a7b0430d8cdb78070b4c55a"),
        ),
        "AES-256": (
            bytes.fromhex("000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f"),
            bytes.fromhex("8ea2b7ca516745bfeafc49904b496089"),
        ),
    }
    for vname, (key, ct) in vectors.items():
        got = AES.new(key, AES.MODE_ECB).encrypt(pt)
        if got != ct:
            print(f"WITNESS FAIL {vname} enc", got.hex())
            ok = False
        if AES.new(key, AES.MODE_ECB).decrypt(ct) != pt:
            print(f"WITNESS FAIL {vname} dec")
            ok = False
    # Already-certified hash160/base58 pipeline: priv=1 addresses.
    sk = SigningKey.from_string((1).to_bytes(32, "big"), curve=SECP256k1)
    vk = sk.get_verifying_key()
    comp_pub = b"\x02" + vk.to_string()[:32]
    unc_pub = b"\x04" + vk.to_string()
    import base58

    def addr(pk):
        return base58.b58encode_check(b"\x00" + hash160(pk)).decode()

    a_c, a_u = addr(comp_pub), addr(unc_pub)
    if a_c != "1BgGZ9tcN4rm9KBzDn7KprQz87SZ26SAMH":
        print("WITNESS FAIL compressed addr", a_c)
        ok = False
    if a_u != "1EHNa6Q4Jz2uvNExL497mE43ikXhwF6kZm":
        print("WITNESS FAIL uncompressed addr", a_u)
        ok = False
    print("WITNESS", "OK" if ok else "FAIL", "| comp", a_c, "| unc", a_u)
    return ok


def pad_x(data: bytes, n: int, mode: str) -> bytes:
    if len(data) >= n:
        return data[:n]
    if mode == "zero":
        return data + b"\x00" * (n - len(data))
    return (data * (n // len(data) + 1))[:n]


def keccak256(data: bytes) -> bytes:
    h = keccak.new(digest_bits=256)
    h.update(data)
    return h.digest()


def derive_keys():
    frag_b = FRAG.encode()
    frag_raw = bytes.fromhex("0356ef")  # 0x356ef left-padded to a whole byte count
    n = 0x356EF
    frag_be32 = n.to_bytes(32, "big")
    frag_le32 = n.to_bytes(32, "little")
    keys = {}
    for label, base in (
        ("frag_ascii", frag_b),
        ("frag_hexpad", frag_raw),
        ("frag_be32", frag_be32),
        ("frag_le32", frag_le32),
        ("frag_upper", FRAG.upper().encode()),
    ):
        keys[f"{label}|md5"] = hashlib.md5(base).digest()
        keys[f"{label}|sha1_first16"] = hashlib.sha1(base).digest()[:16]
        keys[f"{label}|sha1_20pad32"] = pad_x(hashlib.sha1(base).digest(), 32, "zero")
        keys[f"{label}|sha256"] = hashlib.sha256(base).digest()
        keys[f"{label}|sha512_first32"] = hashlib.sha512(base).digest()[:32]
        keys[f"{label}|sha3_256"] = hashlib.sha3_256(base).digest()
        keys[f"{label}|keccak256"] = keccak256(base)
        keys[f"{label}|sha256_sha256"] = hashlib.sha256(
            hashlib.sha256(base).digest()
        ).digest()
        for size in (16, 24, 32):
            keys[f"{label}|zero{size}"] = pad_x(base, size, "zero")
            keys[f"{label}|rep{size}"] = pad_x(base, size, "repeat")
    return keys


def ciphertexts():
    raw = bytes.fromhex(HEX64)
    return {
        "raw": raw,
        "raw_rev": raw[::-1],
        "ascii_hex": HEX64.encode(),
        "ascii_hex_lower": HEX64.lower().encode(),
        "raw_xor_ff": bytes(b ^ 0xFF for b in raw),
    }


def outputs_for(ct: bytes):
    """Split decrypted/encrypted output into 16-byte blocks, plus concatenations."""
    outs = {}
    if len(ct) % 16:
        return outs
    for i in range(0, len(ct), 16):
        outs[f"blk{i // 16}"] = ct[i : i + 16]
    if len(ct) in (16, 32):
        outs["full"] = ct
    return outs


def main():
    if not witness():
        raise SystemExit("oracle not certified; refusing to run")

    keys = derive_keys()
    cts = ciphertexts()
    hits = []
    seen = set()
    n = 0
    for kname, key in keys.items():
        for klen in (16, 24, 32):
            if len(key) < klen:
                continue
            use_key = key[:klen]
            for mode in ("ecb", "cbc0"):
                def make_cipher(m=mode, k=use_key):
                    if m == "ecb":
                        return AES.new(k, AES.MODE_ECB)
                    return AES.new(k, AES.MODE_CBC, iv=b"\x00" * 16)

                for cname, ct in cts.items():
                    if len(ct) % 16:
                        continue
                    for direction in ("dec", "enc"):
                        cipher = make_cipher()
                        try:
                            out = (
                                cipher.decrypt(ct)
                                if direction == "dec"
                                else cipher.encrypt(ct)
                            )
                        except ValueError:
                            continue
                        n += 1
                        for oname, ob in outputs_for(out).items():
                            variants = {
                                "raw": ob,
                                "sha256": hashlib.sha256(ob).digest(),
                                "rev": ob[::-1],
                            }
                            for vname, vb in variants.items():
                                label = (
                                    f"{kname}|k{klen * 8}|{mode}|{cname}|"
                                    f"{direction}|{oname}|{vname}"
                                )
                                if len(vb) == 16:
                                    check(vb.rjust(32, b"\x00"), label + "|lpad", hits, seen)
                                    check(vb.ljust(32, b"\x00"), label + "|rpad", hits, seen)
                                else:
                                    check(vb, label, hits, seen)
    print(
        f"checked {n} AES ops, unique privkeys {len(seen)}, hits {len(hits)}"
    )
    for h in hits:
        print("MATCH", h)


if __name__ == "__main__":
    main()
