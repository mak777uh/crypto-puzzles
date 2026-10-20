# -*- coding: utf-8 -*-
"""Извлечение текста и иллюстраций из книги Нуаза (ePub / zip / html / pdf) для Nuaza-пазла.

Назначение: когда Илья принесёт файл книги (или бесплатный образец), одной командой получить
  1) текст по главам (в порядке spine ePub) в <out>/text/,
  2) все встроенные изображения в <out>/images/ + контактный лист <out>/contact_sheet.png,
  3) таблицу французских слов BIP39, встречающихся в тексте, с числом вхождений
     (indice 10 прямо говорит: million/minutes/opinions НЕ подходят, т.к. встречаются
     несколько раз или во множественном числе — значит частотный фильтр легитимен),
  4) ранги этих слов в french.txt и английские аналоги (нужны для oracle).

Ничего не покупает, никуда не пишет кроме локальной папки, сеть не трогает.

Использование:
    python tools/nz_epub_extract.py <файл или папка> [--out data/book] [--sheet]
"""
from __future__ import annotations

import argparse
import html as htmllib
import io
import re
import unicodedata
import zipfile
from pathlib import Path

D = Path(__file__).resolve().parent.parent
FR = D / "data" / "bip39_french.txt"
EN = D / "data" / "bip39_english.txt"


def load_fr_en():
    def rd(p):
        raw = p.read_bytes().decode("utf-8-sig")
        return [unicodedata.normalize("NFC", w.strip()) for w in raw.splitlines() if w.strip()]
    fr, en = rd(FR), rd(EN)
    assert len(fr) == len(en) == 2048, "списки BIP39 должны быть по 2048 слов"
    return fr, en


TAG = re.compile(r"<[^>]+>")
WS = re.compile(r"\s+")


def html_to_text(s: str) -> str:
    s = re.sub(r"(?is)<(script|style)[^>]*>.*?</\1>", " ", s)
    s = s.replace("</p>", "\n").replace("<br", "\n<br").replace("</div>", "\n").replace("</h", "\n<h")
    s = htmllib.unescape(TAG.sub(" ", s))
    return "\n".join(WS.sub(" ", ln).strip() for ln in s.splitlines())


def spine_order(z: zipfile.ZipFile) -> list[str]:
    """Порядок глав ePub: container.xml -> .opf -> <spine> -> <manifest href>."""
    try:
        cont = z.read("META-INF/container.xml").decode("utf-8", "replace")
    except KeyError:
        return []
    m = re.search(r'full-path="([^"]+\.opf)"', cont)
    if not m:
        return []
    opf_path = m.group(1)
    opf = z.read(opf_path).decode("utf-8", "replace")
    base = str(Path(opf_path).parent).replace("\\", "/")
    base = "" if base in (".", "") else base + "/"
    idhref = dict(re.findall(r'<item[^>]+id="([^"]+)"[^>]+href="([^"]+)"', opf))
    idhref.update({h: i for i, h in re.findall(r'<item[^>]+href="([^"]+)"[^>]+id="([^"]+)"', opf)})
    out = []
    for sid in re.findall(r'<itemref[^>]+idref="([^"]+)"', opf):
        h = idhref.get(sid)
        if h:
            p = base + h
            if p in z.namelist():
                out.append(p)
    return out


def collect_items(src: Path) -> list[tuple[str, bytes]]:
    """Возвращает [(имя, байты)] в порядке чтения: epub -> spine, zip, html, pdf, папка."""
    items: list[tuple[str, bytes]] = []
    if src.is_dir():
        for p in sorted(src.rglob("*")):
            if p.is_file():
                items.extend(collect_items(p))
        return items
    if src.suffix.lower() in (".epub", ".zip", ".cbz"):
        with zipfile.ZipFile(src) as z:
            names = [n for n in z.namelist() if not n.endswith("/")]
            ordered = [n for n in spine_order(z) if n in names]
            ordered += [n for n in names if n not in ordered and not n.startswith("META-INF")]
            for n in ordered:
                items.append((n, z.read(n)))
    elif src.suffix.lower() == ".pdf":
        try:
            from pypdf import PdfReader  # type: ignore
        except ImportError:
            try:
                from PyPDF2 import PdfReader  # type: ignore
            except ImportError:
                raise SystemExit("для .pdf нужен pypdf/PyPDF2 (pip install pypdf) — пока используйте ePub")
        r = PdfReader(str(src))
        for i, pg in enumerate(r.pages):
            items.append(("page_%04d.xhtml" % (i + 1), (pg.extract_text() or "").encode("utf-8")))
            try:
                for im in pg.images:
                    items.append(("p%04d_%s" % (i + 1, im.name), im.data))
            except Exception as e:  # не все бэкенды умеют извлекать картинки
                items.append(("p%04d__imgerror.txt" % (i + 1), str(e).encode()))
    else:
        items.append((src.name, src.read_bytes()))
    return items


IMG_EXT = (".png", ".jpg", ".jpeg", ".gif", ".webp", ".bmp", ".tif", ".tiff")


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("src")
    ap.add_argument("--out", default="data/book")
    ap.add_argument("--sheet", action="store_true", help="сделать контактный лист изображений")
    a = ap.parse_args()
    src = Path(a.src)
    if not src.is_absolute():
        src = D / src
    out = Path(a.out)
    if not out.is_absolute():
        out = D / out
    (out / "text").mkdir(parents=True, exist_ok=True)
    (out / "images").mkdir(parents=True, exist_ok=True)

    fr, en = load_fr_en()
    frset = {w: i for i, w in enumerate(fr)}
    items = collect_items(src)
    texts: dict[str, str] = {}
    imgs: list[Path] = []
    for name, data in items:
        low = name.lower()
        if low.endswith((".xhtml", ".html", ".htm", ".xml", ".txt", ".text")):
            t = html_to_text(data.decode("utf-8", "replace"))
            if t.strip():
                texts[name] = t
        elif low.endswith((".css", ".js", ".opf", ".ncx")) or low.startswith("mimetype"):
            continue
        elif low.endswith(IMG_EXT):
            p = out / "images" / re.sub(r"[^\w.\-]", "_", Path(name).name)
            if p.exists():
                p = p.with_name("%d_%s" % (len(imgs) + 1, p.name))
            p.write_bytes(data)
            imgs.append(p)
    for i, (name, t) in enumerate(sorted(texts.items())):
        (out / "text" / ("%03d_%s.txt" % (i, re.sub(r"[^\w.\-]", "_", Path(name).stem)))).write_text(t, "utf-8")

    # словоупотребление по всему тексту
    all_text = "\n".join(texts.values())
    toks = re.findall(r"[A-Za-zÀ-ÿ’'éèêàâîôûçœ\-]+", unicodedata.normalize("NFC", all_text.lower()))
    def norm(w):
        return w.strip("'’-")
    counts: dict[str, int] = {}
    for t in toks:
        w = norm(t)
        if w in frset:
            counts[w] = counts.get(w, 0) + 1
    once = sorted([w for w, c in counts.items() if c == 1], key=lambda w: frset[w])
    many = sorted([w for w, c in counts.items() if c > 1], key=lambda w: -counts[w])

    print("файл: %s | элементов: %d | текстовых: %d | изображений: %d" % (src, len(items), len(texts), len(imgs)))
    print("символов текста: %d" % len(all_text))
    if texts:
        print("--- первые строки по главам ---")
        for i, (name, t) in enumerate(sorted(texts.items())):
            head = " ".join(t.split())[:150]
            print("%3d %-40s %s" % (i, name[:40], head))
    print("--- BIP39-fr во встреченном тексте: %d уникальных, ровно один раз: %d ---" % (len(counts), len(once)))
    print("уникальны (ранг fr -> en):")
    for w in once:
        print("  %5d %-14s -> %s" % (frset[w], w, en[frset[w]]))
    print("повторяются (отбрасываются по indice 10), топ-25:", ", ".join("%s×%d" % (w, counts[w]) for w in many[:25]))
    (out / "bip39_hits.json").write_text(
        __import__("json").dumps({"src": str(src), "counts": counts, "unique": once,
                                  "ranks": {w: frset[w] for w in counts}}, ensure_ascii=False, indent=1), "utf-8")
    print("сохранено: %s" % (out / "bip39_hits.json"))

    if a.sheet and imgs:
        try:
            from PIL import Image
        except ImportError:
            print("PIL недоступен — контактный лист пропущен")
            return 0
        cells, cs = [], 300
        for p in imgs[:60]:
            try:
                im = Image.open(p).convert("RGB")
            except Exception:
                continue
            im.thumbnail((cs, cs))
            cells.append((p.name, im))
        if not cells:
            print("читаемых изображений нет")
            return 0
        cols = 4
        rows = (len(cells) + cols - 1) // cols
        sheet = Image.new("RGB", (cols * cs, rows * (cs + 18)), "white")
        for i, (nm, im) in enumerate(cells):
            x, y = (i % cols) * cs, (i // cols) * (cs + 18)
            sheet.paste(im, (x + (cs - im.width) // 2, y + 18))
            try:
                from PIL import ImageDraw
                ImageDraw.Draw(sheet).text((x + 3, y + 2), nm[:44], fill="black")
            except Exception:
                pass
        sp = out / "contact_sheet.png"
        sheet.save(sp)
        print("контактный лист: %s (%d изображений)" % (sp, len(cells)))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
