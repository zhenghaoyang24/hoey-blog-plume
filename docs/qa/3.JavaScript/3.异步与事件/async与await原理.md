---
title: async与await原理
createTime: 2026/03/31 15:19:56
permalink: /qa/js/lpsfz1r1/
---

::: tip 问题
async/await 的实现原理是什么？
:::

---

async/await 是基于 Promise 的语法糖。async 函数会自动返回一个 Promise，而 await 会暂停函数执行，直到等待的 Promise 完成。
在引擎层面，现代 JavaScript 引擎（如 V8）将 async 函数编译为状态机，每个 await 对应一个状态，Promise 完成后通过微任务恢复执行。
这使得异步代码可以像同步一样编写，同时保持非阻塞特性。

TODO: async 与 await 的实现原理
