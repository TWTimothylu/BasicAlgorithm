# 合併排序 (Merge Sort) 演算法教學

## 1. 簡介

合併排序是一種基於「分治法 (Divide and Conquer)」的排序演算法。它的核心概念是將一個大問題拆解成許多小問題（拆分），分別解決這些小問題（遞迴排序），最後再將結果合併起來（合併）。

它是一種效率極高且穩定的排序法，廣泛應用於各種系統中。

## 2. 生活案例比喻

* **整理考卷**：老師有一大疊亂序的考卷要依照座號排序。
    1. **拆分**：先把這一大疊考卷平分成兩疊，分給兩個小老師去排。
    2. **遞迴**：小老師覺得太厚，再分成兩疊分給同學去排...直到每個人手上只有一張考卷（一張考卷自然是已排序的）。
    3. **合併**：接著兩兩合併。兩位同學各自拿著已排好的一疊考卷，比較最上面那張，誰的號碼小就先放回去，直到兩疊合為一疊有序的考卷。
* **合併兩副撲克牌**：假設你有兩疊已經依照數字排好的牌（例如 1~5 和 2~6）。要合併成一疊時，你只需要看兩疊最上面的牌，把比較小的拿出來放到新的一疊，重複這個動作即可。

## 3. 演算法運作步驟

1. **分割 (Divide)**：將目前陣列從中間切成兩半（左半部與右半部）。
2. **遞迴 (Conquer)**：對左半部與右半部這兩個子陣列，分別遞迴呼叫合併排序。
   * 終止條件：當陣列長度僅剩 1 或 0 時，視為已排序，直接回傳。
3. **合併 (Combine)**：將兩個「已排序」的子陣列，合併成一個大的已排序陣列。
   * 設定兩個指標分別指向兩個子陣列的開頭。
   * 比較兩個指標指向的值，將較小者放入結果陣列，並移動該指標。
   * 若某一個子陣列已取完，將另一個子陣列剩餘的元素直接補到結果陣列後方。

## 4. 程式碼實作

### Python 實作範例

\```python
def merge_sort(arr):
    # 終止條件：如果陣列長度 <= 1，直接回傳
    if len(arr) <= 1:
        return arr
    
    # 1. 分割 (Divide)
    mid = len(arr) // 2
    left_half = arr[:mid]
    right_half = arr[mid:]
    
    # 2. 遞迴排序 (Conquer)
    left_sorted = merge_sort(left_half)
    right_sorted = merge_sort(right_half)
    
    # 3. 合併 (Combine)
    return merge(left_sorted, right_sorted)

def merge(left, right):
    result = []
    i = 0  # 指向 left 的指標
    j = 0  # 指向 right 的指標
    
    # 比較兩邊的元素，將較小的放入結果
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
            
    # 將剩餘的元素補上 (通常只會剩下其中一邊)
    result.extend(left[i:])
    result.extend(right[j:])
    
    return result

# 測試區塊
data = [38, 27, 43, 3, 9, 82, 10]
print(f"排序前: {data}")

sorted_data = merge_sort(data)
print(f"排序後: {sorted_data}")
\```

## 5. 複雜度分析

* **時間複雜度 (Time Complexity)**：
  * **所有情況 (Best, Worst, Average)**：$O(N \log N)$。
  * 分割過程是 $\log N$ 層，每一層的合併操作需要 $O(N)$ 的時間。
  * 相比於氣泡、插入排序的 $O(N^2)$，合併排序在處理大量資料時非常快。
* **空間複雜度 (Space Complexity)**：
  * **$O(N)$**。因為合併過程需要一個額外的陣列來暫存結果，這也是它的一大缺點（需要較多記憶體）。

## 6. 特性總結與適用時機

* **穩定性 (Stability)**：**穩定**。
  * 在合併過程中，若 `left[i] == right[j]`，我們通常會優先選取左邊的元素（因為它原本就在前面），因此相同元素的相對順序不會改變。
* **優點**：
  * 效率高且穩定，時間複雜度始終維持在 $O(N \log N)$。
  * 適合**外部排序 (External Sorting)**：當資料量大到記憶體裝不下，必須放在硬碟時，合併排序是最佳選擇（將資料分批讀入排序後再合併）。
* **APCS 考試應用**：
  * **第 3、4 題**：必備觀念。除了排序本身，合併排序的過程常用來解**「逆序數對 (Inversion Count)」**問題（求數列中有多少組前大後小的配對），這是 APCS 的經典難題。

## 7. LeetCode 實戰練習

* **基礎題 (Basic)**：
    * [912. Sort an Array](https://leetcode.com/problems/sort-an-array/)：標準排序題，用 Merge Sort 可以通過。
    * [88. Merge Sorted Array](https://leetcode.com/problems/merge-sorted-array/)：**必練**。練習「合併」這個步驟，這是合併排序的核心。

* **進階應用題 (Advanced)**：
    * [21. Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/)：合併兩個已排序的鏈結串列。
    * [23. Merge k Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists/)：合併 K 個已排序串列（Hard 題，結合 Heap 觀念）。
    * [148. Sort List](https://leetcode.com/problems/sort-list/)：在鏈結串列上實作合併排序（要求 $O(N \log N)$ 時間與 $O(1)$ 空間，非常經典）。
    * [315. Count of Smaller Numbers After Self](https://leetcode.com/problems/count-of-smaller-numbers-after-self/)：利用合併排序的過程計算逆序數。
