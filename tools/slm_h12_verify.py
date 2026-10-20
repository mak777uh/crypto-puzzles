# -*- coding: utf-8 -*-
"""H12: корректная распаковка снимков Wayback (brotli/gzip) и witness-таблица.

Первый замер в slm_h12_lockedurls.py считал «слова» по сжатым байтам — поэтому
10 снимков 2026-03-06 выглядели «без гейта, 1800–2000 слов». Здесь распаковка
настоящая, и по ней видно реальный статус каждой страницы.
"""
import brotli
import gzip
import json
import os
import re
import zlib

D = r"C:\Users\Admin\OneDrive\Desktop\master\puzzles\smith-lyle-moore-hunt-2-0-032btc\data\h12_lockedurls"
TXT_FIELD = re.compile(r'"text"\s*:\s*"(.{20,400}?)"')


def decode(b):
    if b[:2] == b"\x1f\x8b":
        try:
            return gzip.decompress(b), "gzip"
        except Exception:
            pass
    try:
        return brotli.decompress(b), "br"
    except Exception:
        pass
    for w in (15, -15):
        try:
            return zlib.decompress(b, w), "deflate"
        except Exception:
            pass
    return b, "raw"


def visible(h):
    b = re.sub(r"(?is)<head.*?</head>", " ", h)
    b = re.sub(r"(?is)<(script|style|noscript|svg)[^>]*>.*?</\1>", " ", b)
    b = re.sub(r"(?is)<[^>]+>", " ", b)
    return re.sub(r"\s+", " ", b.replace("&nbsp;", " ")).strip()


def main():
    res = json.load(open(os.path.join(D, "result.json"), encoding="utf-8"))
    rows = []
    for r in res["wayback"]:
        for s in r.get("snap", []):
            if s["ts"] == "timestamp":
                continue
            f = os.path.join(D, "WB_%s_%s.html" % (r["id"], s["ts"]))
            if not os.path.exists(f):
                continue
            raw = open(f, "rb").read()
            b, enc = decode(raw)
            h = b.decode("utf-8", "replace")
            rows.append({
                "seo": r["seo"], "id": r["id"], "title": r["title"], "ts": s["ts"],
                "enc": enc, "bytes_raw": len(raw), "bytes": len(b),
                "gated": 1 if "protectedPageResolverUrl" in h else 0,
                "words": len(visible(h).split()),
                "textfields": len(TXT_FIELD.findall(h)),
            })
    rows.sort(key=lambda x: (x["seo"], x["ts"]))
    print("%-42s %-6s %-15s %-5s %9s %6s %6s %5s" % (
        "slug", "id", "ts", "enc", "bytes", "гейт", "слов", "пол."))
    for t in rows:
        print("%-42s %-6s %-15s %-5s %9d %6d %6d %5d" % (
            t["seo"][:42], t["id"], t["ts"], t["enc"], t["bytes"],
            t["gated"], t["words"], t["textfields"]))
    ung = [t for t in rows if not t["gated"]]
    print("\nснимков: %d | без гейта после распаковки: %d | %s" % (
        len(rows), len(ung), [t["seo"] for t in ung]))
    with_content = [t for t in rows if t["words"] > 40 or t["textfields"] > 0]
    print("с реальным текстом (>40 слов или есть поля text): %d | %s" % (
        len(with_content), [(t["seo"], t["words"], t["textfields"]) for t in with_content][:12]))
    out = os.path.join(D, "witness.json")
    json.dump({"note": "корректная распаковка (brotli) снимков H12; первичный замер слов был по сжатым байтам",
               "rows": rows, "ungated": ung, "with_content": with_content},
              open(out, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print("witness.json:", os.path.getsize(out), "B")


if __name__ == "__main__":
    main()
