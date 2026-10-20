# -*- coding: utf-8 -*-
"""Pretty-dump любой Wix page JSON: все строковые значения по ключам-подсказкам,
все ссылки на ассеты (144728_<hash> и внешние URL), полная дерево-выжимка.

Использование: python tools/wix_page_dump.py <файл.json> [ещё файл...]
"""
import io
import json
import os
import re
import sys

TXT_KEYS = {"text", "title", "altText", "caption", "description", "label",
            "buttonText", "placeholder", "name", "fileName", "siteTitle",
            "pageUriSEO", "uriSEO", "url", "link", "href", "value", "content",
            "seoMeta", "metaTitle", "metaDescription", "mobileTitle"}
ASSET_RE = re.compile(r"144728_[0-9a-f]{32}")
URL_RE = re.compile(r"https?://[^\s\"'<>)\\]{6,200}")


def walk(node, path=""):
    if isinstance(node, dict):
        for k, v in node.items():
            for r in walk(v, path + "/" + str(k)):
                yield r
    elif isinstance(node, list):
        for i, v in enumerate(node):
            for r in walk(v, path + "/[%d]" % i):
                yield r
    elif isinstance(node, str):
        yield path, node


def dump(path):
    s = io.open(path, encoding="utf-8", errors="replace").read()
    print("=" * 78)
    print(os.path.basename(path), "(%d B)" % len(s))
    try:
        d = json.loads(s)
    except Exception as e:
        print("  не JSON:", e)
        return
    print("  top keys:", list(d) if isinstance(d, dict) else type(d))
    for k in ("title", "pageUriSEO", "uriSEO", "mobileTitle"):
        if isinstance(d, dict) and d.get(k):
            print("  %s = %r" % (k, d[k]))
    print("  --- строки (ключ -> значение) ---")
    shown = set()
    for p, v in walk(d):
        key = p.rsplit("/", 1)[-1]
        if key in TXT_KEYS and v.strip():
            t = re.sub(r"<[^>]+>", " ", v)
            t = re.sub(r"\s+", " ", t).strip()
            if not t or len(t) < 2:
                continue
            sig = (key, t[:120])
            if sig in shown:
                continue
            shown.add(sig)
            print("  %-14s | %s" % (key[:14], t[:200]))
    print("  --- ассеты сайта ---")
    for a in sorted(set(ASSET_RE.findall(s))):
        print("   ", a)
    print("  --- внешние URL ---")
    for u in sorted(set(URL_RE.findall(s)))[:40]:
        print("   ", u[:190])


def main():
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    for p in sys.argv[1:]:
        dump(p)
    return 0


if __name__ == "__main__":
    sys.exit(main())
