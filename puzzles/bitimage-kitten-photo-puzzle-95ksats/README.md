# Bitimage (Kitten Photo Puzzle)

Индекс: [MASTER_CATALOG.md](../../MASTER_CATALOG.md) (Части 1-8).

## Кратко
- Статус: **open**
- Цепь: bitcoin
- Приз: ~0,00095 BTC
- Типы: image-stego, brainwallet, bip39-seed
- Что осталось / сложность: seed спрятан в фотографии котёнка; связь с инструментом bitimage автора Corey Phillips

## Адреса/эскроу
- Адрес в каталоге не зафиксирован — требуется уточнить (B42).

## Источники
- 2019 — Corey Phillips, bitimage (инструмент) — https://github.com/coreyphillips/bitimage
- 2019 — твит Andreas Antonopoulos с фото котёнка (первоисточник подсказки)

## Подробности
- Механизм: seed-фраза спрятана в фотографии котёнка, опубликованной в твите Andreas Antonopoulos.
- Связано с инструментом `bitimage` того же автора, что и B16 (Corey Phillips kitten passphrase) — возможно пересечение.
- Оценка приза ~0,00095 BTC — мелкий, но полезен как калибровочный пример image→seed.
- Важно разделять: B16 (passphrase-пазл на 1 001 900 сат) и B42 (bitimage, ~95 000 сат) — **разные** записи каталога.

## Зацепки / следующий шаг
- Найти оригинальный твит и фото в исходном разрешении
- Прогнать bitimage по фото (все режимы) и проверить адреса
- Уточнить адрес-эскроу для проверки баланса

---
## Логирование (обязательно)
См. `../../AGENT_INSTRUCTIONS.md`. Любая значимая находка, прогресс, баланс или решение (полностью либо частично) **должны** быть дописаны сюда с датой и ссылкой на источник. Параллельные агенты обязаны соблюдать тот же протокол.

## История изменений
- 2026-10-16 (deepseek-flash) — папка создана; базовое досье собрано из `MASTER_CATALOG.md` (Части 1-8).

## Обновление (2026-10-16, deepseek-flash — web-исследование): ВАЖНОЕ РАЗДЕЛЕНИЕ ПРИЗОВ
- Тип: детализация + исправление
- Суть:
  - Проект **`bitimage`** Кори Филлипса («A picture is worth a thousand satoshis») превращает **любой файл** в BIP-39-мнемонику
    через **data URI** файла и генерирует из неё Bitcoin-ключи.
  - Вдохновением автор прямо называет стеганографию **Андреаса Антонопулоса** в его твите с фотографией котёнка (**май 2015**).
  - На базе этой техники создано **два разных приза**:
    1. **0,01 BTC** — кошелёк с **BIP39-парольной фразой (passphrase)**: адрес `bc1qcyrndzgy036f6ax370g8zyvlw86ulawgt0246r`,
       **не тронут** (плюс докапитализация 0,000019 BTC в апреле 2025). Это та же задача, что B16 /
       [corey-phillips-kitten-passphrase-1msats](../corey-phillips-kitten-passphrase-1msats/README.md).
    2. **0,00095133 BTC** — адрес `bc1q57euh23y3qs2f9d5mtwpax5lqecfvrdkqce82a`, **вскрыт через 6 дней** после финансирования
       (585 488 секунд), claim tx `49638d16a21133febb093580527e50039eee630e2c4918a0654a71ef437ad093`.
  - **Механизм:** файл → data URI → SHA-256 → энтропия BIP-39 → мнемоника → ключ по пути `m/84'/0'/0'/0/0`
    (техника `sha256-to-bip39-entropy`). Для приза 0,01 BTC дополнительно требовалась **BIP-39 passphrase**.
  - **SHA-256 исходного изображения:** `b988e0881a0211222e83f3e2a4bfac695c951bf96aa33ec112fab6992f5e7343`, 265 456 байт.
    Архив: https://web.archive.org/web/20210520115853id_/https://pbs.twimg.com/media/CGDHoYiU0AEQXze.jpg
  - Значение entropy: `1808d35318ac7cb98b69ff9779b699d6a631f15e0b353ac89b7c4020774832ed`;
    открытый ключ решённого приза: `021209b131dfbd1efcfe15b1d1e92002653f5fc98e9ff6cb73a0d70153dbe58463`.
- **Исправление каталога:**
  - сумма **0,00095 BTC относится именно к решённому** призу (адрес `bc1q57eu…`), а не к открытому;
  - спрятана не «seed», а **BIP-39-мнемоника**, выведенная из data URI фотографии;
  - фотография котёнка — твит **Антонопулоса**, но пазл создал **Кори Филлипс** (не Антонопулос).
- Источники:
  - https://github.com/coreyphillips/bitimage
  - https://corey-lyle-phillips.medium.com/part-1-3-turn-your-photos-into-bitcoin-private-keys-addresses-57669771cf7a
  - https://twitter.com/aantonop/status/603701870482300928
  - https://github.com/agntn/puzzles/issues/31
- Проверено: да — проект, техника, твит-первоисточник, оба адреса, факт решения одного из призов и суммы.

## Досье agntn/puzzles (16.10.2026)

Перенесено из реестра [@agntn/puzzles](https://puzzles.agntn.dev/collections/bitimage) (raw: https://puzzles.agntn.dev/collections/bitimage.md). Ниже — разбор первоисточника: механика, кто решал, что проверено.

- `id`: "bitimage/kitten"
- `chain`: "bitcoin"
- `address`: "bc1q57euh23y3qs2f9d5mtwpax5lqecfvrdkqce82a"
- `sourceUrl`: "https://corey-lyle-phillips.medium.com/…"
- `startedAt`: "2019-07-03 02:48:04"
- `status`: Status.Solved
- `prize`: 0.00095133
- `pubkey`: compressed("021209b131dfbd1efcfe15b1d1e92002653f5fc98e9ff6cb73a0d70153dbe58463")
- `key`: derivation("m/84'/0'/0'/0/0").entropy(

> Corey Phillips turned photographs into seeds in 2019. The kitten fell in a week. The second image needs a passphrase nobody has posted.

## The puzzle

Corey Phillips wrote a three part series on turning a photo into a private key. Hash the image bytes, use the hash as BIP39 entropy, derive along `m/84'/0'/0'/0/0`. Then he funded two addresses from two images and posted them. The first image was Andreas Antonopoulos's kitten tweet. Solved in six days. The second adds a BIP39 passphrase on top of the image hash, and it's still open.

## What the records carry

This is the collection that exercises the entropy part of the key builder. The kitten record has a derivation path, no phrase, and an `entropy` block with the hash and where it came from:

```ts [src/collections/bitimage/kitten.ts]
export const bitimagePuzzleKitten = puzzle({
  id: "bitimage/kitten",
  chain: "bitcoin",
  address: "bc1q57euh23y3qs2f9d5mtwpax5lqecfvrdkqce82a",
  sourceUrl: "https://corey-lyle-phillips.medium.com/…",
  startedAt: "2019-07-03 02:48:04",
  status: Status.Solved,
  pubkey: compressed("021209b131dfbd1efcfe15b1d1e92002653f5fc98e9ff6cb73a0d70153dbe58463"),
  key: derivation("m/84'/0'/0'/0/0").entropy(
    "1808d35318ac7cb98b69ff9779b699d6a631f15e0b353ac89b7c4020774832ed",
    source(
      "https://twitter.com/aantonop/status/603701870482300928",
      "Antonopoulos kitten tweet (May 2015)",
    ),
  ),
  prize: 0.00095133,
  solvedAt: "2019-07-09 21:26:12",
  assets: assets({
    puzzle: "kitten/puzzle.jpg",
    sourceUrl: "https://twitter.com/aantonop/status/603701870482300928",
  }),
});
```

A path and an entropy hash aren't a secret in the library's sense. `secretOf` wants a phrase, so `hasPrivateKey()` is `false` here and `verify` answers `unavailable`. The hash is the puzzle's statement of what the seed was built from, kept for whoever wants to reproduce the derivation. The second record marks its passphrase as `Required` instead of inventing one.

## Status

One solved, one open. The open one is `bitimage/kitten-passphrase`, 0.01 BTC, and the image is in `assets/bitimage/`.

## Every puzzle

One page each: the record, the transactions and the live balance.

<collection-puzzles collection="bitimage">

</collection-puzzles>
