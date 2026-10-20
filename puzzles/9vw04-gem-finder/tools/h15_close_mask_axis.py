#!/usr/bin/env python3
"""9vw04: закрытие оси H15 («маска 9vw04 x D80/координаты») без прогона + сверка приза.

Протокол: сначала сверка он-чейн, затем атомарная запись в LOG.md.
Транзакций нет, ключей не найдено, ничего не публикуется.
"""
import json
import os
import pathlib
import ssl
import sys
import tempfile
import urllib.request

HERE = pathlib.Path(__file__).resolve().parents[1]
LOG = HERE / "LOG.md"
G = "https://blockstream.info/api/address/"
G2 = "https://mempool.space/api/address/"
ADDR = "bc1qr5mssp6snmduqp9enx4dzmcxvk7qw83lceyy2v"


def balance():
    ctx = ssl.create_default_context()
    last = None
    for base in (G, G2):
        try:
            with urllib.request.urlopen(base + ADDR, timeout=25, context=ctx) as r:
                d = json.load(r)
            cs = d["chain_stats"]
            return cs["funded_txo_sum"], cs["spent_txo_sum"], cs["tx_count"]
        except Exception as e:  # noqa: BLE001
            last = e
    raise SystemExit("оракул баланса недоступен: %s" % last)


def comb(n, k):
    if k < 0 or k > n:
        return 0
    a = 1
    for i in range(k):
        a = a * (n - i) // (i + 1)
    return a


ENTRY_TMPL = """
### H15 — ПРЕДРЕГИСТРАЦИЯ И ЗАКРЫТИЕ БЕЗ ПРОГОНА (маска `9vw04` x D80 / координаты 80 пар)
- Дата: {ts}. Бронь `9vw04-gem-finder` держалась на эту ось (note «mask 9vw04 x D80/coordinates»);
  ниже — почему прогон не запущен. Приз перед записью сверён он-чейн (blockstream, поле `chain_stats`):
  funded {f} / spent {s} / tx {t} => на адресе {net} сат, не тронут.
- Что даёт подсказка 02.01.2025 дословно: `******9vw04********************9vw04` — 36 позиций, из них
  26 звёздок (неизвестные символы) и 10 указанных; формулировка автора — «All 5 of these numbers and
  letters appear 2 times in the private key example», то есть это **свойство** multiset'а реального
  WIF, а не шаблон размещения; сам автор подтвердил, что «the spelling is incorrect on purpose»
  (в base58 нет `0`). Маска поэтому не задаёт ни одну позицию в 52-символьном WIF.
- Проверка «добавляет ли маска фильтрающую силу»: единственные фильтры, которые мы вообще можем
  применить к кандидату, — base58check (1/2^16 ложных прохождений, измерено в H11–H14) и точное
  совпадение pub(d) с раскрытым `039d7ce8…475b` (1/2^160). Оба строго сильнее любого признака маски:
  кандидат, не прошедший оракул, не может «спасть» по маске, а прошедший маску ничего не теряет.
  Значит прогон «H11/H12/H13/H14-потоки + проверка маски» = 0 новой информации (негатив по логике,
  а не по коду). Это же объясняет, почему H11–H14 дали 0: они и были исчерпывающей проверкой.
- Единственный способ сделать маску рабочей осью — знать правило «сетка -> WIF», то есть чем занять
  26 свободных позиций. Оценка пространства при минимальной естественной конструкции «5 символов
  {{9,v,w,0->o,4}} по 2 раза, остальные позиции любой base58»: выбор 10 позиций C(52,10) = {c5210},
  размещения в них пар = {place_pos}, заполнение оставшихся 42 позиций алфавитом из 58 =>
  всего ~10^{log10tot}. Ни о каком бюджете (15 минут, CPU) речи нет; это «перебор в лоб», запрещённый
  правилами каталога, а сужающего правила (N, порядок, отображение цифра->позиция) не существует.
- Вывод: 9vw04 остаётся insight-blocked. Ось H15 закрыта без прогона по причине «нет сужающей оси +
  оракул сильнее фильтра маски». Бронь снимается; возвращаться к пазлу — только при новой
  опубликованной подсказке автора (мониторить посты @GemfinderOfX и карточку agntn) или при
  разгаданном правиле «сетка -> WIF».
- Дисциплина: транзакций нет, покупкам и ЛС нет, ключей не найдено; результаты H11–H14 остаются
  в силе, `data/h14_pairs.json` и D80 — актуальный артефакт для будущих гипотез.
"""


def main():
    import datetime
    import math
    ts = "2026-10-19 " + datetime.datetime.now(datetime.timezone.utc).strftime("%H:%M UTC")
    f, s, t = balance()
    if f - s != 2020760 or t != 4:
        print("!!! параметры приза изменились — стоп, не писать, сообщать Илье:", f, s, t)
        return 1
    place = comb(52, 10) * (math.factorial(10) // 2 ** 5)
    total_log = math.log10(place) + 42 * math.log10(58)
    entry = ENTRY_TMPL.format(
        ts=ts, f=f, s=s, t=t, net=f - s,
        c5210=format(comb(52, 10), ","),
        place_pos=format(place, ","),
        log10tot=int(total_log),
    )
    raw = LOG.read_bytes()
    if "H15 — ПРЕДРЕГИСТРАЦИЯ" in raw.decode("utf-8", errors="replace"):
        print("уже записано, идемпотентность OK")
        return 0
    fd, tmp = tempfile.mkstemp(dir=str(LOG.parent), suffix=".tmp")
    with os.fdopen(fd, "wb") as fh:
        fh.write(raw)
        fh.write(entry.encode("utf-8"))
        fh.flush()
        os.fsync(fh.fileno())
    os.replace(tmp, LOG)
    print("записано:", ts, "| приза на адресе:", f - s, "| LOG:", LOG.stat().st_size, "байт")
    return 0


if __name__ == "__main__":
    sys.exit(main())
