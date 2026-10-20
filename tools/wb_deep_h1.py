# -*- coding: utf-8 -*-
"""Walking Banks H1, фаза 3: раскодировать gzip-снимки и разобрать JS мини-игры.

Делает:
 1) для файлов, где тело — gzip (сырые `id_`-снимки), кладёт рядом .dec.html и сканирует так же;
 2) в BitcoinSeedGame.html вытаскивает все строковые литералы и массивы, ищет:
    массивы из 12/24 слов BIP39, совпадения с группой главы 11, base64-кандидаты,
    вызовы генератора слов (crypto.getRandomValues / Math.random) и захардкоженные фразы.
Пишет data/wayback/scan2.md. Только чтение.
"""
import base64
import gzip
import io
import json
import os
import re
import sys
import time
import zlib

sys.path.insert(0, r"C:\Users\Admin\OneDrive\Desktop\master\tools")
MASTER = r"C:\Users\Admin\OneDrive\Desktop\master"
SRC = os.path.join(MASTER, "puzzles", "ah-white-walking-banks-800ksats", "data", "wayback")
WL = os.path.join(MASTER, "puzzles", "corey-phillips-kitten-passphrase-1msats", "data", "bip39-english.txt")
WORDS = [w.strip() for w in io.open(WL, encoding="utf-8").read().split() if w.strip()]
WS = set(WORDS)
KNOWN = set("crystal small advice reflect".split())

out = ["# Walking Banks H1 фаза 3 (%s UTC)" % time.strftime("%Y-%m-%d %H:%M", time.gmtime())]


def decompress_all():
    res = []
    for fn in sorted(os.listdir(SRC)):
        p = os.path.join(SRC, fn)
        if not fn.endswith(".html") or fn.endswith(".dec.html"):
            continue
        raw = io.open(p, "rb").read()
        dec = None
        how = None
        if raw[:2] == b"\x1f\x8b":
            try:
                dec, how = gzip.decompress(raw), "gzip"
            except Exception as e:
                dec, how = None, "gzip FAIL %s" % e
        if dec is None:
            try:
                dec, how = zlib.decompressobj(-15).decompress(raw), "deflate"
            except Exception:
                pass
        if dec is None:
            try:
                i = raw.find(b"\x78\x9c")
                if i > 0:
                    dec, how = zlib.decompressobj(-15).decompress(raw[i:]), "deflate@%d" % i
            except Exception:
                pass
        if dec:
            dp = p[:-5] + ".dec.html"
            fd, tmp = __import__("tempfile").mkstemp(dir=SRC, suffix=".tmp")
            os.write(fd, dec)
            os.close(fd)
            os.replace(tmp, dp)
            res.append((fn, how, len(raw), len(dec), dp))
    return res


out.append("\n## распакованные снимки")
for fn, how, n, m, dp in decompress_all():
    out.append("   %s → %s (%d → %d B) как %s" % (fn, how, n, m, os.path.basename(dp)))

# ---------- разбор мини-игры ----------
GAME = os.path.join(SRC, "walkingbanks.com_BitcoinSeedGame.html__20250613004812.html")
html = io.open(GAME, encoding="utf-8", errors="replace").read()
js = "\n".join(m.group(1) for m in re.finditer(r"(?is)<script[^>]*>(.*?)</script>", html))
out.append("\n## BitcoinSeedGame.html: HTML %d B, JS %d B" % (len(html), len(js)))

# все массивы литералов
arrs = re.findall(r"\[((?:\s*\"[^\"]{1,40}\"\s*,){2,}[^\]]{0,20000})\]", js)
out.append("   массивов-литералов найдено: %d" % len(arrs))
for i, a in enumerate(arrs):
    items = re.findall(r'"([^"]*)"', a)
    bip = [w for w in items if w.lower() in WS]
    flag = ""
    if len(items) in (12, 24):
        flag = " <<< РАЗМЕР 12/24"
    if KNOWN & set(x.lower() for x in items):
        flag += " <<< содержит слова главы 11"
    out.append("   #%d n=%d BIP39-слов=%d%s | первые: %s" % (
        i, len(items), len(bip), flag, " ".join(items[:12])[:180]))

# одиночные строки, состоящие из слов BIP39
strs = re.findall(r'"([A-Za-z ]{20,200})"', js)
seedish = [s for s in strs if len(s.split()) >= 3 and sum(1 for w in s.split() if w.lower() in WS) >= max(3, len(s.split()) - 1)]
out.append("   строки-похожие-на-сид: %d" % len(seedish))
for s in sorted(set(seedish))[:15]:
    out.append("      %s" % s[:160])

# base64
b64 = [m.group(0) for m in re.finditer(r'"[A-Za-z0-9+/=]{24,120}"', js)]
out.append("   base64-подозрительных строк: %d" % len(b64))
for s in sorted(set(b64))[:20]:
    s2 = s.strip('"')
    dec = ""
    try:
        raw = base64.b64decode(s2 + "=" * (-len(s2) % 4))
        if re.search(r"[ -~]{6}", raw.decode("utf-8", "replace")):
            dec = raw.decode("utf-8", "replace")[:90]
    except Exception:
        pass
    out.append("      %s%s" % (s2[:70], (" → " + dec if dec else "")))

# как игра получает слова
out.append("   вызовы генерации: " + json.dumps({
    "getRandomValues": len(re.findall(r"getRandomValues", js)),
    "Math.random": len(re.findall(r"Math\.random", js)),
    "Date.now/seed": len(re.findall(r"Date\.now|new Date", js)),
    "wordlist refs": len(re.findall(r"[Ww]ord[Ll]ist|WORDS|bip39", js)),
    "innerHTML": len(re.findall(r"innerHTML", js)),
    "fetch/XHR": len(re.findall(r"fetch\(|XMLHttpRequest", js)),
    "atob": len(re.findall(r"atob|fromCharCode", js)),
}))
# строки с «seed/phrase/wallet/bitcoin» внутри JS
kw = [m.group(0) for m in re.finditer(r"[^\n]{0,60}(?:seed|phrase|wallet|bitcoin|xpub|bc1|hint|treasure)[^\n]{0,60}", js)]
out.append("   JS-строки с seed/phrase/wallet/bitcoin: %d" % len(kw))
seen = set()
for s in kw:
    t = re.sub(r"\s+", " ", s).strip()[:130]
    if t in seen:
        continue
    seen.add(t)
    out.append("      " + t)
    if len(seen) >= 25:
        break

text = "\n".join(out) + "\n"
sys.stdout.write(text)
fd, tmp = __import__("tempfile").mkstemp(dir=SRC, suffix=".tmp")
os.write(fd, text.encode("utf-8"))
os.close(fd)
os.replace(tmp, os.path.join(SRC, "scan2.md"))
