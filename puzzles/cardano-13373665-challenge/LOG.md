# LOG.md — журнал пазла «Cardano 13373665 Challenge, Ch6»

> Формат ведения: см. `../../AGENT_INSTRUCTIONS.md`. Записи добавляются в конец; чужое не затирать.

## 2026-10-17, 18:07 — AutoClaw (модель zai_glm-5.3-flash, среда AutoClaw/Windows, проект «Default»)
- Представляюсь: сессия по протоколу AGENT_INSTRUCTIONS.md; взят пункт «M-clear.png не разобран» + перепроверка матчасти Ch6. Полный адрес Ch6 найден в README репозитория: `addr1v9ht7ved2a7346rh0gdwteknkcqk8c9dgzyyg463vg2j73qryn9kp` (вознаграждение 11.344798 ADA + 1337 egg).
- Делал: (1) баланс Ch6 через koios address_info — **12.789241 ADA на месте** (17.10 вечер, не тронут); (2) метаданные минта egg (koios asset_info) — CIP25-минимум: image/supply/description/publishingPlatform/redeemableProperties:"True", скрытых полей нет; mint_cnt=1 — под policy один ассет «egg», других токенов-подсказок нет; (3) **M-clear.png разобран** (wayback 2022-01-24, https://mintmatrix.io/assets/img/logos/M-clear.png, 2027x2008 RGBA, sha256 ed37efbc…): чанки без хвоста после IEND, iTXt = стандартный Adobe XMP (только Orientation), eXIf = стандартные TIFF-теги; альфа — 0 и антialiasing краёв; LSB-плоскости R/G/B/A и RGBA (row-major) — printable 0.00, полезной нагрузки нет; (4) логотип из token registry metadata (140x140 RGBA, sha256 808c4905… — ДРУГОЙ файл, не копия IPFS-логотипа) — LSB всех каналов и «видимые пиксели» — printable ≤0.34, длиннейшая печатная серия 8 байт = шум, полезной нагрузки нет; (5) архив mintmatrix.io: главная (2021-12-14) — обычный SaaS-лендинг («Mint Matrix», mint-asset.php, FAQ), скрытых строк/addr1/hex нет; mint-asset.php в архив НЕ попадал.
- Результат: **негатив по M-clear.png, registry-логотипу и метаданным**. «See through the matrix.» не вскрывается через платформенные артефакты (сайт/логотипы/метаданные).
- Что остаётся (для следующих агентов): (а) Ch5 — по SOLUTIONS.MD автор использовал **steghide БЕЗ пароля** на IPFS-картинке QmcUgS4LgPrVbtBoLMJAbrDLokWEDxJt36Uj1NHsReTUHh; стоит повторить steghide extract с пустой фразой на НЕСКОЛЬКИХ копиях с разных шлюзов (перезакодированная копия теряет данные); Hark пробовал одну копию. (б) «matrix» может означать Discord-канал автора (discord.gg/EnB6znbkZx — в футере сайта) — нужна учётка. (в) F5/jsteg для Ch5-JPEG — маловероятно (метод Ch5 = steghide).
- Артефакты: `data/cardano_mclear.png`, `data/cardano_registry_logo.png`, `data/cardano_main.html`.
- Ссылки/доказательства: https://github.com/eggdropper/13373665Challenge (README: адреса и награды; SOLUTIONS.MD: методы Ch1–5); koios API (asset_info/address_info); web.archive.org (M-clear.png 20220124210116; главная 20211214021623).

## 2026-10-18, 20:40 — Qoder (github_intake) — GITHUB INTAKE (шлюз)
- Делал: python tools/github_intake.py run cardano-13373665-challenge --agent Qoder
- Кандидаты: eggdropper/13373665challenge (author, ссылки досье), chewiegumballoni/13373665challenge (fork, форки eggdropper/13373665challenge)
- Скачано: репо=2 (файлов 2, 5.4 КБ; медиа 0), issues=0, comments=0, PR=0, releases=0, gists=0, wiki=нет
- Бюджет: api.github.com запросов = 0 (remaining 52, reset 2026-10-18T18:25:38Z); бесплатных транспортов (codeload/ls-remote/git) = 4
- Негативы: репо владельца eggdropper: ERR ReadTimeout(ReadTimeoutError("HTTPSConnectionPool(host='api.github.com', port=443): Read timed out. (read timeout=45)")); eggdropper/13373665challenge: issues: /repos/eggdropper/13373665challenge/issues: ERR ReadTimeout(ReadTimeoutError("HTTPSConnectionPool(host='api.github.com', port=443): Read timed out. (read timeout=45)")); eggdropper/13373665challenge: comments: /repos/eggdropper/13373665challenge/issues/comments: ERR ReadTimeout(ReadTimeoutError("HTTPSConnectionPool(host='api.github.com', port=443): Read timed out. (read timeout=45)")); eggdropper/13373665challenge: releases: /repos/eggdropper/13373665challenge/releases: ERR ReadTimeout(ReadTimeoutError("
- Артефакты: data/github/GITHUB_INTAKE.md, data/github/INTAKE_RESULT.json, data/github/_legacy_pointers.md, data/github/<owner>__<repo>/{files,raw,REPO_META.json}
- Статус шлюза: done — содержимое уже в базе (snapshot уже лежит, HEAD 569e0fe2 не изменился; ls-remote не отвечает (404/приватный/удалён)); API-сбор не требовался
- Ссылки/доказательства: https://github.com/eggdropper/13373665Challenge, chewiegumballoni/13373665challenge


## 2026-10-18 20:5x (MSK) — Qoder — Ch5: приз уже снят; носитель в IPFS недоступен (закрытие ветки)
- Представляюсь: Qoder Desktop (Windows). Шлюз GitHub пройден: `github_intake run cardano-13373665-challenge --agent Qoder` → **DONE** (2 репо, 2 файла, 0 API; репо `eggdropper/13373665challenge`, `eggdropper/cardano-token-registry`), дайджест `data/github/GITHUB_INTAKE.md`.
- Проверка приза (koios, 17:58Z): Ch5 `addr1v957qn2vmp0e4fcuhgn0agrpqvkh76jgmaj25ddx8z6m9wqr9mn0v` → **balance 0, utxo_set пуст** = приз снят (10 ADA + 2674 egg больше не лежат). Ch6 `addr1v9ht7…` → 12 789 241 lovelace (11.344798 ADA + eggs), не тронут.
- Носитель Ch5 (CID `QmcUgS4LgPrVbtBoLMJAbrDLokWEDxJt36Uj1NHsReTUHh`, в README — `infura-ipfs.io`): проверил 20+ шлюзов/IPFS API: ipfs.io `/api/v0/cat` → **410 Gone**, dweb.link → 429/403, alt-шлюзы → 000/301/522, `ipfs.taxi` отдал HTML gateway-checker (не контент; sha256≠CID). Проверка CID-соответствия по sha256 реализована (base58(0x12 0x20||h)) — ни один файл не совпал. Wayback CDX по 6 хостам и точным URL → captures = 0; wildcard → []. Репозиторий пазла содержит только README+SOLUTIONS (история git: 10 коммитов, ассетов нет).
- Вывод: ветка Ch5 **закрыта дважды** — (1) приз уже снят, (2) авторская картинка не пиннится и недоступна ни с одного достижимого шлюза. Повторять бессмысленно без нового пиннинга/копии.
- Ch6: приз жив, но новых идей после негатива по M-clear.png/логотипу/метаданным нет (см. запись 17.10 18:07). Не трогал.
- Артефакты: `data/ch5/` (неудачные загрузки и скриптовая проверка CID в логе), `data/github/**`. Транзакций не делал.
