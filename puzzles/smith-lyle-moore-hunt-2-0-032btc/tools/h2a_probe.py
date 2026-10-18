"""H2a — закрытие аудита статусов по жд-замкам Glimmer (4–7 запросов, не перебор).

Смысл: прежний прогон glimmer_probe.py (17.10) реально отсылал `fffffffffff` и
`01271967` на zhgsm/jcl9c/y6cd1, но его лог не различает NO (403) и ERR
(429/5xx после ретраев). Здесь статус каждого ответа пишется отдельно.

Оракул Wix: POST resolve_protected_page_urls; 200+{"success":true} = пароль верный,
403/success:false = неверный, всё остальное = ERR (не негатив!).
Строго последовательно, пауза 0,6 с, до 5 ретраев на 429/5xx.

Самопроверка до кандидатов: заведомо верная пара e3zre + albatross должна дать HIT.
"""
from __future__ import annotations

import json
import time
import urllib.error
import urllib.request
from pathlib import Path

D = Path(__file__).resolve().parents[1]
OUT = D / "data" / "h2a_probe.log"
URL = "https://site-pages.wix.com/_api/wix-public-html-info-webapp/resolve_protected_page_urls"
META = "13cab6fc-e004-4514-aab0-a7cf702047f9"
SITE = "b8aa9fe0-61db-4696-8909-9dd877606aa4"
UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/124.0 Safari/124.0")

CONTROL = [("e3zre", "albatross", "ожидается HIT (известный открытый замок)")]
PROBES = [("jcl9c", "fffffffffff"), ("jcl9c", "01271967"),
          ("zhgsm", "fffffffffff"), ("zhgsm", "01271967"),
          ("y6cd1", "fffffffffff"), ("y6cd1", "01271967")]


def ask(pid: str, pw: str, tries: int = 5):
    body = json.dumps({"metaSiteId": META, "siteId": SITE,
                       "pageId": pid, "password": pw}).encode()
    last = ""
    for a in range(tries):
        req = urllib.request.Request(URL, data=body, headers={
            "Content-Type": "application/json",
            "Origin": "https://www.smithlylemoore.com",
            "Referer": "https://www.smithlylemoore.com/",
            "User-Agent": UA})
        try:
            with urllib.request.urlopen(req, timeout=20) as r:
                d = json.loads(r.read())
            st = "HIT" if d.get("success") else "NO"
            return st, r.status, (d.get("payload") or d.get("errorCode") or "")
        except urllib.error.HTTPError as e:
            if e.code == 403:
                return "NO", 403, "403"
            last = "HTTP %d" % e.code
            if e.code in (429, 500, 502, 503, 504):
                time.sleep(3 + 3 * a)
                continue
            return "ERR", e.code, last
        except Exception as e:  # noqa: BLE001
            last = repr(e)[:120]
            time.sleep(2 + 2 * a)
    return "ERR", 0, last


def main():
    lines = ["h2a probe %s" % time.strftime("%Y-%m-%d %H:%M:%S")]
    ok = False
    for pid, pw, note in CONTROL:
        st, code, info = ask(pid, pw)
        lines.append("CONTROL %s | %r -> %s (HTTP %s) %s ; %s" % (pid, pw, st, code, str(info)[:120], note))
        ok = st == "HIT"
        time.sleep(0.6)
    if not ok:
        lines.append("САМОТЕСТ НЕ ПРОЙДЕН: оракул не подтвердил заведомо верный пароль — "
                     "негативы ниже не имеют силы, прогон остановлен.")
        OUT.write_text("\n".join(lines) + "\n", encoding="utf-8")
        print("\n".join(lines))
        return
    hits = 0
    for pid, pw in PROBES:
        st, code, info = ask(pid, pw)
        if st == "HIT":
            hits += 1
        lines.append("PROBE %s | %r -> %s (HTTP %s) %s" % (pid, pw, st, code, str(info)[:200]))
        print(lines[-1], flush=True)
        time.sleep(0.6)
    lines.append("итог: %d probes, %d HIT, %d NO, %d ERR" % (
        len(PROBES),
        sum(1 for l in lines if l.startswith("PROBE") and " -> HIT" in l),
        sum(1 for l in lines if l.startswith("PROBE") and " -> NO" in l),
        sum(1 for l in lines if l.startswith("PROBE") and " -> ERR" in l)))
    OUT.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print("\n".join(lines[-4:]))


if __name__ == "__main__":
    main()
