#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Собирает кросс-пазловую сводку issues OCP (сообщество) в master/_sources/.
Вход: puzzles/guntis-.../data/community/ocp_issues_recent.json (снят 2026-10-17).
"""
import os
import re
import json

MASTER = r"C:\Users\Admin\OneDrive\Desktop\master"
src = os.path.join(MASTER, "puzzles", "guntis-vitolins-metamask-8-6eth",
                   "data", "community", "ocp_issues_recent.json")
issues = json.load(open(src, encoding="utf-8"))

# копия сырого JSON на уровне базы
raw_dest = os.path.join(MASTER, "_sources", "OCP_ISSUES_2026-10-17.json")
json.dump(issues, open(raw_dest, "w", encoding="utf-8"), ensure_ascii=False, indent=1)

lines = ["# OCP issues — сводка сообщества (снято 2026-10-17, Big Pickle)", "",
         "Источник: https://github.com/floflo777/open-crypto-puzzles/issues (GitHub API, state=all, 39 шт., сорт по дате).",
         "Сырой JSON: `_sources/OCP_ISSUES_2026-10-17.json`. Это триаж-подсказки по нашим папкам (solved/ негативы/лиды), не истина в последней инстанции.",
         "",
         "| # | создан | автор | заголовок | краткое тело |",
         "|---|---|---|---|---|"]
for it in sorted(issues, key=lambda x: x.get("number", 0)):
    n = it.get("number")
    d = (it.get("created_at") or "")[:10]
    u = (it.get("user") or {}).get("login", "")
    t = re.sub(r"\s+", " ", it.get("title") or "")
    b = re.sub(r"\s+", " ", it.get("body") or "")[:220].replace("|", "\\|")
    lines.append("| %s | %s | %s | %s | %s |" % (n, d, u, t.replace("|", "\\|"), b))

out = os.path.join(MASTER, "_sources", "OCP_ISSUES_TRIAGE_2026-10-17.md")
open(out, "w", encoding="utf-8").write("\n".join(lines) + "\n")
print("written:", out, len(lines), "lines; raw:", raw_dest)
