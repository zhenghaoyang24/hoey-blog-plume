---
title: Vue3快速入门
createTime: 2024/8/5 10:19:27
permalink: /patch/vue3quickStart/
---

## 1. Vue3简介
 
**性能的提升**

- 打包大小更小
- 初次渲染、更新渲染更快
- 内存减少

**源码的升级**

- 使用`Proxy`代替`defineProperty`实现响应式。
- 重写虚拟`DOM`的实现和`Tree-Shaking`。

**拥抱TypeScript**

- `Vue3`可以更好的支持`TypeScript`。


**新的特性**

1. `Composition API`（组合`API`）：
    - `setup`
    - `ref`与`reactive`
    - `computed`与`watch`
      ......
2. 新的内置组件：
    - `Fragment`
    - `Teleport`
    - `Suspense`
      ......

3. 其他改变：
    - 新的生命周期钩子
    - `data` 选项应始终被声明为一个函数
    - 移除`keyCode`支持作为` v-on` 的修饰符
      ......


## 2. 创建Vue3工程

### 2.1. 基于 vue-cli 创建

点击查看[官方文档](https://cli.vuejs.org/zh/guide/creating-a-project.html#vue-create)

> 目前`vue-cli`已处于维护模式，官方推荐基于 `Vite` 创建项目。


```sh
## 查看@vue/cli版本，确保@vue/cli版本在4.5.0以上
vue --version

## 安装或者升级你的@vue/cli 
npm install -g @vue/cli

## 执行创建命令
vue create vue_test

##  随后选择3.x
##  Choose a version of Vue.js that you want to start the project with (Use arrow keys)
##  > 3.x
##    2.x
## 启动
cd vue_test
npm run serve
```

### 2.2 基于 vite 创建(推荐)

`vite` 是新一代前端构建工具，`vite`的优势如下：

- 轻量快速的热重载（`HMR`），能实现极速的服务启动。
- 对 `TypeScript`、`JSX`、`CSS` 等支持开箱即用。
- 真正的按需编译，不再等待整个应用编译完成。
- `webpack`构建 与 `vite`构建对比图如下：

<div style="display: grid;grid-template-columns: repeat(auto-fit, minmax(0, 1fr));">
<img src="/assets/patch_vue3quickStar_2-2-01.png"/>
<img src="/assets/patch_vue3quickStar_2-2-02.png"/>
</div>

* 具体操作如下（点击查看[官方文档](https://cn.vuejs.org/guide/quick-start.html#creating-a-vue-application)）

```powershell
## 1.创建命令
npm create vue@latest

## 2.具体配置
## 配置项目名称
√ Project name: vue3_test
## 是否添加TypeScript支持
√ Add TypeScript?  Yes
## 是否添加JSX支持
√ Add JSX Support?  No
## 是否添加路由环境
√ Add Vue Router for Single Page Application development?  No
## 是否添加pinia环境
√ Add Pinia for state management?  No
## 是否添加单元测试
√ Add Vitest for Unit Testing?  No
## 是否添加端到端测试方案
√ Add an End-to-End Testing Solution? » No
## 是否添加ESLint语法检查
√ Add ESLint for code quality?  Yes
## 是否添加Prettiert代码格式化
√ Add Prettier for code formatting?  No
```
安装官方推荐的`vscode`插件：

<div style="display: grid;grid-template-columns: repeat(auto-fit, minmax(0, 1fr));">
<img src="/assets/patch_vue3quickStar_2-2-03.png"/>
<img src="/assets/patch_vue3quickStar_2-2-04.png"/>
</div>

总结：
- `Vite` 项目中，`index.html` 是项目的入口文件，在项目最外层。
- 加载`index.html`后，`Vite` 解析 `<script type="module" src="xxx">` 指向的`JavaScript`。
- `Vue3` 中是通过 `createApp` 函数创建一个应用实例。


## 3. Vue3核心语法

### 3.1 Options & Composition

- `Vue2`的`API`设计是`Options`（配置）风格的。
- `Vue3`的`API`设计是`Composition`（组合）风格的。

##### Options API 的弊端

`Options`类型的 `API`，数据、方法、计算属性等，是分散在：`data`、`methods`、`computed`中的，若想新增或者修改一个需求，就需要分别修改：`data`、`methods`、`computed`，不便于维护和复用。
<div style="display: grid;grid-template-columns: repeat(auto-fit, minmax(0, 1fr));">
<img src="/assets/patch_vue3quickStar_3-01.gif"/>
<img src="/assets/patch_vue3quickStar_3-02.gif"/>
</div>

##### Composition API 的优势
可以用函数的方式，更加优雅的组织代码，让相关功能的代码更加有序的组织在一起。
<div style="display: grid;grid-template-columns: repeat(auto-fit, minmax(0, 1fr));">
<img src="/assets/patch_vue3quickStar_3-03.gif"/>
<img src="/assets/patch_vue3quickStar_3-04.gif"/>
</div>

### 3.2 setup

##### setup 概述

`setup`是`Vue3`中一个新的配置项，值是一个函数，它是 `Composition API` **“表演的舞台**_**”**_，组件中所用到的：数据、方法、计算属性、监视......等等，均配置在`setup`中。

特点如下：

- `setup`函数返回的对象中的内容，可直接在模板中使用。
- `setup`中访问`this`是`undefined`。
- `setup`函数会在`beforeCreate`之前调用，它是“领先”所有钩子执行的。

```vue
<template>
  <div class="person">
    <h2>姓名：{{name}}</h2>
    <h2>年龄：{{age}}</h2>
    <button @click="changeName">修改名字</button>
  </div>
</template>

<script lang="ts">
  export default {
    name:'Person',
    setup(){
      // 数据，原来写在data中（注意：此时的name不是响应式数据）
      let name = '张三'
       
      // 方法，原来写在methods中
      function changeName(){
        name = 'zhang-san' //注意：此时这么修改name页面是不变化的
        console.log(name)
      }
      // 返回一个对象，对象中的内容，模板中可以直接使用
      return {name,changeName}
    }
  }
</script>
```

##### setup 的返回值

- 若返回一个**对象**：则对象中的：属性、方法等，在模板中均可以直接使用。
- 若返回一个**函数**：则可以自定义渲染内容，代码如下：

```jsx
setup(){
  return ()=> '你好啊！'
}
```

##### setup 与 Options API 的关系

- `Vue2` 的配置（`data`、`methos`......）中**可以访问到** `setup`中的属性、方法。
- 但在`setup`中**不能访问到**`Vue2`的配置（`data`、`methos`......）。
- 如果与`Vue2`冲突，则`setup`优先。

##### setup 语法糖

`setup`函数有一个语法糖，这个语法糖，可以让我们把`setup`独立出去，代码如下：

```vue
<template>
  <div class="person">
    <h2>姓名：{{name}}</h2>
    <button @click="changName">修改名字</button>
  </div>
</template>

<script lang="ts">
  export default {
    name:'Person',
  }
</script>
<!-- 下面的写法是setup语法糖 -->
<script setup lang="ts">
  console.log(this) //undefined
  // 数据（注意：此时的name不是响应式数据）
  let name = '张三'
  // 方法
  function changName(){
    name = '李四'//注意：此时这么修改name页面是不变化的
  }
</script>
```

扩展：上述代码，还需要编写一个不写`setup`的`script`标签，去指定组件名字，比较麻烦，我们可以借助`vite`中的插件简化

1. 第一步：
```sh
npm i vite-plugin-vue-setup-extend -D
```

2. 第二步：
```js
// vite.config.ts
import { defineConfig } from 'vite'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'

export default defineConfig({
  plugins: [ VueSetupExtend() ]
})
```

3. 第三步：`<script setup lang="ts" name="Person">`


### 3.3 ref
##### **创建基本类型响应式数据**
- **作用：** 定义响应式变量。
- **语法：**` let xxx = ref(初始值)`。
- **返回值：** 一个`RefImpl`的实例对象，简称`ref对象`或`ref`，`ref`对象的`value`**属性是响应式的**。
- **注意点：**
  - `JS`中操作数据需要：`xxx.value`，但模板中不需要`.value`，直接使用即可。
  - 对于`let name = ref('张三')`来说，`name`不是响应式的，`name.value`是响应式的。

```vue
<template>
  <div class="person">
    <h2>姓名：{{name}}</h2>
    <h2>年龄：{{age}}</h2>
    <button @click="changeName">修改名字</button>
    <button @click="changeAge">年龄+1</button>
    <button @click="showTel">点我查看联系方式</button>
  </div>
</template>

<script setup lang="ts" name="Person">
  import {ref} from 'vue'
  // name和age是一个RefImpl的实例对象，简称ref对象，它们的value属性是响应式的。
  let name = ref('张三')
  let age = ref(18)
  // tel就是一个普通的字符串，不是响应式的
  let tel = '13888888888'

  function changeName(){
    // JS中操作ref对象时候需要.value
    name.value = '李四'
    console.log(name.value)
    // 注意：name不是响应式的，name.value是响应式的，所以如下代码并不会引起页面的更新。
    // name = ref('zhang-san')
  }
  function changeAge(){
    // JS中操作ref对象时候需要.value
    age.value += 1 
    console.log(age.value)
  }
  function showTel(){
    alert(tel)
  }
</script>
```

##### **创建对象类型的响应式数据**

- `ref` 接收的数据可以是：**基本类型**、**对象类型**。
- 当 `ref()` 包裹的是一个对象时，对这个对象的属性进行修改也会触发响应式更新。
- 若 `ref` 接收的是对象类型，内部其实也是调用了 `reactive` 函数。

```vue
<template>
  <div class="person">
    <h2>汽车信息：一台{{ car.brand }}汽车，价值{{ car.price }}万</h2>
    <button @click="changeCarPrice">修改汽车价格</button>
  </div>
</template>

<script lang="ts" setup name="Person">
import { ref } from 'vue'

// 数据
let car = ref({ brand: '奔驰', price: 100 })
console.log(car)

function changeCarPrice() {
  car.value.price += 10
}
</script>
```

### 3.4 reactive
##### **创建对象类型的响应式数据**
- **作用：**定义一个**响应式对象**（基本类型不要用它，要用`ref`，否则报错）
- **语法：**`let 响应式对象 = reactive(源对象)`。
- **返回值：** 一个`Proxy`的实例对象，简称：响应式对象。
- **注意点：**`reactive`定义的响应式数据是“深层次”的。

```vue
<template>
  <div class="person">
    <h2>汽车信息：一台{{ car.brand }}汽车，价值{{ car.price }}万</h2>
    <h2>游戏列表：</h2>
    <ul>
      <li v-for="g in games" :key="g.id">{{ g.name }}</li>
    </ul>
    <h2>测试：{{obj.a.b.c.d}}</h2>
  </div>
</template>

<script lang="ts" setup name="Person">
import { reactive } from 'vue'

// 数据
let car = reactive({ brand: '奔驰', price: 100 })
let games = reactive([
  { id: 'ahsgdyfa01', name: '英雄联盟' },
  { id: 'ahsgdyfa02', name: '王者荣耀' },
  { id: 'ahsgdyfa03', name: '原神' }
])
let obj = reactive({
  a:{
    b:{
      c:{
        d:666
      }
    }
  }
})
</script>
```

### 3.5 ref 对比 reactive

- `ref`用来定义：**基本类型数据**、**对象类型数据**；
- `reactive`用来定义：**对象类型数据**。
- 区别：
  - `ref`创建的变量必须使用`.value`（可以使用`volar`插件自动添加`.value`）。
    ![自定添加value插件](/assets/patch_vue3quickStar_3-6-01.png)
- `reactive`重新分配一个新对象，会**失去**响应式（可以使用`Object.assign`去整体替换）,`ref` 不会。
```vue
<template>
   <div>
      <h2>汽车信息：一台{{ car.brand }}汽车，价值{{ car.price }}万</h2>
      <h2>用户信息：姓名：{{ car.brand }}，年龄：{{ car.price }}</h2>
   </div>
</template>
<script lang="ts" setup>
   import { reactive , ref} from 'vue'
   // 数据
   const car = reactive({ brand: '奔驰', price: 100 })
   const user = ref({name: '小张', age: 20 })
   function changeCar(){
      //失去响应式
      car = { brand: '奔驰', price: 100 }
      //正确写法
      Object.assign(car,{ brand: '宝马', price: 200 })
   }
   function changeUser(){
      //不会失去响应式
      user = ref({name: '小王', age: 22 })
   }
</script>
```
:::tip
1. 若需要一个基本类型的响应式数据，必须使用 `ref`。
2. 若需要一个响应式对象，层级不深，`ref`、`reactive`都可以。
3. 若需要一个响应式对象，且层级较深，推荐使用 `reactive`。
:::

### 3.6 toRefs 与 toRef

- 作用：将一个响应式对象中的每一个属性，转换为`ref`对象。
- 备注：`toRefs`与`toRef`功能一致，但`toRefs`可以批量转换。

```vue
<template>
  <div class="person">
    <h2>姓名：{{person.name}}</h2>
    <h2>年龄：{{person.age}}</h2>
    <h2>性别：{{person.gender}}</h2>
    <button @click="changeName">修改名字</button>
  </div>
</template>

<script lang="ts" setup name="Person">
  import {reactive,toRefs,toRef} from 'vue'
  // 数据
  let person = reactive({name:'张三', age:18, gender:'男'})
  // 通过toRefs将person对象中的n个属性批量取出，且依然保持响应式的能力（结构为ref对象）
  let {name, gender } =  toRefs(person)
  // 通过toRef将person对象中的gender属性取出，且依然保持响应式的能力（结构为ref对象）
  let age = toRef(person,'age')
  // 方法
  function changeName(){
    // person.name 与 name.value等价，name为ref对象
    name.value  = '小红'
    person.nname  = '小明'
  }
</script>
```


### 3.7 computed

作用：根据已有数据计算出新数据（和`Vue2`中的`computed`作用一致）。  
具体用法查看[Vue3新特新-computed](/patch/Vue3new/#_1-4-computed)。

### 3.8 watch

作用：监视数据的变化（和`Vue2`中的`watch`作用一致）  
特点：`Vue3`中的`watch`只能监视以下**四种数据**：
1. `ref`定义的数据。
 2. `reactive`定义的数据。
3. 函数返回一个值（`getter`函数）。
4. 一个包含上述内容的数组。

在使用过程中，注意以下几点：
1. 监视`ref`定义的 **基本类型** 数据：直接写数据名即可，监视的是其`value`值的改变。
2. 监视`ref`定义的**对象类型**数据：直接写数据名；若想监视对象内部的数据，要手动开启深度监视。
3. 监视`reactive`定义的**对象类型**数据，默认**开启了深度监视**。
4. 监视`ref`或`reactive`定义的**对象类型**数据中的**某个属性**，注意点如下：
  - 若该属性值**不是**对象类型，需要写成函数形式。
  - 若该属性值是**依然**是对象类型，可直接编，也可写成函数，建议写成函数。

使用 `watch` 监听多个数据查看[Vue3新特新-watch](/patch/Vue3new/#_1-5-watch)。


### 3.9 watchEffect

[官网](https://cn.vuejs.org/api/reactivity-core.html#watcheffect)：立即运行一个函数，同时响应式地追踪其依赖，并在依赖更改时重新执行该函数。

**`watch`对比`watchEffect`**:
1. 都能监听响应式数据的变化，不同的是监听数据变化的方式不同
2. `watch`：要明确指出监视的数据
3. `watchEffect`：不用明确指出监视的数据（函数中用到哪些属性，那就监视哪些属性）：
```vue
<template>
  <div class="person">
    <h1>需求：水温达到50℃，或水位达到20cm，则联系服务器</h1>
    <h2 id="demo">水温：{{temp}}</h2>
    <h2>水位：{{height}}</h2>
    <button @click="changePrice">水温+1</button>
    <button @click="changeSum">水位+10</button>
  </div>
</template>

<script lang="ts" setup name="Person">
  import {ref,watch,watchEffect} from 'vue'
  // 数据
  let temp = ref(0)
  let height = ref(0)

  // 方法
  function changePrice(){
    temp.value += 10
  }
  function changeSum(){
    height.value += 1
  }

  // 用watch实现，需要明确的指出要监视：temp、height
  watch([temp,height],(value)=>{
    // 从value中获取最新的temp值、height值
    const [newTemp,newHeight] = value
    // 室温达到50℃，或水位达到20cm，立刻联系服务器
    if(newTemp >= 50 || newHeight >= 20){
      console.log('联系服务器')
    }
  })

  // 用watchEffect实现，不用
  const stopWtach = watchEffect(()=>{
    // 室温达到50℃，或水位达到20cm，立刻联系服务器
    if(temp.value >= 50 || height.value >= 20){
      console.log(document.getElementById('demo')?.innerText)
      console.log('联系服务器')
    }
    // 水温达到100，或水位达到50，取消监视
    if(temp.value === 100 || height.value === 50){
      console.log('清理了')
      stopWtach()
    }
  })
</script>
```

### 3.10 标签的 ref 属性

作用：用于注册模板引用。
> 用在普通`DOM`标签上，获取的是`DOM`节点。  
> 用在组件标签上，获取的是组件实例对象。  

用法查看 [Vue3新特性-模板引用](/patch/Vue3new/#_1-8-模板引用)。


### 3.11 props
[为组件的 props 标注类型](https://cn.vuejs.org/guide/typescript/composition-api.html#typing-component-props)
```ts
// 定义一个接口，限制每个Person对象的格式  types/types.ts
export interface PersonInter {
  id:string,
  name:string,
  age:number,
  address?:String   //可选
}
// 定义一个自定义类型Persons
export type Persons = Array<PersonInter>
```
`App.vue`中代码：
```vue
<template>
  <Person :list="persons"/>

</template>
<script lang="ts" setup name="App">
  import {type Persons} from './types'
  let persons = reactive<Persons>([
    {id:'e98219e12',name:'张三',age:18},
    {id:'e98219e13',name:'李四',age:19},
    {id:'e98219e14',name:'王五',age:20}
])
</script>
```
`Person.vue`中代码：
```vue
<template>
<div class="person">
<ul>
  <li v-for="item in list" :key="item.id">
     {{item.name}}--{{item.age}}
   </li>
 </ul>
</div>
</template>

<script lang="ts" setup name="Person">
import {defineProps} from 'vue'
import {type PersonInter} from '@/types'

// 第一种写法：仅接收
// const props = defineProps(['list'])

// 第二种写法：接收+限制类型
// defineProps<{list:Persons}>()

// 第三种写法：接收+限制类型+指定默认值+限制必要性
let props = withDefaults(defineProps<{list?:Persons}>(),{
  list:()=>[{id:'asdasg01',name:'小猪佩奇',age:18}]
})
console.log(props)
</script>
```

