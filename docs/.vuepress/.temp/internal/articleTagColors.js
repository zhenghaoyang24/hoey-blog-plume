import './articleTagColors.css'
export const articleTagColors = {"CSS":"y7w3","HTML":"y7w3","JavaScript":"oig1","Vue":"maoe","git":"v4a6","数据结构":"9cry","DeBug":"g6fj","微信小程序":"maoe","Node":"p7ro","npm":"3bal","pnpm":"i4ht","TypeScript":"9cry"}

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
