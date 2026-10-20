# -*- coding: utf-8 -*-
"""Извлечение содержимого из Wayback-снимков Wix-страниц smithlylemoore.com.

Снимки — SPA-оболочки: видимого DOM нет, но внутри лежат JSON-блоки
(wix-warmup-data, wix-viewer-model) и ссылка pageJsonFileName на файл страницы.
Скрипт по каждому .html печатает: pageJsonFileName, id страницы, все текстовые
поля ("text": "..."), заголовки, ссылки, имя/описания компонентов.
"""
import glob
import html as H
import io
import json
import os
import re
import sys

D = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
                 "puzzles", "smith-lyle-moore-hunt-2-0-032btc", "data", "h10_wayback")

JSON_KEYS = re.compile(r'"(?:text|title|altText|caption|description|label|buttonText|placeholder|siteTitle|pageName)"\s*:\s*"((?:[^"\\]|\\.){3,500})"')
PJFN = re.compile(r'"pageJsonFileName"\s*:\s*"([^"]+)"')
SEO = re.compile(r'"pageUriSEO"\s*:\s*"([^"]*)"')
PID = re.compile(r'"pageId"\s*:\s*"([^"]+)"')
HREF = re.compile(r'"(link|url|href|hyperlink)"\s*:\s*\{[^{}]{0,300}?"url"\s*:\s*"([^"]+)"')
A_TAG = re.compile(r'<a[^>]+href="([^"]+)"', re.I)


def clean(t):
    t = t.replace("\\n", " ").replace('\\"', '"').replace("\\/", "/").replace("\\u00a0", " ")
    t = re.sub(r"<[^>]+>", " ", t)
    t = H.unescape(t)
    return re.sub(r"\s+", " ", t).strip()


def dump(path, min_len=4, max_items=40):
    s = io.open(path, encoding="utf-8", errors="replace").read()
    name = os.path.basename(path)
    out = []
    pj, seo, pid = PJFN.findall(s), SEO.findall(s), PID.findall(s)
    texts = []
    for m in JSON_KEYS.finditer(s):
        t = clean(m.group(1))
        if len(t) >= min_len and t not in texts:
            texts.append(t)
    links = sorted(set([clean(u) for _, u in HREF.findall(s)] + [clean(u) for u in A_TAG.findall(s)]))
    links = [l for l in links if not re.match(r"(?i)^(#|javascript:|mailto:)", l)][:25]
    out.append("=" * 78)
    out.append("%s  (%d B)" % (name, len(s)))
    out.append("  pageJsonFileName: %s | pageId: %s | seo: %s"
               % (sorted(set(pj)) or "-", sorted(set(pid))[:2], sorted(set(seo))[:2] or "-"))
    out.append("  текстовых полей: %d" % len(texts))
    for t in texts[:max_items]:
        out.append("    TXT | %s" % t[:220])
    if links:
        out.append("  ссылки:")
        for l in links:
            out.append("    URL | %s" % l[:180])
    return "\n".join(out)


def main():
    pats = sys.argv[1:] or ["*"]
    files = []
    for p in pats:
        files += glob.glob(os.path.join(D, "*" + p + "*.html"))
    for f in sorted(set(files)):
        print(dump(f))
    return 0


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    sys.exit(main())
