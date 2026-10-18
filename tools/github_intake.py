#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
github_intake.py — обязательный GitHub-шлюз (правило Ильи от 18.10.2026).

«Теперь агент, который берёт базу в работу или отдельную загадку, сначала собирает на
GitHub всю информацию по ней из репозиториев.» Пока сбор не выполнен и не зафиксирован в
puzzles/<slug>/LOG.md (включая оформленный негатив), нельзя ни выставлять строку в
PROPOSALS.md, ни запускать проверочный прогон. Правила — AGENT_INSTRUCTIONS.md,
раздел «GitHub-интейк — обязательный первый шлюз (с 18.10.2026)».

Команды
  plan <slug> [--no-net] [--json]      кандидаты + оценка затрат; ничего не пишет
  run <slug> --agent N [флаги]         сбор + дайдест + запись шлюза (LOG.md, маркер README, реестр)
  status [<slug>] [--refresh]          DONE|PARTIAL|NONE|STALE|LEGACY|PENDING; --refresh = реестр по диску
  backlog [--n 20] [--refresh]         очередь целей без интейка (режим «вся база»)
  cache [owner/repo]                   общий кэш переиспользуемых репо (OCP = git pull, 0 запросов)
  ledger [--reconcile]                 учёт бюджета api.github.com (общий на весь IP)
  gc-cache                             отчёт о размере кэша (ничего не удаляет)

Коды возврата run: 0 done | 1 отказ (чужая бронь/нет аргументов) | 2 none (репо нет, негатив
зафиксирован — шлюз закрыт корректно) | 3 partial (бюджет/дедлайн, остаток в data/github/resume.json).

Что собирается по цели: (а) репозитории самой загадки; (б) репозитории автора и мейнтейнеров;
(в) сообщество: форки, issues, pull requests, коммиты, release-ассеты, gists, wiki, метаданные;
(г) записи floflo777/open-crypto-puzzles (офлайн из _sources/ocp/puzzles.json).

Как экономится лимит api.github.com (60 запросов/час, ОБЩИЙ на весь IP всех агентов):
  - содержимое репо идёт бесплатными транспортами: codeload-тарболл, git clone --depth 1,
    git ls-remote --symref (ветку угадывать нельзя: у старых репо это master);
  - квоту тратят только issues/comments/pulls/releases/commits/gists/forks/search;
  - conditional-запросы по ETag: 304 не тратит квоту → повторный run стоит 0 запросов;
  - потолки прогона: 13 минут и 40 запросов (под правило «прогон не дольше 15 минут»);
  - GraphQL анонимно недоступен (лимит 0), анонимный search — отдельный пул 10/мин.

Только чтение сети и записей в базу: никаких трат, транзакций и публикаций.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import os
import re
import shutil
import subprocess
import sys
import tarfile
import tempfile
import time
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timedelta, timezone

try:
    import requests  # type: ignore

    HAVE_REQUESTS = True
except Exception:  # noqa: BLE001
    requests = None  # type: ignore
    HAVE_REQUESTS = False

# ---------- пути ----------

ROOT = os.environ.get("PUZZLE_BASE") or os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUZZLES = os.path.join(ROOT, "puzzles")
REPORTS_DIR = os.path.join(ROOT, "reports")
CLAIMS_DIR = os.path.join(ROOT, "claims", "_active")
SRC = os.path.join(ROOT, "_sources")
GH_CACHE = os.path.join(SRC, "github")
GH_ETAG_CACHE = os.path.join(GH_CACHE, "_cache")
LEDGER_PATH = os.path.join(GH_CACHE, "_api_ledger.json")
ETAGS_PATH = os.path.join(GH_CACHE, "_etags.json")
REPOS_INDEX_PATH = os.path.join(GH_CACHE, "_repos_index.json")
STATUS_MD = os.path.join(SRC, "GITHUB_INTAKE_STATUS.md")
STATUS_JSON = os.path.join(SRC, "GITHUB_INTAKE_STATUS.json")
BACKLOG_MD = os.path.join(GH_CACHE, "INTAKE_BACKLOG.md")
OCP_CLONE = os.path.join(SRC, "ocp")
OCP_PUZZLES_JSON = os.path.join(OCP_CLONE, "puzzles.json")

API = "https://api.github.com"
UA = "master-github-intake/1.0 (read-only research)"

# ---------- потолки прогона ----------

API_SAFETY = 5
PACE_SECONDS = 1.2
MINUTES_DEFAULT = 13
API_BUDGET_DEFAULT = 40
MAX_MB_DEFAULT = 25
MAX_FILE_BYTES = 20 * 1024 * 1024
MAX_SCAN_BYTES = 3 * 1024 * 1024
GATE_VALID_DAYS = 30
GIT_TIMEOUT = 25           # разовый ls-remote/clone не должен вешать прогон
PROBE_TTL_MIN = 30         # кэш default branch/HEAD в _sources/github/_repos_index.json
PRUNE_DIRS = {".git", "node_modules", "__pycache__", ".venv", "venv", "dist", "build", ".idea", ".vscode"}
TEXT_EXT = {".md", ".txt", ".json", ".csv", ".py", ".html", ".log", ".yaml", ".yml"}
MEDIA_EXT = {".png", ".jpg", ".jpeg", ".gif", ".webp", ".bmp", ".svg", ".pdf", ".zip", ".mp4",
             ".m4a", ".webm", ".wav", ".mp3", ".bin", ".dat", ".pcap", ".arc", ".7z", ".rar"}
# Сегменты путей github.com, которые не являются владельцем репозитория (шапка сайта, URL-chrome).
SKIP_OWNERS = {"notifications", "settings", "topics", "orgs", "features", "about", "collections",
               "login", "join", "installations", "marketplace", "user-attachments", "assets",
               "github", "guides", "issues", "pull", "codespaces", "sponsors", "copilot", "edu",
               "users", "repo", "repos", "gist", "gists", "profile", "organizations", "enterprise",
               "pricing", "team", "teams", "packages", "projects", "readme", "welcome", "customer",
               "licenses", "license", "solutions", "resources", "security", "_private", "open-source",
               "get-started", "products", "blog", "showcase", "trending", "starred", "apps", "account",
               "signup", "docs", "site", "themes", "stylesheets", "images", "javascript", "cmc_internal",
               "s", "new", "features", "gallery", "collections", "mobile", "site-policy", "contact",
               "privacy-statement", "terms-of-service", "ghost", "dependencies"}

# Хвосты путей, которые regex принимает за owner/repo, но репозиториями не являются.
SKIP_REPOS = {"tree", "blob", "commit", "releases", "tags", "branches", "actions", "security",
              "new", "compare", "discussions", "gists", "gist",
              # инфраструктурные репо, которые в досье встречаются как случайные ссылки, а не как цель
              "bitcoin", "go-ethereum", "hardhat", "eth-keys", "web3.js", "openzeppelin-contracts",
              "webpack-simple", "anubis", "pr-lens", "caveman", "keyhunt", "electrum", "btcpayserver"}

# Авторы/организации, уже известные по базе (для ролей и зацепки «репо автора»).
KNOWN_OWNERS = {
    "floflo777": "registry", "puzzlehunt": "community", "naddiseo": "maintainer",
    "agntn": "community", "homelessphd": "author", "coreyphillips": "author",
    "schum-io": "author", "phrutis": "author", "metaneer": "author", "bitaps-com": "author",
    "fe-lang": "author", "argotorg": "author", "oritwoen": "community", "eggdropper": "author",
    "jackdevs66": "community", "alexanderthurn": "author", "hossein2002426": "community",
    "kaibuzz0": "community", "visalord": "author", "useo-archive": "community",
    "canalqb": "community",
}

# Дампы, которые уже лежат в базе: НЕ перекачиваем, только ссылаемся (чужое не трём).
LEGACY_LOCATIONS = {
    "gsmg-io-5btc-puzzle": {
        "puzzlehunt/gsmgio-5btc-puzzle": "data/puzzlehunt/",
        "naddiseo/gsmgio-5btc-puzzle": "naddiseo-fork/",
    },
    "9vw04-gem-finder": {
        "canalqb/puzzle_bc1qr5mssp6snmduqp9enx4dzmcxvk7qw83lceyy2v": "data/external/github/canalqb-puzzle/",
        "agntn/puzzles": "data/external2/github2/",
    },
}

# Кандидатов от одного «фермерского» владельца (в дампах бывают полные списки его репо) ограничиваем:
# релевантные пазлу по имени репо остаются все, прочие — не больше MAX_PER_OWNER.
MAX_PER_OWNER = 3
RELEVANT_WORDS = ("puzzle", "quest", "challenge", "treasure", "solution", "solved", "hunt", "bounty")

RE_GITHUB = re.compile(r"github\.com/([A-Za-z0-9_.-]+)/([A-Za-z0-9_.-]+)")
RE_RAW = re.compile(r"(?:raw\.githubusercontent\.com|codeload\.github\.com)/([A-Za-z0-9_.-]+)/([A-Za-z0-9_.-]+)")
RE_URL = re.compile(r"https?://[^\s\)\]\}\"'<>`]+")
RE_BTC = re.compile(r"\b(?:bc1[023456789acdefghjklmnpqrstuvwxyz]{11,71}|[13][a-km-zA-HJ-NP-Z1-9]{25,34})\b")
RE_ETH = re.compile(r"\b0x[a-fA-F0-9]{40}\b")
RE_HEX64 = re.compile(r"\b(?:0x)?([0-9a-fA-F]{64})\b")
RE_WIF = re.compile(r"\b(?:5[1-9A-HJ-NP-Za-km-z]{50}|[KL][1-9A-HJ-NP-Za-km-z]{51})\b")
MARKER_PREFIX = "- GitHub-интейк: "


# ---------- мелочи ----------

def utcnow() -> datetime:
    return datetime.now(timezone.utc)


def iso(dt: datetime) -> str:
    return dt.replace(microsecond=0).isoformat().replace("+00:00", "Z")


def parse_iso(s: str) -> datetime:
    return datetime.fromisoformat(s.replace("Z", "+00:00"))


def today() -> str:
    return datetime.now().strftime("%Y-%m-%d")


def fmt_bytes(n) -> str:
    n = int(n or 0)
    for unit, div in (("ГБ", 1073741824), ("МБ", 1048576), ("КБ", 1024)):
        if n >= div:
            return "%.1f %s" % (n / div, unit)
    return "%d Б" % n


def norm_name(s: str) -> str:
    return re.sub(r"[^a-z0-9]", "", (s or "").lower())


def dir_size(path: str) -> int:
    """Байт в папке, без .git."""
    total = 0
    for root, dirs, files in os.walk(path):
        dirs[:] = [d for d in dirs if d != ".git"]
        for f in files:
            p = os.path.join(root, f)
            try:
                if os.path.isfile(p):
                    total += os.path.getsize(p)
            except OSError:
                continue
    return total


def cell(s) -> str:
    return re.sub(r"\s+", " ", str(s or "")).replace("|", "/")[:110]


def atomic_write_text(path: str, text: str) -> None:
    """temp в той же папке + os.replace, с отступом на OneDrive-лок."""
    os.makedirs(os.path.dirname(path), exist_ok=True)
    tmp = path + ".tmp.%d" % os.getpid()
    with open(tmp, "w", encoding="utf-8", newline="\n") as f:
        f.write(text)
        f.flush()
        os.fsync(f.fileno())
    delay = 0.5
    for _ in range(4):
        try:
            os.replace(tmp, path)
            return
        except (PermissionError, FileExistsError):
            time.sleep(delay)
            delay *= 3
    if os.path.exists(tmp):
        os.remove(tmp)
    raise RuntimeError("не удалось атомарно записать %s (OneDrive-лок?)" % path)


def atomic_append(path: str, chunk: str) -> None:
    """Дополнение без перезаписи чужого: перечитать с диска → дописать → атомарно положить."""
    old = ""
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8", errors="replace") as f:
            old = f.read()
    if old and not old.endswith("\n"):
        old += "\n"
    atomic_write_text(path, old + chunk)


def read_json(path: str, default):
    try:
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:  # noqa: BLE001
        return default


def locked_json(path: str, mutate):
    """Общий JSON с межпроцессной блокировкой (несколько агентов = один IP = один бюджет)."""
    os.makedirs(os.path.dirname(path), exist_ok=True)
    lock = path + ".lock"
    got = False
    for _ in range(150):
        try:
            fd = os.open(lock, os.O_CREAT | os.O_EXCL | os.O_WRONLY)
            with os.fdopen(fd, "w") as f:
                f.write(str(os.getpid()))
            got = True
            break
        except FileExistsError:
            try:
                if time.time() - os.path.getmtime(lock) > 60:
                    os.remove(lock)
            except OSError:
                pass
            time.sleep(0.2)
    try:
        data = read_json(path, {})
        out = mutate(data)
        atomic_write_text(path, json.dumps(data, ensure_ascii=False, indent=2) + "\n")
        return out
    finally:
        if got:
            try:
                os.remove(lock)
            except OSError:
                pass


def http_get(url: str, headers=None, timeout: int = 30):
    hdrs = {"User-Agent": UA}
    hdrs.update(headers or {})
    if HAVE_REQUESTS:
        r = requests.get(url, headers=hdrs, timeout=timeout)
        return r.status_code, {k.lower(): v for k, v in r.headers.items()}, r.content
    req = urllib.request.Request(url, headers=hdrs)
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            return resp.status, {k.lower(): v for k, v in resp.headers.items()}, resp.read()
    except urllib.error.HTTPError as e:
        hdr = {k.lower(): v for k, v in (e.headers or {}).items()}
        return e.code, hdr, (e.read() if e.fp else b"")


def run_git(args, cwd=None, timeout=180):
    try:
        p = subprocess.run(["git"] + args, cwd=cwd, capture_output=True, text=True,
                           encoding="utf-8", errors="replace", timeout=timeout)
        return p.returncode, (p.stdout or ""), (p.stderr or "")
    except Exception as e:  # noqa: BLE001
        return 127, "", repr(e)[:200]


# ---------- бюджет api.github.com ----------

class Quota:
    def __init__(self, budget: int, agent: str):
        self.budget = budget
        self.agent = agent
        self.spent = 0
        self.free = 0
        st = read_json(LEDGER_PATH, {})
        self.limit = st.get("limit", 60)
        self.remaining_seen = st.get("remaining_seen")
        self.reset_utc = st.get("reset_utc")
        try:
            if self.reset_utc and utcnow() >= parse_iso(self.reset_utc):
                self.remaining_seen = None  # окно часа истекло — бюджет обновился
        except Exception:  # noqa: BLE001
            pass

    def can(self, n: int = 1) -> bool:
        if self.spent + n > self.budget:
            return False
        if self.remaining_seen is not None and self.remaining_seen - n < API_SAFETY:
            return False
        return True

    def stop_reason(self) -> str:
        if self.spent >= self.budget:
            return "исчерпан --api-budget (%d запросов)" % self.budget
        if self.remaining_seen is not None and self.remaining_seen <= API_SAFETY:
            return "исчерпан общий часовой бюджет IP (remaining=%s, reset=%s)" % (
                self.remaining_seen, self.reset_utc)
        return ""

    def _note(self, url, status, cost):
        def mutate(d):
            ents = d.get("entries", [])
            ents.append({"ts": iso(utcnow()), "agent": self.agent, "url": url[:170],
                         "status": status, "cost": cost})
            d["entries"] = ents[-500:]
            d["spent_window"] = d.get("spent_window", 0) + cost
            d["updated_utc"] = iso(utcnow())
            return d
        locked_json(LEDGER_PATH, mutate)

    def _sync(self):
        """Согласовать общий ledger с фактическими заголовками X-RateLimit-*."""
        if self.remaining_seen is None:
            return

        def mutate(d):
            d["remaining_seen"] = self.remaining_seen
            d["limit"] = self.limit
            if self.reset_utc:
                d["reset_utc"] = self.reset_utc
            d["updated_utc"] = iso(utcnow())
            return d
        locked_json(LEDGER_PATH, mutate)

    def api(self, path: str, params=None, slot: str = ""):
        """GET к api.github.com с ETag-кэшем. -> (ok, data, note)."""
        url = path if path.startswith("http") else API + path
        if params:
            url += ("&" if "?" in url else "?") + urllib.parse.urlencode(params)
        key = slot or url
        headers = {"Accept": "application/vnd.github+json"}
        etags = read_json(ETAGS_PATH, {})
        if key in etags:
            headers["If-None-Match"] = etags[key]
        time.sleep(PACE_SECONDS)
        try:
            status, hdrs, body = http_get(url, headers, timeout=45)
        except Exception as e:  # noqa: BLE001
            return False, None, "ERR %s" % repr(e)[:120]
        rem = hdrs.get("x-ratelimit-remaining")
        rst = hdrs.get("x-ratelimit-reset")
        lim = hdrs.get("x-ratelimit-limit")
        if rem is not None:
            self.remaining_seen = int(rem)
        if lim:
            self.limit = int(lim)
        if rst:
            self.reset_utc = iso(datetime.fromtimestamp(int(rst), tz=timezone.utc))
        self._sync()
        if status == 304:
            self._note(url, status, 0)
            self.free += 1
            cached = read_json(os.path.join(GH_ETAG_CACHE, re.sub(r"[^a-zA-Z0-9.-]", "_", key) + ".json"), None)
            if cached is not None:
                return True, cached, "304 из кэша (0 запросов)"
            return False, None, "304, но кэш-файл потерян"
        self.spent += 1
        if status in (403, 429):
            self._note(url, status, 1)
            return False, None, "HTTP %s%s" % (status, (" Retry-After=%s" % hdrs["retry-after"])
                                               if hdrs.get("retry-after") else "")
        if status >= 400:
            self._note(url, status, 1)
            return False, None, "HTTP %s" % status
        self._note(url, status, 1)
        try:
            payload = json.loads(body.decode("utf-8", "replace"))
        except Exception:  # noqa: BLE001
            return False, None, "не JSON (%d Б)" % len(body)
        etag = hdrs.get("etag")
        if etag:
            def mutate(d, _k=key, _e=etag):
                d[_k] = _e
                return d
            locked_json(ETAGS_PATH, mutate)
            os.makedirs(GH_ETAG_CACHE, exist_ok=True)
            atomic_write_text(os.path.join(GH_ETAG_CACHE, re.sub(r"[^a-zA-Z0-9.-]", "_", key) + ".json"),
                              body.decode("utf-8", "replace"))
        return True, payload, "HTTP %s" % status


# ---------- бесплатные транспорты ----------

def free_probe(o_r: str, use_cache: bool = True):
    """git ls-remote --symref -> (default_branch, head_sha). 0 запросов к API.
    Результат кэшируется в _sources/github/_repos_index.json на PROBE_TTL_MIN минут."""
    if use_cache:
        ent = (read_json(REPOS_INDEX_PATH, {}) or {}).get(o_r) or {}
        try:
            fresh = utcnow() < parse_iso(ent.get("last_seen", "2000-01-01T00:00:00Z")) + timedelta(minutes=PROBE_TTL_MIN)
        except Exception:  # noqa: BLE001
            fresh = False
        if fresh and (ent.get("head_sha") or ent.get("default_branch")):
            return ent.get("default_branch", ""), ent.get("head_sha", "")
    rc, out, _err = run_git(["ls-remote", "--symref", "https://github.com/%s" % o_r, "HEAD"], timeout=GIT_TIMEOUT)
    if rc != 0:
        return None
    branch = sha = ""
    for line in out.splitlines():
        m = re.match(r"^ref:\s+refs/heads/(\S+)\s+HEAD", line)
        if m:
            branch = m.group(1)
        elif line.strip() and not line.startswith("ref:"):
            sha = line.split()[0]
    if not branch and not sha:
        return None

    def mutate(d):
        d[o_r] = {"default_branch": branch or d.get(o_r, {}).get("default_branch", ""),
                  "head_sha": sha, "last_seen": iso(utcnow())}
        return d
    locked_json(REPOS_INDEX_PATH, mutate)
    return branch, sha


def download_snapshot(o_r: str, branch: str, sha: str, dest_files: str, max_mb: int, log: list):
    """Содержимое репо бесплатным транспортом. -> (n_files, n_bytes, method)."""
    os.makedirs(dest_files, exist_ok=True)
    tmp = tempfile.mkdtemp(prefix="intake_")
    tar = os.path.join(tmp, "snap.tar.gz")
    limit = max_mb * 1024 * 1024
    urls = []
    if sha:
        urls.append("https://codeload.github.com/%s/tar.gz/%s" % (o_r, sha))
    for b in dict.fromkeys([branch, "master", "main"]):
        if b:
            urls.append("https://codeload.github.com/%s/tar.gz/refs/heads/%s" % (o_r, b))
    got = False
    oversized = False
    for u in urls:
        try:
            total = 0
            over = False
            if HAVE_REQUESTS:
                r = requests.get(u, headers={"User-Agent": UA}, timeout=120, stream=True)
                if r.status_code != 200:
                    continue
                with open(tar, "wb") as f:
                    for chunk in r.iter_content(65536):
                        total += len(chunk)
                        if total > limit:
                            over = True
                            break
                        f.write(chunk)
            else:
                req = urllib.request.Request(u, headers={"User-Agent": UA})
                with urllib.request.urlopen(req, timeout=120) as resp, open(tar, "wb") as f:
                    while True:
                        chunk = resp.read(65536)
                        if not chunk:
                            break
                        total += len(chunk)
                        if total > limit:
                            over = True
                            break
                        f.write(chunk)
            if over:
                # обрывать на середине нельзя: половинный tar — мусор. Огромное репо не распаковываем.
                oversized = True
                got = True
                break
            got = True
            break
        except Exception as e:  # noqa: BLE001
            log.append("%s: codeload %s — %s" % (o_r, u.rsplit("/", 1)[-1], repr(e)[:80]))
    if oversized:
        log.append("%s: репозиторий больше --max-mb (%d МБ) — содержимое НЕ распаковано, "
                   "только метаданные и API" % (o_r, max_mb))
        shutil.rmtree(tmp, ignore_errors=True)
        return 0, 0, "skip: больше --max-mb"
    if not got:
        clone_dir = os.path.join(tmp, "clone")
        args = ["clone", "--depth", "1", "--single-branch"]
        if branch:
            args += ["-b", branch]
        args += ["https://github.com/%s" % o_r, clone_dir]
        rc, _o, err = run_git(args, timeout=300)
        if rc != 0:
            log.append("%s: не скачан (%s)" % (o_r, err[:140].replace("\n", " ")))
            shutil.rmtree(tmp, ignore_errors=True)
            return 0, 0, "нет"
        shutil.rmtree(os.path.join(clone_dir, ".git"), ignore_errors=True)  # вложенный .git не оставляем
        for name in os.listdir(clone_dir):
            shutil.move(os.path.join(clone_dir, name), os.path.join(dest_files, name))
        shutil.rmtree(tmp, ignore_errors=True)
        n = b = 0
        for root, _dirs, files in os.walk(dest_files):
            for f in files:
                n += 1
                b += os.path.getsize(os.path.join(root, f))
        return n, b, "git clone --depth 1 (.git удалён)"
    n, b = extract_tarball(tar, dest_files, limit, log, o_r)
    shutil.rmtree(tmp, ignore_errors=True)
    return n, b, "codeload tarball"


def extract_tarball(tar_path: str, dest_files: str, limit: int, log: list, o_r: str):
    n = b = 0
    try:
        with tarfile.open(tar_path, "r:gz") as tf:
            for m in tf.getmembers():
                parts = m.name.split("/", 1)
                if len(parts) < 2:
                    continue
                segs = parts[1].split("/")
                if ".." in segs or segs[0] in SKIP_OWNERS or any(s in PRUNE_DIRS for s in segs):
                    continue
                if not m.isfile() or m.size > MAX_FILE_BYTES:
                    continue
                if b + m.size > limit:
                    log.append("%s: распаковка обрезана по --max-mb (%d МБ)" % (o_r, limit // 1048576))
                    break
                src = tf.extractfile(m)
                if src is None:
                    continue
                data = src.read()
                out = os.path.join(dest_files, *segs)
                os.makedirs(os.path.dirname(out), exist_ok=True)
                with open(out, "wb") as fh:
                    fh.write(data)
                n += 1
                b += len(data)
    except Exception as e:  # noqa: BLE001
        log.append("%s: распаковка — %s" % (o_r, repr(e)[:120]))
    return n, b


# ---------- обнаружение кандидатов ----------

def dossier_text(slug: str):
    """Тексты досье: README/LOG/INSIGHT/findings + текстовые файлы папки (кроме нашего data/github), до 3 МБ каждый.

    Собственный data/github исключается: иначе дампы чужих реп искажают сравнение
    «новое против досье».
    """
    base = os.path.join(PUZZLES, slug)
    gh_dir = os.path.abspath(os.path.join(base, "data", "github"))
    paths = [os.path.join(base, n) for n in ("README.md", "LOG.md", "INSIGHT.md", "findings.md")]
    for root, dirs, files in os.walk(base):
        dirs[:] = [d for d in dirs if d not in PRUNE_DIRS
                   and os.path.abspath(os.path.join(root, d)) != gh_dir]
        for f in files:
            if os.path.splitext(f)[1].lower() not in TEXT_EXT:
                continue
            p = os.path.join(root, f)
            try:
                if os.path.getsize(p) <= MAX_SCAN_BYTES:
                    paths.append(p)
            except OSError:
                pass
    chunks = []
    seen = set()
    for p in paths:
        rp = os.path.realpath(p)
        if rp in seen or not os.path.isfile(p):
            continue
        seen.add(rp)
        try:
            with open(p, "r", encoding="utf-8", errors="replace") as f:
                chunks.append(f.read())
        except OSError:
            continue
    return "\n".join(chunks)


def repos_from_text(text: str):
    out = {}
    for rx in (RE_GITHUB, RE_RAW):
        for m in rx.finditer(text):
            o, r = m.group(1), m.group(2).rstrip("/")
            if o.lower() in SKIP_OWNERS or r.lower() in SKIP_REPOS:
                continue
            r = re.sub(r"\.git$", "", r).strip(".")
            if not r or not o:
                continue
            # gist/commit-ссылки (github.com/<user>/<sha>) репозиториями не являются
            if re.fullmatch(r"[0-9a-fA-F]{20,}", r):
                continue
            key = "%s/%s" % (o, r)
            if key.lower().startswith("floflo777/open-crypto-puzzles"):
                key = "floflo777/open-crypto-puzzles"
            out[key] = out.get(key, 0) + 1
    return out


def prune_links(links, slug):
    """Порядок кандидатов по убыванию hits + отсечение «ферм» одного владельца.
    Возвращает (kept[(repo, hits)], dropped[repo]) — дропнутые идут в негативы дайдеста."""
    toks = [t for t in re.split(r"[^a-z0-9]+", (slug or "").lower()) if len(t) > 3]
    ordered = sorted(links.items(), key=lambda kv: (-kv[1], kv[0].lower()))
    kept, dropped, per_owner = [], [], {}
    for repo, hits in ordered:
        owner, _, name = repo.partition("/")
        low = (name or "").lower()
        rel = any(t in low for t in toks) or any(w in low for w in RELEVANT_WORDS)
        if not rel:
            n = per_owner.get(owner.lower(), 0)
            if n >= MAX_PER_OWNER:
                dropped.append(repo)
                continue
            per_owner[owner.lower()] = n + 1
        kept.append((repo, hits))
    return kept, dropped


GENERIC_TOKENS = {"puzzle", "puzzles", "btc", "eth", "challenge", "sats", "ksats", "msats", "solution",
                  "github", "data", "report", "reports", "agent", "qoder", "opencode", "autoclaw", "find"}


def cross_agent_repos(slug: str):
    """Кандидаты, которые другие агенты нашли МИМО ссылок в досье. Сеть не тратит.

    Прецедент (18.10, отчёт Big Pickle): `testnetbtc/GSMG` и `AppleLamps/GSMG-CLEAN` — в README/LOG
    пазла их github-ссылок нет, поэтому чисто «ссылочное» обнаружение их не видит. Источники:
      1) имена папок дампов `data/**/<owner>__<repo>` (кроме нашего `data/github/` — он и так учтён);
      2) github-ссылки в `reports/*<токен пазла>*.md` чужих проходов по этому пазлу.
    """
    out = []
    base = os.path.join(PUZZLES, slug, "data")
    if os.path.isdir(base):
        for root, dirs, _files in os.walk(base):
            rel = os.path.relpath(root, base).replace("\\", "/")
            here = "" if rel == "." else rel + "/"
            top = rel.split("/")[0]
            if top in ("github", "."):
                if top == "github":
                    dirs[:] = []
                continue
            for d in list(dirs):
                if "__" not in d:
                    continue
                o, _, r = d.partition("__")
                o, r = o.strip("._-"), r.strip("._-")
                if o and r and re.fullmatch(r"[A-Za-z0-9._-]{1,40}", o) and len(r) > 1:
                    out.append(("%s/%s" % (o, r), "дампы соагентов: data/%s%s" % (here, d)))
            dirs[:] = [d for d in dirs if "__" not in d]
    toks = [t for t in re.split(r"[^a-z0-9]+", slug.lower()) if len(t) >= 4 and t not in GENERIC_TOKENS]
    lead = toks[:1]
    if lead and os.path.isdir(REPORTS_DIR):
        read_n = 0
        for fn in sorted(os.listdir(REPORTS_DIR), reverse=True):
            if read_n >= 6 or not fn.lower().endswith(".md"):
                continue
            low = fn.lower()
            if not any(t in low for t in lead):
                continue
            read_n += 1
            try:
                with open(os.path.join(REPORTS_DIR, fn), "r", encoding="utf-8", errors="replace") as fh:
                    body = fh.read(MAX_SCAN_BYTES)
            except OSError:
                continue
            for repo in repos_from_text(body):
                out.append((repo, "отчёт соагента: reports/%s" % fn))
    return out


def ocp_entry(slug: str):
    """Локальная запись OCP (_sources/ocp/puzzles.json, slug = имена наших папок). 0 сети."""
    data = read_json(OCP_PUZZLES_JSON, None)
    if not data:
        return None
    items = data.get("puzzles") if isinstance(data, dict) else data
    if not isinstance(items, list):
        return None
    for it in items:
        if isinstance(it, dict) and (it.get("slug") or "").strip() == slug:
            author = it.get("author") if isinstance(it.get("author"), dict) else {}
            return {"slug": slug, "tier": it.get("tier"), "folder": it.get("folder") or it.get("path"),
                    "handles": author.get("handles") or [], "repo": "floflo777/open-crypto-puzzles",
                    "ocp_path": "_sources/ocp/%s" % (it.get("folder") or "").lstrip("/")}
    return None


def discover(slug: str, manual=None, exclude=None, search_k=0, quota=None, log=None):
    """manually -> ссылки досье -> OCP (офлайн) -> репо владельца -> форки -> поиск."""
    log = log if log is not None else []
    text = dossier_text(slug)
    cand, seen = [], set()
    excluded = {e.lower().strip("/") for e in (exclude or [])}

    def add(repo, role, source, hits=0):
        key = repo.lower().strip("/")
        if key in excluded or key in seen or "/" not in key:
            return
        seen.add(key)
        cand.append({"repo": key, "role": role, "source": source, "hits": hits})

    for r in (manual or []):
        add(r, "manual", "--repo")
    links = repos_from_text(text)
    kept, dropped = prune_links(links, slug)
    if dropped:
        log.append("кандидаты отсечены как шум одного владельца (%d из %d): %s%s" % (
            len(dropped), len(links), ", ".join(dropped[:8]), "…" if len(dropped) > 8 else ""))
    for repo, hits in kept:
        owner = repo.split("/")[0].lower()
        role = KNOWN_OWNERS.get(owner) or ("registry" if owner == "floflo777" else "community")
        add(repo, role, "ссылки досье", hits)
    for repo, src in cross_agent_repos(slug):
        owner = repo.split("/")[0].lower()
        role = KNOWN_OWNERS.get(owner) or ("registry" if owner == "floflo777" else "community")
        add(repo, role, src)
    ocp = ocp_entry(slug)
    if ocp:
        add(ocp["repo"], "registry", "OCP puzzles.json (офлайн)")

    owners = []
    for c in cand:
        o = c["repo"].split("/")[0]
        if o not in owners:
            owners.append(o)
    if quota is not None:
        for o in owners[:2]:
            if not quota.can(1):
                log.append("репо владельца %s: пропущено (%s)" % (o, quota.stop_reason() or "нет бюджета"))
                break
            ok, data, note = quota.api("/users/%s/repos" % o, {"per_page": 100, "sort": "updated"},
                                       slot="owner_repos:%s" % o)
            if not ok:
                log.append("репо владельца %s: %s" % (o, note))
                continue
            toks = [t for t in re.split(r"[^a-z0-9]+", slug.lower()) if len(t) > 3]
            for it in data or []:
                fn = it.get("full_name") or ""
                blob = (fn + " " + (it.get("description") or "")).lower()
                if any(t in blob for t in toks):
                    add(fn, "author", "репо владельца %s" % o)
        if cand and quota.can(1):
            top = cand[0]["repo"]
            ok, data, note = quota.api("/repos/%s/forks" % top, {"per_page": 100}, slot="forks:%s" % top)
            if ok:
                for it in (data or [])[:6]:
                    if it.get("full_name"):
                        add(it["full_name"], "fork", "форки %s" % top)
            else:
                log.append("форки %s: %s" % (top, note))
        elif cand:
            log.append("форки %s: пропущено (%s)" % (cand[0]["repo"], quota.stop_reason() or "нет бюджета"))
        for i in range(search_k):
            if not quota.can(1):
                log.append("поиск: пропущено (%s)" % (quota.stop_reason() or "нет бюджета"))
                break
            q = slug.replace("-", " ").strip()
            ok, data, note = quota.api("/search/repositories", {"q": q, "per_page": 20},
                                       slot="search:%s:%d" % (slug, i))
            log.append("поиск %r: %s" % (q, ("найдено %d" % len(data.get("items", []))) if ok else note))
            if ok:
                for it in (data.get("items") or [])[:8]:
                    if it.get("full_name"):
                        add(it["full_name"], "search", "поиск GitHub")
    return cand, ocp, text


# ---------- API-сбор по репо ----------

def paginate(quota, path, slot_prefix, params, max_pages, raw_dir, fname):
    items, notes, reqs = [], [], 0
    for page in range(1, max_pages + 1):
        if not quota.can(1):
            notes.append("остановлено на стр.%d: %s" % (page, quota.stop_reason() or "бюджет"))
            break
        p = dict(params or {})
        p.update({"per_page": 100, "page": page})
        reqs += 1
        ok, data, note = quota.api(path, p, slot="%s:p%d" % (slot_prefix, page))
        if not ok:
            notes.append("%s: %s" % (path, note))
            break
        if not isinstance(data, list):
            notes.append("%s: ответ не список" % path)
            break
        items.extend(data)
        os.makedirs(raw_dir, exist_ok=True)
        atomic_write_text(os.path.join(raw_dir, "%s_p%d.json" % (fname, page)),
                          json.dumps(data, ensure_ascii=False))
        if len(data) < 100:
            break
    return items, reqs, "; ".join(notes)


def harvest_repo(quota, o_r: str, raw_dir: str, kinds):
    """Упаковщик: api_calls = РЕАЛЬНО списанные запросы (ответы 304 по ETag стоят 0)."""
    s0 = quota.spent
    res = _harvest_impl(quota, o_r, raw_dir, kinds)
    res["api_calls"] = quota.spent - s0
    return res


def _harvest_impl(quota, o_r: str, raw_dir: str, kinds):
    res = {"api_calls": 0, "counts": {}, "errors": [], "items": {}, "meta": {}}
    if not quota.can(1):
        res["errors"].append("не собрано: %s" % (quota.stop_reason() or "нет бюджета"))
        return res
    ok, meta, note = quota.api("/repos/%s" % o_r, None, slot="repo:%s" % o_r)
    res["api_calls"] += 1
    if not ok:
        res["errors"].append("meta: %s" % note)
        return res
    lic = meta.get("license")
    res["meta"] = {k: meta.get(k) for k in ("full_name", "default_branch", "description", "homepage",
                                            "forks_count", "stargazers_count", "subscribers_count",
                                            "open_issues_count", "pushed_at", "updated_at", "size",
                                            "language", "archived", "html_url")}
    res["meta"]["license"] = (lic or {}).get("spdx_id") if isinstance(lic, dict) else lic
    if "issues" in kinds:
        items, reqs, note = paginate(quota, "/repos/%s/issues" % o_r, "issues:%s" % o_r,
                                     {"state": "all", "sort": "updated", "direction": "desc"},
                                     3, raw_dir, "issues")
        res["api_calls"] += reqs
        res["counts"]["issues"] = len(items)
        res["items"]["issues"] = items
        if note:
            res["errors"].append("issues: %s" % note)
    if "comments" in kinds:
        items, reqs, note = paginate(quota, "/repos/%s/issues/comments" % o_r, "comments:%s" % o_r,
                                     {}, 5, raw_dir, "comments")
        res["api_calls"] += reqs
        res["counts"]["comments"] = len(items)
        res["items"]["comments"] = items
        if note:
            res["errors"].append("comments: %s" % note)
    if "pulls" in kinds and quota.can(1):
        items, reqs, note = paginate(quota, "/repos/%s/pulls" % o_r, "pulls:%s" % o_r, {"state": "all"},
                                     2, raw_dir, "pulls")
        res["api_calls"] += reqs
        res["counts"]["pulls"] = len(items)
        res["items"]["pulls"] = items
        if note:
            res["errors"].append("pulls: %s" % note)
    assets = []
    if "releases" in kinds and quota.can(1):
        items, reqs, note = paginate(quota, "/repos/%s/releases" % o_r, "releases:%s" % o_r, {},
                                     2, raw_dir, "releases")
        res["api_calls"] += reqs
        res["counts"]["releases"] = len(items)
        for rel in items:
            for a in rel.get("assets") or []:
                assets.append({"release": rel.get("tag_name"), "name": a.get("name"),
                               "size": a.get("size"), "url": a.get("browser_download_url")})
        if note:
            res["errors"].append("releases: %s" % note)
    if "commits" in kinds and quota.can(1):
        br = res["meta"].get("default_branch")
        items, reqs, note = paginate(quota, "/repos/%s/commits" % o_r, "commits:%s" % o_r,
                                     ({"sha": br} if br else None), 1, raw_dir, "commits")
        res["api_calls"] += reqs
        res["counts"]["commits"] = len(items)
        res["items"]["commits"] = [{"sha": c.get("sha"),
                                    "date": ((c.get("commit", {}).get("committer") or {}).get("date") or "")[:10],
                                    "msg": (c.get("commit", {}).get("message") or "").split("\n")[0][:110]}
                                   for c in items]
        if note:
            res["errors"].append("commits: %s" % note)
    res["release_assets"] = assets[:60]
    owner = o_r.split("/")[0]
    gists = []
    if "gists" in kinds and quota.can(1):
        items, reqs, note = paginate(quota, "/users/%s/gists" % owner, "gists:%s" % owner, {},
                                     1, raw_dir, "gists")
        res["api_calls"] += reqs
        for g in items[:40]:
            gists.append({"id": g.get("id"), "desc": (g.get("description") or "")[:120],
                          "files": list((g.get("files") or {}).keys())[:8], "url": g.get("html_url")})
        res["counts"]["gists"] = len(items)
    res["gists"] = gists
    return res


# ---------- содержание дайдеста ----------

def build_issue_index(issues, limit=80):
    rows = []
    for i in issues or []:
        if i.get("pull_request"):
            continue
        rows.append({"n": i.get("number"), "state": i.get("state"), "created": (i.get("created_at") or "")[:10],
                     "updated": (i.get("updated_at") or "")[:10], "author": (i.get("user") or {}).get("login"),
                     "title": (i.get("title") or "")[:90], "lead": cell(i.get("body")),
                     "comments": i.get("comments")})
        if len(rows) >= limit:
            break
    return rows


def const_quotes(issues, comments, limit=25):
    by_issue = {}
    for c in comments or []:
        m = re.search(r"/issues/(\d+)", c.get("issue_url") or "")
        if m:
            by_issue.setdefault(m.group(1), []).append(c)
    rows = []
    pat = re.compile(RE_BTC.pattern + "|" + RE_ETH.pattern + "|" + RE_HEX64.pattern + r"|(XOR|SHA2?56|hash160|seed)", re.I)
    for i in issues or []:
        for c in by_issue.get(str(i.get("number")), [])[:3]:
            body = cell(c.get("body"))
            if body and pat.search(body):
                rows.append({"issue": i.get("number"), "it_title": (i.get("title") or "")[:70],
                             "author": (c.get("user") or {}).get("login"),
                             "date": (c.get("created_at") or "")[:10], "quote": body[:360]})
            if len(rows) >= limit:
                return rows
    return rows


def media_index(files_dir: str):
    rows = []
    for root, dirs, files in os.walk(files_dir):
        dirs[:] = [d for d in dirs if d not in PRUNE_DIRS]
        for f in files:
            if os.path.splitext(f)[1].lower() not in MEDIA_EXT:
                continue
            p = os.path.join(root, f)
            try:
                h = hashlib.sha256()
                with open(p, "rb") as fh:
                    for chunk in iter(lambda: fh.read(1 << 20), b""):
                        h.update(chunk)
                rows.append({"path": os.path.relpath(p, files_dir).replace("\\", "/"),
                             "size": os.path.getsize(p), "sha256": h.hexdigest()[:16]})
            except OSError:
                continue
        if len(rows) > 400:
            break
    return rows


def scan_dump(files_dir: str, dossier: str):
    """Что есть в дампе, но нет в README/LOG пазла + внешние не-GitHub ссылки. -> (found{}, links{}, note)."""
    found = {"btc": set(), "eth": set(), "hex64": set(), "wif": set(), "url": set()}
    links = {}
    budget = 40 * 1024 * 1024
    note = ""
    for root, dirs, files in os.walk(files_dir):
        dirs[:] = [d for d in dirs if d not in PRUNE_DIRS]
        if note:
            break
        for f in files:
            if os.path.splitext(f)[1].lower() not in TEXT_EXT:
                continue
            p = os.path.join(root, f)
            try:
                if os.path.getsize(p) > MAX_SCAN_BYTES:
                    continue
                with open(p, "r", encoding="utf-8", errors="replace") as fh:
                    txt = fh.read()
            except OSError:
                continue
            budget -= len(txt)
            if budget < 0:
                note = "сканирование обрезано по объёму (40 МБ)"
                break
            found["btc"].update(RE_BTC.findall(txt))
            found["eth"].update(x.lower() for x in RE_ETH.findall(txt))
            found["hex64"].update(x.lower() for x in RE_HEX64.findall(txt))
            found["wif"].update(RE_WIF.findall(txt))
            for u in RE_URL.findall(txt):
                u = u.rstrip(".,;:'\"")
                found["url"].add(u)
                if "github.com" not in u and "user-attachments" not in u:
                    links[u] = links.get(u, 0) + 1
    for k in found:
        found[k] = {v for v in found[k] if v not in dossier}
    return found, links, note


def digest_md(slug, agent, res):
    L = ["# GitHub-интейк: %s" % slug, ""]
    L.append("- Дата/время: %s %s local (%s)" % (today(), datetime.now().strftime("%H:%M"), iso(utcnow())))
    L.append("- Агент: %s" % agent)
    L.append("- Команда: `python tools/github_intake.py run %s --agent %s`" % (slug, agent))
    L.append("- **Статус шлюза: %s**%s" % (res["status"], (" — %s" % res["stop_reason"]) if res.get("stop_reason") else ""))
    if res.get("note"):
        L.append("- Примечание: %s" % res["note"])
    L.append("- Бюджет: api.github.com = %d запросов (remaining %s, reset %s); бесплатных транспортов = %d" % (
        res["api_calls"], res.get("remaining_seen"), res.get("reset_utc"), res.get("free_transports", 0)))
    L.append("- Объём: файлов %d (%s), медиа %d" % (res.get("files", 0), fmt_bytes(res.get("bytes", 0)),
                                                    res.get("media", 0)))
    if res.get("ocp"):
        L.append("- OCP (офлайн): tier=%s, путь `_sources/ocp/…`, handles=%s" % (
            res["ocp"].get("tier"), ", ".join(res["ocp"].get("handles") or [])))
    L += ["", "## 1. Репозитории", ""]
    L += ["| owner/repo | роль | источник | ветка | HEAD | issues | комм. | PR | rel. | gists | wiki | ★ | подписч. | форки | открыто | pushed | лицензия | размер | путь |",
          "|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|"]
    for r in res.get("repos") or []:
        m = r.get("meta") or {}
        c = r.get("counts") or {}
        L.append("| %s | %s | %s | %s | %s | %s | %s | %s | %s | %s | %s | %s | %s | %s | %s | %s | %s | %s | `%s` |" % (
            r["repo"], r["role"], cell(r.get("source")), m.get("default_branch") or r.get("branch") or "",
            (r.get("head_sha") or "")[:8], c.get("issues", 0), c.get("comments", 0), c.get("pulls", 0),
            c.get("releases", 0), c.get("gists", 0), "да" if r.get("wiki") else "нет",
            m.get("stargazers_count", ""), m.get("subscribers_count", ""), m.get("forks_count", ""),
            m.get("open_issues_count", ""), (m.get("pushed_at") or "")[:10], m.get("license") or "",
            fmt_bytes(r.get("bytes", 0)), r.get("dump_path") or ""))
    got = {r["repo"] for r in (res.get("repos") or [])}
    for c in res.get("candidates") or []:
        if c["repo"] not in got:
            L.append("| %s | %s | %s | — | — | — | — | — | — | — | — | — | — | — | — | — | — | — | не собран |" % (
                c["repo"], c["role"], cell(c.get("source"))))
    L.append("")
    if res.get("legacy"):
        L += ["## 1b. Уже собрано ранее — НЕ перекачивать", ""]
        L += ["- `%s` → `puzzles/%s/%s`" % (repo, slug, path) for repo, path in res["legacy"].items()]
        L.append("")
    L.append("## 2. Индекс issues (по updated desc)")
    L.append("")
    any_idx = False
    for r in res.get("repos") or []:
        idx = r.get("issue_index") or []
        if not idx:
            continue
        any_idx = True
        L += ["### %s (%d записей)" % (r["repo"], len(idx)), "",
              "| № | сост. | создан | обновлён | автор | заголовок | начало тела | комм. | raw |",
              "|---|---|---|---|---|---|---|---|---|"]
        for i in idx:
            L.append("| %s | %s | %s | %s | %s | %s | %s | %s | `raw/issues_p1.json` |" % (
                i["n"], i["state"], i["created"], i["updated"], i["author"], cell(i["title"], ),
                cell(i["lead"]), i["comments"]))
        L.append("")
    if not any_idx:
        L.append("- индекс не строился (нет собранной выдачи по квоте либо репозитории легаси-дампы)")
        L.append("")
    L += ["", "## 3. Цитаты с проверяемыми константами (адреса/hex/формулы)", ""]
    any_q = False
    for r in res.get("repos") or []:
        for q in (r.get("quotes") or []):
            any_q = True
            L.append("- **%s #%s** (%s, %s; issue «%s»): %s" % (
                r["repo"], q["issue"], q["author"], q["date"], q["it_title"], q["quote"]))
    if not any_q:
        L.append("- нет (или не собрано по бюджету)")
    L.append("")
    L += ["## 4. Новое против нашего досье (требует проверки; НЕ подтверждение)", ""]
    new = res.get("new_items") or {}
    if not any(new.get(k) for k in new):
        L.append("- в текстах дампов ничего, чего нет в README/LOG пазла, не обнаружено")
    for kind in ("btc", "eth", "hex64", "wif", "url"):
        vals = sorted(new.get(kind) or [])
        if vals:
            L.append("- **%s** (%d, показаны 30): %s" % (kind.upper(), len(vals),
                                                        ", ".join("`%s`" % v[:64] for v in vals[:30])))
    if res.get("new_note"):
        L.append("- примечание: %s" % res["new_note"])
    L.append("")
    L += ["## 5. Медиа репозиториев", ""]
    any_m = False
    for r in res.get("repos") or []:
        rows = r.get("media") or []
        if not rows:
            continue
        any_m = True
        L.append("### %s" % r["repo"])
        for m in rows[:60]:
            L.append("- `%s` — %s, sha256 %s…, https://github.com/%s/blob/HEAD/%s" % (
                m["path"], fmt_bytes(m["size"]), m["sha256"], r["repo"], m["path"]))
        L.append("")
    if not any_m:
        L.append("- медиа не распаковано (--no-extract, легаси-дампы или лимит --max-mb)")
        L.append("")
    L += ["## 6. Внешние не-GitHub ссылки (топ 40)", ""]
    if res.get("ext_links"):
        L += ["- %s (%d)" % (u, n) for u, n in res["ext_links"][:40]]
    else:
        L.append("- нет (в распакованном содержимом не найдено)")
    L.append("")
    L += ["## 7. Release-ассеты / gists / wiki", ""]
    any7 = False
    for r in res.get("repos") or []:
        for a in (r.get("release_assets") or [])[:20]:
            any7 = True
            L.append("- ассет %s: %s (%s) %s" % (r["repo"], a["name"], fmt_bytes(a["size"]), a["url"]))
        for g in (r.get("gists") or [])[:10]:
            any7 = True
            L.append("- gist %s: %s | файлы: %s | %s" % (g["id"], g["desc"], ", ".join(g["files"] or []), g["url"]))
        if r.get("wiki"):
            any7 = True
            L.append("- wiki %s: %s" % (r["repo"], r["wiki"]))
    if not any7:
        L.append("- пусто по этим каналам")
    L.append("")
    L += ["## 8. Негативы и пропуски (обязательный раздел)", ""]
    errs = list(res.get("errors") or [])
    if res.get("status") == "none":
        errs.insert(0, "НЕГАТИВ ШЛЮЗА: репозиториев по цели не найдено — %s" % (res.get("note") or "см. шапку"))
    L += ["- %s" % e for e in errs] if errs else ["- задокументированных негативов нет"]
    L.append("")
    L += ["## 9. Как освежить / продолжить", "",
          "- `python tools/github_intake.py run %s --agent <имя>` — повтор стоит 0 запросов (ETag/304)" % slug,
          "- `python tools/github_intake.py status %s` · `plan %s --no-net`" % (slug, slug),
          "- содержимое репо: `data/github/<owner>__<repo>/files/`, сырой JSON: `…/raw/`, медиа-индекс: `…/media_index.md`",
          "- легаси-дампы этого пазла: `_legacy_pointers.md`", ""]
    return "\n".join(L)


# ---------- запись шлюза ----------

def neg_text(res) -> str:
    """Строка негативов для LOG: оформленный «none» тоже считается результатом."""
    parts = []
    if res.get("status") == "none" and res.get("note"):
        parts.append("НЕГАТИВ: репозиториев по цели не найдено — %s" % res["note"])
    parts += list(res.get("errors") or [])
    return ("; ".join(parts)[:700] or "нет").strip("; ")


def log_block(slug, agent, res) -> str:
    repos = res.get("repos") or []
    cand = res.get("candidates") or []
    total = lambda k: sum((r.get("counts") or {}).get(k, 0) for r in repos)  # noqa: E731
    lines = [
        "## %s, %s — %s (github_intake) — GITHUB INTAKE (шлюз)" % (today(), datetime.now().strftime("%H:%M"), agent),
        "- Делал: python tools/github_intake.py run %s --agent %s" % (slug, agent),
        "- Кандидаты: %s" % (", ".join("%s (%s, %s)" % (c["repo"], c["role"], c["source"]) for c in cand)[:700]
                             or "не найдены (в досье нет github.com-ссылок и записи OCP)"),
        "- Скачано: репо=%d (файлов %d, %s; медиа %d), issues=%d, comments=%d, PR=%d, releases=%d, gists=%d, wiki=%s" % (
            len(repos), res.get("files", 0), fmt_bytes(res.get("bytes", 0)), res.get("media", 0),
            total("issues"), total("comments"), total("pulls"), total("releases"), total("gists"),
            "да" if any(r.get("wiki") for r in repos) else "нет"),
        "- Бюджет: api.github.com запросов = %d (remaining %s, reset %s); бесплатных транспортов (codeload/ls-remote/git) = %d" % (
            res["api_calls"], res.get("remaining_seen"), res.get("reset_utc"), res.get("free_transports", 0)),
        "- Негативы: %s" % neg_text(res),
        "- Артефакты: data/github/GITHUB_INTAKE.md, data/github/INTAKE_RESULT.json, data/github/_legacy_pointers.md, "
        "data/github/<owner>__<repo>/{files,raw,REPO_META.json}",
        "- Статус шлюза: %s" % {
            "done": "done%s" % ((" — %s" % res["note"]) if res.get("note") else ""),
            "none": "none (репо не найдено, проверено по %d запросам к api.github.com и %d бесплатным проверкам ls-remote/OCP)" % (
                res["api_calls"], res.get("free_transports", 0)),
            "partial": "partial (%s); остаток в data/github/resume.json" % res.get("stop_reason", "бюджет/дедлайн"),
        }[res["status"]],
        "- Ссылки/доказательства: %s" % (", ".join((r.get("meta") or {}).get("html_url") or r["repo"]
                                                  for r in repos[:6]) or "нет репозиториев"),
        "",
    ]
    return "\n".join(lines) + "\n"


def readme_marker(agent, res) -> str:
    """Строка-маркер в README пазла. Дата входит в сами слова маркера, поэтому
    повторный прогон может отличить «за сегодня и с тем же статусом — не дублируем»."""
    if res["status"] == "none":
        desc = "**none** (%s) — репо не найдено, проверено по %d запросам (%d бесплатных проверок ls-remote/OCP)" % (
            today(), res["api_calls"], res.get("free_transports", 0))
    elif res["status"] == "partial":
        desc = "**partial** (%s) — %s; остаток в `data/github/resume.json`" % (
            today(), res.get("stop_reason") or "бюджет/дедлайн прогона")
    else:
        desc = "**done** %s — %d репо, %d API-запросов, %d бесплатных транспортов%s" % (
            today(), len(res.get("repos") or []), res["api_calls"], res.get("free_transports", 0),
            (" — %s" % res["note"]) if res.get("note") else "")
    return "%s%s репо: %d; путь дайдеста: `data/github/GITHUB_INTAKE.md`\n" % (
        MARKER_PREFIX, desc, len(res.get("repos") or []))


def update_status_registry():
    data = read_json(STATUS_JSON, {"rows": {}})
    rows = sorted(data.get("rows", {}).values(), key=lambda r: (r.get("date", ""), r.get("slug", "")))
    md = ["# Реестр GitHub-интейков (шлюз)", "",
          "Правило — `AGENT_INSTRUCTIONS.md`, раздел «GitHub-интейк — обязательный первый шлюз (с 18.10.2026)».",
          "Статусы: `done` | `partial` (бюджет/дедлайн, остаток в `data/github/resume.json`) |",
          "`none` (репо не найдено, проверено по N запросам — шлюз закрыт корректно) |",
          "`legacy` (дампы лежат в старых путях пазла) | `pending` (шлюз ещё не пройден).",
          "Машиночитаемая версия — `_sources/GITHUB_INTAKE_STATUS.json`. Пересборка по диску:",
          "`python tools/github_intake.py status --refresh` (сеть не тратит).", "",
          "| Дата | Агент | slug | Статус | Репо | API-запросов | HEAD | Дайдест |",
          "|---|---|---|---|---|---|---|---|"]
    for r in rows:
        md.append("| %s | %s | %s | %s | %s%s | %s | %s | %s |" % (
            r.get("date", ""), r.get("agent", ""), r.get("slug", ""), r.get("status", ""),
            r.get("repos", ""), (" (%s)" % r["repo_list"]) if r.get("repo_list") not in (None, "", "-") else "",
            r.get("api_calls", ""), r.get("head", ""), r.get("digest", "")))
    md.append("")
    atomic_write_text(STATUS_MD, "\n".join(md))
    return len(rows)


def record_gate(slug: str, agent: str, res, write_files=True):
    base = os.path.join(PUZZLES, slug)
    gh = os.path.join(base, "data", "github")
    if write_files:
        os.makedirs(gh, exist_ok=True)
        atomic_write_text(os.path.join(gh, "GITHUB_INTAKE.md"), digest_md(slug, agent, res))
        legacy_lines = ["# Легаси-дампы этого пазла: что уже лежит (не перекачивать)", ""]
        if res.get("legacy"):
            legacy_lines += ["- `%s` → `puzzles/%s/%s`" % (repo, slug, path)
                             for repo, path in res["legacy"].items()]
        else:
            legacy_lines.append("- нет")
        legacy_lines += ["", "Также существующие внешние дампы пазла (не трогаем):",
                         "- `data/external/github/`, `data/external2/github2/`, `data/community/` — исторические пути", ""]
        atomic_write_text(os.path.join(gh, "_legacy_pointers.md"), "\n".join(legacy_lines))
        atomic_write_text(os.path.join(gh, "INTAKE_RESULT.json"), json.dumps({
            "slug": slug, "agent": agent, "ts": iso(utcnow()), "date": today(),
            "status": res["status"], "note": res.get("note", ""),
            "api_calls": res["api_calls"], "free_transports": res.get("free_transports", 0),
            "remaining_seen": res.get("remaining_seen"), "reset_utc": res.get("reset_utc"),
            "files": res.get("files"), "bytes": res.get("bytes"), "media": res.get("media"),
            "repos": [{"repo": r["repo"], "role": r["role"], "branch": r.get("branch"),
                       "head_sha": r.get("head_sha"), "counts": r.get("counts"),
                       "files": r.get("files"), "bytes": r.get("bytes")} for r in res.get("repos") or []],
            "candidates": res.get("candidates"), "errors": res.get("errors"),
            "stop_reason": res.get("stop_reason"), "ocp": res.get("ocp"),
            "digest": "data/github/GITHUB_INTAKE.md"}, ensure_ascii=False, indent=2) + "\n")
        atomic_append(os.path.join(base, "LOG.md"), "\n" + log_block(slug, agent, res))
        marker = readme_marker(agent, res)
        # маркер статуса — одна актуальная строка на день/статус: повторный прогон не плодит дублей
        try:
            with open(os.path.join(base, "README.md"), "r", encoding="utf-8", errors="replace") as f:
                already = any(ln.startswith(MARKER_PREFIX) and today() in ln and ("**%s**" % res["status"]) in ln
                              for ln in f)
        except OSError:
            already = False
        if already:
            res["readme_marker"] = "уже зафиксирован (%s, %s) — не дублируем" % (today(), res["status"])
        else:
            atomic_append(os.path.join(base, "README.md"),
                          "\n## Обновление GitHub-интейка (%s, %s)\n%s" % (today(), agent, marker))
            res["readme_marker"] = "добавлен"
    # реестр (общий файл: перечитать с диска → дописать строку → temp+rename)
    row = {"slug": slug, "status": res["status"], "date": today(), "ts": iso(utcnow()), "agent": agent,
           "repos": len(res.get("repos") or []),
           "repo_list": ", ".join(r["repo"] for r in (res.get("repos") or [])[:4]) or "-",
           "api_calls": res["api_calls"],
           "head": ((res.get("repos") or [{}])[0].get("head_sha") or "")[:8],
           "digest": "puzzles/%s/data/github/GITHUB_INTAKE.md" % slug}

    def mutate(d):
        d.setdefault("rows", {})
        d["rows"][slug] = row
        d["updated_utc"] = iso(utcnow())
        return d
    locked_json(STATUS_JSON, mutate)
    update_status_registry()


# ---------- статус ----------

def scan_evidence(slug: str, check_head: bool = False):
    base = os.path.join(PUZZLES, slug)
    gh = os.path.join(base, "data", "github")
    res = read_json(os.path.join(gh, "INTAKE_RESULT.json"), None)
    if res:
        stale = False
        try:
            stale = utcnow() - parse_iso(res.get("ts", iso(utcnow()))) > timedelta(days=GATE_VALID_DAYS)
        except Exception:  # noqa: BLE001
            stale = False
        status = "stale" if stale else res.get("status", "done")
        if check_head and not stale and res.get("repos"):
            for r in res["repos"]:
                p = free_probe(r["repo"]) if r["repo"] else None
                if p and p[1] and p[1] != r.get("head_sha"):
                    status = "stale"
                    break
        return {"status": status, "date": (res.get("ts") or "")[:10], "agent": res.get("agent", ""),
                "repos": len(res.get("repos") or []), "api_calls": res.get("api_calls", 0),
                "digest": "data/github/GITHUB_INTAKE.md"}
    readme = os.path.join(base, "README.md")
    if os.path.exists(readme):
        with open(readme, "r", encoding="utf-8", errors="replace") as f:
            txt = f.read()
        ms = re.findall(r"- GitHub-интейк: \*\*(\w+)\*\*[^\n]{0,160}", txt)
        if ms:
            last = ms[-1].lower()
            st = {"done": "done", "none": "none", "partial": "partial"}.get(last, last)
            return {"status": st, "date": "", "agent": "маркер README", "repos": 0,
                    "api_calls": 0, "digest": "по маркеру в README пазла"}
    for repo, path in (LEGACY_LOCATIONS.get(slug) or {}).items():
        if os.path.exists(os.path.join(base, path)):
            return {"status": "legacy", "date": "", "agent": "", "repos": 1, "api_calls": 0,
                    "digest": "существующий дамп `%s` (%s)" % (path, repo)}
    if os.path.isdir(gh) and os.listdir(gh):
        return {"status": "partial", "date": "", "agent": "", "repos": 0, "api_calls": 0,
                "digest": "data/github/ без INTAKE_RESULT.json"}
    return {"status": "pending", "date": "", "agent": "", "repos": 0, "api_calls": 0, "digest": ""}


def active_slugs():
    out = []
    if not os.path.isdir(PUZZLES):
        return out
    for name in sorted(os.listdir(PUZZLES)):
        p = os.path.join(PUZZLES, name)
        if not os.path.isdir(p) or name == "dead-ends-registry":
            continue
        if os.path.exists(os.path.join(p, "README.md")):
            out.append(name)
    return out


def estimate(slug: str, text: str):
    links = repos_from_text(text)
    kept, dropped = prune_links(links, slug)
    repos = [r for r, _ in kept]
    low = {r.lower() for r in repos}
    # кандидаты от соагентов (дампы/отчёты) — иначе очередь ранжируется не по тому списку,
    # который plan и run покажут агенту
    for repo, _src in cross_agent_repos(slug):
        if repo.lower() not in low:
            low.add(repo.lower())
            repos.append(repo)
    ocp = ocp_entry(slug)
    return {"slug": slug, "github_links": len(links), "pruned": len(dropped),
            "repos": repos[:6], "ocp": bool(ocp),
            "api_estimate": 7 * min(len(repos) or 1, 4)}


def check_claim(slug: str, agent: str, take_claim: bool, note: str):
    """Интейк пишет в файлы, зарезервированные держателем брони (AGENT_INSTRUCTIONS, «Параллельная работа»)."""
    path = os.path.join(CLAIMS_DIR, slug + ".json")
    c = read_json(path, None)
    if c:
        try:
            expired = utcnow() >= parse_iso(c["expires_utc"])
        except Exception:  # noqa: BLE001
            expired = True
        holder = c.get("agent", "?")
        same = norm_name(holder) == norm_name(agent)
        if not expired and not same:
            return False, "ЗАНЯТ: %s держит %s до %s — файлы пазла пишет держатель брони. Возьми другой пазл." % (
                holder, slug, c.get("expires_utc"))
        if expired and not same:
            return True, "бронь %s просрочена (%s) — интейк = первая работа нового держателя; зафиксируй в LOG.md" % (
                holder, c.get("expires_utc"))
        return True, "бронь твоя (%s)" % holder
    if not take_claim:
        return False, ("Брони нет. По протоколу: python tools/claims.py acquire %s --agent %s --note \"github-intake\""
                       " (или запусти с --take-claim)." % (slug, agent))
    r = subprocess.run([sys.executable, os.path.join(ROOT, "tools", "claims.py"), "acquire", slug,
                        "--agent", agent, "--ttl", "120", "--note", note or "github-intake"],
                       capture_output=True, text=True, encoding="utf-8", errors="replace")
    if r.returncode != 0:
        return False, "claims.py acquire не прошёл: %s" % ((r.stdout or "") + (r.stderr or ""))[:220]
    return True, "бронь взята автоматически (--take-claim)"


# ---------- команды ----------

def cmd_plan(args) -> int:
    if not os.path.isdir(os.path.join(PUZZLES, args.slug)):
        print("Нет папки пазла: puzzles/%s" % args.slug, file=sys.stderr)
        return 1
    notes = []
    cand, ocp, text = discover(args.slug, manual=args.repo, exclude=args.exclude, log=notes)
    ev = scan_evidence(args.slug)
    est = estimate(args.slug, text)
    for c in cand:
        c["default_branch"] = c["head_sha"] = ""
        if not args.no_net:
            p = free_probe(c["repo"])
            if p:
                c["default_branch"], c["head_sha"] = p
                c["note"] = ""
            else:
                c["note"] = "ls-remote не отвечает (404/приватный)"
        if c["repo"].lower() in {k.lower() for k in (LEGACY_LOCATIONS.get(args.slug) or {})}:
            c["legacy"] = LEGACY_LOCATIONS[args.slug][next(k for k in LEGACY_LOCATIONS[args.slug]
                                                            if k.lower() == c["repo"].lower())]
    if args.json:
        print(json.dumps({"slug": args.slug, "gate": ev, "ocp": ocp, "estimate": est,
                          "notes": notes, "candidates": cand}, ensure_ascii=False, indent=2))
        return 0
    print("=== план GitHub-интейка: %s ===" % args.slug)
    print("Статус шлюза сейчас: %s%s" % (ev["status"].upper(), (" — %s" % ev["digest"]) if ev["digest"] else ""))
    print("OCP (офлайн, 0 запросов): %s" % (json.dumps(ocp, ensure_ascii=False) if ocp else "нет записи"))
    print("Кандидатов: %d (легаси не перекачиваем)" % len(cand))
    for c in cand:
        print("- %-46s роль=%-10s hits=%-4s branch=%-8s HEAD=%-8s %s%s" % (
            c["repo"], c["role"], c.get("hits", ""), c.get("default_branch", ""),
            (c.get("head_sha") or "")[:8], c.get("note", ""),
            (" legacy=" + c["legacy"]) if c.get("legacy") else ""))
    for n_ in notes:
        print("! %s" % n_)
    n = min(len(cand), args.max_repos) or 1
    print("\nОценка: ~%d запросов к api.github.com (meta+issues+comments×%d репо) + бесплатные распаковки" % (7 * n, n))
    print("Потолки прогона: %d мин, бюджет %d запросов (общий часовой IP-бюджет — смотри `ledger`)." % (
        args.minutes, args.api_budget))
    print("Старт: python tools/github_intake.py run %s --agent <Имя> --take-claim" % args.slug)
    return 0


def cmd_run(args) -> int:
    slug = args.slug
    base = os.path.join(PUZZLES, slug)
    if not os.path.isdir(base):
        print("Нет папки пазла: puzzles/%s — сначала заведи папку (README + LOG) по новому пазлу." % slug,
              file=sys.stderr)
        return 1
    ok, why = (True, "dry-run: файлы не пишутся, бронь не проверяется") if args.dry \
        else check_claim(slug, args.agent, args.take_claim, args.note)
    if not ok:
        print(why, file=sys.stderr)
        return 1
    print("Бронь: %s" % why)

    gh = os.path.join(base, "data", "github")
    quota = Quota(args.api_budget, args.agent)
    errors = []
    deadline = time.monotonic() + args.minutes * 60
    res = {"status": "done", "repos": [], "candidates": [], "errors": errors, "legacy": {},
           "api_calls": 0, "free_transports": 0, "files": 0, "bytes": 0, "media": 0, "ocp": None,
           "note": "", "new_items": {}, "ext_links": [], "stop_reason": ""}

    cand, ocp, text = discover(slug, manual=args.repo, exclude=args.exclude, search_k=args.search,
                              quota=quota, log=errors)
    res["candidates"] = cand
    res["ocp"] = ocp
    legacy = {}
    for repo, path in (LEGACY_LOCATIONS.get(slug) or {}).items():
        if os.path.exists(os.path.join(base, path)):
            legacy[repo] = path
    res["legacy"] = legacy
    for c in cand:
        for repo, path in legacy.items():
            if c["repo"].lower() == repo.lower():
                c["legacy"] = path

    if args.dry:
        print("=== DRY RUN %s: ничего не пишется ===" % slug)
        for c in cand:
            p = None
            if not args.no_net:
                p = free_probe(c["repo"])
                quota.free += 1
            print("- %-46s роль=%-10s %s branch=%s HEAD=%s" % (
                c["repo"], c["role"], ("legacy=%s" % c["legacy"]) if c.get("legacy") else "",
                (p or ("—", ""))[0], ((p or ("", ""))[1] or "")[:8]))
        print("OCP: %s" % (json.dumps(ocp, ensure_ascii=False) if ocp else "нет"))
        print("Легаси (не перекачивать): %s" % (json.dumps(legacy, ensure_ascii=False) or "нет"))
        print("Бюджет: %d запросов (потолок %d), бесплатных транспортов: %d уже сделано" % (
            quota.spent, args.api_budget, quota.free))
        print("Статус шлюза: %s" % scan_evidence(slug)["status"])
        return 0

    if not cand:
        res["status"] = "none"
        res["api_calls"] = quota.spent
        res["free_transports"] = quota.free
        res["remaining_seen"] = quota.remaining_seen
        res["reset_utc"] = quota.reset_utc
        res["note"] = ("репозиториев нет: в досье прочитано %s знаков, github.com-ссылок 0, "
                       "запись OCP: %s; репо автора/форки/поиск: %s" % (
                           fmt_bytes(len(text)),
                           ("нет записи" if not ocp else ocp.get("repo", "?")),
                           "бюджет 0 запросов — не запрашивались" if not args.api_budget
                           else "запрошены, кандидатов не дали"))
        record_gate(slug, args.agent, res)
        print("ШЛЮЗ none: репозиториев по цели не найдено. Проверено: досье (%s знаков, 0 github-ссылок), "
              "OCP-запись офлайн, api.github.com — %d запросов, бесплатных проверок — %d." % (
                  fmt_bytes(len(text)), quota.spent, quota.free))
        print("Записано: puzzles/%s/data/github/GITHUB_INTAKE.md, LOG.md, реестр; маркер README: %s"
              % (slug, res.get("readme_marker", "—")))
        return 2

    todo = cand[: args.max_repos]
    if len(cand) > args.max_repos:
        errors.append("не собрано (сверх --max-repos %d): %s" % (
            args.max_repos, ", ".join(c["repo"] for c in cand[args.max_repos:])))
    resume_path = os.path.join(gh, "resume.json")
    prev = read_json(resume_path, None)
    if prev and args.resume:
        left = [c for c in cand if c["repo"] in set(prev.get("left", [])) and c not in todo]
        if left:
            todo += left
            print("resume.json (--resume): добавлено %d репо из прошлого прогона" % len(left))
        try:
            os.remove(resume_path)
        except OSError:
            pass
    elif prev and not args.force:
        print("resume.json лежит (%d репо в остатке) — продолжить прогоном с --resume" % len(prev.get("left") or []))

    for c in todo:
        if time.monotonic() > deadline - 30:
            res["stop_reason"] = "дедлайн %d мин" % args.minutes
            break
        if quota.stop_reason():
            # бюджет исчерпан, но бесплатные шаги (легаси-ссылки, общий кэш, снапшоты) делать можно:
            res["stop_reason"] = quota.stop_reason()
        repo = c["repo"]
        dump = os.path.join(gh, repo.replace("/", "__"))
        rel_dump = os.path.relpath(dump, base).replace("\\", "/")
        files_dir = os.path.join(dump, "files")
        raw_dir = os.path.join(dump, "raw")
        entry = {"repo": repo, "role": c["role"], "source": c["source"], "counts": {}, "meta": {},
                 "files": 0, "bytes": 0, "dump_path": rel_dump, "branch": "", "head_sha": "",
                 "api_calls": 0, "skipped": ""}
        probe = free_probe(repo)
        quota.free += 1
        if not probe:
            entry["skipped"] = "ls-remote не отвечает (404/приватный/удалён)"
            errors.append("%s: %s" % (repo, entry["skipped"]))
            res["repos"].append(entry)
            continue
        branch, sha = probe
        entry["branch"], entry["head_sha"] = branch, sha
        existing = read_json(os.path.join(dump, "REPO_META.json"), {})
        shared = (OCP_CLONE if repo.lower() == "floflo777/open-crypto-puzzles"
                  and os.path.isdir(OCP_CLONE) else None)
        if shared:
            entry["skipped"] = "общий кэш %s (git pull, 0 запросов и 0 дублей)" % os.path.relpath(shared, ROOT).replace("\\", "/")
            entry["dump_path"] = os.path.relpath(shared, base).replace("\\", "/")
            print("- %s: используется общий кэш %s" % (repo, entry["dump_path"]))
            res["repos"].append(entry)
            continue
        elif c.get("legacy"):
            entry["skipped"] = "легаси-дамп %s (0 запросов)" % c["legacy"]
            print("- %s: используется существующий дамп %s" % (repo, c["legacy"]))
        elif os.path.isdir(files_dir) and os.listdir(files_dir) and existing.get("head_sha") == sha and not args.force:
            entry["files"] = existing.get("files", 0)
            entry["bytes"] = existing.get("bytes", 0)
            entry["skipped"] = "snapshot уже лежит, HEAD %s не изменился" % sha[:8]
            print("- %s: snapshot пропущен (HEAD без изменений)" % repo)
        elif args.no_extract:
            entry["skipped"] = "--no-extract: содержимое не распаковано"
        else:
            print("- %s: качаю содержимое (%s @ %s)" % (repo, branch, (sha or "")[:8]))
            n, b, method = download_snapshot(repo, branch, sha, files_dir, args.max_mb, errors)
            entry["files"], entry["bytes"], entry["method"] = n, b, method
            quota.free += 1
            atomic_write_text(os.path.join(dump, "REPO_META.json"), json.dumps(
                {"repo": repo, "html_url": "https://github.com/%s" % repo, "branch": branch,
                 "head_sha": sha, "files": n, "bytes": b, "method": method, "ts": iso(utcnow())},
                ensure_ascii=False, indent=2) + "\n")
        kinds = ["meta", "issues", "comments"]
        if args.full:
            kinds += ["pulls", "releases", "commits", "gists"]
        elif quota.can(3):
            kinds.append("releases")
        h = harvest_repo(quota, repo, raw_dir, kinds)
        entry["meta"] = h["meta"]
        entry["counts"] = h["counts"]
        entry["api_calls"] = h["api_calls"]
        entry["issue_index"] = build_issue_index(h["items"].get("issues"))
        entry["quotes"] = const_quotes(h["items"].get("issues"), h["items"].get("comments"))
        entry["release_assets"] = h.get("release_assets")
        entry["gists"] = h.get("gists")
        for e in h["errors"]:
            errors.append("%s: %s" % (repo, e))
        if os.path.isdir(files_dir):
            entry["media"] = media_index(files_dir)
            if entry["media"]:
                mL = ["# Медиа репозитория %s (распаковано в files/)" % repo, "",
                      "| путь | размер | sha256 | ссылка |", "|---|---|---|---|"]
                for m in entry["media"]:
                    mL.append("| `%s` | %s | %s | https://github.com/%s/blob/HEAD/%s |" % (
                        m["path"], fmt_bytes(m["size"]), m["sha256"], repo, m["path"]))
                mL.append("")
                atomic_write_text(os.path.join(dump, "media_index.md"), "\n".join(mL))
        wiki = None if args.no_wiki else free_probe(repo + ".wiki")
        if wiki:
            wd = os.path.join(dump, "wiki")
            wn, wb, wm = download_snapshot(repo + ".wiki", wiki[0], wiki[1], wd, args.max_mb, errors)
            entry["wiki"] = "%s (файлов %d)" % (wm, wn)
            quota.free += 1
        res["repos"].append(entry)
        print("  issues=%s comments=%s PR=%s releases=%s API=%d файлов=%s" % (
            entry["counts"].get("issues", 0), entry["counts"].get("comments", 0),
            entry["counts"].get("pulls", 0), entry["counts"].get("releases", 0),
            entry["api_calls"], entry["files"]))

    # сводка по дампу: новое против досье + внешние ссылки
    new_acc = {"btc": set(), "eth": set(), "hex64": set(), "wif": set(), "url": set()}
    links = {}
    for r in res["repos"]:
        fd = os.path.join(base, r["dump_path"], "files")
        rd = os.path.join(base, r["dump_path"], "raw")
        for d in (fd, rd):
            if os.path.isdir(d):
                found, lk, note = scan_dump(d, text)
                for k in new_acc:
                    new_acc[k] |= found.get(k, set())
                for u, n in lk.items():
                    links[u] = links.get(u, 0) + n
                if note:
                    res["new_note"] = note
    res["new_items"] = {k: sorted(v)[:120] for k, v in new_acc.items()}
    res["ext_links"] = sorted(links.items(), key=lambda kv: -kv[1])[:80]
    res["api_calls"] = quota.spent
    res["free_transports"] = quota.free
    res["remaining_seen"] = quota.remaining_seen
    res["reset_utc"] = quota.reset_utc
    res["files"] = sum(r.get("files", 0) for r in res["repos"])
    res["bytes"] = sum(r.get("bytes", 0) for r in res["repos"])
    res["media"] = sum(len(r.get("media") or []) for r in res["repos"])

    skipped = [r["skipped"] for r in res["repos"] if r.get("skipped")]
    harvested = sum(1 for r in res["repos"] if (r.get("counts") or {}).get("issues"))
    if res["stop_reason"] or (len(res["repos"]) < len(cand) and not res["stop_reason"]):
        res["status"] = "partial"
        if not res["stop_reason"]:
            res["stop_reason"] = "срезано потолками: собрано %d кандидатов из %d (--max-repos/--max-mb)" % (
                len(res["repos"]), len(cand))
    elif skipped and not harvested:
        res["status"] = "done"
        res["note"] = "содержимое уже в базе (%s); API-сбор не требовался" % "; ".join(skipped)
    elif skipped:
        res["note"] = "часть уже в базе: %s" % "; ".join(skipped)
    if res["status"] == "partial":
        atomic_write_text(resume_path, json.dumps({
            "done": [r["repo"] for r in res["repos"]],
            "left": [c["repo"] for c in cand if c["repo"] not in [r["repo"] for r in res["repos"]]],
            "ts": iso(utcnow()), "reason": res["stop_reason"] or "не все кандидаты собраны"},
            ensure_ascii=False, indent=2) + "\n")
    record_gate(slug, args.agent, res)
    print("\n=== ШЛЮЗ %s: %s ===" % (slug, res["status"].upper()))
    print("репо %d, файлов %d (%s), issues %d, comments %d, API %d (remaining %s), бесплатно %d" % (
        len(res["repos"]), res["files"], fmt_bytes(res["bytes"]),
        sum((r.get("counts") or {}).get("issues", 0) for r in res["repos"]),
        sum((r.get("counts") or {}).get("comments", 0) for r in res["repos"]),
        res["api_calls"], res["remaining_seen"], res["free_transports"]))
    if res.get("note"):
        print("Примечание: %s" % res["note"])
    print("Дайдест: puzzles/%s/data/github/GITHUB_INTAKE.md · LOG.md дополнен · реестр обновлён · маркер README: %s"
          % (slug, res.get("readme_marker", "—")))
    print("PROPOSALS-метка для строки этого пазла: GH:%s(%d репо, %d req)" % (
        res["status"], len(res["repos"]), res["api_calls"]))
    return 3 if res["status"] == "partial" else 0


def cmd_status(args) -> int:
    if args.slug:
        ev = scan_evidence(args.slug, check_head=args.check_head)
        if args.json:
            print(json.dumps({"slug": args.slug, **ev}, ensure_ascii=False, indent=2))
        else:
            print("%s: %s" % (args.slug, ev["status"].upper()))
            for k in ("date", "agent", "repos", "api_calls", "digest"):
                if ev.get(k):
                    print("  %s: %s" % (k, ev[k]))
            if ev["status"] == "pending":
                print("  ШЛЮЗ НЕ ПРОЙДЕН: сначала python tools/github_intake.py run %s --agent <Имя> --take-claim"
                      % args.slug)
        return 0
    rows = [(s, scan_evidence(s, check_head=args.check_head)) for s in active_slugs()]
    cnt = {}
    for _s, ev in rows:
        cnt[ev["status"]] = cnt.get(ev["status"], 0) + 1
    if args.refresh:
        def mutate(d):
            d.setdefault("rows", {})
            for s, ev in rows:
                if ev["status"] == "pending" and s in d["rows"]:
                    continue
                if ev["status"] == "pending":
                    continue
                d["rows"][s] = {"slug": s, "status": ev["status"], "date": ev.get("date") or today(),
                                "ts": iso(utcnow()), "agent": ev.get("agent") or "скан диска",
                                "repos": ev.get("repos", 0), "repo_list": "",
                                "api_calls": ev.get("api_calls", 0), "head": "",
                                "digest": ev.get("digest", "")}
            d["updated_utc"] = iso(utcnow())
            return d
        locked_json(STATUS_JSON, mutate)
        print("Реестр пересобран по диску: %d строк в _sources/GITHUB_INTAKE_STATUS.md" % update_status_registry())
    print("Активных папок: %d. Статусы шлюза: %s" % (len(rows), ", ".join("%s=%d" % kv for kv in sorted(cnt.items()))))
    if args.json:
        print(json.dumps({s: e for s, e in rows}, ensure_ascii=False, indent=2))
    else:
        for s, ev in rows:
            if ev["status"] != "pending":
                print("- %-52s %-8s %-10s %s" % (s, ev["status"], ev.get("date", ""), ev.get("digest", "")))
        pend = [s for s, ev in rows if ev["status"] == "pending"]
        print("- без шлюза (pending): %d — очередь: `backlog`" % len(pend))
    return 0


def cmd_backlog(args) -> int:
    rows = []
    for slug in active_slugs():
        ev = scan_evidence(slug)
        est = estimate(slug, dossier_text(slug))
        rows.append({**est, "status": ev["status"], "date": ev.get("date", "")})
    todo = [r for r in rows if r["status"] in ("pending", "partial", "stale", "legacy")]
    todo.sort(key=lambda r: (-r["github_links"], r["slug"]))
    if args.json:
        print(json.dumps({"counts": {k: sum(1 for r in rows if r["status"] == k) for k in
                                     ("pending", "done", "partial", "none", "legacy", "stale")},
                          "todo": todo[: args.n]}, ensure_ascii=False, indent=2))
    else:
        print("Целей, требующих шлюза (pending/partial/stale/legacy): %d из %d (показаны первые %d)"
              % (len(todo), len(rows), args.n))
        for r in todo[: args.n]:
            print("- %-52s %-8s github-ссылок=%-3d OCP=%-3s ~%-4d API  %s" % (
                r["slug"], r["status"], r["github_links"], "да" if r["ocp"] else "нет",
                r["api_estimate"], ", ".join(r["repos"][:2])))
        print("\nПорядок: ОДНА цель за проход (часовой бюджет IP общий на всех агентов)."
              "\nУ целей без ссылок шлюз закрывается бесплатно: run даст статус none.")
    if args.refresh:
        L = ["# Очередь GitHub-интейков (backlog)", "",
             "Сформировано `%s` (%s). Режим «вся база»: одна цель за проход.",
             "`solved/` и `dead-ends-registry/` исключены. ~API — запросы к api.github.com;",
             "содержимое реп качается бесплатно (codeload / git clone --depth 1 / ls-remote).", "",
             "| slug | статус | github-ссылок | OCP | ~API | репо-кандидаты |", "|---|---|---|---|---|---|"]
        L[2] = L[2] % ("tools/github_intake.py backlog --refresh", iso(utcnow()))
        for r in todo:
            L.append("| %s | %s | %d | %s | %d | %s |" % (r["slug"], r["status"], r["github_links"],
                                                          "да" if r["ocp"] else "нет", r["api_estimate"],
                                                          cell(", ".join(r["repos"][:3]))))
        L.append("")
        atomic_write_text(BACKLOG_MD, "\n".join(L))
        print("Записано: _sources/github/INTAKE_BACKLOG.md (%d строк)" % len(todo))
    return 0


def cmd_cache(args) -> int:
    o_r = (args.repo or "floflo777/open-crypto-puzzles").lower()
    name = o_r.split("/")[-1]
    dest = os.path.join(GH_CACHE, name)
    if o_r == "floflo777/open-crypto-puzzles" and os.path.isdir(os.path.join(OCP_CLONE, ".git")):
        _rc, out, err = run_git(["-C", OCP_CLONE, "pull", "--ff-only"], timeout=300)
        _rc2, head, _e2 = run_git(["-C", OCP_CLONE, "rev-parse", "HEAD"], timeout=30)
        os.makedirs(dest, exist_ok=True)
        atomic_write_text(os.path.join(dest, "POINTER.md"), "\n".join([
            "# Указатель: floflo777/open-crypto-puzzles", "",
            "Полный клон уже лежит в `_sources/ocp/` (~%s без .git) — вторая копия не нужна."
            % fmt_bytes(dir_size(OCP_CLONE)),
            "- remote: https://github.com/%s" % o_r,
            "- HEAD: %s" % (head.strip() or "?"),
            "- обновлён: %s · git pull: %s" % (iso(utcnow()), cell(out or err) or "—"),
            "- реестр пазлов офлайн: `_sources/ocp/puzzles.json` (slug = имена папок puzzles/)",
            "- код/данные: `_sources/ocp/<tier>/<slug>/`", "- запросов к API: 0", "",
        ]) + "\n")
        print("OK: OCP обновлён через git pull --ff-only (0 запросов API). HEAD=%s. POINTER.md в _sources/github/%s"
              % ((head.strip() or "?")[:8], name))
        print("git pull: %s" % cell(out or err))
        return 0
    probe = free_probe(o_r)
    if not probe:
        print("Репо %s не отвечает (ls-remote)" % o_r, file=sys.stderr)
        return 1
    branch, sha = probe
    os.makedirs(dest, exist_ok=True)
    if os.path.isdir(dest) and any(n != "POINTER.md" for n in os.listdir(dest)) and not args.force:
        print("Кэш уже есть: %s (HEAD %s) — не перекачиваем." % (dest, sha[:8]))
        return 0
    n, b, method = download_snapshot(o_r, branch, sha, os.path.join(dest, "files"), args.max_mb, [])
    atomic_write_text(os.path.join(dest, "POINTER.md"), "\n".join([
        "# Кэш репозитория %s" % o_r, "", "- ветка: %s, HEAD: %s" % (branch, sha),
        "- файлов: %d, объём: %s, метод: %s" % (n, fmt_bytes(b), method),
        "- дата: %s, запросов к API: 0 (codeload/clone)" % iso(utcnow()), "",
    ]) + "\n")
    print("OK: %s → _sources/github/%s (%d файлов, %s)" % (o_r, name, n, fmt_bytes(b)))
    return 0


def cmd_ledger(args) -> int:
    if args.reconcile:
        status, hdrs, body = http_get(API + "/rate_limit", {"Accept": "application/vnd.github+json"}, 30)
        if status != 200:
            print("Не удалось: HTTP %s" % status, file=sys.stderr)
            return 1
        core = json.loads(body.decode("utf-8", "replace"))["resources"]["core"]

        def mutate(d):
            d.update({"limit": core["limit"], "remaining_seen": core["remaining"],
                      "reset_utc": iso(datetime.fromtimestamp(core["reset"], tz=timezone.utc)),
                      "updated_utc": iso(utcnow()), "spent_window": 0})
            return d
        locked_json(LEDGER_PATH, mutate)
        print("Сверено с /rate_limit (1 запрос): limit=%s remaining=%s reset=%s" % (
            core["limit"], core["remaining"], core["reset"]))
        return 0
    st = read_json(LEDGER_PATH, {})
    ents = st.get("entries", [])
    print("Бюджет api.github.com (общий часовой на весь IP всех агентов):")
    print("  limit=%s  remaining_seen=%s  reset=%s  updated=%s  записей=%d" % (
        st.get("limit", 60), st.get("remaining_seen"), st.get("reset_utc"), st.get("updated_utc"), len(ents)))
    print("  последние 12 обращений:")
    for e in ents[-12:]:
        print("   - %s %-12s HTTP %-4s cost=%s %s" % ((e.get("ts") or "")[:16], e.get("agent", ""),
                                                      e.get("status"), e.get("cost"), (e.get("url") or "")[:76]))
    return 0


def cmd_gc_cache(_args) -> int:
    total = 0
    print("Кэш GitHub (_sources/github/):")
    for root, dirs, files in os.walk(GH_CACHE):
        size = sum(os.path.getsize(os.path.join(root, f)) for f in files if os.path.isfile(os.path.join(root, f)))
        total += size
        rel = os.path.relpath(root, GH_CACHE).replace("\\", "/")
        if rel != ".":
            print("- %-56s %s (%d файлов)" % (rel, fmt_bytes(size), len(files)))
    print("Итого: %s" % fmt_bytes(total))
    print("Удаление не выполняется: чужие дампы и работа агентов не затираются.")
    return 0


# ---------- CLI ----------

def build_parser():
    p = argparse.ArgumentParser(prog="github_intake.py",
                                description="GitHub-интейк: обязательный первый шлюз по цели "
                                            "(AGENT_INSTRUCTIONS.md).")
    sub = p.add_subparsers(dest="cmd", required=True)

    def common(sp):
        sp.add_argument("slug")
        sp.add_argument("--agent", default="")
        sp.add_argument("--repo", action="append", default=[], help="вручную owner/name (повторяемо)")
        sp.add_argument("--exclude", action="append", default=[])
        sp.add_argument("--max-repos", type=int, default=4)
        sp.add_argument("--api-budget", type=int, default=API_BUDGET_DEFAULT)
        sp.add_argument("--minutes", type=int, default=MINUTES_DEFAULT)
        sp.add_argument("--max-mb", type=int, default=MAX_MB_DEFAULT)

    sp = sub.add_parser("plan", help="кандидаты и оценка (ничего не пишет)")
    common(sp)
    sp.add_argument("--no-net", action="store_true")
    sp.add_argument("--json", action="store_true")
    sp.set_defaults(func=cmd_plan)

    r = sub.add_parser("run", help="собрать + дайдест + запись шлюза")
    r.add_argument("slug")
    r.add_argument("--agent", required=True)
    r.add_argument("--repo", action="append", default=[])
    r.add_argument("--exclude", action="append", default=[])
    r.add_argument("--api-budget", type=int, default=API_BUDGET_DEFAULT)
    r.add_argument("--minutes", type=int, default=MINUTES_DEFAULT)
    r.add_argument("--max-mb", type=int, default=MAX_MB_DEFAULT)
    r.add_argument("--max-repos", type=int, default=4)
    r.add_argument("--resume", action="store_true",
                   help="добавить к прогону остатки из data/github/resume.json")
    r.add_argument("--search", type=int, default=0)
    r.add_argument("--full", action="store_true", help="плюс pulls/commits/gists")
    r.add_argument("--dry", action="store_true")
    r.add_argument("--force", action="store_true")
    r.add_argument("--no-extract", action="store_true")
    r.add_argument("--no-wiki", action="store_true")
    r.add_argument("--no-net", action="store_true")
    r.add_argument("--keep-tarball", action="store_true")
    r.add_argument("--take-claim", action="store_true")
    r.add_argument("--note", default="github-intake")
    r.set_defaults(func=cmd_run)

    s = sub.add_parser("status", help="проверка шлюза (0 сети)")
    s.add_argument("slug", nargs="?")
    s.add_argument("--json", action="store_true")
    s.add_argument("--refresh", action="store_true")
    s.add_argument("--check-head", action="store_true", help="бесплатная проверка смены HEAD (ls-remote)")
    s.set_defaults(func=cmd_status)

    b = sub.add_parser("backlog", help="очередь целей без интейка")
    b.add_argument("--n", type=int, default=20)
    b.add_argument("--refresh", action="store_true")
    b.add_argument("--json", action="store_true")
    b.set_defaults(func=cmd_backlog)

    c = sub.add_parser("cache", help="общий кэш переиспользуемых репо")
    c.add_argument("repo", nargs="?", default="floflo777/open-crypto-puzzles")
    c.add_argument("--branch", default="")
    c.add_argument("--max-mb", type=int, default=200)
    c.add_argument("--force", action="store_true")
    c.set_defaults(func=cmd_cache)

    l = sub.add_parser("ledger", help="учёт бюджета api.github.com")
    l.add_argument("--reconcile", action="store_true")
    l.set_defaults(func=cmd_ledger)

    sub.add_parser("gc-cache", help="отчёт о размере кэша").set_defaults(func=cmd_gc_cache)
    return p


def main() -> int:
    for stream in (sys.stdout, sys.stderr):
        try:
            stream.reconfigure(encoding="utf-8", errors="replace")
        except Exception:  # noqa: BLE001
            pass
    os.makedirs(GH_CACHE, exist_ok=True)
    args = build_parser().parse_args()
    if args.cmd == "run" and not args.agent:
        print("run требует --agent", file=sys.stderr)
        return 1
    return args.func(args)


if __name__ == "__main__":
    sys.exit(main())
