"""Dump verbatim author / permalink / body for every entry in the saved Reddit Atom feeds.

Read-only evidence extraction for the H7 community pass. Produces:
  feed_rational-Gain5010_comments.txt
  thread_wojppy_comments.txt
"""
import re
import html
import os

ENTRIES = re.compile(r'<entry>(.*?)</entry>', re.S)
NAME = re.compile(r'<name>(.*?)</name>')
HREF = re.compile(r'<link rel="alternate" href="(.*?)"')
HREF2 = re.compile(r'<link[^>]*href="(.*?)"')
PUB = re.compile(r'<published>(.*?)</published>')
TITLE = re.compile(r'<title>(.*?)</title>', re.S)
CONTENT = re.compile(r'<content[^>]*>(.*?)</content>', re.S)


def unesc(s):
    s = html.unescape(s)
    s = re.sub(r'<br\s*/?>', '\n', s)
    s = re.sub(r'<[^>]+>', ' ', s)
    s = re.sub(r'[ \t]+', ' ', s)
    s = re.sub(r'\n\s*\n+', '\n\n', s)
    return s.strip()


def dump(src, dst):
    raw = open(src, encoding='utf-8', errors='ignore').read()
    blocks = ENTRIES.findall(raw)
    with open(dst, 'w', encoding='utf-8') as fh:
        fh.write('source file: %s   entries: %d\n\n' % (src, len(blocks)))
        for b in blocks:
            name = (NAME.search(b) or [None, ''])[1] if NAME.search(b) else ''
            m = HREF.search(b) or HREF2.search(b)
            href = m.group(1) if m else ''
            title = unesc((TITLE.search(b).group(1)) if TITLE.search(b) else '')
            pub = (PUB.search(b).group(1) if PUB.search(b) else '')
            cm = CONTENT.search(b)
            body = unesc(cm.group(1)) if cm else ''
            body = re.sub(r'\s*submitted by\s*/u/\S+\s*(\[link\]|\[комментарии\]|\[comments\])*\s*', ' ', body).strip()
            fh.write('=' * 90 + '\n')
            fh.write('AUTHOR: %s\nPUBLISHED: %s\nTITLE: %s\nPERMALINK: %s\n--- BODY (verbatim) ---\n%s\n\n'
                     % (name, pub, title, href, body))
    print(dst, len(blocks), 'entries,', os.path.getsize(dst), 'bytes')


def main():
    dump('feed_rational-Gain5010.rss.xml', 'feed_rational-Gain5010_comments.txt')
    dump('thread_wojppy.rss.xml', 'thread_wojppy_comments.txt')


if __name__ == '__main__':
    main()
