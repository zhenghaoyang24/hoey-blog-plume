import './articleTagColors.css'
export const articleTagColors = {"CSS":"qnbm","HTML":"qnbm","JavaScript":"6k1o","Vue":"yhxr","DeBug":"8aw7","微信小程序":"yhxr","数据结构":"jrde","Thought":"8aw7","markdown":"9dxt"}

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
