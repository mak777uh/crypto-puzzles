# -*- coding: utf-8 -*-
"""GSMG seg0, последнее узкое семейство: группы цифр как ЧИСЛА (не один bigint) + арифметика D и F.

Контроль механизма (seg1/seg2) уже пройден, карта a=1..i=9,o=0, big-endian.
Здесь проверяется: D и F как последовательности k-значных чисел (k=1..6) с отображением
(ASCII-если-в-диапазоне / +32 / mod26 / mod27 / mod256-байт), целочисленные D±F и D*F (mod 2^N -> байты),
и «сумма матрицы чисел» (F разбит на R строк по C чисел, суммы строк).
Только чтение.
"""
import sys

sys.stdout.reconfigure(encoding="utf-8")
P = (r"C:\Users\Admin\OneDrive\Desktop\master\puzzles\gsmg-io-5btc-puzzle\data"
     r"\github_2026-10\applelamps__GSMG-CLEAN\files\data\salphaseion_compact_1075.txt")
WORDS = ["lastwords", "thispassword", "matrix", "list", "enter", "the", "key", "you", "half", "btcseed",
         "shabef", "yinyang", "password", "private", "secret", "seed", "better", "neighbor", "double",
         "salphaseion", "cosmic", "architect", "choice", "first", "hint", "sum", "word"]
M = {c: str(i + 1) for i, c in enumerate("abcdefghi")}
M["o"] = "0"


def asc(b):
    return "".join(chr(x) if 32 <= x < 127 else "." for x in b)


def to_bytes_int(v, ln=None):
    if v == 0:
        return b""
    n = ln or (v.bit_length() + 7) // 8
    return v.to_bytes(n, "big")


def groups(s, k):
    return [int(s[i:i + k]) for i in range(0, len(s) - k + 1, k)]


def main():
    t = open(P, encoding="utf-8", errors="ignore").read().rstrip("\n")
    D = "".join(M[c] for c in t[0:91])
    F = "".join(M[c] for c in t[195:765])
    Di, Fi = int(D), int(F)
    out = []

    def rep(label, raw):
        r = sum(1 for b in raw if 32 <= b < 127) / len(raw) if raw else 0
        a = asc(raw).lower()
        h = [w for w in WORDS if w in a]
        out.append((r, len(h), h, label, len(raw), asc(raw)[:150]))

    # --- арифметика D и F как целых ---
    rep("D+F (int) -> bytes", to_bytes_int(Di + Fi))
    rep("D-F (int) -> bytes", to_bytes_int(abs(Di - Fi)))
    rep("F-D (int) -> bytes", to_bytes_int(abs(Fi - Di)))
    rep("D*F -> bytes", to_bytes_int(Di * Fi))
    rep("D*F mod 2^1896 (237 Б) -> bytes", to_bytes_int((Di * Fi) % (1 << (237 * 8)), 237))
    rep("F*D mod 2^304 (38 Б) -> bytes", to_bytes_int((Di * Fi) % (1 << (38 * 8)), 38))
    rep("F ^ D (младшие разряды) -> bytes", to_bytes_int(Fi ^ Di, max(len(F), len(D)) // 2))

    # --- группы цифр как числа ---
    for lbl, s in (("D91", D), ("F570", F)):
        for k in (1, 2, 3, 4, 5, 6):
            g = groups(s, k)
            if not g:
                continue
            # ASCII, где попадает в 32..126
            rep(f"{lbl} группы по {k} -> ASCII-если-в-диапазоне",
                bytes([v for v in g if 32 <= v < 127]))
            rep(f"{lbl} группы по {k} mod 95 + 32", bytes([v % 95 + 32 for v in g]))
            rep(f"{lbl} группы по {k} mod 26 -> буквы", ("".join(chr(97 + v % 26) for v in g)).encode())
            rep(f"{lbl} группы по {k} mod 27 -> 0..26", ("".join(" " if v % 27 == 0 else chr(96 + v % 27) for v in g)).encode())
            rep(f"{lbl} группы по {k} mod 256 -> байты", bytes([v % 256 for v in g]))
            # группы как слагаемые: суммы строк матрицы из чисел
            for C in (2, 3, 5, 10, 13, 19):
                if len(g) % C:
                    continue
                R = len(g) // C
                rs = [sum(g[i * C:(i + 1) * C]) for i in range(R)]
                cs = [sum(g[i * C + j] for i in range(R)) for j in range(C)]
                for nm, sums in (("row", rs), ("col", cs)):
                    rep(f"{lbl} числа по {k}, матрица {R}x{C} {nm}суммы mod95+32",
                        bytes([v % 95 + 32 for v in sums]))
                    rep(f"{lbl} числа по {k}, матрица {R}x{C} {nm}суммы mod256",
                        bytes([v % 256 for v in sums]))
                    rep(f"{lbl} числа по {k}, матрица {R}x{C} {nm}суммы decimal -> bytes",
                        to_bytes_int(int("".join(str(v) for v in sums))))

    out.sort(key=lambda x: (-x[1], -x[0]))
    print(f"чтений проверено: {len(out)}")
    print("=== со словами из словаря ===")
    for pr, nh, hw, label, ln, a in [r for r in out if r[1]][:15]:
        print(f"  {pr:.2f} слов={nh} ({ln} Б) | {label} | {a}")
    print("=== топ-12 по печатаемости ===")
    for pr, nh, hw, label, ln, a in out[:12]:
        print(f"  {pr:.2f} ({ln} Б) | {label} | {a}")


if __name__ == "__main__":
    main()
