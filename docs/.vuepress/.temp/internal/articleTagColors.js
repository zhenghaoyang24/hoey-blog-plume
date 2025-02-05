import './articleTagColors.css'
export const articleTagColors = {"CSS":"712w","HTML":"712w","JavaScript":"6dw2","Vue":"j2yp","git":"1k8x","DeBug":"6bra","微信小程序":"j2yp","Node":"g807","npm":"37iz","pnpm":"sqxp","TypeScript":"onp4","数据结构":"onp4"}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateArticleTagColors) {
    __VUE_HMR_RUNTIME__.updateArticleTagColors(articleTagColors)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ articleTagColors }) => {
    __VUE_HMR_RUNTIME__.updateArticleTagColors(articleTagColors)
  })
}
