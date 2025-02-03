import './articleTagColors.css'
export const articleTagColors = {"CSS":"hbu2","HTML":"hbu2","JavaScript":"qqm3","Vue":"mynz","git":"n9dh","DeBug":"upc3","微信小程序":"mynz","Node":"e18r","npm":"ay1z","pnpm":"oieq","TypeScript":"ggi0","数据结构":"ggi0"}

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
