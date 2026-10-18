# -*- coding: utf-8 -*-
# gsmg_s570_bifid_lead6.py — (2026-10-17, AutoClaw)
# Воспроизводимый проход по лиду OCP #6: "29 dropped letters".
# 1) FAED570 (SalPhaseIon-поток, поле S570 из akavaru_115.txt) -> Bifid-декод
#    (квадрат DBIFHCEG + алфавит без J, координаты вперемешку, период 570)
#    -> выход начинается с BTCSEED (сертификат OCP #5).
# 2) Нечётные позиции выхода (1-й,3-й,...) = 285 букв; удаление I/O -> 256 символов
#    над 23-буквенным алфавитом (сертификат OCP #6). 29 выброшенных букв = сообщение-кандидат.
# 3) Чтения: сырые I/O, бинарный текст (2 полярности x 2 порядка), dec/hex (padded),
#    5-битные группы, run-length, пары base-4 — все против оракула OCP (sha256 -> small blob).
# Результат: 0 совпадений (см. data/lead6_29_dropped_letters_2026-10-17.md).
FAED570 = (
"FAEDGGEEDFCBDABHHGGCADCFEDDGFDGBGIGAAEDGGIAFAECGHGGCDAIHE"
"HAHBAHIGCEIFGBFGEFGAIFABIFAGAEGEACGBBEAGFGGEEGGAFBACGFCDB"
"EIFFAAFCIDAHGDEEFGHHCGGAEGDEBHHEGEGHCEGADFBDIAGEFCICGGIFD"
"CGAAGGFBIGAICFBHECAECBCEIAICEBGBGIECDEGGFGEGAEDGGFIICIIIF"
"IFHGGCGFGDCDGGEFCBEEIGEFIBGIBGGGHHFBCGIFDEHEDFDAGICDBHICG"
"AIEDAEHAHGHHCIHDGHFHBIICECBIICHIHIIIGIDDGEHHDFDCHCBAFGFBH"
"AHEAGEGECAFEHGCFGGGGCAGFHHGHBAIHIDIEHHFDEGGDGCIHGGGGGHADA"
"HIGIGBGECGEDFCDGGACCDEHIICIGFBFFHGGAEIDBBEIBBEIIFDGFDHIEE"
"EIEEECIFDGDAHDIGGFHEGFIAFFIGGBCBCEHCEABFBEDBIIBFBFDEDEEHG"
"IGFAAIGGAGBEIICHIEDIFBEHGBCCAHHBIIBIBBIBDCBAHAIDHFAHIIHIC")
def make_square(key="DBIFHCEG"):
    alpha=[c for c in "ABCDEFGHIKLMNOPQRSTUVWXYZ"]  # J исключена
    seen=[]
    for ch in key:
        if ch not in seen: seen.append(ch)
    for ch in alpha:
        if ch not in seen: seen.append(ch)
    return [seen[i*5:(i+1)*5] for i in range(5)]
def bifid_dec_interleave(s, square):
    pos={square[r][c]:(r,c) for r in range(5) for c in range(5)}
    flat=[v for ch in s for v in pos[ch]]
    n=len(s); rows, cols = flat[:n], flat[n:]
    return "".join(square[rows[i]][cols[i]] for i in range(n))
if __name__=="__main__":
    sq=make_square()
    out=bifid_dec_interleave(FAED570, sq)
    assert out.startswith("BTCSEED"), out[:20]
    odd=out[1::2]
    dropped="".join(ch for ch in odd if ch in "IO")
    kept="".join(ch for ch in odd if ch not in "IO")
    print("bifid:", out[:40], "...")
    print("odd285:", len(odd), "dropped29:", dropped, "kept256 alphabet:", len(set(kept)))
