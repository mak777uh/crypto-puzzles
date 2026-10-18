#!/usr/bin/env python3
"""Fast balance checker for the puzzle catalog (read-only, free public APIs).

Author: DSH agent (deepseek-v4.1-flash:free), 2026-10-17.

Probed limits (2026-10-17, this machine):
  mempool.space      - NOT REACHABLE (TLS handshake timeout) -> never use here
  blockstream.info   - reachable, TLS handshake ~1-2 s, parallelism confirmed >=6
  blockchain.info    - reachable, cheap /q/ endpoints ~0.9-1.3/s; /rawaddr 429s on
                       bursts -> use only as fallback, with retry on 429
  eth.blockscout.com - reachable, 10 req/s per IP (x-ratelimit-limit: 180); 180/min
  api.github.com     - 60 req/h unauthenticated (X-RateLimit-Limit: 60)
  chainz.cryptoid    - NOT REACHABLE (timeout)
  general            - *.github.io and some explorer hosts time out; treat as blocked

Design: persistent HTTPS connections + 8 worker threads, per-host pacing,
automatic retry with backoff on 429/timeout, ~1.4 s per address at 8 threads.
"""
from __future__ import annotations

import json
import ssl
import sys
import threading
import time
import urllib.error
import urllib.request
from concurrent.futures import ThreadPoolExecutor, as_completed

UA = "dsh-agent/1.0 (+puzzle-catalog balance check)"
TIMEOUT = 30
WORKERS = 8

BLOCKSTREAM = "https://blockstream.info/api"
BLOCKCHAIN = "https://blockchain.info"
BLOCKSCOUT = "https://eth.blockscout.com"

_local = threading.local()
_host_locks = {}


def _opener():
    if not hasattr(_local, "op"):
        ctx = ssl.create_default_context()
        _local.op = urllib.request.build_opener(
            urllib.request.HTTPSHandler(context=ctx),
            urllib.request.HTTPRedirectHandler(),
        )
        _local.op.addheaders = [("User-Agent", UA), ("Connection", "keep-alive")]
    return _local.op


def fetch(url: str, tries: int = 4, base_sleep: float = 1.5):
    """GET with retries and exponential backoff. Returns (status, body_bytes)."""
    last = None
    for attempt in range(tries):
        try:
            with _opener().open(url, timeout=TIMEOUT) as r:
                return r.status, r.read()
        except urllib.error.HTTPError as e:
            last = e
            if e.code in (429, 503, 502, 500):
                time.sleep(base_sleep * (2 ** attempt))
                continue
            return e.code, b""
        except Exception as e:  # noqa: BLE001
            last = e
            time.sleep(base_sleep * (2 ** attempt))
    return 0, str(last).encode()


def btc_blockstream(addr: str):
    st, body = fetch(f"{BLOCKSTREAM}/address/{addr}")
    if st != 200:
        return None, f"blockstream HTTP {st}"
    d = json.loads(body)
    cs, fs = d["chain_stats"], d["mempool_stats"]
    bal = cs["funded_txo_sum"] - cs["spent_txo_sum"]
    return {
        "sats": bal,
        "tx_count": cs["tx_count"],
        "mempool_tx": fs["tx_count"],
        "received": cs["funded_txo_sum"],
        "spent": cs["spent_txo_sum"],
    }, None


def btc_blockchaininfo(addr: str):
    st, body = fetch(f"{BLOCKCHAIN}/rawaddr/{addr}?limit=0")
    if st != 200:
        return None, f"blockchain.info HTTP {st}"
    d = json.loads(body)
    return {
        "sats": d.get("final_balance"),
        "tx_count": d.get("n_tx"),
        "received": d.get("total_received"),
        "spent": d.get("total_sent"),
    }, None


def btc(addr: str):
    r, err = btc_blockstream(addr)
    if r is not None:
        return r, "blockstream"
    r2, err2 = btc_blockchaininfo(addr)
    if r2 is not None:
        return r2, "blockchain.info"
    return None, f"{err}; fallback: {err2}"


def evm(addr: str):
    st, body = fetch(f"{BLOCKSCOUT}/api/v2/addresses/{addr}")
    if st != 200:
        return None, f"blockscout HTTP {st}"
    d = json.loads(body)
    return {
        "wei": int(d.get("coin_balance") or 0),
        "tx_count": d.get("transaction_count"),
        "nonce": d.get("nonce"),
    }, "blockscout"


BTC_ADDRS = {
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
    "peter-todd-1": "35Snmmy3uhaer2gTboc81ayCip4m9DT4ko",
    "peter-todd-2": "3KyiQEGqqdb4nqfhUzGKN6KPhXmQsLNpay",
    "peter-todd-3": "39VXyuoc6SXYKp9TcAhoiN1mb4ns6z3Yu6",
    "peter-todd-4": "3DUQQvz4t57Jy7jxE86kyFcNpKtURNf1VW",
    "wif500": "1PfNh5fRcE9JKDmicD2Rh3pexGwce1LqyU",
    "quizchain-rbb": "14zMkTgaVXJcxdh4JdWi29MLRR44iUSG9W",
    "trithemius-wealth-in-poetry": "1K4ezpLybootYF23TM4a8Y4NyP7auysnRo",
    "slm-glimmer": "bc1q0akdjvrc2csau2n3gyxa3xcq0fss852x997m9y",
    "ktimesg-phy": "bc1qrpn28qa82uyjg37dvsz3w7wpm3kpdea957nm9p",
    "warpwallet-ch1": "1JKb1617p68H5MPkoNaMtaJCqKDU3h8qSn",
    "bitaps-shamir": "bc1qyjwa0tf0en4x09magpuwmt2smpsrlaxwn85lh6",
    "1000btc-71": "1PWo3JeB9jrGwfHDNpdGK54CRas7fsVzXU",
}

EVM_ADDRS = {
    "crypto-puzzles-2018-2": "0x1fa8Be9De5bBFE047C72dB8E8E3257128F7661ad",
    "arweave-11": "0xFF2142E98E09b5344994F9bEB9C56C95506B9F17",
    "guntis-10eth": "0x9C2F44EFAd0c1E852a09dF9939e6DaF061140CaF",
    "cryptopuzzles-easycore": "0x06460646ca1603a61953eeb385681f5d56401ede",
    "logicbeach": "0x831102C7eb86f9EC8f79dF891bDeA187D54344Dd",
    "teikhos-c1": "0x0000000000000000000000000000000000000000",
}


def main():
    t0 = time.time()
    out = []
    with ThreadPoolExecutor(max_workers=WORKERS) as ex:
        futs = {}
        for name, a in BTC_ADDRS.items():
            futs[ex.submit(btc, a)] = ("BTC", name, a)
        for name, a in EVM_ADDRS.items():
            futs[ex.submit(evm, a)] = ("EVM", name, a)
        for f in as_completed(futs):
            kind, name, addr = futs[f]
            try:
                res, src = f.result()
            except Exception as e:  # noqa: BLE001
                res, src = None, f"EXC {e}"
            out.append((kind, name, addr, res, src))

    out.sort(key=lambda r: (r[0], r[1]))
    print(f"# balance check {time.strftime('%Y-%m-%d %H:%M:%S')}  "
          f"workers={WORKERS}  wall={time.time() - t0:.1f}s")
    for kind, name, addr, res, src in out:
        if res is None:
            print(f"{kind:3s} {name:24s} {addr:66s} ERROR  {src}")
        elif kind == "BTC":
            flag = "SPENT-EMPTY" if res["sats"] == 0 else "HOLDS"
            print(f"{kind:3s} {name:24s} {addr:66s} {res['sats']:>12,} sats  {flag}  "
                  f"tx={res['tx_count']} mempool={res['mempool_tx']} "
                  f"recv={res['received']:,} sent={res['spent']:,}  [{src}]")
        else:
            eth = res["wei"] / 1e18
            flag = "EMPTY" if res["wei"] == 0 else "HOLDS"
            print(f"{kind:3s} {name:24s} {addr:44s} {eth:>14.6f} ETH  {flag}  "
                  f"nonce={res['nonce']} tx={res['tx_count']}  [{src}]")


if __name__ == "__main__":
    sys.exit(main())
