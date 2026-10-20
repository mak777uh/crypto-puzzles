# -*- coding: utf-8 -*-
"""Достаёт из архивного Wix-снимка карту pageId -> pageJsonFileName и все текстовые поля.

Использование: python tools/slm_snap_map.py <файл.html> [ещё...]
"""
import io
import json
import os
import re
import sys

PAIR = re.compile(r'"([a-z0-9]{5})"\s*:\s*"144728_([0-9a-f]{32})_(\d)\.json"')
SEO = re.compile(r'"pageUriSEO"\s*:\s*"([^"]{0,80})"')
TXT = re.compile(r'"text"\s*:\s*"((?:[^"\\]|\\.)*)"\s*,', re.S)


def clean(t):
    t = t.replace("\\n", "\n").replace('\\"', '"').replace("\\/", "/").replace("\\u2019", "'")
    t = t.replace("\\u00a0", " ").replace("\\u0026", "&")
    t = re.sub(r"<[^>]+>", " ", t)
    t = re.sub(r"&nbsp;", " ", t)
    return re.sub(r"[ \t]+", " ", t).strip()


def main():
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    acc = {}
    for path in sys.argv[1:]:
        s = io.open(path, encoding="utf-8", errors="replace").read()
        base = os.path.basename(path)
        pairs = [(pid, h, n) for pid, h, n in PAIR.findall(s)]
        print("=" * 76)
        print(base, "карта страниц:", len(pairs))
        for pid, h, n in pairs:
            acc.setdefault(pid, (h, n, base))
        txts = []
        for m in TXT.finditer(s):
            t = clean(m.group(1))
            if t and t not in txts:
                txts.append(t)
        print("текстов:", len(txts))
        for t in txts[:60]:
            print("   TXT |", t[:240].replace("\n", " "))
    print("\n=== СВОДНАЯ КАРТА (pageId -> hash,revision,откуда) ===")
    for pid in sorted(acc):
        h, n, src = acc[pid]
        print("  %-6s %s  rev%s  %s" % (pid, h, n, src))
    out = os.path.join(os.path.dirname(os.path.abspath(sys.argv[0])), "..",
                       "puzzles", "smith-lyle-moore-hunt-2-0-032btc", "data",
                       "h10_wayback", "archived_page_json_map.json")
    io.open(out, "w", encoding="utf-8").write(json.dumps(
        {k: {"hash": v[0], "rev": v[1], "source": v[2]} for k, v in acc.items()},
        indent=1, sort_keys=True))
    print("сохранено:", os.path.normpath(out), len(acc))
    return 0


if __name__ == "__main__":
    sys.exit(main())
