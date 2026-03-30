---
title: v-if 和 v-for 同时使用
createTime: 2026/03/30 15:34:51
permalink: /qa/framework/vue/typ0wym2/
---

<Question :questions="['`v-if` 和 `v-for` 为什么不建议同时使用？']" />

---

当 `v-if` 和 `v-for` 使用在同一元素上时，在 Vue2 中，`v-for` 的优先级比 `v-if` 高，意味着 `v-for` 迭代的每一项，
都会执行 `v-if` 的判断逻辑，可能导致性能问题；在 Vue3 中，`v-if` 的优先级比 `v-for` 高，意味着 `v-if` 无法访问
`v-for` 迭代的变量。

## 解决方法

- 先使用计算属性过滤掉不需要的数据，再使用 `v-for` 渲染。
- 若确实需要同时使用 `v-if` 和 `v-for`，可以将 `v-for` 放在 `v-if` 的外层，避免优先级的问题。
