---
title: Map 与 WeakMap 的区别
createTime: 2026/04/01 09:59:38
permalink: /qa/js/apmbndl7/
---

<Question :questions="['WeakMap 与 Map 的区别？']" />

---

`WeakMap` 是 ES6 新增的键值对集合。它与 Map 的区别是 WeakMap 的键只能是**对象**，且键值对是弱引用。

什么是弱引用？

```js
// Map - 强引用，对象无法被回收
let mapKey = { id: 1 };
const map = new Map();
map.set(mapKey, 'value');

mapKey = null;  // 虽然变量置空，但 Map 仍强引用对象
// { id: 1 } 不会被垃圾回收，造成内存泄漏

// WeakMap - 弱引用，对象可被自动回收
let weakKey = { id: 2 };
const weakMap = new WeakMap();
weakMap.set(weakKey, 'value');

weakKey = null;  // 无其他引用，垃圾回收器会自动回收该对象
// WeakMap 中的对应条目也会自动消失
```

由于 WeakMap 的键值对是弱引用，垃圾回收机制是不可预测的，因此 WeakMap 的键值映射关系随时都可能被回收，导致遍历结果不确定，因此 WeakMap 不可被遍历。
