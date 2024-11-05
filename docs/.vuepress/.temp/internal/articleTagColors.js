import './articleTagColors.css'
export const articleTagColors = {"CSS":"3ow1","HTML":"3ow1","JavaScript":"yhfc","Vue":"cege","数据结构":"9okk","Thought":"7e2p","markdown":"p48n","DeBug":"7e2p","微信小程序":"cege"}

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
