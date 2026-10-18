#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Тянет вложения issue #38 и печатает полные тела guntis-issues (#38/#14/#13/#10)."""
import os
import re
import json
import time
import requests

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(os.path.dirname(HERE), "data", "community")
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/124 Safari/537.36"

ATTACH = [
    ("issue38_1-tested-ledger.md", "https://github.com/user-attachments/files/33019852/1-tested-ledger.md"),
    ("issue38_2-clue-written-words.md", "https://github.com/user-attachments/files/33019853/2-clue-written-words.md"),
    ("issue38_3-method-tail-race.md", "https://github.com/user-attachments/files/33019851/3-method-tail-race.md"),
]

for name, url in ATTACH:
    try:
        r = requests.get(url, headers={"User-Agent": UA}, timeout=50)
        dest = os.path.join(DATA, name)
        if r.status_code == 200 and r.content:
            open(dest, "wb").write(r.content)
            print("OK", name, len(r.content))
        else:
            print("FAIL", name, r.status_code, len(r.content or b""))
    except Exception as e:  # noqa: BLE001
        print("ERR", name, repr(e)[:150])
    time.sleep(1)

# полные тела issues
issues = json.load(open(os.path.join(DATA, "ocp_issues_recent.json"), encoding="utf-8"))
for it in issues:
    if it.get("number") in (38, 14, 13, 10):
        print("\n\n########## ISSUE #%s (%s, %s) ##########" % (
            it["number"], it.get("created_at"), (it.get("user") or {}).get("login")))
        print(it.get("title"))
        print(re.sub(r"\n{3,}", "\n\n", it.get("body") or ""))
