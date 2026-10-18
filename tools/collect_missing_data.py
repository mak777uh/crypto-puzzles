# -*- coding: utf-8 -*-
# Массовый сбор данных в пустые папки загадок (нет files в data/).
# Источники берутся из README.md каждой папки. Правила:
#  - OCP github tree/blob -> raw (README.md, analysis/leads.md, analysis/tested.md)
#  - reddit.com/r/.../comments/<id> -> pullpush.io submission + comments JSON
#  - пропуск: блокчейн-эксплореры, twitter/x, youtube (нет полезного контента)
#  - фолбэк r.jina.ai для HTML-страниц, если прямой fetch пустой/403
# Каждая папка получает data/ + data/SOURCES.md (+ LOG.md при необходимости).
import os, re, json, time, ssl, urllib.request, urllib.parse, hashlib
from concurrent.futures import ThreadPoolExecutor, as_completed

ROOT = r"C:\Users\Admin\OneDrive\Desktop\master\puzzles"
DEADLINE = time.time() + 780  # 13 мин запас под лимит 15 мин/запуск
UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"}
CTX = ssl.create_default_context()

SKIP = re.compile(r"(mempool\.space|blockstream\.info|etherscan\.io|blockchair\.com|litecoinspace\.org|"
                  r"basescan\.org|blockchain\.com|btc\.com|twitter\.com|/x\.com/|youtube\.com|youtu\.be|"
                  r"google\.com|web\.archive\.org)", re.I)
URL_RE = re.compile(r"https?://[^\s\)\]\}\"'<>`]+")
OCP_RE = re.compile(r"github\.com/floflo777/open-crypto-puzzles/tree/main/([^#\s]+)")
BLOB_RE = re.compile(r"github\.com/([^/]+)/([^/]+)/(?:blob|tree)/([^/]+)/(.+)")
REDDIT_RE = re.compile(r"(?:www\.)?reddit\.com/r/[^/]+/comments/([a-z0-9]+)", re.I)
HTMLISH = re.compile(r"\.(md|html?|json|txt|csv)(\?|$)", re.I)

def clean_url(u):
    return u.rstrip(".,;:'\"")

def fetch(url, timeout=20):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=timeout, context=CTX) as r:
        data = r.read()
        ct = r.headers.get("Content-Type", "")
    return data, ct

def fetch_retry(url, is_html_page=False):
    """Прямой fetch; при неудаче/пустоте -- фолбэк r.jina.ai (только для html/md)."""
    try:
        data, ct = fetch(url)
        if data and len(data) > 200:
            return data, ct, "direct"
    except Exception as e:
        err1 = str(e)[:80]
    else:
        err1 = "empty/%dB" % (len(data) if data else 0)
    if is_html_page:
        try:
            data, ct = fetch("https://r.jina.ai/" + url, timeout=30)
            if data and len(data) > 200:
                return data, "text/plain", "jina"
        except Exception as e:
            err1 += " | jina: " + str(e)[:60]
    raise RuntimeError(err1)

def ext_for(url, ct, data):
    path = urllib.parse.urlparse(url).path.lower()
    m = re.search(r"\.(png|jpe?g|gif|webp|pdf|zip|json|txt|md|html?|csv|mp4|m4a|webm|svg)$", path)
    if m:
        return "." + m.group(1)
    ct = (ct or "").lower()
    for k, v in [("png", "image/png"), ("jpeg", "image/jpeg"), ("gif", "image/gif"),
                 ("webp", "image/webp"), ("pdf", "application/pdf"),
                 ("json", "json"), ("html", "html"), ("plain", "txt")]:
        if v in ct:
            return "." + k
    if data[:8] == b"\x89PNG\r\n\x1a\n":
        return ".png"
    if data[:3] == b"\xff\xd8\xff":
        return ".jpg"
    if data[:1] in (b"{", b"["):
        return ".json"
    return ".bin"

def slug_from_url(url, maxlen=50):
    p = urllib.parse.urlparse(url)
    name = os.path.basename(p.path) or p.netloc
    name = re.sub(r"[^A-Za-z0-9._-]+", "_", name).strip("_")
    if not name:
        name = hashlib.md5(url.encode()).hexdigest()[:8]
    return name[:maxlen]

def plan_urls(readme_text):
    """Возвращает упорядоченный список (url, kind, note)."""
    urls, seen = [], set()
    for raw in URL_RE.findall(readme_text):
        u = clean_url(raw)
        if u in seen:
            continue
        seen.add(u)
        if SKIP.search(u):
            continue
        urls.append(u)
    plan = []
    # 1) OCP-папка -> README + analysis
    for u in list(urls):
        m = OCP_RE.search(u)
        if m:
            base = "https://raw.githubusercontent.com/floflo777/open-crypto-puzzles/main/" + m.group(1).rstrip("/")
            for suf in ("/README.md", "/analysis/leads.md", "/analysis/tested.md"):
                plan.append((base + suf, "file", "OCP"))
            urls.remove(u)
    # 2) generic github blob -> raw
    for u in list(urls):
        m = BLOB_RE.search(u)
        if m and u.lower().endswith((".md", ".txt", ".py", ".json", ".csv")):
            plan.append((f"https://raw.githubusercontent.com/{m.group(1)}/{m.group(2)}/{m.group(3)}/{m.group(4)}", "file", "github-raw"))
            urls.remove(u)
    # 3) reddit -> pullpush
    for u in list(urls):
        m = REDDIT_RE.search(u)
        if m:
            rid = m.group(1)
            plan.append((f"https://api.pullpush.io/reddit/search/submission/?ids={rid}", "file", "reddit-post"))
            plan.append((f"https://api.pullpush.io/reddit/search/comment/?link_id={rid}", "file", "reddit-comments"))
            urls.remove(u)
    # 4) остальное (html-страницы -- с фолбэком)
    for u in urls:
        kind = "file"
        plan.append((u, kind, "page"))
    return plan

def has_data(folder):
    d = os.path.join(folder, "data")
    if not os.path.isdir(d):
        return False
    for r, _, fs in os.walk(d):
        if fs:
            return True
    return False

def process_folder(folder):
    name = os.path.basename(folder)
    if time.time() > DEADLINE:
        return name, "SKIP", "deadline"
    readme = os.path.join(folder, "README.md")
    if not os.path.isfile(readme):
        return name, "SKIP", "no README"
    try:
        text = open(readme, encoding="utf-8", errors="replace").read()
    except Exception as e:
        return name, "SKIP", str(e)[:60]
    plan = plan_urls(text)
    if not plan:
        return name, "NONE", "no source urls"
    data_dir = os.path.join(folder, "data")
    os.makedirs(data_dir, exist_ok=True)
    results, saved, attempts = [], 0, 0
    for i, (url, kind, note) in enumerate(plan, 1):
        if attempts >= 8 or saved >= 6 or time.time() > DEADLINE:
            break
        attempts += 1
        is_page = (note in ("page", "OCP") and HTMLISH.search(url)) or note == "page"
        try:
            data, ct, via = fetch_retry(url, is_html_page=True if note == "page" or (note == "OCP" and url.endswith(".md")) else False)
            ext = ext_for(url, ct, data)
            fn = f"{saved:02d}_{slug_from_url(url)}{ext}"
            # избегаем двойных расширений вида x.md.md
            fn = re.sub(r"(\.\w+)(\.\w+)$", lambda m: m.group(1) if m.group(1) == m.group(2) else m.group(0), fn)
            fp = os.path.join(data_dir, fn)
            with open(fp, "wb") as f:
                f.write(data)
            saved += 1
            results.append((url, fn, len(data), via, note, "OK"))
        except Exception as e:
            results.append((url, "", 0, "-", note, "FAIL: " + str(e)[:70]))
    # SOURCES.md
    lines = [f"# SOURCES — сбор данных 2026-10-17", "",
             f"Папка: {name}. Попыток: {attempts}, сохранено: {saved}.", "",
             "| # | URL | Файл | Байт | Транспорт | Тип | Статус |", "|---|-----|------|------|-----------|-----|--------|"]
    for i, (u, fn, n, via, note, st) in enumerate(results, 1):
        lines.append(f"| {i} | {u} | {fn} | {n} | {via} | {note} | {st} |")
    with open(os.path.join(data_dir, "SOURCES.md"), "w", encoding="utf-8") as f:
        f.write("\n".join(lines) + "\n")
    # LOG.md (создать/дописать)
    logp = os.path.join(folder, "LOG.md")
    ts = time.strftime("%Y-%m-%d %H:%M")
    ok = [r for r in results if r[5] == "OK"]
    fail = [r for r in results if r[5] != "OK"]
    block = [f"\n## {ts} — Big Pickle (big-pickle / OpenCode, Windows) — сбор данных в пустую папку",
             f"- Делал: массовый обход README → источники; попыток {attempts}, сохранено {saved} в `data/`.",
             f"- Успех ({len(ok)}): " + ("; ".join(os.path.basename(r[1]) for r in ok) or "—"),
             f"- Отказ ({len(fail)}): " + ("; ".join(r[0][:70] + " [" + r[5][:40] + "]" for r in fail) or "—"),
             "- Артефакты: `data/SOURCES.md` + скачанные файлы.",
             "- Проверено: да (HTTP-статус/байты); содержательная разборка — следующим шагом."]
    existing = ""
    if os.path.isfile(logp):
        existing = open(logp, encoding="utf-8", errors="replace").read()
    else:
        existing = f"# LOG.md — {name}\n\n> Записи добавляются в конец; чужое не затирать.\n"
    with open(logp, "w", encoding="utf-8") as f:
        f.write(existing.rstrip() + "\n" + "\n".join(block) + "\n")
    return name, "OK", f"{saved}/{attempts} saved"

def main():
    folders = sorted(
        os.path.join(ROOT, d) for d in os.listdir(ROOT)
        if os.path.isdir(os.path.join(ROOT, d)) and not has_data(os.path.join(ROOT, d))
    )
    print(f"empty folders: {len(folders)}", flush=True)
    summary = []
    with ThreadPoolExecutor(max_workers=6) as ex:
        futs = {ex.submit(process_folder, f): f for f in folders}
        for fut in as_completed(futs):
            try:
                name, st, msg = fut.result()
            except Exception as e:
                name, st, msg = os.path.basename(futs[fut]), "ERR", str(e)[:80]
            summary.append((name, st, msg))
            print(f"{st:5} {name} — {msg}", flush=True)
    summary.sort()
    out = os.path.join(os.path.dirname(ROOT), "DATA_COLLECTION_2026-10-17.md")
    with open(out, "w", encoding="utf-8") as f:
        f.write("# СБОР ДАННЫХ В ПУСТЫЕ ПАПКИ — 2026-10-17\n\n")
        f.write(f"Папок без данных: {len(folders)}. Обработано: {len(summary)}.\n\n")
        f.write("| Папка | Статус | Результат |\n|---|---|---|\n")
        for n, s, m in summary:
            f.write(f"| {n} | {s} | {m} |\n")
    print("DONE ->", out, flush=True)

if __name__ == "__main__":
    main()
