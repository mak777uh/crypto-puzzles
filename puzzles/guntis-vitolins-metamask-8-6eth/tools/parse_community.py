#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Разбор issues OCP: всё про guntis/mineshop/hint/seed, по датам."""
import os
import json
import re

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(os.path.dirname(HERE), "data", "community")
KEY = re.compile(r"guntis|mineshop|seed|hint|dutch|parrot|fog|fiber|fork", re.I)

issues = json.load(open(os.path.join(DATA, "ocp_issues_recent.json"), encoding="utf-8"))
print("=== ISSUES (%d) ===" % len(issues))
for it in issues:
    title = it.get("title", "")
    num = it.get("number")
    created = it.get("created_at", "")
    user = (it.get("user") or {}).get("login", "")
    body = (it.get("body") or "")
    blob = title + "\n" + body
    mark = "***" if KEY.search(blob) else "   "
    print("%s #%s %s %s | %s" % (mark, num, created, user, title[:90]))
    if KEY.search(blob) and body:
        snip = re.sub(r"\s+", " ", body)[:400]
        print("      >", snip)

for f in ["ocp_issue_18_comments.json", "ocp_issue_18.json", "ocp_issue_38.json", "ocp_issue_38_comments.json"]:
    p = os.path.join(DATA, f)
    try:
        data = json.load(open(p, encoding="utf-8"))
    except Exception as e:  # noqa: BLE001
        print(f, "ERR", e)
        continue
    items = data if isinstance(data, list) else [data]
    print("\n=== %s (%d) ===" % (f, len(items)))
    for it in items:
        if not isinstance(it, dict):
            continue
        who = (it.get("user") or {}).get("login", "")
        when = it.get("created_at", "")
        body = re.sub(r"\s+", " ", (it.get("body") or ""))
        print("--- %s %s\n    %s" % (when, who, body[:1200]))
