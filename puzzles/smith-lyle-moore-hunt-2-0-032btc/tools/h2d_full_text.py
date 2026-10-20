# -*- coding: utf-8 -*-
"""H2d-2: полный (не обрезанный) текст 21 публичной страницы + все ссылки/кнопки.

Нужен целиком, потому что самый ценный абзац найден в swidf «End of Treasure Hunt» —
авторы обращаются к «shortcut», и он обрезан на 300 символах.

Вывод: data/h2d_full_text.txt (только читаемый текст, теги вырезаны) и
data/h2d_links.json (кнопка -> пункт назначения, включая resolved pageId).
"""
from __future__ import annotations

import html
import json
import re
from pathlib import Path

D = Path(__file__).resolve().parents[1]
SRC = D / "data" / "h2d_public"
OUTT = D / "data" / "h2d_full_text.txt"
OUTL = D / "data" / "h2d_links.json"
TITLES = json.loads((D / "data" / "h2c_pagemap.json").read_text("utf-8"))


def strip(s: str) -> str:
    s = re.sub(r"<br\s*/?>", "\n", s)
    s = re.sub(r"</(p|h[1-6]|div|li)>", "\n", s)
    s = re.sub(r"<[^>]+>", "", s)
    s = html.unescape(html.unescape(s))
    return re.sub(r"[ \t]+", " ", s).strip()


def walk(node, acc, links, path=""):
    if isinstance(node, dict):
        t = node.get("type")
        if t == "StyledText" or "text" in node:
            v = node.get("text")
            if isinstance(v, str) and v.strip():
                acc.append(strip(v))
        if t in ("Link", "PageLink", "AnchorLink", "Button") or "pageId" in node or "link" in node:
            pid = node.get("pageId") or node.get("link")
            lab = node.get("label") or (strip(node.get("text", ""))[:60] if node.get("text") else "")
            if pid or lab:
                links.append({"type": t, "label": lab, "to": pid,
                              "anchor": node.get("anchorId") or node.get("corId") or ""})
        for k, v in node.items():
            walk(v, acc, links, path + "/" + str(k))
    elif isinstance(node, list):
        for v in node:
            walk(v, acc, links, path)
    return acc


def main():
    tl, alll = [], {}
    for p in sorted(SRC.glob("*.json")):
        pid = p.stem
        try:
            data = json.loads(p.read_text("utf-8", "ignore"))
        except Exception as e:  # noqa: BLE001
            tl.append("\n\n##### %s (%s) НЕ JSON: %r" % (pid, TITLES.get(pid, {}).get("title", ""), e))
            continue
        acc, links = [], []
        walk(data, acc, links)
        seen, uniq = set(), []
        for x in acc:
            if x and x not in seen:
                seen.add(x)
                uniq.append(x)
        title = TITLES.get(pid, {}).get("title", "")
        tl.append("\n\n##### %s | %s | %s\n%s" % (
            pid, title, TITLES.get(pid, {}).get("seo", ""),
            "\n---\n".join(uniq) if uniq else "(текстовых блоков нет)"))
        for L in links:
            alll.setdefault(pid, []).append(L)
    OUTT.write_text("".join(tl), encoding="utf-8")
    OUTL.write_text(json.dumps(alll, ensure_ascii=False, indent=1), encoding="utf-8")
    print("страниц:", len(tl), "| блоков ссылок:", sum(len(v) for v in alll.values()))
    print("артефакты: data/h2d_full_text.txt, data/h2d_links.json")


if __name__ == "__main__":
    main()
