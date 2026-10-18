# gsmg_seg0_matrix.py — лид «matrixsumlist»: раскладываем F(570)/D(91)/D+F(661+нули) в матрицы,
# считаем суммы строк/столбцов, собираем цифры (в т.ч. mod10) → decimal bigint → hex → ascii.
# Печатаем всё с высокой долей печатных символов.
import re
from math import isqrt

txt = open('nadd_salphaseion.txt', encoding='utf-8').read()
ta0 = max(re.findall(r'[a-i ]{900,}', txt), key=len)
dense = re.sub(r'\s', '', ta0)
D = ''.join(str(ord(c) - ord('a') + 1) for c in dense[0:91])
F = ''.join(str(ord(c) - ord('a') + 1) for c in dense[195:765])

def factors(n):
    return [(a, n // a) for a in range(2, isqrt(n) + 1) if n % a == 0]

def to_ascii(dstr, label, results):
    try:
        v = int(dstr)
        h = format(v, 'x')
        if len(h) % 2: h = '0' + h
        raw = bytes.fromhex(h)
    except Exception:
        return
    if not raw: return
    printable = sum(1 for b in raw if 32 <= b < 127)
    ratio = printable / len(raw)
    asc = ''.join(chr(b) if 32 <= b < 127 else '.' for b in raw)
    words = re.findall(r'[A-Za-z][A-Za-z0-9_ .-]{7,}', asc)
    if ratio > 0.85 and len(raw) >= 8:
        results.append((ratio, len(raw), label, asc[:160], words[:6]))

def matrix_variants(dstr, base_label, results):
    n = len(dstr)
    digs = [int(c) for c in dstr]
    for (rows, cols) in factors(n):
        for orientation, (R, C) in (('rxc', (rows, cols)), ('cxr', (cols, rows))):
            m = [digs[i * C:(i + 1) * C] for i in range(R)]
            rows_sums = [sum(r) for r in m]
            cols_sums = [sum(m[i][j] for i in range(R)) for j in range(C)]
            for name, sums in (('row', rows_sums), ('col', cols_sums)):
                # натуральная конкатенация
                to_ascii(''.join(str(s) for s in sums), f'{base_label} {R}x{C} {name}sum nat', results)
                # каждый до 3 знаков
                to_ascii(''.join(f'{s:03d}' for s in sums), f'{base_label} {R}x{C} {name}sum 3d', results)
                # mod 10
                to_ascii(''.join(str(s % 10) for s in sums), f'{base_label} {R}x{C} {name}sum mod10', results)
    # паддинг нулями до составной длины
    for k in range(1, 41):
        np_ = n + k
        if any(np_ % d == 0 for d in range(2, isqrt(np_) + 1)):
            padded = dstr + '0' * k
            digs2 = [int(c) for c in padded]
            for (rows, cols) in factors(np_):
                for orientation, (R, C) in (('rxc', (rows, cols)),):
                    m = [digs2[i * C:(i + 1) * C] for i in range(R)]
                    rs = [sum(r) for r in m]
                    cs = [sum(m[i][j] for i in range(R)) for j in range(C)]
                    for name, sums in (('row', rs), ('col', cs)):
                        to_ascii(''.join(str(s) for s in sums), f'{base_label}+{k}zeros {R}x{C} {name}sum nat', results)
                        to_ascii(''.join(str(s % 10) for s in sums), f'{base_label}+{k}zeros {R}x{C} {name}sum mod10', results)

results = []
matrix_variants(F, 'F570', results)
matrix_variants(D, 'D91', results)
matrix_variants(D + F, 'DF661', results)

results.sort(reverse=True)
print(f'=== кандидатов с ratio>0.85: {len(results)} ===')
for ratio, ln, label, asc, words in results[:40]:
    print(f'{ratio:.2f} len={ln:4d} | {label} | {asc}')
    if words: print('      words:', words)
