# -*- coding: utf-8 -*-
"""9vw04 H7: «нули как якоря» (сторонний инсайт Mixas/canalqb: в сетке 52 нуля = длина WIF).

Две части:
  A) СТАТИСТИКА (без перебора): позиции/гэпы/пары/цвета 52 нулей, рядом стоящие символы.
  B) ОСЬ (детерминированная, кандидатов <50k): для каждой якорной '0' извлекаем один символ по
     правилу (смещение k / следующий не-ноль с минимальным шагом m / гэп как индекс / цвет как
     направление), собираем 52-символьную строку и гоним через САМОПРОВЕРЯЮЩИЙСЯ оракул WIF.
Правило №2: гипотеза и ось зафиксированы в LOG.md до запуска.
"""
import json, os, hashlib, itertools
import base58
from coincurve import PublicKey

BASE = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
G = json.load(open(os.path.join(BASE, 'data', 'grid_ocr5.json'), encoding='utf-8'))['grid']
MAT = json.load(open(os.path.join(BASE, 'data', 'grid_colors.json'), encoding='utf-8'))['mat']
R, C = len(G), len(G[0])
TARGET = "039d7ce87733444acfde33960964344d8201d2d92ccdad0f5045e40fdcf963475b"
LETTERS = set('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
DIGITS = set('0123456789')

# ---------------- оракул (самотест обязателен) ----------------
def check(w):
    """52-симв. строка -> pubkey (hex, compressed) либо None; валидация base58+checksum."""
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

_k1 = base58.b58encode(bytes([0x80]) + (1).to_bytes(32, 'big') + b'\x01' +
                       hashlib.sha256(hashlib.sha256(bytes([0x80]) + (1).to_bytes(32, 'big') + b'\x01').digest()).digest()[:4])
assert _k1.decode() == 'KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjgd9M7rFU73sVHnoWn', 'oracle self-test failed'
assert check(_k1.decode()) == '0279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798', 'oracle self-test failed'
print('oracle self-test: OK')

# ---------------- порядки ----------------
def orders():
    o = {}
    o['rowmajor'] = [(r, c) for r in range(R) for c in range(C)]
    o['colmajor'] = [(r, c) for c in range(C) for r in range(R)]
    sn = []
    for r in range(R):
        cs = range(C) if r % 2 == 0 else range(C - 1, -1, -1)
        sn += [(r, c) for c in cs]
    o['snake'] = sn
    d1 = []
    for d in range(-(R - 1), C):
        d1 += [(r, r - d) for r in range(R) if 0 <= r - d < C]
    o['diag_rc'] = d1
    d2 = []
    for s in range(R + C - 1):
        d2 += [(r, s - r) for r in range(R) if 0 <= s - r < C]
    o['diag_sum'] = d2
    for k in list(o):
        o[k + '_rev'] = o[k][::-1]
    return o

ORD = orders()
SEQ = {k: ''.join(G[r][c] for r, c in v) for k, v in ORD.items()}
ZPOS = {k: [i for i, ch in enumerate(v) if ch == '0'] for k, v in SEQ.items()}
N0 = len(ZPOS['rowmajor'])
print('digit-0 count per order (должно быть 52 во всех):', {k: len(v) for k, v in ZPOS.items()})

# ---------------- A. статистика ----------------
stats = {'n_zero': N0, 'per_row': {}, 'per_pair_index': {}, 'gap_rowmajor': {}, 'gap_colmajor': {},
         'colors_zero': {}, 'zero_cells': [], 'digits_before_after': {}}
for r in range(R):
    stats['per_row'][r] = sum(1 for c in range(C) if G[r][c] == '0')
for r in range(R):
    for c in range(C):
        if G[r][c] == '0':
            stats['per_pair_index'][c // 2] = stats['per_pair_index'].get(c // 2, 0) + 1
            stats['colors_zero'][MAT[r][c]] = stats['colors_zero'].get(MAT[r][c], 0) + 1
            stats['zero_cells'].append([r, c, MAT[r][c]])
for name in ('rowmajor', 'colmajor'):
    z = ZPOS[name]
    g = [z[i + 1] - z[i] for i in range(len(z) - 1)]
    stats['gap_' + name] = {'min': min(g), 'max': max(g), 'mean': round(sum(g) / len(g), 2),
                            'hist': {}}
    for x in g:
        stats['gap_' + name]['hist'][x] = stats['gap_' + name]['hist'].get(x, 0) + 1
print('статистика:', json.dumps({k: v for k, v in stats.items() if k != 'zero_cells'}, ensure_ascii=False))

# ---------------- B. ось ----------------
tested = set()
valid = []
hits = []

def try_str(src, s):
    if len(s) != 52 or s in tested:
        return
    tested.add(s)
    pk = check(s)
    if pk:
        valid.append((src, s))
        if pk == TARGET:
            hits.append((src, s))

def build(order, idxs):
    seq = SEQ[order]
    return ''.join(seq[i] for i in idxs)

# (b) смещение k от каждого нуля (в пределах потока), пропуск самих нулей
for order in SEQ:
    z = ZPOS[order]
    if len(z) != 52:
        continue
    seq = SEQ[order]
    for k in range(-26, 27):
        if k == 0:
            continue
        idxs = [i + k for i in z]
        if any(i < 0 or i >= len(seq) for i in idxs):
            continue
        if any(seq[i] == '0' for i in idxs):
            continue
        try_str(f'{order}:off{k:+d}', build(order, idxs))
        try_str(f'{order}:off{k:+d}:lower', build(order, idxs).lower().replace('0', 'o'))

# (c) следующий не-ноль с минимальным шагом m, в т.ч. сквозь границы (wrap-нет)
for order in SEQ:
    z = ZPOS[order]
    if len(z) != 52:
        continue
    seq = SEQ[order]
    for m in range(1, 14):
        for sgn in (1, -1):
            idxs = []
            ok = True
            for i in z:
                j = i + sgn * m
                while 0 <= j < len(seq) and seq[j] == '0':
                    j += sgn
                if not (0 <= j < len(seq)):
                    ok = False
                    break
                idxs.append(j)
            if ok:
                try_str(f'{order}:nz{sgn:+d}m{m}', build(order, idxs))

# (d) гэпы между нулями как индексы цифрового потока / букв-соседей
digits = ''.join(G[r][c] for r in range(R) for c in range(1, C, 2))      # 525 цифр
pairs = [(G[r][c], G[r][c + 1]) for r in range(R) for c in range(0, C - 1, 2)]  # 525 пар
zr = ZPOS['rowmajor']
gaps = [zr[i + 1] - zr[i] for i in range(51)] + [None]
for tag, seq in (('digits', digits),):
    for off in range(0, 6):
        idxs = []
        ok = True
        for i, gp in enumerate(gaps[:-1]):
            k = (gp + off) % len(seq)
            idxs.append(k)
        if ok:
            try_str(f'{tag}:gap+{off}%525', ''.join(seq[i] for i in idxs))
# пара-индекс и строка каждого нуля -> символы
for tag, arr in (('colpair', [c // 2 for r, c, _ in stats['zero_cells']]),
                 ('row', [r for r, c, _ in stats['zero_cells']]),
                 ('col', [c for r, c, _ in stats['zero_cells']]),
                 ('pos', zr)):
    for off in range(0, 8):
        try_str(f'{tag}+{off}->digits', ''.join(digits[(i + off) % 525] for i in arr))
        try_str(f'{tag}+{off}->pairsL', ''.join(pairs[i % 525][0] for i in arr))
        try_str(f'{tag}+{off}->pairsD', ''.join(pairs[i % 525][1] for i in arr))

# (e) цвет нулей как направление: K/B-нули = обратный обход
special = [(i, col) for (r, c, col), i in zip(stats['zero_cells'], zr) if col != 'P']
print('не-розовые нули (r,c,color,pos):', [(stats['zero_cells'][zr.index(i)][0], stats['zero_cells'][zr.index(i)][1], c2, i) for i, c2 in special])

print('tested unique 52-строк:', len(tested), 'valid WIF:', len(valid), 'hits:', len(hits))
for v in valid[:20]:
    print('VALID', v)
for h in hits:
    print('HIT', h)

json.dump({'stats': stats, 'tested': len(tested), 'valid': valid, 'hits': hits},
          open(os.path.join(BASE, 'data', 'h7_zero_anchor_result.json'), 'w', encoding='utf-8'),
          ensure_ascii=False, indent=1)
print('saved data/h7_zero_anchor_result.json')
