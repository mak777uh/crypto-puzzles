# -*- coding: utf-8 -*-
"""Этап 3: компактное досье (README 22 строки + 3 строки LOG + 6 файлов). Big Pickle."""
import os
import sys

M = r'C:\Users\Admin\OneDrive\Desktop\master'
OUT = sys.argv[1]
slugs = sys.argv[2:]
buf = []
for s in slugs:
    p = os.path.join(M, 'puzzles', s)
    if not os.path.isdir(p):
        p = os.path.join(M, 'solved', s)
    if not os.path.isdir(p):
        buf.append('### %s  [ПАПКА НЕ НАЙДЕНА]' % s)
        buf.append('')
        continue
    buf.append('=' * 90)
    buf.append('### %s' % s)
    rd = os.path.join(p, 'README.md')
    if os.path.exists(rd):
        t = open(rd, encoding='utf-8', errors='replace').read().splitlines()
        buf.extend([x for x in t[:24] if x.strip()])
        if len(t) > 24:
            buf.append('    ...(README всего %d строк)' % len(t))
    else:
        buf.append('    [нет README.md]')
    lg = os.path.join(p, 'LOG.md')
    if os.path.exists(lg):
        t = [x.strip()[:170] for x in open(lg, encoding='utf-8', errors='replace').read().splitlines() if x.strip()]
        buf.append('    LOG(%d строк) хвост:' % len(t))
        for x in t[-4:]:
            buf.append('      | ' + x)
    fs = []
    for r, d, f in os.walk(p):
        for x in f:
            fp = os.path.join(r, x)
            try:
                fs.append((os.path.getsize(fp), os.path.relpath(fp, p)))
            except OSError:
                pass
    fs.sort(reverse=True)
    buf.append('    файлы(%d): %s' % (len(fs), '; '.join('%s(%d)' % (rel, sz) for sz, rel in fs[:6])))
    buf.append('')
open(OUT, 'w', encoding='utf-8').write('\n'.join(buf) + '\n')
print('slugs: %d, строк: %d → %s' % (len(slugs), len(buf), OUT))
