# -*- coding: utf-8 -*-
"""Атомарное дописывание результата H4 в LOG.md (per-пазл журнал)."""
import io, os, tempfile

PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "LOG.md")

TEXT = """
### H4 — РЕЗУЛЬТАТ: негатив, но с сертифицированным оракулом (важно для всех будущих негативов)
- Инструмент: `tools/h4_xpub_sweep.py` (офлайн, без сети). 120 упорядочиваний позиций 1-4 из
  {when, you, depart, find, mystery} (P(5,4)), 5-8 = `discover music need love`, 9-12 =
  `hunt gather whale blood`; × 32 passphrase-кандидата = **3 720** пар seed+passphrase.
  Из 120 корпусов BIP39-чексумму проходят 7.
- **Сертификация ноги seed->адрес: OK.** Контроль Hunt #1
  (`fortune all man kind one giant step into digital tomorrow virtual moon` + `supernova`)
  воспроизведён этим же кодом: адрес `bc1qgtymp8q7hw2k9tewhdq74vdlpkqhflgju69n95` = путь
  `m/84'/0'/0'/0/0`. Нога xpub->эскроу сертифицирована ранее (`tools/ocp/oracle.py --selftest`).
  То есть негатив H4 — настоящий негатив по проверенному множеству, а не «мусорный» инструмент.
- Итог: **0 совпадений** с опубликованным xpub (9.2 с). Покрыта СДВИНУТАЯ модель корпуса
  (5-8 = discover music need love), которую предыдущие кампании досье (C1..C6, миллиарды
  проверок) НЕ покрывали: там стояло 1-9 = when you depart find mystery hunt gather whale blood,
  11-12 = virtual moon.
- Ограничение негатива (обязательно учитывать): проверены только 4 слова из пула
  {when, you, depart, find, mystery} на позициях 1-4, фиксированный хвост 9-12 и 32 пароля.
  Пул passphrase крошечный против 358 612 слов словаря — при неверном хвосте или неизвестном
  пароле результат ничего не доказывает про фразу в целом.
- Ключей/seed-фраз не найдено, в файлы и логи ничего секретного не записано; транзакций нет.
"""

def main():
    with io.open(PATH, "rb") as f:
        old = f.read()
    if "H4 — РЕЗУЛЬТАТ" in old.decode("utf-8"):
        print("уже записано, пропускаю")
        return
    new = old + TEXT.encode("utf-8")
    fd, tmp = tempfile.mkstemp(dir=os.path.dirname(PATH))
    with os.fdopen(fd, "wb") as g:
        g.write(new)
        g.flush()
        os.fsync(g.fileno())
    os.replace(tmp, PATH)
    print("LOG.md %d -> %d" % (len(old), len(new)))

main()
