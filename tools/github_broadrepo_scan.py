#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""github_broadrepo_scan.py — широкий поиск НОВЫХ репозиториев по цели (дополнение к github_intake.py).

Зачем: `github_intake.py discover()` ищет кандидатов в первую очередь по ССЫЛКАМ в досье пазла
(README/LOG + текстовые файлы папки) и лишь опционально `--search-k` с запросом = slug с заменой
дефисов на пробелы. Для gsmg-io-5btc-puzzle это запрос «gsmg io 5btc puzzle» — это AND-совпадение
по имени/описанию/темам, оно даёт 0, тогда как широкий запрос «gsmg» даёт 114 репозиториев.
Итог: репозитории, которых нет ссылкой в нашем досье (созданные сообществом заново), шлюзом
НЕ находятся. Этот скрипт закрывает дыру: ищет по «отличительным» токенам цели и фильтрует
по дате создания/пуша.

Только чтение сети. Анонимный пул поиска api.github.com — 10 запросов/минуту, поэтому темп
замедлен (--pace). Ничего не пишет, если не задан --out.

Примеры
    python tools/github_broadrepo_scan.py --queries gsmg,salphaseion --since 2026-08-01
    python tools/github_broadrepo_scan.py --queries 9vw04 --since 2026-01-01 --out _sources/github/NEWREPOS.md
"""
from __future__ import annotations

import argparse
import json
import os
import time
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timezone

API = "https://api.github.com"
UA = "master-broadrepo-scan/1.0 (read-only research)"


def http_get_json(url: str, timeout: int = 30):
    req = urllib.request.Request(url, headers={"User-Agent": UA,
                                              "Accept": "application/vnd.github+json"})
    try:
        with urllib.request.urlopen(req, timeout=timeout) as r:
            return r.status, json.loads(r.read().decode("utf-8", "replace")), dict(r.headers)
    except urllib.error.HTTPError as e:
        return e.code, None, dict(e.headers or {})


def search(q: str, per_page: int = 30):
    url = "%s/search/repositories?%s" % (API, urllib.parse.urlencode(
        {"q": q, "sort": "updated", "order": "desc", "per_page": per_page}))
    return http_get_json(url)


def atomic_write_text(path: str, text: str) -> None:
    os.makedirs(os.path.dirname(os.path.abspath(path)), exist_ok=True)
    tmp = path + ".tmp.%d" % os.getpid()
    with open(tmp, "w", encoding="utf-8", newline="\n") as f:
        f.write(text)
        f.flush()
        os.fsync(f.fileno())
    os.replace(tmp, path)


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--queries", required=True, help="через запятую; отличительные токены цели")
    ap.add_argument("--since", default="2026-08-01", help="YYYY-MM-DD: created/pushed не раньше")
    ap.add_argument("--pace", type=float, default=7.0, help="сек между запросами (анонимный пул 10/мин)")
    ap.add_argument("--out", default="", help="куда сохранить отчёт (иначе только stdout)")
    ap.add_argument("--json", action="store_true", help="печать JSON вместо markdown")
    a = ap.parse_args()

    rows, errors = [], []
    for i, q in enumerate([s.strip() for s in a.queries.split(",") if s.strip()]):
        if i:
            time.sleep(a.pace)
        status, data, _h = search(q)
        if status != 200 or not data:
            errors.append("поиск %r: HTTP %s" % (q, status))
            continue
        for it in data.get("items", []):
            created = (it.get("created_at") or "")[:10]
            pushed = (it.get("pushed_at") or "")[:10]
            if created < a.since and pushed < a.since:
                continue
            rows.append({"query": q, "repo": it.get("full_name"), "created": created,
                         "pushed": pushed, "size": it.get("size"), "lang": it.get("language"),
                         "desc": (it.get("description") or "").strip()})

    rows.sort(key=lambda r: (r["pushed"], r["created"]), reverse=True)
    if a.json:
        text = json.dumps({"generated_utc": datetime.now(timezone.utc).isoformat(timespec="seconds"),
                           "since": a.since, "rows": rows, "errors": errors},
                          ensure_ascii=False, indent=2) + "\n"
    else:
        L = ["# Широкий поиск репозиториев (github_broadrepo_scan.py)", "",
             "- Сгенерировано (UTC): %s" % datetime.now(timezone.utc).isoformat(timespec="seconds"),
             "- Порог даты: %s (created ИЛИ pushed не раньше)" % a.since, "",
             "| pushed | created | owner/repo | язык | размер | как найдено | описание |",
             "|---|---|---|---|---|---|---|"]
        for r in rows:
            L.append("| %s | %s | %s | %s | %s | `%s` | %s |" % (
                r["pushed"], r["created"], r["repo"], r["lang"] or "", r["size"] or "",
                r["query"], (r["desc"] or "").replace("|", "/")[:70]))
        if errors:
            L += ["", "## Ошибки", ""] + ["- %s" % e for e in errors]
        text = "\n".join(L) + "\n"

    if a.out:
        atomic_write_text(a.out, text)
        print("записано: %s (%d строк)" % (a.out, len(rows)))
    else:
        print(text)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
