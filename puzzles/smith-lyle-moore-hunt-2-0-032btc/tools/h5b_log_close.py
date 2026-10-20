# -*- coding: utf-8 -*-
"""Атомарная дозапись в LOG.md SLM: H5b закрыл полное покрытие h7j3h списком BIP39."""
import os
import tempfile
from pathlib import Path

D = Path(__file__).resolve().parents[1]
LOG = D / "LOG.md"
MARKER = "H5b: 400 обращений, 0 HIT, 400 NO, 0 ERR"

BLOCK = """
## 2026-10-19, 13:38 UTC — Qoder — H5b выполнен: ось «одно слово BIP39 = пароль h7j3h» ЗАКРЫТА полностью
- Прогон по предрегистрации (запись 13:27 UTC): `python tools/h5_bip39_h7j3h.py --start 0 --end 400
  --pause 0.7`. Свидетель: `data/h5_h7j3h.log` — `== H5 done: 400 probes, 0 HIT, 400 NO, 0 ERR; next=400`
  и `data/h5_state.json` (page=h7j3h, last_index=399, hit=0, no=400, err=0, ts=13:37:48Z).
  Контроль оракула перед стартом: `e3zre|albatross -> HIT (200)`, значит 403 корректно = «нет».
- Итог по оси: **2048 из 2048** слов стандартного BIP39-списка (`data/bip39.txt`) проверены на замке
  `h7j3h` — 0 HIT, 0 ERR (3 чанка: 0..399 = 400 NO, 400..1249 = 850 NO, 1250..2047 = 798 NO;
  сумма 2048, лог-строки 1..70 в `data/h5_h7j3h.log`). Замок `y6cd1` закрыт ранее тем же механизмом
  полностью (`data/h2h_state.json`: next=2048, hits=[]).
- Вывод: «пароль замка = одно слово из BIP39» для этих двух замков исчерпан. Это негатив с полным
  покрытием, а не «не доделали». Следующих дешёвых сетевых осей в этом замке не остаётся;
  незакрытые линии ханта — признак бита в монтаже (H7) и финальное письмо (нужен ОК Ильи).
- Режим: время прогона ~6 минут (в лимите ≤15 минут), GPU не использовался, обращений 2048+3
  контроля. Транзакций, трат, писем, публикаций нет; ключей нет. Бронь `Qoder` до 15:23:45Z.
"""


def main():
    data = LOG.read_bytes()
    if MARKER.encode("utf-8") in data:
        print("уже записано, пропуск")
        return
    if not data.endswith(b"\n"):
        data += b"\n"
    data += BLOCK.encode("utf-8")
    fd, tmp = tempfile.mkstemp(dir=str(LOG.parent), prefix=".h5blog_", suffix=".md")
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


if __name__ == "__main__":
    main()
