# Ballet 2 BTC — первоисточники, добытые 2026-10-19 через VPN (что нового и что это меняет)

Проверено до работы: оба приза живы (blockstream, 2026-10-19 20:46 UTC):
`1JxWyNrkgYvgsHu8hVQZqTXEB9RftRGP5m` = 100 003 481 сат, `1QGtbKxx6FKDD66LwnrzHCAHmyZ7mDHqC4` = 100 003 877 сат,
итого **200 007 358 сат (≈2,00007 BTC)**, spent 0, tx_count 3 и 3.

## 1. Мёртвый сайт награды восстановлен из архива: takebobbysbitcoin.com

Домен **NXDOMAIN** и через прокси, и напрямую (2026-10-19). Первоисточний текст взят из
`id_`-захвата Wayback **2020-07-31 05:18:32** (наш снимок: `_sources/ballet_ext_2026-10-19/page_dec.html`,
`page_text.txt`). Дословно (это и есть официальные условия):

> Wallet #1 — Public Address: `1JxWyNrkgYvgsHu8hVQZqTXEB9RftRGP5m`, Private Key:
> `6PnQmAyBky9ZXJyZBv9QSGRUXkKh9HfnVsZWPn4YtcwoKy5vufUgfA3Ld7`, BIP-38 Passphrase: **???**
> **Hint:** "The REAL Series Paper Wallet Passphrase contains **upper case English letters, numbers,
> and hyphens**. A total of **24 characters** in the following format: **XXXX-XXXX-XXXX-XXXX-XXXX**."
>
> Wallet #2 — Public Address: `1QGtbKxx6FKDD66LwnrzHCAHmyZ7mDHqC4`, Private Key: **???**,
> BIP-38 Passphrase: `594Y-L2RW-4ME7-2XVX-9B41`
> **Hint:** про приватный ключ (256 бит, Base58 WIF, BIP38 = 51 символ, начинается с `6P`, в конце
> error-checking код).

**Новое для папки:** формальное правило алфавита подсказки — `[A-Z0-9]` + дефисы в фиксированных
позициях (в README/`data/` этого утверждения не было, был только шаблон `XXXX-…`). Плюс официальные
URL: тред `https://bitcointalk.org/index.php?topic=5265748.0`, хэштег `#takebobbysbitcoin`,
«Website created by Friends of Satoshi», купон `TAKEBOBBYSBITCOIN`.

Ассеты захвата (аттестация носителей, sha256[:16] в `_fetch_manifest.json`):
`img_passphrase.png` (284 915 Б, `8950 4e47`) — фото карты **AA012381** с открытым passphrase
`594Y-L2RW-4ME7-2XVX-9B41` и адресом `1QGtbKxx…`; `img_privatekey.png` (266 389 Б);
`img_privatekey-sealed.png` (746 813 Б) — заклеенный стикер. Копии: `data/primary_2026-10-19/`.

## 2. Слово автора в ANN-треде (msg 54930754, bobbyclee, 2020-08-04) — закрывает «алгоритм по серийнику»

> "…both of these wallets (serial numbers **AA009926 and AA012381**) were taken from the manufacturing /
> production process in Las Vegas… These two wallets were NOT especially made for my hacking contest,
> nor were they 'hardened'… In fact, what I did was actually made them **EASIER** to hack, as I fully
> revealed one of the two critical components for each of the wallets: the BIP38 passphrase, and the
> encrypted private key."

И отдельно (MoparMiningLLC, тот же тред, пересказ процесса Ballet):

> "the private key and passphrase are **generated and engraved in separate geographical locations**,
> no single employee has enough information to compromise these wallets."

**Вывод (новое для папки):** passphrase **не выводится** из серийного номера и не генерируется
детерминированным алгоритмом, доступным наблюдателю — он печатается на другом объекте. Ось
«подобрать passphrase из AA009926» закрыта словами производителя, а не только оценкой сложности.

## 3. Арифметика, которую теперь нельзя переоценить

Формат из официальной подсказки: 20 переменных символов из 36 → 36^20 = **1,34·10^31 ≈ 2^103,6**,
и на каждую гипотезу — отдельный scrypt(N=16384, r=8, p=8) (BIP38 EC-multiply). Даже если принять
эмпирический паттерн двух известных passphrase (`594Y-…`, `335Y-…` = «3 цифры + Y» в первой группе),
пространство сжимается до 10^3·36^16 ≈ **2^85,6** — на порядки дальше от любого реального бюджета,
чем весь оставшийся перебор Guntis. **GPU-аренда под Ballet не имеет смысла ни в каком масштабе**;
единственный носитель недостающей информации — физическая карта AA009926 (или её фото).

## 4. Что осталось внешним (и где его искать)

- Фото/скрин карты AA009926 с открытым passphrase-полем: тред 5265748 (43 поста, скачаны все —
  `_sources/ballet_ext_2026-10-19/bitcointalk_5265748_all.json`, ключевые 22 поста в
  `bitcointalk_5265748_keyposts.md`) **не содержит** ни одного такого изображения; X-лента
  `bobbyclee` (1289004702122643456 и ответы) — только твит с фото AA012381.
- Поиск по bitcointalk гостю недоступен даже через VPN (стена регистрации), поэтому посты
  других тредов ищутся через WebSearch-сниппеты по фразам `#takebobbysbitcoin`, `AA009926`.
- Статус «часы тикают» с сайта больше не проверить: домен мёртв, страница награды живёт только в архиве.

## 5. Итог по оси

Остаётся **external-info / physical-carrier**, как и было зафиксировано. Цикл 2026-10-19 добавил
аттестованные первоисточники (формат+алфавит подсказки, заявление о раздельных локациях генерации,
3 изображения, полная копия ANN-треда) и **закрыл два потенциальных соблазна**: «алгоритм по
серийнику» и «сжать пространство до GPU-реального размера». Новых прогонов не запускалось.
