# -*- coding: utf-8 -*-
"""
Оси A и C финального прохода (Big Pickle, 2026-10-18).

Ось A — «ландмарк» внутри btcseed-семейства (Telegram 75244 / 75172, Boulayo,
метод не раскрыт): ищем дословные словарные маркеры (>=5 букв) и ранжируем
10-символьные окна по английской биграммной модели; плюс проверяем 18 индексов.
Ось C — DBBI = подстановочный sha256-хекс (applelamps L5): предикат почти
безошибочный (2^-211.7), поэтому большой словарь допустим.

Предрегистрация: LOG.md, раздел «финальный проход (оси A и C)».
Без затрат, локально, <=15 мин. Пишет отчёт в data/final_axes_ac_2026-10-18.out.txt
"""
import hashlib
import os
import re
import sys

G = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(G, 'data', 'final_axes_ac_2026-10-18.out.txt')
S570 = os.path.join(G, 'data', 's570_bifid_2026-10-17.txt')
WALK = os.path.join(G, 'data', 'github_2026-10', 'testnetbtc__GSMG', 'files',
                    'walkthrough', '10_frontier_dbbi_faed_btcseed.md')
WORDS_ALPHA = (r'C:\Users\Admin\OneDrive\Desktop\master\puzzles'
               r'\smith-lyle-moore-hunt-2-0-032btc\data\words_alpha.txt')
BIP39 = (r'C:\Users\Admin\OneDrive\Desktop\master\puzzles'
         r'\seed-phrase-com-metaneer-0-01btc\data\bip39-english.txt')

_lines = []


def log(s=''):
    s = str(s)
    _lines.append(s)
    try:
        print(s, flush=True)
    except Exception:
        print(s.encode('ascii', 'replace').decode('ascii'), flush=True)


def sha256_hex(b):
    return hashlib.sha256(b).hexdigest()


# ------------------------------------------------------------------ объекты
def load_objects():
    raw = open(S570, encoding='utf-8', errors='replace').read().splitlines()
    fld = {}
    for i, l in enumerate(raw):
        t = l.strip()
        for key in ('BIFID570', 'ODD285', 'KEPT256', 'DROPPED29'):
            if t.startswith(key) and i + 1 < len(raw) and key not in fld:
                nxt = raw[i + 1].strip()
                if nxt and not nxt.startswith('#'):
                    fld[key] = nxt
    bifid = fld['BIFID570']
    odd = fld['ODD285']
    kept = fld['KEPT256']
    dropped = fld['DROPPED29']

    w = open(WALK, encoding='utf-8', errors='replace').read()
    flat = re.sub(r'\s+', '', w)
    runs = sorted(re.findall(r'[a-i]+', flat), key=len)
    faed = runs[-1] if runs else ''
    assert len(faed) == 570, len(faed)
    dbbi = None
    for l in w.splitlines():
        t = l.strip()
        if re.fullmatch(r'd[a-i]{90}', t):
            dbbi = t
            break
    assert dbbi, 'DBBI not found'

    even = bifid[0::2]
    odd2 = bifid[1::2]
    odd_noio = ''.join(c for c in odd2 if c not in 'IO')
    return dict(BIFID570=bifid, EVEN285=even, ODD285=odd2, ODD_noIO=odd_noio,
                KEPT256=kept, DROPPED29=dropped, DBBI=dbbi, FAED=faed)


EXPECT = {
    'DBBI': '71fe46259e270c113529dfaded4b59c59a9dffd826a7202ab07fc498b6a2c5ca',
    'FAED': '066191b4aafc114fbca7f0d168382f40129c4ff18490375b689741081d5ef3c2',
    'BIFID570': '0c5d984f90e9baefc09f1d3888e62acbd101f9b0194887e2ae88fc6c9967745e',
}


# --------------------------------------------------------------- словари
def load_english():
    s = set()
    with open(WORDS_ALPHA, encoding='utf-8', errors='replace') as f:
        for l in f:
            t = l.strip().lower()
            if 5 <= len(t) <= 20 and t.isalpha():
                s.add(t)
    with open(BIP39, encoding='utf-8', errors='replace') as f:
        for l in f:
            t = l.strip().lower()
            if 5 <= len(t) <= 20 and t.isalpha():
                s.add(t)
    return s


TEXT_EXT = {'.md', '.txt', '.py', '.json', '.html', '.csv'}
TOKEN_RE = re.compile(r'[A-Za-z]{4,}')
BUDGET = 80 * 1024 * 1024


def scan_corpus_texts():
    """Читает текстовые файлы папки пазла (бюджет 80 МБ) -> тексты."""
    texts = []
    total = 0
    for root, dirs, files in os.walk(G):
        dirs[:] = [d for d in dirs if d not in ('.git', '__pycache__')]
        for fn in files:
            ext = os.path.splitext(fn)[1].lower()
            if ext not in TEXT_EXT:
                continue
            fp = os.path.join(root, fn)
            try:
                sz = os.path.getsize(fp)
            except OSError:
                continue
            if sz == 0 or sz > 12 * 1024 * 1024:
                continue
            if total + sz > BUDGET:
                continue
            try:
                with open(fp, encoding='utf-8', errors='replace') as f:
                    texts.append(f.read())
                total += sz
            except OSError:
                pass
    return texts, total


CURATED = """
matrixsumlist lastwordsbeforearchichoice thispassword yinyang yellowblueprimes
yellow blue primes shabef shabefourfirsthintisyourlastcommand shabefanstoo
ourfirsthintisyourlastcommand enter yourlastcommand ourlastcommand
btcseed theprivatekeyandbetterhalf privatekey betterhalf
hillfexmgsgq fexmgsgq esljapkmedakl dbifhceg dbifhcega
theseedisplanted causality theflowerblossomsthroughwhatseemstobeaconcretesurface
hashthetext hash the text followthewhiterabbit theproblemis
youwon incaseyoumanagetocrackthis theprivatekeysbelongtohalfandbetterhalf
casey cypher neo trinity morpheus architect theone thesource
reinsertingtheprimebasics primality zerotheseout zeroedout
jacobgreenberg greenberg gsmg gsmgio
rose roses whitewalkingbanks
"""


def load_tokens(texts):
    toks = set()
    for t in texts:
        for m in TOKEN_RE.finditer(t):
            toks.add(m.group(0).lower())
    for m in TOKEN_RE.finditer(CURATED):
        toks.add(m.group(0).lower())
    return toks


# ------------------------------------------------------------------ ось A
def bigram_table(english):
    bg = {}
    tot = 0
    for w in english:
        for i in range(len(w) - 1):
            bg[w[i:i + 2]] = bg.get(w[i:i + 2], 0) + 1
            tot += 1
    import math
    return {k: math.log((v + 0.5) / tot) for k, v in bg.items()}, math.log(0.5 / tot)


def axis_a(objs, english, tokens, curated):
    log('=' * 78)
    log('ОСЬ A — ландмарк в btcseed-семействе')
    log('=' * 78)
    for name in ('BIFID570', 'EVEN285', 'ODD285', 'ODD_noIO', 'KEPT256', 'DBBI', 'FAED'):
        s = objs[name]
        log('  %-10s len=%3d  sha256=%s  (уникальных букв: %d)' %
            (name, len(s), sha256_hex(s.encode())[:16], len(set(s))))

    # --- A1: словарный скан ---
    # ВАЖНО: корпусные токены самореферентны (объекты сами лежат в файлах папки),
    # поэтому «сигналом» считаем только англ. словарь и КУРИРОВАННЫЙ список
    # токенов пазла с длиной >=5, не являющийся подстрокой самих объектов.
    log('')
    log('A1. Словарный скан подстрок 5..24 (англ. словарь %d; курированные токены %d)' %
        (len(english), len(curated)))
    dicts = {'EN': english, 'CUR': curated}
    hits = []
    for name in ('BIFID570', 'EVEN285', 'ODD285', 'ODD_noIO', 'KEPT256', 'DROPPED29',
                 'DBBI', 'FAED'):
        base = objs[name]
        for orient, s in (('fwd', base), ('rev', base[::-1])):
            low = s.lower()
            n = len(low)
            for L in range(5, min(24, n) + 1):
                for i in range(0, n - L + 1):
                    sub = low[i:i + L]
                    for tag, d in dicts.items():
                        if sub in d:
                            hits.append((L, tag, name, orient, i, sub))
    hits.sort(key=lambda h: (-h[0], h[1], h[2]))
    log('   попаданий (EN+CUR): %d' % len(hits))
    for L, tag, name, orient, i, sub in hits[:80]:
        log('     L=%2d %s %-9s %-3s pos=%3d  %s' % (L, tag, name, orient, i, sub))
    if not hits:
        log('     НИ ОДНОГО словарного слова/токена >=5 букв ни в одном объекте/ориентации')
    n_en = sum(1 for h in hits if h[1] == 'EN')
    log('   из них англ. слов: %d; курированных токенов: %d' % (n_en, len(hits) - n_en))

    # --- A1-null: перестановки букв с сохранением частот ---
    import random
    rnd = random.Random(20261018)
    REPS = 40
    null_by_len = {}
    obs_by_len = {}
    for L, tag, name, orient, i, sub in hits:
        obs_by_len[L] = obs_by_len.get(L, 0) + 1
    for name in ('BIFID570', 'EVEN285', 'ODD285', 'ODD_noIO', 'KEPT256', 'DROPPED29',
                 'DBBI', 'FAED'):
        base = objs[name]
        arr = list(base)
        for _ in range(REPS):
            rnd.shuffle(arr)
            low = ''.join(arr).lower()
            n = len(low)
            for L in range(5, min(24, n) + 1):
                for i in range(0, n - L + 1):
                    if low[i:i + L] in curated or low[i:i + L] in english:
                        null_by_len[L] = null_by_len.get(L, 0) + 1
    log('   НУЛЬ-КОНТРОЛЬ (перестановки букв, %d реплик на объект):' % REPS)
    log('   L : наблюдено | ожидание(шум)')
    for L in sorted(set(list(obs_by_len) + list(null_by_len))):
        obs = obs_by_len.get(L, 0)
        exp = null_by_len.get(L, 0) / float(REPS)
        log('   %2d : %8d | %8.2f' % (L, obs, exp))

    # --- A1b: z-score окон по англ. биграммной модели ---
    log('')
    log('A1b. Окна длины 10 (и 8..12) с наибольшим z-score по англ. биграммам')
    bt, unk = bigram_table(english)

    def score(s):
        s = s.lower()
        return sum(bt.get(s[i:i + 2], unk) for i in range(len(s) - 1)) / (len(s) - 1)

    import statistics
    for name in ('BIFID570', 'ODD285', 'ODD_noIO', 'KEPT256', 'EVEN285', 'DBBI', 'FAED'):
        base = objs[name]
        for L in (10,):
            if L >= len(base):
                continue
            vals = [score(base[i:i + L]) for i in range(0, len(base) - L + 1)]
            mu = statistics.mean(vals)
            sd = statistics.pstdev(vals) or 1e-9
            top = sorted(range(len(vals)), key=lambda i: -vals[i])[:10]
            log('   -- %s L=%d: μ=%.2f σ=%.2f' % (name, L, mu, sd))
            for i in top:
                log('      z=%+5.2f pos=%3d  %s' % ((vals[i] - mu) / sd, i, base[i:i + L]))
    # сводный топ-15 по всем объектам для L=10
    allc = []
    for name in ('BIFID570', 'ODD285', 'ODD_noIO', 'KEPT256', 'EVEN285', 'DBBI', 'FAED'):
        base = objs[name]
        L = 10
        vals = [score(base[i:i + L]) for i in range(0, len(base) - L + 1)]
        mu = statistics.mean(vals)
        sd = statistics.pstdev(vals) or 1e-9
        for i, v in enumerate(vals):
            allc.append(((v - mu) / sd, name, i, base[i:i + L]))
    allc.sort(key=lambda c: -c[0])
    log('   == СВОДНЫЙ топ-15 окон L=10 по всем объектам ==')
    for z, name, i, w in allc[:15]:
        log('      z=%+5.2f %-9s pos=%3d  %s' % (z, name, i, w))

    # --- A2: 18 индексов Boulayo ---
    log('')
    log('A2. 18 индексов Boulayo: 51,49,43,45,32,50,36,12,44,14,40,34,41,43,20,30,56,52')
    IDX = [51, 49, 43, 45, 32, 50, 36, 12, 44, 14, 40, 34, 41, 43, 20, 30, 56, 52]
    for name in ('BIFID570', 'ODD285', 'ODD_noIO', 'KEPT256', 'DBBI', 'FAED'):
        base = objs[name]
        n = len(base)
        res = []
        for off, lab in ((0, '0b'), (1, '1b')):
            for rev, rlab in ((False, 'fwd'), (True, 'rev')):
                order = list(reversed(IDX)) if rev else IDX
                out = []
                ok = True
                for i in order:
                    j = i + off
                    if 0 <= j < n:
                        out.append(base[j])
                    else:
                        ok = False
                        out.append('?')
                res.append('%s.%s: %s' % (lab, rlab, ''.join(out)))
        log('   -- %s (n=%d)' % (name, n))
        for r in res:
            log('      %s' % r)
    log('')


# ------------------------------------------------------------------ ось C
PUB_PATTERN = '01234556728966286abc61c8b48de3086dd501d5557d6bab5605233df7bbb96'


def tokenize_dbbi(s):
    """b и g начинают 2-символьные токены, остальные буквы — одиночные."""
    toks = []
    i = 0
    n = len(s)
    while i < n:
        if s[i] in 'bg' and i + 1 < n:
            toks.append(s[i:i + 2])
            i += 2
        else:
            toks.append(s[i])
            i += 1
    return toks


def canon(h):
    m = {}
    out = []
    for ch in h:
        if ch not in m:
            m[ch] = len(m)
        out.append('0123456789abcdef'[m[ch]])
    return ''.join(out)


def axis_c(objs, english, tokens, texts):
    log('=' * 78)
    log('ОСЬ C — DBBI как подстановочный sha256-хекс (паттерн равенства)')
    log('=' * 78)
    # публичный паттерн берём ИЗ ДОКУМЕНТА (а не из литерала в коде)
    pub = None
    try:
        doc = open(os.path.join(G, 'data', 'github_2026-10', 'applelamps__GSMG-CLEAN',
                                'files', '03_OPEN_LEADS.md'),
                   encoding='utf-8', errors='replace').read()
        mm = re.search(r'first-seen order\) is .([0-9a-f]{40,80}).', doc)
        if mm:
            pub = mm.group(1)
    except OSError:
        pass
    if pub is None:
        pub = PUB_PATTERN
    dbbi = objs['DBBI']
    toks = tokenize_dbbi(dbbi)
    codes = []
    seen = {}
    for t in toks:
        if t not in seen:
            seen[t] = len(seen)
        codes.append(seen[t])
    pat = ''.join('0123456789abcdef'[c] for c in codes)
    log('  токенов: %d   различных кодов: %d' % (len(toks), len(seen)))
    log('  паттерн(пересчёт): %s' % pat)
    log('  паттерн(публично): %s  (len=%d)' % (pub, len(pub)))
    log('  КОНТРОЛЬ-1 (паттерн совпал с опубликованным): %s' % ('ДА' if pat == pub else 'НЕТ'))

    # кандидаты
    cands = set()
    for w in english:
        cands.add(w)
    for t in tokens:
        if 4 <= len(t) <= 60:
            cands.add(t)
    KEY = ('DBBI', 'FAED', 'BIFID570', 'ODD285', 'ODD_noIO', 'KEPT256')
    for name in KEY:
        s = objs[name]
        for L in range(4, min(65, len(s)) + 1):
            for i in range(0, len(s) - L + 1):
                cands.add(s[i:i + L])
    # строки корпусных текстов (ответы стадий — это фразы/строки)
    for t in texts:
        for line in t.splitlines():
            s = line.strip()
            if 4 <= len(s) <= 80:
                cands.add(s)
    # внешние наборы кандидатов на диске
    EXTRA = (r'C:\Users\Admin\OneDrive\Desktop\master\puzzles'
             r'\bitaddress-bip38-giveaway-0-005297btc\data\cands_corpus.txt',
             r'C:\Users\Admin\OneDrive\Desktop\master\_sources\KNOWN_SET_2026-10-18.txt')
    for fp in EXTRA:
        if os.path.exists(fp):
            with open(fp, encoding='utf-8', errors='replace') as f:
                for line in f:
                    s = line.strip()
                    if 4 <= len(s) <= 80:
                        cands.add(s)
            log('  внешний набор: %s' % os.path.basename(fp))
    log('  базовых кандидатов (unique): %d' % len(cands))

    variants = []
    for c in cands:
        variants.append(c)
        variants.append(c.upper())
        if c:
            variants.append(c[0].upper() + c[1:])
    log('  вариантов (reg): %d' % len(variants))

    def views(x):
        b = x.encode('utf-8', 'ignore')
        d1 = hashlib.sha256(b).digest()
        h1 = d1.hex()
        return (h1,
                hashlib.sha256(h1.encode()).hexdigest(),
                hashlib.sha256(h1.upper().encode()).hexdigest(),
                hashlib.sha256(d1).hexdigest())

    hits = []
    n = 0
    for x in variants:
        n += 1
        for vi, h in enumerate(views(x)):
            if canon(h) == pat:
                hits.append((x, vi, h))
    log('  просмотрено кандидатов: %d  (x4 вида хеша)' % n)
    log('  СОВПАДЕНИЙ: %d' % len(hits))
    for x, vi, h in hits[:20]:
        log('    !! %r view=%d %s' % (x, vi, h))

    # контроль 2: случайные строки не должны давать совпадений
    import random
    rnd = random.Random(20261018)
    rand_hits = 0
    for _ in range(200000):
        s = ''.join(rnd.choice('abcdefghijklmnopqrstuvwxyz') for _ in range(rnd.randint(6, 24)))
        for h in views(s):
            if canon(h) == pat:
                rand_hits += 1
    log('  КОНТРОЛЬ-2 (200000 случайных строк дают совпадений): %d' % rand_hits)
    log('')


def main():
    objs = load_objects()
    log('ПРОВЕРКА КОНТРОЛЬНЫХ ХЕШЕЙ ОБЪЕКТОВ:')
    ok = True
    for k, want in EXPECT.items():
        got = sha256_hex(objs[k].encode())
        flag = 'OK' if got == want else 'РАСХОЖДЕНИЕ'
        if got != want:
            ok = False
        log('  %-9s %s %s' % (k, got[:32], flag))
    log('  длины: DBBI=%d FAED=%d BIFID570=%d ODD_noIO=%d KEPT256=%d' %
        (len(objs['DBBI']), len(objs['FAED']), len(objs['BIFID570']),
         len(objs['ODD_noIO']), len(objs['KEPT256'])))
    if not ok:
        log('!!! контрольный хеш не совпал — прогон недостоверен')
        return 1

    eng = load_english()
    texts, total = scan_corpus_texts()
    toks = load_tokens(texts)
    curated = set(m.group(0).lower() for m in TOKEN_RE.finditer(CURATED))
    log('словари: англ=%d, токены пазла=%d, курированные=%d, прочитано текста=%.1f МБ,'
        ' файлов=%d' % (len(eng), len(toks), len(curated), total / 1048576.0, len(texts)))
    log('')
    axis_a(objs, eng, toks, curated)
    axis_c(objs, eng, toks, texts)

    with open(OUT, 'w', encoding='utf-8') as f:
        f.write('\n'.join(_lines) + '\n')
    log('ОТЧЁТ: %s' % OUT)
    return 0


if __name__ == '__main__':
    sys.exit(main())
