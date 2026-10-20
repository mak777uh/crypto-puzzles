# -*- coding: utf-8 -*-
"""SLM Hunt — ось H10: архивные снимки страниц smithlylemoore.com из Wayback.

Идея: в Текущем (revision 4) сайте 56 страниц закрыты паролем и their HTML-оболочка
не содержит текста. Но в 2024–2025 часть тех же URL архивировалась, возможно, ДО
установки пароля — тогда в снимке лежит полный отрендеренный текст подсказки.

Только GET. Ничего не пишет в репозиторий кроме data/h10_wayback/.
"""
import io
import json
import os
import re
import sys
import time
import urllib.request

MASTER = r"C:\Users\Admin\OneDrive\Desktop\master"
OUT = os.path.join(MASTER, "puzzles", "smith-lyle-moore-hunt-2-0-032btc", "data", "h10_wayback")
CDX = "http://web.archive.org/cdx/search/cdx?url=smithlylemoore.com&output=json&matchType=domain&fl=urlkey,timestamp,statuscode,original,mimetype&limit=6000"

SKIP = re.compile(r"(_api|/media/|wixstatic|parastorage|\.(png|jpe?g|gif|webp|avif|css|js|mp3|mp4|ico|svg|woff2?|json)$)", re.I)
JUNK = re.compile(r"^/(h_\d+|q_\d+|usm|al_c|enc_|quality_auto|static_)", re.I)

KEYWORDS = re.compile(r"(password|passphrase|secret|hint|raft|palm|fire|smoke|signal|ship|key|vault|treasure|bitcoins?|bc1[0qnz]|1[Bb][1-9A-HJ-NP-Za-km-z]{20}|seed|phrase|xpub)", re.I)


def get(url, timeout=40, tries=2):
    for i in range(tries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (research)"})
            r = urllib.request.urlopen(req, timeout=timeout)
            return r.read(), r.getcode()
        except Exception as e:
            err = e
            time.sleep(1.5)
    return None, "ERR %s %s" % (type(err).__name__, str(err)[:70])


def visible_text(html):
    """Грубый извлечение читаемого текста из Wix-HTML: значения полей text/items + текстовые узлы."""
    found = []
    for m in re.finditer(r'"(?:text|title|altText|description|label|value|buttonText|placeholder)"\s*:\s*"((?:[^"\\]|\\.){4,400})"', html):
        t = m.group(1)
        t = t.replace("\\n", " ").replace("\\\"", "\"").replace("\\/", "/")
        t = re.sub(r"<[^>]+>", " ", t)
        t = re.sub(r"\s+", " ", t).strip()
        if 3 < len(t) < 400:
            found.append(t)
    body = re.sub(r"(?is)<(script|style)[^>]*>.*?</\1>", " ", html)
    body = re.sub(r"(?is)<[^>]+>", " ", body)
    body = re.sub(r"&nbsp;", " ", body)
    for t in re.split(r"\s{2,}", body):
        t = re.sub(r"\s+", " ", t).strip()
        if len(t) > 12 and re.search(r"[A-Za-z]{4,}", t) and "wix" not in t.lower()[:20]:
            found.append(t)
    uniq, seen = [], set()
    for t in found:
        k = t.lower()[:80]
        if k not in seen:
            seen.add(k)
            uniq.append(t)
    return uniq


def main():
    if not os.path.isdir(OUT):
        os.makedirs(OUT)
    raw, st = get(CDX, timeout=90)
    if raw is None:
        print("CDX недоступен:", st)
        return 2
    rows = json.loads(raw.decode("utf-8", "replace"))
    data = [r for r in rows[1:] if len(r) >= 5 and (r[4] or "").lower().startswith("text/html")]
    by_slug = {}
    for urlkey, ts, code, orig, mime in data:
        path = urlkey.split(")", 1)[1] if ")" in urlkey else urlkey
        slug = "/" + path.split("?")[0].strip("/")
        site = urlkey.split(")")[0]
        if site not in ("com,smithlylemoore",):
            continue
        if SKIP.search(slug) or JUNK.match(slug):
            continue
        by_slug.setdefault(slug, []).append((ts, code, orig))
    print("HTML-снимков по страницах:", sum(len(v) for v in by_slug.values()), "уникальных slug:", len(by_slug))

    cur = {}
    sh = os.path.join(MASTER, "puzzles", "smith-lyle-moore-hunt-2-0-032btc", "data", "h9_locked", "pages_from_shell.json")
    if os.path.exists(sh):
        for pid, v in json.load(io.open(sh, encoding="utf-8")).items():
            seo = (v.get("seo") or "").split('","')[0].split(",")[0]
            cur[seo.strip("/")] = v.get("title")
    curset = set("/" + k for k in cur if k)

    order = sorted(by_slug)
    # приоритет: slug, которых нет на живом сайте, и известные нам закрытые страницы
    prio = [s for s in order if s not in curset]
    known = [s for s in order if s in curset]
    report = []
    idx = os.path.join(OUT, "index.json")
    prev = {}
    if os.path.exists(idx):
        prev = json.load(io.open(idx, encoding="utf-8"))
    cap = int(os.environ.get("CAP", "60"))
    n = 0
    for slug in prio + known:
        if n >= cap:
            break
        caps = sorted(set(by_slug[slug]))
        for ts, code, orig in caps[-2:]:
            key = "%s@%s" % (slug, ts)
            fn = os.path.join(OUT, re.sub(r"[^a-z0-9]+", "_", key.lower()) + ".html")
            if os.path.exists(fn):
                html = io.open(fn, encoding="utf-8", errors="replace").read()
                reused = True
            else:
                u = "http://web.archive.org/web/%sid_/%s" % (ts, orig)
                b, st2 = get(u, timeout=45)
                if b is None:
                    report.append({"slug": slug, "ts": ts, "code": code, "error": st2})
                    print("%-52s %s FETCH-FAIL %s" % (slug, ts, st2))
                    continue
                html = b.decode("utf-8", "replace")
                io.open(fn, "w", encoding="utf-8").write(html)
                reused = False
                time.sleep(0.4)
            txts = visible_text(html)
            hits = [t for t in txts if KEYWORDS.search(t)]
            rec = {"slug": slug, "ts": ts, "arch_code": code, "bytes": len(html),
                   "on_live_site": slug in curset, "title": cur.get(slug.lstrip("/")),
                   "n_text": len(txts), "kw_text": hits[:14], "sample": txts[:6]}
            report.append(rec)
            print("%-52s %s code=%-4s %7d B text=%-4s kw=%s %s"
                  % (slug, ts, code, len(html), len(txts), len(hits), "" if reused else "NEW"))
            n += 1
    prev[time.strftime("%Y%m%d")] = report
    io.open(idx, "w", encoding="utf-8").write(json.dumps(prev, ensure_ascii=False, indent=1))
    print("\nСохранено:", idx, "записей:", len(report))
    return 0


if __name__ == "__main__":
    sys.exit(main())
