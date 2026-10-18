# -*- coding: utf-8 -*-
"""Glimmer — batch 2: habit-driven hypotheses for the two remaining locks.

Grounded in documented author habits + explicit 'next untested' notes from the handoff:
  * SYNOPSIS t39 note: "Next: DDMMYYYY and dates of real rescues/fires"  (never done)
  * /more-info: "a shortcut ... baby steps that lead to one giant leap"
    (Hunt #1 password was literally 'one giant step' / 'one small step')
  * habit (d): '64' suffixes (north64/east64/south64/west64/electricfeel64 from the N64 rainbow-road motif)
  * habit (a): slug/title/image-name = answer
  * habit (b): real proper names keep exact canonical case/punctuation
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

TARGETS = [("zhgsm", "raft-escape / RaftBuilt"), ("jcl9c", "smoke-signals / lightafire")]

SHORTCUT = [
    "onegiantleap", "one giant leap", "onegiantleapformankind",
    "one giant leap for mankind", "giantleap", "giant leap",
    "babysteps", "baby steps", "thebabysteps", "onestep", "onesmallstep",
    "rainbowroad", "rainbow road", "rainbowroad64", "shortcut", "theshortcut",
    "n64", "nintendo64", "nintendosixtyfour",
]

SUFFIX64 = [
    "raft64", "Raft64", "palm64", "palmtree64", "coconut64", "coconuts64",
    "island64", "escape64", "gilligan64", "minnow64", "skipper64", "hut64",
    "beach64", "desertedisland64", "fire64", "smoke64", "smokesignal64",
    "smokesignals64", "signal64", "lightafire64", "beacon64", "sos64", "campfire64",
]

GILLIGAN = [
    "Skipper", "Minnow", "S.S. Minnow", "ssminnow", "Howell", "Thurston Howell",
    "Lovey Howell", "Professor", "theProfessor", "the Professor", "Hinkley",
    "Roy Hinkley", "Grumby", "Jonas Grumby", "Mary Ann Summers", "Ginger Grant",
    "threehourtour", "3hourtour", "athreehourtour", "threehour",
    "justsitrightback", "gilligansisle", "balladofgilligansisle",
]

FIRE_MMDDYYYY = [
    "10081871", "02091666", "11281942", "03251911", "05061937",
    "12301903", "12011958", "05281977", "02202003", "06142017",
]
FIRE_DDMMYYYY = [
    "08101871", "02091666", "28111942", "25031911", "06051937",
    "30121903", "01121958", "28051977", "20022003", "14062017",
]
COCOANUT = ["cocoanutgrove", "cocoanutgrovefire", "coconutgrove", "cocoanut", "cocoanuts"]
FIRE_FIG = ["lightkeeper", "lighthousekeeper", "firekeeper", "watchman",
            "greatscott", "GreatScott", "beacon"]
FIRE_SONGS = ["lightmyfire", "light my fire", "ringoffire", "setfiretotherain",
              "fireandrain", "greatballsoffire", "discoinferno",
              "weididntstartthefire", "fireflies"]
DATES_DDMM = ["26091964", "27011967", "20071969", "08111963", "26111963"]

GROUPS = [("SHORTCUT/LEAP", SHORTCUT), ("64-suffix", SUFFIX64), ("Gilligan canon", GILLIGAN),
          ("fire MMDDYYYY", FIRE_MMDDYYYY), ("fire DDMMYYYY", FIRE_DDMMYYYY),
          ("cocoanut pun", COCOANUT), ("fire figures", FIRE_FIG),
          ("fire songs", FIRE_SONGS), ("DDMMYYYY dates", DATES_DDMM)]

ORDER = []
for _, g in GROUPS:
    for c in g:
        if c not in ORDER:
            ORDER.append(c)

LOG = r"C:\111\glimmer_batch2.log"
HITS = r"C:\111\glimmer_HITS.txt"


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
    with io.open(LOG, "w", encoding="utf-8") as f:
        f.write("batch2 start %s | %d candidates x %d locks\n"
                % (time.strftime("%H:%M:%S"), len(ORDER), len(TARGETS)))
    n = hits = 0
    for pid, label in TARGETS:
        log("=== %s (%s) ===" % (pid, label))
        for c in ORDER:
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
                log("  ERR %-20r %s" % (c, info))
            time.sleep(0.6)
        else:
            log("--- no hit on %s" % pid)
    log("batch2 done %s: %d requests, hits=%d" % (time.strftime("%H:%M:%S"), n, hits))
    return 0


if __name__ == "__main__":
    sys.exit(main())
