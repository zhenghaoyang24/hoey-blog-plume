export const sidebar = {"/":{"/patch/":{"items":"auto","prefix":"/notes/patch/"}},"__auto__":{"/notes/patch/":[{"text":"前端","items":[{"text":"CSS3","link":"/patch/CSS3/","items":[]},{"text":"HTML5","link":"/patch/HTML5/","items":[]},{"text":"Vue基础","link":"/patch/Vue/","items":[]}],"collapsed":false},{"text":"数据结构","items":[{"text":"树","link":"/patch/tree/","items":[]}],"collapsed":false}]},"__home__":{"/notes/patch/":"/patch/"}}

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
