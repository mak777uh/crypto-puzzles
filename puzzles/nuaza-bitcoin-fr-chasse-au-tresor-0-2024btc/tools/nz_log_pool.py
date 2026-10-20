# -*- coding: utf-8 -*-
"""Атомарная дозапись в LOG.md Nuaza: тематический пул кандидатов из french.txt (бесплатно, офлайн)."""
import os
import tempfile
from pathlib import Path

D = Path(__file__).resolve().parents[1]
LOG = D / "LOG.md"
MARKER = "тематический пул кандидатов"

BLOCK = """
## 2026-10-19, 13:41 UTC — Qoder — бесплатный офлайн-шаг: тематический пул кандидатов из french.txt
- Проверено ключевое свойство механизма (indice 8): французское слово обязано быть в официальном
  списке BIP39-fr (2048 слов) — значит слова-годы/числа в решении присутствовать НЕ могут: в списке
  нет ни одного числительного (`vingt`, `quatre`, `mille` как отдельного слова нет; `mille` встречается
  только внутри `famille` (789 → `glance`) ). Следовательно indice 2 «Deux années olympiques»
  (слова 15-16) — это **не названия лет**, а предметы/понятия, связанные с этими годами в
  биографии автора и стоящие в списке. Это сужает поиск и снимает ложную ветку «ищем слово-год».
- Построен пул кандидатов по темам подсказок (ранг во `french.txt` → английское слово того же
  ранга — то, что реально попадёт в фразу):
  * Олимпийская тема: `merle` 1234 → **olympic**, `annuel` 113 → **athlete**, `médaille` 1218 → obscure,
    `marathon` 1199 → nominee, `victoire` 2002 → where, `hiver` 981 → kingdom, `neige` 1312 → piano,
    `glace` 916 → income, `vétéran` 1996 → wet, `titre` 1887 → typical.
    Обратите внимание: ровно одно слово списка переводится как `olympic` и ровно одно — как `athlete`,
    оба попадают на позиции 15-16 по смыслу подсказки; пара `hiver`+`neige` естественно описывает
    зимние Игры (Grenoble-1968 — possible год биографии автора), `médaille`+`victoire` — спортивный результат.
  * Энергия/монета (тема книги): `énergie` 669 → father, `central` 357 → coach (фр. «centrale
    nucléaire» — центральная тема книги), `monnaie` 1264 → own, `charbon` 370 → comic,
    `soleil` 1782 → tell, `jeton` 1079 → manage, `banquier` 204 → book, `vague` 1963 → voice,
    `image` 1011 → lazy (indice 1 «une image vaut mille mots»), `pierre` 1481 → rice (indice 11:
    17-е слово связано с именем автора).
- Честная оговорка (почему это ещё НЕ прогресс): чексумма BIP39 — глобальный 8-битный признак над
  всей фразой, поэтому проверить отдельное слово или пару слов **нельзя**: ни `nz_oracle`, ни
  `nz_partial` не дают verdict без остальных 20 слов. Пул — это заготовка, которая ускорит чтение
  книги (проверять надо только эти слова, а не весь список), и будет применена через
  `nz_partial.py --spec` как только книга даст остальные позиции.
- Он-чейн не менялся: цель 20 240 000 сат, 0 потрачено. Переборов не запускалось (эта запись —
  только анализ сохранённого локально списка), трат/писем/публикаций нет.
"""


def main():
    data = LOG.read_bytes()
    if MARKER.encode("utf-8") in data:
        print("уже записано, пропуск")
        return
    if not data.endswith(b"\n"):
        data += b"\n"
    data += BLOCK.encode("utf-8")
    fd, tmp = tempfile.mkstemp(dir=str(LOG.parent), prefix=".nzlog3_", suffix=".md")
    try:
        with os.fdopen(fd, "wb") as fh:
            fh.write(data)
            fh.flush()
            os.fsync(fh.fileno())
        os.replace(tmp, LOG)
    finally:
        if os.path.exists(tmp):
            os.remove(tmp)
    print("LOG.md:", len(data), "байт")


if __name__ == "__main__":
    main()
