# LunarCrush Lunar Vault — 62 BTC на луноходе MAPP (Лунный южный полюс)

**Тип**: физически размещённый ключ кошелька (не on-chain-задача и не криптограмма).
**Приз**: **62 BTC** (~$1.5M на момент анонса 2023-03-23), кошелёк «заперт» в физическом хранилище на
луноходе **MAPP Lunar Rover** (Lunar Outpost), прикреплённом к посадочной платформе Blue Ghost (Firefly Aerospace).
**Статус по состоянию на наш проход**: нерешена/невостребована (ключ физически недоступен).
**Механика по первоисточнику**: «key affixed to the rover»; доступ только через реальную доставку к роверу
на Луне; объявлено, что план может предложить кто угодно на Земле.

## Что известно по датам (источники ниже)
- 2023-03-23 — анонс (PR Newswire): 62 BTC, MAPP, Blue Ghost, «key can only be accessed via space travel».
- 2023-04 — репортажи (Space.com, The Block): критика «publicity stunt», вопросы легитимности.
- 2025-02 — Lunar Outpost: первая миссия ровера «no earlier than February 26, 2025», южный полюс Луны.
  Публикация Lunar Outpost о первой миссии не подтверждает в лоб, что «treasure chest» полетел, — **требуется
  отдельная проверка статуса миссии и того, улетел ли ровер с сейфом**.

## Вердикт для нашей базы (2026-10-18, Qoder)
Не решаем: приз требует физического доступа к Луне, адрес кошелька публично не опубликован (в доступных нам
материалах), значит ончейн-проверка «есть ли ещё деньги» невозможна без документов программы.
Занесена в каталог как **загадка с неснятым призом**, чтобы следующий агент не считал её «новой находкой».
Единственный реальный путь к продвижению — найти опубликованный адрес (тогда — проверка баланса) и
условия claims (юридические/физические).

## Источники (открыты 2026-10-18)
- PR Newswire, 2023-03-23 (первоисточник): https://www.prnewswire.com/news-releases/lunarcrush-to-launch-bitcoin-treasure-hunt-on-lunar-outpost-rover-to-earths-moon-301779515.html
- Space.com: https://www.space.com/bitcoin-treasure-hunt-moon-lunar-rover
- The Block (критика/статус-кво): https://www.theblock.co/news/web3/2023-03-23-bitcoin-treasure-hunt-on-the-moon-brilliant-scheme-or-crazy-publicity-stunt-222167
- Hiro.so (разбор механики): https://www.hiro.so/blog/launching-a-bitcoin-treasure-hunt-on-the-moon
- LBB Online: https://lbbonline.com/news/lunarcrush-launches-bitcoin-treasure-hunt-on-lunar-outpost-rover-to-earths-moon
- Reddit-обсуждение (вопрос о доказательстве средств): https://www.reddit.com/r/CryptoCurrency/comments/16aofsr/after_the_headlines_how_are_lunarcrushs_plans_to/
- Lunar Outpost о первой миссии MAPP: https://www.lunaroutpost.com/post/lunar-outpost-to-launch-first-mission-to-explore-the-moon-s-surface-advancing-a-sustainable-human-p
- Обзоры/комментарии: https://space4peace.org/these-crypto-companies-want-to-commoditize-the-moon/ ; https://www.linkedin.com/posts/lunaroutpost_later-this-year-lunar-outpost-is-sending-activity-7046626550326181888-AbDF

## Что дальше (оси, суженные инсайтом)
1. **Поиск опубликованного адреса**: на сайте LunarCrush / в PDF условий / в архивных страницах web.archive.org.
   Если адрес найдён → `python tools/balance_check_fast.py`-стиль проверка (blockstream.info) и фиксация в LOG.
2. **Статус миссии**: Blue Ghost совершил посадку 2025-02-24; MAPP-ровер — отдельная загрузка, требует проверки.
3. **Легитимность**: при отсутствии публичного адреса пазл не имеет ончейн-оракула → вероятный вердикт `off-chain/physical`.

Хроника: см. LOG.md.
