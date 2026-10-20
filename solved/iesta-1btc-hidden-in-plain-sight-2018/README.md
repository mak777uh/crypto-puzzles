# 1BTC Puzzle «Hidden in Plain Sight» (iesta/1BTCPuzzle, 2018)

Индекс: [MASTER_CATALOG.md](../../MASTER_CATALOG.md). Источник: ссылка Ильи от 18.10.2026 — https://github.com/iesta/1BTCPuzzle (создан 25.05.2018, обновлён 28.05.2018).

## Кратко
- Статус: **закрыт — приз снят 16.08.2018** (проверка Qoder 18.10.2026).
- Цепь: bitcoin
- Приз: 1 BTC (фактически 100 148 121 сат)
- Типы: image-stego, word-cloud, bip39-seed, brainwallet, word-selection
- Публикация: Reddit r/Bitcoin, 21.05.2018 — https://www.reddit.com/r/Bitcoin/comments/8kk0pa/1_btc_is_hidden_in_this_puzzle_good_luck/

## Адреса/эскроу
- Основной: `37XTVuaWt1zyUPRgDDpsnoo5ioHk2Da6Fs` — funded 100 204 132, spent 100 204 132, 10 tx → **баланс 0** (blockstream, 18.10.2026).
- Старый: `3CcxyPhyvyc3S9UuPfu42GNZLvVVV11Uk8` — funded 100 165 446, spent 100 152 936, 13 tx (остаток ~12 510 сат).
- Ключевое событие: tx [`2b1858ed…0d4d80`](https://blockstream.info/tx/2b1858ed27dce111d6712f3ca5a8d3bbc3d97d2c2cfe7858400b1bbaa70d4d80), 16.08.2018 02:34 UTC — вход 100 148 121 сат, выходы 98 000 000 на `31hK4EvopK8mYYXZ4zeSKmpSNz5bSdZPhC` + 2 146 451 на `33JcD412AN5wTSuw7aSUwYv6RqS7kwJHtv`. После этого адрес пуст.

## Механизм (из репозитория)
- Картинка-облако слов из слов whitepaper Сатоши, «scaled by Log N».
- 9 подсказок: выбросить ≥ половины слов; думать парами; Code easily, attack early; Lost transaction costs *almost* users; `00212121`; Try +1; Almost open; бонус «look within… X marks the spot»; `-1`.
- В README репозитория выписаны BIP39-слова, найденные в изображении, список подсказок и отвергнутые гипотезы сообщества (шрифт Work Sans, капитализированные слова и т.д.).
- 00212121 — сумма BTC в tx `2607c7ae…`, возможный путь m/49'/0'/21'/21/21 или пароль.

## Вывод
Приз ушёл через три месяца после публикации (16.08.2018), решения сообщество не опубликовало; обе версии адреса пусты/почти пусты. Работать нечего — папка хранится как историческая. Любые будущие «решения» этого пазла не имеют он-чейн ценности.

## Источники
- https://github.com/iesta/1BTCPuzzle
- https://www.reddit.com/r/Bitcoin/comments/8kk0pa/1_btc_is_hidden_in_this_puzzle_good_luck/
- https://medium.com/@k06a/solving-1btc-puzzle-19feb05385a3 (попытка разбора из README)
- blockstream.info API (балансы/транзакции, 18.10.2026)

---
## Логирование (обязательно)
См. `../../AGENT_INSTRUCTIONS.md`. Любая значимая находка/прогресс/решение — дописывать сюда с датой.
