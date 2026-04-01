---
title: new 操作符
createTime: 2026/04/01 09:56:28
permalink: /qa/js/dzqxagen/
---

<Question :questions="['new 操作符具体干了什么？']" />

---

`new` 操作符是 JavaScript 中用于创建对象实例的关键字。当执行 `new Fn(...args)` 时，JavaScript 引擎会**按顺序执行以下 4 个步骤**：

### 内部过程

```js
function Person(name) {
  this.name = name;
}
Person.prototype.sayHi = function () {
  console.log("Hi!");
};

const p = new Person("Alice");
```

#### 步骤 1：**创建一个全新的空对象**

```js
const newInstance = {};
```

#### 步骤 2：**将新对象的 `[[Prototype]]` 指向构造函数的 `prototype`**

```js
Object.setPrototypeOf(newInstance, Person.prototype);
// 等价于 newInstance.__proto__ = Person.prototype;
```

这一步建立了**原型链继承**，使新对象能访问 `Person.prototype` 上的方法（如 `sayHi`）。

#### 步骤 3：**将构造函数内的 `this` 绑定到新对象，并执行构造函数**

```js
const result = Person.call(newInstance, "Alice");
// 此时构造函数内 this === newInstance
// 所以 newInstance.name = 'Alice'
```

#### 步骤 4：**决定返回值**

- **如果构造函数显式返回一个对象** → 返回该对象；
- **否则** → 返回新创建的对象（即 `newInstance`）。

```js
// 情况1：构造函数无 return 或返回非对象
function A() {
  this.x = 1;
}
new A(); // → { x: 1 }

// 情况2：构造函数返回对象
function B() {
  return { y: 2 };
}
new B(); // → { y: 2 }（新对象被丢弃！）

// 情况3：构造函数返回原始值（无效）
function C() {
  return "hello";
}
new C(); // → { }（仍返回新对象，忽略字符串返回值）
```

### 手动模拟 `new` 的实现

<JSRunner :code="code" title="new模拟" />

### 注意事项

1. **箭头函数不能用 `new`**  
   因为箭头函数没有 `prototype`，也没有自己的 `this`。

2. **`new.target` 可检测是否通过 `new` 调用**

   ```js
   function Foo() {
     if (!new.target) throw new Error("必须用 new 调用！");
   }
   ```

3. **ES6 Class 本质仍是 `new` + 原型**
   ```js
   class MyClass {}
   // 等价于
   function MyClass() {}
   // 但 class 默认启用严格模式，且不能直接调用（必须 new）
   ```

### 总结：`new` 做了什么？

| 步骤 | 行为                                   | 目的             |
| ---- | -------------------------------------- | ---------------- |
| 1    | 创建空对象 `{}`                        | 准备实例容器     |
| 2    | 设置 `[[Prototype]]` → `Fn.prototype`  | 实现继承         |
| 3    | 执行 `Fn`，`this` 指向新对象           | 初始化实例属性   |
| 4    | 智能返回（优先返回构造函数返回的对象） | 兼容特殊返回逻辑 |

<script setup>
const code = `function Person(name) {
  this.name = name;
}

function Dog(name) {
  this.name = name;
  return 'Dog'  
}

function Cat(name) {
  this.name = name;
  return {
    name: 'Cat'
  }
}

function myNew(constructor, ...args) {
  // 1. 创建新对象
  const obj = {};
  
  // 2. 链接到构造函数的 prototype
  Object.setPrototypeOf(obj, constructor.prototype);
  
  // 3. 绑定 this 并执行构造函数
  const result = constructor.apply(obj, args);
  
  // 4. 返回对象 or 新实例
  return (result !== null && typeof result === 'object') ? result : obj;
}

// 使用 myNew
const p = myNew(Person, 'Alice');
console.log(p);

// 构造函数返回原始值，返回新对象
const d = myNew(Dog, 'Bob');
console.log(d);

// 构造函数返回对象，丢弃新对象
const c = myNew(Cat, 'Dudu');
console.log(c);`
</script>