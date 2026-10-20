# SMITH, LYLE & MOORE Hunt #2 «Glimmer» — проход Qoder 18.10.2026 (H2d→H2f)

Агент: Qoder Desktop (Windows, мультимодальное чтение). Пазл: `puzzles/smith-lyle-moore-hunt-2-0-032btc`, приз 3 177 700 сат, `bc1q0akdjvrc2csau2n3gyxa3xcq0fss852x997m9y`.
Внешние запросы: Wix (www / parastorage / static.wixstatic), reddit, arctic-shift, stacker.news — с этой машины **HTTP 000** весь проход; доступны YouTube, blockstream.info, github, etherscan API. Транзакций/писем/публикаций не было.

## H2d — публичные страницы (снимок 15:32–15:39 UTC)
- `gv4d7` KEY CHECKER: кнопка START KEY CHECK ведёт на `#szyux` (элемента нет), единственная внешняя ссылка — `youtube.com/watch?v=dQw4w9WgXcQ` → **рикролл, приманка закрыта**.
- `aj73v` The Search Begins: корабль Poseidon, чеснок, «Welcome Home», пустой корабль; поле «latitude (numbers only)»; запёртая страница `latitude` (oq7la).
- `zrene` Apple Music: публичный mp3 `144728_0c8601557b264778a4388e93befab989.mp3` (Glimmer ft Dhani Harrison, 205 c) — Wix-CDN недоступен, скачать не удалось.
- `swidf` End of Treasure Hunt: «I see what you're doing… We've thought your "short cut"».

## H2e — видео как носитель (YouTube доступен)
Скачано в `data/media/`: `bornwild_video.mp4` (360p, sha256 `e1ab8eca…c9a8`), `bornwild_audio.m4a` (`b151d545…de16`), авто-субтитры `bornwild_XwXfJXdVSYQ.en.vtt` (`7b3d58cf…6926`), info.json.
- Description: «**All footage in this video is from NASA. Find where, explorer. This video is part of their digital museum and will help you to move beyond ours.**»
- Концовка субтитров цитирует звонок Никсона Apollo 11 («for one priceless moment in the whole history of man… return safely to earth»).
- Вывод: клип — Hunt #1 (Apollo-11-слой, «to the moon»), новых слов/паролей Hunt #2 не содержит. Второй URL из more-info (`R_ofGEYvEJ0`) — посторонний ролик «Mario Kart 64 Rainbow Road Shortcut» (иллюстрация «shortcut»-абзаца).

## H2f — сверка конкурирующей модели seed (офлайн, witness)
В GitHub-интейке найдена независимая реконструкция `benjacasas02/.../research/glimmer` (02.09.2026): слова 1–9 = `when you depart find mystery` + `hunt gather whale blood`, 11–12 = `virtual moon`, слово 10 свободно (checksum), passphrase — единственный блокер.
- **Находка о качестве досье:** адрес Hunt #1 в досье напечатан с пропущенной «8» (`bc1qgtympq7hw…`, невалидный bech32). Верный адрес, воспроизведённый нашим пайплайном и подтверждённый on-chain (funded 2 500 000 сат, затем swept): `bc1qgtymp8q7hw2k9tewhdq74vdlpkqhflgju69n95`. Значит отрицательные результаты досье нельзя принимать на веру без перепроверки.
- Прогон `data/glimmer_h2f_reconcile.py`: 12 перестановок блоков × `virtual/moon` × все checksum-валидные word10 (`301 080` проверок) × **193 passphrase** (включая пустую, `Amphitrite`/`Poseidon` в Title/UPPER — их досье гоняло Title-case только по одной перестановке).
- Witness: Hunt #1 seed + `supernova` → реальный адрес; неверная passphrase → NO MATCH. `SELFTEST OK`.
- Результат: **0 совпадений**, 80.7 с на 16 ядрах. Артефакт: `data/H2F_NEGATIVE.txt`.

## Что это меняет
- Модель досье (whale-слова + virtual moon) с наиболее вероятными passphrase-кандидатами **не открывает** кошелёк; её же «empty ruled out» подтверждено нашим независимым прогоном (3 012 наборов, включая пустую).
- Досье содержит фактические ошибки → его заявления о «4.3 млрд GPU-проверок» — не доказательство; при появлении Wix-доступа оракул паролей остаётся главным инструментом.
- Наша модель (11 слов: `when you depart find mystery discover music need love fortune safe`) не тронута; блокеры прежние: 12-е слово и passphrase. Письмо автору — только с письменного ОК Ильи.

## Следующие шаги (для следующего прохода)
1. При восстановлении Wix: скачать mp3 Glimmer и прогнать ASR/лирику (H2e-хвост); оракул паролей по трём замкам с контролем.
2. Проверить гипотезу «passphrase = имя возлюбленной» через `who-is-she`-видео (комический женский персонаж) — нужен доступ к CDN.
3. Не повторять: пустая passphrase, supernova, словарь, 15 248 passphrase по нашей модели; H2f-набор по модели досье.
