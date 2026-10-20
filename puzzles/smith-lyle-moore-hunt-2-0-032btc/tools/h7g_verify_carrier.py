# -*- coding: utf-8 -*-
"""H7g: проверка «носителя» из H7f — координаты, точность разделения, структурированный null.

H7f дал max|r| = 0,52 (mean10) / 0,57 (middle) при msb-чтении и p=0,005 по перестановочному
нулю — формально «сигнал». Но это подозрительно по двум причинам, которые здесь и закрываются:

1. Координаты топ-пикселей печатались с багом (по индексу слота вместо индекса пикселя), поэтому
   непонятно, что именно коррелирует.
2. Вектор известного ответа — не случайные 120 бит, а ASCII 15 строчных букв: биты 0 и 1 каждого
   байта постоянны (0x63..0x77 = 011x xxxx), то есть в векторе есть периодическая структура с
   периодом 8. Обычная перестановка бит эту структуру разрушает, поэтому её null слишком узкий и
   p=0,005 ничего не доказывает. Правильный null — перестановки, сохраняющие структуру (тасуем
   слоты внутри каждой из 8 «битовых позиций»).

Тесты:
  * честные координаты и карта |r| по пикселям;
  * реальная разделяющая способность кандидата (лучший порог -> число ошибок на 120 битах;
    настоящий носитель дал бы 0 ошибок);
  * структурированный null (перестановки внутри битовых позиций, 200 прогонов) и эмпирический p;
  * цвет (R/G/B) и полноразмерные блоки вместо 64x64;
  * скользящий контроль: тот же признак на 20 случайных векторах с ASCII-структурой.

Локальные файлы, сети нет.
"""
from __future__ import annotations

import subprocess
from pathlib import Path

import numpy as np

VIDEO = Path(__file__).resolve().parents[1] / "data" / "vid3" / "08cb40115a304bacaf3b924b96e5bf23.mp4"
CACHE = Path(__file__).resolve().parents[1] / "data" / "h7g_slots.npz"
TARGET = "discoverglimmer"
STEP = 10
SEP = set([8, 17, 26, 35, 44, 53, 62, 71, 80, 89, 98, 107, 116, 125])
NSLOTS = 134
SIDE = 64
NPERM = 200
RNG = np.random.default_rng(20261019)


def decode_all() -> np.ndarray:
    """(120, 64, 64, 3) float32 — цветные данные-слоты (усреднение 10 кадров)."""
    p = subprocess.run(["ffmpeg", "-hide_banner", "-v", "error", "-i", str(VIDEO), "-an",
                        "-frames:v", str(NSLOTS * STEP), "-vf", "scale=%d:%d" % (SIDE, SIDE),
                        "-f", "rawvideo", "-pix_fmt", "rgb24", "-"],
                       capture_output=True, check=True).stdout
    a = np.frombuffer(p, dtype=np.uint8).reshape(NSLOTS, STEP, SIDE, SIDE, 3).astype(np.float32)
    return a.mean(axis=1)


def decode_middle() -> np.ndarray:
    p = subprocess.run(["ffmpeg", "-hide_banner", "-v", "error", "-i", str(VIDEO), "-an",
                        "-frames:v", str(NSLOTS * STEP), "-vf", "scale=%d:%d" % (SIDE, SIDE),
                        "-f", "rawvideo", "-pix_fmt", "rgb24", "-"],
                       capture_output=True, check=True).stdout
    a = np.frombuffer(p, dtype=np.uint8).reshape(NSLOTS, STEP, SIDE, SIDE, 3).astype(np.float32)
    return a[:, STEP // 2]


def load() -> tuple[np.ndarray, np.ndarray]:
    if CACHE.is_file():
        z = np.load(CACHE)
        return z["mean10"], z["middle"]
    m10, mid = decode_all(), decode_middle()
    np.savez_compressed(CACHE, mean10=m10.astype(np.float32), middle=mid.astype(np.float32))
    return m10, mid


def bits(text: str) -> np.ndarray:
    out = []
    for ch in text.encode():
        out.extend(int(x) for x in format(ch, "08b"))
    return np.array(out, dtype=np.float64)


def struct_perm(y: np.ndarray) -> np.ndarray:
    """Перестановка, сохраняющая битовую позицию внутри байта (уникальная структура ASCII-цели)."""
    g = y.reshape(15, 8).copy()
    idx = [RNG.permutation(15) for _ in range(8)]
    return np.column_stack([g[idx[j], j] for j in range(8)]).reshape(120)


def r_matrix(x: np.ndarray, y: np.ndarray) -> np.ndarray:
    xs = x - x.mean(axis=0, keepdims=True)
    ys = y - y.mean()
    den = xs.std(axis=0) * ys.std() * len(y)
    with np.errstate(divide="ignore", invalid="ignore"):
        r = (xs * ys[:, None]).sum(axis=0) / np.where(den == 0, np.nan, den)
    return np.nan_to_num(r, nan=0.0)


def best_split_errors(v: np.ndarray, y: np.ndarray) -> int:
    """Минимум ошибок при «один признак + порог»: сортируем по v, порог делит на нижние (0) и верхние (1)."""
    o = np.argsort(v)
    ys = y[o]
    T = float(ys.sum())
    n = len(ys)
    cum = np.concatenate(([0.0], np.cumsum(ys)))          # cum[s] = единиц среди первых s
    s = np.arange(n + 1)
    err = cum + (n - s) - (T - cum)                        # единицы внизу + нули вверху
    return int(err.min())


def main() -> int:
    if not VIDEO.is_file():
        print("нет файла:", VIDEO)
        return 1
    m10, mid = load()
    di = np.array([i for i in range(NSLOTS) if i not in SEP], dtype=int)
    assert len(di) == 120, len(di)
    y = bits(TARGET)
    print("цель: %s, 120 бит, единиц %d, нулей %d (битовые позиции 0-1 постоянны у всех букв)"
          % (TARGET, int(y.sum()), 120 - int(y.sum())))

    for name, cube in (("mean10", m10), ("middle", mid)):
        gray = cube[di].mean(axis=3)
        flat = gray.reshape(120, -1)
        r = np.abs(r_matrix(flat, y))
        i = int(np.argmax(r))
        x, yy = i % SIDE, i // SIDE
        v = flat[:, i]
        err = best_split_errors(v, y)
        # структурированный null
        nullmax = np.empty(NPERM)
        for k in range(NPERM):
            nullmax[k] = np.abs(r_matrix(flat, struct_perm(y))).max()
        p = (1 + (nullmax >= r[i]).sum()) / (NPERM + 1)
        print("[%s] пиксель-макс |r|=%.3f на (%d,%d); лучший порог даёт %d ошибок из 120"
              % (name, r[i], x, yy, err))
        print("        структ. null: медиана=%.3f 95-й=%.3f 99-й=%.3f -> p=%.3f"
              % (np.median(nullmax), np.quantile(nullmax, .95), np.quantile(nullmax, .99), p))
        # цвет и блоки
        for cn, ch in (("R", 0), ("G", 1), ("B", 2)):
            rc = np.abs(r_matrix(cube[di][:, :, :, ch].reshape(120, -1), y))
            ic = int(np.argmax(rc))
            print("        %s: max|r|=%.3f на (%d,%d), ошибок %d"
                  % (cn, rc.max(), ic % SIDE, ic // SIDE,
                     best_split_errors(cube[di][:, :, :, ch].reshape(120, -1)[:, ic], y)))
        blk = gray.reshape(120, SIDE // 4, 4, SIDE // 4, 4).mean(axis=(2, 4)).reshape(120, -1)
        rb = np.abs(r_matrix(blk, y))
        ib = int(np.argmax(rb))
        print("        блоки4x4: max|r|=%.3f на (%d,%d), ошибок %d"
              % (rb.max(), ib % (SIDE // 4), ib // (SIDE // 4), best_split_errors(blk[:, ib], y)))
        # контроль: случайные векторы с ASCII-структурой
        ctrl = []
        for k in range(20):
            yc = np.zeros(120)
            g = RNG.integers(0, 2, size=(15, 8))
            g[:, 0] = 0
            g[:, 1] = 1
            yc = g.reshape(120).astype(float)
            if yc.sum() < 20 or yc.sum() > 100:
                continue
            ctrl.append(np.abs(r_matrix(flat, yc)).max())
        print("        контроль (20 псевдо-ASCII векторов): max|r| мин=%.3f медиана=%.3f макс=%.3f"
              % (min(ctrl), float(np.median(ctrl)), max(ctrl)))

    # отдельный вопрос: есть ли ХОТЬ ОДИН пиксель/блок с нулём ошибок (истинный носитель)
    flat = m10[di].mean(axis=3).reshape(120, -1)
    errs = []
    top = np.argsort(-np.abs(r_matrix(flat, y)))[:30]
    for i in top:
        errs.append(best_split_errors(flat[:, int(i)], y))
    print("[поиск чистого носителя] 30 лучших компонент: ошибок %s (0 было бы доказательством)"
          % sorted(errs)[:12])
    print("H7g done")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
