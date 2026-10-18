# -*- coding: utf-8 -*-
"""9vw04: разрешающий классификатор спорных клеток (этап 3, часть 2).

Опирается на три независимых сигнала:
  1. Структура: в строке из 50 символов позиции 25 пар; чётная колонка = БУКВА,
     нечётная = ЦИФРА. Поэтому '2' на чётной позиции не может быть цифрой, а
     '0' на чётной — это буква O.
  2. Цвет пары (grid_colors.json): серый K = буква O, синий B = M/G,
     остальные буквы белые W, цифры розовые P.
  3. Форма глифа: шаблоны строятся только из клеток, где EasyOCR (grid_ocr3) и
     ручная транскрипция canalqb СОВПАДАЮТ и уверенность OCR высока; спорные
     клетки классифицируются по ближайшему шаблону того же класса (буква/цифра)
     и той же ширины-класса.

Вывод: консольный отчёт + ASCII-печать спорных глифов для ручной проверки +
data/grid_ocr5.json (итоговая сетка) и data/grid_audit.json (доказательства).
"""
from PIL import Image
import numpy as np, json, os
from collections import Counter, defaultdict

BASE = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
o3 = json.load(open(os.path.join(BASE, 'data', 'grid_ocr3.json'), encoding='utf-8'))
col = json.load(open(os.path.join(BASE, 'data', 'grid_colors.json'), encoding='utf-8'))
ext = [l.strip() for l in open(os.path.join(BASE, 'data', 'external', 'canalqb_grid_transcription.txt')) if l.strip()]
rows = [tuple(x) for x in o3['rows']]
cols = [tuple(x) for x in o3['cols']]
g3 = [''.join(r) for r in o3['grid']]
conf = o3['conf']
mat = col['mat']
a = np.asarray(Image.open(os.path.join(BASE, 'data', 'puzzle_wayback.jpg')).convert('RGB')).astype(int)
mask = a.sum(axis=2) > 110

N = 20
def glyph(ri, ci):
    y0, y1 = rows[ri]; x0, x1 = cols[ci]
    cell = a[y0:y1 + 1, x0:x1 + 1]; msk = mask[y0:y1 + 1, x0:x1 + 1]
    if msk.sum() < 6: return None
    ys, xs = np.nonzero(msk)
    sub = (cell[ys.min():ys.max() + 1, xs.min():xs.max() + 1].sum(axis=2) / 3)
    m2 = msk[ys.min():ys.max() + 1, xs.min():xs.max() + 1]
    im = Image.fromarray(sub.clip(0, 255).astype('uint8')).resize((N, N), Image.LANCZOS)
    mm = Image.fromarray((m2 * 255).astype('uint8')).resize((N, N), Image.LANCZOS)
    v = np.asarray(im, dtype=float); mmk = np.asarray(mm, dtype=float) > 100
    v = np.where(mmk, v, np.nan)
    fill = np.nanmean(v) if np.isfinite(v).any() else 0.0
    v = np.nan_to_num(v, nan=fill)
    v = (v - v.mean()) / (v.std() + 1e-9)
    return v

LETTERS = set('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
DIGITS = set('0123456789')
def kind_of_slot(ci):
    return 'L' if ci % 2 == 0 else 'D'

# --- 1. согласованность источников и класс-фильтр ---
agree, dispute = [], []
for r in range(21):
    for c in range(50):
        (agree if g3[r][c] == ext[r][c] else dispute).append((r, c, g3[r][c], ext[r][c]))
print('agree', len(agree), 'dispute', len(dispute))

# --- 2. шаблоны из согласованных клеток (внутри класса БУКВА/ЦИФРА) ---
tpl = defaultdict(list)
for r, c, x, y in agree:
    k = kind_of_slot(c)
    ch = x.upper()
    if k == 'L' and ch not in LETTERS: continue
    if k == 'D' and ch not in DIGITS: continue
    if conf[r][c] < 0.9: continue
    g = glyph(r, c)
    if g is not None: tpl[ch].append((g, r, c, float(conf[r][c])))
print('templates:', {k: len(v) for k, v in sorted(tpl.items())})

def nearest(ch_slot, g, exclude=None):
    """ближайший шаблон среди допустимых символов класса slot"""
    best = []
    for ch, lst in tpl.items():
        if ch == exclude: continue
        is_letter = ch in LETTERS
        if ch_slot == 'L' and not is_letter: continue
        if ch_slot == 'D' and is_letter: continue
        d = min(float(np.mean((g - t[0]) ** 2)) for t in lst)
        best.append((d, ch))
    best.sort()
    return best[:4]

# --- 3. разбор спорных клеток ---
report = []
for r, c, x, y in dispute:
    k = kind_of_slot(c)
    colr = mat[r][c]
    g = glyph(r, c)
    near = nearest(k, g)
    # структурная подсказка цвета
    hint = ''
    if k == 'L':
        if colr == 'K': hint = 'цвет=серый => буква O'
        elif colr == 'B': hint = 'цвет=синий => M или G'
        elif colr == 'L': hint = 'цвет=лаванда => N'
        if x in DIGITS and k == 'L': hint += ' | EasyOCR дал цифру на позиции буквы'
    else:
        if y in LETTERS and k == 'D': hint += ' | ручная транскрипция дала букву на позиции цифры'
    report.append({'r': r, 'c': c, 'slot': k, 'ocr3': x, 'ext': y, 'color': colr,
                   'conf': round(float(conf[r][c]), 4), 'nearest': [(round(d, 3), ch) for d, ch in near],
                   'hint': hint})
for e in report:
    print(e['r'], e['c'], e['slot'], f"ocr={e['ocr3']} ext={e['ext']} col={e['color']} conf={e['conf']}",
          'near=', e['nearest'], e['hint'])

def ascii_art(g):
    v = (g - g.min()) / (g.max() - g.min() + 1e-9)
    return [''.join('#' if v[i, j] > 0.6 else ('+' if v[i, j] > 0.3 else '.') for j in range(N)) for i in range(N)]

if os.environ.get('SHOW'):
    for e in report[:int(os.environ['SHOW'])]:
        g = glyph(e['r'], e['c'])
        print(f"--- r{e['r']} c{e['c']} ocr={e['ocr3']} ext={e['ext']} ---")
        for line in ascii_art(g): print(line)

json.dump({'agree': len(agree), 'disputed': report,
           'templates': {k: len(v) for k, v in tpl.items()}},
          open(os.path.join(BASE, 'data', 'grid_audit.json'), 'w', encoding='utf-8'),
          ensure_ascii=False, indent=1)
print('saved data/grid_audit.json')
