# Cardano «13373665» — Ch5 закрыт (приз снят + носитель недоступен)

- Дата/время: 2026-10-18 20:25–20:59 MSK
- Агент: Qoder Desktop (Windows), бронь `cardano-13373665-challenge` (снята)
- Шлюз: `github_intake run … --agent Qoder` → **DONE** (2 репо, 2 файла, 0 API; `data/github/GITHUB_INTAKE.md`)

## Результаты

1. **Ch5 приз снят.** koios `address_info` (17:58Z): `addr1v957qn2vmp0e4fcuhgn0agrpqvkh76jgmaj25ddx8z6m9wqr9mn0v` → `balance 0`, `utxo_set []`. Ch6 `addr1v9ht7…` — 12 789 241 lovelace (жив, не тронут).
2. **Носитель Ch5 недоступен.** CID `QmcUgS4LgPrVbtBoLMJAbrDLokWEDxJt36Uj1NHsReTUHh` (URL в README — `infura-ipfs.io`): ipfs.io API → 410 Gone; dweb.link → 429/403; 20+ альтернативных шлюзов → 000/301/522; `ipfs.taxi` вернул HTML gateway-checker (sha256 не соответствует CID). Проверка CID: `base58(0x12 0x20 || sha256(bytes))` реализована, совпадений нет.
3. **Архивов нет.** Wayback CDX по `infura-ipfs.io`, `ipfs.io`, `dweb.link`, `ipfs.infura.io`, `gateway.pinata.cloud`, `ipfs.eth.aragon.network` для точного URL → 0 захватов; wildcard по CID → `[]`. В git-истории репозитория пазла ассетов нет (10 коммитов, только README/SOLUTIONS.MD).

## Вывод

Ch5 закрыт дважды: деньги уже забраны, и авторская картинка не пиннится. DCT/F5-ветка недостижима. Ch6 (≈11,3 ADA + eggs) остаётся, но новых идей после негатива 17.10 нет; приоритет низкий.

## Артефакты

- `puzzles/cardano-13373665-challenge/LOG.md`, `README.md` (обновлено), `data/ch5/` (неудачные загрузки), `data/github/**`.
- Транзакций не совершалось; приватных ключей не получено.
