# -*- coding: utf-8 -*-
"""Атомарная дозапись в LOG.md папки Keir Finlow-Bates: свежий он-чейн + опубликованные ответы из OCP."""
import os
import tempfile
from pathlib import Path

D = Path(__file__).resolve().parents[1]
LOG = D / "LOG.md"
MARKER = "он-чейн 12 лотов + 4 опубликованных ответа из OCP"

BLOCK = """
## 2026-10-19, 14:01 UTC — Qoder Desktop — он-чейн 12 лотов + 4 опубликованных ответа из OCP
- Делал: сплошной скан локального клона `open-crypto-puzzles` (`_sources/ocp/`, `git pull` перед сканом)
  скриптом `../../tools/ocp_live_with_answer.py` — искал открытые пазлы, у которых ЕСТЬ живой баланс
  и публично опубликованный ответ/ключ (законная «быстрая» форма — гонка, а не инсайт). Затем сверил
  все 12 адресов лотов этого пазла напрямую через blockstream.info (read-only). Прогонов/переборов
  не запускалось, покупок и транзакций нет. Бронь: `claims.py acquire keir-finlow-bates-blockchain-book-600ksats --agent Qoder`.
- **Он-чейн на 2026-10-19 14:01 UTC (свежее последней проверки куратора 2026-09-01):** живых лотов ровно
  три, по 200 000 сат каждый, `spent 0`, `1 tx` — то есть никто не опередил:
  * `17Y9czcbcCz433QXsy1SGQjwLb27BBtLLZ` — EN_medium, остаток 200 000;
  * `1DZ5NbUwDgxeJkKhQLgYcUUX36PtYso1pm` — EN_veryhard, остаток 200 000;
  * `19kkawFcg2U2s6vq368MXD7FJU9JZvRrjA` — IT_veryhard, остаток 200 000.
  Остальные девять опустошены (0). Суммарный живой приз — **600 000 сат**.
- **Публикация ключей по РЕШЁННЫМ лотам** (из `2-mid-prizes/keir-finlow-bates-blockchain-book-600ksats/puzzle.json`,
  поле `solutions`; `key_material_disclosed: true`, выплаты шли на `bc1qax0hsnwnxl7393awtc3hsy0ftm6tg4tyk2nfja`):
  * EN_hard_1 (17.06.2026): `carpet baby bicycle betray shift approve barrel phrase measure prevent image brain`
    — то есть ответом может быть **сама BIP39-фраза**, прогнанная через sha256x3;
  * EN_hard_2 (25.06.2026): «XOR of the 7 SHA-256 values printed in Figure 10»;
  * IT_medium (01.07.2026): `orologio snervato mugnaio enzima scienza glutine spargere valletta diametro pianta totano civetta`;
  * IT_hard (03.07.2026): `Genova Firenze Bologna Brindisi`.
  Плюс известные из README куратора: EN_easy_1 = `221B Baker Street`, EN_easy_2 = `9781688289970`
  (ISBN бумажного издания — строки, которой **нет** в электронной версии).
  Это калибровочный набор из 6 «лот → точный ответ», и он ценен сам по себе: на нём сертифицируется
  оракул `tools/oracle.py` (sha256x3 → uncompressed P2PKH), что делает любой будущий негатив настоящим.
- **Что уже закрыто куратором (важно, чтобы не повторять):** ~9 600 строк-ответов, 694 000 форм номеров
  страниц, 800 800 форм ISBN-надстроек и **34,4·10^9** PoW-нонцев (фигура 11, 45 млн хеш/с, 24 ядра,
  8 мин 56 с) — 0 совпадений по трём открытым лотам; закрыты акростихи, «planted flaws», пары знаков,
  discography, Erdos-цепочка, Merkle-корни из строк фигур, печати 4 изданий, front/back matter.
- **Единственный незакрытый лид куратора** — физическая книга: KDP-папербек (ISBN 9781688289970),
  Lulu-хардкорвер (9781716479724) и итальянский папербек, ~$60 за три. Обоснование: ответ EN_easy_2
  (ISBN) существует только на печатном объекте, а внутренности страниц 9-320 бумажных изданий
  цифровыми средствами не получены. Второй лид — разгадать IT_easy по **раскрытому на-чейн
  публичному ключу** как бесплатный калибровочный оракул (лот уже снят, но ответ покажет стиль
  итальянских ответов и бьёт прямо в IT_veryhard).
- **Вывод по приоритету «быстрые деньги»**: это самый дешёвый из всех известных блокеров в каталоге —
  ~$60 и ручное чтение трёх книг против 600 000 сат живого приза, с готовым сертифицированным оракулом.
  Для сравнения: Nuaza — €8,99 при ~2 % шансов и 10^16 чужих негативов. Решение о покупке — за Ильёй;
  без физического объекта (или без доступа к нему) работа упирается в тот же тупик, что и у куратора.
"""


def main():
    data = LOG.read_bytes()
    if MARKER.encode("utf-8") in data:
        print("уже записано, пропуск")
        return 0
    if not data.endswith(b"\n"):
        data += b"\n"
    data += BLOCK.encode("utf-8")
    fd, tmp = tempfile.mkstemp(dir=str(LOG.parent), prefix=".keirlog_", suffix=".md")
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
