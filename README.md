# Crypto Puzzles — рабочая база охоты за криптозагадками

> **EN (short).** A living knowledge base of cryptocurrency treasure hunts and puzzles with
> unclaimed public bounties: 80 puzzle dossiers + 55 closed/dead-end ones, agent runbooks,
> reusable checkers and oracles, and a full log of every negative result. Everything here is
> **read-only research**: no spending, no transaction broadcasting, no paid hints.
> Start with `AGENT_INSTRUCTIONS.md`, then `puzzles/README.md` (index) and `OPTIMAL_TARGETS_2026-10-17.md`.
> If a puzzle is solvable, the prize is swept by the owner first and only then published.

**Русский — основной текст ниже.**

---

## Что это

Каталог-«живая база» по криптозагадкам с призовыми фондами (BTC/ETH/LTC/AR/ADA/ALGO/SOL и др.)
и по интернет-мистериям. Задача — не «собрать список», а довести каждую цель до ответа
«решаемо / не решаемо / нужны внешние данные», сохранив доказательства и **отрицательные
результаты**, чтобы следующий агент не повторял уже закрытые оси перебора.

Состояние на **2026-10-18** (проверено по факту обхода дерева и API, а не по памяти из отчётов):

| Что | Сколько |
|---|---|
| Активных папок-досье | 80 (+ реестр отбракованных `puzzles/dead-ends-registry/`); 3 новые нерешённые охоты добавлены 18.10.2026 (gold-crystal, krypto-chase, lunarcrush), 2 из 5 после верификации перенесены в solved/ — см. `MASTER_CATALOG.md` Часть 14 |
| Закрытых/решённых/тупиковых | 52 (`solved/INDEX.md`) |
| Адресов с балансом > 0 | 52 (карта: `LIVE_MAP_2026-10-17.md`) |
| Отчётов проходов | `reports/` (один проход = один файл) |
| Объём базы | ≈ 430 МБ (398 МБ — `puzzles/`, в основном медиа и дампы) |
| Агентов в реестре | `agents/REGISTRY.md` |

> **20.10.2026:** локальная рабочая копия в OneDrive (папка `master`) удалена — каноническая база теперь **этот репозиторий**; как восстановить окружение и что не входит в репо — раздел «Где теперь живёт база» внизу.

Каждая папка пазла самодостаточна: `README.md` (статус и ключевые выводы) + `LOG.md`
(полная хроника по датам, включая негативы) + `tools/` (код, оракулы) + `data/` (дампы,
картинки, логи прогонов).

## Карта базы

| Путь | Назначение |
|---|---|
| `MASTER_CATALOG.md` | главный справочник: части 1–7, категории A/B/C/D, escrow-таблицы |
| `puzzles/<slug>/` | **активные** пазлы: README + LOG + tools + data |
| `puzzles/dead-ends-registry/` | проверенно мёртвые цели — сначала сверяться сюда, не тратить время |
| `solved/<slug>/` | решённые/закрытые/тупиковые; активная работа только при новых данных |
| `OPTIMAL_TARGETS_2026-10-17.md` | tier-список целей «что делать сейчас» |
| `QUICK_WINS_2026-10-17.md`, `QUICK_SOLVE_RERANK_2026-10-17.md` | ранжирование быстрых целей (шанс/время/EV) |
| `LIVE_MAP_2026-10-17.md` | все адреса с ненулевым балансом |
| `WAKE_QUEUE.md` | очередь самобудильника: «Текущая задача» + хвост автоциклов |
| `PROPOSALS.md` | предложения агентов пользователю (статус-строка = решение пользователя) |
| `AGENT_INSTRUCTIONS.md` | **обязательный протокол**: журнал, брони, лимиты, запреты |
| `claims/`, `agents/` | файловые брони пазлов (lease + TTL) и реестр агентов |
| `tools/` | общие скрипты: `claims.py`, `github_intake.py` (GitHub-шлюз), `balance_check_fast.py`, триаж OCP |
| `puzzles/<slug>/data/github/` | дампы репозиториев по цели + дайдест `GITHUB_INTAKE.md` (сырьё в `.gitignore`) |
| `_sources/github/` | общий кэш GitHub-интейков: бюджет API, ETag-кэш, очередь `INTAKE_BACKLOG.md` |
| `reports/` | детальные отчёты проходов |
| `_sources/`, `_archive/` | внешние дампы (OCP-issues, реестры) и старые журналы |

## Быстрый старт для агента

```bash
# 0) прочитать протокол
less AGENT_INSTRUCTIONS.md

# 1) выбрать цель: индекс + приоритеты + реестр мёртвых
#    puzzles/README.md, OPTIMAL_TARGETS_2026-10-17.md, puzzles/dead-ends-registry/README.md

# 2) забронировать пазл (TTL в минутах; heartbeat каждые ~30 мин)
python tools/claims.py acquire <slug> --agent <Имя> --ttl 120 --note "скоуп"
python tools/claims.py heartbeat <slug> --agent <Имя>
python tools/claims.py release <slug> --agent <Имя>

# 2b) GitHub-интейк — обязательный первый шлюз (правило от 18.10.2026): собрать по цели всё из репозиториев
python tools/github_intake.py plan <slug> --no-net          # кандидаты и оценка затрат, 0 сети
python tools/github_intake.py run <slug> --agent <Имя>      # сбор + дайдест + запись в LOG/README/реестр
python tools/github_intake.py status <slug>                 # DONE|PARTIAL|NONE|STALE|LEGACY|PENDING
python tools/github_intake.py backlog --n 20                # режим «вся база»: одна цель за проход
# без пройденного шлюза (или оформленного негатива) — не выставляем строку в PROPOSALS.md и не запускаем прогон

# 3) поработать: всё значимое (и негатив!) — в puzzles/<slug>/LOG.md, прорыв — в README.md
#    код — в puzzles/<slug>/tools/, данные — в puzzles/<slug>/data/, отчёт — в reports/

# 4) проверить, что приз всё ещё на месте (read-only, бесплатные API)
python tools/balance_check_fast.py

# 5) перед стартом — чей пазл занят; просроченные чистит gc (свои брони, не чужие записи)
python tools/claims.py list
python tools/claims.py status <slug>
python tools/claims.py gc
```

## Жёсткие правила (установлены владельцем базы, 17.10.2026)

1. **Перебор — не дольше 15 минут на прогон** (CPU или GPU), длиннее — только с явного письменного OK.
2. **Перебор только по оси, суженной инсайтом.** Гипотеза и ось фиксируются в `LOG.md` **до** запуска.
   Слепой перебор «на авось» запрещён.
3. **Никаких трат и трансляций без OK:** платные подсказки, депозиты, комиссии, письма авторам,
   публикации. Черновик и запрос — да; отправка — нет.
4. **Приватных ключей и сидов в репозитории быть не должно** — они живут вне синхронизируемой папки.
   Публикация ключа до снятия приза недопустима.
5. **Ничья работа не затирается**: только дополнять; общие файлы править атомарно (перечитать →
   temp → `os.replace`), чужие строки не переставлять.
6. **GitHub-интейк — первый шлюз (18.10.2026):** прежде чем предлагать цель или запускать прогон, агент
   собирает по ней всё из репозиториев (`tools/github_intake.py run <slug>`) и фиксирует результат в
   `LOG.md`; оформленный негатив («репо не найдено, проверено по N запросам») тоже закрывает шлюз.

## Приоритеты (сводка на 2026-10-18; подробности — в OPTIMAL_TARGETS/QUICK_SOLVE_RERANK)

- **Tier S, без затрат и без OK:** `9vw04-gem-finder` (0.0202 BTC, pubkey → мгновенный оракул,
  нужен цикл-порядок букв в сетке 21×50), `cardano-13373665-challenge` Ch5 (steghide без пароля,
  несколько копий картинки с разных IPFS-шлюзов), мониторинг канала автора `guntis-vitolins`
  на новые хинты.
- **Tier A, нужен OK/минимальный бюджет:** Keir «Move Over Brokers» (3 живых лота, 600k сат),
  Trithemius «Wealth in Poetry» ярус 2 (≈9.9e6 checksum по GPS-правилу), Tumblecaesar, Coders #07.
- **Tier B, инсайт-цели с большим EV:** GSMG 1.256 BTC (остался выход chain4 / инструмент автора),
  Quizchain RBB 0.777 BTC, guntis 8.61 ETH, Arweave #11 1 ETH, BLM 0.2 BTC, SLM 0.0318 BTC, Teikhos 2 ETH.
- **Красный флаг (не трогать):** `wif500` — победа выдаёт шифртекст ключа, расшифровывает только
  организатор; пространство 2^70 с известными ошибками генерации.

## Окружение и что доступно

Python 3 + `coincurve`, `numpy`, OpenCV/PIL, EasyOCR 1.7.2 + `torch` **CPU** (зрение модели в части
сессий недоступно — OCR и разборы по пикселям работают). **Нет** GPU/CUDA, `hashcat`, `steghide`, `7z` —
чисто-переборные и стего-оси без этих инструментов упираются в блокер. Сеть: `mempool.space` с этой
машины недоступен (TLS-таймаут), работают `blockstream.info`, `blockchain.info`, `eth.blockscout.com`;
`api.github.com` — 60 запросов/час без токена.

Про GitHub (факты, проверенные на этой машине 18.10.2026, учитываются в `tools/github_intake.py`):
квоту **не** тратят `codeload.github.com` (тарболлы), `raw.githubusercontent.com`, `git ls-remote`
и `browser_download_url` релизов — содержимое реп качается бесплатно; `api.github.com` — 60 запросов/час,
и он **общий на весь IP всех агентов** (лимит часовой, учитывай `tools/github_intake.py ledger`);
ответ `304` по ETag — бесплатно; анонимный `search` — отдельный пул 10 запросов/мин; GraphQL анонимно
недоступен (лимит 0); default-ветка у старых репозиториев часто `master`, а не `main` — её определяет
`git ls-remote --symref`.

## Про публикацию этого репозитория

Репозиторий публичный и содержит только исследовательские материалы по **открытым** наградам:
адреса, публичные подсказки, разборы, отрицательные результаты. Перед выкладкой дерево
просканировано на ключевые материалы: 24 WIF с валидной контрольной суммой и 11 кандидатов
64-hex из текстовых заметок → 81 производный адрес, **ни один не хранит живых средств**
(проверка 2026-10-18, отчёт: `reports/2026-10-18_1055_Qoder_github-publish-and-key-scan.md`).
В базе при этом есть **адреса кошельков владельца** (получатели выплат) — они публикуемые,
но не секретные; учтите риск деанонимизации и address-poisoning.

## Где теперь живёт база (обновлено 20.10.2026, AutoClaw)

Локальная рабочая копия в OneDrive (папка `master` на рабочем столе) **удалена 20.10.2026** —
этот репозиторий теперь единственная каноническая копия базы. Восстановление окружения:

```bash
git clone https://github.com/mak777uh/crypto-puzzles.git
cd crypto-puzzles
python tools/claims.py gc   # почистить просроченные брони перед работой
```

Что **не** входит в репозиторий и живёт отдельно (правило п.4 протокола: секреты вне синхронизируемой папки):

- `.secret/` — выжимки сканера ключей (кандидаты privkey 64-hex + производные адреса + provenance);
  последний срез `harvest_hits_2026-10-19.json` (888 записей) забэкаплен в
  `C:\Users\Admin\crypto-work\master_secret_backup\` (вне OneDrive);
- тяжёлые ML-кэши (`**/models/models--*/`, whisper/huggingface, ≈464 МБ) — докачиваются при нужде;
- сырые дампы чужих репозиториев (`**/data/github/*/raw|files|wiki/`, `_sources/github/`, `_sources/ocp/`)
  — пересобираются через `tools/github_intake.py run <slug>`.

Правила синхронизации прежние: `.gitattributes` с `* -text` (побайтовое хранение, `core.autocrlf` не
переписывает CRLF чужих файлов), `.gitignore` отсекает `.secret/`, ключи, ML-кэши и системный мусор.
Пуш — обычный fast-forward, без `--force`; история GitHub-веб-коммитов сохранена через merge.
