# -*- coding: utf-8 -*-
"""
guntis_ecdsa_screen_2026-10-18.py — математический экран подписей призового EOA.

Цель: атака на 8,6125 ETH по оси «ECDSA-нонсы», а НЕ перебор сид-фразы.
Шаги:
  1) список транзакций адреса приза (blockscout v2), отбор ИСХОДЯЩИХ (подписанных ключом приза);
  2) для каждой — r,s,v,type,chainId,nonce,gasPrice,gas,to,value,input через публичный JSON-RPC;
  3) пересчёт хеша сообщения z (legacy / EIP-155 / 2930 / 1559) и проверка подписи:
     восстановление pubkey из (r,s,v,z) и сверка с опубликованным несжатым pubkey + адресом;
  4) поиск ПОВТОРОВ r (и s), тривиальных значений, малых k (ведущие нули в r);
  5) если r повторился — ключ выводится арифметически: k=(z1-z2)/(s1-s2), d=(s1*k-z1)/r.
Контроль обязателен: без совпадения восстановленного pubkey/адреса негатив недействителен.

Big Pickle, 2026-10-18. Только чтение сети, никаких транзакций.
"""
import json
import urllib.request

ADDR = '0x9C2F44EFAd0c1E852a09dF9939e6DaF061140CaF'
PUB_UNCOMPRESSED = ('04e1a30fe567710a3592a56eb479d251fe7456e1f0791c39bf54691a50edab08b4'
                    '4904515ff30c07f354815bb2a45d83576ee8e320ab52058b35e715611fbc4f9d')
N = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141

RPCS = ['https://1rpc.io/eth', 'https://eth.llamarpc.com', 'https://cloudflare-eth.com',
        'https://rpc.ankr.com/eth', 'https://ethereum.publicnode.com']
OUT = r'C:\Users\Admin\OneDrive\Desktop\master\puzzles\guntis-vitolins-metamask-8-6eth\data\ecdsa_screen_2026-10-18.txt'

lines = []


def say(s=''):
    print(s)
    lines.append(str(s))


def http(url, data=None, headers=None):
    req = urllib.request.Request(url, data=data,
                                 headers=headers or {'User-Agent': 'Mozilla/5.0', 'Content-Type': 'application/json'})
    with urllib.request.urlopen(req, timeout=40) as r:
        return r.read()


def rpc(method, params):
    body = json.dumps({'jsonrpc': '2.0', 'id': 1, 'method': method, 'params': params}).encode()
    last = None
    for u in RPCS:
        try:
            j = json.loads(http(u, body))
            if 'result' in j:
                return j['result'], u
            last = j
        except Exception as e:
            last = e
    raise RuntimeError('RPC fail: %r' % (last,)) 


# ---------- RLP ----------
def _int(b):
    if b == 0:
        return b''
    return b.to_bytes((b.bit_length() + 7) // 8, 'big')


def rlp(x):
    if isinstance(x, int):
        return rlp(_int(x))
    if isinstance(x, bytes):
        if len(x) == 1 and x[0] < 0x80:
            return x
        return _enc(len(x), 0x80) + x
    if isinstance(x, str):
        return rlp(x.encode())
    if isinstance(x, list):
        body = b''.join(rlp(i) for i in x)
        return _enc(len(body), 0xc0) + body
    raise TypeError(type(x))


def _enc(l, off):
    if l < 56:
        return bytes([off + l])
    lb = _int(l)
    return bytes([off + 55 + len(lb)]) + lb


def keccak(b):
    from Crypto.Hash import keccak as k
    h = k.new(digest_bits=256)
    h.update(b)
    return h.digest()


def to_int(x):
    if x is None:
        return 0
    if isinstance(x, int):
        return x
    return int(x, 16) if isinstance(x, str) and x.startswith('0x') else int(x)


def zhash(tx):
    t = to_int(tx.get('type', 0))
    nonce = to_int(tx['nonce'])
    gas = to_int(tx['gas'])
    to = tx.get('to') or b''
    tob = bytes.fromhex(to[2:]) if to else b''
    val = to_int(tx['value'])
    data = bytes.fromhex((tx.get('input') or '0x')[2:])
    v = to_int(tx['v'])
    if t == 0:
        gp = to_int(tx.get('gasPrice') or 0)
        if v in (27, 28):
            return keccak(rlp([nonce, gp, gas, tob, val, data])), 'legacy'
        cid = (v - 35) // 2
        return keccak(rlp([nonce, gp, gas, tob, val, data, cid, 0, 0])), 'eip155(cid=%d)' % cid
    if t == 1:
        cid = to_int(tx.get('chainId') or 1)
        gp = to_int(tx.get('gasPrice') or 0)
        al = tx.get('accessList') or []
        return keccak(b'\x01' + rlp([cid, nonce, gp, gas, tob, val, data, al])), 'eip2930(cid=%d)' % cid
    if t == 2:
        cid = to_int(tx.get('chainId') or 1)
        mp = to_int(tx.get('maxPriorityFeePerGas') or 0)
        mf = to_int(tx.get('maxFeePerGas') or tx.get('gasPrice') or 0)
        al = tx.get('accessList') or []
        return keccak(b'\x02' + rlp([cid, nonce, mp, mf, gas, tob, val, data, al])), 'eip1559(cid=%d)' % cid
    return None, 'unsupported type %d' % t


def recover_pubkey(rs, recid, z):
    from coincurve import PublicKey
    sig = rs + bytes([recid])
    return PublicKey.from_signature_and_message(sig, z, hasher=None)


def main():
    say('=== ECDSA-экран призового EOA %s ===' % ADDR)
    say('опубликованный pubkey (несжатый): %s' % PUB_UNCOMPRESSED)
    # 1) транзакции
    url = 'https://eth.blockscout.com/api/v2/addresses/%s/transactions' % ADDR
    txs = []
    try:
        for pg in range(4):
            j = json.loads(http(url + ('?block_number=&index=' if pg == 0 else '?block_number=&index=')))
            break
    except Exception:
        pass
    try:
        j = json.loads(http('https://eth.blockscout.com/api/v2/addresses/%s/transactions' % ADDR))
        txs = j.get('items', [])
    except Exception as e:
        say('[!] blockscout недоступен: %r' % (e,))
    say('транзакций по адресу получено: %d' % len(txs))
    hast = []
    for t in txs:
        frm = ((t.get('from') or {}).get('hash') or '').lower()
        to_ = ((t.get('to') or {}) or {}).get('hash') or ''
        say('  %s  from=%s  to=%s  value=%s  %s' % (t.get('hash'), frm[:12], to_[:12],
                                                    t.get('value'), t.get('method') or ''))
        if frm == ADDR.lower():
            hast.append(t['hash'])
    if not hast:
        say('[!] исходящих не найдено через blockscout — беру хеши из реестра agntn (7 decrease).')
        hast = ['0xcf21ccdc94b490435909056531d165ad26eb78b8a2c7ad585376cc5febca0d1a',
                '0xd5fa39886433eed6bb2d18f3670ef881a9c7437768070ec3fc1749e5e89f8d7d',
                '0x751a87f5a2434a8a359e806fa446cf9873956a73e8c13e2de947fe0cd586c368',
                '0x459acd3020f1b6ba8b3123a44aa62df802c31641ad5424ecb3a34b2db0482c2b',
                '0xd53379648d1eadcd779d4546dd877bce6c0ce976777ebe6feaa372df3b9d841e',
                '0x5ecca9595fa278b7cc348ceecd6bd784be3c13540ece7be9bde4cd611cd243de',
                '0x3131dd70cd075e62d2d790e920f2049b7bb25d2640c8ecf534257aed01aa3134']
    say('подписей ключа приза (исходящих): %d' % len(hast))
    rows = []
    for h in hast:
        tx = None
        for _try in range(4):
            try:
                tx, used = rpc('eth_getTransactionByHash', [h])
            except Exception:
                tx = None
            if tx:
                break
        if not tx:
            try:
                j = json.loads(http('https://eth.blockscout.com/api?module=proxy&action=eth_getTransactionByHash&hash=%s' % h))
                tx = j.get('result')
            except Exception:
                tx = None
        if not tx:
            say('  [!] %s — RPC вернул null (4 попытки + blockscout proxy)' % h)
            continue
        r = to_int(tx['r']); s = to_int(tx['s']); v = to_int(tx['v'])
        if 'type' not in tx:
            if tx.get('maxFeePerGas') is not None:
                tx['type'] = 2
            elif tx.get('accessList') is not None:
                tx['type'] = 1
        z, kind = zhash(tx)
        cid = to_int(tx.get('chainId') or 0)
        ttype = to_int(tx.get('type', 0))
        if ttype == 0:
            recid = v - 27 if v in (27, 28) else v - 35 - 2 * cid
        else:
            recid = v  # typed tx: v = yParity (0/1)
        row = dict(hash=h, r=r, s=s, v=v, z=z, kind=kind, block=to_int(tx['blockNumber']),
                   value=to_int(tx['value']), recid=recid, nonce=to_int(tx['nonce']))
        if z is not None:
            try:
                pk = recover_pubkey(r.to_bytes(32, 'big') + s.to_bytes(32, 'big'), recid, z)
                unc = pk.format(compressed=False).hex()
                got_addr = '0x' + keccak(bytes.fromhex(unc)[1:])[-20:].hex()
                row['pub'] = unc
                row['ctrl'] = (unc == PUB_UNCOMPRESSED) and (got_addr.lower() == ADDR.lower())
                say('  %s nonce=%d %s k=%s' % (h[:14], row['nonce'], kind,
                                               'CONTROL-OK pubkey+адрес совпали' if row['ctrl'] else 'КОНТРОЛЬ НЕ ПРОШЁЛ'))
            except Exception as e:
                say('  %s recovery failed: %r' % (h[:14], e))
        rows.append(row)

    say('')
    say('--- таблица подписей ---')
    for x in rows:
        say('  blk=%d val=%-10s r=%064x\n            s=%064x' % (x['block'], x['value'], x['r'], x['s']))

    # 4) повторы
    say('')
    say('--- анализ нонсов/подписей ---')
    cnt = {}
    for x in rows:
        cnt[x['r']] = cnt.get(x['r'], 0) + 1
    dup = {r: c for r, c in cnt.items() if c > 1}
    if dup:
        say('*** ПОВТОР r НАЙДЕН ***')
        for r, c in dup.items():
            say('    r=%064x встречается %d раз' % (r, c))
            grp = [x for x in rows if x['r'] == r]
            for i in range(len(grp)):
                for j2 in range(i + 1, len(grp)):
                    a, b = grp[i], grp[j2]
                    if a['s'] == b['s']:
                        continue
                    k = ((a['z'] - b['z']) * pow(a['s'] - b['s'], -1, N)) % N
                    d = ((a['s'] * k - a['z']) * pow(a['r'], -1, N)) % N
                    say('    k=%064x' % k)
                    say('    d=%064x' % d)
    else:
        say('повторов r нет (%d уникальных из %d)' % (len(cnt), len(rows)))
    sset = {}
    for x in rows:
        sset[x['s']] = sset.get(x['s'], 0) + 1
    say('повторов s: %d' % sum(1 for c in sset.values() if c > 1))
    for x in rows:
        lead = 256 - x['r'].bit_length()
        say('  nonce=%d  ведущих нулей в r: %d  (s бит: %d)' % (x['nonce'], lead, x['s'].bit_length()))
    say('')
    say('--- вывод для HNP ---')
    t = len(rows)
    say('t = %d подписей; порог утечки ℓ >= ceil(256/t) = %d бит на подпись.' % (t, -(-256 // t) if t else -1))
    say('Для НЕсломанного RNG ожидаемая утечка ℓ≈0 → атака НЕ применима;')
    say('повтор r был бы решающим (не применили, если повторов нет).')
    open(OUT, 'w', encoding='utf-8').write('\n'.join(lines) + '\n')
    print('файл:', OUT)


main()
