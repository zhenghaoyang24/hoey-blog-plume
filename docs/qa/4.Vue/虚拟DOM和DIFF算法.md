---
title: 虚拟 DOM 和 DIFF 算法
createTime: 2026/03/09 10:16:23
permalink: /qa/vue/ps8664ca/
---

## 什么是虚拟 DOM？

**虚拟DOM**  本质上是一个 **用 JavaScript 对象来描述真实 DOM 结构** 的数据结构。
*   **真实 DOM:** 浏览器提供的庞大、复杂的对象树，操作成本高（触发重排 Reflow 和重绘 Repaint）。
*   **虚拟 DOM:** 轻量级的 JS 对象，操作成本极低。

真实 HTML：
```html
<div id="app" class="container">
  <h1>Hello</h1>
</div>
```

虚拟 DOM (简化版)：
```javascript
const vnode = {
  tag: 'div',
  props: { id: 'app', class: 'container' },
  children: [
    { tag: 'h1', props: {}, children: ['Hello'] }
  ]
};
```

虚拟 DOM 的核心思想是状态驱动视图。当数据变化时，我们不直接操作真实 DOM，而是生成新的虚拟 DOM 树，通过对比差异，最小化地更新真实 DOM。

## 为什么需要虚拟 DOM？

很多人误以为虚拟 DOM 是为了“快”，其实不完全准确。**虚拟 DOM 的核心价值在于“保证性能下限”和“开发体验”。**

1. **性能缓冲：**
    * 直接操作 DOM 是昂贵的。如果你循环 1000 次修改 DOM，浏览器可能重排 1000 次。
    * 虚拟 DOM 允许我们在 JS 层完成所有计算，最后一次性批量更新到真实 DOM。
2. **跨平台能力：**
    * 虚拟 DOM 只是 JS 对象。它可以映射到 Web DOM，也可以映射到 Native 组件（React Native）。
3. **声明式编程：**
    * 开发者只需关心 `state -> UI` 的映射，无需关心具体的 DOM 操作步骤（如 `appendChild`, `removeChild`）。

在极端性能敏感的场景（如高频动画），直接操作 DOM 依然比虚拟 DOM 快。虚拟 DOM 是用少量的性能损耗换取了开发效率和可维护性。

## Diff 算法

Vue 3 的 Diff 算法流程可以概括为 **“编译器优化 + 运行时智能对比”**。其核心目标是在保证正确性的前提下，通过跳过静态节点和减少 DOM 操作来提升性能。

Vue 3 的 `patch` 函数是 Diff 的入口，主要流程分为四个步骤：

1.  **根节点对比**：判断新旧 VNode 是否为同一类型（如 `div` 变 `span`）。
2.  **属性 Diff (Props)**：根据编译时的 `patchFlag` 只更新动态属性。
3.  **子节点 Diff (Children)**：
    *   若为文本，直接对比内容。
    *   若为数组（列表），使用 **最长递增子序列 (LIS)** 算法优化移动。
4.  **块树优化 (Block Tree)**：只遍历动态节点集合，跳过静态子树。

#### 1. 节点类型对比与静态提升

**流程**：
首先对比 `vnode1.type` 和 `vnode2.type`。如果不同，直接销毁旧节点，创建新节点。如果相同，且节点被标记为**静态提升**，则直接跳过，不进入 Diff。

**例子**：
```html
<!-- 模板 -->
<div>
  <p>我是静态文本</p>
  <p>{{ message }}</p>
</div>
```

**编译后 (JavaScript)**：
```javascript
// 1. 静态节点被提升为常量 (_hoisted_1)
const _hoisted_1 = createElementVNode("p", null, "我是静态文本")

function render(_ctx) {
  // 2. 动态节点带有 patchFlag: 1 (表示只有文本内容动态)
  return createElementVNode("div", null, [
    _hoisted_1, 
    createElementVNode("p", null, _ctx.message, 1 /* TEXT */)
  ])
}
```

**Diff 过程**：
1.  **对比 `div`**：类型相同，进入子节点 Diff。
2.  **对比第一个 `p`**：发现它是 `_hoisted_1`（引用地址相同），**直接跳过**，不进行任何 Diff 操作。
3.  **对比第二个 `p`**：发现 `patchFlag = 1`。Diff 算法知道**只需要对比文本内容**，不需要对比属性或子节点。
4.  **结果**：如果 `message` 没变，甚至不需要更新 DOM；如果变了，只更新 `textContent`。

#### 2. 属性 Diff (PatchFlags 优化)

**流程**：
如果没有 `patchFlag`，Vue 2 会遍历所有属性进行对比。Vue 3 根据 `patchFlag` 的二进制位，只对比变化的属性类型（如只对比 Class，或只对比 Style）。

**例子**：
```html
<!-- 模板 -->
<div :class="dynamicClass" :style="dynamicStyle" id="static-id">
  {{ text }}
</div>
```

**编译后**：
```javascript
// patchFlag: 13 (二进制 1101)
// 1 (TEXT) + 4 (STYLE) + 8 (PROPS/CLASS) = 13
createElementVNode("div", { 
  id: "static-id", 
  class: _ctx.dynamicClass, 
  style: _ctx.dynamicStyle 
}, _ctx.text, 13)
```

**Diff 过程**：
1.  读取 `patchFlag = 13`。
2.  算法解析二进制：
    *   位 0 为 1 (`TEXT`) -> 对比文本。
    *   位 2 为 1 (`STYLE`) -> 对比 `style` 属性。
    *   位 3 为 1 (`CLASS`) -> 对比 `class` 属性。
3.  **跳过**：`id="static-id"` 是静态属性，**完全跳过对比**。
4.  **结果**：减少了 50% 以上的属性对比开销。

#### 3. 列表 Diff (最长递增子序列 LIS)

这是 Vue 3 相比 Vue 2 最大的运行时优化。当子节点是带有 `key` 的数组时，Vue 3 使用 LIS 算法计算最少移动次数。

**流程**：
1.  **前后指针同步**：从头和尾开始对比，相同的节点直接 Patch，指针向中间移动。
2.  **中间部分处理**：
    *   如果新节点多 -> 挂载。
    *   如果旧节点多 -> 卸载。
    *   如果都有但顺序不同 -> **LIS 算法**。
3.  **LIS 逻辑**：在旧节点中找到一个**相对顺序与新节点一致的最长子序列**，这些节点**不需要移动**，其余节点移动到正确位置。

**例子**：
假设我们有一个列表，用户进行了拖拽排序。

*   **旧列表 (Old Children)**: `[A, B, C, D, E]`
*   **新列表 (New Children)**: `[A, E, D, C, B]`

**Diff 步骤**：

1.  **前缀同步**：
    *   对比 `A` 和 `A` -> 相同，Patch，指针后移。
    *   剩余旧：`[B, C, D, E]`，剩余新：`[E, D, C, B]`
2.  **后缀同步**：
    *   对比 `E` (旧尾) 和 `B` (新尾) -> 不同，停止。
3.  **中间部分 LIS 计算**：
    *   此时需要处理 `[B, C, D, E]` 变为 `[E, D, C, B]`。
    *   Vue 3 会建立映射：`{ B:1, C:2, D:3, E:4 }` (旧节点在新列表中的索引)。
    *   新列表对应的旧索引序列为：`[4, 3, 2, 1]` (对应 E, D, C, B)。
    *   **计算 LIS**：在 `[4, 3, 2, 1]` 中，最长递增子序列长度为 1 (任意一个数字)。
    *   **策略**：既然没有长的递增序列，说明大部分都要动。Vue 会计算出具体的移动操作。
    *   *优化场景*：如果是 `[A, B, C, D]` 变 `[A, C, B, D]`。
        *   中间序列对应索引：`[2, 1]` (C 在 B 后)。
        *   LIS 是 `[1]` (B) 或 `[2]` (C)。
        *   Vue 3 会保留 LIS 中的节点不动，移动其他节点。

**DOM 操作结果**：
Vue 3 会生成类似以下的 DOM 操作指令（伪代码）：
```javascript
// 假设 B, C, D, E 都已存在
insert(E, before: B)  // 将 E 移到 B 前面
insert(D, before: C)  // 将 D 移到 C 前面
// ... 具体移动顺序由算法保证最少操作
```
相比 Vue 2 的双端比较，LIS 在处理**乱序**列表时，能显著减少 DOM 节点的移除和重新创建，改为 `insertBefore` 移动操作。

#### 4. 块树 遍历优化

**流程**：
Vue 3 在编译时会将模板中的动态节点收集到一个数组中 (`dynamicChildren`)。Diff 时，不再递归遍历整棵树，而是直接遍历这个数组。

**例子**：
```html
<div>
  <div class="static-1">
    <div class="static-2">
      <p>{{ msg }}</p>  <!-- 动态节点 -->
    </div>
  </div>
</div>
```

**编译后结构**：
```javascript
// 块 (Block) 是一个特殊的 VNode，它记录了所有动态后代
const block = createElementBlock("div", null, [
  createElementVNode("div", { class: "static-1" }, [
    createElementVNode("div", { class: "static-2" }, [
      createElementVNode("p", null, _ctx.msg, 1)
    ])
  ])
], 1 /* 标记有一个动态子节点 */)
```

**Diff 过程**：
1.  进入 `div` (Block)。
2.  发现 `block.dynamicChildren` 数组。
3.  **直接遍历数组**：数组里只有那个 `<p>{{ msg }}</p>` 节点。
4.  **跳过**：中间所有的 `static-1`, `static-2` 层级结构全部跳过，不递归。
5.  **收益**：无论嵌套多深，Diff 复杂度只取决于动态节点的数量，与模板结构复杂度无关。
