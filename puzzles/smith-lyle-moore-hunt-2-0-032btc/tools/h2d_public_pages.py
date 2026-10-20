# -*- coding: utf-8 -*-
"""H2d: читаем 21 ПУБЛИЧНУЮ страницу сайта (из publicPageIds) — контент лежит в открытом
CDN-JSON, пароль не нужен. Досье (Hark, 16.10) переписывало только защищённые 46/57 и
никогда не перечисляло публичные страницы, хотя их URL прямо в HTML любой страницы.

Что ищем: (1) текст bbryd «it's not a red herring but it's a red herring»; (2) /get-hints
(ay4p6) — как именно авторы выдают подсказки; (3) swidf «End of Treasure Hunt» и jxam2
«Heaven Is Close» — статус охоты; (4) y9iq2 — в карте title нет, неизвестная; (5) zren* —
лайтбоксы библиотеки; (6) всё, где встречается 12-е слово / passphrase / «final step».

Артефакты: data/h2d_public/*.json (сырой JSON), data/h2d_texts.txt (извлечённый текст).
"""
from __future__ import annotations

import json
import re
import time
import urllib.request
from pathlib import Path

D = Path(__file__).resolve().parents[1]
CACHE = D / "data" / "h2c_cache"
OUTD = D / "data" / "h2d_public"
OUTT = D / "data" / "h2d_texts.txt"
UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/124.0 Safari/124.0")
BASE = "https://pages.parastorage.com/sites/"
# страницы лежат в двух местах HTML: warmup pagesMap (pageJsonFileName без расширения) и
# карта "<pid>":"<hash>_2.json". Берём обе; URL собирается как <имя>.json.z?v=3 (проверено).
JSON_RE = re.compile(r'"([a-z0-9]{5})"\s*:\s*"(144728_[0-9a-f]{32}_\d+)(?:\.json[^"]*)?"')


def texts(node, acc):
    if isinstance(node, dict):
        for k, v in node.items():
            if k in ("text", "title", "description", "alt", "link", "href", "src", "fileName",
                     "uri", "pageId", "seoTitle", "label", "tooltip", "placeholder", "value") \
                    and isinstance(v, str) and v.strip():
                acc.append((k, v.strip()[:400]))
            else:
                texts(v, acc)
    elif isinstance(node, list):
        for v in node:
            texts(v, acc)


def main():
    OUTD.mkdir(parents=True, exist_ok=True)
    s = (CACHE / "treasure-hunt.html").read_text("latin-1", "ignore")
    pairs = {m.group(1): m.group(2) for m in JSON_RE.finditer(s)}
    prot = set(json.loads((D / "data" / "h2c_site_locks.json")
                          .read_text("utf-8"))["passwordProtected"])
    leak = sorted(set(pairs) & prot)
    lines = ["h2d public pages %s" % time.strftime("%Y-%m-%d %H:%M:%S"),
             "pageId->json в HTML: %d" % len(pairs),
             "защищённые страницы с открытым json-именем (тест «gating server-side»): %s"
             % (leak if leak else "нет ни одной")]
    for pid, fn in sorted(pairs.items()):
        p = OUTD / (pid + ".json")
        if not p.exists():
            try:
                body = urllib.request.urlopen(
                    urllib.request.Request(BASE + fn + ".json.z?v=3",
                                           headers={"User-Agent": UA}),
                    timeout=30).read()
                p.write_bytes(body)
            except Exception as e:  # noqa: BLE001
                lines.append("%s ERROR %s" % (pid, repr(e)[:120]))
                time.sleep(0.4)
                continue
            time.sleep(0.4)
        try:
            data = json.loads(p.read_text("utf-8", "ignore"))
        except Exception as e:  # noqa: BLE001
            lines.append("%s НЕ-JSON (%s)" % (pid, repr(e)[:60]))
            continue
        acc = []
        texts(data, acc)
        seen, uniq = set(), []
        for k, v in acc:
            if (k, v) not in seen:
                seen.add((k, v))
                uniq.append((k, v))
        lines.append("\n=== %s (%s) полей-текстов: %d" % (pid, fn, len(uniq)))
        for k, v in uniq:
            if k in ("description", "title", "pageId", "src", "fileName"):
                continue
            lines.append("   [%s] %s" % (k, v.replace("\n", " ")[:300]))
    OUTT.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print("\n".join(lines[:1]))
    print("артефакт: data/h2d_texts.txt, страниц скачано: %d" % len(list(OUTD.glob("*.json"))))


if __name__ == "__main__":
    main()
