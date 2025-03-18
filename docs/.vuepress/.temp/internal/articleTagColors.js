import './articleTagColors.css'
export const articleTagColors = {"CSS":"20wm","HTML":"20wm","JavaScript":"tbpm","Vue":"m9or","Git":"ktl1","数据结构":"af14","DeBug":"gnuv","微信小程序":"m9or","Node":"y3bs","npm":"t23d","pnpm":"8qnj","TypeScript":"af14"}

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
