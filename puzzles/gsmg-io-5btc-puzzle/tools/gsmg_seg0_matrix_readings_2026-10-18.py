# -*- coding: utf-8 -*-
"""GSMG seg0: проверка оси «matrix sum list» в тех чтениях, которые НЕ покрыты прошлыми проходами.

Факты (проверено 18.10.2026, этот проход):
  seg0 = t[0:765] = D(91 цифра) + ab-прогон[91:195] («matrixsumlist», a=0/b=1) + F(570 цифр);
  в seg0 НЕТ нулей (все 'o'=0 начинаются с позиции 772), т.е. 661 «цифра» — это 661 символ из {1..9};
  91 = 7×13 (ровно), 570 = 2·3·5·19.

Известный способ чтения, которым вскрыты seg1/seg2 — «десятичный bigint → байты» (README, проход Qoder).
Здесь проверяются остальные естественные чтения: суммы матриц → (i) bigint→байты, (ii) буквы mod 26/27,
(iii) буквы по карте страницы, (iv) сортировка столбцов по сумме (транспозиция с числовым ключом «list»),
(v) суммы как список позиций. Печатается всё, с фильтром правдоподобного текста.
Только чтение.
"""
import re
import sys
from math import isqrt

sys.stdout.reconfigure(encoding="utf-8")
P = (r"C:\Users\Admin\OneDrive\Desktop\master\puzzles\gsmg-io-5btc-puzzle\data"
     r"\github_2026-10\applelamps__GSMG-CLEAN\files\data\salphaseion_compact_1075.txt")
WORDS = ["matrix", "sum", "list", "enter", "the", "key", "you", "half", "btcseed", "lastwords",
         "thispassword", "shabef", "causality", "yinyang", "password", "private", "secret", "seed",
         "better", "neighbor", "double", "salphaseion", "cosmic", "duality", "architect", "choice"]


def ascii_of_int(dstr):
    try:
        v = int(dstr)
    except Exception:
        return b""
    if v == 0:
        return b""
    h = format(v, "x")
    if len(h) % 2:
        h = "0" + h
    return bytes.fromhex(h)


def score(raw):
    if not raw:
        return 0.0, []
    pr = sum(1 for b in raw if 32 <= b < 127) / len(raw)
    asc = "".join(chr(b) if 32 <= b < 127 else "." for b in raw).lower()
    hits = [w for w in WORDS if w in asc]
    return pr, hits


def letters_from(nums, mod):
    out = []
    for s in nums:
        v = s % mod
        out.append(" " if v == 0 and mod == 27 else (chr(ord("a") + ((v - 1) % 26)) if (v % mod) else " "))
    return "".join(out)


def report(label, s, results):
    if isinstance(s, bytes):
        pr, hits = score(s)
        asc = "".join(chr(b) if 32 <= b < 127 else "." for b in s)
    else:
        asc = s
        pr = sum(1 for c in s if c.isalpha()) / max(1, len(s))
        hits = [w for w in WORDS if w in s.lower()]
    results.append((pr, len(hits), bool(hits), label, asc[:180]))


def summations(digs, R, C):
    m = [digs[i * C:(i + 1) * C] for i in range(R)]
    rs = [sum(r) for r in m]
    cs = [sum(m[i][j] for i in range(R)) for j in range(C)]
    return rs, cs


def main():
    t = open(P, encoding="utf-8", errors="ignore").read().rstrip("\n")
    MAP = {c: str(i + 1) for i, c in enumerate("abcdefghi")}
    MAP["o"] = "0"
    seg0 = t[0:765]
    D = "".join(MAP[c] for c in seg0[0:91])
    F = "".join(MAP[c] for c in seg0[195:765])
    results = []

    print("D =", D)
    print("F =", F[:120], "...")
    print()

    # (a..c) прямые bigint→байты
    for lbl, s in (("D91", D), ("F570", F), ("DF661", D + F), ("F+D", F + D)):
        report(f"{lbl} bigint->bytes", ascii_of_int(s), results)
    # с отбрасыванием последней цифры / первой
    report("D91[:-1] bigint", ascii_of_int(D[:-1]), results)
    report("F570[:-1] bigint", ascii_of_int(F[:-1]), results)
    report("D+F (без инструкции, наоборот) bigint", ascii_of_int(F + D), results)

    # (d) матрицы и суммы
    for lbl, s in (("D91", D), ("F570", F)):
        n = len(s)
        digs = [int(c) for c in s]
        for a in range(2, isqrt(n) + 1):
            if n % a:
                continue
            for (R, C) in ((a, n // a), (n // a, a)):
                rs, cs = summations(digs, R, C)
                tag = f"{lbl} {R}x{C}"
                # суммы как десятичная строка -> bigint -> байты
                report(f"{tag} rowsum-nat bigint", ascii_of_int("".join(map(str, rs))), results)
                report(f"{tag} colsum-nat bigint", ascii_of_int("".join(map(str, cs))), results)
                # суммы -> буквы
                for nm, sums in (("row", rs), ("col", cs)):
                    report(f"{tag} {nm}sum mod26 -> letters", letters_from(sums, 26), results)
                    report(f"{tag} {nm}sum mod27 -> letters", letters_from(sums, 27), results)
                    # как цифры по карте страницы
                    report(f"{tag} {nm}sum mod10 -> page-map letters",
                           "".join("oiabcdefghi"[v % 10] for v in sums), results)
                    # A1Z26 по каждой сумме (1..26), >26 отбрасываем
                    report(f"{tag} {nm}sum A1Z26",
                           "".join(chr(ord("a") + v - 1) for v in sums if 1 <= v <= 26), results)
                # (iv) сортировка столбцов по сумме -> чтение по строкам
                mm = [digs[i * C:(i + 1) * C] for i in range(R)]
                order = sorted(range(C), key=lambda j: cs[j])
                reordered = "".join("".join(str(mm[i][j]) for j in order) for i in range(R))
                report(f"{tag} сортировка столбцов по сумме -> bigint", ascii_of_int(reordered), results)
                # (v) суммы как позиции в исходной строке
                pos = "".join(s[v % len(s)] for v in rs + cs)
                report(f"{tag} суммы как позиции", pos, results)

    # (f) суммы по модулю 9 / цифровые корни
    for lbl, s in (("D91", D),):
        digs = [int(c) for c in s]
        rs, cs = summations(digs, 7, 13)
        report("D91 7x13 rowsum digit-root -> page-map",
               "".join("oiabcdefghi"[(v - 1) % 9 + 1] if v % 9 else "o" for v in rs), results)
        report("D91 7x13 colsum digit-root -> page-map",
               "".join("oiabcdefghi"[(v - 1) % 9 + 1] if v % 9 else "o" for v in cs), results)

    results.sort(key=lambda x: (-x[2], -x[0], -x[1]))
    print(f"всего чтений проверено: {len(results)}")
    print("=== со словами из словаря пазла ===")
    for pr, nh, hw, label, asc in [r for r in results if r[2]][:20]:
        print(f"  {pr:.2f} слов={nh} | {label} | {asc}")
    print("=== топ-12 по печатаемости/буквенности (без слов) ===")
    for pr, nh, hw, label, asc in results[:12]:
        print(f"  {pr:.2f} | {label} | {asc}")


if __name__ == "__main__":
    main()
