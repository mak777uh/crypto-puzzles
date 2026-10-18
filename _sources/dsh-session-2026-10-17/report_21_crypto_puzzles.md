Report delivered to the parent agent. Here is the full result:

## 1. Oobit puzzle #139 на bitcoinpuzzles.io
- **Суть:** Португальская платформа Bitcoin Puzzles держит активный челлендж «Super desafio Oobit 12 palavras» авторства Mestre Caçatal, опубликованный 02/06. Условие — восстановить 12 слов seed-фразы по изображению-подсказке и ввести приватный ключ. Каждая попытка стоит 1 токен «caçatal» (CB), ввод ответа требует регистрации. На главной сайта отдельно указан путь `m/44'/0'/0'/0/0`.
- **Механизм:** seed-фраза из 12 слов, спрятанная в изображении (визуальная стеганография). Точная техника не раскрыта, открыт 1 платный хинт.
- **Статус:** открыт (2026-10-16). Адрес не потрачен: ровно 1 545 000 сатоши = total received.
- **Приз/адрес:** 0.01545 BTC (`1KKtnqLdK17ndRRwF8zaKZH6FSkSmTN6fk`). Внутренняя цена на сайте — 30 441 CB ≈ US$ 12 (не совпадает с реальным балансом).
- **Источники:**
  - https://bitcoinpuzzles.io/pt/puzzles/139
  - https://bitcoinpuzzles.io/pt/puzzles/139/tab/dicas
  - https://bitcoinpuzzles.io/pt/puzzles/139/tab/comentarios
  - https://bitcoinpuzzles.io/pt
  - https://bitcoinpuzzles.io/en/puzzles/139
  - https://blockchair.com/bitcoin/address/1KKtnqLdK17ndRRwF8zaKZH6FSkSmTN6fk
- **Уверенность:** высокая. Не подтверждено: конкретный метод кодирования и содержание единственного хинта (за регистрацией).

## 2. kTimesG "Phy Challenge"
- **Суть:** 5 июня 2026 kTimesG открыл на bitcointalk тему «Phy Challenge»: искажённый текст whitepaper Сатоши, base64-строка и изображение 2048×2048 со спиралью серых эмодзи, заявка «no loose ends, no hashing». Строка — ECDSA-подпись текста поста с намеренно пропущенным символом base64 «J» («инцидент с котом», исправлено 2026-07-30).
- **Механизм:** ECDSA-подпись (Base64, 64 байта) над текстом OP без завершающего перевода строки → открытый ключ → funded SegWit-адрес; далее изображение со 256 серыми эмодзи (хинты: «inside-out», «ASCII 8 cat», тест skin-tone для нормализации перерисованного изображения, «филлотаксис»). NotATether предположил 80-битный дискретный лог и гонял kangaroo — автор это опроверг.
- **Статус:** открыт. Структура частично расшифрована, приватный ключ не найден. 800 000 сатоши не потрачены.
- **Приз/адрес:** 0.008 BTC; `bc1qrpn28qa82uyjg37dvsz3w7wpm3kpdea957nm9p`; funding tx `2ba79d0b377ab2c41f3508e91e84d0b2aff771fd81b97b8e85c24788795964d3`; pubkey `02425afdd1716149faf414b6fdb96d5e7afc8ce42496042f4df559c80a7c6650eb`.
- **Источники:**
  - https://bitcointalk.org/index.php?topic=5584952.0
  - https://bitcointalk.org/index.php?topic=5584952.msg66802369#msg66802369
  - https://bitcointalk.org/index.php?topic=5584952.msg66860784#msg66860784
  - https://bitcointalk.org/index.php?topic=5584952.msg66990855#msg66990855
  - https://bitcointalk.org/index.php?topic=5584952.msg66991304#msg66991304
  - https://puzzles.agntn.dev/collections/phy
  - https://www.talkimg.com/images/2026/06/05/UrS0Mq.png
  - https://web.archive.org/web/20260629174249/https://bitcointalk.org/index.php?topic=5584952.0
- **Уверенность:** высокая по теме/призу/адресу; средняя по финальной схеме извлечения скаляра — публичного решения нет.

## 3. Solana Puzzles #4
- **Суть:** Проект SolanaPuzzles ведёт серию визуальных пазлов; #4 помечен «Active». Нужно декодировать 12-словную seed-фразу из `images/puzzle4.png` и ввести в Phantom. Опубликовано 12 хинтов («When things look backwards…», «Look for the answer in the stars», «Prime numbers will unlock the gate», «The circle of 13 spins twice», «It's hidden in the cat's eyes»), скриншоты отключены.
- **Механизм:** 12-word seed в изображении; по хинтам — зеркальное отражение, звёзды, простые числа, «круг из 13», сдвиг букв, «что остаётся, когда убрать общее» (вероятно XOR), чтение между строк.
- **Статус:** открыт. Баланс не тронут: 834 000 000 лампортов = 0.834 SOL ровно.
- **Приз/адрес:** 0.834 SOL; `DmDBmb7AEm6xRxkoBYq1mJYqsZP263gmXB53zA2dqjne` (в заголовке сайта заявлено «0.8 SOL»).
- **Источники:**
  - https://solanapuzzles.com/puzzle4
  - https://solanapuzzles.com/images/puzzle4.png
  - https://solscan.io/account/DmDBmb7AEm6xRxkoBYq1mJYqsZP263gmXB53zA2dqjne
  - https://solanapuzzles.com/index.html
  - https://x.com/solanapuzzles
- **Уверенность:** высокая. Не подтверждено: механизм кодирования.

## 4. "Bitcoin Coders Puzzle 07"
- **Суть:** Найти что-либо не удалось. Поиск по названию, по «Coders» + «puzzle 07» и по номеру серии не дал релевантных результатов (выдача забита проектом Corey Phillips и крипто-детективами «Bitcoin Coder Identity»).
- **Механизм:** неизвестен.
- **Статус:** адрес существует и не потрачен — баланс ровно 21 000 сатоши, что совпадает с заявленным призом. Приз реален, первоисточник не найден.
- **Приз/адрес:** 21 000 сатоши; `bc1qj7xsxrlgmnnrqwvlakacc5yrh33h2n3xaa0m09`.
- **Источники:**
  - https://blockchain.info/q/addressbalance/bc1qj7xsxrlgmnnrqwvlakacc5yrh33h2n3xaa0m09
  - https://github.com/agntn/puzzles (коллекции «coders» в реестре нет)
- **Уверенность:** низкая. Не подтверждено: автор, серия, дата, механизм. Заявленную привязку к «серии Puzzle 07» считать непроверенной.

## 5. LuckyLurker "Bitcoin Vault #2"
- **Суть:** Luckylurker.com запустил серию «Bitcoin Vault» на 12-словной seed-фразе. Vault #1 (0.4 → 0.8 mBTC) стартовал в марте 2026 и был вскрыт 22 августа 2026. Vault #2 с призом 1 BTC анонсирован 11 сентября 2026, но затем **отложен на неопределённый срок** из-за нерешённых вопросов со спонсором; подтверждённой даты и суммы на странице нет. При этом 1 BTC уже лежит на адресе с 12 августа 2026, хинты были запланированы с 12 октября 2026.
- **Механизм:** 12-словная seed-фраза, слова спрятаны в статьях/гайдах; автор предупреждал, что хинты нужно комбинировать.
- **Статус:** отложен (страница озаглавлена «Postponed»), 1 BTC задепонирован и не потрачен.
- **Приз/адрес:** 1 BTC; `bc1qnepv9pcnqvndux9h9mcaxvk6u993rc0lew9fpp`; funding tx `2314d7f0b76c4f29ed1cfb949fd2882d648712f5c6cbaef9d7dff8ddee46f198`.
- **Источники:**
  - https://luckylurker.com/bitcoin-vault-2/
  - https://luckylurker.com/bitcoin-vault/
  - https://bitcointalk.org/index.php?topic=5577554.0
  - https://bitcointalk.org/index.php?topic=5577554.msg67134050#msg67134050
  - https://bitcointalk.org/index.php?topic=5577554.msg67070398#msg67070398
  - https://puzzles.agntn.dev/collections/luckylurker
- **Уверенность:** высокая. **Не подтверждено: имя «Paul Jones»** — на bitcointalk аккаунт называется `Paul_LuckyLurker`.

## 6. seed-phrase.com от MetaNeer Labs
- **Суть:** Сайт-пазл публиковал по подсказке в день с 12 июля 2024 (каждая — отдельный коммит в `metaneer/seed-phrase`, откуда сайт раздаётся через GitHub Pages). Первый взнос 0.005 BTC, 14 августа 2024 удвоен до 0.01 BTC. Хинты: BIP-39 wordlist EN+CN, стихотворение про завесу, одноразовая ссылка onetimesecret, картинки `whatafeeling.png` и `illusionsmichael.png`, favicon, эмодзи 🤢, сумма 29 045 при x_i от 1 до 2048, путь деривации и AES-шифртекст. Последняя подсказка — 14 августа 2024.
- **Механизм:** seed-фраза (24 слова или короче) по датированным подсказкам; BIP-39 wordlist, AES (шифртекст `af12ff6a…`, IV `4faf05ee…`, salt `salt`), визуальная стеганография; заявлены «красные селёдки».
- **Статус:** открыт, фактически спящий — новых подсказок ~2 года; баланс ровно 0.01 BTC.
- **Приз/адрес:** 0.01 BTC; `bc1q7x3p3rkmkxgf20n3apkccqcmn5mdtsf8zx5227`.
- **Источники:**
  - https://seed-phrase.com/
  - https://github.com/metaneer/seed-phrase
  - https://github.com/metaneer/seed-phrase/commit/0ffba8f3b145ec9be7fe931798def75adaca08cd
  - https://mempool.space/address/bc1q7x3p3rkmkxgf20n3apkccqcmn5mdtsf8zx5227
  - https://puzzles.agntn.dev/collections/seed-phrase
  - https://www.boomerventuresummit.com/2026/06/05/andrew-bellay-founder-metaneer-labs/
- **Уверенность:** высокая по сайту/подсказкам/адресу. **Не подтверждено: связь домена с компанией «MetaNeer Labs»** — организация `metaneer` действительно публикует сайт, Эндрю Беллэй указан основателем MetaNeer Labs, но прямого заявления «пазл создан MetaNeer Labs» я не встретил; репозиторий содержит только заглушку README.

## 7. "The Great Riddle" / The Great Print
- **Суть:** Пазл художника Бартоша Левицки (The Great Print, Базель), рисующего шариковой ручкой. 24 слова seed-фразы спрятаны в **оригинальных** рисунках Genesis Collection (в печатных копиях слов нет). Первый, кто пришлёт автору 24 слова в любом порядке, получает 25-е слово. На декабрь 2025 публично доступны 3 работы и 4 слова; к январю 2026 завершена четвёртая (Bitcoin Honey Badger) с двумя словами. Автор подписал розыгрыш он-чейн 2100 сатоши с OP_RETURN «The Great Print running The Great Riddle».
- **Механизм:** seed-фраза, слова вписаны по одному (иногда по два) в оригинальные рисунки; 25-е слово выдаётся вручную. Визуальная стеганография в артворках.
- **Статус:** открыт и намеренно медленный — не может быть решён до публикации всех 24 рисунков. Баланс ровно 423 871 сатоши.
- **Приз/адрес:** 0.00423871 BTC (точное совпадение с балансом); `bc1qm3ayuhn7wppuqxaywu8ea0lggs8myy7543fekk`; подпись — tx `e1787c3811863b67e61dcc5804645de19f5927b980e3510cc6ba554064f7d720`.
- **Источники:**
  - https://www.thegreatprint.net/riddle
  - https://www.thegreatprint.net/honeybadger
  - https://www.thegreatprint.net/greattree
  - https://www.thegreatprint.net/bhoenix
  - https://www.thegreatprint.net/artist
  - https://mempool.space/tx/e1787c3811863b67e61dcc5804645de19f5927b980e3510cc6ba554064f7d720
  - https://web.archive.org/web/20260123202427/https://www.thegreatprint.net/riddle
  - https://puzzles.agntn.dev/collections/great-riddle
- **Уверенность:** высокая. Не подтверждено: текущее число публично доступных слов (в архиве за январь 2026 — 4).

## 8. "Anime Seed Phrase Puzzle" (~0.2 BTC)
- **Суть:** Позиция с таким названием не найдена. Ближайшее реальное совпадение — анимационный сериал «Bitcoin & Friends» (8 серий, премьера 3 января 2024), в каждой серии спрятаны seed-фразы к кошелькам с NFT-призами на $150 000; нашедшие получали право стать персонажем и co-producer credit. Приз выражен в NFT/долларах, а не в 0.2 BTC.
- **Механизм:** seed-фразы, визуально спрятанные в кадрах анимации.
- **Статус:** **не подтверждено.** Тождество с «Bitcoin & Friends» — моя гипотеза, не факт.
- **Приз/адрес:** заявлено ~0.2 BTC; **адрес не найден**.
- **Источники:**
  - https://cryptokeepercanada.com/150000-bitcoin-friends-nft-treasure-hunt-to-debut-january-3/
  - https://europeanbusinessmagazine.com/digital-gold-rush-the-hunt-for-150000-in-nfts-hidden-in-the-bitcoin-friends-animated-saga/
  - https://lesechos-comfi.lesechos.fr/press-release/b-friends-llc-nasdaq-digital-gold-rush-the-hunt-for-150000-in-nfts-hidden-in-the-bitcoin-friends-animated-saga-CExsVctSpLa
  - https://x.com/btcandfriends
  - https://patents.google.com/patent/US20240378592A1/en
- **Уверенность:** низкая. Явно: по запросу «Anime Seed Phrase Puzzle ~0.2 BTC» ничего не найдено.

## 9. "Actuarial Science NFT Hunt" (до 10 ETH, 12 из 100 NFT)
- **Суть:** По точной формулировке ничего не найдено. Единственное пересечение с темой актуариев — доклад ProActuary про NFT/DeFi/Web3 в актуарной профессии, но это не пазл.
- **Механизм:** неизвестен.
- **Статус:** **не подтверждено.** Ближайшее по структуре — серия NFT-охот на Rarible/Etherscan («Upto 100 ETH treasure hunt — 3/12 keys inside», контракт `0xd07dc4262bcdbf85190c01c996b4c06a461d2430`), но это крипто-арт, не актуарика; также InfinityKeys (`0x54b743d6055e3bbbf13eb2c748a3783516156e5b`) — NFT-квесты без связи с темой.
- **Приз/адрес:** до 10 ETH за 12 из 100 NFT; **ни адреса, ни контракта, ни источника**.
- **Источники:**
  - https://disruptive.proactuary.com/talks/how-blockchain-will-transform-the-actuarial-society-nfts-defi-web3-daos/
  - https://etherscan.io/nft/0xd07dc4262bcdbf85190c01c996b4c06a461d2430/13079
  - https://etherscan.io/nft/0xd07dc4262bcdbf85190c01c996b4c06a461d2430/9352
  - https://goto.etherscan.com/nft/0x54b743d6055e3bbbf13eb2c748a3783516156e5b/52
- **Уверенность:** низкая. Приведённые ссылки — контекст, не подтверждение.

## 10. bitaddress.org BIP38 giveaway
- **Суть:** 6 октября 2023 пользователь `q` на Stacker News опубликовал пост «Brute force and the coins are yours»: картинку бумажного кошелька bitaddress.org, BIP38-зашифрованный WIF и адрес, пароль к которому забыл, предложив забрать монеты тому, кто подберёт фразу. `q` уточнял: фраза вероятно не длиннее 30 символов, спецсимволы скорее не использовались, вероятно комбинация из 3 паролей, менеджером паролей он не пользовался. Община по префиксу `6Pf` определила BIP38 EC-multiply, без сжатия, без lot/sequence.
- **Механизм:** BIP38 (EC multiply, no compression, no lot/sequence) — перебор парольной фразы по известному зашифрованному WIF; открытый ключ (uncompressed) известен.
- **Статус:** открыт. Адрес не потрачен: 529 700 сатоши при total received 4 865 700.
- **Приз/адрес:** 0.005297 BTC; `1J7BVeP8JK4op2X3GN3Hy7xkTnGnQTMpou`; WIF `6PfQTphCYc1Fee19uPz2pmou5RVBDVgw8VcrPfGLos4ktUnARdiFLYhcNU`; pubkey `04f7af13c4fda2f920dbd8ebc8d2cc87cdc6674a7beda95a402ab83dd7e952597aeebdb76b2b4bc15771c57eb48568b2a8fa83219f9fa53519aaef5cd75bac30ac`.
- **Источники:**
  - https://stacker.news/items/275973
  - https://stacker.news/items/276117
  - https://stacker.news/items/276305
  - https://stacker.news/items/276026
  - https://a.stacker.news/items/275973?commentId=276428
  - https://i.imgur.com/3RSb8MH.png
  - https://puzzles.agntn.dev/collections/bitaddress
- **Уверенность:** высокая. Примечание: сам stacker.news при прямом fetch отдал ошибку соединения, формулировки подсказок привожу по реестру со ссылками на конкретные комментарии.

## 11. "310 BTC Challenge", финальная стадия
- **Суть:** Пазл «310 BTC» — картина с 310 BTC, разделёнными на 4 стадии. Первые три вскрыты в течение примерно недели после запуска (октябрь 2018), четвёртая с призом 0.31 BTC осталась нерешённой и стала одним из самых известных «висящих» крипто-пазлов. Механика финала — чёрно-белое PNG-изображение и стеганография.
- **Механизм:** чёрно-белое PNG со стеганографией (битовые плоскости/паттерн чёрно-белых пикселей → ключ). Точный алгоритм публично не раскрыт.
- **Статус:** открыт; 3 из 4 стадий решены (2018), четвёртая не решена.
- **Приз/адрес:** 0.31 BTC; конкретный адрес финальной стадии **не подтверждён**.
- **Источники:**
  - https://news.ycombinator.com/item?id=18197639
  - https://www.secrss.com/articles/5570
  - https://www.jiwo.org/ken/detail.php?id=2025
  - https://m.jiemian.com/article/4218922.html
  - http://www.gamelook.com.cn/2018/10/341366/
  - https://m.163.com/dy/article/DTR6MQE205198LHD.html
- **Уверенность:** средняя. Не подтверждено: адрес финальной стадии, текущий баланс, конкретный стеганографический алгоритм.

## 12. "Seed Phrase Crossword" NFT puzzle на Magic Eden (Pillar Wallet seed)
- **Суть:** Ничего не найдено. Поиск по «Seed Phrase Crossword» + Magic Eden, по «Pillar Wallet seed» + кроссворд/NFT и по seed phrase + Magic Eden не дал такого пазла; выдача содержала страницу Tangem про кошелёк Pillar, статью про основателя Ordinals и загадку в Minecraft, кроссворды MARA и NEAR, проекты PirateCash и InfinityKeys.
- **Механизм:** неизвестен. Единственная механическая аналогия — учебный материал NEAR Docs про seed-фразу в кроссворде и репозитории `untoldhq/near-crossword` / `Archiolidius/near-crossword` (демо, не призовой пазл).
- **Статус:** **не подтверждено.**
- **Приз/адрес:** нет данных.
- **Источники:**
  - https://docs.near.org/tutorials/crosswords/intermediate/use-seed-phrase
  - https://github.com/untoldhq/near-crossword
  - https://github.com/Archiolidius/near-crossword
  - https://stacker.news/items/690106
  - https://tangem.com/zh-Hans/wallet-for/pillar/
- **Уверенность:** низкая. Возможно, позиция ошибочна или описывает очень узкий/удалённый проект.

## 13. "Bitcoin Treasure-Hunt Book Series" (литературные загадки, 25% роялти)
- **Суть:** Наиболее вероятное соответствие — «CRACKED: The Bitcoin Armchair Treasure Hunt» профессора F: книга ~150 страниц (март 2021), нужно найти 12 «Keywords», которые открывают Bitcoin-кошелёк. Стоила ~$15, приз начинался с ~$15–25 тыс. На апрель 2021 известны 4 слова (Blouse, Garage, Pretty, Love — главы 1, 2, 3, 12), проверить слово можно было только открыв кошелёк целиком. 1 января 2026 автор выпустил видео с 10 из 12 слов, вскоре пазл решил «GuestUser17» с Discord Mysterious Writings; итог — 0.3 BTC (≈$27 000).
- **Механизм:** 12 ключевых слов, спрятанных в тексте книги, вводятся как единый пароль; частичная проверка невозможна.
- **Статус:** **решён** (1 января 2026; окно охоты 16.04.2021 — 01.01.2026).
- **Приз/адрес:** 0.3 BTC ($27 000 финально). Адрес **не подтверждён**.
- **Источники:**
  - https://treasurehuntdb.com/cracked
  - https://mysteriouswritings.com/cracked-bitcoin-armchair-treasure-hunt-by-professor-f/
  - https://mysteriouswritings.proboards.com/thread/6086/cracked-bitcoin-treasure-hunt-started
  - https://www.youtube.com/@professorf1322/featured
  - https://ru.beincrypto.com/professor-iz-kalifornii-zashifroval-klyuch-ot-vts-koshelka-v-knige/
  - https://mysteriouswritings.com/8-fall-2024-treasure-hunts-that-are-fully-armchair/
- **Уверенность:** средняя. **Не подтверждено: «серия книг» (это одна книга), «25% роялти», адрес кошелька.** Не совпадают по описанию: «Hunting Time» (роман VeteranHODL, 420 000 сатоши, решён 18.08.2026 пользователем `_radosinsky`, https://x.com/VeteranHODL/status/2090400955707830480) и «Move Over Brokers, Here Comes The Blockchain» Кейра Финлоу-Бейтса (8 ключей в англ. издании + 4 в итал., по 0.002 BTC; https://kf106.medium.com/everyone-loves-a-treasure-hunt-93885ae8d80a).

## 14. "Veil Hunts" от findveil.com
- **Суть:** Физические охоты за сокровищем от братьев Джеффа и Пола Дувилла (Veil Treasure Hunts), запуск 27 марта 2025. Каждая длится 7–22 дня, ежедневно в 10:00 зона поиска сужается и выходит новая подсказка. Форматы: фото у тайника, карты, текстовые подсказки, визуальный контекст, словесные решения и шифры. На месте trail cam обновляется каждые 30 минут или по датчику движения. Побеждает первый, кто физически коснётся сокровища, но нужен зарегистрированный аккаунт. Охота #1 — $2500 наличными с ростом фонда.
- **Механизм:** не криптографический: сужающийся круг поиска, карты, фото, шифры, словесные задачи; обязательное присутствие на месте (BOTG).
- **Статус:** серия активна (архив на Mysterious Writings).
- **Приз/адрес:** заявлено $1380–$2020; в источниках — $2500 наличными для охоты #1. Крипто-адреса нет. Диапазон $1380–$2020 **не подтверждён**.
- **Источники:**
  - https://mysteriouswritings.com/veil-treasure-hunts-findveil/
  - https://mysteriouswritings.com/veil-hunts-six-questions-with-the-creators-jeff-and-paul/
  - https://mysteriouswritings.com/category/armchair-treasure-hunts/veil-hunts/
  - https://www.delawareonline.com/picture-gallery/news/2025/08/27/treasure-hunt-veil-nj/85759188007/
  - http://www.pressdisplay.com/pressdisplay/iphone/dhn.aspx?zone=waarticled2ecfa2d-7073-41b7-bb61-7f2eadc847e3&articleId=d2ecfa2d-7073-41b7-bb61-7f2eadc847e3
  - https://discord.com/invite/hhHGAnA435
- **Уверенность:** высокая по механике/формату. **Не подтверждено: домен `findveil.com`** — везде фигурируют бренд «Veil Treasure Hunts» и Discord/страница Mysterious Writings.

## 15. Paradigm "Kryptos" CTF
- **Суть:** 12 июня 2026 Paradigm (Дэн Робинсон, Мэтт Хуанг) объявила, что стала хранителем секрета скульптуры «Kryptos» Джима Сэнборна и выкупила приватный архив. Верификация K4: плейнтекст прогонялся через SHA-256 на отдельном ноутбуке, хеш уходил в Google Cloud KMS, который выдавал HMAC-тег; ноутбук уничтожили, плейнтекст не покидал устройство, ответ не видят даже организаторы. Отдельно запущен CTF из 10 новых пазлов в стиле Kryptos с призом $1000 за первый решённый каждый. Ответы на K1–K3 опубликованы; за отправку ответа на K4 берут $1; Сэнборн также передал шифртекст 97-символьной загадки K5.
- **Механизм:** классический криптоанализ в стиле Kryptos; верификация K4 — SHA-256 → HMAC через Google Cloud KMS (one-way).
- **Статус:** CTF открыт («puzzles and leaderboard will remain open until the puzzles are solved»); K4 не решён (более 13 000 дней).
- **Приз/адрес:** $1000 × 10 = $10 000 за CTF; за K4 — сам ответ, плюс $1 за попытку. Крипто-адрес/контракт **не подтверждён**.
- **Источники:**
  - https://www.paradigm.xyz/writing/kryptos
  - https://paradigm.xyz/kryptos-ctf/
  - https://paradigm.xyz/kryptos-ctf/rules
  - https://paradigm.xyz/kryptos-ctf/official-rules
  - https://paradigm.xyz/kryptos-ctf/leaderboard
  - https://paradigm.xyz/kryptos/
  - https://en.wikipedia.org/wiki/Kryptos
- **Уверенность:** высокая. **Не подтверждено: обозначения «PK1–PK10»** — на официальных страницах только «10 puzzles» и «$1,000 prize each». Также не подтверждено, сколько пазлов решено (лидерборд отдал только заголовок).

## 16. Groestlcoin puzzle (1000.0001 GRS)
- **Суть:** На groestlcoin.org/puzzle опубликовано изображение `GRS-puzzle.png` (2048×2048) и условие «реши пазл и выиграй 1000 GRS», обсуждение в Discord. На bitcointalk тему создал 30 апреля 2019 пользователь RuBro: монеты лежат с 10 августа 2018, рисунок открывается в программе «solved» с результатом `356ef`, приведена длинная морзе-строка. Cent21 уточнил, что обсуждение идёт в Discord несколько месяцев и сообщество «всё ещё на второй стадии».
- **Механизм:** визуальный пазл + программа «solved» → значение `356ef` → морзе-строка → далее. Полный алгоритм не раскрыт.
- **Статус:** открыт более 8 лет. Прямая проверка Groestlsight: баланс `1000.0001` GRS, `totalReceived` = `1000.0001`, `totalSent` = 0, 1 транзакция — приз **никогда не тратился**.
- **Приз/адрес:** 1000.0001 GRS; `FindKEYLrVaahtkaVRk8KTspRMyWxfUi3i`; финансирование 2018-08-10.
- **Источники:**
  - https://www.groestlcoin.org/puzzle/
  - https://groestlsight.groestlcoin.org/address/FindKEYLrVaahtkaVRk8KTspRMyWxfUi3i
  - https://bitcointalk.org/index.php?topic=5137602.0
  - https://bitcointalk.org/index.php?topic=5137602.msg50830947#msg50830947
  - https://bitcointalk.org/index.php?topic=5137602.msg51146893#msg51146893
  - https://i0.wp.com/www.groestlcoin.org/wp-content/uploads/2018/11/GRS-puzzle.png
  - https://discord.gg/7DYTTmz
- **Уверенность:** высокая. Не подтверждено: полный механизм (вторая стадия) и актуальная активность Discord.

## 17. QDay "Steal this vault" (Solana)
- **Суть:** По точному названию и программе `22AEUZtxpbi1ReJGrG9SyFob3uHGzZERERyVNp6uV8Y6` **ничего не найдено**; домен `beforeqday.com/challenge` не появился. Общий контекст «Q-Day» — не пазл, а тема квантовой угрозы для Solana: Winternitz Vault, roadmap с выбором Falcon, челлендж Blueshift «Pinocchio Quantum Vault». Близко по смыслу, но **не то же самое**.
- **Механизм:** предположительно Winternitz-подписи / квантово-устойчивый vault (хеш-подписи, новый адрес после каждой транзакции) — **гипотеза по контексту**.
- **Статус:** **не подтверждено.**
- **Приз/адрес:** программа `22AEUZ…` **не подтверждена**; сумма не найдена.
- **Источники (контекст, НЕ подтверждение):**
  - https://rockawayx.com/insights/quantum-computing-and-solana-not-an-existential-threat
  - https://learn.blueshift.gg/id/challenges/pinocchio-quantum-vault
  - https://github.com/dtmrc/solana-winternitz-vault
  - https://coinmarketcap.com/community/articles/6a09e27d41cc441fd4118e1b/
  - https://www.mlh.com/challenges/019f1439-7cef-b445-1226-94ae3bfd1656
- **Уверенность:** низкая. Указывать в каталоге как проверенный факт нельзя.

## 18. "Timeless $1000 Random Seed Puzzle"
- **Суть:** 8 марта 2023 `u/timelesssmidgen` перевёл ETH на $1000 в новый кошелёк с 24-словной seed-фразой, переставил слова случайно и опубликовал их в r/CryptoCurrency: кто получит доступ — забирает содержимое. Цель — демонстрация стойкости: 23! ≈ 2.6e22 перестановок, при миллиарде проверок в секунду ~820 тысяч лет. Для контраста выложил $5 в ALGO с 12 словами в случайном порядке — вскрыли примерно за 30 часов (11! ≈ 4.0e7). 17 апреля 2023 вышел апдейт: за месяц ничего не изменилось, ETH не тронуты и подорожали (≈$1400).
- **Механизм:** 24-словная BIP-39 фраза с перемешанными словами; последнее слово — контрольная сумма. Атака — перебор перестановок с проверкой контрольной суммы. Все 24 слова действительно в BIP-39 wordlist.
- **Статус:** решён/закрыт. Баланс на 2026-10-16 равен 0. История (Blockscout): приход 0.061679 ETH (02.03.2023), приход 0.0595 ETH (08.03.2023), затем **исходящая 0.656638960284585 ETH 15 февраля 2025** на `0x1B3042778025B1316Bc894c4FDA6BBAdF0fA9d67`.
- **Приз/адрес:** заявлено 0.062 ETH (депозит 0.0595 ETH 08.03.2023 = «$1000» на тот момент; ранее ещё 0.061679 ETH); `0xb6f420204511C7fE9Dd3DE14266a260e8f11aC37`; получатель при опустошении `0x1B3042778025B1316Bc894c4FDA6BBAdF0fA9d67`.
- **Источники:**
  - https://www.reddit.com/r/CryptoCurrency/comments/11lvr29/100_in_eth_if_you_guess_the_order_of_my_seed/
  - https://www.reddit.com/r/CryptoCurrency/comments/12pfsb4/update_1400_in_eth_still_available_if_you/
  - http://www.pmstudios.biz/nftbox/2023/04/17/update-1400-in-eth-still-available-if-you-correctly-order-my-seed-words/
  - https://www.reddit.com/user/timelesssmidgen/
  - https://github.com/rebicul/24_seed_phrase_guesser
  - https://eth.blockscout.com/api/v2/addresses/0xb6f420204511C7fE9Dd3DE14266a260e8f11aC37/transactions
- **Уверенность:** высокая. **Не подтверждено:** (а) сумма именно «0.062 ETH» — фактически 0.0595 + 0.061679 ETH; (б) «решён» — подтверждено только опустошение 15.02.2025, публичного заявления решателя не найдено.

## 19. Trezor bug bounty (до $100 000, доступ к seed-фразе)
- **Суть:** Trezor ведёт публичную программу bug bounty. В scope: устройства и прошивка (подлинность, целостность прошивки, защита PIN, **конфиденциальность seed** — сид не извлекается иначе как через намеренно инициированное пользователем резервное копирование, целостность подтверждений, правдоподобное отрицание, приватность, доступность), Trezor Suite и Connect, Blockbook и backend, сайт. Модель угроз: враждебный хост, физический доступ (разборка, декапсуляция, зондирование), «evil maid», компрометация цепочки поставок. Награда зависит от серьёзности; **«до $100 000» в полученном тексте страницы не зафиксировано**.
- **Механизм:** fault injection, атаки на secure boot, враждебный USB/Bluetooth-хост, supply-chain и физические атаки. Известный практический результат — «Unfixable Seed Extraction on Trezor» от Ledger Donjon.
- **Статус:** программа активна постоянно (не пазл с дедлайном).
- **Приз/адрес:** выплаты по шкале серьёзности; «до $100 000» **не подтверждено**. Крипто-адреса нет.
- **Источники:**
  - https://trezor.io/security
  - https://trezor.io/ja/other/partner-portal/for-developers/trezor-bug-bounty-program-scope-rules-and-rewards
  - https://trezor.io/pt-br/other/partner-portal/for-developers/trezor-bug-bounty-program-scope-rules-and-rewards
  - https://trezor.io/de/security
  - https://www.ledger.com/blog/Unfixable-Key-Extraction-Attack-on-Trezor
  - https://www.praefortis.us/wallet-bounty
- **Уверенность:** средняя. Не подтверждено: конкретный максимальный размер награды.

## 20. "Bitimage" kitten photo puzzle
- **Суть:** Проект `bitimage` Кори Филлипса превращает файл в BIP-39-мнемонику через data URI и генерирует Bitcoin-ключи; вдохновение — стеганография Андреаса Антонопулоса в твите с фотографией котёнка (май 2015). Создано два приза: (1) кошелёк с BIP39-парольной фразой на **0.01 BTC** (`bc1qcyrndzgy036f6ax370g8zyvlw86ulawgt0246r`), не тронут, плюс докапитализация 0.000019 BTC в апреле 2025; (2) приз **0.00095133 BTC** (`bc1q57euh23y3qs2f9d5mtwpax5lqecfvrdkqce82a`), вскрыт через 6 дней.
- **Механизм:** файл → data URI → SHA-256 → энтропия BIP-39 → мнемоника → ключ по `m/84'/0'/0'/0/0` (`sha256-to-bip39-entropy`). Для приза 0.01 BTC дополнительно требовалась BIP-39 passphrase. SHA-256 исходного изображения `b988e0881a0211222e83f3e2a4bfac695c951bf96aa33ec112fab6992f5e7343`, 265 456 байт (архив: https://web.archive.org/web/20210520115853id_/https://pbs.twimg.com/media/CGDHoYiU0AEQXze.jpg).
- **Статус:** приз 0.00095133 BTC — **решён** 09.07.2019 (585 488 секунд после финансирования 03.07.2019); приз 0.01 BTC — открыт. В формулировке задания смешаны две разные задачи `bitimage`.
- **Приз/адрес:** 0.00095133 BTC → `bc1q57euh23y3qs2f9d5mtwpax5lqecfvrdkqce82a` (claim tx `49638d16a21133febb093580527e50039eee630e2c4918a0654a71ef437ad093`); 0.01 BTC (+0.000019) → `bc1qcyrndzgy036f6ax370g8zyvlw86ulawgt0246r` (открыт). Entropy `1808d35318ac7cb98b69ff9779b699d6a631f15e0b353ac89b7c4020774832ed`; pubkey `021209b131dfbd1efcfe15b1d1e92002653f5fc98e9ff6cb73a0d70153dbe58463`.
- **Источники:**
  - https://github.com/coreyphillips/bitimage
  - https://github.com/coreyphillips/coreyphillips.github.io
  - https://coreyphillips.github.io
  - https://corey-lyle-phillips.medium.com/part-1-3-turn-your-photos-into-bitcoin-private-keys-addresses-57669771cf7a
  - https://twitter.com/aantonop/status/603701870482300928
  - https://github.com/agntn/puzzles/issues/31
  - https://puzzles.agntn.dev/collections
- **Уверенность:** высокая. **Уточнение:** спрятана BIP-39-мнемоника из data URI фото, а не «seed»; фото — твит Антонопулоса, но пазл создал Кори Филлипс.

## 21. "1 BTC Brainwallet" DEFCON 2014 puzzle
- **Суть:** По формулировке «20 подсказок из книги → brainwallet, 1 BTC, DEFCON 2014» прямой источник не найден. Ближайшее подтверждённое совпадение — «The One Bitcoin Heist»: челлендж 2014 года на 1 BTC, разобранный Джозефом Габаем на DEF CON 33 («Making a custom Hashcat module to solve a decade-old puzzle challenge»). На DEF CON 23 (2015) был доклад Райана Кастеллуччи «Cracking Cryptocurrency Brainwallets». Комбинации «20 подсказок из книги» нет ни в одном из этих материалов.
- **Механизм:** brainwallet (парольная фраза → ключ), взлом через Hashcat с кастомным модулем. Использование книги как источника 20 подсказок — **не подтверждено**.
- **Статус:** **решён** (тема доклада — решение задачи 2014 года в 2025).
- **Приз/адрес:** 1 BTC; адрес **не подтверждён**.
- **Источники:**
  - https://media.defcon.org/DEF%20CON%2033/DEF%20CON%2033%20presentations/Joseph%20Gabay%20-%20The%20One%20Bitcoin%20Heist%20Making%20a%20custom%20Hashcat%20module%20to%20solve%20a%20decade-old%20puzzle%20challenge.pdf
  - https://infocondb.org/con/def-con/def-con-33/the-one-bitcoin-heist-making-a-custom-hashcat-module-to-solve-a-decade-old-puzzle-challenge
  - https://www.classcentral.com/course/youtube-def-con-33-making-a-custom-hashcat-module-to-solve-a-decade-old-puzzle-challenge-joseph-gabay-491493
  - https://media.defcon.org/DEF%20CON%2023/DEF%20CON%2023%20presentations/DEF%20CON%2023%20-%20Ryan-Castellucci-Cracking-Cryptocurrency-Brainwallets.pdf
  - https://www.reddit.com/r/bitcoinpuzzles/comments/7asy51/brainwallet_puzzle_004_btc_reward/
  - https://github.com/agntn/puzzles
- **Уверенность:** низкая. **Возможна путаница** с brainwallet-пазлом 2017 года на 0.04 BTC (12 тривиа-загадок, ответы 1–10 = passphrase, 11–12 = salt scrypt в brainwallet.io, автор `Kierkegaard_Soren`, решил `Quantris` за 21 576 секунд) — он документирован точно, но подсказок 12, а не 20, и это не DEFCON 2014.

---

## Сводная таблица

| № | Название | Статус | Приз | Он-чейн проверено |
|---|---|---|---|---|
| 1 | Oobit #139 | открыт | 1 545 000 сат | да (не потрачен) |
| 2 | kTimesG Phy | открыт | 800 000 сат | да (не потрачен) |
| 3 | Solana Puzzles #4 | открыт | 0.834 SOL | да (не потрачен) |
| 4 | Bitcoin Coders Puzzle 07 | не найдено | 21 000 сат | да (адрес есть) |
| 5 | LuckyLurker Vault #2 | отложен | 1 BTC | да (задепонирован) |
| 6 | seed-phrase.com | открыт/спящий | 0.01 BTC | да (не потрачен) |
| 7 | The Great Riddle | открыт | 0.00423871 BTC | да (не потрачен) |
| 8 | Anime Seed Phrase | не подтверждено | ~0.2 BTC (?) | нет |
| 9 | Actuarial NFT Hunt | не подтверждено | до 10 ETH (?) | нет |
| 10 | bitaddress BIP38 | открыт | 0.005297 BTC | да (не потрачен) |
| 11 | 310 BTC финал | открыт (3/4) | 0.31 BTC | нет (адрес не найден) |
| 12 | Seed Phrase Crossword | не найдено | — | нет |
| 13 | Treasure-Hunt Book | решён (01.2026) | 0.3 BTC / $27k | нет (адрес не найден) |
| 14 | Veil Hunts | активна | $2500 (охота #1) | n/a (физический) |
| 15 | Paradigm Kryptos CTF | открыт | $1000 × 10 | нет |
| 16 | Groestlcoin | открыт (с 2018) | 1000.0001 GRS | да (не потрачен) |
| 17 | QDay Steal this vault | не найдено | — | нет |
| 18 | Timeless seed | решён (15.02.2025) | 0.0595+0.061679 ETH | да (баланс 0) |
| 19 | Trezor bounty | активна | до $100k (?) | n/a |
| 20 | Bitimage kitten | решён + открыт | 0.00095133 / 0.01 BTC | да (частично) |
| 21 | 1 BTC Brainwallet | решён (?) | 1 BTC (?) | нет |

## Что требует внимания при включении в каталог
- **Пометить «не подтверждено»:** №4, №8, №9, №12, №17 — источники не найдены; для №8 и №9 ссылки — контекст, а не подтверждение.
- **Исправить формулировки задания:** №2 (не seed, а ECDSA-подпись + эмодзи-изображение); №7 (конкретно The Great Print / Бартош Левицки); №11 (3 из 4 стадий, адрес финала не подтверждён); №13 (одна книга «CRACKED», а не серия; «25% роялти» не подтверждено); №17 (не найден вовсе); №18 (фактически 0.0595 + 0.061679 ETH, не 0.062; опустошён 15.02.2025); №20 (не seed, а мнемоника из data URI; автор — Кори Филлипс; два разных приза); №21 (скорее «The One Bitcoin Heist», «20 подсказок из книги» не подтверждено).
- **Даты:** большинство найденных страниц в этой среде датированы 2026 годом; отчёт отражает состояние на **2026-10-16**.