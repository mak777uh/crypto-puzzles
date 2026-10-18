# -*- coding: utf-8 -*-
# Повторный проход для 7 папок, где сбор дал 0 файлов:
#  - корень github OCP -> raw README.md репозитория (маленький файл, без IncompleteRead)
#  - страницы с 403 -> зеркало web.archive.org (wayback availability API)
# Результат дописывается в data/ той же папки и в SOURCES.md / LOG.md.
import os, re, json, time, ssl, urllib.request, urllib.parse

ROOT = r"C:\Users\Admin\OneDrive\Desktop\master\puzzles"
UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"}
CTX = ssl.create_default_context()

FOLDERS = [
    "aenigma-shards-nft",
    "demint-bitcoin-evangelism",
    "game-of-satoshi-season-1",
    "zk-guess-chainhackers-31",
    "purebasic-t85211-600eur",
    "rectorsquid-arrow-puzzle-50usd",
    "actuarial-science-nft-hunt-10eth",
]

OCP_ROOT = re.compile(r"https?://github\.com/floflo777/open-crypto-puzzles/?$")
URL_RE = re.compile(r"https?://[^\s\)\]\}\"\'<>`]+")


def fetch(url, timeout=25):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=timeout, context=CTX) as r:
        return r.read(), r.headers.get("Content-Type", "")


def wayback(url, timeout=30):
    api = "https://archive.org/wayback/available?url=" + urllib.parse.quote(url, safe="")
    data, _ = fetch(api, timeout)
    js = json.loads(data.decode("utf-8", "replace"))
    snap = (js.get("archived_snapshots") or {}).get("closest") or {}
    if not snap.get("available"):
        raise RuntimeError("no wayback snapshot")
    wb = snap["url"]
    if "id_" not in wb:
        wb = wb.replace("/web/", "/web/id_/", 1)
    data, ct = fetch(wb, timeout)
    return data, ct, wb


def slug(url, maxlen=50):
    p = urllib.parse.urlparse(url)
    name = os.path.basename(p.path) or p.netloc
    name = re.sub(r"[^A-Za-z0-9._-]+", "_", name).strip("_") or "page"
    return name[:maxlen]


def ext_for(url, ct, data):
    path = urllib.parse.urlparse(url).path.lower()
    m = re.search(r"\.(png|jpe?g|gif|webp|pdf|md|html?|txt|json)$", path)
    if m:
        return "." + m.group(1)
    ct = (ct or "").lower()
    if "png" in ct: return ".png"
    if "jpeg" in ct or "jpg" in ct: return ".jpg"
    if "json" in ct: return ".json"
    if "html" in ct: return ".html"
    if data[:1] in (b"{", b"["): return ".json"
    if b"<html" in data[:500].lower() or b"<!doctype" in data[:500].lower(): return ".html"
    return ".txt"


def main():
    report = []
    for name in FOLDERS:
        folder = os.path.join(ROOT, name)
        readme = os.path.join(folder, "README.md")
        text = open(readme, encoding="utf-8", errors="replace").read()
        urls = []
        for raw in URL_RE.findall(text):
            u = raw.rstrip(".,;:'\"")
            if u not in urls:
                urls.append(u)
        data_dir = os.path.join(folder, "data")
        os.makedirs(data_dir, exist_ok=True)
        # начальный индекс файлов
        idx = len([f for f in os.listdir(data_dir) if f != "SOURCES.md"])
        results, saved = [], 0
        for u in urls:
            if saved >= 4:
                break
            if OCP_ROOT.match(u):
                cands = [("https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/README.md", "raw-ocp")]
                for cu, note in cands:
                    try:
                        data, ct = fetch(cu)
                        if len(data) < 100:
                            raise RuntimeError("too small")
                        fn = f"{idx:02d}_ocp_repo_readme.md"
                        open(os.path.join(data_dir, fn), "wb").write(data)
                        results.append((cu, fn, len(data), note, "OK"))
                        saved, idx = saved + 1, idx + 1
                    except Exception as e:
                        results.append((cu, "", 0, note, "FAIL: " + str(e)[:60]))
                continue
            # обычный URL: прямой, затем wayback
            ok = False
            try:
                data, ct = fetch(u)
                if len(data) > 300:
                    fn = f"{idx:02d}_{slug(u)}{ext_for(u, ct, data)}"
                    open(os.path.join(data_dir, fn), "wb").write(data)
                    results.append((u, fn, len(data), "direct", "OK"))
                    saved, idx, ok = saved + 1, idx + 1, True
            except Exception as e:
                err = str(e)[:60]
            if not ok:
                try:
                    data, ct, wb = wayback(u)
                    fn = f"{idx:02d}_wb_{slug(u)}{ext_for(u, ct, data)}"
                    open(os.path.join(data_dir, fn), "wb").write(data)
                    results.append((wb, fn, len(data), "wayback", "OK"))
                    saved, idx = saved + 1, idx + 1
                except Exception as e:
                    results.append((u, "", 0, "-", f"FAIL: {err} | wayback: {str(e)[:50]}"))
        # дописать SOURCES.md
        sp = os.path.join(data_dir, "SOURCES.md")
        prev = open(sp, encoding="utf-8").read() if os.path.isfile(sp) else "# SOURCES\n"
        prev = prev.rstrip() + "\n\n## Повторный проход (raw OCP / wayback)\n\n"
        prev += "| URL | Файл | Байт | Транспорт | Статус |\n|-----|------|------|-----------|--------|\n"
        for u, fn, n, via, st in results:
            prev += f"| {u} | {fn} | {n} | {via} | {st} |\n"
        open(sp, "w", encoding="utf-8").write(prev)
        # дописать LOG.md
        okn = sum(1 for r in results if r[4] == "OK")
        logp = os.path.join(folder, "LOG.md")
        ts = time.strftime("%Y-%m-%d %H:%M")
        block = (f"\n## {ts} — Big Pickle (big-pickle / OpenCode, Windows) — повторный сбор (0/предыдущий)\n"
                 f"- Причина прогона: предыдущая попытка дала 0 файлов (GitHub IncompleteRead / HTTP 403).\n"
                 f"- Метод: raw-README OCP-репо и/или зеркало web.archive.org.\n"
                 f"- Результат: сохранено {okn} из {len(results)}; см. `data/SOURCES.md`.\n")
        if os.path.isfile(logp):
            ex = open(logp, encoding="utf-8", errors="replace").read()
        else:
            ex = f"# LOG.md — {name}\n\n> Записи добавляются в конец; чужое не затирать.\n"
        open(logp, "w", encoding="utf-8").write(ex.rstrip() + "\n" + block)
        report.append((name, okn, len(results)))
        print(f"{name}: +{okn}/{len(results)}", flush=True)
    print("RETRY DONE")


if __name__ == "__main__":
    main()
