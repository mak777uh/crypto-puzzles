# cryptopuzzles.eth — Easycore и Numbers — ИСПРАВЛЕНО: НЕ решены

Индекс: [MASTER_CATALOG.md](../../MASTER_CATALOG.md) (Часть 6).

## Кратко
- Статус: **закрыты он-чейн (2026-10-19)** — Numbers забран 30.06.2021 (спент 935 532 сат, баланс 0); Easycore — баланс 0 (по каталогу 4×0,25 ETH в 2019 и вывод 0,9991 ETH 10.02.2020; Blockchair даёт противоречивые 0 tx, ETH-RPC недоступны). См. LOG.md 2026-10-19; кандидаты в solved/dead-ends.
- Цепь: ethereum (Easycore) + bitcoin (Numbers)
- Автор: **arpox** (Twitter @Arpoxy), сайт датирован **6 февраля 2019**
- Типы: image-stego, bit-manipulation, mixed-chain
- Что осталось / сложность: сайт не обновлялся с 2019 года — актуальность статусов нужно проверять по блокчейну

## Адреса/эскроу
- Easycore: `0x06460646ca1603a61953eeb385681f5d56401ede` — заявлено **0,5 + 0,5 ETH** (см. сайт)
  — проверка: https://etherscan.io/address/0x06460646ca1603a61953eeb385681f5d56401ede
- Numbers: `1PUzZ61FSVTn12CafJC85Vy1ts3BoFcXdU` — заявлено **9,4 mBTC**
  — проверка: https://mempool.space/address/1PUzZ61FSVTn12CafJC85Vy1ts3BoFcXdU

## Подробности
- `cryptopuzzles.eth` — сайт-репозиторий головоломок автора arpox, доступен по адресам **cryptopuzzles.eth.limo** (ранее .eth.link).
- На главной сказано, что автор разыгрывает часть награды из головоломки **Zden XIXOIO** в пяти головоломках:
  **Gifts, Easycore, Deepest, Robots, Map**; каждая независима, приз **0.25 ETH** + **0.25 ETH** бонус за последнюю решённую.
- **Easycore** (раздел «Unsolved puzzles»): подсказки «Christmas hint:» (картинка easyhint.png) и
  «Second hint: Take 1 bit out of 8» («выньте 1 бит из 8»); призовой адрес `0x06460646…`; SVG-изображение;
  пост в r/bitcoinpuzzles «1.5 ETH five puzzles for Christmas».
- **Numbers** (раздел «Unsolved»): призовой адрес `1PUzZ61…` (9,4 mBTC); PNG-изображение;
  пост r/bitcoinpuzzles «5 mBTC mini number puzzle».
- В разделе «Solved puzzles» перечислены: Robots, Deepest, Map, Gifts, Bruteforce challenge, Matrix, Minimalist,
  Numbers 2, Halloween, Children's games. **Easycore и Numbers там отсутствуют.**
- Автор сам предупреждает: «я не обновляю сайт регулярно, поэтому головоломки в разделе нерешённых могли быть решены — проверяйте блокчейн».

## Источники
- https://cryptopuzzles.eth.limo/
- https://cryptopuzzles.eth.limo/easycore.html
- https://cryptopuzzles.eth.limo/numbers.html
- https://cryptopuzzles.eth.limo/faq.html
- https://www.reddit.com/r/bitcoinpuzzles/comments/e2yz6s/15ethfive_puzzles_for_christmas/
- https://www.reddit.com/r/bitcoinpuzzles/comments/aopj4u/5mbtc_mini_number_puzzle/
- https://twitter.com/Arpoxy

## Исправление каталога (2026-10-16)
- Формулировка каталога «cryptopuzzles.eth (Easycore/Numbers)» в списке **решённых** — **не подтверждена**:
  по первоисточнику обе головоломки находятся в разделе **Unsolved**.
- **Рекомендация:** перенести в открытые и проверить балансы адресов (проверка не выполнена).

## Что осталось нерешённым
- Обе головоломки; актуальное состояние призовых адресов; судьба бонусных 0.25 ETH за последнюю решённую из пяти;
  дальнейшая активность arpox.
- Не подтверждено: что призы вообще были профинансированы (сайт этого не доказывает).

---
## Логирование (обязательно)
См. `../../AGENT_INSTRUCTIONS.md`. Любая значимая находка, прогресс, баланс или решение (полностью либо частично) **должны** быть дописаны сюда с датой и ссылкой на источник. Параллельные агенты обязаны соблюдать тот же протокол.

## История изменений
- 2026-10-16 (deepseek-flash) — папка создана; досье собрано из `MASTER_CATALOG.md`.
- 2026-10-16 (deepseek-flash) — досье переписано после web-исследования (см. ниже).


---

## Обновление балансов (17.10.2026, Big Pickle) — ОБА АДРЕСА ПУСТЫ
- **Numbers** `1PUzZ61FSVTn12CafJC85Vy1ts3BoFcXdU`: recv=944 414 сат, sent=944 414 сат, **balance 0**; полный вывод **30.06.2021** (935 532 сат).
- **Easycore** `0x06460646ca1603a61953eeb385681f5d56401ede`: **0 ETH**; получил 4×0,25 ETH (ноя-дек 2019) и опустошён **10.02.2020** (0,9991 ETH → `0x2579A1a4`).
- **Статус по блокчейну: оба закрыты (выведены)** → устойчиво подтверждает исходную метку каталога «решены»; правка от 16.10.2026 («открыты») опиралась на устаревший сайт. Детали — в LOG.md за 17.10.
