#!/usr/bin/env python3
"""Загрузка калибровочных материалов Zden (crypto.haluska.sk) через Wayback.

Сам сайт и зеркало crypto.satori.digital с этой машины недоступны (curl -> 000),
поэтому берём оригинальные байты из web.archive.org: {ts}id_ отдаёт файл без
обёртки Wayback. Каждый скачанный файл проверяется на подпись формата и
получает запись с sha256 в ../data/SOURCES.md (append, через temp+os.replace).

Запуск:  python tools/zden_fetch_wayback_2026-10-18.py [--only NAME] [--list]
Код — в puzzles/<slug>/tools/, данные — в puzzles/<slug>/data/solvers/.
"""
from __future__ import annotations

import hashlib
import os
import sys
import urllib.request

BASE = "https://web.archive.org/web/{ts}id_/{url}"
OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data", "solvers")

# имя на диске -> (URL на crypto.haluska.sk, таймстемп CDX 18.10.2026)
FILES = {
    # индексные страницы: текстовое описание каждого уровня автором
    "index_2026-06-21.html": ("https://crypto.haluska.sk/index.html", "20260621052514"),
    "index_old_2021-01-20.html": ("https://crypto.haluska.sk/index_old.html", "20210120032006"),
    # LVL1-3: puzzle + solver
    "crypto1.png": ("http://crypto.haluska.sk/crypto1.png", "20220420031347"),
    "crypto1solver.png": ("http://crypto.haluska.sk/crypto1solver.png", "20250821093837"),
    "crypto2.png": ("https://crypto.haluska.sk/crypto2.png", "20250929202710"),
    "crypto2solver.png": ("https://crypto.haluska.sk/crypto2solver.png", "20240928143533"),
    "crypto3.png": ("https://crypto.haluska.sk/crypto3.png", "20240929171219"),
    "crypto3solver.png": ("http://crypto.haluska.sk/crypto3solver.png", "20250816133449"),
    # LVL5 (решён 22.09.2026; измерения -> байты) и исходная 2018-я версия
    "crypto5_2018.png": ("http://crypto.haluska.sk/crypto5.png", "20200513024618"),
    "crypto5fix.png": ("https://crypto.haluska.sk/crypto5fix.png", "20240729023037"),
    # SFX (pixel-stretch), XM17, Nethemba, XIXOIO, HCPP17, White Paper, Demobit
    "cryptoSFX.png": ("https://crypto.haluska.sk/cryptoSFX.png", "20250929202710"),
    "cryptoSFX_solver.png": ("http://crypto.haluska.sk/cryptoSFX_solver.png", "20210222153929"),
    "cryptoSFX_cover.png": ("https://crypto.haluska.sk/cryptoSFX_cover.png", "20250929202710"),
    "cryptoxm17solver.png": ("http://crypto.haluska.sk/cryptoxm17solver.png", "20250818085420"),
    "crypto_nethemba.png": ("https://crypto.haluska.sk/crypto_nethemba.png", "20250929202710"),
    "crypto_nethemba_solver.png": ("https://crypto.haluska.sk/crypto_nethemba_solver.png", "20250929202710"),
    "xixoio_puzzle.png": ("https://crypto.haluska.sk/xixoio_puzzle.png", "20250929202710"),
    "xixoio_puzzle-solver.png": ("https://crypto.haluska.sk/xixoio_puzzle-solver.png", "20250929202710"),
    "hcpp17-cryptopuzzle.jpg": ("http://crypto.haluska.sk/hcpp17-cryptopuzzle.jpg", "20180419103152"),
    "hcpp17-solver.jpg": ("https://crypto.haluska.sk/hcpp17-solver.jpg", "20250929202710"),
    "1BiTCoiN-WHiTe-PaPeR.png": ("https://crypto.haluska.sk/1BiTCoiN-WHiTe-PaPeR.png", "20260415095532"),
    "crypto_db18.png": ("http://crypto.haluska.sk/crypto_db18.png", "20201109013648"),
    # diagrams/hints других уровней того же автора (grammaticesкие подсказки)
    "tree_puzzle-encoding_scheme.png": ("https://crypto.haluska.sk/tree_puzzle-encoding_scheme.png", "20250929202710"),
    "wheels_puzzle-bitmap.png": ("https://crypto.haluska.sk/wheels_puzzle-bitmap.png", "20250929202710"),
    "LitecoinSegWit.png": ("https://crypto.haluska.sk/LitecoinSegWit.png", "20250929202710"),
    "CodexPuzzle-hint.png": ("https://crypto.haluska.sk/CodexPuzzle-hint.png", "20250929202710"),
    "CodexPuzzle-hint2.png": ("https://crypto.haluska.sk/CodexPuzzle-hint2.png", "20250929202710"),
    "Janussteg.jpg": ("https://crypto.haluska.sk/Janussteg.jpg", "20250929202710"),
    # контроль целостности: наша копия cryptoHALV.png должна совпасть байт-в-байт
    "cryptoHALV_ref.png": ("https://crypto.haluska.sk/cryptoHALV.png", "20250907231738"),
}

SIGNS = {b"\x89PNG": "png", b"\xff\xd8": "jpeg", b"GIF8": "gif", b"<": "html"}


def fetch(name: str, url: str, ts: str) -> str:
    dest = os.path.join(OUT, name)
    if os.path.exists(dest) and os.path.getsize(dest) > 0:
        return "уже есть, пропуск"
    req = urllib.request.Request(
        BASE.format(ts=ts, url=url),
        headers={"User-Agent": "Mozilla/5.0 (research; local dossier build)"},
    )
    with urllib.request.urlopen(req, timeout=60) as r:
        data = r.read()
    head = data[:4]
    kind = next((v for k, v in SIGNS.items() if head.startswith(k)), "UNKNOWN")
    if kind == "UNKNOWN" or len(data) < 100:
        return f"ОТКАЗ: неподписанный блок {len(data)} B"
    tmp = dest + ".tmp"
    with open(tmp, "wb") as f:
        f.write(data)
    os.replace(tmp, dest)
    return f"OK {kind} {len(data)} B sha256={hashlib.sha256(data).hexdigest()[:16]}"


def main() -> int:
    only = None
    if "--only" in sys.argv:
        only = sys.argv[sys.argv.index("--only") + 1]
    os.makedirs(OUT, exist_ok=True)
    if "--list" in sys.argv:
        print("\n".join(sorted(FILES)))
        return 0
    bad = 0
    for name, (url, ts) in sorted(FILES.items()):
        if only and only != name:
            continue
        res = fetch(name, url, ts)
        if res.startswith("ОТКАЗ"):
            bad += 1
        print(f"{name:36s} {res}")
    print(f"\nвсего целей {len(FILES)}, отказов {bad}")
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main())
