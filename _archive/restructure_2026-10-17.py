#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
restructure_master.py — разовая реструктуризация master/ (задание от 17.10.2026):
  1) solved/: перенос 52 решённых/закрытых/тупиковых папок + INDEX.md
  2) claims/, reports/, agents/, _archive/ + новые README
  3) разгрузка WAKE_QUEUE.md (журнал → _archive), правила отчётов
  4) починка перекрёстных ссылок, обновление индексов и инструкций
Запуск:  python restructure_master.py
Идемпотентность: повторный запуск пропускает уже сделанное (папки, пометки, патчи не дублируются).
"""

import os
import re
import shutil
import sys

MASTER = r"C:\Users\Admin\OneDrive\Desktop\master"
PUZZLES = os.path.join(MASTER, "puzzles")
SOLVED = os.path.join(MASTER, "solved")
ARCHIVE = os.path.join(MASTER, "_archive")
CLAIMS = os.path.join(MASTER, "claims")
REPORTS = os.path.join(MASTER, "reports")
AGENTS = os.path.join(MASTER, "agents")

CLAIMS_PY_SRC = os.path.join(
    r"C:\Users\Admin\AppData\Roaming\AutoClaw-oversea-official\accounts"
    r"\1e46e4703c78a1901a63b118a073e7a50579334c3af8dbd7113c083d67784f1e\projects\Default",
    "claims.py",
)

DATE = "2026-10-17"

# slug → (раздел, причина переноса)
MOVED = {
    # --- Решённые (приз снят) ---
    "80-bit-ktimesg-key-challenge": ("solved", "решён 02.11.2024 (status: Solved)"),
    "andy-bauch-new-money-cog-428ksats": ("solved", "solved — приз снят (OCP)"),
    "bc1q21-timelock-challenge-l5-100ksats": ("solved", "solved — приз снят (OCP)"),
    "bitcoin-movie-enigma-100ksats": ("solved", "solved (rabbidbird; фраза не проходила BIP39-чексумму — потому все sweep с фильтром её отбрасывали)"),
    "coin-artist-torched-h34r7s": ("solved", "claimed 02.2018 (1FLAMEN6, Legend of Satoshi)"),
    "doges-gambit": ("solved", "оба ключа (ETH + DOGE) сняты в 2021, решения опубликованы автором"),
    "dug-student-treasure-hunt-63ksats": ("solved", "solved (наш индекс 1 из 3; остальные сняты третьей стороной за 5 недель до нас)"),
    "ftpk-season-4-166usdc": ("solved", "solved — решён читателем после публикации"),
    "iamabananaamaa-puzzles": ("solved", "solved (agntn)"),
    "keysa-crack-the-seed-369ksats": ("solved", "solved — приз снят"),
    "ledger-donjon-ctf": ("solved", "solved (Scissors Secret Sharing; приз — CTF-очки, не BTC)"),
    "liberte-guidant-le-peuple-2019": ("solved", "решена за 6 дней (2019), seed опубликован"),
    "luckylurker-seed-riddles-80ksats": ("solved", "solved — приз снят"),
    "luckylurker-vault-1-0-0008btc": ("solved", "solved (разминочный пазл серии)"),
    "mini-puzzles-retiredcoder": ("solved", "серия с ключами уже решённых пазлов 1000 BTC Challenge"),
    "natasha-otomoski-1btc": ("solved", "solved (WIF восстановлен, случай закрыт)"),
    "picture-puzzle-1mbtc": ("solved", "claimed через ~5 часов (2013)"),
    "quizchain-series": ("solved", "все блоки сняты, последний — 23.07.2019"),
    "quizchain2-series": ("solved", "все блоки сняты (блок 76 — 17.08.2026)"),
    "grycoin-chain": ("solved", "все блоки claimed; серия закрыта через неделю после старта"),
    "satoshi-birthday-7-million-quiz": ("solved", "solved — приз снят"),
    "trivia-brainwallet-0-04btc": ("solved", "solved (brainwallet.io scrypt)"),
    "veteranhodl-hunting-time-420ksats": ("solved", "solved — решён читателем после публикации"),
    "warpwallet-challenges": ("solved", "4 из 6 решены, 2 истекли; ключи опубликованы"),
    "wonderabbit-prometheus-1msats": ("solved", "solved — приз снят"),
    "wickex-youtube-puzzle": ("solved", "swept через 46 минут"),
    "zden-haluska-lvl5-555ksats": ("solved", "solved — приз снят"),
    # --- Закрытые (истёк / свипнут / завершён) ---
    "a858de45f56d9bc9-reddit": ("closed", "мистерия завершена, не решена"),
    "arweave-puzzle-12-400ar": ("closed", "свипнут, баланс 0 (наша проверка 12.10.2026; agntn: Claimed)"),
    "book-quiz-7-million": ("closed", "дедлайн истёк, приз «ушёл домой»"),
    "cicada-3372": ("closed", "закрыта; предупреждение о скаме"),
    "ftpk-season-2-300usdt": ("closed", "USDT = 0, swept (наша проверка 12.10.2026)"),
    "logicbeach-powerful-moss-0-54eth": ("closed", "контракт пуст, claimed Oct 2026 (наша проверка 12.10.2026)"),
    "oct282011-com": ("closed", "закрыт; объяснения противоречивы"),
    "paradigm-kryptos-ctf-pk1-pk10": ("closed", "программа завершена (Часть 6 каталога)"),
    "phemex-dorian-nakamoto": ("closed", "биржа свипнула 21.03.2020 и сама опубликовала решение; приз не выигран"),
    "proof-of-writing": ("closed", "закрыт в каталоге (Часть 6), деталей нет"),
    "satoshi-maze": ("closed", "алиас phemex-dorian-nakamoto; закрыт 21.03.2020"),
    # --- Dead-end / не-пазлы ---
    "aenigma-shards-nft": ("deadend", "dead-end — нет пути к решению"),
    "bam-askabitcoiner-seed-cipher": ("deadend", "dead-end"),
    "commander-u-puzzle-8-5btc": ("deadend", "dead-end"),
    "demint-bitcoin-evangelism": ("deadend", "dead-end"),
    "game-of-satoshi-season-1": ("deadend", "dead-end"),
    "nist-seeds-bounty-valsorda": ("deadend", "отбраковано нашей проверкой (проект «оычн», 13.10.2026)"),
    "objective-thune-licorne-0-21btc": ("deadend", "dead-end"),
    "onfo-forsyth-1btc": ("deadend", "dead-end"),
    "operation-mindfuck-illuminatus": ("deadend", "культурный контекст, не решаемая загадка"),
    "pindar-van-arman-cryptoartgan-nft": ("deadend", "вероятно мёртв: 0 ETH на адресе; владение NFT не проверено (dead-ends-registry)"),
    "platos-solid": ("deadend", "источников не найдено; рекомендация каталога — исключить"),
    "wares-wallets-solana": ("deadend", "dead-end"),
    "zk-guess-chainhackers-31": ("deadend", "dead-end"),
    "zodomo-11x11-pixel-puzzles-0-05eth": ("deadend", "dead-end"),
}

SECTION_TITLES = {
    "solved": "Решённые — приз снят",
    "closed": "Закрытые — истёк / свипнут / завершён (наш выигрыш не зашёл)",
    "deadend": "Dead-end и не-пазлы — не тратить время",
}
SECTION_NOTES = {
    "solved": "Приз снят (нами или третьей стороной). Работать нечего; папки хранят методику и историю.",
    "closed": "Пазл истёк, свипнут или завершён без нашего выигрыша. Возвращать только при новых данных.",
    "deadend": "Тупик без новой информации, отбраковано проверкой или не пазл вовсе. Не тратить время.",
}

NL = "\r\n"


def read_md(path):
    with open(path, "rb") as f:
        raw = f.read()
    bom = raw.startswith(b"\xef\xbb\xbf")
    return raw.decode("utf-8-sig"), bom


def write_md(path, text, bom):
    with open(path, "wb") as f:
        if bom:
            f.write(b"\xef\xbb\xbf")
        f.write(text.encode("utf-8"))


def log(msg):
    print(msg, flush=True)


def main():
    log("== Реструктуризация master (%s) ==" % DATE)

    # ---------- 0. проверки ----------
    if not os.path.isdir(PUZZLES):
        sys.exit("Не найден puzzles/: %s" % PUZZLES)
    before = set(os.listdir(PUZZLES))
    missing = [s for s in MOVED if s not in before]
    if missing:
        sys.exit("В puzzles/ нет ожидаемых папок: %s" % ", ".join(missing))
    active = sorted(before - set(MOVED))
    log("Папок в puzzles/ до: %d (активных будет %d, переносим %d)" % (len(before), len(active), len(MOVED)))

    # ---------- 1. каркас ----------
    for d in (SOLVED, ARCHIVE, os.path.join(CLAIMS, "_active"), os.path.join(CLAIMS, "_archive"), REPORTS, AGENTS):
        os.makedirs(d, exist_ok=True)
    log("[1] Каркас создан: solved/, _archive/, claims/{_active,_archive}, reports/, agents/")

    # ---------- 2. перенос папок ----------
    moved_n = 0
    for slug in sorted(MOVED):
        src = os.path.join(PUZZLES, slug)
        dst = os.path.join(SOLVED, slug)
        if os.path.isdir(dst):
            log("  пропущен (уже в solved/): %s" % slug)
            continue
        shutil.move(src, dst)
        moved_n += 1
    log("[2] Перенесено папок: %d" % moved_n)

    # ---------- 3. пометка в README перенесённых ----------
    notice = (
        "> **ПЕРЕМЕЩЕНО %s в `master/solved/`** — пазл решён/закрыт/тупиковый, активная работа не ведётся. "
        "Причина: [../INDEX.md](../INDEX.md). Вернуть в `puzzles/` — только при новых данных (правила: `AGENT_INSTRUCTIONS.md`)."
    ) % DATE
    for slug in MOVED:
        rp = os.path.join(SOLVED, slug, "README.md")
        if not os.path.isfile(rp):
            continue
        t, bom = read_md(rp)
        if "ПЕРЕМЕЩЕНО" in t:
            continue
        lines = t.split("\n")
        for i, ln in enumerate(lines):
            if ln.startswith("# "):
                lines.insert(i + 1, notice)
                break
        write_md(rp, "\n".join(lines), bom)
    log("[3] Пометки о переносе добавлены в README перенесённых папок")

    # ---------- 4. починка ссылок ----------
    active_set = set(active)
    moved_set = set(MOVED)
    link_re = re.compile(r"\]\(\.\./([A-Za-z0-9][A-Za-z0-9\-_.]*)/")

    def patch_dir(base, in_solved):
        n = 0
        for dirpath, _dirnames, filenames in os.walk(base):
            for fn in filenames:
                if not fn.lower().endswith(".md"):
                    continue
                p = os.path.join(dirpath, fn)
                t, bom = read_md(p)

                def repl(m):
                    nonlocal n
                    name = m.group(1)
                    if in_solved and name in active_set:
                        n += 1
                        return "](../puzzles/%s/" % name
                    if not in_solved and name in moved_set:
                        n += 1
                        return "](../solved/%s/" % name
                    return m.group(0)

                t2 = link_re.sub(repl, t)
                if t2 != t:
                    write_md(p, t2, bom)
        return n

    n1 = patch_dir(SOLVED, True)
    n2 = patch_dir(PUZZLES, False)
    log("[4] Ссылок починено: в solved/ → puzzles/: %d; в puzzles/ → solved/: %d" % (n1, n2))

    # текстовые пути puzzles/<slug>/ в корневых файлах
    root_files = [os.path.join(MASTER, f) for f in ("MASTER_CATALOG.md", "QUICK_WINS_2026-10-17.md")]
    alt = "|".join(re.escape(s) for s in sorted(moved_set))
    path_re = re.compile(r"puzzles/(%s)(?=[/)\s\"'])" % alt)
    n3 = 0
    for p in root_files:
        if not os.path.isfile(p):
            continue
        t, bom = read_md(p)
        t2, cnt = path_re.subn(lambda m: "solved/" + m.group(1), t)
        if cnt:
            write_md(p, t2, bom)
            n3 += cnt
    log("[4] Текстовых путей puzzles/<slug>/ исправлено в корне: %d" % n3)

    # пометка в Части 6 + навигация в шапке каталога
    mc = os.path.join(MASTER, "MASTER_CATALOG.md")
    t, bom = read_md(mc)
    anchor6 = "# ЧАСТЬ 6: ЗАБРАНЫ / ЗАКРЫТЫ (не тратить время)"
    note6 = (
        anchor6 + NL + NL
        + "> С %s папки решённых/закрытых/тупиковых пазлов физически перенесены в `solved/` "
          "(индекс: `solved/INDEX.md`); пути ниже обновлены." % DATE
    )
    if anchor6 in t and "папки решённых/закрытых/тупиковых пазлов физически перенесены" not in t:
        t = t.replace(anchor6, note6, 1)
    anchor0 = "# Дублирование больших текстов избегаем: детали — в папках пазлов."
    nav = (
        anchor0 + NL
        + "# Навигация (с 17.10.2026): активные пазлы — puzzles/ (индекс puzzles/README.md);" + NL
        + "#   решённые/закрытые/тупиковые — solved/ (индекс solved/INDEX.md), активная работа там не ведётся;" + NL
        + "#   брони пазлов — python tools/claims.py (claims/_active/), отчёты проходов — reports/," + NL
        + "#   реестр агентов — agents/REGISTRY.md."
    )
    if anchor0 in t and "Навигация (с 17.10.2026)" not in t:
        t = t.replace(anchor0, nav, 1)
    write_md(mc, t, bom)
    log("[4] MASTER_CATALOG.md: навигация в шапке + пометка в Части 6")

    # ---------- 5. индекс puzzles/README.md ----------
    pr = os.path.join(PUZZLES, "README.md")
    t, bom = read_md(pr)
    removed = 0
    for slug in MOVED:
        pat = re.compile(r"(?m)^\s*-\s*\[%s\]\(%s/README\.md\).*\r?\n?" % (re.escape(slug), re.escape(slug)))
        t, k = pat.subn("", t)
        removed += k
    t = t.replace("Всего папок: **131**.", "Активных папок: **%d**. Ещё %d решённых/закрытых/тупиковых вынесены в [solved/INDEX.md](../solved/INDEX.md) — там не работать без новых данных." % (len(active), len(MOVED)))
    t = t.replace("# Каталог пазлов (master/puzzles)", "# Каталог пазлов (master/puzzles) — ТОЛЬКО АКТИВНЫЕ")
    write_md(pr, t, bom)
    log("[5] puzzles/README.md: убрано строк индекса: %d; счётчик обновлён (%d активных)" % (removed, len(active)))

    # ---------- 6. solved/INDEX.md ----------
    rows = {k: [] for k in SECTION_TITLES}
    for slug, (sec, reason) in sorted(MOVED.items()):
        rows[sec].append((slug, reason))
    parts = [
        "# Решённые и закрытые пазлы (master/solved)",
        "",
        "Создано %s. Здесь лежат папки пазлов, **перенесённые из `puzzles/`**: активная работа по ним не ведётся." % DATE,
        "Перед возвращением в работу — правила в `../AGENT_INSTRUCTIONS.md` (раздел про `solved/`).",
        "",
        "## Как пользоваться",
        "- Перед стартом любого нового захода проверяй этот индекс: если пазл здесь — не тратить время без **новых данных**.",
        "- Новые данные (приз вернули/пополнили, автор открыл этап, найдена ошибка в вердикте) → вернуть папку в `puzzles/<slug>/`,",
        "  убрать строку отсюда, добавить в `puzzles/README.md`, отметить в `LOG.md` пазла и в отчёте `reports/`.",
        "- Внутри каждой папки: `README.md` (досье), `LOG.md` (хроника), `tools/`, `data/` — структура прежняя.",
        "",
    ]
    for sec in ("solved", "closed", "deadend"):
        parts.append("## %s (%d)" % (SECTION_TITLES[sec], len(rows[sec])))
        parts.append("")
        parts.append(SECTION_NOTES[sec])
        parts.append("")
        parts.append("| Папка | Причина переноса |")
        parts.append("|---|---|")
        for slug, reason in rows[sec]:
            parts.append("| [%s](%s/README.md) | %s |" % (slug, slug, reason))
        parts.append("")
    parts.append("---")
    parts.append("")
    parts.append("Проверки статусов: OCP (open-crypto-puzzles), реестр @agntn/puzzles, dead-ends-registry, собственные проверки балансов 12–16.10.2026.")
    write_md(os.path.join(SOLVED, "INDEX.md"), NL.join(parts) + NL, False)
    log("[6] solved/INDEX.md создан (%d/%d/%d)" % (len(rows["solved"]), len(rows["closed"]), len(rows["deadend"])))

    # ---------- 7. WAKE_QUEUE.md → журнал в архив ----------
    wq = os.path.join(MASTER, "WAKE_QUEUE.md")
    t, bom = read_md(wq)
    idx = t.find("## Журнал:")
    if idx != -1 and not os.path.isfile(os.path.join(ARCHIVE, "WAKE_JOURNAL_%s.md" % DATE)):
        head, journal = t[:idx], t[idx:]
        arch = [
            "# Журнал проходов WAKE_QUEUE (архив, до %s включительно)" % DATE,
            "",
            "Перемещено из `WAKE_QUEUE.md` %s при переходе на отчёты `reports/` (многопользовательский режим)." % DATE,
            "",
            journal.rstrip() + NL,
        ]
        write_md(os.path.join(ARCHIVE, "WAKE_JOURNAL_%s.md" % DATE), NL.join(arch), False)
        rules = (
            "## Правила отчётов (с %s, многопользовательский режим)%s"
            "%s"
            "- Детальный отчёт прохода — отдельный файл `reports/ГГГГ-ММ-ДД_ЧЧММ_<агент>_<тема>.md` (см. `reports/README.md`).%s"
            "- Секция «Текущая задача» ниже перезаписывается целиком агентом, держащим бронь очереди (`python tools/claims.py acquire _queue --agent <имя>`).%s"
            "- Журнал прежних проходов: `_archive/WAKE_JOURNAL_%s.md`. Решённые/закрытые пазлы: `solved/INDEX.md` — там не работать без новых данных.%s"
            "- Параллельная работа: брони пазлов — `python tools/claims.py`, правила — `AGENT_INSTRUCTIONS.md` (раздел «Параллельная работа»).%s"
            "%s"
        ) % (DATE, NL, NL, NL, NL, DATE, NL, NL, NL)
        if "## Правила отчётов" not in head:
            head = head.replace("## Текущая задача", rules + "## Текущая задача", 1)
        head = head.rstrip() + NL + NL + "---" + NL + "Журнал проходов (до %s включительно): `_archive/WAKE_JOURNAL_%s.md`." % (DATE, DATE) + NL
        write_md(wq, head, bom)
        log("[7] WAKE_QUEUE.md разгружен: журнал → _archive/WAKE_JOURNAL_%s.md" % DATE)
    else:
        log("[7] WAKE_QUEUE.md: журнал не найден или уже архивирован — пропуск")

    # ---------- 8. корневые отчёты → _archive ----------
    root_reports = [
        "BASE_AUDIT_2026-10-17.md",
        "DATA_COLLECTION_2026-10-17.md",
        "HARK_REPORT.md",
        "PUZZLES_DIGEST_2026-10-17.md",
        "PUZZLES_ALL_130_2026-10-17.csv",
        "PUZZLES_ALL_130_2026-10-17.txt",
    ]
    mv = 0
    for fn in root_reports:
        src = os.path.join(MASTER, fn)
        dst = os.path.join(ARCHIVE, fn)
        if os.path.isfile(src):
            shutil.move(src, dst)
            mv += 1
    log("[8] Корневых отчётов убрано в _archive/: %d" % mv)

    # ---------- 9. новые README ----------
    claims_readme = NL.join([
        "# Брони пазлов (claims)",
        "",
        "Файловые lease, чтобы два агента не работали над одним пазлом одновременно. Одна бронь = один файл `_active/<slug>.json`.",
        "",
        "## Команды",
        "```",
        "python tools/claims.py acquire <slug> --agent <имя> [--ttl 120] [--note \"скоуп\"]",
        "python tools/claims.py heartbeat <slug> --agent <имя>",
        "python tools/claims.py release  <slug> --agent <имя>",
        "python tools/claims.py status  <slug>",
        "python tools/claims.py list",
        "python tools/claims.py steal   <slug> --agent <имя>   # только просроченную",
        "python tools/claims.py gc",
        "```",
        "",
        "## Правила",
        "- Перед работой по пазлу — `acquire`. Занято и не просрочено — **не трогать пазл**, взять другой.",
        "- TTL по умолчанию 120 минут; при долгой работе — `heartbeat` раз в ~30 минут; по завершении — `release`.",
        "- Просроченную бронь можно перехватить (`steal`); факт перехвата — записью в `puzzles/<slug>/LOG.md`.",
        "- Создание файла брони эксклюзивное (O_CREAT|O_EXCL) — гонка агентов безопасна.",
        "",
        "## Ограничение (OneDrive)",
        "Агенты на РАЗНЫХ машинах видят файлы с задержкой синхронизации OneDrive. В этом случае бронь — вспомогательная:",
        "перед стартом всегда смотреть последние записи `LOG.md` пазла и свежие файлы в `reports/`.",
        "",
    ])
    write_md(os.path.join(CLAIMS, "README.md"), claims_readme, False)

    reports_readme = NL.join([
        "# Отчёты проходов (reports)",
        "",
        "Один проход агента = один файл. Имя: `ГГГГ-ММ-ДД_ЧЧММ_<агент>_<тема>.md` (время локальное).",
        "",
        "## Что внутри",
        "- Что делал; результат — включая отрицательные; артефакты (пути в папке пазла); ссылки/доказательства; что дальше.",
        "",
        "## Правила",
        "- Каждый агент пишет ТОЛЬКО свои файлы; чужие отчёты не редактировать и не удалять.",
        "- Дублировать в `WAKE_QUEUE.md` ничего не нужно: он содержит только актуальную «Текущую задачу».",
        "- Краткая фиксация по пазлу — в `puzzles/<slug>/LOG.md` (правила: `AGENT_INSTRUCTIONS.md`).",
        "- Старые журналы: `../_archive/`.",
        "",
    ])
    write_md(os.path.join(REPORTS, "README.md"), reports_readme, False)

    registry = NL.join([
        "# Реестр агентов (agents)",
        "",
        "Каждый агент при **первой** сессии добавляет строку; при следующих — обновляет дату последней сессии.",
        "Имя должно совпадать с `--agent` в `tools/claims.py` и подписью в `LOG.md` и отчётах `reports/`.",
        "",
        "| Агент | Модель/среда | Первая сессия | Последняя сессия | Примечание |",
        "|---|---|---|---|---|",
        "| AutoClaw | AutoClaw, проект Default | 2026-10-17 | 2026-10-17 | реструктуризация базы: solved/, claims/, reports/ |",
        "",
    ])
    write_md(os.path.join(AGENTS, "REGISTRY.md"), registry, False)
    log("[9] claims/README.md, reports/README.md, agents/REGISTRY.md созданы")

    # ---------- 10. AGENT_INSTRUCTIONS.md ----------
    ai = os.path.join(MASTER, "AGENT_INSTRUCTIONS.md")
    t, bom = read_md(ai)
    old_block = (
        "## Оркестрация (самобудильник)" + NL
        + "- Автономный цикл описан в `WAKE_QUEUE.md`: каждый проход читает очередь, выполняет задачи, обновляет данные (по этому протоколу), пишет отчёт, ставит новый таймер." + NL
        + "- Агенты, работающие параллельно, тоже обязаны фиксировать изменения по этому протоколу."
    )
    new_block = NL.join([
        "## Оркестрация (самобудильник)",
        "- Автономный цикл описан в `WAKE_QUEUE.md`: каждый проход читает очередь, выполняет задачи, обновляет данные (по этому протоколу), ставит новый таймер.",
        "- Детальный отчёт прохода — отдельный файл `reports/ГГГГ-ММ-ДД_ЧЧММ_<агент>_<тема>.md`; в `WAKE_QUEUE.md` — только актуальная «Текущая задача».",
        "- Агенты, работающие параллельно, тоже обязаны фиксировать изменения по этому протоколу.",
        "",
        "## Параллельная работа нескольких агентов (с 17.10.2026)",
        "База рассчитана на одновременную работу нескольких агентов. Правила обязательны, нарушения — то же, что порча данных.",
        "",
        "### 1. Реестр агентов",
        "- При первой сессии добавь строку в `agents/REGISTRY.md` (имя, модель/среда, дата, скоуп).",
        "- При последующих сессиях обновляй «Последняя сессия». Имя агента едино во всех файлах (REGISTRY, claims, LOG.md, отчёты).",
        "",
        "### 2. Бронирование пазла (обязательно)",
        "- Перед работой по пазлу: `python tools/claims.py acquire <slug> --agent <имя> [--ttl 120] [--note \"скоуп\"]`.",
        "- Пазл забронирован другим и бронь не просрочена — **не трогай этот пазл** (ни код, ни LOG, ни README), возьми другой из очереди.",
        "- Долгая работа: `heartbeat` раз в ~30 минут. По завершении: `release`. Просроченную бронь можно `steal` (факт — в LOG.md пазла).",
        "- Скоуп (например «только балансы») указывай в `--note`; чужой скоуп уважай — не переписывай то, что он исследует.",
        "",
        "### 3. Разграничение файлов (кто что пишет)",
        "- `puzzles/<slug>/LOG.md`, `README.md`, `tools/`, `data/` — только агент, держащий бронь этого пазла.",
        "- `reports/` — каждый агент пишет только СВОИ файлы (один проход = один файл).",
        "- Общие файлы — `WAKE_QUEUE.md` («Текущая задача»), `puzzles/README.md`, `MASTER_CATALOG.md`, `solved/INDEX.md`:",
        "  править атомарно (см. п.4), минимальным диффом, чужие строки не переставлять и не удалять.",
        "",
        "### 4. Атомарные записи (OneDrive)",
        "- Общие файлы не «пересохранять» долгими редакторами: цельная запись — temp-файл рядом + переименование поверх",
        "  (PowerShell: `Set-Content tmp; Move-Item -Force tmp target`; Python: `os.replace`).",
        "- Перед правкой общего файла перечитай его с диска — OneDrive мог принести чужие изменения, твой дифф строится от свежей версии.",
        "- Конфликт-копии OneDrive (`...-DESKTOP-XXXX.md`, `... (Conflict ...).md`): найти, смержить содержимое, копию удалить, факт — в отчёт.",
        "- Секреты (ключи/сиды) держать ВНЕ синхронизируемой папки, напр. `%USERPROFILE%\\\\.secrets\\\\master\\\\<slug>\\\\`",
        "  (правило `.secret/` chmod 600 — для Unix; в OneDrive секретов быть не должно, только указатель).",
        "",
        "### 5. Зона solved/",
        "- `solved/` — решённые/закрытые/тупиковые пазлы (индекс: `solved/INDEX.md`). Активная работа там не ведётся.",
        "- Новые данные (приз вернули/пополнили, автор открыл этап) → вернуть папку в `puzzles/<slug>/`, обновить оба индекса и LOG.",
    ])
    if old_block in t:
        t = t.replace(old_block, new_block, 1)
        write_md(ai, t, bom)
        log("[10] AGENT_INSTRUCTIONS.md: раздел «Параллельная работа» добавлен")
    else:
        log("[10] ВНИМАНИЕ: блок «Оркестрация» не найден дословно — AGENT_INSTRUCTIONS.md не изменён")

    # ---------- 11. корневой README ----------
    readme = NL.join([
        "# Каталог криптозагадок (master)",
        "",
        "Главный справочник: [MASTER_CATALOG.md](MASTER_CATALOG.md).",
        "Очередь/автопробуждение: [WAKE_QUEUE.md](WAKE_QUEUE.md) — только текущая задача; отчёты проходов — [reports/](reports/README.md).",
        "Пазлы (активные): [puzzles/README.md](puzzles/README.md).",
        "**Решённые/закрытые/тупиковые (не работать без новых данных): [solved/INDEX.md](solved/INDEX.md).**",
        "**Ранжированный список быстрых целей (17.10.2026): [QUICK_WINS_2026-10-17.md](QUICK_WINS_2026-10-17.md).**",
        "",
        "Инструкции для агентов: [AGENT_INSTRUCTIONS.md](AGENT_INSTRUCTIONS.md) — включая протокол параллельной работы:",
        "брони пазлов `python tools/claims.py` ([claims/](claims/README.md)), реестр агентов [agents/REGISTRY.md](agents/REGISTRY.md).",
        "",
        "## Карта базы (с 17.10.2026)",
        "| Путь | Назначение |",
        "|---|---|",
        "| `puzzles/<slug>/` | активные пазлы: README.md (досье), LOG.md (хроника), tools/, data/ |",
        "| `solved/<slug>/` | решённые/закрытые/тупиковые; индекс — solved/INDEX.md |",
        "| `WAKE_QUEUE.md` | только «Текущая задача» самобудильника |",
        "| `reports/` | отчёты проходов: один проход = один файл |",
        "| `claims/` | брони пазлов (файловые lease, TTL) |",
        "| `agents/` | реестр агентов |",
        "| `_archive/` | старые журналы и отработанные отчёты |",
        "| `_sources/` | внешние дампы и handoff-материалы |",
        "| `tools/` | общие скрипты (claims.py и др.) |",
        "",
    ])
    write_md(os.path.join(MASTER, "README.md"), readme, False)
    log("[11] README.md обновлён")

    # ---------- 12. claims.py в tools/ + копия скрипта в _archive ----------
    try:
        os.makedirs(os.path.join(MASTER, "tools"), exist_ok=True)
        shutil.copyfile(CLAIMS_PY_SRC, os.path.join(MASTER, "tools", "claims.py"))
        shutil.copyfile(os.path.abspath(__file__), os.path.join(ARCHIVE, "restructure_%s.py" % DATE))
        log("[12] tools/claims.py установлен; копия скрипта реструктуризации — в _archive/")
    except Exception as e:  # noqa: BLE001
        log("[12] ВНИМАНИЕ: не удалось скопировать claims.py: %s" % e)

    # ---------- итог ----------
    after = set(os.listdir(PUZZLES))
    solved_n = len([d for d in os.listdir(SOLVED) if os.path.isdir(os.path.join(SOLVED, d))])
    log("")
    log("ИТОГ: puzzles/ = %d (ожидалось %d); solved/ = %d папок (ожидалось %d)" % (len(after), len(active), solved_n, len(MOVED)))
    if set(after) != set(active):
        log("РАСХОЖДЕНИЕ: лишние/недостающие в puzzles/: %s" % (set(after).symmetric_difference(set(active))))
    log("Готово.")


if __name__ == "__main__":
    main()
