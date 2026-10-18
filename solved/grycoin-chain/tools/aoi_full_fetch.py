#!/usr/bin/env python3
"""Полная выгрузка всех постов и комментариев u/AoiNakamoto из Arctic Shift.

Причина: предыдущая выгрузка упиралась в limit=100 и обрывалась на 2019-05-18,
то есть не покрывала первый запуск Quizchain (и всё до него). Здесь — пагинация
по created_utc (параметр `before`), пока не придёт пустой ответ.

Выход: data/as_aoi_posts_full.json, data/as_aoi_comments_full.json
Запуск: python tools/aoi_full_fetch.py
"""
import json
import os
import sys
import time
import urllib.parse
import urllib.request

BASE = "https://arctic-shift.photon-reddit.com/api"
DATA = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data")
UA = {"User-Agent": "catalog-research/1.0 (personal, non-commercial)"}

KINDS = {
    "posts": "posts/search",
    "comments": "comments/search",
}


def get(url, tries=5):
    last = None
    for i in range(tries):
        try:
            req = urllib.request.Request(url, headers=UA)
            with urllib.request.urlopen(req, timeout=60) as r:
                return json.loads(r.read().decode("utf-8"))
        except Exception as e:  # noqa: BLE001
            last = e
            wait = 3 * (i + 1)
            print(f"  retry {i+1}/{tries} after {wait}s: {e}", flush=True)
            time.sleep(wait)
    raise SystemExit(f"FATAL: {last}")


def fetch_all(kind):
    path = KINDS[kind]
    out = []
    before = None
    page = 0
    while True:
        q = {"author": "AoiNakamoto", "limit": "100"}
        if before:
            q["before"] = str(before)
        url = f"{BASE}/{path}?{urllib.parse.urlencode(q)}"
        js = get(url)
        data = js.get("data") or []
        if not data:
            break
        out.extend(data)
        page += 1
        oldest = min(int(x["created_utc"]) for x in data)
        print(f"{kind} page {page}: +{len(data)} (oldest {oldest})", flush=True)
        if before is not None and oldest >= before:
            print(f"{kind}: no progress, stopping", flush=True)
            break
        before = oldest
        time.sleep(1.0)
        if len(data) < 100:
            break
    # дедуп по id
    seen, uniq = set(), []
    for x in out:
        if x["id"] in seen:
            continue
        seen.add(x["id"])
        uniq.append(x)
    uniq.sort(key=lambda x: int(x["created_utc"]))
    dest = os.path.join(DATA, f"as_aoi_{kind}_full.json")
    with open(dest, "w", encoding="utf-8") as f:
        json.dump({"kind": kind, "count": len(uniq), "data": uniq}, f, ensure_ascii=False, indent=1)
    print(f"{kind}: total {len(uniq)} -> {dest}", flush=True)
    return uniq


def main():
    os.makedirs(DATA, exist_ok=True)
    posts = fetch_all("posts")
    coms = fetch_all("comments")
    if posts:
        print("oldest post:", posts[0]["created_utc"], posts[0].get("title", "")[:80])
        print("newest post:", posts[-1]["created_utc"], posts[-1].get("title", "")[:80])
    if coms:
        print("oldest comment:", coms[0]["created_utc"])
        print("newest comment:", coms[-1]["created_utc"])
    return 0


if __name__ == "__main__":
    sys.exit(main())
