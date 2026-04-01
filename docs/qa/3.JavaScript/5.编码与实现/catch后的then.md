---
title: catch() 后的 .then()
createTime: 2026/03/31 17:25:14
permalink: /qa/js/dx2dmjq1/
---

下面代码执行结果是什么？

---

<JSRunner :code="code" />

==在 Promise中，`catch` 用来处理 reject 的情况，并且会返回一个新的 Promise。== 因为实际上 `.catch` 内部调用了 `.then(undefined, onRejected)`。

- 如果 `catch(onRejected)` 的 onRejected 的回调显示返回了一个 reject 状态的 Promise 或者 在里面抛出异常，那么 `.catch` 返回的 Promise 实例的状态则为 rejected。
- 如果 catch 的回调没有显式 return，则返回 undefined。undefined 会让 catch 返回的 Promise 实例状态变为 reject。
简而言之，如果 `catch` 的回调没有显式返回，则返回了 `Promise.resolve(undefined)`。

分析上面的代码：

`Promise.reject()` 进入失败处理，所以进入catch，首先执行 `console.log(err)`，输出 "Promise error"。随后显示返回一个 reject 状态的 Promise，
因此进入后面 `.then()` 的错误处理。输出 `catch` 返回的新 Promise 实例 reject 的内容："error:catch error"。

如果 catch 返回的内容为 `return 'catch'`，那么 `catch` 函数返回的 Promise 状态为 resolve，则会进入 `.then()` 的成功处理，最终输出 "Promise error" "catch"。
如果 catch ，没有返回内容，那么也会进入 `.then()` 的成功处理，最终输出 "Promise error" "undefined"，因为 catch 没有返回成功的内容。

<script setup>
const code = `Promise.reject('Promise error').catch((err)=>{
  console.log(err)
  return Promise.reject('catch error')
}).then((res)=>{
  console.log('success:'+res)
},(err)=>{
  console.log('error:'+err)
})`
</script>