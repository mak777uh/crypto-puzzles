# -*- coding: utf-8 -*-
"""Walking Banks — ось H1: корпус walkingbanks.com только из Wayback Machine.

Триггер: живой домен отдаёт заглушку Hostinger «Your domain is expired», поэтому
официальные страницы-подсказки существуют лишь в архиве. Только GET, ≤15 мин.

Делает:
 1) CDX-список всего домена (collapse=urlkey), затем по каждому urlkey — список снимков
    с digest, чтобы качать только УНИКАЛЬНЫЕ версии содержимого;
 2) скачивает raw-снимки (вид `id_`, без баннера Wayback) в data/wayback/;
 3) пишет index.json и harvest.log.

Никаких POST, никаких трат, ничего в репозиторий кроме data/wayback/.
"""
import io
import json
import os
import re
import sys
import time
import urllib.parse
import urllib.request

MASTER = r"C:\Users\Admin\OneDrive\Desktop\master"
OUT = os.path.join(MASTER, "puzzles", "ah-white-walking-banks-800ksats", "data", "wayback")
CDX_LIST = ("http://web.archive.org/cdx/search/cdx?url=walkingbanks.com"
            "&output=json&matchType=domain&collapse=urlkey"
            "&fl=urlkey,timestamp,statuscode,original,mimetype&limit=4000")
CDX_VERS = ("http://web.archive.org/cdx/search/cdx?url=%s&output=json"
            "&fl=timestamp,statuscode,digest,original,length"
            "&filter=statuscode:200&limit=40")

# ресурсы, в которых не бывает текста подсказки
SKIP = re.compile(r"\.(png|jpe?g|gif|webp|avif|svg|css|woff2?|ttf|eot|ico|mp3|mp4|m4a|webm|pdf|zip)(\?|$)", re.I)
NEED = re.compile(r"^(text/html|application/json|text/plain|application/javascript|text/javascript|application/xhtml\+xml)$", re.I)

t0 = time.time()


def get(url, timeout=45, tries=3):
    last = None
    for i in range(tries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (research; archive-harvest)"})
            r = urllib.request.urlopen(req, timeout=timeout)
            return r.read(), r.getcode()
        except Exception as e:
            last = e
            time.sleep(2.0 + 2 * i)
    return None, "ERR %s %s" % (type(last).__name__, str(last)[:80])


def log(lines):
    text = "\n".join(lines) + "\n"
    sys.stdout.write(text)
    sys.stdout.flush()
    d = os.path.dirname(LOGF)
    fd, tmp = tempfile_make(d)
    with io.open(fd, "w", encoding="utf-8") as f:
        f.write(text)
    os.replace(tmp, LOGF)


def tempfile_make(d):
    import tempfile
    return tempfile.mkstemp(dir=d, suffix=".tmp")


LOGF = os.path.join(OUT, "harvest.log")
os.makedirs(OUT, exist_ok=True)

# ---------- 1. список url-ключей ----------
raw, st = get(CDX_LIST)
if raw is None:
    log(["CDX list failed: %s" % st])
    sys.exit(1)
rows = json.loads(raw.decode("utf-8", "replace"))
head, rows = rows[0], rows[1:]
# CDX cdx/json всегда отдаёт первую строку — имена колонок
cols = head
idx = {c: i for i, c in enumerate(cols)}
mimes = {}
for r in rows:
    mimes[r[idx["mimetype"]]] = mimes.get(r[idx["mimetype"]], 0) + 1
lines_pre = ["CDX rows=%d, колонки=%s" % (len(rows), cols), "  mimetype-счёт: " + json.dumps(mimes)]
urls = []
for r in rows:
    u = r[idx["original"]]
    mt = (r[idx["mimetype"]] or "")
    if SKIP.search(u):
        continue
    # страницу без mime-подсказки тоже берём: конец URL = "/" или .html/.htm
    unknown = (mt in ("warc/revisit", "") or mt == "unknown") and re.search(r"(\.html?$|/$)", u, re.I)
    if not (NEED.search(mt) or unknown):
        continue
    urls.append((u, mt))
lines = list(lines_pre)
lines.append("оставлено текстовых URL=%d, %.0f с" % (len(urls), time.time() - t0))
for u, mt in urls:
    lines.append("  %-60s %s" % (u[:60], mt))

# ---------- 2. версии по каждому URL ----------
plan = []
for u, mt in urls:
    key = re.sub(r"^https?://", "", u).rstrip("/") or "root"
    vraw, vst = get(CDX_VERS % urllib.parse.quote(key, safe="/"))
    if vraw is None:
        lines.append("  VERS FAIL %s %s" % (key[:50], vst))
        continue
    try:
        v = json.loads(vraw.decode("utf-8", "replace"))
    except Exception:
        lines.append("  VERS BADJSON %s" % key[:50])
        continue
    if not v:
        continue
    vh = v[0]
    vi = {c: i for i, c in enumerate(vh)}
    seen = set()
    for row in v[1:]:
        dg = row[vi["digest"]]
        ts = row[vi["timestamp"]]
        if dg in seen:
            continue
        seen.add(dg)
        plan.append({"url": u, "ts": ts, "digest": dg, "mimetype": mt,
                     "orig": row[vi["original"]]})
    time.sleep(0.4)

lines.append("\nУникальных (url, digest) версий: %d" % len(plan))
plan.sort(key=lambda p: (p["url"], p["ts"]))

# бюджет времени: ≤ 12 минут на скачивание
budget = 12 * 60
saved, failed = [], []
for p in plan:
    if time.time() - t0 > budget:
        lines.append("БЮДЕТ ВРЕМЕНИ ИСЧЕРПАН — остальные %d не скачаны" % (len(plan) - len(saved) - len(failed)))
        break
    fn = "%s__%s.html" % (re.sub(r"[^A-Za-z0-9.]+", "_", re.sub(r"^https?://", "", p["url"]))[:70], p["ts"])
    path = os.path.join(OUT, fn)
    if os.path.exists(path) and os.path.getsize(path) > 200:
        saved.append(dict(p, file=fn, bytes=os.path.getsize(path), cached=True))
        continue
    fetch = "http://web.archive.org/web/%sid_/%s" % (p["ts"], p["url"])
    body, st2 = get(fetch, timeout=45, tries=2)
    if body is None:
        failed.append(dict(p, err=st2))
        lines.append("  FAIL %-55s %s %s" % (p["url"][:55], p["ts"], st2))
        continue
    fd, tmp = tempfile_make(OUT)
    with open(fd, "wb") as f:
        f.write(body)
    os.replace(tmp, path)
    saved.append(dict(p, file=fn, bytes=len(body)))
    lines.append("  OK   %-55s %s %7d B" % (p["url"][:55], p["ts"], len(body)))
    time.sleep(0.6)

lines.append("\nСохранено %d, ошибок %d, всего %.0f с" % (len(saved), len(failed), time.time() - t0))
fd, tmp = tempfile_make(OUT)
with io.open(fd, "w", encoding="utf-8") as f:
    json.dump({"generated_utc": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
               "cdx_rows": len(rows), "text_urls": urls, "plan": plan,
               "saved": saved, "failed": failed}, f, ensure_ascii=False, indent=1)
os.replace(tmp, os.path.join(OUT, "index.json"))
log(lines)
