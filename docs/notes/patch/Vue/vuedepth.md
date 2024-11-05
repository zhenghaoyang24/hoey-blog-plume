---
title: Vue深入
createTime: 2024/11/05 14:13:26
permalink: /patch/Vue Depth/
---
## 1. 组件通信
### 1.1 props
#### 1.1.1 props类型

```js
props: {
  title: String,
  likes: Number,
  isPublished: Boolean,
  commentIds: Array,
  author: Object,
  callback: Function,
  contactsPromise: Promise
}
```
::: tip
1. type 可用数组声明多种类型。
2. 如果 type 仅为 null 而非使用数组语法，它将允许任何类型。
2. type 也可以是自定义的类或构造函数,Vue 将会通过 instanceof 来检查类型是否匹配。
   :::

#### 1.1.2 props校验
当 prop 验证失败的时候，(开发环境构建版本的) Vue 将会产生一个控制台的警告。
```js
props: {
    校验的属性名: {
    type: 类型, // Number String Boolean ...
    required: true, // 是否必填
    default: 默认值, // 简单默认值
    // 对象或数组默认值必须从一个工厂函数获取
    default: function () {
        return { message: 'hello' }
    }
    // 自定义类型校验函数
    // 在 3.4+ 中完整的 props 作为第二个参数传入
    validator (value,props) {
        // 自定义校验逻辑
        return 是否通过校验
        }
    }
}
```
::: warning
1. default和required一般不同时写（因为当时必填项时，肯定是有值的）
2. default后面如果是简单类型的值，可以直接写默认。如果是复杂类型的值，则需要以函数的形式return一个默认值。
3. prop 的校验是在组件实例被创建之前，所以实例的属性 (比如 data、computed 等) 将在 default 或 validator 函数中不可用。
   :::

#### 1.1.3 props父子通信
1. 父组件通过 **props** 将数据传递给子组件。（静态与动态props查看[此链接](https://cn.vuejs.org/guide/components/props.html#static-vs-dynamic-props)）
2. 子组件利用 **$emit** 通知父组件修改更新。

在子组件中发送监听:
``` vue
<button @click="$emit('increaseBy', 1)">加一</button>
```
在父组件监听事件:
``` vue
<MyButton :value="count" @increase-by="(n) => count += n" />
```
::: tip
1. 内联的箭头函数可以改为组件方法。
2. 父组件中推荐使用 kebab-case 形式来监听。props同理。
   :::

### 1.2 v-model
[v-model](https://cn.vuejs.org/guide/components/v-model.html)本质上是一个语法糖。例如应用在输入框上，就是value属性 和 input事件 的合写。
```html
<input v-model="msg" type="text">
```
在代码背后，模板编译器会对 v-model 进行更冗长的等价展开。因此上面的代码其实等价于下面这段：
```html
<input :value="msg" @input="msg = $event.target.value" type="text">
```
因此，若需要在父组件利用v-model实现父子组件通信，只需要将子组件prop为声明value，并触发 input事件。
```vue
<!--子组件-->
<select :value="value" @change="handleChange">...</select>
props: {
    value: String
},
methods: {
    handleChange (e) {
        this.$emit('input', e.target.value)
    }
}
<!--父组件-->
<BaseSelect v-model="selectId"></BaseSelect>
```

### 1.3 .sync修饰符
.sync修饰符 就是 **:属性名** 和 **@update:属性名** 合写。  
父组件
```vue
//.sync写法
<BaseDialog :visible.sync="isShow" />
//完整写法
<BaseDialog 
  :visible="isShow" 
  @update:visible="isShow = $event" 
/>
```
子组件
```js
props: {
    visible: Boolean
},
methods:{
   closeBox() {
      this.$emit('update:visible',false)
   },
}
```

### 1.4 event bus
在某些场景中，需要非父子组件之间进行简易消息传递，则使用`event bus`。  
以一个Vue场景为例，文件结构为：
:::file-tree
- src
    - components
        - SendVue.vue
        - ReceiveVue.vue
    - utils
        - EventBus.js
    - App.vue
:::


1. 创建一个都能访问的事件总线 （空Vue实例）
```js
// EventBus.js
import Vue from 'vue'
const Bus  =  new Vue()
export default Bus   //导出
```
2. 组件（接受方），监听Bus的 $on事件
```js
import Bus from '../utils/EventBus'
created () {
    Bus.$on('sendMsg', (msg) => {
    this.msg = msg
    })
}
```
3. 组件（发送方），触发Bus的$emit事件

```js
import Bus from '../utils/EventBus'
sendMsgAFn() {
   Bus.$emit('sendAMsg', '今天天气不错，适合旅游')
},
```

### 1.5 provide&inject
父组件利用provide可为子/孙组件提供数据。
1. 父组件 provide提供数据
```js
export default {
    provide () {
        return {
       // 普通类型【非响应式】
       color: this.color, 
       // 复杂类型【响应式】
       userInfo: this.userInfo, 
        }
    }
}
```
2. 子/孙组件 inject获取数据
```js
export default {
    inject: ['color','userInfo'],
        created () {
        console.log(this.color, this.userInfo)
    }
}
```
::: tip
- provide提供的简单类型的数据不是响应式的，复杂类型数据是响应式。（推荐提供复杂类型数据）
- 子/孙组件通过inject获取的数据，不能在自身组件内修改
  :::

## 2. 自定义指令
- 内置指令：**v-html、v-if、v-bind、v-on**... 这都是Vue给咱们内置的一些指令，可以直接使用
- 自定义指令：同时Vue也支持让开发者，自己注册一些指令。这些指令被称为**自定义指令**，每个指令都有自己各自独立的功能
### 2.1. 自定义指令语法
全局注册
```js
//在main.js中
Vue.directive('指令名', {
    "inserted" (el) {
    // 可以对 el 标签，扩展额外功能
    el.focus()
    }
})
```
局部注册
```js
//在Vue组件的配置项中
directives: {
    "指令名": {
        inserted () {
            // 可以对 el 标签，扩展额外功能
            el.focus()
        }
    }
}
```
配置介绍：  
inserted:被绑定元素插入父节点时调用的钩子函数。  
el：使用指令的那个DOM元素。

### 2.2. 自定义指令的指
- 在绑定指令时，可以通过“等号”的形式为指令绑定具体的参数值。
- 通过 `binding.value` 可以拿到指令值，**指令值修改会触发update函数**。
  ::: vue-demo 指令演示
```vue
<template>
  <div v-color="color">我是内容</div>
  <button type="button" @click="changeColor">修改指令值</button>
</template>
<script>
  export default {
    data () {
        return{
            color: "red"
        }
    },
    methods: {
      changeColor() {
          if (this.color==="red"){
            this.color = "blue"
          }
          else{
            this.color = "red"
          }
      },
    },
    directives: {
      color: {
        inserted(el, binding) {
          // binding.value 就是指令的值
          el.style.color = binding.value
        },
        // 2. update 指令的值修改的时候触发，提供值变化后，dom更新的逻辑
        updated(el, binding) {
          el.style.color = binding.value
        }
      }
    }
  }
</script>
```
:::

## 3. 插槽
\<slot> 元素是一个插槽出口 (slot outlet)，标示了父元素提供的插槽内容 (slot content) 将在哪里被渲染。
举例来说，这里有一个 \<FancyButton> 组件，可以像这样使用：
```html
<FancyButton>
Click me! <!-- 插槽内容 -->
</FancyButton>
```
而 \<FancyButton> 的模板是这样的：
```html
<button class="fancy-btn">
<slot></slot> <!-- 插槽出口 -->
</button>
```
最终渲染出的 DOM 是这样：
```html
<button class="fancy-btn">Click me!</button>
```
![默认内容](https://cdn.ipfsscan.io/weibo/mw690/006oZMAtly1hvbaxkgg77j31280egwiu.jpg)
:::tip
插槽内容可以访问到父组件的数据作用域。  
插槽内容无法访问子组件的数据。
:::

### 3.1 默认内容
\<slot>之间的内容，将在父组件没有提供任何插槽内容时作为默内容。

```html
<button type="submit">
  <slot>
    Submit <!-- 默认内容 -->
  </slot>
</button>
```
### 3.2 具名插槽
带`name`的插槽被称为具名插槽(named slots)。没有提供name的 `<slot>` 出口会隐式地命名为“default”（name="default"）。  
要为具名插槽传入内容，需要使用一个含 `v-slot` 指令的 `<template>` 元素，并将目标插槽的名字传给该指令：
```vue
<!--子模板中-->
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
</div>
<!--父组件调用时-->
<BaseLayout>
  <template v-slot:header>
    <!-- header 插槽的内容放这里 -->
  </template>
</BaseLayout>
```
`<template v-slot:header>`可以简写为`<template #header>`。  
当一个组件同时接收默认插槽和具名插槽时，所有位于顶级的非 `<template>` 节点都被隐式地视为默认插槽的内容。

### 3.3 作用域插槽
解决插槽的内容无法访问到子组件的状态。
#### 3.3.1 默认作用域插槽
```vue
<!-- <MyComponent> 的模板 -->
<div>
  <slot :text="greetingMessage" :count="1"></slot>
</div>
```
默认插槽通过子组件标签上的 `v-slot` 指令，直接接收到了一个插槽 `props` 对象。
```vue
<MyComponent v-slot="slotProps">
  {{ slotProps.text }} {{ slotProps.count }}
</MyComponent>
```
以上代码可以解构为：
```vue
<MyComponent v-slot="{ text, count }">
  {{ text }} {{ count }}
</MyComponent>
```
#### 3.3.2 具名作用域插槽
具名作用域插槽的工作方式也是类似的，插槽 `props` 可以作为 `v-slot` 指令的值被访问到：
`v-slot:name="slotProps"`。当使用缩写时是这样：
```vue
<MyComponent>
  <template #header="headerProps">
    {{ headerProps }}
  </template>
</MyComponent>
```
向具名插槽中传入 props：
```vue
<slot name="header" message="hello"></slot>
```
`name` 是一个 Vue 特别保留的 attribute，不会作为 props 传递给插槽。
因此最终 `headerProps` 的结果是 `{ message: 'hello' }`。

同时使用了具名插槽与默认插槽，则需要为默认插槽使用显式的 `<template>` 标签。直接为组件添加 `v-slot`
指令将导致**编译错误**!
```html
<!-- <MyComponent> template -->
<div>
  <slot :message="hello"></slot>
  <slot name="footer" />
</div>

<!-- 该模板无法编译 -->
<MyComponent v-slot="{ message }">
  <p>{{ message }}</p>
  <template #footer>
    <!-- message 属于默认插槽，此处不可用！ -->
    <p>{{ message }}</p>
  </template>
</MyComponent>

<!--正确写法-->
<MyComponent>
  <!-- 使用显式的默认插槽 -->
  <template #default="{ message }">
    <p>{{ message }}</p>
  </template>
  <template #footer>
    <p>Here's some contact info</p>
  </template>
</MyComponent>
```

## 4. 路由
Vue Router 是[Vue.js](https://router.vuejs.org/zh/)的官方路由。它与 Vue.js 核心深度集成，让用 Vue.js 构建单页应用变得轻而易举。
::: tip
在使用router前，需确保[Router安装](https://router.vuejs.org/zh/installation.html)成功。
:::
### 4.1 导航的两种方式
可以使用 `<router-link>` 创建 a 标签来定义导航链接，还可以借助 `router` 的实例方法，通过编写代码来实现。  

|           声明式	           |编程式|
|:------------------------:|:----:|
| \<router-link :to="..."> |	router.push(...)|

### 4.2 声明式导航
#### 4.2.1 查询参数传参
查询参数传参是通过URL传递参数，利用`?`来声明一个传递参数。
- 如何传参？  
  \<router-link to="/path?参数名=值?参数名2=值">\</router-link>
- 如何接受参数？  
  固定用法：`$router.query.参数名`
#### 4.2.2 动态路由传参
在 Vue Router 中，可以在路径中使用一个动态字段来实现，称之为 **路径参数** ：
```js
const router = new VueRouter({
    routes: [
    ...,
    { 
        path: '/search/:words', 
        component: Search 
    }]
})
```
路径参数 用冒号 `:` 表示，当一个路由被匹配时，它的 params 的值将在每个组件中以 `route.params` 的形式暴露出来。若添加`?`(`:words?`)
表示为可选参数。
对应页面组件**接受参数**使用 `route.params.参数名`。
```vue
<template>
  <div>
    <!-- 当前路由可以通过 $route 在模板中访问 -->
    User {{ $route.params.words }}
  </div>
</template>
```
同样可以在同一个路由中设置有多个 **路径参数**，它们会映射到 `$route.params` 上的相应字段。例如：

|              匹配模式               |          	匹配路径	           |              route.params              |
|:-------------------------------:|:-------------------------:|:--------------------------------------:|
|        /users/:username	        |      /users/eduardo	      |        `{ username: 'eduardo' }`         |
| /users/:username/posts/:postId	 | /users/eduardo/posts/123	 | `{ username: 'eduardo', postId: '123' }` |


### 4.3 编程式导航
在组件内部，可以使用 `$router` 属性访问路由，例如 `this.$router.push(...)`。  
当点击 `<router-link>` 时，内部会调用这个方法，所以点击 `<router-link :to="...">` 相当于调用   `router.push(...)` 。
#### 4.3.1 跳转与传参
可以使用路由路径实现跳转并传递参数。
```js
// 简写
this.$router.push('路由路径?参数名=参数值')
// 完整写法
this.$router.push({
    path: '路由路径'
    query: {
        参数名: 参数值,
        参数名: 参数值
    }
})
```
若路由路径太长，也可以通过**命名路由**的方式实现跳转。用这种方式跳转时，需要使用 `name` 给路由命名。
```js
// 命名
const routes = [
  {
    path: '/user/:username',
    name: 'profile', 
    component: User
  }
]
// 跳转与传参
this.$router.push({
    name: '路由名'
    params: { 参数名: 参数值 }    //动态路由传参
    query: { 参数名: 参数值 },    //路径传参
})
```
提供了 `path`，`params` 会被忽略:
```js
// `params` 不能与 `path` 一起使用
router.push({ path: '/user', params: { username } }) // -> /user
```
但可以使用：
```js
router.push({ path: `/user/${username}` }) // -> /user/eduardo
```

#### 4.3.2 替换当前位置
它的作用类似于 `router.push`，唯一不同的是，它在导航时不会向 `history` 添加新记录，
正如它的名字所暗示的那样——它取代了当前的条目。

|           声明式	           |编程式|
|:------------------------:|:----:|
| \<router-link :to="..." replace> |	router.replace(...)|

也可以直接在传递给 router.push 的 to 参数中增加一个属性 `replace: true` ：
```js
router.push({ path: '/home', replace: true })
// 相当于
router.replace({ path: '/home' })
```
