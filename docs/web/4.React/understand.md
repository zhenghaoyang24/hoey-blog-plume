---
title: Understand
createTime: 2025/10/20 11:33:08
permalink: /web/react/Understand/
---

## 保持组件纯粹

> 部分 JavaScript 函数是 **纯粹** 的，这类函数通常被称为纯函数。纯函数仅执行计算操作，不做其他操作。你可以通过将组件按纯函数严格编写，以避免一些随着代码库的增长而出现的、令人困扰的 bug 以及不可预测的行为。

在 React 中，**保持组件纯粹** 是一个核心理念，源自函数式编程思想。它强调 **React 组件应当像纯函数一样工作**。

而一个纯函数具有以下特点：

- 1. 相同的输入，总是返回相同的输出。给定相同的参数，结果永远一致。
- 2. 只负责自己的任务。它不会更改在该函数调用前就已存在的对象或变量。

```js
// 纯函数
function add(a, b) {
  return a + b;
}

// 非纯函数 （依赖外部变量 + 修改外部状态）
let count = 0;
function addAndLog(a, b) {
  count++; // 副作用：修改外部变量
  console.log(count);
  return a + b + count;
}
```

上面的例子中，我们每一次调用 `addAndLog(1,2)` 函数， `count` 的值都会不一样。这就不符合相同输入总是返回相同输出的纯函数特点，因此 `addAndLog()` 函数是不纯的。

`React` 组件本质上是一个函数（函数组件）或 `render()` 方法（类组件）。为了确保可预测性、可测试性和高效渲染，组件在渲染过程中应保持纯粹，
而不改变在渲染前，就已存在的任何对象或变量。

在 React 中，副作用通常属于 事件处理程序。事件处理程序是 React 在你执行某些操作（如单击按钮）时运行的函数。
**即使事件处理程序是在你的组件内部定义的，它们也不会在渲染期间运行！** ==因此事件处理程序无需是纯函数。==

::: tip 为什么“纯粹性”很重要？

- 1. 可预测性：相同 props → 相同 UI，便于调试。
- 2. React 的并发渲染（Concurrent Rendering）依赖纯粹性
     React 可能会多次调用组件函数（如预渲染、中断恢复），如果组件有副作用，会导致意外行为。
- 3. Strict Mode 能帮你发现问题
     在开发模式下，Strict Mode 会故意双重调用渲染函数，暴露非纯组件的问题。
- 4. 便于测试：纯组件无需 mock 全局对象，直接传入 props 即可断言输出。
:::

[React - 保持组件纯粹](https://zh-hans.react.dev/learn/keeping-components-pure)

## 将 UI 视为树

在 React 中，**将 UI 视为一棵树** 。

React 应用由**组件**构成，而组件之间通过**嵌套**形成**树形结构**。

#### 示例：

```jsx
function App() {
  return (
    <div>
      <Header />
      <Main>
        <Sidebar />
        <Content />
      </Main>
      <Footer />
    </div>
  );
}
```

这会形成如下组件树：

```
App
├── div
│   ├── Header
│   ├── Main
│   │   ├── Sidebar
│   │   └── Content
│   └── Footer
```

**每个 React 组件都是树中的一个节点**，父组件是子组件的“容器”，子组件是父组件的“叶子”或“子树”。

这种树形结构使得 UI 具备：

- **层次性**：清晰的父子关系
- **可组合性**：小组件组合成复杂 UI
- **局部更新能力**：某一部分变化，只需更新子树

#### 什么是渲染树？

在 React 语境中，“渲染树”通常指：

> **由 React 元素（React Elements）组成的树形结构，它是组件执行后生成的、用于描述 UI 的中间表示。**

它不是浏览器原生的“渲染树”（CSSOM + DOM 合成的用于绘制的树），而是 React 内部用于**协调和更新**的数据结构。

[React - 将 UI 视为树](https://zh-hans.react.dev/learn/understanding-your-ui-as-a-tree)

## 渲染和提交

在 React 中，渲染组件的过程可以分为三个核心步骤：

1. **触发更新**  
   当组件的 `state` 或 `props` 发生变化时，React 会启动重新渲染流程。

2. **渲染阶段（Render Phase）**  
   React 调用组件函数，根据当前的 `props` 和 `state` 生成一棵新的 **React 元素树**（也称为虚拟 DOM 树或渲染树）。同时，React 将新树与旧树进行对比（协调，Reconciliation），确定需要更新的部分。  
   此阶段必须是**纯的**——不能包含副作用（如修改 DOM、发送请求等），且可能被 React 中断或重复执行。

3. **提交阶段（Commit Phase）**  
   一旦计算完成，React 会**同步地**将变更应用到真实 DOM，并执行副作用逻辑（如 `useEffect` 或类组件的 `componentDidMount/Update`）。  
   此阶段不可中断，是执行 DOM 操作和副作用的安全时机。

[渲染和提交](https://zh-hans.react.dev/learn/render-and-commit)
