# -*- coding: utf-8 -*-
"""Glimmer — batch 3: new families only (auto-filtered against the 2666 tried strings).

Families, each grounded in a documented pattern:
  * Mario Kart 64 track names — the '64' passwords (north64/east64/...) came from the
    N64 'rainbow road' shortcut motif, so the track-name space is the natural extension.
  * Famous RESCUE dates (MMDDYYYY + DDMMYYYY) — /more-info says the shortcut needs
    'baby steps that lead to one giant leap'; jcl9c's button is 'Alert a Passing Ship',
    i.e. a rescue. Hunt #1's fire lock was a DATE (Apollo 1, 01271967).
  * palm-hut / alert / raft-phrase literal families from the jetkc text.
"""
import io
import json
import sys
import time
import urllib.error
import urllib.request

HANDOFF = r"C:\Users\Admin\Downloads\GLIMMER_HANDOFF.txt"
URL = "https://site-pages.wix.com/_api/wix-public-html-info-webapp/resolve_protected_page_urls"
META = "13cab6fc-e004-4514-aab0-a7cf702047f9"
SITE = "b8aa9fe0-61db-4696-8909-9dd877606aa4"
UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/124.0 Safari/537.36")
TARGETS = [("zhgsm", "raft-escape"), ("jcl9c", "smoke-signals")]
LOG = r"C:\111\glimmer_batch3.log"
HITS = r"C:\111\glimmer_HITS.txt"

MK64 = ["luigiracetrack", "luigi raceway", "moo moo farm", "moomoo farm", "moomoomfarm".replace("m", "m"),
        "kalamari desert", "kalimari desert", "toads turnpike", "toads turnpike 64",
        "frappe snowland", "choco mountain", "mario raceway", "wario stadium",
        "sherbet land", "royal raceway", "bowsers castle", "dk jungle parkway",
        "yoshi valley", "banshee boardwalk", "rainbow road 64",
        "luigiracetrack64", "moomoo farm64", "kalamaridesert", "toadsturnpike64",
        "frappesnowland", "chocomountain", "marioraceway", "wariosstadium",
        "sherbetland", "royalraceway", "bowserscastle", "dkjungleparkway",
        "yoshivalley", "bansheeboardwalk", "rainbowroadn64",
        "mariokart", "mariokart64", "mario kart", "mario kart 64"]

RESCUE = ["04151912", "15041912", "05071915", "07051915", "08301916", "30081916",
          "04171970", "17041970", "01152009", "15012009", "12161916", "16121916",
          "05271935", "27051935", "07071940", "15071940"]

LITERAL = ["palmhut", "palm huts", "palmhuts", "hut", "huts", "alert",
           "alertapassingship", "passingship", "passing ship", "signal", "signals",
           "escapeviaraft", "raftmadeofpalmtreewood", "palmtreewoodraft",
           "palmtreewood", "woodenraft", "coconutpalm", "coconut tree", "coconuttree",
           "islandfever", "coconutcrazy", "coconut mad", "stircrazy", "stir crazy"]


def load_tried():
    with io.open(HANDOFF, encoding="utf-8") as f:
        lines = f.read().split("\n")
    t = set()
    for ln in lines[1115:3596]:
        s = ln.strip()
        if not s or s.startswith("#"):
            continue
        t.add(s.lower())
        t.add(s.lower().replace(" ", "").replace("-", "").replace("_", "").replace(".", ""))
    return t


TRIED = load_tried()


def is_tried(c):
    k1 = c.lower()
    k2 = k1.replace(" ", "").replace("-", "").replace("_", "").replace(".", "")
    return k1 in TRIED or k2 in TRIED


def norm(c):
    return c.lower().replace(" ", "").replace("-", "").replace("_", "").replace(".", "")


CAND = []
for group in (MK64, RESCUE, LITERAL):
    for c in group:
        if is_tried(c) or norm(c) in [norm(x) for x in CAND]:
            continue
        CAND.append(c)

print("batch3 candidates after filter: %d" % len(CAND))
for c in CAND:
    print("   " + c)


def log(msg, append=True):
    print(msg, flush=True)
    with io.open(LOG, "a" if append else "w", encoding="utf-8") as f:
        f.write(msg + "\n")


def test(pid, pw, timeout=15, retries=3):
    body = json.dumps({"metaSiteId": META, "siteId": SITE, "pageId": pid, "password": pw}).encode()
    for a in range(retries + 1):
        req = urllib.request.Request(URL, data=body, headers={
            "Content-Type": "application/json",
            "Origin": "https://www.smithlylemoore.com",
            "User-Agent": UA})
        try:
            r = urllib.request.urlopen(req, timeout=timeout)
            d = json.loads(r.read())
            return ("HIT", d.get("payload")) if d.get("success") else ("NO", d.get("errorCode"))
        except urllib.error.HTTPError as e:
            if e.code == 403:
                return "NO", 403
            if e.code in (429, 500, 502, 503, 504) and a < retries:
                time.sleep(3 + 3 * a)
                continue
            return "ERR", "HTTP %d" % e.code
        except Exception as e:
            if a < retries:
                time.sleep(2 + 2 * a)
                continue
            return "ERR", str(e)
    return "ERR", "exhausted"


def main():
    log("batch3 start %s | %d candidates x %d locks" % (time.strftime("%H:%M:%S"), len(CAND), len(TARGETS)), append=False)
    n = hits = 0
    for pid, label in TARGETS:
        log("=== %s (%s) ===" % (pid, label))
        for c in CAND:
            st, info = test(pid, c)
            n += 1
            if st == "HIT":
                msg = "!!! HIT %s <- %r | %s" % (pid, c, str(info)[:300])
                log(msg)
                with io.open(HITS, "a", encoding="utf-8") as f:
                    f.write(msg + "\n")
                hits += 1
                break
            if st == "ERR":
                log("  ERR %-22r %s" % (c, info))
            time.sleep(0.6)
        else:
            log("--- no hit on %s" % pid)
    log("batch3 done %s: %d requests, hits=%d" % (time.strftime("%H:%M:%S"), n, hits))
    return 0


if __name__ == "__main__":
    sys.exit(main())
