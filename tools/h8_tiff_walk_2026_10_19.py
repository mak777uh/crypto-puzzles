# -*- coding: utf-8 -*-
"""H8 шаг 10: ручной обход TIFF-структуры всех JPEG/PNG ассетов — полный список
тегов, включая GPS-IFD и Exif-IFD (PIL его иногда не отдаёт), плюс UserComment,
ImageDescription, XP*-поля и все строки XMP с числами/координатами."""
import pathlib, re, struct
from PIL import Image

ROOT = pathlib.Path(r"C:/Users/Admin/OneDrive/Desktop/master/puzzles/smith-lyle-moore-hunt-2-0-032btc")
OUT = ROOT / "data" / "h8_assets"
LOGP = ROOT / "data" / "h8_tiff.log"
lines = []

def w(*a):
    s = " ".join(str(x) for x in a)
    lines.append(s)
    with open(LOGP, "a", encoding="utf-8", newline="") as fh:
        fh.write(s + "\n")

TYPE_SIZES = {1: 1, 2: 1, 3: 2, 4: 4, 5: 8, 6: 1, 7: 1, 8: 2, 9: 4, 10: 8, 11: 4, 12: 8}
TAGNAMES = {0x010e: "ImageDescription", 0x010f: "Make", 0x0110: "Model", 0x0112: "Orientation",
            0x0131: "Software", 0x0132: "DateTime", 0x013b: "Artist", 0x8298: "Copyright",
            0x9003: "DateTimeOriginal", 0x9004: "DateTimeDigitized", 0x927c: "MakerNote",
            0x9286: "UserComment", 0x011a: "XResolution", 0x011b: "YResolution",
            0x8769: "ExifIFD", 0x8825: "GPSIFD", 0x829a: "ExposureTime", 0x9c9b: "XPSubject",
            0x9c9e: "XPTitle", 0x9c9d: "XPAuthor", 0x9c9c: "XPKeywords", 0x9c9f: "XPComment",
            0x0100: "InteropIndex", 0xa002: "PixelXDimension", 0xa003: "PixelYDimension",
            # GPS
            0x0000: "GPSVersionID", 0x0001: "GPSLatitudeRef", 0x0002: "GPSLatitude",
            0x0003: "GPSLongitudeRef", 0x0004: "GPSLongitude", 0x0005: "GPSAltitudeRef",
            0x0006: "GPSAltitude", 0x0007: "GPSTimeStamp", 0x0008: "GPSSatellites",
            0x0009: "GPSStatus", 0x000a: "GPSMeasureMode", 0x0011: "GPSDOP",
            0x0012: "GPSSpeedRef", 0x0013: "GPSSpeed", 0x0014: "GPSTrackRef", 0x0015: "GPSTrack",
            0x0016: "GPSImgDirectionRef", 0x0017: "GPSImgDirection", 0x0018: "GPSMapDatum",
            0x001b: "GPSDateStamp", 0x001d: "GPSDate", 0x0012: "GPSSpeedRef"}

def parse_ifd(buf, base, off, little, depth=0, name="IFD0"):
    out = []
    if off + 4 > len(buf):
        return out
    n = struct.unpack_from("<H" if little else ">H", buf, off)[0]
    for i in range(n):
        p = off + 2 + i * 12
        if p + 12 > len(buf):
            break
        tag, typ, cnt = struct.unpack_from("<HHI" if little else ">HHI", buf, p)
        valraw = buf[p + 8:p + 12]
        sz = TYPE_SIZES.get(typ, 1) * cnt
        if sz <= 4:
            val = valraw
        else:
            vo = struct.unpack_from("<I" if little else ">I", buf, p + 8)[0]
            val = buf[base + vo:base + vo + sz] if vo + sz <= len(buf) - base else b""
        dec = None
        if typ in (2, 7):
            dec = re.sub(rb"[^\x20-\x7e]", b"", val).decode("ascii", "replace")
        elif typ in (4, 9, 3, 6, 8, 10, 11, 12):
            pass
        tn = TAGNAMES.get(tag, "0x%04x" % tag)
        out.append((name, tn, typ, cnt, val, dec))
        if tag in (0x8769, 0x8825) and sz >= 4:
            sub = struct.unpack_from("<I" if little else ">I", buf, p + 8)[0]
            subname = "GPS" if tag == 0x8825 else "EXIF"
            out += parse_ifd(buf, base, base + sub, little, depth + 1, subname)
    return out

def jpeg_app1(buf):
    """вернуть TIFF-блок из APP1 Exif"""
    p = 2
    while p + 4 < len(buf):
        if buf[p] != 0xFF:
            p += 1
            continue
        m = buf[p + 1]
        ln = int.from_bytes(buf[p + 2:p + 4], "big")
        seg = buf[p + 4:p + 2 + ln]
        if m == 0xE1 and seg[:6] == b"Exif\x00\x00":
            return seg[6:]
        if m == 0xDA:
            break
        p += 2 + ln
    return None

w("=== H8 шаг 10: ручной TIFF-обход, %s ===")
for f in sorted(OUT.iterdir()):
    if f.suffix.lower() not in (".jpg", ".jpeg", ".png"):
        continue
    b = f.read_bytes()
    tiff = None
    if b[:2] == b"\xff\xd8":
        tiff = jpeg_app1(b)
        src = "JPEG APP1"
    elif b[:8] == b"\x89PNG\r\n\x1a\n":
        i = b.find(b"eXIf")
        tiff = b[i + 4:] if i > 0 else None
        src = "PNG eXIf"
    if not tiff or len(tiff) < 8:
        w("")
        w("%s — TIFF нет" % f.name)
        continue
    little = tiff[:2] == b"II"
    off = struct.unpack("<I" if little else ">I", tiff[4:8])[0]
    entries = parse_ifd(tiff, 0, off, little)
    gps = [e for e in entries if e[0] == "GPS"]
    interesting = [e for e in entries if e[1] in
                   ("ImageDescription", "Artist", "Copyright", "Software", "Make", "Model",
                    "DateTime", "DateTimeOriginal", "UserComment", "XPTitle", "XPAuthor",
                    "XPComment", "XPKeywords", "XPSubject")]
    w("")
    w("%s  (%s, %d тегов, GPS-тегов %d)" % (f.name, src, len(entries), len(gps)))
    for e in interesting:
        w("    %-20s %s" % (e[1], (e[5] or re.sub(rb"[^\x20-\x7e]", b".", e[4]).decode())[:120]))
    for e in gps:
        if e[1] in ("GPSLatitude", "GPSLongitude"):
            vals = []
            v = e[4]
            for k in range(3):
                nu, de = struct.unpack_from("<II" if little else ">II", v, k * 8)
                vals.append(nu / de if de else 0)
            deg = vals[0] + vals[1] / 60 + vals[2] / 3600
            w("    %-20s %s  = %.6f  (DMS %d°%02d'%.3f\")" % (e[1], "/".join("%.4f" % x for x in vals), deg,
                                                             int(vals[0]), int(vals[1]), vals[2]))
        else:
            w("    %-20s %s" % (e[1], (e[5] or re.sub(rb"[^\x20-\x7e]", b".", e[4]).decode())[:80]))
print("готово, %d строк" % len(lines))
