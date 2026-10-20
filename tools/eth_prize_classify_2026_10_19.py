"""Этап: верификация ETH-карты 19.10 (Qoder, 14:30 UTC).

Сырой срез `reports/data_eth_live_2026-10-19.json` (62 адреса из текста досье)
даёт ложные срабатывания: в README/LOG/зеркалах OCP упоминаются кошельки-фейки
(админ-адреса, биржевые горячие кошельки, дроп-кошельки фишинг-кампании).
Здесь каждый адрес отнесён к одному классу вручную, со ссылкой на собственное
досье; на выходе — признанный призовой суммарный баланс.

Классы:
  PRIZE   — эскроу/таргет приза, назван в собственном досье как адрес приза
  NOT_PRIZE — чужой кошелек, случайно попавший в текст (трогать нельзя)
"""

import io
import json
import os
import tempfile
from pathlib import Path

MASTER = Path(r"C:\Users\Admin\OneDrive\Desktop\master")
RAW = MASTER / "reports" / "data_eth_live_2026-10-19.json"
OUT = MASTER / "reports" / "data_eth_prize_verified_2026-10-19.json"

# адрес -> (класс, приз-пазл, роль, ссылка-доказательство из собственного досье)
CLS = {
    "0x9c2f44efad0c1e852a09df9939e6daf061140caf": (
        "PRIZE", "guntis-vitolins-metamask-8-6eth", "Escrow приза 10 ETH (факт 8,61)",
        "puzzles/guntis-vitolins-metamask-8-6eth/data/00_README.md:22"),
    "0x17e5e0910b9185b0ede564dcbf074ca910ad56a4": (
        "PRIZE", "teikhos-bipedaljoe-solver-bounties-2eth", "Контракт C1",
        "puzzles/teikhos-bipedaljoe-solver-bounties-2eth/README.md:18"),
    "0xaec7e8c221c3fd24e75c996e32289235fd899ebf": (
        "PRIZE", "teikhos-bipedaljoe-solver-bounties-2eth", "Контракт AEC7: средства есть, пути выплаты нет",
        "puzzles/teikhos-bipedaljoe-solver-bounties-2eth/README.md:21"),
    "0xd7c6d542f3dcdceda845112b8fd567b8f8655805": (
        "PRIZE", "teikhos-bipedaljoe-solver-bounties-2eth", "Контракт C2",
        "puzzles/teikhos-bipedaljoe-solver-bounties-2eth/README.md:19"),
    "0x973c2178b09225d1de3ab037d40b3f24af696255": (
        "PRIZE", "teikhos-bipedaljoe-solver-bounties-2eth", "Контракт 9732",
        "puzzles/teikhos-bipedaljoe-solver-bounties-2eth/README.md:20"),
    "0x71fb6afcd98c5bd611712ad4b8d314ef729aa69d": (
        "PRIZE", "fe-lang-bountiful-compiler-bounty-1eth", "BountyRegistry round 3 (приз держит он, не игры)",
        "puzzles/fe-lang-bountiful-compiler-bounty-1eth/README.md:16"),
    "0xff2142e98e09b5344994f9beb9c56c95506b9f17": (
        "PRIZE", "arweave-puzzle-11-1eth", "Target-адрес бан티 1 ETH, nonce 0",
        "puzzles/arweave-puzzle-11-1eth/README.md:16"),
    "0x1fa8be9de5bbfe047c72db8e8e3257128f7661ad": (
        "PRIZE", "crypto-puzzles-2018-puzzle-2-0-05eth", "Таргет 0,05 ETH",
        "puzzles/crypto-puzzles-2018-puzzle-2-0-05eth/data/ocp/puzzle.json:28"),
    # ---- не призы: чужие деньги, любые действия запрещены ----
    "0xad0ad88d27f49fe6a0c73fdb743f6b7304a2c357": (
        "NOT_PRIZE", "fe-lang-bountiful-compiler-bounty-1eth", "EOA-деплойер реестра (админ), 2,0018 ETH",
        "puzzles/fe-lang-bountiful-compiler-bounty-1eth/data/ocp/README.md:116"),
    "0xcad621da75a66c7a8f4ff86d30a2bf981bfc8fdd": (
        "NOT_PRIZE", "timeless-1000-random-seed-puzzle-0-062eth", "KuCoin Hot Wallet из дампа транзакций",
        "puzzles/timeless-1000-random-seed-puzzle-0-062eth/data/04_transactions.json"),
    "0xe708d1496ee95435ea50f3e4bc79c28a5f8fe859": (
        "NOT_PRIZE", "guntis-vitolins-metamask-8-6eth", "DRAIN_DEST_3 — кошелёк фишинг-кампании",
        "puzzles/guntis-vitolins-metamask-8-6eth/data/github/noobsilence__crypto-puzzle-lab/files/scripts/ens_forensics.py:17"),
    "0x861ebcc056e0645cf7ba7f5bb528fae9fba8ba55": (
        "NOT_PRIZE", "guntis-vitolins-metamask-8-6eth", "Attacker wallet кампании 25.08 (address poisoning)",
        "puzzles/guntis-vitolins-metamask-8-6eth/data/github/noobsilence__crypto-puzzle-lab/files/cases/address-poisoning-2026.md:97"),
    "0xaad9a1c75946d3db263141659a6111b6de1f57c6": (
        "NOT_PRIZE", "guntis-vitolins-metamask-8-6eth", "DRAIN_DEST_4 — кошелёк фишинг-кампании",
        "puzzles/guntis-vitolins-metamask-8-6eth/data/github/noobsilence__crypto-puzzle-lab/files/scripts/ens_forensics.py:18"),
    "0x0a937ec94abc55d92f5740a988a122ebdcab2e15": (
        "NOT_PRIZE", "crypto-puzzles-2018-puzzle-2-0-05eth", "funder-кошелёк автора",
        "puzzles/crypto-puzzles-2018-puzzle-2-0-05eth/data/ocp/README.md:57"),
    "0x4c5d24a7ca972aea90cc040da6770a13fc7d4d9a": (
        "NOT_PRIZE", "teikhos-bipedaljoe-solver-bounties-2eth", "creator-адрес 5 контрактов",
        "puzzles/teikhos-bipedaljoe-solver-bounties-2eth/data/ocp/README.md:43"),
    "0x9c739dfa1674eae112dcdfb163653cf20d9d2070": (
        "NOT_PRIZE", "teikhos-bipedaljoe-solver-bounties-2eth", "сторонний решатель (автономная попытка 735B)",
        "puzzles/teikhos-bipedaljoe-solver-bounties-2eth/data/ocp/README.md:128"),
    "0x5d801b2b0b216790a49898b322246282547b546b": (
        "NOT_PRIZE", "gsmg-io-5btc-puzzle", "владелец земли Decentraland (приз GSMG — в BTC)",
        "puzzles/gsmg-io-5btc-puzzle/data/decentraland_2026-10-18/scene.json:10"),
    "0x83e4b2a5a464bdfcd83057ac08447f533a595156": (
        "NOT_PRIZE", "teikhos-bipedaljoe-solver-bounties-2eth", "ЛИЧНЫЙ кошелёк куратора Hark (выплата 735B) — не трогать",
        "puzzles/teikhos-bipedaljoe-solver-bounties-2eth/README.md:22"),
    "0xd28082cd48e1b279425346e8f6c651c45a9023c5": (
        "NOT_PRIZE", "1000-btc-challenge-bitcoin-puzzle-tx", "пример/донат-адрес из README bitcrack, к пазлу отношения не имеет",
        "puzzles/1000-btc-challenge-bitcoin-puzzle-tx/data/github/brichard19__bitcrack/files/README.md"),
}


def atomic_write(path, data):
    fd, tmp = tempfile.mkstemp(dir=str(path.parent), suffix=".tmp")
    with os.fdopen(fd, "w", encoding="utf-8", newline="") as fh:
        fh.write(data)
        fh.flush()
        os.fsync(fh.fileno())
    os.replace(tmp, path)


raw = json.load(io.open(RAW, encoding="utf-8"))
rows = {r["address"].lower(): r for r in raw["rows"]}
price = (raw.get("price_usd") or {}).get("ethereum") or 0.0

prize, other, unknown = [], [], []
for addr, r in rows.items():
    if r["eth"] <= 1e-9:
        continue
    c = CLS.get(addr)
    item = {
        "address": addr,
        "eth": r["eth"],
        "usd": round(r["eth"] * price, 2) if price else None,
        "contract": r.get("contract"),
        "puzzle": c[1] if c else "?",
        "role": c[2] if c else "НЕ КЛАССИФИЦИРОВАН",
        "evidence": c[3] if c else "",
    }
    (prize if c and c[0] == "PRIZE" else other if c else unknown).append(item)

prize.sort(key=lambda x: -x["eth"])
other.sort(key=lambda x: -x["eth"])
s_prize = round(sum(x["eth"] for x in prize), 6)
s_other = round(sum(x["eth"] for x in other), 6)
s_unknown = round(sum(x["eth"] for x in unknown), 6)

out = {
    "checked_utc": "2026-10-19T14:30Z",
    "block": raw.get("block"),
    "price_usd_eth": price,
    "rpc": ["https://ethereum-rpc.publicnode.com", "https://1rpc.io/eth"],
    "source_snapshot": "reports/data_eth_live_2026-10-19.json",
    "note": ("PRIZE = адрес назван призом в собственном досье; NOT_PRIZE = чужие средства "
             "(админы, биржи, фишинг-дропы, кошельки других решателей) — доступ запрещён; "
             "unknown требует разбора."),
    "total_prize_eth": s_prize,
    "total_prize_usd": round(s_prize * price, 2) if price else None,
    "total_not_prize_eth": s_other,
    "total_unknown_eth": s_unknown,
    "prize": prize,
    "not_prize": other,
    "unknown": unknown,
    "zero_balance_count": sum(1 for r in rows.values() if r["eth"] <= 1e-9),
}
atomic_write(OUT, json.dumps(out, ensure_ascii=False, indent=1))

print("призовых адресов:", len(prize), "=", s_prize, "ETH ~$", out["total_prize_usd"])
for x in prize:
    print("  ", x["eth"], x["puzzle"], "|", x["role"][:70])
print("не-призы (чужие средства):", len(other), "=", s_other, "ETH")
print("неклассифицировано:", len(unknown), "=", s_unknown, "ETH")
for x in unknown:
    print("   ?", x["eth"], x["address"], x["puzzles"] if "puzzles" in x else "")
print("пустых:", out["zero_balance_count"], "| файл:", OUT.name)
