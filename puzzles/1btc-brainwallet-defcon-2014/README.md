# «1 BTC Brainwallet» (DEFCON 2014)

Индекс: [MASTER_CATALOG.md](../../MASTER_CATALOG.md) (Части 1-8).

## Кратко
- Статус: **open / исторический**
- Цепь: bitcoin
- Приз: 1 BTC
- Опубликовано: 2014 (DEFCON)
- Типы: brainwallet, book-cipher, word-selection
- Что осталось / сложность: 20 подсказок из книги → brainwallet; книга — обязательный материал

## Адреса/эскроу
- Адрес в каталоге не зафиксирован — требуется уточнить (B43).

## Источники
- 2014 — DEFCON, пазл с призом 1 BTC (первоисточник в каталоге не указан — требуется найти).

## Подробности
- Механизм: 20 подсказок, распределённых по книге, сводятся к одной фразе-brainwallet.
- Классический brainwallet-подход: SHA-256 от фразы → приватный ключ, без BIP39-деривации.
- Пазл 2014 года: если приз не снят, это один из старейших активных brainwallet-челленджей.

## Зацепки / следующий шаг
- Найти первоисточник DEFCON 2014 и название книги
- Проверить, снят ли приз (если снят — перевести в «закрытые»)
- Оценить, доступна ли книга в электронном виде

---
## Логирование (обязательно)
См. `../../AGENT_INSTRUCTIONS.md`. Любая значимая находка, прогресс, баланс или решение (полностью либо частично) **должны** быть дописаны сюда с датой и ссылкой на источник. Параллельные агенты обязаны соблюдать тот же протокол.

## История изменений
- 2026-10-16 (deepseek-flash) — папка создана; базовое досье собрано из `MASTER_CATALOG.md` (Части 1-8).

## Обновление (2026-10-16, deepseek-flash — web-исследование): точный источник НЕ подтверждён
- Тип: отрицательный результат + вероятное соответствие
- Суть:
  - По формулировке «20 подсказок из книги → brainwallet, 1 BTC, DEFCON 2014» **прямой источник не найден**.
  - Ближайшее подтверждённое совпадение по теме и году — **«The One Bitcoin Heist»**: пазл-челлендж **2014 года на 1 BTC**,
    который **Джозеф Габай** разбирал на **DEF CON 33** («Making a custom Hashcat module to solve a decade-old puzzle challenge») —
    задача потребовала написать **собственный модуль Hashcat** и была решена спустя десятилетие.
  - На **DEF CON 23 (2015)** был отдельный доклад **Райана Кастеллуччи** «Cracking Cryptocurrency Brainwallets»,
    посвящённый именно brainwallet-ам.
  - **Комбинация «20 подсказок из книги» не встречается ни в одном из этих материалов.**
  - Возможна путаница с документированным brainwallet-пазлом **2017 года на 0,04 BTC** (12 тривиа-загадок:
    ответы 1-10 = passphrase, 11-12 = salt scrypt в brainwallet.io; автор `Kierkegaard_Soren`, решил `Quantris` за 21 576 секунд) —
    но там **12 подсказок**, а не 20, и это не DEFCON 2014.
- Источники:
  - https://media.defcon.org/DEF%20CON%2033/DEF%20CON%2033%20presentations/Joseph%20Gabay%20-%20The%20One%20Bitcoin%20Heist%20Making%20a%20custom%20Hashcat%20module%20to%20solve%20a%20decade-old%20puzzle%20challenge.pdf
  - https://infocondb.org/con/def-con/def-con-33/the-one-bitcoin-heist-making-a-custom-hashcat-module-to-solve-a-decade-old-puzzle-challenge
  - https://media.defcon.org/DEF%20CON%2023/DEF%20CON%2023%20presentations/DEF%20CON%2023%20-%20Ryan-Castellucci-Cracking-Cryptocurrency-Brainwallets.pdf
  - https://www.reddit.com/r/bitcoinpuzzles/comments/7asy51/brainwallet_puzzle_004_btc_reward/
- Не подтверждено: «DEFCON 2014» как место объявления; «20 подсказок из книги»; адрес.
- **Рекомендация:** переименовать запись в **«The One Bitcoin Heist (2014)»** и пометить статус **«решён (доклад DEF CON 33)»**,
  либо запросить исходную ссылку у автора каталога.
