import './articleTagColors.css'
export const articleTagColors = {"CSS":"nrx2","HTML":"nrx2","JavaScript":"gw7d","Vue":"3wbe","Git":"ah7a","DeBug":"qn1w","微信小程序":"3wbe","Node":"01vh","npm":"7bm7","pnpm":"azlp","TypeScript":"fi51","Node.js":"nrx2","数据结构":"fi51"}

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
