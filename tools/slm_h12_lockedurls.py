# -*- coding: utf-8 -*-
"""SLM Hunt — ось H12: 56 закрытых паролем slug'ей (карта из masterPage rev3).

Два прохода, только GET:
  A) живой сайт: код + размер оболочки + признак гейта (protectedPageResolverUrl)
     + количество читаемого текста. Гипотеза: где-то конфиг рассинхронизирован и
     страница отдаётся без гейта.
  B) Wayback CDX по каждому slug'у: есть ли снимок 200, и если да — качается
     id_-снимок, распаковывается (gzip/deflate) и извлекается видимый текст.
     Гипотеза: архив застал страницу до установки пароля.

Ничего не публикует, транзакций нет, учётных данных не отправляет.
Пишет в data/h12_lockedurls/ (атомарно) и печатает сводку в stdout.
"""
import gzip
import io
import json
import os
import re
import sys
import tempfile
import time
import urllib.error
import urllib.parse
import urllib.request

MASTER = r"C:\Users\Admin\OneDrive\Desktop\master"
PUZ = os.path.join(MASTER, "puzzles", "smith-lyle-moore-hunt-2-0-032btc")
BASE = os.path.join(PUZ, "data")
OUT = os.path.join(BASE, "h12_lockedurls")
MAP = os.path.join(BASE, "h11_gaterefs", "locked_pages_map.json")
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) research/1.0"
BUDGET = 11.5 * 60

CDX = ("http://web.archive.org/cdx/search/cdx?url=%s&output=json&limit=40"
       "&filter=statuscode:200&fl=timestamp,statuscode,digest,original,mimetype")

KEY = re.compile(r"(password|passphrase|secret|hint|raft|palm|fire|smoke|signal|ship|"
                 r"key|vault|treasure|bitcoins?|bc1[0qnz]|1[Bb][1-9A-HJ-NP-Za-km-z]{20}|"
                 r"seed|phrase|xpub|whale|latitude|north|south|east|west|name\s*\d)", re.I)


def get(url, timeout=30, tries=2):
    err = None
    for _ in range(tries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=timeout) as r:
                return r.read(), r.getcode(), None
        except urllib.error.HTTPError as e:
            try:
                body = e.read()
            except Exception:
                body = b""
            return body, e.code, None
        except Exception as e:
            err = "%s %s" % (type(e).__name__, str(e)[:60])
            time.sleep(1.0)
    return b"", 0, err


def decompress(b):
    if b[:2] == b"\x1f\x8b":
        try:
            return gzip.decompress(b)
        except Exception:
            pass
    try:
        import zlib
        for w in (15, -15):
            try:
                return zlib.decompress(b, w)
            except Exception:
                pass
    except Exception:
        pass
    return b


def visible(html):
    b = re.sub(r"(?is)<head.*?</head>", " ", html)
    b = re.sub(r"(?is)<(script|style|noscript|svg)[^>]*>.*?</\1>", " ", b)
    b = re.sub(r"(?is)<[^>]+>", " ", b)
    for e, ch in (("&nbsp;", " "), ("&amp;", "&"), ("&quot;", '"'), ("&#39;", "'"),
                  ("&#160;", " ")):
        b = b.replace(e, ch)
    return re.sub(r"\s+", " ", b).strip()


def field_text(html):
    """Текстовые поля Wix-оболочки (JSON-строки text/title/label/…) — там лежит
    содержимое, даже когда тело страницы не отрендерено."""
    found = []
    for m in re.finditer(r'"(?:text|title|altText|description|label|buttonText|placeholder)"\s*:\s*"((?:[^"\\]|\\.){3,400})"', html):
        t = m.group(1).replace("\\n", " ").replace('\\"', '"').replace("\\/", "/")
        t = re.sub(r"<[^>]+>", " ", t)
        t = re.sub(r"\s+", " ", t).strip()
        if 2 < len(t) < 400:
            found.append(t)
    uniq, seen = [], set()
    for t in found:
        k = t.lower()[:70]
        if k not in seen:
            seen.add(k)
            uniq.append(t)
    return uniq


def write(name, data):
    fd, tmp = tempfile.mkstemp(dir=OUT)
    os.close(fd)
    with open(tmp, "wb") as f:
        f.write(data if isinstance(data, bytes) else data.encode("utf-8"))
    os.replace(tmp, os.path.join(OUT, name))


def main():
    os.makedirs(OUT, exist_ok=True)
    t0 = time.time()
    mp = json.load(open(MAP, encoding="utf-8"))
    pages = [(p["id"], p["uriSEO"], p["title"]) for p in mp["protected"] if p["uriSEO"]]
    print("защищённых страниц: %d" % len(pages))

    live, wb = [], []
    # --- проход A: живой статус
    for pid, seo, title in pages:
        if time.time() - t0 > BUDGET * 0.45:
            print("бюджет A исчерпан, остановка на %d" % len(live))
            break
        url = "https://www.smithlylemoore.com/" + seo
        b, st, err = get(url)
        try:
            h = b.decode("utf-8", "replace")
        except Exception:
            h = ""
        gated = 1 if "protectedPageResolverUrl" in h else 0
        vis = visible(h)
        rec = {"id": pid, "seo": seo, "title": title, "code": st, "bytes": len(b),
               "gated": gated, "words": len(vis.split()), "err": err}
        live.append(rec)
        flag = "ГЕЙТ" if gated else ("ОТКРЫТО?!" if st == 200 else "код%s" % st)
        print("  A %-42s %s %7d B слов=%-5d %s" % (("/" + seo)[:42], st, len(b), rec["words"], flag))
        if not gated and st == 200:
            write("LIVE_%s.html" % pid, b)
        time.sleep(0.2)

    # --- проход B: Wayback по каждому slug
    for pid, seo, title in pages:
        if time.time() - t0 > BUDGET * 0.9:
            print("бюджет B исчерпан, остановка на %d" % len(wb))
            break
        u = urllib.parse.quote("smithlylemoore.com/" + seo, safe="/")
        b, st, err = get(CDX % u)
        ts = []
        if st == 200:
            try:
                rows = json.loads(b.decode("utf-8", "replace"))
            except Exception:
                rows = []
            if rows and rows[0] and rows[0][0] == "urlkey":
                rows = rows[1:]
            ts = [r[0] for r in rows if isinstance(r, list) and r]
        rec = {"id": pid, "seo": seo, "title": title, "cdx_code": st, "shots": ts[:8],
               "err": err}
        for t in ts[:3]:
            raw, code, e2 = get("http://web.archive.org/web/%sid_/%s" % (
                t, urllib.parse.quote("https://www.smithlylemoore.com/" + seo, safe="/:")))
            if code != 200 or not raw:
                continue
            dec = decompress(raw)
            h = dec.decode("utf-8", "replace")
            vis = visible(h)
            fl = field_text(h)
            hits = [x for x in fl if KEY.search(x)]
            n = len(vis.split())
            rec.setdefault("snap", []).append(
                {"ts": t, "raw": len(raw), "dec": len(dec), "words": n,
                 "gated": 1 if "protectedPageResolverUrl" in h else 0,
                 "kw": hits[:25]})
            if hits or n > 120:
                write("WB_%s_%s.html" % (pid, t), dec)
                print("  B /%-38s %s слов=%-5d гейт=%d ключей=%d" % (
                    seo[:38], t, n, rec["snap"][-1]["gated"], len(hits)))
            time.sleep(0.3)
        if "snap" not in rec:
            print("  B /%-40s снимков 200: %d" % (seo[:40], len(ts)))
        wb.append(rec)

    res = {"utc": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
           "elapsed_s": round(time.time() - t0, 1),
           "pages": len(pages),
           "live": live, "wayback": wb,
           "live_ungated": [r for r in live if r["code"] == 200 and not r["gated"]],
           "wb_with_content": [r for r in wb if any(
               s["words"] > 120 or s["kw"] for s in r.get("snap", []))]}
    write("result.json", json.dumps(res, ensure_ascii=False, indent=1))
    print("\n=== ИТОГ ===")
    print("A: живых ответов %d, из них гейта нет %d" % (
        len(live), len(res["live_ungated"])))
    for r in res["live_ungated"]:
        print("   !!! без гейта: /%s (%s) %d B слов=%d" % (r["seo"], r["id"], r["bytes"], r["words"]))
    print("B: slug'ей со снимками %d, со содержимым/ключами %d" % (
        len([r for r in wb if r.get("snap")]), len(res["wb_with_content"])))
    for r in res["wb_with_content"]:
        print("   !!! /%s: %s" % (r["seo"], json.dumps(r["snap"], ensure_ascii=False)[:400]))
    print("time budget: %.1f s" % (time.time() - t0))


if __name__ == "__main__":
    main()
