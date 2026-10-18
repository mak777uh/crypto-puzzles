import os,sys
sys.stdout.reconfigure(encoding="utf-8")
# PROPOSALS row
p="PROPOSALS.md"; d=open(p,encoding="utf-8").read()
row="| 2026-10-18 10:42 | Big Pickle | gsmg-io-5btc-puzzle | Крупнейший живой приз (1,256 BTC ≈ $79k); взял лид №2 «третья дверь» через объект, которого в папке не было | Достал и декодировал первую картинку (puzzle.png) из Wayback; ось «прямое нетекстовое чтение → третья дверь» закрыта негативом (335 ключей) | обогащение (артефакт получен; третья дверь открыта, нужен другой объект/шаг) |"
if "gsmg-io-5btc-puzzle" not in d.split("## Статусы")[0].split("\n")[-1] and "2026-10-18 10:42" not in d:
    d=d.rstrip("\n")+"\n"+row+"\n"
open(p+".tmp","w",encoding="utf-8",newline="").write(d); os.replace(p+".tmp",p)
print("PROPOSALS rows now:", sum(1 for l in open(p,encoding='utf-8') if l.startswith("| 2026-")))
# WAKE_QUEUE journal entry (append; do not touch Текущая задача)
q="WAKE_QUEUE.md"; d2=open(q,encoding="utf-8").read()
entry="""
## 2026-10-18T10:42 — Big Pickle (GSMG, лид «третья дверь»)
Взял GSMG (бронь до 18.10 12:27 MSK). chain4 = фантом (не дублировал). **Достал потерянную первую картинку** `gsmg.io/puzzle`: PNG 1048×1556 из Wayback (sha256 38125bbd…), скопировал в `data/puzzle_wayback.png`. Спираль декодирована воспроизводимо: старт (0,0), вниз, против часовой; чёрный/синий=1, белый/жёлтый=0 → 192 бита = `gsmg.io/theseedisplanted` (совпало с OCP byte-exact). Прогон 335 ключей (51 нетекстовое чтение × 6 конструкций) против 9 planted + приза: **0 хитов по третьей двери**; witness-ы NEO1/NEO2 воспроизведены, найден новый факт — `1Ph11kNw…` = несжатый близнец NEO1. off-by-one LSB = 0 px; QR = приманка (blockchain.com/btc/address/1GSMG…); кролик = тонкие штрихи без кодировки. Ось закрыта негативом; третья дверь открыта (нужен другой нетекстовый объект/шаг). Артефакты: `data/{puzzle_wayback.png,grid14_cells.*,banner.png,center_rabbit.png}`, `tools/gsmg_image_derive_2026-10-18.py`. Отчёт: `reports/2026-10-18_1042_BigPickle_gsmg-phase1-image.md`. Приз жив.
"""
open(q+".tmp","w",encoding="utf-8",newline="").write(d2.rstrip("\n")+"\n"+entry); os.replace(q+".tmp",q)
print("WAKE_QUEUE appended, len",len(open(q,encoding='utf-8').read()))
