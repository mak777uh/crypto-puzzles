# Реестр GitHub-интейков (шлюз)

Правило — `AGENT_INSTRUCTIONS.md`, раздел «GitHub-интейк — обязательный первый шлюз (с 18.10.2026)».
Статусы: `done` | `partial` (бюджет/дедлайн, остаток в `data/github/resume.json`) |
`none` (репо не найдено, проверено по N запросам — шлюз закрыт корректно) |
`legacy` (дампы лежат в старых путях пазла) | `pending` (шлюз ещё не пройден).
Машиночитаемая версия — `_sources/GITHUB_INTAKE_STATUS.json`. Пересборка по диску:
`python tools/github_intake.py status --refresh` (сеть не тратит).

| Дата | Агент | slug | Статус | Репо | API-запросов | HEAD | Дайдест |
|---|---|---|---|---|---|---|---|
| 2026-10-18 | Qoder | 11b-x-1371 | none | 0 | 0 |  | data/github/GITHUB_INTAKE.md |
| 2026-10-18 | Qoder | 9vw04-gem-finder | partial | 3 | 0 |  | data/github/GITHUB_INTAKE.md |
| 2026-10-18 | Qoder | gsmg-io-5btc-puzzle | partial | 4 | 14 |  | data/github/GITHUB_INTAKE.md |
| 2026-10-18 | Qoder | ktimesg-phy-challenge-0-008btc | partial | 4 | 25 |  | data/github/GITHUB_INTAKE.md |
| 2026-10-18 | Qoder | zden-haluska-halv-312ksats | partial | 2 | 0 |  | data/github/GITHUB_INTAKE.md |
