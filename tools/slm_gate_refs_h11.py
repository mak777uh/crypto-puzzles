# -*- coding: utf-8 -*-
"""SLM Hunt #2 — ось H11: 23 хэша страниц из оболочки закрытой страницы.

Триггер: при доработке tools/hint_watch_2026-10-19.py (режим gate) обнаружили, что HTML-оболочка
закрытой страницы /raft-escape содержит 23 строки вида 144728_<32 hex> — это имена page-JSON,
и НИ ОДИН из них не встречался в нашей базе (в отличие от выводов H10, где хэши закрытых
страниц считались недоступными). Endpoint pages.parastorage.com отдаёт page-JSON по хэшу
без авторизации, если угадан номер ревизии в имени файла (прецедент: оракульный HIT вернул
144728_922c…_2.json.z?v=3).

Перебор (только GET, 23 × 6 имён = 138 запросов, ≤5 мин): для каждого хэша пробуются
ревизии _1…_6 в формах <hash>_N.json.z?v=3 и <hash>_N.json. Позитив = HTTP 200 с телом JSON;
тогда из файла извлекаются pageId/pageUriSEO/title и текст — и сверяется со списком 56
защищённых id. Найденный текст подсказки никуда не публикуется, кроме LOG/досье этого пазла.
"""
import io
import json
import os
import re
import sys
import time
import urllib.request

MASTER = r"C:\Users\Admin\OneDrive\Desktop\master"
PDIR = os.path.join(MASTER, "puzzles", "smith-lyle-moore-hunt-2-0-032btc")
OUT = os.path.join(PDIR, "data", "h11_gaterefs")
UA = {"User-Agent": "Mozilla/5.0 (research)"}
SHELLS = ["https://www.smithlylemoore.com/raft-escape",
          "https://www.smithlylemoore.com/smoke-signals",
          "https://www.smithlylemoore.com"]

os.makedirs(OUT, exist_ok=True)
t0 = time.time()


def get(url, timeout=25, tries=3):
    last = b""
    for i in range(tries):
        st, b = _get(url, timeout)
        if st:
            return st, b
        last = b
        time.sleep(2.0 + 3 * i)  # DNS/таймаут — повторяем, но не считаем ответом
    return 0, last


def _get(url, timeout=25):
    try:
        req = urllib.request.Request(url, headers=UA)
        with urllib.request.urlopen(req, timeout=timeout) as r:
            return r.status, r.read()
    except urllib.error.HTTPError as e:
        try:
            return e.code, (e.read() or b"")
        except Exception:
            return e.code, b""
    except Exception as e:
        return 0, ("%s:%s" % (type(e).__name__, str(e)[:60])).encode()


# ---------- известные id: публичные и защищённые ----------
def load_ids():
    prot, pub = set(), set()
    for cand in ("data/h2c_pagemap.json", "data/h9_locked/pagemap.json"):
        p = os.path.join(PDIR, cand.replace("/", os.sep))
        if os.path.exists(p):
            t = io.open(p, encoding="utf-8", errors="replace").read()
            for m in re.finditer(r'"(pageId|id)"\s*:\s*"([a-z0-9]{5})"', t):
                pub.add(m.group(2))
    shell, _ = get(SHELLS[0])
    body = shell.decode("utf-8", "replace") if isinstance(shell, bytes) else ""
    m = re.search(r'"passwordProtectedPage[^"]*"\s*:\s*\[(.{0,4000}?)\]', body, re.S)
    if m:
        prot = set(re.findall(r'"([a-z0-9]{5})"', m.group(1)))
    m2 = re.search(r'"publicPageIds"\s*:\s*\[(.{0,2000}?)\]', body, re.S)
    if m2:
        pub |= set(re.findall(r'"([a-z0-9]{5})"', m2.group(1)))
    return prot, pub, body


PROT, PUB, FIRST = load_ids()
refs, per_shell = [], {}
SHELL_ST, SHELL_ERR = {}, {}
for u in SHELLS:
    st, b = get(u)
    SHELL_ST[u] = st
    SHELL_ERR[u] = "" if st else b.decode("utf-8", "replace")
    body = b.decode("utf-8", "replace") if st == 200 else ""
    r = sorted(set(re.findall(r"144728_([0-9a-f]{32})", body)))
    per_shell[u] = r
    for x in r:
        if x not in refs:
            refs.append(x)

lines = ["slm H11 %s UTC — refs из оболочек: %s; уникальных хэшей %d; защищённых id %d, публичных %d"
         % (time.strftime("%H:%M"), {u.split("/")[-1] or "home": len(v) for u, v in per_shell.items()},
            len(refs), len(PROT), len(PUB))]

# канал мог отвалиться (DNS/таймаут) — тогда прогон не считается и негатива нет
bad = [u for u, v in per_shell.items() if not v]
if len(refs) == 0 or len(bad) == len(SHELLS):
    lines.append("ПРОГОН НЕ СОСТОЯЛСЯ: оболочки не отдали ни одного имени страницы "
                 "(статусы/ошибки: %s). Негатив не зафиксирован." %
                 json.dumps({u: (SHELL_ST.get(u), (SHELL_ERR.get(u) or "")[:60]) for u in SHELLS}, ensure_ascii=False))
    text = "\n".join(lines) + "\n"
    sys.stdout.write(text)
    fd, tmp = __import__("tempfile").mkstemp(dir=OUT, suffix=".tmp")
    with io.open(fd, "w", encoding="utf-8") as f:
        f.write(text)
    os.replace(tmp, os.path.join(OUT, "probe.log"))
    sys.exit(2)

hits, dead = [], []
for h in refs:
    got = None
    for rev in range(1, 7):
        for form in ("%s_%d.json.z?v=3" % (h, rev), "%s_%d.json" % (h, rev)):
            url = "https://pages.parastorage.com/sites/144728_" + form
            st, b = get(url, timeout=20)
            if st == 200 and b[:1] in (b"{", b"\x1f") or (st == 200 and len(b) > 400):
                got = (rev, form, url, st, b)
                break
        if got:
            break
    if got:
        rev, form, url, st, b = got
        body = b
        if body[:2] == b"\x1f\x8b":
            import gzip
            try:
                body = gzip.decompress(body)
            except Exception:
                pass
        txt = body.decode("utf-8", "replace")
        pid = re.findall(r'"pageId"\s*:\s*"([a-z0-9]{5})"', txt)
        seo = re.findall(r'"pageUriSEO"\s*:\s*"([^"]{1,60})"', txt)
        ttl = re.findall(r'"title"\s*:\s*"([^"]{1,60})"', txt)
        fn = re.sub(r"[^A-Za-z0-9.]", "_", form.split("?")[0])
        path = os.path.join(OUT, fn)
        fd, tmp = __import__("tempfile").mkstemp(dir=OUT, suffix=".tmp")
        os.write(fd, body)
        os.close(fd)
        os.replace(tmp, path)
        hits.append({"hash": h, "rev": rev, "form": form, "bytes": len(body),
                     "pageId": pid[:3], "seo": seo[:3], "title": ttl[:5], "file": fn})
        lines.append("  HIT  %s rev=%d %-28s %8d B pageId=%s seo=%s" % (
            h[:12], rev, form, len(body), ",".join(pid[:3]) or "?", ",".join(seo[:3]) or "?"))
    else:
        dead.append(h)
        lines.append("  ---- %s все ревизии 1..6 закрыты" % h[:12])

# чем являются HIT-страницы: закрытый id или известный публичный
cls = []
for x in hits:
    ids = set(x["pageId"])
    kind = ("ЗАЩИЩЁННАЯ" if ids & PROT else "публичная" if ids & PUB else "неизвестная")
    cls.append("%s → %s (%s)" % (x["hash"][:12], kind, x["seo"][0] if x["seo"] else x["title"][0] if x["title"] else "?"))
lines.append("\nХИТОВ: %d, закрытых имён: %d" % (len(hits), len(dead)))
for c in cls:
    lines.append("  " + c)

fd, tmp = __import__("tempfile").mkstemp(dir=OUT, suffix=".tmp")
with io.open(fd, "w", encoding="utf-8") as f:
    json.dump({"utc": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
               "refs": refs, "protected_ids": sorted(PROT), "public_ids": sorted(PUB),
               "hits": hits, "dead": dead}, f, ensure_ascii=False, indent=1)
os.replace(tmp, os.path.join(OUT, "result.json"))
text = "\n".join(lines) + "\nнайдено %.0f с\n" % (time.time() - t0)
sys.stdout.write(text)
fd, tmp = __import__("tempfile").mkstemp(dir=OUT, suffix=".tmp")
with io.open(fd, "w", encoding="utf-8") as f:
    f.write(text)
os.replace(tmp, os.path.join(OUT, "probe.log"))
