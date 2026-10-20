# -*- coding: utf-8 -*-
"""Проверка извлечения seg0 (SalPhaseIon): не потерял ли Qoder нули (o=0) при извлечении."""
import collections
import sys

sys.stdout.reconfigure(encoding="utf-8")
P = (r"C:\Users\Admin\OneDrive\Desktop\master\puzzles\gsmg-io-5btc-puzzle\data"
     r"\github_2026-10\applelamps__GSMG-CLEAN\files\data\salphaseion_compact_1075.txt")
t = open(P, encoding="utf-8", errors="ignore").read().rstrip("\n")
print("длина:", len(t))
print("позиции 'z':", [i for i, c in enumerate(t) if c == "z"])
print("позиции 'o':", [i for i, c in enumerate(t) if c == "o"])
print("прочие (не a-i, не z, не o):", [(i, c) for i, c in enumerate(t) if c not in "abcdefghiz" and c != "o"])
print()
print("t[85:205] =", t[85:205])
print()
seg0 = t[0:765]
print("len(seg0) =", len(seg0))
print("seg0[0:91]  — все в a-i/o:", all(c in "abcdefghio" for c in seg0[0:91]), "  o:", seg0[0:91].count("o"))
print("seg0[91:195] — множество символов:", sorted(set(seg0[91:195])))
print("seg0[195:765] — все в a-i/o:", all(c in "abcdefghio" for c in seg0[195:765]),
      " len =", len(seg0[195:765]), " o:", seg0[195:765].count("o"))
print("распределение seg0:", collections.Counter(seg0).most_common())
print()
MAP = {c: str(i + 1) for i, c in enumerate("abcdefghi")}
MAP["o"] = "0"
D = "".join(MAP[c] for c in seg0[0:91])
F = "".join(MAP[c] for c in seg0[195:765])
print("D(91) =", D)
print("F(570) первые 80:", F[:80])
print("F(570) все символы цифры:", F.isdigit(), " нулей в F:", F.count("0"), " нулей в D:", D.count("0"))
print("D+F длина:", len(D) + len(F))
