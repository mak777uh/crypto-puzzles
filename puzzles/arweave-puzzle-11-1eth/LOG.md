#  LOG

 LOG
-  Re-ran `tools/scan11.py data/puzzle11.png`: no direct 64-hex, no zlib/ASCII hits in LSB bitplanes; alpha has 26 values in 225..255 with 434 non-255 pixels.
-  Generated `data/alpha_mask.png`; OCR returned no text.
-  Tested row-major 5-bit packing of alpha deltas and L-channel LSBs at non-255 positions; no readable hex/ASCII result.
-  Conclusion: no key recovered in this pass; stego likely requires visual/spatial interpretation or a different transform. No prize claimed.

-  Идентификация: agntn-коллекция `weave/weave/11` = ЭТОТ пазл (1 ETH, открыт (адрес 0xff2142… совпадает с нашим Arweave #11)). Карточка реестра (транзакции, хинты) сохранена: `data/agntn_weave_11.ts`.
-  Примечание: серия weave (Tiamat) = группа наших Arweave-пазлов; в реестре 12 пазлов, 9 claimed; открытые в agntn без статуса: weave/3, weave/10, weave/11 (наши #3/#10/#11); weave/12 помечен Claimed — ПЕРЕПРОВЕРИТЬ баланс!

## 2026-10-17, ~22:45 (MSK) — Big Pickle (deepseek-v4.1-flash-free / OpenCode, Windows, DESKTOP-PE9BOJ5)

- Представляюсь: сессия по протоколу AGENT_INSTRUCTIONS.md; бронь `arweave-puzzle-11-1eth` взята. Приз перепроверен он-чейн: `0xFF2142E98E09b5344994F9bEB9C56C95506B9F17` = **1.0 ETH** (rpc 1rpc.io, 17.10).
- Делал: **второй стего-проход, не дублирующий `tools/scan11.py` (Qoder)**. Новый скрипт `tools/scan11b.py`:
  1. Канальные комбинации `L^A`, `A-L`, `L+A`, `255-A`, `L*3+A` — все 8 битовых плоскостей каждой, порядок C и F, поиск 64-hex / ASCII≥10 / zlib.
  2. 434 пикселя с A<255: битовые потоки по паритету alpha, LSB/бит6 alpha, чётности (x^y)/x/y, в порядках row-major / column-major / сортировка по alpha.
  3. Маски по одному значению L (0/128/255) → биты позиций.
- Результат: **отрицательный**. 64-hex и zlib-потоков нет; «совпадения» — только короткие ASCII-шумовые раны (10 симв.), не payload. Канальные разности и позиционные кодировки alpha-маски не дают ключа.
- Влияние: гипотезы «ключ в разности каналов / в позициях alpha-маски» закрыты. Остаётся смысловая геометрия (нужно зрение) — вне возможностей текущей среды; серия weave (Tiamat) ждёт инсайта/зрения.
- Артефакты: `tools/scan11b.py` (запуск: `python tools/scan11b.py`).
- Ссылки/доказательства: `data/puzzle11.png` (mode LA 1600×1105, sha256 в scan11.py), баланс — rpc `1rpc.io/eth`.



## 2026-10-18, 10:05 (повторно 13:4x) — OCP Sync (Qoder Desktop, Windows) <!-- ocp-snapshot:19644e58 -->
- Делал: раскладка дельт снапшота OCP `19644e58` (17 файлов в `data/ocp/`, 10 в `tools/ocp/`,
  тяжёлое — ссылкой `data/ocp/_HEAVY.md`, provenance в `SOURCE.md`). Запись повторена: первая
  версия была снята параллельным проходом ~13:12, переписавшим хвост LOG с дефектами генерации
  (одна строка повторялась 3–25 раз в разных оформлениях); дубли склеены `tools/log_dedup.py`,
  потеря HEAD-строк — 0 (проверено по нормализованным множествам).
- Результат: негатив-реестры B1–B16 (~330 млн проверок), witnessed H1–H4, `genesis28-results.json`,
  `geometry.json`, задокументированный баг их оракула — в базе с provenance. Статусного
  расхождения нет (у OCP тоже `open`). Прогонов не запускали.
- Артефакты: `data/ocp/**`, `tools/ocp/**` этой папки; `_sources/ocp_sync_2026-10-18/delta_report.md`.
- Ссылки/доказательства: https://github.com/floflo777/open-crypto-puzzles/tree/19644e58
