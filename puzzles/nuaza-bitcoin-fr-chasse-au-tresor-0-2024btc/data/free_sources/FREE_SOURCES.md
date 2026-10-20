# FREE_SOURCES — Nuaza / bitcoin.fr « Chasse au trésor »

Сбор **бесплатных и легальных** материалов к книге Пьера Нуаза «L'énergie, face cachée de la monnaie»
(Konsensus Network, 2024). Без покупок, без пиратских источников, без обхода DRM.
Каталог: `puzzles/nuaza-bitcoin-fr-chasse-au-tresor-0-2024btc/data/free_sources/`.
Дата сбора: 2026-10-19.

## Таблица «URL → файл → байты → транспорт → статус»

| URL | Файл | Байт | Транспорт | Статус |
|-----|------|------|-----------|--------|
| https://bitcoin.fr/wp-content/uploads/2024/08/Chasse-au-tresor.webp | chasse_au_tresor.webp | 117182 | curl | OK (промо-баннер 600×600, обложка под углом) |
| https://konsensus.net/assets/books/energie-face-cachee.png | energie-face-cachee.png | 682193 | curl | OK (обложка издателя 1000×1200, RGBA) |
| https://konsensus.net/assets/books/thumbs/energie-face-cachee.png.320.webp | energie-face-cachee.png.320.webp | 16856 | curl | OK (превью 319×487) |
| https://konsensus.net/book/lenergie-face-cachee-de-la-monnaie-2 | _publisher_page.html | 63208 | curl | OK (цен: eBook €10 / audio €9 / papier €21; нет PDF/epub-выдержки) |
| https://odcom-75a03dbd3d912bb4163b23f6b787b098.read.overdrive.com/_d/cover/buid/.../big.jpg | od_sample/cover_big.jpg | 43361 | browser fetch (session) | OK (обложка ePub-ридера 712×949) |
| .../media/file0.png … file12.png/jpg (13 иллюстраций ePub-сэмпла) | od_sample/file0..file12 | см. ниже | browser fetch (session, без токена) | OK (все 13 скачаны) |
| https://odcom-.../toc.ncx | sommaire.txt (раскодировано) | 772 | browser fetch (session, без токена) | OK (полное оглавление книги) |
| https://e-ducat.fr/links/aboutme (pierrenoizat.github.io) | educat_aboutme.html / gh_aboutme.md | 14175 / 2396 | curl | OK (био автора — год рождения НЕ указан) |
| https://e-ducat.fr/links/livre | educat_livre.html | 16459 | curl | OK (аннотация книги, без sommaire) |
| https://www.wikidata.org/wiki/Special:EntityData/Q134479179.json | wikidata_noizat.json | 7008 | curl | OK (П. Нуаза; дата рождения = **1965** — «fausse info» по indice 11) |
| https://www.sia-partners.com/…/entretien-avec-pierre-noizat… | interview_sia-partners_noizat.html | 68204 | curl | OK (инженер, выпуск École Polytechnique; годов Олимпиад нет) |
| https://cdn.syndication.twimg.com/tweet-result?id=1824061155599438263 | x_root_tweet.json | 1167 | curl | OK (корневой твид @e_ducat 15.08.2024 читается без логина) |
| https://x.com/e_ducat/status/1824061155599438263 (ответы) | — | — | browser | BLOCKED (ответы за стеной логина) |
| https://www.jeuxvideo.com/forums/…76202287… | — | — | curl | FAIL (вернулся JS-шелл форума, посты не сервер-рендерятся; браузер перехвачен другим процессом) |
| https://www.fnac.com/a20625698/… | — | — | browser | FAIL (сайт в режиме maintenance) |
| https://www.decitre.fr/livres/…9789916723869.html | — | — | curl/WebFetch | FAIL (403) |
| https://www.kobo.com/ww/en/ebook/l-energie-face-cachee-de-la-monnaie | — | — | curl | FAIL (403; превью Kobo не получен) |
| https://www.googleapis.com/books/v1/volumes?q=isbn:… | — | — | curl | FAIL (429 rate-limit; Google Books-превью для книги отсутствует в выдаче) |
| https://openlibrary.org/isbn/… , https://archive.org/… | — | — | curl | FAIL (404 / 0 docs — книги нет в OL/IA) |

Размеры иллюстраций `od_sample/`: file0=17884, file1=102385, file2.jpg=26406, file3.jpg=22449,
file4=243808, file5=98793, file6=36906, file7=1720716, file8=25970, file9.jpg=98635, file10=30495,
file11=184176, file12=52428.

## Что реально получено (бесплатно)

1. **Обложка в высоком разрешении** — `energie-face-cachee.png` (1000×1200) с сайта издателя Konsensus.
   Текст на обложке: «L'ÉNERGIE, FACE CACHÉE / DE LA MONNAIE», «PIERRE NOIZAT», логотип «KONSENSUS NETWORK»,
   центральный диск = жёлтая сеть (полусфера) / чёрная «теневая» половина.
2. **13 иллюстраций ePub-сэмпла** (OverDrive Spark/Bifocal) — скачаны напрямую с
   `odcom-…read.overdrive.com/media/fileN.png|jpg` (сессия браузера, БЕЗ токена и БЕЗ логина).
   Это легальное публичное превью издателя/OverDrive.
3. **Полное оглавление (sommaire)** — из `toc.ncx` того же ридера (без токена).
4. **Био-данные автора** — Wikidata, интервью SIA, блог e-ducat.

## Анализ: какие BIP39-FR слова видны на изображениях

Проверено по `../bip39_french.txt` (NFC, 2048 строк, сортированный список; EN-эквивалент = слово того же ранга в `../bip39_english.txt`).

**Обложка (слова 13–14):** только 3 слова обложки есть в списке —
`énergie` (669→father), `monnaie` (1264→own), `pierre` (1481→rice). «face», «cachée», «noizat», «konsensus», «network» — НЕ в списке.
→ пара 13–14 = две из {énergie, monnaie, pierre}; естественное чтение заглавия = **énergie + monnaie**.

**Иллюстрации сэмпла (кандидаты на слова 1–12):**
| Файл | Что изображено | BIP39-FR слова на картинке |
|------|----------------|----------------------------|
| file0.png | чёрная 5-лучевая звезда (лого Konsensus) | — (декор) |
| file1.png | график «Echelle mondiale» (PIB vs consommation d'énergie) | énergie→father |
| file2.jpg | прямоугольник, 10 точек слева / пусто справа | — |
| file3.jpg | прямоугольник с пунктиром, ~11 точек по обе стороны | — |
| file4.png | треугольник Паскаля из домино (1·4·6·4·1), «mesure de pression» | mesure→once |
| file5.png | колокол «Probabilité / Nombre de particules» | — (probabilité/particule вне списка) |
| file6.png | полоса «ÉNERGIE LIBRE» (thermique/cinétique/potentielle/électrique/chimique) | **libre→miss**, énergie→father |
| file7.png | дерево жизни (Bactéries/Archaea/Eucarya, «l'origine») | — (origine вне списка) |
| file8.png | «2 outils = 4 états / 5 outils = 32» (Marteau, Scie) | outil→quarter |
| file9.jpg | портрет бородатого учёного (похоже на Р. Клаузиуса) | — |
| file10.png | **инь-ян** (чёрно-белый круг с точками) = «yin-yang p.42» | — (нет текста) |
| file11.png | график RIVER/FRED «Dévaluation monétaire contre inflation» | — (inflation/monétaire вне списка) |
| file12.png | таблица Source d'énergie/Temporalité/Preuve (Bitcoin/Or/Actions/Euro) = «table p.72» | **source→thrive, physique→reward, fossile→helmet, travail→upset, manuel→noise**, énergie→father |

Подтверждение по README: file6 = «Énergie libre p.14» (libre); file12 = «table p.72» (fossile/manuel/physique);
file10 = «yin-yang p.42». Слова 20–21 README читает как `physique (reward)` и `source (thrive)` — ОБА видны прямо в file12.

**Оглавление (слова 18–19).** Из 30+ названий глав/частей в BIP39-FR входят только 7:
`énergie`(669→father), `économie`(617→essay), `monnaie`(1264→own), `progrès`(1554→seat),
`amour`(96→army), `bonheur`(260→calm), `science`(1727→subject).
(Не входят: conservation, entropie, information, temps, bitcoin, inflation, promesse, rareté, spéculation,
utilité, religion, croyance, confiance, intangible, société, liberté, complot, égalité, empire, humanité,
identité, patriarcat и т.д.) → пара 18–19 — две из {économie, progrès, amour, bonheur, science}
(énergie/monnaie уже заняты обложкой). Совпадает с догадкой README.

## Олимпийские годы (слова 15–16) — статус

- Wikidata (Q134479179) указывает год рождения **1965** — это и есть «fausses infos sur certains sites peu fiables» из indice 11.
- Собственный блог автора (e-ducat aboutme, gh_aboutme.md) год рождения НЕ называет; интервью SIA — только «Ingénieur diplômé de l'École Polytechnique», карьера с 1990-х в США.
- Читаемое сообществом: реальный год рождения **1960** (Рим — олимпийский год) + второй олимпийский год (README: 1980 → wash/виг). Индекс года как 1-based ранг: 1960→english[1959]=**visual**, 1980→english[1979]=**wash** (наш список совпадает: 1960→vital, 1980→wasp при 0-based; README использует 1-based).
- **Тупик:** подлинная биографическая вставка с двумя годами-Олимпиадами печатается только на 4-й стороне обложки / в разделе «Biographie» Fnac/Decitre/Kobo, которые сейчас недоступны (maintenance/403/403). Бесплатно подтвердить второй год не удалось.

## Где тупик

- **Текст глав** (для точного чтения начала гл. 4 «Énergie» → слова 20–21 и подписей внутри картинок) — в ридере OverDrive закрыт per-file токеном `cmpt` (403 без него). Медиа-файлы и `toc.ncx` открыты, текст — нет.
- **Ответы в треде X** и **посты jeuxvideo 76202287** — за логином / JS-рендером; общий браузер-вкладку перехватывал другой процесс (reddit/twitter), стабильно снять не удалось.
- Google Books / Open Library / Internet Archive / Kobo превью — недоступны для этой книги.

## Самый дешёвый следующий шаг

1. **Купить ePub у издателя** (konsensus.net, €10) или Kindle (€8,99) — единственный источник 8 внутренних
   иллюстраций печатного издания в нужном порядке (в бесплатном сэмпле их нет: yin-yang/таблица есть, но
   timbre p.101, bilan BCE p.99, baguette p.105, identité p.174, bonhomme p.178 — за пределами превью).
   Требует явной санкции пользователя (ранее отклонено 13.10).
2. До покупки — **бесплатно** можно закрыть слова 18–19 (sommaire уже добыт) и 13–14 (обложка добыта):
   перебрать 5×4/2=10 пар из {économie,progrès,amour,bonheur,science} × пары обложки через BIP84-оракул
   при фиксированных остальных слотах. Реальный блоккер остаётся — 6+ картинок печатного издания.
