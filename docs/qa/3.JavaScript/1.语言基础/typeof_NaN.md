---
title: typeof NaN 的结果
createTime: 2026/03/31 14:19:11
permalink: /qa/js/chxce6h9/
---

<Question :questions="['typeof NaN 的结果是什么？']" />

---

NaN 意为：Not a Number，即“非数字”。它是 number 类型的特殊值，作为数学计算发生错误的返回结果。所以 `typeof NaN` 返回 `'number'`。

由于 NaN 与其它任何值包括自身都不相等，因此判断 NaN 必须用 `Number.isNaN()` 。
