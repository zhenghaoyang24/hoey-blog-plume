---
title: Vue3新特性
createTime: 2024/11/6 10:19:27
permalink: /patch/Vue3/
---

## 1. 组合式API
### 1.1 使用
**执行时期：**`setup()`在在`beforeCreate`钩子之前执行。  
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

### 1.4 watch
语法：`watch` 传入的是 `ref对象` ，因此监听对象不需要写 `.value`。  
```js
watch(ref对象,(newValue,oldValue)=>{ ..... })
```
#### 1.4.1 侦听单个数据
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
#### 1.4.2 侦听多个数据
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

#### 1.4.3 immediate 与 deep
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

#### 1.4.4 精确侦听
若不开启deep，只想侦听复杂对象的**某个属性**，则需将 `watch` 第一个监听对象参数改为**回调**：
```js
import { ref, watch } from 'vue'
const refValue = ref({name:'zhy',age:18})
// age变化才触发侦听
watch(()=>refValue.value.age , (newValue, oldValue)=>{
    // 监听逻辑,,,,,,
})
```

### 1.5 生命周期函数
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







