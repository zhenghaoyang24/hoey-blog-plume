import './articleTagColors.css'
export const articleTagColors = {"CSS":"rmy1","HTML":"rmy1","JavaScript":"aegn","Vue":"h7ys","Git":"s9ye","DeBug":"qdc2","微信小程序":"h7ys","Node":"bxcr","npm":"2bmm","pnpm":"p7xn","TypeScript":"7n37","Node.js":"rmy1","数据结构":"7n37"}

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
