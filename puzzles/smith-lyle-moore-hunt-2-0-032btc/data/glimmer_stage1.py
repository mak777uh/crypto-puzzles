# -*- coding: utf-8 -*-
"""Glimmer (SLM Hunt #2) — Stage 1 brute force.

Plan (GLIMMER_BRUTEFORCE_GUIDE.txt §5):
  HEAD = "when you depart find" fixed at positions 1-4.
  Positions 5-12 = any permutation of {mystery, discover, music, need, love,
  fortune, safe, X}, X = any BIP39 English word.
  Empty passphrase, BIP84 account m/84'/0'/0' compared against the published
  account xpub, then the full address is re-derived for any hit.

Coverage: 5040 permutations x 8 slots x 2048 words = 82,575,360 raw mnemonics,
of which ~5,160,960 pass the BIP39 checksum (exact negative if no hit).

Resume: 32 blocks; completed blocks leave stage1_blocks/block_XX.done.
Never spends or moves funds. On hit writes FOUND_stage1.txt and stops.
"""
import hashlib
import hmac
import itertools
import os
import sys
import time
from multiprocessing import Pool

from base58 import b58decode
from coincurve import PrivateKey

HERE = os.path.dirname(os.path.abspath(__file__))
WORDS = open(os.path.join(HERE, "bip39.txt"), encoding="utf-8").read().split()
assert len(WORDS) == 2048
IDX = {w: i for i, w in enumerate(WORDS)}

HEAD_STR = ["when", "you", "depart", "find"]
KNOWN_STR = ["mystery", "discover", "music", "need", "love", "fortune", "safe"]
HEAD = [IDX[w] for w in HEAD_STR]
KNOWN = [IDX[w] for w in KNOWN_STR]
PERMS = list(itertools.permutations(KNOWN))  # 5040

XPUB = ("xpub6CpNc58zqQvNGPHDGGTr68wgrmtfFDBWRuSDAxoDdrCE1iRAaZtyAD5T9uCJ3"
        "ELUYKCkx8Jkind2kwoR3Uxmg1ycQ6DWyGxZBMFvQqhNqVC")
TARGET = "bc1q0akdjvrc2csau2n3gyxa3xcq0fss852x997m9y"
RAW = b58decode(XPUB)
assert len(RAW) == 82 and RAW[45] in (2, 3)
assert hashlib.sha256(hashlib.sha256(RAW[:78]).digest()).digest()[:4] == RAW[78:], "xpub checksum"
CHAIN = RAW[13:45]
PUB = RAW[45:78]

N = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141
H = 0
for j, w in enumerate(HEAD):
    H += w << (11 * (11 - j))

BLOCKS = 32
BLOCK_DIR = os.path.join(HERE, "stage1_blocks")
FOUND = os.path.join(HERE, "FOUND_stage1.txt")
LOG = os.path.join(HERE, "stage1_progress.log")


def account_pub_from_mnemonic(mn: str):
    """Return (chain_code, compressed_pubkey) at m/84'/0'/0' for empty passphrase."""
    seed = hashlib.pbkdf2_hmac("sha512", mn.encode(), b"mnemonic", 2048, 64)
    i = hmac.new(b"Bitcoin seed", seed, hashlib.sha512).digest()
    k = int.from_bytes(i[:32], "big")
    c = i[32:]
    for child in (84 + 0x80000000, 0x80000000, 0x80000000):
        i = hmac.new(c, b"\x00" + k.to_bytes(32, "big") + child.to_bytes(4, "big"),
                     hashlib.sha512).digest()
        k = (int.from_bytes(i[:32], "big") + k) % N
        c = i[32:]
    return c, PrivateKey(k.to_bytes(32, "big")).public_key.format()


def selftest():
    from bip_utils import (Bip39SeedGenerator, Bip84, Bip84Coins, Bip44Changes,
                           Bip32Secp256k1, P2WPKHAddrEncoder)

    mn = ("abandon abandon abandon abandon abandon abandon abandon abandon "
          "abandon abandon abandon about")
    # Reference address m/84'/0'/0'/0/0, empty passphrase.
    seed = Bip39SeedGenerator(mn).Generate("")
    addr = (Bip84.FromSeed(seed, Bip84Coins.BITCOIN)
            .Purpose().Coin().Account(0).Change(Bip44Changes.CHAIN_EXT)
            .AddressIndex(0).PublicKey().ToAddress())
    ref = "bc1qcr8te4kr609gcawutmrza0j4xv80jy8z306fyu"
    assert addr == ref, (addr, ref)
    # Account-level comparison path vs bip_utils (ToExtended is a zpub here).
    acct = Bip84.FromSeed(seed, Bip84Coins.BITCOIN).Purpose().Coin().Account(0)
    raw = b58decode(acct.PublicKey().ToExtended())
    c, p = account_pub_from_mnemonic(mn)
    assert c == raw[13:45] and p == raw[45:78], "account derivation mismatch"
    # Target xpub sanity: /0/1 must equal the donation address.
    acct_pub = Bip32Secp256k1.FromExtendedKey(XPUB)
    child = acct_pub.ChildKey(0).ChildKey(1)
    donation = P2WPKHAddrEncoder.EncodeKey(
        child.PublicKey().RawCompressed().ToBytes(), hrp="bc")
    assert donation == "bc1q8cgqs3aljnj5fzg044v0lwh5cn8tul87wlvpwt", donation
    # Full target address from the xpub at /0/0.
    leaf = acct_pub.ChildKey(0).ChildKey(0)
    target = P2WPKHAddrEncoder.EncodeKey(
        leaf.PublicKey().RawCompressed().ToBytes(), hrp="bc")
    assert target == TARGET, target
    print("selftest OK: address vector, account xpub path, /0/1 donation, /0/0 target",
          flush=True)


def run_block(args):
    block_id, start, end = args
    t0 = time.time()
    checked = 0
    valid = 0
    for perm in PERMS[start:end]:
        for xpos in range(8):
            shift = 11 * (7 - xpos)
            b0 = H
            for k, idx in enumerate(perm):
                if k != xpos:
                    b0 += idx << (11 * (7 - k))
            for x in range(2048):
                b = b0 + (x << shift)
                if hashlib.sha256((b >> 4).to_bytes(16, "big")).digest()[0] >> 4 != (b & 15):
                    continue
                valid += 1
                tail = [WORDS[p] for p in perm]
                tail.insert(xpos, WORDS[x])
                mn = " ".join(HEAD_STR + tail)
                c, p = account_pub_from_mnemonic(mn)
                if c == CHAIN and p == PUB:
                    with open(FOUND, "a", encoding="utf-8") as f:
                        f.write("MNEMONIC: " + mn + "\nPASSPHRASE: (empty)\n"
                                "PATH: m/84'/0'/0'/0/0\nADDRESS: " + TARGET + "\n")
                    return ("HIT", block_id, mn)
            checked += 2048
    open(os.path.join(BLOCK_DIR, "block_%02d.done" % block_id), "w").write(
        "%d raw, %d valid, %.1fs\n" % (checked, valid, time.time() - t0))
    return ("DONE", block_id, "%.1fs valid=%d" % (time.time() - t0, valid))


def main():
    os.makedirs(BLOCK_DIR, exist_ok=True)
    selftest()
    n = len(PERMS)
    size = (n + BLOCKS - 1) // BLOCKS
    todo = []
    for b in range(BLOCKS):
        start, end = b * size, min((b + 1) * size, n)
        if start >= end:
            continue
        if os.path.exists(os.path.join(BLOCK_DIR, "block_%02d.done" % b)):
            continue
        todo.append((b, start, end))
    total = sum(e - s for _, s, e in todo) * 8 * 2048
    print("blocks to run: %d, raw mnemonics: %d, expected valid ~%d"
          % (len(todo), total, total // 16), flush=True)
    t0 = time.time()
    with open(LOG, "a", encoding="utf-8") as f:
        f.write("start %s blocks=%d raw=%d\n"
                % (time.strftime("%Y-%m-%d %H:%M:%S"), len(todo), total))
    with Pool(16) as pool:
        for kind, block_id, info in pool.imap_unordered(run_block, todo):
            el = time.time() - t0
            if kind == "HIT":
                print("FOUND", info, flush=True)
                with open(LOG, "a", encoding="utf-8") as f:
                    f.write("FOUND %s\n" % info)
                pool.terminate()
                break
            print("[%5.1fs] block %02d %s | elapsed blocks=%d/%d"
                  % (el, block_id, info,
                     len(os.listdir(BLOCK_DIR)), len(todo)), flush=True)
            with open(LOG, "a", encoding="utf-8") as f:
                f.write("%s block %02d %s\n"
                        % (time.strftime("%H:%M:%S"), block_id, info))
    print("finished in %.1fs" % (time.time() - t0), flush=True)


if __name__ == "__main__":
    main()
