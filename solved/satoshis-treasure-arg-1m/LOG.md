# LOG — satoshis-treasure-arg-1m

## 2026-10-18, 12:45 — Qoder (Qoder Desktop, Windows)
- Делал: проход «новые каталоги и репозитории загадок» (план — `reports/2026-10-18_1245_Qoder_catalog-search-plan-and-new-sources.md`).
  Нашёл через GitHub topic-страницу `topic:treasure-hunt` репозиторий сообщества `mingrui/satoshis_treasure`,
  скачал его README (`curl raw.githubusercontent.com`, 200 OK), вытащил таблицу ключей и все ссылки;
  проверил живой статус официальных доменов (`curl https://satoshistreasure.xyz` → HTTP 000, соединение не установлено;
  повторить через web.archive.org).
- Результат: **объект новый для базы** (`_sources/KNOWN_SET_2026-10-18.txt`: «satoshis treasure»/«satoshistreasure» — 0 совпадений).
  Зафиксировано: 4 ключа разгаданы методами (offline-QR + словарь, zip-gif, 8-куски), «The Hunted Key» без даты релиза,
  FAQ подтверждает наличие скрытых уже выпущенных ключей. Призовой BTC-адрес в README отсутствует → **баланс не проверен**,
  вердикт «нерешена/невостребована» остаётся неподтверждённым.
  Отрицательный результат: с этой машины официальный сайт недоступен (000), живых хинтов 2025-2026 не найдено.
- Артефакты: `data/mingrui_repo_readme_2026-10-18.md` (полный README репо, побайтово), README.md.
- Ссылки/доказательства: https://github.com/mingrui/satoshis_treasure ;
  https://satoshistreasure.xyz/ (мёртв с этой машины на 18.10.2026) ;
  https://elementaryvoice.com/satoshistreasure/doku.php ;
  https://gist.github.com/johncantrell97/bbab69bbde03d22eb8323fd94cd46db0 ;
  https://www.leaprate.com/the-first-keys-for-the-1-million-satoshi-treasure-claimed/
- Не проверено: наличие средств на призовом адресе, полный список ключей (11) и их статусы.

## 2026-10-18, 13:05 — Qoder (проход верификации через web.archive.org)
- Делал: CDX satoshistreasure.xyz* (есть снапшоты 2019–2022; сайт ныне недоступен). Скачал и сохранил:
  data/archive/{seal.html,hidden,policy.pdf,page_rules/qa/news/4/10.html}.
- Результат:
  1) В seal.html «адреса» 3CMfAERD…/3hlqQw1c…/1M43yFQ8… — ЛОЖНЫЕ (base58-куски AES-шифротекста, чексумма не проходит).
  2) На /hidden реальный адрес бонуса первой разгадки hidden-ключа: `1899BGHGR4itdmJEN8MFGxyVkAcis4brop` (~$100 в BTC).
     blockstream.info: funded=spent=1 020 000 сат → **баланс 0, потрачен** (оракул подтверждает снятие).
  3) Страницы ключей — SPA (контент через JS), призовых адресов в HTML нет. Основной ~$1M фонд — физическая выдача
     по ключам (USB/коины), единого live-адреса в архивных материалах нет.
- Вывод: не активный ончейн-пазл (сайт мёртв, верифицируемый bounty-адрес свипнут, фонд off-chain/физический).
  Перенос в solved/ с причиной off-chain/defunct.
- Ссылки: https://web.archive.org/web/20200429050408/https://satoshistreasure.xyz/res/seal.html ;
  https://blockstream.info/api/address/1899BGHGR4itdmJEN8MFGxyVkAcis4brop
