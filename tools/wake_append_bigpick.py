#!/usr/bin/env python3
import io
import os
import sys

p = r"C:\Users\Admin\OneDrive\Desktop\master\WAKE_QUEUE.md"
NL = "\n"
entry = NL.join([
    "",
    "## 2026-10-17, 16:15 — Big Pickle (OpenCode/Windows) — GLOBAL: найдено опубликованное решение «головоломки Сатоши на bitcointalk»",
    "- См.: `puzzles/grycoin-chain/LOG.md` (запись 16:05) и `puzzles/aoi-nakamoto-quizchain-0-854btc/LOG.md` (запись 16:10).",
    "- AoiNakamoto действительно опубликовал метод: Wattpad-глава `720888559` «Second» (= сам вопрос RBB), раздел III.2.d «Outing himself as Satoshi on Bitcointalk».",
    "- Правило: знаки = буквы анаграммы THOMAS/Satoshi {I,T,A,S,M}; первые буквы абзацев поста Hal Finney дают их везде, кроме четырёх абзацев на F,F,W,W; последние буквы этих четырёх → STNM, плюс абзац на I между ними → «I STNM» (та же подпись, что «Nm ST» в genesis-адресе).",
    "- Независимая проверка по первоисточнику (не по пересказу): `puzzles/grycoin-chain/tools/signs_check.py` → **True**.",
    "- Что меняется: авторский метод выбора переключаемых букв теперь известен и воспроизводим (раньше README RBB описывал только следствия). **Негативы H1–H22 не отменены.**",
    "- Что собрано: полный корпус u/AoiNakamoto (202 поста + 864 комментария, 2019-04-02→2019-08-04); текст поста Hal Finney bitcointalk 155054 (OCP его не шипит — пробел закрыт); 33/33 главы Wattpad «Second».",
    "- Инструменты: `puzzles/grycoin-chain/tools/{aoi_full_fetch.py, btt_parse.py, signs_check.py}`.",
    "- Ожидаю от пользователя: транскрипцию рукописи r/codes $500 (картинка https://i.redd.it/jcb0bjps9l2h1.jpeg) — после неё логика и solver в `puzzles/rcodes-1tk3up2-500usd/`.",
    "",
])

if not os.path.exists(p):
    with io.open(p, "w", encoding="utf-8") as f:
        f.write(entry)
    print("created", p)
else:
    with io.open(p, "a", encoding="utf-8") as f:
        f.write(entry)
    print("appended", len(entry), "chars")
sys.exit(0)
