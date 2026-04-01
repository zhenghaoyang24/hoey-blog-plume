---
title: ref 和 reactive
createTime: 2026/03/24 17:03:43
permalink: /qa/vue/lf28qmhk/
---

<Question :questions="['ref 和 reactive 有什么区别？']" />

---

### 1. 支持类型

`ref` 可以用于任意类型，包括基本类型与对象。但 `reactive` 只能用于对象与数组。

### 2. 访问方式

访问 `ref` 创建的响应数据时，需要使用 `.value` 访问。而访问 `reactive` 创建的相应数据时，不需要使用 `.value` 访问。

### 3. 替换对象

`ref` 创建的响应对象，可以直接整个替换且不会丢失响应性。而 `reactive` 创建的响应对象，不能直接替换，否则变为普通 JS 对象。

```js
let user = ref({ name: 'Alice' });
user.value = { name: 'Bob' }; // 响应式保留

let state = reactive({ name: 'Alice' });
// state 变成了普通对象，丢失响应式
state = { name: 'Bob' }; 
// 使用 Object.assign 或 修改属性
Object.assign(state, { name: 'Bob' });
state.name = 'Bob';
```

由于 `reactive` 相比 `ref` 有诸多限制，如今官方建议使用 `ref` 作为声明响应式状态的主要 API。
