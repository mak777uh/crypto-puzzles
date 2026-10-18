#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
claims.py — файловые брони (lease) на пазлы для параллельной работы агентов.

Одна бронь = один JSON-файл:  claims/_active/<slug>.json
Создание файла эксклюзивное (O_CREAT|O_EXCL) — атомарно даже при гонке агентов.

Команды:
  list                                  все активные брони (просроченные помечены EXPIRED)
  status <slug>                         кто держит пазл
  acquire <slug> --agent N [--ttl 120] [--note "..."] [--model M]
                                        взять пазл в работу
  heartbeat <slug> --agent N            продлить свою бронь (на новый TTL)
  release <slug> --agent N              снять свою бронь
  steal <slug> --agent N [--ttl 120]    перехватить ПРОСРОЧЕННУЮ бронь
  gc                                    убрать просроченные брони в claims/_archive/

Правила (см. также claims/README.md и AGENT_INSTRUCTIONS.md):
- Перед работой по пазлу — acquire. Занят и не просрочен — не трогать, взять другой.
- Долгая работа — heartbeat минимум раз в 30 минут.
- Перехват (steal) — только просроченной брони; факт фиксировать в puzzles/<slug>/LOG.md.
- Брони на разных машинах через OneDrive синхронизируются с задержкой: в этом случае
  бронь — вспомогательная; всегда сверяйся с хвостом LOG.md и свежими файлами reports/.
"""

import argparse
import json
import os
import socket
import sys
import time
from datetime import datetime, timedelta, timezone

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ACTIVE_DIR = os.path.join(ROOT, "claims", "_active")
ARCHIVE_DIR = os.path.join(ROOT, "claims", "_archive")
DEFAULT_TTL = 120  # минут


# ---------- утилиты ----------

def utcnow() -> datetime:
    return datetime.now(timezone.utc)


def iso(dt: datetime) -> str:
    return dt.replace(microsecond=0).isoformat().replace("+00:00", "Z")


def parse_iso(s: str) -> datetime:
    return datetime.fromisoformat(s.replace("Z", "+00:00"))


def ensure_dirs() -> None:
    os.makedirs(ACTIVE_DIR, exist_ok=True)
    os.makedirs(ARCHIVE_DIR, exist_ok=True)


def claim_path(slug: str) -> str:
    return os.path.join(ACTIVE_DIR, slug + ".json")


def check_slug(slug: str) -> str:
    ok = all(c.isalnum() or c in "-_." for c in slug)
    if not slug or not ok or slug in (".", ".."):
        sys.exit("Ошибка: недопустимый slug %r (разрешены a-z, 0-9, '-', '_', '.')." % slug)
    return slug


def atomic_write_json(path: str, data: dict) -> None:
    """Атомарная запись: temp в том же каталоге + os.replace()."""
    tmp = path + ".tmp.%d" % os.getpid()
    with open(tmp, "w", encoding="utf-8", newline="\n") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        f.write("\n")
        f.flush()
        os.fsync(f.fileno())
    os.replace(tmp, path)


def read_claim(path: str) -> dict:
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def is_expired(c: dict) -> bool:
    return utcnow() >= parse_iso(c["expires_utc"])


def fmt_claim(c: dict, mark_expired: bool = True) -> str:
    exp = is_expired(c)
    flag = "  [EXPIRED]" if (exp and mark_expired) else ""
    return (
        "- {slug}: {agent} (TTL {ttl} мин, истекает {expires}){flag}\n"
        "    started {started}; heartbeat {hb}; host {host}; note: {note}"
    ).format(
        slug=c.get("slug", "?"),
        agent=c.get("agent", "?"),
        ttl=c.get("ttl_min", "?"),
        expires=c.get("expires_utc", "?"),
        flag=flag,
        started=c.get("started_utc", "?"),
        hb=c.get("heartbeat_utc", "?"),
        host=c.get("host", "?"),
        note=c.get("note", "") or "—",
    )


def new_claim(slug: str, agent: str, model: str, ttl: int, note: str) -> dict:
    now = utcnow()
    return {
        "slug": slug,
        "agent": agent,
        "model": model,
        "note": note,
        "host": socket.gethostname(),
        "started_utc": iso(now),
        "ttl_min": ttl,
        "expires_utc": iso(now + timedelta(minutes=ttl)),
        "heartbeat_utc": iso(now),
    }


# ---------- команды ----------

def cmd_list(_args) -> int:
    ensure_dirs()
    files = sorted(f for f in os.listdir(ACTIVE_DIR) if f.endswith(".json"))
    if not files:
        print("Активных броней нет.")
        return 0
    total = 0
    for name in files:
        path = os.path.join(ACTIVE_DIR, name)
        try:
            c = read_claim(path)
        except Exception as e:  # noqa: BLE001
            print("- %s: НЕ ЧИТАЕТСЯ (%s)" % (name, e))
            continue
        print(fmt_claim(c))
        total += 1
    print("\nВсего броней: %d" % total)
    return 0


def cmd_status(args) -> int:
    ensure_dirs()
    slug = check_slug(args.slug)
    path = claim_path(slug)
    if not os.path.exists(path):
        print("СВОБОДЕН: %s (брони нет)" % slug)
        return 0
    c = read_claim(path)
    print(("ЗАНЯТ" if not is_expired(c) else "ПРОСРОЧЕН (можно steal)") + ":\n" + fmt_claim(c))
    return 0


def cmd_acquire(args) -> int:
    ensure_dirs()
    slug = check_slug(args.slug)
    path = claim_path(slug)
    data = new_claim(slug, args.agent, args.model, args.ttl, args.note)
    try:
        fd = os.open(path, os.O_CREAT | os.O_EXCL | os.O_WRONLY)
    except FileExistsError:
        c = read_claim(path)
        if is_expired(c):
            print(
                "ПРОСРОЧЕНА: %s держал %s до %s. Освободить: release/steal, или возьми другой пазл."
                % (slug, c.get("agent"), c.get("expires_utc")),
                file=sys.stderr,
            )
            return 2
        print(
            "ЗАНЯТО: %s держит %s до %s (heartbeat %s). Не трогай пазл — возьми другой."
            % (slug, c.get("agent"), c.get("expires_utc"), c.get("heartbeat_utc")),
            file=sys.stderr,
        )
        return 1
    with os.fdopen(fd, "w", encoding="utf-8", newline="\n") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        f.write("\n")
    print("OK: бронь взята — %s → %s, до %s (TTL %d мин)." % (slug, args.agent, data["expires_utc"], args.ttl))
    print("Не забудь: heartbeat раз в ~30 мин, release по завершении.")
    return 0


def _owner_check(c: dict, agent: str, slug: str) -> bool:
    if c.get("agent") != agent:
        print("Отказ: %s держит не ты (%s), а %s." % (slug, agent, c.get("agent")), file=sys.stderr)
        return False
    return True


def cmd_heartbeat(args) -> int:
    ensure_dirs()
    slug = check_slug(args.slug)
    path = claim_path(slug)
    if not os.path.exists(path):
        print("Нет брони на %s — сначала acquire." % slug, file=sys.stderr)
        return 1
    c = read_claim(path)
    if not _owner_check(c, args.agent, slug):
        return 1
    now = utcnow()
    c["heartbeat_utc"] = iso(now)
    c["expires_utc"] = iso(now + timedelta(minutes=args.ttl or c.get("ttl_min", DEFAULT_TTL)))
    atomic_write_json(path, c)
    print("OK: heartbeat %s, продлено до %s." % (slug, c["expires_utc"]))
    return 0


def cmd_release(args) -> int:
    ensure_dirs()
    slug = check_slug(args.slug)
    path = claim_path(slug)
    if not os.path.exists(path):
        print("Нет брони на %s (уже свободен)." % slug)
        return 0
    c = read_claim(path)
    if not _owner_check(c, args.agent, slug):
        return 1
    c["released_utc"] = iso(utcnow())
    c["released_by"] = args.agent
    arch = os.path.join(ARCHIVE_DIR, "%s.%s.json" % (slug, datetime.now().strftime("%Y%m%dT%H%M%S")))
    atomic_write_json(arch, c)
    os.remove(path)
    print("OK: бронь снята — %s свободен (архив: %s)." % (slug, os.path.basename(arch)))
    return 0


def cmd_steal(args) -> int:
    ensure_dirs()
    slug = check_slug(args.slug)
    path = claim_path(slug)
    if os.path.exists(path):
        c = read_claim(path)
        if not is_expired(c):
            print(
                "Отказ: бронь %s ещё действует (%s до %s). Перехват запрещён."
                % (slug, c.get("agent"), c.get("expires_utc")),
                file=sys.stderr,
            )
            return 1
        c["stolen_utc"] = iso(utcnow())
        c["stolen_by"] = args.agent
        arch = os.path.join(ARCHIVE_DIR, "%s.%s.expired.json" % (slug, datetime.now().strftime("%Y%m%dT%H%M%S")))
        atomic_write_json(arch, c)
        print("Перехват просроченной брони (%s, было %s)." % (slug, c.get("agent")))
        os.remove(path)
    data = new_claim(slug, args.agent, args.model, args.ttl, args.note)
    atomic_write_json(path, data)
    print("OK: бронь перехвачена — %s → %s, до %s." % (slug, args.agent, data["expires_utc"]))
    print("Зафиксируй перехват в puzzles/%s/LOG.md." % slug)
    return 0


def cmd_gc(_args) -> int:
    ensure_dirs()
    moved = 0
    for name in sorted(os.listdir(ACTIVE_DIR)):
        if not name.endswith(".json"):
            continue
        path = os.path.join(ACTIVE_DIR, name)
        try:
            c = read_claim(path)
        except Exception:  # noqa: BLE001
            continue
        if is_expired(c):
            arch = os.path.join(
                ARCHIVE_DIR, "%s.%s.expired.json" % (c.get("slug", name[:-5]), datetime.now().strftime("%Y%m%dT%H%M%S"))
            )
            c["gc_utc"] = iso(utcnow())
            atomic_write_json(arch, c)
            os.remove(path)
            print("- просрочена → архив: %s (%s)" % (c.get("slug", name), c.get("agent")))
            moved += 1
    print("gc: перенесено %d." % moved)
    return 0


# ---------- CLI ----------

def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(
        prog="claims.py",
        description="Брони пазлов для параллельной работы агентов (файловые lease).",
    )
    sub = p.add_subparsers(dest="cmd", required=True)

    sub.add_parser("list", help="все брони").set_defaults(func=cmd_list)

    s = sub.add_parser("status", help="статус пазла")
    s.add_argument("slug")
    s.set_defaults(func=cmd_status)

    def add_common(sp):
        sp.add_argument("slug")
        sp.add_argument("--agent", required=True, help="имя агента (как в agents/REGISTRY.md)")
        sp.add_argument("--model", default="", help="модель/среда агента")
        sp.add_argument("--note", default="", help="скоуп работ, напр. 'только балансы'")
        sp.add_argument("--ttl", type=int, default=DEFAULT_TTL, help="TTL в минутах (по умолчанию 120)")

    a = sub.add_parser("acquire", help="взять пазл")
    add_common(a)
    a.set_defaults(func=cmd_acquire)

    h = sub.add_parser("heartbeat", help="продлить бронь")
    h.add_argument("slug")
    h.add_argument("--agent", required=True)
    h.add_argument("--ttl", type=int, default=0, help="новый TTL (0 = прежний)")
    h.set_defaults(func=cmd_heartbeat)

    r = sub.add_parser("release", help="снять бронь")
    r.add_argument("slug")
    r.add_argument("--agent", required=True)
    r.set_defaults(func=cmd_release)

    st = sub.add_parser("steal", help="перехватить просроченную бронь")
    add_common(st)
    st.set_defaults(func=cmd_steal)

    sub.add_parser("gc", help="просроченные → архив").set_defaults(func=cmd_gc)
    return p


def main() -> int:
    args = build_parser().parse_args()
    return args.func(args)


if __name__ == "__main__":
    sys.exit(main())
