# -*- coding: utf-8 -*-
"""Walking Banks — ось H1, фаза 2: разбор снимков walkingbanks.com из Wayback.

Сканирует data/wayback/*.html (текст страницы + содержимое <script>) на пять признаков:
  D1 токены кодировки главы 11 (iii / xxx внутри слова);
  D2 длинные слитные строчные токены → DP-разбор на слова BIP39 (≥3 слова);
  D3 максимальные прогоны подряд идущих слов BIP39 в видимом тексте (≥6), окна по 24 → оракул;
  D4 ключевые слова (органы/доноры/DNA/подсказки) с контекстом;
  D5 кошельки/ключи (xpub, bc1, legacy, WIF, 64-hex) и внешние ссылки.
Пишет data/wayback/scan.md. Только чтение + локальная проверка оракулом.
"""
import io
import json
import os
import re
import subprocess
import sys
import time

MASTER = r"C:\Users\Admin\OneDrive\Desktop\master"
PDIR = os.path.join(MASTER, "puzzles", "ah-white-walking-banks-800ksats")
SRC = os.path.join(PDIR, "data", "wayback")
WL = os.path.join(MASTER, "puzzles", "corey-phillips-kitten-passphrase-1msats", "data", "bip39-english.txt")
ORACLE = os.path.join(PDIR, "tools", "ocp", "oracle.py")

WORDS = [w.strip() for w in io.open(WL, encoding="utf-8").read().split() if w.strip()]
WS = set(WORDS)
N = len(WORDS)
MAXLEN = max(len(w) for w in WORDS)

KEYWORDS = re.compile(r"(organ|donor|heart|kidney|liver|lung|pancrea|cornea|retina|skin|bone|tissue|transplant|"
                      r"DNA|RNA|gene|genetic|intron|exon|chromosom|sequenc|helix|lab\b|specimen|"
                      r"seed|phrase|mnemonic|bip39|bip-39|word[s]?\s+list|list of words|hint|clue|treasure|"
                      r"xpub|wallet|satoshi|satoshis|group)", re.I)

ADDR = re.compile(r"\b(xpub|ypub|zpub|tpub|vpub|upub)[0-9A-Za-z]{20,100}\b"
                  r"|\bbc1[a-z0-9]{14,62}\b"
                  r"|\b[13][a-km-zA-HJ-NP-Z1-9]{25,34}\b"
                  r"|\b[KL][1-9A-HJ-NP-Za-km-z]{50,51}\b"
                  r"|\b[0-9a-fA-F]{64}\b")

D1 = re.compile(r"[A-Za-z]{0,8}(?:iii|x{3,6})[A-Za-z]{2,}")
D2 = re.compile(r"\b[a-z]{12,}\b")


def strip_html(html):
    scripts = [m.group(1) for m in re.finditer(r"(?is)<script[^>]*>(.*?)</script>", html)]
    styles = re.findall(r"(?is)<style[^>]*>(.*?)</style>", html)
    body = re.sub(r"(?is)<(script|style)[^>]*>.*?</\1>", " ", html)
    body = re.sub(r"(?is)<[^>]+>", " ", body)
    body = (body.replace("&nbsp;", " ").replace("&amp;", "&").replace("&quot;", '"')
                .replace("&#39;", "'").replace("&lt;", "<").replace("&gt;", ">"))
    return re.sub(r"\s+", " ", body), "\n".join(scripts + styles)


def segment(tok):
    """Жадный DP-разбор слитной строки на слова BIP39; возвращает список слов или None."""
    n = len(tok)
    best = [None] * (n + 1)
    best[0] = []
    for i in range(n):
        if best[i] is None:
            continue
        for L in range(4, min(MAXLEN, n - i) + 1):
            s = tok[i:i + L]
            if s in WS:
                cand = best[i] + [s]
                if best[i + L] is None or len(cand) > len(best[i + L]):
                    best[i + L] = cand
    return best[n]


def runs(text):
    """Максимальные прогоны подряд идущих слов BIP39 в тексте. [(start,end,words)]"""
    toks = re.findall(r"[A-Za-z']+", text.lower())
    out, cur, start = [], [], 0
    for i, t in enumerate(toks):
        w = t.strip("'")
        if w in WS:
            if not cur:
                start = i
            cur.append(w)
        else:
            if len(cur) >= 6:
                out.append((start, i, cur))
            cur = []
    if len(cur) >= 6:
        out.append((start, len(toks), cur))
    return out, toks


def ctx(text, m, pad=110):
    a = max(0, m.start() - pad)
    b = min(len(text), m.end() + pad)
    return re.sub(r"\s+", " ", text[a:b])


t0 = time.time()
report = ["# Walking Banks H1 — скан архивных снимков (%s UTC)" % time.strftime("%Y-%m-%d %H:%M", time.gmtime()),
          "wordlist: %d слов; файлов для скана: %%d" % N]
files = sorted(f for f in os.listdir(SRC) if f.endswith(".html"))
report[1] = report[1] % len(files)

candidates = []
for fn in files:
    raw = io.open(os.path.join(SRC, fn), "rb").read()
    html = raw.decode("utf-8", "replace")
    vis, code = strip_html(html)
    hits = []
    for tag, txt in (("VIS", vis), ("CODE", code)):
        d1 = sorted(set(D1.findall(txt)))
        if d1:
            hits.append("%s D1 iii/xxx-токены (%d): %s" % (tag, len(d1), ", ".join(d1[:12])))
        d2 = []
        for tok in sorted(set(D2.findall(txt))):
            seg = segment(tok)
            if seg and len(seg) >= 3:
                d2.append("%s→%s" % (tok, " ".join(seg)))
        if d2:
            hits.append("%s D2 слитные BIP39-разборы (%d): %s" % (tag, len(d2), "; ".join(d2[:10])))
        if tag == "VIS":
            rr, toks = runs(txt)
            if rr:
                hits.append("%s D3 прогоны слов BIP39: %s" % (tag, "; ".join(
                    "[len=%d] %s" % (len(w), " ".join(w)) for _, _, w in rr[:6])))
                for s, e, w in rr:
                    if len(w) >= 24:
                        for i in range(0, len(w) - 23):
                            candidates.append(" ".join(w[i:i + 24]))
        if tag == "CODE":
            rr, toks = runs(code)
            for s, e, w in rr:
                if len(w) >= 12:
                    hits.append("CODE D3 длинный прогон BIP39 (%d): %s" % (len(w), " ".join(w[:30])))
                    # прогон длиной в весь wordlist — это список слов страницы, не сид
                    if len(w) >= 24 and len(w) < 400:
                        for i in range(0, len(w) - 23):
                            candidates.append(" ".join(w[i:i + 24]))
    km = [m for m in KEYWORDS.finditer(vis)]
    links = sorted(set(re.findall(r"""href=["']([^"']+)["']""", html)))
    ext = [l for l in links if "web.archive.org" not in l and not l.startswith(("#", "javascript", "mailto"))]
    ad = sorted(set(m.group(0) for m in ADDR.finditer(vis + "\n" + code)))
    report.append("\n## %s (%d B, текст %d, скрипты %d)" % (fn, len(raw), len(vis), len(code)))
    report.append("   заголовков/видимого текста: %s" % re.sub(r"\s+", " ", vis[:260]))
    for h in hits:
        report.append("   - " + h[:600])
    if ad:
        report.append("   - D5 адреса/ключи: %s" % ", ".join(ad[:10]))
    if ext:
        report.append("   - ссылки (%d): %s" % (len(ext), ", ".join(ext[:25])[:700]))
    if km:
        report.append("   - D4 ключевых слов: %d" % len(km))
        seen = set()
        for m in km[:40]:
            c = ctx(vis, m).lower()[:60]
            if c in seen:
                continue
            seen.add(c)
            report.append("       %s" % ctx(vis, m)[:230])
    if not hits and not km and len(vis) < 300:
        report.append("   (пустая/заглушечная страница)")

# ---------- оракул по кандидатам ----------
uniq = sorted(set(candidates))
report.append("\n## Оракул: кандидатов-24слов %d" % len(uniq))
for c in uniq[:40]:
    try:
        p = subprocess.run([sys.executable, ORACLE, c], capture_output=True, timeout=60)
        out = (p.stdout.decode("utf-8", "replace") + p.stderr.decode("utf-8", "replace")).strip()
    except Exception as e:
        out = "ERR %s" % e
    report.append("   %s → %s" % (c[:70], out.replace("\n", " | ")[:200]))

report.append("\nВсего %.0f с." % (time.time() - t0))
text = "\n".join(report) + "\n"
sys.stdout.write(text[:24000])
fd, tmp = __import__("tempfile").mkstemp(dir=SRC, suffix=".tmp")
with io.open(fd, "w", encoding="utf-8") as f:
    f.write(text)
os.replace(tmp, os.path.join(SRC, "scan.md"))
