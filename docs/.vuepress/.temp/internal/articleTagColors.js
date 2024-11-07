import './articleTagColors.css'
export const articleTagColors = {"CSS":"03py","HTML":"03py","JavaScript":"i5mh","Vue":"pgx6","DeBug":"3g34","微信小程序":"pgx6","Node":"50jo","npm":"779y","pnpm":"icw0","数据结构":"or7t","Thought":"3g34","markdown":"04wi"}

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
