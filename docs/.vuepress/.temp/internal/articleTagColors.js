import './articleTagColors.css'
export const articleTagColors = {"CSS":"h8ki","HTML":"h8ki","JavaScript":"9i84","Vue":"eyj6","git":"2czm","数据结构":"146h","DeBug":"88iz","微信小程序":"eyj6","Node":"3a8w","npm":"anub","pnpm":"94py","TypeScript":"146h"}

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
