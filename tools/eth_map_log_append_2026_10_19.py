"""Атомарные дописи результатов ETH-сверки 19.10.2026 14:32 UTC (Qoder).

Идемпотентно: если маркер уже в файле — пропускаем. Каждая допись только констатирует
он-чейн показания и классификацию адресов; транзакций нет, чужие средства не трогаются.
Общий файл (WAKE_QUEUE) перечитывается перед каждой записью — параллельные агенты.
"""

import io
import os
import tempfile
from pathlib import Path

MASTER = Path(r"C:\Users\Admin\OneDrive\Desktop\master")
MARK = "[2026-10-19 14:32Z] Qoder — независимая ETH он-чейн сверка"

DOC = "reports/2026-10-19_1430_Qoder_eth-live-map-verified.md"

ENTRIES = {
    "puzzles/guntis-vitolins-metamask-8-6eth/LOG.md": (
        "- " + MARK + ". Эскроу `0x9C2F44EFAd0c1E852a09dF9939e6DaF061140CaF` проверен напрямую "
        "с этой машины (JSON-RPC publicnode/1rpc, block 26 227 181): **8.612542 ETH ≈ $20 629** "
        "(ETH $2 395.21) — живой, соответствует ожидаемым 8.61. Признан крупнейшим живым ETH-призом "
        "базы (68 % всей живой эфирной суммы CPU-исчерпанных пазлов). Статус работы не меняется: "
        "CPU-оси закрыты негативом, GPU-оси — только с ОК Ильи. "
        "Отдельно: `0xE708D14…`/`0x861EbCC…`/`0xaAd9A1c…` (0.2218/0.0965/0.0194 ETH) из зеркала "
        "noobsilence — **DRAIN_DEST/attacker кошельки адрес-пойзинг-кампании**, к призу отношения не "
        "имеют, взаимодействие с ними запрещено. См. [" + DOC + "](" + DOC + ")."),
    "puzzles/teikhos-bipedaljoe-solver-bounties-2eth/LOG.md": (
        "- " + MARK + ". Показания 19.10 совпали с проверкой Hark 16.08 до микросат: C1 "
        "`0x17E5E091…` 1.000002 ETH, C2 `0xD7C6D542…` 0.500002, 9732 `0x973C2178…` 0.500002, "
        "AEC7 `0xAEC7E8C2…` 1.000012 (пути выплаты нет). Итого 2.000006 ETH атакуемых + 1.000012 "
        "«мёртвых» в AEC7 — пазл жив, не снят. Блокер прежний: целевые pubkey не появлялись on-chain. "
        "Важно: `0x83e4b2a5…` (0.00024 ETH) — **личный кошелёк куратора Hark**, не цель; "
        "`0x4c5D24A7…` 0.015394 — creator-адрес, `0x9c739dfa…` 0.010421 — сторонний решатель."),
    "puzzles/fe-lang-bountiful-compiler-bounty-1eth/LOG.md": (
        "- " + MARK + ". BountyRegistry round 3 `0x71fB6AfcD98c5BD611712ad4b8D314EF729aa69D` — "
        "**1.000000 ETH**, контракт с кодом; на контрактах игр 0 ETH (приз держит реестр) — подтверждено "
        "напрямую. `0xaD0Ad88D…` 2.001812 ETH — EOA-деплойер (админ), **не приз**. Механика требует "
        "депозита 0.01 ETH и газа от решателя: это трата → только с письменного ОК Ильи, до него пазл "
        "остаётся в мониторинге."),
    "puzzles/arweave-puzzle-11-1eth/LOG.md": (
        "- " + MARK + ". Target `0xFF2142E98E09b5344994f9beb9c56c95506b9f17` — **1.000000 ETH, nonce 0** "
        "(прямой JSON-RPC запрос 19.10, сверено publicnode + 1rpc) — баунти не востребован и не тронут; "
        "наше наблюдение 18.10 13:46Z подтверждено вторично. Единственный крупный ETH-приз базы в "
        "CPU-классе (64-hex ключ в PNG), но **сертифицированного оракула нет** → по правилу каталога "
        "никакой «попыткой» это не оформляется, только находка, пригодная к точной проверке."),
    "puzzles/crypto-puzzles-2018-puzzle-2-0-05eth/LOG.md": (
        "- " + MARK + ". Таргет `0x1FA8BE9De5bBFE047C72dB8E8E3257128F7661ad` = **0.050000 ETH** — "
        "ровно номинал, приз жив (прямой JSON-RPC, 19.10). `0x0a937ec9…` 0.076799 ETH — funder-кошелёк "
        "автора, не цель."),
    "puzzles/timeless-1000-random-seed-puzzle-0-062eth/LOG.md": (
        "- " + MARK + ". Подтверждено он-чейн с этой машины: приз снят — адрес приза не даёт показаний, "
        "а **0.309740 ETH у `0xcaD621da…` — KuCoin Hot Wallet** из дампа `data/04_transactions.json`, "
        "к пазлу не относится. Досье остаётся кандидатом на перенос в `solved/` (уже отмечено 17.10); "
        "перенос — по правилам при ближайшей ревизии, брони не держим."),
    "puzzles/gsmg-io-5btc-puzzle/LOG.md": (
        "- " + MARK + ". Служебно: `0x5D801b2B0B216790A49898b322246282547b546b` (0.003773 ETH) — "
        "владелец земли Decentraland из нашего же материала, к призу отношения не имеет (приз GSMG — в "
        "BTC, `1GSMG1JC…`, 125.6M сат). Броней Qoder по GSMG нет, работа не ведётся."),
    "puzzles/1000-btc-challenge-bitcoin-puzzle-tx/LOG.md": (
        "- " + MARK + ". Служебно-отрицательное: `0xd28082cd48e1b279425346e8f6c651c45a9023c5` "
        "(0.200000 ETH) встречался только как пример в README `bitcrack` в нашем зеркале — **не ETH-приз "
        "серии**; исключён из денежной карты, чтобы дежурные циклы не считали его целью."),
    "puzzles/dead-ends-registry/LOG.md": (
        "- " + MARK + ". Закрыт методический пробел: публичные ETH JSON-RPC (publicnode, 1rpc.io/eth) "
        "работают с этого хоста → эфирные призы проверяются самостоятельно, без Etherscan. Первая "
        "полная карта: 62 адреса из текстов `puzzles/`, 36 пустых, призовых 13.66256 ETH (без «мёртвого» "
        "AEC7 — 12.662548). **Ложные срабатывания текстового поиска (2.9559 ETH) классифицированы как "
        "NOT_PRIZE и занесены в «не трогать»**: деплойер Fe-реестра 2.0018, KuCoin hot wallet 0.3097, "
        "дроп-кошельки адрес-пойзинг-кампании 0.3377, bitcrack-пример 0.2, funder/creator/решатель "
        "0.1026, Decentraland-владелец 0.0038, личный кошелёк Hark 0.00024. Вывод правила: **сумма "
        "адресов из текста досье ≠ сумма призов**; атрибуция обязательна по строке собственного досье "
        "(см. `tools/eth_prize_classify_2026_10_19.py`)."),
}

WAKE = (
    "\n## 2026-10-19 14:32 UTC — Qoder (ETH он-чейн карта всей папки, первая независимая)\n"
    "- Инструментальный факт: ETH JSON-RPC доступен с этого хоста (`ethereum-rpc.publicnode.com`, "
    "`1rpc.io/eth`); Etherscan не нужен. Курс — CoinGecko.\n"
    "- Прогон: 62 ETH-адреса из текстов `puzzles/`, 36 пусты. Живые **призовые**: 13.66256 ETH ≈ $32 725 "
    "(Guntis 8.6125 · Teikhos C1/AEC7/C2/9732 = 2.0000+1.0000 · Fe-реестр 1.0 · Arweave #11 1.0 · "
    "Crypto-Puzzles 2018 #2 0.05).\n"
    "- Классифицированы как NOT_PRIZE (чужие средства, 2.9559 ETH, трогать нельзя): Fe-деплойер 2.0018, "
    "KuCoin hot wallet 0.3097, дропы адрес-пойзинг-кампании 0.3377, bitcrack-пример 0.2, "
    "funder/creator/сторонний решатель 0.1026, Decentraland-владелец 0.0038, **личный кошелёк Hark** "
    "0.00024. Правило: сумма адресов из текста ≠ сумма призов.\n"
    "- Он-чейн статус Teikhos (4 контракта держат средства) и Arweave #11 (nonce 0) подтверждён вторично; "
    "`timeless` подтверждён мёртвым — кандидат в `solved/`.\n"
    "- Действий нет: транзакций, покупок, писем и публикаций не делал; Fe-пазл требует депозита+газа → "
    "только по ОК Ильи. Документ: `reports/2026-10-19_1430_Qoder_eth-live-map-verified.md`, "
    "`reports/data_eth_prize_verified_2026-10-19.json`. Бронь claims: не держу.\n"
)


def atomic_write(path, data):
    fd, tmp = tempfile.mkstemp(dir=str(path.parent), suffix=".tmp")
    with os.fdopen(fd, "w", encoding="utf-8", newline="") as fh:
        fh.write(data)
        fh.flush()
        os.fsync(fh.fileno())
    os.replace(tmp, path)


def read(path):
    for _ in range(5):
        try:
            return io.open(path, encoding="utf-8", newline="").read()
        except FileNotFoundError:
            import time
            time.sleep(0.6)
    raise FileNotFoundError(str(path))


done, skipped = [], []
for rel, line in ENTRIES.items():
    p = MASTER / Path(rel.replace("/", "\\"))
    txt = read(p)
    if MARK in txt:
        skipped.append(rel)
        continue
    if not txt.endswith("\n"):
        txt += "\n"
    atomic_write(p, txt + line + "\n")
    done.append(rel)

wq = MASTER / "WAKE_QUEUE.md"
txt = read(wq)
if "14:32 UTC — Qoder (ETH он-чейн карта" in txt:
    skipped.append("WAKE_QUEUE.md")
else:
    atomic_write(wq, txt.rstrip("\n") + "\n" + WAKE)
    done.append("WAKE_QUEUE.md")

print("дописано:", len(done))
for d in done:
    print("  +", d)
print("пропущено (уже есть):", skipped)
for rel in list(ENTRIES) + ["WAKE_QUEUE.md"]:
    p = MASTER / Path(rel.replace("/", "\\"))
    n = MARK if "WAKE" not in rel else "14:32 UTC — Qoder (ETH он-чейн карта"
    print(" проверка", rel, "->", n in read(p), os.path.getsize(p))
