#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""OCP → MASTER: компаратор снапшота и раскладка дельт (агент OCP Sync).

Источник: клон https://github.com/floflo777/open-crypto-puzzles в `_sources/ocp/`
(реестр снапшотов — `_sources/OCP_SNAPSHOT.md`). Протокол базы — `AGENT_INSTRUCTIONS.md`.

Команды:
  scan    — построить дельту снапшота → `_sources/ocp_sync_<дата>/delta_report.{json,md}`
  apply   — раскладка: данные → `<папка пазла>/data/ocp/<путь>`, код → `<папка пазла>/tools/ocp/<путь>`,
            byte-exact копии + `SOURCE.md` с provenance; файлы тяжелее 250 КБ не дублируются,
            для них пишется `_HEAVY.md` с указателем на клон. `--dry-run` ничего не пишет.
  verify  — самопроверка покрытия: у каждой сущности OCP должен быть след в базе.

Гарантии: существующие файлы не перезаписываются (кроме наших же зеркал data/ocp, tools/ocp,
SOURCE.md, _HEAVY.md); папки с живой (непросроченной) бронью другого агента пропускаются.
apply берёт/отпускает бронь по протоколу claims.py и дописывает в конец `LOG.md` пазла запись
о раскладке (формат AGENT_INSTRUCTIONS); README.md («Обновление») трогает только куратор руками.
"""

import argparse
import hashlib
import json
import os
import re
import subprocess
import sys
from datetime import datetime, timezone

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

MASTER = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CLONE = os.path.join(MASTER, "_sources", "ocp")
REPO_URL = "https://github.com/floflo777/open-crypto-puzzles"
TIERS = ("1-big-prizes", "2-mid-prizes", "3-small-prizes", "4-solved")
DEADEND = "archive/dead-ends"
AGENT = "OCP Sync"
SNAP_DATE = "2026-10-18"
HEAVY_BYTES = 250_000
CODE_EXT = (".py", ".c", ".cu", ".h", ".sh", ".mjs", ".js")
TEXT_EXT = (".md", ".json", ".csv", ".txt", ".yaml", ".yml") + CODE_EXT

# OCP-slug → имя папки MASTER, когда точного совпадения и туманного матчинга недостаточно
OVERRIDE = {
    "caesarcoder-genesis-block-wallet-puzzle-947ksats": "genesis-block-wallet-puzzle-142ksats",
}


# ---------- хеши и нормализация ----------

def blob_sha(data: bytes) -> str:
    """Хеш объекта формата git — сопоставим с `git ls-tree`/`git hash-object`."""
    return hashlib.sha1(b"blob %d\0" % len(data) + data).hexdigest()


def normalize(data: bytes) -> bytes:
    """CRLF→LF, пробелы в конце строк, ровно один перевод строки в конце. Бинарь — как есть."""
    try:
        s = data.decode("utf-8")
    except UnicodeDecodeError:
        return data
    s = s.replace("\r\n", "\n").replace("\r", "\n")
    lines = [ln.rstrip() for ln in s.split("\n")]
    while lines and not lines[-1]:
        lines.pop()
    return (("\n".join(lines) + "\n").encode("utf-8") if lines else b"")


def canon_json(data: bytes):
    """Канонический JSON (сортировка ключей), или None если это не JSON."""
    try:
        return json.dumps(json.loads(data.decode("utf-8")), sort_keys=True,
                          separators=(",", ":"), ensure_ascii=False).encode("utf-8")
    except Exception:
        return None


def uniq_lines(data: bytes):
    return set(ln.strip().lower() for ln in normalize(data).decode("utf-8", "replace").split("\n")
               if len(ln.strip()) > 3)


# ---------- доступ к клону ----------

def git_lines(args):
    p = subprocess.run(["git", "-C", CLONE] + args, capture_output=True, text=True, encoding="utf-8")
    if p.returncode != 0:
        raise SystemExit("git %s failed: %s" % (" ".join(args), p.stderr.strip()))
    return p.stdout.splitlines()


def head_sha() -> str:
    return git_lines(["rev-parse", "HEAD"])[0].strip()


def ls_tree(ref):
    out = {}
    for line in git_lines(["ls-tree", "-r", ref]):
        meta, path = line.split("\t", 1)
        mode, typ, sha = meta.split()
        if typ == "blob":
            out[path] = sha
    return out


def read(path):
    with open(os.path.join(CLONE, path.replace("/", os.sep)), "rb") as f:
        return f.read()


def load_index(ref):
    """puzzles.json из клона (через git, не через ФС): slug → запись индекса."""
    p = subprocess.run(["git", "-C", CLONE, "show", "%s:puzzles.json" % ref],
                       capture_output=True, text=True, encoding="utf-8", errors="replace")
    if p.returncode != 0:
        return {}
    try:
        docs = json.loads(p.stdout)["puzzles"]
    except Exception:
        return {}
    return {d.get("slug", ""): d for d in docs}


def ocp_status(rec, pref):
    """(статус по OCP, примечание о призе) — из индекса; при отсутствии записи — по тиру."""
    if rec:
        st = rec.get("status") or "?"
        prize = (rec.get("prize") or {}).get("note") or ""
        return st, prize
    tier = pref.split("/")[0]
    return ("solved" if tier == "4-solved" else "open"), ""


def our_status(sub):
    """Наш статус по расположению папки: puzzles/ = открыт, solved/ = закрыт."""
    return "solved" if sub == "solved" else "open"


# ---------- наша база ----------

def our_dirs():
    for sub in ("puzzles", "solved"):
        base = os.path.join(MASTER, sub)
        if not os.path.isdir(base):
            continue
        for d in sorted(os.listdir(base)):
            if os.path.isdir(os.path.join(base, d)):
                yield sub, d


def folder_of(dirpath):
    """'puzzles/<slug>' или 'solved/<slug>' для файла внутри папки пазла, иначе None."""
    ap = os.path.abspath(dirpath)
    for sub in ("puzzles", "solved"):
        base = os.path.abspath(os.path.join(MASTER, sub))
        if ap == base or ap.startswith(base + os.sep):
            return "%s/%s" % (sub, os.path.relpath(ap, base).split(os.sep)[0])
    return None


def build_local_index():
    """По всем файлам базы (кроме клона): blob-хеши, нормализованные хеши, строки по папкам пазлов."""
    blobs, norms, linesets = {}, {}, {}
    clone_abs = os.path.abspath(CLONE)
    for sub in ("puzzles", "solved", "_sources", "tools", "reports"):
        root = os.path.join(MASTER, sub)
        if not os.path.isdir(root):
            continue
        for dirpath, dirnames, filenames in os.walk(root):
            dirnames[:] = [d for d in dirnames if d not in (".git", "__pycache__")]
            if os.path.abspath(dirpath).startswith(clone_abs):
                continue
            folder = folder_of(dirpath)
            for fn in filenames:
                fp = os.path.join(dirpath, fn)
                try:
                    data = open(fp, "rb").read()
                except Exception:
                    continue
                here = os.path.relpath(fp, MASTER).replace(os.sep, "/")
                blobs.setdefault(blob_sha(data), set()).add(here)
                norms.setdefault(blob_sha(normalize(data)), set()).add(here)
                cj = canon_json(data)
                if cj is not None:
                    norms.setdefault(blob_sha(cj), set()).add(here)
                if folder and os.path.splitext(fn)[1].lower() in TEXT_EXT:
                    linesets.setdefault(folder, set()).update(uniq_lines(data))
    return blobs, norms, linesets


def live_claims():
    """slug → агент у кого НЕпросроченная бронь (кроме нас)."""
    now = datetime.now(timezone.utc)
    out = {}
    ad = os.path.join(MASTER, "claims", "_active")
    for fn in (sorted(os.listdir(ad)) if os.path.isdir(ad) else []):
        try:
            c = json.load(open(os.path.join(ad, fn), encoding="utf-8"))
            dt = datetime.fromisoformat(c.get("expires_utc", "").replace("Z", "+00:00"))
        except Exception:
            continue
        if dt > now and c.get("agent") != AGENT:
            out[c["slug"]] = c["agent"]
    return out


def tokens(slug):
    return set(w for w in re.split(r"[^a-z0-9]+", slug.lower()) if len(w) > 3)


def map_slug(slug, ours):
    """OCP-slug → ('puzzles'|'solved', локальный slug). Точно → override → туманно (>=0.6)."""
    if slug in OVERRIDE:
        for sub, lsl in ours:
            if lsl == OVERRIDE[slug]:
                return sub, lsl
    for sub, lsl in ours:
        if lsl == slug:
            return sub, lsl
    t = tokens(slug)
    if not t:
        return None
    best, score = None, 0.0
    for sub, lsl in ours:
        lt = tokens(lsl)
        if not lt:
            continue
        ov = len(t & lt) / max(1, min(len(t), len(lt)))
        if ov > score:
            best, score = (sub, lsl), ov
    return best if score >= 0.6 else None


def ocp_entities(tree):
    """[(kind, 'tier/slug', slug)] — папки пазлов и dead-ends."""
    seen, ents = set(), []
    for p in sorted(tree):
        parts = p.split("/")
        if len(parts) >= 2 and parts[0] in TIERS:
            if len(parts) == 2:
                continue  # tier-индекс (README.md на уровне тира) — служебный, не пазл
            pref, kind, slug = parts[0] + "/" + parts[1], "puzzle", parts[1]
        elif parts[0] == DEADEND and len(parts) >= 3:
            pref, kind, slug = DEADEND + "/" + parts[1], "dead-end", parts[1]
        else:
            continue
        if pref not in seen:
            seen.add(pref)
            ents.append((kind, pref, slug))
    return ents


# ---------- классификация ----------

def classify(pref, tree, blobs, norms, folder_lines):
    rows = []
    for p, sha in sorted(tree.items()):
        if not p.startswith(pref + "/"):
            continue
        rel = p[len(pref) + 1:]
        data = read(p)
        ext = os.path.splitext(p)[1].lower()
        if blob_sha(data) in blobs:
            st, act, cov = "PRESENT", "skip", None
        elif blob_sha(normalize(data)) in norms or (
                canon_json(data) is not None and blob_sha(canon_json(data)) in norms):
            st, act, cov = "PRESENT-NORM", "skip", None
        else:
            cov = (round(len(uniq_lines(data) & folder_lines) / len(uniq_lines(data)), 3)
                   if ext in TEXT_EXT and folder_lines and uniq_lines(data) else None)
            st = ("COVERED-TEXT" if cov is not None and cov >= 0.90 else
                  "PARTIAL-TEXT" if cov is not None and cov >= 0.30 else "MISSING")
            act = "link" if len(data) > HEAVY_BYTES else (
                "copy-code" if ext in CODE_EXT or rel.startswith("tools/") else "copy-data")
        rows.append({"ocp_path": p, "rel": rel, "blob": sha, "size": len(data),
                     "status": st, "action": act, "line_coverage": cov})
    return rows


def cmd_scan(ref, outdir):
    ours = list(our_dirs())
    blobs, norms, linesets = build_local_index()
    tree = ls_tree(ref)
    idx = load_index(ref)
    ents = ocp_entities(tree)
    report, unmapped = [], []
    for kind, pref, slug in ents:
        m = map_slug(slug, ours)
        if not m:
            unmapped.append({"kind": kind, "ocp": pref, "slug": slug})
            continue
        sub, lsl = m
        rows = classify(pref, tree, blobs, norms, linesets.get("%s/%s" % (sub, lsl), set()))
        ost, note = ocp_status(idx.get(slug), pref)
        nst = our_status(sub)
        conflict = None if ost == nst else "%s: по OCP «%s», у нас папка в %s/" % (slug, ost, sub)
        report.append({"kind": kind, "ocp": pref, "slug": slug, "master": "%s/%s" % (sub, lsl),
                       "ocp_status": ost, "our_status": nst, "status_conflict": conflict,
                       "prize_note": note,
                       "files": rows,
                       "copy": sum(1 for r in rows if r["action"].startswith("copy")),
                       "link": sum(1 for r in rows if r["action"] == "link"),
                       "skip": sum(1 for r in rows if r["action"] == "skip")})
    prefixes = set([e["ocp"] for e in report] + [u["ocp"] for u in unmapped])
    service = sorted(p for p in tree if not any(p.startswith(q + "/") for q in prefixes))
    payload = {"snapshot": {"repo": REPO_URL, "ref": ref, "scanned": SNAP_DATE, "agent": AGENT,
                            "blobs": len(tree), "entities": len(ents)},
               "puzzles": report, "unmapped": unmapped, "service_files": service}
    os.makedirs(outdir, exist_ok=True)
    jpath = os.path.join(outdir, "delta_report.json")
    with open(jpath + ".tmp", "w", encoding="utf-8", newline="\n") as f:
        json.dump(payload, f, ensure_ascii=False, indent=1)
    os.replace(jpath + ".tmp", jpath)

    md = ["# OCP → MASTER: дельта снапшота `%s` (%s)" % (ref[:8], SNAP_DATE), "",
          "Сгенерировано `tools/ocp_delta_scan.py`.", "",
          "Статусы: `PRESENT` / `PRESENT-NORM` — byte-exact (или нормализованное / canonical-JSON)",
          "зеркало уже есть в базе; `COVERED-TEXT` — ≥90 % уникальных строк у нас есть; `PARTIAL-TEXT` —",
          "30–90 %; `MISSING` — содержимого у нас нет. Действия: `copy-data` → `data/ocp/`,",
          "`copy-code` → `tools/ocp/`, `link` — файл >250 КБ остаётся в клоне `_sources/ocp/`,",
          "указатель в `data/ocp/_HEAVY.md`.", "",
          "| OCP | папка MASTER | копий | ссылок | уже есть |", "|---|---|---|---|---|"]
    for e in sorted(report, key=lambda x: (-x["copy"], x["ocp"])):
        md.append("| `%s` | `%s` | %d | %d | %d |" % (
            e["ocp"], e["master"], e["copy"], e["link"], e["skip"]))
    conf = [e for e in report if e["status_conflict"]]
    md += ["", "## STATUS_CONFLICT — статус по OCP не совпадает с нашим расположением папки (%d)" % len(conf), "",
           "Ничего не затираем: расхождение фиксируется дважды, приоритет — собственное on-chain",
           "подтверждение. Строки ниже — материал для куратора, не основание для автоматической правки.", ""]
    md += ["- `%s` → `%s` — %s%s" % (
        e["ocp"], e["master"], e["status_conflict"],
        " | примечание OCP: " + e["prize_note"][:220] if e["prize_note"] else "")
        for e in sorted(conf, key=lambda x: x["slug"])] or ["- нет"]
    md += ["", "## UNMAPPED (сущности OCP без папки в MASTER) — завести по п.8 AGENT_INSTRUCTIONS", ""]
    md += ["- `%s` (%s)" % (u["ocp"], u["kind"]) for u in unmapped] or ["- нет"]
    md += ["", "## Служебные файлы вне папок пазлов (%d) — остаются в клоне" % len(service), ""]
    md += ["- `%s`" % p for p in service]
    mpath = os.path.join(outdir, "delta_report.md")
    with open(mpath + ".tmp", "w", encoding="utf-8", newline="\n") as f:
        f.write("\n".join(md) + "\n")
    os.replace(mpath + ".tmp", mpath)

    acc = sum(len(e["files"]) for e in report)
    acc += sum(1 for p in tree if any(p.startswith(u["ocp"] + "/") for u in unmapped))
    acc += len(service)
    print("снапшот %s: сущностей %d | сопоставлено %d | unmapped %d | служебных blob %d" % (
        ref[:8], len(ents), len(report), len(unmapped), len(service)))
    print("к копированию %d | тяжёлых по ссылке %d | зеркал уже есть %d" % (
        sum(e["copy"] for e in report), sum(e["link"] for e in report), sum(e["skip"] for e in report)))
    print("статусных расхождений (STATUS_CONFLICT): %d" % sum(1 for e in report if e["status_conflict"]))
    print("самопроверка blob: учтено %d из %d — %s" % (
        acc, len(tree), "OK" if acc == len(tree) else "РАСХОЖДЕНИЕ"))
    print("отчёты:", jpath, "|", mpath)


# ---------- раскладка ----------

def source_md(ref, rows, top):
    out = ["# Provenance зеркал OCP в этой папке (`%s`)" % top, "",
           "Источник: %s, коммит `%s`, снят %s агентом `%s` скриптом `tools/ocp_delta_scan.py`." % (
               REPO_URL, ref, SNAP_DATE, AGENT),
           "Полный клон: `_sources/ocp/`; реестр снапшотов: `_sources/OCP_SNAPSHOT.md`.",
           "Файлы ниже — byte-exact копии чужого материала: не редактируем, не затираем, не переименовываем.",
           "Сверка при следующей синхронизации: `git -C _sources/ocp ls-tree -r %s`." % ref, "",
           "| файл здесь | путь в репо | blob | размер | url |", "|---|---|---|---|---|"]
    for r in rows:
        here = r.get("dest") or r["rel"]
        out.append("| `%s` | `%s` | `%s` | %d | %s |" % (
            here, r["ocp_path"], r["blob"], r["size"],
            "%s/blob/%s/%s" % (REPO_URL, ref, r["ocp_path"])))
    return "\n".join(out) + "\n"


def heavy_md(ref, rows):
    out = ["# Тяжёлые артефакты OCP (>250 КБ) — в папку пазла не дублируются", "",
           "Лежат в клоне `_sources/ocp/` (коммит `%s`), здесь только указатель." % ref[:8], "",
           "| файл | путь в репо | blob | размер |", "|---|---|---|---|"]
    for r in rows:
        out.append("| [%s](../../../../_sources/ocp/%s) | `%s` | `%s` | %d |" % (
            r["rel"], r["ocp_path"], r["ocp_path"], r["blob"], r["size"]))
    return "\n".join(out) + "\n"


def claim_owner(slug):
    """Кто держит бронь сейчас (None — свободна/просрочена, 'unknown' — файл битый)."""
    p = os.path.join(MASTER, "claims", "_active", slug + ".json")
    if not os.path.exists(p):
        return None
    try:
        c = json.load(open(p, encoding="utf-8"))
        exp = datetime.fromisoformat(c.get("expires_utc", "").replace("Z", "+00:00"))
    except Exception:
        return "unknown"
    return c.get("agent") if exp > datetime.now(timezone.utc) else None


def claims_cli(args):
    p = subprocess.run([sys.executable, os.path.join(MASTER, "tools", "claims.py")] + args,
                       capture_output=True, text=True, encoding="utf-8", errors="replace")
    return p.returncode, ((p.stdout or "") + (p.stderr or "")).strip()


def append_log(fdir, ref, body, dry):
    """Append-запись в LOG.md пазла (создаёт файл, если его нет). Идемпотентна по ref+агенту."""
    path = os.path.join(fdir, "LOG.md")
    old = ""
    if os.path.exists(path):
        with open(path, "rb") as f:
            raw = f.read()
        old = raw.decode("utf-8", errors="replace")
        if ("<!-- ocp-snapshot:%s -->" % ref[:8]) in old:
            return "LOG: след снапшота уже есть — не дублируем"
    new = old.rstrip("\n") + ("\n\n" if old.strip() else "") + body
    if not dry:
        with open(path + ".tmp", "w", encoding="utf-8", newline="\n") as f:
            f.write(new)
        os.replace(path + ".tmp", path)
    return "LOG: append"


def log_body(ref, lsl, e, n_data, n_code, n_heavy, status):
    now = datetime.now(timezone.utc)
    ocp_paths = ["`%s`" % f for f in sorted({r["ocp_path"] for r in e["files"]
                                             if r["action"].startswith("copy")})]
    return "\n".join([
        "## %s, %s — %s (Qoder Desktop, Windows) <!-- ocp-snapshot:%s -->" % (
            now.strftime("%Y-%m-%d"), now.strftime("%H:%M"), AGENT, ref[:8]),
        "- Делал: обогащение из внешнего репозитория [open-crypto-puzzles](%s) — раскладка дельты "
        "снапшота `%s` (клон `_sources/ocp/`, реестр `_sources/OCP_SNAPSHOT.md`). Протокол: "
        "`claims acquire/heartbeat/release` по `%s`. Прогонов/переборов не запускали, статус пазла "
        "и балансы не меняли, чужие файлы не перезатёрты (копии лежат отдельными деревами "
        "`data/ocp/` и `tools/ocp/` с provenance)." % (REPO_URL, ref[:8], lsl),
        "- Результат: перенесено %d файлов данных → `data/ocp/`, %d кода → `tools/ocp/`,"
        "%d тяжёлых (>250 КБ) оставлены в клоне — указатель `data/ocp/_HEAVY.md`."
        " Зеркал, уже лежащих в базе, пропущено: %d. Статус по OCP: `%s`%s" % (
            n_data, n_code, n_heavy, e["skip"], status,
            "; **статусное расхождение с нашей базой** — фиксируем двойной записью, приоритет за "
            "собственным on-chain-подтверждением" if e.get("status_conflict") else "."),
        "- Артефакты: %s" % (", ".join(ocp_paths[:12]) + (" …" if len(ocp_paths) > 12 else "") or "—"),
        "- Ссылки/доказательства: %s/tree/%s/%s ; полная дельта — "
        "`_sources/ocp_sync_%s/delta_report.md`." % (REPO_URL, ref, e["ocp"], SNAP_DATE),
    ]) + "\n"


def cmd_apply(ref, outdir, dry=False):
    rp = os.path.join(outdir, "delta_report.json")
    if not os.path.exists(rp):
        raise SystemExit("сначала `scan`")
    payload = json.load(open(rp, encoding="utf-8"))
    claims = live_claims()
    written = linked = pending = 0
    log = []
    for e in payload["puzzles"]:
        sub, lsl = e["master"].split("/", 1)
        if lsl in claims:
            pending += 1
            log.append("PENDING-CLAIM: `%s` — держит %s, не трогаем" % (e["master"], claims[lsl]))
            continue
        fdir = os.path.join(MASTER, sub, lsl)
        groups = {"data/ocp": [], "tools/ocp": [], "heavy": []}
        used = set()
        for r in e["files"]:
            if r["action"] == "skip":
                continue
            if r["action"] == "link":
                groups["heavy"].append(r)
                continue
            top = "tools/ocp" if r["action"] == "copy-code" else "data/ocp"
            rel = r["rel"]
            if top == "tools/ocp" and "/tools/" in "/" + rel:
                rel = ("/" + rel).split("/tools/", 1)[1]
            while rel in used:          # защита от коллизий одноимённых файлов
                rel = os.path.splitext(rel)[0] + "_1" + os.path.splitext(rel)[1]
            used.add(rel)
            groups[top].append(dict(r, dest="%s/%s" % (top, rel)))
        if not (groups["data/ocp"] or groups["tools/ocp"] or groups["heavy"]):
            log.append("`%s`: дельты нет (%d зеркал уже в базе)" % (e["master"], e["skip"]))
            continue
        # бронь по протоколу: своя — оставляем, чужая живая — пропускаем, свободная — acquire
        held_by = claim_owner(lsl)
        mine_before = held_by == AGENT
        if not dry:
            if held_by and not mine_before:
                pending += 1
                log.append("PENDING-CLAIM (гонка): `%s` — взял %s, не трогаем" % (e["master"], held_by))
                continue
            if not mine_before:
                rc, msg = claims_cli(["acquire", lsl, "--agent", AGENT, "--model", "Qoder Desktop (Windows)",
                                      "--ttl", "60", "--note", "OCP sync: раскладка снапшота %s" % ref[:8]])
                if rc == 2:  # просроченная чужая бронь — перехват по протоколу
                    rc, msg = claims_cli(["steal", lsl, "--agent", AGENT, "--ttl", "60",
                                          "--note", "OCP sync: перехват просроченной, раскладка %s" % ref[:8]])
                if rc != 0:
                    pending += 1
                    log.append("PENDING-CLAIM: `%s` — acquire не прошёл: %s" % (e["master"], msg.replace("\n", " ")[:120]))
                    continue
        for top, rows in groups.items():
            if not rows:
                continue
            if top == "heavy":
                body = heavy_md(ref, rows)
                dest = os.path.join(fdir, "data", "ocp", "_HEAVY.md")
                todo = []
                linked += len(rows)
            else:
                body = source_md(ref, rows, top)
                dest = os.path.join(fdir, *top.split("/"), "SOURCE.md")
                todo = rows
            if not dry:
                os.makedirs(os.path.dirname(dest), exist_ok=True)
                with open(dest + ".tmp", "w", encoding="utf-8", newline="\n") as f:
                    f.write(body)
                os.replace(dest + ".tmp", dest)
            for r in todo:
                d = os.path.join(fdir, r["dest"].replace("/", os.sep))
                if not dry:
                    os.makedirs(os.path.dirname(d), exist_ok=True)
                    with open(d + ".tmp", "wb") as f:
                        f.write(read(r["ocp_path"]))
                    os.replace(d + ".tmp", d)
                written += 1
        n_data, n_code, n_heavy = (len(groups["data/ocp"]), len(groups["tools/ocp"]),
                                   len(groups["heavy"]))
        lmsg = append_log(fdir, ref, log_body(ref, lsl, e, n_data, n_code, n_heavy,
                                             e.get("ocp_status", "?")), dry)
        if not dry and not mine_before:
            claims_cli(["release", lsl, "--agent", AGENT])
        log.append("`%s`: копий %d, ссылок на тяжёлые %d, %s" % (
            e["master"], sum(1 for r in e["files"] if r["action"].startswith("copy")),
            sum(1 for r in e["files"] if r["action"] == "link"), lmsg))
    print(("[DRY-RUN] " if dry else "") + "файлов записано/к записи: %d | тяжёлых по ссылке: %d" % (written, linked))
    print("папок с живой бронью другого агента пропущено: %d" % pending)
    ap = os.path.join(outdir, "apply_log.md")
    with open(ap + ".tmp", "w", encoding="utf-8", newline="\n") as f:
        f.write("# Раскладка снапшота `%s` (%s, агент %s)%s\n\n%s\n" % (
            ref[:8], SNAP_DATE, AGENT, " — DRY RUN" if dry else "", "\n".join(log)))
    os.replace(ap + ".tmp", ap)


def cmd_verify(outdir):
    payload = json.load(open(os.path.join(outdir, "delta_report.json"), encoding="utf-8"))
    no_trace = []
    for e in payload["puzzles"]:
        fdir = os.path.join(MASTER, *e["master"].split("/"))
        trace = any(os.path.exists(os.path.join(fdir, *p.split("/"))) for p in
                    ("data/ocp/SOURCE.md", "tools/ocp/SOURCE.md", "data/ocp/_HEAVY.md"))
        if not trace:
            for idx in (os.path.join(fdir, "LOG.md"), os.path.join(MASTER, "solved", "INDEX.md"),
                        os.path.join(MASTER, "puzzles", "dead-ends-registry", "README.md")):
                try:
                    txt = open(idx, encoding="utf-8").read()
                except Exception:
                    continue
                if AGENT in txt or e["slug"] in txt:
                    trace = True
                    break
        if not trace:
            no_trace.append(e["master"])
    print("сущностей в отчёте %d | без следа синхронизации %d | unmapped %d" % (
        len(payload["puzzles"]), len(no_trace), len(payload["unmapped"])))
    for m in no_trace:
        print("  NO-TRACE:", m)
    return not no_trace


def main():
    ap = argparse.ArgumentParser(description="OCP → MASTER delta scan/apply/verify")
    ap.add_argument("cmd", choices=["scan", "apply", "verify"])
    ap.add_argument("--ref", default=None, help="коммит снапшота (по умолчанию HEAD клона)")
    ap.add_argument("--outdir", default=os.path.join(MASTER, "_sources", "ocp_sync_" + SNAP_DATE))
    ap.add_argument("--dry-run", action="store_true")
    a = ap.parse_args()
    ref = a.ref or head_sha()
    if a.cmd == "scan":
        cmd_scan(ref, a.outdir)
    elif a.cmd == "apply":
        cmd_apply(ref, a.outdir, a.dry_run)
    else:
        sys.exit(0 if cmd_verify(a.outdir) else 1)


if __name__ == "__main__":
    main()
