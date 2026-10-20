#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Закрытие «1btc-brainwallet-defcon-2014» как дубля решённого One Bitcoin Book (2014).

Основание: аннотация DEF CON 33 (доклад Joseph "stoppingcart" Gabay «The One Bitcoin
Heist: Making a custom Hashcat module to solve a decade-old puzzle challenge»,
08.08.2025), сохранённая локально в data/02_the-one-bitcoin-heist-…html:
«In 2014, someone by the name of Spencer Lucas released the "One Bitcoin Book", a set of
20 clues that when solved, unlocked a bitcoin wallet containing one bitcoin… In December
2024, the prize was finally claimed…».

Действия идемпотентны, все общие файлы правятся атомарно (чтение → temp → os.replace).
Транзакций, покупок, публикаций нет. Папка переносится из puzzles/ в solved/ по разделу 5
AGENT_INSTRUCTIONS.md; оба индекса обновляются в том же проходе.
"""
import datetime
import os
import pathlib
import shutil
import sys
import tempfile

MASTER = pathlib.Path(r"C:\Users\Admin\OneDrive\Desktop\master")
SLUG = "1btc-brainwallet-defcon-2014"
SRC = MASTER / "puzzles" / SLUG
DST = MASTER / "solved" / SLUG
UTC = datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%d %H:%M UTC")

LOG_ENTRY = """

## {ts} — Qoder Desktop (Windows) — ЗАКРЫТИЕ: это дубль уже решённого пазла, живой цели нет
- Что искалось: первоисточник «20 подсказок из книги → brainwallet, 1 BTC» и адрес приза. Адреса в
  досье никогда не было («Адрес в каталоге не зафиксирован — требуется уточнить (B43)»), поэтому
  он-чейн проверка невозможна в принципе: папка не может быть денежной целью.
- Первичный источник найден и лежит в папке: `data/02_the-one-bitcoin-heist-making-a-custom-hashcat-modu.html`
  (аннотация DEF CON 33, 08.08.2025, докладчик Joseph "stoppingcart" Gabay). Дословно: «In 2014,
  someone by the name of Spencer Lucas released the "One Bitcoin Book", a set of 20 clues that when
  solved, unlocked a bitcoin wallet containing one bitcoin (then valued at ~$400). Over 10 years and
  a six-figure price tag later, it remained unclaimed. **In December 2024, the prize was finally
  claimed** through a combination of human-solved solutions and a custom module for Hashcat…».
- Совпадение полное и по году, и по количеству подсказок, и по механизму (brainwallet = SHA-256 от
  фразы), и по номиналу (1 BTC). Прежняя формулировка каталога «DEFCON 2014» — неточность: пазл
  опубликован автором как «The One Bitcoin Book», а доклад о его взломе — DEF CON 33 (2025), не 2014.
- Итоговый вердикт: **дубль решённого пазла, приз claimнут в декабре 2024**, незакрытых осей нет.
  Папка перенесена из `puzzles/` в `solved/` (раздел 5 `AGENT_INSTRUCTIONS.md`), строки обновлены в
  `solved/INDEX.md` (таблица «Решённые — приз снят»: 29 → 30, всего папок 55 → 56) и удалена из
  `puzzles/README.md`. Возврат в работу — только при новых данных (например, если куратор каталога
  даст ссылку на ДРУГОЙ пазл с 20 книжными подсказками).
- Не делали: GitHub-интейк (шлюз требуется для предложений/прогонов, здесь прогона нет — цель
  закрыта документально), прогонов, трат, транзакций, публикаций, обращений к автору и солверу.
- Ссылки: https://infocondb.org/con/def-con/def-con-33/the-one-bitcoin-heist-making-a-custom-hashcat-module-to-solve-a-decade-old-puzzle-challenge ;
  https://www.youtube.com/watch?v=74_4Q329PH8
""".format(ts=UTC)

README_NOTE = """

## Вердикт {ts} (Qoder) — ЗАКРЫТО: дубль решённого «The One Bitcoin Book» (Spencer Lucas, 2014)
- Статус: **closed / duplicate** (перенесено в `../../solved/{slug}/`).
- Приз 1 BTC **claimнут в декабре 2024** — первичный источник: аннотация DEF CON 33 (доклад
  Joseph «stoppingcart» Gabay, «The One Bitcoin Heist: Making a custom Hashcat module to solve a
  decade-old puzzle challenge»), копия в `data/02_the-one-bitcoin-heist-….html`.
- Адрес приза в этом досье никогда не был зафиксирован, поэтому папка не может служить денежной
  целью и он-чейн-подтверждение по ней невозможно. Хроника закрытия — в `LOG.md`.
""".format(ts=UTC, slug=SLUG)

INDEX_ROW = ("| [{slug}]({slug}/README.md) | дубль решённого: «The One Bitcoin Book» (Spencer Lucas, 2014), "
             "1 BTC claimнут 12.2024 (DEF CON 33, J. Gabay) — адрес в досье не был указан |\n").format(slug=SLUG)


def atomic_write(path: pathlib.Path, data: str) -> None:
    fd, tmp = tempfile.mkstemp(dir=str(path.parent), suffix=".tmp")
    with os.fdopen(fd, "w", encoding="utf-8", newline="") as fh:
        fh.write(data)
        fh.flush()
        os.fsync(fh.fileno())
    os.replace(tmp, path)


def main() -> int:
    done = []
    # 1. LOG пазла (до переноса — путь puzzles/)
    log = SRC / "LOG.md"
    if "ЗАКРЫТИЕ: это дубль" not in log.read_text(encoding="utf-8", errors="replace"):
        atomic_write(log, log.read_text(encoding="utf-8") + LOG_ENTRY)
        done.append("LOG += запись закрытия")

    # 2. README пазла
    rd = SRC / "README.md"
    if "Вердикт " not in rd.read_text(encoding="utf-8", errors="replace"):
        atomic_write(rd, rd.read_text(encoding="utf-8") + README_NOTE)
        done.append("README += вердикт")

    # 3. puzzles/README.md — убрать строку
    pr = MASTER / "puzzles" / "README.md"
    t = pr.read_text(encoding="utf-8", errors="replace")
    lines = [ln for ln in t.splitlines(keepends=True) if f"]({SLUG}/README.md)" not in ln]
    if len(lines) != len(t.splitlines(keepends=True)):
        atomic_write(pr, "".join(lines))
        done.append("puzzles/README.md: строка убрана")

    # 4. перенос папки
    if SRC.exists() and not DST.exists():
        shutil.move(str(SRC), str(DST))
        done.append("папка перенесена в solved/")
    elif DST.exists():
        done.append("папка уже в solved/")

    # 5. solved/INDEX.md — строка + счётчики
    si = MASTER / "solved" / "INDEX.md"
    t = si.read_text(encoding="utf-8", errors="replace")
    if f"]({SLUG}/README.md)" not in t:
        marker = "|---|---|\n"
        i = t.find(marker)
        assert i > 0, "не найден заголовок таблицы в solved/INDEX.md"
        j = i + len(marker)
        t = t[:j] + INDEX_ROW + t[j:]
        done.append("solved/INDEX.md: строка добавлена в «Решённые — приз снят»")
    before = t
    t = t.replace("## Решённые — приз снят (29)", "## Решённые — приз снят (30)")
    t = t.replace("Папок в `solved/` = 55,", "Папок в `solved/` = 56,")
    t = t.replace("строк индекса = 29 + 12 + 14.", "строк индекса = 30 + 12 + 14.")
    if t != before:
        atomic_write(si, t)
        done.append("solved/INDEX.md: счётчики 29→30, 55→56")

    # 6. dead-ends-registry — подтвердить прежнюю гипотезу
    dl = MASTER / "puzzles" / "dead-ends-registry" / "LOG.md"
    if dl.exists():
        t = dl.read_text(encoding="utf-8", errors="replace")
        if "{slug}: подтверждено".format(slug=SLUG) not in t:
            add = ("\n- {ts} — Qoder: {slug}: подтверждено — не «вероятный дубль», а **дубль решённого** "
                   "«The One Bitcoin Book» (Spencer Lucas, 2014); приз 1 BTC claimнут в декабре 2024 "
                   "(аннотация DEF CON 33, J. Gabay). Папка перенесена в `solved/`.\n").format(ts=UTC, slug=SLUG)
            atomic_write(dl, t + add)
            done.append("dead-ends-registry: запись подтверждена")

    print("\n".join(done) or "ничего не менялось (идемпотентность)")
    print("проверка:", "puzzles/:", SRC.exists(), "| solved/:", DST.exists(),
          "| индекс:", (MASTER / "solved" / "INDEX.md").read_text(encoding="utf-8").count(SLUG),
          "| puzzles/README:", (MASTER / "puzzles" / "README.md").read_text(encoding="utf-8").count(SLUG))
    return 0


if __name__ == "__main__":
    sys.exit(main())
