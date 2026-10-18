# -*- coding: utf-8 -*-
"""9vw04: итоговая сетка grid_ocr5.json (этап 3, финал).

Правила разрешения (обоснование — data/grid_audit.json и LOG):
  1. Slot-инвариант: чётная колонка = БУКВА, нечётная = ЦИФРА (нарушений среди
     1021 согласованных клеток нет, кроме серых «0» в буквенных слотах).
  2. Согласованные «0» в чётных колонках (20 шт., все цвет=серий K, диагональ)
     -> буква O (в base58 WIF цифры 0 нет; серый цвет = спец-диагональ O).
  3. Спорные «2»(ocr) vs «Z»(ext) в чётных колонках (17 шт., диагональ, форма
     глифа не совпадает ни с одним шаблоном, ближайшая — 1.2) -> Z: буква,
     устойчиво читаемая OCR как 2 (Z↔2), ручная транскрипция = Z.
  4. Прочие споры (ряд 14 цифры, r15c33, r16c47, r17c30): берём ocr3 —
     расстояние до своего шаблона <=0.21 при conf>=0.48..1.0, ручная
     транскрипция canalqb в этих местах смещена на пару.
"""
import json, os
from collections import Counter

BASE = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
o3 = json.load(open(os.path.join(BASE, 'data', 'grid_ocr3.json'), encoding='utf-8'))
ext = [l.strip() for l in open(os.path.join(BASE, 'data', 'external', 'canalqb_grid_transcription.txt')) if l.strip()]
col = json.load(open(os.path.join(BASE, 'data', 'grid_colors.json'), encoding='utf-8'))
mat = col['mat']
g3 = [''.join(r) for r in o3['grid']]
L = set('ABCDEFGHIJKLMNOPQRSTUVWXYZ'); D = set('0123456789')

final = []
changes = Counter()
for r in range(21):
    out = []
    for c in range(50):
        x, y = g3[r][c], ext[r][c]
        slot = 'L' if c % 2 == 0 else 'D'
        if x == y:
            ch = x
        elif slot == 'L' and x == '2' and y == 'Z':
            ch = 'Z'; changes['ocr2->Z'] += 1
        else:
            ch = x; changes['ocr3>ext'] += 1
        if slot == 'L' and ch == '0':
            ch = 'O'; changes['0->O'] += 1
        # контрольные классы
        ok = (ch in L) if slot == 'L' else (ch in D)
        if not ok:
            raise SystemExit(f'НЕКОНАЛО slot: r{r} c{c} = {ch!r}')
        out.append(ch)
    final.append(''.join(out))

for i, l in enumerate(final):
    print(f'{i:2d} ' + l)
print('changes:', dict(changes))

# закон сдвига: буквы строки r == буквы строки r-1, сдвинутые на 1 пару
letters = [l[::2] for l in final]
digits = [l[1::2] for l in final]
shift_ok = sum(1 for r in range(1, 21) if letters[r][1:] == letters[r - 1][:-1])
print(f'сдвиг букв на 1 пару между строками: {shift_ok}/20')
for r in range(1, 21):
    if letters[r][1:] != letters[r - 1][:-1]:
        print('  нарушение r', r, letters[r - 1], '->', letters[r])

heads = ''.join(l[0] for l in final)
print('головы строк:', heads)

json.dump({'grid': final, 'source': 'grid_ocr5 (ocr3+ext+шаблоны+цвет)',
           'rows': o3['rows'], 'cols': o3['cols'],
           'changes': dict(changes),
           'letter_shift_rows_ok': f'{shift_ok}/20'},
          open(os.path.join(BASE, 'data', 'grid_ocr5.json'), 'w', encoding='utf-8'),
          ensure_ascii=False, indent=1)
print('saved data/grid_ocr5.json')
