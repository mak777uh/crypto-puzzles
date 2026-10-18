# gsmg_seg0_zeros.py — час-чек: гипотеза «нули на прайм-позиции» для seg0 (dbbib 91 + faed 570).
# Данные: nadd_salphaseion.txt (cell 0 = полная строка ta0 со страницы SalPhaseIon).
# Идея (из хинтов 2021-12-25): «prime numbers required to proceed» + «some characters need to be 'zeroed out'».
# seg0 = алфавит a..i (9 букв, цифры 1..9), нулей нет вовсе.
import re, sys
from math import isqrt

txt = open('nadd_salphaseion.txt', encoding='utf-8').read()
# первая длинная строка из букв и пробелов (ta0)
cands = re.findall(r'[a-i ]{900,}', txt)
assert cands, 'ta0 не найден'
ta0 = max(cands, key=len)
dense = re.sub(r'\s', '', ta0)
print('ta0 dense length =', len(dense))
# по карте: [0:91] dbbib; [91:195] ab-run1; [195:765] faed; z@765...
part1 = dense[0:91]
part2 = dense[195:765]
print('part1(D) len', len(part1), '| part2(F) len', len(part2), '| alphabet1:', sorted(set(part1)), '| alphabet2:', sorted(set(part2)))

def digits(s):
    return ''.join(str(ord(c) - ord('a') + 1) for c in s)

D = digits(part1); F = digits(part2)
print('sample D digits:', D[:40])
print('sample F digits:', F[:40])

def primes_upto(n):
    sieve = bytearray([1]) * (n + 1)
    sieve[0:2] = b'\x00\x00'
    for i in range(2, isqrt(n) + 1):
        if sieve[i]:
            sieve[i*i::i] = bytearray(len(sieve[i*i::i]))
    return [i for i in range(n + 1) if sieve[i]]

def bigint_dec_to_ascii(dstr, label, cut=120):
    try:
        v = int(dstr)
        h = format(v, 'x')
        if len(h) % 2: h = '0' + h
        raw = bytes.fromhex(h)
        asc = ''.join(chr(b) if 32 <= b < 127 else '.' for b in raw)
        print(f'--- {label}: len(d)={len(dstr)} hexlen={len(h)} ascii[{len(asc)}]: {asc[:cut]}')
        return asc
    except Exception as e:
        print('---', label, 'ERR', e)
        return ''

def zero_variants(dstr, label):
    n = len(dstr)
    pr = [p for p in primes_upto(n)]
    # A: вставить '0' перед символом на позиции p (0-based) для всех простых p
    for base, name in ((0, '0-based'), (1, '1-based')):
        for where in ('before', 'after'):
            lst = list(dstr)
            off = 0
            for p in pr:
                idx = p - base
                if 0 <= idx <= n:
                    j = idx + off + (1 if where == 'after' else 0)
                    lst.insert(j, '0')
                    off += 1
            bigint_dec_to_ascii(''.join(lst), f'{label} insert[{name},{where}] primes_all')
    # B: заменить символ на позиции p на '0'
    for base, name in ((0, '0-based'), (1, '1-based')):
        lst = list(dstr)
        for p in pr:
            idx = p - base
            if 0 <= idx < n:
                lst[idx] = '0'
        bigint_dec_to_ascii(''.join(lst), f'{label} replace[{name}] primes_all')
    # C: дополнить нулями ДО простой длины
    L = n
    while any(L % d == 0 for d in range(2, isqrt(L) + 1)):
        L += 1
    bigint_dec_to_ascii(dstr + '0' * (L - n), f'{label} pad-to-prime-len {n}->{L}')

def scan_words(asc, label):
    words = re.findall(r'[A-Za-z][A-Za-z0-9 _.,-]{5,}', asc)
    if words:
        print(f'!!! {label}: printable runs:', words[:10])

print('================ D+F (661) ================')
DF = D + F
zero_variants(DF, 'DF')
bigint_dec_to_ascii(DF, 'DF as-is')
print('================ D (91) alone ================')
zero_variants(D, 'D')
bigint_dec_to_ascii(D, 'D as-is')
print('================ F (570) alone ================')
zero_variants(F, 'F')
bigint_dec_to_ascii(F, 'F as-is')
