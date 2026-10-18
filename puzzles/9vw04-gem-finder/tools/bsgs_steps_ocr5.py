# -*- coding: utf-8 -*-
"""9vw04 H8: «baby step / giant step» как ДВОЙНОЙ шаг чтения последовательности сетки.

Семейство: берём блоки по b клеток, следующий блок через g клеток (g > b). Обычный skip-N (H1) —
это b=1, поэтому сюда не входит. Плюс транспозиция линейного потока по ширине W (чтение по столбцам).
Гипотеза и ось зафиксированы в LOG.md до запуска (правило №2). Оракул самопроверяется; структурный
фильтр отсекает окна с 0/O/I (их нет в base58) до дорогостоящей проверки.
"""
import json, os, hashlib, time
import base58
from coincurve import PublicKey

BASE = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
G = json.load(open(os.path.join(BASE, 'data', 'grid_ocr5.json'), encoding='utf-8'))['grid']
R, C = len(G), len(G[0])
TARGET = "039d7ce87733444acfde33960964344d8201d2d92ccdad0f5045e40fdcf963475b"
BAD = set('0OI')  # нет в base58


def check(w):
    try:
        d = base58.b58decode(w)
    except Exception:
        return None
    if len(d) != 38 or d[0] != 0x80 or d[33] != 0x01:
        return None
    if hashlib.sha256(hashlib.sha256(d[:34]).digest()).digest()[:4] != d[34:]:
        return None
    try:
        return PublicKey.from_valid_secret(d[1:33]).format(compressed=True).hex()
    except Exception:
        return None


pre = bytes([0x80]) + (1).to_bytes(32, 'big') + b'\x01'
tv = base58.b58encode(pre + hashlib.sha256(hashlib.sha256(pre).digest()).digest()[:4]).decode()
assert tv == 'KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjgd9M7rFU73sVHnoWn'
assert check(tv) == '0279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798'
print('oracle self-test: OK')


def base_orders():
    o = {}
    o['rowmajor'] = [G[r][c] for r in range(R) for c in range(C)]
    o['colmajor'] = [G[r][c] for c in range(C) for r in range(R)]
    sn = []
    for r in range(R):
        cs = range(C) if r % 2 == 0 else range(C - 1, -1, -1)
        sn += [G[r][c] for c in cs]
    o['snake'] = sn
    d2 = []
    for s in range(R + C - 1):
        d2 += [G[r][s - r] for r in range(R) if 0 <= s - r < C]
    o['diag_sum'] = d2
    for k in list(o):
        o[k + '_rev'] = o[k][::-1]
    return o


tested = 0
skipped_alpha = 0
valid = []
hits = []
kept = 0
seen = set()
t0 = time.time()


def feed(src, seq):
    """все окна 52, стартующие с K/L, через алфавитный фильтр"""
    global tested, skipped_alpha
    L = len(seq)
    for i in range(L - 51):
        if seq[i] not in 'KL':
            continue
        w = ''.join(seq[i:i + 52])
        if any(ch in BAD for ch in w):      # дешёвый фильтр: 0/O/I нет в base58
            skipped_alpha += 1
            continue
        if w in seen:
            continue
        seen.add(w)
        tested += 1
        pk = check(w)
        if pk:
            valid.append([src, i, w])
            if pk == TARGET:
                hits.append([src, i, w])


ORD = base_orders()
for name, seq in ORD.items():
    s = ''.join(seq)
    L = len(s)
    # (a) двойной шаг: baby b подряд, giant g — начало следующего блока
    for g in range(2, 61):
        for b in range(1, 21):
            if b >= g:
                continue
            out = []
            for i in range(0, L, g):
                out.append(s[i:i + b])
                if len(''.join(out)) >= L:
                    break
            t = ''.join(out)
            if len(t) >= 52:
                feed(f'{name}:g{g}b{b}', t)
    # (b) транспозиция: запись потоком по ширине W, чтение по столбцам
    for W in range(2, 61):
        rows = (L + W - 1) // W
        t = []
        for c in range(W):
            for r in range(rows):
                idx = r * W + c
                if idx < L:
                    t.append(s[idx])
        if len(t) >= 52:
            feed(f'{name}:tr{W}', t)
    # (c) «giant-step выборка» внутри baby-окна: s[i*g + j] для j из цикла (0..b-1) — покрывается (a)

print(f'tested={tested} alpha-filtered={skipped_alpha} valid_wif={len(valid)} hits={len(hits)} '
      f'time={round(time.time() - t0, 1)}s')
for v in valid[:20]:
    print('VALID', v)
for h in hits:
    print('HIT', h)
json.dump({'tested': tested, 'alpha_filtered': skipped_alpha, 'valid': valid, 'hits': hits,
           'seconds': round(time.time() - t0, 1)},
          open(os.path.join(BASE, 'data', 'h8_bsgs_result.json'), 'w', encoding='utf-8'),
          ensure_ascii=False, indent=1)
print('saved data/h8_bsgs_result.json')
