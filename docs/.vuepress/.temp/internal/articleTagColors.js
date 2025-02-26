import './articleTagColors.css'
export const articleTagColors = {"CSS":"eroq","HTML":"eroq","JavaScript":"wcxt","Vue":"dw0n","git":"3mzn","数据结构":"slbp","DeBug":"d8p7","微信小程序":"dw0n","Node":"3at4","npm":"75bl","pnpm":"7dol","TypeScript":"slbp"}

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
