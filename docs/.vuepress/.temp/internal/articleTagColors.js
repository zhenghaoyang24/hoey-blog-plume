import './articleTagColors.css'
export const articleTagColors = {"CSS":"xu4d","HTML":"xu4d","JavaScript":"yr3y","Vue":"qxdf","DeBug":"ujid","微信小程序":"qxdf","Node":"04zg","npm":"gsqf","pnpm":"uzhx","TypeScript":"qdl3","数据结构":"qdl3"}

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
