# -*- coding: utf-8 -*-
"""log_dedup.py — уборка механических дублей, оставленных чужим «переформатированием».

18.10.2026 ~13:0x–13:1x один из параллельных проходов переписал MASTER_CATALOG.md и
несколько LOG.md с дефектами генерации: одна и та же строка повторяется подряд в
нескольких вариантах оформления (`- X`, `X`, `## X`, `# ## X`, ` **X**`), из-за чего
`git diff` показывает переписанным весь файл, а читатель видит мусор.

Скрипт убирает ТОЛЬКО повторяющийся текст, ничего не переформулирует:
  правило 1 (склейка подряд идущих): строки, чей «голый» текст (без ведущих `-`, `*`,
      `#`, пробелов) совпадает с предыдущей оставленной строкой, удаляются; оставленной
      считается версия в каноническом виде списка (`- текст`), если она есть в группе.
  правило 2 (инъекция заголовка): строка-заголовок (`#…`), текст которой совпадает со
      СЛЕДУЮЩей оставленной строкой, удаляется (это дубль, а не настоящий заголовок).
  Пустые строки, совпадения-разделители таблиц (`|---|`) и заголовки без дубля — не
  трогаются. Файл перечитывается с диска, запись атомарная (.tmp + os.replace), EOL
  каждой сохранённой строки не меняется.

Использование:
    python tools/log_dedup.py --check <файл ...>
    python tools/log_dedup.py <файл ...>
"""
import os
import re
import sys

MASTER = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BARE = re.compile(r"^[\s\-\*#>]+")


def norm(line):
    t = BARE.sub("", line).strip()
    return t


def dedup(text):
    lines = text.splitlines(keepends=True)
    kept = []
    n_merge = n_head = 0
    i = 0
    while i < len(lines):
        raw = lines[i]
        body = raw.rstrip("\r\n")
        eol = raw[len(body):]
        t = norm(body)
        if t and kept and norm(kept[-1][0]) == t:
            # дубль подряд: оставляем более каноничную форму (- текст)
            prev_text, prev_eol = kept[-1]
            prefer_new = body.startswith("- ") and not prev_text.startswith("- ")
            if prefer_new:
                kept[-1] = (body, prev_eol)
            n_merge += 1
            i += 1
            continue
        kept.append((body, eol))
        i += 1
    # правило 2: заголовок-дубль следующей строки
    out = []
    for j, (body, eol) in enumerate(kept):
        t = norm(body)
        if t and body.lstrip().startswith("#") and j + 1 < len(kept) and norm(kept[j + 1][0]) == t:
            n_head += 1
            continue
        out.append(body + eol)
    return "".join(out), n_merge, n_head


def main(argv):
    check = "--check" in argv
    files = [a for a in argv if a != "--check"]
    if not files:
        raise SystemExit(__doc__)
    for f in files:
        p = f if os.path.isabs(f) else os.path.join(MASTER, f)
        old = open(p, encoding="utf-8", newline="").read()
        new, n_merge, n_head = dedup(old)
        rel = os.path.relpath(p, MASTER).replace("\\", "/")
        if new == old:
            print("%s: чисто (0 склеек, 0 инъекций)" % rel)
            continue
        if not check:
            tmp = p + ".tmp"
            open(tmp, "w", encoding="utf-8", newline="").write(new)
            os.replace(tmp, p)
        print("%s: склеено дублей %d, снято заголовков-инъекций %d, строк %d -> %d%s" % (
            rel, n_merge, n_head, old.count("\n"), new.count("\n"),
            " [CHECK-ONLY]" if check else ""))


if __name__ == "__main__":
    main(sys.argv[1:])
