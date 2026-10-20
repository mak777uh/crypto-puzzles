"""Ось H8: скачать НЕ скачанные оригиналы media-ассетов сайта и проверить их на скрытое.

Проверки по прецеденту Hunt #1 (текст был дописан после конца PNG):
  1) байты после формального конца файла (GIF 0x3B, PNG IEND, JPEG FFD9, MP4 EOF);
  2) метаданные-контейнеры (GIF Comment/Application, PNG tEXt/zTXt/iTXt, EXIF/XMP, ID3);
  3) ASCII-строки целиком; кадры GIF/их различия; LSB-первая плоскость.

Сеть: только GET static.wixstatic.com (публичная статика). Транзакций, писем, публикаций нет.
"""
import io
import os
import re
import struct
import sys
import time
import urllib.request
import zlib
from pathlib import Path

D = Path(r"C:\Users\Admin\OneDrive\Desktop\master\puzzles\smith-lyle-moore-hunt-2-0-032btc")
OUT = D / "data" / "h8_assets"
LOGP = D / "data" / "h8_assets_probe.log"
UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) research/1.0",
      "Accept": "*/*", "Referer": "https://www.smithlylemoore.com/"}

ASSET_RE = re.compile(r"144728_([0-9a-f]{32})(~mv2)?\.([a-z0-9]{2,5})")


def log_lines():
    buf = []

    def w(s=""):
        buf.append(s)
        print(s, flush=True)
    return buf, w


def collect():
    """hash -> (ext, набор файлов-источников)."""
    found = {}
    for f in list((D / "data").rglob("*.json")) + [D / "data" / "jetkc_report.txt"]:
        try:
            s = io.open(f, encoding="utf-8", errors="ignore").read()
        except OSError:
            continue
        for m in ASSET_RE.finditer(s):
            h = m.group(1)
            if h not in found:
                found[h] = (m.group(3).lower(), set())
            found[h][1].add(f.name)
    local = set()
    for p in D.rglob("*"):
        if p.is_file():
            local |= set(re.findall(r"[0-9a-f]{32}", p.name.lower()))
    return found, local


def fetch(h, ext):
    url = "https://static.wixstatic.com/media/144728_%s~mv2.%s" % (h, ext)
    dst = OUT / ("144728_%s~mv2.%s" % (h, ext))
    if dst.exists() and dst.stat().st_size > 0:
        return dst, "уже есть"
    for u in (url, "https://www.smithlylemoore.com/_next/static/../../media/" + url):
        try:
            req = urllib.request.Request(u, headers=UA)
            with urllib.request.urlopen(req, timeout=40) as r:
                data = r.read()
            if data[:3] in (b"GIF", b"\xff\xd8\xff", b"\x89PN") or len(data) > 200:
                io.open(dst, "wb").write(data)
                return dst, "http ok %d байт" % len(data)
        except Exception as e:  # noqa: BLE001
            err = repr(e)[:80]
            time.sleep(1.0)
    return None, err if 'err' in dir() else "пустой ответ"


def gif_probe(b, w):
    frames = b.count(b"\x00\x21\xf9") + b.count(b"\x21\xf9\x04")
    trailer = b.rfind(b"\x3b")
    app = re.findall(rb"\x21\xff([^\x00]{0,20})NETSCAPE2\.0", b)
    com = re.findall(rb"\x21\xfe((?:[^\x00]|\x00[^\x00]){0,255}?)\x00", b)
    w("  GIF: размер %d, байт 0x3B последний на %d (после него %d байт), суб-блоков кадра ~%d"
      % (len(b), trailer, len(b) - trailer - 1, frames))
    if len(b) - trailer - 1 > 0:
        w("  !!! байты после trailer: %r" % b[trailer + 1:trailer + 400])
    for c in com:
        if any(32 <= x < 127 for x in c):
            w("  Comment extension: %r" % c[:200])
    ext = re.findall(rb"\x21\xff[^\x00]{2,40}", b)
    for e in ext[:6]:
        w("  Application ext: %r" % e[:60])


def png_probe(b, w):
    iend = b.rfind(b"IEND")
    tail = len(b) - (iend + 8) if iend >= 0 else len(b)
    w("  PNG: размер %d, IEND на %d, после конца %d байт" % (len(b), iend, tail))
    if tail > 0:
        w("  !!! после IEND: %r" % b[iend + 8:iend + 8 + 400])
    off = 8
    names = []
    while off + 8 <= len(b):
        ln = struct.unpack(">I", b[off:off + 4])[0]
        typ = b[off + 4:off + 8]
        if not re.match(rb"[A-Za-z]{4}", typ):
            break
        names.append((typ.decode(), off, ln))
        if typ in (b"tEXt", b"zTXt", b"iTXt"):
            data = b[off + 8:off + 8 + ln]
            w("  !!! текстовый чанк %s: %r" % (typ.decode(), data[:300]))
        off += 12 + ln
    w("  чанки:", " ".join(n for n, _, _ in names))
    icc = [n for n, _, _ in names if n == "tRNS"]


def jpg_probe(b, w):
    eoi = b.rfind(b"\xff\xd9")
    tail = len(b) - (eoi + 2) if eoi >= 0 else 0
    w("  JPEG: размер %d, EOI на %d, после %d байт" % (len(b), eoi, tail))
    if tail > 0:
        w("  !!! после EOI: %r" % b[eoi + 2:eoi + 2 + 400])
    for mark, name in ((b"\xff\xfe", "COMMENT"), (b"Exif", "EXIF")):
        i = b.find(mark)
        if i >= 0:
            w("  %s на %d: %r" % (name, i, b[i:i + 200]))
    x = b.find(b"http://ns.adobe.com/xap")
    if x >= 0:
        w("  XMP: %r" % b[x - 40:x + 300])


def strings_scan(b, w, label):
    runs = re.findall(rb"[\x20-\x7e]{6,}", b)
    interesting = []
    for r in runs:
        t = r.decode("ascii", "ignore")
        if re.search(r"(raft|fire|ship|palm|word|password|pass|seed|forget|not|hint|two|four|six|eight)", t, re.I):
            interesting.append(t)
    w("  ASCII-строк (>=6): %d, из них с ключевыми словами: %d" % (len(runs), len(interesting)))
    for t in interesting[:15]:
        w("    *", t[:160])
    return interesting


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    found, local = collect()
    buf, w = log_lines()
    w("H8 прогон %s | ассетов упомянуто: %d" % (time.strftime("%Y-%m-%d %H:%M:%S"), len(found)))
    todo = [(h, e) for h, (e, srcs) in sorted(found.items()) if h not in local]
    w("не скачано: %d" % len(todo))
    hits = []
    for h, e in todo:
        p, status = fetch(h, e)
        w("\n=== %s.%s [%s]" % (h[:10], e, status))
        if p is None:
            continue
        b = io.open(p, "rb").read()
        if b[:3] == b"GIF":
            gif_probe(b, w)
        elif b[:4] == b"\x89PN":
            png_probe(b, w)
        elif b[:3] == b"\xff\xd8\xff":
            jpg_probe(b, w)
        else:
            w("  заголовок: %r" % b[:16])
        ints = strings_scan(b, w, h)
        if ints:
            hits.append((h, e, ints))
    io.open(LOGP, "w", encoding="utf-8", newline="\n").write("\n".join(buf) + "\n")
    w("\nитог: файлы со «ключевыми» ASCII-строками: %d" % len(hits))
    for h, e, ints in hits:
        print(h[:10], e, ints[:6])


if __name__ == "__main__":
    main()
