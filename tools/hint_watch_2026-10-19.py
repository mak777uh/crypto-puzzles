"""hint_watch — детектор изменений по внешним блокерам каталога master/puzzles.

Смысл: почти все живые BTC-призы в базе упираются не в вычисления, а во внешний факт
(автор опубликовал новую подсказку, домен воскрес, файл вернулся, секрет ожил).
Этот скрипт одним прогоном опрашивает ВСЕ такие точки только GET-запросами и сравнивает
ответ с эталоном. Появилось изменение = есть о чём думать; изменений нет = цикл закрывается
за секунды, и дежурный агент не тратит ход на ручные проверки.

Использование:
    python tools/hint_watch_2026-10-19.py            # сверка с эталоном, отчёт в stdout+лог
    python tools/hint_watch_2026-10-19.py --commit   # записать текущее состояние как эталон

Правил каталога не нарушает: только HTTP GET, ни транзакций, ни писем, ни трат,
ключей никуда не пишет.
"""

import argparse
import hashlib
import io
import json
import os
import re
import ssl
import sys
import tempfile
import time
import urllib.error
import urllib.parse
import urllib.request

MASTER = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE = os.path.join(MASTER, "reports", "data_hint_watch_baseline.json")
LOGF = os.path.join(MASTER, "reports", "hint_watch_last.log")
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) puzzle-watch/1.0 curl/8"

# slug -> [(ключ проверки, url, что считаем «изменением»)]
# expect: "200" / "404" — ожидаемый сегодня статус; change = статус иной ИЛИ хэш тела иной.
WATCH = [
    # --- SLM Hunt #2 (3 177 700 сат): новые ассеты/страницы Wix-сайта ---
    ("slm/home", "https://www.smithlylemoore.com", "body"),
    # открытые замки обязаны отдавать 403; 200 = автор снял гейт (это и есть «новая подсказка»)
    # Уточнение 2026-10-19: Wix отдаёт закрытую страницу кодом 200 (оболочка + клиентский
    # резолвер), поэтому «403 = закрыто» неверно. Режим gate сравнивает признак гейта
    # (protectedPageResolverUrl) и множество хэшей страниц в оболочке: снятие пароля
    # или новый ассет на странице меняют именно их.
    ("slm/lock-raft", "https://www.smithlylemoore.com/raft-escape", "gate"),
    ("slm/lock-fire", "https://www.smithlylemoore.com/smoke-signals", "gate"),
    # --- AH White «Walking Banks» (800 000 сат): домен умер (DNS), ждём возврата.
    # Тело страницы-заглушки хостера меняется на каждом запросе — поэтому только статус.
    ("walkingbanks/home", "https://walkingbanks.com", "status"),
    ("walkingbanks/www", "https://www.walkingbanks.com", "status"),
    # автор публикует подсказки только в Nostr; njump.me отдаёт SSR-страницу с телами
    # заметок — хеш берём по читаемому тексту (цифры вырезаны, чтобы счётчики не шумели).
    ("nostr/ah-white", "https://njump.me/npub1c2rvx6ue9uewl452kczcfxz9w242sfzn64ul8dv2afd3t5dpktzs0kmmvf", "text"),
    # --- School of Bitcoin (1 000 000 сат): нужен whatisthepassphrase.kdbx ---
    ("school/home", "https://schoolofbitcoin.com", "body"),
    ("school/kdbx", "https://schoolofbitcoin.com/whatisthepassphrase.kdbx", "status"),
    # стекер-тред живой (счётчики/лайки меняют тело) — следим только за статусом
    ("stacker/school-908283", "https://stacker.news/items/908283", "status"),
    # --- seed-phrase.com (1 000 000 сат): утраченный onetimesecret + git автора ---
    ("seedphrase/home", "https://seed-phrase.com", "body"),
    ("onetime/secret", "https://onetimesecret.com/secret/9ju7i8r5tx59szmh2xms48y24phaded", "status"),
    ("gh/metaneer-seed-phrase", "https://api.github.com/repos/metaneer/seed-phrase/commits?per_page=1", "body"),
    # --- bitaddress BIP38 giveaway (529 700 сат): новые посты владельца.
    # Страница stacker.news отдаёт разное тело (счётчик голосов/лайков) — следим за статусом и длиной.
    ("stacker/bip38-275973", "https://stacker.news/items/275973", "status"),
    # --- Oobit #139 (1 545 000 сат): вкладки подсказок/комментариев/альянсов ---
    # страница-вкладка биткоинпазлс.io пересобирается на каждый запрос — только статус
    ("oobit/puzzle-139", "https://bitcoinpuzzles.io/en/puzzles/139", "status"),
    ("oobit/dicas", "https://bitcoinpuzzles.io/pt/puzzles/139/tab/dicas", "body"),
    ("oobit/comentarios", "https://bitcoinpuzzles.io/pt/puzzles/139/tab/comentarios", "body"),
    # вкладки динамические (комментарии пересобираются на каждый запрос) — только статус
    ("oobit/aliancas-3", "https://bitcoinpuzzles.io/pt/puzzles/aliancas/3", "status"),
    # --- Wealth in Poetry (3 124 630 сат): тред и репо HomelessPhD ---
    ("gh/wealth-in-poetry", "https://api.github.com/repos/HomelessPhD/Wealth_in_Poetry/commits?per_page=1", "body"),
    # --- Zden HALV (312 500 сат): единственный реальный лид по вердикту OCP — подсказка автора.
    # 2026-10-19 18:52 UTC: сам сайт недоступен с этого хоста (DNS отдаёт 95.217.50.62, но TCP
    # на 80/443 таймаут => http и https пробы = СЕТЬ-шум, а не «изменение»). Поэтому следим
    # через CDX Wayback по всему домену: новый захват (или новый <имя>_hint.* файл в архиве)
    # меняет тело ответа = сигнал «автор что-то опубликовал».
    ("zden/halv-wayback-cdx",
     "https://web.archive.org/cdx/search/cdx?url=crypto.haluska.sk*&output=json"
     "&limit=-25&fl=timestamp,original,statuscode,digest", "body"),
    # --- реестр open-crypto-puzzles: новые записи/ответы (главный входящий по всем целям) ---
    ("gh/open-crypto-puzzles", "https://api.github.com/repos/floflo777/open-crypto-puzzles/commits?per_page=1", "body"),
    # --- 2026-10-19 19:46 UTC: Илья дал VPN-подписку (lk-server/vpntype). Поднятый локальный
    # прокси = HTTP 127.0.0.1:10809 (клиент xray.exe в %LOCALAPPDATA%\Temp\xray, конфиги вне
    # каталога). urllib сам подхватывает HTTPS_PROXY из окружения, поэтому эти точки работают
    # ТОЛЬКО при запущенном прокси; без него = СЕТЬ-шум, предыдущие 20 точек от прокси не зависят:
    #   set HTTPS_PROXY=http://127.0.0.1:10809 && python tools/hint_watch_2026-10-19.py
    # Живой первоисточник серии Здена: правка index.html = новая строка автора (2026-10-10 так
    # и случилось — страница изменилась, но дельта оказалась про решённый LVL5).
    ("zden/haluska-live-index", "https://crypto.haluska.sk/", "body"),
    # RSS загрузок канала Guntis: новый ролик = потенциальный новый «written words»-носитель
    # (самый крупный живой приз базы, 8,612542 ETH; последних загрузок не было ~1 год).
    ("guntis/rss-uploads", "https://www.youtube.com/feeds/videos.xml?channel_id=UCkYCnjVcFJDN6Cp_uP0pv_A", "body"),
    # Общественное зеркало Ballet (oritwoen/boha) — единственное место, где лежат фото карты
    # AA009926/AA012381; новый коммит может принести недостающую половину (2 BTC).
    ("gh/boha", "https://api.github.com/repos/oritwoen/boha/commits?per_page=1", "body"),
    # --- 2026-10-19 20:14 UTC: solvers-сайт echo.ls (тот же автор решил Zden Level 5 и
    #   «Cipher in Circles» через GPT-6 Astra). Его НОВЫЕ посты = готовые разборы методов,
    #   которые можно перенести на наши визуальные цели (Zden/HALV, Ballet, Bitimage).
    #   RSS Hugo: новый пост меняет тело фида.
    ("echo-ls/rss", "https://echo.ls/index.xml", "body"),
    # --- 2026-10-19 20:58 UTC: Ballet. Официальный ANN-тред (bitcointalk topic=5265748) читается
    #   гостем ЧЕРЕЗ VPN; новый пост автора = потенциально фото карты AA009926 или подсказка.
    #   Тело страницы содержит счётчики/даты → следим за признаком «появился новый msg id».
    ("ballet/bt-5265748", "https://bitcointalk.org/index.php?topic=5265748.0", "btlast"),
]

REFS_RE = re.compile(rb"144728_([0-9a-f]{32})")


def ref_list(data):
    """Хэши страниц/ассетов сайта 144728 в оболочке — обязательно в виде str (bytes в join дают TypeError)."""
    return sorted(set(m.decode("ascii") for m in REFS_RE.findall(data)))


RATELIMIT = "RATE-LIMIT"  # служебная метка: канал не дал посмотреть объект


def open_url(target, timeout=25):
    """urlopen с учётом HTTPS_PROXY, КРОМЕ хостов, которым прокси вредит.

    web.archive.org через наш VPN-выход (147.45.221.58) стабильно отвечает 503,
    напрямую — 200. Поэтому для этих хостов собираем opener без прокси.
    Принимает и url, и готовый Request (заголовки сохраняются в обоих случаях).
    """
    url = target.full_url if isinstance(target, urllib.request.Request) else target
    host = urllib.parse.urlsplit(url).netloc.split(":")[0]
    if host == "web.archive.org" or host.endswith(".web.archive.org"):
        op = urllib.request.build_opener(
            urllib.request.ProxyHandler({}),
            urllib.request.HTTPSHandler(context=ssl.create_default_context()))
        return op.open(target, timeout=timeout)
    return urllib.request.urlopen(target, timeout=timeout,
                                  context=ssl.create_default_context())


def fetch(url, tries=2, timeout=25):
    """Возвращает (status, nbytes, digest, extra). Ошибку не бросает."""
    last = (0, 0, "", "")
    for i in range(tries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "*/*"})
            with open_url(req, timeout=timeout) as r:
                body = r.read()
                return (r.status, len(body), hashlib.sha256(body).hexdigest()[:16], "")
        except urllib.error.HTTPError as e:
            body = b""
            try:
                body = e.read() or b""
            except Exception:  # noqa: BLE001
                pass
            return (e.code, len(body), hashlib.sha256(body).hexdigest()[:16], "")
        except Exception as e:  # noqa: BLE001
            last = (0, 0, "", type(e).__name__ + ":" + str(e)[:80])
            time.sleep(1.0 + i)
    return last


def visible_text(html):
    """Видимый текст страницы: без <script>/<style>/<head>, теги → пробелы."""
    b = re.sub(r"(?is)<head.*?</head>", " ", html)
    b = re.sub(r"(?is)<(script|style|noscript|svg)[^>]*>.*?</\1>", " ", b)
    b = re.sub(r"(?is)<[^>]+>", " ", b)
    for e, ch in (("&nbsp;", " "), ("&amp;", "&"), ("&quot;", '"'), ("&#39;", "'"),
                  ("&#160;", " "), ("&ldquo;", '"'), ("&rdquo;", '"')):
        b = b.replace(e, ch)
    return re.sub(r"\s+", " ", b)


def probe(url, mode="body"):
    st, n, h, err = fetch(url)
    if st == 200 and mode == "text":
        # режим «текст»: хеш не оболочки, а читаемого содержимого + число заметок
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with open_url(req, timeout=25) as r:
                raw = r.read()
            vis = visible_text(raw.decode("utf-8", "replace"))
            notes = vis.count("itemprop=\"articleBody\"")
            dates = sorted(set(re.findall(r"\b20\d\d-\d\d-\d\d \d\d:\d\d:\d\d\b", vis)))
            dig = "text" + hashlib.sha256(re.sub(r"\d", "", vis).encode()).hexdigest()[:16]
            return (st, n, dig, "слов=%d, блоков=%d, последняя дата=%s" % (
                len(vis.split()), notes, dates[-1] if dates else "—"))
        except Exception as e:  # noqa: BLE001
            return (st, n, h, err or type(e).__name__)
    if st == 200 and mode == "btlast":
        # форумная страница: тело меняется от счётчиков/просмотров. Значимы только
        # количество постов на странице и максимальный msg id (= появился новый ответ автора).
        # Второй запрос нужен потому, что fetch() возвращает только хэш; форум иногда
        # обрывает соединение — поэтому 2 попытки с паузой.
        for attempt in range(2):
            try:
                req = urllib.request.Request(url, headers={"User-Agent": UA})
                with open_url(req, timeout=25) as r:
                    data = r.read().decode("utf-8", "replace")
                ids = [int(x) for x in re.findall(r'<a name="msg(\d+)"></a>', data)]
                npg = [int(m.group(1)) for m in re.finditer(r'topic=\d+\.(\d+)"', data)
                       if int(m.group(1)) % 20 == 0]
                dig = "bt%d-%s" % (len(ids), ids[-1] if ids else "x")
                return (st, len(data), dig, "постов=%d, макс.msg=%s, стр=%d" % (
                    len(ids), ids[-1] if ids else "—", (max(npg) // 20 + 1) if npg else 1))
            except Exception as e:  # noqa: BLE001
                time.sleep(4.0)
                if attempt == 1:
                    return (st, n, h, err or type(e).__name__)
    if mode == "gate":
        # гейт Wix отдаёт 200 всегда: признак — наличие protectedPageResolverUrl и
        # множество хэшей страниц/ассетов в оболочке. Снятие пароля или новый ассет = смена.
        st2, n2, h2, e2 = fetch(url)
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with open_url(req, timeout=25) as r:
                data = r.read()
            gated = 1 if b"protectedPageResolverUrl" in data else 0
            refs = ref_list(data)
            dig = "gate%d-" % gated + hashlib.sha256(",".join(refs).encode()).hexdigest()[:12]
            return (st2, n2, dig, "гейт=%d, ссылок на страницы=%d" % (gated, len(refs)))
        except Exception as e:  # noqa: BLE001
            return (st2, n2, h2, e2 or type(e).__name__)
    if st == 403 and "api.github.com" in url:
        # 403 от api.github.com = общий лимит на IP, а не изменение репозитория
        return (st, n, RATELIMIT, "лимит API, сброс см. /rate_limit")
    if st == 200 and "assets-manifest" in url:
        # для манифеста важнее не хэш оболочки, а множество хэшей ассетов сайта
        _, _, _, _ = st, n, h, err
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with open_url(req, timeout=25) as r:
                data = r.read()
            refs = ref_list(data)
            return (st, n, "refs" + hashlib.sha256(",".join(refs).encode()).hexdigest()[:16],
                    "ассетов: %d" % len(refs))
        except Exception as e:  # noqa: BLE001
            return (st, n, h, err or type(e).__name__)
    return (st, n, h, err)


def atomic_write(path, text):
    fd, tmp = tempfile.mkstemp(dir=os.path.dirname(path), suffix=".tmp")
    with os.fdopen(fd, "w", encoding="utf-8", newline="\n") as fh:
        fh.write(text)
        fh.flush()
        os.fsync(fh.fileno())
    os.replace(tmp, path)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--commit", action="store_true", help="записать текущее состояние как эталон")
    ap.add_argument("only", nargs="?", help="подстрока ключа — проверить только эти точки")
    args = ap.parse_args()

    base = {}
    if os.path.exists(BASE):
        raw = json.load(io.open(BASE, encoding="utf-8"))
        # эталон лежит под "checks"; старый плоский формат тоже поддерживаем
        base = raw.get("checks", raw) if isinstance(raw, dict) else {}

    lines, changed, cur = [], [], {}
    t0 = time.time()
    for key, url, mode in WATCH:
        if args.only and args.only not in key:
            if key in base:
                cur[key] = base[key]
            continue
        prev0 = base.get(key)
        st, n, h, err = probe(url, mode)
        # 5xx — это отказ канала (напр. web.archive.org 503), а не изменение объекта:
        # иначе эталон запоминает страницу-ошибку и следующий удачный прогон ложно кричит «ИЗМЕНЕНИЕ».
        noise = h == RATELIMIT or st == 0 or 500 <= st < 600
        cur[key] = {"url": url, "status": st, "bytes": n, "digest": h, "err": err, "mode": mode}
        if noise and prev0 is not None:
            # шум канала не должен перезаписывать эталон
            cur[key] = prev0
        prev = base.get(key)
        if prev is None:
            flag = "НОВЫЙ"
        elif noise:
            # сеть/лимит API — это не изменение объекта, а шум канала
            flag = "СЕТЬ" if st == 0 else "ЛИМИТ-API"
        elif mode == "status":
            ALIVE = (200, 202)  # stacker.news чередует 200/202 — это один и тот же «живой» ответ
            same = (prev["status"] == st) or (st in ALIVE and prev.get("status") in ALIVE)
            flag = "ok" if same else "ИЗМЕНЕНИЕ СТАТУСА"
        else:
            flag = "ИЗМЕНЕНИЕ" if (prev["status"] != st or prev["digest"] != h) else "ok"
        if flag not in ("ok", "СЕТЬ", "ЛИМИТ-API"):
            changed.append(key)
        lines.append("%-26s %-16s http=%-4s bytes=%-9s %s %s"
                     % (key, flag, st, n, h, (err or "")[:60]))

    head = "hint_watch %s UTC — проверено %d точек, изменений %d, %.0f с, эталон %s" % (
        time.strftime("%Y-%m-%d %H:%M"), len(WATCH), len(changed), time.time() - t0,
        "есть" if base else "НЕ ЗАПИСАН (первый прогон)")
    text = head + "\n" + "\n".join(lines) + "\n"
    if changed:
        text += "\n--- ТРЕБУЕТ ВНИМАНИЯ ---\n" + "\n".join("    " + c for c in changed) + "\n"
    sys.stdout.write(text)
    atomic_write(LOGF, text)

    if args.commit:
        payload = {"committed_utc": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
                   "checks": cur}
        atomic_write(BASE, json.dumps(payload, ensure_ascii=False, indent=1, sort_keys=True))
        sys.stdout.write("эталон записан: %s\n" % os.path.relpath(BASE, MASTER))
    elif not base:
        sys.stdout.write("\nВНИМАНИЕ: эталона нет — прогон был ознакомительным. "
                         "Запиши его: python tools/hint_watch_2026-10-19.py --commit\n")
    return 1 if changed else 0


if __name__ == "__main__":
    sys.exit(main())
