---
title: 捕获 Promise 拒绝的方式
createTime: 2026/03/31 16:37:58
permalink: /qa/js/vws3ehwh/
---

::: tip 问题
`.catch` 与 `.then(undefined, err => {})` 的区别是什么？
:::

---

`.catch(onRejected)` 与 `.then(onFulfilled, onRejected)` 的第二参数（即 `onRejected`）**都能捕获 Promise 的拒绝（rejection）**，但它们在**错误捕获范围**上有关键区别：

### 关键区别

| 方式 | 能捕获的错误范围 |
|------|------------------|
| `.then(null, onRejected)` | **仅能捕获前一个 Promise 的拒绝** |
| `.catch(onRejected)`      | **能捕获前面整个链中任何未处理的拒绝（包括 `.then` 回调内部抛出的错误）** |

### 示例说明

#### 情况 1：捕获前一个 Promise 的 reject
```js
Promise.reject('err')
  .then(null, err => console.log('A:', err)); // 捕获 → "A: err"

Promise.reject('err')
  .catch(err => console.log('B:', err));      // 捕获 → "B: err"
```
此时两者行为相同。

#### 情况 2：捕获 `.then` 回调内部抛出的错误
```js
Promise.resolve()
  .then(() => {
    throw new Error('boom!');
  })
  .then(null, err => console.log('C:', err)); // 不会执行！
```

- 第二个 `.then` 的 `onRejected` **只监听前一个 Promise 的状态**；
- 前一个 Promise 是 **fulfilled**（虽然回调抛错），所以走 `onFulfilled` 分支；
- 抛出的错误会**跳过当前 `.then` 的 `onRejected`**，继续向后传递。

而用 `.catch`：
```js
Promise.resolve()
  .then(() => {
    throw new Error('boom!');
  })
  .catch(err => console.log('D:', err.message)); // ✅ 捕获 → "D: boom!"
```
`.catch` 能捕获链中**任何未处理的 rejection 或抛错**。

::: tip 拓展
`.catch` 内部实际也是通过调用 `.then(null, onRejected)` 实现捕获错误，且 `.catch` 实际上会返回一个新的 Promise 状态。
若显示返回 `Promise.reject()` 或 捕获了错误则返回一个 rejected 状态的 Promise。若没有显示返回，则实际返回了 `Promise.resolve(undefined)`。

`.then(onResolved, onRejected)` 只接收函数作为参数，非函数参数会被静默忽略，值会原封不动地传递到下一个链。
:::

拓展阅读：[编码与实现-捕获 Promise 的错误](/qa/js/3vuuriz9/)
