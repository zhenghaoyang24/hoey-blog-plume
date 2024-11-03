import './articleTagColors.css'
export const articleTagColors = {"CSS":"v2kw","HTML":"v2kw","JavaScript":"2wk7","Vue":"ih75","DeBug":"jgj1","微信小程序":"ih75","数据结构":"lm12","Thought":"jgj1","markdown":"m8xs"}

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
