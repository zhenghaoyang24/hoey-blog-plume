import './articleTagColors.css'
export const articleTagColors = {"CSS":"vcpl","HTML":"vcpl","JavaScript":"g3op","Vue":"mv7l","DeBug":"ihdq","微信小程序":"mv7l","数据结构":"i1p4","Thought":"ihdq","markdown":"1keq"}

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
