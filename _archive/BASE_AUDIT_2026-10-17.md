# Аудит базы (2026-10-17, 2026-10-17, 18:59, AutoClaw)

Полный проход по каталогу puzzles/ по заданию: инвентаризация, бэкфилл журналов, сверка с внешними реестрами, добавление новых загадок.

## Инвентаризация (на момент прохода)
- Папок пазлов: **130** (после пополнения — **131**).
- README.md: есть во всех 130.
- LOG.md: было у 20 папок, **не хватало 110** → заведены все (см. ниже). Теперь у всех.
- Скелетных README («скелет из OCP», <8 КБ): 18 — список ниже, требуют обогащения.

## Сделано
1. **110 LOG.md заведены** (бэкфилл): стандартная шапка + входная запись с извлечёнными из README данными (статус, приз, типы, difficulty, адрес, источник). Правило «записи в конец, чужое не затирать» соблюдено; существующие 20 логов не тронуты.
2. **Сверка с реестрами**: OCP (floflo777/open-crypto-puzzles, 28 пазлов) — все 28 уже в каталоге, новых нет; agntn/puzzles (реестр, 367 коллекций-записей) — разбор несоответствий.
3. **Новая загадка добавлена**: `9vw04-gem-finder` — Gem Finder 9vw04 (BTC, 0.0202076 BTC, адрес bc1qr5mssp6snmduqp9enx4dzmcxvk7qw83lceyy2v, pubkey раскрыт, ~15 хинтов автора, старт 2024-12-21). README + LOG + data/agntn_9vw04.{md,ts}. Добавлена строка в индекс puzzles/README.md (счётчик обновлён на 131).
4. **Алиасы размечены (дубли НЕ создавались)**:
   - agntn `mineshop` = наш `guntis-vitolins-metamask-8-6eth` (8.612542 ETH, те же слова dutch/fog/parrot) — карточка agntn с хинтами сохранена в data/ пазла, заметка в LOG.
   - agntn `weave/3, /10, /11, /12` = наши `arweave-puzzle-3/10/11/12` — alias-заметки в LOG каждой, карточки weave/N.ts в data/. weave/12 по agntn Claimed (согласуется с нашим «0 AR, мёртвое»).
   - agntn `move-over-brokers` = подстраницы Keir Finlow-Bates (en-*/it-* версии книг); `bits` = 256-адресный пазл (алиас 1000-btc семейства); прочие числовые/модульные слаги реестра — не пазлы.
5. Индекс `puzzles/README.md`: покрытие проверено — все 131 папка в индексе, счётчик обновлён.

## Хвосты (для следующих проходов)
- **18 скелетных README** (обогатить из OCP/agntn/источников): aenigma-shards-nft, andy-bauch-new-money-cog-428ksats, bam-askabitcoiner-seed-cipher, bc1q21-timelock-challenge-l5-100ksats, demint-bitcoin-evangelism, exitonly-challenge-14-30ksats, ftpk-season-4-166usdc, game-of-satoshi-season-1, keysa-crack-the-seed-369ksats, luckylurker-seed-riddles-80ksats, objective-thune-licorne-0-21btc, onfo-forsyth-1btc, pindar-van-arman-cryptoartgan-nft, wares-wallets-solana, wonderabbit-prometheus-1msats, zden-haluska-lvl5-555ksats, zk-guess-chainhackers-31, zodomo-11x11-pixel-puzzles-0-05eth.
- **9vw04-gem-finder**: распарсить сетку 21×50 из картинки поста; прогнать хинты; оракул мгновенный (pubkey известен).
- **weave-пространство**: weave/1 и weave/4 — текстовые загадки (claimed, но серия может продолжаться — следить за реестром).
- MASTER_CATALOG.md: новые строки для 9vw04 не добавлены (структура каталога — части 1-14; безопаснее вносить на ближайшем проходе Qoder/Hark по каталогу).
