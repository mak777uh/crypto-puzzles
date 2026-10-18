# -*- coding: utf-8 -*-
"""9vw04: достройка оси H1/skip по КОРРЕКТНОМУ обходу диагоналей diag_rc (в прежних проголах
обход `for d in range(-(R-1), C)` при `c=r-d` терял 399 клеток: последовательность была 651 вместо 1050).
Здесь d пробегает реальный диапазон r-c = [-(C-1) .. R-1]; проверяем полноту покрытия (1050 клеток).
Гипотеза/ось уже зарегистрированы в LOG.md (H1 + пометка 12:0x); оракул самопроверяется.
"""
import json, os, hashlib
import base58
from coincurve import PublicKey

BASE = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
G = json.load(open(os.path.join(BASE, 'data', 'grid_ocr5.json'), encoding='utf-8'))['grid']
R, C = len(G), len(G[0])
TARGET = "039d7ce87733444acfde33960964344d8201d2d92ccdad0f5045e40fdcf963475b"

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

def diag_rc_fixed():
    cells = []
    for d in range(-(C - 1), R):          # d = r-c
        cells += [(r, r - d) for r in range(R) if 0 <= r - d < C]
    return cells

def diag_rc_old():
    cells = []
    for d in range(-(R - 1), C):
        cells += [(r, r - d) for r in range(R) if 0 <= r - d < C]
    return cells

old, new = diag_rc_old(), diag_rc_fixed()
print('старый обход клеток:', len(old), '| новый:', len(new), '| покрытие всех 1050:', len(set(new)) == R * C)

tested = 0
valid = []
hits = []
seen = set()
for name, seq in (('diag_rc', ''.join(G[r][c] for r, c in new)),
                  ('diag_rc_rev', ''.join(G[r][c] for r, c in new[::-1]))):
    L = len(seq)
    for N in range(2, L):
        for off in range(min(N, L)):
            s = seq[off::N]
            if len(s) < 52:
                break
            for i, ch in enumerate(s):
                if ch in 'KL':
                    w = s[i:i + 52]
                    if len(w) == 52 and w not in seen:
                        seen.add(w)
                        tested += 1
                        pk = check(w)
                        if pk:
                            valid.append((name, N, off, i, w))
                            if pk == TARGET:
                                hits.append((name, N, off, i, w))
print('tested windows:', tested, 'valid WIF:', len(valid), 'hits:', len(hits))
for v in valid[:10]:
    print('VALID', v)
for h in hits:
    print('HIT', h)
json.dump({'tested': tested, 'valid': valid, 'hits': hits,
           'old_len': len(old), 'new_len': len(new)},
          open(os.path.join(BASE, 'data', 'diag_rerun_result.json'), 'w', encoding='utf-8'),
          ensure_ascii=False, indent=1)
print('saved data/diag_rerun_result.json')
