---
title: watch 与 watchEffect 的区别
createTime: 2026/04/07 16:27:54
permalink: /qa/vue/2hizbmbt/
---

`watchEffect` 是 Vue3 新增的 API，用于监听数据变化并执行相应的操作，提供一种简洁的方式来创建监听器。
它与 `watch` 的主要区别是：

- `watchEffect` 会在创建时自动执行一次，不需要设置 `immediate:  true` 选项。
- `watchEffect` 会自动追踪回调内访问的所有响应式依赖，不需要显示指定要侦听的数据源。
  而 `watch` 只追踪显示指定的数据源，并只在数据源发生变化时才触发回调。
