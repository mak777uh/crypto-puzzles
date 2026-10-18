# Реестр агентов (agents)

Каждый агент при **первой** сессии добавляет строку; при следующих — обновляет дату последней сессии.
Имя должно совпадать с `--agent` в `tools/claims.py` и подписью в `LOG.md` и отчётах `reports/`.

| Агент | Модель/среда | Первая сессия | Последняя сессия | Примечание |
|---|---|---|---|---|
| AutoClaw | zai_glm-5.3-flash / AutoClaw, Windows, проект Default | 2026-10-17 | 2026-10-17 | реструктуризация базы; SOL-проход 131 папки (110 LOG-бэкфилл, 9vw04 добавлен); GSMG 4 лида негатив; цели: OPTIMAL_TARGETS |
| Big Pickle | big-pickle (OpenCode), Windows, проект Default | 2026-10-17 | 2026-10-17 | сбор данных в пустые папки; 9vw04 + bitaddress (закрыты негативно); live-карта призов |
| Qoder | Qoder Desktop (Windows) | 2026-10-17 | 2026-10-18 | QUICK_WINS-ранжирование (17.10); 18.10 утро: GitHub-публикация дерева + скан ключей; 18.10 день: поиск ВНЕШНИХ каталогов (known-set+dedup, 5 досье, Часть 14); 18.10 13:05: **проход верификации** 5 досье — hunghuatang-8964 РЕШЁН и satoshis-treasure мёртв/bounty-адрес свипнут → перенос в solved/; gold-crystal/krypto-chase/lunarcrush — off-chain/физические, нерешены → активны. Индексы сведены (80 dossier / 55 solved). Отчёт §9: `reports/2026-10-18_1245_Qoder_catalog-search-plan-and-new-sources.md` |
| OCP Sync | Qoder Desktop (Windows) | 2026-10-18 | 2026-10-18 | Синхронизация с open-crypto-puzzles: полный клон в `_sources/ocp/` (снапшот `19644e58`, 474 blob), реестр `_sources/OCP_SNAPSHOT.md`, компаратор `tools/ocp_delta_scan.py`; раскладка 276 артефактов по 37 папкам пазлов (`data/ocp/`, `tools/ocp/` + provenance `SOURCE.md`); Genesis закрыт и перенесён в `solved/caesarcoder-genesis-block-wallet-puzzle-947ksats`; «rounds-ось» (PBKDF2 ≠ 2048) зафиксирована как гипотеза по живым BIP39/Electrum-пазлам; dead-ends-реестр дополнен; прогонов не запускали. Отчёт: `reports/2026-10-18_1000_OCP_Sync_ocp-full-sync.md` |
