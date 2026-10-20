# -*- coding: utf-8 -*-
"""Скан OCP-клона: открытые пазлы с ЖИВЫМ он-чейн балансом И опубликованным ответом/ключом.

Зачем: единственная законная «быстрая деньги» форма в каталоге — это гонка, а не инсайт:
автор/сообщество уже выложили решение (seed, WIF, passphrase, формулу), а монеты ещё не
сняты. Скрипт ничего не тратит и не отправляет: он только печатает таблицу
«пазл -> адрес -> остаток -> есть ли публичный ответ -> где именно».

Как читает «публичный ответ»: в puzzle.json и README ищутся поля/слова solution|answer|key|
seed|mnemonic|wif|passphrase|private, а также отдельно помечаются записи вида
"swept without a published solution" (решение НЕТ). Подозрительные совпадения печатаются с
контекстом, чтобы человек (Илья) решил, настоящий ли это ключ, а не догадка агента.

Он-чейн: blockstream.info, GET /api/address/<addr>, только chain_stats. Без ключей и без транзакций.
"""
from __future__ import annotations

import json
import re
import subprocess
import sys
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1] / "_sources" / "ocp"
ADDR_RE = re.compile(r"\b(?:bc1[a-z0-9]{20,90}|[13][a-km-zA-HJ-NP-Z1-9]{25,34})\b")
SOL_RE = re.compile(r"(solution|answer|mnemonic|seed\s*phrase|passphrase|private key|wif)", re.I)
NEG_RE = re.compile(r"unknown \(swept|no published solution|unsolved|unknown\b", re.I)


def git_pull() -> str:
    try:
        r = subprocess.run(["git", "-C", str(ROOT), "pull", "--ff-only", "-q"],
                           capture_output=True, text=True, timeout=120)
        return (r.stdout + r.stderr).strip() or "already up to date"
    except Exception as e:
        return "git pull пропущен: %s" % e


def api(addr: str):
    try:
        with urllib.request.urlopen("https://blockstream.info/api/address/" + addr, timeout=25) as fh:
            c = json.load(fh)["chain_stats"]
        return c["funded_txo_sum"] - c["spent_txo_sum"], c["tx_count"]
    except Exception:
        return None, None


def main() -> int:
    print("git pull:", git_pull())
    if not ROOT.is_dir():
        print("нет клона:", ROOT)
        return 1
    files = sorted(ROOT.glob("*/**/puzzle.json"))
    print("puzzle.json найдено:", len(files))
    rows = []
    for f in files:
        parts = f.relative_to(ROOT).parts
        tier = parts[0]
        if tier == "4-solved" or tier == "archive":
            continue
        try:
            d = json.loads(f.read_text(encoding="utf-8"))
        except Exception as e:
            print("PARSE FAIL", f, e)
            continue
        blob = json.dumps(d, ensure_ascii=False)
        readme = f.parent / "README.md"
        rtext = readme.read_text(encoding="utf-8", errors="replace") if readme.is_file() else ""
        addrs = []
        for a in ADDR_RE.findall(blob + "\n" + rtext):
            if a not in addrs:
                addrs.append(a)
        hits = []
        for m in SOL_RE.finditer(blob):
            s = max(0, m.start() - 90)
            ctx = blob[s:m.end() + 150].replace("\\n", " ")
            if not NEG_RE.search(ctx):
                hits.append(ctx)
        for m in SOL_RE.finditer(rtext):
            s = max(0, m.start() - 60)
            ctx = rtext[s:m.end() + 140].replace("\n", " ")
            if not NEG_RE.search(ctx):
                hits.append(ctx)
        rows.append((tier, d.get("slug") or f.parent.name, addrs[:4], hits[:3]))

    live = []
    for tier, slug, addrs, hits in rows:
        tot = 0
        det = []
        for a in addrs:
            bal, ntx = api(a)
            if bal is None:
                det.append("%s?" % a[:14])
                continue
            det.append("%s=%d/%dtx" % (a[:14], bal, ntx))
            tot += bal
        if tot > 0 and hits:
            live.append((tot, tier, slug, det, hits))
    live.sort(reverse=True)
    print("\n=== открытые пазлы: живой баланс ЕСТЬ и есть текст-кандидат на «ответ» ===")
    if not live:
        print("пусто")
    for tot, tier, slug, det, hits in live[:25]:
        print("\n%s | %s | остаток %d сат | %s" % (slug, tier, tot, "; ".join(det)))
        for h in hits:
            print("    …%s…" % h[:200])
    print("\nИтого строк со живым балансом и упоминанием ответа: %d" % len(live))
    print("Справка: полный список открытых записей — %d" % len(rows))
    return 0


if __name__ == "__main__":
    sys.exit(main())
