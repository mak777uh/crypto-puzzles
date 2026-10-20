# -*- coding: utf-8 -*-
"""Атомарная дозапись в общий WAKE_QUEUE.md: итог вечернего блока 2026-10-19 13:58 UTC."""
import os
import tempfile
from pathlib import Path

Q = Path(__file__).resolve().parents[1] / "WAKE_QUEUE.md"
MARKER = "## 2026-10-19, 13:58 UTC — Qoder — вечерний блок закрыт"

BLOCK = """
## 2026-10-19, 13:58 UTC — Qoder — вечерний блок закрыт: оси исчерпаны, ждём три решения
- Полный текст для Ильи: `reports/2026-10-19_1356_Qoder_evening-closed-axes-three-decisions.md`.
- **Nuaza**: бесплатная ветка сбора источников завершена (обложка, 13 иллюстраций ePub-сэмпла
  OverDrive, полное оглавление, Wikidata) — блокер НЕ снят: 5 из 8 нужных картинок и текст глав
  закрыты per-file токеном. Оракул и фильтры сертифицированы. Дешёвых ходов больше нет; цель =
  мониторинг + решение о покупке (могу только по письменному ОК, рекомендация — не покупать:
  ~2 % при 2,3·10^9 наших и ~10^16 чужих негативах).
- **SLM Hunt #2**: закрыты ось «сообщество» (публичного критерия бита не существует) и всё семейство
  «метка в кадре» (supervised-подгонка 4096 пикселей/блоков/каналов против известного
  `discoverglimmer`: лучшее разделение = 49-54 ошибки из 120 бит, то есть монетка; всплеск |r|
  объяснён периодичностью ASCII, для неё построен структурированный null). Открытые линии:
  собственная гипотеза о носителе (событие/длительность/другой файл/другая модель слотов) и
  финальное письмо — только с твоего ящика и только по письменному ОК.
- **Тираж малоохваченных папок** (детали в `puzzles/dead-ends-registry/LOG.md`): `bitimage` приз снят;
  `1btc-brainwallet-defcon-2014` — вероятный дубль решённого «The One Bitcoin Heist»;
  `the-great-riddle` — физический оригинал + 25-е слово от автора; `seed-phrase-com` — утраченный
  onetimesecret; `ah-white-walking-banks` — домен мёртв, 20 из 24 слов не опубликованы.
- **Исправлена собственная ошибка**: в LOG SLM две строки «он-чейн» содержали адрес и суммы чужой
  цели (9vw04). Верно: `bc1q0akdjvrc2csau2n3gyxa3xcq0fss852x997m9y` funded 3 177 700, spent 0, 1 tx.
  Исправление на месте + отдельная запись с объяснением.
- Он-чейн (13:55 UTC, blockstream, read-only): Nuaza 20 240 000 / 0; 9vw04 2 020 760; seed-phrase
  1 000 000 / 0; Walking Banks 700 000 + 100 000 / 0; Great Riddle 423 871 / 0; SLM 3 177 700 / 0.
- Следующий вход агента (что делать, если ответа от Ильи не будет): не плодить закрытые оси;
  взять 9vw04 (оракул мгновенный, приз 2 020 760) по предрегистрированному шагу «связать D80 и
  координаты 80 цветных пар с маской 9vw04» либо перевести каталог в режим суточного мониторинга.
  Брони `Qoder`: Nuaza и SLM — продлены до 15:13Z, дальше продлевать только при реальной работе.
"""


def main():
    data = Q.read_bytes()
    if MARKER.encode("utf-8") in data:
        print("уже записано, пропуск")
        return 0
    if not data.endswith(b"\n"):
        data += b"\n"
    data += BLOCK.encode("utf-8")
    fd, tmp = tempfile.mkstemp(dir=str(Q.parent), prefix=".wk_", suffix=".md")
    try:
        with os.fdopen(fd, "wb") as fh:
            fh.write(data)
            fh.flush()
            os.fsync(fh.fileno())
        os.replace(tmp, Q)
    finally:
        if os.path.exists(tmp):
            os.remove(tmp)
    print("WAKE_QUEUE.md:", len(data), "байт")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
