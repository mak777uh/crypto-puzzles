# -*- coding: utf-8 -*-
"""A11-H1 — поиск адреса-известного-открытого-текста в носителях puzzle11.png.

Гипотеза (зафиксирована в LOG.md до запуска): автор сказал «0xFF21…9F17 it is also included
somewhere in the image». *also* = помимо tEXt-чанка, т.е. адрес продублирован в содержимом
картинки. Тогда находится точный канал и кодировка автора, и тем же чтением рядом читается ключ.

Это НЕ перебор ключей: кандидатов-ключей = 0. Пространство = потоки носителя x формы адреса,
каждый тест — точный поиск подстроки (байтовый и битовый), а не сканирование пространства ключей.

Два уровня поиска:
  byte-level  — образец ищется в байтовых строках потоков и в упакованных битовых плоскостях;
  bit-level   — образец ищется по битам, что покрывает произвольные (не выровненные по байту)
                стартовые смещения внутри битовых плоскостей. Самопроверка обязательна и
                внедряет образец именно в невыровненное положение.

Самопроверка: адрес внедряется в копию носителя в четырёх независимых семействах (байтовый
row-major, байтовый column-major, битовая плоскость по невыровненному смещению, alpha-битовая
плоскость) и конвейер обязан вернуть ровно то положение, куда внедряли.
"""
from __future__ import annotations

import hashlib
import json
import time
import zlib
from pathlib import Path

import numpy as np
from bitarray import bitarray
from PIL import Image

D = Path(__file__).resolve().parents[1]
PNG = D / "data" / "puzzle11.png"
OUT = D / "data" / "a11_h1_addr_hunt.json"
ADDR_MIXED = "FF2142E98E09b5344994F9bEB9C56C95506B9F17"
ADDR_INT = int(ADDR_MIXED, 16)
TIME_LIMIT_S = 600


def forms() -> dict:
    raw = bytes.fromhex(ADDR_MIXED)
    up, lo, mix = ADDR_MIXED.upper().encode(), ADDR_MIXED.lower().encode(), ADDR_MIXED.encode()
    h = [int(c, 16) for c in ADDR_MIXED]
    nib = bytes((h[i] << 4) | h[i + 1] for i in range(0, 40, 2))   # 40 нибблов -> 20 байт
    per = bytes(h)                                                  # 40 байт, по нибблу на байт
    return {
        "ascii_upper40": up, "ascii_lower40": lo, "ascii_mixed40": mix,
        "ascii_0x_upper42": b"0x" + up, "ascii_0x_lower42": b"0x" + lo, "ascii_0x_mixed42": b"0x" + mix,
        "raw20": raw, "raw20_rev": raw[::-1],
        "nibble20": nib, "nibble20_rev": nib[::-1],
        "nibble_per_byte40": per, "nibble_per_byte40_rev": per[::-1],
        "dec42": str(ADDR_INT).encode(), "dec42_rev": str(ADDR_INT)[::-1].encode(),
    }


def chan(img: Image.Image, name: str) -> np.ndarray:
    a = np.frombuffer(img.getchannel(name).tobytes(), dtype=np.uint8)
    return a.reshape(img.size[1], img.size[0])


def idat_inflated() -> bytes:
    raw = PNG.read_bytes()
    chunks, p = [], 8
    while p + 8 <= len(raw):
        ln = int.from_bytes(raw[p:p + 4], "big")
        typ = raw[p + 4:p + 8]
        if typ == b"IDAT":
            chunks.append(raw[p + 8:p + 8 + ln])
        p += 12 + ln
    return zlib.decompress(b"".join(chunks))


def pair_bytes(L: np.ndarray, A: np.ndarray) -> bytes:
    out = np.empty((L.shape[0], L.shape[1], 2), dtype=np.uint8)
    out[:, :, 0] = L
    out[:, :, 1] = A
    return out.tobytes()


def byte_streams(L: np.ndarray, A: np.ndarray, ID: bytes):
    """(name, bytes) — байтовые представления носителя."""
    for nm, arr in (("L", L), ("A", A)):
        r = arr.ravel()
        c = arr.T.copy().ravel()
        yield nm + "_row", r.tobytes()
        yield nm + "_row_rev", r[::-1].tobytes()
        yield nm + "_col", c.tobytes()
        yield nm + "_col_rev", c[::-1].tobytes()
        yield nm + "_low4_row", (arr & 15).ravel().tobytes()
        yield nm + "_hi4_row", (arr >> 4).ravel().tobytes()
        yield nm + "_low4_col", (arr.T & 15).ravel().tobytes()
        yield nm + "_hi4_col", (arr.T >> 4).ravel().tobytes()
        yield nm + "_diff_row", np.diff(r).astype(np.uint8).tobytes()
        yield nm + "_nonwhite_row", r[r != 255].tobytes()
    yield "LA_row", pair_bytes(L, A)
    yield "LA_row_rev", pair_bytes(L, A)[::-1]
    yield "AL_row", pair_bytes(A, L)
    yield "IDAT_inflated", ID
    yield "IDAT_filterbytes", ID[::3201] if len(ID) % 3201 == 0 else b""


def bit_streams(L: np.ndarray, A: np.ndarray, ID: bytes):
    """(name, bitarray) — потоки по одной битовой плоскости; покрывают невыровненные смещения."""
    for nm, arr in (("L", L), ("A", A)):
        for k in range(8):
            for order, m in (("row", arr), ("col", arr.T.copy())):
                bits = ((m >> k) & 1).ravel().astype(np.uint8)
                yield "%s%d_%s" % (nm, k, order), to_bitarray(bits)
    ib = np.unpackbits(np.frombuffer(ID, dtype=np.uint8), bitorder="little")
    yield "IDAT_bits", to_bitarray(ib)


def to_bitarray(bits: np.ndarray) -> bitarray:
    """Битовая последовательность 0/1 -> logical bitarray (порядок элементов сохраняется)."""
    b = bitarray()
    b.frombytes(np.packbits(bits.astype(np.uint8), bitorder="big").tobytes())
    return b[: len(bits)]


def pattern_bits(pat: bytes):
    """Два порядка побитового раскрытия байтов образца (MSB- и LSB-first)."""
    b = np.frombuffer(pat, dtype=np.uint8)
    return (("msb", to_bitarray(np.unpackbits(b, bitorder="big"))),
            ("lsb", to_bitarray(np.unpackbits(b, bitorder="little"))))


def hunt(L, A, F, ID, deadline):
    hits, seen, nb, nbit = [], set(), 0, 0
    PATS = {fname: pattern_bits(pat) for fname, pat in F.items()}
    for name, s in byte_streams(L, A, ID):
        nb += 1
        if time.time() > deadline:
            print("  ! предел времени на байтовом уровне:", name)
            break
        for fname, pat in F.items():
            start = 0
            while True:
                k = s.find(pat, start)
                if k < 0:
                    break
                key = ("byte", name, fname, k)
                if key not in seen:
                    seen.add(key)
                    hits.append({"level": "byte", "stream": name, "form": fname,
                                 "offset": k, "unit": "bytes", "stream_len": len(s)})
                start = k + 1
    t1 = time.time()
    for name, ba in bit_streams(L, A, ID):
        nbit += 1
        if time.time() > deadline:
            print("  ! предел времени на битовом уровне:", name)
            break
        for fname, variants in PATS.items():
            for bo, pb in variants:
                for pos in ba.search(pb):
                    key = ("bit", name, fname, bo, int(pos))
                    if key in seen:
                        continue
                    seen.add(key)
                    hits.append({"level": "bit", "stream": name, "form": fname,
                                 "bit_order": bo, "bit_offset": int(pos),
                                 "stream_bits": len(ba)})
        if nbit % 16 == 0:
            print("   бит-потоков обработано %d, %.1f с" % (nbit, time.time() - t1))
    return nb, nbit, hits


def inject_byte(arr, flat_vals, pat):
    m = arr.copy().ravel().astype(np.uint16)
    m[flat_vals:flat_vals + len(pat)] = np.frombuffer(pat, dtype=np.uint8)
    return m.reshape(arr.shape).astype(np.uint8)


def inject_bitplane(arr, k, start_bit, bits):
    flat = arr.copy().ravel().astype(np.uint16)
    idx = np.arange(start_bit, start_bit + len(bits))
    v = flat[idx] & ~np.uint16(1 << k)
    flat[idx] = v | (bits.astype(np.uint16) << np.uint16(k))
    return flat.reshape(arr.shape).astype(np.uint8)


def selftest(L, A, F, ID):
    res = []
    raw = F["raw20"]

    def first(streams_iter, pat, pred):
        out = []
        for nm, s in streams_iter:
            k = pred(s, pat)
            if k is not None and k >= 0:
                out.append((nm, k))
        return out

    # (1) байтовый row-major L, ASCII
    pat, off = F["ascii_upper40"], 123456
    L1 = inject_byte(L, off, pat)
    g = [(nm, s.find(pat)) for nm, s in byte_streams(L1, A, ID) if s.find(pat) >= 0]
    res.append({"case": "byte_row_ascii", "want": ("L_row", off), "found": g[:5],
                "ok": any(x == ("L_row", off) for x in g)})

    # (2) байтовый column-major L, raw20
    coff = 77777
    c = L.T.copy().ravel().astype(np.uint16)
    c[coff:coff + len(raw)] = np.frombuffer(raw, dtype=np.uint8)
    L2 = c.reshape(L.shape[1], L.shape[0]).T.copy().astype(np.uint8)
    g2 = [(nm, s.find(raw)) for nm, s in byte_streams(L2, A, ID) if s.find(raw) >= 0]
    res.append({"case": "byte_col_raw20", "want": ("L_col", coff), "found": g2[:5],
                "ok": any(x == ("L_col", coff) for x in g2)})

    # (3) битовая плоскость 3, НЕвыровненное стартовое смещение
    sb = 4000 * 8 + 3
    bits = np.unpackbits(np.frombuffer(raw, dtype=np.uint8), bitorder="big")
    L3 = inject_bitplane(L, 3, sb, bits)
    g3 = []
    for nm, ba in bit_streams(L3, A, ID):
        for bo, pb in pattern_bits(raw):
            p = ba.find(pb)
            if p >= 0:
                g3.append((nm, bo, int(p)))
    res.append({"case": "bitplane3_unaligned_raw20", "want": ("L3_row", "msb", sb),
                "found": g3[:6],
                "ok": any(x[0] == "L3_row" and x[1] == "msb" and x[2] == sb for x in g3)})

    # (4) alpha-плоскость 0, выровненное смещение
    sb2 = 2000 * 8
    A4 = inject_bitplane(A, 0, sb2, np.unpackbits(np.frombuffer(raw, dtype=np.uint8),
                                                  bitorder="little"))
    g4 = []
    for nm, ba in bit_streams(L, A4, ID):
        for bo, pb in pattern_bits(raw):
            p = ba.find(pb)
            if p >= 0:
                g4.append((nm, bo, int(p)))
    res.append({"case": "alpha_plane0_lsb_raw20", "want": ("A0_row", "lsb", sb2),
                "found": g4[:6],
                "ok": any(x[0] == "A0_row" and x[2] == sb2 for x in g4)})
    return res


def main():
    t0 = time.time()
    img = Image.open(PNG)
    assert img.mode == "LA" and img.size == (1600, 1105), (img.mode, img.size)
    L, A = chan(img, "L"), chan(img, "A")
    F, ID = forms(), idat_inflated()
    print("носитель: sha256 %s, IDAT inflated %d байт" %
          (hashlib.sha256(PNG.read_bytes()).hexdigest()[:16], len(ID)))
    st = selftest(L, A, F, ID)
    ok = all(x["ok"] for x in st)
    print("САМОТЕСТ:", "ПРОЙДЕН" if ok else "ПРОВАЛЕН", "(%.1f с)" % (time.time() - t0))
    for x in st:
        print("   %-28s ok=%s want=%s found=%s" % (x["case"], x["ok"], x["want"], x["found"]))
    payload = {"ts": time.strftime("%Y-%m-%d %H:%M:%S"),
               "image_sha256": hashlib.sha256(PNG.read_bytes()).hexdigest(),
               "selftest": st, "forms": sorted(F)}
    if not ok:
        payload["verdict"] = "selftest_failed"
        OUT.write_text(json.dumps(payload, ensure_ascii=False, indent=1), encoding="utf-8")
        print("самотест не пройден - результат не выдаётся (см.", OUT, ")")
        return
    nb, nbit, hits = hunt(L, A, F, ID, t0 + TIME_LIMIT_S)
    payload.update({"byte_streams": nb, "bit_streams": nbit, "hits": hits,
                    "seconds": round(time.time() - t0, 1),
                    "verdict": "HIT" if hits else "NEGATIVE"})
    OUT.write_text(json.dumps(payload, ensure_ascii=False, indent=1), encoding="utf-8")
    print("потоков: байт %d, бит %d | форм %d | времени %.1f с | попаданий %d"
          % (nb, nbit, len(F), time.time() - t0, len(hits)))
    for hh in hits[:40]:
        print("   ", hh)


if __name__ == "__main__":
    main()
