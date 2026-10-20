# -*- coding: utf-8 -*-
"""Glimmer (SLM Hunt #2) — H2f: offline reconciliation of the rival seed model.

Rival model (benjacasas02 research/glimmer, snapshot 2026-09-02):
  words 1-9 = when you depart find mystery | hunt gather whale blood
  words 11-12 = virtual moon (both orders)
  word 10 = free (checksum-valid BIP39)
  compare account chaincode/pubkey at m/84'/0'/0' with the published xpub.

This pass tests passphrases that our earlier runs could not have covered under
this model, especially Title-case proper nouns across ALL 12 block arrangements
(the rival dossier ran Title-case only on its primary arrangement).

Witness: Hunt #1 seed + "supernova" must reproduce the known Hunt #1 address.
No network, no transactions, no email. On a hit writes FOUND_h2f.txt locally.
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

XPUB = ("xpub6CpNc58zqQvNGPHDGGTr68wgrmtfFDBWRuSDAxoDdrCE1iRAaZtyAD5T9uCJ3"
        "ELUYKCkx8Jkind2kwoR3Uxmg1ycQ6DWyGxZBMFvQqhNqVC")
RAW = b58decode(XPUB)
assert len(RAW) == 82 and hashlib.sha256(hashlib.sha256(RAW[:78]).digest()).digest()[:4] == RAW[78:]
CHAIN, PUB = RAW[13:45], RAW[45:78]

N = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141

L_BLOCK = ["when", "you", "depart", "find", "mystery"]
W_BLOCK = ["hunt", "gather", "whale", "blood"]
TAILS = [["virtual", "moon"], ["moon", "virtual"]]
BLOCK_ORDERS = list(itertools.permutations("LWX"))  # 6

PASSPHRASES = [
    "",  # witness for the rival claim C1 ("empty ruled out") — cheap to re-test
    "amphitrite", "Amphitrite", "AMPHITRITE",
    "poseidon", "Poseidon",
    "supernova", "Supernova", "SUPERNOVA",
    "glimmer", "Glimmer", "GLIMMER",
    "virtual moon", "Virtual Moon", "virtualmoon", "virtual_moon",
    "moon", "Moon", "apollo", "Apollo", "apollo11", "Apollo11", "Apollo 11",
    "saturn", "Saturn", "tranquility", "Tranquility", "Sea of Tranquility",
    "seaoftranquility", "bermuda", "Bermuda", "bermudatriangle", "Bermuda Triangle",
    "triangle", "atlantic", "Atlantic", "pacific", "Pacific",
    "maryann", "Mary Ann", "Maryann", "mary ann",
    "lovey", "Lovey", "ginger", "Ginger", "gilligan", "Gilligan",
    "gilligansisland", "Gilligan's Island", "minnow", "Minnow", "skipper", "Skipper",
    "howell", "Howell", "professor", "Professor",
    "welcomehome", "Welcome Home", "garlic", "Garlic", "candles", "Candles",
    "trident", "Trident", "conch", "Conch", "shell", "Shell", "pearl", "Pearl",
    "wave", "Wave", "tide", "Tide", "current", "Current", "undertow", "Undertow",
    "riptide", "Riptide", "whirlpool", "Whirlpool", "charybdis", "Charybdis",
    "scylla", "Scylla", "siren", "Siren", "sirens", "Sirens", "lorelei", "Lorelei",
    "odyssey", "Odyssey", "iliad", "Iliad", "homer", "Homer", "ulysses", "Ulysses",
    "aegean", "Aegean", "ionian", "Ionian", "mediterranean", "Mediterranean",
    "caribbean", "Caribbean", "levantine", "Levantine",
    "ariel", "Ariel", "venus", "Venus", "aphrodite", "Aphrodite", "thetis", "Thetis",
    "galatea", "Galatea", "doris", "Doris", "nereus", "Nereus", "oceanus", "Oceanus",
    "tethys", "Tethys", "calypso", "Calypso", "circe", "Circe", "penelope", "Penelope",
    "andromeda", "Andromeda", "helen", "Helen", "nereid", "Nereid",
    "dhani", "Dhani", "harrison", "Harrison", "dhani harrison", "Dhani Harrison",
    "smithlylemoore", "Smith Lyle Moore", "SmithLyleMoore", "smith lyle moore",
    "codebreaker", "Codebreaker", "treasure", "Treasure", "bitcoin", "Bitcoin",
    # literal answers already used as page passwords (reuse hypothesis)
    "closerandcloser", "discoverglimmer", "youshallpass47", "wavebreaker7109",
    "mobydick69420", "reefdreams87", "tropicthunder83", "albatross", "semaphore",
    "20000leagues", "2hours40minutes", "Atlas Mountains", "witchoftheeast",
    "shiphuntshalpar", "seahitchhiker", "travelingwilburys", "electricfeel64",
    "sleighride", "michaelphelps", "escape", "vampire",
    "3778", "777", "666", "07201969", "07241969", "1969", "19690720", "19690724",
    "27756932", "73511573", "226001", "73410", "259126", "441054",
]
# dedupe, keep order
PASSPHRASES = list(dict.fromkeys(PASSPHRASES))


def _cs_valid(idx12):
    bits = 0
    for i in idx12:
        bits = (bits << 11) | i
    ent = (bits >> 4).to_bytes(16, "big")
    return (hashlib.sha256(ent).digest()[0] >> 4) == (bits & 15)


def account_from_mnemonic(mn, pp):
    """Return (chain_code, private_key_int, compressed_pubkey) at m/84'/0'/0'."""
    seed = hashlib.pbkdf2_hmac("sha512", mn.encode(), b"mnemonic" + pp.encode(), 2048, 64)
    i = hmac.new(b"Bitcoin seed", seed, hashlib.sha512).digest()
    k, c = int.from_bytes(i[:32], "big"), i[32:]
    for child in (84 + 0x80000000, 0x80000000, 0x80000000):
        i = hmac.new(c, b"\x00" + k.to_bytes(32, "big") + child.to_bytes(4, "big"),
                     hashlib.sha512).digest()
        k = (int.from_bytes(i[:32], "big") + k) % N
        c = i[32:]
    return c, k, PrivateKey(k.to_bytes(32, "big")).public_key.format()


BECH32 = "qpzry9x8gf2tvdw0s3jn54khce6mua7l"


def _bech32_polymod(values):
    gen = [0x3B6A57B2, 0x26508E6D, 0x1EA119FA, 0x3D4233DD, 0x2A1462B3]
    chk = 1
    for v in values:
        b = chk >> 25
        chk = (chk & 0x1FFFFFF) << 5 ^ v
        for i in range(5):
            chk ^= gen[i] if ((b >> i) & 1) else 0
    return chk


def _hrp_expand(hrp):
    return [ord(x) >> 5 for x in hrp] + [0] + [ord(x) & 31 for x in hrp]


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


def p2wpkh(pub):
    h160 = hashlib.new("ripemd160", hashlib.sha256(pub).digest()).digest()
    data = [0] + _convertbits(h160, 8, 5)
    hrp = "bc"
    values = _hrp_expand(hrp) + data
    polymod = _bech32_polymod(values + [0, 0, 0, 0, 0, 0]) ^ 1
    checksum = [(polymod >> 5 * (5 - i)) & 31 for i in range(6)]
    return hrp + "1" + "".join(BECH32[d] for d in data + checksum)


def address_0_0(c, k, p):
    for idx in (0, 0):  # change 0, address 0
        i = hmac.new(c, p + idx.to_bytes(4, "big"), hashlib.sha512).digest()
        k = (int.from_bytes(i[:32], "big") + k) % N
        c = i[32:]
        p = PrivateKey(k.to_bytes(32, "big")).public_key.format()
    return p2wpkh(p)


def selftest():
    mn = "fortune all man kind one giant step into digital tomorrow virtual moon"
    c, k, p = account_from_mnemonic(mn, "supernova")
    addr = address_0_0(c, k, p)
    # Dossier text prints this address with a missing "8" (invalid bech32);
    # the real, on-chain Hunt #1 address (funded 2 500 000 sat, then swept) is:
    ref = "bc1qgtymp8q7hw2k9tewhdq74vdlpkqhflgju69n95"
    assert addr == ref, (addr, ref)
    c2, k2, p2 = account_from_mnemonic(mn, "wrong-passphrase")
    assert address_0_0(c2, k2, p2) != ref
    print("selftest OK: Hunt#1 seed+supernova ->", addr, "| wrong passphrase -> NO", flush=True)


def candidates():
    for order in BLOCK_ORDERS:
        for tail in TAILS:
            for x in range(2048):
                seq = []
                for blk in order:
                    if blk == "L":
                        seq += [IDX[w] for w in L_BLOCK]
                    elif blk == "W":
                        seq += [IDX[w] for w in W_BLOCK]
                    else:
                        seq += [x]
                seq += [IDX[w] for w in tail]
                assert len(seq) == 12
                if not _cs_valid(seq):
                    continue
                mn = " ".join(WORDS[i] for i in seq)
                for pp in PASSPHRASES:
                    yield mn, pp


def work(args):
    mn, pp = args
    c, k, p = account_from_mnemonic(mn, pp)
    if c == CHAIN and p == PUB:
        with open(os.path.join(HERE, "FOUND_h2f.txt"), "a", encoding="utf-8") as f:
            f.write("MNEMONIC: %s\nPASSPHRASE: %s\nPATH: m/84'/0'/0'/0/0\n" % (mn, pp))
        return ("HIT", mn, pp)
    return None


def main():
    selftest()
    t0 = time.time()
    done = 0
    hits = []
    with Pool(16) as pool:
        for res in pool.imap_unordered(work, candidates(), chunksize=64):
            done += 1
            if res:
                hits.append(res)
                print("HIT", res, flush=True)
    print("DONE checked=%d hits=%d %.1fs" % (done, len(hits), time.time() - t0), flush=True)
    if not hits:
        open(os.path.join(HERE, "H2F_NEGATIVE.txt"), "w", encoding="utf-8").write(
            "NEGATIVE %s checked=%d arrangements=12 passphrases=%d\n"
            % (time.strftime("%Y-%m-%d %H:%M:%S"), done, len(PASSPHRASES)))


if __name__ == "__main__":
    main()
