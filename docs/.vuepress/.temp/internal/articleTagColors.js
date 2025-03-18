import './articleTagColors.css'
export const articleTagColors = {"CSS":"netk","HTML":"netk","JavaScript":"zrkr","Vue":"dr6e","Git":"2bkj","数据结构":"fnbm","DeBug":"w3d9","微信小程序":"dr6e","Node":"3nqs","npm":"zxov","pnpm":"8yyk","TypeScript":"fnbm"}

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
