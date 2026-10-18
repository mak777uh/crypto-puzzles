# -*- coding: utf-8 -*-
"""bitaddress: генерация словаря кандидатов из корпуса q + типовых паролей, затем параллельный BIP38-прогон."""
import os, re, sys, time, itertools
from multiprocessing import Pool

BASE = r"C:\Users\Admin\OneDrive\Desktop\master\puzzles\bitaddress-bip38-giveaway-0-005297btc"
DATA = os.path.join(BASE, "data")
sys.path.insert(0, os.path.join(BASE, "tools"))
import bip38_check


def collect_words():
    txt = ""
    for fn in ["q_corpus.txt", "item_275973.md", "q_all.md", "q_all_p2.md", "q_all_p3.md", "cands_thread.txt"]:
        p = os.path.join(DATA, fn)
        if os.path.isfile(p):
            txt += open(p, encoding="utf-8", errors="replace").read() + "\n"
    words = set()
    for w in re.findall(r"[A-Za-z]{3,20}", txt):
        words.add(w.lower())
    common = """love life laugh bitcoin btc satoshi bitaddress passphrase password wallet paper coins coin
    brute force crack hacker hodl moon lambo secret key private public address blockchain crypto
    money freedom future hope faith trust dream light dark soul heart mind time space world earth
    fire water wind stone gold silver diamond star sun moon sky ocean river mountain forest
    angel devil heaven hell god jesus satan chaos order truth lie real fake happy sad
    john jane mary michael david peter paul anna maria alex max sam bob admin root
    qwerty asdfgh zaqwsx dragon monkey master shadow phoenix eagle tiger lion wolf
    bitcoin2015 test testing password1 welcome letmein football baseball starwars
    sunshine princess flower rainbow butterfly thunder computer internet google
    forever nothing everything something anyone welcome hello world paperwallet
    satoshi2015 bitaddress2015 blockchain2015 bitcoin2016""".split()
    words.update(common)
    return sorted(words)


def build_candidates():
    words = collect_words()
    years = [str(y) for y in range(1990, 2024)] + ["%02d" % (y % 100) for y in range(1990, 2024)]
    cands = set()
    # одиночные + капитализация
    for w in words:
        cands.add(w)
        cands.add(w.capitalize())
        cands.add(w.upper())
    # слово + год / год + слово
    for w in words:
        for y in years:
            cands.add(w + y)
            cands.add(w.capitalize() + y)
    # пары слов (топ-140 слов, чтобы не взорваться)
    top = words[:140]
    for a, b in itertools.product(top, top):
        cands.add(a + b)
        cands.add(a.capitalize() + b.capitalize())
    # цифры/банальности
    basic = ["123456", "12345678", "1234567890", "qwerty123", "111111", "000000", "121212",
             "987654321", "123123", "654321", "1337", "31337", "420420", "666666", "777777"]
    cands.update(basic)
    # фильтр: <=30 символов, без спецсимволов/пробелов
    out = []
    for c in cands:
        if 3 <= len(c) <= 30 and re.fullmatch(r"[A-Za-z0-9]+", c):
            out.append(c)
    out = sorted(set(out))
    return out


def main():
    cands = build_candidates()
    print("candidates:", len(cands))
    # ограничение по времени
    budget = int(sys.argv[1]) if len(sys.argv) > 1 else 600  # секунд
    open(os.path.join(DATA, "cands_corpus.txt"), "w", encoding="utf-8").write("\n".join(cands))

    t0 = time.time()
    found = []
    done = 0
    with Pool(16) as pool:
        it = pool.imap_unordered(bip38_check.check, cands, chunksize=8)
        for res in it:
            done += 1
            if res:
                found.append(res)
                print("FOUND", res, flush=True)
                pool.terminate()
                break
            if time.time() - t0 > budget:
                print("time budget reached", done, flush=True)
                pool.terminate()
                break
    print("done tested:", done, "found:", len(found), "elapsed %.0fs" % (time.time() - t0))


if __name__ == "__main__":
    main()
