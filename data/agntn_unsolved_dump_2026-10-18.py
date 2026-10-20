# -*- coding: utf-8 -*-
"""Разбор npm-пакета @agntn/puzzles: записи без status: = unsolved (по устройству библиотеки).
Выдаёт: коллекция → список НЕрешённых записей с призом/адресом/цепью. Только чтение. Big Pickle."""
import os
import re
import tarfile

TGZ = r'C:\Users\Admin\OneDrive\Desktop\master\_sources\external_catalogs_2026-10-18\agntn-puzzles.tgz'
OUT = r'C:\Users\Admin\OneDrive\Desktop\master\data\agntn_unsolved_dump_2026-10-18.txt'

tf = tarfile.open(TGZ, 'r:gz')
cols = [n for n in tf.getnames() if re.match(r'package/dist/collections/[^/]+\.mjs$', n)]
buf = []
grand = 0.0
n_open = 0
for n in sorted(cols):
    t = tf.extractfile(n).read().decode('utf-8', 'replace')
    name = os.path.basename(n)[:-4]
    blocks = re.split(r'puzzle\(\{', t)[1:]
    openrec = []
    for b in blocks:
        b = b.split('\n});')[0]
        m_id = re.search(r'id:\s*"([^"]+)"', b)
        if not m_id:
            continue
        has_status = 'status:' in b
        if has_status:
            continue
        pid = m_id.group(1)
        m_pr = re.search(r'prize:\s*([0-9.eE+-]+)', b)
        m_ch = re.search(r'chain:\s*"([^"]+)"', b)
        m_ad = re.search(r'address:\s*"([^"]+)"', b)
        m_key = re.search(r'key:\s*([^\n]+)', b)
        pr = float(m_pr.group(1)) if m_pr else 0.0
        openrec.append((pid, pr, m_ch.group(1) if m_ch else '?',
                        m_ad.group(1) if m_ad else '-', (m_key.group(1)[:70] if m_key else '-')))
    if openrec:
        n_open += len(openrec)
        s = sum(x[1] for x in openrec)
        grand += s
        buf.append('### %s  (открыто %d, суммарный приз ~%.6f)' % (name, len(openrec), s))
        for pid, pr, ch, ad, key in openrec:
            buf.append('    %-34s %-10s prize=%-16g %s' % (pid, ch, pr, ad))
            if key != '-':
                buf.append('        key: %s' % key)
buf.append('')
buf.append('ИТОГО открытых записей: %d, суммарный приз ~%.4f' % (n_open, grand))
open(OUT, 'w', encoding='utf-8').write('\n'.join(buf) + '\n')
print('\n'.join(buf))
