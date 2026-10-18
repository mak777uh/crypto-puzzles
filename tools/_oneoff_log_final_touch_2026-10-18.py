# -*- coding: utf-8 -*-
"""Одноразовая доводка 18.10.2026: два LOG, чьи записи OCP Sync не попали в коммит bb8df8b.

Причина: параллельный массовый проход ~13:31 вернул рабочие копии
`puzzles/arweave-puzzle-11-1eth/LOG.md` и
`puzzles/crypto-puzzles-2018-puzzle-2-0-05eth/LOG.md` к дефектному состоянию
(та же строка повторена в нескольких оформлениях) ДО того, как моя правка была
запечатана; в bb8df8b ушла именно перезаписанная версия без записи и без маркера.

Что делает скрипт (только для этих двух файлов, ничего больше не трогает):
  1. берёт base = raw-байты версии b08eab8 (моя чистая, после log_dedup);
  2. сверяет с текущей рабочей копией нормализованные множества непустых строк
     (b08eab8 ⊆ cur И cur ⊆ b08eab8) — если где-то есть хоть одна уникальная строка
     текущей копии, которой нет в base, файл НЕ перезаписывается, запись просто
     добавляется снизу к текущему содержимому (чужую работу не затираем);
  3. дописывает вниз запись OCP Sync (с маркером `<!-- ocp-snapshot:19644e58 -->`),
     сохраняя EOL-стиль base; запись атомарная (.tmp + os.replace), идемпотентная.

Использование:  python tools/_oneoff_log_final_touch_2026-10-18.py [--check]
"""
import os
import re
import subprocess
import sys

M = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BARE = re.compile(r"^[\s\-\*#>]+")
import importlib.util
_M = os.path.join(M, "tools", "_oneoff_log_reappend_2026-10-18.py")
_spec = importlib.util.spec_from_file_location("ocp_log_entries", _M)
_src = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_src)          # main() запускается только под __main__
ARWEAVE11, CP2018 = _src.ARWEAVE11, _src.CP2018  # тексты записей

TARGETS = [
    ("puzzles/arweave-puzzle-11-1eth/LOG.md", "b08eab8:puzzles/arweave-puzzle-11-1eth/LOG.md", ARWEAVE11),
    ("puzzles/crypto-puzzles-2018-puzzle-2-0-05eth/LOG.md",
     "b08eab8:puzzles/crypto-puzzles-2018-puzzle-2-0-05eth/LOG.md", CP2018),
]


def norm(line):
    return BARE.sub("", line).strip()


def blob(spec):
    r = subprocess.run(["git", "-C", M, "rev-parse", spec], capture_output=True, text=True)
    if r.returncode:
        raise SystemExit("не могу найти %s: %s" % (spec, r.stderr.strip()))
    r = subprocess.run(["git", "-C", M, "cat-file", "blob", r.stdout.strip()], capture_output=True)
    if r.returncode:
        raise SystemExit("cat-file не смог прочитать %s" % spec)
    return r.stdout.decode("utf-8", "replace")


def main():
    check = "--check" in sys.argv
    for rel, spec, entry in TARGETS:
        p = os.path.join(M, rel)
        cur = open(p, encoding="utf-8", newline="").read()
        base = blob(spec)
        if "ocp-snapshot:19644e58" in cur:
            print("%s: запись уже на месте — пропуск" % rel)
            continue
        s_base = set(norm(l) for l in base.splitlines() if norm(l))
        s_cur = set(norm(l) for l in cur.splitlines() if norm(l))
        extra = sorted(s_cur - s_base)
        lost = sorted(s_base - s_cur)
        crlf = base.count("\r\n") > base.count("\n") / 2
        eol = "\r\n" if crlf else "\n"
        new_entry = entry.strip("\n").replace("\n", eol) + eol
        print("%s: base %d строк | уникальных cur %d, base %d | чужих новых %d | потер base-строк %d"
              % (rel, base.count("\n"), len(s_cur), len(s_base), len(extra), len(lost)))
        for l in (extra + lost)[:8]:
            print("    %s: %s" % ("чужая" if l in s_cur - s_base else "нет в cur", l[:110]))
        if extra:
            print("    СТОП: в копии есть строки, которых нет в base — base не перетираем, "
                  "добавляем запись снизу к текущему содержимому")
            rebuilt = cur.rstrip("\r\n") + eol + eol + new_entry
        elif lost:
            print("    ВНИМАНИЕ: в base есть строки, пропавшие из копии (признак чужой правки) — "
                  "добавляем запись снизу к текущему содержимому")
            rebuilt = cur.rstrip("\r\n") + eol + eol + new_entry
        else:
            rebuilt = base.rstrip("\r\n") + eol + eol + new_entry
        print("    итог строк: %d" % rebuilt.count("\n"))
        if check:
            continue
        tmp = p + ".tmp"
        open(tmp, "w", encoding="utf-8", newline="").write(rebuilt)
        os.replace(tmp, p)
        print("    записано")


if __name__ == "__main__":
    main()
