# -*- coding: utf-8 -*-
"""Glimmer (SLM Hunt #2) — targeted small probe of frontier locks.

Closes the documented hole: known-password reuse was only ever tested with a
THREADED sweep that counted HTTP 429 as a miss. Here: strictly sequential,
retry on 429/5xx, stop on HIT.

Targets (frontier locks): zhgsm /raft-escape, jcl9c /smoke-signals, y6cd1 /pirate-battle
"""
import io
import json
import sys
import time
import urllib.error
import urllib.request

URL = "https://site-pages.wix.com/_api/wix-public-html-info-webapp/resolve_protected_page_urls"
META = "13cab6fc-e004-4514-aab0-a7cf702047f9"
SITE = "b8aa9fe0-61db-4696-8909-9dd877606aa4"
UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/124.0 Safari/537.36")

TARGETS = [
    ("zhgsm", "raft-escape / RaftBuilt"),
    ("jcl9c", "smoke-signals / lightafire"),
    ("y6cd1", "pirate-battle / fight"),
]

# --- candidates, highest value first -------------------------------------
KNOWN_REUSE = [
    "777", "666", "FFFFFFFFFFF", "fffffffffff", "FFFFFFFFFF", "fffffffff",
    "01271967", "07201969", "4samcodeartist", "codebreaker11", "virtual moon",
    "fortune", "all man kind", "one giant step", "into digital",
    "morse00100001", "tomorrow0010000", "supernova",
    "north64", "south64", "east64", "west64",
    "wavebreaker7109", "mobydick69420", "electricfeel64", "youshallpass47",
    "witchoftheeast", "20000leagues", "2hours40minutes",
    "amphitrite", "albatross", "semaphore", "glimmer", "closerandcloser",
    "huntgathwhalblo", "shiphuntshalpar", "michaelphelps", "seahitchhiker",
    "sleighride", "pirate bay", "escape", "vampire",
    "Gilligan", "Jonas", "Thurston", "Lovey", "Ginger", "Dr. Roy", "Mary Ann",
]

RAFT = ["lumber", "maple", "ocean", "love", "message", "six", "marine", "north",
        "RaftBuilt", "raft built", "raftbuilt", "raft-escape", "raftescape",
        "raft escape", "desertedisland", "deserted island", "palmtree",
        "palmtreewood", "palm tree wood", "coconut", "coconuts", "shark",
        "castaway", "cast away", "kon-tiki", "kontiki", "hucksfinn", "huck finn"]

FIRE = ["pyromaniac", "Pyromaniac", "F", "f", "pressf", "pressftopayrespects",
        "lightafire", "light a fire", "lightafirealert", "smokesignals",
        "smoke signals", "smoke-signals", "fire", "Fire", "campfire", "signal fire",
        "signal-fire", "smokeybear", "prometheus", "katniss", "firestarter",
        "tinder", "flint", "spark", "beacon", "bonfire", "wildfire"]

FIGHT = ["fight", "FIGHT", "Fight", "fight!", "fightthemoff", "fight them off",
         "fightback", "fight back", "piratebattle", "pirate battle",
         "adrenaline", "youshallnotpass47", "imalovernotafighter", "nope lol",
         "nopelol", "sword", "swords", "cutlass", "musket", "cannon",
         "blackbeard", "jollyroger", "jolly roger"]

CAND = {}
for c in KNOWN_REUSE:
    CAND.setdefault(c, []).append("known/reuse")
for c in RAFT:
    CAND.setdefault(c, []).append("raft ideas")
for c in FIRE:
    CAND.setdefault(c, []).append("fire ideas")
for c in FIGHT:
    CAND.setdefault(c, []).append("fight ideas")

ORDER = []
for c in KNOWN_REUSE + RAFT + FIRE + FIGHT:
    if c not in ORDER:
        ORDER.append(c)

LOG = r"C:\111\glimmer_probe.log"
HITS = r"C:\111\glimmer_HITS.txt"
MAX_REQ = 900


def log(msg):
    print(msg, flush=True)
    with io.open(LOG, "a", encoding="utf-8") as f:
        f.write(msg + "\n")


def test(pid, pw, timeout=15, retries=3):
    body = json.dumps({"metaSiteId": META, "siteId": SITE,
                       "pageId": pid, "password": pw}).encode()
    for a in range(retries + 1):
        req = urllib.request.Request(URL, data=body, headers={
            "Content-Type": "application/json",
            "Origin": "https://www.smithlylemoore.com",
            "User-Agent": UA})
        try:
            r = urllib.request.urlopen(req, timeout=timeout)
            d = json.loads(r.read())
            if d.get("success"):
                return "HIT", d.get("payload")
            return "NO", d.get("errorCode")
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
    with io.open(LOG, "w", encoding="utf-8") as f:
        f.write("glimmer probe start %s\n" % time.strftime("%Y-%m-%d %H:%M:%S"))
    n = 0
    found = []
    for pid, label in TARGETS:
        log("=== %s (%s) ===" % (pid, label))
        for c in ORDER:
            if n >= MAX_REQ:
                log("MAX_REQ reached (%d) — stopping" % MAX_REQ)
                break
            st, info = test(pid, c)
            n += 1
            if st == "HIT":
                msg = "!!! HIT %s <- %r  %s" % (pid, c, str(info)[:400])
                log(msg)
                found.append(msg)
                with io.open(HITS, "a", encoding="utf-8") as f:
                    f.write(msg + "\n")
                break
            if st == "ERR":
                log("  ERR  %-22r %s" % (c, info))
            time.sleep(0.6)
        else:
            log("--- no hit on %s (%d candidates)" % (pid, len(ORDER)))
            continue
        if n >= MAX_REQ:
            break
    log("done: %d requests, hits=%d, %s" % (n, len(found), time.strftime("%H:%M:%S")))
    return 0


if __name__ == "__main__":
    sys.exit(main())
