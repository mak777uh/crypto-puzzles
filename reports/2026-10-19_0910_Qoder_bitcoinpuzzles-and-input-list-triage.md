# Триаж bitcoinpuzzles.io и новых ссылок списка — 2026-10-19

Агент: Qoder Desktop (Windows), сессия `ae64fdaf`. Все проверки — read-only; транзакций, трат, публикаций ключей не было.

## 1. bitcoinpuzzles.io #143 «The Last Backup»

- Папка заведена по протоколу: `puzzles/bitcoinpuzzles-io-143-the-last-backup-0-0001btc/` (README, LOG, data, tools).
- Адрес `1LATz4tnX6DSBPqkZEV7NSGvHEMLTjBGtt`: 1 funding tx, **10 000 sat**, 0 трат (mempool.space, 2026-10-19).
- Funding tx `885f238b…788fe3`, блок 963675 (2026-08-23): **батч на 22 выхода**, наш vout #19; OP_RETURN нет.
- Приз на витрине: 92 930 CB ≈ US$37 (баллы платформы).
- Разбор изображения, C2PA (hash mismatch), LSB/OpenStego-негативы — в README/LOG папки.
- **Вывод:** решаемой «быстрой» цели нет; приз 0,0001 BTC.

## 2. Остальные открытые пазлы bitcoinpuzzles.io (он-чейн)

| # | Пазл | Адрес | Баланс | Вывод |
|---|---|---|---|---|
| 92 | Desafio Pinball Espacial | 1L3uXcR63SoQ2Q4KmmpQvMnF95AU9kBq4J | funded 0, tx 0 | адрес **никогда не финансировался**; приз только CB (278 753 CB ≈ $111) |
| 93 | Desafio Misterioso | 1GqGfnKLGXzCn9rB247N5RxDzKWjfUG9N3 | funded 35 711, spent 35 711 (2026-02-10) | **пуст**; приз только CB (253 251 CB ≈ $101) |
| 98 | Million Show Challenge | 1LAdCYjJxgXnDfQymPZfHHv3fHhZpecdvm | funded 42 492, spent 42 492 (2026-02-10) | **пуст**; приз только CB (300 000 CB ≈ $120) |
| 101 | Bitcoin Puzzle 71 | 1MRi4UBYa6aMLn8JrJatMsuXfQrQoMHF7a | funded 0, tx 0 | адрес **никогда не финансировался**; 60 021 CB ≈ $24 |
| 139 | Oobit | 1KKtnqLdK17ndRRwF8zaKZH6FSkSmTN6fk | 0,01545 BTC (funded-unspent) | активный проект Hark — **не дублировать** |
| 143 | The Last Backup | 1LATz4… | 10 000 sat | см. §1 |

Итог: кроме #139 (чужой активный проект) и #143 (0,0001 BTC), BTC на адресах bitcoinpuzzles.io **нет**. Как источник «быстрых денег» список закрыт.

## 3. Новые ссылки из списка Ильи

- **https://github.com/iesta/1BTCPuzzle** — это пазл «Hidden in Plain Sight» 2018 (адрес `37XTVuaWt1zyUPRgDDpsnoo5ioHk2Da6Fs`, старый `3CcxyPhyvyc3S9UuPfu42GNZLvVVV11Uk8`).
  - Он-чейн: `37XTV…` funded 100 204 132 sat, **spent 100 204 132**, 10 tx → **приз снят** (пазл решён в 2018, ср. разбор k06a «Solving 1BTC puzzle»).
  - Старый `3Ccxy…`: funded 100 165 446, spent 100 152 936, остаток **12 510 sat** — пыль, не приз (вероятно, сдача/остаток).
  - **Вывод: мёртвая цель**, в работу не брать. Репозиторий — архив подсказок сообщества, не живой приз.
- **https://github.com/HomelessPhD/AR_Puzzles** — уже учтён в папках arweave #3/#10/#11 (оси отработаны; см. их LOG).
- **https://github.com/HomelessPhD/CorePhylips_CATS** — разобран 2026-10-19: H1/H2 (313 строк) — негатив; пассфраза Corey не восстановима (OCP: ≈1,16·10⁹ кандидатов).
- **https://github.com/HomelessPhD/Wealth_in_Poetry** — активный проект Hark, не дублируем.

## 4. Ложные «живые 1 BTC» в сводке балансов

- `natasha-otomoski-1btc` → адрес `36T9H8hJP7xexevqayU9ADxGca7Y5dKquQ` с 0,99996681 BTC — это **кошелёк решателя** (свип 2019), а не эскроу пазла. Ключа у нас нет; цель нерешаема и не наша. Из кандидатов исключить.
- `bitimage-kitten-photo-puzzle-95ksats` → `bc1qcyrndzgy036f6ax370g8zyvlw86ulawgt0246r` — это **тот же** адрес, что у Corey Phillips (1 001 900 sat), а не отдельный приз 95 000 sat. Дубль; мнемоника публична, неизвестна произвольная пассфраза → не «быстрая» цель.

## 5. Оценка оставшихся «крупных» целей (без изменений)

| Цель | BTC | Блокер |
|---|---|---|
| Ballet / Bobby Lee (2 карты) | 2,0 | физическая половина BIP38, никогда не фотографировалась |
| GSMG.io | 1,256 | исключена указанием Ильи (Beam) |
| Bitaps Shamir | 1,0 | заморожена указанием Ильи |
| LuckyLurker Vault #2 | 1,0 | автор отложил, 0 подсказок; funding tx без OP_RETURN (проверено 19.10) |
| Aoi Nakamoto | 0,777 | потерян текст-источник 30.07.2019; ≈4·10⁸ текстов — негатив |
| Guntis Vitolins | 8,61 ETH | слова вне экрана; GPU — только с ОК Ильи |
| Teikhos | 2,0 ETH | нет пути: нужен публичный ключ, которого нет в OSINT |
| Peter Todd / WIF500 / 1000 BTC | — | криптографически недоступны нашим ресурсам |

## Вывод

1. Каталог на 2026-10-19 не содержит одновременно **живой BTC-приз + известный путь + отсутствие внешнего блокера**. «Быстрых денег» в списке сейчас нет.
2. Все новые ссылки Ильи обработаны: 1BTCPuzzle — решён и пуст; AR_Puzzles — учтён; CATS — негатив; Wealth in Poetry — активный проект Hark.
3. Разумный режим: мониторинг (LuckyLurker, GSMG-OP_RETURN, oobit-подсказки) + возврат к цели при появлении новой подсказки/утечки. Любой прогон — только после регистрации оси в LOG.md и с witness/control.
4. Ключей/seed нет. Транзакций не было. Если ключ появится — только лично Илье.

## Ссылки

- https://bitcoinpuzzles.io/en/puzzles/143
- https://mempool.space/address/1LATz4tnX6DSBPqkZEV7NSGvHEMLTjBGtt
- https://mempool.space/tx/885f238b98937a0bc18675541d59d6b9bef9b69593d8532f3654a667db788fe3
- https://github.com/iesta/1BTCPuzzle
- https://medium.com/@k06a/solving-1btc-puzzle-19feb05385a3
- https://mempool.space/address/37XTVuaWt1zyUPRgDDpsnoo5ioHk2Da6Fs
- https://mempool.space/address/3CcxyPhyvyc3S9UuPfu42GNZLvVVV11Uk8


---

## Дополнение 2026-10-19 09:25 UTC (Qoder) — проверка solved/ на незабранные призы + закрытие cryptopuzzles.eth

### 1. Скан адресов из досье `solved/` (read-only)
Скрипт `tools/solved_balance_scan.py` извлёк 59 BTC-адресов из README/LOG `solved/` (исключая `data/`), опросил mempool.space/blockstream. 10 адресов с ненулевым балансом — все объяснены, **незабранных призов нет**:

| Адрес | Баланс | Что это |
|---|---|---|
| `bc1qnepv9…wlh6fpp` | 1,00000000 BTC | приз **LuckyLurker Vault #2** (не решён; попал в solved/ как ссылка из досье Vault #1) |
| `1HB5XMLmz…miY36v` | 0,20148071 BTC | адрес-пожертвование WikiLeaks (получатель доли Quantris в trivia-brainwallet) |
| `1Thanksg…JiNvMY`, `16YUMnq…MFjL` | 0,0203 / 0,0203 BTC | vanity-адреса выплат победителям quizchain2 (BrainForceOne, DanTheDon83) |
| `bc1qdu8mh9…r6qzad` | 0,00924704 BTC | адрес свипера Genesis-пазла (третья сторона, свип 17.10.2026) |
| `bc1qw8uecd…khclfr` | 0,01000000 BTC | выплата автора CaesarCoder (OCP: не приз) |
| `1AndrewYang…o2ozm6Pzd` | 0,00155400 BTC | vanity-адрес из вопроса квиза Satoshi Birthday |
| `17oKQHHR…PaZV3r7` | 0,00079638 BTC | выплата решателю Vault #1 (17.08.2026) |
| `3CcxyPhy…V11Uk8` | 0,00012510 BTC | пыль старого адреса 1BTC Hidden in Plain Sight |
| `13CiiWnD…TsMbr1p` | 546 сат | пыль Commander U |

Вывод: в архиве `solved/` случайно не осталось оплаченных призов; единственный живой 1 BTC — снова Vault #2 (внешний блокер, подсказки не вышли).

### 2. cryptopuzzles.eth (arpox, 2019) — оба пазла закрыты он-чейн
- **Numbers** `1PUzZ61FSVTn12CafJC85Vy1ts3BoFcXdU`: приходы 09–22.02.2019 (нетто 944 414 сат), **расход 30.06.2021** (tx `8df05cc03ffb0409…`, 935 532 сат) — приз забран, баланс 0.
- **Easycore** `0x06460646ca1603a61953eeb385681f5d56401ede`: Blockchair — balance 0 / 0 tx / never seen; **но** MASTER_CATALOG.md (стр. 589) фиксирует 4 входа по 0,25 ETH (2019) и вывод 0,9991 ETH 10.02.2020. Blockchair для ETH ненадёжен, публичные RPC недоступны — формулировку «не финансировался» снимаю; подтверждён только пустой баланс.
- Записи внесены в `LOG.md`, `README.md` папки и `puzzles/dead-ends-registry/README.md`. Оба — кандидаты на перенос в `solved/` при ревизии.

### 3. AH White «Walking Banks» — официальный сайт мёртв
`walkingbanks.com` отдаёт заглушку Hostinger «Your domain is expired» (HTTP 200, 10 881 байт). Приз жив: 100 000 + 700 000 сат, spent 0. Внешний блокер усилился; запись в LOG.md/README.md.

### Итог
Быстрых денег по-прежнему нет; минус два мёртвых объекта в каталоге. Транзакций/ключей/переборов не было.
