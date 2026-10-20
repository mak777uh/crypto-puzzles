# -*- coding: utf-8 -*-
"""GSMG H3-свип: призовой ключ = sha256(строка из словаря пазла) — массово.

Пространство (детерминированное, без хранения в памяти):
  A: длина 1..4 из 28 атомов, разделители {"", " ", "-", "_"}, регистр {как есть, UPPER}
     + для длины <=3 также sha256(sha256(x))
  B: длина 5 из 13 «страничных» токенов, разделители {"", " "}, регистр как есть
Критерий: h160(несжатый) ИЛИ h160(сжатый) == a9553269...bae4.
СКВОЗНОЙ КОНТРОЛЬ: синтетическая цель = h160(sha256(s*)) для известного s* из пространства;
свип обязан её найти (иначе инструмент недействителен).
Только чтение.
"""
import hashlib
import itertools
import multiprocessing as mp
import os
import sys
import time

import coincurve

sys.stdout.reconfigure(encoding="utf-8")
N = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141
PRIZE_H160 = "a9553269572a317e39f0f518cb87c1a0ee1dbae4"
OUT = r"C:\Users\Admin\AppData\Local\Temp\opencode\gsmg-enrich\h3_sweep.txt"

ATOMS = [
    "matrixsumlist", "enter", "lastwordsbeforearchichoice", "thispassword",
    "ourfirsthintisyourlastcommand", "yellowblueprimes", "yinyang", "shabef", "causality",
    "theone", "secondanswer", "yourlastcommand", "btcseed",
    "halfandbetterhalf", "youareonehalfofthekey", "splitsecretbetweentwosouls",
    "theprivatekeysbelongtohalfandbetterhalf", "HASHTHETEXT", "theseedisplanted",
    "choiceisanillusion", "theflowerblossomsthroughwhatseemstobeaconcretesurface",
    "THEMATRIXHASYOU", "SafenetLunaHSM1111", "abba", "GSMG", "gsmg.io",
    "theproblemis", "bytenphase",
]
ATOMS13 = ATOMS[:13]
SEPS_A = ["", " ", "-", "_"]
SEPS_B = ["", " "]

_G = {}


def _init(target_hex):
    _G["target"] = bytes.fromhex(target_hex)
    _G["atoms"] = ATOMS
    _G["atoms13"] = ATOMS13


def h160_of(d_bytes, compressed=False):
    pub = coincurve.PublicKey.from_valid_secret(d_bytes).format(compressed=compressed)
    return hashlib.new("ripemd160", hashlib.sha256(pub).digest()).digest()


def check(s_bytes, tag, depth):
    x = s_bytes
    for _ in range(depth):
        x = hashlib.sha256(x).digest()
    d = int.from_bytes(x, "big") % N
    if d == 0:
        return None
    db = d.to_bytes(32, "big")
    if h160_of(db, False) == _G["target"]:
        return (tag, "несжатый", s_bytes.decode("utf-8", "replace"), depth)
    if h160_of(db, True) == _G["target"]:
        return (tag, "сжатый", s_bytes.decode("utf-8", "replace"), depth)
    return None


def gen_all():
    """Генератор (индекс, байты, тег, глубина) по всему пространству."""
    i = 0
    for L in (1, 2, 3, 4):
        for sep in SEPS_A:
            for case in (0, 1):
                for combo in itertools.product(_G["atoms"], repeat=L):
                    s = sep.join(combo)
                    if case == 1:
                        s = s.upper()
                    i += 1
                    yield i, s.encode(), f"A{L}{repr(sep)}{case}", 1
                    if L <= 3:
                        yield i, s.encode(), f"A{L}{repr(sep)}{case}", 2
    for L in (5,):
        for sep in SEPS_B:
            for combo in itertools.product(_G["atoms13"], repeat=L):
                s = sep.join(combo)
                i += 1
                yield i, s.encode(), f"B{L}{repr(sep)}", 1


def worker(wid, total, nslices):
    hits = []
    n = 0
    for idx, sb, tag, depth in gen_all():
        if idx % nslices != wid:
            continue
        n += 1
        r = check(sb, tag, depth)
        if r:
            hits.append(r)
    return wid, n, hits


def run_sweep(target_hex):
    nproc = mp.cpu_count()
    t0 = time.time()
    with mp.Pool(nproc, initializer=_init, initargs=(target_hex,)) as pool:
        res = pool.starmap(worker, [(w, 0, nproc) for w in range(nproc)])
    total = sum(r[1] for r in res)
    hits = [h for r in res for h in r[2]]
    return total, hits, time.time() - t0


def h160_hex(s):
    d = int.from_bytes(hashlib.sha256(s.encode()).digest(), "big") % N
    return h160_of(d.to_bytes(32, "big"), False).hex()


def main():
    with mp.Pool(1, initializer=_init, initargs=(PRIZE_H160,)):
        pass
    # оценка размера
    _init(PRIZE_H160)
    print("атомов:", len(ATOMS), "| страничных токенов:", len(ATOMS13))
    size = 0
    for idx, _, _, _ in gen_all():
        size = idx
    print("размер пространства:", size)

    # --- СКВОЗНОЙ КОНТРОЛЬ ---
    s_star = "btcseed yinyang"          # заведомо внутри пространства A (L=2, sep=' ')
    star = s_star.upper() if s_star.upper() in [s_star] else s_star
    ctrl_h160 = h160_hex("BTCSEED YINYANG")
    print("контроль: цель h160(sha256('BTCSEED YINYANG')) =", ctrl_h160[:16], "...")
    tot, hits, dt = run_sweep(ctrl_h160)
    print(f"контроль-прогон: {tot} кандидатов за {dt:.1f}s -> попаданий {len(hits)}")
    for h in hits:
        print("   контроль-попадание:", h)
    if not hits:
        print("!!! СКВОЗНОЙ КОНТРОЛЬ ПРОВАЛЕН — реальный свип недействителен")
        return

    # --- реальный прогон ---
    tot, hits, dt = run_sweep(PRIZE_H160)
    rate = tot / dt
    print(f"\nРЕАЛЬНЫЙ свип: {tot} кандидатов за {dt:.1f}s ({rate:.0f}/s на {mp.cpu_count()} ядрах)")
    print("НАХОДОК:", len(hits))
    for h in hits:
        print("   !!!", h)
    with open(OUT, "a", encoding="utf-8") as f:
        f.write(f"target={PRIZE_H160} total={tot} dt={dt:.1f} hits={len(hits)}\n")
        for h in hits:
            f.write(f"   {h}\n")


if __name__ == "__main__":
    main()
