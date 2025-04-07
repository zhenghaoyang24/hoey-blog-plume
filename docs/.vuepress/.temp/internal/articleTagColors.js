import './articleTagColors.css'
export const articleTagColors = {"CSS":"38yv","HTML":"38yv","JavaScript":"f7kh","Vue":"ca8q","Git":"ezhn","数据结构":"bs1u","DeBug":"t7aq","微信小程序":"ca8q","Node":"mcwq","npm":"7t21","pnpm":"n8g8","TypeScript":"bs1u"}

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
