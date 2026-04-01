---
title: new fn 与 new fn()
createTime: 2026/03/31 15:03:54
permalink: /qa/js/7xoz79a3/
---

<Question :questions="['new fn 与 new fn() 有什么区别？']" />

---

new 运算符的语义定义如下：

```js
new Constructor[([arguments])]
```

方括号 [] 表示可选。这意味着：
- 当构造函数不需要参数时，括号 () 是可选的。
- new fn 和 new fn() 在 JavaScript 引擎（如 V8）中会被解析为完全相同的抽象操作，都会创建一个新的对象实例，并执行构造函数体内的代码。

```js
function Person() {
  this.name = 'Master';
}

const p1 = new Person;
const p2 = new Person();

console.log(p1.name); // 'Master'
console.log(p2.name); // 'Master'
console.log(p1 instanceof Person); // true
console.log(p2 instanceof Person); // true
```

两者在功能上完全相同，都会执行构造函数并创建实例。区别仅在于是否传递参数和运算符优先级。

### 是否传递参数

```js

function Person(name) {
  this.name = name;
}

// 带括号：可以传参
const p1 = new Person('Alice');
console.log(p1.name);  // "Alice"

// 不带括号：无法传参（相当于传 undefined）
const p2 = new Person;
console.log(p2.name);  // undefined
```

### 运算符优先级

- new fn：先调用 fn,再 new 实例。
- new fn()：先 new 实例，再调用 fn。

像代码块1一样，在不访问实例属性的时候，两者没有区别。但除此之外，由于是否有 () 会改变语句的解析优先级，就可能会导致一些问题。

<JSRunner :code='code1' height='300' />

`new Foo().name` 相当于 `(new Foo()).name` ,先创建实例，再通过实例访问属性，所以能够访问属性，结果为 'Foo' 。
`new Foo.name` 相当于 `new (Foo.name)` ,先访问实例为 undefined ，所以 `mew undefined` 会抛出错误。

<script setup>
const code1 = `function Foo() {
  this.name = 'Foo'
}

console.log(new Foo().name)
console.log(new Foo.name)`
</script>
