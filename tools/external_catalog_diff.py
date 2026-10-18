#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
external_catalog_diff.py — сверка внешнего машиночитаемого каталога с нашей базой.

Что делает:
  1) читает записи каталога (агntn npm-пакет dist/collections/*.mjs, OCP puzzles.json,
     любой JSON/JS с полями status/chain/address/prize);
  2) строит по нашей базе множество адресов и нормализованных названий;
  3) печатает, какие ОТКРЫТЫЕ (unsolved/open) записи каталога отсутствуют в базе.

Запуск:
  python tools/external_catalog_diff.py agntn   # package/dist/collections
  python tools/external_catalog_diff.py ocp     # _sources/external_catalogs_2026-10-18/ocp_puzzles.json
"""
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
EXT = os.path.join(ROOT, "_sources", "external_catalogs_2026-10-18")

ADDR_RES = [
    re.compile(r"\b[13][a-km-zA-HJ-NP-Z1-9]{25,39}\b"),          # BTC legacy
    re.compile(r"\bbc1[023456789acdefghjklmnpqrstuvwxyz]{14,83}\b"),  # bech32
    re.compile(r"\b0x[0-9a-fA-F]{40}\b"),                        # EVM
    re.compile(r"\baddr1[a-z0-9]{20,120}\b"),                    # Cardano
    re.compile(r"\bT[A-Za-z0-9]{30,35}\b"),                      # TRON
    re.compile(r"\b[48][1-9A-HJ-NP-Za-km-z]{90,100}\b"),         # XMR
    re.compile(r"\b[2-9A-HJ-NP-Za-km-z]{43,44}\b"),              # AR / ALGO / SOL (base58-ish)
    re.compile(r"\bL[a-km-zA-HJ-NP-Z1-9]{25,34}\b"),             # LTC
    re.compile(r"\bD[5-9A-HJ-NP-U][1-9A-HJ-NP-Za-km-z]{32}\b"),  # DOGE
]


def norm(s):
    s = (s or "").lower()
    s = re.sub(r"[^a-z0-9а-яё]+", " ", s)
    return re.sub(r"\s+", " ", s).strip()


def load_db():
    blobs = []
    for dp, dn, fn in os.walk(ROOT):
        dn[:] = [d for d in dn if d not in (".git", "__pycache__", ".secret",
                                           "external_catalogs_2026-10-18", "agntn_pkg")]
        for f in fn:
            if f.lower().endswith((".md", ".txt", ".csv", ".json")):
                p = os.path.join(dp, f)
                if os.path.getsize(p) > 5_000_000:
                    continue
                try:
                    blobs.append(open(p, encoding="utf-8", errors="replace").read())
                except OSError:
                    pass
    text = "\n".join(blobs)
    addrs = set()
    for r in ADDR_RES:
        for m in r.findall(text):
            addrs.add(m.lower())
    names = set()
    for dp, dn, fn in os.walk(os.path.join(ROOT, "puzzles")):
        pass
    for base in ("puzzles", "solved"):
        d = os.path.join(ROOT, base)
        if os.path.isdir(d):
            for name in os.listdir(d):
                if os.path.isdir(os.path.join(d, name)):
                    names.add(norm(name.replace("-", " ")))
                    for tok in norm(name.replace("-", " ")).split():
                        if len(tok) > 4:
                            names.add(tok)
    return text, addrs, names


def records_from_agntn(addrs, names):
    cdir = os.path.join(EXT, "agntn_pkg", "package", "dist", "collections")
    if not os.path.isdir(cdir):
        cdir = os.path.join(EXT, "package", "dist", "collections")
    out = []
    for f in sorted(os.listdir(cdir)):
        if not f.endswith(".mjs"):
            continue
        text = open(os.path.join(cdir, f), encoding="utf-8", errors="replace").read()
        slug = f[:-4]
        # записи: блоки с status
        for m in re.finditer(r"\{\s*key:\s*[\"']([^\"']+)[\"'][\s\S]{0,4000}?\}", text):
            body = m.group(0)
            key = m.group(1)
            st = re.search(r"status:\s*[\"']([^\"']+)[\"']", body)
            status = st.group(1) if st else ""
            title = re.search(r"title:\s*[\"']([^\"']{2,120})[\"']", body)
            ch = re.search(r"chain:\s*[\"']([^\"']+)['\"]", body)
            rec_addrs = set()
            for r in ADDR_RES:
                for a in r.findall(body):
                    rec_addrs.add(a.lower())
            urls = re.findall(r"https?://[^\s\"'`)\]]+", body)
            out.append({"collection": slug, "key": key,
                        "status": status.lower(),
                        "title": title.group(1) if title else "",
                        "chain": ch.group(1) if ch else "",
                        "addresses": sorted(rec_addrs),
                        "urls": sorted(set(u.rstrip(".,") for u in urls))[:12]})
        # если жёсткий парсинг не сработал — хоть collect
    return out


def main():
    which = sys.argv[1] if len(sys.argv) > 1 else "agntn"
    text, addrs, names = load_db()
    print("DB: %d символов, %d адресов, %d токенов названий" % (len(text), len(addrs), len(names)))
    if which == "agntn":
        recs = records_from_agntn(addrs, names)
        print("агntn записей распознано:", len(recs))
        json.dump(recs, open(os.path.join(EXT, "agntn_records_parsed.json"), "w",
                             encoding="utf-8"), ensure_ascii=False, indent=1)
        missing = []
        for r in recs:
            open_status = r["status"] in ("unsolved", "open", "live", "claimed-partial", "")
            if not open_status:
                continue
            in_db_by_addr = any(a in addrs for a in r["addresses"])
            tn = norm(r["title"])
            tok_hit = sum(1 for t in tn.split() if len(t) > 4 and t in names)
            in_db_by_name = (tn in names) or (tok_hit >= 2)
            if not (in_db_by_addr or in_db_by_name):
                missing.append(r)
        print("открытых, НЕ найденных в базе:", len(missing))
        for r in missing:
            print(" - [%s] %s | %s | %s | addr=%s" % (r["collection"], r["key"], r["title"],
                                                      r["status"], ",".join(r["addresses"])))
        json.dump(missing, open(os.path.join(EXT, "agntn_missing_in_db.json"), "w",
                                encoding="utf-8"), ensure_ascii=False, indent=1)
    else:
        d = json.load(open(os.path.join(EXT, "ocp_puzzles.json"), encoding="utf-8"))
        missing = []
        for p in d["puzzles"]:
            if p.get("status") not in ("open", "unsolved"):
                continue
            a = json.dumps(p).lower()
            hit = any(x in addrs for x in re.findall(
                r"\b(?:bc1[023456789a-z]{14,83}|[13][a-km-zA-HJ-NP-Z1-9]{25,39}|0x[0-9a-f]{40})\b", a))
            slug = norm(p.get("slug", "").replace("-", " "))
            tok = sum(1 for t in slug.split() if len(t) > 4 and t in names)
            if not (hit or tok >= 2):
                missing.append(p)
        print("OCP открытых, НЕ найденных в базе:", len(missing))
        for p in missing:
            print(" -", p.get("slug"), "|", p.get("title"))


if __name__ == "__main__":
    main()
