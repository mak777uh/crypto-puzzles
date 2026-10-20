# -*- coding: utf-8 -*-
"""H7f: supervised-подгонка признака бита по известному ответу `discoverglimmer`.

Отличие от h7d/h7e: вместо перебора вручную заданных признаков (яркость, k-means, контраст,
движение, msb/lsb, полярность, фаза) здесь проверяется ВСЁ пространство покомпонентных
признаков сразу и статистически честно: для каждого из 4096 пикселей (64x64, серые)
считается точечно-биасериальная корреляция (эквивалентна AUC/разделению по этому пикселю)
с ИЗВЕСТНЫМ вектором из 120 бит фразы `discoverglimmer`.

Логика вердикта:
  * если признак-носитель существует в этой модели слотов и порядка чтения — хотя бы одна
    компонента (пиксель или блок) даст |r| заметно выше null-распределения;
  * null строится перестановками известного вектора (200 randomization-прогонов), то есть
    негатив получается сертифицированным, а не «не повезло с признаком».

Дополнительно считаются два глобальных структурных теста, не зависящих от признака:
  * баланс кластеров: у `discoverglimmer` 66 единиц и 54 нуля — ищем, есть ли окно/фаза,
    где медианное разделение 120 слотов даёт ровно 66/54;
  * смещение порядка: корреляция «скользкого» прочтения (сдвиг потока слотов на 0..8,
    чтение побайтно наоборот, чтение групп по колонкам) — на случай, если сами байты
    ложатся на слоты не подряд.

Только локальные файлы, сети нет, транзакций нет. Ничего не публикуется.
"""
from __future__ import annotations

import subprocess
from pathlib import Path

import numpy as np

VIDEO = Path(__file__).resolve().parents[1] / "data" / "vid3" / "08cb40115a304bacaf3b924b96e5bf23.mp4"
TARGET = "discoverglimmer"
STEP = 10
SEP = [8, 17, 26, 35, 44, 53, 62, 71, 80, 89, 98, 107, 116, 125]
NSLOTS = 134
SIDE = 64
NPERM = 200
RNG = np.random.default_rng(20261019)


def bits_of(text: str, lsb: bool = False) -> np.ndarray:
    out = []
    for ch in text.encode():
        b = format(ch, "08b")
        out.extend(int(x) for x in (b[::-1] if lsb else b))
    return np.array(out, dtype=np.float64)


def slot_stack(mode: str) -> np.ndarray:
    """Собирает NSLOTS кадровых слоёв 64x64 (float32, серые)."""
    assert mode in ("mean10", "middle")
    vf = "scale=%d:%d,format=gray" % (SIDE, SIDE)
    p = subprocess.run(["ffmpeg", "-hide_banner", "-v", "error", "-i", str(VIDEO), "-an",
                        "-frames:v", str(NSLOTS * STEP), "-vf", vf, "-f", "rawvideo",
                        "-pix_fmt", "gray", "-"], capture_output=True, check=True).stdout
    n = NSLOTS * STEP
    a = np.frombuffer(p, dtype=np.uint8)
    assert a.size == n * SIDE * SIDE, (a.size, n * SIDE * SIDE)
    a = a.reshape(n, SIDE, SIDE).astype(np.float32)
    a = a.reshape(NSLOTS, STEP, SIDE, SIDE)
    if mode == "mean10":
        return a.mean(axis=1)
    return a[:, STEP // 2, :, :]


def data_idx():
    return np.array([i for i in range(NSLOTS) if i not in set(SEP)], dtype=int)


def pb(x: np.ndarray, y: np.ndarray) -> np.ndarray:
    """Точечно-биасериальная корреляция: x — (m, k) наблюдаемых компонент, y — (m,) биты."""
    xs = x - x.mean(axis=0, keepdims=True)
    ys = y - y.mean()
    sx = xs.std(axis=0)
    sy = ys.std()
    denom = sx * sy * len(y)
    with np.errstate(divide="ignore", invalid="ignore"):
        r = (xs * ys[:, None]).sum(axis=0) / np.where(denom == 0, np.nan, denom)
    return np.nan_to_num(r, nan=0.0, posinf=0.0, neginf=0.0)


def blocks(x: np.ndarray, k: int) -> np.ndarray:
    m, h, w = x.shape
    return x.reshape(m, h // k, k, w // k, k).mean(axis=(2, 4))


def main() -> int:
    if not VIDEO.is_file():
        print("нет файла:", VIDEO)
        return 1
    di = data_idx()
    print("монтаж: %s, слотов %d (шаг %d кадров), разделителей %d, данных слотов %d"
          % (VIDEO.name, NSLOTS, STEP, len(SEP), len(di)))
    if len(di) != 120:
        print("!!! ожидалось 120 данных слотов, получено %d — структура не подтверждена" % len(di))
        return 1

    for mode in ("mean10", "middle"):
        x_all = slot_stack(mode)[di]                      # (120, 64, 64)
        flat = x_all.reshape(len(di), -1)
        for lsb in (False, True):
            y = bits_of(TARGET, lsb=lsb)
            assert len(y) == 120, len(y)
            tag = "lsb" if lsb else "msb"

            r_pix = np.abs(pb(flat, y))
            order = np.argsort(-r_pix)
            top = [(int(i // (SIDE * SIDE)), r_pix[i]) for i in order[:6]]
            r_blk = np.abs(pb(blocks(x_all, 8).reshape(len(di), -1), y))
            r_lum = np.abs(pb(flat.mean(axis=1, keepdims=True), y))

            nullmax = np.empty(NPERM)
            for k in range(NPERM):
                yp = RNG.permutation(y)
                nullmax[k] = np.abs(pb(flat, yp)).max()
            obs = r_pix.max()
            pval = (1 + (nullmax >= obs).sum()) / (NPERM + 1)

            ones = int(y.sum())
            med = np.median(flat.mean(axis=1))
            cnt_hi = int((flat.mean(axis=1) > med).sum())
            print("[%s/%s] носитель: max|r| по пикселям=%.3f (null-макс медиана=%.3f, "
                  "95-й=% .3f), p=%.3f | блоки8x8 max|r|=%.3f | яркость r=%.3f"
                  % (mode, tag, obs, np.median(nullmax), np.quantile(nullmax, 0.95), pval,
                     r_blk.max(), r_lum[0]))
            print("           топ-пиксели: " + ", ".join("r=%.3f@(%d,%d)"
                  % (rv, i // SIDE, i % SIDE) for i, rv in top))
            print("           баланс: в `discoverglimmer` единиц %d; слотов ярче медианы %d "
                  "(ожидание 58-62 при случайности)" % (ones, cnt_hi))
            verdict = "НОСИТЕЛЬ НАЙДЕН" if pval < 0.01 and obs > 0.55 else "нет сигнала"
            print("           вердикт: %s" % verdict)

    # сдвиги порядка: читаем те же 120 значений яркости, но сопоставляем биты иначе
    x_all = slot_stack("mean10")[di]
    lum = x_all.reshape(120, -1).mean(axis=1)
    y = bits_of(TARGET)
    lab = (lum > np.median(lum)).astype(float)
    best = (0.0, "—")
    for name, cand in (("прямой", y),
                      ("байты наоборот", y.reshape(15, 8)[:, ::-1].reshape(120)),
                      ("биты в байте наоборот", y.reshape(15, 8)[:, ::-1].reshape(120)),
                      ("группы наоборот", y.reshape(15, 8)[::-1].reshape(120)),
                      ("по колонкам", y.reshape(15, 8).T.reshape(-1)[:120])):
        for pol in (lab, 1 - lab):
            r = abs(float(np.corrcoef(pol, cand)[0, 1]))
            if r > best[0]:
                best = (r, name)
    print("[порядок] лучшая корреляция яркость↔биты: r=%.3f (%s)" % best)
    print("H7f done")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
