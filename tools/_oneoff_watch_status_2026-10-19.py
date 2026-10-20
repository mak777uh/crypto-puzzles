#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Оформление решения владельца от 19.10.2026: onfo + objective-thune → статус «сторож» в puzzles/.

Атомарные правки общих файлов (OneDrive): temp + os.replace. Все замены с assert —
если текст на диске изменился чужим агентом, скрипт падает, а не пишет вслепую.
"""
import os, sys, tempfile

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
def P(*a): return os.path.join(ROOT, *a)

def atomic_write(path, text):
    fd, tmp = tempfile.mkstemp(dir=os.path.dirname(path), suffix=".tmp")
    with os.fdopen(fd, "w", encoding="utf-8", newline="\n") as f:
        f.write(text)
    os.replace(tmp, path)

def read(path):
    with open(path, encoding="utf-8") as f:
        return f.read()

def rep(text, old, new, path, count=1):
    n = text.count(old)
    assert n == count, f"{path}: ожидалось {count} вхождений, найдено {n}: {old[:70]!r}"
    return text.replace(old, new)

log = []

# ─────────────────────────────── 1. solved/INDEX.md ───────────────────────────────
p = P("solved", "INDEX.md")
t = read(p)
row_thune = "| [objective-thune-licorne-0-21btc](objective-thune-licorne-0-21btc/README.md) | dead-end: нужен физический факт (какие 3 из 210 книг содержат ключи). Приз жив с 2020 (`3Jf995…` = 21 021 000 сат), но это НЕ пополнение и не открытая стадия → возврат Beam 19.10 отменён |\n"
row_onfo = "| [onfo-forsyth-1btc](onfo-forsyth-1btc/README.md) | dead-end: сегменты 6–10 не опубликованы, держатель ключа умер в 2023. Приз жив с 2021 (`157dpLJ…` = 100 000 000 сат), нового события нет → возврат Beam 19.10 отменён |\n"
t = rep(t, row_thune, "", p)
t = rep(t, row_onfo, "", p)
t = rep(t, "## Dead-end и не-пазлы — не тратить время (14)",
           "## Dead-end и не-пазлы — не тратить время (12)", p)
t = rep(t, "Тупик без новой информации, отбраковано проверкой или не пазл вовсе. Не тратить время.",
           "Тупик без новой информации, отбраковано проверкой или не пазл вовсе. Не тратить время.\n"
           "\n> 2026-10-19, Qoder: `onfo-forsyth-1btc` и `objective-thune-licorne-0-21btc` вынесены отсюда\n"
           "> в `puzzles/` **по решению Ильи** со статусом «сторож» (живой приз + наблюдение, прогонов не\n"
           "> запускать). Причины тупика в силе; строки — в `puzzles/README.md`. Папок в `solved/` = 55,\n"
           "> строк индекса = 29 + 12 + 14.", p)
atomic_write(p, t); log.append("solved/INDEX.md: 2 строки убраны, Dead-end 14→12, примечание о решении")

# ─────────────────────────────── 2. puzzles/README.md ───────────────────────────────
p = P("puzzles", "README.md")
t = read(p)
anchor_oob = "- [oobit-139-bitcoinpuzzles-io-0-01545btc](oobit-139-bitcoinpuzzles-io-0-01545btc/README.md)"
assert anchor_oob in t, "puzzles/README.md: якорь oobit не найден"
line_objective = ("- [objective-thune-licorne-0-21btc](objective-thune-licorne-0-21btc/README.md) — "
                  "Objective Thune «Le Secret de la Licorne» (0,21021 BTC) — **[сторож]** жив с 2020, "
                  "нужен физический факт (3 из 210 томов); решение Ильи 19.10.2026, прогоны не запускать\n")
i = t.index(anchor_oob)
line_onfo = ("- [onfo-forsyth-1btc](onfo-forsyth-1btc/README.md) — ONFO / Dr. Forsyth Treasure Hunt "
             "(1,00000000 BTC) — **[сторож]** приз жив с 2021-06, сегменты 6–10 не опубликованы, автор умер; "
             "решение Ильи 19.10.2026, прогоны не запускать\n")
t = t[:i] + line_objective + t[i:]
anchor_path = "- [path-to-greatness-treasure-hunt-3ltc](path-to-greatness-treasure-hunt-3ltc/README.md)"
j = t.index(anchor_path)
t = t[:j] + line_onfo + t[j:]
atomic_write(p, t); log.append("puzzles/README.md: добавлены 2 строки со статусом [сторож]")

# ─────────────────────── 3. папки onfo / objective-thune ───────────────────────
BANNER_OLD = ("> **ПЕРЕМЕЩЕНО 2026-10-17 в `master/solved/`** — пазл решён/закрыт/тупиковый, "
              "активная работа не ведётся. Причина: [../INDEX.md](../INDEX.md). Вернуть в `puzzles/` — "
              "только при новых данных (правила: `AGENT_INSTRUCTIONS.md`).")

folders = {
    "onfo-forsyth-1btc": {
        "prize": "`157dpLJgAAKugukKz8UwBHapM4idyZvnLc` = 100 000 000 сат (1,00000000 BTC), жив с 2021-06",
        "dead": "сегменты 6–10 не опубликованы, единственный названный держатель ключа умер в 2023",
        "reason_short": "приз жив с 2021-06, новых событий нет",
    },
    "objective-thune-licorne-0-21btc": {
        "prize": "`3Jf995GANG4EmFBK89byNNyZdtB3ELXJsZ` = 21 021 000 сат (0,21021 BTC), жив с 2020",
        "dead": "нужен физический факт: какие 3 из 210 нумерованных томов содержат ключи; вычислением не берётся",
        "reason_short": "приз жив с 2020, новых событий нет",
    },
}
for slug, d in folders.items():
    rp = P("puzzles", slug, "README.md")
    t = read(rp)
    banner_new = (f"> **ВОЗВРАЩЁН В `master/puzzles/` 2026-10-19 — статус «СТОРОЖ» (решение Ильи)** — "
                  f"папка была перенесена в `solved/` 17.10.2026 как тупик; {d['reason_short']}, но деньги "
                  f"не разобраны, поэтому цель держится под наблюдением, а не под перебором. Рабочих прогонов "
                  f"не запускать: {d['dead']}. Основание: `AGENT_INSTRUCTIONS.md` §5 + правило №4; "
                  f"история переносов: [../../solved/INDEX.md](../../solved/INDEX.md).")
    if BANNER_OLD in t:
        t = rep(t, BANNER_OLD, banner_new, rp)
    else:
        assert "ВОЗВРАЩЁН В `master/puzzles/`" in t, f"{rp}: баннер не распознан"
    old_status = "- Статус: **dead-end** (dead-end)"
    if old_status in t:
        t = rep(t, old_status,
                   "- Статус: **сторож** (тупик сохраняется; наблюдение вместо активной работы — решение Ильи 19.10.2026)",
                   rp)
    tag = "## Обновление (2026-10-19, Qoder) — статус «сторож» по решению владельца"
    if tag not in t:
        t = t.rstrip("\n") + "\n\n" + tag + "\n" + "\n".join([
            "- Тип: решение владельца / статус цели",
            "- Суть: по запросу Ильи папка возвращена в `puzzles/` и ведётся как **цель-сторож**: приз "
            + d["prize"] + "; рабочих прогонов нет — тупик прежний (" + d["dead"] + ").",
            "- Что делает сторож: `python tools/sandbox/monitor.py` следит за балансом, tx_count и "
            "OP_RETURN адреса и сам дописывает событие в этот `LOG.md`.",
            "- Условия переоткрытия активной работы: (§5) пополнение/возврат приза, публикация "
            "отсутствующих материалов, заявление автора о новой стадии.",
            "- Источник: решение Ильи в сессии 19.10.2026; проверка баланса — https://blockstream.info/api "
            "(read-only, 19.10.2026).",
            "- Проверено: да (только чтение он-чейн; транзакций не создавалось).",
            "- Подробности и хроника: см. LOG.md",
        ]) + "\n"
        atomic_write(rp, t)
    lp = P("puzzles", slug, "LOG.md")
    lt = read(lp)
    ltag = "## 2026-10-19, 13:5x МСК — Qoder (Qoder Desktop, Windows) — решение владельца: статус «сторож»"
    if ltag not in lt:
        lt = lt.rstrip("\n") + "\n\n" + ltag + "\n" + "\n".join([
            "- Делал: по ответу Ильи на уточняющий вопрос (`Вернуть в puzzles/ со статусом «сторож»`) вернул "
            "папку из `solved/` в `puzzles/` (`mv`), снял прежнюю пометку «возврат отменён», обновил баннер "
            "и строку статуса в README, синхронизировал `solved/INDEX.md` (строки убраны, раздел Dead-end "
            "14→12) и `puzzles/README.md` (2 строки с меткой [сторож]).",
            "- Результат: цель переведена в режим наблюдения вместо архива. Крипто-работа не ведётся: "
            "нет инсайт-оси (правило №4), поэтому прогоны не запускались и не планируются.",
            "- Инструмент: `tools/sandbox/monitor.py` (watch-only, только GET blockstream.info) + "
            "`tools/sandbox/watchonly.json` (адрес в списке), `tools/sandbox/psbt_prepare.py` умеет "
            "готовить только НЕПОДПИСАННЫЙ PSBT — адрес назначения Илья ещё не выдал.",
            "- Артефакты: tools/sandbox/{README.md,monitor.py,watchonly.json,psbt_prepare.py}, "
            "tools/_oneoff_watch_status_2026-10-19.py",
            "- Ссылки: https://blockstream.info/api (балансы 19.10.2026), "
            "AGENT_INSTRUCTIONS.md §5 «Зона solved/», правила №4, №5, №6.",
        ]) + "\n"
        atomic_write(lp, lt)
    log.append(f"puzzles/{slug}: баннер+статус+README-секция+LOG (сторож)")

# ─────────────────────────────── 4. MASTER_CATALOG.md ───────────────────────────────
p = P("MASTER_CATALOG.md")
t = read(p)
t = rep(t, "| `157dpLJgAAKugukKz8UwBHapM4idyZvnLc` | 100 000 000 | приз ONFO жив **с 2021-06** — не пополнение; сегменты 6–10 не опубликованы, держатель ключа умер | dead-end, возвращён в `solved/` |",
         "| `157dpLJgAAKugukKz8UwBHapM4idyZvnLc` | 100 000 000 | приз ONFO жив **с 2021-06** — не пополнение; сегменты 6–10 не опубликованы, держатель ключа умер | **сторож** (решение Ильи 19.10): папка в `puzzles/`, прогонов нет |", p)
t = rep(t, "| `3Jf995GANG4EmFBK89byNNyZdtB3ELXJsZ` | 21 021 000 | приз Licorne жив с 2020, ключи в 3 из 210 бумажных книг | dead-end, возвращён в `solved/` |",
         "| `3Jf995GANG4EmFBK89byNNyZdtB3ELXJsZ` | 21 021 000 | приз Licorne жив с 2020, ключи в 3 из 210 бумажных книг | **сторож** (решение Ильи 19.10): папка в `puzzles/`, вычислением не берётся |", p)
old_summ = ("Итог по файлам: `solved/onfo-forsyth-1btc`, `solved/natasha-otomoski-1btc`,\n"
            "`solved/objective-thune-licorne-0-21btc` возвращены из `puzzles/` (перенос, сделанный сегодня Beam по\n"
            "основанию «лежат деньги», отменён; пометки Beam в README сохранены, ниже — наши поправки). Строки\n"
            "восстановлены в `solved/INDEX.md` (раздел «Приз снят» = 29, «Dead-end» = 14; папок в `solved/` = 57).\n"
            "`puzzles/dead-ends-registry/README.md` получил секцию «Живые балансы, которые нам не принадлежат».")
new_summ = ("Итог по файлам (с учётом решения Ильи от 19.10): `natasha-otomoski-1btc` остаётся в `solved/` —\n"
            "приз с 2019 у третьей стороны, работать нечего. `onfo-forsyth-1btc` и `objective-thune-licorne-0-21btc`\n"
            "сначала были возвращены в `solved/` (перенос Beam по основанию «лежат деньги» не обоснован по §5),\n"
            "затем по решению владельца переведены в `puzzles/` со статусом **«сторож»**: живой приз + наблюдение,\n"
            "прогоны не запускаются. Индексы синхронизированы: `solved/INDEX.md` = 29 + 12 + 14 строк (папок 55),\n"
            "`puzzles/README.md` содержит обе строки с меткой [сторож]. Пометки Beam в README сохранены, рядом —\n"
            "поправки с доказательствами. `puzzles/dead-ends-registry/README.md` получил секцию\n"
            "«Живые балансы, которые нам не принадлежат».\n"
            "\nПесочница: `tools/sandbox/` — watch-only (`watchonly.json`, 13 адресов: 8 призов, 5 чужих кошельков),\n"
            "сторож `monitor.py` (баланс/tx_count/OP_RETURN + автозапись в `LOG.md` пазла) и `psbt_prepare.py`\n"
            "(только НЕПОДПИСАННЫЙ PSBT; адрес назначения ещё не выдан, broadcast не делается — правила №5, №6).")
t = rep(t, old_summ, new_summ, p)
atomic_write(p, t); log.append("MASTER_CATALOG.md: вердикты onfo/thune → «сторож», итог по файлам + песочница")

# ─────────────────────────────── 5. WAKE_QUEUE.md ───────────────────────────────
p = P("WAKE_QUEUE.md")
t = read(p)
old2 = ("2. **Отменён перенос, сделанный сегодня Beam** (`onfo-forsyth-1btc`, `natasha-otomoski-1btc`,\n"
        "   `objective-thune-licorne-0-21btc` → обратно в `solved/`), индексы восстановлены. Живой баланс с 2020–2021\n"
        "   годы — это не новое событие по §5. Пометки Beam в README не стёрты, рядом — поправки с доказательствами.")
new2 = ("2. **Перенос Beam отменён, затем — решение Ильи.** `onfo-forsyth-1btc` и\n"
        "   `objective-thune-licorne-0-21btc` возвращены в `puzzles/` со статусом **«сторож»** (живой приз +\n"
        "   наблюдение, прогоны не запускать; тупик прежний). `natasha-otomoski-1btc` остаётся в `solved/`\n"
        "   (приз с 2019 у третьей стороны). Индексы сведены: `solved/INDEX.md` = 29 + 12 + 14 (папок 55),\n"
        "   в `puzzles/README.md` добавлены 2 строки [сторож].")
t = rep(t, old2, new2, p)
old5 = ("5. **Рабочие цели сейчас (сторож, не прогон):** LuckyLurker Vault #2 (1 BTC, страница автора под капчей,\n"
        "   подсказок 0), GSMG (tx_count/OP_RETURN-мониторинг), SLM/Kitten/Oobit — ждут новых внешних данных.")
new5 = ("5. **Песочница собрана (решение Ильи: watch-only + сторож):** `tools/sandbox/` — `watchonly.json` (13\n"
        "   адресов: 8 призов, 5 чужих кошельков), `monitor.py` (баланс/tx_count/OP_RETURN, автозапись в LOG пазла;\n"
        "   стартовый снимок 19.10: Vault #2 1 BTC, ONFO 1 BTC, Licorne 0,21021, GSMG 1,25649674, bitaps 1,00016775),\n"
        "   `psbt_prepare.py` — только неподписанный PSBT. **Блокер:** Илья не выдал адрес назначения\n"
        "   (`wallet.destination_address = null`), свипов не делал и без ОК делать не буду (правило №5).\n"
        "   Дешёвый вызов на каждом проходе: `python tools/sandbox/monitor.py --quiet`.\n"
        "6. **Рабочие цели сейчас (сторож, не прогон):** LuckyLurker Vault #2 (1 BTC, страница автора под капчей,\n"
        "   подсказок 0), GSMG (tx_count/OP_RETURN-мониторинг), ONFO и Licorne — только события, SLM/Kitten/Oobit —\n"
        "   ждут новых внешних данных.")
t = rep(t, old5, new5, p)
atomic_write(p, t); log.append("WAKE_QUEUE.md: проход 13 — решение по «сторож» + песочница + блокер адреса")

# ─────────────────────────────── 6. отчёт прохода ───────────────────────────────
p = P("reports", "2026-10-19_1315_Qoder_solved-balances-triage.md")
t = read(p)
old61 = ("Сейчас в дереве: обе папки в `solved/` (я вернул). Если предпочитаешь вариант Beam — одна команда их\n"
         "перенесёт обратно в `puzzles/` со статусом «сторож», и я поправлю индексы; скажи «возвращай onfo и thune в\n"
         "puzzles как цели-сторожа».")
new61 = ("**Решение Ильи получено и исполнено (19.10, ~13:50):** «Вернуть в puzzles/ со статусом „сторож“».\n"
         "Обе папки в `puzzles/`, в `solved/INDEX.md` их строк больше нет (раздел Dead-end 14 → 12, папок 55),\n"
         "в `puzzles/README.md` добавлены строки с меткой [сторож], в каждой папке — баннер, секция статуса и\n"
         "запись в `LOG.md`. `natasha-otomoski-1btc` по общему согласию осталась в `solved/`.")
t = rep(t, old61, new61, p)
old7 = ("## 7. Следующий шаг (жду решения)\n\n"
        "1. «Делай песочницу» → `tools/sandbox/`: watch-only + подготовка неподписанного PSBT + сторож призов\n"
        "   (пополнение/OP_RETURN/tx_count) с автозаписью в LOG.\n"
        "2. «Закрой тему переносов» → коммит с этим отчётом (сейчас изменения только в рабочем дереве; проверено: `solved/` = 57 папок = 29 + 14 + 14 строк индекса, конфликта OneDrive-копий нет).\n"
        "3. Если ты всё-таки хочешь держать ONFO/Licorne в активных целях — скажи, верну в `puzzles/` и\n"
        "   оформлю как «сторож», но по §5 это не обосновано: новых событий на этих адресах не было с 2020–2021 годов.")
new7 = ("## 7. Итог по решениям (исполнено в этом же проходе)\n\n"
        "1. **Песочница сделана** — по выбранному варианту «Watch-only + сторож призов»: `tools/sandbox/`\n"
        "   (`README.md`, `watchonly.json`, `monitor.py`, `psbt_prepare.py`, `state.json`).\n"
        "2. **ONFO и Licorne возвращены в `puzzles/` со статусом «сторож»** — твой ответ на расхождение §6.1;\n"
        "   основания §5 по-прежнему нет (событий не было), поэтому режим именно наблюдательный.\n"
        "3. Изменения лежат в рабочем дереве; коммита не делал (не запрошен). Проверено: `solved/` = 55 папок =\n"
        "   29 + 12 + 14 строк индекса, OneDrive-конфликтов нет.\n"
        "\n## 8. Что нужно от тебя (единственный блокер)\n\n"
        "1. **Адрес назначения** для призов: в `tools/sandbox/watchonly.json` поле `wallet.destination_address`\n"
        "   пустое. Пока его нет, `psbt_prepare.py` может только показывать механику на тестовом адресе.\n"
        "2. **ОК на свип** по каждому призу отдельно (правило №5) — сейчас живых ключей нет ни у одного, так что\n"
        "   пункт пока теоретический.\n"
        "3. Решение по дубликату Beam `puzzles/logicbeach-powerful-moss-0-55eth` (§6) — удалять или\n"
        "   оставить как след.\n"
        "\n### Приложения: итоги фоновых прогонов\n\n"
        "* `reports/data_harvest_live_v2_2026-10-19.json` — 200 адресов из пересечения опубликованных ключей: **0 живых**,\n"
        "  23 ошибки API; `reports/data_harvest_live_retry_2026-10-19.json` — повтор этих 23 воркером=1: 23/23,\n"
        "  **0 живых, 0 ошибок**. Итог по приоритету №1 закрывается: готовых опубликованных решений, контролирующих\n"
        "  живые балансы, в проверенном корпусе нет.\n"
        "* `reports/data_solved_balances_recheck_2026-10-19.json` — 59 адресов из `solved/`, 11 ненулевых; из новых\n"
        "  находок: `bc1qdu8mh9qjtjhy89mvhmcgf66ul6ld92rdr6qzad` = 924 704 сат — это назначение свипа Genesis-эскроу\n"
        "  (сторонний решатель), то есть `not-ours`, а не новый приз.\n"
        "* Свип-транзакции не создавались и не транслировались; приватных ключей в репозитории не появлялось.")
t = rep(t, old7, new7, p)
atomic_write(p, t); log.append("отчёт прохода: §6.1 закрыт решением, §7/§8 переписаны")

for line in log:
    print("OK:", line)
print("\nГОТОВО")
