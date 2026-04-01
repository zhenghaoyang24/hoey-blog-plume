---
title: 捕获 Promise 的错误
createTime: 2026/03/31 17:21:55
permalink: /qa/js/3vuuriz9/
---

下面代码执行结果是什么？

<JSRunner :code="code" height="300" />

`Promise.reject` 会进入失败处理，`.then` 第二个参数可以捕获上一个 `Promise` 的错误，`.catch` 可以捕获任何未处理的 `reject` 与抛错。

上面的代码中，`Promise.reject` 会进入失败处理，进入 `.then` 第二个参数，输出 **"error!!" "error!"**。

拓展阅读：[捕获 Promise 的错误](/qa/js/vws3ehwh/)

<script setup>
const code = `Promise.reject('error!').then((res)=>{
  console.log('success',res)
}, (err)=>{
  console.log('error!!',err)
}).catch((err)=>{
  console.log('error!!!',err)
})`
</script>