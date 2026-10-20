# -*- coding: utf-8 -*-
"""SLM H11, фаза 2: прочитать 22 опубликованных page-JSON старого ревизия сайта.

Из каждого JSON вытаскивает читаемое содержимое (Wix: виджеты с текстовыми полями,
ссылки, изображения, кнопки), плюс отдельный поиск по признакам подсказки:
пароли/фразы, числа, адреса BTC, ссылки на внешние домены, названия файлов.
Пишет data/h11_gaterefs/TEXT.md.
"""
import io
import json
import os
import re
import sys

MASTER = r"C:\Users\Admin\OneDrive\Desktop\master"
OUT = os.path.join(MASTER, "puzzles", "smith-lyle-moore-hunt-2-0-032btc", "data", "h11_gaterefs")

TXT_KEYS = {"text", "title", "altText", "description", "label", "link", "href", "src",
            "url", "uri", "seo", "pageUriSEO", "buttonLabels", "placeholder", "value",
            "name", "fileName", "customBody", "htmlCode", "code", "caption", "tooltip"}
SUSPICIOUS = re.compile(r"(password|passphrase|secret|hint|clue|code|raft|smoke|signal|ship|key|vault|"
                        r"treasure|bitcoin|btc|wallet|seed|phrase|xpub|bc1[0qnz]|1[Bb][1-9A-HJ-NP-Za-km-z]{20}|"
                        r"[0-9a-f]{64}|glimmer|albatross|passwordprotected)", re.I)

lines = ["# SLM H11 — содержимое найденных page-JSON"]
for fn in sorted(os.listdir(OUT)):
    if not (fn.endswith(".json") or fn.endswith(".json.z")) or fn in ("result.json",):
        continue
    raw = io.open(os.path.join(OUT, fn), "rb").read()
    if raw[:2] == b"\x1f\x8b":
        import gzip
        raw = gzip.decompress(raw)
    try:
        d = json.loads(raw.decode("utf-8", "replace"))
    except Exception as e:
        lines.append("\n## %s — НЕ JSON (%s)" % (fn, e))
        continue
    texts, sus, urls = [], [], []

    def walk(o, path=""):
        if isinstance(o, dict):
            for k, v in o.items():
                if isinstance(v, str):
                    s = v.strip()
                    if not s:
                        continue
                    if k in TXT_KEYS and len(s) > 2 and not s.startswith(("http", "wix", "data:")):
                        texts.append(s)
                    if SUSPICIOUS.search(s):
                        sus.append("%s: %s" % (k, s[:220]))
                    if k in ("link", "href", "src", "url") and s.startswith("http"):
                        urls.append(s)
                elif isinstance(v, (dict, list)):
                    walk(v, path + "/" + k)
        elif isinstance(o, list):
            for i, v in enumerate(o):
                walk(v, path + "/%d" % i)

    walk(d)
    # Wix rich text лежит в виде HTML в полях text
    clean = []
    for t in texts:
        t2 = re.sub(r"(?is)<[^>]+>", " ", t)
        t2 = re.sub(r"&nbsp;|&#160;", " ", t2)
        t2 = re.sub(r"\s+", " ", t2).strip()
        if len(t2) > 2 and t2 not in clean:
            clean.append(t2)
    pid = sorted(set(re.findall(r'"(?:pageId|masterPageId)"\s*:\s*"([a-z0-9]{5})"', raw.decode("utf-8", "replace"))))
    seo = sorted(set(re.findall(r'"pageUriSEO"\s*:\s*"([^"]{1,70})"', raw.decode("utf-8", "replace"))))
    lines.append("\n## %s (%d B)  pageId=%s  seo=%s" % (fn, len(raw), ",".join(pid[:4]) or "?", ",".join(seo[:3]) or "?"))
    if clean:
        lines.append("   ТЕКСТ (%d фрагментов):" % len(clean))
        for t in clean[:45]:
            lines.append("     | " + t[:300])
    else:
        lines.append("   (текстовых полей нет)")
    if urls:
        lines.append("   URL: " + ", ".join(sorted(set(urls))[:15])[:700])
    if sus:
        lines.append("   ПОДРИЗНИТЕЛЬНОЕ (%d):" % len(sus))
        seen = set()
        for s in sus:
            if s[:60] in seen:
                continue
            seen.add(s[:60])
            lines.append("     ! " + s[:260])
            if len(seen) >= 30:
                break

text = "\n".join(lines) + "\n"
sys.stdout.write(text[:60000])
fd, tmp = __import__("tempfile").mkstemp(dir=OUT, suffix=".tmp")
with io.open(fd, "w", encoding="utf-8") as f:
    f.write(text)
os.replace(tmp, os.path.join(OUT, "TEXT.md"))
