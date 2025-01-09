import './articleTagColors.css'
export const articleTagColors = {"CSS":"fvai","HTML":"fvai","JavaScript":"4lx0","Vue":"dl0d","DeBug":"yf3d","微信小程序":"dl0d","Node":"x7tn","npm":"lvml","pnpm":"3xs4","TypeScript":"ko3p","数据结构":"ko3p"}

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
