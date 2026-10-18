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
  правило 3 (шумовые префиксы, добавлено 18.10 после находки в WAKE_QUEUE.md): тот же дефект
      повторяет строку с мусорным префиксом из 1–3 символов («we data/…», «hu data/…»,
      «1 data/…», «(` data/…», «## data/…» и т.п.). Если ПОДРЯД идут >=3 строки, чьи тексты
      совпадают после снятия таких префиксов (остаток не короче 40 символов), остаётся одна —
      в каноническом виде списка. Совпадение требует одинакового длинного «хвоста», поэтому
      осмысленные строки (разные слова, другие суффиксы, «не …» длиной >3 символов) не сливаются.
  правило 4 (дубль через пустые строки): те же подряд, но разделены не более чем двумя пустыми
      строками, и только если длина текста >= 40 символов — короткие повторяющиеся строки
      («Бронь снята.», разделители таблиц, повторы в разных разделах) не сливаются.
  Пустые строки, совпадения-разделители таблиц (`|---|`) и заголовки без дубля — не
  трогаются. Файл перечитывается с диска, запись атомарная (.tmp + os.replace), EOL
  каждой сохранённой строки не меняется.

Самопроверка потерь: множество core() непустых строк (текст после снятия маркеров списка и
шумовых префиксов) до и после обязано совпадать — скрипт печатает «потеря уникальных строк N»
и при N>0 файл не пишет.

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


NOISE = re.compile(r"^(.{1,3})\s+(\S.*)$")
MIN_CORE = 40


def core(line):
    """Текст строки без маркеров списка/заголовка и без мусорных префиксов из 1-3 символов."""
    t = norm(line)
    while True:
        m = NOISE.match(t)
        if not m or len(m.group(2)) < MIN_CORE:
            return t
        t = m.group(2)


def dedup(text):
    lines = text.splitlines(keepends=True)
    kept = []
    n_merge = n_head = n_noise = 0
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
    mid = []
    for j, (body, eol) in enumerate(kept):
        t = norm(body)
        if t and body.lstrip().startswith("#") and j + 1 < len(kept) and norm(kept[j + 1][0]) == t:
            n_head += 1
            continue
        mid.append((body, eol))
    # правило 3: подряд идущие варианты одной строки с мусорным префиксом (>=3 штук)
    out = []
    j = 0
    while j < len(mid):
        body, eol = mid[j]
        c = core(body)
        run = []
        k = j
        while k < len(mid) and core(mid[k][0]) == c:
            run.append(mid[k])
            k += 1
        if len(c) >= MIN_CORE and len(run) >= 3:
            best = run[0][0]
            for b, _e in run:
                if b.startswith("- "):
                    best = b
                    break
            out.append(best + eol)
            n_noise += len(run) - 1
            j = k
            continue
        out.extend(b + e for b, e in run)
        j = k
    # правило 4: тот же дубль, разделённый пустыми строками (хвост >=40 символов, разрыв <=2 строки)
    res, blanks, n_gap = [], 0, 0
    pairs = []
    for line in out:
        b = line.rstrip("\r\n")
        pairs.append((b, line[len(b):]))
    for body, eol in pairs:
        t = norm(body)
        if not t:
            blanks += 1
            res.append((body, eol))
            continue
        if blanks <= 2 and len(core(body)) >= MIN_CORE:
            k = len(res) - 1
            while k >= 0 and not norm(res[k][0]):
                k -= 1
            if k >= 0 and norm(res[k][0]) == t and not res[k][0].lstrip().startswith("#"):
                if body.startswith("- ") and not res[k][0].startswith("- "):
                    res[k] = (body, res[k][1])
                n_gap += 1
                continue
        res.append((body, eol))
        blanks = 0
    return "".join(b + e for b, e in res), n_merge, n_head, n_noise, n_gap



def main(argv):
    check = "--check" in argv
    files = [a for a in argv if a != "--check"]
    if not files:
        raise SystemExit(__doc__)
    for f in files:
        p = f if os.path.isabs(f) else os.path.join(MASTER, f)
        old = open(p, encoding="utf-8", newline="").read()
        new, n_merge, n_head, n_noise, n_gap = dedup(old)
        rel = os.path.relpath(p, MASTER).replace("\\", "/")
        if new == old:
            print("%s: чисто (склеек 0, инъекций 0, шумовых 0, разделённых 0)" % rel)
            continue
        before = set(core(l) for l in old.splitlines() if core(l))
        after = set(core(l) for l in new.splitlines() if core(l))
        lost = sorted(before - after)
        if lost:
            print("%s: ОТКАЗ — потеряно %d уникальных строк, файл не изменён" % (rel, len(lost)))
            for l in lost[:5]:
                print("    ", l[:120])
            continue
        if not check:
            tmp = p + ".tmp"
            open(tmp, "w", encoding="utf-8", newline="").write(new)
            os.replace(tmp, p)
        print("%s: склейки %d, заголовки-инъекции %d, шумовые дубли %d, строк %d -> %d, "
              "потеря уникальных строк 0%s" % (
                  rel, n_merge, n_head, n_noise, old.count("\n"), new.count("\n"),
                  " [CHECK-ONLY]" if check else ""))


if __name__ == "__main__":
    main(sys.argv[1:])
