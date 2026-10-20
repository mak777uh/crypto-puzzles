# Cardano «13373665 Challenge» (eggdropper / MintMatrix)

Индекс: [MASTER_CATALOG.md](../../MASTER_CATALOG.md). Источник: `MASTER_CATALOG_v2_2026-10-16.md` (рабочие досье агентов Hark, 16.10.2026).


- **Адрес/сеть**: Cardano, Ch6 enterprise-адрес `addr1v9ht7ved…` (полный адрес в NOTES не записан; найти в репо или через koios). **Баланс**: 3 UTxO, всего 12,789241 ADA + 4011 egg (koios address_info 13.10.2026). Все пришли с донат-адреса addr1q80dp67…, метаданных нет.
- **Источники**: https://github.com/eggdropper/13373665Challenge (11 коммитов 16–18.04.2022, SOLUTIONS.MD), форк ChewieGumballoni/13373665Challenge (идентичен), IPFS-картинки (логотип QmNjhx…, Ch5 QmcUgS…), @MintMatrix_io.
- **Механизм**: серия Cardano-кошельков, каждый с одной подсказкой. Подсказка Ch6 — только «See through the matrix.» Деривация Icarus/CIP1852, m/1852'/1815'/0'/0/0.
- **Что установлено/решено**:
  - **Ch3 решён и выведен 13.10.2026 14:15 МСК**: подсказка — Caesar −3 от bech32 addr_xsk. 2,8 ADA + 366 egg ушли на адрес Ильи, tx bf9cb40415fef8bf69e82bc51fff302292899fd1ad563aa6bc949810b3fd9267.
  - Ch5 пуст (steghide, пустой пароль). Ch7 — скрипт-адрес, не приз.
  - Автор — команда MintMatrix.io: по метаданным минта яиц «redeemableProperties: True».
- **Проверено и отброшено** (по Ch6): LSB, альфа и хвост PNG логотипа; LSB PNG Ch2; outguess на Ch5 jpg; zero-width в README; метаданные tx; запись в token registry; мнемоники Ch1/2/4/5 на acct 0–2, role 0/1, idx 0–9; транспонированные и диагональные матрицы слов (14 валидных, 0 совпадений); soft-children xvk Ch3/4/5.
- **Что осталось / следующий шаг**: Ch6 — только «See through the matrix.» (M-clear.png, логотип, метаданные и registry уже закрыты негативом 17.10); Ch5 **закрыт 18.10**: приз снят (balance 0, koios 17:58Z), а картинка `QmcUgS4…` больше не пиннится (ipfs.io 410 Gone; Wayback captures=0), так что и steghide/DCT-ветка недостижима.
- **Файлы/скрипты**: `/workspace/work/cardano_egg/NOTES.md`, `icarus.py` (BIP39 → Icarus → CIP1852, сверен на Ch2/4/5), `sweep.py` (ручной CBOR-билдер tx + отправка через Koios, годится для любых Cardano-выводов), `derive.py`, `english.txt`, `img/`, `pub.hex`; ключ Ch3 — только в `.secret/`.
- **Проекты Hark и статус**: мультичейн-охота, задача 98bdbcc9 (`/workspace/work/multichain/NOTES.md`). Ch6 после сессии 13.10 (~35 мин) не возобновлялся. Охоте «оычн» с 14.10 09:34 велено «Cardano/TON-квесты не делать».
- **Оценка шансов**: низкие-средние, приз ≈12,8 ADA. Выплата без посредников: ключ → sweep.py.

---
## Логирование (обязательно)
См. `../../AGENT_INSTRUCTIONS.md`. Любая значимая находка, прогресс, баланс или решение (полностью либо частично) **должны** быть дописаны сюда с датой и ссылкой на источник.

## История изменений
- 2026-10-16 (deepseek-flash) — папка создана при переносе данных из `MASTER_CATALOG_v2_2026-10-16.md` (Часть Б: живые загадки вне каталога).

## Обновление GitHub-интейка (2026-10-18, Qoder)
- GitHub-интейк: **done** 2026-10-18 — 2 репо, 0 API-запросов, 4 бесплатных транспортов — содержимое уже в базе (snapshot уже лежит, HEAD 569e0fe2 не изменился; ls-remote не отвечает (404/приватный/удалён)); API-сбор не требовался репо: 2; путь дайдеста: `data/github/GITHUB_INTAKE.md`
