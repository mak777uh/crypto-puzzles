# -*- coding: utf-8 -*-
"""H8 шаг 6: добор пропущенных носителей —
 (1) видео страницы c2ozw 144728_18a13652c8d3460cb3c08752cf326210 (единственный
     видео-ассет сайта, которого локально не было);
 (2) og:image сайта 144728_aebc77f8142a4ac397f8dbdbc8bbd314~mv2.jpg (обложка,
     12 страниц ссылаются; в Hunt #1 секрет был именно в обложке);
 (3) siteassets-JSON (CSS/раскладка страниц) — на случай текста в комментариях;
 (4) два mp3 Hunt #1 из write-up.
Проверка: байты после контейнера, читаемые строки, ключевые слова.
Только GET статики, транзакций/писем нет."""
import pathlib, re, subprocess, json, time, urllib.request, binascii

ROOT = pathlib.Path(r"C:/Users/Admin/OneDrive/Desktop/master/puzzles/smith-lyle-moore-hunt-2-0-032btc")
DATA = ROOT / "data"
OUT = DATA / "h8_assets"
LOGP = DATA / "h8_extra.log"
lines = []

def w(*a):
    s = " ".join(str(x) for x in a)
    lines.append(s)
    print(s, flush=True)
    with open(LOGP, "w", encoding="utf-8", newline="") as fh:
        fh.write("\n".join(lines) + "\n")

def get(url, referer="https://www.smithlylemoore.com/"):
    req = urllib.request.Request(url, headers={
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/126 Safari/537.36",
        "Referer": referer, "Origin": "https://www.smithlylemoore.com"})
    with urllib.request.urlopen(req, timeout=180) as r:
        return r.read()

w("H8 шаг 6 — добор носителей. %s UTC" % time.strftime("%Y-%m-%d %H:%M", time.gmtime()))
w("=" * 72)

targets = [
    ("vid_c2ozw_720p.mp4", "https://video.wixstatic.com/video/144728_18a13652c8d3460cb3c08752cf326210/720p/mp4/file.mp4"),
    ("vid_c2ozw_480p.mp4", "https://video.wixstatic.com/video/144728_18a13652c8d3460cb3c08752cf326210/480p/mp4/file.mp4"),
    ("ogcover_aebc77f8142a.jpg", "https://static.wixstatic.com/media/144728_aebc77f8142a4ac397f8dbdbc8bbd314~mv2.jpg"),
    ("hunt1_alt_5f57f68e.mp3", "https://music.wixstatic.com/mp3/144728_5f57f68e07ba4319b9c189fbc61626b9-320.mp3"),
    ("hunt1_b22b1114.mp3", "https://music.wixstatic.com/mp3/144728_b22b111462424cf3824203ac3564c2ce-320.mp3"),
]
got = []
for name, url in targets:
    p = OUT / name
    if p.exists() and p.stat().st_size > 5000:
        w("[skip] %s (%d)" % (name, p.stat().st_size))
        got.append(p)
        continue
    try:
        d = get(url)
        p.write_bytes(d)
        w("[ok]   %s  %d байт  <- %s" % (name, len(d), url[:80]))
        got.append(p)
    except Exception as e:
        w("[FAIL] %s : %s" % (name, str(e)[:90]))
    time.sleep(0.4)

w("")
w("--- проверка хвостов/строк ---")
for p in got:
    b = p.read_bytes()
    w("")
    w("%s  %d байт  сигнатура %s" % (p.name, len(b), binascii.hexlify(b[:12]).decode()))
    if b[:4] == b"\x00\x00\x00\x00" or b[4:8] in (b"ftyp", b"moov", b"mdat", b"free", b"wide"):
        # mp4: идём по верхним боксам, ищем данные после последнего
        pos = 0
        boxes = []
        while pos + 8 <= len(b) and len(boxes) < 40:
            sz = int.from_bytes(b[pos:pos + 4], "big")
            typ = b[pos + 4:pos + 8]
            if sz == 1:
                sz = int.from_bytes(b[pos + 8:pos + 16], "big")
            if sz < 8 or pos + sz > len(b):
                boxes.append((typ.decode("latin1"), pos, "ОБРЫВ (размер за пределами файла)"))
                break
            boxes.append((typ.decode("latin1", "replace"), pos, sz))
            pos += sz
        w("  боксы: %s" % ", ".join("%s@%d:%s" % x for x in boxes))
        w("  байт после цепочки боксов: %d" % (len(b) - pos))
        if len(b) - pos > 0:
            tail = b[pos:]
            w("    hex: %s" % binascii.hexlify(tail[:80]).decode())
            w("    asc: %s" % re.sub(rb"[^\x20-\x7e]+", b" ", tail[:300]).decode())
    if b[:2] == b"\xff\xd8":
        i = b.rfind(b"\xff\xd9")
        w("  JPEG EOI на %d, после EOI %d байт" % (i, len(b) - i - 2))
        if len(b) - i - 2 > 0:
            tail = b[i + 2:]
            w("    asc: %s" % re.sub(rb"[^\x20-\x7e]+", b" ", tail[:400]).decode())
    # читаемые строки в хвосте 300 КБ
    strs = [s.decode("ascii", "replace") for s in
            re.findall(rb"[\x20-\x7e]{10,}", b[-300000:])]
    kw = re.compile(r"(glimmer|code|word|seed|pass|pin|lock|open|key|moon|raft|fire|ship|island|explor|found|museum|fortune|password)", re.I)
    hits = [s for s in strs if kw.search(s)]
    w("  читаемых строк в хвосте: %d, с ключевыми словами: %d" % (len(strs), len(hits)))
    for s in hits[:25]:
        w("    %s" % s[:170])
    # и по всему файлу только «длинные фразы» (буквы+пробелы, >=20)
    phrases = [m.group().decode() for m in
               re.finditer(rb"[A-Za-z][A-Za-z ,.'\-:;!?]{19,}", b)]
    uniq = []
    for s in phrases:
        if s not in uniq:
            uniq.append(s)
    w("  фразоподобных последовательностей по файлу: %d" % len(uniq))
    for s in uniq[:15]:
        w("    «%s»" % s[:170])

w("")
w("=" * 72)
w("готово; лог data/h8_extra.log")
