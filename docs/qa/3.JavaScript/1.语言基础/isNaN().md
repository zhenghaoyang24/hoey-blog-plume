---
title: isNaN() 与 Number.isNaN()
createTime: 2026/03/31 14:23:01
permalink: /qa/js/23ssjpc4/
---

::: tip 问题
`isNaN()` 与 `Number.isNaN()` 的区别是什么？
:::

---

NaN：NaN 是 JavaScript 中的一个特殊值，全称是 Not a Number，本应返回数值，但计算结果不是合法数字。

`Number.isNaN()` 与 `isNaN()` 最大区别在于是否会进行隐式类型转换。

`isNaN()` 会进行隐式类型转换，将传入的参数尝试转换为数值，不能转为数值的值都会返回 `true`，影响 NaN 的判断。

`Number.isNaN()` 不会进行隐式类型转换，先判断参数是否是数值，是数值才会继续判断是否是 NaN，因此不会造成非数字也被判断为 NaN。

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
