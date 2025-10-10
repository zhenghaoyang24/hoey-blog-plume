---
title: Vue3 复习手册
createTime: 2024/8/5 10:19:27
permalink: /web/vue3/
draft: true
tags:
  - Vue
---

::: tip

本文档本不是 Vue3 上手文档教程，仅是对部分内容进行记录与总结，便于查阅。

:::

------

## Vue 3 的变化

- 相比 Vue2 有更小的包体积、更好的性能、更好的可扩展性和更好的 `TypeScript/IDE` 支持。

- 使用  [Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy) 代替 [Object.defineProperty()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) 实现响应式。

- 新的 API 风格 - Composition API 语法（已兼容 Vue2）。

- 新的内置组件 `Fragment`、`Teleport`、`Suspense`。

- 新的生命周期钩子。

...

## API 风格

Vue3 推出了 Composition API（组合式API，目前已兼容 Vue2），相比于 Vue2 的 Options（选项式API）更易维护扩展。

### Options API

Options API 将数据、方法、计算属性等分散在 `data`、`methods`、`computed` 中，看似类别清晰，但当代码量大后，若想新增或者修改一个需求，就需要分别修改不同位置的 `data`、`methods`、`computed`，代码非常分散，不利于后期维护。

<div style="display: grid;grid-template-columns: repeat(auto-fit, minmax(0, 1fr));">
<img src="/assets/options_api_code.gif"/>
<img src="/assets/options_api_block.gif"/>
</div>

### Composition API

通过组合式 API，我们可以使用导入的 API 函数来描述组件逻辑。在单文件组件中，在 script 添加 setup 标识启用组合式API，
能够让组件中相关功能的代码更加有序的组织在一起，避免代码过于分散。

<div style="display: grid;grid-template-columns: repeat(auto-fit, minmax(0, 1fr));">
<img src="/assets/composition_api_1.gif"/>
<img src="/assets/composition_api_2.gif"/>
</div>

### Options VS Composition

两种 API 风格大部分的核心概念都是相通的，熟悉一种也能够快速上手两一种。

如果是在低复杂场景或者渐进式增强的应用，使用 选项式API 获取能够快速完成需求。
除此之外，更加推荐组合式API，因为当代码量较大时，组合式API更易维护易扩展的优势是显而易见的。

下面是相同场景下不同风格的代码：

::: tabs
@tab Options API
```vue
<script>
export default {
  // data() 返回的属性将会成为响应式的状态
  data() {
    return {
      count: 0
    }
  },

  // methods 是一些用来更改状态与触发更新的函数
  methods: {
    increment() {
      this.count++
    }
  },

  // 生命周期钩子会在组件生命周期的各个不同阶段被调用
  mounted() {
    console.log(`The initial count is ${this.count}.`)
  }
}
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```

@tab Composition API
```vue
<script setup>
import { ref, onMounted } from 'vue'

// 响应式状态
const count = ref(0)

// 用来修改状态、触发更新的函数
function increment() {
  count.value++
}

// 生命周期钩子
onMounted(() => {
  console.log(`The initial count is ${count.value}.`)
})
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```
:::

## 响应式

Vue3 提供了两个响应式 API - `reactive`、`ref`，用于创建响应式数据。

在 Vue 3 中，`ref` 和 `reactive` 是两个核心的响应式 API，用于创建响应式数据。它们是 Vue 3 响应式系统的基础，基于 `Proxy` 实现，相比 Vue 2 的 `Object.defineProperty` 更强大、更灵活。

---

### ref

`ref` 用于创建一个**响应式的基本类型数据**（如 `string`、`number`、`boolean`），也可以用于对象。

```js
import { ref } from 'vue'

const count = ref(0)
console.log(count.value) // 0

count.value++
console.log(count.value) // 1
```

#### 特点

- 返回一个**响应式引用对象**，内部值通过 `.value` 访问和修改。
- 可以被整体替换且保留响应性。
- 在模板中使用时，Vue 会自动解包 `.value`，无需手动写 `.value`。
- 可以用于任何类型的值，包括深层嵌套的对象、数组或者 JavaScript 内置的数据结构。
- 在 `reactive` 对象中嵌套 `ref` 时，也会自动解包。


### reactive

`reactive` 用于创建一个**响应式的对象或数组**。它对对象的属性进行深层响应式转换，使对象本身具有响应性，但它与原始对象并不想等。

#### 特点

- 只能传入**对象或数组**，不能用于基本类型（如 `reactive(0)` 无效）。
- 不能被整体替换，将丢失响应性。
- 返回的是一个**Proxy 代理对象**，无需 `.value` 直接操作属性即可触发响应。
- 在模板中直接使用属性，无需 `.value`。
  ```
  let state = reactive({ count: 0 })
  console.log(state.count) // 不需要 .value
  ```
- **深层响应式**：嵌套对象也会被转换为响应式。
- 不同能轻易替换整个响应式对象，否则响应式连接会丢失。
  ```
  let state = reactive({ count: 0 })
  // 上面的 ({ count: 0 }) 引用将不再被追踪
  state = reactive({ count: 1 }) // (响应性连接已丢失！)
  ```
- **注意**：解构会丢失响应性（因为解构后是普通值），需要用 `toRefs` 或 `toRef` 保持响应性。

```js
import { reactive, toRefs } from 'vue'

const state = reactive({
  count: 0,
  name: 'Vue'
})

// 解构后失去响应性
const { count, name } = state
```

由于 `reactive` 的诸多限制，建议使用 `ref()` 作为声明响应式状态的主要 API。

### 解构响应式数据

以下解构会丢失响应性：

```js
// 解构 ref
const obj = ref({ name: 'Vue' })
const { name } = obj.value // 解构出的是 obj 属性值的副本 - 字符串 'Vue'
obj.value.name = 'Vue 3'
console.log(name) // 仍然是 'Vue' 但不会更新！

// 解构 reactive
const state = reactive({ count: 0 })
// 当解构时，count 已经与 state.count 断开连接
let { count } = state
// 不会影响原始的 state

```

以上两种方式并不是正确的解构方式，只是将原本响应式值的数据复制给了另一个新变量，因此丢失了响应性。

要想保持响应式，解构出来的值应该还是原本响应式对象属性的引用。

以下解构不会丢失响应性：

```js
const obj = ref({ name: 'Vue' })

// 方法1：countValue 将保留响应式
const { value: countValue } = obj
// 方法2：创建nameRef响应式引用
const nameRef = toRef(obj.value, 'name')


// reactive 同样使用 toRef 解构，保持响应性
const obj = reactive({ name: 'Vue' })
const { nameRef } = toRef( obj , name ) // nameRef 保持响应式
```

:::: demo vue title="输入内容验证响应式"
```vue
<script setup lang="ts">
import { ref,toRef } from 'vue'

const obj = ref({ name: 'Vue' })
const nameRef = toRef( obj.value ,'name')
const { name } = obj.value
</script>

<template>
  <div>
    <input v-model="obj.name" />
    <div>原对象obj.name: {{ obj.name }}</div>
    <div>toRef 解构 obj: {{ nameRef }}</div>
    <div>错误解构 name（失去响应式）: {{ name }}</div>
  </div>
</template>
```
::::

## Class 与 Style 绑定

我们能够使用 v-bind 与 HTML 标签的 attribute 进行绑定，实现动态修改，因此我们可以使用 v-bind 操纵元素的 CSS class 列表和内联样式。

Vue 专门为 class 和 style 的 v-bind 用法提供了特殊的功能增强，除了字符串外，表达式的值也可以是对象或数组。

### 绑定对象

我们可以给 :class 传递一个对象，对象 key 为 class 名称，value 为 true 或 false，从而实现动态修改 标签的 class：

```js
const classObject = reactive({
  active: true,
  'text-danger': false
})
```

将上面的 classObject 对象绑定到 class ，为标签更改class列表。同时可以更改 key 的 boolean 值，从而实现动态修改 class。

::: demo vue title="点击按钮动态修改class"
```vue
<script setup lang="ts">
import { reactive } from 'vue'

const classObject = reactive({
  active: true,
  'text-danger': false
})

function changeActive() {
  classObject.active = !classObject.active
}

function changeSize() {
  classObject['text-large'] = !classObject['text-large']
}
</script>

<template>
  <div>
    <div>
      <button @click="changeActive">{{classObject.active? '取消':'添加'}}红色字体</button> &nbsp;
      <button @click="changeSize">{{classObject['text-large']? '取消':'添加'}}大号字体</button>
      <p :class="classObject">动态绑定 class</p>
    </div>
  </div>
</template>

<style scoped>

.active {
  color: red;
}

.text-large {
  font-size: 1.2em;
}
</style>
```
:::

同样的，可以使用 v-bind 为 style 绑定一个对象，不过这个对象的 key 为 CSS property 名，value 为对应的样式值。

```vue
<div :style="{ 'font-size': fontSize + 'px' }"></div>
```

当我们修改 fontSize 的值时，div 的 font-size 属性就会被更新。

::: demo vue title="滑动滑块动态修改字体大小"
```vue
<script setup>
import { ref } from 'vue'

const fontSize = ref(16)

function changeSize(e) {
  fontSize.value = e.target.value
}
</script>

<template>
  <input type="range" min="12" max="36" @input="changeSize" />
  <p :style="{ 'font-size': fontSize + 'px' }">字体大小：{{ fontSize }}px</p>
</template>

<style scoped>

.active {
  color: red;
}

.text-large {
  font-size: 1.2em;
}
</style>
```
:::

### 绑定数组

:class 可以绑定一个数组来渲染多个 CSS class：

```js
const activeClass = ref('active')
const errorClass = ref('text-danger')
```

```vue
<div :class="[activeClass, errorClass]"></div>
```

绑定数组时，数组的每个元素都会被自动去重。在数组中也可以使用三元表达式动态添加 class。

```vue
<div :class="[isActive ? activeClass : '', errorClass]"></div>
```

还可以在数组中中嵌套对象，想对象绑定一样更改 class。

```vue
<div :class="[{ [activeClass]: isActive }, errorClass]"></div>
```

下面是一个数组中嵌套对象的例子：

::: demo vue title="点击按钮动态修改class"
```vue
<script setup lang="ts">
import { ref } from 'vue'

const textRedRef = ref(true)
const textBoldClass = ref('text-bold')

function changeActive() {
  textRedRef.value = !textRedRef.value
}
</script>

<template>
  <div>
      <button @click="changeActive">{{textRedRef? '取消':'添加'}}红色字体</button> &nbsp;
      <p :class="[textBoldClass,{'text-red':textRedRef}]">动态绑定 class</p>
  </div>
</template>

<style scoped>

.text-red {
  color: red;
}

.text-bold {
  font-weight: bold;
}
</style>
```
:::

同样可以在 :style 绑定一个包含多个样式对象的数组，这些对象会被合并后渲染到同一元素上：

```js
const textBoldRedStyle = ref({
  'font-weight': 'bold',
  'color':'red',
})
const textFontSize = ref({
  'font-size': '1.2em',
})
```
```vue
<p :style="[textBoldRedStyle,textFontSize]">动态绑定 class</p>
```
追踪这些样式对象会被合并后渲染到 p 标签上：

```vue
<p style="font-weight: bold; color: blue; font-size: 2em;">动态绑定 class</p>
```

## 修饰符

Vue 3 在处理事件与监听按键事件时，提供了一些修饰符，来简化开发。

### 事件修饰符

在 Vue 3 中，事件修饰符用于以更简洁、声明式的方式处理常见的 DOM 事件行为，避免在方法中手动调用如 `event.stopPropagation()` 或 `event.preventDefault()` 等代码。其中包含以下修饰符：

- `.stop`：阻止事件冒泡。
- `.prevent`：阻止事件的默认行为。
- `.self`：当事件被触发时，只有该元素本身被触发，才会执行回调函数。
- `.capture`：使用事件捕获模式（即在事件传播的捕获阶段触发处理函数，而非冒泡阶段）。
- `.once`：事件只会触发一次。
- `.passive`：事件处理函数中的 `event.preventDefault()` 不会阻止事件的默认行为。

#### 1. `.stop`

**作用**：阻止事件冒泡（等价于 `event.stopPropagation()`）。

```vue
<button @click.stop="handleClick">点击</button>
```

点击该按钮时，事件不会向父元素传播。以下面的示例为例：若不添加 `.stop` 修饰符，点击 +1 按钮后由于没有阻止冒泡则会触发父元素中的点击事件，导致父元素中的 +1 按钮也执行，最终值既-1也+1则不会变。

::: demo vue title=".stop示例"
``` vue
<script setup>
import { ref } from 'vue'

const msg1 = ref(100)
const msg2 = ref(100)
</script>
<template>
  <h3>不使用.stop修饰符</h3>
  <div @click="msg1--" style="background-color: red;width: fit-content;padding: 10px;user-select:none;">-1
    <button @click="msg1++" style="background-color: blue;">+1</button>
  </div>
  <text>{{msg1}}</text>
  <h3>使用.stop修饰符</h3>
  <div @click="msg2--" style="background-color: red;width: fit-content;padding: 10px;user-select:none;">-1
    <button @click.stop="msg2++" style="background-color: blue;">+1</button>
  </div>
  <text>{{msg2}}</text>
</template>
```
:::

#### 2. `.prevent`

**作用**：阻止事件的默认行为（等价于 `event.preventDefault()`）。

```vue
<a href="https://vuejs.org" @click.prevent="() => console.log('链接点击被阻止')">
```

以下面 a 标签为例：添加 `.prevent` 修饰符后，点击该链接将不会跳转，而是执行点击事件。

::: demo vue title=".prevent示例"
``` vue
<script setup>
import { ref } from 'vue'
const msg = ref("")
function click() {
  msg.value = "链接点击被阻止"
}
</script>
<template>
  <a href="https://vuejs.org" @click.prevent="click">
    点击前往 vue 官网
  </a>
  <text style="color:red">{{msg}}</text>
</template>
```
:::

#### 3. `.self`

**作用**：仅当事件在该元素自身上触发时才执行回调（不包括子元素触发的事件）。

```vue
<div @click.self="handleDivClick">
  <button>点我</button>
</div>
```

与 `.stop` 修饰符类似，但 `.stop` 是让事件不会冒泡到父元素，而 `.self` 是让事件不会溢出到子元素。

在上面 `.stop` 示例中，我们在子元素 button 上添加了 `.stop` 修饰符让加减功能能够正常运行。
同样，我们也可以在父元素div上添加 `.self` 修饰符，从而让加减功能能够正常运行。

::: demo vue title=".self示例"
``` vue
<script setup>
import { ref } from 'vue'

const msg1 = ref(100)
const msg2 = ref(100)
</script>
<template>
  <h3>不使用.self修饰符</h3>
  <div @click="msg1--" style="background-color: red;width: fit-content;padding: 10px;user-select:none;">-1
    <button @click="msg1++" style="background-color: blue;">+1</button>
  </div>
  <text>{{msg1}}</text>
  <h3>使用.self修饰符</h3>
  <div @click.self="msg2--" style="background-color: red;width: fit-content;padding: 10px;user-select:none;">-1
    <button @click="msg2++" style="background-color: blue;">+1</button>
  </div>
  <text>{{msg2}}</text>
</template>
```
:::

#### 4. `.capture`
**作用**：使用事件捕获模式（即在事件传播的捕获阶段触发处理函数，而非冒泡阶段）。

```vue
<div @click.capture="handleCapture">
  <button>点我</button>
</div>
```

点击按钮时，先执行外层 `div` 的 `handleCapture`，再执行按钮自身的点击处理（如果有的话）。


#### 5. `.once`
**作用**：事件只触发一次。

```vue
<button @click.once="handleClick">只点一次</button>
```

第一次点击会执行 `handleClick`，之后再点击无效。


#### 6. `.passive`
**作用**：以 passive 方式监听事件（提升滚动等性能），表示回调中**不会调用 `preventDefault()`**。

```vue
<div @scroll.passive="onScroll">...</div>
```
浏览器可以立即滚动，无需等待 JS 执行完毕，适用于 `touchstart`、`touchmove`、`scroll` 等高频事件。

::: tip
`.passive` 和 `.prevent` **不能同时使用**，因为 passive 事件明确表示不会阻止默认行为，Vue 会给出警告。
:::

::: demo vue title=".passive示例"
```vue
<template>
  <div @scroll.passive="onScroll" style="height: 200px; overflow: auto;">
    <div style="height: 400px;">
      <li v-for="i in 20" key="i">{{i}}</li>
    </div>
  </div>
  <div>滚动次数：{{scrollVal}}</div>
</template>

<script setup>
import { ref } from 'vue';
const scrollVal = ref("")
const onScroll = () => {
  scrollVal.val = scrollVal.value++
};
</script>
```
:::

#### 组合使用

修饰符可以链式组合，顺序很重要（从左到右依次生效）：

```vue
<a @click.stop.prevent="doSomething">链接</a>
```

先阻止冒泡，再阻止默认跳转。

::: tip
使用修饰符时需要注意调用顺序，因为相关代码是以相同的顺序生成的。
因此使用 `@click.prevent.self` 会阻止元素及其子元素的所有点击事件的默认行为，
而 `@click.self.prevent` 则只会阻止对元素本身的点击事件的默认行为。
:::

### 按键修饰符

Vue 3 提供了按键修饰符，用于监听按键事件。

当然！以下是 Vue 3 中**键盘事件修饰符**和**系统修饰键**的完整对照表，清晰简洁，便于查阅：

#### 键盘事件修饰符

| 修饰符        | 触发条件（按键）                     | 说明 |
|---------------|----------------------------------|------|
| `.enter`      | Enter 键（回车）                   | 常用于表单提交 |
| `.tab`        | Tab 键                            | 注意：浏览器默认会切换焦点，可能需配合 `.prevent` |
| `.delete`     | Delete 或 Backspace 键            | 两者都触发 |
| `.esc`        | Escape 键（ESC）                  | 常用于关闭弹窗 |
| `.space`      | 空格键（Space）                   | 注意：空格默认会滚动页面，可能需 `.prevent` |
| `.up`         | 上方向键（↑）                     | — |
| `.down`       | 下方向键（↓）                     | — |
| `.left`       | 左方向键（←）                     | — |
| `.right`      | 右方向键（→）                     | — |

#### 鼠标按键修饰符

| 修饰符 | 触发条件 | 说明 |
|---------------|----------|------|
| `.middle`    | 中键（鼠标滚轮）                   | — |
| `.right`    | 右键（鼠标右键）                   | — |
| `.left`    | 左键（鼠标左键）                   | — |

#### 系统修饰键（用于组合键）

| 修饰符     | 触发条件                          | 说明 |
|------------|---------------------------------|------|
| `.ctrl`    | Ctrl 键（Windows/Linux）或 Control（Mac） | 如 `Ctrl + S` |
| `.alt`     | Alt 键（Windows/Linux）或 Option（Mac） | — |
| `.shift`   | Shift 键                         | — |
| `.meta`    | Meta 键（Windows: ⊞ Win，Mac: ⌘ Cmd） | 如 `Cmd + C` |
| `.exact`   | **精确匹配**修饰键组合             | 确保**只有指定修饰键**被按下，其他修饰键未按下 |

---

#### 使用示例

```vue
<!-- 回车提交 -->
<input @keyup.enter="submit" />

<!-- Ctrl + S 保存 -->
<input @keydown.ctrl.s="save" />

<!-- 仅当按下 Ctrl（且没有其他修饰键）时触发 -->
<button @click.ctrl.exact="onCtrlClick">仅 Ctrl</button>

<!-- 按下 Ctrl + Shift + C 才触发 -->
<button @click.ctrl.shift.c="onShortcut">Ctrl+Shift+C</button>
```

::: tip
系统修饰键（如 `.ctrl`）默认监听 `keydown` 事件。
`.exact` 用于避免 `Ctrl + A` 误触发仅绑定 `.ctrl` 的事件（因为 `Ctrl + A` 也按下了 Ctrl）。
:::

### 表单输入修饰符

| 修饰符      | 作用说明 |
|------------|--------|
| **`.lazy`** | 将 `v-model` 的更新时机从 **`input` 事件** 改为 **`change` 事件**（即失去焦点或回车时才更新） |
| **`.number`** | 自动将用户输入的值**转为 `Number` 类型**（若无法转换则返回原字符串） |
| **`.trim`** | 自动**去除用户输入首尾的空格** |

表单输入修饰符也可以组合使用。下面是一个 组合使用 `.lazy`，`.number`，`.trim` 的简单示例：

:::demo vue title="表单输入修饰符示例"
```vue
<template>
  <input type="text" v-model.lazy.number.trim="msg" />
  <div>{{ msg }}</div>
</template>

<script setup>
import { ref } from 'vue';
const msg = ref("1")
</script>
```
:::

## 计算属性

计算属性会自动追踪响应式依赖，当响应式依赖发生变化时，计算属性会重新求值。它与在模板中使用函数求值的优势在于
==计算属性值会基于其响应式依赖被缓存，不会在模板重渲染发生时再次计算=={.important}。

计算属性默认是只读的。在某些场景可能需要用到可读属性，可以通过同时提供 getter 和 setter 来创建：

```js
<script setup>
import { ref, computed } from 'vue'
const firstName = ref('John')
const lastName = ref('Doe')
const fullName = computed({
  // getter
  get() {
    return firstName.value + ' ' + lastName.value
  },
  // setter
  set(newValue) {
    // 注意：我们这里使用的是解构赋值语法
    [firstName.value, lastName.value] = newValue.split(' ')
  }
})
</script>
```

当运行 fullName.value = 'John Doe' 时，setter 会被调用而 firstName 和 lastName 会随之更新。

可以通过访问 `getter` 的第一个参数 `previous` 来获取计算属性返回的上一个值：

```js
import { ref, computed } from 'vue'
const count = ref(10)
const val = computed((previous) => {
  // ...
})
// 可写的计算属性
const val = computed({
  get(previous) {
    // ...
  },
  set(newValue) {
    // ...
  }
})
```

**计算属性的 getter 职责应该仅为计算和返回该值**，不要改变其他状态，在 getter 中做异步请求或者更改 DOM！
计算属性的返回结果相当于一个“临时快照”，每当响应依赖发生改变时“快照”就会更新，因此主动更改 “快照”是没有意义的，其返回值
应该视为只读。

## 侦听器

### watch

前面我们提到 在计算属性 `computed` 中不能执行异步请求或者更改 DOM等非计算求值的操作，而 `watch` 则允许我们在响应依赖发生变化时
执行这些 “副作用” 操作。

`watch` 的第一个参数可以是不同形式的“数据源”：它可以是一个 ref (包括计算属性)、一个响应式对象、一个 getter 函数、或多个数据源组成的数组。

在侦听响应式对象时，不能直接侦听响应式对象的属性值，而是需要一个返回响应式对象的 getter 函数：

```js
const obj = reactive({ count: 0 })

// 错误，因为 watch() 得到的参数是一个 number
watch(obj.count, (count) => { //[!code error]
  console.log(`Count is: ${count}`)
})

// 提供一个 getter 函数
watch(
  () => obj.count,
  (count) => {
    console.log(`Count is: ${count}`)
  }
)
```

#### 深层侦听器

直接给 `watch()` 传入一个 `reactive` 对象  ，会隐式地创建一个深层侦听器。

若传入 `ref` 对象时，必须显式地加上 deep 选项，强制转成深层侦听器，才能在属性值发生变化时触发侦听。

若传入的是一个对象属性，只有当该属性值发生变化时才会触发监听。

::: demo vue title="侦听器示例"
```vue
<script setup>
import { reactive,watch ,ref } from 'vue'

const obj = ref({
  name: 'Vue',
  age: 18
})

const msg1 = ref("")
const msg2 = ref("")

watch(obj,(newVal)=>{
  msg1.value = "你将name更改为了"+newVal.name
    msg2.value = "你将age更改为了"+newVal.age
},{
  deep:true,
})

</script>

<template>
  <label for="name">name:</label>
  <input autocomplete="off" id="name" v-model="obj.name" />
  <br/>
  <label for="name">age:</label>
  <input autocomplete="off" id="name" v-model="obj.age" />
  <div>{{msg1}}</div>
    <div>{{msg2}}</div>
</template>
```
:::

#### 其他选项

`watch` 默认是懒执行的，只有在侦听器创建完成后且在数据源发生变化时才能触发侦听。
有些是有我们希望在创建侦听器时，立即执行一遍回调。例如在页面加载时初始数据获取完成就执行一次回调，
则可以通过传入 `immediate: true` 选项来强制侦听器的回调立即执行。

如果希望回调只在源变化时触发一次，则需要使用 `once: true` 选项。

### `watchEffect()`

和计算属性类似，回调会立即执行，不需要指定 `immediate: true`，能够自动跟踪回调的响应式依赖。

#### watch vs. watchEffect​

`watch` 和 `watchEffect` 都能响应式地执行有副作用的回调。它们之间的主要区别是追踪响应式依赖的方式：

- `watch` 只追踪明确侦听的数据源。它不会追踪任何在回调中访问到的东西。另外，仅在数据源确实改变时才会触发回调。
  `watch` 会避免在发生副作用时追踪依赖，因此，我们能更加精确地控制回调函数的触发时机。

- `watchEffect`则会在副作用发生期间追踪依赖。它会在同步执行过程中，自动追踪所有能访问到的响应式属性。
  这更方便，而且代码往往更简洁，但有时其响应性依赖关系会不那么明确。

### 副作用清理

有时我们需要在侦听器中执行一些可能比较耗时的异步请求，但在请求完成之前，侦听器的响应依赖可能会发生变化，
这就会导致每当数据源改变时，异步请求都会执行，性能开销较大。

::: demo vue title="侦听器中的过时请求"
```vue
<script setup lang="ts">
import { ref, watch } from 'vue'

const id = ref<number | null>(null)
const msg = ref<string>("")
const result = ref<number | null>(null)

const findById = (id: number) => {
  return new Promise<number>((resolve) => {
    msg.value = `正在请求 id 为 ${id} 的数据...`
    setTimeout(() => {
      resolve(id)
    }, 1000)
  })
}

// 没有使用 onCleanup：存在竞态问题
watch(id, async (newVal) => {
  if (newVal === null || isNaN(newVal)) {
    msg.value = "请输入有效的 ID"
    result.value = null
    return
  }
  const res = await findById(newVal)
  msg.value = `id 为 ${res} 的数据请求成功`
  result.value = res
})
</script>

<template>
  <div style="padding: 20px; font-family: Arial, sans-serif;">
    <h3>❌ 无 onCleanup（每次更新异步请求都会执行）</h3>
    <input 
      v-model.number="id" 
      type="number" 
      placeholder="根据 ID 查找" 
    />
    <div>
      <p>{{ msg }}</p>
      <p v-if="result !== null">结果: {{ result }}</p>
    </div>
  </div>
</template>
```
:::

在上面的例子中，我们使用 `findById()` 模拟一个耗时的异步请求函数。用户每当输入一个 ID 时，就会触发侦听，执行异步请求，1秒后在模板打印请求结果。

这样就引发了一个问题，当用户输入一个 ID 时，如果该 ID 的数据请求还没有完成，用户再次输入一个 ID，又会触发新的异步请求，等待1秒后才依次打出响应结果。
这会带来造成竞态问题，因为每次数据源改变时，都会触发新的异步请求，模板上的结果都会在异步请求结束后更新。

在 **3.5** 版本之前可以使用 `watch` 回调函数的第三个参数 、 `watchEffect` 回调函数的第一个参数 - `onCleanup()` 来实现
忽略过时请求的结果。

```js
watch(id, (newId, oldId, onCleanup) => {
  // ...
  onCleanup(() => {
    // 清理逻辑
  })
})

watchEffect((onCleanup) => {
  // ...
  onCleanup(() => {
    // 清理逻辑
  })
})
```

::: demo vue title="onCleanup()例子"
```vue
<script setup lang="ts">
import { ref, watch } from 'vue'

const id = ref<number | null>(null)
const msg = ref<string>("")
const result = ref<number | null>(null)

const findById = (id: number) => {
  return new Promise<number>((resolve) => {
    msg.value = `正在请求 id 为 ${id} 的数据...`
    setTimeout(() => {
      console.log("请求结束："+id)
      resolve(id)
    }, 1000)
  })
}

// 使用 onCleanup 避免竞态
watch(id, async (newVal, oldVal, onCleanup) => {
  if (newVal === null || isNaN(newVal)) {
    msg.value = "请输入有效的 ID"
    result.value = null
    return
  }

  let cancelled = false

  // 注册清理函数
  onCleanup(() => {
    cancelled = true
  })

  const res = await findById(newVal)
  
  if (!cancelled) {
    msg.value = `id 为 ${res} 的数据请求成功`
    result.value = res
  } else {}
})
</script>

<template>
  <div style="padding: 20px; font-family: Arial, sans-serif;">
    <h3>✅ 使用 onCleanup（结果始终正确）</h3>
    <input 
      v-model.number="id" 
      type="number" 
      placeholder="根据 ID 查找" 
    />
    <div>
      <p>{{ msg }}</p>
      <p v-if="result !== null">✅ 结果: {{ result }}</p>
    </div>
  </div>
</template>
```
:::

上面的例子中，添加了 `onCleanup` 函数，用于在侦听器回调中注册一个清理函数。每当 input 输入新的 ID 时，
会注册一个清理函数。当新的异步请求完成时，并执行上一次注册的清理函数，再执行副作用。这样，每当ID数据源改变时旧的请求结果会被忽略，
保持模板只打印最新请求的结果。

::: tip
`onCleanup` 注册的清理函数，会在 **下一次副作用 （watch 回调） 重新运行之前** 或 **组件卸载时** 自动执行。 

在 **3.5** 版本之后，可以使用 onWatcherCleanup()  API 来注册一个清理函数。
:::

## 模板引用

> ref 是一个特殊的 attribute，和 v-for 章节中提到的 key 类似。它允许我们在一个特定的 DOM 元素或子组件实例被挂载后，获得对它的直接引用。
> 这可能很有用，比如说在组件挂载时将 焦点设置到一个 input 元素上，或在一个元素上初始化一个第三方库。



在 3.5 之前的版本尚未引入 `useTemplateRef()`，我们需要声明一个与模板里 ref attribute 匹配的引用：

```js
<script setup>
import { ref, onMounted } from 'vue'

// 声明一个 ref 来存放该元素的引用
// 必须和模板里的 ref 同名
const input = ref(null)

onMounted(() => {
  input.value.focus()
})
</script>

<template>
  <input ref="input" />
</template>
```

在 3.5 之后，我们可以使用 `useTemplateRef()` 函数来获取模板中的 ref 引用。

```js
<script setup>
import { useTemplateRef, onMounted } from 'vue'

// 第一个参数必须与模板中的 ref 值匹配
const input = useTemplateRef('my-input')

onMounted(() => {
  input.value.focus()
})
</script>

<template>
  <input ref="my-input" />
</template>
```

## 生命周期

Vue 3 的生命周期钩子（Lifecycle Hooks）分为 **选项式 API（Options API）** 和 **组合式 API（Composition API）** 两种写法。

Vue 3 **移除了** `beforeCreate` 和 `created` 钩子（在组合式 API 中，它们的功能由 `setup()` 替代）。

| 选项式 API（Options API） | 组合式 API（Composition API） | 说明 |
|--------------------------|-------------------------------|------|
| `beforeCreate`           | —（逻辑放在 `setup()` 开头）   | 实例初始化之后，数据观测 (data observer) 和 event/watcher 配置之前 |
| `created`                | —（逻辑放在 `setup()` 中）     | 实例创建完成，可访问 data、methods，但 DOM 未挂载 |
| `beforeMount`            | `onBeforeMount`               | 挂载开始前，render 函数首次被调用前 |
| `mounted`                | `onMounted`                   | DOM 挂载完成，可访问 `$el`，适合操作 DOM 或启动定时器 |
| `beforeUpdate`           | `onBeforeUpdate`              | 数据更新时调用，发生在虚拟 DOM 重新渲染前 |
| `updated`                | `onUpdated`                   | 虚拟 DOM 重新渲染并打补丁后，DOM 已更新 |
| `beforeUnmount`          | `onBeforeUnmount`             | 实例卸载前调用，此时组件实例依然完好 |
| `unmounted`              | `onUnmounted`                 | 组件卸载完成，清理定时器、事件监听等 |

Vue 3 **不再支持** `destroyed` 和 `beforeDestroy`（Vue 2 的钩子），改用 `unmounted` / `beforeUnmount`。

下面是组合式 API 使用示例：

```vue
<script setup lang="ts">
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted
} from 'vue'

// 创建阶段：setup() 内部就是 beforeCreate + created 的替代
console.log('setup: 组件创建中（相当于 created）')

onBeforeMount(() => {
  console.log('onBeforeMount: DOM 还未挂载')
})

onMounted(() => {
  console.log('onMounted: DOM 已挂载，可操作 DOM')
  // 例如：启动定时器、初始化第三方库
})

onBeforeUpdate(() => {
  console.log('onBeforeUpdate: 数据已变，DOM 还未更新')
})

onUpdated(() => {
  console.log('onUpdated: DOM 已更新')
  // 注意：避免在此修改响应式数据，可能引发无限循环
})

onBeforeUnmount(() => {
  console.log('onBeforeUnmount: 组件即将卸载')
})

onUnmounted(() => {
  console.log('onUnmounted: 组件已卸载')
  // 清理：移除事件监听、取消订阅、清除定时器等
})
</script>
```

#### 使用建议

| 场景 | 推荐钩子 |
|------|--------|
| 初始化数据、调用 API | `onMounted` |
| 操作 DOM（如第三方图表） | `onMounted` |
| 监听全局事件（如 `window.resize`） | `onMounted` 添加，`onUnmounted` 移除 |
| 清理资源（定时器、订阅） | `onUnmounted` |
| 调试响应式更新原因 | `onRenderTriggered`（开发环境） |

#### 常见错误

- 在 `onUpdated` 中修改响应式数据 → 可能导致无限循环
- 忘记在 `onUnmounted` 中清理定时器/监听器 → 内存泄漏
- 在 `setup()` 中直接操作 DOM → 此时 DOM 未挂载！

## props

`props` 是父组件向子组件传递数据的方式。

### 类型与校验

当使用 `<script setup>` 时，`defineProps()` 宏函数支持从它的参数中推导类型：

```js
<script setup lang="ts">
const props = defineProps({
  foo: { type: String, required: true },
  baz: { type: [ String, Number ], required: true },
  bar: Number
})
</script>
```

这被称之为“运行时声明”。还有一种通过泛型参数来定义 props 的“基于类型的声明”，这在 TypeScript `<script setup>` 更为适用：

```js
<script setup lang="ts">
interface Props {
  foo: string
  baz: string | number
  bar?: number
}
</script>
```

### 默认值

在 3.4+ 版本，可以使用响应式 Props 解构声明默认值：

```js
interface Props {
  msg?: string
  labels?: string[]
}

const { msg = 'hello', labels = ['one', 'two'] } = defineProps<Props>()
```

在 3.4 及更低版本，响应式 Props 解构不会被默认启用。另一种选择是使用 withDefaults 编译器宏：

```js
interface Props {
  msg?: string
  labels?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  msg: 'hello',
  labels: () => ['one', 'two']
})
```

若使用运行时声明，可以使用 defaults 字段声明默认值：

```js
const props = defineProps({
  propA: 'hello',
  propE: {
    type: Number,
    default: 100
  },
})
```

## 事件

Vue3 中提供的 `$emit` 与 `defineEmits()` 能够让我们自定义事件，从而实现组件间通信。

`$emit` 在模板中使用，`defineEmits()` 在 `<script setup>` 中使用。

模板中：

```vue
<!-- 子组件定义 -->
<button @click="$emit('someEvent')">Click Me</button>

<!-- 父组件中使用 -->
<MyComponent @some-event="callback" />
```

组件中：

```vue
<script setup>
const emit = defineEmits(['inFocus', 'submit'])

function buttonClick() {
  emit('submit')
}
</script>
```

如果你正在搭配 TypeScript 使用 `<script setup>`，也可以使用纯类型标注来声明触发的事件：

```ts
<script setup lang="ts">
const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()
</script>
```

要为事件添加校验，那么事件可以被赋值为一个函数，接受的参数就是抛出事件时传入 emit 的内容，返回一个布尔值来表明事件是否合法。

```js :collapsed-lines=100
<script setup>
const emit = defineEmits({
  change: (id) => true, // 接受参数不做校验
  submit: ({ email, password }) => {
    const isValid = email && password && typeof email === 'string'
    if (!isValid) {
      console.warn('⚠️ submit 事件参数无效：需包含 email 和 password')
    }
    return isValid
  }
})

function handleSubmit() {
  // 有效：会触发事件
  emit('submit', { email: 'a@example.com', password: '123' })

  // 无效：控制台警告，但事件仍会发出（Vue 不会阻止）
  emit('submit', { email: '' }) // [!code warning]
}
</script>
```

上面的校验方法是运行时事件校验，具有以下不足：
- 校验失败不会阻止事件触发，只会打印警告。
- 校验失败不会阻止事件触发，只会打印警告。
- 无法在 TypeScript 中提供编译时类型安全。
- 性能开销：每次 emit 都会执行校验函数。

若需要静态检查，无运行时开销，可以使用 TypeScript 类型校验：

```ts :collapsed-lines=100
<script setup lang="ts">
interface Emits {
  (e: 'submit', payload: { email: string; password: string }): void
  (e: 'close',value: boolean): void
}

const emit = defineEmits<Emits>()

function handleSubmit() {
  // ✅ 正确：类型匹配
  emit('submit', { email: 'test@example.com', password: '123456' })
  emit('close', true)

  // ❌ TS 编译错误：缺少 password
  emit('submit', { email: 'test@example.com' }) // [!code error]

  // ❌ TS 编译错误：password 类型错误
  emit('submit', { email: 'test@example.com', password: 123 }) // [!code error]

  // ❌ TS 编译错误：类型错误
  emit('close', 'true') // [!code error]
}
</script>
```

## v-model

### 了解 v-model

v-model指令 是 Vue3 中 modelValue 与 update:modelValue 组合的语法糖。

```vue
<!-- 使用v-model指令 -->
<input type="text" v-model="userName">

v-model的本质是下面这行代码

<input 
  type="text" 
  :value="userName" 
  @input="userName =(<HTMLInputElement>$event.target).value"
>
```

在组件标签上的v-model的本质：:moldeValue ＋ update:modelValue事件。

```vue
<!-- 组件标签上使用v-model指令 -->
<ComInput v-model="userName"/>

<!-- 组件标签上v-model的本质 -->
<ComInput :modelValue="userName" @update:model-value="userName = $event"/>
```

### defineModel

因此在 3.4 版本之前，我们通常是在子组件中接受一个 modelValue 属性，并在 update:modelValue 事件中更新 modelValue 值，来实现父子
组件间通信。

子组件 Child.vue：

```vue
<script setup>
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <input
    :value="props.modelValue"
    @input="emit('update:modelValue', $event.target.value)"
  />
</template>
```

父组件：

```vue
<script setup>
import Child from './Child.vue'
import { ref } from 'vue'

const foo = ref("")
</script>

<template>
  <h1>{{foo}}</h1>
<Child
  :modelValue="foo"
  @update:modelValue="$event => (foo = $event)"
/>
</template>
```

这样写有利于了解底层机制，但显然代码较为冗长。从 Vue 3.4 开始，推荐的实现方式是使用 `defineModel()` 宏。

`defineModel` 是一个便利宏。编译器将其展开为以下内容：
- 一个名为 modelValue 的 prop，本地 ref 的值与其同步；
- 一个名为 update:modelValue 的事件，当本地 ref 的值发生变更时触发。

它可以像其他 ref 一样被访问以及修改，当它被子组件变更了，会触发父组件绑定的值一起更新。
因此刚刚复杂的父子组件通信示例可以被简化为以下代码。

子组件 Child.vue（使用 `defineModel`）：

```vue
<script setup>
const model = defineModel()
</script>

<template>
  <input
    v-model="model"
  />
</template>
```

 父组件（使用 `v-model`）：

```vue
<script setup>
import Child from './Child.vue'
import { ref } from 'vue'

const foo = ref("")
</script>

<template>
  <h1>{{ foo }}</h1>
  <Child v-model="foo" />
</template>
```

在上面的子组件中，`defineModel()` 将自动声明 `modelValue prop`、
声明 `update:modelValue` 事件、
返回一个双向绑定的 ref，修改它会自动触发更新。

`defineModel()`默认绑定的是 modelValue，如果你要用自定义 v-model，可以在组件上接受一个参数：

```vue
<Child v-model:title="foo" />
```

在子组件中，我们可以通过将字符串作为第一个参数传递给 `defineModel()` 来支持相应的参数：

```vue
<script setup>
const title = defineModel('title')
</script>

<template>
  <input type="text" v-model="title" />
</template>
```

`defineModel('title')` 会自动声明 `props: { title: String }`、
声明 `emit('update:title', newValue)`、
返回一个可双向绑定的 ref 。

### 修饰符

从 Vue 3.4 开始，`defineModel()` 支持通过 { set } 选项 或 modelModifiers 来自定义响应修饰符。
推荐使用 `defineModel` + `set` 转换函数。

子组件 UppercaseInput.vue：

```vue
<script setup>
const [model, modifiers] = defineModel('title',{
  set(value) {
    if (modifiers.capitalize) {
      return value.toUpperCase()
    }
    return value
  }
})
</script>

<template>
  <input type="text" v-model="model" />
</template>
```

父组件：

```vue
<script setup lang="ts">
import Child from './Child.vue'
import { ref } from 'vue'

const titleUpperCase = ref('')
</script>

<template>
  <h3>标题:{{titleUpperCase}}</h3>
  <Child v-model:title.capitalize="titleUpperCase" />
</template>
```

## 透传 Attributes

“透传 attribute”指的是传递给一个组件，却没有被该组件声明为 props 或 emits 的 attribute 或者 v-on 事件监听器。
若传递的组件根元素也为组件，则继承在根元素组件的根元素上。

如果传递的组件有下面有多个根节点，由于 Vue 不知道要将 attribute 透传到哪里，所以会抛出一个警告，并不继承 attribute 。

如果不想要一个组件自动地继承 attribute，可以在组件选项中设置 inheritAttrs: false：

```js
<script setup>
defineOptions({
  inheritAttrs: false
})
// ...setup 逻辑
</script>
```

## 插槽

### 默认内容

在父组件中，没有给子组件提供任何插槽内容时，子组件中对应 `<slot>` 内容讲作为默认内容。

```vue
<button type="submit">
  <slot>
    Submit <!-- 默认内容 -->
  </slot>
</button>
```

### 具名插槽

`<slot>` 元素可以有一个特殊的 attribute name，用来给各个插槽分配唯一的 ID，以确定每一处要渲染的内容：

```vue
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```

没有提供 name 的 `<slot>` 出口会隐式地命名为“default”。

要为具名插槽传入内容，我们需要使用一个含 `v-slot` 指令的 `<template>` 元素，并将目标插槽的名字传给该指令：

```vue
<BaseLayout>
  <template v-slot:header>
    <!-- header 插槽的内容放这里 -->
  </template>
  <!-- v-slot:footer 可简写为 #footer -->
  <template #footer>
    <!-- footer 插槽的内容放这里 -->
  </template>
</BaseLayout>
```

### 作用域插槽

插槽内容无法访问子组件的状态，但在某些情况下，我们需要在父组件作用域内使用子组件的状态。要做到这一点，我们可以使用作用域插槽，
像对组件传递 props 那样，将一些子组件的数据传递给插槽。在父组件中，插槽 props 可以作为 `v-slot` 指令的值被访问到：
`v-slot:name="slotProps"` 或缩写 `#name="slotProps"`。

::: tabs
@tab Parent.vue
```vue :collapsed-lines=100
<script setup>
import { ref } from 'vue'
import Comp from './Comp.vue'

</script>

<template>
  <Comp>
    <template #message="messageProp">
      {{messageProp.msg}}
    </template>
    <!-- 可以直接解构 msg -->
    <template #message="{ msg }">
      {{msg}}
    </template>
    <template #default="defaultProp">
      {{defaultProp.obj}}
    </template>
  </Comp>
</template>
```

@tab Child.vue
```vue :collapsed-lines=100
<script setup>
import { ref } from 'vue'

const greetingMessage = ref('hello')
const obj = ref('Vue.js')

</script>

<template>
  <div>
    <div>
      <slot name="message" :msg="greetingMessage">
        这是具名作用域插槽
      </slot>
    </div>
    <div>
      <slot :obj="obj">
        这是默认插槽
      </slot>
    </div>
  </div>
</template>
```
:::

### 插槽控制

我们可以使用 `$slots` 属性与 `v-if` 来实现对插槽的渲染。

::: tabs
@tab Parent.vue
```vue
<script setup>
import Card from './Card.vue'
</script>

<template>
  <Card>
    <!-- 不传入任何插槽，footer 插槽将不会被渲染 -->
  </Card>
</template>
```

@tab Child.vue
```vue 
<template>
  <div>
    <div>
      <slot name="header">
        这是 header
      </slot>
    </div>

    <div v-if="$slots.footer"> // [!code word:v-if="$slots.footer"]
      <slot name="footer" >
        这是 footer
      </slot>
    </div>
  </div>
</template>
```
:::

上面的例子中，子组件内的 footer 插槽使用了 `v-if="$slots.footer"` 来控制渲染。
当父组件没有提供名为 footer 的插槽时，`$slots` 里不存在 footer，所以 footer 插槽将不会被渲染。
而 header 插槽没有使用 `v-if`，所以 header 插槽将一直被渲染。

::: tip
`$slots` 是一个对象，包含所有传入的插槽。可以用 `$slots.footer` 判断是否传入了名为 footer 的插槽。
:::

我们还可以动态控制插槽名，来指定渲染的插槽。

```vue
<base-layout>
  <template v-slot:[dynamicSlotName]>
    ...
  </template>

  <!-- 缩写为 -->
  <template #[dynamicSlotName]>
    ...
  </template>
</base-layout>
```

## 依赖注入

[props](#props) 可以让我们将父组件的数据传递给子组件，实现父子组件间的通信。但是当组件层级多后，
如果仅使用 props 则必须将其沿着组件链逐级传递下去，这会非常麻烦。`provide` 和 `inject` 可以帮助我们解决这一问题。

无论层级有多深，凡事通过 `provide` 提供的数据，其任何后代都可以注入其依赖。

::: tabs
@tab provide
```vue
<script setup>
import { provide } from 'vue'

provide(/* 注入名 */ 'message', /* 值 */ 'hello!')
</script>
```

@tab inject
```vue
<script setup>
import { inject } from 'vue'

const message = inject('message')
</script>
```
:::

若是应用级别提供的数据，该应用内的所有组件中都可以注入。

```js
import { createApp } from 'vue'
const app = createApp({})

app.provide(/* 注入名 */ 'message', /* 值 */ 'hello!')
```

provide 可以提供任意类型的 JavaScript 值，且提供的响应式数据在注入后依然会保持响应式。

```vue
<!-- 在供给方组件内 -->
<script setup>
import { provide, ref } from 'vue'

const location = ref('North Pole')

function updateLocation() {
  location.value = 'South Pole'
}

provide('location', {
  location,
  updateLocation
})
</script>
```

```vue
<!-- 在注入方组件 -->
<script setup>
import { inject } from 'vue'

const { location, updateLocation } = inject('location')
</script>

<template>
  <button @click="updateLocation">{{ location }}</button>
</template>
```

如果想确保提供的数据不能被注入方的组件更改，可以使用 `readonly()` 来包装提供的值。

```vue
<script setup>
import { ref, provide, readonly } from 'vue'

const count = ref(0)
provide('read-only-count', readonly(count))
</script>
```

## 自定义组件

**当所需功能只能通过直接的 DOM 操作来实现时**，可以使用自定义指令。 

一个指令可以提供几种钩子函数：

```js :collapsed-lines=22
const myDirective = {
  // 在绑定元素的 attribute 前
  // 或事件监听器应用前调用
  created(el, binding, vnode) {
    // 下面会介绍各个参数的细节
  },
  // 在元素被插入到 DOM 前调用
  beforeMount(el, binding, vnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都挂载完成后调用
  mounted(el, binding, vnode) {},
  // 绑定元素的父组件更新前调用
  beforeUpdate(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都更新后调用
  updated(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载前调用
  beforeUnmount(el, binding, vnode) {},
  // 绑定元素的父组件卸载后调用
  unmounted(el, binding, vnode) {}
}
```

看似很复杂，但在实际应用中，使用 `mounted` 和 `updated` 即可完成绝大多数场景。

全局注册自定义指令：

```js
app.directive('color', (el, binding) => {
  // 这会在 `mounted` 和 `updated` 时都调用
  el.style.color = binding.value
})
```
```template
<div v-color="color"></div>
```

组件内注册自定义指令：

```vue
<script setup>
// 在模板中启用 v-focus
const vFocus = {
  mounted: (el) => el.focus()
}
</script>

<template>
  <input v-focus />
</template>
```

在不使用 `<script setup>` 的情况下，自定义指令需要通过 `directives` 选项注册：

```js
export default {
  setup() {
    /*...*/
  },
  directives: {
    // 在模板中启用 v-highlight
    highlight: {
      /* ... */
    }
  }
}
```

有时候指令可能需要多个值，可以向它传递一个 JavaScript 对象字面量。（指令也可以接收任何合法的 JavaScript 表达式）

```template
<div v-demo="{ color: 'white', text: 'hello!' }"></div>
```
```js
app.directive('demo', (el, binding) => {
  console.log(binding.value.color) // => "white"
  console.log(binding.value.text) // => "hello!"
})
```
