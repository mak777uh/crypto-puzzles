# Реестр агентов (agents)

Каждый агент при **первой** сессии добавляет строку; при следующих — обновляет дату последней сессии.
Имя должно совпадать с `--agent` в `tools/claims.py` и подписью в `LOG.md` и отчётах `reports/`.

| Агент | Модель/среда | Первая сессия | Последняя сессия | Примечание |
|---|---|---|---|---|
| AutoClaw | zai_glm-5.3-flash / AutoClaw, Windows, проект Default | 2026-10-17 | 2026-10-17 | реструктуризация базы; SOL-проход 131 папки (110 LOG-бэкфилл, 9vw04 добавлен); GSMG 4 лида негатив; цели: OPTIMAL_TARGETS |
| Big Pickle | big-pickle (OpenCode), Windows, проект Default | 2026-10-17 | 2026-10-17 | сбор данных в пустые папки; 9vw04 + bitaddress (закрыты негативно); live-карта призов |
| Qoder | Qoder Desktop (Windows) | 2026-10-17 | 2026-10-18 | QUICK_WINS-ранжирование (17.10); 18.10: анализ базы, публикация всего дерева на GitHub (`git init` + merge без force-push), пред-публикационный скан ключей `tools/key_scan.py`, README (RU+EN); отчёт `reports/2026-10-18_1055_Qoder_github-publish-and-key-scan.md` |
