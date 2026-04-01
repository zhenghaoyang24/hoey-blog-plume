---
title: ES6 新增特性
createTime: 2026/03/31 11:49:42
permalink: /qa/js/bon4oek6/
---

<Question :questions="['ES6 新增了哪些特性？']" />

---

### 一、变量与作用域

- **`let` / `const`**  
  块级作用域，解决 `var` 的变量提升和全局污染问题。
  ```js
  let a = 1;
  const PI = 3.14; // 不可重新赋值
  ```

### 二、函数与参数

- **箭头函数（Arrow Functions）**  
  简洁语法，**无自己的 `this`**，继承外层作用域。
  ```js
  const add = (a, b) => a + b;
  ```
- **默认参数**
  ```js
  function greet(name = 'Guest') { ... }
  ```
- **剩余参数（Rest Parameters）**
  ```js
  function sum(...nums) {
    return nums.reduce((a, b) => a + b);
  }
  ```
- **扩展运算符（Spread Operator）**
  ```js
  const arr = [1, ...[2, 3], 4]; // [1, 2, 3, 4]
  ```

### 三、对象与数组

- **解构赋值（Destructuring）**
  ```js
  const [a, b] = [1, 2];
  const { name, age } = user;
  ```
- **对象字面量增强**
  ```js
  const name = "Alice";
  const obj = {
    name,
    getName() {
      return this.name;
    },
  };
  ```
- **模板字符串（Template Literals）**
  ```js
  const msg = `Hello, ${name}!`;
  ```

### 四、模块化

- **`import` / `export`**

  ```js
  // math.js
  export const add = (a, b) => a + b;
  export default subtract;

  // main.js
  import subtract, { add } from "./math.js";
  ```

### 五、类与面向对象

- **`class` 语法糖**
  ```js
  class Animal {
    constructor(name) { this.name = name; }
    speak() { console.log(this.name); }
  }
  class Dog extends Animal { ... }
  ```

### 六、异步编程

- **Promise**（标准化异步控制流）
  ```js
  fetch('/api').then(res => res.json()).catch(err => ...);
  ```
- **`Symbol`**  
  唯一且不可变的原始类型，常用于避免属性名冲突。
  ```js
  const id = Symbol("id");
  obj[id] = 123;
  ```

### 七、数据结构

- **`Map` / `Set` / `WeakMap` / `WeakSet`**
  ```js
  const map = new Map([
    ["a", 1],
    ["b", 2],
  ]);
  const set = new Set([1, 2, 2]); // {1, 2}
  ```

### 八、其他重要特性

- **`for...of` 循环**：遍历可迭代对象（如数组、Map、Set、字符串等）。
  ```js
  for (const item of [1, 2, 3]) console.log(item);
  ```
- **模块化的 `import()` 动态导入**（虽在 ES2020 正式标准化，但源于 ES6 模块思想）。
- 引入**块级作用域**和**常量**；
- 提供**类、模块、解构、箭头函数**等现代语法；
- 标准化**Promise** 和 **新的集合类型**；
- 极大提升了代码的**可读性、可维护性与工程化能力**。
