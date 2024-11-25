import './articleTagColors.css'
export const articleTagColors = {"CSS":"xoiq","HTML":"xoiq","JavaScript":"bek6","Vue":"2pcx","DeBug":"w6ko","微信小程序":"2pcx","Node":"q2cu","npm":"24ph","pnpm":"473u","数据结构":"7im9","Thought":"w6ko","markdown":"cbse"}

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
