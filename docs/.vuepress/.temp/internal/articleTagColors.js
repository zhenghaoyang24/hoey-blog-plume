import './articleTagColors.css'
export const articleTagColors = {"CSS":"9mw7","HTML":"9mw7","JavaScript":"1xyl","Vue":"hjty","git":"s2us","数据结构":"o40h","DeBug":"uiur","微信小程序":"hjty","Node":"2w7o","npm":"81ol","pnpm":"e27u","TypeScript":"o40h"}

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
