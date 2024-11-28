import './articleTagColors.css'
export const articleTagColors = {"CSS":"8c1d","HTML":"8c1d","JavaScript":"g4g8","Vue":"5l35","DeBug":"40vs","微信小程序":"5l35","Node":"4zn8","npm":"sk14","pnpm":"l36q","数据结构":"gkft"}

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
