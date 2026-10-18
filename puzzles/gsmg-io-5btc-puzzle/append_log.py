import io,os,sys
sys.stdout.reconfigure(encoding="utf-8")
entry = """

## 2026-10-18 — Big Pickle (big-pickle / OpenCode, Windows) — GSMG: получена «первая картинка» (puzzle.png), спираль вскрыта байт-в-байт
- Контекст: chain4 закрыт как фантом (Qoder ч.6, Hark, #111) — строку QUICK_WINS «разобрать 1151 B» дублировать не стал. Пользователь выбрал GSMG; перешёл к лиду №2 «третья дверь» и к объекту, которого в папке НЕ было — исходная картинка фазы 1.
- Делал:
  1. Достал `https://gsmg.io/puzzle` (puzzle.png, 1048×1556, colortype 6 RGBA) из Wayback: `web.archive.org/web/20201112011308id_/https://gsmg.io/puzzle`, sha256 `38125bbdf1ea58b9b30b075bc6bf71e4089d04bba37098317e47097e2f2a1830`. Ранее картинки в папке не было.
  2. Структура: верх = сетка 14×14 ячеек по 75 px (чёрные/белые + 24 цветных: 9 жёлтых, 15 синих), красная линия y≈1047, ниже серая плашка-баннер с текстом и QR.
  3. **Спираль декодирована воспроизводимо**: старт (0,0), вниз, против часовой, inward; **чёрный/синий = 1, белый/жёлтый = 0** → первые 192 бита = `gsmg.io/theseedisplanted` (совпало байт-в-байт с README стр.87). Последние 4 бита (центр 2×2) = «кролик», spare.
  4. OCR баннера (EasyOCR CPU): «GSMG.IO 5 BTC PUZZLE CHALLENGE» + призовой адрес — картинка идентифицирована.
- Гипотеза/ось (записано ДО прогона): README стр.48 прямо говорит, что ДВА из 9 planted-адресов построены из «raw/reversed bit-image URL»: NEO1=`148XH2YB…`=raw_left(URL), NEO2=`13HGhjkm…`=bits192_left(URL) — конвенция «X=производное картинки → ключ» сертифицирована. Значит, третья дверь `1NULY…` (без preimage) может читаться ДРУГИМ нетекстовым чтением той же картинки (хинт 2020-01-14: «Go back to the first puzzle piece … may contain a whole lot more»). Ось: перебрать нетекстовые чтения картинки (196 бит: спираль-2-направления, row/col-major, реверс, инверсия; младшие биты кролика; баннер; QR) × 6 конструкций (sha256/raw_left/raw_right/bits192_left/bits192_right/bytes_rev) → P2PKH → сверить со всеми 9 planted + призом. Прогон ≤15 мин.
- Артефакты: `data/puzzle_wayback.png`, `data/grid14_cells.txt`, `tools/gsmg_image_derive_2026-10-18.py`.
"""
p="LOG.md"
data=open(p,encoding="utf-8").read()
open(p+".tmp","w",encoding="utf-8",newline="").write(data.rstrip("\n")+"\n"+entry)
os.replace(p+".tmp",p)
print("LOG appended, new len",len(open(p,encoding="utf-8").read()))
