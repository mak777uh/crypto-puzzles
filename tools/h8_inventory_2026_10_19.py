# -*- coding: utf-8 -*-
"""H8 шаг 1: инвентарь ассетов сайта, на которые ссылаются ЛОКАЛЬНЫЕ дампы
и которых нет в папке пазла. Скачивание НЕ делает — только список + размеры (HEAD).
Транзакций, писем, публикаций нет. Только GET статики Wix."""
import re, sys, json, urllib.request, pathlib

ROOT = pathlib.Path(r"C:/Users/Admin/OneDrive/Desktop/master/puzzles/smith-lyle-moore-hunt-2-0-032btc")
DATA = ROOT / "data"

ASSET_RE = re.compile(r"144728_([0-9a-f]{32})(~mv2)?[._]?([0-9a-z]{2,5})")
HEX32_RE = re.compile(r"[0-9a-f]{32}")

# 1) все ссылки на ассеты из дампов/кода/логов
refs = {}
scan_exts = {".json", ".html", ".txt", ".md", ".log", ".xml", ".vtt", ".py", ".csv"}
for p in DATA.rglob("*"):
    if not p.is_file():
        continue
    if p.suffix.lower() not in scan_exts:
        continue
    if p.stat().st_size > 8_000_000:
        continue
    try:
        t = p.read_text(encoding="utf-8", errors="ignore")
    except Exception:
        continue
    for m in ASSET_RE.finditer(t):
        h, ext = m.group(1), m.group(3).lower()
        refs.setdefault(h, {"exts": set(), "src": set()})
        refs[h]["exts"].add(ext)
        refs[h]["src"].add(str(p.relative_to(ROOT))[:90])
for name in ("README.md", "LOG.md"):
    p = ROOT / name
    if p.exists():
        t = p.read_text(encoding="utf-8", errors="ignore")
        for m in ASSET_RE.finditer(t):
            refs.setdefault(m.group(1), {"exts": set(), "src": set()})
            refs[m.group(1)]["exts"].add(m.group(3).lower())
            refs[m.group(1)]["src"].add(name)

# 2) что уже лежит локально (по 32-hex в имени файла)
local = {}
for p in ROOT.rglob("*"):
    if not p.is_file():
        continue
    for h in HEX32_RE.findall(p.name.lower()):
        local.setdefault(h, []).append(str(p.relative_to(ROOT)))

missing = {h: v for h, v in refs.items() if h not in local}
print("ссылок на ассеты:", len(refs), "| локально хешей:", len(local), "| отсутствует:", len(missing))

def head_size(url):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0", "Referer": "https://www.smithlylemoore.com/"}, method="GET")
    try:
        with urllib.request.urlopen(req, timeout=25) as r:
            d = r.read(1)
            cl = r.headers.get("Content-Length")
            ct = r.headers.get("Content-Type")
            return (int(cl) if cl else len(d)), ct, r.status
    except Exception as e:
        return None, str(e)[:60], None

rows = []
for h, v in sorted(missing.items()):
    ext = sorted(v["exts"])[0]
    url = "https://static.wixstatic.com/media/144728_%s~mv2.%s" % (h, ext)
    n, ct, st = head_size(url)
    rows.append((h, ext, n, ct, st, sorted(v["src"])[:3]))
    print("%s .%-5s %10s  %s  %s" % (h[:12], ext, n, ct, st))

tot = sum(r[2] for r in rows if r[2])
print("\nИТОГО размер недостающего: %d байт (%.1f МБ), шт: %d" % (tot, tot / 1048576, len(rows)))
out = [{"hash": r[0], "ext": r[1], "size": r[2], "ct": r[3], "src": r[5]} for r in rows]
with open(DATA / "h8_inventory.json", "w", encoding="utf-8", newline="") as fh:
    json.dump(out, fh, ensure_ascii=False, indent=1)
print("записан data/h8_inventory.json")
