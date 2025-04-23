import './articleTagColors.css'
export const articleTagColors = {"CSS":"s70k","HTML":"s70k","Vue":"xo9h","JavaScript":"oacv","DeBug":"ptnw","微信小程序":"xo9h","Node":"cidc","npm":"nebx","pnpm":"puxb","TypeScript":"r7f5","Node.js":"s70k","Git":"3rj8","数据结构":"r7f5"}

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
