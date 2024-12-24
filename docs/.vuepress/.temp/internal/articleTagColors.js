import './articleTagColors.css'
export const articleTagColors = {"CSS":"pr8k","HTML":"pr8k","JavaScript":"jtlr","Vue":"y4ts","DeBug":"5d2l","微信小程序":"y4ts","Node":"1z3z","npm":"8fu5","pnpm":"cnyp","数据结构":"bfcc"}

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
