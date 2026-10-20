import Init

theorem t1 : (2 : Nat) ^ 10 = 1024 := by native_decide

theorem t2 (a b : Nat) (h : a = b) : a ≤ b := by omega

theorem t3 : ((List.range 4).map (fun i => 2 ^ i)).sum = 15 := by native_decide

#eval ((List.range 4).map (fun i => 2 ^ i)).sum
