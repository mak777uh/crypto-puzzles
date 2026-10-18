# -*- coding: utf-8 -*-
"""9vw04: оси H2b (Atbash-зеркало), H3 (кейс/метки), H4 ((letter,digit)->base58), H5 (спирали).

Все кандидаты — окна 52 со старта K/L; оракул = base58(38B)+prefix0x80+suffix0x01+checksum
-> compressed pubkey vs TARGET. Кейс-варианты окна: as-is / V,W->v,w / всё в нижний (первый
символ обратно K/L). Каждый прогон <15 мин (фактически секунды), негатив — в LOG.
"""
import json, os, hashlib, time
import base58
from coincurve import PublicKey

BASE = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
G5 = json.load(open(os.path.join(BASE, 'data', 'grid_ocr5.json'), encoding='utf-8'))['grid']
COL = json.load(open(os.path.join(BASE, 'data', 'grid_colors.json'), encoding='utf-8'))
MAT = COL['mat']
R, C = len(G5), len(G5[0])
TARGET = '039d7ce87733444acfde33960964344d8201d2d92ccdad0f5045e40fdcf963475b'
CYC = 'TUVWYZROBMJKHLXQNPACDEFGIS'
B58 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'

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

def variants(w):
    out = [w]
    out.append(w.replace('V', 'v').replace('W', 'w'))
    lw = w.lower()
    if lw[0] in 'kl':
        out.append(lw[0].upper() + lw[1:])
    return out

stats = {}
hits = []

def scan(name, seq, strides=range(1, 21)):
    t = 0
    L = len(seq)
    for N in strides:
        for off in range(N):
            s = seq[off::N]
            if len(s) < 52:
                continue
            for i in range(len(s) - 51):
                if s[i] in 'KL':
                    w = s[i:i + 52]
                    t += 1
                    for v in variants(w):
                        pk = check(v)
                        if pk:
                            tag = 'TARGET_HIT' if pk == TARGET else 'valid_no_target'
                            hits.append((name, N, off, i, v, tag))
                            break
    stats[name] = t

t0 = time.time()

# --- H2b: Atbash-зеркало букв (цифры как есть), все 10 порядков, stride 1..20 ---
def atbash_grid(gr):
    A = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    m = str.maketrans(A, A[::-1])
    return [''.join(ch.translate(m) if ch.isalpha() else ch for ch in row) for row in gr]
gr_m = atbash_grid(G5)

def orders(gr):
    o = {}
    o['row'] = ''.join(''.join(r) for r in gr)
    o['col'] = ''.join(''.join(gr[r][c] for r in range(R)) for c in range(C))
    sn = []
    for r in range(R):
        sn += list(gr[r]) if r % 2 == 0 else list(gr[r])[::-1]
    o['snake'] = ''.join(sn)
    d1 = []
    for d in range(-(C - 1), R):   # 2026-10-18: исправлен диапазон (было -(R-1)..C, терялось 399 клеток)
        d1 += [gr[r][r - d] for r in range(R) if 0 <= r - d < C]
    o['diag_rc'] = ''.join(d1)
    d2 = []
    for s2 in range(R + C - 1):
        d2 += [gr[r][s2 - r] for r in range(R) if 0 <= s2 - r < C]
    o['diag_rplusc'] = ''.join(d2)
    for k in list(o):
        o[k + '_rev'] = o[k][::-1]
    return o

for nm, s in orders(gr_m).items():
    scan('atbash_' + nm, s)

# --- H3b: потоки меченых клеток (rowmajor): синий(букв), серый(букв=O-диаг), серый(цифры), белый(цифры), все метки ---
streams = {
    'mark_blueL': ''.join(G5[r][c] for r in range(R) for c in range(C) if MAT[r][c] == 'B' and c % 2 == 0),
    'mark_greyL': ''.join(G5[r][c] for r in range(R) for c in range(C) if MAT[r][c] == 'K' and c % 2 == 0),
    'mark_greyD': ''.join(G5[r][c] for r in range(R) for c in range(C) if MAT[r][c] == 'K' and c % 2 == 1),
    'mark_whiteD': ''.join(G5[r][c] for r in range(R) for c in range(C) if MAT[r][c] == 'W' and c % 2 == 1),
    'mark_all': ''.join(G5[r][c] for r in range(R) for c in range(C) if MAT[r][c] not in ('W', 'P') or (c % 2 == 1 and MAT[r][c] == 'W')),
}
for nm, s in streams.items():
    scan(nm, s, strides=range(1, 4))

# --- H4: (letter,digit) -> base58 индекс; варианты индекса ---
idx_cyc = {ch: i for i, ch in enumerate(CYC)}
idx_a = {ch: i for i, ch in enumerate('ABCDEFGHIJKLMNOPQRSTUVWXYZ')}
for nm, f in {
    'h4_cycd': lambda l, d: (idx_cyc[l] * 10 + d) % 58,
    'h4_abcd': lambda l, d: (idx_a[l] * 10 + d) % 58,
    'h4_sum': lambda l, d: (idx_cyc[l] + d) % 58,
    'h4_swap': lambda l, d: (d * 26 + idx_cyc[l]) % 58,
}.items():
    s = ''.join(B58[f(G5[r][2 * j], int(G5[r][2 * j + 1]))] for r in range(R) for j in range(25))
    scan(nm, s, strides=range(1, 4))
    scan(nm + '_rev', s[::-1], strides=range(1, 4))

# --- H5: спирали по сетке (GIF 01.03.2026) ---
def spiral(gr, inward=True):
    cells = []
    r0, r1, c0, c1 = 0, R - 1, 0, C - 1
    while r0 <= r1 and c0 <= c1:
        for c in range(c0, c1 + 1): cells.append(gr[r0][c])
        r0 += 1
        for r in range(r0, r1 + 1): cells.append(gr[r][c1])
        c1 -= 1
        if r0 <= r1:
            for c in range(c1, c0 - 1, -1): cells.append(gr[r1][c])
            r1 -= 1
        if c0 <= c1:
            for r in range(r1, r0 - 1, -1): cells.append(gr[r][c0])
            c0 += 1
    s = ''.join(cells)
    return s if inward else s[::-1]

for nm, s in [('spiral_in', spiral(G5, True)), ('spiral_out', spiral(G5, False)),
              ('spiral_in_m', spiral(gr_m, True)), ('spiral_out_m', spiral(gr_m, False))]:
    scan(nm, s, strides=range(1, 21))

print(f'total candidates={sum(stats.values())} hits={len(hits)} time={time.time()-t0:.1f}s')
for k, v in sorted(stats.items(), key=lambda x: -x[1])[:24]:
    print(' ', k, v)
for h in hits:
    print('RESULT', h)
json.dump({'stats': stats, 'hits': hits, 'seconds': round(time.time() - t0, 1)},
          open(os.path.join(BASE, 'data', 'axes2_results.json'), 'w', encoding='utf-8'), indent=1)
print('saved data/axes2_results.json')
