# -*- coding: utf-8 -*-
"""
mosaics_2026-10-18.py — контактные листы (мозаики) всех кадров video 1fps.

Цель: за один взгляд на лист увидеть аномальные кадры (титульные карточки,
крупный текст, рукописное, врезки), которые OCR не выделил, и затем прочитать
их зрением в полном разрешении. Канал «текст на экране видео» — единственный
непрочитанный канал пазла (см. data/02_tested.md, раздел «What none of this
has tested», п.1).

Big Pickle, 2026-10-18. Только чтение локальных файлов.
"""
import glob
import os
import re

from PIL import Image, ImageDraw

BASE = r'C:\Users\Admin\OneDrive\Desktop\master\puzzles\guntis-vitolins-metamask-8-6eth'
SRC = os.path.join(BASE, 'data', 'frames_1fps')
OUT = os.path.join(BASE, 'data', 'mosaics')
CELL_W, CELL_H = 320, 180
COLS, ROWS = 6, 6
PER = COLS * ROWS

os.makedirs(OUT, exist_ok=True)

files = sorted(glob.glob(os.path.join(SRC, '*.jpg')),
               key=lambda p: int(re.search(r'f_(\d+)_', os.path.basename(p)).group(1)))
print('кадров:', len(files))
print('мозаик:', (len(files) + PER - 1) // PER)

made = []
for m in range((len(files) + PER - 1) // PER):
    chunk = files[m * PER:(m + 1) * PER]
    sheet = Image.new('RGB', (COLS * CELL_W, ROWS * CELL_H), (0, 0, 0))
    dr = ImageDraw.Draw(sheet)
    for i, p in enumerate(chunk):
        sec = int(re.search(r'f_\d+_(\d+)\.', os.path.basename(p)).group(1))
        try:
            im = Image.open(p).convert('RGB').resize((CELL_W, CELL_H))
        except Exception as e:
            print('  !', p, e)
            continue
        x, y = (i % COLS) * CELL_W, (i // COLS) * CELL_H
        sheet.paste(im, (x, y))
        dr.rectangle([x, y, x + 44, y + 12], fill=(0, 0, 0))
        dr.text((x + 2, y + 1), '%ds' % sec, fill=(255, 255, 0))
    op = os.path.join(OUT, 'mosaic_%02d_%d-%ds.png' % (m, int(re.search(r'f_\d+_(\d+)\.', os.path.basename(chunk[0])).group(1)),
                                                       int(re.search(r'f_\d+_(\d+)\.', os.path.basename(chunk[-1])).group(1))))
    sheet.save(op)
    made.append(op)
    print('  ', op)
print('готово:', len(made))
