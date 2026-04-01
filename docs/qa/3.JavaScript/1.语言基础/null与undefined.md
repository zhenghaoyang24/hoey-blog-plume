---
title: null 与 undefined 的区别
createTime: 2026/03/31 14:15:16
permalink: /qa/js/qhhupyye/
---

<Question :questions="['`null` 与 `undefined` 的区别？']" />

---

`null` 和 `undefined` 都表示“没有值”，但它们的含义和使用场景不同：

- **`undefined`** 表示一个变量已经声明，但尚未被赋值；或者访问对象中不存在的属性；或者函数调用时未提供某个参数。它是 JavaScript 引擎自动赋予的“默认无值”状态，代表“缺少值”或“未初始化”。

- **`null`** 是一个可以被开发者显式赋值的值，表示“有意为空”或“没有对象”。它通常用于表明某个变量或属性当前不指向任何对象，是程序逻辑中主动设置的“空值”。

在类型上，`typeof undefined` 返回 `'undefined'`，而 `typeof null` 错误地返回 `'object'`（这是 JavaScript 的历史遗留 bug）。

在相等性上，`null == undefined` 为 `true`（抽象相等比较中的特例），但 `null === undefined` 为 `false`（严格相等，类型不同）。

因此，**`undefined` 是“系统认为这里没值”，`null` 是“开发者说这里没值”**。
