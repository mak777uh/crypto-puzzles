"""Полный реестр медиа-ссылок сайта по загруженным page JSON + отметка, что скачано.

Идея: в Hunt #1 автор спрятал первую подсказку в байтах, дописанных ПОСЛЕ конца PNG
(tail -c 233). Значит любой медиа-файл сайта — потенциальный носитель. Здесь — все
URL из локальных дампов страниц и список тех, которых физически нет в data/.
"""
import io
import json
import re
from pathlib import Path
from urllib.parse import unquote

D = Path(r"C:\Users\Admin\OneDrive\Desktop\master\puzzles\smith-lyle-moore-hunt-2-0-032btc\data")

MEDIA_RE = re.compile(r"https?://[^\s\"'\\)]+?(?:wixstatic|parastorage|cloudflare|youtube)[^\s\"'\\)]*", re.I)
BARE_RE = re.compile(r'"((?:[0-9a-f]{6}_[0-9a-f]{32}(?:~mv2)?\.[a-z0-9]{2,4}|[0-9a-f]{6}_[0-9a-f]{32}~mv2\.[a-z0-9]{2,4}))"')


def read(p):
    try:
        return io.open(p, encoding="utf-8", errors="ignore").read()
    except OSError:
        return ""


def main():
    files = [D / "jetkc_page.json", D / "c2ozw_page.json"]
    files += list((D / "h2d_public").glob("*.json"))
    blobs = {}
    for f in files:
        if f.exists():
            blobs[f.name] = read(f)

    urls = set()
    for name, s in blobs.items():
        for m in set(MEDIA_RE.findall(s)):
            urls.add((name, m))
    bare = set()
    for name, s in blobs.items():
        for m in set(BARE_RE.findall(s)):
            bare.add((name, m))

    print("=== полные media URL:", len(urls))
    for name, u in sorted(urls):
        print("  %-18s %s" % (name, u[:150]))
    print("\n=== «голые» имена файлов media (без домена):", len(bare))
    for name, b in sorted(bare):
        print("  %-18s %s" % (name, b))

    have = []
    for p in D.rglob("*"):
        if p.is_file() and p.suffix.lower() in (".gif", ".png", ".jpg", ".jpeg", ".mp4", ".mp3", ".mov", ".wav", ".webp"):
            have.append(p.name.lower())
    print("\n=== локально лежащие медиа-файлы:", len(have))

    print("\n=== URL, которых НЕТ в data/ (по хешу имени файла):")
    missing = []
    for name, u in sorted(urls):
        last = unquote(u.split("/")[-1]).split("?")[0].lower()
        core = re.sub(r"~mv2\d?\.([a-z0-9]+)$", r".\1", last)
        if not any(core in h or h in core or (len(core) > 24 and core[6:38] in h) for h in have):
            missing.append((name, u))
    for name, u in missing:
        print("  MISS %-18s %s" % (name, u[:160]))
    print("\nитого не скачано:", len(missing))


if __name__ == "__main__":
    main()
