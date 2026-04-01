---
title: for-in 与 for-of
createTime: 2026/03/31 11:47:03
permalink: /qa/js/mmieh7uf/
---

<Question :questions="['for...in 与 for...of 的区别？']" />

---

`for...in` 与 `for...of` 是 JavaScript 中两种不同的遍历语法，**用途、遍历目标和行为完全不同**。

### 1. **`for...in`**

- **遍历对象的可枚举属性名**（key/索引），包括继承的可枚举属性。
- 主要用于 **对象**（Object），但也可用于数组（**不推荐**）。

```js
const obj = { a: 1, b: 2 };
for (const key in obj) {
  console.log(key, obj[key]); // 'a' 1, 'b' 2
}

const arr = ["x", "y"];
for (const index in arr) {
  console.log(index, arr[index]); // '0' 'x', '1' 'y' （输出字符串索引！）
}
```

**问题**：

- 遍历数组时，`index` 是 **字符串**（如 `'0'`），不是数字。

### **`for...of`**

- **遍历可迭代对象的值**（value），如数组、字符串、Map、Set、NodeList 等。

```js
const arr = ["x", "y"];
for (const value of arr) {
  console.log(value); // 'x', 'y'
}

const str = "hi";
for (const char of str) {
  console.log(char); // 'h', 'i'
}

const map = new Map([
  [1, "a"],
  [2, "b"],
]);
for (const [k, v] of map) {
  console.log(k, v); // 1 'a', 2 'b'
}
```

**优点**：

- 直接拿到**值**，无需通过索引访问。
- 支持 `break`、`continue`、`return`。
- **顺序可靠**（按迭代器协议定义的顺序）。