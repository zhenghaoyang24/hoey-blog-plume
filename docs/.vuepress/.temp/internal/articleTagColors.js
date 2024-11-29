import './articleTagColors.css'
export const articleTagColors = {"CSS":"bai3","HTML":"bai3","JavaScript":"lzkv","Vue":"b8ze","DeBug":"fp3s","微信小程序":"b8ze","Node":"f8mt","npm":"9xs2","pnpm":"9f8i","数据结构":"v9w1"}

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
