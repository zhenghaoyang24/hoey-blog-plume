---
title: typeof 的返回
createTime: 2026/03/31 16:48:52
permalink: /qa/js/305689ul/
---

下面的代码执行结果是什么？

<JSRunner :code="code" height="300" />

在 `JavaScript` 中，null 是一种 原始值，表示有意缺少任何对象值（空对象值），因此 `typeof null` 为 `"object"`。
而 `typeof` 返回一个字符串，表示操作数的类型。因此 `typeof typeof null` 返回 `"string"`。

`console.log()` 是一个函数输出 1 ，而没有返回值，因此 `typeof console.log()` 返回 `"undefined"`。

<script setup>
let code = `console.log(typeof typeof null)
console.log(typeof console.log(1))`
</script>
