export const sidebar = {"/":{"/web/":{"items":"auto","prefix":"/notes/web/"},"/android/":{"items":"auto","prefix":"/notes/android/"},"/memo/":{"items":"auto","prefix":"/notes/memo/"}},"__auto__":{"/notes/web/":[{"text":"前端基础","items":[{"text":"TypeScript","link":"/web/TypeScript/"}],"collapsed":false},{"text":"Vue","items":[{"text":"Vue2 快速上手","link":"/web/vue2/"},{"text":"Vue3 快速上手","link":"/web/vue3/"}],"collapsed":false},{"text":"前端面试","link":"/interview/","items":[{"text":"HTML","items":[{"text":"DOCTYPE","link":"/interview/DOCTYPE/"}],"collapsed":false},{"text":"CSS","items":[{"text":"盒模型","link":"/interview/iotn1t81/"}],"collapsed":false},{"text":"JavaScript","items":[{"text":"变量声明","link":"/interview/ukyhjw8j/"},{"text":"数据类型","link":"/interview/1uc8yvcn/"},{"text":"原型与原型链","link":"/interview/ndncesqk/"},{"text":"作用域与作用域链","link":"/interview/ffxj6x3r/"},{"text":"闭包","link":"/interview/20d108zg/"},{"text":"MVC/MVVM/MVP","link":"/interview/zmjqknax/"},{"text":"节流与防抖","link":"/interview/pk5xpaor/"},{"text":"设计模式","link":"/interview/vhyymiud/"}],"collapsed":false},{"text":"Vue","items":[{"text":"v-if 与 v-show 的区别","link":"/interview/dykkuon7/"},{"text":"Vue2与Vue3的区别","link":"/interview/lrdm06i5/"}],"collapsed":false},{"text":"计算机网络","items":[{"text":"HTTP 协议","link":"/interview/6th9jo3q/"}],"collapsed":false}],"collapsed":false}],"/notes/android/":[{"text":"kotlin","items":[{"text":"基础语法","link":"/android/kotlin/basic/"}],"collapsed":false}],"/notes/memo/":[{"text":"Git","items":[{"text":"介绍","link":"/memo/git/introduce/"},{"text":"创建版本库","link":"/memo/git/yeneb1rg/"},{"text":"分支管理","link":"/memo/git/5qv6xbvm/"},{"text":"switch与checkout","link":"/memo/git/8m4jq270/"},{"text":"四个工作区","link":"/memo/git/fkmrjk5q/"},{"text":"提交信息规范","link":"/memo/git/4rfr9bsp/"}],"collapsed":false}]},"__home__":{"/notes/web/":"/web/","/notes/android/":"/android/","/notes/memo/":"/memo/"}}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateSidebar) {
    __VUE_HMR_RUNTIME__.updateSidebar(sidebar)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ sidebar }) => {
    __VUE_HMR_RUNTIME__.updateSidebar(sidebar)
  })
}
