# Свежий краул schoolofbitcoin.com (2026-10-17, AutoClaw)

## Что сделано
- Скачаны и распакованы все 3 живых iSpring-пакета сайта (index.html -> presInfo zlib+base64 -> slideN.js):
  - root (https://schoolofbitcoin.com/): 41 слайд
  - /what-is-money/: 104 слайда (Lesson 1)
  - /what-is-bitcoin/: 146 слайдов (Lesson 2/3)
- Трек /your-first-bitcoin/ удалён с сайта (404) — было 4 трека в OCP-снапшоте 2026-07-22.
- Все слайды распакованы и прогреплены: тексты (span/svg), alt-атрибуты изображений, media-ссылки, внешние URL.
- Проверены 16 путей на kdbx (все 404). Декодированные presInfo не содержат упоминаний kdbx/KeePass.
- Сканирование бинарных alt-строк по всем 291 слайдам: ровно один оверлей (WIM slide 104) -> "You found a clue to the hidden treasure of 1 FULL BITCOIN! :) abstract".
- Поиск клиентской валидации: нет (все совпадения 'incorrect' - aria-label boilerplate).

## Ключевые слайды с внешними ссылками (выборка)
- WIM s27/s32/s56/s87/s89/s90: YouTube-ссылки курса; WIM s37: usdebtclock; WIM s55: reddit Venezuela banknotes
- WIB s16: bitcointalk msg1976; WIB s20/21: YouTube UlJku_CSyNg; WIB s50: The Matrix links; WIB s62: pinkfloyd.com
- WIB s100-104: twitter.com/w_s_bitcoin; WIB s138: 2001 Space Odyssey; WIB s140/145: Johnny B. Goode / Chuck Berry; WIB s142/143: bitnodes.io
- Квизов/интерактивов с проверкой ответа на клиенте не обнаружено.

## Вывод
Апдейт сайта новой информации о 11 оставшихся словах не добавил. Статус: external-info (копия whatisthepassphrase.kdbx у сообщества либо новая подсказка автора).
Полные распакованные слайды сохранены в рабочем воркспейсе агента (_sob/packs/), 30 МБ.
