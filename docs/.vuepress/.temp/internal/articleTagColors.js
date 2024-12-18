import './articleTagColors.css'
export const articleTagColors = {"CSS":"syd2","HTML":"syd2","JavaScript":"cdb7","Vue":"26ab","DeBug":"aohu","微信小程序":"26ab","Node":"qs9y","npm":"9hb9","pnpm":"5rs2","数据结构":"2bgm"}

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
