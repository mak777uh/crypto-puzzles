# -*- coding: utf-8 -*-
"""9vw04: ось H1 — skip-перебор по grid_ocr5 (все порядки × N × офсеты, окно 52, старт K/L).

Отличие от прогона 17.10 (2952 окна, 0 хитов): сетка grid_ocr5 с исправленными
40 клетками (O- и Z-диагонали), тот же оракул (checksum + pubkey compressed).
Первым делом — тест-вектор оракула.
"""
import json, os, hashlib, time
import base58
from coincurve import PublicKey, PrivateKey

BASE = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
grid = json.load(open(os.path.join(BASE, 'data', 'grid_ocr5.json'), encoding='utf-8'))['grid']
R, C = len(grid), len(grid[0])
TARGET = '039d7ce87733444acfde33960964344d8201d2d92ccdad0f5045e40fdcf963475b'

# --- тест-вектор: known WIF compressed -> pubkey ---
raw = bytes([0x80]) + (1).to_bytes(32, 'big') + bytes([0x01])
tv = base58.b58encode(raw + hashlib.sha256(hashlib.sha256(raw).digest()).digest()[:4]).decode()
pk_tv = PrivateKey((1).to_bytes(32, 'big')).public_key.format(compressed=True).hex()
print('test vector:', tv, '->', pk_tv[:16], '...')

def check(w):
    try:
        d = base58.b58decode(w)
    except Exception:
        return None
    # b58decode = 34-byte payload + 4-byte checksum = 38
    if len(d) != 38 or d[0] != 0x80 or d[33] != 0x01:
        return None
    if hashlib.sha256(hashlib.sha256(d[:34]).digest()).digest()[:4] != d[34:]:
        return None
    try:
        return PublicKey.from_valid_secret(d[1:33]).format(compressed=True).hex()
    except Exception:
        return None

assert check(tv) == pk_tv, 'ОРАКУЛ НЕ САМОТЕСТИРУЕТСЯ'
print('оракул OK (compressed WIF 0x01 -> pubkey совпал)')

def build_orders():
    o = {}
    o['rowmajor'] = [grid[r][c] for r in range(R) for c in range(C)]
    o['colmajor'] = [grid[r][c] for c in range(C) for r in range(R)]
    snake = []
    for r in range(R):
        row = [grid[r][c] for c in range(C)]
        snake += row if r % 2 == 0 else row[::-1]
    o['snake'] = snake
    d1 = []
    for d in range(-(R - 1), C):
        for r in range(R):
            c = r - d
            if 0 <= c < C:
                d1.append(grid[r][c])
    o['diag_rc'] = d1
    d2 = []
    for s in range(R + C - 1):
        for r in range(R):
            c = s - r
            if 0 <= c < C:
                d2.append(grid[r][c])
    o['diag_rplusc'] = d2
    for k in list(o):
        o[k + '_rev'] = o[k][::-1]
    return o

t0 = time.time()
tested = 0
valid = 0
hits = []
for name, seq in build_orders().items():
    L = len(seq)
    for N in range(2, L):
        for off in range(min(N, L)):
            s = ''.join(seq[off::N])
            if len(s) < 52:
                break
            for i, ch in enumerate(s):
                if ch in 'KL':
                    w = s[i:i + 52]
                    if len(w) == 52:
                        tested += 1
                        pk = check(w)
                        if pk:
                            valid += 1
                            if pk == TARGET:
                                hits.append((name, N, off, i, w))
                            else:
                                hits.append((name, N, off, i, w, 'VALID_WIF_NO_TARGET'))
print(f'tested={tested} valid_wif={valid} hits={len(hits)} time={time.time()-t0:.1f}s')
for h in hits:
    print('HIT', h)
json.dump({'grid': 'grid_ocr5', 'tested': tested, 'valid': valid, 'hits': hits},
          open(os.path.join(BASE, 'data', 'skip_ocr5_result.json'), 'w', encoding='utf-8'), indent=1)
print('saved data/skip_ocr5_result.json')
