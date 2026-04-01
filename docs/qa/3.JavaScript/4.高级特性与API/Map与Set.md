---
title: Map 与 Set 的区别
createTime: 2026/04/01 09:58:15
permalink: /qa/js/m93pzlvy/
---

<Question :questions="['Map 与 Set 的区别？']" />

---

`Map` 与 `Set` 都是集合类数据结构，用于存储唯一值。

`Map` 是一种存储键值对的数据结构，类似 json 对象，但 `Map` 的键可以是任何类型的值且唯一。

`Map` 可以实现比 json 对象更高效的查找修改，可以用于大量键值数据的高频增删改查，

<JSRunner :code="code1" title="Map 的使用" />

`Set` 类似与数组，但是用于存储唯一值。可以理解为：`Map` 是存储唯一的 `key:value`，`Set` 是存储唯一 `value`。

由于 `Set` 存储的值都是唯一，因此常常用于数组去重。

<JSRunner :code="code2" title="Set 的使用" />

<script setup>
const code1 = `const map = new Map([[1, 'one'], [2, 'two']])
map.set(3, 'three')
console.log(map.has(3))
console.log(map.get(3))
map.delete(3)
console.log(map.get(3))`

const code2 = `const arr = [1,4,6,2,1,6,4]
var set = new Set(arr)
console.log([...set]) // [1, 4, 6, 2]

console.log(set.has(1)) // true
set.add(5)
console.log([...set]) // [1, 4, 6, 2, 5]
set.delete(5)
console.log([...set]) // [1, 4, 6, 2]`
</script>
