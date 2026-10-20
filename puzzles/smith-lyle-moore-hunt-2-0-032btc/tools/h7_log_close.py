# -*- coding: utf-8 -*-
"""Атомарная дозапись в LOG.md SLM Hunt #2: ось H7 (разведка сообщества) закрыта отрицательно."""
import os
import tempfile
from pathlib import Path

D = Path(__file__).resolve().parents[1]
LOG = D / "LOG.md"
MARKER = "ось H7 (сообщество) закрыта"

BLOCK = """
## 2026-10-19, 13:46 UTC — Qoder — ось H7 (сообщество) закрыта: публичного критерия бита не существует
- Досье разведки: `data/h7_community/FINDINGS.md` (+ дампы `thread_wojppy.*`,
  `feed_rational-Gain5010.*`, `thread_megathread_ojmwfr.*`, `site/*.html`, `site/site_texts.json`,
  инструменты `dump_feeds.py`, `extract_site_texts.py`). Только чтение: ничего не публиковалось,
  комментарии/ЛС не писались, трат нет.
- **Главный вывод (почему ось закрыта, а не «не доделана»):** метода «как читать бит из монтажа»
  в публичном поле **нет**. Единственный первоисточник — трёхстрочник (стабильный слот каждые
  10 кадров → 3 слота в секунду; каждый 9-й слот — разделитель, их 14; после удаления остаются
  120 слотов = 15 групп по 8 бит), и он не содержит признака 1/0. Сам постящий (u/rational-Gain5010)
  пишет «this was not from me», то есть цитирует безымянного солвера; опубликованных постов у него
  ноль (`/user/…/submitted/.rss` пуст) — настоящий автор схемы публично не светился.
  Комментарий `pejgs65` к 19.10 **удалён с Reddit** (страница = «Этот комментарий больше не
  существует», в ветке — `[удалено]`); текст восстановлен только из user-flow RSS и сохранён в дампе.
  Веток с обсуждением деталей нет: под `pejgs65` ровно один ответ.
- Единственная публичная зацепка к носителю бита — `pcj7x4y`: «It is on the video, dm and I explain
  you. Think on the name of the song too» (оставлена в ответ на просьбу по гейту `c2ozw`).
  Дальше — ЛС, куда по правилу каталога мы не идём. Просьба-запрос `pegl0kj` помечена Reddit как
  автоматизированный аккаунт.
- Другие каналы пусты по этой теме: r/puzzles, r/BitcoinPuzzles — ничего; веб-поиск по
  «discoverglimmer» даёт только рекламу (Estée Lauder / Woolworths); X @SmithLyleMoore —
  syndication «Rate limit exceeded», сайт за логином; Bitcointalk — поиск только для
  зарегистрированных, отдельного треда ханта не найдено; Discord/Telegram/блоги — следов нет.
  Live-дамп тредов: 131 запись `wojppy` + 242 записи официального MEGATHREAD — совпадений по
  слову-методу (bit/montage/separator/frames) ноль.
- Полезные побочные находки (зарегистрированы, чтобы не переисследовать):
  1. Публичных решателей Hunt #2 **нет** — всё сообщество сидит на гейтах (East: `pirate-battle`,
     `weallliveinayellowsubmarine`, `narcosis`, `take-a-big-breath`; South: `raft-escape`,
     `smoke-signals`; West: `message` + список имён пиратов; North: «coming soon», пусто).
     Обмен паролями идёт исключительно в ЛС.
  2. `c2ozw` — не внешний токен, а внутренний Wix-id страницы `resurface` (seo-slug
     `/take-a-big-breath`), что совпадает с нашим `data/h2c_pagemap.json`.
  3. Финальный шаг по прецеденту Hunt #1 (комментарий `pdzbkjn`, сохранён): письмо на
     `codebreaker@smithlylemoore.com` с ответом ~через сутки и выдачей нового URL + пароля;
     формат паролей — `tomorrow0010000`, `morse00100001`, `codebreaker11`. В 2026 почта, по
     словам u/Unlikely_Ad3554 (`p8xxwi3`), «still active», но есть контрпримеры (`p60lqs0` — 7 ч
     без ответа, `p60gsxa` — 3 суток, `p69n6uz` — считает письмо риском). То есть оракул
     «правильный ключ → ответ» не подтверждён.
  4. Новые подсказки не появлялись: сумма в `/more-info` по-прежнему «.031777 Bitcoin», тексты
     стартовых страниц не менялись, гейты `glimmer` / `who-is-she` / `take-a-big-breath` отдают
     только оболочку.
- Что это меняет в плане: ветка «дождаться/найти публичный критерий бита» исчерпана.Montage-ось
  теперь требует **собственной** гипотезы (полный перебор признаков уже дал 0 на 120 слотах),
  а финальный email — письменной санкции Ильи. Дешёвых сетевых осей по ханту больше не осталось:
  `h7j3h` и `y6cd1` проверены 2048/2048 словами, `c2ozw` вскрыт, свип по сдвинутому корпусу — 0.
- Он-чейн: `3BAr7ERPmlkCyfg3Du7bm2o2E4E128T19q` — funded 5 081 908 / spent 1 904 208 → приз
  3 177 700 сат, 5 tx (проверено сегодня). Транзакций не отправлялось, ключей не генерировалось.
"""


def main():
    data = LOG.read_bytes()
    if MARKER.encode("utf-8") in data:
        print("уже записано, пропуск")
        return 0
    if not data.endswith(b"\n"):
        data += b"\n"
    data += BLOCK.encode("utf-8")
    fd, tmp = tempfile.mkstemp(dir=str(LOG.parent), prefix=".h7log_", suffix=".md")
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
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
