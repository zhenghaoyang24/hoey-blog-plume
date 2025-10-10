---
title: Vue2与Vue3的区别
createTime: 2025/02/05 13:21:37
permalink: /web/interview/lrdm06i5/
---

::: tip 问题
vue2 与 vue3 有哪些区别？
:::

---

### 1. 响应式系统
- **Vue 2**：基于 `Object.defineProperty()` 实现，通过劫持对象属性的 `getter` 和 `setter` 追踪变化。存在局限性，无法检测对象属性的添加或删除，对数组部分操作（如通过索引修改元素、修改数组长度）不能触发响应式更新。
- **Vue 3**：采用 `Proxy` 对象实现，能拦截对象多种操作，可全面追踪数据变化，解决了 Vue 2 响应式系统的局限，对对象属性的添加、删除及数组操作都能很好地进行响应式处理。

### 2. 组合式 API 与选项式 API
- **Vue 2**：使用选项式 API，通过 `data`、`methods`、`computed`、`watch` 等选项组织代码。组件逻辑复杂时，同一功能代码分散，降低了代码可读性和可维护性。
- **Vue 3**：引入组合式 API，有 `setup` 函数及一系列组合式函数，允许按逻辑功能组织代码，将相关代码放一起，提高了代码复用性和可维护性。

### 3. 生命周期钩子
- **Vue 2**：有 `beforeCreate`、`created`、`beforeMount`、`mounted`、`beforeUpdate`、`updated`、`beforeDestroy`、`destroyed` 等钩子函数。
- **Vue 3**：部分钩子名称改变，如 `beforeDestroy` 变为 `onBeforeUnmount`，`destroyed` 变为 `onUnmounted`；还可在 `setup` 中使用组合式 API 形式的生命周期钩子。

### 4. 性能优化
- **Vue 2**：虚拟 DOM 采用传统的 Diff 算法，在处理大规模数据更新时性能会受到一定影响。
- **Vue 3**：采用了静态提升、Patch Flag 等优化技术。静态提升可减少重复创建静态节点，Patch Flag 能精准标记动态节点，提高 Diff 算法效率，提升渲染性能。

### 5. 破坏性变更

- `v-model` 语法变更（默认使用 `modelValue` 替代 `value`）。
- 事件总线 ($on/$off) 被移除，推荐使用第三方库（如 `mitt`）。

### 6. 类型支持
- **Vue 2**：对 TypeScript 的支持相对较弱，使用时需要额外的配置和声明文件。
- **Vue 3**：从设计上就对 TypeScript 有更好的支持，组合式 API 能更自然地与 TypeScript 集成，代码类型更清晰。 
