export const sidebar = {"/":{"/patch/":{"items":"auto","prefix":"/notes/patch/"},"/interview/":{"items":"auto","prefix":"/notes/interview/"}},"__auto__":{"/notes/patch/":[{"text":"Vue","items":[{"text":"Vue3新特性","link":"/patch/Vue3new/"},{"text":"Vue3快速入门","link":"/patch/vue3quickStart/"},{"text":"Vue2基础","link":"/patch/VueBasic/"},{"text":"Vue2深入","link":"/patch/VueDepth/"}],"collapsed":false},{"text":"前端基础","items":[{"text":"CSS3","link":"/patch/CSS3/"},{"text":"HTML5","link":"/patch/HTML5/"}],"collapsed":false}],"/notes/interview/":[{"text":"HTML","items":[{"text":"DOCTYPE","link":"/interview/DOCTYPE/"}],"collapsed":false}]},"__home__":{"/notes/patch/":"/patch/","/notes/interview/":"/interview/"}}

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
