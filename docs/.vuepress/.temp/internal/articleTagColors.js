import './articleTagColors.css'
export const articleTagColors = {"CSS":"fxg7","HTML":"fxg7","Vue":"28fl","JavaScript":"gu3o","DeBug":"m40v","微信小程序":"28fl","Node":"mak8","npm":"sv6u","pnpm":"axmo","TypeScript":"113m","Git":"p4wl","数据结构":"113m"}

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
