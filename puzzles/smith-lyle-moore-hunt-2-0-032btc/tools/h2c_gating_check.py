"""H2c — проверка структурного утверждения досье «gating server-side» (3–5 GET, без чтения контента).

Зачем. Весь план по zhgsm/jcl9c стоит на том, что содержимое запертых страниц недоступно
без пароля (README строка 41: «gating server-side»). Если это неверно (Wix отдаёт HTML/JSON
страницы и до аутентификации), то стратегия «2600 строк на оракул» неверна по основе,
и об этом надо знать. Проверяем только МЕХАНИЗМ.

Дизайн наблюдения (намеренно не извлекает загадку):
  - CONTROL: публичная страница /treasure-hunt — ждём 200 + ровно один json.z-URL.
  - CONTROL2: известная ЗАПЕРТАЯ страница e3zre (/pirates) по slug: если её HTML отдаёт
    тот же json.z-URL, что и HIT-оракул (922c553e...), гейт клиентский → дыра структурная.
  - PROBE: /raft-escape (zhgsm), /smoke-signals (jcl9c) — пишем только статус, длину,
    число найденных json.z-URL и их хеши, НЕ текст страницы.
Никаких ключей/сидов, никаких трат; 5 запросов, пауза 0,6 с.
"""
from __future__ import annotations

import hashlib
import io
import json
import re
import time
import urllib.error
import urllib.request
from pathlib import Path

D = Path(__file__).resolve().parents[1]
OUT = D / "data" / "h2c_gating.log"
UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/124.0 Safari/124.0")
JSON_RE = re.compile(r"144728_([0-9a-f]{32})_(\d+)\.json\.z")
E3ZRE_HIT_JSON = "922c553ee98a7d1d6703a1a696128d9a"   # из HIT e3zre+albatross (h2a_probe.log)

TARGETS = [("CONTROL /treasure-hunt (публичная)", "treasure-hunt"),
           ("CONTROL2 /pirates (заперта, пароль albatross)", "pirates"),
           ("PROBE /raft-escape (zhgsm)", "raft-escape"),
           ("PROBE /smoke-signals (jcl9c)", "smoke-signals"),
           ("PROBE /pirate-battle (y6cd1)", "pirate-battle")]


def get(url: str):
    req = urllib.request.Request(url, headers={"User-Agent": UA,
                                               "Accept": "text/html,application/xhtml+xml"})
    try:
        with urllib.request.urlopen(req, timeout=25) as r:
            return r.status, r.read()
    except urllib.error.HTTPError as e:
        return e.code, e.read() if hasattr(e, "read") else b""
    except Exception as e:  # noqa: BLE001
        return 0, repr(e)[:150].encode()


def main():
    lines = ["h2c gating probe %s" % time.strftime("%Y-%m-%d %H:%M:%S"),
             "наблюдаем только структуру ответа; текст страницы не извлекается и не пишется"]
    for label, slug in TARGETS:
        code, body = get("https://www.smithlylemoore.com/" + slug)
        hashes = sorted(set(JSON_RE.findall(body.decode("latin-1", "ignore"))))
        # только метаданные: статус, размер, SHA-256 тела, найденные id страниц
        marks = []
        low = body.lower()
        for m in (b"password", b"protected", b"wix-warmup-data", b"pagejsonfile"):
            marks.append("%s=%d" % (m.decode(), low.count(m)))
        lines.append("%s | GET /%s -> HTTP %s, bytes %d, sha256 %s" % (
            label, slug, code, len(body), hashlib.sha256(body).hexdigest()[:16]))
        lines.append("    json.z-страниц: %s" % (hashes if hashes else "нет"))
        lines.append("    маркеры: %s" % " ".join(marks))
        if label.startswith("CONTROL2") and any(h[0] == E3ZRE_HIT_JSON for h in hashes):
            lines.append("    => HTML запертой страницы ссылается на ТОТ ЖЕ json, что и HIT-оракул")
        time.sleep(0.6)
    OUT.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print("\n".join(lines))


if __name__ == "__main__":
    main()
