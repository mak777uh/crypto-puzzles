# -*- coding: utf-8 -*-
"""Повторная правка MASTER_CATALOG.md по genesis (18.10, агент OCP Sync).

Причина: проход другого агента 18.10 ~13:12 перезаписал каталог и снял мои правки от
10:0x. Правки побайтовые, по подстрокам-якорям, EOL каждой строки сохраняется, чужие
строки не трогаются. Идемпотентно: если маркер уже в строке — пропуск.
"""
import os

M = r"C:\Users\Admin\OneDrive\Desktop\master"
P = os.path.join(M, "MASTER_CATALOG.md")

STATUS = ("-  **Статус 2026-10-18 (OCP Sync): РЕШЁН внешним решателем, приз снят.** "
          "Свип 2026-10-17 03:40 UTC (блок 971803, tx `1c70c474…`, нетто 935 266 сат, "
          "финальный приз 947 620 сат); 120/120 выходов эскроу spent, баланс 0 — "
          "наша on-chain проверка 18.10 (mempool.space API). Инсайт: PBKDF2-HMAC-SHA512 "
          "rounds **181505** (соавтор A) и **200913** (соавтор B) вместо 2048 при "
          "пассфразе \u00abSatoshi Nakamoto\u00bb (entropy = первые 128 бит sha256(raw hex "
          "блока, байты 263\u2026400), путь m/48'/0'/1231006505'/2'/0/0). PR #44 (Schum-io), "
          "автор CaesarCoder. Папка перенесена в "
          "`solved/caesarcoder-genesis-block-wallet-puzzle-947ksats/`; хронология "
          "балансов 878 140 \u2192 168 779 \u2192 936 040 выше оставлена как история. Отчёт: "
          "`reports/2026-10-18_1000_OCP_Sync_ocp-full-sync.md`")

# (после какой подстроки вставить статус, якорь-строка) ; (подстрока -> замена)
INSERT_AFTER = ("Баланс (17.10.2026, Qoder)**: 936 040 сат", STATUS)

SUBS = [
    ("`3-small-prizes/genesis-block-wallet-puzzle-142ksats`",
     "`3-small-prizes/genesis-block-wallet-puzzle-142ksats` \u2192 в снапшоте OCP 19644e58 "
     "переехал в `4-solved/caesarcoder-genesis-block-wallet-puzzle-947ksats`",
     "переехал в `4-solved"),
    ("genesis-block-wallet-puzzle-142ksats | open | bitcoin | 168779 sats",
     "~~genesis-block-wallet-puzzle-142ksats~~ \u2192 `solved/caesarcoder-genesis-block-wallet-puzzle-947ksats`"
     " | ~~open~~ **solved (свип 2026-10-17 03:40 UTC)** | bitcoin | "
     "~~168779 sats~~ **0 sats (проверено 18.10)**",
     "**solved (свип 2026-10-17 03:40 UTC)**"),
    ("A2 Genesis: 168 779 \u0441\u0430\u0442 \u043d\u0430 12.09.2026 (OCP) \u2014 \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0435\u043c \u044d\u0442\u043e \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u0435.",
     "~~A2 Genesis: 168 779 \u0441\u0430\u0442 \u043d\u0430 12.09.2026 (OCP) \u2014 \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0435\u043c \u044d\u0442\u043e \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u0435~~ "
     "\u2192 **\u0420\u0415\u0428\u0401\u041d 17.10.2026**: \u0441\u0432\u0438\u043f 947 620 \u0441\u0430\u0442, \u0431\u0430\u043b\u0430\u043d\u0441 0 (\u043f\u0440\u043e\u0432\u0435\u0440\u043a\u0430 18.10, OCP Sync); "
     "`solved/caesarcoder-genesis-block-wallet-puzzle-947ksats/`",
     "**\u0420\u0415\u0428\u0401\u041d 17.10.2026**"),
    ("`B41 Genesis Block Brainwallet Puzzle` = `puzzles/genesis-block-wallet-puzzle-142ksats`",
     "`B41 Genesis Block Brainwallet` = `solved/caesarcoder-genesis-block-wallet-puzzle-947ksats` "
     "(\u0437\u0430\u043a\u0440\u044b\u0442 18.10, \u0441\u0432\u0438\u043f 17.10; \u043f\u0440\u0435\u0436\u043d\u0438\u0439 \u043f\u0443\u0442\u044c `puzzles/genesis-block-wallet-puzzle-142ksats` \u043f\u0435\u0440\u0435\u043d\u0435\u0441\u0435\u043d)",
     "= `solved/caesarcoder-genesis"),
    ("|  Genesis Block | 946 040 \u0441\u0430\u0442, 116 tx, \u0442\u0440\u0430\u0442 0 (\u0440\u0430\u0441\u0442\u0451\u0442) | ~2% | 255 \u0444\u043e\u0440\u043c "
     "\u00abSatoshi Nakamoto\u00bb \u00d7 64 009 \u0441\u0440\u0435\u0437\u043e\u0432 = 0; \u043d\u0443\u0436\u043d\u0430 \u0441\u0445\u0435\u043c\u0430 \u043f\u043e \u043d\u043e\u0432\u044b\u043c OP_RETURN-\u043e\u0442\u0432\u0435\u0442\u0430\u043c \u0430\u0432\u0442\u043e\u0440\u0430 | "
     "\u0441\u0442\u0440\u0430\u0442\u0435\u0433 b6983d3d |",
     "|  ~~Genesis Block~~ | ~~946 040 \u0441\u0430\u0442, 116 tx, \u0442\u0440\u0430\u0442 0 (\u0440\u0430\u0441\u0442\u0451\u0442)~~ \u2192 **0 \u0441\u0430\u0442: \u0441\u0432\u0438\u043f "
     "2026-10-17 03:40 UTC, \u0431\u044b\u043b\u0438\u0448\u043d\u0438\u0439 \u043f\u0440\u0438\u0437 947 620 \u0441\u0430\u0442 \u0443\u0448\u0435\u043b \u0440\u0435\u0448\u0430\u0442\u0435\u043b\u044e** | \u2014 | "
     "**\u0417\u0410\u041a\u0420\u042b\u0422\u041e**: \u0440\u0435\u0448\u0451\u043d CaesarCoder (PBKDF2 rounds 181505/200913 \u0432\u043c\u0435\u0441\u0442\u043e 2048); \u043d\u0430\u0448\u0438 "
     "255 \u0444\u043e\u0440\u043c \u00d7 64 009 \u0441\u0440\u0435\u0437\u043e\u0432 \u043f\u0440\u0438 rounds=2048 \u043d\u0435 \u043f\u043e\u043a\u0440\u044b\u0432\u0430\u043b\u0438 \u043f\u0440\u043e\u0441\u0442\u0440\u0430\u043d\u0441\u0442\u0432\u043e | "
     "\u043d\u0435 \u0432\u0435\u0441\u0442\u0438 (\u0431\u044b\u043b \u0441\u0442\u0440\u0430\u0442\u0435\u0433 b6983d3d) |",
     "\u043d\u0435 \u0432\u0435\u0441\u0442\u0438 (\u0431\u044b\u043b \u0441\u0442\u0440\u0430\u0442\u0435\u0433 b6983d3d)"),
]


def main():
    data = open(P, "rb").read()
    lines = data.splitlines(keepends=True)
    orig = [l.rstrip(b"\r\n").decode("utf-8", "replace") for l in lines]
    inserted = "Статус 2026-10-18 (OCP Sync)" in "\n".join(orig)
    if inserted:
        print("статусная строка уже есть в файле — не дублируем")
    out = []
    applied = set()
    n_ins = 0
    for s0, eol in [(l.rstrip(b"\r\n").decode("utf-8", "replace"),
                     l[len(l.rstrip(b"\r\n")):]) for l in lines]:
        s = s0
        for num, (find, repl, marker) in enumerate(SUBS):
            if find in s and marker not in s:
                s = s.replace(find, repl, 1)
                applied.add(num)
        out.append(s.encode("utf-8") + eol)
        if INSERT_AFTER[0] in s and not inserted:
            out.append(INSERT_AFTER[1].encode("utf-8") + eol)
            inserted = True
            n_ins += 1
    print("вставок статусной строки: %d | замен: %d из %d" % (n_ins, len(applied), len(SUBS)))
    for num, (find, _r, marker) in enumerate(SUBS):
        if num in applied:
            print("  OK      :", find[:70])
        elif any(marker in o for o in orig):
            print("  УЖЕ ЕСТЬ:", find[:70])
        else:
            print("  НЕ НАЙДЕН:", find[:70])
    if n_ins == 0 and not applied:
        print("ничего не changed — запись не нужна")
        return
    tmp = P + ".tmp"
    open(tmp, "wb").write(b"".join(out))
    os.replace(tmp, P)
    print("записано:", P)


main()
