---
title: React
createTime: 2025/10/16 17:05:16
permalink: /web/react/
tags:
  - React
---

## JSX

JSX 是 JavaScript 的扩展语法，它与 React 是相互独立的东西，但 JSX 往往与 React 一起使用，用于构建用户页面。

同时，在标签的属性或标签内用 `{}` ，则可以在 `{}` 里面添加一些 JavaScript 逻辑或者引用动态的属性。

JSX 语法可以像 HTML 一样，直接在 JS 中描述标签，但需要遵循一些规则：

### 规则

#### 1. 只能返回一个根元素 

如果想要在一个组件中包含多个元素，需要用**一个**父标签把它们包裹起来。父标签可以是
`<div>`、`<button>` 等，也可以用 `<>` 和 `</>` 元素来代替：

```jsx
export default function TodoList() {
  return (
    <>
      <h1>Todo List</h1>
    </>
  );
}

```

#### 2. 标签必须闭合

JSX 中的标签必须要有开始标签和结束标签，若是自闭和标签则必须用 `/>` 来闭合：

```jsx
export default function Profile() {
    return (
        <div>
            <h1>React</h1>
            <img src="logo.png" alt="react logo"/>
        </div>
    )
}
```

#### 3. 驼峰命名法

在 React 中，大部分 `HTML` 和 `SVG` 属性都用驼峰式命名法表示：

```jsx
<img 
  src="https://i.imgur.com/yXOvdOSs.jpg" 
  alt="Hedy Lamarr" 
  className="photo" // [!code highlight]
/>
```

## 组件

### 定义组件

React 应用是由被称为 组件 的独立 UI 片段构建而成。React 组件是一段可以 使用标签进行扩展 的 JavaScript 函数。
当我们把函数名称大写时，React 会将此函数视为组件。

```jsx
export default function Profile() {
  return (
    <div>
        <h1>React</h1>
    </div>
  )
}
```

### 导入导出组件

React 中组件的导入和导出方式与 [JavaScript的导入导出方式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/export) 一样：

```jsx
import Profile from './Profile.js';
// 或者
import Profile from './Profile';

export default function App() {
  return (
    <Profile />
  );
}
```

### 条件渲染





