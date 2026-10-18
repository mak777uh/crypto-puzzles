#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""eol_repair.py — восстановление исходных переводов строк в изменённых файлах MASTER.

Проблема: однократные правки «прочитать текстом — записать с newline="\\n"» (или
обратное) конвертируют CRLF-файлы в LF и наоборот, из-за чего `git diff` показывает
переписанным весь файл вместо нескольких строк.

Алгоритм: для каждого файла берём raw-байты версии из HEAD (через `git cat-file`, без
smudge-конверсии), сравниваем ПОСЛОВАРНОЕ содержание (с игнорированием EOL) с рабочей
копией (difflib.SequenceMatcher), и для неизменённых строк возвращаем тот EOL, который
был в HEAD. Для новых/изменённых строк — EOL соседней сохранённой строки (по умолчанию
доминирующий в файле). Содержимое строк не трогается вообще.

Использование:
    python tools/eol_repair.py <файл> [<файл> ...]              # починка
    python tools/eol_repair.py --check <файл> ...                # только диагноз
    python tools/eol_repair.py --head <HEAD-путь> <файл>          # после git mv
Только для файлов, отслеживаемых git (иначе не с чем сравнивать).
"""
import difflib
import os
import re
import subprocess
import sys

MASTER = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SPLIT = re.compile(b"([^\r\n]*(?:\r\n|\r|\n|$))")


def head_blob(head_path):
    """Raw-байты версии из HEAD (без autocrlf-конверсии)."""
    r = subprocess.run(["git", "-C", MASTER, "rev-parse", "HEAD:" + head_path],
                       capture_output=True)
    if r.returncode != 0:
        return None
    sha = r.stdout.decode().strip()
    r = subprocess.run(["git", "-C", MASTER, "cat-file", "blob", sha], capture_output=True)
    return r.stdout if r.returncode == 0 else None


def split_lines(data):
    """Список (content, eol, raw). Хвостовой недобитый кусок сохраняется как есть."""
    out = []
    for m in SPLIT.finditer(data):
        raw = m.group(0)
        if not raw:
            continue
        eol = raw[len(raw) - len(raw.rstrip(b"\r\n")):]
        out.append((raw[:len(raw) - len(eol)], eol, raw))
    return out


def key(content):
    return content.rstrip(b" \t").lower()


def dominant(lines):
    c = sum(1 for _, e, _ in lines if e == b"\r\n")
    l = sum(1 for _, e, _ in lines if e == b"\n")
    return b"\r\n" if c > l else b"\n"


def repair(path, head_path=None, check_only=False):
    abs_path = path if os.path.isabs(path) else os.path.join(MASTER, path)
    rel = os.path.relpath(abs_path, MASTER).replace("\\", "/")
    blob = head_blob(head_path or rel)
    if blob is None:
        return "%s: в HEAD нет `%s` — пропуск" % (rel, head_path or rel)
    cur = open(abs_path, "rb").read()
    hb, cb = split_lines(blob), split_lines(cur)
    a = [key(c) for c, _, _ in hb]
    b = [key(c) for c, _, _ in cb]
    default = dominant(hb)
    res = []
    sm = difflib.SequenceMatcher(None, a, b, autojunk=False)
    for tag, i1, i2, j1, j2 in sm.get_opcodes():
        if tag == "equal":
            for k in range(i2 - i1):
                content, _eol, _raw = hb[i1 + k]
                new_content, _ne, _nraw = cb[j1 + k]
                res.append((new_content, hb[i1 + k][1]))
        elif tag == "delete":
            pass
        else:  # insert / replace: EOL берём от предыдущей сохранённой строки
            eol = res[-1][1] if res else default
            for k in range(j1, j2):
                res.append((cb[k][0], eol))
    new = b"".join(c + e for c, e in res)
    if new == cur:
        return "%s: EOL уже соответствуют HEAD (правка не нужна)" % rel
    if not check_only:
        tmp = abs_path + ".tmp"
        open(tmp, "wb").write(new)
        os.replace(tmp, abs_path)
    changed = sum(1 for (_c1, e1, _r1), (_c2, e2, _r2) in zip(split_lines(cur), split_lines(new))
                  if e1 != e2)
    return "%s: %s строк EOL -> HEAD-стиль%s" % (
        rel, changed, " [CHECK-ONLY]" if check_only else "")


def main(argv):
    check = "--check" in argv
    args = [a for a in argv if a != "--check"]
    heads = {}
    i = 0
    files = []
    while i < len(args):
        if args[i] == "--head":
            target = args[i + 2]
            abs_t = target if os.path.isabs(target) else os.path.join(MASTER, target)
            heads[os.path.normpath(abs_t)] = args[i + 1]
            files.append(target)
            i += 3
        else:
            files.append(args[i])
            i += 1
    if not files:
        raise SystemExit(__doc__)
    for f in files:
        abs_f = f if os.path.isabs(f) else os.path.join(MASTER, f)
        print(repair(abs_f, heads.get(os.path.normpath(abs_f)), check))


if __name__ == "__main__":
    main(sys.argv[1:])
