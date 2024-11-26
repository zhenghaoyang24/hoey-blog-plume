---
title: Vue3新特性
createTime: 2024/6/16 13:21:27
permalink: /patch/Vue3new/
---

## 1. 组合式API
### 1.1 使用
**执行时期：**`setup()`在`beforeCreate`钩子之前执行。  
在setup函数中写的数据和方法需要在末尾以对象的方式return，才能给模版使用：
```js
export default {
    setup(){
      const message = 'this is message'
      const logMessage = ()=>{
        console.log(message)
      }
      // 必须return才可以
      return {
        message,
        logMessage
      }
    }
  }
```
**`<script setup>`语法糖**： script标签添加 setup标记，不需要再写导出语句，默认会添加导出语句。
```js
<script setup>
  const message = 'this is message'
  const logMessage = ()=>{
    console.log(message)
  }
</script>
```
### 1.2 reactive和ref函数
- reactive  
接受**对象类型**数据的参数传入并返回一个响应式的对象。
```js
<script>
  // 导入
  import { reactive } from 'vue'
  // 执行函数 传入参数 变量接收
  const state = reactive({
    msg:'this is msg'
  })
  const setSate = ()=>{
    // 修改数据更新视图
    state.msg = 'this is new msg'
  }
</script>
``` 
- ref  
接收**简单类型或者对象类型**的数据传入并返回一个响应式的对象。实际上`ref`在底层仍然是借助`reactive`实现，它将简单数据包成复杂类型后返回。  

```vue
<script setup>
  import {ref } from 'vue'
  const count = ref(0)
</script>
<template>
  {{count}}
</template>
```

### 1.3 reactive 对比 ref
1. 都是用来生成响应式数据。
2. 不同点：
- reactive不能处理简单类型的数据
- ref参数类型支持更好，但是必须通过.value做访问修改
- ref函数内部的实现依赖于reactive函数
3. 在实际工作中的推荐使用`ref`函数。

::: tip
js中访问 ref 需要添加 .value 。  
在 template 中，.value 不需要添加。
:::

### 1.4 computed
计算属性基本思想和Vue2保持一致，组合式API下的计算属性只是修改了API写法。
```js
// script setup
import {ref, computed } from 'vue'
// 原始数据
const list = ref([1,2,3,4,5,6,7,8])
// 计算属性list 过滤大于2后的数据
const filterList = computed(()=>{
    list.value.filter(item=>item>2)
})
```
若需要使用`set`与`get`，只需要将函数写为对象：
```js
// script setup
import {ref, computed } from 'vue'
// 原始数据
const count = ref(1)
// 计算属性list 过滤大于2后的数据
const countPlusOne = computed({
    get:()=>count.value+1,
    set:(val)=> //修改逻辑
})
```

### 1.5 watch
语法：`watch` 传入的是 `ref对象` ，因此监听对象不需要写 `.value`。  
```js
watch(ref对象,(newValue,oldValue)=>{ ..... })
```
#### 1.5.1 侦听单个数据
```js
<script setup>
  // 1. 导入watch
  import { ref, watch } from 'vue'
  const count = ref(0)
  // 2. 调用watch 侦听变化
  watch(count, (newValue, oldValue)=>{
    console.log(`count发生了变化，老值为${oldValue},新值为${newValue}`)
  })
</script>
```
#### 1.5.2 侦听多个数据
侦听多个数据，第一个参数可以改写成**数组**的写法：
```js
<script setup>
  // 1. 导入watch
  import { ref, watch } from 'vue'
  const count = ref(0)
  const name = ref('cp')
  // 2. 调用watch 侦听变化
  watch([count, name], ([newCount, newName],[oldCount,oldName])=>{
    console.log(`count或者name变化了，[newCount, newName],[oldCount,oldName])
  })
</script>
```

#### 1.5.3 immediate 与 deep
**immediate**:在侦听器创建时立即出发回调，响应式数据变化之后继续执行回调。  
**deep**:对复杂类型执行深度监听。（Vue `watch`默认为浅层监听，`deep:false` 无法监听复杂类型数据的变化。）  

语法：`watch( 监听对象, 回调 , immediate 与 deep)`  
```js
import { ref, watch } from 'vue'
const refValue = ref({name:'zhy',age:18})
watch(refValue, (newValue, oldValue)=>{
    // 监听逻辑,,,,,,
},{
    immediate: true,
    deep:true
})
```
::: tip
当开启 deep:true ,oldValue 总是与 newValue 相同。  
reactive 总是深度响应的,用 reactive 创建的响应式对象，即时 deep:false 也能够监听对象里的所有属性。
:::

#### 1.5.4 精确侦听
若不开启deep，只想侦听复杂对象的**某个属性**，则需将 `watch` 第一个监听对象参数改为**回调**：
```js
import { ref, watch } from 'vue'
const refValue = ref({name:'zhy',age:18})
// age变化才触发侦听
watch(()=>refValue.value.age , (newValue, oldValue)=>{
    // 监听逻辑,,,,,,
})
```

### 1.6 生命周期函数
![patch_vue3_lifecycle_01.jpg](/assets/patch_vue3_lifecycle_01.jpg)
生命周期函数执行多次的时候，会按照顺序依次执行：  
```js
<scirpt setup>
import { onMounted } from 'vue'
onMounted(()=>{
  // 自定义逻辑
})
onMounted(()=>{
  // 自定义逻辑
})
</script>
```

### 1.7 父子组件通信
#### 1.7.1 父传子

> 1. 父组件中给子组件绑定属性
> 2. 子组件内部通过props选项接收数据

使用 `setup` 组件式编写时，子组件需要通过 `defineProps` **编译宏**接受父组件的数据：  
    模板内：`{{props属性名}}`  
    函数中：`props.属性名`
```vue
<!--父组件-->
<script setup>
  import SonComVue from './son-com.vue'
</script>
<template>
  <SonComVue message="Hello"></SonComVue>
</template>

<!--子组件-->
<script setup>
//  借助defineProps宏接受数据
  const props = defineProps({
    message:String
  })
</script>
<template>
  <div>{{message}}</div>
</template>
```
传递动态值：
```vue
<!--父组件-->
<script setup>
  import SonComVue from './son-com.vue'
  import { ref } from 'vue'
  const money = ref(100)
</script>
<template>
  <SonComVue :money="money"></SonComVue>
</template>

<!--子组件-->
<script setup>
  const props = defineProps({
    money:Number
  })
</script>
<template>
  <div>{{money}}</div>
</template>
```

#### 1.7.2 子传父

> 1. 父组件中给子组件标签通过@绑定事件
> 2. 子组件内部通过 emit 方法触发事件

在子组件内，通过 `defineEmits` 编译器宏生成emit方法：

```vue
<!--父组件-->
<script setup>
  import SonComVue from './son-com.vue'
  import { ref } from 'vue'
  const money = ref(100)
  const changeMoneyFn = (v)=>{
      money.value = money.value + v
  }
</script>
<template>
  <SonComVue :money="money" @changeMoney="changeMoneyFn"></SonComVue>
</template>

<!--子组件-->
<script setup>
    // 通过defineEmits生成emit，写为数组形式。
  const emit = defineEmits(['changeMoney'])
  const props = defineProps({
    money:Number
  })
  const getMoney = ()=>{
      // 触发监听
      emit('changeMoney',100)
  }
</script>
<template>
  <div>{{money}}</div>
  <button @click="getMoney">获得100元</button>
</template>
```

### 1.8 模板引用
> 1. 调用ref函数生成一个ref对象。
> 2. 通过ref标识绑定ref对象到标签。
> 3. 通过ref对象.value则可获取绑定的dom对象。

```vue
<script setup>
  import {onMounted, ref} from 'vue'
  // 1.调用ref函数得到ref对象
  const inputRef = ref(null)
  const focusFn = ()=>{
      // 获取焦点
      inputRef.value.focus()
  }
</script>

<template>
  <!--2. 通过ref标识绑定ref对象-->
  <input type="text" ref="inputRef">
  <button @click="focusFn">获取焦点</button>
</template>
```
在 `vue2` 中将 `ref` 绑定在组件上，父组件通过 `this.$refs.ref值.function()` 或 `this.$refs.ref值.属性名`
可以直接访问子组件方法与属性。  
但在 `vue3` 中，默认情况下在 
`<script setup>` **语法糖下组件内部的属性和方法是不开放给父组件访问的**，可以通过 `defineExpose` 编译宏 指定哪些属性和方法容许访问。
```js
// 子组件
import { defineExpose,ref }  from 'vue';
const money = ref(100)
const addMoneyPlus = ()=>{
    money.value++
}
defineExpose({
    // 指定向外暴露的属性与方法
    money,addMoneyPlus
})
```
### 1.9 provide和inject

1. 顶层组件通过 `provide` 函数提供数据
2. 底层组件通过 `inject` 函数提供数据  

`provide` 和 `inject` 实现顶层组件向任意的底层组件传递数据和方法，实现跨层组件通信，
这与[Vue2中的provide和inject](/patch/VueDepth/#_1-5-provide-inject)相同。
但在Vue3组件式开发中，此语法略有不同：

```vue
<!--顶层组件-->
<script setup>
  import {ref, provide} from 'vue'

  const money = ref(100)
  const moneyFn = (newMoney) => {
    money.value = newMoney
  }
  // 传递响应式数据
  provide('fatherMoney', money)
  // 传递方法函数，则可以实现底层组件更改顶层组件的数据（但实则还是顶层组件在更改）
  provide('moneyFn', (newMoney) => {
    money.value = newMoney
  })
</script>

<!--底层组件-->
<script setup>
  import {inject} from 'vue'
  // 获取顶层数据
  const money = inject('money')
  // 获取顶层方法
  const moneyFn = inject('moneyFn')
  // 更改数据
  const changeMoney = ()=>{
    moneyFn(110)
  }
</script>
```

## 2. 新特性

有 `<script setup>` 之前，如果要定义 `props`, `emits` 可以轻而易举地添加一个与 `setup` 平级的属性。
但是用了 `<script setup>` 后，就没法这么干了 `setup` 属性已经没有了，自然无法添加与其平级的属性，例如组件名称。  
为了解决这一问题，引入了 `defineProps` 与 `defineEmits` 这两个宏。但这只解决了 `props` 与 `emits` 这两个属性。
如果我们要定义组件的 `name` 或其他自定义的属性，还是得回到最原始的用法 — 再添加一个普通的 `<script>` 标签。
这样就会存在两个 `<script>` 标签，让人无法接受。
```vue
<script>
  export default {
      name:'XXX'
  }
</script>
<script setup>
   // 代码 ......
</script>
<template></template>
```

### 2.1 defineOptions
在 Vue 3.3 中新引入了 `defineOptions` 宏。顾名思义，主要是用来定义 Options API 的选项。
可以用 `defineOptions` 定义任意的选项， `props`, `emits`, `expose`, `slots` 
除外。（因为这些可以使用 defineXXX 来做到）
```vue

<script setup>
  import {ref} from 'vue'
  defineOptions({
    name: 'XXX',
    //   其他属性
  })
  const money = ref(100)
  // 其他逻辑
</script>
```

### 2.2 defineModel
在Vue3中，自定义组件上使用 `v-model`, 相当于传递一个 `modelValue` 属性，同时触发 `update:modelValue` 事件。  
父组件：  
```vue
<ChildCom v-model="count"></ChildCom>
<ChildCom :modelVale="count" @update:modelvalue="count = $event"></ChildCom>
```
子组件：
```vue
<script setup>
  defineProps({  //props值
    modelValue:Number
  })
  const emit = defineEmits(['update:modelValue'])  //监听事件
</script>
<template>
  <input type="text" 
         :value="modelValue" 
         @input="e = ()=> emit('update:modelValue',e.target.value)">
</template>
```

可以看到若要实现响应式数据，子组件的写法非常复杂，既需要 `defineProps` 声明属性，还需要 `defineEmits`
声明监听事件，但在 **vue3.4** 后，提供了一个新特性 - `defineModel`。利用这个新特性，子组件代码可以简化为：

```vue

<script setup>
  import {defineModel} from "vue"; //vue3.4之前需要导入与配置
  const modelValue = defineModel()
</script>
<template>
  <input type="text"
         :value="modelValue"
         @input="e => modelValue = e.target.value">
</template>
```
```js
// vue3.4之前需要导入与配置 vite.config.js
pluging:[
    vue({
        scriipt:{
            defineModel:true
        }
    })
]
```
:::tip
 vue3.4 之前需要导入 defineModel 且在 `vite.config.js` 配置 `defineModel:true`。
:::

## 2. Pinia
`Pinia` 是 Vue 的专属状态管理库，是 Vuex的替代品。[Pinia官网](https://pinia.vuejs.org/zh/)就 Pinia 学习提供了详细指南
，可前往阅读。
### 2.1 storeToRefs工具函数
使用 `storeToRefs` 函数可以辅助保持数据（state + getter）的响应式解构。
### 2.1 持久化
`vuex` 可以使用[vuex-persistedstate](https://www.npmjs.com/package/vuex-persistedstate)实现持久化，同样 `Pinia` 也有持久化方案 - [pinia-plugin-persistedstate](https://prazdevs.github.io/pinia-plugin-persistedstate/zh/)。
