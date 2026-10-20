"""Корректный дифф: ассеты сайта 144728_<32hex> против локальных файлов (по голому 32-hex)."""
import io
import re
from pathlib import Path

D = Path(r"C:\Users\Admin\OneDrive\Desktop\master\puzzles\smith-lyle-moore-hunt-2-0-032btc")
HEX32 = re.compile(r"\b([0-9a-f]{32})\b")


def main():
    mentioned = {}
    for f in (D / "data").rglob("*.json"):
        try:
            s = io.open(f, encoding="utf-8", errors="ignore").read()
        except OSError:
            continue
        if not s.startswith("{") or "144728_" not in s:
            pass
        for m in re.finditer(r"144728_([0-9a-f]{32})", s):
            mentioned.setdefault(m.group(1), set()).add(f.name)
        for m in re.finditer(r'"([0-9a-f]{6}_[0-9a-f]{32}~mv2\.[a-z0-9]{2,5})"', s):
            mentioned.setdefault(m.group(1).split("_", 1)[1].split("~")[0], set()).add(f.name)

    local = {}
    for p in D.rglob("*"):
        if p.is_file():
            for h in HEX32.findall(p.name.lower()):
                local.setdefault(h, p.name)
            for h in HEX32.findall(p.stem.lower()):
                local.setdefault(h, p.name)

    print("ассетов упомянуто:", len(mentioned), "| хешей в локальных именах:", len(local))
    print("\n=== НЕ скачано:")
    miss = []
    for h, srcs in sorted(mentioned.items()):
        if h not in local:
            miss.append(h)
            print("  %s   <- %s" % (h, ",".join(sorted(srcs))[:70]))
    print("\nвсего не скачано:", len(miss), "из", len(mentioned))
    ext = {}
    for f in (D / "data").rglob("*.json"):
        s = io.open(f, encoding="utf-8", errors="ignore").read()
        for m in re.finditer(r"144728_([0-9a-f]{32})(?:~mv2)?\.([a-z0-9]{2,5})", s):
            ext[m.group(1)] = m.group(2)
    print("\n=== расширения отсутствующих (для URL):")
    for h in miss:
        print("  https://static.wixstatic.com/media/144728_%s~mv2.%s   (%s)" % (h, ext.get(h, "?"), ext.get(h, "?")))


if __name__ == "__main__":
    main()
