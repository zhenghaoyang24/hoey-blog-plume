import './articleTagColors.css'
export const articleTagColors = {"CSS":"oyt0","HTML":"oyt0","JavaScript":"u683","Vue":"rxma","Git":"mlah","数据结构":"fbmi","DeBug":"ll3j","微信小程序":"rxma","Node":"sii7","npm":"ao7h","pnpm":"g76y","TypeScript":"fbmi"}

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
