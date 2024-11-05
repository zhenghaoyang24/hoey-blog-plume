import './articleTagColors.css'
export const articleTagColors = {"CSS":"atj6","HTML":"atj6","Vue":"lqte","JavaScript":"4xmd","DeBug":"4m68","微信小程序":"lqte","数据结构":"lgcz","Thought":"4m68","markdown":"zcea"}

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
