#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Fast BIP39 -> MetaMask default address (m/44'/60'/0'/0/0), for CPU sweeps.

bip_utils derives only ~43 addresses/second on this host, which makes any sweep
of even a few million checksum-valid candidates take hours.  This path uses
only C-backed primitives:

    hashlib.pbkdf2_hmac   (OpenSSL PBKDF2-HMAC-SHA512, 2048 iters)
    hmac + hashlib.sha512 (BIP32 CKDpriv)
    coincurve.PublicKey   (libsecp256k1 point multiplication / public key)
    Crypto.Hash.keccak    (pycryptodome keccak-256)

Correctness is checked against the canonical BIP-0039 vector and against
bip_utils in tools/fast_eth_selftest.py.

Usage as a library:
    from fast_eth import address_of
"""
import hashlib
import hmac

from coincurve import PublicKey
from Crypto.Hash import keccak

_N = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141
_HARDENED = 0x80000000


def _keccak256(b: bytes) -> bytes:
    h = keccak.new(digest_bits=256)
    h.update(b)
    return h.digest()


def _ckd_priv(k, c, i, hardened):
    kb = k.to_bytes(32, "big")
    if hardened:
        data = b"\x00" + kb + (i | 0x80000000).to_bytes(4, "big")
    else:
        data = PublicKey.from_valid_secret(kb).format(compressed=True) + i.to_bytes(4, "big")
    I = hmac.new(c, data, hashlib.sha512).digest()
    return (int.from_bytes(I[:32], "big") + k) % 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141, I[32:]


def address_from_mnemonic(mnemonic: str) -> str:
    seed = hashlib.pbkdf2_hmac("sha512", mnemonic.encode("utf-8"), b"mnemonic", 2048)
    I = hmac.new(b"Bitcoin seed", seed, hashlib.sha512).digest()
    k = int.from_bytes(I[:32], "big")
    c = I[32:]
    for idx, hard in ((44, True), (60, True), (0, True), (0, False), (0, False)):
        k, c = _ckd_priv(k, c, idx, hard)
    pub = PublicKey.from_valid_secret(k.to_bytes(32, "big")).format(compressed=False)
    return "0x" + _keccak256(pub[1:])[-20:].hex()


def main():
    import time
    w = "abandon " * 11 + "about"
    addr = address_from_mnemonic(w)
    ok = addr == "0x9858effd232b4033e47d90003d41ec34ecaeda94"
    print("canonical:", addr, "OK" if ok else "MISMATCH")
    n = 300
    t = time.time()
    for _ in range(n):
        address_from_mnemonic(w)
    print(f"rate = {n/(time.time()-t):,.0f} derivations/s (single core)")


if __name__ == "__main__":
    main()
