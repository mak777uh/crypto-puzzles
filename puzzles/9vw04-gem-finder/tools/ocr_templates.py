# -*- coding: utf-8 -*-
"""9vw04: независимый кросс-чек сетки — template-кластеризация глифов.

Идея: EasyOCR путает Z<->2, I<->1, O<->0 и т.п. Один и тот же нарисованный глиф
всегда даёт один и тот же битмап, поэтому кластеризация битмапов по пиксельному
сходству даётground truth по формам; метка кластера = мажоритарный голос двух
независимых источников: data/grid_ocr3.json (EasyOCR) и
data/external/canalqb_grid_transcription.txt (ручная транскрипция из репо canalqb).

Выход: data/grid_ocr4.json (сетка + метки кластеров + конфликты),
       data/ocr_diff.json (отчёт расхождений).
"""
from PIL import Image
import numpy as np, json, os, sys
from collections import Counter, defaultdict

BASE = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
IMG = os.path.join(BASE, 'data', 'puzzle_wayback.jpg')
OCR3 = os.path.join(BASE, 'data', 'grid_ocr3.json')
EXT = os.path.join(BASE, 'data', 'external', 'canalqb_grid_transcription.txt')
OUT = os.path.join(BASE, 'data', 'grid_ocr4.json')
OUTD = os.path.join(BASE, 'data', 'ocr_diff.json')
N = 16  # размер нормализованного битмапа

a = np.asarray(Image.open(IMG).convert('RGB')).astype(int)
H, W, _ = a.shape
lum = a.sum(axis=2)
mask = lum > 110

# --- колонки/строки (та же логика, что в parse_grid.py) ---
def bands(axis_profile, min_count, min_width):
    out, s = [], None
    for i, v in enumerate(axis_profile):
        if v > min_count and s is None:
            s = i
        elif v <= min_count and s is not None:
            out.append([s, i - 1]); s = None
    if s is not None:
        out.append([s, len(axis_profile) - 1])
    fixed = []
    for b in out:
        wdt = b[1] - b[0] + 1
        if wdt > min_width:
            mid = (b[0] + b[1]) // 2
            fixed += [[b[0], mid], [mid + 1, b[1]]]
        else:
            fixed.append(b)
    return fixed

o3 = json.load(open(OCR3, encoding='utf-8'))
row_bands = [tuple(x) for x in o3['rows']]
col_bands = [tuple(x) for x in o3['cols']]
print('grid', len(row_bands), 'x', len(col_bands))
assert len(row_bands) == 21 and len(col_bands) == 50, 'unexpected grid geometry'

grid3 = [''.join(r) if isinstance(r, list) else r for r in o3['grid']]
conf3 = o3.get('conf')
ext = [l.strip() for l in open(EXT) if l.strip()]
assert len(ext) == 21 and all(len(x) == 50 for x in ext)


def glyph(r0, r1, c0, c1):
    """Нормализованный 16x16 битмап глифа клетки (по тёмным/светлым относительно фона)."""
    cell = a[r0:r1 + 1, c0:c1 + 1]
    msk = mask[r0:r1 + 1, c0:c1 + 1]
    if msk.sum() < 6:
        return None
    ys, xs = np.nonzero(msk)
    sub = cell[ys.min():ys.max() + 1, xs.min():xs.max() + 1]
    sm = msk[ys.min():ys.max() + 1, xs.min():xs.max() + 1]
    im = Image.fromarray((sub.sum(axis=2) / 3).clip(0, 255).astype('uint8')).resize((N, N), Image.LANCZOS)
    v = np.asarray(im, dtype=float)
    v[~np.asarray(Image.fromarray((sm * 255).astype('uint8')).resize((N, N), Image.LANCZOS)) > 128] = np.nan
    v = np.nan_to_num(v, nan=float(np.nanmean(v)))
    v = (v - v.mean()) / (v.std() + 1e-6)
    return v

G = np.full((21, 50), None, dtype=object)
for ri, (y0, y1) in enumerate(row_bands):
    for ci, (x0, x1) in enumerate(col_bands):
        G[ri, ci] = glyph(y0, y1, x0, x1)

flat = [G[r, c] for r in range(21) for c in range(50)]
flat = [f for f in flat if f is not None]
print('glyphs', len(flat))
M = np.stack(flat).reshape(len(flat), -1)

# жадкая кластеризация: представитель кластера = первый элемент; dist = 1 - corr
clusters = []  # list of (centroid, member_idx[])
assign = np.full(len(M), -1, dtype=int)
for i in range(len(M)):
    best, bestd = -1, 2.0
    for k, (cent, mem) in enumerate(clusters):
        d = float(np.mean((M[i] - cent) ** 2))
        if d < bestd:
            best, bestd = k, d
    TH = 0.55
    if best >= 0 and bestd < TH:
        clusters[best][1].append(i)
        assign[i] = best
    else:
        assign[i] = len(clusters)
        clusters.append((M[i].copy(), [i]))
print('clusters', len(clusters))

pos = [(r, c) for r in range(21) for c in range(50) if G[r, c] is not None]
idx2pos = {i: p for i, p in enumerate(pos)}
pos_index = {p: i for i, p in enumerate(pos)}

# голоса по кластеру
cl_labels = []
for k, (cent, mem) in enumerate(clusters):
    v3 = Counter(); ve = Counter(); cs = []
    for i in mem:
        r, c = idx2pos[i]
        v3[grid3[r][c]] += 1
        ve[ext[r][c]] += 1
        if conf3: cs.append(float(conf3[r][c]))
    cl_labels.append({'k': int(k), 'n': len(mem), 'ocr3': dict(v3), 'ext': dict(ve),
                      'mean_conf': (sum(cs) / len(cs)) if cs else None, 'members': [[int(idx2pos[i][0]), int(idx2pos[i][1])] for i in mem]})

# итоговая сетка: мажоритарный глиф-кластер -> сумма голосов ocr3+ext, при равенстве — ext (ручная)
final = []
conflicts = []
for r in range(21):
    line = ''
    for c in range(50):
        g = G[r, c]
        if g is None:
            line += '?'; continue
        k = int(assign[pos_index[(r, c)]])
        lab = cl_labels[k]
        votes = Counter()
        for ch, n in lab['ocr3'].items(): votes[ch] += n
        for ch, n in lab['ext'].items(): votes[ch] += n + 0.5  # вес ручной транскрипции чуть выше
        ch = max(votes.items(), key=lambda t: (t[1], t[0]))[0]
        line += ch
        if ch != grid3[r][c] or ch != ext[r][c]:
            conflicts.append({'r': r, 'c': c, 'ocr3': grid3[r][c], 'ext': ext[r][c], 'final': ch,
                              'cluster': int(k), 'cluster_n': lab['n'], 'votes': dict(votes)})
    final.append(line)

same3 = sum(1 for r in range(21) for c in range(50) if final[r][c] == grid3[r][c])
sameE = sum(1 for r in range(21) for c in range(50) if final[r][c] == ext[r][c])
print(f'stable vs ocr3: {same3}/1050 ({100*same3/1050:.1f}%)  vs ext: {sameE}/1050 ({100*sameE/1050:.1f}%)')
json.dump({'grid': [list(x) for x in final], 'rows': 21, 'cols': 50,
           'n_clusters': len(clusters),
           'agreement_ocr3': same3 / 1050, 'agreement_ext': sameE / 1050},
          open(OUT, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
json.dump({'conflicts': conflicts, 'cluster_labels': cl_labels},
          open(OUTD, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('conflicts', len(conflicts))
for x in conflicts[:35]: print(x['r'], x['c'], x['ocr3'], '->', x['ext'], '=>', x['final'], 'cl', x['cluster'], 'n', x['cluster_n'])
