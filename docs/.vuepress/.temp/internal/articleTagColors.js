import './articleTagColors.css'
export const articleTagColors = {"CSS":"sbbr","HTML":"sbbr","JavaScript":"zqtg","Vue":"6ai4","DeBug":"lpsx","微信小程序":"6ai4","数据结构":"u5a0","Thought":"lpsx","markdown":"w3i1"}

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
