#!/usr/bin/env python3
"""Live balance check for catalog prizes (read-only, public APIs).

Author: DSH agent (deepseek-v4.1-flash), 2026-10-17.
Writes nothing except stdout; results are pasted into puzzle LOG/README by hand.
"""
import json
import sys
import urllib.request

UA = {"User-Agent": "Mozilla/5.0 (dsh-balance-check)"}
TIMEOUT = 25


def get(url):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=TIMEOUT) as r:
        return json.loads(r.read().decode("utf-8", "replace"))


BTC = {
    "oobit-139": "1KKtnqLdK17ndRRwF8zaKZH6FSkSmTN6fk",
    "seed-phrase.com": "bc1q7x3p3rkmkxgf20n3apkccqcmn5mdtsf8zx5227",
    "school-of-bitcoin": "bc1qcsdfkaqgy9ux668vmzflzqsyg0qtspncymt5ed",
    "bitaddress-bip38": "1J7BVeP8JK4op2X3GN3Hy7xkTnGnQTMpou",
    "bitcoin-coders-07": "bc1qj7xsxrlgmnnrqwvlakacc5yrh33h2n3xaa0m09",
    "zden-halv": "1crypto24HCr178iMcKd5iUi5D4rsg1nK",
    "cryptopuzzles-eth-mBTC": "1PUzZ61FSVTn12CafJC85Vy1ts3BoFcXdU",
    "blm-brave-new-world": "1KfZGvwZxsvSmemoCmEV75uqcNzYBHjkHZ",
    "genesis-block-wallet": "bc1qfkhx02v89u2qyyyljeczw6hu9sr437y44t7ae5yf09thrdukfqesnjg2wj",
    "gsmg": "1GSMG1JC9wtdSwfwApgj2xcmJPAwx7prBe",
    "commander-u-riddle": "1KDUcZh5Z6H1of4Pwoy5ojJtkQxcQBHhnH",
    "rushwallet-30": "13Q8hJqagtd77ojTJcEZPjTz2sBFSsYxyj",
    "walking-banks-100k": "bc1qxy4tf0s4n7x9w24rawf9qsxh2hyljrmvyrhwzt",
    "walking-banks-700k": "bc1q4qc24xk5cehc4t7vr264zldsms2kmxf86jqjau",
    "corey-kitten": "bc1qcyrndzgy036f6ax370g8zyvlw86ulawgt0246r",
    "great-riddle": "bc1qm3ayuhn7wppuqxaywu8ea0lggs8myy7543fekk",
    "onfo-forsyth": "157dpLJgAAKugukKz8UwBHapM4idyZvnLc",
    "exitonly-14": "bc1q5rjy2cdfy4n4dkk4r6pxtwqlm8tgjcc2dj0ee9",
    "objective-thune": "3Jf995GANG4EmFBK89byNNyZdtB3ELXJsZ",
    "luckylurker-vault-2": "bc1qnepv9pcnqvndux9h9mcaxvk6u993rc0lew9fpp",
    "peter-todd-1": "35Snmmy3uhaer2kyjeCezqU1EE4zo9fP9T",
    "warpwallet": "1JKb1617p68H5MPkoNaMtaJCqKDU3h8qSn",
    "btc-coders-p07": "bc1qj7xsxrlgmnnrqwvlakacc5yrh33h2n3xaa0m09",
}

EVM = {
    "crypto-puzzles-2018-2": "0x1fa8Be9De5bBFE047C72dB8E8E3257128F7661ad",
    "arweave-11": "0xFF2142E98E09b5344994F9bEB9C56C95506B9F17",
    "guntis-10eth": "0x9C2F44EFAd0c1E852a09dF9939e6DaF061140CaF",
    "cryptopuzzles-eth-easycore": "0x06460646ca1603a61953eeb385681f5d56401ede",
    "fe-bountiful-registry": "0xB5c0E3f5b4F5e4C6C1F6D0D5e5D6F0a1E4E9F5b4",
    "timeless-1000": "0xb6f420204511C7fE9Dd3DE14266a260e8f11aC37",
}


def btc_balance(name, addr):
    try:
        d = get("https://mempool.space/api/address/" + addr)
        cs = d["chain_stats"]
        fs = d["mempool_stats"]
        bal = cs["funded_txo_sum"] - cs["spent_txo_sum"]
        return (name, addr, f"{bal} sats", f"tx={cs['tx_count']} mempool={fs['tx_count']}",
                "https://mempool.space/address/" + addr)
    except Exception as e:  # noqa: BLE001
        return (name, addr, "ERR", str(e)[:80], "")


def evm_balance(name, addr):
    try:
        d = get("https://eth.blockscout.com/api/v2/addresses/" + addr)
        wei = int(d.get("coin_balance") or 0)
        return (name, addr, f"{wei / 1e18:.9f} ETH", f"tx={d.get('transaction_count')} nonce={d.get('nonce')}",
                "https://eth.blockscout.com/address/" + addr)
    except Exception as e:  # noqa: BLE001
        return (name, addr, "ERR", str(e)[:80], "")


def main():
    print("=== BTC (mempool.space) ===")
    for name, addr in BTC.items():
        n, a, bal, extra, url = btc_balance(name, addr)
        print(f"{n:26s} {a:66s} {bal:>16s}  {extra}")
    print("\n=== EVM (Blockscout) ===")
    for name, addr in EVM.items():
        n, a, bal, extra, url = evm_balance(name, addr)
        print(f"{n:26s} {a:44s} {bal:>16s}  {extra}")


if __name__ == "__main__":
    sys.exit(main())
