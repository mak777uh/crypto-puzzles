/-
  HnpThreshold.lean — машинно-проверяемый сертификат порога для атаки на ECDSA
  по утечке нонсов (Hidden Number Problem), применённый к призовому EOA
  guntis-vitolins-metamask-8-6eth (8.6125 ETH, 7 подписей ключа).

  Доказывается: чистая арифметика информационной границы. Порядок secp256k1
  имеет 256 бит; если у каждого из t нонсов известно ℓ нулевых ведущих бит, то
  суммарная утечка t*ℓ бит должна быть не меньше 256, т.е. ℓ >= ⌈256/t⌉.
  Для наших t = 7 порог равен 37 битам на подпись. Множество гипотез «у всех
  7 нонсов >=37 нулевых ведущих бит» занимает долю 2^-259 полного пространства.

  НЕ доказывается: корректность ECDSA и отсутствие повторов r. Это сделано
  ВНЕ Lean (coincurve + положительный контроль: восстановленный pubkey совпал
  и с опубликованным ключом, и с адресом приза). Lean сертифицирует арифметику
  порога, а не эллиптические кривые.

  Компиляция: lean HnpThreshold.lean   (ядро Lean 4, без Mathlib)
-/

namespace Hnp

/-- Битовая длина порядка secp256k1 (2^255 < n < 2^256). -/
def nBits : Nat := 256

/-- Число подписей призового ключа, найденных он-чейн 2026-10-18. -/
def sigCount : Nat := 7

/-- Точный порог для t = 7: 37 бит утечки на подпись достаточно,
    36 — ещё нет. Верно для любого ℓ. -/
theorem threshold_7 (l : Nat) : (nBits <= 7 * l) ↔ (37 <= l) := by
  unfold nBits
  omega

/-- Отрицательная сторона того же порога при t = 7. -/
theorem insufficient_7 (l : Nat) (h : l <= 36) : 7 * l < nBits := by
  unfold nBits
  omega

/-- То же для «ромбовидного» случая t = 10 (первая оценка: 10 подписей). -/
theorem threshold_10 (l : Nat) : (nBits <= 10 * l) ↔ (26 <= l) := by
  unfold nBits
  omega

/-- Значения ⌈256/t⌉ для диапазона t, посчитанные самой формулой потолка
    деления (не заявленные вручную). -/
theorem ceil_5  : (nBits + 5 - 1) / 5 = 52 := by decide
theorem ceil_6  : (nBits + 6 - 1) / 6 = 43 := by decide
theorem ceil_7  : (nBits + 7 - 1) / 7 = 37 := by decide
theorem ceil_8  : (nBits + 8 - 1) / 8 = 32 := by decide
theorem ceil_9  : (nBits + 9 - 1) / 9 = 29 := by decide
theorem ceil_10 : (nBits + 10 - 1) / 10 = 26 := by decide

/-- Эквивалентность «t*ℓ >= 256» и «ℓ >= ⌈256/t⌉» для каждого конкретного t
    (проверяется omega как линейная арифметика). -/
theorem thr_5  (l : Nat) : (nBits <= 5  * l) ↔ (52 <= l) := by unfold nBits; omega
theorem thr_6  (l : Nat) : (nBits <= 6  * l) ↔ (43 <= l) := by unfold nBits; omega
theorem thr_8  (l : Nat) : (nBits <= 8  * l) ↔ (32 <= l) := by unfold nBits; omega
theorem thr_9  (l : Nat) : (nBits <= 9  * l) ↔ (29 <= l) := by unfold nBits; omega
theorem thr_10 (l : Nat) : (nBits <= 10 * l) ↔ (26 <= l) := by unfold nBits; omega

/-- Разложение полного пространства. Полное пространство 7 нонсов по 256 бит
    равно (множество гипотез «>=37 нулевых ведущих бит у каждого») * 2^259,
    то есть дефицит ровно 259 = 7*37 бит. -/
theorem counting_split : 2 ^ (7 * 256) = 2 ^ (7 * 219) * 2 ^ 259 := by
  have h : 7 * 256 = 7 * 219 + 259 := by omega
  rw [h, Nat.pow_add]

/-- То же в мультипликативной форме (доля гипотез = 2^-259) без деления. -/
theorem leak_fraction : 2 ^ (7 * 219) * 2 ^ 259 = 2 ^ (7 * 256) := by
  have h : 7 * 256 = 7 * 219 + 259 := by omega
  rw [h, Nat.pow_add]

/-- Точная общая форма: при t > 0 порог равен ⌈256/t⌉. Требует лемму о делении
    из Mathlib (`Nat.le_div_iff_mul_le`), поэтому здесь она не приводится —
    вместо неё доказаны конкретные t выше и следующая частная запись. -/
theorem threshold_7_alt (l : Nat) : (nBits <= 7 * l) ↔ ((nBits + 7 - 1) / 7 <= l) := by
  rw [ceil_7]
  exact threshold_7 l

end Hnp
