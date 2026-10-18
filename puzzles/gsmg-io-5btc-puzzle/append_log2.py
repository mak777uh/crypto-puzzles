import os,sys
sys.stdout.reconfigure(encoding="utf-8")
res = """
- Результат прогона (51 нетекстовое чтение картинки × 6 конструкций = 335 ключей): **0 хитов по третьей двери**.
  - Сверка конвенции (witness-ы воспроизведены): `spiral192`→`raw_left` = NEO1 `148XH2YB…`; `spiral192`→`bits192_left` = NEO2 `13HGhjkm…`.
  - **Новый факт**: `1Ph11kNwGaKzuB2vc9h9dfDug73pM3mmPQ` = **НЕСЖАТЫЙ близнец NEO1** (тот же ключ = raw_left(URL)); значит конвенция planted дублирует compressed И uncompressed.
- Другие нетекстовые каналы картинки (все — чисто/закрыто):
  - off-by-one LSB-стего: **0 пикселей** (изображение = 6 базовых цветов + сглаживание краёв кролика/лого/текста; ровно 1 604 352 px в базовых цветах, ни одного «±1»).
  - QR в баннере декодирован: `https://www.blockchain.com/btc/address/1GSMG1JC9wtdSwfwApgj2xcmJPAwx7prBe` — та самая «приманка» (README стр.83).
  - «Кролик» над сеткой — тонкие штрихи ~15 px (14 компонент, 300–2475 px) поверх центра; кодировки нет.
  - Сетка 14×14 подтверждена: `.`(чёрных)=85, `#`(белых)=87, Y=9, B=15; 24 цветных сидят на индексах ≡7 mod 8 спирали — это биты 7,15,…,191 (младшие биты URL).
- Вывод: ось «прямое нетекстовое чтение первой картинки → третья дверь» **закрыта (негатив)**. Третья дверь остаётся открытой: хинт говорит о «правиле автора начала 2020 на нетекстовом объекте», но это, по-видимому, ДРУГОЙ объект (или чтение с дополнительным шагом), а не сама puzzle.png.
- Бонус для будущих агентов: страница `theseedisplanted` и её 8 ребусных картинок заархивированы — `web.archive.org/web/2020/https://gsmg.io/theseedisplanted` + `…/theseedisplanted/img/{black_banking - war, blue_ca, blue_dig_i, blue_lock_lo, red_crypto_gic, red_n_you, red_open_lock_n_ing, red_t}.png` (CDX 2020-11-12 … 2026). Прямые URL с домена мертвы с 07.2026.
- Артефакты: `data/puzzle_wayback.png` (sha256 38125bbd…), `data/grid14_cells.{png,txt}`, `data/banner.png`, `data/center_rabbit.png`, `tools/gsmg_image_derive_2026-10-18.py` (воспроизводимый прогон с witness-ами).
- Отчёт: `reports/2026-10-18_1042_BigPickle_gsmg-phase1-image.md`.
"""
p="LOG.md"; d=open(p,encoding="utf-8").read()
open(p+".tmp","w",encoding="utf-8",newline="").write(d.rstrip("\n")+"\n"+res)
os.replace(p+".tmp",p)
print("LOG ok, len",len(open(p,encoding="utf-8").read()))
