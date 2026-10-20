# -*- coding: utf-8 -*-
"""Этап 1: компактная шапка по всем папкам задач (Big Pickle, 2026-10-18).

Для каждой папки: число файлов/байт, приз (regex), первая строка README, последние строки LOG,
слова-маркеры статуса. Пишет data/sweep_stage1_2026-10-18.txt
"""
import os
import re
import sys

M = r'C:\Users\Admin\OneDrive\Desktop\master'
OUT = os.path.join(M, 'data', 'sweep_stage1_2026-10-18.txt')

ZRE = re.compile(r'(\d[\d\s.,]*)\s*(BTC|ETH|LTC|ADA|AR|sat|sats|satoshis|ksi|WAVES|DASH|DOGE|XRP)',
                 re.I)
KW = re.compile(r'(итог|статус|закрыт|решён|решен|решено|осталось|открыт|тупик|dead[- ]?end|дальше|'
                r'не решено|SOLVED|CLOSED|OPEN|DEAD)', re.I)
LONG = re.compile(r'([A-Za-z0-9_\-]{6,})')

lines = []


def w(s=''):
    lines.append(str(s))


def dossier(kind, root, name):
    p = os.path.join(root, name)
    nfiles = 0
    nbytes = 0
    for r, d, f in os.walk(p):
        for x in f:
            fp = os.path.join(r, x)
            try:
                nbytes += os.path.getsize(fp)
                nfiles += 1
            except OSError:
                pass
    rd = os.path.join(p, 'README.md')
    lg = os.path.join(p, 'LOG.md')
    rd_txt = open(rd, encoding='utf-8', errors='replace').read() if os.path.exists(rd) else ''
    lg_txt = open(lg, encoding='utf-8', errors='replace').read() if os.path.exists(lg) else ''
    head = ''
    for l in rd_txt.splitlines():
        if l.strip() and not l.startswith('#'):
            head = l.strip()[:120]
            break
    if not head:
        for l in rd_txt.splitlines():
            if l.strip():
                head = l.strip()[:120]
                break
    prize = ''
    for src in (rd_txt[:3000], lg_txt[:3000]):
        m = ZRE.search(src)
        if m:
            prize = (m.group(1).strip() + ' ' + m.group(2)).strip()
            break
    tail = [x.strip()[:150] for x in lg_txt.strip().splitlines()[-3:] if x.strip()]
    stat = []
    for src, tag in ((rd_txt, 'R'), (lg_txt, 'L')):
        for m in KW.finditer(src):
            stat.append(tag + ':' + m.group(1).lower())
    # уникализируем, оставляем 8
    seen = []
    for s in stat:
        if s not in seen:
            seen.append(s)
    w('[%s] %s  файлов=%d  %.1f МБ  приз=%s' % (kind, name, nfiles, nbytes / 1048576.0, prize or '—'))
    w('    head: %s' % head)
    if seen:
        w('    markers: %s' % ' '.join(seen[:8]))
    for t in tail:
        w('    log| %s' % t)
    w('')


roots = [(os.path.join(M, 'puzzles'), 'P'), (os.path.join(M, 'solved'), 'S'),
         (os.path.join(M, 'dead-ends-registry'), 'D')]
for root, kind in roots:
    if not os.path.isdir(root):
        continue
    for name in sorted(os.listdir(root)):
        if os.path.isdir(os.path.join(root, name)):
            dossier(kind, root, name)

open(OUT, 'w', encoding='utf-8').write('\n'.join(lines) + '\n')
print('строк: %d' % len(lines))
print('файл: %s' % OUT)
