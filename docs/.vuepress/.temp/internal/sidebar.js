export const sidebar = {"/":{"/patch/":{"items":"auto","prefix":"/notes/patch/"}},"__auto__":{"/notes/patch/":[{"text":"前端基础","items":[{"text":"CSS3","link":"/patch/CSS3/","items":[]},{"text":"HTML5","link":"/patch/HTML5/","items":[]}],"collapsed":false},{"text":"Vue","items":[{"text":"Vue3新特性","link":"/patch/Vue3/","items":[]},{"text":"Vue基础","link":"/patch/Vue%20Basic/","items":[]},{"text":"Vue深入","link":"/patch/Vue%20Depth/","items":[]}],"collapsed":false},{"text":"数据结构","items":[{"text":"树","link":"/patch/tree/","items":[]}],"collapsed":false}]},"__home__":{"/notes/patch/":"/patch/"}}

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
