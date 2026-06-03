---
title: 虚拟 DOM 和 DIFF 算法
createTime: 2026/03/09 10:16:23
permalink: /qa/vue/ps8664ca/
---

## 虚拟 DOM

**虚拟DOM**  本质上是一个 **用 JavaScript 对象来描述真实 DOM 结构** 的数据结构。
*   **真实 DOM:** 浏览器提供的庞大、复杂的对象树，操作成本高（触发重排和重绘）。
*   **虚拟 DOM:** 轻量级的 JS 对象，操作成本低。

真实 HTML：
```html
<div id="app" class="container">
  <h1>Hello</h1>
</div>
```

虚拟 DOM：
```javascript
const vnode = {
  tag: 'div',
  props: { id: 'app', class: 'container' },
  children: [
    { tag: 'h1', props: {}, children: ['Hello'] }
  ]
};
```

虚拟 DOM 是 Diff 算法的载体。当数据变化时，我们不直接操作真实 DOM，而是生成一棵新的虚拟 DOM 树，再通过 Diff 算法对比新旧虚拟树，
找出最小差异，最终以最小的代价更新真实 DOM。

因此，“虚拟 DOM 比真实 DOM 快”这句话并不严谨。虚拟 DOM 本身只是一个便于对比差异的 JavaScript 对象，真正带来性能提升的是 Diff 算法计算出的最小化更新策略。

更准确的公式是：高效的视图更新 = 虚拟 DOM + Diff 算法 + 最小化 DOM 操作。

## Diff 

Diff 算法就是一种对比算法，用于找到新旧虚拟 DOM 之间的最小差异，然后只对变化的部分执行真实 DOM 更新，跳过无需更新的节点，从而提升更新效率。

### 对比流程

Diff 算法整体采用深度优先遍历，并对子节点进行同层比较。从根节点开始，先比较当前节点，若可复用则递归进入子节点数组进行对比，
子节点处理完毕后再回到当前层级处理下一个兄弟节点。

当组件内发生变化时，会触发setter，并且通过 `Dep.notify` 去通知所有订阅者，最终调用 patch 方法进行新旧对比。

#### patch

patch 的作用是使用 sameVnode 对比新旧虚拟节点是否是同一类型：
- 是：执行 patchVnode 进行深层比较。
- 否：直接替换 —— 移除旧节点对应的真实 DOM，创建并插入新节点。

~~~tabs
tab: patch
```js
function patch(oldVnode, newVnode) {
  // 比较是否为一个类型的节点
  if (sameVnode(oldVnode, newVnode)) {
    // 是：继续进行深层比较
    patchVnode(oldVnode, newVnode)
  } else {
    // 否
    // 完善代码

    }
  }

  return newVnode
}
```

tab: sameVnode
```js
function sameVnode(oldVnode, newVnode) {
  return (
    // 完善对比代码

  )
}
```
~~~

#### patchVnode

patchVnode 用来对新旧节点的子节点进行对比：
- 如果newVnode和oldVnode是同一对象，则直接return 不需要再进行对比。
- 如果他们都有文本节点且内容不同，则替换文本内容。
- 如果 newVnode 有子节点但 oldVnode 没有，则删除子节点
- 如果 newVnode 没有子节点但 oldVnode 有，则添加。
- 如果都有子节点，则使用 updateChildren 对子节点再进行比较。

```js
function patchVnode(oldVnode, newVnode) {
  // 获取真实DOM对象
  // 获取新旧虚拟节点的子节点数组

  // 如果新旧虚拟节点是同一个对象，则终止
  if (oldVnode === newVnode) return
  // 如果新旧虚拟节点是文本节点，且文本不一样
  if () {
    // 则直接将真实DOM中文本更新为新虚拟节点的文本

  } else {
    // 否则

      // 新旧虚拟节点都有子节点，且子节点不一样
      // 对比子节点，updateChildren

      // 新虚拟节点有子节点，旧虚拟节点没有
      // 创建新虚拟节点的子节点，并更新到真实DOM上去

      // 旧虚拟节点有子节点，新虚拟节点没有
      //直接删除真实DOM里对应的子节点

    }
  }
}

```

#### updateChildren

updateChildren 对子节点进行对比并更新。我们所说的首尾指针法或双端对比法则发生在这一阶段。
新的子节点集合和旧的子节点集合，各有首尾两个指针，用于对比并移动。

对比流程如下：

- 指针比较：依次尝试旧头-新头、旧尾-新尾、旧头-新尾、旧尾-新头，匹配则移动 old 指针对应 DOM 到目标位置（new 指针对应位置），同时移动指针。
- 节点查找：四步全未命中时，在旧节点范围内查找新头节点。在 old 中找到则移动对应位置 DOM 到目标位置（未处理节点的最前面：oldStart 对应 DOM 之前），并标记旧位置为空；
  未找到则视为新节点，创建 DOM 并插入到目标位置（oldStart 对应 DOM 前）。仅新头指针右移，旧范围不变。
- 循环结束：若旧节点先耗尽，剩余新节点全部新增插入；若新节点先耗尽，剩余旧节点全部删除（跳过已标记为空的位置）。
- 指针与边界：每次获取头/尾节点时，若遇到空（已处理标记）则对应指针向内收缩并跳过，保持未处理范围有效。

以下面的例子为例：

```html
<!-- 旧节点 -->
<ul>
    <li>a</li>
    <li>b</li>
    <li>c</li>
    <li>d</li>
    <li>e</li>
</ul>

<!-- 新节点 -->
<ul>
    <li>a</li>
    <li>d</li>
    <li>e</li>
    <li>f</li>
</ul>
```

```
DOM：a b c d e
old: [a] b c d [e]     (oldStart=a, oldEnd=e)
new: [a] d e [f]     (newStart=a, newEnd=f)
```

第一步：

oldStart 与 newStart 相等，DOM 不移动， oldStart++、newStart++。

```
DOM：a b c d e
old: a [b] c d [e]     (oldStart=b, oldEnd=e)
new: a [d] e [f]     (newStart=d, newEnd=f)
```

第二步：

四种指针比较方式都不匹配，因此在 old 里面查找当前 newStart 的位置，在 old 的索引 3，将 `old[3]` 置未 undefined，newStart++，
并将 `old[3]` 对应 DOM （d） 移动到 oldStart 对应 DOM 前，即 b 前 。

```
DOM：a d b c e（d 移动到 b 前）
old: a [b] c undefined [e]     (oldStart=b, oldEnd=e)
new: a d [e] [f]     (newStart=e, newEnd=f)
```

第三步：

此时 newStart 与 oldEnd 相等，将 oldEnd 对应 DOM（e）移动到 newStart 对应位置，即 d 后面，oldEnd--、newStart++。

```
DOM：a d e b c （e 移动到 d 后）
old: a [b] [c] undefined e   (oldStart=b, oldEnd=c)
new: a d e [f]     (newStart=f, newEnd=f)
```

  跳过 undefined 向后收缩在下一步开始前完成。

第四步：

四种方式都未匹配成功，且 newStart 在 old 中找不到，则创建 DOM 节点 f，并插入到 oldStart 对应 DOM 前，即 b 前，newStart++。

```
DOM：a d e f b c （f 插入到 b 前）
old: a [b] [c] undefined e   (oldStart=b, oldEnd=c)
new: a d e [f] [ ]     (newStart+=1, newEnd=f)
```

第五步：

此时 newStart > newEnd，而 oldStart <= oldEnd，说明新节点先耗尽，需要剩余 b、c 真实 DOM。

得到新的 DOM 为：a d e f，与新的虚拟 DOM 结构一致。
