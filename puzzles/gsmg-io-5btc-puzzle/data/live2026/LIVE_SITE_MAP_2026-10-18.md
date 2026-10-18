# gsmg.io — КАРТА ЖИВОГО САЙТА (снято 2026-10-18, Big Pickle)

> **ГЛАВНОЕ:** вопреки прежней пометке в отчётах («gsmg.io припаркован/404»),
> сайт `https://gsmg.io` **ЖИВ** и отдаёт **оригинальные страницы пазла** целиком.
> Раньше мы брали их из Wayback/транскрипций сообщества — теперь есть первоисточник
> с точными байтами текста.

## Обход сайта (что отвечает 200)

| URL | Что это | Размер |
|---|---|---|
| `/` | Новая (2026) «shutdown»-главная с анимацией | 35 777 B HTML |
| `/puzzle` | `puzzle.png` (та же, что в Wayback 2020) | PNG sha256 `38125bbdf1ea58b9b30b075bc6bf71e4089d04bba37098317e47097e2f2a1830` |
| `/theseedisplanted` | Phase 1: 8 плиток-ребусов + скрытая форма | 832 B HTML |
| `/choiceisanillusioncreatedbetweenthosewithpowerandthosewithoutaveryspecialdessertiwroteitmyself` | **PHASE 2 + PHASE 3** (полный текст) | 9 205 B HTML |
| `/89727c598b9cd1cf8873f27cb7057f050645ddb6a7a157a110239ac0152f6a32` | **SalPhaseIon + Cosmic Duality** | 4 536 B HTML |
| `/robots.txt` | ASCII-арт кролика + `Disallow: /` | 1 379 B |

404 (`text/plain`, тело `Hello :-)`): `/phase1verification` (GET и POST), `/register`, `/help-center`,
`/phase2`, `/phase3`, `/final_stage`, `/TheArchitectChoice`, `/puzzlesupposethisone`,
`/youarewrongaboutdirhunt`, `/youmeandself`, `/youmeiandself`, `/salphaseion`,
`/4f7a1e4efe4bf6c5581e32505c019657cb7b030e90232d33f011aca6a5e9c081` (и с `/`), `/sitemap.xml`,
а также ~28 других проверенных вариантов имён (полный список в прогоне).

Скачано в `data/live2026/`:
- `theseedisplanted.html`, `choiceisanillusion…iwroteitmyself.html`, `89727c598b9cd1…f6a32.html`
- `img/` — 8 плиток ребуса + `logo_GSMG.png`, `logo_GSMG_restored.png`, `favicon.png`

## Главная страница `/` (новое, 2026)

Вся видимая (статичная) часть — это «смерть» проекта; сцену рисует JS:

- Видимый текст: `A fully automated crypto trading bot` / `To start, register and check out the Help Center.`
  затем финал: **`2017 — 2026`**, **`The lights are off.`**, **`Nine years of chaos ended. One mystery remains.`**,
  ссылка **`Follow the white rabbit →`** → `/puzzle`.
- Терминал (по таймингу): `WARNING: carrier anomaly` → `Trace program: running`.
- «Matrix rain» использует алфавит-строку:
  `01010101010101010101010101010101010101010101010101010101GSMG.IO5BTCPUZZLECHALLENGE`
  (т.е. доступные глифы: 0/1 + буквы `GSMG.IO5BTCPUZZLECHALLENGE`).
- В конце анимации выводится фиксированная **сетка 14×14 из 0/1** и надпись `SYSTEM FAILURE`.
- Задержки в коде: `wait(2442)`, `wait(1441)`, `wait(13950)`, `wait(4100)` — **2442/1441** перекликаются
  с числами пазла.

Фиксированная сетка 14×14 (196 бит, 101 единиц; в коде жёстко задана):

```
0 0 1 1 0 1 0 0 1 0 1 1 0 0
1 1 1 1 0 0 1 1 1 0 1 0 1 1
1 1 0 1 1 1 0 1 0 0 1 0 0 1
0 1 1 0 1 0 0 0 0 1 1 1 0 1
0 1 1 0 0 0 1 1 0 0 0 1 1 0
1 0 0 1 1 0 0 0 1 0 0 0 1 1
1 0 0 1 1 1 0 0 0 1 0 0 0 0
1 1 1 0 0 0 0 0 0 0 1 0 0 0
0 0 0 1 1 1 0 1 1 1 1 1 0 1
1 1 1 1 1 1 0 0 1 1 0 0 0 1
1 1 0 1 0 0 0 0 0 1 1 0 1 1
1 1 1 1 0 0 1 0 1 0 1 1 0 0
0 1 0 1 1 1 0 1 0 0 0 1 1 0
0 1 1 0 1 1 0 1 1 0 1 0 1 1
```

Проверено: не симметрична, 24 «байта» (row-major) = нечитаемый мусор, как картинка — шум
(не QR). Трактуем как декоративную «SYSTEM FAILURE»-плашку; но зафиксирована дословно —
если понадобится, перепроверяемо. (Глифы `GSMG.IO5BTCPUZZLECHALLENGE` — тоже зацепка.)

## `/theseedisplanted` (Phase 1)

```html
<!-- Nice to see you around! Good luck little bunny hunter ;) -->
<img src="/img/black_banking - war.png">
<img src="/img/blue_ca.png">
<img src="/img/blue_dig_i.png">
<img src="/img/blue_lock_lo.png">
<img src="/img/red_crypto_gic.png">
<img src="/img/red_n_you.png">
<img src="/img/red_open_lock_n_ing.png">
<img src="/img/red_t.png">
<div style="display: none"><form method="post" action="/phase1verification">
  <input type="password" name="password"> <input type="submit"></form></div>
```

Плитки (я их **вижу** — зрение есть, все 8 скачаны и прочитаны). Что на них:

| # | файл | цвет | содержимое |
|---|---|---|---|
| 1 | `black_banking - war.png` | чёрный | иконка «банк» (домик с `$`) + подпись **`war`** |
| 2 | `blue_ca.png` | синий | **`CA`** |
| 3 | `blue_dig_i.png` | синий | **`dig i`** + ниже **`+`** |
| 4 | `blue_lock_lo.png` | синий | иконка закрытого замка + **`lO`** (эл-о) |
| 5 | `red_crypto_gic.png` | красный | **`crypto`** / **`gic`** |
| 6 | `red_n_you.png` | красный | **`n you`** |
| 7 | `red_open_lock_n_ing.png` | красный | иконка ОТКРЫТОГО замка + **`n ing`** |
| 8 | `red_t.png` | красный | **`t`** + ниже `-` |

Смысл (уже известен сообществу и подтверждён): плитки — это **ребус на песню Logic «The Warning»**;
перестановка даёт `war`+`ning` → **warning**, `lo`+`gic` → **logic**.
Форма `POST /phase1verification` — **мертва** (404 `Hello :-)`), т.е. проверить ответ сервером больше нельзя.
Пароль phase-1 (из README сообщества): `theflowerblossomsthroughwhatseemstobeaconcretesurface`.

## `/choiceisanillusion…iwroteitmyself` (PHASE 2 + PHASE 3)

Комментарий в HTML: `<!-- You made it to the next step! Good luck little bunny hunter ;) -->`.

PHASE 2 текст дословно: «1... are you looking for the private keymaker?» … /(aaa, connected enf) …,
+ блоб `aes-256-cbc /w base64 sha-256(password)`:

- **PHASE 2 блоб**: 672 B, salt `06286612d43ed7ed` (пароль из README сообщества: `causality`,
  sha256 `eb3efb5151e6255994711fe8f2264427ceeebf88109e1d7fad5b0a8b6d07e5bf`).
- Нортон-абзац: «Any linear electrical network… can be replaced at terminals A–B by an equivalent
  current source **Ino** …» (теорема Нортона) → «5binary code» → «_green_ came _back_» +
  **Bitcoin whitepaper**: «raw data after 4 on row 1616» → `/4 … connected enf`.
- Шахматный FEN: `B5KR/1r5B/6R1/2b1p1p1/2P1k1P1/1p2P2p/1P2P2P/3N1N2 w - - 0 1`
  → «buddhist is forced to move. What will be the next situation?»
- `--> parts 1..7 --> sha-256 -> dgst is the password to enter Phase 3.`
- **PHASE 3 блоб**: 4 112 B, salt `9fbc451d13d071f4` — **совпадает с нашим
  `data/phase23_page_blob_4112B_salt_9fbc451d_b64.txt`** (sha256 префикс `9163a38d8c49038d`) ✔

## `/89727c598b9cd1…f6a32` (SalPhaseIon + Cosmic Duality)

- **SalPhaseIon**: та же сетка из `d/b/i/…` букв; внутри в текст вшиты: `h a b e`-маркеры,
  фраза **`f o u r f i r s t h i n t i s y o u r l a s t c o m m a n d`**, base64 `U2FsdGVkX186tYU0…`,
  фрагмент **`QvX0t8v3jPB4okpspxebRi6sE1BMl5HI8Rku+KejUqTvdWOX6nQjSpepXwGuN/jJ`** (= «SOURCE_4» из issue #111!),
  и `s h a b e f a n s t o o`.
- **Cosmic Duality блоб**: 1 344 B, salt `2d3f6fe06dc950e6` → расшифровка (пароль неизвестен)
  = 1 327 B `cosmic_decrypted.bin`, sha256 `4f7a1e4efe4bf6c5581e32505c019657cb7b030e90232d33f011aca6a5e9c081` (по сообществу,
  но #55/#104 оспаривают — это, возможно, ложное срабатывание паддинга).

## Чего на живом сайте НЕТ

- `phase3.2` артефакт (наш `data/dualite_blob_2448B_salt_eefc4c5b_b64.txt`, 2 448 B, salt `eefc4c5befc1656a`,
  расшифровывается в 2 422 B «gros») — **на сайте его нет**, это более глубокая добыча сообщества.
- `TheArchitectChoice`, `final_stage`, `puzzlesupposethisone`, `youarewrongaboutdirhunt`, `youmeandself(e)` — 404.
- Никаких форм, кроме мёртвой `/phase1verification`.

## Практический вывод

1. Первоисточник доступен → любые сверки «а точно ли так написано на странице» теперь можно
   делать по живым байтам (`data/live2026/*.html`), а не по Wayback.
2. Живая главная (`2017 — 2026`, «One mystery remains», «Follow the white rabbit») — **сигнал оператора,
   что пазл всё ещё открыт и приз не ушёл**; сайт переписан под «смерть» компании.
3. Совпали все три ключевых блоба, которые у нас уже были (phase2 672 B / phase3 4112 B / cosmic 1344 B)
   → наши локальные копии верны; а `dualite`/gros-артефакт — внешний, ищем его источник отдельно.
