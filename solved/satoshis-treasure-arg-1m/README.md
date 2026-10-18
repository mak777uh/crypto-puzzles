# Satoshi's Treasure (2019) — глобальный ARG на $1 000 000 в BTC

**Тип**: многоуровневый ARG + физический scavenger hunt: 11 «ключей» (шифротекстов), каждый даёт координаты
сундука с USB-накопителем/паролем; победитель получает оставшиеся монеты.
**Приз**: ~**$1 000 000 в BTC** (на апрель 2019 ≈ 198 BTC) в призовом фонде игры; часть ключей вскрыта в 2019.
**Статус по нашим данным (2026-10-18)**: **не закрыт** — в сообществе зафиксированы нераскрытые/скрытые ключи
(в таблице репозитория есть «The Hunted Key» без даты релиза; FAQ: «There are hidden keys already released.
Confirmed by Eric on telegram»). При этом **официальный домен `satoshistreasure.xyz` не отвечает с этой машины**
(curl 000), то есть игра фактически без поддержки — нужен снимок web.archive.org для финального вердикта.

## Что уже известно (из сохранённых источников)
- Создатели (публичные аккаунты): @DoveyWan, @wheatpond, @secparam (Everstake/«Satoshi's Treasure»).
- Игровой токен сообщества: STM (Magellan Clan) — торгуют ключами.
- Инструменты: Shamir-объединение ключей (`satoshistreasure.xyz/ssss`), Blockstream-спутник (`onfray.info`).
- Разгаданные ключи (методы): Jade (pass=orbit, offline QR + словарь), Bismuth (cosmos), Mamoru (blackhole),
  Leporine (8--piece puzzle image + zipped gif). Первый ключ claimed ~2019-04-19 (Leaprate).
- Критика легитимности: CoinGeek (2019-04-16) — вопросы к доказательству наличия средств и безопасности.

## Вердикт для нашей базы (2026-10-18, Qoder)
Каталожная позиция с **неподтверждённым статусом**. Призовой ончейн-адрес в найденных материалах не опубликован,
поэтому «есть ли деньги» не проверено. Ось для следующего прохода — web.archive.org: полный дамп сайта и wiki,
извлечение призового адреса(ов) → проверка баланса через blockstream.info. Если баланс > 0 и ключи не вскрыты —
папка остаётся активной; если нет — переносим в `solved/` с причиной `dead`.

## Источники (открыты/собраны 2026-10-18)
- Репозиторий сообщества (прочитан, копия в `data/mingrui_repo_readme_2026-10-18.md`): https://github.com/mingrui/satoshis_treasure
- Официальный сайт (не отвечает 18.10.2026): https://satoshistreasure.xyz/ ; https://www.satoshistreasure.club/
- Wiki: https://elementaryvoice.com/satoshistreasure/doku.php
- Reddit: https://www.reddit.com/r/satoshis_treasure/ ; https://www.reddit.com/r/CryptoCurrency/comments/bdtq4t/satoshis_treasure_the_hunt_is_on_for_1_million_in_bitcoin/
- Пресса: https://finance.yahoo.com/news/satoshi-treasure-global-puzzle-1-160027127.html ;
  https://www.theblock.co/news/business/2019-04-18-proof-of-work-satoshis-treasure-20080 ;
  https://www.businessinsider.com/bitcoin-scavenger-hunt-satoshis-treasure-promises-1-million-prize-2019-5 ;
  https://coingeek.com/satoshis-treasure-game-offers-1m-prize-but-seems-problematic/ ;
  https://www.leaprate.com/the-first-keys-for-the-1-million-satoshi-treasure-claimed/
- Gist с методом словарной атаки: https://gist.github.com/johncantrell97/bbab69bbde03d22eb8323fd94cd46db0
- Изображение-пазл Leporine: https://i.imgur.com/CbkjEaj.jpg

## Что дальше
1. web.archive.org: `satoshistreasure.xyz/k1..k11`, страница призового кошелька, FAQ про «hidden keys».
2. Извлечь адреса → баланс-чек (blockstream.info) → вердикт.
3. Сверить с `dead-ends-registry` после вердикта.

Хроника: см. LOG.md.

## Обновление (2026-10-18, Qoder) — ВЕРИФИКАЦИЯ: офф-чейн / сайт мёртв
- Тип: статус / баланс.
- Суть: через web.archive.org единственный верифицируемый on-chain адрес (`1899BGHGR4…`, бонус $100 за hidden-ключ)
  показывает funded=spent=1 020 000 сат → **баланс 0**. Остальные «адреса» в seal.html — ложные (чексумма не проходит).
  Основной ~$1M фонд — физическая выдача по ключам, единого live-адреса нет; сайт недоступен (архив 2019–2022).
- Проверено: да (blockstream.info + чексумма base58; артефакты в `data/archive/`).
- Влияние: активного ончейн-оракула нет → перенесена в `solved/` (off-chain/defunct). Хроника: см. LOG.md.
