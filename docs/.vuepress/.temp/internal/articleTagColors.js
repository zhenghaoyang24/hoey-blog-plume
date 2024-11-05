import './articleTagColors.css'
export const articleTagColors = {"CSS":"b34w","HTML":"b34w","JavaScript":"2akg","Vue":"hvu1","DeBug":"5mds","微信小程序":"hvu1","数据结构":"n47v","Thought":"5mds","markdown":"8bva"}

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
