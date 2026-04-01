---
title: Math 的常用方法
createTime: 2026/04/01 10:45:47
permalink: /qa/js/jqpojcf2/
---

<Question :questions="['Math 的常用方法有哪些？']" />

---

## 取整

```js
Math.floor(3.9); // 向下取整（向负无穷） 3
Math.ceil(3.1); // 向上取整（向正无穷） 4
Math.round(3.5); // 四舍五入 4
Math.trunc(3.9); // 截取小数点 3
```

## 最值
```js
Math.max(1, 2, 3, 4, 5); // 5
Math.min(1, 2, 3, 4, 5); // 1
```

## 随机数
```js
Math.random(); // 0-1 之间的随机数
```

## 函数
```js
Math.abs(-3); // 绝对值 3
Math.sqrt(9); // 平方根 3
Math.pow(2, 3); // 幂运算 8
```
