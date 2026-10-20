# -*- coding: utf-8 -*-
"""Пакетный прогон списка паролей против целевого BIP38-ключа.

    python tools/run_list_2026-10-18.py <list.txt> [budget_sec]

Пишет результат в data/found.txt при попадании и печатает итог.
Никаких побочных эффектов на уровне модуля (Windows spawn).
"""
import os, sys, time
from multiprocessing import Pool

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import importlib.util

_here = os.path.dirname(os.path.abspath(__file__))
_spec = importlib.util.spec_from_file_location("b38ax", os.path.join(_here, "bip38_axis_2026-10-18.py"))
_b38 = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_b38)

FOUND = os.path.join(os.path.dirname(_here), "data", "found.txt")


def job(s):
    try:
        return (s, _b38.check(s))
    except Exception as exc:
        return (s, "ERR:" + exc.__class__.__name__)


def main():
    path = sys.argv[1]
    budget = int(sys.argv[2]) if len(sys.argv) > 2 else 840
    cands = [l.strip() for l in open(path, encoding="utf-8") if l.strip()]
    seen, uniq = set(), []
    for c in cands:
        if c not in seen and len(c) <= 30:
            seen.add(c)
            uniq.append(c)
    print(f"{path}: {len(cands)} строк, {len(uniq)} уник., бюджет {budget}s", flush=True)
    t0 = time.time()
    n = hits = 0
    with Pool(16) as pool:
        for s, r in pool.imap_unordered(job, uniq, chunksize=4):
            n += 1
            if isinstance(r, str) and r.startswith("ERR:"):
                print("ERR", repr(s), r, flush=True)
            elif r:
                hits += 1
                with open(FOUND, "a", encoding="utf-8") as fh:
                    fh.write(f"{time.strftime('%Y-%m-%d %H:%M:%S')} PASS={s!r} priv={r}\n")
                print("FOUND", repr(s), r, flush=True)
                pool.terminate()
                break
            if time.time() - t0 > budget:
                print("бюджет исчерпан на", n, flush=True)
                pool.terminate()
                break
    print(f"ИТОГ: проверено {n}/{len(uniq)}, найдено {hits}, {time.time()-t0:.0f}s")


if __name__ == "__main__":
    main()
