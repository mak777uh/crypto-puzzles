"""H2c-2: извлекаем ИЗ УЖЕ СКАЧАННОГО HTML только служебные поля (URL конфигов страниц).

Никакого текста загадок: поле pageJsonFile / pageId / url — это метаданные роутера Wix,
они нужны ровно для одного вывода: доступен ли контент запертой страницы публично
(гейт клиентский) или нет (гейт серверный). Если доступен — решение «читать/не читать»
принимает координатор, скрипт контент не грузит.

HTML берётся из локального кэша h2c_cache/ (скачан h2c_gating_check.py, 15:02).
"""
from __future__ import annotations

import io
import re
from pathlib import Path

D = Path(__file__).resolve().parents[1]
CACHE = D / "data" / "h2c_cache"
OUT = D / "data" / "h2c_fields.log"

PAGE_RE = re.compile(r'"pageId"\s*:\s*"([^"]{1,40})"')
JSONURL_RE = re.compile(r'"pageJsonFile"\s*:\s*"([^"]{0,200})"')
SEO_RE = re.compile(r'"(pageUriSEO|title)\s*"\s*:\s*"([^"]{0,80})"')
LOCKED_RE = re.compile(r'(locked|passwordRequired|password-?protected|protectedPage)', re.I)


def fields(label: str, slug: str) -> None:
    p = CACHE / (slug + ".html")
    if not p.exists():
        OUT.write_text("нет кэша %s — сначала скачать\n" % p, encoding="utf-8")
        return
    s = p.read_text("latin-1", "ignore")
    out = ["== %s (%s)  bytes=%d" % (label, slug, len(s))]
    out.append("   pageId уникальные: %s" % sorted(set(PAGE_RE.findall(s)))[:40])
    jf = JSONURL_RE.findall(s)
    out.append("   pageJsonFile: %d шт, уникальные: %s" % (len(jf), sorted(set(jf))[:6]))
    out.append("   .json.z/.json в теле: %s" % sorted({m for m in re.findall(r'[\w./:-]{6,}\.json(?:\.z)?', s)})[:8])
    out.append("   маркеры лок-скрина: %s" % sorted({m.group(0).lower() for m in LOCKED_RE.finditer(s)}))
    # только длина текстовых доменов, не их содержимое
    out.append("   SEO/title полей: %d" % len(SEO_RE.findall(s)))
    print("\n".join(out))


def main():
    CACHE.mkdir(parents=True, exist_ok=True)
    lines = []
    for label, slug in [("CONTROL публичная", "treasure-hunt"),
                        ("CONTROL2 заперта-известно", "pirates"),
                        ("PROBE zhgsm", "raft-escape"),
                        ("PROBE jcl9c", "smoke-signals")]:
        p = CACHE / (slug + ".html")
        if not p.exists():
            lines.append("%s: кэш отсутствует (%s) — пропуск" % (label, p))
            continue
        s = p.read_text("latin-1", "ignore")
        blk = ["== %s (%s) bytes=%d" % (label, slug, len(s))]
        blk.append("   pageId уникальные: %s" % (sorted(set(PAGE_RE.findall(s)))[:40]))
        jf = JSONURL_RE.findall(s)
        blk.append("   pageJsonFile %d шт: %s" % (len(jf), sorted(set(jf))[:6]))
        blk.append("   json-файлы в теле: %s" % sorted({m for m in re.findall(r'[\w./:-]{6,}\.json(?:\.z)?', s)})[:8])
        blk.append("   лок-маркеры: %s" % sorted({m.group(0).lower() for m in LOCKED_RE.finditer(s)}))
        lines.append("\n".join(blk))
    OUT.write_text("\n\n".join(lines) + "\n", encoding="utf-8")
    print("\n\n".join(lines))


if __name__ == "__main__":
    main()
