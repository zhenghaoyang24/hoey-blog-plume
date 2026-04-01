---
title: 改变 this 指向
createTime: 2026/04/01 09:53:15
permalink: /qa/js/si6ddi6j/
---

<Question :questions="['改变 this 指向的方法有哪些？','call、apply、bind 的区别？']" />

---

`apply`、`call`、`、bind` 都是用来改变函数执行上下文的，也就是函数运行时 this 的指向。

### apply

`apply` 接收两个参数：`function.apply(thisArg, [argsArray])`。第一个参数是 this 的指向，第二个参数是函数接收的参数且以数组的形式传入。且第一个参数为 `null` 或 `undefined` 时 `this` 指向 window 。
`apply` 调用函数后会立即执行，且 this 指向只临时改变一次。

<JSRunner :code="code1" />

### call

`call` 与 `bind` 很多相似之处：接收两个参数、调用函数后也会立即执行，且 this 指向只临时改变一次、当第一个参数为 `null` 或 `undefined` 时 `this` 指向 window 。它们的区别在于 `call` 传入的第二个参数是一个参数列表。

<JSRunner :code="code2" />

### bind

`bind` 传入的参数与 `call` 一样，第一个为指定的 `this` ，第二个为 **参数列表**。区别在于它不是立即执行，而是返回一个永久改变
`this` 指向的函数，且第二个参数可以分多次传入（因为已经如同另一个函数）。

连续 `bind()` 时，只有第一次的 this 生效且永久锁定，后续 `bind()` 只能追加预设参数，无法改变 this 指向。这是 JavaScript 引擎内部 `[[BoundThis]]` 槽位一旦设置便不可修改的机制决定的。

<JSRunner :code="code3" />

### 对比表

|          | apply                | call                     | bind                         |
| -------- | -------------------- | ------------------------ | ---------------------------- |
| 参数     | thisArg, [argsArray] | thisArg, arg1, arg2, ... | thisArg, arg1, arg2, ...     |
| 执行     | 立即执行             | 立即执行                 | 返回一个改变 this 指向的函数 |
| this     | 临时改变             | 临时改变                 | 永久改变                     |
| 参数列表 | 数组                 | 参数列表                 | 参数列表                     |

<script setup>

let code1 = `function fn(...args){
  console.log(this)
  console.log(args)
}
let obj = { name: 'Hoey' }

fn.apply(null, [1]) // this 指向 window , 参数为 [1]
fn.apply(obj, [1, 2]) // 临时改变 this 为 obj，参数为 [1, 2]
fn(1,2,3) // this 为 Window，参数为 [1, 2, 3]
`

let code2 = `function fn(...args){
  console.log(this)
  console.log(args)
}
let obj = { name: "Hoey" }

fn.call(obj, 1, 2, 3) // 临时改变 this 为 obj，参数为 [1, 2, 3]
fn(1,2) // this 为 Window，参数为 [1, 2]
`

let code3 = `function fn(...args){
  console.log(this)
  console.log(args)
}
let obj = { name: 'Hoey' }

let obj2 = { name: 'Hoey2'}

const bindFn = fn.bind(obj, 1) // this 永久指向 obj , 参数为 [1]
console.log('bindFn(2,3):')
bindFn(2,3) // 返回的函数可以分为多次传入，此时参数为 [1,2,3]

// 连续 bind 只有第一次 this 指向生效
const bindFn2 = bindFn.bind(obj2,10)
console.log('bindFn2():')
bindFn2()

console.log('bindFn(4,5):')
bindFn(4,5) // 返回的函数可以分为多次传入，此时参数为 [1,4,5]

console.log('fn(1,2,3,4):')
fn(1,2,3,4) // 原函数的 this 仍然指向 Window
`
</script>