"""Извлечение видимого текста из закешированных HTML защищённых страниц Wix (SLM)."""
import io
import re
import sys

CACHE = r"C:\Users\Admin\OneDrive\Desktop\master\puzzles\smith-lyle-moore-hunt-2-0-032btc\data\h2c_cache"

TEXT_KEYS = ["text", "desktopText", "mobileText", "title", "seoTitle", "description",
             "alt", "caption", "headerTitle", "buttonLabel", "passwordHint", "message"]


def main(files):
    for f in files:
        s = io.open(CACHE + "\\" + f, encoding="utf-8", errors="ignore").read()
        print("=" * 24, f, len(s))
        for k in TEXT_KEYS:
            pat = '"' + k + r'":\s*"((?:[^"\\]|\\.){2,300})"'
            found = []
            for m in re.finditer(pat, s):
                v = m.group(1).encode().decode("unicode_escape", "ignore")
                v = re.sub(r"<[^>]+>", " ", v)
                v = re.sub(r"\s+", " ", v).strip()
                if len(v) > 2 and v not in found:
                    found.append(v)
            if found:
                print("  [%s] %d" % (k, len(found)))
                for v in found[:40]:
                    print("      ", v[:220])
        # spans / divs с человекочитаемым текстом
        spans = []
        for m in re.finditer(r">([^<>{}=;&]{6,160})<", s):
            t = m.group(1)
            t = re.sub(r"\s+", " ", t).strip()
            if not t:
                continue
            if re.search(r"^[a-zA-Z0-9_$.:/-]+$", t):
                continue
            if re.search(r"(function|var |window|http|\.js|\.css|width|height|px\b)", t):
                continue
            if t not in spans:
                spans.append(t)
        print("  [visible-ish] %d" % len(spans))
        for t in spans[:60]:
            print("      ", t[:200])


if __name__ == "__main__":
    main(sys.argv[1:] or ["raft-escape.html", "smoke-signals.html"])
