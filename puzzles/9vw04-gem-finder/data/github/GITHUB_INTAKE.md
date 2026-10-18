# GitHub-интейк: 9vw04-gem-finder

- Дата/время: 2026-10-18 13:33 local (2026-10-18T10:33:35Z)
- Агент: Qoder
- Команда: `python tools/github_intake.py run 9vw04-gem-finder --agent Qoder`
- **Статус шлюза: partial** — исчерпан --api-budget (0 запросов)
- Бюджет: api.github.com = 0 запросов (remaining 34, reset 2026-10-18T10:33:40Z); бесплатных транспортов = 3
- Объём: файлов 0 (0 Б), медиа 0

## 1. Репозитории

| owner/repo | роль | источник | ветка | HEAD | issues | комм. | PR | rel. | gists | wiki | ★ | подписч. | форки | открыто | pushed | лицензия | размер | путь |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| agntn/puzzles | community | ссылки досье | main | decdd4db | 0 | 0 | 0 | 0 | 0 | нет |  |  |  |  |  |  | 0 Б | `data/github/agntn__puzzles` |
| floflo777/open-crypto-puzzles | registry | ссылки досье | main | 19644e58 | 0 | 0 | 0 | 0 | 0 | нет |  |  |  |  |  |  | 0 Б | `../../_sources/ocp` |
| canalqb/puzzle_bc1qr5mssp6snmduqp9enx4dzmcxvk7qw83lceyy2v | community | ссылки досье | main | 1c180a1f | 0 | 0 | 0 | 0 | 0 | нет |  |  |  |  |  |  | 0 Б | `data/github/canalqb__puzzle_bc1qr5mssp6snmduqp9enx4dzmcxvk7qw83lceyy2v` |
| canalqb/agentehermes | community | ссылки досье | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | не собран |
| canalqb/blogforlinkedin | community | ссылки досье | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | не собран |
| canalqb/bot_telegram | community | ссылки досье | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | не собран |
| canalqb/puzzle | community | ссылки досье | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | не собран |
| canalqb/puzzle-67-neon | community | ссылки досье | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | не собран |
| onyxdeveloper/webpack-simple | community | ссылки досье | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | не собран |

## 1b. Уже собрано ранее — НЕ перекачивать

- `canalqb/puzzle_bc1qr5mssp6snmduqp9enx4dzmcxvk7qw83lceyy2v` → `puzzles/9vw04-gem-finder/data/external/github/canalqb-puzzle/`
- `agntn/puzzles` → `puzzles/9vw04-gem-finder/data/external2/github2/`

## 2. Индекс issues (по updated desc)

- индекс не строился (нет собранной выдачи по квоте либо репозитории легаси-дампы)


## 3. Цитаты с проверяемыми константами (адреса/hex/формулы)

- нет (или не собрано по бюджету)

## 4. Новое против нашего досье (требует проверки; НЕ подтверждение)

- в текстах дампов ничего, чего нет в README/LOG пазла, не обнаружено

## 5. Медиа репозиториев

- медиа не распаковано (--no-extract, легаси-дампы или лимит --max-mb)

## 6. Внешние не-GitHub ссылки (топ 40)

- нет (в распакованном содержимом не найдено)

## 7. Release-ассеты / gists / wiki

- пусто по этим каналам

## 8. Негативы и пропуски (обязательный раздел)

- кандидаты отсечены как шум одного владельца (39 из 48): canalqb/briefcase, canalqb/canalqb.github.io, canalqb/canalqb_wallet, canalqb/cpuminer, canalqb/cpuminer-multi, canalqb/electrum_config, canalqb/engaja, canalqb/ESP_ambiente…
- репо владельца agntn: пропущено (исчерпан --api-budget (0 запросов))
- форки agntn/puzzles: пропущено (исчерпан --api-budget (0 запросов))
- не собрано (сверх --max-repos 3): canalqb/agentehermes, canalqb/blogforlinkedin, canalqb/bot_telegram, canalqb/puzzle, canalqb/puzzle-67-neon, onyxdeveloper/webpack-simple
- agntn/puzzles: не собрано: исчерпан --api-budget (0 запросов)
- canalqb/puzzle_bc1qr5mssp6snmduqp9enx4dzmcxvk7qw83lceyy2v: не собрано: исчерпан --api-budget (0 запросов)

## 9. Как освежить / продолжить

- `python tools/github_intake.py run 9vw04-gem-finder --agent <имя>` — повтор стоит 0 запросов (ETag/304)
- `python tools/github_intake.py status 9vw04-gem-finder` · `plan 9vw04-gem-finder --no-net`
- содержимое репо: `data/github/<owner>__<repo>/files/`, сырой JSON: `…/raw/`, медиа-индекс: `…/media_index.md`
- легаси-дампы этого пазла: `_legacy_pointers.md`
