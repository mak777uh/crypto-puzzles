# Блобы финальных страниц (извлечены 2026-10-17, AutoClaw)
1) dualite_blob_2448B_salt_eefc4c5b_b64.txt
   Источник: community README (клон puzzlehunt/gsmgio-5btc-puzzle), раздел финальной страницы.
   Salted__ + salt eefc4c5befc1656a + 2432 B ct. Рабочее имя "Dualite" (2448 B).
2) phase23_page_blob_4112B_salt_9fbc451d_b64.txt
   Источник: wayback phase23_20201112.html (gsmg.io/choiceisanillusion...).
   Salted__ + salt 9fbc451d13d071f4 + 4096 B ct (страница phase 2/3).
Малый блоб (96 B, salt 3ab585348552415d) — в ocp oracle.py (BLOB_B64), на странице SalPhaseIon.
4) **4-й блоб «urlblob»** (112 B = 96 B ct, salt **74c974e3f92e64b5**) — восстановлен BigPickle 2026-10-18 из hex-URL в Wayback CDX:
   `data/urlblob_4th_salt_74c974e3.bin` (+ `.b64.txt`). Независимый контейнер (0 общих блоков с остальными).
   Детали и bounded-прогон: `data/urlblob_4th_blob_2026-10-18.md`. Полный CDX: `data/wayback_cdx_gsmg_2026-10-18.txt`.
