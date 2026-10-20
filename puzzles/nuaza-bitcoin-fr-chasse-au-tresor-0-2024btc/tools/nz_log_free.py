# -*- coding: utf-8 -*-
"""Атомарная дозапись в LOG.md Nuaza: итоги бесплатного сбора источников (data/free_sources/)."""
import os
import tempfile
from pathlib import Path

D = Path(__file__).resolve().parents[1]
LOG = D / "LOG.md"
MARKER = "бесплатный сбор источников: обложка, 13 иллюстраций сэмпла, sommaire"

BLOCK = """
## 2026-10-19, 13:45 UTC — Qoder — бесплатный сбор источников: обложка, 13 иллюстраций сэмпла, sommaire
- Каталог `data/free_sources/` (создан этого числа; подробнее — `data/free_sources/FREE_SOURCES.md`,
  там же таблица «URL → файл → байты → транспорт → статус»). Без покупок, без пиратских источников,
  без обхода DRM; логина/токена не требовалось ни для одного полученного файла.
- Что реально добыто бесплатно:
  * `energie-face-cachee.png` (1000x1200, konsensus.net) — обложка в высоком разрешении;
  * `od_sample/file0..file12` — **все 13 иллюстраций** бесплатного ePub-сэмпла OverDrive
    (открытые URL `odcom-…/media/fileN`, загрузка из браузерной сессии);
  * `sommaire.txt` — полное оглавление книги (30 глав в 4 частях) из `toc.ncx` того же ридера;
  * биография: `wikidata_noizat.json` (Q134479179, год рождения **1965** — это и есть «fausses
    infos» из indice 11), `interview_sia-partners_noizat.html`, `educat_aboutme.html` (года не называет).
- Проверка по `data/bip39_french.txt` (NFC, 2048 строк) — какие слова списка вообще встречаются
  в добытых материалах:
  * обложка (слова 13-14): только `énergie` 669 → father, `monnaie` 1264 → own, `pierre` 1481 → rice
    («face», «cachée», «noizat», «konsensus», «network» в списке **нет**); `pierre` логичнее отнести
    к позиции 17 («связано с именем автора»), значит пара 13-14 = **énergie + monnaie**;
  * оглавление (слова 18-19): из 30+ названий в списке ровно 7 — `économie` 617 → essay,
    `progrès` 1554 → seat, `amour` 96 → army, `bonheur` 260 → calm, `science` 1727 → subject
    (+ энергия/монета уже заняты). Пара 18-19 — две из этих пяти, что совпадает с чтением досье;
  * иллюстрации: `file6` (Énergie libre, p.14) → `libre` 1156 → miss; `file12` (таблица p.72) →
    `source` → thrive, `physique` → reward, `fossile` → helmet, `manuel` → noise, `travail` → upset;
    `file4` (треугольник Паскаля) → `mesure` → once; `file8` (2 outils = 4 états) → `outil` → quarter.
    Присутствие `physique` и `source` прямо в `file12` — независимое подтверждение чтения
    слов 20-21 из досье.
- Статус блокера НЕ изменился. 8 картинок пазла — это p.14, p.42, p.72, p.99, p.101, p.105, p.174,
  p.178; в бесплатном превью есть только первые три (p.14, p.42 = yin-yang без текста, p.72).
  Остальные пять (bilan BCE p.99, timbre p.101, baguette p.105, identité p.174, bonhomme p.178) и
  текст глав (нужен для начала гл. 4 и точного порядка слов 1-12) закрыты per-file токеном `cmpt`
  (403 без него) — обход DRM не предпринимаем. Тред X и посты jeuxvideo 76202287 за логином/JS.
- Напоминание о цене задачи (чтобы не выдавать заготовку за прогресс): досье фиксирует отрицательные
  проходы famA-D ≈ 2,3·10^9 комбинаций и ~10^16 у решателей с книгой на GPU, консенсус форума —
  ошибка/неоднозначность автора, аудит 15.10 даёт ~2 % и только с книгой. Новая ветка «прогнать
  10 пар (13-14) x (18-19) через оракул при фиксированных остальных слотах» **не имеет смысла**,
  пока позиции 1-12 не прочитаны: чексумма BIP39 — глобальный 8-битный признак над всей фразой,
  частично собранную фразу она не верифицирует (`nz_oracle`/`nz_partial` это честно показывают).
- Он-чейн: цель `bc1q8zfy…pgc02`, 20 240 000 сат, 1 tx, 0 потрачено — приз на месте. Транзакций,
  покупок, писем, публикаций не было; приватных ключей не генерировалось.
"""


def main():
    data = LOG.read_bytes()
    if MARKER.encode("utf-8") in data:
        print("уже записано, пропуск")
        return 0
    if not data.endswith(b"\n"):
        data += b"\n"
    data += BLOCK.encode("utf-8")
    fd, tmp = tempfile.mkstemp(dir=str(LOG.parent), prefix=".nzlog4_", suffix=".md")
    try:
        with os.fdopen(fd, "wb") as fh:
            fh.write(data)
            fh.flush()
            os.fsync(fh.fileno())
        os.replace(tmp, LOG)
    finally:
        if os.path.exists(tmp):
            os.remove(tmp)
    print("LOG.md:", len(data), "байт")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
