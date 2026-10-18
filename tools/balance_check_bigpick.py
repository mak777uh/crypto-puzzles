# -*- coding: utf-8 -*-
"""Balance check fast pass (Big Pickle, 2026-10-17).
Checks key escrows via public APIs. Read-only.
"""
import json
import sys
import urllib.request

TIMEOUT = 25

BTC = [
    ("Genesis (проверка слуха о claim)", "bc1qfkhx02v89u2qyyyljeczw6hu9sr437y44t7ae5yf09thrdukfqesnjg2wj"),
    ("GSMG prize", "1GSMG1JC9wtdSwfwApgj2xcmJPAwx7prBe"),
    ("SLM Glimmer", "bc1q0akdjvrc2csau2n3gyxa3xcq0fss852x997m9y"),
    ("Oobit #139", "1KKtnqLdK17ndRRwF8zaKZH6FSkSmTN6fk"),
    ("School of Bitcoin", "bc1qcsdfkaqgy9ux668vmzflzqsyg0qtspncymt5ed"),
    ("Zden HALV", "1crypto24HCr178iMcKd5iUi5D4rsg1nK"),
    ("Bitcoin Coders #07", "bc1qj7xsxrlgmnnrqwvlakacc5yrh33h2n3xaa0m09"),
    ("Trithemius wealth-in-poetry", "1K4ezpLybootYF23TM4a8Y4NyP7auysnRo"),
    ("BLM Brave New World", "1KfZGvwZxsvSmemoCmEV75uqcNzYBHjkHZ"),
    ("Quizchain RBB", "14zMkTgaVXJcxdh4JdWi29MLRR44iUSG9W"),
    ("bitaddress BIP38", "1J7BVeP8JK4op2X3GN3Hy7xkTnGnQTMpou"),
    ("kTimesG Phy", "bc1qrpn28qa82uyjg37dvsz3w7wpm3kpdea957nm9p"),
    ("seed-phrase.com", "bc1q7x3p3rkmkxgf20n3apkccqcmn5mdtsf8zx5227"),
    ("Walking Banks #0", "bc1qxy4tf0s4n7x9w24rawf9qsxh2hyljrmvyrhwzt"),
    ("Walking Banks #1", "bc1q4qc24xk5cehc4t7vr264zldsms2kmxf86jqjau"),
    ("Corey kitten", "bc1qcyrndzgy036f6ax370g8zyvlw86ulawgt0246r"),
    ("The Great Riddle", "bc1qm3ayuhn7wppuqxaywu8ea0lggs8myy7543fekk"),
    ("Exitonly #14", "bc1q5rjy2cdfy4n4dkk4r6pxtwqlm8tgjcc2dj0ee9"),
    ("bitaps Shamir", "bc1qyjwa0tf0en4x09magpuwmt2smpsrlaxwn85lh6"),
    ("WIF500", "1PfNh5fRcE9JKDmicD2Rh3pexGwce1LqyU"),
    ("PTG (LTC-адрес в BTC-проверке пропустим)", None),
    ("RushWallet #30", "13Q8hJqagtd77ojdJcEZPjTz2sBFSsYxyj"),
    ("Groestlcoin (GRS, chainz)", None),
]

ETH = [
    ("Guntis", "0x9C2F44EFAd0c1E852a09dF9939e6DaF061140CaF"),
    ("Crypto Puzzles 2018 #2", "0x1fa8Be9De5bBFE047C72dB8E8E3257128F7661ad"),
    ("Fe Bountiful registry", "0x71fB6afcD98c5BD611712ad4b8D314EF729aa69D"),
    ("Teikhos C1", "0x17e5e0910b9185b0ede564dcbf074ca910ad56a4"),
    ("Teikhos C2", "0xd7c6d542f3dcdceda845112b8fd567b8f8655805"),
    ("Teikhos 9732", "0x973c2178b09225d1de3ab037d40b3f24af696255"),
    ("Teikhos AEC7", "0xaec7e8c221c3fd24e75c996e32289235fd899ebf"),
    ("Arweave #11 (ETH)", "0xFF2142E98E09b5344994F9bEB9C56C95506B9F17"),
]


def get(url):
    req = urllib.request.Request(url, headers={"User-Agent": "curl/8.0"})
    with urllib.request.urlopen(req, timeout=TIMEOUT) as r:
        return json.loads(r.read().decode())


def check_btc(addr):
    d = get(f"https://blockstream.info/api/address/{addr}")
    chain = d["chain_stats"]
    mem = d["mempool_stats"]
    funded = chain["funded_txo_sum"] + mem["funded_txo_sum"]
    spent = chain["spent_txo_sum"] + mem["spent_txo_sum"]
    txs = chain["tx_count"] + mem["tx_count"]
    return funded, spent, txs


def check_eth(addr):
    d = get(f"https://ethereum-rpc.publicnode.com")
    req = urllib.request.Request(
        d if False else "https://ethereum-rpc.publicnode.com",
        headers={"User-Agent": "curl/8.0"},
    )
    payload = json.dumps({
        "jsonrpc": "2.0", "id": 1, "method": "eth_getBalance",
        "params": [addr, "latest"],
    }).encode()
    rq = urllib.request.Request(
        "https://ethereum-rpc.publicnode.com", data=payload,
        headers={"Content-Type": "application/json", "User-Agent": "curl/8.0"},
    )
    with urllib.request.urlopen(rq, timeout=TIMEOUT) as r:
        res = json.loads(r.read().decode())
    wei = int(res["result"], 16)
    return wei / 1e18


def main():
    print("== BTC (blockstream) ==")
    for name, addr in BTC:
        if not addr:
            continue
        try:
            f, s, t = check_btc(addr)
            print(f"{name:38s} {addr[:20]:22s} funded={f:>14,} spent={s:>14,} txs={t}")
        except Exception as e:
            print(f"{name:38s} ERR {e}")

    print()
    print("== ETH (publicnode) ==")
    for name, addr in ETH:
        try:
            bal = check_eth(addr)
            print(f"{name:38s} {addr} = {bal:.6f} ETH")
        except Exception as e:
            print(f"{name:38s} ERR {e}")

    print()
    print("== GRS (chainz) ==")
    try:
        req = urllib.request.Request(
            "https://chainz.cryptoid.info/grs/api.dws?q=getbalance&active=FindKEYLrVaahtkaVRk8KTspRMyWxfUi3i",
            headers={"User-Agent": "curl/8.0"},
        )
        with urllib.request.urlopen(req, timeout=TIMEOUT) as r:
            print("Groestlcoin FindKEY… balance =", r.read().decode())
    except Exception as e:
        print("GRS ERR", e)

    print()
    print("== LTC (blockcypher) ==")
    try:
        d = get("https://api.blockcypher.com/v1/ltc/main/addrs/LUtL7qnm3gzxKjHcfVLSjydqhhinTVmTmS/balance")
        print(f"PTG balance={d['balance']:,} unspent={d['unconfirmed_balance']:,} n_tx={d['n_tx']}")
    except Exception as e:
        print("LTC ERR", e)


if __name__ == "__main__":
    main()
