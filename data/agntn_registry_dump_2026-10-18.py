# -*- coding: utf-8 -*-
"""Разбор npm-пакета @agntn/puzzles: какие загадки есть в реестре, что unsolved и с каким призом.
Big Pickle, 2026-10-18. Только чтение."""
import os
import re
import tarfile

TGZ = r'C:\Users\Admin\OneDrive\Desktop\master\_sources\external_catalogs_2026-10-18\agntn-puzzles.tgz'
OUT = r'C:\Users\Admin\OneDrive\Desktop\master\data\agntn_registry_dump_2026-10-18.txt'

tf = tarfile.open(TGZ, 'r:gz')
cols = [n for n in tf.getnames() if re.match(r'package/dist/collections/[^/]+\.mjs$', n)]
buf = []
tot = 0
open_prize = 0.0
for n in sorted(cols):
    t = tf.extractfile(n).read().decode('utf-8', 'replace')
    ids = re.findall(r'id:\s*"([^"]+)"', t)
    sts = re.findall(r'status:\s*([A-Za-z0-9_.]+)', t)
    prz = re.findall(r'prize:\s*([0-9.]+)', t)
    ch = re.findall(r'chain:\s*"([^"]+)"', t)
    ad = re.findall(r'address:\s*"([^"]+)"', t)
    name = os.path.basename(n)[:-4]
    op = sum(1 for s in sts if s.endswith('Unsolved'))
    op_prize = 0.0
    # грубая оценка: призы unsolved-записей = все призы минус solved/claimed/expired (позиционно)
    for i, s in enumerate(sts):
        if s.endswith('Unsolved') and i < len(prz):
            try:
                op_prize += float(prz[i])
            except ValueError:
                pass
    tot += op
    open_prize += op_prize
    buf.append('%-26s rec=%-3d unsolved=%-3d open_prize~%-12.4f chains=%s ids=%s' % (
        name, len(ids), op, op_prize, ','.join(sorted(set(ch))), ','.join(ids[:5])))
buf.append('')
buf.append('ИТОГО записей unsolved: %d, суммарный открытый приз ~%.4f' % (tot, open_prize))
open(OUT, 'w', encoding='utf-8').write('\n'.join(buf) + '\n')
print('\n'.join(buf))
print('файл: %s' % OUT)
