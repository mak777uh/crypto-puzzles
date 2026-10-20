# -*- coding: utf-8 -*-
"""
bip39_check_2026-10-18.py — проверка наэкранных надписей видео на членство в BIP39.

Берёт словарь BIP39 из локальной копии knowledge_base (файл скачан github-intake'ом
2026-10-18 из noobsilence/crypto-puzzle-lab) и проверяет список надписей, которые
Big Pickle прочитал зрением в кадрах видео w4mpiuBP_aY 2026-10-18.

Big Pickle, 2026-10-18. Только чтение.
"""
import os

BASE = r'C:\Users\Admin\OneDrive\Desktop\master\puzzles\guntis-vitolins-metamask-8-6eth'
WL = os.path.join(BASE, 'data', 'github', 'noobsilence__crypto-puzzle-lab', 'files',
                  'knowledge_base', 'bip39_english.txt')

words = set()
with open(WL, encoding='utf-8', errors='replace') as f:
    for line in f:
        for tok in line.split():
            tok = tok.strip().lower()
            if tok.isalpha():
                words.add(tok)
print('словарь BIP39:', len(words), 'строк-токенов;', 'fog' in words, 'parrot' in words)

onscreen = [
    # оверлеи автора (единственный намеренный текст на экране)
    'sponsor', 'challenge', 'build', 'analyze', 'data', 'powerful',
    # логотип/бренд в кадре
    'mineshop', 'mining', 'hardware', 'rig', 'guntis', 'vitolins',
    # Etherscan на экране (320 с)
    'address', 'balance', 'ether', 'transactions', 'analytics', 'comments',
    'overview', 'fee', 'block', 'age', 'from', 'to', 'value', 'etherscan',
    # Google-запрос на экране (375 с)
    'ethereum', 'wallet', 'seed', 'phrase', 'reveal', 'mask', 'access', 'people',
    'device', 'what', 'able', 'help', 'word', 'such', 'also', 'page', 'share',
    # трекер портфеля / таблицы монет
    'portfolio', 'asset', 'digital', 'market', 'capital', 'total', 'price',
    'volume', 'supply', 'current', 'change', 'history', 'risk', 'farm', 'popular',
    'coin', 'token', 'link', 'basic', 'atom', 'dash', 'cash', 'gas', 'ocean',
    'fetch', 'ripple', 'wave', 'icon', 'gold', 'energy', 'power', 'oracle',
    # ютуб-UI в кадре
    'search', 'home', 'play', 'later', 'library', 'history', 'subscribe',
    'join', 'chat', 'follow', 'share', 'panda', 'news',
]

print()
print('%-14s %s' % ('надпись', 'BIP39?'))
hit, miss = [], []
for w in onscreen:
    ok = w in words
    (hit if ok else miss).append(w)
    print('%-14s %s' % (w, 'ДА' if ok else 'нет'))

print()
print('BIP39-члены среди надписей (%d): %s' % (len(hit), ', '.join(sorted(set(hit)))))
print('не BIP39 (%d): %s' % (len(miss), ', '.join(sorted(set(miss)))))
