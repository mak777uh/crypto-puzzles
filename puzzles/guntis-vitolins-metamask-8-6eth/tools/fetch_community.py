#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Тянет issues репозитория OCP (сообщество/новые хинты) и Wayback CDX по каналу автора."""
import os
import json
import time
import requests

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(os.path.dirname(HERE), "data", "community")
os.makedirs(DATA, exist_ok=True)
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/124 Safari/537.36"

URLS = [
    ("ocp_issues_recent.json",
     "https://api.github.com/repos/floflo777/open-crypto-puzzles/issues?state=all&sort=created&direction=desc&per_page=50"),
    ("ocp_issue_18.json",
     "https://api.github.com/repos/floflo777/open-crypto-puzzles/issues/18"),
    ("ocp_issue_18_comments.json",
     "https://api.github.com/repos/floflo777/open-crypto-puzzles/issues/18/comments?per_page=100"),
    ("ocp_issue_38.json",
     "https://api.github.com/repos/floflo777/open-crypto-puzzles/issues/38"),
    ("ocp_issue_38_comments.json",
     "https://api.github.com/repos/floflo777/open-crypto-puzzles/issues/38/comments?per_page=100"),
    ("cdx_channel.json",
     "http://web.archive.org/cdx/search/cdx?url=youtube.com/channel/UCkYCnjVcFJDN6Cp_uP0pv_A*&output=json&limit=200&collapse=urlkey"),
    ("cdx_handle.json",
     "http://web.archive.org/cdx/search/cdx?url=youtube.com/@GuntisVitolins*&output=json&limit=200&collapse=urlkey"),
]


def get(name, url, timeout=50):
    dest = os.path.join(DATA, name)
    try:
        r = requests.get(url, headers={"User-Agent": UA, "Accept": "application/vnd.github+json"}, timeout=timeout)
        if r.status_code == 200 and r.content:
            open(dest, "wb").write(r.content)
            return "%s | %s | 200 | %d" % (name, url, len(r.content))
        return "%s | %s | %s | %d" % (name, url, r.status_code, len(r.content or b""))
    except Exception as e:  # noqa: BLE001
        return "%s | %s | ERR | %s" % (name, url, repr(e)[:150])


def main():
    for name, url in URLS:
        print(get(name, url), flush=True)
        time.sleep(1)


if __name__ == "__main__":
    main()
