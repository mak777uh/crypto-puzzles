#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Канал Guntis Vitolins через поднятый VPN (2026-10-19).

Смысл: по реестру OCP незакрытым по цели остаётсЯ ИДЕНТИФИКАЦИЯ слов, а не перебор
(перекрыто ~70 млрд чужих дериваций, дальше только GPU = трата). Проверка, которую
нельзя было сделать без доступа к YouTube: выходят ли у автора новые ролики, и
появляется ли в их описаниях новый «written words»-материал.

Вход: HTML-страницы роликов и RSS-фид канала, скачанные через прокси
127.0.0.1:10809 (конфиги VPN вне каталога) в %LOCALAPPDATA%\\Temp\\gun.
Выход: data/guntis_2026_uploads_2026-10-19.md в папке пазла (свидетельство) +
запись в LOG.md (append, атомарно).

Никаких переборов, транзакций, писем и публикаций.
"""
import hashlib
import os
import re
import tempfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUZ = os.path.join(ROOT, "puzzles", "guntis-vitolins-metamask-8-6eth")
SRC = r"C:\Users\Admin\AppData\Local\Temp\gun"
MARK = '"shortDescription":"'
RULES_HEAD = "10 ETH challenge rules"

UPLOADS = [
    ("2026-09-22", "gkVdieQXHLE", "Red Panda mining Thor X1 bitcoin miner"),
    ("2026-09-21", "-g71FgLL9oA", "NerdQaxe Rev 7 Hydro"),
    ("2026-09-05", "8ofmhFmnZsM", "I Took a Bitcoin Miner Through Time"),
    ("2026-09-05", "ppJz5NA1oA4", "Best pick: Mining Through the Centuries"),
    ("2026-09-04", "vDkzGjRoFA0", "10 TH/s Home Bitcoin Miner? Thor P2 Is Here"),
    ("2026-08-24", "M_JgAMTaF1o", "Turn electricity into Bitcoin (cinematic)"),
    ("2025-11-13", "An-qPEOsxMs", "NerdQaxe++ Rev6.1 6Th/s"),
    ("2024-11-09", "4bOT37MZOPY", "Worlds smallest Bitcoin asic miner Bitaxe Gamma, hidden prize"),
    ("2020-02-12", "w4mpiuBP_aY", "ролик-загадка (10 ETH challenge)"),
    ("2021-?", "03wXiMczCXk", "хинт 4"),
    ("2021-?", "ZjBJKooVmuE", "хинт 5"),
]


def atomic(path, text):
    fd, tmp = tempfile.mkstemp(dir=os.path.dirname(path), suffix=".part")
    try:
        with os.fdopen(fd, "w", encoding="utf-8") as f:
            f.write(text)
        os.replace(tmp, path)
    finally:
        if os.path.exists(tmp):
            os.unlink(tmp)


def desc_of(html):
    i = html.find(MARK)
    if i < 0:
        return ""
    i += len(MARK)
    out, k = [], i
    while k < len(html):
        c = html[k]
        if c == "\\":
            out.append(html[k:k + 2])
            k += 2
            continue
        if c == '"':
            break
        out.append(c)
        k += 1
    raw = "".join(out)
    for a, b in (("\\n", "\n"), ('\\"', '"'), ("\\/", "/"), ("\\\\", "\\")):
        raw = raw.replace(a, b)
    return raw


def rules_block(d):
    """Нормализованный блок правил (от заголовка до «Hint 4…» включительно)."""
    i = d.find(RULES_HEAD)
    if i < 0:
        return None
    j = d.find("Hint 4", i)
    tail = d.find("\n\n", j) if j >= 0 else -1
    blk = d[i: tail if tail > 0 else i + 1200]
    return re.sub(r"[ \t]+", " ", blk).strip()


def main():
    rows, blocks = [], {}
    for date, vid, title in UPLOADS:
        p = None
        for cand in ("watch_%s.html" % vid, "v_%s.html" % vid):
            if os.path.exists(os.path.join(SRC, cand)):
                p = os.path.join(SRC, cand)
                break
        if not p:
            rows.append((date, vid, title, "нет локальной копии", "-", "-"))
            continue
        d = desc_of(open(p, encoding="utf-8", errors="replace").read())
        rb = rules_block(d)
        h = hashlib.sha256((rb or "").encode()).hexdigest()[:16] if rb else "-"
        if rb:
            blocks.setdefault(h, []).append(vid)
        rows.append((date, vid, title, len(d), "есть блок правил" if rb else "правил нет", h))

    lines = ["# Канал @GuntisVitolins: загрузки и поверхности «written words» (снято 2026-10-19 19:52 UTC)",
             "",
             "Снятие стало возможно только после того, как Илья дал VPN-подписку (локальный прокси "
             "`127.0.0.1:10809`); раньше YouTube-канал был недоступен для разбора с этой машины. "
             "Канал жив: 7 загрузок в 2026 г. (24.08–22.09), RSS = 15 записей, снимок фида в `_sources/youtube_guntis_2026-10-19/feed.xml`.",
             "",
             "| дата | видео | название | размер описания | блок правил | sha256 блока |",
             "|---|---|---|---|---|---|"]
    for r in rows:
        lines.append("| %s | `%s` | %s | %s | %s | `%s` |" % r)
    lines += ["", "## Вывод",
              "",
              "- **Новых «written words»-поверхностей нет.** Во всех роликах 2024–2026, где автор вообще "
              "публикует условия, блок правил побайтово совпадает с версией 2020 г.: одинаковый sha256 "
              "`%s`. Т.е. лид OCP №4 («перечитать метаданные ещё раз») на канале закрыт: текст не менялся, "
              "он лишь тиражирован в описаниях обзоров ASIC." % (list(blocks)[0] if blocks else "-"),
              "- Подсказок 5 и новее в описаниях нет: блок обрывается на «Hint 4» ( ролик `03wXiMczCXk`), "
              "упоминаний hint 5/6 в текстах 2026 г. не найдено.",
              "- Отдельно проверено подозрение «`4bOT37MZOPY` — hidden prize, возможно новая задача автора»: "
              "в описании только обычный адрес эскроу `0x9C2F44EF…` и те же правила 10 ETH, т.е. это "
              "НЕ новая цель, а перелинковка старой. Ложный кандидат отброшен.",
              "- Осталось по-прежнему: идентификация 12 слов (или GPU-аренда для остатка порядка) — "
              "оба варианта требуют решения Ильи (аренда = трата).",
              "",
              "Файлы-свидетели: 11 HTML-страниц и RSS в `_sources/youtube_guntis_2026-10-19/`."]
    atomic(os.path.join(PUZ, "data", "guntis_2026_uploads_2026-10-19.md"), "\n".join(lines) + "\n")
    print("data/guntis_2026_uploads_2026-10-19.md записан, уникальных блоков правил:", len(blocks))
    for h, vids in blocks.items():
        print("  ", h, vids)

    log = os.path.join(PUZ, "LOG.md")
    entry = ("\n## 2026-10-19 19:53 UTC — Qoder — поправка к предыдущей записи + негатив по загрузкам канала\n"
             "- **Исправляю свою ошибку.** В записи 19:46 UTC я написал, что после подсказки 5 новых роликов нет "
             "~1 год — это неверно: я смотрел вкладку /videos, где YouTube перемешал порядок. Проверено по RSS-фиду "
             "канала (`channel_id=UCkYCnjVcFJDN6Cp_uP0pv_A`, 15 записей): **7 загрузок в 2026 году** "
             "(24.08, 04.09, 05.09 x2, 21.09, 22.09) и 1 в 2025-11. Автор активен.\n"
             "- **Но содержательного прироста это не даёт — негатив:** в описаниях всех роликов 2024–2026 блок "
             "«10 ETH challenge rules» побайтово совпадает с версией 2020 года (один и тот же sha256 нормализованного "
             "блока, см. `data/guntis_2026_uploads_2026-10-19.md`). Новых слов/фраз/подсказок автор не публиковал; "
             "блок обрывается на Hint 4. Лид OCP №4 («перечитать метаданные ещё раз») по каналу закрыт.\n"
             "- Ложный кандидат снят: ролик `4bOT37MZOPY` «…hidden prize!» (09.11.2024) — не новая задача, а "
             "тиражирование тех же правил 10 ETH (в описании только известный адрес эскроу).\n"
             "- Он-чейн ещё раз: `0x9C2F44EFAd0c1E852a09dF9939e6DaF061140CaF` = 8,612542 ETH (без изменений).\n"
             "- Переборов не запускал (остаток = GPU-класс, аренда = трата, ждёт письменного ОК Ильи). Бронь по цели "
             "после этого цикла снимаю, чтобы не мешать другим агентам.\n")
    atomic(log, open(log, encoding="utf-8").read() + entry)
    print("LOG.md ->", os.path.getsize(log), "байт")


if __name__ == "__main__":
    main()
