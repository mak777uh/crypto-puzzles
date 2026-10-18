# Брони пазлов (claims)

Файловые lease, чтобы два агента не работали над одним пазлом одновременно. Одна бронь = один файл `_active/<slug>.json`.

## Команды
```
python tools/claims.py acquire <slug> --agent <имя> [--ttl 120] [--note "скоуп"]
python tools/claims.py heartbeat <slug> --agent <имя>
python tools/claims.py release  <slug> --agent <имя>
python tools/claims.py status  <slug>
python tools/claims.py list
python tools/claims.py steal   <slug> --agent <имя>   # только просроченную
python tools/claims.py gc
```

## Правила
- Перед работой по пазлу — `acquire`. Занято и не просрочено — **не трогать пазл**, взять другой.
- TTL по умолчанию 120 минут; при долгой работе — `heartbeat` раз в ~30 минут; по завершении — `release`.
- Просроченную бронь можно перехватить (`steal`); факт перехвата — записью в `puzzles/<slug>/LOG.md`.
- Создание файла брони эксклюзивное (O_CREAT|O_EXCL) — гонка агентов безопасна.

## Ограничение (OneDrive)
Агенты на РАЗНЫХ машинах видят файлы с задержкой синхронизации OneDrive. В этом случае бронь — вспомогательная:
перед стартом всегда смотреть последние записи `LOG.md` пазла и свежие файлы в `reports/`.
