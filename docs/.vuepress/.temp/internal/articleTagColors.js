import './articleTagColors.css'
export const articleTagColors = {"CSS":"jq22","HTML":"jq22","JavaScript":"bdh4","Vue":"5xlb","DeBug":"r8gq","微信小程序":"5xlb","数据结构":"vhi4","Thought":"r8gq","markdown":"cxfa"}

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
