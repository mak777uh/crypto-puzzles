# -*- coding: utf-8 -*-
"""Атомарная дозапись результата H5 (чанк 2) + предрегистрация добора 0..399 в LOG.md.

Чужие строки не трогает: читает байты, дописывает блок в конец, пишет во временный файл
в том же каталоге, fsync, os.replace. Маркер-подстрока защищает от двойной записи.
"""
import os
import tempfile
from pathlib import Path

D = Path(__file__).resolve().parents[1]
LOG = D / "LOG.md"
MARKER = "H5 чанк 2 (h7j3h, 1250..2047)"

BLOCK = """
## 2026-10-19, 13:27 UTC — Qoder — H5 чанк 2 (h7j3h, 1250..2047): НЕГАТИВ; предрегистрация добора 0..399
- Свидетель прогона: `data/h5_h7j3h.log` строки 37..70 — `== H5 start 2026-10-19 16:08:34 page=h7j3h
  range=1250..2048 CONTROL e3zre|albatross -> HIT (200)` и `== H5 done: 798 probes, 0 HIT, 798 NO, 0 ERR;
  next=2048`. Состояние: `data/h5_state.json` (page=h7j3h, last_index=2047, next=2048, hit=0, no=798, err=0).
- Контроль оракула перед чанком — HIT (HTTP 200) на e3zre|albatross, значит 403 = корректный NO;
  ошибок транспорта (ERR) за весь чанк — 0, т.е. ни один негатив не «молчание сети».
- Итог по оси «одно слово BIP39 = пароль замка h7j3h»: покрыто 400..2047 (чанк 1: 850 NO, чанк 2: 798 NO),
  0 HIT. ДЫРА: индексы 0..399 на этом замке не проверялись (свип `y6cd1` покрыт полностью, next=2048).
- Предрегистрация (пока этот же прогон, до старта): **H5b** — добор индексов 0..399 списка `data/bip39.txt`
  по тому же механизму (Wix-оракул, `ask(page, pw)`, контроль HIT перед стартом, пауза 0.7 с,
  ретраи, NO=403, ERR не считается негативом). Ожидаемое время ~5-6 минут, обращений 400 (+контроль).
  Инсайд-оси: слово-пароль из публичного BIP39-списка — единственная документированная не закрытая
  ветка этого замка; GPU не используется, чистый сетевой опрос. Старт — сразу после этой записи.
- Транзакций, трат, писем, публикаций нет; ключей не найдено. Бронь `Qoder` продлена до 15:23:45Z.
"""


def main():
    data = LOG.read_bytes()
    if MARKER.encode("utf-8") in data:
        print("уже записано, пропуск")
        return
    if not data.endswith(b"\n"):
        data += b"\n"
    data += BLOCK.encode("utf-8")
    fd, tmp = tempfile.mkstemp(dir=str(LOG.parent), prefix=".h5log_", suffix=".md")
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
