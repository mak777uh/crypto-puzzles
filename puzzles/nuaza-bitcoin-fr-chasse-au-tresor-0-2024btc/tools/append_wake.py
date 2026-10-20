# -*- coding: utf-8 -*-
"""Атомарная дозапись_handoff_ в master/WAKE_QUEUE.md (не перезаписывает чужие строки)."""
import os
import tempfile
from pathlib import Path

WAKE = Path(__file__).resolve().parents[3] / "WAKE_QUEUE.md"
MARKER = "Nuaza / SLM, 2026-10-19 13:31Z"

BLOCK = """
- **Nuaza / SLM, 2026-10-19 13:31Z (Qoder).** Отчёт:
  `reports/2026-10-19_1330_Qoder_nuaza-toolchain-certified-slm-h5-closing.md`.
  **Nuaza (0,2024 BTC, жив: 20 240 000 сат, 0 потрачено):** оракул `tools/nz_oracle.py`
  сертифицирован (`--selftest` → 4 ноги OK: вектор BIP39/TREZOR, вектор BIP84, эквивалентность
  чексуммы bip_utils на 400 случайных фразах, known-answer Hunt #1). Расшифрован и описан механизм
  indice 9 (8 слов-верификаторов покрывают все 8 значений 3 неизвестных бит энтропии) — это
  бесплатный тест «23 слова верны» перед выводом адреса. Готов `tools/nz_epub_extract.py`
  (ePub/zip/html/pdf: текст по spine + все иллюстрации + контактный лист + автоматический поиск
  BIP39-fr слов с частотами; частотный фильтр легитимен по indice 10). **Блокирующее — файл книги**:
  официальный ePub €8,99 = трата, нужен письменный ОК Ильи; бесплатная легальная ветка (образец
  OverDrive media/11171221, превью Google Books, обложка/оглавление у продавцов, публичные находки
  сообщества) собирается отдельно, пиратские зеркала и обход DRM не используются. Гипотезы-кандидаты
  из бесплатного текста (не проверены, чексумма глобальна): `pierre`→rice, `énergie`→father,
  `monnaie`→own, `image`→lazy, `central`→coach, `thème`→tunnel.
  **SLM Hunt #2 (3 177 700 сат):** ось «одно слово BIP39 = пароль» закрывается — `h7j3h` негативно
  на 400..2047 (1 648 проб, 0 HIT, 0 ERR, контроль HIT перед каждым чанком), добирается голова
  0..399 (прогон H5b, ~6 минут, предрегистрирован в LOG.md). Открытая ось — монтаж H7: структура
  подтверждена (120 слотов, период 9, 14 разделителей, `discoverglimmer`), но признак бита неизвестен;
  отдельный агент ищет определение 0/1 в первоисточнике метода (Reddit u/rational-Gain5010, pejgs65).
  **Нужны решения Ильи:** (1) покупка ePub Nuaza; (2) отправка финального письма
  codebreaker@smithlylemoore.com и стоит ли копать ось монтажа дальше. Ничего не покупалось,
  письма не отправлялись, транзакций не было, ключей нет. Брони `Qoder` продлены до 15:23Z.
"""


def main():
    data = WAKE.read_bytes()
    if MARKER.encode("utf-8") in data:
        print("уже записано, пропуск")
        return
    if not data.endswith(b"\n"):
        data += b"\n"
    data += BLOCK.encode("utf-8")
    fd, tmp = tempfile.mkstemp(dir=str(WAKE.parent), prefix=".wake_", suffix=".md")
    try:
        with os.fdopen(fd, "wb") as fh:
            fh.write(data)
            fh.flush()
            os.fsync(fh.fileno())
        os.replace(tmp, WAKE)
    finally:
        if os.path.exists(tmp):
            os.remove(tmp)
    print("WAKE_QUEUE.md:", len(data), "байт")


if __name__ == "__main__":
    main()
