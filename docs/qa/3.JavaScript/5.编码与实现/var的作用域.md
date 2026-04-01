---
title: var 的作用域
createTime: 2026/03/31 16:56:10
permalink: /qa/js/28ismm8z/
---

下面的代码执行结果是什么？

<JSRunner :code="code" height="300" />

JavaScript 采用 **词法作用域**，函数的作用域在**定义时**就确定了，而不是调用时。
`fun` 函数在**定义时**能访问的作用域链已经固定。

```javascript
// 定义阶段（编译阶段）
var a = 1; // 全局作用域
function fun() {
  // fun 定义在全局作用域
  console.log(a); // 此处 a 指向全局作用域的 a
}

// 执行阶段
(function main() {
  var a = 2; // main 的局部作用域，只在 main 内部有效
  fun(); // 调用 fun
})();
```

拓展阅读：

[作用域](/web/javascript/duzdcvgi/#作用域)，[作用域链](/web/javascript/duzdcvgi/#作用域链)，
[循环中的闭包问题](/web/javascript/duzdcvgi/#循环中的闭包问题)

<script setup>
const code = `var a = 1
function fun(){
  console.log(a)
}
(function main(){
  var a = 2
  fun()
})()`
</script>
