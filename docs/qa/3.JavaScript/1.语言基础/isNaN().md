---
title: isNaN() 与 Number.isNaN()
createTime: 2026/03/31 14:23:01
permalink: /qa/js/23ssjpc4/
---

::: tip 问题
`isNaN()` 与 `Number.isNaN()` 的区别是什么？
:::

---

`Number.isNaN()` 与 `isNaN()` 最大区别在于是否会进行隐式类型转换。

`isNaN()` 会先强制转换值为数字再判断，导致字符串、undefined、对象等被误判为 NaN；
`Number.isNaN()` 严格判断"值本身就是 NaN 数字"，不会强制转换，结果更可靠。

```js
// 字符串
isNaN("NaN"); // true, 字符串转数字变成 NaN
Number.isNaN("NaN"); // false, 字符串不是 NaN

// undefined
isNaN(undefined); // true, undefined 转数字变成 NaN
Number.isNaN(undefined); // false, undefined 不是 NaN

// 对象
isNaN({}); // true, {} 转数字变成 NaN
Number.isNaN({}); // false, 对象不是 NaN

// 空数组
isNaN([]); // false, [] 转数字变成 0
isNaN([1, 2]); // true, [1,2] 转数字变成 NaN
Number.isNaN([]); // false
Number.isNaN([1, 2]); // false
```
