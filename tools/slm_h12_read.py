# -*- coding: utf-8 -*-
"""Читаем извлечённые Wayback-снимки закрытых страниц SLM (H12) и собираем их
текст в один файл CONTENT.md. Только локальный разбор скачанных HTML."""
import json
import os
import re

BASE = r"C:\Users\Admin\OneDrive\Desktop\master\puzzles\smith-lyle-moore-hunt-2-0-032btc\data\h12_lockedurls"
res = json.load(open(os.path.join(BASE, "result.json"), encoding="utf-8"))
mp = json.load(open(os.path.join(BASE, "..", "h11_gaterefs", "locked_pages_map.json"), encoding="utf-8"))
title = {p["id"]: p["title"] for p in mp["protected"]}


def visible(html):
    b = re.sub(r"(?is)<head.*?</head>", " ", html)
    b = re.sub(r"(?is)<(script|style|noscript|svg|iframe)[^>]*>.*?</\1>", " ", b)
    b = re.sub(r"(?is)<(br|/p|/div|/h[1-6]|/li|/section)[^>]*>", "\n", b)
    b = re.sub(r"(?is)<[^>]+>", " ", b)
    for e, ch in (("&nbsp;", " "), ("&amp;", "&"), ("&quot;", '"'), ("&#39;", "'"),
                  ("&#160;", " "), ("&ldquo;", '"'), ("&rdquo;", '"'), ("&gt;", ">"), ("&lt;", "<")):
        b = b.replace(e, ch)
    lines = []
    for ln in b.split("\n"):
        ln = re.sub(r"\s+", " ", ln).strip()
        if ln:
            lines.append(ln)
    return lines


def fields(html):
    out = []
    for m in re.finditer(r'"(?:text|title|altText|description|label|buttonText|placeholder|linkToUrl|href)"\s*:\s*"((?:[^"\\]|\\.){2,600})"', html):
        t = m.group(1).replace("\\n", " ").replace('\\"', '"').replace("\\/", "/")
        t = re.sub(r"<[^>]+>", " ", t)
        t = re.sub(r"\\[a-zA-Z]", " ", t)
        t = re.sub(r"\s+", " ", t).strip()
        if t:
            out.append(t)
    return out


KEY = re.compile(r"(password|passphrase|secret|hint|key|vault|treasure|bitcoin|bc1|seed|phrase|xpub|name|north|south|east|west|latitude|longitude|coord|\d{2,3}°|whale|raft|fire|smoke|map|\b\d+\b)", re.I)

L = ["# Тексты закрытых страниц SLM, найденные в Wayback (H12)", "",
     "Снимки, где страница отдаётся **без** гейта (`protectedPageResolverUrl` отсутствует).", ""]
seen = set()
for r in res["wayback"]:
    for s in r.get("snap", []):
        if s["gated"] == 0 and s["words"] > 300 and s["ts"] != "timestamp":
            f = os.path.join(BASE, "WB_%s_%s.html" % (r["id"], s["ts"]))
            if not os.path.exists(f) or f in seen:
                continue
            seen.add(f)
            html = open(f, encoding="utf-8", errors="replace").read()
            vis = visible(html)
            L.append("\n---\n## /%s — «%s» (pageId %s), снимок %s, слов %d\n" % (
                r["seo"], title.get(r["id"], "?"), r["id"], s["ts"], s["words"]))
            L.append("### видимый текст (%d строк)" % len(vis))
            for ln in vis:
                L.append("  | " + ln[:400])
            # JSON-поля с подозрительным содержимым
            fl = [x for x in fields(html) if 1 < len(x) < 500]
            sus = [x for x in fl if KEY.search(x)]
            uniq, so = [], set()
            for x in sus:
                if x.lower()[:60] not in so:
                    so.add(x.lower()[:60])
                    uniq.append(x)
            L.append("\n### поля JSON с ключевыми словами (%d уник.)" % len(uniq))
            for x in uniq[:120]:
                L.append("  ! " + x[:300])
            # внешние ссылки
            urls = sorted(set(re.findall(r'https?://[^\s"\'<>\\)]+', html)))
            ext = [u for u in urls if "wix" not in u and "parastorage" not in u and "archive.org" not in u]
            L.append("\n### внешние URL (%d)" % len(ext))
            for u in ext[:40]:
                L.append("  @ " + u[:200])
open(os.path.join(BASE, "CONTENT.md"), "w", encoding="utf-8").write("\n".join(L) + "\n")
print("файлов разобрано:", len(seen), "->", os.path.join(BASE, "CONTENT.md"),
      os.path.getsize(os.path.join(BASE, "CONTENT.md")), "B")
