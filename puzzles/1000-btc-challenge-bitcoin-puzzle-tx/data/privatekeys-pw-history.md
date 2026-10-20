# История пазла (выжимка с privatekeys.pw/puzzles/bitcoin-puzzle-tx)

Источник: https://privatekeys.pw/puzzles/bitcoin-puzzle-tx (проверено 2026-10-19).
Оригинальное описание: saatoshi_rising на BitcoinTalk (один пост, 2017-04-27, 58 мин после регистрации).

## Хронология (с tx-ссылками)

- **2015-01-15** — транзакция `08389f34c98c606322740c0be6a7125d9860bb8d5cb182c02f98461e5fa6cd15` распределила средства по 256 адресам (P2PKH, 160-бит HASH160).
- **2017-07-11** — средства #161–#256 переехали (`5d45587cfd1d5b0fb826805541da7d94c61fe432259e68ee26f4a04544384164`) на тот же набор адресов в нижнем диапазоне — вероятно, из-за коллизий HASH160 выше #160.
- **2019-06-01** — создатель потратил по 1000 сат с #65,#70,#75,#80,#85,#90,#95,#100,#105,#110,#115,#120,#125,#130,#135,#140,#145,#150,#155,#160 (`17e4e323cfbc68d7f0071cad09364e8193eedf8fefbcbd8a21b4b65717a4b3d3`), раскрыв их публичные ключи on-chain — для сравнения сложности с/без PK.
- **2023-04-16** — неизвестный (возможно владелец) увеличил награды за нерешённые пазлы в 10 раз (`12f34b58b04dfb0233ce889f674781c0e0c7ba95482cca469125af41a78d13b3`): #66 → 6.6 BTC, … #160 → 16 BTC.
- **2024-09-12** — **#66 (6.6 BTC)** решён `1Jvv4yWkE9MhbuwGUoqFYzDjRVQHaLWuJd` (`8c8ec6b3511c62500ea9b3a1c30ca937e15d251b55d30290a2a6da2f1124f3fb`), но исходная транзакция была заменена (`57a88f47e4c047740b782a5562fca143ce85de0373cbff3a7d406e9ae7fc2f5f`), остаток 0.66 BTC ушёл `15XVN6hFkzGdUTY1XcsYKXxRezjARwyBQx` (`d77d86bfa52607656ee08fba49ca3fc08421210e11d7fbddf77ab521e863b601`) — кейс sniping.
- **2025-02-21** — **#67 (6.7 BTC)** решён `bc1qfk357t8n045f8mwx672rx2re4pftm5gmjzdwq7` (`0be77ec8bec331da8750c8b715085c6cf6c374ca31f829a515c62b9846e32986`), транзакция замайнена напрямую без мемпула.
- **2025-04-06** — **#68 (6.8 BTC)** решён `bc1qfwpccz2udt3efk7y2wt9l44h34cs5yevjc80lk` (`a5635eb2205bd3024e55156ee353110415829d1c6bc947f42bfa162488b0eb08`), тоже private mining.
- **2025-04-30** — **#69 (6.9 BTC)** решён `bc1qlp0z45ctphhz0kywpmw3x2kjy7umhyfawxctah` (`651d171e1b103501f57563c2c12a9154e7659e2d9c72c87e92c6609d8213c07a`), публичный broadcast привёл к заменам (`65f5f2c358651ee12c983051423f9925e1339b8ef52b93e23943e26e80609827`, `6102b9d3c9a8e40c16ef6eab8c5c8a6819ffac8fc0d22fc850c674863ae5e65c`), приз украл `15g7XHM6u921DvvPrgguxYkxDL8ruPGHXZ` (`a52c5046f3097a8c2bd3b9889df2fb47b104d47a16cc679d3357feec003db753`).
- **2026-07-28** — **#135 (13.5 BTC)** решён RetiredCoder (~5 мес. на 200 GPU), ключ `6d9392a16883f90903d5f78da57af07eb2` опубликован 29.07.2026 в Mini-puzzle #7 (bitcointalk 5589799).

## Связанные пазлы (с страницы)
- Mini-puzzle for #120, #125, #130 — SOLVED
- 80-bit private key puzzle — SOLVED
- Mini-puzzle #4–#7 — SOLVED

## Операционный риск
Frontrunning/sniping подтверждён кейсами #66 и #69 — победители потеряли призы. Защита: private mining / MARA Slipstream.<|end|><|start|><|start|>assistant to=write<|channel|>analysis <|constrain|>xml<|message|><rfl:parameter name="path">
C:\Users\Admin\OneDrive\Desktop\master\puzzles\1000-btc-challenge-bitcoin-puzzle-tx\data\privatekeys-pw-top-solvers.md