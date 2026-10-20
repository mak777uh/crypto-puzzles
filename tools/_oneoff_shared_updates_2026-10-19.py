#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Одноразовая правка общих файлов (Qoder, 2026-10-19): MASTER_CATALOG + WAKE_QUEUE.
Атомарно (temp + os.replace), чужие строки не переставляем и не удаляем."""
import os

M = r"C:\Users\Admin\OneDrive\Desktop\master"


def atomic_write(path, text):
    tmp = path + ".tmp-qoder"
    with open(tmp, "w", encoding="utf-8", newline="\n") as fh:
        fh.write(text)
    os.replace(tmp, path)


BLOCK = """
### Триаж живых балансов в solved/ и вердикт по переносам (2026-10-19, Qoder)

Основание для возврата папки в `puzzles/` по §5 — новое событие («приз вернули/пополнили, автор открыл
этап»), а не сам факт ненулевого баланса. Проверено он-чейн (blockstream.info, только чтение, 19.10.2026):

| Адрес | Сат | Что это на самом деле | Вердикт |
|---|---|---|---|
| `bc1qnepv9pcnqvndux9h9mcaxvk6u993rc0lew9fpp` | 100 000 000 | приз LuckyLurker Vault #2, жив с 12.08.2026, трат 0 | папка **уже** в `puzzles/` и в индексе — перенос не требуется |
| `bc1qw8uecdjvuedtkg4s2kku4s2ak9r2cm59khclfr` | 1 000 000 | выход 0,01 BTC из кошелька **автора** CaesarCoder (tx `e2cbb236…`, сдача на change автора `bc1q7nn9…`); эскроу приза пуст | остаётся в `solved/`, `not-ours` |
| `17oKQHHRxdQBiRaGKCoVDQJfebhPaZV3r7` | 79 638 | кошелёк **решателя**: свип приза `bc1q32e3…` (80 000) 17.08.2026 tx `75e570a5…` | остаётся в `solved/`, `not-ours` |
| `157dpLJgAAKugukKz8UwBHapM4idyZvnLc` | 100 000 000 | приз ONFO жив **с 2021-06** — не пополнение; сегменты 6–10 не опубликованы, держатель ключа умер | dead-end, возвращён в `solved/` |
| `36T9H8hJP7xexevqayU9ADxGca7Y5dKquQ` | 99 996 681 | Natasha Otomoski: адрес пазла `179sxfh…` пуст (funded = spent = 100 000 078), деньги у третьей стороны с блока 591125 (2019) | closed, `not-ours`, возвращён в `solved/` |
| `3Jf995GANG4EmFBK89byNNyZdtB3ELXJsZ` | 21 021 000 | приз Licorne жив с 2020, ключи в 3 из 210 бумажных книг | dead-end, возвращён в `solved/` |
| `1HB5XMLmzFVj8ALj6mfBsbifRoD4miY36v` | 20 148 071 | hot wallet сервиса (~26 тыс. tx), не объект охоты | `not-ours` |

Итог по файлам: `solved/onfo-forsyth-1btc`, `solved/natasha-otomoski-1btc`,
`solved/objective-thune-licorne-0-21btc` возвращены из `puzzles/` (перенос, сделанный сегодня Beam по
основанию «лежат деньги», отменён; пометки Beam в README сохранены, ниже — наши поправки). Строки
восстановлены в `solved/INDEX.md` (раздел «Приз снят» = 29, «Dead-end» = 14; папок в `solved/` = 57).
`puzzles/dead-ends-registry/README.md` получил секцию «Живые балансы, которые нам не принадлежат».

Готовые решения из сети: `tools/harvest_published_keys_2026-10-19.py` (Beam) выводит 13 876 адресов из
опубликованных в сети ключей/сидов (agntn/puzzles, OCP, GitHub-дампы); `tools/harvest_balance_check_2026-10-19.py`
считает по ним живые балансы → `reports/data_harvest_live_2026-10-19.json`. Публикуемый ключ всегда
относится к **решённому** пазлу, поэтому адрес уже пуст; живые деньги при известном ключе = чужой кошелёк.

Транспорт: `mempool.space/api` после сегодняшних массовых чтений отдаёт пустой ответ/429; использовать
`blockstream.info/api` (~1 с/адрес, 4 потока). `privatekeys.pw` с этого хоста недоступен (curl HTTP 000).

Гигиена каталога: у Beam образовался дубль — `puzzles/logicbeach-powerful-moss-0-55eth` при уже закрытом
`solved/logicbeach-powerful-moss-0-54eth` (контракт пуст, 0.553 ETH забран 05.10.2026). Не удалён, ждёт
решения куратора.

"""

cat = os.path.join(M, "MASTER_CATALOG.md")
t = open(cat, encoding="utf-8").read()
tag = "Триаж живых балансов в solved/ и вердикт по переносам (2026-10-19, Qoder)"
if tag not in t:
    anchor = "#  КОНЕЦ КАТАЛОГА"
    if anchor in t:
        t = t.replace(anchor, BLOCK.strip() + "\n\n" + anchor, 1)
        atomic_write(cat, t)
        print("MASTER_CATALOG: секция добавлена перед баннером КОНЕЦ")
    else:
        atomic_write(cat, t.rstrip() + "\n" + BLOCK)
        print("MASTER_CATALOG: секция добавлена в конец")
else:
    print("MASTER_CATALOG: уже есть")

WQ = """## Текущая задача (проход 13, Qoder 19.10 13:1x МСК / 10:1x UTC): триаж живых балансов завершён — переносов нет, приоритет = сторож + новые данные

1. **Вердикт по «вернуть из solved/ в puzzles/» — нечего возвращать.** Ни один из трёх «свежих» адресов не
   является пополненным призом: `bc1qnepv…` (1 BTC, Vault #2) уже лежит в `puzzles/` и в индексе; `bc1qw8…`
   (1 000 000 сат) — кошелёк автора CaesarCoder (сдача tx `e2cbb236…` идёт на change автора `bc1q7nn9…`
   из OCP `on-chain-dialogue.json`); `17oKQH…` (79 638 сат) — кошелёк решателя LuckyLurker (приз `bc1q32e3…`
   funded = spent = 80 000). Он-чейн: blockstream.info, 19.10.2026. Отчёт:
   `reports/2026-10-19_1315_Qoder_solved-balances-triage.md`
2. **Отменён перенос, сделанный сегодня Beam** (`onfo-forsyth-1btc`, `natasha-otomoski-1btc`,
   `objective-thune-licorne-0-21btc` → обратно в `solved/`), индексы восстановлены. Живой баланс с 2020–2021
   годы — это не новое событие по §5. Пометки Beam в README не стёрты, рядом — поправки с доказательствами.
3. **Готовые решения в сети (приоритет 1) — проверено эмпирически.** Даёт ли опубликованный ключ доступ к живым
   деньгам: `tools/harvest_balance_check_2026-10-19.py` по 200 адресам из пересечения
   `reports/data_harvest_intersection_2026-10-19.json` (ключи из agntn/OCP/GitHub-дампов) → результат в
   `reports/data_harvest_live_2026-10-19.json`. Смысл: опубликованный ключ = решённый пазл = пустой адрес.
4. **Свипов не делал и не делаю** (правила №5 и №6 `AGENT_INSTRUCTIONS.md`): трансляций без ОК Ильи нет;
   ключи чужих кошельков (решатель/автор/hot wallet) не являются предметом охоты. Готовые «ключи с балансом»
   из типа privatekeys.pw — ловушка для комиссии и чужие деньги; с этого хоста сайт и вовсе недоступен.
5. **Рабочие цели сейчас (сторож, не прогон):** LuckyLurker Vault #2 (1 BTC, страница автора под капчей,
   подсказок 0), GSMG (tx_count/OP_RETURN-мониторинг), SLM/Kitten/Oobit — ждут новых внешних данных.
   GitHub-интейк «вся база» — следующая цель `1000-btc-challenge-bitcoin-puzzle-tx`.
6. **Транспорт:** `mempool.space/api` сегодня 429/пустые ответы → читать через `blockstream.info/api`.
   Гигиена: дубль `puzzles/logicbeach-powerful-moss-0-55eth` vs закрытый `solved/...-0-54eth` — на решение куратора.

"""

wq = os.path.join(M, "WAKE_QUEUE.md")
t = open(wq, encoding="utf-8").read()
old_head = "## Текущая задача (проход 12, AutoClaw 18.10 17:50Z)"
if "проход 13, Qoder 19.10" not in t:
    if old_head in t:
        t = t.replace(old_head, WQ + "---\n\n## Предыдущая задача (проход 12, AutoClaw 18.10 17:50Z)", 1)
        atomic_write(wq, t)
        print("WAKE_QUEUE: проход 13 добавлен, прежняя задача сохранена ниже")
    else:
        print("WAKE_QUEUE: якорь не найден — НЕ ИЗМЕНЁН")
else:
    print("WAKE_QUEUE: уже есть")
