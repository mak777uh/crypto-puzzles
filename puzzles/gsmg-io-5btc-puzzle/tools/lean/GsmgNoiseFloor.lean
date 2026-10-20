/-
  GsmgNoiseFloor.lean — сертификат «уровня шума» для закрытий оси ECB-контейнеров GSMG.

  Зачем: все «закрытия» осей по AES-блокам (литеральные пароли, XOR-подсемейства,
  цепочки) опираются на одно утверждение: *число ложных «PKCS#7-валидных» результатов
  при N попытках — это шум порядка N/255, и наблюдённые счётчики не отличаются от шума*.
  Здесь это утверждение доказывается точно (не «примерно»): тождество для padValid,
  два неравенства вокруг p, и проверка четырёх опубликованных наблюдений на попадание
  в 3 сигмы. Всё — в core Lean 4 (без Mathlib), замкнутые числовые цели закрывает
  `native_decide`, т.е. ядро принимает проверку только после вычисления.

  Что этот файл НЕ делает: он не формализует AES и не «доказывает» отсутствие решения
  в оси. Он сертифицирует *критерий* (модель шума) и *числа*, на которых основан вывод.
-/
import Init

namespace Gsmg

/-- Число 16-байтовых блоков с корректным PKCS#7-паддингом.
Для фиксированного p ∈ 1..16 блок заканчивается p байтами значения p, остальные
16 - p байт свободны: итого 256^(16-p). Отсюда padValid = Σ_{p=1..16} 256^(16-p)
= 256^15 + 256^14 + ... + 256^0. -/
def padValid : Nat := ((List.range 16).map (fun i => 256 ^ (15 - i))).sum

/-- Полное пространство 16-байтовых блоков. -/
def space : Nat := 256 ^ 16

/-- Замкнутая форма: padValid = (256^16 - 1) / 255. -/
theorem padValid_closed_form : padValid = (space - 1) / 255 := by native_decide

/-- Геометрическая сумма: padValid * 255 + 1 = 256^16. -/
theorem padValid_identity : padValid * 255 + 1 = space := by native_decide

/-- p := padValid / space строго меньше 1/255. -/
theorem pad_prob_lt : padValid * 255 < space := by native_decide

/-- и строго больше 1/256. -/
theorem pad_prob_gt : space < padValid * 256 := by native_decide

/-- Ожидаемое число ложных срабатываний при N независимых попытках
(нижняя целая часть N * p). -/
def expected (N : Nat) : Nat := N * padValid / space

/-- «Наблюдение obs при N попытках не отличимо от чистого шума на уровне k сигм»:
(obs - E)^2 ≤ k^2 * N * p * (1 - p), записанное в целых числах без делений:
(obs*space - N*padValid)^2 ≤ k^2 * N * padValid * (space - padValid). -/
def withinKsigma (k obs N : Nat) : Prop :=
  ((obs : Int) * (space : Int) - (N : Int) * (padValid : Int)) ^ 2
    ≤ ((k : Int) * (k : Int)) * (N : Int) * (padValid : Int) * ((space : Int) - (padValid : Int))

/-- Точные ожидания для N из опубликованных прогонов. -/
theorem expected_literal_axis : expected 742404 = 2911 := by native_decide
theorem expected_xor_stage    : expected 98292  = 385  := by native_decide
theorem expected_xor_cosmic   : expected 8191   = 32   := by native_decide

/-- Наблюдения наших прогонов внутри 3σ от чистого шума.
Литеральная ось: 2889 валидных из 742 404 расшифровок (E = 2911).
Контроль той же оси (случайные пароли): 3003 (E = 2911).
XOR-стадия: 369 из 98 292 (E = 385). Подсемейство cosmic: 36 из 8191 (E = 32). -/
theorem obs_literal_axis : withinKsigma 3 2889 742404 := by unfold withinKsigma; native_decide
theorem obs_literal_ctrl : withinKsigma 3 3003 742404 := by unfold withinKsigma; native_decide
theorem obs_xor_stage    : withinKsigma 3  369  98292 := by unfold withinKsigma; native_decide
theorem obs_xor_cosmic   : withinKsigma 3   36   8191 := by unfold withinKsigma; native_decide

/-- Цена любого «перебора паролей» в оси AES: ожидание ложного срабатывания
доходит до 1 только при N = 256 (для N ≤ 255 оно равно 0). Иначе говоря, один
ложный PKCS#7-валидный результат на ~255 попыток — это не «структура», а шум. -/
theorem expected_255 : expected 255 = 0 := by native_decide
theorem expected_256 : expected 256 = 1 := by native_decide

end Gsmg
