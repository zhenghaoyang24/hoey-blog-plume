---
title: 函数的 this
createTime: 2026/03/31 16:46:40
permalink: /qa/js/vow22uke/
---

<JSRunner :code="code" />

obj 包含两个方法属性，其中 fn1 是箭头函数，fn2 是普通函数。随后分别执行和实例化则两个函数。

对于箭头函数而言，没有自己的 this ，只能捕获上下文中的 this 值，所以 fn1 中的 this 指向 window（严格模式下为 undefined）。
fn2 是一个普通函数，this 在运行时根据调用方式动态绑定，因此 fn2 的 this 为 obj 对象。

随后的函数实例，因为箭头函数 fn1 没有自己的 this 与 prototype，不能被当作构造函数使用，因此 `new obj.fn1()` 报错。由于上面的 js 语句报错，
`const y = new obj.fn2();` 不会执行。若若注释上一行，因为普通函数能够作为构造函数使用，因此 this 指向创建的实例对象。

<script setup>
let code = `const obj = {
  fn1: () => console.log(this),
  fn2: function() {console.log(this)}
}
obj.fn1();
obj.fn2();
const x = new obj.fn1();
const y = new obj.fn2();
`
</script> 