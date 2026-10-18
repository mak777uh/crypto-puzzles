#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Печатает полные тела выбранных issues OCP (#32 Gemfinder, #29 Path to Greatness, #10/#13 guntis)."""
import os
import re
import json

DATA = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data", "community")
issues = json.load(open(os.path.join(DATA, "ocp_issues_recent.json"), encoding="utf-8"))
WANT = (32, 29, 10, 13, 22)
out = []
for it in issues:
    if it.get("number") in WANT:
        out.append("\n\n########## ISSUE #%s (%s, %s) ##########" % (
            it["number"], it.get("created_at"), (it.get("user") or {}).get("login")))
        out.append(it.get("title") or "")
        out.append(re.sub(r"\n{3,}", "\n\n", it.get("body") or ""))
open(os.path.join(DATA, "selected_issues.txt"), "w", encoding="utf-8").write("\n".join(out))
print("written", len(out))
