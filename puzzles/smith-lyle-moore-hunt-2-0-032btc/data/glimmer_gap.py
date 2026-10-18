# -*- coding: utf-8 -*-
"""Diff my candidate batches against the 2479 strings ALREADY tried (handoff section 8)."""
import io
import re

HANDOFF = r"C:\Users\Admin\Downloads\GLIMMER_HANDOFF.txt"

with io.open(HANDOFF, encoding="utf-8") as f:
    lines = f.read().split("\n")

tried_raw = lines[1115:3596]          # section 8 body
tried = set()
for ln in tried_raw:
    s = ln.strip()
    if not s or s.startswith("#"):
        continue
    tried.add(s.lower())
    tried.add(s.lower().replace(" ", "").replace("-", "").replace("_", ""))

print("tried strings parsed: %d" % len(tried))

BATCH1 = """777 666 FFFFFFFFFFF fffffffffff FFFFFFFFFF fffffffff 01271967 07201969 4samcodeartist
codebreaker11 virtual moon fortune all man kind one giant step into digital morse00100001
tomorrow0010000 supernova north64 south64 east64 west64 wavebreaker7109 mobydick69420
electricfeel64 youshallpass47 witchoftheeast 20000leagues 2hours40minutes amphitrite albatross
semaphore glimmer closerandcloser huntgathwhalblo shiphuntshalpar michaelphelps seahitchhiker
sleighride pirate bay escape vampire Gilligan Jonas Thurston Lovey Ginger Dr. Roy Mary Ann
lumber maple ocean love message six marine north RaftBuilt raft built raftbuilt raft-escape
raftescape raft escape desertedisland deserted island palmtree palmtreewood palm tree wood
coconut coconuts shark castaway cast away kon-tiki kontiki hucksfinn huck finn pyromaniac
Pyromaniac F f pressf pressftopayrespects lightafire light a fire lightafirealert smokesignals
smoke signals smoke-signals fire Fire campfire signal fire signal-fire smokeybear prometheus
katniss firestarter tinder flint spark beacon bonfire wildfire fight FIGHT Fight fight!
fightthemoff fight them off fightback fight back piratebattle pirate battle adrenaline
youshallnotpass47 imalovernotafighter nope lol nopelol sword swords cutlass musket cannon
blackbeard jollyroger jolly roger""".split("\n")

B1 = [x for ln in BATCH1 for x in ln.split() if x]

B2 = """onegiantleap "one giant leap" onegiantleapformankind "one giant leap for mankind" giantleap
"giant leap" babysteps "baby steps" thebabysteps onestep onesmallstep rainbowroad "rainbow road"
rainbowroad64 shortcut theshortcut n64 nintendo64 nintendosixtyfour raft64 Raft64 palm64
palmtree64 coconut64 coconuts64 island64 escape64 gilligan64 minnow64 skipper64 hut64 beach64
desertedisland64 fire64 smoke64 smokesignal64 smokesignals64 signal64 lightafire64 beacon64
sos64 campfire64 Skipper Minnow "S.S. Minnow" ssminnow Howell "Thurston Howell" "Lovey Howell"
Professor theProfessor "the Professor" Hinkley "Roy Hinkley" Grumby "Jonas Grumby"
"Mary Ann Summers" "Ginger Grant" threehourtour 3hourtour athreehourtour threehour
justsitrightback gilligansisle balladofgilligansisle 10081871 02091666 11281942 03251911
05061937 12301903 12011958 05281977 02202003 06142017 08101871 28111942 25031911 06051937
30121903 01121958 28051977 20022003 14062017 cocoanutgrove cocoanutgrovefire coconutgrove
cocoanut cocoanuts lightkeeper lighthousekeeper firekeeper watchman greatscott GreatScott
beacon lightmyfire "light my fire" ringoffire setfiretotherain fireandrain greatballsoffire
discoinferno weididntstartthefire fireflies 26091964 27011967 20071969 08111963 26111963""".split("\n")

B2c = []
for ln in B2:
    for m in re.findall(r'"([^"]+)"|(\S+)', ln):
        v = m[0] or m[1]
        if v:
            B2c.append(v)


def is_tried(c):
    k1 = c.lower()
    k2 = k1.replace(" ", "").replace("-", "").replace("_", "").replace(".", "")
    return k1 in tried or k2 in tried


print("\n--- BATCH 1 (already run, 127) ---")
new1 = [c for c in B1 if not is_tried(c)]
old1 = [c for c in B1 if is_tried(c)]
print("already tried before my run: %d" % len(old1))
print("genuinely new in batch1    : %d -> %s" % (len(new1), ", ".join(new1[:40])))

print("\n--- BATCH 2 (running now) ---")
new2 = [c for c in B2c if not is_tried(c)]
old2 = [c for c in B2c if is_tried(c)]
print("already tried: %d" % len(old2))
print("  redundant: %s" % ", ".join(sorted(set(old2))[:60]))
print("genuinely new: %d" % len(new2))
for c in sorted(set(new2)):
    print("   NEW: %s" % c)
