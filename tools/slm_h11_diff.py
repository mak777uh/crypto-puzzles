# -*- coding: utf-8 -*-
"""SLM H11, фаза 3: что автор УДАЛИЛ из публичных страниц.

Сравнивает старые (rev 2/3) версии 21 публичных страниц, полученные в H11, с их
текущими (rev 4) версиями из data/h2d_public/ — по читаемым строкам. Цель: найти
текст подсказки, который был в прошлом и исчез (такой текст больше нигде не доступен).
Работает только с локальными файлами, сети не трогает.
"""
import gzip
import io
import json
import os
import re
import sys
import time

MASTER = r"C:\Users\Admin\OneDrive\Desktop\master"
PDIR = os.path.join(MASTER, "puzzles", "smith-lyle-moore-hunt-2-0-032btc", "data")
OLD = os.path.join(PDIR, "h11_gaterefs")
NEW = os.path.join(PDIR, "h2d_public")
PM = json.load(io.open(os.path.join(PDIR, "h2c_pagemap.json"), encoding="utf-8"))

HTML_TAG = re.compile(r"(?is)<[^>]+>")
WS = re.compile(r"\s+")


def readable_strings(path):
    raw = io.open(path, "rb").read()
    if raw[:2] == b"\x1f\x8b":
        raw = gzip.decompress(raw)
    txt = raw.decode("utf-8", "replace")
    vals = []
    for m in re.finditer(r'"text"\s*:\s*"((?:[^"\\]|\\.)*)"', txt):
        vals.append(m.group(1))
    for m in re.finditer(r'"(?:title|altText|caption|label|description)"\s*:\s*"((?:[^"\\]|\\.)*)"', txt):
        vals.append(m.group(1))
    out = []
    for v in vals:
        v = v.encode().decode("unicode_escape", "replace")
        v = HTML_TAG.sub(" ", v)
        v = (v.replace("&nbsp;", " ").replace("&amp;", "&").replace("&#39;", "'")
              .replace("&rsquo;", "'").replace("&ldquo;", '"').replace("&rdquo;", '"'))
        v = WS.sub(" ", v).strip()
        if len(v) >= 4:
            out.append(v)
    uniq = []
    seen = set()
    for v in out:
        k = v.lower()
        if k not in seen:
            seen.add(k)
            uniq.append(v)
    return uniq, len(raw)


# старые файлы → slug
old_by_slug = {}
for fn in sorted(os.listdir(OLD)):
    if not fn.endswith(".json.z"):
        continue
    o, s = readable_strings(os.path.join(OLD, fn))
    slug = None
    for m in re.finditer(r'"pageUriSEO"\s*:\s*"([^"]+)"', io.open(os.path.join(OLD, fn), encoding="utf-8", errors="replace").read()):
        slug = m.group(1)
        break
    old_by_slug[slug or fn] = (fn, o)

lines = ["# SLM H11 фаза 3 — старый vs текущий текст публичных страниц (%s UTC)"
         % time.strftime("%Y-%m-%d %H:%M", time.gmtime())]
# новые файлы лежат как <pageId>.json
new_by_slug = {}
for pid, meta in PM.items():
    p = os.path.join(NEW, pid + ".json")
    if os.path.exists(p):
        o, n = readable_strings(p)
        new_by_slug[meta.get("seo") or pid] = (pid, o)

common = sorted(set(old_by_slug) & set(new_by_slug))
lines.append("сопоставлено slug'ами: %d (старых %d, новых %d)" % (len(common), len(old_by_slug), len(new_by_slug)))
gone_total, new_total = 0, 0
for slug in common:
    of, ov = old_by_slug[slug]
    nf, nv = new_by_slug[slug]
    a = set(x.lower() for x in ov)
    b = set(x.lower() for x in nv)
    gone = [x for x in ov if x.lower() in a - b]
    added = [x for x in nv if x.lower() in b - a]
    gone_total += len(gone)
    new_total += len(added)
    lines.append("\n## %s  (старый %s → новый id %s): удалено строк %d, добавлено %d"
                 % (slug, of, nf, len(gone), len(added)))
    for g in gone[:25]:
        lines.append("   БЫЛО И ПРОПАЛО: " + g[:400])
    for g in added[:12]:
        lines.append("   НОВОЕ: " + g[:300])

# страницы, которых нет в текущем списке (автор убрал совсем)
only_old = sorted(set(old_by_slug) - set(new_by_slug))
lines.append("\n## старые страницы, которых нет среди текущих публичных: %s" % ", ".join(only_old))
for slug in only_old:
    of, ov = old_by_slug[slug]
    lines.append("   ### %s (%s)" % (slug, of))
    for t in ov[:40]:
        lines.append("      | " + t[:400])

lines.append("\nИТОГО: удалено читаемых строк %d, добавлено %d." % (gone_total, new_total))
text = "\n".join(lines) + "\n"
sys.stdout.write(text[:55000])
fd, tmp = __import__("tempfile").mkstemp(dir=OLD, suffix=".tmp")
with io.open(fd, "w", encoding="utf-8") as f:
    f.write(text)
os.replace(tmp, os.path.join(OLD, "DIFF_old_vs_new.md"))
