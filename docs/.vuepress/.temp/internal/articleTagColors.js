import './articleTagColors.css'
export const articleTagColors = {"CSS":"grhb","HTML":"grhb","JavaScript":"w4k9","Vue":"4f2z","Git":"t5ck","DeBug":"hewc","微信小程序":"4f2z","Node":"3rqb","npm":"wv73","pnpm":"u9po","TypeScript":"i3nv","Node.js":"grhb","数据结构":"i3nv"}

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
