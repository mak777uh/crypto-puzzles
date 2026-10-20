#!/usr/bin/env python3
"""Подготовка НЕПОДПИСАННОЙ транзакции / PSBT из наблюдаемого адреса (watch-only).

Назначение: если Илья решит, что приз можно снять, у него уже лежит готовый черновик
транзакции с корректной комиссией — но без подписи. Инструмент не принимает и не хранит
приватных ключей, не обращается к кошельку и **никогда не транслирует**. Подпись и
broadcast — только руками Ильи (AGENT_INSTRUCTIONS.md, правила №5 и №6).

Пример:
    python tools/sandbox/psbt_prepare.py bc1qnepv9pcnqvndux9h9mcaxvk6u993rc0lew9fpp \
        --destination <адрес_Ильи> --fee-rate 2 --slug luckylurker-vault-2-1btc

Выход (в --outdir, по умолчанию reports/drafts):
    <slug>__<addr12>.psbt       base64 PSBT: unsigned tx + utxo-инпуты, карт подписей нет
    <slug>__<addr12>.json       человекочитаемый черновик (входы/выходы/комиссия)
    <slug>__<addr12>_unsigned.hex  raw unsigned tx (сверить в любом обозревателе)

Проверки безопасности: валидность адреса назначения, покрытие комиссии, отказ от --broadcast.
"""
from __future__ import annotations

import argparse
import base64
import hashlib
import json
import os
import re
import subprocess
import sys
import time

API = "https://blockstream.info/api"

# PSBT ключевые типы (BIP174), которые нам нужны
PSBT_GLOBAL_UNSIGNED_TX = 0x00
PSBT_IN_NON_WITNESS_UTXO = 0x00
PSBT_IN_WITNESS_UTXO = 0x01

# Оценка размера входа/выхода в vB (для комиссии; точный размер будет после подписи)
INPUT_VB = {"p2pkh": 148, "p2sh-p2wpkh": 91, "p2sh": 148,
            "p2wpkh": 68, "p2wsh": 104, "unknown": 148}
OUTPUT_VB = 34
TX_OVERHEAD_VB = 11          # version + locktime + 2 varint + marker/flag


def _get(path: str, timeout: int = 15, raw: bool = False) -> str:
    """curl, потому что urllib на этом хосте падает по TLS, а mempool.space отвечает 429.

    raw=True — для /tx/{id}/hex: ответ это hex-строка, а не JSON.
    """
    last = ""
    for attempt in range(3):
        p = subprocess.run(["curl", "-s", "--max-time", str(timeout), API + path],
                           capture_output=True, text=True, timeout=timeout + 5)
        last = (p.stdout or "").strip()
        ok = bool(re.fullmatch(r"[0-9a-fA-F]+", last)) if raw else (last[:1] in "[{")
        if ok and (not raw or len(last) % 2 == 0):
            return last
        time.sleep(1.2 * (attempt + 1))
    raise RuntimeError(f"API: пустой/битый ответ для {path} ({last[:80]!r})")


def _getjson(path: str):
    return json.loads(_get(path))


# ---------------- адреса -> scriptPubKey ----------------

def _b58check_decode(s: str) -> bytes:
    import base58
    raw = base58.b58decode(s)
    payload, chk = raw[:-4], raw[-4:]
    if hashlib.sha256(hashlib.sha256(payload).digest()).digest()[:4] != chk:
        raise ValueError("base58: неверная контрольная сумма")
    return payload


CHARSET = "qpzry9x8gf2tvdw0s3jn54khce6mua7l"
_INV = {c: i for i, c in enumerate(CHARSET)}
_GEN = [0x3B6A57B2, 0x26C74C31, 0x1D462D33, 0x2976CDD0, 0x4CA5F7D4]


def _polymod(values):
    chk = 1
    for v in values:
        b = chk >> 25
        chk = (chk & 0x1FFFFFF) << 5 ^ v
        for i in range(5):
            chk ^= _GEN[i] if ((b >> i) & 1) else 0
    return chk


def _bech32_decode(addr: str):
    if addr.lower() != addr and addr.upper() != addr:
        raise ValueError("bech32: смешанный регистр")
    addr = addr.lower()
    pos = addr.rfind("1")
    hrp, data = addr[:pos], addr[pos + 1:]
    if not (1 <= len(hrp) <= 83) or len(data) < 6:
        raise ValueError("bech32: длина")
    vals = [_INV[c] for c in data]
    if _polymod([ord(x) >> 5 for x in hrp] + [0] + [ord(x) & 31 for x in hrp] + vals) != 1:
        raise ValueError("bech32: неверная контрольная сумма")
    return hrp, vals[:-6]


def _convertbits(data, frombits, tobits, pad=True):
    acc, bits, ret = 0, 0, []
    maxv = (1 << tobits) - 1
    for value in data:
        acc = (acc << frombits) | value
        bits += frombits
        while bits >= tobits:
            bits -= tobits
            ret.append((acc >> bits) & maxv)
    if pad and bits:
        ret.append((acc << (tobits - bits)) & maxv)
    if not pad and bits >= frombits or ((acc << (tobits - bits)) & maxv):
        raise ValueError("bech32: padding")
    return ret


def address_to_script(addr: str):
    """-> (scriptPubKey: bytes, тип: str). Умеем P2PKH, P2SH, P2WPKH, P2WSH."""
    if re.fullmatch(r"1[0-9A-Za-z]{25,34}", addr):
        h = _b58check_decode(addr)
        if h[0] != 0x00 or len(h) != 21:
            raise ValueError("не P2PKH (version != 0x00)")
        return bytes([0x76, 0xA9, 0x14]) + h[1:] + bytes([0x88, 0xAC]), "p2pkh"
    if re.fullmatch(r"3[0-9A-Za-z]{25,34}", addr):
        h = _b58check_decode(addr)
        if h[0] != 0x05 or len(h) != 21:
            raise ValueError("не P2SH (version != 0x05)")
        return bytes([0xA9, 0x14]) + h[1:] + bytes([0x87]), "p2sh"
    if addr.lower().startswith("bc1q"):
        hrp, vals = _bech32_decode(addr)
        if hrp != "bc":
            raise ValueError(f"не mainnet (hrp={hrp})")
        witver, prog = vals[0], _convertbits(vals[1:], 5, 8, pad=False)
        if witver != 0 or len(prog) not in (20, 32):
            raise ValueError("поддерживаем только witness v0 (20/32 байта)")
        return bytes([0x00, len(prog)] + prog), ("p2wpkh" if len(prog) == 20 else "p2wsh")
    raise ValueError("неизвестный формат адреса (умеем 1…, 3…, bc1q…)")


def classify_spk(spk: bytes) -> str:
    if spk[:3] == b"\x76\xa9\x14" and spk[-2:] == b"\x88\xac" and len(spk) == 25:
        return "p2pkh"
    if spk[:2] == b"\xa9\x14" and spk[-1:] == b"\x87" and len(spk) == 23:
        return "p2sh"
    if spk[0] == 0x00 and len(spk) == 23 and spk[1] == 0x14:
        return "p2wpkh"
    if spk[0] == 0x00 and len(spk) == 35 and spk[1] == 0x20:
        return "p2wsh"
    return "unknown"


# ---------------- сериализация ----------------

def varint(n: int) -> bytes:
    if n < 0xFD:
        return bytes([n])
    if n <= 0xFFFF:
        return b"\xFD" + n.to_bytes(2, "little")
    if n <= 0xFFFFFFFF:
        return b"\xFE" + n.to_bytes(4, "little")
    return b"\xFF" + n.to_bytes(8, "little")


def build_unsigned_tx(inputs, outputs, locktime: int = 0) -> bytes:
    """Классическая (без witness-полей) сериализация — как требует PSBT global unsigned tx."""
    tx = (2).to_bytes(4, "little") + varint(len(inputs))
    for i in inputs:
        tx += (bytes.fromhex(i["txid"])[::-1]
               + i["vout"].to_bytes(4, "little")
               + varint(0)
               + (0xFFFFFFFD).to_bytes(4, "little"))   # RBF opt-in
    tx += varint(len(outputs))
    for amount, spk in outputs:
        tx += amount.to_bytes(8, "little") + varint(len(spk)) + spk
    return tx + locktime.to_bytes(4, "little")


def build_psbt(unsigned_tx: bytes, inputs, n_outputs: int) -> bytes:
    def kv(key: bytes, val: bytes) -> bytes:
        return varint(len(key)) + key + varint(len(val)) + val

    out = b"psbt" + b"\xff"
    out += kv(bytes([PSBT_GLOBAL_UNSIGNED_TX]), unsigned_tx)
    out += b"\x00"                                     # конец глобальной карты
    for i in inputs:
        raw = bytes.fromhex(i["raw_tx"])
        out += kv(bytes([PSBT_IN_NON_WITNESS_UTXO]), raw)
        if i["segwit"]:
            out += kv(bytes([PSBT_IN_WITNESS_UTXO]), raw)
        out += b"\x00"                                 # конец карты входа
    for _ in range(n_outputs):
        out += b"\x00"                                 # пустые карты выходов
    return out + b"\x00"


def estimate_vsize(in_types, n_out: int) -> int:
    return TX_OVERHEAD_VB + sum(INPUT_VB.get(t, 148) for t in in_types) + OUTPUT_VB * n_out


# ---------------- основная часть ----------------

def collect_inputs(address: str):
    utxos = [u for u in _getjson(f"/address/{address}/utxo") if int(u.get("value", 0)) > 0]
    inputs, total = [], 0
    for u in utxos:
        meta = _getjson(f"/tx/{u["txid"]}")
        raw_hex = _get(f"/tx/{u['txid']}/hex", raw=True)
        spk = bytes.fromhex(meta["vout"][u["vout"]]["scriptpubkey"])
        t = classify_spk(spk)
        inputs.append({
            "txid": u["txid"],
            "vout": u["vout"],
            "value": int(u["value"]),
            "type": t,
            "raw_tx": raw_hex,
            "segwit": t in ("p2wpkh", "p2wsh"),
            "height": meta.get("status", {}).get("block_height"),
        })
        total += int(u["value"])
        time.sleep(0.2)
    return inputs, total


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("address")
    ap.add_argument("--destination", required=True,
                    help="адрес назначения — выдаёт только Илья (ключей у инструмента нет)")
    ap.add_argument("--fee-rate", type=float, default=2.0, help="сат/vB (по умолчанию 2)")
    ap.add_argument("--reserve", type=int, default=0,
                    help="оставить N сат на источнике (возвращается отдельным выходом)")
    ap.add_argument("--slug", default="untracked")
    ap.add_argument("--outdir", default=os.path.join("reports", "drafts"))
    ap.add_argument("--broadcast", action="store_true",
                    help="ЗАПРЕЩЕНО — транзакции без явного ОК Ильи не отправляются")
    args = ap.parse_args()

    if args.broadcast:
        print("ОТКАЗ: broadcast не входит в задачи песочницы (правило №5). "
              "Подпись и отправку делает только Илья.", file=sys.stderr)
        return 2

    os.makedirs(args.outdir, exist_ok=True)
    dest_spk, dest_kind = address_to_script(args.destination)
    src_spk, src_kind = address_to_script(args.address)

    inputs, total_in = collect_inputs(args.address)
    if not inputs:
        print(f"На {args.address} нет подтверждённых UTXO — черновик не нужен.")
        return 1

    in_types = [i["type"] for i in inputs]
    n_out = 1 + (1 if args.reserve else 0)
    vsize = estimate_vsize(in_types, n_out)
    fee = max(300, int(round(vsize * args.fee_rate)))
    out_amt = total_in - fee - args.reserve
    if out_amt <= 546:
        print(f"Невыгодно: входов {total_in} сат, комиссия ~{fee} сат, reserve {args.reserve}.")
        return 1

    outputs = [(out_amt, dest_spk)]
    if args.reserve:
        outputs.append((args.reserve, src_spk))

    unsigned = build_unsigned_tx(inputs, outputs)
    psbt = build_psbt(unsigned, inputs, n_out)
    double_sha = hashlib.sha256(hashlib.sha256(unsigned).digest()).digest()
    txid_preview = double_sha[::-1].hex()

    stem = os.path.join(args.outdir, f"{args.slug}__{args.address[:12]}")
    with open(stem + ".psbt", "w", encoding="ascii") as f:
        f.write(base64.b64encode(psbt).decode() + "\n")
    with open(stem + "_unsigned.hex", "w", encoding="ascii") as f:
        f.write(unsigned.hex() + "\n")

    draft = {
        "created_utc": time.strftime("%Y-%m-%d %H:%M:%SZ", time.gmtime()),
        "status": "UNSIGNED — не подписано и не транслировано",
        "source_address": args.address,
        "source_kind": src_kind,
        "destination": args.destination,
        "destination_kind": dest_kind,
        "inputs": [{"txid": i["txid"], "vout": i["vout"], "value": i["value"],
                    "type": i["type"], "height": i["height"]} for i in inputs],
        "outputs": ([{"address": args.destination, "value": out_amt}]
                    + ([{"address": args.address, "value": args.reserve, "note": "reserve"}]
                       if args.reserve else [])),
        "total_in": total_in,
        "total_out": sum(v for v, _ in outputs),
        "fee": fee,
        "fee_rate_sat_vb": args.fee_rate,
        "vsize_est": vsize,
        "txid_if_signed_sero": txid_preview,
        "psbt_file": os.path.relpath(stem + ".psbt", os.getcwd()).replace("\\", "/"),
        "safety": ("Приватных ключей/сидов в песочнице нет и не будет (правило №6). "
                   "PSBT открывается в кошельке Ильи (walletprocesspsbt) и broadcastится вручную "
                   "только по явному разрешению (правило №5)."),
    }
    with open(stem + ".json", "w", encoding="utf-8") as f:
        json.dump(draft, f, ensure_ascii=False, indent=2)

    print(json.dumps(draft, ensure_ascii=False, indent=2))
    print(f"\nФайлы: {stem}.psbt, {stem}.json, {stem}_unsigned.hex")
    print("Пометка: черновик неподписан; отправка — только по явному ОК Ильи.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
