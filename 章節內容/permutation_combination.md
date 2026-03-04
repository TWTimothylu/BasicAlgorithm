# 排列組合 (Permutations & Combinations) 演算法教學

## 1. 簡介

* **排列 (Permutation)**：從 $n$ 個不同元素中取出 $k$ 個元素進行排列，**講究順序**。
* **組合 (Combination)**：從 $n$ 個不同元素中取出 $k$ 個元素組成集合，**不講究順序**。

在程式競賽中，計算排列組合數值通常涉及**階乘 (Factorial)** 運算，而列舉所有排列或組合則需要使用**遞迴 (Recursion)** 或 **回溯法 (Backtracking)**。

## 2. 生活案例比喻

* **排列 (Order Matters) - 密碼鎖**：
  * 假設密碼鎖有 3 個位置，你要從 0-9 選出 3 個數字當密碼。
  * 選出的數字是 1, 2, 3。
  * 「123」和「321」是**不同**的密碼。因為順序很重要，這就是「排列」。

* **組合 (Order Doesn't Matter) - 樂透彩 / 珍珠奶茶配料**：
  * 你要從珍珠、椰果、布丁中選 2 種加料。
  * 選「珍珠+布丁」和選「布丁+珍珠」拿到的是**同一杯**飲料。
  * 因為順序不重要，這就是「組合」。

## 3. 公式與運算

### A. 階乘 (Factorial)
* 定義：$n! = n \times (n-1) \times \dots \times 1$。特別定義 $0! = 1$。

### B. 排列公式 $P(n, k)$ 或 $P^n_k$
* 從 $n$ 個取 $k$ 個排隊的方法數。
* 公式：$P(n, k) = \frac{n!}{(n-k)!}$

### C. 組合公式 $C(n, k)$ 或 $\binom{n}{k}$
* 從 $n$ 個取 $k$ 個成一組的方法數。
* 公式：$C(n, k) = \frac{P(n, k)}{k!} = \frac{n!}{k!(n-k)!}$
* 常用性質：$C(n, k) = C(n, n-k)$ (選 $k$ 個留下來，等於選 $n-k$ 個丟掉)。

## 4. 程式碼實作

### Python 實作範例

Python 的 `math` 模組已內建高效函式，但在 APCS 第 3、4 題中，常需要手寫遞迴來**列出**所有情況（而不只是計算數量）。

\```python
import math
import itertools

# --- 1. 計算數值 (使用內建函式) ---
n, k = 5, 3
print(f"P({n}, {k}) = {math.perm(n, k)}")  # 排列數: 60
print(f"C({n}, {k}) = {math.comb(n, k)}")  # 組合數: 10

# --- 2. 實作組合公式 C(n, k) (避免階乘溢位版) ---
def nCr(n, k):
    if k < 0 or k > n:
        return 0
    if k == 0 or k == n:
        return 1
    if k > n // 2:
        k = n - k
    
    res = 1
    for i in range(k):
        res = res * (n - i) // (i + 1)
    return res

# --- 3. 列舉所有排列 (Permutations) ---
data = [1, 2, 3]
perms = list(itertools.permutations(data))
print(f"所有排列: {perms}")
# 輸出: [(1, 2, 3), (1, 3, 2), (2, 1, 3), (2, 3, 1), (3, 1, 2), (3, 2, 1)]

# --- 4. 列舉所有組合 (Combinations) ---
combs = list(itertools.combinations(data, 2))
print(f"所有取 2 個的組合: {combs}")
# 輸出: [(1, 2), (1, 3), (2, 3)]
\```

## 5. 複雜度分析

* **數值計算**：
  * 計算 $C(n, k)$ 的時間複雜度約為 $O(k)$ (使用邊乘邊除法)。
  * 若使用巴斯卡三角形 (Pascal's Triangle) 建表，預處理時間為 $O(N^2)$，之後查詢為 $O(1)$。
* **列舉所有情況**：
  * **排列**：總數為 $n!$，時間複雜度為 $O(n \times n!)$。
  * **組合**：總數為 $C(n, k)$，時間複雜度為 $O(k \times C(n, k))$。
  * 注意：當 $n=13$ 時，$13! \approx 62$ 億，通常 $n > 10$ 就很難列舉所有排列。

## 6. 特性總結與適用時機

* **應用場景**：
  * **計算數量**：路徑走法（方格棋盤）、分組問題。
  * **列舉內容**：窮舉所有可能的密碼、暴力破解、排班表。
* **APCS 考試應用**：
  * **第 2 題**：常考簡單的排列計數或字串排列。
  * **第 3、4 題**：常考 DFS 回溯法列舉。例如：「請輸出所有可能的排列」或「八皇后問題」（這類問題本質上就是在做有限制的排列）。
  * **動態規劃**：組合數 $C(n, k)$ 常用於 DP 狀態轉移（如巴斯卡三角形性質）。

## 7. LeetCode 實戰練習

以下題目是排列組合與回溯法的經典題：

* **基礎題 (Basic - 計算數量)**：
    * [62. Unique Paths](https://leetcode.com/problems/unique-paths/)：機器人走迷宮的路徑數，其實就是 $C(TotalSteps, DownSteps)$。
    * [118. Pascal's Triangle](https://leetcode.com/problems/pascals-triangle/)：實作巴斯卡三角形。

* **進階題 (Advanced - 列舉內容)**：
    * [46. Permutations](https://leetcode.com/problems/permutations/)：列出所有排列（經典回溯題）。
    * [77. Combinations](https://leetcode.com/problems/combinations/)：列出所有組合。
    * [78. Subsets](https://leetcode.com/problems/subsets/)：列出所有子集（所有可能的組合集合）。
    * [31. Next Permutation](https://leetcode.com/problems/next-permutation/)：尋找下一個字典序排列（APCS 進階技巧）。

