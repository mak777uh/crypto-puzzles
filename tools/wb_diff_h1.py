# -*- coding: utf-8 -*-
"""Walking Banks H1, фаза 4: чем отличаются версии главной страницы в архиве.

Смысл: OCP разбирал «текст сайта» по живой версии (2026-08-15). Если автор что-то
УБИРАЛ со страницы, этот текст нигде больше не существует — значит его надо искать
в более ранних снимках. Сравнивает построчно видимый текст всех версий корня.
"""
import io
import os
import re
import sys
import time

MASTER = r"C:\Users\Admin\OneDrive\Desktop\master"
SRC = os.path.join(MASTER, "puzzles", "ah-white-walking-banks-800ksats", "data", "wayback")


def visible(html):
    b = re.sub(r"(?is)<head.*?</head>", " ", html)
    b = re.sub(r"(?is)<(script|style|noscript)[^>]*>.*?</\1>", " ", b)
    b = re.sub(r"(?is)<(p|div|li|h1|h2|h3|h4|br|section|article)[^>]*>", "\n", b)
    b = re.sub(r"(?is)<[^>]+>", " ", b)
    for e, ch in (("&nbsp;", " "), ("&amp;", "&"), ("&quot;", '"'), ("&#39;", "'"), ("&ldquo;", '"'), ("&rdquo;", '"')):
        b = b.replace(e, ch)
    lines = []
    for ln in b.split("\n"):
        ln = re.sub(r"\s+", " ", ln).strip()
        if len(ln) >= 2:
            lines.append(ln)
    return lines


files = [f for f in sorted(os.listdir(SRC)) if f.startswith("www.walkingbanks.com") and f.endswith(".html")]
texts = {}
for f in files:
    raw = io.open(os.path.join(SRC, f), "rb").read()
    if raw[:2] == b"\x1f\x8b":
        import gzip
        raw = gzip.decompress(raw)
    texts[f] = visible(raw.decode("utf-8", "replace"))

out = ["# Walking Banks H1 фаза 4 — diff версий корня (%s UTC)" % time.strftime("%Y-%m-%d %H:%M", time.gmtime())]
for f, t in texts.items():
    out.append("   %-46s строк=%d, знаков=%d" % (f, len(t), sum(len(x) for x in t)))

# нормализация для сравнения: маленькие буквы, без цифровых якорей
def norm(s):
    return re.sub(r"[^a-z0-9' ]", " ", s.lower()).replace("’", "'")

allv = list(texts)
u = {f: [norm(x) for x in t] for f, t in texts.items()}
out.append("\n## строки, которые есть в ОДНОЙ версии и отсутствуют в остальных")
union = {}
for f in allv:
    for line in u[f]:
        if len(line) > 25:
            union.setdefault(line, set()).add(f)
uniq = {line: vers for line, vers in union.items() if len(vers) < len(allv)}
for line, vers in sorted(uniq.items(), key=lambda kv: -len(kv[1])):
    out.append("   [%s] %s" % (",".join(v.split("__")[-1][:8] for v in sorted(vers)), line[:200]))

out.append("\n## всё видимое самое раннееsnapshot (2025-04-02), чего нет в 2025-07-16")
a = set(u.get("www.walkingbanks.com___20250402113442.html") or u.get("www.walkingbanks.com___20250402113442.dec.html", []))
late = set()
for f in allv:
    if "20250716" in f or "20250515" in f:
        late |= set(u[f])
for line in sorted(a - late):
    if len(line) > 25:
        out.append("   ТОЛЬКО РАННИЙ: " + line[:220])

out.append("\n## что появилось ПОЗЖЕ (в 2025-07-16, но не 2025-04-02)")
for line in sorted(late - a):
    if len(line) > 25:
        out.append("   НОВЫЙ: " + line[:220])

text = "\n".join(out) + "\n"
sys.stdout.write(text)
fd, tmp = __import__("tempfile").mkstemp(dir=SRC, suffix=".tmp")
os.write(fd, text.encode("utf-8"))
os.close(fd)
os.replace(tmp, os.path.join(SRC, "scan3_diff.md"))
