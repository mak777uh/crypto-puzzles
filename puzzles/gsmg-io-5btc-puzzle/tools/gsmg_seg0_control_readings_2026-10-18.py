# -*- coding: utf-8 -*-
"""GSMG seg0: контроль механизма расшифровки сегментов + чтения «matrixsumlist», которых не было.

Контроль (обязателен): сегменты seg1 = t[766:829] и seg2 = t[830:859] в известной базе читаются как
«десятичный bigint -> байты». Если мой код воспроизводит «lastwordsbeforearchichoice» и «thispassword»
на этих сегментах при карте a=1..i=9,o=0, то тем же кодом корректно читать D/F — иначе прогон недействителен.

Затем для seg0 = D(91) + ab-прогон + F(570): прямые bigint-чтения, реверс, little-endian, сдвиги границ,
поэлементные суммы D и F, и «списки сумм» матриц D/F, приведённые к цифрам (mod 9 / mod 10 / последняя цифра)
-> bigint -> байты. Печатается всё; для интересного — полные дампы.
Только чтение.
"""
import sys

sys.stdout.reconfigure(encoding="utf-8")
P = (r"C:\Users\Admin\OneDrive\Desktop\master\puzzles\gsmg-io-5btc-puzzle\data"
     r"\github_2026-10\applelamps__GSMG-CLEAN\files\data\salphaseion_compact_1075.txt")
WORDS = ["lastwords", "thispassword", "matrix", "list", "enter", "the", "key", "you", "half", "btcseed",
         "shabef", "yinyang", "password", "private", "secret", "seed", "better", "neighbor", "double",
         "salphaseion", "cosmic", "architect", "choice", "causality", "first", "hint"]


def digits(s, mapv):
    return "".join(mapv[c] for c in s)


def to_bytes(dstr, byteorder="big"):
    """десятичная строка -> минимальные байты (как в известных сегментах)"""
    v = int(dstr) if dstr else 0
    if v == 0:
        return b""
    ln = (v.bit_length() + 7) // 8
    return v.to_bytes(ln, byteorder)


def asc(raw):
    return "".join(chr(b) if 32 <= b < 127 else "." for b in raw)


def ratio(raw):
    return sum(1 for b in raw if 32 <= b < 127) / len(raw) if raw else 0.0


def hits(raw):
    a = asc(raw).lower()
    return [w for w in WORDS if w in a]


def report(label, raw, out):
    out.append((ratio(raw), len(hits(raw)), hits(raw), label, len(raw), asc(raw)[:150]))


def main():
    t = open(P, encoding="utf-8", errors="ignore").read().rstrip("\n")
    M = {c: str(i + 1) for i, c in enumerate("abcdefghi")}
    M["o"] = "0"

    seg1d = digits(t[766:829], M)
    seg2d = digits(t[830:859], M)
    b1 = to_bytes(seg1d)
    b2 = to_bytes(seg2d)
    print("КОНТРОЛЬ механизма (карта a=1..i=9, o=0, big-endian):")
    print("  seg1 (63 цифры) ->", len(b1), "Б :", asc(b1))
    print("  seg2 (29 цифр)  ->", len(b2), "Б :", asc(b2))
    ok1 = b"lastwordsbeforearchichoice" in b1
    ok2 = b"thispassword" in b2
    print("  контроль:", "OK" if (ok1 and ok2) else f"ПРОВАЛ (seg1={ok1}, seg2={ok2})")
    if not (ok1 and ok2):
        print("  --- пробую альтернативные карты/порядок для контроля ---")
        alts = {
            "a=0..i=8,o=9": {c: str(i) for i, c in enumerate("abcdefghi")} | {"o": "9"},
            "a=1..i=9,o=0 LE": M,
        }
        for nm, mm in alts.items():
            for bo in ("big", "little"):
                try:
                    s1 = to_bytes(digits(t[766:829], mm), bo)
                    s2 = to_bytes(digits(t[830:859], mm), bo)
                except KeyError:
                    continue
                print(f"    {nm} {bo}: seg1={asc(s1)[:34]!r} seg2={asc(s2)[:20]!r}")
        return

    D = digits(t[0:91], M)
    F = digits(t[195:765], M)
    out = []
    print(f"\nD = {D}")
    print(f"F = {F}\n")

    # --- прямые чтения ---
    for lbl, s in (("D91", D), ("F570", F), ("D+F", D + F), ("F+D", F + D)):
        for bo in ("big", "little"):
            report(f"{lbl} bigint {bo}", to_bytes(s, bo), out)
        report(f"{lbl} реверс bigint", to_bytes(s[::-1], "big"), out)

    # --- сдвиги границ ---
    for d in range(-4, 5):
        if d == 0:
            continue
        s = t[max(0, 195 + d):765]
        try:
            dd = digits(s, M)
        except KeyError:
            continue
        report(f"F сдвиг {d:+d}", to_bytes(dd), out)
        report(f"D сдвиг {d:+d}", to_bytes(digits(t[max(0, d):91 + d], M) if d > 0 else digits(t[0:91 + d], M)), out)

    # --- поэлементные суммы D и F ---
    dd = [int(c) for c in D]
    ff = [int(c) for c in F]
    for how in ("start", "end"):
        if how == "start":
            x = [(ff[i] + (dd[i] if i < len(dd) else 0)) % 10 for i in range(len(ff))]
        else:
            x = [(ff[i] + (dd[i - (len(ff) - len(dd))] if i >= len(ff) - len(dd) else 0)) % 10
                 for i in range(len(ff))]
        s = "".join(str(v) for v in x)
        report(f"D+F поэлементно mod10 ({how})", to_bytes(s), out)
        report(f"D+F поэлементно mod10 ({how}) реверс", to_bytes(s[::-1]), out)

    # --- «списки сумм» матриц, приведённые к цифрам ---
    def shapes(n):
        return [(a, n // a) for a in range(2, int(n ** 0.5) + 1) if n % a == 0]

    for lbl, s in (("D91", D), ("F570", F)):
        n = len(s)
        digs = [int(c) for c in s]
        for a in {p[0] for p in shapes(n)} | {p[1] for p in shapes(n)}:
            R, C = a, n // a
            for name, sums in (
                ("row", [sum(digs[i * C:(i + 1) * C]) for i in range(R)]),
                ("col", [sum(digs[i * C + j] for i in range(R)) for j in range(C)]),
            ):
                for redname, red in (("mod10", lambda v: v % 10), ("mod9p1", lambda v: v % 9 + 1),
                                     ("digitalroot", lambda v: (v - 1) % 9 + 1)):
                    dd2 = "".join(str(red(v)) for v in sums)
                    report(f"{lbl} {R}x{C} {name}sum {redname} -> bytes", to_bytes(dd2), out)
                    report(f"{lbl} {R}x{C} {name}sum {redname} реверс", to_bytes(dd2[::-1]), out)
                # сумма как одно число -> цифры -> байты
                report(f"{lbl} {R}x{C} {name}sum(одно число) -> bytes", to_bytes(str(sum(sums))), out)

    out.sort(key=lambda x: (-x[1], -x[0]))
    print(f"чтений проверено: {len(out)}")
    print("=== со словами из словаря ===")
    for pr, nh, hw, label, ln, a in [r for r in out if r[1]][:15]:
        print(f"  {pr:.2f} слов={nh} ({ln} Б) | {label} | {a}")
    print("=== топ-10 по печатаемости ===")
    for pr, nh, hw, label, ln, a in out[:10]:
        print(f"  {pr:.2f} ({ln} Б) | {label} | {a}")
    print("\n=== полные дампы прямых чтений (для глаза) ===")
    for lbl, raw in (("D91 bigint", to_bytes(D)), ("F570 bigint", to_bytes(F)), ("D+F bigint", to_bytes(D + F))):
        print(f"  {lbl} [{len(raw)} Б]: {asc(raw)}")


if __name__ == "__main__":
    main()
