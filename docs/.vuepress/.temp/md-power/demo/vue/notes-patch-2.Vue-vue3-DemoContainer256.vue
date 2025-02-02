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
      const changeName=()=>{
        name = 'zhang-san' //注意：此时这么修改name页面是不变化的
        console.log(name)
      }
      // 返回一个对象，对象中的内容，模板中可以直接使用
      return {name,changeName}
    }
  }
</script>