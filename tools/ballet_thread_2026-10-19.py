"""ballet_thread — читает ANN-тред Ballet #takebobbysbitcoin (bitcointalk topic=5265748).

Зачем: ось Ballet (2 BTC) в каталоге закрыта как external-info — чтобы сдвинуться, нужно
первоисточное слово автора (доп. подсказка к passphrase, фото карты AA009926, уточнение формата).
Сайт takebobbysbitcoin.com мёртв (NXDOMAIN), но тред живёт и через VPN-прокси читается гостем.

Только GET. Ни постинга, ни ЛС, ни транзакций. Результат — в _sources/ballet_ext_2026-10-19/.
"""
import hashlib
import html as H
import io
import json
import os
import re
import ssl
import sys
import tempfile
import time
import urllib.request

MASTER = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(MASTER, "_sources", "ballet_ext_2026-10-19")
UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
      "Accept-Encoding": "gzip, deflate"}
TOPIC = "5265748"


def get(url, tries=4):
    for k in range(tries):
        try:
            req = urllib.request.Request(url, headers=UA)
            ctx = ssl.create_default_context()
            with urllib.request.urlopen(req, timeout=60, context=ctx) as r:
                data = r.read()
                enc = (r.headers.get("Content-Encoding") or "").lower()
            if "gzip" in enc:
                import gzip
                data = gzip.decompress(data)
            elif "deflate" in enc:
                import zlib
                try:
                    data = zlib.decompress(data)
                except Exception:  # noqa: BLE001
                    data = zlib.decompress(data, -zlib.MAX_WBITS)
            return data.decode("utf-8", "replace")
        except Exception as e:  # noqa: BLE001
            sys.stderr.write("  retry %d %s %s\n" % (k, type(e).__name__, str(e)[:60]))
            time.sleep(3 + 4 * k)
    return ""


def visible(fragment):
    b = re.sub(r"(?is)<blockquote.*?>", "\n[ЦИТАТА] ", fragment)
    b = re.sub(r"(?is)<(script|style)[^>]*>.*?</\1>", " ", b)
    b = re.sub(r"(?is)<br\s*/?>", "\n", b)
    b = re.sub(r"(?is)<li[^>]*>", "\n- ", b)
    b = re.sub(r"(?is)</(div|p|li|tr)>", "\n", b)
    b = re.sub(r"(?is)<[^>]+>", " ", b)
    b = H.unescape(b)
    b = re.sub(r"[ \t]+", " ", b)
    b = re.sub(r"\n\s*\n+", "\n", b)
    return b.strip()


def parse_posts(page_html):
    """Разбивает страницу на посты: (msg_id, автор, дата, текст, картинки, ссылки).

    Разметка bitcointalk (2026): пост начинается с `<a name="msgNNN"></a>`, автор — первая
    ссылка вида `action=profile;u=…`, дата — `<div class="smalltext">July 31, 2020, 01:21:18 AM</div>`,
    тело — между `<div class="post">` и следующим `<div id="subject_…>` (это уже шапка следующего поста).
    """
    posts = []
    marks = [(m.start(), m.group(1)) for m in re.finditer(r'<a name="msg(\d+)"></a>', page_html)]
    for i, (pos, mid) in enumerate(marks):
        end = marks[i + 1][0] if i + 1 < len(marks) else len(page_html)
        chunk = page_html[pos:end]
        au = re.search(r'action=profile;u=\d+"[^>]*>([^<]{1,60})</a>', chunk)
        dt = re.search(r'<div class="smalltext">\s*([A-Z][a-z]{2} \d{1,2}, \d{4}, [^<]{4,30})</div>', chunk)
        b0 = chunk.find('<div class="post">')
        b1 = chunk.find('<div id="subject_', b0)
        body = chunk[b0:b1] if b0 >= 0 else ""
        text = visible(body) if body else ""
        imgs = re.findall(r'<img[^>]+src="([^"]+)"', body)
        links = re.findall(r'<a[^>]+href="([^"]+)"', body)
        posts.append({"msg": mid,
                      "author": (au.group(1).strip() if au else "?"),
                      "date": (dt.group(1).strip() if dt else "?"),
                      "text": text,
                      "imgs": [u for u in imgs if "smiley" not in u.lower() and "profile" not in u][:6],
                      "links": sorted(set(u for u in links if u.startswith("http")
                                          and "bitcointalk.org" not in u
                                          and "balletcrypto.com/collection" not in u))[:12]})
    return posts


def total_pages(first_html):
    """Номера страниц в пагинации bitcointalk: topic=5265748.20, .40, … (смещение в постах)."""
    nums = [int(x) for x in re.findall(r'topic=%s\.(\d+)"' % TOPIC, first_html) if int(x) % 20 == 0]
    return max(nums) // 20 + 1 if nums else 1


def atomic(path, text):
    fd, tmp = tempfile.mkstemp(dir=os.path.dirname(path), suffix=".tmp")
    with os.fdopen(fd, "w", encoding="utf-8", newline="\n") as fh:
        fh.write(text)
    os.replace(tmp, path)


def main():
    os.makedirs(OUT, exist_ok=True)
    base = "https://bitcointalk.org/index.php?topic=%s.0" % TOPIC
    first = get(base)
    if not first:
        print("тред не отдаётся — выходим")
        return 1
    n = total_pages(first)
    n = min(n, 40)
    print("страниц тредa (по 20 постов): %d, беру %d" % (n, n))
    allp = parse_posts(first)
    for p in range(2, n + 1):
        h = get("https://bitcointalk.org/index.php?topic=%s.%d" % (TOPIC, (p - 1) * 20))
        pp = parse_posts(h)
        print("  стр %d: постов %d" % (p, len(pp)))
        allp.extend(pp)
        time.sleep(1.2)
    seen, posts = set(), []
    for x in allp:
        if x["msg"] in seen:
            continue
        seen.add(x["msg"])
        posts.append(x)
    posts.sort(key=lambda x: int(x["msg"]))
    print("всего постов: %d" % len(posts))

    KEY = re.compile(r"hint|passphrase|6Pn|594Y|AA0\d{5}|reveal|sticker|charact|format|upper|real series|bip ?38", re.I)
    hits = [x for x in posts if KEY.search(x["text"])]
    auth = {}
    for x in posts:
        auth[x["author"]] = auth.get(x["author"], 0) + 1
    md = io.StringIO()
    md.write("# bitcointalk topic=%s — [ANN] #takebobbysbitcoin (скачано %s UTC, прогон %d стр., %d постов)\n\n"
             % (TOPIC, time.strftime("%Y-%m-%d %H:%M", time.gmtime()), n, len(posts)))
    md.write("Авторы (топ): " + ", ".join("%s=%d" % kv for kv in sorted(auth.items(), key=lambda kv: -kv[1])[:15]) + "\n\n")
    md.write("## Посты с ключевыми словами (%d)\n\n" % len(hits))
    for x in hits:
        md.write("### msg%s — %s — %s\n\n%s\n" % (x["msg"], x["author"], x["date"], x["text"][:2600]))
        if x["imgs"]:
            md.write("\nкартинки: " + ", ".join(x["imgs"]) + "\n")
        if x["links"]:
            md.write("\nссылки: " + ", ".join(x["links"]) + "\n")
        md.write("\n---\n\n")
    atomic(os.path.join(OUT, "bitcointalk_5265748_keyposts.md"), md.getvalue())
    atomic(os.path.join(OUT, "bitcointalk_5265748_all.json"),
           json.dumps({"topic": TOPIC, "pages": n, "fetched_utc": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
                       "posts": posts}, ensure_ascii=False, indent=1))
    print("ключевых постов: %d; md=%d Б" % (len(hits), os.path.getsize(os.path.join(OUT, "bitcointalk_5265748_keyposts.md"))))
    print("sha256 json:", hashlib.sha256(open(os.path.join(OUT, "bitcointalk_5265748_all.json"), "rb").read()).hexdigest()[:16])
    return 0


if __name__ == "__main__":
    sys.exit(main())
