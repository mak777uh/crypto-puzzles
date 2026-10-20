# -*- coding: utf-8 -*-
"""H8 шаг 8: полный разбор EXIF/XMP/ICC-тегов всех изображений сайта
(напоминание: в Hunt #2 авторы уже прятали подсказки в EXIF — minnow.jpeg дал
GPS 22.6001,-73.41 и дату 1964-09-26; пиратское фото — 25.9126,-44.1054).
Цель: найти GPS/даты/автора/комментарии во ВСЕХ ассетах, а не только в двух."""
import pathlib, re
from PIL import Image, ExifTags
import xml.etree.ElementTree as ET

ROOT = pathlib.Path(r"C:/Users/Admin/OneDrive/Desktop/master/puzzles/smith-lyle-moore-hunt-2-0-032btc")
OUT = ROOT / "data" / "h8_assets"
LOGP = ROOT / "data" / "h8_exif.log"
lines = []

def w(*a):
    s = " ".join(str(x) for x in a)
    lines.append(s)
    with open(LOGP, "w", encoding="utf-8", newline="") as fh:
        fh.write("\n".join(lines) + "\n")

def dms_to_deg(d, m, s, ref):
    try:
        def f(v):
            return float(v.num) / float(v.den) if hasattr(v, "num") else float(v)
        deg = f(d) + f(m) / 60 + f(s) / 3600
    except Exception:
        return None
    if ref in ("S", "W"):
        deg = -deg
    return round(deg, 5)

TAGS = ExifTags.TAGS
GPSTAGS = ExifTags.GPSTAGS

for p in sorted(OUT.iterdir()):
    if p.suffix.lower() not in (".jpg", ".jpeg", ".png", ".tif", ".webp"):
        continue
    try:
        im = Image.open(p)
    except Exception as e:
        w("%s — не читается (%r)" % (p.name, e))
        continue
    ex = {}
    raw = {}
    try:
        raw = im.getexif()
        for k, v in raw.items():
            ex[TAGS.get(k, str(k))] = v
    except Exception as e:
        w("%s — getexif ошибка %r" % (p.name, e))
    ifd = {}
    try:
        for key in (0x8825, 0x8769):
            if key in raw:
                sub = im.getexif().get_ifd(key)
                for k, v in sub.items():
                    nm = GPSTAGS.get(k, TAGS.get(k, str(k))) if key == 0x8825 else str(k)
                    ifd[nm] = v
    except Exception:
        pass
    xmp = im.info.get("XML:com.adobe.xmp") or im.info.get("xmp")
    if isinstance(xmp, bytes):
        xmp = xmp.decode("utf-8", "replace")
    txt = {}
    try:
        txt = {k: (v if isinstance(v, str) else str(v))[:200] for k, v in im.text.items()
               if not k.startswith("XML")}
    except Exception:
        pass
    gps = None
    if ifd:
        lat = ifd.get("GPSLatitude"); lon = ifd.get("GPSLongitude")
        if lat and lon:
            gps = (dms_to_deg(lat[0], lat[1], lat[2], ifd.get("GPSLatitudeRef", "N")),
                   dms_to_deg(lon[0], lon[1], lon[2], ifd.get("GPSLongitudeRef", "E")))
    w("")
    w("### %s  %dx%d  %s" % (p.name, im.size[0], im.size[1], im.format))
    interesting = {k: v for k, v in ex.items()
                   if k in ("ImageDescription", "Make", "Model", "Software", "Artist", "Copyright",
                            "DateTime", "DateTimeOriginal", "DateTimeDigitized", "UserComment",
                            "XPComment", "XPAuthor", "XPSubject", "XPTitle", "XPKeywords",
                            "ImageUniqueID", "LensModel", "GPSVersionID")}
    for k, v in interesting.items():
        w("    EXIF %-18s %s" % (k, str(v)[:180].replace("\n", " ")))
    for k, v in ifd.items():
        if k.startswith("GPS") and k not in ("GPSLatitude", "GPSLongitude", "GPSLatitudeRef", "GPSLongitudeRef"):
            w("    GPS  %-18s %s" % (k, str(v)[:120]))
    if gps:
        w("    >>> GPS: %.5f, %.5f  ref=%s/%s" % (gps[0], gps[1], ifd.get("GPSLatitudeRef"), ifd.get("GPSLongitudeRef")))
    if txt:
        for k, v in txt.items():
            w("    PNG-text %-14s %s" % (k, v[:160]))
    if xmp:
        # ключевые поля XMP
        fields = re.findall(r"<(dc:title|dc:creator|dc:description|dc:rights|dc:subject|xmp:CreatorTool|xmp:Nickname|xmp:Label|xmp:Comment|photoshop:Copyright|photoshop:AuthorsPosition|photoshop:Instructions|iptc4xmpCat:Code|crs:RawFileName|xmpMM:DocumentID|xmpMM:OriginalDocumentID|xmpDM:artist|xmpDM:album|xmpDM:trackNumber|xmpDM:discNumber|xmpDM:genre|pdf:Author|pdf:Keywords|pdf:Title)\b[^>]*>(.*?)</\1>",
                            xmp, re.S)
        for k, v in fields:
            vv = re.sub(r"<[^>]+>", " ", v)
            vv = re.sub(r"\s+", " ", vv).strip()
            if vv:
                w("    XMP %-32s %s" % (k.strip("{ns}"), vv[:180]))
        # любые слова, похожие на подсказку
        for m in re.finditer(r">([^<>]{6,140})<", xmp):
            s = m.group(1).strip()
            if re.search(r"(glimmer|raft|fire|ship|island|whale|moon|fortune|word|seed|pin|codebreaker|explor|password|hunt|key)", s, re.I) and not s.startswith(("http", "adobe", "ns:", "xmp", "crs", "photoshop", "tiff", "exif", "dc", "Ie", "Microsoft", "xap", "pdf", "xapMM", "aux")):
                w("    XMP? %s" % s[:160])

w("")
w("готово")
