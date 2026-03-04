# 二分搜尋 (Binary Search) 演算法教學

## 1. 簡介

二分搜尋是一種在**已排序**的資料集合中尋找特定元素的演算法。其運作方式為：每次將搜尋範圍縮小一半，藉此快速鎖定目標值的位置。其先決條件是資料必須事先排序完成。

## 2. 生活案例比喻

* **翻字典找單字**：假設你要找字母 "M" 開頭的單字。你不會從第一頁開始一頁一頁翻，而是直接翻開字典中間。如果翻到的是 "J"，你就知道 "M" 在後半部，接著再從後半部的中間繼續翻，直到找到為止。
* **終極密碼（猜數字）遊戲**：朋友心裡想了一個 1 到 100 之間的數字。你猜 50，朋友說「太小了」，你就知道答案在 51 到 100 之間。接著你猜 75，朋友說「太大了」，範圍就縮小到 51 到 74。每次猜中間值能最快排除一半的錯誤答案。

## 3. 演算法運作步驟

假設要在**已遞增排序**的陣列 `arr` 中尋找目標值 `target`：

1. 設定搜尋範圍的左邊界 `left = 0`，右邊界 `right = 陣列長度 - 1`。
2. 當 `left <= right` 時（即搜尋範圍仍然有效），執行以下步驟：
   * 計算中間索引值 `mid = (left + right) // 2`。
   * 檢查 `arr[mid]` 是否等於 `target`：
     * 若等於：搜尋成功，回傳索引值 `mid`。
     * 若 `arr[mid] < target`：代表目標值在右半邊，更新左邊界 `left = mid + 1`。
     * 若 `arr[mid] > target`：代表目標值在左半邊，更新右邊界 `right = mid - 1`。
3. 若迴圈結束仍未找到目標，回傳 -1（表示未找到）。

## 4. 程式碼實作

### Python 實作範例

\```python
def binary_search(arr, target):
    """
    二分搜尋函式
    前提：arr 必須是已排序的陣列
    回傳目標值的索引，若無則回傳 -1
    """
    left = 0
    right = len(arr) - 1

    while left <= right:
        mid = (left + right) // 2  # 計算中間索引
        
        if arr[mid] == target:
            return mid             # 找到目標，回傳索引
        elif arr[mid] < target:
            left = mid + 1         # 目標在右半邊，移動左邊界
        else:
            right = mid - 1        # 目標在左半邊，移動右邊界
            
    return -1  # 未找到目標

# 測試區塊 (注意：資料必須已排序)
data = [1, 9, 17, 23, 45, 88]
target = 17

result = binary_search(data, target)

if result != -1:
    print(f"目標值位於索引: {result}")
else:
    print("未找到目標值")
\```

## 5. 複雜度分析

* **時間複雜度 (Time Complexity)**：
  * **最佳情況 (Best Case)**：$O(1)$。目標剛好在陣列的正中間，第一次比對就找到。
  * **最差情況 (Worst Case)**：$O(\log N)$。目標在陣列的最邊緣，或是不存在陣列中。每次範圍縮減一半，最多需比對 $\log_2 N$ 次。
  * **平均情況 (Average Case)**：$O(\log N)$。
* **空間複雜度 (Space Complexity)**：
  * $O(1)$。使用迴圈實作只需常數級別的額外變數（`left`, `right`, `mid`），不需額外配置記憶體空間。

## 6. 特性總結與適用時機

* **優點**：執行效率極高。即使面對一百萬筆資料，最多也只需要比對 20 次即可找到目標（$2^{20} \approx 10^6$）。
* **缺點**：先決條件嚴格，資料**必須事先排序**。若資料經常變動（頻繁新增、刪除），維護排序狀態的成本可能會大於搜尋帶來的效益。
* **APCS 考試應用**：在實作題第 3、4 題中，當資料量 $N \ge 10^5$ 時，線性搜尋會導致執行時間超時（TLE）。此時必須依賴二分搜尋法來縮短搜尋時間。Python 考生亦可熟練運用內建的 `bisect` 模組來快速實作二分搜尋。

## 7. LeetCode 實戰練習

以下題目依據難度與觀念分類，適合用來驗證二分搜尋的學習成果：

* **基礎觀念題 (Basic Concepts)**：
    * [704. Binary Search](https://leetcode.com/problems/binary-search/)：最標準的二分搜尋實作。
    * [35. Search Insert Position](https://leetcode.com/problems/search-insert-position/)：尋找插入位置（類似 lower_bound 概念）。
    * [278. First Bad Version](https://leetcode.com/problems/first-bad-version/)：尋找滿足條件的第一個位置。

* **進階應用題 (Advanced Applications)**：
    * [34. Find First and Last Position of Element in Sorted Array](https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/)：尋找目標值的起始與結束位置。
    * [33. Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/)：在旋轉過的排序陣列中搜尋（常見考題）。
    * [875. Koko Eating Bananas](https://leetcode.com/problems/koko-eating-bananas/)：**對答案二分搜 (Binary Search on Answer)**，APCS 第 3、4 題常見技巧。
