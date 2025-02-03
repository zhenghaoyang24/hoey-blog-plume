import './articleTagColors.css'
export const articleTagColors = {"CSS":"1k45","HTML":"1k45","JavaScript":"sxoi","Vue":"q6h9","DeBug":"2h8f","微信小程序":"q6h9","Node":"nuno","npm":"sccn","pnpm":"gfpz","TypeScript":"lp0e","数据结构":"lp0e"}

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
