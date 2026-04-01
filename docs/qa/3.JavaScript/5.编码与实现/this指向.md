---
title: this指向
createTime: 2026/03/31 16:58:30
permalink: /qa/js/trqz2xlj/
---

下面的代码执行结果是什么？

<JSRunner :code="code1" />

想要确定最终输出什么，就要确定 `print` 中 `a()` 的 `this` 指向。普通函数的 `this` 指向由调用它的方式动态确定，被直接调用时指向 `window`。
因此即使 `a()` 嵌套在 `print` 中，`this` 仍然指向 `window`。`obj.print()` 引起的 `a()` 被调用，输出结果为 **123**。如果想结果为 **456**，
那么就需要让 `print` 函数的 `this` 指向 `obj`，直接将 `print` 函数改为普通函数输出 `this.name` 则可以输出 **456**。

```js
print: function(){
  // 此时print 是一个普通函数，其内部this动态绑定
  console.log(this.name)
},
```

那么如果改为下面的代码又会是什么结果呢？

```js
print: () => {
  console.log(this.name);
};
```

由于箭头函数没有自己的 `this`，它的 `this` 在定义时就"锁死"了，指向外层作用域的 `this`。这里定义在全局对象的字面量中，外层 `this` 是 `window`，所以输出 123。

那么，下面的代码执行结果是什么？

<JSRunner :code="code2" />

<script setup>
const code1 = `var name = 123
var obj = {
  name:456,
  print: function(){
    function a(){
      console.log(this.name)
    }
    a()
  },
}

obj.print()`

const code2 = `var name = 'window'
const obj = {
  name: 'obj',
  sayName: function(){
    console.log(this.name)
  }
}
obj.sayMyName = ()=>{
   console.log(this.name)
}
const fn1 = obj.sayName
const fn2 = obj.sayMyName

// 执行
fn1()
fn2()
obj.sayName()
obj.sayMyName()`
</script>