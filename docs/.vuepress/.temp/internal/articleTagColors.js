import './articleTagColors.css'
export const articleTagColors = {"CSS":"yrg4","HTML":"yrg4","Vue":"sb38","JavaScript":"7goo","DeBug":"31cu","微信小程序":"sb38","数据结构":"o8uj","Thought":"31cu","markdown":"7g5f"}

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
