#!/usr/bin/env python3
"""Разбор сохранённой HTML-страницы bitcointalk topic 155054
(Hal Finney, "Bitcoin and me", 2013-05-27) — исходный текст для
правила перевода регистра (case-flip rule) Block 77 Stage One / Grycoin-2.

OCP этот текст не шипит ("third-party content"), но пишет, что любой может
его подставить сам в apply_stage_one_rule(). Кладём в data/ как артефакт.

Выход: data/btt_155054.md  (вход: data/btt_155054.html)
"""
import html
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(os.path.dirname(HERE), "data")
SRC = os.path.join(DATA, "btt_155054.html")
OUT = os.path.join(DATA, "btt_155054.md")

POST_MARK = '<div class="post">'
DATE_RE = re.compile(r"([A-Z][a-z]{2,8} \d{1,2}, \d{4}, \d{1,2}:\d{2}:\d{2} (?:AM|PM))")
NUM_RE = re.compile(r"#(\d+)</a>")
USER_RE = re.compile(r"u=(\d+)")


def strip_tags(s):
    s = re.sub(r"<br\s*/?>", "\n", s, flags=re.I)
    s = re.sub(r"</?(div|p|tr|td|table|blockquote|span|font|i|b|u|small|big|a)[^>]*>", "", s, flags=re.I)
    s = re.sub(r"<[^>]+>", "", s)
    s = html.unescape(s)
    s = s.replace("\r\n", "\n").replace("\r", "\n")
    s = re.sub(r"[ \t]+\n", "\n", s)
    s = re.sub(r"\n{3,}", "\n\n", s)
    return s.strip()


def main():
    raw = open(SRC, encoding="utf-8", errors="replace").read()
    marks = [m.start() for m in re.finditer(re.escape(POST_MARK), raw)]
    out = [
        '# bitcointalk topic 155054 — Hal Finney, "Bitcoin and me" (2013-05-27)',
        "",
        "Источник: https://bitcointalk.org/index.php?topic=155054.0",
        "Сохранено: 2026-10-17 (Big Pickle, OpenCode/Windows); сырьё — `btt_155054.html`.",
        "Назначение: исходный текст правила перевода регистра (case-flip), которое",
        "AoiNakamoto применяет в Block 77 Stage One и объяснил на примере Grycoin-2.",
        "OCP этот текст не шипит (third-party content) — из-за этого воспроизведение",
        "решённого соседа Block 77 Stage One в репозитории невозможно без подстановки.",
        "",
    ]
    n = 0
    for pos in marks:
        start = pos + len(POST_MARK)
        end = raw.find("</div>", start)
        if end < 0:
            end = len(raw)
        text = strip_tags(raw[start:end])
        if not text:
            continue
        n += 1
        pre = raw[max(0, pos - 4000):pos]
        nums = NUM_RE.findall(pre)
        users = USER_RE.findall(pre)
        dates = DATE_RE.findall(pre)
        meta = []
        if nums:
            meta.append(f"сообщение #{nums[-1]}")
        if users:
            meta.append(f"u={users[-1]}")
        if dates:
            meta.append(dates[-1])
        out.append(f"## Сообщение {n}" + (f" — {', '.join(meta)}" if meta else ""))
        out.append("")
        out.append(text)
        out.append("")
    with open(OUT, "w", encoding="utf-8") as f:
        f.write("\n".join(out))
    print(f"messages: {n} -> {OUT} ({os.path.getsize(OUT)} bytes)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
