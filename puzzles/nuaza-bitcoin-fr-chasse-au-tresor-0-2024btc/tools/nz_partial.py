# -*- coding: utf-8 -*-
"""Чексуммный фильтр Nuaza: часть слов известна, часть — список кандидатов.

Даёт бесплатный отсев ДО вывода адреса: из 2^22 комбинаций двух неизвестных слотов
валидную чексумму BIP39 имеют только ~2^14. Когда книга даёт слова с неоднозначным
чтением (объект на иллюстрации может читаться двумя способами), это превращает
«перебрать всё» в «получить короткий список и проверить адрес».

Спецификация слотов (позиции 1-й = слово №1):
    1=corde;2=mer|bateau;17=pierre;22=en:open;23=en:always;24=en:win
  «en:» — брать английское слово как есть (хвост open always win уже английский);
  без префикса — французское слово BIP39, переводится по рангу в english.txt;
  «any» — полный список из 2048 слов (осторожно: 2 слота any = 4,2 млн комбинаций).

Использование:
    python tools/nz_partial.py --spec "..." [--limit 5000000] [--derive]
    python tools/nz_partial.py --selftest
"""
from __future__ import annotations

import argparse
import hashlib
import itertools
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from nz_oracle import TARGET, addr_bip84, seed_of, wordlist  # noqa: E402

FR, EN = wordlist("french"), wordlist("english")
FR_IDX = {w: i for i, w in enumerate(FR)}
ALL = list(range(2048))


def parse_spec(spec: str):
    """-> [(slot, [индексы BIP39])], позиции 1..24; неизвестные слоты = все 2048."""
    slots = {}
    for part in [p for p in spec.split(";") if p.strip()]:
        pos, _, val = part.partition("=")
        p = int(pos)
        if not 1 <= p <= 24:
            raise SystemExit("позиция %d вне 1..24" % p)
        idxs = []
        for w in val.split("|"):
            w = w.strip()
            if not w:
                continue
            if w == "any":
                idxs = ALL
                break
            if w.startswith("en:"):
                e = w[3:].strip().lower()
                if e not in EN:
                    raise SystemExit("английского слова %r нет в BIP39" % e)
                idxs.append(EN.index(e))
            else:
                f = w.lower()
                if f not in FR_IDX:
                    raise SystemExit("французского слова %r нет в bip39_french.txt" % w)
                idxs.append(FR_IDX[f])
        if not idxs:
            raise SystemExit("слот %d пуст" % p)
        slots[p] = sorted(set(idxs))
    for p in range(1, 25):
        slots.setdefault(p, ALL)
    return [(p, slots[p]) for p in range(1, 25)]


def checksum_ok(bits264: int) -> bool:
    ent = bits264 >> 8
    cs = bits264 & 0xFF
    h = hashlib.sha256(ent.to_bytes(32, "big")).digest()
    return (h[0] & 0xFF) == cs


def words_from_bits(bits264: int) -> list[str]:
    return [EN[(bits264 >> (253 - 11 * i)) & 0x7FF] for i in range(24)]


def run_spec(slots, limit: int, derive: bool):
    unknown = [(p, v) for p, v in slots if len(v) > 1]
    total = 1
    for _, v in unknown:
        total *= len(v)
    print("фиксировано слотов: %d, варьируется: %s, комбинаций: %d"
          % (24 - len(unknown), [p for p, _ in unknown], total))
    if total > limit:
        print("СТОП: %d > --limit %d. Сузьте кандидатов или поднимите limit осознанно." % (total, limit))
        return 1
    # маска/сдвиг для каждого варьируемого слота
    shifts = [(253 - 11 * (p - 1)) for p, _ in unknown]
    base = 0
    for p, v in slots:
        if len(v) == 1:
            base |= v[0] << (253 - 11 * (p - 1))
    mask = 0
    for p, _ in unknown:
        mask |= 0x7FF << (253 - 11 * (p - 1))
    clear = (~mask) & ((1 << 264) - 1)
    fixed = base & clear
    surv = []
    for combo in itertools.product(*[v for _, v in unknown]):
        b = fixed
        for (p, _), val in zip(unknown, combo):
            b |= val << (253 - 11 * (p - 1))
        if checksum_ok(b):
            surv.append((combo, b))
    print("валидных чексуммой комбинаций: %d (ожидаемо ~%d)" % (len(surv), max(1, total // 256)))
    if derive:
        hits = []
        for combo, b in surv:
            w = words_from_bits(b)
            a = addr_bip84(seed_of(w, ""))
            if a == TARGET:
                hits.append(w)
        print("проверено адресов: %d, совпадений с целью: %d" % (len(surv), len(hits)))
        for w in hits:
            print("РЕШЕНИЕ:", " ".join(w))
            (Path(__file__).resolve().parents[1] / "data" / "nz_partial_HIT.json").write_text(
                str({"words_en": w}), "utf-8")
        return 0 if hits else 1
    for combo, b in surv[:60]:
        print("  FR:", " ".join(FR[i] for i in combo), "| EN:", " ".join(words_from_bits(b)))
    if len(surv) > 60:
        print("  ... ещё %d (показать все: --show all)" % (len(surv) - 60))
    return 0


def selftest() -> int:
    import secrets
    ok = {}
    def trial(hidden_positions):
        # честная валидная 24-словная фраза
        ent = secrets.token_bytes(32)
        bits = int.from_bytes(ent, "big") << 8 | (hashlib.sha256(ent).digest()[0] & 0xFF)
        true_words = [EN[(bits >> (253 - 11 * i)) & 0x7FF] for i in range(24)]
        slots = []
        for p in range(1, 25):
            i = (bits >> (253 - 11 * (p - 1))) & 0x7FF
            slots.append((p, ALL if p in hidden_positions else [i]))
        unknown = [(p, v) for p, v in slots if len(v) > 1]
        fixed_base = 0
        for p, v in slots:
            if len(v) == 1:
                fixed_base |= v[0] << (253 - 11 * (p - 1))
        mask = 0
        for p, _ in unknown:
            mask |= 0x7FF << (253 - 11 * (p - 1))
        clear = (~mask) & ((1 << 264) - 1)
        fixed = fixed_base & clear
        n = 0
        found = 0
        for combo in itertools.product(*[v for _, v in unknown]):
            b = fixed
            for (p, _), val in zip(unknown, combo):
                b |= val << (253 - 11 * (p - 1))
            if checksum_ok(b):
                n += 1
                if b == bits:
                    found += 1
        return n, found, true_words
    # [A] два неизвестных слота: истинная фраза обязана попасть в survivors
    n, f, tw = trial([7, 19])
    ok["A истинная фраза в списке (2 скрытых)"] = f == 1 and n > 0
    print("[A] survivors=%d, найдено истинной=%d" % (n, f))
    # [B] один слот с 2 кандидатами (истинный + подставной): чексумму проходит ровно
    # один, и это истинный
    ent = secrets.token_bytes(32)
    bits = int.from_bytes(ent, "big") << 8 | (hashlib.sha256(ent).digest()[0] & 0xFF)
    idx = {p: (bits >> (253 - 11 * (p - 1))) & 0x7FF for p in range(1, 25)}
    true_i = idx[5]
    decoy = (true_i + 7) % 2048
    surv = 0
    hit_true = 0
    for cand in sorted({true_i, decoy}):
        b = 0
        for p in range(1, 25):
            b |= (cand if p == 5 else idx[p]) << (253 - 11 * (p - 1))
        if checksum_ok(b):
            surv += 1
            if b == bits:
                hit_true += 1
    ok["B из 2 кандидатов истинный проходит, ложный (обычно) нет"] = hit_true == 1 and surv <= 2
    print("[B] кандидатов=2, прошло чексумму=%d, среди них истинный=%d" % (surv, hit_true))
    # [B2] количественная мера силы фильтра: доля ложных кандидатов, проходящих чексумму,
    # должна быть ~1/256 (8 бит чексуммы при 11 битах слова)
    passes = 0
    for _ in range(1000):
        d = secrets.randbelow(2048)
        if d == true_i:
            continue
        b = 0
        for p in range(1, 25):
            b |= (d if p == 5 else idx[p]) << (253 - 11 * (p - 1))
        if checksum_ok(b):
            passes += 1
    ok["B2 доля ложных прохождений ~1/256"] = 1 <= passes <= 20
    print("[B2] из ~1000 ложных кандидатов прошли чексумму: %d (ожидание ~4)" % passes)
    # [C] если одно ФИКСИРОВАННОЕ слово неверно, истинная фраза не появится в списке —
    # но список останется «правдоподобным» (~16k строк). Это честное предупреждение:
    # фильтр снимает неоднозначность чтения, а не ошибку в другом слове.
    idx2 = dict(idx)
    hidden = (7, 19)
    wrong_pos = 4
    idx2[wrong_pos] = 1 if idx[wrong_pos] != 1 else 2  # порча фиксированного слова
    fixed = 0
    for p, v in idx2.items():
        if p not in hidden:
            fixed |= v << (253 - 11 * (p - 1))
    mask = (0x7FF << (253 - 11 * (hidden[0] - 1))) | (0x7FF << (253 - 11 * (hidden[1] - 1)))
    fixed &= (~mask) & ((1 << 264) - 1)
    s7 = 253 - 11 * (hidden[0] - 1)
    s19 = 253 - 11 * (hidden[1] - 1)
    bad_found = 0
    surv_c = 0
    for c7, c19 in itertools.product(ALL, ALL):
        b = fixed | (c7 << s7) | (c19 << s19)
        if checksum_ok(b):
            surv_c += 1
            if b == bits:
                bad_found += 1
    ok["C при неверном фикс. слове истинная фраза не восстанавливается"] = bad_found == 0 and surv_c > 100
    print("[C] список с испорченным словом: строк=%d, истинной фразы среди них=%d" % (surv_c, bad_found))
    for k, v in ok.items():
        print("[%s]" % ("OK  " if v else "FAIL"), k)
    allok = all(ok.values())
    print("SELFTEST", "OK" if allok else "FAILED")
    return 0 if allok else 1


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--spec")
    ap.add_argument("--limit", type=int, default=5_000_000)
    ap.add_argument("--derive", action="store_true", help="вывести BIP84-адрес для каждого кандидата")
    ap.add_argument("--selftest", action="store_true")
    a = ap.parse_args()
    if a.selftest:
        return selftest()
    if not a.spec:
        print(__doc__)
        return 2
    return run_spec(parse_spec(a.spec), a.limit, a.derive)


if __name__ == "__main__":
    raise SystemExit(main())
