# Цикл Big Pickle — мониторинг эскроу всего портфеля
## 2026-10-17, ~23:25 МСК (20:25 UTC) — обновление балансов + закрытие открытой задачи cryptopuzzles.eth

- **Агент:** Big Pickle (deepseek-v4.1-flash-free / OpenCode, Windows, DESKTOP-PE9BOJ5)
- **Инструмент:** `tools/balance_check_fast.py` (blockstream + blockchain.info для BTC, blockscout для ETH; 8 воркеров, 4,7 с на весь портфель).
- **Снимок:** `tools/balance_check_2026-10-17_2320_bigpickle.txt`.

### Главное (изменения статусов)
1. **`cryptopuzzles-eth-easycore-numbers` — ОБА адреса пусты.** Проверка была явной открытой задачей прошлой сессии.
   - **Numbers** `1PUzZ61FSVTn12CafJC85Vy1ts3BoFcXdU`: recv = sent = **944 414 сат**, balance **0**; полный вывод **2021-06-30 11:55 UTC** (935 532 сат out).
   - **Easycore** `0x06460646ca1603a61953eeb385681f5d56401ede`: **0 ETH**; 4 входа по 0,25 ETH (28.11–31.12.2019) и полное опустошение **2020-02-10 13:21 UTC** (0,9991 ETH → `0x2579A1a4…`).
   - **Вывод:** по блокчейну оба **закрыты (выведены)** → подтверждает исходную метку каталога «решены»; правка от 16.10.2026 («открыты»), опиравшаяся на сайт, не учитывала движение средств. Записано в LOG + README папки; рекомендация каталогу — вернуть «решено» (с оговоркой: одиночный вывод не 100 %-е доказательство solve, но суммарно аргумент сильный).
2. **Ложная тревога снята: `genesis-block-wallet` — это dust-релей, не статичный эскроу.** Адрес `bc1qfkhx02…` постоянно принимает ~569 сат и пересылает дальше; 17.10 в 03:40 UTC одним tx собрано 121 вход → 935 266 сат out, в 05:43 пришло 935 266 и ушло 935 034. `SPENT-EMPTY` здесь — нормальное поведение, **не** solve. (Совпадает с прежним снимком: funded=sent=947 220, tx=121.)
3. **Крупнейшие призы целы, трат нет:**
   - **WIF500** `1PfNh5fRcE9JKDmicD2Rh3pexGwce1LqyU` — **500,00035446 BTC (50 000 035 446 сат), 0 потрачено** (5-я по величине позиция в портфеле, добавлена в чекер).
   - **Quizchain RBB** — 777 000 000 сат (0,777 BTC), 0 трат.
   - **GSMG** — 125 649 674 сат (recv 876 003 172 / sent 750 353 498 — автор периодически снимает; не solve).
   - **bitaps-shamir** — 100 016 775 сат; **luckylurker-vault-2** — 100 000 000 сат; **onfo-forsyth** — 100 000 000 сат.
   - **Peter Todd bounties** — 4 адреса: 27 734 251 + 11 576 888 + 10 026 873 + 10 026 873 = **59 364 885 сат (0,5936 BTC)**.
   - **Trithemius** — 3 124 630 сат; **SLM Glimmer** — 3 177 700 сат; **kTimesG** — 800 000 сат.
   - ETH: **guntis 8,612542 ETH**, **arweave-11 1,0 ETH**, **crypto-puzzles-2018-2 0,05 ETH**.

### Исправления/поддержка
- В `tools/balance_check_fast.py` **исправлен битый адрес** `peter-todd-1` (был `35Snmmy3uhaer2kyjeCezqU1EE4zo9fP9T` → 400/404; правильный `35Snmmy3uhaer2gTboc81ayCip4m9DT4ko`) и **добавлены** отсутствовавшие крупные адреса: wif500, quizchain-rbb, trithemius, slm-glimmer, ktimesg-phy, peter-todd-2/3/4.
- Не удалось: `cryptopuzzles-easycore-numbers` — адреса теперь проверены (см. п.1); `warpwallet-ch1` и `cryptopuzzles-eth-mBTC` показаны SPENT-EMPTY (warpwallet решён в 2015; `1PUzZ61…` = Numbers, уже разобран выше).

### Артефакты
`tools/balance_check_2026-10-17_2320_bigpickle.txt` (сырой снимок 37 строк), обновлённый `tools/balance_check_fast.py`, записи в `puzzles/cryptopuzzles-eth-easycore-numbers/{LOG.md,README.md}`.
