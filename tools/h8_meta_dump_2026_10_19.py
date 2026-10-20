# -*- coding: utf-8 -*-
"""H8 шаг 3: полный дамп метаданных (XMP/EXIF/tEXt/ID3) по всем ассетам H8 +
докачка двух mp3 через music.wixstatic.com (хост, названный в write-up Hunt #1).
Только GET статики; транзакций/писем нет."""
import re, os, json, pathlib, binascii, urllib.request, time, zlib

ROOT = pathlib.Path(r"C:/Users/Admin/OneDrive/Desktop/master/puzzles/smith-lyle-moore-hunt-2-0-032btc")
DATA = ROOT / "data"
OUT = DATA / "h8_assets"
LOGP = DATA / "h8_meta.log"
lines = []

def w(*a):
    s = " ".join(str(x) for x in a)
    lines.append(s)
    print(s, flush=True)
    with open(LOGP, "w", encoding="utf-8", newline="") as fh:
        fh.write("\n".join(lines) + "\n")

def clean(b):
    return re.sub(rb"[^\x20-\x7e]+", b" ", b).decode("ascii", "replace")

def get(url, extra=None):
    h = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/126 Safari/537.36",
         "Referer": "https://www.smithlylemoore.com/"}
    if extra:
        h.update(extra)
    req = urllib.request.Request(url, headers=h)
    with urllib.request.urlopen(req, timeout=90) as r:
        return r.read()

w("H8 шаг 3 — метаданные. %s UTC" % time.strftime("%Y-%m-%d %H:%M", time.gmtime()))
w("=" * 70)

# --- 1) mp3 с audio-хоста Wix (403 на static.wixstatic) ---
for h in ("019f7f75b73e472fb49ea839bf365421", "0c8601557b264778a4388e93befab989"):
    name = "144728_%s.mp3" % h
    p = OUT / name
    if p.exists() and p.stat().st_size > 1000:
        w("[mp3] %s уже есть (%d)" % (name, p.stat().st_size))
        continue
    urls = [
        "https://music.wixstatic.com/mp3/144728_%s-320.mp3" % h,
        "https://music.wixstatic.com/mp3/144728_%s.mp3" % h,
        "https://music.wixstatic.com/mp3/144728_%s-128.mp3" % h,
        "https://download.wixstatic.com/mp3/144728_%s-320.mp3" % h,
    ]
    ok = False
    for u in urls:
        try:
            d = get(u)
            if len(d) > 1000:
                p.write_bytes(d)
                w("[mp3] OK %s <- %s  %d байт" % (name, u, len(d)))
                ok = True
                break
        except Exception as e:
            w("[mp3] fail %s : %s" % (u.split("/")[2], str(e)[:60]))
    if not ok:
        w("[mp3] %s — недоступен ни с одного хоста" % name)
    time.sleep(0.4)

# --- 2) дампы метаданных ---
XMP_TAGS = re.compile(rb"<[^>]*>|[\x00-\x1f]")

def dump_xmp(x, label):
    txt = XMP_TAGS.sub(b"\n", x)
    s = clean(txt)
    vals = [re.sub(r"\s+", " ", v).strip() for v in s.split("\n")]
    vals = [v for v in vals if len(v) > 1]
    w("    %s (%d байт) -> %d строк" % (label, len(x), len(vals)))
    for v in vals:
        w("      | %s" % v[:200])

def gif_meta(b, name):
    pos = 13
    flags = b[10]
    if flags & 0x80:
        pos += 3 * (2 << (flags & 7))
    n = len(b)
    out = []
    while pos < n:
        blk = b[pos]
        if blk == 0x3B:
            break
        if blk == 0x21:
            label = b[pos + 1]
            parts, p = [], pos + 2
            while p < n:
                cnt = b[p]
                if cnt == 0:
                    p += 1
                    break
                parts.append(b[p + 1:p + 1 + cnt])
                p += 1 + cnt
            blob = b"".join(parts)
            if label in (0xFE, 0x01, 0xFD) or (label == 0xFF):
                out.append((label, blob))
            pos = p
            continue
        if blk == 0x2C:
            lf = b[pos + 9]
            pos += 10
            if lf & 0x80:
                pos += 3 * (2 << (lf & 7))
            pos += 1
            while pos < n:
                cnt = b[pos]
                if cnt == 0:
                    pos += 1
                    break
                pos += 1 + cnt
            continue
        break
    for label, blob in out:
        if label == 0xFF and blob[:8] == b"XMP Data" or (label == 0xFF and b"xmp" in blob.lower()[:40]):
            dump_xmp(blob[8:], "GIF XMP")
        elif label == 0xFF:
            w("    GIF Application id=%s  (%d байт полезного)" % (clean(blob[:32]), len(blob)))
        elif label == 0xFE:
            w("    GIF Comment: %s" % clean(blob)[:200])
        elif label == 0x01:
            w("    GIF PlainText: %s" % clean(blob)[:200])

def png_meta(b, name):
    pos = 8
    while pos + 8 <= len(b):
        ln = int.from_bytes(b[pos:pos + 4], "big")
        typ = b[pos + 4:pos + 8]
        data = b[pos + 8:pos + 8 + ln]
        if typ in (b"tEXt", b"zTXt", b"iTXt"):
            if typ == b"tEXt":
                k, _, v = data.partition(b"\x00")
                w("    tEXt %s: %s" % (clean(k), clean(v)[:400]))
            elif typ == b"zTXt":
                k, rest = data.split(b"\x00", 1)
                try:
                    v = zlib.decompress(rest[1:])
                except Exception:
                    v = rest
                w("    zTXt %s: %s" % (clean(k), clean(v)[:400]))
            else:
                k, rest = data.split(b"\x00", 1)
                # compFlag, compMethod, langTag, transKey, text
                parts = rest.split(b"\x00", 4)
                txt = parts[-1] if parts else b""
                if typ == b"iTXt" and len(parts) >= 3 and b"z" :
                    pass
                if len(txt) > 100 and b"<" in txt:
                    dump_xmp(txt, "iTXt XMP")
                else:
                    w("    iTXt %s: %s" % (clean(k), clean(txt)[:400]))
        pos += 12 + ln

def jpg_meta(b, name):
    p = 2
    while p + 4 < len(b):
        if b[p] != 0xFF:
            p += 1
            continue
        m = b[p + 1]
        if m in (0xD8, 0x01) or 0xD0 <= m <= 0xD7:
            p += 2
            continue
        seglen = int.from_bytes(b[p + 2:p + 4], "big")
        seg = b[p + 4:p + 2 + seglen]
        if m == 0xFE:
            w("    JPEG COM: %s" % clean(seg)[:400])
        if m == 0xE1:
            if seg.startswith(b"http://ns.adobe.com/xap/1.0/\x00"):
                dump_xmp(seg[len(b"http://ns.adobe.com/xap/1.0/\x00"):], "JPEG XMP")
            elif seg[:4] == b"Exif":
                # выборка читаемых строк EXIF
                strs = re.findall(rb"[\x20-\x7e]{6,}", seg)
                uniq = []
                for s in strs:
                    t = s.decode("ascii", "replace")
                    if t not in uniq:
                        uniq.append(t)
                w("    JPEG EXIF: %d байт, %d читаемых строк" % (len(seg), len(uniq)))
                for t in uniq[:40]:
                    w("      %s" % t[:160])
            else:
                w("    JPEG APP1: %s" % clean(seg[:120])[:160])
        if m in (0xE0, 0xE2, 0xE3, 0xE5, 0xEC, 0xED):
            strs = [s.decode("ascii", "replace") for s in re.findall(rb"[\x20-\x7e]{8,}", seg)[:8]]
            if strs:
                w("    JPEG APP0x%X: %s" % (m, " | ".join(x[:80] for x in strs)))
        if m == 0xDA:
            break
        p += 2 + seglen

def mp3_meta(b, name):
    if b[:3] == b"ID3":
        size = ((b[6] & 0x7f) << 21 | (b[7] & 0x7f) << 14 | (b[8] & 0x7f) << 7 | (b[9] & 0x7f))
        body = b[10:10 + size]
        w("    ID3v2 size=%d" % size)
        frames = []
        i = 0
        while i + 10 <= len(body):
            fid = body[i:i + 4]
            if fid.strip(b"\x00") == b"":
                break
            flen = int.from_bytes(body[i + 4:i + 8], "big")
            if fid[0:1] not in b"ABCDEFGHIJKLMNOPQRSTUVWXYZ":
                break
            frames.append((fid.decode("latin1"), body[i + 10:i + 10 + flen]))
            i += 10 + flen
        for fid, val in frames:
            w("      %s: %s" % (fid, clean(val)[:300]))
    else:
        w("    ID3 отсутствует; начало: %s" % clean(b[:32]))
    # appended после последнего кадра — для mp3 сложно; ищем текст в последних 4 КБ
    w("    последние 256 байт: %s" % clean(b[-256:])[:250])

w("")
w("--- АССЕТЫ ---")
files = sorted(OUT.iterdir())
w("файлов в h8_assets: %d" % len(files))
for p in files:
    b = p.read_bytes()
    w("")
    w("%s  %d байт" % (p.name, len(b)))
    try:
        if b[:6] in (b"GIF87a", b"GIF89a"):
            gif_meta(b, p.name)
        elif b[:8] == b"\x89PNG\r\n\x1a\n":
            png_meta(b, p.name)
        elif b[:2] == b"\xff\xd8":
            jpg_meta(b, p.name)
        elif b[:3] == b"ID3" or b[:2] in (b"\xff\xfb", b"\xff\xf3"):
            mp3_meta(b, p.name)
        else:
            w("  формат %s" % binascii.hexlify(b[:12]).decode())
    except Exception as e:
        w("  [ERROR] %r" % e)

# локально лежавшие медиа тоже прогоняем (могли не проверяться с метаданными)
w("")
w("--- ЛОКАЛЬНЫЕ МЕДИА (data/media, data/vid2, data/vid3) ---")
for sub in ("media", "vid2", "vid3"):
    d = DATA / sub
    if not d.exists():
        continue
    for p in sorted(d.iterdir()):
        if p.suffix.lower() not in (".png", ".jpg", ".gif", ".mp3", ".mp4", ".m4a"):
            continue
        b = p.read_bytes()
        w("")
        w("%s  %d байт" % (p.relative_to(ROOT), len(b)))
        try:
            if b[:6] in (b"GIF87a", b"GIF89a"):
                gif_meta(b, p.name)
            elif b[:8] == b"\x89PNG\r\n\x1a\n":
                png_meta(b, p.name)
            elif b[:2] == b"\xff\xd8":
                jpg_meta(b, p.name)
            elif b[:3] == b"ID3" or b[:2] in (b"\xff\xfb", b"\xff\xf3"):
                mp3_meta(b, p.name)
            else:
                w("  формат %s (метаданные не разбираются); читаемых строк в хвосте: %d"
                  % (binascii.hexlify(b[:8]).decode(),
                     len(re.findall(rb"[\x20-\x7e]{8,}", b[-200000:]))))
        except Exception as e:
            w("  [ERROR] %r" % e)

w("")
w("=" * 70)
w("готово; лог data/h8_meta.log (%d строк)" % len(lines))
