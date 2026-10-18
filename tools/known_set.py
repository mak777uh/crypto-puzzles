#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
known_set.py — построить индекс «что уже есть в базе» для дедупликации новых находок.

Выход:
  _sources/KNOWN_SET_2026-10-18.json  — машиночитаемый: slugs, titles, urls, sources(repos)
  _sources/KNOWN_SET_2026-10-18.txt   — человекочитаемый список (для быстрого grep)

Использование: python tools/known_set.py
Идея: любой агент, который ищет новые каталоги/репо загадок, сверяется с этим файлом,
чтобы не добавлять уже имеющееся и не дублировать папки.
"""
import json
import os
import re
import sys
from datetime import datetime

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

URL_RE = re.compile(r"https?://[^\s)\]<>\"'`]+")
MD_FILES = []


def collect_md():
    out = []
    for dirpath, dirnames, filenames in os.walk(ROOT):
        dirnames[:] = [d for d in dirnames if d not in (".git", "__pycache__", ".secret")]
        for fn in filenames:
            if fn.lower().endswith((".md", ".csv", ".txt", ".json")):
                p = os.path.join(dirpath, fn)
                if os.path.getsize(p) > 3_000_000:
                    continue
                out.append(p)
    return out


def norm_title(s):
    s = s.lower()
    s = re.sub(r"[^a-z0-9а-яё]+", " ", s)
    return re.sub(r"\s+", " ", s).strip()


def main():
    slugs = {"puzzles": [], "solved": [], "other": []}
    for base, key in (("puzzles", "puzzles"), ("solved", "solved")):
        d = os.path.join(ROOT, base)
        if os.path.isdir(d):
            for name in sorted(os.listdir(d)):
                if os.path.isdir(os.path.join(d, name)) and name not in ("dead-ends-registry",):
                    slugs[key].append(name)

    urls = {}
    titles = {}
    files = collect_md()
    for p in files:
        try:
            text = open(p, encoding="utf-8", errors="replace").read()
        except OSError:
            continue
        rel = os.path.relpath(p, ROOT).replace("\\", "/")
        for u in URL_RE.findall(text):
            u = u.rstrip(".,;:!?»")
            host = re.sub(r"^https?://", "", u).split("/")[0].lower()
            urls.setdefault(u.lower(), set()).add(rel)
            if host in ("github.com", "www.github.com"):
                parts = u.rstrip("/").split("/")
                if len(parts) >= 4:
                    titles.setdefault("repo:" + "/".join(parts[3 - 1:4 + 0]), set())
        # заголовки md
        for line in text.splitlines():
            m = re.match(r"^\s*#{2,4}\s+(.+)$", line)
            if m:
                t = norm_title(m.group(1))
                if 4 < len(t) < 90:
                    titles.setdefault(t, set()).add(rel)
            m = re.match(r"^\s*[-*]\s*\[([^\]]+)\]\(", line)
            if m:
                t = norm_title(m.group(1))
                if 3 < len(t) < 90:
                    titles.setdefault(t, set()).add(rel)

    repos = sorted({u for u in urls if re.sub(r"^https?://", "", u).split("/")[0].lower()
                    in ("github.com", "www.github.com", "raw.githubusercontent.com",
                        "gitlab.com", "huggingface.co")})

    data = {
        "generated": datetime.now().isoformat(timespec="seconds"),
        "counts": {"md_files_scanned": len(files), "slugs_active": len(slugs["puzzles"]),
                   "slugs_solved": len(slugs["solved"]), "unique_urls": len(urls),
                   "code_hosting_urls": len(repos)},
        "slugs": slugs,
        "titles": sorted(titles),
        "code_repos_or_files": repos,
        "all_urls": sorted(urls),
    }
    os.makedirs(os.path.join(ROOT, "_sources"), exist_ok=True)
    jp = os.path.join(ROOT, "_sources", "KNOWN_SET_2026-10-18.json")
    tp = os.path.join(ROOT, "_sources", "KNOWN_SET_2026-10-18.txt")
    with open(jp, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=1)
    with open(tp, "w", encoding="utf-8") as f:
        f.write("# KNOWN SET 2026-10-18 — всё, что уже есть в базе (для дедупа новых каталогов)\n")
        f.write("# генератор: tools/known_set.py; скан %d файлов\n\n" % len(files))
        f.write("## SLUGS активных папок (%d)\n" % len(slugs["puzzles"]))
        f.write("\n".join(slugs["puzzles"]) + "\n\n")
        f.write("## SLUGS solved/ (%d)\n" % len(slugs["solved"]))
        f.write("\n".join(slugs["solved"]) + "\n\n")
        f.write("## КОДОВЫЕ РЕПО/ФАЙЛЫ, уже упомянутые в базе (%d)\n" % len(repos))
        f.write("\n".join(repos) + "\n\n")
        f.write("## ВСЕ URL в базе (%d)\n" % len(urls))
        f.write("\n".join(sorted(urls)) + "\n")
    print(json.dumps(data["counts"], ensure_ascii=False))
    print(jp)
    print(tp)


if __name__ == "__main__":
    main()
