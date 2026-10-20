#!/usr/bin/env python3
"""Axis A-BIP39 (registered in LOG before the run): the 64-hex Morse payload of the
Groestlcoin puzzle is treated as one of a few 256-bit entropy sources, expanded to a
BIP39 mnemonic and/or used directly as a BIP32 seed, then checked against the prize
hash160 under common derivation paths. No brute force: a fixed list of ~200 candidates.

Target: FindKEYLrVaahtkaVRk8KTspRMyWxfUi3i
hash160: 956453576444632092713b08f81892b4d24791e6
"""
import hashlib
import itertools

from bip_utils import (
    Bip39MnemonicEncoder,
    Bip39SeedGenerator,
    Bip32Secp256k1,
)
from ecdsa import SigningKey, SECP256k1
from ecdsa.keys import BadSignatureError

HEX64 = "15D4B9DBC48302F65DC3E055557B5BBF7DB832F43097FC6E648F5E1BE66C63D3"
FRAG = "356ef"
TARGET_H160 = bytes.fromhex("956453576444632092713b08f81892b4d24791e6")


def hash160(pub_bytes):
    return hashlib.new("ripemd160", hashlib.sha256(pub_bytes).digest()).digest()


def pubkeys(priv32: bytes):
    sk = SigningKey.from_string(priv32, curve=SECP256k1)
    vk = sk.get_verifying_key()
    comp = b"\x02" + (b"\x03" if vk.pubkey.point.y() & 1 else b"\x02")
    comp = comp[:1] + vk.to_string()[:32]
    unc = b"\x04" + vk.to_string()
    return comp, unc


def check(priv32: bytes, label: str, hits: list, seen: set):
    if len(priv32) != 32:
        return
    if not (0 < int.from_bytes(priv32, "big") < SECP256K1_ORDER):
        return
    if priv32 in seen:
        return
    seen.add(priv32)
    comp, unc = pubkeys(priv32)
    for form, pk in (("comp", comp), ("unc", unc)):
        h = hash160(pk)
        if h == TARGET_H160:
            hits.append((label, form, priv32.hex()))


SECP256K1_ORDER = int(
    "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141", 16
)


def witness() -> bool:
    ok = True
    # 1) BIP39 Trezor vector: mnemonic + passphrase "TREZOR"
    mnem = "abandon " * 11 + "about"
    seed = Bip39SeedGenerator(mnem).Generate("TREZOR").hex()
    expected = (
        "c55257c360c07c72029aebc1b53c05ed0362ada38ead3e3e9efa3708e5349553"
        "1f09a6987599d18264c1e1c92f2cf141630c7a3c4ab7c81b2f001698e7463b04"
    )
    if seed != expected:
        print("WITNESS FAIL bip39 seed", seed)
        ok = False
    # 2) priv=1 -> known P2PKH addresses (compressed 1BgGZ..., uncompressed 1EHNa...)
    sk = SigningKey.from_string((1).to_bytes(32, "big"), curve=SECP256k1)
    vk = sk.get_verifying_key()
    comp = b"\x02" + vk.to_string()[:32]
    unc = b"\x04" + vk.to_string()
    import base58

    def addr(pk):
        payload = b"\x00" + hash160(pk)
        return base58.b58encode_check(payload).decode()

    a_c, a_u = addr(comp), addr(unc)
    # 1BgGZ9tcN4rm9KBzDn7KprQz87SZ26SAMH is priv=1 compressed (widely published)
    if a_c != "1BgGZ9tcN4rm9KBzDn7KprQz87SZ26SAMH":
        print("WITNESS FAIL compressed addr", a_c)
        ok = False
    if a_u != "1EHNa6Q4Jz2uvNExL497mE43ikXhwF6kZm":
        print("WITNESS FAIL uncompressed addr", a_u)
        ok = False
    print("WITNESS", "OK" if ok else "FAIL", "| comp", a_c, "| unc", a_u)
    return ok


def main():
    if not witness():
        raise SystemExit("oracle not certified; refusing to run")
    raw = bytes.fromhex(HEX64)
    frag = FRAG.encode()
    entropies = {
        "hex_bytes": raw,
        "hex_reversed": raw[::-1],
        "sha256_ascii": hashlib.sha256(HEX64.encode()).digest(),
        "sha256_raw": hashlib.sha256(raw).digest(),
        "sha256_sha256_raw": hashlib.sha256(hashlib.sha256(raw).digest()).digest(),
        "sha512_raw_first32": hashlib.sha512(raw).digest()[:32],
        "sha512_ascii_first32": hashlib.sha512(HEX64.encode()).digest()[:32],
        "keccak_raw": hashlib.sha3_256(raw).digest(),  # sha3, not keccak; cheap extra
        "xor_frag_raw": bytes(b ^ frag[i % len(frag)] for i, b in enumerate(raw)),
    }
    paths = [
        "m/44'/17'/0'/0/0",
        "m/44'/17'/0'/0/1",
        "m/44'/17'/0'/1/0",
        "m/49'/17'/0'/0/0",
        "m/84'/17'/0'/0/0",
        "m/44'/0'/0'/0/0",
        "m/49'/0'/0'/0/0",
        "m/84'/0'/0'/0/0",
        "m/0'/0/0",
        "m/0/0/0",
    ]
    hits = []
    seen = set()
    n = 0
    for ename, ent in entropies.items():
        mnem = Bip39MnemonicEncoder().Encode(ent)
        # A) mnemonic -> seed (empty passphrase) -> BIP32 paths
        seed = Bip39SeedGenerator(mnem).Generate("")
        # direct seed halves and master key
        check(seed[:32], f"{ename}|seed[:32]", hits, seen)
        n += 1
        ctx = Bip32Secp256k1.FromSeed(seed)
        check(ctx.PrivateKey().Raw().ToBytes(), f"{ename}|master", hits, seen)
        n += 1
        for p in paths:
            node = Bip32Secp256k1.FromSeed(seed).DerivePath(p)
            check(node.PrivateKey().Raw().ToBytes(), f"{ename}|mnem|{p}", hits, seen)
            n += 1
        # B) the 32 bytes directly as BIP32 seed (no mnemonic)
        ctx = Bip32Secp256k1.FromSeed(ent)
        check(ctx.PrivateKey().Raw().ToBytes(), f"{ename}|seed_direct|master", hits, seen)
        n += 1
        for p in paths:
            node = Bip32Secp256k1.FromSeed(ent).DerivePath(p)
            check(node.PrivateKey().Raw().ToBytes(), f"{ename}|seed_direct|{p}", hits, seen)
            n += 1
    print(f"checked {n} derivations, unique privkeys {len(seen)}, hits {len(hits)}")
    for h in hits:
        print("MATCH", h)


if __name__ == "__main__":
    main()
