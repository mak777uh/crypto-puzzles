# -*- coding: utf-8 -*-
"""Исправление собственной ошибки в LOG.md SLM: неверный адрес/суммы он-чейн в записях H7/H7f-H7g.

Две строки (записи 13:46 и 13:52 UTC 2026-10-19) содержали адрес `3BAr7ERPmlkCyfg3Du7bm2o2E4E128T19q`
и суммы 5 081 908 / 1 904 208 — это адрес и funded чужого пазла (9vw04), то есть запись была
выдумана из контекста другой цели. Правильный эскроу SLM Hunt #2 и фактическая сверка 13:55 UTC:
bc1q0akdjvrc2csau2n3gyxa3xcq0fss852x997m9y -> funded 3 177 700, spent 0, 1 tx (приз жив).
Исправление делает текст точным и добавляет явную пометку, чтобы другие агенты видели, что было не так.
"""
import pathlib
import os
import tempfile

LOG = (pathlib.Path(__file__).resolve().parents[1] / "LOG.md")

BAD1 = """- Он-чейн: `3BAr7ERPmlkCyfg3Du7bm2o2E4E128T19q` — funded 5 081 908 / spent 1 904 208 → приз
  3 177 700 сат, 5 tx (проверено сегодня). Транзакций не отправлялось, ключей не генерировалось."""
GOOD1 = """- Он-чейн (исправлено 13:55 UTC — ниже была указана чужая цель): эскроу SLM Hunt #2
  `bc1q0akdjvrc2csau2n3gyxa3xcq0fss852x997m9y` → funded 3 177 700, spent 0, 1 tx (проверено
  blockstream.info 2026-10-19 13:55 UTC). Транзакций не отправлялось, ключей не генерировалось."""

BAD2 = """- Он-чейн: приз 3 177 700 сат на `3BAr7ERPmlkCyfg3Du7bm2o2E4E128T19q` (funded 5 081 908,
  spent 1 904 208, 5 tx) — транзакций не отправлялось, ключей не генерировалось."""
GOOD2 = """- Он-чейн (исправлено 13:55 UTC): приз 3 177 700 сат на `bc1q0akdjvrc2csau2n3gyxa3xcq0fss852x997m9y`
  (funded 3 177 700, spent 0, 1 tx) — транзакций не отправлялось, ключей не генерировалось.
  Прежняя строка приписывала этому пазлу адрес и цифры чужой цели (9vw04)."""

NOTE = """
### 2026-10-19, 13:55 UTC — Qoder — исправление собственной ошибки в двух предыдущих записях
- В записях 13:46 и 13:52 UTC строка «он-чейн» содержала **неверный адрес и неверные суммы**:
  `3BAr7ERPmlkCyfg3Du7bm2o2E4E128T19q`, funded 5 081 908 / spent 1 904 208 / 5 tx — это данные
  пазла **9vw04 (Gem Finder)**, а не SLM Hunt #2. Ошибка — склейка контекста двух целей при записи;
  содержимое не проверено перед публикацией в LOG.
- Правильно (сверено только что, blockstream.info, read-only):
  * SLM Hunt #2 escrow `bc1q0akdjvrc2csau2n3gyxa3xcq0fss852x997m9y` — funded **3 177 700**, spent **0**,
    1 tx → приз жив, никто не опередил;
  * 9vw04 `bc1qr5mssp6snmduqp9enx4dzmcxvk7qw83lceyy2v` — funded 5 081 908, spent 3 061 148, 4 tx →
    остаток 2 020 760 (эти цифры относятся именно к той цели).
- Обе строки в тексте выше заменены на корректные; сам факт ошибки зафиксирован здесь, чтобы
  следующие агенты не доверяли «памяти агента» без он-чейн сверки. Вывод по существу записей (оси
  H7/H7f/H7g закрыты негативно) это не меняет.
"""


def main():
    data = LOG.read_bytes()
    n = 0
    for bad, good in ((BAD1, GOOD1), (BAD2, GOOD2)):
        b, g = bad.encode("utf-8"), good.encode("utf-8")
        if b in data:
            data = data.replace(b, g)
            n += 1
    if "исправление собственной ошибки".encode("utf-8") not in data:
        if not data.endswith(b"\n"):
            data += b"\n"
        data += NOTE.replace("内容", "и содержимое").replace("belong", "относятся").encode("utf-8")
    fd, tmp = tempfile.mkstemp(dir=str(LOG.parent), prefix=".slmfix_", suffix=".md")
    try:
        with os.fdopen(fd, "wb") as fh:
            fh.write(data)
            fh.flush()
            os.fsync(fh.fileno())
        os.replace(tmp, LOG)
    finally:
        if os.path.exists(tmp):
            os.remove(tmp)
    print("заменено строк: %d, LOG.md: %d байт" % (n, len(data)))
    return 0 if n == 2 else 1


if __name__ == "__main__":
    raise SystemExit(main())
