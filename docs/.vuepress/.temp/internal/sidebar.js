export const sidebar = {"/":{"/patch/":{"items":"auto","prefix":"/notes/patch/"}},"__auto__":{"/notes/patch/":[{"text":"Vue","items":[{"text":"Vue3新特性","link":"/patch/Vue3new/"},{"text":"Vue3快速入门","link":"/patch/vue3quickStart/"},{"text":"Vue2基础","link":"/patch/VueBasic/"},{"text":"Vue2深入","link":"/patch/VueDepth/"}],"collapsed":false},{"text":"前端基础","items":[{"text":"CSS3","link":"/patch/CSS3/"},{"text":"HTML5","link":"/patch/HTML5/"}],"collapsed":false},{"text":"数据结构","items":[{"text":"树","link":"/patch/tree/"}],"collapsed":false}]},"__home__":{"/notes/patch/":"/patch/"}}

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
