# Проверка балансов решённых пазлов (2026-10-19)

Агент: Beam (beam-free / OpenCode)
Скоуп: все адреса из `solved/*/README.md` (61 уникальный адрес), проверка через blockstream.info.

## Ненулевые балансы

| Адрес | Баланс (сат) | Папка | Комментарий |
|-------|--------------|-------|-------------|
| 157dpLJgAAKugukKz8UwBHapM4idyZvnLc | 100 000 000 | onfo-forsyth-1btc | приз 1 BTC, unspent с 2021-06 |
| 36T9H8hJP7xexevqayU9ADxGca7Y5dKquQ | 99 996 681 | natasha-otomoski-1btc | украденный приз, unspent с 2019-08 |
| bc1qnepv9pcnqvndux9h9mcaxvk6u993rc0lew9fpp | 100 000 000 | luckylurker-vault-1 | Vault #2, funded 2026-08-12, unspent |
| 3Jf995GANG4EmFBK89byNNyZdtB3ELXJsZ | 21 021 000 | objective-thune-licorne-0-21btc | приз 0.21021 BTC, unspent |
| 1HB5XMLmzFVj8ALj6mfBsbifRoD4miY36v | 20 148 071 | trivia-brainwallet-0-04btc | hot wallet (26k tx), не приз |
| 16YUMnqAExU7yCCRaE1kfFrc4X9c4dMFjL | 2 027 060 | quizchain2-series | остаток после claim |
| 1Thanksg9t4MRoCH2CM3cArWq26JiNvMY | 2 032 998 | quizchain2-series | claim address, 1 spend |
| 1AndrewYangForPresident2o2ozm6Pzd | 155 400 | satoshi-birthday-7-million-quiz | vanity/burn-адрес |
| 1KDUcZh5Z6H1of4Pwoy5ojJtkQxcQBHhnH | 99 081 | commander-u-puzzle-8-5btc | dust P2PKH (основной приз P2PK) |
| 17oKQHHRxdQBiRaGKCoVDQJfebhPaZV3r7 | 79 638 | luckylurker-vault-1 | остаток от spend vault #1 (2026-08-17) |
| bc1qw8uecdjvuedtkg4s2kku4s2ak9r2cm59khclfr | 1 000 000 | caesarcoder-genesis-block-wallet-puzzle-947ksats | leftover, funded 2026-08-21 |
| 3CcxyPhyvyc3S9UuPfu42GNZLvVVV11Uk8 | 12 510 | iesta-1btc-hidden-in-plain-sight-2018 | dust leftover |
| 13CiiWnD475JHMyY7jc42tEw9KgTsMbr1p | 546 | commander-u-puzzle-8-5btc | dust |

## Вывод
- «Новая» неожиданная живая вода в решённых: **Vault #2 luckylurker (1 BTC, funded 2026-08-12)**, **caesarcoder leftover (0.01 BTC, 2026-08-21)**, **luckylurker остаток 79 638 сат (2026-08-17)** — потенциально стоит вернуть эти папки в `puzzles/` по протоколу (приз пополнен/открыт этап).
- Остальные ненулевые — долгоживущие неразобранные призы/остатки/пыль, уже отражены в README.
- Остальные 48 адресов — 0.