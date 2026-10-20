#!/usr/bin/env python3
"""Сторож призов (watch-only) — read-only мониторинг он-чейн состояний адресов песочницы.

Делает: опрашивает blockstream.info (только GET), сравнивает с предыдущим снимком
`state.json`, при расхождении дописывает строку в `puzzles/<slug>/LOG.md` и печатает
сводку. Ничего не подписывает и не транслирует; ключей здесь нет и не бывает.

Запуск:
    python tools/sandbox/monitor.py            # один проход (seed при первом запуске)
    python tools/sandbox/monitor.py --quiet    # только изменения, без общей сводки
    python tools/sandbox/monitor.py --json out.json

Правила: AGENT_INSTRUCTIONS.md №2 (балансы раньше форумов), №5 (никаких трат без ОК Ильи),
§«solved/» (новое событие на призе = сигнал к возврату папки в активную работу).
"""
from __future__ import annotations

import argparse
import json
import os
import subprocess
import sys
import time
from datetime import datetime, timezone

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", ".."))
CONFIG = os.path.join(HERE, "watchonly.json")
STATE = os.path.join(HERE, "state.json")


def api_get(base: str, path: str, timeout: int = 15):
    """GET через curl: urllib на этом хосте падает по SSL, mempool.space — 429."""
    for attempt in range(3):
        p = subprocess.run(
            ["curl", "-s", "--max-time", str(timeout), base + path],
            capture_output=True, text=True, timeout=timeout + 5,
        )
        out = (p.stdout or "").strip()
        if out and out[0] in "[{":
            try:
                return json.loads(out)
            except json.JSONDecodeError:
                pass
        time.sleep(1.5 * (attempt + 1))
    raise RuntimeError(f"API: пустой/битый ответ {base}{path}")


def chain_stats(base: str, addr: str) -> dict:
    d = api_get(base, f"/address/{addr}")
    c = d.get("chain_stats", {})
    funded = int(c.get("funded_txo_sum", 0))
    spent = int(c.get("spent_txo_sum", 0))
    return {
        "balance": funded - spent,
        "funded": funded,
        "spent": spent,
        "tx_count": int(c.get("tx_count", 0)),
        "utxo_in_mempool": int(c.get("stats", {}).get("utxo_in_mempool", 0)),
    }


def op_returns(base: str, addr: str, limit: int = 8) -> list:
    """OP_RETURN-сообщения последних транзакций адреса (хинты авторов часто кладут туда)."""
    txs = api_get(base, f"/address/{addr}/txs")
    found = []
    for tx in txs[:limit]:
        for vout in tx.get("vout", []):
            s = vout.get("scriptpubkey", "")
            if s.startswith("6a"):
                payload = s[2:]
                text = ""
                try:
                    text = bytes.fromhex(payload).decode("utf-8", "replace").strip("\x00")
                except Exception:
                    text = payload[:120]
                found.append({
                    "txid": tx["txid"],
                    "block_height": tx.get("status", {}).get("block_height"),
                    "text": text[:300],
                })
    return found


def atomic_write(path: str, data: str) -> None:
    tmp = path + ".tmp"
    with open(tmp, "w", encoding="utf-8", newline="\n") as f:
        f.write(data)
    os.replace(tmp, path)


def append_log(slug: str, block: str, tag: str) -> str:
    """Добавляет запись в puzzles/<slug>/LOG.md (идемпотентно по tag)."""
    log_path = os.path.join(ROOT, "puzzles", slug, "LOG.md")
    if not os.path.isdir(os.path.join(ROOT, "puzzles", slug)):
        log_path = os.path.join(ROOT, "solved", slug, "LOG.md")
    if not os.path.isfile(log_path):
        return f"<нет LOG для {slug}>"
    with open(log_path, encoding="utf-8") as f:
        cur = f.read()
    if tag in cur:
        return log_path + " (без изменений)"
    atomic_write(log_path, cur.rstrip("\n") + "\n\n" + block)
    return log_path


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--quiet", action="store_true", help="печатать только изменения")
    ap.add_argument("--json", help=" additionally dump result to file")
    ap.add_argument("--no-log", action="store_true", help="не писать в LOG.md пазлов")
    args = ap.parse_args()

    cfg = json.load(open(CONFIG, encoding="utf-8"))
    base = cfg.get("api_base", "https://blockstream.info/api")
    prev = {}
    if os.path.isfile(STATE):
        prev = json.load(open(STATE, encoding="utf-8")).get("addresses", {})

    now = datetime.now(timezone.utc)
    stamp = now.strftime("%Y-%m-%d %H:%M UTC")
    results, changes = {}, []

    for w in cfg["watch"]:
        addr = w["address"]
        try:
            st = chain_stats(base, addr)
            ops = op_returns(base, addr)
        except Exception as e:
            results[addr] = {"error": str(e)}
            print(f"  ! {addr[:18]}…  {e}", flush=True)
            continue
        old = prev.get(addr)
        st["kind"] = w.get("kind")
        st["slug"] = w.get("slug")
        st["op_returns"] = ops
        results[addr] = st
        if old is None:
            flag = "SEED"
        else:
            flag = ""
            if st["balance"] != old.get("balance"):
                flag += "BALANCE "
            if st["tx_count"] != old.get("tx_count"):
                flag += "TXCOUNT "
            if len(ops) > len(old.get("op_returns", [])):
                flag += "NEW_OP_RETURN "
            if st["utxo_in_mempool"] and not old.get("utxo_in_mempool"):
                flag += "PENDING_IN_MEMPOOL "
            flag = flag.strip()
        st["delta"] = flag
        if flag and flag != "SEED":
            changes.append((w, st, old))
        if not args.quiet:
            print(f"  {flag or '=':16s} {addr[:26]}…  {st['balance']:>12,d} сат  "
                  f"tx={st['tx_count']:>4}  mempool={st['utxo_in_mempool']}", flush=True)
        time.sleep(0.35)

    state_out = {
        "updated": stamp,
        "note": "watch-only снимок; ключей нет",
        "addresses": {a: {k: v for k, v in r.items() if k != "kind"} for a, r in results.items()},
    }
    atomic_write(STATE, json.dumps(state_out, ensure_ascii=False, indent=2) + "\n")

    for w, st, old in changes:
        if args.no_log:
            continue
        tag = (f"[sandbox-watch {now.strftime('%Y-%m-%d')}Z {w['address'][:14]} "
               f"{st['delta']}]")
        block = (
            f"## {stamp} — sandbox watch-only (автоматическая запись tools/sandbox/monitor.py)\n"
            f"- Маркер: {tag}\n"
            f"- Адрес: `{w['address']}` ({w.get('slug')}, {w.get('kind')})\n"
            f"- Изменение: {st['delta']}\n"
            f"- Было: баланс {old.get('balance', 0):,} сат, tx {old.get('tx_count', 0)}\n"
            f"- Стало: баланс {st['balance']:,} сат, tx {st['tx_count']}, mempool {st['utxo_in_mempool']}\n"
            f"- Ссылки: {base}/address/{w['address']}\n"
            f"- Действие агента: проверить, не «новое событие» ли по §5 (пополнение/возврат приза/"
            f"открытая стадия). Свопов и трансляций не делать — правило №5."
        )
        path = append_log(w["slug"], block, tag)
        print(f"  >> запись: {path}", flush=True)

    print(f"\nИТОГ {stamp}: адресов {len(results)}, изменений {len(changes)}, "
          f"состояние -> {STATE}", flush=True)
    if args.json:
        atomic_write(os.path.abspath(args.json),
                     json.dumps({"updated": stamp, "addresses": results},
                                ensure_ascii=False, indent=2) + "\n")
    return 0


if __name__ == "__main__":
    sys.exit(main())
