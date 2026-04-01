---
title: Number.isNaN() 与 isNaN()
createTime: 2026/04/01 09:42:53
permalink: /qa/js/w54g30sw/
---

<Question :questions="['Number.isNaN() 与 isNaN() 的区别？']" />

---

`Number.isNaN()` 与 `isNaN()` 最大区别在于是否会进行隐式类型转换。

`isNaN()` 会进行隐式类型转换，将传入的参数尝试转换为数值，不能转为数值的值都会返回 `true`，影响 NaN 的判断。

`Number.isNaN()` 不会进行隐式类型转换，先判断参数是否是数值，是数值才会继续判断是否是 NaN，因此不会造成非数字也被判断为 NaN。
