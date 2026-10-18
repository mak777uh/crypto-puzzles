# -*- coding: utf-8 -*-
import datetime
import json
import os
import urllib.request

TMP = r"C:\Users\Admin\AppData\Local\Temp\opencode"

com = json.load(open(os.path.join(TMP, "rcodes_com.json"), encoding="utf-8"))["data"]
com.sort(key=lambda c: c.get("created_utc", 0))
out = []
out.append("n=%d" % len(com))
for c in com:
    t = datetime.datetime.utcfromtimestamp(c.get("created_utc", 0)).strftime("%m-%d %H:%M")
    body = (c.get("body") or "").replace("\n", " | ")
    out.append("[%s] u/%s (parent=%s): %s" % (t, c.get("author"), c.get("parent_id", "")[-8:], body))
    out.append("---")
open(os.path.join(TMP, "rcodes_comments.txt"), "w", encoding="utf-8").write("\n".join(out))

# download cipher image
url = "https://i.redd.it/jcb0bjps9l2h1.jpeg"
try:
    r = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    data = urllib.request.urlopen(r, timeout=40).read()
    open(os.path.join(TMP, "rcodes_cipher.jpeg"), "wb").write(data)
    print("image saved:", len(data))
except Exception as e:
    print("image ERR:", e)
print("comments written:", len(com))
