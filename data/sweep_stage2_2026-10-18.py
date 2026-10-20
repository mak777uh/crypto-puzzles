# -*- coding: utf-8 -*-
"""Этап 2: досье по списку slug'ов (README 45 строк + LOG 12 строк). Big Pickle."""
import os
import sys

M = r'C:\Users\Admin\OneDrive\Desktop\master'
OUT = os.environ.get('SWEEP_OUT') or os.path.join(M, 'data', 'sweep_stage2_2026-10-18.txt')
slugs = sys.argv[1:]
buf = []
for s in slugs:
    p = os.path.join(M, 'puzzles', s)
    if not os.path.isdir(p):
        p = os.path.join(M, 'solved', s)
    buf.append('=' * 100)
    buf.append('### %s' % s)
    rd = os.path.join(p, 'README.md')
    if os.path.exists(rd):
        t = open(rd, encoding='utf-8', errors='replace').read().splitlines()
        buf.append('--- README (первые 45 строк из %d) ---' % len(t))
        buf.extend(t[:45])
    lg = os.path.join(p, 'LOG.md')
    if os.path.exists(lg):
        t = open(lg, encoding='utf-8', errors='replace').read().splitlines()
        buf.append('--- LOG (последние 12 строк из %d) ---' % len(t))
        buf.extend(t[-12:])
    # список файлов данных (топ-25 по размеру)
    fs = []
    for r, d, f in os.walk(p):
        for x in f:
            fp = os.path.join(r, x)
            try:
                fs.append((os.path.getsize(fp), os.path.relpath(fp, p)))
            except OSError:
                pass
    fs.sort(reverse=True)
    buf.append('--- файлы (топ-15 по размеру) ---')
    for sz, rel in fs[:15]:
        buf.append('   %9d  %s' % (sz, rel))
    buf.append('')
open(OUT, 'w', encoding='utf-8').write('\n'.join(buf) + '\n')
print('slugs: %d, строк: %d' % (len(slugs), len(buf)))
print('файл: %s' % OUT)
