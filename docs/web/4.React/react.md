---
title: React 基础
createTime: 2025/10/16 17:05:16
permalink: /web/react/
draft: true
tags:
  - React
---

## 简介

React 是一个用于构建用户界面的开源 JavaScript 库。起初由 Facebook 的软件工程师 Jordan Walke 创建，并于 2013 年 5 月宣布开源。

在早期 web 界面使用 JS 或者 JQuery 的来构建用户界面。这种方式需要一步步更改代码操作 DOM 来改变页面：找到 DOM 节点、更改样式、修改内容、还要考虑到数据的状态，这叫做**命令式编程**。

React 的核心思想可以被精炼为一个优雅的公式：UI = f(State)。

这个公式的含义是：用于界面仅仅是应用程序状态的一个函数。使用 React 构建页面，不需要再考虑如何在各种数据变化下一步步操作 DOM 来修改页面，只需要描述在特定状态下，界面是什么样子。
React 能够高效的比较差异，更改真实 DOM 中需要变化的部分。这被称作声明式编程，其优点相比命令式编程是显而易见的。

## JSX

### 简介

JSX 全称 JavaScript XML， 是一种类似于 XML 的 JavaScript 的语法扩展，本质是 `React.createElement(...)` 的语法糖。
React 官方推荐使用 JSX 来描述 UI 结构。

在 React 17 之前，JSX 需要通过 Babel 等构建工具编译为 `React.createElement(...)` 调用，并且组件文件中必须显式导入 `React`。
但从 **React 17 开始，React 引入了新的 JSX 转换**，不再依赖 `React.createElement`，也不再强制要求导入 `React`。

例如，以下 JSX 代码：

```jsx
// JSX 代码
export default function App() {
  return (
    <header>
      <h1 style={{ color: "red" }}> Hello, React! </h1>
    </header>
  );
}
```

在启用了新 JSX 转换后，会被 Babel 编译为类似这样的 JavaScript：

```js
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

export default function App() {
  return _jsxs("header", {
    children: _jsx("h1", {
      style: { color: "red" },
      children: "Hello, React!",
    }),
  });
}
```

这里使用的 `_jsx` 和 `_jsxs`（用于带多个子元素的情况）来自 `react/jsx-runtime`，是 React 内部提供的轻量运行时函数。开发者无需手动导入它们——构建工具会自动处理。

这些函数会创建 **React 元素对象**，然后由 ReactDOM（或 React Native 等渲染器）将这些对象转换为真实的 DOM 节点并插入页面。
最终，用户在浏览器中看到的是标准的 HTML：

```html
<header>
  <h1 style="color: red;">Hello, React!</h1>
</header>
```

因此，尽管底层实现发生了变化，JSX 依然是对 React 元素创建过程的一种简洁、直观的语法封装——本质上，它仍然是“语法糖”，只是在 React 17+ 中变得更轻量、更自动化了。

### 规则

JSX 语法可以像 HTML 一样，直接在 JS 中描述标签，**但需要遵循一些规则**。

#### 1. 只能返回一个根元素

如果想要在一个组件中包含多个元素，需要用 **一个** 父标签把它们包裹起来。父标签可以是
`<div>`、`<button>` 等，也可以用 `<> ... </>` 元素来代替：

```jsx
export default function TodoList() {
  return (
    <>
      <h1>Todo List</h1>
    </>
  );
}

// 也可以这样写

export default function TodoList() {
  return <h1>Todo List</h1>
}
```

#### 2. 标签必须闭合

JSX 中的标签必须要有开始标签和结束标签，若是自闭和标签则必须用 `/>` 来闭合：

```jsx
export default function Profile() {
  return (
    <div>
      <h1>React</h1>
      <img src="logo.png" alt="react logo" />
    </div>
  );
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

#### 4. 内联样式使用对象

组件样式推荐使用内联样式，能够让每个组件都包含组件的所有代码。

```jsx
style={{color:'skyblue',fontSize:'24px'}}
```

#### 5. 标签混入 **JS 表达式** 时要用 `{}`

```jsx
<div>
  <p>{a + b}</p> // [!code highlight]
</div>
```

::: warning

`{}` 中能够写入的是 JS 表达式，而不是 JS 语句。

表达式是能计算出一个值的代码片段，例如：

```js
{
  2 + 3;
} // 返回 5
{
  x * y;
} // 返回 x 和 y 的乘积
{
  ("hello");
} // 字符串字面量，返回 "hello"
{
  foo();
} // 函数调用表达式，返回函数的返回值
{
  [1, 2, 3];
} // 数组字面量，返回 123
x > 0 ? "pos" : "neg"; // 三元表达式
```

语句是执行某种操作的完整指令，不直接产生值。例如用于控制程序流程、声明变量、定义函数等。

```js
let x = 5;           // 变量声明语句
if (x > 0) { ... }   // 条件语句
for (let i = 0; i < 10; i++) { ... } // 循环语句
function foo() {}    // 函数声明语句
return x;            // return 语句
```

:::

## 组件

React 应用是由被称为 组件 的独立 UI 片段构建而成。组件是用来实现局部功能的代码和资源的集合。组件化可以复用代码，提高开发与运行效率。

### 定义组件

- **类组件**

使用 ES6 `class` 继承 `React.Component`：

```jsx
class Counter extends React.Component {
  // 构造器函数
  constructor(props) {
    super(props);
    // this 指向 Counter 实例对象
    this.state = { count: 0 };
  }

  // 供实例使用的方法
  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  // render() 必须写，且要有返回值
  render() {
    return (
      <div>
        <p>{this.state.count}</p>
        <button onClick={this.increment}>+</button>
      </div>
    );
  }
}
```

- **函数组件**

函数组件是一个 JavaScript 函数，==当我们把函数名称大写时，React 会将此函数视为组件。==

```jsx
import { useState } from "react"; // 引入 useState Hooks

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}
```

从上面的代码可以看出来函数式组件更简洁，逻辑复用更简单。类式组件是 React 16.8 版本之前创建组件的方式。

React 16.8（2019）推出了 hooks API，函数组件成为与类组件平级的主流开发方式，而后官方持续强化函数组件生态，如今 **函数组件 + Hooks** 已成为主流开发范式。
React 团队也明确表示：未来不会为类组件添加新功能，函数组件是推荐的编写方式。

:::table title="方式对比"
| 特性 | 类式组件 | 函数式组件 |
|--------------------|-----------------------------------|----------------------------------------|
| 语法简洁性 | 冗长，需处理 `this` 绑定 | 简洁、直观，无 `this` 问题 |
| 状态管理 | `this.state` + `this.setState()` | `useState` / `useReducer` |
| 逻辑复用 | 需借助 HOC 或 render props，较复杂 | 自定义 Hooks，组合性强、复用简单 |
| 性能优化 | `shouldComponentUpdate` 或 `PureComponent` | `React.memo`、`useMemo`、`useCallback` |
| React 官方推荐 | ❌ 已不再推荐新项目使用 | ✅ **当前及未来推荐的方式** |
| 新特性支持（React 18+）| 不支持（如并发渲染、新 Hooks） | 完全支持 |
:::

### 导入导出组件

React 中组件的导入和导出方式与 [JavaScript 的导入导出方式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/export) 一样：

```jsx
import Profile from "./Profile.js";
// 或者
import Profile from "./Profile";

export default function App() {
  return <Profile />;
}
```

### Props

React 组件通过 Props 来传递数据。父组件通过属性向子组件传递数据，子组件通过形参接收数据。在子组件中，不要修改 props。

::: tabs
@tab App.jsx

```jsx
export default function App() {
  let name = "React";
  return (
    <Profile name={name} desc="用于构建 Web 和原生交互界面的库" /> // [!code highlight]
  );
}
```

@tab Profile.jsx

```jsx
export default function Profile(props) {
  // [!code highlight]
  return (
    <div>
      <h1>{props.name}</h1>
      <p>{props.desc}</p>
    </div>
  );
}
```

:::

在子组件中，可以对 props 进行解构和设置默认值：

```jsx
export default function Profile({ name = "React", desc }) {
  // [!code highlight]
  return (
    <div>
      <h1>{name}</h1>
      <p>{desc}</p>
    </div>
  );
}
```

props 还可以传递组件的子内容。它与 [Vue 中的插槽](https://cn.vuejs.org/guide/components/slots.html) 一样，
用于将父组件的内容“透传”到子组件的指定位置，实现组件的灵活组合。

:::tabs

@tab Parent.jsx

```jsx
function Parent() {
  return (
    <Children title="This is title">
      <p>This is the text</p>
      <button>Click me</button>
    </Children>
  );
}
```

@tab Children.jsx

```jsx
function Children({ children, title }) {
  return (
    <div className="card">
      {title && <h2>{title}</h2>}
      <div className="card-body">{children}</div>
    </div>
  );
}
```

:::

`<Children />` 传入的子内容会通过 `children` 属性传递给子组件。并在子组件中 `{children}` 的位置进行渲染。

### 条件渲染

在 Vue 中，我们使用 `v-if` 、 `v-else` 和 `v-else-if` 指令来实现条件渲染。而在 React 中，
我们使用 `JavaScript` 中的 `if` 语句、`&&` 和 `? :` 运算符来选择性地渲染 JSX。

```jsx
export default function App() {
  const isOpen = true;
  if (isOpen) {
    return <div>Open</div>;
  } else {
    return <div>Close</div>;
  }
}
```

使用三目运算符能够大大减少代码量：

```jsx
export default function App() {
  const isOpen = true;
  return <div>{isOpen ? "Open" : "Close"}</div>;
}
```

如果我们想在条件成立时渲染一些 JSX，或者不做任何渲染，可以使用逻辑与运算符 `&&`：

```jsx
export default function App() {
  const did = true;
  return <div>学习 React{did && "✅"}</div>;
}
```

当我们的判断更加复杂，可以 **选择性地将 JSX 赋值给变量**，这种方式代码更冗长，但更加灵活。

```jsx
export default function App() {
  const did = true;
  let content;
  if (did) {
    content = <div>学习 React✅</div>;
  }
  return <div>{content}</div>;
}
```

### 列表渲染

在 Vue 中，我们可以在标签上使用 `v-for` 指令来实现列表渲染。而在 React 中，
我们是通过 `JavaScript` 的数组方法来操作数组中的数据。例如使用 `filter()` 筛选需要渲染的组件、使用 `map(`) 把数组转换成组件数组。

```jsx
export default function List() {
  const people = [
    { id: 0, name: "Max", profession: "数学家" },
    { id: 1, name: "Nores", profession: "物理学家" },
  ];
  const listItems = people.map((person) => <li key={person.id}> ... </li>);
  return <ul>{listItems}</ul>;
}
```

::: tip
直接放在 map() 方法里的 JSX 元素一般都需要指定 key 值，`key` 属性应该保持不变。
:::

## 事件处理函数

### 事件处理函数

在 React 中，我们可以使用 `onClick`、`onChange`、`onSubmit` 等属性来监听事件。

处理函数通常在组件内定义，名称约定以 `handle` 开头，后跟事件名称，将其作为 Props 传入。

```js
export default function Button() {
  function handleClick() {
    alert("You clicked!");
  }
  return <button onClick={handleClick}> Click </button>;
}
```

若事件处理函数需要接收参数，应该使用 `{}` 包起来：

::: tabs

@tab AlertButton.jsx

```js
function AlertButton({ message, children }) {
  // [!code highlight]
  return <button onClick={() => alert(message)}>{children}</button>;
}
```

@tab App.jsx

```jsx
export default function Toolbar() {
  return (
    <div>
      <AlertButton message="Upload image">Upload iamge</AlertButton>
    </div>
  );
}
```

:::

::: warning

传递给事件处理函数的函数应直接传递，而非调用。

| （传递一个函数）正确                    | （调用一个函数）错误               |
| --------------------------------------- | ---------------------------------- |
| `<button onClick={handleClick}>`        | `<button onClick={handleClick()}>` |
| `<button onClick={() => alert('...')}>` | `<button onClick={alert('...')}>`  |

事件处理函数作为 Props 传递时，应该直接传递，如果有参数应该使用箭头函数。

若是直接调用，函数会在每次组件渲染时触发，而非用户操作时触发。

:::

### 阻止传播

事件处理函数会捕获来自任何子组件的事件，也就是事件会向父元素传播。

在 Vue 中，我们使用 `.stop` 修饰符来阻止事件传播，在 React 中，我们可以使用 `event.stopPropagation()` 来阻止事件传播。

```js
function Button({ onClick, children }) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation(); // [!code highlight]
        onClick();
      }}
    >
      {children}
    </button>
  );
}
```

在上面的代码中，定义在 `Button` 组件中的事件处理函数会调用 `e.stopPropagation()` 来阻止事件冒泡，然后执行 `onClick()`。

### 阻止默认行为

在 Vue 中，我们可以使用 `.prevent` 修饰符来阻止默认行为，在 React 中，我们可以使用 `event.preventDefault()` 来阻止默认行为。

```js
export default function Signup() {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault(); // [!code highlight]
        alert("提交表单！");
      }}
    >
      <input />
      <button>发送</button>
    </form>
  );
}
```

## State

### `useState()`

与在 Vue 中一样，在模板中使用普通变量，当变量改变时不会触发渲染。

在 React 中，我们可以使用 `useState` Hook 来创建一个响应式变量，它接收一个默认值（可以是一个有返回值的箭头函数），并返回一个数组。数组的第一个元素是变量的值，第二个元素是更新变量的函数。
第二个更改变量的函数我们约定使用 `set` + 变量名来命名如 `setIndex`，更改 index 时需要使用 `setIndex` 函数来更新变量。

```js
import { useState } from "react"; // [!code highlight]

export default function App() {
  const [index, setIndex] = useState(0); // [!code highlight]

  function handleAdd() {
    setIndex(index + 1); // [!code highlight]
  }

  return (
    <>
      <button onClick={handleAdd}>{index}</button>
    </>
  );
}
```

::: collapse

- 类组件中如何更改 state ？

  在类组件中 state 同样不能直接更改，不过是通过 `setState` 来更新。
  注意：setState 是合并更新，更改对象某一个属性，只需传入该属性，不需要传入所有属性。而 `useState()` 则是覆盖更新，需要传入所有属性。
  可以阅读 [state 陷阱](#state-陷阱)。

  ```jsx
  import React, { Component } from "react";

  export default class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        index: 0,
      };
    }

    handleAdd = () => {
      this.setState({ index: this.state.index + 1 }); // [!code highlight]
    };

    render() {
      return (
        <>
          <button onClick={this.handleAdd}>{this.state.index}</button>
        </>
      );
    }
  }
  ```

:::

### state 快照

React 中的 state 本质就是 **组件某一时刻状态的“快照”**，它定格了当前数据，且不能直接修改，只能通过生成新“快照”来触发组件更新。

“快照”的核心是“定格某一时刻的状态”，这一点在 React state 上体现为两个关键规则：

1. **state 不可直接修改（快照不能涂改）**  
   生成的 state 快照就像拍好的照片，不能直接在原照片上涂改内容。比如你有一个`count`状态，直接写`this.state.count = 1`（类组件）或`count = 1`（函数组件）完全无效，React 不会感知到变化，也不会重新渲染组件。

2. **更新 state = 生成新快照**  
   要修改状态，必须通过 React 提供的“重拍快照”方法：类组件用`this.setState()`，函数组件用`setState`（useState 返回的修改函数）。调用这些方法时，React 会基于当前快照生成**新的 state 快照**，再用新快照重新渲染组件。

state 的快照特性，最明显的体现是 `setState` 的“异步更新” —— 调用 `setState` 后，当前作用域内的 state 还是旧快照，新快照要等下一次渲染才生效。

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    // 此时的count是“当前渲染的快照”，值为0
    setCount(count + 1);
    // 调用setState后，当前作用域的count依然是旧快照（0），不是1！
    console.log(count); // 输出：0（而非预期的1）
  };

  // 组件重新渲染时，会使用setCount生成的“新快照”（count=1）
  return <button onClick={handleClick}>点击次数：{count}</button>;
}
```

- 点击按钮时，`setCount`只是“提交了生成新快照的请求”，但没有立即替换当前的`count`（旧快照）。
- `console.log(count)` 读取的还是“当前渲染周期的旧快照”，所以输出 0；
- 只有等 React 处理完更新，进入**下一次渲染**时，才会用新快照（count=1）更新组件，页面上的数字才会变成 1。

React 的渲染逻辑完全基于 **快照对比**，流程如下：

1. 组件首次渲染时，React 生成 **初始 state 快照** ，并基于这个快照渲染 DOM。
2. 当调用 `setState`（或`useState`的修改函数）时，React 会根据传入的新值生成 **新的 state 快照**。
3. React 对比“旧快照”和“新快照”：如果数据有变化，就基于新快照重新渲染组件；如果没变化，就跳过渲染（性能优化）。
4. 重新渲染后，组件内读取的 state 都会变成新快照的值，直到下一次更新。

### state 陷阱

1. ==永远不要认为调用 `setState` 后，下一行代码就能拿到新 state，因为当前快照还没切换。==

如上面的例子中，在同一个作用域中调用多次 `setState`，每次拿到的并不是新的快照，新快照要等下一次渲染才生效。

2. ==如果你的 state 变量是一个对象时，不能只更新其中的一个字段而不显式复制其他字段。==

比如 `const [position, setPosition] = useState({ x: 0, y: 0 });` ,若只更新其中一个字段需要传入整个对象字段，可以使用 `...` 扩展运算符，
这样你就不需要单独复制每个属性。

```jsx
setUser({
  ...position, // 使用扩展运算符传入整个对象
  y: 1,
});
```

数组同理：

```jsx
const [user, setUser] = useState([]);

setUser([...user, { id: 100, name: "React" }]);
```

### 共享状态

> 有时候，你希望两个组件的状态始终同步更改。要实现这一点，可以将相关 state 从这两个组件上移除，并把 state 放到它们的公共父级，再通过 props 将 state 传递给这两个组件。这被称为“状态提升”，这是编写 React 代码时常做的事。

简而言之，将 state 放在父组件，使用 props 传递给子组件，子组件将会共享父组件的 state。

```js :collapsed-lines=25
import { useState } from "react";

export default function Accordion() {
  const [activeIndex, setActiveIndex] = useState(0); // [!code highlight]
  return (
    <>
      <h2>哈萨克斯坦，阿拉木图</h2>
      <Panel title="关于" isActive={activeIndex === 0} onShow={() => setActiveIndex(0)}>
        阿拉木图人口约200万，是哈萨克斯坦最大的城市。它在 1929 年到 1997 年间都是首都。
      </Panel>
      <Panel title="词源" isActive={activeIndex === 1} onShow={() => setActiveIndex(1)}>
        这个名字来自于 <span lang="kk-KZ">алма</span>
        ，哈萨克语中“苹果”的意思，经常被翻译成“苹果之乡”。事实上，阿拉木图的周边地区被认为是苹果的发源地，
        <i lang="la">Malus sieversii</i> 被认为是现今苹果的祖先。
      </Panel>
    </>
  );
}

function Panel({ title, children, isActive, onShow }) {
  return (
    <section className="panel">
      <h3>{title}</h3>
      {isActive ? <p>{children}</p> : <button onClick={onShow}>显示</button>}
    </section>
  );
}
```

### 保留和重置

各个组件的 state 是相互隔离的，**但状态并不存在组件内**，而是由 React 来保存状态。那 React 如何知道哪个 state 属于哪个组件呢？

React 会为 UI 中的组件结构构建渲染树，通过组件在渲染树中的位置将它保存的每个状态与正确的组件关联起来。

==也就是说 state 是否是保留还是重置，与组件被渲染在 UI 树的位置有关。==

```js
export default function App() {
  return (
    <div>
      <Counter />
      <Counter />
    </div>
  );
}
```

上面的两个 `<Counter />` 组件是在父 div 下的两个不同子节点，因此这两个组件的 state 相互独立，互不影响。

==如果一个组件总是被渲染在 UI 树中的同一位置，那么它的 state 就会被保留。== 如果它被移除，或者其他组件被渲染到这个位置，那么它的 state 就会被重置。

```js :collapsed-lines=15
import { useState } from "react";

export default function App() {
  const [dark, setDark] = useState(false);

  return (
    <div>
      {" "}
      // [!code focus]
      <Counter isDark={dark} /> // [!code focus]
      <button onClick={() => setDark(!dark)}>切换 {dark ? "浅色" : "深色"} 模式</button> // [!code focus]
    </div> // [!code focus]
  );
}

function Counter({ isDark }) {
  const [count, setCount] = useState(0);

  return (
    <div
      style={{
        padding: "10px",
        color: isDark ? "white" : "black",
        backgroundColor: isDark ? "#333" : "#fff",
        border: "1px solid #ccc",
      }}
    >
      点击次数: {count}
      <button onClick={() => setCount((c) => c + 1)}>+1</button>
    </div>
  );
}
```

上面的例子中 ，点击切换按钮，更改了 `<Counter />` 组件的 `isDark` 属性后样式随着发生变化，但它在父组件的位置没有改变，也就是说在 UI 树中的位置没有改变，
React 认为它是同一个组件，所有 `<Counter />` 的 state 会被保留。

==从以上的例子我们知道了，状态与渲染树中的位置有关。相同位置的相同组件状态会保留，相同位置的不同组件状态会重置。==

如果我们要使用相同组件进行条件渲染，但是不想要它们的状态被保留，而是不同的组件切换时是有新的状态应该怎么做？

- 1. 将组件渲染在不同位置：

```js
return (
  <div>
    {/* 在相同位置，state 保留 */}
    {isPlayerA ? ( // [!code --]
      <Counter person="Taylor" /> // [!code --]
    ) : (
      // [!code --]
      <Counter person="Sarah" /> // [!code --]
    )} // [!code --]
    {/* 在不同位置，state 重置 */}
    {
      isPlayerA && <Counter person="Taylor" /> // [!code ++] // [!code ++]
    } // [!code ++]
    {
      !isPlayerA && <Counter person="Sarah" /> // [!code ++] // [!code ++]
    }{" "}
    // [!code ++]
  </div>
);
```

- 2. 使用 key

```js
return (
  <div>
    {/* 在相同位置，state 保留 */}
    {isPlayerA ? ( // [!code --]
      <Counter person="Taylor" /> // [!code --]
    ) : (
      // [!code --]
      <Counter person="Sarah" /> // [!code --]
    )} // [!code --]
    {/* 使用 key，state 重置 */}
    {isPlayerA ? ( // [!code ++]
      <Counter key="Taylor" person="Taylor" /> // [!code ++]
    ) : (
      // [!code ++]
      <Counter key="Sarah" person="Sarah" /> // [!code ++]
    )} // [!code ++]
  </div>
);
```

在组件上使用 key 可以告诉 React 这些是不同的组件，在组件切换时 state 也因此不会被保留。

## reducer

### useReducer

假如我们有一个复杂的数组对象，要对其进行添加、删除、修改、查询等操作，并返回新的数组对象。
如果使用 `useState`，我们就需要定义多个事件处理函数，并使用多个 `setState` 来更新状态，逻辑将会越来越复杂。
并且，当我们需要在其他方也对这个复杂的数组对象进行相同操作时，我们就又不得不写很多相同的代码，状态逻辑也越来越混乱。
这时候就可以使用 `useReducer` 来解决这个问题。

在 React 中，**reducer** 是一种用于 **集中管理复杂状态逻辑** 的模式，接收当前状态（state）和一个动作（action），返回新的状态。

React 通过内置 Hook **`useReducer`** 提供了对 reducer 模式的原生支持，特别适用于以下场景：

- 状态逻辑较复杂（如包含多个子值）
- 下一个状态依赖于前一个状态
- 需要在多个组件间共享或复用状态更新逻辑
- 希望让状态更新更可预测、可测试（类似 Redux 的思路）

### 基本用法

```tsx
const [state, dispatch] = useReducer(reducer, initialState);
```

- `reducer`: 一个纯函数，格式为 `(state, action) => newState`
- `initialState`: 初始状态
- 返回值：
  - `state`: 当前状态
  - `dispatch`: 用于派发 action 的函数

1. `dispatch` 接收一个对象叫作 action 并传递给 reducer 函数，告诉 React 用户做了什么。

```jsx
// 根据 id 删除
function handleDeleteTask(taskId) {
  dispatch({
    type: "deleted",
    id: taskId,
  });
}

// 修改
function handleChangeTask(task) {
  dispatch({
    type: "changed",
    task: task,
  });
}
```

::: tip
`action` 就是一个普通的 JavaScript 对象，其结构与字段没有限制。type 可以叫 option、可以叫 category 等等，但一般需要包含发生了什么的信息，
并且尽量选择一个能够清晰描述发生事情的名字！
:::

1. `reducer` 函数就是放置状态逻辑的地方。它接受两个参数，分别为当前 state 和 action 对象，并且返回的是更新后的 state。

```jsx
function yourReducer(state, action) {
  // state 为当前状态
  // action 为动作对象
  // 返回值为新的状态
}
```

在 reducer 函数中，通常使用 switch 语句来判断行为。

```jsx
function tasksReducer(tasks, action) {
  switch (action.type) {
    case "changed": {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case "deleted": {
      return tasks.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error("未知 action: " + action.type);
    }
  }
}
```

3. 从 React 导入 `useReducer` Hook。

```jsx
import { useReducer } from "react";
```

```jsx
const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
```

reducer 函数可以移到一个单独的文件。

::: tabs
@tab App.jsx

```jsx
import { useReducer } from 'react';
import tasksReducer from './tasksReducer.js'; // [!code highlight]

export default function TaskApp() {
  // 引入 useReducer
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  // 编写 dispatch
  function handleAddTask(text) {
    dispatch({
      type: 'added',
      id: nextId++,
      text: text,
    });
  }

  return (
    ...
  );
}

// 初始数据
const initialTasks = [
];

```

@tab tasksReducer.js

```jsx
export default function tasksReducer(tasks, action) {
  switch (action.type) {
    case "added": {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    default: {
      throw Error("未知 action：" + action.type);
    }
  }
}
```

:::

### 使用 Immer 简化 reducer

在 React 中，`useImmerReducer` 是一个非常强大的工具，用来简化状态管理逻辑，特别是在处理复杂嵌套状态时。
它是基于 Immer 库的一个自定义 Hook，结合了 `useReducer` 和 Immer 的优势，允许开发者以“可变”的方式直接修改状态，而无需手动创建不可变副本。

在 React 的 `useReducer` 中，更新状态需要遵循不可变性原则。这意味着你需要手动复制和展开对象或数组，这在处理嵌套状态时会变得非常繁琐。

```javascript
function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_NAME":
      return {
        ...state,
        user: {
          ...state.user,
          name: action.payload,
        },
      };
    default:
      return state;
  }
}
```

你需要手动复制嵌套对象或数组，随着状态结构的复杂化（如多层嵌套），代码会变得冗长且难以维护。

通过 `useImmerReducer`，可以直接修改状态的 `draft` ，而无需手动展开对象或数组。最终生成的新状态仍然是不可变的。

要使用 `useImmerReducer`，首先需要安装 `use-immer` 包：

```bash
npm install use-immer
```

然后在代码中引入 `useImmerReducer` ：

```javascript
import { useImmerReducer } from "use-immer";
```

1. **`useImmerReducer` 的签名**：

   ```javascript
   const [state, dispatch] = useImmerReducer(reducer, initialState);
   ```

   - `reducer`：接收 `(draft, action)` 参数，返回修改后的状态。
   - `initialState`：初始状态。
   - `state`：当前状态。
   - `dispatch`：用于触发状态更新。

2. **`draft` 的作用**：

   - `draft` 是一个“草稿”对象，你可以直接对它进行修改。
   - 修改完成后，`useImmerReducer` 会根据你的操作生成一个新的不可变状态。

3. **状态更新**：
   - 在普通 `useReducer` 中，你需要手动复制嵌套对象或数组。
   - 在 `useImmerReducer` 中，你只需要直接修改 `draft`，例如：
     ```javascript
     draft.user.name = action.payload;
     draft.posts.push(action.payload);
     ```

下面是一个使用 `useImmerReducer` 的例子：

```javascript
function reducer(draft, action) {
  switch (action.type) {
    case "UPDATE_NAME":
      draft.user.name = action.payload; // 直接修改 draft
      break;
    case "ADD_POST":
      draft.posts.push(action.payload); // 直接修改数组
      break;
    default:
      break;
  }
}
```

## Context

### 使用

当我们需要将数据传递给子组件时，通常会使用 `props`，这在组件层级比较少时很有效。
但是当数据层级较深时，例如要将数据传递给孙子组件，`props` 的传递会很麻烦：需要将数据通过 props 层层传递。这时，我们可以使用 `Context` 。

Context 提供一种跨层级共享数据的方式，让任意后代组件都能直接访问祖先组件提供的数据，无需手动逐层传递 props。

- 1. 创建一个 Context 并导出。

Context 使用 `createContext` hook 创建，它只接受一个默认值参数，可以是任何类型。

```jsx
import { createContext } from "react";

export const LevelContext = createContext();
```

- 2. 提供 context。用使用 `createContext` 创建的组件将可能需要用到 context 的子组件包裹起来。

```jsx
import { LevelContext } from "./LevelContext.js";

export default function Add() {
  return <LevelContext value={需要传递的数据}>...</LevelContext>;
}
```

- 3. 使用 context。

引入 `useContext` Hook 以及创建的 context：

```jsx
import { useContext } from "react";
import { LevelContext } from "./LevelContext.js";
```

使用 `useContext` Hook 从 `LevelContext` 获取 context 的值：

```jsx
export default function NeedContext() {
  const level = useContext(LevelContext);
  // ...
}
```

### 注意事项`

在 React 中，Context 虽能解决跨层级传参问题，但极易被滥用。
**优先考虑显式传递 props**（即使经过多层），或**通过抽象组件并用 `children` 传递 JSX** 来减少中间层依赖——这能让数据流更清晰、组件更可维护。
只有当多个远距离组件确实需要共享**低频、全局性数据**（如主题、用户状态、路由信息）时，才应使用 Context，并注意拆分 Context。

## Ref

在 React 中，**`ref`** 是一种用于**访问 DOM 元素或在组件多次渲染之间“记住”某个值**的机制。它有两个主要用途：

- 1. **访问真实的 DOM 节点**，如聚焦输入框、测量尺寸、播放视频等。
- 2. **存储可变值（类似实例变量）**，该值在组件重新渲染时**不会丢失**，且**修改它不会触发重新渲染**

### useRef

在函数组件中，使用 `useRef` Hook 创建 ref：

```jsx
const ref = useRef(initialValue);
```

- `ref` 是一个**普通 JavaScript 对象**，结构为 `{ current: initialValue }`
- 修改 `ref.current` **不会触发组件重新渲染**
- 值在组件整个生命周期内**持久存在**

**何时使用？**

- 1. 访问 DOM 元素

```jsx
import { useRef, useEffect } from "react";

function TextInput() {
  const inputRef = useRef(null);

  useEffect(() => {
    // 自动聚焦输入框
    inputRef.current.focus();
  }, []);

  return <input ref={inputRef} type="text" />;
}
```

- 2. 存储可变值

当你需要一个**在渲染之间保持不变的可变值**（如计时器 ID、上次 props 值、手势坐标等），`useRef` 是理想选择：

```jsx
function Timer() {
  const intervalRef = useRef(null);
  const [count, setCount] = useState(0);

  const start = () => {
    intervalRef.current = setInterval(() => {
      setCount((c) => c + 1);
    }, 1000);
  };

  const stop = () => {
    clearInterval(intervalRef.current);
  };

  // 清理定时器
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div>
      <p>{count}</p>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </div>
  );
}
```

::: tip 为什么不用 `useState` 存定时器 ID？  
因为每次 `setInterval` 都会创建新闭包，旧的 `intervalId` 无法被清理。而 `ref.current` 始终指向最新值。
:::

### 与 `useState` 的区别

| 特性                   | `useState`                           | `useRef`                                                      |
| ---------------------- | ------------------------------------ | ------------------------------------------------------------- |
| 修改值是否触发重渲染？ | ✅ 是                                | ❌ 否                                                         |
| 值是否在渲染间持久化？ | ✅ 是（通过状态）                    | ✅ 是（通过 `current`）                                       |
| 适合存储什么？         | 需要 UI 响应的数据（如表单值、计数） | 不需要触发 UI 更新的可变数据（如 timer ID、DOM 引用、上次值） |

### `forwardRef` <Badge type="warning" text="< v19" />

在 v19 之前，ref **不能直接传递给函数组件**（因为函数组件没有“实例”）。若希望父组件能访问子组件内部的 DOM，需使用 `forwardRef`：

```jsx
// 子组件：暴露内部 input 的 ref
const FancyInput = forwardRef((props, ref) => {
  return <input ref={ref} className="fancy" {...props} />;
});

// 父组件：获取子组件内部 input 的 DOM
function App() {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus(); // ✅ 成功聚焦
  };

  return (
    <>
      <FancyInput ref={inputRef} />
      <button onClick={focusInput}>Focus Input</button>
    </>
  );
}
```

### 注意事项

1. **不要滥用 ref**  
   优先使用 props 和 state 管理数据流。ref 应仅用于：

   - 必须操作 DOM 的场景（聚焦、动画、媒体控制）
   - 存储与 UI 无关的可变数据

2. **避免在渲染中读写 ref.current（除非必要）**  
   因为它会破坏 React 的纯函数特性，可能导致难以调试的问题。

3. **TypeScript 中需指定泛型**
   ```ts
   const inputRef = useRef<HTMLInputElement>(null);
   const countRef = useRef<number>(0);
   ```

## Effect

### `useEffect`

React 组件应尽可能保持**纯函数** —— 给定相同的 props 和 state，总是返回相同的 JSX。  
而 `useEffect` 正是处理“不纯”逻辑的安全出口。所谓“副作用”，是指 **组件渲染之外的操作**，例如：

- 数据获取
- 订阅事件
- 手动 DOM 操作
- 设置定时器（`setTimeout` / `setInterval`）
- 日志记录、埋点等

#### 1. 语法

```jsx
useEffect(setup, dependencies);
```

- `setup`：一个函数，包含副作用逻辑
- `dependencies`：依赖数组（`[dep1, dep2, ...]`），决定 `setup` 何时重新执行

#### 2. 三种行为

`useEffect` 在初次渲染时都会执行一次，如果是在严格模式下初次渲染则会执行两次。

| 写法                               | 行为                     |
| ---------------------------------- | ------------------------ |
| `useEffect(() => { ... }, [])`     | 只在初始渲染时执行       |
| `useEffect(() => { ... }, [a, b])` | 当 `a` 或 `b` 变化时执行 |
| `useEffect(() => { ... })`         | 每次渲染后都执行         |

::: warning
`useEffect` 应该只用于副作用，而不是用于驱动应用逻辑流。如果 `useEffect` 只是在同步 React 内部状态，那么很可能有更好的方式。参考 [你可能不需要 Effect](https://zh-hans.react.dev/learn/you-might-not-need-an-effect)。
:::

### 依赖数组

依赖数组可以包含多个依赖项。只有当你指定的 所有 依赖项的值都与上一次渲染时完全相同，React 才会跳过重新运行该 Effect。
**“依赖数组应包含所有在 effect 中使用的、可能变化的值”**

包括：

- props（如 `userId`）
- state（如 `count`）
- 函数（如 `handleSubmit`）
- 从 props/state 衍生的值（如 `user.name`）

```jsx
// 错误：count 不在依赖数组中 → effect 永远读取初始 count=0
useEffect(() => {
  const id = setInterval(() => {
    setCount(count + 1); // 总是 setCount(0 + 1)
  }, 1000);
  return () => clearInterval(id);
}, []);
```

在 Effect 中直接更新 state 就像是把电源插座的插头插回自身：Effect 运行、更新 state、触发重新渲染、于是又触发 Effect 运行、再次更新 state，继而再次触发重新渲染。如此反复，从而陷入死循环。

### 清理函数

React 中的清理函数与 Vue 中清理函数 设计目的与运行时机很相似：==为了释放资源，解决[竞态问题](/qa/basic/javascript/01obwm1d/#竞态问题)；在副作用执行之前执行上一次的清理函数，在组件卸载时执行最后一次清理函数。==

**在开发环境中**，React 会在组件首次挂载后立即重新挂载一次，所以中间会额外执行一次清理函数。
之所以会额外的执行一次清理函数，是因为在开发环境下 React 会对逻辑进行压力测试，检测代码中的 bug，帮助找到需要清理的 Effect。

#### 1. **数据获取（Data Fetching）**

如果 Effect 需要获取数据，清理函数应 中止请求 或忽略其结果：

```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let cancelled = false; // 防止竞态（race condition）

    fetchUser(userId).then((data) => {
      if (!cancelled) setUser(data);
    });

    return () => {
      cancelled = true; // 组件卸载时取消
    };
  }, [userId]); // userId 变化时重新获取

  return <div>{user?.name}</div>;
}
```

#### 2. **事件监听**

如果在 Effect 订阅了某些监听事件，清理函数应退订这些事件：

```jsx
function WindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // 初始化

    return () => window.removeEventListener("resize", handleResize); // [!code highlight]
  }, []);

  return (
    <p>
      Window: {size.width} x {size.height}
    </p>
  );
}
```

#### 3. 触发动画

如果在 Effect 触发了一些动画，清理函数应将动画重置为初始状态：

```jsx
useEffect(() => {
  const node = ref.current;
  node.style.opacity = 1; // 触发动画
  return () => {
    node.style.opacity = 0; // 重置为初始值
  };
}, []);
```

## 自定义 Hook

如果我们有一些组件需要使用相同的逻辑，那么我们可以将它封装成一个自定义 Hook。我们就可以直接在组件中使用用这个自定义 Hook，减少重复的代码。

==自定义 Hook 的名称必须以 `use` 开头，然后紧跟一个大写字母，并且你可以返回任意类型的值。==

由于自定义 Hook 需要以 `use` 开头，因此我们在命名其它函数的时候，应该避免以 `use` 开头。如果一个函数内部使用了哪怕一个 Hook，那么这个函数
都应该以 `use` 开头，让它成为一个 Hook。

==自定义 Hook 只是封装了逻辑，因此它共享的是状态逻辑，而不是状态本身。==

但我们在不同的组件中调用自定义 Hook，Hook 内部的状态会相互独立，不会相互干扰。