import './articleTagColors.css'
export const articleTagColors = {"CSS":"1myl","HTML":"1myl","JavaScript":"eep7","Vue":"ozl7","DeBug":"dyeb","微信小程序":"ozl7","数据结构":"mgwp","Thought":"dyeb","markdown":"zsnr"}

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
