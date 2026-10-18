#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Сканирует зеркала Piped/Invidious на доступность и наличие видео w4mpiuBP_aY.
Пишет отчёт в data/mirror/mirror_scan.txt.
"""
import os
import socket
import requests

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(os.path.dirname(HERE), "data", "mirror")
VIDEO = "w4mpiuBP_aY"
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/124 Safari/537.36"

PIPED = [
    "https://pipedapi.kavin.rocks", "https://pipedapi.adminforge.de",
    "https://pipedapi.reallyaweso.me", "https://api.piped.private.coffee",
    "https://pipedapi.leptons.xyz", "https://pipedapi.darkness.services",
    "https://pipedapi.drgns.space", "https://pipedapi.ducks.party",
]
INVID = [
    "https://yewtu.be", "https://inv.nadeko.net", "https://invidious.nerdvpn.de",
    "https://inv.us.projectsegfau.lt", "https://invidious.privacyredirect.com",
    "https://iv.melmac.space", "https://invidious.fdn.fr", "https://vid.puffyan.us",
    "https://invidious.lunar.icu", "https://invidious.jing.rocks",
]


def resolv(host):
    try:
        return socket.gethostbyname(host)
    except Exception:  # noqa: BLE001
        return None


def main():
    lines = []
    for base in PIPED:
        host = base.split("//")[1]
        ip = resolv(host)
        tag = "dns:%-15s " % (ip or "FAIL")
        if not ip:
            lines.append(tag + base + " | SKIP(dns)")
            continue
        try:
            r = requests.get(base + "/streams/" + VIDEO, headers={"User-Agent": UA}, timeout=25)
            info = "HTTP %s len %d" % (r.status_code, len(r.content))
            if r.status_code == 200:
                j = r.json()
                info += " | title=%r streams=%d" % (str(j.get("title"))[:40], len(j.get("videoStreams", [])))
            lines.append(tag + base + " | " + info)
        except Exception as e:  # noqa: BLE001
            lines.append(tag + base + " | ERR " + repr(e)[:90])
    for base in INVID:
        host = base.split("//")[1]
        ip = resolv(host)
        tag = "dns:%-15s " % (ip or "FAIL")
        if not ip:
            lines.append(tag + base + " | SKIP(dns)")
            continue
        try:
            r = requests.get(base + "/api/v1/videos/" + VIDEO, headers={"User-Agent": UA}, timeout=25)
            info = "HTTP %s len %d" % (r.status_code, len(r.content))
            if r.status_code == 200:
                j = r.json()
                info += " | title=%r fmt=%d" % (str(j.get("title"))[:40], len(j.get("formatStreams", [])) + len(j.get("adaptiveFormats", [])))
            lines.append(tag + base + " | " + info)
        except Exception as e:  # noqa: BLE001
            lines.append(tag + base + " | ERR " + repr(e)[:90])
    out = "\n".join(lines)
    print(out)
    open(os.path.join(DATA, "mirror_scan.txt"), "w", encoding="utf-8").write(out + "\n")


if __name__ == "__main__":
    main()
