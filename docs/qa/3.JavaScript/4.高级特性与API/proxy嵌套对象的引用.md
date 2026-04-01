---
title: Proxy 监听嵌套对象的引用
createTime: 2026/04/01 09:28:59
permalink: /qa/js/iw6v3p47/
---

<Question :questions="['Proxy 能够监听对象中的对象的引用吗？']" />

---

想一想，以下代码会输出什么？为什么？

<JSRunner :code="code" />

`Proxy` 默认只代理对象的一层属性。如果对象的某个属性值本身是另一个对象（嵌套对象），那么对该嵌套对象 **内部属性的读写操作**，**不会触发外层 Proxy 的拦截器（handler）**，
因为嵌套对象本身 **不是 Proxy**，而是原始引用。因此以上代码的执行流程实际上为：

```
// 执行 proxy.a.b = 2 时：
// 步骤1: proxy.a → 触发 get('a')，返回 target[key] 即 obj.a
// 步骤2: (返回的 obj.a).b = 2 → 直接在原始对象上设置属性
//        proxy.set 不会触发，因为操作对象是 obj.a 不是 proxy
```

### 如何监听嵌套对象？

必须对**每个嵌套对象也创建 Proxy**，即实现 **深度代理**：

```js
function reactive(obj) {
  if (obj === null || typeof obj !== "object") return obj;
  Object.keys(obj).forEach((key) => {
    obj[key] = reactive(obj[key]); // 递归代理
  });
  return new Proxy(obj, {
    get(target, key) {
      console.log("get", key);
      return reactive(target[key]); // 返回也需代理
    },
    set(target, key, value) {
      console.log("set", key, value);
      target[key] = reactive(value); // 新值也需代理
      return true;
    },
  });
}
```

Vue 3 的 [reactive()](/web/vue/vue3/#reactive) 就是基于这种深度 Proxy 实现的。Vue3 中的响应系统可[阅读这里](/web/vue/principle/#响应系统)。

<script setup>

let code = `const obj = {
  a: { b: 1 },
};

const proxy = new Proxy(obj, {
  get(target, key) {
    console.log("get", key);
    return target[key];
  },
  set(target, key, value) {
    console.log("set", key, value);
    target[key] = value;
  },
});

proxy.a.b = 2;
`
</script>