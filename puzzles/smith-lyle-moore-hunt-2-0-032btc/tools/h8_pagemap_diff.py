"""Сравнение карты страниц Wix: снимок 18.10 (data/h2c_pagemap.json) против текущего HTML.

Цель — заметить новые/переименованные страницы (у авторов есть привычка добавлять
подсказки постфактум). Только чтение локальных файлов; сеть — отдельным шагом.
"""
import io
import json
import re
from pathlib import Path

D = Path(r"C:\Users\Admin\OneDrive\Desktop\master\puzzles\smith-lyle-moore-hunt-2-0-032btc\data")
HTML = D / "h2c_cache" / "raft-escape.html"

CLASS = r'((?:[^"\\]|\\.){1,120})'


def main():
    s = io.open(HTML, encoding="utf-8", errors="ignore").read()
    old = json.load(io.open(D / "h2c_pagemap.json", encoding="utf-8"))
    print("снимок 18.10: страниц в pagemap =", len(old))

    ids = set(re.findall(r'"([a-z0-9]{5})"', s))
    print("5-символьных id в HTML:", len(ids))
    new = sorted(ids - set(old))
    print("нет в старом pagemap:", len(new), new)

    # пары pageId -> title/seo из тёплых данных Wix
    pairs = re.findall(r'"pageId":\s*"([a-z0-9]{5})"' + r'.{0,600}?' + r'"title":\s*"' + CLASS + r'"', s, re.S)
    print("пар pageId-title:", len(pairs))

    titles = list(dict.fromkeys(re.findall(r'"title":\s*"' + CLASS + '"', s)))
    print("уникальных title в HTML:", len(titles))
    old_titles = {v.get("title") for v in old.values()}
    unknown = [t for t in titles if t not in old_titles]
    print("title, которых нет в старом pagemap:", len(unknown))
    for t in unknown:
        print("   +", t)

    seo = list(dict.fromkeys(re.findall(r'"pageUriSEO":\s*"' + CLASS + '"', s)))
    print("уникальных pageUriSEO:", len(seo))
    old_seo = {v.get("seo") for v in old.values()}
    useo = [x for x in seo if x not in old_seo]
    print("seo, которых нет в старом pagemap:", len(useo))
    for x in useo:
        print("   +", x)


if __name__ == "__main__":
    main()
