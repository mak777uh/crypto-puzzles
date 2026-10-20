"""Какие media-ассеты сайта реально отсутствуют в data/ (по 32- hex хешу имени).

Ключ: автор Hunt #1 спрятал первую подсказку в байтах после конца PNG. Значит каждый
не скачанный ассет — непроверенный носитель. Здесь — точный список отсутствующих.
"""
import io
import re
from pathlib import Path

D = Path(r"C:\Users\Admin\OneDrive\Desktop\master\puzzles\smith-lyle-moore-hunt-2-0-032btc")

NAME_RE = re.compile(r"([0-9a-f]{6}_?[0-9a-f]{32})", re.I)


def main():
    # все хеши, упомянутые в дампах страниц
    mentioned = {}
    for f in list((D / "data").rglob("*.json")) + [D / "data" / "jetkc_report.txt"]:
        try:
            s = io.open(f, encoding="utf-8", errors="ignore").read()
        except OSError:
            continue
        for m in NAME_RE.findall(s):
            mentioned.setdefault(m.lower(), set()).add(f.name)

    # что лежит локально (по всем подпапкам)
    local_bytes = set()
    for p in D.rglob("*"):
        if p.is_file():
            n = p.name.lower()
            for h in NAME_RE.findall(n):
                local_bytes.add(h.lower())
            local_bytes.add(n)

    print("упомянуто хешей ассетов:", len(mentioned), "| локально идентификаторов:", len(local_bytes))
    missing = sorted(h for h in mentioned if h not in local_bytes and not any(h in x for x in local_bytes))
    print("\n=== ассеты, которых НЕТ в data/:", len(missing))
    for h in missing:
        print("  %s   (из: %s)" % (h, ",".join(sorted(mentioned[h]))[:60]))

    # определить расширение по строке URL рядом
    print("\n=== попытки восстановить полное имя файла с расширением ===")
    for f in list((D / "data").rglob("*.json")):
        s = io.open(f, encoding="utf-8", errors="ignore").read()
        for m in re.finditer(r'"([0-9a-f]{6}_[0-9a-f]{32}(?:~mv2)?\.[a-z0-9]{2,5})"', s, re.I):
            nm = m.group(1).lower()
            core = nm.split("~")[0]
            if core in missing:
                print("   https://static.wixstatic.com/media/%s  [%s]" % (nm, f.name))


if __name__ == "__main__":
    main()
