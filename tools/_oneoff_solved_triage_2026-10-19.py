#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Одноразовый фикс триажа «живые балансы в solved/» (Qoder, 2026-10-19).

Делает атомарные правки (temp + os.replace, по протоколу §4):
  1. solved/INDEX.md — возвращает 3 строки, снятые Beam, и правит счётчик раздела;
  2. LOG.md затронутых папок — запись с он-чейн доказательствами и причиной решения;
  3. README.md трёх папок — поправка под секцией Beam (не затирая её);
  4. puzzles/dead-ends-registry/README.md — строки not-ours по чужим кошелькам.
Ничего не транслирует, ключей не читает и не пишет.
"""
from __future__ import annotations
import os, sys

M = r"C:\Users\Admin\OneDrive\Desktop\master"


def atomic_write(path: str, text: str) -> None:
    tmp = path + ".tmp-qoder"
    with open(tmp, "w", encoding="utf-8", newline="\n") as fh:
        fh.write(text)
    os.replace(tmp, path)


def append(path: str, block: str, tag: str) -> str:
    if not os.path.exists(path):
        return f"ПРОПУСК (нет файла): {path}"
    t = open(path, encoding="utf-8").read()
    if tag in t:
        return f"УЖЕ ЕСТЬ ({tag[:28]}…) -> {path}"
    atomic_write(path, t.rstrip("\n") + "\n\n" + block.rstrip("\n") + "\n")
    return f"append -> {path}"


def insert_after(path: str, anchor: str, new_line: str) -> str:
    t = open(path, encoding="utf-8").read()
    if anchor not in t:
        return f"ЯКОРЬ НЕ НАЙДЕН в {path}: {anchor[:40]}"
    lines = t.split("\n")
    for i, l in enumerate(lines):
        if anchor in l:
            if any(new_line.split("](",1)[1][:18] in x for x in lines):
                return f"СТРОКА УЖЕ ЕСТЬ в {path}"
            lines.insert(i + 1, new_line)
            atomic_write(path, "\n".join(lines))
            return f"insert после строки {i+1} -> {path}"
    return f"не вставлено -> {path}"


# ---------------------------------------------------------------- 1. INDEX
idx = os.path.join(M, "solved", "INDEX.md")
t = open(idx, encoding="utf-8").read()
t = t.replace("## Решённые — приз снят (30)", "## Решённые — приз снят (29)")
atomic_write(idx, t)
print("счётчик раздела ->", "ок")

print(insert_after(
    idx,
    "| [mini-puzzles-retiredcoder]",
    "| [natasha-otomoski-1btc](natasha-otomoski-1btc/README.md) | solved (WIF опубликован решателем akkort 22.08.2019); приз 0,99996681 BTC ушёл на ЧУЖОЙ адрес `36T9H8…` до публикации — not-ours; адрес пазла пуст (funded = spent = 100 000 078 сат, blockstream 19.10.2026). Возврат в puzzles/, сделанный Beam 19.10, отменён |",
))
print(insert_after(
    idx,
    "| [nist-seeds-bounty-valsorda]",
    "| [objective-thune-licorne-0-21btc](objective-thune-licorne-0-21btc/README.md) | dead-end: нужен физический факт (какие 3 из 210 книг содержат ключи). Приз жив с 2020 (`3Jf995…` = 21 021 000 сат), но это НЕ пополнение и не открытая стадия → возврат Beam 19.10 отменён |",
))
print(insert_after(
    idx,
    "| [objective-thune-licorne-0-21btc]",
    "| [onfo-forsyth-1btc](onfo-forsyth-1btc/README.md) | dead-end: сегменты 6–10 не опубликованы, держатель ключа умер в 2023. Приз жив с 2021 (`157dpLJ…` = 100 000 000 сат), нового события нет → возврат Beam 19.10 отменён |",
))

# ---------------------------------------------------------------- 2. LOG
SRC = ("https://blockstream.info/api/ (read-only, 2026-10-19), "
       "правило переноса: `../../AGENT_INSTRUCTIONS.md` §5 «Зона solved/»")

LOGS = {
    os.path.join(M, "solved", "onfo-forsyth-1btc", "LOG.md"): (
        "## 2026-10-19, 13:1x МСК — Qoder (Qoder Desktop, Windows) — триаж живых балансов: возврат в `puzzles/` отменён\n"
        "- Делал: независимая он-чейн сверка адреса приза + перечитка правила §5; папка возвращена из `puzzles/` в `solved/` (перенос сегодня сделал Beam по основанию «на адресе лежат деньги»). Транзакций не создавал и не транслировал, бронь `claims.py acquire onfo-forsyth-1btc --agent Qoder`.\n"
        "- Результат (он-чейн): `157dpLJgAAKugukKz8UwBHapM4idyZvnLc` — funded 100 000 000 сат, spent 0, tx_count 1 → приз жив **с 2021-06**, т.е. это не «вернули/пополнили» и не «автор открыл этап». Новых данных нет: досье и так фиксировало `state: funded-unspent` (проверка 16.08.2026).\n"
        "- Почему остаётся тупиком: половина корпуса не опубликована (сегменты 6–10), единственный названный держатель ключа умер в 2023 (cointelegraph), готового решения в сети нет; перебор raw-private-key не сужен ни одной инсайт-осью → по правилу Ильи №4 прогон запрещён.\n"
        "- Ссылки: " + SRC + "; https://www.benzinga.com/pressreleases/21/06/a21717862/onfo-announces-bitcoin-treasure-hunt ; https://cointelegraph.com/news/bitcoin-millionaire-onfo-coin-creator-dead\n"
    ),
    os.path.join(M, "solved", "natasha-otomoski-1btc", "LOG.md"): (
        "## 2026-10-19, 13:1x МСК — Qoder (Qoder Desktop, Windows) — живые деньги на адресе 36T9H8… = не наш приз: возврат отменён\n"
        "- Делал: он-чейн сверка адреса пазла и адреса-получателя, чтение хроники треда blockladder; папка возвращена из `puzzles/` в `solved/`. Бронь `claims.py acquire natasha-otomoski-1btc --agent Qoder`. Никаких трансляций.\n"
        "- Результат (он-чейн): адрес пазла `179sxfh6rw6bHSo5wVUhLP96k46QaEzVP` — funded = spent = 100 000 078 сат, баланс **0**. Пустой адрес — это то, чем владеет **опубликованный** ключ akkort (`SheHadTheIdeaWhileCombingHerHair`, 32 символа = приватный ключ; WIF опубликован в треде 22.08.2019). Деньги (99 996 681 сат) ушли на `36T9H8hJP7xexevqayU9ADxGca7Y5dKquQ` tx `b01af713b3c43c7e60ed03ada26a64a92f68be2f561ecf17c67e22393c10da53`, блок 591125 — **за 7 месяцев до публикации решения**, т.е. на них сидит третья сторона.\n"
        "- Следствие по протоколу: «поиск способа извлечения», предложенный в пометке Beam, невозможен легально — у нас нет и не может быть ключа от `36T9H8…`; это чужие монеты (`not-ours` в dead-ends-registry), а не неразобранное дело. Пазл закрыт: решён и снят в 2019.\n"
        "- Ссылки: " + SRC + "; https://blockstream.info/tx/b01af713b3c43c7e60ed03ada26a64a92f68be2f561ecf17c67e22393c10da53 ; https://puzzles.agntn.dev/collections/natasha-otomoski\n"
    ),
    os.path.join(M, "solved", "objective-thune-licorne-0-21btc", "LOG.md"): (
        "## 2026-10-19, 13:1x МСК — Qoder (Qoder Desktop, Windows) — триаж живых балансов: возврат в `puzzles/` отменён\n"
        "- Делал: он-чейн сверка эскроу + перечитка §5; папка возвращена из `puzzles/` в `solved/`. Бронь `claims.py acquire objective-thune-licorne-0-21btc --agent Qoder`. Трансляций нет.\n"
        "- Результат (он-чейн): `3Jf995GANG4EmFBK89byNNyZdtB3ELXJsZ` = 21 021 000 сат, трат 0 — приз жив с 2020 (2 пополнения: 03.01.2020 и 19.06.2020). Основания для возврата по §5 («приз вернули/пополнили», «автор открыл этап») отсутствуют: пополнений после 2020 не было.\n"
        "- Почему тупик: 2-of-3 multisig по физическим книгам — нужны 3 ключа из 210 нумерованных экземпляров. Это физический факт, не вычисление; готового решения в сети нет.\n"
        "- Ссылки: " + SRC + "; https://bitcoin.fr/le-secret-de-la-licorne/ ; https://mempool.space/address/3Jf995GANG4EmFBK89byNNyZdtB3ELXJsZ\n"
    ),
    os.path.join(M, "solved", "caesarcoder-genesis-block-wallet-puzzle-947ksats", "LOG.md"): (
        "## 2026-10-19, 13:1x МСК — Qoder (Qoder Desktop, Windows) — 0,01 BTC на bc1qw8… : это НЕ приз, папка остаётся в `solved/`\n"
        "- Делал: разворот транзакции пополнения и атрибуция адреса по дампу «on-chain dialogue» OCP; сверка баланса. Бронь `claims.py acquire caesarcoder-genesis-block-wallet-puzzle-947ksats --agent Qoder`. Только чтение.\n"
        "- Результат (он-чейн): `bc1qw8uecdjvuedtkg4s2kku4s2ak9r2cm59khclfr` — funded 1 000 000 сат, spent 0, 1 tx. Пополнение: tx `e2cbb23690c3c1f8a294c7e4747cf62f374cddf06bdec1beeff39e12d2a0c5d2`, блок 963509 (2026-08-21): 1 вход 1 063 054 сат с `bc1q0x054lv785rh0xk8gysk47pfpldutxxsccusm5`, 2 выхода — 1 000 000 на bc1qw8… и **сдача 62 970 на `bc1q7nn9hjr6lfx4cfngxvgwqpmnu26d9r3nuyhu24`**, а `bc1q7nn9…` в `data/ocp/data/on-chain-dialogue.json` проходит как **change-адрес автора** в цепочке платных подсказок. OP_RETURN в этой tx нет.\n"
        "- Эскроу приза (`bc1qfkhx02…`) проверил отдельно: funded = spent = 947 620 сат, 120/120 выходов потрачены, баланс 0 — свип 17.10.2026 (уже зафиксирован нами 18.10).\n"
        "- Вывод: живая вода — кошелёк автора, а не пополненный приз; возврат в `puzzles/` не обоснован (§5), папка остаётся в `solved/`. Пометку Beam «leftover» correcting в README оставил, ниже — наша поправка.\n"
        "- Ссылки: " + SRC + "; https://blockstream.info/tx/e2cbb23690c3c1f8a294c7e4747cf62f374cddf06bdec1beeff39e12d2a0c5d2 ; `data/ocp/data/on-chain-dialogue.json`\n"
    ),
    os.path.join(M, "solved", "luckylurker-seed-riddles-80ksats", "LOG.md"): (
        "## 2026-10-19, 13:1x МСК — Qoder (Qoder Desktop, Windows) — 79 638 сат на 17oKQH… : кошелёк решателя, не приз\n"
        "- Делал: он-чейн сверка адреса приза и адреса-получателя. Бронь `claims.py acquire luckylurker-seed-riddles-80ksats --agent Qoder`. Только чтение, трансляций нет.\n"
        "- Результат: `bc1q32e3dxcd0n2tlzdmchraf2057d0ax4xdwrk3jq` (приз 80 000 сат) — funded 80 000 = spent 80 000, баланс **0**. Свип 17.08.2026 tx `75e570a5ea243c492e2804916482f046b2392b463c51be15624e6e25a84119f7` вывел 79 638 сат на `17oKQHHRxdQBiRaGKCoVDQJfebhPaZV3r7` + 362 сат комиссии (досье vault-1, строка 56). Значит 17oKQH… — **адрес получателя, кошелёк решателя**, а не «пополненный приз».\n"
        "- Вывод: §5 не выполняется (паук снят, стадия не открывалась заново); папка остаётся в `solved/`. Баланс 79 638 сат помечен `not-ours` в `puzzles/dead-ends-registry/README.md`, чтобы следующие агенты не тратили проход и не пробовали «извлечь».\n"
        "- Ссылки: " + SRC + "; https://blockstream.info/address/bc1q32e3dxcd0n2tlzdmchraf2057d0ax4xdwrk3jq\n"
    ),
    os.path.join(M, "solved", "luckylurker-vault-1-0-0008btc", "LOG.md"): (
        "## 2026-10-19, 13:1x МСК — Qoder (Qoder Desktop, Windows) — уточнение по 17oKQH… (важно для индексов)\n"
        "- Делал: сверка адреса приза серии с он-чейном (blockstream). Бронь `claims.py acquire luckylurker-vault-1-0-0008btc --agent Qoder`.\n"
        "- Результат: приз 80 000 сат на `bc1q32e3dxcd0n2tlzdmchraf2057d0ax4xdwrk3jq` полностью потрачен (funded = spent, баланс 0). Остаток 79 638 сат, который Beam 19.10 записал в таблицу как «остаток от spend vault #1», лежит на адресе **получателя свипа** `17oKQHHRxdQBiRaGKCoVDQJfebhPaZV3r7` — это деньги решателя, не объекта охоты. Оснований возвращать папку в `puzzles/` нет: §5 требует возврата/пополнения приза или открытой автором стадии.\n"
        "- Отдельно: адрес Vault #2 (`bc1qnepv9pcnqvndux9h9mcaxvk6u993rc0lew9fpp`, 1,00000000 BTC) проверен здесь же — жив, 1 tx, трат 0. Он **уже** лежит в `puzzles/luckylurker-vault-2-1btc/` и уже в индексе (`puzzles/README.md:65`); переносить нечего, статус «postponed, 0 подсказок» прежний.\n"
        "- Ссылки: " + SRC + "; https://blockstream.info/address/bc1qnepv9pcnqvndux9h9mcaxvk6u993rc0lew9fpp\n"
    ),
    os.path.join(M, "puzzles", "luckylurker-vault-2-1btc", "LOG.md"): (
        "> Формат ведения: см. `../../AGENT_INSTRUCTIONS.md`.\n"
        "## 2026-10-19, 13:1x МСК — Qoder (Qoder Desktop, Windows) — подтверждение: папка уже в `puzzles/`, дублирующий перенос не нужен\n"
        "- Делал: сверка с триажем балансов `solved/*` (Beam 19.10 предложил «вернуть Vault #2 из solved/ в puzzles/»). Проверил фактическое расположение и индексы. Бронь `claims.py acquire luckylurker-vault-2-1btc --agent Qoder`, только чтение.\n"
        "- Результат: `puzzles/luckylurker-vault-2-1btc/` существует, в `solved/` копии нет, в `puzzles/README.md:65` строка есть → предложение Beam уже исполнено ранее, повторный перенос создал бы дубль. Он-чейн: `bc1qnepv9pcnqvndux9h9mcaxvk6u993rc0lew9fpp` = 100 000 000 сат, spent 0, tx_count 1 — приз на месте, свипа не было.\n"
        "- Ограничение транспорта: `mempool.space/api` сегодня на наших запросах отдаёт пустой ответ/429 после массовых прогонов агентов; для чтений используем `blockstream.info/api` (отвечает ~1 с), прогоны балансировщиков — с 3 потоками и без долгих фолбэков.\n"
        "- Что дальше по этому пазлу: сторож (страница автора под SG-капчей, подсказок 0). Перебор не запускать: нет сужающей оси (правило №4).\n"
        "- Ссылки: " + SRC + "; https://luckylurker.com/bitcoin-vault-2/ ; https://blockstream.info/address/bc1qnepv9pcnqvndux9h9mcaxvk6u993rc0lew9fpp\n"
    ),
}

for p, block in LOGS.items():
    print(append(p, block, "2026-10-19, 13:1x МСК — Qoder"))

# ---------------------------------------------------------------- 3. README-поправки
CORR = {
    os.path.join(M, "solved", "onfo-forsyth-1btc", "README.md"):
        "## Поправка к возврату (2026-10-19, Qoder)\n"
        "- Тип: отрицательный результат / классификация статуса\n"
        "- Суть: возврат в `puzzles/` отменён, папка снова в `solved/`. Он-чейн: `157dpLJ…` = 100 000 000 сат, spent 0 — приз жив **с 2021-06**, т.е. это не пополнение и не новая стадия (§5). Тупик прежнее: сегменты 6–10 не опубликованы, держатель ключа умер в 2023, готового решения в сети нет.\n"
        "- Источник: https://blockstream.info/address/157dpLJgAAKugukKz8UwBHapM4idyZvnLc (проверено 19.10.2026)\n"
        "- Проверено: да (blockstream.info, read-only)\n"
        "- Влияние на оценку: цель остаётся «сторож», не рабочая; ресурсы не тратить.\n"
        "- Подробности и хроника: см. LOG.md\n",
    os.path.join(M, "solved", "natasha-otomoski-1btc", "README.md"):
        "## Поправка к возврату (2026-10-19, Qoder)\n"
        "- Тип: классификация (not-ours) / отмена переноса\n"
        "- Суть: возврат в `puzzles/` отменён, папка снова в `solved/`. Он-чейн: адрес пазла `179sxfh…` пуст (funded = spent = 100 000 078), а 99 996 681 сат лежат на `36T9H8…` — адресе **третьей стороны**, получателя свопа в блоке 591125 (за 7 месяцев до публикации решения akkort). Ключ akkort даёт пустой адрес: «извлекать» нечего, а попытка потратить чужой адрес — это не решение пазла, а чужие деньги.\n"
        "- Источник: https://blockstream.info/tx/b01af713b3c43c7e60ed03ada26a64a92f68be2f561ecf17c67e22393c10da53 (проверено 19.10.2026)\n"
        "- Проверено: да\n"
        "- Влияние на оценку: цель закрыта; помечена `not-ours` в `puzzles/dead-ends-registry/`.\n"
        "- Подробности и хроника: см. LOG.md\n",
    os.path.join(M, "solved", "objective-thune-licorne-0-21btc", "README.md"):
        "## Поправка к возврату (2026-10-19, Qoder)\n"
        "- Тип: отрицательный результат / классификация статуса\n"
        "- Суть: возврат в `puzzles/` отменён, папка снова в `solved/`. Он-чейн: `3Jf995…` = 21 021 000 сат, трат 0, пополнения — только 2020 год (03.01 и 19.06). Ни возврата приза, ни новой стадии автора нет → §5 не выполняется. Нужен физический факт (какие 3 из 210 книг), перебором не берётся.\n"
        "- Источник: https://blockstream.info/address/3Jf995GANG4EmFBK89byNNyZdtB3ELXJsZ (проверено 19.10.2026)\n"
        "- Проверено: да\n"
        "- Влияние на оценку: цель — сторож; рабочей оси нет.\n"
        "- Подробности и хроника: см. LOG.md\n",
    os.path.join(M, "solved", "caesarcoder-genesis-block-wallet-puzzle-947ksats", "README.md"):
        "## Уточнение (2026-10-19, Qoder): bc1qw8… = кошелёк автора, не приз\n"
        "- Тип: баланс / классификация (not-ours)\n"
        "- Суть: `bc1qw8uecdjvuedtkg4s2kku4s2ak9r2cm59khclfr` (1 000 000 сат, funded 2026-08-21) пополнен tx `e2cbb236…`: вход с `bc1q0x054…`, сдача 62 970 на `bc1q7nn9…`, который в `data/ocp/data/on-chain-dialogue.json` — **change-адрес автора**. OP_RETURN нет. Эскроу приза `bc1qfkhx02…` пуст (947 620 = spent). Поэтому папка **остаётся в `solved/`** — «приз пополнили» не подтверждается.\n"
        "- Источник: https://blockstream.info/tx/e2cbb23690c3c1f8a294c7e4747cf62f374cddf06bdec1beeff39e12d2a0c5d2 ; `data/ocp/data/on-chain-dialogue.json`\n"
        "- Проверено: да (19.10.2026, read-only)\n"
        "- Влияние на оценку: цель не открывается заново; 0,01 BTC — чужие средства автора.\n"
        "- Подробности и хроника: см. LOG.md\n",
    os.path.join(M, "solved", "luckylurker-seed-riddles-80ksats", "README.md"):
        "## Уточнение (2026-10-19, Qoder): 79 638 сат на 17oKQH… — кошелёк решателя\n"
        "- Тип: баланс / классификация (not-ours)\n"
        "- Суть: приз `bc1q32e3dxcd…` полностью потрачен (funded = spent = 80 000). Свип 17.08.2026 (tx `75e570a5…`) вывел 79 638 сат на `17oKQHHRxdQBiRaGKCoVDQJfebhPaZV3r7`. Это адрес **получателя**, т.е. деньги решателя серии LuckyLurker; в `puzzles/` папку не возвращаем.\n"
        "- Источник: https://blockstream.info/address/bc1q32e3dxcd0n2tlzdmchraf2057d0ax4xdwrk3jq\n"
        "- Проверено: да (19.10.2026, read-only)\n"
        "- Влияние на оценку: цель закрыта; в `puzzles/dead-ends-registry/` добавлена строка `not-ours`.\n"
        "- Подробности и хроника: см. LOG.md\n",
}
for p, block in CORR.items():
    print(append(p, block, "(2026-10-19, Qoder)"))

# ---------------------------------------------------------------- 4. dead-ends-registry
REG = (
    "## Живые балансы, которые нам не принадлежат (2026-10-19, Qoder)\n"
    "Снимок blockstream.info от 19.10.2026. Код причины — `not-ours`: деньги на адресе третьей стороны "
    "(кошелёк решателя, change автора, hot wallet). Их нельзя «взять» решением пазла: пазл уже закрыт, "
    "а ключ к этим адресам нам неизвестен и знать его мы не вправе. Попытка свипа = трата чужих монет; "
    "правила №5/№6 `AGENT_INSTRUCTIONS.md` (никаких трансляций, ключи только от Ильи) здесь даже не начинаются.\n"
    "\n"
    "| Адрес | Сат | Чей это деньги | Доказательство |\n"
    "|---|---|---|---|\n"
    "| `17oKQHHRxdQBiRaGKCoVDQJfebhPaZV3r7` | 79 638 | кошелёк решателя LuckyLurker (получатель свипа) | `bc1q32e3…` funded = spent = 80 000; tx `75e570a5…`, 17.08.2026 |\n"
    "| `bc1qw8uecdjvuedtkg4s2kku4s2ak9r2cm59khclfr` | 1 000 000 | кошелёк автора CaesarCoder (не приз) | tx `e2cbb236…` блок 963509: вход `bc1q0x054…`, сдача на change автора `bc1q7nn9…` |\n"
    "| `36T9H8hJP7xexevqayU9ADxGca7Y5dKquQ` | 99 996 681 | получатель свопа Natasha Otomoski в 2019, личность не установлена | адрес пазла `179sxfh…` funded = spent = 100 000 078; tx `b01af713…`, блок 591125 |\n"
    "| `1HB5XMLmzFVj8ALj6mfBsbifRoD4miY36v` | 20 148 071 | hot wallet сервиса (26 тыс. tx), не объект охоты | тривиум-досье + он-чейн история адреса |\n"
    "| `1AndrewYangForPresident2o2ozm6Pzd` | 155 400 | vanity/burn-адрес кампании | досье satoshi-birthday-7-million-quiz |\n"
    "\n"
    "Живые **призы** открытых или отложенных конкурсов (ключа к ним у нас нет, но это и не чужие кошельки): "
    "`157dpLJ…` 1 BTC (ONFO, dead-end), `3Jf995…` 0,21021 BTC (Licorne, физический ключ), "
    "`bc1qnepv…` 1 BTC (LuckyLurker Vault #2, отложен автором). По ним работа = сторож, не прогон.\n"
)
print(append(os.path.join(M, "puzzles", "dead-ends-registry", "README.md"), REG,
             "не принадлежат (2026-10-19, Qoder)"))
print("готово")
