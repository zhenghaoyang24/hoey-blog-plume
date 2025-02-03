export const sidebar = {"/":{"/patch/":{"items":"auto","prefix":"/notes/patch/"},"/interview/":{"items":"auto","prefix":"/notes/interview/"}},"__auto__":{"/notes/patch/":[{"text":"前端基础","items":[{"text":"CSS3","link":"/patch/CSS3/"},{"text":"HTML5","link":"/patch/HTML5/"}],"collapsed":false},{"text":"Vue","items":[{"text":"Vue2 快速上手","link":"/patch/vue2/"},{"text":"Vue3 快速上手","link":"/patch/vue3/"}],"collapsed":false}],"/notes/interview/":[{"text":"HTML","items":[{"text":"DOCTYPE","link":"/interview/DOCTYPE/"}],"collapsed":false}]},"__home__":{"/notes/patch/":"/patch/","/notes/interview/":"/interview/"}}

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
