# Отчёт: находка живого сайта gsmg.io + полная карта страниц

- **Дата/время:** 2026-10-18 11:37 MSK
- **Агент:** Big Pickle (big-pickle / OpenCode, Windows, DESKTOP-PE9BOJ5)
- **Пазл:** `gsmg-io-5btc-puzzle` (приз жив: `1GSMG1JC9wtdSwfwApgj2xcmJPAwx7prBe` = 1.25649674 BTC)
- **Повод:** запрос Ильи «дай ссылки, я достану инфу» → ревизия внешних источников.

## Главное

**`https://gsmg.io` жив.** Прежняя пометка «припаркован/404» в наших отчётах — ошибочна.
Сайт отдаёт оригинальные страницы пазла напрямую (не Wayback):

| Страница | Что даёт |
|---|---|
| `/` | новая «shutdown»-главная, `2017 — 2026`, «One mystery remains», «Follow the white rabbit» |
| `/puzzle` | `puzzle.png` — **та же**, что у нас (sha256 `38125bbd…`) |
| `/theseedisplanted` | Phase 1: 8 плиток-ребусов (+ мёртвая форма `/phase1verification`) |
| `/choiceisanillusion…iwroteitmyself` | **PHASE 2 + PHASE 3** целиком |
| `/89727c598b9cd1…f6a32` | **SalPhaseIon + Cosmic Duality** целиком |
| `/robots.txt` | ASCII-кролик, `Disallow: /` |

## Что подтвердилось байт-в-байт с нашими локальными копиями

- phase2 блоб: 672 B, salt `06286612d43ed7ed` (пароль `causality`).
- phase3 блоб: 4 112 B, salt `9fbc451d13d071f4` == наш `data/phase23_page_blob_4112B_salt_9fbc451d_b64.txt` ✔
- cosmic блоб: 1 344 B, salt `2d3f6fe06dc950e6` → 1 327 B, sha256 `4f7a1e4e…` (спорно по #55/#104).
- В SalPhaseIon подтверждён фрагмент `QvX0t8v3…GuN/jJ` — это «SOURCE_4» из issue #111.
- Текст-ключи Phase 2 дословно: Нортон (`Ino`), «5binary code», Bitcoin-whitepaper «row 1616»,
  FEN `B5KR/1r5B/6R1/2b1p1p1/2P1k1P1/1p2P2p/1P2P2P/3N1N2 w - - 0 1`, «parts 1..7 -> sha-256».

## Что новое

- **Ребус Phase 1 прочитан визуально (у нас теперь есть зрение):** плитки = `[банк]+war`, `CA`, `dig i +`,
  `[замок]+lO`, `crypto/gic`, `n you`, `[открытый замок]+n ing`, `t -`. Сообщество уже знает ответ
  («The Warning» от Logic; `war`+`ning`, `lo`+`gic`), мы это лишь подтвердили.
- **Сетка 14×14 из 0/1** на живой главной (жёстко зашита в JS, финал анимации «SYSTEM FAILURE»):
  196 бит, 101 единица, не симметрична, как картинка — шум, как байты — мусор. Зафиксирована дословно.
- **Алфавит matrix-rain:** `0101…01` + `GSMG.IO5BTCPUZZLECHALLENGE`.
- Задержки в JS: 2442 / 1441 / 13950 / 4100 мс (2442/1441 — «эхо» чисел пазла).
- **Артефакт `phase3.2` (`dualite_blob_…salt_eefc4c5b`, 2 448 B) на живом сайте отсутствует** — это
  добыча сообщества; его источник по-прежнему неизвестен (единственная реально недостающая вещь,
  на которой стояла формула #111).
- Форма `/phase1verification` **мертва** → серверная проверка ответов отключена.

## Что осталось недоступно мне (нужна помощь Ильи)

1. **Bitcointalk** — `topic=5151725.0` (тред «Anyone working on the GSMG puzzle» / анонс создателя) и
   `topic=5529568.msg65045641`. Прямой доступ у меня блокируется (transport error), через прокси
   `allorigins` отдалось один раз 95 КБ HTML, затем rate-limit 500/522. Нужны тексты тредов.
2. **Telegram** — группа «GSMG Puzzle Solvers» (id 1166734859, ~57 729 сообщений) и аккаунт создателя
   «Jrk Bgrt» (issue #114). Инвайты: `t.me/joinchat/AJXEwEWK9gvhxwkgeXJUVw`, `t.me/+VISqN0kCAvowNDQ0`,
   `t.me/+xxwEPfKG3WYzZDY6`. Нужен JSON-экспорт (в первую очередь сообщения создателя IDs ~63967–70186).
3. **privnote** `https://privnote.com/B27Ul1BF#49BazxQqq` (найден в репозитории) — клиентское
   шифрование + Cloudflare, мне недоступно. Нужен текст из браузера.
4. **YouTube** `https://www.youtube.com/watch?v=Z9A-acu-0y0` (Sharon Gavrielov) — блокируется; нужен
   транскрипт/субтитры.
5. **Discord** сообщества — инвайт и архив закреплённых подсказок.
6. **`gros`-артефакт issue #111** (2 432 B) — спросить у автора `0xyph3r` в issue #111 напрямую.

## Артефакты

- `data/live2026/` — 3 живые HTML-страницы + `img/` (8 плиток ребуса, 3 логотипа).
- `data/live2026/LIVE_SITE_MAP_2026-10-18.md` — карта сайта, сетка 14×14, все блобы и соли.
- Скрипты/дампы: временный каталог (`live_*.html`, `rebus_montage.png`, `grid14.png`).
