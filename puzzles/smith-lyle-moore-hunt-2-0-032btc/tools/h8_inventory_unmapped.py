"""Инвентаризация: какие из защищённых страниц реально разобраны в досье.

Опора на файлы папки (не на сводки): h2c_site_locks.json (56 protected + 21 public,
снимок публичного HTML 18.10), h2c_pagemap.json (78 страниц), README/LOG/GLIMMER_HANDOFF
как тексты, где pid уже упоминался. Цель — честный список pid, к которым никто не
прикасался, и классификация «пустых» замков.
"""
import io
import json
import re
from pathlib import Path

F = Path(r"C:\Users\Admin\OneDrive\Desktop\master\puzzles\smith-lyle-moore-hunt-2-0-032btc")


def read(p):
    try:
        return io.open(p, encoding="utf-8", errors="ignore").read()
    except OSError:
        return ""


locks = json.load(open(F / "data" / "h2c_site_locks.json", encoding="utf-8"))
pm = json.load(open(F / "data" / "h2c_pagemap.json", encoding="utf-8"))
prot = locks["passwordProtected"]
pub = locks["publicPageIds"]
print("защищённых:", len(prot), "| публичных:", len(pub), "| всего в pagemap:", len(pm))

corpus = "\n".join([
    read(F / "README.md"),
    read(F / "LOG.md"),
    read(F / "data" / "GLIMMER_HANDOFF_2026-10-17.txt"),
    read(F / "data" / "glimmer_dsh_reports_2026-10-17.md"),
    read(F / "data" / "h2d_texts.txt"),
    read(F / "data" / "h2d_full_text.txt"),
    read(F / "data" / "h2d_links.json"),
    read(F / "data" / "jetkc_report.txt"),
    read(F / "data" / "H2F_NEGATIVE.txt"),
])
for extra in (F / "data").glob("h*.log"):
    corpus += read(extra)

mentioned = set(re.findall(r"\b([a-z0-9]{5})\b", corpus))

never = [p for p in prot if p not in mentioned]
never_pub = [p for p in pub if p not in mentioned]
print("\n=== защищённые pid, НЕ упомянутые ни в одном файле досье:", len(never))
for p in never:
    print("   ", p, "|", pm.get(p, {}).get("title"), "|", pm.get(p, {}).get("seo"))
print("\n=== публичные pid, не упомянутые:", len(never_pub))
for p in never_pub:
    print("   ", p, "|", pm.get(p, {}).get("title"), "|", pm.get(p, {}).get("seo"))

print("\n=== все 78 страниц pagemap (title / seo), для полноты картины:")
for pid, v in sorted(pm.items(), key=lambda kv: (kv[1].get("title") or "").lower()):
    tag = "PUB " if pid in pub else ("LOCK" if pid in prot else " ?  ")
    print("%s %-6s %-30s %s" % (tag, pid, (v.get("title") or "")[:30], v.get("seo")))
