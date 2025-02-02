import './articleTagColors.css'
export const articleTagColors = {"CSS":"hkks","HTML":"hkks","JavaScript":"sv6b","Vue":"14pg","DeBug":"3o3t","微信小程序":"14pg","Node":"cjr0","npm":"mn9h","pnpm":"pwp4","TypeScript":"lyke","数据结构":"lyke"}

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
