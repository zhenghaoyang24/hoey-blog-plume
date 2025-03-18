import './articleTagColors.css'
export const articleTagColors = {"CSS":"m5mc","HTML":"m5mc","JavaScript":"4t1n","Vue":"bul4","Git":"2wxk","DeBug":"teca","微信小程序":"bul4","Node":"fw3o","npm":"mzwf","pnpm":"dpzy","TypeScript":"d6t4","数据结构":"d6t4"}

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
