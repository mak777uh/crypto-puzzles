# -*- coding: utf-8 -*-
"""H8 шаг 2: скачать оригиналы ассетов сайта (без transform-префикса, иначе
appended bytes теряются) и просканировать стеганые/метаданные поверхности:
  - всё, что после трейлера (GIF 0x3B / PNG IEND / JPEG FFD9)
  - GIF extension blocks: Comment(0xFE), PlainText(0x01), Application(0xFF), XMP(0xFD)
  - PNG chunks tEXt/zTXt/iTXt, XMP
  - JPEG COM/APPn (EXIF/XMP)
  - целевые ключевые слова по всему байтовому потоку
Транзакций/писем/публикаций нет. Только GET статики Wix. Лог пишется инкрементально."""
import re, os, json, time, pathlib, urllib.request, zlib, binascii

ROOT = pathlib.Path(r"C:/Users/Admin/OneDrive/Desktop/master/puzzles/smith-lyle-moore-hunt-2-0-032btc")
DATA = ROOT / "data"
OUT = DATA / "h8_assets"
LOGP = DATA / "h8_assets_probe.log"
OUT.mkdir(exist_ok=True)

KEYWORDS = [b"glimmer", b"codebreaker", b"passphrase", b"pass phrase", b"seed", b"private key",
            b"xpub", b"zpub", b"bc1", b"bitcoin", b"address", b"escrow", b"satoshi", b"smith",
            b"lyle", b"moore", b"hunt", b"whale", b"ship", b"island", b"raft", b"coconut",
            b"password", b"unlock", b"lock", b"word", b"next", b"clue"]

log_lines = []
def w(*a):
    s = " ".join(str(x) for x in a)
    log_lines.append(s)
    print(s, flush=True)
    with open(LOGP, "w", encoding="utf-8", newline="") as fh:
        fh.write("\n".join(log_lines) + "\n")

def get(url):
    req = urllib.request.Request(url, headers={
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/126 Safari/537.36",
        "Referer": "https://www.smithlylemoore.com/",
        "Accept": "image/avif,image/webp,image/apng,image/*,*/*;q=0.8"})
    with urllib.request.urlopen(req, timeout=90) as r:
        return r.read()

inv = json.load(open(DATA / "h8_inventory.json", encoding="utf-8"))
w("H8 — скачивание и зондирование ассетов. Запуск %s UTC" % time.strftime("%Y-%m-%d %H:%M", time.gmtime()))
w("источник: data/h8_inventory.json, кандидатов %d" % len(inv))
w("")

downloaded = []
for item in inv:
    h, ext, size = item["hash"], item["ext"], item.get("size")
    name = "144728_%s~mv2.%s" % (h, ext)
    path = OUT / name
    if path.exists() and size and path.stat().st_size == size:
        w("[skip] %s уже скачан (%d)" % (name, path.stat().st_size))
        downloaded.append((h, ext, path))
        continue
    url = "https://static.wixstatic.com/media/144728_%s~mv2.%s" % (h, ext)
    try:
        data = get(url)
    except Exception as e:
        alt = "https://static.wixstatic.com/media/144728_%s/v1/clean,loss_50/%s" % (h, name)
        try:
            data = get(alt)
        except Exception as e2:
            w("[FAIL] %s : %s | alt %s" % (name, str(e)[:70], str(e2)[:60]))
            continue
    with open(path, "wb") as fh:
        fh.write(data)
    w("[ok]   %s  %d байт" % (name, len(data)))
    downloaded.append((h, ext, path))
    time.sleep(0.35)

w("")
w("скачано/готово: %d" % len(downloaded))
w("=" * 70)

TRAIL = {b"GIF87a": b"\x3b", b"GIF89a": b"\x3b"}

def tail_after(b, trailer):
    """позиция последнего вхождения трейлера и всё после него"""
    i = b.rfind(trailer)
    return (i, b[i + len(trailer):] if i >= 0 else b"")

def printable(b, limit=400):
    s = "".join(chr(c) if 32 <= c < 127 else "." for c in b[:limit])
    return s

def kw_scan(b, name):
    low = b.lower()
    hits = []
    for kw in KEYWORDS:
        start = 0
        n = 0
        while True:
            i = low.find(kw, start)
            if i < 0 or n >= 6:
                break
            ctx = printable(b[max(0, i - 24):i + len(kw) + 48])
            hits.append((kw.decode(), i, ctx))
            n += 1
            start = i + 1
    if hits:
        w("  ключевые слова (%d):" % len(hits))
        seen = set()
        for kw, i, ctx in hits:
            k = (kw, ctx)
            if k in seen:
                continue
            seen.add(k)
            w("    @%-9d %-11s %s" % (i, kw, ctx))
    return len(hits)

def gif_probe(b, name):
    # заголовок + logical screen descriptor
    pos = 13
    if b[4:11] != b"NETSCAPE" and False:
        pass
    # global color table
    flags = b[10]
    if flags & 0x80:
        pos += 3 * (2 << (flags & 7))
    frames = 0
    comments, apps, plaintexts, xmp = [], [], [], []
    trailer_at = None
    n = len(b)
    while pos < n:
        blk = b[pos]
        if blk == 0x3B:
            trailer_at = pos
            pos += 1
            break
        if blk == 0x21:  # extension
            label = b[pos + 1] if pos + 1 < n else 0
            sub = []
            p = pos + 2
            while p < n:
                cnt = b[p]
                if cnt == 0:
                    p += 1
                    break
                sub.append(b[p + 1:p + 1 + cnt])
                p += 1 + cnt
            if label == 0xFE:
                comments.append(b"".join(sub))
            elif label == 0x01:
                plaintexts.append(b"".join(sub))
            elif label == 0xFF:
                apps.append(b"".join(sub)[:64])
                if b"XMP" in b"".join(sub):
                    xmp.append(b"".join(sub))
            pos = p
            continue
        if blk == 0x2C:  # image descriptor
            frames += 1
            lf = b[pos + 9]
            pos += 10
            if lf & 0x80:
                pos += 3 * (2 << (lf & 7))
            pos += 1  # LZW min code size
            while pos < n:
                cnt = b[pos]
                if cnt == 0:
                    pos += 1
                    break
                pos += 1 + cnt
            continue
        # неизвестный байт — синхронизация потеряна
        w("  [!] GIF рассинхрон на %d (байт 0x%02X), обрыв разбора" % (pos, blk))
        break
    w("  GIF: кадров=%d  трейлер 0x3B на %s  всего байт %d" % (frames, trailer_at, n))
    if comments:
        w("  Comment extensions: %d" % len(comments))
        for c in comments[:12]:
            w("    «%s»" % printable(c, 300))
    if plaintexts:
        w("  PlainText ext: %d -> %s" % (len(plaintexts), printable(b"".join(plaintexts)[:200], 200)))
    if apps:
        w("  Application ext: %d" % len(apps))
        for a_ in apps[:6]:
            w("    id=%s" % printable(a_, 64))
    if xmp:
        w("  XMP в GIF: %d байт" % sum(len(x) for x in xmp))
    after = b[trailer_at + 1:] if trailer_at is not None else b""
    w("  после трейлера: %d байт" % len(after))
    if after:
        w("    hex: %s" % binascii.hexlify(after[:64]).decode())
        w("    asc: %s" % printable(after, 300))
    return kw_scan(b, name)

def png_probe(b, name):
    pos = 8
    texts = []
    iend = None
    while pos + 8 <= len(b):
        ln = int.from_bytes(b[pos:pos + 4], "big")
        typ = b[pos + 4:pos + 8]
        if typ == b"IEND":
            iend = pos
            pos += 12
            break
        data = b[pos + 8:pos + 8 + ln]
        if typ in (b"tEXt", b"iTXt", b"zTXt") or typ == b"tIME":
            texts.append((typ.decode(), data[:400]))
        if typ == b"tRNS":
            pass
        pos += 12 + ln
    w("  PNG: чанков пройдено, IEND на %s, всего байт %d" % (iend, len(b)))
    for typ, d in texts[:20]:
        w("    %s: %s" % (typ, printable(d, 260)))
    after = b[iend + 12:] if iend is not None else b""
    w("  после IEND: %d байт" % len(after))
    if after:
        w("    hex: %s" % binascii.hexlify(after[:64]).decode())
        w("    asc: %s" % printable(after, 300))
    return kw_scan(b, name)

def jpg_probe(b, name):
    i = b.rfind(b"\xff\xd9")
    after = b[i + 2:] if i >= 0 else b""
    # COM segments
    coms = []
    p = 2
    while p + 4 < len(b):
        if b[p] == 0xFF:
            m = b[p + 1]
            if m in (0xD8, 0x01) or 0xD0 <= m <= 0xD7:
                p += 2
                continue
            seglen = int.from_bytes(b[p + 2:p + 4], "big")
            if m == 0xFE:
                coms.append(b[p + 4:p + 2 + seglen])
            if m == 0xDA:  # SOS — дальше скан-данные
                break
            p += 2 + seglen
        else:
            p += 1
    w("  JPEG: EOI на %d, всего байт %d" % (i, len(b)))
    for c in coms[:10]:
        w("    COM: %s" % printable(c, 300))
    w("  после EOI: %d байт" % len(after))
    if after:
        w("    hex: %s" % binascii.hexlify(after[:64]).decode())
        w("    asc: %s" % printable(after, 300))
    if b"Exif" in b[:4096]:
        w("    EXIF присутствует")
    if b"http://ns.adobe.com/xap" in b:
        w("    XMP присутствует")
    return kw_scan(b, name)

results = {}
for h, ext, path in downloaded:
    b = path.read_bytes()
    w("")
    w("%s  %s  %d байт" % (h, ext, len(b)))
    try:
        if b[:6] in (b"GIF87a", b"GIF89a"):
            r = gif_probe(b, h)
        elif b[:8] == b"\x89PNG\r\n\x1a\n":
            r = png_probe(b, h)
        elif b[:2] == b"\xff\xd8":
            r = jpg_probe(b, h)
        elif b[:3] == b"ID3" or b[:4] in (b"ADTS", b"\xff\xfb", b"\xff\xf3"):
            w("  аудио; ID3-теги:")
            kw_scan(b[:2000000], h)
            r = 0
        else:
            w("  неизвестная сигнатура: %s" % binascii.hexlify(b[:16]).decode())
            r = kw_scan(b, h)
        results[h] = {"ext": ext, "size": len(b), "kw": r}
    except Exception as e:
        w("  [ERROR] %r" % e)
        results[h] = {"ext": ext, "size": len(b), "error": repr(e)[:120]}

w("")
w("=" * 70)
w("ИТОГ по ключевым словам (ненулевые):")
any_hit = False
for h, r in sorted(results.items(), key=lambda x: -x[1].get("kw", 0)):
    if r.get("kw"):
        any_hit = True
        w("  %s %s kw=%d" % (h, r["ext"], r["kw"]))
if not any_hit:
    w("  ни на одном ассете ключевые слова не встретились")
w("лог: data/h8_assets_probe.log")
