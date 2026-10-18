# -*- coding: utf-8 -*-
"""Balance check part 2: ETH via cloudflare/llamarpc, GRS via alt endpoint, fixed RushWallet addr."""
import json
import urllib.request

TIMEOUT = 25

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

RPCS = [
    "https://ethereum-rpc.publicnode.com",
    "https://cloudflare-eth.com",
    "https://eth.llamarpc.com",
    "https://rpc.ankr.com/eth",
]


def eth_balance(addr):
    last_err = None
    for rpc in RPCS:
        try:
            payload = json.dumps({
                "jsonrpc": "2.0", "id": 1, "method": "eth_getBalance",
                "params": [addr, "latest"],
            }).encode()
            rq = urllib.request.Request(
                rpc, data=payload,
                headers={"Content-Type": "application/json", "User-Agent": "curl/8.0"},
            )
            with urllib.request.urlopen(rq, timeout=TIMEOUT) as r:
                res = json.loads(r.read().decode())
            return int(res["result"], 16) / 1e18, rpc
        except Exception as e:
            last_err = e
    raise last_err


def main():
    print("== ETH ==")
    for name, addr in ETH:
        try:
            bal, rpc = eth_balance(addr)
            print(f"{name:28s} {bal:.6f} ETH   [{rpc.split('//')[1][:24]}]")
        except Exception as e:
            print(f"{name:28s} ERR {e}")

    print()
    print("== BTC retry ==")
    try:
        d = json.load(urllib.request.urlopen(
            "https://blockstream.info/api/address/13Q8hJqagtd77ojTJcEZPjTz2sBFSsYxyj", timeout=TIMEOUT))
        c, m = d["chain_stats"], d["mempool_stats"]
        print(f"RushWallet #30 funded={c['funded_txo_sum']+m['funded_txo_sum']:,} "
              f"spent={c['spent_txo_sum']+m['spent_txo_sum']:,} txs={c['tx_count']+m['tx_count']}")
    except Exception as e:
        print("RushWallet ERR", e)

    print()
    print("== GRS ==")
    for url in [
        "https://chainz.cryptoid.info/grs/api.dws?q=getbalance&active=FindKEYLrVaahtkaVRk8KTspRMyWxfUi3i&key=",
        "https://chainz.cryptoid.info/grs/explorer/address.raw?address=FindKEYLrVaahtkaVRk8KTspRMyWxfUi3i",
    ]:
        try:
            rq = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
            with urllib.request.urlopen(rq, timeout=TIMEOUT) as r:
                print(url.split("q=")[-1][:60], "->", r.read().decode()[:300])
        except Exception as e:
            print(url[-40:], "ERR", e)


if __name__ == "__main__":
    main()
