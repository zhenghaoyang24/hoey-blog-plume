---
title: Vue基础
createTime: 2024/4/31 15:41:27
permalink: /patch/Vue/
---

## 一、Vue中的常用指令

**概念：**指令（Directives）是 Vue 提供的带有 **v- 前缀** 的 特殊 标签**属性**。  
vue 中的指令按照不同的用途可以分为如下 6 大类：
-  内容渲染指令（v-html、v-text）
-  条件渲染指令（v-show、v-if、v-else、v-else-if）
-  事件绑定指令（v-on）
-  属性绑定指令 （v-bind）
-  双向绑定指令（v-model）
-  列表渲染指令（v-for）

指令是 vue 开发中最基础、最常用、最简单的知识点。

## 二、内容渲染指令

内容渲染指令用来辅助开发者渲染 DOM 元素的文本内容。常用的内容渲染指令有如下2 个：

- v-text（类似innerText）
- - 使用语法：`<p v-text="uname">hello</p>`，意思是将 uame 值渲染到 p 标签中
- 类似 innerText，使用该语法，会覆盖 p 标签原有内容  


- v-html（类似 innerHTML）
- - 使用语法：`<p v-html="intro">hello</p>`，意思是将 intro 值渲染到 p 标签中
- 类似 innerHTML，使用该语法，会覆盖 p 标签原有内容
- 类似 innerHTML，使用该语法，能够将HTML标签的样式呈现出来。


## 三、条件渲染指令

条件判断指令，用来辅助开发者按需控制 DOM 的显示与隐藏。条件渲染指令有如下两个，分别是：

1. v-show

- 1. 作用：  控制元素显示隐藏
- 2. 语法：  v-show = "表达式"   表达式值为 true 显示， false 隐藏
- 3. 原理：  切换 display:none 控制显示隐藏
- 4. 场景：频繁切换显示隐藏的场景

2. v-if
- 1. 作用：  控制元素显示隐藏（条件渲染）
- 2. 语法：  v-if= "表达式"          表达式值 true显示， false 隐藏
- 3. 原理：  基于条件判断，是否创建 或 移除元素节点
- 4. 场景：  要么显示，要么隐藏，不频繁切换的场景

3. v-else 和 v-else-if

- 1. 作用：辅助v-if进行判断渲染
- 2. 语法：v-else  v-else-if="表达式"
- 3. 需要紧接着v-if使用

## 四、事件绑定指令

使用Vue时，如需为DOM注册事件，及其的简单，语法如下：

- \<button v-on:事件名="内联语句"\>按钮\</button>
- \<button v-on:事件名="处理函数">按钮\</button>
- \<button v-on:事件名="处理函数(实参)">按钮\</button>
- `v-on:` 简写为 **@**

1. 内联语句

```js
<div id="app">
    <button @click="count--">-</button>
    <span>{{ count }}</span>
    <button v-on:click="count++">+</button>
</div>
     <script>
       const app = new Vue({
         el: '#app',
         data: {
           count: 100
         }
       })
     </script>
```

2. 事件处理函数
   注意：
  - 事件处理函数应该写到一个跟data同级的配置项（methods）中
  - methods中的函数内部的this都指向Vue实例

3. 给事件处理函数传参
- 如果不传递任何参数，则方法无需加小括号；methods方法中可以直接使用 e 当做事件对象
- 如果传递了参数，则实参 `$event` 表示事件对象，固定用法。

## 五、属性绑定指令

1. **作用**： 动态设置html的标签属性 比如：src、url、title
2. **语法** ：**v-bind:** 属性名=“表达式”
3. **v-bind:** 可以简写成 =>   **:**

比如，有一个图片，它的 `src` 属性值，是一个图片地址。这个地址在数据 data 中存储。

则可以这样设置属性值：
- `<img v-bind:src="url" />`
- `<img :src="url" />`   （v-bind可以省略）

## 六、列表渲染指令

Vue 提供了 v-for 列表渲染指令，用来辅助开发者基于一个数组来循环渲染一个列表结构。

v-for 指令需要使用 `(item, index) in arr` 形式的特殊语法，其中：

- item 是数组中的每一项
- index 是每一项的索引，不需要可以省略
- arr 是被遍历的数组

此语法也可以遍历**对象和数字**

```js
//遍历对象
<div v-for="(value, key, index) in object">{{value}}</div>
/*
value:对象中的值
key:对象中的键
index:遍历索引从0开始
*/

//遍历数字
<p v-for="item in 10">{{item}}</p>
// item从1 开始
```

## 七、key
**语法：** key="唯一值"  
**作用：**给列表项添加的**唯一标识**。便于Vue进行列表项的**正确排序复用**。  
**为什么加key：** Vue 的默认行为会尝试原地修改元素（**就地复用**）  
实例代码：
```js
<ul>
  <li v-for="(item, index) in booksList" :key="item.id">
    <span>{{ item.name }}</span>
    <span>{{ item.author }}</span>
    <button @click="del(item.id)">删除</button>
  </li>
</ul>
```
注意：
1.  key 的值只能是字符串 或 数字类型
2.  key 的值必须具有唯一性
3.  推荐使用  id 作为 key（唯一），不推荐使用 index 作为 key（会变化，不对应）
### 1.用 key 管理可复用的元素
当不希望元素复用，而是两个元素独立时，只需添加一个具有唯一值的`key`attribute 即可。

## 八、v-model
所谓双向绑定就是：
1. 数据改变后，呈现的页面结果会更新
2. 页面结果更新后，数据也会随之而变
3. 
**作用：** 给**表单元素**（input、radio、select）使用，双向绑定数据，可以快速 **获取** 或 **设置** 表单元素内容  
**v-model**是一个语法糖。
::: vue-demo 演示
```vue
<template>
   单个复选框，绑定到布尔值；
   多个复选框，绑定到同一个数组。<br>
   <input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
   <label for="jack">Jack</label>
   <input type="checkbox" id="john" value="John" v-model="checkedNames">
   <label for="john">John</label>
   <input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
   <label for="mike">Mike</label>
   <br>
   <span>Checked names: {{ checkedNames }}</span>
   <br><br>单选按钮
   <div id="example-4">
      <input type="radio" id="one" value="One" v-model="picked">
      <label for="one">One</label>
      <br>
      <input type="radio" id="two" value="Two" v-model="picked">
      <label for="two">Two</label>
      <br>
      <span>Picked: {{ picked }}</span>
   </div>
   <br>选择框-多选(绑定到一个数组)
      <div id="example-6">
         <select v-model="selected" multiple style="width: 50px;">
            <option>A</option>
            <option>B</option>
            <option>C</option>
         </select>
         <br>
         <span>Selected: {{ selected }}</span>
      </div>
   </div>
</template>
<script>
   export default {
      data() {
          return{
             checkedNames:[],
             picked:'',
             selected:[]
          }
      },
   }
</script>
```
:::
## 九、指令修饰符

修饰符就是通过“.”指明一些指令**后缀** 不同的**后缀**封装了不同的处理操作，从而简化代码。

### 1. 按键修饰符
- @keyup.enter —> 当点击enter键的时候才触发
### 2. v-model修饰符
- v-model.trim  —>去除首位空格。
- v-model.number —>转为数字。
- v-model.lazy  —>取消数据同步，而转为在 change 事件之后进行同步。

::: vue-demo lazy演示
```vue
<template>
   <input type="text" v-model="text" placeholder="同步更新">
   text:{{text}}<br>
   <input type="text" v-model.lazy="textLazy" placeholder="lazy">
   text:{{textLazy}}
</template>
<script>
   export default {
      data() {
          return{
              text:'',
             textLazy:''
          }
      },
   }
</script>
```
:::


### 3. 事件修饰符
- @事件名.stop —> 阻止冒泡
- @事件名.prevent  —>阻止默认行为（如a标签上添加事件）
- @事件名.stop.prevent —>可以连用 即阻止事件冒泡也阻止默认行为

## 十、v-bind绑定HTML-Class

为了方便开发者进行样式控制， Vue 扩展了 v-bind 的语法，可以针对 **class 类名** 和 **style 行内样式** 进行控制 。

### 1.对象语法

当class动态绑定的是**对象**时，**键就是类名，值就是布尔值**，如果值是**true**，就有这个类，否则没有这个类

```html
<div class="box" :class="{ 类名1: 布尔值, 类名2: 布尔值 }"></div>
```
适用场景：一个类名，来回切换

### 2.数组语法

当class动态绑定的是**数组**时 → 数组中所有的类，都会添加到盒子上，本质就是一个 class 列表

```html
<div class="box" :class="[ 类名1, 类名2, 类名3 ]"></div>
```
使用场景:批量添加或删除类
::: tip
- 在数组语法中也可以使用对象语法  
- 可以绑定一个返回对象的计算属性
:::
- 
::: vue-demo 对象与数组语法演示
```vue
 <style>
    .colorActive {
      color: red;
    }
    .size-active {
      font-size: 30px;
    }
  </style>
<template>
    <!--绑定对象-->
    <div ref="arrClass" style="padding-bottom: 5px" :class="[{ colorActive: textColor}, sizeClass]">对象语法</div>
   <button @click="color(textColor)">颜色</button> &nbsp;
   <button @click="sizeBtn()">颜色</button> &nbsp;
</template>
  <script>
    export default{
       data() {
          return{
             textColor: false,
             sizeClass:'size-active'
          }
       },
       methods:{
          color(v) {
              this.textColor = !v
          }, 
          sizeBtn() {
              const ref = this.$refs.arrClass
              if (ref.classList.contains('size-active')) {
                 console.log(1)
                         ref.classList.remove('size-active')
              }
             else 
                 ref.classList.add('size-active')
                  
          },
       }
    }
  </script>
```
:::

## 十一.v-bind绑定内联样式
:::tip
`v-bind:style`同样有对象语法与数组语法
:::
### 1.多重值
可以为 style 绑定中的 property 提供一个包含多个值的数组，常用于提供多个带前缀的值，例如：
```html
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```
这样写只会渲染数组中最后一个被浏览器支持的值。
如果浏览器支持不带浏览器前缀的 flexbox，那么就只会渲染 display: flex。
