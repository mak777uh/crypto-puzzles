# Каталог криптозагадок (master)

Главный справочник: [MASTER_CATALOG.md](MASTER_CATALOG.md).
Очередь/автопробуждение: [WAKE_QUEUE.md](WAKE_QUEUE.md) — только текущая задача; отчёты проходов — [reports/](reports/README.md).
Пазлы (активные): [puzzles/README.md](puzzles/README.md).
**Решённые/закрытые/тупиковые (не работать без новых данных): [solved/INDEX.md](solved/INDEX.md).**
**Ранжированный список быстрых целей (17.10.2026): [QUICK_WINS_2026-10-17.md](QUICK_WINS_2026-10-17.md).**

Инструкции для агентов: [AGENT_INSTRUCTIONS.md](AGENT_INSTRUCTIONS.md) — включая протокол параллельной работы:
брони пазлов `python tools/claims.py` ([claims/](claims/README.md)), реестр агентов [agents/REGISTRY.md](agents/REGISTRY.md).

## Карта базы (с 17.10.2026)
| Путь | Назначение |
|---|---|
| `puzzles/<slug>/` | активные пазлы: README.md (досье), LOG.md (хроника), tools/, data/ |
| `solved/<slug>/` | решённые/закрытые/тупиковые; индекс — solved/INDEX.md |
| `WAKE_QUEUE.md` | только «Текущая задача» самобудильника |
| `reports/` | отчёты проходов: один проход = один файл |
| `claims/` | брони пазлов (файловые lease, TTL) |
| `agents/` | реестр агентов |
| `_archive/` | старые журналы и отработанные отчёты |
| `_sources/` | внешние дампы и handoff-материалы |
| `tools/` | общие скрипты (claims.py и др.) |
