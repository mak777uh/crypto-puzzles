# -*- coding: utf-8 -*-
"""Glimmer Stage 2 on GPU: fixed word order + missing word X + passphrase list.

Kernel: variable 12-word mnemonic (index array) x variable passphrase ->
PBKDF2-HMAC-SHA512(2048, salt="mnemonic"+passphrase) -> BIP84 m/84'/0'/0'/0/0
-> hash160 -> target. Engine reuses the BLM CUDA device source.

Orders (GLIMMER_BRUTEFORCE_GUIDE §5), X = checksum-valid missing word:
  A: when you depart find mystery discover music need love fortune safe ?
  B: when you depart find discover music need love mystery fortune safe ?
  D: when you depart find discover music need love ? fortune safe mystery
  E: when you depart find ? discover music need love fortune safe mystery
  G: when you depart find mystery discover music need love ? fortune safe

Usage:
  python glimmer_gpu_stage2.py selftest
  python glimmer_gpu_stage2.py run --order G --list words_alpha.txt [--max-pp N]
Resume: stage2_progress.json (per order, number of completed pairs).
"""
import argparse
import hashlib
import json
import math
import re
import sys
import time
from pathlib import Path

import cupy
import numpy as np

HERE = Path(__file__).parent
DEV = HERE / "gpu" / "device_glimmer.cu"
WORDS = (HERE / "bip39.txt").read_text(encoding="utf-8").split()
IDX = {w: i for i, w in enumerate(WORDS)}
TARGET_H160 = bytes.fromhex("7f6cd930785621de2a71410dd89b007a6103d146")
TARGET_ADDR = "bc1q0akdjvrc2csau2n3gyxa3xcq0fss852x997m9y"
REF_MN = ("abandon " * 11 + "about").strip()
PROGRESS = HERE / "stage2_progress.json"
CHUNK = 16_000_000
PP_STRIDE = 128
MAX_PPLEN = 120

ORDERS = {
    "A": ["when", "you", "depart", "find", "mystery", "discover", "music",
          "need", "love", "fortune", "safe", None],
    "B": ["when", "you", "depart", "find", "discover", "music", "need",
          "love", "mystery", "fortune", "safe", None],
    "D": ["when", "you", "depart", "find", "discover", "music", "need",
          "love", None, "fortune", "safe", "mystery"],
    "E": ["when", "you", "depart", "find", None, "discover", "music", "need",
          "love", "fortune", "safe", "mystery"],
    "G": ["when", "you", "depart", "find", "mystery", "discover", "music",
          "need", "love", None, "fortune", "safe"],
}

KERNELS = r"""
/* ============ Glimmer Stage 2: mnemonic x passphrase ==================== */
extern "C" __global__ __launch_bounds__(64, 4) void gl_derive_pp(
    const unsigned short *d_mn, unsigned int n_mn,
    const uint8_t *d_pp, const int *d_pp_len, int pp_stride, unsigned int n_pp,
    unsigned long long base, unsigned long long total,
    int *d_match, unsigned long long *d_match_idx)
{
    const unsigned long long i = base + (unsigned long long)blockIdx.x * blockDim.x
                                      + threadIdx.x;
    if (i >= total) return;

    const unsigned int mi = (unsigned int)(i / n_pp);
    const unsigned int pi = (unsigned int)(i % n_pp);

    const unsigned short *e = d_mn + (size_t)mi * 12u;
    uint8_t mnem[160];
    int pos = 0;
    #pragma unroll
    for (int q = 0; q < 12; q++) {
        if (q > 0) mnem[pos++] = ' ';
        const int wi = (int)e[q];
        const int wl = d_wordlen[wi];
        for (int c = 0; c < wl; c++) mnem[pos++] = d_wordlist[wi * 9 + c];
    }

    const int plen = d_pp_len[pi];
    uint8_t salt[160];
    salt[0] = 'm'; salt[1] = 'n'; salt[2] = 'e'; salt[3] = 'm';
    salt[4] = 'o'; salt[5] = 'n'; salt[6] = 'i'; salt[7] = 'c';
    const uint8_t *pp = d_pp + (size_t)pi * (size_t)pp_stride;
    for (int c = 0; c < plen; c++) salt[8 + c] = pp[c];
    const int salt_len = 8 + plen;

    uint8_t seed[64];
    pbkdf2_sha512(mnem, pos, salt, salt_len, 2048, seed);
    uint8_t addr[20];
    full_derive(seed, addr);

    int match = 1;
    #pragma unroll
    for (int t = 0; t < 20; t++) if (addr[t] != c_target_hash[t]) { match = 0; break; }
    if (match) { atomicMin(d_match_idx, i); atomicExch(d_match, 1); }
}
"""


def build_source(target_h160):
    src = DEV.read_text(encoding="utf-8")
    flat = ",".join(f"0x{b:02x}" for b in target_h160)
    pat = re.compile(r"(__constant__ uint8_t\s+c_target_hash\s*\[[^\]]*\])"
                     r"(\s*=\s*\{[^}]*\})?\s*;")
    src, n = pat.subn(lambda m: m.group(1) + " = {" + flat + "};", src, count=1)
    if n != 1:
        raise RuntimeError("c_target_hash not found")
    if "gl_derive_pp" not in src:
        src += KERNELS
    return src.encode("ascii", "ignore").decode("ascii")


def compile_mod(target_h160):
    mod = cupy.RawModule(code=build_source(target_h160),
                         options=("-std=c++14", "--use_fast_math",
                                  "-diag-suppress=177"))
    kpp = mod.get_function("gl_derive_pp")
    wl = np.zeros(2048 * 9, dtype=np.uint8)
    ln = np.zeros(2048, dtype=np.uint8)
    for i, w in enumerate(WORDS):
        b = w.encode()[:9]
        wl[i * 9:i * 9 + len(b)] = list(b)
        ln[i] = len(b)
    for name, arr in (("d_wordlist", wl), ("d_wordlen", ln)):
        host = np.ascontiguousarray(arr)
        mod.get_global(name).copy_from_host(host.ctypes.data, host.nbytes)
    return mod, kpp


def checksum_ok(idx):
    b = 0
    for v in idx:
        b = (b << 11) | v
    return hashlib.sha256((b >> 4).to_bytes(16, "big")).digest()[0] >> 4 == (b & 15)


def order_rows(order):
    tpl = ORDERS[order]
    fixed = [IDX[w] if w else None for w in tpl]
    rows = []
    for x in range(2048):
        arr = [x if v is None else v for v in fixed]
        if checksum_ok(arr):
            rows.append(arr)
    return rows


def load_passphrases(path, max_pp=None):
    extra = [
        "Smith Lyle Moore", "smith lyle moore", "smithlylemoore",
        "the beloved", "thebeloved", "Amphitrite", "amphitrite",
        "Amphitrite's", "one giant step", "one small step", "one giant leap",
        "virtual moon", "fortune all man kind", "supernova", "Supernova",
        "glimmer", "Glimmer", "GLIMMER", "vampire", "Vampire", "VAMPIRE",
        "codebreaker", "treasure hunt", "treasurehunt",
    ]
    pps = []
    seen = set()
    for w in extra:
        if w not in seen and len(w.encode()) <= MAX_PPLEN:
            seen.add(w); pps.append(w)
    for line in Path(path).read_text(encoding="utf-8", errors="ignore").splitlines():
        w = line.strip()
        if not w:
            continue
        for v in (w, w[:1].upper() + w[1:], w.upper()):
            if v not in seen and len(v.encode()) <= MAX_PPLEN:
                seen.add(v); pps.append(v)
                if max_pp and len(pps) >= max_pp:
                    return pps
    return pps


def pp_table(pps):
    arr = np.zeros((len(pps), PP_STRIDE), dtype=np.uint8)
    lens = np.zeros(len(pps), dtype=np.int32)
    for i, p in enumerate(pps):
        b = p.encode("utf-8")
        arr[i, :len(b)] = np.frombuffer(b, dtype=np.uint8)
        lens[i] = len(b)
    return arr, lens


def decode_hit(kpp, gidx, rows, pps):
    # gidx = mi * n_pp + pi ; n_pp known from caller side via closure
    pass


def run_order(kpp, order, pps, rows, base_start=0, d_pp=None, d_pp_len=None):
    n_mn = len(rows)
    n_pp = len(pps)
    total = n_mn * n_pp
    d_mn = cupy.asarray(np.array(rows, dtype=np.uint16).reshape(-1))
    if d_pp is None:
        arr, lens = pp_table(pps)
        d_pp = cupy.asarray(arr.reshape(-1))
        d_pp_len = cupy.asarray(lens)
    d_match = cupy.zeros(1, dtype=cupy.int32)
    d_idx = cupy.full(1, 2**64 - 1, dtype=cupy.uint64)

    t0 = time.time()
    done = base_start
    while done < total:
        n = min(CHUNK, total - done)
        blocks = (n + 63) // 64
        d_match.fill(0)
        d_idx.fill(2**64 - 1)
        kpp((blocks,), (64,),
            (d_mn, np.uint32(n_mn), d_pp, d_pp_len, np.int32(PP_STRIDE),
             np.uint32(n_pp), np.uint64(done), np.uint64(total),
             d_match, d_idx))
        cupy.cuda.Stream.null.synchronize()
        done += n
        el = time.time() - t0
        print("  %s %d/%d (%.1f%%) %.0f/s | hit=%d"
              % (order, done, total, 100.0 * done / total,
                 (done - base_start) / max(el, 1e-9), int(d_match[0])), flush=True)
        save_progress(order, done, total)
        if int(d_match[0]):
            g = int(d_idx[0])
            mi, pi = divmod(g, n_pp)
            mn = " ".join(WORDS[int(v)] for v in rows[mi])
            pp = pps[pi]
            print("FOUND mnemonic:", mn, flush=True)
            print("FOUND passphrase:", repr(pp), flush=True)
            from bip_utils import (Bip39SeedGenerator, Bip84, Bip84Coins,
                                   Bip44Changes)
            seed = Bip39SeedGenerator(mn).Generate(pp)
            addr = (Bip84.FromSeed(seed, Bip84Coins.BITCOIN)
                    .Purpose().Coin().Account(0)
                    .Change(Bip44Changes.CHAIN_EXT).AddressIndex(0)
                    .PublicKey().ToAddress())
            if addr == TARGET_ADDR:
                (HERE / "FOUND_stage2.txt").write_text(
                    "MNEMONIC: %s\nPASSPHRASE: %s\nPATH: m/84'/0'/0'/0/0\nADDRESS: %s\n"
                    % (mn, pp, addr), encoding="utf-8")
                print("oracle confirms target; saved FOUND_stage2.txt", flush=True)
            else:
                print("WARNING: oracle mismatch", addr, flush=True)
            return mn, pp
    return None


def save_progress(order, done, total):
    try:
        data = json.loads(PROGRESS.read_text()) if PROGRESS.exists() else {}
    except Exception:
        data = {}
    data[order] = {"done": done, "total": total,
                   "time": time.strftime("%Y-%m-%d %H:%M:%S")}
    PROGRESS.write_text(json.dumps(data, indent=1), encoding="utf-8")


def load_progress(order):
    try:
        data = json.loads(PROGRESS.read_text())
        d = data.get(order, {})
        return int(d.get("done", 0)), int(d.get("total", 0))
    except Exception:
        return 0, 0


SELFTEST_MARK = HERE / "stage2_selftest.ok"


def selftest(skip_planted=False):
    from bip_utils import (Bip39SeedGenerator, Bip84, Bip84Coins, Bip44Changes)
    test_pp = "test-passphrase"
    rows = [[IDX[w] for w in REF_MN.split()]]
    pps = ["", test_pp, "wrong"]
    d_mn = cupy.asarray(np.array(rows, dtype=np.uint16).reshape(-1))
    arr, lens = pp_table(pps)
    d_pp = cupy.asarray(arr.reshape(-1)); d_pp_len = cupy.asarray(lens)
    d_match = cupy.zeros(1, dtype=cupy.int32)
    d_idx = cupy.full(1, 2**64 - 1, dtype=cupy.uint64)

    if not skip_planted:
        seed = Bip39SeedGenerator(REF_MN).Generate(test_pp)
        pub = (Bip84.FromSeed(seed, Bip84Coins.BITCOIN).Purpose().Coin().Account(0)
               .Change(Bip44Changes.CHAIN_EXT).AddressIndex(0)
               .PublicKey().RawCompressed().ToBytes())
        h160 = hashlib.new("ripemd160", hashlib.sha256(pub).digest()).digest()
        print("compiling planted passphrase module ...", flush=True)
        t0 = time.time()
        mod, kpp = compile_mod(h160)
        print("  compiled in %.1fs" % (time.time() - t0), flush=True)
        kpp((1,), (64,), (d_mn, np.uint32(1), d_pp, d_pp_len, np.int32(PP_STRIDE),
                         np.uint32(3), np.uint64(0), np.uint64(3),
                         d_match, d_idx))
        cupy.cuda.Stream.null.synchronize()
        assert int(d_match[0]) == 1 and int(d_idx[0]) == 1, (int(d_match[0]), int(d_idx[0]))
        print("  planted passphrase found at expected index 1", flush=True)
        del mod, kpp
        cupy.get_default_memory_pool().free_all_blocks()

    print("compiling Glimmer module ...", flush=True)
    t0 = time.time()
    mod, kpp = compile_mod(TARGET_H160)
    print("  compiled in %.1fs" % (time.time() - t0), flush=True)
    # negative control: reference mnemonic + empty passphrase against Glimmer.
    # Reset first: the planted test left d_match=1 / d_idx=1 behind.
    d_match.fill(0)
    d_idx.fill(2**64 - 1)
    kpp((1,), (64,), (d_mn, np.uint32(1), d_pp, d_pp_len, np.int32(PP_STRIDE),
                     np.uint32(3), np.uint64(0), np.uint64(3),
                     d_match, d_idx))
    cupy.cuda.Stream.null.synchronize()
    if int(d_match[0]):
        # only acceptable if it is the (empty) passphrase and target matched;
        # it cannot, the reference address differs from the target.
        raise RuntimeError("negative control matched!")
    print("  negative control clean", flush=True)
    if not skip_planted:
        SELFTEST_MARK.write_text(TARGET_H160.hex(), encoding="utf-8")
    return mod, kpp


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("mode", choices=["selftest", "run"])
    ap.add_argument("--order", default="G",
                    help="one letter or comma-separated list, e.g. G,A,B,D,E")
    ap.add_argument("--list", default="words_alpha.txt")
    ap.add_argument("--max-pp", type=int, default=0)
    args = ap.parse_args()
    if args.mode == "selftest":
        selftest()
        return
    orders = [s.strip().upper() for s in args.order.split(",") if s.strip()]
    for o in orders:
        if o not in ORDERS:
            raise SystemExit("unknown order " + o)
    pps = load_passphrases(args.list, args.max_pp or None)
    print("passphrases: %d" % len(pps), flush=True)
    skipped = (SELFTEST_MARK.exists()
               and SELFTEST_MARK.read_text(encoding="utf-8").strip()
               == TARGET_H160.hex())
    if skipped:
        print("selftest marker present; skipping planted compile", flush=True)
    mod, kpp = selftest(skip_planted=skipped)
    arr, lens = pp_table(pps)
    d_pp = cupy.asarray(arr.reshape(-1))
    d_pp_len = cupy.asarray(lens)
    for order in orders:
        rows = order_rows(order)
        print("order %s: %d valid X rows; pairs: %d"
              % (order, len(rows), len(rows) * len(pps)), flush=True)
        done, total_saved = load_progress(order)
        total = len(rows) * len(pps)
        if done and total_saved == total:
            print("resuming from %d/%d" % (done, total), flush=True)
        else:
            done = 0
        hit = run_order(kpp, order, pps, rows, base_start=done,
                        d_pp=d_pp, d_pp_len=d_pp_len)
        if hit:
            return


if __name__ == "__main__":
    main()
