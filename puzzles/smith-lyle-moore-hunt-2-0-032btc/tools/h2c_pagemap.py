# -*- coding: utf-8 -*-
"""H2c-3: публичный навигационный JSON Wix (pageId -> title, pageUriSEO) по ВСЕМ страницам,
включая запертые. Это метаданные роутера (лежат в HTML любой страницы сайта), а не контент
запертых страниц: текст загадок/бутылок отсюда не читается.

Зачем: у 4 из 11 запертых страниц (y756h /a, leklh /b, xjnxo /c, vy58x /d) и у zhgsm/jcl9c
мы не знаем ни заголовка, ни SEO-slug — только pid. Заголовок/slug — это часть авторской
подсказки (паттерн сайта: slug = каламбур-указатель, ср. havingfunwiththeurl-ilovedthisshowasakid,
hereonnnnngiligansissssssland). Прогон бесплатный, перебором не является.
"""
from __future__ import annotations

import html
import json
import re
from pathlib import Path

D = Path(__file__).resolve().parents[1]
CACHE = D / "data" / "h2c_cache"
OUT = D / "data" / "h2c_pagemap.json"
LOCKED = {"zhgsm", "jcl9c", "y6cd1", "sodpq", "fibyo", "tt6yc",
          "y756h", "leklh", "xjnxo", "vy58x", "jbuh5"}


def extract(s: str):
    out = {}
    for m in re.finditer(r'"pageId"\s*:\s*"([a-z0-9]{5})"', s):
        pid = m.group(1)
        seg = s[m.end():m.end() + 400]
        t = re.search(r'"title"\s*:\s*"((?:[^"\\]|\\.)*)"', seg)
        u = re.search(r'"pageUriSEO"\s*:\s*"((?:[^"\\]|\\.)*)"', seg)
        if t or u:
            out.setdefault(pid, (
                html.unescape(json.loads('"%s"' % t.group(1)) if t else ""),
                json.loads('"%s"' % u.group(1)) if u else ""))
    return out


def main():
    allp = {}
    for p in sorted(CACHE.glob("*.html")):
        d = extract(p.read_text("latin-1", "ignore"))
        for k, v in d.items():
            allp.setdefault(k, v)
    print("страниц с title/SEO извлечено:", len(allp))
    OUT.write_text(json.dumps({k: {"title": v[0], "seo": v[1]}
                               for k, v in sorted(allp.items())},
                              ensure_ascii=False, indent=1), encoding="utf-8")
    for pid in sorted(allp, key=lambda x: (x not in LOCKED, x)):
        t, u = allp[pid]
        print("%s %-6s | %-28s | %s" % ("*" if pid in LOCKED else " ", pid, t[:28], u[:70]))


if __name__ == "__main__":
    main()
