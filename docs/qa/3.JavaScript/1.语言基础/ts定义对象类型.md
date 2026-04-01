---
title: ts 定义对象类型
createTime: 2026/04/01 11:23:26
permalink: /qa/js/hpcoze58/
---

<Question :questions="['ts 怎么定义对象类型？']" />

---

## interface

最常用的适合定义对象结构。可以定义可选、只读属性。

```ts
interface Person {
  name: string;
  readonly age: number;
  sex: "male" | "female";
  email?: string;
}
```

## type

灵活，不仅可以定义对象，还能定义联合类型、元组等。

```ts
type Person = {
  name: string;
  age: number;
  sex: "male" | "female";
  email?: string;
};
```

## 匿名对象

直接用对象定义变量的类型。

```ts
function printUser(user: { id: number; name: string }) {
  console.log(user.name);
}

// 调用
printUser({ id: 1, name: 'Bob' });
```
