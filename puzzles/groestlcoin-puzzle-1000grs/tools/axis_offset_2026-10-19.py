#!/usr/bin/env python3
"""Axis A-OFFSET (registered in LOG before the run): the stego hint "356ef" is read
as a hex offset/address (0x356EF = 218863) into the puzzle image, not as a number
for XOR/arithmetic. A 32-byte key candidate is taken at that position and around it:
  A) file-level 32-byte windows at 0x356EF +/- deltas;
  B) pixel #0x356EF (row-major and column-major) in the RGBA buffer and in the
     L and A planes, with small pixel shifts.
Each window is tried raw, reversed, and SHA-256(window); direct privkey candidates
are checked by address derivation against the prize hash160.

No brute force: ~200 fixed candidates.

Target: FindKEYLrVaahtkaVRk8KTspRMyWxfUi3i
hash160: 956453576444632092713b08f81892b4d24791e6
"""
import hashlib

from PIL import Image
from ecdsa import SigningKey, SECP256k1

IMG = "data/GRS-puzzle.png"
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
    if priv32 in seen:
        return
    seen.add(priv32)
    sk = SigningKey.from_string(priv32, curve=SECP256k1)
    vk = sk.get_verifying_key()
    comp = b"\x02" + (b"\x03" if vk.pubkey.point.y() & 1 else b"\x02")
    comp = comp[:1] + vk.to_string()[:32]
    unc = b"\x04" + vk.to_string()
    for form, pk in (("comp", comp), ("unc", unc)):
        if hash160(pk) == TARGET_H160:
            hits.append((label, form, priv32.hex()))


def variants(buf: bytes, off: int):
    """Yield (suffix, 32 bytes) for a 32-byte window at off."""
    if off < 0 or off + 32 > len(buf):
        return
    w = buf[off : off + 32]
    yield "raw", w
    yield "rev", w[::-1]
    yield "sha256", hashlib.sha256(w).digest()


def witness() -> bool:
    ok = True
    # 1) Synthetic extractor control: known privkey at a known offset.
    key = (1).to_bytes(32, "big")
    carrier = bytearray(4096)
    carrier[1234 : 1234 + 32] = key
    got = bytes(carrier[1234 : 1234 + 32])
    if got != key:
        print("WITNESS FAIL extractor")
        ok = False
    sk = SigningKey.from_string(got, curve=SECP256k1)
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


def main():
    if not witness():
        raise SystemExit("oracle not certified; refusing to run")

    raw = open(IMG, "rb").read()
    im = Image.open(IMG).convert("RGBA")
    w, h = im.size
    rgba = im.tobytes()
    L = im.convert("L").tobytes()
    A = im.getchannel("A").tobytes()

    base = int(FRAG, 16)  # 0x356EF = 218863
    hits = []
    seen = set()
    n = 0

    # A) file-level windows around the offset
    for delta in (0, -1, 1, -16, 16, -32, 32, -64, 64, -128, 128):
        off = base + delta
        for vname, w32 in variants(raw, off):
            check(w32, f"file|{off:+d}|{vname}", hits, seen)
            n += 1

    # B) pixel-level windows: row-major and column-major
    def pixel_off_row(p):
        return p * 4

    def pixel_off_col(p):
        # column-major: p = x*h + y  ->  byte index (y*w + x)*4
        x, y = divmod(p, h)
        return (y * w + x) * 4

    for plane_name, plane, stride in (
        ("rgba", rgba, 4),
        ("L", L, 1),
        ("A", A, 1),
    ):
        for order_name, pix_off in (
            ("row", pixel_off_row(base * stride)),
            ("col", pixel_off_col(base) if stride == 4 else pixel_off_row(base)),
        ):
            # For L/A planes, column-major needs its own byte index in that plane.
            if stride == 1 and order_name == "col":
                x, y = divmod(base, h)
                pix_off = y * w + x
            for delta in (0, -1, 1, -16, 16):
                off = pix_off + delta * stride
                if off < 0:
                    continue
                for vname, w32 in variants(plane, off):
                    check(w32, f"{plane_name}|{order_name}|{delta:+d}|{vname}", hits, seen)
                    n += 1

    print(f"checked {n} windows, unique privkeys {len(seen)}, hits {len(hits)}")
    for hit in hits:
        print("MATCH", hit)


if __name__ == "__main__":
    main()
