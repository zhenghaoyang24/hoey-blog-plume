import './articleTagColors.css'
export const articleTagColors = {"CSS":"slvs","HTML":"slvs","JavaScript":"q00u","Vue":"uytx","DeBug":"rvrc","微信小程序":"uytx","数据结构":"fd9i","Thought":"rvrc","markdown":"w79m"}

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
