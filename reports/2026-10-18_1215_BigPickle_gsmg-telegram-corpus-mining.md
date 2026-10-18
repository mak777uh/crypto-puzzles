# GSMG 5 BTC — разбор полученных источников (Telegram-корпус, bitcointalk, README)

Дата: 2026-10-18 12:15 MSK · агент: **Big Pickle** (deepseek-v4.1-flash-free / OpenCode, DESKTOP-PE9BOJ5)
Пазл: `gsmg-io-5btc-puzzle` (бронь BigPickle, heartbeat выполнен)

## 1. Что было на входе

Пользователь передал ранее недоступные материалы:

- `Downloads/ZaStoGram/ChatExport_2026-10-18 (2)/result.json` — **полный экспорт Telegram-группы
  «GSMG Puzzle Solvers»**: 65 654 сообщения, 628 отправителей, 2019-04-20..2026-10-18 (33.2 МБ).
- `Downloads/bitcointalk (1).csv` — тред bitcointalk topic 5151725 (13 постов).
- `Downloads/README.md` — README сообщества.
- `Downloads/ZaStoGram/*` — прочее (в основном не относится к GSMG; не трогал).

## 2. Главный результат: расшифрован бинарный road-map создателя

Сообщение создателя в группе (id **8446**, 2023-02-24T02:20:03, 1448 символов `0`/`1`) декодировано:

> сборка бит -> байты -> **побитовый реверс каждого байта + реверс порядка байт** -> ASCII

Результат:

```
yellow blue primes matrixsumlist lastwordsbeforearchichoice yinyang
we wont give away the password its in front of your eyes but you're not seeing it
very last step is a true give away promised
```

Это официальный маршрут финальной фазы и он согласуется с устными подсказками («password is in front of your
eyes», «once you hit ying yang…»). Артефакт: `data/jrk_reveal_decode_2026-10-18.md`,
скрипт: `tools/gsmg_jrk_reveal_decode_2026-10-18.py`.

## 3. Состояние искусства сообщества (2026-08..10)

Из выжимки ключевых постов (`data/telegram/STATE_OF_ART_2026.md`):

- **Аутентифицированный объект ровно один**: `btcseed` payload — Bifid-плейнтекст SEG-1 (570 символов,
  sha256 `15d62c82…dd8d0507`), сведённый к **96 состояниям** (4 control × 24 carrier, одинокий `z` на поз. 98).
- **`chain4` (1151 B) и `cosmic` (1327 B, `4f7a1e4e…`) — фантомы/паддинг-хиты** (подтверждается и нашим
  разбором #111).
- **Стена одна**: не хватает interpretive-правила, превращающего `btcseed`-96 в ключ. Сообщество прямо
  пишет: «нужна зацепка, а не вычисления»; 469 762 048 кандидатов на yinyang-бинаризацию — 0.
- Верифицированный нами оракул сохранён: опубликованный uncompressed-pubkey
  `04f4d1bb…33559` -> hash160 `a9553269572a317e39f0f518cb87c1a0ee1dbae4` = адрес приза `1GSMG1JC9…`.

## 4. Ограниченный прогон (гипотеза H-SP1) — ноль

**Гипотеза**: 96-байтовый AES-блоб SalPhaseIon (salt `3ab585348552415d`) = AES-256-CBC-шифр приватного
ключа приза, пароль — токен, буквально лежащий на самой странице («password in front of your eyes»).
Плюс тот же пул — для внутреннего 3.2-блоба (salt `b45a5e3d827593ca`).

**Ось**: 159 паролей-кандидатов (токены страницы `thispassword`, `lastwordsbeforearchichoice`,
`matrixsumlist`, `enter`, `shabef`, `thepassword`, `four first hint is your last command`, известные пароли
предыдущих стадий, их sha256-хексы, перестановки-конкатенации) × KDF {md5, sha256} × {EVP-IV, явный IV
`14f23fd58189ad7ee1d794ad8cc16d7d`} -> плейнтекст должен дать 32-байт ключ / WIF / 64-hex, hash160 которого
равен адресу приза.

**Результат**: 1 272 расшифровки, **0 попаданий** (∅). Оракул и положительные контроли проверены.
Скрипт: `tools/gsmg_sp1_password_probe_2026-10-18.py`.

Вывод: пароль SP-блоба **не** лежит в виде простого токена на странице; это согласуется с выводом сообщества
(«пароли SP и 3.2 лежат вне вычислимого диапазона»).

## 5. Закрытые/уточнённые пункты

- **Decentraland estate 955** — скачана сцена (`bin/game.js`, `scene.json`, аудио). Кастомный код = 10 кубов +
  синий `TextShape("GSMG.IO \n5 BTC PUZZLE CHALLENGE")` + клик-воспроизведение mp3. Скрытых подсказок в
  сцене нет (закрывает пункт «Decentraland scene files» из списка сообщества). Артефакты:
  `data/decentraland_2026-10-18/`.
- **`beta.gsmg.io`** — сейчас не резолвится (DNS). «3 private share links + 2 JS bundles» недостижимы напрямую.
- **README сообщества** — побайтово идентичен нашей копии (нового нет).
- **bitcointalk** — посты сохранены (`data/bitcointalk/bitcointalk_posts_full.md`). Полезны два: #8
  (2025-09-19, «финальный кусок» = парафраз монолога Архитектора) и #12 (2026-10-15, независимый аудит:
  «остаётся одна формула, зависящая от `cosmic_A`/`cd3fea3d…`, который никто не публиковал»).

## 6. Артефакты

- `data/telegram/` — полный корпус + индекс (`README_TELEGRAM_CORPUS.md`) + выжимки.
- `data/jrk_reveal_decode_2026-10-18.md` — декод road-map создателя.
- `data/bitcointalk/` — CSV + полный текст постов.
- `data/decentraland_2026-10-18/` — scene.json, estate_955.json, game_custom_source.js.
- `data/README_community_full_2026-10-18.md`, `data/README_diff_vs_repo_copy_2026-10-18.txt`.
- `tools/gsmg_jrk_reveal_decode_2026-10-18.py`, `tools/gsmg_sp1_password_probe_2026-10-18.py`.

## 7. Что осталось (честная граница)

Приватный ключ приза по-прежнему неизвестен. Остаются ровно те зацепки, что и у сообщества:

1. interpretive-правило для `btcseed`-96 (нужна подсказка, не CPU);
2. пароль к SP-блобу (salt `3ab585348552415d`) — вне простого пула (проверено здесь);
3. пароль к внутреннему 3.2-блобу (salt `b45a5e3d827593ca`);
4. «envelope 74c974e3…» (96 B) — в корпусе упомянут, но байтов не опубликовано;
5. `cosmic_A`/`cd3fea3d…` — фантом (нет байтов ни в одном публичном форке).
