export const sidebar = {"/":{"/chalou/":{"items":"auto","prefix":"/notes/chalou/"}},"__auto__":{"/notes/chalou/":[{"text":"前端","items":[{"text":"CSS3","link":"/chalou/CSS3/","items":[]},{"text":"HTML5","link":"/chalou/HTML5/","items":[]}],"collapsed":false},{"text":"数据结构","items":[{"text":"树","link":"/chalou/%E6%A0%91/","items":[]}],"collapsed":false}]},"__home__":{"/notes/chalou/":"/chalou/"}}

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
