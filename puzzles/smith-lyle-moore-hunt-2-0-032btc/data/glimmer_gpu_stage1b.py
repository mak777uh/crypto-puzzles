# -*- coding: utf-8 -*-
"""Glimmer Stage 1b on GPU: "when you depart find" as a block, anywhere.

Space: 9 placements of the 4-word block x 8! orders of
{7 known words + X}, X over all 2048 BIP39 words, empty passphrase.
Checksum filter on device; only valid mnemonics are derived.
Expected derivations: 9 x 40320 x 2048 / 16 = 46,448,640.
Engine: the CUDA device source used by the BLM sweep (pbkdf2+secp256k1+
BIP32, default path m/84'/0'/0'/0/0), with two added kernels.

Usage:
  python glimmer_gpu_stage1b.py selftest   # planted vector + negative
  python glimmer_gpu_stage1b.py run        # full Stage 1b
"""
import hashlib
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
REF_H160 = bytes.fromhex("c0cebcd6c3d3ca8c75dc5ec62ebe55330ef910e2")
REF_ADDR = "bc1qcr8te4kr609gcawutmrza0j4xv80jy8z306fyu"

BLOCK = [IDX[w] for w in ("when", "you", "depart", "find")]
KNOWN = [IDX[w] for w in ("mystery", "discover", "music", "need", "love",
                          "fortune", "safe")]
N_PERM = math.factorial(8)
CAP = 5_500_000

KERNELS = r"""
/* ================= Glimmer: generate checksum-valid 12-word arrays =========
 * One block = one permutation of the 8 items {known7, X}; 128 threads sweep
 * X in [0,2048). The 4-word block sits at [placement, placement+4).
 */
extern "C" __global__ void gl_gen_block(
    const int *d_block4, const int *d_known7, int placement,
    unsigned long long n_perm,
    unsigned short *d_out, unsigned int *d_count, unsigned int cap)
{
    const unsigned int pi = blockIdx.x;
    if ((unsigned long long)pi >= n_perm) return;

    __shared__ uint32_t perm[8];
    if (threadIdx.x == 0) {
        const uint32_t fact[8] = {5040u, 720u, 120u, 24u, 6u, 2u, 1u, 1u};
        uint32_t used = 0u, r = pi;
        #pragma unroll
        for (int i = 0; i < 8; i++) {
            const uint32_t f = fact[i];
            int d = (int)(r / f);
            r -= (uint32_t)d * f;
            int pos = -1;
            #pragma unroll
            for (int k = 0; k < 8; k++) {
                if (pos < 0 && !((used >> k) & 1u)) {
                    if (d == 0) pos = k; else d--;
                }
            }
            used |= (1u << pos);
            perm[i] = (uint32_t)pos;
        }
    }
    __syncthreads();

    for (int x = threadIdx.x; x < 2048; x += blockDim.x) {
        uint32_t idx[12];
        for (int j = 0; j < 4; j++) idx[placement + j] = (uint32_t)d_block4[j];
        for (int j = 0; j < 12; j++) {
            if (j >= placement && j < placement + 4) continue;
            const int k = (j < placement) ? j : (j - 4);
            const int item = (int)perm[k];
            idx[j] = (item == 7) ? (uint32_t)x : (uint32_t)d_known7[item];
        }
        if (!btc_valid_checksum(idx)) continue;
        const unsigned int slot = atomicAdd(d_count, 1u);
        if (slot < cap) {
            unsigned short *e = d_out + (size_t)slot * 12u;
            #pragma unroll
            for (int q = 0; q < 12; q++) e[q] = (unsigned short)idx[q];
        }
    }
}

/* ================= Glimmer: derive compacted mnemonics =================== */
extern "C" __global__ __launch_bounds__(64, 8) void gl_derive_batch(
    const unsigned short *d_in, unsigned int n_in,
    unsigned long long base, int *d_match, unsigned long long *d_match_idx)
{
    const unsigned long long i = base + (unsigned long long)blockIdx.x * blockDim.x
                                      + threadIdx.x;
    if (i >= (unsigned long long)n_in) return;

    const unsigned short *e = d_in + (size_t)i * 12u;
    uint8_t mnem[160];
    int pos = 0;
    #pragma unroll
    for (int q = 0; q < 12; q++) {
        if (q > 0) mnem[pos++] = ' ';
        const int wi = (int)e[q];
        const int wl = d_wordlen[wi];
        for (int c = 0; c < wl; c++) mnem[pos++] = d_wordlist[wi * 9 + c];
    }
    uint8_t salt[8] = {'m', 'n', 'e', 'm', 'o', 'n', 'i', 'c'};
    uint8_t seed[64];
    pbkdf2_sha512(mnem, pos, salt, 8, 2048, seed);
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
    if "gl_gen_block" not in src:
        src += KERNELS
    # CuPy writes the source with the system locale (cp1251 on this host);
    # the device source has Cyrillic comments, which break that write.
    # Comments carry no semantics, so drop non-ASCII.
    src = src.encode("ascii", "ignore").decode("ascii")
    return src


def compile_mod(target_h160):
    mod = cupy.RawModule(code=build_source(target_h160),
                         options=("-std=c++14", "--use_fast_math",
                                  "-diag-suppress=177"))
    kgen = mod.get_function("gl_gen_block")
    kder = mod.get_function("gl_derive_batch")
    wl = np.zeros(2048 * 9, dtype=np.uint8)
    ln = np.zeros(2048, dtype=np.uint8)
    for i, w in enumerate(WORDS):
        b = w.encode()[:9]
        wl[i * 9:i * 9 + len(b)] = list(b)
        ln[i] = len(b)
    for name, arr in (("d_wordlist", wl), ("d_wordlen", ln)):
        host = np.ascontiguousarray(arr)
        mod.get_global(name).copy_from_host(host.ctypes.data, host.nbytes)
    return mod, kgen, kder


def mnem_to_indices(mn):
    return [IDX[w] for w in mn.split()]


def idx_to_mnemonic(row):
    return " ".join(WORDS[int(i)] for i in row)


def derive_checked(kder, rows, target_h160):
    n = len(rows)
    d_in = cupy.asarray(np.array(rows, dtype=np.uint16).reshape(-1))
    d_match = cupy.zeros(1, dtype=cupy.int32)
    d_idx = cupy.full(1, 2**64 - 1, dtype=cupy.uint64)
    kder((max(1, (n + 63) // 64),), (64,),
         (d_in, np.uint32(n), np.uint64(0), d_match, d_idx))
    cupy.cuda.Stream.null.synchronize()
    return int(d_match[0]), int(d_idx[0]) if int(d_match[0]) else None


def selftest():
    print("compiling planted-target module ...", flush=True)
    t0 = time.time()
    mod, kgen, kder = compile_mod(REF_H160)
    print("  compiled in %.1fs" % (time.time() - t0), flush=True)
    hit, at = derive_checked(kder, [mnem_to_indices(REF_MN)], REF_H160)
    assert hit == 1 and at == 0, (hit, at)
    print("  planted BIP84 vector: FOUND at row 0", flush=True)
    del mod, kgen, kder
    cupy.get_default_memory_pool().free_all_blocks()

    print("compiling Glimmer-target module ...", flush=True)
    t0 = time.time()
    mod, kgen, kder = compile_mod(TARGET_H160)
    print("  compiled in %.1fs" % (time.time() - t0), flush=True)
    hit, at = derive_checked(kder, [mnem_to_indices(REF_MN)], TARGET_H160)
    assert hit == 0, "negative control matched!"
    print("  negative control (reference mnemonic vs Glimmer target): no hit", flush=True)
    return mod, kgen, kder


def run():
    mod, kgen, kder = selftest()

    d_block = cupy.asarray(np.array(BLOCK, dtype=np.int32))
    d_known = cupy.asarray(np.array(KNOWN, dtype=np.int32))
    d_out = cupy.empty(CAP * 12, dtype=np.uint16)
    d_count = cupy.zeros(1, dtype=cupy.uint32)
    d_match = cupy.zeros(1, dtype=cupy.int32)
    d_match_idx = cupy.full(1, 2**64 - 1, dtype=cupy.uint64)

    t_all = time.time()
    total = 0
    for placement in range(9):
        t0 = time.time()
        d_count.fill(0)
        kgen((N_PERM,), (128,),
             (d_block, d_known, np.int32(placement), np.uint64(N_PERM),
              d_out, d_count, np.uint32(CAP)))
        cupy.cuda.Stream.null.synchronize()
        n = int(d_count[0])
        if n > CAP:
            raise RuntimeError(f"buffer overflow: {n} > {CAP}")
        tg = time.time() - t0
        t1 = time.time()
        d_match.fill(0)
        d_match_idx.fill(2**64 - 1)
        kder((max(1, (n + 63) // 64),), (64,),
             (d_out, np.uint32(n), np.uint64(0), d_match, d_match_idx))
        cupy.cuda.Stream.null.synchronize()
        td = time.time() - t1
        total += n
        hit = int(d_match[0])
        print("placement %d: %d valid, gen %.1fs, derive %.1fs (%.0f/s), hit=%d"
              % (placement, n, tg, td, n / max(td, 1e-9), hit), flush=True)
        if hit:
            at = int(d_match_idx[0])
            row = cupy.asnumpy(d_out[at * 12:(at + 1) * 12])
            mn = idx_to_mnemonic(row)
            print("FOUND:", mn, flush=True)
            # exact-oracle check on CPU
            from bip_utils import (Bip39SeedGenerator, Bip84, Bip84Coins,
                                   Bip44Changes)
            seed = Bip39SeedGenerator(mn).Generate("")
            addr = (Bip84.FromSeed(seed, Bip84Coins.BITCOIN)
                    .Purpose().Coin().Account(0)
                    .Change(Bip44Changes.CHAIN_EXT).AddressIndex(0)
                    .PublicKey().ToAddress())
            if addr == TARGET_ADDR:
                Path(HERE / "FOUND_stage1b.txt").write_text(
                    "MNEMONIC: " + mn + "\nPASSPHRASE: (empty)\n"
                    "PATH: m/84'/0'/0'/0/0\nADDRESS: " + addr + "\n",
                    encoding="utf-8")
                print("oracle confirms target address; saved FOUND_stage1b.txt",
                      flush=True)
            else:
                print("WARNING: oracle mismatch", addr, flush=True)
            return mn
    print("done: %d derivations in %.1fs, no match"
          % (total, time.time() - t_all), flush=True)
    return None


if __name__ == "__main__":
    mode = sys.argv[1] if len(sys.argv) > 1 else "selftest"
    if mode == "selftest":
        selftest()
    elif mode == "run":
        run()
    else:
        raise SystemExit("mode: selftest | run")
