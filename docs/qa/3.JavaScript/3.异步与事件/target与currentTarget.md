---
title: e.target 与 e.currentTarget
createTime: 2026/03/31 15:37:10
permalink: /qa/js/e8vhx3h1/
---

::: tip 问题
`e.target` 与 `e.currentTarget` 的区别是什么？
:::

---

`e.target` 与 `e.currentTarget` 都是 DOM 事件对象中的属性，用于获取触发事件的相关元素，当它们实际指向的元素不同。

- `e.target`：表示触发事件的实际元素。
- `e.currentTarget`：表示事件监听函数绑定的元素。

::: demo expanded
::: code-tabs
@tab HTML

```html
<div id="parent" style="background-color: red;padding: 0 20px;">
  parent
  <div id="child" style="background-color: blue; padding: 0 20px;">child</div>
</div>
```

@tab javascript

```js
document.getElementById("parent").addEventListener(
  "click",
  function (e) {
    console.log("e.target:", e.target); // 如果点按钮，打印 button；如果点 div 区域，打印 div
    console.log("e.currentTarget:", e.currentTarget); // 始终是 #parent 元素
  },
  true,
);
```

:::

### 如何在不同阶段触发监听？

`addEventListener()` 我们通常只传入了两个参数，但实际上还可以传入第三个参数，类型为 `boolean`，表示事件触发阶段。

- `false`：默认值，表示事件冒泡阶段触发。
- `true`：表示事件捕获阶段触发。

`click` 事件被触发后会经历两个阶段：捕获阶段，目标阶段，冒泡阶段。

- 捕获阶段：从最外层元素开始，向目标元素传递。此时事件尚未到达目标元素。
- 目标阶段：事件到达目标元素。
- 冒泡阶段：从目标元素开始，依次经过其父元素，向最外层元素传递。

下面是一个示例：

::: demo expanded
::: code-tabs
@tab HTML

```html
<div id="grandparent">
  <div id="parent">
    <button id="child">Click me</button>
  </div>
</div>
```

@tab javascript

```js
const log = (phase, id, e) =>
  console.log(`${phase}: ${id}，target: ${e.target.id}，currentTarget: ${e.currentTarget.id}`);

//
document
  .getElementById("grandparent")
  .addEventListener("click", (e) => log("capture", "grandparent", e), true);
document.getElementById("parent").addEventListener("click", (e) => log("capture", "parent",e), true);
document.getElementById("child").addEventListener("click", (e) => log("target", "child",e), true); // 捕获或冒泡都能触发 target

document.getElementById("child").addEventListener("click", (e) => log("target (bubble)", "child",e));
document.getElementById("parent").addEventListener("click", (e) => log("bubble", "parent",e), false);
document
  .getElementById("grandparent")
  .addEventListener("click", (e) => log("bubble", "grandparent",e), false);
```
:::

打开浏览器控制它，上面的代码执行结果为：

```
capture: grandparent，target: child，currentTarget: grandparent
capture: parent，target: child，currentTarget: parent
target: child，target: child，currentTarget: child
target (bubble): child，target: child，currentTarget: child
bubble: parent，target: child，currentTarget: parent
bubble: grandparent，target: child，currentTarget: grandparent
```

可以看到事件的执行是先从外层开始，依次向内执行（捕获阶段），然后内向外执行（冒泡阶段）。事件触发元素都为 child（因为点击的是 child 元素）。
