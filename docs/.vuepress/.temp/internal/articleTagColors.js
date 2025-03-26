import './articleTagColors.css'
export const articleTagColors = {"数据结构":"xsli","CSS":"u7ew","HTML":"u7ew","Vue":"22sz","JavaScript":"5xlf","DeBug":"hppf","微信小程序":"22sz","Node":"6fje","npm":"ecet","pnpm":"mzxz","TypeScript":"xsli","Git":"bdzy"}

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
