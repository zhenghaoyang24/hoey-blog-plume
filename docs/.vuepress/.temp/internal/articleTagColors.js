import './articleTagColors.css'
export const articleTagColors = {"数据结构":"vhtg","CSS":"h3yf","HTML":"h3yf","Vue":"sbwr","JavaScript":"gvyq","DeBug":"cb72","微信小程序":"sbwr","Node":"py4j","npm":"pnaz","pnpm":"y12z","TypeScript":"vhtg","Node.js":"h3yf","Git":"d89b"}

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
