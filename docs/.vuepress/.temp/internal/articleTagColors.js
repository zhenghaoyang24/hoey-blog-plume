import './articleTagColors.css'
export const articleTagColors = {"CSS":"e9m3","HTML":"e9m3","JavaScript":"8osd","Vue":"pcll","DeBug":"cuqa","微信小程序":"pcll","数据结构":"si0g","Thought":"cuqa","markdown":"2h80"}

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
