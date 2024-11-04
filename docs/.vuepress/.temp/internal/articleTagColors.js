import './articleTagColors.css'
export const articleTagColors = {"CSS":"eqn9","HTML":"eqn9","JavaScript":"og4g","Vue":"6oyz","数据结构":"d43g","Thought":"9izo","markdown":"809l","DeBug":"9izo","微信小程序":"6oyz"}

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
