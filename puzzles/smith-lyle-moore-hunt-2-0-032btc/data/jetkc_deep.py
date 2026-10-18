# -*- coding: utf-8 -*-
"""Deep-dump jetkc (Tropical Island) page JSON via the oracle, then mine it for hints.

Why: only jetkc links to BOTH remaining locks (zhgsm / jcl9c). Unlike most parent
pages it prints no 'password:' line, so the hint (if any) must be in its structure:
hidden/offscreen components, mobile-only layout, image/video file names, alt text, SEO.
Habit (a) of the author — 'image filename = password' — produced albatross,
nantucketsleighride, vampire, mobydick.
"""
import io
import json
import re
import sys
import time
import urllib.error
import urllib.request

URL = "https://site-pages.wix.com/_api/wix-public-html-info-webapp/resolve_protected_page_urls"
META = "13cab6fc-e004-4514-aab0-a7cf702047f9"
SITE = "b8aa9fe0-61db-4696-8909-9dd877606aa4"
UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/124.0 Safari/537.36")
OUT = r"C:\111\jetkc_page.json"
REPORT = r"C:\111\jetkc_report.txt"


def resolve(pid, pw):
    body = json.dumps({"metaSiteId": META, "siteId": SITE, "pageId": pid, "password": pw}).encode()
    req = urllib.request.Request(URL, data=body, headers={
        "Content-Type": "application/json",
        "Origin": "https://www.smithlylemoore.com",
        "User-Agent": UA})
    r = urllib.request.urlopen(req, timeout=25)
    return json.loads(r.read())


def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    return json.loads(urllib.request.urlopen(req, timeout=30).read())


def walk(o, path="", hits=None):
    if hits is None:
        hits = []
    if isinstance(o, dict):
        for k, v in o.items():
            np = path + "/" + k
            if isinstance(v, (dict, list)):
                walk(v, np, hits)
            elif isinstance(v, str) and v.strip():
                hits.append((k, np, v))
    elif isinstance(o, list):
        for i, v in enumerate(o):
            walk(v, path + "[%d]" % i, hits)
    return hits


def main():
    pid, pw = "jetkc", "Mary Ann"
    try:
        d = resolve(pid, pw)
    except Exception as e:
        print("resolve failed: %s" % e)
        return 1
    if not d.get("success"):
        print("oracle said no: %s" % d)
        return 1
    urls = d["payload"]["urls"]
    par = [u for u in urls if "parastorage" in u]
    print("payload urls: %d, parastorage: %d" % (len(urls), len(par)))
    page = None
    for u in par:
        try:
            page = fetch(u)
            print("fetched page json: %s" % u)
            break
        except Exception as e:
            print("fetch failed %s: %s" % (u, e))
    if page is None:
        return 1
    with io.open(OUT, "w", encoding="utf-8") as f:
        json.dump(page, f, ensure_ascii=False, indent=1)

    hits = walk(page)
    out = []

    def emit(s):
        print(s)
        out.append(s)

    emit("jetkc / Tropical Island — разбор page JSON (%d строковых полей)" % len(hits))

    # 1. text-ish fields
    emit("\n=== ТЕКСТЫ ===")
    seen = set()
    for k, p, v in hits:
        if k in ("text", "description", "title", "seoDescription", "keywords",
                 "pageDescription", "pageTitle", "alt", "label", "buttonText"):
            t = re.sub(r"<[^>]+>", " ", v)
            t = re.sub(r"\s+", " ", t).strip()
            if t and t not in seen:
                seen.add(t)
                emit("  [%s] %s" % (k, t[:300]))

    # 2. media filenames / uris  (habit a)
    emit("\n=== ИМЕНА ФАЙЛОВ / URI МЕДИА (привычка «ответ = имя файла») ===")
    mnames = set()
    for k, p, v in hits:
        if k in ("fileName", "uri", "url", "src", "image", "link", "href"):
            m = re.search(r"([^/\\?#]+\.(?:png|jpe?g|gif|mp4|mov|mp3|webp|svg))", v, re.I)
            if m:
                mnames.add(m.group(1))
    for n in sorted(mnames):
        emit("  " + n)

    # 3. hidden / offscreen components
    emit("\n=== СКРЫТЫЕ / OFFSCREEN КОМПОНЕНТЫ ===")
    raw = json.dumps(page, ensure_ascii=False)
    for kw in ("hidden", "isHidden", "offscreen", "visible"):
        for m in re.finditer(r'"%s"\s*:\s*(true|false|[^,}]{1,40})' % kw, raw):
            pass
    # collect components with hidden true together with nearby text
    hid = re.findall(r'\{[^{}]{0,400}"hidden"\s*:\s*true[^{}]{0,400}\}', raw)
    emit("  найдено фрагментов с hidden:true -> %d" % len(hid))
    for h in hid[:12]:
        txt = re.findall(r'"text"\s*:\s*"([^"]{1,120})"', h)
        emit("   * hidden: %s" % (txt[:3] if txt else h[:160]))

    # 4. outgoing links (to see what raft/fire would unlock, and any missed edge)
    emit("\n=== ССЫЛКИ С jetkc ===")
    for k, p, v in hits:
        if k in ("link", "href", "target") and re.search(r"[a-z0-9]{5}|/", v):
            if "smithlylemoore" in v or v.startswith("/"):
                emit("  %s" % v[:200])

    # 5. direct mentions of the two locks anywhere
    emit("\n=== УПОМИНАНИЯ zhgsm / jcl9c / raft / fire ===")
    for m in re.finditer(r".{80}(zhgsm|jcl9c|ra[f]?t|fire|smoke).{80}", raw, re.I):
        emit("  ...%s..." % m.group(0).replace("\\n", " ")[:200])

    with io.open(REPORT, "w", encoding="utf-8") as f:
        f.write("\n".join(out))
    print("\nsaved: %s / %s" % (OUT, REPORT))
    return 0


if __name__ == "__main__":
    sys.exit(main())
