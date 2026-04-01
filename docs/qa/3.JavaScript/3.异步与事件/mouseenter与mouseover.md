---
title: mouseenter 与 mouseover
createTime: 2026/03/31 15:16:34
permalink: /qa/js/r6uw0vk5/
---

::: tip 问题
`mouseenter` 与 `mouseover` 有什么区别？
:::

---

| 特性                         | `mouseenter`                               | `mouseover`                                    |
| ---------------------------- | ------------------------------------------ | ---------------------------------------------- |
| **是否冒泡**                 | ❌ 不冒泡                                  | ✅ 会冒泡                                      |
| **进入子元素时是否再次触发** | ❌ 不会                                    | ✅ 会（因为事件冒泡）                          |
| **触发时机**                 | 仅当鼠标**首次进入目标元素整体区域**       | 鼠标进入目标元素 **或其任何子元素** 时都会触发 |
| **常用于**                   | 需要“整体悬停”逻辑（如 Tooltip、下拉菜单） | 一般悬停效果（但需注意子元素干扰）             |

### 示例说明

```html
<div id="outer" style="padding: 20px; background: lightblue;">
  外层
  <div id="inner" style="padding: 20px; background: pink;">内层</div>
</div>
```

```js
const outer = document.getElementById("outer");

outer.addEventListener("mouseenter", () => {
  console.log("mouseenter");
});

outer.addEventListener("mouseover", () => {
  console.log("mouseover");
});
```

#### 操作 & 输出：

1. 鼠标从外层空白处进入 `#outer`：
   - `mouseenter` → 1 次
   - `mouseover` → 1 次

2. 鼠标从 `#outer` 移动到 `#inner`（子元素）：
   - `mouseenter` → **无输出**（因为仍在 `#outer` 区域内）
   - `mouseover` → **再次输出**！（因为 `#inner` 触发了 `mouseover`，并冒泡到 `#outer`）

3. 鼠标继续从 `#inner` 移动到 `#outer`：
   - `mouseenter` → **无输出**（因为仍在 `#outer` 区域内）
   - `mouseover` → **再次输出**！（因为 `#outer 触发了 `mouseover`）
`
这就是为什么 `mouseover` 容易“误触发”，而 `mouseenter` 更符合“整体悬停”的直觉。

### 对应的离开事件

| 进入事件     | 离开事件               |
| ------------ | ---------------------- |
| `mouseenter` | `mouseleave`（不冒泡） |
| `mouseover`  | `mouseout`（会冒泡）   |

同样，`mouseleave` 只在鼠标**完全离开整个元素区域**时触发，而 `mouseout` 在离开子元素时也会触发。
