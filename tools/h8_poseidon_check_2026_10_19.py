# -*- coding: utf-8 -*-
"""H8 шаг 9: кто упоминает лодку POSEIDON и что говорит страница /the-search-begins."""
import pathlib, re, urllib.parse, json

ROOT = pathlib.Path(r"C:/Users/Admin/OneDrive/Desktop/master/puzzles/smith-lyle-moore-hunt-2-0-032btc")

p = ROOT / "data/h7_community/site/the-search-begins.html"
if p.exists():
    t = urllib.parse.unquote(p.read_text(encoding="utf-8", errors="ignore"))
    txt = re.findall(r'"text"\s*:\s*"((?:[^"\\]|\\.)*)"', t)
    print("=== the-search-begins: полей text %d ===" % len(txt))
    seen = set()
    for x in txt:
        x2 = re.sub(r"<[^>]+>", " ", x)
        x2 = x2.replace("\\u00a0", " ").replace("\\n", " ")
        x2 = re.sub(r"\\u[0-9a-f]{4}", " ", x2)
        x2 = re.sub(r"\s+", " ", x2).strip()
        if len(x2) > 3 and x2 not in seen:
            seen.add(x2)
            print("   |", x2[:300])
else:
    print("нет файла the-search-begins.html")

print()
pat = re.compile(r"poseidon", re.I)
print("=== упоминания POSEIDON в папке пазла ===")
for q in ROOT.rglob("*"):
    if not q.is_file() or q.suffix.lower() not in (".json", ".html", ".txt", ".md", ".log", ".xml"):
        continue
    if q.stat().st_size > 8_000_000:
        continue
    try:
        tt = urllib.parse.unquote(q.read_text(encoding="utf-8", errors="ignore"))
    except Exception:
        continue
    hits = list(pat.finditer(tt))
    if hits:
        print("%-70s x%d" % (str(q.relative_to(ROOT))[:70], len(hits)))
        for m in hits[:5]:
            print("     ...", re.sub(r"\s+", " ", tt[max(0, m.start() - 110):m.start() + 110])[:230])

print()
print("=== упоминания координат 27.13 / 73.08 / 2077 ===")
for q in ROOT.rglob("*"):
    if not q.is_file() or q.suffix.lower() not in (".json", ".html", ".txt", ".md", ".log", ".xml"):
        continue
    if q.stat().st_size > 8_000_000:
        continue
    try:
        tt = q.read_text(encoding="utf-8", errors="ignore")
    except Exception:
        continue
    for key in ("27.13", "73.08", "2077", "11:59", "115919"):
        if key in tt:
            idx = tt.find(key)
            print("%-60s %-8s ...%s" % (str(q.relative_to(ROOT))[:60], key,
                                        re.sub(r"\s+", " ", tt[max(0, idx - 90):idx + 90])[:190]))
