#!/usr/bin/env python3
"""Structural check: do the chain1-4 K-values act as private keys of on-chain addresses?

The page's VIC decode says: "IN CASE YOU MANAGE TO CRACK THIS THE PRIVATE KEYS BELONG TO
HALF AND BETTER HALF AND THEY ALSO NEED FUNDS TO LIVE".  The chain reconstruction produces
8 32-byte K-values.  Nobody in the README/LOG maps them to addresses.  If any K-value is the
private key of an on-chain address, the chain semantics become evident (structural validation,
which doctrine #55 demands).

Also derives addresses from simple transforms of each K (sha256, sha256d) as a control.
"""
import hashlib
import itertools
import sys

K = {
    "K_C1": "9fa9db91a9dee0e38b93694ec874630b30f32f33671987543b1cf913f4746439",
    "K_C2": "1517389608d55021dc436b66ec513a617c4f14cb0fed4708b535641a6dfe8210",
    "K_S1": "b06fa6f20561756c865dac7190f063480a371e4a13206e529ee7e9078f309c4b",
    "K_S2": "b11d211ca0a17cd68c580308f3e6f21d3f935c8da3c4373b6f73ab5ccfaea597",
    "K_B1": "44d19415009a2929a83b2f4e0da7b180d12f8b341cb879dd769ade1f8d399d40",
    "K_B2": "ae27695b880aa5701df9abd8c96387cd9205a339dbf3fc5a1c6d0a8e6793438a",
    "K_H1": "db9ccfe92a60ad7cc63d43391570c49585a01ade76ca09e03ad533f498831f19",
    "K_H2": "16f7f9c3927894563cd14f09dc69a203d31006a6726a7b3ec42fe065b6812210",
}

TARGETS = {
    "prize 1GSMG": "1GSMG1JC9wtdSwfwApgj2xcmJPAwx7prBe",
    "halving 17ucy": "17ucy1K9ZUAaoY6JVtM932W9jUp5LXfyHa",
    "third-door 1NULY": "1NULY7DhzuNvSDtPkFzNo6oRTZQWBqXNE9",
    "P/2 16eE": "16eEXbSuKN8tvcos1iKjDju6dAaWWRBMEs",
    "2P 1KHM": "1KHMK2C8uBptRz67FbrXy43yHzhZG16Hbm",
    "Half 1JG648": "1JG648yaB7Wp2dpUfcZoRSD4q35oq47vCu",
    "BetterHalf 145ZQ": "145ZQ9siLrsXBKf465wjdyQYAP5dRwhRh",
    "vanity 3GSMG": "3GSMG24TujqfMJG1kQoBX18DzJHQLeJYMK",
}

B58 = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
N = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141


def b58encode(payload: bytes) -> str:
    chk = hashlib.sha256(hashlib.sha256(payload).digest()).digest()[:4]
    data = payload + chk
    n = int.from_bytes(data, "big")
    out = ""
    while n:
        n, r = divmod(n, 58)
        out = B58[r] + out
    return "1" * (len(data) - len(data.lstrip(b"\x00"))) + out


def addr(priv_int: int, compressed: bool) -> str | None:
    from coincurve import PrivateKey
    if not (1 <= priv_int < N):
        return None
    pk = PrivateKey(priv_int.to_bytes(32, "big")).public_key.format(compressed=compressed)
    h = hashlib.new("ripemd160", hashlib.sha256(pk).digest()).digest()
    return b58encode(b"\x00" + h)


def main():
    want = {v: k for k, v in TARGETS.items()}
    found = []
    tried = 0
    for name, hexv in K.items():
        raw = bytes.fromhex(hexv)
        variants = {
            "raw": raw,
            "sha256": hashlib.sha256(raw).digest(),
            "sha256d": hashlib.sha256(hashlib.sha256(raw).digest()).digest(),
            "modN": (int.from_bytes(raw, "big") % N).to_bytes(32, "big"),
        }
        for vname, v in variants.items():
            for comp in (True, False):
                a = addr(int.from_bytes(v, "big"), comp)
                tried += 1
                if a in want:
                    found.append((name, vname, "compressed" if comp else "uncompressed",
                                  want[a], a))
    print(f"derivations tried: {tried}")
    if found:
        for f in found:
            print("  MATCH:", f)
    else:
        print("  no chain K-value maps to any known on-chain address.")


if __name__ == "__main__":
    sys.exit(main())
