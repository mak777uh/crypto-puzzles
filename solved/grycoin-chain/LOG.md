# LOG.md — журнал пазла «Grycoin chain»

> Формат ведения: см. `../../AGENT_INSTRUCTIONS.md`. Записи добавляются в конец; чужое не затирать.

## 2026-10-17, 14:31 — Big Pickle (big-pickle / OpenCode, Windows, сессия «Проект по умолчанию»)
- Делал: (1) независимая верификация якорей Grycoin block 2 по архивному треду; (2) поиск флип-правила против префикса MD5 `3c6` — дешёвые семейства, не перечисленные в H1–H22 досье Quizchain.
- Источник треда: `assets/sources/grycoin/aoinakamoto-2019-08-03-cleczc.md` из github.com/agntn/puzzles (транскрипт Arctic Shift, сверен с pullpush; реддит-тред https://www.reddit.com/r/Grycoin/comments/cleczc/grycoin_block_2/).
- Результат (позитив, воспроизведение): текст Question воспроизведён байт-в-байт — 10 абзацев, склейка `\n\n`, без ведущих/хвостовых пробелов; MD5 = `7759227d7406d8230d7e3a8f7b9846d7` — совпадает с якорем автора («первые семь цифр 7759227»). Диапазон: от первого «I» («I thought I would write…») до точки после «method». Подтверждает (в третий раз независимо), что автор хешировала с LF, хотя заявила 13 10 13 10.
- Результат (отрицательный): **33 926 вариантов против `3c6` — 0 значимых совпадений**:
  - семейство A (78): swap/capitalize/lowercase всех вхождений каждой буквы алфавита;
  - семейство B (32): детерминированные правила в стиле Stage One — условие ∈/∉ {I,T,A,S,M} по первой букве × единица абзац/предложение × режимы (first→lower, last→upper / обратный / тоггл / инверсия всех букв) × склейки `\n\n` и `\r\n\r\n`;
  - семейство C (1024): тоггл регистра всего абзаца, все подмножества из 10 абзацев (склейка `\n\n`);
  - семейство D (32 768): тоггл регистра целого предложения, все подмножества из 15 предложений — 10 совпадений с `3c6` = статистический шум (математическое ожидание 32768/4096 ≈ 8), и база в этом семействе пересобрана одиночными пробелами, т.е. вне сертифицированного якоря;
  - семейство E: глобальные (swap-all, upper, lower).
  - Экстраполяция: для «границевых» флипов результат уже был известен (H19: 2^30 × 10 склеек = 10,7 млрд, префикс `3c6` прошли 2 621 368, адрес — 0), наш прогон закрывает дополнительные структурные классы (буква-идентичность, целый абзац/предложение, правило Stage One как таковое).
- Вывод: решение Grycoin-2 не является ни «флипом границы», ни «флипом буквы-идентичности», ни правилом Stage One с каким-либо тривиальным условием. Остаются только семантические гипотезы «знаков Сатоши» (H3/H6/H7/H12–H14/H16/H17 в досье Quizchain) — перебор не поможет; идти надо через раскрытие автором «решения головоломки Сатоши на bitcointalk» (цитата u/AoiNakamoto от 2019-08-03 в треде: «obvious if you know the solution to Satoshi's bitcointalk puzzle, which I revealed already»).
- Артефакты: `tools/anchor_check.py` (реконструкция и верификация якоря 7759227), `tools/solve_3c6.py` (семейства A–E), `data/aoinakamoto-2019-08-03-cleczc.md` (первисточник треда).
- Ссылки/доказательства: https://github.com/agntn/puzzles/blob/main/assets/sources/grycoin/aoinakamoto-2019-08-03-cleczc.md ; якори в комментариях u/AoiNakamoto (тред от 2019-08-03).
- Проверено: да (MD5-верификация, воспроизводимо скриптами из tools/).

## 2026-10-17, 15:40 — Big Pickle (big-pickle / OpenCode, Windows, сессия «Проект по умолчанию»)
- Делал: (1) дособрал **полный корпус u/AoiNakamoto** — предыдущая выгрузка упиралась в `limit=100` Arctic Shift и обрывалась на 2019-05-18, т.е. не покрывала первый запуск Quizchain; (2) достал **исходный текст поста Hal Finney (bitcointalk topic 155054)** — тот самый артефакт, который OCP прямо называет отсутствующим; (3) вытащил **оглавление Wattpad-истории «Second» (35 глав)** и скачал 11 ключевых.
- Источники: `https://arctic-shift.photon-reddit.com/api/{posts,comments}/search?author=AoiNakamoto` (пагинация по `before`); `https://bitcointalk.org/index.php?topic=155054.0`; `https://www.wattpad.com/apiv2/storytext?id=<chapter>`.
- Результат (сбор данных, новый):
  - `data/as_aoi_posts_full.json` — **202 поста**, 2019-04-02 → 2019-08-04 (весь эксперимент: Satoshi birthday 7M quiz → Quizchain 1 (blocks 1–77) → Quizchain2 (1–77) → Grycoin chain (1–2) → Shutting Down);
  - `data/as_aoi_comments_full.json` — **864 комментария** (прежде в папке было 100);
  - `data/btt_155054.html` + `data/btt_155054.md` — полный текст «Hal Finney, Bitcoin and me» (27.05.2013), 20 сообщений треда, отпарсено `tools/btt_parse.py`;
  - `data/wattpad_toc.txt`-список (в LOG ниже) и `data/wattpad_*.txt` — 11 глав, в т.ч. **761570746 «The Satoshi Code»** (полный разбор genesis-адреса + **частичные MD5 для plaintext-элементов: `cc9485a` и `d78c92f`**), 757574334 «Thomas and Satoshi» (анаграмма THOMAS↔Satoshi, I/M как «nonce», IBM/HAL, Voldemort), 732405709 «Genesis Block Mystery» (Lerner, extra nonce 4 vs 43 нуля), 747478016 «Satoshi mystery».
- Результат (сбор данных, карта пазла — ранее в каталоге этого связного пересказа не было):
  - **Одна и та же механика у обеих стадий block 77: сохранить весь длинный текст и перевести регистр ровно у тех букв, которые несут «знаки Сатоши».** Stage One = текст поста Hal Finney 155054 (решена третьим лицом 07.08.2019, адрес `19TbyN…` свипнут); Stage Two = RBB 0,777 BTC = финальная версия главы Wattpad «Second» (до сих пор funded).
  - AoiNakamoto: «I explained the method used and the result in detail» — **метод+результат опубликованы**, но в скачанных главах и в реддит-корпусе самой разгадки «знаков» я не нашёл; отдельные главы Wattpad (ogлавление 35 шт.) скачаны не все — **остаётся незакрытый шаг: докачать остальные главы «Second» и поискать там публикацию метода**.
  - Следы метода в имеющемся: Hint two в ca6jxv (перестановка первых/последних 4 слов → «Today I come out. If you want to know Satoshi's true identity, recognize the signs.»); «the solution to Satoshi's puzzle is published» (правка ca6jxv); «either I am wrong about what the genesis block and the Bitcointalk post say or people don't get it even after having the solution explained» (глава 762380140 «Starting Up»).
  - Полезное для решения Stage One (бесплатно, без перебора): в тексте 155054 есть как минимум две явные опечатки — **«facinating»** (fascinating) и **«moter neurons»** (motor). Плюс Aoi: знак = функция символ→глиф многозначно, а здесь — обратно (буква→признак). Кандидаты на «знаки»: слова с ошибкой/необычной орфографией и необычные заглавные.
- Результат (отрицательный): публикации метода «знаков» в скачанном материале **нет**; «The Satoshi Code» оказался разбором genesis-адреса (первый run, block 77), а не поста Hal Finney.
- Артефакты: `tools/aoi_full_fetch.py` (пагинация Arctic Shift), `tools/btt_parse.py` (парсер bitcointalk), `data/as_aoi_{posts,comments}_full.json`, `data/btt_155054.{html,md}`, `data/wattpad_*.txt`.
- Следующий шаг (оптимальный, без перебора): докачать все главы Wattpad-истории «Second» (ID смотреть в списке глав из `wattpad_717956015.html`, regex `wattpad\.com/(\d+)-[a-z0-9\-]+`) и найти опубликованный AoiNakamoto разбор «знаков» в посте 155054 — он напрямую сужает набор переключаемых букв для RBB Stage Two.
- Проверено: да (все файлы локально, парсеры воспроизводимы).

## 2026-10-17, 16:05 — Big Pickle (big-pickle / OpenCode, Windows, сессия «Проект по умолчанию»)
- Делал: (1) докачал все оставшиеся главы Wattpad-истории «Second» (22 шт. → всего 33/33 в `data/wattpad_*.txt`, оглавление в `data/wattpad_toc.txt`); (2) **нашёл и проверил опубликованное AoiNakamoto решение «головоломки Сатоши на bitcointalk»** — то самое, на которое ссылается цитата 2019-08-03 «which I revealed already»; (3) независимо воспроизвёл правило на первоисточнике.
- **Где раскрытие:** Wattpad-глава `720888559` «Second» (= сам вопрос RBB), разд. **III.2.d «Outing himself as Satoshi on Bitcointalk»**. Скачано: `data/wattpad_720888559.txt`.
- **Содержание раскрытия (впервые в каталоге):**
  - «Знаки» = буквы анаграммы THOMAS↔Satoshi = **{I, T, A, S, M}** (H, O из Satoshi тоже входят; M берётся из Thomas).
  - Первые буквы абзацев поста Hal Finney дают эти знаки везде, **кроме четырёх абзацев, начинающихся на F, F, W, W** — «those are the only ones where we don't recognize the signs», их и надлежит разглядеть.
  - **Последние буквы этих четырёх абзацев → S T N M**, плюс стоящий между ними абзац, начинающийся на I («I made an attempt to create my own proof of work based currency, called RPOW») → **«I STNM»**.
  - Дальше: STNM = способ подписать «Satoshi Nakamoto»; «Nm ST» — та же подпись, вычитанная автором в genesis-адресе. WW = UUUU = «four U, for you»; FF — «оставлено как упражнение».
  - Прямая цитата автора в комментарии (`as_aoi_comments_full.json`): «There is no way to dispute that if you take all the paragraphs not starting with a letter in "Satoshi" and look at the last letters of these you get STNM.»
- **Независимая проверка** (`tools/signs_check.py`, работает от `data/btt_155054.md`, т.е. от первоисточника, а не от пересказа): 16 абзацев поста, первые буквы `I F F W I W T A T S M A T I A T`; вне набора знаков ровно `[2,3,4,6]` → `FFWW`; их последние буквы → **`stnm`**; абзацы на I — 1, 5, 14 (нужный — 5-й, между 4-м и 6-м). **Совпадение с пересказом автора: True.**
- Значение для пазла: подтверждает механику «оставь весь текст, переведи регистр у немногих букв, несущих знаки» и показывает, **как искать эти буквы** (первые буквы абзацев + последние буквы абзацев вне набора знаков). Для RBB Stage Two (0,777 BTC, текст = та же глава `720888559`) это даёт структурную подсказку вместо чистого перебора. Уже известные негативы (H20 — 1 474 560 абзацевных окончаний и др.) остаются негативами — правило автора им не противоречит, но и готового ответа не даёт.
- Важная оговорка: текст на Wattpad сегодня ≠ тексту 2019-07-30 (Aoi 30.07 убрала один твист и пере-hешировала; README досье фиксирует modifyDate 24.07.2019). Скачанная глава — кандидат на базу, не эталон; сверять по `tools/`-якорям досье.
- Артефакты: `tools/signs_check.py` (независимая верификация правила), `data/wattpad_toc.txt` (оглавление 33 глав), `data/wattpad_*.txt` (все главы).
- Следующий шаг: передать находку в досье RBB (`puzzles/aoi-nakamoto-quizchain-0-854btc/README.md`) и в WAKE_QUEUE — там правило ищут как «case-flip rule», не зная, что метод опубликован в главе-же-вопросе.
- Проверено: да (скрипт `signs_check.py` воспроизводим, вывод «True»).
