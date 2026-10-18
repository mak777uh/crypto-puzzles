# -*- coding: utf-8 -*-
"""Восстановление записей LOG, снятых гонкой записи (18.10, агент OCP Sync).

Ситуация: записи раскладки/закрытия OCP Sync пропадали из трёх LOG-файлов — сначала их
смыл параллельный «reformat» (~13:05–13:12), затем версия с дубль-хвостом вернулась в
файл поверх нашей повторной вставки (~13:31, эффект отложенной записи: кто-то писал
файл из устаревшего in-memory снимка).

Метод (детерминированный, ничего не выдумывает): тело файла = версия из HEAD
(коммит b08eab8: уже очищена tools/log_dedup.py от дублей) + наша запись снизу.
Перед записью сверяется, что в текущей рабочей копии нет чужих новых уникальных
строк (иначе — стоп, чтобы не затереть чужую работу).

Запуск: python tools/_oneoff_log_reappend_2026-10-18.py [--check]
"""
import os
import re
import subprocess
import sys

M = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

GENESIS = """
## 2026-10-18, 10:05 (повторно 13:4x) — OCP Sync (Qoder Desktop, Windows) <!-- ocp-snapshot:19644e58 -->
- Делал: закрытие пазла по снапшоту OCP `19644e58`. Запись пишется вторично: первая версия
  (10:05) и служебная раскладка были сняты параллельным проходом ~13:12, который переписал этот
  LOG и `MASTER_CATALOG.md`; артефакты `data/ocp/`, `tools/ocp/`, `SOURCE.md` и «Обновление» в
  `README.md` уцелели.
- Результат: **ПАЗЛ РЕШЁН И СВИПНУТ ТРЕТЬЕЙ СТОРОНОЙ**. Свип 2026-10-17 03:40:20 UTC, блок
  971803, tx `1c70c4745fad5bf891b9ee2a9f8b0b5cd3f328eb847eb09c9bebb92f5f7e900b`, нетто 935 266
  сат на `bc1qdu8mh9qjtjhy89mvhmcgf66ul6ld92rdr6qzad`. Наш собственный on-chain-вист 18.10
  (mempool.space address API): funded 120 выходов / 947 620 сат, spent 120 / 947 620 → **баланс 0**.
  Расхождение «947 220» (наши записи 17.10 по blockstream) и «947 620» (OCP + наша проверка 18.10)
  примирено: 947 220 — сумма по старому учёту выходов эскроу, 947 620 — полный funded-объём.
- Механика решения (PR #44, решатель Schum-io, автор решения CaesarCoder): entropy = первые
  128 бит `sha256(raw hex genesis-блока, байты 263…400)` → 12 слов BIP39 → пассфраза
  «Satoshi Nakamoto» → BIP48 `m/48'/0'/1231006505'/2'/0/0`; **PBKDF2-HMAC-SHA512 rounds = 181505**
  (соавтор A, fingerprint `0852014c` ≈ 18:15:05) и **200913** (соавтор B, `040e2791` ≈ 2009-01-03)
  вместо канонических 2048. Post-sweep OP_RETURN автора: «My GPU searched everywhere except the
  PBKDF2 settings».
- Отрицательный результат (наш) и его причина: 78 347 016 кандидатов + ~175 тыс. прогонов
  оракула — все при зафиксированном rounds=2048, решётка не покрывала реальное пространство;
  постфактум это объясняет и «ppZ-парадокс» (сдвиг хеша оракула между прогонами автора = смена
  настроек KDF, а не ошибка модели среза).
- Артефакты: `tools/ocp/verify_solution.py`, `tools/ocp/REPRODUCE.md`,
  `data/ocp/data/on-chain-dialogue.json` (123 tx), `data/ocp/clues/author-posts.md`,
  `data/ocp/analysis/2026-09-05/*.json`, provenance `SOURCE.md`. Сид и фраза здесь не
  дублируются (материал ключей опубликован решателем после свипа; указатель — `data/ocp/puzzle.json`
  → `solutions[0].answer`, `key_material_disclosed: true`).
- Ссылки/доказательства: https://github.com/floflo777/open-crypto-puzzles/tree/19644e58/puzzles/4-solved/caesarcoder-genesis-block-wallet-puzzle-947ksats ;
  https://mempool.space/api/address/bc1qfkhx02v89u2qyyyljeczw6hu9sr437y44t7ae5yf09thrdukfqesnjg2wj ;
  отчёт прохода `reports/2026-10-18_1000_OCP_Sync_ocp-full-sync.md`.
- Следующим агентам: папка закрыта, работу не возобновлять; перенос сделан `git mv` из
  `puzzles/genesis-block-wallet-puzzle-142ksats` (вся наша работа, включая `data/calib*.mjs`, сохранена).
"""

ARWEAVE11 = """
## 2026-10-18, 10:05 (повторно 13:4x) — OCP Sync (Qoder Desktop, Windows) <!-- ocp-snapshot:19644e58 -->
- Делал: раскладка дельт снапшота OCP `19644e58` (17 файлов в `data/ocp/`, 10 в `tools/ocp/`,
  тяжёлое — ссылкой `data/ocp/_HEAVY.md`, provenance в `SOURCE.md`). Запись повторена: первая
  версия была снята параллельным проходом ~13:12, переписавшим хвост LOG с дефектами генерации
  (одна строка повторялась 3–25 раз в разных оформлениях); дубли склеены `tools/log_dedup.py`,
  потеря HEAD-строк — 0 (проверено по нормализованным множествам).
- Результат: негатив-реестры B1–B16 (~330 млн проверок), witnessed H1–H4, `genesis28-results.json`,
  `geometry.json`, задокументированный баг их оракула — в базе с provenance. Статусного
  расхождения нет (у OCP тоже `open`). Прогонов не запускали.
- Артефакты: `data/ocp/**`, `tools/ocp/**` этой папки; `_sources/ocp_sync_2026-10-18/delta_report.md`.
- Ссылки/доказательства: https://github.com/floflo777/open-crypto-puzzles/tree/19644e58
"""

CP2018 = """
## 2026-10-18, 10:05 (повторно 13:4x) — OCP Sync (Qoder Desktop, Windows) <!-- ocp-snapshot:19644e58 -->
- Делал: раскладка дельт снапшота OCP `19644e58` (5 файлов в `data/ocp/`, provenance `SOURCE.md`);
  запись повторена после того, как параллельный проход ~13:12 перезаписал хвост LOG с
  дубль-дефектами (склеено `tools/log_dedup.py`, потеря HEAD-строк — 0).
- Результат: по этому пазлу OCP даёт материалы и разборы, фактических новинок против нашей базы
  нет; статус совпадает (`open`, 0,05 ETH на `0x1fa8Be9De5bBFE047C72dB8E8E3257128F7661ad`).
  Прогонов не запускали.
- Артефакты: `data/ocp/**` этой папки; `_sources/ocp_sync_2026-10-18/delta_report.md`.
- Ссылки/доказательства: https://github.com/floflo777/open-crypto-puzzles/tree/19644e58
"""

TARGETS = [
    ("solved/caesarcoder-genesis-block-wallet-puzzle-947ksats/LOG.md", "HEAD:solved/caesarcoder-genesis-block-wallet-puzzle-947ksats/LOG.md", GENESIS),
    ("puzzles/arweave-puzzle-11-1eth/LOG.md", "HEAD:puzzles/arweave-puzzle-11-1eth/LOG.md", ARWEAVE11),
    ("puzzles/crypto-puzzles-2018-puzzle-2-0-05eth/LOG.md", "HEAD:puzzles/crypto-puzzles-2018-puzzle-2-0-05eth/LOG.md", CP2018),
]


def head_text(spec):
    """Raw-байты версии из HEAD (через cat-file, без autocrlf-smudge, который `git show` добавляет CR)."""
    r = subprocess.run(["git", "-C", M, "rev-parse", spec], capture_output=True, text=True)
    if r.returncode:
        raise SystemExit("не могу найти %s" % spec)
    r = subprocess.run(["git", "-C", M, "cat-file", "blob", r.stdout.strip()], capture_output=True)
    return r.stdout.decode("utf-8", "replace")


def main():
    check = "--check" in sys.argv
    for rel, spec, entry in TARGETS:
        p = os.path.join(M, rel)
        cur = open(p, encoding="utf-8", newline="").read()
        base = head_text(spec)
        if "<!-- ocp-snapshot:19644e58 -->" in cur and entry.splitlines()[1][:40] in cur:
            print(rel, ": запись уже на месте — пропуск")
            continue
        # защита: в рабочей копии не должно быть чужих уникальных строк сверх HEAD-множества
        bare = re.compile(r"^[\s\-\*#>]+")
        head_lines = set(l.strip() for l in base.splitlines() if l.strip())
        head_norm = set(bare.sub("", l).strip() for l in base.splitlines() if l.strip())
        extra = [l for l in cur.splitlines() if l.strip() and l.strip() not in head_lines
                 and bare.sub("", l).strip() not in head_norm
                 and "ocp-snapshot:19644e58" not in l]
        n_head = sum(1 for l in head_lines if l.startswith("## ") and l in cur)
        crlf = base.count("\r\n") > base.count("\n") / 2
        new_entry = entry.strip("\n").replace("\n", "\r\n" if crlf else "\n") + ("\r\n" if crlf else "\n")
        rebuilt = base.rstrip("\r\n") + ("\r\n\r\n" if crlf else "\n\n") + new_entry
        print("%s: чужих новых строк %d | HEAD-заголовков в копии %d | записи %d -> %d строк" % (
            rel, len(extra), n_head, cur.count("\n"), rebuilt.count("\n")))
        for l in extra[:6]:
            print("    чужая:", l[:120])
        if extra:
            print("    СТОП: в файле есть строки, которых нет в HEAD — не перезаписываем, "
                  "добавляем запись снизу к текущему содержимому")
            rebuilt = cur.rstrip("\r\n") + ("\r\n\r\n" if crlf else "\n\n") + new_entry
        if check:
            continue
        tmp = p + ".tmp"
        open(tmp, "w", encoding="utf-8", newline="").write(rebuilt)
        os.replace(tmp, p)
        back = open(p, encoding="utf-8", newline="").read()
        print("    записано, маркер присутствует:", "<!-- ocp-snapshot:19644e58 -->" in back)


if __name__ == "__main__":
    main()
