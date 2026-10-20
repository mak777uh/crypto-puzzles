"""Полный текст страницы jetkc (Tropical Island) + все поля-строки с ключевыми словами.

Родительская страница двух незакрытых замков zhgsm (raft) и jcl9c (fire) — единственный
источник подсказки к ним. سابقие выгрузки обрывали текст, здесь — дословно и целиком.
"""
import io
import json
import re
from pathlib import Path

F = Path(r"C:\Users\Admin\OneDrive\Desktop\master\puzzles\smith-lyle-moore-hunt-2-0-032btc\data")
s = io.open(F / "jetkc_page.json", encoding="utf-8", errors="ignore").read()
d = json.loads(s)


def walk(node, path=""):
    if isinstance(node, dict):
        for k, v in node.items():
            yield from walk(v, path + "/" + str(k))
    elif isinstance(node, list):
        for i, v in enumerate(node):
            yield from walk(v, path + "/[%d]" % i)
    elif isinstance(node, str):
        yield path, node


texts = []
keys = ("text", "label", "title", "description", "alt", "caption", "seo", "header",
        "desktop", "mobile", "html", "value", "name")
for path, v in walk(d):
    t = v.strip()
    if len(t) < 3 or len(t) > 4000:
        continue
    if re.search(r"^\s*(https?:|//|data:|#|[A-Za-z0-9_/-]{3,}\.(css|js|png|jpg|gif|mp4|mp3|json))", t):
        continue
    if re.search(r"[{};=]|px\b|font-|rgba|webkit|svg", t) and len(t) < 120:
        continue
    texts.append((path, t))

seen = set()
print("=== длинные тексты (>60 симв.), дословно ===")
for path, t in texts:
    if len(t) <= 60:
        continue
    key = t[:80]
    if key in seen:
        continue
    seen.add(key)
    print("\n[" + path[-70:] + "]")
    print(t.replace("&#39;", "'").replace("&quot;", '"'))

print("\n=== короткие строки с raft/fire/ship/palm/signal/smok/light ===")
pat = re.compile(r"raft|fire|ship|palm|signal|smok|light|rescu|flar|beacon|wood|hut|coconut", re.I)
out = []
for path, t in texts:
    if pat.search(t) and t not in out:
        out.append(t)
for t in out:
    print("   *", t[:250].replace("&#39;", "'"))
