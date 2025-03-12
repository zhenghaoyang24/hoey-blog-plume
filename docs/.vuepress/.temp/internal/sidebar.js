export const sidebar = {"/":{"/patch/":{"items":"auto","prefix":"/notes/patch/"},"/interview/":{"items":"auto","prefix":"/notes/interview/"}},"__auto__":{"/notes/patch/":[{"text":"前端基础","items":[{"text":"CSS3","link":"/patch/CSS3/"},{"text":"HTML5","link":"/patch/HTML5/"}],"collapsed":false},{"text":"Vue","items":[{"text":"Vue2 快速上手","link":"/patch/vue2/"},{"text":"Vue3 快速上手","link":"/patch/vue3/"}],"collapsed":false},{"text":"Git","items":[{"text":"分支","link":"/patch/git/5qv6xbvm/"},{"text":"创建版本库","link":"/patch/git/yeneb1rg/"}],"collapsed":false}],"/notes/interview/":[{"text":"HTML","items":[{"text":"DOCTYPE","link":"/interview/DOCTYPE/"}],"collapsed":false},{"text":"CSS","items":[{"text":"盒模型","link":"/interview/iotn1t81/"}],"collapsed":false},{"text":"JavaScript","items":[{"text":"变量声明","link":"/interview/ukyhjw8j/"},{"text":"数据类型","link":"/interview/1uc8yvcn/"},{"text":"原型与原型链","link":"/interview/ndncesqk/"},{"text":"作用域与作用域链","link":"/interview/ffxj6x3r/"},{"text":"闭包","link":"/interview/20d108zg/"},{"text":"MVC/MVVM/MVP","link":"/interview/zmjqknax/"},{"text":"节流与防抖","link":"/interview/pk5xpaor/"},{"text":"设计模式","link":"/interview/vhyymiud/"}],"collapsed":false},{"text":"Vue","items":[{"text":"v-if 与 v-show 的区别","link":"/interview/dykkuon7/"},{"text":"Vue2与Vue3的区别","link":"/interview/lrdm06i5/"}],"collapsed":false},{"text":"计算机网络","items":[{"text":"HTTP 协议","link":"/interview/6th9jo3q/"}],"collapsed":false}]},"__home__":{"/notes/patch/":"/patch/","/notes/interview/":"/interview/"}}

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
