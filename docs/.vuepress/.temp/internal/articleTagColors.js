import './articleTagColors.css'
export const articleTagColors = {"CSS":"kcnw","HTML":"kcnw","JavaScript":"7qho","Vue":"ewhf","DeBug":"qxkq","微信小程序":"ewhf","Node":"cp62","npm":"69y6","pnpm":"s7ln","TypeScript":"xnxr","数据结构":"xnxr"}

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
