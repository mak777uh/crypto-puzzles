# -*- coding: utf-8 -*-
"""Отладка батчевого пути: почему на смешанных длинах дайджесты не сходятся."""
import hashlib
import random
import sys

import torch

sys.path.insert(0, r"C:\Users\Admin\AppData\Local\Temp\opencode\gsmg-enrich")
from gsmg_gpu_sha256 import K, H0, Sha256GPU  # noqa

g = Sha256GPU(torch.device("cpu"), torch.tensor(K, dtype=torch.int64), H0)

rnd = random.Random(20261018)
for trial in range(3):
    lens = [0, 1, 8, 16, 31, 32, 55, 56, 63, 64, 65, 100, 137]
    msgs = [bytes(rnd.randrange(256) for _ in range(rnd.choice(lens))) for _ in range(2000)]
    got = g.digest_bytes(msgs)
    bad = 0
    first = None
    for m, d in zip(msgs, got):
        if d != hashlib.sha256(m).digest():
            bad += 1
            if first is None:
                first = (len(m), d.hex()[:16], hashlib.sha256(m).hexdigest()[:16])
    print(f"trial {trial}: размеров в батче {len(set(len(m) for m in msgs))}, ошибок {bad}/{len(msgs)}")
    if first:
        print("   первый сбой: len=%d получено %s ожидалось %s" % first)
    # проверка: не сдвинуты ли дайджесты
    shift = sum(1 for i, (m, d) in enumerate(zip(msgs, got)) if i > 0 and d == hashlib.sha256(msgs[i - 1]).digest())
    print("   совпадений со СДВИГОМ на -1:", shift)
    # те же сообщения, но поодиночке
    bad_single = sum(1 for m in msgs[:200] if g.digest_bytes([m])[0] != hashlib.sha256(m).digest())
    print("   поодиночке ошибок (первые 200):", bad_single)
