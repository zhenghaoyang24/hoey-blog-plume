---
title: Composition API
createTime: 2026/03/09 13:33:19
permalink: /qa/framework/vue/fvzo42zo/
---

<Question :questions="['Composition API 相比 Options API 有哪些优点？']" />

---

1.  **逻辑复用更优雅**
    通过 **Composables** 取代 Vue 2 的 Mixins，彻底解决了命名冲突、数据来源不清晰和 `this` 指向混乱的问题，逻辑复用更透明、安全。

2.  **代码组织更合理**
    允许按**业务逻辑功能**聚合代码（将数据、方法、生命周期放在一起），而非强制按选项（data/methods/mounted）分割。解决了大型组件中代码“反复横跳”难以维护的痛点。

3.  **TypeScript 支持更友好**
    基于函数式写法，无需复杂的泛型推导或装饰器，TypeScript 类型推断更准确、自然，重构更安全。

4.  **更灵活且体积更小**
    打破了选项式 API 的结构限制，支持更好的 **Tree-shaking**（未使用的 API 可被移除），打包体积更优，更适合编写底层逻辑库和无头组件。
