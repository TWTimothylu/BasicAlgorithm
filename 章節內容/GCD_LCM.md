# 最大公因數 (GCD) 與最小公倍數 (LCM) 演算法教學

## 1. 簡介

* **最大公因數 (Greatest Common Divisor, GCD)**：兩個或多個整數共有之因數中最大的一個。
* **最小公倍數 (Least Common Multiple, LCM)**：兩個或多個整數共有之倍數中最小的一個。

在程式競賽中，計算 GCD 最常用的方法是**輾轉相除法 (Euclidean Algorithm)**，而 LCM 則通常透過 GCD 來計算。

## 2. 生活案例比喻

* **GCD - 裁切正方形磁磚**：假設你有一個長 300 公分、寬 180 公分的長方形房間，想要鋪滿大小相同的正方形磁磚且不裁切。為了讓磁磚越大越好，你需要找 300 和 180 的最大公因數（結果是 60 公分）。
* **LCM - 公車會合時間**：A 公車每 12 分鐘發一班，B 公車每 18 分鐘發一班。若兩車同時從總站出發，下一次同時發車會是在幾分鐘後？這需要計算 12 和 18 的最小公倍數（結果是 36 分鐘）。

## 3. 演算法運作步驟 (輾轉相除法)

假設要計算 `a` 與 `b` 的 GCD：

1. **基本原理**：`gcd(a, b) = gcd(b, a % b)`。即 `a` 和 `b` 的最大公因數，等於 `b` 和 `a 除以 b 的餘數` 的最大公因數。
2. **步驟**：
   * 若 `b` 為 0，則 `a` 即為最大公因數，結束。
   * 若 `b` 不為 0，將 `a` 設為 `b`，`b` 設為 `a % b` (取餘數)。
   * 重複上述步驟直到 `b` 為 0。
3. **計算 LCM**：利用公式 `LCM(a, b) = (a * b) / GCD(a, b)` 即可求得。

## 4. 程式碼實作

### Python 實作範例

Python 3.9+ 已內建 `math.gcd` 與 `math.lcm`，但在 APCS 或解題時，了解手寫實作原理仍非常重要。

\```python
import math

# 1. 手寫實作：遞迴版 GCD (Euclidean Algorithm)
def gcd_recursive(a, b):
    if b == 0:
        return a
    return gcd_recursive(b, a % b)

# 2. 手寫實作：迴圈版 GCD (避免遞迴過深)
def gcd_iterative(a, b):
    while b != 0:
        a, b = b, a % b
    return a

# 3. 手寫實作：LCM
def lcm(a, b):
    if a == 0 or b == 0:
        return 0
    # 先除再乘，避免 (a * b) 溢位 (雖然 Python 會自動處理大數，但這是好習慣)
    return abs(a * b) // gcd_iterative(a, b)

# 測試區塊
num1 = 48
num2 = 18

print(f"{num1} 和 {num2} 的 GCD (手寫): {gcd_iterative(num1, num2)}")
print(f"{num1} 和 {num2} 的 LCM (手寫): {lcm(num1, num2)}")

# 使用 Python 內建函式 (推薦在比賽中使用)
print(f"{num1} 和 {num2} 的 GCD (內建): {math.gcd(num1, num2)}")
# 注意: math.lcm 為 Python 3.9+ 版本才支援
# print(f"{num1} 和 {num2} 的 LCM (內建): {math.lcm(num1, num2)}")
\```

## 5. 複雜度分析

* **時間複雜度 (Time Complexity)**：
  * 輾轉相除法的時間複雜度約為 $O(\log(\min(a, b)))$。
  * 這是非常高效的演算法，即使數字很大（例如 $10^{18}$），也能在極短時間內算出結果。
* **空間複雜度 (Space Complexity)**：
  * 迴圈版：$O(1)$。
  * 遞迴版：$O(\log(\min(a, b)))$，用於堆疊空間。

## 6. 特性總結與適用時機

* **優點**：輾轉相除法是計算 GCD 最快且最標準的方法。
* **APCS 考試應用**：
  * **第 1、2 題**：常直接考 GCD/LCM 計算，或是涉及分數約分、週期性問題。
  * **第 3、4 題**：數論題型的基礎，例如「貝祖定理 (Bézout's identity)」的應用（如水桶倒水問題）。
* **實作技巧**：在 Python 中，建議直接使用 `math.gcd()`，既快又不會寫錯。計算 LCM 時記得使用整數除法 `//`。

## 7. LeetCode 實戰練習

以下題目涉及 GCD 或 LCM 的觀念應用：

* **基礎題 (Basic)**：
    * [1979. Find Greatest Common Divisor of Array](https://leetcode.com/problems/find-greatest-common-divisor-of-array/)：練習找出陣列中最大與最小數的 GCD。
    * [2413. Smallest Even Multiple](https://leetcode.com/problems/smallest-even-multiple/)：簡單的倍數概念。

* **進階應用題 (Advanced)**：
    * [365. Water and Jug Problem](https://leetcode.com/problems/water-and-jug-problem/)：經典題（水壺問題），本質是檢查目標水量是否為兩水壺容量之 GCD 的倍數。
    * [1201. Ugly Number III](https://leetcode.com/problems/ugly-number-iii/)：結合二分搜尋與 LCM（排容原理）的難題。
    * [878. Nth Magical Number](https://leetcode.com/problems/nth-magical-number/)：同樣涉及 LCM 與二分搜尋的數學題。

