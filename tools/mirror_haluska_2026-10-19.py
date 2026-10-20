#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Зеркало первоисточника серии Zden: https://crypto.haluska.sk/

Контекст: с этой машины сайт был недоступен (TCP-таймаут) до 2026-10-19 19:16 UTC,
когда Илья дал VPN-подписку; через локальный HTTP-прокси Xray сайт отвечает 200
(Last-Modified: Sat, 10 Oct 2026 17:44:22 GMT). Это единственный легальный способ
получить страницы/подсказки/ассеты серии, которые раньше брали только из Wayback.

Только GET. Ничего не публикует, никуда не пишет ключей, транзакций не делает.
Прокси берётся из окружения HTTPS_PROXY (секретов в файле нет).
Выход: `_sources/haluska_site_2026-10-19/` (файлы + MANIFEST.md с sha256).

Запуск:  python tools/mirror_haluska_2026-10-19.py [--depth 1]
"""
import hashlib
import html.parser
import json
import os
import re
import sys
import urllib.parse
import urllib.request
from datetime import datetime, timezone

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "_sources", "haluska_site_2026-10-19")
BASE = "https://crypto.haluska.sk/"
PROXY = os.environ.get("HTTPS_PROXY") or os.environ.get("HTTP_PROXY") or ""
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) catalog-mirror/1.0"


def opener():
    if PROXY:
        h = urllib.request.ProxyHandler({"http": PROXY, "https": PROXY})
        return urllib.request.build_opener(h)
    return urllib.request.build_opener()


OP = opener()


def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with OP.open(req, timeout=40) as r:
        return r.read(), dict(r.headers), r.geturl()


def atomic(path, data: bytes):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    fd, tmp = os._mkstemp_compat() if hasattr(os, "_mkstemp_compat") else __import__("tempfile").mkstemp(
        dir=os.path.dirname(path), suffix=".part")
    try:
        with os.fdopen(fd, "wb") as f:
            f.write(data)
        os.replace(tmp, path)
    except BaseException:
        if os.path.exists(tmp):
            os.unlink(tmp)
        raise


class Links(html.parser.HTMLParser):
    def __init__(self):
        super().__init__()
        self.hrefs, self.srcs = set(), set()

    def handle_starttag(self, tag, attrs):
        d = dict(attrs)
        if tag == "a" and d.get("href"):
            self.hrefs.add(d["href"])
        if tag in ("img", "script", "source", "iframe") and d.get("src"):
            self.srcs.add(d["src"])
        if tag == "link" and d.get("href"):
            self.srcs.add(d["href"])


def same_origin(url):
    u = urllib.parse.urljoin(BASE, url)
    p = urllib.parse.urlparse(u)
    return p.netloc in ("crypto.haluska.sk", "www.crypto.haluska.sk") and p.scheme in ("http", "https")


def main():
    now = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%MZ")
    seen, manifest, errors = set(), [], []
    queue = [BASE, BASE + "index_old.html"]
    htmls = {}
    while queue:
        url = queue.pop(0)
        norm = url.split("#")[0]
        if norm in seen:
            continue
        seen.add(norm)
        try:
            body, hdr, final = fetch(norm)
        except Exception as e:
            errors.append((norm, "%s: %s" % (type(e).__name__, e)))
            continue
        rel = urllib.parse.urlparse(norm).path.lstrip("/").replace("/", "_") or "index.html"
        if not rel.lower().endswith((".html", ".htm", ".zip", ".svg", ".png", ".jpg", ".gif", ".txt", ".ico")):
            rel += ".html" if "text/html" in hdr.get("Content-Type", "") else ".bin"
        path = os.path.join(OUT, rel)
        atomic(path, body)
        manifest.append({
            "url": norm, "file": rel, "bytes": len(body),
            "sha256": hashlib.sha256(body).hexdigest(),
            "content_type": hdr.get("Content-Type", ""),
            "last_modified": hdr.get("Last-Modified", ""),
        })
        print("OK  %-6s %8d  %s" % (hdr.get("Content-Length", "?"), len(body), norm), flush=True)
        if "text/html" in hdr.get("Content-Type", ""):
            htmls[rel] = body.decode("utf-8", "replace")
            p = Links()
            try:
                p.feed(htmls[rel])
            except Exception:
                pass
            for cand in sorted(p.hrefs | p.srcs):
                if not same_origin(cand):
                    continue
                u = urllib.parse.urljoin(norm, cand)
                if u.split("#")[0] not in seen:
                    queue.append(u)
    atomic(os.path.join(OUT, "_mirror.json"),
           json.dumps({"checked_utc": now, "proxy": bool(PROXY), "files": manifest,
                       "errors": errors}, ensure_ascii=False, indent=1).encode())
    lines = ["# Зеркало crypto.haluska.sk — снято 2026-10-19 через VPN-прокси", "",
             "Взятие: только GET; прокси из `HTTPS_PROXY`; исходный хост с этой машины ранее недоступен.",
             "Снято %d файлов, ошибок %d. Заголовок главной страницы: %s" % (
                 len(manifest), len(errors), next((m["last_modified"] for m in manifest
                                                   if m["file"] in ("index.html", "index_")), "") or ""), "",
             "| файл | байт | sha256 | Last-Modified |", "|---|---|---|---|"]
    for m in sorted(manifest, key=lambda x: x["file"]):
        lines.append("| `%s` | %d | `%s` | %s |" % (m["file"], m["bytes"], m["sha256"][:16], m["last_modified"]))
    if errors:
        lines += ["", "## Ошибки", ""] + ["- `%s` — %s" % (u, e) for u, e in errors]
    atomic(os.path.join(OUT, "MANIFEST.md"), "\n".join(lines).encode())
    print("\n=== файлов %d, ошибок %d ===" % (len(manifest), len(errors)))
    print("отчёт:", os.path.join(OUT, "MANIFEST.md"))


if __name__ == "__main__":
    main()
